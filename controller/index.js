var model = require('../model');
var parser = require('./parser');
var eventManager = require('../util').eventManager;
var paste = require('../util').paste;

exports.init = function() {

	/* Process new message */
	eventManager.on('newmessage', function(from, to, message) {
		processmessage(from, to, message, function(reply, err) {
			if (!err) {
				eventManager.emit('reply', from, to, reply);
			} else {
				debuglogger.error('Error in obtaining reply\n');
			}
		});
	});
};

function processmessage (from, channel, message, Callback) {
	var parsedmsg = parser(message);
	switch(parsedmsg) {
	case 'logrequest':
		/* Read from logs */
		var number = message.split(' ')[1]; /* Number as text */
		model.readlog(channel, number , function(logtext) {
			paste(logtext, channel, number, function(url) {
				Callback(url);
			});
		});
		break;
	default:
		model.writelog(from, channel, message, Callback);
		break;
	};
};
