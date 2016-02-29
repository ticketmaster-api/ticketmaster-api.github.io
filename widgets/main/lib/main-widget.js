"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 {"ak":"KRUnjq8y8Sg5eDpP90dNzOK70d4WiUst","kw":"zztop","t":{"b":"t1","h":200,"w":150}}
 {
 "ak":"KRUnjq8y8Sg5eDpP90dNzOK70d4WiUst", #ApiKey
 "kw":"zztop", #KeyWords
 "t":{ #Theme
 "b":"t1", #baseTheme - if null do not load theme
 "h":300,
 "w":150
 }
 })

 -API key       # input
 -Key word      # input
 -Postal Code   # input
 -Theme         # Buttons
 -Color Scheme  # Buttons
 -Layout        # Buttons
 -Height        # Slider
 -Width         # Slider
 -Border Radius # Slider

 */

var TicketmasterWidget = function () {
  _createClass(TicketmasterWidget, [{
    key: "config",
    set: function set(config) {
      this.widgetConfig = this.decConfig(config);
    },
    get: function get() {
      return this.widgetConfig;
    }
  }, {
    key: "events",
    set: function set(responce) {
      this.eventsList = this.parseEvents(responce);
    },
    get: function get() {
      return this.eventsList;
    }
  }, {
    key: "apiUrl",
    get: function get() {
      return "https://app.ticketmaster.com/discovery/v1/events.json";
    }
  }, {
    key: "themeUrl",
    get: function get() {
      return "http://localhost:4000/widgets/main/theme/";
    }

    //https://app.ticketmaster.com/discovery/v1/events/10004F84CD1C5395/images.json?apikey=KRUnjq8y8Sg5eDpP90dNzOK70d4WiUst

  }]);

  function TicketmasterWidget(selector) {
    _classCallCheck(this, TicketmasterWidget);

    this.widgetRoot = document.querySelectorAll(selector)[0];
    this.eventsRoot = document.createElement("ul");
    this.eventsRoot.classList.add("events-root");
    this.widgetRoot.appendChild(this.eventsRoot);

    this.config = this.loadConfig();

    if (this.config.t.b !== null) {
      this.makeRequest(this.styleLoadingHandler, this.themeUrl + this.config.t.b + ".css");
    }

    this.widgetRoot.style.height = this.config.t.h + "px";
    this.widgetRoot.style.width = this.config.t.w + "px";

    this.makeRequest(this.eventsLoadingHandler, this.apiUrl, { apikey: this.config.ak, keyword: this.config.kw });
  }

  _createClass(TicketmasterWidget, [{
    key: "clear",
    value: function clear() {
      this.widgetRoot.innerHTML = "";
    }
  }, {
    key: "update",
    value: function update() {
      this.clear();
    }
  }, {
    key: "loadConfig",
    value: function loadConfig() {
      return this.widgetRoot.dataset.config ? this.widgetRoot.dataset.config : null;
    }
  }, {
    key: "styleLoadingHandler",
    value: function styleLoadingHandler() {
      if (this && this.readyState == XMLHttpRequest.DONE) {
        if (this.status == 200) {
          var style = document.createElement("style");
          style.setAttribute("type", "text/css");
          style.textContent = this.responseText;
          document.getElementsByTagName("head")[0].appendChild(style);
        } else {
          alert("theme wasn't loaded");
        }
      }
    }
  }, {
    key: "eventsLoadingHandler",
    value: function eventsLoadingHandler() {
      if (this && this.readyState == XMLHttpRequest.DONE) {
        if (this.status == 200) {
          this.widget.events = JSON.parse(this.responseText);
          //this.widget.build();
          this.widget.loadImages();
        } else if (this.status == 400) {
          alert('There was an error 400');
        } else {
          alert('something else other than 200 was returned');
        }
      }
    }
  }, {
    key: "loadImages",
    value: function loadImages() {
      var self = this;
      this.events.forEach(function (event) {
        var url = self.makeImageUrl(event.id);
        self.makeRequest(self.loadImagesHandler, url, { apikey: self.config.ak });
      });
    }
  }, {
    key: "loadImagesHandler",
    value: function loadImagesHandler() {
      if (this && this.readyState == XMLHttpRequest.DONE) {
        if (this.status == 200) {
          var response = JSON.parse(this.responseText);
          var event = this.widget.getEventByID(response.id);
          event.img = this.widget.getImageForEvent(response.images);
          this.widget.publishEvent(event);
        } else {
          console.error('Fail to load IMG for event');
        }
      }
    }
  }, {
    key: "publishEvent",
    value: function publishEvent(event) {
      var DOMElement = this.createDOMItem(event);
      this.eventsRoot.appendChild(DOMElement);
    }
  }, {
    key: "getEventByID",
    value: function getEventByID(id) {
      for (var index in this.events) {
        if (this.events[index].id === id) {
          return this.events[index];
        }
      }
    }
  }, {
    key: "getImageForEvent",
    value: function getImageForEvent(images) {
      var width = this.config.t.w,
          height = this.config.t.h;

      images.sort(function (a, b) {
        if (a.width < b.width) return -1;else if (a.width > b.width) return 1;else return 0;
      });

      var myimg;
      images.forEach(function (element, index, array) {
        if (element.width >= width && element.height >= height && !myimg) {
          myimg = element.url;
        }
      });
      return myimg;
    }
  }, {
    key: "parseEvents",
    value: function parseEvents(eventsSet) {
      eventsSet = eventsSet._embedded.events;
      var tmpEventSet = [];

      var _loop = function _loop() {
        var currentEvent = {};
        currentEvent.id = eventsSet[key].id;
        currentEvent.url = eventsSet[key].eventUrl ? eventsSet[key].eventUrl : "";
        currentEvent.name = eventsSet[key].name;
        currentEvent.date = {
          day: eventsSet[key].dates.start.localDate,
          time: eventsSet[key].dates.start.localTime
        };
        var eventCategories = eventsSet[key]._embedded.categories;
        currentEvent.categories = Object.keys(eventCategories).map(function (category) {
          return eventCategories[category].name;
        });

        tmpEventSet.push(currentEvent);
      };

      for (var key in eventsSet) {
        _loop();
      }
      return tmpEventSet;
    }
  }, {
    key: "makeRequest",
    value: function makeRequest(handler) {
      var url = arguments.length <= 1 || arguments[1] === undefined ? this.apiUrl : arguments[1];
      var attrs = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
      var method = arguments.length <= 3 || arguments[3] === undefined ? "GET" : arguments[3];

      attrs = Object.keys(attrs).map(function (key) {
        return key + "=" + attrs[key];
      }).join("&");

      url = [url, attrs].join("?");

      this.xmlHTTP = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      if (method == "POST") {
        this.xmlHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      }
      this.xmlHTTP.widget = this;
      this.xmlHTTP.onreadystatechange = handler;
      this.xmlHTTP.open(method, url, true);
      this.xmlHTTP.send();
    }
  }, {
    key: "createDOMItem",
    value: function createDOMItem(itemConfig) {
      var event = document.createElement("li");
      event.classList.add("event-wrapper");
      event.style.backgroundImage = "url('" + itemConfig.img + "')";
      event.style.height = this.config.t.h + "px";
      event.style.width = this.config.t.w + "px";

      var nameContent = document.createTextNode(itemConfig.name),
          name = document.createElement("div");
      name.classList.add("event-name");
      name.appendChild(nameContent);

      var dateContent = document.createTextNode(itemConfig.date.day),
          date = document.createElement("div");
      date.classList.add("event-date");
      date.appendChild(dateContent);

      var timeContent = document.createTextNode(itemConfig.date.time),
          time = document.createElement("div");
      time.classList.add("event-date");
      time.appendChild(timeContent);

      var dateWraper = document.createElement("div");
      dateWraper.classList.add("event-date-wraper");

      dateWraper.appendChild(date);
      dateWraper.appendChild(time);

      var medWrapper = document.createElement("div");
      medWrapper.classList.add("event-content-wraper");

      medWrapper.appendChild(name);
      medWrapper.appendChild(dateWraper);

      event.appendChild(medWrapper);

      return event;
    }
  }, {
    key: "makeImageUrl",
    value: function makeImageUrl(id) {
      return "https://app.ticketmaster.com/discovery/v1/events/" + id + "/images.json";
    }

    /*
     * Config block
     */

  }, {
    key: "decConfig",
    value: function decConfig(config) {
      return JSON.parse(window.atob(config));
    }
  }, {
    key: "encConfig",
    value: function encConfig(config) {
      return window.btoa(config);
    }
  }]);

  return TicketmasterWidget;
}();

var widget = new TicketmasterWidget("#ticketmaster-config");
//# sourceMappingURL=main-widget.js.map