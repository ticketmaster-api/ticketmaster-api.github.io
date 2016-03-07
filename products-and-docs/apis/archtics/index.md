---
layout: documentation
categories:
- documentation
- archtics
title: Archtics API
excerpt: The Ticketmaster Archtics API
keywords: Archtics API
---

{: .article}
# Archtics API

Archtics Ticketing Service (ATS) API Specification
{: .lead}

## Overview
{: #overview }
API Specification for add/update and receive an Archtics account, or add a name to an existing Archtics account

## Customer Add
{: #customer-add }

**Purpose:** This API call will add an Archtics account, or add a name to an existing Archtics account.    

**Cache:** No.

**USE:** This API call can be used to add customer accounts to the Archtics database 

### NOTES:

+	If `acct_id` is NOT provided, a new customer account will be created. If `acct_id` is provided, and that `acct_id` already exists on the database, the new customer name is added to the existing account.
    *	The *Customer_Add* command creates both an `ACCOUNT` and a `NAME` record in Archtics.  The `NAME` (represented by the email address) is the primary name on the newly created account. 
+	If a unique email address is provided, a new customer account will be created. If an email address already exists on the database, the customer record will NOT be added. The API call will return the `acct_id` and `cust_name_id` of the record on file.
    *	You can use the `customer_add` call to add a `NAME` to an existing `ACCOUNT` – see the comments on the `acct_id` input parameter (“`acct_id` is NOT required on *Customer_Add.* If `acct_id` is provided, and that `acct_id` already exists on the database, the new customer name is added to the existing account.”)
+	`last_name` is required for a personal account (`name_type` = 'I'), and `company_name` is required for a company account (`name_type` = 'C').

### Web Page from public internet (caller must use a TM-issued client-side certificate):

`https://ws.ticketmaster.com/archtics/ats/ticketing_services.aspx?dsn={TBD}`

`{TBD}` = client DSN; will vary for each client.

### Web Page from client's network:

`https://{IP address}:5002/ats/ticketing_services.aspx`

`{IP address}` - may use machine name instead of IP address.

### Requirements:
See required input parameters below.
    
### Frequency of operation:
This API call can be made as needed to add customer account to the database. 
    
### Incremental or Comprehensive Data:
not available
    
### Data Delivery:
+	Data content: the API will return information in results for errors or a successful addition. 
+	Approximate size of a single `record`: up to 120 characters
+	Retrieve the next `batch` of records:  n/a 
+	`last record` indicator: n/a
+	Request for previously received data:  n/a 
+	Duplicate data: the calling system is responsible for de-duplicating data.
+	Time zone: n/a 

### Error Messages:
See error messages in the output section.

### Input and Output Parameter Details:

|Parm#	| Parameter Name	     |I/O	   |Data Type  |	Reqd	| Description|
|:------|:---------------------|:-----:|:----------|:------:|:-----------|
|I_1.		|`Cmd`	    |I	  |Char(32)	|Y	|Always "customer_add"|
|I_2.		|`Ref`	    |I	  |Char(32)	|N	|Reference attribute; echoed to result|
|I_3.		|`Uid`	    |I	  |Char(12)	|Y	|User ID (used on connection to DB). Uid will be provided by TM|
|I_4.		|`pwd`	    |I	  |Char(36)	|N	|If password is passed, it will be enforced.|
|I_5.		|`Dsn`	    |I	  |Char(32)	|Y	|Data Source Name (e.g. DB) to connect to|
|I_6.		|`Site_name`	|I	|Char (24)	|N	|Identifies the web-site the consumer is logging in from|
|	| `customer`	|I|	Structure {	|Y|	Structure of  "customer" data |
|I_7.		|`acct_id`		||Integer	|N/Y	|Account ID; acct_id is NOT required on Customer_Add, but if acct_id is provided, the new customer data is added to the existing account, as a new customer name record. |
|I_8.		|`name_first`	||	Char(40)	|N	|First Name |
|I_9.		|`name_mi`		||Char(40	|N	|Middle Initial |
|I_10.		|`name_last`	||	Char(80)	|Y/N	|Last Name.  Either Last Name or Company Name are required, depending on the value for name_type. |
|I_11.		|`title`		||Char(30)	|N	|Title |
|I_12.		|`company_name`		||Varchar(100)	|N/Y	|Company Name |
|I_13.		|`street_addr_1`		||Char(40)	|N	|Street Address – line 1 |
|I_14.		|`street_addr_2`		||Char(40)	|N	|Street Address – line 2 |
|I_15.		|`city`		||Char(20)	|N	|City |
|I_16.	|	`state`		||Char(2)	|N	|State |
|I_17.	|	`zip`		||Char(10)	|N	|Zip Code |
|I_18.	|	`country`		||Char(8)	|N	|Country |
|I_19.	|	`phone_day`		||Char(15)	|N	|Phone Number – daytime(not formatted – strip all spaces, dashes, parens, etc.)|
|I_20.		|`phone_eve`		||Char(15)	|N	|Phone Number – evening |
|I_21.		|`phone_fax`		||Char(10)	|N	|Phone Number – FAX |
|I_22.	|	`phone_cell`		||Char(15)	|N	|Phone Number – Cell |
|I_23.	|	`phone_alt1`		||Char(15)	|N	|Phone Number – alternate 1 |
|I_24.	|	`phone_alt2`		||Char(15)	|N	|Phone Number – alternate 2 |
|I_25.	|	`email`		||Char(100)	|N	|E-mail address|
|I_26.	|	`birth_date`		||Date	|N	|Birth date|
|I_27.	|	`gender`		||Char(1)	|N	|Gender (Male, Female)|
|I_28.	|	`ext_system_id_1` 		||Char(10)	|N	|ID for linkage to an external system (1 of 2).|  
|I_29.	|	`ext_system_id_2`		||Char(10)	|N	|ID for linkage to an external system (2 of 2)|
|I_30.	|	`email_optout`		||Boolean	|N	|Option to not receive email from client (1 = Opt Out)|
|I_31.	|	`email_deliv_opt`		||Char(1)	|N	|Option to how to get email delivered <br/> H – HTML <br/> T - Text|
|I_32.	|	`text_on_mobile_phone`		||Boolean|	N|	Does this consumer allow text messages to be sent to their mobile phone? (0 = No, 1 = Yes)|
|I_33.	|	`name_type`         ||Char(1) |N|	Is name an "I"ndividual or a "C"ompany ** not allowed on customer_update.|
|I_34.	|	`acct_access_level`  ||Char(1)	|N	|AccountManager Access Level: "F" is full, "R" is restricted., other values TBD.  Defaults to "F"|
|I_35.	|	`Array of alternate IDs`|| 		{	||	Alt_id_array|
|I_36.	|	`alt_id_type`	||Char(6)	|N	|Name of alternate ID|
|I_37.	|	`alt_id`		||Varchar(50)	|N	|Value of alternate ID|
|I_38.	|	`alt_id_comment`		||Varchar(100)	|N|	Comment associated with alternate ID|
|I_39.	|	`alt_id_action`		||Char(1)	|N  |	Only applies to Customer_Update ‘A’ to add the alt_id (default)‘D’ to delete an existing alt_id |
|       |                 |         |	} ||** end of "alternate IDs ** (alt_id_array)|
|	      |                 |         |	}	||** End of  "customer" structure ** |
|I_40.		|`Pin`	|I|	Char(250)	|Y|	Personal Identification Number (e.g. password) |
|I_41.		|`Other_info_1`	|I|	Char(100)	|N|	acct level free form information |
|I_42.		|`Other_info_2`	|I|	Char(100)	|N|	acct level free form information |
|I_43.		|`Other_info_3`	|I|	Char(100)	|N|	acct level free form information |
|I_44.		|`Other_info_4`	|I|	Char(100)	|N|	acct level free form information |
|I_45.		|`Other_info_5`	|I|	Char(100)	|N|	acct level free form information |
|I_46.		|`Other_info_6`	|I|	Char(100)	|N|	acct level free form information |
|I_47.		|`Other_info_7`	|I|	Char(100)	|N|	acct level free form information |
|I_48.		|`Other_info_8`	|I|	Char(100)	|N|	acct level free form information |
|I_49.		|`Other_info_9`	|I|	Char(100)	|N|	acct level free form information |
|I_50.		|`Other_info_10`	|I|	Char(100)	|N|	acct level free form information |
|I_51.		|`Other_info_11`	|I|	Char(100)	|N|	acct level free form information |
|I_52.		|`Other_info_12`	|I|	Char(100)	|N|	acct level free form information |
|I_53.		|`Other_info_13`	|I|	Char(100)	|N|	acct level free form information |
|I_54.		|`Other_info_14`	|I|	Char(100)	|N|	acct level free form information |
|I_55.		|`Other_info_15`	|I|	Char(100)	|N|	acct level free form information |
|I_56.		|`Other_info_16`	|I|	Char(100)	|N|	acct level free form information |
|I_57.		|`Other_info_17`	|I|	Char(100)	|N|	acct level free form information |
|I_58.		|`Other_info_18`	|I|	Char(100)	|N|	acct level free form information |
|I_50.		|`Other_info_19`	|I|	Char(100)	|N|	acct level free form information |
|I_60.		|`Other_info_20`	|I|	Char(100)	|N|	acct level free form information |
|O_1.		|`Ref`	|O|	Char(32)	|N|	Reference attribute; echoed from request |
|O_2.		|`Result`	|O|	Integer	|Y|	Result (return code)<br/> `0` – OK. Customer record added<br/> `5003` – Birth_Date in the future<br/> `5004` – Birth_Date is an invalid date (ex.: Feb/30)<br/> `5011` – Required input field not supplied<br/> `5012` – No more account numbers available<br/> `5013` – Account Representative not valid<br/> `5014` – Invalid input value<br/> `5015` – Email already exists<br/> `5017` – Invalid characters in PIN<br/> `5019` – Invalid Email address<br/> `9999` - Invalid value for input parameter<br/> `11408` – Email address already exists in the system, so no account is created.  The acct_id and cust_name_id in the return show the existing values for that email address.<br/> `11410` – Alt Id Type does not exist in database.<br/> All others – Internal error |
|O_3.		|`Sql_code`	|O|	Integer	|Y|	SQL Return Code |
|O_4.		|`Error_detail`	|O|	Varchar(250)	|N|	English description of any generated errors |
|O_5.		|`Acct_id`	|O|	Integer	|Y|	Account ID – Unique ID generated by system |
|O_6.		|`Cust_name_id`	|O|	Integer	|Y|	Customer ID – Unique ID for each customer. |


### Sample JSON add a new account:

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
    "archtics_version": "V605"
  },
  "command1": {
    "cmd": "Customer_Add",
    "ref": "112233",
    "uid": "USER99",
    "dsn": "db605",
    "site_name": "myweb",
    "customer": {
      "name_last": "Eagleton",
      "email": "eagleton@mailinator.com"
    },
    "pin": "mypin"
  }
}
{% endhighlight %}

{% highlight http %}
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "command1": {
    "ref": "112233",
    "cust_name_id": 5262,
    "result": 0,
    "acct_id": 128802,
    "sql_code": 0,
    "cmd": "Customer_Add"
  },
  "header": {
    "result": 0,
    "src_sys_type": 2,
    "src_sys_name": "testing",
    "archtics_version": "V602",
    "ver": 1
  }
}
{% endhighlight %}


### Sample JSON add a new name to an existing account:

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
    "archtics_version": "V605"
  },
  "command1": {
    "cmd": "Customer_Add",
    "uid": "USER99",
    "dsn": "db605",
    "customer": {
      "acct_id": 128802,
      "name_last": "Brown",
      "name_first": "Sally",
      "email": "sally@mailinator.com"
    },
    "pin": "1234"
  }
}
{% endhighlight %}

{% highlight http %}
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "command1": {
    "acct_id": 128802,
    "cust_name_id": 5501,
    "result": 0,
    "cmd": "Customer_Add",
    "sql_code": 0
  },
  "header": {
    "src_sys_name": "testing",
    "ver": 1,
    "archtics_version": "V605",
    "result": 0,
    "src_sys_type": 2
  }
}

{% endhighlight %}


### Sample JSON attempt to add customer record with the same email address:

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
    "archtics_version": "V605"
  },
  "command1": {
    "cmd": "Customer_Add",
    "uid": "user99",
    "dsn": " db605",
    "customer": {
      "name_last": "Eagleton",
      "name_first": "Thomas",
      "email": "eagleton@mailinator.com"
    },
    "pin": "mypin"
  }
}
{% endhighlight %}

{% highlight http %}
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "command1": {
    "cmd": "Customer_Add",
    "error_detail": "Email Already exists in database",
    "result": 11408,
    "cust_name_id": 5502,
    "acct_id": 130854,
    "sql_code": 0
  },
  "header": {
    "src_sys_name": "testing",
    "ver": 1,
    "archtics_version": "V605",
    "result": 0,
    "src_sys_type": 2
  }
}
{% endhighlight %}

{: .article}
## Customer Update
{: #customer-update}

**Purpose:** This API call will update an Archtics account, or add a name to an existing Archtics account.   

**Cache:** No.

**USE:** This API call can be used to update customer accounts in the Archtics database 

### NOTES:
+	Important:  All existing updatable base customer fields with data must be provided to maintain the values.   Not providing the field is the same as providing a blank value.  It is used to clear an existing field.
+	All updates will be made to the primary customer on the account unless `cust_name_id` is specified and different than the primary `cust_name_id`.

### Web Page from public internet (caller must use a TM-issued client-side certificate):
`https://ws.ticketmaster.com/archtics/ats/ticketing_services.aspx?dsn={TBD}`

`{TBD}` = client DSN; will vary for each client.

### Web Page from client's network:
`https://{IP address}:5002/ats/ticketing_services.aspx`

`{IP address}` - may use machine name instead of IP address.

### Requirements:
See required input parameters below.

### Frequency of operation:
This API call can be made as needed to add customer account to the database. 

### Incremental or Comprehensive Data:
not available

### Data Delivery:
+	Data content: the API will return information in results for errors or a successful addition. 
+	Approximate size of a single "record": up to 120 characters
+	Retrieve the next "batch" of records:  n/a 
+	"last record" indicator: n/a
+	Request for previously received data:  n/a 
+	Duplicate data: the calling system is responsible for de-duplicating data.
+	Time zone: n/a 

### Error Messages:
See error messages in the output section.

### Input and Output Parameter Details:

|Parm#	| Parameter Name	     |I/O	   |Data Type  |	Reqd	| Description|
|:------|:---------------------|:-----:|:----------|:------:|:-----------|
|I_1.		|`Cmd`	|I|	Char(32)	|Y|	Always "customer_update" |
|I_2.		|`Ref`	|I|	Char(32)	|N|	Reference attribute; echoed to result |
|I_3.		|`Uid`	|I|	Char(12)	|Y|	User ID (used on connection to DB). <br/> Uid will be provided by TM  |
|I_4.		|`pwd`	|I|	Char(36)	|N|	If password is passed, it will be enforced. |
|I_5.		|`Dsn`	|I|	Char(32)	|Y|	Data Source Name (e.g. DB) to connect to |
|I_6.		|`Site_name`	|I|	Char (24)	|N|	Identifies the web-site the consumer is logging in from |
||	`customer`	||	Structure {	|Y|	Structure of  "customer" data <br/> **Important:**  All exisiting updatable base customer fields with data must be provided to maintain the values.   Not providing the field is the same as providing a blank value.  It is used to clear an existing field.
|I_7.		|`acct_id`    	|I|	Integer	|Y|	Account ID |
|I_8.		|`name_first` 	|I|	Char(40)	|N|	First Name |
|I_9.		|`name_mi`    	|I|	Char(40	|N|	Middle Initial |
|I_10.		|`name_last`	|I|	Char(80)	|Y/N|	Last Name.  Either Last Name or Company Name are required, depending on the value for name_type. |
|I_11.		|`title`     	|I|	Char(30)	|N|	Title |
|I_12.		|`company_name` 	|I|	Varchar(100)	|N/Y|	Company Name |
|I_13.		|`street_addr_1`	|I|	Char(40)	|N|	Street Address – line 1 |
|I_14.		|`street_addr_2`	|I|	Char(40)	|N|	Street Address – line 2 |
|I_15.		|`city`     	|I|	Char(20)	|N|	City |
|I_16.		|`state`    	|I|	Char(2)	|N|	State |
|I_17.		|`zip`      	|I|	Char(10)	|N|	Zip Code |
|I_18.		|`country`  	|I|	Char(8)	|N|	Country |
|I_19.		|`phone_day`	|I|	Char(15)	|N|	Phone Number – daytime <br/> (not formatted – strip all spaces, dashes, parens, etc.) |
|I_20.		|`phone_eve`	|I|	Char(15)	|N|	Phone Number – evening |
|I_21.		|`phone_fax`	|I|	Char(10)	|N|	Phone Number – FAX |
|I_22.		|`phone_cell`	|I|	Char(15)	|N|	Phone Number – Cell |
|I_23.		|`phone_alt1`	|I|	Char(15)	|N|	Phone Number – alternate 1 | 
|I_24.		|`phone_alt2`	|I|	Char(15)	|N|	Phone Number – alternate 2 |
|I_25.		|`email`  	  |I|	Char(100)	|N|	E-mail address |
|I_26.		|`birth_date`	|I|	Date	|N|	Birth date |
|I_27.		|`gender`	|I|	Char(1)	|N|	Gender (Male, Female) |
|I_28.		|`ext_system_id_1` 	|I|	Char(10)	|N|	ID for linkage to an external system (1 of 2) |
|I_29.		|`ext_system_id_2`	|I|	Char(10)	|N|	ID for linkage to an external system (2 of 2) |
|I_30.		|`email_optout`	|I|	Boolean	|N|	Option to not receive email from client (1 = Opt Out) |
|I_31.		|`email_deliv_opt`	|I|	Char(1)	|N|	Option to how to get email delivered <br/> H – HTML <br/> T - Text |
|I_32.		|`text_on_mobile_phone`	|I|	Boolean	|N|	Does this consumer allow text messages to be sent to their mobile phone? (0 = No, 1 = Yes) |
|I_33.		|`name_type`	|I|	Char(1)	|N|	Is name an "I"ndividual or a "C"ompany <br/> ** not allowed on customer_update. |
|I_34.		|`acct_access_level`	|I|	Char(1)	|N|	AccountManager Access Level: "F" is full, "R" is restricted., other values TBD.  Defaults to "F" |
|I_35.		|`cust_name_id`	|I|	Integer	|Y|	ID of the customer name. If cust_name_id is not provided, the primary cust_name_id on the account is updated. |
||	`Array of alternate IDs` 		||{||		Alt_id_array |
|I_36.		|`alt_id_type`	|I|	Char(6)	|N|	Name of alternate ID |
|I_37.		|`alt_id`	|I|	Varchar(50)	|N|	Value of alternate ID |
|I_38.		|`alt_id_comment`	|I|	Varchar(100)	|N|	Comment associated with alternate ID |
|I_39.		|`alt_id_action`	|I|	Char(1)	|N|	Only applies to Customer_Update <br/>‘A’ to add the alt_id (default) <br/> ‘D’ to delete an existing alt_id  |
|     |     || } ||		** end of "alternate IDs ** (alt_id_array)|
|     |     || } ||	** End of  "customer" structure ** |
|I_40.		|`Pin`	|I|	Char(250)	|Y|	Personal Identification Number (e.g. password) |
|I_41.		|`New_pin`	|I|	Char(250)	|N|	New PIN (if changing) |
|I_42.		|`Lock_account`	|I|	Char(1)	|N|	Lock the input account (restrict further access by the consumer) <br/> N – No (default). No (un)locking action performed <br/> L – Lock the input account <br/> U – Unlock the input account <br/>When locking or unlocking an account, the only parameters evaluated are the acct_id and PIN.  All other parms are ignored. |
|I_43.		|`Other_info_1`	|I|	Char(100)	|N|	acct level free form information |
|I_44.		|`Other_info_2`	|I|	Char(100)	|N|	acct level free form information |
|I_45.		|`Other_info_3`	|I|	Char(100)	|N|	acct level free form information |
|I_46.		|`Other_info_4`	|I|	Char(100)	|N|	acct level free form information |
|I_47.		|`Other_info_5`	|I|	Char(100)	|N|	acct level free form information |
|I_48.		|`Other_info_6`	|I|	Char(100)	|N|	acct level free form information |
|I_49.		|`Other_info_7`	|I|	Char(100)	|N|	acct level free form information |
|I_50.		|`Other_info_8`	|I|	Char(100)	|N|	acct level free form information |
|I_51.		|`Other_info_9`	|I|	Char(100)	|N|	acct level free form information |
|I_52.		|`Other_info_10`	|I|	Char(100)	|N|	acct level free form information |
|I_53.		|`Call_reason`	|I|	Char(1)	|N|	A call reason of "S" means that it is a call generated by an external system, rather than the actual consumer.  For this call reason, the PIN is not required.   The consumer pin is also not returned in these cases. |
|I_54.		|`Name_type`	|I|	Char(1)	|N|	I – Individual/Personal (default) <br/> C – Company/Business |
|I_55.		|`Other_info_11`	|I|	Char(100)	|N|	acct level free form information |
|I_56.		|`Other_info_12`	|I|	Char(100)	|N|	acct level free form information |
|I_57.		|`Other_info_13`	|I|	Char(100)	|N|	acct level free form information |
|I_58.		|`Other_info_14`	|I|	Char(100)	|N|	acct level free form information |
|I_59.		|`Other_info_15`	|I|	Char(100)	|N|	acct level free form information |
|I_60.		|`Other_info_16`	|I|	Char(100)	|N|	acct level free form information |
|I_61.		|`Other_info_17`	|I|	Char(100)	|N|	acct level free form information |
|I_62.		|`Other_info_18`	|I|	Char(100)	|N|	acct level free form information |
|I_63.		|`Other_info_19`	|I|	Char(100)	|N|	acct level free form information |
|I_64.		|`Other_info_20`	|I|	Char(100)	|N|	acct level free form information |
|O_1.		|`Ref`	|O|	Char(32)	|N|	Reference attribute; echoed from request |
|O_2.		|`Result`	|O|	Integer	|Y|	Result (return code) <br/> `E-`	– OK. Customer record updated <br/> `5021` – Required input [acct_id] not supplied <br/> `5031` – Required input field not supplied <br/>`5032` – Account does not have a PIN established <br/>`5033` – PIN does not match <br/>`5034` – Account not found <br/>`5036` – Invalid syntax Email <br/> `5037` – Email already in use by another customer <br/> `5038` – Invalid character in (new) PIN <br/> `10729` – alt_id_type not found in database. <br/> All others – Internal error |
|O_3.		|`Sql_code`	|O|	Integer	|Y|	SQL Return Code |
|O_4.		|`Error_detail`	|O|	VarChar(250)	|N|	English description of any generated errors |

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
    "archtics_version": "V612"
  },
  "command1": {
    "cmd": "customer_update",
    "uid": "user01",
    "dsn": "abcdb612",
    "pin": "4444",
    "customer": {
      "acct_id": 4444,
      "name_first": "Neal",
      "name_mi": "Y",
      "name_last": "Peart",
      "title": "Mr.",
      "name_type": "C",
      "company_name": " hantilly",
      "street_addr_1": "2324 rosedown dr.",
      "street_addr_2": "123 main street",
      "city": "Reston",
      "state": "VA",
      "zip": "20151",
      "country": "USA.",
      "phone_day": "7031112222",
      "phone_eve": "7035556666",
      "phone_fax": "7031112000",
      "phone_cell": "5711112222",
      "phone_alt1": "5711111111",
      "phone_alt2": "5712222222",
      "birth_date": "1966-01-01",
      "gender": "F",
      "ext_system_id_1": "1010",
      "ext_system_id_2": "2000",
      "email_optout": 1,
      "email_deliv_opt": "T",
      "text_on_mobile_phone": 1,
      "alt_id_array": [
        {
          "alt_id_type": "MSC",
          "alt_id": "abcdefghijklmn",
          "alt_id_comment": "comment 1",
          "alt_id_action": "A"
        }
      ]
    },
    "other_info_1": "acct info 1",
    "other_info_2": "acct info 2",
    "other_info_3": "acct info 3",
    "other_info_4": "acct info 4",
    "other_info_5": "acct info 5",
    "other_info_6": "acct info 6",
    "other_info_7": "acct info 7",
    "other_info_8": "acct info 8",
    "other_info_9": "acct info 9",
    "other_info_10": "acct info 11",
    "lock_account": "N",
    "call_reason": "S",
    "other_info_11": "acct info 11",
    "other_info_12": "acct info 12",
    "other_info_13": "acct info 13",
    "other_info_14": "acct info 14",
    "other_info_15": "acct info 15",
    "other_info_16": "acct info 16",
    "other_info_17": "acct info 17",
    "other_info_18": "acct info 18",
    "other_info_19": "acct info 19",
    "other_info_20": "acct info 20"
  }
}

{% endhighlight %}

{% highlight http %}
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "command1": {
    "result": 0,
    "cmd": "customer_update",
    "sql_code": 0
  },
  "header": {
    "src_sys_type": 2,
    "archtics_version": "V612",
    "ver": 1,
    "src_sys_name": "testing",
    "ats_version": "4.21.1",
    "result": 0
  }
}
{% endhighlight %}

## Customer Query

**Purpose:**  	Customer query returns basic account and name information based on an input account-id, email address or external-id.   It can also be used to validate a customer’s pin.

**Cache:**	No.  

**Use:** This API call can be used to return customer (name) attributes.  There are several input parameter options:

### NOTES:
When providing email-address:  Based on the name that is associated with the input email address, the attributes of the name returned, along with all accounts linked to the email address and certain account-level information for the main account that the name associated with the email address is primary.

When providing alternate-id:  Based on the name associated with the input external-id, the attributes of the name are returned, along with all accounts linked to the email address and certain account-level information for the account that the name associated with the email address is primary.    Note: the referenced alternate-id (name level) is not to be confused with external-id (account level)

Pin vs system account – When customer query is called with an PIN, the pin must match the pin for the name (if email or alternate-id are provided) or the primary name on the account (if account-id is provided) to successfully return.  This is intended as a means of authenticating the consumer.    

Customer query can also be called with a calling reason of 'S' (system), in which case the pin is not required.    The use case is typically a customer service application, where the calling application has other means of authenticating the consumer.

-	input = `acct_id`
    *	the attributes of the primary name are returned, along with certain account-level attributes (login attempts,rec_status,etc. ).    
    *	No secondary name information is returned.
-	input = email_address
    * the attributes of the name associated with the email address are returned, 
    * a delimited list of each account linked to the email address.
    *	certain account-level information for the account associated where the email address is primary.
-	output = `account_group`
    *	returns an array of account groups that an account belongs to
-	output = `account_id_list`
    *	This is a list of ACCOUNTS to which this NAME (email) is associated.  The first acct_id in that list is always the primary (main) account for that person/name/email.  The order of the remaining account ID’s is in ‘nickname’ order.
	
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
|O_2.		|`result`	|O|	Integer	|Y|	Result (return code) <br/>`0` – OK. Customer record found and returned <br/>`5020` – Account Locked – too many invalid attempts <br/>`5021` – Required input field not supplied <br/>`5022` – Account does not have a PIN established <br/>5023 – PIN does not match <br/>`5024` – Account/Email not found <br/>`10681` – cust_name_id doesn’t exist on acct_id <br/>`10682` – cust_name_id doesn’t match email <br/>`10684` – No record for alt_id <br/>`10685` – Multiple records for alt_id (only value returned is list of acct_ids that alt_id is found on) <br/>`10699` – Temporary Password (PIN), must be updated <br/>`11775` - Email address not in valid state. <br/>All others – Internal error |
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
|||       |}|    |		** end of "Account Group IDs" ** (account_groups)


### Sample JSON Call - using [acct_id]:

{% highlight http %}
POST /url HTTP/1.1
Content-Type: application/json;

{
  "header": {
    "ver": 1,
    "src_sys_type": 2,
    "src_sys_name": "test",
    "archtics_version": "V612"
  },
  "command1": {
    "cmd": "customer_query",
    "ref": "optional-123",
    "uid": "user01",
    "dsn": "dbabc612",
    "site_name": "webtest",
    "acct_id": 12345,
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
    "archtics_version": "V612"
  },
  "command1": {
    "cmd": "customer_query",
    "ref": "optional-123",
    "uid": "user01",
    "dsn": "dbabc612",
    "site_name": "webtest",
    "alt_id": "secondary11",
    "alt_id_type": "OUT",
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
    "archtics_version": "V612"
  },
  "command1": {
    "cmd": "customer_query",
    "ref": "optional-123",
    "uid": "user01",
    "dsn": "dbabc612",
    "site_name": "webtest",
    "acct_id": 6,
    "pin":"712554"
  }
}
{% endhighlight %}

### Sample JSON Call/Response - using [email address]:

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
    "archtics_version": "V612"
  },
  "command1": {
    "cmd": "customer_query",
    "ref": "optional-123",
    "uid": "user99",
    "dsn": "dbtest",
    "site_name": "webtest",
    "email": "doglover@invalid.null",
    "call_reason": "S"
  }
}
{% endhighlight %}

{% highlight http %}
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "cmd": "Customer_Query",
  "ref": "optional-123",
  "account_id_list": "12345",
  "logon_attempts": 0,
  "result": 0,
  "sql_code": 0,
  "change_pin": 0,
  "customer": {
    "acct_id": 12345,
    "title": "Ms.",
    "name_first": "Lisa",
    "name_mi": "Y",
    "name_last": "Smith",
    "email": "doglover@invalid.null",
    "city": "Reston",
    "name_type": "I",
    "gender": "F",
    "add_date": "2010-08-27",
    "email_deliv_opt": "H",
    "zip": "20151",
    "phone_eve": "7035556666",
    "phone_alt1": "5711111111",
    "text_on_mobile_phone": 1,
    "state": "VA",
    "phone_fax": "7031112000",
    "acct_access_level": "F",
    "birth_date": "1966-01-01",
    "phone_cell": "5711112222",
    "alt_id_array": [
      {
        "alt_id_comment": "Comment #1",
        "alt_id_type": "MSCRM",
        "alt_id": "AAAABBBBCCCCDDDD"
      },
      {
        "alt_id_comment": "comment 1",
        "alt_id_type": "MSCRM",
        "alt_id": "abcdefghijklmn"
      },
      {
        "alt_id_comment": "Comment #2",
        "alt_id_type": "MSCRM",
        "alt_id": "EEEEEAAAABBBBCCCCDDDD"
      }
    ],
    "phone_day": "7031112222",
    "company_name": "chantilly",
    "phone_alt2": "5712222222",
    "acct_type": "Personal",
    "owner_name": "Lisa Y. Smith",
    "ext_system_id_2": "2000",
    "country": "USA.",
    "ext_system_id_1": "1010",
    "cust_name_id": "162045",
    "street_addr_2": "123 main street",
    "street_addr_1": "2324 rosedown dr."
  },
  "other_info_8": "acct info 8",
  "other_info_6": "acct info 6",
  "other_info_10": "acct info 11",
  "other_info_2": "acct info 2",
  "other_info_7": "acct info 7",
  "other_info_4": "acct info 4",
  "other_info_5": "acct info 5",
  "other_info_3": "acct info 3",
  "other_info_9": "acct info 9",
  "other_info_1": "acct info 1"
},
"header": {
    "result": 0,
    "src_sys_type": 2,
    "src_sys_name": "test",
    "archtics_version": "V602",
    "ver": 1 
}
{% endhighlight %}