var $ = require('jquery');
window.$ = window.jQuery = $;

import TicketmasterCalendarWidget from 'products-and-docs/widgets/calendar/1.0.0/src/classes/TicketmasterCalendarWidget.js';
import TabsControls from 'products-and-docs/widgets/calendar/1.0.0/src/classes/TabsControls.js';
import SelectorControls from 'products-and-docs/widgets/calendar/1.0.0/src/classes/SelectorControls.js';
import WeekScheduler from 'products-and-docs/widgets/calendar/1.0.0/src/classes/WeekScheduler.js';
import MonthScheduler from 'products-and-docs/widgets/calendar/1.0.0/src/classes/MonthScheduler.js';
import YearScheduler from 'products-and-docs/widgets/calendar/1.0.0/src/classes/YearScheduler.js';

describe("CalendarWidget", () => {
	let widget,
		widgetWeek,
		widgetMonth,
		widgetYear,
		tabsControls,
		selectorControls,
		module,
		hideMessageDelay;
	var setFixture = () => {
		document.body.innerHTML = '<head></head><div w-type="calendar" w-tmapikey="y61xDc5xqUSIOz4ISjgCe5E9Lh0hfUH1" w-googleapikey="AIzaSyBQrJ5ECXDaXVlICIdUBOe8impKIGHDzdA" w-postalcodeapi="90015" w-keyword="" w-colorscheme="light" w-width="350" w-height="600" w-size="25" w-border="0" w-borderradius="4" w-postalcode="" w-radius="" w-period="" w-layout="vertical" w-attractionid="" w-promoterid="" w-venueid="" w-affiliateid="" w-segmentid="" w-proportion="custom" w-titlelink="off" w-countrycode="US" w-source="" w-latlong=",">';
		document.body.innerHTML += '<div class="tabs"><span class="tb active">Day</span><span class="tb">Week</span><span class="tb">Month</span><span class="tb">Year</span></div>';
		document.body.innerHTML += '<div class="tabs-container"><div class="tab active">';
		document.body.innerHTML += '<div class="sliderLeftSelector"><span class="selector-title">June 27</span><span class="selector-content" tabindex="-1"><span class="active" w-period="Tue Jun 27 2017 17:28:24 GMT+0300 (FLE Daylight Time)">June 27</span><span w-period="Wed Jun 28 2017 17:28:24 GMT+0300 (FLE Daylight Time)">June 28</span><span w-period="Thu Jun 29 2017 17:28:24 GMT+0300 (FLE Daylight Time)">June 29</span><span w-period="Fri Jun 30 2017 17:28:24 GMT+0300 (FLE Daylight Time)">June 30</span><span w-period="Sat Jul 01 2017 17:28:24 GMT+0300 (FLE Daylight Time)">July 1</span><span w-period="Sun Jul 02 2017 17:28:24 GMT+0300 (FLE Daylight Time)">July 2</span><span w-period="Mon Jul 03 2017 17:28:24 GMT+0300 (FLE Daylight Time)">July 3</span></span></div>';
		document.body.innerHTML += '<div class="sliderRightSelector"><span class="selector-title">All Events</span><span class="selector-content" tabindex="-1"><span class="active" w-classificationid="">All Events</span><span w-classificationid="KZFzniwnSyZfZ7v7na">Arts &amp; Theatre</span><span w-classificationid="KZFzniwnSyZfZ7v7nn">Film</span><span w-classificationid="KZFzniwnSyZfZ7v7n1">Miscellaneous</span><span w-classificationid="KZFzniwnSyZfZ7v7nJ">Music</span><span w-classificationid="KZFzniwnSyZfZ7v7nE">Sports</span></span></div>';
		document.body.innerHTML += '</div><div class="tab"></div><div class="tab"></div><div class="tab"></div></div>';
		document.body.innerHTML += '<div class="event-logo centered-logo"></div><div class="event-date centered-logo"></div><div class="spinner-container"></div></div>';
	};
	beforeAll(() => {
		window.__VERSION__ = 'mockedVersion';
		setFixture();
		// module = require('products-and-docs/widgets/calendar/1.0.0/src/main-widget.es6');
		widget = new TicketmasterCalendarWidget();
		widget = new TicketmasterCalendarWidget(document.querySelector('div[w-type="calendar"]'));
		widgetWeek = new WeekScheduler();
		widgetMonth = new MonthScheduler();
		widgetYear = new YearScheduler();
		tabsControls = new TabsControls(document.querySelector('div[w-type="calendar"]'));
		selectorControls = new SelectorControls();
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
		expect(widget.themeUrl).toBe('https://developer.ticketmaster.com/products-and-docs/widgets/calendar/1.0.0/theme/');
	});

	it('#events should be Defined', () => {
		widget.events;
		expect(widget.events).toBeUndefined();
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

	it('widget #portalUrl should be Defined', function(){
		expect(widget.portalUrl).toBe('https://developer.ticketmaster.com/');
		Object.defineProperty(window.location, 'host', {
			writable: true,
			value: 'developer.ticketmaster.com'
		});
		expect(widget.portalUrl).toBe('https://developer.ticketmaster.com/');
	});

	it('widget #legalNoticeUrl should be Defined', function(){
		expect(widget.legalNoticeUrl).toBe('https://developer.ticketmaster.com/support/terms-of-use/');
		Object.defineProperty(window.location, 'host', {
			writable: true,
			value: 'developer.ticketmaster.com/support/terms-of-use/'
		});
		expect(widget.legalNoticeUrl).toBe('https://developer.ticketmaster.com/support/terms-of-use/');
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

	it('#hideMessageDelay should be 500', function(){
		expect(widgetWeek.hideMessageDelay).toBe(3000);
	});

	it('#hideMessageDelay should be 500', function(){
		expect(widgetMonth.hideMessageDelay).toBe(3000);
	});

	it('#hideMessageDelay should be 500', function(){
		expect(widgetYear.hideMessageDelay).toBe(3000);
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

	it('#initBuyBtn should be defined', () => {
		document.querySelector('.event-buy-btn').click();
		widget.initBuyBtn();
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

	it('#isUniverseUrl should be Defined', () => {
		expect(widget.isUniverseUrl('universe.com')[0]).toBe('universe.com');
		expect(widget.isUniverseUrl('uniiverse.com')[0]).toBe('uniiverse.com');
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
		widget.isUniverseUrl = function() {return true};
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

	it('#initMessage should be defined', () => {
		document.querySelector('.event-message__btn').click();
		expect(typeof(widget.initMessage)).toBe('function');
	});

	it('#initMessage should be defined', () => {
		document.querySelector('.event-message__btn').click();
		expect(typeof(widgetWeek.initMessage)).toBe('function');
	});

	it('#initMessage should be defined', () => {
		document.querySelector('.event-message__btn').click();
		expect(typeof(widgetMonth.initMessage)).toBe('function');
	});

	it('#initMessage should be defined', () => {
		document.querySelector('.event-message__btn').click();
		expect(typeof(widgetYear.initMessage)).toBe('function');
	});

	it('#showMessage should be defined', () => {
		let hideMessageWithoutDelay = function() {return true};
		widget.massageDialog = widget.eventsRoot;
		widget.messageTimeout = function() {return true};
		widget.showMessage('Test message', hideMessageWithoutDelay);
		expect(typeof(widget.showMessage)).toBe('function');
	});

	it('#showMessage should be defined', () => {
		let hideMessageWithoutDelay = function() {return true};
		widgetWeek.messageContent = {
				innerHTML: function() {return true}
		};
		widgetWeek.messageDialog = {
			  classList: {
			  	add: function() {return true}
				}
		};
		widgetWeek.massageDialog = widgetWeek.eventsRoot;
		widgetWeek.messageTimeout = function() {return true};
		widgetWeek.showMessage('Test message', hideMessageWithoutDelay);
		expect(typeof(widgetWeek.showMessage)).toBe('function');
	});

	it('#showMessage should be defined', () => {
		let hideMessageWithoutDelay = function() {return true};
		widgetMonth.messageContent = {
			innerHTML: function() {return true}
		};
		widgetMonth.messageDialog = {
			classList: {
				add: function() {return true}
			}
		};
		widgetMonth.massageDialog = widgetMonth.eventsRoot;
		widgetMonth.messageTimeout = function() {return true};
		widgetMonth.showMessage('Test message', hideMessageWithoutDelay);
		expect(typeof(widgetMonth.showMessage)).toBe('function');
	});

	it('#showMessage should be defined', () => {
		let hideMessageWithoutDelay = function() {return true};
		widgetYear.messageContent = {
			innerHTML: function() {return true}
		};
		widgetYear.messageDialog = {
			classList: {
				add: function() {return true}
			}
		};
		widgetYear.massageDialog = widgetYear.eventsRoot;
		widgetYear.messageTimeout = function() {return true};
		widgetYear.showMessage('Test message', hideMessageWithoutDelay);
		expect(typeof(widgetYear.showMessage)).toBe('function');
	});

	it('#hideMessageWithDelay should be defined', () => {
		widget.hideMessageWithDelay(500);
		expect(typeof(widget.hideMessageWithDelay)).toBe('function');
		widget.messageTimeout = function() {return false};
		widget.hideMessageWithDelay(500);
		widget.hideMessageWithDelay.bind({
			messageTimeout: false
		})();
		expect(typeof(widget.hideMessageWithDelay)).toBe('function')
	});

	it('#hideMessageWithDelay should be defined', () => {
		widgetWeek.hideMessageWithDelay(500);
		expect(typeof(widgetWeek.hideMessageWithDelay)).toBe('function');
		widgetWeek.messageTimeout = function() {return false};
		widgetWeek.hideMessageWithDelay(500);
		widgetWeek.hideMessageWithDelay.bind({
			messageTimeout: false
		})();
		expect(typeof(widgetWeek.hideMessageWithDelay)).toBe('function')
	});

	it('#hideMessageWithDelay should be defined', () => {
		widgetMonth.hideMessageWithDelay(500);
		expect(typeof(widgetMonth.hideMessageWithDelay)).toBe('function');
		widgetMonth.messageTimeout = function() {return false};
		widgetMonth.hideMessageWithDelay(500);
		widgetMonth.hideMessageWithDelay.bind({
			messageTimeout: false
		})();
		expect(typeof(widgetMonth.hideMessageWithDelay)).toBe('function')
	});

	it('#hideMessageWithDelay should be defined', () => {
		widgetYear.hideMessageWithDelay(500);
		expect(typeof(widgetYear.hideMessageWithDelay)).toBe('function');
		widgetYear.messageTimeout = function() {return false};
		widgetYear.hideMessageWithDelay(500);
		widgetYear.hideMessageWithDelay.bind({
			messageTimeout: false
		})();
		expect(typeof(widgetYear.hideMessageWithDelay)).toBe('function')
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

	it('#hideMessage should be defined', () => {
		widgetWeek.messageDialog = {
			classList: {
				remove: function () {return true}
			}
		};
		widgetWeek.hideMessage()
		expect(typeof(widgetWeek.hideMessage)).toBe('function');
		widgetWeek.messageTimeout = function() {return true};
		widgetWeek.hideMessage();
		expect(typeof(widgetWeek.hideMessage)).toBe('function');
	});

	it('#hideMessage should be defined', () => {
		widgetMonth.messageDialog = {
			classList: {
				remove: function () {return true}
			}
		};
		widgetMonth.hideMessage()
		expect(typeof(widgetMonth.hideMessage)).toBe('function');
		widgetMonth.messageTimeout = function() {return true};
		widgetMonth.hideMessage();
		expect(typeof(widgetMonth.hideMessage)).toBe('function');
	});

	it('#hideMessage should be defined', () => {
		widgetYear.messageDialog = {
			classList: {
				remove: function () {return true}
			}
		};
		widgetYear.hideMessage()
		expect(typeof(widgetYear.hideMessage)).toBe('function');
		widgetYear.messageTimeout = function() {return true};
		widgetYear.hideMessage();
		expect(typeof(widgetYear.hideMessage)).toBe('function');
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


	it('#getCoordinates should be Defined', () => {
		let cb = function() {return true};
		widget.widgetConfig = {
			postalcode : '90015',
			latlong: '',
			getAttribute: function() {return true}
		};
		widget.widgetRoot = {
			getAttribute: function() {return true},
			postalcodeapi: '90015'
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

	it('#resetReduceParamsOrder should be defined', () => {
		widget.resetReduceParamsOrder();
		expect(typeof(widget.resetReduceParamsOrder)).toBe('function');
	});

	it('#makeImageUrl should be defined', () => {
		widget.makeImageUrl('test');
		expect(widget.makeImageUrl('test')).toBe('https://app.ticketmaster.com/discovery-widgets/v2/events/test/images.json');
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

	it('#groupEventsByName should be defined', () => {
		widget.events = '[{"id":"Z1lMVSyiJynZ177dJa","url":"https://qapurchasetest.nbp.frontgatetickets.com/event/lwln7sy8bni2h448","name":"No Longer on Sale for Web","date":{"day":"2014-03-31","time":"19:15:00"},"address":{"line1":"1711 S. Congress","line2":"2nd Floor","name":"FGS - Selenium (With enough text for 2nd"},"img":"https://s1.ticketm.net/dam/c/8cf/a6653880-7899-4f67-8067-1f95f4d158cf_124761_TABLET_LANDSCAPE_3_2.jpg"},{"id":"vv1AdZAa4GkdE0_X3","url":"http://www.ticketmaster.com/event/03005255E7919F92","name":"FIAF Presents - Wine Tour de France - 4 Tasting Class Package","date":{"day":"2017-03-20","time":"19:00:00"},"address":{"line1":"22 East 60th St","line2":"8th Floor (Between Park & Madison Aves)","name":"Le Skyroom at FIAF"},"img":"https://s1.ticketm.net/dam/c/7e6/22f24b33-e33a-4ee1-87ba-9c3aece497e6_105841_TABLET_LANDSCAPE_3_2.jpg"},{"id":"vvG1HZf0T55fH1","url":"http://www.ticketmaster.com/event/0F00524FCB2D4F0A","name":"DMX & Zeds Dead Two Show Combo","date":{"day":"2017-03-31","time":"20:00:00"},"address":{"line1":"555 W 5th Avenue","name":"William a Egan Civic and Convention Center"},"img":"https://s1.ticketm.net/dam/a/835/16ceaa41-585f-4bc5-b376-a56d2e9a3835_298451_TABLET_LANDSCAPE_3_2.jpg"}]';
		widget.groupEventsByName();
		expect(typeof(widget.groupEventsByName)).toBe('function');
	});


	it('#initEventCounter should be defined', () => {
		widget.widgetRoot = {
			appendChild: function() {return true}
		}
		widget.initEventCounter();
		expect(typeof(widget.initEventCounter)).toBe('function');
	});

	it('#setEventsCounter should be defined', () => {
		widget.setEventsCounter();
		expect(typeof(widget.setEventsCounter)).toBe('function');
	});

	it('#getEventByID should be defined', () => {
		widget.getEventByID(1);
		expect(typeof(widget.getEventByID)).toBe('function');
	});

	it('#getImageForEvent should be defined', () => {
		let images = [];
		widget.getImageForEvent(images);
		expect(typeof(widget.getImageForEvent)).toBe('function');
	});

	it('#toShortISOString should be defined', () => {
		let today = new Date();
		widget.toShortISOString(today);
		expect(typeof(widget.toShortISOString)).toBe('function');
	});

	it('#getDateFromPeriod should be defined', () => {
		let period = new Date();
		widget.getDateFromPeriod(period);
		period = 'week';
		widget.getDateFromPeriod(period);
		expect(typeof(widget.getDateFromPeriod)).toBe('function');

	});

	it('#reduceParamsAndReloadEvents should be defined', () => {
		widget.widgetRoot = {
			getAttribute: function() {return true}
		}
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

  /* Tabs Controls [START] */

	it('tabsContorls #setActiveTab should be BeDefined', function(){
		let this_ = document.body.querySelector('.tabs');
		tabsControls.setActiveTab(2);
		expect(typeof(tabsControls.setActiveTab)).toBe('function');
		document.querySelector('.tb').click();
	});

	/* Tabs Controls [END] */

	/* Selector Controls [END] */
	it('selectorContorls #selActiveTab should be BeDefined', function(){
		let selCont = document.body.querySelector('.selector-content');
		let selTitl = document.body.querySelector('.selector-title');
		$(selCont).click();
		$(selCont).removeClass('selector-content').click();
		$(selTitl).click();
		$(selTitl).addClass('open');
		$(selTitl).click();
		$(selCont).addClass('show');
		$(selCont).click();
		$(selCont).blur();
	});
	/* Selector Controls [END] */

  /* WidgetWeek [START] */

	it('widget #tmWidgetWhiteList should be BeDefined', function(){
		widgetWeek.apiUrl;
		expect(widgetWeek.apiUrl).toBe('https://app.ticketmaster.com/discovery-widgets/v2/events.json');
	});

	it('widget #tmWidgetWhiteList should be BeDefined', function(){
		widgetWeek.messageRootContainer;
		expect(widgetWeek.messageRootContainer).toBe('weekSсheduler');
	});

	it('widget #tmWidgetWhiteList should be BeDefined', function(){
		widgetMonth.messageRootContainer;
		expect(widgetMonth.messageRootContainer).toBe('monthScheduler');
	});

	it('widget #tmWidgetWhiteList should be BeDefined', function(){
		widgetYear.messageRootContainer;
		expect(widgetYear.messageRootContainer).toBe('yearScheduler');
	});

	it('#formatDate should return result', function(){
		let noneResult = widgetWeek.formatDate('date');
		expect(noneResult).toBe('');

		let noneTimeResult = widgetWeek.formatDate({day : "2017-03-17"});
		expect(noneTimeResult).toEqual("Fri, Mar 17, 2017");

		let mockDate = {
			dateTime : "2017-03-18T00:30:00Z",
			day : "2017-03-17",
			time : "20:30:00"
		};
		let okResult = widgetWeek.formatDate(mockDate);
		expect(okResult).toEqual("Fri, Mar 17, 2017 08:30 PM");
		mockDate = {
			dateTime : "2017-03-18T00:00:00Z",
			day : "2017-03-17",
			time : "00:00:00"
		};
		okResult = widgetWeek.formatDate(mockDate);
		expect(okResult).toEqual("Fri, Mar 17, 2017 12:00 AM");
	});

	/* WidgetWeek [END] */

	/* WidgetMonth [START] */

	it('widgetMonth #tmWidgetWhiteList should be BeDefined', function(){
		widgetMonth.apiUrl;
		expect(widgetMonth.apiUrl).toBe('https://app.ticketmaster.com/discovery-widgets/v2/events.json');
	});

	it('widgetMonth #tmWidgetWhiteList should be BeDefined', function(){
		widgetMonth.messageRootContainer;
		expect(widgetMonth.messageRootContainer).toBe('monthScheduler');
	});

	it('#formatDate should return result', function(){
		let noneResult = widgetMonth.formatDate('date');
		expect(noneResult).toBe('');

		let noneTimeResult = widgetMonth.formatDate({day : "2017-03-17"});
		expect(noneTimeResult).toEqual("Fri, Mar 17, 2017");

		let mockDate = {
			dateTime : "2017-03-18T00:30:00Z",
			day : "2017-03-17",
			time : "20:30:00"
		};
		let okResult = widgetMonth.formatDate(mockDate);
		expect(okResult).toEqual("Fri, Mar 17, 2017 08:30 PM");
		mockDate = {
			dateTime : "2017-03-18T00:00:00Z",
			day : "2017-03-17",
			time : "00:00:00"
		};
		okResult = widgetMonth.formatDate(mockDate);
		expect(okResult).toEqual("Fri, Mar 17, 2017 12:00 AM");
	});

	/* WidgetMonth [END] */

	/* WidgetYear [START] */
	it('widgetYear #tmWidgetWhiteList should be BeDefined', function(){
		widgetYear.apiUrl;
		expect(widgetYear.apiUrl).toBe('https://app.ticketmaster.com/discovery-widgets/v2/events.json');
	});

	it('widgetYear #tmWidgetWhiteList should be BeDefined', function(){
		widgetYear.messageRootContainer;
		expect(widgetYear.messageRootContainer).toBe('yearScheduler');
	});

	it('#formatDate should return result', function(){
		let noneResult = widgetYear.formatDate('date');
		expect(noneResult).toBe('');

		let noneTimeResult = widgetYear.formatDate({day : "2017-03-17"});
		expect(noneTimeResult).toEqual("Fri, Mar 17, 2017");

		let mockDate = {
			dateTime : "2017-03-18T00:30:00Z",
			day : "2017-03-17",
			time : "20:30:00"
		};
		let okResult = widgetYear.formatDate(mockDate);
		expect(okResult).toEqual("Fri, Mar 17, 2017 08:30 PM");
		mockDate = {
			dateTime : "2017-03-18T00:00:00Z",
			day : "2017-03-17",
			time : "00:00:00"
		};
		okResult = widgetYear.formatDate(mockDate);
		expect(okResult).toEqual("Fri, Mar 17, 2017 12:00 AM");
	});
	/* WidgetYear [END] */

});


describe("CalendarWidgetWithoutSpyOn", () => {
	let widget,
		widgetWeek,
		widgetMonth,
		widgetYear,
		tabsControls,
		module,
		hideMessageDelay;
	var setFixture = () => {
		document.body.innerHTML = '<head></head><div w-type="calendar" w-tmapikey="y61xDc5xqUSIOz4ISjgCe5E9Lh0hfUH1" w-googleapikey="AIzaSyBQrJ5ECXDaXVlICIdUBOe8impKIGHDzdA" w-postalcodeapi="90015" w-keyword="" w-colorscheme="light" w-width="350" w-height="600" w-size="25" w-border="0" w-borderradius="4" w-postalcode="" w-radius="" w-period="2017-08" w-layout="vertical" w-attractionid="" w-promoterid="" w-venueid="" w-affiliateid="" w-segmentid="" w-proportion="custom" w-titlelink="off" w-countrycode="US" w-source="" w-latlong="">';
		document.body.innerHTML += '<div class="tabs"><span class="tb active">Day</span><span class="tb">Week</span><span class="tb">Month</span><span class="tb">Year</span></div>';
		document.body.innerHTML += '<div class="tabs-container"><div class="tab active">';
		document.body.innerHTML += '<div class="sliderLeftSelector"><span class="selector-title">June 27</span><span class="selector-content" tabindex="-1"><span class="active" w-period="Tue Jun 27 2017 17:28:24 GMT+0300 (FLE Daylight Time)">June 27</span><span w-period="Wed Jun 28 2017 17:28:24 GMT+0300 (FLE Daylight Time)">June 28</span><span w-period="Thu Jun 29 2017 17:28:24 GMT+0300 (FLE Daylight Time)">June 29</span><span w-period="Fri Jun 30 2017 17:28:24 GMT+0300 (FLE Daylight Time)">June 30</span><span w-period="Sat Jul 01 2017 17:28:24 GMT+0300 (FLE Daylight Time)">July 1</span><span w-period="Sun Jul 02 2017 17:28:24 GMT+0300 (FLE Daylight Time)">July 2</span><span w-period="Mon Jul 03 2017 17:28:24 GMT+0300 (FLE Daylight Time)">July 3</span></span></div>';
		document.body.innerHTML += '<div class="sliderLeftSelector"><span class="selector-title">June 27</span><span class="selector-content" tabindex="-1"><span class="active" w-period="Tue Jun 27 2017 17:28:24 GMT+0300 (FLE Daylight Time)">June 27</span><span w-period="Wed Jun 28 2017 17:28:24 GMT+0300 (FLE Daylight Time)">June 28</span><span w-period="Thu Jun 29 2017 17:28:24 GMT+0300 (FLE Daylight Time)">June 29</span><span w-period="Fri Jun 30 2017 17:28:24 GMT+0300 (FLE Daylight Time)">June 30</span><span w-period="Sat Jul 01 2017 17:28:24 GMT+0300 (FLE Daylight Time)">July 1</span><span w-period="Sun Jul 02 2017 17:28:24 GMT+0300 (FLE Daylight Time)">July 2</span><span w-period="Mon Jul 03 2017 17:28:24 GMT+0300 (FLE Daylight Time)">July 3</span></span></div>';
		document.body.innerHTML += '<div class="sliderRightSelector"><span class="selector-title">All Events</span><span class="selector-content" tabindex="-1"><span class="active" w-classificationid="">All Events</span><span w-classificationid="KZFzniwnSyZfZ7v7na">Arts &amp; Theatre</span><span w-classificationid="KZFzniwnSyZfZ7v7nn">Film</span><span w-classificationid="KZFzniwnSyZfZ7v7n1">Miscellaneous</span><span w-classificationid="KZFzniwnSyZfZ7v7nJ">Music</span><span w-classificationid="KZFzniwnSyZfZ7v7nE">Sports</span></span></div>';
		document.body.innerHTML += '</div><div class="tab"></div><div class="tab">';
		document.body.innerHTML += '<div class="events-root-container border"><div class="spinner-container"></div><div class="weekSсheduler"><div class="event-message-container">Message</div></div></div>';
		document.body.innerHTML += '</div><div class="tab">';
		document.body.innerHTML += '<div class="monthSсheduler"><div class="spinner-container"><div class="spinner"></div></div><div class="event-message-container">Message</div><div class="calendar"></div></div>';
		document.body.innerHTML += '</div>';
		document.body.innerHTML += '<div class="event-logo centered-logo"></div><div class="event-date centered-logo"></div></div>';
	};
	beforeAll(() => {
		window.__VERSION__ = 'mockedVersion';
		setFixture();
		widget = new TicketmasterCalendarWidget();
		widget = new TicketmasterCalendarWidget(document.querySelector('div[w-type="calendar"]'));
		widgetWeek = new WeekScheduler();
		widgetMonth = new MonthScheduler();
		widgetYear = new YearScheduler();
	});


	it('widgetWeek # getCurrentMonth should be defined', () => {
		widgetWeek.getCurrentMonth();
		expect(typeof(widgetWeek.getCurrentMonth)).toBe('function');
	});


	it('widgetWeek #getWeekEventsHandler should be defined', () => {
		document.body.querySelector('.weekSсheduler').innerHTML = document.body.querySelector('.weekSсheduler').innerHTML + '<div class="event-message-container">Message</div>';
		widgetWeek.getWeekEventsHandler.bind({
			widget: {
				weekSchedulerRoot: document.body.querySelector('.weekSсheduler'),
				eventsRootContainer: {
					parentNode: {
						parentNode: {
							parentNode: document.body.querySelector('.events-root-container')
						}
					}
				},
				formatDate: function() {return true},
				weekdaysRootContainer: {
					innerHTML: function() {return true},
					querySelectorAll: function() {return true},
				},
				addScroll: function() {return true},
				eventReqAttrs: {
					page: 1
				},
				getJsonAsync: function() {return true},
				showMessage: function() {return true},
				hideMessageWithDelay: function() {return true},
			},
			readyState: XMLHttpRequest.DONE,
			status: 200,
			responseText: '{"_embedded":{"events":[{"name":"High-Vibe Music Feat. Ray Davis & the Regenerates","type":"event","id":"1718v3G65b9L6d-","test":false,"url":"http://www.ticketweb.com/t3/sale/SaleEventDetail?dispatch=loadSelectionData&eventId=7458695&REFERRAL_ID=tmfeed","locale":"en-us","images":[{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_RECOMENDATION_16_9.jpg","width":100,"height":56,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_ARTIST_PAGE_3_2.jpg","width":305,"height":203,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_TABLET_LANDSCAPE_LARGE_16_9.jpg","width":2048,"height":1152,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_EVENT_DETAIL_PAGE_16_9.jpg","width":205,"height":115,"fallback":true},{"ratio":"4_3","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_CUSTOM.jpg","width":305,"height":225,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_RETINA_PORTRAIT_16_9.jpg","width":640,"height":360,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_TABLET_LANDSCAPE_3_2.jpg","width":1024,"height":683,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_RETINA_PORTRAIT_3_2.jpg","width":640,"height":427,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_RETINA_LANDSCAPE_16_9.jpg","width":1136,"height":639,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_TABLET_LANDSCAPE_16_9.jpg","width":1024,"height":576,"fallback":true}],"sales":{"public":{"startDateTime":"2017-05-23T01:30:01Z","startTBD":false,"endDateTime":"2017-05-23T01:33:00Z"}},"dates":{"start":{"localDate":"2017-07-03","localTime":"21:00:00","dateTime":"2017-07-04T04:00:00Z","dateTBD":false,"dateTBA":false,"timeTBA":false,"noSpecificTime":false},"timezone":"America/Los_Angeles","status":{"code":"offsale"},"spanMultipleDays":false},"classifications":[{"primary":true,"segment":{"id":"KZFzniwnSyZfZ7v7nJ","name":"Music"},"genre":{"id":"KnvZfZ7vAvl","name":"Other"},"subGenre":{"id":"KZazBEonSMnZfZ7vk1I","name":"Other"},"type":{"id":"KZAyXgnZfZ7v7nI","name":"Undefined"},"subType":{"id":"KZFzBErXgnZfZ7v7lJ","name":"Undefined"}}],"_links":{"self":{"href":"/discovery/v2/events/1718v3G65b9L6d-?locale=en-us"},"venues":[{"href":"/discovery/v2/venues/KovZpZAFJ71A?locale=en-us"}]},"_embedded":{"venues":[{"name":"Molly Malones","type":"venue","id":"KovZpZAFJ71A","test":false,"url":"http://www.ticketmaster.com/venue/337840","locale":"en-us","postalCode":"90036","timezone":"America/Los_Angeles","city":{"name":"Los Angeles"},"state":{"name":"California","stateCode":"CA"},"country":{"name":"United States Of America","countryCode":"US"},"address":{"line1":"575 South Fairfax Avenue"},"location":{"longitude":"-118.3615566","latitude":"34.0652923"},"markets":[{"id":"27"}],"dmas":[{"id":223},{"id":324},{"id":354},{"id":383}],"upcomingEvents":{"_total":67,"ticketmaster":67},"_links":{"self":{"href":"/discovery/v2/venues/KovZpZAFJ71A?locale=en-us"}}}]}},{"name":"Los Angeles Coliseum Historic Tours","type":"event","id":"vvG1IZflWvlK1Y","test":false,"url":"http://www.ticketmaster.com/event/0A0052BF41AD32B0","locale":"en-us","images":[{"ratio":"16_9","url":"https://s1.ticketm.net/dbimages/204958a.jpg","width":205,"height":115,"fallback":false},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_RETINA_PORTRAIT_16_9.jpg","width":640,"height":360,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_ARTIST_PAGE_3_2.jpg","width":305,"height":203,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_RECOMENDATION_16_9.jpg","width":100,"height":56,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_TABLET_LANDSCAPE_3_2.jpg","width":1024,"height":683,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_RETINA_LANDSCAPE_16_9.jpg","width":1136,"height":639,"fallback":true},{"ratio":"4_3","url":"https://s1.ticketm.net/dbimages/204957a.jpg","width":305,"height":225,"fallback":false},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_TABLET_LANDSCAPE_16_9.jpg","width":1024,"height":576,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_RETINA_PORTRAIT_3_2.jpg","width":640,"height":427,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_TABLET_LANDSCAPE_LARGE_16_9.jpg","width":2048,"height":1152,"fallback":true}],"sales":{"public":{"startTBD":false}},"dates":{"start":{"localDate":"2017-07-05","dateTBD":false,"dateTBA":false,"timeTBA":false,"noSpecificTime":true},"timezone":"America/Los_Angeles","status":{"code":"offsale"},"spanMultipleDays":false},"classifications":[{"primary":true,"segment":{"id":"KZFzniwnSyZfZ7v7n1","name":"Miscellaneous"},"genre":{"id":"KnvZfZ7v7ll","name":"Undefined"},"subGenre":{"id":"KZazBEonSMnZfZ7vAv1","name":"Undefined"},"type":{"id":"KZAyXgnZfZ7v7lt","name":"Event Style"},"subType":{"id":"KZFzBErXgnZfZ7vAvv","name":"Sightseeing/Facility"}}],"promoter":{"id":"494","name":"PROMOTED BY VENUE","description":"PROMOTED BY VENUE / NTL / USA"},"promoters":[{"id":"494","name":"PROMOTED BY VENUE","description":"PROMOTED BY VENUE / NTL / USA"}],"info":"Come take a tour of the GREATEST STADIUM IN THE WORLD with a history, legacy and connection like no other! The Los Angeles Memorial Coliseum complex is one of the most venerable sports monuments in America today with countless historic events & milestones taking place inside its walls during nine decades of celebrated history. The Coliseum has served as home field for the USC Football team since 1923 and is the only stadium that has played host to two Olympiads (X and XXIII), two Super Bowls (I and VII) and a World Series (1959). It was declared a National Historic Landmark on July 27, 1984. The Coliseum has also hosted Evil Knievel in 1973, a Papal Mass by Pope John Paul II in 1987, Nelson Mandelas Crusade against Apartheid in 1990 & countless sold out concerts including U2, Pink Floyd, The Who, Metallica, Bruce Springsteen & the Rolling Stones. The MLBs Los Angeles Dodgers as well as the NFLs St. Louis Rams and Oakland Raiders have also called the Coliseum home.","pleaseNote":"Public Tours are available Wednesday-Sunday, 10-4pm, with Private Tours available 7 days a week. To schedule a Private or Group Tour, please email colitour@usc.edu. Tickets can be purchased on Ticketmaster or at the Coliseum Box Office located at Gate 29. All Tours depart and conclude at Gate 29. The Self-Guided Tour is limited to the Peristyle and Court of Honor with a full view of the playing field. Self-Guided Tours DO NOT include entrance into the stadium seating area. There is no time limit on this tour. The Guided Tour includes the USC Recruit Lounge, Coliseum Boardroom, Press Box, Locker Rooms and Players Tunnel and lasts 90-100 minutes. All destinations on the tour are subject to availability. NO field access is allowed at any time. RAIN OUTS do apply and your ticket can be redeemed for a different tour date within 30 days of your originally scheduled tour. Kids 5 years & under are FREE!","priceRanges":[{"type":"standard","currency":"USD","min":5.0,"max":25.0}],"accessibility":{"info":"Accessible Ticket Buyers Should Purchase Regular Ticket"},"_links":{"self":{"href":"/discovery/v2/events/vvG1IZflWvlK1Y?locale=en-us"},"attractions":[{"href":"/discovery/v2/attractions/K8vZ917K5O7?locale=en-us"}],"venues":[{"href":"/discovery/v2/venues/KovZpZAIF7aA?locale=en-us"}]},"_embedded":{"venues":[{"name":"Los Angeles Memorial Coliseum","type":"venue","id":"KovZpZAIF7aA","test":false,"url":"http://www.ticketmaster.com/venue/82780","locale":"en-us","images":[{"ratio":"3_1","url":"https://s1.ticketm.net/dam/v/4ee/6acdb953-07f5-4841-9773-869123bd84ee_438371_SOURCE.jpg","width":1500,"height":500,"fallback":false,"attribution":"KovZpZAIF7aA"}],"postalCode":"90037","timezone":"America/Los_Angeles","city":{"name":"Los Angeles"},"state":{"name":"California","stateCode":"CA"},"country":{"name":"United States Of America","countryCode":"US"},"address":{"line1":"3911 S. Figueroa St"},"location":{"longitude":"-118.287865","latitude":"34.014053"},"markets":[{"id":"27"}],"dmas":[{"id":223},{"id":324},{"id":354},{"id":383}],"upcomingEvents":{"_total":38,"tmr":8,"ticketmaster":30},"_links":{"self":{"href":"/discovery/v2/venues/KovZpZAIF7aA?locale=en-us"}}}],"attractions":[{"name":"Los Angeles Coliseum Historic Tours","type":"attraction","id":"K8vZ917K5O7","test":false,"url":"http://www.ticketmaster.com/artist/2086550","locale":"en-us","images":[{"ratio":"16_9","url":"https://s1.ticketm.net/dbimages/204958a.jpg","width":205,"height":115,"fallback":false},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_RETINA_PORTRAIT_16_9.jpg","width":640,"height":360,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_ARTIST_PAGE_3_2.jpg","width":305,"height":203,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_RECOMENDATION_16_9.jpg","width":100,"height":56,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_TABLET_LANDSCAPE_3_2.jpg","width":1024,"height":683,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_RETINA_LANDSCAPE_16_9.jpg","width":1136,"height":639,"fallback":true},{"ratio":"4_3","url":"https://s1.ticketm.net/dbimages/204957a.jpg","width":305,"height":225,"fallback":false},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_TABLET_LANDSCAPE_16_9.jpg","width":1024,"height":576,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_RETINA_PORTRAIT_3_2.jpg","width":640,"height":427,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_TABLET_LANDSCAPE_LARGE_16_9.jpg","width":2048,"height":1152,"fallback":true}],"classifications":[{"primary":true,"segment":{"id":"KZFzniwnSyZfZ7v7n1","name":"Miscellaneous"},"genre":{"id":"KnvZfZ7v7ll","name":"Undefined"},"subGenre":{"id":"KZazBEonSMnZfZ7vAv1","name":"Undefined"},"type":{"id":"KZAyXgnZfZ7v7lt","name":"Event Style"},"subType":{"id":"KZFzBErXgnZfZ7vAvv","name":"Sightseeing/Facility"}}],"upcomingEvents":{"_total":16,"ticketmaster":16},"_links":{"self":{"href":"/discovery/v2/attractions/K8vZ917K5O7?locale=en-us"}}}]}},{"name":"Arizona Diamondbacks at Los Angeles Dodgers","type":"event","id":"Z7r9jZ1AvJF7x","test":false,"url":"http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=1988122","locale":"en-us","images":[{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_LANDSCAPE_16_9.jpg","width":1136,"height":639,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_3_2.jpg","width":1024,"height":683,"fallback":true},{"ratio":"4_3","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_CUSTOM.jpg","width":305,"height":225,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_16_9.jpg","width":1024,"height":576,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_LARGE_16_9.jpg","width":2048,"height":1152,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_EVENT_DETAIL_PAGE_16_9.jpg","width":205,"height":115,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_PORTRAIT_3_2.jpg","width":640,"height":427,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_PORTRAIT_16_9.jpg","width":640,"height":360,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_ARTIST_PAGE_3_2.jpg","width":305,"height":203,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RECOMENDATION_16_9.jpg","width":100,"height":56,"fallback":true}],"sales":{"public":{"startDateTime":"1900-01-01T18:00:00Z","startTBD":false,"endDateTime":"2017-07-06T02:10:00Z"}},"dates":{"start":{"localDate":"2017-07-05","localTime":"19:10:00","dateTime":"2017-07-06T02:10:00Z","dateTBD":false,"dateTBA":false,"timeTBA":false,"noSpecificTime":false},"status":{"code":"onsale"},"spanMultipleDays":false},"classifications":[{"primary":true,"segment":{"id":"KZFzniwnSyZfZ7v7nE","name":"Sports"}}],"seatmap":{"staticUrl":"http://resale.ticketmaster.com.au/akamai-content/graphics/TMResale/2/VenueMaps/475-42275-0-0-Dodgerstadium_Theclassicwest.png"},"_links":{"self":{"href":"/discovery/v2/events/Z7r9jZ1AvJF7x?locale=en-us"},"attractions":[{"href":"/discovery/v2/attractions/Z6r9jZAaee?locale=en-us"},{"href":"/discovery/v2/attractions/Zkr9jZAeeq?locale=en-us"}],"venues":[{"href":"/discovery/v2/venues/Z6r9jZAFke?locale=en-us"}]},"_embedded":{"venues":[{"name":"Dodger Stadium","type":"venue","id":"Z6r9jZAFke","test":false,"locale":"en-us","postalCode":"90012","timezone":"America/Los_Angeles","city":{"name":"Los Angeles"},"state":{"name":"California","stateCode":"CA"},"country":{"name":"United States Of America","countryCode":"US"},"address":{"line1":"1000 Elysian Park Ave."},"location":{"longitude":"-118.2388","latitude":"34.0658"},"upcomingEvents":{"_total":40,"tmr":37,"ticketmaster":3},"_links":{"self":{"href":"/discovery/v2/venues/Z6r9jZAFke?locale=en-us"}}}],"attractions":[{"name":"Los Angeles Dodgers","type":"attraction","id":"Z6r9jZAaee","test":false,"locale":"en-us","images":[{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_LANDSCAPE_16_9.jpg","width":1136,"height":639,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_3_2.jpg","width":1024,"height":683,"fallback":true},{"ratio":"4_3","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_CUSTOM.jpg","width":305,"height":225,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_16_9.jpg","width":1024,"height":576,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_LARGE_16_9.jpg","width":2048,"height":1152,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_EVENT_DETAIL_PAGE_16_9.jpg","width":205,"height":115,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_PORTRAIT_3_2.jpg","width":640,"height":427,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_PORTRAIT_16_9.jpg","width":640,"height":360,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_ARTIST_PAGE_3_2.jpg","width":305,"height":203,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RECOMENDATION_16_9.jpg","width":100,"height":56,"fallback":true}],"classifications":[{"primary":true,"segment":{"id":"KZFzniwnSyZfZ7v7nE","name":"Sports"}}],"upcomingEvents":{"_total":96,"tmr":80,"ticketmaster":16},"_links":{"self":{"href":"/discovery/v2/attractions/Z6r9jZAaee?locale=en-us"}}},{"name":"Arizona Diamondbacks","type":"attraction","id":"Zkr9jZAeeq","test":false,"locale":"en-us","images":[{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_LANDSCAPE_16_9.jpg","width":1136,"height":639,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_3_2.jpg","width":1024,"height":683,"fallback":true},{"ratio":"4_3","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_CUSTOM.jpg","width":305,"height":225,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_16_9.jpg","width":1024,"height":576,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_LARGE_16_9.jpg","width":2048,"height":1152,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_EVENT_DETAIL_PAGE_16_9.jpg","width":205,"height":115,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_PORTRAIT_3_2.jpg","width":640,"height":427,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_PORTRAIT_16_9.jpg","width":640,"height":360,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_ARTIST_PAGE_3_2.jpg","width":305,"height":203,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RECOMENDATION_16_9.jpg","width":100,"height":56,"fallback":true}],"classifications":[{"primary":true,"segment":{"id":"KZFzniwnSyZfZ7v7nE","name":"Sports"}}],"upcomingEvents":{"_total":150,"tmr":81,"ticketmaster":69},"_links":{"self":{"href":"/discovery/v2/attractions/Zkr9jZAeeq?locale=en-us"}}}]}}]},"_links":{"first":{"href":"/discovery/v2/events.json?startDateTime=2017-07-02T00%3A00%3A00Z&city=Los+Angeles&countryCode=US&radius=25&endDateTime=2017-07-09T23%3A59%3A59Z&page=0&size=3&sort=date,asc"},"self":{"href":"/discovery/v2/events.json?startDateTime=2017-07-02T00%3A00%3A00Z&size=3&city=Los+Angeles&countryCode=US&sort=date%2Casc&radius=25&endDateTime=2017-07-09T23%3A59%3A59Z"},"next":{"href":"/discovery/v2/events.json?startDateTime=2017-07-02T00%3A00%3A00Z&city=Los+Angeles&countryCode=US&radius=25&endDateTime=2017-07-09T23%3A59%3A59Z&page=1&size=3&sort=date,asc"},"last":{"href":"/discovery/v2/events.json?startDateTime=2017-07-02T00%3A00%3A00Z&city=Los+Angeles&countryCode=US&radius=25&endDateTime=2017-07-09T23%3A59%3A59Z&page=18&size=3&sort=date,asc"}},"page":{"size":3,"totalElements":55,"totalPages":1,"number":0}}',
		})();
		widgetWeek.getWeekEventsHandler.bind({
			widget: {
				weekSchedulerRoot: document.body.querySelector('.weekSсheduler'),
				eventsRootContainer: {
					parentNode: {
						parentNode: {
							parentNode: document.body.querySelector('.events-root-container')
						}
					}
				},
				formatDate: function() {return true},
				weekdaysRootContainer: {
					innerHTML: function() {return true},
					querySelectorAll: function() {return true},
				},
				addScroll: function() {return true},
				eventReqAttrs: {
					page: 1
				},
				getJsonAsync: function() {return true},
				showMessage: function() {return true},
				hideMessageWithDelay: function() {return true},
			},
			readyState: XMLHttpRequest.DONE,
			status: 200,
			responseText: '{"_embedded":{"events":[{"name":"High-Vibe Music Feat. Ray Davis & the Regenerates","type":"event","id":"1718v3G65b9L6d-","test":false,"url":"http://www.ticketweb.com/t3/sale/SaleEventDetail?dispatch=loadSelectionData&eventId=7458695&REFERRAL_ID=tmfeed","locale":"en-us","images":[{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_RECOMENDATION_16_9.jpg","width":100,"height":56,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_ARTIST_PAGE_3_2.jpg","width":305,"height":203,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_TABLET_LANDSCAPE_LARGE_16_9.jpg","width":2048,"height":1152,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_EVENT_DETAIL_PAGE_16_9.jpg","width":205,"height":115,"fallback":true},{"ratio":"4_3","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_CUSTOM.jpg","width":305,"height":225,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_RETINA_PORTRAIT_16_9.jpg","width":640,"height":360,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_TABLET_LANDSCAPE_3_2.jpg","width":1024,"height":683,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_RETINA_PORTRAIT_3_2.jpg","width":640,"height":427,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_RETINA_LANDSCAPE_16_9.jpg","width":1136,"height":639,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_TABLET_LANDSCAPE_16_9.jpg","width":1024,"height":576,"fallback":true}],"sales":{"public":{"startDateTime":"2017-05-23T01:30:01Z","startTBD":false,"endDateTime":"2017-05-23T01:33:00Z"}},"dates":{"start":{"localDate":"2017-07-03","localTime":"21:00:00","dateTime":"2017-07-04T04:00:00Z","dateTBD":false,"dateTBA":false,"timeTBA":false,"noSpecificTime":false},"timezone":"America/Los_Angeles","status":{"code":"offsale"},"spanMultipleDays":false},"classifications":[{"primary":true,"segment":{"id":"KZFzniwnSyZfZ7v7nJ","name":"Music"},"genre":{"id":"KnvZfZ7vAvl","name":"Other"},"subGenre":{"id":"KZazBEonSMnZfZ7vk1I","name":"Other"},"type":{"id":"KZAyXgnZfZ7v7nI","name":"Undefined"},"subType":{"id":"KZFzBErXgnZfZ7v7lJ","name":"Undefined"}}],"_links":{"self":{"href":"/discovery/v2/events/1718v3G65b9L6d-?locale=en-us"},"venues":[{"href":"/discovery/v2/venues/KovZpZAFJ71A?locale=en-us"}]},"_embedded":{"venues":[{"name":"Molly Malones","type":"venue","id":"KovZpZAFJ71A","test":false,"url":"http://www.ticketmaster.com/venue/337840","locale":"en-us","postalCode":"90036","timezone":"America/Los_Angeles","city":{"name":"Los Angeles"},"state":{"name":"California","stateCode":"CA"},"country":{"name":"United States Of America","countryCode":"US"},"address":{"line1":"575 South Fairfax Avenue"},"location":{"longitude":"-118.3615566","latitude":"34.0652923"},"markets":[{"id":"27"}],"dmas":[{"id":223},{"id":324},{"id":354},{"id":383}],"upcomingEvents":{"_total":67,"ticketmaster":67},"_links":{"self":{"href":"/discovery/v2/venues/KovZpZAFJ71A?locale=en-us"}}}]}},{"name":"Los Angeles Coliseum Historic Tours","type":"event","id":"vvG1IZflWvlK1Y","test":false,"url":"http://www.ticketmaster.com/event/0A0052BF41AD32B0","locale":"en-us","images":[{"ratio":"16_9","url":"https://s1.ticketm.net/dbimages/204958a.jpg","width":205,"height":115,"fallback":false},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_RETINA_PORTRAIT_16_9.jpg","width":640,"height":360,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_ARTIST_PAGE_3_2.jpg","width":305,"height":203,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_RECOMENDATION_16_9.jpg","width":100,"height":56,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_TABLET_LANDSCAPE_3_2.jpg","width":1024,"height":683,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_RETINA_LANDSCAPE_16_9.jpg","width":1136,"height":639,"fallback":true},{"ratio":"4_3","url":"https://s1.ticketm.net/dbimages/204957a.jpg","width":305,"height":225,"fallback":false},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_TABLET_LANDSCAPE_16_9.jpg","width":1024,"height":576,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_RETINA_PORTRAIT_3_2.jpg","width":640,"height":427,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_TABLET_LANDSCAPE_LARGE_16_9.jpg","width":2048,"height":1152,"fallback":true}],"sales":{"public":{"startTBD":false}},"dates":{"start":{"localDate":"2017-07-05","dateTBD":false,"dateTBA":false,"timeTBA":false,"noSpecificTime":true},"timezone":"America/Los_Angeles","status":{"code":"offsale"},"spanMultipleDays":false},"classifications":[{"primary":true,"segment":{"id":"KZFzniwnSyZfZ7v7n1","name":"Miscellaneous"},"genre":{"id":"KnvZfZ7v7ll","name":"Undefined"},"subGenre":{"id":"KZazBEonSMnZfZ7vAv1","name":"Undefined"},"type":{"id":"KZAyXgnZfZ7v7lt","name":"Event Style"},"subType":{"id":"KZFzBErXgnZfZ7vAvv","name":"Sightseeing/Facility"}}],"promoter":{"id":"494","name":"PROMOTED BY VENUE","description":"PROMOTED BY VENUE / NTL / USA"},"promoters":[{"id":"494","name":"PROMOTED BY VENUE","description":"PROMOTED BY VENUE / NTL / USA"}],"info":"Come take a tour of the GREATEST STADIUM IN THE WORLD with a history, legacy and connection like no other! The Los Angeles Memorial Coliseum complex is one of the most venerable sports monuments in America today with countless historic events & milestones taking place inside its walls during nine decades of celebrated history. The Coliseum has served as home field for the USC Football team since 1923 and is the only stadium that has played host to two Olympiads (X and XXIII), two Super Bowls (I and VII) and a World Series (1959). It was declared a National Historic Landmark on July 27, 1984. The Coliseum has also hosted Evil Knievel in 1973, a Papal Mass by Pope John Paul II in 1987, Nelson Mandelas Crusade against Apartheid in 1990 & countless sold out concerts including U2, Pink Floyd, The Who, Metallica, Bruce Springsteen & the Rolling Stones. The MLBs Los Angeles Dodgers as well as the NFLs St. Louis Rams and Oakland Raiders have also called the Coliseum home.","pleaseNote":"Public Tours are available Wednesday-Sunday, 10-4pm, with Private Tours available 7 days a week. To schedule a Private or Group Tour, please email colitour@usc.edu. Tickets can be purchased on Ticketmaster or at the Coliseum Box Office located at Gate 29. All Tours depart and conclude at Gate 29. The Self-Guided Tour is limited to the Peristyle and Court of Honor with a full view of the playing field. Self-Guided Tours DO NOT include entrance into the stadium seating area. There is no time limit on this tour. The Guided Tour includes the USC Recruit Lounge, Coliseum Boardroom, Press Box, Locker Rooms and Players Tunnel and lasts 90-100 minutes. All destinations on the tour are subject to availability. NO field access is allowed at any time. RAIN OUTS do apply and your ticket can be redeemed for a different tour date within 30 days of your originally scheduled tour. Kids 5 years & under are FREE!","priceRanges":[{"type":"standard","currency":"USD","min":5.0,"max":25.0}],"accessibility":{"info":"Accessible Ticket Buyers Should Purchase Regular Ticket"},"_links":{"self":{"href":"/discovery/v2/events/vvG1IZflWvlK1Y?locale=en-us"},"attractions":[{"href":"/discovery/v2/attractions/K8vZ917K5O7?locale=en-us"}],"venues":[{"href":"/discovery/v2/venues/KovZpZAIF7aA?locale=en-us"}]},"_embedded":{"venues":[{"name":"Los Angeles Memorial Coliseum","type":"venue","id":"KovZpZAIF7aA","test":false,"url":"http://www.ticketmaster.com/venue/82780","locale":"en-us","images":[{"ratio":"3_1","url":"https://s1.ticketm.net/dam/v/4ee/6acdb953-07f5-4841-9773-869123bd84ee_438371_SOURCE.jpg","width":1500,"height":500,"fallback":false,"attribution":"KovZpZAIF7aA"}],"postalCode":"90037","timezone":"America/Los_Angeles","city":{"name":"Los Angeles"},"state":{"name":"California","stateCode":"CA"},"country":{"name":"United States Of America","countryCode":"US"},"address":{"line1":"3911 S. Figueroa St"},"location":{"longitude":"-118.287865","latitude":"34.014053"},"markets":[{"id":"27"}],"dmas":[{"id":223},{"id":324},{"id":354},{"id":383}],"upcomingEvents":{"_total":38,"tmr":8,"ticketmaster":30},"_links":{"self":{"href":"/discovery/v2/venues/KovZpZAIF7aA?locale=en-us"}}}],"attractions":[{"name":"Los Angeles Coliseum Historic Tours","type":"attraction","id":"K8vZ917K5O7","test":false,"url":"http://www.ticketmaster.com/artist/2086550","locale":"en-us","images":[{"ratio":"16_9","url":"https://s1.ticketm.net/dbimages/204958a.jpg","width":205,"height":115,"fallback":false},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_RETINA_PORTRAIT_16_9.jpg","width":640,"height":360,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_ARTIST_PAGE_3_2.jpg","width":305,"height":203,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_RECOMENDATION_16_9.jpg","width":100,"height":56,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_TABLET_LANDSCAPE_3_2.jpg","width":1024,"height":683,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_RETINA_LANDSCAPE_16_9.jpg","width":1136,"height":639,"fallback":true},{"ratio":"4_3","url":"https://s1.ticketm.net/dbimages/204957a.jpg","width":305,"height":225,"fallback":false},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_TABLET_LANDSCAPE_16_9.jpg","width":1024,"height":576,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_RETINA_PORTRAIT_3_2.jpg","width":640,"height":427,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_TABLET_LANDSCAPE_LARGE_16_9.jpg","width":2048,"height":1152,"fallback":true}],"classifications":[{"primary":true,"segment":{"id":"KZFzniwnSyZfZ7v7n1","name":"Miscellaneous"},"genre":{"id":"KnvZfZ7v7ll","name":"Undefined"},"subGenre":{"id":"KZazBEonSMnZfZ7vAv1","name":"Undefined"},"type":{"id":"KZAyXgnZfZ7v7lt","name":"Event Style"},"subType":{"id":"KZFzBErXgnZfZ7vAvv","name":"Sightseeing/Facility"}}],"upcomingEvents":{"_total":16,"ticketmaster":16},"_links":{"self":{"href":"/discovery/v2/attractions/K8vZ917K5O7?locale=en-us"}}}]}},{"name":"Arizona Diamondbacks at Los Angeles Dodgers","type":"event","id":"Z7r9jZ1AvJF7x","test":false,"url":"http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=1988122","locale":"en-us","images":[{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_LANDSCAPE_16_9.jpg","width":1136,"height":639,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_3_2.jpg","width":1024,"height":683,"fallback":true},{"ratio":"4_3","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_CUSTOM.jpg","width":305,"height":225,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_16_9.jpg","width":1024,"height":576,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_LARGE_16_9.jpg","width":2048,"height":1152,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_EVENT_DETAIL_PAGE_16_9.jpg","width":205,"height":115,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_PORTRAIT_3_2.jpg","width":640,"height":427,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_PORTRAIT_16_9.jpg","width":640,"height":360,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_ARTIST_PAGE_3_2.jpg","width":305,"height":203,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RECOMENDATION_16_9.jpg","width":100,"height":56,"fallback":true}],"sales":{"public":{"startDateTime":"1900-01-01T18:00:00Z","startTBD":false,"endDateTime":"2017-07-06T02:10:00Z"}},"dates":{"start":{"localDate":"2017-07-05","localTime":"19:10:00","dateTime":"2017-07-06T02:10:00Z","dateTBD":false,"dateTBA":false,"timeTBA":false,"noSpecificTime":false},"status":{"code":"onsale"},"spanMultipleDays":false},"classifications":[{"primary":true,"segment":{"id":"KZFzniwnSyZfZ7v7nE","name":"Sports"}}],"seatmap":{"staticUrl":"http://resale.ticketmaster.com.au/akamai-content/graphics/TMResale/2/VenueMaps/475-42275-0-0-Dodgerstadium_Theclassicwest.png"},"_links":{"self":{"href":"/discovery/v2/events/Z7r9jZ1AvJF7x?locale=en-us"},"attractions":[{"href":"/discovery/v2/attractions/Z6r9jZAaee?locale=en-us"},{"href":"/discovery/v2/attractions/Zkr9jZAeeq?locale=en-us"}],"venues":[{"href":"/discovery/v2/venues/Z6r9jZAFke?locale=en-us"}]},"_embedded":{"venues":[{"name":"Dodger Stadium","type":"venue","id":"Z6r9jZAFke","test":false,"locale":"en-us","postalCode":"90012","timezone":"America/Los_Angeles","city":{"name":"Los Angeles"},"state":{"name":"California","stateCode":"CA"},"country":{"name":"United States Of America","countryCode":"US"},"address":{"line1":"1000 Elysian Park Ave."},"location":{"longitude":"-118.2388","latitude":"34.0658"},"upcomingEvents":{"_total":40,"tmr":37,"ticketmaster":3},"_links":{"self":{"href":"/discovery/v2/venues/Z6r9jZAFke?locale=en-us"}}}],"attractions":[{"name":"Los Angeles Dodgers","type":"attraction","id":"Z6r9jZAaee","test":false,"locale":"en-us","images":[{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_LANDSCAPE_16_9.jpg","width":1136,"height":639,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_3_2.jpg","width":1024,"height":683,"fallback":true},{"ratio":"4_3","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_CUSTOM.jpg","width":305,"height":225,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_16_9.jpg","width":1024,"height":576,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_LARGE_16_9.jpg","width":2048,"height":1152,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_EVENT_DETAIL_PAGE_16_9.jpg","width":205,"height":115,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_PORTRAIT_3_2.jpg","width":640,"height":427,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_PORTRAIT_16_9.jpg","width":640,"height":360,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_ARTIST_PAGE_3_2.jpg","width":305,"height":203,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RECOMENDATION_16_9.jpg","width":100,"height":56,"fallback":true}],"classifications":[{"primary":true,"segment":{"id":"KZFzniwnSyZfZ7v7nE","name":"Sports"}}],"upcomingEvents":{"_total":96,"tmr":80,"ticketmaster":16},"_links":{"self":{"href":"/discovery/v2/attractions/Z6r9jZAaee?locale=en-us"}}},{"name":"Arizona Diamondbacks","type":"attraction","id":"Zkr9jZAeeq","test":false,"locale":"en-us","images":[{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_LANDSCAPE_16_9.jpg","width":1136,"height":639,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_3_2.jpg","width":1024,"height":683,"fallback":true},{"ratio":"4_3","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_CUSTOM.jpg","width":305,"height":225,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_16_9.jpg","width":1024,"height":576,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_LARGE_16_9.jpg","width":2048,"height":1152,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_EVENT_DETAIL_PAGE_16_9.jpg","width":205,"height":115,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_PORTRAIT_3_2.jpg","width":640,"height":427,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_PORTRAIT_16_9.jpg","width":640,"height":360,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_ARTIST_PAGE_3_2.jpg","width":305,"height":203,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RECOMENDATION_16_9.jpg","width":100,"height":56,"fallback":true}],"classifications":[{"primary":true,"segment":{"id":"KZFzniwnSyZfZ7v7nE","name":"Sports"}}],"upcomingEvents":{"_total":150,"tmr":81,"ticketmaster":69},"_links":{"self":{"href":"/discovery/v2/attractions/Zkr9jZAeeq?locale=en-us"}}}]}}]},"_links":{"first":{"href":"/discovery/v2/events.json?startDateTime=2017-07-02T00%3A00%3A00Z&city=Los+Angeles&countryCode=US&radius=25&endDateTime=2017-07-09T23%3A59%3A59Z&page=0&size=3&sort=date,asc"},"self":{"href":"/discovery/v2/events.json?startDateTime=2017-07-02T00%3A00%3A00Z&size=3&city=Los+Angeles&countryCode=US&sort=date%2Casc&radius=25&endDateTime=2017-07-09T23%3A59%3A59Z"},"next":{"href":"/discovery/v2/events.json?startDateTime=2017-07-02T00%3A00%3A00Z&city=Los+Angeles&countryCode=US&radius=25&endDateTime=2017-07-09T23%3A59%3A59Z&page=1&size=3&sort=date,asc"},"last":{"href":"/discovery/v2/events.json?startDateTime=2017-07-02T00%3A00%3A00Z&city=Los+Angeles&countryCode=US&radius=25&endDateTime=2017-07-09T23%3A59%3A59Z&page=18&size=3&sort=date,asc"}},"page":{"size":3,"totalElements":55,"totalPages":19,"number":0}}',
		})();
		widgetWeek.getWeekEventsHandler.bind({
			widget: {
				weekSchedulerRoot: document.body.querySelector('.weekSсheduler'),
				eventsRootContainer: {
					parentNode: {
						parentNode: {
							parentNode: document.body.querySelector('.events-root-container')
						}
					}
				},
				formatDate: function() {return true},
				weekdaysRootContainer: {
					innerHTML: function() {return true},
					querySelectorAll: function() {return true},
				},
				addScroll: function() {return true},
				eventReqAttrs: {
					page: 1
				},
				getJsonAsync: function() {return true},
				showMessage: function() {return true},
				hideMessageWithDelay: function() {return true},
			},
			readyState: XMLHttpRequest.DONE,
			status: 200,
			responseText: '{"_embedded":{"events":[{"name":"High-Vibe Music Feat. Ray Davis & the Regenerates","type":"event","id":"1718v3G65b9L6d-","test":false,"url":"http://www.ticketweb.com/t3/sale/SaleEventDetail?dispatch=loadSelectionData&eventId=7458695&REFERRAL_ID=tmfeed","locale":"en-us","images":[{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_RECOMENDATION_16_9.jpg","width":100,"height":56,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_ARTIST_PAGE_3_2.jpg","width":305,"height":203,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_TABLET_LANDSCAPE_LARGE_16_9.jpg","width":2048,"height":1152,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_EVENT_DETAIL_PAGE_16_9.jpg","width":205,"height":115,"fallback":true},{"ratio":"4_3","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_CUSTOM.jpg","width":305,"height":225,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_RETINA_PORTRAIT_16_9.jpg","width":640,"height":360,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_TABLET_LANDSCAPE_3_2.jpg","width":1024,"height":683,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_RETINA_PORTRAIT_3_2.jpg","width":640,"height":427,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_RETINA_LANDSCAPE_16_9.jpg","width":1136,"height":639,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_TABLET_LANDSCAPE_16_9.jpg","width":1024,"height":576,"fallback":true}],"sales":{"public":{"startDateTime":"2017-05-23T01:30:01Z","startTBD":false,"endDateTime":"2017-05-23T01:33:00Z"}},"dates":{"start":{"localDate":"2017-07-03","localTime":"21:00:00","dateTime":"2017-07-04T04:00:00Z","dateTBD":false,"dateTBA":false,"timeTBA":false,"noSpecificTime":false},"timezone":"America/Los_Angeles","status":{"code":"offsale"},"spanMultipleDays":false},"classifications":[{"primary":true,"segment":{"id":"KZFzniwnSyZfZ7v7nJ","name":"Music"},"genre":{"id":"KnvZfZ7vAvl","name":"Other"},"subGenre":{"id":"KZazBEonSMnZfZ7vk1I","name":"Other"},"type":{"id":"KZAyXgnZfZ7v7nI","name":"Undefined"},"subType":{"id":"KZFzBErXgnZfZ7v7lJ","name":"Undefined"}}],"_links":{"self":{"href":"/discovery/v2/events/1718v3G65b9L6d-?locale=en-us"},"venues":[{"href":"/discovery/v2/venues/KovZpZAFJ71A?locale=en-us"}]},"_embedded":{"venues":[{"name":"Molly Malones","type":"venue","id":"KovZpZAFJ71A","test":false,"url":"http://www.ticketmaster.com/venue/337840","locale":"en-us","postalCode":"90036","timezone":"America/Los_Angeles","city":{"name":"Los Angeles"},"state":{"name":"California","stateCode":"CA"},"country":{"name":"United States Of America","countryCode":"US"},"address":{"line1":"575 South Fairfax Avenue"},"location":{"longitude":"-118.3615566","latitude":"34.0652923"},"markets":[{"id":"27"}],"dmas":[{"id":223},{"id":324},{"id":354},{"id":383}],"upcomingEvents":{"_total":67,"ticketmaster":67},"_links":{"self":{"href":"/discovery/v2/venues/KovZpZAFJ71A?locale=en-us"}}}]}},{"name":"Los Angeles Coliseum Historic Tours","type":"event","id":"vvG1IZflWvlK1Y","test":false,"url":"http://www.ticketmaster.com/event/0A0052BF41AD32B0","locale":"en-us","images":[{"ratio":"16_9","url":"https://s1.ticketm.net/dbimages/204958a.jpg","width":205,"height":115,"fallback":false},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_RETINA_PORTRAIT_16_9.jpg","width":640,"height":360,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_ARTIST_PAGE_3_2.jpg","width":305,"height":203,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_RECOMENDATION_16_9.jpg","width":100,"height":56,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_TABLET_LANDSCAPE_3_2.jpg","width":1024,"height":683,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_RETINA_LANDSCAPE_16_9.jpg","width":1136,"height":639,"fallback":true},{"ratio":"4_3","url":"https://s1.ticketm.net/dbimages/204957a.jpg","width":305,"height":225,"fallback":false},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_TABLET_LANDSCAPE_16_9.jpg","width":1024,"height":576,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_RETINA_PORTRAIT_3_2.jpg","width":640,"height":427,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_TABLET_LANDSCAPE_LARGE_16_9.jpg","width":2048,"height":1152,"fallback":true}],"sales":{"public":{"startTBD":false}},"dates":{"start":{"localDate":"2017-07-05","dateTBD":false,"dateTBA":false,"timeTBA":false,"noSpecificTime":true},"timezone":"America/Los_Angeles","status":{"code":"offsale"},"spanMultipleDays":false},"classifications":[{"primary":true,"segment":{"id":"KZFzniwnSyZfZ7v7n1","name":"Miscellaneous"},"genre":{"id":"KnvZfZ7v7ll","name":"Undefined"},"subGenre":{"id":"KZazBEonSMnZfZ7vAv1","name":"Undefined"},"type":{"id":"KZAyXgnZfZ7v7lt","name":"Event Style"},"subType":{"id":"KZFzBErXgnZfZ7vAvv","name":"Sightseeing/Facility"}}],"promoter":{"id":"494","name":"PROMOTED BY VENUE","description":"PROMOTED BY VENUE / NTL / USA"},"promoters":[{"id":"494","name":"PROMOTED BY VENUE","description":"PROMOTED BY VENUE / NTL / USA"}],"info":"Come take a tour of the GREATEST STADIUM IN THE WORLD with a history, legacy and connection like no other! The Los Angeles Memorial Coliseum complex is one of the most venerable sports monuments in America today with countless historic events & milestones taking place inside its walls during nine decades of celebrated history. The Coliseum has served as home field for the USC Football team since 1923 and is the only stadium that has played host to two Olympiads (X and XXIII), two Super Bowls (I and VII) and a World Series (1959). It was declared a National Historic Landmark on July 27, 1984. The Coliseum has also hosted Evil Knievel in 1973, a Papal Mass by Pope John Paul II in 1987, Nelson Mandelas Crusade against Apartheid in 1990 & countless sold out concerts including U2, Pink Floyd, The Who, Metallica, Bruce Springsteen & the Rolling Stones. The MLBs Los Angeles Dodgers as well as the NFLs St. Louis Rams and Oakland Raiders have also called the Coliseum home.","pleaseNote":"Public Tours are available Wednesday-Sunday, 10-4pm, with Private Tours available 7 days a week. To schedule a Private or Group Tour, please email colitour@usc.edu. Tickets can be purchased on Ticketmaster or at the Coliseum Box Office located at Gate 29. All Tours depart and conclude at Gate 29. The Self-Guided Tour is limited to the Peristyle and Court of Honor with a full view of the playing field. Self-Guided Tours DO NOT include entrance into the stadium seating area. There is no time limit on this tour. The Guided Tour includes the USC Recruit Lounge, Coliseum Boardroom, Press Box, Locker Rooms and Players Tunnel and lasts 90-100 minutes. All destinations on the tour are subject to availability. NO field access is allowed at any time. RAIN OUTS do apply and your ticket can be redeemed for a different tour date within 30 days of your originally scheduled tour. Kids 5 years & under are FREE!","priceRanges":[{"type":"standard","currency":"USD","min":5.0,"max":25.0}],"accessibility":{"info":"Accessible Ticket Buyers Should Purchase Regular Ticket"},"_links":{"self":{"href":"/discovery/v2/events/vvG1IZflWvlK1Y?locale=en-us"},"attractions":[{"href":"/discovery/v2/attractions/K8vZ917K5O7?locale=en-us"}],"venues":[{"href":"/discovery/v2/venues/KovZpZAIF7aA?locale=en-us"}]},"_embedded":{"venues":[{"name":"Los Angeles Memorial Coliseum","type":"venue","id":"KovZpZAIF7aA","test":false,"url":"http://www.ticketmaster.com/venue/82780","locale":"en-us","images":[{"ratio":"3_1","url":"https://s1.ticketm.net/dam/v/4ee/6acdb953-07f5-4841-9773-869123bd84ee_438371_SOURCE.jpg","width":1500,"height":500,"fallback":false,"attribution":"KovZpZAIF7aA"}],"postalCode":"90037","timezone":"America/Los_Angeles","city":{"name":"Los Angeles"},"state":{"name":"California","stateCode":"CA"},"country":{"name":"United States Of America","countryCode":"US"},"address":{"line1":"3911 S. Figueroa St"},"location":{"longitude":"-118.287865","latitude":"34.014053"},"markets":[{"id":"27"}],"dmas":[{"id":223},{"id":324},{"id":354},{"id":383}],"upcomingEvents":{"_total":38,"tmr":8,"ticketmaster":30},"_links":{"self":{"href":"/discovery/v2/venues/KovZpZAIF7aA?locale=en-us"}}}],"attractions":[{"name":"Los Angeles Coliseum Historic Tours","type":"attraction","id":"K8vZ917K5O7","test":false,"url":"http://www.ticketmaster.com/artist/2086550","locale":"en-us","images":[{"ratio":"16_9","url":"https://s1.ticketm.net/dbimages/204958a.jpg","width":205,"height":115,"fallback":false},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_RETINA_PORTRAIT_16_9.jpg","width":640,"height":360,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_ARTIST_PAGE_3_2.jpg","width":305,"height":203,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_RECOMENDATION_16_9.jpg","width":100,"height":56,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_TABLET_LANDSCAPE_3_2.jpg","width":1024,"height":683,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_RETINA_LANDSCAPE_16_9.jpg","width":1136,"height":639,"fallback":true},{"ratio":"4_3","url":"https://s1.ticketm.net/dbimages/204957a.jpg","width":305,"height":225,"fallback":false},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_TABLET_LANDSCAPE_16_9.jpg","width":1024,"height":576,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_RETINA_PORTRAIT_3_2.jpg","width":640,"height":427,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/03e/e15ef00f-2c87-4421-ae61-d740851a703e_105891_TABLET_LANDSCAPE_LARGE_16_9.jpg","width":2048,"height":1152,"fallback":true}],"classifications":[{"primary":true,"segment":{"id":"KZFzniwnSyZfZ7v7n1","name":"Miscellaneous"},"genre":{"id":"KnvZfZ7v7ll","name":"Undefined"},"subGenre":{"id":"KZazBEonSMnZfZ7vAv1","name":"Undefined"},"type":{"id":"KZAyXgnZfZ7v7lt","name":"Event Style"},"subType":{"id":"KZFzBErXgnZfZ7vAvv","name":"Sightseeing/Facility"}}],"upcomingEvents":{"_total":16,"ticketmaster":16},"_links":{"self":{"href":"/discovery/v2/attractions/K8vZ917K5O7?locale=en-us"}}}]}},{"name":"Arizona Diamondbacks at Los Angeles Dodgers","type":"event","id":"Z7r9jZ1AvJF7x","test":false,"url":"http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=1988122","locale":"en-us","images":[{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_LANDSCAPE_16_9.jpg","width":1136,"height":639,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_3_2.jpg","width":1024,"height":683,"fallback":true},{"ratio":"4_3","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_CUSTOM.jpg","width":305,"height":225,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_16_9.jpg","width":1024,"height":576,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_LARGE_16_9.jpg","width":2048,"height":1152,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_EVENT_DETAIL_PAGE_16_9.jpg","width":205,"height":115,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_PORTRAIT_3_2.jpg","width":640,"height":427,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_PORTRAIT_16_9.jpg","width":640,"height":360,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_ARTIST_PAGE_3_2.jpg","width":305,"height":203,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RECOMENDATION_16_9.jpg","width":100,"height":56,"fallback":true}],"sales":{"public":{"startDateTime":"1900-01-01T18:00:00Z","startTBD":false,"endDateTime":"2017-07-06T02:10:00Z"}},"dates":{"start":{"localDate":"2017-07-05","localTime":"19:10:00","dateTime":"2017-07-06T02:10:00Z","dateTBD":false,"dateTBA":false,"timeTBA":false,"noSpecificTime":false},"status":{"code":"onsale"},"spanMultipleDays":false},"classifications":[{"primary":true,"segment":{"id":"KZFzniwnSyZfZ7v7nE","name":"Sports"}}],"seatmap":{"staticUrl":"http://resale.ticketmaster.com.au/akamai-content/graphics/TMResale/2/VenueMaps/475-42275-0-0-Dodgerstadium_Theclassicwest.png"},"_links":{"self":{"href":"/discovery/v2/events/Z7r9jZ1AvJF7x?locale=en-us"},"attractions":[{"href":"/discovery/v2/attractions/Z6r9jZAaee?locale=en-us"},{"href":"/discovery/v2/attractions/Zkr9jZAeeq?locale=en-us"}],"venues":[{"href":"/discovery/v2/venues/Z6r9jZAFke?locale=en-us"}]},"_embedded":{"venues":[{"name":"Dodger Stadium","type":"venue","id":"Z6r9jZAFke","test":false,"locale":"en-us","postalCode":"90012","timezone":"America/Los_Angeles","city":{"name":"Los Angeles"},"state":{"name":"California","stateCode":"CA"},"country":{"name":"United States Of America","countryCode":"US"},"address":{"line1":"1000 Elysian Park Ave."},"location":{"longitude":"-118.2388","latitude":"34.0658"},"upcomingEvents":{"_total":40,"tmr":37,"ticketmaster":3},"_links":{"self":{"href":"/discovery/v2/venues/Z6r9jZAFke?locale=en-us"}}}],"attractions":[{"name":"Los Angeles Dodgers","type":"attraction","id":"Z6r9jZAaee","test":false,"locale":"en-us","images":[{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_LANDSCAPE_16_9.jpg","width":1136,"height":639,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_3_2.jpg","width":1024,"height":683,"fallback":true},{"ratio":"4_3","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_CUSTOM.jpg","width":305,"height":225,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_16_9.jpg","width":1024,"height":576,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_LARGE_16_9.jpg","width":2048,"height":1152,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_EVENT_DETAIL_PAGE_16_9.jpg","width":205,"height":115,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_PORTRAIT_3_2.jpg","width":640,"height":427,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_PORTRAIT_16_9.jpg","width":640,"height":360,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_ARTIST_PAGE_3_2.jpg","width":305,"height":203,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RECOMENDATION_16_9.jpg","width":100,"height":56,"fallback":true}],"classifications":[{"primary":true,"segment":{"id":"KZFzniwnSyZfZ7v7nE","name":"Sports"}}],"upcomingEvents":{"_total":96,"tmr":80,"ticketmaster":16},"_links":{"self":{"href":"/discovery/v2/attractions/Z6r9jZAaee?locale=en-us"}}},{"name":"Arizona Diamondbacks","type":"attraction","id":"Zkr9jZAeeq","test":false,"locale":"en-us","images":[{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_LANDSCAPE_16_9.jpg","width":1136,"height":639,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_3_2.jpg","width":1024,"height":683,"fallback":true},{"ratio":"4_3","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_CUSTOM.jpg","width":305,"height":225,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_16_9.jpg","width":1024,"height":576,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_TABLET_LANDSCAPE_LARGE_16_9.jpg","width":2048,"height":1152,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_EVENT_DETAIL_PAGE_16_9.jpg","width":205,"height":115,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_PORTRAIT_3_2.jpg","width":640,"height":427,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RETINA_PORTRAIT_16_9.jpg","width":640,"height":360,"fallback":true},{"ratio":"3_2","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_ARTIST_PAGE_3_2.jpg","width":305,"height":203,"fallback":true},{"ratio":"16_9","url":"https://s1.ticketm.net/dam/c/25d/09139288-a226-487d-a98d-6136663e325d_106551_RECOMENDATION_16_9.jpg","width":100,"height":56,"fallback":true}],"classifications":[{"primary":true,"segment":{"id":"KZFzniwnSyZfZ7v7nE","name":"Sports"}}],"upcomingEvents":{"_total":150,"tmr":81,"ticketmaster":69},"_links":{"self":{"href":"/discovery/v2/attractions/Zkr9jZAeeq?locale=en-us"}}}]}}]},"_links":{"first":{"href":"/discovery/v2/events.json?startDateTime=2017-07-02T00%3A00%3A00Z&city=Los+Angeles&countryCode=US&radius=25&endDateTime=2017-07-09T23%3A59%3A59Z&page=0&size=3&sort=date,asc"},"self":{"href":"/discovery/v2/events.json?startDateTime=2017-07-02T00%3A00%3A00Z&size=3&city=Los+Angeles&countryCode=US&sort=date%2Casc&radius=25&endDateTime=2017-07-09T23%3A59%3A59Z"},"next":{"href":"/discovery/v2/events.json?startDateTime=2017-07-02T00%3A00%3A00Z&city=Los+Angeles&countryCode=US&radius=25&endDateTime=2017-07-09T23%3A59%3A59Z&page=1&size=3&sort=date,asc"},"last":{"href":"/discovery/v2/events.json?startDateTime=2017-07-02T00%3A00%3A00Z&city=Los+Angeles&countryCode=US&radius=25&endDateTime=2017-07-09T23%3A59%3A59Z&page=18&size=3&sort=date,asc"}},"page":{"size":3,"totalElements":0,"totalPages":19,"number":0}}',
		})();
		expect(typeof(widgetWeek.getWeekEventsHandler)).toBe('function');
	});

	it('widgetWeek #getJsonAsync should be defined', () => {
		widgetWeek.getJsonAsync('https://app.ticketmaster.com/discovery/v2/events.json?apikey=TQMbqzKDBbcCjAxC9SaKS1lg9D5Eousb&latlong=&keyword=&countryCode=US&city=Los%20Angeles&startDateTime=2017-07-02T00:00:00Z&endDateTime=2017-07-09T23:59:59Z&classificationId=&radius=25&size=500&sort=date,asc');
		expect(typeof(widgetWeek.getJsonAsync)).toBe('function');
	});

	it('widgetMonth #getJsonAsync should be defined', () => {
		widgetMonth.getJsonAsync('https://app.ticketmaster.com/discovery/v2/events.json?apikey=TQMbqzKDBbcCjAxC9SaKS1lg9D5Eousb&latlong=&keyword=&countryCode=US&city=Los%20Angeles&startDateTime=2017-07-02T00:00:00Z&endDateTime=2017-07-09T23:59:59Z&classificationId=&radius=25&size=500&sort=date,asc');
		expect(typeof(widgetMonth.getJsonAsync)).toBe('function');
	});

	it('widgetWeek #hideMessage should be defined', () => {
		widgetWeek.hideMessageDelay;
		widgetWeek.hideMessage.bind({
			messageDialog: {
				classList: {
					remove: function () {return true}
				}
			}
		})();
		widgetWeek.hideMessage.bind({
			messageTimeout: 30,
			messageDialog: {
				classList: {
					remove: function () {return true}
				}
			}
		})();
		expect(typeof(widgetWeek.hideMessage)).toBe('function');
	});

	it('widgetWeek #update should be defined', () => {
		widgetWeek.update.bind({
			eventsRootContainer: {
				querySelector: function() {return true},
				removeChild: function() {return true},
			},
			startMonth: function() {return true},
			weekSchedulerRoot: {
				appendChild: function() {return true},
			}
		})();
		expect(typeof(widgetWeek.update)).toBe('function');
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

	it('#initMessage should be defined', () => {
		document.querySelector('.event-message__btn').click();
		expect(typeof(widgetWeek.initMessage)).toBe('function');
		widgetWeek.weekSchedulerRoot = {
			innerHTML: '<div class="weekSсheduler"></div>',
			appendChild: function() {return true}
		}
		widgetWeek.initMessage(widgetWeek.weekSchedulerRoot);
	});

	it('#initMessage should be defined', () => {
		document.querySelector('.event-message__btn').click();
		expect(typeof(widgetMonth.initMessage)).toBe('function');
		widgetMonth.monthSchedulerRoot = {
			innerHTML: '<div class="monthSсheduler"></div>',
			appendChild: function() {return true}
		}
		widgetMonth.initMessage(widgetMonth.monthSchedulerRoot);
	});

	it('#initMessage should be defined', () => {
		document.querySelector('.event-message__btn').click();
		expect(typeof(widgetYear.initMessage)).toBe('function');
		widgetYear.yearSchedulerRoot = {
			innerHTML: '<div class="yearSсheduler"></div>',
			appendChild: function() {return true}
		}
		widgetYear.initMessage(widgetYear.yearSchedulerRoot);
	});

	it('#showMessage should be defined', () => {
		let hideMessageWithoutDelay = function() {return true};
		widgetWeek.massageDialog = widget.eventsRoot;
		widgetWeek.messageTimeout = function() {return true};
		widgetWeek.showMessage('Test message', hideMessageWithoutDelay);
		expect(typeof(widgetWeek.showMessage)).toBe('function');
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
		document.querySelector('[w-type="calendar"]').removeAttribute('w-titlelink');
		evt = JSON.parse('{"id":"LvZ184X-QKyIveZvudILo","url":"https://www.universe.com/events/2017-2018-subscription-tickets-F39HZP?ref=ticketmaster","name":"2017/2018 Subscription","address":{"name":"Avenue 5", "line1":"one" ,"line2": "two"},"categories":["music", "games"],"date":{"day":"2016-09-25","time":"18:15:00"},"img":"https://s1.ticketm.net/dam/c/8cf/a6653880-7899-4f67-8067-1f95f4d158cf_124761_TABLET_LANDSCAPE_16_9.jpg"}');
		widget.createDOMItem(evt, widget.widgetRoot);
		evt = JSON.parse('{"id":"LvZ184X-QKyIveZvudILo","url":"https://www.universe.com/events/2017-2018-subscription-tickets-F39HZP?ref=ticketmaster","address":"","name":"2017/2018 Subscription","date":{"day":"2016-09-25","time":"18:15:00"},"img":"https://s1.ticketm.net/dam/c/8cf/a6653880-7899-4f67-8067-1f95f4d158cf_124761_TABLET_LANDSCAPE_16_9.jpg"}');
		widget.createDOMItem(evt, widget.widgetRoot);
	});

	it('#hideMessageWithDelay should be defined', () => {
		widget.hideMessageWithDelay(500);
		expect(typeof(widget.hideMessageWithDelay)).toBe('function');
		widget.messageTimeout = function() {return false};
		widget.hideMessageWithDelay(500);
		expect(typeof(widget.hideMessageWithDelay)).toBe('function');
	});

	it('#hideMessageWithDelay should be defined', () => {
		widgetWeek.hideMessageWithDelay(500);
		expect(typeof(widgetWeek.hideMessageWithDelay)).toBe('function');
		widgetWeek.messageTimeout = function() {return false};
		widgetWeek.hideMessageWithDelay(500);
		expect(typeof(widgetWeek.hideMessageWithDelay)).toBe('function');
	});

	it('#addScroll should be defined', () => {
		widgetWeek.addScroll();
		expect(typeof(widgetWeek.addScroll)).toBe('function');
	});

	it('#addScroll should be defined', () => {
		widgetMonth.addScroll();
		expect(typeof(widgetMonth.addScroll)).toBe('function');
	});

	it('#addScroll should be defined', () => {
		widgetYear.addScroll();
		expect(typeof(widgetYear.addScroll)).toBe('function');
	});

});
