---
layout: tutorials-single
categories: 
  - tutorials
  - tutorials-events-search

title: Search events in some location

img: "/products-and-docs/tutorials/img/img-1.png"

link: "/products-and-docs/tutorials/events-search/search_events_in_location.html"

announcement: "Search events in some location specified by latitude and longitude using Discovery API."

tags: 
  - Discovery API

excerpt: Search events in some location. Discovery API provides Event search call. You can search events in some location specified by latitude and longitude.
keywords: events, search, location, map, discovery, api
---

# Search events in some location

## Introduction

Search events in some location. Discovery API provides Event search call. You can search events in some location specified by latitude and longitude.

## Authentication

To run a successful API call, you will need to pass your API Key as the query parameter `apikey`.
Example: https://app.ticketmaster.com/discovery/v2/events.json?{apikey}

## Get an API key

[Register](https://live-livenation.devportal.apigee.com/user/login) on the developers portal. After the registration, the default application will be created. The application contains a Consumer Key that is used for authentication.

![Disovery API application](/products-and-docs/tutorials/img/discovery-api-app.png)

## Events on a map

In this tutorial, we develop a simple page with Google map with markers for events.

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

As a result, we will get a page with a map and list of events.

![Map with events](/products-and-docs/tutorials/img/search-events-map.png)

Let’s consider in detail this code.


## Using Google map

Our application has a simple layout. There are two `div` elemnts. One div with `id="map"` for Google map.
The second div with `id="events"` for a list of events.
For work with Google maps we should add map scrip in the end of body `<script src="https://maps.googleapis.com/maps/api/js" async defer></script>`.

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


## Using HTML Geolocation

Geolocation is a standard feature of HTML5. All modern browsers support it. [More details.](http://www.w3schools.com/html/html5_geolocation.asp)

When you try to use geolocation in JavaScript, a browser will ask a user for permission.

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

There are two functions for work with geolocation `getLocation` and `showError`.
`getLocation` tries to get location `navigator.geolocation.getCurrentPosition(showPosition, showError);`.
In a case of error it calls `showError`. `showError` checks error code and shows a friendly message.

So, now you can see your current location.

## Discovery API request

In a case of successful request for current location the function `showPosition` is called.
It shows Google map and makes a request to Discovery API with latitude and longitude. [More details.](http://ticketmaster-api-staging.github.io/products-and-docs/apis/discovery/v2/#srch-events-v2)

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




## Process a response

In a case of a succesful request to Discovery API we call function `showEvents` that processes a response and shows events as a list.
Other function `initMap` initializes Google map and shows markers for events.


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


During a map initialization, we add markers in the function `addMarker`. [More details about markers.](https://developers.google.com/maps/documentation/javascript/tutorials/custom-markers)

You can try this code [there](http://plnkr.co/edit/i1NZC9PopEF2fWzUAAH8?p=info).
