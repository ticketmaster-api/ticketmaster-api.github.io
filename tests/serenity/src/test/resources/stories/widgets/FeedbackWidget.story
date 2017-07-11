Meta:
@regression-widgets

Narrative:
In order to send feedback
As a user of Ticketmaster Developer Portal
I want to use the feedback widget
and have ability to send feedback form to support

Scenario: (feedback widget) Check that Feedback widget Elements are shown
Given open Tutorials Widgets page
And feedback widget is not shown
When click Feedback button of Tutorials Widgets page
Then feedback widget elements is shown

Scenario: (feedback widget) [3.1.1 Feedback widget sanity]
Given open Tutorials Widgets page
And click Feedback button of Tutorials Widgets page
When name is populated with test
When email is populated with test@test.com
When description field is populated with 12 symbols text
And click send button of Feedback widget
Then feedback was successfully sent

Scenario: (feedback widget) Verification of allowed symbols in description
Given open Tutorials Widgets page
And click Feedback button of Tutorials Widgets page
When name is populated with test
When email is populated with test@test.com
When description field is populated with 3001 symbols text
And click send button of Feedback widget
Then error notification is shown
