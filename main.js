const {
  app,
  BrowserWindow,
  BrowserView,
  Menu,
  ipcMain,
  session,
} = require("electron");
const { autoUpdater } = require("electron-updater");
const fs = require("fs");
const path = require("path");

// main.js al inicio
app.setPath("userData", path.join(app.getPath("appData"), "DevHub"));

// Solo permitir una instancia de la aplicación
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    // Si alguien intenta lanzar una segunda instancia, enfocamos y maximizamos nuestra ventana.
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
      win.maximize();
    }
  });

  /* Crear ventana cuando la app esté lista */
  app.whenReady().then(createWindow);
}

let win;
let view;
let updateDownloaded = false;
let updateProgress = 0;
let updateStatus = "idle"; // idle | checking | available | downloading | downloaded | not-available
let updateError = null;

function sendUpdateStatus() {
  if (!win) return;
  win.webContents.send("update-status", {
    status: updateStatus,
    progress: updateProgress,
    error: updateError,
  });
}

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "#202020",
    icon: path.join(__dirname, "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });

  // Maximizar al iniciar la aplicación
  win.maximize();

  win.loadFile("index.html");

  createView("https://github.com");

  if (app.isPackaged) {
    autoUpdater.checkForUpdatesAndNotify();
  }
}

function createView(url) {
  if (view) {
    win.removeBrowserView(view);
  }

  view = new BrowserView();

  win.setBrowserView(view);

  const bounds = win.getBounds();

  view.setBounds({
    x: 0,
    y: 60,
    width: bounds.width,
    height: bounds.height - 60,
  });

  view.setAutoResize({
    width: true,
    height: true,
  });

  view.webContents.loadURL(url);
}

/* IPC para abrir páginas */
ipcMain.on("open-site", (e, url) => {
  createView(url);
});

/* IPC para abrir pantalla de updates */
ipcMain.on("open-updates", () => {
  if (view) {
    win.removeBrowserView(view);
    view = null;
  }
  win.loadFile("update.html");

  // Aseguramos que se inicia la comprobación de actualizaciones cuando el usuario abre la pantalla de updates
  if (app.isPackaged) {
    autoUpdater.checkForUpdates();
  }
});

/* IPC para abrir pantalla extra */
ipcMain.on("open-extra", () => {
  if (view) {
    win.removeBrowserView(view);
    view = null;
  }
  win.loadFile("extra.html");
});

/* IPC para control de actualizaciones */
ipcMain.on("check-for-updates", () => {
  if (app.isPackaged) {
    autoUpdater.checkForUpdates();
  }
});

ipcMain.on("request-update-status", () => {
  sendUpdateStatus();
});

/* IPC para borrar datos de Electron */
ipcMain.on("clear-electron-data", async () => {
  if (!win) return;
  win.webContents.send("clear-data-status", { status: "starting" });

  try {
    await session.defaultSession.clearStorageData();
    await session.defaultSession.clearCache();

    const userDataPath = app.getPath("userData");

    // Eliminar contenido del directorio userData (sin eliminar el directorio en sí)
    const items = await fs.promises.readdir(userDataPath);
    await Promise.all(
      items.map((item) =>
        fs.promises.rm(path.join(userDataPath, item), {
          recursive: true,
          force: true,
        }),
      ),
    );

    win.webContents.send("clear-data-status", { status: "done" });
  } catch (error) {
    win.webContents.send("clear-data-status", {
      status: "error",
      error: error == null ? "" : error.stack || error.message || String(error),
    });
  }
});

/* Menú contextual básico */
app.on("web-contents-created", (event, contents) => {
  contents.on("context-menu", (event, params) => {
    const menu = Menu.buildFromTemplate([
      { role: "copy" },
      { role: "paste" },
      { role: "cut" },
      { type: "separator" },
      { role: "selectAll" },
      { type: "separator" },
      { role: "reload" },
      { type: "separator" },
      { role: "inspect" },
    ]);
    menu.popup();
  });
});

/* Auto-updater */
autoUpdater.autoDownload = true;

autoUpdater.on("checking-for-update", () => {
  updateStatus = "checking";
  updateError = null;
  sendUpdateStatus();
});

autoUpdater.on("update-available", () => {
  updateStatus = "available";
  updateError = null;
  sendUpdateStatus();
});

autoUpdater.on("update-not-available", () => {
  updateStatus = "not-available";
  updateError = null;
  sendUpdateStatus();
});

autoUpdater.on("error", (error) => {
  updateStatus = "idle";
  updateError =
    error == null ? "" : error.stack || error.message || String(error);
  sendUpdateStatus();
});

// enviar progreso de descarga a update.html
autoUpdater.on("download-progress", (progressObj) => {
  updateStatus = "downloading";
  updateProgress = progressObj.percent || 0;
  sendUpdateStatus();
});

// cuando se descarga la actualización
autoUpdater.on("update-downloaded", () => {
  updateDownloaded = true;
  updateStatus = "downloaded";
  updateProgress = 100;
  sendUpdateStatus();

  // show the update page if we aren't already on it
  if (win) {
    win.loadFile("update.html").then(() => {
      win.webContents.send("update-downloaded");
    });
  }
});

/* Instalar update al cerrar */
app.on("before-quit", () => {
  if (updateDownloaded) {
    autoUpdater.quitAndInstall();
  }
});

/* Ajustar tamaño de BrowserView al redimensionar ventana */
app.on("browser-window-created", (e, window) => {
  window.on("resize", () => {
    if (view) {
      const bounds = window.getBounds();
      view.setBounds({
        x: 0,
        y: 60,
        width: bounds.width,
        height: bounds.height - 60,
      });
    }
  });
});
