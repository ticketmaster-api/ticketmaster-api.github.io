---
layout: documentation
id: com1
categories:
- documentation
- commerce
---

#Commerce REST API
{: .article}

Use the Ticketmaster Commerce API to reserve tickets, purchase, and retreive barcode and ticket information. Ticket inventory for each event must be established beforehand with Ticketmaster, venues, and ticketing partners. Only this held inventory will be made available through the API. All events are U.S. only.
{: .article .lead}

####Developer Console
{: .aside .gray}

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
curl https://app.ticketmaster.com/commerce/v2/events/05004F24E0B864B3/offers.json?apikey={apikey}
{% endhighlight %}

<div class="article iframe-wrapper">
<iframe src="https://snap.apigee.com/1lhYRmB" class="" frameborder="0" scrolling="no"></iframe>
</div>

---
{: .aside}