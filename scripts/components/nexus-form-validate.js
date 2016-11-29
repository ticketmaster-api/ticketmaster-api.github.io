var $nexusForm = $('.js_nexus_form'),
  $modalAlert = $('#feedback-alert-modal'),
  $btnAlertOk = $modalAlert.find('#js_feedback_btn_alert_ok'),
  $textAreaDescription = $('#company-detail-text');

$nexusForm.submit(function(e){
  var charCount = $textAreaDescription.val().length;

  e.preventDefault();
  $('button', $nexusForm).prop('disabled',true);
  if(3000 < charCount) {
    showMsgError('#feedback-alert-modal-error', 4000 , charCount);
    return false;
  }
  $.ajax({
    dataType: 'jsonp',
    //url: "https://getsimpleform.com/messages/ajax?form_api_token=41f4cf3970c05bb985abec394b1e3c0b",
    url: "https://getsimpleform.com/messages/ajax?form_api_token=892e0c5e4c169c6128c7342614608330",
    data: $nexusForm.serialize()
  }).done(function() {
    //callback which used to show a thank you message
    showMsgSuccess('#feedback-alert-modal');
  });
  return false; //to stop the form from submitting
});
function showMsgSuccess($modalAlert){
  // Show message
  $($modalAlert).modal();
  $nexusForm.trigger("reset");
  //$('.js_custom_select',$nexusForm).trigger("custom-reset");
  //$textAreaDescription.css('height',''); //reset height of textarea
  $('button', $nexusForm).prop('disabled',false);
}
function showMsgError(id, delay, charCount){
  var slideUpSpeed = 200;
  $('#message-error').append('<span id="contact-char-count"> Current count is '+charCount+'</span>')
  // $(id).slideDown(400).delay( delay ).slideUp(slideUpSpeed);
  setTimeout(
    function(){
      $('#contact-char-count').remove();
      $('button', $nexusForm).prop('disabled',false);
    },
    delay + slideUpSpeed*3);
}

$btnAlertOk.on('click', function(){
  $modalAlert.modal('hide');
});
