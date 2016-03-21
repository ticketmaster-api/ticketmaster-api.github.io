---
layout: documentation
categories:
- documentation
- international-discovery
title: International Discovery API 
excerpt: The Ticketmaster International Discovery API allows you to search for events, attractions, or venues, and get attraction.
keywords: API, international discovery, event seatmap, event prices, countries list, domains list, cities list
---
{: .article}
# International Discovery API 

The Ticketmaster International Discovery API allows you to search for events, attractions, or venues, and get attraction, venue or event details including ticket information.
{: .lead .article}

### Overview
{: .article #overview }

#### Discovery API Services

+ See Events Service 
+ See Attraction Service
+ See Venue Service 
+ See Information Service 

#### Endpoint

The base URL for the Web API is `https://app.ticketmaster.eu/mfxapi/v1/`

#### Authentication
You authenticate to the Ticketmaster International Discovery API using an API Key.

+ An API Key needs to be passed as a query parameter in all requests. 
+ All requests must additionally be made over SSL

For example:

+ `apikey` = `gwyfRRwYcA0gmbUDDAtADEeaHT` (required, string)

To request an API Key send an email to the [Ticketmaster Product Manager](mailto:carie.hughes@ticketmaster.co.uk).

#### Format
You can set the output format from all API Services with an Accept header. The API supports:

+ `application/json`
+ `application/xml`

#### Markets
The Ticketmaster International Discovery API covers the following markets: Germany, Austria, Netherlands, Denmark, Belgium, Norway, Sweden, Finland, Poland, UK (Ticketweb.co.uk) and Canada (Admission.com). Please note that the UK and Ireland (Ticketmaster.co.uk, Ticketmaster.ie) and the USA and rest of Canada (Ticketmaster.com) are not available through the International Discovery API. Details will be available soon on how to request access to the Ticketmaster API for these markets.


{: .article }
## Event Service 
The Event Service API allows you to search for events, get details of specific events, get updates for events, and details of ticket prices, and seats.
{: .lead .article}

{: .article }
### Event Search 
Find events and filter your search by event type, location, date, availability, and much more.
 
#### Event Dates
Ticketmaster events have multiple dates including eventdate (the actual date of the event) and onsale 
(the date on which tickets go on sale) and offsale (the date on which tickets are removed from sale). The eventdate is not 
always available - for example where dates have yet to be announced by the promoter. In addition some events may have a 
date but no time, - for example events such as museum or art exhibitions with no fixed start time. Such events are 
indicated by 'date' in the format field rather than the usual 'eventdate'.
 
#### Query Parameters

##### Domain
Although not required, it's advisable to specify a domain or domains. The domain relates to the Ticketmaster website 
through which tickets are listed and sold. (It differs from Country which is the geographical location). You can use the 
Domains List Service for a list of domains and default URL, language, and currency. Use a comma separated list of values 
to search multiple domains. (A logical OR search is performed).

{% comment %}
{: .nested-list}
+ `domain_ids` = (optional, string) 
    - norway
    - sweden
    - finland
    - belgium
    - netherlands
    - denmark
    - germany
    - austria
    - unitedarabemirates
    - canada
    - poland
{% endcomment %}

| Parameters | Optional values | Type |
| -------- | | ------------------ |
|`domain_ids` | norway , sweden , finland , belgium, netherlands, denmark, germany, austria, unitedarabemirates, canada, poland | string |

##### Pagination
You can paginate the results by specifying the number of rows to return, and the start row. The default 
start is 0 and the default rows is 10. There is a maximum of 500 

+ `rows.start` = `10` (optional, integer)
+ `rows` = `20` (optional, integer)

##### Sorting
You can specify a sorting method and order. Sorting methods include event name, event date, popularity 
(based on ticket sales), and proximity (based on distance from the specified lat and long). Sorting order can be ascending 
or descending. The default sort method is eventdate and order is ascending.

{::comment}
{: .nested-list}
+ `sort_by` = `eventdate` (optional, string)
    - eventname
    - populatity
    - eventdate
    - proximity
+ `order` = `asc` (optional, string)
    - asc
    - desc
{:/comment}
    
| Parameters | Optional values | Type |
| -------- | | ------------------ |
|`sort_by` | eventname, populatity, eventdate, proximity | string |
|`order` | asc, desc | string |
    
##### Other Parameters
There are multiple _additional parameters_ which allow you to filter the search by event name, category, 
location, venue, date, availability, attraction (artist, sport, package, play and so on) and many more. See the 'Event Search' GET example for further details.

| Parameters | Optional values | Type | Required |
| ---------- | --------------- | ---- | -------- |
|`domain_ids` | The unique identifier for the domain or market. Although optional, this is recommended. Use a comma separated list of values to search multiple domains. (A logical OR search is performed). | string | No |
|`lang` | The language in ISO code format. The default language is specified in the Domains List service. Usually two or three languages are supported. Example: no-no. | string | No |
|`event_id` | The unique identifier for the attraction (which could be an artist, or sport, tour, package, play and so on). This is linked to domain. Use a comma separated list of values to search for multiple events. (A logical OR search is performed). Example: 453127. | string | No |
|`attraction_ids` | The unique identifier for the attraction (which could be an artist, package, play and so on). This is linked to domain. Use a comma separated list of values to search for multiple attractions. (A logical OR search is performed). Example: 709593. | string | No |
|`category_ids` | A unique identifer for the major category of an event. For example, 10001 is for 'Music'. A list of category IDs and names is available in the Category List service. Use a comma separated list of values to search for multiple categories. (A logical OR search is performed). Example: 10001. | string | No |
|`subcategory_ids` | A unique identifier for the subcategory of an event. For example, 1 is for 'Rock/Pop'. A list of category IDs and names is available in the Category List service. Use a comma separated list of values to search for multiple subcategories. (A logical OR search is performed). Example: 1. | string | No |
|`event_name` | The name of the event. Example: 50. | Integer | No |
|`country_ids` | The unique identifer for the Country. This is the geographical location, whereas Domain relates to the market. Use a comma separated list of values to search multiple Countries (A logical OR search is performed). Example: 539. | string | No |
|`postal_code` | The postal code or zip code. Example: 0151. | string | No |
|`lat` | The latitude of the required search location. Example: 59.9047. | Double | No |
|`long` | The longitude of the required search location. Example: 10.7497. | Double | No |
|`radius` | The radius to be applied to results where a location (lat, long) is used as a search parameter. The radius is given in km. The default language is specified in the Domains List service. Usually two or three languages are supported. Example: 50. | Integer | No |
|`eventdate_from` | The start date of the event for a date range search. Dates are always given in UTC. The date should be in format yyyy-MM-dd'T'HH:mm:ssZ. Example: 2015-02-01T10:00:00Z. | Date | No |
|`eventdate_to` | The end date of the event for a date range search. Dates are always given in UTC. The date should be in format yyyy-MM-dd'T'HH:mm:ssZ. | Date | No |
|`onsaledate_from` | The start date of the event for a date range search. Dates are always given in UTC. The date should be in format yyyy-MM-dd'T'HH:mm:ssZ. Example: 2015-02-01T10:00:00Z. | Date | No |
|`onsaledate_to` | The end date of the event for a date range search. Dates are always given in UTC. The date should be in format yyyy-MM-dd'T'HH:mm:ssZ. | Date | No |
|`offsaledate_from` | The start date of the event for a date range search. Dates are always given in UTC. The date should be in format yyyy-MM-dd'T'HH:mm:ssZ. Example: 2015-02-01T10:00:00Z. | Date | No |
|`offsaledate_to` | The end date of the event for a date range search. Dates are always given in UTC. The date should be in format yyyy-MM-dd'T'HH:mm:ssZ. | Date | No |
|`min_price` | The minimum price for tickets. | Integer | No |
|`max_price` | The maximum price for tickets. | Integer | No |
|`price_excl_fees` | A flag to indicate whether fees are included in the minimum and maximum price. Default: false. | Boolean | No |
|`is_seats_available` | A flag which when set to 'true' gives only events which still have tickets available on sale. | Boolean | No |
|`is_not_cancelled` | A flag which when set to 'true' gives only events have not been cancelled or rescheduled. | Boolean | No |
|`is_not_package` | A flag which when set to 'true' gives only events which are not a package event. | Boolean | No |
|`include_external_events` | A flag which when set to 'true' returns external events, which were events from other Ticketmaster platforms or partners with a more limited set of data fields in the response. | Boolean | No |
|`sort_by` | The method for sorting the results. Proximity can only be used where a lat and long is used as a query parameter. Default: eventdate. Possible values:  eventdate , eventname , popularity , proximity . | string | No |
|`order` | The order in which results are sorted, whether ascending or descending. Default: asc. Possible values:  asc , desc . | string | No |
|`rows` | The number of rows to return, up to a maximum of 500. Default: 10. | Integer | No |
|`start` | The offset for pagination which specifies the start row to return. Default: 0. | Integer | No |


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

{% highlight bash %}
curl --include \
     --header "Accept: application/json" \
  'https://app.ticketmaster.eu/mfxapi/v1/events?domain_ids&lang&attraction_ids&category_ids&subcategory_ids&event_ids&event_name&venue_ids&city_ids&country_ids&postal_code&lat&long&radius&eventdate_to&eventdate_from&onsaledate_to&onsaledate_from&offsaledate_to&offsaledate_from&min_price&max_price&price_excl_fees&is_seats_available&is_not_cancelled&&is_not_package&sort_by&order&rows&start&include_external_events'
{% endhighlight %}

{% highlight java %}
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


{% highlight perl %}
require LWP::UserAgent;

my $ua   = LWP::UserAgent->new;

$ua->default_header("Accept" => "application/json");

my $response = $ua->get("https://private-anon-ebc054a4b-ticketmasterdiscoveryapi.apiary-mock.com/mfxapi/v1/events?domain_ids&lang&attraction_ids&category_ids&subcategory_ids&event_ids&event_name&venue_ids&city_ids&country_ids&postal_code&lat&long&radius&eventdate_to&eventdate_from&onsaledate_to&onsaledate_from&offsaledate_to&offsaledate_from&min_price&max_price&price_excl_fees&is_seats_available&is_not_cancelled&&is_not_package&sort_by&order&rows&start&include_external_events");

print $response->as_string;
{% endhighlight %}


{% highlight py %}
from urllib2 import Request, urlopen

headers = {
  'Accept': 'application/json'
}
request = Request('https://private-anon-ebc054a4b-ticketmasterdiscoveryapi.apiary-mock.com/mfxapi/v1/events?domain_ids&lang&attraction_ids&category_ids&subcategory_ids&event_ids&event_name&venue_ids&city_ids&country_ids&postal_code&lat&long&radius&eventdate_to&eventdate_from&onsaledate_to&onsaledate_from&offsaledate_to&offsaledate_from&min_price&max_price&price_excl_fees&is_seats_available&is_not_cancelled&&is_not_package&sort_by&order&rows&start&include_external_events', headers=headers)

response_body = urlopen(request).read()
print response_body
{% endhighlight %}


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


{% highlight ruby %}
require 'rubygems' if RUBY_VERSION < '1.9'
require 'rest_client'

headers = {
  :accept => 'application/json'
}

response = RestClient.get 'https://private-anon-ebc054a4b-ticketmasterdiscoveryapi.apiary-mock.com/mfxapi/v1/events?domain_ids&lang&attraction_ids&category_ids&subcategory_ids&event_ids&event_name&venue_ids&city_ids&country_ids&postal_code&lat&long&radius&eventdate_to&eventdate_from&onsaledate_to&onsaledate_from&offsaledate_to&offsaledate_from&min_price&max_price&price_excl_fees&is_seats_available&is_not_cancelled&&is_not_package&sort_by&order&rows&start&include_external_events', headers
puts response
{% endhighlight %}


{% highlight go %}
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



{% highlight csharp %}
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


{% highlight vb %}
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


{% highlight objc %}
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

{: .article }
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /events?domain_ids&lang&attraction_ids&category_ids&subcategory_ids&event_ids&event_name&venue_ids&city_ids&country_ids&postal_code&lat&long&radius&eventdate_to&eventdate_from&onsaledate_to&onsaledate_from&offsaledate_to&offsaledate_from&min_price&max_price&price_excl_fees&is_seats_available&is_not_cancelled&&is_not_package&sort_by&order&rows&start&include_external_events HTTP/1.1
Host: app.ticketmaster.eu/mfxapi/v1
Accept: application/json
Content-Length: 0
{% endhighlight %}


{% highlight HTTP %}
HTTP/1.1 200 OK
Connection: keep-alive
X-Apiary-Transaction-Id: 5698d5143e5b710b0099e743
Content-Type: application/json
Date: Fri, 15 Jan 2016 11:16:37 GMT
Server: Apigee Router
Content-Length: 150
X-Newrelic-App-Data: PxQDVFVRCQITVlZRDgcFV0YdFHYaFhEHQxFSERd/cWYcShNDHUwDTFQHAk1WTQ0LBFdQUAcHAV9dCA8KW19PQAFXCEAUGgUHAQcABwZVAQRSAwIDVkEUVVEIEgdq
Via: 1.1 vegur

{
  "events": [
    {
      "id": "182671",
      "domain_id": "unitedkingdom",
      "name": "R5",
      "url": "http://www.ticketweb.co.uk/checkout/event.php?eventId=IEH1310Y&language=en-us&track=DiscoveryAPI&camefrom=TMINTL-NO-IPROSPECT-9oX",
      "externalUrl": false,
      "eventdate": {
        "format": "datetime",
        "value": "2015-10-13T19:00:00Z"
      },
      "day_of_week": "Tuesday",
      "timezone": "Europe/London",
      "localeventdate": "2015-10-13T20:00:00",
      "onsale": {
        "format": "datetime",
        "value": "2015-06-12T09:00:00Z"
      },
      "offsale": {
        "format": "datetime",
        "value": "2015-10-13T17:00:00Z"
      },
      "dooropening": {
        "format": "datetime",
        "value": "2015-10-13T18:00:00Z"
      },
      "properties": {
        "cancelled": false,
        "rescheduled": false,
        "seats_avail": true,
        "sold_out": false,
        "package": false
      },
      "venue": {
        "id": "9497",
        "name": "O2 Shepherd's Bush Empire",
        "location": {
          "address": {
            "address": "Shepherds Bush Green, Shepherds Bush",
            "postal_code": "W12 8TT",
            "city": "London",
            "country": "United Kingdom",
            "long": -0.22312,
            "lat": 51.50326
          }
        }
      },
      "categories": [
        {
          "name": "Music",
          "id": 10001,
          "subcategories": [
            {
              "name": "Rock/Pop",
              "id": 1
            }
          ]
        }
      ],
      "attractions": [
        {
          "id": 909876,
          "name": "R5",
          "url": "http://www.ticketweb.co.uk/artist/r5-tickets/909876?track=DiscoveryAPI&camefrom=TMINTL-NO-IPROSPECT-9oX"
        }
      ],
      "price_ranges": {
        "excluding_ticket_fees": {
          "min": 18.5,
          "max": 18.5
        },
        "including_ticket_fees": {
          "min": 20.81,
          "max": 20.81
        }
      },
      "currency": "GBP"
    },
    {
      "id": "181551",
      "domain_id": "unitedkingdom",
      "name": "MT Wolf",
      "url": "http://www.ticketweb.co.uk/checkout/event.php?eventId=VPB1410X&language=en-us&track=DiscoveryAPI&camefrom=TMINTL-NO-IPROSPECT-9oX",
      "externalUrl": false,
      "eventdate": {
        "format": "datetime",
        "value": "2015-10-14T18:30:00Z"
      },
      "day_of_week": "Wednesday",
      "timezone": "Europe/London",
      "localeventdate": "2015-10-14T19:30:00",
      "onsale": {
        "format": "datetime",
        "value": "2015-06-05T08:00:00Z"
      },
      "offsale": {
        "format": "datetime",
        "value": "2015-08-28T10:00:00Z"
      },
      "properties": {
        "cancelled": true,
        "rescheduled": false,
        "seats_avail": true,
        "sold_out": false,
        "package": false
      },
      "venue": {
        "id": "17207",
        "name": "Bush Hall",
        "location": {
          "address": {
            "address": "310 Uxbridge Road,",
            "postal_code": "W127LJ",
            "city": "London",
            "country": "United Kingdom",
            "long": -0.23162,
            "lat": 51.50629
          }
        }
      },
      "categories": [
        {
          "name": "Music",
          "id": 10001,
          "subcategories": [
            {
              "name": "Rock/Pop",
              "id": 1
            }
          ]
        }
      ],
      "price_ranges": {
        "excluding_ticket_fees": {
          "min": 12.5,
          "max": 12.5
        },
        "including_ticket_fees": {
          "min": 14.06,
          "max": 14.06
        }
      },
      "currency": "GBP"
    }
  ],
  "pagination": {
    "start": 0,
    "rows": 2,
    "total": 2
  }
}
{% endhighlight %}

{: .article #event-details}
### Event Details
Get details for a specific event using the unique identifer for the event. This includes the venue and location, ticket 
availability and pricing, a description, and the Ticketmaster Website URL for purchasing tickets for the event.

{: .code.red}
https://app.ticketmaster.eu/mfxapi/v1/event/{event_id}

| Parameters | Optional values | Type | Required |
| ---------- | --------------- | ---- | -------- |
|`event_id` | A unique identifier for the event which is specific to the domain (e.g. Norway) Example: 449621. | Integer | Yes|
|`lang` | The language in ISO code format. Example: no-no. | string | No |
|`domain_ids` | The unique identifier for the domain or market. Although optional, this is recommended. Example: norway. | string | Yes|


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

request.open('GET', 'https://app.ticketmaster.eu/mfxapi/v1/event/449621?lang&domain_ids');

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

{% highlight bash %}
curl --include \
     --header "Accept: application/json" \
  'https://app.ticketmaster.eu/mfxapi/v1/event/449621?lang&domain_ids'
{% endhighlight %}

{% highlight java %}
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
Response response = client.target("https://app.ticketmaster.eu/mfxapi/v1/event/{event_id}?lang&#38;domain_ids")
  .request(MediaType.TEXT_PLAIN_TYPE)
  .header("Accept", "application/json")
  .get();

System.out.println("status: " + response.getStatus());
System.out.println("headers: " + response.getHeaders());
System.out.println("body:" + response.readEntity(String.class));
{% endhighlight %}


{% highlight js %}
var request = require('request');

request({
  method: 'GET',
  url: 'https://app.ticketmaster.eu/mfxapi/v1/event/449621?lang&domain_ids',
  headers: {
    'Accept': 'application/json'
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
{% endhighlight %}



{% highlight perl %}
require LWP::UserAgent;

my $ua   = LWP::UserAgent->new;

$ua->default_header("Accept" => "application/json");

my $response = $ua->get("https://app.ticketmaster.eu/mfxapi/v1/event/449621?lang&domain_ids");

print $response->as_string;
{% endhighlight %}


{% highlight py %}
from urllib2 import Request, urlopen

headers = {
  'Accept': 'application/json'
}
request = Request('https://app.ticketmaster.eu/mfxapi/v1/event/449621?lang&domain_ids', headers=headers)

response_body = urlopen(request).read()
print response_body
{% endhighlight %}


{% highlight php %}
<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://app.ticketmaster.eu/mfxapi/v1/event/449621?lang&domain_ids");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Accept: application/json"
));

$response = curl_exec($ch);
curl_close($ch);

var_dump($response);
{% endhighlight %}


{% highlight ruby %}
require 'rubygems' if RUBY_VERSION < '1.9'
require 'rest_client'

headers = {
  :accept => 'application/json'
}

response = RestClient.get 'https://app.ticketmaster.eu/mfxapi/v1/event/449621?lang&domain_ids', headers
puts response
{% endhighlight %}


{% highlight go %}
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	client := &http.Client{}
	req, _ := http.NewRequest("GET", "https://app.ticketmaster.eu/mfxapi/v1/event/449621?lang&domain_ids", nil)
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


{% highlight csharp %}
//Common testing requirement. If you are consuming an API in a sandbox/test region, uncomment this line of code ONLY for non production uses.
//System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };

//Be sure to run "Install-Package Microsoft.Net.Http" from your nuget command line.
using System;
using System.Net.Http;

var baseAddress = new Uri("https://app.ticketmaster.eu/mfxapi/v1/");

using (var httpClient = new HttpClient{ BaseAddress = baseAddress })
{

  httpClient.DefaultRequestHeaders.TryAddWithoutValidation("accept", "application/json");
  
  using(var response = await httpClient.GetAsync("event/{event_id}?lang&domain_ids"))
  { 
    string responseData = await response.Content.ReadAsStringAsync();
  }
}
{% endhighlight %}


{% highlight vb %}
Dim request = TryCast(System.Net.WebRequest.Create("https://app.ticketmaster.eu/mfxapi/v1/event/449621?lang&domain_ids"), System.Net.HttpWebRequest)

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


{% highlight groovy %}
import groovyx.net.http.RESTClient
import static groovyx.net.http.ContentType.JSON
import groovy.json.JsonSlurper
import groovy.json.JsonOutput

@Grab (group = 'org.codehaus.groovy.modules.http-builder', module = 'http-builder', version = '0.5.0')
def client = new RESTClient("https://app.ticketmaster.eu/mfxapi/v1")

def emptyHeaders = [:]
emptyHeaders."Accept" = "application/json"

response = client.get( path : "/event/{event_id}?lang&domain_ids", headers: emptyHeaders )

println("Status:" + response.status)

if (response.data) {
  println("Content Type: " + response.contentType)
  println("Body:\n" + JsonOutput.prettyPrint(JsonOutput.toJson(response.data)))
}
{% endhighlight %}


{% highlight objc %}
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


{% highlight swift %}
// NOTE: Uncommment following two lines for use in a Playground
// import XCPlayground
// XCPlaygroundPage.currentPage.needsIndefiniteExecution = true

let url = NSURL(string: "https://app.ticketmaster.eu/mfxapi/v1/event/449621?lang&domain_ids")!
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

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /event/449621?lang&domain_ids HTTP/1.1
Host: https://app.ticketmaster.eu/mfxapi/v1
Accept: application/json
Content-Length: 0
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Server: Cowboy
Connection: keep-alive
X-Newrelic-App-Data: PxQDVFVRCQITVlZRDgcFV0YdFHYaFhEHQxFSERd/cWYcShNDHUwDTFQGBU1WTQgEA1VYWgQJA0pVCQYBTkQCUQkHCwAODwAABVMJURNNVQMIRVI8
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT
Access-Control-Max-Age: 10
X-Apiary-Transaction-Id: 5698d936b152b20b00fb3d5d
Content-Length: 1802
Date: Fri, 15 Jan 2016 11:16:37 GMT
Via: 1.1 vegur

{
  "events": [
    {
      "id": "182671",
      "domain_id": "unitedkingdom",
      "name": "R5",
      "url": "http://www.ticketweb.co.uk/checkout/event.php?eventId=IEH1310Y&language=en-us&track=DiscoveryAPI&camefrom=TMINTL-NO-IPROSPECT-9oX",
      "externalUrl": false,
      "eventdate": {
        "format": "datetime",
        "value": "2015-10-13T19:00:00Z"
      },
      "day_of_week": "Tuesday",
      "timezone": "Europe/London",
      "localeventdate": "2015-10-13T20:00:00",
      "onsale": {
        "format": "datetime",
        "value": "2015-06-12T09:00:00Z"
      },
      "offsale": {
        "format": "datetime",
        "value": "2015-10-13T17:00:00Z"
      },
      "dooropening": {
        "format": "datetime",
        "value": "2015-10-13T18:00:00Z"
      },
      "properties": {
        "cancelled": false,
        "rescheduled": false,
        "seats_avail": true,
        "sold_out": false,
        "package": false
      },
      "venue": {
        "id": "9497",
        "name": "O2 Shepherd's Bush Empire",
        "location": {
          "address": {
            "address": "Shepherds Bush Green, Shepherds Bush",
            "postal_code": "W12 8TT",
            "city": "London",
            "country": "United Kingdom",
            "long": -0.22312,
            "lat": 51.50326
          }
        }
      },
      "categories": [
        {
          "name": "Music",
          "id": 10001,
          "subcategories": [
            {
              "name": "Rock/Pop",
              "id": 1
            }
          ]
        }
      ],
      "attractions": [
        {
          "id": 909876,
          "name": "R5",
          "url": "http://www.ticketweb.co.uk/artist/r5-tickets/909876?track=DiscoveryAPI&camefrom=TMINTL-NO-IPROSPECT-9oX"
        }
      ],
      "price_ranges": {
        "excluding_ticket_fees": {
          "min": 18.5,
          "max": 18.5
        },
        "including_ticket_fees": {
          "min": 20.81,
          "max": 20.81
        }
      },
      "currency": "GBP"
    }
  ],
  "pagination": {
    "start": 0,
    "rows": 1,
    "total": 1
  }
}
{% endhighlight %}

{: .article #updated-events}
### Updated Events 
Find the events which have been updated since a given timestamp. First call the service with the updated_since timestamp, 
then process the response and call the service again with parameters provided in the next field. Finally continue until 
the returned number of rows is less than the requested number - or until the response is an empty array. 
(This service does not consider what fields are updated or changes to values, only when the event data was written)

{: .code.red}
https://app.ticketmaster.eu/mfxapi/v1/event/updated

| Parameters | Optional values | Type | Required |
| ---------- | --------------- | ---- | -------- |
|`updated_since` | The timestamp for the date and time from which updated events are returned. Time is always UTC and should be specified to hour, minutes, seconds and miliseconds. Example: 2008-01-18T18:51:43.01Z. | string | Yes|
|`lang` | The language in ISO code format. Example: no-no. | string | No |
|`domain_ids` | The unique identifier for the domain or market. Although optional, this is recommended. Example: norway. | string | No |
|`rows` | The number of rows to return in the response. Example: 100. | Integer | No |

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

request.open('GET', 'https://app.ticketmaster.eu/mfxapi/v1/event/updated?updated_since&lang&domain_ids&rows');

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

{% highlight bash %}
curl --include \
     --header "Accept: application/json" \
  'https://app.ticketmaster.eu/mfxapi/v1/event/updated?updated_since&lang&domain_ids&rows'
{% endhighlight %}

{% highlight java %}
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
Response response = client.target("https://app.ticketmaster.eu/mfxapi/v1/event/updated?updated_since&#38;lang&#38;domain_ids&#38;rows")
  .request(MediaType.TEXT_PLAIN_TYPE)
  .header("Accept", "application/json")
  .get();

System.out.println("status: " + response.getStatus());
System.out.println("headers: " + response.getHeaders());
System.out.println("body:" + response.readEntity(String.class));
{% endhighlight %}


{% highlight js %}
var request = require('request');

request({
  method: 'GET',
  url: 'https://app.ticketmaster.eu/mfxapi/v1/event/updated?updated_since&lang&domain_ids&rows',
  headers: {
    'Accept': 'application/json'
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
{% endhighlight %}


{% highlight perl %}
require LWP::UserAgent;

my $ua   = LWP::UserAgent->new;

$ua->default_header("Accept" => "application/json");

my $response = $ua->get("https://app.ticketmaster.eu/mfxapi/v1/event/updated?updated_since&lang&domain_ids&rows");

print $response->as_string;
{% endhighlight %}


{% highlight py %}
from urllib2 import Request, urlopen

headers = {
  'Accept': 'application/json'
}
request = Request('https://app.ticketmaster.eu/mfxapi/v1/event/updated?updated_since&lang&domain_ids&rows', headers=headers)

response_body = urlopen(request).read()
print response_body
{% endhighlight %}


{% highlight php %}
<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://app.ticketmaster.eu/mfxapi/v1/event/updated?updated_since&lang&domain_ids&rows");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Accept: application/json"
));

$response = curl_exec($ch);
curl_close($ch);

var_dump($response);
{% endhighlight %}



{% highlight ruby %}
require 'rubygems' if RUBY_VERSION < '1.9'
require 'rest_client'

headers = {
  :accept => 'application/json'
}

response = RestClient.get 'https://app.ticketmaster.eu/mfxapi/v1/event/updated?updated_since&lang&domain_ids&rows', headers
puts response
{% endhighlight %}



{% highlight go %}
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	client := &http.Client{}
	
	req, _ := http.NewRequest("GET", "https://app.ticketmaster.eu/mfxapi/v1/event/updated?updated_since&lang&domain_ids&rows", nil)

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


{% highlight csharp %}
//Common testing requirement. If you are consuming an API in a sandbox/test region, uncomment this line of code ONLY for non production uses.
//System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };

//Be sure to run "Install-Package Microsoft.Net.Http" from your nuget command line.
using System;
using System.Net.Http;

var baseAddress = new Uri("https://app.ticketmaster.eu/mfxapi/v1/");

using (var httpClient = new HttpClient{ BaseAddress = baseAddress })
{

  httpClient.DefaultRequestHeaders.TryAddWithoutValidation("accept", "application/json");
  
  using(var response = await httpClient.GetAsync("event/updated?updated_since&lang&domain_ids&rows"))
  { 
        string responseData = await response.Content.ReadAsStringAsync();
  }
}
{% endhighlight %}


{% highlight vb %}
Dim request = TryCast(System.Net.WebRequest.Create("https://app.ticketmaster.eu/mfxapi/v1/event/updated?updated_since&lang&domain_ids&rows"), System.Net.HttpWebRequest)

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


{% highlight groovy %}
import groovyx.net.http.RESTClient
import static groovyx.net.http.ContentType.JSON
import groovy.json.JsonSlurper
import groovy.json.JsonOutput

@Grab (group = 'org.codehaus.groovy.modules.http-builder', module = 'http-builder', version = '0.5.0')
def client = new RESTClient("https://app.ticketmaster.eu/mfxapi/v1")

def emptyHeaders = [:]
emptyHeaders."Accept" = "application/json"

response = client.get( path : "/event/updated?updated_since&lang&domain_ids&rows", headers: emptyHeaders )

println("Status:" + response.status)

if (response.data) {
  println("Content Type: " + response.contentType)
  println("Body:\n" + JsonOutput.prettyPrint(JsonOutput.toJson(response.data)))
}
{% endhighlight %}


{% highlight objc %}
NSURL *URL = [NSURL URLWithString:@"https://app.ticketmaster.eu/mfxapi/v1/event/updated?updated_since&lang&domain_ids&rows"];

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


{% highlight swift %}
// NOTE: Uncommment following two lines for use in a Playground
// import XCPlayground
// XCPlaygroundPage.currentPage.needsIndefiniteExecution = true

let url = NSURL(string: "https://app.ticketmaster.eu/mfxapi/v1/event/updated?updated_since&lang&domain_ids&rows")!
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

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /event/updated?updated_since&lang&domain_ids&rows HTTP/1.1
Host: https://app.ticketmaster.eu/mfxapi/v1
Accept: application/json
Content-Length: 0
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Server: Cowboy
Connection: keep-alive
X-Newrelic-App-Data: PxQDVFVRCQITVlZRDgcFV0YdFHYaFhEHQxFSERd/cWYcShNDHUwDTFQHAU1WTQsGAFZTVgIDBV9dCA8KW19WTgRRClIUGgYFVlBYWQRZAANXBwRXRE9eUlwXBD8=
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT
Access-Control-Max-Age: 10
X-Apiary-Transaction-Id: 5698dce0462e330b00d14313
Content-Length: 4320
Date: Fri, 15 Jan 2016 11:16:37 GMT
Via: 1.1 vegur

{
  "events": [
    {
      "id": "467619",
      "domain_id": "norway",
      "name": "Drømmeshow",
      "url": "http://www.billettservice.no/checkout/event.php?eventId=GAP15071&language=no-no&track=DiscoveryAPI",
      "eventdate": {
        "format": "datetime",
        "value": "2015-07-15T17:00:00Z"
      },
      "day_of_week": "Onsdag",
      "timezone": "Europe/Berlin",
      "localeventdate": "2015-07-15T19:00:00",
      "images": [
        {
          "url": "http://media.ticketmaster.com/img/tat/cft1/201507/01/678040.jpg?track=DiscoveryAPI",
          "type": "standard",
          "width": 205,
          "height": 115
        },
        {
          "url": "http://media.ticketmaster.com/img/tat/cft1/201507/01/678030.jpg?track=DiscoveryAPI",
          "type": "large",
          "width": 305,
          "height": 225
        }
      ],
      "onsale": {
        "format": "datetime",
        "value": "2015-06-29T13:05:00Z"
      },
      "offsale": {
        "format": "datetime",
        "value": "2015-07-15T18:00:00Z"
      },
      "properties": {
        "canceled": false,
        "rescheduled": false,
        "seats_avail": true,
        "sold_out": false,
        "package": false
      },
      "venue": {
        "id": "8653",
        "name": "Apotekergaarden",
        "location": {
          "address": {
            "address": "Skolegaten 3",
            "postal_code": "4876",
            "city": "Grimstad",
            "country": "Norway",
            "long": 8.59344,
            "lat": 58.34178
          }
        }
      },
      "categories": [
        {
          "name": "Teater/Show",
          "id": 10002,
          "subcategories": [
            {
              "name": "Show",
              "id": 1118
            }
          ]
        },
        {
          "name": "Comedy",
          "id": 10102,
          "subcategories": [
            {
              "name": "Humor/Komedie",
              "id": 39
            }
          ]
        }
      ],
      "attractions": [
        {
          "id": 961604,
          "name": "Drømmeshow",
          "url": "http://www.billettservice.no/artist/drommeshow-billetter/961604?track=DiscoveryAPI"
        }
      ],
      "price_ranges": {
        "excluding_ticket_fees": {
          "min": 395,
          "max": 395
        },
        "including_ticket_fees": {
          "min": 420,
          "max": 420
        }
      },
      "currency": "NOK"
    },
    {
      "id": "467981",
      "domain_id": "norway",
      "name": "Weekend Pass  PALMESUS 2016",
      "url": "http://www.billettservice.no/checkout/event.php?eventId=KYS2016&language=no-no&track=DiscoveryAPI",
      "eventdate": {
        "format": "datetime",
        "value": "2016-07-01T10:01:00Z"
      },
      "day_of_week": "Fredag",
      "timezone": "Europe/Berlin",
      "localeventdate": "2016-07-01T12:01:00",
      "images": [
        {
          "url": "http://media.ticketmaster.com/img/tat/cft1/201411/28/524730.jpg?track=DiscoveryAPI",
          "type": "standard",
          "width": 205,
          "height": 115
        },
        {
          "url": "http://media.ticketmaster.com/img/tat/cft1/201411/28/524720.jpg?track=DiscoveryAPI",
          "type": "large",
          "width": 305,
          "height": 225
        }
      ],
      "onsale": {
        "format": "datetime",
        "value": "2015-07-06T15:00:00Z"
      },
      "offsale": {
        "format": "datetime",
        "value": "2016-07-01T09:00:00Z"
      },
      "properties": {
        "canceled": false,
        "rescheduled": false,
        "seats_avail": false,
        "sold_out": true,
        "package": false
      },
      "venue": {
        "id": "3259",
        "name": "Bystranda",
        "location": {
          "address": {
            "postal_code": "4634",
            "city": "Kristiansand S",
            "country": "Norway",
            "long": 8.00806,
            "lat": 58.14623
          }
        }
      },
      "categories": [
        {
          "name": "Musikk",
          "id": 10001,
          "subcategories": [
            {
              "name": "Rock/Pop",
              "id": 1
            }
          ]
        },
        {
          "name": "Festivaler",
          "id": 10101,
          "subcategories": [
            {
              "name": "Musikkfestival",
              "id": 1005
            }
          ]
        }
      ],
      "attractions": [
        {
          "id": 901146,
          "name": "Palmesus",
          "url": "http://www.billettservice.no/artist/palmesus-billetter/901146?track=DiscoveryAPI"
        }
      ],
      "price_ranges": {
        "excluding_ticket_fees": {
          "min": 1299,
          "max": 1299
        },
        "including_ticket_fees": {
          "min": 1349,
          "max": 1349
        }
      },
      "currency": "NOK"
    }
  ],
  "next": "?lang=no-no&domain_ids=norway&updated_since=2015-07-08T09:41:09.288Z&rows=10"
}

{% endhighlight %}


{: .article #event-prices}
### Event Prices 
Get information about the ticket price levels applicable for an specific event ID, the price range for each level and ticket availability.

{: .code.red}
https://app.ticketmaster.eu/mfxapi/v1/event/{event_id}/prices

| Parameters | Optional values | Type | Required |
| ---------- | --------------- | ---- | -------- |
|`event_id` | A unique identifier for the event which is specific to the domain. Example: 449621. | Integer | Yes|
|`lang` | The language in ISO code format. Example: no-no. | string | No |
|`domain_ids` | The unique identifier for the domain or market. Example: norway. | string | No |
|`price_level_ids` | The unique identifier for the price level. If no price level ID is specified, all applicable price levels for the event are returned. Example: 1,2. | string | No |

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

request.open('GET', 'https://app.ticketmaster.eu/mfxapi/v1/event/449621/prices?domain_ids&lang&price_level_ids');

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

{% highlight bash %}
curl --include \
     --header "Accept: application/json" \
  'https://app.ticketmaster.eu/mfxapi/v1/event/449621/prices?domain_ids&lang&price_level_ids'
{% endhighlight %}
{% highlight java %}
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
Response response = client.target("https://app.ticketmaster.eu/mfxapi/v1/event/{event_id}/prices?domain_ids&#38;lang&#38;price_level_ids")
  .request(MediaType.TEXT_PLAIN_TYPE)
  .header("Accept", "application/json")
  .get();

System.out.println("status: " + response.getStatus());
System.out.println("headers: " + response.getHeaders());
System.out.println("body:" + response.readEntity(String.class));
{% endhighlight %}


{% highlight js %}
var request = require('request');

request({
  method: 'GET',
  url: 'https://app.ticketmaster.eu/mfxapi/v1/event/449621/prices?domain_ids&lang&price_level_ids',
  headers: {
    'Accept': 'application/json'
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
{% endhighlight %}


{% highlight perl %}
require LWP::UserAgent;

my $ua   = LWP::UserAgent->new;

$ua->default_header("Accept" => "application/json");

my $response = $ua->get("https://app.ticketmaster.eu/mfxapi/v1/event/449621/prices?domain_ids&lang&price_level_ids");

print $response->as_string;
{% endhighlight %}

{% highlight py %}
from urllib2 import Request, urlopen

headers = {
  'Accept': 'application/json'
}
request = Request('https://app.ticketmaster.eu/mfxapi/v1/event/449621/prices?domain_ids&lang&price_level_ids', headers=headers)

response_body = urlopen(request).read()
print response_body
{% endhighlight %}

{% highlight php %}
<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://app.ticketmaster.eu/mfxapi/v1/event/449621/prices?domain_ids&lang&price_level_ids");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Accept: application/json"
));

$response = curl_exec($ch);
curl_close($ch);

var_dump($response);
{% endhighlight %}


{% highlight ruby %}
require 'rubygems' if RUBY_VERSION < '1.9'
require 'rest_client'

headers = {
  :accept => 'application/json'
}

response = RestClient.get 'https://app.ticketmaster.eu/mfxapi/v1/event/449621/prices?domain_ids&lang&price_level_ids', headers
puts response
{% endhighlight %}


{% highlight go %}
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	client := &http.Client{}

	req, _ := http.NewRequest("GET", "https://app.ticketmaster.eu/mfxapi/v1/event/449621/prices?domain_ids&lang&price_level_ids", nil)

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


{% highlight csharp %}
//Common testing requirement. If you are consuming an API in a sandbox/test region, uncomment this line of code ONLY for non production uses.
//System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };

//Be sure to run "Install-Package Microsoft.Net.Http" from your nuget command line.
using System;
using System.Net.Http;

var baseAddress = new Uri("https://app.ticketmaster.eu/mfxapi/v1/");

using (var httpClient = new HttpClient{ BaseAddress = baseAddress })
{

  httpClient.DefaultRequestHeaders.TryAddWithoutValidation("accept", "application/json");
  
  using(var response = await httpClient.GetAsync("event/{event_id}/prices?domain_ids&lang&price_level_ids"))
  {
 
        string responseData = await response.Content.ReadAsStringAsync();
  }
}
{% endhighlight %}


{% highlight vb %}
Dim request = TryCast(System.Net.WebRequest.Create("https://app.ticketmaster.eu/mfxapi/v1/event/449621/prices?domain_ids&lang&price_level_ids"), System.Net.HttpWebRequest)

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


{% highlight groovy %}
import groovyx.net.http.RESTClient
import static groovyx.net.http.ContentType.JSON
import groovy.json.JsonSlurper
import groovy.json.JsonOutput

@Grab (group = 'org.codehaus.groovy.modules.http-builder', module = 'http-builder', version = '0.5.0')
def client = new RESTClient("https://app.ticketmaster.eu/mfxapi/v1")

def emptyHeaders = [:]
emptyHeaders."Accept" = "application/json"

response = client.get( path : "/event/{event_id}/prices?domain_ids&lang&price_level_ids", headers: emptyHeaders )

println("Status:" + response.status)

if (response.data) {
  println("Content Type: " + response.contentType)
  println("Body:\n" + JsonOutput.prettyPrint(JsonOutput.toJson(response.data)))
}
{% endhighlight %}


{% highlight objc %}
NSURL *URL = [NSURL URLWithString:@"https://app.ticketmaster.eu/mfxapi/v1/event/449621/prices?domain_ids&lang&price_level_ids"];

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


{% highlight swift %}
// NOTE: Uncommment following two lines for use in a Playground
// import XCPlayground
// XCPlaygroundPage.currentPage.needsIndefiniteExecution = true

let url = NSURL(string: "https://app.ticketmaster.eu/mfxapi/v1/event/449621/prices?domain_ids&lang&price_level_ids")!
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

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /event/449621/prices?domain_ids&lang&price_level_ids HTTP/1.1
Host: https://app.ticketmaster.eu/mfxapi/v1
Accept: application/json
Content-Length: 0
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Server: Cowboy
Connection: keep-alive
X-Newrelic-App-Data: PxQDVFVRCQITVlZRDgcFV0YdFHYaFhEHQxFSERd/cWYcShNDHVEdUlQFG1FIUw4FBlxSUwcAG1dQBwUfQFNWVVQHDldaCwVRVgMJQx0HUg4XU2o=
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT
Access-Control-Max-Age: 10
X-Apiary-Transaction-Id: 5698dee38392e30b00af94c6
Content-Length: 1463
Date: Fri, 15 Jan 2016 12:16:37 GMT
Via: 1.1 vegur

{
  "event": {
    "id": 115831,
    "price_types": [
      {
        "id": 1,
        "code": "NORM",
        "name": "Normal",
        "description": "Regular Price",
        "regular": true,
        "price_levels": [
          {
            "id": 1,
            "name": "Seating Cat 1",
            "face_value": 110,
            "ticket_fees": 18.95,
            "availability": "none"
          },
          {
            "id": 2,
            "name": "Seating Cat 2",
            "face_value": 95,
            "ticket_fees": 16.7,
            "availability": "none"
          },
          {
            "id": 3,
            "name": "Seating Cat 3",
            "face_value": 80,
            "ticket_fees": 14.45,
            "availability": "high"
          },
          {
            "id": 4,
            "name": "Seating Cat 4",
            "face_value": 60,
            "ticket_fees": 11.45,
            "availability": "high"
          },
          {
            "id": 5,
            "name": "Seating Cat 5",
            "face_value": 60,
            "ticket_fees": 12.65,
            "availability": "none"
          },
          {
            "id": 6,
            "name": "Premium seats 1",
            "face_value": 250,
            "ticket_fees": 39.95,
            "availability": "none"
          },
          {
            "id": 7,
            "name": "Premium seats 2",
            "face_value": 150,
            "ticket_fees": 24.95,
            "availability": "none"
          }
        ]
      }
    ],
    "currency": "EUR"
  }
}

{% endhighlight %}


{: .article #event-seatmap}
### Event Seatmap 
Get a static map image of the venue for the event showing the location of seating or standing areas. Note that not all events will have a seatmap available - for example packages, festivals, many general admission music events, and so on. Interactive seatmaps are currently not available.

{: .code.red}
https://app.ticketmaster.eu/mfxapi/v1/event/{event_id}/seatmap

| Parameters | Optional values | Type | Required |
| ---------- | --------------- | ---- | -------- |
|`event_id` | A unique identifier for the event which is specific to the domain. Example: 449621. | Integer | Yes|
|`domain_ids` | The unique identifier for the domain or market. Although optional, this is recommended. Example: norway. | string | No |


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

request.open('GET', 'https://app.ticketmaster.eu/mfxapi/v1/event/449621/seatmap?domain_ids');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

request.send();
{% endhighlight %}

{% highlight bash %}
curl --include \
     --header "Accept: application/json" \
  'https://app.ticketmaster.eu/mfxapi/v1/event/449621/seatmap?domain_ids'
{% endhighlight %}

{% highlight java %}
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
Response response = client.target("https://app.ticketmaster.eu/mfxapi/v1/event/{event_id}/seatmap?domain_ids")
  .request(MediaType.TEXT_PLAIN_TYPE)
  .header("Accept", "application/json")
  .get();

System.out.println("status: " + response.getStatus());
System.out.println("headers: " + response.getHeaders());
System.out.println("body:" + response.readEntity(String.class));
{% endhighlight %}


{% highlight js %}
var request = require('request');

request({
  method: 'GET',
  url: 'https://app.ticketmaster.eu/mfxapi/v1/event/449621/seatmap?domain_ids
',
  headers: {
    'Accept': 'application/json'
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
{% endhighlight %}


{% highlight perl %}
require LWP::UserAgent;

my $ua   = LWP::UserAgent->new;

$ua->default_header("Accept" => "application/json");

my $response = $ua->get("https://app.ticketmaster.eu/mfxapi/v1/event/449621/seatmap?domain_ids
");

print $response->as_string;
{% endhighlight %}

{% highlight py %}
from urllib2 import Request, urlopen

headers = {
  'Accept': 'application/json'
}
request = Request('https://app.ticketmaster.eu/mfxapi/v1/event/449621/seatmap?domain_ids
', headers=headers)

response_body = urlopen(request).read()
print response_body
{% endhighlight %}

{% highlight php %}
<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://app.ticketmaster.eu/mfxapi/v1/event/449621/seatmap?domain_ids
");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Accept: application/json"
));

$response = curl_exec($ch);
curl_close($ch);

var_dump($response);
{% endhighlight %}


{% highlight ruby %}
require 'rubygems' if RUBY_VERSION < '1.9'
require 'rest_client'

headers = {
  :accept => 'application/json'
}

response = RestClient.get 'https://app.ticketmaster.eu/mfxapi/v1/event/449621/seatmap?domain_ids
', headers
puts response
{% endhighlight %}


{% highlight go %}
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	client := &http.Client{}
	req, _ := http.NewRequest("GET", "https://app.ticketmaster.eu/mfxapi/v1/event/449621/seatmap?domain_ids
", nil)
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


{% highlight csharp %}
//Common testing requirement. If you are consuming an API in a sandbox/test region, uncomment this line of code ONLY for non production uses.
//System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };

//Be sure to run "Install-Package Microsoft.Net.Http" from your nuget command line.
using System;
using System.Net.Http;

var baseAddress = new Uri("https://app.ticketmaster.eu/mfxapi/v1/");

using (var httpClient = new HttpClient{ BaseAddress = baseAddress })
{

  httpClient.DefaultRequestHeaders.TryAddWithoutValidation("accept", "application/json");
  
  using(var response = await httpClient.GetAsync("event/{event_id}/seatmap?domain_ids"))
  { 
    string responseData = await response.Content.ReadAsStringAsync();
  }
}
{% endhighlight %}


{% highlight vb %}
Dim request = TryCast(System.Net.WebRequest.Create("https://app.ticketmaster.eu/mfxapi/v1/event/449621/seatmap?domain_ids
"), System.Net.HttpWebRequest)

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


{% highlight groovy %}
import groovyx.net.http.RESTClient
import static groovyx.net.http.ContentType.JSON
import groovy.json.JsonSlurper
import groovy.json.JsonOutput

@Grab (group = 'org.codehaus.groovy.modules.http-builder', module = 'http-builder', version = '0.5.0')
def client = new RESTClient("https://app.ticketmaster.eu/mfxapi/v1")

def emptyHeaders = [:]
emptyHeaders."Accept" = "application/json"

response = client.get( path : "/event/{event_id}/seatmap?domain_ids", headers: emptyHeaders )

println("Status:" + response.status)

if (response.data) {
  println("Content Type: " + response.contentType)
  println("Body:\n" + JsonOutput.prettyPrint(JsonOutput.toJson(response.data)))
}
{% endhighlight %}


{% highlight objc %}
NSURL *URL = [NSURL URLWithString:@"https://app.ticketmaster.eu/mfxapi/v1/event/449621/seatmap?domain_ids
"];

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


{% highlight swift %}
// NOTE: Uncommment following two lines for use in a Playground
// import XCPlayground
// XCPlaygroundPage.currentPage.needsIndefiniteExecution = true

let url = NSURL(string: "https://app.ticketmaster.eu/mfxapi/v1/event/449621/seatmap?domain_ids
")!
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

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /event/449621/seatmap?domain_ids HTTP/1.1
Host: https://app.ticketmaster.eu/mfxapi/v1
Accept: application/json
Content-Length: 0
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Server: Cowboy
Connection: keep-alive
X-Newrelic-App-Data: PxQDVFVRCQITVlZRDgcFV0YdFHYaFhEHQxFSERd/cWYcShNDHVEdUlUDG1FIUggCBlNWUgAFG1RUAhoRU1NUVAkEC1JaAFEBVwEbTVcAXxEBaw==
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT
Access-Control-Max-Age: 10
X-Apiary-Transaction-Id: 5698e2a58392e30b00af97e0
Content-Length: 203
Date: Fri, 15 Jan 2016 12:16:37 GMT
Via: 1.1 vegur

{
  "event": {
    "id": "440837",
    "seatmap": {
      "static": {
        "images": [
          {
            "url": "http://media.ticketmaster.eu/norway/9c1d6c2026eff803098724ab90132fa2.png"
          }
        ]
      }
    }
  }
}
{% endhighlight %}


{: .article #event-areas}
### Event Areas 
Get information on the seating areas available for an event and the prices for tickets.

{: .code.red}
https://app.ticketmaster.eu/mfxapi/v1/event/{event_id}/areas

| Parameters | Optional values | Type | Required |
| ---------- | --------------- | ---- | -------- |
|`event_id` | A unique identifier for the event which is specific to the domain. Example: 449621. | Integer | Yes|
|`domain_ids` | The unique identifier for the domain or market. Although optional, this is recommended. Example: norway. | string | No |
|`lang` | The language in ISO code format. Example: no-no. | string | No |

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

request.open('GET', '/event/449621/areas?domain_ids&lang');

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

{% highlight bash %}
curl --include \
     --header "Accept: application/json" \
  'https://app.ticketmaster.eu/mfxapi/v1/event/449621/areas?domain_ids&lang'
{% endhighlight %}

{% highlight java %}
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
Response response = client.target("https://app.ticketmaster.eu/mfxapi/v1/event/{event_id}/areas?domain_ids&#38;lang")
  .request(MediaType.TEXT_PLAIN_TYPE)
  .header("Accept", "application/json")
  .get();

System.out.println("status: " + response.getStatus());
System.out.println("headers: " + response.getHeaders());
System.out.println("body:" + response.readEntity(String.class));
{% endhighlight %}


{% highlight js %}
var request = require('request');

request({
  method: 'GET',
  url: 'https://app.ticketmaster.eu/mfxapi/v1/event/449621/areas?domain_ids&lang',
  headers: {
    'Accept': 'application/json'
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
{% endhighlight %}


{% highlight perl %}
require LWP::UserAgent;

my $ua   = LWP::UserAgent->new;

$ua->default_header("Accept" => "application/json");

my $response = $ua->get("https://app.ticketmaster.eu/mfxapi/v1/event/449621/areas?domain_ids&lang");

print $response->as_string;
{% endhighlight %}

{% highlight python %}
from urllib2 import Request, urlopen

headers = {
  'Accept': 'application/json'
}
request = Request('https://app.ticketmaster.eu/mfxapi/v1/event/449621/areas?domain_ids&lang', headers=headers)

response_body = urlopen(request).read()
print response_body
{% endhighlight %}

{% highlight php %}
<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://app.ticketmaster.eu/mfxapi/v1/event/449621/areas?domain_ids&lang");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Accept: application/json"
));

$response = curl_exec($ch);
curl_close($ch);

var_dump($response);
{% endhighlight %}


{% highlight ruby %}
require 'rubygems' if RUBY_VERSION < '1.9'
require 'rest_client'

headers = {
  :accept => 'application/json'
}

response = RestClient.get 'https://app.ticketmaster.eu/mfxapi/v1/event/449621/areas?domain_ids&lang', headers
puts response
{% endhighlight %}


{% highlight go %}
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	client := &http.Client{}

	req, _ := http.NewRequest("GET", "https://app.ticketmaster.eu/mfxapi/v1/event/449621/areas?domain_ids&lang", nil)

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


{% highlight csharp %}
//Common testing requirement. If you are consuming an API in a sandbox/test region, uncomment this line of code ONLY for non production uses.
//System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };

//Be sure to run "Install-Package Microsoft.Net.Http" from your nuget command line.
using System;
using System.Net.Http;

var baseAddress = new Uri("https://app.ticketmaster.eu/mfxapi/v1/");

using (var httpClient = new HttpClient{ BaseAddress = baseAddress })
{

  httpClient.DefaultRequestHeaders.TryAddWithoutValidation("accept", "application/json");
  
  using(var response = await httpClient.GetAsync("event/{event_id}/areas?domain_ids&lang"))
  { 
        string responseData = await response.Content.ReadAsStringAsync();
  }
}
{% endhighlight %}


{% highlight vb %}
Dim request = TryCast(System.Net.WebRequest.Create("https://app.ticketmaster.eu/mfxapi/v1/event/449621/areas?domain_ids&lang"), System.Net.HttpWebRequest)

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


{% highlight groovy %}
import groovyx.net.http.RESTClient
import static groovyx.net.http.ContentType.JSON
import groovy.json.JsonSlurper
import groovy.json.JsonOutput

@Grab (group = 'org.codehaus.groovy.modules.http-builder', module = 'http-builder', version = '0.5.0')
def client = new RESTClient("https://app.ticketmaster.eu/mfxapi/v1")

def emptyHeaders = [:]
emptyHeaders."Accept" = "application/json"

response = client.get( path : "/event/{event_id}/areas?domain_ids&lang", headers: emptyHeaders )

println("Status:" + response.status)

if (response.data) {
  println("Content Type: " + response.contentType)
  println("Body:\n" + JsonOutput.prettyPrint(JsonOutput.toJson(response.data)))
}
{% endhighlight %}


{% highlight objc %}
NSURL *URL = [NSURL URLWithString:@"https://app.ticketmaster.eu/mfxapi/v1/event/449621/areas?domain_ids&lang"];

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


{% highlight swift %}
// NOTE: Uncommment following two lines for use in a Playground
// import XCPlayground
// XCPlaygroundPage.currentPage.needsIndefiniteExecution = true

let url = NSURL(string: "https://app.ticketmaster.eu/mfxapi/v1/event/449621/areas?domain_ids&lang")!
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

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /event/449621/areas?domain_ids&lang HTTP/1.1
Host: https://app.ticketmaster.eu/mfxapi/v1
Accept: application/json
Content-Length: 0
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Server: Cowboy
Connection: keep-alive
X-Newrelic-App-Data: PxQDVFVRCQITVlZRDgcFV0YdFHYaFhEHQxFSERd/cWYcShNDHUwDTFQGBU1WTQgLB1VUUgQIBUpXBgIfQAAHBAUAClIPDQIFVQABQx0HUg4XU2o=
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT
Access-Control-Max-Age: 10
X-Apiary-Transaction-Id: 5698e3f38796480b004119c9
Content-Length: 374
Date: Fri, 15 Jan 2016 12:16:37 GMT
Via: 1.1 vegur

{
  "event": {
    "id": 139503,
    "areas": [
      {
        "code": "GR",
        "name": "Staanplaats",
        "price_level_ids": [
          1
        ],
        "price_ranges": {
          "excluding_ticket_fees": {
            "min": 37.5,
            "max": 37.5
          },
          "including_ticket_fees": {
            "min": 237.5,
            "max": 237.5
          }
        }
      }
    ],
    "currency": "EUR"
  }
}
{% endhighlight %}


{: .article}
## Attractions Service 
The Attractions Service API allows you to search for attractions, get details for specific attractions, and support for suggest as you type. 
An attraction can be a music artist, a type of sport, a play or show, and so on.
{: .lead.article}

{: .article #attraction-search}
### Attraction Search 

Find attractions (artists, sports, packages, plays and so on) and filter your search by name, and much more.
 
{: .code.red}
https://app.ticketmaster.eu/mfxapi/v1/attractions

#### Query Parameters

##### Domain (Market) 
Although not required, it's advisable to specify a domain or domains. The domain relates to the Ticketmaster website 
through which tickets are listed and sold. (It differs from Country which is the geographical location). You can use the 
Domains List Service for a list of domains and default URL, language, and currency. Use a comma separated list of values 
to search multile domains. (A logical OR search is performed).

| Parameters | Optional values | Type |
| -------- | | ------------------ |
|`domain_ids` | norway , sweden , finland , belgium, netherlands, denmark, germany, austria, unitedarabemirates, canada, poland | string |

##### Pagination 
You can paginate the results by specifying the number of rows to return, and the start row. There is a maximum of 500 

+ `rows.start` = `0` (optional, integer)

##### Sorting 
You can specify a sorting method and order. Options include event name, event date, popularity, and proximity (based on 
the lat and long) with ascending or descending order. The default is eventdate and ascending.

sort_by = attraction_name (optional, string)attraction_namepopulatityorder = asc (optional, string)asc desc

| Parameters | Optional values | Type |
| -------- | | ------------------ |
|`sort_by` | attraction_name, populatity | string |
|`order` | asc, desc | string |

##### *Other Parameters*
There are additional parameters which allow you to filter the search by attraction name, and attractions with events on sale.

| Parameters | Optional values | Type | Required |
| ---------- | --------------- | ---- | -------- |
|`domain_ids` | The unique identifier for the domain or market. Use a comma separated list of values to search multiple domains. (A logical OR search is performed). Example: norway. | string | No |
|`lang` | The language in ISO code format. The default language is specified in the Domains List service. Usually two or three languages are supported. Example: no-no. | string | No |
|`attraction_name` | The attraction name which can be a partial name (one word) or full name. Example: Kings of Convenience. | Integer | No |
|`attraction_ids` | The unique identifier for the attraction (which could be an artist, or sport, package and so on). Use a comma separated list of values to search multiple. (A logical OR search is performed). Example: 709593. | string | No |
|`has_events` | A flag which when set to 'true' gives only attractions with events on sale.| boolean | No |
|`sort_by` | The method for sorting the results. Proximity can only be used where a lat and long is used as a query parameter. Default: attraction_name.| string | No |
|`order` | The order in which results are sorted, whether ascending or descending. Default: asc. | string | No |
|`rows` | The number of rows to return, up to a maximum of 500. Default: 10. | Integer | No |
|`start` | The offset for pagination which specifies the start row to return. Default: 0. | Integer | No |

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

request.open('GET', '/attractions?domain_ids&lang&attraction_ids&attraction_name&has_events&sort_by&order&rows&start');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

request.send();
{% endhighlight %}

{% highlight bash %}
curl --include \
     --header "Accept: application/json" \
  '/attractions?domain_ids&lang&attraction_ids&attraction_name&has_events&sort_by&order&rows&start'
{% endhighlight %}

{% highlight java %}
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
Response response = client.target("https://app.ticketmaster.eu/mfxapi/v1/attractions?domain_ids&#38;lang&#38;attraction_ids&#38;attraction_name&#38;has_events&#38;sort_by&#38;order&#38;rows&#38;start")
  .request(MediaType.TEXT_PLAIN_TYPE)
  .header("Accept", "application/json")
  .get();

System.out.println("status: " + response.getStatus());
System.out.println("headers: " + response.getHeaders());
System.out.println("body:" + response.readEntity(String.class));
{% endhighlight %}


{% highlight js %}
var request = require('request');

request({
  method: 'GET',
  url: 'https://app.ticketmaster.eu/mfxapi/v1/attractions?domain_ids&lang&attraction_ids&attraction_name&has_events&sort_by&order&rows&start',
  headers: {
    'Accept': 'application/json'
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
{% endhighlight %}


{% highlight perl %}
require LWP::UserAgent;

my $ua   = LWP::UserAgent->new;

$ua->default_header("Accept" => "application/json");

my $response = $ua->get("https://app.ticketmaster.eu/mfxapi/v1/attractions?domain_ids&lang&attraction_ids&attraction_name&has_events&sort_by&order&rows&start");

print $response->as_string;

{% endhighlight %}

{% highlight python %}
from urllib2 import Request, urlopen

headers = {
  'Accept': 'application/json'
}
request = Request('https://app.ticketmaster.eu/mfxapi/v1/attractions?domain_ids&lang&attraction_ids&attraction_name&has_events&sort_by&order&rows&start', headers=headers)

response_body = urlopen(request).read()
print response_body
{% endhighlight %}

{% highlight php %}
<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://app.ticketmaster.eu/mfxapi/v1/attractions?domain_ids&lang&attraction_ids&attraction_name&has_events&sort_by&order&rows&start");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Accept: application/json"
));

$response = curl_exec($ch);
curl_close($ch);

var_dump($response);
{% endhighlight %}


{% highlight ruby %}
require 'rubygems' if RUBY_VERSION < '1.9'
require 'rest_client'

headers = {
  :accept => 'application/json'
}

response = RestClient.get 'https://app.ticketmaster.eu/mfxapi/v1/attractions?domain_ids&lang&attraction_ids&attraction_name&has_events&sort_by&order&rows&start', headers
puts response
{% endhighlight %}


{% highlight go %}
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	client := &http.Client{}

	req, _ := http.NewRequest("GET", "https://app.ticketmaster.eu/mfxapi/v1/attractions?domain_ids&lang&attraction_ids&attraction_name&has_events&sort_by&order&rows&start", nil)

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


{% highlight csharp %}
//Common testing requirement. If you are consuming an API in a sandbox/test region, uncomment this line of code ONLY for non production uses.
//System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };

//Be sure to run "Install-Package Microsoft.Net.Http" from your nuget command line.
using System;
using System.Net.Http;

var baseAddress = new Uri("https://app.ticketmaster.eu/mfxapi/v1/");

using (var httpClient = new HttpClient{ BaseAddress = baseAddress })
{

  httpClient.DefaultRequestHeaders.TryAddWithoutValidation("accept", "application/json");
  
  using(var response = await httpClient.GetAsync("attractions?domain_ids&lang&attraction_ids&attraction_name&has_events&sort_by&order&rows&start"))
  { 
        string responseData = await response.Content.ReadAsStringAsync();
  }
}
{% endhighlight %}


{% highlight vb %}
Dim request = TryCast(System.Net.WebRequest.Create("https://app.ticketmaster.eu/mfxapi/v1/attractions?domain_ids&lang&attraction_ids&attraction_name&has_events&sort_by&order&rows&start"), System.Net.HttpWebRequest)

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


{% highlight groovy %}
import groovyx.net.http.RESTClient
import static groovyx.net.http.ContentType.JSON
import groovy.json.JsonSlurper
import groovy.json.JsonOutput

@Grab (group = 'org.codehaus.groovy.modules.http-builder', module = 'http-builder', version = '0.5.0')
def client = new RESTClient("https://app.ticketmaster.eu/mfxapi/v1")

def emptyHeaders = [:]
emptyHeaders."Accept" = "application/json"

response = client.get( path : "/attractions?domain_ids&lang&attraction_ids&attraction_name&has_events&sort_by&order&rows&start", headers: emptyHeaders )

println("Status:" + response.status)

if (response.data) {
  println("Content Type: " + response.contentType)
  println("Body:\n" + JsonOutput.prettyPrint(JsonOutput.toJson(response.data)))
}
{% endhighlight %}


{% highlight objc %}
NSURL *URL = [NSURL URLWithString:@"https://app.ticketmaster.eu/mfxapi/v1/attractions?domain_ids&lang&attraction_ids&attraction_name&has_events&sort_by&order&rows&start"];

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


{% highlight swift %}
// NOTE: Uncommment following two lines for use in a Playground
// import XCPlayground
// XCPlaygroundPage.currentPage.needsIndefiniteExecution = true

let url = NSURL(string: "https://app.ticketmaster.eu/mfxapi/v1/attractions?domain_ids&lang&attraction_ids&attraction_name&has_events&sort_by&order&rows&start")!
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

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /attractions?domain_ids&lang&attraction_ids&attraction_name&has_events&sort_by&order&rows&start HTTP/1.1
Host: https://app.ticketmaster.eu/mfxapi/v1
Accept: application/json
Content-Length: 0
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Server: Cowboy
Connection: keep-alive
X-Newrelic-App-Data: PxQDVFVRCQITVlZRDgcFV0YdFHYaFhEHQxFSERd/cWYcShNDHVEdV1AaB09UUQoBCFJYVQ4dAVZSHRQLVgJTVglVAQANWgBWC0cVB1ANQAc5
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT
Access-Control-Max-Age: 10
X-Apiary-Transaction-Id: 5698ff57b152b20b00fb5cbf
Content-Length: 606
Date: Fri, 15 Jan 2016 12:16:37 GMT
Via: 1.1 vegur

{
  "attractions": [
    {
      "id": 709593,
      "name": "Royal Blood",
      "url": "http://www.ticketmaster.nl/artist/royal-blood-tickets/709593?track=DiscoveryAPI",
      "images": [
        {
          "url": "http://media.ticketmaster.com/img/tat/cft1/201409/01/459810.jpg?track=DiscoveryAPI",
          "type": "standard",
          "width": 205,
          "height": 115
        },
        {
          "url": "http://media.ticketmaster.com/img/tat/cft1/201409/01/459800.jpg?track=DiscoveryAPI",
          "type": "large",
          "width": 305,
          "height": 225
        }
      ],
      "event_count": 1
    }
  ],
  "pagination": {
    "start": 0,
    "rows": 1,
    "total": 1
  }
}
{% endhighlight %}


{: .article #attraction-details}
### Attraction Details 
Get details for a specific event using the unique identifer for the event.

{: .code.red}
https://app.ticketmaster.eu/mfxapi/v1/attraction/{attraction_ids}

| Parameters | Optional values | Type | Required |
| ---------- | --------------- | ---- | -------- |
|`attraction_ids` | A unique identifier for the attraction which is specific to the domain. Example: 709593. | Integer | Yes |
|`lang` | The language in ISO code format. Example: no-no. | string | No |
|`domain_ids` | The unique identifier for the domain or market. Although optional, this is recommended. Example: norway. | string | Yes |

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

request.open('GET', '/attraction/709593?lang&domain_ids');

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

{% highlight bash %}
curl --include \
     --header "Accept: application/json" \
  'https://app.ticketmaster.eu/mfxapi/v1/attraction/709593?lang&domain_ids'
{% endhighlight %}

{% highlight java %}
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
Response response = client.target("https://app.ticketmaster.eu/mfxapi/v1/attraction/{attraction_id}?lang&#38;domain_ids")
  .request(MediaType.TEXT_PLAIN_TYPE)
  .header("Accept", "application/json")
  .get();

System.out.println("status: " + response.getStatus());
System.out.println("headers: " + response.getHeaders());
System.out.println("body:" + response.readEntity(String.class));
{% endhighlight %}


{% highlight js %}
var request = require('request');

request({
  method: 'GET',
  url: 'https://app.ticketmaster.eu/mfxapi/v1/attraction/709593?lang&domain_ids',
  headers: {
    'Accept': 'application/json'
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
{% endhighlight %}


{% highlight perl %}
require LWP::UserAgent;

my $ua   = LWP::UserAgent->new;

$ua->default_header("Accept" => "application/json");

my $response = $ua->get("https://app.ticketmaster.eu/mfxapi/v1/attraction/709593?lang&domain_ids");

print $response->as_string;
{% endhighlight %}

{% highlight python %}
from urllib2 import Request, urlopen

headers = {
  'Accept': 'application/json'
}
request = Request('https://app.ticketmaster.eu/mfxapi/v1/attraction/709593?lang&domain_ids', headers=headers)

response_body = urlopen(request).read()
print response_body
{% endhighlight %}

{% highlight php %}
<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://app.ticketmaster.eu/mfxapi/v1/attraction/709593?lang&domain_ids");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Accept: application/json"
));

$response = curl_exec($ch);
curl_close($ch);

var_dump($response);
{% endhighlight %}


{% highlight ruby %}
require 'rubygems' if RUBY_VERSION < '1.9'
require 'rest_client'

headers = {
  :accept => 'application/json'
}

response = RestClient.get 'https://app.ticketmaster.eu/mfxapi/v1/attraction/709593?lang&domain_ids', headers
puts response
{% endhighlight %}


{% highlight go %}
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	client := &http.Client{}

	req, _ := http.NewRequest("GET", "https://app.ticketmaster.eu/mfxapi/v1/attraction/709593?lang&domain_ids", nil)

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


{% highlight csharp %}
//Common testing requirement. If you are consuming an API in a sandbox/test region, uncomment this line of code ONLY for non production uses.
//System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };

//Be sure to run "Install-Package Microsoft.Net.Http" from your nuget command line.
using System;
using System.Net.Http;

var baseAddress = new Uri("https://app.ticketmaster.eu/mfxapi/v1/");

using (var httpClient = new HttpClient{ BaseAddress = baseAddress })
{

  httpClient.DefaultRequestHeaders.TryAddWithoutValidation("accept", "application/json");
  
  using(var response = await httpClient.GetAsync("attraction/{attraction_id}?lang&domain_ids"))
  { 
        string responseData = await response.Content.ReadAsStringAsync();
  }
}
{% endhighlight %}


{% highlight vb %}
Dim request = TryCast(System.Net.WebRequest.Create("https://app.ticketmaster.eu/mfxapi/v1/attraction/709593?lang&domain_ids"), System.Net.HttpWebRequest)

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


{% highlight groovy %}
import groovyx.net.http.RESTClient
import static groovyx.net.http.ContentType.JSON
import groovy.json.JsonSlurper
import groovy.json.JsonOutput

@Grab (group = 'org.codehaus.groovy.modules.http-builder', module = 'http-builder', version = '0.5.0')
def client = new RESTClient("https://app.ticketmaster.eu/mfxapi/v1")

def emptyHeaders = [:]
emptyHeaders."Accept" = "application/json"

response = client.get( path : "/attraction/{attraction_id}?lang&domain_ids", headers: emptyHeaders )

println("Status:" + response.status)

if (response.data) {
  println("Content Type: " + response.contentType)
  println("Body:\n" + JsonOutput.prettyPrint(JsonOutput.toJson(response.data)))
}
{% endhighlight %}


{% highlight objc %}
NSURL *URL = [NSURL URLWithString:@"https://app.ticketmaster.eu/mfxapi/v1/attraction/709593?lang&domain_ids"];

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


{% highlight swift %}
// NOTE: Uncommment following two lines for use in a Playground
// import XCPlayground
// XCPlaygroundPage.currentPage.needsIndefiniteExecution = true

let url = NSURL(string: "https://app.ticketmaster.eu/mfxapi/v1/attraction/709593?lang&domain_ids")!
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
{% endhighlight %}

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /attraction/709593?lang&domain_ids HTTP/1.1
Host: https://app.ticketmaster.eu/mfxapi/v1
Accept: application/json
Content-Length: 0
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Server: Cowboy
Connection: keep-alive
X-Newrelic-App-Data: PxQDVFVRCQITVlZRDgcFV0YdFHYaFhEHQxFSERd/cWYcShNDHUwDTFQGBU1WTQkDAFVZWwEJB19dCA8KW19aTgRUCE4aXFdTUAZdAwBTVlABAg9DSgVZX0MBPA==
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT
Access-Control-Max-Age: 10
X-Apiary-Transaction-Id: 5699031d8392e30b00afb209
Content-Length: 460
Date: Fri, 15 Jan 2016 12:16:37 GMT
Via: 1.1 vegur

{
  "id": 13047,
  "name": "Belle & Sebastian",
  "url": "http://www.billettservice.no/artist/belle-sebastian-tickets/13047?track=DiscoveryAPI",
  "images": [
    {
      "url": "http://media.ticketmaster.com/img/tat/cft1/201501/19/558680.jpg?track=DiscoveryAPI",
      "type": "standard",
      "width": 205,
      "height": 115
    },
    {
      "url": "http://media.ticketmaster.com/img/tat/cft1/201501/19/558670.jpg?track=DiscoveryAPI",
      "type": "large",
      "width": 305,
      "height": 225
    }
  ],
  "event_count": 2
}
{% endhighlight %}


{: .article #attraction-suggestions}
### Attraction Suggestions 
Get suggestions for attractions based on the first 2 characters of the name. The top matching attractions are returned 
and sorted by popularity in descending order. Unlike the Attractions Search service, this service allows a degree of 
partial and fuzzy matching and can therefore be used for a suggest-as-you type feature. The response provides limited 
fields compared to the Attraction Search to allow for more real-time display.

{: .code.red}
https://app.ticketmaster.eu/mfxapi/v1/attractions/suggestions

| Parameters | Optional values | Type | Required |
| ---------- | --------------- | ---- | -------- |
|`attraction_name` | The attraction name which must be a minimum of 3 characters. Example: Foo. | Integer | Yes |
|`lang` | The language in ISO code format. Example: no-no. | string | No |
|`domain_ids` | The unique identifier for the domain or market. Use a comma separated list of values to search multiple domains. (A logical OR search is performed). Example: norway. | string | No |
|`has_events` | A flag which when set to 'true' gives only attractions with events on sale. | boolean | No |

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

request.open('GET', '/attractions/suggestions?attraction_name&lang&domain_ids&has_events');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

request.send();
{% endhighlight %}

{% highlight bash %}
curl --include \
     --header "Accept: application/json" \
  '/attractions/suggestions?attraction_name&lang&domain_ids&has_events'
{% endhighlight %}

{% highlight java %}
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
Response response = client.target("https://app.ticketmaster.eu/mfxapi/v1/attractions/suggestions?attraction_name&#38;lang&#38;domain_ids&#38;has_events")
  .request(MediaType.TEXT_PLAIN_TYPE)
  .header("Accept", "application/json")
  .get();

System.out.println("status: " + response.getStatus());
System.out.println("headers: " + response.getHeaders());
System.out.println("body:" + response.readEntity(String.class));
{% endhighlight %}


{% highlight js %}
var request = require('request');

request({
  method: 'GET',
  url: 'https://app.ticketmaster.eu/mfxapi/v1/attractions/suggestions?attraction_name&lang&domain_ids&has_events',
  headers: {
    'Accept': 'application/json'
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
{% endhighlight %}


{% highlight perl %}
require LWP::UserAgent;

my $ua   = LWP::UserAgent->new;

$ua->default_header("Accept" => "application/json");

my $response = $ua->get("https://app.ticketmaster.eu/mfxapi/v1/attractions/suggestions?attraction_name&lang&domain_ids&has_events");

print $response->as_string;
{% endhighlight %}

{% highlight python %}
from urllib2 import Request, urlopen

headers = {
  'Accept': 'application/json'
}
request = Request('https://app.ticketmaster.eu/mfxapi/v1/attractions/suggestions?attraction_name&lang&domain_ids&has_events', headers=headers)

response_body = urlopen(request).read()
print response_body
{% endhighlight %}

{% highlight php %}
<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://app.ticketmaster.eu/mfxapi/v1/attractions/suggestions?attraction_name&lang&domain_ids&has_events");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Accept: application/json"
));

$response = curl_exec($ch);
curl_close($ch);

var_dump($response);
{% endhighlight %}


{% highlight ruby %}
require 'rubygems' if RUBY_VERSION < '1.9'
require 'rest_client'

headers = {
  :accept => 'application/json'
}

response = RestClient.get 'https://app.ticketmaster.eu/mfxapi/v1/attractions/suggestions?attraction_name&lang&domain_ids&has_events', headers
puts response
{% endhighlight %}


{% highlight go %}
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	client := &http.Client{}

	req, _ := http.NewRequest("GET", "https://app.ticketmaster.eu/mfxapi/v1/attractions/suggestions?attraction_name&lang&domain_ids&has_events", nil)

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


{% highlight csharp %}
//Common testing requirement. If you are consuming an API in a sandbox/test region, uncomment this line of code ONLY for non production uses.
//System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };

//Be sure to run "Install-Package Microsoft.Net.Http" from your nuget command line.
using System;
using System.Net.Http;

var baseAddress = new Uri("https://app.ticketmaster.eu/mfxapi/v1/");

using (var httpClient = new HttpClient{ BaseAddress = baseAddress })
{

  httpClient.DefaultRequestHeaders.TryAddWithoutValidation("accept", "application/json");
  
  using(var response = await httpClient.GetAsync("attractions/suggestions?attraction_name&lang&domain_ids&has_events"))
  { 
        string responseData = await response.Content.ReadAsStringAsync();
  }
}
{% endhighlight %}


{% highlight vb %}
Dim request = TryCast(System.Net.WebRequest.Create("https://app.ticketmaster.eu/mfxapi/v1/attractions/suggestions?attraction_name&lang&domain_ids&has_events"), System.Net.HttpWebRequest)

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


{% highlight groovy %}
import groovyx.net.http.RESTClient
import static groovyx.net.http.ContentType.JSON
import groovy.json.JsonSlurper
import groovy.json.JsonOutput

@Grab (group = 'org.codehaus.groovy.modules.http-builder', module = 'http-builder', version = '0.5.0')
def client = new RESTClient("https://app.ticketmaster.eu/mfxapi/v1")

def emptyHeaders = [:]
emptyHeaders."Accept" = "application/json"

response = client.get( path : "/attractions/suggestions?attraction_name&lang&domain_ids&has_events", headers: emptyHeaders )

println("Status:" + response.status)

if (response.data) {
  println("Content Type: " + response.contentType)
  println("Body:\n" + JsonOutput.prettyPrint(JsonOutput.toJson(response.data)))
}
{% endhighlight %}


{% highlight objc %}
NSURL *URL = [NSURL URLWithString:@"https://app.ticketmaster.eu/mfxapi/v1/attractions/suggestions?attraction_name&lang&domain_ids&has_events"];

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


{% highlight swift %}
// NOTE: Uncommment following two lines for use in a Playground
// import XCPlayground
// XCPlaygroundPage.currentPage.needsIndefiniteExecution = true

let url = NSURL(string: "https://app.ticketmaster.eu/mfxapi/v1/attractions/suggestions?attraction_name&lang&domain_ids&has_events")!
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

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /attractions/suggestions?attraction_name&lang&domain_ids&has_events HTTP/1.1
Host: https://app.ticketmaster.eu/mfxapi/v1
Accept: application/json
Content-Length: 0
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Server: Cowboy
Connection: keep-alive
X-Newrelic-App-Data: PxQDVFVRCQITVlZRDgcFV0YdFHYaFhEHQxFSERd/cWYcShNDHVEdUlQBG1FIUgkGB1FXWgECDl9dCA8KW19PWgNQFEBaDwUEC1UAAFdRV1ddBhVNAAJUQFU5
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT
Access-Control-Max-Age: 10
X-Apiary-Transaction-Id: 569903c78392e30b00afb2a5
Content-Length: 832
Date: Fri, 15 Jan 2016 12:16:37 GMT
Via: 1.1 vegur

{
  "attractions": [
    {
      "id": 2990,
      "name": "Foo Fighters",
      "url": "http://www.billettservice.no/artist/foo-fighters-tickets/2990?track=DiscoveryAPI",
      "event_count": 1
    },
    {
      "id": 937856,
      "name": "Fighting Foo",
      "url": "http://www.billettservice.no/artist/fighting-foo-tickets/937856?track=DiscoveryAPI",
      "event_count": 1
    },
    {
      "id": 903917,
      "name": "Sound Of Irish Footprints",
      "url": "http://www.billettservice.no/artist/sound-of-irish-footprints-tickets/903917?track=DiscoveryAPI",
      "event_count": 0
    },
    {
      "id": 947297,
      "name": "Food With Friends",
      "url": "http://www.billettservice.no/artist/food-with-friends-tickets/947297?track=DiscoveryAPI",
      "event_count": 0
    },
    {
      "id": 953756,
      "name": "The Football Ramble",
      "url": "http://www.billettservice.no/artist/the-football-ramble-tickets/953756?track=DiscoveryAPI",
      "event_count": 0
    }
  ]
}
{% endhighlight %}


{: .article #similar-attractions}
### Similar Attractions 
Get back other attractions which are similar to the attraction specified. This is based on a combination of factors 
including category and sub-category, and ticket sales (users who purchased this attraction also purchased).

{: .code.red}
https://app.ticketmaster.eu/mfxapi/v1/attractions/similar

| Parameters | Optional values | Type | Required |
| ---------- | --------------- | ---- | -------- |
|`attraction_id` | The ID of the attraction for which similar attractions are requested. Example: Foo. | Integer | Yes |
|`lang` | The language in ISO code format. Example: no-no. | string | No |
|`domain_ids` | The unique identifier for the domain or market. Although optional, this is recommended. Example: norway. | string | No |
|`has_events` | A flag which when set to 'true' gives only attractions with events on sale. | boolean | No |
|`rows` | The number of rows to return. The default is 10. | Integer | No |

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

request.open('GET', '/attractions/similar?attraction_id&lang&domain_id&has_events&rows');

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

{% highlight bash %}
curl --include \
     --header "Accept: application/json" \
  '/attractions/similar?attraction_id&lang&domain_id&has_events&rows'
{% endhighlight %}


{% highlight java %}
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
Response response = client.target("https://app.ticketmaster.eu/mfxapi/v1/attractions/similar?attraction_id&#38;lang&#38;domain_id&#38;has_events&#38;rows")
  .request(MediaType.TEXT_PLAIN_TYPE)
  .header("Accept", "application/json")
  .get();

System.out.println("status: " + response.getStatus());
System.out.println("headers: " + response.getHeaders());
System.out.println("body:" + response.readEntity(String.class));
{% endhighlight %}


{% highlight js %}
var request = require('request');

request({
  method: 'GET',
  url: 'https://app.ticketmaster.eu/mfxapi/v1/attractions/similar?attraction_id&lang&domain_id&has_events&rows',
  headers: {
    'Accept': 'application/json'
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
{% endhighlight %}


{% highlight perl %}
require LWP::UserAgent;

my $ua   = LWP::UserAgent->new;

$ua->default_header("Accept" => "application/json");

my $response = $ua->get("https://app.ticketmaster.eu/mfxapi/v1/attractions/similar?attraction_id&lang&domain_id&has_events&rows");

print $response->as_string;
{% endhighlight %}

{% highlight python %}
from urllib2 import Request, urlopen

headers = {
  'Accept': 'application/json'
}
request = Request('https://app.ticketmaster.eu/mfxapi/v1/attractions/similar?attraction_id&lang&domain_id&has_events&rows', headers=headers)

response_body = urlopen(request).read()
print response_body
{% endhighlight %}

{% highlight php %}
<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://app.ticketmaster.eu/mfxapi/v1/attractions/similar?attraction_id&lang&domain_id&has_events&rows");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Accept: application/json"
));

$response = curl_exec($ch);
curl_close($ch);

var_dump($response);
{% endhighlight %}


{% highlight ruby %}
require 'rubygems' if RUBY_VERSION < '1.9'
require 'rest_client'

headers = {
  :accept => 'application/json'
}

response = RestClient.get 'https://app.ticketmaster.eu/mfxapi/v1/attractions/similar?attraction_id&lang&domain_id&has_events&rows', headers
puts response
{% endhighlight %}


{% highlight go %}
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	client := &http.Client{}

	req, _ := http.NewRequest("GET", "https://app.ticketmaster.eu/mfxapi/v1/attractions/similar?attraction_id&lang&domain_id&has_events&rows", nil)

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


{% highlight csharp %}
//Common testing requirement. If you are consuming an API in a sandbox/test region, uncomment this line of code ONLY for non production uses.
//System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };

//Be sure to run "Install-Package Microsoft.Net.Http" from your nuget command line.
using System;
using System.Net.Http;

var baseAddress = new Uri("https://app.ticketmaster.eu/mfxapi/v1/");

using (var httpClient = new HttpClient{ BaseAddress = baseAddress })
{

  httpClient.DefaultRequestHeaders.TryAddWithoutValidation("accept", "application/json");
  
  using(var response = await httpClient.GetAsync("attractions/similar?attraction_id&lang&domain_id&has_events&rows"))
  { 
        string responseData = await response.Content.ReadAsStringAsync();
  }
}
{% endhighlight %}


{% highlight vb %}
Dim request = TryCast(System.Net.WebRequest.Create("https://app.ticketmaster.eu/mfxapi/v1/attractions/similar?attraction_id&lang&domain_id&has_events&rows"), System.Net.HttpWebRequest)

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


{% highlight groovy %}
import groovyx.net.http.RESTClient
import static groovyx.net.http.ContentType.JSON
import groovy.json.JsonSlurper
import groovy.json.JsonOutput

@Grab (group = 'org.codehaus.groovy.modules.http-builder', module = 'http-builder', version = '0.5.0')
def client = new RESTClient("https://app.ticketmaster.eu/mfxapi/v1")

def emptyHeaders = [:]
emptyHeaders."Accept" = "application/json"

response = client.get( path : "/attractions/similar?attraction_id&lang&domain_id&has_events&rows", headers: emptyHeaders )

println("Status:" + response.status)

if (response.data) {
  println("Content Type: " + response.contentType)
  println("Body:\n" + JsonOutput.prettyPrint(JsonOutput.toJson(response.data)))
}
{% endhighlight %}


{% highlight objc %}
NSURL *URL = [NSURL URLWithString:@"https://app.ticketmaster.eu/mfxapi/v1/attractions/similar?attraction_id&lang&domain_id&has_events&rows"];

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


{% highlight swift %}
// NOTE: Uncommment following two lines for use in a Playground
// import XCPlayground
// XCPlaygroundPage.currentPage.needsIndefiniteExecution = true

let url = NSURL(string: "https://app.ticketmaster.eu/mfxapi/v1/attractions/similar?attraction_id&lang&domain_id&has_events&rows")!
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

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /attractions/similar?attraction_id&lang&domain_id&has_events&rows HTTP/1.1
Host: https://app.ticketmaster.eu/mfxapi/v1
Accept: application/json
Content-Length: 0
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Server: Cowboy
Connection: keep-alive
X-Newrelic-App-Data: PxQDVFVRCQITVlZRDgcFV0YdFHYaFhEHQxFSERd/cWYcShNDHVEdUlQEG1FIUgkHAl1YWgEHG1dRBwAfQF8BB1FTWgBZAAJRCwAJQx0HUg4XU2o=
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT
Access-Control-Max-Age: 10
X-Apiary-Transaction-Id: 569904da877a580b00514c99
Content-Length: 1566
Date: Fri, 15 Jan 2016 12:16:37 GMT
Via: 1.1 vegur

{
  "attractions": [
    {
      "id": 8073,
      "name": "WU-TANG CLAN",
      "url": "http://www.ticketmaster.de/artist/wu-tang-clan-tickets/8073?track=DiscoveryAPI",
      "event_count": 5
    },
    {
      "id": 3148,
      "name": "SNOOP DOGG AKA SNOOP LION",
      "url": "http://www.ticketmaster.de/artist/snoop-dogg-aka-snoop-lion-tickets/3148?track=DiscoveryAPI",
      "event_count": 0
    },
    {
      "id": 404083,
      "name": "Die Antwoord",
      "url": "http://www.ticketmaster.de/artist/die-antwoord-tickets/404083?track=DiscoveryAPI",
      "event_count": 0
    },
    {
      "id": 951687,
      "name": "Rockavaria 2015",
      "url": "http://www.ticketmaster.de/artist/rockavaria-2015-tickets/951687?track=DiscoveryAPI",
      "event_count": 0
    },
    {
      "id": 3017,
      "name": "Social Distortion",
      "url": "http://www.ticketmaster.de/artist/social-distortion-tickets/3017?track=DiscoveryAPI",
      "event_count": 0
    },
    {
      "id": 20912,
      "name": "The Black Keys",
      "url": "http://www.ticketmaster.de/artist/the-black-keys-tickets/20912?track=DiscoveryAPI",
      "event_count": 0
    },
    {
      "id": 85593,
      "name": "THE XX",
      "url": "http://www.ticketmaster.de/artist/the-xx-tickets/85593?track=DiscoveryAPI",
      "event_count": 0
    },
    {
      "id": 26326,
      "name": "MUSE",
      "url": "http://www.ticketmaster.de/artist/muse-tickets/26326?track=DiscoveryAPI",
      "event_count": 2
    },
    {
      "id": 21307,
      "name": "Justin Timberlake",
      "url": "http://www.ticketmaster.de/artist/justin-timberlake-tickets/21307?track=DiscoveryAPI",
      "event_count": 0
    },
    {
      "id": 946272,
      "name": "FC Bayern Basketball",
      "url": "http://www.ticketmaster.de/artist/fc-bayern-basketball-tickets/946272?track=DiscoveryAPI",
      "event_count": 1
    }
  ]
}
{% endhighlight %}


{: .article}
## Venue Service 
The Venue Service API allows you to search for event venues and get details for specific venues. Seatmaps for venues are available in the Event Service - See Event Seatmaps
{: .lead.article}

{: .article #venue-search}
### Venue Search 
Find venues and filter your search by name, and much more.

{: .code.red}
https://app.ticketmaster.eu/mfxapi/v1/venues

| Parameters | Optional values | Type | Required |
| ---------- | --------------- | ---- | -------- |
|`domain_ids` | The unique identifier for the domain or market. Use a comma separated list of values to search multiple domains. (A logical OR search is performed). Example: norway. | string | Yes |
|`lang` | The language in ISO code format. The default language is specified in the Domains List service. Usually two or three languages are supported. Example: no-no. | string | No |
|`venuename` | The venue name. Use a comma separated list of values to search multiple venues. (A logical OR search is performed). Example: Rockefeller. | string | No |
|`venue_ids` | The unique identifier for the venue which is linked to the domain. Use a comma separated list of values to search multiple venues. Example: no-no. | string | No |
|`city_ids` | The unique identifier for the City. Use a comma separated list of values to search multiple Cities. (A logical OR search is performed). Supported City names and IDs are available in the Cities List service. Example: 40500. | string | No |
|`postal_code` | The postal code or zip code of the venue. Example: 0151. | string | No |
|`lat` | The latitude of the required search location. Example: 59.9047. | string | No |
|`lat` | The longitude of the required search location. Example: 10.7497. | string | No |
|`radius` | The radius to be applied to results where a location (lat, long) is used as a query parameter. The radius is given in km. Example: 50. | Integer | No |
|`sort_by` | The method for sorting the results. Default: venuename. Possible values:  venuename , cityname . | string | No |
|`order` | The order in which results are sorted, whether ascending or descending. Default: asc. Possible values:  asc , desc . | string | No |
|`rows` | The number of rows to return, up to a maximum of 500. Default: 10. | Integer | No |
|`start` | The offset for pagination which specifies the start row to return. Default: 0. | Integer | No |


#### Query Parameters

##### Pagination 
You can paginate the results by specifying the number of rows to return, and the start row. There is a maximum of 500 rows. 

+ `rows` = `10` (optional, integer) 
+ `start` = `0` (optional, integer)

##### Sorting 
You can specify a sorting method and order. Options include event name, event date, popularity, and proximity (based on 
the lat and long) with ascending or descending order. The default is eventdate and ascending.

| Parameters | Optional values | Type |
| -------- | | ------------------ |
|`sort_by` | venuename, cityname | string |
|`order` | asc, desc | string |

##### Other Parameters 
There are additional parameters which allow you to filter the search by venue name, and location including proximity to a lat / long.

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

request.open('GET', '/venues?domain_ids&lang&venuename&venue_ids&city_ids&postal_code&lat&long&radius&sort_by&order&rows&start');

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

{% highlight bash %}
curl --include \
     --header "Accept: application/json" \
'https://app.ticketmaster.eu/mfxapi/v1/attractions/similar?attraction_id&lang&domain_id&has_events&rows'
{% endhighlight %}


{% highlight java %}
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
Response response = client.target("https://app.ticketmaster.eu/mfxapi/v1/venues?domain_ids&#38;lang&#38;venuename&#38;venue_ids&#38;city_ids&#38;postal_code&#38;lat&#38;long&#38;radius&#38;sort_by&#38;order&#38;rows&#38;start")
  .request(MediaType.TEXT_PLAIN_TYPE)
  .header("Accept", "application/json")
  .get();

System.out.println("status: " + response.getStatus());
System.out.println("headers: " + response.getHeaders());
System.out.println("body:" + response.readEntity(String.class));
{% endhighlight %}


{% highlight js %}
var request = require('request');

request({
  method: 'GET',
  url: 'https://app.ticketmaster.eu/mfxapi/v1/venues?domain_ids&lang&venuename&venue_ids&city_ids&postal_code&lat&long&radius&sort_by&order&rows&start',
  headers: {
    'Accept': 'application/json'
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
{% endhighlight %}


{% highlight perl %}
require LWP::UserAgent;

my $ua   = LWP::UserAgent->new;

$ua->default_header("Accept" => "application/json");

my $response = $ua->get("https://app.ticketmaster.eu/mfxapi/v1/venues?domain_ids&lang&venuename&venue_ids&city_ids&postal_code&lat&long&radius&sort_by&order&rows&start");

print $response->as_string;
{% endhighlight %}

{% highlight python %}
from urllib2 import Request, urlopen

headers = {
  'Accept': 'application/json'
}
request = Request('https://app.ticketmaster.eu/mfxapi/v1/venues?domain_ids&lang&venuename&venue_ids&city_ids&postal_code&lat&long&radius&sort_by&order&rows&start', headers=headers)

response_body = urlopen(request).read()
print response_body
{% endhighlight %}

{% highlight php %}
<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://app.ticketmaster.eu/mfxapi/v1/venues?domain_ids&lang&venuename&venue_ids&city_ids&postal_code&lat&long&radius&sort_by&order&rows&start");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Accept: application/json"
));

$response = curl_exec($ch);
curl_close($ch);

var_dump($response);
{% endhighlight %}


{% highlight ruby %}
require 'rubygems' if RUBY_VERSION < '1.9'
require 'rest_client'

headers = {
  :accept => 'application/json'
}

response = RestClient.get 'https://app.ticketmaster.eu/mfxapi/v1/venues?domain_ids&lang&venuename&venue_ids&city_ids&postal_code&lat&long&radius&sort_by&order&rows&start', headers
puts response
{% endhighlight %}


{% highlight go %}
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	client := &http.Client{}

	req, _ := http.NewRequest("GET", "https://app.ticketmaster.eu/mfxapi/v1/venues?domain_ids&lang&venuename&venue_ids&city_ids&postal_code&lat&long&radius&sort_by&order&rows&start", nil)

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


{% highlight csharp %}
//Common testing requirement. If you are consuming an API in a sandbox/test region, uncomment this line of code ONLY for non production uses.
//System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };

//Be sure to run "Install-Package Microsoft.Net.Http" from your nuget command line.
using System;
using System.Net.Http;

var baseAddress = new Uri("https://app.ticketmaster.eu/mfxapi/v1/");

using (var httpClient = new HttpClient{ BaseAddress = baseAddress })
{

  httpClient.DefaultRequestHeaders.TryAddWithoutValidation("accept", "application/json");
  
  using(var response = await httpClient.GetAsync("venues?domain_ids&lang&venuename&venue_ids&city_ids&postal_code&lat&long&radius&sort_by&order&rows&start"))
  { 
        string responseData = await response.Content.ReadAsStringAsync();
  }
}
{% endhighlight %}


{% highlight vb %}
Dim request = TryCast(System.Net.WebRequest.Create("https://app.ticketmaster.eu/mfxapi/v1/venues?domain_ids&lang&venuename&venue_ids&city_ids&postal_code&lat&long&radius&sort_by&order&rows&start"), System.Net.HttpWebRequest)

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


{% highlight groovy %}
import groovyx.net.http.RESTClient
import static groovyx.net.http.ContentType.JSON
import groovy.json.JsonSlurper
import groovy.json.JsonOutput

@Grab (group = 'org.codehaus.groovy.modules.http-builder', module = 'http-builder', version = '0.5.0')
def client = new RESTClient("https://app.ticketmaster.eu/mfxapi/v1")

def emptyHeaders = [:]
emptyHeaders."Accept" = "application/json"

response = client.get( path : "/venues?domain_ids&lang&venuename&venue_ids&city_ids&postal_code&lat&long&radius&sort_by&order&rows&start", headers: emptyHeaders )

println("Status:" + response.status)

if (response.data) {
  println("Content Type: " + response.contentType)
  println("Body:\n" + JsonOutput.prettyPrint(JsonOutput.toJson(response.data)))
}
{% endhighlight %}


{% highlight objc %}
NSURL *URL = [NSURL URLWithString:@"https://app.ticketmaster.eu/mfxapi/v1/venues?domain_ids&lang&venuename&venue_ids&city_ids&postal_code&lat&long&radius&sort_by&order&rows&start"];

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


{% highlight swift %}
// NOTE: Uncommment following two lines for use in a Playground
// import XCPlayground
// XCPlaygroundPage.currentPage.needsIndefiniteExecution = true

let url = NSURL(string: "https://app.ticketmaster.eu/mfxapi/v1/venues?domain_ids&lang&venuename&venue_ids&city_ids&postal_code&lat&long&radius&sort_by&order&rows&start")!
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

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /venues?domain_ids&lang&venuename&venue_ids&city_ids&postal_code&lat&long&radius&sort_by&order&rows&start HTTP/1.1
Host: https://app.ticketmaster.eu/mfxapi/v1
Accept: application/json
Content-Length: 0
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Server: Cowboy
Connection: keep-alive
X-Newrelic-App-Data: PxQDVFVRCQITVlZRDgcFV0YdFHYaFhEHQxFSERd/cWYcShNDHUwDTFQHBk1WTQgFAFFXUAYIBkpQAAEfQFdSBgIEW1NZXlZWVlAIURNNVQMIRVI8
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT
Access-Control-Max-Age: 10
X-Apiary-Transaction-Id: 56990fb77503cc0b001826d4
Content-Length: 417
Date: Fri, 15 Jan 2016 12:16:37 GMT
Via: 1.1 vegur

{
  "venues": [
    {
      "id": "385",
      "name": "Akkerhaugen brygge",
      "code": "BAK",
      "url": "http://www.billettservice.no/venue/akkerhaugen-brygge-akkerhaugen-tickets/BAK/3?track=DiscoveryAPI",
      "location": {
        "address": {
          "postal_code": "3812",
          "city": "Akkerhaugen",
          "country": "Norway",
          "long": 13.242,
          "lat": 65.398
        }
      }
    }
  ],
  "pagination": {
    "start": 0,
    "rows": 1,
    "total": 3
  }
}
{% endhighlight %}

{: .article #venue-details}
### Venue Details 
Get details for a specific event using the unique identifer for the event. Seatmaps for venues are available in the Event Service - See [Event Seatmaps](#event-seatmap)

{: .code.red}
https://app.ticketmaster.eu/mfxapi/v1/venue/{venue_id}

| Parameters | Optional values | Type | Required |
| ---------- | --------------- | ---- | -------- |
|`venue_id` | A unique identifier for the venue which is specific to the domain. Example: 7353. | Integer | Yes |
|`lang` | The language in ISO code format. Example: no-no. | string | No |
|`domain_ids` | The unique identifier for the domain or market. Although optional, this is recommended. Example: norway. | string | Yes |

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

request.open('GET', '/venue/7353?lang&domain_ids');

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

{% highlight bash %}
curl --include \
     --header "Accept: application/json" \
  'https://app.ticketmaster.eu/mfxapi/v1/venue/7353?lang&domain_ids'
{% endhighlight %}


{% highlight java %}
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
Response response = client.target("https://app.ticketmaster.eu/mfxapi/v1/venue/{venue_id}?lang&#38;domain_ids")
  .request(MediaType.TEXT_PLAIN_TYPE)
  .header("Accept", "application/json")
  .get();

System.out.println("status: " + response.getStatus());
System.out.println("headers: " + response.getHeaders());
System.out.println("body:" + response.readEntity(String.class));
{% endhighlight %}


{% highlight js %}
var request = require('request');

request({
  method: 'GET',
  url: 'https://app.ticketmaster.eu/mfxapi/v1/venue/7353?lang&domain_ids',
  headers: {
    'Accept': 'application/json'
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
{% endhighlight %}


{% highlight perl %}
require LWP::UserAgent;

my $ua   = LWP::UserAgent->new;

$ua->default_header("Accept" => "application/json");

my $response = $ua->get("https://app.ticketmaster.eu/mfxapi/v1/venue/7353?lang&domain_ids");

print $response->as_string;
{% endhighlight %}

{% highlight python %}
from urllib2 import Request, urlopen

headers = {
  'Accept': 'application/json'
}
request = Request('https://app.ticketmaster.eu/mfxapi/v1/venue/7353?lang&domain_ids', headers=headers)

response_body = urlopen(request).read()
print response_body
{% endhighlight %}

{% highlight php %}
<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://app.ticketmaster.eu/mfxapi/v1/venue/7353?lang&domain_ids");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Accept: application/json"
));

$response = curl_exec($ch);
curl_close($ch);

var_dump($response);
{% endhighlight %}


{% highlight ruby %}
require 'rubygems' if RUBY_VERSION < '1.9'
require 'rest_client'

headers = {
  :accept => 'application/json'
}

response = RestClient.get 'https://app.ticketmaster.eu/mfxapi/v1/venue/7353?lang&domain_ids', headers
puts response
{% endhighlight %}


{% highlight go %}
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	client := &http.Client{}

	req, _ := http.NewRequest("GET", "https://app.ticketmaster.eu/mfxapi/v1/venue/7353?lang&domain_ids", nil)

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


{% highlight csharp %}
//Common testing requirement. If you are consuming an API in a sandbox/test region, uncomment this line of code ONLY for non production uses.
//System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };

//Be sure to run "Install-Package Microsoft.Net.Http" from your nuget command line.
using System;
using System.Net.Http;

var baseAddress = new Uri("https://app.ticketmaster.eu/mfxapi/v1/");

using (var httpClient = new HttpClient{ BaseAddress = baseAddress })
{

  httpClient.DefaultRequestHeaders.TryAddWithoutValidation("accept", "application/json");
  
  using(var response = await httpClient.GetAsync("venue/{venue_id}?lang&domain_ids"))
  { 
        string responseData = await response.Content.ReadAsStringAsync();
  }
}
{% endhighlight %}


{% highlight vb %}
Dim request = TryCast(System.Net.WebRequest.Create("https://app.ticketmaster.eu/mfxapi/v1/venue/7353?lang&domain_ids"), System.Net.HttpWebRequest)

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


{% highlight groovy %}
import groovyx.net.http.RESTClient
import static groovyx.net.http.ContentType.JSON
import groovy.json.JsonSlurper
import groovy.json.JsonOutput

@Grab (group = 'org.codehaus.groovy.modules.http-builder', module = 'http-builder', version = '0.5.0')
def client = new RESTClient("https://app.ticketmaster.eu/mfxapi/v1")

def emptyHeaders = [:]
emptyHeaders."Accept" = "application/json"

response = client.get( path : "/venue/{venue_id}?lang&domain_ids", headers: emptyHeaders )

println("Status:" + response.status)

if (response.data) {
  println("Content Type: " + response.contentType)
  println("Body:\n" + JsonOutput.prettyPrint(JsonOutput.toJson(response.data)))
}
{% endhighlight %}


{% highlight objc %}
NSURL *URL = [NSURL URLWithString:@"https://app.ticketmaster.eu/mfxapi/v1/venue/7353?lang&domain_ids"];

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


{% highlight swift %}
// NOTE: Uncommment following two lines for use in a Playground
// import XCPlayground
// XCPlaygroundPage.currentPage.needsIndefiniteExecution = true

let url = NSURL(string: "https://app.ticketmaster.eu/mfxapi/v1/venue/7353?lang&domain_ids")!
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

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /venue/7353?lang&domain_ids HTTP/1.1
Host: https://app.ticketmaster.eu/mfxapi/v1
Accept: application/json
Content-Length: 0
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Server: Cowboy
Connection: keep-alive
X-Newrelic-App-Data: PxQDVFVRCQITVlZRDgcFV0YdFHYaFhEHQxFSERd/cWYcShNDHVEdUlQHG1FIUw4DAldQVQYJDl9dCA8KW19VTgNbC04aXVYCVQcOUwdRAFQAVAdDSgVZX0MBPA==
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT
Access-Control-Max-Age: 10
X-Apiary-Transaction-Id: 56991582b152b20b00fb7346
Content-Length: 393
Date: Fri, 15 Jan 2016 12:16:37 GMT
Via: 1.1 vegur

{
  "id": "7353",
  "domainId": "sweden",
  "name": "Araby Park Arena",
  "code": "AAP",
  "url": "http://www.ticnet.se/venue/araby-park-arena-vaxjo-tickets/AAP/511?track=DiscoveryAPI",
  "location": {
    "url": "http://www.regionteatern.se?track=DiscoveryAPI",
    "address": {
      "address": "Höstvägen 5A",
      "postal_code": "352 37",
      "city": "Växjö",
      "country": "Sweden",
      "long": 14.79411,
      "lat": 56.89197
    }
  }
}
{% endhighlight %}

{: .article}
## Information Service 
A collection of services which provide information on supported countries, domains, languages, cities and categories.
{: .lead.article}

{: .article #countries-list}
### Countries List 
Get a list of countries and domains for each. Although not required, it is advisable to specify the domain. The domain 
relates to the Ticketmaster website through which tickets are listed and sold, whereas the Country is a geographical location.

{: .code.red}
https://app.ticketmaster.eu/mfxapi/v1/countries

| Parameters | Optional values | Type | Required |
| ---------- | --------------- | ---- | -------- |
|`domain_ids` | A unique identifier for the domain or market. Example: 56. | string | No |
|`lang` | The language in ISO code format. Example: en-us. | string | No |

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

request.open('GET', '/countries?lang&domain_id');

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

{% highlight bash %}
curl --include \
     --header "Accept: application/json" \
  'https://app.ticketmaster.eu/mfxapi/v1/countries?lang&domain_id'
{% endhighlight %}


{% highlight java %}
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
Response response = client.target("https://app.ticketmaster.eu/mfxapi/v1/countries?lang&#38;domain_id")
  .request(MediaType.TEXT_PLAIN_TYPE)
  .header("Accept", "application/json")
  .get();

System.out.println("status: " + response.getStatus());
System.out.println("headers: " + response.getHeaders());
System.out.println("body:" + response.readEntity(String.class));
{% endhighlight %}


{% highlight js %}
var request = require('request');

request({
  method: 'GET',
  url: 'https://app.ticketmaster.eu/mfxapi/v1/countries?lang&domain_id',
  headers: {
    'Accept': 'application/json'
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
{% endhighlight %}


{% highlight perl %}
require LWP::UserAgent;

my $ua   = LWP::UserAgent->new;

$ua->default_header("Accept" => "application/json");

my $response = $ua->get("https://app.ticketmaster.eu/mfxapi/v1/countries?lang&domain_id");

print $response->as_string;
{% endhighlight %}

{% highlight python %}
from urllib2 import Request, urlopen

headers = {
  'Accept': 'application/json'
}
request = Request('https://app.ticketmaster.eu/mfxapi/v1/countries?lang&domain_id', headers=headers)

response_body = urlopen(request).read()
print response_body
{% endhighlight %}

{% highlight php %}
<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://app.ticketmaster.eu/mfxapi/v1/countries?lang&domain_id");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Accept: application/json"
));

$response = curl_exec($ch);
curl_close($ch);

var_dump($response);
{% endhighlight %}


{% highlight ruby %}
require 'rubygems' if RUBY_VERSION < '1.9'
require 'rest_client'

headers = {
  :accept => 'application/json'
}

response = RestClient.get 'https://app.ticketmaster.eu/mfxapi/v1/countries?lang&domain_id', headers
puts response
{% endhighlight %}


{% highlight go %}
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	client := &http.Client{}

	req, _ := http.NewRequest("GET", "https://app.ticketmaster.eu/mfxapi/v1/countries?lang&domain_id", nil)

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


{% highlight csharp %}
//Common testing requirement. If you are consuming an API in a sandbox/test region, uncomment this line of code ONLY for non production uses.
//System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };

//Be sure to run "Install-Package Microsoft.Net.Http" from your nuget command line.
using System;
using System.Net.Http;

var baseAddress = new Uri("https://app.ticketmaster.eu/mfxapi/v1/");

using (var httpClient = new HttpClient{ BaseAddress = baseAddress })
{

  httpClient.DefaultRequestHeaders.TryAddWithoutValidation("accept", "application/json");
  
  using(var response = await httpClient.GetAsync("countries?lang&domain_id"))
  { 
        string responseData = await response.Content.ReadAsStringAsync();
  }
}
{% endhighlight %}


{% highlight vb %}
Dim request = TryCast(System.Net.WebRequest.Create("https://app.ticketmaster.eu/mfxapi/v1/countries?lang&domain_id"), System.Net.HttpWebRequest)

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


{% highlight groovy %}
import groovyx.net.http.RESTClient
import static groovyx.net.http.ContentType.JSON
import groovy.json.JsonSlurper
import groovy.json.JsonOutput

@Grab (group = 'org.codehaus.groovy.modules.http-builder', module = 'http-builder', version = '0.5.0')
def client = new RESTClient("https://app.ticketmaster.eu/mfxapi/v1")

def emptyHeaders = [:]
emptyHeaders."Accept" = "application/json"

response = client.get( path : "/countries?lang&domain_id", headers: emptyHeaders )

println("Status:" + response.status)

if (response.data) {
  println("Content Type: " + response.contentType)
  println("Body:\n" + JsonOutput.prettyPrint(JsonOutput.toJson(response.data)))
}
{% endhighlight %}


{% highlight objc %}
NSURL *URL = [NSURL URLWithString:@"https://app.ticketmaster.eu/mfxapi/v1/countries?lang&domain_id"];

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


{% highlight swift %}
// NOTE: Uncommment following two lines for use in a Playground
// import XCPlayground
// XCPlaygroundPage.currentPage.needsIndefiniteExecution = true

let url = NSURL(string: "https://app.ticketmaster.eu/mfxapi/v1/countries?lang&domain_id")!
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

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /countries?lang&domain_id HTTP/1.1
Host: https://app.ticketmaster.eu/mfxapi/v1
Accept: application/json
Content-Length: 0
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Server: Cowboy
Connection: keep-alive
X-Newrelic-App-Data: PxQDVFVRCQITVlZRDgcFV0YdFHYaFhEHQxFSERd/cWYcShNDHVEdUlQFG1FIUwEKBF1YUgYGG1dUBgAfQFIGVghaWlpZAQBXUFEbTVcAXxEBaw==
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT
Access-Control-Max-Age: 10
X-Apiary-Transaction-Id: 569916d1b152b20b00fb74ad
Content-Length: 1076
Date: Fri, 15 Jan 2016 12:16:37 GMT
Via: 1.1 vegur

{
  "countries": [
    {
      "id": 124,
      "name": "Canada"
    },
    {
      "id": 840,
      "name": "United States"
    },
    {
      "id": 40,
      "name": "Austria"
    },
    {
      "id": 56,
      "name": "Belgium"
    },
    {
      "id": 208,
      "name": "Denmark"
    },
    {
      "id": 246,
      "name": "Finland"
    },
    {
      "id": 250,
      "name": "France"
    },
    {
      "id": 276,
      "name": "Germany"
    },
    {
      "id": 578,
      "name": "Norway"
    },
    {
      "id": 620,
      "name": "Portugal"
    },
    {
      "id": 724,
      "name": "Spain"
    },
    {
      "id": 752,
      "name": "Sweden"
    },
    {
      "id": 756,
      "name": "Switzerland"
    },
    {
      "id": 826,
      "name": "United Kingdom"
    },
    {
      "id": 833,
      "name": "Isle of Man"
    },
    {
      "id": 70,
      "name": "Bosnia and Herzegovina"
    },
    {
      "id": 100,
      "name": "Bulgaria"
    },
    {
      "id": 112,
      "name": "Belarus"
    },
    {
      "id": 191,
      "name": "Croatia"
    },
    {
      "id": 196,
      "name": "Cyprus"
    },
    {
      "id": 203,
      "name": "Czech Republic"
    },
    {
      "id": 233,
      "name": "Estonia"
    },
    {
      "id": 268,
      "name": "Georgia"
    },
    {
      "id": 348,
      "name": "Hungary"
    },
    {
      "id": 428,
      "name": "Latvia"
    },
    {
      "id": 440,
      "name": "Lithuania"
    },
    {
      "id": 499,
      "name": "Montenegro"
    },
    {
      "id": 616,
      "name": "Poland"
    },
    {
      "id": 642,
      "name": "Romania"
    },
    {
      "id": 688,
      "name": "Serbia"
    }
  ]
}
{% endhighlight %}

{: .article #domains-list}
### Domains List 
Get a list of domains (countries and markets) and the domain ID as well supported langauges.Although not required, it is advisable to specify the domain. The domain relates to the Ticketmaster website through which tickets are listed and sold. Domain_id differs from the Country_id which is the geographical location rather than the market.

{: .code.red}
https://app.ticketmaster.eu/mfxapi/v1/domains

| Parameters | Optional values | Type | Required |
| ---------- | --------------- | ---- | -------- |
|`country_id` | A unique identifier for the country. Example: 56. | string | No |

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

request.open('GET', 'https://app.ticketmaster.eu/mfxapi/v1/domains?country_id');

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

{% highlight bash %}
curl --include \
     --header "Accept: application/json" \
  'https://app.ticketmaster.eu/mfxapi/v1/domains?country_id'
{% endhighlight %}


{% highlight java %}
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
Response response = client.target("https://app.ticketmaster.eu/mfxapi/v1/domains?country_id")
  .request(MediaType.TEXT_PLAIN_TYPE)
  .header("Accept", "application/json")
  .get();

System.out.println("status: " + response.getStatus());
System.out.println("headers: " + response.getHeaders());
System.out.println("body:" + response.readEntity(String.class));
{% endhighlight %}


{% highlight js %}
var request = require('request');

request({
  method: 'GET',
  url: 'https://app.ticketmaster.eu/mfxapi/v1/domains?country_id',
  headers: {
    'Accept': 'application/json'
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
{% endhighlight %}


{% highlight perl %}
require LWP::UserAgent;

my $ua   = LWP::UserAgent->new;

$ua->default_header("Accept" => "application/json");

my $response = $ua->get("https://app.ticketmaster.eu/mfxapi/v1/domains?country_id");

print $response->as_string;
{% endhighlight %}

{% highlight python %}
from urllib2 import Request, urlopen

headers = {
  'Accept': 'application/json'
}
request = Request('https://app.ticketmaster.eu/mfxapi/v1/domains?country_id', headers=headers)

response_body = urlopen(request).read()
print response_body
{% endhighlight %}

{% highlight php %}
<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://app.ticketmaster.eu/mfxapi/v1/domains?country_id");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Accept: application/json"
));

$response = curl_exec($ch);
curl_close($ch);

var_dump($response);
{% endhighlight %}


{% highlight ruby %}
require 'rubygems' if RUBY_VERSION < '1.9'
require 'rest_client'

headers = {
  :accept => 'application/json'
}

response = RestClient.get 'https://app.ticketmaster.eu/mfxapi/v1/domains?country_id', headers
puts response
{% endhighlight %}


{% highlight go %}
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	client := &http.Client{}

	req, _ := http.NewRequest("GET", "https://app.ticketmaster.eu/mfxapi/v1/domains?country_id", nil)

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


{% highlight csharp %}
//Common testing requirement. If you are consuming an API in a sandbox/test region, uncomment this line of code ONLY for non production uses.
//System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };

//Be sure to run "Install-Package Microsoft.Net.Http" from your nuget command line.
using System;
using System.Net.Http;

var baseAddress = new Uri("https://app.ticketmaster.eu/mfxapi/v1/");

using (var httpClient = new HttpClient{ BaseAddress = baseAddress })
{

  httpClient.DefaultRequestHeaders.TryAddWithoutValidation("accept", "application/json");
  
  using(var response = await httpClient.GetAsync("domains?country_id"))
  { 
        string responseData = await response.Content.ReadAsStringAsync();
  }
}
{% endhighlight %}


{% highlight vb %}


Dim request = TryCast(System.Net.WebRequest.Create("https://app.ticketmaster.eu/mfxapi/v1/domains?country_id
"), System.Net.HttpWebRequest)

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


{% highlight groovy %}


import groovyx.net.http.RESTClient
import static groovyx.net.http.ContentType.JSON
import groovy.json.JsonSlurper
import groovy.json.JsonOutput

@Grab (group = 'org.codehaus.groovy.modules.http-builder', module = 'http-builder', version = '0.5.0')
def client = new RESTClient("https://app.ticketmaster.eu/mfxapi/v1")

def emptyHeaders = [:]
emptyHeaders."Accept" = "application/json"

response = client.get( path : "/domains?country_id", headers: emptyHeaders )

println("Status:" + response.status)

if (response.data) {
  println("Content Type: " + response.contentType)
  println("Body:\n" + JsonOutput.prettyPrint(JsonOutput.toJson(response.data)))
}
{% endhighlight %}


{% highlight objc %}
NSURL *URL = [NSURL URLWithString:@"https://app.ticketmaster.eu/mfxapi/v1/domains?country_id
"];

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


{% highlight swift %}
// NOTE: Uncommment following two lines for use in a Playground
// import XCPlayground
// XCPlaygroundPage.currentPage.needsIndefiniteExecution = true

let url = NSURL(string: "https://app.ticketmaster.eu/mfxapi/v1/domains?country_id
")!
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

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /domains?country_id HTTP/1.1
Host: https://app.ticketmaster.eu/mfxapi/v1
Accept: application/json
Content-Length: 0
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Server: Cowboy
Connection: keep-alive
X-Newrelic-App-Data: PxQDVFVRCQITVlZRDgcFV0YdFHYaFhEHQxFSERd/cWYcShNDHUwDTFQGD01WTQoGBlFSWwEBDkpXCQAHTkRRBwkDAVJeDgQFB11dURNNVQMIRVI8
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT
Access-Control-Max-Age: 10
X-Apiary-Transaction-Id: 569cabbbd895b90b008f9bbf
Content-Length: 3864
Date: Fri, 15 Jan 2016 12:16:37 GMT
Via: 1.1 vegur

{
  "domains": [
    {
      "id": "canada",
      "name": "Canada Admission",
      "country_id": 124,
      "site_url": "www.admission.com?track=DiscoveryAPI",
      "currency": "CAD",
      "langs": [
        {
          "id": "fr-ca",
          "name": "Français - CA",
          "default": true
        },
        {
          "id": "en-us",
          "name": "English",
          "default": false
        }
      ]
    },
    {
      "id": "billetech",
      "name": "Canada Billetech",
      "country_id": 124,
      "site_url": "www.billetech.com?track=DiscoveryAPI",
      "currency": "CAD",
      "langs": [
        {
          "id": "fr-ca",
          "name": "Français - CA",
          "default": true
        },
        {
          "id": "en-us",
          "name": "English",
          "default": false
        }
      ]
    },
    {
      "id": "belgium",
      "name": "Belgium",
      "country_id": 56,
      "site_url": "www.ticketmaster.be?track=DiscoveryAPI",
      "currency": "EUR",
      "langs": [
        {
          "id": "fr-be",
          "name": "Français - BE",
          "default": true
        },
        {
          "id": "nl-be",
          "name": "Nederlands - BE",
          "default": false
        },
        {
          "id": "en-us",
          "name": "English",
          "default": false
        }
      ]
    },
    {
      "id": "denmark",
      "name": "Denmark",
      "country_id": 208,
      "site_url": "www.billetnet.dk?track=DiscoveryAPI",
      "currency": "DKK",
      "langs": [
        {
          "id": "da-dk",
          "name": "Dansk",
          "default": true
        },
        {
          "id": "en-us",
          "name": "English",
          "default": false
        }
      ]
    },
    {
      "id": "germany",
      "name": "Germany",
      "country_id": 276,
      "site_url": "www.ticketmaster.de?track=DiscoveryAPI",
      "currency": "EUR",
      "langs": [
        {
          "id": "de-de",
          "name": "Deutsch",
          "default": true
        },
        {
          "id": "en-us",
          "name": "English",
          "default": false
        }
      ]
    },
    {
      "id": "netherlands",
      "name": "Netherlands",
      "country_id": 528,
      "site_url": "www.ticketmaster.nl?track=DiscoveryAPI",
      "currency": "EUR",
      "langs": [
        {
          "id": "nl-nl",
          "name": "Nederlands - NL",
          "default": true
        },
        {
          "id": "en-us",
          "name": "English",
          "default": false
        }
      ]
    },
    {
      "id": "finland",
      "name": "Finland",
      "country_id": 246,
      "site_url": "www.lippupalvelu.fi?track=DiscoveryAPI",
      "currency": "EUR",
      "langs": [
        {
          "id": "fi-fi",
          "name": "Suomi",
          "default": true
        },
        {
          "id": "en-us",
          "name": "English",
          "default": false
        }
      ]
    },
    {
      "id": "norway",
      "name": "Norway",
      "country_id": 578,
      "site_url": "www.billettservice.no?track=DiscoveryAPI",
      "currency": "NOK",
      "langs": [
        {
          "id": "no-no",
          "name": "Norsk",
          "default": true
        },
        {
          "id": "en-us",
          "name": "English",
          "default": false
        }
      ]
    },
    {
      "id": "sweden",
      "name": "Sweden",
      "country_id": 752,
      "site_url": "www.ticnet.se?track=DiscoveryAPI",
      "currency": "SEK",
      "langs": [
        {
          "id": "sv-se",
          "name": "Svenska",
          "default": true
        },
        {
          "id": "en-us",
          "name": "English",
          "default": false
        }
      ]
    },
    {
      "id": "austria",
      "name": "Austria",
      "country_id": 40,
      "site_url": "www.ticketmaster.at?track=DiscoveryAPI",
      "currency": "EUR",
      "langs": [
        {
          "id": "de-at",
          "name": "Österreichisches Deutsch",
          "default": true
        },
        {
          "id": "en-us",
          "name": "English",
          "default": false
        }
      ]
    },
    {
      "id": "unitedarabemirates",
      "name": "United Arab Emirates",
      "country_id": 784,
      "site_url": "www.ae.ticketmaster.com?track=DiscoveryAPI",
      "currency": "AED",
      "langs": [
        {
          "id": "en-us",
          "name": "English",
          "default": true
        }
      ]
    },
    {
      "id": "unitedkingdom",
      "name": "TicketWeb",
      "country_id": 826,
      "site_url": "www.ticketweb.co.uk?track=DiscoveryAPI",
      "currency": "GBP",
      "langs": [
        {
          "id": "en-us",
          "name": "English",
          "default": true
        }
      ]
    }
  ]
}
{% endhighlight %}


{: .article #cities-list}
### Cities List
Get a list of city names and city IDs.

{: .code.red}
https://app.ticketmaster.eu/mfxapi/v1/cities

| Parameters | Optional values | Type | Required |
| ---------- | --------------- | ---- | -------- |
|`country_id` | A unique identifier for the country. Example: 56.| string | No |
|`domain_id` | A unique identifier for the domain or market. Example: norway. | string | No |
|`lang` | The language in ISO code format. Example: 56. | string | No |

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

request.open('GET', '/cities?lang&domain_id&country_id');

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

{% highlight bash %}
curl --include \
     --header "Accept: application/json" \
  'https://app.ticketmaster.eu/mfxapi/v1/cities?lang&domain_id&country_id'
{% endhighlight %}


{% highlight java %}
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
Response response = client.target("https://app.ticketmaster.eu/mfxapi/v1/cities?lang&#38;domain_id&#38;country_id")
  .request(MediaType.TEXT_PLAIN_TYPE)
  .header("Accept", "application/json")
  .get();

System.out.println("status: " + response.getStatus());
System.out.println("headers: " + response.getHeaders());
System.out.println("body:" + response.readEntity(String.class));
{% endhighlight %}


{% highlight js %}
var request = require('request');

request({
  method: 'GET',
  url: 'https://app.ticketmaster.eu/mfxapi/v1/cities?lang&domain_id&country_id',
  headers: {
    'Accept': 'application/json'
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
{% endhighlight %}


{% highlight perl %}
require LWP::UserAgent;

my $ua   = LWP::UserAgent->new;

$ua->default_header("Accept" => "application/json");

my $response = $ua->get("https://app.ticketmaster.eu/mfxapi/v1/cities?lang&domain_id&country_id");

print $response->as_string;
{% endhighlight %}

{% highlight python %}
from urllib2 import Request, urlopen

headers = {
  'Accept': 'application/json'
}
request = Request('https://app.ticketmaster.eu/mfxapi/v1/cities?lang&domain_id&country_id', headers=headers)

response_body = urlopen(request).read()
print response_body
{% endhighlight %}

{% highlight php %}
<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://app.ticketmaster.eu/mfxapi/v1/cities?lang&domain_id&country_id");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Accept: application/json"
));

$response = curl_exec($ch);
curl_close($ch);

var_dump($response);
{% endhighlight %}


{% highlight ruby %}
require 'rubygems' if RUBY_VERSION < '1.9'
require 'rest_client'

headers = {
  :accept => 'application/json'
}

response = RestClient.get 'https://app.ticketmaster.eu/mfxapi/v1/cities?lang&domain_id&country_id', headers
puts response
{% endhighlight %}


{% highlight go %}
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	client := &http.Client{}

	req, _ := http.NewRequest("GET", "https://app.ticketmaster.eu/mfxapi/v1/cities?lang&domain_id&country_id", nil)

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


{% highlight csharp %}
//Common testing requirement. If you are consuming an API in a sandbox/test region, uncomment this line of code ONLY for non production uses.
//System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };

//Be sure to run "Install-Package Microsoft.Net.Http" from your nuget command line.
using System;
using System.Net.Http;

var baseAddress = new Uri("https://app.ticketmaster.eu/mfxapi/v1/");

using (var httpClient = new HttpClient{ BaseAddress = baseAddress })
{

  httpClient.DefaultRequestHeaders.TryAddWithoutValidation("accept", "application/json");
  
  using(var response = await httpClient.GetAsync("cities?lang&domain_id&country_id"))
  { 
        string responseData = await response.Content.ReadAsStringAsync();
  }
}
{% endhighlight %}


{% highlight vb %}
Dim request = TryCast(System.Net.WebRequest.Create("https://app.ticketmaster.eu/mfxapi/v1/cities?lang&domain_id&country_id"), System.Net.HttpWebRequest)

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


{% highlight groovy %}
import groovyx.net.http.RESTClient
import static groovyx.net.http.ContentType.JSON
import groovy.json.JsonSlurper
import groovy.json.JsonOutput

@Grab (group = 'org.codehaus.groovy.modules.http-builder', module = 'http-builder', version = '0.5.0')
def client = new RESTClient("https://app.ticketmaster.eu/mfxapi/v1")

def emptyHeaders = [:]
emptyHeaders."Accept" = "application/json"

response = client.get( path : "/cities?lang&domain_id&country_id", headers: emptyHeaders )

println("Status:" + response.status)

if (response.data) {
  println("Content Type: " + response.contentType)
  println("Body:\n" + JsonOutput.prettyPrint(JsonOutput.toJson(response.data)))
}
{% endhighlight %}


{% highlight objc %}
NSURL *URL = [NSURL URLWithString:@"https://app.ticketmaster.eu/mfxapi/v1/cities?lang&domain_id&country_id"];

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


{% highlight swift %}
// NOTE: Uncommment following two lines for use in a Playground
// import XCPlayground
// XCPlaygroundPage.currentPage.needsIndefiniteExecution = true

let url = NSURL(string: "https://app.ticketmaster.eu/mfxapi/v1/cities?lang&domain_id&country_id")!
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

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /cities?lang&domain_id&country_id HTTP/1.1
Host: https://app.ticketmaster.eu/mfxapi/v1
Accept: application/json
Content-Length: 0
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Server: Cowboy
Connection: keep-alive
X-Newrelic-App-Data: PxQDVFVRCQITVlZRDgcFV0YdFHYaFhEHQxFSERd/cWYcShNDHVEdUlQCG1FIUggLBldWUA8IG1dcAA8fQFdTUANVWwMMCVcLVwBbURNNVQMIRVI8
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT
Access-Control-Max-Age: 10
X-Apiary-Transaction-Id: 569cb7bc4fd0130b001f48c6
Content-Length: 1819
Date: Mon, 18 Jan 2016 10:00:28 GMT
Via: 1.1 vegur

{
  "cities": [
    {
      "id": 40001,
      "name": "OSLO",
      "region_id": 40002,
      "country_id": 578
    },
    {
      "id": 40009,
      "name": "SVERIGE",
      "region_id": 40026,
      "country_id": 578
    },
    {
      "id": 40129,
      "name": "NESODDEN",
      "region_id": 40058,
      "country_id": 578
    },
    {
      "id": 40130,
      "name": "SANDVIKA",
      "region_id": 40063,
      "country_id": 578
    },
    {
      "id": 40132,
      "name": "HØVIK",
      "region_id": 40063,
      "country_id": 578
    },
    {
      "id": 40133,
      "name": "GJETTUM",
      "region_id": 40063,
      "country_id": 578
    },
    {
      "id": 40134,
      "name": "BEKKESTUA",
      "region_id": 40063,
      "country_id": 578
    },
    {
      "id": 40135,
      "name": "LOMMEDALEN",
      "region_id": 40063,
      "country_id": 578
    },
    {
      "id": 40136,
      "name": "STABEKK",
      "region_id": 40063,
      "country_id": 578
    },
    {
      "id": 40137,
      "name": "ASKER",
      "region_id": 40063,
      "country_id": 578
    },
    {
      "id": 40500,
      "name": "BERGEN",
      "region_id": 40069,
      "country_id": 578
    },
    {
      "id": 40510,
      "name": "SALHUS",
      "region_id": 40069,
      "country_id": 578
    },
    {
      "id": 41927,
      "name": "ORRE",
      "region_id": 40076,
      "country_id": 578
    },
    {
      "id": 41929,
      "name": "OSCARSBORG",
      "region_id": 40063,
      "country_id": 578
    },
    {
      "id": 41932,
      "name": "OSTEREIDET",
      "region_id": 40069,
      "country_id": 578
    },
    {
      "id": 41934,
      "name": "OTTESTAD",
      "region_id": 40068,
      "country_id": 578
    },
    {
      "id": 41935,
      "name": "PARADIS",
      "region_id": 40069,
      "country_id": 578
    },
    {
      "id": 41937,
      "name": "PLASSEN",
      "region_id": 40068,
      "country_id": 578
    },
    {
      "id": 41941,
      "name": "RAMBERG",
      "region_id": 40073,
      "country_id": 578
    },
    {
      "id": 41943,
      "name": "RAMNES",
      "region_id": 40083,
      "country_id": 578
    },
    {
      "id": 41952,
      "name": "REIPÅ",
      "region_id": 40073,
      "country_id": 578
    },
    {
      "id": 41956,
      "name": "RENNEBU",
      "region_id": 40078,
      "country_id": 578
    },
    {
      "id": 41957,
      "name": "RENNESØY",
      "region_id": 40076,
      "country_id": 578
    },
    {
      "id": 41959,
      "name": "REVETAL",
      "region_id": 40083,
      "country_id": 578
    }
  ]
}
{% endhighlight %}


{: .article #categories-list}
### Categories List
Get a list of the categories of events available for a specific domain, or a list of subcategories for a major category.

{: .code.red}
https://app.ticketmaster.eu/mfxapi/v1/categories

| Parameters | Optional values | Type | Required |
| ---------- | --------------- | ---- | -------- |
|`lang` | The language in ISO code format. Example: 56. | string | No |
|`domain_id` | A unique identifer for the domain or market. Example: en-us. | string | No |
|`category_id` | A unique identifier for the major category such as 'Music'. Example: en-us. | Integer | No |
|`subcategories` | A flag used in combination with category_id. Where set to 'true' a list of subcategories such as 'Festivals' will be returned for the specified major category. Example: en-us. | boolean | No |

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

request.open('GET', '/categories?lang&domain_id&category_id&subcategories');

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

{% highlight bash %}
curl --include \
     --header "Accept: application/json" \
  '/categories?lang&domain_id&category_id&subcategories'
{% endhighlight %}


{% highlight java %}
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
Response response = client.target("https://app.ticketmaster.eu/mfxapi/v1/categories?lang&#38;domain_id&#38;category_id&#38;subcategories")
  .request(MediaType.TEXT_PLAIN_TYPE)
  .header("Accept", "application/json")
  .get();

System.out.println("status: " + response.getStatus());
System.out.println("headers: " + response.getHeaders());
System.out.println("body:" + response.readEntity(String.class));
{% endhighlight %}


{% highlight js %}
var request = require('request');

request({
  method: 'GET',
  url: 'https://app.ticketmaster.eu/mfxapi/v1/categories?lang&domain_id&category_id&subcategories',
  headers: {
    'Accept': 'application/json'
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
{% endhighlight %}


{% highlight perl %}
require LWP::UserAgent;

my $ua   = LWP::UserAgent->new;

$ua->default_header("Accept" => "application/json");

my $response = $ua->get("https://app.ticketmaster.eu/mfxapi/v1/categories?lang&domain_id&category_id&subcategories");

print $response->as_string;
{% endhighlight %}

{% highlight python %}
from urllib2 import Request, urlopen

headers = {
  'Accept': 'application/json'
}
request = Request('https://app.ticketmaster.eu/mfxapi/v1/categories?lang&domain_id&category_id&subcategories', headers=headers)

response_body = urlopen(request).read()
print response_body
{% endhighlight %}

{% highlight php %}
<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://app.ticketmaster.eu/mfxapi/v1/categories?lang&domain_id&category_id&subcategories");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Accept: application/json"
));

$response = curl_exec($ch);
curl_close($ch);

var_dump($response);
{% endhighlight %}


{% highlight ruby %}
require 'rubygems' if RUBY_VERSION < '1.9'
require 'rest_client'

headers = {
  :accept => 'application/json'
}

response = RestClient.get 'https://app.ticketmaster.eu/mfxapi/v1/categories?lang&domain_id&category_id&subcategories', headers
puts response
{% endhighlight %}


{% highlight go %}
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	client := &http.Client{}

	req, _ := http.NewRequest("GET", "https://app.ticketmaster.eu/mfxapi/v1/categories?lang&domain_id&category_id&subcategories", nil)

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


{% highlight csharp %}
//Common testing requirement. If you are consuming an API in a sandbox/test region, uncomment this line of code ONLY for non production uses.
//System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };

//Be sure to run "Install-Package Microsoft.Net.Http" from your nuget command line.
using System;
using System.Net.Http;

var baseAddress = new Uri("https://app.ticketmaster.eu/mfxapi/v1/");

using (var httpClient = new HttpClient{ BaseAddress = baseAddress })
{

  httpClient.DefaultRequestHeaders.TryAddWithoutValidation("accept", "application/json");
  
  using(var response = await httpClient.GetAsync("categories?lang&domain_id&category_id&subcategories"))
  {
 
        string responseData = await response.Content.ReadAsStringAsync();
  }
}
{% endhighlight %}


{% highlight vb %}
Dim request = TryCast(System.Net.WebRequest.Create("https://app.ticketmaster.eu/mfxapi/v1/categories?lang&domain_id&category_id&subcategories"), System.Net.HttpWebRequest)

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


{% highlight groovy %}
import groovyx.net.http.RESTClient
import static groovyx.net.http.ContentType.JSON
import groovy.json.JsonSlurper
import groovy.json.JsonOutput

@Grab (group = 'org.codehaus.groovy.modules.http-builder', module = 'http-builder', version = '0.5.0')
def client = new RESTClient("https://app.ticketmaster.eu/mfxapi/v1")

def emptyHeaders = [:]
emptyHeaders."Accept" = "application/json"

response = client.get( path : "/categories?lang&domain_id&category_id&subcategories", headers: emptyHeaders )

println("Status:" + response.status)

if (response.data) {
  println("Content Type: " + response.contentType)
  println("Body:\n" + JsonOutput.prettyPrint(JsonOutput.toJson(response.data)))
}
{% endhighlight %}


{% highlight objc %}
NSURL *URL = [NSURL URLWithString:@"https://app.ticketmaster.eu/mfxapi/v1/categories?lang&domain_id&category_id&subcategories"];

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


{% highlight swift %}
// NOTE: Uncommment following two lines for use in a Playground
// import XCPlayground
// XCPlaygroundPage.currentPage.needsIndefiniteExecution = true

let url = NSURL(string: "https://app.ticketmaster.eu/mfxapi/v1/categories?lang&domain_id&category_id&subcategories")!
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

{: .article}
>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight HTTP %}
GET /categories?lang&domain_id&category_id&subcategories HTTP/1.1
Host: https://app.ticketmaster.eu/mfxapi/v1
Accept: application/json
Content-Length: 0
{% endhighlight %}

{% highlight HTTP %}
HTTP/1.1 200 OK
Server: Cowboy
Connection: keep-alive
X-Newrelic-App-Data: PxQDVFVRCQITVlZRDgcFV0YdFHYaFhEHQxFSERd/cWYcShNDHVEdUlYHG1FIUgsDAlxRVg8AG1dWAwIfQFJTUARRCFQNDg1TVV1aQx0HUg4XU2o=
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT
Access-Control-Max-Age: 10
X-Apiary-Transaction-Id: 569cb826f446de0b00e07619
Content-Length: 1224
Date: Mon, 18 Jan 2016 10:00:28 GMT
Via: 1.1 vegur

{
  "categories": [
    {
      "name": "Musikk",
      "id": 10001,
      "subcategories": [
        {
          "name": "Rock/Pop",
          "id": 1
        },
        {
          "name": "Country/Viser",
          "id": 2
        },
        {
          "name": "Rap/Hip-hop/R&B",
          "id": 3
        },
        {
          "name": "Jazz/Blues",
          "id": 4
        },
        {
          "name": "Verdensmusikk",
          "id": 5
        },
        {
          "name": "Annen musikk",
          "id": 52
        },
        {
          "name": "Alternativ rock/Indie",
          "id": 60
        },
        {
          "name": "Hard Rock/Metall",
          "id": 200
        },
        {
          "name": "Dance/Elektronika",
          "id": 201
        },
        {
          "name": "Vokalist",
          "id": 1001
        },
        {
          "name": "Franske Sanger",
          "id": 1002
        },
        {
          "name": "Klassisk",
          "id": 1012
        },
        {
          "name": "Kirkemusikk",
          "id": 1201
        },
        {
          "name": "Dansegalla",
          "id": 1202
        },
        {
          "name": "Slager- og dansebandmusikk",
          "id": 1220
        },
        {
          "name": "Reggae",
          "id": 1258
        },
        {
          "name": "Soul",
          "id": 1259
        },
        {
          "name": "Progressive Rock",
          "id": 10103
        }
      ]
    }
  ]
}
{% endhighlight %}
