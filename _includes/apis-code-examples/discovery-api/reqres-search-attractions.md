{% highlight http %}
GET /discovery/v2/attractions.json?size=1&apikey={apikey} HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
{% endhighlight %}

{% highlight http %}
HTTP/1.1 200 OK
Rate-Limit-Over: 0
Content-Length: 2306
Rate-Limit-Available: 4719
Set-Cookie: CMPS=twsJFiJCd9puX3QeIpWdz1Co+AFBb0GGb2S5IpJoKGFAy6VVeUUgAfUsgfrWYV89; path=/
Access-Control-Max-Age: 3628800
Access-Control-Allow-Methods: GET, PUT, POST, DELETE
Connection: keep-alive
Server: Apache-Coyote/1.1
Rate-Limit-Reset: 1457417554290
Access-Control-Allow-Headers: origin, x-requested-with, accept
Date: Mon, 07 Mar 2016 10:17:30 GMT
Access-Control-Allow-Origin: *
X-Application-Context: application:local,default,jphx1:8080
Content-Type: application/json;charset=utf-8
X-Unknown-Params: apikey
X-Unknown-Params: api-key
Rate-Limit: 5000

{
  "_links":  {},
  "_embedded":  {
    "attractions":  [
       {
        "name": "!!!",
        "type": "attraction",
        "id": "K8vZ9175BhV",
        "test": false,
        "locale": "en-us",
        "images":  [],
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
    ]
  },
  "page":  {
    "size": 1,
    "totalElements": 162165,
    "totalPages": 162165,
    "number": 0
  }
}
{% endhighlight %}