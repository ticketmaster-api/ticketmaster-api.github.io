const ko  = require('knockout');
window.ko = ko;


describe('API Explorer config service', function () {
	var cfgMock = {
		someOptions:true
	};


	beforeAll(() => {
		Object.defineProperty(window.location, 'hostname', {
			writable: true,
			value: 'ticketmaster.com'
		});
		window.$ = {
			ajax: jest.fn()
		};

		this.module = require('scripts/api-explorer/v2/src/services/config.service.js');
	});

	it('should load config.json by ajax', () => {


		expect(window.$.ajax).toBeCalledWith({
			"dataType": "json",
			"type": "GET",
			"url": "http://ticketmaster.com/scripts/api-explorer/v2/config.json",
			"async": true,
			"complete" : jasmine.any(Function)
		})
	});

	it('should update config value', () => {
		expect(this.module()).toBeUndefined();
		window.$.ajax.mock.calls[0][0].complete({responseJSON:cfgMock});
		expect(this.module()).toBe(cfgMock);
	});

	it('should called console.log in error case', () => {
		spyOn(console, 'error');
		window.$.ajax.mock.calls[0][0].complete(null, 'error');
		expect(console.error).toHaveBeenCalledWith('can\'t load config.json!');
	});


});
