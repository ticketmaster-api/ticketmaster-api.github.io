Meta:

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

Scenario: (feedback widget) Feedback widget Close button
Given open Tutorials Widgets page
When click Feedback button of Tutorials Widgets page
When click close button of Feedback widget
Then feedback widget is not shown

Scenario: (feedback widget) [3.1.1 Feedback widget sanity]
Given open Tutorials Widgets page
And click Feedback button of Tutorials Widgets page
When name is populated
When email is populated
When description is populated
And click send button of Feedback widget
Then feedback was successfully sent

