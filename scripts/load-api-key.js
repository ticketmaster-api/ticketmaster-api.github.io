(function(){
  var apiKey = sessionStorage.getItem('tk-api-key');
  if(apiKey === null){
    var onLoadHandler = function() {
      var win = window.frames.target;
      win.postMessage("", "https://live-livenation.devportal.apigee.com");
    };

    var iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.setAttribute("src","https://live-livenation.devportal.apigee.com/user/");
    iframe.setAttribute("name","target");
    iframe.addEventListener("load",onLoadHandler);

    var body = document.getElementsByTagName("body")[0];
    body.appendChild(iframe);
  }


  // Wait for response
  checkResponse = function(event){
    if( event.origin = "https://live-livenation.devportal.apigee.com") {
      console.warn('Event data on postMessage()\nkey - ', event.data.key, '\nemail - ', event.data.email);
      if (event.data.key && event.data.email) {
        sessionStorage.setItem('tk-api-key', event.data.key);
        sessionStorage.setItem('tk-api-email', event.data.email);
      }
    }
    else{
      console.error(event.origin + " is not allowed");
    }
  };

  if (window.addEventListener) {
    window.addEventListener("message", checkResponse);
  } else {
    // IE8
    window.attachEvent("onmessage", checkResponse);
  }

})();
