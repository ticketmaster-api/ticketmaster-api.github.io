(function(){

    var calculate_offset = function(){
        if (window.innerWidth < 1200) {
            return -10;
        }
        return 0;
    };

    var showMenu = function(){
        if ( window.innerWidth < 1200 ) {
            $(".bg-header").addClass("menu-bg");
        }

        menu.addClass("expanded").find("ul").show();
        sideBtn.addClass("expanded").removeClass("closed");
        adjustMenuPosition();
    };

    var hideMenu = function(){
        $(".bg-header").removeClass("menu-bg");
        menu.removeClass("expanded").find("ul").hide();
        sideBtn.addClass("closed").removeClass("expanded");
    };
    var menu = $('.menu'),
        sideBtn = $("#side-menu-btn"),
        stickyHeaderTop = $('.menu').offset().top + calculate_offset();

    if ( window.innerWidth < 1200 ) {
        hideMenu();
    }

    // Check the initial Poistion of the Sticky Header
    $(window).scroll(function(){

        console.log();
        console.log($(window).scrollTop());
        if( $(window).scrollTop() >= stickyHeaderTop ) {
            console.warn(stickyHeaderTop);
            menu.addClass("fixed");
        } else {
            menu.removeClass("fixed")
        }
    });

    window.onresize = function(event) {
        stickyHeaderTop = menu.offset().top + calculate_offset();
        if ( window.innerWidth < 1200 ) {
            hideMenu();
        }else{
            showMenu();
        }
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

})();