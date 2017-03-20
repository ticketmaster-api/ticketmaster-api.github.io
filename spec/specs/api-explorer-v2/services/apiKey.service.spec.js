var ko  = require('knockout');
window.ko = ko;

describe('API Explorer apiKey service', function () {
	const API_KEY_MOCK = 'mockApiKey';

	beforeAll(() => {

		window.apiKeyService = {
			getApiKeysCookie: () => API_KEY_MOCK
		};
		this.module = require('scripts/api-explorer/v2/src/services/apiKey.service.js');
	});

	it('should export api key value as observable', () => {
		expect(this.module.value()).toBe(API_KEY_MOCK);
	});

	it('should export object with api key observable', () => {
		expect(this.module).toEqual({
			placeholder: 'Api key',
			name: 'apikey',
			style: 'query',
			type: 'string',
			required: true,
			value: jasmine.any(Function)
		});
	});
});
