/**
 * to set content editable need to add attribute contenteditable="true" or contenteditable
 * example: <input class="custom_select__placeholder" type="text" contenteditable="true">
 */
(function($){
jQuery.fn.customSelect = function(options ) {

    var defaults = {},
        settings = $.extend({}, defaults, options);

    function isEditableInput ( $node ) {
        var isNodeEditable = false;
        $.each( $node[0].attributes, function ( index, attribute ) {
            if ( attribute.name === "contenteditable" ) {
                isNodeEditable = true ;
                return false; //to break this loop
            }
        });
        return isNodeEditable;
    }

    function setEditable(input) {
        if( input.attr("contentEditable") || isEditableInput( input ) ) {
            input.removeAttr( "readonly" );
            addNumberPattern(input);
        }
    }
    function addNumberPattern($node) {
        if ($node.attr('type') === 'number'){
            $node.attr('pattern','[0-9]*');
            $node.attr( 'inputmode', 'numeric' );
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

        function setValueByKeyboard() {
            var newValue = $placeholder.val();
            if (newValue === ''){ $list.find('li:first').trigger('click'); return false; }
            $placeholder.attr( "value", newValue );
            $list.append( $('<li style="display:none" data-value="'+ newValue+'">'+newValue+'</li>') );
            $select.append($('<option>', {value: newValue, text: newValue }));
            $list.find('li:last').trigger('click');
        }

        // Events
        $list.on('click', 'li', function(){            
            set(this, false);
        });
        $placeholder.on('blur', blur);

        if ( isEditableInput($placeholder) ) $custom_select.on('change', 'input', setValueByKeyboard);
       
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
    $('.js_custom_select').customSelect();
});
