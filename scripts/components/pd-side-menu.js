(function(){
    $(document).ready(function() {
        var menuWraper = $('.wrapper-aside-menu'),
            asideBlock = $("#aside-block"),
            offset = asideBlock.offset().top,
            sideBtn = $("#side-menu-btn"),
            topBar = $('.top-bar').addClass('menu-bg'),
            bottomBar = $('#footer').addClass('menu-bg'),
            menu = document.getElementById('scrollable-element'),
            $body = $('body').addClass('menu-bg'),
            screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            dragging = false,
            belowFooter = false;

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
            adjustMenuPosition();
        };

        var hideMenu = function(){
            asideBlock.removeClass("has-bg");
            topBar.removeClass('menu-bg');
            bottomBar.removeClass('menu-bg');
            $body.removeClass('menu-bg no-scroll');
            $(menu).hide();
            sideBtn.addClass("closed").removeClass("expanded");
        };

        var adjustMenuPosition = function(){

            var menuTop = $(menu).offset().top,
                menuHeight = $(menu).height(),
                bottomBarOffset = bottomBar.offset().top,
                windowScrollTop = $(window).scrollTop();

            //fix side menu position on scroll
            if ((windowScrollTop > offset)) {
                asideBlock.addClass("is-fixed");

            } else {
                asideBlock.removeClass("is-fixed");
            }

            //set menu position to absolute when footer is reached
            if (!belowFooter){
                if ((menuTop + menuHeight >= bottomBarOffset)){
                    belowFooter = true;
                    menuWraper.css({
                        'position': 'absolute',
                        'top': $('.documentation').height() - $(menu).height() - $('#aside-heading').height() - /*margins*/44,
                        'height': $(menu).height() + $('#aside-heading').height() + /*margins*/44,
                        'width': 100 + '%'
                    });
                }
            }

            if (windowScrollTop <= menuWraper.offset().top){
                belowFooter = false;
                menuWraper.css({
                    'position': '',
                    'top': '',
                    'width': '',
                    'height': ''
                });
            }
        };

        adjustMenuPosition();

        if (screenWidth < 1200){
            hideMenu();
        }

        $(window).on({
            resize: function(){

                var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

                if (w >= 1200){
                    showMenu();
                    //fixMenuHeight();
                }
                else {
                    if (screenWidth >= 1200)
                        hideMenu();
                    $(menu).css('max-height', '');
                }

                screenWidth = w;

            },
            scroll:function(){
                adjustMenuPosition();
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

        $(".sections").on("click", function(e){
           if (e.target.tagName == "A"){
               hideMenu();
           }
        });

        //using document click listener since mobile iOS touch devices do not understand blur event
        $(document).on("touchend click", function (e) {
            if (dragging)
                return;
            if (!asideBlock.is(e.target)
                && asideBlock.has(e.target).length === 0
                && screenWidth < 1200) {
                hideMenu();
            }
        });

        //this is to ensure menu does not disappear when user just scrolls through the content
        $("body").on("touchmove", function(){
            dragging = true;
        });

        $("body").on("touchstart", function(){
            dragging = false;
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
            if (screenWidth >= 768 ){
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
        }
    })

})();