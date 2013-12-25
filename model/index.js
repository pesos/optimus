var debuglogger  = require('../debuglogger');
var schedule 	 = require('../util').schedule;
var makeFilename = require('../util').makeFilename;
var archiveconfig= require('../config').irclogarchive;
var logformat 	 = require('../config').irclogformat;
var botOpts		 = require('../config').botOpts;
// var elasticsearch = require('elasticsearch');
var fs 			 = require('fs');
var exec 		 = require('child_process').exec;

// var client = new elasticsearch.Client({
//   host: 'localhost:9200',
//   log: 'trace'
// });

if (!fs.existsSync(archiveconfig.location)) {
	fs.mkdirSync(archiveconfig.location);
}

var filenames = {};
botOpts.channels.map(function(channelname, index, array) {
	filenames[channelname] = makeFilename(archiveconfig, channelname);
});

// Schedule creation of a new log file
schedule(archiveconfig.interval, function() {
	debuglogger.notice('Creating new log files\n');
	botOpts.channels.map(function(channelname, index, array) {
		filenames[channelname] = makeFilename(archiveconfig, channelname);
	});
});

exports.writelog = function(from, channelname, message, Callback) {
	formattedmessage = '';
	if (logformat.channelName) {
		formattedmessage += channelname + logformat.separator;
	};
	if (logformat.datetime) {
		formattedmessage += '[' + (new Date()).toISOString() + ']' + logformat.separator;
	};
	if (logformat.from) {
		formattedmessage += from + logformat.separator;
	};
	formattedmessage += message + '\n';

	fs.writeFile(filenames[channelname], formattedmessage, {flag:'a+'}, function(err) {
		if (err) {
			debuglogger.error('Writing into the irc log failed!\n');
		};
		Callback();
	});
};

exports.readlog = function(channelname, number, Callback) {
	if (typeof number === 'string') {
		number = parseInt(number);
	};
	number++;
	exec('tail -n ' + number.toString() + ' ' + filenames[channelname] + ' | haste' ,
	  function (error, stdout, stderr) {
	  	Callback(stdout);
	    if (error !== null) {
	      debuglogger.error('exec error: ' + error + '\n');
	    }
	});
};
