---
layout: documentation
categories:
- documentation
- partner
---

## Ticketmaster Partner-App API


{: .lead #lead}
The Ticketmaster Partner-App API lets users purchase tickets through your app's native experience. Users will receive an email with a link to ticketmaster.com or our mobile app to redeem tickets.<br/><br/>


### Authentication

Clients will be provided an API key from Ticketmaster which should be added to every resource endpoint call.


Example: `https://app.ticketmaster.com/partners/v1/cart?apikey=3QIvq55bS608ai6r8moig1WdW57bONry`
access token is good for 1 hour with no refresh capabilities.

##Authorization: 
>
~~~
curl -v -X POST https://app.ticketmaster.com/partners-sandbox/v1/oauth/accesstoken?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne -d 'grant_type=cient_credentials' -H 'Authorization: Basic R2tCOFowMzdaZnFiTENOdFpWaUFnckVlZ2Jzclo2TmU6TXpLM2xjWnVMcHZHaEQ5Wg=='
~~~
>
~~~
{
  "issued_at" : "1448168101229",
  "scope" : "",
  "status" : "approved",
  "expires_in" : "3599",
  "token_type" : "BearerToken",
  "client_id" : "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne",
  "access_token" : "tW0tqWjB74Q4KQMOSEwbMhOhvADf"
}
~~~
>
~~~
curl -v -H "Authorization: Bearer 9dWz7IstBLgcgfEAsJ5ppmUFK0Gy" -H "Accept: application/json" -X GET "https://app.ticketmaster.com/partners-sandbox/v1/event/3F004EC9D1EBBC76?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"
~~~

Basic base64 encoded apikey:client-secret


### Host and API endpoint information
Production: https://app.ticketmaster.com/partners/v1

Staging: https://app.ticketmaster.com/partners-sandbox/v1

All connections must be made over SSL using https.

{: .anc}
All ticketing and polling requests must include the header`True-Client-IP` which includes the user's ip address. Optionally, you may pass`Original-User-Id` to identify specific users to aid in debugging. As part of our bot-detection efforts we use all headers to model good and bad behavior.  Therefore you may send as much identifiable information about the client including browser user-agent, ip address, user id (if logged in), etc.<br/><br/>

{: .right}
### Best Practices
Polling results from limited per-partner resources in the ticketing system. Clients should always be ready to handle polling responses. See the <a href="#polling">polling section</a> for more details.

**Cleanup**

If a user abandons a page/tab after a ticket reserve has been made, client applications should do their best to detect this and issue a `DELETE /cart` request to free up allocated resources on the ticketing server.  This should also be done if client apps no longer want to wait through a long, continuing polling process.  This is necessary since ticket reserve requests that result in polling will eventually complete asynchronously and take up resources even if clients do not consume the next polling url.<br/><br/>


### Terms and Conditions
By using the Ticketmaster Developer Portal, you understand and agree to our <a href="/apis/api-terms">Terms of Use</a><br/><br/>

---

### Contact
Ticketmaster Distributed Commerce team <a href="mailto:developer@ticketmaster.com">developer@ticketmaster.com</a><br/><br/>


### Service Availability
The Ticketmaster back-end reservation systems are distributed globally and events are processed on their local system.  These systems go into a nightly maintenance mode at 2AM local time. This means a show playing at Madison Square Garden will not be transactable between 2-3AM Eastern Time.  Use the timezone value from the event details response to note when these events may be unavailable for transactions.


## Group Event Details
>
###__Model__
>
(application/json)
>
~~~js
{    
    "api_transactable" : true,  // indicates tickets can be sold through this API
    "event": {
        "tickets": [
            {
                "description": "GPAS1",
                "id": "000002040006",
                "prices": [
                    {
                        "amount": 25,
                        "display_amount": 25,
                        "id": 0,
                        "price_details": [
                            {
                                "amount": {
                                    "amount": 25,
                                    "currency": "USD"
                                },
                                "type": "face_value"
                            }
                        ]
                    }
                ],
                "quantities": {
                    "exact": 0,
                    "limit": 10,
                    "minimum": 1,
                    "multiple": 1
                }
            }
        ],
        "artists": [
            {
                "id": 916285,
                "name": "Seattle Sounders FC",
                "rank": 1,
                "single_performer_or_band": false
            },
            {
                "id": 806017,
                "name": "San Jose Earthquakes",
                "rank": 2,
                "single_performer_or_band": false
            }
        ],
        "currency_code": "USD",
        "event_image": {
            "height": 115,
            "location": "http://share.livenation.com/images/default_image.jpg",
            "width": 205
        },
        "eventdate": {
            "format": "datetime",
            "value": "2015-08-21T02:00:00Z"
        },
        "facility_fee_rollup": true,
        "id": "3F004CBB88958BF9",
        "name": "Seattle Sounders FC vs. San Jose Earthquakes",
        "notes": [
            {
                "text": "There is a 10 ticket limit per household.",
                "type": "ticketlimittext"
            }
        ],
        "offsale": {
            "format": "datetime",
            "value": "2015-08-21T00:00:00Z"
        },
        "onsale": {
            "format": "datetime",
            "value": "2014-06-25T01:56:29Z"
        },
        "presales": [
            {
                "format": "daterange",
                "label": "Internet Presale",
                "value": "2014-06-20T23:55:00Z/2014-07-31T03:00:00Z"
            }
        ],
        "price_range": {
            "description": "Prices subject to change",
            "max": {
                "display_amount": 25,
                "face_value": 25,
                "fees": 0
            },
            "min": {
                "display_amount": 25,
                "face_value": 25,
                "fees": 0
            }
        },
        "promoter": {
            "id": 494,
            "name": "PROMOTED BY VENUE"
        },
        "publication": {
            "format": "datetime",
            "value": "2014-01-27T18:00:00Z"
        },
        "purchase_organization": "TM",
        "quantities": {
            "limit": 10
        },
        "service_fee_rollup": false,
        "statuses": [
            {
                "type": "onsale",
                "value": "2014-06-25T01:56:29Z"
            }
        ], 
        "type": {
            "id": 0
        },
        "url": "http://ticketmaster.com/event/3F004CBB88958BF9",
        "venue": {
            "id": 516191,
            "location": {
                "address": {
                    "city": "Seattle",
                    "country": {
                        "abbrev": "US"
                    },
                    "region": {
                        "abbrev": "WA"
                    }
                },
                "time_zone": "America/Los_Angeles"
            },
            "markets": [
                {
                    "id": 42,
                    "name": "Greater Seattle Area"
                }
            ],
            "name": "CenturyLink Field"
        }
    }
}
~~~



Event and ticket information

### Event 
{: .pull-quote #pull-quote}
/partners/v1/event/{event_id}?apikey={apikey}

####Parameters
+ __event_id__ (string, `0B004ED9FC825ACB`) ... The 16-digit alphanumeric event ID.
+ __apikey__ (string, `GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne`) ... Your API Key

---

## Group Versions

| Date | API Major Version | Minor Version | Comment | Author |
| ---- | ----------------- | ------------- | ------- | ------ |
| 2015-10-01 |        1          |      0        | Initial | Ryan Aviles |
| 2015-10-12 |        1          |      0        | Updated captcha and cart session usage | Ryan Aviles |


## Group Appendix
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


