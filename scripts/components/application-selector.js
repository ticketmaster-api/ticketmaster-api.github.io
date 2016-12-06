/**
 */
(function($){
jQuery.fn.applicationSelect = function(options ) {

    var defaults = {},
        settings = $.extend({}, defaults, options);


    return this.each(function () {

        var $custom_select = $(this);
        var useData = apiKeyService.getApiKeysCookie();

        function addCustomList() {
            var data = useData;
            var $placeholder = $custom_select.find('input');
            var auxArr = [] , liArr = [];
            var $selectTag = $('<select required class="custom_select__field" name="subject" id="subject-keys" tabindex="-1">').insertBefore($placeholder);
            var $ul = $('<ul class="custom_select__list">').insertAfter($placeholder);

            //put option inside select & li
            $.each(data, function(i, option){
                var time = option.created
                  .substring(0, 10)
                  .replace(/-/g, ".")
                  .split(".")
                  .reverse()
                  .join(".");

                auxArr[i] = "<option value='" + option.key + "'>" + option.name + "</option>";
                liArr[i] = "<li class='custom_select__item' data-value='" + option.key +"' >" + option.name +
                  "<span class='custom_select__item-data'>"+ time + "</span></li>"; //put li inside ul
            });
            $selectTag.append(auxArr.join(''));
            $ul.append(liArr.join(''));

            //set readonly for list
            $('input',$custom_select)
              .prop('readonly',true)
              .addClass('custom_select__placeholder');
        }

        function addValueListener(){
            var selectedKey = $(this).siblings('ul').find('li.custom_select__item-active').attr('data-value');
            $(this).attr('data-value',selectedKey);
            setTimeout(function(){
                $(this)
                  .val(selectedKey);
            },0);
        }

        //initialization only once
        if( $custom_select.find('select').length < 1 && useData && useData.length > 0) {
            addCustomList();

            $('#api-key')
              .data('value', $(this).siblings('ul').find('li.custom_select__item-active').attr('data-value'))
              .on('blur', addValueListener )
              .on('click', addValueListener )
            ;
        }

        });
    };
})(jQuery);

$(document).on('ready', function () {
    var listApiKeys = apiKeyService.getApiKeysCookie();
    if( listApiKeys && listApiKeys.length > 0) {
        $('#js_custom_select_key').applicationSelect().customSelect({useTopElValue: true, outerElement: '#api-key'});
    }
});
