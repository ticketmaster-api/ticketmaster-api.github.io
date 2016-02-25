---
layout: documentation
categories:
- documentation
- publish
---

#Publish API

Use the Publish API to publish events, venues and attractions. The API provides the opportunity to make your events, venues and attractions available within the Discovery API.
{: .lead .article}

####Developer Console
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

###URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version` | The API Version.     | string            |       "v2"         | Yes      |

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight http %}
POST /publish/v2/events?apikey=**** HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive

{
  "additionalInfo": "string",
  "additionalInfos": {},
  "attractions": [
    {
      "additionalInfo": "string",
      "additionalInfos": {},
      "description": "string",
      "descriptions": {},
      "extensions": {},
      "id": "string",
      "images": [
        {
          "fallback": true,
          "height": 0,
          "ratio": "string",
          "url": "string",
          "width": 0
        }
      ],
      "locale": "string",
      "name": "string",
      "names": {},
      "redirectUrl": "string",
      "source": {
        "id": "string",
        "name": "string"
      },
      "test": true,
      "type": "string",
      "version": 0
    }
  ],
  "dates": {
    "start": {
      "localDate": "2015-01-02",
      "localTime": "23:59:00",
      "dateTime": "2015-01-03T05:59:00Z",
      "dateTBD": true,
      "dateTBA": true,
      "timeTBA": true,
      "noSpecificTime": true
    },
    "access":{
      "startDateTime": "2015-01-03T05:59:00Z",
      "startApproximate": true,
      "endDateTime": "2015-01-03T05:59:00Z",
      "endApproximate": true
    },
    "end":{
      "localTime": "23:59:00",
      "dateTime": "2015-01-03T05:59:00Z",
      "approximate": true
    },
    "timezone": "America/Chicago",
    "displayOptions": {
      "displayMultipleDates": true,
      "range": {
        "localStartDate": "2015-01-02",
        "localEndDate": "2015-01-02"
      }
    }
  },
  "description": "string",
  "descriptions": {},
  "id": "string",
  "images": [
    {
      "fallback": true,
      "height": 0,
      "ratio": "string",
      "url": "string",
      "width": 0
    }
  ],
  "locale": "string",
  "name": "string",
  "names": {},
  "publicVisibility": {
    "startDateTime": "2014-12-03T01:59:00Z",
    "endDateTime": "2015-01-03T05:59:00Z",
    "dateTBD": false,
    "visible": true
  },
  "redirectUrl": "string",
  "sales": {
    "public": {
      "endDateTime": "2015-01-03T05:59:00Z",
      "startDateTime": "2014-12-03T01:59:00Z",
      "startTBD": true
    }
  },
  "source": {
    "id": "string",
    "name": "string"
  },
  "test": true,
  "type": "string",
  "venue": {
    "additionalInfo": "string",
    "additionalInfos": {},
    "address": {
      "line1": "string",
      "line1s": {},
      "line2": "string",
      "line2s": {}
    },
    "city": {
      "name": "string",
      "names": {}
    },
    "country": {
      "countryCode": "string",
      "name": "string",
      "names": {}
    },
    "currency": "string",
    "description": "string",
    "descriptions": {},
    "id": "string",
    "images": [
      {
        "fallback": true,
        "height": 0,
        "ratio": "string",
        "url": "string",
        "width": 0
      }
    ],
    "locale": "string",
    "location": {
      "latitude": 0,
      "longitude": 0
    },
    "markets": {},
    "name": "string",
    "names": {},
    "postalCode": "string",
    "redirectUrl": "string",
    "source": {
      "id": "string",
      "name": "string"
    },
    "state": {
      "name": "string",
      "names": {},
      "stateCode": "string"
    },
    "test": true,
    "timezone": "string",
    "type": "string",
    "version": 0
  },
  "version": 0
}
{% endhighlight %}

{% highlight http %}
HTTP/1.1 200 OK
Server: Apache-Coyote/1.1
Content-Type: application/json;charset=UTF-8
Content-Length: 20

{
  "id": "ZkzyMmSie9", 
  "status": "Success"
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
  "additionalInfo": "string",
  "additionalInfos": {},
  "attractions": [
    {
      "additionalInfo": "string",
      "additionalInfos": {},
      "description": "string",
      "descriptions": {},
      "extensions": {},
      "id": "string",
      "images": [
        {
          "fallback": true,
          "height": 0,
          "ratio": "string",
          "url": "string",
          "width": 0
        }
      ],
      "locale": "string",
      "name": "string",
      "names": {},
      "publicVisibility": {
        "startDateTime": "2014-12-03T01:59:00Z",
        "endDateTime": "2015-01-03T05:59:00Z",
        "dateTBD": false,
        "visible": true
      },
      "redirectUrl": "string",
      "source": {
        "id": "string",
        "name": "string"
      },
      "test": true,
      "type": "string",
      "version": 0
    }
  ],
  "dates": {
    "start": {
      "localDate": "2015-01-02",
      "localTime": "23:59:00",
      "dateTime": "2015-01-03T05:59:00Z",
      "dateTBD": true,
      "dateTBA": true,
      "timeTBA": true,
      "noSpecificTime": true
    },
    "access":{
      "startDateTime": "2015-01-03T05:59:00Z",
      "startApproximate": true,
      "endDateTime": "2015-01-03T05:59:00Z",
      "endApproximate": true
    },
    "end":{
      "localTime": "23:59:00",
      "dateTime": "2015-01-03T05:59:00Z",
      "approximate": true
    },
    "timezone": "America/Chicago",
    "displayOptions": {
      "displayMultipleDates": true,
      "range": {
        "localStartDate": "2015-01-02",
        "localEndDate": "2015-01-02"
      }
    }
  },
  "description": "string",
  "descriptions": {},
  "id": "string",
  "images": [
    {
      "fallback": true,
      "height": 0,
      "ratio": "string",
      "url": "string",
      "width": 0
    }
  ],
  "locale": "string",
  "name": "string",
  "names": {},
  "redirectUrl": "string",
  "sales": {
    "public": {
      "endDateTime": "2015-01-03T05:59:00Z",
      "startDateTime": "2014-12-03T01:59:00Z",
      "startTBD": true
    }
  },
  "source": {
    "id": "string",
    "name": "string"
  },
  "test": true,
  "type": "string",
  "venue": {
    "additionalInfo": "string",
    "additionalInfos": {},
    "address": {
      "line1": "string",
      "line1s": {},
      "line2": "string",
      "line2s": {}
    },
    "city": {
      "name": "string",
      "names": {}
    },
    "country": {
      "countryCode": "string",
      "name": "string",
      "names": {}
    },
    "currency": "string",
    "description": "string",
    "descriptions": {},
    "id": "string",
    "images": [
      {
        "fallback": true,
        "height": 0,
        "ratio": "string",
        "url": "string",
        "width": 0
      }
    ],
    "locale": "string",
    "location": {
      "latitude": 0,
      "longitude": 0
    },
    "markets": {},
    "name": "string",
    "names": {},
    "postalCode": "string",
    "redirectUrl": "string",
    "source": {
      "id": "string",
      "name": "string"
    },
    "state": {
      "name": "string",
      "names": {},
      "stateCode": "string"
    },
    "test": true,
    "timezone": "string",
    "type": "string",
    "version": 0
  },
  "version": 0
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
  \"additionalInfo\": \"string\",
  \"additionalInfos\": {},
  \"attractions\": [
    {
      \"additionalInfo\": \"string\",
      \"additionalInfos\": {},
      \"description\": \"string\",
      \"descriptions\": {},
      \"extensions\": {},
      \"id\": \"string\",
      \"images\": [
        {
          \"fallback\": true,
          \"height\": 0,
          \"ratio\": \"string\",
          \"url\": \"string\",
          \"width\": 0
        }
      ],
      \"locale\": \"string\",
      \"name\": \"string\",
      \"names\": {},
      \"redirectUrl\": \"string\",
      \"source\": {
        \"id\": \"string\",
        \"name\": \"string\"
      },
      \"test\": true,
      \"type\": \"string\",
      \"version\": 0
    }
  ],
  \"description\": \"string\",
  \"descriptions\": {},
  \"id\": \"string\",
  \"images\": [
    {
      \"fallback\": true,
      \"height\": 0,
      \"ratio\": \"string\",
      \"url\": \"string\",
      \"width\": 0
    }
  ],
  \"locale\": \"string\",
  \"name\": \"string\",
  \"names\": {},
  \"publicVisibility\": {
    \"startDateTime\": \"2014-12-03T01:59:00Z\",
    \"endDateTime\": \"2015-01-03T05:59:00Z\",
    \"dateTBD\": false,
    \"visible\": true
  },
  \"redirectUrl\": \"string\",
  \"sales\": {
    \"public\": {
      \"endDateTime\": \"2100-09-12T01:00:00Z\",
      \"startDateTime\": \"2010-09-12T01:00:00Z\",
      \"startTBD\": true
    }
  },
  \"source\": {
    \"id\": \"string\",
    \"name\": \"string\"
  },
  \"test\": true,
  \"type\": \"string\",
  \"venue\": {
    \"additionalInfo\": \"string\",
    \"additionalInfos\": {},
    \"address\": {
      \"line1\": \"string\",
      \"line1s\": {},
      \"line2\": \"string\",
      \"line2s\": {}
    },
    \"city\": {
      \"name\": \"string\",
      \"names\": {}
    },
    \"country\": {
      \"countryCode\": \"string\",
      \"name\": \"string\",
      \"names\": {}
    },
    \"currency\": \"string\",
    \"description\": \"string\",
    \"descriptions\": {},
    \"id\": \"string\",
    \"images\": [
      {
        \"fallback\": true,
        \"height\": 0,
        \"ratio\": \"string\",
        \"url\": \"string\",
        \"width\": 0
      }
    ],
    \"locale\": \"string\",
    \"location\": {
      \"latitude\": 0,
      \"longitude\": 0
    },
    \"markets\": {},
    \"name\": \"string\",
    \"names\": {},
    \"postalCode\": \"string\",
    \"redirectUrl\": \"string\",
    \"source\": {
      \"id\": \"string\",
      \"name\": \"string\"
    },
    \"state\": {
      \"name\": \"string\",
      \"names\": {},
      \"stateCode\": \"string\"
    },
    \"test\": true,
    \"timezone\": \"string\",
    \"type\": \"string\",
    \"version\": 0
  },
  \"version\": 0
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
