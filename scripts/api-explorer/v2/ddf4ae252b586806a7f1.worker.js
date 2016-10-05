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

	var prefix = 'tm-code';
	
	var getExpanderClasses = function (expanded) {
		if (!expanded) {
			return 'expanded collapsed hidden';
		}
		return 'expanded';
	};
	
	var encode = function (value) {
		return ['<span>', value, '</span>'].join('');
	};
	
	var createElement = function (key, value, type, expanderClasses) {
		var klass = 'object',
			open = '{',
			close = '}';
	
		if (Array.isArray(value)) {
			klass = 'array';
			open = '[';
			close = ']';
		}
	
		if (value === null) {
			return [
				'<li>',
					'<span class="key">"', encode(key), '": </span>',
					'<span class="null">"', encode(value), '"</span>',
				'</li>'
			].join('');
		}
	
		if (type == 'object') {
			return [
				'<li>',
					'<span class="', expanderClasses, '"></span>',
					'<span class="key">"', encode(key), '": </span> ',
					'<span class="open">', open, '</span> ',
					'<ul class="', klass, '">',
						json2html(value, expanderClasses),
					'</ul>',
					'<span class="close">', close, '</span>',
				'</li>'
			].join('');
		}
	
		if (type == 'number' || type == 'boolean') {
			return [
				'<li>',
					'<span class="key">"', encode(key), '": </span>',
					'<span class="', type, '">', encode(value), '</span>',
				'</li>'
			].join('');
		}
		return [
			'<li>',
				'<span class="key">"', encode(key), '": </span>',
				'<span class="', type, '">"', encode(value), '"</span>',
			'</li>'
		].join('');
	};
	
	var json2html = function (json, expanderClasses) {
		var html = '';
		for (var key in json) {
			if (!json.hasOwnProperty(key)) {
				continue;
			}
	
			html = [html, createElement(key, json[key], typeof json[key], expanderClasses)].join('');
		}
		return html;
	};
	
	var getJsonViewer = function (data, options) {
		try {
			return [
				'<ul class="', prefix, '-container">',
					json2html([JSON.parse(data)], getExpanderClasses(options.expanded)),
				'</ul>'
			].join('');
		} catch (e) {
			return [
				'<div class="', prefix, '-error" >', e.toString(), ' </div>'
			].join('');
		}
	};
	
	module.exports = function(data, opt) {
		var json = '';
		var options = opt || {expanded: true};
		if (typeof data == 'string') {
			json = data;
		} else if (typeof data == 'object') {
			json = JSON.stringify(data)
		}
		return getJsonViewer(json, options);
	};


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGRmNGFlMjUyYjU4NjgwNmE3ZjEiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9oaWdobGlnaHRKc29uLndvcmtlci5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL2pzb24tcGFyc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFDQUFvQyxlQUFlO0FBQ25EO0FBQ0E7QUFDQTs7Ozs7OztBQ2JBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVc7QUFDWCxhQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF1QjtBQUN2QjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImRkZjRhZTI1MmI1ODY4MDZhN2YxLndvcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZGRmNGFlMjUyYjU4NjgwNmE3ZjFcbiAqKi8iLCIvKipcbiAqIENvZGUgZm9ybWF0IHdlYi13b3JrZXJcbiAqIEBwYXJhbSBldmVudFxuICovXG4vLyB2YXIgaGlnaGxpZ2h0SnNvbigpXG52YXIgaGlnaGxpZ2h0SnNvbiA9IHJlcXVpcmUoJy4vanNvbi1wYXJzZScpO1xuXG5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICB2YXIgY29kZSA9IGV2ZW50LmRhdGE7XG4gIC8vIGltcG9ydFNjcmlwdHMoJ2pzb24tcGFyc2UuanMnKTtcbiAgdmFyIHJlc3VsdCA9IGhpZ2hsaWdodEpzb24oY29kZSwge2V4cGFuZGVkOiB0cnVlfSk7XG4gIC8vIHZhciByZXN1bHQgPUpTT04uc3RyaW5naWZ5KGNvZGUpO1xuICBwb3N0TWVzc2FnZShyZXN1bHQpO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL2hpZ2hsaWdodEpzb24ud29ya2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHByZWZpeCA9ICd0bS1jb2RlJztcblxudmFyIGdldEV4cGFuZGVyQ2xhc3NlcyA9IGZ1bmN0aW9uIChleHBhbmRlZCkge1xuXHRpZiAoIWV4cGFuZGVkKSB7XG5cdFx0cmV0dXJuICdleHBhbmRlZCBjb2xsYXBzZWQgaGlkZGVuJztcblx0fVxuXHRyZXR1cm4gJ2V4cGFuZGVkJztcbn07XG5cbnZhciBlbmNvZGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0cmV0dXJuIFsnPHNwYW4+JywgdmFsdWUsICc8L3NwYW4+J10uam9pbignJyk7XG59O1xuXG52YXIgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlLCB0eXBlLCBleHBhbmRlckNsYXNzZXMpIHtcblx0dmFyIGtsYXNzID0gJ29iamVjdCcsXG5cdFx0b3BlbiA9ICd7Jyxcblx0XHRjbG9zZSA9ICd9JztcblxuXHRpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcblx0XHRrbGFzcyA9ICdhcnJheSc7XG5cdFx0b3BlbiA9ICdbJztcblx0XHRjbG9zZSA9ICddJztcblx0fVxuXG5cdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuXHRcdHJldHVybiBbXG5cdFx0XHQnPGxpPicsXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cImtleVwiPlwiJywgZW5jb2RlKGtleSksICdcIjogPC9zcGFuPicsXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cIm51bGxcIj5cIicsIGVuY29kZSh2YWx1ZSksICdcIjwvc3Bhbj4nLFxuXHRcdFx0JzwvbGk+J1xuXHRcdF0uam9pbignJyk7XG5cdH1cblxuXHRpZiAodHlwZSA9PSAnb2JqZWN0Jykge1xuXHRcdHJldHVybiBbXG5cdFx0XHQnPGxpPicsXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cIicsIGV4cGFuZGVyQ2xhc3NlcywgJ1wiPjwvc3Bhbj4nLFxuXHRcdFx0XHQnPHNwYW4gY2xhc3M9XCJrZXlcIj5cIicsIGVuY29kZShrZXkpLCAnXCI6IDwvc3Bhbj4gJyxcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwib3BlblwiPicsIG9wZW4sICc8L3NwYW4+ICcsXG5cdFx0XHRcdCc8dWwgY2xhc3M9XCInLCBrbGFzcywgJ1wiPicsXG5cdFx0XHRcdFx0anNvbjJodG1sKHZhbHVlLCBleHBhbmRlckNsYXNzZXMpLFxuXHRcdFx0XHQnPC91bD4nLFxuXHRcdFx0XHQnPHNwYW4gY2xhc3M9XCJjbG9zZVwiPicsIGNsb3NlLCAnPC9zcGFuPicsXG5cdFx0XHQnPC9saT4nXG5cdFx0XS5qb2luKCcnKTtcblx0fVxuXG5cdGlmICh0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKSB7XG5cdFx0cmV0dXJuIFtcblx0XHRcdCc8bGk+Jyxcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwia2V5XCI+XCInLCBlbmNvZGUoa2V5KSwgJ1wiOiA8L3NwYW4+Jyxcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwiJywgdHlwZSwgJ1wiPicsIGVuY29kZSh2YWx1ZSksICc8L3NwYW4+Jyxcblx0XHRcdCc8L2xpPidcblx0XHRdLmpvaW4oJycpO1xuXHR9XG5cdHJldHVybiBbXG5cdFx0JzxsaT4nLFxuXHRcdFx0JzxzcGFuIGNsYXNzPVwia2V5XCI+XCInLCBlbmNvZGUoa2V5KSwgJ1wiOiA8L3NwYW4+Jyxcblx0XHRcdCc8c3BhbiBjbGFzcz1cIicsIHR5cGUsICdcIj5cIicsIGVuY29kZSh2YWx1ZSksICdcIjwvc3Bhbj4nLFxuXHRcdCc8L2xpPidcblx0XS5qb2luKCcnKTtcbn07XG5cbnZhciBqc29uMmh0bWwgPSBmdW5jdGlvbiAoanNvbiwgZXhwYW5kZXJDbGFzc2VzKSB7XG5cdHZhciBodG1sID0gJyc7XG5cdGZvciAodmFyIGtleSBpbiBqc29uKSB7XG5cdFx0aWYgKCFqc29uLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGh0bWwgPSBbaHRtbCwgY3JlYXRlRWxlbWVudChrZXksIGpzb25ba2V5XSwgdHlwZW9mIGpzb25ba2V5XSwgZXhwYW5kZXJDbGFzc2VzKV0uam9pbignJyk7XG5cdH1cblx0cmV0dXJuIGh0bWw7XG59O1xuXG52YXIgZ2V0SnNvblZpZXdlciA9IGZ1bmN0aW9uIChkYXRhLCBvcHRpb25zKSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIFtcblx0XHRcdCc8dWwgY2xhc3M9XCInLCBwcmVmaXgsICctY29udGFpbmVyXCI+Jyxcblx0XHRcdFx0anNvbjJodG1sKFtKU09OLnBhcnNlKGRhdGEpXSwgZ2V0RXhwYW5kZXJDbGFzc2VzKG9wdGlvbnMuZXhwYW5kZWQpKSxcblx0XHRcdCc8L3VsPidcblx0XHRdLmpvaW4oJycpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIFtcblx0XHRcdCc8ZGl2IGNsYXNzPVwiJywgcHJlZml4LCAnLWVycm9yXCIgPicsIGUudG9TdHJpbmcoKSwgJyA8L2Rpdj4nXG5cdFx0XS5qb2luKCcnKTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkYXRhLCBvcHQpIHtcblx0dmFyIGpzb24gPSAnJztcblx0dmFyIG9wdGlvbnMgPSBvcHQgfHwge2V4cGFuZGVkOiB0cnVlfTtcblx0aWYgKHR5cGVvZiBkYXRhID09ICdzdHJpbmcnKSB7XG5cdFx0anNvbiA9IGRhdGE7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRhdGEgPT0gJ29iamVjdCcpIHtcblx0XHRqc29uID0gSlNPTi5zdHJpbmdpZnkoZGF0YSlcblx0fVxuXHRyZXR1cm4gZ2V0SnNvblZpZXdlcihqc29uLCBvcHRpb25zKTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9qc29uLXBhcnNlLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==