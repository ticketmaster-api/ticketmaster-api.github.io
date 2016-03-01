---
layout: base-content
logos_url: "/assets/img/partners/logos/"
categories:
- support
- contact-us
title: Contact us
excerpt: Contact us excerpt.
keywords: Contact us keywords.
---

{: .col-xs-12}
# Contact us

{: .lead .col-xs-12 .col-sm-8}
Contact us, fixie tote bag ethnic keytar. Neutra vinyl American Apparel kale chips tofu art party, cardigan raw denim quinoa.

{% capture social %}
{: .gray .base-margin-top .text-center}
### We are social!

* [![Twitter](../../../assets/img/ic-twitter.svg)](https://twitter.com/tmastertech)
* [![Facebook](../../../assets/img/ic-facebook.svg)](https://www.facebook.com/TicketmasterTech)
* [![Medium](../../../assets/img/ic-medium.svg)](https://medium.com/ticketmaster-tech)
{% endcapture %}

{% capture formheader %}
{: .col-xs-12 .col-sm-8}
## Leave the Message

{: .col-xs-12 .col-sm-8 .no-margin-top}
Email us and we'll do our best to respond within 12 hours!
{% endcapture %}

{% capture address %}
## Our Contacts

Whether it's pen to paper or straight from your printer, address all mail to:

{: .left-margin .clear-margin .left-border}
Live Nation Entertainment, Inc. 

{: .left-margin .clear-margin .left-border}
9348 Civic Center Drive 

{: .left-margin .clear-margin .left-border}
Beverly Hills, CA 90210 

{: .left-margin .clear-margin .left-border}
Attn: Trademark Department, Legal 

{: .left-margin .clear-margin .left-border}
[copyrightofficer@livenation.com](mailto:copyrightofficer@livenation.com)
{% endcapture %}

{% capture map %}
{: .double-margin-top}
### Find us on the map
{% endcapture %}

<!-- html goes here -->


<div class="col-xs-12 col-sm-4 text-center social-icons" markdown="1">
{{social}}
</div>

<div class="clearfix"></div>

<div markdown="1">
{{formheader}}
<div class="col-xs-12 col-sm-8 contact-form-wrapper">
<form accept-charset="UTF-8" action="#" method="POST" class="js_nexus_form">    
    <div class="col-sm-6">
        <label for="name">Your name</label>
        <input type="text" id="first-name" name="yourName" maxlength="255" placeholder="" autofocus tabindex="1">
    </div>    
    <div class="col-sm-6">
        <label for="email">Email address</label>
        <input type="email" id="email" name="email" placeholder="" required tabindex="2">
    </div>    
    <div class="col-sm-12">
        <label for="subject">Subject</label>
        <div class="js_custom_select custom_select">
          <select required="" class="custom_select__field" name="subject" id="subject">
            <option value="Developer Relations">Developer Relations</option>
            <option value="Developer Relations-2">Developer Relations-2</option>
            <option value="Developer Relations-3">Developer Relations-3</option>
          </select>
          <input class="custom_select__placeholder" type="text" value="Developer Relations" readonly="">
          <ul class="custom_select__list">
            <li class="custom_select__item custom_select__item-active" data-value="Developer Relations">Developer Relations</li>
            <li class="custom_select__item" data-value="Developer Relations-2">Developer Relations-2</li>
            <li class="custom_select__item" data-value="Developer Relations-3">Developer Relations-3</li>
          </ul>
        </div>
    </div>
       
    <div class="col-sm-12">
        <label for="descriptions">Descriptions</label>
        <textarea name="descriptions" id="company-detail-text" tabindex="10"></textarea>
    </div>    
    <div class="col-sm-4">
        <button type="submit" class="button-blue">SEND</button>
    </div>
</form>
</div>
</div>

<div class="clearfix"></div>

<div markdown="1" class="col-xs-12 col-sm-8">
{{address}}	
</div>

<div class="clearfix"></div>

<div markdown="1" class="col-xs-12 col-sm-8">
{{map}}
<div class="col-xs-12 col-sm-6 city-select">
    <div class="js_custom_select custom_select">
      <select required="" class="custom_select__field" name="subject" id="subject">
        <option value="chicago, il">Chicago</option>
        <option value="los angeles, ca">Los Angeles</option>
        <option value="oklahoma city, ok">Oklahoma City</option>        
      </select>
      <input class="custom_select__placeholder" type="text" value="Chicago" readonly="">
      <ul class="custom_select__list">
        <li class="custom_select__item custom_select__item-active" data-value="chicago, il">Chicago</li>
        <li class="custom_select__item" data-value="los angeles, ca">Los Angeles</li>
        <li class="custom_select__item" data-value="oklahoma city, ok">Oklahoma City</li>
      </ul>
    </div>
</div>
</div>
<div class="google_map col-xs-12">
    <div id="js_google_map">
    </div>
</div>

<!--google map -->
<script>
    $(document).ready( function(){

        var map,
            chicago = {lat:41.850033, lng:-87.6500523};
            losAngeles = {lat:33.4,lng:-118.4381589};
            markers =[ chicago ],
            centerMap = {
                lat: 39.3648338,
                lng: -101.4381589
            };
        (function initMap(elementId, elementHeight, center, zoom, markers) {
            console.log('start initMap');
            var element = document.getElementById(elementId);
            map = new google.maps.Map(element, {
                center: center,
                zoom: zoom 
            });
                        
            if(markers.length>0) {
                for (var i in markers) {
                    new google.maps.Marker({
                        position: {
                            lat: markers[i].lat,
                            lng: markers[i].lng
                        },
                        map: map
                    });
                }
            }
            
            element.style.height = elementHeight+"px";

        })('js_google_map' , 240 , centerMap, 4, markers);
    });
</script>

<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB3-oFbQWw_jEcG7r7WGdi99jNT3DqvRas&libraries=visualization"></script>