---
layout: tutorials-single
categories: 
  - tutorials
  - tutorials-events-search

title: Get started with The Discovery API

img: "/products-and-docs/tutorials/img/tutorial-img.png"

link: "/products-and-docs/tutorials/events-search/search_events_with_discovery_api.html"

announcement: "Basic walkthrough of the Discovery API and how to get value out of it quickly."

tags: 
  - Discovery API

excerpt: Basic walkthrough of the Discovery API and how to get value out of it quickly.
keywords: events, attractions, classifications, venues, search, discovery, api
---

# Get started with the Discovery API

## Introduction

Use the Discovery API to search, look up and find events, attractions, venues, and classifications. The API provides access to content sourced from [various platform, markets and countries](/products-and-docs/apis/discovery/v2/#supported-country-codes).

Documentation about this API can be found [here](/products-and-docs/apis/discovery/v2/).

In this tutorial, we will create a simple event browsing application, which will walk us through all the Discovery API functionality.

### Authentication

To run a successful API call, you will need to pass your API Key as the query parameter `apikey`.

**Example:** https://app.ticketmaster.com/discovery/v2/events.json?{apikey}

### Get an API key

[Register](https://developer-acct.ticketmaster.com/user/login) on the developers portal. After the registration, the default application will be created. The application contains a `Consumer Key` that is used for authentication.

Your `Consumer Key` is your `API Key`.

![Disovery API application](/products-and-docs/tutorials/img/discovery-api-app.png)

### Discovery API data model

The Discovery API has four main entities: **event**, **attraction**, **classification**, and **venue**:

- An event is the **central entity** to which all other entities relate. An event is basically a happening at a particular date and time. 
- An attraction is the artist, team or the performers at the event.
- A classification is an attribute of both events and attractions and has three different levels:
	- **Segment**: This could be music, sports, arts & theater, family, Film, and miscellaneous.
	- Genre: These are the various genres under each segment.
	- Sub-genre: The secondary genre for this event or attraction under this particular segment.
- A venue describes the physical location at which the event is taking place.

To learn more about the Discovery API, [click here](/products-and-docs/apis/discovery/v2/).

![Disovery API data model](/products-and-docs/tutorials/img/discovery-api-data.png)

### The Ticketmaster API Explorer

This open-source application helps you understand API requests and responses instantly. You can [jump in](/api-explorer/) right away!.

![API explorer](/products-and-docs/tutorials/img/discovery-api-explorer.png)


## Example: Event Listings

In this example, we'll show an event list and display the attraction of the event clicked. We use [Bootsrap](http://getbootstrap.com/) for the UI. 

Let's review the code (or you can also play with it on [Plunker](http://plnkr.co/edit/YX3fR7DdKCugKZ4uPmaC?p=preview)).

{: .window-title}
Example: Event Listings

{: .tutorial-code}
>[HTML](#html)
>[JavaScript](#js)
{: .t-lang-selector}


{% highlight html %}
<!DOCTYPE html>
<html>

  <head>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="<!-- path-to-your bootstrap.min.css -->" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <!-- Optional theme -->
    <link rel="stylesheet" href="<!-- path-to-your bootstrap-theme.min.css -->" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

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
  $("#events-panel").show();
  $("#attraction-panel").hide();

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
  var items = $("#events .list-group-item");
  items.hide();
  var events = json._embedded.events;
  var item = items.first();
  for (var i=0;i<events.length;i++) {
    item.children('.list-group-item-heading').text(events[i].name);
    item.children('.list-group-item-text').text(events[i].dates.start.localDate);
    try {
      item.children(".venue").text(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name);
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

$("#prev").click(function() {
  getEvents(--page);
});

$("#next").click(function() {
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
  $("#events-panel").hide();
  $("#attraction-panel").show();
  
  $("#attraction-panel").click(function() {
    getEvents(page);
  });
  
  $("#attraction .list-group-item-heading").first().text(json.name);
  $("#attraction img").first().attr('src',json.images[0].url);
  $("#classification").text(json.classifications[0].segment.name + " - " + json.classifications[0].genre.name + " - " + json.classifications[0].subGenre.name);
}

getEvents(page);
{% endhighlight %}

<p></p>

This code will produce such layout.

![Events with venues](/products-and-docs/tutorials/img/discovery-api-events3.png)

![Attraction picture](/products-and-docs/tutorials/img/discovery-api-events2.png)

Great! Now let’s dive into the details:

{: .w-title}
### Requesting events

We call the [Search Events](/products-and-docs/apis/discovery/v2/#srch-events-v2) method to get a list of events. We do it in the JS function `getEvents`. This function has one parameter - a number of requested page. Code execution in our example starts from the call of `getEvents` function with page equal 0. We have global variable `page` with initial value 0. When we use pagination, this variable changes.

{: .window-title}
Requesting events

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

This function has three parts. In the first part, we show a panel with event list and hide a panel with attraction details. Then we work with the page number. `page` cannot be less that 0. After the last page, we go to the first page again. In the third part, we call Search Events method and call function `showEvents` in a case of success.

{: .w-title}
### Layout for event list

{: .window-title}
Layout for event list

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

{: .w-title}
### Rendering the event list

When we get events from the server we call function `showEvents`. It builds list item for each event. List item has click handler that calls function `getAttraction`. So after clicking on list item we call Search Attractions method with if of the first attraction for a current event.

{: .window-title}
Rendering the event list

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

<p></p>

### Attraction details

We have `attraction-panel` to show attraction details. We show attraction name, the first picture, and classification.
When we get attractions from the server we call function `showAttraction`. It fills panel with attraction values.

{: .window-title}
Attraction details

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


You can try this entire tutorial code [there](http://plnkr.co/edit/YX3fR7DdKCugKZ4uPmaC?p=preview).
