(function(){
    $(document).ready(function() {
        var secondaryNav = $('.aside-menu');
        var offset = $('.aside-menu').offset().top;

        $(window).on({
            resize:function(){
                offset = $('.aside-menu').offset().top;
            },
            scroll:function(){
                var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page (will be used for active-nav class)

                if ($(window).scrollTop() > offset) {
                    secondaryNav.addClass('is-fixed');
                } else {
                    secondaryNav.removeClass('is-fixed');
                };

            }
        });
    })
})();