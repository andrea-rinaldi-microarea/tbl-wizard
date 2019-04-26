
var WizardAdapter = module.exports = function WizardAdapter() {
    var answers = {};
    var mainWindow = null;
}

WizardAdapter.prototype.setMainWindow = function (mainWindow) {
    this.mainWindow = mainWindow;
    this.log.mainWindow = mainWindow;
}

WizardAdapter.prototype.conflictsPromptAnswered = function(result) {
    this.conflictsCallback(result);
}

// Note: this is based on the fact that in the used version of the Yeoman Generator (3.2.0) "regular" prompts
// are requested as promises, while in case of a conflict a callback is passed. Otherwise there is no way to
// guess what the prompt is for
// @@@TODO: as we are using the 'force' options, no chanches of resolving conflicts will ever occur
WizardAdapter.prototype.prompt = function (questions, conflictsCallback) {
    if (typeof conflictsCallback === 'undefined') {
        return new Promise(function (fulfill, reject) {
            fulfill(this.answers);
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
