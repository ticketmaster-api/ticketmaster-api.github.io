
jest.mock('scripts/api-explorer/v2/src/services/options/country.options.js', () => [
	{
		name: 'mocked country name',
		checked: true,
		link: false
	}
]);

describe('API Explorer sagger api reader service', function () {

	beforeAll(() => {
		this.module = require('scripts/api-explorer/v2/src/services/swagger.api.reader.js');
	});

	it('should parse swagger api json and metadata.json and generate api configuration object', () => {
		var apiMock = require('./mocks/swagger.api.reader/api.json');
		var metaMock = require('./mocks/swagger.api.reader/meta.json');
		var expectations = require('./mocks/swagger.api.reader/expectations.json');

		expect(this.module.default(apiMock, metaMock)).toEqual(expectations);
	});

});
