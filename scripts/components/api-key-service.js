// Global service object
var apiKeyService = {};

(function () {
  var LIVE_KEYS = {
    apiExplore: '7elxdku9GGG5k8j0Xm8KWdANDgecHMV0', 
    widgets: '5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG'
  };

  var STAGING_KEYS = {
    apiExplore: '2Qa4W67WwEiu8ZNXpMbmVX2IGvTMJtIG',
    widgets: 'y61xDc5xqUSIOz4ISjgCe5E9Lh0hfUH1'
  };

  var LOCAL_KEYS = {
    apiExplore: 'B0JQHemR4Q569W9GcjHfhygRBRU3RvrL',
		widgets: 'TQMbqzKDBbcCjAxC9SaKS1lg9D5Eousb'
  };

  var stagingPattern = /(ticketmaster-api-staging.github.io)+/ig;
  var livePattern = /(developer.ticketmaster.com)+/ig;
  var host = window.location.host;
  var tmApiKeys = LOCAL_KEYS;

  if(livePattern.test(host)){
    tmApiKeys = LIVE_KEYS;
  } else if (stagingPattern.test(host)){
    tmApiKeys = STAGING_KEYS;    
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

  apiKeyService.checkApiKeyCookie = function () {
    var key = getCookie("tk-api-key");
    if (!key) {return;}

    var userApiKey;
    var apiKeys = JSON.parse("[" + window.atob(key) + "]"); //decode and convert string to array
    if (apiKeys && apiKeys.length && apiKeys[0].length) {
      userApiKey = apiKeys[0][apiKeys[0].length - 1];
    }
    return userApiKey;
  };
  
  apiKeyService.getApiKeysCookie = function (coockieName) {
    var key = getCookie(coockieName);//"tk-api-apps"
    if (!key) {return;}

    var userApiKey;
    var apiKeys = JSON.parse("[" + window.atob(key) + "]"); //decode and convert string to array
    if (apiKeys && apiKeys.length && apiKeys[0].length) {
      userApiKey = apiKeys[0];
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
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

	// CommonJS exports
	if (typeof module !== "undefined") {
		module.exports = apiKeyService;
	}
}());

















