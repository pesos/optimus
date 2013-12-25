/* View/Interface
 * This module adds all event listeners that accept queries, read messages etc
 * Also talks with the parser to deconstruct the command sent to the bot
 * Incoming - raw events
 * Outgoing - Callback to controllers
 */

var debuglog = require('../debuglogger');
var eventManager = require('../util').eventManager;
var postprocessor = require('./postprocessor');

exports.init = function(bot) {
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

	bot.addListener('message', function (from, to, message) {
		eventManager.emit('newmessage', from, to, message);
		eventManager.once('reply', function(from, to, reply) {
	    	if(typeof reply === 'string') {
	    		bot.say(to, postprocessor.formatreply(from, reply));
	    	}
		});
	});

	bot.addListener('registered', function(message) {
		debuglog.info('Connected to the server');
	});

	bot.addListener('motd', function(motd) {
		debuglog.info('Server sent Message of the Day: ' + motd);
	});

	bot.addListener('names', function(channel, nicks) {
		console.log(channel + ' channel has the following users');
		for (var nick in nicks) {
			console.log(nick + ' : ' + nicks[nick]);
		};
	});

	bot.addListener('topic', function(channel, topic, nick, message) {
		debuglog.info(nick + ' has set the topic of ' + channel + ' to ' + topic);
	});

	bot.addListener('join', function(channel, nick, message) {
		console.log(nick + ' has joined ' + channel);
	});

	bot.addListener('part', function(channel, nick, reason, message) {
		console.log(nick + ' parted ' + channel + '"' + reason + '"');
	});

	bot.addListener('quit', function(nick, reason, channels, message) {
		console.log(nick + ' quit IRC and left ' + channels + ' ' + nick + 'less ' + '"' + reason + '"');
	});

	bot.addListener('kick', function(channel, nick, by, reason, message) {
		console.log(nick + ' got kicked by ' + by + ' in ' + channel + ' because of ' + reason);
	});

	bot.addListener('kill', function(nick, reason, channels, message) {
		console.log(nick + ' got killed. Has left ' + channels + ' ' + nick + 'less. "' + reason + '"');
	});

	bot.addListener('notice', function(nick, to, text, message) {
		debuglog.notice((nick || 'Server') + ' sent a notice to ' + to + ':' + text);
	});

	/* Commented out because it fills up the debug logs with ping messages
	bot.addListener('ping', function(server) {
		debuglog(server + ' sent a ping');
	});
	*/

	bot.addListener('pm', function(nick, text, message) {
		console.log('Received a private message from ' + nick + ':' + text);
	});

	bot.addListener('ctcp-notice', function(from, to, text, message) {
		console.log('CTCP notice sent ' + from + ' to ' + to + ':' + text);
	});

	bot.addListener('ctcp-privmsg', function(from, to, text, message) {
		console.log('CTCP privmsg sent ' + from + ' to ' + to + ':' + text);
	});

	bot.addListener('nick', function(oldnick, newnick, channels, message) {
		console.log(oldnick + ' is now ' + newnick + ' in ' + channels);
	});

	bot.addListener('invite', function(channel, from, message) {
		debuglog.notice('Received an invite to ' + channel + ' from ' + from);
	});

	bot.addListener('+mode', function(channel, by, mode, argument, message) {
		debuglog.info(mode + ' mode was added to ' + argument + ' by ' + by + ' in ' + channel);
	});

	bot.addListener('-mode', function(channel, by, mode, argument, message) {
		debuglog.alert(mode + ' mode was removed from ' + argument + ' by ' + by + ' in ' + channel);
	});

	bot.addListener('error', function(message) {
		debuglog.error('Server responded with an error: ' + message.command);
	});
};
