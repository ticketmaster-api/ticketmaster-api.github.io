---
layout: tutorials-single
categories: 
  - tutorials
  - tutorials-widgets

title: Adding Event Discovery widget to a website

img: "/products-and-docs/tutorials/img/event-discovery-widget-image264x216.png"

link: "/products-and-docs/tutorials/widgets/Event_Discovery_Widget.html"

announcement: "Step by step guide about customization and adding Event discovery widget to your website."

tags: 
  - Discovery API

excerpt: Step by step guide about customization and adding Event discovery widget to your website.
keywords: widget, sell tickets, direct payments
---

# ADDING EVENT DISCOVERY WIDGET

## Introduction

The Event Discovery widget allows partners to provide enhanced discovery experience for consumers within copy/paste distance.
You can use the widget configurator to customize the layout of the widget, and grab a small code snippet to insert into your website.

Event Discovery widget is based on [Discovery API](/products-and-docs/apis/discovery/).

## Authentication

To run a successful API call, you will need to pass your API Key as the query parameter `apikey`.
Example: https://app.ticketmaster.com/discovery/v2/events.json?{apikey}

## [Get an API key](#get-an-api-key)

[Register](https://developer-acct.ticketmaster.com/user/login) on the developers portal. After the registration, the default application will be created. The application contains a Consumer Key that is used for authentication.

![Disovery API application](/products-and-docs/tutorials/img/discovery-api-app.png)

## Web site with Event Discovery widget

We have a very easy example of site with Event Discovery widget. This site has the widget only.

![Event Discovery widget on a site](/products-and-docs/tutorials/img/edw-site.png)

{: .window-title}
Web site with Event Discovery widget

{: .tutorial-code}
>[HTML](#html)
{: .t-lang-selector}

{% highlight html %}
<!DOCTYPE html>
<html>

  <body>
    <div w-type="event-discovery" w-tmapikey="5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG" w-googleapikey="AIzaSyBQrJ5ECXDaXVlICIdUBOe8impKIGHDzdA" w-keyword="zz top" w-theme="newschool" w-colorscheme="light" w-width="300" w-height="600" w-size="25" w-border="2" w-borderradius="7" w-postalcode="" w-radius="" w-country="" w-period="year" w-layout="vertical" w-attractionid="" w-promoterid="" w-venueid="" w-affiliateid="" w-segmentid="" w-proportion="xxl"></div>
    <script src="https://ticketmaster-api-staging.github.io/products-and-docs/widgets/event-discovery/1.0.0/lib/main-widget.js?v=1"></script>
  
  </body>

</html>
{% endhighlight %}

Let's go step by step through this site creation.

## Step 1. A place for widget on your site

Select good place for widget on your site. In our example the site is empty. So widget will be the first element of the site.

{: .window-title}
Step 1. A place for widget on your site

{: .tutorial-code}
>[HTML](#html)
{: .t-lang-selector}

{% highlight html %}
<!DOCTYPE html>
<html>

  <body>
  
  </body>

</html>
{% endhighlight %}

<p></p>

## Step 2. Configure search parameters

Open [widget configuration page](/products-and-docs/widgets/event-discovery/). Select technical tab. Fill the form.

![Event Discovery widget technical tab](/products-and-docs/tutorials/img/edw-conf1.png)

## Step 3. Configure visual appearance

Select visual tab. Configure visual appearance of the widget.
You can preview the widget on this page.

![Event Discovery widget visual tab](/products-and-docs/tutorials/img/edw-conf2.png)

## Step 4. Get widget code

Press "Get code" button and you will get a pop-up window a code snippet of the widget.

![Event Discovery widget code](/products-and-docs/tutorials/img/edw-conf3.png)

## Step 5. Put widget on your page

Copy the widget code and insert inside your page.
Pay attention, that `<script>` for the widget should be placed after `<div>` with the widget.

Example on [Plunker](http://plnkr.co/edit/kqYmh8LQlMbgIxwQ6P9R?p=preview)


