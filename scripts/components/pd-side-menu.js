(function(){
    $(document).ready(function() {
        var menuWraper = $('.wrapper-aside-menu'),
            offset = menuWraper.offset().top,
            sideBtn = $("#side-menu-btn"),
            asideBlock = $("#aside-block"),
            topBar = $('.top-bar').addClass('menu-bg'),
            bottomBar = $('#footer').addClass('menu-bg'),
            menu = $('ul.aside-menu'),
            $body = $('body').addClass('menu-bg');

        var showMenu = function(){
            asideBlock.addClass("has-bg");
            topBar.addClass('menu-bg');
            bottomBar.addClass('menu-bg');
            $body.addClass('menu-bg');
            menu.show();
            sideBtn.addClass("expanded").removeClass("closed");
        };

        var hideMenu = function(){
            asideBlock.removeClass("has-bg");
            topBar.removeClass('menu-bg');
            bottomBar.removeClass('menu-bg');
            $body.removeClass('menu-bg');
            menu.hide();
            sideBtn.addClass("closed").removeClass("expanded");
        };

        if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < 1200){
            hideMenu();
        }

        $(window).on({
            resize: function(){
                var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                if (w >= 1200){
                    showMenu();
                }
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
            if ($(this).hasClass("closed")){
                showMenu();
            }
            else {
                hideMenu();
            }
        });
    })

})();