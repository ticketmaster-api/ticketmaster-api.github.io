var $ = require('jquery');
window.$ = window.jQuery = $;

var module;
module = require('scripts/components/forum.js');


describe("forum", function()  {
	var urlAddition = "internal.html";
beforeAll(function(){
	/*Object.defineProperty(window.location, 'href', {
	writable: true
	});*/

});

it('forum should be Defined', function() {
	expect(module.parseGetParams).toBeDefined();
});

/*
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
*/

});

