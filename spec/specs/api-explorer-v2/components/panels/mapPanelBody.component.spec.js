const ko = require('knockout');
window.ko = ko;

var MapPanelBody = require('scripts/api-explorer/v2/src/components/panels/mapPanelBody.component.js');

describe("MapPanelBody component spec", function(){

	beforeEach(() => {
		this.paramsMock = {
			lat : "51.151",
			long : "30.025",
			address: 'addressMock',
			showMapPopup : 'showMapPopup',
			zoom : 18,
			width : 100,
			height : 50,
			format : 'JPEG'
		};

		this.component = new MapPanelBody(this.paramsMock);

	});

	describe('When component created', () => {
		it('should init data in view model', () => {
			expect(this.component.lat).toBe(51.151);
			expect(this.component.long).toBe(30.025);
			expect(this.component.address).toBe(this.paramsMock.address);
			expect(this.component.size).toBe('100x50');
			expect(this.component.zoom).toBe(this.paramsMock.zoom);
			expect(this.component.showMapPopup).toBe(this.paramsMock.showMapPopup);
			expect(this.component.url().replace(/\s/g, ''))
				.toBe('https://maps.googleapis.com/maps/api/staticmap?center=51.151,30.025&zoom=18&size=100x50&format=JPEG&markers=color:red%7Clabel:V%7C51.151,30.025');
		});
	});

});
