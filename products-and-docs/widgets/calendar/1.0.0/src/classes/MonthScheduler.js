import SelectorControls from './SelectorControls';

export default class MonthScheduler {

	get apiUrl(){ return "https://app.ticketmaster.com/discovery-widgets/v2/events.json"; }

	get eventReqAttrs(){
		let calendarWidgetRoot = this.monthSchedulerRoot.parentNode.parentNode.parentNode;
		let tmapikey = '',
			latlong = '',
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
					attr: 'size',
					verboseName: 'size'
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
				},
				{
					attr: 'page',
					verboseName: 'page'
				}
			];

		let date = new Date();
		let startmonth, startdate, endmonth, enddate, startDateTime, endDateTime;
		let classificationid = '';
		let countrycode = '';
		let city = '';
		let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
		let lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);

		if (firstDay.getMonth()+1 <=9) startmonth = '0' + (firstDay.getMonth()+1); else startmonth = firstDay.getMonth()+1;
		startdate = '0' + firstDay.getDate();
		if (lastDay.getMonth()+1 <=9) endmonth = '0' + (lastDay.getMonth()+1); else endmonth = lastDay.getMonth()+1;
		enddate = lastDay.getDate();
		startDateTime = firstDay.getFullYear() + '-' + startmonth + '-' + startdate + 'T00:00:00Z';
		endDateTime = lastDay.getFullYear() + '-' + endmonth + '-' + enddate + 'T23:59:59Z';

		if (calendarWidgetRoot.getAttribute("w-period") != 'week') {
			if (calendarWidgetRoot.getAttribute("w-period").length != 7) {
				firstDay =  new Date(date.getFullYear(), date.getMonth(), 1);
				lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
			}
			else {
				firstDay = new Date(calendarWidgetRoot.getAttribute("w-period").substr(0, 4), calendarWidgetRoot.getAttribute("w-period").substr(5, 7), 0);
				lastDay = new Date(calendarWidgetRoot.getAttribute("w-period").substr(0, 4), calendarWidgetRoot.getAttribute("w-period").substr(5, 7), 0);
				firstDay.setDate(new Date(firstDay).getDate() - 1);
				lastDay.setDate(new Date(lastDay).getDate() + 1);
			}
			if (parseInt(firstDay.getMonth()+1) <= 9) startmonth = '0' + parseInt(firstDay.getMonth() + 1); else startmonth = parseInt(firstDay.getMonth() + 1);
			startdate = '0' + firstDay.getDate();
			if (lastDay.getMonth()+1 <= 9) endmonth = '0' + parseInt(lastDay.getMonth() + 1); else endmonth = parseInt(lastDay.getMonth()) + 1;
			if (lastDay.getDate()+1 <= 9) enddate = '0' + parseInt(lastDay.getDate() + 1); else enddate = parseInt(lastDay.getDate()) + 1;

			startDateTime = firstDay.getFullYear() + '-' + startmonth + '-01T00:00:00Z';
			endDateTime = lastDay.getFullYear() + '-' + endmonth + '-' + enddate + 'T23:59:59Z';
		}

		if (calendarWidgetRoot.getAttribute("w-tmapikey") != '') {
			tmapikey = calendarWidgetRoot.getAttribute("w-tmapikey");
			/*
      if (sessionStorage.getItem('tk-api-key')) {
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
			"size": "200",
			"page": 0
		}
	}

	get messageRootContainer(){ return 'monthScheduler'; }

	get hideMessageDelay(){ return 3000; }

	getJSON(handler, url=this.apiUrl, attrs={}, method="GET"){
		attrs = Object.keys(attrs).map(function(key){
			return `${key}=${attrs[key]}`;
		}).join("&");

		url = [url,attrs].join("?");
		let thisSchedulerRoot = this.monthSchedulerRoot.parentNode.parentNode.parentNode;
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

	addScroll() {
		(function(n,t){function u(n){n.hasOwnProperty("data-simple-scrollbar")||Object.defineProperty(n,"data-simple-scrollbar",new SimpleScrollbar(n))}function e(n,i){function f(n){var t=n.pageY-u;u=n.pageY;r(function(){i.el.scrollTop+=t/i.scrollRatio})}function e(){n.classList.remove("ss-grabbed");t.body.classList.remove("ss-grabbed");t.removeEventListener("mousemove",f);t.removeEventListener("mouseup",e)}var u;n.addEventListener("mousedown",function(i){return u=i.pageY,n.classList.add("ss-grabbed"),t.body.classList.add("ss-grabbed"),t.addEventListener("mousemove",f),t.addEventListener("mouseup",e),!1})}function i(n){for(this.target=n,this.bar='<div class="ss-scroll">',this.wrapper=t.createElement("div"),this.wrapper.setAttribute("class","ss-wrapper"),this.el=t.createElement("div"),this.el.setAttribute("class","ss-content"),this.wrapper.appendChild(this.el);this.target.firstChild;)this.el.appendChild(this.target.firstChild);this.target.appendChild(this.wrapper);this.target.insertAdjacentHTML("beforeend",this.bar);this.bar=this.target.lastChild;e(this.bar,this);this.moveBar();this.el.addEventListener("scroll",this.moveBar.bind(this));this.el.addEventListener("mouseenter",this.moveBar.bind(this));this.target.classList.add("ss-container")}function f(){for(var i=t.querySelectorAll("*[ss-container]"),n=0;n<i.length;n++)u(i[n])}var r=n.requestAnimationFrame||n.setImmediate||function(n){return setTimeout(n,0)};i.prototype={moveBar:function(){var t=this.el.scrollHeight,i=this.el.clientHeight,n=this;this.scrollRatio=i/t;r(function(){n.bar.style.cssText="height:"+i/t*100+"%; top:"+n.el.scrollTop/t*100+"%;right:-"+(n.target.clientWidth-n.bar.clientWidth)+"px;"})}};t.addEventListener("DOMContentLoaded",f);i.initEl=u;i.initAll=f;n.SimpleScrollbar=i})(window,document)
		var scrollRoot = document.querySelectorAll(".ss");
		var maxL = scrollRoot.length;
		for (let ml = 0; ml < maxL; ml++) {
			SimpleScrollbar.initEl(scrollRoot[ml]);
		}
	}

	initMessage(schedulerRoot) {
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

	startMonth() {
		let spinner = this.monthSchedulerRoot.querySelector('.spinner-container');
		spinner.classList.remove('hide');
		this.getJSON( this.getMonthEventsHandler, this.apiUrl, this.eventReqAttrs );
	}

	getMonthEventsHandler() {
		let events;
		let place;
		let address;
		let monthEvents = [];
		let widget = this.widget;
		let schedulerRoot = widget.monthSchedulerRoot;
		let calendarWidgetRoot = schedulerRoot.parentNode.parentNode.parentNode;
		let spinner = schedulerRoot.querySelector('.spinner-container');
		let prm = [];
		let url = 'https://app.ticketmaster.com/discovery-widgets/v2/events.json?apikey=aJVApdB1RoA41ejGebe0o4Ai9gufoCbd&latlong=36.1697096,-115.1236952&keyword=&startDateTime=2016-08-01T00:00:00Z&endDateTime=2016-09-02T23:59:59Z&classificationId=&radius=5&size=200&page=0&sort=date,asc';

		if (this && this.readyState == XMLHttpRequest.DONE) {

			if (this.status == 200) {
				events = JSON.parse(this.responseText);

				if (events.page.totalPages <= 1) {

					spinner.classList.add('hide');

					if (events.page.totalElements != 0) {
						let currentMonth = calendarWidgetRoot.getAttribute('w-period').substr(5, 2);
						let currentMonthDef = new Date(calendarWidgetRoot.getAttribute('w-period')).getMonth() + 1;
						if (currentMonthDef <= 9) currentMonthDef = '0' + currentMonthDef;
						if (currentMonth == '') {
							currentMonth = new Date().getMonth() + 1;
							if (parseInt(currentMonth) <= 9) currentMonth = '0' + currentMonth;
						}
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
							if (currentMonth == item.dates.start.localDate.substr(5, 2) || currentMonthDef == item.dates.start.localDate.substr(5, 2)) {
								if (+new Date( +new Date().getFullYear(), +new Date().getMonth(), + new Date().getDate()) <= +new Date(+item.dates.start.localDate.split('-')[0],(+item.dates.start.localDate.split('-')[1])-1,+item.dates.start.localDate.split('-')[2])) {
									monthEvents.push({
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
						monthEvents[0] = ({
							date: '',
							time: '',
						});
						widget.showMessage("No results were found.<br/>Here other options for you.");
						widget.hideMessageWithDelay(widget.hideMessageDelay);
					}

					let monthEventsSort = {};
					let eventsArr = [];
					let tDate = '';

					if (monthEvents[0]) {
						tDate = monthEvents[0].date;
					}
					else {
						tDate = '';
					}

					for (let e = 0, l = monthEvents.length; e < l; e++) {
						if (tDate == monthEvents[e].date) {
							eventsArr.push(monthEvents[e]);
							let day = tDate.toString().substr(8,2);
							if (day.substr(0,1) == '0') day = day.substr(1,1);
							monthEventsSort[day] = monthEvents[e];
						}
						else {
							let day = tDate.toString().substr(8,2);
							if (day.substr(0,1) == '0') day = day.substr(1,1);
							monthEventsSort[day] = eventsArr;
							eventsArr = [];
							eventsArr.push(monthEvents[e]);
						}
						tDate = monthEvents[e].date;

						if (eventsArr.lenght != 0) {
							let dayNo = eventsArr[0].date.substr(8,2);
							if (dayNo.substr(0,1) == '0') dayNo = dayNo.substr(1,1);
							monthEventsSort[dayNo] = eventsArr;
						}
					}

					let calendarClass = 'calendar';
					let year = new Date().getFullYear();
					let month = new Date().getMonth() + 1;


					if (calendarWidgetRoot.getAttribute("w-period") != 'week') {
						if (calendarWidgetRoot.getAttribute("w-period").length == 7) {
							year = calendarWidgetRoot.getAttribute("w-period").substr(0, 4);
							month = calendarWidgetRoot.getAttribute("w-period").substr(5, 7);
						}
					}

					var elem = schedulerRoot.getElementsByClassName(calendarClass)[0];
					var mon = parseInt(month) - 1;
					var d = new Date(year, mon);
					var table = '<table><tr><th>s</th><th>m</th><th>t</th><th>w</th><th>t</th><th>f</th><th>s</th></tr><tr>';
					var tmpD = new Date(year, mon);
					var outEnd = [];
					for (var i = 0; i < d.getDay(); i++) {
						tmpD.setDate(tmpD.getDate() - 1);
						outEnd[i] = '<td class="dis">' + tmpD.getDate() + '</td>';
					}
					outEnd.reverse();
					table += outEnd.join('');
					let tableRowMonth = 0;
					let tail_ = 'tail';
					let popup_ = 'popup ';
					let notFound = true;

					while (d.getMonth() == mon) {
						table += '<td';
						if (new Date().getMonth() == d.getMonth() && new Date().getDate() == d.getDate()) table += ' class="today"';
						table += '>';
						if (monthEventsSort[d.getDate()] != undefined) {
							let eventsCount = monthEventsSort[d.getDate()].length;
							if (eventsCount === undefined) eventsCount = 1;
							table += '<span class="round-holder"><span class="round">' + d.getDate();
							if (eventsCount > 1) table += '<span class="count">' + eventsCount + '</span>';
							table += '</span></span>';

							table += '<span class="' + tail_ + '"></span>';
							table += '<div class="' + popup_ + ' ';
							if (eventsCount == 1) table += 'single ';
							table += 'ss" tabindex="-1">';

							table += '<div class="ss-container">';

							let url, img, name, datetime, place, eventsLenght;

							if (monthEventsSort[d.getDate()].length == undefined) eventsLenght = 1;
							else eventsLenght = monthEventsSort[d.getDate()].length;

							for(let e=0, l = eventsLenght; e < l; e++) {
								if (monthEventsSort[d.getDate()] && monthEventsSort[d.getDate()][e]) {
									url = monthEventsSort[d.getDate()][e].url;
									img = monthEventsSort[d.getDate()][e].img;
									name = monthEventsSort[d.getDate()][e].name;
									datetime = monthEventsSort[d.getDate()][e].datetime;
									place = monthEventsSort[d.getDate()][e].place;
								}
								else {
									url = monthEventsSort[d.getDate()].url;
									img = monthEventsSort[d.getDate()].img;
									name = monthEventsSort[d.getDate()].name;
									datetime = monthEventsSort[d.getDate()].datetime;
									place = monthEventsSort[d.getDate()].place;
								}
								table += '<span class="event">';
								table += '<span class="event-holder">';
								table += '<a href="' + url + '" target="_blank">';
								if (img !=='' && img.length !== 0){
									table += '<span class="img bg-cover-default" style="background: url(' + img + ') center center no-repeat"></span>'
								}else{ table += '<span class="img bg-cover-default" ></span>';}
								table += '<span class="name">' + name + '</span>';
								table += '</a>';
								table += '<span class="date">' + datetime + '</span>';
								table += '<span class="place">' + place + '</span>';
								table += '</span>';
								table += '</span>';
								notFound = false;
							}

							table += '</div>';
							table += '</div>';
						}
						else {
							table += d.getDate();
						}
						table += '</td>';

						if (d.getDay() % 7 == 6) {
							tableRowMonth++;
							if (tableRowMonth > 1) {
								tail_ = 'tail-up';
								popup_ = 'popup-up ';
							}
							table += '</tr><tr>';
						}

						d.setDate(d.getDate() + 1);
					}
					if (d.getDay() != 0) {
						d.setDate(d.getDate() - 1);
						for (var i = d.getDay(); i < 6; i++) {
							d.setDate(d.getDate() + 1);
							table += '<td class="dis">' + d.getDate() + '</td>';
						}
					}
					table += '</tr></table><span class="month-update"></span>';

					elem.innerHTML = table;
					widget.addScroll();

					if (notFound === true) {
						widget.showMessage("No results were found.<br/>Here other options for you.");
						widget.hideMessageWithDelay(widget.hideMessageDelay);
					}

				}
				else {
					monthEvents = [];
					let monthEventsConcat = [];
					let l = parseInt(events.page.totalPages)-1;
					for (i = 0; i <= l; i++) {
						let attrs = widget.eventReqAttrs;
						attrs.page = i;
						attrs = Object.keys(attrs).map(function (key) {
							return `${key}=${attrs[key]}`;
						}).join("&");
						let url;
						url= widget.apiUrl + [url, attrs].join("?");
						let thisSchedulerRoot = widget.monthSchedulerRoot.parentNode.parentNode.parentNode;
						if (thisSchedulerRoot.getAttribute('w-postalcodeapi') != null) url += '&postalCode=' + thisSchedulerRoot.getAttribute('w-postalcodeapi');
						url += '&sort=date,asc';
						prm.push(widget.getJsonAsync(url));
					}

					Promise.all(prm).then(value => {
						spinner.classList.add('hide');
						let le = value.length + 1;
						var curMonth;
						if (calendarWidgetRoot.getAttribute("w-period") == 'week') {
							curMonth = new Date().getMonth() + 1;
						}
						else {
							if (calendarWidgetRoot.getAttribute("w-period").substr(5, 1) == '0') {
								curMonth = calendarWidgetRoot.getAttribute("w-period").substr(6, 1);
							}
							else {
								curMonth = calendarWidgetRoot.getAttribute("w-period").substr(5, 2);
							}
						}
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
									if (item.hasOwnProperty('images')) {
										item.images.forEach(function (img, i) {
											if (i == 0) imgWidth = img.width;
											if (imgWidth > img.width) {
												imgWidth = img.width;
												index = i;
											}
										});
									}
									let newDate = item.dates.start.localDate.substr(5,2);
									if (parseInt(curMonth) === parseInt(newDate))  {
										if (+new Date( +new Date().getFullYear(), +new Date().getMonth(), +new Date().getDate()) <= +new Date(+item.dates.start.localDate.split('-')[0],(+item.dates.start.localDate.split('-')[1])-1,+item.dates.start.localDate.split('-')[2])) {
											monthEvents.push({
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
						}
						monthEventsConcat.push(monthEvents);
						monthEvents = monthEventsConcat[0];

						let monthEventsSort = {};
						let eventsArr = [];
						let tDate = '';
						if (monthEvents[0]) {
							tDate = monthEvents[0].date;
						}
						else {
							tDate = '';
						}

						for (let e = 0, l = monthEvents.length; e < l; e++) {
							if (tDate == monthEvents[e].date) {
								eventsArr.push(monthEvents[e]);
								let day = tDate.toString().substr(8,2);
								if (day.substr(0,1) == '0') day = day.substr(1,1);
								monthEventsSort[day] = monthEvents[e];
							}
							else {
								let day = tDate.toString().substr(8,2);
								if (day.substr(0,1) == '0') day = day.substr(1,1);
								monthEventsSort[day] = eventsArr;
								eventsArr = [];
								eventsArr.push(monthEvents[e]);
							}
							tDate = monthEvents[e].date;

							if (eventsArr.lenght != 0) {
								let dayNo = eventsArr[0].date.substr(8,2);
								if (dayNo.substr(0,1) == '0') dayNo = dayNo.substr(1,1);
								monthEventsSort[dayNo] = eventsArr;
							}
						}

						let calendarClass = 'calendar';
						let year = new Date().getFullYear();
						let month = new Date().getMonth() + 1;


						if (calendarWidgetRoot.getAttribute("w-period") != 'week') {
							if (calendarWidgetRoot.getAttribute("w-period").length == 7) {
								year = calendarWidgetRoot.getAttribute("w-period").substr(0, 4);
								month = calendarWidgetRoot.getAttribute("w-period").substr(5, 7);
							}
						}

						var elem = schedulerRoot.getElementsByClassName(calendarClass)[0];
						var mon = parseInt(month) - 1;
						var d = new Date(year, mon);
						var table = '<table><tr><th>s</th><th>m</th><th>t</th><th>w</th><th>t</th><th>f</th><th>s</th></tr><tr>';
						var tmpD = new Date(year, mon);
						var outEnd = [];
						for (var i = 0; i < d.getDay(); i++) {
							tmpD.setDate(tmpD.getDate() - 1);
							outEnd[i] = '<td class="dis">' + tmpD.getDate() + '</td>';
						}
						outEnd.reverse();
						table += outEnd.join('');
						let tableRowMonth = 0;
						let tail_ = 'tail';
						let popup_ = 'popup ';

						while (d.getMonth() == mon) {
							table += '<td';
							if (new Date().getMonth() == d.getMonth() && new Date().getDate() == d.getDate()) table += ' class="today"';
							table += '>';
							if (monthEventsSort[d.getDate()] != undefined) {
								let eventsCount = monthEventsSort[d.getDate()].length;
								if (eventsCount === undefined) eventsCount = 1;
								table += '<span class="round-holder"><span class="round">' + d.getDate();
								if (eventsCount > 1) table += '<span class="count">' + eventsCount + '</span>';
								table += '</span></span>';
								table += '<span class="' + tail_ + '"></span>';
								table += '<div class="' + popup_ + ' ';
								if (eventsCount == 1) table += 'single ';
								table += 'ss" tabindex="-1">';

								table += '<div class="ss-container">';

								let url, img, name, datetime, place, eventsLenght;

								if (monthEventsSort[d.getDate()].length == undefined) eventsLenght = 1;
								else eventsLenght = monthEventsSort[d.getDate()].length;

								for(let e=0, l = eventsLenght; e < l; e++) {
									if (monthEventsSort[d.getDate()] && monthEventsSort[d.getDate()][e]) {
										url = monthEventsSort[d.getDate()][e].url;
										img = monthEventsSort[d.getDate()][e].img;
										name = monthEventsSort[d.getDate()][e].name;
										datetime = monthEventsSort[d.getDate()][e].datetime;
										place = monthEventsSort[d.getDate()][e].place;
									}
									else {
										url = monthEventsSort[d.getDate()].url;
										img = monthEventsSort[d.getDate()].img;
										name = monthEventsSort[d.getDate()].name;
										datetime = monthEventsSort[d.getDate()].datetime;
										place = monthEventsSort[d.getDate()].place;
									}
									table += '<span class="event">';
									table += '<span class="event-holder">';
									table += '<a href="' + url + '" target="_blank">';
									if (img !=='' && img.length !== 0){
										table += '<span class="img bg-cover-default" style="background: url(' + img + ') center center no-repeat"></span>'
									}else{ table += '<span class="img bg-cover-default" ></span>';}
									table += '<span class="name">' + name + '</span>';
									table += '</a>';
									table += '<span class="date">' + datetime + '</span>';
									table += '<span class="place">' + place + '</span>';
									table += '</span>';
									table += '</span>';
								}

								table += '</div>';
								table += '</div>';
							}
							else {
								table += d.getDate();
							}
							table += '</td>';

							if (d.getDay() % 7 == 6) {
								tableRowMonth++;
								if (tableRowMonth > 1) {
									tail_ = 'tail-up';
									popup_ = 'popup-up ';
								}
								table += '</tr><tr>';
							}

							d.setDate(d.getDate() + 1);
						}
						if (d.getDay() != 0) {
							d.setDate(d.getDate() - 1);
							for (var i = d.getDay(); i < 6; i++) {
								d.setDate(d.getDate() + 1);
								table += '<td class="dis">' + d.getDate() + '</td>';
							}
						}
						table += '</tr></table><span class="month-update"></span>';
						elem.innerHTML = table;
						widget.addScroll();


						var rounds = schedulerRoot.querySelectorAll("span.round-holder");
						for (var x = 0; x < rounds.length; x++) {
							rounds[x].addEventListener("click", function (e) {
								this.classList.add("active");
								this.nextElementSibling.classList.add("show");
								this.nextElementSibling.nextElementSibling.classList.add("show");
								this.nextElementSibling.nextElementSibling.focus();
							}, false);
						}

						var popups = schedulerRoot.querySelectorAll(".popup, .popup-up");
						for (var y = 0; y < popups.length; y++) {
							popups[y].addEventListener("blur", function (e) {
								let self = this;
								setTimeout(function () {
									self.previousElementSibling.classList.remove("show");
									self.classList.remove("show");
									self.previousElementSibling.previousElementSibling.classList.remove('active');
								}, 127);
							}, false);
						}

						var monthUpdate = schedulerRoot.getElementsByClassName('month-update')[0];
						if (monthUpdate != null) {
							monthUpdate.addEventListener('click', function () {
								widget.update();
							});
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

		var rounds = schedulerRoot.querySelectorAll("span.round-holder");
		for (var x = 0; x < rounds.length; x++) {
			rounds[x].addEventListener("click", function (e) {
				this.classList.add("active");
				this.nextElementSibling.classList.add("show");
				this.nextElementSibling.nextElementSibling.classList.add("show");
				this.nextElementSibling.nextElementSibling.focus();
			}, false);
		}

		var popups = schedulerRoot.querySelectorAll(".popup, .popup-up");
		for (var y = 0; y < popups.length; y++) {
			popups[y].addEventListener("blur", function (e) {
				let self = this;
				setTimeout(function () {
					self.previousElementSibling.classList.remove("show");
					self.classList.remove("show");
					self.previousElementSibling.previousElementSibling.classList.remove('active');
				}, 127);
			}, false);
		}

		var monthUpdate = schedulerRoot.getElementsByClassName('month-update')[0];
		if (monthUpdate != null) {
			monthUpdate.addEventListener('click', function () {
				widget.update();
			});
		}

	}

	getMonthes() {
		var MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		let year = new Date().getFullYear();
		let month = new Date().getMonth();
		let nowMonth = new Date().getMonth();
		let nowMonthTmp = nowMonth;
		let calendarWidgetRoot = this.monthSchedulerRoot.parentNode.parentNode.parentNode;

		if (calendarWidgetRoot.getAttribute("w-period") != 'week') {

			if (calendarWidgetRoot.getAttribute("w-period").length != 7) {
				year =  new Date().getFullYear();
				month = new Date().getMonth() + 1;
				if (month <= 9) month = '0' + month;
				nowMonth = new Date().getMonth();
			}
			else {
				year = calendarWidgetRoot.getAttribute("w-period").substr(0,4);
				month = calendarWidgetRoot.getAttribute("w-period").substr(5,2);
				nowMonth = calendarWidgetRoot.getAttribute("w-period").substr(5,2);
				if (calendarWidgetRoot.getAttribute("w-period").substr(5,1) == '0') nowMonth = calendarWidgetRoot.getAttribute("w-period").substr(6,1);
				nowMonth = parseInt(nowMonth - 1);
			}
			nowMonthTmp = nowMonth;
			if (new Date().getFullYear() != year) {
				nowMonth = 0;
			}
			else {
				nowMonth = new Date().getMonth();
			}
		}

		let content = '';
		content += '<span class="selector-title">' + MONTH_NAMES[nowMonthTmp]+ '</span>';
		content += '<span class="selector-content" tabindex="-1">';

		let countMonth = 11;
		if (new Date().getFullYear() != year) countMonth = 6;
		for (let i = nowMonth; i<=countMonth; i++) {
			content += '<span ';
			if (i == nowMonth) content += 'class="active" ';
			if (i < 9) month = '0' + parseInt(i+1); else month = parseInt(i+1);
			content += 'w-period="' + year + '-' + month + '">' + MONTH_NAMES[i] + '</span>';
		}
		content += '</span>';
		return content;
	}

	getCategories() {
		let calendarWidgetRoot = this.monthSchedulerRoot.parentNode.parentNode.parentNode;
		let active = calendarWidgetRoot.getAttribute('w-classificationid');
		let activeId = calendarWidgetRoot.getAttribute('w-classificationid');
		switch (active) {
			case 'KZFzniwnSyZfZ7v7na':
				active = 'Arts & Theatre';
				break
			case 'KZFzniwnSyZfZ7v7nn':
				active = 'Film';
				break
			case 'KZFzniwnSyZfZ7v7n1':
				active = 'Miscellaneous';
				break
			case 'KZFzniwnSyZfZ7v7nJ':
				active = 'Music';
				break
			case 'KZFzniwnSyZfZ7v7nE':
				active = 'Sports';
				break
			default:
				active = 'All Events';
		}
		let content = '<span class="selector-title" w-classificationid="' + activeId + '">';
		content += active;
		content += '</span>';
		content += '<span class="selector-content" tabindex="-1">';
		content += '<span class="active" w-classificationId="">All Events</span>';
		content += '<span w-classificationId="KZFzniwnSyZfZ7v7na">Arts & Theatre</span>';
		content += '<span w-classificationId="KZFzniwnSyZfZ7v7nn">Film</span>';
		content += '<span w-classificationId="KZFzniwnSyZfZ7v7n1">Miscellaneous</span>';
		content += '<span w-classificationId="KZFzniwnSyZfZ7v7nJ">Music</span>';
		content += '<span w-classificationId="KZFzniwnSyZfZ7v7nE">Sports</span>';
		content += '</span>';
		return content;
	}

	update() {
		let schedulerRoot = this.monthSchedulerRoot;
		let delLeftselector = schedulerRoot.parentNode.getElementsByClassName('sliderLeftSelector')[0];
		delLeftselector.parentElement.removeChild(delLeftselector);
		let delRightselector = schedulerRoot.parentNode.getElementsByClassName('sliderRightSelector')[0];
		delRightselector.parentElement.removeChild(delRightselector);

		let leftSelector = new SelectorControls(schedulerRoot.parentNode, 'sliderLeftSelector', this.getMonthes(), 'period', this.update.bind(this));
		let RightSelector = new SelectorControls(schedulerRoot.parentNode, 'sliderRightSelector', this.getCategories(), 'classificationId', this.update.bind(this));
		let month = schedulerRoot.getElementsByClassName('calendar')[0];
		schedulerRoot.removeChild(month);
		this.monthRootContainer = document.createElement("div");
		this.monthRootContainer.classList.add("calendar");
		schedulerRoot.appendChild(this.monthRootContainer);
		this.startMonth();
	}

	constructor(root) {
		if (!root) return;
		this.monthSchedulerRoot = root;
		if (this.monthSchedulerRoot.parentNode.querySelector('.sliderLeftSelector') == null) {
			let leftSelector = new SelectorControls(this.monthSchedulerRoot.parentNode, 'sliderLeftSelector', this.getMonthes(), 'period', this.update.bind(this));
			let RightSelector = new SelectorControls(this.monthSchedulerRoot.parentNode, 'sliderRightSelector', this.getCategories(), 'classificationId', this.update.bind(this));
		}
		if (this.monthSchedulerRoot.querySelector('.calendar') == null) {
			this.initMessage(this.monthSchedulerRoot);
			this.calendarRootContainer = document.createElement("div");
			this.calendarRootContainer.classList.add("calendar");
			this.monthSchedulerRoot.appendChild(this.calendarRootContainer);
		}
	}


}
