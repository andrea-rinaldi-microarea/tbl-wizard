
var WizardAdapter = module.exports = function WizardAdapter() {
    var answers = {};
    var mainWindow = null;
}

WizardAdapter.prototype.setMainWindow = function (mainWindow) {
    this.mainWindow = mainWindow;
    this.log.mainWindow = mainWindow;
}

WizardAdapter.prototype.matchQuestionsAnswers = function (questions, answers) {
    var missing, unknown;

    // check that all the questions have an answer
    for (q = 0; q < questions.length; q++) {
        if (typeof answers[questions[q].name] == 'undefined') {
            missing = (missing ? missing + ", " : "Missing answers for: ") + questions[q].name;
        }
    }

    // check that each answer corresponds to a question
    for (a = 0; a < Object.keys(answers).length; a++) {
        if (typeof questions.find(q => {
            return q.name === Object.keys(answers)[a];
        }) === 'undefined') {
            unknown = (unknown ? unknown + ", " : "Unknown answers: ") + Object.keys(answers)[a];
        }
    }

    if (missing || unknown) {
        return (missing || "") + (missing && unknown ? "; " : "") + (unknown || "");
    } else {
        return true;
    }
}

WizardAdapter.prototype.prompt = function (questions) {
    return new Promise(function (fulfill, reject) {
        var match = this.matchQuestionsAnswers(questions, this.answers);

        if (match === true) {
            fulfill(this.answers);
        } else {
            reject(match);
        }
    }.bind(this));
};

WizardAdapter.prototype.diff = function (actual, expected) {
    //@@@TODO
    // as we are using the 'force' options, no chanches of resolving conflicts will ever occur
};

WizardAdapter.prototype.log = require('../src/wizard-logger')();
