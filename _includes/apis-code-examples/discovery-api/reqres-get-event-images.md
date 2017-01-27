{% highlight http %}
GET /discovery/v2/events/0B004F0401BD55E5/images.json?apikey={apikey} HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
{% endhighlight %}

{% highlight http %}
HTTP/1.1 200 OK
Rate-Limit-Over: 0
Content-Length: 1791
Rate-Limit-Available: 4721
Set-Cookie: CMPS=JZE+KB6vdvAgtu5+7+q5LjU8d3RbODYo2jv3r5+vwk0BcMxjtg3kAFdo3D2gFulS; path=/
Access-Control-Max-Age: 3628800
Access-Control-Allow-Methods: GET, PUT, POST, DELETE
Connection: keep-alive
Server: Apache-Coyote/1.1
Rate-Limit-Reset: 1457417554290
Access-Control-Allow-Headers: origin, x-requested-with, accept
Date: Mon, 07 Mar 2016 10:15:18 GMT
Access-Control-Allow-Origin: *
X-Application-Context: application:local,default,jphx1:8080
Content-Type: application/json;charset=utf-8
X-Unknown-Params: apikey
X-Unknown-Params: api-key
Rate-Limit: 5000

{
  "type": "event",
  "id": "k7vGFKzleBdwS",
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
  "_links":  {
    "self":  {
      "href": "/discovery/v2/events/k7vGFKzleBdwS/images?locale=en-us"
    }
  }
}
{% endhighlight %}