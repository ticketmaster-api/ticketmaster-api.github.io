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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTAzNGYxODU0YWI0YzlkMzljY2MiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9oaWdobGlnaHRKc29uLndvcmtlci5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL2pzb24tcGFyc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQW9DLGVBQWU7QUFDbkQ7QUFDQTtBQUNBOzs7Ozs7O0FDWkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBVztBQUNYLGFBQVk7O0FBRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiMTAzNGYxODU0YWI0YzlkMzljY2Mud29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAxMDM0ZjE4NTRhYjRjOWQzOWNjY1xuICoqLyIsIi8qKlxuICogQ29kZSBmb3JtYXQgd2ViLXdvcmtlclxuICogQHBhcmFtIGV2ZW50XG4gKi9cbi8vIHZhciBoaWdobGlnaHRKc29uKClcbnZhciBoaWdobGlnaHRKc29uID0gcmVxdWlyZSgnLi9qc29uLXBhcnNlJyk7XG5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICB2YXIgY29kZSA9IGV2ZW50LmRhdGE7XG4gIC8vIGltcG9ydFNjcmlwdHMoJ2pzb24tcGFyc2UuanMnKTtcbiAgdmFyIHJlc3VsdCA9IGhpZ2hsaWdodEpzb24oY29kZSwge2V4cGFuZGVkOiB0cnVlfSk7XG4gIC8vIHZhciByZXN1bHQgPUpTT04uc3RyaW5naWZ5KGNvZGUpO1xuICBwb3N0TWVzc2FnZShyZXN1bHQpO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL2hpZ2hsaWdodEpzb24ud29ya2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHByZWZpeCA9ICd0bS1jb2RlJztcblxudmFyIGdldEV4cGFuZGVyQ2xhc3NlcyA9IGZ1bmN0aW9uIChleHBhbmRlZCkge1xuXHRpZiAoIWV4cGFuZGVkKSB7XG5cdFx0cmV0dXJuICdleHBhbmRlZCBjb2xsYXBzZWQgaGlkZGVuJztcblx0fVxuXHRyZXR1cm4gJ2V4cGFuZGVkJztcbn07XG5cbnZhciBlbmNvZGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0cmV0dXJuIFsnPHNwYW4+JywgdmFsdWUsICc8L3NwYW4+J10uam9pbignJyk7XG59O1xuXG52YXIgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlLCB0eXBlLCBleHBhbmRlckNsYXNzZXMpIHtcblx0dmFyIGtsYXNzID0gJ29iamVjdCcsXG5cdFx0b3BlbiA9ICd7Jyxcblx0XHRjbG9zZSA9ICd9JztcblxuXHRpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcblx0XHRrbGFzcyA9ICdhcnJheSc7XG5cdFx0b3BlbiA9ICdbJztcblx0XHRjbG9zZSA9ICddJztcblx0fVxuXG5cdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuXHRcdHJldHVybiBbXG5cdFx0XHQnPGxpPicsXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cImtleVwiPlwiJywgZW5jb2RlKGtleSksICdcIjogPC9zcGFuPicsXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cIm51bGxcIj5cIicsIGVuY29kZSh2YWx1ZSksICdcIjwvc3Bhbj4nLFxuXHRcdFx0JzwvbGk+J1xuXHRcdF0uam9pbignJyk7XG5cdH1cblxuXHRpZiAodHlwZSA9PSAnb2JqZWN0Jykge1xuXHRcdHJldHVybiBbXG5cdFx0XHQnPGxpPicsXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cIicsIGV4cGFuZGVyQ2xhc3NlcywgJ1wiPjwvc3Bhbj4nLFxuXHRcdFx0XHQnPHNwYW4gY2xhc3M9XCJrZXlcIj5cIicsIGVuY29kZShrZXkpLCAnXCI6IDwvc3Bhbj4gJyxcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwib3BlblwiPicsIG9wZW4sICc8L3NwYW4+ICcsXG5cdFx0XHRcdCc8dWwgY2xhc3M9XCInLCBrbGFzcywgJ1wiPicsXG5cdFx0XHRcdFx0anNvbjJodG1sKHZhbHVlLCBleHBhbmRlckNsYXNzZXMpLFxuXHRcdFx0XHQnPC91bD4nLFxuXHRcdFx0XHQnPHNwYW4gY2xhc3M9XCJjbG9zZVwiPicsIGNsb3NlLCAnPC9zcGFuPicsXG5cdFx0XHQnPC9saT4nXG5cdFx0XS5qb2luKCcnKTtcblx0fVxuXG5cdGlmICh0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKSB7XG5cdFx0cmV0dXJuIFtcblx0XHRcdCc8bGk+Jyxcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwia2V5XCI+XCInLCBlbmNvZGUoa2V5KSwgJ1wiOiA8L3NwYW4+Jyxcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwiJywgdHlwZSwgJ1wiPicsIGVuY29kZSh2YWx1ZSksICc8L3NwYW4+Jyxcblx0XHRcdCc8L2xpPidcblx0XHRdLmpvaW4oJycpO1xuXHR9XG5cdHJldHVybiBbXG5cdFx0JzxsaT4nLFxuXHRcdFx0JzxzcGFuIGNsYXNzPVwia2V5XCI+XCInLCBlbmNvZGUoa2V5KSwgJ1wiOiA8L3NwYW4+Jyxcblx0XHRcdCc8c3BhbiBjbGFzcz1cIicsIHR5cGUsICdcIj5cIicsIGVuY29kZSh2YWx1ZSksICdcIjwvc3Bhbj4nLFxuXHRcdCc8L2xpPidcblx0XS5qb2luKCcnKTtcbn07XG5cbnZhciBqc29uMmh0bWwgPSBmdW5jdGlvbiAoanNvbiwgZXhwYW5kZXJDbGFzc2VzKSB7XG5cdHZhciBodG1sID0gJyc7XG5cdGZvciAodmFyIGtleSBpbiBqc29uKSB7XG5cdFx0aWYgKCFqc29uLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGh0bWwgPSBbaHRtbCwgY3JlYXRlRWxlbWVudChrZXksIGpzb25ba2V5XSwgdHlwZW9mIGpzb25ba2V5XSwgZXhwYW5kZXJDbGFzc2VzKV0uam9pbignJyk7XG5cdH1cblx0cmV0dXJuIGh0bWw7XG59O1xuXG52YXIgZ2V0SnNvblZpZXdlciA9IGZ1bmN0aW9uIChkYXRhLCBvcHRpb25zKSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIFtcblx0XHRcdCc8dWwgY2xhc3M9XCInLCBwcmVmaXgsICctY29udGFpbmVyXCI+Jyxcblx0XHRcdFx0anNvbjJodG1sKFtKU09OLnBhcnNlKGRhdGEpXSwgZ2V0RXhwYW5kZXJDbGFzc2VzKG9wdGlvbnMuZXhwYW5kZWQpKSxcblx0XHRcdCc8L3VsPidcblx0XHRdLmpvaW4oJycpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIFtcblx0XHRcdCc8ZGl2IGNsYXNzPVwiJywgcHJlZml4LCAnLWVycm9yXCIgPicsIGUudG9TdHJpbmcoKSwgJyA8L2Rpdj4nXG5cdFx0XS5qb2luKCcnKTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkYXRhLCBvcHQpIHtcblx0dmFyIGpzb24gPSAnJztcblx0dmFyIG9wdGlvbnMgPSBvcHQgfHwge2V4cGFuZGVkOiB0cnVlfTtcblx0aWYgKHR5cGVvZiBkYXRhID09ICdzdHJpbmcnKSB7XG5cdFx0anNvbiA9IGRhdGE7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRhdGEgPT0gJ29iamVjdCcpIHtcblx0XHRqc29uID0gSlNPTi5zdHJpbmdpZnkoZGF0YSlcblx0fVxuXHRyZXR1cm4gZ2V0SnNvblZpZXdlcihqc29uLCBvcHRpb25zKTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9qc29uLXBhcnNlLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==