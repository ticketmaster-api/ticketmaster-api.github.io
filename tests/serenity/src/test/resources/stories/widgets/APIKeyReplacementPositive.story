Meta:@prod

Narrative:
As a test engineer
I want to test Ticket Master Developer's site
So that I test API Key is NOT replaced on the page

Lifecycle:
Before:
Given open Home page

Scenario: (APi Key - Geting Started page) Placeholder is shown when user is not logged in
When user is not logged to site
When open Getting Started page
Then check that API key is provided for all placeholders on Getting Started page

Scenario: (APi Key - Geting Started page) Custom API key is shown when user is logged in
When production user is logged to site
When user gets apiKey
When open Getting Started page
Then check that API key is provided for all placeholders on Getting Started page

Scenario: (APi Key - Geting Started page) Placeholder is shown when user is not logged in
When user is not logged to site
When open Getting Started page
Then check that API key is provided for all placeholders on Getting Started page

Scenario: (APi Key - API Explorer) Placeholder is shown when user is not logged in
When user is not logged to site
When open API Explorer page
Then check that API key is provided for all placeholders on API Explorer page

Scenario: (APi Key - API Explorer) Custom API key is shown when user is logged in
When production user is logged to site
When user gets apiKey
When open API Explorer page
Then check that API key is provided for all placeholders on API Explorer page

Scenario: (APi Key - Countdown Widget) Placeholder is shown when user is not logged in
When user is not logged to site
When open Countdown Widget page
Then check that API key is provided for all placeholders on Countdown Widget page

Scenario: (APi Key - Countdown Widget) Custom API key is shown when user is logged in
When production user is logged to site
When user gets apiKey
When open Countdown Widget page
Then check that API key is provided for all placeholders on Countdown Widget page

Scenario: (APi Key - Event Discovery Widget) Placeholder is shown when user is not logged in
When user is not logged to site
When open Event Discovery Widget page
Then check that API key is provided for all placeholders on Event Discovery Widget page

Scenario: (APi Key - Event Discovery Widget) Custom API key is shown when user is logged in
When production user is logged to site
When user gets apiKey
When open Event Discovery Widget page
Then check that API key is provided for all placeholders on Event Discovery Widget page

Scenario: (APi Key - Calendar Widget) Placeholder is shown when user is not logged in
When user is not logged to site
When open Calendar Widget page
Then check that API key is provided for all placeholders on Calendar Widget page

Scenario: (APi Key - Calendar Widget) Custom API key is shown when user is logged in
When production user is logged to site
When user gets apiKey
When open Calendar Widget page
Then check that API key is provided for all placeholders on Calendar Widget page

Scenario: (APi Key - Discovery API v2 page) Placeholder is shown when user is not logged in
When user is not logged to site
When open Discovery API v2 page
Then check that API key is provided for all placeholders on Discovery API v2 page

Scenario: (APi Key - Discovery API v2 page) Custom API key is shown when user is logged in
When production user is logged to site
When user gets apiKey
When open Discovery API v2 page
Then check that API key is provided for all placeholders on Discovery API v2 page

Scenario: (APi Key - Discovery API v1 page) Placeholder is shown when user is not logged in
When user is not logged to site
When open Discovery API v1 page
Then check that API key is provided for all placeholders on Discovery API v1 page

Scenario: (APi Key - Discovery API v1 page) Custom API key is shown when user is logged in
When production user is logged to site
When user gets apiKey
When open Discovery API v1 page
Then check that API key is provided for all placeholders on Discovery API v1 page
