const ko = require('knockout');
const $ = require('jquery');
window.ko = ko;
window.$ = $;

var Panel = require('scripts/api-explorer/v2/src/components/panels/panel.component.js');

describe("Panel component spec", function() {
	var indexMock = 8;

	var setFixture = () => {
		document.body.innerHTML =
			'<div>' +
				'<div id="map-popup"></div>' +
				'<div id="map"></div>' +
			'</div>';
	};

	beforeEach(() => {
		setFixture();
		Object.getProp = jest.fn(() => true);
		this.paramsMock = {
			$data: {
				key: 'panelKeyMock',
				value: {
					latitude:'44.156',
					longitude: '27.0154',
					address: 'address'
				}
			},
			panelGroup: {
				page: 'page',
				config: {
					panelKeyMock:{
						someProp: 'someValue'
					}
				},
				collapseId: 2,
				colorClass: 'colorClass'
			},
			$index: ko.observable(indexMock)
		};

		this.component = new Panel(this.paramsMock);


	});

	describe('When component created', () => {
		it('should init data in view model', () => {

			expect(this.component.$data).toBe(this.paramsMock.$data);
			expect(this.component.key).toBe(this.paramsMock.$data.key);
			expect(this.component.$index).toBe(indexMock);
			expect(this.component.panelGroup).toBe(this.paramsMock.panelGroup);
			expect(this.component.page).toBe(this.paramsMock.panelGroup.page);
			expect(this.component.colorClass).toBe(this.paramsMock.panelGroup.colorClass);
			expect(this.component.config).toEqual({_CONFIG:{}, ...this.paramsMock.panelGroup.config.panelKeyMock});
			expect(this.component.isExpanded).toBe(false);
			expect(this.component.collapseId).toBe(this.paramsMock.panelGroup.collapseId + indexMock);
			expect(this.component.isActive()).toBe(false);
			expect(this.component.subjectID()).toBe('');
			expect(this.component.lat).toBe(this.paramsMock.$data.value.latitude);
			expect(this.component.long).toBe(this.paramsMock.$data.value.longitude);
			expect(this.component.address).toBe(this.paramsMock.$data.value.address);
		});

		it('should init css classes', () => {
			expect(this.component.cssClasses).toEqual({
				colorClass: true,
				active: jasmine.any(Function)
			});
		})
	});

	describe('When setActive called', () => {
		it('should be inverse isActive value', () => {
			expect(this.component.isActive()).toBe(false);
			this.component.setActive();
			expect(this.component.isActive()).toBe(true);
			this.component.setActive();
			expect(this.component.isActive()).toBe(false);
		});
	});

	describe('When showMapPopup called', () => {


		var googleMapMock = {
			setCenter:jest.fn()
		};
		var geocoderMock = {
			geocoder:true
		};
		beforeEach(() => {
			window.google = {
				maps: {
					Marker:jest.fn(),
					Map:jest.fn(() => googleMapMock),
					LatLng:jest.fn((lat, lng) => ({lat, lng})),
					Geocoder: jest.fn(() =>geocoderMock),
					event: {
						trigger: jest.fn()
					}
				}
			};

			window.geocodeAddress = jest.fn();
			$.fn.modal = jest.fn();
			this.component.showMapPopup();
		});

		it('should be inverse init GoogleMap with center and zoom', () => {
			expect(window.google.maps.Map).toBeCalledWith(jasmine.any(Object), {
				center: { lat: 44.156, lng: 27.0154 },
				zoom: 8
			});
		});

		it('should show modal window', () => {
			expect($.fn.modal).toBeCalled();
		});

		it('should trigger resize event when modal was shown', () => {
			$('#map-popup').trigger('shown.bs.modal');
			expect(window.google.maps.event.trigger).toBeCalledWith(googleMapMock, 'resize');
			expect(googleMapMock.setCenter).toBeCalledWith({ lat: 44.156, lng: 27.0154 });
		});

		it('should be request address coordinates by geocodeAddress method', () => {
			var mockLatLng = {lat: 'newLat', lng: 'newLng'};
			geocodeAddress = jest.fn((a,b,c,clbck) => {
				clbck(mockLatLng);
			});
			this.component.showMapPopup();
			$('#map-popup').trigger('shown.bs.modal');
			expect(googleMapMock.setCenter).toBeCalledWith(mockLatLng);
			expect(geocodeAddress).toBeCalledWith(geocoderMock, googleMapMock, this.paramsMock.$data.value.address, jasmine.any(Function));
		});

		it('should create marker if no have address', ()=>{
			this.component.address = null;
			this.component.showMapPopup();
			expect(window.google.maps.Marker).toBeCalledWith({
				position: { lat: 44.156, lng: 27.0154 },
				map: googleMapMock
			});
		});

		it('should create map with zero coordinates when lat long missing in', () => {
			this.component.lat = null;
			this.component.long = null;
			this.component.showMapPopup();
			expect(window.google.maps.Map).toBeCalledWith(jasmine.any(Object), {
				center: { lat: 0, lng: 0 },
				zoom: 8
			});
		});
	});
});
