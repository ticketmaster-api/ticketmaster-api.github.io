---
layout: base-content
categories:
- support
- partner-api-faq
title: Partner API FAQs
excerpt: At Ticketmaster, we see ourselves as the engine that powers unforgetable moments of joy for fans everywhere.
keywords: FAQ, Partner  API cover
---

# Partner API FAQ

#### Partner Api General

{: .link-inline}
[Is there a dev, or staging environment where purchases can be made?](#q-0)
[Why am I getting 429 Errors for partner api calls?](#q-1)
[Can the API handle concurrent calls to update the cart?](#q-2)

#### Oauth

{: .link-inline}
[Why is "/oauth/info" endpoint giving an error ("No valid access token found”) ?](#qo-1)
[Why is redirect not happening at my specified uri ?](#qo-2)
[Why does the Oauth page does not display the logo mentioned in the uri ?](#qo-3)

#### Captcha

{: .link-inline}
[Why is the captcha not working for all my domains](#qc-1)
[Why does captcha end point return a new /different captcha site key?](#qc-2)

#### Events

{: .link-inline} 
[Why "partners/v1/events" endpoint is not able to find the *events with the codes ?](#qe-1)

#### Polling

{: .link-inline} 
[How frequent does polling occur?](#p-1)

#### Event Details

{: .link-inline}
[Why is the "onsale" key not found for an event in the response ?](#ed-2)
 
#### Event Availability

{: .link-inline}
[Why does Event availability return 4XX errors ?](#ea-1)
[Why does  Availability endpoint return 5XX errors ?](#ea-2)

#### Event Reserve

{: .link-inline}
[Why am I not able to reserve a cart?](#er-1)
[Why can I not reserve a cart even though inventory is available ?](#er-2)

#### Adding Payment

{: .link-inline}
[Why am I getting "TAP returned unknown error" when adding payment details?](#p-1)
[Is encryption required even though we are only sending the cin and no sensitive data?](#p-2)
[When adding billing info to a cart, can we specify the test credit card info in the docs without encrypting?](#p-3) 
[Is there a payment method marked as default?](#p-4) 
[What are the valid characters to use for Salting?](#p-5)
 
#### Shipping 

{: .link-inline}
[What are the possible options for ticket delivery ?](#s-1)


#### Commit Cart
[Why am I getting a `21001`  "Invalid reserve request data structure " error when attempting to commit a cart?](#cc-1)

#### Fulfillment

{: .link-inline}
[Why is barcode _id not returned ?](#qf-1)
[Will the users account be updated with the new order , if checkout was done using oauth?](#qf-2)
 
{: #partner-api-general-a .double-margin}
## Partner Api General

{: #q-0}
#### Is there a dev, or staging environment where purchases can be made?
You can use the test event id 000051048D991EE7 in production for making a test purchase.

{: #q-1}
#### Why am I getting 429 Errors for partner api calls?
The 429 errors are because of the apigee policies placed to protect the Partner Api from overloading requests. Each apikey is allowed to have certain number of requests within a time frame. If you violate the policy you night be getting 429 errors in response. The quota available  or used are returned in the header section of the response for your help to understand the quota assigned and used by you apikey .


{: #q-2}
#### Can the API handle concurrent calls to update the cart?
No. The API does not support concurrent calls to update the cart.

{: #oauth-a .double-margin}
## Oauth

{: #qo-1}
#### Why is "/oauth/info" endpoint giving an error ("No valid access token found”) ?
If it appears that from time to time the new /OAuth/info endpoint is giving an error ("No valid access token found”) check if token being used was expired. Once you have obtained an Access Token, you can use it until the time specified by the expires_in key in the response which is 3600 seconds (1 hour) . After that time, you need to get a new Access Token using the Refresh Token .

{: #qo-2}
#### Why is redirect not happening at my specified uri ?
Check with the Partner api support if the redirect-uri you are using is whitelisted.

{: #qo-3}
#### Why does the Oauth page does not display the logo mentioned in the uri ?
Check with the Partner api support if the logo url you are using is whitelisted.

{: #captcha-a .double-margin}
## Captcha

{: #qc-1}
#### Why is the Captcha not working for all my domains?
There are fixed domains which are allowed for an assigned captcha key. Check with the partner support team if the domain is added to the whitelist for google site captcha key.

{: #qc-2}  
#### Why does Captcha end point return a new /different captcha site key?
Check if the site key changes have happened from the partner support team
  
{: #events-a .double-margin}
## Events 

{: #qe-1}
#### Why "partners/v1/events" end point is not able to find the *events with the codes?
Check with event ops team if the offers set up are 'Internet enabled'  or not  .Partner should work with the Venue/promoter to fix this issue.

{: #polling-a .double-margin}
## Polling 

{: #p-1}
#### How frequent does polling occur?
All transactional api's at TM have polling.The wait time for polling is generally 4 seconds, and also when the polling response is returned, it looks something like this
	``` {"polling_url": "....",     "wait":   4} ``
You can utilize the wait field in the response to set the time you would like to wait before you check you get the polling url.

{: #event-details-a .double-margin}
## Event Details

{: #ed-2}		 
#### Why is the "onsale" key not found for an event in the response ?
It is an event set up issue . You should follow up with the client to check if the event setup is done correctly.

{: #event-availability-a .double-margin}
## Event Availability

{: #ea-1}
#### Why does Event availability return 4XX errors ?
It can happen due to Quota Policy violation (429 errors) . Check if your requests are within the quota limit. The Quota limit variables can be found in the response header . If you are not violating the quota policy check with partner support team to investigate the error.

{: #ea-2}
#### Why does  Availability end point return 5XX errors ?
It can happen during niterun , service unavailable  , also due to overflow of DB storage for atlas .If it is happening ona regular basis contact Partner support team.

{: #event-reserve-a .double-margin}
## Event Reserve

{: #er-1}
#### Why am I not able to reserve a cart?
Make sure there is inventory allocated to the event using the availability call . Partners to check with client for allocation of inventory for the event.

{: #er-2}
#### Why can I not reserve a cart even though inventory is available ?

	Check for onsale dates for the event
	Check if the event has a restrict single flag on and the reserve call in not violating that .
	Check for the no of seats available  vs. the request for number of seats being reserved

{: #adding-payment-a .double-margin}
## Adding Payment

{: #p-1}
#### Why am I getting "TAP returned unknown error" when adding payment details?
Check all the required fields for the request data are supplied correctly when adding payment. Any missing data may cause this error.

{: #p-2}
#### Is encryption required even though we are only sending the cin and no sensitive data?
Yes. You will need to make a call to the certificate endpoint, encrypt the cin and fill those fields

{: #p-3}
#### When adding billing info to a cart, can we specify the test credit card info in the docs without encrypting?
 No. The credit card data must be encrypted.
 
 {: #p-4}
#### Is there a payment method marked as default?
 They are not marked default, you will need to call the `View Member Payment Information [GET]` and pick the first one from the list if the member has stored member payments
 
 {: #p-5} 
#### What are the valid characters to use for Salting?
  These are few valid charactors which can be used for salting

	 "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,
	  F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0"
 
{: #shipping-a .double-margin}
## Shipping

{: #s-1}
#### What are the possible options for ticket delivery ?
A few options are  {ETICKET, 2DAYPM, 3DAY ,WILLCALL , MAIL} . You have to make a call for GET shipping  to know which ones are available . 

{: #commit-cart-a .double-margin}
## Commit cart

{: #cc-1}
#### Why am I getting a `21001`  "Invalid reserve request data structure " error when attempting to commit a cart?
"Invalid reserve request data structure "  error is returned if the request body is not valid or the method specified is not correct. Make sure your method type is PUT and the request body containes the correct cart id.

{: #fulfillment-a .double-margin}
## Fulfillment

{: #qf-1}
#### Why is barcode _id not returned ?
Check if this event is set for establishing barcodes . Partners to follow this up with the client  to check on the Event settings.

{: #qf-2}
#### Will the users account be updated with the new order , if checkout was done using oauth?
If you use oauth it is automatically deposited in the users account.You will still get the redemption link.
