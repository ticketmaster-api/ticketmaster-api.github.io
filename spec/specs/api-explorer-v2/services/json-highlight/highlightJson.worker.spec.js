jest.mock('scripts/api-explorer/v2/src/services/json-highlight/json-parse', () => {
	return jest.fn(()=> 'resultHtmlMock');
});

var jsonParseMock = require('scripts/api-explorer/v2/src/services/json-highlight/json-parse');


describe('API Explorer highlightJson module', function () {
	beforeAll(() => {
		global.onmessage = null;
		global.postMessage = jest.fn();
		this.module = require('scripts/api-explorer/v2/src/services/json-highlight/highlightJson.worker.js');
	});

	it('should provide onmessage function', () => {
		expect(onmessage).toBeDefined();
		expect(onmessage).toEqual(jasmine.any(Function));
	});

	describe('When "onmessage" function called', () => {
		it('should be highlight Json and post result', () => {
			global.onmessage({data: 'jsonMock'});
			expect(jsonParseMock).toBeCalledWith('jsonMock', {expanded: true});
			expect(global.postMessage).toBeCalledWith('resultHtmlMock');
		});
	});
});
