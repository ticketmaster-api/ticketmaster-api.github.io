(function(){

    $(document).ready(function(){

        var Header = {
            test: true,
            menuDropdown: $('#menu-dropdown'),
            menuBtn: $('#menu-btn'),
            searchBtn: $('#search'),
            searchAlert: $('#search-alert'),
            searchBox: $("#cse-search-box"),
            alertTimeout: null,
            hasBackground: $('.top-bar').hasClass('bg-header') ? true : false,
            expandMenuBar: $('#expand-menu'),
            expandSections: $('.expand-section'),
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

                // search alert tooltip commented out since search is now working
                /*self.searchAlert.on("blur", function(){
                    self.searchAlert.hide();
                    clearTimeout(self.alertTimeout);
                });*/

                self.searchBtn.on("click", function(){
                    // search alert tooltip commented out since search is now working
                    /*self.searchAlert.toggle();
                    if (self.searchAlert.is(':visible')){
                        self.searchAlert.focus();
                        self.alertTimeout = setTimeout(function() {
                            self.searchAlert.hide();
                        }, 4000);
                    }*/

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

                var smopen  = false;
                $(".top-bar").on("click", "#search .search-button", function (e) {
                  if (self.searchBtn.hasClass("smopen") && smopen == true) {
                      self.searchBtn.removeClass("smopen");
                      self.searchBox.removeClass("sopen");
                      smopen  = false;
                  }
                  else {
                      self.searchBtn.addClass("smopen");
                      self.searchBox.addClass("sopen");
                      $("input.q").focus();
                      smopen  = true;
                  }
                });

                $("input.q").blur(function(e) {
                    if (smopen == true) {
                        setTimeout(function () {
                            self.searchBox.removeClass("sopen");
                            self.searchBtn.removeClass("smopen");
                            smopen = false;
                        }, 127);
                    }
                });

                self.searchBtn.on("click", ".search-button", function (e) {
                    self.searchBox.submit();
                });

                self.searchBtn.on("submit", "#cse-search-box", function (e) {
                  if ($("input[name='q']").val() == '') {
                      return false;
                  }
                });

                // Search [END]

                $('.expandable').on('mouseenter', function(){
                    $(this).addClass('expanded');
                    self.expandSections.hide();
                    self.expandMenuBar.find('#expand-' + $(this).attr('data-expands-to')).show();
                    self.expandMenuBar.addClass('expanded').focus();
                }).on('mouseleave', function(){
                    $(this).removeClass('expanded');
                });

                self.expandMenuBar.on('blur', function(){
                    $(this).removeClass('expanded');
                });

            }
        };

        Header.init();

    });

})();