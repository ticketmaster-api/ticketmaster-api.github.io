{% highlight HTTP %}
GET /commerce/v2/checkout/carts/{cartid}/options.json?{apikey} HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive

{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK

{
  "paymentOptions": [
    {
      "id": "9",
      "type": "paymentOption",
      "attributes": {
        "paymentType": "CREDITCARD",
        "iconUrl": "https://s1.ticketm.net/tm/en-us/img/sys/common_new/payment_light/visa_medium_icon.png",
        "securityCodeLength": "3",
        "instrumentLength": "16",
        "displayName": "VISA",
        "displayRank": "2",
        "restrictions": [
          {
            "type": "product-restriction",
            "id": "3F003F003F003F001"
          },
          {
            "type": "product-offer-restriction",
            "id": "3F003F003F003F001",
            "offers": [
              "000000000001"
            ]
          }
        ]
      }
    }
  ],
  "deliveries": [
    {
      "id": "7af0e652cdb7cbbaad93fe9087d25c65",
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
            "id": "3F005254B0F83534"
          },
          {
            "type": "product-offer-restriction",
            "id": "3F005254B0F83534",
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
            },
            {
              "id": "delivery-option-2",
              "type": "deliveryOptions"
            }
          ]
        }
      }
    },
    {
      "id": "ace88ee53515edbc95cf6f98cdeb7123",
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
            "id": "3F005254B0F83534"
          },
          {
            "type": "product-offer-restriction",
            "id": "3F005254B0F83534",
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
            },
            {
              "id": "delivery-option-4",
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
            "id": "3F005254B0F83534"
          },
          {
            "type": "product-offer-restriction",
            "id": "3F005254B0F83534",
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
            "id": "3F005254B0F83534"
          },
          {
            "type": "product-offer-restriction",
            "id": "3F005254B0F83534",
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
            "id": "3F005254B0F83534"
          },
          {
            "type": "product-offer-restriction",
            "id": "3F005254B0F83534",
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
            "id": "3F005254B0F83534"
          },
          {
            "type": "product-offer-restriction",
            "id": "3F005254B0F83534",
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
    }
  ],
  "_embedded": {
    "deliveryOptions": [
      {
        "id": "delivery-option-1",
        "type": "deliveryOption",
        "attributes": {
          "requiresAddress": false,
          "requiresIdentification": false,
          "description": {
            "availableDate": "2017-02-20T18:47:23.081Z",
            "long": "Print your tickets and bring them to the event. Print anytime after <time> on <date> (we'll email you a reminder).",
            "short": "Print-at-Home"
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
          "requiresAddress": false,
          "requiresIdentification": false,
          "description": {
            "availableDate": "2017-02-20T18:47:23.100Z",
            "long": "Print your tickets and bring them to the event. Print anytime after <time> on <date> (we'll email you a reminder).",
            "short": "Print-at-Home"
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
