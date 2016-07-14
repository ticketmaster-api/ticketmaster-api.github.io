Meta:

Narrative:
As a test enfineer
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
When check visibility and click <elementKey> element
Then check that new page has <pageURL> and <pageTitle>

Examples:
|       elementKey      |                        pageURL                          |          pageTitle            |
|    Get Your API Key   | https://live-livenation.devportal.apigee.com/user/login |            LOG IN             |
|  Review Documentation |      {url}/products-and-docs/apis/getting-started/      |        GETTING STARTED        |
|     Explore The API   |                   {url}/api-explorer/                   |        THE API EXPLORER       |
|         Android       |       http://code.ticketmaster.com/#android-projects    |  Ticketmaster / Open Source   |
|         Backend       |       http://code.ticketmaster.com/#backend-projects    |  Ticketmaster / Open Source   |
|          iOS          |         http://code.ticketmaster.com/#iOS-projects      |  Ticketmaster / Open Source   |
|          Web          |         http://code.ticketmaster.com/#web-projects      |  Ticketmaster / Open Source   |
|        Tech blog      |              https://tech.ticketmaster.com/             |     Ticketmaster Technology   |
|   Medium Publication  |            https://medium.com/ticketmaster-tech         |Because Engineers are Fans Too!|
|       Partner API     |            {url}/products-and-docs/apis/partner/        |           PARTNER API         |
|        Deals API      |           {url}/products-and-docs/apis/deals-api/       |            DEALS API          |
|       Legacy docs     |              http://apidocs.ticketmaster.com/           |Ticketmaster API Documentation |
