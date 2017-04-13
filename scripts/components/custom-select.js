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
        if($node[0]) {
            $.each($node[0].attributes, function (index, attribute) {
                if (attribute.name === "contenteditable") {
                    isNodeEditable = true;
                    return false; //to break this loop
                }
            });
        }
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
            $node.attr('inputmode', 'numeric');
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
            var liDataVal;
            $placeholder.val($self.text());
            $select.val($self.data('value'));

            if(options && options.useTopElValue){
                liDataVal = $self.clone()	//clone the element
                  .children()	//select all the children
                  .remove()	//remove all the children
                  .end()	//again go back to selected element
                  .attr('data-value')	//get the data-value of element
                ;
                $placeholder
                    .val( liDataVal )
                    .data('value', liDataVal );
                if(options.outerElement) {
                    $(options.outerElement).trigger('blur');
                }

            }

            $list.find('li').removeClass(activeItemCssClass);
            $self.addClass(activeItemCssClass);

            //set value on real select
            $('option',$select).filter(function(i) {
                return $(this).text() == $self.text() ;//To select $self.text()
            }).prop('selected', true);

            $select.trigger('change');
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

        function setValueByKeyboard(e) {
            e.preventDefault();
            var newValue = $placeholder.val();
            if (newValue === ''){ $list.find('li:first').trigger('click'); return false; }
            $placeholder.attr( "value", newValue );
            $list.append( $('<li class="custom_select__item" style="display:none" data-value="'+ newValue+'">'+newValue+'</li>') );
            $select.append($('<option>', {value: newValue, text: newValue }));
            $list.find('li:last').trigger('click');
        }

        function keyboardListener(e) {
            var selected = {};
            function setSelector(list ,me){
                $.each(list, function(i, el) {
                    if ($.inArray(el) == -1){
                        if( $(el).data('value') !== $placeholder.val() ) {
                            selected = $(".custom_select__item",me).eq(i);
                        }
                    }
                    else { console.info('error' , i, el );}
                });
              return selected;
            }

            if (e.which == 13) {
                e.preventDefault();
                if ($(".custom_select__list ").is(":visible")) {
                    var selected = $(".custom_select__item-active", $(this , 'ul') );
                    if(selected.length < 1){
                        set( $(".custom_select__item", $(this , 'ul')).first(), false);
                    } else{
                        set( $(".custom_select__item-active", $(this , 'ul')), false);
                    }
                    toggle();
                } else {
                    toggle();
                }
            }
            if (e.which == 38) { // up
                e.preventDefault();
                selected = $(".custom_select__item-active", $(this , 'ul') );
                if(selected.length < 1){
                    selected = setSelector($(".custom_select__item",this) ,this);
                }
                $(".custom_select__list li").removeClass("custom_select__item-active");
                if (selected.prev().length === 0) {
                    selected.siblings().last().addClass("custom_select__item-active");
                } else {
                    selected.prev().addClass("custom_select__item-active");
                }
            }
            if (e.which == 40) { // down
                e.preventDefault();
                selected = $(".custom_select__item-active",  $(this , 'ul'));
                if(selected.length < 1){
                    selected = setSelector($(".custom_select__item",this),this);
                }
                $(".custom_select__list li").removeClass("custom_select__item-active");
                if (selected.next().length === 0) {
                    selected.siblings().first().addClass("custom_select__item-active");
                } else {
                    selected.next().addClass("custom_select__item-active");
                }
            }
        }
        function setKeyinUL() {
            var selectedKey = $(this).val();

            if(options && options.useTopElValue){
                $placeholder
                  .attr('data-value', selectedKey )
                  .val( selectedKey );
                if(options.outerElement) {
                    var list = $(this).siblings('ul').find('li');

                    list.each(function(i,liEl) {
                        if ( selectedKey === $(liEl).attr('data-value') ){
                            $(liEl).addClass(activeItemCssClass);
                            $(options.outerElement).trigger('blur');
                        }else {
                            $(liEl).removeClass(activeItemCssClass);
                        }
                    });
                }
            }
        }

        // Events
        $list.on('click', 'li', function(){            
            set(this, false);
        });
        $placeholder.on({
            'blur': blur,
            'input': hide
        });

        $select.on('change',setKeyinUL );

        if ( isEditableInput($placeholder) ) {
            $custom_select.on('change', 'input', setValueByKeyboard);
        }
       
        $custom_select.on({
            'click': toggle,
            'custom-reset': reset,
            'keydown' : keyboardListener
        });
        $feedbackModal.on({
            'hide.bs.modal': reset,
            'show.bs.modal': reset
        });

        setEditable($placeholder);

        reset();
        });
    };

		// CommonJS exports
		if (typeof module !== "undefined") {
			module.exports = { customSelect: jQuery.fn.customSelect };
		}
})(jQuery);

$(document).on('ready', function () {
    $('.js_custom_select').customSelect();
});
