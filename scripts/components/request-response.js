$(document).ready(function() {

        var getInnerText = function (element) {
            var html = element.find("code")[0].outerHTML;
            var proxyItem = document.createElement("div");
            proxyItem.innerHTML = html;
            return proxyItem.textContent;
        };

        var createButton = function(className){
            var btn = document.createElement("div");
            btn.className = className;
            return btn;
        };


        var startRowView = function(){
            var content = this.dataset !== undefined ? this.dataset.clipboardText : this.getAttribute("data-clipboard-text");
            window.sessionStorage.setItem("content", content);
            var win = window.open(window.location.protocol + "//" + window.location.host + "/products-and-docs/raw-view/", '_blank');
            win.focus();
        };

        var makeCopy = function () {
            this.classList.add("copied")
            window.setTimeout(function(){
                document.getElementsByClassName("copied")[0].classList.remove("copied");
            }, 2000);
        };

        $(".reqres").each(function() {
            tab1 = $(this).next();
            tab2 = $(this).next().next();


            var rawbtn1 = createButton("raw-btn");
                if(rawbtn1.dataset !== undefined){
                    rawbtn1.dataset.clipboardText =  getInnerText(tab1);
                }
                else{
                    rawbtn1.setAttribute("data-clipboard-text", getInnerText(tab1));
                }
                rawbtn1.addEventListener("click",startRowView);
                tab1.prepend(rawbtn1);

            var btn1 = createButton("copy-btn");
                btn1.dataset.clipboardText =  getInnerText(tab1);
                btn1.addEventListener("click", makeCopy);
                tab1.prepend(btn1);

            var rawbtn2 = createButton("raw-btn");
                if(rawbtn2.dataset !== undefined){
                    rawbtn2.dataset.clipboardText =  getInnerText(tab2);
                }
                else{
                    rawbtn2.setAttribute("data-clipboard-text", getInnerText(tab2));
                }
                rawbtn2.addEventListener("click", startRowView);
                tab2.prepend(rawbtn2);

            var btn2 = createButton("copy-btn");
                btn2.dataset.clipboardText =  getInnerText(tab2);
                btn2.addEventListener("click", makeCopy);
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