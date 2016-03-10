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

## 3/01/2016

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

{% endcapture %}

<div class="changelog" markdown="1">
{{changelog}}
</div>