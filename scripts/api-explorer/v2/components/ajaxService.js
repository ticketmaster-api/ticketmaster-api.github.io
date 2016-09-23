/**
 * Ajax Service
 * @param url
 * @param method
 * @param callback
 */
var ajaxService = function (url, method, callback) {
  $.ajax({
    type: method,
    url: url,
    async: true,
    dataType: "json",
    // success: callback,
    // error: function(xhr, status, err) {
    //   // console.error(status, err);
    // },
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
  replacement = path
    .replace(/[\w/]+[^{a-z}]/gmi, ' ')
    .split(/[\s{}]/)
    .filter(function (i){
      return i.length;
    });

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
  console.log(url);

  ajaxService(url, arr[0].method, function(response, message) {
    if (message == 'error') {
      var err = response.responseJSON.errors[0];
      console.log(message, response.status);
      console.log(err.code);
      console.log(err.detail);
    } else {
      console.log(message, response.status);
      console.log(response.responseJSON);
    }
  });
};


module.exports = sendPrimaryRequest;