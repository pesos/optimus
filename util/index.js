/* Consists of utility modules used by the project */

/* Task Scheduler. To schedule running of operations */
var schedule = require('node-schedule');

exports.scheduleTask = function(type, operation) {
	var rule = new schedule.RecurrenceRule();
	if (type === 'monthly') {
		rule.hour = 0;
		rule.minute = 0;
		rule.date = 1;
	} else if (type === 'daily') {
		rule.hour = 0;
		rule.minute = 0;
	} else if (type === 'hourly') {
		rule.minute = 0;
	}
	var job = schedule.scheduleJob(rule, operation);
	return job;
};
