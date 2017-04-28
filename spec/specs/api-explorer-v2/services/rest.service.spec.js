const $ = require('jquery');
const ko  = require('knockout');
window.$ = $;
window.ko = ko;
require('knockout-postbox');

const HEADER_ACCEPT_LANGUAGE = 'en-US,en;q=0.8';

jest.mock('scripts/api-explorer/v2/src/services/base.service', () => {
	return {
		'Discovery API v2': {
			ALL: {
				'discovery.v2.events': {
					category: 'Discovery API v2',
					base: "https://app.ticketmaster.com",
					path: "discovery/v2/events.{format}",
					id: "discovery.v2.events",
					method: "GET",
					parameters: {
						format: {
							name: "format",
							style: "template",
							required: true,
							default: "json",
							select: true,
							type: "string",
							options: [
								{
									"name": "json",
									"checked": true,
									"link": false
								}
							]
						},
						"keyword": {
							"name": "keyword",
							"style": "query",
							"required": false,
							"select": false,
							"type": "string"
						},
						"someValue": {
							"name": "someValue",
							"style": "query",
							"required": false,
							"select": false,
							"type": "string"
						}

					}
				}
			},
			POST: {
				"some.method" : {
					category: "Discovery API v2",
					base: "https://app.ticketmaster.com",
					path: "some/path.{format}",
					id: "some.method",
					method: "POST",
					parameters: {
						format: {
							name: "format",
							style: "template",
							required: true,
							default: "json",
							select: true,
							type: "string",
							options: [
								{
									"name": "json",
									"checked": true,
									"link": false
								}
							]
						},
						"someHeader": {
							"name": "someHeader",
							"style": "header",
							"required": false,
							"select": false,
							"type": "string"
						},
						requestBody: {
							name: "Post JSON",
							style: "requestBody",
							type: "string"
						}
					}
				}
			}
		}
	}
});
jest.mock('scripts/api-explorer/v2/src/services/apiKey.service', () => {
	return {
		value:'mockApiKey'
	}
});

var formatParam = {
	name: "format",
	style: "template",
	required: true,
	default: "json",
	select: true,
	type: "string",
	value: ko.observable('json')
};

var mockSelectedParams = [formatParam,
	{
		"name": "keyword",
		"style": "query",
		"required": false,
		"select": false,
		"type": "string",
		"value": ko.observable("MyTestKeyword")
	}];

var mockSelectedParams2 = [
	...mockSelectedParams,
	{
		"name": "someValue",
		"style": "query",
		"required": false,
		"select": false,
		"type": "string",
		value: ko.observable('testValue')
	}
];

var mockSelectedParams3 = [
	formatParam,
	{
		"name": "someHeader",
		"style": "header",
		"required": false,
		"select": false,
		"type": "string",
		"value": ko.observable("testValue")
	},
	{
		name: "Post JSON",
		style: "requestBody",
		type: "string",
		"value": ko.observable("requestBody testValue")
	}
];

describe('API Explorer Rest service', function () {
	beforeAll(() => {
		spyOn(ko.subscribable.fn, 'syncWith').and.callThrough();
		spyOn(ko.subscribable.fn, 'subscribeTo').and.callThrough();
		spyOn(ko.subscribable.fn, 'publishOn').and.callThrough();

		this.base = require('scripts/api-explorer/v2/src/services/base.service');
		this.module = require('scripts/api-explorer/v2/src/services/rest.service.js');
	});

	describe('When module initialized', () => {
		it('should subscribed to selected method, category, type, params', () => {
			expect(ko.subscribable.fn.subscribeTo).toBeCalledWith('SELECTED_CATEGORY');
			expect(ko.subscribable.fn.subscribeTo).toBeCalledWith('SELECTED_METHOD_TYPE');
			expect(ko.subscribable.fn.subscribeTo).toBeCalledWith('SELECTED_METHOD');
			expect(ko.subscribable.fn.subscribeTo).toBeCalledWith('SELECTED_PARAMS');
			expect(ko.subscribable.fn.syncWith).toBeCalledWith('REQUESTS_ARR');
			expect(ko.subscribable.fn.publishOn).toBeCalledWith('ANOTHER_RESPONSE');
		});
	});


	describe('When SELECTED_METHOD changed', () => {
		it('should prepare selectedMethodData data', () => {
			expect(this.module.selectedMethodData).toBeUndefined();
			ko.observable().syncWith('SELECTED_CATEGORY')('Discovery API v2');
			ko.observable().syncWith('SELECTED_METHOD_TYPE')('ALL');
			ko.observable().syncWith('SELECTED_METHOD')('discovery.v2.events');
			expect(this.module.selectedMethodData).toBe(this.base['Discovery API v2']['ALL']['discovery.v2.events']);
		});
	});

	// @TODO: need check this logic on fronted, because I not found how to do that
	describe('When ANOTHER_REQUEST changed', () => {
		it('should perform API request', () => {
			$.ajax = jest.fn();
			var controlUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=mockApiKey&keyword=MyTestKeyword&someValue=testValue';
			var mock = {
				method: {...this.base['Discovery API v2']['ALL']['discovery.v2.events'], parameters:mockSelectedParams2 },
				panelGroup: 'panelGroup',
				color: 'color'
			};

			ko.observable(mock).publishOn('ANOTHER_REQUEST');

			expect($.ajax).toBeCalledWith({
				"async": true,
				"complete": jasmine.any(Function),
				"dataType": "json",
				"type": "GET",
				"url": controlUrl,
				"headers": {
					"Accept-Language": HEADER_ACCEPT_LANGUAGE
				}
			});
			var resp = {
				responseJSON:{}
			};
			var testObs = ko.observable().syncWith('ANOTHER_RESPONSE');

			this.module.req = 'mockReq';

			$.ajax.mock.calls[0][0].complete(resp);

			expect(ko.unwrap(testObs)).toEqual({
				"color": "color",
				"data": {
					"category": "Discovery API v2",
					"index": 0,
					"method": "GET",
					"methodId": "discovery.v2.events",
					"params": [{
						"name": "format",
						"value": jasmine.any(Function)
					}, {
						"name": "keyword",
						"value": jasmine.any(Function)
					}, {
						"name": "someValue",
						"value": jasmine.any(Function)
					}],
					"req": this.module.req,
					"response": {}
				},
				"panelGroup": "panelGroup"
			});

		});
	});


	describe('When sendRequest called', () => {
		var controlUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=mockApiKey&keyword=MyTestKeyword';
		it('should perform GET API request', () => {
			$.ajax = jest.fn();
			ko.observable().syncWith('SELECTED_CATEGORY')('Discovery API v2');
			ko.observable().syncWith('SELECTED_METHOD_TYPE')('ALL');
			ko.observable().syncWith('SELECTED_METHOD')('discovery.v2.events');
			ko.observable().syncWith('SELECTED_PARAMS')(mockSelectedParams);

			this.module.sendRequest();

			expect($.ajax).toBeCalledWith({
				"async": true,
				"complete": jasmine.any(Function),
				"dataType": "json",
				"type": "GET",
				"url": controlUrl,
				"headers": {
					"Accept-Language": HEADER_ACCEPT_LANGUAGE
				}
			});
		});


		it('should perform POST API request', () => {
			$.ajax = jest.fn();
			ko.observable().syncWith('SELECTED_CATEGORY')('Discovery API v2');
			ko.observable().syncWith('SELECTED_METHOD_TYPE')('POST');
			ko.observable().syncWith('SELECTED_METHOD')('some.method');
			ko.observable().syncWith('SELECTED_PARAMS')(mockSelectedParams3);

			this.module.sendRequest();

			expect($.ajax).toBeCalledWith({
				"async": true,
				"complete": jasmine.any(Function),
				"data": {
					"body": "requestBody testValue"
				},
				"dataType": "json",
				"headers": {
					"someHeader": "testValue",
					"Accept-Language": HEADER_ACCEPT_LANGUAGE
				},
				"type": "POST",
				"url": "https://app.ticketmaster.com/some/path.json?apikey=mockApiKey&"
			});
		});



		it('should update lastResponse globals', () => {
			$.ajax = jest.fn();
			ko.observable().syncWith('SELECTED_CATEGORY')('Discovery API v2');
			ko.observable().syncWith('SELECTED_METHOD_TYPE')('ALL');
			ko.observable().syncWith('SELECTED_METHOD')('discovery.v2.events');
			ko.observable().syncWith('SELECTED_PARAMS')(mockSelectedParams);

			this.module.sendRequest();

			var resp = {
				responseJSON:'mocked response json'
			};

			$.ajax.mock.calls[0][0].complete(resp);
			expect(global.lastResponse).toBe('mocked response json');

		});
	});

	// @TODO: maybe make sense to move 'parseUrl' method to something like 'utils' module? because for me is not clear why method 'parseUrl' placed inside restService
	describe('When called parseUrl', () => {
		it('should parse URL components', ()  => {
			var testUrl = 'https://app.ticketmaster.com/api-explorer/v2/?apiCategory=Discovery%20API%20v2&methodId=discovery.v2.events&keyword=somekey';
			ko.observable().syncWith('SELECTED_METHOD_TYPE')('ALL');
			expect(this.module.parseUrl(testUrl)).toEqual({
				apiCategory: 'Discovery API v2',
				methodId: "discovery.v2.events",
				parameters: [{
					"name": "keyword",
					"style": "query",
					"required": false,
					"select": false,
					"type": "string",
					"value": "somekey"
				}]
			});
		});
	});
});


