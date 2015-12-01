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
  Values: 
  - "", 
  - "eventDate,desc", 
  - "eventDate,asc", 
  - "name,desc", 
  - "name,asc";
- locale - The event locale, including country and localization. 
  Values: 
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

##Event Details

Method: GET. 

Authentication required.

~~~
discovery/{version}/events/{id}.{format}
~~~

Returns the event detail by event ID.

###Template parameters:

- version - The API Version. Required. Default value "v1";
- id - Event ID. Required. Default value "29004F223C406ABF";
- format - API Response Format. Required. Default value "json".

###Query parameters:

- domain - The entity interested in this event (special use case). Default value "ticketmaster.com";
- locale - The event locale, including country and localization. 
  Values: 
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

###Event Details examples

####Returns event details.

Request

~~~
https://app.ticketmaster.com/discovery/v1/events/0B004F0401BD55E5.json
~~~

Response

~~~json
{
  "name" : "Los Angeles Ballet Presents the Nutcracker",
  "locale" : "en-us",
  "promoterId" : [ 494 ],
  "dates" : {
    "start" : {
      "dateTime" : "2015-12-09T03:30:00.000+0000",
      "localDate" : "2015-12-08",
      "localTime" : "19:30:00"
    },
    "end" : {
      "dateTime" : "2015-12-09T03:30:00.000+0000",
      "localDate" : "2015-12-08",
      "localTime" : "19:30:00"
    },
    "timezone" : "America/Los_Angeles",
    "displayOptions" : {
      "range" : {
        "localStartDate" : "2015-12-08",
        "localEndDate" : "2015-12-08"
      }
    },
    "status" : {
      "code" : "active"
    }
  },
  "test" : false,
  "groupId" : "BC453299",
  "_links" : {
    "self" : {
      "href" : "/discovery/v1/events/0B004F0401BD55E5?locale=en-us&domain=ticketmaster.com"
    },
    "categories" : [ {
      "href" : "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
    }, {
      "href" : "/discovery/v1/categories/12?locale=en-us&domain=ticketmaster.com"
    } ],
    "venue" : {
      "href" : "/discovery/v1/venues/90340?locale=en-us&domain=ticketmaster.com"
    },
    "attractions" : {
      "href" : "/discovery/v1/attractions/1250716?locale=en-us&domain=ticketmaster.com"
    }
  },
  "id" : "0B004F0401BD55E5",
  "_embedded" : {
    "venue" : [ {
      "name" : "Valley Performing Arts Center",
      "marketId" : [ 27 ],
      "country" : {
        "countryCode" : "US"
      },
      "state" : {
        "stateCode" : "CA"
      },
      "city" : {
        "name" : "Northridge"
      },
      "location" : {
        "latitude" : "34.236073500",
        "longitude" : "-118.527374300"
      },
      "postalCode" : "91330",
      "address" : {
        "line1" : "18111 Nordhoff Street",
        "line2" : "Northridge, CA"
      },
      "timeZone" : "America/Los_Angeles",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/venues/90340?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "90340",
      "type" : "venue"
    } ],
    "categories" : [ {
      "name" : "Arts & Theater",
      "level" : 1,
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "10002",
      "type" : "category"
    }, {
      "name" : "Ballet and Dance",
      "level" : 2,
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/categories/12?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "12",
      "type" : "category"
    } ],
    "attractions" : [ {
      "url" : "/Los-Angeles-Ballet-Presents-the-Nutcracker-tickets/artist/1250716",
      "image" : {
        "url" : "/dam/a/2c3/0821e82a-6024-44ff-9a01-f850c38682c3_44411_EVENT_DETAIL_PAGE_16_9.jpg"
      },
      "name" : "Los Angeles Ballet Presents the Nutcracker",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/attractions/1250716?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "1250716",
      "type" : "attraction"
    } ]
  },
  "type" : "event",
  "_links" : {
    "self" : {
      "href" : "/discovery/v1/events/0B004F0401BD55E5?locale=en-us&domain=ticketmaster.com"
    },
    "categories" : [ {
      "href" : "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
    }, {
      "href" : "/discovery/v1/categories/12?locale=en-us&domain=ticketmaster.com"
    } ],
    "venue" : {
      "href" : "/discovery/v1/venues/90340?locale=en-us&domain=ticketmaster.com"
    },
    "attractions" : {
      "href" : "/discovery/v1/attractions/1250716?locale=en-us&domain=ticketmaster.com"
    }
  }
}
~~~


##Event Images

Method: GET. 

Authentication required.

~~~
discovery/{version}/events/{id}/images.{format}
~~~

Returns all the images for an event by ID. If an event does not have an image for a supported resolution, the event's major category image will be returned instead.

###Template parameters:

- version - The API Version. Required. Default value "v1";
- id - Event ID. Required. Default value "0B004F0401BD55E5";
- format - API Response Format. Required. Default value "json".

###Event Images examples

####Returns event images.

Request

~~~
https://app.ticketmaster.com/discovery/v1/events/0B004F0401BD55E5/images.json
~~~

Response

~~~json
{"type":"event","id":"0B004F0401BD55E5","images":[{"ratio":"16_9","url":"http://s1.ticketm.net/dam/a/2c3/0821e82a-6024-44ff-9a01-f850c38682c3_44411_RETINA_PORTRAIT_16_9.jpg","width":640,"height":360,"fallback":false},{"ratio":"16_9","url":"http://s1.ticketm.net/dam/a/2c3/0821e82a-6024-44ff-9a01-f850c38682c3_44411_RETINA_LANDSCAPE_16_9.jpg","width":1136,"height":639,"fallback":false},{"ratio":"16_9","url":"http://s1.ticketm.net/dam/a/2c3/0821e82a-6024-44ff-9a01-f850c38682c3_44411_TABLET_LANDSCAPE_LARGE_16_9.jpg","width":2048,"height":1152,"fallback":false},{"ratio":"4_3","url":"http://s1.ticketm.net/dam/a/2c3/0821e82a-6024-44ff-9a01-f850c38682c3_44411_CUSTOM.jpg","width":305,"height":225,"fallback":false},{"ratio":"3_2","url":"http://s1.ticketm.net/dam/a/2c3/0821e82a-6024-44ff-9a01-f850c38682c3_44411_TABLET_LANDSCAPE_3_2.jpg","width":1024,"height":683,"fallback":false},{"ratio":"16_9","url":"http://s1.ticketm.net/dam/a/2c3/0821e82a-6024-44ff-9a01-f850c38682c3_44411_TABLET_LANDSCAPE_16_9.jpg","width":1024,"height":576,"fallback":false},{"ratio":"3_2","url":"http://s1.ticketm.net/dam/a/2c3/0821e82a-6024-44ff-9a01-f850c38682c3_44411_ARTIST_PAGE_3_2.jpg","width":305,"height":203,"fallback":false},{"ratio":"16_9","url":"http://s1.ticketm.net/dam/a/2c3/0821e82a-6024-44ff-9a01-f850c38682c3_44411_RECOMENDATION_16_9.jpg","width":100,"height":56,"fallback":false},{"ratio":"3_2","url":"http://s1.ticketm.net/dam/a/2c3/0821e82a-6024-44ff-9a01-f850c38682c3_44411_RETINA_PORTRAIT_3_2.jpg","width":640,"height":427,"fallback":false},{"ratio":"16_9","url":"http://s1.ticketm.net/dam/a/2c3/0821e82a-6024-44ff-9a01-f850c38682c3_44411_EVENT_DETAIL_PAGE_16_9.jpg","width":205,"height":115,"fallback":false}],"_links":{"self":{"href":"/discovery/v1/events/0B004F0401BD55E5/images.json"}}}
~~~

##Search Attractions

Method: GET. 

Authentication required.

~~~
discovery/{version}/attractions.{format}
~~~

Search Attractions!

###Template parameters:

- version - The API Version. Required. Default value "v1";
- format - API Response Format. Required. Default value "json".

###Query parameters:

- keyword - A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.
- domain - The entity interested in this event (special use case). Default value "ticketmaster.com";
- locale - The event locale, including country and localization. 
  Values: 
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
- size - The number of events returned in the API response. Default value "10";
- page - The page for paginating through the results. Default value "1";
- sort - The search sort criteria. 
  Values: 
  - "", 
  - "name,desc", 
  - "name,asc";

###Search Attractions examples

####Returns search result.

Request

~~~
https://app.ticketmaster.com/discovery/v1/attractions.json?
~~~

Response

~~~json
{
  "_links" : {
    "self" : {
      "href" : "/discovery/v1/attractions.json{?page,size,sort}",
      "templated" : true
    },
    "next" : {
      "href" : "/discovery/v1/attractions.json?page=1&size=20{&sort}",
      "templated" : true
    }
  },
  "_embedded" : {
    "attractions" : [ {
      "url" : "/artist/919340",
      "image" : {
        "url" : "/dam/a/418/aa73b994-9912-4535-ba21-4865ae93a418_41291_EVENT_DETAIL_PAGE_16_9.jpg"
      },
      "name" : "!!!",
      "locale" : "en-us",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/attractions/919340?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "919340",
      "type" : "attraction"
    }, {
      "url" : "/TEST-EVENT-NOT-FOR-SALE-tickets/artist/2188271",
      "name" : "!!!! TEST EVENT. NOT FOR SALE. PURCHASES WILL BE VOIDED !!!!",
      "locale" : "en-us",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/attractions/2188271?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "2188271",
      "type" : "attraction"
    }, {
      "url" : "/Hero-tickets/artist/883184",
      "name" : "!Hero",
      "locale" : "en-us",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/attractions/883184?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "883184",
      "type" : "attraction"
    }, {
      "url" : "/Tang-tickets/artist/1673094",
      "name" : "!Tang",
      "locale" : "en-us",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/attractions/1673094?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "1673094",
      "type" : "attraction"
    }, {
      "url" : "/Women-Art-Revolution-tickets/artist/1643423",
      "name" : "!Women Art Revolution",
      "locale" : "en-us",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/attractions/1643423?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "1643423",
      "type" : "attraction"
    }, {
      "url" : "/A-Choral-Holiday-tickets/artist/2178282",
      "name" : "\"A Choral Holiday\"",
      "locale" : "en-us",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/attractions/2178282?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "2178282",
      "type" : "attraction"
    }, {
      "url" : "/A-John-Denver-Christmas-Tribute-tickets/artist/2163030",
      "name" : "\"A John Denver Christmas Tribute\" - Chris Collins & Boulder Canyon",
      "locale" : "en-us",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/attractions/2163030?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "2163030",
      "type" : "attraction"
    }, {
      "url" : "/A-Vivir-Con-Odin-Dupeyron-tickets/artist/2130498",
      "image" : {
        "url" : "/dbimages/212397a.jpg"
      },
      "name" : "\"A Vivir\" Con Odin Dupeyron",
      "locale" : "en-us",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/attractions/2130498?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "2130498",
      "type" : "attraction"
    }, {
      "url" : "/A-Sides-tickets/artist/759799",
      "name" : "\"A\" Sides",
      "locale" : "en-us",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/attractions/759799?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "759799",
      "type" : "attraction"
    }, {
      "url" : "/BLUE-MAN-GROUP-tickets/artist/2168522",
      "name" : "\"BLUE MAN GROUP\"",
      "locale" : "en-us",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/attractions/2168522?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "2168522",
      "type" : "attraction"
    }, {
      "url" : "/Dee-tickets/artist/767040",
      "name" : "\"Dee\"",
      "locale" : "en-us",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/attractions/767040?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "767040",
      "type" : "attraction"
    }, {
      "url" : "/El-Cascanueces-Ballet-Ruso-de-Samara-tickets/artist/2182975",
      "name" : "\"El Cascanueces\" Ballet Ruso de Samara",
      "locale" : "en-us",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/attractions/2182975?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "2182975",
      "type" : "attraction"
    }, {
      "url" : "/Givin-the-Dog-a-Bone-KY-tickets/artist/2174785",
      "name" : "\"Givin' the Dog a Bone\" KY Humane Society benefit feat. Thunderstruck",
      "locale" : "en-us",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/attractions/2174785?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "2174785",
      "type" : "attraction"
    }, {
      "url" : "/I-FEEL-GOOD-THE-JAMES-BROWN-tickets/artist/2083045",
      "name" : "\"I FEEL GOOD\" THE JAMES BROWN STORY",
      "locale" : "en-us",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/attractions/2083045?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "2083045",
      "type" : "attraction"
    }, {
      "url" : "/Its-a-Wonderful-Life-with-ZuzuA-tickets/artist/2154063",
      "name" : "\"It's a Wonderful Life with Zuzu\"-A Conversation with Karolyn Grimes",
      "locale" : "en-us",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/attractions/2154063?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "2154063",
      "type" : "attraction"
    }, {
      "url" : "/LOVE-With-Andrey-Makarevich-tickets/artist/2170300",
      "name" : "\"L.O.V.E.\" With Andrey Makarevich",
      "locale" : "en-us",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/attractions/2170300?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "2170300",
      "type" : "attraction"
    }, {
      "url" : "/La-Reina-de-las-Nieves-Ballet-tickets/artist/2175716",
      "name" : "\"La Reina de las Nieves\" Ballet Circo de Moscú",
      "locale" : "en-us",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/attractions/2175716?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "2175716",
      "type" : "attraction"
    }, {
      "url" : "/Ladies-in-Love-A-Valentines-tickets/artist/2164933",
      "name" : "\"Ladies in Love\" - A Valentine's Day Affair feat. SHERMA ANDREWS",
      "locale" : "en-us",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/attractions/2164933?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "2164933",
      "type" : "attraction"
    }, {
      "url" : "/Mentiras-El-Musical-tickets/artist/1537157",
      "name" : "\"Mentiras\" El Musical",
      "locale" : "en-us",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/attractions/1537157?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "1537157",
      "type" : "attraction"
    }, {
      "url" : "/My-Spirit-Animal-is-A-Butch-tickets/artist/2140956",
      "name" : "\"My Spirit Animal is A Butch Lesbian\" featuring Sampson",
      "locale" : "en-us",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/attractions/2140956?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "2140956",
      "type" : "attraction"
    } ]
  },
  "page" : {
    "size" : 20,
    "totalElements" : 256992,
    "totalPages" : 12850,
    "number" : 0
  }
}
~~~

##Attraction Details

Method: GET. 

Authentication required.

~~~
discovery/{version}/attractions/{id}.{format}
~~~

Search Attractions!

###Template parameters:

- version - The API Version. Required. Default value "v1";
- id - Attraction ID. Required. Default value "768011";
- format - API Response Format. Required. Default value "json".

###Query parameters:

- domain - The entity interested in this event (special use case). Default value "ticketmaster.com";
- locale - The event locale, including country and localization. 
  Values: 
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

###Attraction Details examples

####Returns the attraction detail by ID..

Request

~~~
https://app.ticketmaster.com/discovery/v1/attractions/768011.json
~~~

Response

~~~json
{
  "url" : "/Madonna-tickets/artist/768011",
  "image" : {
    "url" : "/dbimages/213810a.jpg"
  },
  "name" : "Madonna",
  "locale" : "en-us",
  "_links" : {
    "self" : {
      "href" : "/discovery/v1/attractions/768011?locale=en-us&domain=ticketmaster.com"
    }
  },
  "id" : "768011",
  "type" : "attraction",
  "_links" : {
    "self" : {
      "href" : "/discovery/v1/attractions/768011?locale=en-us&domain=ticketmaster.com"
    }
  }
}
~~~

##Search Categories

Method: GET. 

Authentication required.

~~~
discovery/{version}/categories.{format}
~~~

Search Categories!

###Template parameters:

- version - The API Version. Required. Default value "v1";
- format - API Response Format. Required. Default value "json".

###Query parameters:

- keyword - A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.
- domain - The entity interested in this event (special use case). Default value "ticketmaster.com";
- locale - The event locale, including country and localization. 
  Values: 
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
- size - The number of events returned in the API response. Default value "10";
- page - The page for paginating through the results. Default value "1";
- sort - The search sort criteria. 
  Values: 
  - "", 
  - "name,desc", 
  - "name,asc";

###Search Categories examples

####Returns search result.

Request

~~~
https://app.ticketmaster.com/discovery/v1/categories.json
~~~

Response

~~~json
{
  "_links" : {
    "self" : {
      "href" : "/discovery/v1/categories.json{?page,size,sort}",
      "templated" : true
    },
    "next" : {
      "href" : "/discovery/v1/categories.json?page=1&size=20{&sort}",
      "templated" : true
    }
  },
  "_embedded" : {
    "categories" : [ {
      "name" : "Plays",
      "locale" : "en-us",
      "level" : 2,
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/categories/32?locale=en-us&domain=ticketmaster.com"
        },
        "parent" : {
          "href" : "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "32",
      "type" : "category"
    }, {
      "name" : "Classical",
      "locale" : "en-us",
      "level" : 2,
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/categories/203?locale=en-us&domain=ticketmaster.com"
        },
        "parent" : {
          "href" : "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "203",
      "type" : "category"
    }, {
      "name" : "Ballet and Dance",
      "locale" : "en-us",
      "level" : 2,
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/categories/12?locale=en-us&domain=ticketmaster.com"
        },
        "parent" : {
          "href" : "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "12",
      "type" : "category"
    }, {
      "name" : "Opera",
      "locale" : "en-us",
      "level" : 2,
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/categories/13?locale=en-us&domain=ticketmaster.com"
        },
        "parent" : {
          "href" : "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "13",
      "type" : "category"
    }, {
      "name" : "Museums and Exhibits",
      "locale" : "en-us",
      "level" : 2,
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/categories/14?locale=en-us&domain=ticketmaster.com"
        },
        "parent" : {
          "href" : "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "14",
      "type" : "category"
    }, {
      "name" : "Musicals",
      "locale" : "en-us",
      "level" : 2,
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/categories/207?locale=en-us&domain=ticketmaster.com"
        },
        "parent" : {
          "href" : "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "207",
      "type" : "category"
    }, {
      "name" : "Broadway",
      "locale" : "en-us",
      "level" : 2,
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/categories/16?locale=en-us&domain=ticketmaster.com"
        },
        "parent" : {
          "href" : "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "16",
      "type" : "category"
    }, {
      "name" : "Audio Tours",
      "locale" : "en-us",
      "level" : 2,
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/categories/240?locale=en-us&domain=ticketmaster.com"
        },
        "parent" : {
          "href" : "/discovery/v1/categories/10005?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "240",
      "type" : "category"
    }, {
      "name" : "Off-Broadway",
      "locale" : "en-us",
      "level" : 2,
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/categories/17?locale=en-us&domain=ticketmaster.com"
        },
        "parent" : {
          "href" : "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "17",
      "type" : "category"
    }, {
      "name" : "Magic Shows",
      "locale" : "en-us",
      "level" : 2,
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/categories/209?locale=en-us&domain=ticketmaster.com"
        },
        "parent" : {
          "href" : "/discovery/v1/categories/10003?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "209",
      "type" : "category"
    }, {
      "name" : "Arts & Theater",
      "locale" : "en-us",
      "level" : 1,
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "10002",
      "type" : "category"
    }, {
      "name" : "Comedy",
      "locale" : "en-us",
      "level" : 2,
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/categories/51?locale=en-us&domain=ticketmaster.com"
        },
        "parent" : {
          "href" : "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "51",
      "type" : "category"
    }, {
      "name" : "Family",
      "locale" : "en-us",
      "level" : 1,
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/categories/10003?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "10003",
      "type" : "category"
    }, {
      "name" : "Family Attractions",
      "locale" : "en-us",
      "level" : 2,
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/categories/19?locale=en-us&domain=ticketmaster.com"
        },
        "parent" : {
          "href" : "/discovery/v1/categories/10003?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "19",
      "type" : "category"
    }, {
      "name" : "More Arts and Theater",
      "locale" : "en-us",
      "level" : 2,
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/categories/53?locale=en-us&domain=ticketmaster.com"
        },
        "parent" : {
          "href" : "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "53",
      "type" : "category"
    }, {
      "name" : "Miscellaneous",
      "locale" : "en-us",
      "level" : 1,
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/categories/10005?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "10005",
      "type" : "category"
    }, {
      "name" : "Fairs and Festivals",
      "locale" : "en-us",
      "level" : 2,
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/categories/54?locale=en-us&domain=ticketmaster.com"
        },
        "parent" : {
          "href" : "/discovery/v1/categories/10003?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "54",
      "type" : "category"
    }, {
      "name" : "Ice Shows",
      "locale" : "en-us",
      "level" : 2,
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/categories/22?locale=en-us&domain=ticketmaster.com"
        },
        "parent" : {
          "href" : "/discovery/v1/categories/10003?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "22",
      "type" : "category"
    }, {
      "name" : "Children's Music and Theater",
      "locale" : "en-us",
      "level" : 2,
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/categories/23?locale=en-us&domain=ticketmaster.com"
        },
        "parent" : {
          "href" : "/discovery/v1/categories/10003?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "23",
      "type" : "category"
    }, {
      "name" : "More Family",
      "locale" : "en-us",
      "level" : 2,
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/categories/55?locale=en-us&domain=ticketmaster.com"
        },
        "parent" : {
          "href" : "/discovery/v1/categories/10003?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "55",
      "type" : "category"
    }, {
      "name" : "Circus",
      "locale" : "en-us",
      "level" : 2,
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/categories/29?locale=en-us&domain=ticketmaster.com"
        },
        "parent" : {
          "href" : "/discovery/v1/categories/10003?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "29",
      "type" : "category"
    } ]
  },
  "page" : {
    "size" : 20,
    "totalElements" : 76,
    "totalPages" : 4,
    "number" : 0
  }
}
~~~

##Category Details

Method: GET. 

Authentication required.

~~~
discovery/{version}/categories/{id}.{format}
~~~

Returns the category detail by ID.

###Template parameters:

- version - The API Version. Required. Default value "v1";
- id - Category ID. Required. Default value "203";
- format - API Response Format. Required. Default value "json".

###Query parameters:

- domain - The entity interested in this event (special use case). Default value "ticketmaster.com";
- locale - The event locale, including country and localization. 
  Values: 
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

###Category Details examples

####Returns the category detail by ID..

Request

~~~
https://app.ticketmaster.com/discovery/v1/categories/203.json
~~~

Response

~~~json
{
  "name" : "Classical",
  "locale" : "en-us",
  "level" : 2,
  "_links" : {
    "self" : {
      "href" : "/discovery/v1/categories/203?locale=en-us&domain=ticketmaster.com"
    },
    "parent" : {
      "href" : "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
    }
  },
  "id" : "203",
  "type" : "category",
  "_links" : {
    "self" : {
      "href" : "/discovery/v1/categories/203?locale=en-us&domain=ticketmaster.com"
    },
    "parent" : {
      "href" : "/discovery/v1/categories/10002?locale=en-us&domain=ticketmaster.com"
    }
  }
}
~~~

##Search Venues

Method: GET. 

Authentication required.

~~~
discovery/{version}/venues.{format}
~~~

Search Venues!

###Template parameters:

- version - The API Version. Required. Default value "v1";
- format - API Response Format. Required. Default value "json".

###Query parameters:

- keyword - A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.
- domain - The entity interested in this event (special use case). Default value "ticketmaster.com";
- locale - The event locale, including country and localization. 
  Values: 
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
- size - The number of events returned in the API response. Default value "10";
- page - The page for paginating through the results. Default value "1";
- sort - The search sort criteria. 
  Values: 
  - "", 
  - "name,desc", 
  - "name,asc";

###Search Venues examples

####Returns search result.

Request

~~~
http://app.ticketmaster.com/discovery/v1/venues.json?keyword=UCV
~~~

Response

~~~json
{
  "_links" : {
    "self" : {
      "href" : "/discovery/v1/venues.json?keyword=UCV{&page,size,sort}",
      "templated" : true
    }
  },
  "_embedded" : {
    "venues" : [ {
      "name" : "#1 Please do not use, left over from UCV initial acct set up",
      "locale" : "en-us",
      "marketId" : [ 103 ],
      "country" : {
        "countryCode" : "CA"
      },
      "state" : {
        "stateCode" : "ON"
      },
      "city" : {
        "name" : "Morrisburg"
      },
      "postalCode" : "K0C1X0",
      "address" : {
        "line1" : "Crysler Park Marina, 13480 County Rd 2",
        "line2" : "Morrisburg, ON"
      },
      "timeZone" : "America/Toronto",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/venues/341396?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "341396",
      "type" : "venue"
    }, {
      "name" : "#2 Please do not use, left over from UCV initial acct set up",
      "locale" : "en-us",
      "marketId" : [ 103 ],
      "country" : {
        "countryCode" : "CA"
      },
      "state" : {
        "stateCode" : "ON"
      },
      "city" : {
        "name" : "Morrisburg"
      },
      "postalCode" : "K0C1X0",
      "address" : {
        "line1" : "13740 County Road 2",
        "line2" : "Morrisburg, ON"
      },
      "timeZone" : "America/Toronto",
      "_links" : {
        "self" : {
          "href" : "/discovery/v1/venues/341395?locale=en-us&domain=ticketmaster.com"
        }
      },
      "id" : "341395",
      "type" : "venue"
    } ]
  },
  "page" : {
    "size" : 20,
    "totalElements" : 2,
    "totalPages" : 1,
    "number" : 0
  }
}

##Venue Details

Method: GET. 

Authentication required.

~~~
discovery/{version}/venues/{id}.{format}
~~~

Returns the venue detail by ID.

###Template parameters:

- version - The API Version. Required. Default value "v1";
- id - Venue ID. Required. Default value "90150";
- format - API Response Format. Required. Default value "json".

###Query parameters:

- domain - The entity interested in this event (special use case). Default value "ticketmaster.com";
- locale - The event locale, including country and localization. 
  Values: 
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

###Venue Details examples

####Returns the venue detail by ID..

Request

~~~
https://http://app.ticketmaster.com/discovery/v1/venues/90150.json
~~~

Response

~~~json
{
  "name" : "Hollywood Bowl",
  "locale" : "en-us",
  "marketId" : [ 27 ],
  "country" : {
    "countryCode" : "US"
  },
  "state" : {
    "stateCode" : "CA"
  },
  "city" : {
    "name" : "Hollywood"
  },
  "postalCode" : "90068",
  "address" : {
    "line1" : "2301 N Highland Ave",
    "line2" : "Hollywood, CA"
  },
  "timeZone" : "America/Los_Angeles",
  "_links" : {
    "self" : {
      "href" : "/discovery/v1/venues/90150?locale=en-us&domain=ticketmaster.com"
    }
  },
  "id" : "90150",
  "type" : "venue",
  "_links" : {
    "self" : {
      "href" : "/discovery/v1/venues/90150?locale=en-us&domain=ticketmaster.com"
    }
  }
}
~~~