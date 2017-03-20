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
[How can I integrate and test the Partner API?](#q-0)
[Why am I getting 4XX and 5XX errors?](#q-1)
[Can the API handle concurrent calls?](#q-2)

#### Oauth

{: .link-inline}
[Why do I receive "No valid access token found" when calling /oauth/info?](#qo-1)
[Why are users not redirected to my specified redirect_uri?](#qo-2)
[Why is my custom logo not displaying on any OAuth sign-in pages?](#qo-3)

#### Captcha

{: .link-inline}
[Why is captcha not working for my domain or app?](#qc-1)
[Why does captcha end point return a new /different captcha site key?](#qc-2)

#### Events

{: .link-inline} 
[Why am I not seeing my expected events at /events [GET]?](#qe-1)

#### Polling

{: .link-inline} 
[How frequently does polling occur?](#p-1)

#### Event Details

{: .link-inline}
[Why is the "onsale" key not found for an event in the event details response?](#ed-2)
 
#### Event Availability

{: .link-inline}
[Why does Event availability return 4XX errors?](#ea-1)
[Why does  Availability endpoint return 5XX errors?](#ea-2)

#### Event Reserve

{: .link-inline}
[Why am I receiving the error "No inventory found"?](#er-1)
[Why can I not reserve a cart even though inventory is available?](#er-2)

#### Adding Payment

{: .link-inline}
[Why am I getting "TAP returned unknown error" when adding payment details?](#p-1)
[Can I send an un-encrypted credit card number and security code when adding payment?](#p-2)
[When adding billing info to a cart, can we specify the test credit card info in the docs without encrypting?](#p-3) 
[Do Ticketmaster members have default payment methods defined?](#p-4) 
[What are the valid characters to use for credit card salting?](#p-5)
 
#### Shipping 

{: .link-inline}
[What shipping options am I required to support?](#s-1)


#### Commit Cart
[Why am I getting "Invalid reserve request data structure " error when attempting to commit a cart?](#cc-1)

#### Fulfillment

{: .link-inline}
[Why am I not receiving a barcode_id field in the Order details response?](#qf-1)
 
{: #partner-api-general-a .double-margin}
## Partner Api General

{: #q-0}
#### How can I integrate and test the Partner API?
You can use the test event id 000051048D991EE7 in production for making a test purchase.  Refer to [Ticketmaster Partner API](/products-and-docs/apis/partner/)

{: #q-1}
#### Why am I getting 4XX and 5XX errors??
Please see [Error Responses](/products-and-docs/apis/partner/#error-responses)


{: #q-2}
#### Can the API handle concurrent calls?
The API does not support concurrent calls to any cart end point.

{: #oauth-a .double-margin}
## Oauth

{: #qo-1}
#### Why do I receive "No valid access token found" when calling /oauth/info?
If it appears that from time to time the new /OAuth/info endpoint is giving an error "No valid access token found” check if token being used was expired. Once you have obtained an Access Token, you can use it until the time specified by the expires_in key in the response which is 3600 seconds (1 hour) . After that time, you need to get a new Access Token using the Refresh Token .

{: #qo-2}
#### Why are users not redirected to my specified redirect_uri??
Verify your redirect_uri is specified for your developer-app in your Developer Account settings

{: #qo-3}
#### Why is my custom logo not displaying on any OAuth sign-in pages?
Check with the Partner api support if the logo url you are using is whitelisted.

{: #captcha-a .double-margin}
## Captcha

{: #qc-1}
#### Why is captcha not working for my domain or app?
We assign fixed domains per developer account.  Please contact support to whitelist your domain.

{: #qc-2}  
#### Why does Captcha end point return a new /different captcha site key?
Check if the site key changes have happened from the partner support team
  
{: #events-a .double-margin}
## Events 

{: #qe-1}
#### Why am I not seeing my expected events at [/events [GET]](/products-and-docs/apis/partner/#event-details)?
Verify with the client/promoter that the inventory is "Internet enabled" and all masks are set up correctly.

{: #polling-a .double-margin}
## Polling 

{: #p-1}
#### How frequently does polling occur?
Polling can occur when traffic builds up for a particular event or venue.  Clients can also be penalized and more frequently polled if their applications leave carts left unpurchased and not deleted if the user abandons the transaction.


{: #event-details-a .double-margin}
## Event Details

{: #ed-2}		 
#### Why is the "onsale" key not found for an event in the [event details response](/products-and-docs/apis/partner/#event-details)?
It is an event set up issue . You should follow up with the client to check if the event setup is done correctly.

{: #event-availability-a .double-margin}
## Event Availability

{: #ea-1}
#### Why does Event availability return 4XX errors?
It can happen due to Quota Policy violation (429 errors) . Check if your requests are within the quota limit. The Quota limit variables can be found in the response header . If you are not violating the quota policy check with partner support team to investigate the error.

{: #ea-2}
#### Why does  Availability end point return 5XX errors?
It can happen during niterun , service unavailable  , also due to overflow of DB storage for atlas .If it is happening on a regular basis contact Partner support team.

{: #event-reserve-a .double-margin}
## Event Reserve

{: #er-1}
#### Why am I receiving the error "No inventory found"?
The event, section, or price level may have sold out.  Please use the [Event Inventory](/products-and-docs/apis/partner/#inventory-management) service to verify availability before displaying event information.

{: #er-2}
#### Why can I not reserve a cart even though inventory is available?

	Check for onsale dates for the event
	Check if the event has a restrict single flag on and the reserve call in not violating that .
	Check for the no of seats available  vs. the request for number of seats being reserved

{: #adding-payment-a .double-margin}
## Adding Payment

{: #p-1}
#### Why am I getting status code 400 when adding payment details?
Please check all required fields for your payment request.  Clients are configured individually for required payment fields.  Please contact support for your specific configuration.


{: #p-2}
#### Can I send an un-encrypted credit card number and security code when adding payment?
Any credit card information sent to Ticketmaster payment services must be encrypted per our instructions [here](/products-and-docs/apis/partner/#post-card).

{: #p-3}
#### When adding billing info to a cart, can we specify the test credit card info in the docs without encrypting?
 No. The credit card data must be encrypted.
 
 {: #p-4}
#### Do Ticketmaster members have default payment methods defined?
 Members must specify the method of payment for each transaction.  See  [View Member Payment Information](/products-and-docs/apis/partner/#view-payment) to get a list of payment methods they can select from.
  
 {: #p-5} 
#### What are the valid characters to use for credit card salting?
  TThe following valid ASCII characters can be used for salting :

	 "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,
	  F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0"
 
{: #shipping-a .double-margin}
## Shipping

{: #s-1}
#### What shipping options am I required to support?
Shipping options vary per event.  Make a request to [Shipping endpoint [GET]](/products-and-docs/apis/partner/#get-shipping-option) to get valid shipping options for that event.


{: #commit-cart-a .double-margin}
## Commit cart

{: #cc-1}
#### Why am I getting "Invalid reserve request data structure" error when attempting to commit a cart?
"Invalid reserve request data structure"  error is returned if the request body is not valid or the method specified is not correct. Make sure your method type is PUT and the request body contains the correct cart id.

{: #fulfillment-a .double-margin}
## Fulfillment

{: #qf-1}
#### Why am I not receiving a barcode_id field in the [Order details ](/products-and-docs/apis/partner/#order-mangement) response?
The event may not be set up correctly to emit barcodes.Please contact the client to verify Event settings.


