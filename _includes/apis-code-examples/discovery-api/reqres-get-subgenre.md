{% highlight HTTP %}
GET /discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFta.json?apikey={apikey} HTTP/1.1
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
Content-Length:145
Content-Type:application/json;charset=utf-8
Date:Tue, 20 Sep 2016 11:27:24 GMT
Rate-Limit:5000
Rate-Limit-Available:1498
Rate-Limit-Over:0
Rate-Limit-Reset:1474384903781
Server:Apache-Coyote/1.1
X-Application-Context:application:local,default,jphx1:8080
X-TM-GTM-Origin:uapi-us-phx2

{
  "_links": {
    "self": {
      "href": "/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFta?locale=en-us"
    }
  },
  "id": "KZazBEonSMnZfZ7vFta",
  "name": "Rugby"
}
{% endhighlight %}