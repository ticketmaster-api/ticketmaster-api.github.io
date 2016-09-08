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
And enter custom <apikey> ApiKey and <eventId> EventId
And submit form
When click reset button
Then the ApiKey and EventId fields have stored values

Scenario: (/products-and-docs/widgets/countdown/) [TECHNICAL TAB] Check RESET button functionality on Embedded Code Pop-up window
Given open Countdown Widget page
And store ApiKey and EventId on Countdown Widget page
And enter custom <apikey> ApiKey and <eventId> EventId
And submit form
When click reset button
And click on "Get code" button
Then the pop-up Embedded Code is opened
And embedded html code contains stored ApiKey and EventId

Scenario: (/products-and-docs/widgets/countdown/) [VISUAL TAB] Check that embed code functionality works properly (Full-width)
Given open Countdown Widget page
And switch to VISUAL Tab
And set theme to full-width
And store
When click on "Get code" button
Then the pop-up Embedded Code is opened
And embedded html code contains stored theme














