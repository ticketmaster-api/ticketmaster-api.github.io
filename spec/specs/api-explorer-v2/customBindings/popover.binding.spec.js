const ko = require('knockout');
const $ = require('jquery');

window.ko = ko;
window.$ = $;

require('scripts/api-explorer/v2/src/customBindings/popover.binding.js');

describe("Popover binding spec", function(){
	var element, valueAccessorParams, dataMock;
	function setFixture () {
		document.body.innerHTML =
			'<div>' +
				'<div id="element"/>' +
			'</div>';
	}

	beforeEach(() => {
		$.fn.tooltip = jest.fn();
		$.fn.popover = jest.fn();
		setFixture();
		element = document.getElementById('element');
		dataMock = [
			'fist-el-mock',
			'second-el-mock',
			'third-el-mock'
		];

		valueAccessorParams = {
			someValueAccessorParam: 'someValue',
			title: 'Title Mock',
			data: ko.observable(dataMock),
			trigger: 'click',
			type: 'popover'
		};
	});

	describe('When binding required', () => {
		it('should be defined', () => {
			expect(ko.bindingHandlers.popover).toBeDefined();
			expect(ko.bindingHandlers.popover).toEqual({
				update: jasmine.any(Function)
			});
		});
	});

	describe('When "popover" type update', () => {
		beforeEach(() => {
			jasmine.clock().install();
			spyOn($.fn, 'trigger').and.callThrough();
			ko.bindingHandlers.popover.update(element, ko.observable(valueAccessorParams));
		});

		afterEach(function() {
			jasmine.clock().uninstall();
		});

		it('should be init popover for element', () => {
			expect($.fn.popover).toBeCalledWith({
				"container": "body",
				"content": "third-el-mock",
				"data": null,
				"placement": "bottom",
				"someValueAccessorParam": "someValue",
				"title": "Error fist-el-mock: second-el-mock",
				"trigger": "click",
				"type": "popover"
			});
		});

		it('should trigger click event on element after 2 seconds when opopup shown', () => {
			$(element).trigger('shown.bs.popover');
			jasmine.clock().tick(2001);
			expect($.fn.trigger).toBeCalledWith('click');
		});
		it('should not trigger "click" event if popup shown and closed less than 2 seconds', () => {
			$(element).trigger('shown.bs.popover');
			$(element).trigger('hide.bs.popover');
			jasmine.clock().tick(2001);
			expect($.fn.trigger).not.toBeCalledWith('click');
		});

	});



	describe('When non "popover" type update', () => {
		beforeEach(() => {
			valueAccessorParams.type = 'someNonPopoverType';
			ko.bindingHandlers.popover.update(element, ko.observable(valueAccessorParams));
		});

		it('should be setup "tooltip" for element', () => {
			expect($.fn.tooltip).toBeCalledWith({
				"container": "body",
				"data": null,
				"delay": {
					"hide": 100,
					"show": 1500
				},
				"placement": "bottom",
				"someValueAccessorParam": "someValue",
				"title": "Title Mock",
				"trigger": "click",
				"type": "someNonPopoverType"
			});
		});
	});
});
