'use strict';

Object.byString = function(o, s) {
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  var a = s.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
};

/*
 * API method = <resource></resource>
 * API base URL = <resources base="***"/>
 * API method URL =  <resource path="***"/>
 * API method parameters = <param/>
 * API method id = <resource><method id="***"/></resource>
 * API method name = <resource><method apigee:displayName="***"/></resource> or id if not found
 * API method AJAX method (GET/POST) = <resource><method name="***"/></resource>
 * API method link to documentation = <resource><method><doc apigee:url='***'></doc></method></resource>
 * API method description = <resource><method><doc>***</doc></method></resource>
 * API method category = <resource><method><? primary="true">***</?></method></resource>
 * */
(function($){

  var base = {}, //base object with parsed API data
    defaultMethod, //the very first method found (rendered by default)
    selectedMethod, //currently selected method
    defaultApiKey = apiKeyService.getApiExploreKey(), // Default API Key if no one is used
    apiKey = checkCookie('tk-api-key') || defaultApiKey, //API Key
    apiKeyDefault = apiKey, // default api key (temporarily used when there is no other api key available)
    slider, // slider with response columns
    spinner, // spinner
    timeout, // slert error message timeout
    primaryColumn = $('#primary-column'), // container with parameter inputs
    colors = [
      ' column-color-1',
      ' column-color-2',
      ' column-color-3',
      ' column-color-4',
      ' column-color-5',
      ' column-color-6',
      ' column-color-7',
      ' column-color-8',
      ' column-color-9',
      ' column-color-10',
      ' column-color-11',
      ' column-color-12'
    ], // array with color classes used to differentiate columns
    currentColumnColorIndex = -1, // current color index in color array used to set column background
    nextCircleColorIndex = currentColumnColorIndex, // color index used to display in circles
    screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0), // get screen width (used for slider reinitialization),
    worker = new Worker('../scripts/components/highlight-worker.js'); // Json-formatter worker

    function checkCookie() {
          var userApiKey;
          var apiKeys = JSON.parse("[" + window.atob(getCookie("tk-api-key")) + "]"); //decode and convert string to array
          if (apiKeys != "") {
              userApiKey = apiKeys[apiKeys.length-1];
              userApiKey = userApiKey[userApiKey.length-1];
              $('#api-key').val(userApiKey);
          }
          return userApiKey;
      }
      //get Cookie by name
      function getCookie(cname) {
          var name = cname + "=";
          var ca = document.cookie.split(';');
          for(var i = 0; i <ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0)==' ') {
                  c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                  return c.substring(name.length,c.length);
              }
          }
          return "";
      }

  /* INITIALIZATION PHASE */

  $(function () {
    var item = window.atob(getCookie("tk-api-email"));
    $(".apigee-login").text(item && (item !== 'undefined') ?  item : "Login");
    readFromWADL(); //parse WADL file when document is ready
    setListeners(); //click event for GET/POST button + clear buttons + api key + alert message timeouts + enter listeners
    spinner = $('#spinner');
    slider = $('#columns');
    initSlider(); // initialize slider depending on screen resolution
  });

  // calls slider initializator function with parameters defined by screen resolution
  var initSlider = function(){
    sliderInitializator(getResponsiveId(screenWidth));
  };

  // returns 1 if mobile; 2 if tablet and 4 if desktop (same as column number in slider)
  var getResponsiveId = function(width){
    if (width < 768){
      return 1;
    } else {
      if (width < 1200){
        return 2;
      } else {
        return 4;
      }
    }
  };

  // initializes slider
  var sliderInitializator = function(slidesToShow){
    slider.slick({ // initialize slide
      infinite: false,
      speed: 500,
      swipeToSlide: true,
      slidesToShow: slidesToShow,
      mobileFirst: true,
      dots: slidesToShow < 4
    });
    slider.slick("slickGoTo", getColumnCount() - 1);
    slider.slick("setPosition", getColumnCount() - 1);
  };

  var parseUrl = function () {
    var location = window.location.search;
    if (location) {
      var querys = location.replace(/^\?/g, '').split('&');
      var obj = {};

      querys.map(function (e) {
        var a = decodeURI(e).split('=');
        obj[a[0]] = a[1];
      });
      return obj;
    }
    return false;
  };

  /**
   * Set active Api dropdown from URL. Deep linking
   * @param obj
   */
  var setActiveDropdown = function (obj) {
    var apiSections = $('.api-dropdown .dropdown-toggle');
    apiSections.removeClass('selected-group');
    apiSections.filter(function () {
        return $(this).text().toUpperCase() === obj.api.toUpperCase() && $(this).addClass('selected-group');
    });
  };

  //sets parameter fields while deep linking
  var setParams = function(obj){
    primaryColumn
      .find('.parameter-item input')
      .each(function(){
        var $this = $(this);
        $this.val(obj[$this.attr('id')]).trigger('change');
    });
  };

  // builds page according to base data
  var buildPageLayout = function(){
    var first = true;

    // get query from url (deep linking)
    var params = parseUrl();

    //render droppowns within navigation bar
    for (var apiName in base) {
      addApiDropdown(apiName, first);
      first = false;
    }
    //set dropdown event listeners
    setDropdownListeners();

    if (params) {
      setActiveDropdown(params);
      renderPrimaryColumn(base[params.api][params.method], setParams.bind(null, params));
      selectedMethod = base[params.api][params.method];
    } else {
      //render primary column using the default method (the very first method found in WADL file)
      renderPrimaryColumn(defaultMethod); // no callback required
    }
  };

  // handles click event on GET/POST button + click events for CLEAR buttons + alert message timeouts
  var setListeners = function(){
    $(document).on('click', '#primary-btn', function (e){
      e.preventDefault();
      sendPrimaryRequest();
    });

    primaryColumn.on('keyup change', function(e){
      var input = $(e.target);
      if (e.target.tagName === "INPUT"){
        if (e.keyCode == 13){
          input.blur();
          sendPrimaryRequest();
        }
        else {
          if (input.attr('id') === 'id'){
            if (input.val() === 'undefined')
              input.addClass('error');
            else
              input.removeClass('error');
          }
        }
      }
    });

    $('#clear-params').on('click', function(e){
      e.preventDefault();
      clearParams();
    });

    $("#reformat-json").on('click', function(e){
      e.preventDefault();
      prettyfyJSON();
    });

    $("#clear-json").on('click', function(e){
      e.preventDefault();
      $('#post-json-area').val('');
    });

    $('#clear-req-resp').on('click', function(e){
      e.preventDefault();
      var container = $('#req-res-container'),
        items = container.find('.req-resp-temp');
      items.fadeOut(300);

      setTimeout(function(){
        items.remove();
				while (getColumnCount() > 0 ){
					slider.slick("slickRemove", 0);
				}
      }, 300);
    });

    $('#api-key')
      .change(function(){
        apiKey = $(this).val();
        apiKey = apiKey ? apiKey : apiKeyDefault;
      })
      .on('keyup', function(e){
        if (e.keyCode == 13){
          $(e.target).blur();
          sendPrimaryRequest();
        }
      });

    $('#error-alert, #success-alert')
      .on("shown.bs.modal", function(){
        var me = $(this);
        timeout = setTimeout(function(){
          me.modal("hide");
        }, 3000);
      })
      .on("hide.bs.modal", function(){
        clearTimeout(timeout);
      });

    $(window).on('resize', function(){ // since slick-inbuilt responsive object has bugs when slides are added/removed - we have to reinit slider when screen is resized
      var newScreenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      if (getResponsiveId(screenWidth) != getResponsiveId(newScreenWidth)){
        screenWidth = newScreenWidth;
        slider.slick("unslick");
        initSlider();
      }
    }).on('login', function (e, data) { apiKey=data.key });

    $('#parameters-btn').on('click', function(e){
      e.preventDefault();
      var btn = $(this);
      if (!btn.hasClass('expanded')){
        primaryColumnSlideDown();
      }
      else {
        primaryColumnSlideUp();
      }
    });

    $('#json-btn').on('click', function(e){
      e.preventDefault();
      var btn = $(this);
      if (!btn.hasClass('expanded')){
        dataJSONSlideDown();
      }
      else {
        dataJSONSlideUp();
      }
    });

    $('#cd-tour-trigger').on('click', function(){
      if (slider.find('.api-column').length == 0){
        sendPrimaryRequest(true);
      }
    });
    $('body').on('click touch', '#copy-request', copyToClipBoard);
  };

  // sets listeners for api dropdowns
  var setDropdownListeners = function () {
    $('body').on('click', '.nav', function (e){
      var targetElement = $(e.target);
      var target = targetElement.parent();

      if (targetElement.hasClass('api-doc-link')) {
        e.stopPropagation();
      } else if (target.hasClass('select-default-method')){
        e.preventDefault();

        $('.dropdown-toggle')
          .removeClass('selected-group');

        target
          .closest('.api-dropdown')
          .find('.dropdown-toggle')
          .addClass('selected-group');

        renderPrimaryColumn(base[target.attr('api-name')][target.attr('method-name')]); // no callback required
        selectedMethod = base[target.attr('api-name')][target.attr('method-name')];
      }
    });
  };

  // slides up parameter inputs container
  var primaryColumnSlideUp = function(){
    primaryColumn.slideUp(500);
    setTimeout(function(){
      $('#parameters-btn').removeClass('expanded');
    }, 500);
  };

  // slides down parameter inputs container
  var primaryColumnSlideDown = function(){
    primaryColumn.slideDown(500);
    setTimeout(function(){
      $('#parameters-btn').addClass('expanded');
    }, 500);
  };

  // slides up post json container
  var dataJSONSlideUp = function(){
    $('#post-json-container').slideUp(500);
    setTimeout(function(){
      $('#json-btn').removeClass('expanded');
    }, 500);
  };

  // slides down post json container
  var dataJSONSlideDown = function(){
    $('#post-json-container').slideDown(500);
    setTimeout(function(){
      $('#json-btn').addClass('expanded');
    }, 500);
  };

  // renders first column with query parameters
  var renderPrimaryColumn = function(method, callback){
    var isPrimaryVisible = false,
      primaryBtn = $('#primary-btn'),
      postJsonArea = $('#post-json-area'),
      postJson = $('#post-json'),
      isJsonAreaVisible = postJsonArea.is(':visible'),
      isJsonVisible = postJson.is(':visible');

    if (primaryColumn.is(':visible')){
      primaryColumnSlideUp(); //hide primary column
      isPrimaryVisible = true;
    }

    if (isJsonVisible){
      if (method.method !== "POST"){
        dataJSONSlideUp();
        setTimeout(function(){
          postJson.slideUp(100);
        }, 400);
      }
      else {
        if (postJsonArea.is(':visible')) {
          dataJSONSlideUp();
          isJsonAreaVisible = true;
        }
      }
    }

    setTimeout(function () {
      $('#selected-method-name').text(method.name);
      $('#doc-link')
        .attr('href', method.documentation)
        .fadeIn(100);
      primaryColumn
        .find('.parameter-item')
        .remove(); //remove all existing parameter fields
      primaryBtn
        .text(method.method)
        .removeClass('post'); //change text in 'run query button' (GET or POST)
      for (var param in method.parameters) { //render new paramater fields
        var par = method.parameters[param],
          name = par.name,
          element = $('<div class="col-lg-3 col-sm-6 col-xs-12 parameter-item"></div>'),
          input = $(['<input type="text" class="form-control event-param" placeholder="', name,'" id="', name,'" url-style="', par.style,'">'].join(''));

        param === "extensions" && input.val('geolocation');

        element.append(input);
        primaryColumn.append(element);
        new Tooltip(element);
      }

      if (method.method === "POST") {
        postJsonArea.val('');
        postJson.show();
        primaryBtn.addClass('post');
        if (screenWidth >= 768 && (isJsonAreaVisible || !isJsonVisible)) {
          dataJSONSlideDown();
        }
      }
      if (screenWidth >= 768 && isPrimaryVisible) {
        primaryColumnSlideDown();
      }
      if (callback) {
        callback();
      }
      $(document).trigger( "finishInit", [ "loadLazySelectPlugin" ] );
    }, isPrimaryVisible ? 500 : 0);
  };

  // adds API dropdpwn to navigation bar
  var addApiDropdown = function(apiName, selected){
    var dropDown = $('<li class="dropdown api-dropdown"></li>'),
      button = $('<button class="dropdown-toggle' + (selected ? ' selected-group' : '') + '" type="button" id="'
        + apiName.replace(/\s/g, '') + '" data-toggle="dropdown"><h4>' + apiName + '</h4></button>'),
      caret = $('<span class="caret"></span>'),
      ul = $('<ul class="dropdown-menu" role="menu" aria-labelledby="' + apiName +  '">');

    for (var method in base[apiName]) {
      var li = $('<li role="presentation"><a class="select-default-method" api-name="'
        + apiName + '" method-name="' + method + '" role="menuitem" tabindex="-1" href="#"><h3>' + base[apiName][method].name +  '</h3></a></li>');
      li.find('.select-default-method').append('<a href="' + base[apiName][method].documentation + '"' + 'class="api-doc-link"></a>'); // link to documentation
      ul.append(li);
    }

    button.append(caret);
    dropDown.append(button).append(ul);
    $('.nav').append(dropDown);
  };

  //gets important elements from WADL document and writes them into global variables
  var parseXMLDoc = function(xml){
    //get all APIs
    var APIs = $(xml).find("resources"),
      isFirstMethod = true; //variable to store the very first method found

    APIs.each(function(){
      //get all methods in the API
      var methods = $(this).find('resource');

      methods.each(function(){
        var me = $(this), //method
          method = $(me.find('method')[0]), //get method details object
          category = method.find('[primary="true"]').text(), //get API name
          params = me.find('param'), //method params
          parameters = {}; //temporary object to store param data

        params.each(function(){ //fill param object with required data
          var that = $(this);
          parameters[that.attr('name')] = {
            'name': that.attr('name'),
            'required': that.attr('required'),
            'type': that.attr('type'),
            'style': that.attr('style'),
            'default': that.attr('default'),
            'doc': that.first('doc').text().trim()
          }
        });

        if (!base[category])
          base[category] = {}; // create new API in base object if there is none

        base[category][method.attr("id")] = {
          'id' : method.attr("id"), // method id
          'name' : method.attr("apigee:displayName") ? method.attr("apigee:displayName") : method.attr("id"), // method name
          'method' : method.attr('name'), // GET or POST
          'category' : category, // API name
          'path': me.attr('path'), // method URL
          'parameters': parameters, // method parameters
          'base' : me.parent().attr('base'), // method base link
          'documentation' : $(method.find('doc')[0]).attr('apigee:url'), // link to documentation
          'description' : $(method.find('doc')[0]).text().trim() //method description
        };

        if (isFirstMethod){
          defaultMethod = base[category][method.attr("id")];
          selectedMethod = defaultMethod;
          isFirstMethod = false;
        }
      });
    });

    buildPageLayout();

  };

  //gets document from WADL configuration file
  var readFromWADL = function(){
    var xml;
    $.ajax({
      url: '../apidescription.xml',
      async : false,
      dataType: ($.browser.msie) ? "text" : "xml",
      success : function(response){
        if (typeof response == "string"){
          xml = new ActiveXObject("Microsoft.XMLDOM");
          xml.async = false;
          xml.loadXML(response);
        }
        else
          xml = response;
        parseXMLDoc(xml);
      },

      error: function(XMLHttpRequest, textStatus, errorThrown){
        alert('Data Could Not Be Loaded - '+ textStatus);
      }
    });
  };

  /* END OF INITIALIZATION PHASE FUNCTIONS */

  var setPaginationlistener = function () {
    var pageInput = $('#page');
    var page = +pageInput.val();
    var count = 0;
    var result = 0;

    if (!pageInput.length) {
      $('.pagination-btn').addClass('hide');
      return;
    }

    setEventHandler('.pagination-btn', 'click touch', function paginationBtn(e) {
      e.preventDefault();
      e.stopPropagation();
      if ($(this).hasClass('next-page')) {
        count++;
      } else if ($(this).hasClass('prev-page')) {
        count--;
      }

      result = page + count;

      if (result >= 0) {
        pageInput.val(result);
        $('#primary-btn').trigger('click');
      } else {
        count = 0;
        return false;
      }
    });
  };

  // column constructor
  var Column = function(configObject, responseObject, index, guId) {
    var self = this;
		console.log('config',configObject);
    self.guId = guId;
    self.responseObject = responseObject;
    self.destinationObject = {};
    self.colorIndex = currentColumnColorIndex;
    self.method = selectedMethod;
    self.usedParams = getAllParameteres();
    removeHandler('.pagination-btn');
    self.init = function () {
        var resPage = responseObject.page,
          subcolumn,
          listGroup,
          title;

      self.column = $([
        '<div class="api-column', colors[currentColumnColorIndex], (index ? ' transparent' : '') + '"></div>'// colorize column appropriately
      ].join('')).hide(); // if there was index provided -> column is a child of previous column and should become transparent

      for (var i = 0; i < configObject.length; i++) { // iterate through method main subcolumns
        subcolumn = configObject[i]; // subcolumn
        listGroup = $('<div class="list-group"></div>'); //subcolumn future element
        var isPage = subcolumn.title.toLowerCase() === 'page';
        title = $([
          '<a class="list-group-item active', (isPage ? ' api-explorer-pagination" id="api-explorer-pagination"' : '"'), '>',
            subcolumn["title"],
            isPage ?  [
              '<b id="next-page" class="pagination-btn next-page btn', isLast(resPage) ? ' hide': '','">&nbsp;</b>',
              '<b id="prev-page" class="pagination-btn prev-page btn', isFirst(resPage) ? ' hide': '','">&nbsp;</b>'
            ].join(''): '',
          '</a>'
        ].join('')); // subcolumn title

        var destinationObject = subcolumn["path"] ? Object.byString(self.responseObject, subcolumn["path"]) : self.responseObject; // object inside the response to iterate through
        destinationObject = index ? destinationObject[index]: destinationObject;
        self.destinationObject = destinationObject;

        listGroup.append(title);

        if (subcolumn["expandsTo"]){
          var nextIndex = getNextColorIndex();
          var string = getFirstLowercase(subcolumn.title);

          title
            .append($([
              '<a href="#"',
                'class="pull-right expand-new-method" ',// more button
                'method="',subcolumn["expandsTo"],'" ',
                'next-color-index="',nextIndex,'" ',
                'data-id="',(destinationObject.id ? destinationObject.id : (destinationObject[string] ? destinationObject[string].id : 'undefined')),
              '"></a>'
            ].join('')))
            .append($(['<p class="pull-right color-circle', colors[nextIndex],'"></p>'].join('')));
        }

        if (subcolumn["map"]) { // does subcolumn have latitude and longitude for map popup?
          var coordinatesDestination = subcolumn["map"]["coordinates"]["path"] ? Object.byString(destinationObject,  subcolumn["map"]["coordinates"]["path"]) : destinationObject, // if field has its additional path
            dataLat = coordinatesDestination ? coordinatesDestination[subcolumn["map"]["coordinates"]["latitude"]] : 'undefined', // latitude
            dataLng = coordinatesDestination ? coordinatesDestination[subcolumn["map"]["coordinates"]["longitude"]] : 'undefined', // longitude
            mapBtn = $('<a href="#" class="api-map-btn pull-right" data-lat="' + dataLat + '" data-long="' + dataLng + '"></a>'),
            subColumnMapImage;

          if (dataLat != 'undefined' && dataLng != 'undefined' && dataLat && dataLng)
            subColumnMapImage = getMapImage(dataLat, dataLng); // map image to be appended to column
          else { // if there are no coordinates available form map by address
            var address = '';
            for (var field in subcolumn["map"]["address"]){
              var fieldDestination = subcolumn["map"]["address"][field]["path"] ?  Object.byString(destinationObject,  subcolumn["map"]["address"][field]["path"]) : destinationObject; // if field has its own destination
              address += fieldDestination[subcolumn["map"]["address"][field]["id"]] + ','; // form address string
            }
            address = address.substring(0, address.length - 1); // remove last coma
            mapBtn.attr('data-address', address);
            subColumnMapImage = getMapImage(null, null, address); // map image to be appended to column
          }

          mapBtn.on('click', function(e){
            mapPopUpListener(e);
          });

          title.append(mapBtn);
        }

        if (i === 0) // append link to log to the first subcolumn
          title.append($('<a href="#" data-guid="' + self.guId + '" class="log-btn pull-right"></a>'));

        if (subcolumn["collection"]) {
          var itemCount = 0, // variable to store items count
            field = subcolumn["fields"][0], // field to be iterated in subcolumn
            expandsTo = field["expandsTo"],
            isExpandable = expandsTo ? true : false, // if field is expandable
            expandsToObject = isExpandable ? (typeof expandsTo == "object" ? true : false) : false, // is expandable to object (not to another method)
            destinationDeep = subcolumn["fields"][0]["path"] ? Object.byString(destinationObject,  subcolumn["fields"][0]["path"]) : destinationObject, // if field has its additional path
            isThumbnail = subcolumn["fields"][0]["thumbnail"] ? true : false, // if there is a thumbnail
            thumbNailPath = isThumbnail ? (subcolumn["fields"][0]["thumbnail"]["path"] ? subcolumn["fields"][0]["thumbnail"]["path"] : '') : ''; // if there is a thumbnail path - save it

          for (var item in destinationDeep){ // iterate through response items collection
            var dimension = (subcolumn["fields"][0]["showDimension"] && isThumbnail ) ? ( ' ('+ destinationDeep[item]["width"] +'x'+ destinationDeep[item]["height"] +')' ) : '';
            var firstFieldId = subcolumn.fields[0].id;
            var selector = $('<a class="list-group-item"></a>');
            var content = '';

            if (isExpandable) {
              selector.addClass('expandable');
              selector.attr('expand-path', expandsToObject ? i + '.fields.0.expandsTo': expandsTo);
            }

            if (subcolumn.path) {
              selector.attr('subcolumn-path', subcolumn.path);
            }

            selector.attr('index', item);

            if (isThumbnail) {
              var thumbnail = $('<img class="subcolumn-thumbnail" src="">');

              if (thumbNailPath) {
                thumbnail.attr('src', Object.byString(destinationDeep[item], thumbNailPath)[subcolumn["fields"][0]["thumbnail"]["id"]]);
              } else {
                thumbnail.attr('src', destinationDeep[item][subcolumn["fields"][0]["thumbnail"]["id"]]);
              }

              selector.append(thumbnail);
            }

            if (firstFieldId) {
              content = firstFieldId + ': '
            }

            if (destinationDeep[item][firstFieldId]) {
              selector.append(content + destinationDeep[item][firstFieldId]);
            } else {
              selector.append(content + '#' + item);
            }

            selector.append('</br>' + dimension);

            if (subcolumn.title.toLowerCase() == 'events') {
              if (destinationDeep[item].dates.start.localDate) {
                selector.append([
                  '<span class="additional-info date">',
                  destinationDeep[item].dates.start.localDate,
                  '</span>'
                ].join(''));
              }
              if (destinationDeep[item]._embedded && destinationDeep[item]._embedded.venues && destinationDeep[item]._embedded.venues[0]) {
                selector.append('<span class="additional-info venue">' + destinationDeep[item]._embedded.venues[0].name + '</span>')
              }
            }

            listGroup.append(selector);
            itemCount++;
          }
          title.prepend('<p class="subcolumn-count">' + itemCount + '</p>'); // show item count in sobcolumn title area

        } else {
          for (var field in subcolumn["fields"]) {
            var destinationDeep = subcolumn["fields"][field]["path"] ? Object.byString(destinationObject,  subcolumn["fields"][field]["path"]) : destinationObject, // if field has its additional path
              isThumbnail = subcolumn["fields"][field]["thumbnail"] ? true : false, // if there is a thumbnail
              thumbNailPath = isThumbnail ? (subcolumn["fields"][field]["thumbnail"]["path"] ? subcolumn["fields"][field]["thumbnail"]["path"] : '') : ''; // if there is a thumbnail path - save it

            if (destinationDeep){
              var listItem = $('<a class="list-group-item">'
                + (isThumbnail ? ('<img class="subcolumn-thumbnail" src="' // if there is thumbnail
                + (thumbNailPath ? (Object.byString(destinationDeep, thumbNailPath)[subcolumn["fields"][field]["thumbnail"]["id"]] + '">') : destinationDeep[subcolumn["fields"][field]["thumbnail"]["id"]] + '">')) : '') // if thumbnail has its own destination
                + subcolumn["fields"][field]["id"] + ': ' + destinationDeep[subcolumn["fields"][field]["id"]] + '</a>');
              listGroup.append(listItem);
            }
          }
        }
        self.column.append(listGroup);
        if (subColumnMapImage && subcolumn["map"]) { // append map image if there is any
          var imgListGroup = $('<div class="list-group"></div>'), //subcolumn future element
            imgTitle = $('<a class="list-group-item active">' + 'Map' + '</a>');
          imgListGroup.append(imgTitle).append(subColumnMapImage);
          self.column.append(imgListGroup);
          subColumnMapImage.on('click', function(e){
            mapPopUpListener(e);
          });
        }
      }
    };

    setPaginationlistener();

    self.render = function(){
      slider.slick('slickAdd', self.column);
      slider.slick('slickNext');
      setTimeout(function(){
        self.column.slideDown(700);
        spinner.hide();
      }, 500);
    };
    self.setEventListeners = function () {
      self.column.on('click', function (e) {
        var selfIndex = self.getIndex();
        if ($(e.target).hasClass('expandable')){ // if it is a field and it expands to new column
          changeSelectedMethod(self.method, self.usedParams, function(){ // change method selected above and fill in all parameter inputs
            self.makeColumnLast(); // swipes to maximum right to avoid slider jumping
            self.column.find('.list-group-item').removeClass('selected'); // unselect selected fields in column
            $(e.target).addClass("selected"); // select target field
            currentColumnColorIndex = self.colorIndex; // reset current column color index
            spinner.show(); // show spinner
            setTimeout(function(){ // timeout wait while slider animates
              self.removeAllColumnsToRight(selfIndex);
              var response = ($(e.target).attr("subcolumn-path") && index) ? (Object.byString(responseObject, $(e.target).attr("subcolumn-path") + '.' + index)): responseObject;
              new Column(Object.byString(configObject, $(e.target).attr("expand-path")), response, $(e.target).attr("index"), self.guId);
            }, 800);
          });
          return false;
        }

        if ($(e.target).hasClass('expand-new-method')){ // handles click event on More button
          e.preventDefault();
          var method = findMethodInBase($(e.target).attr("method")),
            paramArray = [{ // parameter input to be filled in. in this case only id parameter needs to be filled in
              'id' : 'id',
              'value' : $(e.target).attr("data-id")
            }];
          changeSelectedMethod(method, paramArray, function(){// change method selected above and fill in id parameter
            var url = formPrimaryURL(method);
            self.column.find('.list-group-item').removeClass('selected'); // unselect selected fields in column
            currentColumnColorIndex = $(e.target).attr('next-color-index'); // reset current column color index
            nextCircleColorIndex = currentColumnColorIndex; // reset next circle color index
            spinner.show();
            sendRequest(url, method.method, function(response, guid){
              self.makeColumnLast();
              setTimeout(function(){
                self.removeAllColumnsToRight(selfIndex);
                new Column(CONFIG[method.id], response, null, guid);
              }, 800);
            });
          });
          return false;
        }

        if ($(e.target).hasClass('subcolumn-thumbnail')){ // if thumbnail is clicked
          var popup =  $("#image-popup");
          popup.find('#image-element').attr('src', $(e.target).attr('src'));
          popup.modal();
          return false;
        }

        if ($(e.target).hasClass('log-btn')){ // if log button is pressed
          e.preventDefault();
          spinner.show();
          var logItem = $('#req-res-container').find('[href='+ '#' + self.guId + ']');
          if (!logItem.attr('aria-expanded') || logItem.attr('aria-expanded') === 'false')
            logItem.trigger('click');
          setTimeout(function(){
            spinner.hide();
            $('html, body').animate({ // scroll to slider
              scrollTop: logItem.offset().top - 10
            }, 1000);
          }, 500);
          return false;
        }
      });
    };
    self.makeColumnLast = function () { // slides to make current column last within current view
      var selfIndex = self.getIndex(),
        slidesToShow = slider.slick('slickGetOption', 'slidesToShow');

      slider.slick("slickGoTo", selfIndex - slidesToShow + 1);
      slider.slick('setPosition', selfIndex);
    };
    self.removeAllColumnsToRight = function(index){ // removes all right to columns[index] columns from slider
      while (getColumnCount() > index + 1 ){
        slider.slick("slickRemove", index + 1);
      }
    };
    self.getIndex = function () { // get column index in slider
      var child = self.column[0],
        parent = child.parentNode;
      // The equivalent of parent.children.indexOf(child)
      return Array.prototype.indexOf.call(parent.children, child);
    };
    self.init();
    self.render();
    self.setEventListeners();
  };

  // generates image element with google map
  var getMapImage = function(lat, lng, address){
    var coordinates = address ? address : (lat && lng ? (lat + ',' + lng) : '');
    if (coordinates){
      var dividor = slider.slick('slickGetOption', 'slidesToShow'),
        width = Math.ceil(parseFloat(slider.width() / dividor - 32)),
        height = 400,
        url = 'https://maps.googleapis.com/maps/api/staticmap?center=' + // base url
          coordinates + '&' // coordinates
          + 'zoom=8' + '&' //zoom
          + 'size=' + width + 'x' + height + '&' //size
          + 'format=JPEG' + '&'// image format
          + 'markers=color:red%7Clabel:V%7C' + coordinates;// marker with the same coordinates with V label
      //+ '&key=AIzaSyBQrJ5ECXDaXVlICIdUBOe8impKIGHDzdA'; // api key (vmfreakmonkey@gmail.com)

      var img = $('<img data-lat="' + lat + '" data-long="' + lng + '" data-address="' + address + '" class="api-column-map-image" src="' + url + '">');

      img
        .on('error', function() {
          var imgElem = $('.api-column-map-image');
          img = $('<button class="button button-blue" style="width: 92%;margin: 4%;" data-lat="' + lat + '" data-long="' + lng + '" data-address="' + address + '">Show map</button>');
          imgElem.parent().append(img);
          imgElem.remove();

          img.on('click', function(e){
            mapPopUpListener(e);
          });
        })
        .attr("src", $(img).attr("src"))
      ;

      return img
    }
    else
      return false;
  };

  // shows google maps popup
  var showMapPopup = function(lat, lng, address){
    var map,
      marker,
      mapEl = $('#map-popup'),
      geocoder = new google.maps.Geocoder(),
      latLng = (lat && lng ? {lat: lat, lng: lng} : new google.maps.LatLng(0, 0));

    // initialize map object
    map = new google.maps.Map(document.getElementById('map'), {
      center: latLng,
      zoom: 8
    });
    if (address){ // if there was address provided
      geocodeAddress(geocoder, map, address, function(result){ // geocode address and center the map
        latLng = result;
      });
    }
    else { // if not (means lat and long were provided)
      marker = new google.maps.Marker({ //Create a marker and set its position.
        map: map,
        position: latLng
      });
    }
    // when map popup is shown
    mapEl.on("shown.bs.modal", function () {
      google.maps.event.trigger(map, "resize");
      // Recenter the map now that it's been redrawn
      map.setCenter(latLng);
    });
    mapEl.modal(); // show map popup
  };

  // translates address into lat/long
  var geocodeAddress = function(geocoder, map, address, callback) {
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
        callback(results[0].geometry.location);
      } else {
        showErrorPopup("Coordinates are not defined :(");
      }
    });
  };

  // map or button click listener
  var mapPopUpListener = function (e) {
    e.preventDefault();
    var lat = $(e.target).attr('data-lat') != "undefined" ? parseFloat($(e.target).attr('data-lat')) : null,
      lng = $(e.target).attr('data-long') != "undefined" ? parseFloat($(e.target).attr('data-long')) : null,
      address = lat && lng ? null : $(e.target).attr('data-address');
    if (lat && lng || address)
      showMapPopup(lat, lng, address);
    else
      showErrorPopup("Coordinates are not defined :(");
  };

  // changes method selected above and fills in parameters
  var changeSelectedMethod = function (method, paramObjectArray, callback){
    var fillInInputVals = function () { // fill in all inputs
      for (var i = 0; i < paramObjectArray.length; i++){
        var input = primaryColumn.find('#' + paramObjectArray[i]['id']);
        input.val(paramObjectArray[i]['value']);
        input.trigger('change');
      }
    };
    var scroll = function () { // scroll up to slider top and run callback
      if (slider.offset().top <= window.pageYOffset)
        scrollToSlider(400);
      callback();
    };
    if (selectedMethod.id != method.id){ // if new method is called rerender the parameters container
      renderPrimaryColumn(method, function(){
        var selectedGroup = $('.selected-group'),
          apiId = method.category.replace(/\s/g, '');
        selectedMethod = method;
        if (selectedGroup.attr('id') !== apiId){ // change highlighted dropdown if needed
          selectedGroup.removeClass('selected-group');
          $('#' + apiId).addClass('selected-group');
        }
        fillInInputVals();
        setTimeout(function(){ // restore previous scroll position as per slider when primary column slides down (in 500ms)
          scroll(); // scroll to slider if necessary and run callback in 500 ms
        }, 500);
      });
    }
    else { // if not - just fill in the id and scroll up to slider if necessary
      fillInInputVals();
      scroll(); // scroll to slider if necessary and run callback
    }
  };

  // gets current column count in slider
  var getColumnCount = function () {
    return $('.slick-track > div').length;
  };

  // sends request to get the second column
  var sendPrimaryRequest = function (visible) {
    currentColumnColorIndex = getNextColorIndex();
    var url = formPrimaryURL(selectedMethod);
    if (!visible)
      spinner.show();

    sendRequest(url, selectedMethod.method, function(response, guid){
      slider.slick('slickGoTo', 0);
      setTimeout(function(){
        while (getColumnCount() > 0 ){
          slider.slick("slickRemove", 0);
        }
        new Column(CONFIG[selectedMethod.id], response, null, guid);
        if (!visible)
          scrollToSlider();
      }, 1000);
    });
  };

  // scrolls page to slider
  var scrollToSlider = function (ms) {
    $('html, body').animate({ // scroll to slider
      scrollTop: slider.offset().top + 25
    }, ms ? ms : 1500);
  };

  // returns next color index in colors array
  var getNextColorIndex = function () {
    if (nextCircleColorIndex < (colors.length - 1)){
      nextCircleColorIndex = parseInt(nextCircleColorIndex) + 1;
    }
    else {
      nextCircleColorIndex = 0;
    }
    return (nextCircleColorIndex == currentColumnColorIndex ? getNextColorIndex() : nextCircleColorIndex); //ensure next circle color is not the same as column color
  };

  // temporary function. returns method object by its id (no API name available)
  var findMethodInBase = function (id) {
    for (var api in base){
      for (var method in base[api]){
        if (method === id){
          return base[api][method];
        }
      }
    }
  };

  // forms URL for 1st column, based on base URL, template, template parameters and additional query parameters
  var formPrimaryURL = function (method) {
    var params = getAllParameteres(), // parameter values from 1st column
      url = method.path, // selected method's url
      query = ""; // string with non required parameters

    $(params).each(function(){
      var each = this,
        val = each.value ? true : false;
      if (method.parameters[each.id].style === "template"){
        // embed parameter into base url if it has template style
        url = url.replace('{' + each.id + '}', val ? each.value : method.parameters[each.id].default);
        primaryColumn.find('#' + each.id).val(val ? each.value : method.parameters[each.id].default); // set value to template param text boxes
      }
      else {
        // form string with additional parameters
        query = val ? (query + '&' + each.id + '=' + each.value) : query;
      }
    });

    url = method.base + '/' + url + '?apikey' + '=' + apiKey + query;
    return url;
  };

  // gets all parameter values from the 1st column
  var getAllParameteres = function () {
    var params = primaryColumn.find('.parameter-item input'),
      paramArray = [];

    params.each(function(){
      var each = $(this);
      paramArray.push({
        "id" : each.attr("id"),
        'value' : each.val()
      });
    });
    return paramArray;
  };

  //clears all parameter fields
  var clearParams = function () {
    primaryColumn.find('.parameter-item input').each(function(){
      $(this).val('').trigger('change');
    })
  };

  //highlight the code (json)
  var highlightCode = function (selector, code) {
    var animTime = 100;

    worker.onmessage = function(event) {
      $(selector).prepend(event.data);

      setEventHandler('.tm-code-container .expanded', 'click touch', function jsonCodeContainerExpanded(e) {
        e.preventDefault();
        e.stopPropagation();
        var $self = $(this);
        $self
          .parent()
          .find('>ul')
          .slideUp(animTime, function() {
            $self.addClass('collapsed');
          });
      });

      setEventHandler('.tm-code-container .expanded.collapsed', 'click touch', function jsonCodeContainerCollapsed(e) {
        e.preventDefault();
        e.stopPropagation();
        var $self = $(this);
        $self
          .removeClass('collapsed')
          .parent()
          .find('>ul')
          .slideDown(animTime, function() {
            $self
              .removeClass('collapsed')
              .removeClass('hidden');
          });
      })
    };
    
    worker.postMessage(code);
  };

  //universal ajax request sender
  var sendRequest = function (url, method, callback) {
    //spinner.show();

    $.ajax({
      type: method,
      url: url,
      async: true,
      dataType: "json",
      data: $('#post-json').is(':visible') ? prettyfyJSON() : null,
      success: function(response, textStatus, jqXHR) {
        var guid = guId(),//generate unique id for each accordion item
            selector,
            reqResItem,
            fadeInTime = 1000;

        selector = [
          '<div class="panel panel-default req-resp-temp">',
            '<div class="panel-heading">',
              '<h4 class="panel-title">',
                '<p class="pull-left color-circle', colors[currentColumnColorIndex], '"></p>',
                '<a data-toggle="collapse" data-parent="#req-res-container" href="#', guid, '">',
                  url,
                  '<span class="caret"></span>',
                '</a>',
              '</h4>',
            '</div>',
            '<div id="', guid, '" class="panel-collapse collapse">',
              '<div class="panel-body">',
                '<pre>',
                  '<code class="language-json"></code>',
                '</pre>',
              '</div>',
            '</div>',
          '</div>'
        ].join('');

        // removes old code-container handlers
        removeHandler('.tm-code-container .expanded');
        removeHandler('.tm-code-container .expanded.collapsed');

        // injects formatted json to code block
        highlightCode('.language-json', jqXHR.responseText);

        reqResItem = $(selector).hide().fadeIn(fadeInTime);

        $('#req-res-container').prepend(reqResItem);
        $('#clear-req-resp').fadeIn(fadeInTime);

        if (this.data) { // if there was any data posted - just show success popup
          $('#success-alert').modal();
        } else {
          callback(response, guid);
        }
      },
      error: function(xhr, status, err) {
        spinner.hide();
        showErrorPopup('Whoa! Method returned an error. :(');
        console.error(err);
      }
    });
  };

  // shows popup when error occured
  var showErrorPopup = function(message){
    var alert = $('#error-alert');
    alert.find('#error-message').text(message);
    alert.modal();
  };

  //generates unique id for each request response element
  var guId = function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  };

  // tooltip for parameter fields constructor
  var Tooltip = function(el){
    var self = this;
    self.el = el;
    self.tooltipDiv = $('<div class="param-tooltip">' + self.el.find('input').attr('id') + '</div>');
    self.init = function(){
      self.el.append(self.tooltipDiv);
    };
    self.init();
  };

  // reformat json string to display it properly
  var prettyfyJSON = function () {
    var textarea = document.getElementById('post-json-area'),
      ugly = textarea.value,
      obj = {},
      pretty = "";

    try {
      obj = JSON.parse(ugly);
      pretty = JSON.stringify(obj, undefined, 4);
      textarea.value = pretty;
    } catch (e) {
      return null;
    }
    return JSON.stringify(obj);
  };

  var formDeepLinkingUrl = function () {
    var location = window.location;
    var params = getAllParameteres();
    var querys = ['api=' + encodeURI(selectedMethod.category), 'method='+ encodeURI(selectedMethod.id)];
    for(var i in params) {
      if (params.hasOwnProperty(i) && params[i].value) {
        querys.push([params[i].id, '=', params[i].value].join(''));
      }
    }
    return [location.origin, location.pathname.replace(/\/$/gmi, ''), '?', querys.join('&')].join('');
  };

  var copyToClipBoard = function (e) {
    e.preventDefault();
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute("id", "dummy_id");
    document.getElementById("dummy_id").value = formDeepLinkingUrl();
    dummy.select();

    try {
      var successful = document.execCommand("copy");
      var msg = successful ? 'successful' : 'unsuccessful';
      console.info('Copying text command was ' + msg);
    } catch (err) {
      console.warn('Unable to copy');
    }
    document.body.removeChild(dummy);
  };

  // helper functions ----------------------

  /**
   * Checks for last page
   * @param page {object}
   * @returns {boolean}
   */
  function isLast(page) {
    if (!page) return false;
    return +page.number >= +page.totalPages -1;
  }

  /**
   * Checks for first page
   * @param page {object}
   * @returns {boolean}
   */
  function isFirst(page) {
    if (!page) return false;
    return +page.number === 0;
  }

  /**
   * Removes delegated handler
   * @param selector {string}
   * @param namespace {string}
   */
  function removeHandler(selector, namespace) {
    var eventName = [
      namespace ? 'click.' + namespace: 'click',
      namespace ? 'touch.' + namespace: 'touch'
    ].join(' ');

    $(document).undelegate(selector, eventName);
  }

  /**
   * Makes transforms first letter to lowercase
   * @param string
   * @returns {string}
   */
  function getFirstLowercase(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }

  /**
   * Sets delegated event handler
   * @param selector {string}
   * @param events {string}
   * @param callback {function}
   * @returns {boolean}
   */
  function setEventHandler(selector, events, callback) {
    if (!selector || !events || typeof callback !== 'function' || !callback.name) {
      console.error('set Handler fails');
      return false;
    }
    
    $(document).on(events, selector, callback);
  }

  
  
}(jQuery));

