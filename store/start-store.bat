@echo off
set "APP_DIR=%~dp0"
powershell.exe -NoExit -ExecutionPolicy Bypass -File "%APP_DIR%start-store.ps1"
