---
layout: documentation
id: com1
categories:
- documentation
- commerce
title: Commerce API
excerpt: Use the Ticketmaster Commerce API to reserve tickets, purchase, and retrieve barcode and ticket information.
keywords: API, commerce API, reserve tickets, retrieve barcode
---

# Commerce API
{: .article}

Use the Ticketmaster Commerce API to reserve tickets, purchase, and retrieve barcode and ticket information. Ticket inventory for each event must be established beforehand with Ticketmaster, venues, and ticketing partners. Only this held inventory will be made available through the API.
{: .article .lead}

#### Developer Console
{: .aside .gray}

Test this endpoint right now in the interactive docs:

[INTERACTIVE DOCS](/products-and-docs/apis/interactive-console/){: .button}

## Event Offers
{: .article .console-link #event-offers}

**Method:** GET.
Authentication required.
Returns Event Offers.

commerce/{version}/events/{id}/offers.{format}
{: .code .red}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v2"         | Yes      |
| `id`       | Event ID. Required.  | string            | "05004F24E0B864B3" | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |

### Response structure:

{: .nested-list}
- `limits` (object) - limits for event.
    * `max` (object) - max limit.
- `prices` (object) - prices.
    * `_embedded` (array) - container for prices data.
        + `{array item object}` - price.
            - `type` (string) - type of price.
            - `attributes` (object) - attributes of price.
                * `currency` (string) - currency of price.
            - `relationships` (object) - available relationships.
                * `offers` (object) - related offers.
                    - `_embedded` (array) - container for offers.
                        + `{array item object}` - offer.
                            * `id` (string) - id of offer.
                            * `type` (string) - type of offer.
                * `price-zones` (object) - related price zones.
                    - `_embedded` (array) - container for price zones.
                        + `{array item object}` - price zone.
                            * `id` (string) - id of price zone.
                            * `type` (string) - type of price zone.                 
- `areas` (object) - event areas.
    - `_embedded` (array) - container for areas.
        + `{array item object}` - area.
            * `id` (string) - id of area.
            * `type` (string) - type of area.
            * `attributes` (object) - attributes of areas.
                - `rank` (string) - rank of area.
                - `name` (string) - name of area.
                - `area-type` (string) - type of area.
            * `relationships` (object) - available relationships.
                - `areas` (object) - related areas.
                    * `_embedded` (array) - areas.
                        + `{array item object}` - container for areas.
                            - `id` (string) - id of area.
                            - `type` (string) - type of area.
                - `offers` (object) - related offers.
                    * `_embedded` (array) - container for offers.
                        + `{array item object}` - offer.
                            - `id` (string) - id of offer.
                            - `type` (string) - type of offer.
                - `price-zones` (object) - related price zones.
                    * `_embedded` (array) - container for price zones.
                        + `{array item object}` - price zone.
                            - `id` (string) - id of price zone.
                            - `type` (string) - type of price zone.
- `passwords` (object) - passwords.
    - `_embedded` (array) - container for passwords.
        + `{array item object}` - password.
            * `id` (string) - password id.
            * `type` (string) - password type.
            * `attributes` (object) - attributes of passwords.
                - `name` (string) - name.
                - `exclusive` (boolean) - is exclusive.
                - `prompts` (array) - prompts.
                    + `{array item object}` - prompt.
                        * `text` (string) - text of prompt.
                - `text-label` (string) - text label.
            * `relationships` (object) - available relationships.
                - `offers` (object) - related offers.
                    * `_embedded` (array) - container for offers.
                        + `{array item object}` - offer.
                            - `id` (string) - id of offer.
                            - `type` (string) - type of offer.
- `_embedded` (array) - container for offers.
    + `{array item object}` - offer.
        * `id` (string) - id.
        * `type` (string) - type.
        * `attributes` (object) - attributes of offer.
            - `name` (string) - name.
            - `description` (string) - description.
            - `rank` (number) - rank.
            - `currency` (string) - currency.            
            - `prices` (array) - prices.
                + `{array item object}` - price.
                    * `value` (string) - price value.        
                    * `total` (string) - total price.         
                    * `fees` (array) - fees.
                        + `{array item object}` - fee.
                            - `value` (string) - fee value.
                            - `label` (string) - fee label.
                            - `type` (string) - fee type.
                    * `taxes` (array) - taxes.
                        + `{array item object}` - tax.
                            - `value` (string) - tax value.
                            - `label` (string) - tax label.
                            - `type` (string) - tax type.
                    * `price-zone` (string) - price zone.                    
            - `limit` (object) - limit.
                - `min` (number) - min.
                - `max` (number) - max.
                - `multiplies` (number) - multiplies.
            - `offer-type` (string) - offer type.       
        * `relationships` (object) - available relationships.
            * `areas` (object) - related areas.
                - `_embedded` (array) - container for areas.
                    + `{array item object}` - area.
                        * `id` (string) - id of area.
                        * `type` (string) - type of area.            
            * `products` (object) - related products.
                * `_embedded` (array) - container for products.
                    + `{array item object}` - product.
                        - `id` (string) - id of product.
                        - `type` (string) - type of product.
            * `price-zones` (object) - related price zones.
                * `_embedded` (array) - container for price zones.
                    + `{array item object}` - price zone.
                        - `id` (string) - id of price zone.
                        - `type` (string) - type of price zone.
- `price-zones` (object) - price zones.
    - `_embedded` (array) - container for price zones.
        + `{array item object}` - price zone.
            * `id` (string) - price zone id.
            * `type` (string) - price zone type.
            * `attributes` (object) - attributes of price zone.
                - `currency` (string) - currency of price zone.
                - `name` (string) - name of price zone.
            * `relationships` (object) - available relationships.
                - `offers` (object) - related offers.
                    * `_embedded` (array) - container for offers.
                        + `{array item object}` - offer.
                            - `id` (string) - id of offer.
                            - `type` (string) - type of offer.
                - `areas` (object) - related areas.
                    - `_embedded` (array) - container for areas.
                        + `{array item object}` - area.
                            * `id` (string) - id of area.
                            * `type` (string) - type of area.

{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/commerce/v2/events/05004F24E0B864B3/offers.json?apikey={apikey}",
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
curl \
--include 'https://app.ticketmaster.com/commerce/v2/events/05004F24E0B864B3/offers.json?apikey={apikey}
{% endhighlight %}


{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /commerce/v2/events/05004F24E0B864B3/offers.json?apikey=**** HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Content-Length: 8333
Access-Control-Max-Age: 3628800
Access-Control-Allow-Methods: GET, PUT, POST, DELETE
Connection: keep-alive
X-TM-SESSION-BID: commerce-offering
Server: Apache-Coyote/1.1
Access-Control-Allow-Headers: origin, x-requested-with, accept
Date: Sat, 05 Dec 2015 13:18:15 GMT
Access-Control-Allow-Origin: *
X-TM-SESSION-SID: 1A007CBEA4E8A92DBF44801E2124FAB4
Content-Type: application/json;charset=UTF-8
X-Application-Context: commerce-api-commerce-offering:default,jphx1:8080
Set-Cookie: ****

{
  "limits":  {
    "max": 8
  },
  "prices":  {
    "_embedded":  [
       {
        "type": "offered-prices",
        "attributes":  {
          "currency": "USD",
          "value": "17.00"
        },
        "relationships":  {
          "offers":  {
            "_embedded":  [
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
          "price-zones":  {
            "_embedded":  [
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
        "attributes":  {
          "currency": "USD",
          "value": "22.00"
        },
        "relationships":  {
          "offers":  {
            "_embedded":  [
               {
                "id": "000000000001",
                "type": "offers"
              }
            ]
          },
          "areas":  {
            "_embedded":  [
               {
                "id": "3",
                "type": "areas"
              }
            ]
          },
          "price-zones":  {
            "_embedded":  [
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
        "attributes":  {
          "currency": "USD",
          "value": "122.00"
        },
        "relationships":  {
          "offers":  {
            "_embedded":  [
               {
                "id": "000050820004",
                "type": "offers"
              }
            ]
          },
          "price-zones":  {
            "_embedded":  [
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
        "attributes":  {
          "currency": "USD",
          "value": "250.00"
        },
        "relationships":  {
          "offers":  {
            "_embedded":  [
               {
                "id": "000052830004",
                "type": "offers"
              }
            ]
          },
          "price-zones":  {
            "_embedded":  [
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
        "attributes":  {
          "currency": "USD",
          "value": "500.00"
        },
        "relationships":  {
          "offers":  {
            "_embedded":  [
               {
                "id": "00006E840004",
                "type": "offers"
              }
            ]
          },
          "price-zones":  {
            "_embedded":  [
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
  "areas":  {
    "_embedded":  [
       {
        "id": "3",
        "type": "areas",
        "attributes":  {
          "rank": 0,
          "name": "FLOOR",
          "area-type": "AREA"
        },
        "relationships":  {
          "areas":  {},
          "offers":  {
            "_embedded":  [
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
          "price-zones":  {
            "_embedded":  [
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
  "_embedded":  [
     {
      "id": "000000000001",
      "type": "offers",
      "attributes":  {
        "name": "ADULT",
        "description": "Advance Purchase Ticket",
        "rank": 0,
        "currency": "USD",
        "prices":  [
           {
            "value": "19.75",
            "total": "33.25",
            "fees":  [
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
            "taxes":  [
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
        "limit":  {
          "min": 1,
          "max": 8,
          "multiples": 1
        },
        "offer-type": "DEFAULT"
      },
      "relationships":  {
        "areas":  {
          "_embedded":  [
             {
              "id": "3",
              "type": "areas"
            }
          ]
        },
        "products":  {
          "_embedded":  [
             {
              "id": "05004F24E0B864B3",
              "type": "products"
            }
          ]
        },
        "price-zones":  {
          "_embedded":  [
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
      "attributes":  {
        "name": "VIP1",
        "description": "SKEPTICS & TRUE BELIEVERS VIP Package",
        "rank": 1,
        "currency": "USD",
        "prices":  [
           {
            "value": "119.75",
            "total": "124.25",
            "fees":  [
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
            "taxes":  [
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
        "limit":  {
          "min": 1,
          "max": 4,
          "multiples": 1
        },
        "offer-details":  {
          "link": "http://www.ticketmaster.com/promo/njrdzq?ac_link=ntm_theacademyis2015_tkt_type_vip",
          "text": "Includes: a ticket to the show- individual polaroid with The Academy Is...- pre-signed and numbered Almost Here 10 Year Anniversary tour poster AND exclusive print custom made by The Butcher- limited edition The Academy Is... VIP cloth bracelet- and early venue entry.",
          "link-text": "See Full VIP Details!"
        },
        "offer-type": "SPECIAL"
      },
      "relationships":  {
        "areas":  {
          "_embedded":  [
             {
              "id": "3",
              "type": "areas"
            }
          ]
        },
        "products":  {
          "_embedded":  [
             {
              "id": "05004F24E0B864B3",
              "type": "products"
            }
          ]
        },
        "price-zones":  {
          "_embedded":  [
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
      "attributes":  {
        "name": "VIP2",
        "description": "ATTENTION VIP Package",
        "rank": 2,
        "currency": "USD",
        "prices":  [
           {
            "value": "247.75",
            "total": "252.25",
            "fees":  [
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
            "taxes":  [
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
        "limit":  {
          "min": 1,
          "max": 4,
          "multiples": 1
        },
        "offer-details":  {
          "link": "http://www.ticketmaster.com/promo/njrdzq?ac_link=ntm_theacademyis2015_tkt_type_vip",
          "text": "Includes: Everything in the SKEPTICS & TRUE BELIEVERS VIP Package PLUS an exclusive The Academy Is... 'Sidestage Access' VIP laminate & lanyard- and you can watch the show from the side of the stage. This package is extremely limited! Don't be left down and out...",
          "link-text": "See Full VIP Details!"
        },
        "offer-type": "SPECIAL"
      },
      "relationships":  {
        "areas":  {
          "_embedded":  [
             {
              "id": "3",
              "type": "areas"
            }
          ]
        },
        "products":  {
          "_embedded":  [
             {
              "id": "05004F24E0B864B3",
              "type": "products"
            }
          ]
        },
        "price-zones":  {
          "_embedded":  [
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
      "attributes":  {
        "name": "VIP3",
        "description": "SLOW DOWN VIP Package",
        "rank": 3,
        "currency": "USD",
        "prices":  [
           {
            "value": "497.75",
            "total": "502.25",
            "fees":  [
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
            "taxes":  [
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
        "limit":  {
          "min": 1,
          "max": 4,
          "multiples": 1
        },
        "offer-details":  {
          "link": "http://www.ticketmaster.com/promo/njrdzq?ac_link=ntm_theacademyis2015_tkt_type_vip",
          "text": "Includes: Everything in the ATTENTION VIP Package PLUS an intimate post-show hang out on the band's bus- acoustic performance by William & Mike- custom- original drawing by The Butcher while you're on the bus- and a high five from Adam.",
          "link-text": "See Full VIP Details!"
        },
        "offer-type": "SPECIAL"
      },
      "relationships":  {
        "areas":  {
          "_embedded":  [
             {
              "id": "3",
              "type": "areas"
            }
          ]
        },
        "products":  {
          "_embedded":  [
             {
              "id": "05004F24E0B864B3",
              "type": "products"
            }
          ]
        },
        "price-zones":  {
          "_embedded":  [
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
      "attributes":  {
        "name": "M4PAK",
        "description": "4 Pack Ticket Offer",
        "rank": 4,
        "currency": "USD",
        "prices":  [
           {
            "value": "14.75",
            "total": "27.25",
            "fees":  [
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
            "taxes":  [
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
        "limit":  {
          "min": 4,
          "max": 8,
          "multiples": 4
        },
        "offer-type": "SPECIAL"
      },
      "relationships":  {
        "areas":  {
          "_embedded":  [
             {
              "id": "3",
              "type": "areas"
            }
          ]
        },
        "products":  {
          "_embedded":  [
             {
              "id": "05004F24E0B864B3",
              "type": "products"
            }
          ]
        },
        "price-zones":  {
          "_embedded":  [
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
      "attributes":  {
        "name": "TMNME3",
        "description": "Me+3 4-Pack Offer",
        "rank": 5,
        "currency": "USD",
        "prices":  [
           {
            "value": "14.75",
            "total": "27.25",
            "fees":  [
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
            "taxes":  [
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
        "limit":  {
          "min": 4,
          "max": 8,
          "multiples": 4
        },
        "offer-type": "SPECIAL"
      },
      "relationships":  {
        "areas":  {
          "_embedded":  [
             {
              "id": "3",
              "type": "areas"
            }
          ]
        },
        "products":  {
          "_embedded":  [
             {
              "id": "05004F24E0B864B3",
              "type": "products"
            }
          ]
        },
        "price-zones":  {
          "_embedded":  [
             {
              "id": "1",
              "type": "price-zones"
            }
          ]
        }
      }
    }
  ],
  "price-zones":  {
    "_embedded":  [
       {
        "id": "1",
        "type": "price-zones",
        "attributes":  {
          "currency": "USD",
          "name": "PRICE LEVEL 1"
        },
        "relationships":  {
          "offers":  {
            "_embedded":  [
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
          "areas":  {
            "_embedded":  [
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
{% endhighlight %}
