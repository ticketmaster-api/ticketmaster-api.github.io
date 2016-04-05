(function(){


  var themeConfig = {      
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
  };


  function getHeightByTheme(theme){
    return (theme === 'simple' ? 238 : 300);
  }

  function getBorderByTheme(theme) {
    switch (theme) {
      case "oldschool":
        return 2;
        break;
      case "newschool":
        return 1;
        break;
      default:
        return 0;
    }
  }

  // TODO: do we need 'config' variable ?
  var config = {"ak":"KRUnjq8y8Sg5eDpP90dNzOK70d4WiUst","kw":"Def","t":{"n":"t1","b":false,"h":550,"w":350,"br":4}};

  var $layoutSelectors = $('#w-colorscheme-light, #w-colorscheme-dark'),
  $widthController = $('#w-width').slider({
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

  var changeState = function(event){
    if(!event.target.name){
      return;
    }
    let widgetNode = document.querySelector("div[w-tmapikey]"),
        targetValue = event.target.value,
        targetName = event.target.name,
        $tabButtons = $('.js-tab-buttons');

    if(targetName === "w-postalcode"){
      widgetNode.setAttribute('w-country', '');
      $('#w-country').prop('disabled', true)
        .data('cleared', true)
        .html('');
    }

    if(targetName === "w-theme"){
      if(targetValue === 'simple'){
        $layoutSelectors.prop('disabled', true);
      }else{
        $layoutSelectors.prop('disabled', false);
      }

      if(widgetNode.getAttribute('w-layout') === 'horizontal'){
        widgetNode.setAttribute('w-height', getHeightByTheme(targetValue));
      }
      widgetNode.setAttribute('w-border', getBorderByTheme(targetValue));
    }

    if(targetName === "w-layout"){
      let sizeConfig = themeConfig.initSliderSize;
      if(targetValue === 'horizontal'){
        sizeConfig = {
          width: 620,
          height: getHeightByTheme(widgetNode.getAttribute('w-theme')),
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

    //Check fixed sizes for 'simple' theme
    if(targetName === "w-proportion") {
      let widthSlider = $('.js_widget_width_slider');
      let sizeConfig = {
        width: themeConfig.sizes[targetValue].width,
        height: themeConfig.sizes[targetValue].height,
        maxWidth: 600,
        minWidth: 350
      };

      //set layout
      widgetNode.setAttribute('w-layout', themeConfig.sizes[targetValue].layout);

      if (targetValue !== 'custom') {
        $tabButtons.hide();
        widthSlider.hide();
      }else{
        $tabButtons.show();
        widthSlider.show();
        $('input:radio[name="w-layout"][value="vertical"]',$tabButtons).prop('checked', true);

        sizeConfig = { //default size
          width: themeConfig.initSliderSize.width,  //350
          height: themeConfig.initSliderSize.height,  //550
          maxWidth: themeConfig.initSliderSize.maxWidth,  //500
          minWidth: themeConfig.initSliderSize.minWidth // 350
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

    // if(event.target.name === "border"){
      //if(event.target.checked){
      //  widgetNode.setAttribute(event.target.id, "");
      //}
      //else{
      //  widgetNode.removeAttribute(event.target.id);
      //}
    // }
    // else {}

    widgetNode.setAttribute(event.target.name, event.target.value);
    
    widget.update();
  };

  var resetWidget = function(configForm) {
    let widgetNode = document.querySelector("div[w-tmapikey]"),
        height = 550,
        theme,
        layout;

    configForm.find("input[type='text'], input[type='number']").each(function(){
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
        }
        $self.prop('checked', true);
        widgetNode.setAttribute($self.attr('name'), val);
      }
    });

    if(layout === 'horizontal'){
      height = getHeightByTheme(theme);
    }
    widgetNode.setAttribute('w-height', height);

    widget.update();
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

  $configForm.find("input[type='text'], input[type='number']").each(function(){
    var $self = $(this);
    $self.data('default-value', $self.val());
  });

  $configForm.find("input[type='radio']").each(function(){
    var $self = $(this);
    if($self.is(':checked'))
      $self.data('is-checked', 'checked');
  });

  $('.js_get_widget_code').on('click', function(){
    var codeCont = document.querySelector(".language-html.widget_dialog__code");

    var htmlCode = document.createElement("div");
    for(var key in widget.config){
      if(key !== 'latlong'){
        htmlCode.setAttribute("w-"+key,widget.config[key]);
      }
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

  $('.js_widget__number').on('change', function (e) {
    let $self = $(this),
      val = $self.val().trim(),
      max = parseInt($self.attr('max')),
      min = parseInt($self.attr('min')),
      required = !!$self.attr('required'),
      regNumberOrEmpty = /^(\s*|\d+)$/,
      errorCssClass = 'error';

    // if(val === '') $self.val('');

    if((max && val > max) || (min && val < min) || (required && val === '') || (!regNumberOrEmpty.test(val))){
      $self.addClass(errorCssClass);
      e.preventDefault();
      e.stopPropagation();
    }else{
      $self.removeClass(errorCssClass);
    }
  });

  $('#w-country').data('cleared', true);
  widget.onLoadCoordinate = function (response, countryShortName = '') {
    widget.config['country'] = countryShortName;
    let $countrySelect = $('#w-country'),
      options = '';

    if(response){
      if(response.status === 'OK'){
        if(response.results){
          $countrySelect.prop('disabled', !response.results.length);
          if($countrySelect.data('cleared')){
            $countrySelect
              .data('cleared', false)
              .html('');
            for(let i in response.results){
              let result = response.results[i];
              if(result.address_components){
                let country = result.address_components[result.address_components.length - 1];
                if(country){
                  let isSelected = country.short_name === countryShortName ? 'selected' : '';
                  options += `<option ${isSelected} value="${country.short_name}">${country.long_name}</option>`;
                }
              }
            }
            $countrySelect.append(options);
          }
        }
      }
    }

    if(!options){
      $countrySelect.html(`<option>All</option>`);
    }
  }

})();