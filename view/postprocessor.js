/* Post processor - This module handles the post processing of replies */

var replyformat = require('../config').ircreplyformat;

exports.formatreply = function(from, message) {
	if (message == null || typeof message === 'undefined' ||
		from == null || typeof from === 'undefined') {
		return undefined;  // Should NEVER happen
	};
	var formattedreply = '';
	if (replyformat.mentionuser) {
		formattedreply += from + replyformat.separator;
	}
	formattedreply += message;
	return formattedreply;
};
