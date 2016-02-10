---
layout: documentation
id: com1
categories:
- documentation
- commerce
---

# Commerce API
{: .article}

Use the Ticketmaster Commerce API to reserve tickets, purchase, and retreive barcode and ticket information. Ticket inventory for each event must be established beforehand with Ticketmaster, venues, and ticketing partners. Only this held inventory will be made available through the API.
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

### Response structure

{: .nested-list}
- `limits` - (object) limits for event
    * `max` - (object) max limit
- `prices` - (object) - information about prices in data source
    * `_embedded` - (array) container for prices data
        - `type` (string) - type of price
        - `attributes` (object) - attributes of price
            * `currency` (string) - currency of price
        - `relationships` (object) - available relationships
            * `offers` (string) - currency of price
                - `_embedded` - (array) container for data
                    * `id` - (string) id of offers relationship
                    * `type` - (string) type of offers relationship
            * `price-zones` (object) - price zones
                - `_embedded` - (array) price
                    * `id` - (string) id of price-zone relationship
                    * `type` - (string) type of price-zone relationship                    
- `areas` - (object) - event areas
    - `_embedded` - (array) container for areas data
        * `id` - (string) current area id
        * `type` - (string) area type
        * `attributes` (object) - attributes of areas
            - `rank` (string) - rank of area
            - `name` (string) - name of area 
            - `area-type` (string) - type of area
        * `relationships` (object) - relationships of areas
            - `areas` (object) - related areas
            - `offers` (object) - related areas
                * `_embedded` - (array) offers
                    - `id` - (string) id of offers relationship for area
                    - `type` - (string) type of offers relationship for area
        * `price-zones` (string) - currency of price
            - `_embedded` - (array) container for price-zones data
                * `id` - (string) id of price-zone relationship for area
                * `type` - (string) type of price-zone relationship for area
- `passwords` - (object) - event passwords
    - `_embedded` - (array) container for passwords data
        * `id` - (string) current password id
        * `type` - (string) password type
        * `attributes` (object) - attributes of passwords
            - `name` (string) - name of attribute for embed password 
            - `exclusive` (boolean) - exclusiveness of password 
            - `prompts` (array) - container for prompts data
                * `text` (array) - text of prompt
            - `text-label` (array) - text label of prompt
        * `relationships` (object) - relationships of embed passwords
            - `offers` (object) - relationship offer of embed passwords
                * `_embedded` - (array) container for offers data
                    - `id` - (string) id of offers relationship for password
                    - `type` - (string) type of price-zone relationship for password
- `_embedded` - (array) container for data
    * `id` - (string) current id
    * `type` - (string) type of embed
    * `attributes` (object) - attributes of embed
        - `name` (string) - name of embed
        - `description` (string) - description of embed
        - `rank` (string) - rank of embed            
        - `currency` (string) - currency of embedded            
        - `prices` (array) - prices for event
            * `value` (string) - price value of embed        
            * `total` (string) - total price of embed          
            * `fees` (array) - container for fees data        
                - `value` (string) - fees value of price
                - `label` (string) - fees label of price
                - `type` (string) - fees type of price
            * `taxes` (array) - container for taxes data        
                - `value` (string) - taxes value of price
                - `label` (string) - taxes label of price
                - `type` (string) - taxes type of price
            * `price-zone` (string) - price-zone of embed                    
        - `limit` (object) - limit for embed            
            * `min` (number) - min count of tickets
                - `max` (number) - max count of tickets
                - `multiplies` (number) - tickets multiplies
        - `offer-details` (object) - offer-details of embed         
            * `text` (number) - text of offer-details
        - `offer-type` (string) - offer-type of embed        
        - `relationships` (object) - relationships of embed
            * `areas` (object) - areas of relationship
                - `_embedded` - (array) container for areas data
                    * `id` - (string) id of area relationship
                    * `type` - (string) type of area relationship
            * `passwords` (object) - passwords of relationship
                * `_embedded` - (array) container for passwords data
                    - `id` - (string) id of password relationship
                    - `type` - (string) type of password relationship
            * `products` (object) - products of relationship
                * `_embedded` - (array) container for products data
                    - `id` - (string) id of product relationship
                    - `type` - (string) type of product relationship
            * `price-zones` (object) - price-zones of relationship
                * `_embedded` - (array) container for price-zones data
                    - `id` - (string) id of price-zones relationship 
                    - `type` - (string) type of price-zone relationship 
- `price-zones` - (object) - price zones
    - `_embedded` - (array) container for price-zones data
        * `id` - (string) current price-zone id
        * `type` - (string) price-zone type
        * `attributes` (object) - attributes of price-zone
            - `currency` (string) - currency of price-zone
            - `name` (string) - name of price-zone            
        * `relationships` (object) - relationships of price-zones
            - `offers` (object) - relationship offer price-zones
                * `_embedded` - (array) container for offers data
                    - `id` - (string) id of offer relationship for price-zones
                    - `type` - (string) type of offer relationship for price-zones
            - `areas` - (object) - areas of price-zones
                - `_embedded` - (array) container for areas data
                    * `id` - (string) id of area relationship for price-zones
                    * `type` - (string) type of area relationship for price-zones


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
