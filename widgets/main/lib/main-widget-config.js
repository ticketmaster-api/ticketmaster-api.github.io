"use strict";

//TMP function update to pattern
if (!Date.prototype.toShortISOString) {
  Date.prototype.toShortISOString = function () {
    return this.getFullYear() + "-" + (this.getMonth() + 1 < 10 ? "0" + (this.getMonth() + 1) : this.getMonth() + 1) + "-" + (this.getDate() < 10 ? "0" + this.getDate() : this.getDate()) + "T" + (this.getHours() < 10 ? "0" + this.getHours() : this.getHours()) + ":" + (this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes()) + ":" + (this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds()) + "Z";
  };
}

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
    var codeCont = document.querySelector(".language-html.widget_dialog__code");

    var htmlCode = document.createElement("div");
    for (var key in widget.config) {
      htmlCode.setAttribute("w-" + key, widget.config[key]);
    }
    var tmp = document.createElement("div");
    tmp.appendChild(htmlCode);
    codeCont.textContent = tmp.innerHTML;

    $widgetModal.modal();
  });

  $('#js_widget_modal__close').on('click', function () {
    $widgetModal.modal('hide');
  });

  $('#js_widget_modal_no_code__close').on('click', function () {
    $widgetModalNoCode.modal('hide');
  });

  $("#period").on("click", function (event) {

    $("#period").children().removeClass("active");
    $(event.target).addClass("active");

    var date = new Date(),
        period = event.target.getAttribute("period").toLowerCase(),
        firstDay,
        lastDay;

    if (period == "year") {
      firstDay = new Date(date.getFullYear(), 0, 1), lastDay = new Date(date.getFullYear(), 12, 0);
    } else if (period == "month") {
      firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    } else {
      var first = date.getDate() - date.getDay();
      var last = first + 6;
      firstDay = new Date(date.setDate(first));
      lastDay = new Date(date.setDate(last));
    }

    firstDay.setHours(0);lastDay.setHours(23);
    firstDay.setMinutes(0);lastDay.setMinutes(59);
    firstDay.setSeconds(0);lastDay.setSeconds(59);

    console.log([firstDay.toShortISOString(), lastDay.toShortISOString()]);
  });

  $("#w-size").on("keydown", function (event) {
    var kchar = String.fromCharCode(event.keyCode);
    if (/[\w\d]/.test(kchar)) {
      if (/\d/.test(kchar)) {
        var newVal = (this.value.substring(0, this.selectionStart) + this.value.substring(this.selectionEnd) + kchar) * 1;
        if (newVal > 100 || newVal < 1) {
          event.preventDefault();
        }
      } else {
        event.preventDefault();
      }
    }
  });
})();
//# sourceMappingURL=main-widget-config.js.map