(function($){

    var $modal = $('#feedback-modal'),
        $modalAlert = $('#feedback-alert-modal'),
        $form = $modal.find('#js_feedback_form'),
        $email = $form.find('#email'),
        $btn = $modal.find('#js_feedback_btn'),
        $btnAlertOk = $modalAlert.find('#js_feedback_btn_alert_ok'),
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

    function submitForm(){

        $email.val($email.val().toLocaleLowerCase());
        $.ajax({
            dataType: 'jsonp',
            url: $form.attr('action'),
            data: $form.serialize()
        }).done(function() {

            // Close dialog
            $modal.modal('hide');

            // Show message
            $modalAlert.modal();
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

    $btnAlertOk.on('click', function(){
        $modalAlert.modal('hide');
    });

    $modal.on('hidden.bs.modal', resetForm);

})(jQuery);
