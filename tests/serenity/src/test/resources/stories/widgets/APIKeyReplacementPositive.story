Meta:@prod

Narrative:
As a test engineer
I want to test Ticket Master Developer's site
So that I test API Key is NOT replaced on the page

Scenario: (APi Key - Geting Started page) Placeholder is shown when user is not logged in
Given open Getting Started page
When User is not logged to site (Getting Started)
Then check that API key is provided for all placeholders on Getting Started page

Scenario: (APi Key - Geting Started page) Custom API key is shown when user is logged in
Given open Getting Started page
When User is logged to site (Getting Started)
Then check that API key is provided for all placeholders on Getting Started page

Scenario: (APi Key - Geting Started page) Placeholder is shown when user is not logged in
Given open Getting Started page
When User is not logged to site (Getting Started)
Then check that API key is provided for all placeholders on Getting Started page

Scenario: (APi Key - Geting Started page) Custom API key is shown when user is logged in
Given open Getting Started page
When User is logged to site (Getting Started)
Then check that API key is provided for all placeholders on Getting Started page

Scenario: (APi Key - Interactive API Console page) Placeholder is shown when user is not logged in
Given open Interactive API Console page
When User is not logged to site (Interactive API Console)
Then check that API key is provided for all placeholders on Interactive API Console page

Scenario: (APi Key - Interactive API Console page) Custom API key is shown when user is logged in
Given open Interactive API Console page
When User is logged to site (Interactive API Console)
Then check that API key is provided for all placeholders on Interactive API Console page

Scenario: (APi Key - API Explorer) Placeholder is shown when user is not logged in
Given open API Explorer page
When User is not logged to site (API Explorer)
Then check that API key is provided for all placeholders on API Explorer page

Scenario: (APi Key - API Explorer) Custom API key is shown when user is logged in
Given open API Explorer page
When User is logged to site (API Explorer)
Then check that API key is provided for all placeholders on API Explorer page

Scenario: (APi Key - Countdown Widget) Placeholder is shown when user is not logged in
Given open Countdown Widget page
When User is not logged to site (Countdown Widget)
Then check that API key is provided for all placeholders on Countdown Widget page

Scenario: (APi Key - Countdown Widget) Custom API key is shown when user is logged in
Given open Countdown Widget page
When User is logged to site (Countdown Widget)
Then check that API key is provided for all placeholders on Countdown Widget page

Scenario: (APi Key - Event Discovery Widget) Placeholder is shown when user is not logged in
Given open Event Discovery Widget page
When User is not logged to site (Event Discovery Widget)
Then check that API key is provided for all placeholders on Event Discovery Widget page

Scenario: (APi Key - Event Discovery Widget) Custom API key is shown when user is logged in
Given open Event Discovery Widget page
When User is logged to site (Event Discovery Widget)
Then check that API key is provided for all placeholders on Event Discovery Widget page

Scenario: (APi Key - Calendar Widget) Placeholder is shown when user is not logged in
Given open Calendar Widget page
When User is not logged to site (Calendar Widget)
Then check that API key is provided for all placeholders on Calendar Widget page

Scenario: (APi Key - Calendar Widget) Custom API key is shown when user is logged in
Given open Calendar Widget page
When User is logged to site (Calendar Widget)
Then check that API key is provided for all placeholders on Calendar Widget page

Scenario: (APi Key - Discovery API v2 page) Placeholder is shown when user is not logged in
Given open Discovery API v2 page
When User is not logged to site (Discovery API v2)
Then check that API key is provided for all placeholders on Discovery API v2 page

Scenario: (APi Key - Discovery API v2 page) Custom API key is shown when user is logged in
Given open Discovery API v2 page
When User is logged to site (Discovery API v2)
Then check that API key is provided for all placeholders on Discovery API v2 page

Scenario: (APi Key - Discovery API v1 page) Placeholder is shown when user is not logged in
Given open Discovery API v1 page
When User is not logged to site (Discovery API v1)
Then check that API key is provided for all placeholders on Discovery API v1 page

Scenario: (APi Key - Discovery API v1 page) Custom API key is shown when user is logged in
Given open Discovery API v1 page
When User is logged to site (Discovery API v1)
Then check that API key is provided for all placeholders on Discovery API v1 page
