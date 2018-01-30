import SelectorControls from './SelectorControls';

export default class YearScheduler {

	get apiUrl(){ return "https://app.ticketmaster.com/discovery-widgets/v2/events.json"; }

	get eventReqAttrs(){
		let calendarWidgetRoot = this.yearSchedulerRoot.parentNode.parentNode.parentNode;
		let tmapikey = '',
			keyword = '',
			radius;
		let attrs = {},
			params = [
				{
					attr: 'tmapikey',
					verboseName: 'apikey'
				},
				{
					attr: 'keyword',
					verboseName: 'keyword'
				},
				{
					attr: 'city',
					verboseName: 'city'
				},
				{
					attr: 'countrycode',
					verboseName: 'countryCode'
				},
				{
					attr: 'size',
					verboseName: 'size'
				},
				{
					attr: 'radius',
					verboseName: 'radius'
				},
				{
					attr: 'classificationid',
					verboseName: 'classificationId'
				},
				{
					attr: 'attractionid',
					verboseName: 'attractionId'
				},
				{
					attr: 'promoterid',
					verboseName: 'promoterId'
				},
				{
					attr: 'venueid',
					verboseName: 'venueId'
				},
				{
					attr: 'segmentid',
					verboseName: 'segmentId'
				}
			];

		let date = new Date();
		let startmonth, startdate, endmonth, enddate, startDateTime, endDateTime;
		let classificationid = '';
		let countrycode = '';
		let city = '';
		let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
		let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		let latlong = '34.0390107,-118.2672801';

		if (firstDay.getMonth()+1 <=9) startmonth = '0' + (firstDay.getMonth()+1); else startmonth = firstDay.getMonth()+1;
		startdate = '0' + firstDay.getDate();
		if (lastDay.getMonth()+1 <=9) endmonth = '0' + (lastDay.getMonth()+1); else endmonth = lastDay.getMonth()+1;
		enddate = lastDay.getDate();
		startDateTime = firstDay.getFullYear() + '-' + startmonth + '-' + startdate + 'T00:00:00Z';
		endDateTime = lastDay.getFullYear() + '-12-31T23:59:59Z';

		if (calendarWidgetRoot.getAttribute("w-period") != 'week') {

			if (calendarWidgetRoot.getAttribute("w-period").length != 4) {
				firstDay =  new Date(date.getFullYear()) + '-01-01T00:00:00Z';
				lastDay = new Date(date.getFullYear()) + '-12-31T23:59:59Z';
			}
			else {
				firstDay = calendarWidgetRoot.getAttribute("w-period") + '-01-01T00:00:00Z';
				lastDay = parseInt(firstDay + 1) + '-12-31T23:59:59Z';
			}
			startDateTime = firstDay;
			endDateTime = lastDay;
		}

		if (calendarWidgetRoot.getAttribute("w-tmapikey") != '') {
			tmapikey = calendarWidgetRoot.getAttribute("w-tmapikey");
			/*
      if (sessionStorage.getItem('tk-api-key')) {
          tmapikey = sessionStorage.getItem('tk-api-key');
          calendarWidgetRoot.setAttribute("w-tmapikey", tmapikey);
      }
      */
		}

		if (calendarWidgetRoot.getAttribute("w-latlong") != '') {
			latlong = document.querySelector('[w-type="calendar"]').getAttribute("w-latlong");
		}

		// if (latlong === null) latlong = '34.0390107,-118.2672801';

		if (calendarWidgetRoot.getAttribute("w-keyword") != '') {
			keyword = calendarWidgetRoot.getAttribute("w-keyword");
		}

		if (calendarWidgetRoot.getAttribute("w-radius") != '') {
			radius = calendarWidgetRoot.getAttribute("w-radius");
		}

		if (calendarWidgetRoot.getAttribute("w-classificationId") != '') {
			classificationid = calendarWidgetRoot.getAttribute("w-classificationId");
		}

		if (calendarWidgetRoot.getAttribute("w-countrycode") != null) {
			countrycode = calendarWidgetRoot.getAttribute("w-countrycode");
			latlong = '';
		}

		if (calendarWidgetRoot.getAttribute("w-city") != null) {
			city = calendarWidgetRoot.getAttribute("w-city");
			latlong = '';
		}

		return {
			"apikey": tmapikey,
			"latlong": latlong,
			"countryCode": countrycode,
			"city": city,
			"keyword": keyword,
			"startDateTime": startDateTime,
			"endDateTime": endDateTime,
			"classificationId": classificationid,
			"radius": radius,
			"size": "1"
		}
	}

	get messageRootContainer(){ return 'yearScheduler'; }

	get hideMessageDelay(){ return 3000; }

	getJsonAsync(url) {
		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url);

			xhr.onload = () => {
				if (xhr.status === 200) {
					var result = JSON.parse(xhr.response);
					resolve(result.page.totalElements);
				} else {
					reject("Error loading JSON!");
				}
			}
			xhr.onerror = () => {
				reject("Error loading JSON!");
			};
			xhr.send();
		});
	}

	formatDate(date) {
		var result = '';
		if(!date.day) return result; // Day is required

		function LZ(x) {
			return (x < 0 || x > 9 ? "" : "0") + x
		}
		var MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
			DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
			dayArray = date.day.split('-'),
			d = parseInt(dayArray[2]),
			M = parseInt(dayArray[1]);

		// var E = new Date(date.day).getDay();
		var E = new Date(+date.day.split('-')[0],(+date.day.split('-')[1])-1,+date.day.split('-')[2]).getDay();
		result = DAY_NAMES[E] + ', ' + MONTH_NAMES[M - 1] + ' ' + d + ', ' + dayArray[0];

		if(!date.time) return result;

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

	addScroll() {
		(function(n,t){function u(n){n.hasOwnProperty("data-simple-scrollbar")||Object.defineProperty(n,"data-simple-scrollbar",new SimpleScrollbar(n))}function e(n,i){function f(n){var t=n.pageY-u;u=n.pageY;r(function(){i.el.scrollTop+=t/i.scrollRatio})}function e(){n.classList.remove("ss-grabbed");t.body.classList.remove("ss-grabbed");t.removeEventListener("mousemove",f);t.removeEventListener("mouseup",e)}var u;n.addEventListener("mousedown",function(i){return u=i.pageY,n.classList.add("ss-grabbed"),t.body.classList.add("ss-grabbed"),t.addEventListener("mousemove",f),t.addEventListener("mouseup",e),!1})}function i(n){for(this.target=n,this.bar='<div class="ss-scroll">',this.wrapper=t.createElement("div"),this.wrapper.setAttribute("class","ss-wrapper"),this.el=t.createElement("div"),this.el.setAttribute("class","ss-content"),this.wrapper.appendChild(this.el);this.target.firstChild;)this.el.appendChild(this.target.firstChild);this.target.appendChild(this.wrapper);this.target.insertAdjacentHTML("beforeend",this.bar);this.bar=this.target.lastChild;e(this.bar,this);this.moveBar();this.el.addEventListener("scroll",this.moveBar.bind(this));this.el.addEventListener("mouseenter",this.moveBar.bind(this));this.target.classList.add("ss-container")}function f(){for(var i=t.querySelectorAll("*[ss-container]"),n=0;n<i.length;n++)u(i[n])}var r=n.requestAnimationFrame||n.setImmediate||function(n){return setTimeout(n,0)};i.prototype={moveBar:function(){var t=this.el.scrollHeight,i=this.el.clientHeight,n=this;this.scrollRatio=i/t;r(function(){n.bar.style.cssText="height:"+i/t*100+"%; top:"+n.el.scrollTop/t*100+"%;right:-"+(n.target.clientWidth-n.bar.clientWidth)+"px;"})}};t.addEventListener("DOMContentLoaded",f);i.initEl=u;i.initAll=f;n.SimpleScrollbar=i})(window,document)
		var scrollRoot = document.querySelectorAll(".ss");
		var maxL = scrollRoot.length;
		for (let ml = 0; ml < maxL; ml++) {
			SimpleScrollbar.initEl(scrollRoot[ml]);
		}
	}

	initMessage(schedulerRoot){
		this.eventsRootContainer = schedulerRoot;
		this.messageDialogContainer = document.createElement('div');
		this.messageDialogContainer.classList.add("event-message-container");
		this.messageDialog = document.createElement('div');
		this.messageDialog.classList.add("event-message_");
		this.messageContent = document.createElement('div');
		this.messageContent.classList.add("event-message__content");

		let messageClose = document.createElement('div');
		messageClose.classList.add("event-message__btn");
		messageClose.addEventListener("click", ()=> {
			this.hideMessage();
		});

		this.messageDialog.appendChild(this.messageContent);
		this.messageDialog.appendChild(messageClose);
		this.messageDialogContainer.appendChild(this.messageDialog);
		this.eventsRootContainer.appendChild(this.messageDialogContainer);
	}

	showMessage(message, hideMessageWithoutDelay){

		if(message.length){
			this.hideMessageWithoutDelay = hideMessageWithoutDelay;
			this.messageContent.innerHTML = message;
			this.messageDialog.classList.add("event-message_-visible");
			if (this.messageTimeout) {
				clearTimeout(this.messageTimeout); // Clear timeout if before 'hideMessageWithDelay' was called
			}
		}
	}

	hideMessageWithDelay(delay){
		if(this.messageTimeout) clearTimeout(this.messageTimeout); // Clear timeout if this method was called before
		this.messageTimeout = setTimeout(()=>{
			this.hideMessage();
		}, delay);
	}

	hideMessage(){
		if(this.messageTimeout) clearTimeout(this.messageTimeout); // Clear timeout and hide message immediately.
		this.messageDialog.classList.remove("event-message_-visible");
	}

	getYears() {
		let now = new Date().getFullYear();
		let content = '';
		content += '<span class="selector-title">Events in ' + now + '</span>';
		content += '<span class="selector-content" tabindex="-1">';
		for (let i = (now-1); i<(now+1); i++) {
			content += '<span ';
			if (i == now) content += 'class="active" ';
			content += 'w-period="' + (i+1) + '">Events in ' + (i+1) + '</span>';
		}
		content += '</span>';
		return content;
	}

	getLastDayOfMonth(year, month) {
		var date = new Date(year, month + 1, 0);
		return date.getDate();
	}

	startYear() {
		let MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		let prm = [];
		let year;
		let schedulerRoot = this.yearSchedulerRoot.parentNode.parentNode.parentNode;
		if (schedulerRoot.getAttribute("w-period").length != 4) {
			year = new Date().getFullYear();
		}
		else {
			year = this.eventReqAttrs.startDateTime.substring(0,4);
		}

		let month = '01';

		var xhr = new XMLHttpRequest();
		var resp, dateOffset;


		let latlongOffset = schedulerRoot.getAttribute("w-latlong");
		if (latlongOffset != null) {
			xhr.open('GET', 'https://maps.googleapis.com/maps/api/timezone/json?language=en&location=' + schedulerRoot.getAttribute("w-latlong") + '&timestamp=1331161200');
			xhr.onload = function (e) {
				if (xhr.readyState == 4 && xhr.status == 200) {
					resp = JSON.parse(xhr.responseText);
					dateOffset = parseInt(resp.rawOffset) + parseInt(resp.dstOffset);
				}
			};
			xhr.send(null);
		}
		else {
			dateOffset = undefined;
		}

		var currentMonth = parseInt(new Date().getMonth()) + 1;

		for(let i = 1; i <= 12; i++) {

			if (i<=9) month = '0' + i; else month = i;
			let attrs = this.eventReqAttrs;

			if (dateOffset !== undefined) {
				var startDT = new Date(new Date(year, (i-1), 1, 0, 0, 0, 0).valueOf() - dateOffset*1000);
				var finishDT = new Date(new Date(year, (i-1), this.getLastDayOfMonth(year, (i-1)), 23, 59, 59, 0).valueOf() - dateOffset*1000);
				var startY = startDT.getFullYear();
				var startM = startDT.getMonth() + 1;
				if (startM <= 9) startM = '0' + startM;
				var startD = startDT.getDate();
				if (startD <= 9) startD = '0' + startD;
				var startH = startDT.getHours();
				if (startDT.getHours() <= 9) startH = '0' + startDT.getHours();
				var startMn = startDT.getMinutes();
				if (startDT.getMinutes() <= 9) startMn = '0' + startDT.getMinutes();
				var startS = startDT.getSeconds();
				if (startDT.getSeconds() <= 9) startS = '0' + startDT.getSeconds();
				var finishY = finishDT.getFullYear();
				var finishM = finishDT.getMonth() + 1;
				if (finishM <= 9) finishM = '0' + finishM;
				var finishD = finishDT.getDate();
				if (finishD <= 9) finishD = '0' + finishD;
				var finishH = finishDT.getHours();
				if (finishDT.getHours() <= 9) finishH = '0' + finishDT.getHours();
				var finishMn = finishDT.getMinutes();
				if (finishDT.getMinutes() <= 9) finishMn = '0' + finishDT.getMinutes();
				var finishS = finishDT.getSeconds();
				if (finishDT.getSeconds() <= 9) finishS = '0' + finishDT.getSeconds();
				attrs.startDateTime = startY + '-' + startM + '-' + startD + 'T' + startH + ':' + startMn + ':' + startS + 'Z';
				attrs.endDateTime = finishY + '-' + finishM + '-' + finishD + 'T' + finishH + ':' + finishMn + ':' + finishS + 'Z';
			}
			else {
				var currentMonth = parseInt(new Date().getMonth()) + 1;
				if (currentMonth <=9) currentMonth = '0' + currentMonth;
				var currentDay = new Date().getDate();
				if (currentDay <=9) currentDay = '0' + currentDay;
				if (!(year == new Date().getFullYear() && month == currentMonth)) currentDay = '01';
				attrs.startDateTime = year + '-' + month + '-' + currentDay + 'T00:00:00Z';
				attrs.endDateTime = year + '-' + month + '-' + this.getLastDayOfMonth(year, (i - 1)) + 'T23:59:59Z';
			}
			attrs = Object.keys(attrs).map(function(key){
				return `${key}=${attrs[key]}`;
			}).join("&");
			let url;
			url = this.apiUrl + [url,attrs].join("?");
			let thisSchedulerRoot = this.yearSchedulerRoot.parentNode.parentNode.parentNode;
			if (thisSchedulerRoot.getAttribute('w-postalcodeapi') != null) url += '&postalCode=' + thisSchedulerRoot.getAttribute('w-postalcodeapi');
			url += '&sort=date,asc';
			prm.push(this.getJsonAsync(url));
		}


		Promise.all(prm).then(value => {
			var elem = this.yearSchedulerRoot.querySelector(".year");
			let table = '<div class="monthes-container">';
			let month;
			let curMonth = new Date().getMonth();
			let curYear = new Date().getFullYear();
			let noResults = true;
			let messageContainer = schedulerRoot.querySelector('.event-message-container');

			for (var i = 0; i < MONTH_NAMES.length; i++) {
				table += '<div class="month">';
				table += '<span class="name';
				if (year == curYear && curMonth == i) table += ' current';
				table += '">' + MONTH_NAMES[i] + '</span>';
				if (parseInt(i+1) <= 9) month = '0' + parseInt(i+1); else month = parseInt(i+1);
				if (value[i] !=0) table += '<a href="javascript:void(0)" class="count" rel="' + year + '-' + month + '">' + value[i] + '</a>';
				table += '</div>';
				if (value[i] != 0) noResults = false;
			}
			table += '</div>';
			elem.innerHTML = table;

			this.yearSchedulerRoot.getElementsByClassName('spinner-container')[0].classList.add('hide');

			if (noResults === true) {
				this.showMessage("No results were found.<br/>Here other options for you.", true);
				this.hideMessageWithDelay(this.hideMessageDelay);
			}

			var rounds = schedulerRoot.querySelectorAll("a.count");
			for (var x = 0; x < rounds.length; x++) {
				rounds[x].addEventListener("click", function (e) {
					schedulerRoot.setAttribute('w-period', e.target.getAttribute('rel'));
					schedulerRoot.querySelectorAll('.tb')[2].click();
					schedulerRoot.getElementsByClassName('month-update')[0].click();
				}, false);
			}


		}, reason => {
			console.log(reason)
		});

	}

	update() {
		let schedulerRoot = this.yearSchedulerRoot;
		let spinner = schedulerRoot.querySelector('.spinner-container');
		spinner.classList.remove('hide');
		let year = schedulerRoot.querySelector('.year');
		schedulerRoot.removeChild(year);
		this.yearRootContainer = document.createElement("div");
		this.yearRootContainer.classList.add("year");
		this.yearSchedulerRoot.appendChild(this.yearRootContainer);
		this.startYear();
	}

	constructor(root) {
		if (!root) return;
		this.yearSchedulerRoot = root;
		if (this.yearSchedulerRoot.parentNode.querySelector('.sliderLeftSelector') == null) {
			let leftSelector = new SelectorControls(this.yearSchedulerRoot.parentNode, 'sliderLeftSelector', this.getYears(), 'period', this.update.bind(this));
			let RightSelector = new SelectorControls(this.yearSchedulerRoot.parentNode, 'sliderRightSelector', '<span class="selector-title">All Events</span><span class="selector-content" tabindex="-1"><span class="active" w-classificationId="">All Events</span><span w-classificationId="KZFzniwnSyZfZ7v7na">Arts & Theatre</span><span w-classificationId="KZFzniwnSyZfZ7v7nn">Film</span><span w-classificationId="KZFzniwnSyZfZ7v7n1">Miscellaneous</span><span w-classificationId="KZFzniwnSyZfZ7v7nJ">Music</span><span w-classificationId="KZFzniwnSyZfZ7v7nE">Sports</span></span>', 'classificationId', this.update.bind(this));
		}
		if (this.yearSchedulerRoot.querySelector('.year') == null) {
			this.yearRootContainer = document.createElement("div");
			this.yearRootContainer.classList.add("year");
			this.yearSchedulerRoot.appendChild(this.yearRootContainer);
			this.initMessage(this.yearSchedulerRoot);
			// this.startYear();
		}
	}
}
