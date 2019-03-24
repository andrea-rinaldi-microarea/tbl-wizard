
var WizardAdapter = module.exports = function WizardAdapter() {
    var answers = {};
    var mainWindow = null;
}

WizardAdapter.prototype.prompt = function (questions) {
    return new Promise(function (fulfill, reject) {
        fulfill(this.answers);
    }.bind(this));
};

WizardAdapter.prototype.diff = function (actual, expected) {

};

WizardAdapter.prototype.log = require('../src/wizard-logger')();
