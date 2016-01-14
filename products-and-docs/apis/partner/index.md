---
layout: documentation
categories:
- documentation
- partner
redirect_from: 
- "/apis/commerce/"
- "/apis/partners/"
- "/apis/partner/"
---

{: .article}
# Partner API

The Ticketmaster Partner-App API lets users purchase tickets through your app's native experience. Users will receive an email with a link to ticketmaster.com or our mobile app to redeem tickets.

## Overview
{: #overview }

### Authentication

Clients will be provided an API key from Ticketmaster which should be added to every resource endpoint call.

Example: `https://app.ticketmaster.com/partners/v1/cart?apikey=3QIvq55bS608ai6r8moig1WdW57bONry`

### Host and API endpoint information

Production: https://app.ticketmaster.com/partners/v1

Staging: https://app.ticketmaster.com/partners-sandbox/v1

All connections must be made over SSL using https.

All ticketing and polling requests must include the header `True-Client-IP` which includes the user's ip address. Optionally, you may pass `Original-User-Id` to identify specific users to aid in debugging. As part of our bot-detection efforts we use all headers to model good and bad behavior.  Therefore you may send as much identifiable information about the client including browser user-agent, ip address, user id (if logged in), etc.

### Best Practices

Polling results from limited per-partner resources in the ticketing system. Clients should always be ready to handle polling responses. See the [polling section](#polling) for more details.

#### Cleanup

If a user abandons a page/tab after a ticket reserve has been made, client applications should do their best to detect this and issue a `DELETE /cart` request to free up allocated resources on the ticketing server.  This should also be done if client apps no longer want to wait through a long, continuing polling process.  This is necessary since ticket reserve requests that result in polling will eventually complete asynchronously and take up resources even if clients do not consume the next polling url.

### Terms and Conditions

By using the Ticketmaster Developer Portal, you understand and agree to our [Terms of Use](/support/terms-of-use/partner).


### Contact

Ticketmaster Distributed Commerce team [developer@ticketmaster.com](mailto:developer@ticketmaster.com).


### Service Availability

The Ticketmaster back-end reservation systems are distributed globally and events are processed on their local system.  These systems go into a nightly maintenance mode at 2AM local time. This means a show playing at Madison Square Garden will not be transactable between 2-3AM Eastern Time.  Use the timezone value from the event details response to note when these events may be unavailable for transactions.



{: .article}
## Retrieve Event Details  [GET]
{: #event-details}

Group Event Details. Event and ticket information
Retrieve details for a given event including the ticket type & pricing details. The boolean field `api_transactable` indicates if this event can be sold through the API.  If not, clients should be forwarded to the Ticketmaster mobile-web event page.  

/partners/v1/events/{event_id}?apikey={apikey}
{: .code .red}

*Polling: No*

###URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `event_id` | The 16-digit alphanumeric event ID.     | string            |     "0B004ED9FC825ACB"           | Yes      |
| `apikey`   | Your API Key         | string            |     "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"          | Yes      |

>[Request](#req)
>[Response](#res)
{: .reqres}


{% highlight bash %}
https://app.ticketmaster.com/partners/v1/events/0B004ED9FC825ACB?apikey={apikey}
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


{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/partners/v1/events/0B004ED9FC825ACB?apikey={apikey}",
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
curl https://app.ticketmaster.com/partners/v1/events/0B004ED9FC825ACB?apikey={apikey}
{% endhighlight %}



{: .article}
## Event Availability [GET]
{: #inventory-management}

Group Inventory Management. Inventory endpoints for specifically-enabled accounts only.
Discover events available to transact on

/partners/v1/events
{: .code .red}

*Polling: No*

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
curl https://app.ticketmaster.com/partners/v1/events
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

{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/partners/v1/events",
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
curl https://app.ticketmaster.com/partners/v1/events
{% endhighlight %}

{: .article}
## Ticket Availability [GET]
{: #ticket-availability}

Group Inventory Management. Inventory endpoints for specifically-enabled accounts only.
Get total allocated and remaining ticket amounts for each ticket type per event. Current un-sold seat inventory is also included along with the current ticket reservation limit.

/partners/v1/events/{event_id}/availability
{: .code .red}

*Polling: No*

###URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `event_id` | The 16-digit alphanumeric event ID.     | string            |     "0B004ED9FC825ACB"           | Yes      |


>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
https://app.ticketmaster.com/partners/v1/events/0B004ED9FC825ACB/availability
{% endhighlight %}


{% highlight js %}
Status 200
{
    "event" : {
        "id":"3F004CBB88958BF9",
        "restrictSingle" : true,  // indicates a reserve cannot leave 1 seat remaining among a contiguous set of seats
        "eventTicketLimit" : 10,  // 0 = unlimited for this event, but reserves may still be limited by current seat inventory (currentTicketLimit) 
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
                    { "section" : "209", "row" : "B", "seats" : [ 2, 4, 6, 8, 10, 12, 16], "hasEvenOddMix" : false}
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


{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/partners/v1/events/0B004ED9FC825ACB/availability",
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
curl https://app.ticketmaster.com/partners/v1/events/0B004ED9FC825ACB/availability
{% endhighlight %}



{: .article}
## Retrieve an Event  [GET]
{: #retrieve-event}

Group Inventory Management. Inventory endpoints for specifically-enabled accounts only.
Returns an alphanumeric event id based on a Venue-supplied event code+host combination<br/>

/partners/v1/events/code/{event_code}/{event_host}
{: .code .red}

*Polling: No*

###URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `event_code` | The event code given by the venue.     | string            |     "1"           | Yes      |
| `event_host` | The event host given by the venue.     | string            |     "1"           | Yes      |


>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
https://app.ticketmaster.com/partners/v1/events/code/1/1
{% endhighlight %}

{% highlight js %}
Status 200
{
    "event" : {
        "id" : "0B004D43F86C478F"

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
  url:"https://app.ticketmaster.com/partners/v1/events/code/1/1",
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
curl https://app.ticketmaster.com/partners/v1/events/code/1/1
{% endhighlight %}



{: .article}
## Get captcha page [GET]
{: #ticket-reservation}

Group Ticket reservation and purchasing.

Services related to Ticket reservation and purchasing. Only events marked with `api_transactable` (from Event Details response) can transact on this API. All ticketing operations require the client to first solve a captcha to establish a secure session. Upon posting the Captcha solution, a cart id will be returned and required for further cart operations.

Retreive captcha information to render to the user.

/partners/v1/captcha?apikey={apikey}
{: .code .red}

*Polling: No*

###URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `apikey`   | Your API Key         | string            |     "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"          | Yes      |




>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
https://app.ticketmaster.com/partners/v1/captcha?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne
{% endhighlight %}

{% highlight html %}
Status 200

Header: X-TM-CAPTCHA-V2-SITEKEY: <sitekey>
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

{ "token" : "<token received from captcha solution>" }
{% endhighlight %}



{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/partners/v1/captcha?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne",
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
curl https://app.ticketmaster.com/partners/v1/captcha?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne
{% endhighlight %}


{: .article}
## Post captcha solution [POST]
{: #post-captcha}

Post captcha solution and establish a cart session<br/>

/partners/v1/cart?apikey={apikey}
{: .code .red}

*Polling: No*



>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
https://app.ticketmaster.com/partners/v1/cart?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne
{% endhighlight %}


{% highlight js %}
Status 200
{"cart_id" : "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo="}
{% endhighlight %}

{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"POST",
  url:"https://app.ticketmaster.com/partners/v1/cart?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne",
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
curl -X POST https://app.ticketmaster.com/partners/v1/cart?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne
{% endhighlight %}


{: .article}
## Reserve tickets and create a Cart [PUT]
{: #reserve-tickets}

Reserves the specified tickets.  Multiple ticket types can be added to the `tickets` array as part of an adult+child combination if available.

*Polling: Yes*

/partners/v1/cart/tickets?apikey={apikey}
{: .code .red}

####URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `apikey`   | Your API Key         | string            |     "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"          | Yes      |


### Properties

Model (application/json)

{: .nested-list}
+ event (object)
    - id 0B004ED9FC825ACB (string)
    - tickets (array)
        + id (string)
        + quantity (number)
        + price (object, optional)
    - amount (number, optional) 


>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight js %}
https://app.ticketmaster.com/partners/v1/cart/tickets?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne

{
    "cart_id" : "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo=",

    "event": { "id": "3F004CBB88958BF9",
               "tickets": [
                    {
                        "id": "000002040006", // Maintain leading-zeros in the ticket id as part of the string. 
                        "quantity": 1,

                        // Optional. For reserving best available within a price level discovered in Event Details
                        "price" : {  
                            "id" : 3 
                        }
                    },

                    // Optional.  For reserving best available within an area discovered in Event Details
                    "areas" : [
                        { "id" : 2 }
                    ]
               ]

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

{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"PUT",
  url:"https://app.ticketmaster.com/partners/v1/cart/tickets?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne",
  async:true,
  data: eventObject,
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
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X PUT -d @eventObject.json https://app.ticketmaster.com/partners/v1/cart/tickets?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne
{% endhighlight %}


{: .article}
## Encryption Certificate [GET]
{: #encrypt-cert}

Group Ticket reservation and purchasing.
Credit card information must be encrypted before sent to the API. Use this endpoint to get an encryption certificate value and id.

/partners/v1/certificate?apikey={apikey}&cart_id={cart_id}
{: .code .red}

*Polling: No*

###URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `apikey`   | Your API Key         | string            |     "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"          | Yes      |
| `cart_id`   | Cart ID for this session. Must be url encoded.         | string            |     "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D"          | Yes      |

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
https://app.ticketmaster.com/partners/v1/certificate?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne&cart_id=bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D
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


{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/partners/v1/certificate?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne&cart_id=bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D",
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
curl https://app.ticketmaster.com/partners/v1/certificate?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne&cart_id=bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D
{% endhighlight %}

{: .article}
## Post credit card information [PUT]
{: #post-card}

Group Ticket reservation and purchasing.
Add customer billing and credit card information to the transaction. Set `encryption_key` with the `id` value from the output of /certificate. After encrypting the credit card number and cvv, clients should call `[PUT] /partners/v1/cart` to finalize the purchase and obtain an order number.

Encrypt the credit card and cvv number using the following steps:

<ol>
    <li>Call `GET /certificate` to obtain the certificate value and id. The results will be valid for 24 hours.</li>
    <li>Before encrypting the sensitive data, salt it with 16 random bytes. Make sure that these bytes are ASCII printables as non-printables will not work.</li>
    <li>When encrypting data, use RSA encryption with pkcs1 padding. Use the certificate value from step 1 as the public key.</li>
    <li>Base64 encode the result of the RSA encryption. This is the literal value to provide to the API.</li>
</ol><br/>

Fake credit-card information for use in the sandbox environment:

<ul>
    <li>CC#: 4588883206000011</li>
    <li>CVV: 123</li>
    <li>Expiration: 12/2020</li>
</ul>


*Polling: No*

/partners/v1/cart/payment?apikey={apikey}
{: .code .red}

###URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `apikey`   | Your API Key         | string            |     "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"          | Yes      |



### Properties

Model (application/json)

{: .nested-list}
+ cart_id (string)
+ payment (object)
    - first_name (string)
    - last_name (string)
    - home_phone (string)
    - type (string)
    - reference (string)
    - email_address (string)
    - address (object)
        + line1 (string)
        + line2 (string)
        + unit (string)
        + city (string)
        + country (object)
            - id (number)
        + region (object)
            - region (string)
        + postal_code (string)
    - amount (number)
    - card (object)
        + number (string)
        + cin (string)
        + encryption_key (string)
        + expire_month (number)
        + expire_year (number)
        + postal_code (string)






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
            String inputData = argv[1];

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

            byte[] outputBytes = cipher.doFinal(inputData.getBytes());
            String outputB64 = DatatypeConverter.printBase64Binary(outputBytes);
            System.out.println(outputB64);
        } catch(Exception e) {
            e.printStackTrace();
            System.exit(1);
        }
    }
}
{% endhighlight %}


>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
https://app.ticketmaster.com/partners/v1/cart/payment?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne
{% endhighlight %}

{% highlight js %}
{

    "cart_id" : "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo=",

    "payment": {

        "first_name": "John",           // Required
        "last_name": "Doe",             // Required
        "home_phone": "212-867-5309",   // Required
        "type": "CC",                   // Required, CC or INVOICE
        "reference" : "15278303",        // Required for type=INVOICE only. Your numeric reference number for this invoice transaction.
        "email_address" : "john.doe@ticketmaster.com", // Required

        "address": {                    // Optional. (parameters below may be required if address block is supplied)
            "line1": "123 Main Street", // Required
            "line2": "",                // Field required, but empty allowed
            "unit": "1h"                // Optional
            "city": "Los Angeles",      // Required
            "country": {                // Required, use 840 for United States or 36 for Canada
                "id": 840
            },
            "region": {                 // Required
                "abbrev": "CA"
            },
            "postal_code": "90210",     // Required
        },
        "amount": "69.00",              // Required for type=CC
        "card": {                       // All fields Required for type=CC
            "number": "qvaEc5EX2bt5pt5DiTQR4J6iYZKxsujQPdw7LXCAnbeb8cD/CiXoB1V/pG2GAHBcHS/IdIMskFg=", // encrypted, json-encoded credit-card number
            "cin": "BYdEgXIxwz6bXG6OVQRKwj0wc9KE510eXRpwoEoTrd9t9i7=", // encrypted, json-encoded cvv number
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


{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"PUT",
  url:"https://app.ticketmaster.com/partners/v1/cart/payment?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne",
  async:true,
  data: paymentObject,
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
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X PUT -d @paymentObject.json https://app.ticketmaster.com/partners/v1/cart/payment?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne
{% endhighlight %}



{: .article}
## Purchase Tickets [PUT]
{: #purchase-tickets}

Group Ticket reservation and purchasing.
Finalize the purchase and commit the transaction. `source_account_id` can be any unique identifier of the user (i.e. hash of member id). This is required for tracking bounces of ticket redemption emails.<br/>

/partners/v1/cart?apikey={apikey}
{: .code .red}

*Polling: Yes*

###URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `apikey`   | Your API Key         | string            |     "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"          | Yes      |


### Properties

Model (application/json)

+ cart_id (string)
+ source_account_id (string)

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight js %}
https://app.ticketmaster.com/partners/v1/cart?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne
{ 
    "cart_id" : "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo=",
    "source_account_id" : "30f86cd70ac7216bc596aa2d060a7064" // Your system's reference number (or hash) to correlate unredeemed orders
}
{% endhighlight %}




{% highlight js %}
Status 200
{
    "redemption_url" : "https://myorder.ticketmaster.com/redeem?token=28a67e13-7233-45a5lsGPQy0MZ3J7ZOQRjcW52NHhG083D",
    "tm_app_url" : "ticketmaster:///partners/redeem?token=28a67e13-7233-45a5lsGPQy0MZ3J7ZOQRjcW52NHhG083D",
    "grand_total" : 57.39,
    "order_token" : "28a67e13-7233-45a5lsGPQy0MZ3J7ZOQRjcW52NHhG083D"
}
{% endhighlight %}


{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"PUT",
  url:"https://app.ticketmaster.com/partners/v1/cart?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne",
  async:true,
  data: purchaseObject,
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
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X PUT -d @purchaseObject.json https://app.ticketmaster.com/partners/v1/cart?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne
{% endhighlight %}



{: .article}
## Delete a Cart [DELETE]
{: #delete-cart}

Group Ticket reservation and purchasing.

Delete a Cart. Each partner has a limited amount of reservation resources that can be simultaneously in use. If the user abandons the reservation process, it is a good practice to manually delete the cart to allow these resources to be re-allocated. Increased polling may occur if carts are not cleaned up.  Not required if the user finalizes the transaction<br/>

/partners/v1/cart?apikey={apikey}&cart_id={cart_id}
{: .code .red}

*Polling: Yes*

###URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `apikey`   | Your API Key         | string            |     "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"          | Yes      |
| `cart_id`   | Cart ID for this session. Must be url encoded.         | string            |     "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D"          | Yes      |


>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight js %}
https://app.ticketmaster.com/partners/v1/cart?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne&cart_id=bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo
{% endhighlight %}

{% highlight js %}
Status 204
{% endhighlight %}



{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"DELETE",
  url:"https://app.ticketmaster.com/partners/v1/cart?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne&cart_id=bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo",
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
curl -X DELETE https://app.ticketmaster.com/partners/v1/cart?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne&cart_id=bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo
{% endhighlight %}




{: .article}
## Order management [GET]
{: #order-mangement}

Group Order Management.
Backend operations for order management.
Get detailed information about an order. For specifically-enabled accounts only. 

/partners/v1/orders?order_number={order_number}?apikey={apikey}
{: .code .red}

###URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `apikey`   | Your API Key         | string            |     "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"          | Yes      |
| `order_number`   | An order number (ex. 39-5234153/LA1)         | string            |     ""          | Yes      |



>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
https://app.ticketmaster.com/partners/v1/orders?order_number=39-5234153&#47LA1?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne
{% endhighlight %}

{% highlight js %}
Status 200
{
    "customer_email": "joe.qa@ticketmaster.com",
    "tickets": [
        {
            "barcode_display_date": {
                "format": "datetime",
                "value": "2015-12-09T23:30:37Z"
            },
            "barcode_id": "8819624561542398",
            "barcode_url": "https://api-intqa.ticketmaster.net/tap/endpoint/restv1/barcode/AES-1.0.0-0001-Q6SE4RS7ZJ3KCHQ62LUESAPPRMPPJME4HT6EV4F7LX7GSE5CIVMOGD35EGLNQ536LVDWUGVIIT6TY.png",
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
            "event_name": "Seattle Sounders FC vs. San Jose Earthquakes",
            "face_value": 66.0,
            "facility_charge": 0.0,
            "is_ga": false,
            "is_national_vip": false,
            "order_date": "2015-12-10",
            "order_number": "29-16792/PHX",
            "portal": "USE WEST GATES",
            "row": "K",
            "seat_id": "252313614",
            "seat_name": "16",
            "section": "CLB237",
            "service_charge": 0.0,
            "tax": 0.0,
            "text": [
                "",
                "SEATTLE SOUNDERS FC",
                "VS",
                "SAN JOSE EARTHQUAKES",
                "CENTURYLINK FIELD",
                "SAT AUG 20 2016 7:00PM"
            ],
            "ticket_type_description": {
                "description": "FULL PRICE - UNDER 3 ON LAP",
                "id": "000000000001"
            },
            "transfer_eligibility": "available",
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

{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/partners/v1/orders?order_number=39-5234153&#47LA1?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne",
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
curl https://app.ticketmaster.com/partners/v1/orders?order_number=39-5234153&#47LA1?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne
{% endhighlight %}


{: .article}
## Unredeemed orders [GET]
{: #unredeemed-orders}

Group Order Management.
Backend operations for order management.
Retreive unredeemed orders within a given time period. Some orders may have had bad email addresses, or emails that went to spam. Use your app's notification features to notify the user of an unredeemed order. This endpoint requires IP-address whitelisting.  Please contact us for details.

/partners/v1/orders/unredeemed?apikey={apikey}
{: .code .red}

###URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
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

{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/partners/v1/orders/unredeemed?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne",
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
curl https://app.ticketmaster.com/partners/v1/orders/unredeemed?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne
{% endhighlight %}



{: .article}
## Poll [GET]
{: #polling}

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

Clients can test polling by issuing the following header: `X-TM-FORCE-POLLING: true`

The output of the original action will eventually be returned in the body of the response.

Polling urls may be received from resources marked with "Polling: Yes" and can return subsequent polling responses.

/partners/v1/polling/.../?apikey={apikey}&cart_id={cart_id}
{: .code .red}

###URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `apikey`   | Your API Key         | string            |     "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"          | Yes      |
| `cart_id`   | Cart ID for this session. Must be url encoded.         | string            |     "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D"          | Yes      |


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
{% endhighlight %}


>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
https://app.ticketmaster.com/partners/v1/polling/cart/tickets/PUT/00000001080E06000000006BB7C4A8C0?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne&cart_id=bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D
{% endhighlight %}


{% highlight js %}
Status 200
{
    // json payload from originally requested response (status code = 200)
}
{% endhighlight %}

{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/partners/v1/polling/cart/tickets/PUT/00000001080E06000000006BB7C4A8C0?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne&cart_id=bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D",
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
curl https://app.ticketmaster.com/partners/v1/polling/cart/tickets/PUT/00000001080E06000000006BB7C4A8C0?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne&cart_id=bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D
{% endhighlight %}


{: .article}
## Group Error Responses
{: #error-responses}

{: .article}
Client or API-side errors will generate a json-formatted response body as well as standard HTTP status codes.

Example:

{% highlight js %}
{
    "error": {
        "message" : "Invalid input data type",
        "code": 10002
        "http_code":400,
        "severity":"ERROR"
    }
}
{% endhighlight %}

---
{: .aside}

{: .article}
Event not transactable.

Example:

{% highlight js %}
{
    "error": {
        "message": "Event is not API transactable",
        "code": 90001
        "http_code":403,
        "severity":"ERROR"
    }
}
{% endhighlight %}

---
{: .aside}

{: .article}
Example of sold-out tickets, per ticket id. Can also occur if the number of available continuous seats cannot be fulfilled:

{% highlight js %}
{
    "error": {
        "message": "No inventory found to match request",
        "code": 20052
    }
}
{% endhighlight %}

---
{: .aside}

{: .article}
Missing captcha token:

{% highlight js %}
{
    "error": {
        "message":"Unauthorized Access",
        "code":10004,
        "http_code":401,
        "severity":"ERROR"
    }
}
{% endhighlight %}

---
{: .aside}

{: .article}
Incorrect or stale captcha token:

{% highlight js %}
{
    "error": {
        "message":"Invalid captcha solution.",
        "code":10031,
        "http_code":400,
        "severity":"ERROR"
    }
}
{% endhighlight %}

---
{: .aside}

{: .article}
Payment not accepted:

{% highlight js %}
{
    "error": {
        "message":"Payment Not Accepted",
        "code":20122,
        "http_code":400,
        "severity":"ERROR"
    }
}
{% endhighlight %}

---
{: .aside}

{: .article}
Invalid CVV/Security code on back of credit card:

{% highlight js %}
{
    "error": {
        "message":"Please enter a valid security code.",
        "code":20152,
        "http_code":400,
        "severity":"ERROR"
    }
}
{% endhighlight %}

---
{: .aside}

{: .article}
Ticketing system is down/unavailable/niterun

{% highlight js %}
{
    "error": {
        "message":"Ticketing system is down/unavailable/niterun",
        "code":20001,
        "http_code":400,
        "severity":"DEBUG"
    }
}
{% endhighlight %}

---
{: .aside}

{: .article}
Invalid cart id

{% highlight js %}
{
    "error": {
        "message":"Invalid cart",
        "code": 90003,
        "http_code":400,
        "severity":"ERROR"
    }
}
{% endhighlight %}

---
{: .aside}

{: .article}
Clients can reference the *code* field when communicating and debugging errors with Ticketmaster. We will automatically be notified of any internal, unrecoverable errors.

The following status codes will be used by this API

| Status Code | Description |
| ----------- | ----------- |
| 200         | OK. Successful operation |
| 202         | Polling response |
| 204         | Operation completed successfully. No content returned. (See Cart DELETE method) |
| 401         | Unauthorized access to API. May be missing *apikey* parameter |
| 404         | API endpoint or event not found. |
| 405         | HTTP method not allowed for endpoint |
| 406         | Input/parameters not acceptable |
| 500         | Internal error occurred |
| 503         | Service is unavailable |


## Group Examples
{: #examples}

The following illustrates a typical purchase flow:

###1. Discover event availability and ticket information.

Request: `GET /partners/v1/event/09004E6CE6325123`

Further ticketing operations only allowed if event.api_transactable=true.  Display a list of areas and price levels to the user to select a ticket type + price level to reserve.

###2. Display captcha to user

Request: `GET /partners/v1/captcha`

Response contains html to render in a webview containing a Google NoCaptcha ReCaptcha form.  Upon user-submit, the form will redirect the page to ticketmaster-g-recaptcha-response://{captcha-token}.
Listen for redirects on the webview and obtain the captcha-token.

###3. Exchange captcha-token for a new cart session

Request: `POST /partners/v1/cart`
Body: `{"token" : "2822b0737710e549a2f74c1e65be19b9"}`

Post the captcha token. Response contains cart_id to be used on further operations on this cart.

Response:
`{"cart_id" : "6LcA5cESAAAAAPsVEe0jgHVOqlKIbkHaeK0HGhQ6cd34a074e785f2107de2c9fea0016c20"}`


###4. Make a reserve call.

Request: `PUT /partners/v1/cart/tickets`

Request body:

{% highlight js %}
{
    "cart_id" : "6LcA5cESAAAAAPsVEe0jgHVOqlKIbkHaeK0HGhQ6cd34a074e785f2107de2c9fea0016c20",
    "event": {
              "id" : "09004E6CE6325123",
              "tickets": [ {"id": "000000000001", "quantity": 1, "price": {"id" : 5}}]
    }
}
{% endhighlight %}

###5. Get payment encryption certificate. Extract `id` and `value` from response.

Request: `GET /partners/v1/certificate`

###6. Add encrypted payment information.  Encrypt the credit card number and cvv for the payload (see example in Payment section)

Request: `PUT /partners/v1/cart/payment`

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

###7. Purchase the tickets

Request: `PUT /partners/v1/cart`

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
    "tm_app_url" : "ticketmaster:///partners/redeem?token=28a67e13-7233-45a5lsGPQy0MZ3J7ZOQRjcW52NHhG083D",
    "order_token" : "d2999e02-4936-41d2-zhNgdH2B7xGuuv50sAJsrJZCMY",
    "grand_total":68.74
}
{% endhighlight %}


## Group Versions
{: #versions}

| Date | API Major Version | Minor Version | Comment | Author |
| ---- | ----------------- | ------------- | ------- | ------ |
| 2015-10-01 |        1          |      0        | Initial | Ryan Aviles |
| 2015-10-12 |        1          |      0        | Updated captcha and cart session usage | Ryan Aviles |


## Group Appendix
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


