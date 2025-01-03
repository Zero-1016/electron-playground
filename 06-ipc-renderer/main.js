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
      webviewTag: true,
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  // 컨텍스트 메뉴 템플릿
  const contextMenu = Menu.buildFromTemplate([
    { label: '복사', role: 'copy' },
    { label: '붙여넣기', role: 'paste' },
    { type: 'separator' },  // 구분선
    { 
      label: '사용자 정의 동작',
      click: () => {
        console.log('사용자 정의 동작 실행')
      }
    }
  ])

  // 컨텍스트 메뉴 이벤트, 우클릭했을 때 보이는 역할
  mainWindow.webContents.on('context-menu', (e, params) => {
    contextMenu.popup()
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
