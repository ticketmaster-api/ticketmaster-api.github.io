const $ = require('jquery');
const ko  = require('knockout');

window.ko = ko;
window.$ = $;

require('knockout-postbox');

var ResponseComponent = require('scripts/api-explorer/v2/src/components/request/response.component.js');

describe("ResponseComponent component spec", function(){
	var slickMock = {
		slideCount: 8
	};

	var preparedDataMock = {
		some: 'Data'
	};

	var setFixture = () => {
		document.body.innerHTML =
			'<div id="slider-5">' +
			'<div class="slick-slider">' +
			'<div class="slick-track">test</div>' +
			'<div id="target" />' +
			'</div>' +
			'</div>';
	};

	beforeEach(() => {



		$.fn.slick = jest.fn(command => {
			switch (command) {

				case 'getSlick':
							return slickMock;
			}
		});

		this.paramsMock = {
			data: {
				response: 'response',
				color: 'colorMock',
				resHTML: 'resHTMLMock',
				req: 'reqMock'
			},
			index: ko.observable(5),
			config: 'config',
			setParams: 'setParams',
			getRandomColor: 'getRandomColor'
		};

		this.component = new ResponseComponent(this.paramsMock);
	});

	describe('When component created', () => {
		it('should init data in view model', () => {
			expect(this.component.index).toBe(this.paramsMock.index());
			expect(this.component.data).toBe(this.paramsMock.data);
			expect(this.component.hasResponse).toBeTruthy();
			expect(this.component.resHTML).toBe(this.paramsMock.data.resHTML);
			expect(this.component.color).toBe(this.paramsMock.data.color);
			expect(this.component.config).toBe(this.paramsMock.config);
			expect(this.component.setParams).toBe(this.paramsMock.setParams);
			expect(this.component.response).toBe(this.paramsMock.data.response);
			expect(this.component.req).toBe(this.paramsMock.data.req);
			expect(this.component.breadcrumbs()).toBe('');
		});

		it('should init attributes', () => {
			expect(this.component.attrs).toEqual({
				"tabs": {
					"blocks": {
						"aria-controls": "blocks-5",
						"href": "#slider-5"
					},
					"json": {
						"aria-controls": "json-5",
						"href": "#json-5"
					}
				},
				"view": {
					"blocks": {
						"id": "slider-5"
					},
					"json": {
						"id": "json-5"
					}
				},
				"wrapper": {
					"aria-labelledby": "heading-5",
					"id": "collapse-5"
				}});
		});
	});

	describe('When sream "ANOTHER_RESPONSE" updated', () => {
		var anotherResponseDataMock;
		beforeEach(() => {
			anotherResponseDataMock = {
				data: {
					response: ''
				},
				panelGroup: {
					groupIndex: 1,
					prepareData: jest.fn(() => preparedDataMock)
				},
				color: 'colorClassMock'
			};

			spyOn(this.component, 'getMore');
			ko.observable(anotherResponseDataMock).publishOn('ANOTHER_RESPONSE');
		});

		it('should prepare data', () => {
			expect(anotherResponseDataMock.panelGroup.prepareData).toBeCalledWith({ params: { data: anotherResponseDataMock.data.response }});
		});

		it('should call "getMore" method', () => {
			expect(this.component.getMore).toBeCalledWith({
				id: anotherResponseDataMock.panelGroup.groupIndex,
				data: preparedDataMock,
				pGroup: anotherResponseDataMock.panelGroup,
				color: anotherResponseDataMock.color
			});
		});
	});

	describe('When method "getMore" called', () => {
		var paramsMock;
		beforeEach(() => {
			jasmine.clock().install();
			paramsMock = {
				id: 'idMock',
				data: 'dataMock',
				pGroup: {
					sectionIndex:1,
					groupIndex:5
				},
				color:'colorMock',
				panel: {
					_panelName:'panelNameMock'
				}
			};

			spyOn(ko, 'applyBindings');
			this.component.getMore(paramsMock)
		});

		afterEach(function() {
			jasmine.clock().uninstall();
		});

		it('should be update slick', () => {
			expect($.fn.slick).toBeCalledWith('getSlick');
			expect($.fn.slick).toBeCalledWith('slickAdd', jasmine.any(Object));
			expect($.fn.slick).toBeCalledWith('slickRemove', 6, false);
			jasmine.clock().tick(311);
			expect($.fn.slick).toBeCalledWith('slickNext');
		});

		it('should be applyBindings', () => {
			expect(ko.applyBindings).toBeCalledWith({params:{
					sectionIndex: 1,
					groupIndex: 6,
					data: 'dataMock',
					_propTitle: 'idMock',
					colorClass: 'colorMock'
				}},
				jasmine.any(Object));
		});

		it('should be update breadcrumbs', () => {
			expect(this.component.breadcrumbs()).toBe('/panelNameMock/idMock');
		});
	});


});
