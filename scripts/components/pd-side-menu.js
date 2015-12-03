(function(){
    $(document).ready(function() {
        var secondaryNav = $('.aside-menu'),
            secondaryNavMargin = secondaryNav.first().css('margin-top').replace("px", ''),
            firstLiElem = secondaryNav.first().css('height').replace("px", ''),
            wrapperMenu = $(".wrapper-aside-menu").offset().top,
            offset = $('.aside-menu').offset().top;

        firstLiElem = parseFloat(firstLiElem);
        offset = offset-secondaryNavMargin;

        $(window).on({
            resize:function(){
                firstLiElem = $('.menu-header').first().css('height').replace("px", ''),
                    firstLiElem = parseFloat(firstLiElem);
                offset = wrapperMenu + firstLiElem;
            },
            scroll:function(){
                var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page (will be used for active-nav class)

                if (windowPos > offset) {
                    secondaryNav.addClass('is-fixed');
                } else {
                    secondaryNav.removeClass('is-fixed');
                };

            }
        });
    })
})();