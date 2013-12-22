/*
 * This is the debugging module. It keeps the log of server messages and errors
 * This acts as an adapter so that, whatever library being used,
 * the internal api being used in the project remains the same
 * Refer https://github.com/pesos/optimus/wiki/Coding-philosophy
 */

var logger   = require('caterpillar').createLogger({level:7});
var filter   = require('caterpillar-filter').createFilter();
var human    = require('caterpillar-human').createHuman();
var fs       = require('fs');
var schedule = require('../util').scheduleTask;
var writeStream;

// Pipe to filter to human to stdout
logger.pipe(filter).pipe(human).pipe(process.stdout);
if (!fs.existsSync('./debuglogger/debuglogs')) {
	fs.mkdirSync('./debuglogger/debuglogs');
}

writeStream = fs.createWriteStream('./debuglogger/debuglogs/debug.log');
logger.pipe(writeStream);

/* For most cases, the default level can be used.
However, if needed, other levels of debug messages can be used as well*/
exports.info = function(message) {
	logger.log('info', message);
};

exports.alert = function(message) {
	logger.log('alert', message);
};

exports.emergency = function(message) {
	logger.log('emergency', message);
};

exports.critical = function(message) {
	logger.log('critical', message);
};

exports.error = function(message) {
	logger.log('error', message);
};

exports.warning = function(message) {
	logger.log('warning', message);
};

exports.notice = function(message) {
	logger.log('notice', message);
};

exports.debug = function(message) {
	logger.log('debug', message);
};

/* Creates a new debug log file every 30 days to avoid pile up */
schedule('monthly', function() {
	var date = new Date();
	logger.unpipe(writeStream);
	writeStream.end(function() {
		writeStream = fs.createWriteStream('./debuglogger/debuglogs/debug-' + 
			date.toISOString().split('T')[0].slice(0,7) + '.log'); //debug-yyyy-mm.log
		logger.pipe(writeStream);
	});
});
