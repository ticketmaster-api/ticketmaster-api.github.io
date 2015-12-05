---
layout: documentation
category: documentation
---

##Discovery REST API

{: .lead #lead}
Description of API for discovery service. This API allows to work with events, attractions, categories and venues.

{: .pull-quote #pull-quote}
For work with API you should add to query string the __apikey__ parameter with your key.


{: #srch-evets }
##Search Events

> [JS](#js){: .active}
> [cURL](#cURL)
>{: .lang-selector}
>
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

{: .pull-quote #pull-quote}
discovery/{version}/events.{format}

Method: GET. 
Authentication required.
Returns the 20 most recent events for the authenticating user.

###Template parameters:

- __version__ - The API Version. Required. Default value "v1";
- __format__ - API Response Format. Required. Default value "json".

###Query parameters:

- __keyword__ - A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.
- __attractionId__ - Attraction ID(s) separated by comma. Default value "768011";
- __venueId__ - Venue ID(s) separated by comma. Default value "115378";
- __promoterId__ - Promoter ID(s) separated by comma. Default value "494";
- __zipCode__ - Zipcode or Portal Code of the venue in which the event is taking place. Default value "90069";
- __latlong__ - The longitude/Latitude coordinates for the venue in which this event is taking place. Default value "34.0928090,-118.3286610";
- __radius__ - The radius of the area in which we want to search for events. Default value "25";
- __size__ - The number of events returned in the API response. Default value "10";
- __page__ - The page for paginating through the results. Default value "1";
- __sort__ - The search sort criteria. Values: "", "eventDate,desc", "eventDate,asc", "name,desc", "name,asc";
- __locale__ - The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca";
- __marketId__ - The city/area in which this event takes place. Default value "27";
- __deviceId__ - The device making the API call. Default value "1";
- __domain__ - The entity interested in this event (special use case). Default value "ticketmaster.com".

###Response

<iframe src="https://snap.apigee.com/1ls3jia" width="760" height="300" frameborder="0" scrolling="no"></iframe>

{: #get-enent-det }
##Event Details

> [JS](#js){: .active}
> [cURL](#cURL)
>{: .lang-selector}
>
~~~js
var request = $.ajax({
  url: "https://app.ticketmaster.com/discovery/v1/events/0B004F0401BD55E5.json",
  method: “GET”
});
request.done(function( msg ) {
  console.log( msg );
});
request.fail(function( jqXHR, textStatus ) {
  console.log("Request failed: " + textStatus);
});
~~~

{: .pull-quote #pull-quote}
discovery/{version}/events/{id}.{format}

Method: GET.
Authentication required.
Returns the event detail by event ID.

###Template parameters:

- __version__ - The API Version. Required. Default value "v1";
- __id__ - Event ID. Required. Default value "29004F223C406ABF";
- __format__ - API Response Format. Required. Default value "json".

###Query parameters:

- __domain__ - The entity interested in this event (special use case). Default value "ticketmaster.com";
- __locale__ - The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca".

###Response

<iframe src="https://snap.apigee.com/1ImqiFR" width="860" height="600" frameborder="0" scrolling="no"></iframe>

{: #srch-event-img }
##Event Images

> [JS](#js){: .active}
> [cURL](#cURL)
>{: .lang-selector}
>
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

{: #srch-att }
##Search Attractions

> [JS](#js){: .active}
> [cURL](#cURL)
>{: .lang-selector}
>
~~~js
var request = $.ajax({
  url: "https://app.ticketmaster.com/discovery/v1/attractions.json",
  method: “GET”
});
request.done(function( msg ) {
  console.log( msg );
});
request.fail(function( jqXHR, textStatus ) {
  console.log("Request failed: " + textStatus);
});
~~~

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

{: #get-attr-det }
##Attraction Details

> [JS](#js){: .active}
> [cURL](#cURL)
>{: .lang-selector}
>
~~~js
var request = $.ajax({
  url: "https://app.ticketmaster.com/discovery/v1/attractions/768011.json",
  method: “GET”
});
request.done(function( msg ) {
  console.log( msg );
});
request.fail(function( jqXHR, textStatus ) {
  console.log("Request failed: " + textStatus);
});
~~~

{: .pull-quote #pull-quote}
discovery/{version}/attractions/{id}.{format}

Method: GET. 
Authentication required.
Search Attractions!

###Template parameters:

- __version__ - The API Version. Required. Default value "v1";
- __id__ - Attraction ID. Required. Default value "768011";
- __format__ - API Response Format. Required. Default value "json".

###Query parameters:

- __domain__ - The entity interested in this event (special use case). Default value "ticketmaster.com";
- __locale__ - The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca".

###Response

<iframe src="https://snap.apigee.com/1YERrIr" width="800" height="300" frameborder="0" scrolling="no"></iframe>

{: #srch-cat }
##Search Categories

> [JS](#js){: .active}
> [cURL](#cURL)
>{: .lang-selector}
>
~~~js
var request = $.ajax({
  url: "https://app.ticketmaster.com/discovery/v1/categories.json",
  method: “GET”
});
request.done(function( msg ) {
  console.log( msg );
});
request.fail(function( jqXHR, textStatus ) {
  console.log("Request failed: " + textStatus);
});
~~~

{: .pull-quote #pull-quote}
discovery/{version}/categories.{format}

Method: GET.
Authentication required.
Search Categories!

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

<iframe src="https://snap.apigee.com/1XuznDt" width="800" height="300" frameborder="0" scrolling="no"></iframe>

{: #get-cat-det }
##Category Details

> [JS](#js){: .active}
> [cURL](#cURL)
>{: .lang-selector}
>
~~~js
var request = $.ajax({
  url: "https://app.ticketmaster.com/discovery/v1/categories/203.json",
  method: “GET”
});
request.done(function( msg ) {
  console.log( msg );
});
request.fail(function( jqXHR, textStatus ) {
  console.log("Request failed: " + textStatus);
});
~~~

{: .pull-quote #pull-quote}
discovery/{version}/categories/{id}.{format}

Method: GET.
Authentication required.
Returns the category detail by ID.

###Template parameters:

- __version__ - The API Version. Required. Default value "v1";
- __id__ - Category ID. Required. Default value "203";
- __format__ - API Response Format. Required. Default value "json".

###Query parameters:

- __domain__ - The entity interested in this event (special use case). Default value "ticketmaster.com";
- __locale__ - The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca".

###Response

<iframe src="https://snap.apigee.com/1YERyU9" width="800" height="300" frameborder="0" scrolling="no"></iframe>

{: #srch-venues }
##Search Venues

> [JS](#js){: .active}
> [cURL](#cURL)
>{: .lang-selector}
>
~~~js
var request = $.ajax({
  url: "http://app.ticketmaster.com/discovery/v1/venues.json?keyword=UCV",
  method: “GET”
});
request.done(function( msg ) {
  console.log( msg );
});
request.fail(function( jqXHR, textStatus ) {
  console.log("Request failed: " + textStatus);
});
~~~

{: .pull-quote #pull-quote}
discovery/{version}/venues.{format}

Method: GET.
Authentication required.
Search Venues!

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

<iframe src="https://snap.apigee.com/1XuzHCk" width="800" height="300" frameborder="0" scrolling="no"></iframe>

{: #get-venues-det }
##Venue Details

> [JS](#js){: .active}
> [cURL](#cURL)
>{: .lang-selector}
>
~~~js
var request = $.ajax({
  url: "https://http://app.ticketmaster.com/discovery/v1/venues/90150.json",
  method: “GET”
});
request.done(function( msg ) {
  console.log( msg );
});
request.fail(function( jqXHR, textStatus ) {
  console.log("Request failed: " + textStatus);
});
~~~

{: .pull-quote #pull-quote}
discovery/{version}/venues/{id}.{format}

Method: GET.
Authentication required.
Returns the venue detail by ID.

###Template parameters:

- __version__ - The API Version. Required. Default value "v1";
- __id__ - Venue ID. Required. Default value "90150";
- __format__ - API Response Format. Required. Default value "json".

###Query parameters:

- __domain__ - The entity interested in this event (special use case). Default value "ticketmaster.com";
- __locale__ - The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca".

###Response

<iframe src="https://snap.apigee.com/1XuA0gh" width="800" height="300" frameborder="0" scrolling="no"></iframe>
