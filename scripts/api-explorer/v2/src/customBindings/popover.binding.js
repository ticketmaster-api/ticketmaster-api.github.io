var common = {
	container: 'body',
	trigger: 'hover',
	placement: 'bottom'
};

ko.bindingHandlers.popover = {
	update: function(element, valueAccessor) {
		var $element = $(element);
		var params = valueAccessor();
		var config = $.extend({}, common, params, {data: null});

		if (params.type === 'popover' && params.data) {
			var data = ko.unwrap(params.data);
			config.title = `Error ${data[0]}: ${data[1]}`;
			config.content = data[2];
			$element.popover(config);
			if (config.trigger === 'click') {
				var timer;
				$element.on('shown.bs.popover', function () {
					timer = setTimeout(function () {
						$element.trigger('click');
					}, 2000);
				});
				$element.on('hide.bs.popover', function () {
					clearInterval(timer);
				});
			}
		} else {
			config.delay = {
				"show": 1500,
				"hide": 100
			};
			config.title = params.title || config.title;
			$element.tooltip(config);
		}
	}
};
