Meta:

Narrative:
As a test engineer
I want to test Ticket Master Developer's site
So that I test Pantheon Create New Account Page of Ticket Master Developer's site

Lifecycle:
Before:
Given open Home page
When navigate to Pantheon LogIn page from Home page
When navigate to Pantheon Create New Account page from LogIn page

Scenario: (developer-acct.ticketmaster.com/user/register) Verification for general page's elements
Then check general page elements for Pantheon Create New Account page

Scenario: (developer-acct.ticketmaster.com/user/register) [2.2.3.14 Create New Account - fail the CAPTCHA check]
When enter register values on Create New Account Page:
|firstName |lastName|companyName|companySiteUrl|userName|emailAddress|
|apikey    |adele   |corpora.com|company.com   |maamxde |bx@gmail.com|
When click checkbox Terms of Use
When click Create New Account on Register Page
Then the The answer you entered for the CAPTCHA was not correct. message is displayed

Scenario: (developer-acct.ticketmaster.com/user/register) [2.2.3.31 Edit Profile - I Agree To The Terms & Conditions checkbox]
When enter register values on Create New Account Page:
|firstName |lastName|companyName|companySiteUrl|userName|emailAddress|
|apikey    |adele   |corpora.com|company.com   |maamxde |bx@gmail.com|
When click Create New Account on Register Page
Then the I agree to the Terms of Use field is required. message is displayed
