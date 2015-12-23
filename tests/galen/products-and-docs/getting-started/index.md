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
available for you through the Edmunds API. Once you [register for a key](https://oauth.ticketmaster.com/oauth/register), you will
be able to access the following datasets:

{: .double-margin}
|Dataset            |  Description                                                                                              |
|:------------------|:----------------------------------------------------------------------------------------------------------|
|Vehicle Specs      |Vehicle make/model/year/trim data, vehicle equipment, vehicle options, vehicle colors, etc.                |
|Vehicle Pricing     |Edmunds.com TMV® (True Market Value®), Edmunds.com TCO® (True Cost to Own®), Incentives and Rebates, etc.  |
|Vehicle Service    |Vehicle maintenance schedule, vehicle recalls, vehicle service bulletins, local labor rates, etc.          |
|Vehicle Content    |Consumer reviews, editorial reviews, editorial articles, etc.                                              |
|Vehicle Media      |Vehicle photos                                                                                             |
|Dealership Content |Dealership info, consumer reviews, list of cars for sale, dealer pricing, etc.                             |


These datasets are distributed across four distinct APIs: [Vehicle API](/products-and-docs/under-development/), [Editorial API](/products-and-docs/under-development/),
[Dealer API](/products-and-docs/under-development/) and [Inventory API](/products-and-docs/under-development/). A list of resources available under each API is on the left.

{: .body .double-margin-bottom}
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

{: .double-margin}
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
      <td style="text-align: left"><a href="/products-and-docs/under-development/">Search Events</a></td>
      <td style="text-align: center;border-right: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left"><a href="/products-and-docs/under-development/">Event Details</a></td>
      <td style="text-align: center;border-right: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left"><a href="/products-and-docs/under-development/">Search Event Images</a></td>
      <td style="text-align: center;border-right: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left"><a href="/products-and-docs/under-development/">Search Attractions</a></td>
      <td style="text-align: center;border-right: 0px;"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;"></td>
      <td style="text-align: center;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left"><a href="/products-and-docs/under-development/">Attraction Details</a></td>
      <td style="text-align: center;border-right: 0px;"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;"></td>
      <td style="text-align: center;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left"><a href="/products-and-docs/under-development/">Search Categories</a></td>
      <td style="text-align: center;border-right: 0px;"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left"><a href="/products-and-docs/under-development/">Category Details</a></td>
      <td style="text-align: center;border-right: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left"><a href="/products-and-docs/under-development/">Search Venues</a></td>
      <td style="text-align: center;border-right: 0px;"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-left: 0px;" class="checked-td"></td>
    </tr>
    <tr>
      <td style="text-align: left"><a href="/products-and-docs/under-development/">Venue Details</a></td>
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
      <td style="text-align: left"><a href="/products-and-docs/under-development/">Event Offers</a></td>
      <td style="text-align: center;border-right: 0px;" class="checked-td"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;"></td>
      <td style="text-align: center;border-right: 0px; border-left: 0px;"  class="checked-td"></td>
      <td style="text-align: center;border-left: 0px;" class="checked-td"></td>
    </tr>
  </tbody>
</table>
</div>