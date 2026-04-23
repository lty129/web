const tracks = [
  {
    title: "洛春赋",
    artist: "云汐",
    cover: "./img/record0.jpg",
    background: "./img/bg0.png",
    audio: "./mp3/music0.mp3",
    video: "./mp4/video0.mp4",
  },
  {
    title: "山涧月",
    artist: "云汐",
    cover: "./img/record1.jpg",
    background: "./img/bg1.png",
    audio: "./mp3/music1.mp3",
    video: "./mp4/video1.mp4",
  },
  {
    title: "远舟记",
    artist: "云汐",
    cover: "./img/record2.jpg",
    background: "./img/bg2.png",
    audio: "./mp3/music2.mp3",
    video: "./mp4/video2.mp4",
  },
  {
    title: "星眠曲",
    artist: "云汐",
    cover: "./img/record3.jpg",
    background: "./img/bg3.png",
    audio: "./mp3/music3.mp3",
    video: "./mp4/video3.mp4",
  },
];

const playModes = [
  { key: "loop", icon: "./img/mode1.png", title: "列表循环" },
  { key: "single", icon: "./img/mode2.png", title: "单曲循环" },
  { key: "shuffle", icon: "./img/mode3.png", title: "随机播放" },
];

const rates = [1, 1.25, 1.5, 2];

const audioPlayer = document.getElementById("audio-player");
const backgroundImage = document.getElementById("background-image");
const coverImage = document.getElementById("cover-image");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const recordDisc = document.querySelector(".record-disc");
const progressBar = document.getElementById("progress-bar");
const currentTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");
const modeButton = document.getElementById("mode-button");
const modeIcon = document.getElementById("mode-icon");
const prevButton = document.getElementById("prev-button");
const playButton = document.getElementById("play-button");
const playIcon = document.getElementById("play-icon");
const nextButton = document.getElementById("next-button");
const volumeButton = document.getElementById("volume-button");
const volumeIcon = document.getElementById("volume-icon");
const volumeBar = document.getElementById("volume-bar");
const rateButton = document.getElementById("rate-button");
const mvButton = document.getElementById("mv-button");
const playlistToggle = document.getElementById("playlist-toggle");
const playlistDrawer = document.getElementById("playlist-drawer");
const drawerClose = document.getElementById("drawer-close");
const playlistItems = document.getElementById("playlist-items");
const videoModal = document.getElementById("video-modal");
const videoPlayer = document.getElementById("video-player");
const videoTitle = document.getElementById("video-title");
const videoClose = document.getElementById("video-close");

const state = {
  index: 0,
  modeIndex: 0,
  rateIndex: 0,
  seeking: false,
  savedVolume: 0.7,
};

function formatTime(seconds) {
  const safeSeconds = Math.max(0, Math.floor(seconds || 0));
  const minute = String(Math.floor(safeSeconds / 60)).padStart(2, "0");
  const second = String(safeSeconds % 60).padStart(2, "0");
  return `${minute}:${second}`;
}

function updateRangeProgress(range, valuePercent) {
  range.style.setProperty("--range-progress", `${valuePercent}%`);
}

function currentTrack() {
  return tracks[state.index];
}

function currentMode() {
  return playModes[state.modeIndex];
}

function setModeButton() {
  const mode = currentMode();
  modeIcon.src = mode.icon;
  modeButton.title = mode.title;
  modeIcon.alt = mode.title;
}

function setRateButton() {
  const rate = rates[state.rateIndex];
  audioPlayer.playbackRate = rate;
  rateButton.textContent = `${rate.toFixed(1)}X`;
}

function setPlayButton() {
  if (audioPlayer.paused) {
    playIcon.src = "./img/继续播放.png";
    playIcon.alt = "播放";
    playButton.title = "播放";
    recordDisc.classList.remove("is-playing");
  } else {
    playIcon.src = "./img/暂停.png";
    playIcon.alt = "暂停";
    playButton.title = "暂停";
    recordDisc.classList.add("is-playing");
  }
}

function setVolumeButton() {
  const muted = audioPlayer.muted || audioPlayer.volume === 0;
  volumeIcon.src = muted ? "./img/静音.png" : "./img/音量.png";
  volumeIcon.alt = muted ? "静音" : "音量";
}

function renderPlaylist() {
  playlistItems.innerHTML = "";
  tracks.forEach((track, index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "playlist-item";
    item.dataset.index = String(index);
    item.innerHTML = `
      <img src="${track.cover}" alt="${track.title}" />
      <div>
        <strong>${track.title}</strong>
        <span>${track.artist}</span>
      </div>
    `;
    item.addEventListener("click", () => {
      loadTrack(index, true);
      playlistDrawer.classList.remove("is-open");
    });
    playlistItems.appendChild(item);
  });
  syncPlaylist();
}

function syncPlaylist() {
  playlistItems.querySelectorAll(".playlist-item").forEach((item) => {
    item.classList.toggle("active", Number(item.dataset.index) === state.index);
  });
}

function loadTrack(index, autoplay = false) {
  state.index = (index + tracks.length) % tracks.length;
  const track = currentTrack();

  backgroundImage.src = track.background;
  coverImage.src = track.cover;
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
  videoTitle.textContent = `${track.title} MV`;

  audioPlayer.src = track.audio;
  audioPlayer.load();

  progressBar.value = 0;
  currentTime.textContent = "00:00";
  totalTime.textContent = "00:00";
  updateRangeProgress(progressBar, 0);
  syncPlaylist();

  if (autoplay) {
    audioPlayer.play().catch(() => {
      setPlayButton();
    });
  } else {
    audioPlayer.pause();
    setPlayButton();
  }
}

function playCurrent() {
  audioPlayer.play().catch(() => {
    setPlayButton();
  });
}

function togglePlay() {
  if (audioPlayer.paused) {
    playCurrent();
  } else {
    audioPlayer.pause();
  }
}

function nextIndex(step) {
  if (currentMode().key === "shuffle") {
    if (tracks.length <= 1) {
      return state.index;
    }
    let picked = state.index;
    while (picked === state.index) {
      picked = Math.floor(Math.random() * tracks.length);
    }
    return picked;
  }
  return (state.index + step + tracks.length) % tracks.length;
}

function openVideo() {
  videoPlayer.src = currentTrack().video;
  videoModal.hidden = false;
  videoPlayer.play().catch(() => {});
}

function closeVideo() {
  videoPlayer.pause();
  videoPlayer.removeAttribute("src");
  videoPlayer.load();
  videoModal.hidden = true;
}

playButton.addEventListener("click", togglePlay);
prevButton.addEventListener("click", () => loadTrack(nextIndex(-1), true));
nextButton.addEventListener("click", () => loadTrack(nextIndex(1), true));

modeButton.addEventListener("click", () => {
  state.modeIndex = (state.modeIndex + 1) % playModes.length;
  setModeButton();
});

volumeButton.addEventListener("click", () => {
  if (audioPlayer.muted || audioPlayer.volume === 0) {
    audioPlayer.muted = false;
    audioPlayer.volume = state.savedVolume || 0.7;
    volumeBar.value = Math.round(audioPlayer.volume * 100);
  } else {
    state.savedVolume = audioPlayer.volume || 0.7;
    audioPlayer.muted = true;
    audioPlayer.volume = 0;
    volumeBar.value = 0;
  }
  updateRangeProgress(volumeBar, Number(volumeBar.value));
  setVolumeButton();
});

volumeBar.addEventListener("input", () => {
  const volume = Number(volumeBar.value) / 100;
  audioPlayer.muted = volume === 0;
  audioPlayer.volume = volume;
  if (volume > 0) {
    state.savedVolume = volume;
  }
  updateRangeProgress(volumeBar, Number(volumeBar.value));
  setVolumeButton();
});

progressBar.addEventListener("input", () => {
  state.seeking = true;
  currentTime.textContent = formatTime(progressBar.value);
  const percent = Number(progressBar.value) / Number(progressBar.max || 1) * 100;
  updateRangeProgress(progressBar, percent);
});

progressBar.addEventListener("change", () => {
  audioPlayer.currentTime = Number(progressBar.value);
  state.seeking = false;
});

rateButton.addEventListener("click", () => {
  state.rateIndex = (state.rateIndex + 1) % rates.length;
  setRateButton();
});

playlistToggle.addEventListener("click", () => {
  playlistDrawer.classList.toggle("is-open");
});

drawerClose.addEventListener("click", () => {
  playlistDrawer.classList.remove("is-open");
});

mvButton.addEventListener("click", openVideo);
videoClose.addEventListener("click", closeVideo);
videoModal.addEventListener("click", (event) => {
  if (event.target === videoModal) {
    closeVideo();
  }
});

audioPlayer.addEventListener("loadedmetadata", () => {
  const duration = Math.floor(audioPlayer.duration || 0);
  progressBar.max = Math.max(duration, 1);
  totalTime.textContent = formatTime(duration);
});

audioPlayer.addEventListener("timeupdate", () => {
  if (state.seeking) {
    return;
  }
  const current = Math.floor(audioPlayer.currentTime || 0);
  currentTime.textContent = formatTime(current);
  progressBar.value = current;
  const percent = current / Number(progressBar.max || 1) * 100;
  updateRangeProgress(progressBar, percent);
});

audioPlayer.addEventListener("play", setPlayButton);
audioPlayer.addEventListener("pause", setPlayButton);
audioPlayer.addEventListener("ended", () => {
  if (currentMode().key === "single") {
    audioPlayer.currentTime = 0;
    playCurrent();
    return;
  }
  loadTrack(nextIndex(1), true);
});

audioPlayer.volume = 0.7;
renderPlaylist();
setModeButton();
setRateButton();
setVolumeButton();
updateRangeProgress(progressBar, 0);
updateRangeProgress(volumeBar, Number(volumeBar.value));
loadTrack(0, false);
