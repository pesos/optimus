var irc = require('irc'),
	view = require('./view'),
    controller = require('./controller'),
    botOpts = require('./config').botOpts;

var bot = new irc.Client(botOpts.ircserver, botOpts.nick, botOpts);
view.init(bot);
controller.init();
