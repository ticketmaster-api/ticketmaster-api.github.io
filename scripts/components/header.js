(function(){

    $(document).ready(function(){

        var Header = {
            test: true,
            menuDropdown: $('#menu-dropdown'),
            menuBtn: $('#menu-btn'),
            show: function(){
                var self = this;
                if (!self.menuBtn.hasClass('tm-close')){
                    self.menuBtn.addClass('tm-close');
                    self.menuDropdown.removeClass('closed').addClass('expanded');
                    self.menuDropdown.focus();
                }
            },
            hide: function(){
                var self = this;
                setTimeout(function(){
                    self.menuBtn.removeClass('tm-close')
                }, 300);
                self.menuDropdown.removeClass('expanded').addClass('closed');
            },
            init: function(){
                var self = this;
                self.menuBtn.on("click", function(){
                    self.show();
                });

                //using document click listener since mobile iOS touch devices do not understand blur event
                $(document).on("mouseup touchend", function (e) {
                    if (!self.menuDropdown.is(e.target)
                        && self.menuDropdown.has(e.target).length === 0) {
                        self.hide();
                    }
                });
            }
        };

        Header.init();

    });

})();