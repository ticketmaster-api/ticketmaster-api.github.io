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

        var tabsCount = 0;

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
                var firstElemGroupLeft = groupLeft.parent().children().first();

                group.wrapAll('<div class="aside-wrapper"></div>');

                groupLeft.wrapAll('<div class="left-wrapper"></div>');

                //add underline
                if (me.hasClass('lang-selector')) {
                    firstElemGroupLeft.addClass('underline');

                    //move first element to class="aside-wrapper"
                    firstElemGroupLeft.prependTo( firstElemGroupLeft.parent().parent() );

                    //add class for tabs
                    me.children().children().first().addClass('active')//set first button active

                    $(".aside-wrapper blockquote").nextAll(".highlight").addClass('tab-content' ); //hide all tab-content
                    me.children(".highlight:lt("+ tabsCount +")");

                    group.nextAll().first().addClass('tab-active');//set first tab visible
                }
                //console.log($('*').length);//As less then better
            });

        //add class and id to tab content
        tabsCount = $('.aside-wrapper blockquote a').first().nextUntil('p').length;
        $(".aside-wrapper > blockquote").parent('.aside-wrapper').addClass('tab-panel-offset');

        //add classes to tab-content
        tabsCount = tabsCount+1;
        main.find('.tab-panel-offset').each(
            function () {
                var me = $(this);
                //console.log('sibling' , me.children().siblings(":nth-child(n+1)").nextUntil(":nth-child(6)") );
                me.children(".highlight:lt("+ tabsCount +")")
                    .addClass(function (index) {
                        if (index > tabsCount) {
                            index = [index % (tabsCount + 1)]
                        }
                        return "tab-" + index;
                    })
                    .attr("id", function (index) {
                        if (index > tabsCount) {
                            index = [index % (tabsCount + 1)]
                        }
                        return "tab-" + index;
                    });
            });

        if(firstElem.hasClass('underline')){
            firstElem.css('margin-right','51%');
        }


        $('table').wrap('<div class="table-wrapper"></div>');

        //if 1 column don't draw a line
        main.find('.article-wrapper').each(function(){
            var me = $(this);
            if ( !me.children().first().hasClass('underline') ) {
                me.children().first().css('margin-right','0');
            }
        });

        $(".lang-selector a").click(function(event) {
            var currentButton =$(this);
            var allBtn = $(".lang-selector a[href*=" + currentButton.attr('href') + "]")

            event.preventDefault();
            allBtn.addClass("active");
            allBtn.siblings().removeClass("active");

            var tabGroup = $('.tab-active');

            if(allBtn.hasClass('active')){
                var strTMP = currentButton.index().toString();

                tabGroup.removeClass("tab-active");
                tabGroup = $(".tab-"+strTMP );
                tabGroup.addClass("tab-active");
            }
        });

    })
})();