---
layout: documentation
categories:
- documentation
- discovery
- v2
title: Discovery API 2.0
excerpt: Use the Discovery API to search, look up and find events, attractions and venues.
keywords: API, search events, attraction details, event images, category details, venue details, support
redirect_from: 
- "/products-and-docs/apis/discovery/"
---

# Discovery API

{: .version-button .active}
[V 2.0]({{"/products-and-docs/apis/discovery/v2/" | prepend: site.baseurl}})

{: .version-button }
[V 1.0]({{"/products-and-docs/apis/discovery/v1/" | prepend: site.baseurl}})

Use the Discovery API to search, look up and find events, attractions, venues and classifications. The API provides access to all Ticketmaster events, as well as Universe and TicketWeb events.
{: .lead .article}

#### Developer Console
{: .aside .gray}

Make live API calls right now in the interactive docs:

[INTERACTIVE DOCS](/products-and-docs/apis/interactive-console/){: .button}

## Overview
{: .article #overview }

### Authentication

To run a successful API call, you will need to pass your API Key as the query parameter  __apikey__.

Example: `https://app.ticketmaster.com/discovery/v2/events.json?{apikey}`

### Root URL

`https://app.ticketmaster.com/discovery/{API version}`


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
| `keyword`  | A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.     | string            |                | No      |
| `attractionId`   | Attraction ID(s) separated by comma. | string            |       "K8vZ91713eV"       | No      |
| `venueId`   | Venue ID(s) separated by comma. | string            |       "KovZpZAEdFtJ"       | No      |
| `promoterId`   | Promoter ID(s) separated by comma. | string            |       "494"       | No      |
| `postalCode`   | Zipcode or Postal Code of the venue in which the event is taking place. | string            |       "90069"       | No      |
| `latlong`   | The Latitude, Longitude coordinates for the venue in which this event is taking place. | string            |       "34.0928090,-118.3286610"       | No      |
| `radius`   | The radius of the area in which we want to search for events. | string            |       "25"       | No      |
| `unit`   | The radius distance unit. Possible values: miles, km. | string            |       "miles"       | No      |
| `source`   | Source of the event. Possible values are '', 'ticketmaster', 'ticketweb', 'universe'. | string            |       "ticketmaster"       | No      |
| `locale`   | The event locale, including country and localization. Values: “”, “en-us”, “en-gb”, “en-ca”, “es-us”, “en-mx”, “es-mx”, “en-au”, “en-nz”, “fr-fr”, “fr-ca”. | string            |              | No      |
| `marketId`   | The city/area in which this event takes place. | string            |       "27"       | No      |
| `startDateTime`   | Include events happening after this date. | string            |       "2017-01-01T00:00:00Z"       | No      |
| `endDateTime`   | Include events happening before this date. | string            |       "2017-01-01T00:00:00Z"       | No      |
| `includeTBA`   | 	Whether or not to return events with dates to be announced (TBA). Default is 'no', TBA events are not returned. | string            |       "yes|no|only"       | No      |
| `includeTBD`   | Whether or not to return events with dates to be determined (TBD). Default is 'no', TBD events are not returned. | string            |       "yes|no|only"       | No      |
| `includeTest`   | Whether or not to return test events. Default is 'no', test events are not returned. | string            |       "yes|no|only"       | No      |
| `size`   | The number of events returned in the API response. | string            |       "10"       | No      |
| `page`   | The page for paginating through the results. | string            |       "1"       | No      |
| `sort`   | The search sort criteria. Values: "", "eventDate,desc", "eventDate,asc", "name,desc", "name,asc". | string            |              | No      |
| `onsaleStartDateTime`   | Include events going onsale after this date. | string            |       "2017-01-01T00:00:00Z"       | No      |
| `onsaleEndDateTime`   | Include events going onsale before this date. | string            |       "2017-01-01T00:00:00Z"       | No      |


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
            * `promoterId` (array) - promoter ids of event.
                - `{array item numbers}` - promoter id.
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
                - `start` (object) - start of event.
                    * `dateTime` (string) - date and time start of event.
                    * `localDate` (string) - local date start of event.
                    * `localTime` (string) - local time start of event.
                    * `dateTBD` (boolean) - is date TBD.
                    * `dateTBA` (boolean) - is date TBA.
                    * `timeTBA` (boolean) - is time TBA.
                    * `noSpecificTime` (boolean) - is no specific time.
                - `timezone` (string) - time zone of event.
                - `displayOptions` (object) - display options of event.
                    * `range` (object) - range of event displayed.
                        - `localStartDate` (string) - local start date of event displayed.
                        - `localEndDate` (string) - local end date of event displayed.
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
  url:"https://app.ticketmaster.com/discovery/v2/events.json?size=1&{apikey}",
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
--include 'https://app.ticketmaster.com/discovery/v2/events.json?size=1&{apikey}'
{% endhighlight %}

    
{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight http %}
GET /discovery/v2/events.json?{apikey}&size=1 HTTP/1.1
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
* `name` (string) - name of event.
* `type` (string) - type of event.
* `id` (string) - id of event.
* `test` (boolean) - is test.
* `locale` (string) - locale of event.
* `url` (string) - links to event detail page.
* `promoterId` (array) - promoter ids of event.
    - `{array item numbers}` - promoter id.
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
    - `start` (object) - start of event.
        * `dateTime` (string) - date and time start of event.
        * `localDate` (string) - local date start of event.
        * `localTime` (string) - local time start of event.
        * `dateTBD` (boolean) - is date TBD.
        * `dateTBA` (boolean) - is date TBA.
        * `timeTBA` (boolean) - is time TBA.
        * `noSpecificTime` (boolean) - is no specific time.
    - `timezone` (string) - time zone of event.
    - `displayOptions` (object) - display options of event.
        * `range` (object) - range of event displayed.
            - `localStartDate` (string) - local start date of event displayed.
            - `localEndDate` (string) - local end date of event displayed.
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
                - `countryCode` (string) - country code of venue.
            * `state` (object) - state of venue.
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

{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/events/k7vGFKzleBdwS.json?{apikey}",
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
--include 'https://app.ticketmaster.com/discovery/v2/events/k7vGFKzleBdwS.json?{apikey}'
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight http %}
GET /discovery/v2/events/k7vGFKzleBdwS.json?{apikey} HTTP/1.1
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
  "name": "RNDM",
  "type": "event",
  "id": "k7vGFKzleBdwS",
  "test": false,
  "url": "http://ticketmaster.com/event/0E0050681F51BA4C",
  "locale": "en-us",
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
  "sales":  {
    "public":  {
      "startDateTime": "2015-12-18T15:00:00Z",
      "startTBD": false,
      "endDateTime": "2016-03-08T00:30:00Z"
    }
  },
  "dates":  {
    "start":  {
      "localDate": "2016-03-07",
      "localTime": "19:30:00",
      "dateTime": "2016-03-08T00:30:00Z",
      "dateTBD": false,
      "dateTBA": false,
      "timeTBA": false,
      "noSpecificTime": false
    },
    "timezone": "America/New_York",
    "status":  {
      "code": "onsale"
    }
  },
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
        "id": "KZazBEonSMnZfZ7v6dt",
        "name": "Alternative Rock"
      }
    }
  ],
  "promoter":  {
    "id": "653"
  },
  "_links":  {
    "self":  {
      "href": "/discovery/v2/events/k7vGFKzleBdwS?locale=en-us"
    },
    "attractions":  [
       {
        "href": "/discovery/v2/attractions/K8vZ917885V?locale=en-us"
      },
       {
        "href": "/discovery/v2/attractions/K8vZ917foI0?locale=en-us"
      }
    ],
    "venues":  [
       {
        "href": "/discovery/v2/venues/KovZpZAEAdaA?locale=en-us"
      }
    ]
  },
  "_embedded":  {
    "venues":  [
       {
        "name": "Gramercy Theatre",
        "type": "venue",
        "id": "KovZpZAEAdaA",
        "test": false,
        "locale": "en-us",
        "postalCode": "10010",
        "timezone": "America/New_York",
        "city":  {
          "name": "New York"
        },
        "state":  {
          "name": "New York",
          "stateCode": "NY"
        },
        "country":  {
          "name": "United States Of America",
          "countryCode": "US"
        },
        "address":  {
          "line1": "127 East 23rd Street"
        },
        "location":  {
          "longitude": "-73.98501292",
          "latitude": "40.73975368"
        },
        "markets":  [
           {
            "id": "35"
          },
           {
            "id": "55"
          },
           {
            "id": "124"
          }
        ],
        "_links":  {
          "self":  {
            "href": "/discovery/v2/venues/KovZpZAEAdaA?locale=en-us"
          }
        }
      }
    ],
    "attractions":  [
       {
        "name": "RNDM",
        "type": "attraction",
        "id": "K8vZ917885V",
        "test": false,
        "locale": "en-us",
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
              "id": "KZazBEonSMnZfZ7v6dt",
              "name": "Alternative Rock"
            }
          }
        ],
        "_links":  {
          "self":  {
            "href": "/discovery/v2/attractions/K8vZ917885V?locale=en-us"
          }
        }
      },
       {
        "name": "Parker Gispert",
        "type": "attraction",
        "id": "K8vZ917foI0",
        "test": false,
        "locale": "en-us",
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
              "id": "KZazBEonSMnZfZ7v6da",
              "name": "Rock"
            }
          }
        ],
        "_links":  {
          "self":  {
            "href": "/discovery/v2/attractions/K8vZ917foI0?locale=en-us"
          }
        }
      }
    ]
  }
}
{% endhighlight %}



## Search Event Images
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
| `id`       | Event ID.            | string            | "1A4ZAZyGkeUYKaO"  | Yes      |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |   "en-us"   | No      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |

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
  url:"https://app.ticketmaster.com/discovery/v2/events/k7vGFKzleBdwS/images.json?{apikey}",
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
--include 'https://app.ticketmaster.com/discovery/v2/events/k7vGFKzleBdwS/images.json?{apikey}'
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight http %}
GET /discovery/v2/events/0B004F0401BD55E5/images.json?{apikey} HTTP/1.1
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
Authentication required..
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
| `domain`   | The entity interested in this event (special use case). | string           |      "ticketmaster.com"     | No      |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |              | No      |
| `size`   | The number of events returned in the API response. | string            |       "20"       | No      |
| `page`   | The page for paginating through the results. | string            |       "1"       | No      |
| `sort`   | The search sort criteria. Values: "name,desc", "name,asc". | string            |              | No      |

### Response structure:

{: .nested-list}
- `_embedded` (object) - container attractions.
    * `attractions` (array) - attractions.
        - `{array item object}` - attraction.
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
  url:"https://app.ticketmaster.com/discovery/v2/attractions.json?{apikey}",
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
--include 'https://app.ticketmaster.com/discovery/v2/attractions.json?{apikey}'
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight http %}
GET /discovery/v2/attractions.json?size=1&{apikey} HTTP/1.1
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

### Response structure:

{: .nested-list}
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

{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/attractions/K8vZ9175BhV.json?{apikey}",
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
--include 'https://app.ticketmaster.com/discovery/v2/attractions/K8vZ9175BhV.json?{apikey}'
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /discovery/v2/attractions/K8vZ9175BhV.json?{apikey} HTTP/1.1
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
| `size`   | The number of events returned in the API response. | string            |       "20"       | No      |
| `page`   | The page for paginating through the results. | string            |       "1"       | No      |
| `sort`   | The search sort criteria. Values: "", "name,desc", "name,asc". | string            |              | No      |

### Response structure:

{: .nested-list}
- `_embedded` (object) - container for classifications.
    * `classifications` (array) - classifications.
        - `{array item object}` - classification.
            * `segment` (object) - segment.
                - `id` (string) - segment id.
                - `name` (string) - segment name.
            * `_links` (object) - links to categories data sets.
                - `self` (object) - link to this data set.
                    * `href` (string) - reference.
- `_links` (object) - links to categories data sets.
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
  url:"https://app.ticketmaster.com/discovery/v2/classifications.json?{apikey}",
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
--include 'https://app.ticketmaster.com/discovery/v2/classifications.json?{apikey}'
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /discovery/v2/classifications.json?{apikey} HTTP/1.1
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
  "_links":  {
    "self":  {
      "href": "/discovery/v2/classifications.json{?page,size,sort}",
      "templated": true
    }
  },
  "_embedded":  {
    "classifications":  [
       {},
       {
        "segment":  {
          "id": "KZFzniwnSyZfZ7v7nn",
          "name": "Film"
        },
        "_links":  {
          "self":  {
            "href": "/discovery/v2/classifications/KZFzniwnSyZfZ7v7nn?locale=en-us"
          }
        }
      },
       {
        "segment":  {
          "id": "KZFzniwnSyZfZ7v7n1",
          "name": "Miscellaneous"
        },
        "_links":  {
          "self":  {
            "href": "/discovery/v2/classifications/KZFzniwnSyZfZ7v7n1?locale=en-us"
          }
        }
      },
       {
        "segment":  {
          "id": "KZFzniwnSyZfZ7v7nJ",
          "name": "Music"
        },
        "_links":  {
          "self":  {
            "href": "/discovery/v2/classifications/KZFzniwnSyZfZ7v7nJ?locale=en-us"
          }
        }
      },
       {
        "segment":  {
          "id": "KZFzniwnSyZfZ7v7nE",
          "name": "Sports"
        },
        "_links":  {
          "self":  {
            "href": "/discovery/v2/classifications/KZFzniwnSyZfZ7v7nE?locale=en-us"
          }
        }
      },
       {
        "segment":  {
          "id": "KZFzniwnSyZfZ7v7nl",
          "name": "Undefined"
        },
        "_links":  {
          "self":  {
            "href": "/discovery/v2/classifications/KZFzniwnSyZfZ7v7nl?locale=en-us"
          }
        }
      }
    ]
  },
  "page":  {
    "size": 20,
    "totalElements": 6,
    "totalPages": 1,
    "number": 0
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
* `segment` (object) - segment.
    - `id` (string) - segment id.
    - `name` (string) - segment name.
* `_links` (object) - links to categories data sets.
    - `self` (object) - link to this data set.
        * `href` (string) - reference.

{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/classifications/KZFzniwnSyZfZ7v7nE.json?{apikey}",
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
--include 'https://app.ticketmaster.com/discovery/v2/classifications/KZFzniwnSyZfZ7v7nE.json?{apikey}'
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /discovery/v2/classifications/KZFzniwnSyZfZ7v7nE?{apikey} HTTP/1.1
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
  "segment":  {
    "id": "KZFzniwnSyZfZ7v7nE",
    "name": "Sports"
  },
  "_links":  {
    "self":  {
      "href": "/discovery/v2/classifications/KZFzniwnSyZfZ7v7nE?locale=en-us"
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
| `size`   | The number of events returned in the API response. | string            |       "10"       | No      |
| `page`   | The page for paginating through the results. | string            |       "1"       | No      |
| `sort`   | The search sort criteria. Values: "", "name,desc", "name,asc". | string            |              | No      |

### Response structure:

{: .nested-list}
- `_embedded` (object) - container for venues.
    * `venues` (array) - venues.
        - `{array item object}` - venue.
            * `name` (string) - name of venue.
            * `locale` (string) - locale of venue.
            * `markets` (array) - markets.
                - `{array item object}` - market.
                    * `id` (string) - market id.
            * `country` (object) - country.
                - `name` (string) - name of country.
                - `countryCode` (string) - code of country.
            * `state` (object) - state of venue.
                - `name` (string) - name of state.
                - `stateCode` (string) - code of state.
            * `city` (object) - citiy of venue.
                - `name` (string) - name of city.
            * `postalCode` (string) - postal code of venue.
            * `address` (object) - address of venue.
                - `line1` (string) - address line 1.
                - `line2` (string) - address line 2.
            * `location` (object) - location.
                - `longitude` (string) - address line 1.
                - `latitude` (string) - address line 2.
            * `timeZone` (string) - time zone of venue.
            * `_links` (object) - links to venues.
                - `self` (object) - link to this venue.
                    * `href` (string) - reference.
            * `id` (string) - id of venue.
            * `type` (string) - type of venue.
- `_links` (object) - links to venues data set.
    * `self` (object) - link to this data set.
        - `href` (string) - reference.
        - `templated` (boolean) - is templated.
    * `next` (object) - link to next data set.
        - `href` (string) - reference.
        - `templated` (boolean) - is templated.
- `page` (object) - information about current page in data source.
    * `size` (number) - page size.
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
  url:"https://app.ticketmaster.com/discovery/v2/venues.json?keyword=UCV&{apikey}",
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
--include 'https://app.ticketmaster.com/discovery/v2/venues.json?keyword=UCV&{apikey}'
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /discovery/v2/venues.json?{apikey}&keyword=UCV HTTP/1.1
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
  "_links":  {
    "self":  {
      "href": "/discovery/v2/venues.json?keyword=UCV{&page,size,sort}",
      "templated": true
    }
  },
  "_embedded":  {
    "venues":  [
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
      },
       {
        "name": "#2 Please do not use, left over from UCV initial acct set up",
        "type": "venue",
        "id": "KovZpZAFnIJA",
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
          "line1": "13740 County Road 2"
        },
        "location":  {
          "longitude": "-75.18635300",
          "latitude": "44.89937100"
        },
        "markets":  [
           {
            "id": "103"
          }
        ],
        "_links":  {
          "self":  {
            "href": "/discovery/v2/venues/KovZpZAFnIJA?locale=en-us"
          }
        }
      }
    ]
  },
  "page":  {
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
* `name` (string) - name of venue.
* `locale` (string) - locale of venue.
* `markets` (array) - markets.
    - `{array item object}` - market.
        * `id` (string) - market id.
* `country` (object) - country.
    - `name` (string) - name of country.
    - `countryCode` (string) - code of country.
* `state` (object) - state of venue.
    - `name` (string) - name of state.
    - `stateCode` (string) - code of state.
* `city` (object) - citiy of venue.
    - `name` (string) - name of city.
* `postalCode` (string) - postal code of venue.
* `address` (object) - address of venue.
    - `line1` (string) - address line 1.
    - `line2` (string) - address line 2.
* `location` (object) - location.
    - `longitude` (string) - address line 1.
    - `latitude` (string) - address line 2.
* `timeZone` (string) - time zone of venue.
* `_links` (object) - links to venues.
    - `self` (object) - link to this venue.
        * `href` (string) - reference.
* `id` (string) - id of venue.
* `type` (string) - type of venue.


{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/venues/KovZpZAFnIEA.json?{apikey}",
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
--include 'https://app.ticketmaster.com/discovery/v2/venues/KovZpZAFnIEA.json?{apikey}'
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /discovery/v2/venues/KovZpZAFnIEA.json?{apikey} HTTP/1.1
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


## Supported Markets
{: .article #supported-markets}

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
| 32          | United States                                |
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
| 51          | All of US                                    |
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
| 101         | All of Canada                                |
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
| 201         | All of United Kingdom                        |
| 202         | London                                       |
| 203         | South                                        |
| 204         | Midlands and Central                         |
| 205         | Wales and North West                         |
| 206         | North and North East                         |
| 207         | Scotland                                     |
| 208         | Ireland                                      |
| 209         | Northern Ireland                             |
| 210         | Germany                                      |
| 211         | Netherlands                                  |
| 500         | Sweden                                       |
| 501         | Todas las poblaciones                        |
| 502         | Barcelona                                    |
| 503         | Madrid                                       |
| 600         | Turkey                                       |

#### Australia and New Zealand

| ID          | Market                                       |
| :---------- | :--------------------------------------------|
| 301         | All of Australia                             |
| 302         | New South Wales/Australian Capital Territory |
| 303         | Queensland                                   |
| 304         | Western Australi                             |
| 305         | Victoria/Tasmania                            |
| 306         | Western Australia                            |
| 350         | All of New Zealand                           |
| 351         | North Island                                 |
| 352         | South Island                                 |

#### Mexico

| ID          | Market                                       |
| :---------- | :--------------------------------------------|
| 401         | All of Mexico                                |
| 402         | Mexico City and Metropolitan Area            |
| 403         | Monterrey                                    |
| 404         | Guadalajara                                  |

## Supported Sources
{: .article #supported-sources}

| Source	|
|:----------|
| ticketmaster	|
| universe	|


## Supported Locales
{: .article #supported-locales}

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
