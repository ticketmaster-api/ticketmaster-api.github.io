"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TicketmasterCalendarWidget = function () {
    _createClass(TicketmasterCalendarWidget, [{
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
            /* return this.widgetHeight - (this.isListView || this.isSimpleProportionM ? 0 : 39) || 600; */
            return this.widgetHeight - 70;
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
            return "http://ticketmaster-api-staging.github.io/products-and-docs/widgets/calendar/1.0.0/theme/";
        }
    }, {
        key: "portalUrl",
        get: function get() {
            return "http://ticketmaster-api-staging.github.io/";
        }
    }, {
        key: "logoUrl",
        get: function get() {
            return "http://www.ticketmaster.com/";
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
        key: "geocodeUrl",
        get: function get() {
            return "https://maps.googleapis.com/maps/api/geocode/json";
        }
    }, {
        key: "updateExceptions",
        get: function get() {
            return ["width", "height", "border", "borderradius", "colorscheme", "layout", "affiliateid", "propotion", "googleapikey"];
        }
    }, {
        key: "sliderDelay",
        get: function get() {
            return 5000;
        }
    }, {
        key: "sliderRestartDelay",
        get: function get() {
            return 5000;
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
            var attrs = {},
                params = [{
                attr: 'tmapikey',
                verboseName: 'apikey'
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
                attr: 'classificationid',
                verboseName: 'classificationId'
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
                attr: 'segmentid',
                verboseName: 'segmentId'
            }];

            for (var i in params) {
                var item = params[i];
                if (this.isConfigAttrExistAndNotEmpty(item.attr)) attrs[item.verboseName] = this.config[item.attr];
            }

            // Only one allowed at the same time
            if (this.config.latlong) {
                attrs.latlong = this.config.latlong;
            } else {
                if (this.isConfigAttrExistAndNotEmpty("postalcode")) attrs.postalCode = this.config.postalcode;
            }

            if (this.isConfigAttrExistAndNotEmpty("period")) {
                var period = this.getDateFromPeriod(this.config.period);
                attrs.startDateTime = period[0];
                attrs.endDateTime = period[1];
            }

            return attrs;
        }
    }]);

    function TicketmasterCalendarWidget(root) {
        var _this = this;

        _classCallCheck(this, TicketmasterCalendarWidget);

        if (!root) return;
        this.widgetRoot = root;

        this.tabsRootContainer = document.createElement("div");
        this.tabsRootContainer.classList.add("tabs");
        this.tabsRootContainer.innerHTML = '<span class="tb active">Day</span><span class="tb">Week</span><span class="tb">Month</span><span class="tb">Year</span>';
        this.widgetRoot.appendChild(this.tabsRootContainer);

        this.tabsRootContainer = document.createElement("div");
        this.tabsRootContainer.classList.add("tabs-container");
        this.widgetRoot.appendChild(this.tabsRootContainer);

        this.tab1RootContainer = document.createElement("div");
        this.tab1RootContainer.classList.add("tab");
        this.tab1RootContainer.classList.add("active");
        this.tabsRootContainer.appendChild(this.tab1RootContainer);

        var leftSelector = new SelectorControls(this.tab1RootContainer, 'sliderLeftSelector', this.getCurrentWeek(), 'period', this.update.bind(this));
        var RightSelector = new SelectorControls(this.tab1RootContainer, 'sliderRightSelector', '<span class="selector-title">All Events</span><span class="selector-content" tabindex="-1"><span class="active" w-classificationId="">All Events</span><span w-classificationId="KZFzniwnSyZfZ7v7na">Arts & Theatre</span><span w-classificationId="KZFzniwnSyZfZ7v7nn">Film</span><span w-classificationId="KZFzniwnSyZfZ7v7n1">Miscellaneous</span><span w-classificationId="KZFzniwnSyZfZ7v7nJ">Music</span><span w-classificationId="KZFzniwnSyZfZ7v7nE">Sports</span></span>', 'classificationId', this.update.bind(this));

        this.tab2RootContainer = document.createElement("div");
        this.tab2RootContainer.classList.add("tab");
        this.tab2RootContainer.innerHTML = '<div id="weekSсheduler">';
        this.tabsRootContainer.appendChild(this.tab2RootContainer);

        var leftSelector1 = new SelectorControls(this.tab2RootContainer, 'sliderLeftSelector', '<span class="selector-title">Jun 12 - Jun 18</span><span class="selector-content" tabindex="-1"><span class="active" w-period="">Jun 12 - Jun 18</span><span w-period="">Jun 19 - Jun 25</span><span w-period="">Jun 26 - Jun 30</span></span>', 'period', this.update.bind(this));
        var RightSelector1 = new SelectorControls(this.tab2RootContainer, 'sliderRightSelector', '<span class="selector-title">All Events</span><span class="selector-content" tabindex="-1"><span class="active" w-classificationId="">All Events</span><span w-classificationId="KZFzniwnSyZfZ7v7na">Arts & Theatre</span><span w-classificationId="KZFzniwnSyZfZ7v7nn">Film</span><span w-classificationId="KZFzniwnSyZfZ7v7n1">Miscellaneous</span><span w-classificationId="KZFzniwnSyZfZ7v7nJ">Music</span><span w-classificationId="KZFzniwnSyZfZ7v7nE">Sports</span></span>', 'classificationId', this.update.bind(this));

        this.eventLogoBox = document.createElement("div");
        this.eventLogoBox.classList.add("event-logo-box-c");
        this.eventLogoBox.innerHTML = '<a class="event-logo-c" target="_blank" href="http://www.ticketmaster.com/">Powered by:</a>';
        this.tab2RootContainer.appendChild(this.eventLogoBox);

        this.tab3RootContainer = document.createElement("div");
        this.tab3RootContainer.classList.add("tab");
        this.tab3RootContainer.innerHTML = "This is MONTH TAB";
        this.tabsRootContainer.appendChild(this.tab3RootContainer);

        this.tab4RootContainer = document.createElement("div");
        this.tab4RootContainer.classList.add("tab");
        this.tab4RootContainer.innerHTML = "This is YEAR TAB";
        this.tabsRootContainer.appendChild(this.tab4RootContainer);

        this.eventsRootContainer = document.createElement("div");
        this.eventsRootContainer.classList.add("events-root-container");
        this.tab1RootContainer.appendChild(this.eventsRootContainer);

        this.eventsRoot = document.createElement("ul");
        this.eventsRoot.classList.add("events-root");
        this.eventsRootContainer.appendChild(this.eventsRoot);

        this.config = this.widgetRoot.attributes;

        if (this.config.theme !== null && !document.getElementById("widget-theme-" + this.config.theme)) {
            this.makeRequest(this.styleLoadingHandler, this.themeUrl + this.config.theme + ".css");
        }

        this.eventsRootContainer.classList.remove("border");
        if (this.config.border) {
            this.eventsRootContainer.classList.add("border");
        }

        this.widgetRoot.style.height = this.widgetHeight + "px";
        this.widgetRoot.style.width = this.config.width + "px";

        this.eventsRootContainer.style.height = this.widgetContentHeight + "px";
        this.eventsRootContainer.style.width = this.config.width + "px";
        this.eventsRootContainer.style.borderWidth = "0";
        this.widgetRoot.style.borderRadius = this.config.borderradius + "px";
        this.widgetRoot.style.borderWidth = this.borderSize + "px";

        //this.clear();

        this.AdditionalElements();

        this.getCoordinates(function () {
            _this.makeRequest(_this.eventsLoadingHandler, _this.apiUrl, _this.eventReqAttrs);
        });

        /*plugins for 'buy button'*/
        this.embedUniversePlugin();
        this.embedTMPlugin();

        this.initBuyBtn();

        this.initMessage();

        if (!this.isListView) this.initSliderControls();

        /* if (!this.isListView) this.initEventCounter(); */

        if (this.isListView) this.addScroll();
    }

    _createClass(TicketmasterCalendarWidget, [{
        key: "getCurrentWeek",
        value: function getCurrentWeek() {
            var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var content = '<span class="selector-title">';
            var today = new Date();
            var todayTmp = new Date();
            content += monthNames[today.getMonth()] + ' ' + today.getDate();
            content += '</span>';
            content += '<span class="selector-content" tabindex="-1">';

            for (var d = 0; d <= 6; d++) {
                todayTmp.setDate(today.getDate() + d);
                if (d == 0) content += "<span class=\"active\" w-period=\"" + todayTmp + "\">";else content += "<span w-period=\"" + todayTmp + "\">";
                content += monthNames[todayTmp.getMonth()] + ' ' + todayTmp.getDate();
                content += '</span>';
            }
            content += '</span>';
            return content;
        }
    }, {
        key: "getCoordinates",
        value: function getCoordinates(cb) {
            var widget = this;

            function parseGoogleGeocodeResponse() {
                if (this && this.readyState === XMLHttpRequest.DONE) {
                    var latlong = '',
                        results = null,
                        countryShortName = '';
                    if (this.status === 200) {
                        var response = JSON.parse(this.responseText);
                        if (response.status === 'OK' && response.results.length) {
                            // Filtering only white list countries
                            results = response.results.filter(function (item) {
                                return widget.countriesWhiteList.filter(function (elem) {
                                    return elem === item.address_components[item.address_components.length - 1].long_name;
                                }).length > 0;
                            });

                            if (results.length) {
                                // sorting results by country name
                                results.sort(function (f, g) {
                                    var a = f.address_components[f.address_components.length - 1].long_name;
                                    var b = g.address_components[g.address_components.length - 1].long_name;
                                    if (a > b) {
                                        return 1;
                                    }
                                    if (a < b) {
                                        return -1;
                                    }
                                    return 0;
                                });

                                // Use first item if multiple results was found in one country or in different
                                var geometry = results[0].geometry;
                                countryShortName = results[0].address_components[results[0].address_components.length - 1].short_name;

                                // If multiple results without country try to find USA as prefer value
                                if (!widget.config.country) {
                                    for (var i in results) {
                                        var result = results[i];
                                        if (result.address_components) {
                                            var country = result.address_components[result.address_components.length - 1];
                                            if (country) {
                                                if (country.short_name === 'US') {
                                                    countryShortName = 'US';
                                                    geometry = result.geometry;
                                                }
                                            }
                                        }
                                    }
                                }

                                if (geometry) {
                                    if (geometry.location) {
                                        latlong = geometry.location.lat + "," + geometry.location.lng;
                                    }
                                }
                            } else {
                                results = null;
                            }
                        }
                    }
                    // Used in builder
                    if (widget.onLoadCoordinate) widget.onLoadCoordinate(results, countryShortName);
                    widget.config.latlong = latlong;
                    cb(widget.config.latlong);
                }
            }

            if (this.isConfigAttrExistAndNotEmpty('postalcode')) {
                var args = { components: "postal_code:" + widget.config.postalcode };
                if (widget.config.googleapikey) args.key = widget.config.googleapikey;
                if (this.config.country) args.components += "|country:" + this.config.country;
                this.makeRequest(parseGoogleGeocodeResponse, this.geocodeUrl, args);
            } else {
                // Used in builder
                if (widget.onLoadCoordinate) widget.onLoadCoordinate(null);
                widget.config.latlong = '';
                widget.config.country = '';
                cb(widget.config.latlong);
            }
        }
    }, {
        key: "initBuyBtn",
        value: function initBuyBtn() {
            var _this2 = this;

            this.buyBtn = document.createElement("a");
            this.buyBtn.appendChild(document.createTextNode('BUY NOW'));
            this.buyBtn.classList.add("event-buy-btn");
            this.buyBtn.classList.add("main-btn");
            this.buyBtn.target = '_blank';
            this.buyBtn.href = '';
            this.buyBtn.setAttribute('onclick', "ga('send', 'event', 'DiscoveryClickBuyButton', 'click');");
            this.buyBtn.addEventListener('click', function (e) {
                e.preventDefault(); /*used in plugins for 'buy button'*/
                _this2.stopAutoSlideX();
                //console.log(this.config.affiliateid)
            });
            this.eventsRootContainer.appendChild(this.buyBtn);
        }
    }, {
        key: "setBuyBtnUrl",
        value: function setBuyBtnUrl() {
            if (this.buyBtn) {
                var event = this.eventsGroups[this.currentSlideX][this.currentSlideY],
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
            return url.match(/universe.com/g) || url.match(/uniiverse.com/g);
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
    }, {
        key: "initMessage",
        value: function initMessage() {
            var _this3 = this;

            this.messageDialog = document.createElement('div');
            this.messageDialog.classList.add("event-message");
            this.messageContent = document.createElement('div');
            this.messageContent.classList.add("event-message__content");

            var messageClose = document.createElement('div');
            messageClose.classList.add("event-message__btn");
            messageClose.addEventListener("click", function () {
                _this3.hideMessage();
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
            var _this4 = this;

            if (this.messageTimeout) clearTimeout(this.messageTimeout); // Clear timeout if this method was called before
            this.messageTimeout = setTimeout(function () {
                _this4.hideMessage();
            }, delay);
        }
    }, {
        key: "hideMessage",
        value: function hideMessage() {
            if (this.messageTimeout) clearTimeout(this.messageTimeout); // Clear timeout and hide message immediately.
            this.messageDialog.classList.remove("event-message-visible");
        }
    }, {
        key: "AdditionalElements",
        value: function AdditionalElements() {
            /*
            var legalNoticeContent = document.createTextNode('Legal Notice'),
                legalNotice = document.createElement("a");
            legalNotice.appendChild(legalNoticeContent);
            legalNotice.classList.add("legal-notice");
            legalNotice.target = '_blank';
            legalNotice.href = this.legalNoticeUrl;
            this.widgetRoot.appendChild(legalNotice);
            */

            var logo = document.createElement('a');
            logo.classList.add("event-logo");
            logo.target = '_blank';
            logo.href = this.logoUrl;
            logo.innerHTML = 'Powered by:';

            var logoBox = document.createElement('div');
            logoBox.classList.add("event-logo-box");
            logoBox.appendChild(logo);
            this.eventsRootContainer.appendChild(logoBox);

            var question = document.createElement('a');
            question.classList.add("event-question");
            question.target = '_blank';
            question.href = this.questionUrl;
            this.widgetRoot.appendChild(question);
        }
    }, {
        key: "hideSliderControls",
        value: function hideSliderControls() {
            this.prevEventX.classList.add(this.controlHiddenClass);
            this.nextEventX.classList.add(this.controlHiddenClass);
            this.prevEventY.classList.add(this.controlHiddenClass);
            this.nextEventY.classList.add(this.controlHiddenClass);
        }
    }, {
        key: "toggleControlsVisibility",
        value: function toggleControlsVisibility() {
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
            if (this.eventsGroups.length) {
                if (this.eventsGroups[this.currentSlideX].length > 1) {
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
            var _this5 = this;

            this.stopAutoSlideX();
            this.sliderTimeout = setTimeout(function () {
                _this5.runAutoSlideX();
            }, this.sliderRestartDelay);
            if (isDirectionX) this.goToSlideX(slideIndex);else this.goToSlideY(slideIndex);
        }
    }, {
        key: "goToSlideX",
        value: function goToSlideX(slideIndex) {
            if (this.currentSlideX === slideIndex) return;
            this.currentSlideY = 0;
            this.currentSlideX = slideIndex;
            this.eventsRoot.style.marginLeft = "-" + this.currentSlideX * 100 + "%";
            this.toggleControlsVisibility();
            this.setEventsCounter();
            this.setBuyBtnUrl();
        }
    }, {
        key: "goToSlideY",
        value: function goToSlideY(slideIndex) {
            if (this.currentSlideY === slideIndex) return;
            this.currentSlideY = slideIndex;
            var eventGroup = this.eventsRoot.getElementsByClassName("event-group-" + this.currentSlideX);
            if (eventGroup.length) {
                eventGroup = eventGroup[0];
                eventGroup.style.marginTop = "-" + this.currentSlideY * (this.widgetContentHeight - this.borderSize * 2) + "px";
                this.toggleControlsVisibility();
                this.setBuyBtnUrl();
            }
        }
    }, {
        key: "runAutoSlideX",
        value: function runAutoSlideX() {
            var _this6 = this;

            if (this.slideCountX > 1) {
                this.sliderInterval = setInterval(function () {
                    var slideIndex = 0;
                    if (_this6.slideCountX - 1 > _this6.currentSlideX) slideIndex = _this6.currentSlideX + 1;
                    _this6.goToSlideX(slideIndex);
                }, this.sliderDelay);
            }
        }
    }, {
        key: "stopAutoSlideX",
        value: function stopAutoSlideX() {
            if (this.sliderTimeout) clearTimeout(this.sliderTimeout);
            if (this.sliderInterval) clearInterval(this.sliderInterval);
        }
    }, {
        key: "initSliderControls",
        value: function initSliderControls() {
            var _this7 = this;

            this.currentSlideX = 0;
            this.currentSlideY = 0;
            this.slideCountX = 0;
            var coreCssClass = 'events_control';

            // left btn
            this.prevEventX = document.createElement("div");
            var prevEventXClass = [coreCssClass, coreCssClass + '-horizontal', coreCssClass + '-left', this.controlHiddenClass];
            for (var i in prevEventXClass) {
                this.prevEventX.classList.add(prevEventXClass[i]);
            }
            this.eventsRootContainer.appendChild(this.prevEventX);

            // right btn
            this.nextEventX = document.createElement("div");
            var nextEventXClass = [coreCssClass, coreCssClass + '-horizontal', coreCssClass + '-right', this.controlHiddenClass];
            for (var _i in nextEventXClass) {
                this.nextEventX.classList.add(nextEventXClass[_i]);
            }
            this.eventsRootContainer.appendChild(this.nextEventX);

            // top btn
            this.prevEventY = document.createElement("div");
            var prevEventYClass = [coreCssClass, coreCssClass + '-vertical', coreCssClass + '-top', this.controlHiddenClass];
            for (var _i2 in prevEventYClass) {
                this.prevEventY.classList.add(prevEventYClass[_i2]);
            }
            this.eventsRootContainer.appendChild(this.prevEventY);

            // bottom btn
            this.nextEventY = document.createElement("div");
            var nextEventYClass = [coreCssClass, coreCssClass + '-vertical', coreCssClass + '-bottom', this.controlHiddenClass];
            for (var _i3 in nextEventYClass) {
                this.nextEventY.classList.add(nextEventYClass[_i3]);
            }
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

                for (var event in transitions) {
                    if (el.style[event] !== undefined) return transitions[event];
                }
            }

            var transitionEvent = whichTransitionEvent();
            transitionEvent && this.eventsRoot.addEventListener(transitionEvent, function (e) {
                if (_this7.eventsRoot !== e.target) return;
                var eventGroup = _this7.eventsRoot.getElementsByClassName("event-group");
                // Reset all groups. We don't know what event group was visible before.
                for (var _i4 = 0; eventGroup.length > _i4; _i4++) {
                    eventGroup[_i4].style.marginTop = 0;
                }
            });

            // Arrows
            this.prevEventX.addEventListener("click", function () {
                _this7.prevSlideX();
            });

            this.nextEventX.addEventListener("click", function () {
                _this7.nextSlideX();
            });

            this.prevEventY.addEventListener("click", function () {
                _this7.prevSlideY();
            });

            this.nextEventY.addEventListener("click", function () {
                _this7.nextSlideY();
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
                if (_this7.config.theme !== "listview") {
                    if (e.target.className != 'event-logo' && e.target.className != 'event-question') e.preventDefault();
                } /*used in plugins for 'buy button'*/
                handleTouchStart.call(_this7, e);
            }, false);
            this.eventsRootContainer.addEventListener('touchmove', function (e) {
                if (_this7.config.theme !== "listview") {
                    if (e.target.className != 'event-logo' && e.target.className != 'event-question') e.preventDefault();
                }
                handleTouchMove.call(_this7, e);
            }, false);
        }
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
            this.toggleControlsVisibility();
            this.setBuyBtnUrl();
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
            var _this8 = this;

            var oldTheme = this.config.constructor();
            for (var attr in this.config) {
                if (this.config.hasOwnProperty(attr)) oldTheme[attr] = this.config[attr];
            }

            this.config = this.widgetRoot.attributes;

            this.widgetRoot.style.height = this.widgetHeight + "px";
            this.widgetRoot.style.width = this.config.width + "px";
            this.widgetRoot.style.borderRadius = this.config.borderradius + "px";
            this.widgetRoot.style.borderWidth = this.borderSize + "px";
            /*
            this.eventsRootContainer.style.height = `${this.widgetContentHeight}px`;
            this.eventsRootContainer.style.width  = `${this.config.width}px`;
            this.eventsRootContainer.style.borderRadius = `${this.config.borderradius}px`;
            this.eventsRootContainer.style.borderWidth = `${this.borderSize}px`;
            */

            this.getCurrentWeek();

            this.eventsRootContainer.classList.remove("border");
            if (this.config.hasOwnProperty("border")) {
                this.eventsRootContainer.classList.add("border");
            }

            if (this.needToUpdate(this.config, oldTheme, this.updateExceptions)) {
                this.clear();

                /*
                if( this.themeModificators.hasOwnProperty( this.widgetConfig.theme ) ) {
                    this.themeModificators[ this.widgetConfig.theme ]();
                }
                */

                this.getCoordinates(function () {
                    _this8.makeRequest(_this8.eventsLoadingHandler, _this8.apiUrl, _this8.eventReqAttrs);
                });
            } else {
                var events = this.eventsRoot.getElementsByClassName("event-wrapper");
                for (var i in events) {
                    if (events.hasOwnProperty(i) && events[i].style !== undefined) {
                        events[i].style.width = this.config.width + "px";
                        events[i].style.height = this.widgetContentHeight + "px";
                    }
                }
                this.goToSlideY(0);
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
                    style.setAttribute("id", "widget-theme-" + this.widget.config.theme);
                    style.textContent = this.responseText;
                    document.getElementsByTagName("head")[0].appendChild(style);
                } else {
                    //alert("theme wasn't loaded");
                    console.log("theme wasn't loaded");
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
        key: "resetReduceParamsOrder",
        value: function resetReduceParamsOrder() {
            this.reduceParamsOrder = 0;
        }
    }, {
        key: "reduceParamsAndReloadEvents",
        value: function reduceParamsAndReloadEvents() {
            var eventReqAttrs = {},
                reduceParamsList = [['startDateTime', 'endDateTime', 'country'], ['radius'], ['postalCode', 'latlong'], ['classificationId'], ['attractionId'], ['promoterId'], ['segmentId'], ['venueId'], ['keyword'], ['size']];

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
                this.hideSliderControls();
            }
        }
    }, {
        key: "eventsLoadingHandler",
        value: function eventsLoadingHandler() {
            var widget = this.widget;
            widget.clearEvents(); // Additional clearing after each loading
            if (this && this.readyState == XMLHttpRequest.DONE) {
                if (this.status == 200) {
                    widget.events = JSON.parse(this.responseText);

                    if (widget.events.length) {
                        widget.groupEventsByName.call(widget);

                        widget.eventsGroups.map(function (group, i) {
                            if (group.length === 1) widget.publishEvent(group[0]);else widget.publishEventsGroup.call(widget, group, i);
                        });

                        if (!widget.isListView) widget.initSlider();
                        widget.setEventsCounter();
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
        key: "publishEventsGroup",
        value: function publishEventsGroup(group, index) {
            var _this9 = this;

            var groupNodeWrapper = document.createElement("li");
            groupNodeWrapper.classList.add("event-wrapper");
            groupNodeWrapper.classList.add("event-group-wrapper");
            /*
            groupNodeWrapper.style.width  = `${this.config.width - this.borderSize * 2}px`;
            groupNodeWrapper.style.height = `${this.widgetContentHeight - this.borderSize * 2}px`;
            */
            groupNodeWrapper.style.width = this.config.width + "px";
            groupNodeWrapper.style.height = this.widgetContentHeight + "px";

            var groupNode = document.createElement("ul");
            groupNode.classList.add("event-group");
            groupNode.classList.add("event-group-" + index);

            group.map(function (event) {
                _this9.publishEvent(event, groupNode);
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
                height = this.widgetContentHeight;

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
                    currentEvent.url = eventsSet[key].url;
                    currentEvent.name = eventsSet[key].name;

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
            }
            return el;
        }
    }, {
        key: "createBackgroundImage",
        value: function createBackgroundImage(event, img) {
            if (!this.isListView) {
                var image = document.createElement("span");
                image.classList.add("bg-cover");
                image.style.backgroundImage = "url('" + img + "')";
                event.appendChild(image);
            }
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

            /* event.style.height = `${this.widgetContentHeight - this.borderSize * 2}px`;
            event.style.width  = `${this.config.width - this.borderSize * 2}px`;
            */

            event.style.height = this.widgetContentHeight + "px";
            event.style.width = this.config.width + "px";

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
    }, {
        key: "makeImageUrl",
        value: function makeImageUrl(id) {
            return "https://app.ticketmaster.com/discovery/v2/events/" + id + "/images.json";
        }

        /* Config block */

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

            /*
            var date = new Date(),
                period = period.toLowerCase(),
                firstDay, lastDay;
              if(period == "year" ){
                firstDay = new Date(date.getFullYear(),0,1);
                lastDay = new Date(date.getFullYear(),12,0);
            }
            else if(period == "month"){
                firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            }
            else if(period == "week"){
                var first = date.getDate() - date.getDay();
                var last = first + 6;
                firstDay = new Date(date.setDate(first));
                lastDay = new Date(date.setDate(last));
            } else {
                firstDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                lastDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            }
            */

            var firstDay = new Date();
            var lastDay = new Date();

            if (period != 'week') {
                firstDay = new Date(period);
                lastDay = new Date(period);
            }

            firstDay.setHours(0);lastDay.setHours(23);
            firstDay.setMinutes(0);lastDay.setMinutes(59);
            firstDay.setSeconds(0);lastDay.setSeconds(59);

            return [this.toShortISOString(firstDay), this.toShortISOString(lastDay)];
        }
    }]);

    return TicketmasterCalendarWidget;
}();

var TabsControls = function () {
    _createClass(TabsControls, [{
        key: "removeActiveTab",
        value: function removeActiveTab() {
            var tabs = document.querySelectorAll('.tb');
            Array.from(tabs).forEach(function (tab) {
                if (tab.classList.contains("active")) tab.classList.remove("active");
            });
            var tab = document.querySelectorAll('.tab');
            Array.from(tab).forEach(function (tb) {
                if (tb.classList.contains("active")) tb.classList.remove("active");
            });
        }
    }, {
        key: "selActiveTab",
        value: function selActiveTab(activeTab) {
            var nodeList = document.getElementsByClassName('tabs-container');
            nodeList[0].children[activeTab].classList.add('active');
        }
    }]);

    function TabsControls() {
        _classCallCheck(this, TabsControls);

        var self = this;
        var tabs = document.querySelectorAll('.tb');
        var tabsList = document.getElementsByClassName('tabs');
        Array.from(tabs).forEach(function (tab) {
            tab.addEventListener('click', function (e) {
                self.removeActiveTab();
                var index = Array.prototype.indexOf.call(tabsList[0].children, e.target);
                this.classList.add("active");
                self.selActiveTab(index);
            });
        });
    }

    return TabsControls;
}();

var SelectorControls = function SelectorControls(root, selectorClass, selectorContent, attribute, update) {
    _classCallCheck(this, SelectorControls);

    if (!root) return;
    this.SelectorRoot = root;
    this.SelectorClass = selectorClass;
    this.SelectorContent = selectorContent;
    this.SelectorContainer = document.createElement("div");
    this.SelectorContainer.classList.add(this.SelectorClass);
    this.SelectorContainer.innerHTML = this.SelectorContent;
    this.SelectorRoot.appendChild(this.SelectorContainer);

    this.selTitle = this.SelectorContainer.getElementsByTagName("span")[0];
    this.selContent = this.selTitle.nextElementSibling;

    this.selContent.addEventListener("click", function (e) {
        this.parentNode.getElementsByClassName('selector-title')[0].innerHTML = e.target.innerHTML;
        this.parentNode.getElementsByClassName('selector-title')[0].classList.remove('open');
        this.parentNode.getElementsByClassName('selector-content')[0].classList.remove('show');
        if (attribute == 'period') this.parentNode.parentNode.parentNode.parentNode.setAttribute('w-period', e.target.getAttribute('w-period'));
        if (attribute == 'classificationId') this.parentNode.parentNode.parentNode.parentNode.setAttribute('w-classificationId', e.target.getAttribute('w-classificationId'));
        update();
    });

    this.selTitle.addEventListener("click", function (e) {
        this.nextElementSibling.classList.add("show");
        if (this.classList.contains("open")) {
            this.classList.remove("open");
            this.nextElementSibling.classList.remove("show");
        } else {
            this.classList.add("open");
        }
        this.nextElementSibling.focus();
    }, false);

    this.selContent.addEventListener("blur", function (e) {
        var self = this;
        setTimeout(function () {
            self.classList.remove("show");
            self.previousElementSibling.classList.remove("open");
        }, 127);
    }, false);
};

var WeekScheduler = function () {
    _createClass(WeekScheduler, [{
        key: "addScroll",
        value: function addScroll() {
            (function (n, t) {
                function u(n) {
                    n.hasOwnProperty("data-simple-scrollbar") || Object.defineProperty(n, "data-simple-scrollbar", new SimpleScrollbar(n));
                }function e(n, i) {
                    function f(n) {
                        var t = n.pageY - u;u = n.pageY;r(function () {
                            i.el.scrollTop += t / i.scrollRatio;
                        });
                    }function e() {
                        n.classList.remove("ss-grabbed");t.body.classList.remove("ss-grabbed");t.removeEventListener("mousemove", f);t.removeEventListener("mouseup", e);
                    }var u;n.addEventListener("mousedown", function (i) {
                        return u = i.pageY, n.classList.add("ss-grabbed"), t.body.classList.add("ss-grabbed"), t.addEventListener("mousemove", f), t.addEventListener("mouseup", e), !1;
                    });
                }function i(n) {
                    for (this.target = n, this.bar = '<div class="ss-scroll">', this.wrapper = t.createElement("div"), this.wrapper.setAttribute("class", "ss-wrapper"), this.el = t.createElement("div"), this.el.setAttribute("class", "ss-content"), this.wrapper.appendChild(this.el); this.target.firstChild;) {
                        this.el.appendChild(this.target.firstChild);
                    }this.target.appendChild(this.wrapper);this.target.insertAdjacentHTML("beforeend", this.bar);this.bar = this.target.lastChild;e(this.bar, this);this.moveBar();this.el.addEventListener("scroll", this.moveBar.bind(this));this.el.addEventListener("mouseenter", this.moveBar.bind(this));this.target.classList.add("ss-container");
                }function f() {
                    for (var i = t.querySelectorAll("*[ss-container]"), n = 0; n < i.length; n++) {
                        u(i[n]);
                    }
                }var r = n.requestAnimationFrame || n.setImmediate || function (n) {
                    return setTimeout(n, 0);
                };i.prototype = { moveBar: function moveBar() {
                        var t = this.el.scrollHeight,
                            i = this.el.clientHeight,
                            n = this;this.scrollRatio = i / t;r(function () {
                            n.bar.style.cssText = "height:" + i / t * 100 + "%; top:" + n.el.scrollTop / t * 100 + "%;right:-" + (n.target.clientWidth - n.bar.clientWidth) + "px;";
                        });
                    } };t.addEventListener("DOMContentLoaded", f);i.initEl = u;i.initAll = f;n.SimpleScrollbar = i;
            })(window, document);
            // var scrollRoot = document.getElementsByClassName("ss")[0];
            var scrollRoot = document.querySelector('.ss');
            SimpleScrollbar.initEl(scrollRoot);
        }
    }, {
        key: "getJSON",
        value: function getJSON(handler) {
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
        key: "getWeekEventsHandler",
        value: function getWeekEventsHandler() {
            var widget = this.widget;
            var events = void 0;
            var weekEvents = [];
            if (this && this.readyState == XMLHttpRequest.DONE) {
                if (this.status == 200) {
                    events = JSON.parse(this.responseText);
                    // console.log(events._embedded.events);
                    events._embedded.events.forEach(function (item) {
                        // console.log(item);
                        weekEvents.push({
                            'name': item.name,
                            'date': item.dates.start.localDate,
                            'time': item.dates.start.localTime,
                            'place': item.venues[0].city + ' ' + item.venues[0].address,
                            'url': item.url
                        });
                    });

                    console.log(weekEvents);

                    var current = new Date();
                    var weekstart = current.getDate() - current.getDay();
                    var sunday = new Date(current.setDate(weekstart));
                    var currentSunday = sunday;
                    var daysDiv = '';
                    var currentDayClass = '';
                    var dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                    var now = new Date();
                    for (var i = 0; i <= 6; i++) {
                        var day = new Date(new Date(currentSunday).getTime() + i * 24 * 60 * 60 * 1000);
                        if (day.getDay() == now.getDay()) currentDayClass = ' active';else currentDayClass = '';
                        daysDiv += "<span class=\"d" + currentDayClass + "\">" + dayOfWeek[i] + " <span class=\"num\">" + day.getDate() + "</span></span>";
                    }
                    var zeroLead = '';
                    var timeTmp = '';
                    var monthTmp = '';
                    var timeDiv = '<div class="ss time-wrapper"><div class="ss-container time-holder">';
                    for (var _i5 = 13; _i5 <= 23; _i5++) {
                        if (_i5 <= 9) {
                            zeroLead = '0';
                            timeTmp = '0' + _i5 + ":00:00";
                        } else {
                            zeroLead = '';
                            timeTmp = _i5 + ":00:00";
                        }
                        timeDiv += "<div class=\"t t-" + _i5 + "\"><span class=\"tl\">" + zeroLead + _i5 + " : 00</span>";
                        for (var d = 0; d <= 6; d++) {
                            var dayTmp = new Date(new Date(currentSunday).getTime() + d * 24 * 60 * 60 * 1000);
                            if (parseInt(dayTmp.getMonth() + 1) <= 9) monthTmp = '0' + parseInt(dayTmp.getMonth() + 1);else monthTmp = dayTmp.getMonth() + 1;
                            var dateTmp = dayTmp.getFullYear() + '-' + monthTmp + '-' + dayTmp.getDate();
                            timeDiv += "<span class=\"d d-" + d + "\" w-date=\"" + dateTmp + "\" w-time=\"" + zeroLead + _i5 + ":00:00\">";

                            for (var e = 0, l = weekEvents.length; e < l; ++e) {
                                if (weekEvents[e].date == dateTmp && weekEvents[e].time == timeTmp) {
                                    timeDiv += '<span class="round">';
                                    timeDiv += '<span class="popup">';
                                    timeDiv += weekEvents[e].name;
                                    timeDiv += '</span>';
                                    timeDiv += '</span>';
                                }
                            }

                            timeDiv += '</span>';
                        }
                        timeDiv += "</div>";
                    }
                    timeDiv += "</div></div>";
                    daysDiv += timeDiv;
                    widget.weekdaysRootContainer.innerHTML = daysDiv;
                    widget.addScroll();
                } else if (this.status == 400) {
                    console.log('There was an error 400');
                } else {
                    console.log('something else other than 200 was returned');
                }
            }
        }
    }, {
        key: "startMonth",
        value: function startMonth() {
            this.getJSON(this.getWeekEventsHandler, this.apiUrl, this.eventReqAttrs);
        }
    }, {
        key: "apiUrl",
        get: function get() {
            return "https://app.ticketmaster.com/discovery/v2/events.json";
        }
    }, {
        key: "eventReqAttrs",
        get: function get() {
            var attrs = {},
                params = [{
                attr: 'tmapikey',
                verboseName: 'apikey'
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
                attr: 'classificationid',
                verboseName: 'classificationId'
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
                attr: 'segmentid',
                verboseName: 'segmentId'
            }];

            /*
            for(let i in params){
                let item = params[i];
                if(this.isConfigAttrExistAndNotEmpty(item.attr))
                    attrs[item.verboseName] = this.config[item.attr];
            }
              // Only one allowed at the same time
            if(this.config.latlong){
                attrs.latlong = this.config.latlong;
            }else{
                if(this.isConfigAttrExistAndNotEmpty("postalcode"))
                    attrs.postalCode = this.config.postalcode;
            }
              if(this.isConfigAttrExistAndNotEmpty("period")){
                let period = this.getDateFromPeriod(this.config.period);
                attrs.startDateTime = period[0];
                attrs.endDateTime = period[1];
            }
            */

            // return attrs;
            return {
                "apikey": "5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG",
                "size": "25",
                "radius": "25",
                "latlong": "34.0390107,-118.2672801",
                "startDateTime": "2016-06-12T00:00:00Z",
                "endDateTime": "2016-06-18T23:59:59Z"
            };
        }
    }]);

    function WeekScheduler(root) {
        _classCallCheck(this, WeekScheduler);

        if (!root) return;
        this.weekSchedulerRoot = root;
        this.weekdaysRootContainer = document.createElement("div");
        this.weekdaysRootContainer.classList.add("days");
        this.startMonth();
        this.weekSchedulerRoot.appendChild(this.weekdaysRootContainer);
    }

    return WeekScheduler;
}();

var widgetsCalendar = [];
(function () {
    var widgetContainers = document.querySelectorAll("div[w-type='calendar']");
    for (var i = 0; i < widgetContainers.length; ++i) {
        widgetsCalendar.push(new TicketmasterCalendarWidget(widgetContainers[i]));
    }
})();

var controls = new TabsControls();
var weekScheduler = new WeekScheduler(document.getElementById('weekSсheduler'));
//# sourceMappingURL=main-widget.js.map