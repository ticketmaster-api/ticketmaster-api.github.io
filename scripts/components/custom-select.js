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

    function set(){
        var $self = $(this);
        $placeholder.val($self.text());
        $select.val($self.data('value'));
        $options.removeClass(activeItemCssClass);
        $self.addClass(activeItemCssClass);
    }

    function toggle(){
        if ($list.is(':visible')) hide();
        else show();
    }

    function blur(){
        setTimeout(hide, 100);
    }

    function reset(){
        set.call($options.filter(':first'));
    }

    // Events
    $options.on('click', set);
    $placeholder.on('blur', blur);
    $custom_select.on('click', toggle);
    $feedbackModal.on('hide.bs.modal', reset);

    reset();

})(jQuery);
