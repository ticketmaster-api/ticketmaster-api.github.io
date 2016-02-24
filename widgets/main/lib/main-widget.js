class TicketmasterWidget {

  constructor(selector) {
    this.widgetRoot = document.querySelectorAll(selector);
    this.config = null;
  }

  getConfig() {
    document.getElementById("ticketmaster-config");
  }

  applyConfig() {
    var encodedConfig = this.getConfig();
    this.config = this.decodeConfig(encodedConfig);
  }

  decodeConfig() {}

  encodeConfig() {}

  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.sqrt(dx * dx + dy * dy);
  }
}

const p1 = new TicketmasterWidget(5, 5);
const p2 = new TicketmasterWidget(10, 10);

console.log(TicketmasterWidget.distance(p1, p2));

/*
$(document).ready(function(){
  $.ajax({
    url:"style.css",
    dataType:"script",
    success:function(data){
      $("head").append("<style>" + data + "</style>");
      //loading complete code here
    }
  });
});*/
//# sourceMappingURL=main-widget.js.map