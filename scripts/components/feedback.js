(function($){

    var $modal = $('#feedback-modal'),
        $modalAlert = $('#feedback-alert-modal'),
        $modalAlertError = $('#feedback-alert-modal-error'),
        $form = $modal.find('#js_feedback_form'),
        $email = $form.find('#email'),
        $btn = $modal.find('#js_feedback_btn'),
        $btnAlertOk = $modalAlert.find('#js_feedback_btn_alert_ok'),
        $btnAlertError = $modalAlertError.find('#js_feedback_btn_alert_ok-error'),
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
            charCount = $textAreaDescription.val().length;
        if(3000 < charCount) {
            showMsgError('#feedback-alert-modal-error',  charCount);
            return false;
        }

        $email.val($email.val().toLocaleLowerCase());

        $.ajax({
            dataType: 'jsonp',
            url: $form.attr('action'),
            data: $form.serialize()
        }).done(function() {

            // Close dialog
            $modal.modal('hide');

            // Show message
            $modalAlert.modal('show');

        });
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
