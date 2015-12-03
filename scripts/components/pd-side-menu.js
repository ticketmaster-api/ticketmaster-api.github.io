(function(){
    $(document).ready(function() {
        var secondaryNav = $('.aside-menu'),
            secondaryNavMargin = secondaryNav.first().css('margin-top').replace("px", ''),
            firstLiElem = secondaryNav.first().css('height').replace("px", ''),
            wrapperMenu = $(".wrapper-aside-menu").offset().top,
            offset = $('.aside-menu').offset().top;

        firstLiElem = parseFloat(firstLiElem);
        offset = offset-secondaryNavMargin;

        $(window).on({
            resize:function(){
                firstLiElem = $('.menu-header').first().css('height').replace("px", ''),
                    firstLiElem = parseFloat(firstLiElem);
                offset = wrapperMenu + firstLiElem;
            },
            scroll:function(){
                if ($(window).scrollTop() > offset) {
                    secondaryNav.addClass('is-fixed');
                } else {
                    secondaryNav.removeClass('is-fixed');
                };

                //show active nav item
                var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
                var windowHeight = $(window).height(); // get the height of the window
                var docHeight = $(document).height();

                for (var i=0; i < aArray.length; i++) {
                    var theID = aArray[i];
                    //console.log('theID',  theID );
                    var divPos = $(aChildren[i]).offset().top;
                    var divHeight = $(aChildren[i]).height();

                    //console.log('windowPos', windowPos , 'divPos' , divPos , 'divHeight',divHeight);

                    if (windowPos >= divPos) {console.log('ok');}

                    if (windowPos >= divPos && windowPos > (divPos + divHeight)) {
                        $("a[href='" + theID + "']").addClass("nav-active");
                        //console.log('should addClass');
                    } else {
                        $("a[href='" + theID + "']").removeClass("nav-active");
                        //console.log('else');
                    }
                }

                if(windowPos + windowHeight == docHeight) {
                    if (!$("ul li:last-child a").hasClass("nav-active")) {
                        var navActiveCurrent = $(".nav-active").attr("href");
                        $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
                        $("ul li:last-child a").addClass("nav-active");
                    }
                }
            }
        });


        //show active menu
        var aChildren = $(".aside-menu li").children(); // find the a children of the list items
        var aArray = []; // create the empty aArray
        //console.log('find :',  aChildren.length ,' aChildren');
        for (var i=0; i < aChildren.length; i++) {
            var aChild = aChildren[i];
            var ahref = $(aChild).attr('href');
            //console.log('aChild',  aChild )
            aArray.push(ahref);
        } // this for loop fills the aArray with attribute href values



        //$(window).scroll( function(){ });

    })
})();