/* Parser module for Optimus Bot */

var commandpresets = [
	{
		regex	: /!logs?[ ][0-9]+$/i,
		op 		: 'logrequest'
	}
];

module.exports = function(message) {
	return isCommand(message);
};

function isCommand (body) {
	return commandpresets.map(function(value, index, array) {
		if(body.match(value.regex) !== null) {
			return value.op;
		}
	})[0]; // Because map returns a list of all matches
}
