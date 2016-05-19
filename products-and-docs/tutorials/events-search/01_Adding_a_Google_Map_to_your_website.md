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

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight http %}
GET /discovery/v2/events.json?{apikey}&size=1 HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
{% endhighlight %}

{% highlight http %}
HTTP/1.1 200 OK
Rate-Limit-Over: 0
Content-Length: 5360
Rate-Limit-Available: 4723
Set-Cookie: CMPS=0ytJbt229sTM7UXhHxC5IEvVNguFRwkBBUZ76aK9bmvRvAWZwe/RjM5TSH0yOXNFGd+urQFTC6o=; path=/
Access-Control-Max-Age: 3628800
Access-Control-Allow-Methods: GET, PUT, POST, DELETE
Connection: keep-alive
Server: Apache-Coyote/1.1
Rate-Limit-Reset: 1457417554290
Access-Control-Allow-Headers: origin, x-requested-with, accept
Date: Mon, 07 Mar 2016 10:09:51 GMT
Access-Control-Allow-Origin: *
X-Application-Context: application:local,default,jphx1:8080
Content-Type: application/json;charset=utf-8
X-Unknown-Params: apikey
X-Unknown-Params: api-key
Rate-Limit: 5000

{
  "_links":  {
    "self":  {
      "href": "/discovery/v2/events.json?size=1{&page,sort}",
      "templated": true
    },
    "next":  {
      "href": "/discovery/v2/events.json?page=1&size=1{&sort}",
      "templated": true
    }
  },
  "_embedded":  {
    "events":  [
       {
        "name": "WGC Cadillac Championship - Sunday Ticket",
        "type": "event",
        "id": "vvG1VZKS5pr1qy",
        "test": false,
        "url": "http://ticketmaster.com/event/0E0050681F51BA4C",
        "locale": "en-us",
        "images":  [
           {
            "ratio": "16_9",
            "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_RETINA_LANDSCAPE_16_9.jpg",
            "width": 1136,
            "height": 639,
            "fallback": false
          },
           {
            "ratio": "3_2",
            "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_RETINA_PORTRAIT_3_2.jpg",
            "width": 640,
            "height": 427,
            "fallback": false
          },
           {
            "ratio": "16_9",
            "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_TABLET_LANDSCAPE_LARGE_16_9.jpg",
            "width": 2048,
            "height": 1152,
            "fallback": false
          },
           {
            "ratio": "16_9",
            "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_TABLET_LANDSCAPE_16_9.jpg",
            "width": 1024,
            "height": 576,
            "fallback": false
          },
           {
            "ratio": "16_9",
            "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_EVENT_DETAIL_PAGE_16_9.jpg",
            "width": 205,
            "height": 115,
            "fallback": false
          },
           {
            "ratio": "3_2",
            "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_ARTIST_PAGE_3_2.jpg",
            "width": 305,
            "height": 203,
            "fallback": false
          },
           {
            "ratio": "16_9",
            "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_RETINA_PORTRAIT_16_9.jpg",
            "width": 640,
            "height": 360,
            "fallback": false
          },
           {
            "ratio": "4_3",
            "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_CUSTOM.jpg",
            "width": 305,
            "height": 225,
            "fallback": false
          },
           {
            "ratio": "16_9",
            "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_RECOMENDATION_16_9.jpg",
            "width": 100,
            "height": 56,
            "fallback": false
          },
           {
            "ratio": "3_2",
            "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_TABLET_LANDSCAPE_3_2.jpg",
            "width": 1024,
            "height": 683,
            "fallback": false
          }
        ],
        "sales":  {
          "public":  {
            "startDateTime": "2015-10-02T11:00:00Z",
            "startTBD": false,
            "endDateTime": "2016-03-06T23:00:00Z"
          }
        },
        "dates":  {
          "start":  {
            "localDate": "2016-03-06",
            "dateTBD": false,
            "dateTBA": false,
            "timeTBA": true,
            "noSpecificTime": false
          },
          "timezone": "America/New_York",
          "status":  {
            "code": "offsale"
          }
        },
        "classifications":  [
           {
            "primary": true,
            "segment":  {
              "id": "KZFzniwnSyZfZ7v7nE",
              "name": "Sports"
            },
            "genre":  {
              "id": "KnvZfZ7vAdt",
              "name": "Golf"
            },
            "subGenre":  {
              "id": "KZazBEonSMnZfZ7vFI7",
              "name": "PGA Tour"
            }
          }
        ],
        "promoter":  {
          "id": "682"
        },
        "_links":  {
          "self":  {
            "href": "/discovery/v2/events/vvG1VZKS5pr1qy?locale=en-us"
          },
          "attractions":  [
             {
              "href": "/discovery/v2/attractions/K8vZ917uc57?locale=en-us"
            }
          ],
          "venues":  [
             {
              "href": "/discovery/v2/venues/KovZpZAaEldA?locale=en-us"
            }
          ]
        },
        "_embedded":  {
          "venues":  [
             {
              "name": "Trump National Doral",
              "type": "venue",
              "id": "KovZpZAaEldA",
              "test": false,
              "locale": "en-us",
              "postalCode": "33178",
              "timezone": "America/New_York",
              "city":  {
                "name": "Miami"
              },
              "state":  {
                "name": "Florida",
                "stateCode": "FL"
              },
              "country":  {
                "name": "United States Of America",
                "countryCode": "US"
              },
              "address":  {
                "line1": "4400 NW 87th Avenue"
              },
              "location":  {
                "longitude": "-80.33854298",
                "latitude": "25.81260379"
              },
              "markets":  [
                 {
                  "id": "15"
                }
              ],
              "_links":  {
                "self":  {
                  "href": "/discovery/v2/venues/KovZpZAaEldA?locale=en-us"
                }
              }
            }
          ],
          "attractions":  [
             {
              "name": "Cadillac Championship",
              "type": "attraction",
              "id": "K8vZ917uc57",
              "test": false,
              "locale": "en-us",
              "images":  [
                 {
                  "ratio": "16_9",
                  "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_RETINA_LANDSCAPE_16_9.jpg",
                  "width": 1136,
                  "height": 639,
                  "fallback": false
                },
                 {
                  "ratio": "3_2",
                  "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_RETINA_PORTRAIT_3_2.jpg",
                  "width": 640,
                  "height": 427,
                  "fallback": false
                },
                 {
                  "ratio": "16_9",
                  "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                  "width": 2048,
                  "height": 1152,
                  "fallback": false
                },
                 {
                  "ratio": "16_9",
                  "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_TABLET_LANDSCAPE_16_9.jpg",
                  "width": 1024,
                  "height": 576,
                  "fallback": false
                },
                 {
                  "ratio": "16_9",
                  "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_EVENT_DETAIL_PAGE_16_9.jpg",
                  "width": 205,
                  "height": 115,
                  "fallback": false
                },
                 {
                  "ratio": "3_2",
                  "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_ARTIST_PAGE_3_2.jpg",
                  "width": 305,
                  "height": 203,
                  "fallback": false
                },
                 {
                  "ratio": "16_9",
                  "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_RETINA_PORTRAIT_16_9.jpg",
                  "width": 640,
                  "height": 360,
                  "fallback": false
                },
                 {
                  "ratio": "4_3",
                  "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_CUSTOM.jpg",
                  "width": 305,
                  "height": 225,
                  "fallback": false
                },
                 {
                  "ratio": "16_9",
                  "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_RECOMENDATION_16_9.jpg",
                  "width": 100,
                  "height": 56,
                  "fallback": false
                },
                 {
                  "ratio": "3_2",
                  "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_TABLET_LANDSCAPE_3_2.jpg",
                  "width": 1024,
                  "height": 683,
                  "fallback": false
                }
              ],
              "classifications":  [
                 {
                  "primary": true,
                  "segment":  {
                    "id": "KZFzniwnSyZfZ7v7nE",
                    "name": "Sports"
                  },
                  "genre":  {
                    "id": "KnvZfZ7vAdt",
                    "name": "Golf"
                  },
                  "subGenre":  {
                    "id": "KZazBEonSMnZfZ7vFI7",
                    "name": "PGA Tour"
                  }
                }
              ],
              "_links":  {
                "self":  {
                  "href": "/discovery/v2/attractions/K8vZ917uc57?locale=en-us"
                }
              }
            }
          ]
        }
      }
    ]
  },
  "page":  {
    "size": 1,
    "totalElements": 87958,
    "totalPages": 87958,
    "number": 0
  }
}
{% endhighlight %}

None of this is specific to Google Maps - it's the basis for any HTML page. Open your text editor and add this code, then save the file to your desktop as google-maps.html (or any other filename that ends with .html).

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
