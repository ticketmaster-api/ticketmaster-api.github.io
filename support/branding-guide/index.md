---
layout: base-content
categories:
- support
- branding-guide
title: Branding guide
excerpt: This guide explains how to properly represent the Ticketmaster brand in your sites and apps that use our developer products.
keywords: guide, explain, represent Ticketmaster brand, logo, verified tickets
---

{% capture branding-description %}
# BRANDING GUIDE

{: .lead .double-margin}
Try not to make us look bad, OK?

{: .page_center_content}
This guide explains how to properly represent the Ticketmaster brand in your sites and apps that use our developer products. Please read and understand this entire guide, and no one will get hurt.

{: .page_center_content}
Why, you ask? Because when a brand is diluted by inconsistent use, it becomes less trustworthy in the eyes of users. Simple as that.

{: .x3-margin-top #brand-logo}
## Logo

{% endcapture %}

{% capture logo-blue %}
![Ticketmaster logo blue](/assets/img/branding-guide/blue-logo.svg)

**Blue**

Available as [PNG](/assets/img/branding-guide/blue-logo@3x.png) or [SVG](/assets/img/branding-guide/blue-logo.svg)
{% endcapture %}

{% capture logo-gray %}
![Ticketmaster logo blue](/assets/img/branding-guide/gray-logo.svg)

**Gray**

Available as [PNG](/assets/img/branding-guide/gray-logo@3x.png) or [SVG](/assets/img/branding-guide/gray-logo.svg)
{% endcapture %}


{% capture logo-white %}
![Ticketmaster logo blue](/assets/img/branding-guide/white-logo.svg)

**White**

Available as [PNG](/assets/img/branding-guide/white-logo@3x.png) or [SVG](/assets/img/branding-guide/white-logo.svg)
{% endcapture %}

{% capture branding-logo %}
### Inclusion

{: .page_center_content}
You must include a Ticketmaster logo on every page that interacts with the Ticketmaster API or displays the Ticketmaster API data. This includes pages or screens in mobile applications.

{: .page_center_content}
Use only the following Ticketmaster logos for branding attribution on your site or in your app at the full size that is provided. Select the logo that best suits the visual design and functionality of your site or app.


### Prominence

{: .page_center_content}
The logo should not be the most prominent element or logo on the page, nor the only branding on the page.


### Improper Usage

{: .page_center_content}
These are the kinds of things we definitely don’t want you to do with the logo.

{% endcapture %}

{% capture logo-distorted %}
![Ticketmaster logo blue](/assets/img/branding-guide/distorted.svg)

Don’t stretch or distort
{% endcapture %}

{% capture logo-croped %}
![Ticketmaster logo blue](/assets/img/branding-guide/croped.svg)

Don’t crop or obscure
{% endcapture %}

{% capture logo-typeface %}
![Ticketmaster logo blue](/assets/img/branding-guide/typeface@3x.png)

Don’t change the typeface
{% endcapture %}

{% capture logo-modified %}
![Ticketmaster logo blue](/assets/img/branding-guide/modified.svg)

Don’t modify
{% endcapture %}

{% capture logo-colored %}
![Ticketmaster logo blue](/assets/img/branding-guide/colored.svg)

Don’t change the color
{% endcapture %}

{% capture branding-verified-tickets %}
{: .x3-margin-top #verified-tickets}
## Verified Tickets

{: .page_center_content}
Advertisements, web pages, and partner sites with primary and resale ticketing agreements must include the Ticketmaster Verified Tickets mark.

{% endcapture %}

{% capture logo-english %}
![Ticketmaster logo blue](/assets/img/branding-guide/eng-logo.svg)

**English**

Available as [PNG](/assets/img/branding-guide/eng-logo@3x.png) or [SVG](/assets/img/branding-guide/eng-logo.svg)
{% endcapture %}

{% capture logo-french %}
![Ticketmaster logo blue](/assets/img/branding-guide/french-logo@3x.png)

**French**

Available as [PNG](/assets/img/branding-guide/french-logo@3x.png)
{% endcapture %}

{% capture branding-legal-stuff %}
{: .x3-margin-top #legal-stuff}
## Legal Stuff

{: .page_center_content}
And now a word from our lawyers ... make us look good, or else! Seriously, our trademarks are proprietary and protected under intellectual property laws so please use them only as allowed. You may use our trademarks if you're a Ticketmaster client, sponsor, affiliate, or other authorized user. If you're not please contact us.

{: .page_center_content}
Remember, by downloading and/or using our trademarks you agree to abide by our guidelines.



### Please Don’t:

{: .page_center_content .outside_list}
- Display our trademarks in a way that implies a relationship, affiliation, or endorsement by Ticketmaster of your product, service, or business.
- Use our trademarks as part of your own product, business or service name, including in meta tags, adwords, keywords, etc.
- Alter our trademarks in any way, such as by changing the design, color or rotation, or by adding animation or other effects.
- Copy or imitate our designs, fonts, color combinations, or the look and feel of our trademarks and websites.
- Combine our trademarks with any other names, trademarks, graphics or generic terms, without our written consent.
- Present our trademarks in a way that makes it the most distinctive or prominent feature of what you're creating.
- Assert rights over our trademarks whether by trademark or domain name registration, or anything else.
- Use our trademarks on merchandise or other products (or packaging) such as clothing, hats, or mugs.
- Display our trademarks anywhere that contains content associated with pornography, gambling, obscenity, or illegal activities.
- Use our trademarks in connection with any sweepstakes, contest, or other promotion.

{: .page_center_content}
P.S. These guidelines can change without notice and use of our trademarks can be revoked at any time.
{% endcapture %}

{::comment}
Raw html goes here (uses liquid variabled defined above)
{:/comment}

{{ branding-description }}
<div class="js_branding_gallery branding_gallery">
  <div class="branding_gallery__item branding_gallery__item-linked" markdown="1">{{logo-blue}}</div>
  <div class="branding_gallery__item branding_gallery__item-linked" markdown="1">{{logo-gray}}</div>
  <div class="branding_gallery__item branding_gallery__item-linked" markdown="1">{{logo-white}}</div>
</div>
{{ branding-logo }}
<div class="js_branding_gallery branding_gallery">
  <div class="branding_gallery__item" markdown="1">{{logo-distorted}}</div>
  <div class="branding_gallery__item" markdown="1">{{logo-croped}}</div>
  <div class="branding_gallery__item" markdown="1">{{logo-typeface}}</div>
  <div class="branding_gallery__item" markdown="1">{{logo-modified}}</div>
  <div class="branding_gallery__item" markdown="1">{{logo-colored}}</div>
</div>
{{ branding-verified-tickets }}
<div class="js_branding_gallery branding_gallery">
  <div class="branding_gallery__item branding_gallery__item-linked branding_gallery__item-verified_tickets" markdown="1">{{logo-english}}</div>
  <div class="branding_gallery__item branding_gallery__item-linked branding_gallery__item-verified_tickets" markdown="1">{{logo-french}}</div>
</div>
{{ branding-legal-stuff }}
<script type="text/javascript">
   $('.js_branding_gallery').find('a').attr('target', '_blank');
</script>






















