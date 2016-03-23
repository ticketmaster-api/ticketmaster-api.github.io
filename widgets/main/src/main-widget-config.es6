(function(){

  var config = {"ak":"KRUnjq8y8Sg5eDpP90dNzOK70d4WiUst","kw":"Def","t":{"n":"t1","b":false,"h":550,"w":350,"br":4}};

  var changeState = function(event){
    let widgetNode = document.querySelector("div[w-tmapikey]");

    function getHeightByTheme(theme){
      return (theme === 'simple' ? 238 : 300);
    }

    if(event.target.name === "w-theme"){
      var $layoutSelectors = $('#w-colorscheme-light, #w-colorscheme-dark');
      if(event.target.value === 'simple'){
        $layoutSelectors.prop('disabled', true);
      }else{
        $layoutSelectors.prop('disabled', false);
      }

      if(widgetNode.getAttribute('w-layout') === 'horizontal'){
        widgetNode.setAttribute('w-height', getHeightByTheme(event.target.value));
      }
    }

    if(event.target.name === "w-layout"){
      let sizeConfig = {
          width: 350,
          height: 550,
          maxWidth: 500,
          minWidth: 350
        };

      if(event.target.value === 'horizontal'){
        sizeConfig = {
          width: 620,
          height: getHeightByTheme(widgetNode.getAttribute('w-theme')),
          maxWidth: 900,
          minWidth: 620
        };
      }

      $("#w-width")
        .attr({
          max: sizeConfig.maxWidth,
          min: sizeConfig.minWidth
        })
        .val(sizeConfig.width);

      widgetNode.setAttribute('w-width', sizeConfig.width);
      widgetNode.setAttribute('w-height', sizeConfig.height);
    }

    if(event.target.name === "border"){
      //if(event.target.checked){
      //  widgetNode.setAttribute(event.target.id, "");
      //}
      //else{
      //  widgetNode.removeAttribute(event.target.id);
      //}
    }
    else {
      widgetNode.setAttribute(event.target.name, event.target.value);
    }

    widget.update();
  };

  var resetWidget = function(configForm) {
    let widgetNode = document.querySelector("div[w-tmapikey]");
    configForm.find("input[type='text'], input[type='range']").each(function(){
      let $self = $(this),
        value = $self.data('default-value');
      $self.val(value);
      widgetNode.setAttribute($self.attr('name'), value);
    });

    configForm.find("input[type='radio']").each(function(){
      var $self = $(this);
      if($self.data('is-checked')){
        $self.prop('checked', true);
        widgetNode.setAttribute($self.attr('name'), $self.val());
      }
    });

    widget.update();
  };

  var $configForm = $(".main-widget-config-form"),
      $widgetModal = $('#js_widget_modal'),
      $widgetModalNoCode = $('#js_widget_modal_no_code');

  $configForm.on("change", changeState);

  $configForm.find("input[type='text'], input[type='range']").each(function(){
    var $self = $(this);
    $self.data('default-value', $self.val());
  });

  $configForm.find("input[type='radio']").each(function(){
    var $self = $(this);
    if($self.is(':checked'))
      $self.data('is-checked', 'checked');
  });

  $('#js_get_widget_code').on('click', function(){
    var codeCont = document.querySelector(".language-html.widget_dialog__code");

    var htmlCode = document.createElement("div");
    for(var key in widget.config){
      htmlCode.setAttribute("w-"+key,widget.config[key])
    }
    var tmp = document.createElement("div");
    tmp.appendChild(htmlCode);
    codeCont.textContent = tmp.innerHTML;

    $widgetModal.modal();
  });


  $('#js_reset_widget').on('click', function(){
    resetWidget($configForm);
  });

  $('#js_widget_modal__close').on('click', function(){
    $widgetModal.modal('hide');
  });

  $('#js_widget_modal_no_code__close').on('click', function(){
    $widgetModalNoCode.modal('hide');
  });

  $("#w-size").on("keypress",function(event){
    var kchar = String.fromCharCode(event.keyCode);
    if(/[\w\d]/.test(kchar)){
      if(/\d/.test(kchar)){
        var newVal = (this.value.substring(0, this.selectionStart)
          + this.value.substring(this.selectionEnd)
          + kchar)*1;
        if(newVal > 100 || newVal < 1){
          event.preventDefault();
        }
      }
      else{
        event.preventDefault();
      }
    }
  });

})();