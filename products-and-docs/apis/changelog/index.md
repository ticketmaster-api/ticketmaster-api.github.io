---
layout: documentation-single
categories:
- documentation
- changelog
title: Changelog
excerpt: Changelog
keywords: changelog, API
---


# Changelog

{% capture changelog %}

### 3/01/2016

We’re happy to announce the release of Discovery API v2.0 today! This release has a few major changes, primarily designed to simplify the code and to better support environments.
{: .lead}

{: .nested-list}
- ### Discovery API
    * #### v2
        + ##### General model
          * IDs are now obfuscated.
          * The concept of **"domain" was removed in favor of "locale"**.
          * The concept of **"deviceId"** was removed.
        + ##### Event model
          * Removing **"dates.displayOptions.range"** in favor of using **"dates.start"** and "dates.end".
          * **"dates.status"** changed to **"dates.status.code"**.
          * Adding the new status **"onsale"** and **"offsale"** instead of **"active"**.
          * Categories is now name **"classifications"** to provide more information (Segment, Genre, SubGenre instead of Major/Minor).
          * Moving the classifications from **"_embedded"** at the root level.
          * Adding **"images"**.
          * Field **"promoterId"** is now under **"promoter.id"**
        + ##### Venue model
          * Adding **"address.line2"**.
          * Adding **"country.name"**.
          * Adding **"state.name"**.
          * Field **"marketId"** is now under **"market.id"**.
        + ##### Attractions model
          * Adding **"images"**.
          * Adding **"classifications"**.
    * #### v1
- ### Commerce API
- ### Partner API
- ### Deals API
- ### Publish API
- ### International Discovery API
- ### Interactive Docs
- ### API Explorer

{::comment}
### Discovery API - General model:

* IDs are now obfuscated.
* The concept of **"domain" was removed in favor of "locale"**.
* The concept of **"deviceId"** was removed.

### Discovery API - Event model:

* Removing **"dates.displayOptions.range"** in favor of using **"dates.start"** and "dates.end".
* **"dates.status"** changed to **"dates.status.code"**.
* Adding the new status **"onsale"** and **"offsale"** instead of **"active"**.
* Categories is now name **"classifications"** to provide more information (Segment, Genre, SubGenre instead of Major/Minor).
* Moving the classifications from **"_embedded"** at the root level.
* Adding **"images"**.
* Field **"promoterId"** is now under **"promoter.id"**.

### Discovery API - Venue model:

* Adding **"address.line2"**.
* Adding **"country.name"**.
* Adding **"state.name"**.
* Field **"marketId"** is now under **"market.id"**.

### Discovery API - Attractions model:

* Adding **"images"**.
* Adding **"classifications"**.
{:/comment}
        
{% endcapture %}

<div class="changelog" markdown="1">
{{changelog}}
</div>