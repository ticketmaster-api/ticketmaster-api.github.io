ko.bindingHandlers.blockEllipsis = {
	init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		$clamp(element, valueAccessor());
	}
};
