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
var schedule = require('../util').schedule;
var makeFilename = require('../util').makeFilename;
var config 	 = require('../config').debuglogarchive;
var writeStream;

// Pipe to filter to human to stdout
logger.pipe(filter).pipe(human).pipe(process.stdout);
if (!fs.existsSync(config.location)) {
	fs.mkdirSync(config.location);
}

writeStream = fs.createWriteStream(makeFilename(config));
logger.pipe(writeStream);

/* For most cases, the default level can be used.
However, if needed, other levels of debug messages can be used as well */
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

/* Schedule creation of new logfile regularly to avoid pile up */
schedule(config.interval, function() {
	logger.unpipe(writeStream);
	writeStream.end(function() {
		writeStream = fs.createWriteStream(makeFilename(config)); //debug-yyyy-mm.log
		logger.pipe(writeStream);
	});
});
