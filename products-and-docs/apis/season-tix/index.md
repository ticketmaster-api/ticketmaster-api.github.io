---
layout: documentation
categories:
- documentation
- season-tix
title: Season Tix API 1.0
excerpt: The Ticketmaster Season Tix API
keywords: Season Tix API
---

{: .article}
# Season Tix API

Season Tix API Specification
{: .lead}

## Overview
{: #overview }
This is a sample of the many API calls that are used by external systems to access data from an Archtics (Ticketmaster) database. For additional information, please contact [archtics_integration_services@ticketmaster.com](mailto:archtics_integration_services@ticketmaster.com) during business hours.

## PING
{: #ping}

**Purpose:** Confirms system connectivity and server status.

**Cache:** No.

**USE:** This API call can be used to test general connectivity to a database.

#### NOTES:
This call can be used as a mechanism to make sure connectivity is available to a database.

### Requirements:
none

### Frequency of operation:
This API call can be made as often as needed, based on mutual agreement between TM and the caller.

### Incremental or Comprehensive Data:
This API will return comprehensive data.

### Data Delivery:
  -	Data content: the API will return all data as it pertains to system health.
  -	Approximate size of a single "record": approximately 550 characters.
  -	Retrieve the next "batch" of records:  n/a
  -	"last record" indicator: n/a
  -	Request for previously received data:  n/a
  -	Duplicate data: n/a
  -	Time zone: n/a

### Error Messages:
These are no error messages that are unique to this API call.

### Input and Output Parameter Details:

|Parm#	| Parameter Name	     |I/O	   |Data Type  |	Reqd	| Description|
|:------|:---------------------|:-----:|:----------|:------:|:-----------|
| I_1. |`	cmd	`|I|	Char(32)	|Y|	Always "ping" |
| I_2. |`	ref	`|I|	Char(32)	|N|	Reference attribute; echoed to result |
| I_3. |`	uid	`|I|	Char(12)	|Y|	User ID (used on connection to DB). (user99) |
| I_4. |`	pwd	`|I|	Char(36)	|N|	If password is passed, it will be enforced. |
| I_5. |`	dsn	`|I|	Char(32)	|Y|	Data Source Name (e.g. DB) to connect to (apigee) |
| O_1. |`	ref	`|O|	Char(32)	|N|	Reference attribute; echoed from request |
| O_2. |`	result	`|O|	Integer	|Y|	Result (return code) <br />`0` – OK.  Ping successful <br />`all others` – Internal error |
| O_3. |`	sql_code	`|O|	Integer	|Y|	SQL Return Code |
| O_4. |`	error_detail	`|O|	Varchar(250))	|N|	English description of any generated errors |
| O_5. |`	system_available	`|O|	Boolean	|Y|	Flags if system is available for requests |
| O_6. |`	digit_available	`|O|	Boolean	|Y|	Flags if system is available for Digit (e.g. sending/retrieving seats from the Host) |
| O_7. |`	cpu_load	`|O|	Integer	|Y|	CPU load of server (if server is a multi-processor, this is the average load of all processors) |
| O_8. |`	cpu_usage	`|O|	Decimal(12,6)	|Y|	CPU usage of server process (in milli-seconds) |
| O_9. |`	db_connections	`|O|	Integer	|Y|	Active DB connections |
| O_10. |`	active_requests	`|O|	Integer	|Y|	Number of Server Threads actively handling a request |
| O_11. |`	unscheduled_requests	`|O|	Integer	|Y|	Number of requests queued up waiting for an available Server Thread |
| O_12. |`	db_name	`|O|	Varchar(20)	|Y|	Database Name as defined by ticketing server |

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight http %}
POST /url HTTP/1.1
Content-Type: application/json;

{
    "header": {
        "ver": 1,
        "src_sys_type": 2,
        "src_sys_name": "testing",
        "archtics_version": "V999"
    },
    "command1": {
        "cmd": "ping",
        "uid": "user99",
        "dsn": "apigee"
    }
}
{% endhighlight %}

{% highlight http %}
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "command1": {
    "active_requests": 1,
    "cmd": "ping",
    "system_available": 0,
    "cpu_load": 1,
    "digit_available": 0,
    "db_name": "apigee",
    "cpu_usage": 76219.19,
    "unscheduled_requests": 0,
    "db_connections": 10,
    "result": 0,
    "sql_code": 0
  },
  "header": {
    "src_sys_type": 2,
    "archtics_version": "V999",
    "ver": 1,
    "src_sys_name": "testing",
    "ats_version": "4.23.3",
    "result": 0
  }
}
{% endhighlight %}

## Customer Query
{: #customer-query}

**Purpose:** Customer query returns basic account and name information based on an input account-id, email address or external-id.   It can also be used to validate a customer’s pin.

**Cache:** No.

**Use:** This API call can be used to return customer (name) attributes.  There are several input parameter options:

#### NOTES:
When providing email-address:  Based on the name that is associated with the input email address, the attributes of the name returned, along with all accounts linked to the email address and certain account-level information for the main account that the name associated with the email address is primary.

When providing alternate-id:  Based on the name associated with the input external-id, the attributes of the name are returned, along with all accounts linked to the email address and certain account-level information for the account that the name associated with the email address is primary.    Note: the referenced alternate-id (name level) is not to be confused with external-id (account level)

Pin vs system account – When customer query is called with an PIN, the pin must match the pin for the name (if email or alternate-id are provided) or the primary name on the account (if account-id is provided) to successfully return.  This is intended as a means of authenticating the consumer.    

Customer query can also be called with a calling reason of 'S' (system), in which case the pin is not required.    The use case is typically a customer service application, where the calling application has other means of authenticating the consumer.

-	input = `acct_id`
    *	the attributes of the primary name are returned, along with certain account-level attributes (login attempts,rec_status,etc. ).
    *	No secondary name information is returned.
-	input = `email_address`
    * the attributes of the name associated with the email address are returned,
    * a delimited list of each account linked to the email address.
    *	certain account-level information for the account associated where the email address is primary.
-	output = `account_group`
    *	returns an array of account groups that an account belongs to
-	output = `account_id_list`
    *	This is a list of ACCOUNTS to which this NAME (email) is associated.  The first `acct_id` in that list is always the primary (main) account for that person/name/email.  The order of the remaining account ID’s is in ‘nickname’ order.
	
+	System only returns `ext_system_id_2` and `ext_system_id_1` (account-level)
+	If the input parameter includes the correct PIN, the same PIN will be returned in the output.  Otherwise, PIN is never returned in the call.


### Input and Output Parameter Details:

|Parm#	| Parameter Name	     |I/O	   |Data Type  |	Reqd	| Description|
|:------|:---------------------|:-----:|:----------|:------:|:-----------|
|I_1.		|`cmd`	|I|	Char(32)	|Y|	Always "customer_query"  |
|I_2.		|`ref`	|I|	Char(32)	|N|	Reference attribute; echoed to result |
|I_3.		|`uid`	|I|	Char(12)	|Y|	User ID (used on connection to DB). <br/> Uid will be provided by TM |
|I_4.		|`pwd`	|I|	Char(36)	|N|	If password is passed, it will be enforced. |
|I_5.		|`dsn`	|I|	Char(32)	|Y|	Data Source Name (e.g. DB) to connect to |
|I_6.		|`site_name`	|I|	Char (24)	|Y|	Identifies the web-site the consumer is logging in from |
|I_7.		|`acct_id`	|I|	Integer	|Y/N/N| Account ID |
|I_8.		|`email`	|I|	Char(100)	|N/Y/N|	Email address |
|I_9.		|`pin`	|I|	Char(250)	|Y/Y/N|	Personal Identification Number (e.g. password). PIN must match either the consumer PIN (on account) –or- a "system" PIN that can be derived from the input email address or acct_id. |  
|I_10.		|`cust_name_id`	|I|	Integer	|N/na/na|	Used in conjunction with acct_id, to get the customer information that is not the primary information on the account. |
|I_11.		|`alt_id`	|I|	Varchar(50)	|na/na/Y|	Optional search by Alternate Id.  Only used if neither acct_id nor email is provided.   If this is provided, can further limit by alt_id_type. alt_id is ignored if email or acct_id is provided |
|I_12.		|`alt_id_type`	|I|	Varchar(6)	|na/na/N|	Only used with input of  alt_id |
|I_13.		|`call_reason`	|I|	Char(1)	|N|	A call reason of "S" means that it is a call generated by an external system, rather than the actual consumer.  For this call reason, the PIN is not required.  The consumer pin is also not returned in these cases. Required when only alt_id is provided. |
|O_1.		|`ref`	|O|	Char(32)	|N|	Reference attribute; echoed from request |
|O_2.		|`result`	|O|	Integer	|Y|	Result (return code) <br/>`0` – OK. Customer record found and returned <br/>`5020` – Account Locked – too many invalid attempts <br/>`5021` – Required input field not supplied <br/>`5022` – Account does not have a PIN established <br/>`5023` – PIN does not match <br/>`5024` – Account/Email not found <br/>`10681` – cust_name_id doesn’t exist on acct_id <br/>`10682` – cust_name_id doesn’t match email <br/>`10684` – No record for alt_id <br/>`10685` – Multiple records for alt_id (only value returned is list of acct_ids that alt_id is found on) <br/>`10699` – Temporary Password (PIN), must be updated <br/>`11775` - Email address not in valid state. <br/>All others – Internal error |
|O_3.		|`sql_code`	|O|	Integer	|Y|	SQL Return Code |
|O_4.		|`error_detail`	|O|	Varchar(250)	|N|	English description of any generated errors |
| |`customer`	|O|	Structure {	|Y|	Structure of  "customer" data |
|O_5.		|`acct_id`		||Integer	|Y|	Account ID |
|O_6.		|`name_first`	||	Char(40)	|N|	First Name |
|O_7.		|`name_mi`		||Char(40	|N|	Middle Initial |
|O_8.		|`name_last`	||	Char(80)	|Y/N|	Last Name.  Either Last Name or Company Name are required, depending on the value for name_type. |
|O_9.		|`title`		||Char(30)	|N|	Title |
|O_10.		|`company_name`||		Varchar(100)	|N/Y|	Company Name |
|O_11.		|`street_addr_1`||		Char(40)	|N|	Street Address – line 1 |
|O_12.		|`street_addr_2`||	Char(40)	|N|	Street Address – line 2 |
|O_13.		|`city`||		Char(20)	|N|	City |
|O_14.		|`state`||		Char(2)	|N|	State |
|O_15.		|`zip`||		Char(10)	|N|	Zip Code |
|O_16.		|`country`||		Char(8)	|N|	Country |
|O_17.		|`phone_day`||		Char(15)	|N|	Phone Number – daytime (not formatted – strip all spaces, dashes, parens, etc.) |
|O_18.		|`phone_eve`||		Char(15)	|N|	Phone Number – evening |
|O_19.		|`phone_fax`||		Char(10)	|N|	Phone Number – FAX |
|O_20.		|`phone_cell`||		Char(15)	|N|	Phone Number – Cell |
|O_21.		|`phone_alt1`||		Char(15)	|N|	Phone Number – alternate 1 | 
|O_22.		|`phone_alt2`||		Char(15)	|N|	Phone Number – alternate 2 |
|O_23.		|`email`||		Char(100)	|N|	E-mail address |
|O_24.		|`birth_date`||		Date	|N|	Birth date |
|O_25.		|`gender`||		Char(1)	|N|	Gender (Male, Female) |
|O_26.		|`ext_system_id_1`|| 		Char(10)	|N|	ID for linkage to an external system (1 of 2). This attribute is associated with an account. |
|O_27.		|`ext_system_id_2`|	|	Char(10)	|N|	ID for linkage to an external system (2 of 2). This attribute is associated with an account. |
|O_28.		|`add_date`| 	|	Date	|Y|	Date the customer was added to the system (Note that this column is not available to the Customer_Add or Customer_Update API calls) |
|O_29.		|`acct_type`| |		Char(20)	|Y|	Account type (Note that this column is not available to the Customer_Add or Customer_Update API calls) |
|O_30.		|`email_optout`|	|	Boolean	|N|	Option to not receive email from client (1 = Opt Out) |
|O_31.		|`email_deliv_opt`|	|	Char(1)	|N|	Option to how to get email delivered <br/>H – HTML <br/>T – Text |
|O_32.		|`text_on_mobile_phone`||		Boolean	|N|	Does this consumer allow text messages to be sent to their mobile phone? (0 = No, 1 = Yes) |
|O_33.		|`name_type`|	|	Char(1)	|N|	Is name an "I"ndividual or a "C"ompany <br/>** not allowed on customer_update. |
|O_34.		|`acct_access_level`|	|	Char(1)	|N|	AccountManager Access Level: "F" is full, "R" is restricted., other values TBD.  Defaults to "F" |
|O_35.		|`cust_name_id`||		Integer	|Y|	id of the customer. |
||	`array of alternate ids` |      |{|		| Alt_id_array |
|O_36.		|`alt_id_type`|		|Char(6)	|N|	Name of alternate ID. This attribute is associated with a customer name. |
|O_37.		|`alt_id`|		|Varchar(50)	|N|	Value of alternate ID. This attribute is associated with a customer name. |
|O_38.		|`alt_id_comment`|		|Varchar(100)	|N|	Comment associated with alternate ID |
|O_39.		|`alt_id_action`|		|Char(1)	|N|	Only applies to Customer_Update <br/> ‘A’ to add the alt_id (default)<br/> ‘D’ to delete an existing alt_id |
|         |   | |}  ||		** end of "alternate IDs ** (alt_id_array) |
|         |   | |}	||	** End of  "customer" structure ** |
|O_40.		|`logon_attempts`	|O|	Integer	|Y|	Number of invalid logon attempts  (including this attempt) | 
|O_41.		|`change_pin`	|O|	Boolean	|N|	Force the user to change their PIN (1 = Force change) |
|O_42.		|`other_info_1`	|O|	Char(100)	|N|	acct level free form information |
|O_43.		|`other_info_2`	|O|	Char(100)	|N|	acct level free form information |
|O_44.		|`other_info_3`	|O|	Char(100)	|N|	acct level free form information |
|O_45.		|`other_info_4`	|O|	Char(100)	|N|	acct level free form information |
|O_46.		|`other_info_5`	|O|	Char(100)	|N|	acct level free form information | 
|O_47.		|`other_info_6`	|O|	Char(100)	|N|	acct level free form information |
|O_48.		|`other_info_7`	|O|	Char(100)	|N|	acct level free form information |
|O_49.		|`other_info_8`	|O|	Char(100)	|N|	acct level free form information |
|O_50.		|`other_info_9`	|O|	Char(100)	|N|	acct level free form information |
|O_51.		|`other_info_10`	|O|	Char(100)	|N|	acct level free form information |
|O_52.		|`account_id_list`	|O|	Long varchar	|Y|	Comma delimited list of accounts that input acct id or email is found on.   Only meaningful when email or alt_id is input. |
|O_53.		|`account_nickname`	|O|	Varchar(40)	|Y|	List of Nicknames for account that this customer is associated with |
|O_54.		|`other_info_11`	|O|	Char(100)	|N|	acct level free form information |
|O_55.		|`other_info_12`	|O|	Char(100)	|N|	acct level free form information |
|O_56.		|`other_info_13`	|O|	Char(100)	|N|	acct level free form information |
|O_57.		|`other_info_14`	|O|	Char(100)	|N|	acct level free form information |
|O_58.		|`other_info_15`	|O|	Char(100)	|N|	acct level free form information |
|O_59.		|`other_info_16`	|O|	Char(100)	|N|	acct level free form information |
|O_60.		|`other_info_17`	|O|	Char(100)	|N|	acct level free form information |
|O_61.		|`other_info_18`	|O|	Char(100)	|N|	acct level free form information |
|O_62.		|`other_info_19`	|O|	Char(100)	|N|	acct level free form information |
|O_63.		|`other_info_20`	|O|	Char(100)	|N|	acct level free form information |
|O_64.		|`rec_status`	|O|	Varchar(20)	||	Rec Status |
|O_65.		|`rec_status_list`	|O|	Long Varchar	||	Comma delimited list of rec status that input acct id or email is found on. Only meaningful when Account_id_list is populated. |
|| `array of account group ids` 	| |{|		| account_groups |
|O_66.		|`account_group`		|Integer	|N|	Account Group ID (aka Membership ID) that this consumer is a member of |
|||       |}|    |		** end of "Account Group IDs" ** (account_groups) |


### Sample JSON Call - using [acct_id]:

{% highlight http %}
POST /url HTTP/1.1
Content-Type: application/json;

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

### Sample JSON Call - using [alt_id] and [alt_id_type]:

{% highlight http %}
POST /url HTTP/1.1
Content-Type: application/json;

{
  "header": {
    "ver": 1,
    "src_sys_type": 2,
    "src_sys_name": "test",
    "archtics_version": "V999"
  },
  "command1": {
    "cmd": "customer_query",
    "uid": "user99",
    "dsn": "apigee",
    "alt_id": "LOYALTY-123",
    "alt_id_type": "LOY",
    "call_reason": "S"
  }
}
{% endhighlight %}

### Sample JSON Call - using [PIN]:
{% highlight http %}
POST /url HTTP/1.1
Content-Type: application/json;

{
  "header": {
    "ver": 1,
    "src_sys_type": 2,
    "src_sys_name": "test",
    "archtics_version": "V999"
  },
  "command1": {
    "cmd": "customer_query",
     "ref": "optional-123",
     "uid": "user99",
     "dsn": "apigee",
     "site_name": "vanilla",
     "acct_id": 100479,
     "pin": "123123"
  }
}
{% endhighlight %}

### Sample JSON Call - using [email address]:

{% highlight http %}
POST /url HTTP/1.1
Content-Type: application/json;

{
  "header": {
    "ver": 1,
    "src_sys_type": 2,
    "src_sys_name": "test",
    "archtics_version": "V999"
  },
  "command1": {
    "cmd": "customer_query",
    "ref": "optional-123",
    "uid": "user99",
    "dsn": "apigee",
    "site_name": "vanilla",
    "email": "john.q@mailinator.com ",
    "call_reason": "S"
  }
}
{% endhighlight %}

### Sample JSON Response [same JSON response for each of the API commands above]:

{% highlight http %}
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "command1": {
      "cmd": "customer_query",
      "account_groups": [
        {
          "account_group": "0"
        },
        {
          "account_group": "1"
        }
      ],
      "logon_attempts": 0,
      "account_id_list": "100479",
      "customer": {
        "name_type": "I",
         "alt_id_array": [
          {
            "alt_id_comment": "Testing External System ID"
            "alt_id_type": "EXTSY"
            "alt_id": "EXT-12345"
          },
          {
            "alt_id_comment": "LOYALTY-321"
            "alt_id_type": "LOY"
            "alt_id": "LOYALTY-123"
          }
        ],
        "phone_fax": "5310869753",
        "name_mi": "Q",
        "add_date": "2016-04-11",
        "name_last": "Public",
        "email_deliv_opt": "H",
        "zip": "43201",
        "acct_access_level": "F",
        "acct_type": "Personal",
        "state": "OH",
        "acct_id": 100479,
        "owner_name": "John Q. Public",
        "cust_name_id": "2",
        "country": "USA",
        "name_first": "John",
        "email_optout": 0,
        "city": "Columbus",
        "text_on_mobile_phone": 0,
        "phone_day": "9876543210",
        "phone_eve": "7654321098",
        "street_addr_2": "Apt 307",
        "street_addr_1": "85 Treetop Lane",
        "email": "john.q@mailinator.com"
      },
      "change_pin": 0,
      "rec_status": "Active",
      "result": 0,
      "ref": "optional-reference",
      "sql_code": 0
    },
    "header": {
      "src_sys_type": 2,
      "archtics_version": "V999",
      "ver": 1,
      "src_sys_name": "test",
      "ats_version": "4.23.3",
      "result": 0
    }
}
{% endhighlight %}

## Event Search
{: #event-search}

**Purpose:** Returns attributes about events that occur within a specified date range.

**Cache:**	Yes.

#### NOTES:
The caller can restrict the data returned by including optional input parameters, like "end_date" and "season_name" and "num_seats", etc.  This will reduce the number of events returned in the response.

The list of classes in the "hold_classes" output array will be restricted to those Season Tix classes for which the caller (uid) has privileges.

The list of classes in the "avail_classes" output array will be restricted to those Season Tix classes which are available for sale.

The Season Tix Sell Location Rules are not considered for this API call.

If start_date is omitted, default start_date is today's date.  If end_date is omitted, end_date is 90 days after start_date.

The system is optimized to search for specific Hold_Class values.  It is highly recommended that all calls include a valid “hold_classes” input parameter.  If the “hold_classes” parameter is not provided, the API response may be delayed by up to 2 minutes for a large database.


### Frequency of operation:
This API call can be made as needed, in accordance with the agreement between Ticketmaster and the caller.

### Incremental or Comprehensive Data:
This API will return comprehensive data.  The response data is intended to replace all previous data responses.

### Data Delivery:
  -	Data content: the API will return a separate array of information for each event that occurs within the date range specified.
  -	Approximate size of a single "array": varies from 100 to 1,000 characters
  -	Retrieve the next "batch" of records:  n/a
  -	"last record" indicator: n/a
  -	Request for previously received data:  repeat the API call
  -	Duplicate data: the calling system is responsible for de-duplicating data.
  -	Time zone: all times are relative to the client’s location.

### Error Messages:
These are no error messages that are unique to this API call.

### Input and Output Parameter Details:

|Parm#	| Parameter Name	     |I/O	   |Data Type  |	Reqd	| Description|
|:------|:---------------------|:-----:|:----------|:------:|:-----------|
| I_1. |	`cmd`	|I|	Char(32)	|Y|	Always "event_search" |
| I_2. |	`ref`	|I|	Char(32)	|N|	Reference attribute; echoed to result |
| I_3. |	`uid`	|I|	Char(12)	|Y|	User ID (used on connection to DB). (user99) |
| I_4. |	`pwd`	|I|	Char(36)	|N|	If password is passed, it will be enforced |
| I_5. |	`dsn`	|I|	Char(32)	|Y|	Data Source Name (e.g. DB) to connect to (apigee) |
| I_6. |	`site_name`	|I|	Char (24)	|N|	Identifies the web-site the consumer is logging in from. If provided, it will be used to search for events and will be authenticated. |
| I_7. |	`organization`	|I|	Char(32)	|N|	Name of the organization to which the events belong. |
| I_8. |	`start_date`	|I|	Date	|N|	Start date (event must begin after this date). Default:  Today’s date |
| I_9. |	`end_date`	|I|	Date	|N|	End date (event must begin before this date). Default:  3 months from start_date |
| I_10. |	`venue_name`	|I|	Char(32)	|N|	Venue name |
| I_11. |	`season_name`	|I|	Char(32)	|N|	Season name (can be used for series) |
| I_12. |	`hold_class`	|I|	Char(20)	|N|	(Hold) class name (limited to a single hold_class) |
| I_13. |	`num_seats`	|I|	Integer	|N|	Desired number of seats.  Events will only be returned if there are contiguous seats >= the input num seats |
| I_14. |	`acct_id`	|I|	Integer	|N|     |
| I_15. |	`hold_classes`	|I|	Array[]	|N|	To be used if the caller is filtering on multiple hold classes.<br />Array of hold_classes, refer to the sample request below for format of the array.<br />If both "hold_class" and "hold_classes" fields are provided, "hold_class" field will be ignored.|
| O_1. |	`ref`	|O|	Char(32)	|N|	Reference attribute; echoed from request |
| O_2. |	`result`	|O|	Integer	|Y|	Result (return code) <br />`0`	– OK. Search successful and events returned <br />`5211` – Required input field not supplied or invalid <br />`5211` – Invalid site_name <br />`5212` – No events found meeting input criteria <br />`all others` – Internal error |
| O_3. |	`sql_code`	|O|	Integer	|Y|	SQL Return Code |
| O_4. |	`error_detail`	|O|	Varchar(250)	|N|	English description of any generated errors |
|      |	`events`	|O|	Array [	|Y|	Array of event results |
| O_5. |	`event_name`	|O|	Char(8)	|Y|	Event name |
| O_6. |	`availability`	|O|	Boolean	|Y|	Availability indicator <br/>`0` – no seats available (either sold out or nothing matching input criteria) <br />`1` – seats are available |
|      |	`avail_class`		| | Array [	|N|	Array of hold classes with available seats |
| O_7. |	`avail_class`	|O|	Char(20)	| |	(hold) class name with available seats |
|      |               | |&nbsp;&nbsp; ]||	** End of "avail_class" array ** (inner array)|
|      |               | | ]	          ||	** End of "events" array **|
|      |	`hold_classes` ||		Array [	|Y|	Array of all hold classes that were searched |
| O_8. |	`hold_classes`	|	| Char(20) |	|	All hold classes that were searched |
|      |                  | | ]        |  | ** End of hold_classes" array** |

### Sample JSON Call/Response [with start and end dates]:

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight http %}
POST /url HTTP/1.1
Content-Type: application/json;

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
    "start_date": "2016-05-01",
    "end_date": "2016-06-31"
  }
}
{% endhighlight %}

{% highlight http %}
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
    "command1": {
        "cmd": "event_search",
        "hold_classes": [
            "DIST-OPEN",
            "DIST-1HOLD",
            "DIST-2HOLD",
            "DIST-3HOLD",
            "DIST-4HOLD",
            "DIST-5HOLD",
            "DIST-6HOLD",
            "DIST-7HOLD",
            "DIST-8HOLD",
            "DIST-DHOLD",
            "DIST-EHOLD",
            "DIST-FHOLD",
            "DIST-HOLD",
            "DIST-REFUND",
            "DIST-===",
            "DIST-CLASSON",
            "DIST-RETURNS",
            "DIST-OQUAL",
            "DIST-1QUAL",
            "DIST-2QUAL",
            "DIST-3QUAL",
            "DIST-4QUAL",
            "DIST-5QUAL",
            "DIST-6QUAL",
            "DIST-7QUAL",
            "DIST-8QUAL",
            "DIST-DQUAL",
            "DIST-EQUAL",
            "DIST-FQUAL",
            "DIST-HQUAL",
            "DIST-KQUAL",
            "DIST-RQUAL",
            "OPEN",
            "PREFERRED",
            "SUITES",
            "OUTHOLD",
            "REMOVABLE",
            "DOQ-WHEELCHAIR",
            "DOQ-COMPANION",
            "DOQ-SIGHT/HEARING",
            "DOQ-LIMITED MOBILITY",
            "KILL"
        ],
        "events": [
            {
                "event_name": "EVENT01",
                "avail_class": [
                    "OPEN"
                ],
                "availability": 1
            },
            {
                "event_name": "EVENT02",
                "avail_class": [
                    "OPEN"
                ],
                "availability": 1
            }
        ],
        "result": 0,
        "ref": "1AB2C3",
        "sql_code": 0
    },
    "header": {
        "src_sys_type": 2,
        "archtics_version": "v999",
        "ver": 1,
        "src_sys_name": "test",
        "ats_version": "4.23.3",
        "result": 0
    }
}
{% endhighlight %}


### Sample JSON Call/Response [with start and end dates and invalid hold_class]:

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight http %}
POST /url HTTP/1.1
Content-Type: application/json;

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
    "hold_class": "foobar",
    "start_date": "2016-05-01",
    "end_date": "2016-06-31"
  }
}
{% endhighlight %}

{% highlight http %}
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "command1": {
    "error_detail": "No valid classes",
    "result": 10535,
    "ref": "1AB2C3",
    "cmd": "event_search",
    "sql_code": 100
  },
  "header": {
    "src_sys_type": 2,
    "archtics_version": "v999",
    "ver": 1,
    "src_sys_name": "test",
    "ats_version": "4.23.3",
    "result": 0
  }
}
{% endhighlight %}


### Sample JSON Call/Response [with limited hold_classes]:

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight http %}
POST /url HTTP/1.1
Content-Type: application/json;

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
    "hold_classes": [
      "OPEN",
      "suites"
    ],
    "start_date": "2016-05-01",
    "end_date": "2016-06-31"
  }
}
{% endhighlight %}

{% highlight http %}
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "command1": {
    "cmd": "event_search",
    "hold_classes": [
      "OPEN",
      "SUITES"
    ],
    "events": [
      {
        "event_name": "EVENT01",
        "avail_class": [
          "OPEN",
          "SUITES"
        ],
        "availability": 1
      },
      {
        "event_name": "EVENT02",
        "avail_class": [
          "OPEN"
        ],
        "availability": 1
      }
    ],
    "result": 0,
    "ref": "1AB2C3",
    "sql_code": 0
  },
  "header": {
    "src_sys_type": 2,
    "archtics_version": "v999",
    "ver": 1,
    "src_sys_name": "test",
    "ats_version": "4.23.3",
    "result": 0
  }
}
{% endhighlight %}


## Event Details
{: #event-details}

**Purpose:** Returns a list of events and event attributes.

**Cache:**	Yes.  Refresh 1-2 times per day (depending on expected number of event updates)

**Use:** This API call can be used to return:

1.	All events in the database
2.	A specific event or list of events.
  - `event_filter_type` : "L"
  - `event_filter` : "EVENT01,EVENT02,EVENT03" (Note: no space after the comma)
3.	A specific number of events (e.g. 45)
  - `count` : 45
4.	A specific number of events (e.g. 200) starting with a specific event (e.g. EVENT999)
  - `prev_event_name` : "EVENT999",
  - `count`: 200
5.	All events in a specific item set
  - `event_filter_type` : "S"
  - `event_filter` : "2014_Basketball"


#### NOTES:
1.	The events are returned in alphabetical order by event_name.
2.	Plan events are also included in the result set.  The event_name parameter will be the Plan Name, and the `events_in_plan` array will display all events within that plan.

### Frequency of operation:
This API call can be made 1-2 times per day, or as Season Tix events are added or changed.

### Incremental or Comprehensive Data:
This API will return comprehensive data.

### Data Delivery:
  - Data content: the API will return a separate array of information for each event.
  - Approximate size of a single "record": about 750 characters per event
  - Retrieve the next "batch" of records:  use the `prev_event_name` input parameter
  - "last record" indicator: n/a
  - Request for previously received data:  n/a
  - Duplicate data: the calling system is responsible for de-duplicating data.
  - Time zone: All times are relative to the client's venue or arena.

### Input and Output Parameter Details:

|Parm#	| Parameter Name	     |I/O	   |Data Type  |	Reqd	| Description|
|:------|:---------------------|:-----:|:----------|:------:|:-----------|
|I_1.		|`cmd`	|I|	Char(32)	|Y|	Always “event_details”  |
|I_2.		|`ref`	|I|	Char(32)	|N| Reference attribute; echoed to result |
|I_3.		|`uid`	|I|	Char(12)	|Y|	User ID (used on connection to DB). <br/> Uid will be provided by TM |
|I_4.		|`dsn`	|I|	Char(32)	|Y|	Data Source Name (e.g. DB) to connect to (apigee) |
|I_5.		|`site_name`	|I|	Char (24)	|N|	Identifies the web-site the consumer is logging in from. <br/> If provided, then the list of events returned by this call will be limited to those in the organization to which this site is attached. If not provided, then all events will be returned. |
|I_6.		|`prev_event_name`	|I|	Char (8)|N| The last event name retrieved on the previous SP call.  This allows the SP to be called in a loop and return all events. Use spaces or NULL on the 1st call to get the 1st event |
| I_7.  |	`count`	|I| Integer	|N|	Limits the number of event records to be returned.  Default = 500.|
| I_8.  |	`event_filter`	|I|	Long Varchar	|N/Y|	Name of item set, or comma-delimited list of event names. <br/> If not provided, then all events will be returned. <br/> If event_filter_type = 'S', then event_filter will refer to an item set. <br/> If event_filter_type = 'L', then event_filter will contain a comma-delimited list of event names.|
| I_9.  |	`event_filter_type`|	I|	Char(1)|	N/Y|	Type of event filter Required if event_filter is included NULL = All events will be returned (current behavior) <br/> S = Event selector <br/> L = List of event names|
|O_1.		|`ref`	|O|	Char(32)	|N|	Reference attribute; echoed from request |
|O_2.		|`result`	|O|	Integer	|Y|	Result (return code) <br/>`5211` – Invalid “site_name” <br/>`5231` – No events found <br/>`11075` – Return data size exceeds 250000 byte limit <br/>All others – Internal error |
|O_3.		|`sql_code`	|O|	Integer	|Y|	SQL Return Code |
|O_4.		|`error_detail`	|O|	Varchar(250)	|N|	English description of any generated errors |
|O_5.		|`count`	|O|	Integer	|Y|	Actual number of event records returned|
|       |`customer`	|O|	Array [	|Y|	Array of event results |
|O_6.   | `event_name`	|O|	Char(8)	|Y|	Event name|
|O_7.   | `event_name_inet`	|O|	Varchar(50)	|Y|	Event name – specifically for online display|
|O_8.   |	`event_description`	|O|	Varchar(255)	|N|	Event description – specifically for online display|
|O_9.   |	`inet_event_text`	|O|	Long varchar	|N|	Event text.  Can be long description of event.|
|O_10.  |	`plan_type`	|O|	Char(1)	|Y|	Plan Type <br/>S = Same seat (static) plan <br/>N = Single event (not a plan)|
|O_11.  |`total_events`	|O|	Integer	|Y|	Number of events in a plan|
|O_12.  |`event_date`	|O|	Date	|N|	Event Date|
|O_13.	|`event_time`	|O|	Time	|N|	Event Time|
|O_14.	|`performer`	|O|	Char(50)	|Y|	Performer / opponent (sports) name|
|O_15.	|`organization`	|O|	Char(16)	|Y|	Owning organization|
|O_16.	|`venue_name`	|O|	Char(30)	|Y|	Arena (venue) Name|
|O_17.	|`manifest_name`	|O|	Char(64)	|Y|	Manifest Name|
|O_18.	|`season_name`  	|O|	Varchar(80)	|Y|	Season Name|
|O_19.	|`event_category`	|O|	char(1)	|Y|	Event category <br/>E	Event (standard, seated event) <br/>P	Parking <br/>O	Other |
|O_20.	|`event_duration`	|O|	Integer	|N| Approximate duration (in minutes) of the event |
|O_21.	|`url`	|O|	Char(255)	|N|	URL for linking to another site for additional event information |
|O_22.	|`major_cat`	|O|	char(64)	|N|	Event Major Category |
|O_23.	|`minor_cat`	|O|	char(64)	|N|	Event Minor Category |
|O_24.	|`thumbnail_image_name`	|O|	Varchar(100)	|N|	Image name – thumbnails. <br/> This name will be used to look up the actual image stored on the web side.|
|O_25.	|`small_image_name`	|O|	Varchar(100)	|N|	Image name - small |
|O_26.	|`large_image_name`	|O|	Varchar(100)	|N|	Image name - large |
|O_27.	|`allow_singles`	|O|	Char(1)	|Y|	N- Do not allow a transaction that would create a single seat. <br/>Y – It is permissible to create a single, but should still be avoided when possible. |
|O_28.	|`event_onsale_date`	|O|	datetime	|N|	Start date & time of when event is “on-sale”.  This is the INET on-sale, or the Season Tix on-sale if INET is not set.  If neither are set, no value is returned.  Format:  YYYY-MM-DD HH:MM |
|O_29.	|`event_offsale_date`	|O|	datetime	|N|	End date & time of when event is “off-sale” |
| |`events_in_plan`	|O|	Array [	|N|	Array of events in a static plan |
|O_30.  |`event_name`	|O|	Char(8)	|N|	Event Name |
|       |             | | &nbsp;&nbsp; ]   | |	** End of “events_in_plan” array ** |
|       |             | | ]	      | |	** End of “events” array **         |

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight http %}
POST /url HTTP/1.1
Content-Type: application/json;

{
  "header": {
    "ver": 1,
    "src_sys_type": 2,
    "src_sys_name": "testing",
    "archtics_version": "V999"
  },
  "command1": {
    "cmd": "event_details",
    "event_filter": "Event01,Event02",
    "event_filter_type": "L",
    "uid": "user99",
    "dsn": "apigee"
  }
}
{% endhighlight %}

{% highlight http %}
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "command1": {
    "count": 2,
    "result": 0,
    "events": [
      {
        "event_duration": 180,
        "organization": "VANILLA",
        "plan_type": "N",
        "event_description": "Apigee Test Event #1",
        "minor_cat": "BASKETBALL",
        "event_name": "EVENT01",
        "major_cat": "SPORTS",
        "total_events": 1,
        "multiple_seats_per_pid": "N",
        "season_name": "Apigee Testing Season",
        "allow_singles": "Y",
        "manifest_name": "Test Manifest",
        "event_time": "20:00",
        "venue_name": "Arena",
        "performer": "Opposing Team #1",
        "event_category": "E",
        "event_date": "2016-05-01",
        "archtics_venue_id": "1"
      },
      {
        "event_duration": 180,
        "organization": "VANILLA",
        "plan_type": "N",
        "event_description": "Apigee Test Event #2",
        "minor_cat": "BASKETBALL",
        "event_name": "EVENT02",
        "major_cat": "SPORTS",
        "total_events": 1,
        "multiple_seats_per_pid": "N",
        "season_name": "Apigee Testing Season",
        "allow_singles": "Y",
        "manifest_name": "Test Manifest",
        "event_time": "18:00",
        "venue_name": "Arena",
        "performer": "Opposing Team #2",
        "event_category": "E",
        "event_date": "2016-06-01",
        "archtics_venue_id": "1"
      }
    ],
    "cmd": "event_details",
    "sql_code": 0
  },
  "header": {
    "src_sys_type": 2,
    "archtics_version": "V999",
    "ver": 1,
    "src_sys_name": "testing",
    "ats_version": "4.23.3",
    "result": 0
  }
}
{% endhighlight %}


## Seats Sold
{: #seats-sold}

**Purpose:** Seats Sold returns seats currently sold to an account.

For every block of seats sold onto the specified account at the time of the query, the following is returned: `event/section/row/first-seat/num-seats` along with associated block-level attributes such as price code, purchase price, seat status, action-ability, primary/secondary, transaction date, more…. Seat-status indicates whether the seat is available for action, has been forwarded or invited, been posted or resold, transferred to PID, etc. Action-ability determines whether the seats are enabled for printing (to TicketFast or xfer to PID), forwarding, resale, exchange etc.

In addition to block-level attributes, certain seat-level attributes are returned. These include an array of attendance indicators per block of seats (one per seat) and an array of barcodes per block. The barcodes will only be provided if the timeframe of the request is within the Tickets-ready window for the client.

Some callers do not want, or need, to see all events for an account.   They may only be interested in events in the future, events eligible for resale, etc.    Various filters are available to limit the domain of events returned, including starting-event-date, ending-event-date, based on action-ability, an enumerated list of event, and item-set based such as inet-sold, ticket-forward-events and resale-events.   These filters can be used concurrently and seats will be returned for events meeting ANY (“or” condition) of the filters specified.

Due to the potentially large datasets that can be returned, two mechanisms are provided for “chunking” the returned data.   The first is for the caller to specify the maximum number of records returned (“Count”). The second is for the caller to specify the last `event/section/row/seatblock` that was returned; the API will return the next chunk of data starting at the next record.

**Cache:**	no.

**USE:** Determine what plan, event(s), and seat locations are sold on to an account and what type of action (if any) can be taken against those seats.

#### NOTES:
  -	Pre-Defined Event Selectors;
    +	Forward = INET_FORWARD
    +	Resale = INET_RESALE
    +	Add Credit = INET_ADD_VALUE
    +	Print = INET_PRINT
    +	Club Group = INET_CLUB_GROUP
  -	Host seat sales are returned if a database table is configured properly (t_defaults; 'Seats_Sold - Host Sales Enabled' = Y.
  -	Although not required, it is highly recommended that the AM_Client_ID be included in the call.  If not, some data inconsistencies may arise.



### Frequency of operation:
This API call can be made as needed to discover seats sold to a customer account.

### Incremental or Comprehensive Data:
Comprehensive

### Data Delivery:
  -	Data content: the API will return a separate array of information for each service charge.
  -	Approximate size of a single "record": varies; an array for a typical block of 2 seats returns approximately 1,500 bytes of data.
  -	Retrieve the next "batch" of records:  n/a
  -	"last record" indicator: n/a
  -	Request for previously received data:  n/a
  -	Duplicate data: the calling system is responsible for de-duplicating data.
  -	Time zone: all time zones are relative to the client's venue.


### Error Messages:
See error messages in the output section.

### Input and Output Parameter Details:

|Parm#	| Parameter Name	     |I/O	   |Data Type  |	Reqd	| Description|
|:------|:---------------------|:-----:|:----------|:------:|:-----------|
| I_1. | `cmd`	|I|	Char(32)	|Y|	Always "seats_sold" |
| I_2. | `ref`	|I|	Char(32)	|N|	Reference attribute; echoed to result |
| I_3. | `uid`	|I|	Char(12)	|Y|	User ID (used on connection to DB). Uid will be provided by TM |
| I_4. | `pwd`	|I|	Char(36)	|N|	If password is passed, it will be enforced. |
| I_5. | `dsn`	|I|	Char(32)	|Y|	Data Source Name (e.g. DB) to connect to (apigee) |
| I_6. | `acct_id`	|I|	Integer	|Y|	Account ID – must already exist |
| I_7. | `item_set`	|I|	Char(20) |N|	Team-defined identifier for specifying which events are to display on the account <br/>Default:  INET_SOLD |
| I_8. | `forwarding_event_selector`	|I|	Char(20) |N|	Event Selector of events that are valid for forwarding <br /> Default:  INET_FORWARD |
| I_9. | `resale_event_selector`	|I|	Char(20) |N|	Event Selector of events that are valid for resale <br />Default:  INET_RESALE |
| I_10. | `add_credit_event_selector`	|I|	Char(20) |N|	Event Selector of events that are valid for adding credit to the tickets <br />Default:  INET_ADD_VALUE |
| I_11. | `print_event_selector`	|I|	Char(20) |N|	Event Selector of events that are valid for printing.  This includes printing to TicketFast, and also transferring to a card. <br /> Default:  INET_PRINT |
| I_12. | `prev_event_name	`|I|	Char(8) |N|	The last event name retrieved on the previous SP call.  This allows the API to be called in a loop and return all events. <br />Use spaces (or NULL) on the 1st call (to get the 1st event)|
| I_13. | `prev_section_name`	|I|	Char(6) |N|	The last section name retrieved on the previous API call. |
| I_14. | `prev_row_name	`|I|	Char(4) |N|	The last row name retrieved on the previous API call.|
| I_15. | `prev_seatnum	`|I|	Integer |N|	The last seat number retrieved on the previous  API call. |
| I_16. | `count	`|I|	Integer |N|	Number of records to be returned by the API call. Limits the number of details to be returned |
| I_17. | `status_filter	`|I|	Char(1) |N|	Filters the records to be returned by seat "status". If status_filter is N then printcount should be 0 and InetDeliveryMethod should be 'TF' for the records to be returned. If no status_filter is passed, it takes a default value of 'A' <br />`A` – All records (default) <br />`N` – Unprinted tickets only <br />`Others` – TBD |
|       |	`event_filter`	| |   Array[ |N|	Array of event_filter |
| I_18. | `event_filter`	|I|	Char(8) |N|	Events that are desired to be returned.  This filters the results down to these events only. |
|||| ] |||
| I_19. | `amclient_id	`|I|	Char(24) |N|	AccountManager client ID (aka Team ID) |
| I_20. | `club_group_event_selector	`|I|	Char(20) |N|	Event Selector of events that are open for Club (Student) Group signup <br />Default:  INET_CLUB_GROUP |
|| `section_filter`	| |	Array[ |N|	Array of section_filter |
| I_21. | `section_filter	`|I|	Char(6) |N|	Sections that are desired to be returned. This filters the results down to these sections only.|
|||| ] |||
||	`row_filter`	    ||	Array[ |N|	Array of row_filter |
| I_22. | `row_filter	`|I| 	Char(4) |N|	Rows that are desired to be returned. This filters the results down to these rows only. |
|||| ] |||
||	`seat_num_filter`	||	Array[ |N|	Array of seat_num_filter |
| I_23. | `seat_num_filter	`|I|	Integer |N|	Seat_num that are desired to be returned. This filters the results down to blocks that CONTAIN these seat_nums only; i.e.:"seat_num" does not mean "first_seat", but rather an atomic seat that is included in the block. |
|||| ] |||
||	`action _filter`	||	Array[ |N|	Array of action _filter |
| I_24. | `action_filter	`|I|	Char(1) |N|	(List of) actions: <br/>`F`orward/transfer allowed<br/>`R`esale allowed<br/>`P`rint To TF allowed<br/>`A`dded Credit allowed transfer to `C`ard/PID allowed<br/>`E`xchange Allowed<br/> NULL/<blank> - All actions (default) |
|||| ] |||
| I_25. | `start_date	`|I|	Date |N|	Start date (event must begin on or after this date) |
| I_26. | `end_date	`|I|	Date |N|	End date (event must end on or before this date) |
| O_1. | `result	`|O|	Integer |	|	Return Code <br/>`0` - OK. <br/>`5061` - Required input value not supplied <br/>`5069` - No blocks found |
| O_2. | `sql_code	`|O|	Integer ||		Result (SQL return code) |
| O_3. | `error_desc	`|O|	Varchar(250)	||	Error Description |
| O_4. | `count	`|O|	Integer ||		Counter |
|| Array of Seats		|| Array [		|| Outer array (level 1) |
| O_5. | `event_name	`|O|	Char(8)	||	Event Name |
| O_6. | `add_date_time	`|O|	datetime		||Event purchase date/time |
| O_7. | `section_name	`|O|	Char(6)		||Section Name |
| O_8. | `row_name	`|O|	Char(4)	||	Row Name |
| O_9. | `seat_num	`|O|	Integer ||		Starting seat number |
| O_10. | `num_seat	`|O|	Integer ||		Number of seats in this block |
| O_11. | `last_seat	`|O|	Integer ||		Ending seat number |
| O_12. | `seat_increment	`|O|	Integer ||		Seat Increment|
| O_13. | `price_code	`|O|	Char(3)	||	Price Code |
| O_14. | `full_price	`|O|	Dec(12,2)	||	Full Price, no discounts or surcharges (per seat) |
| O_15. | `block_full_price	`|O|	Dec(12,2)	||	Full Price (whole block) |
| O_16. | `purchase_price	`|O|	Dec(12,2)	||	Purchase Price (per seat) |
| O_17. | `block_purchase_price	`|O|	Dec(12,2)	||	Purchase Price (whole block) |
| O_18. | `section_type	`|O|	Char(1)	||	Section Type – Indicates if the section is a suite <br/>`N` = Standard <br/>`S` = Suite <br/>`C` = Club |
| O_19. | `seat_type	`|O|	Char(1)		|| Seat Type - Indicates if the seat is a "Suite Additional" seat (e.g. Standing Room Only) <br/>`N` – Standard Seat <br/>`S` – Standing Room Only <br/>`G` – General Admission Pass (Future Use)|
| O_20. | `seat_status_ind	`|O|	Char(1)	||	Status of the Seat<br/>`A` - Active<br/>`F` – Tickets have been forwarded<br/>`I` – Invitation for web pickup<br/>`Q` - Tickets are Posted for resale (exchange)<br/>`R` – Tickets have been resold (exchange)<br/>`C` - Tickets have been transferred to a card<br/>`S` - Tickets have added credit and export file has already been sent/generated<br/>`T` – Tickets have been reassigned to another account via secondary market.<br/>`G` – Club (Student) Group joined<br/>`H` – Tickets have been forwarded to a charity<br/>`L` – Tickets are Locked, no action allowed (Forced PID or Forced WC)<br/>`P` - Tickets are pending, no action allowed |
| O_21. | `forwarding_allowed_ind	`|O|	Char(1)	||	Can this ticket be forwarded? <br/>`0` – Yes.  Ticket can be forwarded (No charge); Account has free forwarding privilege<br/>`1` – Yes.  Ticket can  be forwarded (No charge); Account gets for free, but client will get charged (via reconciliation)<br/>`3` – No.  Tickets for sale on 3rd party site<br/>`B` 	– No. Event is NOT barcoded<br/>`D` 	– No. Event Date has past or time too close<br/>`E` – No. Event is NOT in the Event Selector; Not allowed by the client<br/>`F` – No. Tickets have already been forwarded<br/>`G` – No.  Club (Student) Group joined<br/>`H` – No.  Tickets have been forwarded to charity<br/>`L` – Tickets are Locked, no action allowed (Forced PID or Forced WC)<br/>`N` – No.  Product is not enabled<br/>`P` – No. Tickets are not fully paid<br/>`Q`	– Tickets are Posted for resale (exchange)<br/>`R` 	– No. Tickets have been resold<br/>`S` – No. Block has added credit and export file has already been sent<br/>`V` – No - Non expandable plan<br/>`X`	– No. Customer is restricted<br/>`Y` 	– Yes, ticket can be forwarded<br/>`Z` – Yes. Ticket can be forwarded (No charge); Event has no forwarding fees |
| O_22. | `resale_allowed_ind	`     |O|	Char(1)	||	Can this ticket be resold to another buyer.<br/>`$` 	– No. Comp tickets cannot be resold<br/>`0` (zero) – No.  Tickets have not been printed (Applicable to ResaleSystem "SH")<br/>`3` – No.  Tickets for sale on 3rd party site<br/>`A` – No.  Tickets have Added Credit assigned<br/>`B`	– No. Event is NOT barcoded<br/>`C` – No. Price Code is not allowed for Resale<br/>`D` 	– No. Event Date has past or time too close<br/>`E` 	– No. Event is NOT in the Event Selector; (Not allowed by the client)<br/>`F` 	– No. Tickets have already been forwarded<br/>`G` – No.  Club (Student) Group joined<br/>`H` – No.  Tickets have been forwarded to charity<br/>`L` – Tickets are Locked, no action allowed; (Forced PID or Forced WC)<br/>`N` – No.  Product is not enabled<br/>`P` 	– No. Tickets are not fully paid<br/>`Q`	–  Tickets are Posted for resale (exchange)<br/>`R` 	– No. Tickets have been resold<br/>`V` –  No - Non expandable plan<br/>`X` 	– No. Customer is restricted<br/>`Y` 	– Yes, ticket eligible for resale |
| O_23. | `print_to_tf_allowed_ind	`|O|	Char(1)	||	Can this ticket be Printed to TicketFast?<br/>`0` (zero)  – No.  At least one seat has NOT been printed, and "1st-time print from AM" is not allowed (system setting).<br/>`3` – No.  Tickets for sale on 3rd party site<br/>`B` 	– No. Event is NOT barcoded<br/>`C`	- No.	Tickets have been transferred to a card<br/>`D` 	– No. Event Date has past or time too close<br/>`E` 	– No. Event is NOT in the Event Selector; (Not allowed by the client)<br/>`F` 	– No. Tickets have already been forwarded<br/>`G` – No.  Club (Student) Group joined<br/>`H` – No.  Tickets have been forwarded to charity<br/>`J` – No. Delivery method NOT enabled in atleast one of the Buy flows: INET_BUY, INET_EXCHANGE, INET_UPGRADE, and any other INET_% (sell location)<br/>`L` – Tickets are Locked, no action allowed (Forced PID or Forced WC)<br/>`N` – No.  Product is not enabled<br/>`P` 	– No. Tickets are not fully paid<br/>`Q`	– Tickets are Posted for resale (exchange)<br/>`R` 	– No. Tickets have been resold<br/>`S` – No. Block has added credit and export file has already been sent<br/>`U`	- No.  Seats have already been printed (by AM or other "user"), and number of AM reprints will exceed AM reprint limit<br/>`V` – No - Non expandable plan<br/>`X` 	– No. Customer is restricted<br/>`Y` 	– Yes, ticket can be printed as TF tickets<br/>`Z` – Yes, ticket can be printed.  Do not apply fees.|
| O_24. | `transfer_to_card_allowed_ind	`|O|	Char(1)	||	Can this ticket be Transferred to Card (or PID)?<br/>`Y`   - Yes. ticket eligible for printing<br/>`D`   - No. Event Date has past or time too close<br/>`B`   - No. Event is NOT barcoded<br/>`E`   - No. Event is NOT in the Event Selector (Not allowed by the client)<br/>`P`   - No. Tickets are not fully paid<br/>`X`   - No. Customer is restricted<br/>`F`   - No. Tickets has already been forwarded<br/>`R`   - No. Tickets has been resold<br/>`S`   - No. Block has added credit and export file has already been sent<br/>`C`   - No. Tickets has been transfered to a card<br/>`N`   - No. Event/Event does not allow PID cards<br/>`3`  – No.  Tickets for sale on 3rd party site<br/>`G`  – No.  Club (Student) Group joined<br/>`H`  – No.  Tickets have been forwarded to charity<br/>`L`  – Tickets are Locked, no action allowed (Forced PID or Forced WC)<br/>`Q`  - Tickets are Posted for resale (exchange)<br/>`J`  - No. Delivery method NOT enabled in atleast one of the Buy flows: INET_BUY, INET_EXCHANGE, INET_UPGRADE, and any other INET_% (sell location)<br/>`V`  - No - Non expandable plan |
||	`array of attended` (attended_seats)	||	Array [	||	Inner array (level 2) |
| O_25. | `attended_seat	`|O|	varchar(250)	||	seat numbers that attended the game.|
|||| ] ||		** End of "Attended_Seat" (level 2) array **|
| O_26. | `master_event_name	`|O|	char(8)	||	The master event for this event.|
| O_27. | `email_addr	`|O|	char(100)	||	Email address of recipient account|
| O_28. | `market_ind	`|O|	char(1)	||	Indicator if this ticket is a primary market ticket or secondary market<br/>`P` (default) – Primary market ticket<br/>`S` – Secondary market ticket<br/>`H` - Retail ticket (Host) |
| O_29. | `plan_name	`|O|	char(8)	||	If seats are purchased as part of a plan, this is the plan name, otherwise null |
| O_30. | `purchase_date	`|O|	Date	||	Date when ticket(s) were purchased on the primary market OR received on the secondary market |
| O_31. | `exchange_allowed_ind	`|O| 	char(1)		|| Can this seat be exchanged?<br/>`0` – Yes.  Ticket can be exchanged (No charge); Account has free exchange privilege<br/>`1` -  Yes.  Ticket can  be exchanged (No charge); Account gets for free, but client will get charged (via reconciliation)<br/>`3` – No.  Tickets for sale on 3rd party site<br/>`B` 	– No. Event is NOT barcoded<br/>`D` 	– No. Event Date has past or time too close<br/>`E` 	– No. Event’s exchange_price_opt flag is set to ‘N’ (Not allowed by the client)<br/>`F` 	– No. Tickets have already been forwarded<br/>`G` – No.  Club (Student) Group joined<br/>`H` – No.  Tickets have been forwarded to charity<br/>`L` – Tickets are Locked, no action allowed (Forced PID or Forced WC)<br/>`N` – No.  Product is not enabled<br/>`P` 	– No. Tickets are not fully paid<br/>`Q` - Tickets are Posted for resale (exchange)<br/>`R` 	– No. Tickets have been resold<br/>`S` – No. Block has added credit and export file has already been sent<br/>`X` 	– No. Customer is restricted<br/>`Y` 	– Yes, ticket can be exchanged |
| O_32. | `ticket_type_code	`|O|	char(3)		|| Ticket Type |
||	Array of `atomic_seats` (atomic_seats)	|| Array [	||	Inner array (level 2)(each atomic seat corresponding value will be delim. by ^) |
| O_33. | `atomic_seat	`|O|	varchar(100)	||	Seat number |
| O_34. | `barcode	`|O|	char(20)	||	The barcode for each ticket. Only provided if tickets are eligible for Resale or Transfer <br/>To clarify,  barcode is not returned if it's anything other than resale or forward ('Y','Q') |
| O_35. | `ticket_status	`|O|	char(2)	||	Current Status of Atomic Seat <br/>`XX` – Action Required<br/>`PB` – Printed by Box Office<br/>`PI` – Printed Online<br/>`PC` – Printed by Customer Service<br/>`PP` – Paperless Ticket WC – Will Call Pick up<br/>`FP` – Forced Paperless Ticket<br/>`FW` – Forced Will Call Pick-up<br/>`WC` – Will Call Pick-up (not forced - cosumer's desire)<br/>`VM` - Viewed on Mobile<br/>`NA` – No longer on Account |
| O_36. | `status_seat_num	`|O|	integer	||	Atomic Seat Number |
| O_37. | `status_date_time	`|O|	DateTime	||	DateTime of last action that determined current status Format: `yyyy-mm-dd hh:mm` |
| O_38. | `status_pid_display	`|O|	char(20)	||	Display value of PID that is assigned to the paperless ticket. Applies to TicketStatus of PP, FP. Value displayed is the `t_personal_id.pid_mask` for the given `pid_id` |
| O_39. | `status_add_credit_amount	`|O|	decimal(10,2)	||	Amount of Credit on Ticket.<br/>Note that this is an additional Status. A value provided here means that the ticket has Credit Added/Stored Value in addition to another Status. |
| O_40. | `history_confirmation	`|O|	varchar(16)	||	Confirmation Number of Transaction. Not all transactions have a confirmation number. |
|||| ] ||		** End of "atomic_seats"  (level 2) array **|
| O_41. | `view_mobile_allowed_ind	`|O|	char(1)	||	Can this seat be viewed on Mobile device?<br/>`B` - No. Event is NOT barcoded<br/>`D` - No. Event Date has past or time too close<br/>`F` - No. Tickets has already been forwarded<br/>`G` – No.  Club (Student) Group joined<br/>`H` - No. Tickets donated to Charity<br/>`L` – Tickets are Locked, no action allowed (Forced PID or Forced WC)<br/>`N` - No. Event/Event does not allow Send to Mobile<br/>`P` - No. Tickets are not fully paid<br/>`Q` - No. Tickets have are posted for resale (exchange)<br/>`R` - No. Tickets has been resold<br/>`W` - Yes. ticket eligible to be Viewed on Mobile - except for the BARCODE (which should be hidden/replaced by text message)<br/>`X` - No. Customer is restricted<br/>`Y` - Yes. ticket eligible to be Viewed on Mobile |
| O_42. | `gate_exit_portal	`|O|	varchar(120)	||	Gate Exit Portal - used on Mobile Barcode Page  (back view)
| O_43. | `ticket_type_pc	`|O|	varchar(40)	||	Ticket Type / PC - used on Mobile Barcode Page  (back view)
| O_44. | `class_attribute	`|O|	long varchar	||	List of class attribute abbreviations that apply to this block of seats. The attribute descriptions are provided in the System_Options call.|
| O_45. | `event_id	`|O|	integer	 ||	The Season Tix internal id for this event. |
| O_46. | `delayed_delivery	`|O|	char(1)	||	Indicator if this block of seats can be printed at this time.<br/>`Y` – Ticket cannot be printed at this time.<br/>`N` – Ticket can be printed.  Either because it is close enough to the event, or it has special allowance because of a price code or because the consumer has a list code. |
| O_47. | `print_offset_date_time	`|O|	datetime	||	When printing is available for an event.  Only returned if Delayed_Delivery = Y. |
| O_48. | `return_allowed_ind	`|O|	Char(1)	||	Can this ticket be returned by the consumer.<br/>`$` – No. Comp tickets cannot be returned<br/>`3` – No.  Tickets for sale on 3rd party site<br/>`A` – No.  Tickets have Added Credit assigned<br/>`C` – No. Price Code is not allowed for Consumer Return<br/>`D` – No. Event Date has past passed or time too close<br/>`E` – No. Event is NOT in the Event Selector; (Not allowed by the client)<br/>`F` – No. Tickets have already been forwarded<br/>`G` – No.  Club (Student) Group joined<br/>`H` – No.  Tickets have been forwarded to charity<br/>`L` – Tickets are Locked, no action allowed (Forced PID or Forced WC)<br/>`N` – No.  Product is not enabled<br/>`Q` – Tickets are Posted for resale (exchange)<br/>`R` – No. Tickets have been resold<br/>`V` – No - Non expandable plan<br/>`X` – No. Customer is restricted<br/>`Y` – Yes, ticket eligible for consumer return |
| O_49. | `return_price_value	`|O|	Decimal(12,2)	||	The value, per seat, that the consumer will get back if their ticket is returned. |
| O_50. | `user_flag	`|O|	Char(1)		|| `Y`– Yes, ticket block was purchased by a proprietary purchasing system <br/>`N` – No.  Ticket block was purchased by a standard purchase process.|
|||| ] ||	** End of "Seats" (level 1) array **|


### Sample request:

{% highlight http %}
POST /url HTTP/1.1
Content-Type: application/json;

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

### Sample Response [no seats/blocks for this account]:

{% highlight http %}
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "command1": {
    "error_desc": "No blocks found",
    "result": 5069,
    "cmd": "seats_sold",
    "sql_code": 100
  },
  "header": {
    "src_sys_type": 2,
    "archtics_version": "V999",
    "ver": 1,
    "src_sys_name": "testing",
    "ats_version": "4.23.3",
    "result": 0
  }
}
{% endhighlight %}

### Sample Response [seats for 2 separate events]:
{% highlight http %}
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "command1": {
    "seats_array": [
      {
        "user_flag": "N",
        "seat_increment": 1,
        "delayed_delivery": "N",
        "transfer_to_card_allowed_ind": "N",
        "view_mobile_allowed_ind": "N",
        "num_seat": 4,
        "ticket_type_code": "_A",
        "ticket_type_pc": "Adult / 1",
        "seat_num": 1,
        "seat_status_ind": "A",
        "section_name": "101",
        "return_allowed_ind": "N",
        "purchase_price": 99.0,
        "block_full_price": 396.0,
        "exchange_allowed_ind": "N",
        "section_type": "N",
        "block_purchase_price": 396.0,
        "print_to_tf_allowed_ind": "N",
        "event_id": 1,
        "seat_type": "N",
        "full_price": 99.0,
        "event_name": "EVENT01",
        "resale_allowed_ind": "N",
        "market_ind": "P",
        "purchase_date": "2016-04-11",
        "atomic_seats": [
          {
            "atomic_seat": "1"
          },
          {
            "atomic_seat": "2"
          },
          {
            "atomic_seat": "3"
          },
          {
            "atomic_seat": "4"
          }
        ],
        "last_seat": 4,
        "price_code": "1",
        "master_event_name": "EVENT01",
        "forwarding_allowed_ind": "N",
        "row_name": "J",
        "add_date_time": "2016-04-11 09:56"
      },
      {
        "user_flag": "N",
        "seat_increment": 1,
        "delayed_delivery": "N",
        "transfer_to_card_allowed_ind": "N",
        "view_mobile_allowed_ind": "N",
        "num_seat": 2,
        "ticket_type_code": "_A",
        "ticket_type_pc": "Adult / 4",
        "seat_num": 1,
        "seat_status_ind": "A",
        "section_name": "222",
        "return_allowed_ind": "N",
        "purchase_price": 66.0,
        "block_full_price": 132.0,
        "exchange_allowed_ind": "N",
        "section_type": "N",
        "block_purchase_price": 132.0,
        "print_to_tf_allowed_ind": "N",
        "event_id": 2,
        "seat_type": "N",
        "full_price": 66.0,
        "event_name": "EVENT02",
        "resale_allowed_ind": "N",
        "market_ind": "P",
        "purchase_date": "2016-04-13",
        "atomic_seats": [
          {
            "atomic_seat": "1"
          },
          {
            "atomic_seat": "2"
          }
        ],
        "last_seat": 2,
        "price_code": "4",
        "master_event_name": "EVENT02",
        "forwarding_allowed_ind": "N",
        "row_name": "7",
        "add_date_time": "2016-04-13 08:13"
      }
    ],
    "result": 0,
    "Count": 2,
    "cmd": "seats_sold",
    "sql_code": 0
  },
  "header": {
    "src_sys_type": 2,
    "archtics_version": "V999",
    "ver": 1,
    "src_sys_name": "testing",
    "ats_version": "4.23.3",
    "result": 0
  }
}
{% endhighlight %}

### Sample request/response  [with event Filters, looking for seats for a single event];

>[Request](#req)
>[Response](#res)
{: .reqres}

{% highlight http %}
POST /url HTTP/1.1
Content-Type: application/json;

{
  "header": {
    "ver": 1,
    "src_sys_type": 2,
    "src_sys_name": "testing",
    "archtics_version": "V999"
  },
  "command1": {
    "cmd": "seats_sold",
    "uid": "user99",
    "dsn": "apigee",
    "event_filter": [
      {
        "event_filter": "event02"
      }
    ],
    "acct_id": 100479
  }
}
{% endhighlight %}

{% highlight http %}
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "command1": {
    "seats_array": [
      {
        "user_flag": "N",
        "seat_increment": 1,
        "delayed_delivery": "N",
        "transfer_to_card_allowed_ind": "N",
        "view_mobile_allowed_ind": "N",
        "num_seat": 2,
        "ticket_type_code": "_A",
        "ticket_type_pc": "Adult / 4",
        "seat_num": 1,
        "seat_status_ind": "A",
        "section_name": "222",
        "return_allowed_ind": "N",
        "purchase_price": 66.0,
        "block_full_price": 132.0,
        "exchange_allowed_ind": "N",
        "section_type": "N",
        "block_purchase_price": 132.0,
        "print_to_tf_allowed_ind": "N",
        "event_id": 2,
        "seat_type": "N",
        "full_price": 66.0,
        "event_name": "EVENT02",
        "resale_allowed_ind": "N",
        "market_ind": "P",
        "purchase_date": "2016-04-13",
        "atomic_seats": [
          {
            "atomic_seat": "1"
          },
          {
            "atomic_seat": "2"
          }
        ],
        "last_seat": 2,
        "price_code": "4",
        "master_event_name": "EVENT02",
        "forwarding_allowed_ind": "N",
        "row_name": "7",
        "add_date_time": "2016-04-13 08:13"
      }
    ],
    "result": 0,
    "Count": 1,
    "cmd": "seats_sold",
    "sql_code": 0
  },
  "header": {
    "src_sys_type": 2,
    "archtics_version": "V999",
    "ver": 1,
    "src_sys_name": "testing",
    "ats_version": "4.23.3",
    "result": 0
  }
}
{% endhighlight %}
