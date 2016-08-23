const {app, BrowserWindow, dialog, Menu, ipcMain} = require('electron')

let win, winAbout

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600, maxWidth: 800, maxHeight: 600});
  win.loadURL(`file://${__dirname}/index.html`);
  win.webContents.openDevTools();
  win.setMenu(null)
  win.on('closed', () => {
    win = null;
  });
}

function aboutWindow() {
  winAbout = new BrowserWindow({width: 400, height: 400})
  winAbout.loadURL(`file://${__dirname}/main.html`)
  winAbout.setMenu(null)
}

ipcMain.on('open', aboutWindow)

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
    }
});