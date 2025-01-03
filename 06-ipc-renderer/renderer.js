const { ipcRenderer } = require('electron')

document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('h1')

    ipcRenderer.send('get-title')
    ipcRenderer.on('send-title', (_, arg) => {
        title.textContent = arg
    })
})