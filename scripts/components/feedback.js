(function($){
    // Used Qualaroo form

    var $feedbackOpenBtn = $('#js_feedback_open'),
        $modal = $('#feedback-modal'),
        $form = $modal.find('#js_feedback_form'),
        $btn = $modal.find('#js_feedback_btn'),
        cssValidationClass = 'feedback_form-validation';

    // EVENTS
    $btn.on('click', function(){
        var form = $form.get(0);

        if(form.checkValidity()) {

            var dataArray = $form.serializeArray(),
                $qualarooForm = $('#qual_ol_ans_box');

            // Copy values to Qualaroo form
            for(var i in dataArray){
                if(dataArray[i].name === 'description'){
                    $qualarooForm.find('textarea').val(dataArray[i].value);
                }else{
                    $qualarooForm.find("input:eq(" + i +")").val(dataArray[i].value);
                }

                // TODO: Need to clear dialog form
                // TODO: Need to unbind Qualaroo responseSent event. S3 response - 'try { KI.event.fire('responseSent'); } catch (e) {}'
            }

            // Submit Qualaroo form
            $('#qual_ol_send').trigger('click');

            // Close dialog
            $modal.modal('hide');

            // Hide feedback button
            $feedbackOpenBtn.hide();

        }else{
            // Highlight errors
            if(form.reportValidity) form.reportValidity();
            $form.addClass(cssValidationClass);
        }
    });

})(jQuery);
