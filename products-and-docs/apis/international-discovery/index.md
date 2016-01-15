---
layout: documentation
categories:
- documentation
- international-discovery
---
#Ticketmaster International Discovery API 

The Ticketmaster International Discovery API allows you to search for events, attractions, or venues, and get attraction, venue or event details including ticket information.
{: .lead .article}

## Overview
{: .article #overview }

### Discovery API Services

+ See Events Service 
+ See Attraction Service
+ See Venue Service 
+ See Information Service 

### Endpoint

The base URL for the Web API is `https://app.ticketmaster.eu/mfxapi/v1/`

### Authentication
You authenticate to the Ticketmaster International Discovery API using an API Key.

+ An API Key needs to be passed as a query parameter in all requests. 
+ All requests must additionally be made over SSL

For example:

+ `apikey` = `gwyfRRwYcA0gmbUDDAtADEeaHT` (required, string)

To request an API Key send an email to the [Ticketmaster Product Manager](mailto:carie.hughes@ticketmaster.co.uk).

###Format
You can set the output format from all API Services with an Accept header. The API supports:

+ `application/json`
+ `application/xml`

### Markets
The Ticketmaster International Discovery API covers the following markets: Germany, Austria, Netherlands, Denmark, Belgium, Norway, Sweden, Finland, Poland, UK (Ticketweb.co.uk) and Canada (Admission.com). Please note that the UK and Ireland (Ticketmaster.co.uk, Ticketmaster.ie) and the USA and rest of Canada (Ticketmaster.com) are not available through the International Discovery API. Details will be available soon on how to request access to the Ticketmaster API for these markets.


{: .article }
# Event Service 
The Event Service API allows you to search for events, get details of specific events, get updates for events, and details of ticket prices, and seats.
{: .lead .article}

{: .article }
## Event Search 
Find events and filter your search by event type, location, date, availability, and much more.
 
### Event Dates
Ticketmaster events have multiple dates including eventdate (the actual date of the event) and onsale 
(the date on which tickets go on sale) and offsale (the date on which tickets are removed from sale). The eventdate is not 
always available - for example where dates have yet to be announced by the promoter. In addition some events may have a 
date but no time, - for example events such as museum or art exhibitions with no fixed start time. Such events are 
indicated by 'date' in the format field rather than the usual 'eventdate'.
 
### Query Parameters

#### Domain
Although not required, it's advisable to specify a domain or domains. The domain relates to the Ticketmaster website 
through which tickets are listed and sold. (It differs from Country which is the geographical location). You can use the 
Domains List Service for a list of domains and default URL, language, and currency. Use a comma separated list of values 
to search multiple domains. (A logical OR search is performed).

{% comment %} 
{: .nested-list}
+ `domain_ids` = (optional, string) 
    - norway
    - sweden
    - finland
    - belgium
    - netherlands
    - denmark
    - germany
    - austria
    - unitedarabemirates
    - canada
    - poland
{% endcomment %}  

| Parameters | Optional values | Type |
| -------- | | ------------------ |
|`domain_ids` | norway , sweden , finland , belgium, netherlands, denmark, germany, austria, unitedarabemirates, canada, poland | string |

#### Pagination
You can paginate the results by specifying the number of rows to return, and the start row. The default 
start is 0 and the default rows is 10. There is a maximum of 500 

+ `rows.start` = `10` (optional, integer)
+ `rows` = `20` (optional, integer)

#### Sorting
You can specify a sorting method and order. Sorting methods include event name, event date, popularity 
(based on ticket sales), and proximity (based on distance from the specified lat and long). Sorting order can be ascending 
or descending. The default sort method is eventdate and order is ascending.

{::comment}
{: .nested-list}
+ `sort_by` = `eventdate` (optional, string)
    - eventname
    - populatity
    - eventdate
    - proximity
+ `order` = `asc` (optional, string)
    - asc
    - desc
{:/comment}
    
| Parameters | Optional values | Type |
| -------- | | ------------------ |
|`sort_by` | eventname, populatity, eventdate, proximity | string |
|`order` | asc, desc | string |
    
#### Other Parameters
There are multiple _additional parameters_ which allow you to filter the search by event name, category, 
location, venue, date, availability, attraction (artist, sport, package, play and so on) and many more. See the 'Event Search' GET example for further details.

{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
var request = new XMLHttpRequest();

request.open('GET', 'https://app.ticketmaster.eu/mfxapi/v1/events?domain_ids&lang&attraction_ids&category_ids&subcategory_ids&event_ids&event_name&venue_ids&city_ids&country_ids&postal_code&lat&long&radius&eventdate_to&eventdate_from&onsaledate_to&onsaledate_from&offsaledate_to&offsaledate_from&min_price&max_price&price_excl_fees&is_seats_available&is_not_cancelled&&is_not_package&sort_by&order&rows&start&include_external_events');

request.setRequestHeader('Accept', 'application/json');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

request.send();
{% endhighlight %}

{% highlight bash %}
curl --include \
     --header "Accept: application/json" \
  'https://app.ticketmaster.eu/mfxapi/v1/events?domain_ids&lang&attraction_ids&category_ids&subcategory_ids&event_ids&event_name&venue_ids&city_ids&country_ids&postal_code&lat&long&radius&eventdate_to&eventdate_from&onsaledate_to&onsaledate_from&offsaledate_to&offsaledate_from&min_price&max_price&price_excl_fees&is_seats_available&is_not_cancelled&&is_not_package&sort_by&order&rows&start&include_external_events'
{% endhighlight %}

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /mfxapi/v1/events?domain_ids&lang&attraction_ids&category_ids&subcategory_ids&event_ids&event_name&venue_ids&city_ids&country_ids&postal_code&lat&long&radius&eventdate_to&eventdate_from&onsaledate_to&onsaledate_from&offsaledate_to&offsaledate_from&min_price&max_price&price_excl_fees&is_seats_available&is_not_cancelled&&is_not_package&sort_by&order&rows&start&include_external_events HTTP/1.1
Host: app.ticketmaster.eu
Accept: application/json
Content-Length: 0
{% endhighlight %}


{% highlight HTTP %}
HTTP/1.1 200 OK
Connection: keep-alive
X-Apiary-Transaction-Id: 5698d5143e5b710b0099e743
Content-Type: application/json
Date: Fri, 15 Jan 2016 11:16:37 GMT
Server: Apigee Router
Content-Length: 150
X-Newrelic-App-Data: PxQDVFVRCQITVlZRDgcFV0YdFHYaFhEHQxFSERd/cWYcShNDHUwDTFQHAk1WTQ0LBFdQUAcHAV9dCA8KW19PQAFXCEAUGgUHAQcABwZVAQRSAwIDVkEUVVEIEgdq
Via: 1.1 vegur

{
  "events": [
    {
      "id": "182671",
      "domain_id": "unitedkingdom",
      "name": "R5",
      "url": "http://www.ticketweb.co.uk/checkout/event.php?eventId=IEH1310Y&language=en-us&track=DiscoveryAPI&camefrom=TMINTL-NO-IPROSPECT-9oX",
      "externalUrl": false,
      "eventdate": {
        "format": "datetime",
        "value": "2015-10-13T19:00:00Z"
      },
      "day_of_week": "Tuesday",
      "timezone": "Europe/London",
      "localeventdate": "2015-10-13T20:00:00",
      "onsale": {
        "format": "datetime",
        "value": "2015-06-12T09:00:00Z"
      },
      "offsale": {
        "format": "datetime",
        "value": "2015-10-13T17:00:00Z"
      },
      "dooropening": {
        "format": "datetime",
        "value": "2015-10-13T18:00:00Z"
      },
      "properties": {
        "cancelled": false,
        "rescheduled": false,
        "seats_avail": true,
        "sold_out": false,
        "package": false
      },
      "venue": {
        "id": "9497",
        "name": "O2 Shepherd's Bush Empire",
        "location": {
          "address": {
            "address": "Shepherds Bush Green, Shepherds Bush",
            "postal_code": "W12 8TT",
            "city": "London",
            "country": "United Kingdom",
            "long": -0.22312,
            "lat": 51.50326
          }
        }
      },
      "categories": [
        {
          "name": "Music",
          "id": 10001,
          "subcategories": [
            {
              "name": "Rock/Pop",
              "id": 1
            }
          ]
        }
      ],
      "attractions": [
        {
          "id": 909876,
          "name": "R5",
          "url": "http://www.ticketweb.co.uk/artist/r5-tickets/909876?track=DiscoveryAPI&camefrom=TMINTL-NO-IPROSPECT-9oX"
        }
      ],
      "price_ranges": {
        "excluding_ticket_fees": {
          "min": 18.5,
          "max": 18.5
        },
        "including_ticket_fees": {
          "min": 20.81,
          "max": 20.81
        }
      },
      "currency": "GBP"
    },
    {
      "id": "181551",
      "domain_id": "unitedkingdom",
      "name": "MT Wolf",
      "url": "http://www.ticketweb.co.uk/checkout/event.php?eventId=VPB1410X&language=en-us&track=DiscoveryAPI&camefrom=TMINTL-NO-IPROSPECT-9oX",
      "externalUrl": false,
      "eventdate": {
        "format": "datetime",
        "value": "2015-10-14T18:30:00Z"
      },
      "day_of_week": "Wednesday",
      "timezone": "Europe/London",
      "localeventdate": "2015-10-14T19:30:00",
      "onsale": {
        "format": "datetime",
        "value": "2015-06-05T08:00:00Z"
      },
      "offsale": {
        "format": "datetime",
        "value": "2015-08-28T10:00:00Z"
      },
      "properties": {
        "cancelled": true,
        "rescheduled": false,
        "seats_avail": true,
        "sold_out": false,
        "package": false
      },
      "venue": {
        "id": "17207",
        "name": "Bush Hall",
        "location": {
          "address": {
            "address": "310 Uxbridge Road,",
            "postal_code": "W127LJ",
            "city": "London",
            "country": "United Kingdom",
            "long": -0.23162,
            "lat": 51.50629
          }
        }
      },
      "categories": [
        {
          "name": "Music",
          "id": 10001,
          "subcategories": [
            {
              "name": "Rock/Pop",
              "id": 1
            }
          ]
        }
      ],
      "price_ranges": {
        "excluding_ticket_fees": {
          "min": 12.5,
          "max": 12.5
        },
        "including_ticket_fees": {
          "min": 14.06,
          "max": 14.06
        }
      },
      "currency": "GBP"
    }
  ],
  "pagination": {
    "start": 0,
    "rows": 2,
    "total": 2
  }
}
{% endhighlight %}

{: .article #event-details }
## Event Details
Get details for a specific event using the unique identifer for the event. This includes the venue and location, ticket 
availability and pricing, a description, and the Ticketmaster Website URL for purchasing tickets for the event.

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /mfxapi/v1/event/449621?lang&domain_ids HTTP/1.1
Host: https://private-anon-82c09eec8-ticketmasterdiscoveryapi.apiary-mock.com
Accept: application/json
Content-Length: 0
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Server: Cowboy
Connection: keep-alive
X-Newrelic-App-Data: PxQDVFVRCQITVlZRDgcFV0YdFHYaFhEHQxFSERd/cWYcShNDHUwDTFQGBU1WTQgEA1VYWgQJA0pVCQYBTkQCUQkHCwAODwAABVMJURNNVQMIRVI8
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT
Access-Control-Max-Age: 10
X-Apiary-Transaction-Id: 5698d936b152b20b00fb3d5d
Content-Length: 1802
Date: Fri, 15 Jan 2016 11:16:37 GMT
Via: 1.1 vegur

{
  "events": [
    {
      "id": "182671",
      "domain_id": "unitedkingdom",
      "name": "R5",
      "url": "http://www.ticketweb.co.uk/checkout/event.php?eventId=IEH1310Y&language=en-us&track=DiscoveryAPI&camefrom=TMINTL-NO-IPROSPECT-9oX",
      "externalUrl": false,
      "eventdate": {
        "format": "datetime",
        "value": "2015-10-13T19:00:00Z"
      },
      "day_of_week": "Tuesday",
      "timezone": "Europe/London",
      "localeventdate": "2015-10-13T20:00:00",
      "onsale": {
        "format": "datetime",
        "value": "2015-06-12T09:00:00Z"
      },
      "offsale": {
        "format": "datetime",
        "value": "2015-10-13T17:00:00Z"
      },
      "dooropening": {
        "format": "datetime",
        "value": "2015-10-13T18:00:00Z"
      },
      "properties": {
        "cancelled": false,
        "rescheduled": false,
        "seats_avail": true,
        "sold_out": false,
        "package": false
      },
      "venue": {
        "id": "9497",
        "name": "O2 Shepherd's Bush Empire",
        "location": {
          "address": {
            "address": "Shepherds Bush Green, Shepherds Bush",
            "postal_code": "W12 8TT",
            "city": "London",
            "country": "United Kingdom",
            "long": -0.22312,
            "lat": 51.50326
          }
        }
      },
      "categories": [
        {
          "name": "Music",
          "id": 10001,
          "subcategories": [
            {
              "name": "Rock/Pop",
              "id": 1
            }
          ]
        }
      ],
      "attractions": [
        {
          "id": 909876,
          "name": "R5",
          "url": "http://www.ticketweb.co.uk/artist/r5-tickets/909876?track=DiscoveryAPI&camefrom=TMINTL-NO-IPROSPECT-9oX"
        }
      ],
      "price_ranges": {
        "excluding_ticket_fees": {
          "min": 18.5,
          "max": 18.5
        },
        "including_ticket_fees": {
          "min": 20.81,
          "max": 20.81
        }
      },
      "currency": "GBP"
    }
  ],
  "pagination": {
    "start": 0,
    "rows": 1,
    "total": 1
  }
}
{% endhighlight %}

{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
var request = new XMLHttpRequest();

request.open('GET', 'https://private-anon-82c09eec8-ticketmasterdiscoveryapi.apiary-mock.com/mfxapi/v1/event/449621?lang&domain_ids');

request.setRequestHeader('Accept', 'application/json');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

request.send();
{% endhighlight %}

{% highlight bash %}
curl --include \
     --header "Accept: application/json" \
  'https://private-anon-82c09eec8-ticketmasterdiscoveryapi.apiary-mock.com/mfxapi/v1/event/449621?lang&domain_ids'
{% endhighlight %}



{: .article #updated-events  }
## Updated Events 
Find the events which have been updated since a given timestamp. First call the service with the updated_since timestamp, 
then process the response and call the service again with parameters provided in the next field. Finally continue until 
the returned number of rows is less than the requested number - or until the response is an empty array. 
(This service does not consider what fields are updated or changes to values, only when the event data was written)

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /mfxapi/v1/event/updated?updated_since&lang&domain_ids&rows HTTP/1.1
Host: https://private-anon-82c09eec8-ticketmasterdiscoveryapi.apiary-mock.com
Accept: application/json
Content-Length: 0
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Server: Cowboy
Connection: keep-alive
X-Newrelic-App-Data: PxQDVFVRCQITVlZRDgcFV0YdFHYaFhEHQxFSERd/cWYcShNDHUwDTFQHAU1WTQsGAFZTVgIDBV9dCA8KW19WTgRRClIUGgYFVlBYWQRZAANXBwRXRE9eUlwXBD8=
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT
Access-Control-Max-Age: 10
X-Apiary-Transaction-Id: 5698dce0462e330b00d14313
Content-Length: 4320
Date: Fri, 15 Jan 2016 11:16:37 GMT
Via: 1.1 vegur

{
  "events": [
    {
      "id": "467619",
      "domain_id": "norway",
      "name": "Drømmeshow",
      "url": "http://www.billettservice.no/checkout/event.php?eventId=GAP15071&language=no-no&track=DiscoveryAPI",
      "eventdate": {
        "format": "datetime",
        "value": "2015-07-15T17:00:00Z"
      },
      "day_of_week": "Onsdag",
      "timezone": "Europe/Berlin",
      "localeventdate": "2015-07-15T19:00:00",
      "images": [
        {
          "url": "http://media.ticketmaster.com/img/tat/cft1/201507/01/678040.jpg?track=DiscoveryAPI",
          "type": "standard",
          "width": 205,
          "height": 115
        },
        {
          "url": "http://media.ticketmaster.com/img/tat/cft1/201507/01/678030.jpg?track=DiscoveryAPI",
          "type": "large",
          "width": 305,
          "height": 225
        }
      ],
      "onsale": {
        "format": "datetime",
        "value": "2015-06-29T13:05:00Z"
      },
      "offsale": {
        "format": "datetime",
        "value": "2015-07-15T18:00:00Z"
      },
      "properties": {
        "canceled": false,
        "rescheduled": false,
        "seats_avail": true,
        "sold_out": false,
        "package": false
      },
      "venue": {
        "id": "8653",
        "name": "Apotekergaarden",
        "location": {
          "address": {
            "address": "Skolegaten 3",
            "postal_code": "4876",
            "city": "Grimstad",
            "country": "Norway",
            "long": 8.59344,
            "lat": 58.34178
          }
        }
      },
      "categories": [
        {
          "name": "Teater/Show",
          "id": 10002,
          "subcategories": [
            {
              "name": "Show",
              "id": 1118
            }
          ]
        },
        {
          "name": "Comedy",
          "id": 10102,
          "subcategories": [
            {
              "name": "Humor/Komedie",
              "id": 39
            }
          ]
        }
      ],
      "attractions": [
        {
          "id": 961604,
          "name": "Drømmeshow",
          "url": "http://www.billettservice.no/artist/drommeshow-billetter/961604?track=DiscoveryAPI"
        }
      ],
      "price_ranges": {
        "excluding_ticket_fees": {
          "min": 395,
          "max": 395
        },
        "including_ticket_fees": {
          "min": 420,
          "max": 420
        }
      },
      "currency": "NOK"
    },
    {
      "id": "467981",
      "domain_id": "norway",
      "name": "Weekend Pass  PALMESUS 2016",
      "url": "http://www.billettservice.no/checkout/event.php?eventId=KYS2016&language=no-no&track=DiscoveryAPI",
      "eventdate": {
        "format": "datetime",
        "value": "2016-07-01T10:01:00Z"
      },
      "day_of_week": "Fredag",
      "timezone": "Europe/Berlin",
      "localeventdate": "2016-07-01T12:01:00",
      "images": [
        {
          "url": "http://media.ticketmaster.com/img/tat/cft1/201411/28/524730.jpg?track=DiscoveryAPI",
          "type": "standard",
          "width": 205,
          "height": 115
        },
        {
          "url": "http://media.ticketmaster.com/img/tat/cft1/201411/28/524720.jpg?track=DiscoveryAPI",
          "type": "large",
          "width": 305,
          "height": 225
        }
      ],
      "onsale": {
        "format": "datetime",
        "value": "2015-07-06T15:00:00Z"
      },
      "offsale": {
        "format": "datetime",
        "value": "2016-07-01T09:00:00Z"
      },
      "properties": {
        "canceled": false,
        "rescheduled": false,
        "seats_avail": false,
        "sold_out": true,
        "package": false
      },
      "venue": {
        "id": "3259",
        "name": "Bystranda",
        "location": {
          "address": {
            "postal_code": "4634",
            "city": "Kristiansand S",
            "country": "Norway",
            "long": 8.00806,
            "lat": 58.14623
          }
        }
      },
      "categories": [
        {
          "name": "Musikk",
          "id": 10001,
          "subcategories": [
            {
              "name": "Rock/Pop",
              "id": 1
            }
          ]
        },
        {
          "name": "Festivaler",
          "id": 10101,
          "subcategories": [
            {
              "name": "Musikkfestival",
              "id": 1005
            }
          ]
        }
      ],
      "attractions": [
        {
          "id": 901146,
          "name": "Palmesus",
          "url": "http://www.billettservice.no/artist/palmesus-billetter/901146?track=DiscoveryAPI"
        }
      ],
      "price_ranges": {
        "excluding_ticket_fees": {
          "min": 1299,
          "max": 1299
        },
        "including_ticket_fees": {
          "min": 1349,
          "max": 1349
        }
      },
      "currency": "NOK"
    }
  ],
  "next": "?lang=no-no&domain_ids=norway&updated_since=2015-07-08T09:41:09.288Z&rows=10"
}

{% endhighlight %}

{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
var request = new XMLHttpRequest();

request.open('GET', 'https://private-anon-82c09eec8-ticketmasterdiscoveryapi.apiary-mock.com/mfxapi/v1/event/updated?updated_since&lang&domain_ids&rows');

request.setRequestHeader('Accept', 'application/json');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

request.send();
{% endhighlight %}

{% highlight bash %}
curl --include \
     --header "Accept: application/json" \
  'https://private-anon-82c09eec8-ticketmasterdiscoveryapi.apiary-mock.com/mfxapi/v1/event/updated?updated_since&lang&domain_ids&rows'
{% endhighlight %}

{: .article #event-prices}
## Event Prices 
Get information about the ticket price levels applicable for an specific event ID, the price range for each level and ticket availability.

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /mfxapi/v1/event/449621/prices?domain_ids&lang&price_level_ids HTTP/1.1
Host: https://private-anon-82c09eec8-ticketmasterdiscoveryapi.apiary-mock.com
Accept: application/json
Content-Length: 0
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Server: Cowboy
Connection: keep-alive
X-Newrelic-App-Data: PxQDVFVRCQITVlZRDgcFV0YdFHYaFhEHQxFSERd/cWYcShNDHVEdUlQFG1FIUw4FBlxSUwcAG1dQBwUfQFNWVVQHDldaCwVRVgMJQx0HUg4XU2o=
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT
Access-Control-Max-Age: 10
X-Apiary-Transaction-Id: 5698dee38392e30b00af94c6
Content-Length: 1463
Date: Fri, 15 Jan 2016 12:16:37 GMT
Via: 1.1 vegur

{
  "event": {
    "id": 115831,
    "price_types": [
      {
        "id": 1,
        "code": "NORM",
        "name": "Normal",
        "description": "Regular Price",
        "regular": true,
        "price_levels": [
          {
            "id": 1,
            "name": "Seating Cat 1",
            "face_value": 110,
            "ticket_fees": 18.95,
            "availability": "none"
          },
          {
            "id": 2,
            "name": "Seating Cat 2",
            "face_value": 95,
            "ticket_fees": 16.7,
            "availability": "none"
          },
          {
            "id": 3,
            "name": "Seating Cat 3",
            "face_value": 80,
            "ticket_fees": 14.45,
            "availability": "high"
          },
          {
            "id": 4,
            "name": "Seating Cat 4",
            "face_value": 60,
            "ticket_fees": 11.45,
            "availability": "high"
          },
          {
            "id": 5,
            "name": "Seating Cat 5",
            "face_value": 60,
            "ticket_fees": 12.65,
            "availability": "none"
          },
          {
            "id": 6,
            "name": "Premium seats 1",
            "face_value": 250,
            "ticket_fees": 39.95,
            "availability": "none"
          },
          {
            "id": 7,
            "name": "Premium seats 2",
            "face_value": 150,
            "ticket_fees": 24.95,
            "availability": "none"
          }
        ]
      }
    ],
    "currency": "EUR"
  }
}

{% endhighlight %}

{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
var request = new XMLHttpRequest();

request.open('GET', 'https://private-anon-82c09eec8-ticketmasterdiscoveryapi.apiary-mock.com/mfxapi/v1/event/449621/prices?domain_ids&lang&price_level_ids');

request.setRequestHeader('Accept', 'application/json');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

request.send();
{% endhighlight %}

{% highlight bash %}
curl --include \
     --header "Accept: application/json" \
  'https://private-anon-82c09eec8-ticketmasterdiscoveryapi.apiary-mock.com/mfxapi/v1/event/449621/prices?domain_ids&lang&price_level_ids'
{% endhighlight %}

{: .article #event-seatmap}
## Event Seatmap 
Get a static map image of the venue for the event showing the location of seating or standing areas. Note that not all events will have a seatmap available - for example packages, festivals, many general admission music events, and so on. Interactive seatmaps are currently not available.

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /mfxapi/v1/event/449621/seatmap?domain_ids HTTP/1.1
Host: https://private-anon-82c09eec8-ticketmasterdiscoveryapi.apiary-mock.com
Accept: application/json
Content-Length: 0
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Server: Cowboy
Connection: keep-alive
X-Newrelic-App-Data: PxQDVFVRCQITVlZRDgcFV0YdFHYaFhEHQxFSERd/cWYcShNDHVEdUlUDG1FIUggCBlNWUgAFG1RUAhoRU1NUVAkEC1JaAFEBVwEbTVcAXxEBaw==
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT
Access-Control-Max-Age: 10
X-Apiary-Transaction-Id: 5698e2a58392e30b00af97e0
Content-Length: 203
Date: Fri, 15 Jan 2016 12:16:37 GMT
Via: 1.1 vegur

{
  "event": {
    "id": "440837",
    "seatmap": {
      "static": {
        "images": [
          {
            "url": "http://media.ticketmaster.eu/norway/9c1d6c2026eff803098724ab90132fa2.png"
          }
        ]
      }
    }
  }
}
{% endhighlight %}

{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
var request = new XMLHttpRequest();

request.open('GET', 'https://private-anon-82c09eec8-ticketmasterdiscoveryapi.apiary-mock.com/mfxapi/v1/event/449621/seatmap?domain_ids');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

request.send();
{% endhighlight %}

{% highlight bash %}
curl --include \
     --header "Accept: application/json" \
  'https://private-anon-82c09eec8-ticketmasterdiscoveryapi.apiary-mock.com/mfxapi/v1/event/449621/seatmap?domain_ids'
{% endhighlight %}

{: .article #event-areas}
## Event Areas 
Get information on the seating areas available for an event and the prices for tickets.

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /mfxapi/v1/event/449621/areas?domain_ids&lang HTTP/1.1
Host: https://private-anon-82c09eec8-ticketmasterdiscoveryapi.apiary-mock.com
Accept: application/json
Content-Length: 0
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Server: Cowboy
Connection: keep-alive
X-Newrelic-App-Data: PxQDVFVRCQITVlZRDgcFV0YdFHYaFhEHQxFSERd/cWYcShNDHUwDTFQGBU1WTQgLB1VUUgQIBUpXBgIfQAAHBAUAClIPDQIFVQABQx0HUg4XU2o=
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT
Access-Control-Max-Age: 10
X-Apiary-Transaction-Id: 5698e3f38796480b004119c9
Content-Length: 374
Date: Fri, 15 Jan 2016 12:16:37 GMT
Via: 1.1 vegur

{
  "event": {
    "id": 139503,
    "areas": [
      {
        "code": "GR",
        "name": "Staanplaats",
        "price_level_ids": [
          1
        ],
        "price_ranges": {
          "excluding_ticket_fees": {
            "min": 37.5,
            "max": 37.5
          },
          "including_ticket_fees": {
            "min": 237.5,
            "max": 237.5
          }
        }
      }
    ],
    "currency": "EUR"
  }
}
{% endhighlight %}

{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
var request = new XMLHttpRequest();

request.open('GET', '/event/449621/areas?domain_ids&lang');

request.setRequestHeader('Accept', 'application/json');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

request.send();
{% endhighlight %}

{% highlight bash %}
curl --include \
'/event/449621/areas?domain_ids&lang'
{% endhighlight %}




{: .article}
# Attractions Service 
The Attractions Service API allows you to search for attractions, get details for specific attractions, and support for suggest as you type. 
An attraction can be a music artist, a type of sport, a play or show, and so on.
{: .lead.article}

##Attraction Search 

Find attractions (artists, sports, packages, plays and so on) and filter your search by name, and much more. 

### Query Parameters

#### Domain (Market) 
Although not required, it's advisable to specify a domain or domains. The domain relates to the Ticketmaster website 
through which tickets are listed and sold. (It differs from Country which is the geographical location). You can use the 
Domains List Service for a list of domains and default URL, language, and currency. Use a comma separated list of values 
to search multile domains. (A logical OR search is performed).

| Parameters | Optional values | Type |
| -------- | | ------------------ |
|`domain_ids` | norway , sweden , finland , belgium, netherlands, denmark, germany, austria, unitedarabemirates, canada, poland | string |

#### Pagination 
You can paginate the results by specifying the number of rows to return, and the start row. There is a maximum of 500 

+ `rows.start` = `0` (optional, integer)

#### Sorting 
You can specify a sorting method and order. Options include event name, event date, popularity, and proximity (based on 
the lat and long) with ascending or descending order. The default is eventdate and ascending.

sort_by = attraction_name (optional, string)attraction_namepopulatityorder = asc (optional, string)asc desc

| Parameters | Optional values | Type |
| -------- | | ------------------ |
|`sort_by` | attraction_name, populatity | string |
|`order` | asc, desc | string |

#### *Other Parameters*
There are additional parameters which allow you to filter the search by attraction name, and attractions with events on sale.