---
layout: documentation
id: com1
categories:
- documentation
- commerce
---

#Commerse REST API
{: .article}

Use the Ticketmaster Commerce API to reserve tickets, purchase, and retreive barcode and ticket information. Ticket inventory for each event must be established beforehand with Ticketmaster, venues, and ticketing partners. Only this held inventory will be made available through the API. All events are U.S. only.
{: .article .lead}

###Developer Console
{: .aside}

Test this endpoint right now in the interactive docs:

[INTERACTIVE DOCS](/products-and-docs/apis/interactive-console/){: .button}

##Event Offers
{: .article}

Method: GET. 
Authentication required.
Returns Event Offers.

commerce/{version}/events/{id}/offers.{format}
{: .pull-quote}

###Template parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v2"         | Yes      |
| `id`       | Event ID. Required.  | string            | "05004F24E0B864B3" | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |

{: .aside}
>[JS](#js)
>[CURL](#curl)
{: .lang-selector}

{% highlight js %}
var request = $.ajax({
  url: "https://app.ticketmaster.com/commerce/v2/events/05004F24E0B864B3/offers.json?apikey={apikey}",
  method: "GET"
});
request.done(function( msg ) {
  console.log( msg );
});
request.fail(function( jqXHR, textStatus ) {
  console.log("Request failed: " + textStatus);
});
{% endhighlight %}

{% highlight bash %}
curl https://app.ticketmaster.com/commerce/v2/events/05004F24E0B864B3/offers.json?apikey={apikey}
{% endhighlight %}


<iframe src="https://snap.apigee.com/1lhYRmB" class="article" frameborder="0" scrolling="no"></iframe>

---
{: .aside}