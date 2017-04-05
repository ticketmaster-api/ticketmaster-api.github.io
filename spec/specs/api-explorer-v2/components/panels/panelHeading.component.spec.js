const ko = require('knockout');
const $ = require('jquery');
window.ko = ko;
window.$ = $;
require('knockout-postbox');

window.base = {
	base:{
		'CategoryMock': {
			ALL :{
				'methodIdMock': {
					path: 'discovery/v2/events',
					parameters:{
						id: {
							name: 'id'
						},
						format: {
							name: "format"
						},
						"keyword": {
							"name": "keyword"
						},
						"someValue": {
							"name": "someValue"
						}
					}
				}
			}
		}
	}

}; // @TODO: Attention - component uses GLOBAL VARS!!!

jest.mock('scripts/api-explorer/v2/src/services/index.js', () => {
	return {
		colorsService:{
			getRandomColor: jest.fn(()=> 'randomColorMock')
		}
	}
});

var PanelHeading = require('scripts/api-explorer/v2/src/components/panels/panelHeading.component.js');

describe("PanelHeading component spec", function(){
	beforeEach(() => {
		this.paramsMock = {
			config: {
				_CONFIG: {
					request: true,
					title: 'titleMock'
				}
			},
			data: {
				key: 'panelKeyMock',
				value: 'data-value'
			},
			showMapPopup: null,
			setActive: 'setActive',
			isExpanded: 'isExpanded',
			page: {
				size: 10
			},
			collapseId: 'collapseId',
			colorClass: 'colorClassMock',
			panelGroup: 'panelGroup',
			subjectID: 'subjectID'
		};
		this.component = new PanelHeading(this.paramsMock);
	});

	describe('When component created', () => {
		it('should init data in view model', () => {
			expect(this.component.config).toBe(this.paramsMock.config._CONFIG);
			expect(this.component.setActive).toBe(this.paramsMock.setActive);
			expect(this.component.isExpanded).toBe(this.paramsMock.isExpanded);
			expect(this.component._panelName).toBe(this.paramsMock.data.key);
			expect(this.component.title).toBe(this.paramsMock.config._CONFIG.title);
			expect(this.component.data).toBe(this.paramsMock.data.value);
			expect(this.component.collapseId).toBe(this.paramsMock.collapseId);
			expect(this.component.page).toBe(this.paramsMock.page);
			expect(this.component.panelGroup).toBe(this.paramsMock.panelGroup);
			expect(this.component.subjectId).toBe(this.paramsMock.subjectID);
			expect(this.component.showMapPopup).toBe(this.paramsMock.showMapPopup);
			expect(this.component.hasAnotherRequest).toBeTruthy();
		});

		it('should create random color', () => {
			var colorsService = require('scripts/api-explorer/v2/src/services/index.js').colorsService;
			expect(colorsService.getRandomColor).toBeCalledWith(this.paramsMock.colorClass);
			expect(this.component.anotherRequestColor).toBe('randomColorMock');
		});
	});

	describe('When "followRequest" method called', () => {
		var mockedRequestValue = 'https://app.ticketmaster.com/discovery/v2/events';
		var valueMock = 'someValue';
		beforeEach(() => {
			Object.getProp = jest.fn(() => mockedRequestValue);

		});

		it('should be called Object.getProp', () => {
			this.component.followRequest(valueMock);
			expect(Object.getProp).toBeCalledWith(valueMock, '.config.request');
		});

		it('should be publish data on "ANOTHER_REQUEST" stream', () => {
			var observable = ko.observable().syncWith('ANOTHER_REQUEST');
			this.component.followRequest(valueMock);
			expect(observable()).toEqual({
				"color": "randomColorMock",
				"method": {
					"parameters": [{
						"name": "id",
						"value": "subjectID"
					}, {
						"name": "format",
						"value": "json"
					}, {
						"name": "keyword"
					}, {
						"name": "someValue"
					}],
					"path": "discovery/v2/events"
				},
				"panelGroup": "panelGroup",
				"url": "discovery/v2/events"
			});
		});
	});
});
