(function () {
    $(document).ready(function () {

        $("#back-top").hide(), $(function () {
            $(window).scroll(function () {
                $(this).scrollTop() > 500 ? $("#back-top").fadeIn() : $("#back-top").fadeOut()
            }), $("#back-top a").click(function () {
                return $("body,html").animate({
                    scrollTop: 0
                }, 500), !1
            })
        })

        function getCookie(name) {
            var matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }

    });
})();