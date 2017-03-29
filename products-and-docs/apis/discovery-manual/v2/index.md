---
layout: documentation
categories:
- documentation
- discovery
- v2
- replace_apikey
title: Discovery API 2.0
excerpt: Use the Discovery API to search, look up and find events, attractions and venues.
keywords: API, search events, attraction details, event images, category details, venue details, support
---

# Discovery API

{: .version-button .active}
[V 2.0]({{"/products-and-docs/apis/discovery-manual/v2/" | prepend: site.baseurl}})


Search and look up events, attractions, venues and classifications across all supported sources, markets and locales.
{: .lead .article}

{%comment%}
#### Developer Console
{: .aside .gray}

Make live API calls right now in the interactive docs:

[INTERACTIVE DOCS](/products-and-docs/apis/interactive-console/){: .button}
{%endcomment%}

## Overview
{: .article #overview }

### Authentication

To run a successful API call, you will need to pass your API Key in the `apikey` query parameter. **Your API Key should automatically appear in all URLs throughout this portal**.

Example: `https://app.ticketmaster.com/discovery/v2/events.json?apikey={apikey}`

Without a valid API Key, you will receive a `401` Status Code with the following response:

	{
	    "fault": {
	        "faultstring": "Invalid ApiKey",
	        "detail": {
	            "errorcode": "oauth.v2.InvalidApiKey"
	        }
	    }
	}

### Root URL

`https://app.ticketmaster.com/discovery/v2/`

### Event Sources

The API provides access to content sourced from various platform, including **Ticketmaster**, **Universe**, **FrontGate Tickets** and **Ticketmaster Resale** (TMR). By default, the API returns events from all sources. To specify a specifc source(s), use the `&source=` parameter. Multiple, comma separated values are OK.

### Event Coverage

With over 230K+ events available in the API, coverage spans different countries, including **United States**, **Canada**, **Mexico**, **Australia**, **New Zealand**, **United Kingdom**, **Ireland**, other European countries, and more. More events and more countries are added on continuous basis.

![event map](/assets/img/products-and-docs/map.png)

### Examples

**Get a list of all events in the United States**
`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey={apikey}`

**Search for events sourced by Universe in the United States with keyword "devjam"**
`https://app.ticketmaster.com/discovery/v2/events.json?keyword=devjam&source=universe&countryCode=US&apikey={apikey}`

**Search for music events in the Los Angeles area**
`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey={apikey}`

**Get a list of all events for Adele in Canada**
`https://app.ticketmaster.com/discovery/v2/events.json?attractionId=K8vZ917Gku7&countryCode=CA&apikey={apikey}`


## Search Events
{: .article .console-link #srch-events-v2 }

**Method:** GET.
Authentication required.
Returns the 20 most recent events for the authenticating user.

discovery/{version}/events.{format}
{: .code .red}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v2"         | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |

### Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `keyword`  | A string to search against event's name. Partial word will not be found. ex: `keyword=Mado` will not found event with name: Madonna   | string            |                | No      |
| `attractionId`   | Attraction ID(s) separated by comma. | string            |       "K8vZ91713eV"       | No      |
| `venueId`   | Venue ID(s) separated by comma. | string            |       "KovZpZAEdFtJ"       | No      |
| `postalCode`   | Zipcode or Postal Code of the venue in which the event is taking place. This is text-based search, not location-based search. Use lat/long + radius search for nearby events. | string            |       "90069"       | No      |
| `latlong`   | The Latitude, Longitude coordinates for the venue in which this event is taking place. | string            |       "34.0928090,-118.3286610"       | No      |
| `radius`   | The radius of the area in which we want to search for events. | string            |       "25"       | No      |
| `unit`   | The radius distance unit. Possible values: miles, km. | string            |       "miles"       | No      |
| `source`   | Source of the event. Possible values are 'ticketmaster', 'frontgate', 'universe'. | string            |       "ticketmaster"       | No      |
| `locale`   | There is no fallback mechanism, so it's possible you will not have values in multi-lingual fields | string            |              | No      |
| `marketId`   | The city/metro area in which this event takes place. | string            |       "27"       | No      |
| `startDateTime`   | Include events happening after this date. | string            |       "2017-01-01T00:00:00Z"       | No      |
| `endDateTime`   | Include events happening before this date. | string            |       "2017-01-01T00:00:00Z"       | No      |
| `includeTBA`   | 	Whether or not to return events with dates to be announced (TBA). Default is 'no', TBA events are not returned. | string            |       "yes&#124;no&#124;only"       | No      |
| `includeTBD`   | Whether or not to return events with dates to be determined (TBD). Default is 'no', TBD events are not returned. | string            |       "yes&#124;no&#124;only"       | No      |
| `includeTest`   | Whether or not to return test events. Default is 'no', test events are not returned. | string            |       "yes&#124;no&#124;only"       | No      |
| `size`   | The number of events returned in the API response. (Max 500) | string            |       "10"       | No      |
| `page`   | The page for paginating through the results. | string            |       "1"       | No      |
| `sort`   | The search sort criteria. Values: "", "eventDate,date.desc", "eventDate,date.asc", "name,date.desc", "name,date.asc". | string            |              | No      |
| `onsaleStartDateTime`   | Include events going onsale after this date. | string            |       "2017-01-01T00:00:00Z"       | No      |
| `onsaleEndDateTime`   | Include events going onsale before this date. | string            |       "2017-01-01T00:00:00Z"       | No      |
|	`city` | city |string| | No|
| `countryCode`   | ISO value for the country in which you want to query events in. Possible values are: 'US', 'CA', 'AU', 'NZ', 'MX'. | string            |       "MX"       | No      |
|	`stateCode` | stateCode |string|| No|
| `classificationName` |any classification name - segment - genre - sub-genre | string || No|
| `classificationId` | any classification id - segment - genre - sub-genre| string || No|
|	`dmaId`|dmaId| string || No|



### Response structure:

{: .nested-list}
- `_embedded` (object) - container for events.
    * `events` (array) - events.
        - `{array item object}` - event.
            * `name` (string) - name of event.
            * `type` (string) - type of event.
            * `id` (string) - id of event.
            * `test` (boolean) - is test.
            * `locale` (string) - locale of event.
            * `url` (string) - links to event detail page.
            * `pleaseNote` (string) - event's note.
            * `priceRanges` (array) - priceRanges.
                - `{array item object}` - priceRange.
                    *	`type` (string) - price type ("standard")
                    *	`currency` (string) - currency
                    *	`min` (number) - minimum price
                    *	`max` (number) - maximum price
            * `promoter` (object) - promoter.
                - `id` (string) - promoter id.
            * `info` (string) - event's information.
            * `images` (array) - images.
                - `{array item object}` - image.
                    * `ratio` (string) - image ratio.
                    * `url` (string) - image url.
                    * `width` (number) - image width.
                    * `height` (number) - image height.
                    * `fallback` (boolean) - image fallback availability.
            * `sales` (object) - sales.
                - `public` (object) - public sales.
                    * `startDateTime` (string) - date and time start of public sales.
                    * `startTBD` (boolean) - is start TBD.
                    * `endDateTime` (string) - date and time end of public sales.
            * `dates` (object) - dates of event.
                - `access` (object) - access
                    - `startDateTime` (string) - start date time
                    - `startApproximate` (boolean) - start approximate
                    - `endDateTime` (string) - end date time
                    - `endApproximate` (boolean) - end approximate
                - `end` (object) - start of event.
                    * `approximate` (boolean) - is approximate.
                    * `dateTime` (string) - date and time end of event.
                - `start` (object) - start of event.
                    * `dateTime` (string) - date and time start of event.
                    * `localDate` (string) - local date start of event.
                    * `localTime` (string) - local time start of event.
                    * `dateTBD` (boolean) - is date TBD.
                    * `dateTBA` (boolean) - is date TBA.
                    * `timeTBA` (boolean) - is time TBA.
                    * `noSpecificTime` (boolean) - is no specific time.
                - `timezone` (string) - time zone of event.
                - `status` (object) - status of event.
                    * `code` (string) - code of status.
            * `classifications` (array) - classifications.
                - `{array item object}` - classification.
                    * `primary` (boolean) - is primary.
                    * `segment` (object) - segment.
                        - `id` (string) - segment id.
                        - `name` (string) - segment name.
                    * `genre` (object) - genre.
                        - `id` (string) - genre id.
                        - `name` (string) - genre name.
                    * `subGenre` (object) - subgenre.
                        - `id` (string) - subgenre id.
                        - `name` (string) - subgenre name.
            * `_links` (object) - links to event.
                - `self` (object) - link to this event.
                    + `href` (string) - reference.
                - `attractions` (object) - links to event attractions.
                    * `{array item object}` - link.
                        * `href` (string) - reference to event attraction.
                - `venue` (object) - link to event venues.
                    * `{array item object}` - link.
                        * `href` (string) - reference to event venue.
            * `_embedded` (object) - container for related items.
                - `venue` (array) - related venues.
                    * `{array item object}` - venue.
                        * `name` (string) - name of event venue.
                        * `type` (string) - type of current venue.
                        * `id` (string) - id of current venue.
                        * `test` (boolean) - is test.
                        * `locale` (string) - locale of event.
                        * `postalCode` (string) - postal code of venue.
                        * `timeZone` (string) - time zone of event.
                        * `markets` (array) - markets.
                            - `{array item object}` - market.
                                * `id` (string) - market id.
                        * `country` (object) - country of venue.
                            - `name` (string) - name of country.
                            - `countryCode` (string) - country code of venue.
                        * `state` (object) - state of venue.
                            - `name` (string) - name of state.
                            - `stateCode` (string) - state code of venue.
                        * `city` (object) - city of venue.
                            - `name` (string) - city name of venue.
                        * `location` (object) - location of venue.
                            - `latitude` (string) - latitude of venue.
                            - `longitude` (string) - longitude of venue.
                        * `address` (object) - address of venue.
                            - `line1` (string) - street name.
                            - `line2` (string) - city and state code where event happen.
                        * `_links` (object) - links.
                            - `self` (object) - link to this venue.
                                * `href` (string) - reference.
                - `attractions` (array) - related attractions.
                    + `{array item object}` - event attractions.
                        * `url` (string) - url to event attraction.
                        * `image` (object) - images of attraction.
                            - `url` (string) - images url of event.
                        * `name` (string) - name of event attraction.
                        * `_links` (object) - links to attractions.
                            - `self` (object) - link to this attraction.
                                * `href` (string) - reference.
                        * `id` (string) - id of current attraction.
                        * `type` (string) - type of current attraction.
                        * `test` (boolean) - is test.
                        * `locale` (string) - locale of event.
                        * `images` (array) - images.
                            - `{array item object}` - image.
                                * `ratio` (string) - image ratio.
                                * `url` (string) - image url.
                                * `width` (number) - image width.
                                * `height` (number) - image height.
                                * `fallback` (boolean) - image fallback availability.
                        * `classifications` (array) - classifications.
                            - `{array item object}` - classification.
                                * `primary` (boolean) - is primary.
                                * `segment` (object) - segment.
                                    - `id` (string) - segment id.
                                    - `name` (string) - segment name.
                                * `genre` (object) - genre.
                                    - `id` (string) - genre id.
                                    - `name` (string) - genre name.
                                * `subGenre` (object) - subgenre.
                                    - `id` (string) - subgenre id.
                                    - `name` (string) - subgenre name.
- `_links` (object) - links to data sets.
    * `self` (object) - link to this data set.
        - `href` (string) - reference.
        - `templated` (boolean) - ability to be templated.
    * `next` (object) - link to the next data set.
        - `href` (string) - reference.
        - `templated` (boolean) - ability to be templated.
- `page` (object) - information about current page in data source.
    * `size` (number) - size of page.
    * `totalElements` (number) - total number of available elements in server.
    * `totalPages` (number) - total number of available pages in server.
    * `number` (number) - current page number counted from 0.

{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey={apikey}",
  async:true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});
{% endhighlight %}

{% highlight bash %}
curl \
--include 'https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey={apikey}'
{% endhighlight %}


{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight http %}
GET /discovery/v2/events.json?apikey={apikey}&size=1 HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
{% endhighlight %}

{% highlight http %}
HTTP/1.1 200 OK
Rate-Limit-Over: 0
Content-Length: 5360
Rate-Limit-Available: 4723
Set-Cookie: CMPS=0ytJbt229sTM7UXhHxC5IEvVNguFRwkBBUZ76aK9bmvRvAWZwe/RjM5TSH0yOXNFGd+urQFTC6o=; path=/
Access-Control-Max-Age: 3628800
Access-Control-Allow-Methods: GET, PUT, POST, DELETE
Connection: keep-alive
Server: Apache-Coyote/1.1
Rate-Limit-Reset: 1457417554290
Access-Control-Allow-Headers: origin, x-requested-with, accept
Date: Mon, 07 Mar 2016 10:09:51 GMT
Access-Control-Allow-Origin: *
X-Application-Context: application:local,default,jphx1:8080
Content-Type: application/json;charset=utf-8
X-Unknown-Params: apikey
X-Unknown-Params: api-key
Rate-Limit: 5000

{
  "_links":  {
    "self":  {
      "href": "/discovery/v2/events.json?size=1{&page,sort}",
      "templated": true
    },
    "next":  {
      "href": "/discovery/v2/events.json?page=1&size=1{&sort}",
      "templated": true
    }
  },
  "_embedded":  {
    "events":  [
       {
        "name": "WGC Cadillac Championship - Sunday Ticket",
        "type": "event",
        "id": "vvG1VZKS5pr1qy",
        "test": false,
        "url": "http://ticketmaster.com/event/0E0050681F51BA4C",
        "locale": "en-us",
        "images":  [
           {
            "ratio": "16_9",
            "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_RETINA_LANDSCAPE_16_9.jpg",
            "width": 1136,
            "height": 639,
            "fallback": false
          },
           {
            "ratio": "3_2",
            "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_RETINA_PORTRAIT_3_2.jpg",
            "width": 640,
            "height": 427,
            "fallback": false
          },
           {
            "ratio": "16_9",
            "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_TABLET_LANDSCAPE_LARGE_16_9.jpg",
            "width": 2048,
            "height": 1152,
            "fallback": false
          },
           {
            "ratio": "16_9",
            "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_TABLET_LANDSCAPE_16_9.jpg",
            "width": 1024,
            "height": 576,
            "fallback": false
          },
           {
            "ratio": "16_9",
            "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_EVENT_DETAIL_PAGE_16_9.jpg",
            "width": 205,
            "height": 115,
            "fallback": false
          },
           {
            "ratio": "3_2",
            "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_ARTIST_PAGE_3_2.jpg",
            "width": 305,
            "height": 203,
            "fallback": false
          },
           {
            "ratio": "16_9",
            "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_RETINA_PORTRAIT_16_9.jpg",
            "width": 640,
            "height": 360,
            "fallback": false
          },
           {
            "ratio": "4_3",
            "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_CUSTOM.jpg",
            "width": 305,
            "height": 225,
            "fallback": false
          },
           {
            "ratio": "16_9",
            "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_RECOMENDATION_16_9.jpg",
            "width": 100,
            "height": 56,
            "fallback": false
          },
           {
            "ratio": "3_2",
            "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_TABLET_LANDSCAPE_3_2.jpg",
            "width": 1024,
            "height": 683,
            "fallback": false
          }
        ],
        "sales":  {
          "public":  {
            "startDateTime": "2015-10-02T11:00:00Z",
            "startTBD": false,
            "endDateTime": "2016-03-06T23:00:00Z"
          }
        },
        "dates":  {
          "start":  {
            "localDate": "2016-03-06",
            "dateTBD": false,
            "dateTBA": false,
            "timeTBA": true,
            "noSpecificTime": false
          },
          "timezone": "America/New_York",
          "status":  {
            "code": "offsale"
          }
        },
        "classifications":  [
           {
            "primary": true,
            "segment":  {
              "id": "KZFzniwnSyZfZ7v7nE",
              "name": "Sports"
            },
            "genre":  {
              "id": "KnvZfZ7vAdt",
              "name": "Golf"
            },
            "subGenre":  {
              "id": "KZazBEonSMnZfZ7vFI7",
              "name": "PGA Tour"
            }
          }
        ],
        "promoter":  {
          "id": "682"
        },
        "_links":  {
          "self":  {
            "href": "/discovery/v2/events/vvG1VZKS5pr1qy?locale=en-us"
          },
          "attractions":  [
             {
              "href": "/discovery/v2/attractions/K8vZ917uc57?locale=en-us"
            }
          ],
          "venues":  [
             {
              "href": "/discovery/v2/venues/KovZpZAaEldA?locale=en-us"
            }
          ]
        },
        "_embedded":  {
          "venues":  [
             {
              "name": "Trump National Doral",
              "type": "venue",
              "id": "KovZpZAaEldA",
              "test": false,
              "locale": "en-us",
              "postalCode": "33178",
              "timezone": "America/New_York",
              "city":  {
                "name": "Miami"
              },
              "state":  {
                "name": "Florida",
                "stateCode": "FL"
              },
              "country":  {
                "name": "United States Of America",
                "countryCode": "US"
              },
              "address":  {
                "line1": "4400 NW 87th Avenue"
              },
              "location":  {
                "longitude": "-80.33854298",
                "latitude": "25.81260379"
              },
              "markets":  [
                 {
                  "id": "15"
                }
              ],
              "_links":  {
                "self":  {
                  "href": "/discovery/v2/venues/KovZpZAaEldA?locale=en-us"
                }
              }
            }
          ],
          "attractions":  [
             {
              "name": "Cadillac Championship",
              "type": "attraction",
              "id": "K8vZ917uc57",
              "test": false,
              "locale": "en-us",
              "images":  [
                 {
                  "ratio": "16_9",
                  "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_RETINA_LANDSCAPE_16_9.jpg",
                  "width": 1136,
                  "height": 639,
                  "fallback": false
                },
                 {
                  "ratio": "3_2",
                  "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_RETINA_PORTRAIT_3_2.jpg",
                  "width": 640,
                  "height": 427,
                  "fallback": false
                },
                 {
                  "ratio": "16_9",
                  "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                  "width": 2048,
                  "height": 1152,
                  "fallback": false
                },
                 {
                  "ratio": "16_9",
                  "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_TABLET_LANDSCAPE_16_9.jpg",
                  "width": 1024,
                  "height": 576,
                  "fallback": false
                },
                 {
                  "ratio": "16_9",
                  "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_EVENT_DETAIL_PAGE_16_9.jpg",
                  "width": 205,
                  "height": 115,
                  "fallback": false
                },
                 {
                  "ratio": "3_2",
                  "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_ARTIST_PAGE_3_2.jpg",
                  "width": 305,
                  "height": 203,
                  "fallback": false
                },
                 {
                  "ratio": "16_9",
                  "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_RETINA_PORTRAIT_16_9.jpg",
                  "width": 640,
                  "height": 360,
                  "fallback": false
                },
                 {
                  "ratio": "4_3",
                  "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_CUSTOM.jpg",
                  "width": 305,
                  "height": 225,
                  "fallback": false
                },
                 {
                  "ratio": "16_9",
                  "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_RECOMENDATION_16_9.jpg",
                  "width": 100,
                  "height": 56,
                  "fallback": false
                },
                 {
                  "ratio": "3_2",
                  "url": "http://s1.ticketm.net/dam/a/196/6095e742-64d1-4b15-aeac-c9733c52d196_66341_TABLET_LANDSCAPE_3_2.jpg",
                  "width": 1024,
                  "height": 683,
                  "fallback": false
                }
              ],
              "classifications":  [
                 {
                  "primary": true,
                  "segment":  {
                    "id": "KZFzniwnSyZfZ7v7nE",
                    "name": "Sports"
                  },
                  "genre":  {
                    "id": "KnvZfZ7vAdt",
                    "name": "Golf"
                  },
                  "subGenre":  {
                    "id": "KZazBEonSMnZfZ7vFI7",
                    "name": "PGA Tour"
                  }
                }
              ],
              "_links":  {
                "self":  {
                  "href": "/discovery/v2/attractions/K8vZ917uc57?locale=en-us"
                }
              }
            }
          ]
        }
      }
    ]
  },
  "page":  {
    "size": 1,
    "totalElements": 87958,
    "totalPages": 87958,
    "number": 0
  }
}
{% endhighlight %}

## Get Event Details
{: .article .console-link #event-details-v2 }

**Method:** GET.
Authentication required.
Returns the event detail by event ID.

discovery/{version}/events/{id}.{format}
{: .code .red}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v2"         | Yes      |
| `id`       | Event ID. Required.  | string            | "1A4ZAZyGkeUYKaO"  | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |

### Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |   "en-us"   | No      |

### Response structure:

{: .nested-list}
* `_embedded` (object) - container for related items.
    - `attractions` (array) - related attractions.
        + `{array item object}` - event attractions.
            * `_links` (object) - links to attractions.
                - `self` (object) - link to this attraction.
                    * `href` (string) - reference.
            * `classifications` (array) - classifications.
                - `{array item object}` - classification.
                    * `primary` (boolean) - is primary.
                    * `segment` (object) - segment.
                        - `id` (string) - segment id.
                        - `name` (string) - segment name.
                    * `genre` (object) - genre.
                        - `id` (string) - genre id.
                        - `name` (string) - genre name.
                    * `subGenre` (object) - subgenre.
                        - `id` (string) - subgenre id.
                        - `name` (string) - subgenre name.
            * `id` (string) - id of current attraction.
            * `images` (array) - images.
                - `{array item object}` - image.
                    * `ratio` (string) - image ratio.
                    * `url` (string) - image url.
                    * `width` (number) - image width.
                    * `height` (number) - image height.
                    * `fallback` (boolean) - image fallback availability.
            * `name` (string) - name of event attraction.
            * `locale` (string) - locale of event.
            * `test` (boolean) - is test.
            * `type` (string) - type of current attraction.
            * `url` (string) - url to event attraction.
    - `venue` (array) - related venues.
        * `{array item object}` - venue.
            * `_links` (object) - links.
                - `self` (object) - link to this venue.
                    * `href` (string) - reference.
            * `address` (object) - address of venue.
                - `line1` (string) - street name.
                - `line2` (string) - city and state code where event happen.
            * `city` (object) - city of venue.
                - `name` (string) - city name of venue.
            * `country` (object) - country of venue.
                - `countryCode` (string) - country code of venue.
            * `id` (string) - id of current venue.
            * `locale` (string) - locale of event.
            * `location` (object) - location of venue.
                - `latitude` (string) - latitude of venue.
                - `longitude` (string) - longitude of venue.            
            * `markets` (array) - markets.
                - `{array item object}` - market.
                    * `id` (string) - market id.
            * `name` (string) - name of event venue.
            * `postalCode` (string) - postal code of venue.
            * `state` (object) - state of venue.
                - `stateCode` (string) - state code of venue.
            * `type` (string) - type of current venue.
            * `test` (boolean) - is test.
            * `timeZone` (string) - time zone of event.
            * `url` (string) - links to venue.
* `_links` (object) - links to event.
    - `self` (object) - link to this event.
        + `href` (string) - reference.
    - `attractions` (object) - links to event attractions.
        * `{array item object}` - link.
            * `href` (string) - reference to event attraction.
    - `venue` (object) - link to event venues.
        * `{array item object}` - link.
            * `href` (string) - reference to event venue.
* `classifications` (array) - classifications.
    - `{array item object}` - classification.
        * `primary` (boolean) - is primary.
        * `segment` (object) - segment.
            - `id` (string) - segment id.
            - `name` (string) - segment name.
        * `genre` (object) - genre.
            - `id` (string) - genre id.
            - `name` (string) - genre name.
        * `subGenre` (object) - subgenre.
            - `id` (string) - subgenre id.
            - `name` (string) - subgenre name.
* `dates` (object) - dates of event.
    - `access` (object) - access
        - `startDateTime` (string) - start date time
        - `startApproximate` (boolean) - start approximate
        - `endDateTime` (string) - end date time
        - `endApproximate` (boolean) - end approximate
    - `end` (object) - start of event.
        * `approximate` (boolean) - is approximate.
        * `dateTime` (string) - date and time end of event.
    - `start` (object) - start of event.
        * `dateTime` (string) - date and time start of event.
        * `localDate` (string) - local date start of event.
        * `localTime` (string) - local time start of event.
        * `dateTBD` (boolean) - is date TBD.
        * `dateTBA` (boolean) - is date TBA.
        * `timeTBA` (boolean) - is time TBA.
        * `noSpecificTime` (boolean) - is no specific time.
    - `timezone` (string) - time zone of event.
    {% comment %}
    - `displayOptions` (object) - display options of event.
        * `range` (object) - range of event displayed.
            - `localStartDate` (string) - local start date of event displayed.
            - `localEndDate` (string) - local end date of event displayed.
    {% endcomment %}
    - `status` (object) - status of event.
        * `code` (string) - code of status.
* `id` (string) - id of event.
* `images` (array) - images.
    - `{array item object}` - image.
        * `ratio` (string) - image ratio.
        * `url` (string) - image url.
        * `width` (number) - image width.
        * `height` (number) - image height.
        * `fallback` (boolean) - image fallback availability.
* `info` (string) - event's information.
* `locale` (string) - locale of event.
* `name` (string) - name of event.
* `pleaseNote` (string) - event's note.
* `priceRanges` (array) - priceRanges.
    - `{array item object}` - priceRange.
        *	`type` (string) - price type ("standard")
        *	`currency` (string) - currency
        *	`min` (number) - minimum price
        *	`max` (number) - maximum price
* `promoter` (object) - promoter.
    - `id` (string) - promoter id.
* `sales` (object) - sales.
    - `public` (object) - public sales.
        * `startDateTime` (string) - date and time start of public sales.
        * `startTBD` (boolean) - is start TBD.
        * `endDateTime` (string) - date and time end of public sales.
* `test` (boolean) - is test.
* `type` (string) - type of event.
* `url` (string) - links to event detail page.

{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/events/G5diZfkn0B-bh.json?apikey={apikey}",
  async:true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});
{% endhighlight %}

{% highlight bash %}
curl \
--include 'https://app.ticketmaster.com/discovery/v2/events/G5diZfkn0B-bh.json?apikey={apikey}'
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight http %}
GET /discovery/v2/events/G5diZfkn0B-bh.json?apikey={apikey} HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
{% endhighlight %}

{% highlight http %}
HTTP/1.1 200 OK
Rate-Limit-Over: 0
Content-Length: 5555
Rate-Limit-Available: 4722
Set-Cookie: CMPS=cE7N5yujrQNGYWvJF3bAH6iRNHwAv0FDp5i1VDetaW6+WW5OZTOBve6ZQCpN9qCv; path=/
Access-Control-Max-Age: 3628800
Access-Control-Allow-Methods: GET, PUT, POST, DELETE
Connection: keep-alive
Server: Apache-Coyote/1.1
Rate-Limit-Reset: 1457417554290
Access-Control-Allow-Headers: origin, x-requested-with, accept
Date: Mon, 07 Mar 2016 10:12:45 GMT
Access-Control-Allow-Origin: *
X-Application-Context: application:local,default,jphx1:8080
Content-Type: application/json;charset=utf-8
X-Unknown-Params: apikey
X-Unknown-Params: api-key
Rate-Limit: 5000

{
  "_embedded": {
    "venues": [
      {
        "name": "Madison Square Garden",
        "type": "venue",
        "id": "KovZpZA7AAEA",
        "test": false,
        "url": "http://ticketmaster.com/venue/483329",
        "locale": "en-us",
        "postalCode": "10001",
        "timezone": "America/New_York",
        "city": {
          "name": "New York"
        },
        "state": {
          "name": "New York",
          "stateCode": "NY"
        },
        "country": {
          "name": "United States Of America",
          "countryCode": "US"
        },
        "address": {
          "line1": "7th Ave & 32nd Street"
        },
        "location": {
          "longitude": "-73.99160060",
          "latitude": "40.74970620"
        },
        "markets": [
          {
            "id": "35"
          },
          {
            "id": "51"
          },
          {
            "id": "55"
          },
          {
            "id": "124"
          }
        ],
        "dmas": [
          {
            "id": 200
          },
          {
            "id": 296
          },
          {
            "id": 345
          },
          {
            "id": 422
          }
        ],
        "_links": {
          "self": {
            "href": "/discovery/v2/venues/KovZpZA7AAEA?locale=en-us"
          }
        }
      }
    ],
    "attractions": [
      {
        "name": "Radiohead",
        "type": "attraction",
        "id": "K8vZ91713wV",
        "test": false,
        "url": "http://ticketmaster.com/artist/763468",
        "locale": "en-us",
        "images": [
          {
            "ratio": "16_9",
            "url": "http://s1.ticketm.net/dam/a/c4c/e751ab33-b9cd-4d24-ad4a-5ef79faa7c4c_72681_EVENT_DETAIL_PAGE_16_9.jpg",
            "width": 205,
            "height": 115,
            "fallback": false
          },
          {
            "ratio": "16_9",
            "url": "http://s1.ticketm.net/dam/a/c4c/e751ab33-b9cd-4d24-ad4a-5ef79faa7c4c_72681_RETINA_LANDSCAPE_16_9.jpg",
            "width": 1136,
            "height": 639,
            "fallback": false
          },
          {
            "ratio": "16_9",
            "url": "http://s1.ticketm.net/dam/a/c4c/e751ab33-b9cd-4d24-ad4a-5ef79faa7c4c_72681_RETINA_PORTRAIT_16_9.jpg",
            "width": 640,
            "height": 360,
            "fallback": false
          },
          {
            "ratio": "16_9",
            "url": "http://s1.ticketm.net/dam/a/c4c/e751ab33-b9cd-4d24-ad4a-5ef79faa7c4c_72681_RECOMENDATION_16_9.jpg",
            "width": 100,
            "height": 56,
            "fallback": false
          },
          {
            "ratio": "3_2",
            "url": "http://s1.ticketm.net/dam/a/c4c/e751ab33-b9cd-4d24-ad4a-5ef79faa7c4c_72681_RETINA_PORTRAIT_3_2.jpg",
            "width": 640,
            "height": 427,
            "fallback": false
          },
          {
            "ratio": "16_9",
            "url": "http://s1.ticketm.net/dam/a/c4c/e751ab33-b9cd-4d24-ad4a-5ef79faa7c4c_72681_TABLET_LANDSCAPE_16_9.jpg",
            "width": 1024,
            "height": 576,
            "fallback": false
          },
          {
            "ratio": "3_2",
            "url": "http://s1.ticketm.net/dam/a/c4c/e751ab33-b9cd-4d24-ad4a-5ef79faa7c4c_72681_ARTIST_PAGE_3_2.jpg",
            "width": 305,
            "height": 203,
            "fallback": false
          },
          {
            "ratio": "16_9",
            "url": "http://s1.ticketm.net/dam/a/c4c/e751ab33-b9cd-4d24-ad4a-5ef79faa7c4c_72681_TABLET_LANDSCAPE_LARGE_16_9.jpg",
            "width": 2048,
            "height": 1152,
            "fallback": false
          },
          {
            "ratio": "3_2",
            "url": "http://s1.ticketm.net/dam/a/c4c/e751ab33-b9cd-4d24-ad4a-5ef79faa7c4c_72681_TABLET_LANDSCAPE_3_2.jpg",
            "width": 1024,
            "height": 683,
            "fallback": false
          },
          {
            "ratio": "4_3",
            "url": "http://s1.ticketm.net/dam/a/c4c/e751ab33-b9cd-4d24-ad4a-5ef79faa7c4c_72681_CUSTOM.jpg",
            "width": 305,
            "height": 225,
            "fallback": false
          }
        ],
        "classifications": [
          {
            "primary": true,
            "segment": {
              "id": "KZFzniwnSyZfZ7v7nJ",
              "name": "Music"
            },
            "genre": {
              "id": "KnvZfZ7vAeA",
              "name": "Rock"
            },
            "subGenre": {
              "id": "KZazBEonSMnZfZ7v6dt",
              "name": "Alternative Rock"
            }
          }
        ],
        "_links": {
          "self": {
            "href": "/discovery/v2/attractions/K8vZ91713wV?locale=en-us"
          }
        }
      }
    ]
  },
  "_links": {
    "self": {
      "href": "/discovery/v2/events/G5diZfkn0B-bh?locale=en-us"
    },
    "attractions": [
      {
        "href": "/discovery/v2/attractions/K8vZ91713wV?locale=en-us"
      }
    ],
    "venues": [
      {
        "href": "/discovery/v2/venues/KovZpZA7AAEA?locale=en-us"
      }
    ]
  },
  "classifications": [
    {
      "primary": true,
      "segment": {
        "id": "KZFzniwnSyZfZ7v7nJ",
        "name": "Music"
      },
      "genre": {
        "id": "KnvZfZ7vAeA",
        "name": "Rock"
      },
      "subGenre": {
        "id": "KZazBEonSMnZfZ7v6dt",
        "name": "Alternative Rock"
      }
    }
  ],
  "dates": {
    "start": {
      "localDate": "2016-07-27",
      "localTime": "19:30:00",
      "dateTime": "2016-07-27T23:30:00Z",
      "dateTBD": false,
      "dateTBA": false,
      "timeTBA": false,
      "noSpecificTime": false
    },
    "timezone": "America/New_York",
    "status": {
      "code": "onsale"
    }
  },
  "id": "G5diZfkn0B-bh",
  "images": [
    {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/c4c/e751ab33-b9cd-4d24-ad4a-5ef79faa7c4c_72681_EVENT_DETAIL_PAGE_16_9.jpg",
      "width": 205,
      "height": 115,
      "fallback": false
    },
    {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/c4c/e751ab33-b9cd-4d24-ad4a-5ef79faa7c4c_72681_RETINA_LANDSCAPE_16_9.jpg",
      "width": 1136,
      "height": 639,
      "fallback": false
    },
    {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/c4c/e751ab33-b9cd-4d24-ad4a-5ef79faa7c4c_72681_RETINA_PORTRAIT_16_9.jpg",
      "width": 640,
      "height": 360,
      "fallback": false
    },
    {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/c4c/e751ab33-b9cd-4d24-ad4a-5ef79faa7c4c_72681_RECOMENDATION_16_9.jpg",
      "width": 100,
      "height": 56,
      "fallback": false
    },
    {
      "ratio": "3_2",
      "url": "http://s1.ticketm.net/dam/a/c4c/e751ab33-b9cd-4d24-ad4a-5ef79faa7c4c_72681_RETINA_PORTRAIT_3_2.jpg",
      "width": 640,
      "height": 427,
      "fallback": false
    },
    {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/c4c/e751ab33-b9cd-4d24-ad4a-5ef79faa7c4c_72681_TABLET_LANDSCAPE_16_9.jpg",
      "width": 1024,
      "height": 576,
      "fallback": false
    },
    {
      "ratio": "3_2",
      "url": "http://s1.ticketm.net/dam/a/c4c/e751ab33-b9cd-4d24-ad4a-5ef79faa7c4c_72681_ARTIST_PAGE_3_2.jpg",
      "width": 305,
      "height": 203,
      "fallback": false
    },
    {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/c4c/e751ab33-b9cd-4d24-ad4a-5ef79faa7c4c_72681_TABLET_LANDSCAPE_LARGE_16_9.jpg",
      "width": 2048,
      "height": 1152,
      "fallback": false
    },
    {
      "ratio": "3_2",
      "url": "http://s1.ticketm.net/dam/a/c4c/e751ab33-b9cd-4d24-ad4a-5ef79faa7c4c_72681_TABLET_LANDSCAPE_3_2.jpg",
      "width": 1024,
      "height": 683,
      "fallback": false
    },
    {
      "ratio": "4_3",
      "url": "http://s1.ticketm.net/dam/a/c4c/e751ab33-b9cd-4d24-ad4a-5ef79faa7c4c_72681_CUSTOM.jpg",
      "width": 305,
      "height": 225,
      "fallback": false
    }
  ],
  "locale": "en-us",
  "name": "Radiohead",
  "pleaseNote": "No tickets will be delivered prior to April 18th. Tickets are not available at the box office on the first day of the public on sale. ARRIVE EARLY: Please arrive one-hour prior to showtime. All packages, including briefcases and pocketbooks, will be inspected prior to entry.",
  "priceRanges": [
    {
      "type": "standard",
      "currency": "USD",
      "min": 80,
      "max": 80
    }
  ],
  "promoter": {
    "id": "494"
  },
  "sales": {
    "public": {
      "startDateTime": "2016-03-18T14:00:00Z",
      "startTBD": false,
      "endDateTime": "2016-07-27T21:30:00Z"
    }
  },
  "test": false,
  "type": "event",
  "url": "http://ticketmaster.com/event/3B00506AA4EA161B"
}
{% endhighlight %}



## Get Event Images
{: .article .console-link #event-img-v2}

**Method:** GET.
Authentication required.
Returns all the images for an event by ID. If an event does not have an image for a supported resolution, the event's major category image will be returned instead.

{: .code .red}
discovery/{version}/events/{id}/images.{format}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v2"         | Yes      |
| `id`       | Event ID. Required.  | string            | "1A4ZAZyGkeUYKaO"  | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |

### Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |   "en-us"   | No      |


### Response structure:

{: .nested-list}
- `type` (string) - type of images set
- `id` (string) - id of event
- `images` (array) - images.
    * `{array item object}` - image.
        * `ratio` (string) - image ratio.
        * `url` (string) - image url.
        * `width` (number) - image width.
        * `height` (number) - image height.
        * `fallback` (boolean) - image fallback availability.
- `_links` (object) - links to images data set.
    * `self` (object) - link to this images set.
        - `href` (string) - reference.

{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/events/k7vGFKzleBdwS/images.json?apikey={apikey}",
  async:true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});
{% endhighlight %}

{% highlight bash %}
curl \
--include 'https://app.ticketmaster.com/discovery/v2/events/k7vGFKzleBdwS/images.json?apikey={apikey}'
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight http %}
GET /discovery/v2/events/0B004F0401BD55E5/images.json?apikey={apikey} HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
{% endhighlight %}

{% highlight http %}
HTTP/1.1 200 OK
Rate-Limit-Over: 0
Content-Length: 1791
Rate-Limit-Available: 4721
Set-Cookie: CMPS=JZE+KB6vdvAgtu5+7+q5LjU8d3RbODYo2jv3r5+vwk0BcMxjtg3kAFdo3D2gFulS; path=/
Access-Control-Max-Age: 3628800
Access-Control-Allow-Methods: GET, PUT, POST, DELETE
Connection: keep-alive
Server: Apache-Coyote/1.1
Rate-Limit-Reset: 1457417554290
Access-Control-Allow-Headers: origin, x-requested-with, accept
Date: Mon, 07 Mar 2016 10:15:18 GMT
Access-Control-Allow-Origin: *
X-Application-Context: application:local,default,jphx1:8080
Content-Type: application/json;charset=utf-8
X-Unknown-Params: apikey
X-Unknown-Params: api-key
Rate-Limit: 5000

{
  "type": "event",
  "id": "k7vGFKzleBdwS",
  "images":  [
     {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_RECOMENDATION_16_9.jpg",
      "width": 100,
      "height": 56,
      "fallback": false
    },
     {
      "ratio": "3_2",
      "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_ARTIST_PAGE_3_2.jpg",
      "width": 305,
      "height": 203,
      "fallback": false
    },
     {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_TABLET_LANDSCAPE_LARGE_16_9.jpg",
      "width": 2048,
      "height": 1152,
      "fallback": false
    },
     {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_RETINA_LANDSCAPE_16_9.jpg",
      "width": 1136,
      "height": 639,
      "fallback": false
    },
     {
      "ratio": "3_2",
      "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_TABLET_LANDSCAPE_3_2.jpg",
      "width": 1024,
      "height": 683,
      "fallback": false
    },
     {
      "ratio": "4_3",
      "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_CUSTOM.jpg",
      "width": 305,
      "height": 225,
      "fallback": false
    },
     {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_EVENT_DETAIL_PAGE_16_9.jpg",
      "width": 205,
      "height": 115,
      "fallback": false
    },
     {
      "ratio": "3_2",
      "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_RETINA_PORTRAIT_3_2.jpg",
      "width": 640,
      "height": 427,
      "fallback": false
    },
     {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_RETINA_PORTRAIT_16_9.jpg",
      "width": 640,
      "height": 360,
      "fallback": false
    },
     {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/063/1689bfea-ae98-4c7e-a31d-bbca2dd14063_54361_TABLET_LANDSCAPE_16_9.jpg",
      "width": 1024,
      "height": 576,
      "fallback": false
    }
  ],
  "_links":  {
    "self":  {
      "href": "/discovery/v2/events/k7vGFKzleBdwS/images?locale=en-us"
    }
  }
}
{% endhighlight %}

{: .article .console-link #search-attractions-v2}
## Search Attractions

**Method:** GET.
Authentication required.
Search Attractions!

{: .code .red}
discovery/{version}/attractions.{format}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v2"         | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |

### Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `keyword`  | A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.     | string            |                | No      |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |              | No      |
| `size`   | The number of events returned in the API response. | string            |       "20"       | No      |
| `page`   | The page for paginating through the results. | string            |       "1"       | No      |
| `sort`   | The search sort criteria. Values: "name,desc", "name,asc". | string            |              | No      |

### Response structure:

{: .nested-list}
- `_embedded` (object) - container attractions.
    * `attractions` (array) - attractions.
        - `{array item object}` - attraction.
            * `_links` (object) - links to attractions.
                - `self` (object) - link to this attraction.
                    * `href` (string) - reference.
            * `classifications` (array) - classifications.
                - `{array item object}` - classification.
                    * `primary` (boolean) - is primary.
                    * `segment` (object) - segment.
                        - `id` (string) - segment id.
                        - `name` (string) - segment name.
                    * `genre` (object) - genre.
                        - `id` (string) - genre id.
                        - `name` (string) - genre name.
                    * `subGenre` (object) - subgenre.
                        - `id` (string) - subgenre id.
                        - `name` (string) - subgenre name.
            * `id` (string) - id of current attraction.            
            * `images` (array) - images.
                - `{array item object}` - image.
                    * `fallback` (boolean) - image fallback availability.
                    * `height` (number) - image height.
                    * `ratio` (string) - image ratio.
                    * `url` (string) - image url.
                    * `width` (number) - image width.
            * `locale` (string) - locale of event.
            * `name` (string) - name of event attraction.
            * `test` (boolean) - is test.
            * `type` (string) - type of current attraction.
            * `url` (string) - url to event attraction.
- `_links` (object) - links to attractions data set.
    * `self` (object) - link to this data set.
        - `href` (string) - reference.
        - `templated` (boolean) - is templated.
    * `next` (object) - link to the next data set.
        - `href` (string) - reference.
        - `templated` (boolean) - is templated.
    * `next` (object) - link to the next attraction.
- `page` (object) - information about current page in data source.
    * `size` (number) - size of page.
    * `totalElements` (number) - total number of available elements in server.
    * `totalPages` (number) - total number of available pages in server.
    * `number` (number) - current page number counted from 0.


{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/attractions.json?apikey={apikey}",
  async:true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});
{% endhighlight %}

{% highlight bash %}
curl \
--include 'https://app.ticketmaster.com/discovery/v2/attractions.json?apikey={apikey}'
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

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

{: .article .console-link #attraction-details-v2}
## Get Attraction Details

**Method:** GET.
Authentication required.
Search Attractions!

discovery/{version}/attractions/{id}.{format}
{: .code .red}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |     "v2"           | Yes      |
| `id`       | Attraction ID.       | string            |     "K8vZ917G7x0"  | Yes      |
| `format`   | API Response Format. | string            |     "json"         | Yes      |



### Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |              | No      |
| `source`   | source | string            |              | No      |

### Response structure:

{: .nested-list}
* `_links` (object) - links to attractions.
    - `self` (object) - link to this attraction.
        * `href` (string) - reference.
* `classifications` (array) - classifications.
    - `{array item object}` - classification.
        * `primary` (boolean) - is primary.
        * `segment` (object) - segment.
            - `id` (string) - segment id.
            - `name` (string) - segment name.
        * `genre` (object) - genre.
            - `id` (string) - genre id.
            - `name` (string) - genre name.
        * `subGenre` (object) - subgenre.
            - `id` (string) - subgenre id.
            - `name` (string) - subgenre name.
* `id` (string) - id of current attraction.
* `images` (array) - images.
    - `{array item object}` - image.
        * `ratio` (string) - image ratio.
        * `url` (string) - image url.
        * `width` (number) - image width.
        * `height` (number) - image height.
        * `fallback` (boolean) - image fallback availability.
* `locale` (string) - locale of event.
* `name` (string) - name of event attraction.
* `test` (boolean) - is test.
* `type` (string) - type of current attraction.
* `url` (string) - url to event attraction.

{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/attractions/K8vZ9175BhV.json?apikey={apikey}",
  async:true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});
{% endhighlight %}

{% highlight bash %}
curl \
--include 'https://app.ticketmaster.com/discovery/v2/attractions/K8vZ9175BhV.json?apikey={apikey}'
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

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


{: .article .console-link #search-classifications-v2}
## Search Classifications

**Method:** GET.
Authentication required.
Search Classifications!

discovery/{version}/classifications.{format}
{: .code .red}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |     "v2"           | Yes      |
| `format`   | API Response Format. | string            |     "json"         | Yes      |

### Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `keyword`  | A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.     | string            |                | No      |
| `classificationID `  |  classification ID  | string            |                | No      |
| `size`   | The number of events returned in the API response. | string            |       "20"       | No      |
| `page`   | The page for paginating through the results. | string            |       "1"       | No      |
| `sort`   | The search sort criteria. Values: "", "name,desc", "name,asc". | string            |              | No      |

### Response structure:

{: .nested-list}
- `_embedded` (object) - container for classifications.
    * `classifications` (array) - classifications.
        - `{array item object}` - classification.
            * `_links` (object) - links to classifications data sets.
                - `self` (object) - link to this data set.
                    * `href` (string) - reference.
            * `segment` (object) - segment.
                - `_embedded` (object) - container for genres.
                    * `genres` (array) - genres.
                        - `{array item object}` - genres.
                            * `_links` (object) - links to genre.
                                - `self` (object) - link to this genre.
                                    * `href` (string) - reference.
                            * `_embedded` (object) - container for subgenres.
                                + `subgenres` (array) - subgenres.
                                    - `{array item object}` - subgenre.
                                        * `_links` (object) - links to subgenre.
                                            - `self` (object) - link to this subgenre.
                                                * `href` (string) - reference.
                                        * `id` (string) - genre id.
                                        * `name` (string) - genre name.
                            * `id` (string) - genre id.
                            * `name` (string) - genre name.
                * `_links` (object) - links to segments.
                    - `self` (object) - link to this segments.
                        * `href` (string) - reference.
- `_links` (object) - links to classifications data sets.
    * `self` (object) - link to this data set.
        - `href` (string) - reference.
        - `templated` (boolean) - ability to be templated.
    * `next` (object) - link to the next data set.
        - `href` (string) - reference.
        - `templated` (boolean) - ability to be templated.
- `page` (object) - information about current page in data source.
    * `size` (number) - size of page.
    * `totalElements` (number) - total number of available elements in server.
    * `totalPages` (number) - total number of available pages in server.
    * `number` (number) - current page number counted from 0.


{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/classifications.json?apikey={apikey}",
  async:true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});
{% endhighlight %}

{% highlight bash %}
curl \
--include 'https://app.ticketmaster.com/discovery/v2/classifications.json?apikey={apikey}'
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /discovery/v2/classifications.json?apikey={apikey} HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Rate-Limit-Over: 0
Content-Length: 1093
Rate-Limit-Available: 4714
Set-Cookie: CMPS=X+EBiEvRM0syS+stL/cX/gsj/b+Ekp+ax1Y1UXwHF4W4DqB22Y2rXsf00GJCnetC; path=/
Access-Control-Max-Age: 3628800
Access-Control-Allow-Methods: GET, PUT, POST, DELETE
Connection: keep-alive
Server: Apache-Coyote/1.1
Rate-Limit-Reset: 1457417554290
Access-Control-Allow-Headers: origin, x-requested-with, accept
Date: Mon, 07 Mar 2016 10:23:47 GMT
Access-Control-Allow-Origin: *
X-Application-Context: application:local,default,jphx1:8080
Content-Type: application/json;charset=utf-8
X-Unknown-Params: apikey
X-Unknown-Params: api-key
Rate-Limit: 5000

{  
   "_links":{  
      "self":{  
         "href":"/discovery/v2/classifications.json?view=null&size=2{&page,sort}",
         "templated":true
      },
      "next":{  
         "href":"/discovery/v2/classifications.json?view=null&page=1&size=2{&sort}",
         "templated":true
      }
   },
   "_embedded":{  
      "classifications":[  
         {  
            "_links":{  
               "self":{  
                  "href":"/discovery/v2/classifications/KZFzniwnSyZfZ7v7na?locale=en-us"
               }
            },
            "segment":{  
               "id":"KZFzniwnSyZfZ7v7na",
               "name":"Arts & Theatre",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/segments/KZFzniwnSyZfZ7v7na?locale=en-us"
                  }
               },
               "_embedded":{  
                  "genres":[
                    {  
                        "id":"KnvZfZ7v7lv",
                        "name":"Magic & Illusion",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/genres/KnvZfZ7v7lv?locale=en-us"
                           }
                        },
                        "_embedded":{  
                           "subgenres":[  
                              {  
                                 "id":"KZazBEonSMnZfZ7v7l7",
                                 "name":"Magic",
                                 "_links":{  
                                    "self":{  
                                       "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7v7l7?locale=en-us"
                                    }
                                 }
                              }
                           ]
                        }
                     }
                  ]
               }
            }
         },
         {  
            "_links":{  
               "self":{  
                  "href":"/discovery/v2/classifications/KZFzniwnSyZfZ7v7nn?locale=en-us"
               }
            },
            "segment":{  
               "id":"KZFzniwnSyZfZ7v7nn",
               "name":"Film",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/segments/KZFzniwnSyZfZ7v7nn?locale=en-us"
                  }
               },
               "_embedded":{  
                  "genres":[  
                     {  
                        "id":"KnvZfZ7vAka",
                        "name":"Miscellaneous",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/genres/KnvZfZ7vAka?locale=en-us"
                           }
                        },
                        "_embedded":{  
                           "subgenres":[  
                              {  
                                 "id":"KZazBEonSMnZfZ7vFll",
                                 "name":"Classic/Reissue",
                                 "_links":{  
                                    "self":{  
                                       "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFll?locale=en-us"
                                    }
                                 }
                              },
                              {  
                                 "id":"KZazBEonSMnZfZ7vFln",
                                 "name":"Miscellaneous",
                                 "_links":{  
                                    "self":{  
                                       "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFln?locale=en-us"
                                    }
                                 }
                              }
                           ]
                        }
                     },
                     {  
                        "id":"KnvZfZ7vAkF",
                        "name":"Family",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/genres/KnvZfZ7vAkF?locale=en-us"
                           }
                        },
                        "_embedded":{  
                           "subgenres":[  
                              {  
                                 "id":"KZazBEonSMnZfZ7vFlt",
                                 "name":"Miscellaneous",
                                 "_links":{  
                                    "self":{  
                                       "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFlt?locale=en-us"
                                    }
                                 }
                              }
                           ]
                        }
                     },
                     {  
                        "id":"KnvZfZ7vAk1",
                        "name":"Foreign",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/genres/KnvZfZ7vAk1?locale=en-us"
                           }
                        },
                        "_embedded":{  
                           "subgenres":[  
                              {  
                                 "id":"KZazBEonSMnZfZ7vavv",
                                 "name":"Foreign",
                                 "_links":{  
                                    "self":{  
                                       "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vavv?locale=en-us"
                                    }
                                 }
                              }
                           ]
                        }
                     },
                     {  
                        "id":"KnvZfZ7vAkd",
                        "name":"Animation",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/genres/KnvZfZ7vAkd?locale=en-us"
                           }
                        },
                        "_embedded":{  
                           "subgenres":[  
                              {  
                                 "id":"KZazBEonSMnZfZ7vFla",
                                 "name":"Animation",
                                 "_links":{  
                                    "self":{  
                                       "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFla?locale=en-us"
                                    }
                                 }
                              }
                           ]
                        }
                     },
                     {  
                        "id":"KnvZfZ7vAkE",
                        "name":"Urban",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/genres/KnvZfZ7vAkE?locale=en-us"
                           }
                        },
                        "_embedded":{  
                           "subgenres":[  
                              {  
                                 "id":"KZazBEonSMnZfZ7vavd",
                                 "name":"Urban",
                                 "_links":{  
                                    "self":{  
                                       "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vavd?locale=en-us"
                                    }
                                 }
                              }
                           ]
                        }
                     },
                     {  
                        "id":"KnvZfZ7vAke",
                        "name":"Action/Adventure",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/genres/KnvZfZ7vAke?locale=en-us"
                           }
                        },
                        "_embedded":{  
                           "subgenres":[  
                              {  
                                 "id":"KZazBEonSMnZfZ7vFlF",
                                 "name":"Action/Adventure",
                                 "_links":{  
                                    "self":{  
                                       "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFlF?locale=en-us"
                                    }
                                 }
                              }
                           ]
                        }
                     },
                     {  
                        "id":"KnvZfZ7vAkJ",
                        "name":"Music",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/genres/KnvZfZ7vAkJ?locale=en-us"
                           }
                        },
                        "_embedded":{  
                           "subgenres":[  
                              {  
                                 "id":"KZazBEonSMnZfZ7vave",
                                 "name":"Music",
                                 "_links":{  
                                    "self":{  
                                       "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vave?locale=en-us"
                                    }
                                 }
                              }
                           ]
                        }
                     },
                     {  
                        "id":"KnvZfZ7vAkA",
                        "name":"Comedy",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/genres/KnvZfZ7vAkA?locale=en-us"
                           }
                        },
                        "_embedded":{  
                           "subgenres":[  
                              {  
                                 "id":"KZazBEonSMnZfZ7vFlJ",
                                 "name":"Comedy",
                                 "_links":{  
                                    "self":{  
                                       "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFlJ?locale=en-us"
                                    }
                                 }
                              }
                           ]
                        }
                     },
                     {  
                        "id":"KnvZfZ7vAk7",
                        "name":"Arthouse",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/genres/KnvZfZ7vAk7?locale=en-us"
                           }
                        },
                        "_embedded":{  
                           "subgenres":[  
                              {  
                                 "id":"KZazBEonSMnZfZ7vFl1",
                                 "name":"Arthouse",
                                 "_links":{  
                                    "self":{  
                                       "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFl1?locale=en-us"
                                    }
                                 }
                              }
                           ]
                        }
                     },
                     {  
                        "id":"KnvZfZ7vAk6",
                        "name":"Drama",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/genres/KnvZfZ7vAk6?locale=en-us"
                           }
                        },
                        "_embedded":{  
                           "subgenres":[  
                              {  
                                 "id":"KZazBEonSMnZfZ7vFlI",
                                 "name":"Drama",
                                 "_links":{  
                                    "self":{  
                                       "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFlI?locale=en-us"
                                    }
                                 }
                              }
                           ]
                        }
                     },
                     {  
                        "id":"KnvZfZ7vAkk",
                        "name":"Documentary",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/genres/KnvZfZ7vAkk?locale=en-us"
                           }
                        },
                        "_embedded":{  
                           "subgenres":[  
                              {  
                                 "id":"KZazBEonSMnZfZ7vFlE",
                                 "name":"Documentary",
                                 "_links":{  
                                    "self":{  
                                       "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFlE?locale=en-us"
                                    }
                                 }
                              }
                           ]
                        }
                     }
                  ]
               }
            }
         }
      ]
   },
   "page":{  
      "size":2,
      "totalElements":6,
      "totalPages":3,
      "number":0
   }
}
{% endhighlight %}


{: .article .console-link #classifications-details-v2}
## Get Classification Details

**Method:** GET.
Authentication required.
Returns the classification detail by ID.

{: .code .red}
discovery/{version}/classifications/{id}.{format}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |     "v2"           | Yes      |
| `id`       | Category ID.         | string            |     "KZFzniwnSyZfZ7v7na"          | Yes      |
| `format`   | API Response Format. | string            |     "json"         | Yes      |


### Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |              | No      |

### Response structure:

{: .nested-list}
* `_links` (object) - links to classifications data sets.
    - `self` (object) - link to this data set.
        * `href` (string) - reference.
* `segment` (object) - segment.
    - `_embedded` (object) - container for genres.
        * `genres` (array) - genres.
            - `{array item object}` - genres.
                * `_links` (object) - links to genre.
                    - `self` (object) - link to this genre.
                        * `href` (string) - reference.
                * `_embedded` (object) - container for subgenres.
                    + `subgenres` (array) - subgenres.
                        - `{array item object}` - subgenre.
                            * `_links` (object) - links to subgenre.
                                - `self` (object) - link to this subgenre.
                                    * `href` (string) - reference.
                            * `id` (string) - genre id.
                            * `name` (string) - genre name.
                * `id` (string) - genre id.
                * `name` (string) - genre name.
    * `_links` (object) - links to segments.
        - `self` (object) - link to this segments.
            * `href` (string) - reference.
    - `id` (string) - segment id.
    - `name` (string) - segment name.

{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/classifications/KZFzniwnSyZfZ7v7nE.json?apikey={apikey}",
  async:true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});
{% endhighlight %}

{% highlight bash %}
curl \
--include 'https://app.ticketmaster.com/discovery/v2/classifications/KZFzniwnSyZfZ7v7nE.json?apikey={apikey}'
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /discovery/v2/classifications/KZFzniwnSyZfZ7v7nE?apikey={apikey} HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Rate-Limit-Over: 0
Content-Length: 146
Rate-Limit-Available: 4704
Set-Cookie: CMPS=knuzxOVcqdhMvUWKhD1HJcR5XXSZVELJc0IG2tQ2a6fPIMvDGc3jQaIZwf8n3jmw; path=/
Access-Control-Max-Age: 3628800
Access-Control-Allow-Methods: GET, PUT, POST, DELETE
Connection: keep-alive
Server: Apache-Coyote/1.1
Rate-Limit-Reset: 1457417554290
Access-Control-Allow-Headers: origin, x-requested-with, accept
Date: Mon, 07 Mar 2016 10:33:15 GMT
Access-Control-Allow-Origin: *
X-Application-Context: application:local,default,jphx1:8080
Content-Type: application/json;charset=utf-8
X-Unknown-Params: apikey
X-Unknown-Params: api-key
Rate-Limit: 5000

{  
   "_links":{  
      "self":{  
         "href":"/discovery/v2/classifications/KZFzniwnSyZfZ7v7nE?locale=en-us"
      }
   },
   "segment":{  
      "id":"KZFzniwnSyZfZ7v7nE",
      "name":"Sports",
      "_links":{  
         "self":{  
            "href":"/discovery/v2/classifications/segments/KZFzniwnSyZfZ7v7nE?locale=en-us"
         }
      },
      "_embedded":{  
         "genres":[  
            {  
               "id":"KnvZfZ7vA76",
               "name":"Netball",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vA76?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFtA",
                        "name":"Netball",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFtA?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vA7k",
               "name":"Motorsports/Racing",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vA7k?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFt7",
                        "name":"Motorsports/Racing",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFt7?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vA7a",
               "name":"Roller Hockey",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vA7a?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFtF",
                        "name":"Roller Hockey",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFtF?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAea",
               "name":"Rodeo",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAea?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFtk",
                        "name":"Bullriding",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFtk?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vF1d",
                        "name":"Rodeo",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vF1d?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vA71",
               "name":"Rugby",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vA71?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFta",
                        "name":"Rugby",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFta?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFt1",
                        "name":"Rugby League",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFt1?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFtJ",
                        "name":"Rugby Union",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFtJ?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vA7v",
               "name":"Ice Skating",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vA7v?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFIF",
                        "name":"Ice Skating",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFIF?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vA7d",
               "name":"Martial Arts",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vA7d?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFIJ",
                        "name":"Kickboxing",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFIJ?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFI1",
                        "name":"Karate",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFI1?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFIE",
                        "name":"Mixed Martial Arts",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFIE?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vA7e",
               "name":"Indoor Soccer",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vA7e?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFIa",
                        "name":"Indoor Soccer",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFIa?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vA7A",
               "name":"Miscellaneous",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vA7A?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFtv",
                        "name":"High School",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFtv?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFIl",
                        "name":"GAA",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFIl?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFIt",
                        "name":"Miscellaneous",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFIt?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFte",
                        "name":"College",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFte?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFtd",
                        "name":"Minor League",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFtd?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vA77",
               "name":"Lacrosse",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vA77?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFII",
                        "name":"Lacrosse",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFII?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAet",
               "name":"Athletic Races",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAet?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vF11",
                        "name":"Athletic Races",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vF11?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vA7l",
               "name":"Table Tennis",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vA7l?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFne",
                        "name":"Table Tennis",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFne?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAeI",
               "name":"Aquatics",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAeI?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vF1a",
                        "name":"Aquatics",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vF1a?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vA7n",
               "name":"Swimming",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vA7n?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFnv",
                        "name":"Swimming",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFnv?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAel",
               "name":"Bandy",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAel?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vF1E",
                        "name":"Bandy",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vF1E?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAen",
               "name":"Badminton",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAen?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vF1J",
                        "name":"Badminton",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vF1J?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vA7E",
               "name":"Soccer",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vA7E?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFtI",
                        "name":"MLS",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFtI?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFtt",
                        "name":"Soccer",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFtt?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vA7J",
               "name":"Ski Jumping",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vA7J?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFtE",
                        "name":"Ski Jumping",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFtE?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vA7t",
               "name":"Surfing",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vA7t?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFtl",
                        "name":"Surfing",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFtl?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vA7I",
               "name":"Squash",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vA7I?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFtn",
                        "name":"Squash",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFtn?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAdk",
               "name":"Cricket",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAdk?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFJE",
                        "name":"Cricket",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFJE?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAdA",
               "name":"Boxing",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAdA?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFJJ",
                        "name":"Boxing",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFJJ?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAdF",
               "name":"Curling",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAdF?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFJl",
                        "name":"Curling",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFJl?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAd6",
               "name":"Skiing",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAd6?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFJI",
                        "name":"Cross Country",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFJI?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFJt",
                        "name":"Nordic Combined",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFJt?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFJn",
                        "name":"Skiing",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFJn?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAd1",
               "name":"Equestrian",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAd1?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFEe",
                        "name":"Dressage",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFEe?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFEd",
                        "name":"Equestrian",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFEd?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFE7",
                        "name":"Horse Racing",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFE7?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAda",
               "name":"Cycling",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAda?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFEv",
                        "name":"Cycling",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFEv?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAAe",
               "name":"Toros",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAAe?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFn7",
                        "name":"Toros",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFn7?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAAv",
               "name":"Tennis",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAAv?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFnd",
                        "name":"Tennis",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFnd?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAde",
               "name":"Basketball",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAde?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFJ6",
                        "name":"Men Professional",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFJ6?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFJ7",
                        "name":"NBDL",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFJ7?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFJd",
                        "name":"Minor League",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFJd?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFJA",
                        "name":"NBA",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFJA?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFJF",
                        "name":"WNBA",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFJF?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFJv",
                        "name":"College",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFJv?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFJe",
                        "name":"High School",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFJe?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFJk",
                        "name":"NBL",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFJk?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFn1",
                        "name":"NBA D League",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFn1?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFnJ",
                        "name":"Women Professional",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFnJ?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAA7",
               "name":"Volleyball",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAA7?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFnk",
                        "name":"Minor League",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFnk?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFn6",
                        "name":"Volleyball",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFn6?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAdv",
               "name":"Baseball",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAdv?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vF1t",
                        "name":"Minor League",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vF1t?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vF1l",
                        "name":"Professional",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vF1l?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vF1I",
                        "name":"College",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vF1I?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vF1n",
                        "name":"MLB",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vF1n?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAAd",
               "name":"Track & Field",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAAd?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFnA",
                        "name":"Track & Field",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFnA?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAd7",
               "name":"Body Building",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAd7?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFJ1",
                        "name":"Body Building",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFJ1?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAAk",
               "name":"Wrestling",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAAk?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFna",
                        "name":"Wrestling",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFna?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAdd",
               "name":"Biathlon",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAdd?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFJa",
                        "name":"Biathlon",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFJa?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAAA",
               "name":"Waterpolo",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAAA?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFnF",
                        "name":"Waterpolo",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFnF?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAdn",
               "name":"Gymnastics",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAdn?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFIk",
                        "name":"Gymnastics",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFIk?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAdt",
               "name":"Golf",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAdt?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFI7",
                        "name":"PGA Tour",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFI7?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFId",
                        "name":"PGA B-Tour",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFId?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFIv",
                        "name":"Golf",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFIv?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFIe",
                        "name":"LPGA",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFIe?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFIA",
                        "name":"PGA Senior Tour",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFIA?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAdl",
               "name":"Handball",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAdl?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFI6",
                        "name":"Handball",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFI6?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAdJ",
               "name":"Extreme",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAdJ?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFEA",
                        "name":"Extreme",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFEA?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAdI",
               "name":"Hockey",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAdI?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFEl",
                        "name":"Ice Hockey",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFEl?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFEE",
                        "name":"NHL",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFEE?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFEI",
                        "name":"College",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFEI?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFEt",
                        "name":"Minor League",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFEt?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFEn",
                        "name":"Professional",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFEn?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            },
            {  
               "id":"KnvZfZ7vAdE",
               "name":"Football",
               "_links":{  
                  "self":{  
                     "href":"/discovery/v2/classifications/genres/KnvZfZ7vAdE?locale=en-us"
                  }
               },
               "_embedded":{  
                  "subgenres":[  
                     {  
                        "id":"KZazBEonSMnZfZ7vFEk",
                        "name":"AFL",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFEk?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFE1",
                        "name":"NFL",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFE1?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFEa",
                        "name":"High School",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFEa?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFE6",
                        "name":"College",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFE6?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFEJ",
                        "name":"Professional",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFEJ?locale=en-us"
                           }
                        }
                     },
                     {  
                        "id":"KZazBEonSMnZfZ7vFEF",
                        "name":"International Rules",
                        "_links":{  
                           "self":{  
                              "href":"/discovery/v2/classifications/subgenres/KZazBEonSMnZfZ7vFEF?locale=en-us"
                           }
                        }
                     }
                  ]
               }
            }
         ]
      }
   }
}
{% endhighlight %}


{: .article .console-link #search-venues-v2}
## Search Venues

**Method:** GET.
Authentication required.
Search Venues!

discovery/{version}/venues.{format}
{: .code .red}


### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |     "v2"           | Yes      |
| `format`   | API Response Format. | string            |     "json"         | Yes      |

### Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `keyword`  | A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.     | string            |                | No      |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |              | No      |
| `size`      | The number of events returned in the API response. | string            |       "10"       | No      |
| `page`      | The page for paginating through the results. | string            |       "1"       | No      |
| `sort`      | The search sort criteria. Values: "", "name,desc", "name,asc". | string            |              | No      |
| `stateCode` | The state code. | string | | No |
| `countryCode`| The country code. |string | | No |
| `includeTest`| Include test   |string, enum:["yes","no","only"]| | No |
| `source`    | Source   |string | | No |

### Response structure:

{: .nested-list}
- `_embedded` (object) - container for venues.
    * `venues` (array) - venues.
        - `{array item object}` - venue.
            * `_links` (object) - links to venues.
                - `self` (object) - link to this venue.
                    * `href` (string) - reference.
            * `address` (object) - address of venue.
                - `line1` (string) - address line 1.
                - `line2` (string) - address line 2.
            * `city` (object) - city of venue.
                - `name` (string) - name of city.
            * `country` (object) - country.
                - `name` (string) - name of country.
                - `countryCode` (string) - code of country.
            * `dmas` (array) - dmas venue.
                - `{array item object}` - dmas.
                    * `id` (number) - id.
            * `id` (string) - id of venue.
            * `locale` (string) - locale of venue.
            * `location` (object) - location.
                - `longitude` (string) - address line 1.
                - `latitude` (string) - address line 2.
            * `postalCode` (string) - postal code of venue.
            * `markets` (array) - markets.
                - `{array item object}` - market.
                    * `id` (string) - market id.
            * `name` (string) - name of venue.
            * `state` (object) - state of venue.
                - `name` (string) - name of state.
                - `stateCode` (string) - code of state.
            * `test` (boolean) - is test event.
            * `timeZone` (string) - time zone of venue.
            * `type` (string) - type of venue.
            * `url` (string) - url to venue.
- `_links` (object) - links to venues data set.
    * `self` (object) - link to this data set.
        - `href` (string) - reference.
        - `templated` (boolean) - is templated.
- `page` (object) - information about current page in data source.
    * `number` (number) - current page number counted from 0.
    * `size` (number) - page size.
    * `totalElements` (number) - total number of available elements in server.
    * `totalPages` (number) - total number of available pages in server.


{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/venues.json?keyword=UCV&apikey={apikey}",
  async:true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});
{% endhighlight %}

{% highlight bash %}
curl \
--include 'https://app.ticketmaster.com/discovery/v2/venues.json?keyword=UCV&apikey={apikey}'
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /discovery/v2/venues.json?apikey={apikey}&keyword=UCV HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: http://app.ticketmaster.com
Connection: Keep-Alive
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Rate-Limit-Over: 0
Content-Length: 1241
Rate-Limit-Available: 4646
Set-Cookie: CMPS=5Gk5wt8nfXBXXBiKtbkBiPSHgfZp9zC9Gv5MPAEcFsr5g6kwuwchDenPMUm/k7jxtKdE9AU0WRI=; path=/
Access-Control-Max-Age: 3628800
Access-Control-Allow-Methods: GET, PUT, POST, DELETE
Connection: keep-alive
Server: Apache-Coyote/1.1
Rate-Limit-Reset: 1457417554290
Access-Control-Allow-Headers: origin, x-requested-with, accept
Date: Mon, 07 Mar 2016 12:07:21 GMT
Access-Control-Allow-Origin: *
X-Application-Context: application:local,default,jash1:8080
Content-Type: application/json;charset=utf-8
X-Unknown-Params: apikey
X-Unknown-Params: api-key
Rate-Limit: 5000

{
  "_embedded": {
    "venues": [
      {
        "_links": {
          "self": {
            "href": "/discovery/v2/venues/KovZpZAFnIEA?locale=en-us"
          }
        },
        "address": {
          "line1": "Crysler Park Marina, 13480 County Rd 2"
        },
        "city": {
          "name": "Morrisburg"
        },
        "country": {
          "name": "Canada",
          "countryCode": "CA"
        },
        "dmas": [
          {
            "id": 519
          }
        ],
        "id": "KovZpZAFnIEA",
        "locale": "en-us",
        "location": {
          "longitude": "-75.18702730",
          "latitude": "44.94535340"
        },
        "markets": [
          {
            "id": "103"
          }
        ],
        "name": "#1 Please do not use, left over from UCV initial acct set up",
        "postalCode": "K0C1X0",
        "state": {
          "name": "Ontario",
          "stateCode": "ON"
        },
        "test": false,
        "timezone": "America/Toronto",
        "type": "venue",
        "url": "http://ticketmaster.ca/venue/341396"
      },
      {
        "name": "#2 Please do not use, left over from UCV initial acct set up",
        "type": "venue",
        "id": "KovZpZAFnIJA",
        "test": false,
        "url": "http://ticketmaster.ca/venue/341395",
        "locale": "en-us",
        "postalCode": "K0C1X0",
        "timezone": "America/Toronto",
        "city": {
          "name": "Morrisburg"
        },
        "state": {
          "name": "Ontario",
          "stateCode": "ON"
        },
        "country": {
          "name": "Canada",
          "countryCode": "CA"
        },
        "address": {
          "line1": "13740 County Road 2"
        },
        "location": {
          "longitude": "-75.18635300",
          "latitude": "44.89937100"
        },
        "markets": [
          {
            "id": "103"
          }
        ],
        "dmas": [
          {
            "id": 519
          }
        ],
        "_links": {
          "self": {
            "href": "/discovery/v2/venues/KovZpZAFnIJA?locale=en-us"
          }
        }
      }
    ]
  },
  "_links": {
    "self": {
      "href": "/discovery/v2/venues.json?view=null&keyword=UCV{&page,size,sort}",
      "templated": true
    }
  },
  "page": {
    "size": 20,
    "totalElements": 2,
    "totalPages": 1,
    "number": 0
  }
}
{% endhighlight %}


{: .article .console-link #venue-details-v2}
## Get Venue Details

**Method:** GET.
Authentication required.
Returns the venue detail by ID.

discovery/{version}/venues/{id}.{format}
{: .code .red}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |     "v2"           | Yes      |
| `id`       | Venue ID.            | string            |     "KovZpZAFnIEA"          | Yes      |
| `format`   | API Response Format. | string            |     "json"         | Yes      |

### Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |              | No      |

### Response structure:

{: .nested-list}
* `_links` (object) - links to venues.
    - `self` (object) - link to this venue.
        * `href` (string) - reference.
* `address` (object) - address of venue.
    - `line1` (string) - address line 1.
    - `line2` (string) - address line 2.
* `city` (object) - city of venue.
    - `name` (string) - name of city.
* `country` (object) - country.
    - `name` (string) - name of country.
    - `countryCode` (string) - code of country.
* `dmas` (array) - dmas venue.
    - `{array item object}` - dmas.
        * `id` (number) - id.
* `id` (string) - id of venue.
* `locale` (string) - locale of venue.
* `location` (object) - location.
    - `longitude` (string) - address line 1.
    - `latitude` (string) - address line 2.
* `markets` (array) - markets.
    - `{array item object}` - market.
        * `id` (string) - market id.
* `name` (string) - name of venue.
* `postalCode` (string) - postal code of venue.
* `state` (object) - state of venue.
    - `name` (string) - name of state.
    - `stateCode` (string) - code of state.
* `test` (boolean) - is test event.
* `timeZone` (string) - time zone of venue.
* `type` (string) - type of venue.
* `url` (string) - url to venue.


{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/venues/KovZpZAFnIEA.json?apikey={apikey}",
  async:true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});
{% endhighlight %}

{% highlight bash %}
curl \
--include 'https://app.ticketmaster.com/discovery/v2/venues/KovZpZAFnIEA.json?apikey={apikey}'
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

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

## Supported Country Codes
{: .article #supported-country-codes}
This the [ISO Alpha-2 Code](https://en.wikipedia.org/wiki/ISO_3166-1) country values:

| Country Code	                |
|:------------------------------|
| AD (Andorra)                  |
| AI (Anguilla)                 |
| AR (Argentina)                |
| AU (Australia)                |
| AT (Austria)                  |
| AZ (Azerbaijan)               |
| BS (Bahamas)                  |
| BH (Bahrain)                  |
| BB (Barbados)                 |
| BE (Belgium)                  |
| BM (Bermuda)                  |
| BR (Brazil)                   |
| BG (Bulgaria)                 |
| CA (Canada)                   |
| CL (Chile)                    |
| CN (China)                    |
| CO (Colombia)                 |
| CR (Costa Rica)               |
| HR (Croatia)                  |
| CY (Cyprus)                   |
| CZ (Czech Republic)           |
| DK (Denmark)                  |
| DO (Dominican Republic)       |
| EC (Ecuador)                  |
| EE (Estonia)                  |
| FO (Faroe Islands)            |
| FI (Finland)                  |
| FR (France)                   |
| GE (Georgia)                  |
| DE (Germany)                  |
| GH (Ghana)                    |
| GI (Gibraltar)                |
| GB (Great Britain)            |
| GR (Greece)                   |
| HK (Hong Kong)                |
| HU (Hungary)                  |
| IS (Iceland)                  |
| IN (India)                    |
| IE (Ireland)                  |
| IL (Israel)                   |
| IT (Italy)                    |
| JM (Jamaica)                  |
| JP (Japan)                    |
| KR (Korea, Republic of)       |
| LV (Latvia)                   |
| LB (Lebanon)                  |
| LT (Lithuania)                |
| LU (Luxembourg)               |
| MY (Malaysia)                 |
| MT (Malta)                    |
| MX (Mexico)                   |
| MC (Monaco)                   |
| ME (Montenegro)               |
| MA (Morocco)                  |
| NL (Netherlands)              |
| AN (Netherlands Antilles)     |
| NZ (New Zealand)              |
| ND (Northern Ireland)         |
| NO (Norway)                   |
| PE (Peru)                     |
| PL (Poland)                   |
| PT (Portugal)                 |
| RO (Romania)                  |
| RU (Russian Federation)       |
| LC (Saint Lucia)              |
| SA (Saudi Arabia)             |
| RS (Serbia)                   |
| SG (Singapore)                |
| SK (Slovakia)                 |
| SI (Slovenia)                 |
| ZA (South Africa)             |
| ES (Spain)                    |
| SE (Sweden)                   |
| CH (Switzerland)              |
| TW (Taiwan)                   |
| TH (Thailand)                 |
| TT (Trinidad and Tobago)      |
| TR (Turkey)                   |
| UA (Ukraine)                  |
| AE (United Arab Emirates)     |
| US (United States Of America) |
| UY (Uruguay)                  |
| VE (Venezuela)                |

## Supported Markets
{: .article #supported-markets}

Markets can be used to filter events by larger regional demographic groupings. Each market is typically comprised of several DMAs.

#### USA

| ID          | Market                                       |
| :---------- | :--------------------------------------------|
| 1           | Birmingham & More                            |
| 2           | Charlotte                                    |
| 3           | Chicagoland & Northern IL                    |
| 4           | Cincinnati & Dayton                          |
| 5           | Dallas - Fort Worth & More                   |
| 6           | Denver & More                                |
| 7           | Detroit, Toledo & More                       |
| 8           | El Paso & New Mexico                         |
| 9           | Grand Rapids & More                          |
| 10          | Greater Atlanta Area                         |
| 11          | Greater Boston Area                          |
| 12          | Cleveland, Youngstown & More                 |
| 13          | Greater Columbus Area                        |
| 14          | Greater Las Vegas Area                       |
| 15          | Greater Miami Area                           |
| 16          | Minneapolis/St. Paul & More                  |
| 17          | Greater Orlando Area                         |
| 18          | Greater Philadelphia Area                    |
| 19          | Greater Pittsburgh Area                      |
| 20          | Greater San Diego Area                       |
| 21          | Greater Tampa Area                           |
| 22          | Houston & More                               |
| 23          | Indianapolis & More                          |
| 24          | Iowa                                         |
| 25          | Jacksonville & More                          |
| 26          | Kansas City & More                           |
| 27          | Greater Los Angeles Area                     |
| 28          | Louisville & Lexington                       |
| 29          | Memphis, Little Rock & More                  |
| 30          | Milwaukee & WI                               |
| 31          | Nashville, Knoxville & More                  |
| 33          | New England                                  |
| 34          | New Orleans & More                           |
| 35          | New York/Tri-State Area                      |
| 36          | Phoenix & Tucson                             |
| 37          | Portland & More                              |
| 38          | Raleigh & Durham                             |
| 39          | Saint Louis & More                           |
| 40          | San Antonio & Austin                         |
| 41          | N. California/N. Nevada                      |
| 42          | Greater Seattle Area                         |
| 43          | North & South Dakota                         |
| 44          | Upstate New York                             |
| 45          | Utah & Montana                               |
| 46          | Virginia                                     |
| 47          | Washington, DC and Maryland                  |
| 48          | West Virginia                                |
| 49          | Hawaii                                       |
| 50          | Alaska                                       |
| 52          | Nebraska                                     |
| 53          | Springfield                                  |
| 54          | Central Illinois                             |
| 55          | Northern New Jersey                          |
| 121         | South Carolina                               |
| 122         | South Texas                                  |
| 123         | Beaumont                                     |
| 124         | Connecticut                                  |
| 125         | Oklahoma                                     |


#### Canada

| ID          | Market                                       |
| :---------- | :--------------------------------------------|
| 102         | Toronto, Hamilton & Area                     |
| 103         | Ottawa & Eastern Ontario                     |
| 106         | Manitoba                                     |
| 107         | Edmonton & Northern Alberta                  |
| 108         | Calgary & Southern Alberta                   |
| 110         | B.C. Interior                                |
| 111         | Vancouver & Area                             |
| 112         | Saskatchewan                                 |
| 120         | Montréal & Area                           	 |


#### Europe

| ID          | Market                                       |
| :---------- | :--------------------------------------------|
| 202         | London (UK)                                  |
| 203         | South (UK)                                   |
| 204         | Midlands and Central (UK)                    |
| 205         | Wales and North West (UK)                    |
| 206         | North and North East (UK)                    |
| 207         | Scotland                                     |
| 208         | Ireland                                      |
| 209         | Northern Ireland                             |
| 210         | Germany                                      |
| 211         | Netherlands                                  |
| 500         | Sweden                                       |
| 501         | Spain 					                     |
| 502         | Barcelona (Spain)                            |
| 503         | Madrid (Spain)                               |
| 600         | Turkey                                       |

#### Australia and New Zealand

| ID          | Market                                       |
| :---------- | :--------------------------------------------|
| 302         | New South Wales/Australian Capital Territory |
| 303         | Queensland                                   |
| 304         | Western Australi                             |
| 305         | Victoria/Tasmania                            |
| 306         | Western Australia                            |
| 351         | North Island                                 |
| 352         | South Island                                 |

#### Mexico

| ID          | Market                                       |
| :---------- | :--------------------------------------------|
| 402         | Mexico City and Metropolitan Area            |
| 403         | Monterrey                                    |
| 404         | Guadalajara                                  |

## Supported Sources
{: .article #supported-sources}

| Source	|
|:----------|
| ticketmaster	|
| tmr (ticketmaster resale platform) |
| universe	|
| frontgate |


## Supported Locales
{: .article #supported-locales}

We support all languages, without any fallback.

{% comment %}
| Locale	|
|:----------|
| en-us		|
| en-au		|
| en-gb		|
| en-nz		|
| en-mx		|
| en-ca		|
| es-us		|
| es-mx		|
| fr-fr		|
| fr-ca		|
{% endcomment %}

## Supported Designated Market Area (DMA)
{: #supported-dma}

Designated Market Area (DMA) can be used to segment and target events to a specific audience. Each DMA groups several zipcodes into a specific market segmentation based on population demographics.

|DMA ID| DMA name                                 |
|:---- |:-----------------------------------------|
|200 | All of US                |
|212 | Abilene - Sweetwater         |
|213 | Albany - Schenectady - Troy        |
|214 | Albany, GA       |
|215 | Albuquerque - Santa Fe       |
|216 | Alexandria, LA       |
|217 | Alpena       |
|218 | Amarillo       |
|219 | Anchorage        |
|220 | Atlanta        |
|221 | Augusta        |
|222 | Austin       |
|223 | Bakersfield        |
|224 | Baltimore        |
|225 | Bangor       |
|226 | Baton Rouge        |
|227 | Beaumont - Port Arthur       |
|228 | Bend, OR       |
|229 | Billings       |
|230 | Biloxi - Gulfport        |
|231 | Binghamton       |
|232 | Birmingham (Anniston and Tuscaloosa)       |
|233 | Bluefield - Beckley - Oak Hill         |
|234 | Boise        |
|235 | Boston (Manchester)        |
|236 | Bowling Green        |
|237 | Buffalo        |
|238 | Burlington - Plattsburgh       |
|239 | Butte - Bozeman        |
|240 | Casper - Riverton        |
|241 | Cedar Rapids - Waterloo & Dubuque        |
|242 | Champaign & Springfield - Decatur        |
|243 | Charleston, SC                           |
|244 | Charleston-Huntington                    |
|245 | Charlotte                                |
|246 | Charlottesville                          |
|247 | Chattanooga                              |
|248 | Cheyenne - Scottsbluff                   |
|249 | Chicago                          |
|250 | Chico - Redding                  |
|251 | Cincinnati                       |
|252 | Clarksburg - Weston              |
|253 | Cleveland                        |
|254 | Colorado Springs - Pueblo        |
|255 | Columbia - Jefferson City        |
|256 | Columbia, SC                     |
|257 | Columbus - Tupelo - West Point   |
|258 | Columbus, GA                     |
|259 | Columbus, OH                     |
|260 | Corpus Christi                   |
|261 | Dallas - Fort Worth              |
|262 | Davenport - Rock Island - Moline              |
|263 | Dayton              |
|264 | Denver              |
|265 | Des Moines - Ames              |
|266 | Detroit              |
|267 | Dothan              |
|268 | Duluth - Superior              |
|269 | El Paso              |
|270 | Elmira              |
|271 | Erie              |
|272 | Eugene              |
|273 | Eureka              |
|274 | Evansville              |
|275 | Fairbanks              |
|276 | Fargo - Valley City              |
|277 | Flint - Saginaw - Bay City              |
|278 | Florence - Myrtle Beach              |
|279 | Fort Myers - Naples              |
|280 | Fort Smith - Fayetteville - Springdale - Rogers              |
|281 | Fort Wayne              |
|282 | Fresno - Visalia              |
|283 | Gainesville              |
|284 | Glendive              |
|285 | Grand Junction - Montrose              |
|286 | Grand Rapids - Kalamazoo - Battle Creek              |
|287 | Great Falls              |
|288 | Green Bay - Appleton              |
|289 | Greensboro - High Point - Winston-Salem              |
|290 | Greenville - New Bern - Washington              |
|291 | Greenville - Spartansburg - Asheville - Anderson              |
|292 | Greenwood - Greenville              |
|293 | Harlingen - Weslaco - Brownsville - McAllen              |
|294 | Harrisburg - Lancaster - Lebanon - York              |
|295 | Harrisonburg              |
|296 | Hartford & New Haven              |
|297 | Hattiesburg - Laurel              |
|298 | Helena              |
|299 | Honolulu              |
|300 | Houston              |
|301 | Huntsville - Decatur (Florence)              |
|302 | Idaho Falls - Pocatello              |
|303 | Indianapolis              |
|304 | Jackson, MS              |
|305 | Jackson, TN              |
|306 | Jacksonville              |
|307 | Johnstown - Altoona              |
|308 | Jonesboro              |
|309 | Joplin - Pittsburg              |
|310 | Juneau              |
|311 | Kansas City              |
|312 | Knoxville              |
|313 | La Crosse - Eau Claire              |
|314 | Lafayette, IN              |
|315 | Lafayette, LA              |
|316 | Lake Charles              |
|317 | Lansing              |
|318 | Laredo              |
|319 | Las Vegas              |
|320 | Lexington              |
|321 | Lima              |
|322 | Lincoln & Hastings - Kearney              |
|323 | Little Rock - Pine Bluff              |
|324 | Los Angeles              |
|325 | Louisville              |
|326 | Lubbock              |
|327 | Macon              |
|328 | Madison              |
|329 | Mankato              |
|330 | Marquette              |
|331 | Medford - Klamath Falls              |
|332 | Memphis              |
|333 | Meridian              |
|334 | Miami - Fort Lauderdale              |
|335 | Milwaukee              |
|336 | Minneapolis - Saint Paul              |
|337 | Minot - Bismarck - Dickinson              |
|338 | Missoula              |
|339 | Mobile - Pensacola (Fort Walton Beach)              |
|340 | Monroe - El Dorado              |
|341 | Monterey - Salinas              |
|342 | Montgomery (Selma)              |
|343 | Nashville              |
|344 | New Orleans              |
|345 | New York              |
|346 | Norfolk - Portsmouth - Newport News              |
|347 | North Platte              |
|348 | Odessa - Midland              |
|349 | Oklahoma City              |
|350 | Omaha              |
|351 | Orlando - Daytona Beach - Melbourne              |
|352 | Ottumwa - Kirksville              |
|353 | Paducah - Cape Girardeau - Harrisburg - Mt Vernon              |
|354 | Palm Springs              |
|355 | Panama City              |
|356 | Parkersburg              |
|357 | Peoria - Bloomington              |
|358 | Philadelphia              |
|359 | Phoenix              |
|360 | Pittsburgh              |
|361 | Portland - Auburn              |
|362 | Portland, OR              |
|363 | Presque Isle              |
|364 | Providence - New Bedford              |
|365 | Quincy - Hannibal - Keokuk              |
|366 | Raleigh - Durham (Fayetteville)              |
|367 | Rapid City              |
|368 | Reno              |
|369 | Richmond - Petersburg              |
|370 | Roanoke - Lynchburg              |
|371 | Rochester - Mason City - Austin              |
|372 | Rochester, NY              |
|373 | Rockford              |
|374 | Sacramento - Stockton - Modesto              |
|375 | Saint Joseph              |
|376 | Saint Louis              |
|377 | Salisbury              |
|378 | Salt Lake City              |
|379 | San Angelo              |
|380 | San Antonio              |
|381 | San Diego              |
|382 | San Francisco - Oakland - San Jose              |
|383 | Santa Barbara - Santa Maria - San Luis Obispo              |
|384 | Savannah              |
|385 | Seattle - Tacoma              |
|386 | Sherman - Ada              |
|387 | Shreveport              |
|388 | Sioux City              |
|389 | Sioux Falls (Mitchell)              |
|390 | South Bend - Elkhart              |
|391 | Spokane              |
|392 | Springfield - Holyoke              |
|393 | Springfield, MO              |
|394 | Syracuse              |
|395 | Tallahassee - Thomasville              |
|396 | Tampa - Saint Petersburg (Sarasota)              |
|397 | Terre Haute              |
|398 | Toledo              |
|399 | Topeka              |
|400 | Traverse City - Cadillac              |
|401 | Tri-Cities, TN-VA              |
|402 | Tucson (Sierra Vista)              |
|403 | Tulsa              |
|404 | Twin Falls              |
|405 | Tyler - Longview (Lufkin & Nacogdoches)              |
|406 | Utica              |
|407 | Victoria              |
|408 | Waco - Temple - Bryan              |
|409 | Washington DC (Hagerstown)              |
|410 | Watertown              |
|411 | Wausau - Rhinelander              |
|412 | West Palm Beach - Fort Pierce              |
|413 | Wheeling - Steubenville              |
|414 | Wichita - Hutchinson              |
|415 | Wichita Falls & Lawton              |
|416 | Wilkes Barre - Scranton              |
|417 | Wilmington              |
|418 | Yakima - Pasco - Richland - Kennewick              |
|419 | Youngstown              |
|420 | Yuma - El Centro              |
|421 | Zanesville              |
|422 | Northern New Jersey              |
|500 | All of Canada              |
|501 | Barrie-Orillia              |
|502 | Belleville-Peterborough              |
|503 | Owen Sound              |
|504 | Burnaby-New Westminster-Surrey              |
|505 | Calgary-Banff              |
|506 | Edmonton              |
|507 | Fraser Valley              |
|508 | Hamilton-Niagara              |
|509 | Kitchener-Waterloo              |
|510 | London-Sarnia              |
|511 | Mississauga-Oakville              |
|512 | Newfoundland              |
|513 | NWT              |
|514 | New Brunswick              |
|515 | Northern Ontario              |
|516 | Nova Scotia              |
|517 | Nunavit              |
|518 | Okanagan-Kootenays              |
|519 | Ottawa-Gatineau              |
|520 | PEI              |
|521 | Prince George-North              |
|522 | Montreal and Surrounding Area              |
|523 | Red Deer              |
|524 | Saskatchewan              |
|527 | Toronto              |
|528 | Vancouver              |
|529 | Sunshine Coast-Islands              |
|530 | Winnipeg-Brandon              |
|531 | Yukon              |
|601 | All of United Kingdom              |
|602 | London              |
|603 | South              |
|604 | Midlands and Central              |
|605 | Wales and North West              |
|606 | North and North East              |
|607 | Scotland              |
|608 | All of Ireland              |
|609 | Northern Ireland              |
|610 | Germany              |
|611 | Netherlands              |
|612 | Sweden              |
|613 | Turkey              |
|701 | All of Australia              |
|702 | New South Wales/Australian Capital Territory              |
|703 | Queensland              |
|704 | Western Australia              |
|705 | Victoria/Tasmania              |
|750 | All of New Zealand              |
|751 | North Island              |
|752 | South Island              |
|801 | All of Mexico              |
|802 | Mexico City and Metropolitan Area              |
|803 | Monterrey              |
|804 | Guadalajara              |
|901 | All of Spain              |
|902 | Barcelona              |
|903 | Madrid              |



{% comment %}

{: .article }
{%include release-notes.html%}

{% endcomment %}
