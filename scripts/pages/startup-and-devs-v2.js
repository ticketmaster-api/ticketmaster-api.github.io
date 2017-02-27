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
		layoutMode: 'packery',
		itemSelector: '.grid-item',
		animationEngine : 'jquery',
		transitionDuration: 200,
		hiddenStyle: {
			opacity: 0
		},
		visibleStyle: {
			opacity: 1
		},
		stagger: 20
	};
	const gridDimensions = {
		rows: 3,
		cols: 4,
		getGridSize: function () {
			return this.rows * this.cols;
		}
	};
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
	
	/**
	 * Initialization of Isotope grid for gallery
	 * @param $root {object} root element for grid
	 * @param config {object} config for isotope grid
	 */
	function initGalleryGrid($root, config) {
		$root.isotope(config);
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
					$('.grid.more').removeClass('more');
					$('.grid.slick-initialized').slick('unslick');
					
					$('.gallery-slide')
						.isotope('layout')
						.on( 'layoutComplete', function() {
							initSlider($('.active .grid:not(.slick-initialized)'), GALLERY_SLIDER_CONFIG);
						});
						
			})
			.on('click touch', '#tab-dropdown .tab', function(e) {
				var text = $(this).text();
				$('#tab-dropdown-label').text(text);
			});
	}
	
	/**
	 * Screen resize handler
	 * @param $window {object}
	 * @param $cards {object}
	 * @param size {number}
	 */
	function windowResizeAction($window, $cards, size) {
		$window.on('resize', function() {
			
			let windowWidth = $window.width();
			
			setColsRowsSize(windowWidth, gridDimensions);
			
			if ((windowWidth <= size && $cards.hasClass('card')) ||
				(windowWidth > size && !$cards.hasClass('card'))) {
				
				$cards.toggleClass('card static-card');
			}
		});
	}
	
	function bildTheGrid($grid) {
		const grid = gridDimensions.getGridSize() - 2;
		
		$grid.each(function () {
			const $tabGrid = $(this),
				$gridItemsArr = $tabGrid.find('.grid-item'),
				$slideTemplate = $('<section class="gallery-slide"/>');
			let $slide,
				count = 0;
			
			$gridItemsArr.each(function (index) {
				const $card = $(this);
				
				// break items by slides
				if (index % grid === 0) {
					// create new slide
					$slide = $slideTemplate
						.clone()
						.addClass(`slide-${count++}`);
					
					// appending slide to tabGrid
					$tabGrid.append($slide);
				}
				
				// appending card to slide
				$slide.append($card);
			});
			
			// autocomplits slides by card copies
			setAutocomplit($slide, grid);
			
			// show show-more btn
			if (count > 0) {
				$tabGrid.next('.show-more').removeClass('hide');
			}
		});
	}
	
	function setAutocomplit($slide, size) {
		let $arr = $slide.find('.grid-item'),
			arrLength = $arr.length;
		
		for (let i = 0, length = size - arrLength; i < length; i++) {
			if (arrLength < size) {
				$slide.append($arr.eq(i % arrLength).clone().attr('data-size', '1.1'));
			}
		}
	}
	
	function setRandomCardSize($grid) {
		$grid.each(function () {
			const $tabGrid = $(this);
			
			$tabGrid
				.find('.gallery-slide')
				.each(function () {
					const $slide = $(this);
					let index = randomNum(1, 8);
					let index2;
					let arr;
					
					do {
						index2 = randomNum(1, 6)
					} while (index === index2);
					
					arr = $slide.find('.grid-item');
					arr.eq(index).attr('data-size', '2.1');
					arr.eq(index2).attr('data-size', '1.2');
				});
		});
		return true;
	}
	
	function randomNum(start, end) {
		if (typeof start === 'undefined' && typeof end === 'undefined') {
			start = 1;
			end = 8;
		}
		
		return Math.floor(Math.random() * 10) % end + start;
	}
	
	/**
	 * Changes grid dimensions depending on screen size
	 * @param num {number} current window size
	 * @param obj {object} grid dimensions
	 */
	function setColsRowsSize(num, obj) {
		if (num > 1044 && obj.rows !== 3 && obj.cols !== 4) {
			obj.rows = 3;
			obj.cols = 4;
		} else if (797 < num && num <= 1044 && obj.rows !== 3 && obj.cols !== 3) {
			obj.rows = 3;
			obj.cols = 3;
		} else if (510 < num && num <= 797 && obj.rows !== 4 && obj.cols !== 3) {
			obj.rows = 4;
			obj.cols = 3;
		} else if (num <= 510 && obj.rows !== 4 && obj.cols !== 2)  {
			obj.rows = 4;
			obj.cols = 2;
		}
	}
	
	/**
	 * Shuffles array in random way
	 * @param array {array}
	 * @returns {array}
	 */
	function shuffle(array) {
		let currentIndex = array.length,
			temporaryValue,
			randomIndex;
		
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			
			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		
		return array;
	}

	$(function () {
		let text = $('#tab-controlls > li.active').text(),
			$window = $(window),
			size = 1200,
			$grid = $('.grid'),
			$cards = $('.card'),
			$tab,
			initialWindowWidth = $window.width();

		$('#tab-dropdown-label').text(text);
		
		setColsRowsSize(initialWindowWidth, gridDimensions);
		
		if ($window.width() <= size) {
			$cards.toggleClass('card static-card');
			$tab = $('.tab:contains("' + text + '")');

			$tab
				.attr('aria-expanded', true)
				.parent()
				.addClass('active');
		}

		initSlider($('#myCarousel'), HEADER_SLIDER_CONFIG);
		
		bildTheGrid($grid);
		
		setRandomCardSize($grid);
		
		initGalleryGrid($('.gallery-slide'), GALLERY_LAYOUT_CONFIG);
		
		// shuffleSlide($('.gallery-slide'), containerHeight);
		
		initCardFlipper($('.card'));
		
		initSlider($('.active .grid'), GALLERY_SLIDER_CONFIG);
		
		setEventListeners($(document));
		windowResizeAction($window, size, $('.card'));
	});
}($));
