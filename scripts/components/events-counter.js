(function ($) {
  var apiKey = checkCookie() || apiKeyService.getApiExploreKey(); //API Key
  var initialVal = initialVal();
  function initialVal() {
    var config = ['events', 'venues', 'attractions', 'countries'];
    var values = {};
    config.forEach(function (el) {      
      values[el] = $('#js-'+el+'-counter').text();
    });
    return values
  };

  function checkCookie() {
      var userApiKey;
      var apiKeys = JSON.parse("[" + window.atob(getCookie("tk-api-key")) + "]"); //decode and convert string to array

      if (apiKeys != "") {
          userApiKey = apiKeys[apiKeys.length-1];
          userApiKey = userApiKey[userApiKey.length-1];
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

    config.forEach(function (el) {
      var val = el === 'countries' && 7;
      renderValue(el, val);
      if(val !== null || val !== false) {
        updateEventpanelCounters(el,intervals);
        intervals.push(setInterval(updateEventpanelCounters.bind(null, el), timeLeap));
      }
    });
    
    //clear requests when user leave current page
    $(window).unload(function(){
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
        console.error('Error: ', err);
      })
    }
  }

  function setSessionStorage(key, val) {
    if (Storage) {
      sessionStorage.setItem(key, val);
    }
  }

  function getSessionStorage(key) {
    if (sessionStorage[key]) {
      return sessionStorage.getItem(key);
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
    var value = getSessionStorage(el) || val || '';
    var formattedNumber = addCommas(value);
    $(['#js-', el,'-counter'].join('')).text(formattedNumber);
  }

  function countAnimate(selectorEl,val) {

      $('#js-'+selectorEl+'-counter').prop('Counter',  initialVal[selectorEl] ).animate({
        Counter: val
      }, {
        duration: 3000,
        easing: 'swing',
        step: function (now) {
          $(this).text(Math.ceil(now).toLocaleString());
        }
      });

  }
}(jQuery));
