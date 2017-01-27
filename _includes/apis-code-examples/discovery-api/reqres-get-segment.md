{% highlight HTTP %}
GET /discovery/v2/classifications/segments/KZazBEonSMnZfZ7vFta.json?apikey={apikey} HTTP/1.1
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
Content-Length:469
Content-Type:application/json;charset=utf-8
Date:Tue, 20 Sep 2016 11:21:54 GMT
Rate-Limit:5000
Rate-Limit-Available:1514
Rate-Limit-Over:0
Rate-Limit-Reset:1474384903781
Server:Apache-Coyote/1.1
Set-Cookie:CMPS=bpb3Bk6rqZf1d8yLiJWyOiPc1IunRq4KdVq9OqS25+BMCRNts5X3I7p9SbevsS6OttgINJhrlh4=; path=/
X-Application-Context:application:local,default,jphx1:8080

{
  "id": "KZFzniwnSyZfZ7v7nE",
  "name": "Sports",
  "_links": {
    "self": {
      "href": "/discovery/v2/classifications/segments/KZFzniwnSyZfZ7v7nE?locale=en-us"
    }
  },
  "_embedded": {
    "genres": [
      {
        "id": "KnvZfZ7vA71",
        "name": "Rugby",
        "_links": {
          "self": {
            "href": "/discovery/v2/classifications/genres/KnvZfZ7vA71?locale=en-us"
          }
        },
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
            }
          ]
        }
      }
    ]
  }
}
{% endhighlight %}