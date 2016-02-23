(function($){

    var $modal = $('#feedback-modal'),
        $form = $modal.find('#js_feedback_form'),
        $email = $form.find('#email'),
        $btn = $modal.find('#js_feedback_btn'),
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
            //alert("Thank you.");
        });

        // Close dialog
        $modal.modal('hide');
    }

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

    $modal.on('hide.bs.modal', resetForm);

})(jQuery);
