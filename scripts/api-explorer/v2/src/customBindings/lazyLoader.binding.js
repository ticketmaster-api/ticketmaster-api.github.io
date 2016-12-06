ko.bindingHandlers.lazyLoader = {
	init: function(element, valueAccessor) {
		let params = valueAccessor();
		let name = params.name.toLowerCase();
		let datesArr = [
			'startDateTime',
			'endDateTime',
			'onsaleStartDateTime',
			'onsaleEndDateTime'
		];
		let dateIndex = datesArr.indexOf(params.name);

		let selector = name === 'venueid' ? 'venues' : name === 'attractionid' ? 'attractions': '';
		let type = name === 'classificationid' ? 'id' : name === 'classificationname' ? 'name' : '';

		if (dateIndex !== -1) {
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
		} else if (selector || type) {
			selector ? $(element).lazySelector({selector}) : $(element).classificationSelector({selector:'classifications', use: type});

			$(element).on('change', function() {
				params.val($(this).val())
			})
		}
	}
};
