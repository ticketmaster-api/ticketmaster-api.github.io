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
var sendPrimaryRequest = function (arr, requests, global) {
  var url = prepareUrl(arr);

  ajaxService(url, arr[0].method, function(res, msg) {
		var resObj = {
			req: url,
			index: requests().length
		};

		if (msg == 'error') {
			var err = res &&
				res.responseJSON &&
				res.responseJSON.errors &&
				res.responseJSON.errors[0];

			resObj.error = {
				code: err ? err.code: 500,
				message: err ? err.detail: 'No responce data!'
			}
		} else {
			global.lastResponse = resObj.res = {
				id: arr[0].id, // method id was used
				res: res.responseJSON // response
			};
		}

		// exporting data using observable
		requests.unshift(resObj);
  });
};


module.exports = sendPrimaryRequest;
