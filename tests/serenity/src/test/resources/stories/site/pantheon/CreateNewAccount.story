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
Then the message The answer you entered for the CAPTCHA was not correct. is displayed

Scenario: (developer-acct.ticketmaster.com/user/register) [2.2.3.31 Edit Profile - I Agree To The Terms & Conditions checkbox]
When enter register values on Create New Account Page:
|firstName |lastName|companyName|companySiteUrl|userName|emailAddress|
|apikey    |adele   |corpora.com|company.com   |maamxde |bx@gmail.com|
When click Create New Account on Register Page
Then the message I agree to the Terms of Use field is required. is displayed

Scenario: (developer-acct.ticketmaster.com/user/register) [Create New Account - First Name validation]
When enter register values on Create New Account Page:
|firstName |lastName|companyName|companySiteUrl|userName|emailAddress|
|          |adele   |corporation|company.com   |maamxde |bx@gmail.com|
When click checkbox Terms of Use
When click Create New Account on Register Page
Then the message First Name field is required. is displayed

Scenario: (developer-acct.ticketmaster.com/user/register) [Create New Account - Company Name validation]
When enter register values on Create New Account Page:
|firstName |lastName|companyName|companySiteUrl|userName|emailAddress|
|apikey    |        |corporation|company.com   |maamxde |bx@gmail.com|
When click checkbox Terms of Use
When click Create New Account on Register Page
Then the message Last Name field is required. is displayed

Scenario: (developer-acct.ticketmaster.com/user/register) [Create New Account - Company Name validation]
When enter register values on Create New Account Page:
|firstName |lastName|companyName|companySiteUrl|userName|emailAddress|
|apikey    |adele   |           |company.com   |maamxde |bx@gmail.com|
When click checkbox Terms of Use
When click Create New Account on Register Page
Then the message Company Name field is required. is displayed

Scenario: (developer-acct.ticketmaster.com/user/register) [Create New Account - Company Site URL validation]
When enter register values on Create New Account Page:
|firstName |lastName|companyName|companySiteUrl|userName|emailAddress|
|apikey    |adele   |corporation|              |maamxde |bx@gmail.com|
When click checkbox Terms of Use
When click Create New Account on Register Page
Then the message Company Site URL field is required. is displayed

Scenario: (developer-acct.ticketmaster.com/user/register) [Create New Account - Username validation]
When enter register values on Create New Account Page:
|firstName |lastName|companyName|companySiteUrl|userName|emailAddress|
|apikey    |adele   |corporation|company.com   |        |bx@gmail.com|
When click checkbox Terms of Use
When click Create New Account on Register Page
Then the message Username field is required. is displayed

Scenario: (developer-acct.ticketmaster.com/user/register) [Create New Account - Email validation]
When enter register values on Create New Account Page:
|firstName |lastName|companyName|companySiteUrl|userName|emailAddress|
|apikey    |adele   |corpora.com|company.com   |maamxde |            |
When click checkbox Terms of Use
When click Create New Account on Register Page
Then the message E-mail address field is required. is displayed
