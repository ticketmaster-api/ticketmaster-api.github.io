function slick(times) {
	"use strict";
	var selector = '#slider-';
	
	for (var i = 0; i < times; i++) {
		$(selector + i).slick({
			dots: false,
			infinite: false,
			speed: 300,
			slidesToShow: 3,
			slidesToScroll: 1,
			variableWidth: true,
			autoplay: false,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						variableWidth: true,
						slidesToShow: 2,
						slidesToScroll: 1,
						infinite: false,
						dots: false
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
		});
	}
}

function unslick(times) {
	"use strict";
	var selector = '#slider-';
	
	for (var i = 0; i < times; i++) {
		$(selector + i).slick('unslick');
	}
	console.log('cleared');
}

module.exports = {
	set: slick,
	remove: unslick
};
