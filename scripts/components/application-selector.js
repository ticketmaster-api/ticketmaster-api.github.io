/**
 */
(function($){
jQuery.fn.applicationSelect = function(options) {

    var defaults = {},
        settings = $.extend({}, defaults, options);


    return this.each(function () {

        var $custom_select = $(this);
        var useData = apiKeyService.getApiKeysCookie("tk-api-apps");

        function addCustomList() {
            var data = useData,
             optionArr = [] , liArr = [],
             $placeholder = $custom_select.find('input'),
             $select = $('<select required class="custom_select__field" name="w-tm-api-key" id="subject-keys" tabindex="-1">'),
             $ul = $('<ul class="custom_select__list">');

            //put option inside select & li
            $.each(data, function(i, cookieItem){
                var time = cookieItem.created
                  .substring(0, 10)
                  .replace(/-/g, ".")
                  .split(".")
                  .reverse()
                  .join(".");

                optionArr[i] = "<option value='" + cookieItem.key + "'>" + cookieItem.name + "</option>";
                liArr[i] = "<li class='custom_select__item' data-value='" + cookieItem.key +"' ><p class='custom_select__item-ellipses'>" + cookieItem.name +
                  "</p><span class='custom_select__item-data'>"+ time + "</span></li>"; //put li inside ul
            });

            $select.append(optionArr.join(''))
              .insertBefore($placeholder);
            $ul.append(liArr.join(''))
              .insertBefore($placeholder);

            //set readonly for list
            $('input',$custom_select)
              .prop('readonly',true)
              .addClass('custom_select__placeholder');
        }

        function addValueListener(selectedKey){
            $(this).attr('data-value',selectedKey);
            setTimeout(function(){
                $(this)
                  .val(selectedKey);
            },0);
        }

        function updateInputsHandler(selectedKey) {
            if(options && options.updateInputs){
                options.updateInputs.forEach(function (elementId) {
                    $(elementId).attr("contenteditable","true")
                        .data('value', selectedKey)
                        .on({
                            'blur' : addValueListener,
                            'click': addValueListener
                        });
                });
            }
        }

        //initialization only once
        if( $custom_select.find('select').length < 1 && useData && useData.length > 0) {
          var selectedKey = $(this).siblings('ul').find('li.custom_select__item-active').attr('data-value');
            addCustomList(selectedKey);
            updateInputsHandler(selectedKey);
        }

        });
    };

	// CommonJS exports
	if (typeof module !== "undefined") {
		module.exports = { applicationSelect: jQuery.fn.applicationSelect };
	}
})(jQuery);

$(document).on('ready', function () {
	var listApiKeys = apiKeyService.getApiKeysCookie("tk-api-apps");
	if( listApiKeys && listApiKeys.length > 0) {
		$('#js_custom_select_key')
			.applicationSelect({updateInputs:['#w-tm-api-key','#api-key']})
			.customSelect({useTopElValue: true, outerElement: '#api-key'});
	}

});
