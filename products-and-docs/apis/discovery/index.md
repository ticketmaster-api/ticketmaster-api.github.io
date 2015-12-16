---
layout: documentation
categories:
- documentation
- discovery
---

#Discovery REST API
{: .article}


Description of API for discovery service. This API allows to work with events, attractions, categories and venues.
{: .lead .article}

For work with API you should add to query string the __apikey__ parameter with your key.
{: .pull-quote}

####Developer Console
{: .aside .gray}

Test this endpoint right now in the interactive docs:

[INTERACTIVE DOCS](/products-and-docs/apis/interactive-console/){: .button}


##Search Events
{: .article #srch-events }

Method: GET. 
Authentication required.
Returns the 20 most recent events for the authenticating user.

discovery/{version}/events.{format}
{: .pull-quote}

###Template parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v1"         | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |

###Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `keyword`  | A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.     | string            |                | No      |
| `attractionId`   | Attraction ID(s) separated by comma. | string            |       "768011"       | No      |
| `venueId`   | Venue ID(s) separated by comma. | string            |       "115378"       | No      |
| `promoterId`   | Promoter ID(s) separated by comma. | string            |       "494"       | No      |
| `zipCode`   | Zipcode or Portal Code of the venue in which the event is taking place. | string            |       "90069"       | No      |
| `latlong`   | The longitude/Latitude coordinates for the venue in which this event is taking place. | string            |       "34.0928090,-118.3286610"       | No      |
| `radius`   | The radius of the area in which we want to search for events. | string            |       "25"       | No      |
| `size`   | The number of events returned in the API response. | string            |       "10"       | No      |
| `page`   | The page for paginating through the results. | string            |       "1"       | No      |
| `sort`   | The search sort criteria. Values: "", "eventDate,desc", "eventDate,asc", "name,desc", "name,asc". | string            |              | No      |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |              | No      |
| `marketId`   | The city/area in which this event takes place. | string            |       "27"       | No      |
| `deviceId`   | The device making the API call. | string            |       "1"       | No      |
| `domain`   | The entity interested in this event (special use case). | string           |      "ticketmaster.com"     | No      |

{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v1/events.json?size=1&apikey={apikey}",
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
curl https://app.ticketmaster.com/discovery/v1/events.json?size=1&apikey={apikey}
{% endhighlight %}

<div class="article iframe-wrapper">
<iframe src="https://snap.apigee.com/1ls3jia" frameborder="0" scrolling="no"></iframe>
</div>


---
{: .aside}


##Event Details
{: .article #event-details }

Method: GET.
Authentication required.
Returns the event detail by event ID.

discovery/{version}/events/{id}.{format}
{: .pull-quote}


###Template parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v1"         | Yes      |
| `id`       | Event ID. Required.  | string            | "29004F223C406ABF" | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |

###Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `domain`   | The entity interested in this event (special use case). | string           |      "ticketmaster.com"     | No      |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |              | No      |

{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v1/events/0B004F0401BD55E5.json?apikey={apikey}",
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
curl https://app.ticketmaster.com/discovery/v1/events/0B004F0401BD55E5.json?apikey={apikey}
{% endhighlight %}

<div class="article iframe-wrapper">
<iframe src="https://snap.apigee.com/1lLCpCR" frameborder="0" scrolling="no"></iframe>
</div>

---
{: .aside}



##Event Images
{: .article #event-img}

Method: GET. 
Authentication required.
Returns all the images for an event by ID. If an event does not have an image for a supported resolution, the event's major category image will be returned instead.

{: .pull-quote}
discovery/{version}/events/{id}/images.{format}

###Template parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v1"         | Yes      |
| `id`       | Event ID.            | string            | "0B004F0401BD55E5" | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |

{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v1/events/0B004F0401BD55E5/images.json?apikey={apikey}",
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
curl https://app.ticketmaster.com/discovery/v1/events/0B004F0401BD55E5/images.json?apikey={apikey}
{% endhighlight %}


<div class="article iframe-wrapper">
<iframe src="https://snap.apigee.com/1YERkwm" frameborder="0" scrolling="no"></iframe>
</div>

---
{: .aside}




{: .article #search-attractions}
##Search Attractions

Method: GET.
Authentication required.
Search Attractions!

{: .pull-quote}
discovery/{version}/attractions.{format}

###Template parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       "v1"         | Yes      |
| `format`   | API Response Format. | string            |       "json"       | Yes      |

###Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `keyword`  | A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.     | string            |                | No      |
| `domain`   | The entity interested in this event (special use case). | string           |      "ticketmaster.com"     | No      |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |              | No      |
| `size`   | The number of events returned in the API response. | string            |       "10"       | No      |
| `page`   | The page for paginating through the results. | string            |       "1"       | No      |
| `sort`   | The search sort criteria. Values: "name,desc", "name,asc". | string            |              | No      |

{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v1/attractions.json?apikey={apikey}",
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
curl https://app.ticketmaster.com/discovery/v1/attractions.json?apikey={apikey}
{% endhighlight %}


<div class="article iframe-wrapper">
<iframe src="https://snap.apigee.com/1XuyzP2" frameborder="0" scrolling="no"></iframe>
</div>

---
{: .aside}



{: .article #attraction-details}
##Attraction Details

Method: GET. 
Authentication required.
Search Attractions!

discovery/{version}/attractions/{id}.{format}
{: .pull-quote}

###Template parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |     "v1"           | Yes      |
| `id`       | Attraction ID.       | string            |     "768011"       | Yes      |
| `format`   | API Response Format. | string            |     "json"         | Yes      |



###Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `domain`   | The entity interested in this event (special use case). | string           |      "ticketmaster.com"     | No      |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |              | No      |


{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v1/attractions/768011.json?apikey={apikey}",
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
curl https://app.ticketmaster.com/discovery/v1/attractions/768011.json?apikey={apikey}
{% endhighlight %}

<div class="article iframe-wrapper">
<iframe src="https://snap.apigee.com/1YERrIr" frameborder="0" scrolling="no"></iframe>
</div>

---
{: .aside}




{: .article #search-categories}
##Search Categories

Method: GET.
Authentication required.
Search Categories!

discovery/{version}/categories.{format}
{: .pull-quote}

###Template parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |     "v1"           | Yes      |
| `format`   | API Response Format. | string            |     "json"         | Yes      |

###Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `keyword`  | A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.     | string            |                | No      |
| `domain`   | The entity interested in this event (special use case). | string           |      "ticketmaster.com"     | No      |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |              | No      |
| `size`   | The number of events returned in the API response. | string            |       "10"       | No      |
| `page`   | The page for paginating through the results. | string            |       "1"       | No      |
| `sort`   | The search sort criteria. Values: "", "name,desc", "name,asc". | string            |              | No      |


{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v1/categories.json?apikey={apikey}",
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
curl https://app.ticketmaster.com/discovery/v1/categories.json?apikey={apikey}
{% endhighlight %}

<div class="article iframe-wrapper">
<iframe src="https://snap.apigee.com/1XuznDt" frameborder="0" scrolling="no"></iframe>
</div>

---
{: .aside}



{: .article #category-details}
##Category Details

Method: GET.
Authentication required.
Returns the category detail by ID.

{: .pull-quote}
discovery/{version}/categories/{id}.{format}

###Template parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |     "v1"           | Yes      |
| `id`       | Category ID.         | string            |     "203"          | Yes      |
| `format`   | API Response Format. | string            |     "json"         | Yes      |


###Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `domain`   | The entity interested in this event (special use case). | string           |      "ticketmaster.com"     | No      |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |              | No      |


{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v1/categories/203.json?apikey={apikey}",
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
curl https://app.ticketmaster.com/discovery/v1/categories/203.json?apikey={apikey}
{% endhighlight %}

<div class="article iframe-wrapper">
<iframe src="https://snap.apigee.com/1YERyU9" frameborder="0" scrolling="no"></iframe>
</div>

---
{: .aside}



{: .article #search-venues}
##Search Venues

Method: GET.
Authentication required.
Search Venues!

discovery/{version}/venues.{format}
{: .pull-quote}


###Template parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |     "v1"           | Yes      |
| `format`   | API Response Format. | string            |     "json"         | Yes      |

###Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `keyword`  | A string to search against events, attractions and venues. The keyword will be checked against titles, descriptions, names and other logical fields that describe any of these data objects.     | string            |                | No      |
| `domain`   | The entity interested in this event (special use case). | string           |      "ticketmaster.com"     | No      |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |              | No      |
| `size`   | The number of events returned in the API response. | string            |       "10"       | No      |
| `page`   | The page for paginating through the results. | string            |       "1"       | No      |
| `sort`   | The search sort criteria. Values: "", "name,desc", "name,asc". | string            |              | No      |


{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v1/venues.json?keyword=UCV&apikey={apikey}",
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
curl https://app.ticketmaster.com/discovery/v1/venues.json?keyword=UCV&apikey={apikey}
{% endhighlight %}

<div class="article iframe-wrapper">
<iframe src="https://snap.apigee.com/1XuzHCk" frameborder="0" scrolling="no"></iframe>
</div>

---
{: .aside}


{: .article #venue-details}
##Venue Details

Method: GET.
Authentication required.
Returns the venue detail by ID.

discovery/{version}/venues/{id}.{format}
{: .pull-quote}

###Template parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |     "v1"           | Yes      |
| `id`       | Venue ID.            | string            |     "90150"          | Yes      |
| `format`   | API Response Format. | string            |     "json"         | Yes      |

###Query parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `domain`   | The entity interested in this event (special use case). | string           |      "ticketmaster.com"     | No      |
| `locale`   | The event locale, including country and localization. Values: "", "en-us", "en-gb", "en-ca", "es-us", "en-mx", "es-mx", "en-au", "en-nz", "fr-fr", "fr-ca". | string            |              | No      |


{: .aside}
>[JS](#js)
>[cURL](#curl)
{: .lang-selector}

{% highlight js %}
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v1/venues/90150.json?apikey={apikey}",
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
curl https://app.ticketmaster.com/discovery/v1/venues/90150.json?apikey={apikey}
{% endhighlight %}

<div class="article iframe-wrapper">
<iframe src="https://snap.apigee.com/1XuA0gh" frameborder="0" scrolling="no"></iframe>
</div>

---
{: .aside}


