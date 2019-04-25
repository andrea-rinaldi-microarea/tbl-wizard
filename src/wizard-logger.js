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

    log._pad = 0;
  
    _.extend(log, events.EventEmitter.prototype);

    log._send = function(status, args) {
      if (this.mainWindow)
        this.mainWindow.webContents.send('log', {status: status, pad: this._pad, arguments: args})
    }

    log.write = function () {
        this._send('info', arguments);
        return this;
    }

    log.writeln = function () {
      this._send('info', arguments);
      return this;
    }

    log.ok = function () {
      this._send('success', arguments);
      return this;
    }

    log.error = function () {
      this._send('error', arguments);
      return this;
    }

    log.on('up', function () {
      this._pad++;
    });

    log.on('down', function () {
      this._pad--;
      if (this._pad < 0) this._pad = 0; 
    });

  Object.keys(colors).forEach(function (status) {
    log[status] = function () {
        this._send(status, arguments);
        return this;
    };
  });

  log.table = function (opts) {
    return null;
  };

  return log;
}