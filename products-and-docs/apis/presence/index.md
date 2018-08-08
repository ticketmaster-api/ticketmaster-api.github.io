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

The base URL for the Web API are:
+ Production: `https://app.ticketmaster.com/presence/v1/`
+ Pre-Production: `https://livenation-test.apigee.net/presence-api-preprod/presence/v1/`

All development and testing has to be performed on the pre-production environment. The pre-production environment mirrors the production environment and test executed in pre-production will yield about the same results they will provide in the production environment.
Any testing performed in the Production environment, should be just exploratory or a smoke test to confirm functionality is deployed correctly. No Load Testing is allowed in the Production environment.

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

There are two types of scanning, **External Scanning** and **Internal Scanning**. 
* External scanning is all the scanning that allows fans access to the venue.
* Internal Scanning is all the scanning that allows access to restricted sections inside the venue, such as VIP section or access to a suite.

**Method:** POST.
Authentication required.

presence/{version}/ticket/enter
{: .code .red}

Sends an external scan entry message

presence/{version}/ticket/exit
{: .code .red}

Sends and external or internal scan exit message

presence/{version}/ticket/validate
{: .code .red}

Sends and internal scan entry message

### Request body structure:

{: .nested-list }
* `channelId` (string) - **Optional** - The character indicator of the channel the ticket was sold through.
* `deviceOs` (string) - **Required** - "Printed" for barcoded tickets, "iOS" or "Android" for tap to enter tickets
* `gateName` (string) - **Required** - The name of the gate that the device belongs to 
* `token` (string) - **Required** - The token of the ticket to be entered
* `venueId` (string) - **Required** - The venue ID that the device belongs to
* `deviceId` (int) - **Required** - The ID of the device, this will be provided at device configuration
* `gateId` (int) - **Required** - The ID of the gate that the device belongs to, this will be provided at device configuration
* `scanTime` (long) - **Required** - The Unix timestamp in **milliseconds** of the ticket scan

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
| OKAY                | Ticket is entered, external or internal |
| EXIT                | Ticket was exited |
| INTERNAL_SCAN_EXIT  | Internal Scan Exit |
| DUPLICATE           | Same ticket was sent more than once within 2 seconds time span |
| EXIT_NOT_PERMITTED  | Exit not allowed at this moment |
| INTERNAL_SCAN_ALREADY_ENTERED | Ticket already entered in the internal gate |
| INTERNAL_SCAN_EXIT_NOT_PERMITTED | Ticket not valid for exit on the internal gate |
| NOT_FOUND           | Ticket was not found |
| BAD_REQUEST         | The request was not valid |
| ALREADY_ENTERED     | The ticket was already entered |
| INVALID_TICKET      | Ticket is not valid |
| START_RESTRICTION   | Scan violates start time rule |
| END_RESTRICTION     | Scan violates end time rule |
| SECTION_RESTRICTION | Scan violates section rule |
| EVENT_RESTRICTION   | Scan violates event rule |
| ACCESS_GROUP_RESTRICTION | Scan violates access group rule |
| XNUM_RESTRICTION    | Scan violates Xnum rule |
| MARK_RESTRICTION    | There is a Mark on the ticket |
| TOO_EARLY           | Event has not yet started |
| TOO_LATE            | Event is over |
| BAD_TOKEN           | Bad Token |
| OPEN_SEAT           | Open Seat |
| TRANSFER            | Accepted Transfer |
| GENERAL_ERROR       | A general error has occurred |

`The only status where a ticket holder should be allowed entry is the OKAY status. All other status should be considered as an entry denied.`

`The only statuses where an exit is valid are the EXIT and INTERNAL_EXIT_SCAN status. All other statuses should be considered as an invalid exit.`

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
    "message": "'Welcome IN"
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

### External Scanning

For External Scanning the scanner doesn't require extra configuration and calls to the enter and exit endpoints Presence will assume it is an external gate. The external gates have the following rules:
* The first time a valid ticket is scanned as a entry (using enter endpoint), the ticket wil be marked as ENTERED
* Any subsequent enter scans for the same ticket will return as an Already Entered ticket and the access will be denied
* The first Exit scan performed to an already entered ticket will mark the ticket as EXITED
* Any subsequent Exit scans performed to an already exited ticket will return a Exit Not Permitted response.
* Any exit scan to a non entered ticket will return a Exit Not Permitted response.

**End points used for external scanning:**    
  
presence/{version}/ticket/enter
{: .code .red}
presence/{version}/ticket/exit
{: .code .red}

### Internal Scanning

For Internal Scanning the scanner is required to be assigned to a gate configured with an "Internal Scans" rule. The rule has an option to allow multiple entries with the same ticket or to require an exit before allowing the same ticket again. Please consult the Presence UI training materials for more information.    
The internal gates have the following rules:
* The first time a valid ticket is scanned as an internal entry (using validate endpoint) it will be added as an internal entry
* if the ticket has not been scanned as an external entry already, the internal entry will also mark the ticket as ENTERED
* If the gate is configured to NOT require exit scans, any subsequent internal entry scans will be accepted
* If the gate is configured to require exit scans, any subsequent internal entry scans will be denied with an Internal Scan Already Entered result
* The first exit scan performed to an already internal entered ticket will mark the ticket as EXIT INTERNAL
* Any subsequent scans performed to an already internal exit ticket will return an Internal Scan Exit not Permitted response
* An internal exit scan to a ticket that has not been internal entered, will return  Internal Scan Exit not Permitted
	* A gate configured for internal scan will NOT be able to perform external exit scans.
* An internal entry scan (validate) from a scanner on a gate not configured for internal scanning will accept the ticket as an Internal Entry

**End points used for internal scanning:**    

presence/{version}/ticket/validate
{: .code .red}
presence/{version}/ticket/exit
{: .code .red}

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
* `mac` (string) - **Optional** - A MAC address for the device. If you send mac address, do not send device ID
* `device` (string) - **Optional** - The device Id assigned to the device. If you send device, do not send the mac address.
 
 Either a `mac` or `device` parameter is required.

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

{: .article #FAQ}
## F.A.Q.
**Q:** How do I get the device’s assigned gate id from Presence at device initialization?

**A:** The Device endpoint will return the gate Id among other information related to the scanner. Please refer to the Device Information section on this page. 

**Q:** Why do I get “NOT FOUND” when the event is not set for today?

**A:** The barcode is validated against the active events in Presence. If the event is not active, either because it is in the past, or because it is in the future, all barcodes belonging to that event won't be included in the search domain. An event is active only from the beginning of the scanning time to the end of scanning time, normally 12 hours before and 12 hours after the event's start time.

**Q:** How do I make the scanners appear on the UI on a specific order?

**A:** The scanners will appear on the order they are added to the system. If you want the devices to appear on a specific order, you need to add the devices in that order.

**Q:** How can I scan barcodes when I am off-line?

**A:** At this point there is no support for off-line scanning for third-parties. A project is in the works to support this feature and an announcement will be made when that functionality is released to Production.

**Q:** What is the expected response time for an api call?

**A:** The response time varies based on the end-point used and the information being sent, on an call to the entry endpoint, if the information is correct and complete. On the ENTRY endpoint, a response of more than 3 seconds should be considered a time-out.
