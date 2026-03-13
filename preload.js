const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  open: (url) => ipcRenderer.send("open-site", url),
  openUpdates: () => ipcRenderer.send("open-updates"),

  // Actualizaciones
  checkForUpdates: () => ipcRenderer.send("check-for-updates"),
  requestUpdateStatus: () => ipcRenderer.send("request-update-status"),

  // recibir eventos del updater
  onUpdateProgress: (callback) =>
    ipcRenderer.on("update-progress", (e, percent) => callback(percent)),
  onUpdateDownloaded: (callback) =>
    ipcRenderer.on("update-downloaded", () => callback()),
  onUpdateStatus: (callback) =>
    ipcRenderer.on("update-status", (e, status) => callback(status)),
  onUpdateError: (callback) =>
    ipcRenderer.on("update-error", (e, error) => callback(error)),

  // Borrar datos de Electron
  clearElectronData: () => ipcRenderer.send("clear-electron-data"),
  onClearDataStatus: (callback) =>
    ipcRenderer.on("clear-data-status", (e, status) => callback(status)),
});
