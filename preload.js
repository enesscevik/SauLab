const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  connect: (sqlQuery) => ipcRenderer.invoke('execute-sql', sqlQuery),
  quitApp: () => ipcRenderer.invoke('quit-app'),
});
