window.jQuery = window.$ = require('jquery');
window.apiKeyService = {
	checkApiKeyCookie : (name)=>{
		return [name+1,name+2] ;
	},
	getApiKeysCookie : (name)=>{
		return [name+1,name+2] ;
	},
	getApiExploreKey : (name)=>{
		return 'ApiExploreKey' ;
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


/*
var testObj = {
	ajaxFunction : function(url){
		$.ajax({url : url , data:'tr'}).done(this.successFunction.bind(this));
	},
	successFunction : function(data){
		console.log(data);
	}
};
describe('ajax test suite', function(){
	it('sample test', function(){
		testObj.ajaxFunction('https://app.ticketmaster.com/discovery/v2/events.json?apikey=2Qa4W67WwEiu8ZNXpMbmVX2IGvTMJtIG&keyword=tr&page=0');
		spyOn($, 'ajax').and.callFake(function(e) {
			return $.Deferred().resolve({'text':'this a a fake response'}).promise();
		});
		spyOn(testObj, 'successFunction').and.callThrough();
		testObj.ajaxFunction('https://app.ticketmaster.com/discovery/v2/events.json?apikey=2Qa4W67WwEiu8ZNXpMbmVX2IGvTMJtIG&keyword=tr&page=0');
		expect(testObj.successFunction).toHaveBeenCalledWith({'text':'this a a fake response'});
	});
});*/

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
		// $(document).trigger('ready');
		// $(document).trigger('finishInit');
	});

/*
	it("should get the content of an XML file", function(done)
	{
		var success = jasmine.createSpy('success');
		var error = jasmine.createSpy('error');		
		selectorEventsObj = $selectorEvents.lazySelector(options);
		$(document).trigger('ready');
		$(document).trigger('finishInit');
		// let $modal = $('#js_ls-modal'),
		// 	keyword = $('#keyword'),
		// 	$btnGET = $modal.find('#js_ls-modal_btn'),
		// 	form = $('#js_lazy-sel_form'),
		// 	isClassActive;
        //
		// keyword.val('zztop');
        //
		// var e = $.Event('keyup');
		// e.target = {tagName:'INPUT'}; // enter in
		// e.which = e.keyCode = 13; // enter in
		// form.get(0).checkValidity = function(){return true};
		// form.trigger(e);
		// form.get(0).checkValidity = function(){return false};
		// form.trigger(e);
		// isClassActive = form.hasClass('get-eventId_form-validation');

		success.and.callFake(function(xml_content)
		{
			expect(success).toHaveBeenCalled();
			console.log('xml_content' , xml_content);
//             getProduct(123, cb);

			// you can even do more tests with xml_content which is
			// the data returned by the success function of your AJAX call

			done(); // we're done, Jasmine can run the specs now
		});

		error.and.callFake(function()
		{
			// this will fail since success has not been called
			expect(error).toHaveBeenCalled();

			// If you are happy about the fact that error has been called,
			// don't make it fail by using expect(error).toHaveBeenCalled();

			done(); // we're done
		});

		$.ajax({
			type : "GET",
			url : "addressbook_files/addressbookxml.xml",
			dataType : "xml",
			data:"zzTop",
			success : success,
			error : error
		});
	});
*/

	it('#changeModalTextListener should change text', () => {
		let sut = {},
			isLowHeight,
			isHidden;
		options.test = 'UnitTest';
		sut = $selectorEvents.lazySelector(options);
		sut.changeModalTextListener();
		isLowHeight = $('.wrapper-list-group', '#js_ls-modal').hasClass('low-height');
		isHidden = $('.ms-selection').hasClass('hidden-xs');
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

	it('#renderResults should call renderListEvents when selector="events"', () => {
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
	});

});

describe("Venues selector", () => {

});
