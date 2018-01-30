import SelectorControls from './SelectorControls';

export default class WeekScheduler {

	get apiUrl(){ return "https://app.ticketmaster.com/discovery-widgets/v2/events.json"; }

	get eventReqAttrs(){
		let calendarWidgetRoot = this.eventsRootContainer.parentNode.parentNode.parentNode;
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
					attr: 'latlong',
					verboseName: 'latlong'
				},
				{
					attr: 'keyword',
					verboseName: 'keyword'
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
					attr: 'city',
					verboseName: 'city'
				},
				{
					attr: 'countrycode',
					verboseName: 'countryCode'
				},
				{
					attr: 'segmentid',
					verboseName: 'segmentId'
				}
			];

		let startmonth, startdate, endmonth, enddate;
		let classificationid = '';
		let countrycode = '';
		let city = '';
		let startDateTime = '2016-06-27T00:00:00Z';
		let endDateTime = '2016-07-02T23:59:59Z';
		let latlong = '';

		let current = new Date();
		let start = new Date();
		let end = new Date();

		let weekstart = current.getDate() - current.getDay();
		start = new Date(current.setDate(weekstart));
		end.setDate(start.getDate() + 7);
		if (start.getMonth()+1 <=9) startmonth = '0' + (start.getMonth()+1); else startmonth = start.getMonth()+1;
		if (start.getDate() <=9) startdate = '0' + start.getDate(); else startdate = start.getDate();
		if (end.getMonth()+1 <=9) endmonth = '0' + (end.getMonth()+1); else endmonth = end.getMonth()+1;
		if (end.getDate() <=9) enddate = '0' + end.getDate(); else enddate = end.getDate();
		startDateTime = start.getFullYear() + '-' + startmonth + '-' + startdate + 'T00:00:00Z';
		endDateTime = end.getFullYear() + '-' + endmonth + '-' + enddate + 'T23:59:59Z';

		if (calendarWidgetRoot.getAttribute("w-period-week") != 'week') {
			start = new Date(calendarWidgetRoot.getAttribute("w-period-week"));
			end = new Date(calendarWidgetRoot.getAttribute("w-period-week"));
			end.setDate(end.getDate() + 7);
			if (start.getMonth()+1 <=9) startmonth = '0' + (start.getMonth()+1); else startmonth = start.getMonth()+1;
			if (start.getDate() <=9) startdate = '0' + start.getDate(); else startdate = start.getDate();
			if (end.getMonth()+1 <=9) endmonth = '0' + (end.getMonth()+1); else endmonth = end.getMonth()+1;
			if (end.getDate() <=9) enddate = '0' + end.getDate(); else enddate = end.getDate();
			startDateTime = start.getFullYear() + '-' + startmonth + '-' + startdate + 'T00:00:00Z';
			endDateTime = end.getFullYear() + '-' + endmonth + '-' + enddate + 'T23:59:59Z';
		}

		if (calendarWidgetRoot.getAttribute("w-tmapikey") != '') {
			tmapikey = calendarWidgetRoot.getAttribute("w-tmapikey");
			/* if (sessionStorage.getItem('tk-api-key')) {
          tmapikey = sessionStorage.getItem('tk-api-key');
          document.querySelector('[w-type="calendar"]').setAttribute("w-tmapikey", tmapikey);
      }
      */
		}

		if (calendarWidgetRoot.getAttribute("w-latlong") != '') {
			latlong = calendarWidgetRoot.getAttribute("w-latlong");
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

		if (new Date(startDateTime).getFullYear() == '1969' || new Date(startDateTime).getFullYear() == '1970') {
			current = new Date();
			start = new Date();
			end = new Date();

			weekstart = current.getDate() - current.getDay();
			start = new Date(current.setDate(weekstart));
			end.setDate(start.getDate() + 7);
			if (start.getMonth()+1 <=9) startmonth = '0' + (start.getMonth()+1); else startmonth = start.getMonth()+1;
			if (start.getDate() <=9) startdate = '0' + start.getDate(); else startdate = start.getDate();
			if (end.getMonth()+1 <=9) endmonth = '0' + (end.getMonth()+1); else endmonth = end.getMonth()+1;
			if (end.getDate() <=9) enddate = '0' + end.getDate(); else enddate = end.getDate();
			startDateTime = start.getFullYear() + '-' + startmonth + '-' + startdate + 'T00:00:00Z';
			endDateTime = end.getFullYear() + '-' + endmonth + '-' + enddate + 'T23:59:59Z';
		}

		return {
			"apikey": tmapikey,
			"latlong": latlong,
			"keyword": keyword,
			"countryCode": countrycode,
			"city": city,
			"startDateTime": startDateTime,
			"endDateTime": endDateTime,
			"classificationId": classificationid,
			"radius": radius,
			"size": "200"
		}

	}

	get messageRootContainer(){ return 'weekSсheduler'; }

	get hideMessageDelay(){ return 3000; }

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

	getJSON(handler, url=this.apiUrl, attrs={}, method="GET"){
		attrs = Object.keys(attrs).map(function(key){
			return `${key}=${attrs[key]}`;
		}).join("&");

		url = [url,attrs].join("?");
		let thisSchedulerRoot = this.weekSchedulerRoot.parentNode.parentNode.parentNode;
		if (thisSchedulerRoot.getAttribute('w-postalcodeapi') != null) url += '&postalCode=' + thisSchedulerRoot.getAttribute('w-postalcodeapi');
		url += '&sort=date,asc';

		this.xmlHTTP = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		if(method == "POST") {
			this.xmlHTTP.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		}
		this.xmlHTTP.widget = this;
		this.xmlHTTP.onreadystatechange = handler;
		this.xmlHTTP.open(method, url, true);
		this.xmlHTTP.send();
	}

	getJsonAsync(url) {
		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url);

			xhr.onload = () => {
				if (xhr.status === 200) {
					var result = JSON.parse(xhr.response);
					resolve(result);
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

	getWeekEventsHandler() {
		let events;
		let place;
		let address;
		let weekEvents = [];
		let widget = this.widget;
		let schedulerRoot = widget.weekSchedulerRoot;
		let calendarWidgetRoot = this.widget.eventsRootContainer.parentNode.parentNode.parentNode;
		let spinner = schedulerRoot.querySelector('.spinner-container');
		let prm = [];
		let messageContainer = schedulerRoot.querySelector('.event-message-container');

		if (this && this.readyState == XMLHttpRequest.DONE) {

			if (this.status == 200) {

				events = JSON.parse(this.responseText);

				if (events.page.totalPages <= 1) {
					spinner.classList.add('hide');
					if (events.page.totalElements != 0) {
						events._embedded.events.forEach(function (item) {
							if (item.hasOwnProperty('_embedded') && item._embedded.hasOwnProperty('venues')) {
								if (item._embedded.venues[0].hasOwnProperty('name')) {
									place = item._embedded.venues[0].name + ', ';
								}
								else {
									place = '';
								}
								if (item._embedded.venues[0].hasOwnProperty('address')) {
									address = item._embedded.venues[0].address.line1;
								} else {
									address = '';
								}
							}
							else {
								place = '';
								address = '';
							}

							let imgWidth;
							let index;
							item.images.forEach(function (img, i) {
								if (i == 0) imgWidth = img.width;
								if (imgWidth > img.width) {
									imgWidth = img.width;
									index = i;
								}
							});

							if (item.hasOwnProperty('dates') && item.dates.hasOwnProperty('start') && item.dates.start.hasOwnProperty('localTime')) {
								if (+new Date( +new Date().getFullYear(), +new Date().getMonth(), +new Date().getDate()) <= +new Date(+item.dates.start.localDate.split('-')[0],(+item.dates.start.localDate.split('-')[1])-1,+item.dates.start.localDate.split('-')[2])) {
									weekEvents.push({
										'name': item.name,
										'date': item.dates.start.localDate,
										'time': item.dates.start.localTime,
										'datetime': widget.formatDate({
											day: item.dates.start.localDate,
											time: item.dates.start.localTime
										}),
										'place': place + address,
										'url': item.url,
										'img': (item.hasOwnProperty('images') && item.images[index] != undefined) ? item.images[index].url : '',
										'count': 0
									});
								}
							}
						});
					}
					else {
						weekEvents[0] = ({
							date: '',
							time: '',
						});
						messageContainer.classList.remove('hide');
						widget.showMessage("No results were found.<br/>Here other options for you.");
						widget.hideMessageWithDelay(widget.hideMessageDelay);
					}

					if (weekEvents[0] === undefined) {
						weekEvents[0] = ({
							date: '',
							time: '',
						});
						messageContainer.classList.remove('hide');
						widget.showMessage("No results were found.<br/>Here other options for you.");
						widget.hideMessageWithDelay(widget.hideMessageDelay);
					}

					let tDate = weekEvents[0].date;
					let tTime = weekEvents[0].time.substr(0,2);
					let count = 0;
					let startFlag = 0;
					let endFlag = 0;

					for (let e = 0, l = weekEvents.length; e < l; ++e) {
						if (tDate == weekEvents[e].date && tTime == weekEvents[e].time.substr(0,2)) {
							weekEvents[e].count = count;
							endFlag = e;
							count++;
						}
						if (tDate == weekEvents[e].date && tTime != weekEvents[e].time.substr(0,2)) {
							for (let i = startFlag; i <= endFlag; i++) {
								weekEvents[i].count = count-1;
							}
							tTime = weekEvents[e].time.substr(0,2);
							startFlag = e;
							count = 0;
						}
						if (tDate != weekEvents[e].date || e == l-1) {
							for (let i = startFlag; i <= endFlag; i++) {
								weekEvents[i].count = count-1;
							}
							tDate = weekEvents[e].date;
							tTime = weekEvents[e].time.substr(0,2);
							startFlag = e;
							count = 0;
						}
					}

					var current = new Date();

					if (calendarWidgetRoot.getAttribute("w-period-week") != 'week') {
						var weekstart = new Date(calendarWidgetRoot.getAttribute("w-period-week"));
						weekstart.setDate(weekstart.getDate() - weekstart.getDay());
					}
					else {
						var weekstart = current.getDate() - current.getDay();
						weekstart = new Date(current.setDate(weekstart));
					}

					if (weekstart.getFullYear() == '1969') {
						current = new Date();
						weekstart = current.getDate() - current.getDay();
						weekstart = new Date(current.setDate(weekstart));
					}

					let currentSunday = weekstart;
					let daysDiv = '';
					let currentDayClass = '';
					let dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
					let now = new Date();
					for (let i = 0; i <= 6; i++) {
						let day = new Date(new Date(currentSunday).getTime() + (i * 24 * 60 * 60 * 1000));
						if (day.getDay() == now.getDay() && day.getDate() == now.getDate()) currentDayClass = ' active'; else currentDayClass = '';
						daysDiv += `<span class="d${currentDayClass}">${dayOfWeek[i]} <span class="num">${day.getDate()}</span></span>`;
					}
					let zeroLead = '';
					let timeTmp = '';
					let dateTmp = '';
					let monthTmp = '';
					let timeDiv = '<div class="top-gradient"></div><div class="ss time-wrapper"><div class="ss-container time-holder">';

					for (let i = 13; i <= 23; i++) {
						if (i <= 9) {
							zeroLead = '0';
							timeTmp = '0' + i + ":00:00";
						} else {
							zeroLead = '';
							timeTmp = i + ":00:00"
						}
						timeDiv += `<div class="t t-${i}"><span class="tl">${zeroLead}${i} : 00</span>`;

						var dayTmp = new Date(currentSunday);

						for (let d = 0; d <= 6; d++) {
							let dayCount = 0;
							if (d!=0) dayTmp.setDate(dayTmp.getDate() + 1);
							if (parseInt(dayTmp.getMonth() + 1) <= 9) monthTmp = '0' + parseInt(dayTmp.getMonth() + 1); else monthTmp = dayTmp.getMonth() + 1;
							if (parseInt(dayTmp.getDate()) <= 9) {
								dateTmp = dayTmp.getFullYear() + '-' + monthTmp + '-' + '0' + parseInt(dayTmp.getDate());
							}
							else {
								dateTmp = dayTmp.getFullYear() + '-' + monthTmp + '-' + dayTmp.getDate();
							}
							timeDiv += `<div class="d d-${d}" w-date="${dateTmp}" w-time="${zeroLead}${i}:00:00">`;

							for (let e = 0, l = weekEvents.length; e < l; ++e) {
								if (weekEvents[e].date == dateTmp && weekEvents[e].time.substr(0,2) == timeTmp.substr(0,2)) {
									if (dayCount == 0) {
										timeDiv += '<span class="round"></span>';
										if (weekEvents[e].time.substring(0,2) < 18) {
											timeDiv += '<span class="tail"></span>';
											timeDiv += '<div class="popup ';
											if (weekEvents[e].count == 0) timeDiv += 'single ';
											timeDiv += 'ss" tabindex="-1">';
											timeDiv += '<div class="ss-container">';
										}
										else {
											timeDiv += '<span class="tail-up"></span>';
											timeDiv += '<div class="popup-up ';
											if (weekEvents[e].count == 0) timeDiv += 'single ';
											timeDiv +=  'ss" tabindex="-1">';
											timeDiv += '<div class="ss-container">';
										}
										dayCount = 1;
									}
									timeDiv += '<span class="event">';
									timeDiv += '<span class="event-holder">';
									timeDiv += '<a href="' + weekEvents[e].url + '" target="_blank">';
									if (weekEvents[e].img !=='' && weekEvents[e].img.length !== 0){
										timeDiv += '<span class="img bg-cover-default" style="background: url(' + weekEvents[e].img + ') center center no-repeat"></span>'
									}else{ timeDiv += '<span class="img bg-cover-default" ></span>';}
									timeDiv += '<span class="name">' + weekEvents[e].name + '</span>';
									timeDiv += '</a>';
									timeDiv += '<span class="date">' + weekEvents[e].datetime + '</span>';
									timeDiv += '<span class="place">' + weekEvents[e].place + '</span>';
									timeDiv += '</span>';
									timeDiv += '</span>';
								}
							}
							if (dayCount == 1) timeDiv += '</div></div>';
							timeDiv += '</div>';
						}
						timeDiv += `</div>`;
					}
					timeDiv += '</div></div><div class="bottom-gradient"></div>';
					daysDiv += timeDiv;
					widget.weekdaysRootContainer.innerHTML = daysDiv;
					widget.addScroll();
					var rounds = widget.weekdaysRootContainer.querySelectorAll("span.round");
					for (var x = 0; x < rounds.length; x++) {
						rounds[x].addEventListener("click", function (e) {
							widget.weekdaysRootContainer.querySelector('.top-gradient').style.display = "none";
							widget.weekdaysRootContainer.querySelector('.bottom-gradient').style.display = "none";
							widget.weekdaysRootContainer.querySelectorAll(".ss-wrapper")[0].style.overflow = "visible";
							widget.weekdaysRootContainer.querySelectorAll(".ss-content")[0].style.overflow = "visible";
							this.nextElementSibling.classList.add("show");
							this.nextElementSibling.nextElementSibling.classList.add("show");
							this.nextElementSibling.nextElementSibling.focus();
						}, false);
					}

					var popups = widget.weekdaysRootContainer.querySelectorAll(".popup, .popup-up");
					for (var y = 0; y < popups.length; y++) {
						popups[y].addEventListener("blur", function (e) {
							let self = this;
							widget.weekdaysRootContainer.querySelector('.top-gradient').style.display = "";
							widget.weekdaysRootContainer.querySelector('.bottom-gradient').style.display = "";
							widget.weekdaysRootContainer.querySelectorAll(".ss-wrapper")[0].style.overflow = "hidden";
							widget.weekdaysRootContainer.querySelectorAll(".ss-content")[0].style.overflow = "auto";
							setTimeout(function () {
								self.previousElementSibling.classList.remove("show");
								self.classList.remove("show");
							}, 127);
						}, false);
					}
				}
				else {
					weekEvents = [];
					let weekEventsConcat = [];
					let l = events.page.totalPages - 1;
					for (let i = 0; i <= l; i++) {
						let attrs = widget.eventReqAttrs;
						attrs.page = i;
						attrs = Object.keys(attrs).map(function (key) {
							return `${key}=${attrs[key]}`;
						}).join("&");
						let url;
						url = widget.apiUrl + [url, attrs].join("?");
						let thisSchedulerRoot = widget.weekSchedulerRoot.parentNode.parentNode.parentNode;
						if (thisSchedulerRoot.getAttribute('w-postalcodeapi') != null) url += '&postalCode=' + thisSchedulerRoot.getAttribute('w-postalcodeapi');
						url += '&sort=date,asc';
						prm.push(widget.getJsonAsync(url));
					}
					Promise.all(prm).then(value => {
						spinner.classList.add('hide');
						let le = value.length;
						for (let e = 0; e <= le; e++) {
							if(value[e] && value[e]._embedded && value[e]._embedded.events){
								value[e]._embedded.events.forEach(function (item) {
									if (item.hasOwnProperty('_embedded') && item._embedded.hasOwnProperty('venues')) {
										if (item._embedded.venues[0].hasOwnProperty('name')) {
											place = item._embedded.venues[0].name + ', ';
										}
										else {
											place = '';
										}
										if (item._embedded.venues[0].hasOwnProperty('address')) {
											address = item._embedded.venues[0].address.line1;
										} else {
											address = '';
										}
									}
									else {
										place = '';
										address = '';
									}

									let imgWidth;
									let index;
									item.images.forEach(function (img, i) {
										if (i == 0) imgWidth = img.width;
										if (imgWidth > img.width) {
											imgWidth = img.width;
											index = i;
										}
									});

									if (item.hasOwnProperty('dates') && item.dates.hasOwnProperty('start') && item.dates.start.hasOwnProperty('localTime')) {
										if (+new Date( +new Date().getFullYear(), +new Date().getMonth(), +new Date().getDate()) <= +new Date(+item.dates.start.localDate.split('-')[0],(+item.dates.start.localDate.split('-')[1])-1,+item.dates.start.localDate.split('-')[2])) {
											weekEvents.push({
												'name': item.name,
												'date': item.dates.start.localDate,
												'time': item.dates.start.localTime,
												'datetime': widget.formatDate({
													day: item.dates.start.localDate,
													time: item.dates.start.localTime
												}),
												'place': place + address,
												'url': item.url,
												'img': (item.hasOwnProperty('images') && item.images[index] != undefined) ? item.images[index].url : '',
											});
										}
									}
								});
							}
							else {
								weekEvents[0] = ({
									date: '',
									time: '',
								});
							}
						}

						weekEventsConcat.push(weekEvents);
						weekEvents = weekEventsConcat[0];

						if (weekEvents.length == 0) {
							messageContainer.classList.remove('hide');
							widget.showMessage("No results were found.<br/>Here other options for you.");
							widget.hideMessageWithDelay(widget.hideMessageDelay);
						}

						let tDate = weekEvents[0].date;
						let tTime = weekEvents[0].time.substr(0, 2);
						let count = 0;
						let startFlag = 0;
						let endFlag = 0;

						for (let e = 0, l = weekEvents.length; e < l; ++e) {
							if (tDate == weekEvents[e].date && tTime == weekEvents[e].time.substr(0, 2)) {
								weekEvents[e].count = count;
								endFlag = e;
								count++;
							}
							if (tDate == weekEvents[e].date && tTime != weekEvents[e].time.substr(0, 2)) {
								for (let i = startFlag; i <= endFlag; i++) {
									weekEvents[i].count = count - 1;
								}
								tTime = weekEvents[e].time.substr(0, 2);
								startFlag = e;
								count = 0;
							}
							if (tDate != weekEvents[e].date || e == l - 1) {
								for (let i = startFlag; i <= endFlag; i++) {
									weekEvents[i].count = count - 1;
								}
								tDate = weekEvents[e].date;
								tTime = weekEvents[e].time.substr(0, 2);
								startFlag = e;
								count = 0;
							}
						}

						var current = new Date();

						if (calendarWidgetRoot.getAttribute("w-period-week") != 'week') {
							var weekstart = new Date(calendarWidgetRoot.getAttribute("w-period-week"));
							weekstart.setDate(weekstart.getDate() - weekstart.getDay());
						}
						else {
							var weekstart = current.getDate() - current.getDay();
							weekstart = new Date(current.setDate(weekstart));
						}

						if (weekstart.getFullYear() == '1969') {
							current = new Date();
							weekstart = current.getDate() - current.getDay();
							weekstart = new Date(current.setDate(weekstart));
						}

						let currentSunday = weekstart;
						let daysDiv = '';
						let currentDayClass = '';
						let dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
						let now = new Date();
						for (let i = 0; i <= 6; i++) {
							let day = new Date(new Date(currentSunday).getTime() + (i * 24 * 60 * 60 * 1000));
							if (day.getDay() == now.getDay() && day.getDate() == now.getDate()) currentDayClass = ' active'; else currentDayClass = '';
							daysDiv += `<span class="d${currentDayClass}">${dayOfWeek[i]} <span class="num">${day.getDate()}</span></span>`;
						}
						let zeroLead = '';
						let timeTmp = '';
						let dateTmp = '';
						let monthTmp = '';
						let timeDiv = '<div class="ss time-wrapper"><div class="ss-container time-holder">';

						for (let i = 13; i <= 23; i++) {
							if (i <= 9) {
								zeroLead = '0';
								timeTmp = '0' + i + ":00:00";
							} else {
								zeroLead = '';
								timeTmp = i + ":00:00"
							}
							timeDiv += `<div class="t t-${i}"><span class="tl">${zeroLead}${i} : 00</span>`;

							var dayTmp = new Date(currentSunday);

							for (let d = 0; d <= 6; d++) {
								let dayCount = 0;
								if (d != 0) dayTmp.setDate(dayTmp.getDate() + 1);
								if (parseInt(dayTmp.getMonth() + 1) <= 9) monthTmp = '0' + parseInt(dayTmp.getMonth() + 1); else monthTmp = dayTmp.getMonth() + 1;
								if (parseInt(dayTmp.getDate()) <= 9) {
									dateTmp = dayTmp.getFullYear() + '-' + monthTmp + '-' + '0' + parseInt(dayTmp.getDate());
								}
								else {
									dateTmp = dayTmp.getFullYear() + '-' + monthTmp + '-' + dayTmp.getDate();
								}
								timeDiv += `<div class="d d-${d}" w-date="${dateTmp}" w-time="${zeroLead}${i}:00:00">`;

								for (let e = 0, l = weekEvents.length; e < l; ++e) {
									if (weekEvents[e].date == dateTmp && weekEvents[e].time.substr(0, 2) == timeTmp.substr(0, 2)) {
										if (dayCount == 0) {
											timeDiv += '<span class="round"></span>';
											if (weekEvents[e].time.substring(0, 2) < 18) {
												timeDiv += '<span class="tail"></span>';
												timeDiv += '<div class="popup ';
												if (weekEvents[e].count == 0) timeDiv += 'single ';
												timeDiv += 'ss" tabindex="-1">';
												timeDiv += '<div class="ss-container">';
											}
											else {
												timeDiv += '<span class="tail-up"></span>';
												timeDiv += '<div class="popup-up ';
												if (weekEvents[e].count == 0) timeDiv += 'single ';
												timeDiv += 'ss" tabindex="-1">';
												timeDiv += '<div class="ss-container">';
											}
											dayCount = 1;
										}
										timeDiv += '<span class="event">';
										timeDiv += '<span class="event-holder">';
										timeDiv += '<a href="' + weekEvents[e].url + '" target="_blank">';
										if (weekEvents[e].img !=='' && weekEvents[e].img.length !== 0){
											timeDiv += '<span class="img bg-cover-default" style="background: url(' + weekEvents[e].img + ') center center no-repeat"></span>'
										}else{ timeDiv += '<span class="img bg-cover-default" ></span>';}
										timeDiv += '<span class="name">' + weekEvents[e].name + '</span>';
										timeDiv += '</a>';
										timeDiv += '<span class="date">' + weekEvents[e].datetime + '</span>';
										timeDiv += '<span class="place">' + weekEvents[e].place + '</span>';
										timeDiv += '</span>';
										timeDiv += '</span>';
									}
								}
								if (dayCount == 1) timeDiv += '</div></div>';
								timeDiv += '</div>';
							}
							timeDiv += `</div>`;
						}
						timeDiv += `</div></div>`;
						daysDiv += timeDiv;
						widget.weekdaysRootContainer.innerHTML = daysDiv;
						widget.addScroll();

						var rounds = widget.weekdaysRootContainer.querySelectorAll("span.round");
						for (var x = 0; x < rounds.length; x++) {
							rounds[x].addEventListener("click", function (e) {
								widget.weekdaysRootContainer.querySelectorAll(".ss-wrapper")[0].style.overflow = "visible";
								widget.weekdaysRootContainer.querySelectorAll(".ss-content")[0].style.overflow = "visible";
								this.nextElementSibling.classList.add("show");
								this.nextElementSibling.nextElementSibling.classList.add("show");
								this.nextElementSibling.nextElementSibling.focus();
							}, false);
						}

						var popups = widget.weekdaysRootContainer.querySelectorAll(".popup, .popup-up");
						for (var y = 0; y < popups.length; y++) {
							popups[y].addEventListener("blur", function (e) {
								let self = this;
								widget.weekdaysRootContainer.querySelectorAll(".ss-wrapper")[0].style.overflow = "hidden";
								widget.weekdaysRootContainer.querySelectorAll(".ss-content")[0].style.overflow = "auto";
								setTimeout(function () {
									self.previousElementSibling.classList.remove("show");
									self.classList.remove("show");
								}, 127);
							}, false);
						}
					}, reason => {
						console.log(reason)
					});
				}

			}
			else if (this.status == 400) {
				console.log('There was an error 400');
			}
			else {
				console.log('something else other than 200 was returned');
			}
		}

	}

	update() {
		let schedulerRoot = this.eventsRootContainer;
		let days = schedulerRoot.querySelector('.days');
		schedulerRoot.removeChild(days);
		this.weekdaysRootContainer = document.createElement("div");
		this.weekdaysRootContainer.classList.add("days");
		this.startMonth();
		this.weekSchedulerRoot.appendChild(this.weekdaysRootContainer);
	}

	getCurrentMonth() {
		let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		let content = '<span class="selector-title">';
		let current = new Date();
		let weekstart = current.getDate() - current.getDay();
		let sunday = new Date(current.setDate(weekstart));
		let sundayGetMonth;
		let sundayGetDate;

		content += monthNames[current.getMonth()] + ' ' + current.getDate();
		current.setDate(current.getDate() + 6);
		content += ' - ' + monthNames[current.getMonth()] + ' ' + current.getDate();
		content += '</span>';
		content += '<span class="selector-content" tabindex="-1">';

		for (var m=0; m<=5; m++) {
			if (m==0) content += `<span class="active" w-period-week="${sunday}">`;
			content += `<span w-period-week="${sunday}">`;
			content += monthNames[sunday.getMonth()] + ' ' + sunday.getDate();
			sunday.setDate(sunday.getDate() + 6);
			content += ' - ' + monthNames[sunday.getMonth()] + ' ' + sunday.getDate();
			content += '</span>';
			sunday.setDate(sunday.getDate() + 1);
		}
		content += '</span>';
		return content;
	}

	startMonth() {
		let spinner = this.eventsRootContainer.querySelector('.spinner-container');
		spinner.classList.remove('hide');
		this.getJSON( this.getWeekEventsHandler, this.apiUrl, this.eventReqAttrs );
	}

	constructor(root) {
		if (!root) return;
		this.weekSchedulerRoot = root;
		this.getCurrentMonth();
		if (this.weekSchedulerRoot.parentNode.querySelector('.sliderLeftSelector') == null) {
			let leftSelector1 = new SelectorControls(this.weekSchedulerRoot.parentNode, 'sliderLeftSelector', this.getCurrentMonth(), 'w-period', this.update.bind(this));
			let RightSelector1 = new SelectorControls(this.weekSchedulerRoot.parentNode, 'sliderRightSelector', '<span class="selector-title">All Events</span><span class="selector-content" tabindex="-1"><span class="active" w-classificationId="">All Events</span><span w-classificationId="KZFzniwnSyZfZ7v7na">Arts & Theatre</span><span w-classificationId="KZFzniwnSyZfZ7v7nn">Film</span><span w-classificationId="KZFzniwnSyZfZ7v7n1">Miscellaneous</span><span w-classificationId="KZFzniwnSyZfZ7v7nJ">Music</span><span w-classificationId="KZFzniwnSyZfZ7v7nE">Sports</span></span>', 'classificationId', this.update.bind(this));
		}
		if (this.weekSchedulerRoot.querySelector('.days') == null) {
			this.weekdaysRootContainer = document.createElement("div");
			this.weekdaysRootContainer.classList.add("days");
			this.initMessage(this.weekSchedulerRoot);
			this.weekSchedulerRoot.appendChild(this.weekdaysRootContainer);
		}
	}
}
