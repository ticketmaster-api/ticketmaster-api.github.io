---
layout: interactive-console
category: documentation
title: Partner API Interactive API Console
excerpt: Instructions. Get your API Key if you don’t have one. Enter your API Key. Log in with your credentials to authenticate.
keywords: API, interactive console, get API Key, discovery API
---

{::comment}
page title
{:/comment}
{% capture page_title %}

## INTERACTIVE API CONSOLE

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
1. Have your **[API Key](https://developer-acct.ticketmaster.com/user/login)** handy. You'll need access to the Ticketmaster **[Partner API](/products-and-docs/apis/partner)** to use this console.
2. Enter a Ticketmaster event id. Use 2000527EE48A9334 for testing.
3. Load Event Details to discover ticket types
4. Reserve tickets using the ticket type id and specify quantity
5. A test credit-card can be used to make payment on this event.  Use 'Populate Test CC' in the payment dialog
6. Commit the transaction
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

    function checkApiCookie() {
        var userApiKey;
        var apiKeys = JSON.parse("[" + window.atob(getCookie("tk-api-key")) + "]"); //decode and convert string to array
        if (getCookie("tk-api-key") === "") {return null}
        if (apiKeys != "") {
            userApiKey = apiKeys[apiKeys.length-1];
            userApiKey = userApiKey[userApiKey.length-1];
        }
        return userApiKey;
    }

    //get Cookie by name
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length,c.length);
            }
        }
        return "";
    }

    function getQueryParams(key) {
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0; i< vars.length; i++) {
          var pair = vars[i].split("=");
          if (pair[0] == key){
          return pair[1];
          }
        }
        return "";
    }


    $(document).ready(function(){
        var apiKey = checkApiCookie();
        if( apiKey == null ) {
            apiKey = '';
        }
        var app = getQueryParams("app");

        $('#console-iframe').attr('src', 'https://partner-onboarding.tmdc.us/eventTestingTool?doc=' + app + '&key=' + apiKey + '#eventId=2000527EE48A9334');
    });

</script>

<iframe name="foo" id="console-iframe" src="" width="100%" height="1000" scrolling="yes" style="margin-top: 3em;"></iframe>
