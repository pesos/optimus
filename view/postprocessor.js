/* Post processor - This module handles the post processing of replies */

var replyformat = require('../config').ircreplyformat;

exports.formatreply = function(from, message) {
	var formattedreply = '';
	if (replyformat.mentionuser) {
		formattedreply += from + replyformat.separator;
	}
	formattedreply += message;
	return formattedreply;
};
