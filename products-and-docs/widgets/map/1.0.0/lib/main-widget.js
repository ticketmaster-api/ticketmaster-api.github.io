var widgetsLib =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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

var TicketmasterMapWidget = function () {
    _createClass(TicketmasterMapWidget, [{
        key: "isConfigAttrExistAndNotEmpty",
        value: function isConfigAttrExistAndNotEmpty(attr) {
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
        key: "isSimpleProportionM",
        get: function get() {
            return this.config.proportion === 'm';
        }
    }, {
        key: "borderSize",
        get: function get() {
            return this.config.border || 0;
        }
    }, {
        key: "widgetHeight",
        get: function get() {
            return this.config.height || 600;
        }
    }, {
        key: "widgetContentHeight",
        get: function get() {
            // return this.widgetHeight - (this.isListView || this.isSimpleProportionM ? 0 : 39) || 600;
            return this.widgetHeight;
        }
    }, {
        key: "eventUrl",
        get: function get() {
            return "https://www.ticketmaster.com/event/";
        }
    }, {
        key: "apiUrl",
        get: function get() {
            return "https://app.ticketmaster.com/discovery/v2/events.json";
        }
    }, {
        key: "themeUrl",
        get: function get() {
            return window.location.host === 'developer.ticketmaster.com' ? "https://developer.ticketmaster.com/products-and-docs/widgets/map/1.0.0/theme/" : "https://ticketmaster-api-staging.github.io/products-and-docs/widgets/map/1.0.0/theme/";
        }
    }, {
        key: "portalUrl",
        get: function get() {
            return window.location.host === 'developer.ticketmaster.com' ? "https://developer.ticketmaster.com/" : "https://ticketmaster-api-staging.github.io/";
        }
    }, {
        key: "logoUrl",
        get: function get() {
            return "https://www.ticketmaster.com/";
        }
    }, {
        key: "legalNoticeUrl",
        get: function get() {
            return "http://developer.ticketmaster.com/support/terms-of-use/";
        }
    }, {
        key: "questionUrl",
        get: function get() {
            return "http://developer.ticketmaster.com/support/faq/";
        }
    }, {
        key: "widgetVersion",
        get: function get() {
            return "" + "1.0.298";
        }
    }, {
        key: "geocodeUrl",
        get: function get() {
            return "https://maps.googleapis.com/maps/api/geocode/json";
        }
    }, {
        key: "updateExceptions",
        get: function get() {
            return ["width", "height", "border", "borderradius", "colorscheme", "layout", "affiliateid", "propotion", "googleapikey", "latlong"];
        }
    }, {
        key: "hideMessageDelay",
        get: function get() {
            return 5000;
        }
    }, {
        key: "controlHiddenClass",
        get: function get() {
            return "events_control-hidden";
        }
    }, {
        key: "tmWidgetWhiteList",
        get: function get() {
            return ["2200504BAD4C848F", "00005044BDC83AE6", "1B005068DB60687F", "1B004F4DBEE45E47", "3A004F4ED7829D5E", "3A004F4ED1FC9B63", "1B004F4FF83289C5", "1B004F4FC0276888", "0E004F4F3B7DC543", "1D004F4F09C61861", "1600505AC9A972A1", "22004F4FD82795C6", "01005057AFF54574", "01005056FAD8793A", "3A004F4FB2453240", "22004F50D2149AC6", "01005059AD49507A", "01005062B4236D5D"];
        }
    }, {
        key: "countriesWhiteList",
        get: function get() {
            return ['Australia', 'Austria', 'Belgium', 'Canada', 'Denmark', 'Finland', 'France', 'Germany', 'Ireland', 'Mexico', 'Netherlands', 'New Zealand', 'Norway', 'Spain', 'Sweden', 'Turkey', 'UAE', 'United Kingdom', 'United States'];
        }
    }, {
        key: "eventReqAttrs",
        get: function get() {
            var mapWidgetRoot = this.eventsRootContainer.parentNode;
            var attrs = {},
                params = [{
                attr: 'tmapikey',
                verboseName: 'apikey'
            }, {
                attr: 'latlong',
                verboseName: 'latlong'
            }, {
                attr: 'postalcode',
                verboseName: 'postalCode'
            }, {
                attr: 'keyword',
                verboseName: 'keyword'
            }, {
                attr: 'size',
                verboseName: 'size'
            }, {
                attr: 'radius',
                verboseName: 'radius'
            }, {
                attr: 'attractionid',
                verboseName: 'attractionId'
            }, {
                attr: 'promoterid',
                verboseName: 'promoterId'
            }, {
                attr: 'venueid',
                verboseName: 'venueId'
            }, {
                attr: 'classificationname',
                verboseName: 'classificationName'
            }, {
                attr: 'city',
                verboseName: 'city'
            }, {
                attr: 'countrycode',
                verboseName: 'countryCode'
            }, {
                attr: 'source',
                verboseName: 'source'
            }];

            for (var i in params) {
                var item = params[i];
                if (this.isConfigAttrExistAndNotEmpty(item.attr)) attrs[item.verboseName] = this.config[item.attr];
            }

            if (this.config.latlong) {
                attrs.latlong = this.config.latlong;
            }

            if (this.config.postalcode) {
                attrs.postalcode = this.config.postalcode;
            }

            if (this.isConfigAttrExistAndNotEmpty("period")) {
                var period = this.getDateFromPeriod(this.config.period);
                attrs.startDateTime = period[0];
                attrs.endDateTime = period[1];
            }

            if (this.config.tmapikey == '') {
                attrs.apikey = apiKeyService.checkApiKeyCookie() || apiKeyService.getApiWidgetsKey();
            }

            if (mapWidgetRoot.getAttribute("w-latlong") != '') {
                attrs.latlong = mapWidgetRoot.getAttribute("w-latlong");
            }

            if (attrs.latlong == ',') {
                delete attrs.latlong;
            }

            if (attrs.latlong == null) {
                delete attrs.latlong;
            }

            return attrs;
        }
    }]);

    function TicketmasterMapWidget(root) {
        var _this = this;

        _classCallCheck(this, TicketmasterMapWidget);

        if (!root) return;
        this.widgetRoot = root;
        if (this.widgetRoot.querySelector('.events-root-container') === null) {
            this.eventsRootContainer = document.createElement("div");
            this.eventsRootContainer.classList.add("events-root-container");
            this.widgetRoot.appendChild(this.eventsRootContainer);

            this.config = this.widgetRoot.attributes;

            this.eventsRoot = document.createElement("div");
            this.eventsRoot.classList.add("map");
            // this.eventsRoot.style.height = parseInt(parseInt(this.widgetHeight) + 25) + "px";
            this.eventsRoot.style.height = this.widgetHeight + "px";
            this.eventsRoot.style.width = this.config.width + "px";
            this.eventsRootContainer.appendChild(this.eventsRoot);

            if (this.config.theme !== null && !document.getElementById("widget-theme-" + this.config.theme)) {
                this.makeRequest(this.styleLoadingHandler, this.themeUrl + this.config.theme + ".css");
            }

            this.eventsRootContainer.classList.remove("border");
            if (this.config.border) {
                this.eventsRootContainer.classList.add("border");
            }

            this.widgetRoot.style.height = this.widgetHeight + "px";
            this.widgetRoot.style.width = this.config.width + "px";
            this.eventsRootContainer.style.height = this.widgetHeight + "px";
            this.eventsRootContainer.style.width = this.config.width + "px";
            this.eventsRootContainer.style.borderRadius = this.config.borderradius + "px";
            this.eventsRootContainer.style.borderWidth = this.borderSize + "px";

            //this.clear();

            this.AdditionalElements();

            this.useGeolocation();

            this.getCoordinates(function () {
                _this.makeRequest(_this.eventsLoadingHandler, _this.apiUrl, _this.eventReqAttrs);
            });
            /*plugins for 'buy button'*/
            this.embedUniversePlugin();
            this.embedTMPlugin();
            this.initBuyBtn();
            this.initMessage();
        }
    }

    _createClass(TicketmasterMapWidget, [{
        key: "getCoordinates",
        value: function getCoordinates(cb) {
            var widget = this;
            if (this.config.postalcode) {
                widget.config.postalcode = this.config.postalcode;
                cb(widget.config.postalcode);
            } else {
                // Used in builder
                if (widget.onLoadCoordinate) widget.onLoadCoordinate(null);
                widget.config.latlong = '';
                // widget.config.countrycode = '';
                cb(widget.config.latlong);
            }
        }
    }, {
        key: "initBuyBtn",
        value: function initBuyBtn() {
            this.buyBtn = document.createElement("a");
            this.buyBtn.appendChild(document.createTextNode('BUY NOW'));
            this.buyBtn.classList.add("event-buy-btn");
            this.buyBtn.classList.add("main-btn");
            this.buyBtn.target = '_blank';
            this.buyBtn.href = '';
            this.buyBtn.setAttribute('onclick', "ga('send', 'event', 'DiscoveryClickBuyButton', 'click');");
            this.buyBtn.addEventListener('click', function (e) {
                e.preventDefault();
            });
            this.eventsRootContainer.appendChild(this.buyBtn);
        }
    }, {
        key: "setBuyBtnUrl",
        value: function setBuyBtnUrl() {
            if (this.buyBtn) {
                var event = '',
                    url = '';
                if (event) {
                    if (event.url) {

                        if (this.isUniversePluginInitialized && this.isUniverseUrl(event.url) || this.isTMPluginInitialized && this.isAllowedTMEvent(event.url)) {
                            url = event.url;
                        }
                    }
                }
                this.buyBtn.href = url;
            }
        }
    }, {
        key: "isUniverseUrl",
        value: function isUniverseUrl(url) {
            return url.match(/universe.com/g) || url.match(/uniiverse.com/g) || url.match(/ticketmaster.com/g);
        }
    }, {
        key: "isAllowedTMEvent",
        value: function isAllowedTMEvent(url) {
            for (var t = [/(?:ticketmaster\.com)\/(.*\/)?event\/([^\/?#]+)/, /(?:concerts\.livenation\.com)\/(.*\/)?event\/([^\/?#]+)/], n = null, r = 0; r < t.length && (n = url.match(t[r]), null === n); r++) {}
            var id = null !== n ? n[2] : void 0;
            return this.tmWidgetWhiteList.indexOf(id) > -1;
        }
    }, {
        key: "embedTMPlugin",
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
        key: "embedUniversePlugin",
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
        key: "initMessage",
        value: function initMessage() {
            var _this2 = this;

            this.messageDialog = document.createElement('div');
            this.messageDialog.classList.add("event-message");
            this.messageContent = document.createElement('div');
            this.messageContent.classList.add("event-message__content");

            var messageClose = document.createElement('div');
            messageClose.classList.add("event-message__btn");
            messageClose.addEventListener("click", function () {
                _this2.hideMessage();
            });

            this.messageDialog.appendChild(this.messageContent);
            this.messageDialog.appendChild(messageClose);
            this.eventsRootContainer.appendChild(this.messageDialog);
        }
    }, {
        key: "showMessage",
        value: function showMessage(message, hideMessageWithoutDelay) {
            if (message.length) {
                this.hideMessageWithoutDelay = hideMessageWithoutDelay;
                this.messageContent.innerHTML = message;
                this.messageDialog.classList.add("event-message-visible");
                if (this.messageTimeout) {
                    clearTimeout(this.messageTimeout); // Clear timeout if before 'hideMessageWithDelay' was called
                }
            }
        }
    }, {
        key: "hideMessageWithDelay",
        value: function hideMessageWithDelay(delay) {
            var _this3 = this;

            if (this.messageTimeout) clearTimeout(this.messageTimeout); // Clear timeout if this method was called before
            this.messageTimeout = setTimeout(function () {
                _this3.hideMessage();
            }, delay);
        }
    }, {
        key: "hideMessage",
        value: function hideMessage() {
            if (this.messageTimeout) clearTimeout(this.messageTimeout); // Clear timeout and hide message immediately.
            this.messageDialog.classList.remove("event-message-visible");
        }
        // End message

    }, {
        key: "useGeolocation",
        value: function useGeolocation() {
            var widget = this;
            var clickNearMe = function clickNearMe(e) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var latitude = position.coords.latitude;
                        var longitude = position.coords.longitude;
                        e.target.parentNode.setAttribute('w-latlong', latitude + ',' + longitude);
                        widget.update();
                    });
                }
            };

            var buttons = document.getElementsByClassName("near-me-btn");
            for (var i = 0; i < buttons.length; i++) {
                var current = buttons[i];
                current.addEventListener('click', clickNearMe, false);
                current.addEventListener('touchstart', clickNearMe, false);
            }
        }
    }, {
        key: "AdditionalElements",
        value: function AdditionalElements() {
            var nearMeBtn = document.createElement("span");
            nearMeBtn.classList.add('near-me-btn');
            if (this.widgetRoot.getAttribute("w-geoposition") !== 'on') nearMeBtn.classList.add('dn');
            nearMeBtn.setAttribute('title', 'Show events near me');
            this.widgetRoot.appendChild(nearMeBtn);

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

            var question = document.createElement('span');
            question.classList.add("event-question");
            question.target = '_blank';
            question.href = this.questionUrl;
            question.addEventListener('click', toolTipHandler);
            this.eventsRootContainer.appendChild(question);

            var toolTip = document.createElement('div'),
                tooltipHtml = "\n              <div class=\"tooltip-inner\"> \n                <a href=\"" + this.questionUrl + "\" target = \"_blank\" >About widget</a>\n                <div class=\"place\">version: <b>" + this.widgetVersion + "</b></div>\n              </div>";
            toolTip.classList.add("tooltip-version");
            toolTip.classList.add("left");
            toolTip.innerHTML = tooltipHtml;
            this.eventsRootContainer.appendChild(toolTip);

            function toolTipHandler(e) {
                e.preventDefault();
                e.target.nextSibling.classList.toggle('show-tip');
            }
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

            // var E = new Date(date.day).getDay();
            var E = new Date(+date.day.split('-')[0], +date.day.split('-')[1] - 1, +date.day.split('-')[2]).getDay();
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
        key: "clearEvents",
        value: function clearEvents() {
            this.eventsRoot.innerHTML = "";
        }
    }, {
        key: "clear",
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
        key: "update",
        value: function update() {
            var _this4 = this;

            var oldTheme = this.config.constructor();
            for (var attr in this.config) {
                if (this.config.hasOwnProperty(attr)) oldTheme[attr] = this.config[attr];
            }

            this.config = this.widgetRoot.attributes;

            this.widgetRoot.style.height = this.widgetHeight + "px";
            this.widgetRoot.style.width = this.config.width + "px";
            this.eventsRootContainer.style.height = this.widgetContentHeight + "px";
            this.eventsRootContainer.style.width = this.config.width + "px";
            this.eventsRootContainer.style.borderRadius = this.config.borderradius + "px";
            this.eventsRootContainer.style.borderWidth = this.borderSize + "px";

            this.eventsRootContainer.classList.remove("border");
            if (this.config.hasOwnProperty("border")) {
                this.eventsRootContainer.classList.add("border");
            }

            this.clear();
            this.getCoordinates(function () {
                _this4.makeRequest(_this4.eventsLoadingHandler, _this4.apiUrl, _this4.eventReqAttrs);
            });

            var events = this.eventsRoot.getElementsByClassName("event-wrapper");
            for (var i in events) {
                if (events.hasOwnProperty(i) && events[i].style !== undefined) {
                    events[i].style.width = this.config.width - this.borderSize * 2 + "px";
                    events[i].style.height = this.widgetContentHeight - this.borderSize * 2 + "px";
                }
            }
            this.useGeolocation();
        }
    }, {
        key: "needToUpdate",
        value: function needToUpdate(newTheme, oldTheme) {
            var forCheck = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

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
                    style.setAttribute("id", "widget-theme-" + this.widget.config.theme);
                    style.textContent = this.responseText;
                    document.getElementsByTagName("head")[0].appendChild(style);
                } else {
                    //alert("theme wasn't loaded");
                    // console.log("theme wasn't loaded");
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
        key: "resetReduceParamsOrder",
        value: function resetReduceParamsOrder() {
            this.reduceParamsOrder = 0;
        }
    }, {
        key: "reduceParamsAndReloadEvents",
        value: function reduceParamsAndReloadEvents() {
            var eventReqAttrs = {},
                reduceParamsList = [['classificationName'], ['city'], ['countryCode'], ['source'], ['startDateTime', 'endDateTime', 'country'], ['radius'], ['postalCode', 'latlong'], ['attractionId'], ['promoterId'],
            // ['segmentId'],
            ['venueId'], ['keyword'], ['size']];

            // make copy of params
            for (var key in this.eventReqAttrs) {
                eventReqAttrs[key] = this.eventReqAttrs[key];
            }

            if (!this.reduceParamsOrder) this.reduceParamsOrder = 0;
            if (reduceParamsList.length > this.reduceParamsOrder) {
                for (var item in reduceParamsList) {
                    if (this.reduceParamsOrder >= item) {
                        for (var i in reduceParamsList[item]) {
                            delete eventReqAttrs[reduceParamsList[item][i]];
                        }
                    }
                }

                if (this.reduceParamsOrder === 0) this.showMessage("No results were found.<br/>Here other options for you.");
                this.reduceParamsOrder++;
                this.makeRequest(this.eventsLoadingHandler, this.apiUrl, eventReqAttrs);
            } else {
                // We haven't any results
                this.showMessage("No results were found.", true);
                this.reduceParamsOrder = 0;
            }
        }
    }, {
        key: "setMarkers",
        value: function setMarkers(map, markers) {

            var infowindow = new google.maps.InfoWindow({
                content: " "
            });

            var image = {
                url: 'https://ticketmaster-api-staging.github.io/assets/widgets/1.0.0/img/marker.svg',
                size: new google.maps.Size(22, 32),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(22, 32)
            };

            var imageActive = {
                url: 'https://ticketmaster-api-staging.github.io/assets/widgets/1.0.0/img/marker-active.svg',
                size: new google.maps.Size(22, 32),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(22, 32)
            };

            for (var i = 0; i < markers.length; i++) {
                var sites = markers[i];
                if (sites !== undefined) {
                    var siteLatLng = new google.maps.LatLng(sites[1], sites[2]);
                    var marker = new google.maps.Marker({
                        position: siteLatLng,
                        map: map,
                        icon: image,
                        title: sites[0],
                        zIndex: sites[3],
                        html: sites[4]
                    });
                }
                google.maps.event.addListener(marker, "click", function () {
                    infowindow.setContent(this.html);
                    infowindow.open(map, this);
                });
                google.maps.event.addListener(marker, 'mouseover', function () {
                    this.setIcon(imageActive);
                });
                google.maps.event.addListener(marker, 'mouseout', function () {
                    this.setIcon(image);
                });
            }
        }
    }, {
        key: "eventsLoadingHandler",
        value: function eventsLoadingHandler() {
            var widget = this.widget;
            var markers = [];
            widget.clearEvents(); // Additional clearing after each loading
            if (this && this.readyState == XMLHttpRequest.DONE) {
                if (this.status == 200) {
                    widget.events = JSON.parse(this.responseText);
                    if (widget.events.length) {

                        var myLatLng = { lat: 34.0390107, lng: -118.2672801 };

                        var map = new google.maps.Map(widget.widgetRoot.firstChild.firstChild, {
                            zoom: 4,
                            center: myLatLng,
                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                            mapTypeControl: false,
                            panControl: false,
                            streetViewControl: false,
                            zoomControlOptions: {
                                position: google.maps.ControlPosition.RIGHT_CENTER
                            }
                        });

                        var latlngbounds = new google.maps.LatLngBounds();

                        widget.groupEventsByName.call(widget);

                        for (var e = 0; e < widget.events.length; e++) {

                            if (widget.events[e].location !== undefined) {
                                var place = '';
                                var address = '';
                                var date = widget.formatDate({
                                    day: widget.events[e].date.day,
                                    time: widget.events[e].date.time
                                });
                                if (widget.events[e].address.hasOwnProperty('name')) {
                                    place = widget.events[e].address.name + ', ';
                                } else {
                                    place = '';
                                }
                                if (widget.events[e].address.hasOwnProperty('line1')) {
                                    address = widget.events[e].address.line1;
                                } else {
                                    address = '';
                                }

                                var buyBtn = '';
                                if (widget.isUniverseUrl(widget.events[e].url) != false) buyBtn = '<a class="buybtn" href="' + widget.events[e].url + '">BUY NOW</a>';

                                markers[e] = [widget.events[e].name, widget.events[e].location.lat, widget.events[e].location.lng, e, '<div class="infowindow" style="width:220px!important;padding-right:5px!important;line-height:normal;overflow:auto;"><a class="an" href="' + widget.events[e].url + '"><span class="img" style="background:url(' + widget.events[e].img + ') center center no-repeat"></span><span class="name">' + widget.events[e].name + '</span></a>' + buyBtn + '<div class="dateplace"><span class="date">' + date + '</span><span class="place">' + place + address + '</span></div></div>'];
                                latlngbounds.extend(new google.maps.LatLng(widget.events[e].location.lat, widget.events[e].location.lng));
                            }
                        }
                        map.fitBounds(latlngbounds);

                        widget.setMarkers(map, markers);

                        widget.resetReduceParamsOrder();
                        if (widget.hideMessageWithoutDelay) widget.hideMessage();else widget.hideMessageWithDelay(widget.hideMessageDelay);
                    } else {
                        widget.reduceParamsAndReloadEvents.call(widget);
                    }
                } else if (this.status == 400) {
                    widget.reduceParamsAndReloadEvents.call(widget);
                    console.log('There was an error 400');
                } else {
                    widget.reduceParamsAndReloadEvents.call(widget);
                    console.log('something else other than 200 was returned');
                }
            }
        }
    }, {
        key: "getImageForEvent",
        value: function getImageForEvent(images) {
            var imgWidth = void 0;
            var idx = void 0;
            images.forEach(function (img, i) {
                if (i == 0) imgWidth = img.width;
                if (imgWidth > img.width) {
                    imgWidth = img.width;
                    idx = i;
                }
            });
            return idx === undefined ? '' : images[idx].url;
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
                    currentEvent.url = eventsSet[key].url;
                    currentEvent.name = eventsSet[key].name;

                    /* Change URL [START] */
                    var parser = document.createElement("a");
                    parser.href = currentEvent.url;
                    var expr = "/ticketmaster.evyy.net/";
                    if (parser.href.match(expr) !== null) {
                        var changeURL = parser.pathname.split('/');
                        changeURL[3] = '330564';
                        currentEvent.url = parser.origin + changeURL.join('/') + parser.search + parser.hash;
                    }
                    /* Change URL [END] */

                    currentEvent.date = {
                        day: eventsSet[key].dates.start.localDate,
                        time: eventsSet[key].dates.start.localTime
                    };

                    if (eventsSet[key].hasOwnProperty('_embedded') && eventsSet[key]._embedded.hasOwnProperty('venues')) {
                        var venue = eventsSet[key]._embedded.venues[0];
                        if (venue) {
                            if (venue.address) currentEvent.address = venue.address;

                            if (venue.name) {
                                if (!currentEvent.address) currentEvent.address = {};
                                currentEvent.address.name = venue.name;
                            }

                            if (venue.location) {
                                currentEvent.location = {
                                    lat: parseFloat(venue.location.latitude),
                                    lng: parseFloat(venue.location.longitude)
                                };
                            }
                        }
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
            var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.apiUrl;
            var attrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "GET";

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
        key: "initPretendedLink",
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
                el.addEventListener('touchstart', function () {
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
        key: "addBuyButton",
        value: function addBuyButton(domNode, url) {
            if (this.isListView) {
                var _urlValid = this.isUniversePluginInitialized && this.isUniverseUrl(url) || this.isTMPluginInitialized && this.isAllowedTMEvent(url);
                if (!_urlValid) url = '';
                var buyBtn = document.createElement("a");
                buyBtn.appendChild(document.createTextNode('BUY NOW'));
                buyBtn.classList.add("event-buy-btn");
                buyBtn.target = '_blank';
                buyBtn.href = url;
                buyBtn.setAttribute('onclick', "ga('send', 'event', 'DiscoveryClickBuyButton', 'click');");
                domNode.appendChild(buyBtn);
            }
        }
    }, {
        key: "createDOMItem",
        value: function createDOMItem(itemConfig) {
            var medWrapper = document.createElement("div");
            medWrapper.classList.add("event-content-wraper");

            var event = document.createElement("li");
            event.classList.add("event-wrapper");
            event.style.height = this.widgetContentHeight - this.borderSize * 2 + "px";
            event.style.width = this.config.width - this.borderSize * 2 + "px";

            this.createBackgroundImage(event, itemConfig.img);

            var nameContent = document.createTextNode(itemConfig.name),
                name = document.createElement("span");
            name.classList.add("event-name");
            name.appendChild(nameContent);
            this.initPretendedLink(name, itemConfig.url, true);
            name.setAttribute('onclick', "ga('send', 'event', 'DiscoveryClickeventName_theme=" + this.config.theme + "_width=" + this.config.width + "_height=" + this.config.height + "_color_scheme=" + this.config.colorscheme + "', 'click', '" + itemConfig.url + "');");
            /* name.setAttribute('onclick', "ga('send', 'event', 'DiscoveryClickeventName', 'click', '" + itemConfig.url + "');"); */
            medWrapper.appendChild(name);

            this.addBuyButton(medWrapper, itemConfig.url);

            var dateTimeContent = document.createTextNode(this.formatDate(itemConfig.date)),
                dateTime = document.createElement("span");
            dateTime.classList.add("event-date", "centered-logo");
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

            var period = period.toLowerCase(),
                firstDay,
                lastDay;

            if (period == "year") {
                // firstDay = new Date( new Date(new Date()).toISOString() );
                // lastDay = new Date( new Date(new Date().valueOf()+24*365*60*60*1000).toISOString() );
                firstDay = new Date().toISOString().slice(0, 19) + 'Z';
                lastDay = new Date(new Date().valueOf() + 24 * 365 * 60 * 60 * 1000).toISOString().slice(0, 19) + 'Z';
            } else if (period == "month") {
                // firstDay = new Date( new Date(new Date()).toISOString() );
                // lastDay = new Date( new Date(new Date().valueOf()+24*31*60*60*1000).toISOString() );
                firstDay = new Date().toISOString().slice(0, 19) + 'Z';
                lastDay = new Date(new Date().valueOf() + 24 * 31 * 60 * 60 * 1000).toISOString().slice(0, 19) + 'Z';
            } else if (period == "week") {
                // firstDay = new Date( new Date(new Date()).toISOString() );
                // lastDay = new Date( new Date(new Date().valueOf()+24*7*60*60*1000).toISOString() );
                firstDay = new Date().toISOString().slice(0, 19) + 'Z';
                lastDay = new Date(new Date().valueOf() + 24 * 7 * 60 * 60 * 1000).toISOString().slice(0, 19) + 'Z';
            } else {
                // firstDay = new Date( new Date(new Date()).toISOString() );
                // lastDay = new Date( new Date(new Date().valueOf()+24*60*60*1000).toISOString() );
                firstDay = new Date().toISOString().slice(0, 19) + 'Z';
                lastDay = new Date(new Date().valueOf() + 24 * 60 * 60 * 1000).toISOString().slice(0, 19) + 'Z';
            }

            // return [this.toShortISOString(firstDay), this.toShortISOString(lastDay)];
            return [firstDay, lastDay];
        }
    }]);

    return TicketmasterMapWidget;
}();

var widgetsMap = [];
(function () {
    var widgetContainers = document.querySelectorAll("div[w-type='map']");
    for (var i = 0; i < widgetContainers.length; ++i) {
        widgetsMap.push(new TicketmasterMapWidget(widgetContainers[i]));
    }
})();

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-78315612-1', 'auto');
ga('send', 'pageview');

if (true) {
    module.exports = { TicketmasterMapWidget: TicketmasterMapWidget, widgetsMap: widgetsMap };
}

/***/ })
/******/ ]);
//# sourceMappingURL=main-widget.js.map