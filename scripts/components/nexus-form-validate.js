var $nexusForm = $('.js_nexus_form'),
  $modalAlert = $('#nexus-alert-modal'),
  $modalAlertError = $('#nexus-alert-modal-error'),
  $btnAlertOk = $modalAlert.find('#js_nexus_btn_alert_ok'),
  $btnAlertError = $modalAlertError.find('#js_nexus_btn_alert_ok-error'),
  $textAreaDescription = $('#company-detail-text'),
  formKey = '41f4cf3970c05bb985abec394b1e3c0b';

/*set new key for localhost*/
function checkKey() {
  var localhost = /(localhost:4000)+/ig,
      host = window.location.host;

  if(localhost.test(host)){
    formKey = '892e0c5e4c169c6128c7342614608330';
  }
}

$nexusForm.submit(function(e){
  var charCount = $textAreaDescription.val().length;

  e.preventDefault();
  $('button', $nexusForm).prop('disabled',true);
  if(3000 < charCount) {
    showMsgError('#nexus-alert-modal-error',  charCount);
    return false;
  }
  console.log('formKey',formKey);
  $.ajax({
    dataType: 'jsonp',
    url: "https://getsimpleform.com/messages/ajax?form_api_token="+formKey,
    data: $nexusForm.serialize()
  }).done(function() {
    //callback which used to show a thank you message
    showMsgSuccess('#nexus-alert-modal');
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
  $('#nexus-text-overflow-message').append('<span id="nexus-contact-char-count"> Current count is '+charCount+'</span>');
  $(id).modal();
}

$btnAlertOk.on('click', function(){
  $modalAlert.modal('hide');
  resetForm(); //clear on success
});

$btnAlertError.on('click', function(){
  $modalAlertError.modal('hide');
  
  // $modal.modal('show');
  // $btn.attr('disabled', false);
});

checkKey(formKey);