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
