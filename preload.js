const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronAPI",{

    open:(url)=>ipcRenderer.send("open-site",url),

    openUpdates:()=>ipcRenderer.send("open-updates")

})