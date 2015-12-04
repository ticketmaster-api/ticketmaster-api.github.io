---
layout: documentation
categories: products-and-docs/apis/samples/
---
#WIDE ONE COLUMN
{: .article}

This is one column article.

#TWO COLUMN
{: .article}

##Left

This is left column.

##Right
{: .aside}

This is rignt column.

#ONLY LEFT COLUMN
{: .article}

##Left

This is left column.

---
{: .aside}

---
{: .article}

#ONLY RIGHT COLUMN
{: .aside}

##Right

This is rignt column.

{::comment}
Real example
{:/comment}

##Search Events
{: .article}

discovery/{version}/events.{format}

Method: GET. 
Authentication required.
Returns the 20 most recent events for the authenticating user.

###Template parameters:

- __version__ - The API Version. Required. Default value "v1";
- __format__ - API Response Format. Required. Default value "json".

{: .aside}
>[JS](#js){: .active}
>[cULR](#cULR)
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