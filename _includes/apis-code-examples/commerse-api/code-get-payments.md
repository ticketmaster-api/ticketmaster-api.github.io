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
