---
layout: documentation
categories:
- documentation
- oauth
redirect_from:
- "/apis/oauth/"
title: OAuth API
excerpt: The Ticketmaster OAuth API provides a secure and standardized way to authenticate Ticketmaster users.
keywords: Oauth API, member details, access token
---

{: .article}
# OAuth API

The Ticketmaster OAuth API provides a secure and standardized way to authenticate Ticketmaster users.
{: .article .lead}

Apps which implement Ticketmaster OAuth are able to have Ticketmaster users authorize their app to make requests to the Ticketmaster Open Platform on their behalf.  It can also be used as a social sign-on provider, i.e. a "Login with Ticketmaster" button.

## Overview
{: #overview }

### Terminology
{: #terminologies}

| __Client&nbsp;ID__ | A public key which identifies your Ticketmaster API client / app.  Used when initiating the OAuth handshake.
| __Client&nbsp;Secret__ | A private token which is used to authenticate your Ticketmaster API client / app for certain operations.  Not meant to be shared in untrusted environments, i.e. served up in your app.
| __Access&nbsp;Token__ | Access tokens are credentials used to access protected resources. An access token is a random string representing an authorization issued to the client. Access tokens represent specific scopes and durations of access, granted by the resource owner, and enforced by the resource server and authorization server.
| __Refresh&nbsp;Token__ | Refresh tokens are credentials used to obtain access tokens. Refresh tokens are issued to the client by the authorization server and are used to obtain a new access token when the current access token becomes invalid or expires.
| __Auth&nbsp;Code__ | An intermediate token used in the Authorization Code Grant Flow, generated after the user has successfully provided valid login credentials, and can be exchanged for the actual OAuth tokens (access token & refresh token).

## Authorization Code Flow ("three-legged")

This flow must take place in a browser. It works by sending the user to a specially crafted URI on the OAuth trusted service (https://oauth.ticketmaster.com), where the user is then able to approve or decline your application's request to access their account.  If approved, the client is redirected to a URI hosted by your application, along with an Authorzation Code. The server which receives the redirected request can then exchange the auth code for the access tokens.

This flow is typically what people are thinking of when they talk about OAuth 2.0.

### Step 1
{: #step1}

Create an Authorization URI using the following scheme:

Base URI: `https://oauth.ticketmaster.com/oauth/authorize`

Query Parameters:

 + **client_id**
 + **redirect_uri**
 + **response_type = code**
 + **state** (Optional: Unique identifier to protect against CSRF)
 + **scope = all**

Note, the header `Content-Type: application/x-www-form-urlencoded` must be included when sending this request.

Example (unencoded for readability):

{% highlight bash %}
GET https://oauth.ticketmaster.com/oauth/authorize?client_id=12341234&redirect_uri=http://localhost/oauth/code_callback&scope=all&response_type=code
{% endhighlight %}

### Step 2
{: #step2}

Redirect the user to to the Authorization URI you constructed in Step 1.  Usually, this is the HREF for a stylized "Connect with Ticketmaster" button.

### Step 3
{: #step3}

User logs in to Ticketmaster, and grants your Application permission to access their account.

### Step 4
{: #step4}

The OAuth API uses a 302 Redirect to send the User back to your `redirect_uri`, including the `?code=` (Auth Code) query parameter. A sample node.js server for capturing the OAuth response on "localhost:8080" can be accessed [here](https://gist.github.com/romil93/e0eded76310fb3bde67359b44e08e682).

{% highlight bash %}
GET http://localhost/oauth/code_callback?code=1c6b27fd4dbca7390b7d6cbbb8d4e41a5841d123
{% endhighlight %}

+ **code**
+ **state** (Optional: only sent back if provided initially)

### Step 5
{: #step5}

The server handling the request at the `redirect_uri` parses the `?code=` from the query string, and POSTs the auth code to `https://oauth.ticketmaster.com/oauth/token`.  The OAuth API responds with Access Token, Refresh Token, and expiration information.

Note, the header `Content-Type: application/x-www-form-urlencoded` must be included when sending this request.

Query Parameters:

+ **client_id**
+ **client_secret**
+ **code = the code you just parsed**
+ **redirect_uri**
+ **grant_type = "authorization_code" [note]**

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
POST https://oauth.ticketmaster.com/oauth/token

grant_type=authorization_code&client_id=12341234&client_secret=43214321&code=1c6b27fd4dbca7390b7d6cbbb8d4e41a5841d123

{% endhighlight %}

{% highlight json %}
Status 200
{
    "access_token": "2bn123okn123on12c9d620232f8259205ed70",
    "expires_in": 3600,
    "refresh_token": "bqwe123123538b9afa895a313ed5e0bc5fec43",
    "token_type": "bearer"
}
{% endhighlight %}

## Using Access Tokens
{: #using-access-token}

Once you have obtained an Access Token, you can use it to identify the User until the time specified by the `expires_in` key in the response. At the time of writing, this is 3600 seconds (1 hour). After that time, you need to reissue a new Access Token using the Refresh Token (explained below), or will need the User to reauthenticate (via Step 1 above).

## Getting Refresh Tokens
{: getting-refresh-tokens}

At the end of the grant flow, you will receive both an Access Token and a Refresh Token. The Refresh Token is long-lived, and can be used to generate new short-lived (1 hour) Access Tokens while valid. Therefore, if you intend to make requests beyond 1 hour of receipt of the initial Access Token, you should save and store the Refresh Token.

To create new Access Tokens, use the following procedure:

Base URI: `https://oauth.ticketmaster.com/oauth/token`

Query Parameters:

+ grant_type = refresh_token
+ client_id
+ client_secret
+ refresh_token = The token you stored

To get new access and refresh tokens, we would send the following request. The following header `Content-Type: application/x-www-form-urlencoded`  must be set when sending this request.

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight bash %}
POST https://oauth.ticketmaster.com/oauth/token

grant_type=refresh_token&client_id=12341234&client_secret=43214321&refresh_token=d777538b9afa895a313ed5e0bc5fec43

{% endhighlight %}

{% highlight json %}
Status 200
{
    "access_token": "2bn123okn123on12c9d620232f8259205ed70",
    "expires_in": 3600,
    "refresh_token": "bqwe123123538b9afa895a313ed5e0bc5fec43",
    "token_type": "bearer"
}
{% endhighlight %}
