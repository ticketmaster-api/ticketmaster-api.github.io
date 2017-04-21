var widgetsLib =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CountdownClock = function () {
  _createClass(CountdownClock, [{
    key: 'endTime',
    set: function set(endTime) {
      this.config.endTime = endTime;
    },
    get: function get() {
      return this.config.endTime || new Date();
    }
  }, {
    key: 'interval',
    set: function set(interval) {
      return this.config.interval = interval;
    },
    get: function get() {
      return this.config.interval || 1000;
    }
  }, {
    key: 'onChange',
    set: function set(fn) {
      return this.config.onChange = fn;
    },
    get: function get() {
      return this.config.onChange || function (time) {};
    }
  }]);

  function CountdownClock() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CountdownClock);

    this.config = config;
    this.updateClock();
    if (this.config.endTime) this.initInterval();
  }

  _createClass(CountdownClock, [{
    key: 'initInterval',
    value: function initInterval() {
      this.timeinterval = setInterval(this.updateClock.bind(this), this.interval);
    }
  }, {
    key: 'update',
    value: function update(endTime) {
      clearInterval(this.timeinterval);
      this.endTime = endTime;
      this.updateClock();
      if (endTime) this.initInterval();
    }
  }, {
    key: 'updateClock',
    value: function updateClock() {
      var timeRemaining = this.getTimeRemaining();
      this.onChange(timeRemaining);
      if (timeRemaining.total <= 0) clearInterval(this.timeinterval);
    }

    /*
    //Covert datetime by GMT offset
    //If toUTC is true then return UTC time other wise return local time
    convertLocalDateToUTCDate(date, toUTC) {
      date = new Date(date);
      //Local time converted to UTC
      var localOffset = date.getTimezoneOffset() * 60000;
      var localTime = date.getTime();
      (toUTC)
        ? date = localTime + localOffset
        : date = localTime - localOffset;
      date = new Date(date);
      return date;
    }
    */

  }, {
    key: 'getTimeRemaining',
    value: function getTimeRemaining() {
      var total = Date.parse(this.endTime) - Date.parse(new Date());
      if (total <= 0) total = 0;
      var seconds = Math.floor(total / 1000 % 60),
          minutes = Math.floor(total / 1000 / 60 % 60),
          hours = Math.floor(total / 3600000 /* (1000 * 60 * 60) */ % 24),
          days = Math.floor(total / 86400000 /* (1000 * 60 * 60 * 24) */),
          monthLeft = 0;
      //years = 0;

      var daysInMonth = function daysInMonth(year, month) {
        var D = new Date(year, month - 1, 1, 12);
        return parseInt((-Date.parse(D) + D.setMonth(D.getMonth() + 1) + 36e5) / 864e5);
      };

      var today = new Date(),
          curr_day = today.getUTCDate(),
          curr_month = today.getUTCMonth(),
          curr_year = today.getUTCFullYear(),
          curr_days_in_month = daysInMonth(curr_year, curr_month);

      if (days > curr_days_in_month) {
        var servYear = new Date(this.endTime).getUTCFullYear(),
            servMonth = new Date(this.endTime).getUTCMonth(),
            servDay = new Date(this.endTime).getUTCDate(),
            serv_days_in_month = daysInMonth(servYear, servMonth);

        monthLeft = Math.floor(days / daysInMonth(servYear, servMonth));

        days = Math.abs(servDay - curr_day);

        /*if(monthLeft > 99){
          years = servYear - curr_year;
          monthLeft = monthLeft-1 - years*12;
          //console.log( 'monthLeft ',monthLeft );
        }*/
      }

      return {
        total: total,
        //years,
        monthLeft: monthLeft,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      };
    }
  }]);

  return CountdownClock;
}();

var TicketmasterCountdownWidget = function () {
  _createClass(TicketmasterCountdownWidget, [{
    key: 'isConfigAttrExistAndNotEmpty',


    //get eventIdDefault(){ return '1Ad0ZfdGkMoCQHJ';}

    value: function isConfigAttrExistAndNotEmpty(attr) {
      if (!this.config.hasOwnProperty(attr) || this.config[attr] === "undefined") {
        return false;
      } else if (this.config[attr] === "") {
        return false;
      }
      return true;
    }
  }, {
    key: 'config',
    set: function set(attrs) {
      this.widgetConfig = this.loadConfig(attrs);
    },
    get: function get() {
      return this.widgetConfig;
    }
  }, {
    key: 'event',
    set: function set(responce) {
      this.eventResponce = this.parseEvent(responce);
    },
    get: function get() {
      return this.eventResponce;
    }
  }, {
    key: 'borderSize',
    get: function get() {
      return this.config.border || 0;
    }
  }, {
    key: 'eventUrl',
    get: function get() {
      return "http://www.ticketmaster.com/event/";
    }
  }, {
    key: 'eventId',
    set: function set(id) {
      this.config.id = id;
    },
    get: function get() {
      return this.config.id;
    }
  }, {
    key: 'apiUrl',
    get: function get() {
      return this.config.id ? 'https://app.ticketmaster.com/discovery/v2/events/' + this.config.id + '.json' : 'https://app.ticketmaster.com/discovery/v2/events/' + this.eventId + '.json';
    }
  }, {
    key: 'themeUrl',
    get: function get() {
      return window.location.host === 'developer.ticketmaster.com' ? 'https://developer.ticketmaster.com/products-and-docs/widgets/countdown/1.0.0/theme/' : 'https://ticketmaster-api-staging.github.io/products-and-docs/widgets/countdown/1.0.0/theme/';
    }
  }, {
    key: 'isFullWidth',
    get: function get() {
      return this.config.proportion === 'fullwidth';
    }
  }, {
    key: 'portalUrl',
    get: function get() {
      return window.location.host === 'developer.ticketmaster.com' ? 'https://developer.ticketmaster.com/' : 'https://ticketmaster-api-staging.github.io/';
    }
  }, {
    key: 'logoUrl',
    get: function get() {
      return "https://www.ticketmaster.com/";
    }
  }, {
    key: 'legalNoticeUrl',
    get: function get() {
      return "http://developer.ticketmaster.com/support/terms-of-use/";
    }
  }, {
    key: 'widgetVersion',
    get: function get() {
      return '' + "1.0.265";
    }
  }, {
    key: 'questionUrl',
    get: function get() {
      return "http://developer.ticketmaster.com/support/faq/";
    }
  }, {
    key: 'updateExceptions',
    get: function get() {
      return ["width", "height", "border", "borderradius", "layout", "propotion", "seconds"];
    }
  }, {
    key: 'hideMessageDelay',
    get: function get() {
      return 5000;
    }
  }, {
    key: 'tmWidgetWhiteList',
    get: function get() {
      return ["2200504BAD4C848F", "00005044BDC83AE6", "1B005068DB60687F", "1B004F4DBEE45E47", "3A004F4ED7829D5E", "3A004F4ED1FC9B63", "1B004F4FF83289C5", "1B004F4FC0276888", "0E004F4F3B7DC543", "1D004F4F09C61861", "1600505AC9A972A1", "22004F4FD82795C6", "01005057AFF54574", "01005056FAD8793A", "3A004F4FB2453240", "22004F50D2149AC6", "01005059AD49507A", "01005062B4236D5D"];
    }
  }, {
    key: 'eventReqAttrs',
    get: function get() {
      var attrs = {},
          params = [{
        attr: 'tmapikey',
        verboseName: 'apikey'
      }];

      for (var i in params) {
        var item = params[i];
        if (this.isConfigAttrExistAndNotEmpty(item.attr)) attrs[item.verboseName] = this.config[item.attr];
      }

      return attrs;
    }
  }]);

  function TicketmasterCountdownWidget(root) {
    _classCallCheck(this, TicketmasterCountdownWidget);

    this.widgetRoot = root;

    this.eventsRootContainer = document.createElement("div");
    this.eventsRootContainer.classList.add("events-root-container");
    this.widgetRoot.appendChild(this.eventsRootContainer);

    this.eventsRoot = document.createElement("ul");
    this.eventsRoot.classList.add("events-root");
    this.eventsRootContainer.appendChild(this.eventsRoot);

    this.config = this.widgetRoot.attributes;
    this.eventId = this.config.id;

    if (this.config.theme !== null && !document.getElementById('widget-theme-' + this.config.theme)) {
      this.makeRequest(this.styleLoadingHandler, this.themeUrl + this.config.theme + ".css");
    }

    this.widgetRoot.style.height = this.config.height + 'px';
    this.widgetRoot.style.width = this.config.width + 'px';

    this.eventsRootContainer.style.height = this.config.height + 'px';
    this.eventsRootContainer.style.width = this.config.width + 'px';
    this.eventsRootContainer.style.borderRadius = this.config.borderradius + 'px';
    this.eventsRootContainer.style.borderWidth = this.borderSize + 'px';

    this.initBuyBtn();

    this.AdditionalElements();

    this.initMessage();

    this.buildCountdown();

    if (this.apiUrl) {
      this.makeRequest(this.eventsLoadingHandler, this.apiUrl, this.eventReqAttrs);
    } else {
      this.showMessage("Please enter event ID.", true, null);
    }

    this.embedUniversePlugin();
    this.embedTMPlugin();

    this.countDownWrapper.classList.add("events-count-down");

    this.countdownClock = new CountdownClock({
      onChange: this.onCountdownChange.bind(this)
    });

    this.toggleSecondsVisibility();

    if (this.isFullWidth) {
      this.initFullWidth();
    }
  }

  _createClass(TicketmasterCountdownWidget, [{
    key: 'getNormalizedDateValue',
    value: function getNormalizedDateValue(val) {
      return (val < 0 || val > 9 ? "" : "0") + val;
    }
  }, {
    key: 'toggleSecondsVisibility',
    value: function toggleSecondsVisibility() {
      if (this.countDownMonth.innerHTML > 0) {
        this.countDownWrapper.classList.add("hide-seconds");
        this.countDownWrapper.classList.remove("hide-days");
        this.countDownWrapper.classList.remove("hide-month"); //Removing a class that does not exist, does NOT throw an error
      } else if (this.countDownDays.innerHTML <= 0) {
        this.countDownWrapper.classList.add("hide-month");
        this.countDownWrapper.classList.add("hide-days");
        this.countDownWrapper.classList.remove("hide-seconds");
      } else {
        this.countDownWrapper.classList.add("hide-month");
        this.countDownWrapper.classList.remove("hide-days");
        this.countDownWrapper.classList.remove("hide-seconds");
      }
    }
  }, {
    key: 'showStatusMessage',
    value: function showStatusMessage(data) {
      var me = this;
      if (this.event.date && this.event.date.dateTime) {
        chenHeaderEvent(this.event.date);
      }

      function chenHeaderEvent(eventT) {
        var now = new Date(),
            msecsNow = Date.parse(now),
            eventDateStart = new Date(eventT.dateTime),
            msecsStart = Date.parse(eventDateStart),
            eventDateEnd = new Date(eventT.dateTimeEnd),
            msecsEnd = Date.parse(eventDateEnd);

        if (msecsNow > msecsEnd || isNaN(msecsEnd)) {
          me.showMessage('This event has taken place', false, "event-message-started");
        } else if (msecsStart < msecsNow < msecsEnd) {
          me.showMessage('Event is in progress', false, "event-message-started");
        }
      }
    }
  }, {
    key: 'onCountdownChange',
    value: function onCountdownChange(data) {
      var timeLeft = this.getNormalizedDateValue(data.total),
          now = Date.parse(new Date());

      /*toggle CountDown-Box Visibility*/
      if (timeLeft <= 0 || now < timeLeft) {
        this.countDownWrapper.classList.add("hide-countDownBox");
        if (this.eventId && this.event) {
          this.showStatusMessage(data);
          return false; //exit if event has taken place
        }
      } else this.countDownWrapper.classList.remove("hide-countDownBox");

      if (data.monthLeft > 99) {
        this.showMessage('This event starts in more than ' + data.monthLeft + ' month, ' + data.days + ' days, ' + data.hours + ' hours', false, "event-message-started");
        this.countDownWrapper.classList.add("hide-countDownBox");
        return false;
      }

      this.countDownMonth.innerHTML = this.getNormalizedDateValue(data.monthLeft);
      this.countDownDays.innerHTML = this.getNormalizedDateValue(data.days);
      this.countDownHours.innerHTML = this.getNormalizedDateValue(data.hours);
      this.countDownMinute.innerHTML = this.getNormalizedDateValue(data.minutes);
      this.countDownSecond.innerHTML = this.getNormalizedDateValue(data.seconds);

      this.toggleSecondsVisibility();
    }
  }, {
    key: 'buildCountdown',
    value: function buildCountdown() {
      this.countDownWrapper = document.createElement("div");
      this.countDownWrapper.classList.add("events-count-down");
      this.countDownMonth = document.createElement("span");
      this.countDownDays = document.createElement("span");
      this.countDownHours = document.createElement("span");
      this.countDownMinute = document.createElement("span");
      this.countDownSecond = document.createElement("span");

      this.countDownMonth.innerHTML = '00';
      this.countDownDays.innerHTML = '00';
      this.countDownHours.innerHTML = '00';
      this.countDownMinute.innerHTML = '00';
      this.countDownSecond.innerHTML = '00';

      this.countDownMonth.classList.add("events-count-down__month");
      this.countDownDays.classList.add("events-count-down__day");
      this.countDownHours.classList.add("events-count-down__hour");
      this.countDownMinute.classList.add("events-count-down__minute");
      this.countDownSecond.classList.add("events-count-down__second");

      this.countDownWrapper.appendChild(this.countDownMonth);
      this.countDownWrapper.appendChild(this.countDownDays);
      this.countDownWrapper.appendChild(this.countDownHours);
      this.countDownWrapper.appendChild(this.countDownMinute);
      this.countDownWrapper.appendChild(this.countDownSecond);

      this.eventsRootContainer.appendChild(this.countDownWrapper);
    }
  }, {
    key: 'initBuyBtn',
    value: function initBuyBtn() {
      this.buyBtn = document.createElement("a");
      this.buyBtn.appendChild(document.createTextNode('BUY NOW'));
      this.buyBtn.classList.add("event-buy-btn");
      this.buyBtn.target = '_blank';
      this.buyBtn.href = '';
      this.buyBtn.setAttribute('onclick', "ga('send', 'event', 'CountdownClickBuyButton', 'click');");
      this.buyBtn.addEventListener('click', function (e) {
        e.preventDefault();
      });
      this.eventsRootContainer.appendChild(this.buyBtn);
    }
  }, {
    key: 'updateTransition',
    value: function updateTransition(url) {
      var el = this.eventsRootContainer.querySelector(".event-logo.centered-logo");
      if (url !== '') {
        if (el) {
          el.classList.add("right-logo");
          el.classList.remove("centered-logo");
        } else return;
      } else {
        el = this.eventsRootContainer.querySelector(".event-logo.right-logo");
        if (el) {
          el.classList.remove("right-logo");
          el.classList.add("centered-logo");
        }
      }
    }
  }, {
    key: 'setBuyBtnUrl',
    value: function setBuyBtnUrl() {
      if (this.buyBtn) {
        var event = this.event,
            url = '';
        if (event) {
          if (event.url) {
            if (this.isUniversePluginInitialized && this.isUniverseUrl(event.url) || this.isTMPluginInitialized && this.isAllowedTMEvent(event.url)) {
              url = event.url;
            }
            this.updateTransition(url);
          }
        }
        this.buyBtn.href = url;
      }
    }
  }, {
    key: 'isUniverseUrl',
    value: function isUniverseUrl(url) {
      return url.match(/universe.com/g) || url.match(/uniiverse.com/g);
    }
  }, {
    key: 'isAllowedTMEvent',
    value: function isAllowedTMEvent(url) {
      for (var t = [/(?:ticketmaster\.com)\/(.*\/)?event\/([^\/?#]+)/, /(?:concerts\.livenation\.com)\/(.*\/)?event\/([^\/?#]+)/], n = null, r = 0; r < t.length && (n = url.match(t[r]), null === n); r++) {}
      var id = null !== n ? n[2] : void 0;
      return this.tmWidgetWhiteList.indexOf(id) > -1;
    }
  }, {
    key: 'embedTMPlugin',
    value: function embedTMPlugin() {
      var id = 'id_tm_widget';
      if (!document.getElementById(id)) {
        var script = document.createElement('script');
        script.setAttribute('src', this.portalUrl + 'scripts/vendors/tm.js');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('charset', 'UTF-8');
        script.setAttribute('id', id);
        (document.head || document.getElementsByTagName('head')[0]).appendChild(script);
      }
      this.isTMPluginInitialized = true;
    }
  }, {
    key: 'embedUniversePlugin',
    value: function embedUniversePlugin() {
      var id = 'id_universe_widget';
      if (!document.getElementById(id)) {
        var script = document.createElement('script');
        script.setAttribute('src', 'https://www.universe.com/embed.js');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('charset', 'UTF-8');
        script.setAttribute('id', id);
        (document.head || document.getElementsByTagName('head')[0]).appendChild(script);
      }
      this.isUniversePluginInitialized = true;
    }

    // Message

  }, {
    key: 'initMessage',
    value: function initMessage() {
      this.messageDialog = document.createElement('div');
      this.messageDialog.classList.add("event-message");
      this.messageContent = document.createElement('div');
      this.messageContent.classList.add("event-message__content");

      /*let messageClose = document.createElement('div');
      messageClose.classList.add("event-message__btn");
      messageClose.addEventListener("click", ()=> {
        this.hideMessage();
      });*/

      this.messageDialog.appendChild(this.messageContent);
      /*this.messageDialog.appendChild(messageClose);*/
      this.eventsRootContainer.appendChild(this.messageDialog);
    }
  }, {
    key: 'showMessage',
    value: function showMessage(message, hideMessageWithoutDelay, /*string togleClassName*/className) {
      if (message.length) {
        this.hideMessageWithoutDelay = hideMessageWithoutDelay;
        this.messageContent.innerHTML = message;
        this.messageDialog.className = "";
        this.messageDialog.classList.add("event-message");
        this.messageDialog.classList.add("event-message-visible");
        // this.messageDialog.classList.remove("event-message-started");
      }

      if (className) {
        this.messageDialog.classList.add(className);
      } else {
        this.messageDialog.classList.add("event-message-visible");
        this.messageDialog.classList.remove(className);
      }

      className = null;
    }
  }, {
    key: 'hideMessage',
    value: function hideMessage() {
      if (this.messageTimeout) clearTimeout(this.messageTimeout); // Clear timeout and hide message immediately.
      this.messageDialog.classList.remove("event-message-visible");
    }
    // End message

  }, {
    key: 'AdditionalElements',
    value: function AdditionalElements() {
      var legalNoticeContent = document.createTextNode('Legal Notice'),
          legalNotice = document.createElement("a");
      legalNotice.appendChild(legalNoticeContent);
      legalNotice.classList.add("legal-notice");
      legalNotice.target = '_blank';
      legalNotice.href = this.legalNoticeUrl;
      this.widgetRoot.appendChild(legalNotice);

      var logo = document.createElement('a');
      logo.classList.add("event-logo", "centered-logo");
      logo.target = '_blank';
      logo.href = this.logoUrl;
      logo.innerHTML = 'Powered by ';

      var logoBox = document.createElement('div');
      logoBox.classList.add("event-logo-box");
      logoBox.appendChild(logo);
      this.eventsRootContainer.appendChild(logoBox);

      var question = document.createElement('span'),
          toolTip = document.createElement('div'),
          tooltipHtml = '\n\t\t\t\t<div class="tooltip-inner"> \n\t\t\t\t\t<a href="' + this.questionUrl + '" target = "_blank" >About widget</a>\n\t\t\t\t\t<div class="place">version: <b>' + this.widgetVersion + '</b></div>\n\t\t\t\t</div>';
      question.classList.add("event-question");
      question.addEventListener('click', toolTipHandler);
      toolTip.classList.add("tooltip-version");
      toolTip.classList.add("left");
      toolTip.innerHTML = tooltipHtml;
      this.eventsRootContainer.appendChild(question);
      this.eventsRootContainer.appendChild(toolTip);

      function toolTipHandler(e) {
        e.preventDefault();
        e.target.nextSibling.classList.toggle('show-tip');
      }
    }
  }, {
    key: 'formatDate',
    value: function formatDate(date) {
      var result = '';
      if (!date.day) return result; // Day is required

      var MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          dayArray = date.day.split('-'),
          d = parseInt(dayArray[2]),
          M = parseInt(dayArray[1]);

      // var E = new Date(date.day).getDay();
      var E = new Date(+date.day.split('-')[0], +date.day.split('-')[1] - 1, +date.day.split('-')[2]).getDay();
      result = DAY_NAMES[E] + ', ' + MONTH_NAMES[M - 1] + ' ' + d + ', ' + dayArray[0];

      if (!date.time) return result;

      var timeArray = date.time.split(':'),
          H = parseInt(timeArray[0]),
          m = timeArray[1],
          a = "AM";

      if (H > 11) a = "PM";
      if (H === 0) {
        H = 12;
      } else if (H > 12) {
        H = H - 12;
      }

      return result + ' ' + this.getNormalizedDateValue(H) + ':' + m + ' ' + a;
    }
  }, {
    key: 'clearEvents',
    value: function clearEvents() {
      this.eventsRoot.innerHTML = "";
    }
  }, {
    key: 'clear',
    value: function clear() {
      var modificatorList = this.widgetRoot.getElementsByClassName('modificator');
      while (modificatorList.length) {
        var el = modificatorList[0],
            parent = el.parentNode;
        parent.removeChild(el);
      }
      this.clearEvents();
    }
  }, {
    key: 'update',
    value: function update(isFullWidthTheme) {

      var oldTheme = this.config.constructor();
      for (var attr in this.config) {
        if (this.config.hasOwnProperty(attr)) oldTheme[attr] = this.config[attr];
      }

      this.config = this.widgetRoot.attributes;
      this.widgetRoot.style.height = this.config.height + 'px';
      this.widgetRoot.style.width = this.config.width + 'px';
      this.eventsRootContainer.style.height = this.config.height + 'px';
      this.eventsRootContainer.style.width = this.config.width + 'px';
      this.eventsRootContainer.style.borderRadius = this.config.borderradius + 'px';
      this.eventsRootContainer.style.borderWidth = this.borderSize + 'px';

      if (this.needToUpdate(this.config, oldTheme, this.updateExceptions) || isFullWidthTheme) {
        this.clear();

        if (this.config.theme !== null) {
          //set new styles
          this.makeRequest(this.styleLoadingHandler, this.themeUrl + this.config.theme + ".css");
        }

        if (this.widgetConfig.theme !== 'simple_countdown') {
          var heightStatic = '700px';
          //draw inline style
          //border
          this.eventsRootContainer.style.borderRadius = this.config.borderradius + 'px';
          this.eventsRootContainer.style.borderWidth = this.borderSize + 'px';

          //set width
          this.widgetRoot.style.width = '100%';
          this.widgetRoot.style.height = heightStatic;
          this.widgetRoot.style.display = 'block';
          this.eventsRootContainer.style.width = '100%';
          this.eventsRootContainer.style.height = heightStatic;
          this.widgetConfig.width = '100%';
        }

        /*if( this.themeModificators.hasOwnProperty( this.widgetConfig.theme ) ) {
          this.themeModificators[ this.widgetConfig.theme ]();
        }*/

        if (this.apiUrl && this.eventId) {
          this.makeRequest(this.eventsLoadingHandler, this.apiUrl, this.eventReqAttrs);
        } else {
          // this.showMessage("No results were found.", true);
          this.showMessage("No events were found", true, 'cactus');
          this.countdownClock.update(null);
        }
      } else {
        var events = this.widgetRoot.getElementsByClassName("event-wrapper");
        for (var i in events) {
          if (events.hasOwnProperty(i) && events[i].style !== undefined) {
            events[i].style.width = this.config.width - this.borderSize * 2 + 'px';
            events[i].style.height = this.config.height - this.borderSize * 2 + 'px';
          }
        }
      }

      if (this.isFullWidth) {
        this.initFullWidth();
      }
      //this.toggleSecondsVisibility();
    }
  }, {
    key: 'needToUpdate',
    value: function needToUpdate(newTheme, oldTheme) {
      var forCheck = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      return Object.keys(newTheme).map(function (key) {
        if (forCheck.indexOf(key) > -1) return true;
        //console.warn([key, newTheme[key], oldTheme[key], newTheme[key] === oldTheme[key]])
        return newTheme[key] === oldTheme[key];
      }).indexOf(false) > -1;
    }
  }, {
    key: 'loadConfig',
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
    key: 'styleLoadingHandler',
    value: function styleLoadingHandler() {
      if (this && this.readyState == XMLHttpRequest.DONE) {
        if (this.status == 200) {
          var style = document.createElement("style");
          style.setAttribute("type", "text/css");
          style.setAttribute("id", 'widget-theme-' + this.widget.config.theme);
          style.textContent = this.responseText;
          document.getElementsByTagName("head")[0].appendChild(style);
        } else {
          console.info("theme wasn't loaded");
        }
      }
    }
  }, {
    key: 'onEventLoadError',
    value: function onEventLoadError(status, loadOnce) {
      this.event = false;
      this.showMessage("No results were found.", true, null);
      console.log('There was an error status - ' + status);
      if (!loadOnce) {
        this.changeDefaultId();
      }
    }
  }, {
    key: 'eventsLoadingHandler',
    value: function eventsLoadingHandler() {
      var widget = this.widget;
      widget.clearEvents(); // Additional clearing after each loading
      if (this && this.readyState == XMLHttpRequest.DONE) {
        if (this.status == 200) {
          widget.event = JSON.parse(this.responseText);
          if (widget.event) {
            widget.publishEvent(widget.event);
            widget.hideMessage();
          }
        } else if (this.status == 400) {
          widget.onEventLoadError.call(widget, this.status);
        } else {
          widget.onEventLoadError.call(widget, this.status);
        }
        // http://js2coffee.thomaskalka.de/ - widget.event?.date?.dateTime
        var _ref = void 0,
            _ref2 = void 0;
        widget.countdownClock.update((_ref = widget.event) != null ? (_ref2 = _ref.date) != null ? _ref2.dateTime || _ref2.day : void 0 : void 0);
      }
      widget.setBuyBtnUrl();
    }
  }, {
    key: 'publishEvent',
    value: function publishEvent(event, parentNode) {
      parentNode = parentNode || this.eventsRoot;
      var DOMElement = this.createDOMItem(event);
      parentNode.appendChild(DOMElement);
    }
  }, {
    key: 'getImageForEvent',
    value: function getImageForEvent(images) {
      var width = this.config.width,
          height = this.config.height;

      if (width === '100%') {
        width = this.widgetRoot.offsetWidth;
      }
      images.sort(function (a, b) {
        if (a.width < b.width) return -1;else if (a.width > b.width) return 1;else return 0;
      });

      var myImg = "";
      images.forEach(function (element) {
        if (element.width >= width && element.height >= height && !myImg) {
          myImg = element.url;
        }
      });
      if (myImg === "") {
        myImg = images[images.length - 1].url;
      }
      return myImg;
    }
  }, {
    key: 'parseEvent',
    value: function parseEvent(eventSet) {
      if (!eventSet.id) {
        return false;
      }

      var currentEvent = {};

      currentEvent.id = eventSet.id;
      currentEvent.url = eventSet.url;
      currentEvent.name = eventSet.name;

      currentEvent.date = {
        day: eventSet.dates.start.localDate,
        time: eventSet.dates.start.localTime,
        dateTime: eventSet.dates.start.dateTime
      };

      if (eventSet.dates.end) {
        eventSet.dates.end.localDate ? currentEvent.date.dayEnd = eventSet.dates.end.localDate : '';
        eventSet.dates.end.localTime ? currentEvent.date.timeEnd = eventSet.dates.end.localTime : '';
        eventSet.dates.end.dateTime ? currentEvent.date.dateTimeEnd = eventSet.dates.end.dateTime : '';
      }

      if (eventSet.hasOwnProperty('_embedded') && eventSet._embedded.hasOwnProperty('venues')) {
        var venue = eventSet._embedded.venues[0];
        if (venue) {
          if (venue.address) currentEvent.address = venue.address;

          if (venue.name) {
            if (!currentEvent.address) currentEvent.address = {};
            currentEvent.address.name = venue.name;
          }
        }
      }

      currentEvent.img = this.getImageForEvent(eventSet.images);
      return currentEvent;
    }
  }, {
    key: 'changeDefaultId',
    value: function changeDefaultId() {
      Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
      };
      var zipVegas = '89109',
          url = 'https://app.ticketmaster.com/discovery/v2/events.json',
          newAttr = Object.assign({}, this.eventReqAttrs),
          d = new Date(0),
          convertedNewStartDate = void 0;

      d.setUTCSeconds(Math.round(new Date().addDays(30).getTime()) / 1000);
      convertedNewStartDate = d.toJSON().slice(0, 17) + '00Z';
      if (d.toJSON().length <= 20) convertedNewStartDate = d.toJSON();
      newAttr.startDateTime = convertedNewStartDate;
      newAttr.zipcode = zipVegas;

      this.makeRequest(this.changeDefaultIdHandler, url, newAttr);
    }
  }, {
    key: 'changeDefaultIdHandler',
    value: function changeDefaultIdHandler() {
      function getValidId(events) {
        var id = '',
            newStartDate = new Date().addDays(30);

        for (var ii = 0; ii < events.length; ii++) {
          if (Math.round(new Date(events[ii].dates.start.dateTime).getTime() / 1000) >= Math.round(new Date(newStartDate).getTime() / 1000)) {
            id = events[ii].id;
            break;
          }
        }
        return id;
      }
      function setEventId() {
        var _this = this;

        return function () {
          return _this.makeRequest(_this.eventsLoadingHandler, _this.apiUrl, _this.eventReqAttrs);
        };
      }
      var widget = this.widget;
      var loadOnce = false;
      widget.clearEvents(); // Additional clearing after each loading

      if (this && this.readyState == XMLHttpRequest.DONE) {
        if (this.status == 200) {
          var eventsWrap = JSON.parse(this.responseText);
          if (eventsWrap) {
            var events = eventsWrap['_embedded']['events'],
                newId = getValidId(events);
            widget.eventId = newId;
            if (document.getElementById('w-id')) {
              document.getElementById('w-id').value = widget.eventId;
            }
            setEventId.call(widget, newId)();
          }
        } else if (this.status == 400) {
          loadOnce = true;
          widget.onEventLoadError.call(widget, this.status, loadOnce);
        } else {
          console.log('this error', this);
          loadOnce = true;
          widget.onEventLoadError.call(widget, this.status, loadOnce);
        }
        // http://js2coffee.thomaskalka.de/ - widget.event?.date?.dateTime
        var _ref = void 0,
            _ref2 = void 0;
        widget.countdownClock.update((_ref = widget.event) != null ? (_ref2 = _ref.date) != null ? _ref2.dateTime || _ref2.day : void 0 : void 0);
      }
      widget.setBuyBtnUrl();
    }
  }, {
    key: 'makeRequest',
    value: function makeRequest(handler) {
      var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.apiUrl;
      var attrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "GET";

      attrs = Object.keys(attrs).map(function (key) {
        return key + '=' + attrs[key];
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
    key: 'initPretendedLink',
    value: function initPretendedLink(el, url, isBlank) {
      if (el && url) {
        el.setAttribute('data-url', url);
        el.classList.add("event-pretended-link");
        el.addEventListener('click', function () {
          var url = this.getAttribute('data-url');
          if (url) {
            var win = window.open(url, isBlank ? '_blank' : '_self');
            win.focus();
          }
        });
      }
      return el;
    }
  }, {
    key: 'initFullWidth',
    value: function initFullWidth() {
      var heightStatic = 700;
      this.config.width = '100%';
      this.config.height = heightStatic;
      this.widgetRoot.style.width = '100%';
      this.widgetRoot.style.height = heightStatic + 'px';
      this.widgetRoot.style.display = 'block';
      this.eventsRootContainer.style.width = '100%';
      this.eventsRootContainer.style.height = this.widgetContentHeight + 'px';
    }
  }, {
    key: 'createDOMItem',
    value: function createDOMItem(itemConfig) {
      var medWrapper = document.createElement("div");
      medWrapper.classList.add("event-content-wraper");

      var event = document.createElement("li");
      event.classList.add("event-wrapper");
      event.style.height = this.config.height - this.borderSize * 2 + 'px';
      event.style.width = !this.isFullWidth ? this.config.width - this.borderSize * 2 + 'px' : '100%';

      var image = document.createElement("span");
      image.classList.add("bg-cover");
      image.style.backgroundImage = 'url(\'' + itemConfig.img + '\')';
      event.appendChild(image);

      var nameContent = document.createTextNode(itemConfig.name),
          name = document.createElement("span");
      name.classList.add("event-name");
      name.appendChild(nameContent);
      this.initPretendedLink(name, itemConfig.url, true);
      name.setAttribute('onclick', 'ga(\'send\', \'event\', \'CountDownClickeventName_theme=' + this.config.theme + '_width=' + this.config.width + '_height=' + this.config.height + '_color_scheme=light\', \'click\', \'' + itemConfig.url + '\');');
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

        if (itemConfig.address.hasOwnProperty("name")) {
          var addressNameText = document.createTextNode(itemConfig.address.name),
              addressName = document.createElement("span");
          addressName.classList.add("event-address");
          addressName.classList.add("event-address-name");
          addressName.appendChild(addressNameText);
          addressWrapper.appendChild(addressName);
        }

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

    /*
     * Config block
     */
    /*
    decConfig(config){    
      return JSON.parse(window.atob(config));
    }
    encConfig(config){
      return window.btoa(config);
    }
    */

  }]);

  return TicketmasterCountdownWidget;
}();

var widgetsCountdown = [];
(function () {
  var widgetContainers = document.querySelectorAll("div[w-type='countdown']");
  for (var i = 0; i < widgetContainers.length; ++i) {
    widgetsCountdown.push(new TicketmasterCountdownWidget(widgetContainers[i]));
  }
})();

(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments);
  }, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-78317809-1', 'auto');
ga('send', 'pageview');

if (true) {
  module.exports = { CountdownClock: CountdownClock, TicketmasterCountdownWidget: TicketmasterCountdownWidget, widgetsCountdown: widgetsCountdown };
}

/***/ })
/******/ ]);
//# sourceMappingURL=main-widget.js.map