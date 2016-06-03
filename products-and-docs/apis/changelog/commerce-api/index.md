---
categories:
- documentation
- changelog
- releaseNotes
- commerce
title: Release notes Commerce API
release_date: "2015-02-27"
---

{: .lead}
Multiple sign-based sort order. No sign - ascending, minus sign - descending. Example: 'sort=displayName,-status'

{: .nested-list}
- ### Commerce API
  + ##### General model
    * Multiple sign-based sort order. No sign - ascending, minus sign - descending. Example: 'sort=displayName,-status'
  + ##### Event model
    * Removing **"dates.displayOptions.range"** in favor of using **"dates.start"** and "dates.end".
    * **"dates.status"** changed to **"dates.status.code"**.
    * Adding the new status **"onsale"** and **"offsale"** instead of **"active"**.
