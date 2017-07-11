Meta:
@regression-pantheon

Narrative:
In order to manage my Apps
As a user of Ticket Master Developer portal
I want to perform CRUD operations with my apps

Lifecycle:
Before:
Given open Home page
And navigate to Pantheon LogIn page from Home page
And navigate to Pantheon User Account page from LogIn page

Scenario: (Pantheon|Add new App) Add new App negative [2.1.15 Add New App - The required field is empty]
Given navigate to Pantheon Add New App page from User Account page
When enter to the field <appFormField> value <appName>
When save changes on Edit App Page
Then the message <message> is displayed
Examples:
|appFormField     |appName                  |message                                    |
|Application name |mamaxF-Appd2             |Callback URL is required for Oauth Product |
|Redirect URI     |https://ticketmaster.com |Application name field is required.        |

Scenario: (Pantheon|Add new App) [2.1.5 Add new App with values positive]
Given all the applications were deleted
And navigate to Pantheon Add New App page from User Account page
When enter to the field Application name value uniqueApp
When enter to the field Redirect URI value https://oauth.ticketmaster.com
And save changes on Edit App Page
Then the message App Created! is displayed
Then open my Apps page
And the App is appeared in the list of apps

Scenario: (Pantheon|Edit App) Edit app with empty required fields negative
Given open my Apps page
And open Edit App Page for the first application
When clear field <appFormField> on Edit App Page
And save changes on Edit App Page
Then the message <formError> is displayed
Examples:
|appFormField     |formError                                  |
|Application name |Application name field is required.        |
|Redirect URI     |Callback URL is required for Oauth Product |

Scenario: (Pantheon|Edit App) Edit app positive [2.1.8 Edit application]
Given open my Apps page
And open Edit App Page for the first application
When clear field <appFormField> on Edit App Page
And enter to the field <appFormField> value <appValue>
And save changes on Edit App Page
And the message App Updated! is displayed
And open my Apps page
And open Details tab on the application
Then <detailName> have been applied on Edit App Page with value <appValue>
Examples:
|appFormField     |appValue                       |detailName       |
|Application name |mamax-Appdf                    |Application Name |
|Redirect URI     |https://oauth.ticketmaster.com |Callback URL     |

Scenario: (Pantheon|Delete App) Delete App positive [2.1.9 Delete application]
Given open my Apps page
When delete application
Then the message App Deleted! is displayed

