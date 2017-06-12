Meta:
@smoke

Narrative:
As a test engineer
I want to test Ticket Master Developer's site
So that I test Join The Nexus Program Page of Ticket Master Developer's site

Scenario: (/partners/certified-partners/nexus/) Verification for general page's elements
Given open Join The Nexus Program page
Then check general page elements for Join The Nexus Program Page, where DISQUS = true and LeftMenu = true

Scenario: (/partners/certified-partners/nexus/) Verification of successfull message sending when paid
Given open Join The Nexus Program page
When email is populated on Nexus Page with test@test.com
When check Paid radio button on Nexus Page
When description is populated with 12 symbols text on Nexus Page
When click send button
Then message was successfully sent on Nexus form

Scenario: (/partners/certified-partners/nexus/) Verification of successfull message sending when free
Given open Join The Nexus Program page
When email is populated on Nexus Page with test@test.com
When check Free radio button on Nexus Page
When description is populated with 12 symbols text on Nexus Page
When click send button
Then message was successfully sent on Nexus form

Scenario: (/partners/certified-partners/nexus/) Verification of allowed symbols in description
Given open Join The Nexus Program page
When email is populated on Nexus Page with test@test.com
When check Paid radio button on Nexus Page
When description is populated with 3001 symbols text on Nexus Page
When click send button
Then error notification is shown
