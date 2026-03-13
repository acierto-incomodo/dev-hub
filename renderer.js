function openSite(url) {
  window.electronAPI.open(url);
}

function openUpdates() {
  window.electronAPI.openUpdates();
}
