
ko.bindingHandlers.imgOnError = {
	init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		let $element = $(element);
		let params = valueAccessor();

		$element
			.on('error', function() {
				console.warn('error');
				$element.parents('.map-panel-body').css('display', 'none');
			});
		ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
			if ($element.clipboard && typeof $element.clipboard.destroy === "function") {
				$element.clipboard && $element.clipboard.destroy();
				delete $element.clipboard;
			}
		});
	}
};
