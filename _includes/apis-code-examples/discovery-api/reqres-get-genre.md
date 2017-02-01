{% highlight HTTP %}
GET /discovery/v2/classifications/genres/KnvZfZ7vA71.json?apikey={apikey} HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Access-Control-Allow-Headers:origin, x-requested-with, accept
Access-Control-Allow-Methods:GET, PUT, POST, DELETE
Access-Control-Allow-Origin:*
Access-Control-Max-Age:3628800
Connection:keep-alive
Content-Length:605
Content-Type:application/hal+json;charset=utf-8
Date:Tue, 20 Sep 2016 10:39:15 GMT
Rate-Limit:5000
Rate-Limit-Available:1654
Rate-Limit-Over:0
Rate-Limit-Reset:1474384903781
Server:Apache-Coyote/1.1
X-Application-Context:application:local,default,jphx1:8080
X-TM-GTM-Origin:uapi-us-phx2

{
  "_embedded": {
    "subgenres": [
      {
        "id": "KZazBEonSMnZfZ7vFta",
        "name": "Rugby",
        "_links": {
          "self": {
            "href": "/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFta?locale=en-us"
          }
        }
      },
      {
        "id": "KZazBEonSMnZfZ7vFt1",
        "name": "Rugby League",
        "_links": {
          "self": {
            "href": "/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFt1?locale=en-us"
          }
        }
      },
      {
        "id": "KZazBEonSMnZfZ7vFtJ",
        "name": "Rugby Union",
        "_links": {
          "self": {
            "href": "/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFtJ?locale=en-us"
          }
        }
      }
    ]
  },
  "_links": {
    "self": {
      "href": "/discovery/v2/classifications/genres/KnvZfZ7vA71?locale=en-us"
    }
  },
  "id": "KnvZfZ7vA71",
  "name": "Rugby"
}
{% endhighlight %}