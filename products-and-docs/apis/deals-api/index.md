---
layout: documentation
categories:
- documentation
- deals-api
title: Deals API
excerpt: Use the Deals API to find content that is interesting to your audience.
keywords: API, deals, search for events, specified deal, group ticket deals
---

{: .article}
# Deals API

Use the Deals API to find content that is interesting to your audience.
{: .lead}

## Overview
{: ##overview}

### Authentication
Clients will be provided an API key from Ticketmaster which should be tagged to the end of every resource endpoint call. 

Example `https://app.ticketmaster.com/dc/content/v1/deals/events?apikey=YourApiKey`

### Best Practices
Clients should expect that new attributes may be added at any time.  However, attributes will not be removed or changed without notice.
{: .body}

### Host and API endpoint information
Production Base URL: `https://app.ticketmaster.com/dc/content/`

QA Base URL: `https://app.ticketmaster.com/dc/content-qa/`

All connections must be made over **SSL** using https.

### Contact
Ticketmaster Distributed Commerce team <a href="mailto:developer@ticketmaster.com">developer@ticketmaster.com</a>

## Group Ticket Deals
{: .article #group-ticket-deals}

### Example Requests

Find events with deals that are exclusive to the affiliate audience to me as an affiliate in the California area:

https://app.ticketmaster.com/dc/content/v1/deals/events?apikey=D9WFY74lF0f0ICkqDJiPQwQWqMAQuWtD&state=CA&exclusivities=EXCLUSIVE
{: .code .red}
---

Find events with deals in the Greater Los Angeles market area:

https://app.ticketmaster.com/dc/content/v1/deals/events?apikey=D9WFY74lF0f0ICkqDJiPQwQWqMAQuWtD&marketIds=27
{: .code .red}
---

Find events within 2 miles of Hollywood, CA that have deals:

https://app.ticketmaster.com/dc/content/v1/deals/events?apikey=D9WFY74lF0f0ICkqDJiPQwQWqMAQuWtD&radius=2&radiusUnit=miles&latitude=34.101279&longitude=-118.343552
{: .code .red}
---

## Search for Events with Deals [/deals/events]
{: #search-events-deals}

| Parameter | Description | Type        | Default Value | Required |
| --------- | ----------- | ----------- | ------------- | -------- |
| `exclusivities` | Allowable values: EXCLUSIVE, NONEXCLUSIVE |Array[string] | 'EXCLUSIVE, NONEXCLUSIVE' | No |
| `marketIds`     | See Appendix: Market Ids for values | Array[number] | null | No |
| `startRow`      | Paging start row. | number | 0 | No |
| `rows`          | Paging page size.  Maximum allowed value is 500 | number | 25 | No |
| `country`       | Search country code. | string  | 'US' | No |
| `city`          | Search city. | string | null | No |
| `state`         | Search state. | string |  null | No |
| `latitude`      | Search location, required if longitude is sent. | number | null | No |
| `longitude`     | Search location, required if latitude is sent. | number | null | No |
| `radius`        | Search location distance from lat/long radius. | number | 10 | No |
| `radiusUnit`    | Search location radius unit of measurement. Allowable values: miles, kilometers. | string | 'kilometers' | No |
| `majorGenreId`  | Search for events with the specified *major genre*. | number |    | No |
| `minorGenreId`  | Search for events with the specified *minor genre*. | number |    | No |
| `venueId`       | Search for events at the specified *venue*. | number |    | No |
| `attractionId`  | Search for events with the specified *attraction/artist*. | number |      | No |
| `timeRangeStart` | Search for events starting at or after the time specified. (ISO 8601 Date Time Format. Ex: 2001-07-18T00:00:00Z)| string |     | No |
| `timeRangeEnd`  | Search for events starting before the time specified. (ISO 8601 Date Time Format. Ex: 2001-07-18T00:00:00Z) | string |      | No |

### Search for Events with Deals [GET]
Find events that have promotional deals associated with them.

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /dc/content/v1/deals/events?apikey=**** HTTP/1.1
Host: app.ticketmaster.com
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Content-Type: application/json

{
    "hits":1,
    "totalHits":108,
    "events":[
        {
            "eventId":"3ZZZZZZZZZ95ZZZ",
            "eventName":"The Exciting Event",
            "eventDate":"2015-07-18T00:00:00Z",
            "onsaleOnDate":"2014-12-01T15:00:00Z",
            "eventDetailsLink":"http://ticketmaster.com/the_exciting_event-07-17-2015/event/3ZZZZZZZZZ95ZZZ",
            "minPrice":10,
            "maxPrice":1000,
            "currency":"USD",
            "deals":[
                {
                    "dealName":"tdusfortybelow",
                    "dealDescription":"$40 Below"
                },
                {
                    "dealName":"partnerdeal123",
                    "dealDescription":"Special Partner Deal Tickets",
                    "dealOfferCode":"PART123"
                }
            ],
            "attractions":[
                {
                    "attractionId":34533336,
                    "attractionName":"The Exciting Main Event Artist"
                },
                {
                    "attractionId":24533337,
                    "attractionName":"The Exciting Opening Artist"
                }
            ],
            "venue":{
                "venueId":455596,
                "venueName":"API Developers Stadium",
                "venueLatitude":34.101279,
                "venueLongitude":-118.343552
            },
            "categorization":{
                "majorGenres":[
                    {
                        "name":"Music",
                        "id":999999
                    }
                ],
                "minorGenres":[
                    {
                        "name":"Tech Rock",
                        "id":88888
                    }
                ]
            }
        }
    ]
}
{% endhighlight %}

Find events that have a particular promotional deal associated with them.

## Search for Events with a Specified Deal [/deals/{deal}/events]
{: #search-events-specified-deals}

### Search for Events with Deals [GET]
Find events that have a particular promotional deal associated with them.

+ Request
+ Response 200 (application/json)
{
    //this API returns the same format as the `/deals/events` endpoint above.
}

## Group Error Responses
{: #group-error-responses}

API-side errors will generate a json-formatted response body as well as standard HTTP status codes.
{: .body}

**Example:**

{% highlight js %}
{
  "message": "Maximum allowed rows exceeded.", // The error message
  "statusCode": 400  // HTTP Status Code
}
{% endhighlight %}

The following status codes will be used by this API

| Status Code | Description |
| ----------- | ----------- |
| 200         | OK. Successful operation |
| 204         | Operation completed successfully. No content returned.|
| 401         | Unauthorized access to API. May be missing Ticketmaster-supplied *apikey* parameter |
| 404         | API endpoint/path not found. |
| 405         | HTTP method not allowed for endpoint/path |
| 406         | Input/parameters not acceptable |
| 500         | Internal error occurred |
| 503         | Service is unavailable |


## Group Appendix: Market IDs
{: #group-appendix}

**Market Ids**

| Market Id | Market Name                                  | Country Name             | Country Code|
|-----------|----------------------------------------------|--------------------------|--------|
| 1         | Birmingham & More                            | United States Of America | US     |
| 2         | Charlotte                                    | United States Of America | US     |
| 3         | Chicagoland & Northern IL                    | United States Of America | US     |
| 4         | Cincinnati & Dayton                          | United States Of America | US     |
| 5         | Dallas - Fort Worth & More                   | United States Of America | US     |
| 6         | Denver & More                                | United States Of America | US     |
| 7         | Detroit, Toledo & More                       | United States Of America | US     |
| 8         | El Paso & New Mexico                         | United States Of America | US     |
| 9         | Grand Rapids & More                          | United States Of America | US     |
| 10        | Greater Atlanta Area                         | United States Of America | US     |
| 11        | Greater Boston Area                          | United States Of America | US     |
| 12        | Cleveland, Youngstown & More                 | United States Of America | US     |
| 13        | Greater Columbus Area                        | United States Of America | US     |
| 14        | Greater Las Vegas Area                       | United States Of America | US     |
| 15        | Greater Miami Area                           | United States Of America | US     |
| 16        | Minneapolis/St. Paul & More                  | United States Of America | US     |
| 17        | Greater Orlando Area                         | United States Of America | US     |
| 18        | Greater Philadelphia Area                    | United States Of America | US     |
| 19        | Greater Pittsburgh Area                      | United States Of America | US     |
| 20        | Greater San Diego Area                       | United States Of America | US     |
| 21        | Greater Tampa Area                           | United States Of America | US     |
| 22        | Houston & More                               | United States Of America | US     |
| 23        | Indianapolis & More                          | United States Of America | US     |
| 24        | Iowa                                         | United States Of America | US     |
| 25        | Jacksonville & More                          | United States Of America | US     |
| 26        | Kansas City & More                           | United States Of America | US     |
| 27        | Greater Los Angeles Area                     | United States Of America | US     |
| 28        | Louisville & Lexington                       | United States Of America | US     |
| 29        | Memphis, Little Rock & More                  | United States Of America | US     |
| 30        | Milwaukee & WI                               | United States Of America | US     |
| 31        | Nashville, Knoxville & More                  | United States Of America | US     |
| 32        | United States                                | United States Of America | US     |
| 33        | New England                                  | United States Of America | US     |
| 34        | New Orleans & More                           | United States Of America | US     |
| 35        | New York/Tri-State Area                      | United States Of America | US     |
| 36        | Phoenix & Tucson                             | United States Of America | US     |
| 37        | Portland & More                              | United States Of America | US     |
| 38        | Raleigh & Durham                             | United States Of America | US     |
| 39        | Saint Louis & More                           | United States Of America | US     |
| 40        | San Antonio & Austin                         | United States Of America | US     |
| 41        | N. California/N. Nevada                      | United States Of America | US     |
| 42        | Greater Seattle Area                         | United States Of America | US     |
| 43        | North & South Dakota                         | United States Of America | US     |
| 44        | Upstate New York                             | United States Of America | US     |
| 45        | Utah, Montana & Idaho                        | United States Of America | US     |
| 46        | Virginia                                     | United States Of America | US     |
| 47        | Washington, DC and Maryland                  | United States Of America | US     |
| 48        | West Virginia                                | United States Of America | US     |
| 49        | Hawaii                                       | United States Of America | US     |
| 50        | Alaska                                       | United States Of America | US     |
| 51        | All of US                                    | United States Of America | US     |
| 52        | Nebraska                                     | United States Of America | US     |
| 53        | Springfield                                  | United States Of America | US     |
| 54        | Central Illinois                             | United States Of America | US     |
| 55        | Northern New Jersey                          | United States Of America | US     |
| 101       | All of Canada                                | Canada                   | CA     |
| 102       | Toronto, Hamilton & Area                     | Canada                   | CA     |
| 103       | Ottawa & Eastern Ontario                     | Canada                   | CA     |
| 106       | Manitoba                                     | Canada                   | CA     |
| 107       | Edmonton & Northern Alberta                  | Canada                   | CA     |
| 108       | Calgary & Southern Alberta                   | Canada                   | CA     |
| 110       | B.C. Interior                                | Canada                   | CA     |
| 111       | Vancouver & Area                             | Canada                   | CA     |
| 112       | Saskatchewan                                 | Canada                   | CA     |
| 120       | Montreal, Quebec City & Area                 | Canada                   | CA     |
| 121       | South Carolina                               | United States Of America | US     |
| 122       | South Texas                                  | United States Of America | US     |
| 123       | Beaumont                                     | United States Of America | US     |
| 124       | Connecticut                                  | United States Of America | US     |
| 125       | Oklahoma                                     | United States Of America | US     |
| 201       | All of United Kingdom                        | Great Britain            | GB     |
| 202       | London                                       | Great Britain            | GB     |
| 203       | South                                        | Great Britain            | GB     |
| 204       | Midlands and Central                         | Great Britain            | GB     |
| 205       | Wales and North West                         | Great Britain            | GB     |
| 206       | North and North East                         | Great Britain            | GB     |
| 207       | Scotland                                     | Great Britain            | GB     |
| 208       | Ireland                                      | Ireland                  | IE     |
| 209       | Northern Ireland                             | Northern Ireland         | ND     |
| 210       | Germany                                      | Germany                  | DE     |
| 211       | Netherlands                                  | Netherlands              | NL     |
| 301       | All of Australia                             | Australia                | AU     |
| 302       | New South Wales/Australian Capital Territory | Australia                | AU     |
| 303       | Queensland                                   | Australia                | AU     |
| 304       | Western Australia                            | Australia                | AU     |
| 305       | Victoria/Tasmania                            | Australia                | AU     |
| 306       | Western Australia                            | Australia                | AU     |
| 350       | All of New Zealand                           | New Zealand              | NZ     |
| 351       | North Island                                 | New Zealand              | NZ     |
| 352       | South Island                                 | New Zealand              | NZ     |
| 401       | All of Mexico                                | Mexico                   | MX     |
| 402       | Mexico City and Metropolitan Area            | Mexico                   | MX     |
| 403       | Monterrey                                    | Mexico                   | MX     |
| 404       | Guadalajara                                  | Mexico                   | MX     |
| 500       | Sweden                                       | Sweden                   | SE     |
| 501       | Todas las poblaciones                        | Spain                    | ES     |
| 502       | Barcelona                                    | Spain                    | ES     |
| 503       | Madrid                                       | Spain                    | ES     |
| 600       | Turkey                                       | Turkey                   | TR     |
