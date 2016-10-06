(function(){
  
  var userApiKey=[];
  function checkCookie() {
    var apiKeysCoded = getCookie("tk-api-key"),
        apiKeys = JSON.parse("[" + window.atob(apiKeysCoded) + "]"); //decode and convert string to array
    var userEmailCoded = getCookie("tk-api-email"),
        userEmail = window.atob(userEmailCoded) ;//decode string
    if (apiKeys != "" && userEmail != "") {
      userApiKey = apiKeys[apiKeys.length-1];

      console.log("Welcome again " , apiKeys[0] , userEmail );
      console.log( apiKeys.length );
      console.log("last userApiKey: " , userApiKey[userApiKey.length-1] );
      
      
      userApiKey = userApiKey[userApiKey.length-1];
      sessionStorage.setItem('tk-api-key', userApiKey);
      sessionStorage.setItem('tk-api-email', userEmail);
      try {
        document.getElementsByClassName("apigee-login")[0].textContent = userEmail;
      } catch(e){
        console.log(e);
      }

      /*add custom login event for widget*/
      $(window).trigger('login', [{
        key: userApiKey,
        email: userEmail
      }]);
    } else {
      console.log("no coockie found");
    }
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

  /*todo: tmp*/
  checkCookie();
  
  
  /* 
  var apiKey = sessionStorage.getItem('tk-api-key');
  var DOMAIN = "https://developer-acct.ticketmaster.com";

  if(apiKey === null){
    var onLoadHandler = function() {
      var win = window.frames.target;
      win.postMessage("", DOMAIN);
    };

    var iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.setAttribute("src", DOMAIN + "/user/");
    iframe.setAttribute("name","target");
    iframe.addEventListener("load", onLoadHandler);

    var body = document.getElementsByTagName("body")[0];
    body.appendChild(iframe);
  }
  // Wait for response
  checkResponse = function(event){
    var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
    if (origin == DOMAIN) {
      console.warn('Event data on postMessage()\nkey - ', event.data.key, '\nemail - ', event.data.email);
      if (event.data.key && event.data.email) {
        sessionStorage.setItem('tk-api-key', event.data.key);
        sessionStorage.setItem('tk-api-email', event.data.email);
        document.getElementsByClassName("apigee-login")[0].textContent = event.data.email;

        //add custom login event for widget
        $(window).trigger('login', [{
          key: event.data.key,
          email: event.data.email
        }]);
      }
    } else {
      console.warn(origin + " is not allowed");
    }
  };

  if (window.addEventListener) {
    window.addEventListener("message", checkResponse);
  } else {
    // IE8
    window.attachEvent("onmessage", checkResponse);
  }
*/

})();
