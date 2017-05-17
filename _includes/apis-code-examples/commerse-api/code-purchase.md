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
