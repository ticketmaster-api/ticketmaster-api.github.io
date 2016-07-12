'use strict';

(function ($) {

  var widget = widgetsCountdown[0];
  var themeConfig = {
    simple_countdown: {
      sizes: {
        s: {
          width: 180,
          height: 150,
          layout: 'horizontal'
        },
        m: {
          width: 300,
          height: 250,
          layout: 'vertical'
        },
        l: {
          width: 160,
          height: 600,
          layout: 'horizontal'
        },
        xl: {
          width: 728,
          height: 90,
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
    }
  };

  // function getHeightByTheme(theme){
  //   return (theme === 'simple_countdown' ? 238 : 300);
  // }

  // function getBorderByTheme(theme) {
  //   switch (theme) {
  //     case "oldschool":
  //       return 2;
  //       break;
  //     default:
  //       return 0;
  //   }
  // }

  var $widthController = $('#w-width').slider({
    tooltip: 'always',
    handle: 'square'
  }),
      $borderRadiusController = $('#w-borderradius').slider({
    tooltip: 'always',
    handle: 'square'
  }),
      $getCodeButton = $('.js_get_widget_code'),
      widgetNode = document.querySelector("div[w-tmapikey]"),
      $tabButtons = $('.js-tab-buttons'),
      $layoutBox = $('#js-layout-box');

  // function toggleDisabled(widgetNode){
  //   if ( widgetNode.getAttribute('w-id') === '') {
  //     $getCodeButton.prop("disabled",true);
  //   }else {
  //     $getCodeButton.prop('disabled',false);
  //   }
  // }

  var $configForm = $(".main-widget-config-form"),
      $widgetModal = $('#js_widget_modal'),
      $widgetModalNoCode = $('#js_widget_modal_no_code');

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

    $containerWidget.attr("data-min", min_move).attr("data-max", max_move);
    //window thresholds so the movement isn't called when its not needed!
    window_min = min_move - threshold_offset;
    window_max = max_move + $containerWidget.height() + threshold_offset;
  }

  /*
   widget container scroll handler
   */
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
        containerMove_clearOffset();
        updateScroll();
      }
      if ($containerWidget.height() < $configBlock.height() || innerWidth >= desktopWidth) {
        if (innerWidth < desktopWidth) {
          containerMove_clearOffset();
        }
        updateScroll();
      }
    }, 200);
  }

  $window.on("scroll resize", windowScroll);

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
    var wst = $window.scrollTop();
    //if the window scroll is within the min and max (the container will be "sticky";
    if (wst >= $containerWidget.attr("data-min") && wst <= $containerWidget.attr("data-max")) {
      //work out the margin offset
      var margin_top = $window.scrollTop() - $containerWidget.attr("data-min");
      //margin it down!
      $containerWidget.css("margin-top", margin_top);
      //if the window scroll is below the minimum
    } else if (wst <= $containerWidget.attr("data-min")) {
        //fix the container to the top.
        $containerWidget.css("margin-top", 0);
        //if the window scroll is above the maximum
      } else if (wst > $containerWidget.attr("data-max")) {
          //fix the container to the top
          $containerWidget.css("margin-top", $containerWidget.attr("data-max") - $containerWidget.attr("data-min") + "px");
        }
  }

  var replaceApiKey = function replaceApiKey(options) {
    var userKey = options.userKey || sessionStorage.getItem('tk-api-key');

    if (userKey !== null) {
      var inputApiKey = options.inputApiKey;
      var _widgetNode = options.widgetNode;
      var _widget = options.widget;

      inputApiKey.attr('value', userKey).data('userAPIkey', userKey).val(userKey);
      _widgetNode.setAttribute("w-tm-api-key", userKey);
      _widget.update();
    }
  };

  var changeState = function changeState(event) {
    if (!event.target.name) {
      return;
    }
    var targetValue = event.target.value,
        targetName = event.target.name;

    if (targetName === "w-theme") {
      var widthSlider = $('.js_widget_width_slider'),
          widgetContainerWrapper = $containerWidget,
          widgetContainer = $(".widget-container", widgetContainerWrapper),
          $border_slider = $('.js_widget_border_slider');

      if (targetValue === "fullwidth") {
        $layoutBox.slideUp();
        widthSlider.slideUp("fast");
        $borderRadiusController.slider('setValue', 0);
        widgetNode.setAttribute('w-borderradius', 0);
        $border_slider.slideUp("fast");
        widgetContainerWrapper.css({
          width: "100%"
        });
        widgetContainer.css({
          width: "100%"
        });
        widgetNode.setAttribute('w-height', 700);
      } else {
        var excludeOption = {
          id: widgetNode.getAttribute('w-id')
        };
        resetWidget($configForm, excludeOption);

        $layoutBox.slideDown("fast");
        widthSlider.slideDown("fast");
        $border_slider.slideDown("fast");
        $borderRadiusController.slider('setValue', 4);
        widgetNode.setAttribute('w-borderradius', 4);
        widgetContainerWrapper.css({
          width: 'auto'
        });
      }
    }

    /*
    //set attr for 'seconds' radio-btn
    if(targetName === "w-seconds"){
      if (targetValue !== 'showSeconds') {
        widgetNode.setAttribute('w-seconds', 'hideSeconds');
      }
    }
    */

    if (targetName === "w-layout") {
      var sizeConfig = themeConfig.simple_countdown.initSliderSize;

      if (targetValue === 'horizontal') {
        sizeConfig = {
          width: 620,
          // height: getHeightByTheme(widgetNode.getAttribute('w-theme')),
          height: 252,
          maxWidth: 900,
          minWidth: 620
        };
      }

      $widthController.slider({
        setValue: sizeConfig.width,
        max: sizeConfig.maxWidth,
        min: sizeConfig.minWidth
      }).slider('refresh');

      widgetNode.setAttribute('w-width', sizeConfig.width);
      widgetNode.setAttribute('w-height', sizeConfig.height);
    }

    //Check fixed sizes for 'simple_countdown' theme
    if (targetName === "w-proportion") {
      var _widthSlider = $('.js_widget_width_slider'); //if init it on top -> then see bug on Vertical/Horizontal layout change
      var _sizeConfig = {
        width: themeConfig.simple_countdown.sizes[targetValue].width,
        height: themeConfig.simple_countdown.sizes[targetValue].height,
        maxWidth: 600,
        minWidth: 350
      };

      //set layout
      widgetNode.setAttribute('w-layout', themeConfig.simple_countdown.sizes[targetValue].layout);

      if (targetValue !== 'custom') {
        $tabButtons.slideUp("fast");
        _widthSlider.slideUp("fast");
      } else {
        $tabButtons.slideDown("fast");
        _widthSlider.slideDown("fast");
        $('input:radio[name="w-layout"][value="vertical"]', $tabButtons).prop('checked', true);

        _sizeConfig = { //default size
          width: themeConfig.simple_countdown.initSliderSize.width, //350
          height: themeConfig.simple_countdown.initSliderSize.height, //600
          maxWidth: themeConfig.simple_countdown.initSliderSize.maxWidth, //500
          minWidth: themeConfig.simple_countdown.initSliderSize.minWidth // 350
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

    widgetNode.setAttribute(event.target.name, event.target.value); //set attr in widget

    //toggleDisabled(widgetNode);//set disabled btn if input is empty

    widget.update();

    windowScroll(); //recalculate widget container position
  };

  var resetWidget = function resetWidget(configForm, excludeOption) {
    var widthSlider = $('.js_widget_width_slider'),
        widgetContainerWrapper = $('.widget-container-wrapper'),
        height = 600,
        theme = void 0,
        layout = void 0,
        $tabButtons = $('.js-tab-buttons');

    widgetContainerWrapper.removeAttr('style');

    configForm.find("input[type='text']").each(function () {
      var $self = $(this),
          data = $self.data(),
          value = data.userAPIkey || data.defaultValue || '';

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

      widgetNode.setAttribute($self.attr('name'), value);
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

    if (typeof excludeOption !== 'undefined' && typeof excludeOption.id !== 'undefined') {
      widgetNode.setAttribute('w-id', excludeOption.id); //set val in widget
      $('#w-id').val(excludeOption.id); //set val in cofigurator
    }

    $tabButtons.slideDown("fast");
    widthSlider.slideDown("fast");

    if (layout === 'horizontal') {
      //height = getHeightByTheme(theme);
      height = 252;
    }
    widgetNode.setAttribute('w-height', height);

    // toggleDisabled(widgetNode);//set disabled btn if input is empty

    widget.update();
  };

  var init = function init() {
    //sets the limits for the first load
    setLimits();

    //do one container move on load
    containerMove();

    // replace Api-Key if user logged
    replaceApiKey({
      inputApiKey: $('#w-tm-api-key'),
      widgetNode: widgetNode,
      widget: widget
    });
  };

  /**
   * Events
   */
  $configForm.on("change", changeState);
  // Mobile devices. Force 'change' by 'Go' press

  $configForm.on("submit", function (e) {
    //console.log('pressed on.submit');
    $configForm.find('input:focus').trigger('blur');
    e.preventDefault();
  });

  /*set tooltip value above slider*/
  $configForm.find("input[type='text']").each(function () {
    var $self = $(this);
    $self.data('default-value', $self.val());
  });

  $configForm.find("input[type='radio']").each(function () {
    var $self = $(this);
    if ($self.is(':checked')) $self.data('is-checked', 'checked');
  });

  $getCodeButton.on('click', function () {
    var codeCont = document.querySelector(".language-html.widget_dialog__code");

    var htmlCode = document.createElement("div");
    for (var key in widget.config) {
      htmlCode.setAttribute("w-" + key, widget.config[key]);
    }
    var tmp = document.createElement("div");
    tmp.appendChild(htmlCode);
    codeCont.textContent = tmp.innerHTML;
    $widgetModal.modal();
  });

  /**
   * check if user logged just before enter widget page
   */
  $window.on('login', function (e, data) {
    replaceApiKey({
      userKey: data.key,
      inputApiKey: $('#w-tm-api-key'),
      widgetNode: widgetNode,
      widget: widget
    });
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

  $('#js_styling_nav_tab').on('shown.bs.tab', function (e) {
    $widthController.slider('relayout');
    $borderRadiusController.slider('relayout');
    windowScroll(); //recalculate widget container position
  });

  init();
})(jQuery);

(function ($) {
  var $modal = $('#get-eventId-modal'),
      $form = $('#js_get_eventId_form', $modal),
      $ul = $('#js_get_eventId_list'),
      $btn = $modal.find('#js_get-eventId_btn'),

  //$resultsCount = $form.find('.get_eventId_results'),
  cssValidationClass = 'get-eventId_form-validation';

  var keyword = $form.find('#keyword'),
      apikey = $('#w-tm-api-key'),
      eventUrl = function eventUrl() {
    return 'https://app.ticketmaster.com/discovery/v2/events.json';
  },
      pageIncrement = 0,
      loadingFlag = false;

  var loading = function loading(action) {
    // add the overlay with loading image to the page
    if (action == "on") {
      $('#spinner').show();
    } else if (action == "off") {
      $('#spinner').hide();
    }
  };

  function resetForm() {
    pageIncrement = 0;
    var listItems = $ul.find('li');
    listItems.remove();
    /*$form.find('input').each(function(){
      var $self = $(this);
      if($self.attr('id','keyword')){
        $self.val('');
      }
    });*/

    // Clear highlight
    $form.removeClass(cssValidationClass);
  }

  var renderResults = function renderResults(data, ulElement) {
    function showMessage(element, message, /*optional*/clearList) {
      $btn.attr('disabled', false);

      if (clearList) $('li', element).remove();
      element.css({
        'overflow': 'auto'
      });
      $('<li/>').addClass('list-group-item').text('' + message).appendTo(ulElement);
    };

    function getImageForEvent(images) {
      images.sort(function (a, b) {
        if (a.width < b.width) return -1;else if (a.width > b.width) return 1;else return 0;
      });
      return images[0].url;
    }

    if (loadingFlag === "FINAL_PAGE") return false;

    if (data === 'FAIL') {
      showMessage($ul, 'Failure, possible key not correct.', true);return false;
    }

    if (loadingFlag === 'STOP_LOAD' && data.length !== 0) {
      loadingFlag = "FINAL_PAGE";
      showMessage(ulElement, 'No more results.', false);
      return false;
    }

    if (data === null || !data._embedded) {
      showMessage(ulElement, 'No results found.', true);return false;
    }

    //start render data
    var items = data._embedded.events;

    items.map(function (item) {
      var li = $('<li/>').addClass('list-group-item row').appendTo(ulElement);

      var spanImg = $('<span class="thumbnail" />').appendTo(li);
      var img = $('<img src=' + getImageForEvent(item.images) + ' />').addClass('list-group-item-heading').appendTo(spanImg);

      var $wrapCol = $('<div class="event-text-wrapper"/>').appendTo(li);
      var title = $('<h3/>').addClass('list-group-item-heading').text(' ' + item.name).appendTo($wrapCol);

      /*add time*/
      var currentEvent = {};
      currentEvent.date = {
        day: item.dates.start.localDate,
        time: item.dates.start.localTime,
        dateTime: item.dates.start.dateTime
      };

      var time = widgetsCountdown[0].formatDate(currentEvent.date);
      var eventTime = $('<h4/>').addClass('event-time').text(time).appendTo($wrapCol);
      /*add time end*/

      if (item._embedded && item._embedded.venues) {
        var venue = item._embedded.venues[0];
        var addressName = $('<span/>').addClass('address-name').text(venue.name + '. ').appendTo($wrapCol);

        if ('address' in venue && 'line1' in venue.address) {
          var addressline1 = $('<span/>').addClass('address-line1').text(venue.address.line1).appendTo($wrapCol);
          if ('line2' in venue.address) {
            var _addressline = $('<span/>').addClass('address-line2').text(venue.address.line2).appendTo(_addressline);
          }
        }
      } else {
        console.log('no _embedded found');
      }

      var buttonSetId = $('<button data-event="' + item.id + '"/>').addClass('js_set-eventId_btn btn btn-submit').text('Set this ID').appendTo(li).wrap('<div class ="wrapper-set-eventId_btn text-right"/>');
    });

    $('.js_set-eventId_btn').on('click', function (e) {
      var selectedID = e.target.getAttribute('data-event'),

      //find configurator and widget
      widget = widgetsCountdown[0],
          widgetNode = document.querySelector("div[w-tmapikey]");
      var isFullWidthTheme = function isFullWidthTheme() {
        return widgetNode.getAttribute('w-theme') === "fullwidth";
      };

      $('#w-id').val(selectedID);
      widgetNode.setAttribute('w-id', selectedID);
      if (isFullWidthTheme) {
        widgetNode.style.width = '100%';
      }

      /*
      //toggle $getCodeButton
      if ( widgetNode.getAttribute('w-id') === '') {
        $getCodeButton.prop("disabled",true);
      }else {
        $getCodeButton.prop('disabled',false);
      }
      */

      widget.update(isFullWidthTheme);

      // Close dialog
      $modal.modal('hide');
    });

    $btn.attr('disabled', false);
  };

  function submitForm( /*optional*/pageNumero) {
    pageNumero = parseInt(pageNumero);

    var url = Number.isNaN(pageNumero) ? eventUrl() + '?apikey=' + apikey.val() + '&keyword=' + keyword.val() : eventUrl() + '?apikey=' + apikey.val() + '&keyword=' + keyword.val() + '&page=' + pageNumero;

    //stop load
    if (Number.isNaN(pageNumero) && pageNumero !== 0 && loadingFlag === 'STOP_LOAD') {
      renderResults(null, $ul);
      return false;
    };

    if (loadingFlag === 'FINAL_PAGE') return false;

    $.ajax({
      dataType: 'json',
      async: true,
      url: url,
      data: $form.serialize()
    }).done(function (result) {
      if (result) {

        //last page reached
        if (pageIncrement === result.page.totalPages && result.page.totalElements > 0) {
          loadingFlag = 'STOP_LOAD';
          loading('off');
          renderResults(result, $ul); //add message at bottom of list
          return false;
        };

        renderResults(result, $ul);
        loading('off');
      } else {
        console.log('no result found');
      }
    }).fail(function (e) {
      console.log('There was an fail status - ' + e.status);
      loading('off');
      renderResults('FAIL', $ul);
    });
  }

  $ul.on('scroll', function (elm) {
    //submitForm when go to bottom of list
    if ($form.get(0).checkValidity()) {

      if (this.scrollTop + this.clientHeight == this.scrollHeight && loadingFlag === 'KEEP_LOAD') {
        pageIncrement++;
        $btn.attr('disabled', true);
        loading('on');
        submitForm(pageIncrement);
      }
    }
  });

  // EVENTS
  $btn.on('click', function () {
    var form = $form.get(0);
    if (!$btn.is(':disabled')) {
      if (form.checkValidity()) {
        $btn.attr('disabled', true);
        pageIncrement = 0;
        loadingFlag = 'KEEP_LOAD';
        loading('on'); //show loading-spinner
        resetForm(); //clear
        submitForm(pageIncrement);
      } else {
        // Highlight errors
        if (form.reportValidity) form.reportValidity();
        $form.addClass(cssValidationClass);
      }
    }
  });

  $form.on("change", function () {
    if ($form.get(0).checkValidity()) {
      pageIncrement = 0;
      loadingFlag = 'KEEP_LOAD';
      loading('on');
      resetForm();
      submitForm(pageIncrement);
    }
  });
  // Mobile devices. Force 'change' by 'Go' press

  $form.on("submit", function (e) {
    e.preventDefault();
  });

  $modal.on('hidden.bs.modal', function (e) {
    resetForm();
    keyword.val(''); //clear search input
  });
})(jQuery);
//# sourceMappingURL=main-widget-config.js.map