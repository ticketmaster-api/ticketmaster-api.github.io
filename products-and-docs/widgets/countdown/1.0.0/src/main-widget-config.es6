(function(){

  let widget = widgetsCountdown[0];
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

  /*
  <input id="w-fixed-300x250" type="radio" value="l" name="w-proportion">
    <label for="w-fixed-300x250">300x250</label>
  <input id="w-fixed-728x90" type="radio" value="xl" name="w-proportion">
    <label for="w-fixed-728x90">728x90</label>
  <input id="w-fixed-160x600" type="radio" value="m" name="w-proportion">
    <label for="w-fixed-160x600">160x600</label>
  <input id="w-fixed-180x150" type="radio" value="s" name="w-proportion">
    <label for="w-fixed-180x150">180x150</label>
  */

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
  $tabButtons = $('.js-tab-buttons');

  $('#js_styling_nav_tab').on('shown.bs.tab', function (e) {
    $widthController.slider('relayout');
    $borderRadiusController.slider('relayout');
  });

  function toggleDisabled(widgetNode){
    if ( widgetNode.getAttribute('w-id') === '') {
      $getCodeButton.prop("disabled",true);
    }else {
      $getCodeButton.prop('disabled',false);
    };
  }

  var changeState = function(event){
    if(!event.target.name){
      return;
    }
    const targetValue = event.target.value,
        targetName = event.target.name;


    // if(targetName === "w-theme"){
    //   if(widgetNode.getAttribute('w-layout') === 'horizontal'){
    //     widgetNode.setAttribute('w-height', getHeightByTheme(targetValue));
    //   }
    //   widgetNode.setAttribute('w-border', getBorderByTheme(targetValue));
    // }
    //console.log('start change');


    /*
    //set attr for 'seconds' radio-btn
    if(targetName === "w-seconds"){
      if (targetValue !== 'showSeconds') {
        widgetNode.setAttribute('w-seconds', 'hideSeconds');
      }
    }
    */

    if(targetName === "w-layout"){
      let sizeConfig = themeConfig.simple_countdown.initSliderSize;

      if(targetValue === 'horizontal'){
        sizeConfig = {
          width: 620,
          // height: getHeightByTheme(widgetNode.getAttribute('w-theme')),
          height: 252,
          maxWidth: 900,
          minWidth: 620
        };
      }

      $widthController.slider({
          setValue: sizeConfig.width ,
          max: sizeConfig.maxWidth,
          min: sizeConfig.minWidth
        })
        .slider('refresh');

      widgetNode.setAttribute('w-width', sizeConfig.width);
      widgetNode.setAttribute('w-height', sizeConfig.height);
    }

    //Check fixed sizes for 'simple_countdown' theme
    if(targetName === "w-proportion") {
      let widthSlider = $('.js_widget_width_slider');
      let sizeConfig = {
        width: themeConfig.simple_countdown.sizes[targetValue].width,
        height: themeConfig.simple_countdown.sizes[targetValue].height,
        maxWidth: 600,
        minWidth: 350
      };

      //set layout
      widgetNode.setAttribute('w-layout', themeConfig.simple_countdown.sizes[targetValue].layout);

      if (targetValue !== 'custom') {
        $tabButtons.slideUp("fast");
        widthSlider.slideUp("fast");
      }else{
        $tabButtons.slideDown("fast");
        widthSlider.slideDown("fast");
        $('input:radio[name="w-layout"][value="vertical"]',$tabButtons).prop('checked', true);

        sizeConfig = { //default size
          width: themeConfig.simple_countdown.initSliderSize.width,  //350
          height: themeConfig.simple_countdown.initSliderSize.height,  //600
          maxWidth: themeConfig.simple_countdown.initSliderSize.maxWidth,  //500
          minWidth: themeConfig.simple_countdown.initSliderSize.minWidth // 350
        };
        $widthController.slider({
            setValue: sizeConfig.width,
            max: sizeConfig.maxWidth,
            min: sizeConfig.minWidth
          })
          .slider('refresh');
      }

      widgetNode.setAttribute('w-width', sizeConfig.width);
      widgetNode.setAttribute('w-height', sizeConfig.height);
    }

    widgetNode.setAttribute(event.target.name, event.target.value); //set attr in widget

    toggleDisabled(widgetNode);//set disabled btn if input is empty

    widget.update();
  };

  var resetWidget = function(configForm) {
    let widthSlider = $('.js_widget_width_slider'),
        height = 600,
        theme,
        layout,
        $tabButtons = $('.js-tab-buttons');

    configForm.find("input[type='text']").each(function(){
      let $self = $(this),
          data = $self.data(),
          value = data.defaultValue;

      if(data.sliderValue){
        value = data.sliderValue;
        $self.slider({
          setValue: value,
          max: data.sliderMax,
          min: data.sliderMin
        })
        .slider('refresh');
      }else{
        $self.val(value);
      }

      widgetNode.setAttribute($self.attr('name'), value);
    });

    configForm.find("input[type='radio']").each(function(){
      var $self = $(this);
      if($self.data('is-checked')){
        let name = $self.attr('name'),
            val = $self.val();
        if(name === 'w-theme'){
          theme = val;
        }else if(name === 'w-layout'){
          layout = val;
        }else if(name === 'w-proportion'){
          $tabButtons.slideDown("fast");
          widthSlider.slideDown("fast");
        }
        $self.prop('checked', true);
        widgetNode.setAttribute($self.attr('name'), val);
      }
    });

    $tabButtons.slideDown("fast");
    widthSlider.slideDown("fast");

    if(layout === 'horizontal'){
      //height = getHeightByTheme(theme);
      height = 252;
    }
    widgetNode.setAttribute('w-height', height);

    toggleDisabled(widgetNode);//set disabled btn if input is empty

    widget.update();
  };

  var $configForm = $(".main-widget-config-form"),
      $widgetModal = $('#js_widget_modal'),
      $widgetModalNoCode = $('#js_widget_modal_no_code');

  $configForm.on("change", changeState);
  // Mobile devices. Force 'change' by 'Go' press

  $configForm.on("submit", function (e) {
    //console.log('pressed on.submit');
    $configForm.find('input:focus').trigger('blur');
    e.preventDefault();
  });

  /*set tooltip value above slider*/
  $configForm.find("input[type='text']").each(function(){
    var $self = $(this);
    $self.data('default-value', $self.val());
  });

  $configForm.find("input[type='radio']").each(function(){
    var $self = $(this);
    if($self.is(':checked'))
      $self.data('is-checked', 'checked');
  });

  $getCodeButton.on('click', function(){
    var codeCont = document.querySelector(".language-html.widget_dialog__code");

    var htmlCode = document.createElement("div");
    for(var key in widget.config){
      htmlCode.setAttribute("w-"+key,widget.config[key]);
    }
    var tmp = document.createElement("div");
    tmp.appendChild(htmlCode);
    codeCont.textContent = tmp.innerHTML;
    $widgetModal.modal();
  });


  $('.js_reset_widget').on('click', function(){
    resetWidget($configForm);
  });

  $('#js_widget_modal__close').on('click', function(){
    $widgetModal.modal('hide');
  });

  $('#js_widget_modal_no_code__close').on('click', function(){
    $widgetModalNoCode.modal('hide');
  });

})();