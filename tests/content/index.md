---
layout: home
category: home
excerpt: Join the Ticketmaster developer network, build innovative applications,and help us deliver those unforgettable moments of joy to fans everywhere.
keywords: fan-centric, developer network, build innovative applications
---

{::comment}
Top promo large heading
{:/comment}
{% capture top_promo_heading %}

# WELCOME TO <br/>THE FAN-CENTRIC<br/>PLATFORM.

{% endcapture %}

{::comment}
Top promo description
{:/comment}
{% capture top_promo_desc %}

Join the Ticketmaster developer network, build innovative applications,and help us deliver those unforgettable moments of joy to fans everywhere.

{% endcapture %}

{::comment}
Partners block heading
{:/comment}
{% capture partners_heading %}

## Partners delight fans with native event discovery and commerce

The Ticketmaster API provides partners with real-time, up-to-date listings for the best in music, sports, theater and family events.

{% endcapture %}

{::comment}
Social promo, rendered left to the twitter card
{:/comment}
{% capture social_promo %}

### "Thanks to the APIs, we got an Amazon Echo app integration up and running in about 30 hours at a USC hackathon!"
–Pramod Setlur, API developer

{% endcapture %}

{::comment}
Four columns, displayed between top promo and partners blocks at home page
{:/comment}
{% capture column1_asset %}
![Open Source](/assets/img/home/ic-brick-lg-p-2.svg)
{% endcapture %}

{% capture column1 %}

### Open Source

While we finish up the official APIs, SDKs, and widgets, check out the open source offerings we have today.

* [Android](http://code.ticketmaster.com/#android-projects)
* [Backend](http://code.ticketmaster.com/#backend-projects)
* [iOS](http://code.ticketmaster.com/#iOS-projects)
* [Web](http://code.ticketmaster.com/#web-projects)
{% endcapture %}

{% capture column2_asset %}
![Blog](/assets/img/home/ic-scroll-lg-p-2-b.svg)
{% endcapture %}

{% capture column2 %}

### Blog

We have a ton of brilliant minds working on some incredibly challenging problems. Read what they have to say about it on our blogs.

* [Tech blog](http://tech.ticketmaster.com)
* [Medium Publication](https://medium.com/ticketmaster-tech)
{% endcapture %}

{% capture column3_asset %}
![Existing Partners](/assets/img/home/ic-helmet-lg-p-1-a.svg)
{% endcapture %}

{% capture column3 %}

### Existing Partners

Are you an existing partner looking for current developer resources? Look no further!

* [Partner API](/products-and-docs/apis/partner/)
* [Deals API](/products-and-docs/apis/deals-api/)
* [Legacy docs](http://apidocs.ticketmaster.com/)
{% endcapture %}

{% capture column4_asset %}
![Social](/assets/img/home/ic-blocks-lg-p-1-b.svg)
{% endcapture %}

{% capture column4 %}

### Social

Follow us on our exciting journey as we open up the Ticketmaster ticketing platform.

* [![Twitter](/assets/img/ic-twitter.svg)](https://twitter.com/tmastertech)
* [![Facebook](/assets/img/ic-facebook.svg)](https://www.facebook.com/TicketmasterTech)
* [![Medium](/assets/img/ic-medium.svg)](https://medium.com/ticketmaster-tech)
{% endcapture %}

{::comment}
Raw html goes here (uses liquid variabled defined above)
{:/comment}
<div id="top-promo" class="slice-top-right slice-bottom-right promo xs-center">
    <div class="row">
        <div class="row-container">
<div class="col-xs-12 white" markdown="1">
{{top_promo_heading}}
</div>
<div class="col-xs-12 col-sm-11 col-md-10 description" markdown="1">
{{top_promo_desc}}
</div>
<div class="col-xs-12 button-block">
    <a href="https://live-livenation.devportal.apigee.com/user/login" class="tm-btn tm-btn-white rightarrow">GET YOUR API KEY</a>
    <a href="{{"/products-and-docs/apis/getting-started/" | prepend: site.baseurl}}" class="tm-btn tm-btn-transparent rightarrow">REVIEW DOCUMENTATION</a>
    <a href="{{"http://vmenshutin.github.io/" | prepend: site.baseurl}}" class="tm-btn tm-btn-transparent">EXPLORE THE APIs</a>
</div>
        </div>
        <div class="clearfix"></div>
    </div>
</div>
<div class="row xs-center columns">
<div class="row-container">
    <div class="col-xs-12 col-lg-3 xs-border-bottom">
        <div class="content" style="display: block;">
            <div class="row">
<div class="col-xs-12 col-sm-4 col-lg-12" markdown="1">
{{column1_asset}}
</div>
<div class="col-xs-12 col-sm-8 col-lg-12" markdown="1">
{{column1}}
</div>
</div>
</div>
    </div>
    <div class="col-xs-12 col-lg-3 xs-border-bottom">
        <div class="content" style="display: block;">
            <div class="row">
<div class="col-xs-12 col-sm-4 col-lg-12" markdown="1">
{{column2_asset}}
</div>
<div class="col-xs-12 col-sm-8 col-lg-12" markdown="1">
{{column2}}
</div>
</div>
</div>
    </div>
    <div class="col-xs-12 col-lg-3 xs-border-bottom">
        <div class="content" style="display: block;">
            <div class="row">
<div class="col-xs-12 col-sm-4 col-lg-12" markdown="1">
{{column3_asset}}
</div>
<div class="col-xs-12 col-sm-8 col-lg-12" markdown="1">
{{column3}}
</div>
</div>
</div>
    </div>
    <div class="col-xs-12 col-lg-3 xs-border-bottom">
        <div class="content social" style="display: block;">
            <div class="row">
<div class="col-xs-12 col-sm-4 col-lg-12" markdown="1">
{{column4_asset}}
</div>
<div class="col-xs-12 col-sm-8 col-lg-12" markdown="1">
{{column4}}
</div>
</div>
</div>
    </div>
</div>
</div>

<div id="bottom-promo" class="slice-top-right promo xs-center">
    <div class="row">
        <div class="row-container">
<div class="col-xs-12" markdown="1" style="padding-top: 24px;">
{{partners_heading}}
<img src="/assets/img/home/discovery-partner.png" style="margin-left: 8px;" alt="Discovery partner"/><img src="/assets/img/home/commerce-partner.png" style="margin-left: 8px;" alt="Commerce partner"/>
</div>
        </div>
<div class="social-buttons col-xs-12" style="visibility: hidden;">
    <a href="#"><img src="/assets/img/home/ic_fb.png" alt="Facebook"></a>
    <a href="#"><img src="/assets/img/home/ic_groupon.png" alt="Groupon"></a>
    <a href="#"><img src="/assets/img/home/ic_ret.png" alt="Retailmenot"></a>
    <a href="#"><img src="/assets/img/home/ic_fb.png" alt="Facebook"></a>
    <a href="#"><img src="/assets/img/home/ic_groupon.png" alt="Groupon"></a>
    <a href="#"><img src="/assets/img/home/ic_ret.png" alt="Retailmenot"></a>
    <a href="#"><img src="/assets/img/home/ic_fb.png" alt="Facebook"></a>
</div>
    </div>
</div>

<div id="promo-social" class="row">
    <div class="row-container">
<div class="col-xs-12 col-lg-6" style="padding-top: 20px;" markdown="1">
{{social_promo}}

</div>
        <div class="col-xs-12 col-lg-6">
        <div id="timeline"></div>
        <script type="text/javascript" src="https://platform.twitter.com/widgets.js"></script>
        <script>                      
            twttr.widgets.createTimeline(  
                    '677152457621823488',
                    document.getElementById('timeline'),
                    {
                        width: '550',
                        height: '420',
                        related: 'twitterdev,twitterapi'
                    }).then(function (el) {        
                });
            </script>
        </div>
    </div>
</div>
