const { app, BrowserWindow, ipcMain } = require('electron')

let win

function createWindow() {
  win = new BrowserWindow({ width: 600, height: 400, title: 'nihao' })
  win.loadURL(`file://${__dirname}/index.html`)

  win.webContents.openDevTools()
}

ipcMain.on('max', function () {
  win.maximize()
})

ipcMain.on('unmax', function () {
  win.unmaximize()
})

app.on('ready', createWindow)