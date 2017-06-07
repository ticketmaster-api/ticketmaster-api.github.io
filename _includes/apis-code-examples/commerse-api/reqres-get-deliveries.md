
{% highlight HTTP %}
GET /commerce/v2/checkout/carts/{cartId}/deliveries.json?{apikey} HTTP/1.1
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
X-TM-SESSION-BID: commerce-checkout
Connection: keep-alive
Access-Control-Allow-Credentials: true
Server: Apache-Coyote/1.1
Rate-Limit-Reset: 1468530242515
Access-Control-Allow-Headers: Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers
Date: Thu, 14 Jul 2016 18:15:12 GMT
Access-Control-Allow-Origin: *
X-TM-SESSION-SID: 49D8E7AAEF70BE318E4CEB599C499675
X-Application-Context: commerce-api-commerce-checkout-v1:default,jash1:8080
Content-Type: application/json;charset=UTF-8
Rate-Limit: 500000

{
  "deliveries": [
    {
      "id": "b6377b0a1be9aa19eaf69184ad7a1260",
      "type": "delivery",
      "attributes": {
        "deliveryType": "DIGITAL",
        "displayRank": "1",
        "totals": {
          "fee": "0.00",
          "tax": "0.00",
          "grand": "0.00",
          "currency": "USD"
        },
        "description": {
          "long": "Get in with:",
          "short": "eTickets"
        },
        "restrictions": [
          {
            "type": "product-restriction",
            "id": "26005143EC8A4DDF"
          },
          {
            "type": "product-offer-restriction",
            "id": "26005143EC8A4DDF",
            "offers": [
              "000000000001"
            ]
          }
        ]
      },
      "relationships": {
        "deliveryOptions": {
          "data": [
            {
              "id": "delivery-option-1",
              "type": "deliveryOptions"
            }
          ]
        }
      }
    },
    {
      "id": "ad20f8bc3e69a6c7a340c711731f2342",
      "type": "delivery",
      "attributes": {
        "deliveryType": "DIGITAL",
        "displayRank": "1",
        "totals": {
          "fee": "0.00",
          "tax": "0.00",
          "grand": "0.00",
          "currency": "USD"
        },
        "description": {
          "long": "Get in with:",
          "short": "eTickets"
        },
        "restrictions": [
          {
            "type": "product-restriction",
            "id": "26005143EC8A4DDF"
          },
          {
            "type": "product-offer-restriction",
            "id": "26005143EC8A4DDF",
            "offers": [
              "000000000001"
            ]
          }
        ]
      },
      "relationships": {
        "deliveryOptions": {
          "data": [
            {
              "id": "delivery-option-2",
              "type": "deliveryOptions"
            }
          ]
        }
      }
    },
    {
      "id": "4acc72a7d8774bbdd92a99c68be70e21",
      "type": "delivery",
      "attributes": {
        "deliveryType": "DIGITAL",
        "displayRank": "1",
        "totals": {
          "fee": "0.00",
          "tax": "0.00",
          "grand": "0.00",
          "currency": "USD"
        },
        "description": {
          "long": "Get in with:",
          "short": "eTickets"
        },
        "restrictions": [
          {
            "type": "product-restriction",
            "id": "26005143EC8A4DDF"
          },
          {
            "type": "product-offer-restriction",
            "id": "26005143EC8A4DDF",
            "offers": [
              "000000000001"
            ]
          }
        ]
      },
      "relationships": {
        "deliveryOptions": {
          "data": [
            {
              "id": "delivery-option-3",
              "type": "deliveryOptions"
            }
          ]
        }
      }
    },
    {
      "id": "5f4867621279e6246b2b254cb9bd6676",
      "type": "delivery",
      "attributes": {
        "deliveryType": "2DAYPM",
        "displayRank": "3",
        "totals": {
          "fee": "18.50",
          "tax": "0.00",
          "grand": "18.50",
          "currency": "USD"
        },
        "description": {
          "long": "By 7:30 PM in 2 business days via UPS (no delivery to PO Box or APO/FPO addresses).",
          "short": "2 Business Day (Evening)"
        },
        "restrictions": [
          {
            "type": "product-restriction",
            "id": "26005143EC8A4DDF"
          },
          {
            "type": "product-offer-restriction",
            "id": "26005143EC8A4DDF",
            "offers": [
              "000000000001"
            ]
          }
        ]
      },
      "relationships": {
        "deliveryOptions": {
          "data": [
            {
              "id": "delivery-option-4",
              "type": "deliveryOptions"
            }
          ]
        }
      }
    },
    {
      "id": "3543cfe2e5c81b672c33ae0ae7edeabf",
      "type": "delivery",
      "attributes": {
        "deliveryType": "3DAY",
        "displayRank": "4",
        "totals": {
          "fee": "14.50",
          "tax": "0.00",
          "grand": "14.50",
          "currency": "USD"
        },
        "description": {
          "long": "By 7:30 PM in 3 business days via UPS (no delivery to PO Box or APO/FPO addresses).",
          "short": "3 Business Day (Evening)"
        },
        "restrictions": [
          {
            "type": "product-restriction",
            "id": "26005143EC8A4DDF"
          },
          {
            "type": "product-offer-restriction",
            "id": "26005143EC8A4DDF",
            "offers": [
              "000000000001"
            ]
          }
        ]
      },
      "relationships": {
        "deliveryOptions": {
          "data": [
            {
              "id": "delivery-option-5",
              "type": "deliveryOptions"
            }
          ]
        }
      }
    },
    {
      "id": "c4ca4238a0b923820dcc509a6f75849b",
      "type": "delivery",
      "attributes": {
        "deliveryType": "MAIL",
        "displayRank": "6",
        "totals": {
          "fee": "0.50",
          "tax": "0.00",
          "grand": "0.50",
          "currency": "USD"
        },
        "description": {
          "long": "Your tickets will be mailed to your billing address within 10 to 14 days of your purchase.",
          "short": "Standard Mail: Allow 10 to 14 days for delivery"
        },
        "restrictions": [
          {
            "type": "product-restriction",
            "id": "26005143EC8A4DDF"
          },
          {
            "type": "product-offer-restriction",
            "id": "26005143EC8A4DDF",
            "offers": [
              "000000000001"
            ]
          }
        ]
      },
      "relationships": {
        "deliveryOptions": {
          "data": [
            {
              "id": "delivery-option-6",
              "type": "deliveryOptions"
            }
          ]
        }
      }
    },
    {
      "id": "45c48cce2e2d7fbdea1afc51c7c6ad26",
      "type": "delivery",
      "attributes": {
        "deliveryType": "AIRMAIL",
        "displayRank": "8",
        "totals": {
          "fee": "0.50",
          "tax": "0.00",
          "grand": "0.50",
          "currency": "USD"
        },
        "description": {
          "long": "Your tickets will be mailed to your billing address and delivered no later than 48 hours before the event in a plain unmarked white envelope.",
          "short": "Canadian Airmail Mail"
        },
        "restrictions": [
          {
            "type": "product-restriction",
            "id": "26005143EC8A4DDF"
          },
          {
            "type": "product-offer-restriction",
            "id": "26005143EC8A4DDF",
            "offers": [
              "000000000001"
            ]
          }
        ]
      },
      "relationships": {
        "deliveryOptions": {
          "data": [
            {
              "id": "delivery-option-7",
              "type": "deliveryOptions"
            }
          ]
        }
      }
    },
    {
      "id": "d1867af206b6d8259afb3f8b4f5d1250",
      "type": "delivery",
      "attributes": {
        "deliveryType": "INSTORE",
        "displayRank": "9",
        "totals": {
          "fee": "3.00",
          "tax": "0.00",
          "grand": "3.00",
          "currency": "USD"
        },
        "description": {
          "long": "Avoid long lines and pick up your tickets at a participating Ticketmaster Retail Outlet. The cardholder must be present with a picture ID, the physical credit card or gift card used to place the order (excluding single use temporary cards), and the order number. Certain geographic restrictions may apply.",
          "short": "Retail Outlet Pickup"
        },
        "restrictions": [
          {
            "type": "product-restriction",
            "id": "26005143EC8A4DDF"
          },
          {
            "type": "product-offer-restriction",
            "id": "26005143EC8A4DDF",
            "offers": [
              "000000000001"
            ]
          }
        ]
      },
      "relationships": {
        "deliveryOptions": {
          "data": [
            {
              "id": "delivery-option-8",
              "type": "deliveryOptions"
            }
          ]
        }
      }
    },
    {
      "id": "e7ef6789bda02c52bf2812cd17c47eb9",
      "type": "delivery",
      "attributes": {
        "deliveryType": "WILLCALL",
        "displayRank": "10",
        "totals": {
          "fee": "2.50",
          "tax": "0.00",
          "grand": "2.50",
          "currency": "USD"
        },
        "description": {
          "long": "For International Orders Only - Tickets held at Will Call can only be retrieved by the cardholder with original credit card of purchase and a valid photo ID with signature such as a government issued ID, driver's license or passport.",
          "short": "International Will Call"
        },
        "restrictions": [
          {
            "type": "product-restriction",
            "id": "26005143EC8A4DDF"
          },
          {
            "type": "product-offer-restriction",
            "id": "26005143EC8A4DDF",
            "offers": [
              "000000000001"
            ]
          }
        ]
      },
      "relationships": {
        "deliveryOptions": {
          "data": [
            {
              "id": "delivery-option-9",
              "type": "deliveryOptions"
            }
          ]
        }
      }
    }
  ],
  "_embedded": {
    "deliveryOptions": [
      {
        "id": "delivery-option-1",
        "type": "deliveryOption",
        "attributes": {
          "requiresAddress": true,
          "requiresIdentification": false,
          "description": {
            "long": "Go mobile, the easiest way in! Just show your ticket on your phone.",
            "short": "Mobile"
          },
          "excludedCountries": [
            {
              "id": "1",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "AX"
              }
            },
            {
              "id": "2",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "RS"
              }
            },
            {
              "id": "3",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "BL"
              }
            },
            {
              "id": "4",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "BQ"
              }
            },
            {
              "id": "5",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "CG"
              }
            },
            {
              "id": "6",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "CW"
              }
            },
            {
              "id": "7",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "MF"
              }
            },
            {
              "id": "8",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "SS"
              }
            },
            {
              "id": "9",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "SX"
              }
            },
            {
              "id": "10",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "US"
              }
            },
            {
              "id": "11",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "CA"
              }
            },
            {
              "id": "12",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "ND"
              }
            }
          ]
        }
      },
      {
        "id": "delivery-option-2",
        "type": "deliveryOption",
        "attributes": {
          "requiresAddress": true,
          "requiresIdentification": false,
          "description": {
            "long": "Go mobile, the easiest way in! Just show your ticket on your phone.",
            "short": "Mobile"
          },
          "acceptedCountries": [
            {
              "id": "1",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "CA"
              }
            }
          ]
        }
      },
      {
        "id": "delivery-option-3",
        "type": "deliveryOption",
        "attributes": {
          "requiresAddress": true,
          "requiresIdentification": false,
          "description": {
            "long": "Go mobile, the easiest way in! Just show your ticket on your phone.",
            "short": "Mobile"
          },
          "acceptedCountries": [
            {
              "id": "1",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "US"
              }
            }
          ]
        }
      },
      {
        "id": "delivery-option-4",
        "type": "deliveryOption",
        "attributes": {
          "requiresAddress": true,
          "requiresIdentification": false,
          "acceptedCountries": [
            {
              "id": "1",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "US"
              }
            }
          ]
        }
      },
      {
        "id": "delivery-option-5",
        "type": "deliveryOption",
        "attributes": {
          "requiresAddress": true,
          "requiresIdentification": false,
          "acceptedCountries": [
            {
              "id": "1",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "US"
              }
            }
          ]
        }
      },
      {
        "id": "delivery-option-6",
        "type": "deliveryOption",
        "attributes": {
          "requiresAddress": true,
          "requiresIdentification": false,
          "acceptedCountries": [
            {
              "id": "1",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "US"
              }
            }
          ]
        }
      },
      {
        "id": "delivery-option-7",
        "type": "deliveryOption",
        "attributes": {
          "requiresAddress": false,
          "requiresIdentification": false,
          "acceptedCountries": [
            {
              "id": "1",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "CA"
              }
            }
          ]
        }
      },
      {
        "id": "delivery-option-8",
        "type": "deliveryOption",
        "attributes": {
          "requiresAddress": false,
          "requiresIdentification": false,
          "acceptedCountries": [
            {
              "id": "1",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "US"
              }
            }
          ]
        }
      },
      {
        "id": "delivery-option-9",
        "type": "deliveryOption",
        "attributes": {
          "requiresAddress": false,
          "requiresIdentification": false,
          "excludedCountries": [
            {
              "id": "1",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "AX"
              }
            },
            {
              "id": "2",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "RS"
              }
            },
            {
              "id": "3",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "BL"
              }
            },
            {
              "id": "4",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "BQ"
              }
            },
            {
              "id": "5",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "CG"
              }
            },
            {
              "id": "6",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "CW"
              }
            },
            {
              "id": "7",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "MF"
              }
            },
            {
              "id": "8",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "SS"
              }
            },
            {
              "id": "9",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "SX"
              }
            },
            {
              "id": "10",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "US"
              }
            },
            {
              "id": "11",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "CA"
              }
            },
            {
              "id": "12",
              "type": "accepted-delivery-country",
              "attributes": {
                "country": "ND"
              }
            }
          ]
        }
      }
    ]
  }
}
{% endhighlight %}
