"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TicketmasterWidget = function () {
  _createClass(TicketmasterWidget, [{
    key: "isConfigAttrEmpty",
    value: function isConfigAttrEmpty(attr) {
      if (!this.config.hasOwnProperty(attr) || this.config[attr] === "undefined") {
        return false;
      } else if (this.config[attr] === "") {
        return false;
      }
      return true;
    }
  }, {
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
      return "https://app.ticketmaster.com/discovery/v2/events.json";
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
  }, {
    key: "legalNoticeUrl",
    get: function get() {
      return "http://developer.ticketmaster.com/support/terms-of-use/";
    }
  }, {
    key: "questionUrl",
    get: function get() {
      return "http://developer.ticketmaster.com/support/";
    }
  }, {
    key: "updateExceptions",
    get: function get() {
      return ["width", "border", "borderradius", "colorscheme", "Layout"];
    }
  }, {
    key: "sliderDelay",
    get: function get() {
      return 10000;
    }
  }, {
    key: "sliderRestartDelay",
    get: function get() {
      return 30000;
    }
  }, {
    key: "controlHiddenClass",
    get: function get() {
      return "events_control-hidden";
    }
  }, {
    key: "eventReqAttrs",
    get: function get() {
      var attrs = {};

      if (this.isConfigAttrEmpty("tmapikey")) attrs.apikey = this.config.tmapikey;
      if (this.isConfigAttrEmpty("keyword")) attrs.keyword = this.config.keyword;
      if (this.isConfigAttrEmpty("size")) attrs.size = this.config.size;
      if (this.isConfigAttrEmpty("radius")) attrs.radius = this.config.radius;
      if (this.isConfigAttrEmpty("postalcode")) attrs.postalcode = this.config.postalcode;
      if (this.isConfigAttrEmpty("attractionid")) attrs.attractionid = this.config.attractionid;
      if (this.isConfigAttrEmpty("promoterid")) attrs.promoterid = this.config.promoterid;
      if (this.isConfigAttrEmpty("period")) {
        var period = this.getDateFromPeriod(this.config.period);
        attrs.startDateTime = period[0];
        attrs.endDateTime = period[1];
      }

      return attrs;
    }

    //https://app.ticketmaster.com/discovery/v1/events/10004F84CD1C5395/images.json?apikey=KRUnjq8y8Sg5eDpP90dNzOK70d4WiUst

  }]);

  function TicketmasterWidget(selector) {
    _classCallCheck(this, TicketmasterWidget);

    this.widgetRoot = document.querySelector("div[w-tmapikey]");

    this.eventsRootContainer = document.createElement("div");
    this.eventsRootContainer.classList.add("events-root-container");
    this.widgetRoot.appendChild(this.eventsRootContainer);

    this.eventsRoot = document.createElement("ul");
    this.eventsRoot.classList.add("events-root");
    this.eventsRootContainer.appendChild(this.eventsRoot);

    // dots container
    //this.dotsContainer = document.createElement("div");
    //this.dotsContainer.classList.add("events_dots");
    //this.eventsRootContainer.appendChild(this.dotsContainer);

    this.config = this.widgetRoot.attributes;

    if (this.config.theme !== null) {
      this.makeRequest(this.styleLoadingHandler, this.themeUrl + this.config.theme + ".css");
    }

    this.eventsRootContainer.classList.remove("border");
    if (this.config.border) {
      this.eventsRootContainer.classList.add("border");
    }

    this.widgetRoot.style.height = this.config.height + "px";
    this.widgetRoot.style.width = this.config.width + "px";

    this.eventsRootContainer.style.height = this.config.height + "px";
    this.eventsRootContainer.style.width = this.config.width + "px";
    this.eventsRootContainer.style.borderRadius = this.config.borderradius + "px";

    this.clear();

    this.makeRequest(this.eventsLoadingHandler, this.apiUrl, this.eventReqAttrs);

    this.addWidgetRootLinks();

    this.initSliderControls();

    this.initEventCounter();
  }

  _createClass(TicketmasterWidget, [{
    key: "addWidgetRootLinks",
    value: function addWidgetRootLinks() {
      var legalNoticeContent = document.createTextNode('Legal Notice'),
          legalNotice = document.createElement("a");
      legalNotice.appendChild(legalNoticeContent);
      legalNotice.classList.add("legal-notice");
      legalNotice.target = '_blank';
      legalNotice.href = this.legalNoticeUrl;
      this.widgetRoot.appendChild(legalNotice);

      var logo = document.createElement('a');
      logo.classList.add("event-logo");
      logo.target = '_blank';
      logo.href = this.logoUrl;

      var logoBox = document.createElement('div');
      logoBox.classList.add("event-logo-box");
      logoBox.appendChild(logo);
      this.eventsRootContainer.appendChild(logoBox);

      var question = document.createElement('a');
      question.classList.add("event-question");
      question.target = '_blank';
      question.href = this.questionUrl;
      this.eventsRootContainer.appendChild(question);
    }
  }, {
    key: "toggleControlsVisibilityX",
    value: function toggleControlsVisibilityX() {
      // Horizontal
      if (this.slideCountX > 1) {
        this.prevEventX.classList.remove(this.controlHiddenClass);
        this.nextEventX.classList.remove(this.controlHiddenClass);
        if (this.currentSlideX === 0) {
          this.prevEventX.classList.add(this.controlHiddenClass);
        } else if (this.currentSlideX === this.slideCountX - 1) {
          this.nextEventX.classList.add(this.controlHiddenClass);
        }
      } else {
        this.prevEventX.classList.add(this.controlHiddenClass);
        this.nextEventX.classList.add(this.controlHiddenClass);
      }

      // Vertical
      if (this.eventsGroups.length) if (this.eventsGroups[this.currentSlideX].length > 1) {
        this.prevEventY.classList.remove(this.controlHiddenClass);
        this.nextEventY.classList.remove(this.controlHiddenClass);
        if (this.currentSlideY === 0) {
          this.prevEventY.classList.add(this.controlHiddenClass);
        } else if (this.currentSlideY === this.eventsGroups[this.currentSlideX].length - 1) {
          this.nextEventY.classList.add(this.controlHiddenClass);
        }
      } else {
        this.prevEventY.classList.add(this.controlHiddenClass);
        this.nextEventY.classList.add(this.controlHiddenClass);
      }
    }
  }, {
    key: "prevSlideX",
    value: function prevSlideX() {
      if (this.currentSlideX > 0) {
        this.setSlideManually(this.currentSlideX - 1, true);
      }
    }
  }, {
    key: "nextSlideX",
    value: function nextSlideX() {
      if (this.slideCountX - 1 > this.currentSlideX) {
        this.setSlideManually(this.currentSlideX + 1, true);
      }
    }
  }, {
    key: "prevSlideY",
    value: function prevSlideY() {
      if (this.currentSlideY > 0) {
        this.setSlideManually(this.currentSlideY - 1, false);
      }
    }
  }, {
    key: "nextSlideY",
    value: function nextSlideY() {
      if (this.eventsGroups[this.currentSlideX].length - 1 > this.currentSlideY) {
        this.setSlideManually(this.currentSlideY + 1, false);
      }
    }
  }, {
    key: "setSlideManually",
    value: function setSlideManually(slideIndex, isDirectionX) {
      var _this = this;

      if (this.sliderTimeout) clearTimeout(this.sliderTimeout);
      this.sliderTimeout = setTimeout(function () {
        _this.runAutoSlideX();
      }, this.sliderRestartDelay);
      clearInterval(this.sliderInterval);
      if (isDirectionX) this.goToSlideX(slideIndex);else this.goToSlideY(slideIndex);
    }
  }, {
    key: "goToSlideX",
    value: function goToSlideX(slideIndex) {
      if (this.currentSlideX === slideIndex) return;
      this.currentSlideY = 0;
      this.currentSlideX = slideIndex;
      this.eventsRoot.style.marginLeft = "-" + this.currentSlideX * 100 + "%";
      this.toggleControlsVisibilityX();
      this.setEventsCounter();
      //let dots = this.dotsContainer.getElementsByClassName("events_dots__item");
      //for(let i = 0; dots.length > i; i++){
      //  if(i === slideIndex){
      //    dots[i].classList.add("events_dots__item-active");
      //  }else{
      //    dots[i].classList.remove("events_dots__item-active");
      //  }
      //}
    }
  }, {
    key: "goToSlideY",
    value: function goToSlideY(slideIndex) {
      if (this.currentSlideY === slideIndex) return;
      this.currentSlideY = slideIndex;
      var eventGroup = this.eventsRoot.getElementsByClassName("event-group-" + this.currentSlideX);
      if (eventGroup.length) {
        eventGroup = eventGroup[0];
        eventGroup.style.marginTop = "-" + this.currentSlideY * this.config.height + "px";
        this.toggleControlsVisibilityX();
      }
    }
  }, {
    key: "runAutoSlideX",
    value: function runAutoSlideX() {
      var _this2 = this;

      if (this.slideCountX > 1) {
        this.sliderInterval = setInterval(function () {
          var slideIndex = 0;
          if (_this2.slideCountX - 1 > _this2.currentSlideX) slideIndex = _this2.currentSlideX + 1;
          _this2.goToSlideX(slideIndex);
        }, this.sliderDelay);
      }
    }
  }, {
    key: "initSliderControls",
    value: function initSliderControls() {
      var _this3 = this;

      this.currentSlideX = 0;
      this.currentSlideY = 0;
      this.slideCountX = 0;

      // left btn
      this.prevEventX = document.createElement("div");
      this.prevEventX.classList.add("events_control", "events_control-horizontal", "events_control-left", this.controlHiddenClass);
      this.eventsRootContainer.appendChild(this.prevEventX);

      // right btn
      this.nextEventX = document.createElement("div");
      this.nextEventX.classList.add("events_control", "events_control-horizontal", "events_control-right", this.controlHiddenClass);
      this.eventsRootContainer.appendChild(this.nextEventX);

      // top btn
      this.prevEventY = document.createElement("div");
      this.prevEventY.classList.add("events_control", "events_control-vertical", "events_control-top", this.controlHiddenClass);
      this.eventsRootContainer.appendChild(this.prevEventY);

      // bottom btn
      this.nextEventY = document.createElement("div");
      this.nextEventY.classList.add("events_control", "events_control-vertical", "events_control-bottom", this.controlHiddenClass);
      this.eventsRootContainer.appendChild(this.nextEventY);

      // Restore events group position
      function whichTransitionEvent() {
        var el = document.createElement('fakeelement'),
            transitions = {
          'transition': 'transitionend',
          'OTransition': 'oTransitionEnd',
          'MozTransition': 'transitionend',
          'WebkitTransition': 'webkitTransitionEnd'
        };

        for (var _event in transitions) {
          if (el.style[_event] !== undefined) return transitions[_event];
        }
      }

      var transitionEvent = whichTransitionEvent();
      transitionEvent && this.eventsRoot.addEventListener(transitionEvent, function (e) {
        if (_this3.eventsRoot !== e.target) return;
        var eventGroup = _this3.eventsRoot.getElementsByClassName("event-group");
        // Reset all groups. We don't know what event group was visible before.
        for (var i = 0; eventGroup.length > i; i++) {
          eventGroup[i].style.marginTop = 0;
        }
      });

      // Arrows
      this.prevEventX.addEventListener("click", function () {
        _this3.prevSlideX();
      });

      this.nextEventX.addEventListener("click", function () {
        _this3.nextSlideX();
      });

      this.prevEventY.addEventListener("click", function () {
        _this3.prevSlideY();
      });

      this.nextEventY.addEventListener("click", function () {
        _this3.nextSlideY();
      });

      // Tough device swipes
      var xDown = null,
          yDown = null;

      function handleTouchStart(evt) {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
      }

      function handleTouchMove(evt) {
        if (!xDown || !yDown) return;

        var xUp = evt.touches[0].clientX,
            yUp = evt.touches[0].clientY,
            xDiff = xDown - xUp,
            yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          if (xDiff > 0) this.nextSlideX(); // left swipe
          else this.prevSlideX(); // right swipe
        } else {
            if (yDiff > 0) this.nextSlideY(); // up swipe
            else this.prevSlideY(); // down swipe
          }

        xDown = null;
        yDown = null;
      }

      this.eventsRootContainer.addEventListener('touchstart', function (e) {
        handleTouchStart.call(_this3, e);
      }, false);
      this.eventsRootContainer.addEventListener('touchmove', function (e) {
        handleTouchMove.call(_this3, e);
      }, false);
    }

    //initDot(i){
    //  var dot = document.createElement("span");
    //  dot.classList.add("events_dots__item", "events_dots__item-" + i);
    //  if(i === 0) dot.classList.add("events_dots__item-active");
    //  this.dotsContainer.appendChild(dot);
    //  dot.addEventListener("click", ()=> {
    //    this.setSlideManually(i, true);
    //  });
    //}

  }, {
    key: "initSlider",
    value: function initSlider() {
      if (this.sliderInterval) clearInterval(this.sliderInterval);
      if (this.sliderTimeout) clearTimeout(this.sliderTimeout);
      this.slideCountX = this.eventsGroups.length;
      this.eventsRoot.style.marginLeft = '0%';
      this.eventsRoot.style.width = this.slideCountX * 100 + "%";
      this.currentSlideX = 0;
      this.currentSlideY = 0;
      this.runAutoSlideX();
      this.toggleControlsVisibilityX();

      //if(this.slideCountX > 1)
      //  for(var i = 0; this.slideCountX > i; i++){
      //    this.initDot(i);
      //  }
    }
  }, {
    key: "formatDate",
    value: function formatDate(date) {
      var result = '';
      if (!date.day) return result; // Day is required

      function LZ(x) {
        return (x < 0 || x > 9 ? "" : "0") + x;
      }
      var MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          dayArray = date.day.split('-'),
          d = parseInt(dayArray[2]),
          M = parseInt(dayArray[1]);

      var E = new Date(date.day).getDay();
      result = DAY_NAMES[E] + ', ' + MONTH_NAMES[M - 1] + ' ' + d + ', ' + dayArray[0];

      if (!date.time) return result;

      var timeArray = date.time.split(':'),
          H = parseInt(timeArray[0]),
          m = timeArray[1],
          a = "AM";

      if (H > 11) a = "PM";
      if (H == 0) {
        H = 12;
      } else if (H > 12) {
        H = H - 12;
      }

      return result + ' ' + LZ(H) + ':' + m + ' ' + a;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.eventsRoot.innerHTML = "";
      //this.dotsContainer.innerHTML = "";
    }
  }, {
    key: "update",
    value: function update() {

      var oldTheme = this.config.constructor();
      for (var attr in this.config) {
        if (this.config.hasOwnProperty(attr)) oldTheme[attr] = this.config[attr];
      }

      /*let oldTheme = {
        keyword: this.config.keyword,
        theme: this.config.theme,
        radius: this.config.radius,
        postalcode: this.config.postalcode,
        attractionid: this.config.attractionid,
        promoterid: this.config.attractionid
      };*/

      this.config = this.widgetRoot.attributes;

      /*if(this.config.theme !== null){
        this.makeRequest( this.styleLoadingHandler, this.themeUrl + this.config.theme + ".css" );
      }*/

      this.widgetRoot.style.height = this.config.height + "px";
      this.widgetRoot.style.width = this.config.width + "px";
      this.eventsRootContainer.style.height = this.config.height + "px";
      this.eventsRootContainer.style.width = this.config.width + "px";
      this.eventsRootContainer.style.borderRadius = this.config.borderradius + "px";

      this.eventsRootContainer.classList.remove("border");
      if (this.config.hasOwnProperty("border")) {
        this.eventsRootContainer.classList.add("border");
      }

      /*var newTheme = this.config;
      Object.keys(newTheme).map(function(key){
        console.log([key,newTheme[key]]);
        return newTheme[key] === oldTheme[key] ;
      }).indexOf(false) === -1*/

      if (this.needToUpdate(this.config, oldTheme, this.updateExceptions)) {
        this.clear();
        this.makeRequest(this.eventsLoadingHandler, this.apiUrl, this.eventReqAttrs);
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
    key: "needToUpdate",
    value: function needToUpdate(newTheme, oldTheme) {
      var forCheck = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

      return Object.keys(newTheme).map(function (key) {
        if (forCheck.indexOf(key) > -1) return true;
        //console.warn([key, newTheme[key], oldTheme[key], newTheme[key] === oldTheme[key]])
        return newTheme[key] === oldTheme[key];
      }).indexOf(false) > -1;
    }
  }, {
    key: "loadConfig",
    value: function loadConfig(NamedNodeMap) {
      var config = {};
      Object.keys(NamedNodeMap).map(function (value) {
        if (typeof NamedNodeMap[value].name !== "undefined" && NamedNodeMap[value].name.indexOf("w-") !== -1) {
          config[NamedNodeMap[value].name.replace(/w-/g, "").replace(/-/g, "")] = NamedNodeMap[value].value;
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
    key: "groupEventsByName",
    value: function groupEventsByName() {
      var groups = {};
      this.events.map(function (event) {
        if (groups[event.name] === undefined) groups[event.name] = [];
        groups[event.name].push(event);
      });

      this.eventsGroups = [];
      for (var groupName in groups) {
        this.eventsGroups.push(groups[groupName]);
      }
    }
  }, {
    key: "initEventCounter",
    value: function initEventCounter() {
      this.eventsCounter = document.createElement("div");
      this.eventsCounter.classList.add("events-counter");
      this.widgetRoot.appendChild(this.eventsCounter);
    }
  }, {
    key: "setEventsCounter",
    value: function setEventsCounter() {
      if (this.eventsCounter) {
        var text = '';
        if (this.eventsGroups.length) {
          if (this.eventsGroups.length > 1) {
            text = this.currentSlideX + 1 + " of " + this.eventsGroups.length + " events";
          } else {
            text = '1 event';
          }
        }
        this.eventsCounter.innerHTML = text;
      }
    }
  }, {
    key: "eventsLoadingHandler",
    value: function eventsLoadingHandler() {
      var _this4 = this;

      if (this && this.readyState == XMLHttpRequest.DONE) {
        if (this.status == 200) {
          (function () {
            var widget = _this4.widget;
            widget.events = JSON.parse(_this4.responseText);
            widget.groupEventsByName.call(widget);

            widget.eventsGroups.map(function (group, i) {
              if (group.length === 1) widget.publishEvent(group[0]);else widget.publishEventsGroup.call(widget, group, i);
            });

            widget.initSlider();
            widget.setEventsCounter();
          })();
        } else if (this.status == 400) {
          alert('There was an error 400');
        } else {
          alert('something else other than 200 was returned');
        }
      }
    }
  }, {
    key: "publishEventsGroup",
    value: function publishEventsGroup(group, index) {
      var _this5 = this;

      var groupNodeWrapper = document.createElement("li");
      groupNodeWrapper.classList.add("event-wrapper", "event-group-wrapper");
      groupNodeWrapper.style.width = this.config.width + "px";
      groupNodeWrapper.style.height = this.config.height + "px";

      var groupNode = document.createElement("ul");
      groupNode.classList.add("event-group", "event-group-" + index);
      groupNode.style.height = this.config.width * group.length + "px";

      group.map(function (event) {
        _this5.publishEvent(event, groupNode);
      });

      groupNodeWrapper.appendChild(groupNode);
      this.eventsRoot.appendChild(groupNodeWrapper);
    }
  }, {
    key: "publishEvent",
    value: function publishEvent(event, parentNode) {
      parentNode = parentNode || this.eventsRoot;
      var DOMElement = this.createDOMItem(event);
      parentNode.appendChild(DOMElement);
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
            time: eventsSet[key].dates.start.localTime
          };

          if (eventsSet[key]._embedded.venues[0].address) {
            currentEvent.address = eventsSet[key]._embedded.venues[0].address;
          }

          // Remove this comment to get categories
          /*if(eventsSet[key]._embedded.hasOwnProperty('categories')){
            currentEvent.categories = [];
            let eventCategories = eventsSet[key]._embedded.categories;
            currentEvent.categories = Object.keys(eventCategories).map(function(category){
              return eventCategories[category].name
            });
          }*/

          currentEvent.img = this.getImageForEvent(eventsSet[key].images);

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

      var medWrapper = document.createElement("a");
      medWrapper.classList.add("event-content-wraper");
      medWrapper.target = '_blank';
      medWrapper.href = itemConfig.url;

      var event = document.createElement("li");
      event.classList.add("event-wrapper");
      event.style.backgroundImage = "url('" + itemConfig.img + "')";
      event.style.height = this.config.height + "px";
      event.style.width = this.config.width + "px";

      var nameContent = document.createTextNode(itemConfig.name),
          name = document.createElement("span");
      name.classList.add("event-name");
      name.appendChild(nameContent);
      medWrapper.appendChild(name);

      var dateTimeContent = document.createTextNode(this.formatDate(itemConfig.date)),
          dateTime = document.createElement("span");
      dateTime.classList.add("event-date");
      dateTime.appendChild(dateTimeContent);

      var dateWraper = document.createElement("span");
      dateWraper.classList.add("event-date-wraper");
      dateWraper.appendChild(dateTime);
      medWrapper.appendChild(dateWraper);

      if (itemConfig.hasOwnProperty("address")) {
        var addressWrapper = document.createElement("span");
        addressWrapper.classList.add("address-wrapper");

        if (itemConfig.address.hasOwnProperty("line1")) {
          var addressOneText = document.createTextNode(itemConfig.address.line1),
              addressOne = document.createElement("span");
          addressOne.classList.add("event-address");
          addressOne.appendChild(addressOneText);
          addressWrapper.appendChild(addressOne);
        }

        if (itemConfig.address.hasOwnProperty("line2")) {
          var addressTwoText = document.createTextNode(itemConfig.address.line2),
              addressTwo = document.createElement("span");
          addressTwo.classList.add("event-address");
          addressTwo.appendChild(addressTwoText);
          addressWrapper.appendChild(addressTwo);
        }

        medWrapper.appendChild(addressWrapper);
      }

      if (itemConfig.hasOwnProperty("categories")) {
        var categoriesWrapper = document.createElement("span");
        categoriesWrapper.classList.add("category-wrapper");

        itemConfig.categories.forEach(function (element) {
          var categoryText = document.createTextNode(element),
              category = document.createElement("span");
          category.classList.add("event-category");
          category.appendChild(categoryText);
          categoriesWrapper.appendChild(category);
        });
        medWrapper.appendChild(categoriesWrapper);
      }

      event.appendChild(medWrapper);
      return event;
    }
  }, {
    key: "makeImageUrl",
    value: function makeImageUrl(id) {
      return "https://app.ticketmaster.com/discovery/v2/events/" + id + "/images.json";
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
  }, {
    key: "toShortISOString",
    value: function toShortISOString(dateObj) {
      return dateObj.getFullYear() + "-" + (dateObj.getMonth() + 1 < 10 ? "0" + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1) + "-" + (dateObj.getDate() < 10 ? "0" + dateObj.getDate() : dateObj.getDate()) + "T" + (dateObj.getHours() < 10 ? "0" + dateObj.getHours() : dateObj.getHours()) + ":" + (dateObj.getMinutes() < 10 ? "0" + dateObj.getMinutes() : dateObj.getMinutes()) + ":" + (dateObj.getSeconds() < 10 ? "0" + dateObj.getSeconds() : dateObj.getSeconds()) + "Z";
    }
  }, {
    key: "getDateFromPeriod",
    value: function getDateFromPeriod(period) {

      var date = new Date(),
          period = period.toLowerCase(),
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

      return [this.toShortISOString(firstDay), this.toShortISOString(lastDay)];
    }
  }]);

  return TicketmasterWidget;
}();

var widget = new TicketmasterWidget("#ticketmaster-config");
//# sourceMappingURL=main-widget.js.map