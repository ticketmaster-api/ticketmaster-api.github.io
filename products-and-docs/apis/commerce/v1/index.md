---
layout: documentation
categories: products-and-docs/apis/commerce/
id: com1
---

##Commerse REST API


>

###Event Offers

Method: GET. 

Authentication required.

Returns Event Offers.

###Template parameters:

- version - The API Version. Required. Default value "v2";
- id - Event ID. Required. Default value "05004F24E0B864B3";
- format - API Response Format. Required. Default value "json".

>
~~~
https://app.ticketmaster.com/commerce/v2/events/05004F24E0B864B3/offers.json
~~~

>
~~~json
{
  "limits": {
    "max": 8
  },
  "prices": {
    "_embedded": [
      {
        "type": "offered-prices",
        "attributes": {
          "currency": "USD",
          "value": "17.00"
        },
        "relationships": {
          "offers": {
            "_embedded": [
              {
                "id": "000062800006",
                "type": "offers"
              },
              {
                "id": "000062810006",
                "type": "offers"
              }
            ]
          },
          "price-zones": {
            "_embedded": [
              {
                "id": "1",
                "type": "price-zones"
              }
            ]
          }
        }
      }
    ]
  },
  "price-zones": {
    "_embedded": [
      {
        "id": "1",
        "type": "price-zones",
        "attributes": {
          "currency": "USD",
          "name": "PRICE LEVEL 1"
        },
        "relationships": {
          "offers": {
            "_embedded": [
              {
                "id": "000000000001",
                "type": "offers"
              },
              {
                "id": "000050820004",
                "type": "offers"
              },
              {
                "id": "000052830004",
                "type": "offers"
              },
              {
                "id": "000062800006",
                "type": "offers"
              },
              {
                "id": "000062810006",
                "type": "offers"
              },
              {
                "id": "00006E840004",
                "type": "offers"
              }
            ]
          },
          "areas": {
            "_embedded": [
              {
                "id": "3",
                "type": "areas"
              }
            ]
          }
        }
      }
    ]
  }
}
~~~

