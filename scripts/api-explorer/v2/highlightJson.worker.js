/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var prefix = 'tm-code';

var getExpanderClasses = function getExpanderClasses(expanded) {
	if (!expanded) {
		return 'expanded collapsed hidden';
	}
	return 'expanded';
};

var encode = function encode(value) {
	return ['<span>', value, '</span>'].join('');
};

var createElement = function createElement(key, value, type, expanderClasses) {
	var klass = 'object',
	    open = '{',
	    close = '}';

	if (Array.isArray(value)) {
		klass = 'array';
		open = '[';
		close = ']';
	}

	if (value === null) {
		return ['<li>', '<span class="key">"', encode(key), '": </span>', '<span class="null">"', encode(value), '"</span>', '</li>'].join('');
	}

	if (type == 'object') {
		return ['<li>', '<span class="', expanderClasses, '"></span>', '<span class="key">"', encode(key), '": </span> ', '<span class="open">', open, '</span> ', '<ul class="', klass, '">', json2html(value, expanderClasses), '</ul>', '<span class="close">', close, '</span>', '</li>'].join('');
	}

	if (type == 'number' || type == 'boolean') {
		return ['<li>', '<span class="key">"', encode(key), '": </span>', '<span class="', type, '">', encode(value), '</span>', '</li>'].join('');
	}
	return ['<li>', '<span class="key">"', encode(key), '": </span>', '<span class="', type, '">"', encode(value), '"</span>', '</li>'].join('');
};

var json2html = function json2html(json, expanderClasses) {
	var html = '';
	for (var key in json) {
		if (!json.hasOwnProperty(key)) {
			continue;
		}

		html = [html, createElement(key, json[key], _typeof(json[key]), expanderClasses)].join('');
	}
	return html;
};

var getJsonViewer = function getJsonViewer(data, options) {
	try {
		return ['<ul class="', prefix, '-container">', json2html([JSON.parse(data)], getExpanderClasses(options.expanded)), '</ul>'].join('');
	} catch (e) {
		return ['<div class="', prefix, '-error" >', e.toString(), ' </div>'].join('');
	}
};

module.exports = function (data, opt) {
	var json = '';
	var options = opt || { expanded: true };
	if (typeof data == 'string') {
		json = data;
	} else if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) == 'object') {
		json = JSON.stringify(data);
	}
	return getJsonViewer(json, options);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Code format web-worker
 * @param event
 */
// var highlightJson()
var highlightJson = __webpack_require__(0);

onmessage = function(event) {
  var code = event.data;
  // importScripts('json-parse.js');
  var result = highlightJson(code, {expanded: true});
  // var result =JSON.stringify(code);
  postMessage(result);
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTEwNDJkNGQwZjI2NTU4ZDJhYjEiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL3NlcnZpY2VzL2pzb24taGlnaGxpZ2h0L2pzb24tcGFyc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL3NlcnZpY2VzL2pzb24taGlnaGxpZ2h0L2hpZ2hsaWdodEpzb24ud29ya2VyLmpzIl0sIm5hbWVzIjpbInByZWZpeCIsImdldEV4cGFuZGVyQ2xhc3NlcyIsImV4cGFuZGVkIiwiZW5jb2RlIiwidmFsdWUiLCJqb2luIiwiY3JlYXRlRWxlbWVudCIsImtleSIsInR5cGUiLCJleHBhbmRlckNsYXNzZXMiLCJrbGFzcyIsIm9wZW4iLCJjbG9zZSIsIkFycmF5IiwiaXNBcnJheSIsImpzb24yaHRtbCIsImpzb24iLCJodG1sIiwiaGFzT3duUHJvcGVydHkiLCJnZXRKc29uVmlld2VyIiwiZGF0YSIsIm9wdGlvbnMiLCJKU09OIiwicGFyc2UiLCJlIiwidG9TdHJpbmciLCJtb2R1bGUiLCJleHBvcnRzIiwib3B0Iiwic3RyaW5naWZ5Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7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LElBQUlFLGdCQUFnQixTQUFoQkEsYUFBZ0IsQ0FBVUMsSUFBVixFQUFnQkMsT0FBaEIsRUFBeUI7QUFDNUMsS0FBSTtBQUNILFNBQU8sQ0FDTixhQURNLEVBQ1NyQixNQURULEVBQ2lCLGNBRGpCLEVBRUxlLFVBQVUsQ0FBQ08sS0FBS0MsS0FBTCxDQUFXSCxJQUFYLENBQUQsQ0FBVixFQUE4Qm5CLG1CQUFtQm9CLFFBQVFuQixRQUEzQixDQUE5QixDQUZLLEVBR04sT0FITSxFQUlMRyxJQUpLLENBSUEsRUFKQSxDQUFQO0FBS0EsRUFORCxDQU1FLE9BQU9tQixDQUFQLEVBQVU7QUFDWCxTQUFPLENBQ04sY0FETSxFQUNVeEIsTUFEVixFQUNrQixXQURsQixFQUMrQndCLEVBQUVDLFFBQUYsRUFEL0IsRUFDNkMsU0FEN0MsRUFFTHBCLElBRkssQ0FFQSxFQUZBLENBQVA7QUFHQTtBQUNELENBWkQ7O0FBY0FxQixPQUFPQyxPQUFQLEdBQWlCLFVBQVNQLElBQVQsRUFBZVEsR0FBZixFQUFvQjtBQUNwQyxLQUFJWixPQUFPLEVBQVg7QUFDQSxLQUFJSyxVQUFVTyxPQUFPLEVBQUMxQixVQUFVLElBQVgsRUFBckI7QUFDQSxLQUFJLE9BQU9rQixJQUFQLElBQWUsUUFBbkIsRUFBNkI7QUFDNUJKLFNBQU9JLElBQVA7QUFDQSxFQUZELE1BRU8sSUFBSSxRQUFPQSxJQUFQLHlDQUFPQSxJQUFQLE1BQWUsUUFBbkIsRUFBNkI7QUFDbkNKLFNBQU9NLEtBQUtPLFNBQUwsQ0FBZVQsSUFBZixDQUFQO0FBQ0E7QUFDRCxRQUFPRCxjQUFjSCxJQUFkLEVBQW9CSyxPQUFwQixDQUFQO0FBQ0EsQ0FURCxDOzs7Ozs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxlQUFlO0FBQ25EO0FBQ0E7QUFDQSIsImZpbGUiOiJoaWdobGlnaHRKc29uLndvcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGExMDQyZDRkMGYyNjU1OGQyYWIxIiwidmFyIHByZWZpeCA9ICd0bS1jb2RlJztcclxuXHJcbnZhciBnZXRFeHBhbmRlckNsYXNzZXMgPSBmdW5jdGlvbiAoZXhwYW5kZWQpIHtcclxuXHRpZiAoIWV4cGFuZGVkKSB7XHJcblx0XHRyZXR1cm4gJ2V4cGFuZGVkIGNvbGxhcHNlZCBoaWRkZW4nO1xyXG5cdH1cclxuXHRyZXR1cm4gJ2V4cGFuZGVkJztcclxufTtcclxuXHJcbnZhciBlbmNvZGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRyZXR1cm4gWyc8c3Bhbj4nLCB2YWx1ZSwgJzwvc3Bhbj4nXS5qb2luKCcnKTtcclxufTtcclxuXHJcbnZhciBjcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUsIHR5cGUsIGV4cGFuZGVyQ2xhc3Nlcykge1xyXG5cdHZhciBrbGFzcyA9ICdvYmplY3QnLFxyXG5cdFx0b3BlbiA9ICd7JyxcclxuXHRcdGNsb3NlID0gJ30nO1xyXG5cclxuXHRpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuXHRcdGtsYXNzID0gJ2FycmF5JztcclxuXHRcdG9wZW4gPSAnWyc7XHJcblx0XHRjbG9zZSA9ICddJztcclxuXHR9XHJcblxyXG5cdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG5cdFx0cmV0dXJuIFtcclxuXHRcdFx0JzxsaT4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cImtleVwiPlwiJywgZW5jb2RlKGtleSksICdcIjogPC9zcGFuPicsXHJcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwibnVsbFwiPlwiJywgZW5jb2RlKHZhbHVlKSwgJ1wiPC9zcGFuPicsXHJcblx0XHRcdCc8L2xpPidcclxuXHRcdF0uam9pbignJyk7XHJcblx0fVxyXG5cclxuXHRpZiAodHlwZSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0cmV0dXJuIFtcclxuXHRcdFx0JzxsaT4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cIicsIGV4cGFuZGVyQ2xhc3NlcywgJ1wiPjwvc3Bhbj4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cImtleVwiPlwiJywgZW5jb2RlKGtleSksICdcIjogPC9zcGFuPiAnLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cIm9wZW5cIj4nLCBvcGVuLCAnPC9zcGFuPiAnLFxyXG5cdFx0XHRcdCc8dWwgY2xhc3M9XCInLCBrbGFzcywgJ1wiPicsXHJcblx0XHRcdFx0XHRqc29uMmh0bWwodmFsdWUsIGV4cGFuZGVyQ2xhc3NlcyksXHJcblx0XHRcdFx0JzwvdWw+JyxcclxuXHRcdFx0XHQnPHNwYW4gY2xhc3M9XCJjbG9zZVwiPicsIGNsb3NlLCAnPC9zcGFuPicsXHJcblx0XHRcdCc8L2xpPidcclxuXHRcdF0uam9pbignJyk7XHJcblx0fVxyXG5cclxuXHRpZiAodHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdib29sZWFuJykge1xyXG5cdFx0cmV0dXJuIFtcclxuXHRcdFx0JzxsaT4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cImtleVwiPlwiJywgZW5jb2RlKGtleSksICdcIjogPC9zcGFuPicsXHJcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwiJywgdHlwZSwgJ1wiPicsIGVuY29kZSh2YWx1ZSksICc8L3NwYW4+JyxcclxuXHRcdFx0JzwvbGk+J1xyXG5cdFx0XS5qb2luKCcnKTtcclxuXHR9XHJcblx0cmV0dXJuIFtcclxuXHRcdCc8bGk+JyxcclxuXHRcdFx0JzxzcGFuIGNsYXNzPVwia2V5XCI+XCInLCBlbmNvZGUoa2V5KSwgJ1wiOiA8L3NwYW4+JyxcclxuXHRcdFx0JzxzcGFuIGNsYXNzPVwiJywgdHlwZSwgJ1wiPlwiJywgZW5jb2RlKHZhbHVlKSwgJ1wiPC9zcGFuPicsXHJcblx0XHQnPC9saT4nXHJcblx0XS5qb2luKCcnKTtcclxufTtcclxuXHJcbnZhciBqc29uMmh0bWwgPSBmdW5jdGlvbiAoanNvbiwgZXhwYW5kZXJDbGFzc2VzKSB7XHJcblx0dmFyIGh0bWwgPSAnJztcclxuXHRmb3IgKHZhciBrZXkgaW4ganNvbikge1xyXG5cdFx0aWYgKCFqc29uLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuXHRcdFx0Y29udGludWU7XHJcblx0XHR9XHJcblxyXG5cdFx0aHRtbCA9IFtodG1sLCBjcmVhdGVFbGVtZW50KGtleSwganNvbltrZXldLCB0eXBlb2YganNvbltrZXldLCBleHBhbmRlckNsYXNzZXMpXS5qb2luKCcnKTtcclxuXHR9XHJcblx0cmV0dXJuIGh0bWw7XHJcbn07XHJcblxyXG52YXIgZ2V0SnNvblZpZXdlciA9IGZ1bmN0aW9uIChkYXRhLCBvcHRpb25zKSB7XHJcblx0dHJ5IHtcclxuXHRcdHJldHVybiBbXHJcblx0XHRcdCc8dWwgY2xhc3M9XCInLCBwcmVmaXgsICctY29udGFpbmVyXCI+JyxcclxuXHRcdFx0XHRqc29uMmh0bWwoW0pTT04ucGFyc2UoZGF0YSldLCBnZXRFeHBhbmRlckNsYXNzZXMob3B0aW9ucy5leHBhbmRlZCkpLFxyXG5cdFx0XHQnPC91bD4nXHJcblx0XHRdLmpvaW4oJycpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJldHVybiBbXHJcblx0XHRcdCc8ZGl2IGNsYXNzPVwiJywgcHJlZml4LCAnLWVycm9yXCIgPicsIGUudG9TdHJpbmcoKSwgJyA8L2Rpdj4nXHJcblx0XHRdLmpvaW4oJycpO1xyXG5cdH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSwgb3B0KSB7XHJcblx0dmFyIGpzb24gPSAnJztcclxuXHR2YXIgb3B0aW9ucyA9IG9wdCB8fCB7ZXhwYW5kZWQ6IHRydWV9O1xyXG5cdGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykge1xyXG5cdFx0anNvbiA9IGRhdGE7XHJcblx0fSBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0anNvbiA9IEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcblx0fVxyXG5cdHJldHVybiBnZXRKc29uVmlld2VyKGpzb24sIG9wdGlvbnMpO1xyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvc2VydmljZXMvanNvbi1oaWdobGlnaHQvanNvbi1wYXJzZS5qcyIsIi8qKlxyXG4gKiBDb2RlIGZvcm1hdCB3ZWItd29ya2VyXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuLy8gdmFyIGhpZ2hsaWdodEpzb24oKVxyXG52YXIgaGlnaGxpZ2h0SnNvbiA9IHJlcXVpcmUoJy4vanNvbi1wYXJzZScpO1xyXG5cclxub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICB2YXIgY29kZSA9IGV2ZW50LmRhdGE7XHJcbiAgLy8gaW1wb3J0U2NyaXB0cygnanNvbi1wYXJzZS5qcycpO1xyXG4gIHZhciByZXN1bHQgPSBoaWdobGlnaHRKc29uKGNvZGUsIHtleHBhbmRlZDogdHJ1ZX0pO1xyXG4gIC8vIHZhciByZXN1bHQgPUpTT04uc3RyaW5naWZ5KGNvZGUpO1xyXG4gIHBvc3RNZXNzYWdlKHJlc3VsdCk7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL3NlcnZpY2VzL2pzb24taGlnaGxpZ2h0L2hpZ2hsaWdodEpzb24ud29ya2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=