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
    complete: callback
  });
};

/**
 * Filters and prepares params pairs
 * @param arr
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

  return encodeURI(url);
};

// sends request to get the second column
var sendPrimaryRequest = function (arr, requests) {
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

			var colors = [
				'column-color-1',
				'column-color-2',
				'column-color-3',
				'column-color-4',
				'column-color-5',
				'column-color-6',
				'column-color-7',
				'column-color-8',
				'column-color-9',
				'column-color-10',
				'column-color-11',
				'column-color-12'
			];
			var max = colors.length - 1;
			var index = requests.length;

			requests.push({
				request: url,
				color: colors[index % max],
				response: response.responseJSON
			})
    }
  });
};


module.exports = sendPrimaryRequest;
