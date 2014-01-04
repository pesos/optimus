/* Scheduler - Can be used to schedule tasks to be executed at particuar time */

// var schedule = require('node-schedule');
var debuglogger = require('../debuglogger');
var cronJob = require('cron').CronJob;

/* Cron reference

* * * * * *
| | | | | | 
| | | | | +-- Year              (range: 1900-3000)
| | | | +---- Day of the Week   (range: 1-7, 1 standing for Monday)
| | | +------ Month of the Year (range: 1-12)
| | +-------- Day of the Month  (range: 1-31)
| +---------- Hour              (range: 0-23)
+------------ Minute            (range: 0-59)

*/

exports.scheduleTask = function(type, operation) {
	var cronString;
	switch(type) {
	case 'annually':
		cronString = '0 0 1 1 * *';
		break;
	case 'monthly':
		cronString = '0 0 1 * * *';
		break;
	case 'weekly':
		cronString = '0 0 * * 1 *';
		break;
	case 'daily':
		cronString = '0 0 * * * *';
		break;
	case 'hourly':
		cronString = '0 * * * * *0'
		break;
	default:
		return null;
	};
	var job = new cronJob({
	  cronTime: cronString,
	  onTick: operation,
	  start: true
	});
	return job;
};
