---
layout: tutorials-single
categories: 
  - tutorials
  - tutorials-events-search

title: Adding a Google Map to your website

img: "/products-and-docs/tutorials/img/tutorial-img.png"

link: "/products-and-docs/tutorials/events-search/01_Adding_a_Google_Map_to_your_website.html"

announcement: "Retro occupy organic, stumptown shabby chic pour-over roof party DIY normcore. Actually artisan organic occupy, Wes Anderson ugh whatever pour-over gastropub selvage."

tags: 
  - Discovery API
  - Commerce API

excerpt: Visit Universe’s site to get everything you need to sell tickets directly on your website at no additional cost.
keywords: widget, sell tickets, direct payments
---

# ADDING A GOOGLE MAP TO YOUR WEBSITE

## Introduction

Adding a Google Map to your web page is very easy, once you've been shown how! That's what we're going to do in this lesson — we'll go over each step of creating a basic Google Map using the JavaScript API.

From there, it's only a matter of tweaking some of the options to customize the map to your liking; you can go even further by reading more of the [Maps API tutorials](/products-and-docs/apis/getting-started/), 
or by reading the [Developer's Guide](/products-and-docs/apis/getting-started/).

## What you'll need

You don't need much to create a Google Maps API webpage:

### A text editor

Windows machines generally include Notepad; Mac OS X comes with TextEdit; Linux machines come with a variety of applications, including gedit, vim, or KWrite.

### A web browser

There are many well-known web browsers available for various platforms: Google Chrome, Firefox, Safari, and Internet Explorer are some of the best-known options.

Try it out:

[![Google Maps](/products-and-docs/tutorials/img/map-img.png)](/partners/distribution-partners/)


## The basic HTML page

Because everything on the web is made up of HTML, we'll start there. The following code creates the simplest of web pages:

{: .tutorial-code}
>[HTML](#html)
>[JavaScript](#js)
>[CSS](#css)
{: .t-lang-selector}

{% highlight html %}
<html>
  <head>This is Example One</head>
  <body>
  </body>
</html>
{% endhighlight %}

{% highlight js %}
function initMapOne() {
    var mapDiv = document.getElementById('map_one');
    var map_one = new google.maps.Map(mapDiv);
}
{% endhighlight %}

{% highlight css %}
#map_one {
    width: 500px;
    height: 400px;
    background-color: #CCC;
}
{% endhighlight %}

None of this is specific to Google Maps - it's the basis for any HTML page. Open your text editor and add this code, then save the file to your desktop as google-maps.html (or any other filename that ends with .html).

{: .tutorial-code}
>[HTML](#html)
>[JavaScript](#js)
>[CSS](#css)
{: .t-lang-selector}

{% highlight html %}
<html>
  <head>This is Example Two</head>
  <body>
  </body>
</html>
{% endhighlight %}

{% highlight js %}
function initMap() {
    var mapDiv = document.getElementById('map_two');
    var map_two = new google.maps.Map(mapDiv);
}

{% endhighlight %}

{% highlight css %}
#map_two {
    width: 500px;
    height: 400px;
    background-color: #CCC;
}
{% endhighlight %}

The first thing the initMap function needs to do is create a new Google Maps object:

## The google.maps.Map object

The first thing the initMap function needs to do is create a new Google Maps object:

{% highlight js %}

1. let minValue = UInt8.min // minValue is equal to 0, and is of type UInt8 

2. let maxValue = UInt8.max // maxValue is equal to 255, and is of type UInt8

{% endhighlight %}

## The finished code

This is the final code you've put together in this lesson. It:

* Creates a div, and gives it a size. 
* Loads the Google Maps JavaScript API. 
* Creates and displays a Google Map in the div.

{: .small}
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 3.0 License, and code samples are licensed under the Apache 2.0 License. For details, see our Site Policies. 
<br>Last updated May 6, 2016.
