(function($){

    jQuery.fn.checkNumeric = function(options ){

        var defaults = {},
        settings = $.extend( {}, defaults, options);

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
