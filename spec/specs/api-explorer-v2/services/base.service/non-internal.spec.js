var fs = require('fs');
const $ = require('jquery');
window.$ = $;
jest.mock('scripts/api-explorer/v2/src/services/options/country.options.js', () => [
	{
		name: 'mocked country name',
		checked: true,
		link: false
	}
]);

jest.mock('scripts/api-explorer/v2/src/services/swagger.api.reader', function () {
	return jest.fn(param => param)
});

jest.mock('scripts/api-explorer/v2/api.sources', function () {

	return {
		"Publish API" : {
			api: 'PublishApiMock',
			meta: {
				extraMethodsInfo: 'extraMethodsInfoMock'
			}
		}
	};
});

jest.mock('scripts/api-explorer/v2/api.sources-internal', function () {
	return {};
});

jest.mock('scripts/api-explorer/v2/src/services/user.service', function () {
	return {
		isInternalUser: () => false
	};
});

function FakePromise () {
	var _callback;
	var _subProm;

	this.resolve = data => {
		if(!_callback) return;
		var res = _callback(data);
		_subProm && _subProm.resolve(res);
	};

	this.then = (callback) => {
		_callback = callback;
		_subProm = new FakePromise();
		return _subProm;
	};
	this.fail = () => {}
}




describe('API Explorer base service with non internal users', function () {
	var ajaxPromise = new FakePromise();

	beforeAll(() => {

		$.ajax = jest.fn(() => {
			return ajaxPromise;
		});
		this.swaggerApiReader = require('scripts/api-explorer/v2/src/services/swagger.api.reader');
		this.module = require('scripts/api-explorer/v2/src/services/base.service.js');
	});

	it('should call swagger api reader with api config', () => {
		expect(this.swaggerApiReader).toBeCalledWith('PublishApiMock', {extraMethodsInfo: 'extraMethodsInfoMock'});
	});

	it('should requested api description xml by ajax', () => {
		expect($.ajax).toBeCalledWith({
			"async": false,
			"dataType": "text",
			"url": "../../scripts/api-explorer/apidescription.xml"
		});
	});

	it('should parse xml and make configuration object', () => {
		var expectations = require('../mocks/base.service/expectations.json');
		var xmlContent = fs.readFileSync( __dirname +'/../mocks/base.service/apidescription.xml', 'utf8');
		ajaxPromise.resolve(xmlContent);
		expect(this.module).toEqual(expectations);
	});


});
