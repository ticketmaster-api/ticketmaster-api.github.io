ko.bindingHandlers.lazyLoader = {
	init: function(element, valueAccessor) {
		let params = valueAccessor();

		let datesArr = [
			'startDateTime',
			'endDateTime',
			'onsaleStartDateTime',
			'onsaleEndDateTime'
		];
		let dateIndex = datesArr.indexOf(params.name);

		let selector = params.name === 'venueId' ? 'venues' : params.name === 'attractionId' ? 'attractions': '';
		let type = params.name === 'classificationId' ? 'id' : params.name === 'classificationName' ? 'name' : '';

		if (selector || type) {
			selector ? $(element).lazySelector({selector}) : $(element).classificationSelector({selector:'classifications', use: type});

			$(element).on('change', function() {
				params.val($(this).val())
			})
		} else if (dateIndex !== -1) {
			let btn = $('<button class="custom-input__button">&nbsp;</button>');
			let label = datesArr[dateIndex];
			let selector = $(element);

			selector.after(btn);
			btn.on( "click", function() {
				NewCssCal(label, 'yyyyMMdd', 'dropdown', true, '24');
			});

			selector.on('onchange', function() {
				debugger;
				params.val($(this).val())
			})
		}
	}
};
