class TicketmasterWidget {

  set config(attrs) { this.widgetConfig = this.loadConfig(attrs); }
  get config() { return this.widgetConfig; }

  set events(responce){ this.eventsList = this.parseEvents(responce);}
  get events(){ return this.eventsList;}

  get borderSize(){ return this.config.border || 0;}

  get eventUrl(){ return "http://www.ticketmaster.com/event/"; }

  get apiUrl(){ return "https://app.ticketmaster.com/discovery/v2/events.json"; }

  get themeUrl() { return "http://localhost:4000/products-and-docs/widgets/event-discovery/theme/"; }
  // get themeUrl() { return "http://ticketmaster-api-staging.github.io/products-and-docs/widgets/event-discovery/theme/"; }

  get portalUrl(){ return "http://ticketmaster-api-staging.github.io/"; }

  get logoUrl() { return "http://developer.ticketmaster.com/"; }

  get legalNoticeUrl() { return "http://developer.ticketmaster.com/support/terms-of-use/"; }

  get questionUrl() { return "http://developer.ticketmaster.com/support/faq/"; }

  get geocodeUrl() { return "https://maps.googleapis.com/maps/api/geocode/json"; }

  get updateExceptions() { return ["width", "height", "border", "borderradius", "colorscheme", "layout", "affiliateid", "propotion"]}

  get sliderDelay(){ return 5000; }

  get sliderRestartDelay(){ return 5000; }

  get hideMessageDelay(){ return 5000; }

  get controlHiddenClass(){ return "events_control-hidden"; }

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

    return attrs;
  }

  //https://app.ticketmaster.com/discovery/v1/events/10004F84CD1C5395/images.json?apikey=KRUnjq8y8Sg5eDpP90dNzOK70d4WiUst

  constructor() {
    this.widgetRoot = document.querySelector("div[w-tmapikey]");

    this.eventsRootContainer = document.createElement("div");
    this.eventsRootContainer.classList.add("events-root-container");
    this.widgetRoot.appendChild(this.eventsRootContainer);

    this.eventsRootDiv = document.createElement("div");
    this.eventsRootDiv.setAttribute("id", "ss");
    this.eventsRootContainer.appendChild(this.eventsRootDiv);

    this.eventsRoot = document.createElement("ul");
    this.eventsRoot.classList.add("events-root");
    this.eventsRootDiv.appendChild(this.eventsRoot);

    // Set theme modificators
    this.themeModificators = {
      "oldschool" : this.oldSchoolModificator.bind(this),
      "newschool" : this.newSchoolModificator.bind(this),
      "listview" : this.listViewModificator.bind(this)
    };

    this.config = this.widgetRoot.attributes;

    if(this.config.theme !== null && !document.getElementById(`widget-theme-${this.config.theme}`)){
      this.makeRequest( this.styleLoadingHandler, this.themeUrl + this.config.theme + ".css" );
    }

    this.eventsRootContainer.classList.remove("border");
    if(this.config.border){
      this.eventsRootContainer.classList.add("border");
    }

    this.widgetRoot.style.height = `${this.config.height}px`;
    this.widgetRoot.style.width  = `${this.config.width}px`;

    this.eventsRootContainer.style.height = `${this.config.height}px`;
    this.eventsRootContainer.style.width  = `${this.config.width}px`;
    this.eventsRootContainer.style.borderRadius = `${this.config.borderradius}px`;
    this.eventsRootContainer.style.borderWidth = `${this.borderSize}px`;

    //this.clear();

    this.AdditionalElements();

    this.getCoordinates(() => {
      this.makeRequest( this.eventsLoadingHandler, this.apiUrl, this.eventReqAttrs );
    });

    if( this.themeModificators.hasOwnProperty( this.widgetConfig.theme ) ) {
      this.themeModificators[ this.widgetConfig.theme ]();
    }

    /*plugins for 'buy button'*/
    this.embedUniversePlugin();
    this.embedTMPlugin();

    this.initBuyBtn();

    this.initMessage();

    if (this.config.theme !== "listview") this.initSliderControls();

    if (this.config.theme !== "listview") this.initEventCounter();

    if (this.config.theme === "listview") this.addScroll();;
  }
  
  getCoordinates(cb){
    let widget = this;

    function parseGoogleGeocodeResponse(){
      if (this && this.readyState === XMLHttpRequest.DONE ) {
        let latlong = '',
            response = null,
            countryShortName = '';
        if(this.status === 200) {
          response = JSON.parse(this.responseText);
          if(response.status === 'OK' && response.results.length){
            // Use first item if multiple results was found in one country or in different
            let geometry = response.results[0].geometry;
            countryShortName = response.results[0].address_components[response.results[0].address_components.length - 1].short_name;

            // If multiple results without country try to find USA as prefer value
            if(!widget.config.country){
              for(let i in response.results){
                let result = response.results[i];
                if(result.address_components){
                  let country = result.address_components[result.address_components.length - 1];
                  if(country){
                    if(country.short_name === 'US'){
                      countryShortName = 'US';
                      geometry = result.geometry;
                    }
                  }
                }
              }
            }

            if(geometry){
              if(geometry.location){
                latlong = `${geometry.location.lat},${geometry.location.lng}`;
              }
            }
          }
        }
        // Used in builder
        if(widget.onLoadCoordinate) widget.onLoadCoordinate(response, countryShortName);
        widget.config.latlong = latlong;
        cb(widget.config.latlong);
      }
    }

    if(this.isConfigAttrExistAndNotEmpty('postalcode')){
      let args = {components: `postal_code:${widget.config.postalcode}`};
      if(this.config.country){
        args.components += `|country:${this.config.country}`;
      }
      this.makeRequest( parseGoogleGeocodeResponse, this.geocodeUrl, args);
    }else{
      // Used in builder
      if(widget.onLoadCoordinate) widget.onLoadCoordinate(null);
      widget.config.latlong = '';
      widget.config.country = '';
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
    this.buyBtn.addEventListener('click', (e)=> {
      e.preventDefault(); /*used in plugins for 'buy button'*/
      this.stopAutoSlideX();
      //console.log(this.config.affiliateid)
    });
    this.eventsRootContainer.appendChild(this.buyBtn);
  }

  setBuyBtnUrl(){
    if(this.buyBtn){
      let event = this.eventsGroups[this.currentSlideX][this.currentSlideY],
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
    let script = document.createElement('script');
    script.setAttribute('src', this.portalUrl + 'scripts/vendors/tm.js');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('charset', 'UTF-8');
    (document.head || document.getElementsByTagName('head')[0]).appendChild(script);
    this.isTMPluginInitialized = true;
  }

  embedUniversePlugin(){
    let script = document.createElement('script');
    script.setAttribute('src', 'https://www.universe.com/embed.js');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('charset', 'UTF-8');
    (document.head || document.getElementsByTagName('head')[0]).appendChild(script);
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
  oldSchoolModificator(){

    var generalAdmissionWrapper = document.createElement("div");
        generalAdmissionWrapper.classList.add("general-admission", "modificator");

    var generalAdmission = document.createElement("div"),
        generalAdmissionText = document.createTextNode('GENERAL ADMISSION');
        generalAdmission.appendChild(generalAdmissionText);
        generalAdmissionWrapper.appendChild(generalAdmission);

    this.eventsRootContainer.appendChild(generalAdmissionWrapper);
  }

  newSchoolModificator(){
    var ticketLogo = document.createElement("div");
    ticketLogo.classList.add("ticket-logo", "modificator");

    var headLogo = document.createElement("img");
    headLogo.setAttribute("src", this.logoUrl + "assets/img/footer/ticketmaster-logo-white.svg");
    headLogo.setAttribute("height", "11");
    ticketLogo.appendChild(headLogo);

    headLogo = document.createElement("img");
    headLogo.setAttribute("src", this.logoUrl + "assets/img/footer/ticketmaster-logo-white.svg");
    headLogo.setAttribute("height", "11");
    ticketLogo.appendChild(headLogo);

    headLogo = document.createElement("img");
    headLogo.setAttribute("src", this.logoUrl + "assets/img/footer/ticketmaster-logo-white.svg");
    headLogo.setAttribute("height", "11");
    ticketLogo.appendChild(headLogo);

    headLogo = document.createElement("img");
    headLogo.setAttribute("src", this.logoUrl + "assets/img/footer/ticketmaster-logo-white.svg");
    headLogo.setAttribute("height", "11");
    ticketLogo.appendChild(headLogo);

    this.eventsRootContainer.appendChild(ticketLogo);
  }

  listViewModificator(){
    /*
    var scrollRoot = document.getElementById("ss");
    SimpleScrollbar.initEl(scrollRoot);
    */
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
      eventGroup.style.marginTop = `-${this.currentSlideY * (this.config.height - this.borderSize * 2)}px`;
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
      if(this.config.theme !== "listview") e.preventDefault(); /*used in plugins for 'buy button'*/
      handleTouchStart.call(this, e);
    }, false);
    this.eventsRootContainer.addEventListener('touchmove', (e)=> {
      if(this.config.theme !== "listview") e.preventDefault();
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
    if(!date.day) return result; // Day is required

    function LZ(x) {
      return (x < 0 || x > 9 ? "" : "0") + x
    }
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


    if(this.config.theme !== "listview") {
      var eventsRootContainer = document.getElementsByClassName("events-root-container")[0];
      var eventsRoot = document.getElementsByClassName("events-root")[0];
      var ss = document.getElementById("ss");
      ss.parentNode.removeChild(ss);

      var ssDiv = document.createElement("div");
      ssDiv.setAttribute("id", "ss");
      eventsRootContainer.appendChild(ssDiv);

      var ssDiv = document.getElementById("ss");
      ssDiv.appendChild(eventsRoot);

      var eventsRootContainer = document.getElementsByClassName("widget-container--discovery")[0];
      eventsRootContainer.classList.remove("listview-after");
    }

    if(this.config.theme === "listview") {
      var eventsRootContainer = document.getElementsByClassName("widget-container--discovery")[0];
      eventsRootContainer.classList.add("listview-after");
    }


    this.clearEvents();
  }

  update() {

    let oldTheme = this.config.constructor();
    for (let attr in this.config) {
      if (this.config.hasOwnProperty(attr)) oldTheme[attr] = this.config[attr];
    }

    this.config = this.widgetRoot.attributes;

    if(this.config.theme === "listview") {
      this.stopAutoSlideX();
    }

    /*if(this.config.theme !== null){
      this.makeRequest( this.styleLoadingHandler, this.themeUrl + this.config.theme + ".css" );
    }*/

    this.widgetRoot.style.height = `${this.config.height}px`;
    this.widgetRoot.style.width  = `${this.config.width}px`;
    this.eventsRootContainer.style.height = `${this.config.height}px`;
    this.eventsRootContainer.style.width  = `${this.config.width}px`;
    this.eventsRootContainer.style.borderRadius = `${this.config.borderradius}px`;
    this.eventsRootContainer.style.borderWidth = `${this.borderSize}px`;

    this.eventsRootContainer.classList.remove("border");
    if( this.config.hasOwnProperty("border") ){
      this.eventsRootContainer.classList.add("border");
    }

    if(this.needToUpdate(this.config, oldTheme, this.updateExceptions)){
      this.clear();

      if( this.themeModificators.hasOwnProperty( this.widgetConfig.theme ) ) {
        this.themeModificators[ this.widgetConfig.theme ]();
      }

      this.getCoordinates(() => {
        this.makeRequest( this.eventsLoadingHandler, this.apiUrl, this.eventReqAttrs );
      });

      if(this.config.theme === "listview") this.addScroll();
    }
    else{
      let events = document.getElementsByClassName("event-wrapper");
      for(let i in events){
        if(events.hasOwnProperty(i) && events[i].style !== undefined){
          events[i].style.width = `${this.config.width - this.borderSize * 2}px`;
          events[i].style.height = `${this.config.height - this.borderSize * 2}px`;
        }
      }
      if(this.config.theme !== "listview") {
        this.goToSlideY(0);
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
        ['radius'],
        ['postalCode', 'latlong'],
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

      if(this.reduceParamsOrder === 0) this.showMessage("No results were found.<br/>Here other options for you.");
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
    widget.clearEvents(); // Additional clearing after each loading
    if (this && this.readyState == XMLHttpRequest.DONE ) {
      if(this.status == 200){
        widget.events = JSON.parse(this.responseText);

        if(widget.events.length){
          widget.groupEventsByName.call(widget);

          widget.eventsGroups.map(function(group, i){
            if(group.length === 1)
              widget.publishEvent(group[0]);
            else
              widget.publishEventsGroup.call(widget, group, i);
          });

          if (widget.config.theme !== "listview") widget.initSlider();
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
    groupNodeWrapper.style.width  = `${this.config.width - this.borderSize * 2}px`;
    groupNodeWrapper.style.height = `${this.config.height - this.borderSize * 2}px`;

    let groupNode = document.createElement("ul");
    groupNode.classList.add("event-group");
    groupNode.classList.add("event-group-" + index);
    //groupNode.style.height  = `${this.config.height * group.length}px`;

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

        let venue = eventsSet[key]._embedded.venues[0];
        if(venue){
          if(venue.address)
            currentEvent.address = venue.address;

          if(venue.name){
            if(!currentEvent.address) currentEvent.address = {};
            currentEvent.address.name = venue.name;
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

  createBackgroundImage(event, img) {
    if (this.config.theme !== "listview") {
      var image = document.createElement("span");
      image.classList.add("bg-cover");
      image.style.backgroundImage = `url('${img}')`;
      event.appendChild(image);
    }
  }

  addBuyButton(domNode, url) {
    if (this.config.theme === "listview") {
      let _urlValid = ( this.isUniversePluginInitialized && this.isUniverseUrl(url) ) || ( this.isTMPluginInitialized && this.isAllowedTMEvent(url) );
      if(!_urlValid) url = '';
      let buyBtn = document.createElement("a");
      buyBtn.appendChild(document.createTextNode('BUY NOW'));
      buyBtn.classList.add("event-buy-btn");
      buyBtn.target = '_blank';
      buyBtn.href = url;
      domNode.appendChild(buyBtn);
    }
  }

  addScroll() {
    (function(n,t){function u(n){n.hasOwnProperty("data-simple-scrollbar")||Object.defineProperty(n,"data-simple-scrollbar",new SimpleScrollbar(n))}function e(n,i){function f(n){var t=n.pageY-u;u=n.pageY;r(function(){i.el.scrollTop+=t/i.scrollRatio})}function e(){n.classList.remove("ss-grabbed");t.body.classList.remove("ss-grabbed");t.removeEventListener("mousemove",f);t.removeEventListener("mouseup",e)}var u;n.addEventListener("mousedown",function(i){return u=i.pageY,n.classList.add("ss-grabbed"),t.body.classList.add("ss-grabbed"),t.addEventListener("mousemove",f),t.addEventListener("mouseup",e),!1})}function i(n){for(this.target=n,this.bar='<div class="ss-scroll">',this.wrapper=t.createElement("div"),this.wrapper.setAttribute("class","ss-wrapper"),this.el=t.createElement("div"),this.el.setAttribute("class","ss-content"),this.wrapper.appendChild(this.el);this.target.firstChild;)this.el.appendChild(this.target.firstChild);this.target.appendChild(this.wrapper);this.target.insertAdjacentHTML("beforeend",this.bar);this.bar=this.target.lastChild;e(this.bar,this);this.moveBar();this.el.addEventListener("scroll",this.moveBar.bind(this));this.el.addEventListener("mouseenter",this.moveBar.bind(this));this.target.classList.add("ss-container")}function f(){for(var i=t.querySelectorAll("*[ss-container]"),n=0;n<i.length;n++)u(i[n])}var r=n.requestAnimationFrame||n.setImmediate||function(n){return setTimeout(n,0)};i.prototype={moveBar:function(){var t=this.el.scrollHeight,i=this.el.clientHeight,n=this;this.scrollRatio=i/t;r(function(){n.bar.style.cssText="height:"+i/t*100+"%; top:"+n.el.scrollTop/t*100+"%;right:-"+(n.target.clientWidth-n.bar.clientWidth)+"px;"})}};t.addEventListener("DOMContentLoaded",f);i.initEl=u;i.initAll=f;n.SimpleScrollbar=i})(window,document)
    var scrollRoot = document.getElementById("ss");
    SimpleScrollbar.initEl(scrollRoot);
  }

  createDOMItem(itemConfig){
    var medWrapper = document.createElement("div");
    medWrapper.classList.add("event-content-wraper");

    var event = document.createElement("li");
    event.classList.add("event-wrapper");
    event.style.height = `${this.config.height - this.borderSize * 2}px`;
    event.style.width  = `${this.config.width - this.borderSize * 2}px`;

    this.createBackgroundImage(event, itemConfig.img);

    var nameContent = document.createTextNode(itemConfig.name),
    name =  document.createElement("span");
    name.classList.add("event-name");
    name.appendChild(nameContent);
    this.initPretendedLink(name, itemConfig.url, true);
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
    return `https://app.ticketmaster.com/discovery/v2/events/${id}/images.json`;
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

    var date = new Date(),
      period = period.toLowerCase(),
      firstDay, lastDay;

    if(period == "year" ){
      firstDay = new Date(date.getFullYear(),0,1),
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

}

const widget = new TicketmasterWidget();
