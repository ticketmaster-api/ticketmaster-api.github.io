(function($){

    jQuery.fn.checkNumeric = function(options ){

        var defaults = {
            scrollUpOnCollapse: true
        },
        settings = $.extend( {}, defaults, options);

        // Redraw element for table geometry update
        function redrawElement(element){
            $(element).hide(0).show(0);
        }

        return this.each(function() {
            var $numeric_input = $(this);

            $numeric_input.focus(function() {
                $(this).prop('type', 'text')
                  .keyup(function() {
                      $(this).val($(this).val().replace(/[^\d|\s]/g, ''));
                  })
                  .blur(function() {
                      $(this).val($(this).val().replace(/[^\d]/g, ''));
                        //.prop('type', 'number');
                  });
            });

        });
    };
})(jQuery);



$(document).on('ready', function () {
    $('.js_numeric_input').checkNumeric();
});
