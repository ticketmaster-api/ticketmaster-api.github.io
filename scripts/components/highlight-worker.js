/**
 * Code format web-worker
 * @param event
 */

var onmessage = function(event) {
  var code = event.data;
  importScripts('json-parse.js');
  var result = highlightJson(code, {expanded: true});
  postMessage(result);
};
