Meta:

Narrative:
In order to setup Event Discovery Widget
As a user of Ticketmaster Developer Portal
I want to use the widget configurator to customize the layout of the widget,
and have ability to grab a small code snippet to insert into 3-rd party websites

Scenario: (/products-and-docs/widgets/event-discovery/) TECHNICAL TAB - Check that required fields are not empty and have default values
Given open Event Discovery Widget page
Then the required fields are not empty and have default values on the Event Discovery Widget page

Scenario: (/products-and-docs/widgets/event-discovery/) TECHNICAL TAB - Check that embed code functionality works properly
Given open Event Discovery Widget page
And change values for all possible fields on the Event Discovery Widget page
And store all fields values on the Event Discovery Widget page
When click on "Get code" button
Then the pop-up Embedded Code is opened
And embedded html code contains stored values on the Event Discovery Widget page

Scenario: (/products-and-docs/widgets/event-discovery/) TECHNICAL TAB - Check that Country field is changed accordingly Zip Code
Given open Event Discovery Widget page
When change value of ZipCode <zipCode> on Event Discovery Widget Page
Then the Country Field contains appropriate value <countryName> on Event Discovery Widget Page
Examples:
|zipCode|countryName   |
|NW1    |United Kingdom|
|40104  |United States |

Scenario: (/products-and-docs/widgets/event-discovery/) TECHNICAL TAB - Check that KEYWORD field functionality works properly
Given open Event Discovery Widget page
When search events by keyword <keyword> on Event Discovery Widget page
Then found events contains <keyword> on Event Discovery Widget page
Examples:
|keyword|
|ADELE  |
|STING  |

Scenario: (/products-and-docs/widgets/event-discovery/) TECHNICAL TAB - Check that EVENT COUNT works properly
Given open Event Discovery Widget page
When set Event Count <value> on Event Discovery Widget page
Then the number of events equals or less than Event Count <value>
Examples:
|value|
| 1   |
| 100 |

Scenario: (/products-and-docs/widgets/event-discovery/) TECHNICAL TAB - Check boundary values of EVENT COUNT
Given open Event Discovery Widget page
When set Event Count <value> on Event Discovery Widget page
Then the number of events equals Event Count <actualValue>
Examples:
|value|actualValue|
|0    |     1     |
|1    |     1     |
|100  |     100   |
|101  |     100   |

Scenario: (/products-and-docs/widgets/event-discovery/) TECHNICAL TAB - Check boundary values of RADIUS
Given open Event Discovery Widget page
And change value of ZipCode 90015 on Event Discovery Widget Page
When set Radius <setValue> on Event Discovery Widget page
Then Radius value is <actualValue> on Event Discovery Widget page
Examples:
|setValue|actualValue|
|   0    |     1     |
|   1    |     1     |
| 19999  |   19999   |
| 20000  |   19999   |

Scenario: (/products-and-docs/widgets/event-discovery/) TECHNICAL TAB - Check that RESET button works properly
Given open Event Discovery Widget page
And store all fields values on the Event Discovery Widget page
And change values for all possible fields on the Event Discovery Widget page
When click reset button
Then all fields have been reseted to defaults on the Event Discovery Widget page

Scenario: (/products-and-docs/widgets/event-discovery/) TECHNICAL TAB - Check links
Given open Event Discovery Widget page
When I click on the 'Get your own' link to get api key
Then The page is opened with url https://developer-acct.ticketmaster.com

Scenario: (/products-and-docs/widgets/event-discovery/) VISUAL TAB - Check Layout Resolutions
Given open Event Discovery Widget page
And switch to VISUAL Tab
And set theme to poster
And set layout resolution to <layoutResolution>
When click on "Get code" button
Then the pop-up Embedded Code is opened
And embedded html code contains stored layout resolution
Examples:
|layoutResolution|
|300x600         |
|300x250         |
|custom          |

Scenario: (/products-and-docs/widgets/event-discovery/) VISUAL TAB - Check Layout Orientations
Given open Event Discovery Widget page
And switch to VISUAL Tab
And set theme to poster
And set layout orientation to <orientation>
When click on "Get code" button
Then the pop-up Embedded Code is opened
And embedded html code contains stored layout orientation
Examples:
|orientation|
|horizontal |
|vertical   |

Scenario: (/products-and-docs/widgets/event-discovery/) Event message - Check event message for invalid Keyword
Given open Event Discovery Widget page
When search events by keyword ABRAKADABRA on Event Discovery Widget page
Then the event message is shown "Here other options for you."

