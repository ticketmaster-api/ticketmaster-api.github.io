Meta:

Narrative:
As a test engineer
I want to test Ticket Master Developer's site
So that I test Getting Started Page of Ticket Master Developer's site

Scenario: (/products-and-docs/apis/getting-started/) TKMDPA-874 Commerce API links in Available Resources table
Given open Commerce API page
When Commerce API menu has list of methods
And open Getting Started page
Then all the Commerce API methods are shown on Getting Started page


Scenario: (/products-and-docs/apis/getting-started/) Verification for general page's elements
Given open Getting Started page
Then check general page elements for Getting Started Page, where DISQUS = true and LeftMenu = true


