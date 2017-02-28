class MapPanelBody {
	constructor({lat = null, long = null, address, showMapPopup = null, zoom = 8, width = 350, height = 400, format = 'JPEG'}) {
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
		);
		this.showMapPopup = showMapPopup;
	}
}

ko.components.register('map-panel-body', {
	viewModel: MapPanelBody,
	template:`
		<section class="map-panel-body">
			<a class="location-map-link" data-bind="click: showMapPopup" href="#">
				<img data-bind="attr: {'data-lat': lat, 'data-long': long, 'data-address': address, src: url}, imgOnError">
			</a>
		</section>
`});

module.exports = MapPanelBody;
