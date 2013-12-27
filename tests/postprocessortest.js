var postprocessor = require('../view/postprocessor');
var replyformat = require('../config').ircreplyformat;
var assert = require("assert");

describe('Reply Formatting', function(){
  describe('postprocessor.formatreply(from, message)', function(){
    it('should return undefined when message is null or missing and format appropriately otherwise',
    	function(){
	  		assert.equal('undefined', typeof(postprocessor.formatreply('test')));
	  		assert.equal('undefined', typeof(postprocessor.formatreply('test', null)));
	  		assert.equal('undefined', typeof(postprocessor.formatreply(null, 'hello world')));
	  		assert.equal('undefined', typeof(postprocessor.formatreply()));
	  		if (replyformat.mentionuser) {
	  			assert.equal('test' + replyformat.separator + 'hello world', 
	  				postprocessor.formatreply('test', 'hello world'));
	  		} else {
	  			assert.equal('hello world', postprocessor.formatreply('test', 'hello world'));
	  		}
    	}
    );
  });
});
