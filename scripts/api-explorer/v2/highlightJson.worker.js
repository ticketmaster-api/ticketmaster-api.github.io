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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTEwNDJkNGQwZjI2NTU4ZDJhYjEiLCJ3ZWJwYWNrOi8vLy4vRDovcHJvamVjdHMvdGlja2V0bWFzdGVyL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9zZXJ2aWNlcy9qc29uLWhpZ2hsaWdodC9qc29uLXBhcnNlLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9zZXJ2aWNlcy9qc29uLWhpZ2hsaWdodC9oaWdobGlnaHRKc29uLndvcmtlci5qcyJdLCJuYW1lcyI6WyJwcmVmaXgiLCJnZXRFeHBhbmRlckNsYXNzZXMiLCJleHBhbmRlZCIsImVuY29kZSIsInZhbHVlIiwiam9pbiIsImNyZWF0ZUVsZW1lbnQiLCJrZXkiLCJ0eXBlIiwiZXhwYW5kZXJDbGFzc2VzIiwia2xhc3MiLCJvcGVuIiwiY2xvc2UiLCJBcnJheSIsImlzQXJyYXkiLCJqc29uMmh0bWwiLCJqc29uIiwiaHRtbCIsImhhc093blByb3BlcnR5IiwiZ2V0SnNvblZpZXdlciIsImRhdGEiLCJvcHRpb25zIiwiSlNPTiIsInBhcnNlIiwiZSIsInRvU3RyaW5nIiwibW9kdWxlIiwiZXhwb3J0cyIsIm9wdCIsInN0cmluZ2lmeSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStE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bW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhMTA0MmQ0ZDBmMjY1NThkMmFiMSIsInZhciBwcmVmaXggPSAndG0tY29kZSc7XHJcblxyXG52YXIgZ2V0RXhwYW5kZXJDbGFzc2VzID0gZnVuY3Rpb24gKGV4cGFuZGVkKSB7XHJcblx0aWYgKCFleHBhbmRlZCkge1xyXG5cdFx0cmV0dXJuICdleHBhbmRlZCBjb2xsYXBzZWQgaGlkZGVuJztcclxuXHR9XHJcblx0cmV0dXJuICdleHBhbmRlZCc7XHJcbn07XHJcblxyXG52YXIgZW5jb2RlID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0cmV0dXJuIFsnPHNwYW4+JywgdmFsdWUsICc8L3NwYW4+J10uam9pbignJyk7XHJcbn07XHJcblxyXG52YXIgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlLCB0eXBlLCBleHBhbmRlckNsYXNzZXMpIHtcclxuXHR2YXIga2xhc3MgPSAnb2JqZWN0JyxcclxuXHRcdG9wZW4gPSAneycsXHJcblx0XHRjbG9zZSA9ICd9JztcclxuXHJcblx0aWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcblx0XHRrbGFzcyA9ICdhcnJheSc7XHJcblx0XHRvcGVuID0gJ1snO1xyXG5cdFx0Y2xvc2UgPSAnXSc7XHJcblx0fVxyXG5cclxuXHRpZiAodmFsdWUgPT09IG51bGwpIHtcclxuXHRcdHJldHVybiBbXHJcblx0XHRcdCc8bGk+JyxcclxuXHRcdFx0XHQnPHNwYW4gY2xhc3M9XCJrZXlcIj5cIicsIGVuY29kZShrZXkpLCAnXCI6IDwvc3Bhbj4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cIm51bGxcIj5cIicsIGVuY29kZSh2YWx1ZSksICdcIjwvc3Bhbj4nLFxyXG5cdFx0XHQnPC9saT4nXHJcblx0XHRdLmpvaW4oJycpO1xyXG5cdH1cclxuXHJcblx0aWYgKHR5cGUgPT0gJ29iamVjdCcpIHtcclxuXHRcdHJldHVybiBbXHJcblx0XHRcdCc8bGk+JyxcclxuXHRcdFx0XHQnPHNwYW4gY2xhc3M9XCInLCBleHBhbmRlckNsYXNzZXMsICdcIj48L3NwYW4+JyxcclxuXHRcdFx0XHQnPHNwYW4gY2xhc3M9XCJrZXlcIj5cIicsIGVuY29kZShrZXkpLCAnXCI6IDwvc3Bhbj4gJyxcclxuXHRcdFx0XHQnPHNwYW4gY2xhc3M9XCJvcGVuXCI+Jywgb3BlbiwgJzwvc3Bhbj4gJyxcclxuXHRcdFx0XHQnPHVsIGNsYXNzPVwiJywga2xhc3MsICdcIj4nLFxyXG5cdFx0XHRcdFx0anNvbjJodG1sKHZhbHVlLCBleHBhbmRlckNsYXNzZXMpLFxyXG5cdFx0XHRcdCc8L3VsPicsXHJcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwiY2xvc2VcIj4nLCBjbG9zZSwgJzwvc3Bhbj4nLFxyXG5cdFx0XHQnPC9saT4nXHJcblx0XHRdLmpvaW4oJycpO1xyXG5cdH1cclxuXHJcblx0aWYgKHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnYm9vbGVhbicpIHtcclxuXHRcdHJldHVybiBbXHJcblx0XHRcdCc8bGk+JyxcclxuXHRcdFx0XHQnPHNwYW4gY2xhc3M9XCJrZXlcIj5cIicsIGVuY29kZShrZXkpLCAnXCI6IDwvc3Bhbj4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cIicsIHR5cGUsICdcIj4nLCBlbmNvZGUodmFsdWUpLCAnPC9zcGFuPicsXHJcblx0XHRcdCc8L2xpPidcclxuXHRcdF0uam9pbignJyk7XHJcblx0fVxyXG5cdHJldHVybiBbXHJcblx0XHQnPGxpPicsXHJcblx0XHRcdCc8c3BhbiBjbGFzcz1cImtleVwiPlwiJywgZW5jb2RlKGtleSksICdcIjogPC9zcGFuPicsXHJcblx0XHRcdCc8c3BhbiBjbGFzcz1cIicsIHR5cGUsICdcIj5cIicsIGVuY29kZSh2YWx1ZSksICdcIjwvc3Bhbj4nLFxyXG5cdFx0JzwvbGk+J1xyXG5cdF0uam9pbignJyk7XHJcbn07XHJcblxyXG52YXIganNvbjJodG1sID0gZnVuY3Rpb24gKGpzb24sIGV4cGFuZGVyQ2xhc3Nlcykge1xyXG5cdHZhciBodG1sID0gJyc7XHJcblx0Zm9yICh2YXIga2V5IGluIGpzb24pIHtcclxuXHRcdGlmICghanNvbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcblx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGh0bWwgPSBbaHRtbCwgY3JlYXRlRWxlbWVudChrZXksIGpzb25ba2V5XSwgdHlwZW9mIGpzb25ba2V5XSwgZXhwYW5kZXJDbGFzc2VzKV0uam9pbignJyk7XHJcblx0fVxyXG5cdHJldHVybiBodG1sO1xyXG59O1xyXG5cclxudmFyIGdldEpzb25WaWV3ZXIgPSBmdW5jdGlvbiAoZGF0YSwgb3B0aW9ucykge1xyXG5cdHRyeSB7XHJcblx0XHRyZXR1cm4gW1xyXG5cdFx0XHQnPHVsIGNsYXNzPVwiJywgcHJlZml4LCAnLWNvbnRhaW5lclwiPicsXHJcblx0XHRcdFx0anNvbjJodG1sKFtKU09OLnBhcnNlKGRhdGEpXSwgZ2V0RXhwYW5kZXJDbGFzc2VzKG9wdGlvbnMuZXhwYW5kZWQpKSxcclxuXHRcdFx0JzwvdWw+J1xyXG5cdFx0XS5qb2luKCcnKTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRyZXR1cm4gW1xyXG5cdFx0XHQnPGRpdiBjbGFzcz1cIicsIHByZWZpeCwgJy1lcnJvclwiID4nLCBlLnRvU3RyaW5nKCksICcgPC9kaXY+J1xyXG5cdFx0XS5qb2luKCcnKTtcclxuXHR9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRhdGEsIG9wdCkge1xyXG5cdHZhciBqc29uID0gJyc7XHJcblx0dmFyIG9wdGlvbnMgPSBvcHQgfHwge2V4cGFuZGVkOiB0cnVlfTtcclxuXHRpZiAodHlwZW9mIGRhdGEgPT0gJ3N0cmluZycpIHtcclxuXHRcdGpzb24gPSBkYXRhO1xyXG5cdH0gZWxzZSBpZiAodHlwZW9mIGRhdGEgPT0gJ29iamVjdCcpIHtcclxuXHRcdGpzb24gPSBKU09OLnN0cmluZ2lmeShkYXRhKVxyXG5cdH1cclxuXHRyZXR1cm4gZ2V0SnNvblZpZXdlcihqc29uLCBvcHRpb25zKTtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vRDovcHJvamVjdHMvdGlja2V0bWFzdGVyL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9zZXJ2aWNlcy9qc29uLWhpZ2hsaWdodC9qc29uLXBhcnNlLmpzIiwiLyoqXHJcbiAqIENvZGUgZm9ybWF0IHdlYi13b3JrZXJcclxuICogQHBhcmFtIGV2ZW50XHJcbiAqL1xyXG4vLyB2YXIgaGlnaGxpZ2h0SnNvbigpXHJcbnZhciBoaWdobGlnaHRKc29uID0gcmVxdWlyZSgnLi9qc29uLXBhcnNlJyk7XHJcblxyXG5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xyXG4gIHZhciBjb2RlID0gZXZlbnQuZGF0YTtcclxuICAvLyBpbXBvcnRTY3JpcHRzKCdqc29uLXBhcnNlLmpzJyk7XHJcbiAgdmFyIHJlc3VsdCA9IGhpZ2hsaWdodEpzb24oY29kZSwge2V4cGFuZGVkOiB0cnVlfSk7XHJcbiAgLy8gdmFyIHJlc3VsdCA9SlNPTi5zdHJpbmdpZnkoY29kZSk7XHJcbiAgcG9zdE1lc3NhZ2UocmVzdWx0KTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvc2VydmljZXMvanNvbi1oaWdobGlnaHQvaGlnaGxpZ2h0SnNvbi53b3JrZXIuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==