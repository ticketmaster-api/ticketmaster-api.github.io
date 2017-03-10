Meta:

Narrative:
In order to setup Map Widget
As a user of Ticketmaster Developer Portal
I want to use the widget configurator to customize the layout of the widget,
and have ability to grab a small code snippet to insert into 3-rd party websites

Scenario: (/products-and-docs/widgets/map/) [3.7.1 Map widget : Check that required fields are not empty]
Given open Map Widget page
Then the required fields are not empty on the Map Widget page

Scenario: (/products-and-docs/widgets/map/) [3.7.2 Map widget : Embedded code functionality works properly]
Given open Map Widget page
And change all possible fields on the Map Widget page:
|apiKey |keyWord|zipCode|city|attractionId|venueId|promoterId|source      |countryCode|classificationName|eventCount|
|apikeys|adele  |90015  |York|333444      |222111 |9999      |ticketmaster|Canada     |movies            |50        |
And store all fields values on the Map Widget page
When click on "Get code" button
Then the pop-up Embedded Code is opened
And embedded html code contains stored values on the Map Widget page

Scenario: (/products-and-docs/widgets/map/) [3.7.3 Map widget : Check RESET button functionality]
Given open Map Widget page
And store values on Map Widget page: apiKey,keyword,zipCode
And change values for on Map Widget page: apiKey,keyword,zipCode
When click reset button
Then values equals to stored values of fields on Map Widget page: apiKey,keyword,zipCode

Scenario: (/products-and-docs/widgets/map/) [3.7.4 Map widget : Check RESET button functionality on embedded pop-up window]
Given open Map Widget page
And store values on Map Widget page: apiKey,keyword,zipCode
And change values for on Map Widget page: apiKey,keyword,zipCode
When click reset button
And click on "Get code" button
Then the pop-up Embedded Code is opened
And embedded html code on Map Widget contains stored values of: apiKey,keyword,zipCode

Scenario: (/products-and-docs/widgets/map/) [3.7.7 Map widget : Check links]
Given open Map Widget page
When I click on the 'Get your own' link to get api key
Then The page is opened with url https://developer-acct.ticketmaster.com

Scenario: (/products-and-docs/widgets/map/) Event message - Check event message for invalid API Key
Given open Map Widget page
And enter custom ApiKey invalidApiKey123
Then the event message is shown "No results were found"
