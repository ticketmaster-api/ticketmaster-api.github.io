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
        'event-offers': '?req=%7B%22resource%22%3A%22commerce_events_offers%22%2C%22params%22%3A%7B%22query%22%3A%7B%7D%2C%22template%22%3A%7B%22version%22%3A%22v2%22%2C%22id%22%3A%2205004F24E0B864B3%22%2C%22format%22%3A%22json%22%7D%2C%22headers%22%3A%7B%7D%2C%22body%22%3A%7B%22attachmentFormat%22%3A%22mime%22%2C%22attachmentContentDisposition%22%3A%22form-data%22%7D%7D%2C%22verb%22%3A%22get%22%7D'
    };

    $(document).ready(function(){
        var header = $('#instructions-header'),
            instructions = $('#console-instructions'),
            iframe = $('#console-iframe');

        if (getQueryVariable('id') && consoleUrls[getQueryVariable('id')]){
            iframe.attr('src', iframe.attr('src') + consoleUrls[getQueryVariable('id')]);
        }

        if (!sessionStorage.getItem('console_visited')){
            instructions.show();
            header.addClass('expanded');
            sessionStorage.setItem('console_visited', 'true');
        }

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
    });

})();