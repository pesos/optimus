# Index
   - [Initialization of View](#initialization-of-view)
     - [view.init()](#initialization-of-view-viewinit)
   - [Initialization of Controllers](#initialization-of-controllers)
     - [controller.init()](#initialization-of-controllers-controllerinit)
   - [Writing IRC logs](#writing-irc-logs)
     - [model.writelog(from, channelname, message, Callback)](#writing-irc-logs-modelwritelogfrom-channelname-message-callback)
   - [Reading IRC logs](#reading-irc-logs)
     - [model.readlog(channelname, number, Callback)](#reading-irc-logs-modelreadlogchannelname-number-callback)
   - [Message Parsing](#message-parsing)
     - [parser(message)](#message-parsing-parsermessage)
   - [Reply Formatting](#reply-formatting)
     - [postprocessor.formatreply(from, message)](#reply-formatting-postprocessorformatreplyfrom-message)
   - [Task Scheduling](#task-scheduling)
     - [util.schedule(type, operation)](#task-scheduling-utilscheduletype-operation)
   - [File naming](#file-naming)
     - [util.makeFilename(config, channelname)](#file-naming-utilmakefilenameconfig-channelname)
<a name=""></a>
 
<a name="initialization-of-view"></a>
# Initialization of View
<a name="initialization-of-view-viewinit"></a>
## view.init()
should add all listeners to incoming events without error.

```js
view.init(testbot);
```

<a name="initialization-of-controllers"></a>
# Initialization of Controllers
<a name="initialization-of-controllers-controllerinit"></a>
## controller.init()
should add all listeners to processing events without error.

```js
controller.init();
```

<a name="writing-irc-logs"></a>
# Writing IRC logs
<a name="writing-irc-logs-modelwritelogfrom-channelname-message-callback"></a>
## model.writelog(from, channelname, message, Callback)
should write into logs without errors if given valid arguments.

```js
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
model.writelog('testBot', validchannel, 'hello world', function(reply, err) {
	// Shouldn't fail
	if (err) {
		done(err);
	};
	assert.equal('undefined', typeof(reply));
	done();
});
```

<a name="reading-irc-logs"></a>
# Reading IRC logs
<a name="reading-irc-logs-modelreadlogchannelname-number-callback"></a>
## model.readlog(channelname, number, Callback)
should read from logs if given valid arguments and return error object otherwise.

```js
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
```

<a name="message-parsing"></a>
# Message Parsing
<a name="message-parsing-parsermessage"></a>
## parser(message)
should return a string opcode if the passed message is a command and undefined otherwise.

```js
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
```

<a name="reply-formatting"></a>
# Reply Formatting
<a name="reply-formatting-postprocessorformatreplyfrom-message"></a>
## postprocessor.formatreply(from, message)
should return undefined when message is null or missing and format appropriately otherwise.

```js
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
```

<a name="task-scheduling"></a>
# Task Scheduling
<a name="task-scheduling-utilscheduletype-operation"></a>
## util.schedule(type, operation)
should return null if incorrect arguments are passed.

```js
// Test scheduler
assert.equal(null, util.schedule());
assert.equal(null, util.schedule('invalidinterval', function() {}));
assert.equal(null, util.schedule('annually', 'notafunction'));
```

<a name="file-naming"></a>
# File naming
<a name="file-naming-utilmakefilenameconfig-channelname"></a>
## util.makeFilename(config, channelname)
should always return a string - regardless of validity of arguments.

```js
// Test mkfilename - never fails to return a result
assert.equal('string', typeof(util.makeFilename({}, '#somechannel')));
assert.equal('string', typeof(util.makeFilename('wrongorder', {})));
```

