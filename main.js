const { app, BrowserWindow, BrowserView, Menu, ipcMain } = require("electron")
const { autoUpdater } = require("electron-updater")
const path = require("path")

let win
let view
let updateDownloaded = false

function createWindow(){

    win = new BrowserWindow({
        width:1200,
        height:800,
        backgroundColor:"#202020",
        icon:path.join(__dirname,"icon.png"),
        webPreferences:{
            preload:path.join(__dirname,"preload.js"),
            contextIsolation:true
        }
    })

    win.loadFile("index.html")

    createView("https://github.com")

    if(app.isPackaged){
        autoUpdater.checkForUpdates()
    }
}

function createView(url){

    if(view){
        win.removeBrowserView(view)
    }

    view = new BrowserView()

    win.setBrowserView(view)

    const bounds = win.getBounds()

    view.setBounds({
        x:0,
        y:60,
        width:bounds.width,
        height:bounds.height-60
    })

    view.setAutoResize({
        width:true,
        height:true
    })

    view.webContents.loadURL(url)
}

/* IPC para abrir páginas */
ipcMain.on("open-site",(e,url)=>{
    createView(url)
})

/* IPC para abrir pantalla de updates */
ipcMain.on("open-updates",()=>{
    if(view){
        win.removeBrowserView(view)
        view = null
    }
    win.loadFile("update.html")
})

/* Menú contextual básico */
app.on("web-contents-created",(event,contents)=>{
    contents.on("context-menu",(event,params)=>{
        const menu = Menu.buildFromTemplate([
            { role:"copy" },
            { role:"paste" },
            { role:"cut" },
            { type:"separator" },
            { role:"selectAll" },
            { type:"separator" },
            { role:"reload" },
            { type:"separator" },
            { role:"inspect" }
        ])
        menu.popup()
    })
})

/* Auto-updater */
autoUpdater.autoDownload = true

// enviar progreso de descarga a update.html
autoUpdater.on('download-progress', (progressObj) => {
    if(win){
        win.webContents.send('update-progress', progressObj.percent)
    }
})

// cuando se descarga la actualización
autoUpdater.on('update-downloaded', () => {
    updateDownloaded = true
    if(win){
        win.loadFile('update.html').then(()=>{
            win.webContents.send('update-downloaded')
        })
    }
})

/* Instalar update al cerrar */
app.on("before-quit",()=>{
    if(updateDownloaded){
        autoUpdater.quitAndInstall()
    }
})

/* Ajustar tamaño de BrowserView al redimensionar ventana */
app.on("browser-window-created",(e,window)=>{
    window.on("resize",()=>{
        if(view){
            const bounds = window.getBounds()
            view.setBounds({
                x:0,
                y:60,
                width:bounds.width,
                height:bounds.height-60
            })
        }
    })
})

/* Crear ventana cuando la app esté lista */
app.whenReady().then(createWindow)