import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";
import * as yeoman from "yeoman-environment";
import * as starboltApp from "generator-starbolt/generators/app";
import { Versions } from "./models/versions";
import { RunArguments } from './models/run-arguments';
import { LogEntry } from './models/log-entry';
var WizardAdapter = require('../src/wizard-adapter');

var templatesPath: string;
var mainWindow: Electron.BrowserWindow;

function setEventHandlers() {
    ipcMain
    .on('run', (event, args: RunArguments) => {
        try {
            var env = yeoman.createEnv([],{}, new WizardAdapter());
            env.registerStub(starboltApp, 'sb:app');
            env.adapter.setMainWindow(mainWindow);
            env.adapter.answers = args.answers;
            env.run('sb:app', { 'force': true, 'sourceRoot': templatesPath, 'destinationRoot': args.workingDir}, (err) => {
                if (err) {
                    event.sender.send('run-response', LogEntry.error(err.message ? err.message : err))
                } else {
                    event.sender.send('run-response', LogEntry.success('completed'));
                }
            });
        } catch(err) {
            event.sender.send('run-response', LogEntry.error(err.message ? err.message : err))
        }
    })
    .on('getVersions', (event) => {
        event.sender.send(
            'getVersions-response', 
            new Versions(process.versions.electron, process.versions.node)
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