describe("CDWidget", () => {
	let widget,
		module,
		hideMessageDelay;
	var setFixture = () => {
		document.body.innerHTML =
			'<div w-type="countdown"></div>';
	};
	beforeAll(() => {
		window.__VERSION__ = 'mockedVersion';
		setFixture();
		module = require('products-and-docs/widgets/countdown/1.0.0/src/main-widget.es6');
		widget = new module.TicketmasterCountdownWidget(document.querySelector('div[w-type="countdown"]'));

		spyOn(widget, 'toggleSecondsVisibility');
		spyOn(widget, 'clearEvents');
		spyOn(widget, 'clear');
		spyOn(widget, 'hideMessage');
	});

	it('should be BeDefined', () => {
		expect(widget).toBeDefined();
	});
	it('eventUrl should be "http://www.ticketmaster.com/event/"', () => {
		expect(widget.eventUrl).toBe("http://www.ticketmaster.com/event/");
	});

	it('#hideMessageDelay should be integer', () => {
		expect(widget.hideMessageDelay).toBe(5000);
	});

	it('#updateExceptions should be array of string', () => {
		expect(widget.updateExceptions).toEqual(jasmine.arrayContaining(["width", "height", "border", "borderradius", "layout", "propotion", "seconds"]));
	});

	it('#tmWidgetWhiteList should contain string', () => {
		expect(widget.tmWidgetWhiteList).toContain("1B005068DB60687F");
	});

	it('#isConfigAttrExistAndNotEmpty should be Undefined', () => {
		expect(widget.config.id).toBeUndefined();
		widget.config.id = 'someID';
		expect(widget.config.id).toBeDefined();
		expect(widget.isConfigAttrExistAndNotEmpty('id')).toBe(true);
	});

	it('#constructor should be showMessage', () => {
		// console.log('innerHTML', widget.countDownMonth.innerHTML);
		widget.countDownMonth.innerHTML = 10;
		widget.update();
		expect(widget.toggleSecondsVisibility).toBeDefined();
	});

	it('#update should be called with FullWidthTheme', () => {
		let isFullWidth = true;
		widget.update(isFullWidth);
		expect(widget.clear).toHaveBeenCalled();
	});
	it('#hideMessage should set timeinterval', () => {
		widget.messageTimeout = 1;
		 // console.log('widget.hideMessage', );
		widget.hideMessage()
		expect(widget.hideMessage).toBeDefined();
		// expect(widget.hideMessage).toHaveBeenCalled(); //expect(spy).toHaveBeenCalled()
	});
});
