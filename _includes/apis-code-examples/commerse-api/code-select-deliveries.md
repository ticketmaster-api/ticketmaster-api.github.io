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
