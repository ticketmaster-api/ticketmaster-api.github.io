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
    //$resultsCount = $form.find('.get_eventId_results'),
    cssValidationClass = 'get-eventId_form-validation';

  let keyword = $form.find('#keyword'),
      apikey =  $('#w-tm-api-key'),
      eventUrl = ()=>{ return 'https://app.ticketmaster.com/discovery/v2/events.json' },
      pageIncrement = 0,
      loadingFlag = false;

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

  let loading = function(action) {
    // add the overlay with loading image to the page
    if(action=="on"){
      $('#spinner').show();
    }
    else if(action=="off"){
      $('#spinner').hide();
    }

  };

  function resetForm(){
    pageIncrement = 0;
    let listItems = $ul.find('li');
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

  var renderResults = function(data, ulElement){
    function showMessage(element,message, /*optional*/clearList) {
      $btn.attr('disabled',false);

      if(clearList) $('li',element).remove();
      element.css({
        'overflow': 'auto'
      });
      $('<li/>')
        .addClass('list-group-item')
        .text(`${message}`)
        .appendTo(ulElement);
    };

    if(loadingFlag === "FINAL_PAGE") return false;

    if(data === 'FAIL'){ showMessage($ul, 'Failure, possible key not correct ' ,true); return false; }

    if(loadingFlag === 'STOP_LOAD' && data.length !== 0 ){
      loadingFlag = "FINAL_PAGE";
      showMessage(ulElement, 'Reached final page', false);
      return false;
    }
    
    if(data === null || !data._embedded){ showMessage(ulElement, 'No result found' ,true); return false; }

    //start render data

    /*if(data.page.totalElements > 0){
      console.log('data.page.totalElements' , data.page.totalElements);
      $resultsCount.val(data.page.totalElements);
      $resultsCount.show();
    }else $resultsCount.hide();*/

    let items = data._embedded.events;

    items.map( (item ) => {
      let li = $('<li/>')
        .addClass('list-group-item row')
        .appendTo(ulElement);
      let $wrapCol = $('<div class="event-text-wrapper"/>')
        .appendTo(li);
      let title = $('<h3/>')
        .addClass('list-group-item-heading')
        .text(` ${item.name}`)
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

        if ('address' in venue && 'line1' in venue.address) {
          let addressline1 = $('<span/>')
            .addClass('address-line1')
            .text(venue.address.line1)
            .appendTo($wrapCol);
          if ('line2' in venue.address) {
            let addressline1 = $('<span/>')
              .addClass('address-line2')
              .text(venue.address.line2)
              .appendTo(addressline1);
          }
        }
      }else{
        console.log(`no _embedded found`);
      }

      let buttonSetId = $(`<button data-event="${item.id}"/>`)
        .addClass('js_set-eventId_btn btn btn-submit')
        .text(`Set this ID`)
        .appendTo(li)
        .wrap('<div class ="wrapper-set-eventId_btn text-right"/>');


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
    });

    $btn.attr('disabled',false);

  };

  function submitForm( /*optional*/pageNumero){
    pageNumero = parseInt(pageNumero);

    let url = ( Number.isNaN(pageNumero) )
      ? `${eventUrl()}?apikey=${apikey.val()}&keyword=${keyword.val()}`
      : `${eventUrl()}?apikey=${apikey.val()}&keyword=${keyword.val()}&page=${pageNumero}`;

    //stop load
    if( Number.isNaN(pageNumero) && pageNumero !== 0 && loadingFlag==='STOP_LOAD') {
      renderResults(null, $ul);
      return false
    };

    if(loadingFlag === 'FINAL_PAGE') return false;

    $.ajax({
      dataType: 'json',
      async: true,
      url: url,
      data: $form.serialize()
    }).done(function(result) {
      if(result) {

        //last page reached
        if(pageIncrement === result.page.totalPages && result.page.totalElements > 0) {
          loadingFlag = 'STOP_LOAD';
          loading('off');
          renderResults(result, $ul); //add message at bottom of list
          return false;
        };

        renderResults(result, $ul);
        loading('off');
      }else {
        console.log(`no result found` );
      }
    }).fail(function(e) {
      console.log(`There was an fail status - ${e.status}` );
      loading('off');
      renderResults('FAIL', $ul);
    });

  }

  $ul.on('scroll', function (elm){
    //submitForm when go to bottom of list
    if($form.get(0).checkValidity()) {

      if (this.scrollTop + this.clientHeight == this.scrollHeight && loadingFlag === 'KEEP_LOAD') {
        pageIncrement++;
        $btn.attr('disabled', true);
        loading('on');
        submitForm(pageIncrement);
      }

    }

  });

  // EVENTS
  $btn.on('click', function(){
    var form = $form.get(0);
    if(!$btn.is(':disabled')){
      if(form.checkValidity()) {
        $btn.attr('disabled', true);
        pageIncrement = 0;
        loadingFlag = 'KEEP_LOAD';
        loading('on'); //show loading-spinner
        resetForm(); //clear
        submitForm(pageIncrement);
      }else{
        // Highlight errors
        if(form.reportValidity) form.reportValidity();
        $form.addClass(cssValidationClass);
      }
    }
  });


  $form.on("change", function(){
    if($form.get(0).checkValidity()) {
      pageIncrement = 0;
      loadingFlag = 'KEEP_LOAD';
      loading('on');
      resetForm();
      submitForm(pageIncrement);
    }
  } );
  // Mobile devices. Force 'change' by 'Go' press

  $form.on("submit", function (e) {
    e.preventDefault();
  });

  $modal.on('hidden.bs.modal',function (e) {
    resetForm();
    keyword.val('');//clear search input
  });

})(jQuery);