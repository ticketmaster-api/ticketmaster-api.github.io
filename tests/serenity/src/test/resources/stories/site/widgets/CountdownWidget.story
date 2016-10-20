Meta:

Narrative:
In order to setup Countdown Widget
As a developer
I want to use the widget configurator to customize the layout of the widget,
and have ability to grab a small code snippet to insert into 3-rd party websites

Scenario: (/products-and-docs/widgets/countdown/) TECHNICAL TAB - Check that required fields are not empty
Given open Countdown Widget page
Then the required fields are not empty on the Countdown Widget page

Scenario: (/products-and-docs/widgets/countdown/) TECHNICAL TAB - Verification of default embed code
Given open Countdown Widget page
And store ApiKey and EventId on Countdown Widget page
When click on "Get code" button
Then the pop-up Embedded Code is opened
And embedded html code contains stored ApiKey and EventId

Scenario: (/products-and-docs/widgets/countdown/) TECHNICAL TAB - Check that embed code functionality works properly
Given open Countdown Widget page
And change value for ApiKey and EventId on Countdown Widget page
And store ApiKey and EventId on Countdown Widget page
When click on "Get code" button
Then the pop-up Embedded Code is opened
And embedded html code contains stored ApiKey and EventId

Scenario: (/products-and-docs/widgets/countdown/) TECHNICAL TAB - Check RESET button functionality
Given open Countdown Widget page
And store ApiKey and EventId on Countdown Widget page
And change value for ApiKey and EventId on Countdown Widget page
When submit form
And click reset button
Then the ApiKey and EventId fields have stored values

Scenario: (/products-and-docs/widgets/countdown/) TECHNICAL TAB - Check RESET button functionality on Embedded Code Pop-up window
Given open Countdown Widget page
And store ApiKey and EventId on Countdown Widget page
And change value for ApiKey and EventId on Countdown Widget page
When submit form
And click reset button
And click on "Get code" button
Then the pop-up Embedded Code is opened
And embedded html code contains stored ApiKey and EventId

Scenario: (/products-and-docs/widgets/countdown/) TECHNICAL TAB - Get new EventId
Given open Countdown Widget page
When User is logged to site (Countdown Widget)
And get eventId by keyword ADELE
And set first eventId from list
Then the event poster contains ADELE

Scenario: (/products-and-docs/widgets/countdown/) TECHNICAL TAB - Check links
Given open Countdown Widget page
When I click on the 'Get your own' link to get api key
Then The page is opened with url https://developer-acct.ticketmaster.com

Scenario: (/products-and-docs/widgets/countdown/) VISUAL TAB - Check Full-width mode
Given open Countdown Widget page
And switch to VISUAL Tab
And set theme to full-width
When click on "Get code" button
Then the pop-up Embedded Code is opened
And embedded html code contains stored theme

Scenario: (/products-and-docs/widgets/countdown/) VISUAL TAB - Check Layout Resolutions
Given open Countdown Widget page
And switch to VISUAL Tab
And set theme to poster
And set layout resolution to <layoutResolution>
When click on "Get code" button
Then the pop-up Embedded Code is opened
And embedded html code contains stored layout resolution
Examples:
|layoutResolution|
|300x600         |
|300x250         |
|custom          |

Scenario: (/products-and-docs/widgets/countdown/) VISUAL TAB - Check Layout Orientations
Given open Countdown Widget page
And switch to VISUAL Tab
And set theme to poster
And set layout orientation to <orientation>
When click on "Get code" button
Then the pop-up Embedded Code is opened
And embedded html code contains stored layout orientation
Examples:
|orientation|
|horizontal |
|vertical   |

Scenario: (/products-and-docs/widgets/countdown/) Event message - Check event message for invalid API Key
Given open Countdown Widget page
And enter custom ApiKey {InvalidApiKey123}
When submit form
Then the event message is shown "No results were found"

Scenario: (/products-and-docs/widgets/countdown/) Event message - Check event message for invalid Event ID
Given open Countdown Widget page
And enter custom EventId "invalidEventId123"
When submit form
Then the event message is shown "No results were found"