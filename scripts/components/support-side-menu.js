(function(){

    var calculate_offset = function(){
        if (window.innerWidth < 1200) {
            return -10;
        }
        return 0;
    };

    var showMenu = function(){
        if ( window.innerWidth < 1200 ) {
            $(".bg-header").add("body").addClass("menu-bg");
        }

        menu.addClass("expanded").find("ul").show();
        sideBtn.addClass("expanded").removeClass("closed");
        adjustMenuPosition();
    };

    var hideMenu = function(){
        $(".bg-header").add("body").removeClass("menu-bg");
        menu.removeClass("expanded").find("ul").hide();
        sideBtn.addClass("closed").removeClass("expanded");
    };
    var menu = $('.menu'),
        sideBtn = $("#side-menu-btn"),
        stickyHeaderTop = $('.menu').offset().top + calculate_offset(),
        belowFooter = false;

    if ( window.innerWidth < 1200 ) {
        hideMenu();
    }

    var adjustMenuPosition = function(){

        var menuTop = menu.offset().top,
            menuHeight = menu.height(),
            bottomBarOffset = $('#footer').offset().top,
            windowScrollTop = $(window).scrollTop();

        //set menu position to absolute when footer is reached
        if (window.innerWidth >= 1200){
            if (!belowFooter){
                if ((menuTop + menuHeight >= bottomBarOffset)){
                    belowFooter = true;
                    menu.addClass("below-footer").css({
                        'top': $('.base-content-wrapper').height() - $(menu).height()
                    });
                }
            }

            if (windowScrollTop <= menu.offset().top){
                belowFooter = false;
                menu.removeClass("below-footer").css({
                    'top': ''
                });
            }
        }
        else {
            menu.removeClass("below-footer").css({
                'top': ''
            });
        }
    };

    // Check the initial Poistion of the Sticky Header
    $(window).scroll(function(){
        if( $(window).scrollTop() >= stickyHeaderTop ) {
            menu.addClass("fixed");
        } else {
            menu.removeClass("fixed")
        }
        adjustMenuPosition();
    });

    window.onresize = function(event) {
        //stickyHeaderTop = menu.offset().top + calculate_offset();
        if ( window.innerWidth < 1200 ) {
            hideMenu();
        }else{
            showMenu();
        }
        adjustMenuPosition();
    };


    $(".base-content-wrapper").on("click", ".menu-header", function(){
        if( $(this).find("#side-menu-btn").hasClass("closed") ){
            showMenu();
        }
        else{
            if ( window.innerWidth < 1200 ) {
                hideMenu();
            }
        }
    });

    $(".sections").on("click", "a", function(){
        if ( window.innerWidth < 1200 ) {
            hideMenu();
        }
    });

    $(".base-content-wrapper").on("blur", ".menu.expanded", function(){
        setTimeout(hideMenu, 200)
    });

    adjustMenuPosition();

})();