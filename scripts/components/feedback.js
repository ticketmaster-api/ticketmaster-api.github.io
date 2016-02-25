(function($){

    var $modal = $('#feedback-modal'),
        $modalAlert = $('#feedback-alert-modal'),
        $form = $modal.find('#js_feedback_form'),
        $email = $form.find('#email'),
        $btn = $modal.find('#js_feedback_btn'),
        $btnAlert = $modal.find('#js_feedback_btn_alert'), //tmp
        $btnAlertOk = $modal.find('#js_feedback_btn_alert'),
        cssValidationClass = 'feedback_form-validation';

    function resetForm(){
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
            $modalAlert.modal();
            //showErrorPopup('Thank you for contacting us!','We will review and respond promptly.');
        });

        // Close dialog
        $modal.modal('hide');
    }

    var showErrorPopup = function(message,message2){
        var alert = $('#alert-modal');
        alert.find('#modal-body').text(message).text(message2);
        alert.modal();
    };

    // EVENTS
    $btn.on('click', function(){
        var form = $form.get(0);

        if(form.checkValidity()) {
            submitForm();
        }else{
            // Highlight errors
            if(form.reportValidity) form.reportValidity();
            $form.addClass(cssValidationClass);
        }
    });
    $btnAlertOk.on('click', function(){
        $modalAlert.modal('hide');
    });

    //show test modal
    $btnAlert.on('click', function(){
        $modalAlert.modal(); //gray button
    });


    $modal.on('hide.bs.modal', resetForm);

})(jQuery);
