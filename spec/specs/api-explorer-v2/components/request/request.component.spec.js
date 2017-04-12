const $ = require('jquery');
const ko  = require('knockout');

window.ko = ko;
window.$ = $;

jest.mock('scripts/api-explorer/v2/src/services/index.js', () => ({
	jsonHL:jest.fn()
}));

var RequestComponent = require('scripts/api-explorer/v2/src/components/request/request.component.js');
var jsonHL = require('scripts/api-explorer/v2/src/services/index.js').jsonHL;

describe("RequestComponent component spec", function(){
	var setFixture = () => {
		document.body.innerHTML =
			'<div class="panel">' +
				'<div class="slick-slider">' +
					'<div class="slick-track">test</div>' +
					'<div id="target" />' +
				'</div>' +
			'</div>';
	};

	beforeEach(() => {
		this.paramsMock ={
			data:{
				response:'responseMock',
				req: 'req',
				color: 'colorMock',
				active: ko.observable(true),
				isActiveMoreMenu: ko.observable(true),
				copiedForShare: 'copiedForShareMock',
				paramsAreSeted: ko.observable(false),
				copiedUrl: 'copiedUrlMock',
				resHTML: ko.observable([])

			},
			index: ko.observable('index-mock'),
			sharePath: 'sharePathMock',
			setParams: jest.fn()
		};

		this.component = new RequestComponent(this.paramsMock);
	});

	describe('When component created', () => {
		it('should init data in view model', () => {
			expect(this.component.data).toBe(this.paramsMock.data);
			expect(this.component.response).toBe(this.paramsMock.data.response);
			expect(this.component.hasResponse).toBeTruthy();
			expect(this.component.req).toBe(this.paramsMock.data.req);
			expect(this.component.jsonHL).toBe(jsonHL);
			expect(this.component.color).toBe(this.paramsMock.data.color);
			expect(this.component.active).toBe(this.paramsMock.data.active);
			expect(this.component.isActiveMoreMenu).toBe(this.paramsMock.data.isActiveMoreMenu);
			expect(this.component.copiedForShare).toBe(this.paramsMock.data.copiedForShare);
			expect(this.component.paramsAreSeted).toBe(this.paramsMock.data.paramsAreSeted);
			expect(this.component.copiedUrl).toBe(this.paramsMock.data.copiedUrl);
			expect(this.component.resHTML).toBe(this.paramsMock.data.resHTML);
			expect(this.component.sharePath).toBe(this.paramsMock.sharePath);
			expect(this.component.rootsetParams).toBe(this.paramsMock.setParams);
			expect(this.component.ids).toEqual({
				"details": {
					"controls": "collapse-index-mock",
					"id": "show-details-index-mock",
					"target": "#collapse-index-mock"
				},
				"wrapper": "heading-index-mock"
			});
		});
	});

	describe('When "setParams" called', () => {
		it('should update params', () => {
			jasmine.clock().install();

			expect(this.component.paramsAreSeted()).toBeFalsy();

			this.component.setParams();

			expect(this.component.paramsAreSeted()).toBeTruthy();

			jasmine.clock().tick(501);

			expect(this.component.paramsAreSeted()).toBeFalsy();
			expect(this.paramsMock.setParams).toBeCalledWith(this.paramsMock.data);

			jasmine.clock().uninstall();
		});
	});

	describe('When method "getMoreMenu" called', () => {
		it('should invert "isActiveMoreMenu" value', () => {
			expect(this.component.isActiveMoreMenu()).toBeTruthy();
			this.component.getMoreMenu();
			expect(this.component.isActiveMoreMenu()).toBeFalsy();
			this.component.getMoreMenu();
			expect(this.component.isActiveMoreMenu()).toBeTruthy();
		});
	});

	describe('When method "getDetails" called', () => {
		beforeEach(()=>{
			setFixture();
			$.fn.slick = jest.fn();
			jasmine.clock().install();
		});
		afterEach(function() {
			jasmine.clock().uninstall();
		});

		it('should update json highlight and slider', () => {
			this.component.getDetails(null, {
				currentTarget: $('#target')
			});
			expect(jsonHL).toBeCalledWith(this.paramsMock.data.resHTML, this.paramsMock.data.response);

			jasmine.clock().tick(1);
			expect($.fn.slick).toBeCalledWith('setPosition');
		});
		it('should inverse active state', () => {
			var prevActiveState = this.component.active();
			this.component.getDetails(null, {
				currentTarget: $('#target')
			});
			expect(this.component.active()).toBe(!prevActiveState);
		})
	});

	describe('When method "getRawData" called', () => {
		it('should open window with json text', () => {
			var newWindowMock = {
				focus: jest.fn()
			};

			var modelMock = {
				response: {
					someKey: 'someValue',
					someKey2: 'someValue2'
				}
			};

			spyOn(window, 'open').and.returnValue(newWindowMock);

			this.component.getRawData(modelMock);

			expect(window.open).toBeCalledWith("data:text/json," + encodeURI(JSON.stringify(modelMock.response, null, 2)), '_blank');
			expect(newWindowMock.focus).toBeCalled();
		});
	});

	describe('When model getters called', () => {
		it('should return value for "setParamsPopover" property', () => {
			expect(this.component.setParamsPopover).toEqual({
				type: 'tooltip',
				title: 'Repeat settings of this request'
			});
		});

		it('should return value for "sharePathPopover" property', () => {
			expect(this.component.sharePathPopover).toEqual({
				type: 'tooltip',
				title: 'Copy request share link'
			});
		});

		it('should return value for "copyUrlPopover" property', () => {
			expect(this.component.copyUrlPopover).toEqual({
				type: 'tooltip',
				title: 'Copy request URL'
			});
		});

		it('should return value for "getRawDataPopover" property', () => {
			expect(this.component.getRawDataPopover).toEqual({
				type: 'tooltip',
				title: 'Show raw response data'
			});
		});
	});
});
