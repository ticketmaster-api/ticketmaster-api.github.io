'use strict';

(function () {

  var themeConfig = {
    simple: {
      name: 'Poster',
      sizes: {
        s: {
          width: 160,
          height: 300,
          layout: 'horizontal'
        },
        m: {
          width: 160,
          height: 300,
          layout: 'horizontal'
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
          height: 550,
          layout: 'vertical'
        }
      },
      initSliderSize: {
        width: 350,
        height: 550,
        maxWidth: 500,
        minWidth: 350
      }
    }
  };

  // function getHeightByTheme(theme){
  //   return (theme === 'simple' ? 238 : 300);
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
  });

  $('#js_styling_nav_tab').on('shown.bs.tab', function (e) {
    $widthController.slider('relayout');
    $borderRadiusController.slider('relayout');
  });

  var changeState = function changeState(event) {
    if (!event.target.name) {
      return;
    }
    var widgetNode = document.querySelector("div[w-tmapikey]"),
        targetValue = event.target.value,
        targetName = event.target.name,
        $tabButtons = $('.widget__layout_control .js-tab-buttons');

    // if(targetName === "w-theme"){
    //   if(widgetNode.getAttribute('w-layout') === 'horizontal'){
    //     widgetNode.setAttribute('w-height', getHeightByTheme(targetValue));
    //   }
    //   widgetNode.setAttribute('w-border', getBorderByTheme(targetValue));
    // }

    if (targetName === "w-layout") {
      var sizeConfig = themeConfig.simple.initSliderSize;
      if (targetValue === 'horizontal') {
        sizeConfig = {
          width: 620,
          // height: getHeightByTheme(widgetNode.getAttribute('w-theme')),
          height: 300,
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

    //Check fixed sizes for 'simple' theme
    if (targetName === "w-proportion") {
      var widthSlider = $('.js_widget_width_slider');
      var sizeConfig = {
        width: themeConfig.simple.sizes[targetValue].width,
        height: themeConfig.simple.sizes[targetValue].height,
        maxWidth: 600,
        minWidth: 350
      };

      //set layout
      widgetNode.setAttribute('w-layout', themeConfig.simple.sizes[targetValue].layout);

      if (targetValue !== 'custom') {
        $tabButtons.hide();
        widthSlider.hide();
      } else {
        $tabButtons.show();
        widthSlider.show();
        $('input:radio[name="w-layout"][value="vertical"]', $tabButtons).prop('checked', true);

        sizeConfig = { //default size
          width: themeConfig.simple.initSliderSize.width, //350
          height: themeConfig.simple.initSliderSize.height, //550
          maxWidth: themeConfig.simple.initSliderSize.maxWidth, //500
          minWidth: themeConfig.simple.initSliderSize.minWidth // 350
        };
        $widthController.slider({
          setValue: sizeConfig.width,
          max: sizeConfig.maxWidth,
          min: sizeConfig.minWidth
        }).slider('refresh');
      }

      widgetNode.setAttribute('w-width', sizeConfig.width);
      widgetNode.setAttribute('w-height', sizeConfig.height);
    }

    widgetNode.setAttribute(event.target.name, event.target.value);

    widgetCountdown.update();
  };

  var resetWidget = function resetWidget(configForm) {
    var widgetNode = document.querySelector("div[w-tmapikey]"),
        height = 550,
        theme = undefined,
        layout = undefined;

    configForm.find("input[type='text']").each(function () {
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
        }
        $self.prop('checked', true);
        widgetNode.setAttribute($self.attr('name'), val);
      }
    });

    if (layout === 'horizontal') {
      height = getHeightByTheme(theme);
    }
    widgetNode.setAttribute('w-height', height);

    widgetCountdown.update();
  };

  var $configForm = $(".main-widget-config-form"),
      $widgetModal = $('#js_widget_modal'),
      $widgetModalNoCode = $('#js_widget_modal_no_code');

  $configForm.on("change", changeState);
  // Mobile devices. Force 'change' by 'Go' press
  $configForm.on("submit", function (e) {
    $configForm.find('input:focus').trigger('blur');
    e.preventDefault();
  });

  $configForm.find("input[type='text']").each(function () {
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
    for (var key in widgetCountdown.config) {
      htmlCode.setAttribute("w-" + key, widgetCountdown.config[key]);
    }
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
})();
//# sourceMappingURL=main-widget-config.js.map