/*!
 * default.js v1.0.0
 * 1. Init modal window, map picker control and google address autocomplete search for Map Widget
 * 2. Google analytics for default template
 */
function initMapLatLong() {
	var geocoder = new google.maps.Geocoder();
	var map_latlong = new google.maps.Map(document.getElementById('map_latlong'), {
		zoom: 2,
		center: {lat: 32.5468132, lng: -30.7617187},
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		panControl: false,
		streetViewControl: false,
		draggableCursor: 'pointer',
		zoomControlOptions: {
			position: google.maps.ControlPosition.RIGHT_CENTER
		},
	});
	var imageMarker = {
		url: '/assets/widgets/1.0.0/img/marker-active.svg',
		size: new google.maps.Size(22, 32)
	};
	var marker_latlong = new google.maps.Marker({
		icon: imageMarker
	});

	function getAddress(latLng) {
		geocoder.geocode( {'latLng': latLng},
			function(results, status) {
				if(status == google.maps.GeocoderStatus.OK) {
					if(results[0]) {
						document.getElementById("map_address").innerHTML = results[0].formatted_address;
						$('#pac_input').val(results[0].formatted_address);
					}
					else {
						document.getElementById("map_address").innerHTML = "No results";
					}
				}
				else {
					document.getElementById("map_address").innerHTML = status;
				}
			});
	}

	google.maps.event.addListener(map_latlong, 'click', function (event) {
		var rootInput = 'w-latlong';
		marker_latlong.setPosition(event.latLng);
		marker_latlong.setMap(map_latlong);
		marker_latlong.setAnimation(google.maps.Animation.DROP);
		if( document.getElementById(rootInput) === null) rootInput = 'latlong';
		document.getElementById(rootInput).value = event.latLng.lat().toFixed(7) + ", " + event.latLng.lng().toFixed(7);
		getAddress(event.latLng);
	});


	var pac_input = document.getElementById('pac_input');
	var autocomplete = new google.maps.places.Autocomplete(pac_input);
	autocomplete.bindTo('bounds', map_latlong);
	map_latlong.controls[google.maps.ControlPosition.TOP_LEFT].push(pac_input);

	autocomplete.addListener('place_changed', function() {
		var place = autocomplete.getPlace();
		if (!place.geometry) {
			return;
		}
		if (place.geometry.viewport) {
			map_latlong.fitBounds(place.geometry.viewport);
		} else {
			map_latlong.setCenter(place.geometry.location);
			map_latlong.setZoom(17);
		}

		// Set the position of the marker using the place ID and location.
		marker_latlong.setPosition(place.geometry.location);
		marker_latlong.setMap(map_latlong);
		marker_latlong.setAnimation(google.maps.Animation.DROP);
		var rootInput = 'w-latlong';
		if( document.getElementById(rootInput) === null) rootInput = 'latlong';
		document.getElementById(rootInput).value = place.geometry.location.lat().toFixed(7) + ", " + place.geometry.location.lng().toFixed(7);
		getAddress(place.geometry.location);
		map_latlong.setZoom(7);
	});

	$('#js_widget_modal_map').on('shown.bs.modal', function() {
		google.maps.event.trigger(map_latlong, 'resize');
		var tmp_currentLatLng = document.getElementById('w-latlong').value.split(',');
		var currentLatLng = new google.maps.LatLng(parseInt(tmp_currentLatLng[0].replace(/\s+/g, '')), parseInt(tmp_currentLatLng[1].replace(/\s+/g, '')));
		map_latlong.setCenter(currentLatLng);
	});
}

