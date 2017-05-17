describe("MapWidget", () => {
	let widget,
	module,
	hideMessageDelay;
  var setFixture = function(){
	  document.body.innerHTML = '<head></head><div w-type="map" w-latlong=","></div><div class="modificator"></div><div class="modificator"></div>';
  };

	beforeAll(function() {
		global.apiKeyService = {
			checkApiKeyCode: function() { return true },
			checkApiKeyCookie: function() { return true },
			getApiWidgetsKey: function() { return true }
		}
		window.__VERSION__ = 'mockedVersion';
		setFixture();
		module = require('products-and-docs/widgets/map/1.0.0/src/main-widget.es6');
		widget = new module.TicketmasterMapWidget(document.querySelector('.modificator'));
		widget = new module.TicketmasterMapWidget(document.querySelector('div[w-type="map"]'));
		var googleMapMock = {
			setCenter:jest.fn(),
			fitBounds:jest.fn()
		};
		var geocoderMock = {
			geocoder:true
		};
		window.google = {
			maps: {
				Marker:jest.fn(),
				Map: jest.fn(() => googleMapMock),
				LatLng:jest.fn((lat, lng) => ({lat, lng})),
				Geocoder: jest.fn(() =>geocoderMock),
				MapTypeId: {
					ROADMAP: ''
				},
				ControlPosition: {
					RIGHT_CENTER: ''
				},
				fitBounds: function() {return true},
				LatLngBounds: function() {return {extend:function(){}}},
				event: {
					trigger: jest.fn()
				}
			}
		};
	});

	beforeEach(function() {
		spyOn(widget, 'hideMessage');
		spyOn(widget, 'showMessage');
	});

	it('widget should be BeDefined', function(){
		expect(widget).toBeDefined();
	});

	it('widget #themeUrl should be BeDefined', function(){
		expect(widget.themeUrl).toBe('https://ticketmaster-api-staging.github.io/products-and-docs/widgets/map/1.0.0/theme/');
		Object.defineProperty(window.location, 'host', {
			writable: true,
			value: 'developer.ticketmaster.com'
		});
		expect(widget.themeUrl).toBe('https://developer.ticketmaster.com/products-and-docs/widgets/map/1.0.0/theme/');
	});

	it('widget #portalUrl should be Defined', function(){
		expect(widget.portalUrl).toBe('https://developer.ticketmaster.com/');
		Object.defineProperty(window.location, 'host', {
			writable: true,
			value: 'developer.ticketmaster.com'
		});
		expect(widget.portalUrl).toBe('https://developer.ticketmaster.com/');
	});

	it('widget #tmWidgetWhiteList should be BeDefined', function(){
		expect(widget.tmWidgetWhiteList).toBeDefined();
	});

	it('#isConfigAttrExistAndNotEmpty should be Undefined', () => {
		widget.widgetConfig = {
			height: undefined
		}
		expect(widget.config.height).toBeUndefined();
		widget.widgetConfig = {
			height: 350,
			period: '2017-01-01, 2017-02-01'
		}
		expect(widget.config.height).toBeDefined();
		expect(widget.isConfigAttrExistAndNotEmpty('height')).toBe(true);
	});

	it('widget eventReqAttrs should be BeDefined', function(){
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
		widget.attrs = {
				latlong: ','
		};
		let attrs = {
			latlong: ','
		}
		expect(widget.eventReqAttrs).toBeDefined();
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

	it('widget #setMarkers should be BeDefined', function(){
		// let google = {};
		// widget.setMarkers(google, {});
		expect(widget.setMarkers).toBeDefined();
	});

	it('widget #makeImageUrl should be BeDefined', function(){
		widget.makeImageUrl(3);
		expect(widget.makeImageUrl).toBeDefined();
	});

	it('widget #toShortISOString should be BeDefined', function(){
		widget.toShortISOString(new Date());
		expect(widget.toShortISOString(new Date())).toBeDefined();
	});

	it('#eventUrl should be "https://www.ticketmaster.com/event/"', () => {
		expect(widget.eventUrl).toBe("https://www.ticketmaster.com/event/");
	});

	it('#hideMessageDelay should be integer', () => {
		expect(widget.hideMessageDelay).toBe(5000);
  });

	it('#createDOMItem should be defined', () => {
		let itemCongig = {
			img: 'empty.png',
			date: '2017-02-01',
			address: {
				name: 'Los Angeles',
				line1: 'Astor Place Theatre',
				line2: '434 Lafayette Street'
			},
			name: 'Some Name',
			categories: ['music', 'sport', 'film']
		}
		widget.createBackgroundImage = function() {return true}
		widget.createDOMItem(itemCongig);
		expect(widget.createDOMItem(itemCongig)).toBeDefined();
	});

	it('#hideMessageDelay should be integer', () => {
		widget.initPretendedLink(widget.widgetRoot,'http://www.google.com', true);
		expect(widget.initPretendedLink(widget.widgetRoot,'http://www.google.com', true)).toBeTruthy();
		widget.initPretendedLink(widget.widgetRoot,'http://www.google.com', false);
		expect(widget.initPretendedLink(widget.widgetRoot,'http://www.google.com', true)).toBeTruthy();
	});

	it('#geocodeUrl should be "https://maps.googleapis.com/maps/api/geocode/json"', () => {
		expect(widget.geocodeUrl).toBe("https://maps.googleapis.com/maps/api/geocode/json");
  });

	it('#events should be integer', () => {
		expect(widget.events).toBeUndefined();
  });

	it('#needToUpdate should be integer', () => {
		widget.needToUpdate('lisview', 'oldscool', [-1, 'tt', 'ttt']);
		expect(widget.needToUpdate).toBeTruthy();
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
		mockDate = {
			dateTime : "2017-03-18T00:00:00Z",
			day : "2017-03-17",
			time : "00:00:00"
		};
		okResult = widget.formatDate(mockDate);
		expect(okResult).toEqual("Fri, Mar 17, 2017 12:00 AM");
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
		widget.widgetConfig = {
		  postalcode : '90015'
	  };
		expect(typeof(widget.getCoordinates(cb))).toBeDefined();
		widget.onLoadCoordinate = function() {return true}
		widget.getCoordinates(cb);
		expect(typeof(widget.getCoordinates(cb))).toBeDefined();
	});

	it('#initMessage should be defined', () => {
		document.querySelector('.event-message__btn').click();
		expect(typeof(widget.initMessage)).toBe('function');
	});

	it('#styleLoadingHandler should be defined', () => {
		widget.styleLoadingHandler.bind({widget:{config:{theme:'simple'}},readyState:XMLHttpRequest.DONE, status:200})();
		expect(typeof(widget.styleLoadingHandler)).toBe('function');
	});

	it('#eventsLoadingHandler should be defined', () => {
		let responseTxt = '[{"id":"vv1k0Zf0C6G7Dsmj","url":"http://www.ticketmaster.com/event/0900524387EF1B9C","name":"Bryan Adams","date":{"day":"2017-05-20","time":"18:00:00"},"address":{"line1":"2700 N. Vermont Ave","name":"Greek Theatre"},"location":{"lat":34.11948811,"lng":-118.29629093},"img":"https://s1.ticketm.net/dam/a/6b4/91e51635-4d17-42cb-9495-6f6702a546b4_288631_RECOMENDATION_16_9.jpg"},{"id":"vvG1iZfGxi-dEf","url":"http://www.ticketmaster.com/event/0B0050C8AC8439D4","name":"The Bodyguard (Touring)","date":{"day":"2017-05-17","time":"20:00:00"},"address":{"line1":"6233 Hollywood Blvd.","name":"Hollywood Pantages Theatre"},"location":{"lat":34.10200961,"lng":-118.32586552},"img":"https://s1.ticketm.net/dam/a/fd9/e1435468-e4f2-4c23-b7b8-61728c267fd9_241751_RECOMENDATION_16_9.jpg"}]';
		let latlngbounds = {
			extend: function() {return true}
		};
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
		widget.widgetConfig = {
			buyBtn: function() {return true}
		}
		widget.setBuyBtnUrl();
    let event = {
			url: 'http://www.google.com'
		}
		widget.buyBtn = function() {return true}
		widget.setBuyBtnUrl();
		expect(typeof(widget.setBuyBtnUrl)).toBe('function');
		widget.buyBtn = function() {return false}
		widget.setBuyBtnUrl();
	});

	it('#isAllowedTMEvent should be defined', () => {
		expect(widget.isAllowedTMEvent('livenation.com')).toBeFalsy();
	});

	it('#embedTMPlugin should be defined', () => {
		expect(typeof(widget.embedTMPlugin)).toBe('function');
	});

	it('#showMessage should be defined', () => {
		let hideMessageWithoutDelay = function() {return true};
		widget.messageTimeout = function() {return true};
		widget.showMessage('Test message', hideMessageWithoutDelay);
		expect(typeof(widget.showMessage)).toBe('function');
	});

	it('#toolTipHandler should be defined', () => {
		expect(typeof(widget.toolTipHandler)).toBe('undefined');
	});

	it('#hideMessageWithDelay should be defined', () => {
		widget.hideMessageWithDelay(500);
		expect(typeof(widget.hideMessageWithDelay)).toBe('function');
	});

	it('#useGeolocation should be defined', () => {
		Object.defineProperty(navigator, 'geolocation', {
			writable: true,
			value: 'developer.ticketmaster.com'
		});
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
		let modificator = document.createElement("div");
		modificator.classList.add = "modificator";
		widget.eventsRoot.appendChild(modificator);
		widget.clear;
		expect(typeof(widget.clear)).toBe('function');
	});

	it('#addBuyButton should be defined', () => {
		widget.isListView = function() {return true}
		widget.isUniverseUrl = function() {return true}
		widget.isAllowedTMEvent = function() {return true}
		let _urlValid = undefined;
		widget.addBuyButton(document.querySelector('.events-root-container'), 'www.ticketmaster.com');
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
		widget.config = {
			border: '2'
		}
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
