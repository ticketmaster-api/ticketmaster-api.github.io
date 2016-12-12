---
layout: tutorials-single
categories: 
  - tutorials
  - tutorials-events-search

title: Tutorial - Locate events on a map

img: "/products-and-docs/tutorials/img/img-1.png"

link: "/products-and-docs/tutorials/events-search/search_events_in_location.html"

announcement: "Using both the Discovery API and Google Maps API to show events taking place at the particular longitude/latitude value pair provided by the Google Maps API."

tags: 
  - Discovery API

excerpt: This tutorial goes through the steps needed to create a Google Map populated with events taking place in a specific area on the map.
keywords: events, search, location, map, discovery, api
---

# Locate events on a map

## Introduction

This tutorial goes through the steps needed to create a Google Map populated with events taking place in a specific area on the map. Given the lat/lon value pair provided by the Google Maps API, a search call is triggered in the Discovery API with that value in a radius of 25 miles, which is the default value if none is set.

## Authentication

To run a successful API call, you will need to pass your API Key as the query parameter `apikey`.

**Example:** https://app.ticketmaster.com/discovery/v2/events.json?{apikey}

## Get an API key

[Register](https://developer-acct.ticketmaster.com/user/login) on the developers portal. After the registration, the default application will be created. The application contains a `Consumer Key` that is used for authentication.

Your `Consumer Key` is your `API Key`.

![Disovery API application](/products-and-docs/tutorials/img/discovery-api-app.png)

## Events on a map

Here's a simple page with a Google map and markers for events:

{: .window-title}
Events on a map

{: .tutorial-code}
>[HTML](#html)
>[JavaScript](#js)
>[CSS](#css)
{: .t-lang-selector}

{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
  </head>
  <body>
    <p id="location">location there</p>
    <div id="map"></div>
    <div id="events"></div>
    <script src="script.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js" async defer></script>

  </body>
</html>
{% endhighlight %}

{% highlight js %}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        var x = document.getElementById("location");
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    var x = document.getElementById("location");
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
    var latlon = position.coords.latitude + "," + position.coords.longitude;


    $.ajax({
      type:"GET",
      url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG&latlong="+latlon,
      async:true,
      dataType: "json",
      success: function(json) {
                  console.log(json);
                  var e = document.getElementById("events");
                  e.innerHTML = json.page.totalElements + " events found.";
                  showEvents(json);
                  initMap(position, json);
               },
      error: function(xhr, status, err) {
                  console.log(err);
               }
    });

}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}


function showEvents(json) {
  for(var i=0; i<json.page.size; i++) {
    $("#events").append("<p>"+json._embedded.events[i].name+"</p>");
  }
}


function initMap(position, json) {
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    center: {lat: position.coords.latitude, lng: position.coords.longitude},
    zoom: 10
  });
  for(var i=0; i<json.page.size; i++) {
    addMarker(map, json._embedded.events[i]);
  }
}

function addMarker(map, event) {
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
    map: map
  });
  marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
  console.log(marker);
}




getLocation();
{% endhighlight %}

{% highlight css %}
#map {
        width: 500px;
        height: 400px;
      }
{% endhighlight %}

When rendered, the page will show the map below:

![Map with events](/products-and-docs/tutorials/img/search-events-map.png)

Great! Now let’s dive into the details.


## Using the Google Map API

The page has a simple layout. We start by including CSS and jQuery in the `head` tag. You will see that in all out tutorials.

Inside the `body` element, there are two `div` elements. One with `id="map"` for the rendering of the Google map. The second with `id="events"` to render the list of events marked on the map.

Below the divs, we include our own script, which we will discuss later, and the Google Maps API `<script src="https://maps.googleapis.com/maps/api/js" async defer></script>`.

{: .window-title}
Using The Google Map API

{: .tutorial-code}
>[HTML](#html)
{: .t-lang-selector}

{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
  </head>
  <body>
    <p id="location">location there</p>
    <div id="map"></div>
    <div id="events"></div>
    <script src="script.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js" async defer></script>

  </body>
</html>
{% endhighlight %}

<p></p>

## Getting the browser's geolocation

Geolocation is a standard feature in HTML5. [All modern browsers support it](http://www.w3schools.com/html/html5_geolocation.asp).

When you try to use geolocation in JavaScript, a browser will ask a user for permission:

{: .window-title}
Getting The Browser’s Geolocation

{: .tutorial-code}
>[JavaScript](#js)
{: .t-lang-selector}

{% highlight js %}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        var x = document.getElementById("location");
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}


function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

{% endhighlight %}

There are two functions defined above: `getLocation` and `showError`.

`getLocation` tries to get the location `navigator.geolocation.getCurrentPosition(showPosition, showError);` and in a case of an error, it calls `showError`, which in turn checks the error code and displays the appropriate message back to the user.

Assuming no errors are encountered, now we have your current location in a lat/lon value pair.


## Passing location to the Discovery API

Now we make an API call to [search for events within 25 miles from the latitude and longitude values](/products-and-docs/apis/discovery/v2/#srch-events-v2) we received in the step above. We call the function `ShowPosition` to render that.

{: .window-title}
Passing Location To The Discovery API

{: .tutorial-code}
>[JavaScript](#js)
{: .t-lang-selector}

{% highlight js %}

function showPosition(position) {
    var x = document.getElementById("location");
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
    var latlon = position.coords.latitude + "," + position.coords.longitude;


    $.ajax({
      type:"GET",
      url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG&latlong="+latlon,
      async:true,
      dataType: "json",
      success: function(json) {
                  console.log(json);
                  var e = document.getElementById("events");
                  e.innerHTML = json.page.totalElements + " events found.";
                  showEvents(json);
                  initMap(position, json);
               },
      error: function(xhr, status, err) {
                  console.log(err);
               }
    });

}



{% endhighlight %}

<p></p>

## Process the API response

In a case of a successful request to Discovery API, we call function `showEvents` that processes the response and displays the event list.
Other function `initMap` initializes Google map and shows markers for events.

{: .window-title}
Process The API Response

{: .tutorial-code}
>[JavaScript](#js)
{: .t-lang-selector}



{% highlight js %}
function showEvents(json) {
  for(var i=0; i<json.page.size; i++) {
    $("#events").append("<p>"+json._embedded.events[i].name+"</p>");
  }
}


function initMap(position, json) {
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    center: {lat: position.coords.latitude, lng: position.coords.longitude},
    zoom: 10
  });
  for(var i=0; i<json.page.size; i++) {
    addMarker(map, json._embedded.events[i]);
  }
}

function addMarker(map, event) {
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
    map: map
  });
  marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
  console.log(marker);
}
{% endhighlight %}


During the map initialization, we use the `addMarker` function to add event markers to the map. [More details about markers.](https://developers.google.com/maps/documentation/javascript/tutorials/custom-markers)

You can try this entire tutorial code [here](http://plnkr.co/edit/i1NZC9PopEF2fWzUAAH8?p=info).
