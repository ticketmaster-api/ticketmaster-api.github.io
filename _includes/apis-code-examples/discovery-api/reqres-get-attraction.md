{% highlight HTTP %}
GET /discovery/v2/attractions/K8vZ9175BhV.json?apikey={apikey} HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Rate-Limit-Over: 0
Content-Length: 2019
Rate-Limit-Available: 4715
Set-Cookie: CMPS=5vv+AGPecM7pv5Q4MmLBniGH0DBXyfh68w9nYydgerFjBhsCrQs1DbTINMWnUgrDL0UGMYDHSDc=; path=/
Access-Control-Max-Age: 3628800
Access-Control-Allow-Methods: GET, PUT, POST, DELETE
Connection: keep-alive
Server: Apache-Coyote/1.1
Rate-Limit-Reset: 1457417554290
Access-Control-Allow-Headers: origin, x-requested-with, accept
Date: Mon, 07 Mar 2016 10:21:02 GMT
Access-Control-Allow-Origin: *
X-Application-Context: application:local,default,jash1:8080
Content-Type: application/json;charset=utf-8
X-Unknown-Params: apikey
X-Unknown-Params: api-key
Rate-Limit: 5000

{
  "name": "!!!",
  "type": "attraction",
  "id": "K8vZ9175BhV",
  "test": false,
  "locale": "en-us",
  "images":  [
     {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/418/aa73b994-9912-4535-ba21-4865ae93a418_41291_RECOMENDATION_16_9.jpg",
      "width": 100,
      "height": 56,
      "fallback": false
    },
     {
      "ratio": "4_3",
      "url": "http://s1.ticketm.net/dam/a/418/aa73b994-9912-4535-ba21-4865ae93a418_41291_CUSTOM.jpg",
      "width": 305,
      "height": 225,
      "fallback": false
    },
     {
      "ratio": "3_2",
      "url": "http://s1.ticketm.net/dam/a/418/aa73b994-9912-4535-ba21-4865ae93a418_41291_ARTIST_PAGE_3_2.jpg",
      "width": 305,
      "height": 203,
      "fallback": false
    },
     {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/418/aa73b994-9912-4535-ba21-4865ae93a418_41291_RETINA_PORTRAIT_16_9.jpg",
      "width": 640,
      "height": 360,
      "fallback": false
    },
     {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/418/aa73b994-9912-4535-ba21-4865ae93a418_41291_TABLET_LANDSCAPE_LARGE_16_9.jpg",
      "width": 2048,
      "height": 1152,
      "fallback": false
    },
     {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/418/aa73b994-9912-4535-ba21-4865ae93a418_41291_TABLET_LANDSCAPE_16_9.jpg",
      "width": 1024,
      "height": 576,
      "fallback": false
    },
     {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/418/aa73b994-9912-4535-ba21-4865ae93a418_41291_RETINA_LANDSCAPE_16_9.jpg",
      "width": 1136,
      "height": 639,
      "fallback": false
    },
     {
      "ratio": "3_2",
      "url": "http://s1.ticketm.net/dam/a/418/aa73b994-9912-4535-ba21-4865ae93a418_41291_RETINA_PORTRAIT_3_2.jpg",
      "width": 640,
      "height": 427,
      "fallback": false
    },
     {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/418/aa73b994-9912-4535-ba21-4865ae93a418_41291_EVENT_DETAIL_PAGE_16_9.jpg",
      "width": 205,
      "height": 115,
      "fallback": false
    },
     {
      "ratio": "3_2",
      "url": "http://s1.ticketm.net/dam/a/418/aa73b994-9912-4535-ba21-4865ae93a418_41291_TABLET_LANDSCAPE_3_2.jpg",
      "width": 1024,
      "height": 683,
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
        "id": "KZazBEonSMnZfZ7v6F1",
        "name": "Pop"
      }
    }
  ],
  "_links":  {
    "self":  {
      "href": "/discovery/v2/attractions/K8vZ9175BhV?locale=en-us"
    }
  }
}
{% endhighlight %}