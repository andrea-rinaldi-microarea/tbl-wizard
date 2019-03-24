import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";
import * as yeoman from "yeoman-environment";
import * as starboltApp from "generator-starbolt/generators/app";
var WizardAdapter = require('../src/wizard-adapter');

var mainWindow: Electron.BrowserWindow;
var env: any;
var templatesPath: string;

function setEventHandlers() {
    ipcMain
    .on('action', (event, argument) => {
        try {
            env.adapter.answers = argument.answers;
            env.run('sb:app', { 'force': true, 'sourceRoot': templatesPath, 'destinationRoot': argument.workingDir}, (err) => {
                if (err) {
                    console.log(err.message);
                    event.sender.send('error', err.message);
                } else {
                    event.sender.send('action-succeeded', 'completed');
                }
            });
        } catch(err) {
            console.log(err);
            event.sender.send('error', err.message);
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
    env = yeoman.createEnv([],{}, new WizardAdapter());
    env.registerStub(starboltApp, 'sb:app');

    templatesPath = path.dirname(require.resolve('generator-starbolt/generators/app')) + "\\templates";

    mainWindow = createWindow();
    setEventHandlers();
    env.adapter.log.mainWindow = mainWindow;

});