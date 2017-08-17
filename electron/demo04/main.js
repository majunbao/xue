let { app, BrowserWindow, ipcMain } = require('electron')

let welcomeWin = null

createWindow = () => {
  welcomeWin = new BrowserWindow({ width: 600, height: 400 })
  welcomeWin.loadURL(`file://${__dirname}/welcome.html`)
}

createDocument = () => {
  let win = new BrowserWindow({ width: 600, height: 400 })
  win.maximize()
  win.loadURL(`file://${__dirname}/index.html`)
  welcomeWin.close()
}

ipcMain.on('Application#newDocument', () => {
  createDocument()
})




app.on('ready', createWindow)