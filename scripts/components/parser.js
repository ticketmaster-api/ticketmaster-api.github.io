(function () {
    $(document).ready(function () {

        /*Normalize*/
        var main = $('.content');
        var firstElem = main.children().first();
        if (!firstElem.hasClass("article") && firstElem.hasClass("aside")) {
            firstElem.removeClass('aside');
        }
        if (firstElem.hasClass("aside")) {
            firstElem.prepend("<div class='article'></div>");
        } else if (!firstElem.hasClass("article")) {
            firstElem.addClass("article");
        }
        /*Normalize END*/

        main.find('.article').each(
            function () {
                var group = $(this).nextUntil('.article').addBack();
                group.wrapAll('<div class="article-wrapper"></div>');
            });

        main.find('.aside').each(
            function () {
                var me = $(this);
                var group = me.nextUntil('.article').addBack();
                var groupLeft = me.parent().children().first().nextUntil('.aside').addBack();
                var firstElemGroupLeft =groupLeft.parent().children().first();

                group.wrapAll('<div class="aside-wrapper"></div>');

                groupLeft.wrapAll('<div class="left-wrapper"></div>');

                //add underline
                if (me.hasClass('lang-selector')) {
                    firstElemGroupLeft.addClass('underline');

                    //check if heading h2 has more then 1 line (height >50)
                    var firstElemHeigh = firstElemGroupLeft.css('height').replace('px','');
                        firstElemHeigh = parseFloat(firstElemHeigh);
                    if(firstElemHeigh > 50){
                        me.children('p').css('margin-top',firstElemHeigh-50)
                    }

                    /**/
                    //add class for tabs
                    me.children().children().first().addClass('active')//set first elm active
                    $(".aside-wrapper blockquote").nextAll().addClass('tab-content'); //hide all tab-content ":not(:first-child)"
                    group.nextAll().first().addClass('tab-active');//show first tab-content
                }
                //console.log($('*').length);//As less is better
            });


        $(".lang-selector a").click(function(event) {
            var currentButton =$(this);
            //console.log( 'first of this block currentId tab: ', $('.tab-content').attr('id') );

            var allBtn = $(".lang-selector a[href*=" + currentButton.attr('href') + "]");

            event.preventDefault();
            //allBtn.parent().addClass("tab");
            allBtn.addClass("active");
            allBtn.siblings().removeClass("active");

            event.preventDefault();
            var currentClassName = $('.tab-content').attr("class");
            //var tabGroup = $(".tab-active [class*=" + currentClassName  + "]");
            var tabGroup = $('.tab-active');

            if(allBtn.hasClass('active')){

                var aClass = currentButton.attr('href');

                var strTMP = aClass.toString().replace("#","");

                tabGroup.removeClass("tab-active");
                tabGroup = $("."+strTMP );
                //console.log('new tabGroup',tabGroup);
                tabGroup.addClass("tab-active");

            }
        });

    })
})();