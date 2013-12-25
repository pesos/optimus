/* Scheduler - Can be used to schedule tasks to be executed at particuar time */

var schedule = require('node-schedule');

exports.scheduleTask = function(type, operation) {
	var rule = new schedule.RecurrenceRule();
	if (type === 'annually') {
		rule.month = 0;
		rule.date = 1;
		rule.hour = 0;
		rule.minute = 0;
	} else if (type === 'monthly') {
		rule.date = 1;
		rule.hour = 0;
		rule.minute = 0;
	} else if (type === 'weekly') {
		rule.dayOfWeek = 0;
		rule.hour = 0;
		rule.minute = 0;
	} else if (type === 'daily') {
		rule.hour = 0;
		rule.minute = 0;
	} else if (type === 'hourly') {
		rule.minute = 0;
	}
	var job = schedule.scheduleJob(rule, operation);
	return job;
};
