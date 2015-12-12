(function(){
    $(document).ready(function() {
        var menuWraper = $('.wrapper-aside-menu'),
            offset = menuWraper.offset().top,
            sideBtn = $("#side-menu-btn"),
            asideBlock = $("#aside-block"),
            topBar = $('.top-bar').addClass('menu-bg'),
            bottomBar = $('#footer').addClass('menu-bg'),
            menu = document.getElementById('scrollable-element'),
            initialMenuHeight = $(menu).height(),
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
            $(menu).show();
            sideBtn.addClass("expanded").removeClass("closed");
        };

        var hideMenu = function(){
            asideBlock.removeClass("has-bg");
            topBar.removeClass('menu-bg');
            bottomBar.removeClass('menu-bg');
            $body.removeClass('menu-bg no-scroll');
            $(menu).hide();
            sideBtn.addClass("closed").removeClass("expanded");
        };

        var fixMenuHeight = function(){

            var menuTop = $(menu).offset().top,
                menuHeight = $(menu).height(),
                bottomBarOffset = bottomBar.offset().top,
                maxHeight =  bottomBarOffset - menuTop;

            //lower menu height when scrolled to bottom
            if (menuTop + menuHeight >= bottomBarOffset){
                $(menu).css('max-height', maxHeight + 'px');
            }
            else {
                if (menuHeight < initialMenuHeight){
                    $(menu).css('max-height', bottomBarOffset - menuTop + 'px');
                }
                else {
                    $(menu).css('max-height', '');
                }
            }
        };

        var adjustMenuPosition = function(){
            //fix side menu position on scroll
            if ($(window).scrollTop() > offset) {
                asideBlock.addClass("is-fixed");
            } else {
                asideBlock.removeClass("is-fixed");
            }

            if (screenWidth >= 1200)
                fixMenuHeight();
        };

        adjustMenuPosition();

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
                    $(menu).css('max-height', '');
                }

            },
            scroll:function(){

                adjustMenuPosition();

                var winTop = $(window).scrollTop();

                var top = $.grep($('.article'), function(item) {
                    return $(item).offset().top >= winTop;
                });

                $(menu).find('a').removeClass('current');
                $(menu).find("a[href='#" + $(top[0]).attr('id') + "']").addClass('current');

            }
        });

        $(".menu-header").on("click", function(){
            if (sideBtn.is(":visible")){
                if (sideBtn.hasClass("closed")){
                    showMenu();
                }
                else {
                    hideMenu();
                }
            }
        });

        // prevent document from scrolling when menu is scrolled
        var isMacWebkit = (navigator.userAgent.indexOf("Macintosh") !== -1 &&
            navigator.userAgent.indexOf("WebKit") !== -1);
        var isFirefox = (navigator.userAgent.indexOf("firefox") !== -1);

        // Register mousewheel event handlers.
        menu.onwheel = wheelHandler;       // Future browsers
        menu.onmousewheel = wheelHandler;  // Most current browsers
        if (isFirefox) {              // Firefox only
            menu.scrollTop = 0;
            menu.addEventListener("DOMMouseScroll", wheelHandler, false);
        }

        function wheelHandler(event) {
            var e = event || window.event;  // Standard or IE event object

            var deltaX = e.deltaX * -30 ||  // wheel event
                e.wheelDeltaX / 4 ||  // mousewheel
                0;    // property not defined
            var deltaY = e.deltaY * -30 ||  // wheel event
                e.wheelDeltaY / 4 ||  // mousewheel event in Webkit
                (e.wheelDeltaY === undefined &&      // if there is no 2D property then
                e.wheelDelta / 4) ||  // use the 1D wheel property
                e.detail * -10 ||  // Firefox DOMMouseScroll event
                0;     // property not defined

            if (isMacWebkit) {
                deltaX /= 30;
                deltaY /= 30;
            }
            e.currentTarget.scrollTop -= deltaY;
            if (isFirefox && e.type !== "DOMMouseScroll")
                menu.removeEventListener("DOMMouseScroll", wheelHandler, false);

            if (e.preventDefault) e.preventDefault();
            if (e.stopPropagation) e.stopPropagation();
            e.cancelBubble = true;  // IE events
            e.returnValue = false;  // IE events
            return false;
        }
    })

})();