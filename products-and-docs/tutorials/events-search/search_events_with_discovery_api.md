---
layout: tutorials-single
categories: 
  - tutorials
  - tutorials-events-search

title: Search events with Discovery API

img: "/products-and-docs/tutorials/img/tutorial-img.png"

link: "/products-and-docs/tutorials/events-search/search_events_with_discovery_api.html"

announcement: "Tutorial for beginners about the Discovery API. Describes different cases of the Discovery APi using."

tags: 
  - Discovery API

excerpt: Tutorial for beginners about the Discovery API. Describes different cases of the Discovery APi using.
keywords: events, attractions, classifications, venues, search, discovery, api
---

# Search events with Discovery API

## Introduction

Use the Discovery API to search, look up and find events, attractions, venues, and classifications. The API provides access to all Ticketmaster events, as well as Universe and TicketWeb events.
Documentation about this API can be found [here](http://developer.ticketmaster.com/products-and-docs/apis/discovery/v2/).

In this tutorial, we will make simple events browser application. It will lead us through all Discovery API.

### Authentication

To run a successful API call, you will need to pass your API Key as the query parameter `apikey`.
Example: https://app.ticketmaster.com/discovery/v2/events.json?{apikey}

### Get an API key

[Register](https://live-livenation.devportal.apigee.com/user/login) on the developers portal. After the registration, the default application will be created. The application contains a Consumer Key that is used for authentication.

![Disovery API application](/products-and-docs/tutorials/img/discovery-api-app.png)

### Discovery API data model

Discovery API has four main entities: event, attraction, classification, venue.

An event is a main entity. It describes some event that is being selling. An event is related to venues, attractions, and classifications.

Attraction describes some show that is demonstrated during an event. Attraction can be organized by several artists. An artist can have different attractions for different events. An attraction has classifications.

A classification shows categories and sub-categories related to some attraction or event.

A venue describes a place for an event.

![Disovery API data model](/products-and-docs/tutorials/img/discovery-api-data.png)

### Ticketmaster API Explorer application

This is a very cool open-source application that helps to understand API requests and responses instantly, thanks to the EPAM’s team and such a bright idea introduced for Ticketmaster’s API. Get access to the [API Explorer](/api-explorer/).

![API explorer](/products-and-docs/tutorials/img/discovery-api-explorer.png)

### Events

The are three API methods related to events:

- Search Events
- Get Event Details
- Search Event Images

Search Events method returns a list of events according to provided criteria. You can search events by keyword, location, attraction, venue.

The method returns a part of the search result as a list of event objects (20 by default) and a page object. A page object contains information about total events count, pages count and current page number. 

Get Event Details method returns full information for some event specified by id. It is supposed that event object from the Search Events method contains not full information about some event. An event object contains classification object (merged from all attractions) for this event, images (merged from all attractions), attractions, venues, dates, and sales.

Despite that an event object contains attractions, images, classifications, and venues, we have separate methods Search Event Images, Get Attraction Details, Get Classification Details and Get Venue Details. It is supposed that these separate methods will return more detailed information about related items.

### Attractions

There are two API methods related to attractions:

- Search Attractions
- Get Attraction Details

Search Attractions method returns a list of attractions according to provided criteria. The method returns a part of the search result as a list of attraction objects (20 by default) and a page object.

Get Attraction Details method returns full information for some attraction specified by id. Attraction object contains classifications and images related only to this attraction.

### Classifications

There are two API methods related to classifications:

- Search Classifications
- Get Classification Details

Search Classifications method returns a list of classifications according to provided criteria. The method returns a part of the search result as a list of classification objects (20 by default) and a page object.

Get Classification Details method returns full information for some classification specified by id. A classification object represents some categories related to an event. A classification consists of segments. A segment consists of genres. Every genre consists of subgenres.

### Venues

There are two API methods related to venues:

- Search Venues
- Get Venue Details

Search Venues method returns a list of venues according to provided criteria. The method returns a part of the search result as a list of venue objects (20 by default) and a page object.

Get Venue Details method returns full information for some venue specified by id.

## Events explorer example

Events explorer is application shows all events as a list and the first attraction of selected event. We use [Bootsrap](http://getbootstrap.com/). It allows getting cool UX layout very quickly. Our layout consists of a list of event items with pagination in a footer. Also, we have a separate section for an attraction. Let's review the code of this example (you can also play with this code on [Plunker](http://plnkr.co/edit/YX3fR7DdKCugKZ4uPmaC?p=preview)).

{: .tutorial-code}
>[HTML](#html)
>[JavaScript](#js)
{: .t-lang-selector}


{% highlight js %}
<!DOCTYPE html>
<html>

  <head>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">


    <style>
      #attraction-panel {
        display:none;
      }
    </style>

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  </head>

  <body>
    <div class="container">
      <div class="row">
        <div class="col-xs-6">
        <div id='events-panel' class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Events</h3>
          </div>
          <div class="panel-body">
            <div id="events" class="list-group">
              <a href="#" class="list-group-item">
                <h4 class="list-group-item-heading">Event title</h4>
                <p class="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p class="venue"></p>
              </a>
              <a href="#" class="list-group-item">
                <h4 class="list-group-item-heading">Event title</h4>
                <p class="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p class="venue"></p>
              </a>
              <a href="#" class="list-group-item">
                <h4 class="list-group-item-heading">Event title</h4>
                <p class="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p class="venue"></p>
              </a>
              <a href="#" class="list-group-item">
                <h4 class="list-group-item-heading">Event title</h4>
                <p class="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p class="venue"></p>
              </a>
            </div>
          </div>
          <div class="panel-footer">
            <nav>
              <ul class="pager">
                <li id="prev" class="previous"><a href="#"><span aria-hidden="true">&larr;</span></a></li>
                <li id="next" class="next"><a href="#"><span aria-hidden="true">&rarr;</span></a></li>
              </ul>
            </nav>
          </div>
        </div>
        
        <div id='attraction-panel' class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Attraction</h3>
          </div>
          <div id="attraction" class="panel-body">
            <h4 class="list-group-item-heading">Attraction title</h4>
            <img class="col-xs-12" src="">
            <p id="classification"></p>
          </div>
        </div>
        </div>
      </div>
    </div>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    <script src="script.js"></script>
  </body>

</html>
{% endhighlight %}

{% highlight js %}


var page = 0;

function getEvents(page) {

  $('#events-panel').show();
  $('#attraction-panel').hide();

  if (page < 0) {
    page = 0;
    return;
  }
  if (page > 0) {
    if (page > getEvents.json.page.totalPages-1) {
      page=0;
    }
  }
  
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG&size=4&page="+page,
    async:true,
    dataType: "json",
    success: function(json) {
          getEvents.json = json;
  			  showEvents(json);
  		   },
    error: function(xhr, status, err) {
  			  console.log(err);
  		   }
  });
}

function showEvents(json) {
  var items = $('#events .list-group-item');
  items.hide();
  var events = json._embedded.events;
  var item = items.first();
  for (var i=0;i<events.length;i++) {
    item.children('.list-group-item-heading').text(events[i].name);
    item.children('.list-group-item-text').text(events[i].dates.start.localDate);
    try {
      item.children('.venue').text(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name);
    } catch (err) {
      console.log(err);
    }
    item.show();
    item.off("click");
    item.click(events[i], function(eventObject) {
      console.log(eventObject.data);
      try {
        getAttraction(eventObject.data._embedded.attractions[0].id);
      } catch (err) {
      console.log(err);
      }
    });
    item=item.next();
  }
}

$('#prev').click(function() {
  getEvents(--page);
});

$('#next').click(function() {
  getEvents(++page);
});

function getAttraction(id) {
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/attractions/"+id+".json?apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG",
    async:true,
    dataType: "json",
    success: function(json) {
          showAttraction(json);
  		   },
    error: function(xhr, status, err) {
  			  console.log(err);
  		   }
  });
}

function showAttraction(json) {
  $('#events-panel').hide();
  $('#attraction-panel').show();
  
  $('#attraction-panel').click(function() {
    getEvents(page);
  });
  
  $('#attraction .list-group-item-heading').first().text(json.name);
  $('#attraction img').first().attr('src',json.images[0].url);
  $('#classification').text(json.classifications[0].segment.name + " - " + json.classifications[0].genre.name + " - " + json.classifications[0].subGenre.name);
}

getEvents(page);
{% endhighlight %}

This code will produce such layout.

![Events with venues](/products-and-docs/tutorials/img/discovery-api-events3.png)

![Attraction picture](/products-and-docs/tutorials/img/discovery-api-events2.png)

Let's consider in detail this code.

### Request for events

We should call Search Events method to get an event list. We do it in the function `getEvents`. This function has one parameter - a number of requested page. Code execution in our example starts from the call of `getEvents` function with page equal 0. We have global variable `page` with initial value 0. When we use pagination this variable is changing.

{: .tutorial-code}
>[JavaScript](#js)
{: .t-lang-selector}


{% highlight js %}
function getEvents(page) {

  $('#events-panel').show();
  $('#attraction-panel').hide();

  if (page < 0) {
    page = 0;
    return;
  }
  if (page > 0) {
    if (page > getEvents.json.page.totalPages-1) {
      page=0;
    }
  }
  
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG&size=4&page="+page,
    async:true,
    dataType: "json",
    success: function(json) {
          getEvents.json = json;
  			  showEvents(json);
  		   },
    error: function(xhr, status, err) {
  			  console.log(err);
  		   }
  });
}
{% endhighlight %}

This function has three parts. In the first part, we show a panel with event list and hide a panel with attraction details. Then we work with a page number. `page` cannot be less that 0. After the last page, we go to the first page again. In the third part, we call Search Events method and call function `showEvents` in a case of success.

### Layout for events list

In HTML we have a simple Bootstrap layout. In head section, Bootstrap is connected. Body contains Bootstrap container with two panels: `events-panel` - show list of events, `attraction-panel` - show information about attraction (invisible by default).

{: .tutorial-code}
>[HTML](#html)
{: .t-lang-selector}


{% highlight html %}
<div id='events-panel' class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Events</h3>
          </div>
          <div class="panel-body">
            <div id="events" class="list-group">
              <a href="#" class="list-group-item">
                <h4 class="list-group-item-heading">Event title</h4>
                <p class="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p class="venue"></p>
              </a>
              <a href="#" class="list-group-item">
                <h4 class="list-group-item-heading">Event title</h4>
                <p class="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p class="venue"></p>
              </a>
              <a href="#" class="list-group-item">
                <h4 class="list-group-item-heading">Event title</h4>
                <p class="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p class="venue"></p>
              </a>
              <a href="#" class="list-group-item">
                <h4 class="list-group-item-heading">Event title</h4>
                <p class="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p class="venue"></p>
              </a>
            </div>
          </div>
          <div class="panel-footer">
            <nav>
              <ul class="pager">
                <li id="prev" class="previous"><a href="#"><span aria-hidden="true">&larr;</span></a></li>
                <li id="next" class="next"><a href="#"><span aria-hidden="true">&rarr;</span></a></li>
              </ul>
            </nav>
          </div>
        </div>
{% endhighlight %}

The panel has title section, body with a list of items and footer with pagination buttons.

### Event list building

When we get events from the server we call function `showEvents`. It builds list item for each event. List item has click handler that calls function `getAttraction`. So after clicking on list item we call Search Attractions method with if of the first attraction for a current event.

{: .tutorial-code}
>[JavaScript](#js)
{: .t-lang-selector}


{% highlight js %}
function showEvents(json) {
  var items = $('#events .list-group-item');
  items.hide();
  var events = json._embedded.events;
  var item = items.first();
  for (var i=0;i<events.length;i++) {
    item.children('.list-group-item-heading').text(events[i].name);
    item.children('.list-group-item-text').text(events[i].dates.start.localDate);
    try {
      item.children('.venue').text(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name);
    } catch (err) {
      console.log(err);
    }
    item.show();
    item.off("click");
    item.click(events[i], function(eventObject) {
      console.log(eventObject.data);
      try {
        getAttraction(eventObject.data._embedded.attractions[0].id);
      } catch (err) {
      console.log(err);
      }
    });
    item=item.next();
  }
}
{% endhighlight %}


### Attraction details

We have `attraction-panel` to show attraction details. We show attraction name, the first picture, and classification.
When we get attractions from the server we call function `showAttraction`. It fills panel with attraction values.

{: .tutorial-code}
>[HTML](#html)
>[JavaScript](#js)
{: .t-lang-selector}

{% highlight html %}
<div id='attraction-panel' class="panel panel-primary">
  <div class="panel-heading">
    <h3 class="panel-title">Attraction</h3>
  </div>
  <div id="attraction" class="panel-body">
    <h4 class="list-group-item-heading">Attraction title</h4>
    <img class="col-xs-12" src="">
    <p id="classification"></p>
  </div>
</div>
{% endhighlight %}

{% highlight js %}
function getAttraction(id) {
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/attractions/"+id+".json?apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG",
    async:true,
    dataType: "json",
    success: function(json) {
          showAttraction(json);
  		   },
    error: function(xhr, status, err) {
  			  console.log(err);
  		   }
  });
}

function showAttraction(json) {
  $('#events-panel').hide();
  $('#attraction-panel').show();
  
  $('#attraction-panel').click(function() {
    getEvents(page);
  });
  
  $('#attraction .list-group-item-heading').first().text(json.name);
  $('#attraction img').first().attr('src',json.images[0].url);
  $('#classification').text(json.classifications[0].segment.name + " - " + json.classifications[0].genre.name + " - " + json.classifications[0].subGenre.name);
}
{% endhighlight %}


You can explore the source code of this example [there](http://plnkr.co/edit/YX3fR7DdKCugKZ4uPmaC?p=preview).