{% highlight js %}
$.ajax({
  type:"PATCH",
  url:"https://app.ticketmaster.com/commerce/v2/shopping/carts/{cartid}/payments.json?{apikey}",
  async:true,
  data: {
         "pollingCallbackUrl" : "http://requestb.in/14hknvt1",
         "payments":[
           {
             "type":"wallet",
             "op":"add",
             "token":"encryptedWalletToken1",
             "cvv":"123",
             "amount":{
               "amount":"19.00",
               "currency":"USD"
             }
           },
           {
             "type":"cash",
             "amount":{
               "amount":"19.00",
               "currency":"USD"
             }
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
--include 'https://app.ticketmaster.com/commerce/v2/shopping/carts/{cartid}/payments.json?{apikey} -X PATCH -d '{"pollingCallbackUrl" : "http://requestb.in/14hknvt1","payments":[{"type":"wallet","op":"add","token":"encryptedWalletToken1","cvv":"123","amount":{"amount":"19.00","currency":"USD"}},{"type":"cash","amount":{"amount":"19.00","currency":"USD"}}]}'
{% endhighlight %}
