Meta:

Narrative:
As a test engineer
I want to test Ticket Master Developer's site
So that I test SDK-s Page of Ticket Master Developer's site

Scenario: (/products-and-docs/sdks/) Verification for general page's elements
Given open SDKs page
Then check general page elements for SDKs Page, where DISQUS = true and LeftMenu = true


Scenario: (products-and-docs/sdks/) Verification for all the page's links
Given open SDKs page
When check visibility and click <elementKey> element of SDKs page
Then check that new page opened from SDKs page has <pageURL> and <pageTitle>

Examples:
elementKey           |pageURL                                            |pageTitle                       |
SDK-Java Image       |https://github.com/ticketmaster-api/sdk-java       |//h1[@class='public ']/strong/a |
SDK-JavaScript Image |https://github.com/ticketmaster-api/sdk-javascript |//h1[@class='public ']/strong/a |
SDK-Scala Image      |https://github.com/ticketmaster-api/sdk-scala      |//h1[@class='public ']/strong/a |
