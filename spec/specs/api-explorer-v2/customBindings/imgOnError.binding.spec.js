const ko = require('knockout');
const $ = require('jquery');

window.ko = ko;
window.$ = $;

require('scripts/api-explorer/v2/src/customBindings/imgOnError.binding.js');

describe("ImgOnError  binding spec", function(){
	function setFixture () {
		document.body.innerHTML =
			'<div>' +
				'<div class="map-panel-body">' +
					'<div id="element"></div>' +
				'</div>' +
			'</div>';
	};

	var element, disposeCallback, fakeClipboard;
	beforeEach(() => {
		setFixture();
		element = document.getElementById('element');
		fakeClipboard = {
			destroy:jest.fn()
		};
		$.fn.clipboard = fakeClipboard;
		ko.utils.domNodeDisposal.addDisposeCallback = jest.fn((elem, callback) => disposeCallback = callback );
		ko.bindingHandlers.imgOnError.init(element, ko.observable(), 'allBindings', 'viewModel', 'bindingContext');
	});

	describe('When binding required', () => {
		it('should be defined', () => {
			expect(ko.bindingHandlers.imgOnError).toBeDefined();
			expect(ko.bindingHandlers.imgOnError).toEqual({
				init: jasmine.any(Function)
			});
		});
	});

	describe('When initialized', () => {
		it('should be registered dispose callback', () => {
			expect(ko.utils.domNodeDisposal.addDisposeCallback).toBeCalledWith(element, jasmine.any(Function))
		});
	});

	describe('When error event triggered', () => {
		it('should be hide panel body', () => {
			spyOn(console, 'warn');
			expect($('.map-panel-body').css('display')).toBe('block');
			$(element).trigger('error');
			expect(console.warn).toBeCalled();
			expect($('.map-panel-body').css('display')).toBe('none');
		});
	});

	describe('When dispose element triggered', () => {
		it('should be called "destroy" method on "clipboard" property', () => {
			disposeCallback();
			expect(fakeClipboard.destroy).toBeCalled();
		});
	});
});
