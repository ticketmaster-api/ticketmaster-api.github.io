(function(){

  const DEFAULT_API_KEY = apiKeyService.getApiWidgetsKey();

  function getHeightByTheme(theme){
    return (theme === 'simple' ? 286 : 339);
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

  function getGooleApiKey(code) { return code || "AIzaSyBQrJ5ECXDaXVlICIdUBOe8impKIGHDzdA";}

  let widget = widgetsEventDiscovery[0],
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
  function setLimits(){
    //max and min container movements
    var topCss = ($containerWidget.css("top")>0) ? parseInt($containerWidget.css("top")) : 0;
    var headerOffset = $('.top-bar').height() + /*padding of top-bar*/8 + /*bottom-margin*/10;
    var max_move = $configBlock.offset().top + $configBlock.height() - $containerWidget.height() - topCss - headerOffset;
    var min_move = $configBlock.offset().top - headerOffset;

    $containerWidget
      .data('min', min_move)
      .data('max', max_move);

    //window thresholds so the movement isn't called when its not needed!
    window_min = min_move - threshold_offset;
    window_max = max_move + $containerWidget.height() + threshold_offset;
  }
  //sets the limits for the first load
  setLimits();

  function windowScroll(){
    let innerWidth = window.innerWidth;
    let j = 0;
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
    if(j === 0) updateScroll();

    setTimeout(() => {
      if (innerWidth < desktopWidth && $containerWidget.height() > $configBlock.height()) {
        // console.log('*** ', j , innerWidth ,'<', desktopWidth );
        containerMove_clearOffset();
        updateScroll();
      }
      if($containerWidget.height() < $configBlock.height() || innerWidth >= desktopWidth) {
        // console.log('ignore ',j);
        if( innerWidth < desktopWidth ){
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
  function containerMove_clearOffset(){
    $containerWidget.css("margin-top", 0);
  }
  /**
   * Handles moving the container if needed.
   **/
  function containerMove(){
    let marginTop = 0;
    const wst = $window.scrollTop(),
      {min, max} = $containerWidget.data();

    //if the window scroll is within the min and max (the container will be 'sticky';
    if( wst >= min && wst <= max ){
      //if the window scroll is below the minimum move it down!
      marginTop = wst - min;
    }else if( wst > max ){
      marginTop = max - min;
    }
    $containerWidget.css('marginTop', (marginTop > 0 ? marginTop : 0));
  }
  //do one container move on load
  containerMove();

  var replaceApiKey = function (options) {
    let userKey = options.userKey || sessionStorage.getItem('tk-api-key');

    if(userKey !== null) {
      let {inputApiKey, widgetNode , widget } = options;
      inputApiKey
        .attr('value',userKey)
        .val(userKey);
      widgetNode.setAttribute("w-tm-api-key", userKey);
      widget.update();
    }
  };
  replaceApiKey({
      inputApiKey:$('#w-tm-api-key'),
      widgetNode: document.querySelector("div[w-tmapikey]"),
      widget
    });

  /**
   * check if user logged just before enter widget page
   */
  $window.on('login', function (e, data) {
    replaceApiKey(
      {
        userKey: data.key,
        inputApiKey:$('#w-tm-api-key'),
        widgetNode: document.querySelector("div[w-tmapikey]"),
        widget
      }
    );
  });


  var changeState = function(event){
    if(!event.target.name || event.target.name === "w-googleapikey") return;

    let widgetNode = document.querySelector("div[w-tmapikey]"),
        targetValue = event.target.value,
        targetName = event.target.name,
        $tabButtons = $('.js-tab-buttons');

    if(targetName === "w-tm-api-key") {
      document.querySelector('[w-type="event-discovery"]').setAttribute('w-tmapikey', targetValue);

      if (sessionStorage.getItem('tk-api-key')) {
        document.getElementById('w-tm-api-key').value = sessionStorage.getItem('tk-api-key');
        document.querySelector('[w-type="event-discovery"]').setAttribute('w-tmapikey', sessionStorage.getItem('tk-api-key'));
      }
      if (document.getElementById('w-tm-api-key').value == '') {
        if (sessionStorage.getItem('tk-api-key')) {
          document.getElementById('w-tm-api-key').value = sessionStorage.getItem('tk-api-key');
          document.querySelector('[w-type="event-discovery"]').setAttribute('w-tmapikey', sessionStorage.getItem('tk-api-key'));
        }
        else {
          document.getElementById('w-tm-api-key').value = DEFAULT_API_KEY;
          document.querySelector('[w-type="event-discovery"]').setAttribute('w-tmapikey', DEFAULT_API_KEY);
        }
      }
    }

    if(targetName === "w-postalcode"){
      widgetNode.setAttribute('w-country', '');
      isPostalCodeChanged = true;
    }

    if(targetName === "w-theme"){
      if(targetValue === 'simple'){
        $colorSchemeSelector.hide();
      }else{
        $colorSchemeSelector.show();
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
        $tabButtons.slideUp("fast");
        widthSlider.slideUp("fast");
      }else{
        $tabButtons.slideDown("fast");
        widthSlider.slideDown("fast");
        $('input:radio[name="w-layout"][value="vertical"]',$tabButtons).prop('checked', true);

        sizeConfig = { //default size
          width: themeConfig.initSliderSize.width,  //350
          height: themeConfig.initSliderSize.height,  //600
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

    widgetNode.setAttribute(event.target.name, event.target.value);
    widget.update();

    windowScroll(); //recalculate widget container position
  };

  var resetWidget = function(configForm) {
    let widgetNode = document.querySelector("div[w-tmapikey]"),
      height = 600,
      theme,
      layout;
    const widthSlider = $('.js_widget_width_slider'),
      $tabButtons = $('.js-tab-buttons');

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

      document.getElementById("w-country").disabled = true;
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

    if(layout === 'horizontal'){
      height = getHeightByTheme(theme);
    }
    widgetNode.setAttribute('w-height', height);
    widgetNode.setAttribute('w-border', 0);

    $('.country-select .js_custom_select').removeClass('custom_select-opened');//reset custom select
    widget.onLoadCoordinate();
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
    // Use only Key from config form
    htmlCode.setAttribute('w-googleapikey', getGooleApiKey());
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

  /*turn off validate cuz it moved to separate component*/
  /*$('.js_widget__number').on('change', function (e) {
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
  });*/

  widget.onLoadCoordinate = function (results, countryShortName = '') {
    widget.config['country'] = countryShortName;
    if(isPostalCodeChanged){
      isPostalCodeChanged = false;

      let $countrySelect = $('#w-country'),
        $ul = $(".country-select .js_widget_custom__list"),
        options = "<option selected value=''>All</option>";

      $countrySelect.html('');
      $ul.html(''); //clear custom select list
      $countrySelect.prop('disabled', !results);
      if(results){
        let status;
        if (results.length <=1) status = true;
        else status = false;
        $countrySelect.prop('disabled', status);
        // $countrySelect.prop('disabled', !results.length);
        options = '';
        for(let i in results){
          let result = results[i];
          if(result.address_components){
            let country = result.address_components[result.address_components.length - 1];
            if(country){
              let isSelected = country.short_name === countryShortName ? 'selected' : '';
              options += `<option ${isSelected} value="${country.short_name}">${country.long_name}</option>`;
            }
          }
        }
      }

      $countrySelect.append(options);
      addCustomList($ul, '#w-country', countryShortName);
    }
  };

  function addCustomList(listWrapperElement, listWrapperId, activeVal) {
    var $listOption = $(listWrapperId).find('option'),//update list
        $placeholder = $(".country-select").find(".custom_select__placeholder"),
        $ul = listWrapperElement;
  
    $placeholder.val( $listOption.html() );

    $listOption.each(function () {
      var data = {
        value: $(this).val()
      };
      $ul.append(`<li class="custom_select__item ${activeVal === data.value ? 'custom_select__item-active' : ''}" data-value="${data.value}">${$(this).text()}</li>`)
    });
  }

  // clearDropDownInput(['#w-countryCode','#w-source']);
  function clearDropDownInput(elemIds) {
    elemIds.map((item)=> {
      $(item).val('');
    } );
  }


  // Set min widget size on mobile devices
  if(parseInt($(window).width(), 10) < 767){
    $('#w-fixed-300x250').trigger('click');
  }
})();