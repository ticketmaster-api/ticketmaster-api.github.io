const $ = require('jquery');
window.$ = $;

var Slider = require('scripts/api-explorer/v2/src/modules/slider.js');

var sliderConfigControl = {
	dots: false,
	infinite: false,
	speed: 300,
	slidesToShow: 3,
	slidesToScroll: 1,
	autoplay: false,
	focusOnSelect: true,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				dots: true,
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 800,
			settings: {
				dots: true,
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
};

describe("Slider module spec", function() {
	var setFixture = () => {
		document.body.innerHTML =
			'<div id="slider-0"></div>' +
			'<div id="slider-1"></div>' +
			'<div id="slider-2"></div>';
	};

	beforeEach(() => {
		setFixture();
		$.fn.slick = jest.fn();
	});

	describe('When method "set" called', () => {
		it('should be init slick with config', () => {
			Slider.set(3);
			expect($.fn.slick).toBeCalledWith(sliderConfigControl);
			expect($.fn.slick.mock.calls.length).toBe(3);
		});
	});

	describe('When method "remove" called', () => {
		it('should be unslick items', () => {
			Slider.remove(3);
			expect($.fn.slick).toBeCalledWith('unslick');
			expect($.fn.slick.mock.calls.length).toBe(3);
		});
	});
});
