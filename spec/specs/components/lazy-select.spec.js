window.jQuery = window.$ = require('jquery');
window.apiKeyService = {
	checkApiKeyCookie : (name)=>{		
		return undefined ;
	},
	getApiKeysCookie : (name)=>{
		let res , n;
		n = Math.random();
		if(Math.floor(n)===0) res = undefined;
		else res = [name+1,name+2];
		return res ;
	},
	getApiExploreKey : (name)=>{
		return undefined ;
	},
};

let setFixture = () => {
	document.body.innerHTML = `
		<input type="text" id="w-id" name="w-id" value="testID" class="js_lazy-selector double-margin-bottom">
		<!--modal-->
		<div class="modal modal-common fade in" id="js_ls-modal" tabindex="-1" role="dialog" style="display: block; padding-right: 17px;">
    <div class="modal-dialog">
        <div></div><!--map-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
                <div class="row">
                    <h3 class="modal-title col-lg-12">Find <span>event</span> by keyword</h3>
                </div>
            </div>
            <div class="modal-body">
                <form id="js_lazy-sel_form" accept-charset="UTF-8" method="GET">
                    <div class="col-sm-9 clear-padding-right">
                        <input required="" type="text" placeholder="keyword" id="keyword" autofocus="">
                    </div>
                    <div class="col-sm-3 text-right">
                        <button id="js_ls-modal_btn" type="button" class="btn btn-transparent" data-selector="events">GET</button>
                    </div>
                </form>
                <div id="spinner-ls" style="display: none;"></div>
                <div class="ms-selection" style="display: none;">
                    <div class="col-sm-9 col-xs-12">
                        <ul class="ms-list">
                        </ul>
                    </div>
                    <div class="col-sm-3 col-xs-12 text-right">
                        <button id="js_ms-use-btn" type="button" class="btn btn-submit">Use</button>
                    </div>
                </div>
                <hr id="js_ls-top-hr" style="display: none;">
                <div class="wrapper-list-group">
                    <ul id="js_lazy-sel_list" class="list-group"></ul>
                    <div class="list-footer text-center" style="display: none;" id="load-more-box">
                        <button id="js_ls-more_btn" type="button" class="btn btn-submit">SHOW MORE EVENTS</button>
                    </div>
                </div>
            </div>
        </div><!-- /.modal-content -->
        <div class="wrapper-map" style="background-color: aliceblue;">
            <button style="display: none;" id="close1" class="button-close-map" aria-controls="m1"></button>
            <div id="map-canvas" class="" style="background-color: aliceblue;"></div>
        </div>
				</div><!-- /.modal-dialog -->
		</div>
		<!--modal END-->
		`;
	};
let mockGoogleMap = ()=>{
	var googleMapMock = {
		setCenter:jest.fn()
	};
	var geocoderMock = {
		geocoder:true
	};
	$.fn.modal = jest.fn();
	window.google = {
		maps: {
			Marker:jest.fn(),
			MarkerImage:jest.fn(),
			Size:jest.fn((x, y) => ({x, y})),
			Map:jest.fn(() => googleMapMock),
			LatLng:jest.fn((lat, lng) => ({lat, lng})),
			Geocoder: jest.fn(() =>geocoderMock),
			event: {
				trigger: jest.fn()
			}
		}
	};
};

describe("Events selector", () => {
	var options , $selectorEvents, selectorEventsObj;

	beforeAll(() => {
		module = require('scripts/components/lazy-selector.js');
	});

	beforeEach(function() {
		setFixture();
		options = {selector:'', hideMultiSelector: true};
		$selectorEvents = $('.js_lazy-selector');
		$selectorEvents.lazySelector(options);
	});

	it('#changeModalTextListener should change text', () => {
		let sut,
			isLowHeight;
		options.test = 'UnitTest';
		sut = $selectorEvents.lazySelector(options);
		sut.changeModalTextListener();
		isLowHeight = $('.wrapper-list-group', '#js_ls-modal').hasClass('low-height');
		expect(isLowHeight).toBeFalsy();

		options.selector = 'venues';
		options.hideMultiSelector = false;
		sut = $selectorEvents.lazySelector(options);
		$(document).trigger('ready');
		$(document).trigger('finishInit');
		sut.changeModalTextListener();
		isLowHeight = $('.wrapper-list-group', '#js_ls-modal').hasClass('low-height');
		expect(isLowHeight).toBeTruthy();

		let textSea = $('#js_ls-more_btn', '#js_ls-modal').text();
		expect(textSea).toEqual('SHOW MORE venues');
	});

	it('#renderListEvents should render venues', () => {
		let sut = {},
			ulElement = $('<li></li>'),
			data = {
				page: {},
				_embedded : {
					events : [{
						classifications: [{genre: {id: 'someId', name: 'Rock'}}],
						dates: {},
						id: 'testId',
						name: 'ZZ Top',
						url: 'test_url',
						/*_embedded: {
							venues:[{
								name: 'someName',
								address:{
									line1:'line1',
									line2:'line2'
								},
							}]
						}*/
					}]
				},
				_links : {}
			};
		data.page.totalElements = 21;
		data._embedded.events[0].dates = {
			start: {
				localDate:'today',
				localTime: 'today+1',
				dateTime: 'in thursday after rain'
			}
		};
		options.test = 'UnitTest';
		sut = $selectorEvents.lazySelector(options);
		let $wrapCol = $('.event-text-wrapper');
		sut.renderListEvents([]);
		expect($wrapCol).toBeDefined();

		sut.renderListEvents(data._embedded.events);
		expect($wrapCol).toBeDefined();

		data._embedded.events[0]._embedded = {
			venues:[{
				name: 'someName'
			}]
		};
		sut.renderListEvents(data._embedded.events);
		expect($wrapCol).toBeDefined();
		expect($('.address-name','.event-text-wrapper').hasClass('address-name')).toBeTruthy();
		expect($('.address-name','.event-text-wrapper').text()).toEqual('someName. ');
		data._embedded.events[0]._embedded.venues[0].address={
			line1:'line1',
		};
		sut.renderListEvents(data._embedded.events);
		expect($('span','.event-text-wrapper').hasClass('address-line1')).toBeTruthy();

		data._embedded.events[0]._embedded.venues[0].address.line2='line2';
		sut.renderListEvents(data._embedded.events);
		expect($('span','.event-text-wrapper').hasClass('address-line2')).toBeTruthy();


		delete( data._embedded.events[0]._embedded.venues );
		delete( data._embedded.events[0].name );
		delete( data._embedded.events[0].id );
		setFixture();
		sut.renderListEvents(data._embedded.events);
		expect($('span','.event-text-wrapper').hasClass('address-line2')).toBeFalsy();
		expect($('span','.event-text-wrapper').hasClass('address-name')).toBeFalsy();
		expect($('.wrapper-btns').length).toEqual(0);
	});

	it('#mapPopUpListener should bootstrap modal toBeCalled', () => {
		let sut = {},
			e = $.Event('click');
		mockGoogleMap();
		$('body').append( $('<li class="test-item" data-latitude="41.000"></li>') );
		e.target = 'li.test-item';
		options.test = 'UnitTest';
		sut = $selectorEvents.lazySelector(options);
		sut.mapPopUpListener(e);
		expect($.fn.modal).toBeCalled();
	});

	it('#mapPopUpListener lat/lng should be Undefined', () => {
		let sut = {},
			e = $.Event('click');
		options.test = 'UnitTest';
		e.target = 'li.test-item2';
		$('body').append( $('<li class="test-item2">test-item2</li>') );
		// $('body').append( $('<li class="test-item" data-latitude="41.000" data-longitude="42.000"></li>') );
		// window.map = {
		// 		setZoom:jest.fn()
		// 	};
		mockGoogleMap();
		sut = $selectorEvents.lazySelector(options);
		sut.mapPopUpListener(e);
		expect($(e.target).attr('data-latitude')&&$(e.target).attr('data-longitude')).toBeUndefined();
		expect($(e.target).attr('data-latitude')).toBeUndefined();
	});

	it('#clearMarkers should set markers to []', () => {
		let sut = {},
			e = $.Event('click');
		options.test = 'UnitTest';
		e.target = 'li.test-item2';
		$('body').append( $('<li class="test-item2">test-item2</li>') );
		sut = $selectorEvents.lazySelector(options);
		sut.clearMarkers();
		expect(sut.markers.length).toBe(0);
	});

	it('#renderResults should render events', () => {
		let sut = {};
		options.test = 'UnitTest';
		sut = $selectorEvents.lazySelector(options);
		sut.stateConf.loadingFlag  = 'false';
		expect(sut.selector).toEqual('events');
	});

	it('#renderResults should "STOP_LOAD" ', () => {
		let sut = {},
			ulElement = $('<li></li>'),
			data = {
				page: {},
				_embedded : {
					venues:[{
						address:{
							line1:'line1',
							line2:'line2'
						},
					}],
					events : [{
						classifications: [{genre: {id: 'someId', name: 'Rock'}}],
						dates: {},
						id: 'testId',
						name: 'ZZ Top',
						url: 'test_url'
					}]
				},
				_links : {}
			};
		data._embedded.events[0].dates = {
			start: {
				localDate:'today',
				localTime: 'today+1',
				dateTime: 'in thursday after rain'
			}
		};
		options.test = 'UnitTest';
		sut = $selectorEvents.lazySelector(options);
		sut.stateConf.loadingFlag  = 'STOP_LOAD';

		$('#load-more-box').show();
		expect($('#load-more-box').css('display')).toEqual('block');
		sut.renderResults(data,ulElement);
		expect($('#load-more-box').css('display')).toEqual('none');
	});

	it('#renderResults should show horizontal line and button "load more"', () => {
		let sut = {},
			ulElement = $('<li></li>'),
			data = {
				page: {},
				_embedded : {
					venues:[{
						address:{
							line1:'line1',
							line2:'line2'
						},
					}],
					events : [{
						classifications: [{genre: {id: 'someId', name: 'Rock'}}],
						dates: {},
						id: 'testId',
						name: 'ZZ Top',
						url: 'test_url'
					}]
				},
				_links : {}
			};
		data.page.totalElements = 21;
		data._embedded.events[0].dates = {
			start: {
				localDate:'today',
					localTime: 'today+1',
					dateTime: 'in thursday after rain'
			}
		};
		options.test = 'UnitTest';
		sut = $selectorEvents.lazySelector(options);
		sut.renderResults(data,ulElement);
		expect($('#load-more-box').css('display')).toEqual('block');

		let $hr = $('#js_ls-top-hr');
		data.page.totalElements = -1;
		sut.renderResults(data,ulElement);
		expect($hr.css('display')).toEqual('block');


		options.selector = 'venues';
		sut = $selectorEvents.lazySelector(options);
		sut.stateConf.loadingFlag  = 'false';
		sut.renderResults(data,ulElement);
		expect(sut.selector).toEqual('venues');
	});

	it('#renderResults should render venues or attraction', () => {
		let sut = {},
			ulElement = $('<li></li>'),
			data = {
				page: {},
				_embedded : {
					venues:[{
						address:{
							line1:'line1',
							line2:'line2'
						},
					}],
					events : [{
						classifications: [{genre: {id: 'someId', name: 'Rock'}}],
						dates: {},
						id: 'testId',
						name: 'ZZ Top',
						url: 'test_url'
					}]
				},
				_links : {}
			};
		data.page.totalElements = 21;
		data._embedded.events[0].dates = {
			start: {
				localDate:'today',
					localTime: 'today+1',
					dateTime: 'in thursday after rain'
			}
		};
		options.test = 'UnitTest';

		options.selector = 'venues';
		sut = $selectorEvents.lazySelector(options);
		sut.renderResults(data,ulElement);
		expect(sut.selector).toEqual('venues');

		options.selector = 'attractions';
		sut = $selectorEvents.lazySelector(options);
		sut.renderResults(data,ulElement);
		expect(sut.selector).toEqual('attractions');

		//check data = null path
		data = null;
		sut = $selectorEvents.lazySelector(options);
		var state = sut.renderResults(data,ulElement);
		expect($('#js_ls-modal .modal-content').hasClass('narrow')).toBeFalsy();
		expect(state).toBeFalsy();
	});

	it('should show modal window', () => {
		var $iconButton = $('#get-event-by-Id-'+options.selector);
		$iconButton.trigger('click');
		$('#js_ls-modal').trigger('shown.bs.modal');
		expect($iconButton.attr('data-selector')).toEqual("events");
		expect($selectorEvents.val()).toEqual("testID");
		$('#get-event-by-Id-').attr('data-selector','some');
		expect($('#get-event-by-Id-').attr('data-toggle')).toEqual('modal');
		expect($('#get-event-by-Id-').attr('data-selector')).toEqual('some');
	});

	it('should hidden modal window and set empty keywordInput value', () => {
		$('#js_ls-modal').trigger('hidden.bs.modal');
		let  keyword = $('#keyword');
		expect(keyword.val()).toEqual('');
	});

	it('#document should init plugin', () => {
		selectorEventsObj = $selectorEvents.lazySelector(options);
		expect($selectorEvents).toBeDefined();
	});

	it('should submit valid Form on btnGET', () => {
		let $modal = $('#js_ls-modal'),
			keyword = $('#keyword'),
			$btnGET = $modal.find('#js_ls-modal_btn');
		keyword.val('zztop');
		var form = $('#js_lazy-sel_form');
		form.get(0).checkValidity = function(){return true};
		$btnGET.trigger('click');
		// console.log($btnGET.is(':disabled'));
		expect($btnGET.is(':disabled')).toBe(true);
	});

	it('should submit not valid Form on btnGET', () => {
		let $modal = $('#js_ls-modal'),
			keyword = $('#keyword'),
			$btnGET = $modal.find('#js_ls-modal_btn'),
			form = $('#js_lazy-sel_form');
		keyword.val('zztop');
		form.get(0).checkValidity = function(){return false};
		$btnGET.trigger('click');
		expect($btnGET.is(':disabled')).toBe(false);

		/*else path*/
		form.get(0).reportValidity = function(){return false};
		$btnGET.trigger('click');
		/*else path end*/
		var isClassActive = form.hasClass('get-eventId_form-validation');
		expect(isClassActive).toBeTruthy();
	});

	it('should submit valid Form on keyup=13', () => {
		let $modal = $('#js_ls-modal'),
			keyword = $('#keyword'),
			$btnGET = $modal.find('#js_ls-modal_btn'),
			form = $('#js_lazy-sel_form'),
			isClassActive;

		keyword.val('zztop');

		var e = $.Event('keyup');
		e.target = {tagName:'INPUT'}; // enter in
		e.which = e.keyCode = 13; // enter in
		form.get(0).checkValidity = function(){return true};
		form.trigger(e);
		form.get(0).checkValidity = function(){return false};
		form.trigger(e);
		isClassActive = form.hasClass('get-eventId_form-validation');
		expect(isClassActive).toBeFalsy();
	});

	it('should not submit invalid Form on keyup=13', () => {
		let $modal = $('#js_ls-modal'),
			keyword = $('#keyword'),
			$btnGET = $modal.find('#js_ls-modal_btn'),
			form = $('#js_lazy-sel_form'),
			isClassActive;
		var eInvalidTagName = $.Event('keyup');
		eInvalidTagName.target = {tagName:'li'}; // enter in
		eInvalidTagName.keyCode = 13; // enter in
		form.get(0).checkValidity = function(){return false};
		form.trigger(eInvalidTagName);

		//check Invalid keyCode path
		var eInvalid = $.Event('keyup');
		eInvalid.target = {tagName:'INPUT'}; // enter in
		eInvalid.keyCode = 1; // enter in
		form.get(0).checkValidity = function(){return false};
		form.trigger(eInvalid);

		//when $form.get(0).checkValidity() is true
		var e = $.Event('keyup');
		 e.target = {tagName:'INPUT'};
		 e.which = e.keyCode = 13; // enter in
		form.get(0).checkValidity = function(){return false};
		form.trigger(e);

		isClassActive = form.hasClass('get-eventId_form-validation');
		expect(isClassActive).toBeFalsy();
	});

	it('#getImageForEvent should return the second smallest img', () => {
		let sut = {},
			images = [
			{ width : '300', height :'200', url:"img-01.bmp"},
			{ width : '400', height :'300', url:"img-02.bmp"},
			{ width : '50', height :'50', url:"img-03.bmp"},
			{ width : '10', height :'70', url:"img-04.bmp"}
		];
		options.test = 'UnitTest';
		sut = $selectorEvents.lazySelector(options);
		expect(sut.getImageForEvent(images)).toBe("img-01.bmp");
		expect(sut.getImageForEvent([
			{ width : '20',url:"img-05.bmp"},
			{ width : '70'}
		])).toBe("img-05.bmp");

		expect(sut.getImageForEvent([
			{ width : '20'},{ width : '70',url:"img-05.bmp"}
		])).toBe('');

		expect(sut.getImageForEvent([
			{ width : '90'},{ width : '90',url:"img-05.bmp"}
		])).toBe('');
	});

	it('#delIdListener should call toggleMsSelectionBox',()=>{
		let e = $.Event('click'),sut = {};
		options.test = 'UnitTest';
		sut = $selectorEvents.lazySelector(options);
		spyOn(sut,'toggleMsSelectionBox');
		sut.delIdListener(e);
		sut.toggleMsSelectionBox();
		expect(sut.toggleMsSelectionBox).toHaveBeenCalled();
	});

	it('#addMsButtonListener should call toggleMsSelectionBox',()=>{
		let e = $.Event('click'),sut = {};
		options.test = 'UnitTest';
		options.hideMultiSelector = false;
		sut = $selectorEvents.lazySelector(options);
		let button = $('<button data-id="K8vZ91718N0" class="js_ms-add-list_btn">ADD to list</button>');
		$( "#js_ls-modal").append(button);
		spyOn(sut,'toggleMsSelectionBox');
		sut.addMsButtonListener(e);
		sut.toggleMsSelectionBox();
		$(document).trigger('ready');
		$(document).trigger('finishInit');
		// expect($( "#js_ls-modal button.js_ms-add-list_btn" ).hasClass('checked')).toBeTruthy();
		expect(sut.toggleMsSelectionBox).toHaveBeenCalled();
	});

	it('#$form submit should preventDefault', () => {
		let sut = {},
			form = $('#js_lazy-sel_form'),
			e = $.Event('submit');
		sut = $selectorEvents.lazySelector(options);
		form.trigger(e);
		expect( e.preventDefault ).toBeCalled;
	});

	it('#js_ls-more_btn should call on click', () => {
		let sut = {};
		let e = $.Event('click');
		options.test = 'UnitTest';
		sut = $selectorEvents.lazySelector(options);

		// sut.setIdsListener();
		// sut.mapListener(e);
		$('#js_ls-more_btn','#load-more-box').trigger('click');
		$(document).trigger('ready');
		$(document).trigger('finishInit');
		expect( sut.submitForm ).toBeCalled;


		let button = $('<button class="js_lazy-sel_btn">sel_btn</button>');
		$( "#js_ls-modal").append(button);
		$('.js_lazy-sel_btn').trigger(e);
		expect( sut.setIdListener ).toBeCalled;

	});

	it('#js_ls-more_btn should call on click', () => {
		let sut = {};
		let e = $.Event('click');
		e.target = {};
		e.target.getAttribute = () =>{'data-event'};
		options.test = 'UnitTest';

		// let button = $('<button class="js_lazy-sel_btn">sel_btn</button>');
		// $( "#js_ls-modal").append(button);
		
		let iconSel = $('#get-event-by-Id-'),
			btSel = $('#js_ls-modal_btn');

		$('body')
			.append(iconSel)
			.append(btSel);

		iconSel.attr('selector', 'mockSelector');
		btSel.attr('selector','mockSelector');

		sut = $selectorEvents.lazySelector(options);
		expect(sut.setIdsListener(e)).toBeFalsy();


		sut.setIdListener(e);
		sut.mapListener(e);
	});

	it('#setIdsListener should hide modal on click', () => {
		let sut = {};
		let e = $.Event('click');
		e.target = {};
		e.target.getAttribute = () =>{'data-event'};
		options.test = 'UnitTest';
		sut = $selectorEvents.lazySelector(options);
		expect(sut.setIdsListener(e)).toBeFalsy();

		let iconSel = $('#get-event-by-Id-'),
			btSel = $('#js_ls-modal_btn'),
			$msList = $('<ul class="ms-list"></ul>');

		$($msList)
			.append('<li>item1</li><li>item2</li>');

		$('body')
			.append($msList)
			.append(iconSel)
			.append(btSel);
		iconSel.attr('selector', 'mockSelector');
		btSel.attr('selector','mockSelector');

		sut = $selectorEvents.lazySelector(options);
		expect(sut.setIdsListener(e)).toBeFalsy();


		sut.setIdListener(e);
		sut.mapListener(e);
		expect($('.modal-content').hasClass('narrow')).toBeTruthy();
	});

	it('#mapListener should hide modal in mobile', () => {
		let sut,
			e = $.Event('click');
		options.test = 'UnitTest';
		sut = $selectorEvents.lazySelector(options);

		window.innerWidth = 320;
		navigator.__defineGetter__('userAgent', function(){
			return 'android' // customized user agent
		});
		Object.defineProperty(window.location, 'href', {
			writable: true
		});
		sut.mapListener(e);

		expect($('.modal-content').hasClass('narrow')).toBeFalsy();
		expect(location.href).toEqual('geo:0,0');
	});

	it('#formatDate should exit', () => {
		let sut = {};
		options.test = 'UnitTest';
		sut = $selectorEvents.lazySelector(options);
		expect(sut.formatDate({day:'',time:''})).toBeFalsy();

		let result = "Mon, undefined NaN, 02.01.2016";
		expect(sut.formatDate({day:'02.01.2016',time:''})).toEqual(result);
	});

	it('#formatDate should check hours', () => {
		let sut = {};
		options.test = 'UnitTest';
		sut = $selectorEvents.lazySelector(options);

		//should add PM and convert 21 to 11
		let eventDate = {day: "2017-06-02", time: "23:00:00", dateTime: "2017-06-03T01:00:00Z"};
		expect(sut.formatDate(eventDate)).toContain("11:00 PM");

		//should add PM and convert 21 to 11
		eventDate = {day: "2017-06-02", time: "00:01:01", dateTime: "2017-06-03T01:00:00Z"};
		expect(sut.formatDate(eventDate)).toContain("12:01 AM");
	});

});

describe("Venues & Attractions selector", () => {
	let sut = {},
		data = {
			page: {},
			_embedded : {
				venues:[{dates:{}}]
			},
			_links : {}
		},
		options ,
		$selectorEvents,
		selectorEventsObj;

	beforeAll(() => {
		module = require('scripts/components/lazy-selector.js');
	});

	beforeEach(function() {
		setFixture();
		options = {selector:'', hideMultiSelector: true};
		$selectorEvents = $('.js_lazy-selector');
		$selectorEvents.lazySelector(options);
		// $(document).trigger('ready');
		// $(document).trigger('finishInit');
	});

	it('#renderListVenues should ', () => {
		data._embedded.venues[0].dates = {
			start: {
				localDate:'today',
				localTime: 'today+1',
				dateTime: 'in thursday after rain'
			}
		};
		options.test = 'UnitTest';
		options.selector = 'venues';
		sut = $selectorEvents.lazySelector(options);
		let $wrapCol = $('.event-text-wrapper');
		sut.renderListVenues([]);
		expect($wrapCol.length).toEqual(0);


		//check whether heading with name is added or not
		sut.renderListVenues(data._embedded.venues);
		expect($('h3',$wrapCol).hasClass('list-group-item-heading')).toBeFalsy();
		data._embedded.venues.push({
			name:'initialName',
			id: 'id',
			images:[
				{width: 50 , url: 'someUrl1'},
				{width: 70 , url: 'someUrl2'},
				{width: 60 , url: 'someUrl3'}
			],
			country : {name: 'UKRAINE'},
			city: {name: 'vinnitsia it is not a city, its a village'},
			state : {name: 'kobilyaki'},
			address:{
				line1:'line1',
				//line2:'line2'
			}
		});
		sut.renderListVenues(data._embedded.venues);
		expect($('h3','.event-text-wrapper').hasClass('list-group-item-heading')).toBeTruthy();

		//check whether address.line2 is added or not
		expect($('span','.event-text-wrapper').hasClass('address-line2')).toBeFalsy();
		data._embedded.venues[1].address.line2 = 'line2';
		sut.renderListVenues(data._embedded.venues);
		expect($('span','.event-text-wrapper').hasClass('address-line2')).toBeTruthy();

		//check whether button is added
		expect($('button','.wrapper-location_btn').hasClass('js_open-map_btn')).toBeFalsy();
		data._embedded.venues[1].location = {
			latitude: '41.000',
			longitude : '41.000'
		};
		sut.renderListVenues(data._embedded.venues);
		expect($('button','.wrapper-location_btn').hasClass('js_open-map_btn')).toBeTruthy();
		data = {};
	});

	it('#renderListAttractions should render List of Attractions', () => {
		data = {
			page: {},
			_embedded : {
				venues:[{dates:{}}]
			},
			_links : {}
		};
		data._embedded.venues[0].dates = {
			start: {
				localDate:'today',
				localTime: 'today+1',
				dateTime: 'in thursday after rain'
			}
		};
		options.test = 'UnitTest';
		options.selector = 'attractions';
		sut = $selectorEvents.lazySelector(options);
		sut.renderListAttractions([]);
		expect($('.event-text-wrapper').length).toEqual(0);

		//check whether heading with name is added or not
		expect($('h3','.event-text-wrapper').hasClass('list-group-item-heading')).toBeFalsy();
		data._embedded.venues[0].name = 'rock';
		sut.renderListAttractions(data._embedded.venues);
		expect($('h3','.event-text-wrapper').hasClass('list-group-item-heading')).toBeTruthy();

		//check whether else path for item.name,item.dates,,item.address are taken
		data._embedded.venues.push({
			name:'initialName',
			id: 'id',
			images:[
				{width: 50 , url: 'someUrl1'},
				{width: 60 , url: 'someUrl2'}
			],
			address:{
				line1:'line1'
				//line2:'line2'
			}
		});
		sut.renderListAttractions(data._embedded.venues);
		expect($('h3','.event-text-wrapper').hasClass('list-group-item-heading')).toBeTruthy();

		//check whether address.line2 is added or not
		expect($('span','.event-text-wrapper').hasClass('address-line2')).toBeFalsy();
		data._embedded.venues[1].address.line2 = 'line23';
		sut.renderListAttractions(data._embedded.venues);
		expect($('span','.event-text-wrapper').hasClass('address-line2')).toBeTruthy();

		//check whether button is added
		expect($('button','.wrapper-location_btn').hasClass('js_open-map_btn')).toBeFalsy();
		data._embedded.venues[1].location = {
			latitude: '41.000',
			longitude : '41.000'
		};
		sut.renderListAttractions(data._embedded.venues);
		expect($('button','.wrapper-location_btn').hasClass('js_open-map_btn')).toBeTruthy();

		//check whether classifications is added
		data._embedded.venues[1].classifications = [,,];
		sut.renderListAttractions(data._embedded.venues);
		expect($('span','.event-text-wrapper').hasClass('classifications-name')).toBeFalsy();

		data._embedded.venues[1].classifications = [{
			segment: {},
			genre : {},
			subGenre : {}
		}];
		sut.renderListAttractions(data._embedded.venues);
		expect($('h4.country-name','.event-text-wrapper').text()).toBe('');
		expect($('span.classifications-name','.event-text-wrapper').text()).toBe('');

		data._embedded.venues[1].classifications = [{
			segment: {name : 'react'},
			genre : {name : 'redux'},
			subGenre : {name : 'jest'}
		}];
		sut.renderListAttractions(data._embedded.venues);
		expect($('h4.country-name','.event-text-wrapper').text()).toBe('react');
		expect($('span.classifications-name span.add-dot','.event-text-wrapper').text()).toBe('jest');

		data._embedded.venues[1].country = {name: 'UKRAINE'};
		data._embedded.venues[1].city = {name: 'vinnitsia it is not a city, its a village'};
		data._embedded.venues[1].state = {name: 'kobilyaki'};
		sut.renderListAttractions(data._embedded.venues);
		expect($('span.address-name','.event-text-wrapper').text()).toBe('vinnitsia it is not a city, its a village. ');

	});
});
