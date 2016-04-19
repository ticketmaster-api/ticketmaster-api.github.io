class CountdownClock {
  set endTime(endTime) { this.config.endTime = endTime; }
  get endTime(){ return this.config.endTime || new Date();}

  set interval(interval) { return this.config.interval = interval; }
  get interval(){ return this.config.interval || 1000;}

  set onChange(fn) { return this.config.onChange = fn; }
  get onChange(){ return this.config.onChange || ((time) => {})}

  constructor(config = {}) {
    this.config = config;
    this.updateClock();
    if(this.config.endTime) this.initInterval();
  }

  initInterval(){
    this.timeinterval = setInterval(this.updateClock.bind(this), this.interval);
  }

  update(endTime){
    clearInterval(this.timeinterval);
    this.endTime = endTime;
    this.updateClock();
    if(endTime) this.initInterval();
  }

  updateClock() {
    let timeRemaining = this.getTimeRemaining();
    this.onChange(timeRemaining);
    if (timeRemaining.total <= 0) clearInterval(this.timeinterval);
  }

  getTimeRemaining() {
    let total = Date.parse(this.endTime) - Date.parse(new Date());
    if(total < 0) total = 0;
    let seconds = Math.floor((total / 1000) % 60),
      minutes = Math.floor((total / 1000 / 60) % 60),
      hours = Math.floor((total / 3600000 /* (1000 * 60 * 60) */) % 24),
      days = Math.floor(total / 86400000 /* (1000 * 60 * 60 * 24) */);
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }
}

class TicketmasterCountdownWidget {

  set config(attrs) { this.widgetConfig = this.loadConfig(attrs); }
  get config() { return this.widgetConfig; }

  set event(responce){ this.eventResponce = this.parseEvent(responce);}
  get event(){ return this.eventResponce;}

  get borderSize(){ return this.config.border || 0;}

  get eventUrl(){ return "http://www.ticketmaster.com/event/"; }

  get apiUrl(){ return this.config.id ? `https://app.ticketmaster.com/discovery/v2/events/${this.config.id}.json` : false; }

  // get themeUrl() { return "http://10.24.12.162:4000/products-and-docs/widgets/countdown/1.0.0/theme/"; }
  get themeUrl() { return "http://ticketmaster-api-staging.github.io/products-and-docs/widgets/countdown/1.0.0/theme/"; }

  get portalUrl(){ return "http://ticketmaster-api-staging.github.io/"; }

  get logoUrl() { return "http://developer.ticketmaster.com/"; }

  get legalNoticeUrl() { return "http://developer.ticketmaster.com/support/terms-of-use/"; }

  get questionUrl() { return "http://developer.ticketmaster.com/support/faq/"; }

  get updateExceptions() { return ["width", "height", "border", "borderradius", "layout", "propotion"]}

  get hideMessageDelay(){ return 5000; }

  get tmWidgetWhiteList(){ return ["2200504BAD4C848F", "00005044BDC83AE6", "1B005068DB60687F", "1B004F4DBEE45E47", "3A004F4ED7829D5E", "3A004F4ED1FC9B63", "1B004F4FF83289C5", "1B004F4FC0276888", "0E004F4F3B7DC543", "1D004F4F09C61861", "1600505AC9A972A1", "22004F4FD82795C6", "01005057AFF54574", "01005056FAD8793A", "3A004F4FB2453240", "22004F50D2149AC6", "01005059AD49507A", "01005062B4236D5D"]; }

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
      }
    ];

    for(let i in params){
      let item = params[i];
      if(this.isConfigAttrExistAndNotEmpty(item.attr))
        attrs[item.verboseName] = this.config[item.attr];
    }

    return attrs;
  }

  constructor(root) {
    this.widgetRoot = root;

    this.eventsRootContainer = document.createElement("div");
    this.eventsRootContainer.classList.add("events-root-container");
    this.widgetRoot.appendChild(this.eventsRootContainer);

    this.eventsRoot = document.createElement("ul");
    this.eventsRoot.classList.add("events-root");
    this.eventsRootContainer.appendChild(this.eventsRoot);

    // Set theme modificators
    // this.themeModificators = {
    //   "oldschool" : this.oldSchoolModificator.bind(this)
    // };

    this.config = this.widgetRoot.attributes;

    if(this.config.theme !== null && !document.getElementById(`widget-theme-${this.config.theme}`)){
      this.makeRequest( this.styleLoadingHandler, this.themeUrl + this.config.theme + ".css" );
    }

    this.widgetRoot.style.height = `${this.config.height}px`;
    this.widgetRoot.style.width  = `${this.config.width}px`;

    this.eventsRootContainer.style.height = `${this.config.height}px`;
    this.eventsRootContainer.style.width  = `${this.config.width}px`;
    this.eventsRootContainer.style.borderRadius = `${this.config.borderradius}px`;
    this.eventsRootContainer.style.borderWidth = `${this.borderSize}px`;

    this.AdditionalElements();

    this.initMessage();

    this.initBuyBtn();

    this.buildCountdown();

    if(this.apiUrl){
      this.makeRequest( this.eventsLoadingHandler, this.apiUrl, this.eventReqAttrs );
    }else{
      this.showMessage("Please enter event ID.", true);
    }

    // if( this.themeModificators.hasOwnProperty( this.widgetConfig.theme ) ) {
    //   this.themeModificators[ this.widgetConfig.theme ]();
    // }

    this.embedUniversePlugin();
    this.embedTMPlugin();


    this.countdownClock = new CountdownClock({
      onChange: this.onCountdownChange.bind(this)
    });
  }

  getNormalizedDateValue(val){
    return (val < 0 || val > 9 ? "" : "0") + val
  }

  onCountdownChange(data){
    this.countDownDays.innerHTML = this.getNormalizedDateValue(data.days);
    this.countDownHours.innerHTML = this.getNormalizedDateValue(data.hours);
    this.countDownMinute.innerHTML = this.getNormalizedDateValue(data.minutes);
  }

  buildCountdown(){
    // this.widgetRoot
    let countDown = document.createElement("div");
    countDown.classList.add("events-count-down");

    this.countDownDays = document.createElement("span");
    this.countDownHours = document.createElement("span");
    this.countDownMinute = document.createElement("span");

    this.countDownDays.innerHTML = '00';
    this.countDownHours.innerHTML = '00';
    this.countDownMinute.innerHTML = '00';

    this.countDownDays.classList.add("events-count-down__day");
    this.countDownHours.classList.add("events-count-down__hour");
    this.countDownMinute.classList.add("events-count-down__minute");

    countDown.appendChild(this.countDownDays);
    countDown.appendChild(this.countDownHours);
    countDown.appendChild(this.countDownMinute);

    this.eventsRootContainer.appendChild(countDown);
  }

  initBuyBtn(){
    this.buyBtn = document.createElement("a");
    this.buyBtn.appendChild(document.createTextNode('BUY NOW'));
    this.buyBtn.classList.add("event-buy-btn");
    this.buyBtn.target = '_blank';
    this.buyBtn.href = '';
    this.buyBtn.addEventListener('click', (e) => {
      e.preventDefault();
    });
    this.eventsRootContainer.appendChild(this.buyBtn);
  }

  setBuyBtnUrl(){
    if(this.buyBtn){
      let event = this.event,
          url = '';
      if(event){
        if(event.url){
          if((this.isUniversePluginInitialized && this.isUniverseUrl(event.url)) || (this.isTMPluginInitialized && this.isAllowedTMEvent(event.url))){
            url = event.url;
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

  // Message
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
    }
  }

  hideMessage(){
    if(this.messageTimeout) clearTimeout(this.messageTimeout); // Clear timeout and hide message immediately.
    this.messageDialog.classList.remove("event-message-visible");
  }
  // End message

  AdditionalElements(){
    var legalNoticeContent = document.createTextNode('Legal Notice'),
        legalNotice = document.createElement("a");
    legalNotice.appendChild(legalNoticeContent);
    legalNotice.classList.add("legal-notice");
    legalNotice.target = '_blank';
    legalNotice.href = this.legalNoticeUrl;
    this.widgetRoot.appendChild(legalNotice);

    var logo = document.createElement('a');
    logo.classList.add("event-logo");
    logo.target = '_blank';
    logo.href = this.logoUrl;

    var logoBox = document.createElement('div');
    logoBox.classList.add("event-logo-box");
    logoBox.appendChild(logo);
    this.eventsRootContainer.appendChild(logoBox);

    let question = document.createElement('a');
    question.classList.add("event-question");
    question.target = '_blank';
    question.href = this.questionUrl;
    this.eventsRootContainer.appendChild(question);
  }

  //adds general admission element for OLDSCHOOL theme
  // oldSchoolModificator(){
  // }

  formatDate(date) {
    var result = '';
    if(!date.day) return result; // Day is required

    var MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
        dayArray = date.day.split('-'),
        d = parseInt(dayArray[2]),
        M = parseInt(dayArray[1]);

    var E = new Date(date.day).getDay();
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

    return result + ' ' + this.getNormalizedDateValue(H) + ':' + m + ' ' + a;
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

  update() {

    let oldTheme = this.config.constructor();
    for (let attr in this.config) {
      if (this.config.hasOwnProperty(attr)) oldTheme[attr] = this.config[attr];
    }

    this.config = this.widgetRoot.attributes;
    this.widgetRoot.style.height = `${this.config.height}px`;
    this.widgetRoot.style.width  = `${this.config.width}px`;
    this.eventsRootContainer.style.height = `${this.config.height}px`;
    this.eventsRootContainer.style.width  = `${this.config.width}px`;
    this.eventsRootContainer.style.borderRadius = `${this.config.borderradius}px`;
    this.eventsRootContainer.style.borderWidth = `${this.borderSize}px`;

    if(this.needToUpdate(this.config, oldTheme, this.updateExceptions)){
      this.clear();

      // if( this.themeModificators.hasOwnProperty( this.widgetConfig.theme ) ) {
      //   this.themeModificators[ this.widgetConfig.theme ]();
      // }

      if(this.apiUrl){
        this.makeRequest( this.eventsLoadingHandler, this.apiUrl, this.eventReqAttrs );
      }else{
        this.showMessage("No results were found.", true);
        this.countdownClock.update(null);
      }
    }else{
      let events = this.widgetRoot.getElementsByClassName("event-wrapper");
      for(let i in events){
        if(events.hasOwnProperty(i) && events[i].style !== undefined){
          events[i].style.width = `${this.config.width - this.borderSize * 2}px`;
          events[i].style.height = `${this.config.height - this.borderSize * 2}px`;
        }
      }
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
        //alert("theme wasn't loaded");
        console.log("theme wasn't loaded");
      }
    }
  }

  onEventLoadError(status){
    this.event = false;
    this.showMessage("No results were found.", true);
    console.log(`There was an error status - ${status}`);
  }

  eventsLoadingHandler(){
    let widget = this.widget;
    widget.clearEvents(); // Additional clearing after each loading
    if (this && this.readyState == XMLHttpRequest.DONE ) {
      if(this.status == 200){
        widget.event = JSON.parse(this.responseText);
        if(widget.event){
          widget.publishEvent(widget.event);
          widget.hideMessage();
        }
      }
      else if(this.status == 400) {
        widget.onEventLoadError.call(widget, this.status);
      }
      else {
        widget.onEventLoadError.call(widget, this.status);
      }
      // http://js2coffee.thomaskalka.de/ - widget.event?.date?.dateTime
      let _ref, _ref2;
      widget.countdownClock.update((_ref = widget.event) != null ? (_ref2 = _ref.date) != null ? _ref2.dateTime : void 0 : void 0);
    }
    widget.setBuyBtnUrl();
  }

  publishEvent(event, parentNode){
    parentNode = parentNode || this.eventsRoot;
    let DOMElement = this.createDOMItem(event);
    parentNode.appendChild(DOMElement);
  }

  getImageForEvent(images){
    var width = this.config.width,
      height = this.config.height;

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

  parseEvent(eventSet){
    if(!eventSet.id){
      if(typeof($widgetModalNoCode) !== "undefined"){
        $widgetModalNoCode.modal();
      }
      return false;
    }

    let currentEvent = {};

    currentEvent.id = eventSet.id;
    currentEvent.url = eventSet.url;
    currentEvent.name = eventSet.name;

    currentEvent.date = {
      day: eventSet.dates.start.localDate,
      time: eventSet.dates.start.localTime,
      dateTime: eventSet.dates.start.dateTime
    };

    if(eventSet.hasOwnProperty('_embedded') && eventSet._embedded.hasOwnProperty('venues')){
      let venue = eventSet._embedded.venues[0];
      if(venue){
        if(venue.address)
          currentEvent.address = venue.address;

        if(venue.name){
          if(!currentEvent.address) currentEvent.address = {};
          currentEvent.address.name = venue.name;
        }
      }
    }

    currentEvent.img = this.getImageForEvent(eventSet.images);
    return currentEvent;
  }


  makeRequest(handler, url=this.apiUrl, attrs={}, method="GET"){
    attrs = Object.keys(attrs).map(function(key){
      return `${key}=${attrs[key]}`;
    }).join("&");

    url = [url,attrs].join("?");

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
    }
    return el;
  }


  createDOMItem(itemConfig){
    var medWrapper = document.createElement("div");
    medWrapper.classList.add("event-content-wraper");

    var event = document.createElement("li");
    event.classList.add("event-wrapper");
    event.style.height = `${this.config.height - this.borderSize * 2}px`;
    event.style.width  = `${this.config.width - this.borderSize * 2}px`;

    var image = document.createElement("span");
    image.classList.add("bg-cover");
    image.style.backgroundImage = `url('${itemConfig.img}')`;
    event.appendChild(image);

    var nameContent = document.createTextNode(itemConfig.name),
    name =  document.createElement("span");
    name.classList.add("event-name");
    name.appendChild(nameContent);
    this.initPretendedLink(name, itemConfig.url, true);
    medWrapper.appendChild(name);


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

  /*
   * Config block
   */

  decConfig(config){
    return JSON.parse(window.atob(config));
  }

  encConfig(config){
    return window.btoa(config);
  }

}

let widgetsCountdown = [];
(function () {
  let widgetContainers = document.querySelectorAll("div[w-type='countdown']");
  for (let i = 0; i < widgetContainers.length; ++i) {
    widgetsCountdown.push(new TicketmasterCountdownWidget(widgetContainers[i]));
  }
})();
