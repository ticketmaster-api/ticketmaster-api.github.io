const $ = require('jquery');
const ko  = require('knockout');

window.ko = ko;
window.$ = $;

require('knockout-postbox');

jest.mock('scripts/api-explorer/v2/src/services/index.js', () => ({
	colorsService:{
		colors: ['color1', 'color2']
	}
}));

jest.mock('scripts/api-explorer/v2/src/modules/slider', () => ({
	set: jest.fn(),
	remove: jest.fn()
}));

var colorsService = require('scripts/api-explorer/v2/src/services/index.js').colorsService;
var slider = require('scripts/api-explorer/v2/src/modules/slider');

var RequestListComponent = require('scripts/api-explorer/v2/src/components/request/requestList.component.js');

describe("RequestListComponent component spec", function(){
	var requestsUpdateMock = [{
		index:1,
	},{
		index:2,
		error: 'errorObject'
	},{
		index:3
	}];


	beforeEach(() => {
		this.paramsMock ={
			selectedParams: 'selectedParamsMock',
			sharePath: 'sharePathMock',
			setParams: 'setParams'
		};

		this.component = new RequestListComponent(this.paramsMock);
	});

	describe('When component created', () => {
		it('should init data in view model', () => {
			expect(this.component.url).toBe(this.paramsMock.selectedParams);
			expect(this.component.sharePath).toBe(this.paramsMock.sharePath);
			expect(this.component.setParams).toBe(this.paramsMock.setParams);
			expect(this.component.colors).toBe(colorsService.colors);
			expect(this.component.viewModel()).toEqual([]);
			expect(this.component.requests()).toEqual([]);
			expect(this.component.clearBtnIsVisible()).toBeFalsy();
		});
	});

	describe('When stream "REQUESTS_ARR" updated', () => {

		beforeEach(() => {
			Object.getProp = jest.fn((obj, key) => key);
			jasmine.clock().install();
			ko.observable(requestsUpdateMock).publishOn("REQUESTS_ARR");
		});

		afterEach(function() {
			jasmine.clock().uninstall();
		});

		it('should update "requests" model property', () => {
			expect(this.component.requests()).toEqual(requestsUpdateMock);
		});

		it('should update "viewModel" model property', () => {
			var controlViewModel = [{
				"active": jasmine.any(Function),
				"color": "color2",
				"copiedForShare": jasmine.any(Function),
				"copiedUrl": jasmine.any(Function),
				"index": 1,
				"isActiveMoreMenu": jasmine.any(Function),
				"paramsAreSeted": jasmine.any(Function),
				"resHTML": jasmine.any(Function)
			}, {
				"active": jasmine.any(Function),
				"color": "color1",
				"copiedForShare": jasmine.any(Function),
				"copiedUrl": jasmine.any(Function),
				"error": jasmine.any(Function),
				"index": 2,
				"isActiveMoreMenu": jasmine.any(Function),
				"paramsAreSeted": jasmine.any(Function),
				"resHTML": jasmine.any(Function)
			}, {
				"active": jasmine.any(Function),
				"color": "color2",
				"copiedForShare": jasmine.any(Function),
				"copiedUrl": jasmine.any(Function),
				"index": 3,
				"isActiveMoreMenu": jasmine.any(Function),
				"paramsAreSeted": jasmine.any(Function),
				"resHTML": jasmine.any(Function)
			}];
			expect(this.component.viewModel()).toEqual(controlViewModel);
		});

		it('should update slider', () => {
			spyOn($.fn, 'trigger');
			expect(slider.remove).toBeCalledWith(3);
			jasmine.clock().tick(11);
			expect($.fn.trigger).toBeCalledWith('click');
		});
	});

	describe('When method "onClearRequests" called', () => {
		it('should be set empty array into "requests" model property', () => {
			ko.observable(requestsUpdateMock).publishOn("REQUESTS_ARR");
			expect(this.component.requests().length).toBe(3);
			this.component.onClearRequests();
			expect(this.component.requests().length).toBe(0);
			expect(this.component.requests()).toEqual([]);
		});
	});
});
