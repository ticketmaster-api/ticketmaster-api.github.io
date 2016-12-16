    $(document).ready(function () {

        var tabsCount = 0;

        $('.content').find('.tutorial-code').each(function () {
            var me = $(this);
            group = $(this).nextUntil('p').addBack();
            group.wrapAll('<div class="code-article-wrapper"></div>');
            if (me.hasClass('t-lang-selector')) {
                /*parse tabs*/
                me.children().children().first().addClass('active');//set first button active

                tabsCount = $('.tutorial-code a').first().nextUntil('p').length;

                $(me.parent().children('.highlight')).each(function (index) {
                    $(this).addClass('tab-content')
                    .addClass(function () {
                        if (index > tabsCount) {
                            index = [index % (tabsCount + 1)];
                        }
                        return "tab-" + index;
                    })
                    .each(function(){
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
                            if ($(this).parent().parent().prev().hasClass('window-title')) {
                                var title = $(this).parent().parent().prev()
                                    .clone(true)
                                    .find('a')
                                    .remove()
                                    .end()
                                    .html();
                            } else var title = '';

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

                            $(".fs-modal #modal-title").html(title);
                            $(".fs-modal .modal-body").html(content);

                            $(".fs-modal .modal-body").delegate(".t-lang-selector a", "click", function() {
                                $(".tutorial-code.t-lang-selector a").eq($(this).index()).click();
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
                        }
                        else{
                            rawBtn.setAttribute("data-content-text", proxyItem_.textContent);
                        }

                        rawBtn.addEventListener("click", function(){
                            var content = rawBtn.dataset !== undefined ? this.dataset.contentText : rawBtn.getAttribute("data-clipboard-text");
                            window.sessionStorage.setItem("content",this.dataset.contentText);
                            var win = window.open(window.location.protocol + "//" + window.location.host + "/products-and-docs/tutorials/raw-view/", '_blank');
                            win.focus();
                        });


                        var copyBtn = document.createElement("div");
                        copyBtn.className = "copy-btn";
                        copyBtn.setAttribute("rel", "tooltip");
                        copyBtn.setAttribute("data-placement", "top");
                        copyBtn.setAttribute("data-original-title", "Copy to Clipboard");
                        copyBtn.addEventListener("click", function () {
                            this.classList.add("copied")
                            window.setTimeout(function(){
                                document.getElementsByClassName("copied")[0].classList.remove("copied");
                            }, 2000);
                        });

                        var html = this.outerHTML;
                        var proxyItem = document.createElement("div");
                        proxyItem.innerHTML = html;

                        copyBtn.dataset.clipboardText = proxyItem.textContent;

                        $(this).prepend(screenBtn);// add copy button
                        $(this).prepend(rawBtn);// add raw button
                        $(this).prepend(copyBtn);// add copy button
                    });
                });

                group.nextAll().first().addClass('tab-active');//set first tab visible
                /*parse tabs end*/

                me.before('<a href="javascript:void(0)" class="active-lang">' + $(me).find('.active').html() + '</a>');
                me.attr('tabindex', '-1');

            }
        });

        $(".t-lang-selector a").click(function(event) {
            var currentButton = $(this);
            var buttonsGroup = currentButton.parent().find('a');
            var tabsGroup = currentButton.parent().parent().parent().find('.tab-content');

            currentButton.parent().parent().prev('.active-lang').html(currentButton.html());

            event.preventDefault();
            buttonsGroup.removeClass('active');
            currentButton.addClass("active");

            tabsGroup.removeClass('tab-active');
            tabsGroup.eq(currentButton.index()).addClass('tab-active');

            $(this).parent().parent().prev('.active-lang').removeClass('open');
            $(this).parent().parent('.t-lang-selector').removeClass('show');
            $(this).focus();

        });


        // Lang selector submenu show
        $(".active-lang").on("click", function(e){
            $(this).next().addClass('show');
            if ( $(this).hasClass('open') ) {
                $(this).removeClass('open');
                $(this).next().removeClass('show');
            }
            else {
                $(this).addClass('open');
            }
            $(this).next().focus();
        });

        // Lang selector submenu blur
        $(".t-lang-selector").blur(function(e) {
            var self = this;
            setTimeout(function () {
                $(self).removeClass('show');
                $(self).prev().removeClass('open');
            }, 127);
        });

        var clipboard = new Clipboard('.copy-btn'),
          clipboardFs = new Clipboard('.copy-btn-fs');
        new ClipboardFallback(clipboard);
        new ClipboardFallback(clipboardFs);

        $.fn.modal.Constructor.prototype.enforceFocus = function () {};

        // Modal Raw button click
        $(".fs-modal .modal-body").on("click", ".raw-btn", function() {
            var rawBtn = this;
            var content = rawBtn.dataset !== undefined ? this.dataset.contentText : rawBtn.getAttribute("data-content-text");
            window.sessionStorage.setItem("content", content);
            var win = window.open(window.location.protocol + "//" + window.location.host + "/products-and-docs/tutorials/raw-view/", '_blank');
            win.focus();
        });

});