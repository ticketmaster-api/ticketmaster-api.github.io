(function($){
    var $custom_select = $('.js_custom_select'),
        $select = $custom_select.find('select'),
        $placeholder = $custom_select.find('input'),
        $list = $custom_select.find('ul'),
        $options = $list.find('li'),
        $feedbackModal = $('#feedback-modal'),
        openedCssClass = 'custom_select-opened',
        activeItemCssClass = 'custom_select__item-active',
        speed = 300;

    function show(){
        $list.slideDown(speed);
        $custom_select.addClass(openedCssClass);
        $placeholder.focus();
    }

    function hide(){
        $list.slideUp(speed);
        $custom_select.removeClass(openedCssClass);
    }

    // Events
    $custom_select.on('click', function(){
        if ($list.is(':visible')) hide();
        else show();
    });

    $options.on('click', function(){
        var $self = $(this);
        $placeholder.val($self.text());
        $select.val($self.data('value'));
        $options.removeClass(activeItemCssClass);
        $self.addClass(activeItemCssClass);
    });

    $feedbackModal.on('hide.bs.modal', hide);
    $placeholder.on('blur', function(){
        setTimeout(hide, 100);
    });

})(jQuery);
