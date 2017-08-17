const { ipcRenderer } = require('electron')

document.querySelector('.new-file').addEventListener('click', function () {
  ipcRenderer.send('Application#newDocument')
}, false)