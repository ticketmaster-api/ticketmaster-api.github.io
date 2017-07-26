---
layout: documentation
categories:
- documentation
- partner
redirect_from: 
- "/apis/commerce/"
- "/apis/partners/"
- "/apis/partner/"
title: Partner API
excerpt: The Ticketmaster Partner API lets clients reserve, purchase, and retreive ticket and event informaton.
keywords: Partner API, host and API, reserve tickets, create a cart, order management, member management
---

{: .article}
# Partner API

The Ticketmaster Partner API lets clients reserve, purchase, and retreive ticket and event informaton.
{: .article .lead}

Make live API calls right now in the interactive docs:

[INTERACTIVE DOCS](/products-and-docs/apis/partner/interactive-console/?app=partners){: .button}

## Overview
{: #overview }

### Authentication

Clients will be provided an API key from Ticketmaster which should be added to every resource endpoint call.

Example: `https://app.ticketmaster.com/partners/v1/events/3F004EC9D1EBBC76/cart?apikey=3QIvq55bS608ai6r8moig1WdW57bONry`

### Host and API endpoint information

Production: https://app.ticketmaster.com/partners/v1

All connections must be made over SSL using https.

    
### Production environment testing

Here you can test API transactions for different scenarios like credit card and invoice payment, captcha, etc.  The following event ids are available for use:


    * 2000527EE48A9334: Use this event ID for production environment testing


### Best Practices


#### Cleanup

If a user abandons a page/tab after a ticket reserve has been made, client applications should do their best to detect this and issue a `DELETE /cart` request to free up allocated resources on the ticketing server.  This should also be done if client apps no longer want to wait through a long, continuing polling process.  This is necessary since ticket reserve requests that result in polling will eventually complete asynchronously and take up resources even if clients do not consume the next polling url.

#### Authorization

Any API calls which require member authorization, refer to [Ticketmaster OAuth API](/products-and-docs/apis/oauth/) on how to get the Member Access Token and maintaining them. For all the Member Authorization requests, you will have to pass the following header with the request `Authorization: Bearer <access_token>`.

#### Polling
[Polling](#poll) results from limited per-partner resources in the ticketing system. Clients should always be ready to handle polling responses. See [polling](#poll) for more details.

### Terms and Conditions
By using the Ticketmaster Developer Portal, you understand and agree to our [Terms of Use](/support/terms-of-use/partner).

### Service Availability

The Ticketmaster back-end reservation systems are distributed globally and events are processed on their local systems.  These systems go into a nightly maintenance mode between 12AM and 2AM local time. This means a show playing at Madison Square Garden will not be transactable between 12AM-2AM Eastern Time.  Use the timezone value from the event details response to note when these events may be unavailable for transactions.

### Quota Policy

The Partner API has a quota policy.This policy is applied for all the request made to these endpoints

/events/ or
/events/{eventId}

The restrictions are as follows :

		For Production   : 200 requests / minute for a client IP

The following headers are returned in the response add more information about the quota

	Ratelimit-Quota-Allowed :  Returns the allowed quota count
	Ratelimit-Quota-Used    :  Returns the current quota used within a quota interval
	Ratelimit-Expiry        :  Returns the UTC time in milliseconds which determines when the quota expires and new quota interval starts.

In addition to that the just <b>Availability End Point </b>(/event/{eventId}/availability)  has an updated quota policy.The restriction is <b>3600 requests/hour </b> for an apikey.If you get a 429 error code, it means that your request was aborted because of violation of quota policy.

The following headers to the availability response add more information about the quota 

     Ratelimit-Expiry          :  The expiry time for the rate limit
     Ratelimit-Quota-Allowed   :  The total no of requests allowed
     Ratelimit-Quota-Available :  The no of requests (remaining) that can be made within the time limit


### Channel Partners
See ["Channel Partners"](#channel-partner-overview)

### Support/FAQs

You can visit our support/FAQ page  [here](/support/partner-api-faq).

### Contact

Ticketmaster Developer Program [developer@ticketmaster.com](mailto:developer@ticketmaster.com).

{: .article}
## Event Details  [GET] (Deprecated)
{: #event-details}

<i>This endpoint is deprecated.  Please use the ["Event Offers API"](http://developer.ticketmaster.com/products-and-docs/apis/commerce/#event-offers) for price level and ticket type information and the ["Discovery API"](http://developer.ticketmaster.com/products-and-docs/apis/discovery) for event meta data.</i>


Retrieve details for a given event including the ticket type & pricing details. The boolean field `api_transactable` indicates if this event can be sold through the API.  If not, clients should be forwarded to the Ticketmaster event details page (https://www.ticketmaster.com/event/{eventId}).

/partners/v1/events/{event_id}?apikey={apikey}
{: .code .red}

*Polling: No*

### Parameters

| Parameter  | Description          | Type              | Example      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `event_id` | The 16-digit alphanumeric event ID.     | string            |     "0B004ED9FC825ACB"           | Yes      |
| `apikey`   | Your API Key         | string            |     "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"          | Yes      |

>[Request](#req)
>[Response](#res)
{: .reqres}


{% highlight bash %}
https://app.ticketmaster.com/partners/v1/events/0B004ED9FC825ACB?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne
{% endhighlight %}

{% highlight js %}
Status 200
{
    "api_transactable" : true,  // indicates tickets can be sold through this API

    "event": {
        "area_groups": [
            {
                "areas": [
                    {
                        "description": "Mezzanine",
                        "id": 2,
                        "prices": [ { "id": 9 }, { "id": 10 }, { "id": 11 } ]
                    },
                    {
                        "description": "Parterre",
                        "id": 1,
                        "prices": [ { "id": 10 } ]
                    },
                    {
                        "description": "Orchestra",
                        "id": 0,
                        "prices": [ { "id": 8 }, { "id": 9 } ]
                    }
                ],
                "label": "Section"
            },
            {
                "areas": [
                    {
                        "description": "Left Center Section",
                        "id": 7,
                        "prices": [ { "id": 10 }, { "id": 11 } ]
                    },
                    {
                        "description": "Right Center Section",
                        "id": 6,
                        "prices": [ { "id": 10 }, { "id": 11 } ]
                    },
                    {
                        "description": "Center Section",
                        "id": 3,
                        "prices": [ { "id": 8 }, { "id": 9 }, { "id": 11 } ]
                    },
                    {
                        "description": "Left Section",
                        "id": 4,
                        "prices": [ { "id": 9 }, { "id": 10 }, { "id": 11 } ]
                    },
                    {
                        "description": "Right Section",
                        "id": 5,
                        "prices": [ { "id": 9 }, { "id": 10 }, { "id": 11 } ]
                    }
                ],
                "label": "Location"
            }
        ],
        "artists": [
            {
                "id": 1760681,
                "name": "Donny & Marie (Touring)",
                "rank": 1,
                "single_performer_or_band": false
            }
        ],
        "criteria_groups": [
            "bestavail",
            "specificseats"
        ],
        "currency_code": "USD",
        "event_image": {
            "height": 115,
            "location": "http://media.ticketmaster.com/en-usxyz",
            "width": 205
        },
        "eventdate": {
            "format": "datetime",
            "value": "2015-12-07T00:00:00Z"
        },
        "facility_fee_rollup": false,
        "id": "1D004F240CEB4BDE",
        "name": "Donny & Marie (Touring)",
        "notes": [
            {
                "text": "The night of the event, we would like to extend a special room offer to you. This special offer ",
                "type": "webinfo"
            }
        ],
        "offsale": {
            "format": "datetime",
            "value": "2015-12-06T21:00:00Z"
        },
        "onsale": {
            "format": "datetime",
            "value": "2015-09-11T14:00:00Z"
        },
        "presales": [
            {
                "format": "daterange",
                "label": "American Express Card Member Seating",
                "value": "2015-09-16T15:00:00Z/2015-12-02T03:00:00Z"
            }
        ],
        "price_range": {
            "description": "Prices subject to change",
            "max": {
                "display_amount": 150.0,
                "face_value": 150.0,
                "fees": 0.0
            },
            "min": {
                "display_amount": 50.0,
                "face_value": 50.0,
                "fees": 0.0
            }
        },
        "prices": [
            {
                "amounts": [ 75.0 ],
                "areas": [
                    {
                        "id": 1
                    },
                    {
                        "id": 2
                    },
                    {
                        "id": 4
                    },
                    {
                        "id": 5
                    },
                    {
                        "id": 6
                    },
                    {
                        "id": 7
                    }
                ],
                "description": "Price Level 3",
                "id": 10
            },
            {
                "amounts": [ 50.0 ],
                "areas": [
                    {
                        "id": 2
                    },
                    {
                        "id": 3
                    },
                    {
                        "id": 4
                    },
                    {
                        "id": 5
                    },
                    {
                        "id": 6
                    },
                    {
                        "id": 7
                    }
                ],
                "description": "Price Level 4",
                "id": 11
            },
            {
                "amounts": [ 100.0 ],
                "areas": [
                    {
                        "id": 0
                    },
                    {
                        "id": 2
                    },
                    {
                        "id": 3
                    },
                    {
                        "id": 4
                    },
                    {
                        "id": 5
                    }
                ],
                "description": "Price Level 2",
                "id": 9
            },
            {
                "amounts": [ 150.0 ],
                "areas": [
                    {
                        "id": 0
                    },
                    {
                        "id": 3
                    }
                ],
                "description": "Price Level 1",
                "id": 8
            }
        ],
        "promoter": {
            "id": 494,
            "name": "PROMOTED BY VENUE "
        },
        "publication": {
            "format": "datetime",
            "value": "2015-09-04T23:06:00Z"
        },
        "purchase_organization": "TM",
        "quantities": {
            "limit": 50
        },
        "service_fee_rollup": false,
        "statuses": [
            {
                "type": "onsale",
                "value": "2015-09-11T14:00:00Z"
            }
        ],
        "tickets": [
            {
                "areas": [
                    {
                        "id": 0
                    },
                    {
                        "id": 1
                    },
                    {
                        "id": 2
                    },
                    {
                        "id": 3
                    },
                    {
                        "id": 4
                    },
                    {
                        "id": 5
                    },
                    {
                        "id": 6
                    },
                    {
                        "id": 7
                    }
                ],
                "description": "GPAS1",
                "id": "000042800007",
                "prices": [
                    {
                        "amount": 150.0,
                        "display_amount": 150.0,
                        "id": 8,
                        "price_details": [
                            {
                                "amount": {
                                    "amount": 150.0,
                                    "currency": "USD"
                                },
                                "type": "face_value"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "face_value_tax"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "facility"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "service"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "service_tax"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "service_tax2"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "distance"
                            }
                        ]
                    },
                    {
                        "amount": 100.0,
                        "display_amount": 100.0,
                        "id": 9,
                        "price_details": [
                            {
                                "amount": {
                                    "amount": 100.0,
                                    "currency": "USD"
                                },
                                "type": "face_value"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "face_value_tax"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "facility"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "service"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "service_tax"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "service_tax2"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "distance"
                            }
                        ]
                    },
                    {
                        "amount": 75.0,
                        "display_amount": 75.0,
                        "id": 10,
                        "price_details": [
                            {
                                "amount": {
                                    "amount": 75.0,
                                    "currency": "USD"
                                },
                                "type": "face_value"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "face_value_tax"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "facility"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "service"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "service_tax"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "service_tax2"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "distance"
                            }
                        ]
                    },
                    {
                        "amount": 50.0,
                        "display_amount": 50.0,
                        "id": 11,
                        "price_details": [
                            {
                                "amount": {
                                    "amount": 50.0,
                                    "currency": "USD"
                                },
                                "type": "face_value"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "face_value_tax"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "facility"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "service"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "service_tax"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "service_tax2"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "distance"
                            }
                        ]
                    }
                ],
                "quantities": {
                    "exact": 0,
                    "limit": 50,
                    "minimum": 1,
                    "multiple": 1
                }
            },
            {
                "areas": [
                    {
                        "id": 0
                    },
                    {
                        "id": 1
                    },
                    {
                        "id": 2
                    },
                    {
                        "id": 3
                    },
                    {
                        "id": 4
                    },
                    {
                        "id": 5
                    },
                    {
                        "id": 6
                    },
                    {
                        "id": 7
                    }
                ],
                "description": "GPAS2",
                "id": "000083000007",
                "prices": [
                    {
                        "amount": 150.0,
                        "display_amount": 150.0,
                        "id": 8,
                        "price_details": [
                            {
                                "amount": {
                                    "amount": 150.0,
                                    "currency": "USD"
                                },
                                "type": "face_value"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "face_value_tax"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "facility"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "service"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "service_tax"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "service_tax2"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "distance"
                            }
                        ]
                    },
                    {
                        "amount": 100.0,
                        "display_amount": 100.0,
                        "id": 9,
                        "price_details": [
                            {
                                "amount": {
                                    "amount": 100.0,
                                    "currency": "USD"
                                },
                                "type": "face_value"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "face_value_tax"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "facility"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "service"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "service_tax"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "service_tax2"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "distance"
                            }
                        ]
                    },
                    {
                        "amount": 75.0,
                        "display_amount": 75.0,
                        "id": 10,
                        "price_details": [
                            {
                                "amount": {
                                    "amount": 75.0,
                                    "currency": "USD"
                                },
                                "type": "face_value"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "face_value_tax"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "facility"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "service"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "service_tax"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "service_tax2"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "distance"
                            }
                        ]
                    },
                    {
                        "amount": 50.0,
                        "display_amount": 50.0,
                        "id": 11,
                        "price_details": [
                            {
                                "amount": {
                                    "amount": 50.0,
                                    "currency": "USD"
                                },
                                "type": "face_value"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "face_value_tax"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "facility"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "service"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "service_tax"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "service_tax2"
                            },
                            {
                                "amount": {
                                    "amount": 0.0,
                                    "currency": "USD"
                                },
                                "type": "distance"
                            }
                        ]
                    }
                ],
                "quantities": {
                    "exact": 0,
                    "limit": 50,
                    "minimum": 1,
                    "multiple": 1
                }
            }
        ],
        "type": {
            "id": 0
        },
        "url": "http://ticketmaster.com/event/1D004F240CEB4BDE",
        "venue": {
            "id": 237685,
            "images": [
                {
                    "height": 410,
                    "location": "http://media.ticketmaster.com/en-us/tmimages/venue/maps/ny5/41248s.gif",
                    "name": "End Stage",
                    "type": "seatingchart",
                    "width": 670
                }
            ],
            "location": {
                "address": {
                    "city": "Mashantucket",
                    "country": {
                        "abbrev": "US"
                    },
                    "region": {
                        "abbrev": "CT"
                    }
                },
                "time_zone": "America/New_York"
            },
            "markets": [
                {
                    "id": 33,
                    "name": "New England"
                },
                {
                    "id": 35,
                    "name": "New York/Tri-State Area"
                },
                {
                    "id": 11,
                    "name": "Greater Boston Area"
                },
                {
                    "id": 124,
                    "name": "Connecticut"
                }
            ],
            "name": "The Grand Theater at Foxwoods Resort Casino"
        }
    }
}
{% endhighlight %}



{: .article}
## Event Click Tracking Url [GET]
{: #event-tracking}

This is only available for partners signed up for affiliate tracking through Impact Radius

/partners/v1/tracking?event_id={event_id}&apikey={apikey}
{: .code .red}

*Polling: No*

### Parameters

| Parameter  | Description          | Type              | Example      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `event_id` | The 16-digit alphanumeric event ID.     | string            |     "0B004ED9FC825ACB"           | Yes      |
| `apikey`   | Your API Key         | string            |     "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"          | Yes      |
| `shared_id`| ImpactRadius SharedId field in reports (32 chars max)  | string            |     "02a8127b-7a52"          | No      |
| `sub_id1,sub_id2,sub_id3`| ImpactRadius SubId1, SubId2, SubId3 fields in reports(32 chars max each)  | string            |     "02a8127b-7a52"          | No      |


>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
https://app.ticketmaster.com/partners/v1/tracking?event_id=2000527EE48A9334&apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne
{% endhighlight %}

{% highlight js %}
Status 200

The Response is a 1x1 gif pixel

{% endhighlight %}


{: .article}
## Get Event ID [GET]
{: #retrieve-event}

Returns an alphanumeric event id based on a Venue-supplied event code+host combination<br/>

/partners/v1/events/{event_code}/{event_host}/id
{: .code .red}

*Polling: No*

### Parameters

| Parameter  | Description          | Type              | Example      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `event_code` | The event code given by the venue.     | string            |     "53-45243"           | Yes      |
| `event_host` | The event host given by the venue.     | string            |     "NY1"           | Yes      |


>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
https://app.ticketmaster.com/partners/v1/events/53-45243/NY1/id?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne
{% endhighlight %}

{% highlight js %}
Status 200
{
    "event" : {
        "id" : "0B004D43F86C478F"

    }
}
{% endhighlight %}


{: .article}
## Channel Partners
{: #channel-partner-overview}

Ticketmaster works with various "channel partners" who deal directly with venues, clients, and promoters to source inventory, often at discounted prices and available for sale exclusively through their own platforms.  Ticketmaster provides additional APIs to service their needs and requires specific agreements on usage.  Contact Ticketmaster for enabling the following APIs.


{: .article}
## Event Inventory [GET]
{: #inventory-management}
For use by Channel Partners only. Discover events available to transact on. For specifically-enabled accounts only.

/partners/v1/events
{: .code .red}

*Polling: No*

### Response structure:

{: .nested-list}

- `events` (array)  - Events.
    - {arrayitemobject} - event
        * `eventCode` (string) -  Event code  Eg: "EPT0726E"
        * `eventHost` (string) -  Host system Eg: "LA2"
        * `eventId` (string) - Event ID Eg. "0B004D43F86C478F"
        * `eventDate` (date) - Event Date is Local Date YYYY-MM-DD format
        * `eventTime` (time) - Event Time is Local Time HH:MM:SS format
        * `timeZone` (text) - Time zone of the event venue location Eg: "America/Los_Angeles"
        * `seatLocationMapRestrict`(boolean) - when true, host's ascii map through the sell prompt in tmwin will not be displayed.
        * `locRowSeatRestrict`(boolean) - when true, requires any client/partner to hide row and seat names from the customer. 
        * `locXnumAddescRestrict`(boolean) - when true, Xnumbers, ADDDESC, section on the event will not be displayed.
        * `offers` (array) - Offers on the Event
            - {arrayitemobject} - offer
                * `repName` (text) - Offer name. Eg: "GPAS4"
                * `ticketType` (text) - Ticket Type Id Eg: "00004C440003"

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
https://app.ticketmaster.com/partners/v1/events?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne
{% endhighlight %}

{% highlight js %}
Status 200
{
    "events" : [
        {
            "eventCode" : "EPT0726E",
            "eventHost" : "LA2",
            "eventId" : "0B004D43F86C478F",
            "eventDate" : "2015-07-26",
            "eventTime" : "18:30:00",
            "timeZone" : "America/Los_Angeles",
            "seatLocationMapRestrict": false,
            "locXnumAddescRestrict": false,
            "locRowSeatRestrict": false,
            "offers": [
                { "repName": "GPAS4", "ticketType": "00004C440003" }
            ]
        },
        {
            "eventCode" : "EPT0896A",
            "eventHost" : "LA2",
            "eventId" : "0C004F43F86C4BAC",
            "eventDate" : "2015-07-27",
            "eventTime" : "18:30:00",
            "timeZone" : "America/Los_Angeles",
            "offers": [
                { "repName": "GPAS4", "ticketType": "00004C440004" }
            ]
        }

        // ...
    ]
}
{% endhighlight %}


{: .article}
## Ticket Inventory and Seat Availability [GET]
{: #ticket-availability}
For use by Channel Partners only. Get total allocated and remaining ticket amounts for each ticket type per event. Current un-sold seat inventory is also included along with the current ticket reservation limit.

This service should not be used in real-time in line with an active purchase being made. The data available by this service may be cached for extended periods of time. Usage should be in accordance with agreed-upon rate limits between TM and the Channel Partner. Contact Ticketmaster for enablement.
For inventory that has been exclusively set aside, Channel partners are expected to maintain their own inventory counts and should only periodically check this service to sync inventory with their internal systems. However, for inventory that is “open” (non-exclusive) where anyone can sell from, Channel partners should not maintain their own inventory counts.

/partners/v1/events/{event_id}/availability
{: .code .red}

*Polling: No*

### Parameters

| Parameter  | Description          | Type              | Example      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `event_id` | The 16-digit alphanumeric event ID.     | string            |     "0B004ED9FC825ACB"           | Yes      |


### Response structure:

{: .nested-list}

- `event` (object)  - Event.
    * `id` (string) - Event ID
    * `restrictSingle` (boolean) - true/false. Indicates a reserve cannot leave 1 seat remaining among a contiguous set of seats
    * `eventTicketLimit` (number) - 0 means unlimited, but reserves may still be limited by current seat inventory (currentTicketLimit)
    * `onsale` (datetime) - Event onsale date and time in UTC format
    *  `offsale` (datetime) - Event off sale date and time in UTC format
    * `eventDateTime` (datetime) - Event Date & Time in UTC format
    * `seatLocationMapRestrict`(boolean) - when true, host's ascii map through the sell prompt in tmwin will not be displayed.
    * `locRowSeatRestrict`(boolean) - when true, requires any client/partner to hide row and seat names from the customer. 
    * `locXnumAddescRestrict`(boolean) - when true, Xnumbers, ADDDESC, section on the event will not be displayed.
    - `tickets` (array) - tickets
        - {arrayitemobject} - ticket
            * `offers` (array) - Offers
                - {arrayitemobject} - offer
                    * `ticketTypeId` (text) - Ticket Type Id
                    * `priceLevelId` (number) - Price Level Id
                    * `currency` (text) - currency
                    * `faceValue` (number) - Face Value of the ticket
                    * `charges` (array) - Charges
                        - {arrayitemobject} - charge
                            * `reason` (text) - Charge reason. Eg. 'facility'
                            * `type` (text) - type of charge. Eg. 'fee'
                            * `amount` (number) - charge amount in the currency
                    * `offerName` (text) - Name of the offer
                    * `offerDescription` (text) - Description of the offer
            * `available` (number) - number of seats available
            * `total` (number) - total number of seats
            * `seating` (number) - type of seat "reserved" or "general"
            * `inventory` (array) - Inventory
                - {arrayitemobject} - Inventory item
                    * `section` (text) - Section prefix
                    * `row` (text) -  Row name
                    - `seats` (array) - seats
                        - {arrayitemobject} - seat number
                    - `places` (array) - places
                        - {arrayitemobject} - place
                    * `hasEvenOddMix` (boolean) - true/false. 'false' if row has only even or only odd numbered seating.
            * `eventTicketLimit` (number) - Ticket Limit for this offer.
            * `currentTicketLimit` (number) - Capped by available inventory and eventTicketLimit.


>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
https://app.ticketmaster.com/partners/v1/events/0B004ED9FC825ACB/availability?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne
{% endhighlight %}


{% highlight js %}
Status 200
{
    "event" : {
        "id":"3F004CBB88958BF9",
        "restrictSingle" : true,  // indicates a reserve cannot leave 1 seat remaining among a contiguous set of seats
        "eventTicketLimit" : 10,  // 0 = unlimited for this event, but reserves may still be limited by current seat inventory (currentTicketLimit) 
        "seatLocationMapRestrict": false,
        "locXnumAddescRestrict": false,
        "locRowSeatRestrict": false,
        "tickets":[
            {

                "available":5034,
                "total": 10345,
                "currentTicketLimit" : 4, // capped by available inventory and eventTicketLimit
                "inventory" : [
                    // hasEvenOddMix indicates the row has even/odd numbered seating.
                    { "section" : "207", "row" : "A", "seats" : [ 2, 4, 6, 8], "places" : ["INGEEMRQHE5E2ORRG4", "INGEEMRQHE5E2ORRGA", "INGEEMRQHE5E2ORRGE", "INGEEMRQHE5E2ORRGI"], "hasEvenOddMix" : false},      

                    { "section" : "208", "row" : "A", "seats" : [ 1, 2], "places" : ["INGEEMRQHE5E2ORU", "INGEEMRQHE5E2ORV"], "hasEvenOddMix" : true}
                ],

                "offers" : [
                    {
                        "charges" : [
                            {
                                "amount" : 3.0,
                                "reason" : "facility",
                                "type": "fee"
                            }
                        ],

                        "currency": "USD",
                        "faceValue" : 25.0,
                        "offerDescription" : "GPAS1",
                        "offerName" : "GPAS1",
                        "priceLevelId" : "1",
                        "ticketTypeId" : "00000405000C"
                    },
                    {
                        "charges" : [
                            {
                                "amount" : 3.0,
                                "reason" : "facility",
                                "type": "fee"
                            }
                        ],

                        "currency": "USD",
                        "faceValue" : 25.0,
                        "offerDescription" : "GPAS1J",
                        "offerName" : "GPAS1J",
                        "priceLevelId" : "1",
                        "ticketTypeId" : "00000406000C"
                    }
                ]
            },

            {
                "available":43,
                "total": 108,
                "currentTicketLimit" : 6,
                "eventTicketLimit" : 10,
                "inventory" : [
                    { "section" : "209", "row" : "B", "seats" : [ 2, 4, 6, 8, 10, 12, 16],
                      "areas": [
		              {
		                "description": "Right Side of Theatre",
		                "name": "RIGHT",
		                "areaId": "10"
		              },
		              {
		                "description": "Main Floor-Orchestra Level",
		                "name": "ORCH",
		                "areaId": "5"
		              }
			         ],
                    "hasEvenOddMix" : false}
                ],
                "offers" : [
                    {
                        "charges" : [
                            {
                                "amount" : 5.0,
                                "reason" : "facility",
                                "type": "fee"
                            }
                        ],

                        "currency": "USD",
                        "faceValue" : 50.0,
                        "offerDescription" : "GPAS2",
                        "offerName" : "GPAS2",
                        "priceLevelId" : "1",
                        "ticketTypeId" : "00000407000C"
                    }
                ]
            }
        ]
    }
}
{% endhighlight %}


{: .article}
## Captcha [GET]
{: #ticket-reservation}

Request captcha status and details for a given event. If captcha is currently enabled for the event, the response will include the captcha type plus other details on rendering the captcha.  Currently only ["Google NoCaptcha"](https://www.google.com/recaptcha/intro/index.html) is supported.  If captcha_required=true, then a solution token must be added to the cart reserve request and can be obtained through the following steps:

    1. Request captcha status and details via this endpoint
    2. If captcha_required=true, render the captcha page in a browser window or app webview.
    3. A callback to the location uri below will be made when the user solves the captcha. Capture the callback uri and parse out the solution token
       Example: ticketmaster-g-recaptcha-response://03AHJ_VuvOEHl06BZOuNzaJCgSyVi3QfgwPQ8gJxSAa6IEJ3Fjn1D-5eSe2
    4. Provide the solution token via the 'token' parameter in the reserve request


/partners/v1/captcha?apikey={apikey}&event_id={event_id}
{: .code .red}

*Polling: No*

### Parameters

| Parameter  | Description          | Type              | Example      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `apikey`   | Your API Key         | string            |     "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"          | Yes      |
| `event_id`   | TM event id         | string            |     "3F004CBB88958BF9"          | Yes      |


>[Request (html)](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
GET /partners/v1/captcha?apikey={apikey}&event_id={event_id}
Accept: text/html
{% endhighlight %}

{% highlight html %}
Status 200
Header: X-TM-CAPTCHA-V2-SITEKEY: <string>
Header: X-TM-CAPTCHA-V2-STOKEN: <string>
Header: X-TM-CAPTCHA-REQUIRED: <boolean true/false>

<html>
    <head>
        <script src="https://www.google.com/recaptcha/api.js"></script>
        <script>
        function callback(responseText) {
            location.href = "ticketmaster-g-recaptcha-response://" + responseText;
        }
        </script>
</head>
<body>
    <div class="g-recaptcha" data-sitekey="c0d60e1f4a711b710dc3dbe74fbd449c" data-callback="callback"></div>
</body>
</html>

{% endhighlight %}

>[Request (json)](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
GET /partners/v1/captcha?apikey={apikey}&event_id={event_id}
Accept: application/json
{% endhighlight %}

{% highlight html %}
Status 200
Header: X-TM-CAPTCHA-V2-SITEKEY: <string>
Header: X-TM-CAPTCHA-V2-STOKEN: <string>
Header: X-TM-CAPTCHA-REQUIRED: <boolean true/false>

{
  "captcha_required" : true,
  "captcha_details" : {
    "type" : 2,
    "site_key" : "c0d60e1f4a711b710dc3dbe74fbd449c"
  }
}

{% endhighlight %}




{: .article}
## Reserve tickets and create a Cart [POST]
{: #reserve-tickets}

Reserves the specified tickets. For integrations requiring captcha, send the captcha solution token in the json body.  A hold time will be returned in the cart response that will indicate, in seconds, how long the cart is available for.  This value may increase if the user moves through the cart process.<br/>

/partners/v1/events/{event_id}/cart?apikey={apikey}
{: .code .red}

*Polling: Yes*

### Parameters

| Parameter  | Description          | Type              | Example      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `event_id` | The 16-digit alphanumeric event ID.     | string            |     "0B004ED9FC825ACB"           | Yes      |
| `apikey`   | Your API Key         | string            |     "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"          | Yes      |

### Response structure:

{: .nested-list}

- (object) - response
    * `cart_id` (object) - Cart ID
    * `reserve` (object) - Reserve
    * `cart` (object) - Cart
        * `hold_time` (number) - Cart expiry time in seconds
        - `items` (array) - Items
            - {arrayitemobject} - item
                * `id` (number) - Item id
                * `type` (text) - Type of item. Eg 'ticket'
                * `x_num` (number) - X number
                * `end_seat_number` (number) - End Seat Number
                * `event_id` (text) - Event Id Eg. "3F004CBB88958BF9"
                * `num_seats` (number) - Number of seats
                * `row` (text) -  Name of Row Eg. "I"
                * `section` (text) - Section Name Eg. "MEZZ" for Mezzanine
                * `start_seat_number` (number) - Begin Seat Number
                * `is_ga` (boolean=true/false) - true if general admission else false.
                - `tickets` (array) - Tickets
                    - {arrayitemobject} - Ticket
                        * `charges` (array) - Charges
                            - {arrayitemobject} - Charge
                                * `price` (number) - 
                                * `quantity` (number) - 
                                * `tax` (number) - 
                                * `type` (text) - Type of charge Eg. distance, face_value, facility, service etc.      
                        * `description` (text) - Offer name
                        * `id` (text) - Ticket type Id
                        * `quantity` (number) -  Number of tickets reserved
                    - `totals` (array) - Totals
                    - {arrayitemobject} - Total
                        * `currency_code` (text) - Currency Eg. "USD"
                        * `fee` (number) - Fees
                        * `grand` (number) - Grand total
                        * `merchandise` ( number) - Base item value. Excludes fees, taxes, and delivery
                        * `delivery` (number) - Delivery charge
                        * `tax` (number) - Tax
                        * `unpaid` (number) - Unpaid balance
                        * `upsell` (number) - Upsell cost
                - `areas` (array) - Areas
                    - {arrayitemobject} - area
                        * `description` (text) - Description of the area or price level Eg. "100 Level" or "Price Level 6"
                        * `id` (number) - Area ID
        - `totals` (object) - Totals
            * `currency_code` (text) - Currency Eg. "USD"
            * `fee` (number) - Total Fees
            * `grand` (number) - Grand total
            * `merchandise` ( number) - Total base value of the items. Excludes fees, taxes, and delivery
            * `delivery` (number) - Total Delivery charge
            * `tax` (number) - Total Tax
            * `unpaid` (number) - Total Unpaid balance


>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
https://app.ticketmaster.com/partners/v1/events/0B004ED9FC825ACB/cart?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne

{
    "token" : <captcha solution token, if required>,

    "reserve" : {

        "tickets":[
            {
                "id": "000002040006", // Maintain leading-zeros in the ticket id as part of the string. 
                "quantity": 1,

                "price" : {
                    // Optional. For reserving best available within a price level discovered in Event Details.
                    "id" : 3,

                    // Optional. Only for accounts configured for variable-priced ticketing.
                    "amount" : 50.0
                }
            }
        ],

        // Optional.  For reserving best available within a specific area discovered in Event Details
        "areas" : [ { "id" : 2 } ],
        
				// Optional.  These are place ids from the ticket availability output which correspond to exact seat locations
        "places" : ["INGEEMRQHE5E2ORRG4", "INGEEMRQHE5E2ORRGA"],
				
        // Optional. Section/Row/Seat identifiers.  Using 'places' is preferred over this.
        "section": "CLB239",
        "row": "C",
        "begin_seat": 17,
        "end_seat" : 18,

        // If the requested seats (via place id or begin/end seat) are not available, use a Best Available search as a fallback.  Set to false to disable. Default is true.
        "accept_best_available": false
    }
}
{% endhighlight %}


{% highlight js %}
Status 200
{
    "cart_id" : "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo=",
    "cart": {
        "hold_time": 299,
        "items": [
            {
                "end_seat_number": "7",
                "event_id": "3F004CBB88958BF9", 
                "num_seats": 1,
                "row": "I",
                "section": "CLB234",
                "start_seat_number": "7",
                "tickets": [
                    {
                        "charges": [
                            {
                                "price": 0,
                                "quantity": 1,
                                "tax": 0,
                                "type": "distance"
                            },
                            {
                                "price": 25,
                                "quantity": 1,
                                "tax": 0,
                                "type": "face_value"
                            },
                            {
                                "price": 0,
                                "quantity": 1,
                                "tax": 0,
                                "type": "facility"
                            },
                            {
                                "price": 0,
                                "quantity": 1,
                                "tax": 0,
                                "type": "service"
                            }
                        ],
                        "description": "GPAS1",
                        "id": "000002040006",
                        "quantity": 1
                    }
                ],
                "totals": {
                    "currency_code": "USD",
                    "fee": 0,
                    "grand": 25,
                    "merchandise": 25,
                    "tax": 0
                }
            }
        ],
        "totals": {
            "delivery": 0,
            "fee": 0,
            "grand": 25,
            "merchandise": 25,
            "tax": 0,
            "unpaid": 25,
            "upsell": 0
        }
    }
}
{% endhighlight %}

{: .article}
## Shipping Options [GET]
{: #get-shipping-options}

Get shipping options available for this event.  Note: some API users will be pre-configured for certain shipping options and may not need to perform this.

/partners/v1/events/{event_id}/cart/shipping?apikey={apikey}&cart_id={cart_id}
{: .code .red}

*Polling: No*

### Parameters

| Parameter  | Description          | Type              | Example      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `event_id` | The 16-digit alphanumeric event ID.     | string            |     "0B004ED9FC825ACB"           | Yes      |
| `apikey`   | Your API Key         | string            |     "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"          | Yes      |
| `cart_id`   | Card identifier. Must be url encoded.         | string            |     "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D"          | Yes      |


>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
https://app.ticketmaster.com/partners/v1/events/0B004ED9FC825ACB/cart/shipping?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne&cart_id=bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D
{% endhighlight %}

{% highlight js %}
Status 200

{
    "shipping_options": [
        {
            "carrier": "TICKETMASTER",
            "id": "1",
            "service_level": "ETICKET",
            "totals": {
                "currency_code": "USD",
                "fee": 0.0,
                "grand": 0.0,
                "merchandise": 0.0,
                "tax": 0.0,
                "unpaid": 0.0
            }
        },
        {
            "carrier": "USPS",
            "id": "2",
            "service_level": "MAIL",
            "totals": {
                "currency_code": "USD",
                "fee": 0.5,
                "grand": 0.5,
                "merchandise": 0.0,
                "tax": 0.0,
                "unpaid": 0.0
            }
        },
        {
            "carrier": "USPS",
            "id": "3",
            "service_level": "AIRMAIL",
            "totals": {
                "currency_code": "USD",
                "fee": 0.5,
                "grand": 0.5,
                "merchandise": 0.0,
                "tax": 0.0,
                "unpaid": 0.0
            }
        },
        {
            "carrier": "TICKETMASTER",
            "id": "4",
            "service_level": "WILLCALL",
            "totals": {
                "currency_code": "USD",
                "fee": 2.5,
                "grand": 2.5,
                "merchandise": 0.0,
                "tax": 0.0,
                "unpaid": 0.0
            }
        }
    ]
}

{% endhighlight %}


{: .article}
## Shipping Options [PUT]
{: #add-shipping-option}

Add a shipping option to the event.  Note: some API users will be pre-configured for certain shipping options and may not need to perform this.

/partners/v1/events/{event_id}/cart/shipping?apikey={apikey}&cart_id={cart_id}
{: .code .red}

*Polling: Yes*

### Parameters

| Parameter  | Description          | Type              | Example      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `event_id` | The 16-digit alphanumeric event ID.     | string            |     "0B004ED9FC825ACB"           | Yes      |
| `apikey`   | Your API Key         | string            |     "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"          | Yes      |
| `cart_id`   | Card identifier. Must be url encoded.         | string            |     "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D"          | Yes      |


>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight js %}
    https://app.ticketmaster.com/partners/v1/events/0B004ED9FC825ACB/cart/shipping?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne&cart_id=bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D

    {"shipping_id": "4"}
{% endhighlight %}

{% highlight js %}
    Status 200

    {
        "cart" : {
            ...
        }
    }

{% endhighlight %}


{: .article}
## Encryption Certificate [GET]
{: #encrypt-cert}

Credit card information must be encrypted before sent to the API. Use this endpoint to get an encryption certificate value and id.  Not necessary for invoice transactions. Certificate is valid for 24 hours.

/partners/v1/certificate?apikey={apikey}
{: .code .red}

*Polling: No*

### Parameters

| Parameter  | Description          | Type              | Example      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `apikey`   | Your API Key         | string            |     "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"          | Yes      |

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
https://app.ticketmaster.com/partners/v1/certificate?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne
{% endhighlight %}

{% highlight js %}
Status 200
{
    "id": "paysys-dev.0.us.3",
    "value": "-----BEGIN CERTIFICATE-----\r\n
              MIIDdzCCAuCgAwIBAgIRAONU+AhqczriCWS/YmzJABEwDQYJKoZIhvcNAQEFBQAw\r\n
              gccxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpDYWxpZm9ybmlhMRcwFQYDVQQHEw5X\r\n
              ZXN0IEhvbGx5d29vZDEVMBMGA1UEChMMVGlja2V0bWFzdGVyMRwwGgYDVQQLExNT\r\n
              eXN0ZW1zIEVuZ2luZWVyaW5nMTEwLwYDVQQDEyhUaWNrZXRtYXN0ZXIgUGF5bWVu\r\n
              dCBTeXN0ZW1zIERFVlFBIENBIHYyMSIwIAYJKoZIhvcNAQkBFhNzZUB0aWNrZXRt\r\n
              YXN0ZXIuY29tMB4XDTEwMDIwNDIxNTY0NFoXDTIwMDIwNDIxNTY0NFowgb8xCzAJ\r\n
              BgNVBAYTAlVTMRMwEQYDVQQIEwpDYWxpZm9ybmlhMRcwFQYDVQQHEw5XZXN0IEhv\r\n
              bGx5d29vZDEVMBMGA1UEChMMVGlja2V0bWFzdGVyMRwwGgYDVQQLExNTeXN0ZW1z\r\n
              9WIi/k623qvlA3CoH7sladX0TO5yPO57aQzGnBwnTHyPMiGwIBi2s+dAliBMSUeB\r\n
              0W1pXCbffi6nOOBIdjRsnNa+OOMP2YWLufnTnc2YdJQUrsvqNEpzE9h0yJX2AlOy\r\n
              HTzCxxD7NVUZSAXyt2YEUePoFj4FS3RhmbnX\r\n
              -----END CERTIFICATE-----\r\n"
}
{% endhighlight %}

{: .article}
## Add Billing Information [PUT]
{: #post-card}

Add customer and payment information to the transaction. Note: required fields are dependent on client configuration.  Contact [developer@ticketmaster.com](mailto:developer@ticketmaster.com) for your particular set up.


Encrypt a credit card and cvv number using the following steps:

<ol>
    <li>Call `GET /certificate` to obtain the certificate value and id. The certificate will be valid for 24 hours.</li>
    <li>Before encrypting the sensitive data, salt it with 16 random ASCII characters at the beginning of the number. Make sure that these bytes are ASCII printables as non-printables will not work.</li>
    <li>When encrypting data, use RSA encryption with pkcs1 padding. Use the certificate value from step 1 as the public key.</li>
    <li>Base64 encode the result of the RSA encryption. This is the literal value to provide to the API.</li>
</ol>


Sample credit-card information for use in the production environment for event id 2000527EE48A9334 (see code examples below):

<ul>
    <li>payment.card.issuer=DISCOVER</li>
	<li>payment.card.number=6011993200001006</li>
	<li>payment.card.cvv=123</li>
	<li>payment.card.exp.month=12</li>
	<li>payment.card.exp.year=2020</li>
</ul>

/partners/v1/events/{event_id}/cart/payment?apikey={apikey}
{: .code .red}

### Parameters

| Parameter  | Description                              | Type              | Example                                   | Required |
|:-----------|:-----------------------------------------|:------------------|:------------------------------------------|:-------- |
| `event_id` | The 16-digit alphanumeric event ID.      | string            |     "0B004ED9FC825ACB"                    | Yes      |
| `apikey`   | Your API Key                             | string            |     "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"    |Yes      |


#### This is the request that is used for adding a credit card as a payment to the cart.

*Polling: No*  
*Authorization: No*

{: .nested-list}

- `payment` (object)  - Payment
    * `first_name` (string) - First name of buyer
    * `last_name` (string) - Last name of buyer
    * `home_phone` (string) - Phone number
    * `type` (string) - Valid values: CC, INVOICE, APPLE_PAY, GOOGLE_WALLET
    * `email_address` (string) - Email address of user
    * `amount` (number) - Amount to be charged
    * `reference` (string) - Required for type=INVOICE only. Your numeric string-quoted reference number for this invoice transaction.
    * `address` (object) - Address
        * `line1` (string) - Address line 1
        * `line2` (string) - Address line 2
        * `unit` (string) - Unit number
        * `city` (string) - City
        * `country` (object) - Country
            * `id` (number) - Required, use 840 for United States. See Appendix for other supported country codes
        * `region` (object) - Region
            * `abbreb` (string) Region abbreviation
        * `postal_code` (string) - Postal/Zip code
    * `card` (object) - Card information
        * `issuer` (string) - Issuer of card (VISA, MC, AMEX, DISCOVER)
        * `number` (string) - Encrypted credit card number (CC type only)
        * `cin` (string) - Encrypted cvv number (CC type only)
        * `encryption_key` (string) - Encryption certificate id (see certificate docs earlier, CC type only) 
        * `expire_month` (number) - Expiration month (two digit, CC type only)
        * `expire_year` (number) - Expiration year (four digits, CC type only)
        * `bundle` (string) - Encrypted Apple Pay or Google Wallet information


>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
https://app.ticketmaster.com/partners/v1/events/0B004ED9FC825ACB/cart/payment?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne

{

    "cart_id" : "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo=",

    "payment": {

        "first_name": "John",           
        "last_name": "Doe",             
        "home_phone": "212-867-5309",   
        "type": "CC",                   
        "email_address" : "john.doe@ticketmaster.com",

        "address": {                    
            "line1": "123 Main Street", 
            "line2": "",                
            "unit": "1h"                
            "city": "Los Angeles",      
            "country": {                
                "id": 840
            },
            "region": {                 
                "abbrev": "CA"
            },
            "postal_code": "90210"
        },
        "amount": "69.00",              
        "card": {                       
            "issuer" : "VISA",
            "number": "qvaEc5EX2bt5pt5DiTQR4J6iYZKxsujQPdw7LXCAnbeb8cD/CiXoB1V/pG2GAHBcHS/IdIMskFg=",
            "cin": "BYdEgXIxwz6bXG6OVQRKwj0wc9KE510eXRpwoEoTrd9t9i7=",
            "encryption_key": "paysys-dev.0.us.999",
            "expire_month": 12,
            "expire_year": 2020,
            "postal_code": "90210"
        }
    }
}
{% endhighlight %}



{% highlight js %}
Status 200
{
    "cart" : {
        ...
    }
}
{% endhighlight %}

#### This request is used to add a member payment method to the cart.

To see how to get the `id` that goes inside `billing_method` see ["View Member Payment Information"](#view-payment) or add new payment information to [Ticketmaster Member Account](#add-payment).

The request requires Member Authentication as a header with the request `Authorization: Bearer <access token>`.

*Polling: No*  
*Authorization: Required*

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
https://app.ticketmaster.com/partners/v1/events/0B004ED9FC825ACB/cart/payment?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne

{
    "cart_id": "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo=",
    "billing_method": {
        "id": "70561111"
    },
    "payment": {
        "amount": "119.00",
        "type": "CC",
        "card": {
            "cin": "BYdEgXIxwz6bXG6OVQRKwj0wc9KE510eXRpwoEoTrd9t9i7=",
            "encryption_key": "paysys-dev.0.us.999"
        }
    }
}
{% endhighlight %}



{% highlight js %}
Status 200
{
    "cart" : {
        ...
    }
}
{% endhighlight %}

Sample Java code using a certificate (arg 1) to encrypt a credit card or cvv number (arg 2):

{% highlight java %}
import javax.xml.bind.DatatypeConverter;
import javax.crypto.Cipher;

import java.io.ByteArrayInputStream;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class RSAEncrypt {
    public static void main(String argv[]) {
        try {
            String certB64 = argv[0];
            String cardNumber = argv[1];
          
            String saltedCardNumber = "1894167390133120" + cardNumber; 
                                    // ^ 16 random numbers 

            /* Load cert
               Cert should include begin and end cert, and be Base64 encoded, with line breaks.  For example:
-----BEGIN CERTIFICATE-----
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890AB
CDEFGHIJK=
-----END CERTIFICATE-----
            */
            String cleanCert = "-----BEGIN CERTIFICATE-----\n" + certB64.replaceAll("-----.*-----", "").replaceAll("[\\p{Space}]", "").replaceAll("(.{64})", "$1\n") + "\n-----END CERTIFICATE-----";

            CertificateFactory cf = CertificateFactory.getInstance("X.509");
            X509Certificate cert = (X509Certificate)cf.generateCertificate(new ByteArrayInputStream(cleanCert.getBytes()));

            //set up Cipher (for RSA)
            Cipher cipher = Cipher.getInstance("RSA");
            cipher.init(Cipher.ENCRYPT_MODE, cert);

            byte[] outputBytes = cipher.doFinal(saltedCardNumber.getBytes());
            String outputB64 = DatatypeConverter.printBase64Binary(outputBytes);
            System.out.println(outputB64);
        } catch(Exception e) {
            e.printStackTrace();
            System.exit(1);
        }
    }
}
{% endhighlight %}





{: .article}
## Commit Cart [PUT]
{: #purchase-tickets}

Finalize the purchase and commit the transaction. `source_account_id` can be any unique identifier of the user (i.e. hash of member id). This is required for tracking bounces of ticket redemption emails.<br/>

/partners/v1/events/{event_id}/cart?apikey={apikey}
{: .code .red}

*Polling: Yes*  
*Authorization: Required for auto claim of ticket to member account*

For now, the response is the same with or without the Authorization Header.

### Parameters

| Parameter  | Description          | Type              | Example      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `event_id` | The 16-digit alphanumeric event ID.     | string            |     "0B004ED9FC825ACB"           | Yes      |
| `apikey`   | Your API Key         | string            |     "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"          | Yes      |


### Properties

### Response structure:

{: .nested-list}

- (object) - response
    * `redemption_url` (url) - link to claim your tickets on ticketmaster
    * `grand_total` (number) - Total value of the order
    * `currency_code` (text) - Currency of the total value of the order
    * `order_token` (text) - Order Token
    * `order_number` (text) - HOST order ID
    * `tm_app_url` (url) - Custom scheme URL that Ticketmaster app supports

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight js %}
https://app.ticketmaster.com/partners/v1/events/0B004ED9FC825ACB/cart?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne

{ 
    "cart_id" : "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo=",
    "source_account_id" : "30f86cd70ac7216bc596aa2d060a7064", // Optional, your reference number (or hash) to correlate unredeemed orders
    "tracking" : { // Optional, report tracking variables (see GET /tracking endpoint)
        "shared_id" : "1",
        "sub_id1" : "3",
        "sub_id2" : "4",
        "sub_id3" : "5"
    }
    "attribute_overrides": { //Optional , to override the images for redemption and email. Contact Ticketmaster for access to override attributes.
      "images": {
        "email_1x": "http://s1.ticketm.net/dam/c/MUSIC_TABLET_LANDSCAPE_LARGE_16_9.jpg",
        "1x": "http://s1.ticketm.net/dam/c/MUSIC_TABLET_LANDSCAPE_LARGE_16_9.jpg",
        "web_1x": "http://s1.ticketm.net/dam/c/MUSIC_TABLET_LANDSCAPE_LARGE_16_9.jpg"
      }
    }
}
{% endhighlight %}


{% highlight js %}
Status 200
{
    "redemption_url" : "https://myorder.ticketmaster.com/redeem?token=28a67e13-7233-45a5lsGPQy0MZ3J7ZOQRjcW52NHhG083D",
    "grand_total" : 57.39,
    "order_token" : "28a67e13-7233-45a5lsGPQy0MZ3J7ZOQRjcW52NHhG083D",
    "order_number" : "35-46145/LA1"
}
{% endhighlight %}


{: .article}
## Delete Cart [DELETE]
{: #delete-cart}

Each partner has a limited amount of reservation resources that can be simultaneously in use. If the user abandons the reservation process, it is a good practice to manually delete the cart to allow these resources to be re-allocated. Increased [polling](#poll) may occur if carts are not cleaned up.  Not required if the user finalizes the transaction<br/>

/partners/v1/events/0B004ED9FC825ACB/cart?apikey={apikey}&cart_id={cart_id}
{: .code .red}

*Polling: Yes*

### Parameters

| Parameter  | Description          | Type              | Example      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `event_id` | The 16-digit alphanumeric event ID.     | string            |     "0B004ED9FC825ACB"           | Yes      |
| `apikey`   | Your API Key         | string            |     "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"          | Yes      |
| `cart_id`   | Card identifier. Must be url encoded.         | string            |     "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D"          | Yes      |


>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight js %}
https://app.ticketmaster.com/partners/v1/events/0B004ED9FC825ACB/cart?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne&cart_id=bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo
{% endhighlight %}

{% highlight js %}
Status 204
{% endhighlight %}

{: .article}
## Polling [GET]
{: #poll}

Resource endpoints that have polling enabled may alternatively return a json response with a polling url and wait time, along with http status code=202.  This is used to inform client applications of long-waiting operations and queuing restrictions for particular actions in the Ticketmaster system.

Client applications may receive the following json response for any resource marked "Polling: Yes".

{% highlight js %}
{
    "polling_url": "https://app.ticketmaster.com/partners/v1/polling/cart/tickets/PUT/00000001080E06000000006BB7C4A8C0?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne&cart_id=bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D",
    "wait": 4
}
{% endhighlight %}

Client applications should call *polling_url* with a GET request after waiting 4
seconds.  It is possible that this request may also result in another polling response.

Clients can test polling by issuing the following header: `X-TM-FORCE-POLLING: true` to any of the endpoints marked "Polling: Yes".

The output of the original action will eventually be returned in the body of the response.


/partners/v1/polling/.../?apikey={apikey}&cart_id={cart_id}
{: .code .red}

### Parameters

| Parameter  | Description          | Type              | Example      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `apikey`   | Your API Key         | string            |     "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"          | Yes      |
| `cart_id`   | Card identifier. Must be url encoded.         | string            |     "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D"          | Yes      |


>[Request](#req)
>[Response](#res)
{: .reqres}


{% highlight bash %}
https://app.ticketmaster.com/partners/v1/polling/cart/tickets/PUT/00000001080E06000000006BB7C4A8C0?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne&cart_id=bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D
{% endhighlight %}


{% highlight js %}
Status 202
{
    "polling_url": "https://app.ticketmaster.com/partners/v1/polling/cart/tickets/PUT/00000001080E06000000006BB7C4A8C0?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne&cart_id=bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D",
    "wait": 4
}

Status 200
{
    // json payload from originally requested response (status code = 200)
}

{% endhighlight %}



{: .article}
## Add Member Payment Information to Ticketmaster Account [POST]
{: #add-payment}

Collect the member payment information and save it to their Ticketmaster Account for future payments.

Encrypt the credit card number using the following steps:

<ol>
    <li>Call `GET /certificate` to obtain the certificate value and id. The certificate will be valid for 24 hours.</li>
    <li>Before encrypting the sensitive data, salt it with 16 random bytes. Make sure that these bytes are ASCII printables as non-printables will not work.</li>
    <li>When encrypting data, use RSA encryption with pkcs1 padding. Use the certificate value from step 1 as the public key.</li>
    <li>Base64 encode the result of the RSA encryption. This is the literal value to provide to the API.</li>
</ol>


The "id" you get in the response can be used in the [Add TM Payment Information](#post-card-tm) along with an encrypted cvv. The request requires Member Authentication as a header with the request `Authorization: Bearer <access token>`. 

The `cart_id` is optional in the request. If this request is being made while a cart is created, then it is recommended that the `cart_id` be added in the request body.

*Polling: No*  
*Member Authorization: Required*

/partners/v1/member/billing?apikey={apikey}
{: .code .red}

### Parameters

| Parameter  | Description          | Type              | Example      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `apikey`   | Your API Key         | string            |     "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"          | Yes      |


>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
https://app.ticketmaster.com/partners/v1/member/billing?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne

{
    "cart_id": "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo=",  //Optional
    "billing_method":                       //All Fields are required.
    {
        "address": {
            "city": "Los Angeles",
            "country": {
                "id": 840
            },
            "line1": "123 My Street",
            "line2": "testadd2",
            "postal_code": 90210,
            "region": {
                "abbrev": "CA"
            },
            "unit": 1234
        },
        "type": "CC",
        "card": {
            "expire_month": 12,
            "expire_year": 2020,
            "issuer": "VISA",
            "encryption_key": "paysys-dev.0.us.999",
            "number": "JvWajg8hahdWPXeMNn2+N4SMxEAoA03sAABy/t2Ga4rHUm9TGbz0oOIWLXgZCVG3WtgwOfqqMN6ijM4AXiYbt+KsFJCA1WVD02vSG+H+/Pj2fIZ13fvyORES2l3wSYZ80KdVz6fkyLRLRtT6o0hyATozyMnFLxpqhsk3CKkiGNE="
        },
        "first_name": "Jon",
        "last_name": "Bastin",
        "home_phone": "555-555-5555"
    }
}


{% endhighlight %}

{% highlight js %}
Status 200
{
    "billing_method": {
        "card": {
            "encryption_key": "paysys-dev.0.us.999"
        },
        "id": 70561111
    }
}

{% endhighlight %}

{: .article}
## View Member Payment Information [GET]
{: #view-payment}

Get saved Ticketmaster Member Information which I can be used to make payment for the exisiting cart. You list out the payment options and which ever option the customer chooses, use the "id" of that payment method in the "Add TM Payment Method".

The request requires Member Authentication as a header with the request `Authorization: Bearer <access token>`. The `cart_id` is optional in the request. If this request is being made while a cart is created, then it is recommended that the `cart_id` be added in the request.

*Polling: No*  
*Member Authorization: Required*

/partners/v1/member/billing?apikey={apikey}&cart_id={cart_id}
{: .code .red}

### Parameters

| Parameter  | Description          | Type              | Example      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `apikey`   | Your API Key         | string            |     "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"          | Yes      |
| `cart_id`   | Card identifier. Must be url encoded.         | string            |     "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D"          | Yes      |


>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
https://app.ticketmaster.com/partners/v1/member/billing?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne&cart_id=bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D


{% endhighlight %}

{% highlight js %}
Status 200
{
    "data": [{
        "address": {
            "city": "Los Angeles",
            "country": {
                "id": 840,
                "standard": "ISO"
            },
            "line1": "123 My Street",
            "line2": "testadd2",
            "postal_code": "90210",
            "region": {
                "abbrev": "CA"
            },
            "unit": "1234"
        },
        "card": {
            "expire_month": 12,
            "expire_year": 2020,
            "issuer": "VISA",
            "number": "0011",
            "type": "VISA"
        },
        "first_name": "Jon",
        "home_phone": "5555555555",
        "id": "70561111",
        "last_name": "Bastin",
        "type": "CC"
    }]
}
{% endhighlight %}

{: .article}
## Order management [GET]
{: #order-mangement}

Get detailed information about an order. For specifically-enabled accounts only.

/partners/v1/orders?order_token={order_token}?apikey={apikey}
{: .code .red}

*Polling: Yes*

### Parameters

| Parameter  | Description          | Type              | Example      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `apikey`   | Your API Key         | string            |     "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"          | Yes      |
| `order_token`   | An order token         | string            |     "28a67e13-7233-45a5lsGPQy0MZ3J7ZOQRjcW52NHhG083D"          |  No     |


>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
https://app.ticketmaster.com/partners/v1/orders?order_token=28a67e13-7233-45a5lsGPQy0MZ3J7ZOQRjcW52NHhG083D?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne
{% endhighlight %}

{% highlight js %}
Status 200
{
    "customer_email": "joe.qa@ticketmaster.com",
    "tickets": [
        {
            "barcode_id": "8819624561542398",
            "charges": [
                {
                    "amount": {
                        "amount": 66.0,
                        "currency": "USD"
                    },
                    "description": "Price",
                    "sub_type": "price",
                    "type": "price"
                },
                {
                    "amount": {
                        "amount": 0.0,
                        "currency": "USD"
                    },
                    "description": "Service Charge",
                    "sub_type": "service_charge",
                    "type": "fee"
                },
                {
                    "amount": {
                        "amount": 0.0,
                        "currency": "USD"
                    },
                    "description": "Facility Charge",
                    "sub_type": "facility_charge",
                    "type": "fee"
                },
                {
                    "amount": {
                        "amount": 0.0,
                        "currency": "USD"
                    },
                    "description": "Tax",
                    "sub_type": "tax",
                    "type": "tax"
                },
                {
                    "amount": {
                        "amount": 0.0,
                        "currency": "USD"
                    },
                    "description": "Distance Charge",
                    "sub_type": "distance_charge",
                    "type": "fee"
                }
            ],
            "display_id": "29-16792/PHX",
            "distance_charge": 0.0,
            "event_code": "EGOLD",
            "event_host": "PHX",
            "event_id": "3F004EC9D1EBBC76",
            "is_ga": false,
            "is_national_vip": false,
            "order_date": "2015-12-10",
            "order_number": "29-16792/PHX",
            "portal": "USE WEST GATES",
            "row": "K",
            "seat_id": "252313614",
            "seat_name": "16",
            "section": "CLB237",
            "voided": false
        }
    ],
    "delivery": {
        "carrier": "USPS",
        "description": {
            "short": "US Postal Mail"
        },
        "service_level": "MAIL"
    },
    "upsells": [],
    "voided": false
}
{% endhighlight %}


{: .article}
## Unredeemed orders [GET]
{: #unredeemed-orders}

Retreive unredeemed orders within a given time period. Some orders may have had bad email addresses, or emails that went to spam. Use your app's notification features to notify the user of an unredeemed order. This endpoint requires IP-address whitelisting.  Please contact us for details.

/partners/v1/orders/unredeemed?apikey={apikey}
{: .code .red}

### Parameters

| Parameter  | Description          | Type              | Example      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `apikey`   | Your API Key         | string            |     "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"          | Yes      |
| `days_from_purchase`   | Number of days since purchase was made. This or days_before_event is required.         | string            |     ""          | No      |
| `days_before_event`   | Number of days before event date.         | string            |     ""          | No      |


>[Request](#req)
>[Response](#res)
{: .reqres}


{% highlight bash %}
https://app.ticketmaster.com/partners/v1/orders/unredeemed?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne
{% endhighlight %}

{% highlight js %}
Status 200
{
    "data" : [
        {
            "purchase_date_time" : 1441341339000, // milliseconds since unix epoch
            "email_status": 2, // 1=Sent (additional status unknown), 2=Bounced, 3=Spam, 4=Send Error
            "event_date_time": 1471737600000,
            "event_id" : "3F004EC9D1EBBC76",
            "order_source_account_id" : "fb63e3ede36210317e9e0fc5efccbc1f", // same value supplied with original order purchase
            "purchase_email_address" : "john.tester@gmail.com" // email address supplied with original order purchase
        }
    ]
}
{% endhighlight %}

{: .article}
## Error Responses
{: #error-responses}

Client or API-side errors will generate a json-formatted response body as well as standard HTTP status codes.

Example:

{% highlight js %}
{
    "error": {
        "message" : "Invalid input data type",
        "code": 10002,
        "http_code":400,
        "severity":"ERROR"
    }
}
{% endhighlight %}

| message  | code  | http_code              | Note
|:-----------|:---------------------|:----------------- |
| Unauthorized access | 10004 | 401 | Captcha solution token required |
| Event is not API transactable | 90001 | 403 | Event type is not supported through this API. Offer redirect to https://www.ticketmaster.com/event/{eventId} |
| No inventory found to match request | 20052 | 400 | Example of sold-out tickets, per ticket id. Can also occur if the number of available continuous seats cannot be fulfilled |
| Unauthorized Access | 10004 | 401 | Missing captcha token |
| Invalid captcha solution | 10031 | 400 | Invalid captcha solution |
| Payment Not Accepted | 20122 | 400 | |
| Please enter a valid security code | 20152 | 400 | Invalid CVV/Security code on back of credit card |
| Ticketing system is down/unavailable/niterun | 20001 | 503 |  |
| Invalid cart | 90003 | 400 | cart_id parameter is invalid or stale |
| Invalid Delivery Method ID | 10104 | 400 ||
| Event had no visible/usable ticket types for the current channel | 20046 | 400 | API user is not configured to sell the specified ticket types |
| Payment method has no funds available | 20129 | 400| |
| Connection error to upstream service | 502 | 502| |
| Upstream service timeout | 504 | 504 | | 


{: .article}
Clients can reference the *code* field when communicating and debugging errors with Ticketmaster. We will automatically be notified of any internal, unrecoverable errors.


## Examples
{: #examples}

The following illustrates a typical purchase flow:

### 1. Discover event ticket information.

Request: `GET /partners/v1/events/09004E6CE6325123`

Further ticketing operations only allowed if event.api_transactable=true.  Display a list of areas and price levels to the user to select a ticket type + price level to reserve.

### 2. Display captcha to user

Request: `GET /partners/v1/captcha`

Response contains html to render in a webview containing a Google NoCaptcha ReCaptcha form.  Upon user-submit, the form will redirect the page to ticketmaster-g-recaptcha-response://{captcha-token}.
Listen for redirects on the webview and obtain the captcha-token.

### 3. Submit the captcha-token with reserve criteria and start a new cart session

Request: `POST /partners/v1/events/09004E6CE6325123/cart`
Body: `{"token" : "2822b0737710e549a2f74c1e65be19b9", "reserve" : { "tickets": [ {"id": "000000000001"}] }}`

Post the captcha token. Response contains cart_id to be used on further operations on this cart.

Response:
`{"cart_id" : "6LcA5cESAAAAAPsVEe0jgHVOqlKIbkHaeK0HGhQ6cd34a074e785f2107de2c9fea0016c20", "cart" : ...}`


### 4. Get payment encryption certificate. Extract `id` and `value` from response.

Request: `GET /partners/v1/certificate`

### 5. Add encrypted payment information.  Encrypt the credit card number and cvv for the payload (see example in Payment section)

Request: `PUT /partners/v1/events/09004E6CE6325123/cart/payment`

Request body:

{% highlight js %}
{

    "cart_id" : "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo=",

    "payment": {

        "first_name": "John",           
        "last_name": "Doe",             
        "home_phone": "212-867-5309",   
        "type": "CC",                   

        "address": {
            "line1": "123 Main Street", 
            "line2": "",                
            "unit": "1h",                
            "city": "Los Angeles",      
            "country": {                
                "id": 840
            },
            "region": {                 
                "abbrev": "CA"
            },
            "postal_code": "90210"
        },
        "amount": "69.00",              
        "card": {                       
            "number": "qvaEc5EX2bt5pt5DiTQR4J6iYZKxsujQPdw7LXCAnbeb8cD/CiXoB1V/pG2GAHBcHS/IdIMskFg=",
            "cin": "BYdEgXIxwz6bXG6OVQRKwj0wc9KE510eXRpwoEoTrd9t9i7=",
            "encryption_key": "paysys-dev.0.us.999",
            "expire_month": 12,
            "expire_year": 2020,
            "postal_code": "90210"
        }
    }
}
{% endhighlight %}

### 6. Purchase the tickets

Request: `PUT /partners/v1/events/09004E6CE6325123/cart`

Request body:

{% highlight js %}
{
    "cart_id" : "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo=",
    "source_account_id" : "30f86cd70ac7216bc596aa2d060a7064"
}
{% endhighlight %}

Response:

{% highlight js %}
{
    "redemption_url" : "http://myorder-qa.ticketmaster.net/redeem?event_id=3F004EC9D1EBBC76&token=d2999e02-4936-41d2-zhNgdH2B7xGuuv50sAJsrJZCMY",
    "order_token" : "d2999e02-4936-41d2-zhNgdH2B7xGuuv50sAJsrJZCMY",
    "order_number" : "35-46145/LA1",
    "grand_total":68.74
}
{% endhighlight %}


## Versions
{: #versions}

| Date | API Major Version | Minor Version | Comment |
| ---- | ----------------- | ------------- | ------- |
| 2015-10-01 |        1          |      0        | Initial |
| 2015-10-12 |        1          |      0        | Updated captcha and cart session usage|
| 2016-04-16 |        1          |      0        | Updated reserve endpoint|


## Appendix
{: #appendix}

State IDs for cart purchase request

| state_id | name | state_id | name |
| -------- | ---- | -------- | ---- |
| 1| Alabama                          | 43| New York |
| 2| Alaska                           | 44| North Carolina |
| 3| American Samoa                   | 45| North Dakota |
| 4| Arizona                          | 46| Northern Mariana Islands |
| 5| Arkansas                         | 47| Ohio |
| 6| Armed Forces Other               | 48| Oklahoma |
| 7| Armed Forces Americas            | 49| Oregon |
| 11| Armed Forces Pacific            | 50| Palau |
| 12| California                      | 51| Pennsylvania |
| 13| Colorado                        | 52| Puerto Rico |
| 14| Connecticut                     | 53| Rhode Island |
| 15| Delaware                        | 54| South Carolina |
| 16| District Of Columbia            | 55| South Dakota |
| 17| Federated States Of Micronesia  | 56| Tennessee |
| 18| Florida                         | 57| Texas |
| 19| Georgia                         | 58| Utah |
| 20| Guam                            | 59| Vermont |
| 21| Hawaii                          | 60| Virgin Islands |
| 22| Idaho                           | 61| Virginia |
| 23| Illinois                        | 62| Washington |
| 24| Indiana                         | 63| West Virginia |
| 25| Iowa                            | 64| Wisconsin |
| 26| Kansas                          | 65| Wyoming |
| 27| Kentucky                        | 66| Alberta |
| 28| Louisiana                       | 67| British Columbia |
| 29| Maine                           | 68| Manitoba |
| 30| Marshall Islands                | 69| New Brunswick |
| 31| Maryland                        | 70| Newfoundland and Labrador |
| 32| Massachusetts                   | 71| Northwest Territories |
| 33| Michigan                        | 72| Nova Scotia |
| 34| Minnesota                       | 73| Nunavut |
| 35| Mississippi                     | 74| Ontario |
| 36| Missouri                        | 75| Prince Edward Island |
| 37| Montana                         | 76| Quebec |
| 38| Nebraska                        | 77| Saskatchewan |
| 39| Nevada                          | 78| Yukon |
| 40| New Hampshire | | |
| 41| New Jersey | | |
| 42| New Mexico | | |


Country Codes

| country_id | name |
| ---------- | ---- |
| 840 | United States of America |
| 124 | Canada |
|  36 | Australia |
| 484 | Mexico |
| 554 | New Zealand |


