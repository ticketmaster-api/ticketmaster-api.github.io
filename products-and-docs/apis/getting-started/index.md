---
layout: documentation-single
category: documentation
---


#GETTING STARTED


{: .lead .double-margin}
Everything you need to start playing with the Ticketmaster APIs.


##Introduction


{: .body}
Welcome! To get you started, let’s go over the automotive datasets we’ve made
available for you through the Edmunds API. Once you register for a key, you will
be able to access the following datasets:


|Dataset            |  Description                                                                                              |
|:------------------|:----------------------------------------------------------------------------------------------------------|
|Vehicle Specs      |Vehicle make/model/year/trim data, vehicle equipment, vehicle options, vehicle colors, etc.                |
|Vehicle Pricing     |Edmunds.com TMV® (True Market Value®), Edmunds.com TCO® (True Cost to Own®), Incentives and Rebates, etc.  |
|Vehicle Service    |Vehicle maintenance schedule, vehicle recalls, vehicle service bulletins, local labor rates, etc.          |
|Vehicle Content    |Consumer reviews, editorial reviews, editorial articles, etc.                                              |
|Vehicle Media      |Vehicle photos                                                                                             |
|Dealership Content |Dealership info, consumer reviews, list of cars for sale, dealer pricing, etc.                             |


{: .body}
These datasets are distributed across four distinct APIs: [Vehicle API](), [Editorial API](),
[Dealer API]() and [Inventory API](). A list of resources available under each API is on the left.

{: .body}
This overview covers the core concepts that you need to know before you could 
fully use the APIs to their potential. Once you have a good understanding of the
API core concepts, you can then dig deeper into each API by visiting its 
dedicated overview page.


##Data Hierarchy

{: .body}
Exploring a new API can be daunting. To make using our API enjoyable, easy, 
and fun, it’s important to understand a few things regarding how our data is 
structured and how our APIs work.

{: .body}
[Remaining content follows in similar fashion, with H2s heading each section
and highlighting in the left sidebar nav to show current location.]


##Available Resources

<table class="article double-margin">
  <thead>
    <tr>
      <th style="text-align: center" rowspan="2">API</th>
      <th style="text-align: left" rowspan="2">Resource</th>
      <th style="text-align: center; border-bottom:0;" colspan="4">Access Tiers</th>
    </tr>
    <tr>
      <th style="text-align: left;font-weight: normal; border:0;" >Public</th>
      <th style="text-align: left;font-weight: normal;border:0;" >Partners</th>
      <th style="text-align: left;font-weight: normal;border:0;" >Clients</th>
      <th style="text-align: left;font-weight: normal;border:0;" >Internal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: left" rowspan="9">Discovery API</td>
      <td style="text-align: left">Search Events</td>
      <td style="text-align: left;border-right: 0px;" class="checked-td"></td>
      <td style="text-align: left;border-right: 0px; border-left: 0px;"></td>
      <td style="text-align: left;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: left;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left">Event Details</td>
      <td style="text-align: left;border-right: 0px;" class="checked-td"></td>
      <td style="text-align: left;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: left;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: left;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left">Search Event Images</td>
      <td style="text-align: left;border-right: 0px;" class="checked-td"></td>
      <td style="text-align: left;border-right: 0px; border-left: 0px;"></td>
      <td style="text-align: left;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: left;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left">Search Attractions</td>
      <td style="text-align: left;border-right: 0px;"></td>
      <td style="text-align: left;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: left;border-right: 0px; border-left: 0px;"></td>
      <td style="text-align: left;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left">Attraction Details</td>
      <td style="text-align: left;border-right: 0px;"></td>
      <td style="text-align: left;border-right: 0px; border-left: 0px;"></td>
      <td style="text-align: left;border-right: 0px; border-left: 0px;"></td>
      <td style="text-align: left;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left">Search Categories</td>
      <td style="text-align: left;border-right: 0px;"></td>
      <td style="text-align: left;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: left;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: left;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left">Category Details</td>
      <td style="text-align: left;border-right: 0px;" class="checked-td"></td>
      <td style="text-align: left;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: left;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: left;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left">Search Venues</td>
      <td style="text-align: left;border-right: 0px;"></td>
      <td style="text-align: left;border-right: 0px; border-left: 0px;"></td>
      <td style="text-align: left;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: left;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left">Venue Details</td>
      <td style="text-align: left;border-right: 0px;"></td>
      <td style="text-align: left;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: left;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: left;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left">
        <img src="/assets/img/home/ic-brick-lg-p-2.svg" alt="Icon1">
        Commerce API
        </td>
      <td style="text-align: left">Event Offers</td>
      <td style="text-align: left;border-right: 0px;" class="checked-td"></td>
      <td style="text-align: left;border-right: 0px; border-left: 0px;"></td>
      <td style="text-align: left;border-right: 0px; border-left: 0px;"  class="checked-td"></td>
      <td style="text-align: left;border-left: 0px;" class="checked-td"></td>
    </tr>
  </tbody>
</table>
