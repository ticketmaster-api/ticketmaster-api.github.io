(function(){
  var apiKey = sessionStorage.getItem('tk-api-key');
  var DOMAIN = "https://live-livenation.devportal.apigee.com";

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

        /*add custom login event for widget*/
        $(window).trigger('login', [{
          key: event.data.key,
          email: event.data.email
        }])
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

})();
