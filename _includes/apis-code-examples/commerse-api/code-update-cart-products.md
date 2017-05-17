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

