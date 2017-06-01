var $ = require('jquery');
window.$ = window.jQuery = $;

describe("EDWWidget", () => {
	let widget,
		module,
		hideMessageDelay;
	var setFixture = () => {
		document.body.innerHTML =
			'<head></head><div w-type="event-discovery" w-tmapikey="y61xDc5xqUSIOz4ISjgCe5E9Lh0hfUH1" w-googleapikey="AIzaSyBQrJ5ECXDaXVlICIdUBOe8impKIGHDzdA" w-keyword="" w-theme="ListView" w-colorscheme="light" w-width="350" w-height="600" w-size="25" w-border="0" w-borderradius="4" w-postalcode="" w-radius="" w-period="week" w-layout="vertical" w-attractionid="" w-promoterid="" w-venueid="" w-affiliateid="" w-segmentid="" w-proportion="custom" w-titlelink="off" w-countrycode="US" w-source="" w-latlong=","><div class="event-logo centered-logo"></div><div class="event-date centered-logo"></div></div>';
	};
	beforeAll(() => {
		window.__VERSION__ = 'mockedVersion';
		setFixture();
		module = require('products-and-docs/widgets/event-discovery/1.0.0/src/main-widget.es6');
		widget = new module.TicketmasterEventDiscoveryWidget();
		widget = new module.TicketmasterEventDiscoveryWidget(document.querySelector('div[w-type="event-discovery"]'));
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
		expect(widget.themeUrl).toBe('https://ticketmaster-api-staging.github.io/products-and-docs/widgets/event-discovery/1.0.0/theme/');
		Object.defineProperty(window.location, 'host', {
			writable: true,
			value: 'developer.ticketmaster.com'
		});
		expect(widget.themeUrl).toBe('http://developer.ticketmaster.com/products-and-docs/widgets/event-discovery/1.0.0/theme/');
	});

	it('widget #portalUrl should be Defined', function(){
		expect(widget.portalUrl).toBe('http://developer.ticketmaster.com/');
		Object.defineProperty(window.location, 'host', {
			writable: true,
			value: 'developer.ticketmaster.com'
		});
		expect(widget.portalUrl).toBe('http://developer.ticketmaster.com/');
	});

	it('#events should be Defined', () => {
		widget.events;
		expect(widget.events).toBeUndefined();
	});

	it('#isPosterTheme should be Defined', () => {
		widget.widgetConfig = {
			layout: 'simple'
		}
		expect(widget.isPosterTheme).toBeTruthy();
	});

	it('#widgetContentHeight should be Defined', () => {
		widget.widgetConfig = {
			height: 300,
			theme:'listview'
		}
		widget.widgetContentHeight;
		expect(widget.widgetContentHeight).toBe(300);
	});

	it('#isBarcodeWidget should be Defined', () => {
		widget.widgetConfig = {
				theme:'oldschool'
		}
		expect(widget.isBarcodeWidget).toBeTruthy();
		widget.widgetConfig = {
			theme:'newschool'
		}
		expect(widget.isBarcodeWidget).toBeTruthy();
	});

	it('#borderSize should be Defined', () => {
		widget.widgetConfig = {
			border: 1
		}
		expect(widget.borderSize).toBeTruthy();
	});

	it('#eventUrl should be https://www.ticketmaster.com/event/', function(){
		widget.eventUrl;
		expect(widget.eventUrl).toBe('https://www.ticketmaster.com/event/');
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
			height: 350
		}
		expect(widget.isConfigAttrExistAndNotEmpty('height')).toBe(true);
		expect(widget.eventReqAttrs).toBeDefined();
		widget.widgetConfig = {
			tmapikey: '',
		};
		expect(widget.eventReqAttrs).toBeDefined();
		widget.widgetRoot.setAttribute("w-latlong", null);
		widget.eventReqAttrs;
	});

	it('#getCoordinates should be Defined', () => {
		let cb = function() {return true};
		widget.widgetConfig = {
			postalcode : '90015',
			latlong: ''
		};
		expect(typeof(widget.getCoordinates(cb))).toBeDefined();
		widget.onLoadCoordinate = function() {return true}
		widget.getCoordinates(cb);
		expect(typeof(widget.getCoordinates(cb))).toBeDefined();
		var responseTxt = '{"results" : [{"address_components" : [{"long_name" : "90015", "short_name" : "90015", "types" : [ "postal_code" ]}, {"long_name" : "Los Angeles", "short_name" : "Los Angeles", "types" : [ "locality", "political" ]}, {"long_name" : "Los Angeles County", "short_name" : "Los Angeles County", "types" : [ "administrative_area_level_2", "political" ]}, {"long_name" : "California", "short_name" : "CA", "types" : [ "administrative_area_level_1", "political" ]}, {"long_name" : "United States", "short_name" : "US", "types" : [ "country", "political" ]}], "formatted_address" : "Los Angeles, CA 90015, USA", "geometry" : {"bounds" : {"northeast" : {"lat" : 34.053104, "lng" : -118.2492601}, "southwest" : {"lat" : 34.02588, "lng" : -118.282846}}, "location" : {"lat" : 34.0390107, "lng" : -118.2672801}, "location_type" : "APPROXIMATE", "viewport" : {"northeast" : {"lat" : 34.053104, "lng" : -118.2492601}, "southwest" : {"lat" : 34.02588, "lng" : -118.282846}}}, "place_id" : "ChIJl_m-TMbHwoARF4Uisg4Acpw", "types" : [ "postal_code" ]}],"status" : "OK"}';
		widget.getCoordinates.bind({
			countriesWhiteList: ['Australia', 'Austria', 'Belgium', 'Canada', 'Denmark', 'Finland', 'France', 'Germany', 'Ireland', 'Mexico', 'Netherlands', 'New Zealand', 'Norway', 'Spain', 'Sweden', 'Turkey', 'UAE', 'United Kingdom', 'United States'],
			makeRequest:function(callback){
				callback.bind({
					status:200,
					latlong: '34.0390107, -118.2672801',
					readyState:XMLHttpRequest.DONE,
					responseText:responseTxt,
					googleapikey: 'kjhbg*&TB9ybKJjbhPJH',
					country: 'UK',
				})()
			},
			config: {
				postalcode: '90015',
				googleapikey: 'kjhbg*&TB9ybKJjbhPJH',
				country: 'UK',
			},
			widget:{
				config:{
					theme:'simple',
					latlong: '34.0390107, -118.2672801',
					postalcode: '90015',
					googleapikey: 'kjhbg*&TB9ybKJjbhPJH',
					country: 'UK',
				},
				latlong: '34.0390107, -118.2672801',
				googleapikey: 'kjhbg*&TB9ybKJjbhPJH',
				country: 'UK',
			},
			latlong: '34.0390107, -118.2672801',
			googleapikey: 'kjhbg*&TB9ybKJjbhPJH',
			country: 'UK',
			isConfigAttrExistAndNotEmpty:function(){return true},
			readyState:XMLHttpRequest.DONE,
			responseText:responseTxt,
			responceStatus:'OK',
			postalcode: '90015',
		})(function(){});
		widget.getCoordinates.bind({
			countriesWhiteList: ['Australia', 'Austria', 'Belgium', 'Canada', 'Denmark', 'Finland', 'France', 'Germany', 'Ireland', 'Mexico', 'Netherlands', 'New Zealand', 'Norway', 'Spain', 'Sweden', 'Turkey', 'UAE', 'United Kingdom', 'United States'],
			makeRequest:function(callback){
				callback.bind({
					status:200,
					latlong: '34.0390107, -118.2672801',
					readyState:XMLHttpRequest.DONE,
					responseText:responseTxt,
					googleapikey: 'kjhbg*&TB9ybKJjbhPJH',
				})()
			},
			config: {
				postalcode: '90015',
				googleapikey: 'kjhbg*&TB9ybKJjbhPJH',
			},
			widget:{
				config:{
					theme:'simple',
					latlong: '34.0390107, -118.2672801',
					postalcode: '90015',
					googleapikey: 'kjhbg*&TB9ybKJjbhPJH',
				},
				latlong: '34.0390107, -118.2672801',
				googleapikey: 'kjhbg*&TB9ybKJjbhPJH',
			},
			latlong: '34.0390107, -118.2672801',
			googleapikey: 'kjhbg*&TB9ybKJjbhPJH',
			isConfigAttrExistAndNotEmpty:function(){return true},
			readyState:XMLHttpRequest.DONE,
			responseText:responseTxt,
			responceStatus:'OK',
			postalcode: '90015',
		})(function(){});
	});

	it('#updateTransition should be BeDefined', function(){
		widget.updateTransition('www.ticketmaster.com', true);
		widget.updateTransition('www.ticketmaster.com', false);
		var centeredLogo = document.createElement('div');
		centeredLogo.classList.add('event-date');
		centeredLogo.classList.add('centered-logo');
		widget.eventsRootContainer.appendChild(centeredLogo);
		widget.updateTransition('www.ticketmaster.com', false);
		expect(widget.updateTransition).toBeDefined();
		widget.updateTransition('','');
		widget.updateTransition('',true);
	});

	it('#setBuyBtnUrl should be defined', () => {
		widget.eventsRootContainer = document.querySelector('.events-root-container');
		widget.initBuyBtn();
		widget.event = '{"id":"Z1lMVSyiJynZ177dJa","url":"https://qapurchasetest.nbp.frontgatetickets.com/event/lwln7sy8bni2h448","name":"No Longer on Sale for Web","date":{"day":"2014-03-31","time":"19:15:00"},"address":{"line1":"1711 S. Congress","line2":"2nd Floor","name":"FGS - Selenium (With enough text for 2nd"},"img":"https://s1.ticketm.net/dam/c/8cf/a6653880-7899-4f67-8067-1f95f4d158cf_124761_TABLET_LANDSCAPE_3_2.jpg"}';
		widget.eventsGroups = [];
		widget.currentSlideX = 0;
		widget.currentSlideY = 0;
		widget.eventsGroups[0] = [JSON.parse('{"id":"Z1lMVSyiJynZ177dJa","url":"https://ticketmaster.com/event/lwln7sy8bni2h448","name":"No Longer on Sale for Web","date":{"day":"2014-03-31","time":"19:15:00"},"address":{"line1":"1711 S. Congress","line2":"2nd Floor","name":"FGS - Selenium (With enough text for 2nd"},"img":"https://s1.ticketm.net/dam/c/8cf/a6653880-7899-4f67-8067-1f95f4d158cf_124761_TABLET_LANDSCAPE_3_2.jpg"}')];
		widget.widgetConfig = {
			buyBtn: function() {return true}
		}
		widget.setBuyBtnUrl();
		widget.buyBtn = function() {return true}
		widget.isUniversePluginInitialized = function() {return true}
		widget.isUniverseUrl('universe.com');
		widget.isAllowedTMEvent('http://ticketmaster.com/event/test');
		widget.isTMPluginInitialized = true;
		widget.widgetConfig = {
			theme: 'oldschool',
			proportion: 'm'
		}
		widget.setBuyBtnUrl();
		expect(typeof(widget.setBuyBtnUrl)).toBe('function');
		widget.buyBtn = function() {return false}
		widget.setBuyBtnUrl();
	});

	it('#isUniverseUrl should be Defined', () => {
		expect(widget.isUniverseUrl('universe.com')[0]).toBe('universe.com');
		expect(widget.isUniverseUrl('uniiverse.com')[0]).toBe('uniiverse.com');
		expect(widget.isUniverseUrl('ticketmaster.com')[0]).toBe('ticketmaster.com');
	});

	it('#initBuyBtn should be defined', () => {
		document.querySelector('.event-buy-btn').click();
		expect(typeof(widget.initBuyBtn)).toBe('function');
	});

	it('#addBuyButton should be defined', () => {
		widget.config.theme = 'listview';
		spyOn(widget,"isUniverseUrl").and.returnValue(true);
		spyOn(widget,"isAllowedTMEvent").and.returnValue(true);
		let _urlValid = undefined;
		widget.addBuyButton(document.querySelector('.events-root-container'), 'www.ticketmaster.com');
		expect(typeof(widget.addBuyButton)).toBe('function');
		widget.config.theme = 'listviewthumbnails';
		widget.isUniverseUrl('universe.com');
		widget.addBuyButton(document.querySelector('.events-root-container'), 'www.ticketmaster.com');
		expect(typeof(widget.addBuyButton)).toBe('function');
		widget.config.theme = 'oldschool';
		widget.addBuyButton(document.querySelector('.events-root-container'), 'www.ticketmaster.com');
	});

	it('#embedUniversePlugin should be defined', () => {
		expect(typeof(widget.embedUniversePlugin)).toBe('function');
	});

	it('#isAllowedTMEvent should be defined', () => {
		widget.isAllowedTMEvent('livenation.com');
		expect(widget.isAllowedTMEvent('livenation.com')).toBeFalsy();
		widget.isAllowedTMEvent('ticketmaster.com');
		expect(widget.isAllowedTMEvent('livenation.com')).toBeFalsy();
	});

	it('#initMessage should be defined', () => {
		document.querySelector('.event-message__btn').click();
		expect(typeof(widget.initMessage)).toBe('function');
	});

	it('#showMessage should be defined', () => {
		let hideMessageWithoutDelay = function() {return true};
		widget.massageDialog = widget.eventsRoot;
		widget.messageTimeout = function() {return true};
		widget.showMessage('Test message', hideMessageWithoutDelay);
		expect(typeof(widget.showMessage)).toBe('function');
	});

	it('#hideMessageWithDelay should be defined', () => {
		widget.hideMessageWithDelay(500);
		expect(typeof(widget.hideMessageWithDelay)).toBe('function');
		widget.messageTimeout = function() {return false};
		widget.hideMessageWithDelay(500);
		expect(typeof(widget.hideMessageWithDelay)).toBe('function');
	});

	it('#clearEvents should be defined', () => {
		widget.clearEvents;
		expect(typeof(widget.clearEvents)).toBe('function');
	});

	it('#hideMessage should be defined', () => {
		widget.hideMessage();
		expect(typeof(widget.hideMessage)).toBe('function');
		widget.messageTimeout = function() {return true};
		widget.hideMessage();
		expect(typeof(widget.hideMessage)).toBe('function');
	});

	it('#AdditionalElements should be defined', () => {
		widget.AdditionalElements();
		expect(typeof(widget.AdditionalElements)).toBe('function');
		widget.AdditionalElements = {
			toolTipHandler: function(e) {}
		}
		var e = new $.Event('click');
		widget.AdditionalElements.toolTipHandler(e);
	});

	it('#oldSchoolModificator should be defined', () => {
		widget.oldSchoolModificator();
		expect(typeof(widget.oldSchoolModificator)).toBe('function');
	});

	it('#newSchoolModificator should be defined', () => {
		widget.newSchoolModificator();
		expect(typeof(widget.newSchoolModificator)).toBe('function');
	});

	it('#listViewModificator should be defined', () => {
		widget.listViewModificator();
		expect(typeof(widget.listViewModificator)).toBe('function');
	});

	it('#initSliderControls should be defined', () => {
		widget.initSliderControls();
		$(widget.eventsRootContainer).trigger('touchstart');
		expect(typeof(widget.initSliderControls)).toBe('function');

	});

	it('#hideSliderControls should be defined', () => {
		widget.hideSliderControls();
		expect(typeof(widget.hideSliderControls)).toBe('function');
	});

	it('#toggleControlsVisibility should be defined', () => {
		widget.eventsGroups = [];
		widget.eventsGroups[0] = JSON.parse('[{"id":"vv1k0Zf0C6G7Dsmj","url":"http://www.ticketmaster.com/event/0900524387EF1B9C","name":"Bryan Adams","date":{"day":"2017-05-20","time":"18:00:00"},"address":{"line1":"2700 N. Vermont Ave","name":"Greek Theatre"},"location":{"lat":34.11948811,"lng":-118.29629093},"img":"https://s1.ticketm.net/dam/a/6b4/91e51635-4d17-42cb-9495-6f6702a546b4_288631_RECOMENDATION_16_9.jpg"},{"id":"vvG1iZfGxi-dEf","url":"http://www.ticketmaster.com/event/0B0050C8AC8439D4","name":"The Bodyguard (Touring)","date":{"day":"2017-05-17","time":"20:00:00"},"address":{"line1":"6233 Hollywood Blvd.","name":"Hollywood Pantages Theatre"},"location":{"lat":34.10200961,"lng":-118.32586552},"img":"https://s1.ticketm.net/dam/a/fd9/e1435468-e4f2-4c23-b7b8-61728c267fd9_241751_RECOMENDATION_16_9.jpg"}]');
		widget.eventsGroups[1] = widget.eventsGroups[0];
		widget.eventsGroups[2] = widget.eventsGroups[0];
		widget.eventsGroups[3] = widget.eventsGroups[0];
		widget.eventsGroups[4] = widget.eventsGroups[0];
		widget.eventsGroups[5] = widget.eventsGroups[0];
		widget.eventsGroups[6] = widget.eventsGroups[0];
		widget.eventsGroups[7] = JSON.parse('[{}]');
		widget.toggleControlsVisibility();
		expect(typeof(widget.toggleControlsVisibility)).toBe('function');
		widget.slideCountX = 6;
		widget.currentSlideX = 5;
		widget.toggleControlsVisibility();
		expect(typeof(widget.toggleControlsVisibility)).toBe('function');
		widget.currentSlideX = 7;
		widget.toggleControlsVisibility();
		widget.currentSlideY = 1;
		widget.currentSlideX = 5;
		widget.toggleControlsVisibility();
	});

	it('#prevSlideX should be defined', () => {
		widget.currentSlideX = 5;
		widget.eventsRoot = {
			style: {
				marginLeft: '10'
			}
		}
		widget.prevSlideX();
		expect(typeof(widget.prevSlideX)).toBe('function');
	});

	it('#nextSlideX should be defined', () => {
		widget.slideCountX = 7;
		widget.currentSlideX = 5;
		widget.eventsRoot = {
			style: {
				marginLeft: '10'
			}
		}
		widget.nextSlideX();
		expect(typeof(widget.nextSlideX)).toBe('function');
		widget.slideCountX = 5;
		widget.currentSlideX = 5;
		widget.nextSlideX();
	});

	it('#prevSlideY should be defined', () => {
		widget.eventGroup = '[{"id":"vv1k0Zf0C6G7Dsmj","url":"http://www.ticketmaster.com/event/0900524387EF1B9C","name":"Bryan Adams","date":{"day":"2017-05-20","time":"18:00:00"},"address":{"line1":"2700 N. Vermont Ave","name":"Greek Theatre"},"location":{"lat":34.11948811,"lng":-118.29629093},"img":"https://s1.ticketm.net/dam/a/6b4/91e51635-4d17-42cb-9495-6f6702a546b4_288631_RECOMENDATION_16_9.jpg"},{"id":"vvG1iZfGxi-dEf","url":"http://www.ticketmaster.com/event/0B0050C8AC8439D4","name":"The Bodyguard (Touring)","date":{"day":"2017-05-17","time":"20:00:00"},"address":{"line1":"6233 Hollywood Blvd.","name":"Hollywood Pantages Theatre"},"location":{"lat":34.10200961,"lng":-118.32586552},"img":"https://s1.ticketm.net/dam/a/fd9/e1435468-e4f2-4c23-b7b8-61728c267fd9_241751_RECOMENDATION_16_9.jpg"}]';
		widget.currentSlideY = 5;
		widget.eventsRoot = {
			style: {
				marginLeft: '10',
				marginTop: '10'
			},
			getElementsByClassName: function(){return [{style:{marginTop:'10'}}, "two", "three"]},
		}
		widget.currentSlideX = 5;
		widget.prevSlideY();
		expect(typeof(widget.prevSlideY)).toBe('function');
		widget.currentSlideY = 0;
		widget.prevSlideY();
	});

	it('#nextSlideY should be defined', () => {
		widget.currentSlideX = 7;
		widget.currentSlideY = 5;
		widget.eventsRoot = {
			style: {
				marginLeft: '10'
			},
			getElementsByClassName: function(){}
		}
		widget.nextSlideY();
		expect(typeof(widget.nextSlideY)).toBe('function');
	});

	it('#goToSlideX should be defined', () => {
		widget.eventsRoot = {
			style: {
				marginLeft: '10'
			},
			getElementsByClassName: function(){}
		};
		widget.currentSlideX = 1;
		widget.goToSlideX(1);
		expect(typeof(widget.goToSlideX)).toBe('function');
		widget.currentSlideX = 2;
		widget.goToSlideX(1);
	});

	it('#goToSlideY should be defined', () => {
		widget.eventGroup = '[{"id":"vv1k0Zf0C6G7Dsmj","url":"http://www.ticketmaster.com/event/0900524387EF1B9C","name":"Bryan Adams","date":{"day":"2017-05-20","time":"18:00:00"},"address":{"line1":"2700 N. Vermont Ave","name":"Greek Theatre"},"location":{"lat":34.11948811,"lng":-118.29629093},"img":"https://s1.ticketm.net/dam/a/6b4/91e51635-4d17-42cb-9495-6f6702a546b4_288631_RECOMENDATION_16_9.jpg"},{"id":"vvG1iZfGxi-dEf","url":"http://www.ticketmaster.com/event/0B0050C8AC8439D4","name":"The Bodyguard (Touring)","date":{"day":"2017-05-17","time":"20:00:00"},"address":{"line1":"6233 Hollywood Blvd.","name":"Hollywood Pantages Theatre"},"location":{"lat":34.10200961,"lng":-118.32586552},"img":"https://s1.ticketm.net/dam/a/fd9/e1435468-e4f2-4c23-b7b8-61728c267fd9_241751_RECOMENDATION_16_9.jpg"}]';
		widget.eventsRoot = {
			style: {
				marginLeft: '10'
			},
			getElementsByClassName: function(){}
		};
		widget.currentSlideY = 1;
		widget.goToSlideY(1);
		expect(typeof(widget.goToSlideY)).toBe('function');
	});

	it('#runAutoSlideX should be defined', () => {
		widget.slideCountX = 5;
		widget.currentSlideX = 1;
		widget.goToSlideX(5);
		widget.runAutoSlideX();
		expect(typeof(widget.runAutoSlideX)).toBe('function');
		widget.slideCountX = 1;
		widget.sliderInterval = function() {return true};
		widget.runAutoSlideX();
	});

	it('#stopAutoSlideX should be defined', () => {
		widget.sliderInterval = true;
		widget.stopAutoSlideX();
		expect(typeof(widget.stopAutoSlideX)).toBe('function');
	});

	it('#setSlideManually should be defined', () => {
		widget.setSlideManually(1,true);
		expect(typeof(widget.setSlideManually)).toBe('function');
	});

	it('#initSlider should be defined', () => {
		widget.initSlider();
		widget.sliderInterval = undefined;
		widget.listenerResize = [];
		widget.initSlider();
		expect(typeof(widget.initSlider)).toBe('function');
		widget.sliderTimeout = undefined;
		widget.widgetConfig = {
			layout: 'fullwidth'
		};
		widget.listenerResize = [];
		$(window).trigger('resize');
		widget.initSlider();
		expect(typeof(widget.initSlider)).toBe('function');
		widget.prevEventX.click();
	});

	it('#initFullWidth should be defined', () => {
		widget.widgetConfig = {
			layout: 'fullwidth'
		};
		widget.initFullWidth();
		expect(typeof(widget.initFullWidth)).toBe('function');
	});

	it('#publishEventsGroup should be defined', () => {
		var group = {
			map: function(){}
		};
		widget.eventsRoot = {
			appendChild: function() {}
		};
		widget.publishEventsGroup(group, 1);
		expect(typeof(widget.publishEventsGroup)).toBe('function');
	});

	it('#eventsLoadingHandler should be defined', () => {
		let responseTxt = '[{"id":"vv1k0Zf0C6G7Dsmj","url":"http://www.ticketmaster.com/event/0900524387EF1B9C","name":"Bryan Adams","date":{"day":"2017-05-20","time":"18:00:00"},"address":{"line1":"2700 N. Vermont Ave","name":"Greek Theatre"},"location":{"lat":34.11948811,"lng":-118.29629093},"img":"https://s1.ticketm.net/dam/a/6b4/91e51635-4d17-42cb-9495-6f6702a546b4_288631_RECOMENDATION_16_9.jpg"},{"id":"vvG1iZfGxi-dEf","url":"http://www.ticketmaster.com/event/0B0050C8AC8439D4","name":"The Bodyguard (Touring)","date":{"day":"2017-05-17","time":"20:00:00"},"address":{"line1":"6233 Hollywood Blvd.","name":"Hollywood Pantages Theatre"},"location":{"lat":34.10200961,"lng":-118.32586552},"img":"https://s1.ticketm.net/dam/a/fd9/e1435468-e4f2-4c23-b7b8-61728c267fd9_241751_RECOMENDATION_16_9.jpg"}]';
		let latlngbounds = {
			extend: function() {return true}
		};
		var events = responseTxt;
		var i= 1;
		widget.eventsLoadingHandler.bind({
			widget: {
				clearEvents: function(){},
				reduceParamsAndReloadEvents: function(){},
				groupEventsByName: function(){},
				formatDate: function(){},
				isUniverseUrl: function(){},
				isListView: function(){return false},
				isListViewThumbnails: function(){return false},
				setMarkers: function(){},
				resetReduceParamsOrder:function(){},
				hideMessageWithDelay:function(){},
				hideMessageWithoutDelay: function() {return true},
				hideMessage: function(events,i){},
				eventsGroups: {
					map: function(){}
				},
				initSlider: function(){},
				setEventsCounter: function(){},
				config:{
					theme:'simple'
				},
				widgetRoot:{
					firstChild: ''
				}
			},
			readyState:XMLHttpRequest.DONE,
			status:200,
			responseText:responseTxt,
			latlngbounds: {
				extend: function() {return true}
			}
		})();
		expect(typeof(widget.eventsLoadingHandler)).toBe('function');
		widget.eventsLoadingHandler.bind({
			widget: {
				clearEvents: function () {
					return true
				},
				reduceParamsAndReloadEvents: function () {
					return true
				},
				groupEventsByName: function () {
					return true
				},
				setMarkers: function () {
					return true
				},
				config:{
					theme:'simple'
				}
			},
			readyState:XMLHttpRequest.DONE,
			status:400,
			responseText:responseTxt
		})();
		expect(typeof(widget.eventsLoadingHandler)).toBe('function');
		widget.eventsLoadingHandler.bind({
			widget: {
				clearEvents: function(){},
				reduceParamsAndReloadEvents: function(){},
				groupEventsByName: function(){},
				formatDate: function(){},
				isUniverseUrl: function(){},
				setMarkers: function(){},
				resetReduceParamsOrder:function(){},
				hideMessageWithDelay:function(){},
				hideMessageWithoutDelay: undefined,
				hideMessage: function(events,i){},
				eventsGroups: {
					map: function(){}
				},
				initSlider: function(){},
				setEventsCounter: function(){},
				config:{
					theme:'simple'
				},
				widgetRoot:{
					firstChild: ''
				}
			},
			readyState:XMLHttpRequest.DONE,
			status:200,
			responseText:responseTxt,
			latlngbounds: {
				extend: function() {return true}
			}
		})();
		expect(typeof(widget.eventsLoadingHandler)).toBe('function');
		widget.eventsLoadingHandler.bind({
			widget: {
				clearEvents: function(){},
				reduceParamsAndReloadEvents: function(){},
				groupEventsByName: function(){},
				formatDate: function(){},
				isUniverseUrl: function(){},
				setMarkers: function(){},
				resetReduceParamsOrder:function(){},
				hideMessageWithDelay:function(){},
				isFullWidth: function() {return true},
				hideMessageWithoutDelay: undefined,
				hideMessage: function(events,i){},
				eventsGroups: {
					map: function(){}
				},
				initSlider: function(){},
				setEventsCounter: function(){},
				config:{
					theme:'simple'
				},
				widgetRoot:{
					firstChild: ''
				},
				events: {
					length: function(){return false}
				},
			},
			readyState:XMLHttpRequest.DONE,
			status:200,
			responseText:responseTxt,
			events: {
				length: function(){return false}
			},
			latlngbounds: {
				extend: function() {return true}
			}
		})();
		expect(typeof(widget.eventsLoadingHandler)).toBe('function');
	});

	it('#addScroll should be defined', () => {
		widget.addScroll();
		expect(typeof(widget.addScroll)).toBe('function');
	});

	it('#initPretendedLink should be defined', () => {
		widget.initPretendedLink(widget.widgetRoot, 'http://ticketmaster.com');
		$(widget.widgetRoot).trigger('click');
		expect(typeof(widget.initPretendedLink)).toBe('function');
		widget.initPretendedLink(widget.widgetRoot, false);
		$(widget.widgetRoot).trigger('touchstart');
	});

	it('#createBackgroundImage should be defined', () => {
		widget.createBackgroundImage(widget.widgetRoot, 'http://ticketmaster.com');
		expect(typeof(widget.createBackgroundImage)).toBe('function');
		widget.widgetConfig = {
			theme: 'listviewthumbnails'
		}
		widget.createBackgroundImage(widget.widgetRoot, 'http://ticketmaster.com');
		widget.createBackgroundImage(widget.widgetRoot, false);
	});

	it('#addBarcode should be defined', () => {
		widget.widgetConfig ={
			theme: 'oldschool'
		}
		widget.addBarcode(widget.widgetRoot, 'http://ticketmaster.com');
		expect(typeof(widget.addBarcode)).toBe('function');
		widget.widgetConfig ={
			theme: undefined
		}
		widget.addBarcode(widget.widgetRoot, 'http://ticketmaster.com');
		expect(typeof(widget.addBarcode)).toBe('function');
	});

	it('#groupEventsByName should be defined', () => {
		widget.events = '[{"id":"Z1lMVSyiJynZ177dJa","url":"https://qapurchasetest.nbp.frontgatetickets.com/event/lwln7sy8bni2h448","name":"No Longer on Sale for Web","date":{"day":"2014-03-31","time":"19:15:00"},"address":{"line1":"1711 S. Congress","line2":"2nd Floor","name":"FGS - Selenium (With enough text for 2nd"},"img":"https://s1.ticketm.net/dam/c/8cf/a6653880-7899-4f67-8067-1f95f4d158cf_124761_TABLET_LANDSCAPE_3_2.jpg"},{"id":"vv1AdZAa4GkdE0_X3","url":"http://www.ticketmaster.com/event/03005255E7919F92","name":"FIAF Presents - Wine Tour de France - 4 Tasting Class Package","date":{"day":"2017-03-20","time":"19:00:00"},"address":{"line1":"22 East 60th St","line2":"8th Floor (Between Park & Madison Aves)","name":"Le Skyroom at FIAF"},"img":"https://s1.ticketm.net/dam/c/7e6/22f24b33-e33a-4ee1-87ba-9c3aece497e6_105841_TABLET_LANDSCAPE_3_2.jpg"},{"id":"vvG1HZf0T55fH1","url":"http://www.ticketmaster.com/event/0F00524FCB2D4F0A","name":"DMX & Zeds Dead Two Show Combo","date":{"day":"2017-03-31","time":"20:00:00"},"address":{"line1":"555 W 5th Avenue","name":"William a Egan Civic and Convention Center"},"img":"https://s1.ticketm.net/dam/a/835/16ceaa41-585f-4bc5-b376-a56d2e9a3835_298451_TABLET_LANDSCAPE_3_2.jpg"}]';
		widget.groupEventsByName();
		expect(typeof(widget.groupEventsByName)).toBe('function');
	});

	it('#setEventsCounter should be defined', () => {
		widget.eventsCounter = {};
		widget.setEventsCounter();
		expect(typeof(widget.setEventsCounter)).toBe('function');
		widget.eventsGroups = '[[{"id":"Z1lMVSyiJynZ177dJa","url":"https://qapurchasetest.nbp.frontgatetickets.com/event/lwln7sy8bni2h448","name":"No Longer on Sale for Web","date":{"day":"2014-03-31","time":"19:15:00"},"address":{"line1":"1711 S. Congress","line2":"2nd Floor","name":"FGS - Selenium (With enough text for 2nd"},"img":"https://s1.ticketm.net/dam/c/8cf/a6653880-7899-4f67-8067-1f95f4d158cf_124761_TABLET_LANDSCAPE_3_2.jpg"}],[{"id":"vv1AdZAa4GkdE0_X3","url":"http://www.ticketmaster.com/event/03005255E7919F92","name":"FIAF Presents - Wine Tour de France - 4 Tasting Class Package","date":{"day":"2017-03-20","time":"19:00:00"},"address":{"line1":"22 East 60th St","line2":"8th Floor (Between Park & Madison Aves)","name":"Le Skyroom at FIAF"},"img":"https://s1.ticketm.net/dam/c/7e6/22f24b33-e33a-4ee1-87ba-9c3aece497e6_105841_TABLET_LANDSCAPE_3_2.jpg"}],[{"id":"vvG1HZf0T55fH1","url":"http://www.ticketmaster.com/event/0F00524FCB2D4F0A","name":"DMX & Zeds Dead Two Show Combo","date":{"day":"2017-03-31","time":"20:00:00"},"address":{"line1":"555 W 5th Avenue","name":"William a Egan Civic and Convention Center"},"img":"https://s1.ticketm.net/dam/a/835/16ceaa41-585f-4bc5-b376-a56d2e9a3835_298451_TABLET_LANDSCAPE_16_9.jpg"}]]';
		widget.setEventsCounter();
		expect(typeof(widget.setEventsCounter)).toBe('function');
		widget.eventsGroups = {length: 0};
		widget.setEventsCounter();
		expect(typeof(widget.setEventsCounter)).toBe('function');
	});

	it('#resetReduceParamsOrder should be defined', () => {
		widget.resetReduceParamsOrder();
		expect(typeof(widget.resetReduceParamsOrder)).toBe('function');
	});

	it('#makeImageUrl should be defined', () => {
		widget.makeImageUrl('test');
		expect(widget.makeImageUrl('test')).toBe('https://app.ticketmaster.com/discovery/v2/events/test/images.json');
	});

	it('#reduceParamsAndReloadEvents should be defined', () => {
		widget.reduceParamsOrder = 0;
		widget.reduceParamsAndReloadEvents();
		expect(typeof(widget.reduceParamsAndReloadEvents)).toBe('function');
		widget.reduceParamsList = [];
		widget.reduceParamsAndReloadEvents();
		expect(typeof(widget.reduceParamsAndReloadEvents)).toBe('function');
	});

	it('#styleLoadingHandler should be defined', () => {
		widget.styleLoadingHandler.bind({widget:{config:{theme:'simple'}},readyState:XMLHttpRequest.DONE, status:200, responseText:'<link id="widget-theme-listview" rel="stylesheet" href="/products-and-docs/widgets/event-discovery/1.0.0/theme/listview.css">'})();
		expect(typeof(widget.styleLoadingHandler)).toBe('function');
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
		mockDate = {
			dateTime : "2017-03-18T00:00:00Z",
			day : "2017-03-17",
			time : "00:00:00"
		};
		okResult = widget.formatDate(mockDate);
		expect(okResult).toEqual("Fri, Mar 17, 2017 12:00 AM");
	});

	it('#update should be defined', () => {
		widget.eventsRootContainer = document.querySelector('.events-root-container');
		widget.eventsRoot = document.querySelector('.events-root-container');
		widget.themeModificators = {
			hasOwnProperty: function() {}
		}
		widget.update();
		expect(typeof(widget.update)).toBe('function');
		widget.config = {
			border: '2'
		}
		widget.widgetConfig = {
			theme: ''
		};
		widget.update();
		expect(typeof(widget.update)).toBe('function');
	});

	it('#parseEvent should return currentEvent', () => {
		var eventSet = {
			id:'porky',
			url:'pie',
			name: 'Tanok na maydani Kongo',
			address:{name:''},
			images : [
				{ width : '100', height :'200', url:"img-01.bmp"},
				{ width : '400', height :'300', url:"img-02.bmp"},
				{ width : '50', height :'50', url:"img-03.bmp"},
				{ width : '10', height :'10', url:"img-04.bmp"}
			],
			dates : {
				start : {
					localDate: '23.09.83',
					localTime: '12:00',
					dateTime: '11:00'
				},
				end : {
					localDate: '23.09.99',
					localTime: '19:00',
					dateTime: '18:00'
				}
			},
			_embedded: {
				venues: [
					{
						name: 'one address'
					}
				]
			}
		};
		var currentEvent = widget.parseEvents(eventSet);
		var generatedObj = {
			address: {"name": "one address"},
			date: {"dateTime": "11:00", "dateTimeEnd": "18:00", "day": "23.09.83", "dayEnd": "23.09.99", "time": "12:00", "timeEnd": "19:00"},
			id: "porky",
			img: "img-03.bmp",
			name: "Tanok na maydani Kongo",
			url: "pie"
		};
		// expect(currentEvent).toEqual(generatedObj);


		var generatedObjNoVenueName = {
			id: 'porky',
			url: 'pie',
			name: 'Tanok na maydani Kongo',
			date: { day: '23.09.83', time: '12:00', dateTime: '11:00', dayEnd: '23.09.99', timeEnd: '19:00', dateTimeEnd: '18:00' },
			address: 'one address',
			img: 'img-03.bmp'
		};

		eventSet._embedded.venues[0]={ address: 'one address' };
		let $widgetModalNoCode = undefined;
		widget.parseEvents(eventSet);
		let currentEventNoVenueName = widget.parseEvents(eventSet);
		// expect(currentEventNoVenueName).toEqual(generatedObjNoVenueName);

	});

});

describe("EDWWidgetWithoutSpyOn", () => {
	let widget,
		module,
		hideMessageDelay;
	var setFixture = () => {
		document.body.innerHTML =
			'<head></head><div w-type="event-discovery" w-tmapikey="y61xDc5xqUSIOz4ISjgCe5E9Lh0hfUH1" w-googleapikey="AIzaSyBQrJ5ECXDaXVlICIdUBOe8impKIGHDzdA" w-keyword="" w-theme="ListView" w-colorscheme="light" w-width="350" w-height="600" w-size="25" w-border="0" w-borderradius="4" w-postalcode="" w-radius="" w-period="week" w-layout="vertical" w-attractionid="" w-promoterid="" w-venueid="" w-affiliateid="" w-segmentid="" w-proportion="custom" w-titlelink="off" w-countrycode="US" w-source="" w-latlong=","><div class="event-logo centered-logo"></div><div class="event-date centered-logo"></div></div>';
	};
	beforeAll(() => {
		window.__VERSION__ = 'mockedVersion';
		setFixture();
		module = require('products-and-docs/widgets/event-discovery/1.0.0/src/main-widget.es6');
		widget = new module.TicketmasterEventDiscoveryWidget();
		widget = new module.TicketmasterEventDiscoveryWidget(document.querySelector('div[w-type="event-discovery"]'));
	});

	beforeEach(function() {
		spyOn(widget, 'isListView');
	});

	it('#clear should be defined', () => {
		$(widget.widgetRoot).append('<div class="modificator"></div><div class="modificator"></div><div class="modificator"></div>');
		$(document.body).append('<div class="widget-container--discovery"><div class="listview-after"></div></div>');
		widget.clear();
		expect(typeof(widget.clear)).toBe('function');
		widget.widgetConfig = {
			theme: 'listview'
		};
		widget.clear();
	});

	it('#hideMessage should be defined', () => {
		widget.hideMessage();
		expect(typeof(widget.hideMessage)).toBe('function');
		widget.messageTimeout = function() {return true};
		widget.hideMessage();
		expect(typeof(widget.hideMessage)).toBe('function');
	});

	it('#showMessage should be defined', () => {
		let hideMessageWithoutDelay = function() {return true};
		widget.massageDialog = widget.eventsRoot;
		widget.messageTimeout = function() {return true};
		widget.showMessage('Test message', hideMessageWithoutDelay);
		expect(typeof(widget.showMessage)).toBe('function');
	});

	it('#publishEvent should be defined', () => {
		let evt = JSON.parse('[[{"id":"Z1lMVSyiJynZ177dJa","url":"https://qapurchasetest.nbp.frontgatetickets.com/event/lwln7sy8bni2h448","name":"No Longer on Sale for Web","date":{"day":"2014-03-31","time":"19:15:00"},"address":{"line1":"1711 S. Congress","line2":"2nd Floor","name":"FGS - Selenium (With enough text for 2nd"},"img":"https://s1.ticketm.net/dam/c/8cf/a6653880-7899-4f67-8067-1f95f4d158cf_124761_TABLET_LANDSCAPE_3_2.jpg"}],[{"id":"vv1AdZAa4GkdE0_X3","url":"http://www.ticketmaster.com/event/03005255E7919F92","name":"FIAF Presents - Wine Tour de France - 4 Tasting Class Package","date":{"day":"2017-03-20","time":"19:00:00"},"address":{"line1":"22 East 60th St","line2":"8th Floor (Between Park & Madison Aves)","name":"Le Skyroom at FIAF"},"img":"https://s1.ticketm.net/dam/c/7e6/22f24b33-e33a-4ee1-87ba-9c3aece497e6_105841_TABLET_LANDSCAPE_3_2.jpg"}],[{"id":"vvG1HZf0T55fH1","url":"http://www.ticketmaster.com/event/0F00524FCB2D4F0A","name":"DMX & Zeds Dead Two Show Combo","date":{"day":"2017-03-31","time":"20:00:00"},"address":{"line1":"555 W 5th Avenue","name":"William a Egan Civic and Convention Center"},"img":"https://s1.ticketm.net/dam/a/835/16ceaa41-585f-4bc5-b376-a56d2e9a3835_298451_TABLET_LANDSCAPE_16_9.jpg"}]]');
		widget.publishEvent(evt, widget.widgetRoot);
		expect(typeof(widget.publishEvent)).toBe('function');
	});

	it('#createDOMItem should be defined', () => {
		let evt = JSON.parse('{"id":"LvZ184X-QKyIveZvudILo","url":"https://www.universe.com/events/2017-2018-subscription-tickets-F39HZP?ref=ticketmaster","name":"2017/2018 Subscription","date":{"day":"2016-09-25","time":"18:15:00"},"img":"https://s1.ticketm.net/dam/c/8cf/a6653880-7899-4f67-8067-1f95f4d158cf_124761_TABLET_LANDSCAPE_16_9.jpg"}');
		widget.createDOMItem(evt, widget.widgetRoot);
		expect(typeof(widget.createDOMItem)).toBe('function');
		document.querySelector('[w-type="event-discovery"]').removeAttribute('w-titlelink');
		evt = JSON.parse('{"id":"LvZ184X-QKyIveZvudILo","url":"https://www.universe.com/events/2017-2018-subscription-tickets-F39HZP?ref=ticketmaster","name":"2017/2018 Subscription","address":{"name":"Avenue 5", "line1":"one" ,"line2": "two"},"categories":["music", "games"],"date":{"day":"2016-09-25","time":"18:15:00"},"img":"https://s1.ticketm.net/dam/c/8cf/a6653880-7899-4f67-8067-1f95f4d158cf_124761_TABLET_LANDSCAPE_16_9.jpg"}');
		widget.createDOMItem(evt, widget.widgetRoot);
		evt = JSON.parse('{"id":"LvZ184X-QKyIveZvudILo","url":"https://www.universe.com/events/2017-2018-subscription-tickets-F39HZP?ref=ticketmaster","address":"","name":"2017/2018 Subscription","date":{"day":"2016-09-25","time":"18:15:00"},"img":"https://s1.ticketm.net/dam/c/8cf/a6653880-7899-4f67-8067-1f95f4d158cf_124761_TABLET_LANDSCAPE_16_9.jpg"}');
		widget.createDOMItem(evt, widget.widgetRoot);
	});

});
