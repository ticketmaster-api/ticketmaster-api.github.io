---
layout: documentation
id: com1
categories:
- documentation
- commerce
---

#API DOCUMENTATION
{: .article}

Hella narwhal Cosby dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
{: .article .lead}

###Developer Console
{: .aside}

Test this endpoint right now in the interactive docs:

<button class="btn btn-default">INTERACTIVE DOCS</button>

##Commerse REST API
{: .article}

###Event Offers
{: .article}

Method: GET. 
Authentication required.
Returns Event Offers.

commerce/{version}/events/{id}/offers.{format}
{: .pull-quote #pull-quote}

####Template parameters:

__version__ - The API Version. Required. Default value "v2";

__id__ - Event ID. Required. Default value "05004F24E0B864B3";

__format__ - API Response Format. Required. Default value "json".

{: .aside}
>[CURL](#curl){: .active}
>[RUBY](#ruby)
>[PYTHON](#python)
{: .lang-selector}

~~~curl
curl https://app.ticketmaster.com/commerce/v2/events/05004F24E0B864B3/offers.json?apikey={apikey}
~~~

~~~ruby
require 'open-uri'
response = open('http://app.ticketmaster.com/commerce/v2/events/05004F24E0B864B3/offers.json?apikey={apikey}').read
puts response
~~~

~~~python
import urllib2
urllib2.urlopen("http://app.ticketmaster.com/commerce/v2/events/05004F24E0B864B3/offers.json?apikey={apikey}").read()
~~~

<iframe src="https://snap.apigee.com/1lhYRmB" class="article" frameborder="0" scrolling="no"></iframe>

###Event Offers
{: .article}

Method: GET. 
Authentication required.
Returns Event Offers.

commerce/{version}/events/{id}/offers.{format}
{: .pull-quote #pull-quote}

####Template parameters:

| Parameter    | Description          | Possible Values   | Default Value      | Required |
|:-------------|:---------------------|:----------------- |:------------------ |:-------- |
| __version__  | The API Version.     | string            |       “v2”         | Yes      |
| __id__       | Event ID. Required.  | string            | “05004F24E0B864B3” | Yes      |
| __format__   | API Response Format. | string            |       “json”       | Yes      |

{: .aside}
>[CURL](#curl){: .active}
>[RUBY](#ruby)
>[PYTHON](#python)
{: .lang-selector}

~~~curl
curl https://app.ticketmaster.com/commerce/v2/events/05004F24E0B864B3/offers.json?apikey={apikey}
~~~

~~~ruby
require 'open-uri'
response = open('http://app.ticketmaster.com/commerce/v2/events/05004F24E0B864B3/offers.json?apikey={apikey}').read
puts response
~~~

~~~python
import urllib2
urllib2.urlopen("http://app.ticketmaster.com/commerce/v2/events/05004F24E0B864B3/offers.json?apikey={apikey}").read()
~~~

<iframe src="https://snap.apigee.com/1lhYRmB" class="article" frameborder="0" scrolling="no"></iframe>

###Event Offers
{: .article}

Method: GET. 
Authentication required.
Returns Event Offers.

commerce/{version}/events/{id}/offers.{format}
{: .pull-quote #pull-quote}

####Template parameters:

| Parameter  | Description          | Type              | Default Value      | Required |
|:-----------|:---------------------|:----------------- |:------------------ |:-------- |
| `version`  | The API Version.     | string            |       “v2”         | Yes      |
| `id`       | Event ID. Required.  | string            | “05004F24E0B864B3” | Yes      |
| `format`   | API Response Format. | string            |       “json”       | Yes      |

{: .aside}
>[CURL](#curl){: .active}
>[RUBY](#ruby)
>[PYTHON](#python)
{: .lang-selector}

~~~curl
curl https://app.ticketmaster.com/commerce/v2/events/05004F24E0B864B3/offers.json?apikey={apikey}
~~~

~~~ruby
require 'open-uri'
response = open('http://app.ticketmaster.com/commerce/v2/events/05004F24E0B864B3/offers.json?apikey={apikey}').read
puts response
~~~

~~~python
import urllib2
urllib2.urlopen("http://app.ticketmaster.com/commerce/v2/events/05004F24E0B864B3/offers.json?apikey={apikey}").read()
~~~

<iframe src="https://snap.apigee.com/1lhYRmB" class="article" frameborder="0" scrolling="no"></iframe>

###Event Offers
{: .article}

Method: GET. 
Authentication required.
Returns Event Offers.

commerce/{version}/events/{id}/offers.{format}
{: .pull-quote #pull-quote}

####Template parameters:

`version` - The API Version. Required. Default value "v2";

`id` - Event ID. Required. Default value "05004F24E0B864B3";

`format` - API Response Format. Required. Default value "json".

{: .aside}
>[CURL](#curl){: .active}
>[RUBY](#ruby)
>[PYTHON](#python)
{: .lang-selector}

~~~curl
curl https://app.ticketmaster.com/commerce/v2/events/05004F24E0B864B3/offers.json?apikey={apikey}
~~~

~~~ruby
require 'open-uri'
response = open('http://app.ticketmaster.com/commerce/v2/events/05004F24E0B864B3/offers.json?apikey={apikey}').read
puts response
~~~

~~~python
import urllib2
urllib2.urlopen("http://app.ticketmaster.com/commerce/v2/events/05004F24E0B864B3/offers.json?apikey={apikey}").read()
~~~

<iframe src="https://snap.apigee.com/1lhYRmB" class="article" frameborder="0" scrolling="no"></iframe>


###Event Offers
{: .article}

Method: GET. 
Authentication required.
Returns Event Offers.

commerce/{version}/events/{id}/offers.{format}
{: .pull-quote #pull-quote}

####Template parameters:

__version__{: style="color: red"} - The API Version. Required. Default value "v2";

__id__{: style="color: red"} - Event ID. Required. Default value "05004F24E0B864B3";

__format__{: style="color: red"} - API Response Format. Required. Default value "json".

{: .aside}
>[CURL](#curl){: .active}
>[RUBY](#ruby)
>[PYTHON](#python)
{: .lang-selector}

~~~curl
curl https://app.ticketmaster.com/commerce/v2/events/05004F24E0B864B3/offers.json?apikey={apikey}
~~~

~~~ruby
require 'open-uri'
response = open('http://app.ticketmaster.com/commerce/v2/events/05004F24E0B864B3/offers.json?apikey={apikey}').read
puts response
~~~

~~~python
import urllib2
urllib2.urlopen("http://app.ticketmaster.com/commerce/v2/events/05004F24E0B864B3/offers.json?apikey={apikey}").read()
~~~

<iframe src="https://snap.apigee.com/1lhYRmB" class="article" frameborder="0" scrolling="no"></iframe>