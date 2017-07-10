Meta:
@regression-site

Narrative:
As a test engineer
I want to test Ticket Master Developer's site
So that I test API Explorer Page V2 of Ticket Master Developer's site

Scenario: (/api-explorer/v2) Verification for general page's elements
Meta: @smoke
Given open API Explorer V2 page
Then check general page elements for API Explorer V2 Page, where DISQUS = true and LeftMenu = false

Scenario: TKMDPA-5334 (Open Graph Support) [1.1.51 Verify tags are present in source code]
Meta:
@issue #TKMDPA-5334
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

Scenario: TKMDPA-5346 (The parameters section is opened) [5.2.2 API Explorer V2 : The parameters section is opened]
Meta:
@issues #TKMDPA-5346
Given open API Explorer V2 page
When I choose <apiGetMethod> to send request
And click GET button
Then the parameters section is opened
And error notification is shown on required fields
Examples:
|apiGetMethod              |
|Get Event Details         |
|Get Event Images          |
|Get Attraction Details    |
|Get Classification Details|
|Get Venue Details         |

Scenario: TKMDPA-5351 (The request list contains url and block) [5.2.3 API Explorer V2 : The request list contains url and block]
Meta:
@issues #TKMDPA-5351
Given open API Explorer V2 page
When I choose <apiGetMethod> to send request
And click GET button
Then the request list contains url
And the request list contains response block
Examples:
|apiGetMethod             |
|Event Search             |
|Attraction Search        |
|Classification Search    |
|Venue Search             |



