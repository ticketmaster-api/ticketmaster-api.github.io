Meta:@prod

Narrative:
As a test engineer
I want to test Ticket Master Developer's site
So that I test API Key is NOT replaced on the page

Scenario: (APi Key - Commerce API page) Custom API key is not replaced when user is logged in
Given open Commerce API page
When User is logged to site (Commerce API)
Then check that API key is provided for all placeholders on Commerce API page

Scenario: (APi Key - Top Picks API page) Custom API key is not replaced when user is logged in
Given open Top Picks API page
When User is logged to site (Top Picks API)
Then check that API key is provided for all placeholders on Top Picks API page

Scenario: (APi Key - Season Ticketing API page) Custom API key is not replaced when user is logged in
Given open Season Ticketing API page
When User is logged to site (Season Ticketing API)
Then check that API key is provided for all placeholders on Season Ticketing API page

Scenario: (APi Key - International Discovery API page) Custom API key is not replaced when user is logged in
Given open International Discovery API page
When User is logged to site (International Discovery API)
Then check that API key is provided for all placeholders on International Discovery API page

Scenario: (APi Key - Publish API page) Custom API key is not replaced when user is logged in
Given open Publish API page
When User is logged to site (Publish API)
Then check that API key is provided for all placeholders on Publish API page

Scenario: (APi Key - Deals API page) Custom API key is not replaced when user is logged in
Given open Deals API page
When User is logged to site (Deals API)
Then check that API key is provided for all placeholders on Deals API page

Scenario: (APi Key - Partner API page) Custom API key is not replaced when user is logged in
Given open Partner API page
When User is logged to site (Partner API)
Then check that API key is provided for all placeholders on Partner API page

Scenario: (APi Key - Inventory Status API page) Custom API key is not replaced when user is logged in
Given open Inventory Status API page
When User is logged to site (Inventory Status API)
Then check that API key is provided for all placeholder on Inventory Status API page
