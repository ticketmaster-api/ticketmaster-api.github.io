var $widgetModal = $('#js_widget_modal'),
    $widgetModalNoCode = $('#js_widget_modal_no_code');

(function(){
  //

  var config = {"ak":"KRUnjq8y8Sg5eDpP90dNzOK70d4WiUst","kw":"Def","t":{"n":"t1","b":false,"h":550,"w":350,"br":4}};

  $(".main-widget-config-form").on("change",function(){
    switch (event.target.id) {
      case "api-key" : config.ak = event.target.value; break;
      case "key-word": config.kw = event.target.value; break;
      case "width"   : config.t.w = event.target.value; break;
      case "radius"  : config.t.br = event.target.value;  break;
      case "has-border" : config.t.b = event.target.checked; break;
    }
    document.getElementById("ticketmaster-config").dataset.config = widget.encConfig(JSON.stringify(config));
    widget.update();
  });


  var $widgetModal = $('#js_widget_modal'),
      $widgetModalNoCode = $('#js_widget_modal_no_code');
  $('#js_get_widget_code').on('click', function(){
    document.getElementById("config-hash").textContent = widget.encConfig(JSON.stringify(widget.config));
    $widgetModal.modal();
  });

  $('#js_widget_modal__close').on('click', function(){
    $widgetModal.modal('hide');
  });

  $('#js_widget_modal_no_code__close').on('click', function(){
    $widgetModalNoCode.modal('hide');
  });

})();