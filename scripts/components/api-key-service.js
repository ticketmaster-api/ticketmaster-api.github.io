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
})();

















