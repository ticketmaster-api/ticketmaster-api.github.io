---
layout: documentation
categories:
- documentation
- publish
---

# Publish API

Use the Publish API to publish events, venues and attractions. The API provides the opportunity to make your events, venues and attractions available within the Discovery API.
{: .lead .article}

#### Developer Console
{: .aside .gray}

Make live API calls right now in the interactive docs:

[INTERACTIVE DOCS](/products-and-docs/apis/interactive-console/){: .button}

## Overview
{: .article #overview }

### Authentication

To run a successful API call, you will need to pass your API Key as the query parameter  __apikey__.

Example: `https://app.ticketmaster.com/publish/v2/events?apikey=3QIvq55bS608ai6r8moig1WdW57bONry`

### Root URL

`https://app.ticketmaster.com/publish/{API version}`


## Publish Events
{: .article #publish-events }

**Method:** POST.
Authentication required.
Publish events accessible within the Discovery API.

publish/{version}/events
{: .code .red}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version` | The API Version.     | string            |       "v2"         | Yes      |

### Exemple of a minimal recommended request payload
{% highlight http %}
{
    "source" : {
        "id" : "test_id_0009",
        "name" : "test-source"
    },
    "test": true,
    "names": {
        "en-us": "example test event tnt1"
    },
    "publicVisibility": {
        "startDateTime": "2015-10-29T15:00:00Z",
        "visible": true
    },
    "dates": {
        "start": {
            "dateTime": "2016-04-15T01:00:00Z",
            "localDate": "2016-04-14",
            "localTime": "19:00:00"
        },
        "timezone": "America/Edmonton"
    },
    "venue": {
        "source" : {
            "id" : "test_venue_id_0001",
            "name" : "test-source"
        },
        "test": true,
        "currency": "USD",
        "country": {
            "countryCode": "US"
        }
    }
}
{% endhighlight %}

### Full request payload documentation

{: .nested-list}
- `additionalInfos` (object) - map of locale to value for any additional informations on the event.
- `attractions` (array) - list of attractions in the event.
    * `additionalInfos` (object) - map of locale to value for any additional informations on the attraction.
    * `descriptions` (object) - map of locale to value for the description of the attraction.
    * `id` (string) - the id of the attraction as returned by the Discovery API. If specified, all the other fields of the attraction will be ignored. Otherwise, a new attraction is created and embedded into the event.
    * `images` (array) - list of images of the attraction.
        - `height` (number) - the height of the image.
        - `ratio` (string) - the ratio of the image ex.: 3x2, 16x9, ...
        - `url` (string) - the URL of the image.
        - `width` (number) - the width of the image.
    * `names` (object) - map of locale to value for the names of the attraction.
    * `redirectUrl` (string) - the URL of the attraction on the publisher's site.
    * `source` (object) - the id and source name of the attraction. Must be specified if `id` is not.
        - `id` (string) - the publisher's id of the attraction.
        - `name` (string) - the publisher's name.
    * `test` (boolean) - true if this is a test attraction data, false otherwise (real attraction).
    * `version` (number) - the publisher's version for this attraction.
- `dates` (object) - all the dates related to the event.
    * `start` (object) - the start date of the event.
        - `localDate` (string) - the start date in the event timezone.
        - `localTime` (string) - the start time in the event timezone.
        - `dateTime` (string) - the start date and time of the event in UTC.
        - `dateTBD` (boolean) - true if the date is to be determined, false otherwise.
        - `dateTBA` (boolean) - true if the date is to be announced, false otherwise.
        - `timeTBA` (boolean) - true if the time is to be announced, false otherwise.
        - `noSpecificTime` (boolean) - true if the event starts at no specific time, false otherwise.
    * `access` (object) - the access date of the event.
        - `startDateTime` (string) - the start date and time of access to the event int UTC.
        - `startApproximate` (boolean) - true if the start date and time is approximate, false otherwise.
        - `endDateTime` (string) - the end date and time of access to the event int UTC.
        - `endApproximate` (boolean) - true if the end date and time is approximate, false otherwise.
    * `end` (object) - the end date of the event.
        - `localTime` (string) -  the end time in the event timezone.
        - `dateTime` (string) - the end date and time of the event in UTC.
        - `approximate` (boolean) - true if the end date and time are approximate, false otherwise.
    * `timezone` (string) - the timezone of the event.
    * `status` (object) - the status of the date of the event.
        - `code` (string) - the status code of the date of the event.
- `descriptions` (object) - map of locale to value for the description of the event.
- `images` (array) - list of images of the event.
    * `height` (number) - the height of the image.
    * `ratio` (string) - the ratio of the image ex.: 3x2, 16x9, ...
    * `url` (string) - the URL of the image.
    * `width` (number) - the width of the image.
- `names` (object) - map of locale to value for the names of the event.
- `publicVisibility` (object) - determine if the event is visible on the Discovery API.
    * `startDateTime` (string) - the start date and time of visibility for this event on the Discovery API in UTC. 
    * `endDateTime` (string) - the end date and time of visibility for this event on the Discovery API in UTC.
    * `visible` (boolean) - true if the event should be visible on the Discovery API, false otherwise.
- `redirectUrl` (string) - the URL of the event on the publisher's site.
- `sales` (object) - sales dates information for the event.
    * `public` (object) - the public sales dates information for the event.
        - `endDateTime` (string) - the date and time of the end of the public sales period in UTC.
        - `startDateTime` (string) - the date and time of the start of the public sales period in UTC.
        - `startTBD` (boolean) - true if the public sale date start is to be determined, false otherwise.
- `source` (object) -  the id and source name of the event. Must be specified.
    * `id` (string) - the publisher's id of the event.
    * `name` (string) - the publisher's name.
- `test` (boolean) - true if this is a test event data, false otherwise (real event).
- `venue` (object) - the venue of the event.
    * `additionalInfos` (object) - map of locale to value for any additional informations on the venue.
    * `address` (object) - the address of the venue.
       - `line1s` (object) - map of locale to value of the first line of the address of the venue.
       - `line2s` (object) - map of locale to value of the second line of the address of the venue.
    * `city` (object) - the name of the city of the venue.
       - `names` (object) - map of locale to value of the name of the city of the venue.
    * `country` (object) - the country informations for the venue.
       - `countryCode` (string) - the country code of the venue.
       - `names` (object) - map of locale to value of the name of the country of the venue.
    * `currency` (string) - the currency accepted at the venue.
    * `descriptions` (object) - map of locale to value for the description of the venue.
    * `id` (string) - the id of the venue as returned by the Discovery API. If specified, all the other fields of the venue will be ignored. Otherwise, a new venue is created and embedded into the event.
    * `images` (array) - list of images of the venue.
       - `height` (number) - the height of the image.
       - `ratio` (string) - the ratio of the image ex.: 3x2, 16x9, ...
       - `url` (string) - the URL of the image.
       - `width` (number) - the width of the image.
    * `location` (object) - the location of the venue.
       - `latitude` (number) - the latitude of the venue.
       - `longitude` (number) - the longitude of the venue.
    * `markets` (array) - list of markets covered by the venue.
       - `id` (string) - the id of the venue as specified in this documentation.
    * `names` (object) - map of locale to value for the names of the venue.
    * `postalCode` (string) - the postal code of the venue.
    * `redirectUrl` (string) - the URL of the venue on the publisher's site.
    * `source` (object) - the id and source name of the venue. Must be specified if `id` is not.
        - `id` (string) - the publisher's id of the venue.
        - `name` (string) - the publisher's name.
    * `state` (object) - the state informations of the venue.
        - `names` (object) - map of locale to value for the names of the state of the venue.
        - `stateCode` (string) - the state code of the venue.
    * `test` (boolean) - true if the venue is a test venue data, false otherwise (real venue).
    * `timezone` (string) - the timezone of the venue.
    * `version` (number) - the publisher's version for this venue.
- `version` (number) - the publisher's version for this event.

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight http %}
POST /publish/v2/events?apikey=**** HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive

{
  "additionalInfos": {
                       "en-us": "string",
                       "fr-ca": "chaine",
                       "es-mx": "cuerda" 
  },
  "attractions": [
    {
      "additionalInfos": {
                       "en-us": "string",
                       "fr-ca": "chaine",
                       "es-mx": "cuerda" 
      },
      "descriptions": {
                       "en-us": "string",
                       "fr-ca": "chaine",
                       "es-mx": "cuerda" 
      },
      "id": "",
      "images": [
        {
          "height": 0,
          "ratio": "string",
          "url": "string",
          "width": 0
        }
      ],
      "names": {
                "en-us": "string",
                "fr-ca": "chaine",
                "es-mx": "cuerda" 
      },
      "redirectUrl": "string",
      "source": {
        "id": "string",
        "name": "string"
      },
      "test": true,
      "version": 0
    }
  ],
  "dates": {
    "start": {
      "localDate": "2015-01-02",
      "localTime": "23:59:00",
      "dateTime": "2015-01-03T05:59:00Z",
      "dateTBD": false,
      "dateTBA": false,
      "timeTBA": false,
      "noSpecificTime": false
    },
    "access":{
      "startDateTime": "2015-01-03T05:59:00Z",
      "startApproximate": false,
      "endDateTime": "2015-01-03T05:59:00Z",
      "endApproximate": false
    },
    "end":{
      "localTime": "23:59:00",
      "dateTime": "2015-01-03T05:59:00Z",
      "approximate": false
    },
    "timezone": "America/Chicago",
    "status": {
                "code": "string"
    }
  },
  "descriptions": {
                   "en-us": "string",
                   "fr-ca": "chaine",
                   "es-mx": "cuerda" 
  },
  "images": [
    {
      "height": 0,
      "ratio": "string",
      "url": "string",
      "width": 0
    }
  ],
  "names": {
            "en-us": "string",
            "fr-ca": "chaine",
            "es-mx": "cuerda" 
  },
  "publicVisibility": {
    "startDateTime": "2014-12-03T01:59:00Z",
    "endDateTime": "2015-01-03T05:59:00Z",
    "visible": true
  },
  "redirectUrl": "string",
  "sales": {
    "public": {
      "endDateTime": "2015-01-03T05:59:00Z",
      "startDateTime": "2014-12-03T01:59:00Z",
      "startTBD": false
    }
  },
  "source": {
    "id": "string",
    "name": "string"
  },
  "test": true,
  "venue": {
    "additionalInfos": {
                        "en-us": "string",
                        "fr-ca": "chaine",
                        "es-mx": "cuerda" 
    },
    "address": {
      "line1s": {
                 "en-us": "string",
                 "fr-ca": "chaine",
                 "es-mx": "cuerda" 
      },
      "line2s": {
                 "en-us": "string",
                 "fr-ca": "chaine",
                 "es-mx": "cuerda" 
      }
    },
    "city": {
      "names": {
                "en-us": "string",
                "fr-ca": "chaine",
                "es-mx": "cuerda" 
      }
    },
    "country": {
      "countryCode": "string",
      "names": {
                "en-us": "string",
                "fr-ca": "chaine",
                "es-mx": "cuerda" 
      }
    },
    "currency": "string",
    "descriptions": {
                     "en-us": "string",
                     "fr-ca": "chaine",
                     "es-mx": "cuerda"
    },
    "id": "",
    "images": [
      {
        "height": 0,
        "ratio": "string",
        "url": "string",
        "width": 0
      }
    ],
    "location": {
      "latitude": 0,
      "longitude": 0
    },
    "markets": [{
                 "id": "101"
                },
                {
                 "id": "120"
                }
    ],
    "names": {
              "en-us": "string",
              "fr-ca": "chaine",
              "es-mx": "cuerda" 
    },
    "postalCode": "string",
    "redirectUrl": "string",
    "source": {
      "id": "string",
      "name": "string"
    },
    "state": {
      "names": {
                "en-us": "string",
                "fr-ca": "chaine",
                "es-mx": "cuerda" 
      },
      "stateCode": "string"
    },
    "test": true,
    "timezone": "string",
    "version": 0
  },
  "version": 0
}
{% endhighlight %}

{% highlight http %}
HTTP/1.1 200 OK
Server: Apache-Coyote/1.1
Content-Type: application/json;charset=UTF-8
Content-Length: 43

{
  "status": "Success",
  "id": "ZuzyMmSiZzyMmSi"
}
{% endhighlight %}


{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"POST",
  url:"https://app.ticketmaster.com/publish/v2/events?apikey={apikey}",
  async:true,
  data: JSON.stringify({
    "source" : {
        "id" : "test_id_0009",
        "name" : "test-source"
    },
    "test": true,
    "names": {
        "en-us": "example test event tnt1"
    },
    "publicVisibility": {
        "startDateTime": "2015-10-29T15:00:00Z",
        "visible": true
    },
    "dates": {
        "start": {
            "dateTime": "2016-04-15T01:00:00Z",
            "localDate": "2016-04-14",
            "localTime": "19:00:00"
        },
        "timezone": "America/Edmonton"
    },
    "venue": {
        "source" : {
            "id" : "test_venue_id_0001",
            "name" : "test-source"
        },
        "test": true,
        "currency": "USD",
        "country": {
            "countryCode": "US"
        }
    }
}),
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // Manage exception
           }
});
{% endhighlight %}

{% highlight bash %}
curl -i -X POST --header "Content-Type: application/json" --header "Accept: application/json;charset=UTF-8" --header "TMPS-Correlation-Id: test1" -d "{
    \"source\" : {
        \"id\" : \"test_id_0009\",
        \"name\" : \"test-source\"
    },
    \"test\": true,
    \"names\": {
        \"en-us\": \"example test event tnt1\"
    },
    \"publicVisibility\": {
        \"startDateTime\": \"2015-10-29T15:00:00Z\",
        \"visible\": true
    },
    \"dates\": {
        \"start\": {
            \"dateTime\": \"2016-04-15T01:00:00Z\",
            \"localDate\": \"2016-04-14\",
            \"localTime\": \"19:00:00\"
        },
        \"timezone\": \"America/Edmonton\"
    },
    \"venue\": {
        \"source\" : {
            \"id\" : \"test_venue_id_0001\",
            \"name\" : \"test-source\"
        },
        \"test\": true,
        \"currency\": \"USD\",
        \"country\": {
            \"countryCode\": \"US\"
        }
    }
}" "http://app.ticketmaster.com/publish/v2/events"
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
