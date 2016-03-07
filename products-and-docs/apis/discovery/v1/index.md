---
layout: documentation
categories:
- documentation
- discovery
title: Discovery API
excerpt: Use the Discovery API to search, look up and find events, attractions and venues.
keywords: API, search events, attraction details, event images, category details, venue details, support
---

# Discovery API

Use the Discovery API to search, look up and find events, attractions and venues. The API provides access to all Ticketmaster events for North America and International, as well as Universe, TicketWeb and Front Gate events.
{: .lead .article}

#### Developer Console
{: .aside .gray}

Make live API calls right now in the interactive docs:

[INTERACTIVE DOCS](/products-and-docs/apis/interactive-console/){: .button}

## Overview
{: .article #overview }

### Authentication

To run a successful API call, you will need to pass your API Key as the query parameter  __apikey__.

Example: `https://app.ticketmaster.com/discovery/v1/events.json?apikey=3QIvq55bS608ai6r8moig1WdW57bONry`

### Root URL

`https://app.ticketmaster.com/discovery/{API version}`


## Search Events
{: .article .console-link #srch-events }

**Method:** GET.
Authentication required.
Returns the 20 most recent events for the authenticating user.

discovery/{version}/events.{format}
{: .code .red}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v1"         | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |

### Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `keyword`  | A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.     | string            |                | No      |
| `attractionId`   | Attraction ID(s) separated by comma. | string            |       "768011"       | No      |
| `venueId`   | Venue ID(s) separated by comma. | string            |       "115378"       | No      |
| `promoterId`   | Promoter ID(s) separated by comma. | string            |       "494"       | No      |
| `postalCode`   | Zipcode or Postal Code of the venue in which the event is taking place. | string            |       "90069"       | No      |
| `latlong`   | The longitude/Latitude coordinates for the venue in which this event is taking place. | string            |       "34.0928090,-118.3286610"       | No      |
| `radius`   | The radius of the area in which we want to search for events. | string            |       "25"       | No      |
| `size`   | The number of events returned in the API response. | string            |       "10"       | No      |
| `page`   | The page for paginating through the results. | string            |       "1"       | No      |
| `sort`   | The search sort criteria. Values: "", "eventDate,desc", "eventDate,asc", "name,desc", "name,asc". | string            |              | No      |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |              | No      |
| `marketId`   | The city/area in which this event takes place. | string            |       "27"       | No      |
| `deviceId`   | The device making the API call. | string            |       "1"       | No      |
| `domain`   | The entity interested in this event (special use case). | string           |      "ticketmaster.com"     | No      |

### Response structure:

{: .nested-list}
- `_embedded` (object) - container for events.
    * `events` (array) - events.
        - `{array item object}` - event.
            * `name` (string) - name of event.
            * `locale` (string) - locale of event.
            * `eventUrl` (string) - links to event detail page.
            * `dates` (object) - dates of event.
                - `start` (object) - start of event.
                    * `dateTime` (string) - date and time start of event.
                    * `localDate` (string) - local date start of event.
                    * `localTime` (string) - local time start of event.
                - `end` (object) - end of event.
                    * `dateTime` (string) - date and time end of event.
                    * `localDate` (string) - local date end of event.
                    * `localTime` (string) - local time end of event.
                - `timezone` (string) - time zone of event.
                - `displayOptions` (object) - display options of event.
                    * `range` (object) - range of event displayed.
                        - `localStartDate` (string) - local start date of event displayed.
                        - `localEndDate` (string) - local end date of event displayed.
                - `status` (object) - status of event.
                    * `code` (string) - code of status.
            * `test` (boolean) - is test.
            * `id` (string) - id of event.
            * `_links` (object) - links to event.
                - `self` (object) - link to this event.
                    + `href` (string) - reference.
                - `categories` (array) - links to event categories.    
                    * `{array item object}` - link.
                        - `href` (string) - reference to event category.
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
                        * `marketId` (array) - id of venue markets.
                            - `{array item numbers}` - promoter id.
                        * `country` (object) - country of venue.
                            - `countryCode` (string) - country code of venue.
                        * `state` (object) - state of venue.
                            - `stateCode` (string) - state code of venue.
                        * `city` (object) - city of venue.
                            - `name` (string) - city name of venue.
                        * `location` (object) - location of venue.
                            - `latitude` (string) - latitude of venue.
                            - `longitude` (string) - longitude of venue.
                        * `postalCode` (string) - postal code of venue.
                        * `address` (object) - address of venue.
                            - `line1` (string) - street name.
                            - `line2` (string) - city and state code where event happen.
                        * `timeZone` (string) - time zone of event.
                        * `_links` (object) - links.
                            - `self` (object) - link to this venue.
                                * `href` (string) - reference.
                        * `id` (string) - id of current venue.
                        * `type` (string) - type of current venue.
                - `categories` (array) - related categories.
                    + `{array item object}` - categories.
                        * `name` (string) - name of event category.
                        * `level` (number) - level of event category.
                        * `_links` (object) - links to categories.
                            - `self` (object) - link to this category.
                                * `href` (string) - reference.
                    * `id` (string) - id of current category.
                    * `type` (string) - type of current category.     
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
            * `type` (string) - type of event.
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
  url:"https://app.ticketmaster.com/discovery/v1/events.json?size=1&apikey={apikey}",
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
--include 'https://app.ticketmaster.com/discovery/v1/events.json?size=1&apikey={apikey}'
{% endhighlight %}

    
{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight http %}
GET /discovery/v1/events.json?apikey=****&size=1 HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
{% endhighlight %}

{% highlight http %}
HTTP/1.1 200 OK
Access-Control-Allow-Headers: origin, x-requested-with, accept
Access-Control-Allow-Origin: *
Date: Tue, 01 Dec 2015 11:48:01 GMT
Content-Length: 4174
Access-Control-Max-Age: 3628800
Access-Control-Allow-Methods: GET, PUT, POST, DELETE
X-Application-Context: application:default,jetson4
Connection: keep-alive
Content-Type: application/json;charset=utf-8
Server: Apache-Coyote/1.1
Set-Cookie: ****

{
  "_links":  {
    "self":  {
      "href": "/discovery/v1/events.json?size=1 {&page,sort}",
      "templated": true
    },
    "next":  {
      "href": "/discovery/v1/events.json?page=1&size=1 {&sort}",
      "templated": true
    }
  },
  "_embedded":  {
    "events":  [
       {
        "name": "Hands On History At Yankee Stadium",
        "locale": "en-us",
        "promoterId":  [
          685
        ],
        "dates":  {
          "start":  {
            "dateTime": "2015-12-01T05:00:00.000+0000",
            "localDate": "2015-12-01",
            "localTime": "00:00:00"
          },
          "end":  {
            "dateTime": "2015-12-01T05:00:00.000+0000",
            "localDate": "2015-12-01",
            "localTime": "00:00:00"
          },
          "timezone": "America/New_York",
          "displayOptions":  {
            "range":  {
              "localStartDate": "2015-12-01",
              "localEndDate": "2015-12-01"
            }
          },
          "status":  {
            "code": "active"
          }
        },
        "test": false,
        "groupId": "BC473708",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/events/1D004E35E969579D?locale=en-us&domain=ticketmaster.com"
          },
          "categories":  [
             {
              "href": "/discovery/v1/categories/10005?locale=en-us&domain=ticketmaster.com"
            },
             {
              "href": "/discovery/v1/categories/106?locale=en-us&domain=ticketmaster.com"
            }
          ],
          "venue":  {
            "href": "/discovery/v1/venues/237572?locale=en-us&domain=ticketmaster.com"
          },
          "attractions":  [
             {
              "href": "/discovery/v1/attractions/1982144?locale=en-us&domain=ticketmaster.com"
            },
             {
              "href": "/discovery/v1/attractions/875284?locale=en-us&domain=ticketmaster.com"
            }
          ]
        },
        "id": "1D004E35E969579D",
        "_embedded":  {
          "venue":  [
             {
              "name": "Yankee Stadium",
              "marketId":  [
                124,
                35,
                55
              ],
              "country":  {
                "countryCode": "US"
              },
              "state":  {
                "stateCode": "NY"
              },
              "city":  {
                "name": "Bronx"
              },
              "location":  {
                "latitude": "40.828523700",
                "longitude": "-73.927626400"
              },
              "postalCode": "10451",
              "address":  {
                "line1": "1 East 161st Street",
                "line2": "Bronx, NY"
              },
              "timeZone": "America/New_York",
              "_links":  {
                "self":  {
                  "href": "/discovery/v1/venues/237572?locale=en-us&domain=ticketmaster.com"
                }
              },
              "id": "237572",
              "type": "venue"
            }
          ],
          "categories":  [
             {
              "name": "Miscellaneous",
              "level": 1,
              "_links":  {
                "self":  {
                  "href": "/discovery/v1/categories/10005?locale=en-us&domain=ticketmaster.com"
                }
              },
              "id": "10005",
              "type": "category"
            },
             {
              "name": "Cruise and Sightseeing",
              "level": 2,
              "_links":  {
                "self":  {
                  "href": "/discovery/v1/categories/106?locale=en-us&domain=ticketmaster.com"
                }
              },
              "id": "106",
              "type": "category"
            }
          ],
          "attractions":  [
             {
              "url": "/Hands-On-History-At-Yankee-Stadium-tickets/artist/1982144",
              "image":  {
                "url": "/dbimages/173891a.jpg"
              },
              "name": "Hands On History At Yankee Stadium",
              "_links":  {
                "self":  {
                  "href": "/discovery/v1/attractions/1982144?locale=en-us&domain=ticketmaster.com"
                }
              },
              "id": "1982144",
              "type": "attraction"
            },
             {
              "_links":  {
                "self":  {
                  "href": "/discovery/v1/attractions/875284?locale=en-us&domain=ticketmaster.com"
                }
              },
              "id": "875284",
              "type": "attraction"
            }
          ]
        },
        "type": "event"
      }
    ]
  },
  "page":  {
    "size": 1,
    "totalElements": 56811,
    "totalPages": 56811,
    "number": 0
  }
}
{% endhighlight %}

## Get Event Details
{: .article .console-link #event-details }

**Method:** GET.
Authentication required.
Returns the event detail by event ID.

discovery/{version}/events/{id}.{format}
{: .code .red}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v1"         | Yes      |
| `id`       | Event ID. Required.  | string            | "29004F223C406ABF" | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |

### Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `domain`   | The entity interested in this event (special use case). | string           |      "ticketmaster.com"     | No      |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |              | No      |

### Response structure:

{: .nested-list}
* `name` (string) - name of event.
* `locale` (string) - locale of event.
* `eventUrl` (string) - links to event detail page.
* `promoterId` (array) - promoter ids of event.
    - `{array item numbers}` - promoter id.
* `dates` (object) - dates of event.
    - `start` (object) - start of event.
        * `dateTime` (string) - date and time start of event.
        * `localDate` (string) - local date start of event.
        * `localTime` (string) - local time start of event.
    - `end` (object) - end of event.
        * `dateTime` (string) - date and time end of event.
        * `localDate` (string) - local date end of event.
        * `localTime` (string) - local time end of event.
    - `timezone` (string) - time zone of event.
    - `displayOptions` (object) - display options of event.
        * `range` (object) - range of event displayed.
            - `localStartDate` (string) - local start date of event displayed.
            - `localEndDate` (string) - local end date of event displayed.
    - `status` (object) - status of event.
        * `code` (string) - code of status.
* `test` (boolean) - is test.
* `_links` (object) - links to event.
    - `self` (object) - link to this event.
        + `href` (string) - reference.
    - `categories` (array) - links to event categories.    
        * `{array item object}` - link.
            - `href` (string) - reference to event category.
    - `attractions` (object) - links to event attractions.
        * `{array item object}` - link.
            * `href` (string) - reference to event attraction.
    - `venue` (object) - link to event venues.
        * `{array item object}` - link.
            * `href` (string) - reference to event venue.
* `id` (string) - id of current event.
* `_embedded` (object) - container for data.
    - `venue` (array) - event venues.
        * `{array item object}` - event venues.
            * `name` (string) - name of event venue.
            * `marketId` (array) - id of venue markets.
                - `{array item numbers}` - promoter id.
            * `country` (object) - country of venue.
                - `countryCode` (string) - country code of venue.
            * `state` (object) - state of venue.
                - `stateCode` (string) - state code of venue.
            * `city` (object) - city of venue.
                - `name` (string) - city name of venue.
            * `location` (object) - location of venue.
                - `latitude` (string) - latitude of venue.
                - `longitude` (string) - longitude of venue.
            * `postalCode` (string) - postal code of venue.
            * `address` (object) - address of venue.
                - `line1` (string) - street name.
                - `line2` (string) - city and state code where event happen.
            * `timeZone` (string) - time zone of event.
            * `_links` (object) - links to event.
                - `self` (object) - link to this event.
                    * `href` (string) - reference.
            * `id` (string) - id of current venue.
            * `type` (string) - type of current venue.
    - `categories` (array) - link to event categories.
        + `{array item object}` - event categories.
            * `name` (string) - name of event category.
            * `level` (number) - level of event category.
            * `_links` (object) - links to categories.
                - `self` (object) - link to this category.
                    * `href` (string) - reference.
        * `id` (string) - id of current category.
        * `type` (string) - type of current category.     
    - `attractions` (array) - event attractions.
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
* `type` (string) - type of event.

{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v1/events/0B004F0401BD55E5.json?apikey={apikey}",
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
--include 'https://app.ticketmaster.com/discovery/v1/events/0B004F0401BD55E5.json?apikey={apikey}'
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight http %}
GET /discovery/v1/events/15004F83A3383A3E.json?apikey=**** HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
{% endhighlight %}

{% highlight http %}
HTTP/1.1 200 OK
Access-Control-Allow-Headers: origin, x-requested-with, accept
Access-Control-Allow-Origin: *
Date: Tue, 15 Dec 2015 13:43:46 GMT
Content-Length: 3485
Access-Control-Max-Age: 3628800
Access-Control-Allow-Methods: GET, PUT, POST, DELETE
X-Application-Context: application:default,jetson1
Connection: keep-alive
Content-Type: application/json;charset=utf-8
Server: Apache-Coyote/1.1
Set-Cookie: ****

{
  "name": "Aquarium Admission",
  "locale": "en-us",
  "promoterId":  [
    494
  ],
  "dates":  {
    "start":  {
      "dateTime": "2015-12-15T05:00:00.000+0000",
      "localDate": "2015-12-15",
      "localTime": "00:00:00"
    },
    "end":  {
      "dateTime": "2015-12-15T05:00:00.000+0000",
      "localDate": "2015-12-15",
      "localTime": "00:00:00"
    },
    "timezone": "America/New_York",
    "displayOptions":  {
      "range":  {
        "localStartDate": "2015-12-15",
        "localEndDate": "2015-12-15"
      }
    },
    "status":  {
      "code": "active"
    }
  },
  "test": false,
  "_links":  {
    "self":  {
      "href": "/discovery/v1/events/15004F83A3383A3E?locale=en-us&domain=ticketmaster.com"
    },
    "categories":  [
       {
        "href": "/discovery/v1/categories/10003?locale=en-us&domain=ticketmaster.com"
      },
       {
        "href": "/discovery/v1/categories/19?locale=en-us&domain=ticketmaster.com"
      }
    ],
    "attractions":  {
      "href": "/discovery/v1/attractions/852425?locale=en-us&domain=ticketmaster.com"
    },
    "venue":  {
      "href": "/discovery/v1/venues/172095?locale=en-us&domain=ticketmaster.com"
    }
  },
  "id": "15004F83A3383A3E",
  "_embedded":  {
    "venue":  [
       {
        "name": "National Aquarium In Baltimore",
        "marketId":  [
          47
        ],
        "country":  {
          "countryCode": "US"
        },
        "state":  {
          "stateCode": "MD"
        },
        "city":  {
          "name": "Baltimore"
        },
        "location":  {
          "latitude": "39.285497900",
          "longitude": "-76.608331000"
        },
        "postalCode": "21202",
        "address":  {
          "line1": "501 East Pratt St.",
          "line2": "Baltimore, MD"
        },
        "timeZone": "America/New_York",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/venues/172095?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "172095",
        "type": "venue"
      }
    ],
    "categories":  [
       {
        "name": "Family",
        "level": 1,
        "_links":  {
          "self":  {
            "href": "/discovery/v1/categories/10003?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "10003",
        "type": "category"
      },
       {
        "name": "Family Attractions",
        "level": 2,
        "_links":  {
          "self":  {
            "href": "/discovery/v1/categories/19?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "19",
        "type": "category"
      }
    ],
    "attractions":  [
       {
        "url": "/National-Aquarium-In-Baltimore-tickets/artist/852425",
        "image":  {
          "url": "/dbimages/45546a"
        },
        "name": "National Aquarium In Baltimore",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/attractions/852425?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "852425",
        "type": "attraction"
      }
    ]
  },
  "type": "event"
}
}
{% endhighlight %}



## Search Event Images
{: .article .console-link #event-img}

**Method:** GET.
Authentication required.
Returns all the images for an event by ID. If an event does not have an image for a supported resolution, the event's major category image will be returned instead.

{: .code .red}
discovery/{version}/events/{id}/images.{format}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v1"         | Yes      |
| `id`       | Event ID.            | string            | "0B004F0401BD55E5" | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |

### Response structure:

{: .nested-list}
- `type` (string) - type of images set
- `id` (string) - id of event
- `images` (array) - images.
    * `{array item object}` - image.
        * `ratio` (string) - image ratio.
        * `url` (string) - image url.
        * `width` (string) - image width.
        * `height` (string) - image height.
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
  url:"https://app.ticketmaster.com/discovery/v1/events/0B004F0401BD55E5/images.json?apikey={apikey}",
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
--include 'https://app.ticketmaster.com/discovery/v1/events/0B004F0401BD55E5/images.json?apikey={apikey}'
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight http %}
GET /discovery/v1/events/0B004F0401BD55E5/images.json?apikey=**** HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
{% endhighlight %}

{% highlight http %}
HTTP/1.1 200 OK
Content-Length: 1789
Expires: Tue, 01 Dec 2015 12:53:10 GMT
Access-Control-Max-Age: 3628800
Access-Control-Allow-Methods: GET, PUT, POST, DELETE
Connection: keep-alive
Server: Apache-Coyote/1.1
Cache-Control: max-age=0, no-cache, no-store
Pragma: no-cache
X-Varnish: 1715762
Access-Control-Allow-Headers: origin, x-requested-with, accept
Date: Tue, 01 Dec 2015 12:53:10 GMT
Access-Control-Allow-Origin: *
X-Application-Context: content-content-runtime-service:jash1,default:8080
Content-Type: application/json;charset=UTF-8
Accept-Ranges: bytes
Set-Cookie: ****

{
  "type": "event",
  "id": "0B004F0401BD55E5",
  "images":  [
     {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/2c3/0821e82a-6024-44ff-9a01-f850c38682c3_44411_RETINA_PORTRAIT_16_9.jpg",
      "width": 640,
      "height": 360,
      "fallback": false
    },
     {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/2c3/0821e82a-6024-44ff-9a01-f850c38682c3_44411_RETINA_LANDSCAPE_16_9.jpg",
      "width": 1136,
      "height": 639,
      "fallback": false
    },
     {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/2c3/0821e82a-6024-44ff-9a01-f850c38682c3_44411_TABLET_LANDSCAPE_LARGE_16_9.jpg",
      "width": 2048,
      "height": 1152,
      "fallback": false
    },
     {
      "ratio": "4_3",
      "url": "http://s1.ticketm.net/dam/a/2c3/0821e82a-6024-44ff-9a01-f850c38682c3_44411_CUSTOM.jpg",
      "width": 305,
      "height": 225,
      "fallback": false
    },
     {
      "ratio": "3_2",
      "url": "http://s1.ticketm.net/dam/a/2c3/0821e82a-6024-44ff-9a01-f850c38682c3_44411_TABLET_LANDSCAPE_3_2.jpg",
      "width": 1024,
      "height": 683,
      "fallback": false
    },
     {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/2c3/0821e82a-6024-44ff-9a01-f850c38682c3_44411_TABLET_LANDSCAPE_16_9.jpg",
      "width": 1024,
      "height": 576,
      "fallback": false
    },
     {
      "ratio": "3_2",
      "url": "http://s1.ticketm.net/dam/a/2c3/0821e82a-6024-44ff-9a01-f850c38682c3_44411_ARTIST_PAGE_3_2.jpg",
      "width": 305,
      "height": 203,
      "fallback": false
    },
     {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/2c3/0821e82a-6024-44ff-9a01-f850c38682c3_44411_RECOMENDATION_16_9.jpg",
      "width": 100,
      "height": 56,
      "fallback": false
    },
     {
      "ratio": "3_2",
      "url": "http://s1.ticketm.net/dam/a/2c3/0821e82a-6024-44ff-9a01-f850c38682c3_44411_RETINA_PORTRAIT_3_2.jpg",
      "width": 640,
      "height": 427,
      "fallback": false
    },
     {
      "ratio": "16_9",
      "url": "http://s1.ticketm.net/dam/a/2c3/0821e82a-6024-44ff-9a01-f850c38682c3_44411_EVENT_DETAIL_PAGE_16_9.jpg",
      "width": 205,
      "height": 115,
      "fallback": false
    }
  ],
  "_links":  {
    "self":  {
      "href": "/discovery/v1/events/0B004F0401BD55E5/images.json"
    }
  }
}

{% endhighlight %}

{: .article .console-link #search-attractions}
## Search Attractions

**Method:** GET.
Authentication required..
Search Attractions!

{: .code .red}
discovery/{version}/attractions.{format}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v1"         | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |

### Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `keyword`  | A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.     | string            |                | No      |
| `domain`   | The entity interested in this event (special use case). | string           |      "ticketmaster.com"     | No      |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |              | No      |
| `size`   | The number of events returned in the API response. | string            |       "10"       | No      |
| `page`   | The page for paginating through the results. | string            |       "1"       | No      |
| `sort`   | The search sort criteria. Values: "name,desc", "name,asc". | string            |              | No      |

### Response structure:

{: .nested-list}
- `_embedded` (object) - container attractions.
    * `attractions` (array) - attractions.
        - `{array item object}` - attraction.
            * `id` (string) - id of attraction.
            * `type` (string) - type of attraction.
            * `url` (string) - url to attraction.
            * `name` (string) - name of attraction.
            * `locale` (string) - locale of attraction.
            * `image` (object) - image for attraction.
                - `url` (string) - url to attraction image.
            * `_links` (object) - links to attractions.
                - `self` (object) - link to this attraction.
                    * `href` (string) - reference.
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
  url:"https://app.ticketmaster.com/discovery/v1/attractions.json?apikey={apikey}",
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
--include 'https://app.ticketmaster.com/discovery/v1/attractions.json?apikey={apikey}'
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight http %}
GET /discovery/v1/attractions.json?apikey=**** HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
{% endhighlight %}

{% highlight http %}
HTTP/1.1 200 OK
Access-Control-Allow-Headers: origin, x-requested-with, accept
Access-Control-Allow-Origin: *
Date: Tue, 01 Dec 2015 12:55:01 GMT
Content-Length: 7606
Access-Control-Max-Age: 3628800
Access-Control-Allow-Methods: GET, PUT, POST, DELETE
X-Application-Context: application:default,jetson4
Connection: keep-alive
Content-Type: application/json;charset=utf-8
Server: Apache-Coyote/1.1
Set-Cookie: ****

{
  "_links":  {
    "self":  {
      "href": "/discovery/v1/attractions.json {?page,size,sort}",
      "templated": true
    },
    "next":  {
      "href": "/discovery/v1/attractions.json?page=1&size=20 {&sort}",
      "templated": true
    }
  },
  "_embedded":  {
    "attractions":  [
       {
        "url": "/artist/919340",
        "image":  {
          "url": "/dam/a/418/aa73b994-9912-4535-ba21-4865ae93a418_41291_EVENT_DETAIL_PAGE_16_9.jpg"
        },
        "name": "!!!",
        "locale": "en-us",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/attractions/919340?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "919340",
        "type": "attraction"
      },
       {
        "url": "/TEST-EVENT-NOT-FOR-SALE-tickets/artist/2188271",
        "name": "!!!! TEST EVENT. NOT FOR SALE. PURCHASES WILL BE VOIDED !!!!",
        "locale": "en-us",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/attractions/2188271?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "2188271",
        "type": "attraction"
      },
       {
        "url": "/Hero-tickets/artist/883184",
        "name": "!Hero",
        "locale": "en-us",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/attractions/883184?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "883184",
        "type": "attraction"
      },
       {
        "url": "/Tang-tickets/artist/1673094",
        "name": "!Tang",
        "locale": "en-us",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/attractions/1673094?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "1673094",
        "type": "attraction"
      },
       {
        "url": "/Women-Art-Revolution-tickets/artist/1643423",
        "name": "!Women Art Revolution",
        "locale": "en-us",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/attractions/1643423?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "1643423",
        "type": "attraction"
      },
       {
        "url": "/A-Choral-Holiday-tickets/artist/2178282",
        "name": ""A Choral Holiday"",
        "locale": "en-us",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/attractions/2178282?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "2178282",
        "type": "attraction"
      },
       {
        "url": "/A-John-Denver-Christmas-Tribute-tickets/artist/2163030",
        "name": ""A John Denver Christmas Tribute" - Chris Collins & Boulder Canyon",
        "locale": "en-us",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/attractions/2163030?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "2163030",
        "type": "attraction"
      },
       {
        "url": "/A-Vivir-Con-Odin-Dupeyron-tickets/artist/2130498",
        "image":  {
          "url": "/dbimages/212397a.jpg"
        },
        "name": ""A Vivir" Con Odin Dupeyron",
        "locale": "en-us",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/attractions/2130498?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "2130498",
        "type": "attraction"
      },
       {
        "url": "/A-Sides-tickets/artist/759799",
        "name": ""A" Sides",
        "locale": "en-us",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/attractions/759799?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "759799",
        "type": "attraction"
      },
       {
        "url": "/BLUE-MAN-GROUP-tickets/artist/2168522",
        "name": ""BLUE MAN GROUP"",
        "locale": "en-us",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/attractions/2168522?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "2168522",
        "type": "attraction"
      },
       {
        "url": "/Dee-tickets/artist/767040",
        "name": ""Dee"",
        "locale": "en-us",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/attractions/767040?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "767040",
        "type": "attraction"
      },
       {
        "url": "/El-Cascanueces-Ballet-Ruso-de-Samara-tickets/artist/2182975",
        "name": ""El Cascanueces" Ballet Ruso de Samara",
        "locale": "en-us",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/attractions/2182975?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "2182975",
        "type": "attraction"
      },
       {
        "url": "/Givin-the-Dog-a-Bone-KY-tickets/artist/2174785",
        "name": ""Givin' the Dog a Bone" KY Humane Society benefit feat. Thunderstruck",
        "locale": "en-us",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/attractions/2174785?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "2174785",
        "type": "attraction"
      },
       {
        "url": "/I-FEEL-GOOD-THE-JAMES-BROWN-tickets/artist/2083045",
        "name": ""I FEEL GOOD" THE JAMES BROWN STORY",
        "locale": "en-us",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/attractions/2083045?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "2083045",
        "type": "attraction"
      },
       {
        "url": "/Its-a-Wonderful-Life-with-ZuzuA-tickets/artist/2154063",
        "name": ""It's a Wonderful Life with Zuzu"-A Conversation with Karolyn Grimes",
        "locale": "en-us",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/attractions/2154063?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "2154063",
        "type": "attraction"
      },
       {
        "url": "/LOVE-With-Andrey-Makarevich-tickets/artist/2170300",
        "name": ""L.O.V.E." With Andrey Makarevich",
        "locale": "en-us",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/attractions/2170300?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "2170300",
        "type": "attraction"
      },
       {
        "url": "/La-Reina-de-las-Nieves-Ballet-tickets/artist/2175716",
        "name": ""La Reina de las Nieves" Ballet Circo de Moscú",
        "locale": "en-us",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/attractions/2175716?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "2175716",
        "type": "attraction"
      },
       {
        "url": "/Ladies-in-Love-A-Valentines-tickets/artist/2164933",
        "name": ""Ladies in Love" - A Valentine's Day Affair feat. SHERMA ANDREWS",
        "locale": "en-us",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/attractions/2164933?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "2164933",
        "type": "attraction"
      },
       {
        "url": "/Mentiras-El-Musical-tickets/artist/1537157",
        "name": ""Mentiras" El Musical",
        "locale": "en-us",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/attractions/1537157?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "1537157",
        "type": "attraction"
      },
       {
        "url": "/My-Spirit-Animal-is-A-Butch-tickets/artist/2140956",
        "name": ""My Spirit Animal is A Butch Lesbian" featuring Sampson",
        "locale": "en-us",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/attractions/2140956?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "2140956",
        "type": "attraction"
      }
    ]
  },
  "page":  {
    "size": 20,
    "totalElements": 257006,
    "totalPages": 12851,
    "number": 0
  }
}
}
{% endhighlight %}

{: .article .console-link #attraction-details}
## Get Attraction Details

**Method:** GET.
Authentication required.
Search Attractions!

discovery/{version}/attractions/{id}.{format}
{: .code .red}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |     "v1"           | Yes      |
| `id`       | Attraction ID.       | string            |     "768011"       | Yes      |
| `format`   | API Response Format. | string            |     "json"         | Yes      |



### Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `domain`   | The entity interested in this event (special use case). | string           |      "ticketmaster.com"     | No      |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |              | No      |

### Response structure:

{: .nested-list}
* `url` (string) - url to attraction.
* `name` (string) - name of attraction.
* `locale` (string) - locale of attraction.
* `image` (object) - image for attraction.
    - `url` (string) - url to image.
* `_links` (object) - links to attractions.
    - `self` (object) - link to this attraction.
        * `href` (string) - reference.
* `id` (string) - id of attraction.
* `type` (string) - type of attraction.

{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v1/attractions/768011.json?apikey={apikey}",
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
--include 'https://app.ticketmaster.com/discovery/v1/attractions/768011.json?apikey={apikey}'
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /discovery/v1/attractions/768011.json?apikey=**** HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Access-Control-Allow-Headers: origin, x-requested-with, accept
Access-Control-Allow-Origin: *
Date: Tue, 01 Dec 2015 12:58:55 GMT
Content-Length: 445
Access-Control-Max-Age: 3628800
Access-Control-Allow-Methods: GET, PUT, POST, DELETE
X-Application-Context: application:default,jetson4
Connection: keep-alive
Content-Type: application/json;charset=utf-8
Server: Apache-Coyote/1.1
Set-Cookie: ****

{
  "url": "/Madonna-tickets/artist/768011",
  "image":  {
    "url": "/dbimages/213810a.jpg"
  },
  "name": "Madonna",
  "locale": "en-us",
  "_links":  {
    "self":  {
      "href": "/discovery/v1/attractions/768011?locale=en-us&domain=ticketmaster.com"
    }
  },
  "id": "768011",
  "type": "attraction"
}
{% endhighlight %}


{: .article .console-link #search-categories}
## Search Categories

**Method:** GET.
Authentication required.
Search Categories!

discovery/{version}/categories.{format}
{: .code .red}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |     "v1"           | Yes      |
| `format`   | API Response Format. | string            |     "json"         | Yes      |

### Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `keyword`  | A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.     | string            |                | No      |
| `domain`   | The entity interested in this event (special use case). | string           |      "ticketmaster.com"     | No      |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |              | No      |
| `size`   | The number of events returned in the API response. | string            |       "10"       | No      |
| `page`   | The page for paginating through the results. | string            |       "1"       | No      |
| `sort`   | The search sort criteria. Values: "", "name,desc", "name,asc". | string            |              | No      |

### Response structure:

{: .nested-list}
- `_embedded` (object) - container for categories.
    * `categories` (array) - categories.
        - `{array item object}` - category.
            * `name` (string) - name of category.
            * `locale` (string) - locale of category.
            * `level` (number) - level of category.
            * `_links` (object) - links to categories.
                - `self` (object) - link to this category.
                    * `href` (string) - reference.
                - `parent` (object) - link to parent category.
                    * `href` (string) - reference.
            * `id` (string) - id of category.
            * `type` (string) - type of category.            
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
  url:"https://app.ticketmaster.com/discovery/v1/categories.json?apikey={apikey}",
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
--include 'https://app.ticketmaster.com/discovery/v1/categories.json?apikey={apikey}'
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /discovery/v1/categories.json?apikey=**** HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Access-Control-Allow-Headers: origin, x-requested-with, accept
Access-Control-Allow-Origin: *
Date: Tue, 01 Dec 2015 13:02:18 GMT
Content-Length: 8336
Access-Control-Max-Age: 3628800
Access-Control-Allow-Methods: GET, PUT, POST, DELETE
X-Application-Context: application:default,jetson4
Connection: keep-alive
Content-Type: application/json;charset=utf-8
Server: Apache-Coyote/1.1
Set-Cookie: ****

{
  "_links":  {
    "self":  {
      "href": "/discovery/v1/categories.json {?page,size,sort}",
      "templated": true
    },
    "next":  {
      "href": "/discovery/v1/categories.json?page=1&size=20 {&sort}",
      "templated": true
    }
  },
  "_embedded":  {
    "categories":  [
       {
        "name": "Plays",
        "locale": "en-us",
        "level": 2,
        "_links":  {
          "self":  {
            "href": "/discovery/v1/categories/32?locale=en-us&domain=ticketmaster.com"
          },
          "parent":  {
            "href": "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "32",
        "type": "category"
      },
       {
        "name": "Classical",
        "locale": "en-us",
        "level": 2,
        "_links":  {
          "self":  {
            "href": "/discovery/v1/categories/203?locale=en-us&domain=ticketmaster.com"
          },
          "parent":  {
            "href": "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "203",
        "type": "category"
      },
       {
        "name": "Ballet and Dance",
        "locale": "en-us",
        "level": 2,
        "_links":  {
          "self":  {
            "href": "/discovery/v1/categories/12?locale=en-us&domain=ticketmaster.com"
          },
          "parent":  {
            "href": "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "12",
        "type": "category"
      },
       {
        "name": "Opera",
        "locale": "en-us",
        "level": 2,
        "_links":  {
          "self":  {
            "href": "/discovery/v1/categories/13?locale=en-us&domain=ticketmaster.com"
          },
          "parent":  {
            "href": "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "13",
        "type": "category"
      },
       {
        "name": "Museums and Exhibits",
        "locale": "en-us",
        "level": 2,
        "_links":  {
          "self":  {
            "href": "/discovery/v1/categories/14?locale=en-us&domain=ticketmaster.com"
          },
          "parent":  {
            "href": "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "14",
        "type": "category"
      },
       {
        "name": "Musicals",
        "locale": "en-us",
        "level": 2,
        "_links":  {
          "self":  {
            "href": "/discovery/v1/categories/207?locale=en-us&domain=ticketmaster.com"
          },
          "parent":  {
            "href": "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "207",
        "type": "category"
      },
       {
        "name": "Broadway",
        "locale": "en-us",
        "level": 2,
        "_links":  {
          "self":  {
            "href": "/discovery/v1/categories/16?locale=en-us&domain=ticketmaster.com"
          },
          "parent":  {
            "href": "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "16",
        "type": "category"
      },
       {
        "name": "Audio Tours",
        "locale": "en-us",
        "level": 2,
        "_links":  {
          "self":  {
            "href": "/discovery/v1/categories/240?locale=en-us&domain=ticketmaster.com"
          },
          "parent":  {
            "href": "/discovery/v1/categories/10005?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "240",
        "type": "category"
      },
       {
        "name": "Off-Broadway",
        "locale": "en-us",
        "level": 2,
        "_links":  {
          "self":  {
            "href": "/discovery/v1/categories/17?locale=en-us&domain=ticketmaster.com"
          },
          "parent":  {
            "href": "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "17",
        "type": "category"
      },
       {
        "name": "Magic Shows",
        "locale": "en-us",
        "level": 2,
        "_links":  {
          "self":  {
            "href": "/discovery/v1/categories/209?locale=en-us&domain=ticketmaster.com"
          },
          "parent":  {
            "href": "/discovery/v1/categories/10003?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "209",
        "type": "category"
      },
       {
        "name": "Arts & Theater",
        "locale": "en-us",
        "level": 1,
        "_links":  {
          "self":  {
            "href": "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "10002",
        "type": "category"
      },
       {
        "name": "Comedy",
        "locale": "en-us",
        "level": 2,
        "_links":  {
          "self":  {
            "href": "/discovery/v1/categories/51?locale=en-us&domain=ticketmaster.com"
          },
          "parent":  {
            "href": "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "51",
        "type": "category"
      },
       {
        "name": "Family",
        "locale": "en-us",
        "level": 1,
        "_links":  {
          "self":  {
            "href": "/discovery/v1/categories/10003?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "10003",
        "type": "category"
      },
       {
        "name": "Family Attractions",
        "locale": "en-us",
        "level": 2,
        "_links":  {
          "self":  {
            "href": "/discovery/v1/categories/19?locale=en-us&domain=ticketmaster.com"
          },
          "parent":  {
            "href": "/discovery/v1/categories/10003?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "19",
        "type": "category"
      },
       {
        "name": "More Arts and Theater",
        "locale": "en-us",
        "level": 2,
        "_links":  {
          "self":  {
            "href": "/discovery/v1/categories/53?locale=en-us&domain=ticketmaster.com"
          },
          "parent":  {
            "href": "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "53",
        "type": "category"
      },
       {
        "name": "Miscellaneous",
        "locale": "en-us",
        "level": 1,
        "_links":  {
          "self":  {
            "href": "/discovery/v1/categories/10005?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "10005",
        "type": "category"
      },
       {
        "name": "Fairs and Festivals",
        "locale": "en-us",
        "level": 2,
        "_links":  {
          "self":  {
            "href": "/discovery/v1/categories/54?locale=en-us&domain=ticketmaster.com"
          },
          "parent":  {
            "href": "/discovery/v1/categories/10003?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "54",
        "type": "category"
      },
       {
        "name": "Ice Shows",
        "locale": "en-us",
        "level": 2,
        "_links":  {
          "self":  {
            "href": "/discovery/v1/categories/22?locale=en-us&domain=ticketmaster.com"
          },
          "parent":  {
            "href": "/discovery/v1/categories/10003?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "22",
        "type": "category"
      },
       {
        "name": "Children's Music and Theater",
        "locale": "en-us",
        "level": 2,
        "_links":  {
          "self":  {
            "href": "/discovery/v1/categories/23?locale=en-us&domain=ticketmaster.com"
          },
          "parent":  {
            "href": "/discovery/v1/categories/10003?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "23",
        "type": "category"
      },
       {
        "name": "More Family",
        "locale": "en-us",
        "level": 2,
        "_links":  {
          "self":  {
            "href": "/discovery/v1/categories/55?locale=en-us&domain=ticketmaster.com"
          },
          "parent":  {
            "href": "/discovery/v1/categories/10003?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "55",
        "type": "category"
      },
       {
        "name": "Circus",
        "locale": "en-us",
        "level": 2,
        "_links":  {
          "self":  {
            "href": "/discovery/v1/categories/29?locale=en-us&domain=ticketmaster.com"
          },
          "parent":  {
            "href": "/discovery/v1/categories/10003?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "29",
        "type": "category"
      }
    ]
  },
  "page":  {
    "size": 20,
    "totalElements": 76,
    "totalPages": 4,
    "number": 0
  }
}
{% endhighlight %}


{: .article .console-link #category-details}
## Get Category Details

**Method:** GET.
Authentication required.
Returns the category detail by ID.

{: .code .red}
discovery/{version}/categories/{id}.{format}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |     "v1"           | Yes      |
| `id`       | Category ID.         | string            |     "203"          | Yes      |
| `format`   | API Response Format. | string            |     "json"         | Yes      |


### Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `domain`   | The entity interested in this event (special use case). | string           |      "ticketmaster.com"     | No      |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |              | No      |

### Response structure:

{: .nested-list}
* `name` (string) - name of category.
* `locale` (string) - locale of category.
* `level` (number) - level of category.
* `_links` (object) - links to categories.
    - `self` (object) - link to this category.
        * `href` (string) - reference.
    - `parent` (object) - link to parent category.
        * `href` (string) - reference.
* `id` (string) - id of category.
* `type` (string) - type of category.

{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v1/categories/203.json?apikey={apikey}",
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
--include 'https://app.ticketmaster.com/discovery/v1/categories/203.json?apikey={apikey}'
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /discovery/v1/categories/203.json?apikey=**** HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Access-Control-Allow-Headers: origin, x-requested-with, accept
Access-Control-Allow-Origin: *
Date: Tue, 01 Dec 2015 13:03:29 GMT
Content-Length: 568
Access-Control-Max-Age: 3628800
Access-Control-Allow-Methods: GET, PUT, POST, DELETE
X-Application-Context: application:default,jetson1
Connection: keep-alive
Content-Type: application/json;charset=utf-8
Server: Apache-Coyote/1.1
Set-Cookie: ****

{
  "name": "Classical",
  "locale": "en-us",
  "level": 2,
  "_links":  {
    "self":  {
      "href": "/discovery/v1/categories/203?locale=en-us&domain=ticketmaster.com"
    },
    "parent":  {
      "href": "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
    }
  },
  "id": "203",
  "type": "category"
}
{% endhighlight %}


{: .article .console-link #search-venues}
## Search Venues

**Method:** GET.
Authentication required.
Search Venues!

discovery/{version}/venues.{format}
{: .code .red}


### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |     "v1"           | Yes      |
| `format`   | API Response Format. | string            |     "json"         | Yes      |

### Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `keyword`  | A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.     | string            |                | No      |
| `domain`   | The entity interested in this event (special use case). | string           |      "ticketmaster.com"     | No      |
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
            * `marketId` (array of numbers) - id of supported markets.
            * `country` (string) - country code.
            * `state` (object) - state of venue.
                - `stateCode` (string) - code of state.
            * `city` (object) - citiy of venue.
                - `name` (string) - name of city.
            * `postalCode` (string) - postal code of venue.
            * `address` (object) - address of venue.
                - `line1` (string) - address line 1.
                - `line2` (string) - address line 2.
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
  url:"https://app.ticketmaster.com/discovery/v1/venues.json?keyword=UCV&apikey={apikey}",
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
--include 'https://app.ticketmaster.com/discovery/v1/venues.json?keyword=UCV&apikey={apikey}'
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /discovery/v1/venues.json?apikey=****&keyword=UCV HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: http://app.ticketmaster.com
Connection: Keep-Alive
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Access-Control-Allow-Headers: origin, x-requested-with, accept
Access-Control-Allow-Origin: *
Date: Tue, 01 Dec 2015 13:04:50 GMT
Content-Length: 1646
Access-Control-Max-Age: 3628800
Access-Control-Allow-Methods: GET, PUT, POST, DELETE
X-Application-Context: application:default,jetson1
Connection: keep-alive
Content-Type: application/json;charset=utf-8
Server: Apache-Coyote/1.1
Set-Cookie: ****

{
  "_links":  {
    "self":  {
      "href": "/discovery/v1/venues.json?keyword=UCV {&page,size,sort}",
      "templated": true
    }
  },
  "_embedded":  {
    "venues":  [
       {
        "name": "#1 Please do not use, left over from UCV initial acct set up",
        "locale": "en-us",
        "marketId":  [
          103
        ],
        "country":  {
          "countryCode": "CA"
        },
        "state":  {
          "stateCode": "ON"
        },
        "city":  {
          "name": "Morrisburg"
        },
        "postalCode": "K0C1X0",
        "address":  {
          "line1": "Crysler Park Marina, 13480 County Rd 2",
          "line2": "Morrisburg, ON"
        },
        "timeZone": "America/Toronto",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/venues/341396?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "341396",
        "type": "venue"
      },
       {
        "name": "#2 Please do not use, left over from UCV initial acct set up",
        "locale": "en-us",
        "marketId":  [
          103
        ],
        "country":  {
          "countryCode": "CA"
        },
        "state":  {
          "stateCode": "ON"
        },
        "city":  {
          "name": "Morrisburg"
        },
        "postalCode": "K0C1X0",
        "address":  {
          "line1": "13740 County Road 2",
          "line2": "Morrisburg, ON"
        },
        "timeZone": "America/Toronto",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/venues/341395?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "341395",
        "type": "venue"
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


{: .article .console-link #venue-details}
## Get Venue Details

**Method:** GET.
Authentication required.
Returns the venue detail by ID.

discovery/{version}/venues/{id}.{format}
{: .code .red}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |     "v1"           | Yes      |
| `id`       | Venue ID.            | string            |     "90150"          | Yes      |
| `format`   | API Response Format. | string            |     "json"         | Yes      |

### Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `domain`   | The entity interested in this event (special use case). | string           |      "ticketmaster.com"     | No      |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |              | No      |

### Response structure:

{: .nested-list}
* `name` (string) - name of venue.
* `locale` (string) - locale of venue.
* `marketId` (array of numbers) - id of supported markets.
* `country` (string) - country code.
* `state` (object) - state of venue.
    - `stateCode` (string) - code of state.
* `city` (object) - citiy of venue.
    - `name` (string) - name of city.
* `postalCode` (string) - postal code of venue.
* `address` (object) - address of venue.
    - `line1` (string) - address line 1.
    - `line2` (string) - address line 2.
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
  url:"https://app.ticketmaster.com/discovery/v1/venues/90150.json?apikey={apikey}",
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
--include 'https://app.ticketmaster.com/discovery/v1/venues/90150.json?apikey={apikey}'
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /discovery/v1/venues/90150.json?apikey=**** HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Access-Control-Allow-Headers: origin, x-requested-with, accept
Access-Control-Allow-Origin: *
Date: Tue, 01 Dec 2015 13:07:04 GMT
Content-Length: 641
Access-Control-Max-Age: 3628800
Access-Control-Allow-Methods: GET, PUT, POST, DELETE
X-Application-Context: application:default,jetson1
Connection: keep-alive
Content-Type: application/json;charset=utf-8
Server: Apache-Coyote/1.1
Set-Cookie: ****

{
  "name": "Hollywood Bowl",
  "locale": "en-us",
  "marketId":  [
    27
  ],
  "country":  {
    "countryCode": "US"
  },
  "state":  {
    "stateCode": "CA"
  },
  "city":  {
    "name": "Hollywood"
  },
  "postalCode": "90068",
  "address":  {
    "line1": "2301 N Highland Ave",
    "line2": "Hollywood, CA"
  },
  "timeZone": "America/Los_Angeles",
  "_links":  {
    "self":  {
      "href": "/discovery/v1/venues/90150?locale=en-us&domain=ticketmaster.com"
    }
  },
  "id": "90150",
  "type": "venue"
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


## Supported Domains
{: .article #supported-domains}

| Domain				                         | 
| :----------------------------------------------|
| ticketmaster.com		                         |
| ticketmaster.ca		                         |
| ticketmaster.mx		                         |
| ticketmaster.au		                         |
| ticketmaster.nz		                         |
| livenation.com		                         |

## Supported Sources
{: .article #supported-sources}

| Source	|
|:----------|
| ticketweb	|
| universe	|
| frontgate	|


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
