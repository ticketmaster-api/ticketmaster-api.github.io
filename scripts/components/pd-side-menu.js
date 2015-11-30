(function(){
    $(document).ready(function() {
        var secondaryNav = $('#sideMenu'),
            secondaryNavTopPosition = secondaryNav.offset().top,
            firstLiElem = $("#sideMenu ul").first().css('margin-top').replace("px", '');

        Number(firstLiElem);
        secondaryNavTopPosition = secondaryNavTopPosition - firstLiElem;

        $(window).on('scroll', function () {
            if ($(window).scrollTop() > secondaryNavTopPosition) {
                secondaryNav.addClass('is-fixed');

            } else {
                secondaryNav.removeClass('is-fixed');
            }
        });
    })
})();