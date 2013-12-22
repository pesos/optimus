/* View/Interface
 * This module adds all event listeners that accept queries, read messages etc
 * Also talks with the parser to deconstruct the command sent to the bot
 * Incoming - raw events
 * Outgoing - Callback to controllers
 */

var debuglog = require('../debuglogger');
var controller = require('../controller');

module.exports = function(optimusbot, Callback) {
	/* 
	Wherever a callback contains the message object, this is the structure of the object
	(Exception: message object in 'message' event's callback, which is a String)

	message = {
	    prefix: "The prefix for the message (optional)",
	    nick: "The nickname portion of the prefix (optional)",
	    user: "The username portion of the prefix (optional)",
	    host: "The hostname portion of the prefix (optional)",
	    server: "The servername (if the prefix was a servername)",
	    rawCommand: "The command exactly as sent from the server",
	    command: "Human readable version of the command",
	    commandType: "normal, error, or reply",
	    args: ['arguments', 'to', 'the', 'command'],
	}
	*/

	optimusbot.addListener('message', function (from, to, message) {
	    console.log(from + ' => ' + to + ': ' + message);
	    controller.processmessage(from, to, message, function(reply) {
	    	if(reply)
	    		optimusbot.say(to, reply);
	    });
	});

	optimusbot.addListener('registered', function(message) {
		debuglog.info('Connected to the server');
	});

	optimusbot.addListener('motd', function(motd) {
		debuglog.info('Server sent Message of the Day: ' + motd);
	});

	optimusbot.addListener('names', function(channel, nicks) {
		console.log(channel + ' channel has the following users');
		for (var nick in nicks) {
			console.log(nick + ' : ' + nicks[nick]);
		};
	});

	optimusbot.addListener('topic', function(channel, topic, nick, message) {
		debuglog.info(nick + ' has set the topic of ' + channel + ' to ' + topic);
	});

	optimusbot.addListener('join', function(channel, nick, message) {
		console.log(nick + ' has joined ' + channel);
	});

	optimusbot.addListener('part', function(channel, nick, reason, message) {
		console.log(nick + ' parted ' + channel + '"' + reason + '"');
	});

	optimusbot.addListener('quit', function(nick, reason, channels, message) {
		console.log(nick + ' quit IRC and left ' + channels + ' ' + nick + 'less ' + '"' + reason + '"');
	});

	optimusbot.addListener('kick', function(channel, nick, by, reason, message) {
		console.log(nick + ' got kicked by ' + by + ' in ' + channel + ' because of ' + reason);
	});

	optimusbot.addListener('kill', function(nick, reason, channels, message) {
		console.log(nick + ' got killed. Has left ' + channels + ' ' + nick + 'less. "' + reason + '"');
	});

	optimusbot.addListener('notice', function(nick, to, text, message) {
		debuglog.notice((nick || 'Server') + ' sent a notice to ' + to + ':' + text);
	});

	/* Commented out because it fills up the debug logs with ping messages
	optimusbot.addListener('ping', function(server) {
		debuglog(server + ' sent a ping');
	});
	*/

	optimusbot.addListener('pm', function(nick, text, message) {
		console.log('Received a private message from ' + nick + ':' + text);
	});

	optimusbot.addListener('ctcp-notice', function(from, to, text, message) {
		console.log('CTCP notice sent ' + from + ' to ' + to + ':' + text);
	});

	optimusbot.addListener('ctcp-privmsg', function(from, to, text, message) {
		console.log('CTCP privmsg sent ' + from + ' to ' + to + ':' + text);
	});

	optimusbot.addListener('nick', function(oldnick, newnick, channels, message) {
		console.log(oldnick + ' is now ' + newnick + ' in ' + channels);
	});

	optimusbot.addListener('invite', function(channel, from, message) {
		debuglog.notice('Received an invite to ' + channel + ' from ' + from);
	});

	optimusbot.addListener('+mode', function(channel, by, mode, argument, message) {
		debuglog.info(mode + ' mode was added to ' + argument + ' by ' + by + ' in ' + channel);
	});

	optimusbot.addListener('-mode', function(channel, by, mode, argument, message) {
		debuglog.alert(mode + ' mode was removed from ' + argument + ' by ' + by + ' in ' + channel);
	});

	optimusbot.addListener('error', function(message) {
		debuglog.error('Server responded with an error: ' + message.command);
	});

	Callback();

};