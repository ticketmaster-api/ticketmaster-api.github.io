---
layout: documentation
categories: products-and-docs/apis/commerce/
---

#Commerse REST API

##Event Offers

Method: GET. 

Authentication required.

~~~
commerce/{version}/events/{id}/offers.{format}
~~~

Returns Event Offers.

###Template parameters:

- version - The API Version. Required. Default value "v2";
- id - Event ID. Required. Default value "05004F24E0B864B3";
- format - API Response Format. Required. Default value "json".

###Event Offers

####Returns Offers.

Request

~~~
https://app.ticketmaster.com/commerce/v2/events/05004F24E0B864B3/offers.json
~~~

Response

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
      },
      {
        "type": "offered-prices",
        "attributes": {
          "currency": "USD",
          "value": "22.00"
        },
        "relationships": {
          "offers": {
            "_embedded": [
              {
                "id": "000000000001",
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
      },
      {
        "type": "offered-prices",
        "attributes": {
          "currency": "USD",
          "value": "122.00"
        },
        "relationships": {
          "offers": {
            "_embedded": [
              {
                "id": "000050820004",
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
      },
      {
        "type": "offered-prices",
        "attributes": {
          "currency": "USD",
          "value": "250.00"
        },
        "relationships": {
          "offers": {
            "_embedded": [
              {
                "id": "000052830004",
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
      },
      {
        "type": "offered-prices",
        "attributes": {
          "currency": "USD",
          "value": "500.00"
        },
        "relationships": {
          "offers": {
            "_embedded": [
              {
                "id": "00006E840004",
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
  "areas": {
    "_embedded": [
      {
        "id": "3",
        "type": "areas",
        "attributes": {
          "rank": 0,
          "name": "FLOOR",
          "area-type": "AREA"
        },
        "relationships": {
          "areas": {},
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
  "_embedded": [
    {
      "id": "000000000001",
      "type": "offers",
      "attributes": {
        "name": "ADULT",
        "description": "Advance Purchase Ticket",
        "rank": 0,
        "currency": "USD",
        "prices": [
          {
            "value": "19.75",
            "total": "33.25",
            "fees": [
              {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
              {
                "value": "2.25",
                "label": "Facility",
                "type": "facility"
              },
              {
                "value": "9.00",
                "label": "Service",
                "type": "service"
              }
            ],
            "taxes": [
              {
                "value": "0.00",
                "label": "Face Value Tax",
                "type": "face_value_tax"
              },
              {
                "value": "0.00",
                "label": "Service Tax",
                "type": "service_tax"
              },
              {
                "value": "0.00",
                "label": "Service Tax 2",
                "type": "service_tax2"
              }
            ],
            "price-zone": "1"
          }
        ],
        "limit": {
          "min": 1,
          "max": 8,
          "multiples": 1
        },
        "offer-type": "DEFAULT"
      },
      "relationships": {
        "areas": {
          "_embedded": [
            {
              "id": "3",
              "type": "areas"
            }
          ]
        },
        "products": {
          "_embedded": [
            {
              "id": "05004F24E0B864B3",
              "type": "products"
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
    },
    {
      "id": "000050820004",
      "type": "offers",
      "attributes": {
        "name": "VIP1",
        "description": "SKEPTICS & TRUE BELIEVERS VIP Package",
        "rank": 1,
        "currency": "USD",
        "prices": [
          {
            "value": "119.75",
            "total": "124.25",
            "fees": [
              {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
              {
                "value": "2.25",
                "label": "Facility",
                "type": "facility"
              },
              {
                "value": "0.00",
                "label": "Service",
                "type": "service"
              }
            ],
            "taxes": [
              {
                "value": "0.00",
                "label": "Face Value Tax",
                "type": "face_value_tax"
              },
              {
                "value": "0.00",
                "label": "Service Tax",
                "type": "service_tax"
              },
              {
                "value": "0.00",
                "label": "Service Tax 2",
                "type": "service_tax2"
              }
            ],
            "price-zone": "1"
          }
        ],
        "limit": {
          "min": 1,
          "max": 4,
          "multiples": 1
        },
        "offer-details": {
          "link": "http://www.ticketmaster.com/promo/njrdzq?ac_link=ntm_theacademyis2015_tkt_type_vip",
          "text": "Includes: a ticket to the show- individual polaroid with The Academy Is...- pre-signed and numbered Almost Here 10 Year Anniversary tour poster AND exclusive print custom made by The Butcher- limited edition The Academy Is... VIP cloth bracelet- and early venue entry.",
          "link-text": "See Full VIP Details!"
        },
        "offer-type": "SPECIAL"
      },
      "relationships": {
        "areas": {
          "_embedded": [
            {
              "id": "3",
              "type": "areas"
            }
          ]
        },
        "products": {
          "_embedded": [
            {
              "id": "05004F24E0B864B3",
              "type": "products"
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
    },
    {
      "id": "000052830004",
      "type": "offers",
      "attributes": {
        "name": "VIP2",
        "description": "ATTENTION VIP Package",
        "rank": 2,
        "currency": "USD",
        "prices": [
          {
            "value": "247.75",
            "total": "252.25",
            "fees": [
              {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
              {
                "value": "2.25",
                "label": "Facility",
                "type": "facility"
              },
              {
                "value": "0.00",
                "label": "Service",
                "type": "service"
              }
            ],
            "taxes": [
              {
                "value": "0.00",
                "label": "Face Value Tax",
                "type": "face_value_tax"
              },
              {
                "value": "0.00",
                "label": "Service Tax",
                "type": "service_tax"
              },
              {
                "value": "0.00",
                "label": "Service Tax 2",
                "type": "service_tax2"
              }
            ],
            "price-zone": "1"
          }
        ],
        "limit": {
          "min": 1,
          "max": 4,
          "multiples": 1
        },
        "offer-details": {
          "link": "http://www.ticketmaster.com/promo/njrdzq?ac_link=ntm_theacademyis2015_tkt_type_vip",
          "text": "Includes: Everything in the SKEPTICS & TRUE BELIEVERS VIP Package PLUS an exclusive The Academy Is... 'Sidestage Access' VIP laminate & lanyard- and you can watch the show from the side of the stage. This package is extremely limited! Don't be left down and out...",
          "link-text": "See Full VIP Details!"
        },
        "offer-type": "SPECIAL"
      },
      "relationships": {
        "areas": {
          "_embedded": [
            {
              "id": "3",
              "type": "areas"
            }
          ]
        },
        "products": {
          "_embedded": [
            {
              "id": "05004F24E0B864B3",
              "type": "products"
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
    },
    {
      "id": "00006E840004",
      "type": "offers",
      "attributes": {
        "name": "VIP3",
        "description": "SLOW DOWN VIP Package",
        "rank": 3,
        "currency": "USD",
        "prices": [
          {
            "value": "497.75",
            "total": "502.25",
            "fees": [
              {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
              {
                "value": "2.25",
                "label": "Facility",
                "type": "facility"
              },
              {
                "value": "0.00",
                "label": "Service",
                "type": "service"
              }
            ],
            "taxes": [
              {
                "value": "0.00",
                "label": "Face Value Tax",
                "type": "face_value_tax"
              },
              {
                "value": "0.00",
                "label": "Service Tax",
                "type": "service_tax"
              },
              {
                "value": "0.00",
                "label": "Service Tax 2",
                "type": "service_tax2"
              }
            ],
            "price-zone": "1"
          }
        ],
        "limit": {
          "min": 1,
          "max": 4,
          "multiples": 1
        },
        "offer-details": {
          "link": "http://www.ticketmaster.com/promo/njrdzq?ac_link=ntm_theacademyis2015_tkt_type_vip",
          "text": "Includes: Everything in the ATTENTION VIP Package PLUS an intimate post-show hang out on the band's bus- acoustic performance by William & Mike- custom- original drawing by The Butcher while you're on the bus- and a high five from Adam.",
          "link-text": "See Full VIP Details!"
        },
        "offer-type": "SPECIAL"
      },
      "relationships": {
        "areas": {
          "_embedded": [
            {
              "id": "3",
              "type": "areas"
            }
          ]
        },
        "products": {
          "_embedded": [
            {
              "id": "05004F24E0B864B3",
              "type": "products"
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
    },
    {
      "id": "000062800006",
      "type": "offers",
      "attributes": {
        "name": "M4PAK",
        "description": "4 Pack Ticket Offer",
        "rank": 4,
        "currency": "USD",
        "prices": [
          {
            "value": "14.75",
            "total": "27.25",
            "fees": [
              {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
              {
                "value": "2.25",
                "label": "Facility",
                "type": "facility"
              },
              {
                "value": "8.00",
                "label": "Service",
                "type": "service"
              }
            ],
            "taxes": [
              {
                "value": "0.00",
                "label": "Face Value Tax",
                "type": "face_value_tax"
              },
              {
                "value": "0.00",
                "label": "Service Tax",
                "type": "service_tax"
              },
              {
                "value": "0.00",
                "label": "Service Tax 2",
                "type": "service_tax2"
              }
            ],
            "price-zone": "1"
          }
        ],
        "limit": {
          "min": 4,
          "max": 8,
          "multiples": 4
        },
        "offer-type": "SPECIAL"
      },
      "relationships": {
        "areas": {
          "_embedded": [
            {
              "id": "3",
              "type": "areas"
            }
          ]
        },
        "products": {
          "_embedded": [
            {
              "id": "05004F24E0B864B3",
              "type": "products"
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
    },
    {
      "id": "000062810006",
      "type": "offers",
      "attributes": {
        "name": "TMNME3",
        "description": "Me+3 4-Pack Offer",
        "rank": 5,
        "currency": "USD",
        "prices": [
          {
            "value": "14.75",
            "total": "27.25",
            "fees": [
              {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
              {
                "value": "2.25",
                "label": "Facility",
                "type": "facility"
              },
              {
                "value": "8.00",
                "label": "Service",
                "type": "service"
              }
            ],
            "taxes": [
              {
                "value": "0.00",
                "label": "Face Value Tax",
                "type": "face_value_tax"
              },
              {
                "value": "0.00",
                "label": "Service Tax",
                "type": "service_tax"
              },
              {
                "value": "0.00",
                "label": "Service Tax 2",
                "type": "service_tax2"
              }
            ],
            "price-zone": "1"
          }
        ],
        "limit": {
          "min": 4,
          "max": 8,
          "multiples": 4
        },
        "offer-type": "SPECIAL"
      },
      "relationships": {
        "areas": {
          "_embedded": [
            {
              "id": "3",
              "type": "areas"
            }
          ]
        },
        "products": {
          "_embedded": [
            {
              "id": "05004F24E0B864B3",
              "type": "products"
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
  ],
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

