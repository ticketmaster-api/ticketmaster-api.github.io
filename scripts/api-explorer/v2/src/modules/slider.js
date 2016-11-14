const config = {
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
				slidesToScroll: 1,
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

const config2 = {
	variableWidth: true,
	autoplay: false,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				variableWidth: true,
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 800,
			settings: {
				variableWidth: true,
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
};

function slick(times) {
	"use strict";
	var selector = '#slider-';

	for (var i = 0; i < times; i++) {
		$(selector + i).length && $(selector + i).slick(config);
	}
}

function unslick(times) {
	"use strict";

	for (var i = 0; i < times; i++) {
		var selector = '#slider-' + i;
		$(selector) && $(selector).length && $(selector).slick('unslick');
	}
	console.info('cleared');
}

module.exports = {
	set: slick,
	remove: unslick
};
