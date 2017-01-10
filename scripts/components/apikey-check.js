var replaceApiKey = function (options) {
  document.querySelector(options.inputApiKey).value = options.userKey;
};

/**
 * check if user logged just before enter api-explorer page
 */
var checkUserKey = function () {
  var userKey = sessionStorage.getItem('tk-api-key'),
    _inputApiKey = 'input#api-key';
  if (userKey !== null) {
    replaceApiKey({userKey: userKey, inputApiKey: _inputApiKey})
  } else {
    $(window).on('login', function (e, data) {
      replaceApiKey({
        userKey: data.key,
        inputApiKey: _inputApiKey
      });
    });
  }
};

checkUserKey();