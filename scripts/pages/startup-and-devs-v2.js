'use strict';

(function($) {
	function initHeaderSlider($sliderRootElement) {
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
	}
	function initCardFlipper($cards) {
		$cards.each(function() {
			var me = $(this);
			me.hover(function() {
				me.toggleClass('applyflip');
			});
		});
	}
	function initGalleryGrid($grid) {
		$grid.masonry({
			itemSelector: '.grid-item',
			transitionDuration: '0.2s',
		});
	}
	function setEventListeners($rootTarget, $grid) {
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
	}
	function windowResizeAction($window, size, $cards) {
		$window.on('resize', function() {
			if (($window.width() <= size && $cards.hasClass('card')) ||
				($window.width() > size && !$cards.hasClass('card'))) {
				$cards.toggleClass('card static-card');
			}
		});
	}
	function setAutocompletion($grid) {
		var cols = 4;

		$grid.each(function () {
			var $itemsArr = $(this).find('.grid-item'),
				size = 0,
				count;

			$itemsArr.each(function () {
				var temp = $(this).attr('data-size').split('.');
				size += parseInt(temp[0], 10) * parseInt(temp[1], 10);
			});

			count = cols - size % cols;

			if (count > 0) {
				for (var i = 0; i < count; i++) {
					var elem = $itemsArr.eq(i % size).clone().attr('data-size', '1.1');
					$(this).append(elem);
				}
			}
		});

	}

	$(function () {
		var text = $('#tab-controlls > li.active').text(),
			$window = $(window),
			size = 1200,
			$sliderRootElement = $('#myCarousel'),
			$grid = $('.grid'),
			$cards = $('.card'),
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
		setAutocompletion($grid);
		initCardFlipper($('.card'));
		initGalleryGrid($grid);
		setEventListeners($(document), $grid);
		windowResizeAction($window, size, $('.card'));
	});
}($));
