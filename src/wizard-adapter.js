
var WizardAdapter = module.exports = function WizardAdapter() {
    var answers = {};
}

WizardAdapter.prototype.prompt = function (questions) {
    return new Promise(function (fulfill, reject) {
        fulfill(this.answers);
    }.bind(this));
};

WizardAdapter.prototype.diff = function (actual, expected) {

};

// TODO: Implement logger
WizardAdapter.prototype.log = require('yeoman-environment/lib/util/log')();
