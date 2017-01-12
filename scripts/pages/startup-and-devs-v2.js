'use strict';

(function($) {
	$('#myCarousel').slick({
		dots: true,
		lazyLoad: 'ondemand',
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 10000,
		fade: true,
		cssEase: 'linear',
	});

	$('.card').each(function() {
		let me = $(this);
		me.hover(function() {
			me.toggleClass('applyflip');
		});
	});

	let $grid = $('.grid').masonry({
		itemSelector: '.grid-item',
		transitionDuration: '0.2s',
	});

	let cards;

	$(document)
		.on('ready', function(e) {
			let text = $('#tab-controlls > li.active').text(),
				$window = $(window),
				size = 780;
			cards = $('.card');

			$('#tab-dropdown-label').text(text);

			if ($window.width() <= size) {
				cards.toggleClass('card static-card');
				let $tab = $('.tab:contains("' + text + '")');

				$tab
					.attr('aria-expanded', true)
					.parent()
					.addClass('active');
			}

			$window.on('resize', function() {
				if (($window.width() <= size && cards.hasClass('card')) ||
					($window.width() > size && !cards.hasClass('card'))) {
					cards.toggleClass('card static-card');
				}
			});
		})
		.on('click touch', '#tab-dropdown li, #tab-controlls li', function(e) {
			$('#tab-dropdown li, #tab-controlls li')
				.removeClass('active')
				.find('.tab')
				.removeAttr('aria-expanded');

			let text = $(this)
				.find('.tab')
				.text();

			let $tab = $('.tab:contains("' + text + '")');

			$tab
				.attr('aria-expanded', true)
				.parent()
				.addClass('active');

			$('#tab-dropdown-label').text(text);

			$('#tab-dropdown').removeClass('open');
		})
		.on('click touch', '#gallery-show-more, #top-show-more', function(e) {
			e.stopPropagation();
			e.preventDefault();
			let selector = $(this).attr('aria-controls');
			// $(selector).slideDown();
			$(selector).addClass('more');
			$(this).addClass('hide');
		})
		.on('click touch', '.btn-like:enabled', function(e) {
			e.stopPropagation();
			e.preventDefault();
			let count = $(this).parent('.like').find('.count');
			count.text(+count.text() + 1);
			$(this).attr('disabled', true);
		})
		.on('click touch', '.tab', function(e) {
			setTimeout(function() {
				$grid.masonry('layout');
			}, 0);
		})
		.on('click touch', '#tab-dropdown .tab', function(e) {
			let text = $(this).text();
			$('#tab-dropdown-label').text(text);
		});
}($));
