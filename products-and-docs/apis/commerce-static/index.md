---
layout: documentation
id: com1
categories:
- documentation
- commerce
title: Commerce API 1.0
excerpt: Use the Ticketmaster Commerce API to look up available offers and products on various platforms, including Ticketmaster's and TicketWeb's. Once offers and products are selected, you can use the API to cart and transact on those items.
keywords: API, commerce API, reserve tickets, retrieve barcode
---

# Commerce API
{: .article}
Use the Ticketmaster Commerce API to look up available offers and products on various platforms, including Ticketmaster's and TicketWeb's. Once offers and products are selected, you can use the API to cart and transact on those items.
{: .article .lead}

{%comment%}
#### Developer Console
{: .aside .gray}

Test this endpoint right now in the interactive docs:

[INTERACTIVE DOCS](/products-and-docs/apis/interactive-console/){: .button}
{%endcomment%}

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
- `prices` (object) - set of distinct sellable prices for the event.
    * `data` (array) - container for prices data.
        + `{array item object}` - price.
            - `type` (string) - type of price.
            - `attributes` (object) - attributes of price.
                * `currency` (string) - currency of price.
                * `value` (string) - the offered price.
            - `relationships` (object) - available relationships.
                * `offers` (object) - offers that are sellable at this price.
                    - `data` (array) - container for offers.
                        + `{array item object}` - offer.
                            * `id` (string) - id of offer.
                            * `type` (string) - type of offer.
                * `price-zones` (object) - price-zones that are sellable at this price.
                    - `data` (array) - container for price zones.
                        + `{array item object}` - price zone.
                            * `id` (string) - id of price zone.
                            * `type` (string) - type of price zone.                 
- `offers` (array) - container for the set of sellable offers.
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
                - `data` (array) - container for areas.
                    + `{array item object}` - area.
                        * `id` (string) - id of area.
                        * `type` (string) - type of area.            
            * `products` (object) - related products.
                * `data` (array) - container for products.
                    + `{array item object}` - product.
                        - `id` (string) - id of product.
                        - `type` (string) - type of product.
            * `price-zones` (object) - related price zones.
                * `data` (array) - container for price zones.
                    + `{array item object}` - price zone.
                        - `id` (string) - id of price zone.
                        - `type` (string) - type of price zone.
- `_embedded` (object) - container for included (embedded) data.
    - `areas` (object) - event areas.
        - `data` (array) - container for areas.
            + `{array item object}` - area.
                * `id` (string) - id of area.
                * `type` (string) - type of area.
                * `attributes` (object) - attributes of areas.
                    - `rank` (string) - rank of area.
                    - `name` (string) - name of area.
                    - `area-type` (string) - type of area.
                * `relationships` (object) - available relationships.
                    - `areas` (object) - related areas.
                        * `data` (array) - areas.
                            + `{array item object}` - container for areas.
                                - `id` (string) - id of area.
                                - `type` (string) - type of area.
                    - `offers` (object) - related offers.
                        * `data` (array) - container for offers.
                            + `{array item object}` - offer.
                                - `id` (string) - id of offer.
                                - `type` (string) - type of offer.
                    - `price-zones` (object) - related price zones.
                        * `data` (array) - container for price zones.
                            + `{array item object}` - price zone.
                                - `id` (string) - id of price zone.
                                - `type` (string) - type of price zone.
    - `passwords` (object) - passwords.
        - `data` (array) - container for passwords.
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
                    * `data` (array) - container for offers.
                    + `{array item object}` - offer.
                        - `id` (string) - id of offer.
                        - `type` (string) - type of offer.
    - `price-zones` (object) - price zones.
        - `data` (array) - container for price zones.
            + `{array item object}` - price zone.
                * `id` (string) - price zone id.
                * `type` (string) - price zone type.
                * `attributes` (object) - attributes of price zone.
                    - `currency` (string) - currency of price zone.
                    - `name` (string) - name of price zone.
                * `relationships` (object) - available relationships.
                    - `offers` (object) - related offers.
                        * `data` (array) - container for offers.
                            + `{array item object}` - offer.
                                - `id` (string) - id of offer.
                                - `type` (string) - type of offer.
                    - `areas` (object) - related areas.
                        - `data` (array) - container for areas.
                            + `{array item object}` - area.
                                * `id` (string) - id of area.
                                * `type` (string) - type of area.

{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/commerce/v2/events/0B00508C829A3875/offers.json?{apikey}",
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
--include 'https://app.ticketmaster.com/commerce/v2/events/0B00508C829A3875/offers.json?{apikey}
{% endhighlight %}


{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /commerce/v2/events/0B00508C829A3875/offers.json?{apikey} HTTP/1.1
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
X-TM-SESSION-BID: commerce-offering
Connection: keep-alive
Access-Control-Allow-Credentials: true
Server: Apache-Coyote/1.1
Rate-Limit-Reset: 1468530242515
Access-Control-Allow-Headers: Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers
Date: Thu, 14 Jul 2016 18:15:12 GMT
Access-Control-Allow-Origin: *
X-TM-SESSION-SID: 49D8E7AAEF70BE318E4CEB599C499675
X-Application-Context: commerce-api-commerce-offering-v1:default,jash1:8080
Content-Type: application/json;charset=UTF-8
Rate-Limit: 500000

{
  "limits":  {
    "max": 50
  },
  "prices":  {
    "data":  [
       {
        "type": "offered-prices",
        "attributes":  {
          "currency": "USD",
          "value": "14.00"
        },
        "relationships":  {
          "offers":  {
            "data":  [
               {
                "id": "000000000001",
                "type": "offers"
              },
               {
                "id": "QMASK2ROLLUP",
                "type": "offers"
              }
            ]
          },
          "priceZones":  {
            "data":  [
               {
                "id": "23",
                "type": "price-zones"
              }
            ]
          },
          "areas":  {
            "data":  [
               {
                "id": "7",
                "type": "areas"
              },
               {
                "id": "22",
                "type": "areas"
              }
            ]
          }
        }
      },
       {
        "type": "offered-prices",
        "attributes":  {
          "currency": "USD",
          "value": "18.00"
        },
        "relationships":  {
          "offers":  {
            "data":  [
               {
                "id": "000000000001",
                "type": "offers"
              },
               {
                "id": "QMASK2ROLLUP",
                "type": "offers"
              }
            ]
          },
          "priceZones":  {
            "data":  [
               {
                "id": "20",
                "type": "price-zones"
              }
            ]
          },
          "areas":  {
            "data":  [
               {
                "id": "7",
                "type": "areas"
              },
               {
                "id": "22",
                "type": "areas"
              }
            ]
          }
        }
      },
       {
        "type": "offered-prices",
        "attributes":  {
          "currency": "USD",
          "value": "23.00"
        },
        "relationships":  {
          "offers":  {
            "data":  [
               {
                "id": "QMASK2ROLLUP",
                "type": "offers"
              }
            ]
          },
          "priceZones":  {
            "data":  [
               {
                "id": "19",
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
          "value": "25.00"
        },
        "relationships":  {
          "offers":  {
            "data":  [
               {
                "id": "000000000001",
                "type": "offers"
              }
            ]
          },
          "priceZones":  {
            "data":  [
               {
                "id": "19",
                "type": "price-zones"
              }
            ]
          },
          "areas":  {
            "data":  [
               {
                "id": "6",
                "type": "areas"
              }
            ]
          }
        }
      },
       {
        "type": "offered-prices",
        "attributes":  {
          "currency": "USD",
          "value": "26.00"
        },
        "relationships":  {
          "offers":  {
            "data":  [
               {
                "id": "QMASK2ROLLUP",
                "type": "offers"
              }
            ]
          },
          "priceZones":  {
            "data":  [
               {
                "id": "17",
                "type": "price-zones"
              }
            ]
          },
          "areas":  {
            "data":  [
               {
                "id": "6",
                "type": "areas"
              }
            ]
          }
        }
      },
       {
        "type": "offered-prices",
        "attributes":  {
          "currency": "USD",
          "value": "28.00"
        },
        "relationships":  {
          "offers":  {
            "data":  [
               {
                "id": "QMASK2ROLLUP",
                "type": "offers"
              }
            ]
          },
          "priceZones":  {
            "data":  [
               {
                "id": "15",
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
          "value": "30.00"
        },
        "relationships":  {
          "offers":  {
            "data":  [
               {
                "id": "000000000001",
                "type": "offers"
              }
            ]
          },
          "priceZones":  {
            "data":  [
               {
                "id": "17",
                "type": "price-zones"
              }
            ]
          },
          "areas":  {
            "data":  [
               {
                "id": "6",
                "type": "areas"
              }
            ]
          }
        }
      },
       {
        "type": "offered-prices",
        "attributes":  {
          "currency": "USD",
          "value": "36.00"
        },
        "relationships":  {
          "offers":  {
            "data":  [
               {
                "id": "000000000001",
                "type": "offers"
              }
            ]
          },
          "priceZones":  {
            "data":  [
               {
                "id": "15",
                "type": "price-zones"
              }
            ]
          },
          "areas":  {
            "data":  [
               {
                "id": "5",
                "type": "areas"
              }
            ]
          }
        }
      },
       {
        "type": "offered-prices",
        "attributes":  {
          "currency": "USD",
          "value": "37.00"
        },
        "relationships":  {
          "offers":  {
            "data":  [
               {
                "id": "QMASK2ROLLUP",
                "type": "offers"
              }
            ]
          },
          "priceZones":  {
            "data":  [
               {
                "id": "13",
                "type": "price-zones"
              }
            ]
          },
          "areas":  {
            "data":  [
               {
                "id": "5",
                "type": "areas"
              },
               {
                "id": "22",
                "type": "areas"
              }
            ]
          }
        }
      },
       {
        "type": "offered-prices",
        "attributes":  {
          "currency": "USD",
          "value": "44.00"
        },
        "relationships":  {
          "offers":  {
            "data":  [
               {
                "id": "QMASK2ROLLUP",
                "type": "offers"
              }
            ]
          },
          "priceZones":  {
            "data":  [
               {
                "id": "12",
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
          "value": "59.00"
        },
        "relationships":  {
          "priceZones":  {
            "data":  [
               {
                "id": "11",
                "type": "price-zones"
              }
            ]
          },
          "areas":  {
            "data":  [
               {
                "id": "22",
                "type": "areas"
              }
            ]
          }
        }
      },
       {
        "type": "offered-prices",
        "attributes":  {
          "currency": "USD",
          "value": "66.00"
        },
        "relationships":  {
          "offers":  {
            "data":  [
               {
                "id": "QMASK2ROLLUP",
                "type": "offers"
              }
            ]
          },
          "priceZones":  {
            "data":  [
               {
                "id": "11",
                "type": "price-zones"
              },
               {
                "id": "12",
                "type": "price-zones"
              }
            ]
          },
          "areas":  {
            "data":  [
               {
                "id": "22",
                "type": "areas"
              }
            ]
          }
        }
      },
       {
        "type": "offered-prices",
        "attributes":  {
          "currency": "USD",
          "value": "70.00"
        },
        "relationships":  {
          "offers":  {
            "data":  [
               {
                "id": "000000000001",
                "type": "offers"
              }
            ]
          },
          "priceZones":  {
            "data":  [
               {
                "id": "13",
                "type": "price-zones"
              }
            ]
          },
          "areas":  {
            "data":  [
               {
                "id": "5",
                "type": "areas"
              },
               {
                "id": "22",
                "type": "areas"
              }
            ]
          }
        }
      },
       {
        "type": "offered-prices",
        "attributes":  {
          "currency": "USD",
          "value": "85.00"
        },
        "relationships":  {
          "offers":  {
            "data":  [
               {
                "id": "000000000001",
                "type": "offers"
              }
            ]
          },
          "priceZones":  {
            "data":  [
               {
                "id": "12",
                "type": "price-zones"
              }
            ]
          },
          "areas":  {
            "data":  [
               {
                "id": "4",
                "type": "areas"
              },
               {
                "id": "8",
                "type": "areas"
              }
            ]
          }
        }
      },
       {
        "type": "offered-prices",
        "attributes":  {
          "currency": "USD",
          "value": "100.00"
        },
        "relationships":  {
          "offers":  {
            "data":  [
               {
                "id": "000000000001",
                "type": "offers"
              }
            ]
          },
          "priceZones":  {
            "data":  [
               {
                "id": "11",
                "type": "price-zones"
              }
            ]
          },
          "areas":  {
            "data":  [
               {
                "id": "4",
                "type": "areas"
              },
               {
                "id": "14",
                "type": "areas"
              },
               {
                "id": "22",
                "type": "areas"
              }
            ]
          }
        }
      },
       {
        "type": "offered-prices",
        "attributes":  {
          "currency": "USD",
          "value": "125.00"
        },
        "relationships":  {
          "offers":  {
            "data":  [
               {
                "id": "QMASK2ROLLUP",
                "type": "offers"
              }
            ]
          },
          "priceZones":  {
            "data":  [
               {
                "id": "10",
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
          "value": "142.00"
        },
        "relationships":  {
          "offers":  {
            "data":  [
               {
                "id": "QMASK2ROLLUP",
                "type": "offers"
              }
            ]
          },
          "priceZones":  {
            "data":  [
               {
                "id": "9",
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
          "value": "150.00"
        },
        "relationships":  {
          "offers":  {
            "data":  [
               {
                "id": "000000000001",
                "type": "offers"
              }
            ]
          },
          "priceZones":  {
            "data":  [
               {
                "id": "10",
                "type": "price-zones"
              }
            ]
          },
          "areas":  {
            "data":  [
               {
                "id": "2",
                "type": "areas"
              },
               {
                "id": "3",
                "type": "areas"
              }
            ]
          }
        }
      },
       {
        "type": "offered-prices",
        "attributes":  {
          "currency": "USD",
          "value": "182.00"
        },
        "relationships":  {
          "offers":  {
            "data":  [
               {
                "id": "000000000001",
                "type": "offers"
              }
            ]
          },
          "priceZones":  {
            "data":  [
               {
                "id": "9",
                "type": "price-zones"
              }
            ]
          },
          "areas":  {
            "data":  [
               {
                "id": "0",
                "type": "areas"
              },
               {
                "id": "1",
                "type": "areas"
              }
            ]
          }
        }
      }
    ]
  },
  "metadata":  {
    "eventMapping":  {
      "id": "vvG1iZfFweJN-g",
      "type": "event",
      "source":  {
        "name": "ticketmaster",
        "id": "0B00508C829A3875"
      }
    }
  },
  "offers":  [
     {
      "id": "000000000001",
      "type": "offers",
      "attributes":  {
        "name": "ADULT",
        "description": "Standard Adult",
        "rank": 0,
        "offerType": "DEFAULT",
        "currency": "USD",
        "prices":  [
           {
            "priceZone": "10",
            "value": "150.00",
            "total": "165.50",
            "fees":  [
               {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
               {
                "value": "0.00",
                "label": "Facility",
                "type": "facility"
              },
               {
                "value": "15.50",
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
            ]
          },
           {
            "priceZone": "11",
            "value": "100.00",
            "total": "111.00",
            "fees":  [
               {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
               {
                "value": "0.00",
                "label": "Facility",
                "type": "facility"
              },
               {
                "value": "11.00",
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
            ]
          },
           {
            "priceZone": "12",
            "value": "85.00",
            "total": "94.50",
            "fees":  [
               {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
               {
                "value": "0.00",
                "label": "Facility",
                "type": "facility"
              },
               {
                "value": "9.50",
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
            ]
          },
           {
            "priceZone": "13",
            "value": "70.00",
            "total": "79.00",
            "fees":  [
               {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
               {
                "value": "0.00",
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
            ]
          },
           {
            "priceZone": "15",
            "value": "36.00",
            "total": "43.00",
            "fees":  [
               {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
               {
                "value": "0.00",
                "label": "Facility",
                "type": "facility"
              },
               {
                "value": "7.00",
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
            ]
          },
           {
            "priceZone": "17",
            "value": "30.00",
            "total": "37.00",
            "fees":  [
               {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
               {
                "value": "0.00",
                "label": "Facility",
                "type": "facility"
              },
               {
                "value": "7.00",
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
            ]
          },
           {
            "priceZone": "19",
            "value": "25.00",
            "total": "31.50",
            "fees":  [
               {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
               {
                "value": "0.00",
                "label": "Facility",
                "type": "facility"
              },
               {
                "value": "6.50",
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
            ]
          },
           {
            "priceZone": "20",
            "value": "18.00",
            "total": "23.50",
            "fees":  [
               {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
               {
                "value": "0.00",
                "label": "Facility",
                "type": "facility"
              },
               {
                "value": "5.50",
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
            ]
          },
           {
            "priceZone": "23",
            "value": "14.00",
            "total": "19.50",
            "fees":  [
               {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
               {
                "value": "0.00",
                "label": "Facility",
                "type": "facility"
              },
               {
                "value": "5.50",
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
            ]
          },
           {
            "priceZone": "9",
            "value": "182.00",
            "total": "199.50",
            "fees":  [
               {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
               {
                "value": "0.00",
                "label": "Facility",
                "type": "facility"
              },
               {
                "value": "17.50",
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
            ]
          }
        ],
        "limit":  {
          "min": 1,
          "max": 50,
          "multiples": 1
        }
      },
      "relationships":  {
        "areas":  {
          "data":  [
             {
              "id": "0",
              "type": "areas"
            },
             {
              "id": "1",
              "type": "areas"
            },
             {
              "id": "2",
              "type": "areas"
            },
             {
              "id": "3",
              "type": "areas"
            },
             {
              "id": "4",
              "type": "areas"
            },
             {
              "id": "5",
              "type": "areas"
            },
             {
              "id": "6",
              "type": "areas"
            },
             {
              "id": "7",
              "type": "areas"
            },
             {
              "id": "8",
              "type": "areas"
            },
             {
              "id": "14",
              "type": "areas"
            },
             {
              "id": "22",
              "type": "areas"
            }
          ]
        },
        "priceZones":  {
          "data":  [
             {
              "id": "10",
              "type": "price-zones"
            },
             {
              "id": "11",
              "type": "price-zones"
            },
             {
              "id": "12",
              "type": "price-zones"
            },
             {
              "id": "13",
              "type": "price-zones"
            },
             {
              "id": "15",
              "type": "price-zones"
            },
             {
              "id": "17",
              "type": "price-zones"
            },
             {
              "id": "19",
              "type": "price-zones"
            },
             {
              "id": "20",
              "type": "price-zones"
            },
             {
              "id": "23",
              "type": "price-zones"
            },
             {
              "id": "9",
              "type": "price-zones"
            }
          ]
        },
        "products":  {
          "data":  [
             {
              "id": "0B00508C829A3875",
              "type": "products"
            }
          ]
        }
      }
    },
     {
      "id": "QMASK2ROLLUP",
      "type": "offers",
      "attributes":  {
        "name": "QMASK2ROLLUP",
        "rank": 1,
        "offerType": "SPECIAL",
        "currency": "USD",
        "prices":  [
           {
            "priceZone": "10",
            "value": "125.00",
            "total": "137.50",
            "fees":  [
               {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
               {
                "value": "0.00",
                "label": "Facility",
                "type": "facility"
              },
               {
                "value": "12.50",
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
            ]
          },
           {
            "priceZone": "11",
            "value": "66.00",
            "total": "74.50",
            "fees":  [
               {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
               {
                "value": "0.00",
                "label": "Facility",
                "type": "facility"
              },
               {
                "value": "8.50",
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
            ]
          },
           {
            "priceZone": "12",
            "value": "44.00",
            "total": "51.50",
            "fees":  [
               {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
               {
                "value": "0.00",
                "label": "Facility",
                "type": "facility"
              },
               {
                "value": "7.50",
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
            ]
          },
           {
            "priceZone": "13",
            "value": "37.00",
            "total": "44.00",
            "fees":  [
               {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
               {
                "value": "0.00",
                "label": "Facility",
                "type": "facility"
              },
               {
                "value": "7.00",
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
            ]
          },
           {
            "priceZone": "15",
            "value": "28.00",
            "total": "34.50",
            "fees":  [
               {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
               {
                "value": "0.00",
                "label": "Facility",
                "type": "facility"
              },
               {
                "value": "6.50",
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
            ]
          },
           {
            "priceZone": "17",
            "value": "26.00",
            "total": "32.50",
            "fees":  [
               {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
               {
                "value": "0.00",
                "label": "Facility",
                "type": "facility"
              },
               {
                "value": "6.50",
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
            ]
          },
           {
            "priceZone": "19",
            "value": "23.00",
            "total": "29.50",
            "fees":  [
               {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
               {
                "value": "0.00",
                "label": "Facility",
                "type": "facility"
              },
               {
                "value": "6.50",
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
            ]
          },
           {
            "priceZone": "20",
            "value": "18.00",
            "total": "23.50",
            "fees":  [
               {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
               {
                "value": "0.00",
                "label": "Facility",
                "type": "facility"
              },
               {
                "value": "5.50",
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
            ]
          },
           {
            "priceZone": "23",
            "value": "14.00",
            "total": "19.50",
            "fees":  [
               {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
               {
                "value": "0.00",
                "label": "Facility",
                "type": "facility"
              },
               {
                "value": "5.50",
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
            ]
          },
           {
            "priceZone": "9",
            "value": "142.00",
            "total": "156.50",
            "fees":  [
               {
                "value": "0.00",
                "label": "Distance",
                "type": "distance"
              },
               {
                "value": "0.00",
                "label": "Facility",
                "type": "facility"
              },
               {
                "value": "14.50",
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
            ]
          }
        ],
        "limit":  {
          "min": 1,
          "max": 50,
          "multiples": 1
        }
      },
      "relationships":  {
        "areas":  {
          "data":  [
             {
              "id": "0",
              "type": "areas"
            },
             {
              "id": "1",
              "type": "areas"
            },
             {
              "id": "2",
              "type": "areas"
            },
             {
              "id": "3",
              "type": "areas"
            },
             {
              "id": "4",
              "type": "areas"
            },
             {
              "id": "5",
              "type": "areas"
            },
             {
              "id": "6",
              "type": "areas"
            },
             {
              "id": "7",
              "type": "areas"
            },
             {
              "id": "8",
              "type": "areas"
            },
             {
              "id": "14",
              "type": "areas"
            },
             {
              "id": "22",
              "type": "areas"
            }
          ]
        },
        "priceZones":  {
          "data":  [
             {
              "id": "10",
              "type": "price-zones"
            },
             {
              "id": "11",
              "type": "price-zones"
            },
             {
              "id": "12",
              "type": "price-zones"
            },
             {
              "id": "13",
              "type": "price-zones"
            },
             {
              "id": "15",
              "type": "price-zones"
            },
             {
              "id": "17",
              "type": "price-zones"
            },
             {
              "id": "19",
              "type": "price-zones"
            },
             {
              "id": "20",
              "type": "price-zones"
            },
             {
              "id": "23",
              "type": "price-zones"
            },
             {
              "id": "9",
              "type": "price-zones"
            }
          ]
        },
        "passwords":  {
          "data":  [
             {
              "id": "2b81df841235ca20f272acad674d6c71",
              "type": "passwords"
            }
          ]
        },
        "products":  {
          "data":  [
             {
              "id": "0B00508C829A3875",
              "type": "products"
            }
          ]
        }
      }
    }
  ],
  "_embedded":  {
    "priceZones":  {
      "data":  [
         {
          "id": "17",
          "type": "price-zones",
          "attributes":  {
            "currency": "USD",
            "name": "PRICE LEVEL 7"
          },
          "relationships":  {
            "offers":  {
              "data":  [
                 {
                  "id": "000000000001",
                  "type": "offers"
                },
                 {
                  "id": "QMASK2ROLLUP",
                  "type": "offers"
                }
              ]
            },
            "areas":  {
              "data":  [
                 {
                  "id": "6",
                  "type": "areas"
                }
              ]
            }
          }
        },
         {
          "id": "20",
          "type": "price-zones",
          "attributes":  {
            "currency": "USD",
            "name": "PRICE LEVEL 9"
          },
          "relationships":  {
            "offers":  {
              "data":  [
                 {
                  "id": "000000000001",
                  "type": "offers"
                },
                 {
                  "id": "QMASK2ROLLUP",
                  "type": "offers"
                }
              ]
            },
            "areas":  {
              "data":  [
                 {
                  "id": "7",
                  "type": "areas"
                },
                 {
                  "id": "22",
                  "type": "areas"
                }
              ]
            }
          }
        },
         {
          "id": "10",
          "type": "price-zones",
          "attributes":  {
            "currency": "USD",
            "name": "PRICE LEVEL 2"
          },
          "relationships":  {
            "offers":  {
              "data":  [
                 {
                  "id": "000000000001",
                  "type": "offers"
                },
                 {
                  "id": "QMASK2ROLLUP",
                  "type": "offers"
                }
              ]
            },
            "areas":  {
              "data":  [
                 {
                  "id": "2",
                  "type": "areas"
                },
                 {
                  "id": "3",
                  "type": "areas"
                }
              ]
            }
          }
        },
         {
          "id": "11",
          "type": "price-zones",
          "attributes":  {
            "currency": "USD",
            "name": "PRICE LEVEL 3"
          },
          "relationships":  {
            "offers":  {
              "data":  [
                 {
                  "id": "000000000001",
                  "type": "offers"
                },
                 {
                  "id": "QMASK2ROLLUP",
                  "type": "offers"
                }
              ]
            },
            "areas":  {
              "data":  [
                 {
                  "id": "4",
                  "type": "areas"
                },
                 {
                  "id": "14",
                  "type": "areas"
                },
                 {
                  "id": "22",
                  "type": "areas"
                }
              ]
            }
          }
        },
         {
          "id": "23",
          "type": "price-zones",
          "attributes":  {
            "currency": "USD",
            "name": "PRICE LEVEL 10"
          },
          "relationships":  {
            "offers":  {
              "data":  [
                 {
                  "id": "000000000001",
                  "type": "offers"
                },
                 {
                  "id": "QMASK2ROLLUP",
                  "type": "offers"
                }
              ]
            },
            "areas":  {
              "data":  [
                 {
                  "id": "7",
                  "type": "areas"
                },
                 {
                  "id": "22",
                  "type": "areas"
                }
              ]
            }
          }
        },
         {
          "id": "13",
          "type": "price-zones",
          "attributes":  {
            "currency": "USD",
            "name": "PRICE LEVEL 5"
          },
          "relationships":  {
            "offers":  {
              "data":  [
                 {
                  "id": "000000000001",
                  "type": "offers"
                },
                 {
                  "id": "QMASK2ROLLUP",
                  "type": "offers"
                }
              ]
            },
            "areas":  {
              "data":  [
                 {
                  "id": "5",
                  "type": "areas"
                },
                 {
                  "id": "22",
                  "type": "areas"
                }
              ]
            }
          }
        },
         {
          "id": "9",
          "type": "price-zones",
          "attributes":  {
            "currency": "USD",
            "name": "PRICE LEVEL 1"
          },
          "relationships":  {
            "offers":  {
              "data":  [
                 {
                  "id": "000000000001",
                  "type": "offers"
                },
                 {
                  "id": "QMASK2ROLLUP",
                  "type": "offers"
                }
              ]
            },
            "areas":  {
              "data":  [
                 {
                  "id": "0",
                  "type": "areas"
                },
                 {
                  "id": "1",
                  "type": "areas"
                }
              ]
            }
          }
        },
         {
          "id": "12",
          "type": "price-zones",
          "attributes":  {
            "currency": "USD",
            "name": "PRICE LEVEL 4"
          },
          "relationships":  {
            "offers":  {
              "data":  [
                 {
                  "id": "000000000001",
                  "type": "offers"
                },
                 {
                  "id": "QMASK2ROLLUP",
                  "type": "offers"
                }
              ]
            },
            "areas":  {
              "data":  [
                 {
                  "id": "4",
                  "type": "areas"
                },
                 {
                  "id": "8",
                  "type": "areas"
                }
              ]
            }
          }
        },
         {
          "id": "15",
          "type": "price-zones",
          "attributes":  {
            "currency": "USD",
            "name": "PRICE LEVEL 6"
          },
          "relationships":  {
            "offers":  {
              "data":  [
                 {
                  "id": "000000000001",
                  "type": "offers"
                },
                 {
                  "id": "QMASK2ROLLUP",
                  "type": "offers"
                }
              ]
            },
            "areas":  {
              "data":  [
                 {
                  "id": "5",
                  "type": "areas"
                }
              ]
            }
          }
        },
         {
          "id": "19",
          "type": "price-zones",
          "attributes":  {
            "currency": "USD",
            "name": "PRICE LEVEL 8"
          },
          "relationships":  {
            "offers":  {
              "data":  [
                 {
                  "id": "000000000001",
                  "type": "offers"
                },
                 {
                  "id": "QMASK2ROLLUP",
                  "type": "offers"
                }
              ]
            },
            "areas":  {
              "data":  [
                 {
                  "id": "6",
                  "type": "areas"
                }
              ]
            }
          }
        }
      ]
    },
    "areas":  {
      "data":  [
         {
          "id": "7",
          "type": "areas",
          "attributes":  {
            "rank": 0,
            "name": "BENCH4",
            "areaType": "AREA"
          },
          "relationships":  {
            "areas":  {},
            "offers":  {
              "data":  [
                 {
                  "id": "000000000001",
                  "type": "offers"
                },
                 {
                  "id": "QMASK2ROLLUP",
                  "type": "offers"
                }
              ]
            },
            "priceZones":  {
              "data":  [
                 {
                  "id": "20",
                  "type": "price-zones"
                },
                 {
                  "id": "23",
                  "type": "price-zones"
                }
              ]
            }
          }
        },
         {
          "id": "6",
          "type": "areas",
          "attributes":  {
            "rank": 1,
            "name": "BENCH3",
            "areaType": "AREA"
          },
          "relationships":  {
            "areas":  {},
            "offers":  {
              "data":  [
                 {
                  "id": "000000000001",
                  "type": "offers"
                },
                 {
                  "id": "QMASK2ROLLUP",
                  "type": "offers"
                }
              ]
            },
            "priceZones":  {
              "data":  [
                 {
                  "id": "17",
                  "type": "price-zones"
                },
                 {
                  "id": "19",
                  "type": "price-zones"
                }
              ]
            }
          }
        },
         {
          "id": "5",
          "type": "areas",
          "attributes":  {
            "rank": 2,
            "name": "BENCH2",
            "areaType": "AREA"
          },
          "relationships":  {
            "areas":  {},
            "offers":  {
              "data":  [
                 {
                  "id": "000000000001",
                  "type": "offers"
                },
                 {
                  "id": "QMASK2ROLLUP",
                  "type": "offers"
                }
              ]
            },
            "priceZones":  {
              "data":  [
                 {
                  "id": "13",
                  "type": "price-zones"
                },
                 {
                  "id": "15",
                  "type": "price-zones"
                }
              ]
            }
          }
        },
         {
          "id": "8",
          "type": "areas",
          "attributes":  {
            "rank": 3,
            "name": "RAMP",
            "areaType": "AREA"
          },
          "relationships":  {
            "areas":  {},
            "offers":  {
              "data":  [
                 {
                  "id": "000000000001",
                  "type": "offers"
                },
                 {
                  "id": "QMASK2ROLLUP",
                  "type": "offers"
                }
              ]
            },
            "priceZones":  {
              "data":  [
                 {
                  "id": "12",
                  "type": "price-zones"
                }
              ]
            }
          }
        },
         {
          "id": "22",
          "type": "areas",
          "attributes":  {
            "rank": 4,
            "name": "BENCH",
            "areaType": "AREA"
          },
          "relationships":  {
            "areas":  {},
            "offers":  {
              "data":  [
                 {
                  "id": "000000000001",
                  "type": "offers"
                },
                 {
                  "id": "QMASK2ROLLUP",
                  "type": "offers"
                }
              ]
            },
            "priceZones":  {
              "data":  [
                 {
                  "id": "11",
                  "type": "price-zones"
                },
                 {
                  "id": "13",
                  "type": "price-zones"
                },
                 {
                  "id": "20",
                  "type": "price-zones"
                },
                 {
                  "id": "23",
                  "type": "price-zones"
                }
              ]
            }
          }
        },
         {
          "id": "4",
          "type": "areas",
          "attributes":  {
            "rank": 5,
            "name": "BENCH1",
            "areaType": "AREA"
          },
          "relationships":  {
            "areas":  {},
            "offers":  {
              "data":  [
                 {
                  "id": "000000000001",
                  "type": "offers"
                },
                 {
                  "id": "QMASK2ROLLUP",
                  "type": "offers"
                }
              ]
            },
            "priceZones":  {
              "data":  [
                 {
                  "id": "11",
                  "type": "price-zones"
                },
                 {
                  "id": "12",
                  "type": "price-zones"
                }
              ]
            }
          }
        },
         {
          "id": "14",
          "type": "areas",
          "attributes":  {
            "rank": 6,
            "name": "SUPER",
            "areaType": "AREA"
          },
          "relationships":  {
            "areas":  {},
            "offers":  {
              "data":  [
                 {
                  "id": "000000000001",
                  "type": "offers"
                },
                 {
                  "id": "QMASK2ROLLUP",
                  "type": "offers"
                }
              ]
            },
            "priceZones":  {
              "data":  [
                 {
                  "id": "11",
                  "type": "price-zones"
                }
              ]
            }
          }
        },
         {
          "id": "2",
          "type": "areas",
          "attributes":  {
            "rank": 7,
            "name": "BOX2",
            "areaType": "AREA"
          },
          "relationships":  {
            "areas":  {},
            "offers":  {
              "data":  [
                 {
                  "id": "000000000001",
                  "type": "offers"
                },
                 {
                  "id": "QMASK2ROLLUP",
                  "type": "offers"
                }
              ]
            },
            "priceZones":  {
              "data":  [
                 {
                  "id": "10",
                  "type": "price-zones"
                }
              ]
            }
          }
        },
         {
          "id": "3",
          "type": "areas",
          "attributes":  {
            "rank": 8,
            "name": "BOX3",
            "areaType": "AREA"
          },
          "relationships":  {
            "areas":  {},
            "offers":  {
              "data":  [
                 {
                  "id": "000000000001",
                  "type": "offers"
                },
                 {
                  "id": "QMASK2ROLLUP",
                  "type": "offers"
                }
              ]
            },
            "priceZones":  {
              "data":  [
                 {
                  "id": "10",
                  "type": "price-zones"
                }
              ]
            }
          }
        },
         {
          "id": "0",
          "type": "areas",
          "attributes":  {
            "rank": 9,
            "name": "BOX",
            "areaType": "AREA"
          },
          "relationships":  {
            "areas":  {},
            "offers":  {
              "data":  [
                 {
                  "id": "000000000001",
                  "type": "offers"
                },
                 {
                  "id": "QMASK2ROLLUP",
                  "type": "offers"
                }
              ]
            },
            "priceZones":  {
              "data":  [
                 {
                  "id": "9",
                  "type": "price-zones"
                }
              ]
            }
          }
        },
         {
          "id": "1",
          "type": "areas",
          "attributes":  {
            "rank": 10,
            "name": "BOX1",
            "areaType": "AREA"
          },
          "relationships":  {
            "areas":  {},
            "offers":  {
              "data":  [
                 {
                  "id": "000000000001",
                  "type": "offers"
                },
                 {
                  "id": "QMASK2ROLLUP",
                  "type": "offers"
                }
              ]
            },
            "priceZones":  {
              "data":  [
                 {
                  "id": "9",
                  "type": "price-zones"
                }
              ]
            }
          }
        }
      ]
    },
    "passwords":  {
      "data":  [
         {
          "id": "2b81df841235ca20f272acad674d6c71",
          "type": "passwords",
          "attributes":  {
            "type": "level_two_mask_rollup",
            "exclusive": false,
            "prompts":  []
          },
          "relationships":  {
            "offers":  {
              "data":  [
                 {
                  "id": "QMASK2ROLLUP",
                  "type": "offers"
                }
              ]
            }
          },
          "metadata":  {
            "type": "password-meta"
          }
        }
      ]
    }
  }
}
{% endhighlight %}


## Get Cart
{: .article .console-link #get-cart}

**Method:** GET.
Authentication required.

Returns the cart.

commerce/{version}/shopping/carts/{cartId}.{format}
{: .code .red}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v2"         | Yes      |
| `cartId`   | Cart ID. Required.   | string            | "c5d3fb70-f7cb-489d-823d-8103222f0c17.jash1" | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |

### Response structure: {# cart-response}

{: .nested-list }
- `cart` (object) - the cart
    * `id` (string) - the cart id.
    * `type` (string) - '_carts_'.
    * `attributes` (object) - the attributes of the cart.
        + `reservations` (array) - container of reservations.    
            + `{array item object}` - reservation.
        + `fees` (array) - container of order level fees.
            + `{array item object}` - order level fee.
        + `taxes` (array) - container of order level taxes.
            + `{array item object}` - order level tax.
        + `totals` (object) - the total amounts for the cart.
            + `currency` (string) - the code of the currency for the totals.
            + `price` (string) - the total price of items in the cart.
            + `fees` (string) - the total fees for the cart.
            + `taxes` (string) - the total taxes for the cart.
            + `deliveries` (string) - the total delivery costs for the cart.
            + `upsells` (string) - the total cost of upsell items in the cart.
            + `total` (string) - the grand total of the cart.
    * `relationships` (object) - the relationships of the cart. 
        + `events` (object) - container for event relationships.
            + `data` (array) - container for event relationships.
                + `{array item object}` - event reference.
                    + `id` (string) - the event id.
                    + `type` (string) - '_events_'.
        + `products` (object) - container for product relationships.
            + `data` (array) - container for product relationships.
                + `{array item object}` - the product reference.
                    + `id` (string) - the product id.
                    + `type` (string) - '_products_'.
        + `offers` (object) - container for offer relationships.
            + `data` (array) - container for offer relationships.
                + `{array item object}` - the offer reference.
                    + `id` (string) - the offer id.
                    + `type` (string) - '_offers_'.
- `_embedded` (object) - container for included (embedded) data.
    * `events` (object) - container for included events data.
        + `data` (array)
            - `{array item object}` - an event.
                * `id` (string) - the event id.
                * `type` (string) - '_events'.
                * `attributes` (object) - event attributes.
                    - `name` (string) - the event name.
                * `relationships` (object) - event relationships.
                    - `products` (object) - container for event-product relationships.
                        * `data` (array)
                            + `{array item object}` - product reference.
                                - `id` (string) - the product id.
                                - `type` (string) - '_products_'.
                    - `offers` (object) - container for event-offer relationships.
                        * `data` (array)
                            + `{array item object}` - offer refernece.
                                - `id` (string) - the offer id.
                                - `type` (string) - '_offers_'.
    * `products` (object) - container for included products data.
        + `data` (array)
            - `{array item object}` - a product.
                * `id` (string) - the product id.
                * `type` (string) - '_products_'.
                * `attributes` (object) - the product attributes.
                * `relationships` (object) - product relationships.
                    - `offers` (object) - container for product-offer relationships.
                        * `data` (array)
                            + `{array item object}` - offer reference.
                                - `id` (string) - the offer id.
                                - `type` (string) - '_offers_'.
                    - `events` (object) - container for product-event relationships.
                        * `data` (array)
                            + `{array item object}` - the event reference.
                                - `id` (string) - the event id.
                                - `type` (string) - '_events_'.
    * `offers` (object) - container for included offers data.
        + `data` (array)
            - `{array item object}` - an offer.
                * `id` (string) - the offer id.
                * `type` (string) - '_offers_'.
                * `attributes` (object) - the offer attributes.
                    + `name` (string) - the offer name.
                    + `description` (string) - the offer description.
                * `relationships` (object) - the offer relationships.
                    + `products` (object) - container for offer-product relationships.
                        * `data` (array)
                            + `{array item object}` - product reference.
                                - `id` (string) - the product id.
                                - `type` (string) - '_products_'.
                    + `events` (object) - container for offer-event relationships.
                        * `data` (array)
                            + `{array item object}` - event reference.
                                - `id` (string) - the event id.
                                - `type` (string) - '_events_'.
- `status` (string) - the Http status code for the response.

{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/commerce/v2/shopping/carts/{cartId}.json?{apikey}",
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
--include 'https://app.ticketmaster.com/commerce/v2/shopping/carts/{cartId}.json?{apikey}
{% endhighlight %}


{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /commerce/v2/shopping/carts/{cartId}.json?{apikey} HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive

{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Rate-Limit-Over:
0
Content-Length:
21532
Rate-Limit-Available:
498399
Set-Cookie:
CMPS=EB55hDR95pURN1HyCaJoxuyEQcA8Sv2aKm4J/YaMBOYTHywQO/XHcWL6t8TWHLkL; path=/
Access-Control-Allow-Methods:
POST, PATCH, DELETE, GET, HEAD, OPTIONS
X-TM-SESSION-BID:
commerce-shopping
Connection:
keep-alive
Access-Control-Allow-Credentials:
true
Server:
Apache-Coyote/1.1
Rate-Limit-Reset:
1468530242515
Access-Control-Allow-Headers:
Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers
Date:
Thu, 14 Jul 2016 18:15:12 GMT
Access-Control-Allow-Origin:
*
X-TM-SESSION-SID:
49D8E7AAEF70BE318E4CEB599C499675
X-Application-Context:
commerce-api-commerce-shopping-v1:default,jash1:8080
Content-Type:
application/json;charset=UTF-8
Rate-Limit:
500000

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

## Create Cart
{: .article .console-link #create-cart}

**Method:** POST.
Authentication required.

This operation allows users to add products to a cart.

This operation supports the following add product requests:
{: .nested-list}
* a number of items for an offer of a product.
* a number of items for an offer in specific areas.
* a number of items for an offer in a specific price range.
* a specific set of inventory items (i.e. seats).

This operation returns a new cart.

commerce/{version}/shopping/carts.{format}
{: .code .red}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v2"         | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |

### Request body structure:

{: .nested-list }
* `pollingCallbackUrl` (string) - **Required** - client webhook URI where response will be posted if the operation polls.
* `products` (array) - **Required (at least one)** - container of add product requests.
    + `{array item object}` - an add product request.
        - `product` (string) - **Required** - the product id.
        - `qty` (string) - _**Required unless** specific items (by id) are being requested_ - the number of items requested.
        - `items` (array) - _Optional_ - a list of inventory item ids.  Used to reserve specific inventory items (i.e. specific seats).
        - `offers` (array) - **Required (at least one)** - list of offer ids.  Reserved inventory will come from one of these offer ids.
            * `{array item object}` - an offer request.
                + `offer` (string) - **Required** - the offer id.
                + `code` (string) - _Optional_ - the offer code if one is required to unlock the offer.
        - `filters` (object) - _Optional_ filters to apply when searching for inventory.
            * `areas` (array) - _Optional_ - the set of areas (by id) to search for inventory.
            * `maxPrice` (string) - _Optional_ - the maximum per item price.
            * `minPrice` (string) - _Optional_ - the minimum per item price.

### Response structure:

Same as the [Get Cart API](#get-cart).

{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"POST",
  url:"https://app.ticketmaster.com/commerce/v2/shopping/carts.json?{apikey}",
  async:true,
  data: {
          "pollingCallbackUrl" : "http://requestb.in/14hknvt1",
          "products" : [ {
             "offers" : [ {
               "offer" : "000000000001"
             } ],    
             "product" : "090050A9ED5B49D9",
             "qty" : 1
           } ]
        },
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
--include 'https://app.ticketmaster.com/commerce/v2/shopping/carts.json?{apikey} -X POST -d '{"pollingCallbackUrl" : "http://requestb.in/14hknvt1","products" : [ {"offers" : [ {"offer" : "000000000001"} ],"product" : "090050A9ED5B49D9","qty" : 1} ]}'
{% endhighlight %}


{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
POST /commerce/v2/shopping/carts.json?{apikey} HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive

{
          "pollingCallbackUrl" : "http://requestb.in/14hknvt1",
          "products" : [ {
             "offers" : [ {
               "offer" : "000000000001"
             } ],    
             "product" : "090050A9ED5B49D9",
             "qty" : 1
           } ]
}
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Rate-Limit-Over:
0
Content-Length:
21532
Rate-Limit-Available:
498399
Set-Cookie:
CMPS=EB55hDR95pURN1HyCaJoxuyEQcA8Sv2aKm4J/YaMBOYTHywQO/XHcWL6t8TWHLkL; path=/
Access-Control-Allow-Methods:
POST, PATCH, DELETE, GET, HEAD, OPTIONS
X-TM-SESSION-BID:
commerce-shopping
Connection:
keep-alive
Access-Control-Allow-Credentials:
true
Server:
Apache-Coyote/1.1
Rate-Limit-Reset:
1468530242515
Access-Control-Allow-Headers:
Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers
Date:
Thu, 14 Jul 2016 18:15:12 GMT
Access-Control-Allow-Origin:
*
X-TM-SESSION-SID:
49D8E7AAEF70BE318E4CEB599C499675
X-Application-Context:
commerce-api-commerce-shopping-v1:default,jash1:8080
Content-Type:
application/json;charset=UTF-8
Rate-Limit:
500000
{
  "cart": {
    "id": "8dc07b26-9b81-4b75-94cc-b66a83332f83.intqa102",
    "type": "carts",
    "attributes": {
      "reservations": [
        {
          "expiration": "2016-09-19T18:42:59.661Z",
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
    }
  },
  "status": "200"
}
{% endhighlight %}

## Empty Cart
{: .article .console-link #empty-cart}

**Method:** DELETE.
Authentication required.

This operation empties the cart.

This operation returns the updated cart.

commerce/{version}/shopping/carts/{cartId}.{format}
{: .code .red}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v2"         | Yes      |
| `cartId`   | Cart ID. Required.   | string            | "c5d3fb70-f7cb-489d-823d-8103222f0c17.jash1" | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |

### Response structure:

Same as the [Get Cart API](#get-cart).

{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"DELETE",
  url:"https://app.ticketmaster.com/commerce/v2/shopping/carts/{cartId}.json?{apikey}",
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
--include -X DELETE 'https://app.ticketmaster.com/commerce/v2/shopping/carts/{cartId}.json?{apikey}
{% endhighlight %}


{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
DELETE /commerce/v2/shopping/carts/{cartId}.json?{apikey} HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive

{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Rate-Limit-Over:
0
Content-Length:
21532
Rate-Limit-Available:
498399
Set-Cookie:
CMPS=EB55hDR95pURN1HyCaJoxuyEQcA8Sv2aKm4J/YaMBOYTHywQO/XHcWL6t8TWHLkL; path=/
Access-Control-Allow-Methods:
POST, PATCH, DELETE, GET, HEAD, OPTIONS
X-TM-SESSION-BID:
commerce-shopping
Connection:
keep-alive
Access-Control-Allow-Credentials:
true
Server:
Apache-Coyote/1.1
Rate-Limit-Reset:
1468530242515
Access-Control-Allow-Headers:
Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers
Date:
Thu, 14 Jul 2016 18:15:12 GMT
Access-Control-Allow-Origin:
*
X-TM-SESSION-SID:
49D8E7AAEF70BE318E4CEB599C499675
X-Application-Context:
commerce-api-commerce-shopping-v1:default,jash1:8080
Content-Type:
application/json;charset=UTF-8
Rate-Limit:
500000

{
  "cart": {
    "id": "789135f3-e337-4d0d-87e5-a0f5e824e209.jash1",
    "type": "carts",
    "attributes": {
      "totals": {
        "price": "0.00",
        "fees": "0.00",
        "taxes": "0.00",
        "deliveries": "0.00",
        "upsells": "0.00",
        "total": "0.00"
      }
    },
    "relationships": {},
    "metadata": {
      "type": "cart-meta",
      "external-ids": [
        {
          "id": "c64050d8-d561-48b2-b105-13032ca9c683",
          "provider": "host"
        }
      ]
    }
  },
  "_embedded": {},
  "status": "200"
}
{% endhighlight %}

## Update Cart Products
{: .article .console-link #update-cart-products}

**Method:** PATCH
Authentication required.

This operation allows users to add or remove products to/from a cart.

This operation supports add products in the same ways as the [Create Cart Operation](#create-cart).

This operation supports the following removal requests:
{: .nested-list}
* all items in a reservation.
* all items in a reservation for a specific product.
* all items in a specified set of inventory item groups.
* a set of specified inventory items.

This operation returns the updated cart.

commerce/{version}/shopping/carts/{cartId}/products.{format}
{: .code .red}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v2"         | Yes      |
| `cartId`   | Cart ID. Required.   | string            | "c5d3fb70-f7cb-489d-823d-8103222f0c17.jash1" | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |


### Request body structure:

{: .nested-list }
* `pollingCallbackUrl` (string) - **Required** - client webhook URI where response will be posted if the operation polls.
* `products` (array) - **Required (at least one)** - container of update product requests.
    + `{array item object}` - an update product request.
        - `op` (string) - **Required** - the operation code.  valid values - _add_, _remove_.
        - `product` (string) - **Required when adding or removing a product** - the product id.
        - `qty` (string) - _**Required when adding a product unless** specific items (by id) are being requested_ - the number of items requested.
        - `items` (array) - _Optional_ - a list of inventory item ids.  Used to add/remove specific items (i.e. seats).
        - `offers` (array) - **Required when adding a product** - list of offer ids.  Reserved inventory will come from one of these offer ids.
            * `{array item object}` - an offer request.
                + `offer` (string) - **Required** - the offer id.
                + `code` (string) - _Optional_ - the offer code if one is required to unlock the offer.
        - `filters` (object) - _Optional_ filters to apply when searching for inventory.
            * `areas` (array) - _Optional_ - the set of areas (by id) to search for inventory.
            * `maxPrice` (string) - _Optional_ - the maximum per item price.
            * `minPrice` (string) - _Optional_ - the minimum per item price.
        - `reservation` (string) - _Optional_ - the reservation to remove from the cart.
        - `itemGroups` (array) - _Optional_ - list of item group ids to remove from the cart.

### Response structure:

Same as the [Get Cart API](#get-cart).

{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"PATCH",
  url:"https://app.ticketmaster.com/commerce/v2/shopping/carts/{cartid}/products.json?{apikey}",
  async:true,
  data: {
          "pollingCallbackUrl" : "http://requestb.in/14hknvt1",
          "products" : [ {
            "op" : "add",
            "offers" : [
            {
              "offer" : "000000000001"
            }
            ],
            "filters" : {
              "areas" : [ "44A" ]
            },
            "product" : "3F004E7EE3F5B5AC",
            "qty" : 1
          } ]
        },
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
--include 'https://app.ticketmaster.com/commerce/v2/shopping/carts/{cartid}/products.json?{apikey} -X PATCH -d '{"pollingCallbackUrl" : "http://requestb.in/14hknvt1","products" : [ {"op" : "add","offers" : [{"offer" : "000000000001"}],"filters" : {"areas" : [ "44A" ]},"product" : "3F004E7EE3F5B5AC","qty" : 1}]}'
{% endhighlight %}


{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
PATCH /commerce/v2/shopping/carts/{cartid}/products.json?{apikey} HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive

{
  "pollingCallbackUrl" : "http://requestb.in/14hknvt1",
  "products" : [ {
    "op" : "add",
    "offers" : [
    {
      "offer" : "000000000001"
    }
    ],
    "filters" : {
      "areas" : [ "44A" ]
    },
    "product" : "3F004E7EE3F5B5AC",
    "qty" : 1
  } ]
}
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Rate-Limit-Over:
0
Content-Length:
21532
Rate-Limit-Available:
498399
Set-Cookie:
CMPS=EB55hDR95pURN1HyCaJoxuyEQcA8Sv2aKm4J/YaMBOYTHywQO/XHcWL6t8TWHLkL; path=/
Access-Control-Allow-Methods:
POST, PATCH, DELETE, GET, HEAD, OPTIONS
X-TM-SESSION-BID:
commerce-shopping
Connection:
keep-alive
Access-Control-Allow-Credentials:
true
Server:
Apache-Coyote/1.1
Rate-Limit-Reset:
1468530242515
Access-Control-Allow-Headers:
Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers
Date:
Thu, 14 Jul 2016 18:15:12 GMT
Access-Control-Allow-Origin:
*
X-TM-SESSION-SID:
49D8E7AAEF70BE318E4CEB599C499675
X-Application-Context:
commerce-api-commerce-shopping-v1:default,jash1:8080
Content-Type:
application/json;charset=UTF-8
Rate-Limit:
500000
{
  "cart": {
    "id": "8dc07b26-9b81-4b75-94cc-b66a83332f83.intqa102",
    "type": "carts",
    "attributes": {
      "reservations": [
        {
          "expiration": "2016-09-19T18:42:59.661Z",
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
    }
  },
  "status": "200"
}
{% endhighlight %}

## Get Deliveries
{: .article .console-link #get-deliveries}

**Method:** GET.
Authentication required.

Returns the deliveries.

commerce/{version}/checkout/carts/{cartId}/deliveries.{format}
{: .code .red}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v2"         | Yes      |
| `cartId`   | Cart ID. Required.   | string            | "c5d3fb70-f7cb-489d-823d-8103222f0c17.jash1" | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |

### Response structure: {# delivery-response}

{: .nested-list }
+ `deliveries` (array) - the deliveries
	 - `{array item object}` - the delivery reference.
	     * `id` (string) - the delivery id.
	     * `type` (string) - '_delivery_'.
	     * `attributes` (object) - the attributes of the delivery.
	         * `deliveryType` (string) - the delivery type.
	         * `displayRank` (string) - the display rank.
	         - `totals` (object) - the total amounts for the delivery.
	             * `currency` (string) - the code of the currency for the totals.
	             * `fee` (string) - the total fees for the delivery.
	             * `tax` (string) - the total taxes for the delivery.
	             * `grand` (string) - the grand total of the delivery.
	         - `description` (object) - the descriptions for the delivery.
	             * `long` (string) - the long description.
	             * `short` (string) - the short description.
	         - `restrictions` (array) - the delivery restrictions.
	             + `{array item object}` - the restrictions reference.
	                 * `id` (string) - the product id.
	                 * `type` (string) - '_*-restriction_'.
	     * `relationships` (object) - the relationships of the delivery. 
	         + `deliveryOptions` (object) - container for deliveryOption relationships.
	             + `data` (array) - container for deliveryOption relationships.
	                 - `{array item object}` - deliveryOption reference.
	                      * `id` (string) - the deliveryOption id.
	                      * `type` (string) - 'deliveryOptions'.
- `_embedded` (object) - container for included (embedded) data.
    * `deliveryOptions` (object) - container for included deliveryOptions data.
        + `data` (array)
            - `{array item object}` - a deliveryOption.
                * `id` (string) - the deliveryOption id.
                * `type` (string) - '_deliveryOption_'.
                * `attributes` (object) - deliveryOption attributes.
                    * `requiresAddress` (boolean) - true/false.
                    * `requiresIdentification` (boolean) - true/false.
                    - `description` (object) - the descriptions for the deliveryOption.
						            * `long` (string) - the long description.
						            * `short` (string) - the short description.
				   		      - `excludedCountries` (array)
						            + `{array item object}` - an excludedCountry.
				                    * `id` (string) - the excludedCountry id.
				                    * `type` (string) - '_accepted-delivery-country_'.
				                    * `attributes` (object) - excludedCountry attributes.
				             	          * `country` (string) - the country abbreviation.  		

{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/commerce/v2/checkout/carts/{cartId}/deliveries.json?{apikey}",
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
--include 'https://app.ticketmaster.com/commerce/v2/checkout/carts/{cartId}/deliveries.json?{apikey}
{% endhighlight %}


{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /commerce/v2/checkout/carts/{cartId}/deliveries.json?{apikey} HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive

{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Rate-Limit-Over:
0
Content-Length:
21532
Rate-Limit-Available:
498399
Set-Cookie:
CMPS=EB55hDR95pURN1HyCaJoxuyEQcA8Sv2aKm4J/YaMBOYTHywQO/XHcWL6t8TWHLkL; path=/
Access-Control-Allow-Methods:
POST, PATCH, DELETE, GET, HEAD, OPTIONS
X-TM-SESSION-BID:
commerce-checkout
Connection:
keep-alive
Access-Control-Allow-Credentials:
true
Server:
Apache-Coyote/1.1
Rate-Limit-Reset:
1468530242515
Access-Control-Allow-Headers:
Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers
Date:
Thu, 14 Jul 2016 18:15:12 GMT
Access-Control-Allow-Origin:
*
X-TM-SESSION-SID:
49D8E7AAEF70BE318E4CEB599C499675
X-Application-Context:
commerce-api-commerce-checkout-v1:default,jash1:8080
Content-Type:
application/json;charset=UTF-8
Rate-Limit:
500000

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

## Select Deliveries
{: .article .console-link #select-deliveries}

**Method:** PATCH
Authentication required.

This operation allows users to add deliveries to a cart.

This operation supports the following add deliveries to cart requests:
{: .nested-list}
* all items in a cart.
* all items in a reservation.
* all items in a specified set of inventory item groups.
* a set of specified inventory items.

This operation returns the updated cart including delivery information.

commerce/{version}/shopping/carts/{cartId}/deliveries.{format}
{: .code .red}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v2"         | Yes      |
| `cartId`   | Cart ID. Required.   | string            | "c5d3fb70-f7cb-489d-823d-8103222f0c17.jash1" | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |


### Request body structure:

{: .nested-list }
* `deliveries` (array) - **Required (at least one)** - container of add delivery requests.
    + `{array item object}` - an add delivery request.
        - `deliveryId` (string) - **Required** - the deliveryId.
        - `op` (string) - **Required** - operation to be performed (add, remove).
        - `selectedItems` (object) - _Optional_ - object representing selected delivery items to be added to the cart.
          + `reservations` (array) - array of reservation ids.

### Response structure:

{: .nested-list }
- `cart` (object) - the cart
    * `id` (string) - the cart id.
    * `type` (string) - '_carts_'.
    * `attributes` (object) - the attributes of the cart.
        + `reservations` (array) - container of reservations.
            + `{array item object}` - reservation.
        + `fees` (array) - container of order level fees.
            + `{array item object}` - order level fee.
        + `taxes` (array) - container of order level taxes.
            + `{array item object}` - order level tax.
        + `totals` (object) - the total amounts for the cart.
            + `currency` (string) - the code of the currency for the totals.
            + `price` (string) - the total price of items in the cart.
            + `fees` (string) - the total fees for the cart.
            + `taxes` (string) - the total taxes for the cart.
            + `total` (string) - the grand total of the cart.
        + `deliveries` (object) - the list of deliveries added to the cart.
            + `data` (array)
                - `{array item object}` - an delivery added to the cart.
                    + `id` (string) - the delivery Id.
                    + `deliveryType` (string) - the the delivery type.
                    + `totals` (string) - the total delivery costs.
                        + `currency` (string) - the code of the currency for the totals.
                        + `price` (string) - the total price of the delivery.
                        + `fees` (string) - the total fees of the delivery.
                        + `taxes` (string) - the total taxes of the delivery.
                        + `total` (string) - the grand total of the delivery.
                    + `reservation` (array) - the reservation ids.
    * `relationships` (object) - the relationships of the cart.
        + `events` (object) - container for event relationships.
            + `data` (array) - container for event relationships.
                + `{array item object}` - event reference.
                    + `id` (string) - the event id.
                    + `type` (string) - '_events_'.
        + `products` (object) - container for product relationships.
            + `data` (array) - container for product relationships.
                + `{array item object}` - the product reference.
                    + `id` (string) - the product id.
                    + `type` (string) - '_products_'.
        + `offers` (object) - container for offer relationships.
            + `data` (array) - container for offer relationships.
                + `{array item object}` - the offer reference.
                    + `id` (string) - the offer id.
                    + `type` (string) - '_offers_'.
- `_embedded` (object) - container for included (embedded) data.
    * `events` (object) - container for included events data.
        + `data` (array)
            - `{array item object}` - an event.
                * `id` (string) - the event id.
                * `type` (string) - '_events'.
                * `attributes` (object) - event attributes.
                    - `name` (string) - the event name.
                * `relationships` (object) - event relationships.
                    - `products` (object) - container for event-product relationships.
                        * `data` (array)
                            + `{array item object}` - product reference.
                                - `id` (string) - the product id.
                                - `type` (string) - '_products_'.
                    - `offers` (object) - container for event-offer relationships.
                        * `data` (array)
                            + `{array item object}` - offer refernece.
                                - `id` (string) - the offer id.
                                - `type` (string) - '_offers_'.
    * `products` (object) - container for included products data.
        + `data` (array)
            - `{array item object}` - a product.
                * `id` (string) - the product id.
                * `type` (string) - '_products_'.
                * `attributes` (object) - the product attributes.
                * `relationships` (object) - product relationships.
                    - `offers` (object) - container for product-offer relationships.
                        * `data` (array)
                            + `{array item object}` - offer reference.
                                - `id` (string) - the offer id.
                                - `type` (string) - '_offers_'.
                    - `events` (object) - container for product-event relationships.
                        * `data` (array)
                            + `{array item object}` - the event reference.
                                - `id` (string) - the event id.
                                - `type` (string) - '_events_'.
    * `offers` (object) - container for included offers data.
        + `data` (array)
            - `{array item object}` - an offer.
                * `id` (string) - the offer id.
                * `type` (string) - '_offers_'.
                * `attributes` (object) - the offer attributes.
                    + `name` (string) - the offer name.
                    + `description` (string) - the offer description.
                * `relationships` (object) - the offer relationships.
                    + `products` (object) - container for offer-product relationships.
                        * `data` (array)
                            + `{array item object}` - product reference.
                                - `id` (string) - the product id.
                                - `type` (string) - '_products_'.
                    + `events` (object) - container for offer-event relationships.
                        * `data` (array)
                            + `{array item object}` - event reference.
                                - `id` (string) - the event id.
                                - `type` (string) - '_events_'.
    * `deliveries` (object) - container for included deliveries data.
        + `data` (array)
            - `{array item object}` - an offer.
                * `id` (string) - the delivery id.
                * `type` (string) - 'delivery'.
                * `attributes` (object) - the delivery attributes.
                    + `displayRank` (string) - the display rank.
                    + `icon` (string) - the icon URL.
                    + `description` (string) - the delivery description.
                        - `short` (string) - the short description.
                        - `long` (string) - the long description.
                * `relationships` (object) - the offer relationships.
                    + `reservations` (object) - container for delivery-reservation relationships.
                        * `data` (array)
                            + `{array item object}` - reservation reference.
                                - `id` (string) - the reservation id.
                                - `type` (string) - 'reservation'.
- `status` (string) - the Http status code for the response.

{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"PATCH",
  url:"https://app.ticketmaster.com/commerce/v2/shopping/carts/{cartid}/deliveries.json?{apikey}",
  async:true,
  data: {
          "pollingCallbackUrl" : "http://requestb.in/14hknvt1",
          "deliveries":[{
              "deliveryId" : "ad20f8bc3e69a6c7a340c711731f2342",
              "op":"add"
          	}
          ]
        },
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
--include 'https://app.ticketmaster.com/commerce/v2/shopping/carts/{cartid}/deliveries.json?{apikey} -X PATCH -d '{"pollingCallbackUrl" : "http://requestb.in/14hknvt1","deliveries":[{"deliveryId" : "ad20f8bc3e69a6c7a340c711731f2342","op":"add"}]}'
{% endhighlight %}


{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
PATCH /commerce/v2/shopping/carts/{cartid}/deliveries.json?{apikey} HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive

{
  "pollingCallbackUrl" : "http://requestb.in/14hknvt1",
  "deliveries":[{
      "deliveryId" : "ad20f8bc3e69a6c7a340c711731f2342",
      "op":"add"
    }
  ]
}
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Rate-Limit-Over:
0
Content-Length:
21532
Rate-Limit-Available:
498399
Set-Cookie:
CMPS=EB55hDR95pURN1HyCaJoxuyEQcA8Sv2aKm4J/YaMBOYTHywQO/XHcWL6t8TWHLkL; path=/
Access-Control-Allow-Methods:
POST, PATCH, DELETE, GET, HEAD, OPTIONS
X-TM-SESSION-BID:
commerce-shopping
Connection:
keep-alive
Access-Control-Allow-Credentials:
true
Server:
Apache-Coyote/1.1
Rate-Limit-Reset:
1468530242515
Access-Control-Allow-Headers:
Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers
Date:
Thu, 14 Jul 2016 18:15:12 GMT
Access-Control-Allow-Origin:
*
X-TM-SESSION-SID:
49D8E7AAEF70BE318E4CEB599C499675
X-Application-Context:
commerce-api-commerce-shopping-v1:default,jash1:8080
Content-Type:
application/json;charset=UTF-8
Rate-Limit:
500000

{
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
    }
  },
  "status": "200"
}
{% endhighlight %}

## Select Payments
{: .article .console-link #select-payments}

**Method:** PATCH
Authentication required.

This operation allows users to add one or more payments to a cart.

This operation returns a cart with the selected payment(s).

commerce/{version}/shopping/carts/{cartId}/payments.{format}
{: .code .red}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v2"         | Yes      |
| `cartId`   | Cart ID. Required.   | string            | "c5d3fb70-f7cb-489d-823d-8103222f0c17.jash1" | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |


### Request body structure:

{: .nested-list }
* `pollingCallbackUrl` (string) - **Required** - client webhook URI where response will be posted if the operation polls.
* `payments` (array) - **Required (at least one)** - container of add payment requests.
    + `{array item object}` - an add payment request.
        - `type` (string) - **Required** - the payment type.  valid values - _cash_, _wallet_.
        - `amount` (object) - **Required** - the payment amount object.
            * `amount` (string) - **Required** - the payment amount.
            * `currency` (string) - **Required** - the payment currency.
        - `op` (string) - **Required** - operation to be performed (add, remove).
        - `token` (string) - _**Required when wallet payment**_ - the wallet token.
        - `cvv` (string) - _**Required when wallet payment**_ - the cvv associated with wallet.
        - `selectedItems` (object) - _Optional_ - object representing selected items to which this payment applies.
            * `{array item object}` - a selected payment item.
                + `reservations` (array) - **Required** - list of the reservation ids.

### Response structure:

Same as the [Get Cart API](#get-cart).

{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"PATCH",
  url:"https://app.ticketmaster.com/commerce/v2/shopping/carts/{cartid}/payments.json?{apikey}",
  async:true,
  data: {
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
        },
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
--include 'https://app.ticketmaster.com/commerce/v2/shopping/carts/{cartid}/payments.json?{apikey} -X PATCH -d '{"pollingCallbackUrl" : "http://requestb.in/14hknvt1","payments":[{"type":"wallet","op":"add","token":"encryptedWalletToken1","cvv":"123","amount":{"amount":"19.00","currency":"USD"}},{"type":"cash","amount":{"amount":"19.00","currency":"USD"}}]}'
{% endhighlight %}


{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

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
Rate-Limit-Over:
0
Content-Length:
21532
Rate-Limit-Available:
498399
Set-Cookie:
CMPS=EB55hDR95pURN1HyCaJoxuyEQcA8Sv2aKm4J/YaMBOYTHywQO/XHcWL6t8TWHLkL; path=/
Access-Control-Allow-Methods:
POST, PATCH, DELETE, GET, HEAD, OPTIONS
X-TM-SESSION-BID:
commerce-shopping
Connection:
keep-alive
Access-Control-Allow-Credentials:
true
Server:
Apache-Coyote/1.1
Rate-Limit-Reset:
1468530242515
Access-Control-Allow-Headers:
Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers
Date:
Thu, 14 Jul 2016 18:15:12 GMT
Access-Control-Allow-Origin:
*
X-TM-SESSION-SID:
49D8E7AAEF70BE318E4CEB599C499675
X-Application-Context:
commerce-api-commerce-shopping-v1:default,jash1:8080
Content-Type:
application/json;charset=UTF-8
Rate-Limit:
500000

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
             "relationships":{
    
             }
           },
           {
             "id":"cashPaymentId",
             "type":"cash_payments",
             "attributes":{
             },
             "relationships":{
    
             }
           }
         ]
       }
     }
  },
  "status": "200"
}

{% endhighlight %}

## Get Payments 
{: .article .console-link #get-payments}

**Method:** GET
Authentication required.

This operation returns available payment options

commerce/{version}/checkout/carts/{cartId}/payments.{format}
{: .code .red}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v2"         | Yes      |
| `cartId`   | Cart ID. Required.   | string            | "c5d3fb70-f7cb-489d-823d-8103222f0c17.jash1" | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |


### Response structure:

{: .nested-list }
+ `paymentOptions` (array) - payment options
    - `{array item object}` - payment.
        * `id` (string) - payment option id.
        * `type` (string) - payment type.
        * `attributes` (object) - the attributes of the payment options.
            + `paymentType` (string) - payment type.
            + `iconUrl` (string) - icon url for payment option.
            + `securityCodeLength` (string) - length of security code (e.g. CVV for credit cards).
            + `instrumentLength` (string) - length of instrument number (e.g. credit card number).
            + `securityCodeRequired` (boolean) - is security code required.
            + `displayName` (string) - human readable name of the of the payment option.
            + `displayRank` (string) - display rank.
            + `restrictions` (array)
                - `{array item object}` - restriction
                    * `type` (string) - type of restriction
                    * `id` (string) - id
                    * `offers` (array) - _Optional_ list of offer ids to be restricted

{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/commerce/v2/checkout/carts/{cartid}/payments.json?{apikey}",
  async:true,
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
--include 'https://app.ticketmaster.com/commerce/v2/checkout/carts/{cartid}/payments.json?{apikey}
{% endhighlight %}


{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /commerce/v2/checkout/carts/{cartid}/payments.json?{apikey} HTTP/1.1
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
        "securityCodeRequired": true,
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
  ]
}

{% endhighlight %}

## Get Options
{: .article .console-link #get-options}

**Method:** GET
Authentication required.

This operation returns available payment options plus information about deliveries

commerce/{version}/checkout/carts/{cartId}/options.{format}
{: .code .red}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v2"         | Yes      |
| `cartId`   | Cart ID. Required.   | string            | "c5d3fb70-f7cb-489d-823d-8103222f0c17.jash1" | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |


### Response structure:

{: .nested-list }
+ `paymentOptions` (array) - payment options
    - `{array item object}` - payment.
        * `id` (string) - payment option id.
        * `type` (string) - payment type.
        * `attributes` (object) - the attributes of the payment options.
            + `paymentType` (string) - payment type.
            + `iconUrl` (string) - icon url for payment option.
            + `securityCodeLength` (string) - length of security code (e.g. CVV for credit cards).
            + `instrumentLength` (string) - length of instrument number (e.g. credit card number).
            + `securityCodeRequired` (boolean) - is security code required.
            + `displayName` (string) - human readable name of the of the payment option.
            + `displayRank` (string) - display rank.
            + `restrictions` (array)
                - `{array item object}` - restriction
                    * `type` (string) - type of restriction
                    * `id` (string) - id
                    * `offers` (array) - _Optional_ list of offer ids to be restricted
+ `deliveries` (array) - the deliveries
	 - `{array item object}` - the delivery reference.
	     * `id` (string) - the delivery id.
	     * `type` (string) - '_delivery_'.
	     * `attributes` (object) - the attributes of the delivery.
	         * `deliveryType` (string) - the delivery type.
	         * `displayRank` (string) - the display rank.
	         - `totals` (object) - the total amounts for the delivery.
	             * `currency` (string) - the code of the currency for the totals.
	             * `fee` (string) - the total fees for the delivery.
	             * `tax` (string) - the total taxes for the delivery.
	             * `grand` (string) - the grand total of the delivery.
	         - `description` (object) - the descriptions for the delivery.
	             * `long` (string) - the long description.
	             * `short` (string) - the short description.
	         - `restrictions` (array) - the delivery restrictions.
	             + `{array item object}` - the restrictions reference.
	                 * `id` (string) - the product id.
	                 * `type` (string) - '_*-restriction_'.
	     * `relationships` (object) - the relationships of the delivery. 
	         + `deliveryOptions` (object) - container for deliveryOption relationships.
	             + `data` (array) - container for deliveryOption relationships.
	                 - `{array item object}` - deliveryOption reference.
	                      * `id` (string) - the deliveryOption id.
	                      * `type` (string) - 'deliveryOptions'.
- `_embedded` (object) - container for included (embedded) data.
    * `deliveryOptions` (object) - container for included deliveryOptions data.
        + `data` (array)
            - `{array item object}` - a deliveryOption.
                * `id` (string) - the deliveryOption id.
                * `type` (string) - '_deliveryOption_'.
                * `attributes` (object) - deliveryOption attributes.
                    * `requiresAddress` (boolean) - true/false.
                    * `requiresIdentification` (boolean) - true/false.
                    - `description` (object) - the descriptions for the deliveryOption.
						            * `long` (string) - the long description.
						            * `short` (string) - the short description.
				   		      - `excludedCountries` (array)
						            + `{array item object}` - an excludedCountry.
				                    * `id` (string) - the excludedCountry id.
				                    * `type` (string) - '_accepted-delivery-country_'.
				                    * `attributes` (object) - excludedCountry attributes.
				             	          * `country` (string) - the country abbreviation. 

{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/commerce/v2/checkout/carts/{cartid}/options.json?{apikey}",
  async:true,
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
--include 'https://app.ticketmaster.com/commerce/v2/checkout/carts/{cartid}/options.json?{apikey}
{% endhighlight %}


{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

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

## Purchase
{: .article .console-link #purchase}

**Method:** POST.
Authentication required.

This operation allows users to complete cart purchase.

This operation returns an order confirmation response.

commerce/{version}/shopping/carts/{cartId}/purchase.{format}
{: .code .red}

### URL parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v2"         | Yes      |
| `cartId`   | Cart ID. Required.   | string            | "c5d3fb70-f7cb-489d-823d-8103222f0c17.jash1" | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |

### Request body structure:

{: .nested-list }
* `pollingCallbackUrl` (string) - **Required** - client webhook URI where response will be posted if the operation polls.

### Response structure:

{: .nested-list }
- `confirmation` (object) - the order confirmation response
    * `id` (string) - the order confirmation id.
    * `type` (string) - '_order-confirmations_'.
    * `relationships` (object) - the relationships of the order confirmation.
        + `orders` (object) - container for orders relationships.
            + `data` (array) - container for orders relationships.
                + `{array item object}` - order reference.
                    + `id` (string) - the order id.
                    + `type` (string) - '_orders_'.
- `_embedded` (object) - container for included (embedded) data.
    * `orders` (object) - container for included orders data.
        + `data` (array)
            - `{array item object}` - an order.
                * `id` (string) - the order id.
                * `type` (string) - '_orders_'.
                * `metadata` (object) - order metadata.
                    - `type` (string) - '_order-meta_'.
                    - `providerId` (string) - the provider id. (e.q. "host")
 
{: .aside}
>[JavaScript](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"POST",
  url:"https://app.ticketmaster.com/commerce/v2/shopping/carts/{cartId}/purchase.json?{apikey}",
  async:true,
  data: {
          "pollingCallbackUrl" : "http://requestb.in/14hknvt1"
        },
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
--include 'https://app.ticketmaster.com/commerce/v2/shopping/carts/{cartId}/purchase.json?{apikey} -X POST -d '{"pollingCallbackUrl" : "http://requestb.in/14hknvt1"}'
{% endhighlight %}


{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
POST /commerce/v2/shopping/carts/{cartId}/purchase.json?{apikey} HTTP/1.1
Host: app.ticketmaster.com
X-Target-URI: https://app.ticketmaster.com
Connection: Keep-Alive

{
          "pollingCallbackUrl" : "http://requestb.in/14hknvt1"
}
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Rate-Limit-Over:
0
Content-Length:
21532
Rate-Limit-Available:
498399
Set-Cookie:
CMPS=EB55hDR95pURN1HyCaJoxuyEQcA8Sv2aKm4J/YaMBOYTHywQO/XHcWL6t8TWHLkL; path=/
Access-Control-Allow-Methods:
POST, PATCH, DELETE, GET, HEAD, OPTIONS
X-TM-SESSION-BID:
commerce-shopping
Connection:
keep-alive
Access-Control-Allow-Credentials:
true
Server:
Apache-Coyote/1.1
Rate-Limit-Reset:
1468530242515
Access-Control-Allow-Headers:
Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers
Date:
Thu, 14 Jul 2016 18:15:12 GMT
Access-Control-Allow-Origin:
*
X-TM-SESSION-SID:
49D8E7AAEF70BE318E4CEB599C499675
X-Application-Context:
commerce-api-commerce-shopping-v1:default,jash1:8080
Content-Type:
application/json;charset=UTF-8
Rate-Limit:
500000
{
  "confirmation": {
    "id": "7526469c-a70f-4be0-88c9-5b3c06bcc199",
    "type": "order-confirmations",
    "relationships": {
      "orders": {
        "data": [
          {
            "id": "5-56255/PHX",
            "type": "orders"
          }
        ]
      }
    }
  },
  "_embedded": {
    "orders": {
      "data": [
        {
          "id": "5-56255/PHX",
          "type": "orders",
          "metadata": {
            "type": "order-meta",
            "providerId": "host"
          }
        }
      ]
    }
  },
  "status": "200"
}
{% endhighlight %}
