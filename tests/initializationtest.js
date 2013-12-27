var irc = require('irc'),
    view = require('../view'),
    controller = require('../controller'),
    botOpts = require('../config').botOpts;

botOpts.userName = 'BumbleBeeBot';
botOpts.realName = 'Bumble Bee'
botOpts.nick     = 'beeBot';

var testbot = new irc.Client(botOpts.ircserver, botOpts.nick, botOpts);

describe('Initialization of View', function(){
    describe('view.init()', function(){
        it('should add all listeners to incoming events without error', function(){
            view.init(testbot);
        });
    });
});

describe('Initialization of Controllers', function(){
    describe('controller.init()', function(){
        it('should add all listeners to processing events without error', function(){
            controller.init();
        });
    });
});
