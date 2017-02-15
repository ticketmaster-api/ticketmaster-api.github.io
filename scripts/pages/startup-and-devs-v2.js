'use strict';

(function($) {
	const GALLERY_SLIDER_CONFIG = {
		dots: false,
		arrows: false,
		lazyLoad: 'ondemand',
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		fade: false,
		cssEase: 'linear'
	};
	const HEADER_SLIDER_CONFIG = {
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
	};
	const GALLERY_LAYOUT_CONFIG = {
		stagger: 30,
		itemSelector: '.grid-item',
		transitionDuration: '0.2s'
	};
	let rows;
	let cols;
	let initialWindowWidth;
	
	function initSlider($sliderRootElement, config) {
		$sliderRootElement.length && $sliderRootElement.slick(config);
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
		$grid.masonry(GALLERY_LAYOUT_CONFIG);
	}
	function setEventListeners($rootTarget) {
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
			.on('click touch', '#gallery-show-more', function(e) {
				e.stopPropagation();
				
				$('.grid.slick-initialized').slick('unslick');
				
				var selector = $(this).attr('aria-controls');
				$(selector).addClass('more');
				$(this).addClass('hide');
			})
			.on('click touch', '#top-show-more', function(e) {
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
					$('.grid.slick-initialized').slick('unslick');
					$('.gallery-slide')
						.masonry('layout')
						.on( 'layoutComplete', function() {
							initSlider($('.active .grid:not(.slick-initialized)'), GALLERY_SLIDER_CONFIG);
						});
						
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
		var grid = cols * rows;

		$grid.each(function () {
			var $itemsArr = $(this).find('.grid-item'),
				$currentGrid = $(this),
				size = 0,
				height = 0,
				width = 0,
				count = 1,
				slide = $('<section class="gallery-slide"/>'),
				curSlide;
			
			$itemsArr.each(function (index) {
				var $card = $(this),
					width,
					height;
				
				// first slide container
				if (!index) {
					curSlide = slide.clone(); //new slide
					$currentGrid.append(curSlide); //slide appending to slider container
				}
				
				// if mobile (1x1) size
				if (initialWindowWidth <= 797) {
					if (!(index % grid) && index !== 0) {
						curSlide = slide.clone(); //new slide
						$currentGrid.append(curSlide); //slide appending to slider container
					}
					curSlide.append($card);
					return;
				}
				
				switch(index) {
					case 0:
					case 15:
					case 20:
						width = 1;
						height = 2;
						break;
					case 1:
					case 8:
					case 16:
						width = 2;
						height = 1;
						break;
					default:
						width = 1;
						height = 1;
				}
				
				$card.size = width * height;
				size += $card.size;
				
				$card.attr('data-size', `${width}.${height}`);
				
				if (size <= grid) { // slide/frame free space check
					curSlide.append($card); //add item to slide
					count = true;
				} else {
					if (count) {
						curSlide = slide.clone(); // new slide
						$currentGrid.append(curSlide); //slide appending to slider container
						count = false;
					}
					size = size - grid; // empty slots of prev slide
					curSlide.append($card);
				}
			});

			if (grid - size > 0) {
				for (var i = 0; i < grid - size; i++) {
					var elem = $itemsArr
						.eq(i % grid)
						.clone()
						.attr('data-size', '1.1');
					curSlide.append(elem);
				}
			}
			
			// show show-more btn
			if ($currentGrid.find('.gallery-slide').length > 1) {
				$currentGrid.next('.show-more').removeClass('hide');
			}
			
		});
	}
	
	$(function () {
		var text = $('#tab-controlls > li.active').text(),
			$window = $(window),
			size = 1200,
			$grid = $('.grid'),
			$cards = $('.card'),
			$tab;
			initialWindowWidth = $window.width(),

		$('#tab-dropdown-label').text(text);
		
		if (initialWindowWidth <= 1044) {
			rows = 3;
			cols = 3;
		}
		if (initialWindowWidth <= 797) {
			rows = 4;
			cols = 3;
		}
		if (initialWindowWidth <= 510) {
			rows = 4;
			cols = 2;
		} else {
			rows = 3;
			cols = 4;
		}
		
		if ($window.width() <= size) {
			$cards.toggleClass('card static-card');
			$tab = $('.tab:contains("' + text + '")');

			$tab
				.attr('aria-expanded', true)
				.parent()
				.addClass('active');
		}

		initSlider($('#myCarousel'), HEADER_SLIDER_CONFIG);
		setAutocompletion($grid);
		initCardFlipper($('.card'));
		initGalleryGrid($('.gallery-slide'));
		initSlider($('.active .grid'), GALLERY_SLIDER_CONFIG);
		setEventListeners($(document));
		windowResizeAction($window, size, $('.card'));
	});
}($));
