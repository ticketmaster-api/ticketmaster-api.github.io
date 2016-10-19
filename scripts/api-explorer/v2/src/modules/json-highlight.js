var Worker = require('./highlightJson.worker.js'); // Json-formatter worker

module.exports = function (observable, code) {
	var animTime = 100;
	var worker = new Worker;

	worker.onmessage = function (event) {
		observable(event.data);

		$(document)
			.on('click touch', '.tm-code-container .expanded', function jsonCodeContainerExpanded(e) {
				e.preventDefault();
				e.stopPropagation();
				var $self = $(this);
				$self
					.parent()
					.find('>ul')
					.slideUp(animTime, function() {
						$self.addClass('collapsed');
					});
			})
			.on('click touch', '.tm-code-container .expanded.collapsed', function jsonCodeContainerCollapsed(e) {
				e.preventDefault();
				e.stopPropagation();
				var $self = $(this);
				$self
					.removeClass('collapsed')
					.parent()
					.find('>ul')
					.slideDown(animTime, function() {
						$self
							.removeClass('collapsed')
							.removeClass('hidden');
					});
			})
	};
	worker.onerror = function (event) {
		console.log(event);
	};

	worker.postMessage(code);
};
