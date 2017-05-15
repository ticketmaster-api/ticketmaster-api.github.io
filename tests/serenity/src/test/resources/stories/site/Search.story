Meta:

Narrative:
As a test engineer
I want to test Ticket Master Developer's site
So that I test Search Page of Ticket Master Developer's site

Scenario: (/search/) Verification for general page's elements
Given open Home page
And insert Search Parameter <searchRequest> and navigate to Search page
Then check general page elements for Search Page, where DISQUS = false and LeftMenu = false
Examples:
| searchRequest |
|      test     |
