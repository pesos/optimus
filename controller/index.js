var model = require('../model');
var parser = require('./parser');

exports.processmessage = function(from , channel, message, Callback) {
	var parsedmsg = parser(message);
	switch(parsedmsg) {
	case 'lastnlogs':
		model.readlog(message.split(' ')[1], Callback);
		break;
	default:
		break;
	};
	message = '[' + (new Date()).toISOString() + ']:\t' + from + ':\t' + message + '\n';
	model.writelog(message, Callback);
}
