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
