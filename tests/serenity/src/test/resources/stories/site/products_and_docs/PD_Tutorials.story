Meta:

Narrative:
As a test engineer
I want to test Ticket Master Developer's site
So that I test Tutorials Page of Ticket Master Developer's site

Scenario: (/products-and-docs/tutorials/) Verification for general page's elements
Given open Tutorials page
Then check general page elements for Tutorials Page, where DISQUS = false and LeftMenu = true

Scenario: (/products-and-docs/tutorials/) Verification for all the page's links
Given open Tutorials page
When check visibility and click <elementKey> element of Tutorials page
Then check that new page opened from Tutorials page has <pageURL> and <pageTitle>

Examples:
|                 elementKey              |                            pageURL                                   |   pageTitle  |
|   Adding Event Discovery Widget Button  |{url}/products-and-docs/tutorials/widgets/Event_Discovery_Widget.html |     //h1     |
|Adding Event Discovery Widget Header Link|{url}/products-and-docs/tutorials/widgets/Event_Discovery_Widget.html |     //h1     |
| Adding Event Discovery Widget Image Link|{url}/products-and-docs/tutorials/widgets/Event_Discovery_Widget.html |     //h1     |
|    Locate Event On Map Widget Button    |{url}/products-and-docs/tutorials/events-search/search_events_in_location.html |     //h1     |
|  Locate Event On Map Widget Header Link |{url}/products-and-docs/tutorials/events-search/search_events_in_location.html |     //h1     |
|   Locate Event On Map Widget Image Link |{url}/products-and-docs/tutorials/events-search/search_events_in_location.html |     //h1     |
|   Get Started WIth Discovery API Widget Button  |{url}/products-and-docs/tutorials/events-search/search_events_with_discovery_api.html |     //h1     |
|Get Started WIth Discovery API Widget Header Link|{url}/products-and-docs/tutorials/events-search/search_events_with_discovery_api.html |     //h1     |
| Get Started WIth Discovery API Widget Image Link|{url}/products-and-docs/tutorials/events-search/search_events_with_discovery_api.html |     //h1     |
