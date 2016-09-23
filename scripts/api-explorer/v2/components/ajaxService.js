// forms URL for 1st column, based on base URL, template, template parameters and additional query parameters

var formURL = function (method) {
  var params = getAllParameteres(), // parameter values from 1st column
    url = method.path, // selected method's url
    query = ""; // string with non required parameters

  $(params).each(function(){
    var each = this,
      val = each.value ? true : false;
    if (method.parameters[each.id].style === "template"){
      // embed parameter into base url if it has template style
      url = url.replace('{' + each.id + '}', val ? each.value : method.parameters[each.id].default);
      primaryColumn.find('#' + each.id).val(val ? each.value : method.parameters[each.id].default); // set value to template param text boxes
    } else {
      // form string with additional parameters
      query = val ? (query + '&' + each.id + '=' + each.value) : query;
    }
  });

  url = method.base + '/' + url + '?apikey' + '=' + apiKey + query;
  return url;
};

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
    success: callback,
    error: function(xhr, status, err) {
      console.error(err);
    }
  });
};


// sends request to get the second column
var sendPrimaryRequest = function (kofn) {
  var o = kofn();
  var url = [
    o[0].base,
    o[0].path.replace('{format}', 'json')
  ].join('/');


  var params = o[1];

  // console.log(o[1]);
  console.log(params);

  // 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0'

  // var url = formPrimaryURL(selectedMethod);
  // ajaxService(url, selectedMethod.method, function(response, guid) {
  //   console.log(response);
  // });
};


module.exports = sendPrimaryRequest;