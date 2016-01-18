$(document).ready(function() {

        $(".reqres").each(function() {
            tab1 = $(this).next();
            tab2 = $(this).next().next();
            $('<div class="reqres-wrapper"></div>').insertBefore($(this));
            $(this).prev().append($(this)).append(tab1).append(tab2);
            $(this).parent().find('a').eq(0).addClass("active");
            $(this).next().addClass("r-tab").next().addClass("r-tab");
            $(this).next().addClass("active");
        });

        var copyBtn = $(document.createElement("div")).addClass("copy-btn");
        $(".r-tab").prepend(copyBtn);

        $(".reqres a").click(function(event) {
            $(this).parent().find(".active").removeClass("active");
            $(this).parent().parent().parent().find(".r-tab.active").removeClass("active");
            $(this).parent().parent().parent().find(".r-tab").eq($(this).index()).addClass("active");
            $(this).addClass("active");
        });

});