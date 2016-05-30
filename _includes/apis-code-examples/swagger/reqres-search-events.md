{% highlight http %}
GET /discovery/v2/events/k7vGFKzleBdwS.json?{apikey} HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
{% endhighlight %}

{% highlight http %}
HTTP/1.1 200 OK
Rate-Limit-Over: 0
Content-Length: 5555
Rate-Limit-Available: 4722
Set-Cookie: CMPS=cE7N5yujrQNGYWvJF3bAH6iRNHwAv0FDp5i1VDetaW6+WW5OZTOBve6ZQCpN9qCv; path=/
Access-Control-Max-Age: 3628800
Access-Control-Allow-Methods: GET, PUT, POST, DELETE
Connection: keep-alive
Server: Apache-Coyote/1.1
Rate-Limit-Reset: 1457417554290
Access-Control-Allow-Headers: origin, x-requested-with, accept
Date: Mon, 07 Mar 2016 10:12:45 GMT
Access-Control-Allow-Origin: *
X-Application-Context: application:local,default,jphx1:8080
Content-Type: application/json;charset=utf-8
X-Unknown-Params: apikey
X-Unknown-Params: api-key
Rate-Limit: 5000

{
  "name": "RNDM",
  "type": "event",
  "id": "k7vGFKzleBdwS",
  "test": false,
  "url": "http://ticketmaster.com/event/0E0050681F51BA4C",
  "locale": "en-us",
  "images":  [
     {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_RECOMENDATION_16_9.jpg",
      "width": 100,
      "height": 56,
      "fallback": false
    },
     {
      "ratio": "3_2",
      "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_ARTIST_PAGE_3_2.jpg",
      "width": 305,
      "height": 203,
      "fallback": false
    },
     {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_TABLET_LANDSCAPE_LARGE_16_9.jpg",
      "width": 2048,
      "height": 1152,
      "fallback": false
    },
     {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_RETINA_LANDSCAPE_16_9.jpg",
      "width": 1136,
      "height": 639,
      "fallback": false
    },
     {
      "ratio": "3_2",
      "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_TABLET_LANDSCAPE_3_2.jpg",
      "width": 1024,
      "height": 683,
      "fallback": false
    },
     {
      "ratio": "4_3",
      "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_CUSTOM.jpg",
      "width": 305,
      "height": 225,
      "fallback": false
    },
     {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_EVENT_DETAIL_PAGE_16_9.jpg",
      "width": 205,
      "height": 115,
      "fallback": false
    },
     {
      "ratio": "3_2",
      "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_RETINA_PORTRAIT_3_2.jpg",
      "width": 640,
      "height": 427,
      "fallback": false
    },
     {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_RETINA_PORTRAIT_16_9.jpg",
      "width": 640,
      "height": 360,
      "fallback": false
    },
     {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_TABLET_LANDSCAPE_16_9.jpg",
      "width": 1024,
      "height": 576,
      "fallback": false
    }
  ],
  "sales":  {
    "public":  {
      "startDateTime": "2015-12-18T15:00:00Z",
      "startTBD": false,
      "endDateTime": "2016-03-08T00:30:00Z"
    }
  },
  "dates":  {
    "start":  {
      "localDate": "2016-03-07",
      "localTime": "19:30:00",
      "dateTime": "2016-03-08T00:30:00Z",
      "dateTBD": false,
      "dateTBA": false,
      "timeTBA": false,
      "noSpecificTime": false
    },
    "timezone": "America/New_York",
    "status":  {
      "code": "onsale"
    }
  },
  "classifications":  [
     {
      "primary": true,
      "segment":  {
        "id": "KZFzniwnSyZfZ7v7nJ",
        "name": "Music"
      },
      "genre":  {
        "id": "KnvZfZ7vAeA",
        "name": "Rock"
      },
      "subGenre":  {
        "id": "KZazBEonSMnZfZ7v6dt",
        "name": "Alternative Rock"
      }
    }
  ],
  "promoter":  {
    "id": "653"
  },
  "_links":  {
    "self":  {
      "href": "/discovery/v2/events/k7vGFKzleBdwS?locale=en-us"
    },
    "attractions":  [
       {
        "href": "/discovery/v2/attractions/K8vZ917885V?locale=en-us"
      },
       {
        "href": "/discovery/v2/attractions/K8vZ917foI0?locale=en-us"
      }
    ],
    "venues":  [
       {
        "href": "/discovery/v2/venues/KovZpZAEAdaA?locale=en-us"
      }
    ]
  },
  "_embedded":  {
    "venues":  [
       {
        "name": "Gramercy Theatre",
        "type": "venue",
        "id": "KovZpZAEAdaA",
        "test": false,
        "locale": "en-us",
        "postalCode": "10010",
        "timezone": "America/New_York",
        "city":  {
          "name": "New York"
        },
        "state":  {
          "name": "New York",
          "stateCode": "NY"
        },
        "country":  {
          "name": "United States Of America",
          "countryCode": "US"
        },
        "address":  {
          "line1": "127 East 23rd Street"
        },
        "location":  {
          "longitude": "-73.98501292",
          "latitude": "40.73975368"
        },
        "markets":  [
           {
            "id": "35"
          },
           {
            "id": "55"
          },
           {
            "id": "124"
          }
        ],
        "_links":  {
          "self":  {
            "href": "/discovery/v2/venues/KovZpZAEAdaA?locale=en-us"
          }
        }
      }
    ],
    "attractions":  [
       {
        "name": "RNDM",
        "type": "attraction",
        "id": "K8vZ917885V",
        "test": false,
        "locale": "en-us",
        "images":  [
           {
            "ratio": "16_9",
            "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_RECOMENDATION_16_9.jpg",
            "width": 100,
            "height": 56,
            "fallback": false
          },
           {
            "ratio": "3_2",
            "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_ARTIST_PAGE_3_2.jpg",
            "width": 305,
            "height": 203,
            "fallback": false
          },
           {
            "ratio": "16_9",
            "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_TABLET_LANDSCAPE_LARGE_16_9.jpg",
            "width": 2048,
            "height": 1152,
            "fallback": false
          },
           {
            "ratio": "16_9",
            "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_RETINA_LANDSCAPE_16_9.jpg",
            "width": 1136,
            "height": 639,
            "fallback": false
          },
           {
            "ratio": "3_2",
            "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_TABLET_LANDSCAPE_3_2.jpg",
            "width": 1024,
            "height": 683,
            "fallback": false
          },
           {
            "ratio": "4_3",
            "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_CUSTOM.jpg",
            "width": 305,
            "height": 225,
            "fallback": false
          },
           {
            "ratio": "16_9",
            "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_EVENT_DETAIL_PAGE_16_9.jpg",
            "width": 205,
            "height": 115,
            "fallback": false
          },
           {
            "ratio": "3_2",
            "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_RETINA_PORTRAIT_3_2.jpg",
            "width": 640,
            "height": 427,
            "fallback": false
          },
           {
            "ratio": "16_9",
            "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_RETINA_PORTRAIT_16_9.jpg",
            "width": 640,
            "height": 360,
            "fallback": false
          },
           {
            "ratio": "16_9",
            "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_TABLET_LANDSCAPE_16_9.jpg",
            "width": 1024,
            "height": 576,
            "fallback": false
          }
        ],
        "classifications":  [
           {
            "primary": true,
            "segment":  {
              "id": "KZFzniwnSyZfZ7v7nJ",
              "name": "Music"
            },
            "genre":  {
              "id": "KnvZfZ7vAeA",
              "name": "Rock"
            },
            "subGenre":  {
              "id": "KZazBEonSMnZfZ7v6dt",
              "name": "Alternative Rock"
            }
          }
        ],
        "_links":  {
          "self":  {
            "href": "/discovery/v2/attractions/K8vZ917885V?locale=en-us"
          }
        }
      },
       {
        "name": "Parker Gispert",
        "type": "attraction",
        "id": "K8vZ917foI0",
        "test": false,
        "locale": "en-us",
        "classifications":  [
           {
            "primary": true,
            "segment":  {
              "id": "KZFzniwnSyZfZ7v7nJ",
              "name": "Music"
            },
            "genre":  {
              "id": "KnvZfZ7vAeA",
              "name": "Rock"
            },
            "subGenre":  {
              "id": "KZazBEonSMnZfZ7v6da",
              "name": "Rock"
            }
          }
        ],
        "_links":  {
          "self":  {
            "href": "/discovery/v2/attractions/K8vZ917foI0?locale=en-us"
          }
        }
      }
    ]
  }
}
{% endhighlight %}