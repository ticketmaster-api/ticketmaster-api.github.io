{% highlight HTTP %}
PATCH /commerce/v2/shopping/carts/{cartid}/payments.json?{apikey} HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive

{
"pollingCallbackUrl" : "http://requestb.in/14hknvt1",
 "payments":[
   {
     "type":"wallet",
     "op":"add",
     "token":"encryptedWalletToken1",
     "cvv":"123",
     "amount":{
       "amount":"19.00",
       "currency":"USD"
     }
   },
   {
     "type":"cash",
     "amount":{
       "amount":"19.00",
       "currency":"USD"
     }
   }
 ]
}
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

"cart": {
    "id": "8dc07b26-9b81-4b75-94cc-b66a83332f83.intqa102",
    "type": "carts",
    "attributes": {
      "reservations": [
        {
          "expiration": "2016-09-19T18:43:00.103Z",
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
              "perItemPrice": "63.00",
              "fees": [
                {
                  "label": "Distance Fee",
                  "amount": "0.00",
                  "type": "distance"
                },
                {
                  "label": "Facility Fee",
                  "amount": "0.00",
                  "type": "facility"
                },
                {
                  "label": "Service Fee",
                  "amount": "0.00",
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
              "section": "F3",
              "row": "B",
              "startSeat": "36",
              "endSeat": "36",
              "ga": false
            }
          ],
          "reservation": "1",
          "product": "3F004E7EE3F5B5AC"
        }
      ],
      "deliveries": [
        {
          "id": "3",
          "type": "delivery",
          "attributes": {
            "totals": {
              "currency": "USD",
              "price": "0.00",
              "fees": "0.00",
              "taxes": "0.00",
              "total": "0.00"
            },
            "reservations": [
              "1"
            ],
            "deliveryType": "TICKETMASTER"
          }
        }
      ],
      "payments": [
              {
                  "id": "walletToken",
                  "type": "credit_card_payments",
                  "amount": "19.00",
                  "currency": "USD"
              },
              {
                  "id": "cashPaymentId",
                  "type": "cash_payments",
                  "amount": "19.00",
                  "currency": "USD"
              }
      ],
      "fees": [
        {
          "label": "Processing Fee",
          "amount": "3.90",
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
        "price": "63.00",
        "fees": "3.90",
        "taxes": "0.00",
        "deliveries": "0.00",
        "upsells": "0.00",
        "total": "66.90"
      }
    },
    "relationships": {
      "events": {
        "data": [
          {
            "id": "G5dHZKEDNWhpi",
            "type": "events"
          }
        ]
      },
      "products": {
        "data": [
          {
            "id": "3F004E7EE3F5B5AC",
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
          "id": "5692d015-2c37-4fd4-a4f4-70f1edb45efb",
          "provider": "host"
        }
      ]
    }
  },
  "_embedded": {
    "events": {
      "data": [
        {
          "id": "G5dHZKEDNWhpi",
          "type": "events",
          "attributes": {
            "name": "Harlem Globetrotters"
          },
          "relationships": {
            "products": {
              "data": [
                {
                  "id": "3F004E7EE3F5B5AC",
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
              "id": "3F004E7EE3F5B5AC",
              "name": "ticketmaster"
            }
          }
        }
      ]
    },
    "products": {
      "data": [
        {
          "id": "3F004E7EE3F5B5AC",
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
                  "id": "G5dHZKEDNWhpi",
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
            "name": "Full Price Ticket",
            "description": "Full Price Ticket"
          },
          "relationships": {
            "products": {
              "data": [
                {
                  "id": "3F004E7EE3F5B5AC",
                  "type": "products"
                }
              ]
            },
            "events": {
              "data": [
                {
                  "id": "G5dHZKEDNWhpi",
                  "type": "events"
                }
              ]
            }
          }
        }
      ]
    },
    "deliveries": {
      "data": [
        {
          "id": "3",
          "type": "delivery-options",
          "attributes": {
            "displayRank": 1,
            "description": {
              "short": "eTickets",
              "long": "Get in with:"
            }
          },
          "relationships": {
            "reservations": {
              "data": [
                {
                  "id": "1",
                  "type": "reservations"
                }
              ]
            }
          }
        }
      ]
    },
    "payments":{
         "data":[
           {
             "id":"walletToken",
             "type":"credit_card_payments",
             "attributes":{
               "cardType":"VISA",
               "expirationMonth":"5",
               "expirationYear":"2018",
               "lastFour":"1234"
             },
             "relationships":{}
           },
           {
             "id":"cashPaymentId",
             "type":"cash_payments",
             "attributes":{
             },
             "relationships":{}
           }
         ]
       }
     }
  },
  "status": "200"
}

{% endhighlight %}
