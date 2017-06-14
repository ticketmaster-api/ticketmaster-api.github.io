var $ = require('jquery');
window.$ = window.jQuery = $;

describe("CalendarWidget", () => {
	let widget,
		module,
		hideMessageDelay;
	var setFixture = () => {
		document.body.innerHTML =
			'<head></head><div w-type="calendar" w-tmapikey="y61xDc5xqUSIOz4ISjgCe5E9Lh0hfUH1" w-googleapikey="AIzaSyBQrJ5ECXDaXVlICIdUBOe8impKIGHDzdA" w-postalcodeapi="90015" w-keyword="" w-colorscheme="light" w-width="350" w-height="600" w-size="25" w-border="0" w-borderradius="4" w-postalcode="" w-radius="" w-period="week" w-layout="vertical" w-attractionid="" w-promoterid="" w-venueid="" w-affiliateid="" w-segmentid="" w-proportion="custom" w-titlelink="off" w-countrycode="US" w-source="" w-latlong=","><div class="event-logo centered-logo"></div><div class="event-date centered-logo"></div></div>';
	};
	beforeAll(() => {
		window.__VERSION__ = 'mockedVersion';
		setFixture();
		module = require('products-and-docs/widgets/calendar/1.0.0/src/main-widget.es6');
		widget = new module.TicketmasterCalendarWidget();
		widget = new module.TicketmasterCalendarWidget(document.querySelector('div[w-type="clanedar"]'));
	});

	beforeEach(function() {
		spyOn(widget, 'clear');
		spyOn(widget, 'hideMessage');
		spyOn(widget, 'showMessage');
		spyOn(widget, 'publishEvent');
	});

	it('widget should be BeDefined', () => {
		expect(widget).toBeDefined();
	});

	it('widget #themeUrl should be BeDefined', function(){
		expect(widget.themeUrl).toBe('https://ticketmaster-api-staging.github.io/products-and-docs/widgets/calendar/1.0.0/theme/');
		Object.defineProperty(window.location, 'host', {
			writable: true,
			value: 'developer.ticketmaster.com'
		});
		expect(widget.themeUrl).toBe('http://developer.ticketmaster.com/products-and-docs/widgets/calendar/1.0.0/theme/');
	});

	it('widget #portalUrl should be Defined', function(){
		expect(widget.portalUrl).toBe('http://developer.ticketmaster.com/');
		Object.defineProperty(window.location, 'host', {
			writable: true,
			value: 'developer.ticketmaster.com'
		});
		expect(widget.portalUrl).toBe('http://developer.ticketmaster.com/');
	});

	it('widget #legalNoticeUrl should be Defined', function(){
		expect(widget.legalNoticeUrl).toBe('http://developer.ticketmaster.com/support/terms-of-use/');
		Object.defineProperty(window.location, 'host', {
			writable: true,
			value: 'developer.ticketmaster.com/support/terms-of-use/'
		});
		expect(widget.legalNoticeUrl).toBe('http://developer.ticketmaster.com/support/terms-of-use/');
	});

	it('#events should be Defined', () => {
		widget.events;
		expect(widget.events).toBeUndefined();
	});


	it('#widgetContentHeight should be Defined', () => {
		widget.widgetConfig = {
			height: 300
		}
		widget.widgetContentHeight;
		expect(widget.widgetContentHeight).toBe(230);
	});

	it('#borderSize should be Defined', () => {
		widget.widgetConfig = {
			border: 1
		}
		expect(widget.borderSize).toBeTruthy();
	});

	it('#eventUrl should be https://www.ticketmaster.com/event/', function(){
		widget.eventUrl;
		expect(widget.eventUrl).toBe('http://www.ticketmaster.com/event/');
	});

	it('#geocodeUrl should be https://maps.googleapis.com/maps/api/geocode/json', function(){
		widget.geocodeUrl;
		expect(widget.geocodeUrl).toBe('https://maps.googleapis.com/maps/api/geocode/json');
	});

	it('#updateExceptions should be "width", "height", "border", "borderradius", "colorscheme", "layout", "affiliateid", "propotion", "googleapikey"', function(){
		widget.updateExceptions;
		expect(widget.updateExceptions).toEqual(["width", "height", "border", "borderradius", "colorscheme", "layout", "affiliateid", "propotion", "googleapikey"]);
	});

	it('#sliderDelay should be 500', function(){
		expect(widget.sliderDelay).toBe(5000);
	});

	it('#sliderRestartDelay should be 500', function(){
		expect(widget.sliderRestartDelay).toBe(5000);
	});

	it('#hideMessageDelay should be 500', function(){
		expect(widget.hideMessageDelay).toBe(5000);
	});

	it('widget #tmWidgetWhiteList should be BeDefined', function(){
		expect(widget.tmWidgetWhiteList).toBeDefined();
	});

	it('#countriesWhiteList should equal ["Australia", "Austria", "Belgium", "Canada", "Denmark", "Finland", "France", "Germany", "Ireland", "Mexico", "Netherlands", "New Zealand", "Norway", "Spain", "Sweden", "Turkey", "UAE", "United Kingdom", "United States"]', function(){
		expect(widget.countriesWhiteList).toEqual(["Australia", "Austria", "Belgium", "Canada", "Denmark", "Finland", "France", "Germany", "Ireland", "Mexico", "Netherlands", "New Zealand", "Norway", "Spain", "Sweden", "Turkey", "UAE", "United Kingdom", "United States"]);
	});

	it('#eventReqAttrs should be BeDefined', function(){
		widget.eventsRootContainer = document.querySelector('.events-root-container');
		expect(widget.eventReqAttrs).toBeDefined();
		widget.widgetConfig = {
			latlong: '34567.87,4589745',
			postalcode: 90015,
			tmapikey: 'test',
			height: 350,
		}
		expect(widget.isConfigAttrExistAndNotEmpty('height')).toBe(true);
		// expect(widget.eventReqAttrs).toBeDefined();
		widget.widgetConfig = {
			tmapikey: '',
		};
		expect(widget.eventReqAttrs).toBeDefined();
		// widget.eventReqAttrs();
	});

});
