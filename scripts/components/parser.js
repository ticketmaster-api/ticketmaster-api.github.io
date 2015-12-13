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

                    //move first element to class="aside-wrapper"
                    firstElemGroupLeft.prependTo( firstElemGroupLeft.parent().parent() );

                    //add class for tabs
                    me.children().children().first().addClass('active')//set first button active

                    $(".aside-wrapper blockquote").nextAll().addClass('tab-content' ); //hide all tab-content

                    group.nextAll().first().addClass('tab-active');//set first tab visible
                }
                //console.log($('*').length);//As less then better
            });

        var tabsCount = $('.aside-wrapper blockquote a').first().nextUntil('.article').length;
        //console.log('tabIndex2-Len nextUntil',tabsCount);

        $(".aside-wrapper blockquote").nextAll()
            .addClass(function( index ) {
                if(index>tabsCount) {
                    index = [index % (tabsCount+1)]
                };
                return "tab-" + index;
            })
            .attr( "id", function( index ) {
                if(index>tabsCount) {
                    index = [index % (tabsCount+1)]
                };
                return "tab-" + index;
            });

        if(firstElem.hasClass('underline')){
            firstElem.css('margin-right','51%');
        }

         $(".aside-wrapper > blockquote").parent('.aside-wrapper').addClass('tab-panel-offset');

        //if 1 column don't draw a line
        main.find('.article-wrapper').each(function(){
            var me = $(this);
            if ( !me.children().first().hasClass('underline') ) {
                me.children().first().css('margin-right','0');
            }
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
                var strTMP = currentButton.index().toString();

                tabGroup.removeClass("tab-active");
                tabGroup = $(".tab-"+strTMP );
                tabGroup.addClass("tab-active");
            }

        });

    })
})();