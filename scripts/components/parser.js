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

        var tabsCount = 0,
            drawHideCodeBtn = false,
            clipboard = new Clipboard('.copy-btn'),
            clipboardFs = new Clipboard('.copy-btn-fs'),
            $modal = $(".fs-modal"),
            $modalBody = $(".modal-body",$modal);

        if(clipboardFs) {
            $.fn.modal.Constructor.prototype.enforceFocus = function () {};
        }

				updateEventpanelCounters('events');
				/**
				 * Get data for Counter
				 * @param url {string}
				 */
				function updateEventpanelCounters(url) {
					if (url !== 'countries') {
						$.ajax({
							method: 'GET',
							url: ['https://degratnik-prod.apigee.net/discovery-api-proxy/v2/', url, '.json','?size=1','&locale=fr,de,fi,no,sv,nl,pl,es,da,en'].join(''),
							async: true,
							dataType: "json"
						}).then(function (data) {
							$('.js_available-events').text(data.page.totalPages.toLocaleString());
						}).fail(function (err) {
							console.error('Error: ', err);
						})
					}
				}

        function toggleCodePanel(targetElement){
            var $textBtns = $('.toggle-code-btn'),
                headers = $('.underline'),
                leftPanels = $('.left-wrapper'),
                codePanels = $(".tab-panel-offset"),
                expandCssClass = 'expand',
                collapseCssClass = 'collapse-code-column',
                textHide = 'HIDE CODE',
                textShow = 'SHOW CODE',
                excludeElemList = leftPanels.contents('.lead'); //exclude collapse element if it contain '.lead'

            if( codePanels.hasClass('collapse-code-column') ){
                codePanels.removeClass(collapseCssClass);
                leftPanels.removeClass(expandCssClass);
                headers.removeClass(expandCssClass);
                $textBtns.html(textHide + '<span></span>');
            }else {
                codePanels.addClass(collapseCssClass);
                leftPanels.addClass(expandCssClass);
                headers.addClass(expandCssClass);
                $textBtns.html(textShow + '<span class="icon-arrow-down"></span>');
            }
            excludeElemList.parent('.left-wrapper').removeClass(expandCssClass);

            $(window).trigger('resize');// update tables size
        }

        main.find('.article').each(
            function () {
                var group = $(this).nextUntil('.article').addBack();
                group.wrapAll('<div class="article-wrapper"></div>');
            });

        main.find('.aside').each(function () {
            var me = $(this),
                group = me.nextUntil('.article').addBack(),
                groupLeft = me.parent().children().first().nextUntil('.aside').addBack(),
                firstElemGroupLeft = groupLeft.parent().children().first(),
                consoleBtn = $(document.createElement("a")).addClass("console-btn").attr("href", "#"),
                toggleCodeBtn = $(document.createElement("button")).addClass("toggle-code-btn scale-on-hover");

            group.wrapAll('<div class="aside-wrapper"></div>');

            groupLeft.wrapAll('<div class="left-wrapper"></div>');

            //add link to console button
            if (firstElemGroupLeft.hasClass("console-link")){
                //firstElemGroupLeft.append(consoleBtn);
            }

            //add underline
            if (me.hasClass('lang-selector')) {

                firstElemGroupLeft.addClass('underline');

                if( !drawHideCodeBtn ){
                    toggleCodeBtn.html('HIDE CODE' + '<span></span>');
                    $('.content').append(toggleCodeBtn);
                    drawHideCodeBtn = true;
                }

                //move first element to class="aside-wrapper"
                firstElemGroupLeft.prependTo( firstElemGroupLeft.parent().parent() );

                /*parse tabs*/
                me.children().children().first().addClass('active');//set first button active

                tabsCount = $('.aside-wrapper blockquote a').first().nextUntil('p').length+1;

                me.siblings(':lt('+tabsCount+')')
                  .addClass('tab-content')
                  .addClass(function (index) {
                    if (index > tabsCount) {
                        index = [index % (tabsCount + 1)];
                    }
                    return "tab-" + index;
                  }).each(function(){

                    var screenBtn = document.createElement("div");
                    screenBtn.className = "screen-btn";
                    screenBtn.setAttribute("data-toggle", "modal");
                    screenBtn.setAttribute("data-target", ".modal-langs");
                    screenBtn.setAttribute("rel", "tooltip");
                    screenBtn.setAttribute("data-placement", "top");
                    screenBtn.setAttribute("data-original-title", "View Full Screen");
                    var html_s = this.outerHTML;
                    var proxyItem_s = document.createElement("div");
                    proxyItem_s.innerHTML = html_s;


                    screenBtn.addEventListener("click", function(){
                        var title = $(this).parent().parent().parent().find('h2')
                            .clone(true)
                            .find('a')
                            .remove()
                            .end()
                            .html();

                        var content = $(this).parent().parent()
                            .clone(true)
                            .find('.active-lang')
                            .remove()
                            .end()
                            .find('.tooltip')
                            .remove()
                            .end()
                            .find('.copy-btn')
                            .addClass('copy-btn-fs')
                            .removeClass('copy-btn')
                            .end()
                            .find('.screen-btn')
                            .attr('data-original-title', 'Exit Full Screen')
                            .end()
                            .html();

                        $("#modal-title", $modal).html(title);
                        $modalBody.html(content);

                        $modalBody.delegate(".lang-selector a", "click", function() {
                            $(".aside.lang-selector a").eq($(this).index()).click();
                            $(this).parent().children().removeClass("active");
                            $(this).addClass("active");
                            $(this).parents().closest(".modal-body").children().removeClass("tab-active");
                            $(this).parents().closest(".modal-body").children().eq($(this).index() + 1).addClass("tab-active");
                        });
                    });

                    var rawBtn = document.createElement("div");
                        rawBtn.className = "raw-btn";
                        rawBtn.setAttribute("rel", "tooltip");
                        rawBtn.setAttribute("data-placement", "top");
                        rawBtn.setAttribute("data-original-title", "View Raw");
                    var html_ = this.outerHTML;
                    var proxyItem_ = document.createElement("div");
                        proxyItem_.innerHTML = html_;

                    if(rawBtn.dataset !== undefined){
                        rawBtn.dataset.contentText = proxyItem_.textContent;
                    } else{
                        rawBtn.setAttribute("data-content-text", proxyItem_.textContent);
                    }

                    rawBtn.addEventListener("click", function(){
                        var content = rawBtn.dataset !== undefined ? this.dataset.contentText : rawBtn.getAttribute("data-clipboard-text");
                        window.sessionStorage.setItem("content",this.dataset.contentText);
                        var win = window.open(window.location.protocol + "//" + window.location.host + "/products-and-docs/raw-view/", '_blank');
                        win.focus();
                    });


                    var copyBtn = document.createElement("div");
                        copyBtn.className = "copy-btn";
                        copyBtn.setAttribute("rel", "tooltip");
                        copyBtn.setAttribute("data-placement", "top");
                        copyBtn.setAttribute("data-original-title", "Copy to Clipboard");

                    var html = this.outerHTML;
                    var proxyItem = document.createElement("div");
                        proxyItem.innerHTML = html;

                    copyBtn.dataset.clipboardText = proxyItem.textContent;

                    $(this).prepend(screenBtn);// add copy button
                    $(this).prepend(rawBtn);// add raw button
                    $(this).prepend(copyBtn);// add copy button
                  });

                group.nextAll().first().addClass('tab-active');//set first tab visible
                /*parse tabs end*/

                me.parent().prepend('<a href="javascript:void(0)" class="active-lang">' + $(me).find('.active').html() + '</a>');
                me.attr('tabindex', '-1');

            }
            //console.log($('*').length);//As less is better
        });

        //add class to move it top
        $(".aside-wrapper > blockquote").parent('.aside-wrapper').addClass('tab-panel-offset');

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

        new ClipboardFallback(clipboard);
        new ClipboardFallback(clipboardFs);

        $(".lang-selector a").click(function(event) {
            var currentButton =$(this);
            var allBtn = $(".lang-selector a[href*=" + currentButton.attr('href') + "]");
            var tabGroup = $('.tab-active');

            currentButton.parents().find('.active-lang').html(currentButton.html());

            event.preventDefault();
            allBtn.addClass("active");
            allBtn.siblings().removeClass("active");

            if(allBtn.hasClass('active')){
                var strTMP = currentButton.index().toString();
                tabGroup.removeClass("tab-active");
                tabGroup = $(".tab-"+strTMP );
                tabGroup.addClass("tab-active");
            }
            $(this).parents().find('.active-lang').removeClass('open');
            $(this).parents().find('.lang-selector').removeClass('show');
            $(this).focus();
        });

        $(".console-btn").on("click", function(e){
            e.preventDefault();
            var id = $(this).parent().attr("id"),
                urlParam = id ? "?id=" + id : "";
            window.location.href = '/products-and-docs/apis/interactive-console' + urlParam;
        });

        $(".toggle-code-btn").on("click", function(e){
            e.preventDefault();
            toggleCodePanel(this);
        });

        // Lang selector submenu show
        $(".active-lang").on("click", function(e){
            $(this).next().addClass('show');
            if ( $(this).hasClass('open') ) {
                $(this).removeClass('open')
                  .next().removeClass('show');
            }else {
                $(this).addClass('open');
            }
            $(this).next().focus();
        });

        // Lang selector submenu blur
        $(".lang-selector").blur(function(e) {
            var self = this;
            setTimeout(function () {
                $(self).removeClass('show');
                $(self).prev().removeClass('open');
            }, 127);
        });

        // Modal Raw button click
        $modalBody.on("click", ".raw-btn", function() {
            var rawBtn = this;
            var content = rawBtn.dataset !== undefined ? this.dataset.contentText : rawBtn.getAttribute("data-content-text");
            window.sessionStorage.setItem("content", content);
            var win = window.open(window.location.protocol + "//" + window.location.host + "/products-and-docs/raw-view/", '_blank');
            win.focus();
        });

    });
})();
