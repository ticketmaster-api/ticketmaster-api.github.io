/**
 * availiable option : {floatVal:true}
 * $('.js_numeric_input').checkNumeric( {floatVal:true} );
 * or add attribute to html: data-float="true"

 * markup example:
 * <input class="js_numeric_input" type="number" value="12" max="15" min="10" required="" step="2" data-float="true">
 */
(function($){

    jQuery.fn.lazySelector = function(options ){

        var defaults = {},
            settings = $.extend( {}, defaults, options),
            $iconButton = '<a class="icon" id="get-event-by-Id" data-toggle="modal" data-target="#js_ls-modal"></a>';

        var $modal = $('#get-eventId-modal'),
            $form = $('#js_get_eventId_form', $modal),
            $ul = $('#js_get_eventId_list'),
            $btn = $modal.find('#js_ls-modal_btn'),
            //$resultsCount = $form.find('.get_eventId_results'),
            cssValidationClass = 'get-eventId_form-validation';

        function init( numericInput ) {
            numericInput.wrap('<div class="lazy-selector-wrapper"></div>');
            numericInput.after( $iconButton );
        }

        return this.each(function() {
            var $input = $(this);
            init($input);
            console.info('$input'  , $input);
        });

        // EVENTS
        $btn.on('click', function(){
            console.log('click $btn' );
            var form = $form.get(0);
            if(!$btn.is(':disabled')){
                if(form.checkValidity()) {
                    $btn.attr('disabled', true);
                    pageIncrement = 0;
                    loadingFlag = 'KEEP_LOAD';
                    loading('on'); //show loading-spinner
                    resetForm(); //clear
                    submitForm(pageIncrement);
                }else{
                    // Highlight errors
                    if(form.reportValidity) form.reportValidity();
                    $form.addClass(cssValidationClass);
                }
            }
        });
    };
})(jQuery);

$(document).on('ready', function () {
    $('.js_lazy-selector').lazySelector( );
});
