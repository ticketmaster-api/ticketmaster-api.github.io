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

(function($){
  let $modal = $('#get-eventId-modal'),
    $form = $('#js_get_eventId_form', $modal),
    $ul = $('#js_get_eventId_list'),
    $btn = $modal.find('#js_get-eventId_btn'),
    cssValidationClass = 'get-eventId_form-validation';

  let keyword = $form.find('#keyword'),
      apikey =  $('#w-tm-api-key').val(),
      eventUrl = ()=>{ return 'https://app.ticketmaster.com/discovery/v2/events.json' };

  // var removeListItemEffect = function(listItems){
  //   console.log( 'removeListItemEffect start ',listItems.length);
  //
  //   $btn.attr('disabled', true);
  //   listItems.hide("slow", function fnCollapse() {
  //     $(this).prev("li").hide("slow", fnCollapse);
  //     // if(!$(this).prev("li").length) $btn.removeAttr('disabled');
  //   });
  //   $btn.removeAttr('disabled');
  // };

  function resetForm(){
    let listItems = $ul.find('li');

    $btn.removeAttr('disabled');
    listItems.remove();
    $form.find('input').each(function(){
      var $self = $(this);
      if($self.attr('name')){
        $self.val('');
      }
    });

    // Clear highlight
    $form.removeClass(cssValidationClass);
  }

  var renderResults = function(data, ulElement){
    if(data.page.totalElements < 1){
      console.log(`Result found ${data.page.totalElements}`);
      ulElement.css({
          'overflow-y': 'hidden'
        });
      let titleNoResult = $('<li/>')
        .addClass('list-group-item')
        .text(`No result found`)
        .appendTo(ulElement);
      return false
    }

    let items = data._embedded.events,
        listWrapper = ulElement
                    .css({
                      'overflow-y': 'scroll',
                      'max-height': '500px',
                      'width': '100%'
                    });

    items.map( (item,i ) => {
      let li = $('<li/>')
        .addClass('list-group-item row ui-menu-item')
        .appendTo(listWrapper);
      let $wrapCol = $('<div style="padding-right: 110px;"/>')
        .appendTo(li);
      let title = $('<h3/>')
        .addClass('list-group-item-heading')
        .text(`${item.name}`)
        .appendTo($wrapCol);

      /*add time*/
      let currentEvent = {};
      currentEvent.date = {
        day: item.dates.start.localDate,
        time: item.dates.start.localTime,
        dateTime: item.dates.start.dateTime
      };

      let time = widgetsCountdown[0].formatDate(currentEvent.date);
      let eventTime = $('<h4/>')
        .addClass('event-time')
        .text(time)
        .appendTo($wrapCol);
      /*add time end*/


      if (item._embedded && item._embedded.venues) {
        let venue = item._embedded.venues[0];
        let addressName = $('<span/>')
          .addClass('address-name')
          .text(venue.name+'. ')
          .appendTo($wrapCol);

        if (venue.address.line1) {
          let addressline1 = $('<span/>')
            .addClass('address-line1')
            .text(venue.address.line1)
            .appendTo($wrapCol);
          if (venue.address.line2) {
            let addressline1 = $('<span/>')
              .addClass('address-line2')
              .text(venue.address.line2)
              .appendTo(addressline1);
          }
        }
      }else{
        console.log(`Please enter keyword`);
      }


      let buttonSetId = $(`<button data-event="${item.id}"/>`)
        .addClass('js_set-eventId_btn btn btn-submit')
        .css({'width': 'auto',
              'height': 'auto'})
        .text(`Set this ID`)
        // .data('ID', item.id)
        .appendTo(li)
        .wrap('<div style ="position: absolute; bottom: 10px; right: 10px;"/>');
      
      // $.data(buttonSetId, 'event-ID', item.id);

    });

    $('.js_set-eventId_btn').on('click',(e)=>{
      let selectedID = e.target.getAttribute('data-event'),
      //find configurator and widget
          widget = widgetsCountdown[0],
          widgetNode = document.querySelector("div[w-tmapikey]");
      $('#w-id').val(selectedID);
      widgetNode.setAttribute('w-id',selectedID);
      widget.update();

      // Close dialog
      $modal.modal('hide');
    })

  };

  function submitForm(){

    $btn.attr('disabled', true);
    // remove effect animation
    // let listItems = $ul.find('li');
    // console.log(' listItems.length ',listItems.length);
    // if (listItems.length < 0){
    //   removeListItemEffect(listItems);
    //   $ul.slideUp(500);
    //   listItems.delay( 800 ).remove();
    //
    //   console.log(' listItems ',listItems);
    // }else {
    //   $ul.show();
    //   listItems = null;
    // }

    $.ajax({
      dataType: 'json',
      async: true,
      url: `${eventUrl()}?apikey=${apikey}&keyword=${keyword.val()}`, //$form.attr('action'),
      data: $form.serialize()
    }).done(function(result) {
      // Show message
      //$modalAlert.modal();
      if(result) {
        resetForm();
        renderResults(result, $ul);
      }else {
        console.log(`no result found` );
      }
    }).fail(function() {
      console.log(`fail ${status}` );
    });
  }

  // EVENTS
  $btn.on('click', function(){
    var form = $form.get(0);
    if(!$btn.is(':disabled')){
      if(form.checkValidity()) {
        //$btn.attr('disabled', true);
        submitForm();
      }else{
        // Highlight errors
        if(form.reportValidity) form.reportValidity();
        $form.addClass(cssValidationClass);
      }
    }
  });


  $form.on("change",  submitForm);
  // Mobile devices. Force 'change' by 'Go' press

  $form.on("submit", function (e) {
    console.log('pressed on.submit');
    $form.find('input:focus').trigger('blur');
    e.preventDefault();
  });

  $modal.on('hidden.bs.modal', resetForm);

})(jQuery);