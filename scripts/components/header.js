(function(){
    $(document).ready(function(){

        var menuDropdown = $('#menu-dropdown'),
            menuBtn = $('#menu-btn')

        menuBtn.on("click", function(){
            if (!menuBtn.hasClass('tm-close')){
                menuBtn.addClass('tm-close');
                menuDropdown.removeClass('closed').addClass('expanded');
                menuDropdown.focus();
            }
        });

        menuDropdown.on('blur', function(){
            setTimeout(function(){
                menuBtn.removeClass('tm-close')
            }, 300);
            menuDropdown.removeClass('expanded').addClass('closed');
        });
    })

})();