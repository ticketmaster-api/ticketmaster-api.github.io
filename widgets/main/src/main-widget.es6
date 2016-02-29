/*
 {"ak":"KRUnjq8y8Sg5eDpP90dNzOK70d4WiUst","kw":"zztop","t":{"b":"t1","h":200,"w":150}}
 {
 "ak":"KRUnjq8y8Sg5eDpP90dNzOK70d4WiUst", #ApiKey
 "kw":"zztop", #KeyWords
 "t":{ #Theme
 "b":"t1", #baseTheme - if null do not load theme
 "h":300,
 "w":150
 }
 })

 -API key       # input
 -Key word      # input
 -Postal Code   # input
 -Theme         # Buttons
 -Color Scheme  # Buttons
 -Layout        # Buttons
 -Height        # Slider
 -Width         # Slider
 -Border Radius # Slider

 */



class TicketmasterWidget {

  set config(config) { this.widgetConfig = this.decConfig(config); }
  get config() { return this.widgetConfig; }
  set events(responce){ this.eventsList = this.parseEvents(responce); this.update();}
  get events(){ return this.eventsList;}
  get apiUrl(){ return "https://app.ticketmaster.com/discovery/v1/events.json"; }
  get themeUrl() { return "http://localhost:4000/widgets/main/theme/"; }

  //https://app.ticketmaster.com/discovery/v1/events/10004F84CD1C5395/images.json?apikey=KRUnjq8y8Sg5eDpP90dNzOK70d4WiUst

  constructor(selector) {
    this.widgetRoot = document.querySelectorAll(selector)[0];
    this.eventsRoot = document.createElement("ul");
    this.eventsRoot.classList.add("events-root");
    this.widgetRoot.appendChild(this.eventsRoot);

    this.config = this.loadConfig();

    if(this.config.t.b !== null){
      this.makeRequest( this.styleLoadingHandler, this.themeUrl + this.config.t.b + ".css" );
    }

    this.widgetRoot.style.height = `${this.config.t.h}px`;
    this.widgetRoot.style.width  = `${this.config.t.w}px`;

    this.makeRequest( this.eventsLoadingHandler, this.apiUrl, {apikey: this.config.ak, keyword: this.config.kw} );
  }

  loadConfig(){
    return this.widgetRoot.dataset.config ? this.widgetRoot.dataset.config : null;
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
        this.widget.events = JSON.parse(this.responseText);
        //this.widget.build();
        this.widget.loadImages();
      }
      else if(this.status == 400) {
        alert('There was an error 400')
      }
      else {
        alert('something else other than 200 was returned')
      }
    }
  }


  loadImages(){
    var self = this;
    this.events.forEach(function(event){
      var url = self.makeImageUrl(event.id);
      self.makeRequest(self.loadImagesHandler ,url, {apikey: self.config.ak});
    })
  }

  loadImagesHandler(){
    if (this && this.readyState == XMLHttpRequest.DONE ) {
      if(this.status == 200){
        let response = JSON.parse(this.responseText);
        let event = this.widget.getEventByID(response.id);
        event.img = this.widget.getImageForEvent(response.images);
        this.widget.publishEvent(event);
      }
      else {
        console.error('Fail to load IMG for event');
      }
    }
  }

  publishEvent(event){
    let DOMElement = this.createDOMItem(event);
    this.eventsRoot.appendChild(DOMElement);
  }

  getEventByID(id){
    for(let index in this.events){
      if(this.events[index].id === id){
        return this.events[index]
      }
    }
  }

  getImageForEvent(images){
    var width = this.config.t.w,
      height = this.config.t.h;

    images.sort(function(a,b) {
      if (a.width < b.width)
        return -1;
      else if (a.width > b.width)
        return 1;
      else
        return 0;
    });

    var myimg;
    images.forEach(function(element, index, array){
      if(element.width >= width && element.height >= height && !myimg){
        myimg = element.url;
      }
    });
    return myimg;
  }

  parseEvents(eventsSet){
    eventsSet = eventsSet._embedded.events;
    var tmpEventSet = [];
    for(var key in eventsSet){
      let currentEvent = {};
      currentEvent.id = eventsSet[key].id;
      currentEvent.url = eventsSet[key].eventUrl ? eventsSet[key].eventUrl : "";
      currentEvent.name = eventsSet[key].name;
      currentEvent.date = {
        day: eventsSet[key].dates.start.localDate,
        time: eventsSet[key].dates.start.localTime
      };
      let eventCategories = eventsSet[key]._embedded.categories;
      currentEvent.categories = Object.keys(eventCategories).map(function(category){
        return eventCategories[category].name
      });

      tmpEventSet.push(currentEvent);
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

  update(){
    console.log(this.events);
    return;
  }

  createDOMItem(itemConfig){
    var event = document.createElement("li");
    event.classList.add("event-wrapper");
    event.style.backgroundImage = `url('${itemConfig.img}')`;
    event.style.height = `${this.config.t.h}px`;
    event.style.width  = `${this.config.t.w}px`;

    var nameContent = document.createTextNode(itemConfig.name),
      name =  document.createElement("div");
    name.classList.add("event-name");
    name.appendChild(nameContent);

    var dateContent = document.createTextNode(itemConfig.date.day),
      date = document.createElement("div");
    date.classList.add("event-date");
    date.appendChild(dateContent);

    var timeContent = document.createTextNode(itemConfig.date.time),
      time = document.createElement("div");
    time.classList.add("event-date");
    time.appendChild(timeContent);

    event.appendChild(name);
    event.appendChild(date);
    event.appendChild(time);

    return event;
  }



  makeImageUrl(id){
    return `https://app.ticketmaster.com/discovery/v1/events/${id}/images.json`;
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
