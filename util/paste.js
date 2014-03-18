/* Module to create a paste */
var gist = require('octonode').client().gist();

module.exports = function(text, channel, number, Callback) {
	gist.create({
	  description: number + ' lines of logs from ' + channel + ' irc channel' ,
	  public: true,
	  files: { 
	  	"log.txt": {
	  		content : text
	  	}
	  }
	}, function (error, response) {
  		Callback(response.html_url);
	});
};
