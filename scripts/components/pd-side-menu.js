(function(){
    $(window).load(function() {
        var secondaryNav = $('.aside-menu'),
            offset = secondaryNav.offset().top,
            firstLiElem = $(".aside-menu ul").first().css('margin-top').replace("px", '');

        Number(firstLiElem);
        Math.round(offset);
        offset = offset - firstLiElem;

        $(window).on('scroll', function () {
            if ($(window).scrollTop() > offset) {
                secondaryNav.addClass('is-fixed');
            } else {
                secondaryNav.removeClass('is-fixed');
            }
        });
    })
})();