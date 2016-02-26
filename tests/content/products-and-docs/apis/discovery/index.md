---
layout: documentation
categories:
- documentation
- discovery
---

#Discovery API

Use the Discovery API to search, look up and find events, attractions and venues. The API provides access to all Ticketmaster events for North America and International, as well as Universe, TicketWeb and Front Gate events.
{: .lead .article}

####Developer Console
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


##Search Events
{: .article .console-link #srch-events }

**Method:** GET.
Authentication required.
Returns the 20 most recent events for the authenticating user.

discovery/{version}/events.{format}
{: .code .red}

###URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v1"         | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |

###Query parameters:

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


{: .aside}
>[JS](#js)
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
curl https://app.ticketmaster.com/discovery/v1/events.json?size=1&apikey={apikey}
{% endhighlight %}






##Get Event Details
{: .article .console-link #event-details }

**Method:** GET.
Authentication required.
Returns the event detail by event ID.

discovery/{version}/events/{id}.{format}
{: .code .red}


###URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v1"         | Yes      |
| `id`       | Event ID. Required.  | string            | "29004F223C406ABF" | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |

###Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `domain`   | The entity interested in this event (special use case). | string           |      "ticketmaster.com"     | No      |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |              | No      |

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

{: .aside}
>[JS](#js)
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
curl https://app.ticketmaster.com/discovery/v1/events/0B004F0401BD55E5.json?apikey={apikey}
{% endhighlight %}





##Search Event Images
{: .article .console-link #event-img}

**Method:** GET.
Authentication required.
Returns all the images for an event by ID. If an event does not have an image for a supported resolution, the event's major category image will be returned instead.

{: .code .red}
discovery/{version}/events/{id}/images.{format}

###URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v1"         | Yes      |
| `id`       | Event ID.            | string            | "0B004F0401BD55E5" | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |

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
}
{% endhighlight %}

{: .aside}
>[JS](#js)
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
curl https://app.ticketmaster.com/discovery/v1/events/0B004F0401BD55E5/images.json?apikey={apikey}
{% endhighlight %}


{: .article .console-link #search-attractions}
##Search Attractions

**Method:** GET.
Authentication required..
Search Attractions!

{: .code .red}
discovery/{version}/attractions.{format}

###URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v1"         | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |

###Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `keyword`  | A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.     | string            |                | No      |
| `domain`   | The entity interested in this event (special use case). | string           |      "ticketmaster.com"     | No      |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |              | No      |
| `size`   | The number of events returned in the API response. | string            |       "10"       | No      |
| `page`   | The page for paginating through the results. | string            |       "1"       | No      |
| `sort`   | The search sort criteria. Values: "name,desc", "name,asc". | string            |              | No      |

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

{: .aside}
>[JS](#js)
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
curl https://app.ticketmaster.com/discovery/v1/attractions.json?apikey={apikey}
{% endhighlight %}

