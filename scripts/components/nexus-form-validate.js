var $nexusForm = $('.js_nexus_form'),
  $modalAlert = $('#nexus-alert-modal'),
  $modalAlertError = $('#nexus-alert-modal-error'),
  $btnAlertOk = $modalAlert.find('#js_nexus_btn_alert_ok'),
  $btnAlertError = $modalAlertError.find('#js_nexus_btn_alert_ok-error'),
  $textAreaDescription = $('#company-detail-text'),
  formKey = '41f4cf3970c05bb985abec394b1e3c0b',
	errorDescriptionID = 'nexus-contact-char-count';

/*set new key for localhost*/
function checkKey() {
  var localhost = /(localhost:4000|127\.0\.0\.1)+/ig,
      host = window.location.host;

  if(localhost.test(host)){
    formKey = '3d9f2df7bef3e8bc5d9323cbea36f4d0';
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
  $.ajax({
    dataType: 'jsonp',
    url: "https://getsimpleform.com/messages/ajax?form_api_token="+formKey,
    data: $nexusForm.serialize()
  }).done(function() {
		//callback shows the 'thank you message'
    showMsgSuccess('#nexus-alert-modal');
  });
  return false; //to stop the form from submitting
});

function showMsgSuccess($modalAlert){
  // Show message
  $($modalAlert).modal();
  $nexusForm.trigger("reset");//clear on success
  $('button', $nexusForm).prop('disabled',false);
}

function showMsgError(id, charCount){
  $('#nexus-text-overflow-message').append('<span id="'+errorDescriptionID+'"> Current count is '+charCount+'</span>');
  $(id).modal();
}

function initListeners() {
	$btnAlertOk.on('click', function () {
		$modalAlert.modal('hide');
	});

	$btnAlertError.on('click', function () {
		$modalAlertError.modal('hide');

		$('#' + errorDescriptionID).remove();
		$('button', $nexusForm).attr('disabled', false);
	});
}

checkKey(formKey);

initListeners();

