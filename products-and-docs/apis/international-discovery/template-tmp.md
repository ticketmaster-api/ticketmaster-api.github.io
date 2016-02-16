---
layout: documentation
categories:
- documentation
- international-discovery
---

{: .aside}
>[JS](#js)
>[cURL](#curl)
>[Java](#java)
>[Node.js](#node)
>[Perl](#perl)
>[Python](#python)
>[PHP](#php)
>[Ruby](#ruby)
>[Go](#go)
>[C#](#c-sharp)
>[Visual Basic](#visual-basic)
>[Groovy](#groovy)
>[Objective-C](#objective-c)
>[Swift](#swift)
{: .lang-selector}

{% highlight js %}
var request = new XMLHttpRequest();

request.open('GET', 'https://app.ticketmaster.eu/mfxapi/v1/events?domain_ids&lang&attraction_ids&category_ids&subcategory_ids&event_ids&event_name&venue_ids&city_ids&country_ids&postal_code&lat&long&radius&eventdate_to&eventdate_from&onsaledate_to&onsaledate_from&offsaledate_to&offsaledate_from&min_price&max_price&price_excl_fees&is_seats_available&is_not_cancelled&&is_not_package&sort_by&order&rows&start&include_external_events');

request.setRequestHeader('Accept', 'application/json');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

request.send();
{% endhighlight %}

{% highlight java %}
curl --include \
     --header "Accept: application/json" \
  'https://app.ticketmaster.eu/mfxapi/v1/events?domain_ids&lang&attraction_ids&category_ids&subcategory_ids&event_ids&event_name&venue_ids&city_ids&country_ids&postal_code&lat&long&radius&eventdate_to&eventdate_from&onsaledate_to&onsaledate_from&offsaledate_to&offsaledate_from&min_price&max_price&price_excl_fees&is_seats_available&is_not_cancelled&&is_not_package&sort_by&order&rows&start&include_external_events'
{% endhighlight %}

{::comment}java{:/comment}
{% highlight bash %}
// Maven : Add these dependecies to your pom.xml (java6+)
// <dependency>
//     <groupId>org.glassfish.jersey.core</groupId>
//     <artifactId>jersey-client</artifactId>
//     <version>2.8</version>
// </dependency>
// <dependency>
//     <groupId>org.glassfish.jersey.media</groupId>
//     <artifactId>jersey-media-json-jackson</artifactId>
//     <version>2.8</version>
// </dependency>

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.MediaType;

Client client = ClientBuilder.newClient();
Response response = client.target("https://private-anon-ebc054a4b-ticketmasterdiscoveryapi.apiary-mock.com/mfxapi/v1/events?domain_ids&#38;lang&#38;attraction_ids&#38;category_ids&#38;subcategory_ids&#38;event_ids&#38;event_name&#38;venue_ids&#38;city_ids&#38;country_ids&#38;postal_code&#38;lat&#38;long&#38;radius&#38;eventdate_to&#38;eventdate_from&#38;onsaledate_to&#38;onsaledate_from&#38;offsaledate_to&#38;offsaledate_from&#38;min_price&#38;max_price&#38;price_excl_fees&#38;is_seats_available&#38;is_not_cancelled&#38;&#38;is_not_package&#38;sort_by&#38;order&#38;rows&#38;start&#38;include_external_events")
  .request(MediaType.TEXT_PLAIN_TYPE)
  .header("Accept", "application/json")
  .get();

System.out.println("status: " + response.getStatus());
System.out.println("headers: " + response.getHeaders());
System.out.println("body:" + response.readEntity(String.class));
{% endhighlight %}


{::comment}node{:/comment}
{% highlight js %}
var request = require('request');

request({
  method: 'GET',
  url: 'https://private-anon-ebc054a4b-ticketmasterdiscoveryapi.apiary-mock.com/mfxapi/v1/events?domain_ids&lang&attraction_ids&category_ids&subcategory_ids&event_ids&event_name&venue_ids&city_ids&country_ids&postal_code&lat&long&radius&eventdate_to&eventdate_from&onsaledate_to&onsaledate_from&offsaledate_to&offsaledate_from&min_price&max_price&price_excl_fees&is_seats_available&is_not_cancelled&&is_not_package&sort_by&order&rows&start&include_external_events',
  headers: {
    'Accept': 'application/json'
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
{% endhighlight %}


{::comment}perl{:/comment}
{% highlight perl %}
require LWP::UserAgent;

my $ua   = LWP::UserAgent->new;

$ua->default_header("Accept" => "application/json");

my $response = $ua->get("https://private-anon-ebc054a4b-ticketmasterdiscoveryapi.apiary-mock.com/mfxapi/v1/events?domain_ids&lang&attraction_ids&category_ids&subcategory_ids&event_ids&event_name&venue_ids&city_ids&country_ids&postal_code&lat&long&radius&eventdate_to&eventdate_from&onsaledate_to&onsaledate_from&offsaledate_to&offsaledate_from&min_price&max_price&price_excl_fees&is_seats_available&is_not_cancelled&&is_not_package&sort_by&order&rows&start&include_external_events");

print $response->as_string;
{% endhighlight %}

{::comment}python{:/comment}
{% highlight python %}
from urllib2 import Request, urlopen

headers = {
  'Accept': 'application/json'
}
request = Request('https://private-anon-ebc054a4b-ticketmasterdiscoveryapi.apiary-mock.com/mfxapi/v1/events?domain_ids&lang&attraction_ids&category_ids&subcategory_ids&event_ids&event_name&venue_ids&city_ids&country_ids&postal_code&lat&long&radius&eventdate_to&eventdate_from&onsaledate_to&onsaledate_from&offsaledate_to&offsaledate_from&min_price&max_price&price_excl_fees&is_seats_available&is_not_cancelled&&is_not_package&sort_by&order&rows&start&include_external_events', headers=headers)

response_body = urlopen(request).read()
print response_body
{% endhighlight %}

{::comment}php{:/comment}
{% highlight php %}
<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://private-anon-ebc054a4b-ticketmasterdiscoveryapi.apiary-mock.com/mfxapi/v1/events?domain_ids&lang&attraction_ids&category_ids&subcategory_ids&event_ids&event_name&venue_ids&city_ids&country_ids&postal_code&lat&long&radius&eventdate_to&eventdate_from&onsaledate_to&onsaledate_from&offsaledate_to&offsaledate_from&min_price&max_price&price_excl_fees&is_seats_available&is_not_cancelled&&is_not_package&sort_by&order&rows&start&include_external_events");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Accept: application/json"
));

$response = curl_exec($ch);
curl_close($ch);

var_dump($response);
{% endhighlight %}


{::comment}ruby{:/comment}
{% highlight ruby %}
require 'rubygems' if RUBY_VERSION < '1.9'
require 'rest_client'

headers = {
  :accept => 'application/json'
}

response = RestClient.get 'https://private-anon-ebc054a4b-ticketmasterdiscoveryapi.apiary-mock.com/mfxapi/v1/events?domain_ids&lang&attraction_ids&category_ids&subcategory_ids&event_ids&event_name&venue_ids&city_ids&country_ids&postal_code&lat&long&radius&eventdate_to&eventdate_from&onsaledate_to&onsaledate_from&offsaledate_to&offsaledate_from&min_price&max_price&price_excl_fees&is_seats_available&is_not_cancelled&&is_not_package&sort_by&order&rows&start&include_external_events', headers
puts response
{% endhighlight %}


{::comment}go(not supported){:/comment}
{% highlight java %}
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	client := &http.Client{}

	req, _ := http.NewRequest("GET", "https://private-anon-ebc054a4b-ticketmasterdiscoveryapi.apiary-mock.com/mfxapi/v1/events?domain_ids&lang&attraction_ids&category_ids&subcategory_ids&event_ids&event_name&venue_ids&city_ids&country_ids&postal_code&lat&long&radius&eventdate_to&eventdate_from&onsaledate_to&onsaledate_from&offsaledate_to&offsaledate_from&min_price&max_price&price_excl_fees&is_seats_available&is_not_cancelled&&is_not_package&sort_by&order&rows&start&include_external_events", nil)

	req.Header.Add("Accept", "application/json")

	resp, err := client.Do(req)

	if err != nil {
		fmt.Println("Errored when sending request to the server")
		return
	}

	defer resp.Body.Close()
	resp_body, _ := ioutil.ReadAll(resp.Body)

	fmt.Println(resp.Status)
	fmt.Println(string(resp_body))
}
{% endhighlight %}


{::comment}c-sharp{:/comment}
{% highlight c %}
//Common testing requirement. If you are consuming an API in a sandbox/test region, uncomment this line of code ONLY for non production uses.
//System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };

//Be sure to run "Install-Package Microsoft.Net.Http" from your nuget command line.
using System;
using System.Net.Http;

var baseAddress = new Uri("https://private-anon-ebc054a4b-ticketmasterdiscoveryapi.apiary-mock.com/mfxapi/v1/");

using (var httpClient = new HttpClient{ BaseAddress = baseAddress })
{

  httpClient.DefaultRequestHeaders.TryAddWithoutValidation("accept", "application/json");
  
  using(var response = await httpClient.GetAsync("events?domain_ids&lang&attraction_ids&category_ids&subcategory_ids&event_ids&event_name&venue_ids&city_ids&country_ids&postal_code&lat&long&radius&eventdate_to&eventdate_from&onsaledate_to&onsaledate_from&offsaledate_to&offsaledate_from&min_price&max_price&price_excl_fees&is_seats_available&is_not_cancelled&&is_not_package&sort_by&order&rows&start&include_external_events"))
  {
 
        string responseData = await response.Content.ReadAsStringAsync();
  }
}
{% endhighlight %}

{::comment}visual-basic{:/comment}
{% highlight vbnet %}
Dim request = TryCast(System.Net.WebRequest.Create("https://private-anon-ebc054a4b-ticketmasterdiscoveryapi.apiary-mock.com/mfxapi/v1/events?domain_ids&lang&attraction_ids&category_ids&subcategory_ids&event_ids&event_name&venue_ids&city_ids&country_ids&postal_code&lat&long&radius&eventdate_to&eventdate_from&onsaledate_to&onsaledate_from&offsaledate_to&offsaledate_from&min_price&max_price&price_excl_fees&is_seats_available&is_not_cancelled&&is_not_package&sort_by&order&rows&start&include_external_events"), System.Net.HttpWebRequest)

request.Method = "GET"

request.Accept = "application/json"

request.ContentLength = 0
Dim responseContent As String
Using response = TryCast(request.GetResponse(), System.Net.HttpWebResponse)
  Using reader = New System.IO.StreamReader(response.GetResponseStream())
    responseContent = reader.ReadToEnd()
  End Using
End Using
{% endhighlight %}

{::comment}groovy{:/comment}
{% highlight groovy %}
import groovyx.net.http.RESTClient
import static groovyx.net.http.ContentType.JSON
import groovy.json.JsonSlurper
import groovy.json.JsonOutput

@Grab (group = 'org.codehaus.groovy.modules.http-builder', module = 'http-builder', version = '0.5.0')
def client = new RESTClient("https://private-anon-ebc054a4b-ticketmasterdiscoveryapi.apiary-mock.com/mfxapi/v1")

def emptyHeaders = [:]
emptyHeaders."Accept" = "application/json"

response = client.get( path : "/events?domain_ids&lang&attraction_ids&category_ids&subcategory_ids&event_ids&event_name&venue_ids&city_ids&country_ids&postal_code&lat&long&radius&eventdate_to&eventdate_from&onsaledate_to&onsaledate_from&offsaledate_to&offsaledate_from&min_price&max_price&price_excl_fees&is_seats_available&is_not_cancelled&&is_not_package&sort_by&order&rows&start&include_external_events", headers: emptyHeaders )

println("Status:" + response.status)

if (response.data) {
  println("Content Type: " + response.contentType)
  println("Body:\n" + JsonOutput.prettyPrint(JsonOutput.toJson(response.data)))
}
{% endhighlight %}

{::comment}objective-c{:/comment}
{% highlight obj-c++ %}
NSURL *URL = [NSURL URLWithString:@"https://private-anon-ebc054a4b-ticketmasterdiscoveryapi.apiary-mock.com/mfxapi/v1/events?domain_ids&lang&attraction_ids&category_ids&subcategory_ids&event_ids&event_name&venue_ids&city_ids&country_ids&postal_code&lat&long&radius&eventdate_to&eventdate_from&onsaledate_to&onsaledate_from&offsaledate_to&offsaledate_from&min_price&max_price&price_excl_fees&is_seats_available&is_not_cancelled&&is_not_package&sort_by&order&rows&start&include_external_events"];

NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:URL];
[request setHTTPMethod:@"GET"];

[request setValue:@"application/json" forHTTPHeaderField:@"Accept"];

NSURLSession *session = [NSURLSession sharedSession];
NSURLSessionDataTask *task = [session dataTaskWithRequest:request
                                        completionHandler:
                              ^(NSData *data, NSURLResponse *response, NSError *error) {

                                  if (error) {
                                      // Handle error...
                                      return;
                                  }

                                  if ([response isKindOfClass:[NSHTTPURLResponse class]]) {
                                      NSLog(@"Response HTTP Status code: %ld\n", (long)[(NSHTTPURLResponse *)response statusCode]);
                                      NSLog(@"Response HTTP Headers:\n%@\n", [(NSHTTPURLResponse *)response allHeaderFields]);
                                  }

                                  NSString* body = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
                                  NSLog(@"Response Body:\n%@\n", body);
                              }];
[task resume];
{% endhighlight %}

{::comment}swift{:/comment}
{% highlight swift %}
// NOTE: Uncommment following two lines for use in a Playground
// import XCPlayground
// XCPlaygroundPage.currentPage.needsIndefiniteExecution = true

let url = NSURL(string: "https://private-anon-ebc054a4b-ticketmasterdiscoveryapi.apiary-mock.com/mfxapi/v1/events?domain_ids&lang&attraction_ids&category_ids&subcategory_ids&event_ids&event_name&venue_ids&city_ids&country_ids&postal_code&lat&long&radius&eventdate_to&eventdate_from&onsaledate_to&onsaledate_from&offsaledate_to&offsaledate_from&min_price&max_price&price_excl_fees&is_seats_available&is_not_cancelled&&is_not_package&sort_by&order&rows&start&include_external_events")!
let request = NSMutableURLRequest(URL: url)
request.addValue("application/json", forHTTPHeaderField: "Accept")

let session = NSURLSession.sharedSession()
let task = session.dataTaskWithRequest(request) { data, response, error in
    if let response = response, data = data {
        print(response)
        print(String(data: data, encoding: NSUTF8StringEncoding))
    } else {
        print(error)
    }
}

task.resume()
{% endhighlight %}


<!--  template  -->
<!--  template  -->
<!--  template  -->

>[cURL](#curl)
>[JS](#js)
>[Java](#java)
>[Node.js](#node)
>[Perl](#perl)
>[Python](#python)
>[PHP](#php)
>[Ruby](#ruby)
>[Go](#go)
>[C#](#c-sharp)
>[Visual Basic](#visual-basic)
>[Groovy](#groovy)
>[Objective-C](#objective-c)
>[Swift](#swift)
{: .lang-selector}


{% highlight java %}

{% endhighlight %}


{::comment}node{:/comment}
{% highlight js %}

{% endhighlight %}


{::comment}perl{:/comment}
{% highlight perl %}

{% endhighlight %}

{::comment}python{:/comment}
{% highlight python %}

{% endhighlight %}

{::comment}php{:/comment}
{% highlight php %}

{% endhighlight %}


{::comment}ruby{:/comment}
{% highlight ruby %}

{% endhighlight %}


{::comment}go(not supported){:/comment}
{% highlight java %}

{% endhighlight %}


{% highlight c %}

{% endhighlight %}


{% highlight vbnet %}

{% endhighlight %}


{% highlight groovy %}

{% endhighlight %}


{% highlight obj-c++ %}

{% endhighlight %}


{% highlight swift %}

{% endhighlight %}