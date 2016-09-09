Meta:

Narrative:
In order to setup Countdown Widget
As a developer
I want to use the widget configurator to customize the layout of the widget,
and have ability to grab a small code snippet to insert into 3-rd party websites

Scenario: (/products-and-docs/widgets/countdown/) Verification for general page's elements
Given open Countdown Widget page
Then check general page elements for Countdown Widget Page, where DISQUS = true and LeftMenu = true

Scenario: (/products-and-docs/widgets/countdown/) [TECHNICAL TAB] Check that required fields are not empty
Given open Countdown Widget page
Then the required fields are not empty on the Countdown Widget page

Scenario: (/products-and-docs/widgets/countdown/) [TECHNICAL TAB] Verification of default embed code
Given open Countdown Widget page
And store ApiKey and EventId on Countdown Widget page
When click on "Get code" button
Then the pop-up Embedded Code is opened
And embedded html code contains stored ApiKey and EvendId

Scenario: (/products-and-docs/widgets/countdown/) [TECHNICAL TAB] Check that requried fields are populated automatically after clearing
Given open Countdown Widget page
And clear all required fields on the Countdown Widget page
When submit form
Then the required fields are not empty on the Countdown Widget page

Scenario: (/products-and-docs/widgets/countdown/) [TECHNICAL TAB] Check that embed code functionality works properly
Given open Countdown Widget page
And change value for ApiKey and EventId on Countdown Widget page
And store ApiKey and EventId on Countdown Widget page
When click on "Get code" button
Then the pop-up Embedded Code is opened
And embedded html code contains stored ApiKey and EventId

Scenario: (/products-and-docs/widgets/countdown/) [TECHNICAL TAB] Check RESET button functionality
Given open Countdown Widget page
And store ApiKey and EventId on Countdown Widget page
And enter custom ApiKey <apiKey>
And enter custom EventId <eventId>
And submit form
When click reset button
Then the ApiKey and EventId fields have stored values
Examples:
|apiKey|eventId|
|111111|2222222|

Scenario: (/products-and-docs/widgets/countdown/) [TECHNICAL TAB] Check RESET button functionality on Embedded Code Pop-up window
Given open Countdown Widget page
And store ApiKey and EventId on Countdown Widget page
And enter custom ApiKey <apiKey>
And enter custom EventId <eventId>
And submit form
When click reset button
And click on "Get code" button
Then the pop-up Embedded Code is opened
And embedded html code contains stored ApiKey and EventId
Examples:
|apikey           |eventId          |
|invalidApiKey123 |invalidEventIf123|

Scenario: (/products-and-docs/widgets/countdown/) [TECHNICAL TAB] Get new EventId
Given open Countdown Widget page
And User is logged to site
And get eventId by keyword <keyword>
When set first eventId from list
Then the event poster contains <keyword>
Examples:
|keyword|
|Adele  |

Scenario: (/products-and-docs/widgets/countdown/) [TECHNICAL TAB] Check links
Given open Countdown Widget page
When I click on the 'Get your own' link to get api key
Then The page is opened with url <url>
Examples:
|url                                    |
|https://developer-acct.ticketmaster.com|

Scenario: (/products-and-docs/widgets/countdown/) [VISUAL TAB] Check Full-width mode
Given open Countdown Widget page
And switch to VISUAL Tab
And set theme to full-width
And store theme
When click on "Get code" button
Then the pop-up Embedded Code is opened
And embedded html code contains stored theme

Scenario: (/products-and-docs/widgets/countdown/) [VISUAL TAB] Check Layout Resolutions
Given open Countdown Widget page
And switch to VISUAL Tab
And set theme to poster
And set layout resolution to <layoutResolution>
And store layout resolution <layoutResolution>
When click on "Get code" button
Then the pop-up Embedded Code is opened
And embedded html code contains stored layout resolution
Examples:
|layoutResolution|
|300x600         |
|300x250         |
|custom          |

Scenario: (/products-and-docs/widgets/countdown/) [VISUAL TAB] Check Layout Orientations
Given open Countdown Widget page
And switch to VISUAL Tab
And set theme to poster
And set layout orientation to <orientation>
And store layout orientation
When click on "Get code" button
Then the pop-up Embedded Code is opened
And embedded html code contains stored layout orientation
Examples:
|orientation|
|horizontal |
|vertical   |

Scenario: (/products-and-docs/widgets/countdown/) [Event message] Check event message for invalid API Key
Given open Countdown Widget page
And enter custom ApiKey "InvalidApiKey123"
When submit form
Then the event message is shown "No results were found"

Scenario: (/products-and-docs/widgets/countdown/) [Event message] Check event message for invalid Event ID
Given open Countdown Widget page
And enter custom EventId "invalidEventId123"
When submit form
Then the event message is shown "No results were found"

Scenario: (/products-and-docs/widgets/countdown/) [Event message] Check event message for past Event
Given open Countdown Widget page
And enter custom EventId "vvG1OZKzMxnx99"
When submit form
Then the event message is shown "This event has taken place"

























