---
layout: documentation
category: documentation
---

## Fixie tote bag ethnic keytar
> [JS](#js){: .active}
> [cULR](#cULR)
>{: .lang-selector}
>
~~~js
function Animal('name') {
    this.speed = 0;
    this.name = name;        
    this.run = function(speed) {
    this.speed += speed;
        alert( this.name + ' run, speed ' + this.speed );
    };        
    this.stop = function() {
        this.speed = 0;
        alert( this.name + ' is stay' );
        };
    };        
    var animal = new Animal('Animal');
    alert( animal.speed );    
~~~

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua [this a link](http://kramdown.gettalong.org) Ut enim ad minim veniam, quis nostrud exercitation ullamco

-----------

## Authentication
>#### Sync polaro
>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua.
>
> * [Android blog](http://tech.ticketmaster.com)
> * [Ticketmaster Tech blog](http://tech.ticketmaster.com)
> * [Android blog](http://tech.ticketmaster.com)
>
~~~js
def what?
    42
end
~~~

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco

 * [Android blog](http://tech.ticketmaster.com)
 * [Ticketmaster Tech blog](http://tech.ticketmaster.com)
  * Android blog
  * Ticketmaster Tech blog
  * Android blog
 * [Android blog](http://tech.ticketmaster.com)
 
-----------

### Overview
The Inventory API provides access to the *vehicle inventories* (or *cars for sale*) available at dealerships with a relationship with Edmunds.com. 
Due to the nature of this data, it's only available to **API Partners** and **Edmunds Developers**. 
If you're interested in becoming an API Partner, please <a href="http://developer.edmunds.com/contact_us/" 
onclick="window.open(this.href,  null, 'height=1155, width=680, toolbar=0, location=0, status=1, scrollbars=1, resizable=1'); return false">contact us</a>.
If you haven't yet, this might be a good time to read the [API Overview](/api-documentation/overview/) page to familiarize yourself with some of the core concepts required to using the API.<a name='sec-2'> </a>
[Back to top](#top)

### OAuth 2.0
The Inventory API requires **[OAuth 2.0](http://aaronparecki.com/articles/2012/07/29/1/oauth2-simplified)** for 
both *authentication* and *authorization*. Here is how you would get an OAuth access token:

>	curl -i -H 'Content-Type: application/x-www-form-urlencoded' 'https://api.edmunds.com/inventory/token' -X POST -d 'client_id=<api key>' -d 'client_secret=<shared secret>' -d 'grant_type=client_credentials'

You will find both your *api key* and *shared secret* in your [dashboard](http://edmunds.mashery.com/apps/mykeys).
If you've been given access by the Edmunds API Team, you should receive an _access\_token_ back. The _access\_token_ is valid for **one hour** after which you'll need to get a new one.
Now that you have your _access\_token_ for the hour, you can start making calls to the Inventory API resources this way:

>	curl -i -H 'Authorization: Bearer <access_token>' 'http://api.edmunds.com/{endpoint}'

Alternative, you can add the the _access\_token_ to the query string:

>	curl -i 'http://api.edmunds.com/{endpoint}?access_token=<access_token>'

We **do not recommend** the second approach since it's not secure.<a name='sec-3'> </a>
[Back to top](#top)