---
layout: home
title: The Ticketmaster Developer Network
category: home
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

## Groupon is delivering game-winning value with local sports tickets.

Synth polaroid bitters chillwave pickled. Vegan disrupt tousled, Portland keffiyeh aesthetic food truck sriracha cornhole single-origin coffee chu.

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
{% capture column1 %}
![Icon1](/assets/img/home/ic-brick-lg-p-2.svg)

### Open Source

While we finish up the official APIs, SDKs, and widgets, check out the open source offerings we have today.

* [Android](http://code.ticketmaster.com)
* [Backend](http://code.ticketmaster.com)
* [iOS](http://code.ticketmaster.com)
* [Web](http://code.ticketmaster.com)
{% endcapture %}

{% capture column2 %}
![Icon2](/assets/img/home/ic-scroll-lg-p-2-b.svg)

### Blog

We have a ton of brilliant minds working on some incredibly challenging problems. Read what they have to say about it on our blogs.

* [Ticketmaster Tech blog](http://tech.ticketmaster.com)
* [Android blog](http://code.ticketmaster.com)
{% endcapture %}

{% capture column3 %}
![Icon3](/assets/img/home/ic-helmet-lg-p-1-a.svg)

### Existing Affiliates

Are you an existing partner looking for current developer resources? Look no further!

* [Sign in](https://live-livenation.devportal.apigee.com/user/login)
* [Commerce API](http://live-livenation.devportal.apigee.com/apis/commerce)
* [Legacy docs](http://live-livenation.devportal.apigee.com/apis)
{% endcapture %}

{% capture column4 %}
![Icon4](/assets/img/home/ic-blocks-lg-p-1-b.svg)

### Social

Follow us on our exciting journey as we open up the Ticketmaster ticketing platform.

* [![Icon4](/assets/img/ic-twitter.svg)](https://twitter.com/tmastertech)
* [![Icon4](/assets/img/ic-facebook.svg)](https://www.facebook.com/TicketmasterTech)
* [![Icon4](/assets/img/ic-medium.svg)](https://medium.com/ticketmaster-tech)
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
<div class="col-xs-12 col-sm-11 col-md-10" markdown="1" style="margin: 11px 0 -3px;">
{{top_promo_desc}}
</div>
<div class="col-xs-12" style="margin: 37px 0 49px;">
    <a href="#" class="tm-btn tm-btn-white rightarrow">GET YOUR API KEY</a>
    <a href="{{"/products-and-docs/apis/interactive-console/" | prepend: site.baseurl}}" class="tm-btn tm-btn-transparent">EXPLORE THE INTERACTIVE DOCS</a>
</div>
        </div>
        <div class="clearfix"></div>
    </div>
</div>
<div class="row xs-center columns">
<div class="row-container">
    <div class="col-xs-12 col-sm-3 xs-border-bottom">
<div class="content" style="display: block;" markdown="1">
{{column1}}
</div>
    </div>
    <div class="col-xs-12 col-sm-3 xs-border-bottom">
<div class="content" style="display: block;" markdown="1">
{{column2}}
</div>
    </div>
    <div class="col-xs-12 col-sm-3 xs-border-bottom">
<div class="content" style="display: block;" markdown="1">
{{column3}}
</div>
    </div>
    <div class="col-xs-12 col-sm-3 xs-border-bottom">
<div class="content social" style="display: block;" markdown="1">
{{column4}}
</div>
    </div>
</div>
</div>

<div id="bottom-promo" class="slice-top-right promo xs-center">
    <div class="row">
        <div class="row-container">
<div class="col-xs-12" markdown="1" style="padding-top: 56px;">
{{partners_heading}}
<div style="margin: 57px 0 85px;">
    <a href="#" class="tm-btn tm-btn-white">SEE HOW</a>
</div>
<div class="social-buttons">
    <a href="#"><img src="/assets/img/home/ic_fb.png"></a>
    <a href="#"><img src="/assets/img/home/ic_groupon.png"></a>
    <a href="#"><img src="/assets/img/home/ic_ret.png"></a>
    <a href="#"><img src="/assets/img/home/ic_fb.png"></a>
    <a href="#"><img src="/assets/img/home/ic_groupon.png"></a>
    <a href="#"><img src="/assets/img/home/ic_ret.png"></a>
    <a href="#"><img src="/assets/img/home/ic_fb.png"></a>
</div>
</div>
        </div>
    </div>
</div>

<div id="promo-social" class="row">
    <div class="row-container">
<div class="col-xs-12 col-sm-6" style="padding-top: 20px;" markdown="1">
{{social_promo}}

</div>
        <div class="col-xs-12 col-sm-6">
            <blockquote class="twitter-tweet" data-conversation="none" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/nicmcfarlanee">@nicmcfarlanee</a> Resale tickets are tickets posted by individuals who wish to sell them.</p>&mdash; Ticketmaster (@Ticketmaster) <a href="https://twitter.com/Ticketmaster/status/669885490229813248">26 Листопад 2015</a></blockquote>
            <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
        </div>
    </div>
</div>
