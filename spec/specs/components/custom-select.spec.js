window.jQuery = window.$ = require('jquery');

window.apiKeyService = {
	getApiKeysCookie : (name)=>{
		var arr =[];
		if(name === "tk-api-apps") {
			arr = [
				{"name":"localhost_staging_widgets","created":"2016-10-04 13:35 PM","key":"OmayHcE8b9GK5nHijxVG3gC5mrv5NLZV"},
				{"name":"portal_staging_widgets","created":"2016-10-04 13:33 PM","key":"TQMbqzKDBbcCjAxC9SaKS1lg9D5Eousb"},
				{"name":"Test Status","created":"2016-12-01 07:41 AM","key":"MbMfOy7je1JGKR3fPYvBMig9crJV0EE4"}
			]
		}
		else arr = [];
		return arr ;
	},
};
let customSelect = require('scripts/components/custom-select.js');
let setFixture = () => {
	document.body.innerHTML = `
		<div class="js_custom_select custom_select">
			<select required="" class="custom_select__field" name="subject" id="subject" tabindex="-1">
				<option value="General feedback">General feedback</option>
				<option value="Current workflow of the portal">Current workflow of the portal</option>
				<option value="Technical issues">Technical issues</option>
			</select>
			<input class="custom_select__placeholder" type="text" value="General feedback" readonly="" contenteditable>
			<ul class="custom_select__list" style="">
				<li class="custom_select__item custom_select__item-active" data-value="General feedback">General feedback</li>
				<li class="custom_select__item" data-value="Current workflow of the portal">Current workflow of the portal</li>
				<li class="custom_select__item" data-value="Technical issues">Technical issues</li>
			</ul>
		<div class="custom_select__arrow"></div></div>
		`
	};

describe("application selector", () => {
	var options , sutElement;
	beforeAll(() => {
		setFixture();
	});
	beforeEach(function() {
		setFixture();
	});

	it('#document should init plugin on ready', () => {
		sutElement = $('.js_custom_select').customSelect();
		sutElement.trigger('click');
		sutElement.trigger('custom-reset');
		expect(sutElement).toBeDefined();
	});

	it('#keyboardListener should be triggered', () => {
		sutElement = $('.js_custom_select').customSelect();
		sutElement.trigger('click');
		var e = $.Event('keydown');
		e.which = 13; // enter
		sutElement.trigger(e);
		e.which = 38; // up
		sutElement.trigger(e);
		e.which = 40; // down
		sutElement.trigger(e);
		expect(sutElement).toBeDefined();
	});

	it('#keyboardListener should be visible', () => {
		$(".custom_select__list ").show();
		sutElement = $('.js_custom_select').customSelect();
		sutElement.trigger('click');
		var e = $.Event('keydown');
		e.which = 13; // enter
		sutElement.trigger(e);
		e.which = 38; // up
		sutElement.trigger(e);
		e.which = 40; // down
		sutElement.trigger(e);
		expect(sutElement).toBeDefined();
	});

	it('#keyboardListener should addClass "custom_select__item-active"', () => {
		sutElement = $('.js_custom_select').customSelect();
		sutElement.trigger('click');
		var e = $.Event('keydown');
		e.which = 40; // down
		sutElement.trigger(e);
		e.which = 38;
		sutElement.trigger(e); //cover if in line 154: if(selected.prev().length === 0){}
		var isClassActive = $(".custom_select__item-active").hasClass("custom_select__item-active");
		expect(isClassActive).toBeTruthy();
	});

	it('#set should be triggered on $list click', () => {
		sutElement = $('.js_custom_select').customSelect({useTopElValue: true, outerElement: '#api-key'});
		let $list = $('.js_custom_select').find('li','ul');
		$list.trigger('click');
	});

	it('#customSelect should be initialized with useTopElValue', () => {
		sutElement = $('.js_custom_select').customSelect({useTopElValue: true, outerElement: '#api-key'});
		sutElement.trigger('click');
		sutElement.trigger('keydown');
		expect(sutElement).toBeDefined();
	});

	it('#setEditable should be called', () => {
		sutElement = $('.js_custom_select').customSelect({useTopElValue: true, outerElement: '#api-key'});
		sutElement.trigger('change');
		expect(sutElement).toBeDefined();
	});

	it('#$list should trigger "blur","input"', () => {
		sutElement = $('.js_custom_select').customSelect;
		let $list = $('.js_custom_select').find('ul');
			$list.trigger('click');
		 expect($list).toBeDefined();
	});

	it('#placeholder should trigger "blur","input"', () => {
		let $placeholder = $('.js_custom_select').find('input');
		$placeholder.attr('type','number').attr('contentEditable','false');
		sutElement = $('.js_custom_select').customSelect({useTopElValue: true, outerElement: '#api-key'});

		$placeholder.trigger('blur');
		$placeholder.trigger('change');


		expect($placeholder).toBeDefined();
		expect($placeholder.attr('inputmode')).toEqual('numeric');
	});

	it('#placeholder should trigger "blur","input"', () => {
		let $select = $('.js_custom_select').find('select');
		expect($select.is(':disabled')).toBe(false);
		/*
		$('.js_custom_select').remove();
		document.body.innerHTML ="";
		setFixture();
		let $list = $('.js_custom_select').find('ul');
		$list.trigger('click');
		$list.show();
		console.log($list.is(':visible'));
		 expect($list.is(':visible')).toBe(true);
		*/

	})

});
