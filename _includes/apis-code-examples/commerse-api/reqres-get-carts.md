
{% highlight HTTP %}
GET /commerce/v2/shopping/carts/{cartId}.json?{apikey} HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive

{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Rate-Limit-Over: 0
Content-Length: 21532
Rate-Limit-Available: 498399
Set-Cookie: CMPS=EB55hDR95pURN1HyCaJoxuyEQcA8Sv2aKm4J/YaMBOYTHywQO/XHcWL6t8TWHLkL; path=/
Access-Control-Allow-Methods: POST, PATCH, DELETE, GET, HEAD, OPTIONS
X-TM-SESSION-BID: commerce-shopping
Connection: keep-alive
Access-Control-Allow-Credentials: true
Server: Apache-Coyote/1.1
Rate-Limit-Reset: 1468530242515
Access-Control-Allow-Headers: Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers
Date: Thu, 14 Jul 2016 18:15:12 GMT
Access-Control-Allow-Origin: *
X-TM-SESSION-SID: 49D8E7AAEF70BE318E4CEB599C499675
X-Application-Context: commerce-api-commerce-shopping-v1:default,jash1:8080
Content-Type: application/json;charset=UTF-8
Rate-Limit: 500000

{
  "cart": {
    "id": "01643524-c6ff-449f-922b-388d2f501a32.jash1",
    "type": "carts",
    "attributes": {
      "reservations": [
        {
          "expiration": "2016-09-19T18:51:05.278Z",
          "itemGroups": [
            {
              "type": "ticket-item-groups",
              "metadata": {
                "type": "tmss-ticket-item-group-meta",
                "lineItem": "1"
              },
              "id": "1-000000000001",
              "quantity": 1,
              "currency": "USD",
              "perItemPrice": "225.00",
              "fees": [
                {
                  "label": "Distance Fee",
                  "amount": "0.00",
                  "type": "distance"
                },
                {
                  "label": "Facility Fee",
                  "amount": "12.00",
                  "type": "facility"
                },
                {
                  "label": "Service Fee",
                  "amount": "28.25",
                  "type": "service"
                }
              ],
              "taxes": [
                {
                  "label": "Service",
                  "amount": "0.00",
                  "type": "service"
                },
                {
                  "label": "Service",
                  "amount": "0.00",
                  "type": "service"
                }
              ],
              "offer": "000000000001"
            }
          ],
          "itemDetails": [
            {
              "type": "ticket-block-details",
              "metadata": {
                "type": "ticket-block-detail-meta",
                "itemGroup": "1-000000000001"
              },
              "section": "ORCH 2",
              "row": "JJ",
              "startSeat": "21",
              "endSeat": "21",
              "ga": false
            }
          ],
          "reservation": "1",
          "product": "090050A9ED5B49D9"
        }
      ],
      "fees": [
        {
          "label": "Processing Fee",
          "amount": "0.00",
          "type": "processing_fee"
        }
      ],
      "taxes": [
        {
          "label": "Processing Tax",
          "amount": "0.00",
          "type": "processing_tax"
        }
      ],
      "totals": {
        "currency": "USD",
        "price": "225.00",
        "fees": "40.25",
        "taxes": "0.00",
        "deliveries": "0.00",
        "upsells": "0.00",
        "total": "265.25"
      }
    },
    "relationships": {
      "events": {
        "data": [
          {
            "id": "vvG10Zf1EcpVE_",
            "type": "events"
          }
        ]
      },
      "products": {
        "data": [
          {
            "id": "090050A9ED5B49D9",
            "type": "products"
          }
        ]
      },
      "offers": {
        "data": [
          {
            "id": "000000000001",
            "type": "offers"
          }
        ]
      }
    },
    "metadata": {
      "type": "cart-meta",
      "external-ids": [
        {
          "id": "596e8618-60a6-4ee9-8caf-c2babcff03c4",
          "provider": "host"
        }
      ]
    }
  },
  "_embedded": {
    "events": {
      "data": [
        {
          "id": "vvG10Zf1EcpVE_",
          "type": "events",
          "attributes": {
            "name": "Ozzfest Meets Knotfest 2 Day  Festival Pass  Sat Sept 24 & Sun Sept 25"
          },
          "relationships": {
            "products": {
              "data": [
                {
                  "id": "090050A9ED5B49D9",
                  "type": "products"
                }
              ]
            },
            "offers": {
              "data": [
                {
                  "id": "000000000001",
                  "type": "offers"
                }
              ]
            }
          },
          "metadata": {
            "type": "event-meta",
            "source": {
              "id": "090050A9ED5B49D9",
              "name": "ticketmaster"
            }
          }
        }
      ]
    },
    "products": {
      "data": [
        {
          "id": "090050A9ED5B49D9",
          "type": "products",
          "attributes": {},
          "relationships": {
            "offers": {
              "data": [
                {
                  "id": "000000000001",
                  "type": "offers"
                }
              ]
            },
            "events": {
              "data": [
                {
                  "id": "vvG10Zf1EcpVE_",
                  "type": "events"
                }
              ]
            }
          }
        }
      ]
    },
    "offers": {
      "data": [
        {
          "id": "000000000001",
          "type": "offers",
          "attributes": {
            "name": "Standard Ticket",
            "description": "Standard Ticket"
          },
          "relationships": {
            "products": {
              "data": [
                {
                  "id": "090050A9ED5B49D9",
                  "type": "products"
                }
              ]
            },
            "events": {
              "data": [
                {
                  "id": "vvG10Zf1EcpVE_",
                  "type": "events"
                }
              ]
            }
          }
        }
      ]
    }
  },
  "status": "200"
}
{% endhighlight %}
