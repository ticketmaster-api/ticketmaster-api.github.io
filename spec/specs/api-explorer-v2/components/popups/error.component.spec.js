const ko = require('knockout');
const $ = require('jquery');
window.ko = ko;
window.$ = $;
require('knockout-postbox');

var ErrorPopUp = require('scripts/api-explorer/v2/src/components/popups/error.component.js');

describe("ErrorPopUp component spec", function() {
	beforeEach(() => {
		$.fn.modal = jest.fn();
		this.component = new ErrorPopUp();
	});

	describe('When component created', () => {
		it('should init data in view model', () => {
			expect(this.component.status()).toBe('');
			expect(this.component.statusText()).toBe('');
			expect(this.component.details()).toBe('');
		});
	});

	describe('When stream "REQUEST_ERROR" updated', () => {
		var errorObjMock = {

		};
		beforeEach(() => {
			Object.getProp = jest.fn((obj, key) => {
				switch (key){
					case '.responseJSON.errors[0].status':
								return 'statusMock';
					case '.responseJSON.errors[0].statusText':
								return 'statusTextMock';
					case '.responseJSON.errors[0].detail':
								return 'detailMock';
				}
				throw ('Invalid KEY "' + key+'"');
			});
			ko.observable(errorObjMock).syncWith('REQUEST_ERROR');
		});

		it('should be update model', () => {
			expect(this.component.status()).toBe('statusMock');
			expect(this.component.statusText()).toBe('statusTextMock');
			expect(this.component.details()).toBe('detailMock');
		});
		it('should be show modal', () => {
			expect($.fn.modal).toBeCalledWith('show');
		});
	});

	describe('When method togglePopUp called', () => {
		it('should be show modal', () => {
			this.component.togglePopUp();
			expect($.fn.modal).toBeCalledWith('show');
		})
	})
});
