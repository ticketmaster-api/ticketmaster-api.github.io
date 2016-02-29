(function(){
  var config =  {"ak":"KRUnjq8y8Sg5eDpP90dNzOK70d4WiUst","kw":"zztop","t":{"b":"t1","h":540,"w":360}};
  $(".main-widget-config-form").on("change",function(){
    switch (event.target.id) {
      case "width" : config.t.w = event.target.value; break;
      case "radius" : break;
    }
    var encoded = widget.encConfig(JSON.stringify(config));
    document.getElementById("ticketmaster-config").dataset.config = encoded;
    widget.update();
  });
})();