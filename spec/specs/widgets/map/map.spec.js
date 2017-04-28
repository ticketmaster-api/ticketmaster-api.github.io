describe("MapWidget", () => {
	let widget,
	module,
	hideMessageDelay;
  var setFixture = function(){
	  document.body.innerHTML = '<head></head><div w-type="map"></div>';
  };

	beforeAll(function() {
		window.__VERSION__ = 'mockedVersion';
		setFixture();
		module = require('products-and-docs/widgets/map/1.0.0/src/main-widget.es6');
		widget = new module.TicketmasterMapWidget(document.querySelector('div[w-type="map"]'));
		// console.log(widget.isConfigAttrExistAndNotEmpty);
	});

	beforeEach(function() {
		spyOn(widget, 'clear');
		spyOn(widget, 'hideMessage');
		spyOn(widget, 'showMessage');

	});

	it('widget should be BeDefined', function(){
		expect(widget).toBeDefined();
	});

	it('widget #themeUrl should be BeDefined', function(){
		window.location.host == 'developer.ticketmaster.com';
		let widget = {
			config : {
				height: 350
			},
			themeUrl : function() { return (window.location.host === 'developer.ticketmaster.com')
				? `https://developer.ticketmaster.com/products-and-docs/widgets/map/1.0.0/theme/`
				: `https://ticketmaster-api-staging.github.io/products-and-docs/widgets/map/1.0.0/theme/`;
			}
		};
		expect(widget.themeUrl()).toBe('https://ticketmaster-api-staging.github.io/products-and-docs/widgets/map/1.0.0/theme/');
	});

	it('widget #tmWidgetWhiteList should be BeDefined', function(){
		expect(widget.tmWidgetWhiteList).toBeDefined();
	});

	it('widget #isConfigAttrExistAndNotEmpty should be BeDefined', function(){
		expect(widget.isConfigAttrExistAndNotEmpty).toBeDefined();
		widget.config = {
			height : 350,
			hasOwnProperty : function() { return true }
		};
		expect(widget.isConfigAttrExistAndNotEmpty(widget.config)).toBeFalsy();

	});

	it('widget #countriesWhiteList should be BeDefined', function(){
		expect(widget.countriesWhiteList).toBeDefined();
	});

	it('widget #updateExceptions should be BeDefined', function(){
		expect(widget.updateExceptions).toBeDefined();
	});

	it('widget #isSimpleProportionM should be BeDefined', function(){
		expect(widget.isSimpleProportionM).toBeFalsy();
	});

	it('widget #controlHiddenClass should be BeDefined', function(){
		expect(widget.controlHiddenClass).toBeDefined();
	});

	it('#eventUrl should be "https://www.ticketmaster.com/event/"', () => {
		expect(widget.eventUrl).toBe("https://www.ticketmaster.com/event/");
	});

	it('#hideMessageDelay should be integer', () => {
		expect(widget.hideMessageDelay).toBe(5000);
  });

	it('#geocodeUrl should be "https://maps.googleapis.com/maps/api/geocode/json"', () => {
		expect(widget.geocodeUrl).toBe("https://maps.googleapis.com/maps/api/geocode/json");
  });

	it('#events should be integer', () => {
		expect(widget.events).toBeUndefined();
  });

	it('#isUniverseUrl should be Defined', () => {
		expect(widget.isUniverseUrl('universe.com')[0]).toBe('universe.com');
		expect(widget.isUniverseUrl('uniiverse.com')[0]).toBe('uniiverse.com');
		expect(widget.isUniverseUrl('ticketmaster.com')[0]).toBe('ticketmaster.com');
	});

	it('#formatDate should return result', function(){
		let noneResult = widget.formatDate('date');
	  expect(noneResult).toBe('');

	  let noneTimeResult = widget.formatDate({day : "2017-03-17"});
	  expect(noneTimeResult).toEqual("Fri, Mar 17, 2017");

		let mockDate = {
			dateTime : "2017-03-18T00:30:00Z",
			day : "2017-03-17",
			time : "20:30:00"
		};
	  let okResult = widget.formatDate(mockDate);
	  expect(okResult).toEqual("Fri, Mar 17, 2017 08:30 PM");
  });

	it('#isConfigAttrExistAndNotEmpty should be Undefined', () => {
		let widget = {
		  config: {
		  	id: undefined
		   }
	  };
		expect(widget.config.id).toBeUndefined();
		widget.config.id = 'someID';
		expect(widget.config.id).toBeDefined();
	});

	it('#getCoordinates should be Defined', () => {
		let cb = function() {return true};
		widget.config = {
		  postalcode : '90015'
	  };
		expect(typeof(widget.getCoordinates(cb))).toBeDefined();
	});

	it('#initMessage should be defined', () => {
		document.querySelector('.event-message__btn').click();
		expect(typeof(widget.initMessage)).toBe('function');
	});

	it('#styleLoadingHandler should be defined', () => {
		widget.styleLoadingHandler.status = 200;
		widget.styleLoadingHandler();
		expect(typeof(widget.styleLoadingHandler)).toBe('function');
	});

	it('#resetReduceParamsOrder should be defined', () => {
		widget.resetReduceParamsOrder();
		expect(typeof(widget.resetReduceParamsOrder)).toBe('function');
	});

	it('#initBuyBtn should be defined', () => {
		document.querySelector('.event-buy-btn').click();
		expect(typeof(widget.initBuyBtn)).toBe('function');
	});

	it('#setBuyBtnUrl should be defined', () => {
		widget.eventsRootContainer = document.querySelector('.events-root-container');
		widget.initBuyBtn();
		widget.events = {url : 'test'};
		widget.setBuyBtnUrl();

		expect(typeof(widget.setBuyBtnUrl)).toBe('function');
	});

	it('#isAllowedTMEvent should be defined', () => {
		expect(widget.isAllowedTMEvent('livenation.com')).toBeFalsy();
	});

	it('#showMessage should be defined', () => {
		let hideMessageWithoutDelay = function() {return true};
		widget.showMessage('Test message', hideMessageWithoutDelay);
		expect(typeof(widget.showMessage)).toBe('function');
	});

	it('#hideMessageWithDelay should be defined', () => {
		widget.hideMessageWithDelay(500);
		expect(typeof(widget.hideMessageWithDelay)).toBe('function');
	});

	it('#useGeolocation should be defined', () => {
		widget.useGeolocation();
		expect(typeof(widget.useGeolocation)).toBe('function');
	});

	it('#groupEventsByName should be defined', () => {
		widget.events = {
				map: function() {return true}
		};
		widget.groupEventsByName();
		expect(typeof(widget.groupEventsByName)).toBe('function');
	});

	it('#clear should be defined', () => {
		widget.eventsRootContainer = document.querySelector('.events-root-container');
		widget.eventsRoot = document.querySelector('.events-root-container');
		widget.clear();
		expect(typeof(widget.clear)).toBe('function');
	});

	it('#addBuyButton should be defined', () => {
		widget.addBuyButton(document.querySelector('.events-root-container'),'www.ticketmaster.com');
		expect(typeof(widget.addBuyButton)).toBe('function');
	});

	it('#getDateFromPeriod should be defined', () => {
		widget.getDateFromPeriod('year');
		widget.getDateFromPeriod('month');
		widget.getDateFromPeriod('week');
		widget.getDateFromPeriod('day');
		expect(typeof(widget.getDateFromPeriod)).toBe('function');
	});

	it('#getDateFromPeriod should be defined', () => {
	  let item_config = {};
	});

	it('#getImageForEvent should be defined', () => {
		let url = ['image1.jpg', 'img2.jpg'];
		widget.getImageForEvent(url);
	});

	it('#update should be defined', () => {
		widget.eventsRootContainer = document.querySelector('.events-root-container');
		widget.eventsRoot = document.querySelector('.events-root-container');
		widget.update();
		expect(typeof(widget.update)).toBe('function');
	});

});
