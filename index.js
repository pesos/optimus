var irc = require('irc');

var botOpts = {
    userName: 'OptimusPrime',
    realName: 'Optimus Prime',
    nick: 'optimusbot',
    password: 'linus',
    port: 6667,
    debug: false,
    showErrors: false,
    autoRejoin: true,
    autoConnect: true,
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
};

var optimusbot = new irc.Client('irc.freenode.net', 'optimusbot', botOpts);

optimusbot.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);
    optimusbot.say(to, message)
});