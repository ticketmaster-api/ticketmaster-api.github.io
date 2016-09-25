/**
 * Ajax Service
 * @param url
 * @param method
 * @param callback
 */
var ajaxService = function (url, method, callback) {
  var escapedURL = encodeURI(url);
  console.log(escapedURL);

  $.ajax({
    type: method,
    url: escapedURL,
    async: true,
    dataType: "json",
    complete: callback
  });
};

/**
 * Filters and prepares params pairs
 * @param arr
 * @param obj
 * @param koObs
 * @returns {boolean}
 */
var prepareUrl = function (arr) {
  var replacement, url, domain, path, method, apiKey, params;

  if (!arr && !arr.length) {
    return false;
  }
  
  domain = arr[0].base;
  path = arr[0].path;
  apiKey = arr[1];
  params = arr[2].filter(function (item) {
    return item.style === 'query';
  });

  // arr of template marks
  replacement = path.match(/([^{]*?)\w(?=\})/gmi);

  // arr of template params
  var templatesArr = arr[2].filter(function (item) {
    return item.style === 'template';
  });

  // replacement
  replacement.forEach(function (val) {
    var param = templatesArr.find(function (item) {
      return item.name === val;
    });
    path = path.replace('{'+ param.name + '}', param.value() || param.default);
  });

  // adds apiKey param
  if (!params[0] || params[0].name !== 'apikey') {
    params.unshift(apiKey);
  }

  // prepares params part of url
  params = params.map(function (item) {
      return [item.name, item.value() || item.default].join('=');
    }).join('&');

  url = [domain, '/', path, '?', params].join('');

  return url;
};

// sends request to get the second column
var sendPrimaryRequest = function (arr) {
  console.clear();
  var url = prepareUrl(arr);
  // console.log(url);

  ajaxService(url, arr[0].method, function(response, message) {
    if (message == 'error') {
      var err = response && response.responseJSON && response.responseJSON.errors && response.responseJSON.errors[0];
      console.warn(message, response.status);
      if (err) {
        console.warn(err.code);
        console.warn(err.detail);
      } else {
        console.warn(response);
      }
    } else {
      console.log(message, response.status);
      console.log(response.responseJSON);
    }
  });
};


module.exports = sendPrimaryRequest;