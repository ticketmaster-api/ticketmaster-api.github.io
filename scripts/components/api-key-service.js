// Global service object
var apiKeyService = {};

(function () {
  var LIVE_KEYS = {
    apiExplore: '7elxdku9GGG5k8j0Xm8KWdANDgecHMV0',
    widgets: '5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG'
  };

  var STAGING_KEYS = {
    apiExplore: 'RKkWdMNW8Isua8RNc5U87KjXXNct110K',
    widgets: 'TQMbqzKDBbcCjAxC9SaKS1lg9D5Eousb'
  };

  var LOCAL_KEYS = {
    apiExplore: 'B0JQHemR4Q569W9GcjHfhygRBRU3RvrL',
    widgets: 'OmayHcE8b9GK5nHijxVG3gC5mrv5NLZV'
  };

  var stagingPattern = /(ticketmaster-api-staging.github.io)+/ig;
  var livePattern = /(developer.ticketmaster.com)+/ig;
  var host = window.location.host;
  var tmApiKeys = LOCAL_KEYS;

  if(livePattern.test(host)){
    tmApiKeys = LIVE_KEYS;
  }else if(stagingPattern.test(host)){
    // FIXME: Temporary solution for unlock testing on staging instance. Revert before release !!!
    // tmApiKeys = STAGING_KEYS;
    tmApiKeys = LIVE_KEYS;
  }

  apiKeyService.getApiKeys = function () {
    return tmApiKeys;
  };

  apiKeyService.getApiExploreKey = function () {
    return tmApiKeys.apiExplore;
  };

  apiKeyService.getApiWidgetsKey = function () {
    return tmApiKeys.widgets;
  };

  apiKeyService.checkApiKeyCookie = function (cookieSelector) {
    var userApiKey,
      apiKeys = JSON.parse("[" + window.atob(getCookie(cookieSelector)) + "]"); //decode and convert string to array
    if (getCookie(cookieSelector) === "") {return null}
    if (apiKeys != "") {
      userApiKey = apiKeys[0][apiKeys[0].length-1]; //convert to array
    }
    return userApiKey;
  };

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

})();

















