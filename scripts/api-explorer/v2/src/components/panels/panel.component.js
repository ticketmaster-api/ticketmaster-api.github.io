class Panel {
	constructor({$data = {}, panelGroup = {}, $index}) {
		this.$data = $data;
		this.key = $data.key;
		this.$index = ko.unwrap($index);
		this.panelGroup = panelGroup;
		this.page = panelGroup.page;
		this.colorClass = panelGroup.colorClass || '';
		this.config = this.constructor.panelConfig({config: panelGroup.config, key: this.key});
		this.isExpanded = this.constructor.isExpanded(this.config);
		this.collapseId = panelGroup.collapseId + this.$index;
		this.isActive = ko.observable(this.isExpanded);
		this.subjectID = ko.observable('');
		this.lat = $data.value.latitude;
		this.long = $data.value.longitude;
		this.address = $data.value.address;
	}

	setActive(model, event) {
		this.isActive(!this.isActive());
	}
	
	showMapPopup = () => {
		let map, marker, mapEl = $('#map-popup'),
			lat = parseFloat(this.lat, 10),
			lng = parseFloat(this.long, 10),
			address = this.address,
			geocoder = new google.maps.Geocoder(),
			coordinates = lat && lng ? {lat, lng} : new google.maps.LatLng(0, 0);
		
		// initialize map object
		map = new google.maps.Map(document.getElementById('map'), {
			center: coordinates,
			zoom: 8
		});
		
		if (address){ // if there was address provided
			geocodeAddress(geocoder, map, address, result => { // geocode address and center the map
				coordinates = result;
			});
		} else { // if not (means lat and long were provided)
			marker = new google.maps.Marker({ //Create a marker and set its position.
				position: coordinates,
				map
			});
		}
		// when map popup is shown
		mapEl.on("shown.bs.modal", e => {
			google.maps.event.trigger(map, "resize");
			// Recenter the map now that it's been redrawn
			map.setCenter(coordinates);
		});
		mapEl.modal(); // show map popup
	};
	
	/**
	 * Gets config for each panel
	 * @param config
	 * @param key
	 * @returns {*|{}}
	 */
	static panelConfig({config, key}) {
		let subConfig = config[key] || {};

		subConfig._CONFIG = $.extend(true, {}, config._CONFIG, subConfig._CONFIG);
		return subConfig;
	}

	/**
	 * Checks for 'expanded' config for each panel
	 * @param config
	 * @returns {boolean}
	 */
	static isExpanded(config) {
		return !(Object.getProp(config, '._CONFIG.collapsed') || false);
	}

	get cssClasses() {
		return {[this.colorClass]: true, active: this.isActive};
	}
}

ko.components.register('panel', {
	viewModel: Panel,
	template:`
		<section data-bind="css: cssClasses" class="panel panel-primary">
			<!--panel-heading-->
			<panel-heading params="
				showMapPopup: showMapPopup,
				panelGroup: panelGroup,
				config: config,
				data: $data,
				index: $index,
				page: page,
				setActive: setActive.bind($component),
				collapseId: collapseId,
				colorClass: colorClass,
				isExpanded: isExpanded,
				subjectID:subjectID
			"></panel-heading>
			
			<!--panel-body-->
			<section data-bind="attr: {'id': collapseId}, css: {'in': isExpanded}" class="panel-collapse collapse">				
				<!--ko if: key === 'location' -->
					<map-panel-body params="lat: lat, long: long, address: address, showMapPopup: showMapPopup"></map-panel-body>
				<!-- /ko -->
				<!-- ko if: (typeof $data.value === 'object' && !$.isArray($data.value)) -->
					<object-panel-body params="config: config, data: $data, index: $index, panelGroup: panelGroup, page: page, collapseId: collapseId, subjectID: subjectID"></object-panel-body>
				<!-- /ko -->
				<!-- ko if: (typeof $data.value === 'object' && $.isArray($data.value)) -->
					<array-panel-body params="config: config, data: $data, index: $index, panelGroup: panelGroup"></array-panel-body>
				<!-- /ko -->
			</section>
		</section>
`});

module.exports = Panel;