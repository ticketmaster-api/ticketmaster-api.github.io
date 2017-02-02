'use strict';

(function($) {
	var initHeaderSlider = function ($sliderRootElement) {
		$sliderRootElement.slick({
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
	},
		initCardFlipper = function ($cards) {
			$cards.each(function() {
				var me = $(this);
				me.hover(function() {
					me.toggleClass('applyflip');
				});
			});
		},
		initGalleryGrid = function ($grid) {
			$grid.masonry({
				itemSelector: '.grid-item',
				transitionDuration: '0.2s',
			});
		},
		setEventListeners = function ($rootTarget, $grid) {
			$rootTarget
				.on('click touch', '#tab-dropdown li, #tab-controlls li', function(e) {
					var text = $(this)
						.find('.tab')
						.text(),
						$tab = $('.tab:contains("' + text + '")');

					$('#tab-dropdown li, #tab-controlls li')
						.removeClass('active')
						.find('.tab')
						.removeAttr('aria-expanded');

					$tab
						.attr('aria-expanded', true)
						.parent()
						.addClass('active');

					$('#tab-dropdown-label').text(text);

					$('#tab-dropdown').removeClass('open');
				})
				.on('click touch', '#gallery-show-more, #top-show-more', function(e) {
					e.stopPropagation();
					var selector = $(this).attr('aria-controls');
					$(selector).addClass('more');
					$(this).addClass('hide');
				})
				.on('click touch', '.btn-like:enabled', function(e) {
					e.stopPropagation();
					e.preventDefault();
					var count = $(this).parent('.like').find('.count');
					count.text(+count.text() + 1);
					$(this).attr('disabled', true);
				})
				.on('click touch', '.tab', function(e) {
					setTimeout(function() {
						$grid.masonry('layout');
					}, 0);
				})
				.on('click touch', '#tab-dropdown .tab', function(e) {
					var text = $(this).text();
					$('#tab-dropdown-label').text(text);
				});
		},
		windowResizeAction = function ($window, size, $cards) {
			$window.on('resize', function() {
				if (($window.width() <= size && $cards.hasClass('card')) ||
					($window.width() > size && !$cards.hasClass('card'))) {
					$cards.toggleClass('card static-card');
				}
			});
		};

	$(function () {
		var text = $('#tab-controlls > li.active').text(),
			$window = $(window),
			size = 1200,
			$sliderRootElement = $('#myCarousel'),
			$cards = $('.card'),
			$grid = $('.grid'),
			$tab;

		$('#tab-dropdown-label').text(text);

		if ($window.width() <= size) {
			$cards.toggleClass('card static-card');
			$tab = $('.tab:contains("' + text + '")');

			$tab
				.attr('aria-expanded', true)
				.parent()
				.addClass('active');
		}

		initHeaderSlider($sliderRootElement);
		initCardFlipper($cards);
		initGalleryGrid($grid);
		setEventListeners($(document), $grid);
		windowResizeAction($window, size, $cards);
	});
}($));
