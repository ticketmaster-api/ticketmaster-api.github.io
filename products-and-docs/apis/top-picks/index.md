---
layout: documentation
categories:
- documentation
- top-picks
title: Top Picks API
excerpt: Seat recommendations based on current availability, sampling across various areas of a venue and available price points.
keywords: Partner API, TopPicks, Top Picks, host and API, reserve tickets
---

{: .article}
# Top Picks API

The Top Picks API provides seat recommendations based on current availability, sampling across various areas of a venue and available price points. Results are near real-time but for certain high velocity events picks may expire (sell out) quickly.
{: .article .lead}

## Overview
{: #overview }

### Authentication

Clients will be provided an API key from Ticketmaster which should be added to every resource endpoint call.

Example: `https://app.ticketmaster.com/top-picks/v1/events/3F004EC9D1EBBC76?apikey=3QIvq55bS608ai6r8moig1WdW57bONry`

### Host and API endpoint information

https://app.ticketmaster.com/top-picks/v1

All connections must be made over SSL using https.

### Terms and Conditions
By using the Ticketmaster Developer Portal, you understand and agree to our [Terms of Use](/support/terms-of-use/partner).

### Contact

Ticketmaster Developer Program [developer@ticketmaster.com](mailto:developer@ticketmaster.com).

### Service Availability

The Ticketmaster back-end reservation systems are distributed globally and events are processed on their local systems.  These systems go into a nightly maintenance mode at 2AM local time. This means a show playing at Madison Square Garden will not be transactable between 2-3AM Eastern Time.  Use the timezone value from the event details response to note when these events may be unavailable for transactions.


{: .article}
## Top Picks Details  [GET]
{: #top-picks-details}

Retrieve reservable seat information based on specific criteria.

/top-picks/v1/events/{event_id}?apikey={apikey}
{: .code .red}

### URL Parameters

| Parameter  | Description          | Type              | Example      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `event_id` | The 16-digit alphanumeric event ID.     | string            |     "0B004ED9FC825ACB"           | Yes      |

### Query Parameters

| Parameter  | Description          | Type              | Example      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `apikey`   | Your API Key         | string            |     GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne          | Yes      |
| `quantity`   | Quantity of tickets         | number            |     2          | No (default=2)      |
| `ticketTypeId`   | Ticket type ID         | string            |     000000000001          | No      |
| `priceLevels` | Comma-separated price Levels to search | numbers | 0,1 | No |
| `areas` | Comma-separated area IDs to search | numbers | 10,11 | No |
| `sections` | Comma-separated section names | string | GA,103,201 | No |
| `prices` | Price range | numbers | 50,150 | No |

### Response structure:

{: .nested-list}

- `picks` (array) - Picks.
    - `{array item object}` - pick.
        * `quality` (number) - A quality score representing a combination of price and location to stage.
        * `areaId` (string) - An area id usable for reserves
        * `section` (string) - The section name in the venue
        * `row` (string) - The row in the section
        * `snapshotImageUrl` - Combine with snapshotImageBase to form an image url of this pick in the venue
        * `offers` (array) - Offers.    
            - `{array item object}` - offer.
                - `offer id` (string) - The offer id corresponding to one in _embedded.offer[].
- `_embedded` (object) - container for events.
    * `offer` (array) - Offers matching those found in picks[] items.
        - `{array item object}` - offer.
            * `offerId` (string) - The offer id.
            * `name` (string) - Name of the offer.
            * `ticketTypeId` (string) - Ticket type id required for reserves.
            * `priceLevelId` (string) - Price level id (optional for reserves).
            * `description` (string) - Description of the offer.
            * `currency` (string) - ISO 4217 currency code.
            * `faceValue` (number) - Face value of one ticket.
            * `totalPrice` (number) - Total price including charges (may not include order processing fees).

            * `charges` (array) - Charges.    
                - `{array item object}` - charge.
                    - `reason` (string) - Name of charge.
                    - `type` (string) - Type of charge.
                    - `amount` (number) - Amount of charge
- `snapshotImageBase` (string) - Base url for snapshotImageUrl values in picks data.

>[Request](#req)
>[Response](#res)
{: .reqres}


{% highlight bash %}
https://app.ticketmaster.com/top-picks/v1/events/1C00506FB56F338A?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne&areas=10,11&prices=70,150&quantity=4&ticketTypeId=000000000001&sections=103
{% endhighlight %}

{% highlight json %}
Status 200
{
  "picks": [
    {
      "quality": 0.626072,
      "areaId": "10",
      "section": "103",
      "row": "18",
      "snapshotImageUrl": "image?systemId=HOST&segmentIds=s_10,s_11,s_113,s_114,s_115,s_116,s_117,s_118,s_119,s_12,s_120,s_13,s_14,s_16,s_17,s_18,s_2,s_22,s_5,s_6,s_8,s_9&placeId=GEYDGORRHA5DS",
      "offers": [
        "GJ6DC7BQ"
      ]
    }
  ],
  "_embedded": {
    "offer": [
      {
        "offerId": "GJ6DC7BQ",
        "name": "Standard Ticket",
        "ticketTypeId": "000000000001",
        "priceLevelId": "0",
        "description": "Standard Ticket",
        "currency": "USD",
        "faceValue": 76.5,
        "totalPrice": 93.25,
        "charges": [
          {
            "reason": "service",
            "type": "fee",
            "amount": 13.75
          },
          {
            "reason": "facility",
            "type": "fee",
            "amount": 3
          }
        ]
      }
    ]
  },
  "snapshotImageBase": "http://mapsapi.tmol.co/maps/geometry/3/event/1C00506FB56F338A/"
}
{% endhighlight %}


## Snapshot Image [GET]
{: #snapshot-image}

A visual-representation of the approximate location of seats in the venue. Each result from the Top Picks API contains a snapshotImageUrl.  When combined with snapshotImageBase, clients can load and render a .png image of the pick to the user.


### Query Parameters
All query parameters in snapshotImageUrl must be maintained and un-altered. Clients may add the following:

| Parameter  | Description          | Type              | Example      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `w`   | The width, in pixels, of the image.         | number            |     300          | No      |
| `pw`   | The width, in pixels, of the dropped pin in the image.         | number            |     30          | No      |


![pick image](/assets/img/products-and-docs/top-pick-1.png)



