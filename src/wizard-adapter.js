var electron = require("electron");


var WizardAdapter = module.exports = function WizardAdapter() {
    var answers = {};
    var mainWindow = null;

    electron.ipcMain
    .on("prompt-answered",              this.promptAnswered.bind(this) )
    .on('conflicts-prompt-answered',    this.conflictsPromptAnswered.bind(this) )
    ;
}

WizardAdapter.prototype.setMainWindow = function (mainWindow) {
    this.mainWindow = mainWindow;
    this.log.mainWindow = mainWindow;
}

WizardAdapter.prototype.conflictsPromptAnswered = function(event, argument) {
    try {
        if (this.conflictsCallback) {
            this.conflictsCallback(argument);
        }
    } catch(err) {
        this.log.error(err.message);
    }
}
WizardAdapter.prototype.promptAnswered = function(event, argument) {
    try {
        if (this.fulfillCallback) {
            this.fulfillCallback(argument.answers);
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
            // fulfill(this.answers);
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
