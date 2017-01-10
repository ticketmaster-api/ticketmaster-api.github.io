
function ClipboardFallback(clipboard) {
  this.clipboard = clipboard;
  this.successCssClass = 'copied';
  this.successDelay = 2000;
  this.errorDelay = 4000;
  this.elem = null;
  this.msg = '';
  this.action = '';

  if(this.clipboard){
    this.init();
  }
}

ClipboardFallback.prototype.init = function () {
  // Add clipboard event listeners. Don't use chaining.
  this.clipboard.on('success', this.successHandler.bind(this));
  this.clipboard.on('error', this.errorHandler.bind(this));
};

ClipboardFallback.prototype.successHandler = function(e) {
  // Add success css class. Remove after delay.
  var $elem = $(e.trigger),
    cssClass = this.successCssClass;
  $elem.addClass(cssClass);
  this.successTimeout = setTimeout(function(){
    $elem.removeClass(cssClass);
  }, this.successDelay);
};

ClipboardFallback.prototype.errorHandler = function(e) {
  // Set props
  this.elem = e.trigger;
  this.action = e.action;
  // Set fallback message and show it.
  this.setFallbackMessage();
  this.showTooltip();
};

ClipboardFallback.prototype.showTooltip = function() {
  // Do nothing if tooltip plugin not loaded.
  if(!$().tooltip) {
    return;
  }

  var $elem = $(this.elem),
    $clone = $elem.clone(); // Make copy of target element

  // Clear copy
  $clone
    .removeClass(this.successCssClass)
    .removeAttr('rel')
    .removeAttr('data-original-title');

  // Hide original element
  $elem
    .hide()
    .after($clone);

  // Init tooltip on copy and show it immediately.
  $clone
    .tooltip({
      trigger: 'manual',
      title: this.msg
    })
    .tooltip('show');

  // After delay show original target and destroy copy
  this.errorTimeout = setTimeout(function () {
    $elem.show();
    $clone
      .tooltip('destroy')
      .remove();
  }, this.errorDelay)
};

ClipboardFallback.prototype.setFallbackMessage = function() {
  // Set fallback message depend on userAgent
  this.msg = '';
  var actionKey = (this.action === 'cut' ? 'X' : 'C');

  if (/iPhone|iPad/i.test(navigator.userAgent)) {
    this.msg = 'No support :(';
  }
  else if (/Mac/i.test(navigator.userAgent)) {
    this.msg = 'Press ⌘-' + actionKey + ' to ' + this.action;
  }
  else {
    this.msg = 'Press Ctrl-' + actionKey + ' to ' + this.action;
  }
};
