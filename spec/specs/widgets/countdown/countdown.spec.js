describe("CDWidget", () => {
	let widget;
	var module;
	var setFixture = () => {
		document.body.innerHTML =
			'<div w-type="countdown"></div>';
	};
	beforeAll(() => {
		window.__VERSION__ = 'mockedVersion';
		setFixture();
		module = require('products-and-docs/widgets/countdown/1.0.0/src/main-widget.es6');
		widget = new module.TicketmasterCountdownWidget(document.querySelector('div[w-type="countdown"]'));
		// console.log('widget',widget);
	});

	it('should be BeDefined', () => {
		expect(widget).toBeDefined();
	});

});
