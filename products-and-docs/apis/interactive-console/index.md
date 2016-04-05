---
layout: interactive-console
category: documentation
title: Interactive API Console
excerpt: Instructions. Get your API Key if you don’t have one. Enter your API Key. Log in with your credentials to authenticate.
keywords: API, interactive console, get API Key, discovery API
---

{::comment}
page title
{:/comment}
{% capture page_title %}

# INTERACTIVE API CONSOLE

{% endcapture %}

{::comment}
Instructions Header
{:/comment}
{% capture instructions_header %}

### Instructions

{% endcapture %}

{::comment}
instructions list
{:/comment}
{% capture instructions_list %}
1. Have your **[API Key](https://live-livenation.devportal.apigee.com/user/login)** handy. Get your API Key if you don’t have one.
2. Under "Authentication" tab, choose "Custom Token".
3. Enter your API Key in the "value" field.
4. Some calls require Oauth 2 authentication. You'll need to log in with your credentials to authenticate.
{% endcapture %}

{::comment}
Get api button text
{:/comment}
{% capture api_callout_button_text %}

GET YOUR API KEY

{% endcapture %}

{::comment}
page layout goes here
{:/comment}

{{page_title}}

<div id="instructions-header" class="double-margin-top" markdown="1">
<span class="instructions-chevron pull-left" markdown="1"></span>
{{instructions_header}}
</div>

<div id="console-instructions" markdown="1" style="display: none;">
{{instructions_list}}
</div>

<div id="get-key-callout">
<a href="https://live-livenation.devportal.apigee.com/user/login" class="tm-btn tm-btn-transparent" markdown="1">
{{api_callout_button_text}}
</a>
</div>

<iframe id="console-iframe" src="https://apigee.com/ticketmaster/embed/console/tmapi" width="100%" height="900" scrolling="no" style="margin-top: 3em;"></iframe>
