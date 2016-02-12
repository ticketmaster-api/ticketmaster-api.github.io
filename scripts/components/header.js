(function(){

    $(document).ready(function(){

        var Header = {
            test: true,
            menuDropdown: $('#menu-dropdown'),
            menuBtn: $('#menu-btn'),
            searchBtn: $('#search'),
            searchAlert: $('#search-alert'),
            alertTimeout: null,
            hasBackground: $('.top-bar').hasClass('bg-header') ? true : false,
            logo: $('#header-logo img'),
            show: function(){
                var self = this;
                if (!self.menuBtn.hasClass('tm-close')){
                    self.menuBtn.addClass('tm-close');
                    self.menuDropdown.removeClass('closed').addClass('expanded');
                    self.menuDropdown.focus();
                    if (self.hasBackground){
                        self.menuBtn.removeClass('white');
                        self.searchBtn.removeClass('white');
                        if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < 768)
                            self.logo.attr('src', '/assets/img/header/tm-developer-logo-p-1.svg');
                    }
                }
            },
            hide: function(){
                var self = this;
                setTimeout(function(){
                    self.menuBtn.removeClass('tm-close')
                    if (self.hasBackground){
                        self.menuBtn.addClass('white');
                        self.searchBtn.addClass('white');
                        self.logo.attr('src', '/assets/img/header/tm-developer-logo.svg');
                    }
                }, 300);
                self.menuDropdown.removeClass('expanded').addClass('closed');
            },
            init: function(){
                var self = this;
                self.menuBtn.on("click", function(){
                    if (!self.menuBtn.hasClass("tm-close"))
                        self.show();
                    else
                        self.hide();
                });

                self.searchAlert.on("blur", function(){
                    self.searchAlert.hide();
                    clearTimeout(self.alertTimeout);
                });

                self.searchBtn.on("click", function(){
                    self.searchAlert.toggle();
                    if (self.searchAlert.is(':visible')){
                        self.searchAlert.focus();
                        self.alertTimeout = setTimeout(function() {
                            self.searchAlert.hide();
                        }, 4000);
                    }
                    //Send custom event to Google Analytic
                    ga('send', {
                        hitType: 'event',
                        eventCategory: 'Search',
                        eventAction: 'click',
                        eventLabel: 'Try to search'
                    });
                });

                //using document click listener since mobile iOS touch devices do not understand blur event
                $(document).on("click touchend", function (e) {
                    var menuCloseBtn = $(".tm-close");
                    if (!self.menuDropdown.is(e.target)
                        && self.menuDropdown.has(e.target).length === 0
                        && !menuCloseBtn.is(e.target)
                        && menuCloseBtn.has(e.target).length === 0
                        && menuCloseBtn.length) {
                        self.hide();
                    }
                });

                // Search [START]

                $(".top-bar").on("click", "#search", function (e) {
                  $(this).addClass("smopen");
                  $("#cse-search-box").addClass("sopen");
                  $("input.q").focus();
                });

                $("input.q").blur(function(e) {
                    setTimeout(function () {
                        $("#cse-search-box").removeClass("sopen");
                        $("#search").removeClass("smopen");
                    }, 127);
                });

                $("#search").on("click", ".search-button", function (e) {
                    $("#cse-search-box").submit();
                });

                $("#search").on("submit", "#cse-search-box", function (e) {
                  if ($("input[name='q']").val() == '') {
                      return false;
                  }
                });

                // Search [END]
            }
        };

        Header.init();

    });

})();