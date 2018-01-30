import './polyfills/promisePolyfill';

import TicketmasterCalendarWidget from './classes/TicketmasterCalendarWidget';
import TabsControls from './classes/TabsControls';
import WeekScheduler from './classes/WeekScheduler';
import MonthScheduler from './classes/MonthScheduler';
import YearScheduler from './classes/YearScheduler';

import once from './helpers/once';

window.widgetsCalendar = [];
window.weekSchedulers = [];
window.monthSchedulers = [];
window.yearSchedulers = [];

(function () {
    let widgetContainers = document.querySelectorAll("div[w-type='calendar']");
    for (let i = 0; i < widgetContainers.length; ++i) {
        const calendarWidget = new TicketmasterCalendarWidget(widgetContainers[i]);
        const weekScheduler = new WeekScheduler(widgetContainers[i].querySelector('.weekSсheduler'));
        const monthScheduler = new MonthScheduler(widgetContainers[i].querySelector('.monthScheduler'));
        const yearScheduler = new YearScheduler(widgetContainers[i].querySelector('.yearScheduler'));

        const tabControl = new TabsControls(widgetContainers[i]);
        tabControl.addEventListenerForTabIndex('click', 1, once(weekScheduler.update.bind(weekScheduler)));
        tabControl.addEventListenerForTabIndex('click', 2, once(monthScheduler.update.bind(monthScheduler)));
        tabControl.addEventListenerForTabIndex('click', 3, once(yearScheduler.update.bind(yearScheduler)));

        window.widgetsCalendar.push(calendarWidget);
        window.weekSchedulers.push(weekScheduler);
        window.monthSchedulers.push(monthScheduler);
        window.yearSchedulers.push(yearScheduler);
    }

})();

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');


