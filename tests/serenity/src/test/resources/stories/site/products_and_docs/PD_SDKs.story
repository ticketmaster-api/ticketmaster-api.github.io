Meta:

Narrative:
As a test enfineer
I want to test Ticket Master Developer's site
So that I test SDKs Page of Ticket Master Developer's site

Scenario: 18_1 (/products-and-docs/sdks/) Verification for general page's elements
Given open SDKs page
Then check general page elements for SDKs Page, where DISQUS = true and LeftMenu = true

Scenario: 18_2 (products-and-docs/sdks/) Verification for all the page's links
Given open SDKs page
When check visibility and click <elementKey> element of SDKs page
Then check that new page opened from SDKs page has <pageURL> and <pageTitle>

Examples:
|       elementKey      |                       pageURL                     |        pageTitle       |
|    SDK-Java Button    |    https://github.com/ticketmaster-api/sdk-java   |         sdk-java       |
| SDK-JavaScript Button | https://github.com/ticketmaster-api/sdk-javascript|      sdk-javascript    |
|    SDK-Scala Button   |    https://github.com/ticketmaster-api/sdk-scala  |        sdk-scala       |
|     SDK-Java Image    |                       error 404                   |          empty         |
| SDK-JavaScript Image  |                       error 404                   |          empty         |
|    SDK-Scala Image    |                       error 404                   |          empty         |
