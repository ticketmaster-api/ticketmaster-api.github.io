(function ($) {
  var apiKey = sessionStorage.getItem('tk-api-key') || "7elxdku9GGG5k8j0Xm8KWdANDgecHMV0"; //API Key

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
      updateEventpanelCounters(el);
      intervals.push(setInterval(updateEventpanelCounters.bind(null, el), timeLeap));
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
        url: ['https://app.ticketmaster.com/discovery/v2/', url, '.json?apikey=', apiKey].join('')
      }).then(function (data) {
        var quantity = data.page && data.page.totalElements || 'none';
        setSessionStorage(url, quantity);
        renderValue(url, quantity);
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
    var value = val || getSessionStorage(el) || '';
    var formattedNumber = addCommas(value);
    $(['#js-', el,'-counter'].join('')).text(formattedNumber);
  }
}(jQuery));
