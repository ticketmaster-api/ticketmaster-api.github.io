/**
 * Validate contact us form
 */
var $contactForm = $('.js_contact_form'),
	formKey = simpleFormService.checkKey('d9878ccc8e22c7253d057015617f82cd'/*production key*/,null)[0],
	/* formKeyCC = simpleFormService.checkKey(null,'0d9da5473940d4380dc3a16fb47a2c55')[1], */
	formKeyCC = simpleFormService.checkKey(null,'f4a6500b8d01c981db58b4b859b78224' /*CC production key*/)[1],
	$textAreaDescription = $('#message-detail-text');

var $modalAlert = $('#contact-alert-modal'),
	$modalAlertError = $('#contact-alert-modal-error'),
	$btnAlertOk = $modalAlert.find('#js_contact_btn_alert_ok'),
	$btnAlertError = $modalAlertError.find('#js_contact_btn_alert_ok-error'),
	errorDescriptionID = 'char-count';

$contactForm.submit(function(e){
	var charCount = $textAreaDescription.val().length;
	function sendRequest(formData,formKey) {
		$.ajax({
			dataType: 'jsonp',
			url: "https://getsimpleform.com/messages/ajax?form_api_token="+formKey,
			data: formData
		}).done(function() {
			//callback shows the 'thank you message'
			showMsgSuccess('#contact-alert-modal');
		});
	}

	e.preventDefault();
	$('button', $contactForm).prop('disabled',true);

	if(3000 < charCount) {
		showMsgError('#contact-alert-modal-error',  charCount);
		return false;
	}
	var formData = $contactForm.serialize();

	//sendRequest(formData, formKey);
	sendRequest(formData, formKeyCC);
	
	return false; //to stop the form from submitting
});

function showMsgSuccess($modalAlert){
	// Show message
	$($modalAlert).modal();
	$contactForm.trigger("reset"); //clear on success
	$('button', $contactForm).prop('disabled',false);
}

function showMsgError(id, charCount){
	$('#nexus-text-overflow-message').append('<span id="'+errorDescriptionID+'"> Current count is '+charCount+'</span>');
	$(id).modal();
}

function initListeners() {

	$btnAlertOk.on('click', function(){
		$modalAlert.modal('hide');
	});

	$btnAlertError.on('click', function(){
		$modalAlertError.modal('hide');
		$('#'+errorDescriptionID).remove();
		$('button', $contactForm).attr('disabled', false);
	});
	
}

initListeners();
