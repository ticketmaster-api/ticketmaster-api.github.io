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

window.$jstree = {
	jstree : jest.fn((val) => {val}),
	removeAttr : jest.fn((val) => {val})
};

let setFixture = () => {
	document.body.innerHTML = `
		<input type="text" id="w-classificationid" name="w-classificationname" value="" class="js_lazy-selector-classification">
		<!--modal-->
		<div class="modal modal-common fade" id="js_ls-modal-classification" tabindex="-1" role="dialog">
			<div class="modal-dialog">
					<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
						<div class="row">
							<h3 class="modal-title col-lg-12">Classification Selection</h3>
						</div>
					</div>
					<div class="modal-body">
					<div class="row">
						<form id="js_lazy-sel_form" accept-charset="UTF-8"  method="GET">
							<div class="col-sm-9 clear-padding-right">
								<input id="keyword" placeholder="keyword" autofocus class="search-input"/>
							</div>
							<div class="col-sm-3 text-right">
								<button id="js_classification-modal_btn" type="button" class="btn btn-transparent">GET</button>
							</div>
						</form>
					</div>
					<div id="spinner-ls" style="display: none;"></div>
					<div class="top-hr"></div>
					<div id="classification-jstree"></div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal-dialog -->
		</div><!-- /.modal -->
		</div>	
		`;
	};


describe("Classification selector", () => {
	var options , optionsTest, sut;

	beforeAll(() => {
		module = require('scripts/components/classification-selector.js');
	});

	beforeEach(function() {
		setFixture();
		options = {selector:'classifications', use:'id'};
		optionsTest = {selector:'classifications', use:'id', test:'UnitTest'};
		sut = $('#w-classificationid').classificationSelector(options);
	});

	it('System under test (sut) should be defined', () => {
		expect(sut).toBeDefined();
		expect($('#js_ls-modal-classification').length).toBe(1);
		let iconBtn = $('#get-classifications-id');
		expect(iconBtn.length).toBe(1);
	});

	it('iconBtn should call changeModalTextListener', () => {
		let iconBtn = $('#get-classifications-id');
		iconBtn.trigger('click');
		expect($('#spinner-ls').css('display')).toEqual('none');
	});

	it('$form event should removeClass narrow & submitForm', () => {
		let e = new $.Event('keyup'),
			$form = $('#js_lazy-sel_form');
		e.target = {tagName : "INPUT"};
		e.keyCode  = 13;
		$form.get(0).checkValidity = function(){return true};
		let $btnGET = $('#js_classification-modal_btn'),
			$iconButton = $('#get-'+options.selector+'-'+options.use+'');
		$btnGET.attr('data-selector','hoo');
		$iconButton.attr('data-selector','hoo');
		$form.trigger(e);
		expect($('.modal-content').hasClass('narrow')).toBeFalsy();
		expect($('#spinner-ls').css('display')).toEqual('block');
	});

	it('$form event should removeClass narrow & not submitForm', () => {
		let e = new $.Event('keyup'),
			$form = $('#js_lazy-sel_form');

		e.target = {tagName : "INPUT"};
		e.keyCode  = 13;
		$form.trigger(e);
		expect($('.modal-content').hasClass('narrow')).toBeFalsy();
		expect($('#spinner-ls').css('display')).toEqual('none');
	});

	it('$form event should not submitForm when checkValidity is false', () => {
		let e = new $.Event('keyup'),
			$form = $('#js_lazy-sel_form');
		e.target = {tagName : "INPUT"};
		e.keyCode  = 13;
		$form.get(0).checkValidity = function(){return false};
		let $btnGET = $('#js_classification-modal_btn'),
			$iconButton = $('#get-'+options.selector+'-'+options.use+'');
		$btnGET.attr('data-selector','hoo');
		$iconButton.attr('data-selector','hoo');
		$form.trigger(e);
		expect($('#spinner-ls').css('display')).toEqual('none');
	});

	it('$form event should not removeClass narrow', () => {
		let e = new $.Event('keyup'), e1 = new $.Event('keyup'),
			$form = $('#js_lazy-sel_form');
		e.target = {tagName : "INPUT"};
		e.keyCode  = 133;
		$form.trigger(e);
		e1.target = {tagName : "IN"};
		$form.trigger(e1);
		expect($('.modal-content').hasClass('narrow')).toBeFalsy();
	});

	it('$form submit event should call preventDefault', () => {
		let e1 = new $.Event('submit'),
			$form = $('#js_lazy-sel_form');

		expect(e1.isDefaultPrevented()).toBeFalsy();
		$form.trigger(e1);
		expect(e1.isDefaultPrevented()).toBeTruthy();
	});

	it('$btnGET should preventDefault on click', () => {
		let e1 = new $.Event('click'),
			$btnGET = $('#js_classification-modal_btn');
		expect(e1.isDefaultPrevented()).toBeFalsy();
		$btnGET.trigger(e1);
		expect(e1.isDefaultPrevented()).toBeTruthy();
	});

	it('$btnGET should show loader & submitForm() on click', () => {
		let e1 = new $.Event('click'),
			$btnGET = $('#js_classification-modal_btn'),
			$iconButton = $('#get-'+options.selector+'-'+options.use+'');

		$btnGET.attr('data-selector','hoo');
		$iconButton.attr('data-selector','hoo');
		$('#js_lazy-sel_form').get(0).checkValidity = function(){return true};
		$btnGET.trigger(e1);
		$btnGET.trigger(e1); //to trigger $btnGET.is(':disabled')
		expect($('#spinner-ls').css('display')).toEqual('block');
	});

	it('$btnGET should show loader & submitForm() on click', () => {
		let e1 = new $.Event('click'),
			form = $('#js_lazy-sel_form'),
			cssValidationClass = 'get-eventId_form-validation',
			$btnGET = $('#js_classification-modal_btn'),
			$iconButton = $('#get-'+options.selector+'-'+options.use+'');

		$btnGET.attr('data-selector','hoo');
		$iconButton.attr('data-selector','hoo');
		form.get(0).checkValidity = function(){return false};
		$btnGET.trigger(e1);
		expect($('#spinner-ls').css('display')).toEqual('none');
		expect(form.hasClass(cssValidationClass)).toEqual(true);
	});

	it('$btnGET should show loader & submitForm() on click', () => {
		let e = new $.Event('click'),
			form = $('#js_lazy-sel_form'),
			cssValidationClass = 'get-eventId_form-validation',
			$btnGET = $('#js_classification-modal_btn'),
			$iconButton = $('#get-'+options.selector+'-'+options.use+'');

		$btnGET.attr('data-selector','hoo');
		$iconButton.attr('data-selector','hoo');
		form.get(0).checkValidity = function(){return false};
		form.get(0).reportValidity = jest.fn(() => {true});
		$btnGET.trigger(e);
		expect(form.get(0).reportValidity).toBeCalled();
	});

	/*
	it('should hidden modal window and set empty keywordInput value', () => {
		let $modal = $('#js_ls-modal-classification');
		window.$jstree = {
			jstree : jest.fn((val) => {val}),
			removeAttr : jest.fn((val) => {val})
		};

		$jstree.jstree = jest.fn((val) => {val});
		console.log($jstree);
		$modal.trigger('hidden.bs.modal');
		let  keyword = $('#keyword');
		expect(keyword.val()).toEqual('');
	});
	*/

});


describe("Classification selector test methods", () => {
	var optionsTest, sut;

	beforeAll(() => {
		module = require('scripts/components/classification-selector.js');
	});

	beforeEach(function() {
		setFixture();
		optionsTest = {selector:'classifications', use:'id', test:'UnitTest'};
		sut = $('#w-classificationid').classificationSelector(optionsTest);
	});

	it('System under test (sut) should be defined', () => {
		expect(sut).toBeDefined();
		expect($('#js_ls-modal-classification').length).toBe(1);
	});

	it('#changeModalTextListener should prepare json for jstree', () => {
	 let sut = $('#w-classificationid').classificationSelector(optionsTest);
	 sut.changeModalTextListener();
		let $btnGET = $('#js_classification-modal_btn');
	 expect($btnGET.attr('data-selector')).toEqual(optionsTest.selector);
	 });

	it('#hasScrollBar should check ScrollBar visibility', () => {
		expect(sut.hasScrollBar($('#js_lazy-sel_form'))).toBeFalsy();
	});

	it('#setIdListener should ', () => {
		$.fn.modal = jest.fn();
		let e = $.Event('click');
		e.target = {
			getAttribute: (val)=>{ val+'testAttr' }
		};
		sut.setIdListener(e);
		expect($.fn.modal).toBeCalled();
	});

	it('#renderResults should show No results found msg', () => {
		let mData = {},mUL = $('#classification-jstree'),mErrorMsg = 'Ahtung!';
		let result = sut.renderResults(mData,mUL,mErrorMsg);
		sut.renderResults({_embedded:"test"},mUL,mErrorMsg);
		sut.renderResults('FAIL',mUL,{responseJSON :{errors:[{status:'testErStatus'}]}}); //brunch when not null

		expect($('.error-box').length).toEqual(1);
		expect(result).toBeFalsy();
	});

	it('#setChildren should rename segment to children', () => {
		let json = [{"segment":{"id":"KZFzniwnSyZfZ7v7nJ","name":"Music","_links":{"self":{"href":"/discovery/v2/classifications/segments/KZFzniwnSyZfZ7v7nJ?locale=en-us"}},"_embedded":{"genres":[{"id":"KnvZfZ7vAvv","name":"Alternative","_links":{"self":{"href":"/discovery/v2/classifications/genres/KnvZfZ7vAvv?locale=en-us"}},"_embedded":{"subgenres":[{"id":"KZazBEonSMnZfZ7vAvE","name":"Adult Alternative Pop/Rock","_links":{"self":{"href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vAvE?locale=en-us"}}},{"id":"KZazBEonSMnZfZ7vAvJ","name":"Alternative","_links":{"self":{"href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vAvJ?locale=en-us"}}},{"id":"KZazBEonSMnZfZ7vAvI","name":"Alternative Dance","_links":{"self":{"href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vAvI?locale=en-us"}}},{"id":"KZazBEonSMnZfZ7vAvt","name":"Alternative Metal","_links":{"self":{"href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vAvt?locale=en-us"}}}]}},{"id":"KnvZfZ7vAve","name":"Ballads/Romantic","_links":{"self":{"href":"/discovery/v2/classifications/genres/KnvZfZ7vAve?locale=en-us"}},"_embedded":{"subgenres":[{"id":"KZazBEonSMnZfZ7vAAe","name":"Ballads/Romantic","_links":{"self":{"href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vAAe?locale=en-us"}}}]}},{"id":"KnvZfZ7vAvA","name":"Chanson Francaise","_links":{"self":{"href":"/discovery/v2/classifications/genres/KnvZfZ7vAvA?locale=en-us"}},"_embedded":{"subgenres":[{"id":"KZazBEonSMnZfZ7vAFk","name":"Chanson Francaise","_links":{"self":{"href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vAFk?locale=en-us"}}}]}}]}}}],
			newArrObj = [{"children": [{"_links": {"self": {"href": "/discovery/v2/classifications/genres/KnvZfZ7vAvv?locale=en-us"}}, "children": [{"_links": {"self": {"href": "/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vAvE?locale=en-us"}}, "id": "KZazBEonSMnZfZ7vAvE", "name": "Adult Alternative Pop/Rock", "text": "Adult Alternative Pop/Rock"}, {"_links": {"self": {"href": "/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vAvJ?locale=en-us"}}, "id": "KZazBEonSMnZfZ7vAvJ", "text": "Alternative"}, {"_links": {"self": {"href": "/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vAvI?locale=en-us"}}, "id": "KZazBEonSMnZfZ7vAvI", "text": "Alternative Dance"}, {"_links": {"self": {"href": "/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vAvt?locale=en-us"}}, "id": "KZazBEonSMnZfZ7vAvt", "text": "Alternative Metal"}], "id": "KnvZfZ7vAvv", "text": "Alternative"}, {"_links": {"self": {"href": "/discovery/v2/classifications/genres/KnvZfZ7vAve?locale=en-us"}}, "children": [{"_links": {"self": {"href": "/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vAAe?locale=en-us"}}, "id": "KZazBEonSMnZfZ7vAAe", "name": "Ballads/Romantic", "text": "Ballads/Romantic"}], "id": "KnvZfZ7vAve", "text": "Ballads/Romantic"}, {"_links": {"self": {"href": "/discovery/v2/classifications/genres/KnvZfZ7vAvA?locale=en-us"}}, "children": [{"_links": {"self": {"href": "/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vAFk?locale=en-us"}}, "id": "KZazBEonSMnZfZ7vAFk", "name": "Chanson Francaise", "text": "Chanson Francaise"}], "id": "KnvZfZ7vAvA", "text": "Chanson Francaise"}], "id": "KZFzniwnSyZfZ7v7nJ", "text": "Music"}];
		sut = $('#w-classificationid').classificationSelector(optionsTest);
		let result = sut.setChildren(json);
		expect(result).toEqual(newArrObj);
	});

	it('#replaceAtoB should set data-selector for "GET" button', () => {
	 let json = [{"segment":{"id":"KZFzniwnSyZfZ7v7nJ","name":"Music","_links":{"self":{"href":"/discovery/v2/classifications/segments/KZFzniwnSyZfZ7v7nJ?locale=en-us"}},"_embedded":{"genres":[{"id":"KnvZfZ7vAvv","name":"Alternative","_links":{"self":{"href":"/discovery/v2/classifications/genres/KnvZfZ7vAvv?locale=en-us"}},"_embedded":{"subgenres":[{"id":"KZazBEonSMnZfZ7vAvE","name":"Adult Alternative Pop/Rock","_links":{"self":{"href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vAvE?locale=en-us"}}},{"id":"KZazBEonSMnZfZ7vAvJ","name":"Alternative","_links":{"self":{"href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vAvJ?locale=en-us"}}},{"id":"KZazBEonSMnZfZ7vAvI","name":"Alternative Dance","_links":{"self":{"href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vAvI?locale=en-us"}}},{"id":"KZazBEonSMnZfZ7vAvt","name":"Alternative Metal","_links":{"self":{"href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vAvt?locale=en-us"}}}]}},{"id":"KnvZfZ7vAve","name":"Ballads/Romantic","_links":{"self":{"href":"/discovery/v2/classifications/genres/KnvZfZ7vAve?locale=en-us"}},"_embedded":{"subgenres":[{"id":"KZazBEonSMnZfZ7vAAe","name":"Ballads/Romantic","_links":{"self":{"href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vAAe?locale=en-us"}}}]}},{"id":"KnvZfZ7vAvA","name":"Chanson Francaise","_links":{"self":{"href":"/discovery/v2/classifications/genres/KnvZfZ7vAvA?locale=en-us"}},"_embedded":{"subgenres":[{"id":"KZazBEonSMnZfZ7vAFk","name":"Chanson Francaise","_links":{"self":{"href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vAFk?locale=en-us"}}}]}}]}}}],
		jsonConverted = [{"segment":{"id":"KZFzniwnSyZfZ7v7nJ","_links":{"self":{"href":"/discovery/v2/classifications/segments/KZFzniwnSyZfZ7v7nJ?locale=en-us"}},"_embedded":{"genres":[{"id":"KnvZfZ7vAvv","_links":{"self":{"href":"/discovery/v2/classifications/genres/KnvZfZ7vAvv?locale=en-us"}},"_embedded":{"subgenres":[{"id":"KZazBEonSMnZfZ7vAvE","name":"Adult Alternative Pop/Rock","_links":{"self":{"href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vAvE?locale=en-us"}},"text":"Adult Alternative Pop/Rock"},{"id":"KZazBEonSMnZfZ7vAvJ","_links":{"self":{"href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vAvJ?locale=en-us"}},"text":"Alternative"},{"id":"KZazBEonSMnZfZ7vAvI","_links":{"self":{"href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vAvI?locale=en-us"}},"text":"Alternative Dance"},{"id":"KZazBEonSMnZfZ7vAvt","_links":{"self":{"href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vAvt?locale=en-us"}},"text":"Alternative Metal"}]},"text":"Alternative"},{"id":"KnvZfZ7vAve","_links":{"self":{"href":"/discovery/v2/classifications/genres/KnvZfZ7vAve?locale=en-us"}},"_embedded":{"subgenres":[{"id":"KZazBEonSMnZfZ7vAAe","name":"Ballads/Romantic","_links":{"self":{"href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vAAe?locale=en-us"}},"text":"Ballads/Romantic"}]},"text":"Ballads/Romantic"},{"id":"KnvZfZ7vAvA","_links":{"self":{"href":"/discovery/v2/classifications/genres/KnvZfZ7vAvA?locale=en-us"}},"_embedded":{"subgenres":[{"id":"KZazBEonSMnZfZ7vAFk","name":"Chanson Francaise","_links":{"self":{"href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vAFk?locale=en-us"}},"text":"Chanson Francaise"}]},"text":"Chanson Francaise"}]},"text":"Music"}}];

		sut = $('#w-classificationid').classificationSelector(optionsTest);
	 let result = sut.rename(json);
	 expect(result).toEqual(jsonConverted);

		let jsonNoEmbedded = [{"segment":{"id":"KZFzniwnSyZfZ7v7nJ","name":"Music","_links":{"self":{"href":"/discovery/v2/classifications/segments/KZFzniwnSyZfZ7v7nJ?locale=en-us"}}}}],
			jsonNoEmbeddedConv = [{"segment":{"id":"KZFzniwnSyZfZ7v7nJ","text":"Music","_links":{"self":{"href":"/discovery/v2/classifications/segments/KZFzniwnSyZfZ7v7nJ?locale=en-us"}}}}],
			resultNoEmbedded = sut.rename(jsonNoEmbedded);

		expect(resultNoEmbedded).toEqual(jsonNoEmbeddedConv);

		let jsonNoSubgenres = [{"segment":{"id":"KZFzniwnSyZfZ7v7nJ","name":"Music","_links":{"self":{"href":"/discovery/v2/classifications/segments/KZFzniwnSyZfZ7v7nJ?locale=en-us"}},"_embedded":{"genres":[{"id":"KnvZfZ7vAvv","name":"Alternative","_links":{"self":{"href":"/discovery/v2/classifications/genres/KnvZfZ7vAvv?locale=en-us"}}}]}}}],
			jsonNoSubgenresConv = [{"segment":{"id":"KZFzniwnSyZfZ7v7nJ","text":"Music","_links":{"self":{"href":"/discovery/v2/classifications/segments/KZFzniwnSyZfZ7v7nJ?locale=en-us"}},"_embedded":{"genres":[{"id":"KnvZfZ7vAvv","text":"Alternative","_links":{"self":{"href":"/discovery/v2/classifications/genres/KnvZfZ7vAvv?locale=en-us"}}}]}}}],
			resultNoSubgenres = sut.rename(jsonNoSubgenres);
		expect(resultNoSubgenres).toEqual(jsonNoSubgenresConv);
	 });

	it('#submitForm should set btnGET disabled', () => {
		sut = $('#w-classificationid').classificationSelector(optionsTest);
		sut.submitForm(true);
		sut.submitForm();
		expect($('#js_classification-modal_btn').is('[disabled=disabled]')).toBeFalsy();
		expect($('#spinner-ls').css('display')).toEqual('none');
	});

	it('#resetForm should called', () => {
		let data = {
			page: { totalElements : 1}
		};
		sut = $('#w-classificationid').classificationSelector(optionsTest);
		sut.ajaxDone();//show console
		sut.ajaxDone(data);
		let notbreak = sut.ajaxDone(data);
		expect(notbreak).toBeUndefined();

		notbreak = sut.ajaxDone({page: { totalElements : 0}});
		expect(notbreak).toBeFalsy();
		expect($('#spinner-ls').css('display')).toEqual('none');
	});

});

describe('ajax test suite', function(){

	var testObj = {
		ajaxFunction : function(url){
			$.ajax({url : url , data:'tr'}).done(this.successFunction.bind(this));
		},
		successFunction : function(data){
			sut = $('#w-classificationid').classificationSelector(optionsTest);
			sut.ajaxDone(data);
			expect($('#spinner-ls').css('display')).toEqual('none');
		}
	};
	var optionsTest, sut;

	beforeAll(() => {
		module = require('scripts/components/classification-selector.js');
	});

	beforeEach(function() {
		setFixture();
		optionsTest = {selector:'classifications', use:'id', test:'UnitTest'};
		sut = $('#w-classificationid').classificationSelector(optionsTest);
	});

	it('#ajaxDone test', function(){
		testObj.ajaxFunction('https://app.ticketmaster.com/discovery/v2/events.json?apikey=2Qa4W67WwEiu8ZNXpMbmVX2IGvTMJtIG&keyword=tr&page=0');
		spyOn($, 'ajax').and.callFake(function(e) {
			return $.Deferred().resolve( {page: { totalElements : 0}} ).promise();
		});
		spyOn(testObj, 'successFunction').and.callThrough();
		testObj.ajaxFunction('https://app.ticketmaster.com/discovery/v2/events.json?apikey=2Qa4W67WwEiu8ZNXpMbmVX2IGvTMJtIG&keyword=tr&page=0');
		expect(testObj.successFunction).toHaveBeenCalledWith({page: { totalElements : 0}});
	});
});
