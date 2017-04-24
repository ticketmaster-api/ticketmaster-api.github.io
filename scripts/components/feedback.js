(function($){

    var $modal = $('#feedback-modal'),
        $modalAlert = $('#feedback-alert-modal'),
        $modalAlertError = $('#feedback-alert-modal-error'),
        $form = $modal.find('#js_feedback_form'),
				formKey = 'd9878ccc8e22c7253d057015617f82cd', //production key
				formKeyCC = '0d9da5473940d4380dc3a16fb47a2c55', //CC key
        $email = $form.find('#email'),
        $btn = $modal.find('#js_feedback_btn'),
        $btnAlertOk = $modalAlert.find('#js_feedback_btn_alert_ok'),
        $btnAlertError = $modalAlertError.find('#js_feedback_btn_alert_ok-error'),
				errorDescriptionID = 'feedback-contact-char-count',
        cssValidationClass = 'feedback_form-validation';

    function resetForm(){
        $btn.removeAttr('disabled');
        $form.find('textarea').val('');
        $form.find('input').each(function(){
            var $self = $(this);
            if($self.attr('name')){
                $self.val('');
            }
        });

        // Clear highlight
        $form.removeClass(cssValidationClass);
    }
    function showMsgError(id, charCount){
        // Close dialog
        $modal.modal('hide');
        
        $('#text-overflow-message').append('<span id="feedback-contact-char-count"> Current count is '+charCount+'</span>');
        $(id).modal();
    }

    function submitForm(){
        var $textAreaDescription = $('#description'),
					charCount = $textAreaDescription.val().length,
					formData = $form.serialize();
					sendRequest = function (formData,formKey) {
						$.ajax({
							dataType: 'jsonp',
							url: "https://getsimpleform.com/messages/ajax?form_api_token="+formKey,
							data: formData
						}).done(function() {
							// Close dialog
							$modal.modal('hide');

							// Show message
							$modalAlert.modal('show');
						});
					};
        if(3000 < charCount) {
            showMsgError('#feedback-alert-modal-error',  charCount);
            return false;
        }

        $email.val($email.val().toLocaleLowerCase());

				//sendRequest(formData, formKey);
				sendRequest(formData, formKeyCC);
    }

    // EVENTS
    $btn.on('click', function(){
        var form = $form.get(0);
        if(!$btn.is(':disabled')){
            if(form.checkValidity()) {
                $btn.attr('disabled', true);
                submitForm();
            }else{
                // Highlight errors
                if(form.reportValidity) form.reportValidity();
                $form.addClass(cssValidationClass);
            }
        }
    });

    function clearBody(delay) {
        setTimeout(function(){
            $('body').removeAttr('style');
						$("#"+errorDescriptionID).remove();
        },delay);
    }

		/*set new key for localhost*/
		function checkKey() {
			var localhost = /(localhost:4000|127\.0\.0\.1)+/ig,
				host = window.location.host;

			if(localhost.test(host)){
				formKey = '3d9f2df7bef3e8bc5d9323cbea36f4d0' ;
				formKeyCC = '3d9f2df7bef3e8bc5d9323cbea36f4d0' ;
			}
		}

    $btnAlertOk.on('click', function(){
        $modalAlert.modal('hide');
        clearBody(310); //310 - time of fading bootstrap modal
        resetForm(); //clear on success
    });

    $btnAlertError.on('click', function(){
        $modalAlertError.modal('hide');
        clearBody(310);
        $modal.modal('show');
        $btn.attr('disabled', false);
    });

		checkKey(formKey);

    //$modal.on('hidden.bs.modal', resetForm);

})(jQuery);
