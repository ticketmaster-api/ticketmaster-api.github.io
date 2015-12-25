---
layout: documentation-single
categories:
- documentation
- getting-started
---


#GETTING STARTED


{: .lead .double-margin}
Everything you need to start playing with the Ticketmaster APIs.

{: #introduction}
##Introduction


{: .body}
Welcome to the Ticketmaster API! To get you started, we'll go over the **live events core datasets** we’ve made
available to you. Once you [register for a key](https://live-livenation.devportal.apigee.com/user/login), you will
be able to access the following datasets:

{: .double-margin}
|Dataset            |  Description                                                                                              |
|:------------------|:----------------------------------------------------------------------------------------------------------|
|Events             |A live event must have a date, time, venue and attaction associated with it. Sometime the venue is TBD     |
|Venues             |A venue is a physical location at which an event takes place. A venue can also has sub-venues (rooms).     |
|Attractions        |Any event should have at least one attraction. Artists, teams, stand-up comics are examples of attractions.|
|Offers             |Offers are generally event-specific. Sometimes special offers are applied to carts or to particular API keys.  |
|Tickets            |Any particular offer can hold a variety of tickets. A ticket is transactable.                              |
|Cart               |A cart can hold any transactable item, like tickets, merchandize, parking, etc.                         |


These datasets are distributed across four distinct APIs: Discovery API, Commerce API, Accounts API and Orders API.

{: .body .double-margin-bottom}
This overview covers the core concepts that you need to know before you could 
fully use the APIs to their potential. Once you have a good understanding of the
API core concepts, you can then dig deeper into each API by visiting its 
dedicated overview page.

{: #data-hierarchy}
##Data Hierarchy

{: .body}
Exploring a new API can be daunting. To make using our API enjoyable, easy, 
and fun, it’s important to understand a few things regarding how our data is 
structured and how our APIs work.

{: .body}
[Remaining content follows in similar fashion, with H2s heading each section
and highlighting in the left sidebar nav to show current location.]

{: .double-margin #available-resources}
##Available Resources

<div class="table-wrapper">
<table class="article double-margin">
  <thead>
    <tr>
      <th style="text-align: center" rowspan="2">API</th>
      <th style="text-align: left" rowspan="2">Resource</th>
      <th style="text-align: center; border-bottom:0;" colspan="4">Access Tiers</th>
    </tr>
    <tr>
      <th style="text-align: center;font-weight: normal; border:0;" >Public</th>
      <th style="text-align: center;font-weight: normal;border:0;" >Partners</th>
      <th style="text-align: center;font-weight: normal;border:0;" >Clients</th>
      <th style="text-align: center;font-weight: normal;border:0;" >Internal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center" rowspan="9">
      <img src="/assets/img/getting-started/ic-search-big.svg" alt="search">
      <h4 style="margin-top:11px;">Discovery API</h4>
      </td>
      <td style="text-align: left"><a href="/products-and-docs/apis/discovery/#srch-events">Search Events</a></td>
      <td style="text-align: center;border-right: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left"><a href="/products-and-docs/apis/discovery/#event-details">Event Details</a></td>
      <td style="text-align: center;border-right: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left"><a href="/products-and-docs/apis/discovery/#event-img">Search Event Images</a></td>
      <td style="text-align: center;border-right: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left"><a href="/products-and-docs/apis/discovery/#search-attractions">Search Attractions</a></td>
      <td style="text-align: center;border-right: 0px;"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;"></td>
      <td style="text-align: center;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left"><a href="/products-and-docs/apis/discovery/#attraction-details">Attraction Details</a></td>
      <td style="text-align: center;border-right: 0px;"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;"></td>
      <td style="text-align: center;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left"><a href="/products-and-docs/apis/discovery/#search-categories">Search Categories</a></td>
      <td style="text-align: center;border-right: 0px;"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left"><a href="/products-and-docs/apis/discovery/#category-details">Category Details</a></td>
      <td style="text-align: center;border-right: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left"><a href="/products-and-docs/apis/discovery/#search-venues">Search Venues</a></td>
      <td style="text-align: center;border-right: 0px;"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left"><a href="/products-and-docs/apis/discovery/#venue-details">Venue Details</a></td>
      <td style="text-align: center;border-right: 0px;"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: center">
        <img src="/assets/img/getting-started/ic-commerce-api.svg" alt="Icon1">
        <h4 style="margin-top:11px;text-">Commerce API</h4>
        </td>
      <td style="text-align: left"><a href="/products-and-docs/apis/commerce/#event-offers">Event Offers</a></td>
      <td style="text-align: center;border-right: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;"  class="checked-td"></td>
      <td style="text-align: center;border-left: 0px;" class="checked-td"></td>
    </tr>
  </tbody>
</table>
</div>
