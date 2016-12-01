ko.bindingHandlers.lazyLoader = {
	init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		let params = valueAccessor();
		let _allBindings = allBindings();
		let _bindingContext = bindingContext;

		let selector = params.name === 'venueId' ? 'venues' : params.name === 'attractionId' ? 'attractions': '';
		let type = params.name === 'classificationId' ? 'id' : params.name === 'classificationName' ? 'name' : '';
		if (selector || type) {
			selector ? $(element).lazySelector({selector}) : $(element).classificationSelector({selector:'classifications', use: type});

			$(element).on('change', function() {
				params.val($(this).val())
			})
		}
	}
};
