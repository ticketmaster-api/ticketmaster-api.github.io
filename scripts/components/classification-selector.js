/**
 * required to include: classification-selector-modal.html
 *
 * availiable option :
 * {
 *    selector: 'classifications'
 *    use: 'name', 'id'
 * }
 * 
 * $('.js_lazy-selector-attractions').classificationSelector({selector:'classifications', use:'name'});
 * $('.js_lazy-selector-venues').classificationSelector({selector:'classifications', use:'id'});
 */

(function ($) {

  $.fn.classificationSelector = function (options) {
    var defaults = {},
        settings = $.extend({}, $.fn.classificationSelector.defaults, options),
        $iconButton = $('<a class="icon icon-'+options.use +'" id="get-'+options.selector+'-'+options.use+'" data-toggle="modal" data-target="#js_ls-modal-classification" />');

    var $input = $(this),
			$modal = $('#js_ls-modal-classification'),
      $form = $('#js_lazy-sel_form', $modal),
      $btnGET = $modal.find('#js_classification-modal_btn'),
      cssValidationClass = 'get-eventId_form-validation',
      modalContent = $('.modal-content', $modal),
      $jstree = $('#classification-jstree')
      ;
    var keyword = $form.find('#keyword'),
      apikey = apiKeyService.checkApiKeyCookie('tk-api-key') || $('#w-tm-api-key').val() || apiKeyService.getApiExploreKey(),
      selector = options.selector,
      use = options.use,
      eventUrl = 'https://app.ticketmaster.com/discovery/v2/' + selector + '.json';

    function  initTree(json) {
      json = setChildren(json['_embedded']['classifications']);

      $jstree.jstree({
        "core" : {
          'check_callback': true,
          'data' : json
        } ,
        "plugins" : [ "search" ] ,
        "search": {
          "show_only_matches" : true,
          /**
           * Indicates if all nodes opened to reveal the search result, should be closed when the search is cleared or a new search is performed. Default is `true`.
           * @name $.jstree.defaults.search.close_opened_onclear
           * @plugin search
           */
          "case_sensitive" : false
        }
      }).on('select_node.jstree', function (e, data) {
        data.instance.toggle_node(data.node); //set open on one click
        var i, j, r = [];
        for (i = 0, j = data.selected.length; i < j; i++) {
          r.push(
            {
              text: data.instance.get_node(data.selected[i]).text,
              id: data.instance.get_node(data.selected[i]).id
            }
          );
        }

        $('button',$jstree).off('click', setIdListener).remove();

        $('<button/>')
          .addClass('btn btn-submit btn-small')
          .text('Use')
          .attr('data-classificationId',(use === 'name') ? r[0].text : r[0].id)
          .insertAfter($('#'+r[0].id +' .jstree-clicked', $jstree))
          .on('click', setIdListener);
      });

    }

    function  updateTree(json) {
      var newJson = (json['_embedded'] && json['_embedded']['classifications']) ? setChildren(json['_embedded']['classifications']) : null;
      $jstree.jstree(true).settings.core.data = newJson;
      $jstree.jstree(true).refresh();

      if(newJson && newJson.length && newJson[0].children.length === 0){
        setTimeout(function() {
            $('.jstree-icon').hide();
          },100 );
      };
    }

    /**
     *
     * @param data {Array} - recived classifications array
     * @returns {Array}
     */
    function setChildren(data) {
      var newArrObj =[];
      data = rename(data);

      //rename parent(genres)
      data.map(function(item){
        newArrObj.push( {
          children:(item.segment._embedded && item.segment._embedded.genres)? item.segment._embedded.genres :[],
          text : item.segment.text || '',
          id : item.segment.id
        } );
      });
      //rename/copy child(subgenres) field
      newArrObj.map(function(item){
        item.children.map(function(item) {
          if(item._embedded && item._embedded.subgenres){
            item['children'] = item._embedded.subgenres ;
            delete item._embedded;
          }
        });
      });

      return newArrObj;
    }

    /**
     * Rename fields
     * @param json
     */
    function rename(json) {
      var opt ={
        root: {fieldName:['segment'], val:'text', to:'name' },
        parent: {fieldName:['genres'],'_embedded':true ,  val:'text', to:'name' },
        child: {fieldName:['subgenres'],'_embedded':true,   val:'text', to:'name'}
      };
      var arr = JSON.stringify(json);//convert array to string
      arr = JSON.parse(arr);


      function replaceAtoB(arr,opt) {
        var genresArr = [],
            subgenresArr = [];
        for (var i = 0; i<arr.length; i++) {
          arr[i][opt.root.fieldName][opt.root.val] = arr[i][opt.root.fieldName][opt.root.to];
          delete arr[i][opt.root.fieldName][opt.root.to];


          if( arr[i][opt.root.fieldName]['_embedded'] && opt.parent.fieldName in arr[i][opt.root.fieldName]['_embedded']) {
            genresArr = arr[i][opt.root.fieldName]['_embedded'][opt.parent.fieldName];
          }
          if( 0<genresArr.length ) {
            for (var ii = 0; ii < genresArr.length; ii++) {
              genresArr[ii][opt.parent.val] = genresArr[ii][opt.parent.to];
              delete genresArr[ii][opt.parent.to];

              if(genresArr[ii]['_embedded'] && genresArr[ii]['_embedded'][opt.child.fieldName]){
                subgenresArr = genresArr[ii]['_embedded'][opt.child.fieldName];
              }
              if( 0<subgenresArr.length ) {
                for (var j = 0; j < subgenresArr.length; j++) {
                  subgenresArr[j][opt.child.val] = subgenresArr[j][opt.child.to];
                  if(j>0) delete subgenresArr[j][opt.child.to];//skip zero item
                }
              }

            }
          }

        }
      }
      replaceAtoB(arr,opt);
      return arr;
    }

    /**
     * set data-selector for "GET" button
     */
    function changeModalTextListener() {
      $btnGET.attr('data-selector', selector);
      submitForm(true);
    }

    /**
     * show/hide loader
     * @param action - string ('on' or 'off')
     */
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
      $jstree
        .jstree("destroy")
        .removeAttr('class')
        .removeAttr('role')
        .removeAttr('aria-activedescendant')
      ;
      // Clear highlight
      $form.removeClass(cssValidationClass);
    }


    /**
     * Handler for 'GET' button
     * @param pageNumero - int. used for pagination
     * @param eventUrl - url of request
     * @returns {boolean} - done/fail
     */
    function submitForm(isInit) {
      var url = ( isInit )
        ? eventUrl + '?apikey=' + apikey
        : eventUrl + '?apikey=' + apikey + '&keyword=' + keyword.val();

      $.ajax({
        dataType: 'json',
        async: true,
        url: url,
        data: $form.serialize()
      }).done(ajaxDone, function (result) {
				if (result) { (isInit) ? initTree(result) : updateTree(result); }
			})
				.fail(function (e, textStatus, errorThrown) {
        console.log('There was an fail status - ' , e.status , errorThrown);
        loading('off');
        renderResults('FAIL', $jstree , e);
        $btnGET.attr('disabled', false);
      });
    }
		function ajaxDone(result) {
			if (result) {
				if (result.page.totalElements < 1) {
					loading('off');
					renderResults(null, $jstree); //add message at bottom of list
					return false;
				};

				loading('off');
				$btnGET.attr('disabled', false);
			} else {
				console.log('no result found');
			}
		}

    function hasScrollBar(element) {
      return element.get(0).scrollHeight > element.parent().innerHeight();
    }

    var renderResults = function (data, ulElement, errorMsg) {
      function showMessage(element, message, /*optional*/clearList) {
        if (clearList) {
          $('li', element).remove();
          $('.error-box').remove();
        }

        $('<div/>')
          .addClass( 'error-box text-center ')
          .addClass( (data === 'FAIL')?' error-fail ': '')
            .append($('<h3/>').text(message.msg))
            .append($('<p/>').text(message.explanation))
          .appendTo(ulElement);
      }

      $btnGET.attr('disabled', false);

      //show fail msg
      if (data === 'FAIL') {
        var msgErr = (errorMsg && errorMsg.responseJSON && errorMsg.responseJSON !== null )?errorMsg.responseJSON.errors[0].status : 'unknown',
          statusText = (errorMsg && errorMsg.responseJSON && errorMsg.responseJSON !== null )?errorMsg.responseJSON.errors[0].statusText  : errorMsg.statusText  || '',
          explanation = (errorMsg && errorMsg.responseJSON && errorMsg.responseJSON !== null )?errorMsg.responseJSON.errors[0].detail : 'unknown';

        showMessage($jstree, {
          msg: 'Error ' + msgErr + ': ' + statusText,
          explanation: explanation
        }, true);
        return false;
      }

      //show No results found msg
      if (data === null || !data._embedded) {
        showMessage(ulElement, {msg: 'No results found.' , explanation: 'Please try to get another keyword.'}, true);
        modalContent.removeClass('narrow');
        return false;
      }
    };

    function setIdListener(e){
      var selectedID = e.target.getAttribute('data-classificationId');
      $input.val(selectedID)
            .attr('value', selectedID)
            .trigger('change');  //update widget:

      // Close dialog
      $modal.modal('hide');
    }

    // EVENTS
    $btnGET.on('click', function (e) {
      e.preventDefault();
      if ($btnGET.attr('data-selector') !== $iconButton.attr('data-selector')) return false; //stop request

      var form = $form.get(0);
      if (!$btnGET.is(':disabled')) {
        if (form.checkValidity()) {
          $btnGET.attr('disabled', true);
          loading('on'); //show loading-spinner
          submitForm();
          //resetForm(); //clear
        } else {
          // Highlight errors
          if (form.reportValidity) form.reportValidity();
          $form.addClass(cssValidationClass);
        }
      }
    });

    $form.on("keyup", function (e) {
      var input = $(e.target);
      if (e.target.tagName === "INPUT"){
        if (e.keyCode == 13){
          input.blur();

          modalContent.removeClass('narrow');
          if ($btnGET.attr('data-selector') !== $iconButton.attr('data-selector')) return false;

          if ($form.get(0).checkValidity()) {
            loading('on');
            submitForm();
          }
        }
      }
      return false;
    });

    // Mobile devices. Force 'change' by 'Go' press
    $form.on("submit", function (e) {
      e.preventDefault();
    });

    $modal.on('hidden.bs.modal', function () {
      resetForm();
      keyword.val('');//clear search input
    });

		if(options.test === 'UnitTest') {
			return {
				changeModalTextListener: changeModalTextListener,
				loading: loading,
				rename: rename,
				setChildren: setChildren,
				hasScrollBar:hasScrollBar,
				renderResults: renderResults,
				setIdListener: setIdListener,
				ajaxDone: ajaxDone,
				resetForm: resetForm,
				submitForm : submitForm
			};
		}

    return this.each(function (i) {
      init($(this));

      function init(input) {
        input.wrap('<div class="lazy-selector-wrapper"></div>');
        input.after($iconButton);
        $iconButton.attr('data-selector', selector);

        $('#get-'+options.selector+'-'+options.use).on('click', changeModalTextListener);

      }
    });

  };

})(jQuery);

