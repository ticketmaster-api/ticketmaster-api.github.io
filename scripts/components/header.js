(function(){

    $(document).ready(function(){

        var Header = {
            test: true,
            menuDropdown: $('#menu-dropdown'),
            menuBtn: $('#menu-btn'),
            searchBtn: $('#search'),
            hasBackground: $('.top-bar').hasClass('bg-header') ? true : false,
            show: function(){
                var self = this;
                if (!self.menuBtn.hasClass('tm-close')){
                    self.menuBtn.addClass('tm-close');
                    self.menuDropdown.removeClass('closed').addClass('expanded');
                    self.menuDropdown.focus();
                    if (self.hasBackground){
                        self.menuBtn.removeClass('white');
                        self.searchBtn.removeClass('white');
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

                //using document click listener since mobile iOS touch devices do not understand blur event
                $(document).on("click touchend", function (e) {
                    var menuCloseBtn = $(".tm-close");
                    if (!self.menuDropdown.is(e.target)
                        && self.menuDropdown.has(e.target).length === 0
                        && !menuCloseBtn.is(e.target)
                        && menuCloseBtn.has(e.target).length === 0) {
                        self.hide();
                    }
                });
            }
        };

        Header.init();

    });

})();