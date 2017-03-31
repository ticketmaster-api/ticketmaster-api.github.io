Meta:@prod

Narrative:
As a test engineer
I want to test Ticket Master Developer's site
So that I test API Key is NOT replaced on the page

Lifecycle:
Before:
Given open Home page

Scenario: (APi Key - Commerce API page) Custom API key is not replaced when user is logged in
When production user is logged to site
When user gets apiKey
When open Commerce API page
Then check that API key is provided for all placeholders on Commerce API page

Scenario: (APi Key - Top Picks API page) Custom API key is not replaced when user is logged in
When production user is logged to site
When user gets apiKey
When open Top Picks API page
Then check that API key is provided for all placeholders on Top Picks API page

Scenario: (APi Key - Season Ticketing API page) Custom API key is not replaced when user is logged in
When production user is logged to site
When user gets apiKey
When open Season Ticketing API page
Then check that API key is provided for all placeholders on Season Ticketing API page

Scenario: (APi Key - International Discovery API page) Custom API key is not replaced when user is logged in
When production user is logged to site
When user gets apiKey
When open International Discovery API page
Then check that API key is provided for all placeholders on International Discovery API page

Scenario: (APi Key - Publish API page) Custom API key is not replaced when user is logged in
When production user is logged to site
When user gets apiKey
When open Publish API page
Then check that API key is provided for all placeholders on Publish API page

Scenario: (APi Key - Deals API page) Custom API key is not replaced when user is logged in
When production user is logged to site
When user gets apiKey
When open Deals API page
Then check that API key is provided for all placeholders on Deals API page

Scenario: (APi Key - Partner API page) Custom API key is not replaced when user is logged in
When production user is logged to site
When user gets apiKey
When open Partner API page
Then check that API key is provided for all placeholders on Partner API page

Scenario: (APi Key - Inventory Status API page) Custom API key is not replaced when user is logged in
When production user is logged to site
When user gets apiKey
When open Inventory Status API page
Then check that API key is provided for all placeholder on Inventory Status API page
