var util = require('../util');
var assert = require('assert');

describe('Task Scheduling', function(){
  describe('util.schedule(type, operation)', function(){
    it('should return null if incorrect arguments are passed',
    	function(){
    		// Test scheduler
	  		assert.equal(null, util.schedule());
	  		assert.equal(null, util.schedule('invalidinterval', function() {}));
	  		assert.equal(null, util.schedule('annually', 'notafunction'));
    	}
    );
  });
});

describe('File naming', function(){
  describe('util.makeFilename(config, channelname)', function(){
    it('should always return a string - regardless of validity of arguments',
    	function(){
	  		// Test mkfilename - never fails to return a result
	  		assert.equal('string', typeof(util.makeFilename({}, '#somechannel')));
	  		assert.equal('string', typeof(util.makeFilename('wrongorder', {})));
    	}
    );
  });
});
