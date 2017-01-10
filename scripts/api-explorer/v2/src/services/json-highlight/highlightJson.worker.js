/**
 * Code format web-worker
 * @param event
 */
// var highlightJson()
var highlightJson = require('./json-parse');

onmessage = function(event) {
  var code = event.data;
  // importScripts('json-parse.js');
  var result = highlightJson(code, {expanded: true});
  // var result =JSON.stringify(code);
  postMessage(result);
};
