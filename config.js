/* Configuration for various components of the project */

module.exports = {
	botOpts			: {
	    userName: 'OptimusPrimeBot',
	    realName: 'Optimus Prime',
	    nick: 'optimusbot',
	    password: 'linus',
	    port: 6667,
	    debug: false,
	    showErrors: false,
	    autoRejoin: true,
	    autoConnect: true,
	    ircserver : 'irc.freenode.net',
	    channels: ['#pes-os', '#optimus-test'],
	    secure: false,
	    selfSigned: false,
	    certExpired: false,
	    floodProtection: false,
	    floodProtectionDelay: 1000,
	    sasl: true,
	    stripColors: true,
	    channelPrefixes: "&#",
	    messageSplit: 512
	},
	irclogformat	: {
		channelName : false,
		datetime : true,
		from : true,
		separator : ':\t'
	},
	irclogarchive	: {
		interval : 'monthly', // or 'annually' or 'weekly' or 'daily' or 'hourly'
		prefix : 'irclog',
		channelname : true,
		datetime : true,
		separator : '-', // Separator to the filename
		extension : '.log',
		location : './model/irclogs/'
	},
	debuglogarchive : {
		interval : 'monthly', // or 'annually' or 'weekly' or 'daily' or 'hourly'
		prefix : 'debuglog',
		datetime : true,
		separator : '-', // Separator to the filename
		extension : '.log',
		location : './debuglogger/debuglogs/'
	},
	ircreplyformat 	: {
		mentionuser : true,
		separator : ': '
	}
};