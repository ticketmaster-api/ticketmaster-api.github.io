"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 {"ak":"KRUnjq8y8Sg5eDpP90dNzOK70d4WiUst","kw":"zz top","t":{"n":"t1","b":true,"h":200,"w":150,"br":4}}
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
      return "http://ticketmaster-api-staging.github.io/widgets/main/theme/";
    }
  }, {
    key: "logoUrl",
    get: function get() {
      return "http://developer.ticketmaster.com/";
    }

    //https://app.ticketmaster.com/discovery/v1/events/10004F84CD1C5395/images.json?apikey=KRUnjq8y8Sg5eDpP90dNzOK70d4WiUst

  }]);

  function TicketmasterWidget(selector) {
    _classCallCheck(this, TicketmasterWidget);

    this.sliderSpeed = 5000;
    this.widgetRoot = document.querySelectorAll(selector)[0];
    this.eventsRoot = document.createElement("ul");
    this.eventsRoot.classList.add("events-root");
    this.widgetRoot.appendChild(this.eventsRoot);

    this.config = this.loadConfig();

    if (this.config.t.n !== null) {
      this.makeRequest(this.styleLoadingHandler, this.themeUrl + this.config.t.n + ".css");
    }

    this.widgetRoot.classList.remove("border");
    if (this.config.t.b) {
      this.widgetRoot.classList.add("border");
    }

    this.widgetRoot.style.height = this.config.t.h + "px";
    this.widgetRoot.style.width = this.config.t.w + "px";
    this.widgetRoot.style.borderRadius = this.config.t.br + "px";

    this.makeRequest(this.eventsLoadingHandler, this.apiUrl, { apikey: this.config.ak, keyword: this.config.kw });
    this.eventProcessed = 0;
    this.addWidgetRootLinks();
  }

  _createClass(TicketmasterWidget, [{
    key: "addWidgetRootLinks",
    value: function addWidgetRootLinks() {
      var legalNoticeContent = document.createTextNode('Legal Notice'),
          legalNotice = document.createElement("div");
      legalNotice.classList.add("legal-notice");
      legalNotice.appendChild(legalNoticeContent);

      var logo = document.createElement('a');
      logo.classList.add("event-logo");
      logo.target = '_blank';
      logo.href = this.logoUrl;

      this.widgetRoot.appendChild(legalNotice);
      this.widgetRoot.appendChild(logo);
    }
  }, {
    key: "initSlider",
    value: function initSlider() {
      var _this = this;

      if (this.sliderInterval) clearInterval(this.sliderInterval);
      var eventCount = this.eventsRoot.getElementsByClassName("event-wrapper").length;
      this.eventsRoot.style.marginLeft = '0%';
      this.eventsRoot.style.width = eventCount * 100 + "%";
      if (eventCount > 1) {
        var currentEvent = 1;
        this.sliderInterval = setInterval(function () {
          _this.eventsRoot.style.marginLeft = "-" + currentEvent * 100 + "%";
          if (eventCount - 1 > currentEvent) {
            currentEvent++;
          } else {
            currentEvent = 0;
          }
        }, this.sliderSpeed);
      }
    }
  }, {
    key: "formatDate",
    value: function formatDate(day, time) {
      function LZ(x) {
        return (x < 0 || x > 9 ? "" : "0") + x;
      }

      var dayArray = day.split('-');
      var timeArray = time.split(':');

      var MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          y = dayArray[0],
          M = parseInt(dayArray[1]),
          E = parseInt(dayArray[2]),
          d = dayArray[2],
          H = parseInt(timeArray[0]),
          m = timeArray[2],
          a = "AM";

      if (H > 11) a = "PM";
      if (H == 0) {
        H = 12;
      } else if (H > 12) {
        H = H - 12;
      }
      if (y.length < 4) y = "" + (y - 0 + 1900);

      return DAY_NAMES[E] + ', ' + MONTH_NAMES[M - 1] + ' ' + d + ', ' + y + ' ' + LZ(H) + ':' + m + ' ' + a;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.eventsRoot.innerHTML = "";
    }
  }, {
    key: "update",
    value: function update() {

      var oldTheme = {
        keywods: this.config.kw,
        theme: this.config.t.b
      };

      this.config = this.loadConfig();

      this.eventProcessed = 0;

      /*if(this.config.t.b !== null){
        this.makeRequest( this.styleLoadingHandler, this.themeUrl + this.config.t.b + ".css" );
      }*/

      this.widgetRoot.style.height = this.config.t.h + "px";
      this.widgetRoot.style.width = this.config.t.w + "px";
      this.widgetRoot.style.borderRadius = this.config.t.br + "px";

      this.widgetRoot.classList.remove("border");
      if (this.config.t.b) {
        this.widgetRoot.classList.add("border");
      }

      if (oldTheme.keywods !== this.config.kw) {
        this.clear();
        this.makeRequest(this.eventsLoadingHandler, this.apiUrl, { apikey: this.config.ak, keyword: this.config.kw });
      } else {
        var events = document.getElementsByClassName("event-wrapper");
        for (event in events) {
          if (events.hasOwnProperty(event) && events[event].style !== undefined) {
            events[event].style.width = this.config.t.w + "px";
            events[event].style.height = this.config.t.h + "px";
          }
        }
      }
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
          var _event = this.widget.getEventByID(response.id);
          _event.img = this.widget.getImageForEvent(response.images);
          this.widget.publishEvent(_event);
        } else {
          console.error('Fail to load IMG for event');
        }
        this.widget.eventProcessed++;
      }
    }
  }, {
    key: "publishEvent",
    value: function publishEvent(event) {
      var DOMElement = this.createDOMItem(event);
      this.eventsRoot.appendChild(DOMElement);
      if (this.eventProcessed === this.events.length - 1) {
        this.initSlider();
      }
    }
  }, {
    key: "getEventByID",
    value: function getEventByID(id) {
      for (var index in this.events) {
        if (this.events.hasOwnProperty(index) && this.events[index].id === id) {
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

      var myImg = "";
      images.forEach(function (element) {
        if (element.width >= width && element.height >= height && !myImg) {
          myImg = element.url;
        }
      });
      return myImg;
    }
  }, {
    key: "parseEvents",
    value: function parseEvents(eventsSet) {
      if (!eventsSet._embedded) {
        if (typeof $widgetModalNoCode !== "undefined") {
          $widgetModalNoCode.modal();
        }
        return [];
      }
      eventsSet = eventsSet._embedded.events;
      var tmpEventSet = [];
      for (var key in eventsSet) {
        if (eventsSet.hasOwnProperty(key)) {
          var currentEvent = {};
          currentEvent.id = eventsSet[key].id;
          currentEvent.url = eventsSet[key].eventUrl ? eventsSet[key].eventUrl : "";
          currentEvent.name = eventsSet[key].name;
          currentEvent.date = {
            day: eventsSet[key].dates.start.localDate,
            time: eventsSet[key].dates.start.localTime
          };

          currentEvent.address = eventsSet[key]._embedded.venue[0].address;

          currentEvent.categories = [];
          if (eventsSet[key]._embedded.hasOwnProperty('categories')) {
            (function () {
              var eventCategories = eventsSet[key]._embedded.categories;
              currentEvent.categories = Object.keys(eventCategories).map(function (category) {
                return eventCategories[category].name;
              });
            })();
          }
          tmpEventSet.push(currentEvent);
        }
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

      var dateTimeContent = document.createTextNode(this.formatDate(itemConfig.date.day, itemConfig.date.time)),
          dateTime = document.createElement("span");
      dateTime.classList.add("event-date");
      dateTime.appendChild(dateTimeContent);

      var dateWraper = document.createElement("div");
      dateWraper.classList.add("event-date-wraper");

      dateWraper.appendChild(dateTime);

      var addressWrapper = document.createElement("div");
      addressWrapper.classList.add("address-wrapper");

      if (itemConfig.address.line1) {
        var addressOneText = document.createTextNode(itemConfig.address.line1),
            addressOne = document.createElement("div");
        addressOne.classList.add("event-address");
        addressOne.appendChild(addressOneText);
        addressWrapper.appendChild(addressOne);
      }

      if (itemConfig.address.line2) {
        var addressTwoText = document.createTextNode(itemConfig.address.line2),
            addressTwo = document.createElement("div");
        addressTwo.classList.add("event-address");
        addressTwo.appendChild(addressTwoText);
        addressWrapper.appendChild(addressTwo);
      }

      var categoriesWrapper = document.createElement("div");
      categoriesWrapper.classList.add("category-wrapper");

      itemConfig.categories.forEach(function (element) {
        var categoryText = document.createTextNode(element),
            category = document.createElement("span");
        category.classList.add("event-category");
        category.appendChild(categoryText);
        categoriesWrapper.appendChild(category);
      });

      var medWrapper = document.createElement("div");
      medWrapper.classList.add("event-content-wraper");

      medWrapper.appendChild(name);
      medWrapper.appendChild(dateWraper);
      medWrapper.appendChild(addressWrapper);
      medWrapper.appendChild(categoriesWrapper);

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