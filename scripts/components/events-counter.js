(function ($) {
  var apiKey = sessionStorage.getItem('tk-api-key') || "7elxdku9GGG5k8j0Xm8KWdANDgecHMV0"; //API Key

  $(document).ready(function() {
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

  function renderValue(el, val) {
    var value = val || getSessionStorage(el) || '';
    $(['#js-', el,'-counter'].join('')).text(value);
  }
}(jQuery));
