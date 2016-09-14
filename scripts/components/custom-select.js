(function($){
jQuery.fn.customSelect = function(options ) {

    var defaults = {},
        settings = $.extend({}, defaults, options);

    function setEditable(input) {
        if( input.attr("contentEditable") ) {
            input.removeAttr( "readonly" );
            // console.log('1- input.attr("contentEditable")' , input.attr("contentEditable")  );
        }
    }


    return this.each(function () {

        var $custom_select = $(this);
        $custom_select.append('<div class="custom_select__arrow"/>');

        var $select = $custom_select.find('select'),
            $placeholder = $custom_select.find('input'),
            $list = $custom_select.find('ul'),
            $feedbackModal = $('#feedback-modal'),
            openedCssClass = 'custom_select-opened',
            activeItemCssClass = 'custom_select__item-active',
            speed = 300;

        function show() {
            $list.slideDown(speed);
            $custom_select.addClass(openedCssClass);
            $placeholder.focus();
        }

        function hide() {
            $list.slideUp(speed);
            $custom_select.removeClass(openedCssClass);
        }

        function set(self, isInit) {
            var $self = $(self);
            $placeholder.val($self.text());
            $select.val($self.data('value'));
            if(!isInit) $select.trigger('change');
            $list.find('li').removeClass(activeItemCssClass);
            $self.addClass(activeItemCssClass);
        }

        function toggle() {
            if(!$select.is(':disabled')){
                if ($list.is(':visible')) hide();
                else show();
            }
        }

        function blur() {
            setTimeout(hide, 100);
        }

        function reset() {
            set($list.find('li').filter(':first'), true);
        }

        // Events
        $list.on('click', 'li', function(){            
            set(this, false);
        });
        $placeholder
            .on('blur', blur)
            .on('change',function () {
                $placeholder.attr( "value", $placeholder.val() );
                $list.append( $('<li style="display:none" data-value="'+ $placeholder.val()+'">'+$placeholder.val()+'</li>') );
                $select.append($('<option>', {value: $placeholder.val(), text:$placeholder.val() })); 
                $list.find('li:last').trigger('click');
            });
        $custom_select.on({
            'click': toggle,
            'custom-reset': reset
        });
        $feedbackModal.on({
            'hide.bs.modal': reset,
            'show.bs.modal': reset
        });

        setEditable($placeholder);

        reset();
        });
    };
})(jQuery);

$(document).on('ready', function () {
    /* to set content editable need to add contenteditable="true" , markup example: <input class="custom_select__placeholder" type="text" contenteditable="true">*/
    $('.js_custom_select').customSelect();
});
