$(document).ready(function(){
  $.ajax({
    url:"style.css",
    dataType:"script",
    success:function(data){
      $("head").append("<style>" + data + "</style>");
      //loading complete code here
    }
  });
});