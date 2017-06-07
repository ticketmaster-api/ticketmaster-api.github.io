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
