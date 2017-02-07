Meta:

Narrative:
In order to manage my Apps
As a user of Ticket Master Developer portal
I want to perform CRUD operations with my apps

Lifecycle:
Before:
Given open Home page
And navigate to Pantheon LogIn page from Home page
And navigate to Pantheon User Account page from LogIn page

Scenario: (developer-acct.ticketmaster.com/user/1554/apps/add) Verification for general page's elements
When navigate to Pantheon Add New App page from User Account page
Then check general page elements for Pantheon Add New App page

Scenario: (Pantheon|Edit App) Edit app positive
Given open my App
And open Edit App Page for the first application
When clear field <appFormField> on Edit App Page
And enter to the field <appFormField> value <appValue>
And save changes on Edit App Page
And open my App
And open Details tab on the application
Then <detailName> have been applied on Edit App Page with value <appValue>
Examples:
|appFormField     |appValue                       |detailName       |
|Application name |mamax-Appdf                    |Application Name |
|Redirect URI     |https://oauth.ticketmaster.com |Callback URL     |

Scenario: (Pantheon|Edit App) Edit app with empty required fields negative
Given open my App
And open Edit App Page for the first application
When clear field <appFormField> on Edit App Page
And save changes on Edit App Page
Then the form-error appeared on field <appFormField>
Examples:
|appFormField     |
|Application name |
|Redirect URI     |

Scenario: (Pantheon|Add new App) Add new App positive [Add New App - App Name field with value]
Given navigate to Pantheon Add New App page from User Account page
When enter to the field <appFormField> value <appName>
And save changes on Edit App Page
Then the <message> is displayed
And the <appName> is appeared in the list of apps
Examples:
|appFormField     |appName                       |message       |
|Application name |mamax-Appd2                    |App Created!  |
|Redirect URI     |https://oauth.ticketmaster.com |Callback URL     |

Scenario: (Pantheon|Add new App) Add new App negative [Add New App - The required field is empty]
Given navigate to Pantheon Add New App page from User Account page
And make <requiredField> field empty
When submit form on Add New App Page
Then the form-error is appear on field <requiredField>
Examples:
|requiredField|
|App Name     |
|Redirect URI |

Scenario: (Pantheon|Delete App) Delete App positive
When delete predefined app
Then the "App Deleted!" message is displayed
And the predefined app is removed from the list of app

