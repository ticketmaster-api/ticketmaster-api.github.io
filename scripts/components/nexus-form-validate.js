var $nexusForm = $('.js_nexus_form'),
  $modalAlert = $('#feedback-alert-modal'),
  $btnAlertOk = $modalAlert.find('#js_feedback_btn_alert_ok'),
  $textAreaDescription = $('#company-detail-text'),
  formKey = '41f4cf3970c05bb985abec394b1e3c0b';

/*set new key for localhost*/
function checkKey() {
  var localhost = /(localhost:4000)+/ig;
  var host = window.location.host;

  if(localhost.test(host)){
    formKey = '892e0c5e4c169c6128c7342614608330';
  }
}

$nexusForm.submit(function(e){
  var charCount = $textAreaDescription.val().length;

  e.preventDefault();
  $('button', $nexusForm).prop('disabled',true);
  if(3000 < charCount) {
    showMsgError('#feedback-alert-modal-error',  charCount);
    return false;
  }
  console.log('formKey',formKey);
  $.ajax({
    dataType: 'jsonp',
    url: "https://getsimpleform.com/messages/ajax?form_api_token="+formKey,
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

function showMsgError(id, charCount){
  $('#text-overflow-message').append('<span id="feedback-contact-char-count"> Current count is '+charCount+'</span>');
  $(id).modal();
}

$btnAlertOk.on('click', function(){
  $modalAlert.modal('hide');
});

checkKey(formKey);