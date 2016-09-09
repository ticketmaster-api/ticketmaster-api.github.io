---
layout: documentation-single
categories:
- documentation
- widgets
- widget-checkout
title: Checkout Widget
excerpt: Everything you need to start selling tickets on your website
keywords: ticketmaster, checkout, widget, sell tickets, javascript, developer
---

# CHECKOUT WIDGET

{: .lead}
This TM Widget allows clients, artists, and partners to setup and provide an enhanced experience for consumers within copy/paste distance.

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
            <li><strong>Step 2:</strong> Next, paste the snippet within the <em>&lt;head&gt;</em> tag of your website.  For example:</li>
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

          <p>Preview the Checkout Widget using our Widget Simulator extension for Google Chrome.  View the widget on your browser only without making any code changes to your live website.</p>

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
              <p><strong>Step 4:</strong> Visit the website where you’d like to simulate the checkout widget</p>
            </li>
            <li>
              <p><strong>Step 5:</strong> Click the blue “TM” button in the top right of your Chrome browser, then click “Inject Widget” - you will see a pop up to let you know how many events were detected on this page</p>
            </li>
          </ul>

          <p>Ticketmaster.com and livenation.com links that are eligible for the widget will glow blue, and clicking them will result in opening the checkout widget.</p>
      </div>
    </div>

</form>
</div>

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

<div id="carousel" class="col-xs-12" markdown="1">
  <div class="carousel-controls">
    <div class="carousel-prev"></div>
    <div class="carousel-next"></div>
  </div>
  {{slider}}
</div>

<div class="clearfix"></div>

## Affiliate Tracking

The Checkout Widget works seamlessly with the [Ticketmaster Certified Partners](/partners/distribution-partners/) program.  Any Impact Radius links on your site in theticketmaster.evyy.net format will be treated just like any other Ticketmaster link. When buyers click the link, the widget will attribute any sales to your existing partner account with no redirect.
