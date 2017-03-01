Meta:

Narrative:
As a test engineer
I want to test Ticket Master Developer's site
So that I test API Explorer Page V2 of Ticket Master Developer's site

Scenario: (/api-explorer/v2) Verification for general page's elements
Given open API Explorer V2 page
Then check general page elements for API Explorer V2 Page, where DISQUS = true and LeftMenu = false

Scenario: (/api-explorer/v2) Open Graph support [1.1.51 Verify tags are present in source code]
Given open API Explorer V2 page
Then check <tag> is present in the source code page
Examples:
|tag            |
|og:title       |
|og:url         |
|og:site_name   |
|og:image       |
|og:image:type  |
|og:image:width |
|og:image:height|

