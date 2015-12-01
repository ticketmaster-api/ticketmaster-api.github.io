---
layout: documentation
---

## Ticketmaster Partner-App API

The Ticketmaster Partner-App API lets users purchase tickets through your app's native experience. Users will receive an email with a link to ticketmaster.com or our mobile app to redeem tickets.<br/><br/>


#### Authentication
Clients will be provided an API key from Ticketmaster which should be added to every resource endpoint call.

Example: `https://app.ticketmaster.com/partners/v1/cart?apikey=3QIvq55bS608ai6r8moig1WdW57bONry`<br/><br/>

access token is good for 1 hour with no refresh capabilities.

Authorization: Basic base64 encoded apikey:client-secret

curl -v -X POST https://app.ticketmaster.com/partners-sandbox/v1/oauth/accesstoken?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne -d 'grant_type=cient_credentials' -H 'Authorization: Basic R2tCOFowMzdaZnFiTENOdFpWaUFnckVlZ2Jzclo2TmU6TXpLM2xjWnVMcHZHaEQ5Wg=='

{
  "issued_at" : "1448168101229",
  "scope" : "",
  "status" : "approved",
  "expires_in" : "3599",
  "token_type" : "BearerToken",
  "client_id" : "GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne",
  "access_token" : "tW0tqWjB74Q4KQMOSEwbMhOhvADf"
}

curl -v -H "Authorization: Bearer 9dWz7IstBLgcgfEAsJ5ppmUFK0Gy" -H "Accept: application/json" -X GET "https://app.ticketmaster.com/partners-sandbox/v1/event/3F004EC9D1EBBC76?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne"


        #### Host and API endpoint information
Production: https://app.ticketmaster.com/partners/v1

Staging: https://app.ticketmaster.com/partners-sandbox/v1

All connections must be made over SSL using https.

All ticketing and polling requests must include the header`True-Client-IP` which includes the user's ip address. Optionally, you may pass`Original-User-Id` to identify specific users to aid in debugging. As part of our bot-detection efforts we use all headers to model good and bad behavior.  Therefore you may send as much identifiable information about the client including browser user-agent, ip address, user id (if logged in), etc.<br/><br/>

#### Best Practices
Polling results from limited per-partner resources in the ticketing system. Clients should always be ready to handle polling responses. See the <a href="#polling">polling section</a> for more details.

**Cleanup**

If a user abandons a page/tab after a ticket reserve has been made, client applications should do their best to detect this and issue a `DELETE /cart` request to free up allocated resources on the ticketing server.  This should also be done if client apps no longer want to wait through a long, continuing polling process.  This is necessary since ticket reserve requests that result in polling will eventually complete asynchronously and take up resources even if clients do not consume the next polling url.<br/><br/>


#### Terms and Conditions
By using the Ticketmaster Developer Portal, you understand and agree to our <a href="/apis/api-terms">Terms of Use</a><br/><br/>


#### Contact
Ticketmaster Distributed Commerce team <a href="mailto:developer@ticketmaster.com">developer@ticketmaster.com</a><br/><br/>


#### Service Availability
The Ticketmaster back-end reservation systems are distributed globally and events are processed on their local system.  These systems go into a nightly maintenance mode at 2AM local time. This means a show playing at Madison Square Garden will not be transactable between 2-3AM Eastern Time.  Use the timezone value from the event details response to note when these events may be unavailable for transactions.


# Group Event Details
Event and ticket information

## Event [/partners/v1/event/{event_id}?apikey={apikey}]
+ Parameters
    + event_id (string, `0B004ED9FC825ACB`) ... The 16-digit alphanumeric event ID.
    + apikey (string, `GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne`) ... Your API Key

+ Model (application/json)

    ```js
    {
        "api_transactable" : true,  // indicates tickets can be sold through this API

        "event": {
            "tickets": [
                {
                    "description": "GPAS1",
                    "id": "000002040006",
                    "prices": [
                        {
                            "amount": 25,
                            "display_amount": 25,
                            "id": 0,
                            "price_details": [
                                {
                                    "amount": {
                                        "amount": 25,
                                        "currency": "USD"
                                    },
                                    "type": "face_value"
                                }
                            ]
                        }
                    ],
                    "quantities": {
                        "exact": 0,
                        "limit": 10,
                        "minimum": 1,
                        "multiple": 1
                    }
                }
            ],
            "artists": [
                {
                    "id": 916285,
                    "name": "Seattle Sounders FC",
                    "rank": 1,
                    "single_performer_or_band": false
                },
                {
                    "id": 806017,
                    "name": "San Jose Earthquakes",
                    "rank": 2,
                    "single_performer_or_band": false
                }
            ],
            "currency_code": "USD",
            "event_image": {
                "height": 115,
                "location": "http://share.livenation.com/images/default_image.jpg",
                "width": 205
            },
            "eventdate": {
                "format": "datetime",
                "value": "2015-08-21T02:00:00Z"
            },
            "facility_fee_rollup": true,
            "id": "3F004CBB88958BF9",
            "name": "Seattle Sounders FC vs. San Jose Earthquakes",
            "notes": [
                {
                    "text": "There is a 10 ticket limit per household.",
                    "type": "ticketlimittext"
                }
            ],
            "offsale": {
                "format": "datetime",
                "value": "2015-08-21T00:00:00Z"
            },
            "onsale": {
                "format": "datetime",
                "value": "2014-06-25T01:56:29Z"
            },
            "presales": [
                {
                    "format": "daterange",
                    "label": "Internet Presale",
                    "value": "2014-06-20T23:55:00Z/2014-07-31T03:00:00Z"
                }
            ],
            "price_range": {
                "description": "Prices subject to change",
                "max": {
                    "display_amount": 25,
                    "face_value": 25,
                    "fees": 0
                },
                "min": {
                    "display_amount": 25,
                    "face_value": 25,
                    "fees": 0
                }
            },
            "promoter": {
                "id": 494,
                "name": "PROMOTED BY VENUE"
            },
            "publication": {
                "format": "datetime",
                "value": "2014-01-27T18:00:00Z"
            },
            "purchase_organization": "TM",
            "quantities": {
                "limit": 10
            },
            "service_fee_rollup": false,
            "statuses": [
                {
                    "type": "onsale",
                    "value": "2014-06-25T01:56:29Z"
                }
            ], 
            "type": {
                "id": 0
            },
            "url": "http://ticketmaster.com/event/3F004CBB88958BF9",
            "venue": {
                "id": 516191,
                "location": {
                    "address": {
                        "city": "Seattle",
                        "country": {
                            "abbrev": "US"
                        },
                        "region": {
                            "abbrev": "WA"
                        }
                    },
                    "time_zone": "America/Los_Angeles"
                },
                "markets": [
                    {
                        "id": 42,
                        "name": "Greater Seattle Area"
                    }
                ],
                "name": "CenturyLink Field"
            }
        }
    }
    ```

### Retrieve Event Details  [GET]
Retrieve details for a given event including the ticket type & pricing details. The boolean field `api_transactable` indicates if this event can be sold through the API.  If not, clients should be forwarded to the Ticketmaster mobile-web event page.  <br/>
<b>Polling: No</b>

+ Response 200

    [Event][]



# Group Ticket reservation and purchasing
Services related to Ticket reservation and purchasing. Only events marked with `api_transactable` (from Event Details response) can transact on this API. All ticketing operations require the client to first solve a captcha to establish a secure session. Upon posting the Captcha solution, a cart id will be returned and required for further cart operations.

## Captcha [/partners/v1/captcha?apikey={apikey}]
+ Parameters
    + apikey (string, `GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne`) ... Your API Key

+ Model (application/json)

    ```js
        { "token" : "<token received from captcha solution>" }

    ```

### Get captcha page [GET]
Retreive captcha information to render to the user.<br/>
<b>Polling: No</b>

+ Response 200
    + Body
        Header: X-TM-CAPTCHA-V2-SITEKEY: <sitekey>
        <html>
            <head>
                <script src="https://www.google.com/recaptcha/api.js"></script>
                <script>
                function callback(responseText) {
                    location.href = "ticketmaster-g-recaptcha-response://" + responseText;
                }
                </script>
        </head>
        <body>
            <div class="g-recaptcha" data-sitekey="c0d60e1f4a711b710dc3dbe74fbd449c" data-callback="callback"></div>
        </body>
        </html>

## Captcha [/partners/v1/cart?apikey={apikey}]

### Post captcha solution [POST]
Post captcha solution and establish a cart session<br/>
<b>Polling: No</b><br/>

+ Request

    [Captcha][]

+ Response 200

    ```js
        {"cart_id" : "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo="}
    ```


## Ticket Reservation [/partners/v1/cart/tickets?apikey={apikey}]
+ Parameters
    + apikey (string, `GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne`) ... Your API Key

## Properties
    + event (object)
        - id 0B004ED9FC825ACB (string)
        - tickets (array)
            - id (string)
            - quantity (number)
            + price (object, optional)
                - amount (number, optional) 

+ Model (application/json)
        {
                "cart_id" : "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo=",

                "event": { "id": "3F004CBB88958BF9",
                           "tickets":[
                                {
                                    "id": "000002040006", // Maintain leading-zeros in the ticket id as part of the string. 
                                    "quantity": 1,

                                    // Optional. For reserving best available within a price level discovered in Event Details
                                    "price" : {  
                                        "id" : 3 
                                    }
                                },

                                // Optional.  For reserving best available within an area discovered in Event Details
                                "areas" : [
                                    { "id" : 2 }
                                ]
                            ]

                }
        }


### Reserve tickets and create a Cart [PUT]
Reserves the specified tickets.  Multiple ticket types can be added to the `tickets` array as part of an adult+child combination if available.

<b>Polling: Yes</b><br/>

+ Request

    [Ticket Reservation][]

+ Response 200
    ```js
    {
        "cart_id" : "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo=",
        "cart": {
            "hold_time": 299,
            "items": [
                {
                    "end_seat_number": "7",
                    "event_id": "3F004CBB88958BF9", 
                    "num_seats": 1,
                    "row": "I",
                    "section": "CLB234",
                    "start_seat_number": "7",
                    "tickets": [
                        {
                            "charges": [
                                {
                                    "price": 0,
                                    "quantity": 1,
                                    "tax": 0,
                                    "type": "distance"
                                },
                                {
                                    "price": 25,
                                    "quantity": 1,
                                    "tax": 0,
                                    "type": "face_value"
                                },
                                {
                                    "price": 0,
                                    "quantity": 1,
                                    "tax": 0,
                                    "type": "facility"
                                },
                                {
                                    "price": 0,
                                    "quantity": 1,
                                    "tax": 0,
                                    "type": "service"
                                }
                            ],
                            "description": "GPAS1",
                            "id": "000002040006",
                            "quantity": 1
                        }
                    ],
                    "totals": {
                        "currency_code": "USD",
                        "fee": 0,
                        "grand": 25,
                        "merchandise": 25,
                        "tax": 0
                    }
                }
            ],
            "totals": {
                "delivery": 0,
                "fee": 0,
                "grand": 25,
                "merchandise": 25,
                "tax": 0,
                "unpaid": 25,
                "upsell": 0
            }
        }
    }
        
    ```


## Credit card encryption certificate [/partners/v1/certificate?apikey={apikey}&cart_id={cart_id}]
+ Parameters
    + apikey (string, `GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne`) ... Your API Key
    + cart_id (string, `bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D`) ... Cart ID for this session. Must be url encoded.


### Encryption Certificate [GET]
Credit card information must be encrypted before sent to the API. Use this endpoint to get an encryption certificate value and id.<br/>
<b>Polling: No</b><br/>

+ Response 200

    ```js
    {
        "id": "paysys-dev.0.us.3",
        "value": "-----BEGIN CERTIFICATE-----\r\n
                  MIIDdzCCAuCgAwIBAgIRAONU+AhqczriCWS/YmzJABEwDQYJKoZIhvcNAQEFBQAw\r\n
                  gccxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpDYWxpZm9ybmlhMRcwFQYDVQQHEw5X\r\n
                  ZXN0IEhvbGx5d29vZDEVMBMGA1UEChMMVGlja2V0bWFzdGVyMRwwGgYDVQQLExNT\r\n
                  eXN0ZW1zIEVuZ2luZWVyaW5nMTEwLwYDVQQDEyhUaWNrZXRtYXN0ZXIgUGF5bWVu\r\n
                  dCBTeXN0ZW1zIERFVlFBIENBIHYyMSIwIAYJKoZIhvcNAQkBFhNzZUB0aWNrZXRt\r\n
                  YXN0ZXIuY29tMB4XDTEwMDIwNDIxNTY0NFoXDTIwMDIwNDIxNTY0NFowgb8xCzAJ\r\n
                  BgNVBAYTAlVTMRMwEQYDVQQIEwpDYWxpZm9ybmlhMRcwFQYDVQQHEw5XZXN0IEhv\r\n
                  bGx5d29vZDEVMBMGA1UEChMMVGlja2V0bWFzdGVyMRwwGgYDVQQLExNTeXN0ZW1z\r\n
                  9WIi/k623qvlA3CoH7sladX0TO5yPO57aQzGnBwnTHyPMiGwIBi2s+dAliBMSUeB\r\n
                  0W1pXCbffi6nOOBIdjRsnNa+OOMP2YWLufnTnc2YdJQUrsvqNEpzE9h0yJX2AlOy\r\n
                  HTzCxxD7NVUZSAXyt2YEUePoFj4FS3RhmbnX\r\n
                  -----END CERTIFICATE-----\r\n"
    }
    ```


## Add payment information to cart [/partners/v1/cart/payment?apikey={apikey}]
+ Parameters
    + apikey (string, `GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne`) ... Your API Key


+ Model (application/json)

    ```js
    {

        "cart_id" : "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo=",

        "payment": {

            "first_name": "John",           // Required
            "last_name": "Doe",             // Required
            "home_phone": "212-867-5309",   // Required
            "type": "CC",                   // Required, CC or INVOICE
            "reference" : "15278303",        // Required for type=INVOICE only. Your numeric reference number for this invoice transaction.
            "email_address" : "john.doe@ticketmaster.com", // Required

            "address": {
                "line1": "123 Main Street", // Required
                "line2": "",                // Field required, but empty allowed
                "unit": "1h"                // Optional
                "city": "Los Angeles",      // Required
                "country": {                // Required, use 840 for United States or 36 for Canada
                    "id": 840
                },
                "region": {                 // Required
                    "abbrev": "CA"
                },
                "postal_code": "90210",     // Required
            },
            "amount": "69.00",              // Required for type=CC
            "card": {                       // All fields Required for type=CC
                "number": "qvaEc5EX2bt5pt5DiTQR4J6iYZKxsujQPdw7LXCAnbeb8cD/CiXoB1V/pG2GAHBcHS/IdIMskFg=", // encrypted, json-encoded credit-card number
                "cin": "BYdEgXIxwz6bXG6OVQRKwj0wc9KE510eXRpwoEoTrd9t9i7=", // encrypted, json-encoded cvv number
                "encryption_key": "paysys-dev.0.us.999",
                "expire_month": 12,
                "expire_year": 2020,
                "postal_code": "90210"
            }
        }
    }
    ```


### Post credit card information [PUT]
Add customer billing and credit card information to the transaction. Set `encryption_key` with the `id` value from the output of /certificate. After encrypting the credit card number and cvv, clients should call `[PUT] /partners/v1/cart` to finalize the purchase and obtain an order number.<br/>
Encrypt the credit card and cvv number using the following steps:<br/>
<ol>
    <li>Call `GET /certificate` to obtain the certificate value and id. The results will be valid for 24 hours.</li>
    <li>Before encrypting the sensitive data, salt it with 16 random bytes. Make sure that these bytes are ASCII printables as non-printables will not work.</li>
    <li>When encrypting data, use RSA encryption with pkcs1 padding. Use the certificate value from step 1 as the public key.</li>
    <li>Base64 encode the result of the RSA encryption. This is the literal value to provide to the API.</li>
</ol><br/>

Dummy credit-card information for use in the sandbox environment:<br/>
<ul>
    <li>CC#: 4588883206000011</li>
    <li>CVV: 123</li>
    <li>Expiration: 12/2020</li><br/>
</ul>


<b>Polling: No</b><br/>
<br/><br/>
Sample Java code using a certificate (arg 1) to encrypt a credit card or cvv number (arg 2):
```
import javax.xml.bind.DatatypeConverter;
import javax.crypto.Cipher;

import java.io.ByteArrayInputStream;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class RSAEncrypt {
    public static void main(String argv[]) {
        try {
            String certB64 = argv[0];
            String inputData = argv[1];

            /* Load cert
               Cert should include begin and end cert, and be Base64 encoded, with line breaks.  For example:
-----BEGIN CERTIFICATE-----
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890AB
CDEFGHIJK=
-----END CERTIFICATE-----
            */
            String cleanCert = "-----BEGIN CERTIFICATE-----\n" + certB64.replaceAll("-----.*-----", "").replaceAll("[\\p{Space}]", "").replaceAll("(.{64})", "$1\n") + "\n-----END CERTIFICATE-----";

            CertificateFactory cf = CertificateFactory.getInstance("X.509");
            X509Certificate cert = (X509Certificate)cf.generateCertificate(new ByteArrayInputStream(cleanCert.getBytes()));

            //set up Cipher (for RSA)
            Cipher cipher = Cipher.getInstance("RSA");
            cipher.init(Cipher.ENCRYPT_MODE, cert);

            byte[] outputBytes = cipher.doFinal(inputData.getBytes());
            String outputB64 = DatatypeConverter.printBase64Binary(outputBytes);
            System.out.println(outputB64);
        } catch(Exception e) {
            e.printStackTrace();
            System.exit(1);
        }
    }
}
``` 

+ Request
    [Add payment information to cart][]

+ Response 200
    ```javascript
    {
        "cart" : {
            ...
        }
    }
    ```




## Cart Purchase [/partners/v1/cart?apikey={apikey}]
+ Parameters
    + apikey (string, `GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne`) ... Your API Key


+ Model (application/json)

    ```js
        { 
            "cart_id" : "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo=",
            "source_account_id" : "30f86cd70ac7216bc596aa2d060a7064" // Your system's reference number (or hash) to correlate unredeemed orders
        }
    ```


### Purchase Tickets [PUT]
Finalize the purchase and commit the transaction. `source_account_id` can be any unique identifier of the user (i.e. hash of member id). This is required for tracking bounces of ticket redemption emails.<br/>
<b>Polling: Yes</b><br/>

+ Request
    [Cart Purchase][]

+ Response 200
    ```js
        {
            "redemption_url" : "https://myorder.ticketmaster.com/redeem?token=28a67e13-7233-45a5lsGPQy0MZ3J7ZOQRjcW52NHhG083D",
            "tm_app_url" : "ticketmaster:///partners/redeem?token=28a67e13-7233-45a5lsGPQy0MZ3J7ZOQRjcW52NHhG083D",
            "grand_total" : 57.39,
            "order_token" : "28a67e13-7233-45a5lsGPQy0MZ3J7ZOQRjcW52NHhG083D"
        }
    ```


## Delete Cart [/partners/v1/cart?apikey={apikey}&cart_id={cart_id}]
+ Parameters
    + apikey (string, `GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne`) ... Your API Key
    + cart_id (string, `bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D`) ... Cart ID for this session. Must be url encoded.


### Delete a Cart [DELETE]
Delete a Cart. Each partner has a limited amount of reservation resources that can be simultaneously in use. If the user abandons the reservation process, it is a good practice to manually delete the cart to allow these resources to be re-allocated. Increased polling may occur if carts are not cleaned up.  Not required if the user finalizes the transaction<br/>
<b>Polling: Yes</b><br/>

+ Response 204


# Group Order Management
Backend operations for order management


## Unredeemed orders [/partners/v1/orders/unredeemed?apikey={apikey}]
+ Parameters
    + apikey  (string, required) ... Your API Key
    + days_from_purchase (number, optional) ... Number of days since purchase was made. This or days_before_event is required
    + days_before_event (number, optional) ... Number of days before event date

### Unredeemed orders [GET]
Retreive unredeemed orders within a given time period. Some orders may have had bad email addresses, or emails that went to spam. Use your app's notification features to notify the user of an unredeemed order. This endpoint requires IP-address whitelisting.  Please contact us for details.


+ Response 200
    {
        "data" : [
            {
                "purchase_date_time" : 1441341339000, // milliseconds since unix epoch
                "email_status": 2, // 1=Sent (additional status unknown), 2=Bounced, 3=Spam
                "event_date_time": 1471737600000,
                "event_id" : "3F004EC9D1EBBC76",
                "order_token" : "2d1b801e-7e4b-4401-b6b6-1b9fb73271f1", // unique order token returned when purchase was made
                "order_source_account_id" : "fb63e3ede36210317e9e0fc5efccbc1f", // same value supplied with original order purchase
                "purchase_email_address" : "john.tester@gmail.com" // email address supplied with original order purchase
            }
        ]
    }

# Group Polling
Resource endpoints that have polling enabled may alternatively return a json response with a polling url and wait time, along with http status code=202.  This is used to inform client applications of long-waiting operations and queuing restrictions for particular actions in the Ticketmaster system. 

Client applications may receive the following json response for any resource marked "Polling: Yes".

```js
{
    "polling_url": "https://app.ticketmaster.com/partners/v1/polling/cart/tickets/PUT/00000001080E06000000006BB7C4A8C0?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne&cart_id=bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D",
    "wait": 4
}
```

Client applications should call *polling_url* with a GET request after waiting 4 
seconds.  It is possible that this request may also result in another polling response.

Clients can test polling by issuing the following header: `X-TM-FORCE-POLLING: true`

The output of the original action will eventually be returned in the body of the response.


## Poll [/partners/v1/polling/.../?apikey={apikey}&cart_id={cart_id}]
+ Parameters
    + apikey (string, `GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne`) ... Your API Key
    + cart_id (string, `bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D`) ... Cart ID for this session. Must be url encoded.


### Poll [GET]
Polling urls may be received from resources marked with "Polling: Yes" and can return subsequent polling responses.


+ Response 202 
    ```js
        {
            // originally requested response
        }

        // OR another polling response

        {
            "polling_url": "https://app.ticketmaster.com/partners/v1/polling/cart/tickets/PUT/00000001080E06000000006BB7C4A8C0?apikey=GkB8Z037ZfqbLCNtZViAgrEegbsrZ6Ne&cart_id=bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo%3D",
            "wait": 4
        }
    ```


# Group Error Responses
Client or API-side errors will generate a json-formatted response body as well as standard HTTP status codes.
Example:
```js
{
    "error": {
        "message" : "Invalid input data type",
        "code": 10002
        "http_code":400,
        "severity":"ERROR"
    }
}
```

Event not transactable.
Example:
```js
{
    "error": {
        "message": "Event is not API transactable",
        "code": 90001
        "http_code":403,
        "severity":"ERROR"
    }
}
```



Example of sold-out tickets, per ticket id. Can also occur if the number of available continuous seats cannot be fulfilled:
```js
{
    "error": {
        "message": "No inventory found to match request",
        "code": 20052
    }
}
```

Missing captcha token:
```js
{
    "error": {
        "message":"Unauthorized Access",
        "code":10004,
        "http_code":401,
        "severity":"ERROR"
    }
}
```

Incorrect or stale captcha token:
```js
{
    "error": {
        "message":"Invalid captcha solution.",
        "code":10031,
        "http_code":400,
        "severity":"ERROR"
    }
}
```

Payment not accepted:
```js
{
    "error": {
        "message":"Payment Not Accepted",
        "code":20122,
        "http_code":400,
        "severity":"ERROR"
    }
}
```

Invalid CVV/Security code on back of credit card:
```js

{
    "error": {
        "message":"Please enter a valid security code.",
        "code":20152,
        "http_code":400,
        "severity":"ERROR"
    }
}


401 {"fault":{"faultstring":"Invalid ApiKey","detail":{"errorcode":"oauth.v2.InvalidApiKey"}}}

401 {"fault":{"faultstring":"Invalid access token","detail":{"errorcode":"oauth.v2.InvalidAccessToken"}}}




Clients can reference *code* when communicating and debugging errors with Ticketmaster. We will automatically be notified of any internal, unrecoverable errors.

The following status codes will be used by this API

| Status Code | Description |
| ----------- | ----------- |
| 200         | OK. Successful operation |
| 204         | Operation completed successfully. No content returned. (See Cart DELETE method) |
| 401         | Unauthorized access to API. May be missing Ticketmaster-supplied *apikey* parameter |
| 404         | API endpoint/path not found. |
| 405         | HTTP method not allowed for endpoint/path |
| 406         | Input/parameters not acceptable |
| 500         | Internal error occurred |
| 503         | Service is unavailable |


# Group Examples
The following illustrates a typical purchase flow:

<b>1&#46; Discover event availability and ticket information.</b>

Request: `GET /partners/v1/event/09004E6CE6325123`

Further ticketing operations only allowed if event.api_transactable=true.  Display a list of areas and price levels to the user to select a ticket type + price level to reserve.


<b>2&#46; Display captcha to user</b>

Request: `GET /partners/v1/captcha`

Response contains html to render in a webview containing a Google NoCaptcha ReCaptcha form.  Upon user-submit, the form will redirect the page to ticketmaster-g-recaptcha-response://{captcha-token}.
Listen for redirects on the webview and obtain the captcha-token.

<b>3&#46; Exchange captcha-token for a new cart session</b>

Request: `POST /partners/v1/cart`<br/>
Body: `{"token" : "2822b0737710e549a2f74c1e65be19b9"}`

Post the captcha token. Response contains cart_id to be used on further operations on this cart.

Response:
`{"cart_id" : "6LcA5cESAAAAAPsVEe0jgHVOqlKIbkHaeK0HGhQ6cd34a074e785f2107de2c9fea0016c20"}`


<b>4&#46; Make a reserve call.</b>

Request: `PUT /partners/v1/cart/tickets`<br/>

Request body:
```js
{
    "cart_id" : "6LcA5cESAAAAAPsVEe0jgHVOqlKIbkHaeK0HGhQ6cd34a074e785f2107de2c9fea0016c20",
    "event": {
              "id" : "09004E6CE6325123",
              "tickets": [ {"id": "000000000001", "quantity": 1, "price": {"id" : 5}}]
    }
}
``` 

<b>5&#46; Get payment encryption certificate. Extract `id` and `value` from response.</b>

Request: `GET /partners/v1/certificate`<br/>


<b>6&#46; Add encrypted payment information.  Encrypt the credit card number and cvv for the payload (see example in Payment section)</b>

Request: `PUT /partners/v1/cart/payment`<br/>
Request body:
```js
    {

        "cart_id" : "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo=",

        "payment": {

            "first_name": "John",           
            "last_name": "Doe",             
            "home_phone": "212-867-5309",   
            "type": "CC",                   

            "address": {
                "line1": "123 Main Street", 
                "line2": "",                
                "unit": "1h"                
                "city": "Los Angeles",      
                "country": {                
                    "id": 840
                },
                "region": {                 
                    "abbrev": "CA"
                },
                "postal_code": "90210"
            },
            "amount": "69.00",              
            "card": {                       
                "number": "qvaEc5EX2bt5pt5DiTQR4J6iYZKxsujQPdw7LXCAnbeb8cD/CiXoB1V/pG2GAHBcHS/IdIMskFg=",
                "cin": "BYdEgXIxwz6bXG6OVQRKwj0wc9KE510eXRpwoEoTrd9t9i7=",
                "encryption_key": "paysys-dev.0.us.999",
                "expire_month": 12,
                "expire_year": 2020,
                "postal_code": "90210"
            }
        }
    }
```

<b>7&#46; Purchase the tickets</b>

Request: `PUT /partners/v1/cart`<br/>

Request body:
```js
{
    "cart_id" : "bzJVZURoNit1UkhQQ25pcE5KSHh1K09SVE9lQ0k2RktwSEZFdnAwTlNJYS82ZE5WWldiREtSTQo=",
    "source_account_id" : "30f86cd70ac7216bc596aa2d060a7064"
}
```

Response:
```js
{
    "redemption_url" : "http://myorder-qa.ticketmaster.net/redeem?event_id=3F004EC9D1EBBC76&token=d2999e02-4936-41d2-zhNgdH2B7xGuuv50sAJsrJZCMY",
    "tm_app_url" : "ticketmaster:///partners/redeem?token=28a67e13-7233-45a5lsGPQy0MZ3J7ZOQRjcW52NHhG083D",
    "order_token" : "d2999e02-4936-41d2-zhNgdH2B7xGuuv50sAJsrJZCMY",
    "grand_total":68.74
}
```


# Group Versions

| Date | API Major Version | Minor Version | Comment | Author |
| ---- | ----------------- | ------------- | ------- | ------ |
| 2015-10-01 |        1          |      0        | Initial | Ryan Aviles |
| 2015-10-12 |        1          |      0        | Updated captcha and cart session usage | Ryan Aviles |


# Group Appendix
State IDs for cart purchase request

| state_id | name | state_id | name |
| -------- | ---- | -------- | ---- |
| 1| Alabama                          | 43| New York |
| 2| Alaska                           | 44| North Carolina |
| 3| American Samoa                   | 45| North Dakota |
| 4| Arizona                          | 46| Northern Mariana Islands |
| 5| Arkansas                         | 47| Ohio |
| 6| Armed Forces Other               | 48| Oklahoma |
| 7| Armed Forces Americas            | 49| Oregon |
| 11| Armed Forces Pacific            | 50| Palau |
| 12| California                      | 51| Pennsylvania |
| 13| Colorado                        | 52| Puerto Rico |
| 14| Connecticut                     | 53| Rhode Island |
| 15| Delaware                        | 54| South Carolina |
| 16| District Of Columbia            | 55| South Dakota |
| 17| Federated States Of Micronesia  | 56| Tennessee |
| 18| Florida                         | 57| Texas |
| 19| Georgia                         | 58| Utah |
| 20| Guam                            | 59| Vermont |
| 21| Hawaii                          | 60| Virgin Islands |
| 22| Idaho                           | 61| Virginia |
| 23| Illinois                        | 62| Washington |
| 24| Indiana                         | 63| West Virginia |
| 25| Iowa                            | 64| Wisconsin |
| 26| Kansas                          | 65| Wyoming |
| 27| Kentucky                        | 66| Alberta |
| 28| Louisiana                       | 67| British Columbia |
| 29| Maine                           | 68| Manitoba |
| 30| Marshall Islands                | 69| New Brunswick |
| 31| Maryland                        | 70| Newfoundland and Labrador |
| 32| Massachusetts                   | 71| Northwest Territories |
| 33| Michigan                        | 72| Nova Scotia |
| 34| Minnesota                       | 73| Nunavut |
| 35| Mississippi                     | 74| Ontario |
| 36| Missouri                        | 75| Prince Edward Island |
| 37| Montana                         | 76| Quebec |
| 38| Nebraska                        | 77| Saskatchewan |
| 39| Nevada                          | 78| Yukon |
| 40| New Hampshire | | |
| 41| New Jersey | | |
| 42| New Mexico | | |


Country Codes

| country_id | name |
| ---------- | ---- |
| 840 | United States of America |
| 124 | Canada |
|  36 | Australia |
| 484 | Mexico |
| 554 | New Zealand |


