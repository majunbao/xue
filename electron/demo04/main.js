const { app, BrowserWindow } = require('electron')

createWindow = () => {
  let win = new BrowserWindow({ width: 600, height: 400 })
  win.loadURL(`file://${__dirname}/index.html`)

  // 打开开发工具 开发时候使用
  win.webContents.openDevTools()
}

app.on('ready', createWindow)