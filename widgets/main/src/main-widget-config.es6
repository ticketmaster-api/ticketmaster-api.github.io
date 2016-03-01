(function(){
  var config =  {"ak":"KRUnjq8y8Sg5eDpP90dNzOK70d4WiUst","kw":"zztop","t":{"b":"t1","h":540,"w":360}};
  $(".main-widget-config-form").on("change",function(){
    switch (event.target.id) {
      case "api-key" : config.ak = event.target.value; break;
      case "key-word": config.kw = event.target.value; break;
      case "width"   : config.t.w = event.target.value; break;
      case "radius"  : config.t.br = event.target.value;  break;
      case "has-border" : config.t.b = event.target.checked; break;
    }
    var encoded = widget.encConfig(JSON.stringify(config));
    document.getElementById("ticketmaster-config").dataset.config = encoded;
    widget.update();
  });
})();