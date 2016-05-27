"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CalendarWidget = function () {
    _createClass(CalendarWidget, [{
        key: "getDateFromPeriod",
        value: function getDateFromPeriod(period) {

            var date = new Date(),
                period = period.toLowerCase(),
                firstDay,
                lastDay;

            if (period == "year") {
                firstDay = new Date(date.getFullYear(), 0, 1);
                lastDay = new Date(date.getFullYear(), 12, 0);
            } else if (period == "month") {
                firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            } else if (period == "week") {
                var first = date.getDate() - date.getDay();
                var last = first + 6;
                firstDay = new Date(date.setDate(first));
                lastDay = new Date(date.setDate(last));
            } else {
                firstDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                lastDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            }

            firstDay.setHours(0);lastDay.setHours(23);
            firstDay.setMinutes(0);lastDay.setMinutes(59);
            firstDay.setSeconds(0);lastDay.setSeconds(59);

            return [this.toShortISOString(firstDay), this.toShortISOString(lastDay)];
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
        key: "event",
        set: function set(responce) {
            this.eventResponce = this.parseEvent(responce);
        },
        get: function get() {
            return this.eventResponce;
        }
    }, {
        key: "borderSize",
        get: function get() {
            return this.config.border || 0;
        }
    }, {
        key: "eventUrl",
        get: function get() {
            return "http://www.ticketmaster.com/event/";
        }
    }, {
        key: "eventId",
        set: function set(id) {
            this.config.id = id;
        },
        get: function get() {
            return this.config.id;
        }
    }, {
        key: "apiUrl",
        get: function get() {
            return this.config.id ? "https://app.ticketmaster.com/discovery/v2/events/" + this.config.id + ".json" : "https://app.ticketmaster.com/discovery/v2/events/" + this.eventId + ".json";
        }

        //get themeUrl() { return "http://localhost:4000/products-and-docs/widgets/countdown/1.0.0/theme/"; }

    }, {
        key: "themeUrl",
        get: function get() {
            return "http://ticketmaster-api-staging.github.io/products-and-docs/widgets/countdown/1.0.0/theme/";
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
    }]);

    function CalendarWidget(root) {
        _classCallCheck(this, CalendarWidget);

        console.log(root);
        this.widgetRoot = root;
        this.eventsRootContainer = document.createElement("div");
        this.eventsRootContainer.classList.add("events-root-container");
        this.widgetRoot.appendChild(this.eventsRootContainer);
    }

    _createClass(CalendarWidget, [{
        key: "createDOMItem",
        value: function createDOMItem(itemConfig) {}
    }]);

    return CalendarWidget;
}();

var widgetsCalendar = [];
(function () {
    var widgetContainers = document.querySelectorAll("div[w-type='calendar']");
    for (var i = 0; i < widgetContainers.length; ++i) {
        widgetsCalendar.push(new CalendarWidget(widgetContainers[i]));
    }
})();
//# sourceMappingURL=main-widget.js.map