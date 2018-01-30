import SelectorControls from './SelectorControls'

export default class TicketmasterCalendarWidget {

	set config(attrs) { this.widgetConfig = this.loadConfig(attrs); }

	get config() { return this.widgetConfig; }

	set events(responce){ this.eventsList = this.parseEvents(responce);}

	get events(){ return this.eventsList;}

	get borderSize(){ return this.config.border || 0;}

	get widgetHeight(){ return this.config.height || 600;}

	get widgetContentHeight() {
		/* return this.widgetHeight - (this.isListView || this.isSimpleProportionM ? 0 : 39) || 600; */
		return this.widgetHeight - 70;
	}

	get eventUrl(){ return "http://www.ticketmaster.com/event/"; }

	get apiUrl(){ return "https://app.ticketmaster.com/discovery-widgets/v2/events.json"; }

	get themeUrl() {
		return (window.location.host === 'developer.ticketmaster.com')
			? `https://developer.ticketmaster.com/products-and-docs/widgets/calendar/1.0.0/theme/`
			: `https://ticketmaster-api-staging.github.io/products-and-docs/widgets/calendar/1.0.0/theme/`;
	}

	get portalUrl(){
		return (window.location.host === 'developer.ticketmaster.com')
			? `https://developer.ticketmaster.com/`
			: `https://ticketmaster-api-staging.github.io/`;
	}

	get logoUrl() { return "http://www.ticketmaster.com/"; }

	get legalNoticeUrl() { return "https://developer.ticketmaster.com/support/terms-of-use/"; }

	get questionUrl() { return "https://developer.ticketmaster.com/support/faq/"; }

	get widgetVersion() { return `1.0.80`; }

	get geocodeUrl() { return "https://maps.googleapis.com/maps/api/geocode/json"; }

	get updateExceptions() { return ["width", "height", "border", "borderradius", "colorscheme", "layout", "affiliateid", "propotion", "googleapikey"]}

	get sliderDelay(){ return 5000; }

	get sliderRestartDelay(){ return 5000; }

	get hideMessageDelay(){ return 5000; }

	get controlHiddenClass(){ return "events_control-hidden"; }

	get tmWidgetWhiteList(){ return ["2200504BAD4C848F", "00005044BDC83AE6", "1B005068DB60687F", "1B004F4DBEE45E47", "3A004F4ED7829D5E", "3A004F4ED1FC9B63", "1B004F4FF83289C5", "1B004F4FC0276888", "0E004F4F3B7DC543", "1D004F4F09C61861", "1600505AC9A972A1", "22004F4FD82795C6", "01005057AFF54574", "01005056FAD8793A", "3A004F4FB2453240", "22004F50D2149AC6", "01005059AD49507A", "01005062B4236D5D"]; }

	get countriesWhiteList() {
		return [
			'Australia',
			'Austria',
			'Belgium',
			'Canada',
			'Denmark',
			'Finland',
			'France',
			'Germany',
			'Ireland',
			'Mexico',
			'Netherlands',
			'New Zealand',
			'Norway',
			'Spain',
			'Sweden',
			'Turkey',
			'UAE',
			'United Kingdom',
			'United States'
		]
	}

	isConfigAttrExistAndNotEmpty(attr) {
		if( !this.config.hasOwnProperty(attr) || this.config[attr] === "undefined"){
			return false;
		}else if( this.config[attr] === ""){
			return false;
		}
		return true;
	}

	get eventReqAttrs(){
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

		for(let i in params){
			let item = params[i];
			if(this.isConfigAttrExistAndNotEmpty(item.attr))
				attrs[item.verboseName] = this.config[item.attr];
		}

		// Only one allowed at the same time
		if(this.config.latlong){
			attrs.latlong = this.config.latlong;
			if (this.widgetRoot.getAttribute('w-postalcodeapi') != null) {
				this.config.latlong = '';
			}
			if (this.widgetRoot.getAttribute('w-latlong') != null && this.widgetRoot.getAttribute('w-latlong') != '34.0390107,-118.2672801') {
				attrs.latlong = this.widgetRoot.getAttribute('w-latlong');
				attrs.postalCode = '';
				this.config.postalcode = '';
			}
		} else {
			if(this.isConfigAttrExistAndNotEmpty("postalcode"))
				attrs.postalCode = this.config.postalcode;
		}

		if (this.config.countrycode != null) {
			attrs.latlong = '';
			this.config.latlong = '';
			this.widgetRoot.setAttribute('w-latlong', '');
		}

		if(this.isConfigAttrExistAndNotEmpty("period")){
			let period = this.getDateFromPeriod(this.config.period);
			attrs.startDateTime = period[0];
			attrs.endDateTime = period[1];
		}

		if (this.config.period != 'week') {
			let period_ = new Date(this.config.period);
			let firstDay = new Date(period_);
			let lastDay = new Date(period_);
			firstDay.setDate(firstDay.getDate() + 1);
			lastDay.setDate(lastDay.getDate() + 1);
			firstDay.setHours(0);   lastDay.setHours(23);
			firstDay.setMinutes(0); lastDay.setMinutes(59);
			firstDay.setSeconds(0); lastDay.setSeconds(59);
			attrs.startDateTime = this.toShortISOString(firstDay);
			attrs.endDateTime = this.toShortISOString(lastDay);
		}

		return attrs;
	}

	constructor(root) {
		if(!root) return;
		this.widgetRoot = root;

		if (this.widgetRoot.querySelector('.tabs-container') != null) return;

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

		let leftSelector = new SelectorControls(this.tab1RootContainer, 'sliderLeftSelector', this.getCurrentWeek(), 'period', this.update.bind(this));
		let RightSelector = new SelectorControls(this.tab1RootContainer, 'sliderRightSelector', '<span class="selector-title">All Events</span><span class="selector-content" tabindex="-1"><span class="active" w-classificationId="">All Events</span><span w-classificationId="KZFzniwnSyZfZ7v7na">Arts & Theatre</span><span w-classificationId="KZFzniwnSyZfZ7v7nn">Film</span><span w-classificationId="KZFzniwnSyZfZ7v7n1">Miscellaneous</span><span w-classificationId="KZFzniwnSyZfZ7v7nJ">Music</span><span w-classificationId="KZFzniwnSyZfZ7v7nE">Sports</span></span>', 'classificationId', this.update.bind(this));

		this.tab2RootContainer = document.createElement("div");
		this.tab2RootContainer.classList.add("tab");
		this.tab2RootContainer.innerHTML = '<div class="weekSсheduler"><div class="spinner-container"><div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div></div>';
		this.tabsRootContainer.appendChild(this.tab2RootContainer);
		this.eventLogoBox = document.createElement("div");
		this.eventLogoBox.classList.add("event-logo-box-c");
		this.eventLogoBox.innerHTML = '<a class="event-logo-c" target="_blank" href="http://www.ticketmaster.com/">Powered by</a>';
		this.tab2RootContainer.appendChild(this.eventLogoBox);


		this.tab3RootContainer = document.createElement("div");
		this.tab3RootContainer.classList.add("tab");
		this.tab3RootContainer.innerHTML = '<div class="monthScheduler"><div class="spinner-container"><div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div></div>';
		this.tabsRootContainer.appendChild(this.tab3RootContainer);
		this.eventLogoBox = document.createElement("div");
		this.eventLogoBox.classList.add("event-logo-box-c");
		this.eventLogoBox.innerHTML = '<a class="event-logo-c" target="_blank" href="http://www.ticketmaster.com/">Powered by</a>';
		this.tab3RootContainer.appendChild(this.eventLogoBox);

		this.tab4RootContainer = document.createElement("div");
		this.tab4RootContainer.classList.add("tab");
		this.tab4RootContainer.innerHTML = '<div class="yearScheduler"><div class="spinner-container"><div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div></div>';
		this.tabsRootContainer.appendChild(this.tab4RootContainer);
		this.eventLogoBox = document.createElement("div");
		this.eventLogoBox.classList.add("event-logo-box-c");
		this.eventLogoBox.innerHTML = '<a class="event-logo-c" target="_blank" href="http://www.ticketmaster.com/">Powered by</a>';
		this.tab4RootContainer.appendChild(this.eventLogoBox);

		this.eventsRootContainer = document.createElement("div");
		this.eventsRootContainer.classList.add("events-root-container");
		this.eventsRootContainer.innerHTML = '<div class="spinner-container"><div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div></div>';
		this.tab1RootContainer.appendChild(this.eventsRootContainer);

		this.eventsRoot = document.createElement("ul");
		this.eventsRoot.classList.add("events-root");
		this.eventsRootContainer.appendChild(this.eventsRoot);

		this.config = this.widgetRoot.attributes;

		if(this.config.theme !== null && !document.getElementById(`widget-theme-${this.config.theme}`)){
			this.makeRequest( this.styleLoadingHandler, this.themeUrl + this.config.theme + ".css" );
		}

		this.eventsRootContainer.classList.remove("border");
		if(this.config.border){
			this.eventsRootContainer.classList.add("border");
		}

		this.widgetRoot.style.height = `${this.widgetHeight}px`;
		this.widgetRoot.style.width  = `${this.config.width}px`;

		this.eventsRootContainer.style.height = `${this.widgetContentHeight}px`;
		this.eventsRootContainer.style.width  = `${this.config.width}px`;
		this.eventsRootContainer.style.borderWidth = `0`;
		this.widgetRoot.style.borderRadius = `${this.config.borderradius}px`;
		this.widgetRoot.style.borderWidth = `${this.borderSize}px`;

		this.loadCustomStyle();

		this.AdditionalElements();

		this.getCoordinates(() => {
			this.makeRequest( this.eventsLoadingHandler, this.apiUrl, this.eventReqAttrs );
		});

		/*plugins for 'buy button'*/
		this.embedUniversePlugin();
		this.embedTMPlugin();

		this.initBuyBtn();

		this.initMessage();

		this.initSliderControls();

		/* if (!this.isListView) this.initEventCounter(); */
	}

	getCurrentWeek() {
		let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		let content = '<span class="selector-title">';
		let today = new Date();
		let todayTmp = new Date();
		content += monthNames[today.getMonth()] + ' ' + today.getDate();
		content += '</span>';
		content += '<span class="selector-content" tabindex="-1">';

		for (var d=0; d<=6; d++) {
			todayTmp.setDate(today.getDate() + d);
			if (d == 0) content += `<span class="active" w-period="${todayTmp}">`;
			else content += `<span w-period="${todayTmp}">`;
			content += monthNames[todayTmp.getMonth()] + ' ' + todayTmp.getDate();
			content += '</span>';
			todayTmp = new Date();
		}
		content += '</span>';
		return content;
	}

	getCoordinates(cb){
		let widget = this;

		function parseGoogleGeocodeResponse(){
			if (this && this.readyState === XMLHttpRequest.DONE ) {
				let latlong = '',
					results = null,
					countryShortName = '';
				if(this.status === 200) {
					let response = JSON.parse(this.responseText);
					if (response.status === 'OK' && response.results.length) {
						// Filtering only white list countries
						results = response.results.filter((item) => {
							return widget.countriesWhiteList.filter((elem) => {
								return elem === item.address_components[item.address_components.length - 1].long_name;
							}).length > 0;
						});

						if (results.length) {
							// sorting results by country name
							results.sort((f, g) => {
								let a = f.address_components[f.address_components.length - 1].long_name;
								let b = g.address_components[g.address_components.length - 1].long_name;
								if (a > b) {
									return 1;
								}
								if (a < b) {
									return -1;
								}
								return 0;
							});

							// Use first item if multiple results was found in one country or in different
							let geometry = results[0].geometry;
							countryShortName = results[0].address_components[results[0].address_components.length - 1].short_name;

							// If multiple results without country try to find USA as prefer value
							if (!widget.config.country) {
								for (let i in results) {
									let result = results[i];
									if (result.address_components) {
										let country = result.address_components[result.address_components.length - 1];
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
									latlong = `${geometry.location.lat},${geometry.location.lng}`;
								}
							}
						} else {
							results = null;
						}
					}
				}
				if(widget.onLoadCoordinate) widget.onLoadCoordinate(results, countryShortName);
				widget.config.latlong = latlong;
				if (widget.config.latlong == null) widget.config.latlong = "34.0390107,-118.2672801";
				if (document.querySelector('[w-type="calendar"]').getAttribute("w-country") != null) {
					widget.config.latlong = '';
					latlong = '';
				};
				cb(widget.config.latlong);
				document.querySelector('[w-type="calendar"]').setAttribute("w-latlong", latlong);
			}
		}

		if(this.isConfigAttrExistAndNotEmpty('postalcode')){
			let args = {language: 'en', components: `postal_code:${widget.config.postalcode}`};
			if(widget.config.googleapikey) args.key = widget.config.googleapikey;
			if(this.config.country) args.components += `|country:${this.config.country}`;
			this.makeRequest( parseGoogleGeocodeResponse, this.geocodeUrl, args);
		}else{
			// Used in builder
			if(widget.onLoadCoordinate) widget.onLoadCoordinate(null);
			widget.config.latlong = '34.0390107,-118.2672801';
			widget.config.country = 'US';
			cb(widget.config.latlong);
		}
	}

	initBuyBtn(){
		this.buyBtn = document.createElement("a");
		this.buyBtn.appendChild(document.createTextNode('BUY NOW'));
		this.buyBtn.classList.add("event-buy-btn");
		this.buyBtn.classList.add("main-btn");
		this.buyBtn.target = '_blank';
		this.buyBtn.href = '';
		this.buyBtn.setAttribute('onclick', "ga('send', 'event', 'DiscoveryClickBuyButton', 'click');");
		this.buyBtn.addEventListener('click', (e)=> {
			e.preventDefault(); /*used in plugins for 'buy button'*/
			this.stopAutoSlideX();
		});
		this.eventsRootContainer.appendChild(this.buyBtn);
	}

	setBuyBtnUrl(){
		let eLogo = this.widgetRoot.querySelector('.tab').querySelector('.event-logo');
		if(this.buyBtn){
			let event = this.eventsGroups[this.currentSlideX][this.currentSlideY],
				url = '';
			if(event){
				if(event.url){

					if((this.isUniversePluginInitialized && this.isUniverseUrl(event.url)) || (this.isTMPluginInitialized && this.isAllowedTMEvent(event.url))){
						url = event.url;
						eLogo.classList.remove('centered-logo');
						eLogo.classList.add('right-logo');
					}
					else {
						eLogo.classList.remove('right-logo');
						eLogo.classList.add('centered-logo');
					}

				}
			}
			this.buyBtn.href = url;
		}
	}

	isUniverseUrl(url){
		return (url.match(/universe.com/g) || url.match(/uniiverse.com/g));
	}

	isAllowedTMEvent(url){
		for (var t = [/(?:ticketmaster\.com)\/(.*\/)?event\/([^\/?#]+)/, /(?:concerts\.livenation\.com)\/(.*\/)?event\/([^\/?#]+)/], n = null, r = 0; r < t.length && (n = url.match(t[r]), null === n); r++);
		let id = (null !== n ? n[2] : void 0);
		return (this.tmWidgetWhiteList.indexOf(id) > -1);
	}

	embedTMPlugin(){
		let id = 'id_tm_widget';
		if( !document.getElementById(id) ) {
			let script = document.createElement('script');
			script.setAttribute('src', this.portalUrl + 'scripts/vendors/tm.js');
			script.setAttribute('type', 'text/javascript');
			script.setAttribute('charset', 'UTF-8');
			script.setAttribute('id', id);
			(document.head || document.getElementsByTagName('head')[0]).appendChild(script);
		}
		this.isTMPluginInitialized = true;
	}

	embedUniversePlugin(){
		let id = 'id_universe_widget';
		if( !document.getElementById(id) ){
			let script = document.createElement('script');
			script.setAttribute('src', 'https://www.universe.com/embed.js');
			script.setAttribute('type', 'text/javascript');
			script.setAttribute('charset', 'UTF-8');
			script.setAttribute('id', id);
			(document.head || document.getElementsByTagName('head')[0]).appendChild(script);
		}
		this.isUniversePluginInitialized = true;
	}

	initMessage(){
		this.messageDialog = document.createElement('div');
		this.messageDialog.classList.add("event-message");
		this.messageContent = document.createElement('div');
		this.messageContent.classList.add("event-message__content");

		let messageClose = document.createElement('div');
		messageClose.classList.add("event-message__btn");
		messageClose.addEventListener("click", ()=> {
			this.hideMessage();
		});

		this.messageDialog.appendChild(this.messageContent);
		this.messageDialog.appendChild(messageClose);
		this.eventsRootContainer.appendChild(this.messageDialog);
	}

	showMessage(message, hideMessageWithoutDelay){
		if(message.length){
			this.hideMessageWithoutDelay = hideMessageWithoutDelay;
			this.messageContent.innerHTML = message;
			this.messageDialog.classList.add("event-message-visible");
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
		this.messageDialog.classList.remove("event-message-visible");
	}

	AdditionalElements(){
		var logo = document.createElement('a');
		logo.classList.add("event-logo");
		logo.classList.add("centered-logo");
		logo.target = '_blank';
		logo.href = this.logoUrl;
		logo.innerHTML = 'Powered by';

		var logoBox = document.createElement('div');
		logoBox.classList.add("event-logo-box");
		logoBox.appendChild(logo);
		this.eventsRootContainer.appendChild(logoBox);

		let question = document.createElement('span');
		question.classList.add("event-question");
		question.target = '_blank';
		question.href = this.questionUrl;
		question.addEventListener('click', toolTipHandler);
		this.widgetRoot.appendChild(question);

		let toolTip = document.createElement('div'),
			tooltipHtml = `
              <div class="tooltip-inner"> 
                <a href="${this.questionUrl}" target = "_blank" >About widget</a>
                <div class="place">version: <b>${this.widgetVersion}</b></div>
              </div>`;
		toolTip.classList.add("tooltip-version");
		toolTip.classList.add("left");
		toolTip.innerHTML = tooltipHtml;
		this.widgetRoot.appendChild(toolTip);

		function toolTipHandler(e) {
			e.preventDefault();
			e.target.nextSibling.classList.toggle('show-tip');
		}
	}

	hideSliderControls(){
		this.prevEventX.classList.add(this.controlHiddenClass);
		this.nextEventX.classList.add(this.controlHiddenClass);
		this.prevEventY.classList.add(this.controlHiddenClass);
		this.nextEventY.classList.add(this.controlHiddenClass);
	}

	toggleControlsVisibility(){
		// Horizontal
		if(this.slideCountX > 1){
			this.prevEventX.classList.remove(this.controlHiddenClass);
			this.nextEventX.classList.remove(this.controlHiddenClass);
			if(this.currentSlideX === 0){
				this.prevEventX.classList.add(this.controlHiddenClass);
			}else if(this.currentSlideX === this.slideCountX - 1){
				this.nextEventX.classList.add(this.controlHiddenClass);
			}
		}else{
			this.prevEventX.classList.add(this.controlHiddenClass);
			this.nextEventX.classList.add(this.controlHiddenClass);
		}

		// Vertical
		if(this.eventsGroups.length){
			if(this.eventsGroups[this.currentSlideX].length > 1){
				this.prevEventY.classList.remove(this.controlHiddenClass);
				this.nextEventY.classList.remove(this.controlHiddenClass);
				if(this.currentSlideY === 0){
					this.prevEventY.classList.add(this.controlHiddenClass);
				}else if(this.currentSlideY === this.eventsGroups[this.currentSlideX].length - 1){
					this.nextEventY.classList.add(this.controlHiddenClass);
				}
			}else{
				this.prevEventY.classList.add(this.controlHiddenClass);
				this.nextEventY.classList.add(this.controlHiddenClass);
			}
		}else{
			this.prevEventY.classList.add(this.controlHiddenClass);
			this.nextEventY.classList.add(this.controlHiddenClass);
		}
	}

	prevSlideX(){
		if(this.currentSlideX > 0){
			this.setSlideManually(this.currentSlideX - 1, true);
		}
	}

	nextSlideX(){
		if(this.slideCountX - 1 > this.currentSlideX) {
			this.setSlideManually(this.currentSlideX + 1, true);
		}
	}

	prevSlideY(){
		if(this.currentSlideY > 0){
			this.setSlideManually(this.currentSlideY - 1, false);
		}
	}

	nextSlideY(){
		if(this.eventsGroups[this.currentSlideX].length - 1 > this.currentSlideY) {
			this.setSlideManually(this.currentSlideY + 1, false);
		}
	}

	setSlideManually(slideIndex, isDirectionX){
		this.stopAutoSlideX();
		this.sliderTimeout = setTimeout(()=>{
			this.runAutoSlideX();
		}, this.sliderRestartDelay);
		if(isDirectionX)
			this.goToSlideX(slideIndex);
		else
			this.goToSlideY(slideIndex);
	}

	goToSlideX(slideIndex){
		if(this.currentSlideX === slideIndex) return;
		this.currentSlideY = 0;
		this.currentSlideX = slideIndex;
		this.eventsRoot.style.marginLeft = `-${this.currentSlideX * 100}%`;
		this.toggleControlsVisibility();
		this.setEventsCounter();
		this.setBuyBtnUrl();
	}

	goToSlideY(slideIndex){
		if(this.currentSlideY === slideIndex) return;
		this.currentSlideY = slideIndex;
		let eventGroup = this.eventsRoot.getElementsByClassName("event-group-" + this.currentSlideX);
		if(eventGroup.length){
			eventGroup = eventGroup[0];
			eventGroup.style.marginTop = `-${this.currentSlideY * (this.widgetContentHeight - this.borderSize * 2)}px`;
			this.toggleControlsVisibility();
			this.setBuyBtnUrl();
		}
	}

	runAutoSlideX(){
		if(this.slideCountX > 1) {
			this.sliderInterval = setInterval(()=> {
				var slideIndex = 0;
				if (this.slideCountX - 1 > this.currentSlideX) slideIndex = this.currentSlideX + 1;
				this.goToSlideX(slideIndex);
			}, this.sliderDelay);
		}
	}

	stopAutoSlideX(){
		if(this.sliderTimeout) clearTimeout(this.sliderTimeout);
		if(this.sliderInterval) clearInterval(this.sliderInterval);
	}

	initSliderControls(){
		this.currentSlideX = 0;
		this.currentSlideY = 0;
		this.slideCountX = 0;
		let coreCssClass = 'events_control';

		// left btn
		this.prevEventX = document.createElement("div");
		let prevEventXClass = [coreCssClass, coreCssClass + '-horizontal', coreCssClass + '-left', this.controlHiddenClass];
		for(let i in prevEventXClass){
			this.prevEventX.classList.add(prevEventXClass[i]);
		}
		this.eventsRootContainer.appendChild(this.prevEventX);

		// right btn
		this.nextEventX = document.createElement("div");
		let nextEventXClass = [coreCssClass, coreCssClass + '-horizontal', coreCssClass + '-right', this.controlHiddenClass];
		for(let i in nextEventXClass){
			this.nextEventX.classList.add(nextEventXClass[i]);
		}
		this.eventsRootContainer.appendChild(this.nextEventX);

		// top btn
		this.prevEventY = document.createElement("div");
		let prevEventYClass = [coreCssClass, coreCssClass + '-vertical', coreCssClass + '-top', this.controlHiddenClass];
		for(let i in prevEventYClass ){
			this.prevEventY.classList.add(prevEventYClass[i]);
		}
		this.eventsRootContainer.appendChild(this.prevEventY);

		// bottom btn
		this.nextEventY = document.createElement("div");
		let nextEventYClass = [coreCssClass, coreCssClass + '-vertical', coreCssClass + '-bottom', this.controlHiddenClass];
		for(let i in nextEventYClass){
			this.nextEventY.classList.add(nextEventYClass[i]);
		}
		this.eventsRootContainer.appendChild(this.nextEventY);

		// Restore events group position
		function whichTransitionEvent(){
			let el = document.createElement('fakeelement'),
				transitions = {
					'transition':'transitionend',
					'OTransition':'oTransitionEnd',
					'MozTransition':'transitionend',
					'WebkitTransition':'webkitTransitionEnd'
				};

			for(let event in transitions){
				if( el.style[event] !== undefined ) return transitions[event];
			}
		}

		var transitionEvent = whichTransitionEvent();
		transitionEvent && this.eventsRoot.addEventListener(transitionEvent, (e)=> {
			if (this.eventsRoot !== e.target) return;
			let eventGroup = this.eventsRoot.getElementsByClassName("event-group");
			// Reset all groups. We don't know what event group was visible before.
			for(let i = 0; eventGroup.length > i; i++){
				eventGroup[i].style.marginTop = 0;
			}
		});

		// Arrows
		this.prevEventX.addEventListener("click", ()=> {
			this.prevSlideX();
		});

		this.nextEventX.addEventListener("click", ()=> {
			this.nextSlideX();
		});

		this.prevEventY.addEventListener("click", ()=> {
			this.prevSlideY();
		});

		this.nextEventY.addEventListener("click", ()=> {
			this.nextSlideY();
		});

		// Tough device swipes
		let xDown = null,
			yDown = null;

		function handleTouchStart(evt) {
			xDown = evt.touches[0].clientX;
			yDown = evt.touches[0].clientY;
		}

		function handleTouchMove(evt) {
			if ( ! xDown || ! yDown ) return;

			let xUp = evt.touches[0].clientX,
				yUp = evt.touches[0].clientY,
				xDiff = xDown - xUp,
				yDiff = yDown - yUp;

			if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
				if ( xDiff > 0 )
					this.nextSlideX(); // left swipe
				else
					this.prevSlideX(); // right swipe
			} else {
				if ( yDiff > 0 )
					this.nextSlideY(); // up swipe
				else
					this.prevSlideY(); // down swipe
			}

			xDown = null;
			yDown = null;
		}

		this.eventsRootContainer.addEventListener('touchstart', (e)=> {
			if(this.config.theme !== "calendar") { if (e.target.className != 'event-logo' && e.target.className != 'event-question') e.preventDefault(); } /*used in plugins for 'buy button'*/
			handleTouchStart.call(this, e);
		}, false);
		this.eventsRootContainer.addEventListener('touchmove', (e)=> {
			if(this.config.theme !== "calendar") { if (e.target.className != 'event-logo' && e.target.className != 'event-question') e.preventDefault(); }
			handleTouchMove.call(this, e);
		}, false);
	}

	initSlider(){
		if(this.sliderInterval) clearInterval(this.sliderInterval);
		if(this.sliderTimeout) clearTimeout(this.sliderTimeout);
		this.slideCountX = this.eventsGroups.length;
		this.eventsRoot.style.marginLeft = '0%';
		this.eventsRoot.style.width = `${this.slideCountX * 100}%`;
		this.currentSlideX = 0;
		this.currentSlideY = 0;
		this.runAutoSlideX();
		this.toggleControlsVisibility();
		this.setBuyBtnUrl();
	}

	formatDate(date) {
		var result = '';
		if(date == undefined || !date.day || date.day == undefined) return result; // Day is required

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

	clearEvents(){
		this.eventsRoot.innerHTML = "";
	}

	clear(){
		var modificatorList = this.widgetRoot.getElementsByClassName('modificator');
		while (modificatorList.length) {
			let el = modificatorList[0],
				parent = el.parentNode;
			parent.removeChild(el);
		}

		this.clearEvents();
	}

	loadCustomStyle() {

		let sheet;

		if (this.widgetRoot.getElementsByTagName('style')[0] == undefined) {
			let cusStyle = document.createElement("style");
			this.widgetRoot.appendChild(cusStyle);
			sheet = cusStyle.sheet;
		} else {
			sheet = this.widgetRoot.getElementsByTagName('style')[0].sheet;
		}

		if (this.widgetRoot.getAttribute("w-background") != undefined) {
			sheet.addRule('div[w-theme="calendar"] .tabs','background: ' + this.widgetRoot.getAttribute("w-background"));
			sheet.insertRule('div[w-theme="calendar"] .tabs { background: ' + this.widgetRoot.getAttribute("w-background") + ' }', 0);
		}

		if (this.widgetRoot.getAttribute("w-textcolor") != undefined) {
			sheet.addRule('div[w-theme="calendar"] .tabs span', 'color: ' + this.widgetRoot.getAttribute("w-textcolor"));
			sheet.insertRule('div[w-theme="calendar"] .tabs span { color: ' + this.widgetRoot.getAttribute("w-textcolor") + ' }', 0);
			sheet.addRule('div[w-theme="calendar"] .selector-title', 'color: ' + this.widgetRoot.getAttribute("w-textcolor"));
			sheet.insertRule('div[w-theme="calendar"] .selector-title { color: ' + this.widgetRoot.getAttribute("w-textcolor") + ' }', 0);
			sheet.addRule('div[w-theme="calendar"] .selector-title:after', 'border-color: ' + this.widgetRoot.getAttribute("w-textcolor"));
			sheet.insertRule('div[w-theme="calendar"] .selector-title:after { border-color: ' + this.widgetRoot.getAttribute("w-textcolor") + ' }', 0);
		}

		if (this.widgetRoot.getAttribute("w-bordercolor") != undefined) {
			sheet.addRule('.div[w-theme="calendar"]','border-color: ' + this.widgetRoot.getAttribute("w-bordercolor"));
			sheet.insertRule('div[w-theme="calendar"] { border-color: ' + this.widgetRoot.getAttribute("w-bordercolor") + ' }', 0);
		}

		if (this.widgetRoot.getAttribute("w-tabsbordercolor") != undefined) {
			sheet.addRule('.div[w-theme="calendar"] .tabs span','border-color: ' + this.widgetRoot.getAttribute("w-tabsbordercolor"));
			sheet.insertRule('div[w-theme="calendar"] .tabs span { border-color: ' + this.widgetRoot.getAttribute("w-tabsbordercolor") + ' }', 0);
			sheet.addRule('div[w-theme="calendar"] .tabs span:first-child','border-color: ' + this.widgetRoot.getAttribute("w-tabsbordercolor"));
			sheet.insertRule('div[w-theme="calendar"] .tabs span:first-child { border-color: ' + this.widgetRoot.getAttribute("w-tabsbordercolor") + ' }', 0);
		}

		if (this.widgetRoot.getAttribute("w-tabcolor") != undefined) {
			sheet.addRule('div[w-theme="calendar"] .tabs span.active','color: ' + this.widgetRoot.getAttribute("w-tabcolor"));
			sheet.insertRule('div[w-theme="calendar"] .tabs span.active { color: ' + this.widgetRoot.getAttribute("w-tabcolor") + ' }', 0);
			sheet.addRule('div[w-theme="calendar"] .tabs span.active:hover','color: ' + this.widgetRoot.getAttribute("w-tabcolor"));
			sheet.insertRule('div[w-theme="calendar"] .tabs span.active:hover { color: ' + this.widgetRoot.getAttribute("w-tabcolor") + ' }', 0);
		}

		if (this.widgetRoot.getAttribute("w-tabbackground") != undefined) {
			sheet.addRule('div[w-theme="calendar"] .tabs span.active','background: ' + this.widgetRoot.getAttribute("w-tabbackground"));
			sheet.insertRule('div[w-theme="calendar"] .tabs span.active { background: ' + this.widgetRoot.getAttribute("w-tabbackground") + ' }', 0);
			sheet.addRule('div[w-theme="calendar"] .tabs span.active:hover','background: ' + this.widgetRoot.getAttribute("w-tabbackground"));
			sheet.insertRule('div[w-theme="calendar"] .tabs span.active:hover { background: ' + this.widgetRoot.getAttribute("w-tabbackground") + ' }', 0);
		}

		if (this.widgetRoot.getAttribute("w-hovertabcolor") != undefined) {
			sheet.addRule('.div[w-theme="calendar"] .tabs span:hover','color: ' + this.widgetRoot.getAttribute("w-hovertabcolor"));
			sheet.insertRule('div[w-theme="calendar"] .tabs span:hover { color: ' + this.widgetRoot.getAttribute("w-hovertabcolor") + ' }', 0);
		}

		if (this.widgetRoot.getAttribute("w-hovertabbackground") != undefined) {
			sheet.addRule('div[w-theme="calendar"] .tabs span:hover','background: ' + this.widgetRoot.getAttribute("w-hovertabbackground"));
			sheet.insertRule('div[w-theme="calendar"] .tabs span:hover { background: ' + this.widgetRoot.getAttribute("w-hovertabbackground") + ' }', 0);
		}

		if (this.widgetRoot.getAttribute("w-selectorcolorhover") != undefined) {
			sheet.addRule('div[w-theme="calendar"] .selector-title:hover','color: ' + this.widgetRoot.getAttribute("w-selectorcolorhover"));
			sheet.insertRule('div[w-theme="calendar"] .selector-title:hover { color: ' + this.widgetRoot.getAttribute("w-selectorcolorhover") + ' }', 0);
			sheet.addRule('div[w-theme="calendar"] .selector-title:hover:after','border-color: ' + this.widgetRoot.getAttribute("w-selectorcolorhover"));
			sheet.insertRule('div[w-theme="calendar"] .selector-title:hover:after { border-color: ' + this.widgetRoot.getAttribute("w-selectorcolorhover") + ' }', 0);
			sheet.addRule('div[w-theme="calendar"] .selector-title.open:after','border-color: ' + this.widgetRoot.getAttribute("w-selectorcolorhover"));
			sheet.insertRule('div[w-theme="calendar"] .selector-title.open:after { border-color: ' + this.widgetRoot.getAttribute("w-selectorcolorhover") + ' }', 0);
			sheet.addRule('div[w-theme="calendar"] .selector-title.open:hover:after','border-color: ' + this.widgetRoot.getAttribute("w-selectorcolorhover"));
			sheet.insertRule('div[w-theme="calendar"] .selector-title.open:hover:after { border-color: ' + this.widgetRoot.getAttribute("w-selectorcolorhover") + ' }', 0);
		}

		if (this.widgetRoot.getAttribute("w-datesbackground") != undefined) {
			sheet.addRule('div[w-theme="calendar"] .selector-content','background: ' + this.widgetRoot.getAttribute("w-datesbackground"));
			sheet.insertRule('div[w-theme="calendar"] .selector-content { background: ' + this.widgetRoot.getAttribute("w-datesbackground") + ' }', 0);
		}

		if (this.widgetRoot.getAttribute("w-datescolor") != undefined) {
			sheet.addRule('div[w-theme="calendar"] .selector-content span','color: ' + this.widgetRoot.getAttribute("w-datescolor"));
			sheet.insertRule('div[w-theme="calendar"] .selector-content span { color: ' + this.widgetRoot.getAttribute("w-datescolor") + ' }', 0);
		}

		if (this.widgetRoot.getAttribute("w-datescolorhover") != undefined) {
			sheet.addRule('div[w-theme="calendar"] .selector-content span:hover','color: ' + this.widgetRoot.getAttribute("w-datescolorhover"));
			sheet.insertRule('div[w-theme="calendar"] .selector-content span:hover { color: ' + this.widgetRoot.getAttribute("w-datescolorhover") + ' }', 0);
		}

		if (this.widgetRoot.getAttribute("w-schedulesdotscolor") != undefined) {
			sheet.addRule('div[w-theme="calendar"] .weekSсheduler .days .d .round','background: ' + this.widgetRoot.getAttribute("w-schedulesdotscolor"));
			sheet.insertRule('div[w-theme="calendar"] .weekSсheduler .days .d .round { background: ' + this.widgetRoot.getAttribute("w-schedulesdotscolor") + ' }', 0);
			sheet.addRule('div[w-theme="calendar"] .monthScheduler .calendar .round','color: ' + this.widgetRoot.getAttribute("w-schedulesdotscolor"));
			sheet.insertRule('div[w-theme="calendar"] .monthScheduler .calendar .round { color: ' + this.widgetRoot.getAttribute("w-schedulesdotscolor") + ' }', 0);
			sheet.addRule('div[w-theme="calendar"] .monthScheduler .calendar .round','border-color: ' + this.widgetRoot.getAttribute("w-schedulesdotscolor"));
			sheet.insertRule('div[w-theme="calendar"] .monthScheduler .calendar .round { border-color: ' + this.widgetRoot.getAttribute("w-schedulesdotscolor") + ' }', 0);
			sheet.addRule('div[w-theme="calendar"] .monthScheduler .calendar .round .count','background: ' + this.widgetRoot.getAttribute("w-schedulesdotscolor"));
			sheet.insertRule('div[w-theme="calendar"] .monthScheduler .calendar .round .count { background: ' + this.widgetRoot.getAttribute("w-schedulesdotscolor") + ' }', 0);
			sheet.addRule('div[w-theme="calendar"] .monthScheduler .calendar table td.today .round','color: ' + this.widgetRoot.getAttribute("w-schedulesdotscolor"));
			sheet.insertRule('div[w-theme="calendar"] .monthScheduler .calendar table td.today .round { color: ' + this.widgetRoot.getAttribute("w-schedulesdotscolor") + ' }', 0);
			sheet.addRule('div[w-theme="calendar"] .year .month .count','background: ' + this.widgetRoot.getAttribute("w-schedulesdotscolor"));
			sheet.insertRule('div[w-theme="calendar"] .year .month .count { background: ' + this.widgetRoot.getAttribute("w-schedulesdotscolor") + ' }', 0);
		}

		if (this.widgetRoot.getAttribute("w-schedulesdotscolorhover") != undefined) {
			sheet.addRule('div[w-theme="calendar"] .weekSсheduler .days .d .round:hover','color: ' + this.widgetRoot.getAttribute("w-schedulesdotscolorhover"));
			sheet.insertRule('div[w-theme="calendar"] .weekSсheduler .days .d .round:hover { color: ' + this.widgetRoot.getAttribute("w-schedulesdotscolorhover") + ' }', 0);
			sheet.addRule('div[w-theme="calendar"] .monthScheduler .calendar .round:hover','background: ' + this.widgetRoot.getAttribute("w-schedulesdotscolorhover"));
			sheet.insertRule('div[w-theme="calendar"] .monthScheduler .calendar .round:hover { background: ' + this.widgetRoot.getAttribute("w-schedulesdotscolorhover") + ' }', 0);
			sheet.addRule('div[w-theme="calendar"] .monthScheduler .calendar .round:hover','border-color: ' + this.widgetRoot.getAttribute("w-schedulesdotscolorhover"));
			sheet.insertRule('div[w-theme="calendar"] .monthScheduler .calendar .round:hover { border-color: ' + this.widgetRoot.getAttribute("w-schedulesdotscolorhover") + ' }', 0);
			sheet.addRule('div[w-theme="calendar"] .monthScheduler .calendar .round:hover .count','background: ' + this.widgetRoot.getAttribute("w-schedulesdotscolorhover"));
			sheet.insertRule('div[w-theme="calendar"] .monthScheduler .calendar .round:hover .count { background: ' + this.widgetRoot.getAttribute("w-schedulesdotscolorhover") + ' }', 0);
			sheet.addRule('div[w-theme="calendar"] .monthScheduler .calendar .round:hover, div[w-theme="calendar"] .monthScheduler .calendar .round:hover .count, div[w-theme="calendar"] .monthScheduler .calendar .round-holder.active .round, div[w-theme="calendar"] .monthScheduler .calendar .round-holder.active .count', 'background: ' + this.widgetRoot.getAttribute("w-schedulesdotscolorhover"));
			sheet.insertRule('div[w-theme="calendar"] .monthScheduler .calendar .round:hover, div[w-theme="calendar"] .monthScheduler .calendar .round:hover .count, div[w-theme="calendar"] .monthScheduler .calendar .round-holder.active .round, div[w-theme="calendar"] .monthScheduler .calendar .round-holder.active .count { background: ' + this.widgetRoot.getAttribute("w-schedulesdotscolorhover") + ' }', 0);
			sheet.addRule('div[w-theme="calendar"] .monthScheduler .calendar .round:hover, div[w-theme="calendar"] .monthScheduler .calendar .round:hover .count, div[w-theme="calendar"] .monthScheduler .calendar .round-holder.active .round, div[w-theme="calendar"] .monthScheduler .calendar .round-holder.active .count', 'border-color: ' + this.widgetRoot.getAttribute("w-schedulesdotscolorhover"));
			sheet.insertRule('div[w-theme="calendar"] .monthScheduler .calendar .round:hover, div[w-theme="calendar"] .monthScheduler .calendar .round:hover .count, div[w-theme="calendar"] .monthScheduler .calendar .round-holder.active .round, div[w-theme="calendar"] .monthScheduler .calendar .round-holder.active .count { border-color: ' + this.widgetRoot.getAttribute("w-schedulesdotscolorhover") + ' }', 0);
		}

		if (this.widgetRoot.getAttribute("w-popuscolor") != undefined) {
			sheet.addRule('div[w-theme="calendar"] .weekSсheduler .days .popup .event .event-holder .name, div[w-theme="calendar"] .weekSсheduler .days .popup .event .event-holder .name:hover, div[w-theme="calendar"] .weekSсheduler .days .popup-up .event .event-holder .name, div[w-theme="calendar"] .weekSсheduler .days .popup-up .event .event-holder .name:hover','color: ' + this.widgetRoot.getAttribute("w-popuscolor"));
			sheet.insertRule('div[w-theme="calendar"] .weekSсheduler .days .popup .event .event-holder .name, div[w-theme="calendar"] .weekSсheduler .days .popup .event .event-holder .name:hover, div[w-theme="calendar"] .weekSсheduler .days .popup-up .event .event-holder .name, div[w-theme="calendar"] .weekSсheduler .days .popup-up .event .event-holder .name:hover { color: ' + this.widgetRoot.getAttribute("w-schedulesdotscolorhover") + ' }', 0);
			sheet.addRule('div[w-theme="calendar"] .weekSсheduler .days .popup .event .event-holder .date, div[w-theme="calendar"] .weekSсheduler .days .popup-up .event .event-holder .date, div[w-theme="calendar"] .weekSсheduler .days .popup .event .event-holder .place, div[w-theme="calendar"] .weekSсheduler .days .popup-up .event .event-holder .place','color: ' + this.widgetRoot.getAttribute("w-popuscolor"));
			sheet.insertRule('div[w-theme="calendar"] .weekSсheduler .days .popup .event .event-holder .date, div[w-theme="calendar"] .weekSсheduler .days .popup-up .event .event-holder .date, div[w-theme="calendar"] .weekSсheduler .days .popup .event .event-holder .place, div[w-theme="calendar"] .weekSсheduler .days .popup-up .event .event-holder .place { color: ' + this.widgetRoot.getAttribute("w-schedulesdotscolorhover") + ' }', 0);
			sheet.addRule('div[w-theme="calendar"] .monthScheduler .calendar .popup .event .event-holder .name, div[w-theme="calendar"] .monthScheduler .calendar .popup .event .event-holder .name:hover, div[w-theme="calendar"] .monthScheduler .calendar .popup-up .event .event-holder .name, div[w-theme="calendar"] .monthScheduler .calendar .popup-up .event .event-holder .name:hover','color: ' + this.widgetRoot.getAttribute("w-popuscolor"));
			sheet.insertRule('div[w-theme="calendar"] .monthScheduler .calendar .popup .event .event-holder .name, div[w-theme="calendar"] .monthScheduler .calendar .popup .event .event-holder .name:hover, div[w-theme="calendar"] .monthScheduler .calendar .popup-up .event .event-holder .name, div[w-theme="calendar"] .monthScheduler .calendar .popup-up .event .event-holder .name:hover { color: ' + this.widgetRoot.getAttribute("w-popuscolor") + ' }', 0);
			sheet.addRule('div[w-theme="calendar"] .monthScheduler .calendar .popup .event .event-holder .date, div[w-theme="calendar"] .monthScheduler .calendar .popup-up .event .event-holder .date, div[w-theme="calendar"] .monthScheduler .calendar .popup .event .event-holder .place, div[w-theme="calendar"] .monthScheduler .calendar .popup-up .event .event-holder .place', 'color: ' + this.widgetRoot.getAttribute("w-popuscolor"));
			sheet.insertRule('div[w-theme="calendar"] .monthScheduler .calendar .popup .event .event-holder .date, div[w-theme="calendar"] .monthScheduler .calendar .popup-up .event .event-holder .date, div[w-theme="calendar"] .monthScheduler .calendar .popup .event .event-holder .place, div[w-theme="calendar"] .monthScheduler .calendar .popup-up .event .event-holder .place { color: ' + this.widgetRoot.getAttribute("w-popuscolor") + ' }', 0);
		}

		if (this.widgetRoot.getAttribute("w-popusbackground") != undefined) {
			sheet.addRule('div[w-theme="calendar"] .weekSсheduler .days .popup','background: ' + this.widgetRoot.getAttribute("w-popusbackground"));
			sheet.insertRule('div[w-theme="calendar"] .weekSсheduler .days .popup { background: ' + this.widgetRoot.getAttribute("w-popusbackground") + ' }', 0);
			sheet.addRule('div[w-theme="calendar"] .weekSсheduler .days .popup-up','background: ' + this.widgetRoot.getAttribute("w-popusbackground"));
			sheet.insertRule('div[w-theme="calendar"] .weekSсheduler .days .popup-up { background: ' + this.widgetRoot.getAttribute("w-popusbackground") + ' }', 0);
			sheet.addRule('div[w-theme="calendar"] .weekSсheduler .days .tail:before','border-color: transparent transparent ' + this.widgetRoot.getAttribute("w-popusbackground") + ' transparent');
			sheet.insertRule('div[w-theme="calendar"] .weekSсheduler .days .tail:before { border-color: transparent transparent ' + this.widgetRoot.getAttribute("w-popusbackground") + ' transparent}', 0);
			sheet.addRule('div[w-theme="calendar"] .weekSсheduler .days .tail-up:before','border-color: ' + this.widgetRoot.getAttribute("w-popusbackground") + ' transparent transparent transparent');
			sheet.insertRule('div[w-theme="calendar"] .weekSсheduler .days .tail-up:before { border-color: ' + this.widgetRoot.getAttribute("w-popusbackground") + ' transparent transparent transparent}', 0);
			sheet.addRule('div[w-theme="calendar"] .monthScheduler .calendar .popup-up','background: ' + this.widgetRoot.getAttribute("w-popusbackground"));
			sheet.insertRule('div[w-theme="calendar"] .monthScheduler .calendar .popup-up { background: ' + this.widgetRoot.getAttribute("w-popusbackground") + ' }', 0);
			sheet.addRule('div[w-theme="calendar"] .monthScheduler .calendar .tail:before','border-color: transparent transparent ' + this.widgetRoot.getAttribute("w-popusbackground") + ' transparent');
			sheet.insertRule('div[w-theme="calendar"] .monthScheduler .calendar .tail:before { border-color: transparent transparent ' + this.widgetRoot.getAttribute("w-popusbackground") + ' transparent}', 0);
			sheet.addRule('div[w-theme="calendar"] .monthScheduler .calendar .tail-up:before','border-color: ' + this.widgetRoot.getAttribute("w-popusbackground") + ' transparent transparent transparent');
			sheet.insertRule('div[w-theme="calendar"] .monthScheduler .calendar .tail-up:before { border-color: ' + this.widgetRoot.getAttribute("w-popusbackground") + ' transparent transparent transparent}', 0);
		}
		/* If custom colors isset */

	}

	update() {
		let widget = this.eventsRootContainer;
		let spinner = widget.querySelector('.spinner-container');
		spinner.classList.remove('hide');
		let oldTheme = this.config.constructor();
		/*
    if (this.widgetRoot.getAttribute("w-background") != undefined) this.widgetRoot.firstChild.style.background = this.widgetRoot.getAttribute("w-background");
    if (this.widgetRoot.getAttribute("w-textcolor") != undefined)  {
        var tabsColor = this.widgetRoot.querySelectorAll('.tb:not(.active)'),
            selColor = this.widgetRoot.querySelectorAll('.selector-title');
        tabsColor.forEach((el,i) => {
            el.style.color = this.widgetRoot.getAttribute("w-textcolor");
        });
        selColor.forEach((el,i) => {
            el.style.color = this.widgetRoot.getAttribute("w-textcolor");
        });
    }
    /*
    if (this.widgetRoot.getAttribute("w-tabcolor") != undefined) {
        this.widgetRoot.querySelector('.tb.active').style.color = this.widgetRoot.getAttribute("w-tabcolor");
    }
    if (this.widgetRoot.getAttribute("w-tabbackground") != undefined) {
        this.widgetRoot.querySelector('.tb.active').style.background = this.widgetRoot.getAttribute("w-tabbackground");
    }
    */
		for (let attr in this.config) {
			if (this.config.hasOwnProperty(attr)) oldTheme[attr] = this.config[attr];
		}

		this.config = this.widgetRoot.attributes;

		this.loadCustomStyle();

		this.widgetRoot.style.height = `${this.widgetHeight}px`;
		this.widgetRoot.style.width  = `${this.config.width}px`;
		this.widgetRoot.style.borderRadius = `${this.config.borderradius}px`;
		this.widgetRoot.style.borderWidth = `${this.borderSize}px`;

		this.getCurrentWeek();

		this.eventsRootContainer.classList.remove("border");

		widget.querySelector('.events-root-container .spinner-container').classList.add('hide');

		if( this.config.hasOwnProperty("border") ){
			this.eventsRootContainer.classList.add("border");
		}

		if(!this.needToUpdate(this.config, oldTheme, this.updateExceptions) || this.needToUpdate(this.config, oldTheme, this.updateExceptions)){
			this.clear();

			this.getCoordinates(() => {
				this.makeRequest( this.eventsLoadingHandler, this.apiUrl, this.eventReqAttrs );
			});
		}
		else{
			let events = this.eventsRoot.getElementsByClassName("event-wrapper");
			for(let i in events){
				if(events.hasOwnProperty(i) && events[i].style !== undefined){
					events[i].style.width = `${this.config.width}px`;
					events[i].style.height = `${this.widgetContentHeight}px`;
				}
			}
			this.goToSlideY(0);
		}
	}

	needToUpdate(newTheme, oldTheme, forCheck = []){
		return Object.keys(newTheme).map(function(key){
			if(forCheck.indexOf(key) > -1) return true;
			//console.warn([key, newTheme[key], oldTheme[key], newTheme[key] === oldTheme[key]])
			return newTheme[key] === oldTheme[key] ;
		}).indexOf(false) > -1
	}

	loadConfig(NamedNodeMap){
		var config = {};
		Object.keys(NamedNodeMap).map(function(value){
			if( typeof(NamedNodeMap[value].name) !== "undefined" && NamedNodeMap[value].name.indexOf("w-") !== -1){
				config[ NamedNodeMap[value].name.replace(/w-/g, "").replace(/-/g, "") ] = NamedNodeMap[value].value;
			}
		});
		return config;
	}

	styleLoadingHandler(){
		if (this && this.readyState == XMLHttpRequest.DONE ) {
			if(this.status == 200){
				var style = document.createElement("style");
				style.setAttribute("type","text/css");
				style.setAttribute("id",`widget-theme-${this.widget.config.theme}`);
				style.textContent = this.responseText;
				document.getElementsByTagName("head")[0].appendChild(style);
			}
			else {
				console.log("theme wasn't loaded");
			}
		}
	}

	groupEventsByName(){
		let groups = {};
		this.events.map(function(event){
			if (groups[event.name] === undefined) groups[event.name] = [];
			groups[event.name].push(event);
		});

		this.eventsGroups = [];
		for (let groupName in groups) {
			this.eventsGroups.push(groups[groupName]);
		}
	}

	initEventCounter(){
		this.eventsCounter = document.createElement("div");
		this.eventsCounter.classList.add("events-counter");
		this.widgetRoot.appendChild(this.eventsCounter);
	}

	setEventsCounter(){
		if(this.eventsCounter){
			let text = '';
			if(this.eventsGroups.length){
				if(this.eventsGroups.length > 1){
					text = `${this.currentSlideX + 1} of ${this.eventsGroups.length} events`;
				} else {
					text = '1 event';
				}
			}
			this.eventsCounter.innerHTML = text;
		}
	}

	resetReduceParamsOrder(){
		this.reduceParamsOrder = 0;
	}

	reduceParamsAndReloadEvents(){
		let eventReqAttrs = {},
			reduceParamsList = [
				['startDateTime', 'endDateTime', 'country'],
				['city'],
				['countryCode'],
				['radius'],
				['postalCode', 'latlong'],
				['classificationId'],
				['attractionId'],
				['promoterId'],
				['segmentId'],
				['venueId'],
				['keyword'],
				['size']
			];

		// make copy of params
		for(let key in this.eventReqAttrs){
			eventReqAttrs[key] = this.eventReqAttrs[key]
		}

		if(!this.reduceParamsOrder) this.reduceParamsOrder = 0;
		if(reduceParamsList.length > this.reduceParamsOrder){
			for(let item in reduceParamsList){
				if(this.reduceParamsOrder >= item){
					for(let i in reduceParamsList[item]){
						delete eventReqAttrs[reduceParamsList[item][i]];
					}
				}
			}

			// if(this.reduceParamsOrder === 0) this.showMessage("No results were found.<br/>Here other options for you.");
			this.reduceParamsOrder++;
			this.makeRequest( this.eventsLoadingHandler, this.apiUrl, eventReqAttrs );
		}else{
			// We haven't any results
			this.showMessage("No results were found.", true);
			this.reduceParamsOrder = 0;
			this.hideSliderControls();
		}
	}

	eventsLoadingHandler(){
		let widget = this.widget;

		let spinner = widget.eventsRootContainer.querySelector('.spinner-container');

		widget.clearEvents(); // Additional clearing after each loading
		if (this && this.readyState == XMLHttpRequest.DONE ) {
			if(this.status == 200){

				spinner.classList.add('hide');

				widget.events = JSON.parse(this.responseText);

				if(widget.events.length){
					widget.groupEventsByName.call(widget);

					widget.eventsGroups.map(function(group, i){
						if(group.length === 1)
							widget.publishEvent(group[0]);
						else
							widget.publishEventsGroup.call(widget, group, i);
					});

					widget.initSlider();
					widget.setEventsCounter();
					widget.resetReduceParamsOrder();
					if(widget.hideMessageWithoutDelay)
						widget.hideMessage();
					else
						widget.hideMessageWithDelay(widget.hideMessageDelay);

				}else{
					widget.reduceParamsAndReloadEvents.call(widget);
				}
			}
			else if(this.status == 400) {
				widget.reduceParamsAndReloadEvents.call(widget);
				console.log('There was an error 400');
			}
			else {
				widget.reduceParamsAndReloadEvents.call(widget);
				console.log('something else other than 200 was returned');
			}
		}
	}

	publishEventsGroup(group, index){
		let groupNodeWrapper = document.createElement("li");
		groupNodeWrapper.classList.add("event-wrapper");
		groupNodeWrapper.classList.add("event-group-wrapper");
		/*
    groupNodeWrapper.style.width  = `${this.config.width - this.borderSize * 2}px`;
    groupNodeWrapper.style.height = `${this.widgetContentHeight - this.borderSize * 2}px`;
    */
		groupNodeWrapper.style.width  = `${this.config.width}px`;
		groupNodeWrapper.style.height = `${this.widgetContentHeight}px`;

		let groupNode = document.createElement("ul");
		groupNode.classList.add("event-group");
		groupNode.classList.add("event-group-" + index);

		group.map((event)=> {
			this.publishEvent(event, groupNode)
		});

		groupNodeWrapper.appendChild(groupNode);
		this.eventsRoot.appendChild(groupNodeWrapper);
	}

	publishEvent(event, parentNode){
		parentNode = parentNode || this.eventsRoot;
		let DOMElement = this.createDOMItem(event);
		parentNode.appendChild(DOMElement);
	}

	getEventByID(id){
		for(let index in this.events){
			if(this.events.hasOwnProperty(index) && this.events[index].id === id){
				return this.events[index]
			}
		}
	}

	getImageForEvent(images){
		var width = this.config.width,
			height = this.widgetContentHeight;

		images.sort(function(a,b) {
			if (a.width < b.width)
				return -1;
			else if (a.width > b.width)
				return 1;
			else
				return 0;
		});

		var myImg = "";
		images.forEach(function(element){
			if(element.width >= width && element.height >= height && !myImg){
				myImg = element.url;
			}
		});
		return myImg;
	}

	parseEvents(eventsSet){
		if(!eventsSet._embedded){
			if(typeof($widgetModalNoCode) !== "undefined"){
				$widgetModalNoCode.modal();
			}
			return [];
		}
		eventsSet = eventsSet._embedded.events;

		var tmpEventSet = [];
		for(var key in eventsSet){
			if(eventsSet.hasOwnProperty(key)){
				let currentEvent = {};

				currentEvent.id = eventsSet[key].id;
				currentEvent.url = eventsSet[key].url;
				currentEvent.name = eventsSet[key].name;

				currentEvent.date = {
					day: eventsSet[key].dates.start.localDate,
					time: eventsSet[key].dates.start.localTime
				};

				if(eventsSet[key].hasOwnProperty('_embedded') && eventsSet[key]._embedded.hasOwnProperty('venues')){
					let venue = eventsSet[key]._embedded.venues[0];
					if(venue){
						if(venue.address)
							currentEvent.address = venue.address;

						if(venue.name){
							if(!currentEvent.address) currentEvent.address = {};
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

	makeRequest(handler, url=this.apiUrl, attrs={}, method="GET"){
		attrs = Object.keys(attrs).map(function(key){
			return `${key}=${attrs[key]}`;
		}).join("&");
		url = [url,attrs].join("?");
		if (this.widgetRoot.getAttribute('w-postalcodeapi') != null) url += '&postalCode=' + this.widgetRoot.getAttribute('w-postalcodeapi');
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

	initPretendedLink(el, url, isBlank){
		if(el && url){
			el.setAttribute('data-url', url);
			el.classList.add("event-pretended-link");
			el.addEventListener('click', function(){
				let url = this.getAttribute('data-url');
				if(url){
					let win = window.open(url, (isBlank ? '_blank' : '_self'));
					win.focus();
				}
			});
			el.addEventListener('touchstart', function(){
				let url = this.getAttribute('data-url');
				if(url){
					let win = window.open(url, (isBlank ? '_blank' : '_self'));
					win.focus();
				}
			});
		}
		return el;
	}

	createBackgroundImage(event, img) {
		var image = document.createElement("span");
		image.classList.add("bg-cover");
		image.style.backgroundImage = `url('${img}')`;
		event.appendChild(image);
	}

	addBuyButton(domNode, url) {
		if (this.isListView) {
			let _urlValid = ( this.isUniversePluginInitialized && this.isUniverseUrl(url) ) || ( this.isTMPluginInitialized && this.isAllowedTMEvent(url) );
			if(!_urlValid) url = '';
			let buyBtn = document.createElement("a");
			buyBtn.appendChild(document.createTextNode('BUY NOW'));
			buyBtn.classList.add("event-buy-btn");
			buyBtn.target = '_blank';
			buyBtn.href = url;
			buyBtn.setAttribute('onclick', "ga('send', 'event', 'DiscoveryClickBuyButton', 'click');");
			domNode.appendChild(buyBtn);
		}
	}

	createDOMItem(itemConfig){
		var medWrapper = document.createElement("div");
		medWrapper.classList.add("event-content-wraper");

		var event = document.createElement("li");
		event.classList.add("event-wrapper");

		/* event.style.height = `${this.widgetContentHeight - this.borderSize * 2}px`;
    event.style.width  = `${this.config.width - this.borderSize * 2}px`;
    */

		event.style.height = `${this.widgetContentHeight}px`;
		event.style.width  = `${this.config.width}px`;

		this.createBackgroundImage(event, itemConfig.img);

		var nameContent = document.createTextNode(itemConfig.name),
			name =  document.createElement("span");
		name.classList.add("event-name");
		name.appendChild(nameContent);
		this.initPretendedLink(name, itemConfig.url, true);
		name.setAttribute('onclick', `ga('send', 'event', 'DiscoveryClickeventName_theme=${this.config.theme}_width=${this.config.width}_height=${this.config.height}_color_scheme=${this.config.colorscheme}', 'click', '${itemConfig.url}');`);
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

		if(itemConfig.hasOwnProperty("address")){
			var addressWrapper = document.createElement("span");
			addressWrapper.classList.add("address-wrapper");

			if( itemConfig.address.hasOwnProperty("name") ){
				var addressNameText = document.createTextNode(itemConfig.address.name),
					addressName =  document.createElement("span");
				addressName.classList.add("event-address");
				addressName.classList.add("event-address-name");
				addressName.appendChild(addressNameText);
				addressWrapper.appendChild(addressName);
			}

			if( itemConfig.address.hasOwnProperty("line1") ){
				var addressOneText = document.createTextNode(itemConfig.address.line1),
					addressOne =  document.createElement("span");
				addressOne.classList.add("event-address");
				addressOne.appendChild(addressOneText);
				addressWrapper.appendChild(addressOne);
			}

			if( itemConfig.address.hasOwnProperty("line2") ){
				var addressTwoText = document.createTextNode(itemConfig.address.line2),
					addressTwo =  document.createElement("span");
				addressTwo.classList.add("event-address");
				addressTwo.appendChild(addressTwoText);
				addressWrapper.appendChild(addressTwo);
			}

			medWrapper.appendChild(addressWrapper);
		}

		if(itemConfig.hasOwnProperty("categories")) {
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

	makeImageUrl(id){
		return `https://app.ticketmaster.com/discovery-widgets/v2/events/${id}/images.json`;
	}

	/* Config block */

	decConfig(config){
		return JSON.parse(window.atob(config));
	}

	encConfig(config){
		return window.btoa(config);
	}

	toShortISOString(dateObj){
		return dateObj.getFullYear() +
			"-" + (dateObj.getMonth() + 1 < 10 ? "0"+ (dateObj.getMonth()+ 1): dateObj.getMonth() + 1) +
			"-" + (dateObj.getDate() < 10 ? "0"+ dateObj.getDate(): dateObj.getDate()) +
			"T" + (dateObj.getHours() < 10 ? "0"+dateObj.getHours(): dateObj.getHours()) +
			":" + (dateObj.getMinutes() < 10 ? "0"+dateObj.getMinutes(): dateObj.getMinutes()) +
			":" + (dateObj.getSeconds() < 10 ? "0"+dateObj.getSeconds(): dateObj.getSeconds()) +
			"Z";
	}

	getDateFromPeriod(period){
		let firstDay = new Date();
		let lastDay = new Date();
		lastDay.setDate(lastDay.getDate() + 1);

		if (period != 'week') {
			period = new Date(document.querySelector('[w-type="calendar"]').getAttribute("w-period"));
			let firstDay = new Date(period);
			let lastDay = new Date(period);
			lastDay.setDate(lastDay.getDate() + 1);
			firstDay.setHours(0);   lastDay.setHours(23);
			firstDay.setMinutes(0); lastDay.setMinutes(59);
			firstDay.setSeconds(0); lastDay.setSeconds(59);
		}

		firstDay = new Date( new Date(new Date()).toISOString() );
		lastDay = new Date( new Date(new Date().valueOf()+24*60*60*1000).toISOString() );

		return [this.toShortISOString(firstDay), this.toShortISOString(lastDay)];
	}

}

