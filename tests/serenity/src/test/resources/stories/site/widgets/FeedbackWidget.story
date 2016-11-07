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

Scenario: (feedback widget) Feedback widget error notifications when Name length bigger than 255
Given open Tutorials Widgets page
And click Feedback button of Tutorials Widgets page
When all fields except Name are populated
And Name field is populated with bigger than 255 symbols text
Then check that text was truncated to 255 symbols for Feedback widget
When click send button of Feedback widget
Then check that email sent notification is shown
And click OK Feedback Widget button

Scenario: (feedback widget) Feedback widget error notifications when Description length bigger than 3000
Given open Tutorials Widgets page
And click Feedback button of Tutorials Widgets page
When all fields except Description are populated
And Description field is populated with bigger than 3000 symbols text
And click send button of Feedback widget
Then check that error message is shown for Description for Feedback widget

