var parser = require('../controller/parser');
var assert = require('assert');

describe('Message Parsing', function(){
  describe('parser(message)', function(){
    it('should return a string opcode if the passed message is a command and undefined otherwise',
    	function(){
    		// Not commands
	  		assert.equal('undefined', typeof(parser('not a command')));
	  		assert.equal('undefined', typeof(parser('!log')));
	  		assert.equal('undefined', typeof(parser('!logs')));
	  		assert.equal('undefined', typeof(parser('!logs notanumber')));
	  		assert.equal('undefined', typeof(parser('!log notanumber')));
	  		assert.equal('undefined', typeof(parser('!log 10 somethingelse')));
	  		assert.equal('undefined', typeof(parser('!logs 10 somethingelse')));

	  		// Commands
	  		assert.equal('logrequest', parser('!logs 10'));
	  		assert.equal('logrequest', parser('!log 10'));
    	}
    );
  });
});
