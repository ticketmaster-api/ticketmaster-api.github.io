class TicketmasterWidget {

  set config(attrs) { this.widgetConfig = this.loadConfig(attrs); }
  get config() { return this.widgetConfig; }

  set events(responce){ this.eventsList = this.parseEvents(responce);}
  get events(){ return this.eventsList;}

  get eventUrl(){ return "http://www.ticketmaster.com/event/"; }

  get apiUrl(){ return "https://app.ticketmaster.com/discovery/v2/events.json"; }

  //get themeUrl() { return "http://localhost:4000/widgets/main/theme/"; }
  get themeUrl() { return "http://ticketmaster-api-staging.github.io/widgets/main/theme/"; }
  get logoUrl() { return "http://developer.ticketmaster.com/"; }

  get updateExceptions() { return ["width","border","borderradius","colorscheme","Layout"]}

  get sliderSpeed(){ return 5000; }

  isConfigAttrEmpty(attr) {
    if( !this.config.hasOwnProperty(attr) || this.config[attr] === "undefined"){
      return false; }
    else if( this.config[attr] === ""){
      return false;
    }
    return true;
  }

  get eventReqAttrs(){
    let attrs = {};

    if(this.isConfigAttrEmpty("tmapikey"))
      attrs.apikey = this.config.tmapikey;
    if(this.isConfigAttrEmpty("keyword"))
      attrs.keyword = this.config.keyword;
    if(this.isConfigAttrEmpty("size"))
      attrs.size = this.config.size;
    if(this.isConfigAttrEmpty("radius"))
      attrs.radius = this.config.radius;
    if(this.isConfigAttrEmpty("postalcode"))
      attrs.postalcode = this.config.postalcode;
    if(this.isConfigAttrEmpty("attractionid"))
      attrs.attractionid = this.config.attractionid;
    if(this.isConfigAttrEmpty("promoterid"))
      attrs.promoterid = this.config.promoterid;

    return attrs;
  }

  //https://app.ticketmaster.com/discovery/v1/events/10004F84CD1C5395/images.json?apikey=KRUnjq8y8Sg5eDpP90dNzOK70d4WiUst

  constructor(selector) {

    this.widgetRoot = document.querySelector("div[w-tm-api-key]");

    this.eventsRootContainer = document.createElement("div");
    this.eventsRootContainer.classList.add("events-root-container");
    this.widgetRoot.appendChild(this.eventsRootContainer);

    this.eventsRoot = document.createElement("ul");
    this.eventsRoot.classList.add("events-root");
    this.eventsRootContainer.appendChild(this.eventsRoot);

    this.config = this.widgetRoot.attributes;

    if(this.config.theme !== null){
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
    this.eventsRootContainer.style.borderRadius =  `${this.config.borderradius}px`;

    this.clear();

    this.makeRequest( this.eventsLoadingHandler, this.apiUrl, this.eventReqAttrs );

    this.addWidgetRootLinks();
  }

  addWidgetRootLinks(){
    var legalNoticeContent = document.createTextNode('Legal Notice'),
        legalNotice = document.createElement("div");
    legalNotice.classList.add("legal-notice");
    legalNotice.appendChild(legalNoticeContent);

    var logo = document.createElement('a');
    logo.classList.add("event-logo");
    logo.target = '_blank';
    logo.href = this.logoUrl;

    this.widgetRoot.appendChild(legalNotice);
    this.widgetRoot.appendChild(logo);
  }

  initSlider(){
    if(this.sliderInterval) clearInterval(this.sliderInterval);
    var eventCount = this.eventsRoot.getElementsByClassName("event-wrapper").length;
    this.eventsRoot.style.marginLeft = '0%';
    this.eventsRoot.style.width = `${eventCount * 100}%`;
    if(eventCount > 1){
      var currentEvent = 1;
      this.sliderInterval = setInterval(()=> {
        this.eventsRoot.style.marginLeft = `-${currentEvent * 100}%`;
        if(eventCount - 1 > currentEvent){
          currentEvent ++;
        }else{
          currentEvent = 0;
        }
      }, this.sliderSpeed);
    }
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

  clear(){
    this.eventsRoot.innerHTML = "";
  }

  update() {

    let oldTheme = this.config.constructor();
    for (let attr in this.config) {
      if (this.config.hasOwnProperty(attr)) oldTheme[attr] = this.config[attr];
    }

    /*let oldTheme = {
      keyword: this.config.keyword,
      theme: this.config.theme,
      radius: this.config.radius,
      postalcode: this.config.postalcode,
      attractionid: this.config.attractionid,
      promoterid: this.config.attractionid
    };*/

    this.config = this.widgetRoot.attributes;

    /*if(this.config.theme !== null){
      this.makeRequest( this.styleLoadingHandler, this.themeUrl + this.config.theme + ".css" );
    }*/

    this.widgetRoot.style.height = `${this.config.height}px`;
    this.widgetRoot.style.width  = `${this.config.width}px`;
    this.eventsRootContainer.style.height = `${this.config.height}px`;
    this.eventsRootContainer.style.width  = `${this.config.width}px`;
    this.eventsRootContainer.style.borderRadius =  `${this.config.borderradius}px`;

    this.eventsRootContainer.classList.remove("border");
    if( this.config.hasOwnProperty("border") ){
      this.eventsRootContainer.classList.add("border");
    }

    /*var newTheme = this.config;
    Object.keys(newTheme).map(function(key){
      console.log([key,newTheme[key]]);
      return newTheme[key] === oldTheme[key] ;
    }).indexOf(false) === -1*/

    if(this.needToUpdate(this.config, oldTheme, this.updateExceptions)){
      this.clear();
      this.makeRequest( this.eventsLoadingHandler, this.apiUrl, this.eventReqAttrs );
    }
    else{
      var events = document.getElementsByClassName("event-wrapper");
      for(event in events){
        if(events.hasOwnProperty(event) && events[event].style !== undefined){
          events[event].style.width = `${this.config.width}px`;
          events[event].style.height = `${this.config.height}px`;
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
        style.textContent = this.responseText;
        document.getElementsByTagName("head")[0].appendChild(style);
      }
      else {
        alert("theme wasn't loaded")
      }
    }
  }

  eventsLoadingHandler(){
    if (this && this.readyState == XMLHttpRequest.DONE ) {
      if(this.status == 200){
        let widget = this.widget;

        widget.events = JSON.parse(this.responseText);
        widget.events.map(function(event){
          widget.publishEvent(event);
        });

        widget.initSlider();
      }
      else if(this.status == 400) {
        alert('There was an error 400')
      }
      else {
        alert('something else other than 200 was returned')
      }
    }
  }


  publishEvent(event){
    let DOMElement = this.createDOMItem(event);
    this.eventsRoot.appendChild(DOMElement);
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
        currentEvent.url = eventsSet[key].eventUrl ? eventsSet[key].eventUrl : this.eventUrl + currentEvent.id;
        currentEvent.name = eventsSet[key].name;

        currentEvent.date = {
          day: eventsSet[key].dates.start.localDate,
          time: eventsSet[key].dates.start.localTime
        };

        if(eventsSet[key]._embedded.venues[0].address){
          currentEvent.address = eventsSet[key]._embedded.venues[0].address;
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

  createDOMItem(itemConfig){

    var medWrapper = document.createElement("a");
    medWrapper.classList.add("event-content-wraper");
    medWrapper.target = '_blank';
    medWrapper.href = itemConfig.url;

    var event = document.createElement("li");
    event.classList.add("event-wrapper");
    event.style.backgroundImage = `url('${itemConfig.img}')`;
    event.style.height = `${this.config.height}px`;
    event.style.width  = `${this.config.width}px`;

    var nameContent = document.createTextNode(itemConfig.name),
    name =  document.createElement("span");
    name.classList.add("event-name");
    name.appendChild(nameContent);
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



}

const widget = new TicketmasterWidget("#ticketmaster-config");
