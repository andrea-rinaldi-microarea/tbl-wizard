var WizardAdapter = module.exports = function WizardAdapter() {};

WizardAdapter.prototype.prompt = function (questions, callback) {
    this.answerCallback = callback;
};

WizardAdapter.prototype.diff = function (actual, expected) {

};

// TODO: Implement logger
WizardAdapter.prototype.log = require('yeoman-environment/lib/util/log')();
