ko.bindingHandlers.lazyLoader = {
	init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		let params = valueAccessor();
		let _allBindings = allBindings();
		let _bindingContext = bindingContext;

		let selector =  params.name === 'venueId' ? 'venues' : params.name === 'attractionId' ? 'attractions': '';
		if (selector) {
			$(element).lazySelector({selector});
		}
	},
	update: function (element, valueAccessor, allBindingsAccessor){
		var bindings = allBindingsAccessor();
		if (bindings.value != null) {
			$(element).change();
		}
	}
};
