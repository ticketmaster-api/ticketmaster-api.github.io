/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	(function () {

	  var DEFAULT_API_KEY = apiKeyService.checkApiKeyCookie() || apiKeyService.getApiWidgetsKey();

	  function getHeightByTheme(theme) {
	    return theme === 'simple' ? 286 : 339;
	  }

	  function getBorderByTheme(theme) {
	    switch (theme) {
	      case 'simple':
	        return 0;
	        break;
	      default:
	        return 2;
	    }
	  }

	  function getGooleApiKey(code) {
	    return code || "AIzaSyBQrJ5ECXDaXVlICIdUBOe8impKIGHDzdA";
	  }

	  var widget = widgetsLib.widgetsEventDiscovery[0],
	      themeConfig = {
	    sizes: {
	      s: {
	        width: 160,
	        height: 300,
	        layout: 'horizontal'
	      },
	      m: {
	        width: 300,
	        height: 250,
	        layout: 'vertical'
	      },
	      l: {
	        width: 160,
	        height: 300,
	        layout: 'horizontal'
	      },
	      xl: {
	        width: 160,
	        height: 300,
	        layout: 'horizontal'
	      },
	      xxl: {
	        width: 300,
	        height: 600,
	        layout: 'vertical'
	      },
	      custom: {
	        width: 350,
	        height: 600,
	        layout: 'vertical'
	      }
	    },
	    initSliderSize: {
	      width: 350,
	      height: 600,
	      maxWidth: 500,
	      minWidth: 350
	    }
	  },
	      isPostalCodeChanged = false;

	  var $widthController = $('#w-width').slider({
	    tooltip: 'always',
	    handle: 'square'
	  }),
	      $borderRadiusController = $('#w-borderradius').slider({
	    tooltip: 'always',
	    handle: 'square'
	  }),
	      $colorSchemeSelector = $('.widget__color_scheme_control');

	  $('#js_styling_nav_tab').on('shown.bs.tab', function (e) {
	    $widthController.slider('relayout');
	    $borderRadiusController.slider('relayout');
	    windowScroll(); //recalculate widget container position
	  });

	  //variables for fixed widget
	  var $window = $(window),
	      $containerWidget = $(".widget-container-wrapper"),
	      $configBlock = $(".config-block"),
	      window_min = 0,
	      window_max = 0,
	      desktopWidth = 1200,
	      threshold_offset = 50;
	  /*
	   set the container's maximum and minimum limits as well as movement thresholds
	   */
	  function setLimits() {
	    //max and min container movements
	    var topCss = $containerWidget.css("top") > 0 ? parseInt($containerWidget.css("top")) : 0;
	    var headerOffset = $('.top-bar').height() + /*padding of top-bar*/8 + /*bottom-margin*/10;
	    var max_move = $configBlock.offset().top + $configBlock.height() - $containerWidget.height() - topCss - headerOffset;
	    var min_move = $configBlock.offset().top - headerOffset;

	    $containerWidget.data('min', min_move).data('max', max_move);

	    //window thresholds so the movement isn't called when its not needed!
	    window_min = min_move - threshold_offset;
	    window_max = max_move + $containerWidget.height() + threshold_offset;
	  }
	  //sets the limits for the first load
	  setLimits();

	  function windowScroll() {
	    var innerWidth = window.innerWidth;
	    var j = 0;
	    function updateScroll() {
	      //if the window is within the threshold, begin movements
	      if ($window.scrollTop() >= window_min && $window.scrollTop() < window_max) {
	        if ($containerWidget.height() < $configBlock.height() && innerWidth >= desktopWidth) {
	          //reset the limits (optional)
	          setLimits();
	          //move the container
	          containerMove();
	        }
	      }
	      j++;
	    }
	    if (j === 0) updateScroll();

	    setTimeout(function () {
	      if (innerWidth < desktopWidth && $containerWidget.height() > $configBlock.height()) {
	        // console.log('*** ', j , innerWidth ,'<', desktopWidth );
	        containerMove_clearOffset();
	        updateScroll();
	      }
	      if ($containerWidget.height() < $configBlock.height() || innerWidth >= desktopWidth) {
	        // console.log('ignore ',j);
	        if (innerWidth < desktopWidth) {
	          containerMove_clearOffset();
	        }
	        updateScroll();
	      }
	    }, 200);
	  }

	  $window.on("scroll load resize", windowScroll);

	  /**
	   * Clear top offset of widget container
	   */
	  function containerMove_clearOffset() {
	    $containerWidget.css("margin-top", 0);
	  }
	  /**
	   * Handles moving the container if needed.
	   **/
	  function containerMove() {
	    var marginTop = 0;
	    var wst = $window.scrollTop(),
	        _$containerWidget$dat = $containerWidget.data(),
	        min = _$containerWidget$dat.min,
	        max = _$containerWidget$dat.max;

	    //if the window scroll is within the min and max (the container will be 'sticky';
	    if (wst >= min && wst <= max) {
	      //if the window scroll is below the minimum move it down!
	      marginTop = wst - min;
	    } else if (wst > max) {
	      marginTop = max - min;
	    }
	    $containerWidget.css('marginTop', marginTop > 0 ? marginTop : 0);
	  }
	  //do one container move on load
	  containerMove();

	  var fullWidth = function fullWidth(targetValue, widgetNode) {
	    var widthSlider = $('.js_widget_width_slider'),
	        widgetContainerWrapper = $containerWidget,
	        widgetContainer = $(".widget-container", widgetContainerWrapper),
	        $border_slider = $('.js_widget_border_slider');

	    if (targetValue === 'fullwidth') {
	      // $layoutBox.slideUp();
	      widthSlider.slideUp("fast");
	      $borderRadiusController.slider('setValue', 0);
	      widgetNode.setAttribute('w-borderradius', 0);
	      $border_slider.slideUp("fast");
	      widgetContainerWrapper.css({ width: "100%" });
	      widgetContainer.css({ width: '100%' });
	      // widgetNode.setAttribute('w-height', 700);
	    } else {
	      // $layoutBox.slideDown("fast");
	      widthSlider.hide();
	      $border_slider.hide();
	      $borderRadiusController.slider('setValue', 4);
	      widgetNode.setAttribute('w-borderradius', 4);
	      widgetContainerWrapper.css({ width: 'auto' });
	      widgetContainer.css({ width: 'auto' });
	      //resetWidget($configForm );
	    }
	  };

	  var changeState = function changeState(event) {
	    if (!event.target.name || event.target.name === "w-googleapikey") return;

	    var widgetNode = document.querySelector("div[w-tmapikey]"),
	        targetValue = event.target.value,
	        targetName = event.target.name,
	        $tabButtons = $('.js-tab-buttons');

	    if (targetName === "w-tm-api-key") {}

	    if (targetName === "w-postalcodeapi") {
	      widgetNode.setAttribute('w-country', '');
	      isPostalCodeChanged = true;

	      /*
	       var numInputClass = document.getElementById('w-radius');
	       var incArrow = event.target.parentNode.nextElementSibling.querySelector('div').querySelector('.arrow__inc');
	       var decArrow = event.target.parentNode.nextElementSibling.querySelector('div').querySelector('.arrow__dec');
	         if (targetValue == '') {
	       numInputClass.setAttribute('disabled', 'disabled');
	       numInputClass.value = '';
	       incArrow.classList.add('disabled');
	       decArrow.classList.add('disabled');
	       }
	       else {
	       numInputClass.removeAttribute('disabled');
	       numInputClass.value = '25';
	       incArrow.classList.remove('disabled');
	       decArrow.classList.remove('disabled');
	       widgetNode.setAttribute('w-radius', '25');
	       }
	       */
	    }

	    if (targetName === "w-latlong") {
	      if (targetValue == '') {
	        document.getElementById('w-latlong').value = document.getElementById('h-latlong').value;
	        targetValue = document.getElementById('w-latlong').value;
	      }
	      widgetNode.setAttribute('w-latlong', targetValue.replace(/\s+/g, ''));
	    }

	    if (targetName === "w-postalcodeapi") {
	      widgetNode.setAttribute('w-country', '');
	      widgetNode.setAttribute('w-postalcodeapi', document.getElementById('w-postalcodeapi').value);
	      isPostalCodeChanged = true;
	    }

	    if (targetName === "w-countryCode" && widgetNode.getAttribute('w-countrycode') !== null) {
	      if (widgetNode.getAttribute('w-countrycode') != targetValue) {
	        document.getElementById("w-city").value = '';
	        widgetNode.setAttribute('w-city', '');
	      }
	    }

	    if (targetName === "w-theme") {
	      if (targetValue === 'simple') {
	        $colorSchemeSelector.hide();
	      } else {
	        $colorSchemeSelector.show();
	      }

	      if (widgetNode.getAttribute('w-layout') === 'horizontal') {
	        widgetNode.setAttribute('w-height', getHeightByTheme(targetValue));
	      }
	      widgetNode.setAttribute('w-border', getBorderByTheme(targetValue));
	    }

	    if (targetName === "w-layout") {
	      var sizeConfig = themeConfig.initSliderSize;
	      if (targetValue === 'horizontal') {
	        sizeConfig = {
	          width: 620,
	          height: getHeightByTheme(widgetNode.getAttribute('w-theme')),
	          maxWidth: 900,
	          minWidth: 620
	        };
	      }

	      fullWidth(targetValue, widgetNode);

	      if (targetValue !== 'fullwidth') {

	        $('.js_widget_width_slider').slideDown("fast");
	        $('.js_widget_border_slider').slideDown("fast");
	        $borderRadiusController.slider('setValue', 4);
	        widgetNode.setAttribute('w-borderradius', 4);
	        $containerWidget.css({ width: 'auto' });
	        $(".widget-container", $containerWidget).css({ width: 'auto' });

	        $widthController.slider({
	          setValue: sizeConfig.width,
	          max: sizeConfig.maxWidth,
	          min: sizeConfig.minWidth
	        }).slider('refresh');
	      }

	      widgetNode.setAttribute('w-width', sizeConfig.width);
	      widgetNode.setAttribute('w-height', sizeConfig.height);
	    }

	    //Check fixed sizes for 'simple' theme
	    if (targetName === "w-proportion") {
	      var widthSlider = $('.js_widget_width_slider');
	      var _sizeConfig = {
	        width: themeConfig.sizes[targetValue].width,
	        height: themeConfig.sizes[targetValue].height,
	        maxWidth: 600,
	        minWidth: 350
	      };

	      //set width:'auto'
	      fullWidth(targetValue, widgetNode);

	      //set layout
	      widgetNode.setAttribute('w-layout', themeConfig.sizes[targetValue].layout);

	      if (targetValue !== 'custom') {
	        $tabButtons.slideUp("fast");
	        widthSlider.slideUp("fast");
	      } else {
	        $tabButtons.slideDown("fast");
	        widthSlider.slideDown("fast");
	        $('input:radio[name="w-layout"][value="vertical"]', $tabButtons).prop('checked', true);

	        _sizeConfig = { //default size
	          width: themeConfig.initSliderSize.width, //350
	          height: themeConfig.initSliderSize.height, //600
	          maxWidth: themeConfig.initSliderSize.maxWidth, //500
	          minWidth: themeConfig.initSliderSize.minWidth // 350
	        };
	        $widthController.slider({
	          setValue: _sizeConfig.width,
	          max: _sizeConfig.maxWidth,
	          min: _sizeConfig.minWidth
	        }).slider('refresh');
	      }
	      widgetNode.setAttribute('w-width', _sizeConfig.width);
	      widgetNode.setAttribute('w-height', _sizeConfig.height);
	    }

	    widgetNode.setAttribute(event.target.name, event.target.value);
	    widget.update();

	    windowScroll(); //recalculate widget container position
	  };

	  var resetWidget = function resetWidget(configForm) {
	    var widgetNode = document.querySelector("div[w-tmapikey]"),
	        height = 600,
	        theme = void 0,
	        layout = void 0;
	    var widthSlider = $('.js_widget_width_slider'),
	        $tabButtons = $('.js-tab-buttons');

	    configForm.find("input[type='text'], input[type='number']").each(function () {
	      var $self = $(this),
	          data = $self.data(),
	          value = data.defaultValue;

	      if (data.sliderValue) {
	        value = data.sliderValue;
	        $self.slider({
	          setValue: value,
	          max: data.sliderMax,
	          min: data.sliderMin
	        }).slider('refresh');
	      } else {
	        $self.val(value);
	      }

	      try {
	        document.getElementById("w-country").disabled = true;
	      } catch (e) {}

	      var activeItems = document.querySelectorAll('.custom_select__item.custom_select__item-active');
	      var activeItemsLenght = activeItems.length;
	      for (var i = 0; i < activeItemsLenght; ++i) {
	        activeItems[i].classList.remove('custom_select__item-active');
	      }

	      ["#w-countryCode", "#w-source"].map(function (item) {
	        $(item).prop("selectedIndex", 0);
	      });
	      widgetNode.setAttribute($self.attr('name'), value);
	      if ($self.attr('name') === 'w-tm-api-key') widgetNode.removeAttribute($self.attr('name'));
	    });

	    configForm.find("input[type='radio']").each(function () {
	      var $self = $(this);
	      if ($self.data('is-checked')) {
	        var name = $self.attr('name'),
	            val = $self.val();
	        if (name === 'w-theme') {
	          theme = val;
	        } else if (name === 'w-layout') {
	          layout = val;
	        } else if (name === 'w-proportion') {
	          $tabButtons.slideDown("fast");
	          widthSlider.slideDown("fast");
	        }
	        $self.prop('checked', true);
	        widgetNode.setAttribute($self.attr('name'), val);
	      }
	    });

	    if (layout === 'horizontal') {
	      height = getHeightByTheme(theme);
	    }
	    widgetNode.setAttribute('w-height', height);
	    widgetNode.setAttribute('w-border', 0);
	    widgetNode.removeAttribute('w-countryCode');
	    widgetNode.removeAttribute('w-source');

	    $('.country-select .js_custom_select').removeClass('custom_select-opened'); //reset custom select
	    widget.onLoadCoordinate();
	    widget.update();
	  };

	  var $configForm = $(".main-widget-config-form"),
	      $widgetModal = $('#js_widget_modal'),
	      $widgetModalNoCode = $('#js_widget_modal_no_code'),
	      $widgetModalMap = $('#js_widget_modal_map');

	  $configForm.on("change", changeState);
	  // Mobile devices. Force 'change' by 'Go' press
	  $configForm.on("submit", function (e) {
	    $configForm.find('input:focus').trigger('blur');
	    e.preventDefault();
	  });

	  $configForm.find("input[type='text'], input[type='number']").each(function () {
	    var $self = $(this);
	    $self.data('default-value', $self.val());
	  });

	  $configForm.find("input[type='radio']").each(function () {
	    var $self = $(this);
	    if ($self.is(':checked')) $self.data('is-checked', 'checked');
	  });

	  $('.js_get_widget_code').on('click', function () {
	    var codeCont = document.querySelector(".language-html.widget_dialog__code");
	    var htmlCode = document.createElement("div");
	    widget.config.latlong = document.getElementById('w-latlong').value.replace(/\s+/g, '');
	    for (var key in widget.config) {
	      if (key !== 'country') {
	        htmlCode.setAttribute("w-" + key, widget.config[key]);
	      }
	    }
	    // Use only Key from config form
	    htmlCode.setAttribute('w-googleapikey', getGooleApiKey());
	    var tmp = document.createElement("div");
	    tmp.appendChild(htmlCode);
	    codeCont.textContent = tmp.innerHTML;
	    $widgetModal.modal();
	  });

	  $('.js_reset_widget').on('click', function () {
	    resetWidget($configForm);
	  });

	  $('#js_widget_modal__close').on('click', function () {
	    $widgetModal.modal('hide');
	  });

	  $('#js_widget_modal_no_code__close').on('click', function () {
	    $widgetModalNoCode.modal('hide');
	  });

	  $('#js_widget_modal_map__open').on('click', function (e) {
	    e.preventDefault();
	    $widgetModalMap.modal();
	  });

	  $('#js_widget_modal_map__close').on('click', function () {
	    $widgetModalMap.modal('hide');
	    document.querySelector('[w-type="event-discovery"]').setAttribute('w-latlong', document.getElementById('w-latlong').value.replace(/\s+/g, ''));
	    widget.config.latlong = document.getElementById('w-latlong').value.replace(/\s+/g, '');
	    widget.update();
	  });

	  $('.widget__location span').on('click', function () {
	    $('.widget__location').addClass('hidn');
	    $('.widget__latlong').removeClass('hidn');
	    document.getElementById('h-countryCode').value = document.getElementById('w-countryCode').value;
	    document.getElementById('h-postalcodeapi').value = document.getElementById('w-postalcodeapi').value;
	    document.getElementById('h-city').value = document.getElementById('w-city').value;
	    document.getElementById('w-latlong').value = document.getElementById('h-latlong').value;
	    widget.config.latlong = document.getElementById('w-latlong').value.replace(/\s+/g, '');
	    document.querySelector('[w-type="event-discovery"]').setAttribute('w-latlong', widget.config.latlong);
	    document.querySelector('[w-type="event-discovery"]').removeAttribute('w-countrycode');
	    document.querySelector('[w-type="event-discovery"]').removeAttribute('w-postalcodeapi');
	    document.querySelector('[w-type="event-discovery"]').removeAttribute('w-city');
	    widget.update();
	  });

	  $('.widget__latlong span').on('click', function () {
	    $('.widget__latlong').addClass('hidn');
	    $('.widget__location').removeClass('hidn');
	    document.getElementById('h-latlong').value = document.getElementById('w-latlong').value.replace(/\s+/g, '');
	    document.getElementById('w-latlong').value = '';
	    document.querySelector('[w-type="event-discovery"]').removeAttribute('w-latlong');
	    document.getElementById('w-countryCode').value = document.getElementById('h-countryCode').value;
	    document.getElementById('w-postalcodeapi').value = document.getElementById('h-postalcodeapi').value;
	    document.getElementById('w-city').value = document.getElementById('h-city').value;
	    widget.config.countrycode = document.getElementById('w-countryCode').value;
	    widget.config.postalcode = document.getElementById('w-postalcodeapi').value;
	    widget.config.city = document.getElementById('w-city').value;
	    document.querySelector('[w-type="event-discovery"]').setAttribute('w-countrycode', widget.config.countrycode);
	    document.querySelector('[w-type="event-discovery"]').setAttribute('w-postalcodeapi', widget.config.postalcode);
	    document.querySelector('[w-type="event-discovery"]').setAttribute('w-city', widget.config.city);
	    widget.config.latlong = '';
	    widget.update();
	  });

	  widget.onLoadCoordinate = function (results) {
	    var countryShortName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	    widget.config['country'] = countryShortName;
	    if (isPostalCodeChanged) {
	      isPostalCodeChanged = false;

	      var $countrySelect = $('#w-country'),
	          $ul = $(".country-select .js_widget_custom__list"),
	          options = "<option selected value=''>All</option>";

	      $countrySelect.html('');
	      $ul.html(''); //clear custom select list
	      $countrySelect.prop('disabled', !results);
	      if (results) {
	        var status = void 0;
	        if (results.length <= 1) status = true;else status = false;
	        $countrySelect.prop('disabled', status);
	        // $countrySelect.prop('disabled', !results.length);
	        options = '';
	        for (var i in results) {
	          var result = results[i];
	          if (result.address_components) {
	            var country = result.address_components[result.address_components.length - 1];
	            if (country) {
	              var isSelected = country.short_name === countryShortName ? 'selected' : '';
	              options += '<option ' + isSelected + ' value="' + country.short_name + '">' + country.long_name + '</option>';
	            }
	          }
	        }
	      }

	      $countrySelect.append(options);
	      addCustomList($ul, '#w-country', countryShortName);
	    }
	  };

	  function addCustomList(listWrapperElement, listWrapperId, activeVal) {
	    var $listOption = $(listWrapperId).find('option'),
	        //update list
	    $placeholder = $(".country-select").find(".custom_select__placeholder"),
	        $ul = listWrapperElement;

	    $placeholder.val($listOption.html());

	    $listOption.each(function () {
	      var data = {
	        value: $(this).val()
	      };
	      $ul.append('<li class="custom_select__item ' + (activeVal === data.value ? 'custom_select__item-active' : '') + '" data-value="' + data.value + '">' + $(this).text() + '</li>');
	    });
	  }

	  // clearDropDownInput(['#w-countryCode','#w-source']);
	  function clearDropDownInput(elemIds) {
	    elemIds.map(function (item) {
	      $(item).val('');
	    });
	  }

	  // Set min widget size on mobile devices
	  if (parseInt($(window).width(), 10) < 767) {
	    $('#w-fixed-300x250').trigger('click');
	  }
	})();

/***/ }
/******/ ]);
//# sourceMappingURL=main-widget-config.js.map