Meta:

Narrative:
As a test engineer
I want to test Ticket Master Developer's site
So that I test Widgets Page of Ticket Master Developer's site

Scenario: (/products-and-docs/widgets/) Verification for general page's elements
Given open Widgets page
Then check general page elements for Widgets Page, where DISQUS = false and LeftMenu = true

Scenario: (/products-and-docs/widgets/) Verification for Direct Payment Button element
Given open Widgets page
When check visibility and click DirectPaymentButton element of Widgets page
Then check that new page opened from Direct Payment Button has has appropriate url

Scenario: (/products-and-docs/widgets/) Verification for all the page's links
Given open Widgets page
When check visibility and click <elementKey> element of Widgets page
Then check that new page opened from Widgets page has <pageURL> and <pageTitle>

Examples:
|       elementKey              |                       pageURL                     |   pageTitle    |
|Checkout Widget Button         |  {url}/products-and-docs/widgets/checkout/        |      //h1      |
|Discovery Widget Button        |  {url}/products-and-docs/widgets/event-discovery/ |      //h1      |
|Countdown Widget Button        |  {url}/products-and-docs/widgets/countdown/       |      //h1      |
|Calendar Widget Button         |  {url}/products-and-docs/widgets/calendar/        |      //h1      |
|WordPress Widget Learn Button  |  {url}/products-and-docs/widgets/wordpress/       |      //h1      |
