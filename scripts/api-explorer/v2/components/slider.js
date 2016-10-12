module.exports = function (selector) {
	"use strict";
``
	$(selector).slick({
		dots: false,
		infinite: false,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 1,
		variableWidth: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					variableWidth: true,
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: false,
					dots: false
				}
			},
			{
				breakpoint: 678,
				settings: {
					variableWidth: true,
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					centerMode: true,
					variableWidth: true,
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	// $(selector).find('button.slick-prev').trigger('click');
};
