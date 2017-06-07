window.jQuery = window.$ = require('jquery');
require('scripts/components/numeric-input.js');

let setFixture = () => {
	document.body.innerHTML =
		`<input class="js_numeric_input" type="number" value="12" max="55" min="10" required="" data-float="true">`;
	};

describe("numeric input", () => {
	var options , sutElement;
	beforeAll(() => {
		setFixture();
		options = {};
		sutElement = $('.js_numeric_input').checkNumeric();
	});

	it('#applicationSelect should be defined', () => {
		expect(sutElement).toBeDefined();
	});

	it('should has top/bottom arrow', () => {
		expect(
			$('.js_numeric-input-group span').hasClass('arrow__inc')
			&& $('.js_numeric-input-group span').hasClass('arrow__dec')
		).toBeTruthy();
	});

	it('should increase Integer value', () => {
		var el = document.querySelector(".js_numeric_input");
		$('.arrow__inc').trigger('click');
		expect(parseInt(el.value)).toEqual(13);
	});

	it('should decrease Float value', () => {
		var el;
		document.body.innerHTML = '';
		setFixture();
		$('.js_numeric_input').checkNumeric({floatVal:true});
		el = document.querySelector(".js_numeric_input");
		el.value = 54.1;
	 	$('.arrow__dec').trigger('click');
		expect(parseFloat(el.value)).toEqual(53.1);
	});

	it('#checkValue should set value less then defined max', () => {
		var el;
		document.body.innerHTML = `<input class="js_numeric_input" type="number" max="55" min="10" required="" step="1">`;
		$('.js_numeric_input').checkNumeric({floatVal:true});
		el = document.querySelector(".js_numeric_input");
		el.value = 154.1;
	  $('.arrow__dec').trigger('click');
		expect(parseFloat(el.value)).toEqual(55);
	});

	it('#checkValue should set value more then defined min', () => {
		var el;
		document.body.innerHTML = '';
		setFixture();
		$('.js_numeric_input').checkNumeric({floatVal:true});
		el = document.querySelector(".js_numeric_input");
		el.value = 1;
	  $('.arrow__dec').trigger('click');
		expect(parseFloat(el.value)).toEqual(10);
	});

	it('#incBtn should addClass disabled', () => {
		var el,
			newMaxValue = parseInt($('.js_numeric_input').attr('max')) + 1,
			incArrow = $('.arrow__inc');
		document.body.innerHTML = '';
		setFixture();
		$('.js_numeric_input').checkNumeric({floatVal:true});
		el = document.querySelector(".js_numeric_input");
		el.value = newMaxValue;

		$('.arrow__dec').addClass('disabled');
		expect(typeof ($('.arrow__dec').trigger('click')) ).toBe(typeof {}); //else path

		$('.arrow__inc').trigger('click');
		expect(incArrow.hasClass('disabled')).toBeFalsy();

		$('.arrow__inc').trigger('click');
		expect($('.arrow__inc').hasClass('disabled')).toBeTruthy();
	});

	it('should init plugin', () => {
		document.body.innerHTML = `<input class="js_numeric_input" type="number" value="12" required="" step="1" data-float="true" disabled>`;
		$(document).trigger('ready');
		let el = document.querySelector(".js_numeric_input");
		expect(parseFloat(el.value)).toEqual(12);
	});

});
