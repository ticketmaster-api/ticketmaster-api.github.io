(function($){

    var $modal = $('#feedback-modal'),
        $modalAlert = $('#feedback-alert-modal'),
        $modalAlertError = $('#feedback-alert-modal-error'),
        $form = $modal.find('#js_feedback_form'),
				formKey = simpleFormService.checkKey('d9878ccc8e22c7253d057015617f82cd'/*production key*/,null)[0],
				/* formKeyCC = simpleFormService.checkKey(null,'0d9da5473940d4380dc3a16fb47a2c55')[1], */
	      formKeyCC = simpleFormService.checkKey(null,'f4a6500b8d01c981db58b4b859b78224'/*CC production key*/)[1],
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

    //$modal.on('hidden.bs.modal', resetForm);

})(jQuery);
