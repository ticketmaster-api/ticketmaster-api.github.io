Meta:

Narrative:
As a test engineer
I want to test Ticket Master Developer's site
So that I test Pantheon User LonIn Page of Ticket Master Developer's site

Lifecycle:
Before:
Given open Home page
When navigate to Pantheon LogIn page from Home page

Scenario: (developer-acct.ticketmaster.com/user/login) Verification for general page's elements
Then check general page elements for Pantheon User LogIn page

Scenario: (developer-acct.ticketmaster.com/user/login) [2.2.3.2 Login - Username/Email field - enter invalid username]
When login to Pantheon with invaliduserName and 1234567
Then the message Sorry, unrecognized username or password. Have you forgotten your password? is displayed

Scenario: (developer-acct.ticketmaster.com/user/login) [2.2.3.8 Login - OpenID field - invalid OpenID]
When login to Pantheon using OpenID invalidOpenID
Then the message Sorry, that is not a valid OpenID. Ensure you have spelled your ID correctly. is displayed
