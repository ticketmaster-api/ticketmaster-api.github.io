---
layout: partners-doc
title: Nexus
categories:
  - partners
  - certified
  - nexus
excerpt: At Ticketmaster, we are always looking for innovative products and services that complement Ticketmaster’s Ticketing Services; that’s why we’ve created the Nexus Certified Partner Program.
keywords: Nexus, certified partner program, ticketing Services, innovative products, 
---

{: .col-lg-12 .partner-logo}
![Nexus](/assets/img/partners/logos/nexus-logo@2x.png)

{: .lead .col-lg-12}
At Ticketmaster, we are always looking for innovative products and services that complement Ticketmaster’s Ticketing Services; that’s why we’ve created the Nexus Certified Partner Program.  Our goal is to work with best in breed solution providers.  


{: .x3-margin-top .col-lg-8}
### Example integrations from Ticketmaster include the following


{: .col-lg-8}     
* Consumer lookup, consumer update;
* Seats on account, seats on personal-id-card
* Event summary, price code information, available seats
* Seats with venue-loaded value, seats and meeting promotion criteria
* Login validation


{: .double-margin-top .col-lg-8}
#### We offer the support


{: .col-lg-8}
We offer the support, knowledge and validation to make sure your solution is fully-compatible with Ticketmaster systems.  For vendors to access the Ticketmaster Ticketing System services, they must become a member of Ticketmaster’s Partner program, the costs of which help Ticketmaster offset its costs for vendor integration support.  If you are interested in finding out ways to integrate your product or service with Ticketmaster’s systems, please complete the form below: 

<div class="col-sm-12 col-lg-8 nexus-form-wrapper">
<form accept-charset="UTF-8" action="#" method="POST" class="js_nexus_form">
    <div class="col-sm-6">
        <label for="name-nexus">First name</label>
        <input type="text" id="first-name" name="firstName" maxlength="255" placeholder="" tabindex="1">
    </div>
    <div class="col-sm-6">
        <label for="last-name-nexus">Last name</label>
        <input type="text" id="last-name-nexus" name="lastName" maxlength="255" placeholder="" tabindex="2">
    </div>
    <div class="col-sm-6">
        <label for="email">Email address <span class="label-required">(required)</span></label>
        <input type="email" id="email-nexus" name="email" required pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$" title="Use the following format '-@-.--' " tabindex="3">
    </div>
    <div class="col-sm-6">
        <label for="phone">Contact number</label>
        <input type="tel" id="phone-nexus" name="phone" tabindex="4">
    </div>
    <div class="col-sm-6">
        <label for="organization">Organization name</label>
        <input type="text" id="organization-nexus" name="organization" placeholder="" tabindex="5">
    </div>

    <div class="col-sm-6">
        <label >Number of Ticketmaster clients</label>
        <input class="js_numeric_input" type="number-nexus" value="0" min="0" name="ticketsNumber" pattern="[0-9]*" inputmode="numeric" title="This field may only contain alpha-numeric characters" tabindex="6">
    </div>
    <label class="label-radio-group">Is product offering free or paid? <span class="label-required">(required)</span></label>
    <div class="label-radio">
        <input type="radio" id="radio-yes" name="productOffering"  value="paid" required tabindex="8"/><label class="js-label-radio"><span><span></span></span>Paid</label>
    </div>
    <div class="label-radio">
        <input type="radio" id="radio-no" name="productOffering" value="free" tabindex="9"/><label class="js-label-radio"><span><span></span></span>Free</label>
    </div>    
    <div class="col-sm-12">
        <label class="company-detail">Please provide some detail on your company’s expected integration with Ticketmaster (e.g. any specific type of data, frequency, flow of data)</label>
        <textarea name="companyDetail" id="company-detail-text" tabindex="10"></textarea>
    </div>
    <div class="col-sm-12">
        <p id="message-success" class="message-green" >Thank you for contacting us. We will review and respond promptly.</p>
        <p id="message-error" class="text-overflow-message text-overflow-message__red" style="display:none">The maximum length of description can be 3000 characters.</p>
    </div>
    <div class="col-sm-6">
        <button type="submit" class="button-blue">SEND</button>
    </div>
</form>
</div>

<!-- Modal alert-->
<div id="nexus-alert-modal" class="modal modal-common modal-common-sm fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-body">
        <h3 class="modal-title col-lg-12 text-center">Thank you for contacting us!</h3>
        <p class="text-center">We will review and respond promptly.</p>
        <div class="modal-footer">
          <button id="js_nexus_btn_alert_ok" type="button" class="btn btn-submit text-center">Ok</button>
        </div>
      </div>
    </div>

  </div>
</div>
<!-- Modal alert end-->

<!-- Modal alert Error-->
<div id="nexus-alert-modal-error" class="modal modal-common modal-common-sm fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-body">
        <h3 class="modal-title col-lg-12 text-center text-overflow-message__red">Error</h3>
        <p id="nexus-text-overflow-message" class="text-center">The maximum length of description can be 3000 characters.</p>
        <div class="modal-footer">
          <button id="js_nexus_btn_alert_ok-error" type="button" class="btn btn-submit text-center">Ok</button>
        </div>
      </div>
    </div>

  </div>
</div>
<!-- Modal alert end-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/webshim/1.16.0/dev/polyfiller.js" integrity="sha256-/QuORjyYBwJJiGASxFGeaX/kFIlIfKQJXLlb9jcrUr8=" crossorigin="anonymous"></script>
<script src="/scripts/components/nexus-form-validate.js"></script>

<script> 
	webshims.polyfill();
</script>
