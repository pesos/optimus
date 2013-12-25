/* Consists of utility modules used by the project */

/* Task Scheduler. To schedule running of operations */

exports.schedule = require('./scheduler').scheduleTask;

/* Construct filenames for logfiles */
exports.makeFilename = require('./mkfilename');

/* Event emitter. Used to emit and handle events */
var events = require('events');
exports.eventManager = new events.EventEmitter();