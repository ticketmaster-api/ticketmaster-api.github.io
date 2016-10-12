(function(){

   function checkCookie(userApiKey, userEmail) {
    var apiKeys = JSON.parse("[" + window.atob(getCookie("tk-api-key")) + "]"); //decode and convert string to array
  /*
	if(apiKey === null){
    var onLoadHandler = function() {
      var win = window.frames.target;
      win.postMessage("", DOMAIN);
    };

    if (apiKeys != "" && userEmail != "") {
      userApiKey = apiKeys[apiKeys.length-1];
      userApiKey = userApiKey[userApiKey.length-1];
      userEmail = window.atob(getCookie("tk-api-email")) ;//decode string
      try {
        document.getElementsByClassName("apigee-login")[0].textContent = userEmail;
      } catch(e){
        //console.log(e);
  }
  /* Wait for response
  checkResponse = function(event){
    var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
    if (origin == DOMAIN) {
      console.warn('Event data on postMessage()\nkey - ', event.data.key, '\nemail - ', event.data.email);
      if (event.data.key && event.data.email) {
        sessionStorage.setItem('tk-api-key', event.data.key);
        sessionStorage.setItem('tk-api-email', event.data.email);
        document.getElementsByClassName("apigee-login")[0].textContent = event.data.email;

        /*add custom login event for widget
        $(window).trigger('login', [{
        key: userApiKey,
        email: userEmail
        }]);
    } else {
      //console.log("no coockie found");
    }
  }
  */

  }
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

  var userKey=[], userEmail=null;
  checkCookie(userKey,userEmail);

})();
