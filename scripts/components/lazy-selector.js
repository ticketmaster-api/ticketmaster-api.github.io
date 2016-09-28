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
      //$resultsCount = $form.find('.get_eventId_results'),
          cssValidationClass = 'get-eventId_form-validation';

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
              }
              ;

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
          items.map(function (item) {
            var li = $('<li/>')
                .addClass('list-group-item row')
                .insertBefore($liFooter);
            // .appendTo(ulElement);
            var leftCol = $('<div class="clear-padding" />').appendTo(li);
            var spanImg = $('<span class="thumbnail" />')
                .appendTo(leftCol);
            var img = $('<img src=' + getImageForEvent(item.images) + ' />')
                .addClass('list-group-item-heading')
                .appendTo(spanImg);

            var $wrapCol = $('<div class="event-text-wrapper"/>')
                .appendTo(li);
            var title = $('<h4/>')
                .addClass('list-group-item-heading')
                .text(item.name)
                .appendTo($wrapCol);

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
                if ('location' in venue) {
                  //console.log('venue - ' ,venue);
                  var buttonMap = $("<button style='display: none;' data-latitude=" + venue.location.latitude + " data-longitude=" + venue.location.longitude + "/>")
                      .addClass('js_open-map_btn btn btn-submit')
                      .text('Show location')
                      //.insertAfter($wrapCol)
                      .appendTo(buttonSetId)
                      .wrap('<div class ="wrapper-location_btn"/>');
                }
              } else {
                console.log('no _embedded found');
              }
            }

            var buttonSetId = $("<button data-event=" + item.id + "/>")
                .addClass('js_lazy-sel_btn btn btn-submit')
                .text('Set this ID')
                .appendTo(li)
                .wrap('<div class ="wrapper-btns text-right"/>');

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
            var title = $('<h4/>')
                .addClass('list-group-item-heading')
                .text(item.name)
                .appendTo($wrapCol);

            if(item.dates) {
              console.log('item.dates' , item.dates);
              /*add time*/
              var currentEvent = {};
              currentEvent.date = {
                day: item.dates.start.localDate,
                time: item.dates.start.localTime,
                dateTime: item.dates.start.dateTime
              };

              //var time = widgetsCountdown[0].formatDate(currentEvent.date);
              var eventTime = $('<h4 class="event-time gray"/>')
              //.addClass('event-time')
                  .text('time go here ****')
                  .appendTo($wrapCol);
              /*add time end*/
            }

            if (item) {
              var venue = item; // item._embedded.venues[0];
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
              if ('location' in venue) {
                //console.log('venue - ' ,venue);
                var buttonMap = $("<button style='display: none;' data-latitude=" + venue.location.latitude + " data-longitude=" + venue.location.longitude + "/>")
                    .addClass('js_open-map_btn btn btn-submit')
                    .text('Show location')
                    //.insertAfter($wrapCol)
                    .appendTo(buttonSetId)
                    .wrap('<div class ="wrapper-location_btn"/>');
              }
            }else {
              console.log('no _embedded found');
            }

            var buttonSetId = $("<button data-event=" + item.id + "/>")
                .addClass('js_lazy-sel_btn btn btn-submit')
                .text('Set this ID')
                .appendTo(li)
                .wrap('<div class ="wrapper-btns text-right"/>');

          });
        }

        var renderResults = function (data, ulElement) {
          var items = (selector === 'events') ? data._embedded.events : (data && data._embedded && data._embedded.venues) ? data._embedded.venues:[''] ;
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



          if (stateConf.loadingFlag === "FINAL_PAGE") return false;

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
          //var selector = options || 'events';

          //start render data
          if(selector === 'events') {
            renderListEvents(items)
          } else{ renderListVenues(items); }

          if (data && data.page && data.page.totalElements <= 2) {
            $ul.css({overflowY: "hidden"});
          } else $ul.css({overflowY: "scroll"});

          // if ( (stateConf.pageIncrement + 1) === data.page.totalPages ) {
          //   console.log( ' 0 pageIncrement' , stateConf.pageIncrement);
          // }

          if (data && data.page && data.page.totalElements > 20 ) {
            // console.log('$hr.show', '$liFooter.show', 'totalElements', data.page.totalElements, stateConf.loadingFlag, stateConf.pageIncrement);
            // console.log( 'pageIncrement' , stateConf.pageIncrement , stateConf.pageIncrement === data.page.totalPages , data.page.totalPages );
            $hr.show();
            $liFooter.show();
          } else {
            $hr.hide();
            $liFooter.hide();
            if (data.page.totalElements > 0 || items.length > 0) $hr.show();
          }

          if (stateConf.loadingFlag === 'STOP_LOAD' || (stateConf.pageIncrement + 1)  === data.page.totalPages ) {
            //console.log('.modal-footer  ---- hide', stateConf.loadingFlag);
            $hr.hide();
            $liFooter.hide();
          }


          //var hs1 = new hideShow('.js_lazy-sel_btn', 'close1');


          function initMap(ltd, lgt) {
            var mapCanvas = document.getElementById("map-canvas");
            var myCenter = new google.maps.LatLng(ltd || 55, lgt || 43);
            var mapOptions = {center: myCenter, zoom: 5};
            var map = new google.maps.Map(mapCanvas, mapOptions);

            var marker = new google.maps.Marker({
              position: myCenter,
              icon: "/assets/controls/ic-id.svg"
            });
            marker.setMap(map);
            console.log('inside myMap', ltd, lgt);


            // listen for the window resize event & trigger Google Maps to update too
            $(window).resize(function () {
              // (the 'map' here is the result of the created 'var map = ...' above)
              //google.maps.event.trigger(map, "resize");
            });

          }


          $('.js_open-map_btn').on('click', function (e) {
            var mapCanvas = $("#map-canvas");
            var ltd = e.target.getAttribute('data-latitude'),
                lgt = e.target.getAttribute('data-longitude');
            var modalContent = $('#js_ls-modal .modal-content');
            console.log('myMap show ', ltd, lgt);
            modalContent.addClass('narrow');
            mapCanvas.addClass('narrow');
            initMap(ltd, lgt);
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

          $btn.attr('disabled', false);

        };

        // EVENTS

        $btn.on('click', function () {
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
        });
      });

    };



})(jQuery);

$(document).on('ready', function () {
    $('.js_lazy-selector').lazySelector();
    $('#venueId').lazySelector('venues');
  //$("body").append($("<script async defer src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBQrJ5ECXDaXVlICIdUBOe8impKIGHDzdA&callback=myMap'></script>"));
});