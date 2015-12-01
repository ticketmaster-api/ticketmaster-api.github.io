(function(){
    $(document).ready(function() {
        var secondaryNav = $('#sideMenu');
        var offset = 307;

        console.log([$('#sideMenu').offset().top,offset]);

        $(window).on('scroll', function () {
            console.log($(window).scrollTop());
            if ($(window).scrollTop() > offset) {
                secondaryNav.addClass('is-fixed');

            } else {
                secondaryNav.removeClass('is-fixed');
            }
        });
    })
})();