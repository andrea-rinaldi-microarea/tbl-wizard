import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";

let mainWindow: Electron.BrowserWindow;

function setEventHandlers() {
    ipcMain.on('action', (event, argument) => {
        event.sender.send('action-succeeded', 'Doing ...');
        setTimeout(() => {
            event.sender.send('action-succeeded', '...done');
        }, 3000)
    });
}

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, ".", "tbl-wizard", "index.html"),
        protocol: 'file:',
        slashes: true
    }));
}

app.on("ready", () => {
    createWindow();
    setEventHandlers();
});