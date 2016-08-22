{% capture pre_content %}

## Overview
{: .article #overview }

### Authentication

To run a successful API call, you will need to pass your API Key in the `apikey` query parameter. **Your API Key should automatically appear in all URLs throughout this portal**.

Example: `https://app.ticketmaster.com/discovery/v2/events.json?{apikey}`

Without a valid API Key, you will receive a `401` Status Code with the following response:

	{
	    "fault": {
	        "faultstring": "Invalid ApiKey",
	        "detail": {
	            "errorcode": "oauth.v2.InvalidApiKey"
	        }
	    }
	}

### Root URL

`https://app.ticketmaster.com/discovery/v2/`

### Event Sources

The API provides access to content sourced from various platform, including **Ticketmaster**, **Universe**, **FrontGate Tickets** and **Ticketmaster Resale** (TMR). By default, the API returns events from all sources. To specify a specifc source(s), use the `&source=` parameter. Multiple, comma separated values are OK. 

### Event Coverage

With over 113K+ events available in the API, coverage spans all of the following countries: **United States**, **United Kingdom**, **Ireland**, **Australia**, **New Zealand**, **Mexico** and **Canada**. More events and more countries are added on continious basis.

![event map](/assets/img/products-and-docs/map.png)

### Examples

**Get a list of all events in the United States**
`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&{apikey}`

**Search for events sourced by Universe in the United States with keyword "devjam"**
`https://app.ticketmaster.com/discovery/v2/events.json?keyword=devjam&source=universe&countryCode=US&{apikey}`

**Search for music events in the Los Angeles area**
`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&{apikey}`

**Get a list of all events for Adele in Canada**
`https://app.ticketmaster.com/discovery/v2/events.json?attractionId=K8vZ917Gku7&countryCode=CA&{apikey}`

{% endcapture %}

{{ pre_content | markdownify }}
