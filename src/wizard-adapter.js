var electron = require("electron");


var WizardAdapter = module.exports = function WizardAdapter() {
    var mainWindow = null;

    electron.ipcMain
    .on("prompt-answered",              this.promptAnswered.bind(this) )
    .on('conflicts-prompt-answered',    this.conflictsPromptAnswered.bind(this) )
    ;
}

WizardAdapter.prototype.dispose = function () {
    electron.ipcMain
    .removeAllListeners("prompt-answered")
    .removeAllListeners('conflicts-prompt-answered')
    ;
}

WizardAdapter.prototype.setMainWindow = function (mainWindow) {
    this.mainWindow = mainWindow;
    this.log.mainWindow = mainWindow;
}

WizardAdapter.prototype.conflictsPromptAnswered = function(event, answers) {
    try {
        if (this.conflictsCallback) {
            this.conflictsCallback(answers);
        }
    } catch(err) {
        this.log.error(err.message);
        // aborting the conflicts resolving would not invoke the 'run' callback, 
        // so cleanup of the listeners must be done here
        this.dispose();
    }
}
WizardAdapter.prototype.promptAnswered = function(event, answers) {
    try {
        if (!answers.cancel) {
            if (this.fulfillCallback) {
                this.fulfillCallback(answers);
            }
        } else {
            if (this.rejectCallback) {
                this.rejectCallback('Operation cancelled by the user');
            }
        }
    } catch(err) {
        this.log.error(err.message);
    }
}

// Note: this is based on the fact that in the used version of the Yeoman Generator (3.2.0) "regular" prompts
// are requested as promises, while in case of a conflict a callback is passed. Otherwise there is no way to
// guess what the prompt is for
// @@@TODO: as we are using the 'force' options, no chanches of resolving conflicts will ever occur
WizardAdapter.prototype.prompt = function (questions, conflictsCallback) {
    if (typeof conflictsCallback === 'undefined') {
        return new Promise(function (fulfill, reject) {
            this.mainWindow.webContents.send('prompt', {questions: questions})
            this.fulfillCallback = fulfill;
            this.rejectCallback = reject;
        }.bind(this));
    } else {
        if (this.mainWindow) {
            this.mainWindow.webContents.send('conflicts-prompt', {questions: questions})
            this.conflictsCallback = conflictsCallback;
        } else {
            conflictsCallback({ action: 'abort' })
        }
    }
};

WizardAdapter.prototype.diff = function (actual, expected) {
    //@@@TODO
    // as we are using the 'force' options, no chanches of resolving conflicts will ever occur
};

WizardAdapter.prototype.log = require('../src/wizard-logger')();
