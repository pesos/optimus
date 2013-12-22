/* A turk for Optimus
 * Pun derived from Amazon Mechanical Turk
 * Used to delegate computation intensive tasks to worker processes
 */

var cluster = require('cluster');

exports.delegate = function(task, thisArg, args) {
	if(cluster.isMaster) {
		cluster.fork();
	} else {
		task.apply(thisArg, args);
	}
};
