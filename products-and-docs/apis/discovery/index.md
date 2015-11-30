---
layout: documentation
---

#Discovery REST API

##Search Events

Method: GET. 

Authentication required.

~~~
discovery/{version}/events.{format}
~~~

Returns the 20 most recent events for the authenticating user.

###Template parameters:

- version - The API Version. Required. Default value "v1";
- format - API Response Format. Required. Default value "json".

###Query parameters:

- keyword - A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.
- attractionId - Attraction ID(s) separated by comma. Default value "768011";
- venueId - Venue ID(s) separated by comma. Default value "115378";
- promoterId - Promoter ID(s) separated by comma. Default value "494";
- zipCode - Zipcode or Portal Code of the venue in which the event is taking place. Default value "90069";
- latlong - The longitude/Latitude coordinates for the venue in which this event is taking place. Default value "34.0928090,-118.3286610";
- radius - The radius of the area in which we want to search for events. Default value "25";
- size - The number of events returned in the API response. Default value "10";
- page - The page for paginating through the results. Default value "1";
- sort - The search sort criteria. 
  - Values: 
  - "", 
  - "eventDate,desc", 
  - "eventDate,asc", 
  - "name,desc", 
  - "name,asc";
- locale - The event locale, including country and localization. 
  - Values: 
  - "", 
  - "en-us", 
  - "en-gb", 
  - "en-ca", 
  - "es-us", 
  - "en-mx", 
  - "es-mx",  
  - "en-au", 
  - "en-nz", 
  - "fr-fr", 
  - "fr-ca";
- marketId - The city/area in which this event takes place. Default value "27";
- deviceId - The device making the API call. Default value "1";
- domain - The entity interested in this event (special use case). Default value "ticketmaster.com";

###Search Events examples

####Returns the 1 most recent event for the authenticating user.

Request

~~~
https://app.ticketmaster.com/discovery/v1/events.json?size=1
~~~

Response

~~~json
{
  "_links":  {
    "self":  {
      "href": "/discovery/v1/events.json?size=1{&page,sort}",
      "templated": true
    },
    "next":  {
      "href": "/discovery/v1/events.json?page=1&size=1{&sort}",
      "templated": true
    }
  },
  "_embedded":  {
    "events":  [
       {
        "name": "New York Yankees Stadium Tour",
        "locale": "en-us",
        "promoterId":  [
          685
        ],
        "dates":  {
          "start":  {
            "dateTime": "2015-11-30T05:00:00.000+0000",
            "localDate": "2015-11-30",
            "localTime": "00:00:00"
          },
          "end":  {
            "dateTime": "2015-11-30T05:00:00.000+0000",
            "localDate": "2015-11-30",
            "localTime": "00:00:00"
          },
          "timezone": "America/New_York",
          "displayOptions":  {
            "range":  {
              "localStartDate": "2015-11-30",
              "localEndDate": "2015-11-30"
            }
          },
          "status":  {
            "code": "active"
          }
        },
        "test": false,
        "groupId": "BC473703",
        "_links":  {
          "self":  {
            "href": "/discovery/v1/events/1D004E3BB6A43DF6?locale=en-us&domain=ticketmaster.com"
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
          "attractions":  {
            "href": "/discovery/v1/attractions/875284?locale=en-us&domain=ticketmaster.com"
          }
        },
        "id": "1D004E3BB6A43DF6",
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
              "url": "/New-York-Yankees-Stadium-Tour-tickets/artist/875284",
              "image":  {
                "url": "/dbimages/112576a.jpg"
              },
              "name": "New York Yankees Stadium Tour",
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
    "totalElements": 55541,
    "totalPages": 55541,
    "number": 0
  }
}
~~~

####Returns events for the keyword "Iron Maiden" on venue with id "107150"

Request

~~~
https://app.ticketmaster.com/discovery/v1/events.json?keyword=Iron%20Maiden&venueId=107150
~~~

Response

~~~json
{
  "_links" : {
    "self" : {
      "href" : "/discovery/v1/events.json?venueId=107150&keyword=Iron+Maiden{&page,size,sort}",
      "templated" : true
    }
  },
  "_embedded" : {
    "events" : [ {
      "name" : "Iron Maiden: The Book Of Souls World Tour 2016",
      "locale" : "en-us",
      "promoterId" : [ 830 ],
      "dates" : {
        "start" : {
          "dateTime" : "2016-02-25T00:50:00.000+0000",
          "localDate" : "2016-02-24",
          "localTime" : "19:50:00"
        },
        "end" : {
          "dateTime" : "2016-02-25T00:50:00.000+0000",
          "localDate" : "2016-02-24",
          "localTime" : "19:50:00"
        },
        "timezone" : "America/New_York",
        "displayOptions" : {
          "range" : {
            "localStartDate" : "2016-02-24",
            "localEndDate" : "2016-02-24"
          }
        },
        "status" : {
          "code" : "active"
        }
      },
      "test" : false,
      "groupId" : "Event+0D004F41DAEFAFFB+en-us+1",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/events/0D004F41DAEFAFFB?locale=en-us&domain=ticketmaster.com"
        },
        "categories" : [ {
          "href" : "/discovery/v1/categories/10001?locale=en-us&domain=ticketmaster.com"
        }, {
          "href" : "/discovery/v1/categories/200?locale=en-us&domain=ticketmaster.com"
        } ],
        "venue" : {
          "href" : "/discovery/v1/venues/107150?locale=en-us&domain=ticketmaster.com"
        },
        "attractions" : [ {
          "href" : "/discovery/v1/attractions/735341?locale=en-us&domain=ticketmaster.com"
        }, {
          "href" : "/discovery/v1/attractions/2169443?locale=en-us&domain=ticketmaster.com"
        } ]
      },
      "id" : "0D004F41DAEFAFFB",
      "_embedded" : {
        "venue" : [ {
          "name" : "BB&T Center",
          "marketId" : [ 15 ],
          "country" : {
            "countryCode" : "US"
          },
          "state" : {
            "stateCode" : "FL"
          },
          "city" : {
            "name" : "Sunrise"
          },
          "location" : {
            "latitude" : "26.155362000",
            "longitude" : "-80.330230000"
          },
          "postalCode" : "33323",
          "address" : {
            "line1" : "1 Panther Parkway",
            "line2" : "Sunrise, FL"
          },
          "timeZone" : "America/New_York",
          "_links" : {
            "self" : {
              "href" : "/discovery/v1/venues/107150?locale=en-us&domain=ticketmaster.com"
            }
          },
          "id" : "107150",
          "type" : "venue"
        } ],
        "categories" : [ {
          "name" : "Music",
          "level" : 1,
          "_links" : {
            "self" : {
              "href" : "/discovery/v1/categories/10001?locale=en-us&domain=ticketmaster.com"
            }
          },
          "id" : "10001",
          "type" : "category"
        }, {
          "name" : "Hard Rock/Metal",
          "level" : 2,
          "_links" : {
            "self" : {
              "href" : "/discovery/v1/categories/200?locale=en-us&domain=ticketmaster.com"
            }
          },
          "id" : "200",
          "type" : "category"
        } ],
        "attractions" : [ {
          "url" : "/Iron-Maiden-tickets/artist/735341",
          "image" : {
            "url" : "/dam/a/715/f0257ba0-a8a0-400d-99a9-375b4640e715_38761_EVENT_DETAIL_PAGE_16_9.jpg"
          },
          "name" : "Iron Maiden",
          "_links" : {
            "self" : {
              "href" : "/discovery/v1/attractions/735341?locale=en-us&domain=ticketmaster.com"
            }
          },
          "id" : "735341",
          "type" : "attraction"
        }, {
          "url" : "/The-Raven-Age-tickets/artist/2169443",
          "name" : "The Raven Age",
          "_links" : {
            "self" : {
              "href" : "/discovery/v1/attractions/2169443?locale=en-us&domain=ticketmaster.com"
            }
          },
          "id" : "2169443",
          "type" : "attraction"
        } ]
      },
      "type" : "event"
    } ]
  },
  "page" : {
    "size" : 20,
    "totalElements" : 1,
    "totalPages" : 1,
    "number" : 0
  }
}
~~~
