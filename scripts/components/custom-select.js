(function($){
jQuery.fn.customSelect = function(options ) {

    var defaults = {

        },
        settings = $.extend({}, defaults, options);


    return this.each(function () {

        var $custom_select = $(this);

        var $select = $custom_select.find('select'),
            $placeholder = $custom_select.find('input'),
            //$list = $custom_select.find('ul'),
            $list = $('ul',$custom_select),
            $options = $list.find('li'),
            $feedbackModal = $('#feedback-modal'),
            openedCssClass = 'custom_select-opened',
            activeItemCssClass = 'custom_select__item-active',
            speed = 300;

        function show() {
            console.log('start showing, list ul:', $list);
            //$('ul.custom_select__list',$custom_select).show();//tmp
            $list.slideDown(speed);
            $custom_select.addClass(openedCssClass);
            $placeholder.focus();
        }

        function hide() {
            $list.slideUp(speed);
            $custom_select.removeClass(openedCssClass);
        }

        function set(isInit) {
            var $self = $(this);
            console.log('set(isInit)-$self->:', $self);
            $placeholder.val($self.text());
            $select.val($self.data('value'));
            if(!isInit) $select.trigger('change');
            $options.removeClass(activeItemCssClass);
            $self.addClass(activeItemCssClass);
        }

        function toggle() {
            if ($list.is(':visible')) hide();
            else show();
        }

        function blur() {
            setTimeout(hide, 100);
        }

        function reset() {
            set.call($options.filter(':first'), true);
        }

        // Events
        $options.on('click', function(){
            set.call(this, false);
        });
        $placeholder.on('blur', blur);
        $custom_select.on('click', toggle);
        $feedbackModal.on('hide.bs.modal', reset);

        reset();
        });
    };
})(jQuery);

$(document).on('ready', function () {
    $('.js_custom_select').customSelect();
});
