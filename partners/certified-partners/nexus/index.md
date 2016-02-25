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
        <label for="name">First name</label>
        <input type="text" id="first-name" name="firstName" maxlength="255" placeholder="" autofocus tabindex="1">
    </div>
    <div class="col-sm-6">
        <label for="last-name">Last name</label>
        <input type="text" id="last-name" name="lastName" maxlength="255" placeholder="" tabindex="2">
    </div>
    <div class="col-sm-6">
        <label for="email">Email address <span class="label-required">(required)</span></label>
        <input type="email" id="email" name="email" placeholder="" required tabindex="3">
    </div>
    <div class="col-sm-6">
        <label for="phone">Contact number</label>
        <input type="tel" id="phone" name="phone" placeholder="" tabindex="4">
    </div>
    <div class="col-sm-6">
        <label for="organization">Organization name</label>
        <input type="text" id="organization" name="organization" placeholder="" tabindex="5">
    </div>
    <div class="col-sm-6">
    <label >Number of Ticketmaster clients</label>
    <input type="text" min="0" name="ticketsNumber" pattern="[0-9]*" placeholder="" tabindex="6">
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
    </div>
    <div class="col-sm-6">
        <button type="submit" class="button-blue">SEND</button>
    </div>
</form>
</div>
<script type="text/javascript">   
    var $nexusForm = $('.js_nexus_form');
    $nexusForm.submit(function(e){
        e.preventDefault();
        $.ajax({
          dataType: 'jsonp',
          url: "https://getsimpleform.com/messages/ajax?form_api_token=41f4cf3970c05bb985abec394b1e3c0b",
          data: $nexusForm.serialize() 
        }).done(function() {
          //callback which can be used to show a thank you message
          //and reset the form
          showMsgSuccess('#message-success', 4000);
        });
        return false; //to stop the form from submitting
    }); 
    function showMsgSuccess(id, delay){
        $(id).slideDown(400).delay( delay ).slideUp(200);
    }
</script>

