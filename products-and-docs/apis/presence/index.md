---
layout: documentation
categories:
- documentation
- presence
title: Presence API
excerpt: The Ticketmaster Presence API allows you to validate tickets and manage scanning devices for Ticketmaster events.
keywords: API, Presence, access control
---
{: .article}
# Presence API 

The Ticketmaster Presence API allows you to validate tickets and manage scanning devices for Ticketmaster events.
{: .lead .article}

### Overview
{: .article #overview }

#### Presence API Services

+ Configure Scanning Devices
+ Validate Ticketmaster Tickets
+ Handle Exit and Secondary Scans
+ Pull Configured Scanner Information

#### Endpoint

The base URL for the Web API is `https://app.ticketmaster.com/presence/v1/`

{: #authentication}
#### Authentication
You authenticate to the Ticketmaster Presence API using an API Key.

+ An API Key needs to be passed as a query parameter in all requests. 
+ All requests must additionally be made over SSL

For example:

+ `apikey` = `gwyfRRwYcA0gmbUDDAtADEeaHT` (required, string)

To request an API Key send an email to the [Presence API team](mailto:PresenceAPI@ticketmaster.com).

#### Format
All responses are returned in JSON format

{: .article #ticket-service}
## Ticket Service 
The Ticket Service API allows you to enter, exit and perform secondary scans on Ticketmaster tickets.
{: .lead .article}
 
## Ticket Enter/Exit/Validate
Check the validity of ticket and mark it as entered, exited or secondary scanned at an event.
{: .article .console-link}

**Method:** POST.
Authentication required.

presence/{version}/ticket/enter
{: .code .red}
presence/{version}/ticket/exit
{: .code .red}
presence/{version}/ticket/validate
{: .code .red}

### Request body structure:

{: .nested-list }
* `channelId` (string) - **Optional** - The character indicator of the channel the ticket was sold through.
* `deviceOs` (string) - **Required** - "Printed" for barcoded tickets, "iOS" or "Android" for tap to enter tickets
* `gateName` (string) - **Required** - The name of the gate that the device belongs to 
* `token` (string) - **Required** - The token of the ticket to be entered
* `venueId` (string) - **Required** - The venue ID that the device belongs to
* `deviceId` (int) - **Required** - The ID of the device, this will be provided at device configuration
* `gateId` (int) - **Required** - The ID of the gate that the device belongs to, this will be provided at device configuration
* `scanTime` (long) - **Required** - The Unix timestamp in milliseconds of the ticket scan

### Response structure:

{: .nested-list }
* `result` (object) - A result object
    - `status` (string) - A return status for the call made
    - `message` (string) - A return message for the call made
* `message` (object) - A message object
    - `tickets` (array) - A list of the tickets affected
        * `place` (string) - Section:Row:Seat for the ticket
        * `eventId` (string) - The event ID that the ticket is tied to

#### Possible Statuses
The following statuses will be returned by these endpoints

| Status              | Description |
| ------------------- | ----------- |
| OKAY                | Ticket is entered |
| EXIT                | Ticket was exited |
| INTERNAL_SCAN       | Ticket was internal scanned |
| NOT_FOUND           | Ticket was not found |
| BAD_REQUEST         | The request was not valid |
| ALREADY_ENTERED     | The ticket was already entered |
| INVALID_TICKET      | Ticket is not valid |
| START_RESTRICTION   | Scan violates start time rule |
| END_RESTRICTION     | Scan violates end time rule |
| SECTION_RESTRICTION | Scan violates section rule |
| EVENT_RESTRICTION   | Scan violates event rule |
| TOO_EARLY           | Event has not yet started |
| TOO_LATE            | Event is over |

{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://livenation-test.apigee.net/presence-api-preprod/veyron/ticket/enter?apikey={apikey}",
  "method": "POST",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache"
  },
  "processData": false,
  "data": "{\n\t\"channelId\":\"A\",\n\t\"deviceOs\":\"printed\",\n\t\"gateName\":\"Gate 2\",\n\t\"token\":\"721744537954\",\n\t\"venueId\":\"KovZpZAnAtJJ\",\n\t\"deviceId\":224,\n\t\"scanTime\":1480003200001,\n\t\"gateId\":274\n}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
{% endhighlight %}

{% highlight bash %}
curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" -H -d '{
	"channelId":"A",
	"deviceOs":"printed",
	"gateName":"Gate 2",
	"token":"721744537954",
	"venueId":"KovZpZAnAtJJ",
	"deviceId":224,
	"scanTime":1480003200001,
	"gateId":274
}' "http://livenation-test.apigee.net/presence-api-preprod/veyron/ticket/enter?apikey={apikey}"
{% endhighlight %}


{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
POST /presence/v1/ticket/enter.json?{apikey} HTTP/1.1
Host: app.ticketmaster.com
{
	"channelId":"A",
	"deviceOs":"printed",
	"gateName":"Gate 2",
	"token":"721744537954",
	"venueId":"KovZpZAnAtJJ",
	"deviceId":224,
	"scanTime":1480003200001,
	"gateId":274
}
{% endhighlight %}

{% highlight HTTP %}
{
  "result": {
    "status": "OKAY",
    "message": "Okay"
  },
  "message": {
    "tickets": [
      {
        "place": "PIT1:3:4",
        "eventId": "3F005062B2B4E313"
      }
    ]
  }
}
{% endhighlight %}

{: .article #device-service}
## Device Service 
The Device Service API allows you to configure and manage your scanning devices.
{: .lead .article}
 
## Device Configure
Configure your scanning device to your venue.
{: .article .console-link}

**Method:** POST.
Authentication required.

presence/{version}/device/init
{: .code .red}

### Request body structure:

{: .nested-list }
* `venueId` (string) - **Required** - the id of the venue that the device will be configured too.
* `name` (string) - **Required** - The friendly name of the device being configured.
* `mac` (string) - **Required** - A MAC address for the device
* `ip` (string) - **Required** - The IP address of the device and the time of configuration
* `gateName` (string) - **Required** - The name of the gate that the device belongs to
* `serial` (string) - **Required** - The serial number of the device
* `model` (string) - **Required** - The model name of the device

### Response structure:

* `result` (object) - A result object
    - `status` (string) - A return status for the call made
    - `message` (string) - A return message for the call made
* `message` (object) - A message object
    - `id` (int) - the id of the configured device
    - `venueId` (string) - the id of the venue that the device will be configured too.
    - `name` (string) - The friendly name of the device being configured.
    - `mac` (string)  - A MAC address for the device
    - `ip` (string) - The IP address of the device and the time of configuration
    - `gateId` (int) - The ID of the gate that the device belongs to
    - `serial` (string) - The serial number of the device
    - `model` (string) - The model name of the device

#### Possible Statuses
The following statuses will be returned by these endpoints

| Status              | Description |
| ------------------- | ----------- |
| OKAY                | Device was configured |
| NOT_FOUND           | Venue with the sent ID was not found |
| BAD_REQUEST         | The request was not valid |


{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://livenation-test.apigee.net/presence-api-preprod/chiron/device/init?apikey={apikey}",
  "method": "POST",
  "headers": {
    "content-type": "application/json",
    "accept": "application/json",
    "cache-control": "no-cache",
  },
  "processData": false,
  "data": "{\n    \"name\" : \"Test device 2\",\n    \"mac\" : \"00:00:00:00:00:01\",\n    \"ip\" : \"192.168.1.1\",\n    \"gateName\" : \"Test Gate\",\n    \"venueId\" : \"2\",\n    \"serial\" : \"aBcDEFg12\",\n    \"model\" : \"Best Phone\"\n}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
{% endhighlight %}

{% highlight bash %}
curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -H "Cache-Control: no-cache" -d '{
    "name" : "Test device 2",
    "mac" : "00:00:00:00:00:01",
    "ip" : "192.168.1.1",
    "gateName" : "Test Gate",
    "venueId" : "2",
    "serial" : "aBcDEFg12",
    "model" : "Best Phone"
}' "http://livenation-test.apigee.net/presence-api-preprod/chiron/device/init?apikey={apikey}"
{% endhighlight %}


{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
POST /presence/v1/device/init.json?{apikey} HTTP/1.1
Host: app.ticketmaster.com
{
    "name" : "Test device",
    "mac" : "00:00:00:00:00:01",
    "ip" : "192.168.1.1",
    "gateId" : "1",
    "venueId" : "KovZpZAFF17J",
    "serial" : "aBcDEFg12",
    "model" : "Janam XT2"
}
{% endhighlight %}

{% highlight HTTP %}
{
  "result": {
    "status": "OKAY",
    "message": "Okay"
  },
  "message": {
    "id" : "1",
    "name" : "Test device",
    "mac" : "00:00:00:00:00:01",
    "ip" : "192.168.1.1",
    "gateId" : "1",
    "venueId" : "KovZpZAFF17J",
    "serial" : "aBcDEFg12",
    "model" : "Janam XT2"
  }
}
{% endhighlight %}

## Device Information
Retrieve the information for a configured device
{: .article .console-link}

**Method:** GET.
Authentication required.

presence/{version}/device
{: .code .red}

### Query Parameters :

{: .nested-list }
* `venue` (string) - **Required** - the id of the venue that the device is configured too.
* `mac` (string) - **Required** - A MAC address for the device

### Response structure:

* `result` (object) - A result object
    - `status` (string) - A return status for the call made
    - `message` (string) - A return message for the call made
* `message` (object) - A message object
    - `id` (int) - the id of the configured device
    - `venueId` (string) - the id of the venue that the device will be configured too.
    - `name` (string) - The friendly name of the device being configured.
    - `mac` (string)  - A MAC address for the device
    - `ip` (string) - The IP address of the device and the time of configuration
    - `gateId` (int) - The ID of the gate that the device belongs to
    - `gateName` (string) - The friendly name of the gate the device belongs to
    - `serial` (string) - The serial number of the device
    - `model` (string) - The model name of the device

#### Possible Statuses
The following statuses will be returned by these endpoints

| Status              | Description |
| ------------------- | ----------- |
| OKAY                | Device information was found |
| NOT_FOUND           | Device was not found |
| BAD_REQUEST         | The request was not valid |


{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://livenation-test.apigee.net/presence-api-preprod/chiron/device/?apikey={apikey}&venueId=KovZpZAFF17J&mac=00:24:06:F0:F9:FB",
  "method": "GET",
  "headers": {
=    "content-type": "application/json",
    "accept": "application/json",
    "cache-control": "no-cache",
  },
  "processData": false,
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
{% endhighlight %}

{% highlight bash %}
curl -X GET -H "Content-Type: application/json" -H "Accept: application/json" -H "Cache-Control: no-cache" "http://livenation-test.apigee.net/presence-api-preprod/chiron/device/?apikey={apikey}&venueId=KovZpZAFF17J&mac=00:24:06:F0:F9:FB"
{% endhighlight %}


{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /presence/v1/device.json?{apikey}&venueId=?&mac=? HTTP/1.1
Host: app.ticketmaster.com
{% endhighlight %}

{% highlight HTTP %}
{
  "result": {
    "status": "OKAY",
    "message": "Okay"
  },
  "message": {
      "id": 37,
      "name": "East 1",
      "venueId": "KovZpZAFF17J",
      "localId": "COM-00:24:06:F0:FA:49-H",
      "gateId": 84,
      "gateName": "Entrance 1",
      "ip": "10.40.184.153",
      "mac": "00:24:06:F0:FA:49",
      "serial": "3c39f9af",
      "model": "Janam XT2"
    }
}
{% endhighlight %}