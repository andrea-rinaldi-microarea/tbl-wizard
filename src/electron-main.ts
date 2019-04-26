import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";
import * as yeoman from "yeoman-environment";
import * as starboltApp from "generator-starbolt/generators/app";
var WizardAdapter = require('../src/wizard-adapter');

var templatesPath: string;
var mainWindow: Electron.BrowserWindow;

function setEventHandlers() {
    ipcMain
    .on('run', (event, argument) => {
        try {
            var env = yeoman.createEnv([],{}, new WizardAdapter());
            env.registerStub(starboltApp, 'sb:app');
            env.adapter.setMainWindow(mainWindow);
            env.adapter.answers = argument.answers;
            env.run('sb:app', { 'force': true, 'sourceRoot': templatesPath, 'destinationRoot': argument.workingDir}, (err) => {
                if (err) {
                    env.adapter.log.error(err);
                } else {
                    env.adapter.log.ok('completed');
                }
            });
        } catch(err) {
            env.adapter.log.error(err);
        }
    })
    .on('version', (event, argument) => {
        event.sender.send(
            'main-version', 
            {
                "electron": process.versions.electron,
                "node": process.versions.node
            }
        );
    });
}

function createWindow() {
    var win = new BrowserWindow({
        height: 600,
        width: 800,
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, ".", "tbl-wizard", "index.html"),
        protocol: 'file:',
        slashes: true
    }));

    return win;
}

app.on("ready", () => {
    templatesPath = path.dirname(require.resolve('generator-starbolt/generators/app')) + "\\templates";
    mainWindow = createWindow();
    setEventHandlers();
});