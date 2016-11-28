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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Code format web-worker
	 * @param event
	 */
	// var highlightJson()
	var highlightJson = __webpack_require__(1);
	
	onmessage = function(event) {
	  var code = event.data;
	  // importScripts('json-parse.js');
	  var result = highlightJson(code, {expanded: true});
	  // var result =JSON.stringify(code);
	  postMessage(result);
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzEzZjQxOWE0ZDU4OWY2YWRhYTYiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvaGlnaGxpZ2h0SnNvbi53b3JrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvanNvbi1wYXJzZS5qcyJdLCJuYW1lcyI6WyJwcmVmaXgiLCJnZXRFeHBhbmRlckNsYXNzZXMiLCJleHBhbmRlZCIsImVuY29kZSIsInZhbHVlIiwiam9pbiIsImNyZWF0ZUVsZW1lbnQiLCJrZXkiLCJ0eXBlIiwiZXhwYW5kZXJDbGFzc2VzIiwia2xhc3MiLCJvcGVuIiwiY2xvc2UiLCJBcnJheSIsImlzQXJyYXkiLCJqc29uMmh0bWwiLCJqc29uIiwiaHRtbCIsImhhc093blByb3BlcnR5IiwiZ2V0SnNvblZpZXdlciIsImRhdGEiLCJvcHRpb25zIiwiSlNPTiIsInBhcnNlIiwiZSIsInRvU3RyaW5nIiwibW9kdWxlIiwiZXhwb3J0cyIsIm9wdCIsInN0cmluZ2lmeSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFDQUFvQyxlQUFlO0FBQ25EO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNiQSxLQUFJQSxTQUFTLFNBQWI7O0FBRUEsS0FBSUMscUJBQXFCLFNBQXJCQSxrQkFBcUIsQ0FBVUMsUUFBVixFQUFvQjtBQUM1QyxNQUFJLENBQUNBLFFBQUwsRUFBZTtBQUNkLFVBQU8sMkJB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LENBQUNPLEtBQUtDLEtBQUwsQ0FBV0gsSUFBWCxDQUFELENBQVYsRUFBOEJuQixtQkFBbUJvQixRQUFRbkIsUUFBM0IsQ0FBOUIsQ0FGSyxFQUdOLE9BSE0sRUFJTEcsSUFKSyxDQUlBLEVBSkEsQ0FBUDtBQUtBLEdBTkQsQ0FNRSxPQUFPbUIsQ0FBUCxFQUFVO0FBQ1gsVUFBTyxDQUNOLGNBRE0sRUFDVXhCLE1BRFYsRUFDa0IsV0FEbEIsRUFDK0J3QixFQUFFQyxRQUFGLEVBRC9CLEVBQzZDLFNBRDdDLEVBRUxwQixJQUZLLENBRUEsRUFGQSxDQUFQO0FBR0E7QUFDRCxFQVpEOztBQWNBcUIsUUFBT0MsT0FBUCxHQUFpQixVQUFTUCxJQUFULEVBQWVRLEdBQWYsRUFBb0I7QUFDcEMsTUFBSVosT0FBTyxFQUFYO0FBQ0EsTUFBSUssVUFBVU8sT0FBTyxFQUFDMUIsVUFBVSxJQUFYLEVBQXJCO0FBQ0EsTUFBSSxPQUFPa0IsSUFBUCxJQUFlLFFBQW5CLEVBQTZCO0FBQzVCSixVQUFPSSxJQUFQO0FBQ0EsR0FGRCxNQUVPLElBQUksUUFBT0EsSUFBUCx5Q0FBT0EsSUFBUCxNQUFlLFFBQW5CLEVBQTZCO0FBQ25DSixVQUFPTSxLQUFLTyxTQUFMLENBQWVULElBQWYsQ0FBUDtBQUNBO0FBQ0QsU0FBT0QsY0FBY0gsSUFBZCxFQUFvQkssT0FBcEIsQ0FBUDtBQUNBLEVBVEQsQyIsImZpbGUiOiJoaWdobGlnaHRKc29uLndvcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDcxM2Y0MTlhNGQ1ODlmNmFkYWE2IiwiLyoqXHJcbiAqIENvZGUgZm9ybWF0IHdlYi13b3JrZXJcclxuICogQHBhcmFtIGV2ZW50XHJcbiAqL1xyXG4vLyB2YXIgaGlnaGxpZ2h0SnNvbigpXHJcbnZhciBoaWdobGlnaHRKc29uID0gcmVxdWlyZSgnLi9qc29uLXBhcnNlJyk7XHJcblxyXG5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xyXG4gIHZhciBjb2RlID0gZXZlbnQuZGF0YTtcclxuICAvLyBpbXBvcnRTY3JpcHRzKCdqc29uLXBhcnNlLmpzJyk7XHJcbiAgdmFyIHJlc3VsdCA9IGhpZ2hsaWdodEpzb24oY29kZSwge2V4cGFuZGVkOiB0cnVlfSk7XHJcbiAgLy8gdmFyIHJlc3VsdCA9SlNPTi5zdHJpbmdpZnkoY29kZSk7XHJcbiAgcG9zdE1lc3NhZ2UocmVzdWx0KTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9oaWdobGlnaHRKc29uLndvcmtlci5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcHJlZml4ID0gJ3RtLWNvZGUnO1xyXG5cclxudmFyIGdldEV4cGFuZGVyQ2xhc3NlcyA9IGZ1bmN0aW9uIChleHBhbmRlZCkge1xyXG5cdGlmICghZXhwYW5kZWQpIHtcclxuXHRcdHJldHVybiAnZXhwYW5kZWQgY29sbGFwc2VkIGhpZGRlbic7XHJcblx0fVxyXG5cdHJldHVybiAnZXhwYW5kZWQnO1xyXG59O1xyXG5cclxudmFyIGVuY29kZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdHJldHVybiBbJzxzcGFuPicsIHZhbHVlLCAnPC9zcGFuPiddLmpvaW4oJycpO1xyXG59O1xyXG5cclxudmFyIGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgdHlwZSwgZXhwYW5kZXJDbGFzc2VzKSB7XHJcblx0dmFyIGtsYXNzID0gJ29iamVjdCcsXHJcblx0XHRvcGVuID0gJ3snLFxyXG5cdFx0Y2xvc2UgPSAnfSc7XHJcblxyXG5cdGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG5cdFx0a2xhc3MgPSAnYXJyYXknO1xyXG5cdFx0b3BlbiA9ICdbJztcclxuXHRcdGNsb3NlID0gJ10nO1xyXG5cdH1cclxuXHJcblx0aWYgKHZhbHVlID09PSBudWxsKSB7XHJcblx0XHRyZXR1cm4gW1xyXG5cdFx0XHQnPGxpPicsXHJcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwia2V5XCI+XCInLCBlbmNvZGUoa2V5KSwgJ1wiOiA8L3NwYW4+JyxcclxuXHRcdFx0XHQnPHNwYW4gY2xhc3M9XCJudWxsXCI+XCInLCBlbmNvZGUodmFsdWUpLCAnXCI8L3NwYW4+JyxcclxuXHRcdFx0JzwvbGk+J1xyXG5cdFx0XS5qb2luKCcnKTtcclxuXHR9XHJcblxyXG5cdGlmICh0eXBlID09ICdvYmplY3QnKSB7XHJcblx0XHRyZXR1cm4gW1xyXG5cdFx0XHQnPGxpPicsXHJcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwiJywgZXhwYW5kZXJDbGFzc2VzLCAnXCI+PC9zcGFuPicsXHJcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwia2V5XCI+XCInLCBlbmNvZGUoa2V5KSwgJ1wiOiA8L3NwYW4+ICcsXHJcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwib3BlblwiPicsIG9wZW4sICc8L3NwYW4+ICcsXHJcblx0XHRcdFx0Jzx1bCBjbGFzcz1cIicsIGtsYXNzLCAnXCI+JyxcclxuXHRcdFx0XHRcdGpzb24yaHRtbCh2YWx1ZSwgZXhwYW5kZXJDbGFzc2VzKSxcclxuXHRcdFx0XHQnPC91bD4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cImNsb3NlXCI+JywgY2xvc2UsICc8L3NwYW4+JyxcclxuXHRcdFx0JzwvbGk+J1xyXG5cdFx0XS5qb2luKCcnKTtcclxuXHR9XHJcblxyXG5cdGlmICh0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKSB7XHJcblx0XHRyZXR1cm4gW1xyXG5cdFx0XHQnPGxpPicsXHJcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwia2V5XCI+XCInLCBlbmNvZGUoa2V5KSwgJ1wiOiA8L3NwYW4+JyxcclxuXHRcdFx0XHQnPHNwYW4gY2xhc3M9XCInLCB0eXBlLCAnXCI+JywgZW5jb2RlKHZhbHVlKSwgJzwvc3Bhbj4nLFxyXG5cdFx0XHQnPC9saT4nXHJcblx0XHRdLmpvaW4oJycpO1xyXG5cdH1cclxuXHRyZXR1cm4gW1xyXG5cdFx0JzxsaT4nLFxyXG5cdFx0XHQnPHNwYW4gY2xhc3M9XCJrZXlcIj5cIicsIGVuY29kZShrZXkpLCAnXCI6IDwvc3Bhbj4nLFxyXG5cdFx0XHQnPHNwYW4gY2xhc3M9XCInLCB0eXBlLCAnXCI+XCInLCBlbmNvZGUodmFsdWUpLCAnXCI8L3NwYW4+JyxcclxuXHRcdCc8L2xpPidcclxuXHRdLmpvaW4oJycpO1xyXG59O1xyXG5cclxudmFyIGpzb24yaHRtbCA9IGZ1bmN0aW9uIChqc29uLCBleHBhbmRlckNsYXNzZXMpIHtcclxuXHR2YXIgaHRtbCA9ICcnO1xyXG5cdGZvciAodmFyIGtleSBpbiBqc29uKSB7XHJcblx0XHRpZiAoIWpzb24uaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG5cdFx0XHRjb250aW51ZTtcclxuXHRcdH1cclxuXHJcblx0XHRodG1sID0gW2h0bWwsIGNyZWF0ZUVsZW1lbnQoa2V5LCBqc29uW2tleV0sIHR5cGVvZiBqc29uW2tleV0sIGV4cGFuZGVyQ2xhc3NlcyldLmpvaW4oJycpO1xyXG5cdH1cclxuXHRyZXR1cm4gaHRtbDtcclxufTtcclxuXHJcbnZhciBnZXRKc29uVmlld2VyID0gZnVuY3Rpb24gKGRhdGEsIG9wdGlvbnMpIHtcclxuXHR0cnkge1xyXG5cdFx0cmV0dXJuIFtcclxuXHRcdFx0Jzx1bCBjbGFzcz1cIicsIHByZWZpeCwgJy1jb250YWluZXJcIj4nLFxyXG5cdFx0XHRcdGpzb24yaHRtbChbSlNPTi5wYXJzZShkYXRhKV0sIGdldEV4cGFuZGVyQ2xhc3NlcyhvcHRpb25zLmV4cGFuZGVkKSksXHJcblx0XHRcdCc8L3VsPidcclxuXHRcdF0uam9pbignJyk7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0cmV0dXJuIFtcclxuXHRcdFx0JzxkaXYgY2xhc3M9XCInLCBwcmVmaXgsICctZXJyb3JcIiA+JywgZS50b1N0cmluZygpLCAnIDwvZGl2PidcclxuXHRcdF0uam9pbignJyk7XHJcblx0fVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkYXRhLCBvcHQpIHtcclxuXHR2YXIganNvbiA9ICcnO1xyXG5cdHZhciBvcHRpb25zID0gb3B0IHx8IHtleHBhbmRlZDogdHJ1ZX07XHJcblx0aWYgKHR5cGVvZiBkYXRhID09ICdzdHJpbmcnKSB7XHJcblx0XHRqc29uID0gZGF0YTtcclxuXHR9IGVsc2UgaWYgKHR5cGVvZiBkYXRhID09ICdvYmplY3QnKSB7XHJcblx0XHRqc29uID0gSlNPTi5zdHJpbmdpZnkoZGF0YSlcclxuXHR9XHJcblx0cmV0dXJuIGdldEpzb25WaWV3ZXIoanNvbiwgb3B0aW9ucyk7XHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2pzb24tcGFyc2UuanMiXSwic291cmNlUm9vdCI6IiJ9