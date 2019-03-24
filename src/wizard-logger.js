const _ = require('lodash');
const events = require('events');

module.exports = function logger() {
    // Returns the logger
    function log(msg, ctx) {
      return log;
    }

    // color -> status mappings
    var colors = {
        skip: 'yellow',
        force: 'yellow',
        create: 'green',
        invoke: 'bold',
        conflict: 'red',
        identical: 'cyan',
        info: 'gray'
    };
  
    _.extend(log, events.EventEmitter.prototype);

    log.write = function () {
        return this;
    }

    log.writeln = function () {
        return this;
    }

    log.ok = function () {
        return this;
    }

    log.error = function () {
        return this;
    }

    log.on('up', function () {
    });

    log.on('down', function () {
    });

  Object.keys(colors).forEach(function (status) {
    log[status] = function () {
        if (this.mainWindow)
            this.mainWindow.webContents.send('log', {status: status, arguments: arguments})
        return this;
    };
  });

  log.table = function (opts) {
    return null;
  };

  return log;
}