(function ($) {
  var apiKey = apiKeyService.getApiExploreKey();
  var initialValObj;
  function initialVal(config) {    
    var values = {};
    config.forEach(function (el) {      
      values[el] = $('#js-'+el+'-counter').text();
    });
    initialValObj = values;
  }

  $(function() {
    initEventCountersPanel(); // Counter panel init
  });

  /**
   * Initialization of counter panel
   */
  function initEventCountersPanel() {
    var intervals = [],
      config = ['events', 'venues', 'attractions', 'countries'],
      timeLeap = 60000;

    initialVal(config);
    config.forEach(function (el) {
      var val = el === 'countries' && 83,
        quantityStorage = getSessionStorage(el);
      renderValue(el, val);
			
      if(val !== null || val !== false) {
        if(!quantityStorage) {
          updateEventpanelCounters(el,intervals);
        }else{
          countAnimate(el, quantityStorage);
        }
        //intervals.push(setInterval(updateEventpanelCounters.bind(null, el), timeLeap));
      }
    });
    
    //clear requests when user leave current page
    $(window).on('unload', function(){
      for(var i = 1; i < intervals.length; i++) {
        clearTimeout(i);
      }
    });
  }

  /**
   * Get date for Counter Panel
   * @param url {string}
   */
  function updateEventpanelCounters(url) {
    if (url !== 'countries') {
      $.ajax({
        method: 'GET',
        url: ['https://degratnik-prod.apigee.net/discovery-api-proxy/v2/', url, '.json','?size=1','&locale=fr,de,fi,no,sv,nl,pl,es,da,en'].join(''),
        async: true,
        dataType: "json"
      }).then(function (data) {
        var quantity = data.page && data.page.totalElements || 'none', quantityObj = {value: quantity, timestamp: new Date().getTime()};
        setSessionStorage(url, JSON.stringify(quantityObj));
        renderValue(url, quantity);
        countAnimate(url, quantity);
      }).fail(function (err) {
        onFailHandler(url, 15);
        console.error('Error: ', err);
      })
    }
  }

  /**
   * Handler for invalid apiKey 
   * @param selector {string} - 'events', 'venues', 'attractions'
   * @param minutes {number} -  time to resend request if storage empty
   */
  function onFailHandler(selector, minutes) {
    var delay = minutes * 60000;
    if(getSessionStorage(selector)) {
     renderValue(selector, getSessionStorage(selector));
     countAnimate(selector, getSessionStorage(selector));
    }else{
      setTimeout(function() {
        updateEventpanelCounters(selector);
      },delay);
    }
  }
  function setSessionStorage(key, val) {
    if (Storage) {
      localStorage.setItem(key, val);
    }
  }

  function getSessionStorage(key) {
    if (localStorage[key]) {
      var object = JSON.parse(localStorage.getItem(key)),
  		 dateString = object.timestamp,
       now = new Date().getTime().toString(),
 			 shiftMinutes = 1,
 			 value;
 
 			 value=(compareTime(dateString, now , shiftMinutes)) ? JSON.parse(localStorage.getItem(key)).value : null;
 
       return value;
    }
    return null;
  }

	function compareTime(dateString, now , shiftMinutes) {
 	  return dateString+(shiftMinutes*60000) > now;
  }
	
  function addCommas(str) {
    var parts = (str + "").split("."),
      main = parts[0],
      len = main.length,
      output = "",
      first = main.charAt(0),
      i;

    if (first === '-') {
      main = main.slice(1);
      len = main.length;
    } else {
      first = "";
    }
    i = len - 1;
    while(i >= 0) {
      output = main.charAt(i) + output;
      if ((len - i) % 3 === 0 && i > 0) {
        output = "," + output;
      }
      --i;
    }
    // put sign back
    output = first + output;
    // put decimal part back
    if (parts.length > 1) {
      output += "." + parts[1];
    }
    return output;
  }

  function renderValue(el, val) {
    var value = getSessionStorage(el) || val || initialValObj[el] || '';
    var formattedNumber = addCommas(value);
    $(['#js-', el,'-counter'].join('')).text(formattedNumber);
  }

  function removeCommas(str) {
    while (str.search(",") >= 0) {
      str = (str + "").replace(',', '');
    }
    parseInt(str,10);
    return str;
  }

  function countAnimate(selectorEl,val) {
    $('#js-'+selectorEl+'-counter').prop('Counter',  initialValObj[selectorEl] ).animate({
      Counter: val
    }, {
      duration: 3000,
      easing: 'swing',
      step: function (now) {
        $(this).text(Math.ceil(now).toLocaleString());
      }
    });

    //RemoveCommas from recived values to parse as integer
    //Update values after animation is finished (animation duration: 3000)
    setTimeout(function () {
      initialValObj[selectorEl] = removeCommas ( $('#js-'+selectorEl+'-counter').text() );
      }, 3100
    );



  }
}(jQuery));
