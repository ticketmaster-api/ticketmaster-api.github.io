/**
 * Validate contact us form
 */
var $contactForm = $('.js_contact_form'),
	formKey = 'd9878ccc8e22c7253d057015617f82cd',
	formKeyCC = '4dc5e322e62ad60d2b4ba5840a9c4e14',
	$textAreaDescription = $('#message-detail-text');

var $modalAlert = $('#contact-alert-modal'),
	$modalAlertError = $('#contact-alert-modal-error'),
	$btnAlertOk = $modalAlert.find('#js_contact_btn_alert_ok'),
	$btnAlertError = $modalAlertError.find('#js_contact_btn_alert_ok-error'),
	errorDescriptionID = 'char-count';

/*set new key for localhost*/
function checkKey() {
	var localhost = /(localhost:4000)+/ig,
		host = window.location.host;

	if(localhost.test(host)){
		formKey = '892e0c5e4c169c6128c7342614608330';
		formKeyCC = '4dc5e322e62ad60d2b4ba5840a9c4e14';
	}
}

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

	sendRequest(formData, formKey);
	// sendRequest(formData, formKeyCC);
	
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

checkKey(formKey);

initListeners();
