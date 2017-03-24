/**
 * Show email if user logged
 */
(function(){
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
        return c.substring(name.length,c.length);
      }
    }
    return "";
  }

  var apiKeys = JSON.parse("[" + window.atob(getCookie("tk-api-key")) + "]"); //decode and convert string to array
  var email = window.atob(getCookie("tk-api-email")); //decode string

  if(email){
    $(".apigee-login").text(email);
  }

  if(apiKeys && apiKeys[0] && apiKeys[0].length){
    var key = apiKeys[0][apiKeys[0].length-1];
    /*add custom login event for widget*/
    if(key){
      $(window).trigger('login', [{
        key: key,
        email: email
      }]);
    }
  }
})();
