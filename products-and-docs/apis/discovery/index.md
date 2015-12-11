---
layout: documentation
categories:
- documentation
- discovery
---
{: .article}
#Discovery REST API

{: .lead #lead}
Description of API for discovery service. This API allows to work with events, attractions, categories and venues.

{: .pull-quote #pull-quote}
For work with API you should add to query string the __apikey__ parameter with your key.

{: .article}
##Search Events

- __keyword__ - A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.
- __attractionId__ - Attraction ID(s) separated by comma. Default value "768011";
- __venueId__ - Venue ID(s) separated by comma. Default value "115378";

{: .aside}
>[JS](#tab-js)
>[cULR](#tab-cURL)
>[ruby](#tab-ruby)
{: .lang-selector}

~~~js
var request = $.ajax({
  url: "https://app.ticketmaster.com/discovery/v1/events.json?size=1",
  method: “GET”
});
request.done(function( msg ) {
  console.log( msg );
});
request.fail(function( jqXHR, textStatus ) {
  console.log("Request failed: " + textStatus);
});
~~~
{: #tab-js .tab-js}

~~~cURL
curl -i 'http://api.edmunds.com/{endpoint}?access_token=<access_token>'
~~~
{: #tab-cURL .tab-cURL}

~~~rudy
def foo
  puts 'foo'
end
~~~
{: #tab-ruby .tab-ruby}

{: .article}
##Search Events

- __keyword__ - A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.
- __attractionId__ - Attraction ID(s) separated by comma. Default value "768011";
- __venueId__ - Venue ID(s) separated by comma. Default value "115378";

{: .aside}
>[JS](#tab-js)
>[cULR](#tab-cURL)
>[ruby](#tab-ruby)
{: .lang-selector}

~~~js
var request = $.ajax({
  url: "https://app.ticketmaster.com/discovery/v1/events.json?size=1",
  method: “GET”
});
request.done(function( msg ) {
  console.log( msg );
});
request.fail(function( jqXHR, textStatus ) {
  console.log("Request failed: " + textStatus);
});
~~~
{: #tab-js .tab-js}

~~~cURL
curl -i 'http://api.edmunds.com/{endpoint}?access_token=<access_token>'
~~~
{: #tab-cURL .tab-cURL}

~~~rudy
def foo
  puts 'foo'
end
~~~
{: #tab-ruby .tab-ruby}


{: .article}
{: #srch-event-img }
##Event Images

{: .pull-quote #pull-quote}
discovery/{version}/events/{id}/images.{format}

Method: GET. 
Authentication required.
Returns all the images for an event by ID. If an event does not have an image for a supported resolution, the event's major category image will be returned instead.

###Template parameters:

- __version__ - The API Version. Required. Default value "v1";
- __id__ - Event ID. Required. Default value "0B004F0401BD55E5";
- __format__ - API Response Format. Required. Default value "json".

###Response

<iframe src="https://snap.apigee.com/1YERkwm" width="400" height="300" frameborder="0" scrolling="no"></iframe>

{: .aside}
>[JS](#tab-js)
>[cURL](#tab-cURL)
>[ruby](#tab-ruby)
{: .lang-selector}

~~~js
var request = $.ajax({
  url: "https://app.ticketmaster.com/discovery/v1/events/0B004F0401BD55E5/images.json",
  method: “GET”
});
request.done(function( msg ) {
  console.log( msg );
});
request.fail(function( jqXHR, textStatus ) {
  console.log("Request failed: " + textStatus);
});
~~~
{: #tab-js}

~~~ruby
def foo
  puts 'foo'
end
~~~
{: #tab-cURL}

~~~rudy
def foo
  puts 'foo'
end
~~~
{: #tab-ruby}

{: .article}
{: #srch-att }
##Search Attractions

{: .pull-quote #pull-quote}
discovery/{version}/attractions.{format}

Method: GET.
Authentication required.
Search Attractions!

###Template parameters:

- __version__ - The API Version. Required. Default value "v1";
- __format__ - API Response Format. Required. Default value "json".

###Query parameters:

- __keyword__ - A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.
- __domain__ - The entity interested in this event (special use case). Default value "ticketmaster.com";
- __locale__ - The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca";
- __size__ - The number of events returned in the API response. Default value "10";
- __page__ - The page for paginating through the results. Default value "1";
- __sort__ - The search sort criteria. Values: "", "name,desc", "name,asc".

###Response

<iframe src="https://snap.apigee.com/1XuyzP2" width="800" height="300" frameborder="0" scrolling="no"></iframe>

{: .aside}
>[JS](#tab-js)
>[cULR](#tab-cURL)
>[ruby](#tab-ruby)
{: .lang-selector}

~~~js
var request = $.ajax({
  url: "https://app.ticketmaster.com/discovery/v1/events/0B004F0401BD55E5/images.json",
  method: “GET”
});
request.done(function( msg ) {
  console.log( msg );
});
request.fail(function( jqXHR, textStatus ) {
  console.log("Request failed: " + textStatus);
});
~~~
{: #tab-js}

~~~ruby
def foo
  puts 'foo'
end
~~~
{: #tab-cURL}

~~~rudy
def foo
  puts 'foo'
end
~~~
{: #tab-ruby}

