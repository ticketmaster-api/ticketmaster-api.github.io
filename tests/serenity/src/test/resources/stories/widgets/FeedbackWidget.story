Meta:

Narrative:
In order to send feedback
As a user of Ticketmaster Developer Portal
I want to use the feedback widget
and have ability to send feedback form to support

Scenario: (feedback widget) Check that Feedback widget Elements are shown
Given open Tutorials Widgets page
And Feedback widget is not shown
When click Feedback button of Tutorials Widgets page
Then Feedback widget elements are shown

Scenario: (feedback widget) Feedback widget Close button
Given open Tutorials Widgets page
When click Feedback button of Tutorials Widgets page
Then click close button of Feedback widget
And Feedback widget is not shown

Scenario: (feedback widget) Feedback widget error notifications for NAME field
Given open Tutorials Widgets page
And click Feedback button of Tutorials Widgets page
When all fields except Name are populated
And click send button of Feedback widget
Then error notification is shown for Feedback widget

Scenario: (feedback widget) Feedback widget error notifications for Email field
Given open Tutorials Widgets page
And click Feedback button of Tutorials Widgets page
When all fields except Email are populated
And click send button of Feedback widget
Then error notification is shown for Feedback widget

