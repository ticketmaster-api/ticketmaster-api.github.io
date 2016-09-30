/**
 * availiable option : {floatVal:true}
 * $('.js_numeric_input').checkNumeric( {floatVal:true} );
 * or add attribute to html: data-float="true"

 * markup example:
 * <input class="js_numeric_input" type="number" value="12" max="15" min="10" required="" step="2" data-float="true">
 */

/*
(function($){
  var isModalLoad = false;
  // load the html file using ajax
  $.get("/scripts/components/templates/lazy-selector-modal.html", function(resp){
  var data = $('body').append(resp);
  console.log('data' , data);
  //data.modal();
  }).done(function() {
  isModalLoad = true;
  console.log( "second success" );
  });

  //$("body").load("/scripts/components/templates/lazy-selector-modal.html");

  if(isModalLoad) {}
  console.log('data 2', isModalLoad);

})(jQuery);
*/

(function($){
  
    jQuery.fn.lazySelector = function (options) {
      var defaults = {},
          settings = $.extend({}, defaults, options),
          $iconButton = '<a class="icon" id="get-event-by-Id" data-toggle="modal" data-target="#js_ls-modal"></a>';

      var stateConf = {
        pageIncrement: 0,
        loadingFlag: false
      };

      var $modal = $('#js_ls-modal'),
          $form = $('#js_lazy-sel_form', $modal),
          $ul = $('#js_lazy-sel_list'),
          $liFooter = $('.list-footer'),
          $hr = $('#js_ls-top-hr'),
          $btn = $modal.find('#js_ls-modal_btn'),
          btnCloseMap = $('.button-close-map',$modal),
          cssValidationClass = 'get-eventId_form-validation';
      var modalContent = $('.modal-content' , $modal);

      var keyword = $form.find('#keyword'),
          apikey = $('#w-tm-api-key').val() || '7elxdku9GGG5k8j0Xm8KWdANDgecHMV0',
          selector = options || 'events',
          eventUrl = 'https://app.ticketmaster.com/discovery/v2/'+selector+'.json';

      var $input = $(this);

      function formatDate(date) {
        var result = '';
        if(!date.day) return result; // Day is required

        var MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
            dayArray = date.day.split('-'),
            d = parseInt(dayArray[2]),
            M = parseInt(dayArray[1]);

        var E = new Date(date.day).getDay();

        //var E1 = new Date(+date.day.split('-')[0],(+date.day.split('-')[1])-1,+date.day.split('-')[2]).getDay();
        //if(E !== E1) console.log('\t alarm equal - ' , E === E1);

        result = DAY_NAMES[E] + ', ' + MONTH_NAMES[M - 1] + ' ' + d + ', ' + dayArray[0];

        if(!date.time) return result;

        var timeArray = date.time.split(':'),
            H = parseInt(timeArray[0]),
            m = timeArray[1],
            a = "AM";

        if (H > 11) a = "PM";
        if (H == 0) {
          H = 12;
        } else if (H > 12) {
          H = H - 12;
        }

        return result + ' ' + getNormalizedDateValue(H) + ':' + m + ' ' + a;
      }
      function getNormalizedDateValue(val){
        return (val < 0 || val > 9 ? "" : "0") + val
      }

      // map or button click listener
      var mapPopUpListener = function (e) {
        e.preventDefault();
        var lat = $(e.target).attr('data-latitude') != "undefined" ? parseFloat($(e.target).attr('data-latitude')) : null,
            lng = $(e.target).attr('data-longitude') != "undefined" ? parseFloat($(e.target).attr('data-longitude')) : null,
            address = lat && lng ? null : $(e.target).attr('data-address');

        // console.log("lat");
        if(lat && lng || address) {
          initMap(lat, lng, address);
        }else{
          initMap(0, 0, address);
          console.log("Coordinates are not defined :(");
        }
      };

      // shows google maps popup
      var initMap = function(lat, lng, address){
        var map,
            marker,
            mapEl = $('#js_ls-modal'),
            geocoder = new google.maps.Geocoder(),
            mapCenter = new google.maps.LatLng(lat || 55, lng || 43),
            latLng = (lat && lng ? {lat: lat, lng: lng} : new google.maps.LatLng(0, 0));

        // initialize map object
        map = new google.maps.Map(document.getElementById('map-canvas'), {
          center: mapCenter,
          zoom: 8
        });
        /*if (address){ // if there was address provided
          geocodeAddress(geocoder, map, address, function(result){ // geocode address and center the map
            latLng = result;
          });
        } else { // if not (means lat and long were provided)*/
        //}

        marker = new google.maps.Marker({ //Create a marker and set its position.
            map: map,
            position: mapCenter
          });

        // when map popup is shown
        mapEl.on("shown.bs.modal", function () {
          google.maps.event.trigger(map, "resize");
          // Recenter the map now that it's been redrawn
          map.setCenter(mapCenter);
        });
        mapEl.modal(); // show map popup
      };

      function closeMapListener() {
        modalContent.removeClass('narrow');
        // $(this).hide();
        btnCloseMap.hide();
      }

      btnCloseMap.on('click', closeMapListener)

      return this.each(function () {
        var $input = $(this);
        init($input);
        //console.log('$input', $input);

        function init(input) {
          // console.log('lazySelector init');
          // console.log('selector', selector );
          if(selector === 'venues'){
            $('.modal-title span', $modal).text(selector),
            $('#js_ls-more_btn' , $ul).text('SHOW MORE ' + selector)

          }
          input.wrap('<div class="lazy-selector-wrapper"></div>');
          input.after($iconButton);
        }

        var loading = function (action) {
          var spinner = $('#spinner-ls', $modal);
          // add the overlay with loading image to the page
          if (action == "on") {
            spinner.show();
          }
          else if (action == "off") {
            spinner.hide();
          }

        };

        function resetForm() {
          stateConf.pageIncrement = 0;
          var listItems = $ul.find('li');
          listItems.remove();
          $hr.hide();
          $liFooter.hide();
          /*$form.find('input').each(function(){
           var $self = $(this);
           if($self.attr('id','keyword')){
           $self.val('');
           }
           });*/

          // Clear highlight
          $form.removeClass(cssValidationClass);
        }

        function submitForm(/*optional*/pageNumero) {
          pageNumero = parseInt(pageNumero);

          var url = ( isNaN(pageNumero) )
              ? eventUrl + '?apikey=' + apikey + '&keyword=' + keyword.val()
              : eventUrl + '?apikey=' + apikey + '&keyword=' + keyword.val() + '&page=' + pageNumero;

          //stop load
          if (isNaN(pageNumero) && pageNumero !== 0 && stateConf.loadingFlag === 'STOP_LOAD') {
            renderResults(null, $ul);
            console.log('stateConf.loadingFlag - top', stateConf.loadingFlag);
            return false
          }
          ;

          if (stateConf.loadingFlag === 'FINAL_PAGE') return false;

          // console.log('ajax - start');
          $.ajax({
            dataType: 'json',
            async: true,
            url: url,
            data: $form.serialize()
          }).done(function (result) {
            if (result) {

              //last page reached
              if (stateConf.pageIncrement === result.page.totalPages && result.page.totalElements > 0) {
                stateConf.loadingFlag = 'STOP_LOAD';
                loading('off');
                renderResults(result, $ul); //add message at bottom of list
                return false;
              };

              renderResults(result, $ul);
              loading('off');
            } else {
              console.log('no result found');
            }
          }).fail(function (e) {
            console.log('There was an fail status - ${e.status}');
            loading('off');
            renderResults('FAIL', $ul);
          });

        }

        function getImageForEvent(images) {
          images.sort(function (a, b) {
            if (a.width < b.width)
              return -1;
            else if (a.width > b.width)
              return 1;
            else
              return 0;
          });
          return images[1].url;
        }

        function renderListEvents (items) {
          var src ;
          items.map(function (item) {
            var li = $('<li/>')
                .addClass('list-group-item row')
                .insertBefore($liFooter);
            // .appendTo(ulElement);
            var leftCol = $('<div class="clear-padding" />').appendTo(li);
            var spanImg = $('<span class="thumbnail" />')
                .appendTo(leftCol);

            if(item.images){
              src = "src=" + getImageForEvent(item.images);
            } else {
              src = 'style="background-color: #f7f9fa;width: 120px; border: none;"' ;
            }

            var img = $('<img ' +src+ ' />')
                .addClass('list-group-item-heading')
                .appendTo(spanImg);

            var $wrapCol = $('<div class="event-text-wrapper"/>')
                .appendTo(li);
            if(item.name) {
              var title = $('<h4/>')
                  .addClass('list-group-item-heading')
                  .text(item.name)
                  .appendTo($wrapCol);
            }

            /*add time*/
            var currentEvent = {};
            currentEvent.date = {
              day: item.dates.start.localDate,
              time: item.dates.start.localTime,
              dateTime: item.dates.start.dateTime
            };

            var time = formatDate(currentEvent.date);
            var eventTime = $('<h4 class="event-time gray"/>')
            //.addClass('event-time')
                .text(time)
                .appendTo($wrapCol);
            /*add time end*/

            if (item._embedded) {

              if (item._embedded.venues) {
                var venue = item._embedded.venues[0];
                var addressName = $('<span/>')
                    .addClass('address-name')
                    .text(venue.name + '. ')
                    .appendTo($wrapCol);

                if ('address' in venue && 'line1' in venue.address) {
                  var addressline1 = $('<span/>')
                      .addClass('address-line1')
                      .text(venue.address.line1)
                      .appendTo($wrapCol);
                  if ('line2' in venue.address) {
                    var addressline1 = $('<span/>')
                        .addClass('address-line2')
                        .text(venue.address.line2)
                        .appendTo(addressline1);
                  }
                }
                /*if ('location' in venue) {
                  //add button <Show on map> if 'location' exist
                  var buttonMap = $("<button style='display: none;' data-latitude=" + venue.location.latitude + " data-longitude=" + venue.location.longitude + "/>")
                      .addClass('js_open-map_btn btn btn-submit')
                      .text('Show location')
                      .appendTo(buttonSetId)
                      .wrap('<div class ="wrapper-location_btn"/>');
                }*/
              } else {
                console.log('no _embedded found');
              }
            }

          if(item.id){
            //add button <Set this ID> if 'location' exist
            var buttonSetId = $("<button data-event=" + item.id + "/>")
                .addClass('js_lazy-sel_btn btn btn-submit')
                .text('Set this ID')
                .appendTo(li)
                .wrap('<div class ="wrapper-btns text-right"/>');
          }

          });
        }
        function renderListVenues(items) {
          items.map(function (item) {

            var li = $('<li/>')
                .addClass('list-group-item row')
                .insertBefore($liFooter);
            // .appendTo(ulElement);
            if(item.images){
              var leftCol = $('<div class="clear-padding" />').appendTo(li);
              var spanImg = $('<span class="thumbnail" />')
                  .appendTo(leftCol);
              var img = $('<img src=' + getImageForEvent(item.images) + ' />')
                  .addClass('list-group-item-heading')
                  .appendTo(spanImg);
            }

            var $wrapCol = $('<div class="event-text-wrapper clear-margin-left"/>')
                .appendTo(li);

            if(item.name){
            var title = $('<h3/>')
                .addClass('list-group-item-heading')
                .text(item.name)
                .appendTo($wrapCol);
            }

            if(item.dates) {
              // console.log('item.dates' , item.dates);
              /*add time*/
              var currentEvent = {};
              currentEvent.date = {
                day: item.dates.start.localDate,
                time: item.dates.start.localTime,
                dateTime: item.dates.start.dateTime
              };

              var time = formatDate(currentEvent.date);
              var eventTime = $('<h4 class="event-time gray"/>')
              //.addClass('event-time')
                  .text(time)
                  .appendTo($wrapCol);
              /*add time end*/
            }

            if (item) {
              var venue = item; // item._embedded.venues[0];
              var contryStateName = $('<h4/>')
                  .addClass('country-name gray')
                  .text((venue.country && venue.country.name) ? venue.country.name + '. ' : '')
                  .append((venue.state && venue.state.name) ? venue.state.name + '. ' : '')
                  .appendTo($wrapCol);
              var cityName = $('<span/>')
                  .addClass('address-name')
                  .text((venue.city && venue.city.name) ? venue.city.name + '. ' : '')
                  .appendTo($wrapCol);

              if ('address' in venue && 'line1' in venue.address) {
                var addressline1 = $('<span/>')
                    .addClass('address-line1')
                    .text(venue.address.line1 + '.')
                    .appendTo($wrapCol);
                if ('line2' in venue.address) {
                  var addressline1 = $('<span/>')
                      .addClass('address-line2')
                      .text(venue.address.line2)
                      .appendTo(addressline1);
                }
              }

            }else {
              console.log('no _embedded found');
            }

            if(item.id){
              var buttonSetId = $("<button data-event=" + item.id + "/>")
                .addClass('js_lazy-sel_btn btn btn-submit')
                .text('Set this ID')
                .appendTo(li)
                .wrap('<div class ="wrapper-btns text-right"/>');
              if ('location' in venue && venue.location.latitude && venue.location.longitude) {
                //console.log('venue.location - ' , venue.location);
                var buttonMap = $("<button style='float: right;' data-latitude=" + venue.location.latitude + " data-longitude=" + venue.location.longitude + "/>")
                    .addClass('js_open-map_btn btn btn-transparent')
                    .text('Show on map')
                    .insertAfter(buttonSetId)
                    //.appendTo(buttonSetId)
                    .wrap('<div class ="wrapper-location_btn"/>');
              }
            }

          });
        }

        var renderResults = function (data, ulElement) {
          var items = (selector === 'events')
              ? (data && data._embedded && data._embedded.events) ? data._embedded.events:['']
              : (data && data._embedded && data._embedded.venues) ? data._embedded.venues:[''] ;
          // console.log('selector * renderResults', selector , 'items' , items);

          function showMessage(element, message, /*optional*/clearList) {
            $btn.attr('disabled', false);

            if (clearList) $('li', element).remove();
            element.css({
              'overflow': 'auto'
            });
            $('<li/>')
                .addClass('list-group-item text-center')
                .text(message)
                .appendTo(ulElement);
          }


          if (stateConf.loadingFlag === "FINAL_PAGE") return false; //exit if has reached last page

          //show fail msg
          if (data === 'FAIL') {
            showMessage($ul, 'Failure, possible key not correct.', true);
            return false;
          }

          if (stateConf.loadingFlag === 'STOP_LOAD' && data.length !== 0) {
            stateConf.loadingFlag = "FINAL_PAGE";
            showMessage(ulElement, 'No more results.', false);
            $liFooter.hide();
            return false;
          }

          if (data === null || !data._embedded) {
            showMessage(ulElement, 'No results found.', true);
            return false;
          }

          //start render data
          if(selector === 'events') {
            renderListEvents(items)
          } else{
            renderListVenues(items);
          }

          //hide scroll if recive less then 2 items
          if (data && data.page && data.page.totalElements <= 2) {
            $ul.css({overflowY: "hidden"});
          } else $ul.css({overflowY: "scroll"});

          // hide/show horisontal line and button <load more>
          if (data && data.page && data.page.totalElements > 20 ) {
            $hr.show();
            $liFooter.show();
          } else {
            $hr.hide();
            $liFooter.hide();
            if (data.page.totalElements > 0 || items.length > 0) $hr.show();
          }

          // hide button <load more> if nothing left to load
          if (stateConf.loadingFlag === 'STOP_LOAD' || (stateConf.pageIncrement + 1)  === data.page.totalPages ) {
            //console.log('.modal-footer  ---- hide', stateConf.loadingFlag);
            $hr.hide();
            $liFooter.hide();
          }

          //<show map> button
          $('.js_open-map_btn').on('click', function (e) {
            var mapCanvas = $("#map-canvas");
            var ltd = e.target.getAttribute('data-latitude'),
                lgt = e.target.getAttribute('data-longitude');
            // console.log('myMap show ', ltd, lgt);
            mapPopUpListener(e);
            modalContent.addClass('narrow');
            btnCloseMap.show();
          });

          $('.js_lazy-sel_btn').on('click', function (e) {
            var selectedID = e.target.getAttribute('data-event');
            $input.val(selectedID);
            $input.attr('value',selectedID);
            $input.trigger('change');  //update widget:
            // console.log('$input ', $input);

            /*
             //update widget:

             //find configurator and widget
             var  widget = widgetsCountdown[0],
             widgetNode = document.querySelector("div[w-tmapikey]");
             var isFullWidthTheme = function (){ return widgetNode.getAttribute('w-theme') === "fullwidth" };

             $('#w-id').val(selectedID);
             widgetNode.setAttribute('w-id',selectedID);
             if(isFullWidthTheme){
             widgetNode.style.width = '100%';
             }

             widget.update(isFullWidthTheme);
             */

            // Close dialog
            $modal.modal('hide');
          });

          //set availible <Get> button after load is finished
          $btn.attr('disabled', false);

        };

        // EVENTS

        $btn.on('click', function (e) {
          mapPopUpListener(e);
          var form = $form.get(0);
          //console.log('click $btn' ,$btn);
          if (!$btn.is(':disabled')) {
            if (form.checkValidity()) {
              $btn.attr('disabled', true);
              stateConf.pageIncrement = 0;
              stateConf.loadingFlag = 'KEEP_LOAD';
              loading('on'); //show loading-spinner
              resetForm(); //clear
              submitForm(stateConf.pageIncrement);
            } else {
              // Highlight errors
              if (form.reportValidity) form.reportValidity();
              $form.addClass(cssValidationClass);
            }
          }
        });

        $('#js_ls-more_btn').on('click', function (elm) {
          stateConf.pageIncrement++;
          $btn.attr('disabled', true);
          loading('on');
          submitForm(stateConf.pageIncrement);
        });

        /*on scroll bottom of list*/
        /*
         $ul.on('scroll', function (elm){
         //submitForm when go to bottom of list
         if($form.get(0).checkValidity()) {
         if (this.scrollTop + this.clientHeight == this.scrollHeight && stateConf.loadingFlag === 'KEEP_LOAD') {
         stateConf.pageIncrement++;
         $btn.attr('disabled', true);
         loading('on');
         submitForm(stateConf.pageIncrement);
         }
         }
         });*/

        $form.on("change", function () {
          // console.log('change start')
          if ($form.get(0).checkValidity()) {
            stateConf.pageIncrement = 0;
            stateConf.loadingFlag = 'KEEP_LOAD';
            loading('on');
            resetForm();
            submitForm(stateConf.pageIncrement);
          }
          // console.log('change end')
        });
        // Mobile devices. Force 'change' by 'Go' press

        $form.on("submit", function (e) {
          e.preventDefault();
        });

        $modal.on('hidden.bs.modal', function (e) {
          resetForm();
          keyword.val('');//clear search input
          closeMapListener();
        });
      });

    };



})(jQuery);

$(document).on('ready', function () {
    $('.js_lazy-selector').lazySelector();
    $('#venueId').lazySelector('venues');
  //$("body").append($("<script async defer src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBQrJ5ECXDaXVlICIdUBOe8impKIGHDzdA&callback=myMap'></script>"));
});