function openSite(url) {
  window.electronAPI.open(url);
}

function openUpdates() {
  window.electronAPI.openUpdates();
}

function openExtra() {
  window.electronAPI.openExtra();
}
