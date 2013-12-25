/* Utility module used to construct filenames for logfiles */

module.exports = function(config, channelname) {
	var identifier;

	if (config.datetime) {
		var datestring = (new Date()).toISOString();
		switch(config.interval) {
		case 'hourly' :
			identifier = datestring.split(':')[0];
			break;
		case 'daily' :
		case 'weekly' :
			identifier = datestring.split('T')[0];
			break;
		case 'monthly' :
			identifier = datestring.split('T')[0].slice(0,7);
			break;
		case 'annually' :
			identifier = datestring.split('T')[0].slice(0,4);
			break;
		default:
			identifier = makeid(5);
			break;
		}
	} else {
		identifier = makeid(5);
	}

	if (config.channelname === true) {
		identifier = channelname + config.separator + identifier;
	};

	identifier.replace(/-/g, config.separator);

	var filename = config.location + config.prefix + config.separator + identifier + config.extension;
	return filename;
};

function makeid(length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}