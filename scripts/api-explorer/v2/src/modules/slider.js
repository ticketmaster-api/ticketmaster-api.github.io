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

function slick(times) {
	"use strict";
	var selector = '#slider-';

	for (let i = 0; i < times; i++) {
		let slider = $(selector + i);
		if(slider.length) {
			slider.slick(config);
		}
	}
}

function unslick(times) {
	"use strict";

	for (let i = 0; i < times; i++) {
		let slider = $('#slider-' + i);
		slider.length && slider.slick('unslick');
	}
}

module.exports = {
	set: slick,
	remove: unslick
};
