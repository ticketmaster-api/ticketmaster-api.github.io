var Worker = require('./highlightJson.worker'); // Json-formatter worker

module.exports = function (observable, code) {
	var worker = new Worker;

	worker.onmessage = function (event) {
		observable(event.data);
	};
	worker.onerror = function (event) {
		console.log(event);
	};

	worker.postMessage(code);
};
