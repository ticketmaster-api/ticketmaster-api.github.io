---
layout: documentation
categories:
- documentation
- season-ticketing
title: Season Ticketing API 1.0
excerpt: The Ticketmaster Season Ticketing API
keywords: Season Ticketing API
---

{: .article}
# Season Ticketing API

Season Ticketing API Specification
{: .lead}

## Overview
{: #overview }
This is a collection of Open API calls that are used by external systems to access season ticketing data.  This is a RESTful system which communicates over HTTPS, and uses JSON command syntax.  This integration uses different API calls than other portions of the Ticketmaster API suite.   Each API call is a POST call, and is intended to access data from a specific client. The contents of the JSON payload contain the desired read or write operation.  

## Getting Your API KEY
{: #getting-your-api-key}

- Visit [developer.ticketmaster.com](http://developer.ticketmaster.com)  to get your API key
- Click "GET YOUR API KEY" button
- On the Login screen, click "Create new account" button.
- Fill out the form, using the name of a contact person in your organization.  Ticketmaster will contact you by this email address if you wish to become a Ticketmaster partner.  Recommendation - use your company&#39;s name or email domain name as your username.
- The system will create a user account and create an App (the App name = {username}-app).
- Click on the App name to reveal your Customer Key (this is your unique apikey).
- Congratulations!  You are ready to make API calls to our sample Season Ticket database.  See samples below of the six (6) read-only calls that can be made for testing purposes.

**Test Your API Requests:**

+ Use any Rest Client (e.g., Google ARC, Postman, Insomnia, JetBrain, Cocoa) for testing the API calls.  Configure the REST client as follows:
+ The caller (or calling application) will:
   - POST a JSON call to: `https://app.ticketmaster.com/sth-customer/ticketing_services.aspx?dsn=apigee&apikey={apikey}` 
       * use HTTPS protocol
       * specify the product (sth-customer)
       * specify the DSN (apigee)
       * specify your unique API Key
   - Continue to poll until the request is complete OR until the time-out value is reached (see instructions for Asynchronous Polling, below)
+ App.ticketmaster.com will:
  - Confirm the validity of the caller&#39;s API key
  - Confirm that the API Key has access to the requested DSN
  - Compare the DSN in the URL with the DSN in the JSON payload
  - Confirm that the caller has not exceeded any established rate limits
      * Current limits are 80 calls per minute or 5000 calls per day
  - Direct the JSON request to the appropriate Ticketmaster database
+ Return the JSON response to the call.
+ A rapid response is expected for the sample API calls below, except `ATS_EXT_TEST_POLLING`.

## How to construct the URL
{: #construct-the-url}

Format: `HTTPS://app.ticketmaster.com/{product}/{resource}?dsn={dsn}&apikey={apikey}`

| **Name** | **Description** | **Required** | **Sample** |
| --- | --- | --- | --- |
| Product\* (see details below) | A logical grouping of related database resources | Yes | sth-customer sth-inventory sth-hold sth-buy |
| resource | Path to an API method | Yes | ticketing\_services.aspx |
| dsn | Data Source Name | Yes | DSN (e.g., sandbox, test) |
| API key | Authorized API Key | Yes | [Unique to each developer - Get your API key](https://live-livenation.devportal.apigee.com/user/login) |

**Sample URL:**

https://app.ticketmaster.com/sth-customer/ticketing\_services.aspx?dsn=apigee&apikey={apikey}
{: .code .red}

### Sample API Requests:

#### PING 
{: style="font-size:20px"}

**Purpose:**  Confirms system connectivity and server status.

{% highlight json %}
{
  "header": {
    "ver": 1,
    "src_sys_type": 2,
    "src_sys_name": "testing",
    "archtics_version": "V999"
  },
  "command1": {
    "cmd": "ping",
    "call_reason": "test",
    "uid": "user99",
    "dsn": "apigee"
  }
}
{% endhighlight %}


#### ATS_EXT_TEST_POLLING
{: style="font-size:20px"}

**Purpose:**  Allows caller to test the asynchronous polling method by introducing a 10-second delay in the response.  You can make this API call, receive a "202 Accepted" response with CIN and CTKN cookies, and continue making the call until you receive a "200 OK" response.  See the section on Asynchronous Polling, below.

{% highlight json %}
{
    "header": {
        "ver": 1,
        "src_sys_type": 2,
        "src_sys_name": "testing",
        "archtics_version": "V999"
    },
    "command1": {
        "cmd": "ats_ext_test_polling",
        "uid": "user99",
        "dsn": "apigee"
    }
}
{% endhighlight %}


#### EVENT_SEARCH
{: style="font-size:20px"}

**Purpose:**  Returns attributes about events that occur within a specified date range.

{% highlight json %}
{
  "header": {
    "ver": 1,
    "src_sys_type": 2,
    "src_sys_name": "test",
    "archtics_version": "v999"
  },
  "command1": {
    "cmd": "event_search",
    "ref": "1AB2C3",
    "uid": "USER99",
    "dsn": "APIGEE",
    "start_date": "2016-10-01",
    "end_date": "2016-12-31"
  }
}
{% endhighlight %}

#### EVENT_DETAILS
{: style="font-size:20px"}

**Purpose:**  Returns a list of events and event attributes.

{% highlight json %}
{
  "header": {
    "ver": 1,
    "src_sys_type": 2,
    "src_sys_name": "testing",
    "archtics_version": "V999"
  },
  "command1": {
    "cmd": "event_details",
    "event_filter": "Event01, Event02",
    "event_filter_type": "L",
    "uid": "user99",
    "dsn": "apigee"
  }
}
{% endhighlight %}

#### CUSTOMER_QUERY
{: style="font-size:20px"}

**Purpose:**  Returns basic account and name information based on an input account-id, email address or external-id.

{% highlight json %}
{
  "header": {
    "ver": 1,
    "src_sys_type": 2,
    "src_sys_name": "test",
    "archtics_version": "V999"
  },
  "command1": {
    "cmd": "customer_query",
    "ref": "optional-reference",
    "uid": "user99",
    "dsn": "apigee",
    "site_name": "vanilla",
    "acct_id": 100479,
    "call_reason": "S"
  }
}
{% endhighlight %}

#### SEATS_SOLD
{: style="font-size:20px"}

**Purpose:** Retrieves detailed information about seats that are sold to a consumer’s account.

{% highlight json %}
{
  "header": {
    "ver": 1,
    "src_sys_type": 2,
    "src_sys_name": "testing",
    "archtics_version": "V999"
  },
  "command1": {
    "cmd": "seats_sold",
    "call_reason": "test",
    "uid": "user99",
    "dsn": "apigee",
    "acct_id": 100479
  }
}
{% endhighlight %}

Congrats…

If further interest, contact Ticketmaster for discussion about more sophisticated integration…


**\*Product** – A Product is a collection of separate API calls that support a particular kind of integration. There are 4 separate "product" areas – Customer, Inventory, Hold, and Buy.

+	**Customer** – This product contains a number of API calls that provide detailed information about consumer (customer) accounts.  This product is typically used for CRM Integrations and Season Ticket Holder web portals.  These API calls include, but are not limited to: 
    - `Ping` – see above.
    - `Ats_Ext_Test_Polling` – see above.
    -	`Event_Search` – see above.
    -	`Event_Details` – see above.
    -	`Customer_Query` – see above.
    -	`Seats_Sold` - see above.
    -	`Customer_Add` – Create a new customer account.
    -	`Customer_Update` - Update an existing customer’s account.
    -	… and others.
+	**Inventory** – This product contains a number of API calls that provide available inventory, ticket pricing, and allow callers to request seats.  This product includes all the API calls in the “customer” product (above), plus:
    -	`Get_Avail_Seats` - Retrieves a list of available (unsold) seats for specified event.
    -	`Event_Price_Info` - Retrieves attributes about each price code, ticket type, and price for seats for a specific event. 
    -	… and others.
+	**Hold** – This product contains a number of API calls that allow callers to Hold seats in a shopping cart.  This product contains all the API calls in the “Inventory” product (above), plus:
    -	`Seats_Hold` - Holds “best available” seats in the shopping cart.
    -	`Seats_Hold_Specific` - Holds user-specified seats in the shopping cart.
    -	`Shopping_Cart` - capitalize the contents of the shopping cart.
    -	… and others.
+	**Buy** – Contains all the API calls that allow callers to purchase and manage seats for a consumer.  This product contains API calls that allow an authorized partner to offer a complete purchase transaction.  This product contains all APIs in the system, including:
    -	`Check_out` - Retrieves fees due for items in the shopping cart.
    -	`Payment_Request` - Authorizes payments and completes the purchase of seats.
    -	`Ticket_Print` – Print tickets; can be used for electronic ticket delivery.
    -	… and others.


## Asynchronous Polling
{: #asynchronous-polling}

Ticketmaster systems support multiple clients and our Web Services layer requires the use of an asynchronous polling method. Here is how asynchronous request processing works:

+ Initial call: The caller makes a HTTPS request.
  - Header:
    + HTTP Method = POST
    + Content-Type: application/json
  - Body:
    + The JSON Command should be included here
+ Initial response: X seconds later (X is usually &lt; 4 seconds), the server may respond with
  - If HTTP response &quot;200 OK&quot; is returned
    * Request is complete - no polling logic is required; skip this entire section.
  - If HTTP response &quot;202 Accepted&quot; is returned, the response will include:
    * Set-Cookie: `CID=<something>`
    * Set-Cookie: `QTKN=<something>`
    * Continue to step 3
  - If HTTP response is not 200 and is not 202, contact Ticketmaster for assistance.
+ Y seconds later (Y is normally about 300 ms), the caller repeats the initial HTTPS request, using the &quot;cookies&quot; provided, to check if the response is complete.
  - The complete JSON Command should be included each time the call is re-submitted.
  - Cookie values that were returned by the SERVER with the &quot;Set\_Cookie&quot; responses (above) must be provided in this polling step.
    * `SID` - should not change for the duration of this API polling cycle.
    * `CID` - use the value provided by the web service in step 2
    * `QTKN` - use the value provided by the web service in step 2
+ Steps 2 and 3 are repeated until response is complete.
+ When the response is complete, the server responds with a &quot;200 OK&quot; HTTP header response, and the results of the initial request.
+ Ticketmaster recommends setting a timeout value of approximately 10 minutes. In other words, continue polling for a response to the same API call for up to 10 minutes. If a polling response for a single API request is not complete within that time, please contact Ticketmaster for resolution.
+ Supporting Cookies - If the response from app.ticketmaster.com contains &quot;Set-Cookie&quot;, the Caller is required to honor those cookies in order to properly use the asynchronous polling method. For example, calling servers should create an HTTP session for each end user (caller), and reuse the same HTTP session for the duration of that end user session (the duration of that particular API call).

## HTTP Result Codes and Meaning
{: #http-result-codes-and-meaning}

- `200` OK - Successful Query Results
- `202` ACCEPTED - The query was submitted to the Queue server, but response is not yet available; the same query should be tried again soon
- `401` UNAUTHORIZED – Not authored for this area, or wrong API KEY
- `404` NOT FOUND – Setup issue. Please contact Ticketmaster
- `429` TOO MANY REQUESTS – You have exceeded your quota or rate limit
- `503` SERVICE UNAVAILABLE – Ticketmaster server is currently unavailable

For additional information, please contact  [ArchticsIntegrationSupport@ticketmaster.com](mailto:ArchticsIntegrationSupport@ticketmaster.com) during business hours (Monday thru Friday from 8AM to 8PM Eastern US).