class CalendarWidget {

    set config(attrs) { this.widgetConfig = this.loadConfig(attrs); }
    get config() { return this.widgetConfig; }

    set event(responce){ this.eventResponce = this.parseEvent(responce);}
    get event(){ return this.eventResponce;}

    get borderSize(){ return this.config.border || 0;}

    get eventUrl(){ return "http://www.ticketmaster.com/event/"; }

    set eventId(id){ this.config.id = id;}
    get eventId(){ return this.config.id;}

    get apiUrl(){ return this.config.id ? `https://app.ticketmaster.com/discovery/v2/events/${this.config.id}.json` : `https://app.ticketmaster.com/discovery/v2/events/${this.eventId}.json`; }

    //get themeUrl() { return "http://localhost:4000/products-and-docs/widgets/countdown/1.0.0/theme/"; }
    get themeUrl() { return "http://ticketmaster-api-staging.github.io/products-and-docs/widgets/countdown/1.0.0/theme/"; }

    get portalUrl(){ return "http://ticketmaster-api-staging.github.io/"; }

    get logoUrl() { return "http://www.ticketmaster.com/"; }

    get legalNoticeUrl() { return "http://developer.ticketmaster.com/support/terms-of-use/"; }

    get questionUrl() { return "http://developer.ticketmaster.com/support/faq/"; }


    getDateFromPeriod(period){

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

        firstDay.setHours(0);   lastDay.setHours(23);
        firstDay.setMinutes(0); lastDay.setMinutes(59);
        firstDay.setSeconds(0); lastDay.setSeconds(59);

        return [this.toShortISOString(firstDay), this.toShortISOString(lastDay)];
    }

    constructor(root) {
        console.log(root);
        this.widgetRoot = root;
        this.eventsRootContainer = document.createElement("div");
        this.eventsRootContainer.classList.add("events-root-container");
        this.widgetRoot.appendChild(this.eventsRootContainer);
    }

    createDOMItem(itemConfig) {

    }


}

let widgetsCalendar = [];
(function () {
    let widgetContainers = document.querySelectorAll("div[w-type='calendar']");
    for (let i = 0; i < widgetContainers.length; ++i) {
        widgetsCalendar.push(new CalendarWidget(widgetContainers[i]));
    }

})();