(function(){

    var getQueryVariable = function(variable){
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    };

    var consoleUrls = {
        'srch-events': '?req=%7B"resource"%3A"discovery_events_get"%2C"params"%3A%7B"query"%3A%7B%7D%2C"template"%3A%7B"version"%3A"v1"%2C"format"%3A"json"%7D%2C"headers"%3A%7B%7D%2C"body"%3A%7B"attachmentFormat"%3A"mime"%2C"attachmentContentDisposition"%3A"form-data"%7D%7D%2C"verb"%3A"get"%7D',
        'event-details': '?req=%7B"resource"%3A"discovery_events_id_get"%2C"params"%3A%7B"query"%3A%7B%7D%2C"template"%3A%7B"version"%3A"v1"%2C"id"%3A"29004F223C406ABF"%2C"format"%3A"json"%7D%2C"headers"%3A%7B%7D%2C"body"%3A%7B"attachmentFormat"%3A"mime"%2C"attachmentContentDisposition"%3A"form-data"%7D%7D%2C"verb"%3A"get"%7D',
        'event-img': '?req=%7B%22resource%22%3A%22discovery_events_id_images_get%22%2C%22params%22%3A%7B%22query%22%3A%7B%7D%2C%22template%22%3A%7B%22version%22%3A%22v1%22%2C%22id%22%3A%220B004F0401BD55E5%22%2C%22format%22%3A%22json%22%7D%2C%22headers%22%3A%7B%7D%2C%22body%22%3A%7B%22attachmentFormat%22%3A%22mime%22%2C%22attachmentContentDisposition%22%3A%22form-data%22%7D%7D%2C%22verb%22%3A%22get%22%7D',
        'search-attractions': '?req=%7B%22resource%22%3A%22discovery_attractions_get%22%2C%22params%22%3A%7B%22query%22%3A%7B%7D%2C%22template%22%3A%7B%22version%22%3A%22v1%22%2C%22format%22%3A%22json%22%7D%2C%22headers%22%3A%7B%7D%2C%22body%22%3A%7B%22attachmentFormat%22%3A%22mime%22%2C%22attachmentContentDisposition%22%3A%22form-data%22%7D%7D%2C%22verb%22%3A%22get%22%7D',
        'attraction-details': '?req=%7B%22resource%22%3A%22discovery_attractions_id_get%22%2C%22params%22%3A%7B%22query%22%3A%7B%7D%2C%22template%22%3A%7B%22version%22%3A%22v1%22%2C%22id%22%3A%22768011%22%2C%22format%22%3A%22json%22%7D%2C%22headers%22%3A%7B%7D%2C%22body%22%3A%7B%22attachmentFormat%22%3A%22mime%22%2C%22attachmentContentDisposition%22%3A%22form-data%22%7D%7D%2C%22verb%22%3A%22get%22%7D',
        'search-categories': '?req=%7B%22resource%22%3A%22discovery_categories_get%22%2C%22params%22%3A%7B%22query%22%3A%7B%7D%2C%22template%22%3A%7B%22version%22%3A%22v1%22%2C%22format%22%3A%22json%22%7D%2C%22headers%22%3A%7B%7D%2C%22body%22%3A%7B%22attachmentFormat%22%3A%22mime%22%2C%22attachmentContentDisposition%22%3A%22form-data%22%7D%7D%2C%22verb%22%3A%22get%22%7D',
        'category-details': '?req=%7B%22resource%22%3A%22discovery_categories_id_get%22%2C%22params%22%3A%7B%22query%22%3A%7B%7D%2C%22template%22%3A%7B%22version%22%3A%22v1%22%2C%22id%22%3A%22203%22%2C%22format%22%3A%22json%22%7D%2C%22headers%22%3A%7B%7D%2C%22body%22%3A%7B%22attachmentFormat%22%3A%22mime%22%2C%22attachmentContentDisposition%22%3A%22form-data%22%7D%7D%2C%22verb%22%3A%22get%22%7D',
        'search-venues': '?req=%7B%22resource%22%3A%22discovery_venues_get%22%2C%22params%22%3A%7B%22query%22%3A%7B%7D%2C%22template%22%3A%7B%22version%22%3A%22v1%22%2C%22format%22%3A%22json%22%7D%2C%22headers%22%3A%7B%7D%2C%22body%22%3A%7B%22attachmentFormat%22%3A%22mime%22%2C%22attachmentContentDisposition%22%3A%22form-data%22%7D%7D%2C%22verb%22%3A%22get%22%7D',
        'venue-details': '?req=%7B%22resource%22%3A%22discovery_venues_id_get%22%2C%22params%22%3A%7B%22query%22%3A%7B%7D%2C%22template%22%3A%7B%22version%22%3A%22v1%22%2C%22id%22%3A%2290150%22%2C%22format%22%3A%22json%22%7D%2C%22headers%22%3A%7B%7D%2C%22body%22%3A%7B%22attachmentFormat%22%3A%22mime%22%2C%22attachmentContentDisposition%22%3A%22form-data%22%7D%7D%2C%22verb%22%3A%22get%22%7D',
        'event-offers': '?req=%7B%22resource%22%3A%22commerce_events_offers%22%2C%22params%22%3A%7B%22query%22%3A%7B%7D%2C%22template%22%3A%7B%22version%22%3A%22v2%22%2C%22id%22%3A%2205004F24E0B864B3%22%2C%22format%22%3A%22json%22%7D%2C%22headers%22%3A%7B%7D%2C%22body%22%3A%7B%22attachmentFormat%22%3A%22mime%22%2C%22attachmentContentDisposition%22%3A%22form-data%22%7D%7D%2C%22verb%22%3A%22get%22%7D',
        'srch-events-v2': '?req=%7B"resource"%3A"discovery_v2_events_get"%2C"params"%3A%7B"query"%3A%7B%7D%2C"template"%3A%7B"format"%3A"json"%7D%2C"headers"%3A%7B%7D%2C"body"%3A%7B"attachmentFormat"%3A"mime"%2C"attachmentContentDisposition"%3A"form-data"%7D%7D%2C"verb"%3A"get"%7D',
        'event-details-v2': '?req=%7B"resource"%3A"discovery_v2_events_id_get"%2C"params"%3A%7B"query"%3A%7B%7D%2C"template"%3A%7B"id"%3A"G5diZfkn0B-bh"%2C"format"%3A"json"%7D%2C"headers"%3A%7B%7D%2C"body"%3A%7B"attachmentFormat"%3A"mime"%2C"attachmentContentDisposition"%3A"form-data"%7D%7D%2C"verb"%3A"get"%7D',
        'event-img-v2': '?req=%7B"resource"%3A"discovery_v2_events_id_images_get"%2C"params"%3A%7B"query"%3A%7B%7D%2C"template"%3A%7B"id"%3A"G5diZfkn0B-bh"%2C"format"%3A"json"%7D%2C"headers"%3A%7B%7D%2C"body"%3A%7B"attachmentFormat"%3A"mime"%2C"attachmentContentDisposition"%3A"form-data"%7D%7D%2C"verb"%3A"get"%7D',
        'search-attractions-v2': '?req=%7B"resource"%3A"discovery_v2_attractions_get"%2C"params"%3A%7B"query"%3A%7B%7D%2C"template"%3A%7B"format"%3A"json"%7D%2C"headers"%3A%7B%7D%2C"body"%3A%7B"attachmentFormat"%3A"mime"%2C"attachmentContentDisposition"%3A"form-data"%7D%7D%2C"verb"%3A"get"%7D',
        'attraction-details-v2': '?req=%7B"resource"%3A"discovery_v2_attractions_id_get"%2C"params"%3A%7B"query"%3A%7B%7D%2C"template"%3A%7B"id"%3A"K8vZ917G7x0"%2C"format"%3A"json"%7D%2C"headers"%3A%7B%7D%2C"body"%3A%7B"attachmentFormat"%3A"mime"%2C"attachmentContentDisposition"%3A"form-data"%7D%7D%2C"verb"%3A"get"%7D',
        'search-classifications-v2': '?req=%7B"resource"%3A"discovery_v2_classifications_get"%2C"params"%3A%7B"query"%3A%7B%7D%2C"template"%3A%7B"format"%3A"json"%7D%2C"headers"%3A%7B%7D%2C"body"%3A%7B"attachmentFormat"%3A"mime"%2C"attachmentContentDisposition"%3A"form-data"%7D%7D%2C"verb"%3A"get"%7D',
        'classifications-details-v2': '?req=%7B"resource"%3A"discovery_v2_classifications_id_get"%2C"params"%3A%7B"query"%3A%7B%7D%2C"template"%3A%7B"id"%3A"203"%2C"format"%3A"json"%7D%2C"headers"%3A%7B%7D%2C"body"%3A%7B"attachmentFormat"%3A"mime"%2C"attachmentContentDisposition"%3A"form-data"%7D%7D%2C"verb"%3A"get"%7D',
        'search-venues-v2': '?req=%7B"resource"%3A"discovery_v2_venues_get"%2C"params"%3A%7B"query"%3A%7B%7D%2C"template"%3A%7B"format"%3A"json"%7D%2C"headers"%3A%7B%7D%2C"body"%3A%7B"attachmentFormat"%3A"mime"%2C"attachmentContentDisposition"%3A"form-data"%7D%7D%2C"verb"%3A"get"%7D',
        'venue-details-v2': '?req=%7B"resource"%3A"discovery_v2_venues_id_get"%2C"params"%3A%7B"query"%3A%7B%7D%2C"template"%3A%7B"id"%3A"KovZpZAFnIEA"%2C"format"%3A"json"%7D%2C"headers"%3A%7B%7D%2C"body"%3A%7B"attachmentFormat"%3A"mime"%2C"attachmentContentDisposition"%3A"form-data"%7D%7D%2C"verb"%3A"get"%7D'
    };

    $(document).ready(function(){
        var header = $('#instructions-header'),
            instructions = $('#console-instructions'),
            getKeyButton = $('#get-key-callout'),
            loggedUserKeyContainer = $('#pantheon-api-key'),
            loggedUserKey = $( 'span' , loggedUserKeyContainer),
            copyButton = $('.copy-btn'),
            userApiKeySessionStorage = null,
            iframe = $('#console-iframe');

        if (getQueryVariable('id') && consoleUrls[getQueryVariable('id')]){
            iframe.attr('src', iframe.attr('src') + consoleUrls[getQueryVariable('id')]);
        }

        if (!sessionStorage.getItem('console_visited')){
            instructions.show();
            header.addClass('expanded');
            sessionStorage.setItem('console_visited', 'true');
        }
        function showUserApiKeySessionStorage(isResized) {

            userApiKeySessionStorage = apiKeyService.checkApiKeyCookie() || apiKeyService.getApiWidgetsKey() ;

            if(userApiKeySessionStorage === apiKeyService.checkApiKeyCookie()) {
                if(isResized) {
                    getKeyButton.hide();
                }
                getKeyButton.fadeOut();
                loggedUserKey.text(userApiKeySessionStorage);
                copyButton.attr('data-clipboard-text',userApiKeySessionStorage);
                loggedUserKeyContainer.fadeIn();
            }
        }
        showUserApiKeySessionStorage();

        /**
         * check if user logged
         */
        $(window).on('login', function (e, data) {
            showUserApiKeySessionStorage();
        });

        $(window).on('resize', function(){showUserApiKeySessionStorage(true)} );

        header.on('click', function(){
            if (!$(this).hasClass('expanded')){
                $(this).addClass('expanded');
                instructions.slideDown(500)
            }
            else {
                $(this).removeClass('expanded');
                instructions.slideUp(500)
            }
        });

        function CreateElementForExecCommand (textToClipboard) {
            var forExecElement = document.createElement ("div");
            // place outside the visible area
            forExecElement.style.position = "absolute";
            forExecElement.style.left = "-10000px";
            forExecElement.style.top = "-10000px";
            // write the necessary text into the element and append to the document
            forExecElement.textContent = textToClipboard;
            document.body.appendChild (forExecElement);
            // the contentEditable mode is necessary for the  execCommand method in Firefox
            forExecElement.contentEditable = true;

            return forExecElement;
        }

        function SelectContent (element) {
            // first create a range
            var rangeToSelect = document.createRange ();
            rangeToSelect.selectNodeContents (element);

            // select the contents
            var selection = window.getSelection ();
            selection.removeAllRanges ();
            selection.addRange (rangeToSelect);
        }
        
        // Copy button click
        loggedUserKeyContainer.on("click", ".copy-btn", function() {
            var copyBtn = this;
            var content = copyBtn.dataset !== undefined ? this.dataset.clipboardText : copyBtn.getAttribute("data-clipboard-text");

            if (window.clipboardData) {
                window.clipboardData.setData("Text", content);
            } else {
                // create a temporary element for the execCommand method
                var forExecElement = CreateElementForExecCommand (content);

                /* Select the contents of the element
                 (the execCommand for 'copy' method works on the selection) */
                SelectContent(forExecElement);

                try {
                    var successful = document.execCommand('copy', false, null);
                    var msg = successful ? 'successful' : 'unsuccessful';
                    // console.log('Copying text command was ' + msg + successful);
                } catch (err) {
                    console.log('Oops, unable to copy');
                }
            }


            $(this).addClass('copied').delay(2000).queue(function(){
                $(this).removeClass('copied');
            });


        });
    });

})();
