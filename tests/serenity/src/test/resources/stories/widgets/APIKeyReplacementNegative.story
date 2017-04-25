Meta:@prod

Narrative:
As a test engineer
I want to test Ticket Master Developer's site
So that I test API Key is NOT replaced on the page

Scenario: (APi Key - Geting Started page) Placeholder is shown when user is not logged in
When open Getting Started page
Then check that API key is provided for all placeholders on Getting Started page

Scenario: (APi Key - Geting Started page) [1.9.4. Application selector (w/o apps)]
When open API Explorer V2 page
Then check that API key is provided for all placeholders on Getting Started page

Scenario: (APi Key - API Explorer) [1.9.4. Application selector (w/o apps)]
When open API Explorer page
Then check that API key is provided for all placeholders on API Explorer page

Scenario: (APi Key - Countdown Widget) [1.9.4. Application selector (w/o apps)]
When open Countdown Widget page
Then check that API key is provided for all placeholders on Countdown Widget page

Scenario: (APi Key - Event Discovery Widget) [1.9.4. Application selector (w/o apps)]
When open Event Discovery Widget page
Then check that API key is provided for all placeholders on Event Discovery Widget page

Scenario: (APi Key - Calendar Widget) [1.9.4. Application selector (w/o apps)]
When open Calendar Widget page
Then check that API key is provided for all placeholders on Calendar Widget page

Scenario: (APi Key - Discovery API v2 page) Placeholder is shown when user is not logged in
When open Discovery API v2 page
Then check that API key is provided for all placeholders on Discovery API v2 page

Scenario: (APi Key - Discovery API v1 page) Placeholder is shown when user is not logged in
When open Discovery API v1 page
Then check that API key is provided for all placeholders on Discovery API v1 page
