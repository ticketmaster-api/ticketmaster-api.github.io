var isToolTipInit = false,
    clipboard = new Clipboard('.copy-btn');

new ClipboardFallback(clipboard);

clipboard.on('success', function(e) {
  e.clearSelection();
});
$('#js_widget_modal').on('shown.bs.modal', function(){
  if (!isToolTipInit){
    $('.copy-btn').tooltip();
    isToolTipInit = true;
  }
});