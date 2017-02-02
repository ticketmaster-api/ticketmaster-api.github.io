{% highlight HTTP %}
GET /discovery/v2/venues/KovZpZAFnIEA.json?apikey={apikey} HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Rate-Limit-Over: 0
Content-Length: 534
Rate-Limit-Available: 4641
Set-Cookie: CMPS=EVPIT1pv8wWL7BwB100rEn1yhwBpj7YSqibbjeotIHcpnB/odVGK9VdPBPm3dTrr; path=/
Access-Control-Max-Age: 3628800
Access-Control-Allow-Methods: GET, PUT, POST, DELETE
Connection: keep-alive
Server: Apache-Coyote/1.1
Rate-Limit-Reset: 1457417554290
Access-Control-Allow-Headers: origin, x-requested-with, accept
Date: Mon, 07 Mar 2016 12:10:53 GMT
Access-Control-Allow-Origin: *
X-Application-Context: application:local,default,jphx1:8080
Content-Type: application/json;charset=utf-8
X-Unknown-Params: apikey
X-Unknown-Params: api-key
Rate-Limit: 5000

{
  "name": "#1 Please do not use, left over from UCV initial acct set up",
  "type": "venue",
  "id": "KovZpZAFnIEA",
  "test": false,
  "locale": "en-us",
  "postalCode": "K0C1X0",
  "timezone": "America/Toronto",
  "city":  {
    "name": "Morrisburg"
  },
  "state":  {
    "name": "Ontario",
    "stateCode": "ON"
  },
  "country":  {
    "name": "Canada",
    "countryCode": "CA"
  },
  "address":  {
    "line1": "Crysler Park Marina, 13480 County Rd 2"
  },
  "location":  {
    "longitude": "-75.18702730",
    "latitude": "44.94535340"
  },
  "markets":  [
     {
      "id": "103"
    }
  ],
  "_links":  {
    "self":  {
      "href": "/discovery/v2/venues/KovZpZAFnIEA?locale=en-us"
    }
  }
}
{% endhighlight %}