(function(){
    $(document).ready(function() {
        var secondaryNav = $('#sideMenu');
        var offset = 307;

        $(window).on('scroll', function () {
            if ($(window).scrollTop() > offset) {
                secondaryNav.addClass('is-fixed');

            } else {
                secondaryNav.removeClass('is-fixed');
            }
        });
    })
})();