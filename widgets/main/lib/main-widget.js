"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 {"ak":"KRUnjq8y8Sg5eDpP90dNzOK70d4WiUst","kw":"zz top","t":{"n":"t1","b":true,"h":200,"w":150,"br":4}}


*/

/*{
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



 border: ""
 borderradius: "4"
 height: "550"
 keyword: "metal"
 latitude: ""
 longitude: ""
 radius: ""
 theme: "t1"
 tmapikey: "KRUnjq8y8Sg5eDpP90dNzOK70d4WiUst"
 width: "350"

*/

var TicketmasterWidget = function () {
  _createClass(TicketmasterWidget, [{
    key: "config",
    set: function set(attrs) {
      this.widgetConfig = this.loadConfig(attrs);
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
    key: "eventUrl",
    get: function get() {
      return "http://www.ticketmaster.com/event/";
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
    //get themeUrl() { return "http://ticketmaster-api-staging.github.io/widgets/main/theme/"; }

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
    this.widgetRoot = document.querySelector("div[tm-api-key]");
    this.eventsRoot = document.createElement("ul");
    this.eventsRoot.classList.add("events-root");
    this.widgetRoot.appendChild(this.eventsRoot);

    this.config = this.widgetRoot.attributes;

    if (this.config.theme !== null) {
      this.makeRequest(this.styleLoadingHandler, this.themeUrl + this.config.theme + ".css");
    }

    this.widgetRoot.classList.remove("border");
    if (this.config.border) {
      this.widgetRoot.classList.add("border");
    }

    this.widgetRoot.style.height = this.config.height + "px";
    this.widgetRoot.style.width = this.config.width + "px";
    this.widgetRoot.style.borderRadius = this.config.borderradius + "px";

    this.makeRequest(this.eventsLoadingHandler, this.apiUrl, { apikey: this.config.tmapikey, keyword: this.config.keyword, radius: this.config.radius, latlong: [this.config.latitude, this.config.longitude].join(",") });
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
    value: function formatDate(date, localTime) {
      function LZ(x) {
        return (x < 0 || x > 9 ? "" : "0") + x;
      }

      date.setHours(localTime.split(':')[0]);

      var MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          y = date.getYear() + "",
          M = date.getMonth() + 1,
          d = date.getDate(),
          E = date.getDay(),
          H = date.getHours(),
          m = date.getMinutes(),
          a = "AM";

      if (H > 11) a = "PM";
      if (H == 0) {
        H = 12;
      } else if (H > 12) {
        H = H - 12;
      }
      if (y.length < 4) y = "" + (y - 0 + 1900);

      return DAY_NAMES[E] + ', ' + MONTH_NAMES[M - 1] + ' ' + d + ', ' + y + ' ' + LZ(H) + ':' + LZ(m) + ' ' + a;
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
        keywods: this.config.keyword,
        theme: this.config.border,
        radius: this.config.radius,
        latitude: this.config.latitude,
        longitude: this.config.longitude
      };

      this.config = this.widgetRoot.attributes;

      this.eventProcessed = 0;

      /*if(this.config.border !== null){
        this.makeRequest( this.styleLoadingHandler, this.themeUrl + this.config.border + ".css" );
      }*/

      this.widgetRoot.style.height = this.config.height + "px";
      this.widgetRoot.style.width = this.config.width + "px";
      this.widgetRoot.style.borderRadius = this.config.borderradius + "px";

      this.widgetRoot.classList.remove("border");
      if (this.config.hasOwnProperty("border")) {
        this.widgetRoot.classList.add("border");
      }

      if (oldTheme.keywods !== this.config.keyword || oldTheme.radius !== this.config.radius || oldTheme.latitude !== this.config.latitude || oldTheme.longitude !== this.config.longitude) {

        var attrs = {};

        if (this.config.tmapikey !== "") attrs.apikey = this.config.tmapikey;
        if (this.config.tmapkeywordikey !== "") attrs.keyword = this.config.keyword;
        if (this.config.radius !== "") attrs.radius = this.config.radius;
        if (this.config.latitude !== "" && this.config.longitude !== "") attrs.latlong = [this.config.latitude, this.config.longitude].join(",");

        this.clear();
        this.makeRequest(this.eventsLoadingHandler, this.apiUrl, attrs);
      } else {
        var events = document.getElementsByClassName("event-wrapper");
        for (event in events) {
          if (events.hasOwnProperty(event) && events[event].style !== undefined) {
            events[event].style.width = this.config.width + "px";
            events[event].style.height = this.config.height + "px";
          }
        }
      }
    }
  }, {
    key: "loadConfig",
    value: function loadConfig(NamedNodeMap) {
      var config = {};
      Object.keys(NamedNodeMap).map(function (value) {
        if (typeof NamedNodeMap[value].name !== "undefined") {
          config[NamedNodeMap[value].name.replace(/-/g, "")] = NamedNodeMap[value].value;
        }
      });
      return config;
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
        self.makeRequest(self.loadImagesHandler, url, { apikey: self.config.tmapikey });
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
      var width = this.config.width,
          height = this.config.height;

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
          currentEvent.url = eventsSet[key].eventUrl ? eventsSet[key].eventUrl : this.eventUrl + currentEvent.id;
          currentEvent.name = eventsSet[key].name;
          currentEvent.date = {
            day: eventsSet[key].dates.start.localDate,
            time: eventsSet[key].dates.start.localTime,
            dateTime: eventsSet[key].dates.start.dateTime
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
      event.style.height = this.config.height + "px";
      event.style.width = this.config.width + "px";

      var nameContent = document.createTextNode(itemConfig.name),
          name = document.createElement("span");
      name.classList.add("event-name");
      name.appendChild(nameContent);

      var dateTimeContent = document.createTextNode(this.formatDate(new Date(itemConfig.date.dateTime), itemConfig.date.time)),
          dateTime = document.createElement("span");
      dateTime.classList.add("event-date");
      dateTime.appendChild(dateTimeContent);

      var dateWraper = document.createElement("span");
      dateWraper.classList.add("event-date-wraper");

      dateWraper.appendChild(dateTime);

      var addressWrapper = document.createElement("span");
      addressWrapper.classList.add("address-wrapper");

      if (itemConfig.address.line1) {
        var addressOneText = document.createTextNode(itemConfig.address.line1),
            addressOne = document.createElement("span");
        addressOne.classList.add("event-address");
        addressOne.appendChild(addressOneText);
        addressWrapper.appendChild(addressOne);
      }

      if (itemConfig.address.line2) {
        var addressTwoText = document.createTextNode(itemConfig.address.line2),
            addressTwo = document.createElement("span");
        addressTwo.classList.add("event-address");
        addressTwo.appendChild(addressTwoText);
        addressWrapper.appendChild(addressTwo);
      }

      var categoriesWrapper = document.createElement("span");
      categoriesWrapper.classList.add("category-wrapper");

      itemConfig.categories.forEach(function (element) {
        var categoryText = document.createTextNode(element),
            category = document.createElement("span");
        category.classList.add("event-category");
        category.appendChild(categoryText);
        categoriesWrapper.appendChild(category);
      });

      var medWrapper = document.createElement("a");
      medWrapper.classList.add("event-content-wraper");
      medWrapper.target = '_blank';
      medWrapper.href = itemConfig.url;

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