Meta:@NotImplemented

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
Given And navigate to myApps page
And open Edit App Page for the first application
When change all possible fields on Edit App Page
And apply changes on Edit App Page
And open Edit App Page for the first application
Then all changes have been applied on Edit App Page

Scenario: (Pantheon|Edit App) Edit app with empty required fields negative
Given navigate to myApps page
And open Edit App Page for the first application
When clear field <appFormField> on Edit App Page
And apply changes on Edit App Page
Then the form-error is appear on field <appFormField>
Examples:
|appFormField|
|App Name     |
|Redirect URI |

Scenario: (Pantheon|Add new App) Add new App positive [Add New App - App Name field with value]
Given navigate to Pantheon Add New App page from User Account page
When complete form with valid values on Add New App Page
And submit form on Add New App Page
Then the "App Created!" message is displayed
And the New App is appear in the list of apps

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







