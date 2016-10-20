Meta:

Narrative:
As a test enfineer
I want to test Ticket Master Developer's site
So that I test Feedback Widget for Tutorials Widgets Page of Ticket Master Developer's site

Scenario: (feedback widget) Feedback widget check
Given open Tutorials Widgets page
Given Feedback widget is not shown
When click Feedback button of Tutorials Widgets page
Then Feedback widget is shown

Scenario: (feedback widget) check of elements of Feedback widget
Given open Tutorials Widgets page
Given Feedback widget elements are not shown
When click Feedback button of Tutorials Widgets page
Then Feedback widget elements are shown

Scenario: (feedback widget) Feedback widget Close button
Given open Tutorials Widgets page
When click Feedback button of Tutorials Widgets page
Then click close button of Feedback widget
Then Feedback widget is not shown

Scenario: (feedback widget) Feedback widget error notifications fo NAME field
Given open Tutorials Widgets page
Given click Feedback button of Tutorials Widgets page
When all fields except Name are populated
When click send button of Feedback widget
Then error notification is shown for Feedback widget

Scenario: (feedback widget) Feedback widget error notifications fo Email field
Given open Tutorials Widgets page
Given click Feedback button of Tutorials Widgets page
When all fields except Email are populated
When click send button of Feedback widget
Then error notification is shown for Feedback widget

Scenario: (feedback widget) Feedback widget error notifications fo Subject field
Given open Tutorials Widgets page
Given click Feedback button of Tutorials Widgets page
When click send button of Feedback widget
Then description error notification is shown for Feedback widget

Scenario: (feedback widget) Feedback widget error notifications when Name length bigger than 255
Given open Tutorials Widgets page
Given click Feedback button of Tutorials Widgets page
When all fields except Name are populated
When Name field is populated with bigger than 255 symbols text
Then check that text was truncated to 255 symbols for Feedback widget

Scenario: (feedback widget) Feedback widget error notifications when Description length bigger than 3000
Given open Tutorials Widgets page
Given click Feedback button of Tutorials Widgets page
When all fields except Description are populated
When Description field is populated with bigger than 3000 symbols text
When click send button of Feedback widget
Then check that error message is shown for Description for Feedback widget

Scenario: (feedback widget) Feedback widget error notifications when Email is not correct
Given open Tutorials Widgets page
Given click Feedback button of Tutorials Widgets page
When all fields except Email are populated
When Email is not correctly populated 1
When click send button of Feedback widget
Then error notification is shown for Feedback widget
When Email is not correctly populated 2
When click send button of Feedback widget
Then error notification is shown for Feedback widget

Scenario: (feedback widget) Feedback widget positive scenario
Given open Tutorials Widgets page
Given click Feedback button of Tutorials Widgets page
When all fields except Name are populated
When Name field is populated with bigger than 255 symbols text
When click send button of Feedback widget
Then check that email sent notification is shown
Then click OK Feedback Widget button
