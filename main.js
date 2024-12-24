// main.js

const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
let loadURL;
const { Client } = require('pg');

let mainWindow;
async function createWindow() {
  Menu.setApplicationMenu(null);

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    show: false,
    //frame: false,
    resizable: false,
    fullscreen: false,
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(app.getAppPath(), 'preload.js'),
    },
    icon: !app.isPackaged
      ? path.join(process.cwd(), 'public/logo512.png')
      : path.join(__dirname, 'build/logo512.png'),
  });

  if (!app.isPackaged) {
    mainWindow.loadURL('http://localhost:3000/');
  } else {
    mainWindow.loadURL('file://' + __dirname + '/build/index.html');
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
  ////
  mainWindow.on('closed', () => {
    app.quit();
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('execute-sql', async (event, sqlQuery) => {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'SauLab',
    password: 'postgre',
    port: 5432,
  });

  try {
    await client.connect();
    const res = await client.query(sqlQuery);
    return res.rows[0] ?? null;
  } catch (err) {
    console.error('Error executing query', err);
    return { error: err };
  } finally {
    await client.end();
  }
});

ipcMain.handle('quit-app', () => {
  app.quit();
});
