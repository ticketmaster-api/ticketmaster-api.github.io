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

