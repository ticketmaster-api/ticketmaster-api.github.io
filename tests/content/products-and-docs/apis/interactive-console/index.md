---
layout: interactive-console
category: documentation
---

{::comment}
page title
{:/comment}
{% capture page_title %}

# INTERACTIVE API CONSOLE

{% endcapture %}

{::comment}
instructions list
{:/comment}
{% capture instructions_list %}

### Instructions

1. Have your **[API Key](https://dev-livenation.devportal.apigee.com/user/login)** handy. Get your API Key if you don’t have one.
2. Under "Authentication" tab, choose "Custom Token".
3. Enter your API Key in the "value" field.
4. Some calls require Oauth 2 authentication. You'll need to log in with your credentials to authenticate.

{% endcapture %}

{::comment}
Get api key block text
{:/comment}
{% capture api_callout_text %}

### Don't have an API key?

To continue working with Api Console you <br/> need to have an API Key

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

<div id="console-instructions" markdown="1">
{{instructions_list}}
</div>

<div id="get-key-callout">
<div markdown="1">
{{api_callout_text}}
</div>
<a href="https://live-livenation.devportal.apigee.com/user/login" class="tm-btn tm-btn-transparent">{{api_callout_button_text}}</a>
</div>

<iframe id="console-iframe" src="https://apigee.com/ticketmaster/embed/console/tmapi" width="100%" height="900" scrolling="no" style="margin-top: 3em;"></iframe>
