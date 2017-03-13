/*globals require: false, exports: false*/

;(function (factory) {
	'use strict';
	// Module system.
	
	if (typeof exports !== 'undefined') {
		module.exports = factory(require('jquery'), require('slick-carousel'), require('isotope-layout'), require('isotope-packery'));
	} else {
		factory(jQuery);
	}
	
}(function factory($) {
		'use strict';

		var SELECTOR_ACTIVE_GRID = '.active .grid';

		var PAGE_CONFIG = {
			HEADER: {
				SLIDER_CONFIG: {
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
				}
			},
			GALLERY: {
				SLIDER_CONFIG: {
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
				},
				LAYOUT_CONFIG: {
					layoutMode: 'packery',
					itemSelector: '.grid-item',
					transitionDuration: 0
				},
				GRID: {
					animation: {
						properties: {
							opacity: 1
						},
						duration: 400
					},
					rows: 3,
					cols: 4,
					tall: 1, // 1.2
					wide: 1, // 2.1
					shuffleOrder: true, // if document ORDER is metter
					getSize: function () {
						var result = this.rows * this.cols;
						
						// mobile view all cards should be 1.1
						if (window.innerWidth <= 797) {
							return result;
						}
						return  result - (this.tall + this.wide);
					},
					getAnimProps: function () {
						return Object.keys(this.animation.properties).join(' ');
					}
				}
			}
		},
			size = 1200,
			initialWindowWidth;
		
		depsCheck();
	
		/**
		 * Checks dep's for this module/script
		 * @param $
		 * @returns {boolean}
		 */
		function depsCheck() {
			var str =  ' is required, please ensure it is loaded before loading this script!',
				error;
			
			if (typeof $ === 'undefined') {
				error = 'jQuery.js' + str;
			} else if (typeof ($.fn.slick) === 'undefined') {
				error = 'Slick.js (http://kenwheeler.github.io/slick)'+ str;
			} else if (typeof ($.fn.isotope) === 'undefined') {
				error = 'Isotope.js (http://isotope.metafizzy.co)' + str;
			} else {
				return true;
			}
			throw new Error(error);
		}
	
		/**
		 * Initialization of 'Slick' slider
		 * @param $root
		 * @param config
		 * @returns {boolean}
		 */
		function initSlider($root, config) {
			if ($root.hasClass('slick-initialized') || $root.children().length < 2) {return false}
			$root.length && $root.slick(config);
			return true;
		}
	
		/**
		 * Sets 'flip' effect to cards
		 * @param $cards
		 */
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
			return $root.isotope(config || PAGE_CONFIG.GALLERY.LAYOUT_CONFIG || {});
		}
	
		/**
		 * Sets all Event listeners on page
		 * @param $rootTarget
		 */
		function setEventListeners($rootTarget) {
			if (typeof $rootTarget === 'undefined') {
				$rootTarget = $(document);
			}
			
			$rootTarget
				.on('click', '#tab-dropdown .tab', function(e) {
						// e.stopPropagation();
						
					var text = $(this).text();
					$('.products-and-application li[role="presentation"]')
						.removeAttr('aria-expanded')
						.removeClass('active');
					
					var $tab = $('.tab:contains("' + text + '")').tab('show');
					
					$tab.parent('li[role="presentation"]').addClass('active');
					$('#tab-dropdown-label').text(text);
					// $('#tab-dropdown').dropdown('toggle');
					// // init show-more on active tab-pane
					showMoreToggle($(SELECTOR_ACTIVE_GRID));
				})
				.on('click touch', '#gallery-show-more', function(e) {
					var selector = $(this).attr('aria-controls');
					
					e.stopPropagation();
					$('.grid.slick-initialized').slick('unslick');
					$(selector).addClass('more');
					$(this).addClass('hide');
				})
				.on('click touch', '#top-show-more', function(e) {
					var selector = $(this).attr('aria-controls');
					
					e.stopPropagation();
					$(selector).addClass('more');
					$(this).addClass('hide');
				})
				.on('click touch', '.btn-like:enabled', function(e) {
					var count = $(this).parent('.like').find('.count');
					
					e.stopPropagation();
					e.preventDefault();
					count.text(+count.text() + 1);
					$(this).attr('disabled', true);
				})
				.on('shown.bs.tab', 'a[data-toggle="tab"]', function(e) {
				 /**
					* [Bootstrap tabs event]
					* Fires on tab show after a tab has been shown.
					* Use event.target and event.relatedTarget to target the active tab and
					* the previous active tab (if available) respectively.
					* http://getbootstrap.com/javascript/#tabs
					*/
					reInitTabPane();
				})
				.on('resize', 'window', function() {
					var $cards = $('.card'),
						windowWidth = window.innerWidth;
					
					setColsRowsSize(windowWidth, PAGE_CONFIG.GALLERY.GRID);
					
					reInitTabPane();
					
					if ((windowWidth <= size && $cards.hasClass('card')) ||
						(windowWidth > size && !$cards.hasClass('card'))) {
						
						$cards.toggleClass('card static-card');
					}
				}).on('init', function(){
				showMoreToggle($('.tab-pane.active'));
			});
		}
	
		function reInitTabPane() {
			
			var CONFIG = PAGE_CONFIG.GALLERY;
			
			// resets all animation props
			$(CONFIG.LAYOUT_CONFIG.itemSelector || '.grid-item').css(CONFIG.GRID.getAnimProps(), '');
			
			// resets 'show more state'
			$('.grid.more').removeClass('more');
			
			// unbinds slider from unactive tab-pane
			$('.grid.slick-initialized').slick('unslick');
			
			// init gallery grid on active tab-pane
			initGalleryGrid($('.active .gallery-slide'));
			
			// init slider on active tab-pane
			initSlider($(SELECTOR_ACTIVE_GRID), CONFIG.SLIDER_CONFIG);
			
			// init show-more on active tab-pane
			showMoreToggle($(SELECTOR_ACTIVE_GRID));
			
			// runs animation of cards
			cardsAnimation();
		}
	
		/**
		 * Inits animation effect on cards
		 * @param $target {object} $ collection
		 */
		function cardsAnimation($target) {
			var stepTime = 100,
				$collection = $('.active .gallery-slide:not(.slick-cloned)')
					.find($target || PAGE_CONFIG.GALLERY.LAYOUT_CONFIG.itemSelector || '.grid-item');
			
			$collection.each(function (i) {
				var $this = $(this);
				setTimeout((function(x) {
					return function() {
						$this.animate(PAGE_CONFIG.GALLERY.GRID.animation.properties, PAGE_CONFIG.GALLERY.GRID.animation.duration || 400);
					}
				}(i)), stepTime + stepTime * i);
			});
		}
	
		/**
		 * Prepares the grid for further manipulations
		 * @param $grid
		 */
		function bildTheGrid($grid) {
			var GRID_CONFIG = PAGE_CONFIG.GALLERY.GRID;
			
			$grid.each(function () {
				var $tabGrid = $(this),
					$gridItemsArr = $tabGrid.find('.grid-item'),
					$slideTemplate = $('<section class="gallery-slide"/>'),
					$slide,
					count = 0;
				
				if (GRID_CONFIG.shuffleOrder) {
					shuffle($gridItemsArr);
				}
				
				$gridItemsArr.each(function (index) {
					var $card = $(this);
					
					// break items by slides
					if (index % GRID_CONFIG.getSize() === 0) {
						// create new slide
						$slide = $slideTemplate
							.clone()
							.addClass('slide-' + count++);
						
						// appending slide to tabGrid
						$tabGrid.append($slide);
					}
					
					// appending card to slide
					$slide.append($card);
				});
				
				// autocomplits slides by card copies
				setAutocomplit($slide, GRID_CONFIG.getSize());
				
				showMoreToggle($tabGrid, count);
			});
		}
	
		/**
		 * Show more option init
		 * @param $tabGrid
		 * @param count
		 */
		function showMoreToggle($tabGrid, count) {
			var slidesCount = count || $tabGrid.find('.gallery-slide').length;
			
			if (slidesCount > 1) {
				$tabGrid.next('.show-more').removeClass('hide');
				$tabGrid.find('#gallery-show-more').removeClass('hide');
			}
		}
	
		/**
		 * Autocomplits slide with clones of its own cards (from start) if it needs
		 * @param $slide
		 * @param size
		 */
		function setAutocomplit($slide, size) {
			var $arr = $slide.find('.grid-item'),
				arrLength = $arr.length;
			
			for (var i = 0, length = size - arrLength; i < length; i++) {
				if (arrLength < size) {
					$slide.append($arr.eq(i % arrLength).clone().attr('data-size', '1.1'));
				}
			}
		}
	
		/**
		 * Controls logic conected with sizes of cards
		 * @param $grid
		 * @returns {boolean}
		 */
		function setRandomCardSize($grid) {
			$grid.each(function () {
				var $tabGrid = $(this),
					GRID_SIZE = PAGE_CONFIG.GALLERY.GRID.getSize(); // 9
				
				$tabGrid
					.find('.gallery-slide')
					.each(function () {
						var $slide = $(this),
							index = randomNum(1, GRID_SIZE - 1),
							index2,
							arr;
						
						do {
							index2 = randomNum(1, GRID_SIZE < 9 ? 3: 6)
						} while (index === index2);
						
						arr = $slide.find(PAGE_CONFIG.GALLERY.LAYOUT_CONFIG.itemSelector || '.grid-item');
						arr.eq(index).attr('data-size', '2.1');
						arr.eq(index2).attr('data-size', '1.2');
					});
			});
			return true;
		}
	
		/**
		 * Returns random number from setted range
		 * Helper func
		 * @param s
		 * @param e
		 * @returns {*}
		 */
		function randomNum(s, e) {
			var start = s || 1, end = e || 8;
			
			return Math.floor(Math.random() * 10) % end + start;
		}
		
		/**
		 * Changes grid dimensions depending on screen size
		 * @param num {number} current window size
		 * @param obj {object} grid dimensions
		 */
		function setColsRowsSize(num, obj) {
			if (num > 1044) {
				obj.rows = 3;
				obj.cols = 4;
			} else if (797 < num && num <= 1044) {
				obj.rows = 3;
				obj.cols = 3;
			} else if (510 < num && num <= 797) {
				obj.rows = 4;
				obj.cols = 3;
			} else if (num <= 510)  {
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
			var currentIndex = array.length,
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
	
		/**
		 * function that executes when Dom is ready
		 */
		$(function () {
			var text = $('#tab-controlls > li.active').text(),
				$grid = $('.grid'),
				$cards = $('.card'),
				$tab,
				initialWindowWidth = window.innerWidth;
			
			$('#tab-dropdown-label').text(text);
			
			setColsRowsSize(initialWindowWidth, PAGE_CONFIG.GALLERY.GRID);
			
			if (initialWindowWidth <= size) {
				$cards.toggleClass('card static-card');
				$tab = $('.tab:contains("' + text + '")');
				
				$tab
					.attr('aria-expanded', true)
					.parent()
					.addClass('active');
			}
			
			initSlider($('#myCarousel'), PAGE_CONFIG.HEADER.SLIDER_CONFIG);
			
			bildTheGrid($grid);
			
			setRandomCardSize($grid);
			
			initGalleryGrid($('.active .gallery-slide'));
			
			initCardFlipper($('.card'));
			
			initSlider($(SELECTOR_ACTIVE_GRID), PAGE_CONFIG.GALLERY.SLIDER_CONFIG);
			
			cardsAnimation();
			
			setEventListeners();
		});
		
		// module revile interface
		return {
			initSlider: initSlider,
			initCardFlipper: initCardFlipper,
			initGalleryGrid: initGalleryGrid
		}
	}));
