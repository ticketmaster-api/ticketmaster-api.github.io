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
	});

	beforeEach(function() {
		spyOn(widget, 'toggleSecondsVisibility');
		spyOn(widget, 'clear');
		spyOn(widget, 'hideMessage');
		spyOn(widget, 'showMessage');
		spyOn(widget, 'publishEvent');
	});

	it('widget should be BeDefined', () => {
		expect(widget).toBeDefined();
	});
	it('#eventUrl should be "http://www.ticketmaster.com/event/"', () => {
		expect(widget.eventUrl).toBe("http://www.ticketmaster.com/event/");
	});
	it('#formatDate should return result', () => {
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

	it('#showStatusMessage should show event status message', () => {
		widget.eventResponce = {
			date: {
				dateTime :'Tue Apr 11 2017 15:48:06 GMT+0300 (FLE Daylight Time)' ,
				dateTimeEnd: 'Tue Apr 11 2018 15:48:06 GMT+0300 (FLE Daylight Time)'
			}
		};
		widget.showStatusMessage();
		expect(widget.showMessage).toHaveBeenCalledWith(`Event is in progress`, false , "event-message-started");

		widget.eventResponce = {
			date: { dateTime :'not valid', dateTimeEnd: 'not valid' }
		};
		widget.showStatusMessage();
		expect(widget.showMessage).toHaveBeenCalledWith(`This event has taken place`, false , "event-message-started");
	});
	
	it('#updateTransition should manage class appear', () => {
		widget.clearEvents = function () {
		 return this.eventsRoot.innerHTML = "";
		};
		let elem  = document.querySelector(".event-logo.centered-logo");
		widget.updateTransition('url');
		expect(elem.classList).toContain("event-logo");

		widget.updateTransition(false);
		expect(widget.updateTransition(false)).toBe(undefined);

		widget.updateTransition('');
		expect(elem.classList).toContain("centered-logo")
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
		setTimeout(function() {
			widget.countDownMonth = {};
			widget.countDownMonth.innerHTML = '888';
			console.log('1 innerHTML', widget.countDownMonth.innerHTML);
			widget.toggleSecondsVisibility();
			expect(widget.toggleSecondsVisibility).toHaveBeenCalled();
			done();
		}, 200);
	});

	it('#update should be called with FullWidthTheme', () => {
		let isFullWidth = true;
		widget.update(isFullWidth);
		widget.clear();
		expect(widget.clear).toHaveBeenCalled();
	});


	it('#getImageForEvent should return the second smallest img', () => {
		var images = [
			{ width : '100', height :'200', url:"img-01.bmp"},
			{ width : '400', height :'300', url:"img-02.bmp"},
			{ width : '50', height :'50', url:"img-03.bmp"},
			{ width : '10', height :'10', url:"img-04.bmp"}
		];
		expect(widget.getImageForEvent(images)).toBe("img-03.bmp");
	});

	it('#initPretendedLink should return element', () => {
		var el = {
				setAttribute: ()=>{true},
				getAttribute: ()=>{false},
				classList: {add:()=>{true}},
				addEventListener: (event,fn)=>{
					// fn.getAttribute = function(){return false}
					// fn().bind(this)
				}
			},
			url ="img-01.bmp",
			isBlank=true;
		expect(widget.initPretendedLink(el, url, isBlank)).toBe(el);
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
		var currentEvent = widget.parseEvent(eventSet);
		var generatedObj = {
			address: {"name": "one address"},
			date: {"dateTime": "11:00", "dateTimeEnd": "18:00", "day": "23.09.83", "dayEnd": "23.09.99", "time": "12:00", "timeEnd": "19:00"},
			id: "porky",
			img: "img-03.bmp",
			name: "Tanok na maydani Kongo",
			url: "pie"
		};
		expect(currentEvent).toEqual(generatedObj);


		var generatedObjNoVenueName = {
			id: 'porky',
			url: 'pie',
			name: 'Tanok na maydani Kongo',
			date: { day: '23.09.83', time: '12:00', dateTime: '11:00', dayEnd: '23.09.99', timeEnd: '19:00', dateTimeEnd: '18:00' },
			address: 'one address',
			img: 'img-03.bmp'
		};

		eventSet._embedded.venues[0]={ address: 'one address' };
		let currentEventNoVenueName = widget.parseEvent(eventSet);
		expect(currentEventNoVenueName).toEqual(generatedObjNoVenueName);

	});

	it('#initFullWidth should return set width=100%', () => {
		var config = {
				width: '100%',
				height : 700
			},
			widgetRoot ={
				style : {
					width: '100%',
					height : '700px',
					display: 'block'
				}
			},
			eventsRootContainer ={
				style : {
					width: '100%',
					height : '700px'
				}
			};
		widget.initFullWidth();
		expect(widget.config.width).toBe(config.width);
		expect(widget.config.height ).toBe(config.height );
		expect(widget.widgetRoot.style.width).toBe(widgetRoot.style.width);
		expect(widget.widgetRoot.style.height).toBe(widgetRoot.style.height);
		expect(widget.widgetRoot.style.display).toBe(widgetRoot.style.display);
		expect(widget.eventsRootContainer.style.width ).toBe(eventsRootContainer.style.width);
		expect(widget.eventsRootContainer.style.height ).toBe(eventsRootContainer.style.height);
	});

	it('#createDOMItem should create element', () => {
		var itemConfig = {
				name: 'some mock text',
				address: {
					name: 'vinnica',
					line1: '700',
					line2: '700'
				},
				date: 'Wed Oct 23 2013 00:00:00 GMT+0300 (FLE Daylight Time)',
				categories : ['boo','foo']
			};

		 var domElement = widget.createDOMItem(itemConfig);

		expect(domElement.localName).toEqual("li");
		expect(domElement.children[0].nodeName).toEqual("SPAN");
		expect(domElement.children[0].className).toEqual("bg-cover");
		expect(domElement.children[1].className).toEqual("event-content-wraper");
		expect(domElement.children[1].children.length).toEqual(4);
		expect(domElement.children[1].children[0].localName).toEqual("span");
		expect(domElement.children[1].children[0].className).toContain("event-name");
		expect(domElement.children[1].children[0].textContent).toEqual('some mock text');
		expect(domElement.children[1].children[1].className).toContain("event-date-wraper");
		expect(domElement.children[1].children[2].className).toContain("address-wrapper");
		expect(domElement.children[1].children[3].className).toContain("category-wrapper");
	});	
	
});
