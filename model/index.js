var debuglogger = require('../debuglogger');
var schedule = require('../util').scheduleTask;
var elasticsearch = require('elasticsearch');
var fs = require('fs');
var exec = require('child_process').exec;

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

if (!fs.existsSync('./model/irclogs')) {
	fs.mkdirSync('./model/irclogs');
}

var date = new Date();
var filename = './model/irclogs/' + 'irclog-' + 
	date.toISOString().split('T')[0].slice(0,7) + '.log';

if(!fs.existsSync(filename)) {
	fs.writeFileSync(filename,'');
}

var fd = fs.open(filename, 'a+');

// Schedule creation of a new log file every month
schedule('monthly', function() {
	var date = new Date();
	fs.close(fd, function() {
		debuglogger.notice('Creating new log file for the new month');
		filename = './model/irclogs/' + 'irclog-' + 
			date.toISOString().split('T')[0].slice(0,7) + '.log'
		fd = fs.open(filename, 'a+');
	});
});

exports.writelog = function(message, Callback) {
	fs.writeFile(filename, message, {flag:'a+'}, function(err) {
		if (err) {
			debuglogger.error('Writing into the irc log failed!');
		};
	});
};

exports.readlog = function(number, Callback) {
	var date = new Date();
	if (typeof number === 'string') {
		number = parseInt(number);
	};
	number++;
	exec('tail -n ' + number.toString() + ' ' + filename + ' | haste' ,
	  function (error, stdout, stderr) {
	  	console.log(stdout);
	  	console.log(stderr);
	  	Callback(stdout);
	    if (error !== null) {
	      debuglogger.error('exec error: ' + error);
	    }
	});
};
