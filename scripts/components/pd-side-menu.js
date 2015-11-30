(function(){
    $(document).ready(function() {
        var secondaryNav = $('#sideMenu'),
            secondaryNavTopPosition = 175; //secondaryNav.offset().top,
            //firstLiElem = $("#sideMenu ul").first().css('margin-top').replace("px", '');

        console.log("Name is " + navigator.appName + ". Code name is " + navigator.appCodeName)


        $(window).on('scroll', function () {
            if ($(window).scrollTop() > secondaryNavTopPosition) {
                secondaryNav.addClass('is-fixed');

            } else {
                secondaryNav.removeClass('is-fixed');
            }
        });
    })
})();