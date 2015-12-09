(function(){
    $(document).ready(function() {
        var menuWraper = $('.wrapper-aside-menu'),
            offset = menuWraper.offset().top,
            sideBtn = $("#side-menu-btn"),
            asideBlock = $("#aside-block"),
            topBar = $('.top-bar').addClass('menu-bg'),
            bottomBar = $('#footer').addClass('menu-bg');

        $('body').addClass('menu-bg');

        $(window).on({
            resize:function(){
                offset = menuWraper.offset().top;
            },
            scroll:function(){
                if ($(window).scrollTop() > offset) {
                    menuWraper.parent().addClass("is-fixed");
                } else {
                    menuWraper.parent().removeClass("is-fixed");
                }
            }
        });

        sideBtn.on("click", function(){
            asideBlock.toggleClass("bg-grey");
            topBar.toggleClass('menu-bg');
            bottomBar.toggleClass('menu-bg');
        });
    })

})();