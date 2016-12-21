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
      var val = el === 'countries' && 7;
      renderValue(el, val);
      if(val !== null || val !== false) {
        updateEventpanelCounters(el,intervals);
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
        url: ['https://app.ticketmaster.com/discovery/v2/', url, '.json?apikey=', apiKey].join(''),
        async: true,
        dataType: "json"
      }).then(function (data) {
        var quantity = data.page && data.page.totalElements || 'none';
        setSessionStorage(url, quantity);
        renderValue(url, quantity);
        countAnimate(url, quantity);
      }).fail(function (err) {
        onFailHandler(url);
        console.error('Error: ', err);
      })
    }
  }

  function onFailHandler(selector) {
    function reSent(){
      //apiKey = apiKeyService.getApiExploreKey();
      initEventCountersPanel()
    }
    console.log('getSessionStorage(selector)', getSessionStorage(selector));
    if(getSessionStorage(selector)){
     renderValue(selector, getSessionStorage(selector));
     countAnimate(selector, getSessionStorage(selector));
    }

    setTimeout(initEventCountersPanel,60000*15);
  }
  function setSessionStorage(key, val) {
    if (Storage) {
      localStorage.setItem(key, val);
    }
  }

  function getSessionStorage(key) {
    if (localStorage[key]) {
      return localStorage.getItem(key);
    }
    return null;
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
