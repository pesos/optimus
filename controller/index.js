var model = require('../model');
var parser = require('./parser');
var eventManager = require('../util').eventManager;

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
		model.readlog(channel, message.split(' ')[1], Callback);
		break;
	default:
		model.writelog(from, channel, message, Callback);
		break;
	};
};
