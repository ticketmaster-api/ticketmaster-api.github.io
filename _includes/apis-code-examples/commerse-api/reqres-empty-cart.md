
{% highlight HTTP %}
DELETE /commerce/v2/shopping/carts/{cartId}.json?{apikey} HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive

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
  "cart": {
    "id": "789135f3-e337-4d0d-87e5-a0f5e824e209.jash1",
    "type": "carts",
    "attributes": {
      "totals": {
        "price": "0.00",
        "fees": "0.00",
        "taxes": "0.00",
        "deliveries": "0.00",
        "upsells": "0.00",
        "total": "0.00"
      }
    },
    "relationships": {},
    "metadata": {
      "type": "cart-meta",
      "external-ids": [
        {
          "id": "c64050d8-d561-48b2-b105-13032ca9c683",
          "provider": "host"
        }
      ]
    }
  },
  "_embedded": {},
  "status": "200"
}
{% endhighlight %}
