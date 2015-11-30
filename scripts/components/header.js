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

                this.menuDropdown.on('blur', function(){
                    self.hide();
                });
            }
        };

        Header.init();

    });

})();