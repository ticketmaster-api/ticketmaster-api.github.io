---
categories:
- documentation
- changelog
- releaseNotes
- discovery
title: Release notes Discovery API
date: 3/01/2016
---

{% capture changelog %}

Example: 'sort=displayName,-status'. Multiple sign-based sort order. No sign - ascending, minus sign - descending.
{: .lead}

{: .nested-list}
- ### Discovery API
  - #### 3/01/2016
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

{::comment}
  * ###### v1
- ### Commerce API
- ### Partner API
- ### Deals API
- ### Publish API
- ### International Discovery API
- ### Interactive Docs
- ### API Explorer
{:/comment}

{% endcapture %}

<div class="changelog" markdown="1">
{{changelog}}
</div>