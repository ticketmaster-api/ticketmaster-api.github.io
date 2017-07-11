ko.bindingHandlers.lazyLoader = {
	init: function(element, valueAccessor) {
		let params = valueAccessor();
		let name = params.name.toLowerCase();
		let datesArr = [
			'startDateTime',
			'endDateTime',
			'onsaleStartDateTime',
			'onsaleEndDateTime',
			'onsaleOnStartDate',
			'onsaleOnAfterStartDate'
		];
		let dateIndex = datesArr.indexOf(params.name);

		let selector = name === 'venueid' ? 'venues' : name === 'attractionid' ? 'attractions': '';
		let type = name === 'classificationid' ? 'id' : name === 'classificationname' ? 'name' : '';

		if (dateIndex !== -1) {
			addCalendar();
		} else if (selector || type) {
			selector ? $(element).lazySelector({selector}) : $(element).classificationSelector({selector:'classifications', use: type});

			$(element).on('change', function() {
				params.val($(this).val())
			})
		} else if(params.name.toLowerCase() === 'latlong'){
			addLatlong();
		}
		
		function addCalendar() {
			let btn = $('<button class="custom-input__button">&nbsp;</button>');
			let label = datesArr[dateIndex];
			let selector = $(element);

			selector.after(btn);
			btn.on( "click", function() {
				NewCssCal(label, 'yyyyMMdd', 'dropdown', true, '24');
			});

			selector.on('onchange', function() {
				params.val($(this).val())
			})
		}
		
		function addLatlong() {
			let $input = $(element),
				btnLatlong = $('<a href="#" id="js_widget_modal_map__open" class="latlong-picker"></a>'),
				$widgetModalMap = $('#js_widget_modal_map');

			$input.after(btnLatlong);

			btnLatlong.on('click', function(e){
				e.preventDefault();
				$widgetModalMap.modal('show');
				google.maps.event.trigger(map_latlong, 'resize');
			});

			$('#js_widget_modal_map').on('shown.bs.modal', function() {
				google.maps.event.trigger(map_latlong, 'resize');
				/*set senter on map_open*/
				/*
				var tmp_currentLatLng = $input.val().split(','); //document.getElementById('latlong').value.split(',');
				var currentLatLng = new google.maps.LatLng(parseInt(tmp_currentLatLng[0].replace(/\s+/g, ''))||49.2336287, parseInt(tmp_currentLatLng[1].replace(/\s+/g, ''))||28.4669495);
				map_latlong.setCenter(currentLatLng);
				*/
			});

			$('#js_widget_modal_map__close').on('click', function(){
				$widgetModalMap.modal('hide');
				$input.val($input.val().replace(/\s+/g, ''));
				params.val($input.val()); //instead of 'onchange'
			});

		}
	}
};
