class MapPanelBody {
	constructor({lat = null, long = null, address, zoom = 8, width = 350, height = 400, format = 'JPEG'}) {
		this.lat = parseFloat(lat);
		this.long = parseFloat(long);
		this.address = address;
		this.size = `${width}x${height}`;
		this.zoom = zoom;
		let coordinates = `${lat},${long}`;
		this.url = ko.pureComputed(() =>
			`https://maps.googleapis.com/maps/api/staticmap
			?center=${coordinates}
			&zoom=${zoom}
			&size=${this.size}
			&format=${format}
			&markers=color:red%7Clabel:V%7C${coordinates}`
		)
	}
	showMapPopup = () => {
		let map, marker, mapEl = $('#map-popup'),
			lat = this.lat,
			lng = this.long,
			address = this.address,
			geocoder = new google.maps.Geocoder(),
			coordinates = lat && lng ? {lat, lng} : new google.maps.LatLng(0, 0);

		// initialize map object
		map = new google.maps.Map(document.getElementById('map'), {
			center: coordinates,
			zoom: this.zoom
		});

		if (address){ // if there was address provided
			geocodeAddress(geocoder, map, address, function(result){ // geocode address and center the map
				coordinates = result;
			});
		} else { // if not (means lat and long were provided)
			marker = new google.maps.Marker({ //Create a marker and set its position.
				position: coordinates,
				map
			});
		}
		// when map popup is shown
		mapEl.on("shown.bs.modal", function () {
			google.maps.event.trigger(map, "resize");
			// Recenter the map now that it's been redrawn
			map.setCenter(coordinates);
		});
		mapEl.modal(); // show map popup
	}
}


module.exports = ko.components.register('map-panel-body', {
	viewModel: MapPanelBody,
	template:`
		<section class="map-panel-body">
			<a class="location-map-link" data-bind="click: showMapPopup" href="#">
				<img data-bind="attr: {'data-lat': lat, 'data-long': long, 'data-address': address, src: url}, imgOnError">
			</a>
		</section>
`});
