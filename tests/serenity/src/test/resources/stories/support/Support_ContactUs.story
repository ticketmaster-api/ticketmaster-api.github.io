Meta:
@regression-support

Narrative:
As a test engineer
I want to test Ticket Master Developer's site
So that I test Contact Us Page of Ticket Master Developer's site

Scenario: (/support/contact-us/) Verification for general page's elements
Given open Contact Us page
Then check general page elements for Contact Us Page, where DISQUS = false and LeftMenu = true

Scenario: (/support/contact-us/) Verification of successfull message
Given open Contact Us page
When name is populated on Contact Us Page with test
When email is populated on Contact Us Page with test@test.com
When description is populated with 12 symbols text on Contact Us Page
When click send button
Then feedback was successfully sent

Scenario: (/support/contact-us/) Verification of allowed symbols in description
Given open Contact Us page
When name is populated on Contact Us Page with test
When email is populated on Contact Us Page with test@test.com
When description is populated with 3001 symbols text on Contact Us Page
When click send button
Then error notification is shown
