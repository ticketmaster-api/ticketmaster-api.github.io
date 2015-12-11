(function(){
    $(document).ready(function() {
        var menuWraper = $('.wrapper-aside-menu'),
            offset = menuWraper.offset().top,
            sideBtn = $("#side-menu-btn"),
            asideBlock = $("#aside-block"),
            topBar = $('.top-bar').addClass('menu-bg'),
            bottomBar = $('#footer').addClass('menu-bg'),
            menu = $('ul.aside-menu'),
            initialMenuHeight = menu.height(),
            $body = $('body').addClass('menu-bg'),
            screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        var showMenu = function(){
            asideBlock.addClass("has-bg");
            topBar.addClass('menu-bg');
            bottomBar.addClass('menu-bg');
            $body.addClass('menu-bg');
            if (asideBlock.hasClass("is-fixed")){
                $body.addClass('no-scroll');
            }
            menu.show();
            sideBtn.addClass("expanded").removeClass("closed");
        };

        var hideMenu = function(){
            asideBlock.removeClass("has-bg");
            topBar.removeClass('menu-bg');
            bottomBar.removeClass('menu-bg');
            $body.removeClass('menu-bg no-scroll');
            menu.hide();
            sideBtn.addClass("closed").removeClass("expanded");
        };

        var fixMenuHeight = function(){

            var menuTop = menu.offset().top,
                menuHeight = menu.height(),
                bottomBarOffset = bottomBar.offset().top,
                maxHeight =  bottomBarOffset - menuTop + 40;

            //lower menu height when scrolled to bottom
            if (menuTop + menuHeight >= bottomBarOffset){
                menu.css('max-height', maxHeight + 'px');
            }
            else {
                if (menuHeight < initialMenuHeight){
                    menu.css('max-height', maxHeight + 'px');
                }
                else {
                    menu.css('max-height', '');
                }
            }
        };

        if (screenWidth < 1200){
            hideMenu();
        }

        $(window).on({
            resize: function(){

                var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                screenWidth = w;

                if (w >= 1200){
                    showMenu();
                    fixMenuHeight();
                }
                else {
                    menu.css('max-height', '');
                }

            },
            scroll:function(){

                //fix side menu position on scroll
                if ($(window).scrollTop() > offset) {
                    asideBlock.addClass("is-fixed");
                } else {
                    asideBlock.removeClass("is-fixed");
                }

                if (screenWidth >= 1200)
                    fixMenuHeight();
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