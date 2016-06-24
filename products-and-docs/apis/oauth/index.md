---
layout: documentation
categories:
- documentation
- oauth
redirect_from:
- "/apis/oauth/"
title: OAuth API
excerpt: The Ticketmaster Oauth API lets third-party applications using select member services.
keywords: Oauth API, member details, access token
---

{: .article}
# OAuth API

The Ticketmaster Partner API lets third-party applications using select member services.

## Overview
{: #overview }

### Terminologies

#### Client Secret

A secret token for starting the OAuth handshakes.

#### Client ID

A public key given along-side Client Secret for OAuth handshakes.

#### OAuth Token

This is a token sent by the TMOAuth2 service. It can refer to either the Request or Access token.

#### Access Token

The actual token you will send to UWD to make requests

#### Request Token

An intermediate token used in the authorization code grant flow

#### Refresh Token

A long-lived token which can be used to generate new, short-lived access tokens

#### Query

Part of the URL that contains key-value data invoked by the ? symbol, the keys and values are seperated by the = sign and each data-store is seperated by the & symbol: ?query=looks&like=this

#### Parameter / Argument

These are snippets of information that have a name reference such as oauth_token="helloWorld" where oauth_token is the parameter or argument and helloWorld is the value.

#### Value

Information in relation to something such as a parameter.

#### URL / URI

Location on the internet or resource locator.

### Terms and Conditions
By using the Ticketmaster Developer Portal, you understand and agree to our [Terms of Use](/support/terms-of-use/partner).

### Contact

Ticketmaster Developer Program [developer@ticketmaster.com](mailto:developer@ticketmaster.com).

## Authorization Code (three-legged)

This flow must take place in a browser. It works by sending the user to a specially crafted URI on the TMOAuth2 service, where the user is then able to authorize or decline your application, after which they are redirected to a URI hosted by your application, along with a code (also known as auth code). You then exchange the code for an access token.

This flow is typically what people are thinking of when they talk about OAuth 2.0.

### Step 1
{: #step1}

Create an Authorization URI containing the following query string parameters (using https://oauth.ticketmaster.com/oauth/authorize as the base):

+ **client_id**
+ **redirect_uri**
+ **response_type = code**
+ **state** (Optional Unique identifier to protect against CSRF [note])
+ **scope = all**

The following header `Content-Type: application/x-www-form-urlencoded`  must be set when sending this request.

Example (Not-Encoded for Readability):

{% highlight bash %}
https://oauth.ticketmaster.com/oauth/token?client_id=3MVG9lKcPoNINVB&redirect_uri=http://localhost/oauth/code_callback&scope=all&response_type=code
{% endhighlight %}

### Step 2
{: #step2}

Send the user to to the Authorization URI you constructed

### Step 3
{: #step3}

User logs into Ticketmaster account and grants your Application access.

### Step 4
{: #step4}

TMOAuth2 302s the User back to the redirect_uri with the following parts of the query string:

{% highlight bash %}
http://localhost/oauth/code_callback?code=1c6b27fd4dbca7390b7d6cbbb8d4e41a5841d405
{% endhighlight %}

+ **code**
+ **state** (Optional Only sent back if you provide it initially)

### Step 5
{: #step5}

Parse the code from the query string and exchange it for an Access Token. The exchange request (base URI is again https://oauth.ticketmaster.com/oauth/token). TMOAuth2 responds with Access Token, Refresh Token, and expiration information.

The following header `Content-Type: application/x-www-form-urlencoded`  must be set when sending this request.

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
https://oauth.ticketmaster.com/oauth/token

grant_type='authorization_code'&client_id="12341234"&client_secret="43214321"&code=1c6b27fd4dbca7390b7d6cbbb8d4e41a5841d405

{% endhighlight %}

{% highlight js %}
Status 200
{
    "access_token": "2bn123okn123on12c9d620232f8259205ed70",
    "expires_in": 3600,
    "refresh_token": "bqwe123123538b9afa895a313ed5e0bc5fec43",
    "token_type": "bearer"
}
{% endhighlight %}

+ **client_id**
+ **client_secret**
+ **code = the code you just parsed**
+ **redirect_uri**
+ **grant_type = "authorization_code" [note]**

## Using Access Tokens
{: using-access-token}

Once you have obtained an Access Token, you can use it from the time you obtained it until the time specified by the expires_in key in the response. At the time of writing, this is 3600 seconds or 1 hour. See the section on Refresh Tokens if you need to use them for longer than that.

## Getting Refresh Tokens
{: getting-refresh-tokens}

At the end of the grant flow you will receive both an Access Token and a Refresh Token. The Refresh Token is long lived, and can be used to generate new short-lived (1 hour long) Access Tokens as desired. Therefore, if you intend to make requests beyond 1 hour of receipt of the initial Access Token, you should save and store the Refresh Token.

To create new Access Tokens, use the following procedure:

+ Application forms a query string for a request to TMOAuth2 using the given credentials:
+ grant_type = refresh_token
+ client_id
+ client_secret
+ refresh_token = The token you stored

To get new access and refresh tokens, we would send the following request. The following header `Content-Type: application/x-www-form-urlencoded`  must be set when sending this request.

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
https://oauth.ticketmaster.com/oauth/token

grant_type=refresh_token&client_id="12341234"&client_secret="43214321"&refresh_token="d777538b9afa895a313ed5e0bc5fec43"

{% endhighlight %}

{% highlight js %}
Status 200
{
    "access_token": "2bn123okn123on12c9d620232f8259205ed70",
    "expires_in": 3600,
    "refresh_token": "bqwe123123538b9afa895a313ed5e0bc5fec43",
    "token_type": "bearer"
}
{% endhighlight %}
