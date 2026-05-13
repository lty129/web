$ErrorActionPreference = "Stop"

$AppDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Port = 5173
$Url = "http://localhost:$Port/"
$HealthUrl = "http://localhost:$Port/api/health"
$NodeExe = "E:\Node.js\node.exe"
$LogFile = Join-Path $AppDir "start-store.log"
$OutLog = Join-Path $AppDir "server.out.log"
$ErrLog = Join-Path $AppDir "server.err.log"

function Write-Step($Message) {
  $line = "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] $Message"
  Write-Host $Message
  Add-Content -Path $LogFile -Value $line -Encoding UTF8
}

function Test-Admin {
  $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
  $principal = [Security.Principal.WindowsPrincipal]::new($identity)
  return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Test-StoreHealth {
  try {
    $health = Invoke-RestMethod -Uri $HealthUrl -TimeoutSec 2
    return $health.database -eq "store"
  } catch {
    return $false
  }
}

function Wait-StoreHealth {
  param([int]$Seconds = 25)
  for ($i = 1; $i -le $Seconds; $i++) {
    if (Test-StoreHealth) { return $true }
    Start-Sleep -Seconds 1
  }
  return $false
}

function Open-StorePage {
  try {
    Start-Process $Url
    Write-Step "Opened: $Url"
  } catch {
    Write-Step "Browser auto-open was blocked. Please open this address manually: $Url"
  }
}

Set-Location $AppDir
Write-Step ""
Write-Step "Maison Store launcher"
Write-Step "======================"
Write-Step "App dir: $AppDir"

if (-not (Test-Path (Join-Path $AppDir "server.js"))) {
  throw "server.js not found. Put the launcher in the store folder."
}

if (-not (Test-Path (Join-Path $AppDir ".env"))) {
  throw ".env not found. Database config is missing."
}

if (-not (Test-Path $NodeExe)) {
  $nodeCommand = Get-Command node -ErrorAction SilentlyContinue
  if (-not $nodeCommand) {
    throw "Node.js not found. Check E:\Node.js\node.exe or install Node.js."
  }
  $NodeExe = $nodeCommand.Source
}

Write-Step "[1/5] Checking MySQL service..."
$mysqlService = Get-Service -Name MySQL -ErrorAction Stop
if ($mysqlService.Status -ne "Running") {
  Write-Step "MySQL is not running."
  if (-not (Test-Admin)) {
    Write-Step "Requesting administrator permission to start MySQL. Click Yes in the UAC dialog."
    $arg = "-NoExit -ExecutionPolicy Bypass -File `"$PSCommandPath`""
    Start-Process -FilePath "powershell.exe" -ArgumentList $arg -Verb RunAs
    return
  }

  Start-Service -Name MySQL
  Start-Sleep -Seconds 2
}
Write-Step "MySQL is running."

Write-Step "[2/5] Checking existing store server..."
if (Test-StoreHealth) {
  Write-Step "Store server is already running and connected to database store."
  Open-StorePage
  Write-Step "You can close this window. The existing server process is still running."
  return
}

Write-Step "[3/5] Checking port $Port..."
$portLine = netstat -ano | Select-String -Pattern ":$Port\s+.*LISTENING" | Select-Object -First 1
if ($portLine) {
  $parts = ($portLine.ToString() -split "\s+") | Where-Object { $_ }
  $pidOnPort = [int]$parts[-1]
  $processOnPort = Get-Process -Id $pidOnPort -ErrorAction SilentlyContinue

  if ($processOnPort -and $processOnPort.ProcessName -eq "node") {
    Write-Step "Restarting old Node server on port $Port..."
    Stop-Process -Id $pidOnPort -Force
    Start-Sleep -Seconds 1
  } else {
    throw "Port $Port is used by PID $pidOnPort ($($processOnPort.ProcessName)). Close it and run again."
  }
}

Write-Step "[4/5] Starting Maison Store server..."
Remove-Item $OutLog, $ErrLog -ErrorAction SilentlyContinue
$server = Start-Process `
  -FilePath $NodeExe `
  -ArgumentList "`"$AppDir\server.js`"" `
  -WorkingDirectory $AppDir `
  -WindowStyle Hidden `
  -RedirectStandardOutput $OutLog `
  -RedirectStandardError $ErrLog `
  -PassThru

Write-Step "Node server PID: $($server.Id)"
Write-Step "Waiting for database connection..."

if (-not (Wait-StoreHealth -Seconds 25)) {
  Write-Step "Server output:"
  if (Test-Path $OutLog) { Get-Content $OutLog -Tail 20 | ForEach-Object { Write-Step "OUT: $_" } }
  if (Test-Path $ErrLog) { Get-Content $ErrLog -Tail 20 | ForEach-Object { Write-Step "ERR: $_" } }
  throw "Server started, but database health check failed. Open $HealthUrl for details."
}

Write-Step "[5/5] Opening store page..."
Open-StorePage
Write-Step "Started successfully: $Url"
Write-Step "This PowerShell window can stay open for status. Closing it will not stop the background server."
