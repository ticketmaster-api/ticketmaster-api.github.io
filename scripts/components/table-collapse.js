(function($){

    jQuery.fn.tableCollapse = function(options ){

        var defaults = {
            scrollUpOnCollapse: true,
            fixedHeight: 400,
            scrollUpSpeed: 500,
            separationLineHeight: 30,
            additionalScrollSpace: 50,
            cssClass: 'table_collapse',
            cssClassBtn: 'table_collapse__btn',
            cssClassBtnClose: 'table_collapse__btn-collapsed'
        },
        settings = $.extend( {}, defaults, options),
        $htmlBody = $('body, html'),
        $window = $(window);

        return this.each(function() {
            var $this = $(this),
                originalHeight = Number($this.outerHeight(true));

            if(originalHeight > settings.fixedHeight){
                originalHeight += settings.separationLineHeight;
                $this.wrap('<div></div>');

                var $btn = $('<div></div>', {
                        'class': settings.cssClassBtn + ' ' + settings.cssClassBtnClose
                    }),
                    $tableCollapse = $this.parent()
                        .addClass(settings.cssClass)
                        .css({height: settings.fixedHeight});

                $this.after($btn);

                (function setToggle(show){
                    $btn.one('click', function(){
                        var newHeight = originalHeight;
                        if(show){
                            $btn.removeClass(settings.cssClassBtnClose);
                        }else{
                            $btn.addClass(settings.cssClassBtnClose);
                            newHeight = settings.fixedHeight;
                            // Scroll up window if wrapper head invisible
                            if(settings.scrollUpOnCollapse){
                                var dif = $window.scrollTop() - $this.offset().top;
                                if(dif > 0)
                                    $htmlBody.animate({
                                        scrollTop: $window.scrollTop() - dif - settings.additionalScrollSpace
                                    }, settings.scrollUpSpeed);
                            }
                        }

                        $tableCollapse.css({
                            height: newHeight + 'px'
                        });

                        setToggle(!show); // Set inverted button handler
                    });
                })(true); // Set button handler
            }
        });
    };
})(jQuery);



$(document).on('ready', function () {
    $('.table-wrapper').tableCollapse();
});
