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
            cssClassInner: 'table_collapse__inner',
            cssClassCollapsed: 'table_collapse-collapsed'
        },
        settings = $.extend( {}, defaults, options),
        $htmlBody = $('body, html'),
        $window = $(window);

        return this.each(function() {
            var $this = $(this),
                originalHeight = parseInt($this.outerHeight(true)) - parseInt($this.css('margin-top'));

            if(originalHeight > settings.fixedHeight){
                originalHeight += settings.separationLineHeight;
                var wrapper = "<div class='" + settings.cssClass + " " + settings.cssClassCollapsed + "'>" +
                    "<div class='" + settings.cssClassInner + "' style='height:" + settings.fixedHeight + "px'></div>" +
                    "</div>";
                $this.wrap(wrapper);

                var $btn = $('<div></div>', {
                        'class': settings.cssClassBtn
                    }),
                    $tableCollapseInner = $this.parent(),
                    $tableCollapse = $tableCollapseInner.parent();

                $tableCollapseInner.after($btn);

                (function setToggle(show){
                    $btn.one('click', function(){
                        var newHeight = originalHeight;
                        if(show){
                            $tableCollapse.removeClass(settings.cssClassCollapsed);
                        }else{
                            $tableCollapse.addClass(settings.cssClassCollapsed);
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

                        $tableCollapseInner.css({
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
