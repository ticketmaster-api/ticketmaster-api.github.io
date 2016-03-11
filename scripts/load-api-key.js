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
  // TODO: update links to live
  checkResponse = function(event){
    if( event.origin = "https://live-livenation.devportal.apigee.com") {
      sessionStorage.setItem('tk-api-key', event.data);
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