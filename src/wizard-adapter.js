
var WizardAdapter = module.exports = function WizardAdapter() {
    var answers = {};
    var mainWindow = null;
}

WizardAdapter.prototype.setMainWindow = function (mainWindow) {
    this.mainWindow = mainWindow;
    this.log.mainWindow = mainWindow;
}

WizardAdapter.prototype.prompt = function (questions) {
    return new Promise(function (fulfill, reject) {
        fulfill(this.answers);
    }.bind(this));
};

WizardAdapter.prototype.diff = function (actual, expected) {
    //@@@TODO
    // as we are using the 'force' options, no chanches of resolving conflicts will ever occur
};

WizardAdapter.prototype.log = require('../src/wizard-logger')();
