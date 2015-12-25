$(document).ready(function() {

        $(".reqres").each(function() {
            tab1 = $(this).next();
            tab2 = $(this).next().next();
            $('<div class="reqres-wrapper"></div>').insertBefore($(this));
            $(this).prev().append($(this)).append(tab1).append(tab2);
            $(this).next().addClass("r-tab").next().addClass("r-tab");
            $(this).next().addClass("active")
        });

        $(".reqres a").click(function(event) {
            alert($(this).index());
        });

});