var model = require('../model');
var assert = require("assert");
var validchannel = require('../config').botOpts.channels[0];

describe('Writing IRC logs', function(){
  describe('model.writelog(from, channelname, message, Callback)', function(){
    it('should write into logs without errors if given valid arguments', function(done){
      model.writelog('testBot', '#nonexistentchannel', 'hello world', function(reply, err) {
      	// Should fail
      	if (err) {
      		assert.equal('object', typeof(err));
      		assert.equal('Invalid channelname', err.message);
      	} else {
      		done(new Error());
      	};
      	assert.equal('undefined', typeof(reply));
      });

      model.writelog('testBot', validchannel, 
      	'hello world', function(reply, err) {
      		// Shouldn't fail
      		if (err) {
      			done(err);
      		};
      		assert.equal('undefined', typeof(reply));
      		done();
      	});
    });
  });
});

describe('Reading IRC logs', function() {
	describe('model.readlog(channelname, number, Callback)', function() {
		it('should read from logs if given valid arguments and return error object otherwise',
		  function(done) {

			model.readlog('#nonexistentchannel', 10, function(reply, err) {
				// Should fail
		      	if (err) {
		      		assert.equal('object', typeof(err));
		      	} else {
		      		done(new Error());
		      	};
		      	assert.equal('undefined', typeof(reply));
			});

			model.readlog(validchannel, 'invalidnumber', function(reply, err) {
				// Should fail
				if (err) {
		      		assert.equal('object', typeof(err));
		      		assert.equal('Incorrect argument; Not a number', err.message);
		      	} else {
		      		done(new Error());
		      	};
		      	assert.equal('undefined', typeof(reply));
			});

			model.readlog(validchannel, 10, function(reply, err) {
				// Shouldn't fail
				if (err) {
		      		done(err);
		      	};
		      	assert.equal('string', typeof(reply));
			});

			model.readlog(validchannel, '10', function(reply, err) {
				// Shouldn't fail
				if (err) {
		      		done(err);
		      	};
		      	assert.equal('string', typeof(reply));
			});

			done();
		});
	});
});
