$(document).ready(function() {

        var getInnerText = function (element) {
            var html = element.find("code")[0].outerHTML;
            var proxyItem = document.createElement("div");
            proxyItem.innerHTML = html;
            return proxyItem.textContent;
        };

        var createButton = function(){
            var btn = document.createElement("div");
            btn.className = "copy-btn";
            return btn;
        };

        $(".reqres").each(function() {
            tab1 = $(this).next();
            tab2 = $(this).next().next();

            var btn1 = createButton();
                btn1.dataset.clipboardText =  getInnerText(tab1);

            tab1.prepend(btn1);

            var btn2 = createButton();
                btn2.dataset.clipboardText =  getInnerText(tab2)

            tab2.prepend(btn2);

            $('<div class="reqres-wrapper"></div>').insertBefore($(this));
            $(this).prev().append($(this)).append(tab1).append(tab2);
            $(this).parent().find('a').eq(0).addClass("active");
            $(this).next().addClass("r-tab").next().addClass("r-tab");
            $(this).next().addClass("active");
        });

        $(".reqres a").click(function(event) {
            $(this).parent().find(".active").removeClass("active");
            $(this).parent().parent().parent().find(".r-tab.active").removeClass("active");
            $(this).parent().parent().parent().find(".r-tab").eq($(this).index()).addClass("active");
            $(this).addClass("active");
        });

});