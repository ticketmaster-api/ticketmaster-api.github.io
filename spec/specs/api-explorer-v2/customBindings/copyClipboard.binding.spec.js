const ko  = require('knockout');
window.ko = ko;
require('scripts/api-explorer/v2/src/customBindings/copyClipboard.binding.js');

describe("Classifications Map binding spec", function(){

	describe('When binding required', () => {
		it('should be defined', () => {
			expect(ko.bindingHandlers.copyToClipboard).toBeDefined();
			expect(ko.bindingHandlers.copyToClipboard).toEqual({
				init: jasmine.any(Function)
			})
		});
	});


	describe('When init called', () => {
		var elementMock, clipboardMock, params, $element, disposeCallback;
		beforeEach(() => {
			elementMock = {};
			window.$ = jest.fn((input) => {
				input.addClass = jest.fn();
				input.removeClass = jest.fn();
				$element = input;
				return $element;
			});
			params = {
				text: ko.observable('mockText'),
				action: 'action',
				target: 'target',
				doneClass: 'doneClassMock',
				errorClass: 'errorClassMock',
				animationTime: 100
			};
			clipboardMock = {
				__events : {},
				on(eventName, callback) {
					this.__events[eventName] = callback;
					return this;
				},
				destroy:jest.fn()
			};

			window.Clipboard = jest.fn((el, cfg) => {
				clipboardMock.cfg = cfg;
				return clipboardMock;
			});
			ko.utils.domNodeDisposal.addDisposeCallback = jest.fn((elem, callback) => disposeCallback = callback );

			ko.bindingHandlers.copyToClipboard.init(elementMock, () => params, 'allBindings', 'viewModel', 'bindingContext');
		});

		beforeEach(()=>{
			jasmine.clock().install();
		});
		afterEach(function() {
			jasmine.clock().uninstall();
		});

		it('should be wrap element by jQuery', () => {
			expect(window.$).toBeCalledWith(elementMock);
		});

		it('should init Clipboard', () => {
			expect(window.Clipboard).toBeCalledWith(elementMock, {
				action: jasmine.any(Function),
				target: jasmine.any(Function),
				text: jasmine.any(Function)
			});
		});

		it('should be provide data for clipboard', () => {
			expect(clipboardMock.cfg.action()).toBe(params.action);
			expect(clipboardMock.cfg.target()).toBe(params.target);
			expect(clipboardMock.cfg.text()).toBe('mockText');
		});

		it('should be handle success events', () => {
			var event = {
				clearSelection: jest.fn()
			};
			clipboardMock.__events.success(event);
			expect($element.addClass).toBeCalledWith(params.doneClass);
			expect($element.removeClass).not.toBeCalled();
			jasmine.clock().tick(params.animationTime + 1);
			expect($element.removeClass).toBeCalledWith(params.doneClass);
			expect(event.clearSelection).toBeCalled();
		});

		it('should be handle success events', () => {
			spyOn(console, 'error');
			var event = {
				clearSelection: jest.fn()
			};
			clipboardMock.__events.error(event);
			expect($element.addClass).toBeCalledWith(params.errorClass);
			expect($element.removeClass).not.toBeCalled();
			jasmine.clock().tick(params.animationTime + 1);
			expect($element.removeClass).toBeCalledWith(params.errorClass);
			expect(console.error).toBeCalled();
		});


		it('should be registered dispose callback', () => {
			expect(ko.utils.domNodeDisposal.addDisposeCallback).toBeCalledWith(elementMock, jasmine.any(Function))
		});

		it('should be destroy clipboard when dispose callback called', () => {
			expect($element.clipboard).toBeDefined();
			disposeCallback();
			expect(clipboardMock.destroy).toBeCalled();
			expect($element.clipboard).not.toBeDefined();
		});
	});


});
