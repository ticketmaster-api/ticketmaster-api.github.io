var module;
window.apiKeyService = {
	getApiKeysCookie : ()=>{ return ["Internal User","groupon"] ; }
};
module = require('scripts/components/swagger-redirect-user-role.js');

describe("redirect-user-role", () => {
	var urlAddition = "internal.html";
	beforeAll(() => {
		Object.defineProperty(window.location, 'href', {
			writable: true
		});
		window.location.assign = ()=>{true};
	});

	it('redirect-user-role-user-role should be Defined', () => {
		expect(module.redirect).toBeDefined();
	});

	it('should replace "internal/"', () => {
		window.location.href = window.location.href + urlAddition;
		module.redirect(["Internal User","groupon"]);
		expect(location.href.indexOf(urlAddition)).toBeGreaterThan(0);
	});

	it('location.href should contain "internal/"', () => {
		module.redirect(0);
		expect(window.location.href.indexOf(urlAddition)).toBeGreaterThan(0);
	});

	it('location.href should be without "internal/"', () => {
		window.location.href ="boo";
		module.redirect(["Internal User","groupon"]);
		expect(window.location.href.indexOf("internal/")).toBe(-1);
	});

});
