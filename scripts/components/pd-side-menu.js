(function(){
    $(document).ready(function() {
        var menuHeader = $('.menu-header'),
            offset = menuHeader.offset().top,
            asideBlock = $("#aside-block"),
            sideBtn = $("#side-menu-btn"),
            topbar = $('.top-bar');

        $(window).on({
            resize:function(){
                offset = menuHeader.offset().top;
            },
            scroll:function(){
                if ($(window).scrollTop() > offset) {
                    //menuHeader.addClass('is-fixed');
                    menuHeader.parent().addClass("bg-top").addClass('is-fixed');
                } else {
                    //menuHeader.removeClass('is-fixed');
                    menuHeader.parent().removeClass("bg-top").removeClass('is-fixed');
                };
            }
        });

        sideBtn.on("click", function(){
            asideBlock.toggleClass("bg-grey");
            topbar.toggleClass('grey-after');
        });
    })

})();