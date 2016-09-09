(function($){

    jQuery.fn.checkNumeric = function(options ){

        var defaults = {},
            settings = $.extend( {}, defaults, options),
            value,
            step,
            $incButtonElement = '<span class="arrow arrow__inc"></span>',
            $decButtonElement = '<span class="arrow arrow__dec"></span>';

        function init( numeric_input ) {
            numeric_input.wrap('<div class="js_numeric-input-group"></div>');
            numeric_input.after( $incButtonElement, $decButtonElement );
        }

        function checkInputAttr(input) {
            if (input.attr('value')) {
                value = parseFloat(input.attr('value'));
            } else if (input.attr('placeholder')) {
                value = parseFloat(input.attr('placeholder'));
            }
            if (!( $.isNumeric(value) )) {
                value = 0;
            }
            /*if (input.attr('step')) {
                step = parseFloat(input.attr('step'));
            } else {
                step = 1;
            }*/
            step = getStep(input);
        }

        function getStep(input) {
            return (input.attr('step')) ? parseFloat(input.attr('step')): 1;
        }

        /**
         * Check value when it entered from keybord
         * @param inputElement - object
         * @param min - number
         * @param max - number
         */
        function checkValue(inputElement, min , max ) {
            var val = ( settings.floatVal )? parseFloat( inputElement.val() ) : parseInt( inputElement.val() ) ,//remove letters
                vlidatedValue = 0;
            console.group();
                console.log('val',val , 'vlidatedValue 1 ', vlidatedValue , 'defaults.floatVal' , defaults.floatVal);
                console.log('min ',min,'max ',max);

            if(val < min){
                val = min;
                vlidatedValue = min;
                console.log('val <= min -> ', inputElement.val() );

            } else if (val > max){
                val = max;
                vlidatedValue = max;
                console.log('if(val >= max) -> ', inputElement.val() );

            }
            if(!( $.isNumeric(val) )){
                val = '';
            }
            inputElement.val(val);
            inputElement.siblings('[type=number]').val(val);

                console.log('if(min<= val && val <=max) -> ', inputElement.val() );
                console.log('settings ', settings );
                console.log('vlidatedValue ', vlidatedValue );
            console.groupEnd();
        }

        return this.each(function() {
            var $numeric_input = $(this),
                incBtn , decBtn, step,
                $max = ($numeric_input.attr('max')) ? parseInt($numeric_input.attr('max')) : Number.MAX_SAFE_INTEGER,
                $min = ($numeric_input.attr('min')) ? parseInt($numeric_input.attr('min')) : Number.MIN_SAFE_INTEGER;


            init($numeric_input);

            incBtn =  $(this).siblings( ".arrow__inc" );
            decBtn =  $(this).siblings( ".arrow__dec" );

            // console.log('$incButton', incBtn);
            // console.log('$(this).next( ".arrow__dec" )', $(this));
            // console.log('decBtn', decBtn);

            /*
            $numeric_input.focus(function() {
                $(this).prop('type', 'text')
                  .keyup(function() {
                      $(this).val($(this).val().replace(/[^\d|\s]/g, ''));
                      //checkValue($(this), $min, $max);
                  })
                  .blur(function() {
                      $(this).val($(this).val().replace(/[^\d]/g, '')).prop('type', 'number');
                  });
            });*/

            $numeric_input.change(function(){
                checkValue($(this), $min, $max);
            });

            incBtn.click(function() {

                var value = parseInt($numeric_input.val());
                var step = getStep($numeric_input);
                // var val = value + step;
                var idd = $numeric_input.attr('id');
                var newValue;

                checkInputAttr($numeric_input);
                newValue = value + step;
                console.log('max' , $max , newValue);
                if (newValue >= $max) {
                    newValue = $max;
                    $(this).addClass('disabled');
                }else {
                    console.log('show decBtn');
                    decBtn.removeClass('disabled');
                }

                $numeric_input.val(newValue);
                $numeric_input.attr( "value", newValue );

                console.log('newValue' , newValue);
                $numeric_input.trigger('change');

                return false;
            });

            decBtn.click(function() {
                var newValue;
                var value = parseInt($numeric_input.val());
                var step = getStep($numeric_input);
                var idd = $numeric_input.attr('id');

                console.log('min' , $min);

                checkInputAttr($numeric_input);
                newValue = value - step;
                if (newValue <= $min) {
                    newValue = $min;
                    $(this).addClass('disabled');
                }else {
                    console.log('show incBtn');
                    incBtn.removeClass('disabled');
                }

                $numeric_input.val(newValue);
                $numeric_input.attr( "value", newValue );
                console.log('newValue' , newValue);

                $numeric_input.trigger('change');
                
                return false;
            });

        });
    };
})(jQuery);

$(document).on('ready', function () {
    $('.js_numeric_input').checkNumeric( {floatVal:true} );
});
