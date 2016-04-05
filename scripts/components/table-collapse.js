(function($){

    jQuery.fn.tableCollapse = function(options ){

        var defaults = {
            scrollUpOnCollapse: true,
            fixedHeight: 400,
            scrollUpSpeed: 500,
            separationLineHeight: 0,
            additionalScrollSpace: 50,
            cssClass: 'table_collapse',
            cssClassBtn: 'table_collapse__btn',
            cssClassInner: 'table_collapse__inner',
            cssClassCollapsed: 'table_collapse-collapsed',
            title: 'Expand',
            titleCollapse: 'Collapse',
            tooltipPosition: 'top'
        },
        settings = $.extend( {}, defaults, options),
        $htmlBody = $('body, html'),
        $window = $(window);

        // Redraw element for table geometry update
        function redrawElement(element){
            $(element).hide(0).show(0);
        }

        return this.each(function() {
            var $this = $(this),
                collapsed = true,
                originalHeight = parseInt($this.outerHeight(true)) - parseInt($this.css('margin-top'));

            if(originalHeight > settings.fixedHeight){

                function setTitle(title){
                    $btn.text(title);
                }

                originalHeight += settings.separationLineHeight;
                var wrapper = "<div class='" + settings.cssClass + " " + settings.cssClassCollapsed + "'>" +
                    "<div class='" + settings.cssClassInner + "' style='height:" + settings.fixedHeight + "px'></div>" +
                    "</div>";
                $this.wrap(wrapper);

                var $btn = $('<div></div>', {
                        text: settings.title,
                        'class': settings.cssClassBtn
                    }),
                    $tableCollapseInner = $this.parent(),
                    $tableCollapse = $tableCollapseInner.parent();

                $tableCollapseInner.after($btn);

                // Events
                (function setToggle(show){
                    $btn.one('click', function(){
                        collapsed = !collapsed;

                        var newHeight = originalHeight;
                        if(show){
                            $tableCollapse.removeClass(settings.cssClassCollapsed);
                            setTitle(settings.titleCollapse);
                        }else{
                            $tableCollapse.addClass(settings.cssClassCollapsed);
                            newHeight = settings.fixedHeight;
                            setTitle(settings.title);

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
                        redrawElement($this);

                        setToggle(!show); // Set inverted button handler
                    });
                })(true); // Set button handler

                var delay = (function(){
                    var timer = 0;
                    return function(callback, ms){
                        clearTimeout (timer);
                        timer = setTimeout(callback, ms);
                    };
                })();

                // Recalculate originalHeight on window scroll
                $(window).resize(function() {
                    delay(function(){
                        if(collapsed){
                            $tableCollapseInner.css({'overflow-y': 'hidden'});
                            redrawElement($this);
                        }

                        setTimeout(function(){
                            originalHeight = parseInt($this.outerHeight(true)) + settings.separationLineHeight;
                            if(!collapsed) {
                                $tableCollapseInner.css({
                                    height: originalHeight + 'px'
                                });
                            }else {
                                $tableCollapseInner.css({'overflow-y': ''});
                                redrawElement($this);
                            }
                        }, 10);

                    }, 300);
                });
            }
        });
    };
})(jQuery);



$(document).on('ready', function () {
    $('.table-wrapper').tableCollapse();
});
