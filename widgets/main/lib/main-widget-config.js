'use strict';

var $widgetModal = $('#js_widget_modal'),
    $widgetModalNoCode = $('#js_widget_modal_no_code');

(function () {
  //

  var config = { "ak": "KRUnjq8y8Sg5eDpP90dNzOK70d4WiUst", "kw": "Def", "t": { "n": "t1", "b": false, "h": 550, "w": 350, "br": 4 } };

  $(".main-widget-config-form").on("change", function (event) {
    var widgetNode = document.querySelector("div[w-tm-api-key]");

    if (event.target.id === "border") {
      if (event.target.checked) {
        widgetNode.setAttribute(event.target.id, "");
      } else {
        widgetNode.removeAttribute(event.target.id);
      }
    } else {
      widgetNode.setAttribute(event.target.id, event.target.value);
    }

    widget.update();
  });

  var $widgetModal = $('#js_widget_modal'),
      $widgetModalNoCode = $('#js_widget_modal_no_code');
  $('#js_get_widget_code').on('click', function () {
    //document.getElementById("config-hash").textContent = widget.encConfig(JSON.stringify(widget.config));
    $widgetModal.modal();
  });

  $('#js_widget_modal__close').on('click', function () {
    $widgetModal.modal('hide');
  });

  $('#js_widget_modal_no_code__close').on('click', function () {
    $widgetModalNoCode.modal('hide');
  });

  $("#w-size").on("keydown", function (event) {
    var kchar = String.fromCharCode(event.keyCode);
    if (/[\w\d]/.test(kchar)) {
      if (/\d/.test(kchar)) {
        var newVal = (this.value.substring(0, this.selectionStart) + this.value.substring(this.selectionEnd) + kchar) * 1;
        if (newVal > 100 || newVal < 0) {
          event.preventDefault();
        }
      } else {
        event.preventDefault();
      }
    }
  });
})();
//# sourceMappingURL=main-widget-config.js.map