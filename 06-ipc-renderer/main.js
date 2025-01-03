const { app, BrowserWindow, ipcMain, screen, Menu, MenuItem } = require("electron");

let mainWindow;

function createWindow() {

  // 스크린 크기 정보를 가져옴
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize

  const windowWidth = 800
  const windowHeight = 600

  // 가운데 좌표 구하는 로직
  const x = Math.floor((screenWidth - windowWidth) / 2)
  const y = Math.floor((screenHeight - windowHeight) / 2)

  mainWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    x,
    y,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  mainWindow.webContents.on('context-menu', (event, params) => {
    const menu = new Menu()
    menu.append(new MenuItem({
      label: 'Custom Menu Item',
      click: () => {
        console.log('Custom Menu Item clicked')
      }
    }))

    menu.popup()
  })

  mainWindow.loadFile("index.html");

  ipcMain.on('get-title', (event) => {
    event.reply('send-title', 'My Electron App')
  })
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
