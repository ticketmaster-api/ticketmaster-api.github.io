{% capture post_content %}


## Supported Country Codes
{: .article #supported-country-codes}
This the [ISO Alpha-2 Code](https://en.wikipedia.org/wiki/ISO_3166-1) country values:


{% include apis-code-examples/discovery-api/contry-code.html %}


## Supported Markets
{: .article #supported-markets}

Markets can be used to filter events by larger regional demographic groupings. Each market is typically comprised of several DMAs.

#### USA

| ID          | Market                                       |
| :---------- | :--------------------------------------------|
| 1           | Birmingham & More                            |
| 2           | Charlotte                                    |
| 3           | Chicagoland & Northern IL                    |
| 4           | Cincinnati & Dayton                          |
| 5           | Dallas - Fort Worth & More                   |
| 6           | Denver & More                                |
| 7           | Detroit, Toledo & More                       |
| 8           | El Paso & New Mexico                         |
| 9           | Grand Rapids & More                          |
| 10          | Greater Atlanta Area                         |
| 11          | Greater Boston Area                          |
| 12          | Cleveland, Youngstown & More                 |
| 13          | Greater Columbus Area                        |
| 14          | Greater Las Vegas Area                       |
| 15          | Greater Miami Area                           |
| 16          | Minneapolis/St. Paul & More                  |
| 17          | Greater Orlando Area                         |
| 18          | Greater Philadelphia Area                    |
| 19          | Greater Pittsburgh Area                      |
| 20          | Greater San Diego Area                       |
| 21          | Greater Tampa Area                           |
| 22          | Houston & More                               |
| 23          | Indianapolis & More                          |
| 24          | Iowa                                         |
| 25          | Jacksonville & More                          |
| 26          | Kansas City & More                           |
| 27          | Greater Los Angeles Area                     |
| 28          | Louisville & Lexington                       |
| 29          | Memphis, Little Rock & More                  |
| 30          | Milwaukee & WI                               |
| 31          | Nashville, Knoxville & More                  |
| 33          | New England                                  |
| 34          | New Orleans & More                           |
| 35          | New York/Tri-State Area                      |
| 36          | Phoenix & Tucson                             |
| 37          | Portland & More                              |
| 38          | Raleigh & Durham                             |
| 39          | Saint Louis & More                           |
| 40          | San Antonio & Austin                         |
| 41          | N. California/N. Nevada                      |
| 42          | Greater Seattle Area                         |
| 43          | North & South Dakota                         |
| 44          | Upstate New York                             |
| 45          | Utah & Montana                               |
| 46          | Virginia                                     |
| 47          | Washington, DC and Maryland                  |
| 48          | West Virginia                                |
| 49          | Hawaii                                       |
| 50          | Alaska                                       |
| 52          | Nebraska                                     |
| 53          | Springfield                                  |
| 54          | Central Illinois                             |
| 55          | Northern New Jersey                          |
| 121         | South Carolina                               |
| 122         | South Texas                                  |
| 123         | Beaumont                                     |
| 124         | Connecticut                                  |
| 125         | Oklahoma                                     |


#### Canada

| ID          | Market                                       |
| :---------- | :--------------------------------------------|
| 102         | Toronto, Hamilton & Area                     |
| 103         | Ottawa & Eastern Ontario                     |
| 106         | Manitoba                                     |
| 107         | Edmonton & Northern Alberta                  |
| 108         | Calgary & Southern Alberta                   |
| 110         | B.C. Interior                                |
| 111         | Vancouver & Area                             |
| 112         | Saskatchewan                                 |
| 120         | Montréal & Area                           	 |


#### Europe

| ID          | Market                                       |
| :---------- | :--------------------------------------------|
| 202         | London (UK)                                  |
| 203         | South (UK)                                   |
| 204         | Midlands and Central (UK)                    |
| 205         | Wales and North West (UK)                    |
| 206         | North and North East (UK)                    |
| 207         | Scotland                                     |
| 208         | Ireland                                      |
| 209         | Northern Ireland                             |
| 210         | Germany                                      |
| 211         | Netherlands                                  |
| 500         | Sweden                                       |
| 501         | Spain 					                     |
| 502         | Barcelona (Spain)                            |
| 503         | Madrid (Spain)                               |
| 600         | Turkey                                       |

#### Australia and New Zealand

| ID          | Market                                       |
| :---------- | :--------------------------------------------|
| 302         | New South Wales/Australian Capital Territory |
| 303         | Queensland                                   |
| 304         | Western Australi                             |
| 305         | Victoria/Tasmania                            |
| 306         | Western Australia                            |
| 351         | North Island                                 |
| 352         | South Island                                 |

#### Mexico

| ID          | Market                                       |
| :---------- | :--------------------------------------------|
| 402         | Mexico City and Metropolitan Area            |
| 403         | Monterrey                                    |
| 404         | Guadalajara                                  |

## Supported Sources
{: .article #supported-sources}

| Source	|
|:----------|
| ticketmaster	|
| tmr (ticketmaster resale platform) |
| universe	|
| frontgate |


## Supported Locales
{: .article #supported-locales}

We support all languages, without any fallback.

{% comment %}
| Locale	|
|:----------|
| en-us		|
| en-au		|
| en-gb		|
| en-nz		|
| en-mx		|
| en-ca		|
| es-us		|
| es-mx		|
| fr-fr		|
| fr-ca		|
{% endcomment %}

## Supported Designated Market Area (DMA)
{: #supported-dma}

Designated Market Area (DMA) can be used to segment and target events to a specific audience. Each DMA groups several zipcodes into a specific market segmentation based on population demographics.

|DMA ID| DMA name                                 |
|:---- |:-----------------------------------------|
|200 | All of US                |
|212 | Abilene - Sweetwater         |
|213 | Albany - Schenectady - Troy        |
|214 | Albany, GA       |
|215 | Albuquerque - Santa Fe       |
|216 | Alexandria, LA       |
|217 | Alpena       |
|218 | Amarillo       |
|219 | Anchorage        |
|220 | Atlanta        |
|221 | Augusta        |
|222 | Austin       |
|223 | Bakersfield        |
|224 | Baltimore        |
|225 | Bangor       |
|226 | Baton Rouge        |
|227 | Beaumont - Port Arthur       |
|228 | Bend, OR       |
|229 | Billings       |
|230 | Biloxi - Gulfport        |
|231 | Binghamton       |
|232 | Birmingham (Anniston and Tuscaloosa)       |
|233 | Bluefield - Beckley - Oak Hill         |
|234 | Boise        |
|235 | Boston (Manchester)        |
|236 | Bowling Green        |
|237 | Buffalo        |
|238 | Burlington - Plattsburgh       |
|239 | Butte - Bozeman        |
|240 | Casper - Riverton        |
|241 | Cedar Rapids - Waterloo & Dubuque        |
|242 | Champaign & Springfield - Decatur        |
|243 | Charleston, SC                           |
|244 | Charleston-Huntington                    |
|245 | Charlotte                                |
|246 | Charlottesville                          |
|247 | Chattanooga                              |
|248 | Cheyenne - Scottsbluff                   |
|249 | Chicago                          |
|250 | Chico - Redding                  |
|251 | Cincinnati                       |
|252 | Clarksburg - Weston              |
|253 | Cleveland                        |
|254 | Colorado Springs - Pueblo        |
|255 | Columbia - Jefferson City        |
|256 | Columbia, SC                     |
|257 | Columbus - Tupelo - West Point   |
|258 | Columbus, GA                     |
|259 | Columbus, OH                     |
|260 | Corpus Christi                   |
|261 | Dallas - Fort Worth              |
|262 | Davenport - Rock Island - Moline              |
|263 | Dayton              |
|264 | Denver              |
|265 | Des Moines - Ames              |
|266 | Detroit              |
|267 | Dothan              |
|268 | Duluth - Superior              |
|269 | El Paso              |
|270 | Elmira              |
|271 | Erie              |
|272 | Eugene              |
|273 | Eureka              |
|274 | Evansville              |
|275 | Fairbanks              |
|276 | Fargo - Valley City              |
|277 | Flint - Saginaw - Bay City              |
|278 | Florence - Myrtle Beach              |
|279 | Fort Myers - Naples              |
|280 | Fort Smith - Fayetteville - Springdale - Rogers              |
|281 | Fort Wayne              |
|282 | Fresno - Visalia              |
|283 | Gainesville              |
|284 | Glendive              |
|285 | Grand Junction - Montrose              |
|286 | Grand Rapids - Kalamazoo - Battle Creek              |
|287 | Great Falls              |
|288 | Green Bay - Appleton              |
|289 | Greensboro - High Point - Winston-Salem              |
|290 | Greenville - New Bern - Washington              |
|291 | Greenville - Spartansburg - Asheville - Anderson              |
|292 | Greenwood - Greenville              |
|293 | Harlingen - Weslaco - Brownsville - McAllen              |
|294 | Harrisburg - Lancaster - Lebanon - York              |
|295 | Harrisonburg              |
|296 | Hartford & New Haven              |
|297 | Hattiesburg - Laurel              |
|298 | Helena              |
|299 | Honolulu              |
|300 | Houston              |
|301 | Huntsville - Decatur (Florence)              |
|302 | Idaho Falls - Pocatello              |
|303 | Indianapolis              |
|304 | Jackson, MS              |
|305 | Jackson, TN              |
|306 | Jacksonville              |
|307 | Johnstown - Altoona              |
|308 | Jonesboro              |
|309 | Joplin - Pittsburg              |
|310 | Juneau              |
|311 | Kansas City              |
|312 | Knoxville              |
|313 | La Crosse - Eau Claire              |
|314 | Lafayette, IN              |
|315 | Lafayette, LA              |
|316 | Lake Charles              |
|317 | Lansing              |
|318 | Laredo              |
|319 | Las Vegas              |
|320 | Lexington              |
|321 | Lima              |
|322 | Lincoln & Hastings - Kearney              |
|323 | Little Rock - Pine Bluff              |
|324 | Los Angeles              |
|325 | Louisville              |
|326 | Lubbock              |
|327 | Macon              |
|328 | Madison              |
|329 | Mankato              |
|330 | Marquette              |
|331 | Medford - Klamath Falls              |
|332 | Memphis              |
|333 | Meridian              |
|334 | Miami - Fort Lauderdale              |
|335 | Milwaukee              |
|336 | Minneapolis - Saint Paul              |
|337 | Minot - Bismarck - Dickinson              |
|338 | Missoula              |
|339 | Mobile - Pensacola (Fort Walton Beach)              |
|340 | Monroe - El Dorado              |
|341 | Monterey - Salinas              |
|342 | Montgomery (Selma)              |
|343 | Nashville              |
|344 | New Orleans              |
|345 | New York              |
|346 | Norfolk - Portsmouth - Newport News              |
|347 | North Platte              |
|348 | Odessa - Midland              |
|349 | Oklahoma City              |
|350 | Omaha              |
|351 | Orlando - Daytona Beach - Melbourne              |
|352 | Ottumwa - Kirksville              |
|353 | Paducah - Cape Girardeau - Harrisburg - Mt Vernon              |
|354 | Palm Springs              |
|355 | Panama City              |
|356 | Parkersburg              |
|357 | Peoria - Bloomington              |
|358 | Philadelphia              |
|359 | Phoenix              |
|360 | Pittsburgh              |
|361 | Portland - Auburn              |
|362 | Portland, OR              |
|363 | Presque Isle              |
|364 | Providence - New Bedford              |
|365 | Quincy - Hannibal - Keokuk              |
|366 | Raleigh - Durham (Fayetteville)              |
|367 | Rapid City              |
|368 | Reno              |
|369 | Richmond - Petersburg              |
|370 | Roanoke - Lynchburg              |
|371 | Rochester - Mason City - Austin              |
|372 | Rochester, NY              |
|373 | Rockford              |
|374 | Sacramento - Stockton - Modesto              |
|375 | Saint Joseph              |
|376 | Saint Louis              |
|377 | Salisbury              |
|378 | Salt Lake City              |
|379 | San Angelo              |
|380 | San Antonio              |
|381 | San Diego              |
|382 | San Francisco - Oakland - San Jose              |
|383 | Santa Barbara - Santa Maria - San Luis Obispo              |
|384 | Savannah              |
|385 | Seattle - Tacoma              |
|386 | Sherman - Ada              |
|387 | Shreveport              |
|388 | Sioux City              |
|389 | Sioux Falls (Mitchell)              |
|390 | South Bend - Elkhart              |
|391 | Spokane              |
|392 | Springfield - Holyoke              |
|393 | Springfield, MO              |
|394 | Syracuse              |
|395 | Tallahassee - Thomasville              |
|396 | Tampa - Saint Petersburg (Sarasota)              |
|397 | Terre Haute              |
|398 | Toledo              |
|399 | Topeka              |
|400 | Traverse City - Cadillac              |
|401 | Tri-Cities, TN-VA              |
|402 | Tucson (Sierra Vista)              |
|403 | Tulsa              |
|404 | Twin Falls              |
|405 | Tyler - Longview (Lufkin & Nacogdoches)              |
|406 | Utica              |
|407 | Victoria              |
|408 | Waco - Temple - Bryan              |
|409 | Washington DC (Hagerstown)              |
|410 | Watertown              |
|411 | Wausau - Rhinelander              |
|412 | West Palm Beach - Fort Pierce              |
|413 | Wheeling - Steubenville              |
|414 | Wichita - Hutchinson              |
|415 | Wichita Falls & Lawton              |
|416 | Wilkes Barre - Scranton              |
|417 | Wilmington              |
|418 | Yakima - Pasco - Richland - Kennewick              |
|419 | Youngstown              |
|420 | Yuma - El Centro              |
|421 | Zanesville              |
|422 | Northern New Jersey              |
|500 | All of Canada              |
|501 | Barrie-Orillia              |
|502 | Belleville-Peterborough              |
|503 | Owen Sound              |
|504 | Burnaby-New Westminster-Surrey              |
|505 | Calgary-Banff              |
|506 | Edmonton              |
|507 | Fraser Valley              |
|508 | Hamilton-Niagara              |
|509 | Kitchener-Waterloo              |
|510 | London-Sarnia              |
|511 | Mississauga-Oakville              |
|512 | Newfoundland              |
|513 | NWT              |
|514 | New Brunswick              |
|515 | Northern Ontario              |
|516 | Nova Scotia              |
|517 | Nunavit              |
|518 | Okanagan-Kootenays              |
|519 | Ottawa-Gatineau              |
|520 | PEI              |
|521 | Prince George-North              |
|522 | Montreal and Surrounding Area              |
|523 | Red Deer              |
|524 | Saskatchewan              |
|527 | Toronto              |
|528 | Vancouver              |
|529 | Sunshine Coast-Islands              |
|530 | Winnipeg-Brandon              |
|531 | Yukon              |
|601 | All of United Kingdom              |
|602 | London              |
|603 | South              |
|604 | Midlands and Central              |
|605 | Wales and North West              |
|606 | North and North East              |
|607 | Scotland              |
|608 | All of Ireland              |
|609 | Northern Ireland              |
|610 | Germany              |
|611 | Netherlands              |
|612 | Sweden              |
|613 | Turkey              |
|701 | All of Australia              |
|702 | New South Wales/Australian Capital Territory              |
|703 | Queensland              |
|704 | Western Australia              |
|705 | Victoria/Tasmania              |
|750 | All of New Zealand              |
|751 | North Island              |
|752 | South Island              |
|801 | All of Mexico              |
|802 | Mexico City and Metropolitan Area              |
|803 | Monterrey              |
|804 | Guadalajara              |
|901 | All of Spain              |
|902 | Barcelona              |
|903 | Madrid              |



{% comment %}

{: .article }
{%include release-notes.html%}

{% endcomment %}


{% endcapture %}

{{ post_content | markdownify }}
