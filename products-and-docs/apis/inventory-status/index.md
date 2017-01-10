---
layout: documentation
categories:
- documentation
- inventory-status
title: The Inventory Status API
excerpt: Provides event status for primary Ticketmaster inventory with inventory updates happening near real-time.

keywords: Partner API, Inventory Status, InventoryStatus
---

{: .article}
# Inventory Status API

The Inventory Status API provides event status for primary Ticketmaster inventory with inventory updates happening near real-time. For given set of universal event IDs (maximum of 1000 per call), expected statuses are:
                              TICKETS_AVAILABLE,
                              FEW_TICKETS_LEFT,
                              TICKETS_NOT_AVAILABLE,
                              UNKNOWN
{: .article .lead}

## Overview
{: #overview }

### Authentication

Access is provided to authorized clients only.  Please request access by contacting developer@ticketmaster.com.

Clients will be provided an API key from Ticketmaster which should be added to every resource endpoint call.

Example: `https://app.ticketmaster.com/inventory-status/v1/availability?events=17AOv8G6G5rI0S0,1ApZA7pGkdEYAsy&apikey=avJHatT0NbQMlMQTDn6QFYoBrixJCp`

### Host and API endpoint information

https://app.ticketmaster.com/inventory-status/

All connections must be made over SSL using https.

### Terms and Conditions
By using the Ticketmaster Developer Portal, you understand and agree to our [Terms of Use](/support/terms-of-use/partner).

### Contact

Ticketmaster Developer Program [developer@ticketmaster.com](mailto:developer@ticketmaster.com).


{: .article}
## Inventory Status Details  [POST]
{: #inventory-status-details}

Retrieve availability status for comma separated list of universal event IDs.

/inventory-status/v1/availability?events={universalids}&apikey={apikey}
{: .code .red}

### Query Parameters

| Parameter  | Description          | Type              | Example      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `events` | Comma separated list of universal event IDs. Maximum of 1000 universal event IDs.     | string            |     17AOv8G6G5rI0S0,1ApZA7pGkdEYAsy           | Yes      |
| `apikey`   | Your API Key         | string            |     GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne          | Yes      |

### Response structure:
Array of json objects with attributes “eventid” & “status“

{: .nested-list}

- `eventid`
- `status`

>[Request](#req)
>[Response](#res)
{: .reqres}


{% highlight bash %}
https://app.ticketmaster.com/inventory-status/v1/availability?events=17AOv8G6G5rI0S0,1ApZA7pGkdEYAsy&apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne
{% endhighlight %}

{% highlight json %}
Status 200
[
   	{
   	eventId: "17AOv8G6G5rI0S0",
   	status: "TICKETS_AVAILABLE"
   	},
   	{
   	eventId: "1ApZA7pGkdEYAsy",
   	status: "TICKETS_NOT_AVAILABLE"
   	}

]
{% endhighlight %}

### Responses

| Response  | Description          | 
|:-----------|:---------------------|
| `TICKETS_AVAILABLE`   | Indicates inventory is available for purchase through primary channels.         |
| `FEW_TICKETS_LEFT`   | Indicates inventory is limited.       |
| `TICKETS_NOT_AVAILABLE`   | Indicates inventory is not available for purchase through primary channels.         |
| `UNKNOWN`   | Indicates the event id is invalid or the inventory status is not available for the corresponding event at this time.       |
