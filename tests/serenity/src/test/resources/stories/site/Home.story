Meta:

Narrative:
As a test engineer
I want to test Ticket Master Developer's site
So that I test Home Page of Ticket Master Developer's site

Scenario: (/Home Page/) Verification for general page elements
Given open Home page
Then check general page elements for Home Page, where DISQUS = false and LeftMenu = false

Scenario: (/Home Page/) Verification for twitter's list of events
Given open Home page
Then check that Twitter's list of events is shown

Scenario: (/Home Page/) Verification for all the page links
Given open Home page
When check visibility and click <elementKey> element of Home page
Then check that new page opened from Home page has <pageURL> and <elementLocation>

Examples:
|elementKey           |pageURL                                                 |elementLocation                                                                     |
|Get Your API Key     |https://developer-acct.ticketmaster.com/user/login      |//div[@class='text-wrapper col-lg-6 col-sm-12 col-xs-12']/h1[@class='only-desktop'] |
|Review Documentation |{url}/products-and-docs/apis/getting-started/           |//h1                                                                                |
|Explore The API      |{url}/api-explorer/                                     |//h1                                                                                |
|Android              |http://code.ticketmaster.com/#android-projects          |//h1                                                                                |
|Backend              |http://code.ticketmaster.com/#backend-projects          |//h1                                                                                |
|iOS                  |http://code.ticketmaster.com/#iOS-projects              |//h1                                                                                |
|Web                  |http://code.ticketmaster.com/#web-projects              |//h1                                                                                |
|Tech blog            |https://tech.ticketmaster.com/                          |//h1[@class='site-title']/a                                                         |
|Medium Publication   |https://medium.com/ticketmaster-tech                    |//h2[text()='Because Engineers are Fans Too!']                                      |
|Partner API          |{url}/products-and-docs/apis/partner/                   |//h1                                                                                |
|Deals API            |{url}/products-and-docs/apis/deals-api/                 |//h1                                                                                |
|Legacy docs          |http://apidocs.ticketmaster.com/                        |//td[@class='WikiLogoName']/a                                                       |
