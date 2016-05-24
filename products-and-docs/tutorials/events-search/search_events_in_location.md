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

## Using HTML Geolocation

Add geolocation detection to your site. [More details.](http://www.w3schools.com/html/html5_geolocation.asp)

{: .tutorial-code}
>[HTML](#html)
>[JavaScript](#js)
{: .t-lang-selector}

{% highlight html %}
<!DOCTYPE html>
<html>
  <body>
    <p id="location">location there</p>
    <div id="mapholder"></div>
    <script src="script.js"></script>
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

    var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false";

    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
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


getLocation();

{% endhighlight %}

Now you can see your current location.

## Discovery API request

Make request to Discovery API with latitude and longitude. [More details.](http://ticketmaster-api-staging.github.io/products-and-docs/apis/discovery/v2/#srch-events-v2)

{: .tutorial-code}
>[HTML](#html)
>[JavaScript](#js)
{: .t-lang-selector}

{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
  </head>
  <body>
    <p id="location">location there</p>
    <div id="mapholder"></div>
    <p id="events">events there</p>
    
    <script src="script.js"></script>
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

    var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false";

    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";

    $.ajax({
      type:"GET",
      url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG&latlong="+latlon,
      async:true,
      dataType: "json",
      success: function(json) {
                  console.log(json);
                  var e = document.getElementById("events");
                  e.innerHTML = json.page.totalElements + " events found.";
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


getLocation();

{% endhighlight %}

Now you can see in browser log events in your location.

## Process responce

Parse the responce from Discovery API and show events.

{: .tutorial-code}
>[HTML](#html)
>[JavaScript](#js)
{: .t-lang-selector}

{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
  </head>
  <body>
    <p id="location">location there</p>
    <div id="mapholder"></div>
    <div id="events"></div>
    
    <script src="script.js"></script>
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
    
        var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false";
    
        document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
        
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
    

    getLocation();
{% endhighlight %}

So we have list of events on the page.

## Connect Google map

The next step is connection of Google Map. [More details.](https://developers.google.com/maps/documentation/javascript/tutorials/adding-a-google-map)

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
    zoom: 15
  });

}



getLocation();
{% endhighlight %}

{% highlight css %}
#map {
        width: 500px;
        height: 400px;
      }
{% endhighlight %}

We can see interactive map.

## Events on a map

The last step. Let`s add markers on the map. [More details.](https://developers.google.com/maps/documentation/javascript/tutorials/custom-markers)

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

As a result we will get a page with a map and list of events.
![Map with events](/products-and-docs/tutorials/img/search-events-map.png)

You can try this code [there](http://plnkr.co/edit/i1NZC9PopEF2fWzUAAH8?p=info).