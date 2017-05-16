{% highlight HTTP %}
POST /commerce/v2/shopping/carts/{cartId}/purchase.json?{apikey} HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive

{
	"pollingCallbackUrl" : "http://requestb.in/14hknvt1"
}
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Rate-Limit-Over: 0
Content-Length: 21532
Rate-Limit-Available: 498399
Set-Cookie: CMPS=EB55hDR95pURN1HyCaJoxuyEQcA8Sv2aKm4J/YaMBOYTHywQO/XHcWL6t8TWHLkL; path=/
Access-Control-Allow-Methods: POST, PATCH, DELETE, GET, HEAD, OPTIONS
X-TM-SESSION-BID: commerce-shopping
Connection: keep-alive
Access-Control-Allow-Credentials: true
Server: Apache-Coyote/1.1
Rate-Limit-Reset: 1468530242515
Access-Control-Allow-Headers: Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers
Date: Thu, 14 Jul 2016 18:15:12 GMT
Access-Control-Allow-Origin: *
X-TM-SESSION-SID: 49D8E7AAEF70BE318E4CEB599C499675
X-Application-Context: commerce-api-commerce-shopping-v1:default,jash1:8080
Content-Type: application/json;charset=UTF-8
Rate-Limit: 500000

{
  "confirmation": {
    "id": "7526469c-a70f-4be0-88c9-5b3c06bcc199",
    "type": "order-confirmations",
    "relationships": {
      "orders": {
        "data": [
          {
            "id": "5-56255/PHX",
            "type": "orders"
          }
        ]
      }
    }
  },
  "_embedded": {
    "orders": {
      "data": [
        {
          "id": "5-56255/PHX",
          "type": "orders",
          "metadata": {
            "type": "order-meta",
            "providerId": "host"
          }
        }
      ]
    }
  },
  "status": "200"
}
{% endhighlight %}
