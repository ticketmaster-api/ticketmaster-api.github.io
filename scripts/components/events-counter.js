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
      config = ['events','venues','attractions'],
      timeLeap = 60000;

    config.forEach(function (el) {
      updateEventpanelCounters(el);
      intervals.push(setInterval(updateEventpanelCounters.bind(null, el), timeLeap));
    });
  }

  /**
   * Get date for Counter Panel
   * @param url {string}
   */
  function updateEventpanelCounters(url) {
    $.ajax({
      method: 'GET',
      url: ['https://app.ticketmaster.com/discovery/v2/', url, '.json?apikey=', apiKey].join('')
    }).then(function (data) {
      var quantity = data.page && data.page.totalElements || 'none';
      console.debug(url, ' - ', quantity);
      $(['#js-', url,'-counter'].join('')).text(quantity);
    }).fail(function (err) {
      console.error('Error: %s', err);
    })
  }
}(jQuery));
