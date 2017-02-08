---
layout: documentation-single
categories:
- documentation
- widgets
- widget-checkout
title: Ticketmaster Universal Checkout
excerpt: Everything you need to start selling tickets on your website
keywords: ticketmaster, universal checkout, widget, sell tickets, javascript, developer
---

# TICKETMASTER UNIVERSAL CHECKOUT

{: .lead}
Ticketmaster Universal Checkout ("Universal Checkout") allows clients, artists, and partners to setup and provide an enhanced experience for consumers within copy/paste distance.

## Sell tickets directly on your website with no redirect

Grab a small code snippet to insert into your website

<div class="col-lg-12 config-block">

<form accept-charset="UTF-8" class="main-widget-config-form common_tabs" method="post" autocomplete="off">

    <!--Use for mobile devices 'Go' button-->
    <button type="submit" class="hidden"></button>

    <ul class="nav nav-tabs" data-tabs="tabs">
        <li class="active">
            <a href="#widget-config-setup" data-toggle="tab" aria-expanded="true">Installation</a>
        </li>
        <li class="">
            <a id="js_styling_nav_tab" href="#widget-config-preview" data-toggle="tab" aria-expanded="false">Preview</a>
        </li>
    </ul>

    <div class="tab-content" style="padding-top: 0px;">
        <div class="tab-pane fade active in" id="widget-config-setup">

          <h3 id="embedded-code">Embedded Code</h3>

          <ul>
            <li><strong>Step 1:</strong> Copy this snippet:</li>
          </ul>

          <figure class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;script </span><span class="na">type=</span><span class="s">"text/javascript"</span> <span class="na">src=</span><span class="s">"https://embed.ticketmaster.com/tm.js"</span><span class="nt">&gt;&lt;/script&gt;</span></code></pre></figure>

          <ul>
            <li><strong>Step 2:</strong> Next, paste the snippet within the <em>&lt;head&gt;</em> tag of your website.</li>
          </ul>

<figure class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;head&gt;</span>
    <span class="nt">&lt;script </span><span class="na">type=</span><span class="s">"text/javascript"</span> <span class="na">src=</span><span class="s">"https://embed.ticketmaster.com/tm.js"</span><span class="nt">&gt;&lt;/script&gt;</span>
<span class="nt">&lt;/head&gt;</span></code></pre></figure>

          <ul>
            <li><strong>Step 3:</strong> Refresh your page. Ticketmaster event links will now be activated.</li>
          </ul>
        </div>

        <div class="tab-pane fade" id="widget-config-preview">
          <h3 id="google-chrome-extension">Google Chrome Extension</h3>

          <p>Preview Universal Checkout using our Widget Simulator extension for Google Chrome.  View the checkout experience on your browser only without making any code changes to your live website.</p>

          <ul>
            <li>
              <p><strong>Step 1:</strong> Open your Chrome browser on a PC or Mac</p>
            </li>
            <li>
              <p><strong>Step 2:</strong> Visit: <a href="http://www.ticketmaster.com/widgetsimulator">http://www.ticketmaster.com/widgetsimulator</a></p>
            </li>
            <li>
              <p><strong>Step 3:</strong> Click the Add To Chrome button</p>
            </li>
            <li>
              <p><strong>Step 4:</strong> Visit the website where you’d like to preview Universal Checkout</p>
            </li>
            <li>
              <p><strong>Step 5:</strong> Click the blue “TM” button in the top right of your Chrome browser, then click “Inject Widget” - you will see a pop up to let you know how many events were detected on this page</p>
            </li>
          </ul>

          <p>Ticketmaster.com and livenation.com links that are eligible for the widget will glow blue, and clicking them will result in opening Universal Checkout.</p>
      </div>
    </div>

</form>
</div>

## Tutorial

<iframe src="https://player.vimeo.com/video/189647021" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Checkout Flow

<script src="{{"/scripts/vendors/carousel.min.js" | prepend: site.baseurl }}"></script>
<script src="{{"/scripts/components/checkout-widget.js" | prepend: site.baseurl }}"></script>

### Step 1: Ticket Types

Buyers select their desired ticket types, can sign in, or register, and fill out the CAPTCHA

### Step 2: Payment Information

Buyers review their order, and enter payment information

### Step 3: Order Confirmed.

Buyers see their order details


{% capture slider %}
[![Step1](/assets/img/products-and-docs/checkout-widget-step-1.png)](/assets/img/products-and-docs/checkout-widget-step-1.png)
[![Step2](/assets/img/products-and-docs/checkout-widget-step-2.png)](/assets/img/products-and-docs/checkout-widget-step-2.png)
[![Step3](/assets/img/products-and-docs/checkout-widget-step-3.png)](/assets/img/products-and-docs/checkout-widget-step-3.png)
{% endcapture %}

<div id="carousel" class="col-xs-12" markdown="1" style="margin-top: 0px; margin-bottom: 0px;">
  <div class="carousel-controls">
    <div class="carousel-prev"></div>
    <div class="carousel-next"></div>
  </div>
  {{slider}}
</div>

<div class="clearfix"></div>

## Configuration Flags

Additional configuration flags are available which can modify Universal Checkout's behavior on a per-event basis.  These flags are passed in either of 2 ways: using query parameters on the Event URL, or HTML data attributes on the link itself.

For example, query parameters can be supplied as follows:

```
<a href="http://www.ticketmaster.com/event/<id>?disable-widget=true">My Event</a>
```

Similarly, data attributes can be supplied as follows:

```
<a href="http://www.ticketmaster.com/event/<id>" disable-widget="true">My Event</a>
```

The following configuration flags are currently supported:

| Query Parameter      | Data Attribute | Description |
|:----------------------------------------------------|
| `?enable-widget=true`  | `data-enable-widget="true"`  | Forces a link to open in Universal Checkout every time |
| `?disable-widget=true` | `data-disable-widget="true"` | Prevents a link from opening in Universal Checkout every time |


## Affiliate Tracking

Any Impact Radius links on your site in the `ticketmaster.evyy.net` format will be treated just like any other Ticketmaster link. When buyers click the link, Universal Checkout will attribute any sales to your existing partner account with no redirect.

## Client Tracking / Came From Codes

Universal Checkout supports _Came From Codes (CFC)_, which are commonly used by Ticketmaster clients to tag and identify the order source (i.e. ad campaign, or A/B test).  Any link which includes a `?camefrom=YOURCODE` URL parameter will be attributed to the order.

## Password-Protected Offers, Presales, and DID Codes

Universal Checkout supports password-protected offers and presales.  Events which support passwords will show a password entry field with event-specific messaging.

Ticketmaster _DID Codes_ are also supported.  Any link which includes a `?did=YOURCODE` URL parameter will be used to unlock any additional offers as well.

## Deep Linking: Ticket Types

Universal Checkout supports passing in a specific _Ticket Type ID_, ensuring it is the default Ticket Type when the widget opens.  This is specifically useful in combination with a _DID Code_, if you want to pre-select the newly-unlocked _Ticket Type ID_ on Step 1 of the checkout process.  To enable this behaviour, append the`?ticket=TICKET_TYPE_ID` URL parameter on the Ticketmaster event link.

## Analytics Reports

Analytics for Universal Checkout are available through TM One.  The "Sales by Platform" report will show sales over time which originated through the "Universal Checkout" platform, along with a summary of "Total Sold" and "Total Face Value".

[![Sales by Platform](/assets/img/products-and-docs/checkout-widget-analytics.png)](/assets/img/products-and-docs/checkout-widget-analytics.png)

## Security Recommendations

Universal Checkout is secured by bank-grade 256-byte SSL encryption for all communications.  The architecture of Universal Checkout ensures the entire checkout flow happens securely via HTTPS, even when the 3rd party site (which is embedding the widget) only uses HTTP.

As a security best practice, we strongly recommend that all pages which embed Universal Checkout __also__ implement SSL / HTTPS.  As of Fall 2016, browsers are beginning to encourage the use of SSL / HTTPS everywhere, and in 2017 will begin to show HTTP as "Insecure" in the browser's toolbar.  This is important for all websites to prevent "man in the middle" attacks, which are theoretically possible on all insecure webpages when on an untrusted Internet connection (public wifi, Internet cafe, etc).  Fortunately, [Let's Encrypt](https://letsencrypt.org/) is an open project sponsored by Google, Facebook, Mozilla, and others, which offers free SSL/TLS certificates to all.

## Troubleshooting

To check whether an Universal Checkout will attempt to transact on a specific event, enter the event ID in the tool below:

<iframe src="https://s3-us-west-2.amazonaws.com/tm-kepler/gatekeeper-check.html" frameborder="0" width="50%" style="border: solid #b7c9d3 1px;">
</iframe>

If the debug tool may indicates the event cannot be transacted using Universal Checkout, please double-check whether any of the following requirements are not met:

<ul>
  <li>• The event was just created (it takes 24 hours to appear)</li>
  <li>• The event has already started</li>
  <li>• The event has ended</li>
  <li>• The event has sold out or has very low ticket availability</li>
  <li>• The event is in presale mode and there is no DID on the link</li>
  <li>• e-Tickets / print-at-home delivery is not available</li>
</ul>

## Additional Resources

| Document   | Last Modified | Download |
|:------------------------------------------------------------------------------------|
| One Sheet  | 2016-10-03    | <a href="https://lne.box.com/s/kh1d9gm3h75eqs2gzpd20v78ljv5njhy" target="_blank">PDF</a> |
| FAQ        | 2016-10-03    | <a href="https://lne.box.com/s/eg6s3qfmdtsz8t7mvrsjr9zufaqxqd9o" target="_blank">PDF</a> |

{% include disqus.html %}
