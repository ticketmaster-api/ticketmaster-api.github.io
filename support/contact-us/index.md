---
layout: base-content
categories:
- support
- contact-us
title: Contact us
excerpt: Contact us
keywords: Contact us
---

{: .col-xs-12}
# Contact us

{: .lead .col-xs-12 .col-sm-8}
We'd love to hear from you. Please let us know how we can help!

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

<div class="col-xs-12 col-sm-6 city-select">
    <div class="js_custom_select custom_select" id="city-list">
      <select required="" class="custom_select__field" name="subject" id="address-office">        
        <option value="losAngeles" data-ltd="34.052235" data-lng="-118.243683" data-tooltip="7060 Hollywood Blvd, Los Angeles, California, 90028, US" selected>Los Angeles</option>
        <option value="phoenix" data-ltd="33.533482" data-lng="-112.107254" data-tooltip="1375 N Scottsdale Rd, Scottsdale, AZ 85257, US">Phoenix</option>        
      </select>
      <input class="custom_select__placeholder" type="text" value="Los Angeles" readonly="">      
    </div>
</div>

{% endcapture %}

<!-- html goes here -->


<div class="col-xs-12 col-sm-4 text-center social-icons" markdown="1">
{{social}}
</div>

<div class="clearfix"></div>

<div markdown="1">
{{formheader}}
<div class="col-xs-12 col-sm-8 contact-form-wrapper">
<form accept-charset="UTF-8" action="#" method='POST' class="js_contact_form">
    <div class="col-sm-6">
        <label for="first-name">Your name</label>
        <input type="text" id="first-name" name="yourName" maxlength="255" placeholder="" tabindex="1" required>
    </div>    
    <div class="col-sm-6">
        <label for="email-contact">Email address</label>        
        <input type="email" id="email-contact" name="email" required pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$" title="Use the following format '-@-.--' " tabindex="2">
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
        <textarea name="descriptions" id="message-detail-text" tabindex="3" required></textarea>
    </div>
    <div class="col-sm-12">
        <p id="message-success" class="text-overflow-message text-overflow-message__green" style="display:none">Thank you for contacting us. We will review and respond promptly.</p>
        <p id="message-error" class="text-overflow-message text-overflow-message__red" style="display:none">The maximum length of description can be 3000 characters.</p>
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
</div>
<div class="google_map col-xs-12">
    <div id="js_google_map">
    </div>
</div>

<!--contact us form -->
<script>
var $contactForm = $('.js_contact_form'),
    $textAreaDescription = $('#message-detail-text');

    $contactForm.submit(function(e){
        var charCount = $textAreaDescription.val().length;

        e.preventDefault();
        $('button', $contactForm).prop('disabled',true);

        if(3000 <= charCount) {
          showMsgError('#message-error', 4000 , charCount);
          return false;
        }

        $.ajax({
          dataType: 'jsonp',
          url: "https://getsimpleform.com/messages/ajax?form_api_token=d9878ccc8e22c7253d057015617f82cd",
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
        $contactForm.trigger("reset");
        $('.js_custom_select',$contactForm).trigger("custom-reset");
        //$textAreaDescription.css('height',''); //reset height of textarea
        $('button', $contactForm).prop('disabled',false);
    }
    function showMsgError(id, delay, charCount){
        var slideUpSpeed = 200;
        $(id).append('<span id="contact-char-count"> Current count is '+charCount+'</span>')
        $(id).slideDown(400).delay( delay ).slideUp(slideUpSpeed);
        setTimeout(
          function(){
              $('#contact-char-count').remove();
              $('button', $contactForm).prop('disabled',false);
          },
          delay + slideUpSpeed*3);
    }
</script>

<script>
(function ($) {
    var $cityWrapper = $('#city-list'),
        $listWrapper = $cityWrapper.find('#address-office'),
        $listOption = $listWrapper.find('option');

    function addCustomList() {
        //create ul
        var $ul = $('<ul class="custom_select__list">').appendTo($cityWrapper);

        //put li inside ul
        $listOption.each(function () {
            var data = {
                value: $(this).val()                
            };
            $ul.append("<li class='custom_select__item' data-value='" + data.value + "' >" + $(this).text() + "</li>")
        });
    }

    addCustomList();

})(jQuery);
</script>

<!--google map -->
<script>
// When the user change city, an info window opens above selected item.
var map,
    cities = citiesGenerate();
var markers = [];
var infowindows = [];

function citiesGenerate(){
    var obj={};
    var $cityWrapper = $('#city-list'),
        $listWrapper = $cityWrapper.find('#address-office'),
        $list = $listWrapper.find('option');

    $list.each(function () {
        var key = $(this).val();
        var dataItem = {
            position:{
                lat: parseFloat( $(this).data('ltd') ),
                lng: parseFloat( $(this).data('lng') )
            },
            tooltip: $(this).data('tooltip')
        };
        obj[key] = dataItem;
    });
    return obj;
}


function initMap() {
    var mapElement = document.getElementById('js_google_map');
    var centerDefault = {
        lat: parseFloat( $('#address-office option').eq(0).data('ltd') ),
        lng: parseFloat( $('#address-office option').eq(0).data('lng') )
        }
    map = new google.maps.Map(mapElement, {
        zoom: 8,
        center: centerDefault //default center set as an first item in list
    });
    //first init
    var defaultCity = document.getElementById('address-office').value;
    mapElement.style.height = 240 + "px";
    addOneMarker(defaultCity);
}

function addOneMarker(city) {
    deleteMarkers();
    var infowindow = new google.maps.InfoWindow({map: map});
    map.setCenter(cities[city].position);
    infowindow.setContent('<div><strong>' + cities[city].tooltip + '</strong></div>');
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
var onChangeHandler = function (val) {
    addOneMarker(val);
};

$('#address-office').on('change', function () {
    //should send 'val' since using cutom select
    onChangeHandler($(this).val());
});
</script>

<script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBQrJ5ECXDaXVlICIdUBOe8impKIGHDzdA&callback=initMap">
</script>
