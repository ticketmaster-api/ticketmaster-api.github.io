const $ = require('jquery');
const ko  = require('knockout');

jest.mock('scripts/api-explorer/v2/src/services/rest.service.js', () => ({}));
jest.mock('scripts/api-explorer/v2/src/modules', () => ({}));
jest.mock('scripts/api-explorer/v2/src/customBindings/index.js', () => ({}));
jest.mock('scripts/api-explorer/v2/src/components/index.js', () => ({}));
jest.mock('scripts/api-explorer/v2/src/services/index.js', () => {
     return {
			 			base: {
							'Discovery API v2': {
								ALL: {
									'discovery.v2.events': {
										method: 'Search Events Mock',
										parameters:{}
									}
								}
							}
						},
            rest:{
							sendRequest: jest.fn()
						},
            apiKey:{
                value: 'apiKeyMock'
            }
        }
});

// -----------------------------
// setup global vars
window.$ = $;
window.ko = ko;
// -----------------------------


require('knockout-postbox');
require('scripts/api-explorer/v2/src/modules/validation.js');
var services = require('scripts/api-explorer/v2/src/services/index.js');


describe('API Explorer main module', function () {
	var setFixture = () => {
		document.body.innerHTML =
			'<div>' +
			'  <input id="api-key" />' +
			'</div>';
	};
	beforeAll(() => {
		setFixture();
		ko.applyBindings = jest.fn();
		ko.subscribable.fn.syncWith = jest.fn(ko.subscribable.fn.syncWith);

		this.module = require('../../../scripts/api-explorer/v2/src/main.es6.js');
	});

  it('should be called ko.applyBindings method with app instance', () => {
		expect(ko.applyBindings.mock.calls.length).toBe(1);
		expect(ko.applyBindings).toBeCalledWith(this.module);
  });

	it('should syncWith with selected method, category, type, params', () => {
		expect(ko.subscribable.fn.syncWith).toBeCalledWith('SELECTED_CATEGORY');
		expect(ko.subscribable.fn.syncWith).toBeCalledWith('SELECTED_METHOD_TYPE');
		expect(ko.subscribable.fn.syncWith).toBeCalledWith('SELECTED_METHOD');
		expect(ko.subscribable.fn.syncWith).toBeCalledWith('SELECTED_PARAMS');
	});

	it('should set api key into input', () => {
		expect($(this.module.apiKeyInputId).val()).toBe('apiKeyMock');
	});

	it('should be parse URL', () => {
		Object.defineProperty(window.location, 'search', {
			writable: true,
			value: '?apiCategory=Discovery%20API%20v2&methodId=discovery.v2.events'
		});

		var control = {"apiCategory": "Discovery API v2", "methodId": "discovery.v2.events", "parameters": {}};
		expect(this.module.parseUrl()).toEqual(control);
	});

	it('should generate sharePath', () => {
		Object.defineProperty(window.location, 'origin', {
			writable: true,
			value: 'http://ticketmaster.com/'
		});
		Object.defineProperty(window.location, 'pathname', {
			writable: true,
			value: 'api-explorer/v2/'
		});

		var selectedCategory = ko.observable().syncWith('SELECTED_CATEGORY');
		selectedCategory('Commerce API');

		expect(this.module.sharePath()).toBe('http://ticketmaster.com/api-explorer/v2?apiCategory=Commerce%20API&methodId=');
		selectedCategory('Discovery API v2');
		expect(this.module.sharePath()).toBe('http://ticketmaster.com/api-explorer/v2?apiCategory=Discovery%20API%20v2&methodId=');

		ko.observable().syncWith('SELECTED_METHOD')('discovery.v2.events');
		expect(this.module.sharePath()).toBe('http://ticketmaster.com/api-explorer/v2?apiCategory=Discovery%20API%20v2&methodId=discovery.v2.events');


		this.module.selectedParams.push({
			name:'mockedParamName',
			value:'',
			default: 'defaultValue'
		});
		this.module.selectedParams.push({
			name:'mockedParamName2',
			value:'value2',
			default: 'defaultValue'
		});

		expect(this.module.sharePath()).toBe('http://ticketmaster.com/api-explorer/v2?apiCategory=Discovery%20API%20v2&methodId=discovery.v2.events&mockedParamName=defaultValue&mockedParamName2=value2');
	});

	it('should define "send button" title', () => {
		ko.observable().syncWith('SELECTED_CATEGORY')('Discovery API v2');
		ko.observable().syncWith('SELECTED_METHOD')('discovery.v2.events');
		expect(this.module.sendButtonText()).toBe('Search Events Mock');
	});

	it('should initiate send request when called method onClickSendBtn', () => {
		this.module.onClickSendBtn();
		expect(services.rest.sendRequest).toBeCalledWith('apiKeyMock');
	});



	describe('extends standard Object by adding method getProp', () => {

		it('method should be defined', () => {
			expect(Object.getProp).toBeDefined();
		});

		it('should extract deep property from object', () => {
			var testedObject = {
				subProp: {
					subSubProp: {
						subSubSubProp: 'someData'
					}
				}
			};
			expect(Object.getProp(testedObject, 'subProp.subSubProp.subSubSubProp')).toBe("someData");
			expect(Object.getProp(testedObject, 'subProp.subSubProp.subSubSubProp2')).toBeUndefined();
			expect(Object.getProp('some string')).toBeUndefined();
		});
	});

});
