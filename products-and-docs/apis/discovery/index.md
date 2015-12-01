---
layout: documentation
---

##Discovery REST API

{: .lead #lead}
Description of API for discovery service. This API allows to work with events, attractions, categories and venues.

##Search Events

> [JS](#js){: .active}
> [cULR](#cULR)
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

- version - The API Version. Required. Default value "v1";
- format - API Response Format. Required. Default value "json".

###Query parameters:

- keyword - A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.
- attractionId - Attraction ID(s) separated by comma. Default value "768011";
- venueId - Venue ID(s) separated by comma. Default value "115378";
- promoterId - Promoter ID(s) separated by comma. Default value "494";
- zipCode - Zipcode or Portal Code of the venue in which the event is taking place. Default value "90069";
- latlong - The longitude/Latitude coordinates for the venue in which this event is taking place. Default value "34.0928090,-118.3286610";
- radius - The radius of the area in which we want to search for events. Default value "25";
- size - The number of events returned in the API response. Default value "10";
- page - The page for paginating through the results. Default value "1";
- sort - The search sort criteria. Values: "", "eventDate,desc", "eventDate,asc", "name,desc", "name,asc";
- locale - The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca";
- marketId - The city/area in which this event takes place. Default value "27";
- deviceId - The device making the API call. Default value "1";
- domain - The entity interested in this event (special use case). Default value "ticketmaster.com".

###Response

<iframe src="https://snap.apigee.com/1ls3jia" width="800" height="300" frameborder="0" scrolling="no"></iframe>

##Event Details

> [JS](#js){: .active}
> [cULR](#cULR)
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

- version - The API Version. Required. Default value "v1";
- id - Event ID. Required. Default value "29004F223C406ABF";
- format - API Response Format. Required. Default value "json".

###Query parameters:

- domain - The entity interested in this event (special use case). Default value "ticketmaster.com";
- locale - The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca".

###Response

<iframe src="https://snap.apigee.com/1YERdB2" width="800" height="300" frameborder="0" scrolling="no"></iframe>


##Event Images

> [JS](#js){: .active}
> [cULR](#cULR)
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

- version - The API Version. Required. Default value "v1";
- id - Event ID. Required. Default value "0B004F0401BD55E5";
- format - API Response Format. Required. Default value "json".

###Response

<iframe src="https://snap.apigee.com/1YERkwm" width="800" height="300" frameborder="0" scrolling="no"></iframe>

##Search Attractions

> [JS](#js){: .active}
> [cULR](#cULR)
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

- version - The API Version. Required. Default value "v1";
- format - API Response Format. Required. Default value "json".

###Query parameters:

- keyword - A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.
- domain - The entity interested in this event (special use case). Default value "ticketmaster.com";
- locale - The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca";
- size - The number of events returned in the API response. Default value "10";
- page - The page for paginating through the results. Default value "1";
- sort - The search sort criteria. Values: "", "name,desc", "name,asc".

###Response

<iframe src="https://snap.apigee.com/1XuyzP2" width="800" height="300" frameborder="0" scrolling="no"></iframe>

##Attraction Details

> [JS](#js){: .active}
> [cULR](#cULR)
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

- version - The API Version. Required. Default value "v1";
- id - Attraction ID. Required. Default value "768011";
- format - API Response Format. Required. Default value "json".

###Query parameters:

- domain - The entity interested in this event (special use case). Default value "ticketmaster.com";
- locale - The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca".

###Response

<iframe src="https://snap.apigee.com/1YERrIr" width="800" height="300" frameborder="0" scrolling="no"></iframe>

##Search Categories

> [JS](#js){: .active}
> [cULR](#cULR)
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

- version - The API Version. Required. Default value "v1";
- format - API Response Format. Required. Default value "json".

###Query parameters:

- keyword - A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.
- domain - The entity interested in this event (special use case). Default value "ticketmaster.com";
- locale - The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca";
- size - The number of events returned in the API response. Default value "10";
- page - The page for paginating through the results. Default value "1";
- sort - The search sort criteria. Values: "", "name,desc", "name,asc".

###Response

<iframe src="https://snap.apigee.com/1XuznDt" width="800" height="300" frameborder="0" scrolling="no"></iframe>

##Category Details

> [JS](#js){: .active}
> [cULR](#cULR)
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

- version - The API Version. Required. Default value "v1";
- id - Category ID. Required. Default value "203";
- format - API Response Format. Required. Default value "json".

###Query parameters:

- domain - The entity interested in this event (special use case). Default value "ticketmaster.com";
- locale - The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca".

###Response

<iframe src="https://snap.apigee.com/1YERyU9" width="800" height="300" frameborder="0" scrolling="no"></iframe>

##Search Venues

> [JS](#js){: .active}
> [cULR](#cULR)
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

- version - The API Version. Required. Default value "v1";
- format - API Response Format. Required. Default value "json".

###Query parameters:

- keyword - A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.
- domain - The entity interested in this event (special use case). Default value "ticketmaster.com";
- locale - The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca";
- size - The number of events returned in the API response. Default value "10";
- page - The page for paginating through the results. Default value "1";
- sort - The search sort criteria. Values: "", "name,desc", "name,asc".

###Response

<iframe src="https://snap.apigee.com/1XuzHCk" width="800" height="300" frameborder="0" scrolling="no"></iframe>

##Venue Details

> [JS](#js){: .active}
> [cULR](#cULR)
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

- version - The API Version. Required. Default value "v1";
- id - Venue ID. Required. Default value "90150";
- format - API Response Format. Required. Default value "json".

###Query parameters:

- domain - The entity interested in this event (special use case). Default value "ticketmaster.com";
- locale - The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca".

###Response

<iframe src="https://snap.apigee.com/1XuA0gh" width="800" height="300" frameborder="0" scrolling="no"></iframe>
