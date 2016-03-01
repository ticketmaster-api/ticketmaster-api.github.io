---
layout: base-content
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
<form accept-charset="UTF-8" action="#" method="POST" class="js_contact_form">    
    <div class="col-sm-6">
        <label for="name">Your name</label>
        <input type="text" id="first-name" name="yourName" maxlength="255" placeholder="" autofocus tabindex="1" required>
    </div>    
    <div class="col-sm-6">
        <label for="email">Email address</label>
        <input type="email" id="email" name="email" placeholder="" required tabindex="2" required>
    </div>    
    <div class="col-sm-12">
        <label for="subject">Subject</label>
        <div class="js_custom_select custom_select">
          <select required="" class="custom_select__field" name="subject" id="subject">
            <option value="Developer Relations">Developer Relations</option>
            <option value="Business Opportunities and Partnerships">Business Opportunities and Partnerships</option>
            <option value="API Bugs and Questions">API Bugs and Questions</option>
            <option value="Join Ticketmaster!">Join Ticketmaster!</option>
          </select>
          <input class="custom_select__placeholder" type="text" value="Developer Relations" readonly="">
          <ul class="custom_select__list">
            <li class="custom_select__item custom_select__item-active" data-value="Developer Relations">Developer Relations</li>
            <li class="custom_select__item" data-value="Business Opportunities and Partnerships">Business Opportunities and Partnerships</li>
            <li class="custom_select__item" data-value="API Bugs and Questions">API Bugs and Questions</li>
            <li class="custom_select__item" data-value="Join Ticketmaster!">Join Ticketmaster!</li>           
          </ul>
        </div>
    </div>
       
    <div class="col-sm-12">
        <label for="descriptions">Descriptions</label>
        <textarea name="descriptions" id="company-detail-text" tabindex="3" required></textarea>
    </div>
    <div class="col-sm-12">
        <p id="message-success" class="message-green" style="display:none">Thank you for contacting us. We will review and respond promptly.</p>
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
      <select required="" class="custom_select__field" name="subject" id="address-office">        
        <option value="losAngeles" selected>Los Angeles</option>
        <option value="phoenix">Phoenix</option>        
      </select>
      <input class="custom_select__placeholder" type="text" value="Los Angeles" readonly="">
      <ul class="custom_select__list">
        <li class="custom_select__item" data-value="losAngeles">Los Angeles</li>
        <li class="custom_select__item" data-value="phoenix">Phoenix</li>
      </ul>
    </div>
</div>
</div>
<div class="google_map col-xs-12">
    <div id="js_google_map">
    </div>
</div>

<!--contact us form -->
<script>
var $contactForm = $('.js_contact_form');
    $contactForm.submit(function(e){
        e.preventDefault();
        $.ajax({
          dataType: 'jsonp',
          url: "https://getsimpleform.com/messages/ajax?form_api_token=892e0c5e4c169c6128c7342614608330",
          data: $contactForm.serialize() 
        }).done(function() {
          //callback which can be used to show a thank you message
          //and reset the form
          showMsgSuccess('#message-success', 4000);
        });
        return false; //to stop the form from submitting
    }); 
    function showMsgSuccess(id, delay){
        $(id).slideDown(400).delay( delay ).slideUp(200);
    }
</script>

<!--google map -->
<script>
    // When the user change city, an info window opens above selected item.
    var map,
        cities = {
            phoenix : {
                position: {lat: 33.533482, lng: -112.107254},
                tooltip: "1375 N Scottsdale Rd, Scottsdale, AZ 85257, US"
            },
            losAngeles : {
                position: {lat: 34.052235, lng: -118.243683},
                tooltip: "7060 Hollywood Blvd, Los Angeles, California, 90028, US"
            }
        };
    var markers = [];
    var infowindows = [];

    function initMap() {
        var mapElement = document.getElementById('js_google_map');
        map = new google.maps.Map(mapElement, {
            zoom: 8,
            center: cities.losAngeles.position //default center
        });
        //first init
        var defaultCity = document.getElementById('address-office').value;
        mapElement.style.height = 240 + "px";
        addOneMarker( defaultCity );
    }

    function addOneMarker(city) {
        deleteMarkers();
        var infowindow = new google.maps.InfoWindow({ map: map });
        map.setCenter(cities[city].position);
        infowindow.setContent('<div><strong>' + cities[city].tooltip + '</strong></div>' );
        infowindow.setPosition(cities[city].position);
        infowindows.push(infowindow);
    }

    // Deletes all markers in the array by removing references to them.
    function deleteMarkers() {
        for (var i = 0; i < infowindows.length; i++) {
            infowindows[i].close();
        }
        infowindows = [];
    }

    // Listener for <select> cities
    var onChangeHandler = function(val) {
        addOneMarker(val);
    };

    $('#address-office').on('change', function(){
        //should send 'val' since using cutom select
        onChangeHandler($(this).val());
    });

</script>

<script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB3-oFbQWw_jEcG7r7WGdi99jNT3DqvRas&callback=initMap">
</script>