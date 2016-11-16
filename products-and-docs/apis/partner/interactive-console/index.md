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
1. Have your **[API Key](https://developer-acct.ticketmaster.com/user/login)** handy.
{% endcapture %}

{::comment}
Get api button text
{:/comment}
{% capture api_callout_button_text %}

GET YOUR API KEY RIGHT now

{% endcapture %}

{::comment}
page layout goes here
{:/comment}

{{page_title}}

<div id="pantheon-api-key" class="pantheon-api-key" style="display: none;">
  Your API Key/Custom Token: <span id="copy-clip"></span>
  <div class="copy-btn" rel="tooltip" data-placement="top" data-original-title="Copy to Clipboard" data-clipboard-text=""></div>
</div>
<div id="instructions-header" class="double-margin-top" markdown="1">
<span class="instructions-chevron pull-left" markdown="1"></span>
{{instructions_header}}
</div>

<div id="console-instructions" markdown="1" style="display: none;">
{{instructions_list}}
</div>

<div id="get-key-callout">
<a href="https://developer-acct.ticketmaster.com/user/login" class="tm-btn tm-btn-transparent" markdown="1">
{{api_callout_button_text}}
</a>
</div>

<script>
    $(document).ready(function(){
        var apiKey = $('#copy-clip','#pantheon-api-key').text()
        if( apiKey == null ) {
            apiKey = '';
        }

        $('#console-iframe').attr('src', 'https://partner-onboarding.tmdc.us/eventTestingTool?key=' + apiKey);
    });

</script>

<iframe name="foo" id="console-iframe" src="" width="100%" height="1000" scrolling="yes" style="margin-top: 3em;"></iframe>
