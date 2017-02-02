Meta:

Narrative:
As a test engineer
I want to test Ticket Master Developer's site
So that I test Open Source Page of Ticket Master Developer's site

Scenario: (/blogs/) Verification for general page's elements
Given open Home page
When check visibility and click <elementKey> element of Home page
Then check that new page opened from Home page has <pageURL> and <pageTitle>

Examples:
|    elementKey    |           pageURL             |          pageTitle            |
|    Open Source   | http://code.ticketmaster.com/ |       //h1[@id='logo']        |
