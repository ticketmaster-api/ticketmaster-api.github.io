var base =
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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var clamp = __webpack_require__(2);
	
	
	/**
	 * Main file for Api Explrer v2.0
	 * For development please use Webpack to bundle all modules
	 * It can be made using npm scripts cmd - 'webpack'
	 */
	// custom bindings
	__webpack_require__(3);
	
	// Modules
	var base = __webpack_require__(7);
	var apiKey = __webpack_require__(8);
	var ajaxService = __webpack_require__(9);
	
	var config = __webpack_require__(10);
	
	// View Models
	var RequestsListViewModel = __webpack_require__(11);
	
	// Components
	__webpack_require__(18);
	
	/**
	 * Main application view-model
	 * @param obj {object} global data object
	 */
	function AppViewModel(obj) {
	  self = this;
		this.base = obj || {};
		this.apiKey = apiKey;
		this.config = config;
	
		var parsedUrl = parseUrl();
	
	  // observables
	  this.selectedCategory = ko.observable(parsedUrl.apiCategory || '');
		this.selectedMethodType = ko.observable('ALL');
	  this.selectedMethod = ko.observable(parsedUrl.methodId || '');
	  this.selectedParams = ko.observableArray([]);
		this.requests = ko.observableArray([]);
		this.onError = ko.observable({});
		this.selectedMethodData = ko.observable(getMethodData());
	
		// computed
	  this.URL = ko.computed(this.getUrl, this);
	
	  this.sendButtonText = ko.pureComputed(function () {
			return ko.unwrap(self.selectedMethodData).method;
		});
	
		this.sharePath = ko.pureComputed(formDeepLinkingUrl, this);
	  this.requestsList = new RequestsListViewModel(this.requests, this.selectedParams, this.sharePath);
		init();
	}
	
	function init() {
		self.selectedMethod.subscribe(function (val) {
			this.selectedMethodData(getMethodData({methodId: val}));
	
		}, self);
	}
	
	function getMethodData(params) {
		var category = ko.unwrap(params && params.apiCategory || self.selectedCategory);
		var type = ko.unwrap(params && params.type || self.selectedMethodType || 'ALL');
		var method = ko.unwrap(params && params.methodId || self.selectedMethod);
		return self.base[category] && self.base[category][type] && self.base[category][type][method] || {};
	}
	
	/**
	 * Send request method
	 */
	AppViewModel.prototype.onClickSendBtn = function () {
	  ajaxService(this.URL(), this.requests, this.onError, self.base);
	};
	
	/**
	 * Gets raw url data array
	 * @returns {*[]}
	 */
	AppViewModel.prototype.getUrl = function () {
	  return [
	    ko.unwrap(this.selectedMethodData),
	    this.apiKey,
			ko.unwrap(this.selectedParams)
	  ];
	};
	
	/**
	 * Gets deep prop
	 * @returns {*[]}
	 */
	Object.getProp = function(o, s) {
		if ((typeof o !== 'object' || o == null) && !s) {return;}
		s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
		s = s.replace(/^\./, '');           // strip a leading dot
		var a = s.split('.');
		for (var i = 0, n = a.length; i < n; ++i) {
			var k = a[i];
			if (o && k in o) {
				o = o[k];
			} else {
				return;
			}
		}
		return o;
	};
	
	
	function formDeepLinkingUrl() {
		var location = window.location;
		var category = ko.unwrap(self.selectedCategory);
		var method = ko.unwrap(self.selectedMethod);
		var params = ko.unwrap(self.selectedParams);
	
		var querys = [
			'apiCategory=' + encodeURI(category),
			'methodId='+ encodeURI(method)
		];
	
		params.map(function (param) {
			var value = ko.unwrap(param.value);
			var defaultValue = ko.unwrap(param.default);
			querys.push([
				param.name,
				'=',
				value !== '' ? value : defaultValue //todo: remove default from here when set up it in source like value by default
			].join(''));
			return param;
		});
	
		return [
			location.origin,
			location.pathname.replace(/\/$/gmi, ''),
			'?',
			querys.join('&')
		].join('');
	}
	
	function parseUrl() {
		var location = window.location.search;
		if (location) {
			var querys = location.replace(/^\?/g, '').split('&');
			var obj = {
				apiCategory: '',
				methodId: '',
				parameters: []
			};
	
			querys.map(function (e) {
				var a = decodeURI(e).split('=');
				var key = a[0];
				var val = a[1];
	
				if (key === 'apiCategory' || key === 'methodId') {
					obj[key] = val;
				} else {
					obj.parameters.push({
						name: key,
						value: val
					})
				}
			});
	
			var methodData = getMethodData(obj);
			var parameters = methodData.parameters;
	
			obj.parameters.map(function (obj) {
				parameters[obj.name].value = obj.value;
				return obj;
			});
			obj.parameters = parameters;
			return obj;
		}
		return {};
	}
	
	
	
	
	/**
	 * Activates knockout.js
	 */
	ko.applyBindings(new AppViewModel(base));
	
	/**
	 * exports global variable
	 */
	module.exports = base;


/***/ },
/* 2 */
/***/ function(module, exports) {

	/*!
	* Clamp.js 0.5.1
	*
	* Copyright 2011-2013, Joseph Schmitt http://joe.sh
	* Released under the WTFPL license
	* http://sam.zoy.org/wtfpl/
	*/
	(function(){window.$clamp=function(c,d){function s(a,b){n.getComputedStyle||(n.getComputedStyle=function(a,b){this.el=a;this.getPropertyValue=function(b){var c=/(\-([a-z]){1})/g;"float"==b&&(b="styleFloat");c.test(b)&&(b=b.replace(c,function(a,b,c){return c.toUpperCase()}));return a.currentStyle&&a.currentStyle[b]?a.currentStyle[b]:null};return this});return n.getComputedStyle(a,null).getPropertyValue(b)}function t(a){a=a||c.clientHeight;var b=u(c);return Math.max(Math.floor(a/b),0)}function x(a){return u(c)*
	a}function u(a){var b=s(a,"line-height");"normal"==b&&(b=1.2*parseInt(s(a,"font-size")));return parseInt(b)}function l(a){if(a.lastChild.children&&0<a.lastChild.children.length)return l(Array.prototype.slice.call(a.children).pop());if(a.lastChild&&a.lastChild.nodeValue&&""!=a.lastChild.nodeValue&&a.lastChild.nodeValue!=b.truncationChar)return a.lastChild;a.lastChild.parentNode.removeChild(a.lastChild);return l(c)}function p(a,d){if(d){var e=a.nodeValue.replace(b.truncationChar,"");f||(h=0<k.length?
	k.shift():"",f=e.split(h));1<f.length?(q=f.pop(),r(a,f.join(h))):f=null;m&&(a.nodeValue=a.nodeValue.replace(b.truncationChar,""),c.innerHTML=a.nodeValue+" "+m.innerHTML+b.truncationChar);if(f){if(c.clientHeight<=d)if(0<=k.length&&""!=h)r(a,f.join(h)+h+q),f=null;else return c.innerHTML}else""==h&&(r(a,""),a=l(c),k=b.splitOnChars.slice(0),h=k[0],q=f=null);if(b.animate)setTimeout(function(){p(a,d)},!0===b.animate?10:b.animate);else return p(a,d)}}function r(a,c){a.nodeValue=c+b.truncationChar}d=d||{};
	var n=window,b={clamp:d.clamp||2,useNativeClamp:"undefined"!=typeof d.useNativeClamp?d.useNativeClamp:!0,splitOnChars:d.splitOnChars||[".","-","\u2013","\u2014"," "],animate:d.animate||!1,truncationChar:d.truncationChar||"\u2026",truncationHTML:d.truncationHTML},e=c.style,y=c.innerHTML,z="undefined"!=typeof c.style.webkitLineClamp,g=b.clamp,v=g.indexOf&&(-1<g.indexOf("px")||-1<g.indexOf("em")),m;b.truncationHTML&&(m=document.createElement("span"),m.innerHTML=b.truncationHTML);var k=b.splitOnChars.slice(0),
	h=k[0],f,q;"auto"==g?g=t():v&&(g=t(parseInt(g)));var w;z&&b.useNativeClamp?(e.overflow="hidden",e.textOverflow="ellipsis",e.webkitBoxOrient="vertical",e.display="-webkit-box",e.webkitLineClamp=g,v&&(e.height=b.clamp+"px")):(e=x(g),e<=c.clientHeight&&(w=p(l(c),e)));return{original:y,clamped:w}}})();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (function () {
		__webpack_require__(4);
		__webpack_require__(5);
		__webpack_require__(6);
	}());


/***/ },
/* 4 */
/***/ function(module, exports) {

	ko.bindingHandlers.blockEllipsis = {
		init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
			$clamp(element, valueAccessor());
		}
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	 module.exports = ko.bindingHandlers.foreachprop = {
	
		transformObject: function (params) {
			var properties = [];
			var obj, sortFn = params.sortFn;
	
			obj = sortFn ? params.data: params;
			obj = ko.utils.unwrapObservable(obj);
	
			ko.utils.objectForEach(obj, function (key, value) {
				properties.push({
					key: key,
					value: value
				});
			});
	
			if (sortFn) {
				properties.sort(sortFn);
			}
	
			return properties;
		},
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			var properties = ko.pureComputed(function () {
				var obj = ko.utils.unwrapObservable(valueAccessor());
				return ko.bindingHandlers.foreachprop.transformObject(obj);
			});
			ko.applyBindingsToNode(element, {
				foreach: properties
			}, bindingContext);
			return {
				controlsDescendantBindings: true
			};
		}
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	var common = {
		container: 'body',
		trigger: 'hover',
		placement: 'bottom'
	};
	
	ko.bindingHandlers.popover = {
		update: function(element, valueAccessor) {
			var $element = $(element);
			var params = valueAccessor();
			var config = $.extend({}, common, params, {data: null});
	
			if (params.type === 'popover' && params.data) {
				var data = ko.unwrap(params.data);
				config.title = `Error ${data[0]}: ${data[1]}`;
				config.content = data[2];
				$element.popover(config);
				if (config.trigger === 'click') {
					var timer;
					$element.on('shown.bs.popover', function () {
						timer = setTimeout(function () {
							$element.trigger('click');
						}, 2000);
					});
					$element.on('hide.bs.popover', function () {
						clearInterval(timer);
					});
				}
			} else {
				config.delay = {
					"show": 1500,
					"hide": 100
				};
				config.title = params.title || config.title;
				$element.tooltip(config);
			}
		}
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	var base = {};
	var CONFIG_URL = '../../apidescription.xml';
	
	var parseData = function (xml) {
		var global = {};
		//get all APIs
		var resourcesEl = $(xml).find("resources").eq(0);
	
		// resource
		$(xml)
			.find("resource")
			.get()
			.map(function (res) {
				var resource = $(res);
				// method --------------------------------
				var methodElem = resource.find("method").eq(0);
	
				var method = {
					id : methodElem.attr("id"), // method id
					name : methodElem.attr("apigee:displayName") || methodElem.attr("id"), // method name
					method : methodElem.attr('name'), // GET or POST
					category : methodElem.find('[primary="true"]').text().trim(), // API name
					path: resource.attr('path'), // method URL
					base : resourcesEl.attr('base'), // method base link
					link : methodElem.find('doc').eq(0).attr('apigee:url'), // link to documentation
					description : methodElem.find('doc').eq(0).text().trim(), //method description
					parameters: {}
				};
	
				// params --------------------------------
				resource
					.find('param')
					.get()
					.map(function (par) {
						var param = $(par);
						var options = param.find('option');
						var isSelect = !!options.length;
	
						var parameter = {
							name: param.attr('name'),
							doc: param.first('doc').text().trim(),
							style: param.attr('style'),
							required: param.attr('required'),
							default: param.attr('default') === 'none' && isSelect ? '' : param.attr('default'),
							select: isSelect
						};
	
						if (isSelect) {
							parameter.options = options.get().map(function (option) {
								return {
									name: $(option).attr('value'),
									checked: $(option).attr('value') === parameter.default || $(option).attr('value') === 'none',
									link: false
								};
							});
						}
	
						method.parameters[parameter.name] = parameter;
					});
	
				/**
				 * Global obj composition
	       */
				// set category obj
				global[method.category] = global[method.category] || {};
	
				// set methods type obj
				global[method.category].ALL = global[method.category].ALL || {};
				global[method.category][method.method] = global[method.category][method.method] || {};
	
				// set method obj
				global[method.category].ALL[method.id] = method;
				global[method.category][method.method][method.id] = method;
			});
	
		return global;
	};
	
	//gets document from WADL configuration file
	var readFromWADL = function () {
	  $.ajax({
	    url: CONFIG_URL,
	    async : false,
	    dataType: ($.browser.msie) ? "text" : "xml",
	    success : function(response){
	      var xml;
	
	      if (typeof response == "string"){
	        xml = new ActiveXObject("Microsoft.XMLDOM");
	        xml.async = false;
	        xml.loadXML(response);
	      } else {
	        xml = response;
	      }
	
				base = parseData(xml);
	    },
	
	    error: function(XMLHttpRequest, textStatus, errorThrown){
	      alert('Data Could Not Be Loaded - '+ textStatus);
	    }
	  });
	};
	readFromWADL();
	module.exports = base;


/***/ },
/* 8 */
/***/ function(module, exports) {

	var apiKey = 'XiOrN2UC9yjuR4XF87sdMbRpaVNsP6W2' || apiKeyService.checkApiKeyCookie('tk-api-key') || apiKeyService.getApiExploreKey(); //API Key
	
	module.exports = {
	  name: 'apikey',
	  style: 'query',
	  value: ko.observable(apiKey)
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Ajax Service
	 * @param url
	 * @param method
	 * @param callback
	 */
	var ajaxService = function (url, method, callback) {
	  $.ajax({
	    type: method,
	    url: url,
	    async: true,
	    dataType: "json",
	    complete: callback
	  });
	};
	
	/**
	 * Filters and prepares params pairs
	 * @param arr
	 * @returns {boolean}
	 */
	var prepareUrl = function (arr) {
	  var replacement, url, domain, path, method, apiKey, params;
	
	  if (!arr && !arr.length) {
	    return false;
	  }
	  
	  domain = arr[0].base;
	  path = arr[0].path;
	  apiKey = arr[1];
	  params = arr[2].filter(function (item) {
	    return item.style === 'query';
	  });
	
	  // arr of template marks
	  replacement = path.match(/([^{]*?)\w(?=\})/gmi);
	
	  // arr of template params
	  var templatesArr = arr[2].filter(function (item) {
	    return item.style === 'template';
	  });
	
	  // replacement
	  replacement.forEach(function (val) {
	    var param = templatesArr.find(function (item) {
	      return item.name === val;
	    });
	    path = path.replace('{'+ param.name + '}', param.value() || param.default);
	  });
	
	  // adds apiKey param
	  if (!params[0] || params[0].name !== 'apikey') {
	    params.unshift(apiKey);
	  }
	
	  // prepares params part of url
	  params = params.map(function (item) {
	      return [item.name, item.value() || item.default].join('=');
	    }).join('&');
	
	  url = [domain, '/', path, '?', params].join('');
	
	  return encodeURI(url);
	};
	
	// sends request to get the second column
	var sendPrimaryRequest = function (arr, requests, onError, global) {
	  var url = prepareUrl(arr);
	
	  ajaxService(url, arr[0].method, function(res, msg) {
			var resObj = {
				req: url,
				index: requests().length
			};
	
			if (msg == 'error') {
				// notifying error modal
				onError.notifySubscribers(res, 'error');
				// error popover of request
				resObj.error = res;
			} else {
				global.lastResponse = resObj.res = {
					id: arr[0].id, // method id was used
					res: res.responseJSON // response
				};
			}
	
			// exporting data using observable
			requests.unshift(resObj);
	  });
	};
	
	
	module.exports = sendPrimaryRequest;


/***/ },
/* 10 */
/***/ function(module, exports) {

	var config = ko.observable();
	
	$.ajax({
		type: 'GET',
		url: [
			'http://',
			document.location.hostname,
			document.location.port && ':' + document.location.port,
			'/scripts/api-explorer/v2/config.json'
		].join(''),
		async: true,
		dataType: "json",
		complete: function(res, msg) {
			if (msg == 'error') {
				console.error('can\'t load config.json!');
			} else {
				config(res.responseJSON);
			}
		}
	});
	
	module.exports = config;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var jsonHighlight = __webpack_require__(12);
	var slider = __webpack_require__(15);
	var filter = __webpack_require__(16);
	var self;
	var colors = __webpack_require__(17).colors;
	
	function RequestsListViewModel(requests, selectedParams, sharePath) {
		this.url = selectedParams;
		self = this;
		this.colors = colors;
		this.sharePath = sharePath;
		this.requests = requests;
		this.isActiveTab = ko.observable(false);
		this.viewModel = ko.observableArray([]);
		this.clearBtnIsVisible = ko.computed(this._isVisible, this);
		this.requests.subscribe(this.updateModel, this);
	}
	
	/**
	 * Update Viewmodel of request list
	 * @param arr
	 */
	RequestsListViewModel.prototype.updateModel = function (arr) {
		var self = this;
		
		var newModel = ko.unwrap(this.requests)
			.map(function (obj) {
				var newObj = {
					color: self.colors[obj.index % self.colors.length],
					active: ko.observable(false),
					copiedForShare: ko.observable(false),
					copiedUrl: ko.observable(false),
					resHTML: ko.observable('')
				};
	
				// error popover
				if (obj.error) {
					var errorObj = obj.error;
					newObj.error = ko.observable([
						Object.getProp(errorObj, '.responseJSON.errors[0].status') || errorObj.status + '',
						Object.getProp(errorObj, '.responseJSON.errors[0].statusText') || '',
						Object.getProp(errorObj, '.responseJSON.errors[0].detail') || 'unnown',
						Object.getProp(errorObj, '.responseJSON') || {}
					])
				}
	
				return $.extend({}, obj, newObj);
			});
		slider.remove(self.viewModel().length);
		self.viewModel(newModel);
		setTimeout(function () {
			slider.set(self.viewModel().length);
			$('#show-details-0').trigger('click');
		}, 10);
	};
	
	/**
	 * get details
	 * @param data
	 */
	RequestsListViewModel.prototype.getMore = function (id, data) {
		var panelGroup = this.panelGroup;
		var panel = this;
		var currentSlider = $('#slider-' + panelGroup.sectionIndex);
		var component = $('<section data-bind="component: {name: \'panel-group\', params: params}"></section>');
		var curslick = currentSlider.slick('getSlick');
		
		// extending additional data (copy)
		var params = $.extend({}, panelGroup, {
			data: data,
			groupIndex: panelGroup.groupIndex + 1,
			_propTitle: typeof id === 'string' && id,
			config: panel.config
		});
	
		// apply component data bindings
		ko.applyBindings({
			params: params
		}, component[0]);
		
		// add slide with selected data
		currentSlider.slick('slickAdd', component);
		
		// remove outstanding slides
		for (var i = curslick.slideCount - 2; i > panelGroup.groupIndex; i--) {
			currentSlider.slick('slickRemove', i, false);
		}
		// move to next slide
		currentSlider.slick('slickNext');
	};
	
	/**
	 * Visibility flag for Clear btn
	 * @returns {boolean}
	 * @private
	 */
	RequestsListViewModel.prototype._isVisible = function () {
		return ko.utils.unwrapObservable(this.requests).length > 0;
	};
	
	/**
	 * Clear requeststs list handler
	 * @param vm
	 * @param event
	 */
	RequestsListViewModel.prototype.onClearRequests = function (vm, event) {
		this.requests([]);
	};
	
	/**
	 * Details toggle handler
	 * @param vm
	 * @param event
	 */
	RequestsListViewModel.prototype.getDetails = function (vm, event) {
		if (!this.resHTML().length) {
			jsonHighlight(this.resHTML, this.res.res);
		}
		this.active(!this.active());
	};
	
	/**
	 * Join string for id's
	 * @param s
	 * @param i
	 * @returns {string}
	 */
	RequestsListViewModel.prototype.getStr = function (s, i) {
		var str = s;
		var i1 = i ? i() : '';
		return [
			str,
			i1
		].join('-');
	};
	
	/**
	 * Get raw response data
	 * @param model {object}
	 * @returns {string}
	 */
	RequestsListViewModel.prototype.getRawData = function (model) {
		var content = Object.getProp(model, '.res.res') || ko.unwrap(model.error)[3] || {};
		var rawWindow = window.open("data:text/json," + encodeURI(JSON.stringify(content, null, 2)), '_blank');
		rawWindow.focus();
	};
	
	RequestsListViewModel.prototype.copyUrl = function (model, event) {
		var currentField = this;
		var element = event.currentTarget;
		self.clipboard = new Clipboard(element);
		self.clipboard.on('success', function onSuccessCopy(e) {
			console.info('Action:', e.action);
			console.info('Text:', e.text);
			console.info('Trigger:', e.trigger);
			$(element).hasClass('btn-share') ? currentField.copiedForShare(true) : currentField.copiedUrl(true);
			setTimeout(function () {
				$(element).hasClass('btn-share') ? currentField.copiedForShare(false) : currentField.copiedUrl(false);
			}, 500);
			e.clearSelection();
		})
			.on('error', function onErrorCopy(e) {
				console.error('Action:', e.action);
				console.error('Trigger:', e.trigger);
			});
	};
	
	RequestsListViewModel.prototype.removeHandler = function () {
		self.clipboard && self.clipboard.destroy();
		delete self.clipboard;
	};
	
	module.exports = RequestsListViewModel;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Worker = __webpack_require__(13); // Json-formatter worker
	
	module.exports = function (observable, code) {
		var animTime = 100;
		var worker = new Worker;
	
		worker.onmessage = function (event) {
			observable(event.data);
	
			$(document)
				.on('click touch', '.tm-code-container .expanded', function jsonCodeContainerExpanded(e) {
					e.preventDefault();
					e.stopPropagation();
					var $self = $(this);
					$self
						.parent()
						.find('>ul')
						.slideUp(animTime, function() {
							$self.addClass('collapsed');
						});
				})
				.on('click touch', '.tm-code-container .expanded.collapsed', function jsonCodeContainerCollapsed(e) {
					e.preventDefault();
					e.stopPropagation();
					var $self = $(this);
					$self
						.removeClass('collapsed')
						.parent()
						.find('>ul')
						.slideDown(animTime, function() {
							$self
								.removeClass('collapsed')
								.removeClass('hidden');
						});
				})
		};
		worker.onerror = function (event) {
			console.error(event);
		};
	
		worker.postMessage(code);
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		return __webpack_require__(14)("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId])\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\texports: {},\n/******/ \t\t\tid: moduleId,\n/******/ \t\t\tloaded: false\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.loaded = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(0);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ function(module, exports, __webpack_require__) {\n\n\t/**\r\n\t * Code format web-worker\r\n\t * @param event\r\n\t */\r\n\t// var highlightJson()\r\n\tvar highlightJson = __webpack_require__(1);\r\n\t\r\n\tonmessage = function(event) {\r\n\t  var code = event.data;\r\n\t  // importScripts('json-parse.js');\r\n\t  var result = highlightJson(code, {expanded: true});\r\n\t  // var result =JSON.stringify(code);\r\n\t  postMessage(result);\r\n\t};\r\n\n\n/***/ },\n/* 1 */\n/***/ function(module, exports) {\n\n\tvar prefix = 'tm-code';\r\n\t\r\n\tvar getExpanderClasses = function (expanded) {\r\n\t\tif (!expanded) {\r\n\t\t\treturn 'expanded collapsed hidden';\r\n\t\t}\r\n\t\treturn 'expanded';\r\n\t};\r\n\t\r\n\tvar encode = function (value) {\r\n\t\treturn ['<span>', value, '</span>'].join('');\r\n\t};\r\n\t\r\n\tvar createElement = function (key, value, type, expanderClasses) {\r\n\t\tvar klass = 'object',\r\n\t\t\topen = '{',\r\n\t\t\tclose = '}';\r\n\t\r\n\t\tif (Array.isArray(value)) {\r\n\t\t\tklass = 'array';\r\n\t\t\topen = '[';\r\n\t\t\tclose = ']';\r\n\t\t}\r\n\t\r\n\t\tif (value === null) {\r\n\t\t\treturn [\r\n\t\t\t\t'<li>',\r\n\t\t\t\t\t'<span class=\"key\">\"', encode(key), '\": </span>',\r\n\t\t\t\t\t'<span class=\"null\">\"', encode(value), '\"</span>',\r\n\t\t\t\t'</li>'\r\n\t\t\t].join('');\r\n\t\t}\r\n\t\r\n\t\tif (type == 'object') {\r\n\t\t\treturn [\r\n\t\t\t\t'<li>',\r\n\t\t\t\t\t'<span class=\"', expanderClasses, '\"></span>',\r\n\t\t\t\t\t'<span class=\"key\">\"', encode(key), '\": </span> ',\r\n\t\t\t\t\t'<span class=\"open\">', open, '</span> ',\r\n\t\t\t\t\t'<ul class=\"', klass, '\">',\r\n\t\t\t\t\t\tjson2html(value, expanderClasses),\r\n\t\t\t\t\t'</ul>',\r\n\t\t\t\t\t'<span class=\"close\">', close, '</span>',\r\n\t\t\t\t'</li>'\r\n\t\t\t].join('');\r\n\t\t}\r\n\t\r\n\t\tif (type == 'number' || type == 'boolean') {\r\n\t\t\treturn [\r\n\t\t\t\t'<li>',\r\n\t\t\t\t\t'<span class=\"key\">\"', encode(key), '\": </span>',\r\n\t\t\t\t\t'<span class=\"', type, '\">', encode(value), '</span>',\r\n\t\t\t\t'</li>'\r\n\t\t\t].join('');\r\n\t\t}\r\n\t\treturn [\r\n\t\t\t'<li>',\r\n\t\t\t\t'<span class=\"key\">\"', encode(key), '\": </span>',\r\n\t\t\t\t'<span class=\"', type, '\">\"', encode(value), '\"</span>',\r\n\t\t\t'</li>'\r\n\t\t].join('');\r\n\t};\r\n\t\r\n\tvar json2html = function (json, expanderClasses) {\r\n\t\tvar html = '';\r\n\t\tfor (var key in json) {\r\n\t\t\tif (!json.hasOwnProperty(key)) {\r\n\t\t\t\tcontinue;\r\n\t\t\t}\r\n\t\r\n\t\t\thtml = [html, createElement(key, json[key], typeof json[key], expanderClasses)].join('');\r\n\t\t}\r\n\t\treturn html;\r\n\t};\r\n\t\r\n\tvar getJsonViewer = function (data, options) {\r\n\t\ttry {\r\n\t\t\treturn [\r\n\t\t\t\t'<ul class=\"', prefix, '-container\">',\r\n\t\t\t\t\tjson2html([JSON.parse(data)], getExpanderClasses(options.expanded)),\r\n\t\t\t\t'</ul>'\r\n\t\t\t].join('');\r\n\t\t} catch (e) {\r\n\t\t\treturn [\r\n\t\t\t\t'<div class=\"', prefix, '-error\" >', e.toString(), ' </div>'\r\n\t\t\t].join('');\r\n\t\t}\r\n\t};\r\n\t\r\n\tmodule.exports = function(data, opt) {\r\n\t\tvar json = '';\r\n\t\tvar options = opt || {expanded: true};\r\n\t\tif (typeof data == 'string') {\r\n\t\t\tjson = data;\r\n\t\t} else if (typeof data == 'object') {\r\n\t\t\tjson = JSON.stringify(data)\r\n\t\t}\r\n\t\treturn getJsonViewer(json, options);\r\n\t};\r\n\n\n/***/ }\n/******/ ]);\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDcxYjEwZDQ0Y2E3MjgwZTExNGEiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvaGlnaGxpZ2h0SnNvbi53b3JrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvanNvbi1wYXJzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUNBQW9DLGVBQWU7QUFDbkQ7QUFDQTtBQUNBOzs7Ozs7O0FDYkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBVztBQUNYLGFBQVk7O0FBRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaGlnaGxpZ2h0SnNvbi53b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDQ3MWIxMGQ0NGNhNzI4MGUxMTRhXG4gKiovIiwiLyoqXHJcbiAqIENvZGUgZm9ybWF0IHdlYi13b3JrZXJcclxuICogQHBhcmFtIGV2ZW50XHJcbiAqL1xyXG4vLyB2YXIgaGlnaGxpZ2h0SnNvbigpXHJcbnZhciBoaWdobGlnaHRKc29uID0gcmVxdWlyZSgnLi9qc29uLXBhcnNlJyk7XHJcblxyXG5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xyXG4gIHZhciBjb2RlID0gZXZlbnQuZGF0YTtcclxuICAvLyBpbXBvcnRTY3JpcHRzKCdqc29uLXBhcnNlLmpzJyk7XHJcbiAgdmFyIHJlc3VsdCA9IGhpZ2hsaWdodEpzb24oY29kZSwge2V4cGFuZGVkOiB0cnVlfSk7XHJcbiAgLy8gdmFyIHJlc3VsdCA9SlNPTi5zdHJpbmdpZnkoY29kZSk7XHJcbiAgcG9zdE1lc3NhZ2UocmVzdWx0KTtcclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2hpZ2hsaWdodEpzb24ud29ya2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHByZWZpeCA9ICd0bS1jb2RlJztcclxuXHJcbnZhciBnZXRFeHBhbmRlckNsYXNzZXMgPSBmdW5jdGlvbiAoZXhwYW5kZWQpIHtcclxuXHRpZiAoIWV4cGFuZGVkKSB7XHJcblx0XHRyZXR1cm4gJ2V4cGFuZGVkIGNvbGxhcHNlZCBoaWRkZW4nO1xyXG5cdH1cclxuXHRyZXR1cm4gJ2V4cGFuZGVkJztcclxufTtcclxuXHJcbnZhciBlbmNvZGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRyZXR1cm4gWyc8c3Bhbj4nLCB2YWx1ZSwgJzwvc3Bhbj4nXS5qb2luKCcnKTtcclxufTtcclxuXHJcbnZhciBjcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUsIHR5cGUsIGV4cGFuZGVyQ2xhc3Nlcykge1xyXG5cdHZhciBrbGFzcyA9ICdvYmplY3QnLFxyXG5cdFx0b3BlbiA9ICd7JyxcclxuXHRcdGNsb3NlID0gJ30nO1xyXG5cclxuXHRpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuXHRcdGtsYXNzID0gJ2FycmF5JztcclxuXHRcdG9wZW4gPSAnWyc7XHJcblx0XHRjbG9zZSA9ICddJztcclxuXHR9XHJcblxyXG5cdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG5cdFx0cmV0dXJuIFtcclxuXHRcdFx0JzxsaT4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cImtleVwiPlwiJywgZW5jb2RlKGtleSksICdcIjogPC9zcGFuPicsXHJcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwibnVsbFwiPlwiJywgZW5jb2RlKHZhbHVlKSwgJ1wiPC9zcGFuPicsXHJcblx0XHRcdCc8L2xpPidcclxuXHRcdF0uam9pbignJyk7XHJcblx0fVxyXG5cclxuXHRpZiAodHlwZSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0cmV0dXJuIFtcclxuXHRcdFx0JzxsaT4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cIicsIGV4cGFuZGVyQ2xhc3NlcywgJ1wiPjwvc3Bhbj4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cImtleVwiPlwiJywgZW5jb2RlKGtleSksICdcIjogPC9zcGFuPiAnLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cIm9wZW5cIj4nLCBvcGVuLCAnPC9zcGFuPiAnLFxyXG5cdFx0XHRcdCc8dWwgY2xhc3M9XCInLCBrbGFzcywgJ1wiPicsXHJcblx0XHRcdFx0XHRqc29uMmh0bWwodmFsdWUsIGV4cGFuZGVyQ2xhc3NlcyksXHJcblx0XHRcdFx0JzwvdWw+JyxcclxuXHRcdFx0XHQnPHNwYW4gY2xhc3M9XCJjbG9zZVwiPicsIGNsb3NlLCAnPC9zcGFuPicsXHJcblx0XHRcdCc8L2xpPidcclxuXHRcdF0uam9pbignJyk7XHJcblx0fVxyXG5cclxuXHRpZiAodHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdib29sZWFuJykge1xyXG5cdFx0cmV0dXJuIFtcclxuXHRcdFx0JzxsaT4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cImtleVwiPlwiJywgZW5jb2RlKGtleSksICdcIjogPC9zcGFuPicsXHJcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwiJywgdHlwZSwgJ1wiPicsIGVuY29kZSh2YWx1ZSksICc8L3NwYW4+JyxcclxuXHRcdFx0JzwvbGk+J1xyXG5cdFx0XS5qb2luKCcnKTtcclxuXHR9XHJcblx0cmV0dXJuIFtcclxuXHRcdCc8bGk+JyxcclxuXHRcdFx0JzxzcGFuIGNsYXNzPVwia2V5XCI+XCInLCBlbmNvZGUoa2V5KSwgJ1wiOiA8L3NwYW4+JyxcclxuXHRcdFx0JzxzcGFuIGNsYXNzPVwiJywgdHlwZSwgJ1wiPlwiJywgZW5jb2RlKHZhbHVlKSwgJ1wiPC9zcGFuPicsXHJcblx0XHQnPC9saT4nXHJcblx0XS5qb2luKCcnKTtcclxufTtcclxuXHJcbnZhciBqc29uMmh0bWwgPSBmdW5jdGlvbiAoanNvbiwgZXhwYW5kZXJDbGFzc2VzKSB7XHJcblx0dmFyIGh0bWwgPSAnJztcclxuXHRmb3IgKHZhciBrZXkgaW4ganNvbikge1xyXG5cdFx0aWYgKCFqc29uLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuXHRcdFx0Y29udGludWU7XHJcblx0XHR9XHJcblxyXG5cdFx0aHRtbCA9IFtodG1sLCBjcmVhdGVFbGVtZW50KGtleSwganNvbltrZXldLCB0eXBlb2YganNvbltrZXldLCBleHBhbmRlckNsYXNzZXMpXS5qb2luKCcnKTtcclxuXHR9XHJcblx0cmV0dXJuIGh0bWw7XHJcbn07XHJcblxyXG52YXIgZ2V0SnNvblZpZXdlciA9IGZ1bmN0aW9uIChkYXRhLCBvcHRpb25zKSB7XHJcblx0dHJ5IHtcclxuXHRcdHJldHVybiBbXHJcblx0XHRcdCc8dWwgY2xhc3M9XCInLCBwcmVmaXgsICctY29udGFpbmVyXCI+JyxcclxuXHRcdFx0XHRqc29uMmh0bWwoW0pTT04ucGFyc2UoZGF0YSldLCBnZXRFeHBhbmRlckNsYXNzZXMob3B0aW9ucy5leHBhbmRlZCkpLFxyXG5cdFx0XHQnPC91bD4nXHJcblx0XHRdLmpvaW4oJycpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJldHVybiBbXHJcblx0XHRcdCc8ZGl2IGNsYXNzPVwiJywgcHJlZml4LCAnLWVycm9yXCIgPicsIGUudG9TdHJpbmcoKSwgJyA8L2Rpdj4nXHJcblx0XHRdLmpvaW4oJycpO1xyXG5cdH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSwgb3B0KSB7XHJcblx0dmFyIGpzb24gPSAnJztcclxuXHR2YXIgb3B0aW9ucyA9IG9wdCB8fCB7ZXhwYW5kZWQ6IHRydWV9O1xyXG5cdGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykge1xyXG5cdFx0anNvbiA9IGRhdGE7XHJcblx0fSBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0anNvbiA9IEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcblx0fVxyXG5cdHJldHVybiBnZXRKc29uVmlld2VyKGpzb24sIG9wdGlvbnMpO1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvanNvbi1wYXJzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=", __webpack_require__.p + "highlightJson.worker.js");
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	// http://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string
	
	var URL = window.URL || window.webkitURL;
	module.exports = function(content, url) {
		try {
			try {
				var blob;
				try { // BlobBuilder = Deprecated, but widely implemented
					var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
					blob = new BlobBuilder();
					blob.append(content);
					blob = blob.getBlob();
				} catch(e) { // The proposed API
					blob = new Blob([content]);
				}
				return new Worker(URL.createObjectURL(blob));
			} catch(e) {
				return new Worker('data:application/javascript,' + encodeURIComponent(content));
			}
		} catch(e) {
			return new Worker(url);
		}
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	function slick(times) {
		"use strict";
		var selector = '#slider-';
		
		for (var i = 0; i < times; i++) {
			$(selector + i).length && $(selector + i).slick({
				dots: false,
				infinite: false,
				speed: 300,
				slidesToShow: 3,
				slidesToScroll: 1,
				variableWidth: true,
				autoplay: false,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							variableWidth: true,
							slidesToShow: 2,
							slidesToScroll: 1,
							infinite: false,
							dots: false
						}
					},
					{
						breakpoint: 800,
						settings: {
							variableWidth: true,
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		}
	}
	
	function unslick(times) {
		"use strict";
	
		for (var i = 0; i < times; i++) {
			var selector = '#slider-' + i;
			$(selector) && $(selector).length && $(selector).slick('unslick');
		}
		console.info('cleared');
	}
	
	module.exports = {
		set: slick,
		remove: unslick
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = {
		"discovery.v2.events.get": {
			"events": {
				"object": {
					"_CONFIG": {
						"title": "Event",
						"copyBtn": {
							"name": true
						},
						"request": "http://www.google.com",
						"index": 0
					}
				},
				"images": {
					"object": {
						"_CONFIG": {
							"title": "image"
						}
					},
					"_CONFIG": {
						"index": 1,
						"collapsed": true
					}
				},
				"sales": {
					"_CONFIG": {
						"index": 2
					}
				},
				"venues": {
					"object": {
						"_CONFIG": {
							"title": "venue",
							"index": 0
						}
					},
					"city": {
						"_CONFIG": {
							"index": 2
						}
					},
					"state": {
						"_CONFIG": {
							"index": 1
						}
					},
					"country": {
						"_CONFIG": {
							"index": 1
						}
					},
					"address": {
						"_CONFIG": {
							"index": 3
						}
					},
					"location": {
						"_CONFIG": {
							"index": 4
						}
					},
					"_CONFIG": {
						"index": 3
					}
				},
				"dates": {
					"access": {
						"_CONFIG": {
							"index": 3,
							"copyBtn": {},
							"collapsed": true
						}
					},
					"timezone": {
						"_CONFIG": {
							"index": 0
						}
					},
					"start": {
						"_CONFIG": {
							"index": 1,
							"copyBtn": {
								"dateTime": true
							},
							"collapsed": true
						}
					},
					"status": {
						"_CONFIG": {
							"index": 3,
							"collapsed": true
						}
					},
					"end": {
						"_CONFIG": {
							"index": 2,
							"copyBtn": {
								"dateTime": true
							},
							"collapsed": true
						}
					},
					"_CONFIG": {
						"index": 4,
						"allInside": true
					}
				},
				"_CONFIG": {
					"collapsed": false,
					"index": 0
				}
			},
			"page": {
				"_CONFIG": {
					"index": 1,
					"collapsed": true
				}
			},
			"_CONFIG": {
				"method": "discovery.v2.events.get"
			}
		},
		"discovery.v2.attractions.get": {
			"attractions": {
				"object": {
					"_CONFIG": {
						"index": 0
					}
				},
				"images": {
					"_CONFIG": {
						"index": 2
					}
				},
				"classifications": {
					"_CONFIG": {
						"index": 1
					}
				},
				"_CONFIG": {
					"index": 0
				}
			},
			"page": {
				"_CONFIG": {
					"index": 1
				}
			},
			"_CONFIG": {
				"methodConfig": true
			}
		},
		"_GLOBAL_CONFIG": {
			"copyBtn": {
				"id": true
			},
			"deprecated": [
				"_links"
			],
			"unwrapp": [
				"_embedded"
			]
		}
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	var NUM = 12;
	var PREFIX = 'color-';
	
	var colors = getColors(NUM, PREFIX);
	
	function getColors(num, classPrefix) {
		var colors = new Array(num);
	
		for (var i = 0; i < colors.length; i++) {
			colors[i] = classPrefix + (i + 1);
		}
		return colors;
	}
	
	function getRandomColor(color) {
		var randomNumber;
		do {
			randomNumber = getRandomInt(1, colors.length);
		} while (PREFIX + randomNumber === color);
	
		return PREFIX + randomNumber;
	}
	
	/**
	 * Returns a random integer between min (inclusive) and max (inclusive)
	 * Using Math.round() will give you a non-uniform distribution!
	 */
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	module.exports = {
		colors: colors,
		getRandomColor: getRandomColor
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (function () {
		__webpack_require__(19);
		__webpack_require__(20);
		__webpack_require__(21);
		__webpack_require__(22);
		__webpack_require__(23);
	
		__webpack_require__(24);
	
		__webpack_require__(25);
	
		__webpack_require__(26);
		__webpack_require__(27);
		__webpack_require__(28);
		__webpack_require__(29);
		__webpack_require__(30);
		__webpack_require__(31);
	}());


/***/ },
/* 19 */
/***/ function(module, exports) {

	var self;
	
	function AboutMethod(params) {
		self = this;
		var method = ko.unwrap(params.selectedMethodData);
		this.documentationLink = ko.observable(method.link);
		this.name = ko.observable(method.name);
		this.description = ko.observable(method.description);
	
		// on model change
		params.selectedMethodData.subscribe(function (val) {
			this.documentationLink(val.link);
			this.name(val.name);
			this.description(val.description);
		}, this);
	
		// methods
		this.togglePopUp  = ko.observable(false);
	}
	
	AboutMethod.prototype.onAboutClick = function (model) {
		return model.togglePopUp(!model.togglePopUp());
	};
	
	module.exports = ko.components.register('about-method', {
		viewModel: AboutMethod,
		template:`
			<section data-bind="css: {active: togglePopUp}" class="api-exp-about">
				<div class="api-exp-about-wrapper">
					<button data-bind="click: onAboutClick" class="api-exp-about__button devices-button"></button>
					<a data-bind="attr: {href: documentationLink}" href="#" class="api-exp-about__button" target="_blank"></a>
					<article class="api-exp-about__content">
						<h5 data-bind="text: name" class="api-exp-about__title">About API and Method:</h5>
						<section class="api-exp-about__description">
							<p data-bind="text: description"></p>
							<p>
								<a data-bind="attr: {href: documentationLink}" target="_blank" href="#" class="api-exp-about__description-link">Read mode</a>
							</p>
						</section>
					</article>
					<div data-bind="click: onAboutClick" class="api-exp-about-layer"></div>
				</div>
			</section>
	`});


/***/ },
/* 20 */
/***/ function(module, exports) {

	var self;
	
	function CategoryMenu(params) {
		self = this;
	
		this.selectedCategory = params.selectedCategory;
		var initCategory = ko.unwrap(params.selectedCategory);
		this.categories = ko.observableArray(Object.keys(params.data).map(function (item, index) {
			var checked = initCategory ? item === initCategory: !index;
			// initial load
			checked && self.selectedCategory(item);
			return {
				checked: ko.observable(checked),
				name: item,
				link: false
			}
		}));
	}
	
	CategoryMenu.prototype.selectCategory = function (category) {
		var categoryName = category.name;
		self.selectedCategory(categoryName);
		checkActive(self.categories, categoryName);
	};
	
	module.exports = ko.components.register('category-menu', {
		viewModel: CategoryMenu,
		template:`
			<aside class="api-exp-side-menu">
				<ul data-bind="foreach: categories" class="api-exp-side-menu__container nav nav-pills nav-stacked visible-lg-block">
					<li data-bind="css: {active: checked}" role="presentation" class="api-exp-side-menu__item">
						<a data-bind="click: $parent.selectCategory, text: name" href="#" class="api-exp-side-menu__link"></a>
					</li>
				</ul>
				<!--select-->
				<div class="api-exp-side-menu__select hidden-lg">
					<!-- ko template: { nodes: $componentTemplateNodes, data: $component } --><!-- /ko -->
				</div>
			</aside>
	`});
	
	function checkActive(koArr, activeElem) {
		if (!koArr && !activeElem) {return false;}
	
		koArr(koArr().map(function (obj) {
			if (obj.name === activeElem) {
				obj.checked(true);
			} else {
				obj.checked(false);
			}
			return obj;
		}));
	}


/***/ },
/* 21 */
/***/ function(module, exports) {

	var self;
	
	function MethodsFilter(params) {
		self = this;
		this.selectedCategory = params.selectedCategory;
		this.data = params.data;
		this.selectedMethodType = params.selectedMethodType;
		this.selectedMethod = params.selectedMethod;
		this.selectedMethodName = ko.observable('');
		this.methodsViewModel = ko.observableArray([]);
		// setSubscribtions
		this.init()
	}
	
	/**
	 * Initialization phase
	 */
	MethodsFilter.prototype.init = function () {
		this.updateMethodsModel(ko.unwrap(this.selectedMethodType));
	
		//on change
		this.selectedMethodType.subscribe(function (val) {
			this.updateMethodsModel(val);
		}, this)
	};
	
	/**
	 * Filters transclusion dom nodes
	 * @param param {array} $componentTemplateNodes
	 * @param index {number} index of element
	 * @returns {array} dom nodes array for insertion
	 */
	MethodsFilter.prototype.filterTransclusion = function (param, index) {
		var text = param.find(function (item) {
			return item.nodeName === '#text';
		});
		var el = param.filter(function (item) {
			return item.nodeName !== '#text' && item.nodeName !== '#comment';
		})[index];
		return [text, el, text];
	};
	
	/**
	 * Updates VM for methods select
	 * @param methodType
	 */
	MethodsFilter.prototype.updateMethodsModel = function (methodType) {
		var obj = this.data[ko.unwrap(self.selectedCategory)][methodType]|| {},
			arr = [],
			selectedMethod = ko.unwrap(self.selectedMethod),
			count = 0;
	
		for (var i in obj) {
			if (!obj.hasOwnProperty(i)) { continue; }
			var property = obj[i];
	
			var vmMethod = $.extend({}, {
				id: property.id,
				name: property.name,
				link: property.link,
				checked: ko.observable( selectedMethod ? selectedMethod === property.id : !count )
			});
	
			if (selectedMethod === property.id) {
				self.selectedMethodName(property.name);
			}
	
			arr.push(vmMethod);
	
			// set global observable
			!selectedMethod && !count && this.selectedMethod(property.id);
	
			count++;
		}
	
		this.methodsViewModel(arr);
	};
	
	/**
	 * On select handler for methods select
	 * @param item
	 */
	MethodsFilter.prototype.onSelectMethod = function (item) {
		self.selectedMethod(item.id);
	};
	
	module.exports = ko.components.register('methods-filter', {
		viewModel: MethodsFilter,
		template:`
			<section  class="api-exp-main-filter">
				<section class="api-exp-filter">
					<section class="api-exp-methods clearfix">
						<label class="api-exp-methods__label">Methods</label>
		
						<!--radios-->
						<!-- ko template: { nodes: filterTransclusion($componentTemplateNodes, 0), data: $component } --><!-- /ko -->
						
						<!--select-->
						<div class="api-exp-methods__select">
							<!-- ko template: { nodes: filterTransclusion($componentTemplateNodes, 1), data: $component }--><!--/ko-->
						</div>
					</section>
				</section>
			</section>
	`});


/***/ },
/* 22 */
/***/ function(module, exports) {

	var self;
	
	function RadioFilter(params) {
		self = this;
		var selectedCategory = ko.unwrap(params.selectedCategory);
		var data = params.data;
		this.selectedMethodType = params.selectedMethodType;
		this.RADIO_ID = 'api-exp-';
	
		this.radiosModel = ko.observableArray([]);
		this.updateRadiosModel(data[selectedCategory]);
	
		params.selectedCategory.subscribe(function (val) {
			this.updateRadiosModel(data[val]);
		}, this);
	}
	
	RadioFilter.prototype.updateRadiosModel = function (param) {
		var obj = param || {},
			arr = [];
	
		for (var i in obj) {
			if (!obj.hasOwnProperty(i)) { continue; }
			var item = {
				checked: ko.observable(i === 'ALL'),
				name: i
			};
			arr.push(item);
			// initial notify for all subscribers
			i === 'ALL' && this.selectedMethodType.notifySubscribers(i);
		}
	
		arr = arr.sort(compareMethods);
		this.radiosModel(arr);
		return arr;
	};
	
	/**
	 * Onchange handler for Radio buttons
	 * @param item
	 */
	RadioFilter.prototype.onchangeRadios = function (item) {
		var radiosModel = ko.unwrap(self.radiosModel).map(function (obj) {
			if (obj.name === item.name) {
				obj.checked(true);
				self.selectedMethodType(obj.name);
				console.log(ko.unwrap(self.selectedMethodType));
			} else {
				obj.checked(false);
			}
			return obj;
		});
		self.radiosModel(radiosModel);
	};
	
	/**
	 * Uniq id for radio btn
	 * @param name
	 * @returns {string}
	 */
	RadioFilter.prototype.getInputId = function (name) {
		return self.RADIO_ID + name;
	};
	
	/**
	 * Sort function for methods aray
	 * @param f
	 * @param s
	 * @returns {number}
	 */
	function compareMethods(f,s) {
		var a = f.name.toUpperCase();
		var b = s.name.toUpperCase();
	
		if (a === b) {return 0;}
		if (a === 'ALL' ||
			(a === 'GET' && (b === 'POST' || b === 'PUT' || b === 'DELETE')) ||
			(a === 'POST' && (b === 'PUT' || b === 'DELETE')) ||
			(a === 'PUT' && b === 'DELETE')) {
			return -1;
		}
		return 1;
	}
	
	
	module.exports = ko.components.register('radio-filter', {
		viewModel: RadioFilter,
		template:`
			<!--radios-->
			<section data-bind="foreach: radiosModel" class="api-exp-methods__radio-buttons radio-buttons clearfix">
				<div data-bind="css: {active: checked}" class="api-exp-method">
					<input data-bind="attr: { id: $component.getInputId(name), checked: checked }, event: {change: $component.onchangeRadios}"
									class="api-exp-content-method__radio"
									type="radio"
									name="api-exp-methods">
					<label data-bind="text: name, attr: {for: $component.getInputId(name)}" class="radio-inline api-exp-method__label"></label>
				</div>
			</section>
	`});


/***/ },
/* 23 */
/***/ function(module, exports) {

	var self;
	
	function ParamsFilter(params) {
		self = this;
	
		this.animationSpeed = 200;
	
		// observables
		this.selectedMethod = params.selectedMethod;
		this.selectedParams = params.selectedParams;
		this.selectedMethodData = params.selectedMethodData;
	
		this.isHidden = ko.observable(true);
		this.paramInFocus = ko.observable({});
		this.paramsModel = ko.observableArray([]);
	
		// computed
		this.isDirty = ko.computed(this.checkDirty, this);
	
		// setSubscribtions
		this.init();
	}
	
	/**
	 * Initialization phase
	 */
	ParamsFilter.prototype.init = function () {
		this.updateViewModel();
		this.selectedMethod.subscribe(this.updateViewModel, this);
	};
	
	/**
	 * Initial build of Select Model
	 */
	ParamsFilter.prototype.updateViewModel = function () {
		// console.info('updateViewModel');
		var obj = ko.unwrap(self.selectedMethodData).parameters || {},
			arr = [];
	
		for (var i in obj) {
			if (!obj.hasOwnProperty(i)) {continue;}
	
			// copies all values from model to view-model
			var vmParam = $.extend({}, obj[i]);
	
			vmParam.value = ko.observable(vmParam.value || (vmParam.select && vmParam.default) || '');
			//add observable for selected options
			if (vmParam.select) {
				vmParam.options = ko.observableArray(obj[i].options.map(function (item) {
					var obj = $.extend({}, item);
					obj.checked = ko.observable(item.checked);
					return obj;
				}))
			}
	
			// 'dirty' flag watcher for current field
			vmParam.isDirty = ko.pureComputed(function () {
				if (this.select) {
					return this.value() !== this.default && this.value() !== 'none';
				}
				return !!(this.value().toString()).trim().length;
			}, vmParam);
	
			// add calendar btn for current field
			vmParam.hasCalendar = i.search(/(date|time)/gmi) != -1;
	
			// add pop-up btn for current field
			vmParam.hasPopUp = i.search(/(attractionId|venueId)/gmi) != -1;
	
			arr.push(vmParam);
		}
	
		// prepare output for request
		this.paramsModel(arr);
		this.paramInFocus(this.paramsModel()[0]);
		this.prepareUrlPairs(arr, this.selectedParams);
		return arr;
	};
	
	/**
	 * Dirty params form observable method
	 * @returns {boolean}
	 */
	ParamsFilter.prototype.checkDirty = function () {
		// console.info('checkDirty');
		this.prepareUrlPairs(this.paramsModel(), this.selectedParams);
		var dirty = this.paramsModel().filter(function (item) {
			return item.isDirty() === true;
		});
		return dirty.length > 0;
	};
	
	/**
	 * Enter key handler
	 * @param model
	 * @param event
	 */
	ParamsFilter.prototype.onEnterKeyDown = function (model, event) {
		if (event.keyCode === 13) {
			$('#api-exp-get-btn').trigger('click');
		} else {
			return true;
		}
	};
	
	/**
	 * Slide toggle for params container method
	 * @param viewModel
	 * @param event
	 */
	ParamsFilter.prototype.slideToggle = function (viewModel, event) {
		$(event.currentTarget)
			.parents('.js-slide-control')
			.find('.js-slide-wrapper')
			.slideToggle(viewModel.animationSpeed, function () {
				viewModel.isHidden(!viewModel.isHidden());
			});
	};
	
	/**
	 * Maches focused param
	 * @param item
	 */
	ParamsFilter.prototype.onFocus = function (item) {
		self.paramInFocus(item);
	};
	
	/**
	 * Filters params by defined value
	 * @param arr
	 * @param koObs
	 * @returns {boolean}
	 */
	ParamsFilter.prototype.prepareUrlPairs = function (arr, koObs) {
		// console.info('prepareUrlPairs');
		if (!arr || !koObs) {return false;}
	
		return koObs(arr.filter(function (item) {
			return (item.value() && item.value() !== 'none' || item.default);
		}));
	};
	
	/**
	 * On select value handler for params select
	 * @param param {object} parameter view-model
	 * @param option {object} option view-model
	 */
	ParamsFilter.prototype.onSelectParamValue = function (param, option) {
		// console.info('onSelectParamValue');
		// param.options(options);
		param.value(option.name);
	};
	
	/**
	 * Params clear button handler
	 * @param vm {object} view model
	 * @param e {object} event
	 */
	ParamsFilter.prototype.onParamsClear = function (vm, e) {
		// console.info('updateViewModel');
		var arr = ko.unwrap(self.paramsModel);
	
		self.paramsModel(arr.map(function (param) {
			param.value(param.select && param.default || '');
	
			if (param.select) {
				param.options(ko.unwrap(param.options).map(function (option, index) {
					option.checked(!index);
					return option;
				}));
			}
			return param;
		}));
	
		// prepare output for request
		this.paramInFocus(this.paramsModel()[0]);
		console.log(this.selectedParams());
		this.prepareUrlPairs(arr, this.selectedParams);
	};
	
	module.exports = ko.components.register('params-filter', {
		viewModel: ParamsFilter,
		template:`
			<section data-bind="css: {closed: isHidden, dirty: isDirty}" class="api-exp-params js-slide-control">
			
				<section class="api-exp-params-headline">
					<button data-bind="click: slideToggle" class="btn shevron-up toggle-btn btn-icon" type="button">Parameters</button>
					<div class="api-exp-params-headline-edit">
						<button class="btn api-exp-params-headline__btn api-exp-params-headline__btn-copy">&nbsp;</button>
						<button data-bind="click: onParamsClear" class="btn api-exp-params-headline__btn api-exp-params-headline__btn-clear">&nbsp;</button>
					</div>
				</section>
				
				<div class="api-exp-params-wrapper clearfix js-slide-wrapper">
					<!--about-->
					<section class="api-exp-about visible-lg-block">
						<div class="api-exp-about-wrapper">
							<span class="api-exp-about__button"></span>
							<article class="api-exp-about__content">
								<h5 data-bind="text: paramInFocus().name" class="api-exp-about__title">About API and Method:</h5>
								<section class="api-exp-about__description">
									<p data-bind="html: paramInFocus().doc"></p>
								</section>
							</article>
						</div>
					</section>
					
					<!--params filter-->
					<section class="api-exp-params-filter">
						<section data-bind="foreach: paramsModel" class="api-exp-params-filter-fields">
							<!--select-->
							
							<!-- ko if: select -->
								<div class="api-exp-params-filter__field">
									<custom-select params="
										data: $data,
										options: options,
										onselect: $component.onSelectParamValue.bind($data, $data),
										focus: $component.onFocus,
										selected: value">
									</custom-select>
								</div>
							<!-- /ko -->
							
							<!-- ko ifnot: select -->
								<div data-bind="css: {'dirty': isDirty, calendar: hasCalendar, popup: hasPopUp}" class="api-exp-params-filter__field">
									<input data-bind="textInput: value, event: {focus: $component.onFocus, keydown: $component.onEnterKeyDown}, attr: {id: 'api-exp-param_' + name}" type="text" class="form-control">
									<span data-bind="text: name" class="api-exp-params-filter__placeholder"></span>
									<button class="api-exp-params-filter__button">&nbsp;</button>
								</div>
							<!-- /ko -->
							
						</section>
					</section><!--params filter-->
				</div>
			</section><!--parameters-->
	`});


/***/ },
/* 24 */
/***/ function(module, exports) {

	var self;
	
	function CustomSelect(params) {
		var DEFAULT_SELECTED = ko.unwrap(params.options)[0].name;
	  self = this;
	
		this.curentSelectData = params.data || null;
		this.onFocus = params.focus || null;
	
		this.onselectMethod = params.onselect;
	
		this.animationSpeed = params.animationSpeed || 200;
		this.options = params.options;
		this.value = ko.unwrap(params.selected) || DEFAULT_SELECTED;
		this.selectedOption = ko.observable(mapForChecked.call(this, ko.unwrap(this.options), this.value));
	
		setSubscribtions.call(this, params);
	}
	
	function setSubscribtions(params) {
		// on select map for checked
		this.selectedOption.subscribe(function (value) {
			mapForChecked(ko.unwrap(this.options), value.name);
			this.onselectMethod(value);
		},this);
	
		// quantity of options check
		this.isOneOption = ko.pureComputed(function () {
			return ko.unwrap(this.options).length < 2; // more than one option
		}, this);
	}
	
	function mapForChecked(options, name) {
		var selectedOption;
		options.map(function (option) {
			option.checked(option.name === name);
			if (option.name === name) {selectedOption = option}
		});
		return selectedOption;
	}
	
	CustomSelect.prototype.slideToggle = function(item, event) {
		this.onFocus && this.onFocus(this.curentSelectData);
		if (ko.unwrap(this.isOneOption)) {return false}
		var el = findElement(event);
		el.wrapper.slideToggle(this.animationSpeed);
		el.layer.toggleClass('hidden');
	};
	
	
	CustomSelect.prototype.onSelect = function (item, event) {
		mapForChecked(ko.unwrap(this.options), item.name);
		this.selectedOption(item);
		this.onselectMethod(item);
		this.slideToggle(item, event);
	};
	
	function findElement(event) {
		var parent = $(event.currentTarget).parents('.js-custom-select');
		return {
			wrapper: parent.find('.js-custom-select-wrapper'),
			layer: parent.find('.js-custom-select-layer')
		}
	}
	
	module.exports = ko.components.register('custom-select', {
	  viewModel: CustomSelect,
	  template: `
		<div class="api-exp-custom-select js-custom-select">
			<div class="api-exp-custom-select-wrapper">
				<select class="api-exp-custom-select__field" name="api-exp-method" data-bind="options: options, optionsText: 'name', value: selectedOption"></select>
					<span class="api-exp-custom-select__placeholder">
					<input type="text" readonly="" data-bind="click: slideToggle, value: selectedOption().name, attr: {disabled: isOneOption}">
					<b class="api-exp-custom-select__chevron" data-bind="css: {hidden: isOneOption}">&nbsp;</b>
				</span>
				<ul data-bind="foreach: options" class="api-exp-custom-select__list js-custom-select-wrapper">
					<li data-bind="css: {'active': checked}" class="api-exp-custom-select__item">
						<button class="api-exp-custom-select__item-label"
										data-bind="click: $component.onSelect.bind($component),
																text: name,
																css: {'active': checked},
																attr: {'data-value': name}"></button>
						<a class="api-exp-custom-select__item-link" target="_blank" data-bind="attr: {href: link}, css: {'hidden': !link}">&nbsp;</a>
					</li>
				</ul>
			</div>
			<div data-bind="click: slideToggle" class="api-exp-custom-select-layer js-custom-select-layer hidden"></div>
		</div>
	`});


/***/ },
/* 25 */
/***/ function(module, exports) {

	var self;
	
	function ErrorPopUp(params) {
		self = this;
		this.status = ko.observable('');
		this.statusText = ko.observable('');
		this.details = ko.observable(``);
		params.onError.subscribe(function(errorObj) {
			this.status(Object.getProp(errorObj, '.responseJSON.errors[0].status') || errorObj.status || 'unnown');
			this.statusText(Object.getProp(errorObj, '.responseJSON.errors[0].statusText') || errorObj.statusText || '');
			this.details(Object.getProp(errorObj, '.responseJSON.errors[0].detail') || 'unnown');
			this.togglePopUp();
		}, this, 'error');
	}
	
	ErrorPopUp.prototype.togglePopUp = function () {
		$('#error-modal').modal('show');
	};
	
	module.exports = ko.components.register('error-pop-up', {
		viewModel: ErrorPopUp,
		template:`
			<section id="error-modal" class="modal fade" tabindex="-1" role="dialog">
				<div class="modal-dialog" role="document">
					<div class="modal-content error-pop-up">
						<div class="modal-header">
							<h2 class="error-title">Error <span data-bind="text: status"></span>: <span data-bind="text: statusText"></span></h2>
						</div>
						<div class="modal-body">
							<p data-bind="text: details" class="error-details"></p>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary btn-accept" data-dismiss="modal" aria-label="Close">Ok</button>
						</div>
					</div><!-- /.modal-content -->
				</div><!-- /.modal-dialog -->
			</section><!-- /.modal -->
	`});


/***/ },
/* 26 */
/***/ function(module, exports) {

	/*
	todo: single - first load;
	todo: paging (params)
	todo: ulr parse
	todo: fields validation
	 */
	
	var self;
	
	function CardGroup(params) {
		self = this;
		this.url = this.url || params.url;
		this.config = getConfig(params);
		this.data = prepareData(params, this.config._CONFIG);
		this.groupIndex = params.groupIndex || 0;
		this.sectionIndex = ko.utils.unwrapObservable(params.sectionIndex);
		this.colorClass = params.colorClass;
		this.getMore = params.getMore;
		this.page = getPagingInfo(params, this.data.page, this.url);
		this.collapseId = getCollapseId();
		this._hasEventsPanel = false;
	}
	
	CardGroup.prototype.sortByConfig = function (a, b) {
		if (this.config && this.config[a.key] && this.config[b.key] && this.config[a.key]._CONFIG && this.config[b.key]._CONFIG) {
			var i1 = this.config[a.key]._CONFIG.index;
			var i2 = this.config[b.key]._CONFIG.index;
			return i1 - i2;
		}
		return 0;
	};
	
	CardGroup.prototype.checkIfHasEventsList = function (key) {
		return self._hasEventsPanel = key === 'events' || self._hasEventsPanel;
	};
	
	module.exports = ko.components.register('panel-group', {
		viewModel: CardGroup,
		template:`
			<section data-bind="foreachprop: {data: data, sortFn: sortByConfig.bind($component)}" class="panel-group">
				<!--panel-->
				<panel data-bind="css: {'has-events-list': $component.checkIfHasEventsList(key)}" params="$data: $data, $index: $index, panelGroup: $component, sortByConfig: $component.sortByConfig"></panel>
			</section>
	`});
	
	/**
	 * Configures and params for each panel group
	 * @param params
	 * @returns {*}
	 */
	function getConfig(params) {
		self.deepProp = params.deepProp || '';
		// main config
		if (!self.deepProp && !params.config) {
			// panelGroup index - 0
	
			// get full config;
			var filter = ko.utils.unwrapObservable(params.filter);
	
			// get current method config
			var methodConfig = filter[params.reqId] || {};
	
			// method config inherits global config
			methodConfig._CONFIG  = $.extend(true, {}, filter._GLOBAL_CONFIG, methodConfig._CONFIG);
	
			return methodConfig;
		} else {
			// panelGroup index > 0
			return params.config || {}
		}
	}
	
	/**
	 * Data manipulations
	 * @param params
	 * @returns {*|{}}
	 */
	function prepareData(params, config) {
		var data = params && $.extend(true, {}, params.data) || {};
		unwrappObjects(data, config);
		removeDeprecated(data, config);
		return wrappPrimitives(data, params._propTitle);
	}
	
	/**
	 * Gathers all stand alone props in to one object
	 * @param data {object}
	 * @param _propTitle {string}
	 * @returns {object} revised data
	 */
	function wrappPrimitives(data, _propTitle) {
		var newData = {}, prop = _propTitle || 'object', val, key;
	
		// gathering all primitive props in additional panel
		for (key in data) {
			if (!data.hasOwnProperty(key)) {continue;}
			val = data[key];
	
			if (typeof val !== 'object') {
				newData[prop] = newData[prop] || {};
				newData[prop][key] = val;
			} else {
				newData[key] = val;
			}
		}
		return newData
	}
	
	/**
	 * Unwraps objects
	 * @param obj {object}
	 * @returns {object} changed
	 */
	function removeDeprecated(obj, config) {
		var deprecated = config && config.deprecated || [];
	
		deprecated.map(function (item) {
			if (obj[item]) {
				delete obj[item]
			}
			return item;
		});
	
		return obj;
	}
	
	/**
	 * Removes deprecated objects
	 * @param obj {object}
	 * @returns {object} changed
	 */
	function unwrappObjects(obj, config) {
		var unwrapp = config && config.unwrapp || [];
	
		unwrapp.map(function (item) {
			var val = obj[item];
			if (val) {
				var arr = Object.keys(val);
				for (var i = 0; i < arr.length; i++) {
					var prop = arr[i];
					obj[prop] = val[prop];
				}
				delete obj[item];
			}
			return item;
		});
	
		return obj;
	}
	
	/**
	 * Prepares data for paging
	 * @param pageObj
	 * @param params
	 * @returns {*}
	 */
	function getPagingInfo(params, pageObj, url) {
		var pageParam, size;
	
		if (pageObj){
			size = params.cardSize || pageObj.size;
			pageParam = params.pageParam || ko.utils.unwrapObservable(url).find(function (item) {
				return item.name === 'page';
			});
	
			return this.page = {
				parameter: pageParam && pageParam.value,
				size: size
			};
		}
		return null;
	}
	
	/**
	 * Provides id str for panel 'collapse toggle' logic
	 * @param str
	 * @returns {string}
	 */
	function getCollapseId(str) {
		var className = str || 'card-panel-body-';
		return [
			className,
			self.sectionIndex,
			self.groupIndex
		].join('');
	}


/***/ },
/* 27 */
/***/ function(module, exports) {

	var self;
	
	function cardComponent(params) {
		self = this;
		this.key = params.$data.key;
		this.$data = params.$data;
		this.$index = ko.utils.unwrapObservable(params.$index);
		this.panelGroup = params.panelGroup;
		this.page = this.panelGroup.page;
		this.colorClass = this.panelGroup.colorClass || '';
		this.config = getPanelConfig(this.panelGroup.config, this.key);
		this.isExpanded = isExpanded(this.config);
		this.collapseId = this.panelGroup.collapseId + this.$index;
		this.isActive = ko.observable(this.isExpanded);
	}
	
	cardComponent.prototype.setActive = function (model, event) {
		this.isActive(!this.isActive());
	};
	
	/**
	 * Gets config for each panel
	 * @param key {string} key of panel object
	 * @returns {object} config
	 */
	function getPanelConfig(config, key) {
		var subConfig = config[key] || {};
	
		subConfig._CONFIG = $.extend(true, {}, config._CONFIG, subConfig._CONFIG);
		return subConfig;
	}
	
	/**
	 * Checks for 'collapsed' config for each panel
	 * @param key {string} key of panel object
	 * @returns {boolean} for css class add/remove
	 */
	function isExpanded(config) {
		return !(Object.getProp(config, '._CONFIG.collapsed') || false);
	}
	
	module.exports = ko.components.register('panel', {
		viewModel: cardComponent,
		template:`
			<section data-bind="css: {[colorClass]: true, active: isActive}" class="panel panel-primary">
				<!--panel-heading-->
				<panel-heading params="config: config, data: $data, index: $index, page: page, setActive: setActive.bind($component), collapseId: collapseId, colorClass: colorClass, isExpanded: isExpanded"></panel-heading>
				
				<!--panel-body-->
				<section data-bind="attr: {'id': collapseId}, css: {'in': isExpanded}" class="panel-collapse collapse">				
					<!-- ko if: (typeof $data.value === 'object' && !$.isArray($data.value)) -->
						<object-panel-body params="config: config, data: $data, index: $index, panelGroup: panelGroup, page: page, collapseId: collapseId"></object-panel-body>
					<!-- /ko -->
					<!-- ko if: (typeof $data.value === 'object' && $.isArray($data.value)) -->
						<array-panel-body params="config: config, data: $data, index: $index, panelGroup: panelGroup"></array-panel-body>
					<!-- /ko -->
				</section>
			</section>
	`});


/***/ },
/* 28 */
/***/ function(module, exports) {

	var self;
	
	/**
	 * Pagination element
	 * @param params
	 */
	function pagination(params) {
		this.pageParam = params.pageParam;
		this.totalPages = +params.totalPages;
		this.number = +params.number;
		this.first = !!this.number;
		this.last = this.number < this.totalPages - 1;
		this.requestBtn = $('#api-exp-get-btn');
		self = this;
	}
	
	/**
	 * get next page
	 */
	pagination.prototype.getPrevPage = function () {
		var val = this.pageParam();
		this.pageParam(val > 0 ? val - 1 : 0);
		this.requestBtn.trigger('click');
	};
	
	/**
	 * get prev page
	 */
	pagination.prototype.getNextPage = function () {
		var val = this.number;
		this.pageParam(val < this.totalPages - 1 ? val  + 1: val);
		this.requestBtn.trigger('click');
	};
	
	module.exports = ko.components.register('pagination', {
		viewModel: pagination,
		template:
		`<span class="navigation-wrapper">
			<button data-bind="click: getPrevPage, enable: first" type="button" class="navigation prev"></button>
			<button  data-bind="click: getNextPage, enable: last" type="button" class="navigation next"></button>
		</span>`
	});


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var self;
	var getRandomColor = __webpack_require__(17).getRandomColor;
	
	function PanelHeading(params) {
		self = this;
		this.config = params.config && params.config._CONFIG;
		var page = params.page;
		this.setActive = params.setActive;
		this.isExpanded = params.isExpanded;
		this._panelName = params.data.key;
		this.title = this.config && this.config.title || this._panelName;
		this.data = params.data.value;
		if (page) {
			this.cardSize = page.size;
			this.pageParam = page.parameter;
		}
		this.collapseId = params.collapseId;
		if (this.config.request) {
			this.getRandomColor = getRandomColor(params.colorClass);
		}
	}
	
	PanelHeading.prototype.followRequest = function (value) {
		var url = Object.getProp(value, '.config.request');
		url && location.assign(url);
	};
	
	module.exports = ko.components.register('panel-heading', {
		viewModel:  PanelHeading,
		template:`
			<section class="panel-heading">
				<div class="panel-title">
					
					<a data-bind="click: setActive, attr: {href: '#' + collapseId, 'aria-controls': collapseId, 'aria-expanded': isExpanded}" class="btn btn-icon btn-title" type="button" data-toggle="collapse" aria-expanded="false">
						<span class="btn btn-icon shevron white-shevron-up"></span>
						<p data-bind="text: title" class="title">Panel title</p>
					</a>
					
					<!-- ko if: _panelName === 'events'-->
						<span data-bind="text: cardSize" class="counter"></span>
					<!-- /ko-->
					
					<!-- ko if: _panelName === 'page'-->
						<pagination params="number: data.number, totalPages: data.totalPages, pageParam: pageParam"></pagination>
					<!-- /ko-->
					
					<!-- ko if: config.request !== undefined -->
					<section class="follow-request">
						<span data-bind="css: getRandomColor" class="color-indicator"></span>
						<button data-bind="click: followRequest" class="btn btn-request" type="button">another request</button>
					</section>
					<!-- /ko-->
				</div>
			</section>
	`});


/***/ },
/* 30 */
/***/ function(module, exports) {

	var self;
	
	function ObjectPanelBody(params) {
		self = this;
		this.data = this.data || ko.observable(params.data.value);
		this.config = params.config;
		this._panelName = params.data.key;
		this.cardIndex = this.cardIndex || ko.utils.unwrapObservable(params.index);
		this.panelGroup = params.panelGroup || {};
		this.getMore = this.panelGroup.getMore;
		this.pageParam = params.page && params.page.parameter;
		this.collapseId = params.collapseId;
		this._allInside = !!Object.getProp(ko.unwrap(this.config), '._CONFIG.allInside');
		this.sortByConfig = this.panelGroup.sortByConfig;
	}
	
	ObjectPanelBody.prototype.onEnterKeyDown = function (model, event) {
		if (event.keyCode === 13) {
			var value = +event.currentTarget.value;
			value = Number.isNaN(value) ? 0 : value;
			var pageNumber = ~~value < 0 ? 0 : ~~value;
			this.pageParam(pageNumber < ko.unwrap(this.data).totalPages ? pageNumber : ko.unwrap(this.data).totalPages - 1);
			$('#api-exp-get-btn').trigger('click');
		} else {
			return true;
		}
	};
	
	ObjectPanelBody.prototype.canBeCopied = function () {
		if (typeof this.value === 'object') return false;
		this.copied = ko.observable(false);
		if (Object.getProp(self.config, '._CONFIG.copyBtn.' + this.key)) {
			return true;
		}
	
		return false;
	};
	
	ObjectPanelBody.prototype.copyValue = function (model, event) {
		var currentField = this;
		self.clipboard = new Clipboard(event.currentTarget);
		self.clipboard.on('success', function onSuccessCopy(e) {
				console.info('Action:', e.action);
				console.info('Text:', e.text);
				console.info('Trigger:', e.trigger);
				currentField.copied(true);
				setTimeout(function () {
					currentField.copied(false);
				}, 500);
				e.clearSelection();
			})
			.on('error', function onErrorCopy(e) {
				console.error('Action:', e.action);
				console.error('Trigger:', e.trigger);
			});
	};
	
	ObjectPanelBody.prototype.removeHandler = function () {
		self.clipboard && self.clipboard.destroy();
		delete self.clipboard;
	};
	ObjectPanelBody.prototype.setActive = function (key, value, model, e) {
		$(e.currentTarget).parents('.slick-slide').find('.item.object').removeClass('active');
		$(e.currentTarget).parent('.item').addClass('active');
		this.getMore.call(this, key, value);
	};
	
	module.exports = ko.components.register('object-panel-body', {
		viewModel:  ObjectPanelBody,
		template:`
			<section data-bind="css: {'all-inside': $component._allInside}" class="panel-body object-panel-body">
				<!-- ko if: $component._panelName === 'object' && !!Object.getProp(ko.unwrap(data), '.ratio')-->
					<img data-bind="attr: {src: ko.utils.unwrapObservable(data).url, alt: 'image-' + ko.utils.unwrapObservable(data).ratio}" alt="img" class="img img-thumbnail">
				<!-- /ko -->
				
				<ul data-bind="foreachprop: {data: data, sortFn: $component.sortByConfig.bind($component)}" class="list object-list">
					<li data-bind="css: {'object': typeof value === 'object', 'primitive': typeof value !== 'object'}" class="clearfix pading item">
					
						<!-- ko ifnot: typeof value === 'object' && $component._allInside -->
						<span data-bind="text: typeof value === 'object' ? key: key + ':'" class="key"></span>
						<!-- /ko -->
						
						<!-- ko ifnot: typeof value === 'object' || $component._panelName === 'page' && key === 'number' -->
							<span data-bind="text: value" class="value"></span>
						<!-- /ko -->
						
						<!-- ko if: $component._panelName === 'page' && key === 'number'-->
							<div class="form-inline">
								<input id="pagination-input" data-bind="event: {keydown: $component.onEnterKeyDown.bind($component)}, attr: {placeholder: value}" type="text" pattern="[0-9]+" class="form-control">
							</div>
						<!-- /ko -->
						
						<!-- ko if: $component.canBeCopied.call($data, '#prop-value-' + key + $index()) -->
							<button data-bind="event: {mouseover: $component.copyValue, mouseout: $component.removeHandler}, css: {'copied': copied}, attr: {'data-clipboard-text': value.toString(), id: 'prop-value-' + key + $index()}, popover: {type: 'tooltip', title: 'Copy value'}" type="button" class="btn btn-icon btn-copy"></button>
						<!-- /ko -->
						
							<!-- ko if: typeof value === 'object' && $component._allInside -->
								<panel params="$data: $data, $index: $index, panelGroup: $component"></panel>
							<!-- /ko -->
							<!-- ko if: typeof value === 'object' && !$component._allInside -->
								<button data-bind="click: $component.setActive.bind($component, key, value)" type="button" class="btn btn-icon blue-shevron-right pull-right"></button>
							<!-- /ko -->
					</li>
				</ul>
			</section>
	`});


/***/ },
/* 31 */
/***/ function(module, exports) {

	var self;
	
	function ArrayPanelBody(params) {
		self = this;
		this.data = params.data.value;
		this.config = params.config;
		this._panelName = params.data.key;
		this.cardIndex = this.cardIndex || ko.utils.unwrapObservable(params.index);
		this.panelGroup = params.panelGroup;
		this.getMore = this.panelGroup.getMore;
	
	}
	
	ArrayPanelBody.prototype.getStartData = function ($data) {
		return Object.getProp($data, 'dates.start.localDate') || ''
	};
	
	ArrayPanelBody.prototype.getVenueName = function ($data) {
		return Object.getProp($data, '_embedded.venues[0].name') || ''
	};
	
	ArrayPanelBody.prototype.setActive = function ($index, model, e) {
		$(e.currentTarget).parents('.slick-slide').find('.item.object').removeClass('active');
		$(e.currentTarget).parent('.item').addClass('active');
		this.getMore.call(this, $index, model);
	};
	
	module.exports = ko.components.register('array-panel-body', {
		viewModel: ArrayPanelBody,
		template:`
			<section class="panel-body no-padding array-panel-body">
				<ul data-bind="foreach: data, css: {'events': $component._panelName === 'events'}" class="list list-group">
					<li data-bind="css: {'object': typeof $data === 'object'}" class="list-group-item item">
					
						<!-- ko if: $component._panelName === 'images' -->
							<img data-bind="attr: {src: url, alt: 'image-' + ratio}" alt="img" class="img">
						<!-- /ko -->
						
						<!-- ko ifnot: $component._panelName === 'images' -->
							<div class="name-wrapper">
								<span data-bind="text: name || '#' + $index(), blockEllipsis: {clamp: 2}" class="name">label</span>
							</div>			
							
							<!-- ko if: $component._panelName === 'events' -->
								<div class="additional-info">
									<p data-bind="text: $component.getStartData($data)" class="date">event date</p>
									<!-- ko if: $component.getVenueName($data)-->
										<p data-bind="text: $component.getVenueName($data)" class="venue truncate">event venue</p>
									<!--/ko-->
								</div>
							<!-- /ko -->
							
						<!-- /ko -->
						
						<!-- ko if: typeof $data === 'object' -->
							<button data-bind="click: $component.setActive.bind($component, $index())" type="button" class="btn btn-icon blue-shevron-right pull-right"></button>
						<!-- /ko -->
						
					</li>
				</ul>
			</section>
	`});


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmE4YTQ0ZDIzMDdjYTIyMDI1NzAiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL3ZlbmRvcnMvY2xhbXAubWluLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jdXN0b21CaW5kaW5ncy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY3VzdG9tQmluZGluZ3MvYmxvY2tFbGxpcHNpcy5iaW5kaW5nLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jdXN0b21CaW5kaW5ncy9mb3JlYWNoUHJvcC5iaW5kaW5nLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jdXN0b21CaW5kaW5ncy9wb3BvdmVyLmJpbmRpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9hcGlrZXkuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvYWpheFNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvY29uZmlnU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvVmlld01vZGVscy9yZXF1ZXN0c0xpc3RWaWV3TW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvanNvbi1oaWdobGlnaHQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvaGlnaGxpZ2h0SnNvbi53b3JrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi93b3JrZXItbG9hZGVyL2NyZWF0ZUlubGluZVdvcmtlci5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9zbGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29uZmlnLmpzb24iLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvY29sb3JDbGFzc2VzLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL2ZpbHRlci9hYm91dE1ldGhvZC5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvZmlsdGVyL2NhdGVnb3J5TWVudS5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvZmlsdGVyL21ldGhvZHNGaWx0ZXIuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL2ZpbHRlci9yYWRpb0ZpbHRlci5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvZmlsdGVyL3BhcmFtc0ZpbHRlci5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvY29tbW9uL2N1c3RvbVNlbGVjdC5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcG9wdXBzL2Vycm9yLmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9wYW5lbHMvcGFuZWxHcm91cC5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL3BhbmVsLmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9wYW5lbHMvcGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL3BhbmVsSGVhZGluZy5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL29iamVjdFBhbmVsQm9keS5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL2FycmF5UGFuZWxCb2R5LmNvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDdENBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFlLE9BQU87QUFDdEI7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOzs7Ozs7O0FDekdGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXVDLDZDQUE2QztBQUNwRiwwQkFBeUIsb0NBQW9DOztBQUU3RDtBQUNBLDhCQUE2QixnQ0FBZ0M7QUFDN0Q7O0FBRUE7QUFDQTtBQUNBLHVFQUFzRSxTQUFTO0FBQy9FOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUUiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBmYThhNDRkMjMwN2NhMjIwMjU3MFxuICoqLyIsInZhciBjbGFtcCA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL3ZlbmRvcnMvY2xhbXAubWluJyk7XHJcblxyXG5cclxuLyoqXHJcbiAqIE1haW4gZmlsZSBmb3IgQXBpIEV4cGxyZXIgdjIuMFxyXG4gKiBGb3IgZGV2ZWxvcG1lbnQgcGxlYXNlIHVzZSBXZWJwYWNrIHRvIGJ1bmRsZSBhbGwgbW9kdWxlc1xyXG4gKiBJdCBjYW4gYmUgbWFkZSB1c2luZyBucG0gc2NyaXB0cyBjbWQgLSAnd2VicGFjaydcclxuICovXHJcbi8vIGN1c3RvbSBiaW5kaW5nc1xyXG5yZXF1aXJlKCcuLi9jdXN0b21CaW5kaW5ncy9pbmRleCcpO1xyXG5cclxuLy8gTW9kdWxlc1xyXG52YXIgYmFzZSA9IHJlcXVpcmUoJy4uL21vZHVsZXMvYmFzZScpO1xyXG52YXIgYXBpS2V5ID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9hcGlrZXknKTtcclxudmFyIGFqYXhTZXJ2aWNlID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9hamF4U2VydmljZScpO1xyXG5cclxudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29uZmlnU2VydmljZScpO1xyXG5cclxuLy8gVmlldyBNb2RlbHNcclxudmFyIFJlcXVlc3RzTGlzdFZpZXdNb2RlbCA9IHJlcXVpcmUoJy4vcmVxdWVzdHNMaXN0Vmlld01vZGVsJyk7XHJcblxyXG4vLyBDb21wb25lbnRzXHJcbnJlcXVpcmUoJy4uL2NvbXBvbmVudHMvaW5kZXgnKTtcclxuXHJcbi8qKlxyXG4gKiBNYWluIGFwcGxpY2F0aW9uIHZpZXctbW9kZWxcclxuICogQHBhcmFtIG9iaiB7b2JqZWN0fSBnbG9iYWwgZGF0YSBvYmplY3RcclxuICovXHJcbmZ1bmN0aW9uIEFwcFZpZXdNb2RlbChvYmopIHtcclxuICBzZWxmID0gdGhpcztcclxuXHR0aGlzLmJhc2UgPSBvYmogfHwge307XHJcblx0dGhpcy5hcGlLZXkgPSBhcGlLZXk7XHJcblx0dGhpcy5jb25maWcgPSBjb25maWc7XHJcblxyXG5cdHZhciBwYXJzZWRVcmwgPSBwYXJzZVVybCgpO1xyXG5cclxuICAvLyBvYnNlcnZhYmxlc1xyXG4gIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSA9IGtvLm9ic2VydmFibGUocGFyc2VkVXJsLmFwaUNhdGVnb3J5IHx8ICcnKTtcclxuXHR0aGlzLnNlbGVjdGVkTWV0aG9kVHlwZSA9IGtvLm9ic2VydmFibGUoJ0FMTCcpO1xyXG4gIHRoaXMuc2VsZWN0ZWRNZXRob2QgPSBrby5vYnNlcnZhYmxlKHBhcnNlZFVybC5tZXRob2RJZCB8fCAnJyk7XHJcbiAgdGhpcy5zZWxlY3RlZFBhcmFtcyA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XHJcblx0dGhpcy5yZXF1ZXN0cyA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XHJcblx0dGhpcy5vbkVycm9yID0ga28ub2JzZXJ2YWJsZSh7fSk7XHJcblx0dGhpcy5zZWxlY3RlZE1ldGhvZERhdGEgPSBrby5vYnNlcnZhYmxlKGdldE1ldGhvZERhdGEoKSk7XHJcblxyXG5cdC8vIGNvbXB1dGVkXHJcbiAgdGhpcy5VUkwgPSBrby5jb21wdXRlZCh0aGlzLmdldFVybCwgdGhpcyk7XHJcblxyXG4gIHRoaXMuc2VuZEJ1dHRvblRleHQgPSBrby5wdXJlQ29tcHV0ZWQoZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGtvLnVud3JhcChzZWxmLnNlbGVjdGVkTWV0aG9kRGF0YSkubWV0aG9kO1xyXG5cdH0pO1xyXG5cclxuXHR0aGlzLnNoYXJlUGF0aCA9IGtvLnB1cmVDb21wdXRlZChmb3JtRGVlcExpbmtpbmdVcmwsIHRoaXMpO1xyXG4gIHRoaXMucmVxdWVzdHNMaXN0ID0gbmV3IFJlcXVlc3RzTGlzdFZpZXdNb2RlbCh0aGlzLnJlcXVlc3RzLCB0aGlzLnNlbGVjdGVkUGFyYW1zLCB0aGlzLnNoYXJlUGF0aCk7XHJcblx0aW5pdCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG5cdHNlbGYuc2VsZWN0ZWRNZXRob2Quc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWwpIHtcclxuXHRcdHRoaXMuc2VsZWN0ZWRNZXRob2REYXRhKGdldE1ldGhvZERhdGEoe21ldGhvZElkOiB2YWx9KSk7XHJcblxyXG5cdH0sIHNlbGYpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRNZXRob2REYXRhKHBhcmFtcykge1xyXG5cdHZhciBjYXRlZ29yeSA9IGtvLnVud3JhcChwYXJhbXMgJiYgcGFyYW1zLmFwaUNhdGVnb3J5IHx8IHNlbGYuc2VsZWN0ZWRDYXRlZ29yeSk7XHJcblx0dmFyIHR5cGUgPSBrby51bndyYXAocGFyYW1zICYmIHBhcmFtcy50eXBlIHx8IHNlbGYuc2VsZWN0ZWRNZXRob2RUeXBlIHx8ICdBTEwnKTtcclxuXHR2YXIgbWV0aG9kID0ga28udW53cmFwKHBhcmFtcyAmJiBwYXJhbXMubWV0aG9kSWQgfHwgc2VsZi5zZWxlY3RlZE1ldGhvZCk7XHJcblx0cmV0dXJuIHNlbGYuYmFzZVtjYXRlZ29yeV0gJiYgc2VsZi5iYXNlW2NhdGVnb3J5XVt0eXBlXSAmJiBzZWxmLmJhc2VbY2F0ZWdvcnldW3R5cGVdW21ldGhvZF0gfHwge307XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZW5kIHJlcXVlc3QgbWV0aG9kXHJcbiAqL1xyXG5BcHBWaWV3TW9kZWwucHJvdG90eXBlLm9uQ2xpY2tTZW5kQnRuID0gZnVuY3Rpb24gKCkge1xyXG4gIGFqYXhTZXJ2aWNlKHRoaXMuVVJMKCksIHRoaXMucmVxdWVzdHMsIHRoaXMub25FcnJvciwgc2VsZi5iYXNlKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHJhdyB1cmwgZGF0YSBhcnJheVxyXG4gKiBAcmV0dXJucyB7KltdfVxyXG4gKi9cclxuQXBwVmlld01vZGVsLnByb3RvdHlwZS5nZXRVcmwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIFtcclxuICAgIGtvLnVud3JhcCh0aGlzLnNlbGVjdGVkTWV0aG9kRGF0YSksXHJcbiAgICB0aGlzLmFwaUtleSxcclxuXHRcdGtvLnVud3JhcCh0aGlzLnNlbGVjdGVkUGFyYW1zKVxyXG4gIF07XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyBkZWVwIHByb3BcclxuICogQHJldHVybnMgeypbXX1cclxuICovXHJcbk9iamVjdC5nZXRQcm9wID0gZnVuY3Rpb24obywgcykge1xyXG5cdGlmICgodHlwZW9mIG8gIT09ICdvYmplY3QnIHx8IG8gPT0gbnVsbCkgJiYgIXMpIHtyZXR1cm47fVxyXG5cdHMgPSBzLnJlcGxhY2UoL1xcWyhcXHcrKVxcXS9nLCAnLiQxJyk7IC8vIGNvbnZlcnQgaW5kZXhlcyB0byBwcm9wZXJ0aWVzXHJcblx0cyA9IHMucmVwbGFjZSgvXlxcLi8sICcnKTsgICAgICAgICAgIC8vIHN0cmlwIGEgbGVhZGluZyBkb3RcclxuXHR2YXIgYSA9IHMuc3BsaXQoJy4nKTtcclxuXHRmb3IgKHZhciBpID0gMCwgbiA9IGEubGVuZ3RoOyBpIDwgbjsgKytpKSB7XHJcblx0XHR2YXIgayA9IGFbaV07XHJcblx0XHRpZiAobyAmJiBrIGluIG8pIHtcclxuXHRcdFx0byA9IG9ba107XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBvO1xyXG59O1xyXG5cclxuXHJcbmZ1bmN0aW9uIGZvcm1EZWVwTGlua2luZ1VybCgpIHtcclxuXHR2YXIgbG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb247XHJcblx0dmFyIGNhdGVnb3J5ID0ga28udW53cmFwKHNlbGYuc2VsZWN0ZWRDYXRlZ29yeSk7XHJcblx0dmFyIG1ldGhvZCA9IGtvLnVud3JhcChzZWxmLnNlbGVjdGVkTWV0aG9kKTtcclxuXHR2YXIgcGFyYW1zID0ga28udW53cmFwKHNlbGYuc2VsZWN0ZWRQYXJhbXMpO1xyXG5cclxuXHR2YXIgcXVlcnlzID0gW1xyXG5cdFx0J2FwaUNhdGVnb3J5PScgKyBlbmNvZGVVUkkoY2F0ZWdvcnkpLFxyXG5cdFx0J21ldGhvZElkPScrIGVuY29kZVVSSShtZXRob2QpXHJcblx0XTtcclxuXHJcblx0cGFyYW1zLm1hcChmdW5jdGlvbiAocGFyYW0pIHtcclxuXHRcdHZhciB2YWx1ZSA9IGtvLnVud3JhcChwYXJhbS52YWx1ZSk7XHJcblx0XHR2YXIgZGVmYXVsdFZhbHVlID0ga28udW53cmFwKHBhcmFtLmRlZmF1bHQpO1xyXG5cdFx0cXVlcnlzLnB1c2goW1xyXG5cdFx0XHRwYXJhbS5uYW1lLFxyXG5cdFx0XHQnPScsXHJcblx0XHRcdHZhbHVlICE9PSAnJyA/IHZhbHVlIDogZGVmYXVsdFZhbHVlIC8vdG9kbzogcmVtb3ZlIGRlZmF1bHQgZnJvbSBoZXJlIHdoZW4gc2V0IHVwIGl0IGluIHNvdXJjZSBsaWtlIHZhbHVlIGJ5IGRlZmF1bHRcclxuXHRcdF0uam9pbignJykpO1xyXG5cdFx0cmV0dXJuIHBhcmFtO1xyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gW1xyXG5cdFx0bG9jYXRpb24ub3JpZ2luLFxyXG5cdFx0bG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvJC9nbWksICcnKSxcclxuXHRcdCc/JyxcclxuXHRcdHF1ZXJ5cy5qb2luKCcmJylcclxuXHRdLmpvaW4oJycpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZVVybCgpIHtcclxuXHR2YXIgbG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xyXG5cdGlmIChsb2NhdGlvbikge1xyXG5cdFx0dmFyIHF1ZXJ5cyA9IGxvY2F0aW9uLnJlcGxhY2UoL15cXD8vZywgJycpLnNwbGl0KCcmJyk7XHJcblx0XHR2YXIgb2JqID0ge1xyXG5cdFx0XHRhcGlDYXRlZ29yeTogJycsXHJcblx0XHRcdG1ldGhvZElkOiAnJyxcclxuXHRcdFx0cGFyYW1ldGVyczogW11cclxuXHRcdH07XHJcblxyXG5cdFx0cXVlcnlzLm1hcChmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHR2YXIgYSA9IGRlY29kZVVSSShlKS5zcGxpdCgnPScpO1xyXG5cdFx0XHR2YXIga2V5ID0gYVswXTtcclxuXHRcdFx0dmFyIHZhbCA9IGFbMV07XHJcblxyXG5cdFx0XHRpZiAoa2V5ID09PSAnYXBpQ2F0ZWdvcnknIHx8IGtleSA9PT0gJ21ldGhvZElkJykge1xyXG5cdFx0XHRcdG9ialtrZXldID0gdmFsO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG9iai5wYXJhbWV0ZXJzLnB1c2goe1xyXG5cdFx0XHRcdFx0bmFtZToga2V5LFxyXG5cdFx0XHRcdFx0dmFsdWU6IHZhbFxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHZhciBtZXRob2REYXRhID0gZ2V0TWV0aG9kRGF0YShvYmopO1xyXG5cdFx0dmFyIHBhcmFtZXRlcnMgPSBtZXRob2REYXRhLnBhcmFtZXRlcnM7XHJcblxyXG5cdFx0b2JqLnBhcmFtZXRlcnMubWFwKGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdFx0cGFyYW1ldGVyc1tvYmoubmFtZV0udmFsdWUgPSBvYmoudmFsdWU7XHJcblx0XHRcdHJldHVybiBvYmo7XHJcblx0XHR9KTtcclxuXHRcdG9iai5wYXJhbWV0ZXJzID0gcGFyYW1ldGVycztcclxuXHRcdHJldHVybiBvYmo7XHJcblx0fVxyXG5cdHJldHVybiB7fTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIEFjdGl2YXRlcyBrbm9ja291dC5qc1xyXG4gKi9cclxua28uYXBwbHlCaW5kaW5ncyhuZXcgQXBwVmlld01vZGVsKGJhc2UpKTtcclxuXHJcbi8qKlxyXG4gKiBleHBvcnRzIGdsb2JhbCB2YXJpYWJsZVxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBiYXNlO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvbWFpbi5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIVxyXG4qIENsYW1wLmpzIDAuNS4xXHJcbipcclxuKiBDb3B5cmlnaHQgMjAxMS0yMDEzLCBKb3NlcGggU2NobWl0dCBodHRwOi8vam9lLnNoXHJcbiogUmVsZWFzZWQgdW5kZXIgdGhlIFdURlBMIGxpY2Vuc2VcclxuKiBodHRwOi8vc2FtLnpveS5vcmcvd3RmcGwvXHJcbiovXHJcbihmdW5jdGlvbigpe3dpbmRvdy4kY2xhbXA9ZnVuY3Rpb24oYyxkKXtmdW5jdGlvbiBzKGEsYil7bi5nZXRDb21wdXRlZFN0eWxlfHwobi5nZXRDb21wdXRlZFN0eWxlPWZ1bmN0aW9uKGEsYil7dGhpcy5lbD1hO3RoaXMuZ2V0UHJvcGVydHlWYWx1ZT1mdW5jdGlvbihiKXt2YXIgYz0vKFxcLShbYS16XSl7MX0pL2c7XCJmbG9hdFwiPT1iJiYoYj1cInN0eWxlRmxvYXRcIik7Yy50ZXN0KGIpJiYoYj1iLnJlcGxhY2UoYyxmdW5jdGlvbihhLGIsYyl7cmV0dXJuIGMudG9VcHBlckNhc2UoKX0pKTtyZXR1cm4gYS5jdXJyZW50U3R5bGUmJmEuY3VycmVudFN0eWxlW2JdP2EuY3VycmVudFN0eWxlW2JdOm51bGx9O3JldHVybiB0aGlzfSk7cmV0dXJuIG4uZ2V0Q29tcHV0ZWRTdHlsZShhLG51bGwpLmdldFByb3BlcnR5VmFsdWUoYil9ZnVuY3Rpb24gdChhKXthPWF8fGMuY2xpZW50SGVpZ2h0O3ZhciBiPXUoYyk7cmV0dXJuIE1hdGgubWF4KE1hdGguZmxvb3IoYS9iKSwwKX1mdW5jdGlvbiB4KGEpe3JldHVybiB1KGMpKlxyXG5hfWZ1bmN0aW9uIHUoYSl7dmFyIGI9cyhhLFwibGluZS1oZWlnaHRcIik7XCJub3JtYWxcIj09YiYmKGI9MS4yKnBhcnNlSW50KHMoYSxcImZvbnQtc2l6ZVwiKSkpO3JldHVybiBwYXJzZUludChiKX1mdW5jdGlvbiBsKGEpe2lmKGEubGFzdENoaWxkLmNoaWxkcmVuJiYwPGEubGFzdENoaWxkLmNoaWxkcmVuLmxlbmd0aClyZXR1cm4gbChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhLmNoaWxkcmVuKS5wb3AoKSk7aWYoYS5sYXN0Q2hpbGQmJmEubGFzdENoaWxkLm5vZGVWYWx1ZSYmXCJcIiE9YS5sYXN0Q2hpbGQubm9kZVZhbHVlJiZhLmxhc3RDaGlsZC5ub2RlVmFsdWUhPWIudHJ1bmNhdGlvbkNoYXIpcmV0dXJuIGEubGFzdENoaWxkO2EubGFzdENoaWxkLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYS5sYXN0Q2hpbGQpO3JldHVybiBsKGMpfWZ1bmN0aW9uIHAoYSxkKXtpZihkKXt2YXIgZT1hLm5vZGVWYWx1ZS5yZXBsYWNlKGIudHJ1bmNhdGlvbkNoYXIsXCJcIik7Znx8KGg9MDxrLmxlbmd0aD9cclxuay5zaGlmdCgpOlwiXCIsZj1lLnNwbGl0KGgpKTsxPGYubGVuZ3RoPyhxPWYucG9wKCkscihhLGYuam9pbihoKSkpOmY9bnVsbDttJiYoYS5ub2RlVmFsdWU9YS5ub2RlVmFsdWUucmVwbGFjZShiLnRydW5jYXRpb25DaGFyLFwiXCIpLGMuaW5uZXJIVE1MPWEubm9kZVZhbHVlK1wiIFwiK20uaW5uZXJIVE1MK2IudHJ1bmNhdGlvbkNoYXIpO2lmKGYpe2lmKGMuY2xpZW50SGVpZ2h0PD1kKWlmKDA8PWsubGVuZ3RoJiZcIlwiIT1oKXIoYSxmLmpvaW4oaCkraCtxKSxmPW51bGw7ZWxzZSByZXR1cm4gYy5pbm5lckhUTUx9ZWxzZVwiXCI9PWgmJihyKGEsXCJcIiksYT1sKGMpLGs9Yi5zcGxpdE9uQ2hhcnMuc2xpY2UoMCksaD1rWzBdLHE9Zj1udWxsKTtpZihiLmFuaW1hdGUpc2V0VGltZW91dChmdW5jdGlvbigpe3AoYSxkKX0sITA9PT1iLmFuaW1hdGU/MTA6Yi5hbmltYXRlKTtlbHNlIHJldHVybiBwKGEsZCl9fWZ1bmN0aW9uIHIoYSxjKXthLm5vZGVWYWx1ZT1jK2IudHJ1bmNhdGlvbkNoYXJ9ZD1kfHx7fTtcclxudmFyIG49d2luZG93LGI9e2NsYW1wOmQuY2xhbXB8fDIsdXNlTmF0aXZlQ2xhbXA6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGQudXNlTmF0aXZlQ2xhbXA/ZC51c2VOYXRpdmVDbGFtcDohMCxzcGxpdE9uQ2hhcnM6ZC5zcGxpdE9uQ2hhcnN8fFtcIi5cIixcIi1cIixcIlxcdTIwMTNcIixcIlxcdTIwMTRcIixcIiBcIl0sYW5pbWF0ZTpkLmFuaW1hdGV8fCExLHRydW5jYXRpb25DaGFyOmQudHJ1bmNhdGlvbkNoYXJ8fFwiXFx1MjAyNlwiLHRydW5jYXRpb25IVE1MOmQudHJ1bmNhdGlvbkhUTUx9LGU9Yy5zdHlsZSx5PWMuaW5uZXJIVE1MLHo9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGMuc3R5bGUud2Via2l0TGluZUNsYW1wLGc9Yi5jbGFtcCx2PWcuaW5kZXhPZiYmKC0xPGcuaW5kZXhPZihcInB4XCIpfHwtMTxnLmluZGV4T2YoXCJlbVwiKSksbTtiLnRydW5jYXRpb25IVE1MJiYobT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSxtLmlubmVySFRNTD1iLnRydW5jYXRpb25IVE1MKTt2YXIgaz1iLnNwbGl0T25DaGFycy5zbGljZSgwKSxcclxuaD1rWzBdLGYscTtcImF1dG9cIj09Zz9nPXQoKTp2JiYoZz10KHBhcnNlSW50KGcpKSk7dmFyIHc7eiYmYi51c2VOYXRpdmVDbGFtcD8oZS5vdmVyZmxvdz1cImhpZGRlblwiLGUudGV4dE92ZXJmbG93PVwiZWxsaXBzaXNcIixlLndlYmtpdEJveE9yaWVudD1cInZlcnRpY2FsXCIsZS5kaXNwbGF5PVwiLXdlYmtpdC1ib3hcIixlLndlYmtpdExpbmVDbGFtcD1nLHYmJihlLmhlaWdodD1iLmNsYW1wK1wicHhcIikpOihlPXgoZyksZTw9Yy5jbGllbnRIZWlnaHQmJih3PXAobChjKSxlKSkpO3JldHVybntvcmlnaW5hbDp5LGNsYW1wZWQ6d319fSkoKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy92ZW5kb3JzL2NsYW1wLm1pbi5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcclxuXHRyZXF1aXJlKCcuL2Jsb2NrRWxsaXBzaXMuYmluZGluZycpO1xyXG5cdHJlcXVpcmUoJy4vZm9yZWFjaFByb3AuYmluZGluZycpO1xyXG5cdHJlcXVpcmUoJy4vcG9wb3Zlci5iaW5kaW5nJyk7XHJcbn0oKSk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY3VzdG9tQmluZGluZ3MvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJrby5iaW5kaW5nSGFuZGxlcnMuYmxvY2tFbGxpcHNpcyA9IHtcclxuXHRpbml0OiBmdW5jdGlvbihlbGVtZW50LCB2YWx1ZUFjY2Vzc29yLCBhbGxCaW5kaW5ncywgdmlld01vZGVsLCBiaW5kaW5nQ29udGV4dCkge1xyXG5cdFx0JGNsYW1wKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IoKSk7XHJcblx0fVxyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2N1c3RvbUJpbmRpbmdzL2Jsb2NrRWxsaXBzaXMuYmluZGluZy5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIiBtb2R1bGUuZXhwb3J0cyA9IGtvLmJpbmRpbmdIYW5kbGVycy5mb3JlYWNocHJvcCA9IHtcclxuXHJcblx0dHJhbnNmb3JtT2JqZWN0OiBmdW5jdGlvbiAocGFyYW1zKSB7XHJcblx0XHR2YXIgcHJvcGVydGllcyA9IFtdO1xyXG5cdFx0dmFyIG9iaiwgc29ydEZuID0gcGFyYW1zLnNvcnRGbjtcclxuXHJcblx0XHRvYmogPSBzb3J0Rm4gPyBwYXJhbXMuZGF0YTogcGFyYW1zO1xyXG5cdFx0b2JqID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShvYmopO1xyXG5cclxuXHRcdGtvLnV0aWxzLm9iamVjdEZvckVhY2gob2JqLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG5cdFx0XHRwcm9wZXJ0aWVzLnB1c2goe1xyXG5cdFx0XHRcdGtleToga2V5LFxyXG5cdFx0XHRcdHZhbHVlOiB2YWx1ZVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmIChzb3J0Rm4pIHtcclxuXHRcdFx0cHJvcGVydGllcy5zb3J0KHNvcnRGbik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHByb3BlcnRpZXM7XHJcblx0fSxcclxuXHRpbml0OiBmdW5jdGlvbihlbGVtZW50LCB2YWx1ZUFjY2Vzc29yLCBhbGxCaW5kaW5nc0FjY2Vzc29yLCB2aWV3TW9kZWwsIGJpbmRpbmdDb250ZXh0KSB7XHJcblx0XHR2YXIgcHJvcGVydGllcyA9IGtvLnB1cmVDb21wdXRlZChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBvYmogPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHZhbHVlQWNjZXNzb3IoKSk7XHJcblx0XHRcdHJldHVybiBrby5iaW5kaW5nSGFuZGxlcnMuZm9yZWFjaHByb3AudHJhbnNmb3JtT2JqZWN0KG9iaik7XHJcblx0XHR9KTtcclxuXHRcdGtvLmFwcGx5QmluZGluZ3NUb05vZGUoZWxlbWVudCwge1xyXG5cdFx0XHRmb3JlYWNoOiBwcm9wZXJ0aWVzXHJcblx0XHR9LCBiaW5kaW5nQ29udGV4dCk7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRjb250cm9sc0Rlc2NlbmRhbnRCaW5kaW5nczogdHJ1ZVxyXG5cdFx0fTtcclxuXHR9XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY3VzdG9tQmluZGluZ3MvZm9yZWFjaFByb3AuYmluZGluZy5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjb21tb24gPSB7XHJcblx0Y29udGFpbmVyOiAnYm9keScsXHJcblx0dHJpZ2dlcjogJ2hvdmVyJyxcclxuXHRwbGFjZW1lbnQ6ICdib3R0b20nXHJcbn07XHJcblxyXG5rby5iaW5kaW5nSGFuZGxlcnMucG9wb3ZlciA9IHtcclxuXHR1cGRhdGU6IGZ1bmN0aW9uKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IpIHtcclxuXHRcdHZhciAkZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHR2YXIgcGFyYW1zID0gdmFsdWVBY2Nlc3NvcigpO1xyXG5cdFx0dmFyIGNvbmZpZyA9ICQuZXh0ZW5kKHt9LCBjb21tb24sIHBhcmFtcywge2RhdGE6IG51bGx9KTtcclxuXHJcblx0XHRpZiAocGFyYW1zLnR5cGUgPT09ICdwb3BvdmVyJyAmJiBwYXJhbXMuZGF0YSkge1xyXG5cdFx0XHR2YXIgZGF0YSA9IGtvLnVud3JhcChwYXJhbXMuZGF0YSk7XHJcblx0XHRcdGNvbmZpZy50aXRsZSA9IGBFcnJvciAke2RhdGFbMF19OiAke2RhdGFbMV19YDtcclxuXHRcdFx0Y29uZmlnLmNvbnRlbnQgPSBkYXRhWzJdO1xyXG5cdFx0XHQkZWxlbWVudC5wb3BvdmVyKGNvbmZpZyk7XHJcblx0XHRcdGlmIChjb25maWcudHJpZ2dlciA9PT0gJ2NsaWNrJykge1xyXG5cdFx0XHRcdHZhciB0aW1lcjtcclxuXHRcdFx0XHQkZWxlbWVudC5vbignc2hvd24uYnMucG9wb3ZlcicsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdCRlbGVtZW50LnRyaWdnZXIoJ2NsaWNrJyk7XHJcblx0XHRcdFx0XHR9LCAyMDAwKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHQkZWxlbWVudC5vbignaGlkZS5icy5wb3BvdmVyJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbmZpZy5kZWxheSA9IHtcclxuXHRcdFx0XHRcInNob3dcIjogMTUwMCxcclxuXHRcdFx0XHRcImhpZGVcIjogMTAwXHJcblx0XHRcdH07XHJcblx0XHRcdGNvbmZpZy50aXRsZSA9IHBhcmFtcy50aXRsZSB8fCBjb25maWcudGl0bGU7XHJcblx0XHRcdCRlbGVtZW50LnRvb2x0aXAoY29uZmlnKTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY3VzdG9tQmluZGluZ3MvcG9wb3Zlci5iaW5kaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGJhc2UgPSB7fTtcbnZhciBDT05GSUdfVVJMID0gJy4uLy4uL2FwaWRlc2NyaXB0aW9uLnhtbCc7XG5cbnZhciBwYXJzZURhdGEgPSBmdW5jdGlvbiAoeG1sKSB7XG5cdHZhciBnbG9iYWwgPSB7fTtcblx0Ly9nZXQgYWxsIEFQSXNcblx0dmFyIHJlc291cmNlc0VsID0gJCh4bWwpLmZpbmQoXCJyZXNvdXJjZXNcIikuZXEoMCk7XG5cblx0Ly8gcmVzb3VyY2Vcblx0JCh4bWwpXG5cdFx0LmZpbmQoXCJyZXNvdXJjZVwiKVxuXHRcdC5nZXQoKVxuXHRcdC5tYXAoZnVuY3Rpb24gKHJlcykge1xuXHRcdFx0dmFyIHJlc291cmNlID0gJChyZXMpO1xuXHRcdFx0Ly8gbWV0aG9kIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHR2YXIgbWV0aG9kRWxlbSA9IHJlc291cmNlLmZpbmQoXCJtZXRob2RcIikuZXEoMCk7XG5cblx0XHRcdHZhciBtZXRob2QgPSB7XG5cdFx0XHRcdGlkIDogbWV0aG9kRWxlbS5hdHRyKFwiaWRcIiksIC8vIG1ldGhvZCBpZFxuXHRcdFx0XHRuYW1lIDogbWV0aG9kRWxlbS5hdHRyKFwiYXBpZ2VlOmRpc3BsYXlOYW1lXCIpIHx8IG1ldGhvZEVsZW0uYXR0cihcImlkXCIpLCAvLyBtZXRob2QgbmFtZVxuXHRcdFx0XHRtZXRob2QgOiBtZXRob2RFbGVtLmF0dHIoJ25hbWUnKSwgLy8gR0VUIG9yIFBPU1Rcblx0XHRcdFx0Y2F0ZWdvcnkgOiBtZXRob2RFbGVtLmZpbmQoJ1twcmltYXJ5PVwidHJ1ZVwiXScpLnRleHQoKS50cmltKCksIC8vIEFQSSBuYW1lXG5cdFx0XHRcdHBhdGg6IHJlc291cmNlLmF0dHIoJ3BhdGgnKSwgLy8gbWV0aG9kIFVSTFxuXHRcdFx0XHRiYXNlIDogcmVzb3VyY2VzRWwuYXR0cignYmFzZScpLCAvLyBtZXRob2QgYmFzZSBsaW5rXG5cdFx0XHRcdGxpbmsgOiBtZXRob2RFbGVtLmZpbmQoJ2RvYycpLmVxKDApLmF0dHIoJ2FwaWdlZTp1cmwnKSwgLy8gbGluayB0byBkb2N1bWVudGF0aW9uXG5cdFx0XHRcdGRlc2NyaXB0aW9uIDogbWV0aG9kRWxlbS5maW5kKCdkb2MnKS5lcSgwKS50ZXh0KCkudHJpbSgpLCAvL21ldGhvZCBkZXNjcmlwdGlvblxuXHRcdFx0XHRwYXJhbWV0ZXJzOiB7fVxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gcGFyYW1zIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHRyZXNvdXJjZVxuXHRcdFx0XHQuZmluZCgncGFyYW0nKVxuXHRcdFx0XHQuZ2V0KClcblx0XHRcdFx0Lm1hcChmdW5jdGlvbiAocGFyKSB7XG5cdFx0XHRcdFx0dmFyIHBhcmFtID0gJChwYXIpO1xuXHRcdFx0XHRcdHZhciBvcHRpb25zID0gcGFyYW0uZmluZCgnb3B0aW9uJyk7XG5cdFx0XHRcdFx0dmFyIGlzU2VsZWN0ID0gISFvcHRpb25zLmxlbmd0aDtcblxuXHRcdFx0XHRcdHZhciBwYXJhbWV0ZXIgPSB7XG5cdFx0XHRcdFx0XHRuYW1lOiBwYXJhbS5hdHRyKCduYW1lJyksXG5cdFx0XHRcdFx0XHRkb2M6IHBhcmFtLmZpcnN0KCdkb2MnKS50ZXh0KCkudHJpbSgpLFxuXHRcdFx0XHRcdFx0c3R5bGU6IHBhcmFtLmF0dHIoJ3N0eWxlJyksXG5cdFx0XHRcdFx0XHRyZXF1aXJlZDogcGFyYW0uYXR0cigncmVxdWlyZWQnKSxcblx0XHRcdFx0XHRcdGRlZmF1bHQ6IHBhcmFtLmF0dHIoJ2RlZmF1bHQnKSA9PT0gJ25vbmUnICYmIGlzU2VsZWN0ID8gJycgOiBwYXJhbS5hdHRyKCdkZWZhdWx0JyksXG5cdFx0XHRcdFx0XHRzZWxlY3Q6IGlzU2VsZWN0XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGlmIChpc1NlbGVjdCkge1xuXHRcdFx0XHRcdFx0cGFyYW1ldGVyLm9wdGlvbnMgPSBvcHRpb25zLmdldCgpLm1hcChmdW5jdGlvbiAob3B0aW9uKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRcdFx0bmFtZTogJChvcHRpb24pLmF0dHIoJ3ZhbHVlJyksXG5cdFx0XHRcdFx0XHRcdFx0Y2hlY2tlZDogJChvcHRpb24pLmF0dHIoJ3ZhbHVlJykgPT09IHBhcmFtZXRlci5kZWZhdWx0IHx8ICQob3B0aW9uKS5hdHRyKCd2YWx1ZScpID09PSAnbm9uZScsXG5cdFx0XHRcdFx0XHRcdFx0bGluazogZmFsc2Vcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdG1ldGhvZC5wYXJhbWV0ZXJzW3BhcmFtZXRlci5uYW1lXSA9IHBhcmFtZXRlcjtcblx0XHRcdFx0fSk7XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogR2xvYmFsIG9iaiBjb21wb3NpdGlvblxuICAgICAgICovXG5cdFx0XHQvLyBzZXQgY2F0ZWdvcnkgb2JqXG5cdFx0XHRnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XSA9IGdsb2JhbFttZXRob2QuY2F0ZWdvcnldIHx8IHt9O1xuXG5cdFx0XHQvLyBzZXQgbWV0aG9kcyB0eXBlIG9ialxuXHRcdFx0Z2xvYmFsW21ldGhvZC5jYXRlZ29yeV0uQUxMID0gZ2xvYmFsW21ldGhvZC5jYXRlZ29yeV0uQUxMIHx8IHt9O1xuXHRcdFx0Z2xvYmFsW21ldGhvZC5jYXRlZ29yeV1bbWV0aG9kLm1ldGhvZF0gPSBnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XVttZXRob2QubWV0aG9kXSB8fCB7fTtcblxuXHRcdFx0Ly8gc2V0IG1ldGhvZCBvYmpcblx0XHRcdGdsb2JhbFttZXRob2QuY2F0ZWdvcnldLkFMTFttZXRob2QuaWRdID0gbWV0aG9kO1xuXHRcdFx0Z2xvYmFsW21ldGhvZC5jYXRlZ29yeV1bbWV0aG9kLm1ldGhvZF1bbWV0aG9kLmlkXSA9IG1ldGhvZDtcblx0XHR9KTtcblxuXHRyZXR1cm4gZ2xvYmFsO1xufTtcblxuLy9nZXRzIGRvY3VtZW50IGZyb20gV0FETCBjb25maWd1cmF0aW9uIGZpbGVcbnZhciByZWFkRnJvbVdBREwgPSBmdW5jdGlvbiAoKSB7XG4gICQuYWpheCh7XG4gICAgdXJsOiBDT05GSUdfVVJMLFxuICAgIGFzeW5jIDogZmFsc2UsXG4gICAgZGF0YVR5cGU6ICgkLmJyb3dzZXIubXNpZSkgPyBcInRleHRcIiA6IFwieG1sXCIsXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgIHZhciB4bWw7XG5cbiAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UgPT0gXCJzdHJpbmdcIil7XG4gICAgICAgIHhtbCA9IG5ldyBBY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTERPTVwiKTtcbiAgICAgICAgeG1sLmFzeW5jID0gZmFsc2U7XG4gICAgICAgIHhtbC5sb2FkWE1MKHJlc3BvbnNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHhtbCA9IHJlc3BvbnNlO1xuICAgICAgfVxuXG5cdFx0XHRiYXNlID0gcGFyc2VEYXRhKHhtbCk7XG4gICAgfSxcblxuICAgIGVycm9yOiBmdW5jdGlvbihYTUxIdHRwUmVxdWVzdCwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pe1xuICAgICAgYWxlcnQoJ0RhdGEgQ291bGQgTm90IEJlIExvYWRlZCAtICcrIHRleHRTdGF0dXMpO1xuICAgIH1cbiAgfSk7XG59O1xucmVhZEZyb21XQURMKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGJhc2U7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvYmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhcGlLZXkgPSAnWGlPck4yVUM5eWp1UjRYRjg3c2RNYlJwYVZOc1A2VzInIHx8IGFwaUtleVNlcnZpY2UuY2hlY2tBcGlLZXlDb29raWUoJ3RrLWFwaS1rZXknKSB8fCBhcGlLZXlTZXJ2aWNlLmdldEFwaUV4cGxvcmVLZXkoKTsgLy9BUEkgS2V5XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBuYW1lOiAnYXBpa2V5JyxcclxuICBzdHlsZTogJ3F1ZXJ5JyxcclxuICB2YWx1ZToga28ub2JzZXJ2YWJsZShhcGlLZXkpXHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9hcGlrZXkuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcclxuICogQWpheCBTZXJ2aWNlXHJcbiAqIEBwYXJhbSB1cmxcclxuICogQHBhcmFtIG1ldGhvZFxyXG4gKiBAcGFyYW0gY2FsbGJhY2tcclxuICovXHJcbnZhciBhamF4U2VydmljZSA9IGZ1bmN0aW9uICh1cmwsIG1ldGhvZCwgY2FsbGJhY2spIHtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogbWV0aG9kLFxyXG4gICAgdXJsOiB1cmwsXHJcbiAgICBhc3luYzogdHJ1ZSxcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIGNvbXBsZXRlOiBjYWxsYmFja1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpbHRlcnMgYW5kIHByZXBhcmVzIHBhcmFtcyBwYWlyc1xyXG4gKiBAcGFyYW0gYXJyXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxudmFyIHByZXBhcmVVcmwgPSBmdW5jdGlvbiAoYXJyKSB7XHJcbiAgdmFyIHJlcGxhY2VtZW50LCB1cmwsIGRvbWFpbiwgcGF0aCwgbWV0aG9kLCBhcGlLZXksIHBhcmFtcztcclxuXHJcbiAgaWYgKCFhcnIgJiYgIWFyci5sZW5ndGgpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgXHJcbiAgZG9tYWluID0gYXJyWzBdLmJhc2U7XHJcbiAgcGF0aCA9IGFyclswXS5wYXRoO1xyXG4gIGFwaUtleSA9IGFyclsxXTtcclxuICBwYXJhbXMgPSBhcnJbMl0uZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICByZXR1cm4gaXRlbS5zdHlsZSA9PT0gJ3F1ZXJ5JztcclxuICB9KTtcclxuXHJcbiAgLy8gYXJyIG9mIHRlbXBsYXRlIG1hcmtzXHJcbiAgcmVwbGFjZW1lbnQgPSBwYXRoLm1hdGNoKC8oW157XSo/KVxcdyg/PVxcfSkvZ21pKTtcclxuXHJcbiAgLy8gYXJyIG9mIHRlbXBsYXRlIHBhcmFtc1xyXG4gIHZhciB0ZW1wbGF0ZXNBcnIgPSBhcnJbMl0uZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICByZXR1cm4gaXRlbS5zdHlsZSA9PT0gJ3RlbXBsYXRlJztcclxuICB9KTtcclxuXHJcbiAgLy8gcmVwbGFjZW1lbnRcclxuICByZXBsYWNlbWVudC5mb3JFYWNoKGZ1bmN0aW9uICh2YWwpIHtcclxuICAgIHZhciBwYXJhbSA9IHRlbXBsYXRlc0Fyci5maW5kKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgIHJldHVybiBpdGVtLm5hbWUgPT09IHZhbDtcclxuICAgIH0pO1xyXG4gICAgcGF0aCA9IHBhdGgucmVwbGFjZSgneycrIHBhcmFtLm5hbWUgKyAnfScsIHBhcmFtLnZhbHVlKCkgfHwgcGFyYW0uZGVmYXVsdCk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIGFkZHMgYXBpS2V5IHBhcmFtXHJcbiAgaWYgKCFwYXJhbXNbMF0gfHwgcGFyYW1zWzBdLm5hbWUgIT09ICdhcGlrZXknKSB7XHJcbiAgICBwYXJhbXMudW5zaGlmdChhcGlLZXkpO1xyXG4gIH1cclxuXHJcbiAgLy8gcHJlcGFyZXMgcGFyYW1zIHBhcnQgb2YgdXJsXHJcbiAgcGFyYW1zID0gcGFyYW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICByZXR1cm4gW2l0ZW0ubmFtZSwgaXRlbS52YWx1ZSgpIHx8IGl0ZW0uZGVmYXVsdF0uam9pbignPScpO1xyXG4gICAgfSkuam9pbignJicpO1xyXG5cclxuICB1cmwgPSBbZG9tYWluLCAnLycsIHBhdGgsICc/JywgcGFyYW1zXS5qb2luKCcnKTtcclxuXHJcbiAgcmV0dXJuIGVuY29kZVVSSSh1cmwpO1xyXG59O1xyXG5cclxuLy8gc2VuZHMgcmVxdWVzdCB0byBnZXQgdGhlIHNlY29uZCBjb2x1bW5cclxudmFyIHNlbmRQcmltYXJ5UmVxdWVzdCA9IGZ1bmN0aW9uIChhcnIsIHJlcXVlc3RzLCBvbkVycm9yLCBnbG9iYWwpIHtcclxuICB2YXIgdXJsID0gcHJlcGFyZVVybChhcnIpO1xyXG5cclxuICBhamF4U2VydmljZSh1cmwsIGFyclswXS5tZXRob2QsIGZ1bmN0aW9uKHJlcywgbXNnKSB7XHJcblx0XHR2YXIgcmVzT2JqID0ge1xyXG5cdFx0XHRyZXE6IHVybCxcclxuXHRcdFx0aW5kZXg6IHJlcXVlc3RzKCkubGVuZ3RoXHJcblx0XHR9O1xyXG5cclxuXHRcdGlmIChtc2cgPT0gJ2Vycm9yJykge1xyXG5cdFx0XHQvLyBub3RpZnlpbmcgZXJyb3IgbW9kYWxcclxuXHRcdFx0b25FcnJvci5ub3RpZnlTdWJzY3JpYmVycyhyZXMsICdlcnJvcicpO1xyXG5cdFx0XHQvLyBlcnJvciBwb3BvdmVyIG9mIHJlcXVlc3RcclxuXHRcdFx0cmVzT2JqLmVycm9yID0gcmVzO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Z2xvYmFsLmxhc3RSZXNwb25zZSA9IHJlc09iai5yZXMgPSB7XHJcblx0XHRcdFx0aWQ6IGFyclswXS5pZCwgLy8gbWV0aG9kIGlkIHdhcyB1c2VkXHJcblx0XHRcdFx0cmVzOiByZXMucmVzcG9uc2VKU09OIC8vIHJlc3BvbnNlXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gZXhwb3J0aW5nIGRhdGEgdXNpbmcgb2JzZXJ2YWJsZVxyXG5cdFx0cmVxdWVzdHMudW5zaGlmdChyZXNPYmopO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc2VuZFByaW1hcnlSZXF1ZXN0O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvYWpheFNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgY29uZmlnID0ga28ub2JzZXJ2YWJsZSgpO1xyXG5cclxuJC5hamF4KHtcclxuXHR0eXBlOiAnR0VUJyxcclxuXHR1cmw6IFtcclxuXHRcdCdodHRwOi8vJyxcclxuXHRcdGRvY3VtZW50LmxvY2F0aW9uLmhvc3RuYW1lLFxyXG5cdFx0ZG9jdW1lbnQubG9jYXRpb24ucG9ydCAmJiAnOicgKyBkb2N1bWVudC5sb2NhdGlvbi5wb3J0LFxyXG5cdFx0Jy9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb25maWcuanNvbidcclxuXHRdLmpvaW4oJycpLFxyXG5cdGFzeW5jOiB0cnVlLFxyXG5cdGRhdGFUeXBlOiBcImpzb25cIixcclxuXHRjb21wbGV0ZTogZnVuY3Rpb24ocmVzLCBtc2cpIHtcclxuXHRcdGlmIChtc2cgPT0gJ2Vycm9yJykge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdjYW5cXCd0IGxvYWQgY29uZmlnLmpzb24hJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25maWcocmVzLnJlc3BvbnNlSlNPTik7XHJcblx0XHR9XHJcblx0fVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY29uZmlnO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvY29uZmlnU2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIganNvbkhpZ2hsaWdodCA9IHJlcXVpcmUoJy4vLi4vbW9kdWxlcy9qc29uLWhpZ2hsaWdodCcpO1xyXG52YXIgc2xpZGVyID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9zbGlkZXInKTtcclxudmFyIGZpbHRlciA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy5qc29uJyk7XHJcbnZhciBzZWxmO1xyXG52YXIgY29sb3JzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb2xvckNsYXNzZXMnKS5jb2xvcnM7XHJcblxyXG5mdW5jdGlvbiBSZXF1ZXN0c0xpc3RWaWV3TW9kZWwocmVxdWVzdHMsIHNlbGVjdGVkUGFyYW1zLCBzaGFyZVBhdGgpIHtcclxuXHR0aGlzLnVybCA9IHNlbGVjdGVkUGFyYW1zO1xyXG5cdHNlbGYgPSB0aGlzO1xyXG5cdHRoaXMuY29sb3JzID0gY29sb3JzO1xyXG5cdHRoaXMuc2hhcmVQYXRoID0gc2hhcmVQYXRoO1xyXG5cdHRoaXMucmVxdWVzdHMgPSByZXF1ZXN0cztcclxuXHR0aGlzLmlzQWN0aXZlVGFiID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcblx0dGhpcy52aWV3TW9kZWwgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xyXG5cdHRoaXMuY2xlYXJCdG5Jc1Zpc2libGUgPSBrby5jb21wdXRlZCh0aGlzLl9pc1Zpc2libGUsIHRoaXMpO1xyXG5cdHRoaXMucmVxdWVzdHMuc3Vic2NyaWJlKHRoaXMudXBkYXRlTW9kZWwsIHRoaXMpO1xyXG59XHJcblxyXG4vKipcclxuICogVXBkYXRlIFZpZXdtb2RlbCBvZiByZXF1ZXN0IGxpc3RcclxuICogQHBhcmFtIGFyclxyXG4gKi9cclxuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS51cGRhdGVNb2RlbCA9IGZ1bmN0aW9uIChhcnIpIHtcclxuXHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHJcblx0dmFyIG5ld01vZGVsID0ga28udW53cmFwKHRoaXMucmVxdWVzdHMpXHJcblx0XHQubWFwKGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdFx0dmFyIG5ld09iaiA9IHtcclxuXHRcdFx0XHRjb2xvcjogc2VsZi5jb2xvcnNbb2JqLmluZGV4ICUgc2VsZi5jb2xvcnMubGVuZ3RoXSxcclxuXHRcdFx0XHRhY3RpdmU6IGtvLm9ic2VydmFibGUoZmFsc2UpLFxyXG5cdFx0XHRcdGNvcGllZEZvclNoYXJlOiBrby5vYnNlcnZhYmxlKGZhbHNlKSxcclxuXHRcdFx0XHRjb3BpZWRVcmw6IGtvLm9ic2VydmFibGUoZmFsc2UpLFxyXG5cdFx0XHRcdHJlc0hUTUw6IGtvLm9ic2VydmFibGUoJycpXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQvLyBlcnJvciBwb3BvdmVyXHJcblx0XHRcdGlmIChvYmouZXJyb3IpIHtcclxuXHRcdFx0XHR2YXIgZXJyb3JPYmogPSBvYmouZXJyb3I7XHJcblx0XHRcdFx0bmV3T2JqLmVycm9yID0ga28ub2JzZXJ2YWJsZShbXHJcblx0XHRcdFx0XHRPYmplY3QuZ2V0UHJvcChlcnJvck9iaiwgJy5yZXNwb25zZUpTT04uZXJyb3JzWzBdLnN0YXR1cycpIHx8IGVycm9yT2JqLnN0YXR1cyArICcnLFxyXG5cdFx0XHRcdFx0T2JqZWN0LmdldFByb3AoZXJyb3JPYmosICcucmVzcG9uc2VKU09OLmVycm9yc1swXS5zdGF0dXNUZXh0JykgfHwgJycsXHJcblx0XHRcdFx0XHRPYmplY3QuZ2V0UHJvcChlcnJvck9iaiwgJy5yZXNwb25zZUpTT04uZXJyb3JzWzBdLmRldGFpbCcpIHx8ICd1bm5vd24nLFxyXG5cdFx0XHRcdFx0T2JqZWN0LmdldFByb3AoZXJyb3JPYmosICcucmVzcG9uc2VKU09OJykgfHwge31cclxuXHRcdFx0XHRdKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gJC5leHRlbmQoe30sIG9iaiwgbmV3T2JqKTtcclxuXHRcdH0pO1xyXG5cdHNsaWRlci5yZW1vdmUoc2VsZi52aWV3TW9kZWwoKS5sZW5ndGgpO1xyXG5cdHNlbGYudmlld01vZGVsKG5ld01vZGVsKTtcclxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdHNsaWRlci5zZXQoc2VsZi52aWV3TW9kZWwoKS5sZW5ndGgpO1xyXG5cdFx0JCgnI3Nob3ctZGV0YWlscy0wJykudHJpZ2dlcignY2xpY2snKTtcclxuXHR9LCAxMCk7XHJcbn07XHJcblxyXG4vKipcclxuICogZ2V0IGRldGFpbHNcclxuICogQHBhcmFtIGRhdGFcclxuICovXHJcblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUuZ2V0TW9yZSA9IGZ1bmN0aW9uIChpZCwgZGF0YSkge1xyXG5cdHZhciBwYW5lbEdyb3VwID0gdGhpcy5wYW5lbEdyb3VwO1xyXG5cdHZhciBwYW5lbCA9IHRoaXM7XHJcblx0dmFyIGN1cnJlbnRTbGlkZXIgPSAkKCcjc2xpZGVyLScgKyBwYW5lbEdyb3VwLnNlY3Rpb25JbmRleCk7XHJcblx0dmFyIGNvbXBvbmVudCA9ICQoJzxzZWN0aW9uIGRhdGEtYmluZD1cImNvbXBvbmVudDoge25hbWU6IFxcJ3BhbmVsLWdyb3VwXFwnLCBwYXJhbXM6IHBhcmFtc31cIj48L3NlY3Rpb24+Jyk7XHJcblx0dmFyIGN1cnNsaWNrID0gY3VycmVudFNsaWRlci5zbGljaygnZ2V0U2xpY2snKTtcclxuXHRcclxuXHQvLyBleHRlbmRpbmcgYWRkaXRpb25hbCBkYXRhIChjb3B5KVxyXG5cdHZhciBwYXJhbXMgPSAkLmV4dGVuZCh7fSwgcGFuZWxHcm91cCwge1xyXG5cdFx0ZGF0YTogZGF0YSxcclxuXHRcdGdyb3VwSW5kZXg6IHBhbmVsR3JvdXAuZ3JvdXBJbmRleCArIDEsXHJcblx0XHRfcHJvcFRpdGxlOiB0eXBlb2YgaWQgPT09ICdzdHJpbmcnICYmIGlkLFxyXG5cdFx0Y29uZmlnOiBwYW5lbC5jb25maWdcclxuXHR9KTtcclxuXHJcblx0Ly8gYXBwbHkgY29tcG9uZW50IGRhdGEgYmluZGluZ3NcclxuXHRrby5hcHBseUJpbmRpbmdzKHtcclxuXHRcdHBhcmFtczogcGFyYW1zXHJcblx0fSwgY29tcG9uZW50WzBdKTtcclxuXHRcclxuXHQvLyBhZGQgc2xpZGUgd2l0aCBzZWxlY3RlZCBkYXRhXHJcblx0Y3VycmVudFNsaWRlci5zbGljaygnc2xpY2tBZGQnLCBjb21wb25lbnQpO1xyXG5cdFxyXG5cdC8vIHJlbW92ZSBvdXRzdGFuZGluZyBzbGlkZXNcclxuXHRmb3IgKHZhciBpID0gY3Vyc2xpY2suc2xpZGVDb3VudCAtIDI7IGkgPiBwYW5lbEdyb3VwLmdyb3VwSW5kZXg7IGktLSkge1xyXG5cdFx0Y3VycmVudFNsaWRlci5zbGljaygnc2xpY2tSZW1vdmUnLCBpLCBmYWxzZSk7XHJcblx0fVxyXG5cdC8vIG1vdmUgdG8gbmV4dCBzbGlkZVxyXG5cdGN1cnJlbnRTbGlkZXIuc2xpY2soJ3NsaWNrTmV4dCcpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFZpc2liaWxpdHkgZmxhZyBmb3IgQ2xlYXIgYnRuXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5faXNWaXNpYmxlID0gZnVuY3Rpb24gKCkge1xyXG5cdHJldHVybiBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHRoaXMucmVxdWVzdHMpLmxlbmd0aCA+IDA7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2xlYXIgcmVxdWVzdHN0cyBsaXN0IGhhbmRsZXJcclxuICogQHBhcmFtIHZtXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5vbkNsZWFyUmVxdWVzdHMgPSBmdW5jdGlvbiAodm0sIGV2ZW50KSB7XHJcblx0dGhpcy5yZXF1ZXN0cyhbXSk7XHJcbn07XHJcblxyXG4vKipcclxuICogRGV0YWlscyB0b2dnbGUgaGFuZGxlclxyXG4gKiBAcGFyYW0gdm1cclxuICogQHBhcmFtIGV2ZW50XHJcbiAqL1xyXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLmdldERldGFpbHMgPSBmdW5jdGlvbiAodm0sIGV2ZW50KSB7XHJcblx0aWYgKCF0aGlzLnJlc0hUTUwoKS5sZW5ndGgpIHtcclxuXHRcdGpzb25IaWdobGlnaHQodGhpcy5yZXNIVE1MLCB0aGlzLnJlcy5yZXMpO1xyXG5cdH1cclxuXHR0aGlzLmFjdGl2ZSghdGhpcy5hY3RpdmUoKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogSm9pbiBzdHJpbmcgZm9yIGlkJ3NcclxuICogQHBhcmFtIHNcclxuICogQHBhcmFtIGlcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUuZ2V0U3RyID0gZnVuY3Rpb24gKHMsIGkpIHtcclxuXHR2YXIgc3RyID0gcztcclxuXHR2YXIgaTEgPSBpID8gaSgpIDogJyc7XHJcblx0cmV0dXJuIFtcclxuXHRcdHN0cixcclxuXHRcdGkxXHJcblx0XS5qb2luKCctJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHJhdyByZXNwb25zZSBkYXRhXHJcbiAqIEBwYXJhbSBtb2RlbCB7b2JqZWN0fVxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5nZXRSYXdEYXRhID0gZnVuY3Rpb24gKG1vZGVsKSB7XHJcblx0dmFyIGNvbnRlbnQgPSBPYmplY3QuZ2V0UHJvcChtb2RlbCwgJy5yZXMucmVzJykgfHwga28udW53cmFwKG1vZGVsLmVycm9yKVszXSB8fCB7fTtcclxuXHR2YXIgcmF3V2luZG93ID0gd2luZG93Lm9wZW4oXCJkYXRhOnRleHQvanNvbixcIiArIGVuY29kZVVSSShKU09OLnN0cmluZ2lmeShjb250ZW50LCBudWxsLCAyKSksICdfYmxhbmsnKTtcclxuXHRyYXdXaW5kb3cuZm9jdXMoKTtcclxufTtcclxuXHJcblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUuY29weVVybCA9IGZ1bmN0aW9uIChtb2RlbCwgZXZlbnQpIHtcclxuXHR2YXIgY3VycmVudEZpZWxkID0gdGhpcztcclxuXHR2YXIgZWxlbWVudCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcblx0c2VsZi5jbGlwYm9hcmQgPSBuZXcgQ2xpcGJvYXJkKGVsZW1lbnQpO1xyXG5cdHNlbGYuY2xpcGJvYXJkLm9uKCdzdWNjZXNzJywgZnVuY3Rpb24gb25TdWNjZXNzQ29weShlKSB7XHJcblx0XHRjb25zb2xlLmluZm8oJ0FjdGlvbjonLCBlLmFjdGlvbik7XHJcblx0XHRjb25zb2xlLmluZm8oJ1RleHQ6JywgZS50ZXh0KTtcclxuXHRcdGNvbnNvbGUuaW5mbygnVHJpZ2dlcjonLCBlLnRyaWdnZXIpO1xyXG5cdFx0JChlbGVtZW50KS5oYXNDbGFzcygnYnRuLXNoYXJlJykgPyBjdXJyZW50RmllbGQuY29waWVkRm9yU2hhcmUodHJ1ZSkgOiBjdXJyZW50RmllbGQuY29waWVkVXJsKHRydWUpO1xyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdCQoZWxlbWVudCkuaGFzQ2xhc3MoJ2J0bi1zaGFyZScpID8gY3VycmVudEZpZWxkLmNvcGllZEZvclNoYXJlKGZhbHNlKSA6IGN1cnJlbnRGaWVsZC5jb3BpZWRVcmwoZmFsc2UpO1xyXG5cdFx0fSwgNTAwKTtcclxuXHRcdGUuY2xlYXJTZWxlY3Rpb24oKTtcclxuXHR9KVxyXG5cdFx0Lm9uKCdlcnJvcicsIGZ1bmN0aW9uIG9uRXJyb3JDb3B5KGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignQWN0aW9uOicsIGUuYWN0aW9uKTtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignVHJpZ2dlcjonLCBlLnRyaWdnZXIpO1xyXG5cdFx0fSk7XHJcbn07XHJcblxyXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLnJlbW92ZUhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0c2VsZi5jbGlwYm9hcmQgJiYgc2VsZi5jbGlwYm9hcmQuZGVzdHJveSgpO1xyXG5cdGRlbGV0ZSBzZWxmLmNsaXBib2FyZDtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVxdWVzdHNMaXN0Vmlld01vZGVsO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvcmVxdWVzdHNMaXN0Vmlld01vZGVsLmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBXb3JrZXIgPSByZXF1aXJlKCcuL2hpZ2hsaWdodEpzb24ud29ya2VyLmpzJyk7IC8vIEpzb24tZm9ybWF0dGVyIHdvcmtlclxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JzZXJ2YWJsZSwgY29kZSkge1xyXG5cdHZhciBhbmltVGltZSA9IDEwMDtcclxuXHR2YXIgd29ya2VyID0gbmV3IFdvcmtlcjtcclxuXHJcblx0d29ya2VyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0b2JzZXJ2YWJsZShldmVudC5kYXRhKTtcclxuXHJcblx0XHQkKGRvY3VtZW50KVxyXG5cdFx0XHQub24oJ2NsaWNrIHRvdWNoJywgJy50bS1jb2RlLWNvbnRhaW5lciAuZXhwYW5kZWQnLCBmdW5jdGlvbiBqc29uQ29kZUNvbnRhaW5lckV4cGFuZGVkKGUpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHR2YXIgJHNlbGYgPSAkKHRoaXMpO1xyXG5cdFx0XHRcdCRzZWxmXHJcblx0XHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHRcdC5maW5kKCc+dWwnKVxyXG5cdFx0XHRcdFx0LnNsaWRlVXAoYW5pbVRpbWUsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHQkc2VsZi5hZGRDbGFzcygnY29sbGFwc2VkJyk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHRcdFx0Lm9uKCdjbGljayB0b3VjaCcsICcudG0tY29kZS1jb250YWluZXIgLmV4cGFuZGVkLmNvbGxhcHNlZCcsIGZ1bmN0aW9uIGpzb25Db2RlQ29udGFpbmVyQ29sbGFwc2VkKGUpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHR2YXIgJHNlbGYgPSAkKHRoaXMpO1xyXG5cdFx0XHRcdCRzZWxmXHJcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpXHJcblx0XHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHRcdC5maW5kKCc+dWwnKVxyXG5cdFx0XHRcdFx0LnNsaWRlRG93bihhbmltVGltZSwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdCRzZWxmXHJcblx0XHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKVxyXG5cdFx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHR9O1xyXG5cdHdvcmtlci5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRjb25zb2xlLmVycm9yKGV2ZW50KTtcclxuXHR9O1xyXG5cclxuXHR3b3JrZXIucG9zdE1lc3NhZ2UoY29kZSk7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9qc29uLWhpZ2hsaWdodC5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gcmVxdWlyZShcIiEhRDpcXFxcc2FuZGJveFxcXFx0aWNrZXRtYXN0ZXItYXBpLXN0YWdpbmcuZ2l0aHViLmlvXFxcXG5vZGVfbW9kdWxlc1xcXFx3b3JrZXItbG9hZGVyXFxcXGNyZWF0ZUlubGluZVdvcmtlci5qc1wiKShcIi8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcXG4vKioqKioqLyBcXHQvLyBUaGUgbW9kdWxlIGNhY2hlXFxuLyoqKioqKi8gXFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXFxuLyoqKioqKi8gXFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0XFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXFxuLyoqKioqKi8gXFx0XFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXFxuLyoqKioqKi8gXFx0XFx0XFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHRcXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxcbi8qKioqKiovIFxcdFxcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcXG4vKioqKioqLyBcXHRcXHRcXHRleHBvcnRzOiB7fSxcXG4vKioqKioqLyBcXHRcXHRcXHRpZDogbW9kdWxlSWQsXFxuLyoqKioqKi8gXFx0XFx0XFx0bG9hZGVkOiBmYWxzZVxcbi8qKioqKiovIFxcdFxcdH07XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHRcXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cXG4vKioqKioqLyBcXHRcXHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdFxcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcXG4vKioqKioqLyBcXHRcXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdFxcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXFxuLyoqKioqKi8gXFx0XFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xcbi8qKioqKiovIFxcdH1cXG4vKioqKioqL1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcXG4vKioqKioqLyBcXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcXG4vKioqKioqLyBcXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cXG4vKioqKioqLyBcXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcXFwiXFxcIjtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xcbi8qKioqKiovIFxcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xcbi8qKioqKiovIH0pXFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cXG4vKioqKioqLyAoW1xcbi8qIDAgKi9cXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcXG5cXG5cXHQvKipcXHJcXG5cXHQgKiBDb2RlIGZvcm1hdCB3ZWItd29ya2VyXFxyXFxuXFx0ICogQHBhcmFtIGV2ZW50XFxyXFxuXFx0ICovXFxyXFxuXFx0Ly8gdmFyIGhpZ2hsaWdodEpzb24oKVxcclxcblxcdHZhciBoaWdobGlnaHRKc29uID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcXHJcXG5cXHRcXHJcXG5cXHRvbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xcclxcblxcdCAgdmFyIGNvZGUgPSBldmVudC5kYXRhO1xcclxcblxcdCAgLy8gaW1wb3J0U2NyaXB0cygnanNvbi1wYXJzZS5qcycpO1xcclxcblxcdCAgdmFyIHJlc3VsdCA9IGhpZ2hsaWdodEpzb24oY29kZSwge2V4cGFuZGVkOiB0cnVlfSk7XFxyXFxuXFx0ICAvLyB2YXIgcmVzdWx0ID1KU09OLnN0cmluZ2lmeShjb2RlKTtcXHJcXG5cXHQgIHBvc3RNZXNzYWdlKHJlc3VsdCk7XFxyXFxuXFx0fTtcXHJcXG5cXG5cXG4vKioqLyB9LFxcbi8qIDEgKi9cXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcXG5cXG5cXHR2YXIgcHJlZml4ID0gJ3RtLWNvZGUnO1xcclxcblxcdFxcclxcblxcdHZhciBnZXRFeHBhbmRlckNsYXNzZXMgPSBmdW5jdGlvbiAoZXhwYW5kZWQpIHtcXHJcXG5cXHRcXHRpZiAoIWV4cGFuZGVkKSB7XFxyXFxuXFx0XFx0XFx0cmV0dXJuICdleHBhbmRlZCBjb2xsYXBzZWQgaGlkZGVuJztcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFx0cmV0dXJuICdleHBhbmRlZCc7XFxyXFxuXFx0fTtcXHJcXG5cXHRcXHJcXG5cXHR2YXIgZW5jb2RlID0gZnVuY3Rpb24gKHZhbHVlKSB7XFxyXFxuXFx0XFx0cmV0dXJuIFsnPHNwYW4+JywgdmFsdWUsICc8L3NwYW4+J10uam9pbignJyk7XFxyXFxuXFx0fTtcXHJcXG5cXHRcXHJcXG5cXHR2YXIgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlLCB0eXBlLCBleHBhbmRlckNsYXNzZXMpIHtcXHJcXG5cXHRcXHR2YXIga2xhc3MgPSAnb2JqZWN0JyxcXHJcXG5cXHRcXHRcXHRvcGVuID0gJ3snLFxcclxcblxcdFxcdFxcdGNsb3NlID0gJ30nO1xcclxcblxcdFxcclxcblxcdFxcdGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xcclxcblxcdFxcdFxcdGtsYXNzID0gJ2FycmF5JztcXHJcXG5cXHRcXHRcXHRvcGVuID0gJ1snO1xcclxcblxcdFxcdFxcdGNsb3NlID0gJ10nO1xcclxcblxcdFxcdH1cXHJcXG5cXHRcXHJcXG5cXHRcXHRpZiAodmFsdWUgPT09IG51bGwpIHtcXHJcXG5cXHRcXHRcXHRyZXR1cm4gW1xcclxcblxcdFxcdFxcdFxcdCc8bGk+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcImtleVxcXCI+XFxcIicsIGVuY29kZShrZXkpLCAnXFxcIjogPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJudWxsXFxcIj5cXFwiJywgZW5jb2RlKHZhbHVlKSwgJ1xcXCI8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHRcXHQnPC9saT4nXFxyXFxuXFx0XFx0XFx0XS5qb2luKCcnKTtcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFxyXFxuXFx0XFx0aWYgKHR5cGUgPT0gJ29iamVjdCcpIHtcXHJcXG5cXHRcXHRcXHRyZXR1cm4gW1xcclxcblxcdFxcdFxcdFxcdCc8bGk+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcIicsIGV4cGFuZGVyQ2xhc3NlcywgJ1xcXCI+PC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJrZXlcXFwiPlxcXCInLCBlbmNvZGUoa2V5KSwgJ1xcXCI6IDwvc3Bhbj4gJyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcIm9wZW5cXFwiPicsIG9wZW4sICc8L3NwYW4+ICcsXFxyXFxuXFx0XFx0XFx0XFx0XFx0Jzx1bCBjbGFzcz1cXFwiJywga2xhc3MsICdcXFwiPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0anNvbjJodG1sKHZhbHVlLCBleHBhbmRlckNsYXNzZXMpLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8L3VsPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJjbG9zZVxcXCI+JywgY2xvc2UsICc8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHRcXHQnPC9saT4nXFxyXFxuXFx0XFx0XFx0XS5qb2luKCcnKTtcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFxyXFxuXFx0XFx0aWYgKHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnYm9vbGVhbicpIHtcXHJcXG5cXHRcXHRcXHRyZXR1cm4gW1xcclxcblxcdFxcdFxcdFxcdCc8bGk+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcImtleVxcXCI+XFxcIicsIGVuY29kZShrZXkpLCAnXFxcIjogPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCInLCB0eXBlLCAnXFxcIj4nLCBlbmNvZGUodmFsdWUpLCAnPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0JzwvbGk+J1xcclxcblxcdFxcdFxcdF0uam9pbignJyk7XFxyXFxuXFx0XFx0fVxcclxcblxcdFxcdHJldHVybiBbXFxyXFxuXFx0XFx0XFx0JzxsaT4nLFxcclxcblxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwia2V5XFxcIj5cXFwiJywgZW5jb2RlKGtleSksICdcXFwiOiA8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcIicsIHR5cGUsICdcXFwiPlxcXCInLCBlbmNvZGUodmFsdWUpLCAnXFxcIjwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdCc8L2xpPidcXHJcXG5cXHRcXHRdLmpvaW4oJycpO1xcclxcblxcdH07XFxyXFxuXFx0XFxyXFxuXFx0dmFyIGpzb24yaHRtbCA9IGZ1bmN0aW9uIChqc29uLCBleHBhbmRlckNsYXNzZXMpIHtcXHJcXG5cXHRcXHR2YXIgaHRtbCA9ICcnO1xcclxcblxcdFxcdGZvciAodmFyIGtleSBpbiBqc29uKSB7XFxyXFxuXFx0XFx0XFx0aWYgKCFqc29uLmhhc093blByb3BlcnR5KGtleSkpIHtcXHJcXG5cXHRcXHRcXHRcXHRjb250aW51ZTtcXHJcXG5cXHRcXHRcXHR9XFxyXFxuXFx0XFxyXFxuXFx0XFx0XFx0aHRtbCA9IFtodG1sLCBjcmVhdGVFbGVtZW50KGtleSwganNvbltrZXldLCB0eXBlb2YganNvbltrZXldLCBleHBhbmRlckNsYXNzZXMpXS5qb2luKCcnKTtcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFx0cmV0dXJuIGh0bWw7XFxyXFxuXFx0fTtcXHJcXG5cXHRcXHJcXG5cXHR2YXIgZ2V0SnNvblZpZXdlciA9IGZ1bmN0aW9uIChkYXRhLCBvcHRpb25zKSB7XFxyXFxuXFx0XFx0dHJ5IHtcXHJcXG5cXHRcXHRcXHRyZXR1cm4gW1xcclxcblxcdFxcdFxcdFxcdCc8dWwgY2xhc3M9XFxcIicsIHByZWZpeCwgJy1jb250YWluZXJcXFwiPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0anNvbjJodG1sKFtKU09OLnBhcnNlKGRhdGEpXSwgZ2V0RXhwYW5kZXJDbGFzc2VzKG9wdGlvbnMuZXhwYW5kZWQpKSxcXHJcXG5cXHRcXHRcXHRcXHQnPC91bD4nXFxyXFxuXFx0XFx0XFx0XS5qb2luKCcnKTtcXHJcXG5cXHRcXHR9IGNhdGNoIChlKSB7XFxyXFxuXFx0XFx0XFx0cmV0dXJuIFtcXHJcXG5cXHRcXHRcXHRcXHQnPGRpdiBjbGFzcz1cXFwiJywgcHJlZml4LCAnLWVycm9yXFxcIiA+JywgZS50b1N0cmluZygpLCAnIDwvZGl2PidcXHJcXG5cXHRcXHRcXHRdLmpvaW4oJycpO1xcclxcblxcdFxcdH1cXHJcXG5cXHR9O1xcclxcblxcdFxcclxcblxcdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSwgb3B0KSB7XFxyXFxuXFx0XFx0dmFyIGpzb24gPSAnJztcXHJcXG5cXHRcXHR2YXIgb3B0aW9ucyA9IG9wdCB8fCB7ZXhwYW5kZWQ6IHRydWV9O1xcclxcblxcdFxcdGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykge1xcclxcblxcdFxcdFxcdGpzb24gPSBkYXRhO1xcclxcblxcdFxcdH0gZWxzZSBpZiAodHlwZW9mIGRhdGEgPT0gJ29iamVjdCcpIHtcXHJcXG5cXHRcXHRcXHRqc29uID0gSlNPTi5zdHJpbmdpZnkoZGF0YSlcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFx0cmV0dXJuIGdldEpzb25WaWV3ZXIoanNvbiwgb3B0aW9ucyk7XFxyXFxuXFx0fTtcXHJcXG5cXG5cXG4vKioqLyB9XFxuLyoqKioqKi8gXSk7XFxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5kbFluQmhZMnM2THk4dmQyVmljR0ZqYXk5aWIyOTBjM1J5WVhBZ05EY3hZakV3WkRRMFkyRTNNamd3WlRFeE5HRWlMQ0ozWldKd1lXTnJPaTh2THk0dmMyTnlhWEIwY3k5aGNHa3RaWGh3Ykc5eVpYSXZkakl2YzNKakwyMXZaSFZzWlhNdmFHbG5hR3hwWjJoMFNuTnZiaTUzYjNKclpYSXVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZjMk55YVhCMGN5OWhjR2t0Wlhod2JHOXlaWEl2ZGpJdmMzSmpMMjF2WkhWc1pYTXZhbk52Ymkxd1lYSnpaUzVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEVzZFVKQlFXVTdRVUZEWmp0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdPMEZCUjBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdPenM3T3p0QlEzUkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzY1VOQlFXOURMR1ZCUVdVN1FVRkRia1E3UVVGRFFUdEJRVU5CT3pzN096czdPMEZEWWtFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFc1dVRkJWenRCUVVOWUxHRkJRVms3TzBGQlJWbzdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZGTzBGQlEwWTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNkMEpCUVhWQ08wRkJRM1pDTzBGQlEwRTdRVUZEUVN4SFFVRkZPMEZCUTBZN1FVRkRRVHRCUVVOQk8wRkJRMEVpTENKbWFXeGxJam9pYUdsbmFHeHBaMmgwU25OdmJpNTNiM0pyWlhJdWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUlnWEhRdkx5QlVhR1VnYlc5a2RXeGxJR05oWTJobFhHNGdYSFIyWVhJZ2FXNXpkR0ZzYkdWa1RXOWtkV3hsY3lBOUlIdDlPMXh1WEc0Z1hIUXZMeUJVYUdVZ2NtVnhkV2x5WlNCbWRXNWpkR2x2Ymx4dUlGeDBablZ1WTNScGIyNGdYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWh0YjJSMWJHVkpaQ2tnZTF4dVhHNGdYSFJjZEM4dklFTm9aV05ySUdsbUlHMXZaSFZzWlNCcGN5QnBiaUJqWVdOb1pWeHVJRngwWEhScFppaHBibk4wWVd4c1pXUk5iMlIxYkdWelcyMXZaSFZzWlVsa1hTbGNiaUJjZEZ4MFhIUnlaWFIxY200Z2FXNXpkR0ZzYkdWa1RXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwdVpYaHdiM0owY3p0Y2JseHVJRngwWEhRdkx5QkRjbVZoZEdVZ1lTQnVaWGNnYlc5a2RXeGxJQ2hoYm1RZ2NIVjBJR2wwSUdsdWRHOGdkR2hsSUdOaFkyaGxLVnh1SUZ4MFhIUjJZWElnYlc5a2RXeGxJRDBnYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjBnUFNCN1hHNGdYSFJjZEZ4MFpYaHdiM0owY3pvZ2UzMHNYRzRnWEhSY2RGeDBhV1E2SUcxdlpIVnNaVWxrTEZ4dUlGeDBYSFJjZEd4dllXUmxaRG9nWm1Gc2MyVmNiaUJjZEZ4MGZUdGNibHh1SUZ4MFhIUXZMeUJGZUdWamRYUmxJSFJvWlNCdGIyUjFiR1VnWm5WdVkzUnBiMjVjYmlCY2RGeDBiVzlrZFd4bGMxdHRiMlIxYkdWSlpGMHVZMkZzYkNodGIyUjFiR1V1Wlhod2IzSjBjeXdnYlc5a2RXeGxMQ0J0YjJSMWJHVXVaWGh3YjNKMGN5d2dYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWs3WEc1Y2JpQmNkRngwTHk4Z1JteGhaeUIwYUdVZ2JXOWtkV3hsSUdGeklHeHZZV1JsWkZ4dUlGeDBYSFJ0YjJSMWJHVXViRzloWkdWa0lEMGdkSEoxWlR0Y2JseHVJRngwWEhRdkx5QlNaWFIxY200Z2RHaGxJR1Y0Y0c5eWRITWdiMllnZEdobElHMXZaSFZzWlZ4dUlGeDBYSFJ5WlhSMWNtNGdiVzlrZFd4bExtVjRjRzl5ZEhNN1hHNGdYSFI5WEc1Y2JseHVJRngwTHk4Z1pYaHdiM05sSUhSb1pTQnRiMlIxYkdWeklHOWlhbVZqZENBb1gxOTNaV0p3WVdOclgyMXZaSFZzWlhOZlh5bGNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWJTQTlJRzF2WkhWc1pYTTdYRzVjYmlCY2RDOHZJR1Y0Y0c5elpTQjBhR1VnYlc5a2RXeGxJR05oWTJobFhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG1NZ1BTQnBibk4wWVd4c1pXUk5iMlIxYkdWek8xeHVYRzRnWEhRdkx5QmZYM2RsWW5CaFkydGZjSFZpYkdsalgzQmhkR2hmWDF4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV3SUQwZ1hDSmNJanRjYmx4dUlGeDBMeThnVEc5aFpDQmxiblJ5ZVNCdGIyUjFiR1VnWVc1a0lISmxkSFZ5YmlCbGVIQnZjblJ6WEc0Z1hIUnlaWFIxY200Z1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5Z3dLVHRjYmx4dVhHNWNiaThxS2lCWFJVSlFRVU5MSUVaUFQxUkZVaUFxS2x4dUlDb3FJSGRsWW5CaFkyc3ZZbTl2ZEhOMGNtRndJRFEzTVdJeE1HUTBOR05oTnpJNE1HVXhNVFJoWEc0Z0tpb3ZJaXdpTHlvcVhISmNiaUFxSUVOdlpHVWdabTl5YldGMElIZGxZaTEzYjNKclpYSmNjbHh1SUNvZ1FIQmhjbUZ0SUdWMlpXNTBYSEpjYmlBcUwxeHlYRzR2THlCMllYSWdhR2xuYUd4cFoyaDBTbk52YmlncFhISmNiblpoY2lCb2FXZG9iR2xuYUhSS2MyOXVJRDBnY21WeGRXbHlaU2duTGk5cWMyOXVMWEJoY25ObEp5azdYSEpjYmx4eVhHNXZibTFsYzNOaFoyVWdQU0JtZFc1amRHbHZiaWhsZG1WdWRDa2dlMXh5WEc0Z0lIWmhjaUJqYjJSbElEMGdaWFpsYm5RdVpHRjBZVHRjY2x4dUlDQXZMeUJwYlhCdmNuUlRZM0pwY0hSektDZHFjMjl1TFhCaGNuTmxMbXB6SnlrN1hISmNiaUFnZG1GeUlISmxjM1ZzZENBOUlHaHBaMmhzYVdkb2RFcHpiMjRvWTI5a1pTd2dlMlY0Y0dGdVpHVmtPaUIwY25WbGZTazdYSEpjYmlBZ0x5OGdkbUZ5SUhKbGMzVnNkQ0E5U2xOUFRpNXpkSEpwYm1kcFpua29ZMjlrWlNrN1hISmNiaUFnY0c5emRFMWxjM05oWjJVb2NtVnpkV3gwS1R0Y2NseHVmVHRjY2x4dVhHNWNibHh1THlvcUtpb3FLaW9xS2lvcUtpb3FLaW9xWEc0Z0tpb2dWMFZDVUVGRFN5QkdUMDlVUlZKY2JpQXFLaUF1TDNOamNtbHdkSE12WVhCcExXVjRjR3h2Y21WeUwzWXlMM055WXk5dGIyUjFiR1Z6TDJocFoyaHNhV2RvZEVwemIyNHVkMjl5YTJWeUxtcHpYRzRnS2lvZ2JXOWtkV3hsSUdsa0lEMGdNRnh1SUNvcUlHMXZaSFZzWlNCamFIVnVhM01nUFNBd1hHNGdLaW92SWl3aWRtRnlJSEJ5WldacGVDQTlJQ2QwYlMxamIyUmxKenRjY2x4dVhISmNiblpoY2lCblpYUkZlSEJoYm1SbGNrTnNZWE56WlhNZ1BTQm1kVzVqZEdsdmJpQW9aWGh3WVc1a1pXUXBJSHRjY2x4dVhIUnBaaUFvSVdWNGNHRnVaR1ZrS1NCN1hISmNibHgwWEhSeVpYUjFjbTRnSjJWNGNHRnVaR1ZrSUdOdmJHeGhjSE5sWkNCb2FXUmtaVzRuTzF4eVhHNWNkSDFjY2x4dVhIUnlaWFIxY200Z0oyVjRjR0Z1WkdWa0p6dGNjbHh1ZlR0Y2NseHVYSEpjYm5aaGNpQmxibU52WkdVZ1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVcElIdGNjbHh1WEhSeVpYUjFjbTRnV3ljOGMzQmhiajRuTENCMllXeDFaU3dnSnp3dmMzQmhiajRuWFM1cWIybHVLQ2NuS1R0Y2NseHVmVHRjY2x4dVhISmNiblpoY2lCamNtVmhkR1ZGYkdWdFpXNTBJRDBnWm5WdVkzUnBiMjRnS0d0bGVTd2dkbUZzZFdVc0lIUjVjR1VzSUdWNGNHRnVaR1Z5UTJ4aGMzTmxjeWtnZTF4eVhHNWNkSFpoY2lCcmJHRnpjeUE5SUNkdlltcGxZM1FuTEZ4eVhHNWNkRngwYjNCbGJpQTlJQ2Q3Snl4Y2NseHVYSFJjZEdOc2IzTmxJRDBnSjMwbk8xeHlYRzVjY2x4dVhIUnBaaUFvUVhKeVlYa3VhWE5CY25KaGVTaDJZV3gxWlNrcElIdGNjbHh1WEhSY2RHdHNZWE56SUQwZ0oyRnljbUY1Snp0Y2NseHVYSFJjZEc5d1pXNGdQU0FuV3ljN1hISmNibHgwWEhSamJHOXpaU0E5SUNkZEp6dGNjbHh1WEhSOVhISmNibHh5WEc1Y2RHbG1JQ2gyWVd4MVpTQTlQVDBnYm5Wc2JDa2dlMXh5WEc1Y2RGeDBjbVYwZFhKdUlGdGNjbHh1WEhSY2RGeDBKenhzYVQ0bkxGeHlYRzVjZEZ4MFhIUmNkQ2M4YzNCaGJpQmpiR0Z6Y3oxY0ltdGxlVndpUGx3aUp5d2daVzVqYjJSbEtHdGxlU2tzSUNkY0lqb2dQQzl6Y0dGdVBpY3NYSEpjYmx4MFhIUmNkRngwSnp4emNHRnVJR05zWVhOelBWd2liblZzYkZ3aVBsd2lKeXdnWlc1amIyUmxLSFpoYkhWbEtTd2dKMXdpUEM5emNHRnVQaWNzWEhKY2JseDBYSFJjZENjOEwyeHBQaWRjY2x4dVhIUmNkRjB1YW05cGJpZ25KeWs3WEhKY2JseDBmVnh5WEc1Y2NseHVYSFJwWmlBb2RIbHdaU0E5UFNBbmIySnFaV04wSnlrZ2UxeHlYRzVjZEZ4MGNtVjBkWEp1SUZ0Y2NseHVYSFJjZEZ4MEp6eHNhVDRuTEZ4eVhHNWNkRngwWEhSY2RDYzhjM0JoYmlCamJHRnpjejFjSWljc0lHVjRjR0Z1WkdWeVEyeGhjM05sY3l3Z0oxd2lQand2YzNCaGJqNG5MRnh5WEc1Y2RGeDBYSFJjZENjOGMzQmhiaUJqYkdGemN6MWNJbXRsZVZ3aVBsd2lKeXdnWlc1amIyUmxLR3RsZVNrc0lDZGNJam9nUEM5emNHRnVQaUFuTEZ4eVhHNWNkRngwWEhSY2RDYzhjM0JoYmlCamJHRnpjejFjSW05d1pXNWNJajRuTENCdmNHVnVMQ0FuUEM5emNHRnVQaUFuTEZ4eVhHNWNkRngwWEhSY2RDYzhkV3dnWTJ4aGMzTTlYQ0luTENCcmJHRnpjeXdnSjF3aVBpY3NYSEpjYmx4MFhIUmNkRngwWEhScWMyOXVNbWgwYld3b2RtRnNkV1VzSUdWNGNHRnVaR1Z5UTJ4aGMzTmxjeWtzWEhKY2JseDBYSFJjZEZ4MEp6d3ZkV3crSnl4Y2NseHVYSFJjZEZ4MFhIUW5QSE53WVc0Z1kyeGhjM005WENKamJHOXpaVndpUGljc0lHTnNiM05sTENBblBDOXpjR0Z1UGljc1hISmNibHgwWEhSY2RDYzhMMnhwUGlkY2NseHVYSFJjZEYwdWFtOXBiaWduSnlrN1hISmNibHgwZlZ4eVhHNWNjbHh1WEhScFppQW9kSGx3WlNBOVBTQW5iblZ0WW1WeUp5QjhmQ0IwZVhCbElEMDlJQ2RpYjI5c1pXRnVKeWtnZTF4eVhHNWNkRngwY21WMGRYSnVJRnRjY2x4dVhIUmNkRngwSnp4c2FUNG5MRnh5WEc1Y2RGeDBYSFJjZENjOGMzQmhiaUJqYkdGemN6MWNJbXRsZVZ3aVBsd2lKeXdnWlc1amIyUmxLR3RsZVNrc0lDZGNJam9nUEM5emNHRnVQaWNzWEhKY2JseDBYSFJjZEZ4MEp6eHpjR0Z1SUdOc1lYTnpQVndpSnl3Z2RIbHdaU3dnSjF3aVBpY3NJR1Z1WTI5a1pTaDJZV3gxWlNrc0lDYzhMM053WVc0K0p5eGNjbHh1WEhSY2RGeDBKend2YkdrK0oxeHlYRzVjZEZ4MFhTNXFiMmx1S0NjbktUdGNjbHh1WEhSOVhISmNibHgwY21WMGRYSnVJRnRjY2x4dVhIUmNkQ2M4YkdrK0p5eGNjbHh1WEhSY2RGeDBKenh6Y0dGdUlHTnNZWE56UFZ3aWEyVjVYQ0krWENJbkxDQmxibU52WkdVb2EyVjVLU3dnSjF3aU9pQThMM053WVc0K0p5eGNjbHh1WEhSY2RGeDBKenh6Y0dGdUlHTnNZWE56UFZ3aUp5d2dkSGx3WlN3Z0oxd2lQbHdpSnl3Z1pXNWpiMlJsS0haaGJIVmxLU3dnSjF3aVBDOXpjR0Z1UGljc1hISmNibHgwWEhRblBDOXNhVDRuWEhKY2JseDBYUzVxYjJsdUtDY25LVHRjY2x4dWZUdGNjbHh1WEhKY2JuWmhjaUJxYzI5dU1taDBiV3dnUFNCbWRXNWpkR2x2YmlBb2FuTnZiaXdnWlhod1lXNWtaWEpEYkdGemMyVnpLU0I3WEhKY2JseDBkbUZ5SUdoMGJXd2dQU0FuSnp0Y2NseHVYSFJtYjNJZ0tIWmhjaUJyWlhrZ2FXNGdhbk52YmlrZ2UxeHlYRzVjZEZ4MGFXWWdLQ0ZxYzI5dUxtaGhjMDkzYmxCeWIzQmxjblI1S0d0bGVTa3BJSHRjY2x4dVhIUmNkRngwWTI5dWRHbHVkV1U3WEhKY2JseDBYSFI5WEhKY2JseHlYRzVjZEZ4MGFIUnRiQ0E5SUZ0b2RHMXNMQ0JqY21WaGRHVkZiR1Z0Wlc1MEtHdGxlU3dnYW5OdmJsdHJaWGxkTENCMGVYQmxiMllnYW5OdmJsdHJaWGxkTENCbGVIQmhibVJsY2tOc1lYTnpaWE1wWFM1cWIybHVLQ2NuS1R0Y2NseHVYSFI5WEhKY2JseDBjbVYwZFhKdUlHaDBiV3c3WEhKY2JuMDdYSEpjYmx4eVhHNTJZWElnWjJWMFNuTnZibFpwWlhkbGNpQTlJR1oxYm1OMGFXOXVJQ2hrWVhSaExDQnZjSFJwYjI1ektTQjdYSEpjYmx4MGRISjVJSHRjY2x4dVhIUmNkSEpsZEhWeWJpQmJYSEpjYmx4MFhIUmNkQ2M4ZFd3Z1kyeGhjM005WENJbkxDQndjbVZtYVhnc0lDY3RZMjl1ZEdGcGJtVnlYQ0krSnl4Y2NseHVYSFJjZEZ4MFhIUnFjMjl1TW1oMGJXd29XMHBUVDA0dWNHRnljMlVvWkdGMFlTbGRMQ0JuWlhSRmVIQmhibVJsY2tOc1lYTnpaWE1vYjNCMGFXOXVjeTVsZUhCaGJtUmxaQ2twTEZ4eVhHNWNkRngwWEhRblBDOTFiRDRuWEhKY2JseDBYSFJkTG1wdmFXNG9KeWNwTzF4eVhHNWNkSDBnWTJGMFkyZ2dLR1VwSUh0Y2NseHVYSFJjZEhKbGRIVnliaUJiWEhKY2JseDBYSFJjZENjOFpHbDJJR05zWVhOelBWd2lKeXdnY0hKbFptbDRMQ0FuTFdWeWNtOXlYQ0lnUGljc0lHVXVkRzlUZEhKcGJtY29LU3dnSnlBOEwyUnBkajRuWEhKY2JseDBYSFJkTG1wdmFXNG9KeWNwTzF4eVhHNWNkSDFjY2x4dWZUdGNjbHh1WEhKY2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0b1pHRjBZU3dnYjNCMEtTQjdYSEpjYmx4MGRtRnlJR3B6YjI0Z1BTQW5KenRjY2x4dVhIUjJZWElnYjNCMGFXOXVjeUE5SUc5d2RDQjhmQ0I3Wlhod1lXNWtaV1E2SUhSeWRXVjlPMXh5WEc1Y2RHbG1JQ2gwZVhCbGIyWWdaR0YwWVNBOVBTQW5jM1J5YVc1bkp5a2dlMXh5WEc1Y2RGeDBhbk52YmlBOUlHUmhkR0U3WEhKY2JseDBmU0JsYkhObElHbG1JQ2gwZVhCbGIyWWdaR0YwWVNBOVBTQW5iMkpxWldOMEp5a2dlMXh5WEc1Y2RGeDBhbk52YmlBOUlFcFRUMDR1YzNSeWFXNW5hV1o1S0dSaGRHRXBYSEpjYmx4MGZWeHlYRzVjZEhKbGRIVnliaUJuWlhSS2MyOXVWbWxsZDJWeUtHcHpiMjRzSUc5d2RHbHZibk1wTzF4eVhHNTlPMXh5WEc1Y2JseHVYRzR2S2lvcUtpb3FLaW9xS2lvcUtpb3FLaXBjYmlBcUtpQlhSVUpRUVVOTElFWlBUMVJGVWx4dUlDb3FJQzR2YzJOeWFYQjBjeTloY0drdFpYaHdiRzl5WlhJdmRqSXZjM0pqTDIxdlpIVnNaWE12YW5OdmJpMXdZWEp6WlM1cWMxeHVJQ29xSUcxdlpIVnNaU0JwWkNBOUlERmNiaUFxS2lCdGIyUjFiR1VnWTJoMWJtdHpJRDBnTUZ4dUlDb3FMeUpkTENKemIzVnlZMlZTYjI5MElqb2lJbjA9XCIsIF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJoaWdobGlnaHRKc29uLndvcmtlci5qc1wiKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2hpZ2hsaWdodEpzb24ud29ya2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTAzNDM5MTMvaG93LXRvLWNyZWF0ZS1hLXdlYi13b3JrZXItZnJvbS1hLXN0cmluZ1xyXG5cclxudmFyIFVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTDtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihjb250ZW50LCB1cmwpIHtcclxuXHR0cnkge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0dmFyIGJsb2I7XHJcblx0XHRcdHRyeSB7IC8vIEJsb2JCdWlsZGVyID0gRGVwcmVjYXRlZCwgYnV0IHdpZGVseSBpbXBsZW1lbnRlZFxyXG5cdFx0XHRcdHZhciBCbG9iQnVpbGRlciA9IHdpbmRvdy5CbG9iQnVpbGRlciB8fCB3aW5kb3cuV2ViS2l0QmxvYkJ1aWxkZXIgfHwgd2luZG93Lk1vekJsb2JCdWlsZGVyIHx8IHdpbmRvdy5NU0Jsb2JCdWlsZGVyO1xyXG5cdFx0XHRcdGJsb2IgPSBuZXcgQmxvYkJ1aWxkZXIoKTtcclxuXHRcdFx0XHRibG9iLmFwcGVuZChjb250ZW50KTtcclxuXHRcdFx0XHRibG9iID0gYmxvYi5nZXRCbG9iKCk7XHJcblx0XHRcdH0gY2F0Y2goZSkgeyAvLyBUaGUgcHJvcG9zZWQgQVBJXHJcblx0XHRcdFx0YmxvYiA9IG5ldyBCbG9iKFtjb250ZW50XSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG5ldyBXb3JrZXIoVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKSk7XHJcblx0XHR9IGNhdGNoKGUpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBXb3JrZXIoJ2RhdGE6YXBwbGljYXRpb24vamF2YXNjcmlwdCwnICsgZW5jb2RlVVJJQ29tcG9uZW50KGNvbnRlbnQpKTtcclxuXHRcdH1cclxuXHR9IGNhdGNoKGUpIHtcclxuXHRcdHJldHVybiBuZXcgV29ya2VyKHVybCk7XHJcblx0fVxyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vd29ya2VyLWxvYWRlci9jcmVhdGVJbmxpbmVXb3JrZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZnVuY3Rpb24gc2xpY2sodGltZXMpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHR2YXIgc2VsZWN0b3IgPSAnI3NsaWRlci0nO1xyXG5cdFxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdGltZXM7IGkrKykge1xyXG5cdFx0JChzZWxlY3RvciArIGkpLmxlbmd0aCAmJiAkKHNlbGVjdG9yICsgaSkuc2xpY2soe1xyXG5cdFx0XHRkb3RzOiBmYWxzZSxcclxuXHRcdFx0aW5maW5pdGU6IGZhbHNlLFxyXG5cdFx0XHRzcGVlZDogMzAwLFxyXG5cdFx0XHRzbGlkZXNUb1Nob3c6IDMsXHJcblx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cdFx0XHR2YXJpYWJsZVdpZHRoOiB0cnVlLFxyXG5cdFx0XHRhdXRvcGxheTogZmFsc2UsXHJcblx0XHRcdHJlc3BvbnNpdmU6IFtcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRicmVha3BvaW50OiAxMjAwLFxyXG5cdFx0XHRcdFx0c2V0dGluZ3M6IHtcclxuXHRcdFx0XHRcdFx0dmFyaWFibGVXaWR0aDogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0c2xpZGVzVG9TaG93OiAyLFxyXG5cdFx0XHRcdFx0XHRzbGlkZXNUb1Njcm9sbDogMSxcclxuXHRcdFx0XHRcdFx0aW5maW5pdGU6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRkb3RzOiBmYWxzZVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0YnJlYWtwb2ludDogODAwLFxyXG5cdFx0XHRcdFx0c2V0dGluZ3M6IHtcclxuXHRcdFx0XHRcdFx0dmFyaWFibGVXaWR0aDogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0c2xpZGVzVG9TaG93OiAxLFxyXG5cdFx0XHRcdFx0XHRzbGlkZXNUb1Njcm9sbDogMVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiB1bnNsaWNrKHRpbWVzKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdGltZXM7IGkrKykge1xyXG5cdFx0dmFyIHNlbGVjdG9yID0gJyNzbGlkZXItJyArIGk7XHJcblx0XHQkKHNlbGVjdG9yKSAmJiAkKHNlbGVjdG9yKS5sZW5ndGggJiYgJChzZWxlY3Rvcikuc2xpY2soJ3Vuc2xpY2snKTtcclxuXHR9XHJcblx0Y29uc29sZS5pbmZvKCdjbGVhcmVkJyk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdHNldDogc2xpY2ssXHJcblx0cmVtb3ZlOiB1bnNsaWNrXHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9zbGlkZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwiZGlzY292ZXJ5LnYyLmV2ZW50cy5nZXRcIjoge1xuXHRcdFwiZXZlbnRzXCI6IHtcblx0XHRcdFwib2JqZWN0XCI6IHtcblx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcInRpdGxlXCI6IFwiRXZlbnRcIixcblx0XHRcdFx0XHRcImNvcHlCdG5cIjoge1xuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IHRydWVcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFwicmVxdWVzdFwiOiBcImh0dHA6Ly93d3cuZ29vZ2xlLmNvbVwiLFxuXHRcdFx0XHRcdFwiaW5kZXhcIjogMFxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJpbWFnZXNcIjoge1xuXHRcdFx0XHRcIm9iamVjdFwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwidGl0bGVcIjogXCJpbWFnZVwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFwiaW5kZXhcIjogMSxcblx0XHRcdFx0XHRcImNvbGxhcHNlZFwiOiB0cnVlXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcInNhbGVzXCI6IHtcblx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcImluZGV4XCI6IDJcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdFwidmVudWVzXCI6IHtcblx0XHRcdFx0XCJvYmplY3RcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcInRpdGxlXCI6IFwidmVudWVcIixcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogMFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJjaXR5XCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiAyXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcInN0YXRlXCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiAxXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImNvdW50cnlcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDFcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiYWRkcmVzc1wiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogM1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJsb2NhdGlvblwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogNFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcImluZGV4XCI6IDNcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdFwiZGF0ZXNcIjoge1xuXHRcdFx0XHRcImFjY2Vzc1wiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogMyxcblx0XHRcdFx0XHRcdFwiY29weUJ0blwiOiB7fSxcblx0XHRcdFx0XHRcdFwiY29sbGFwc2VkXCI6IHRydWVcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwidGltZXpvbmVcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDBcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwic3RhcnRcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDEsXG5cdFx0XHRcdFx0XHRcImNvcHlCdG5cIjoge1xuXHRcdFx0XHRcdFx0XHRcImRhdGVUaW1lXCI6IHRydWVcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcImNvbGxhcHNlZFwiOiB0cnVlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcInN0YXR1c1wiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogMyxcblx0XHRcdFx0XHRcdFwiY29sbGFwc2VkXCI6IHRydWVcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiZW5kXCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiAyLFxuXHRcdFx0XHRcdFx0XCJjb3B5QnRuXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJkYXRlVGltZVwiOiB0cnVlXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XCJjb2xsYXBzZWRcIjogdHJ1ZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcImluZGV4XCI6IDQsXG5cdFx0XHRcdFx0XCJhbGxJbnNpZGVcIjogdHJ1ZVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XCJjb2xsYXBzZWRcIjogZmFsc2UsXG5cdFx0XHRcdFwiaW5kZXhcIjogMFxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0XCJwYWdlXCI6IHtcblx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFwiaW5kZXhcIjogMSxcblx0XHRcdFx0XCJjb2xsYXBzZWRcIjogdHJ1ZVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFwibWV0aG9kXCI6IFwiZGlzY292ZXJ5LnYyLmV2ZW50cy5nZXRcIlxuXHRcdH1cblx0fSxcblx0XCJkaXNjb3ZlcnkudjIuYXR0cmFjdGlvbnMuZ2V0XCI6IHtcblx0XHRcImF0dHJhY3Rpb25zXCI6IHtcblx0XHRcdFwib2JqZWN0XCI6IHtcblx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcImluZGV4XCI6IDBcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdFwiaW1hZ2VzXCI6IHtcblx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcImluZGV4XCI6IDJcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdFwiY2xhc3NpZmljYXRpb25zXCI6IHtcblx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcImluZGV4XCI6IDFcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFwiaW5kZXhcIjogMFxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0XCJwYWdlXCI6IHtcblx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFwiaW5kZXhcIjogMVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFwibWV0aG9kQ29uZmlnXCI6IHRydWVcblx0XHR9XG5cdH0sXG5cdFwiX0dMT0JBTF9DT05GSUdcIjoge1xuXHRcdFwiY29weUJ0blwiOiB7XG5cdFx0XHRcImlkXCI6IHRydWVcblx0XHR9LFxuXHRcdFwiZGVwcmVjYXRlZFwiOiBbXG5cdFx0XHRcIl9saW5rc1wiXG5cdFx0XSxcblx0XHRcInVud3JhcHBcIjogW1xuXHRcdFx0XCJfZW1iZWRkZWRcIlxuXHRcdF1cblx0fVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29uZmlnLmpzb25cbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIE5VTSA9IDEyO1xyXG52YXIgUFJFRklYID0gJ2NvbG9yLSc7XHJcblxyXG52YXIgY29sb3JzID0gZ2V0Q29sb3JzKE5VTSwgUFJFRklYKTtcclxuXHJcbmZ1bmN0aW9uIGdldENvbG9ycyhudW0sIGNsYXNzUHJlZml4KSB7XHJcblx0dmFyIGNvbG9ycyA9IG5ldyBBcnJheShudW0pO1xyXG5cclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGNvbG9ycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0Y29sb3JzW2ldID0gY2xhc3NQcmVmaXggKyAoaSArIDEpO1xyXG5cdH1cclxuXHRyZXR1cm4gY29sb3JzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRSYW5kb21Db2xvcihjb2xvcikge1xyXG5cdHZhciByYW5kb21OdW1iZXI7XHJcblx0ZG8ge1xyXG5cdFx0cmFuZG9tTnVtYmVyID0gZ2V0UmFuZG9tSW50KDEsIGNvbG9ycy5sZW5ndGgpO1xyXG5cdH0gd2hpbGUgKFBSRUZJWCArIHJhbmRvbU51bWJlciA9PT0gY29sb3IpO1xyXG5cclxuXHRyZXR1cm4gUFJFRklYICsgcmFuZG9tTnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIChpbmNsdXNpdmUpIGFuZCBtYXggKGluY2x1c2l2ZSlcclxuICogVXNpbmcgTWF0aC5yb3VuZCgpIHdpbGwgZ2l2ZSB5b3UgYSBub24tdW5pZm9ybSBkaXN0cmlidXRpb24hXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRSYW5kb21JbnQobWluLCBtYXgpIHtcclxuXHRyZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRjb2xvcnM6IGNvbG9ycyxcclxuXHRnZXRSYW5kb21Db2xvcjogZ2V0UmFuZG9tQ29sb3JcclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2NvbG9yQ2xhc3Nlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XHJcblx0cmVxdWlyZSgnLi9maWx0ZXIvYWJvdXRNZXRob2QuY29tcG9uZW50Jyk7XHJcblx0cmVxdWlyZSgnLi9maWx0ZXIvY2F0ZWdvcnlNZW51LmNvbXBvbmVudCcpO1xyXG5cdHJlcXVpcmUoJy4vZmlsdGVyL21ldGhvZHNGaWx0ZXIuY29tcG9uZW50Jyk7XHJcblx0cmVxdWlyZSgnLi9maWx0ZXIvcmFkaW9GaWx0ZXIuY29tcG9uZW50Jyk7XHJcblx0cmVxdWlyZSgnLi9maWx0ZXIvcGFyYW1zRmlsdGVyLmNvbXBvbmVudCcpO1xyXG5cclxuXHRyZXF1aXJlKCcuL2NvbW1vbi9jdXN0b21TZWxlY3QuY29tcG9uZW50Jyk7XHJcblxyXG5cdHJlcXVpcmUoJy4vcG9wdXBzL2Vycm9yLmNvbXBvbmVudCcpO1xyXG5cclxuXHRyZXF1aXJlKCcuL3BhbmVscy9wYW5lbEdyb3VwLmNvbXBvbmVudCcpO1xyXG5cdHJlcXVpcmUoJy4vcGFuZWxzL3BhbmVsLmNvbXBvbmVudCcpO1xyXG5cdHJlcXVpcmUoJy4vcGFuZWxzL3BhZ2luYXRpb24uY29tcG9uZW50Jyk7XHJcblx0cmVxdWlyZSgnLi9wYW5lbHMvcGFuZWxIZWFkaW5nLmNvbXBvbmVudCcpO1xyXG5cdHJlcXVpcmUoJy4vcGFuZWxzL29iamVjdFBhbmVsQm9keS5jb21wb25lbnQnKTtcclxuXHRyZXF1aXJlKCcuL3BhbmVscy9hcnJheVBhbmVsQm9keS5jb21wb25lbnQnKTtcclxufSgpKTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xuXG5mdW5jdGlvbiBBYm91dE1ldGhvZChwYXJhbXMpIHtcblx0c2VsZiA9IHRoaXM7XG5cdHZhciBtZXRob2QgPSBrby51bndyYXAocGFyYW1zLnNlbGVjdGVkTWV0aG9kRGF0YSk7XG5cdHRoaXMuZG9jdW1lbnRhdGlvbkxpbmsgPSBrby5vYnNlcnZhYmxlKG1ldGhvZC5saW5rKTtcblx0dGhpcy5uYW1lID0ga28ub2JzZXJ2YWJsZShtZXRob2QubmFtZSk7XG5cdHRoaXMuZGVzY3JpcHRpb24gPSBrby5vYnNlcnZhYmxlKG1ldGhvZC5kZXNjcmlwdGlvbik7XG5cblx0Ly8gb24gbW9kZWwgY2hhbmdlXG5cdHBhcmFtcy5zZWxlY3RlZE1ldGhvZERhdGEuc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWwpIHtcblx0XHR0aGlzLmRvY3VtZW50YXRpb25MaW5rKHZhbC5saW5rKTtcblx0XHR0aGlzLm5hbWUodmFsLm5hbWUpO1xuXHRcdHRoaXMuZGVzY3JpcHRpb24odmFsLmRlc2NyaXB0aW9uKTtcblx0fSwgdGhpcyk7XG5cblx0Ly8gbWV0aG9kc1xuXHR0aGlzLnRvZ2dsZVBvcFVwICA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xufVxuXG5BYm91dE1ldGhvZC5wcm90b3R5cGUub25BYm91dENsaWNrID0gZnVuY3Rpb24gKG1vZGVsKSB7XG5cdHJldHVybiBtb2RlbC50b2dnbGVQb3BVcCghbW9kZWwudG9nZ2xlUG9wVXAoKSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2Fib3V0LW1ldGhvZCcsIHtcblx0dmlld01vZGVsOiBBYm91dE1ldGhvZCxcblx0dGVtcGxhdGU6YFxuXHRcdDxzZWN0aW9uIGRhdGEtYmluZD1cImNzczoge2FjdGl2ZTogdG9nZ2xlUG9wVXB9XCIgY2xhc3M9XCJhcGktZXhwLWFib3V0XCI+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwiYXBpLWV4cC1hYm91dC13cmFwcGVyXCI+XG5cdFx0XHRcdDxidXR0b24gZGF0YS1iaW5kPVwiY2xpY2s6IG9uQWJvdXRDbGlja1wiIGNsYXNzPVwiYXBpLWV4cC1hYm91dF9fYnV0dG9uIGRldmljZXMtYnV0dG9uXCI+PC9idXR0b24+XG5cdFx0XHRcdDxhIGRhdGEtYmluZD1cImF0dHI6IHtocmVmOiBkb2N1bWVudGF0aW9uTGlua31cIiBocmVmPVwiI1wiIGNsYXNzPVwiYXBpLWV4cC1hYm91dF9fYnV0dG9uXCIgdGFyZ2V0PVwiX2JsYW5rXCI+PC9hPlxuXHRcdFx0XHQ8YXJ0aWNsZSBjbGFzcz1cImFwaS1leHAtYWJvdXRfX2NvbnRlbnRcIj5cblx0XHRcdFx0XHQ8aDUgZGF0YS1iaW5kPVwidGV4dDogbmFtZVwiIGNsYXNzPVwiYXBpLWV4cC1hYm91dF9fdGl0bGVcIj5BYm91dCBBUEkgYW5kIE1ldGhvZDo8L2g1PlxuXHRcdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiYXBpLWV4cC1hYm91dF9fZGVzY3JpcHRpb25cIj5cblx0XHRcdFx0XHRcdDxwIGRhdGEtYmluZD1cInRleHQ6IGRlc2NyaXB0aW9uXCI+PC9wPlxuXHRcdFx0XHRcdFx0PHA+XG5cdFx0XHRcdFx0XHRcdDxhIGRhdGEtYmluZD1cImF0dHI6IHtocmVmOiBkb2N1bWVudGF0aW9uTGlua31cIiB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiI1wiIGNsYXNzPVwiYXBpLWV4cC1hYm91dF9fZGVzY3JpcHRpb24tbGlua1wiPlJlYWQgbW9kZTwvYT5cblx0XHRcdFx0XHRcdDwvcD5cblx0XHRcdFx0XHQ8L3NlY3Rpb24+XG5cdFx0XHRcdDwvYXJ0aWNsZT5cblx0XHRcdFx0PGRpdiBkYXRhLWJpbmQ9XCJjbGljazogb25BYm91dENsaWNrXCIgY2xhc3M9XCJhcGktZXhwLWFib3V0LWxheWVyXCI+PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L3NlY3Rpb24+XG5gfSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvZmlsdGVyL2Fib3V0TWV0aG9kLmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcclxuXHJcbmZ1bmN0aW9uIENhdGVnb3J5TWVudShwYXJhbXMpIHtcclxuXHRzZWxmID0gdGhpcztcclxuXHJcblx0dGhpcy5zZWxlY3RlZENhdGVnb3J5ID0gcGFyYW1zLnNlbGVjdGVkQ2F0ZWdvcnk7XHJcblx0dmFyIGluaXRDYXRlZ29yeSA9IGtvLnVud3JhcChwYXJhbXMuc2VsZWN0ZWRDYXRlZ29yeSk7XHJcblx0dGhpcy5jYXRlZ29yaWVzID0ga28ub2JzZXJ2YWJsZUFycmF5KE9iamVjdC5rZXlzKHBhcmFtcy5kYXRhKS5tYXAoZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XHJcblx0XHR2YXIgY2hlY2tlZCA9IGluaXRDYXRlZ29yeSA/IGl0ZW0gPT09IGluaXRDYXRlZ29yeTogIWluZGV4O1xyXG5cdFx0Ly8gaW5pdGlhbCBsb2FkXHJcblx0XHRjaGVja2VkICYmIHNlbGYuc2VsZWN0ZWRDYXRlZ29yeShpdGVtKTtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGNoZWNrZWQ6IGtvLm9ic2VydmFibGUoY2hlY2tlZCksXHJcblx0XHRcdG5hbWU6IGl0ZW0sXHJcblx0XHRcdGxpbms6IGZhbHNlXHJcblx0XHR9XHJcblx0fSkpO1xyXG59XHJcblxyXG5DYXRlZ29yeU1lbnUucHJvdG90eXBlLnNlbGVjdENhdGVnb3J5ID0gZnVuY3Rpb24gKGNhdGVnb3J5KSB7XHJcblx0dmFyIGNhdGVnb3J5TmFtZSA9IGNhdGVnb3J5Lm5hbWU7XHJcblx0c2VsZi5zZWxlY3RlZENhdGVnb3J5KGNhdGVnb3J5TmFtZSk7XHJcblx0Y2hlY2tBY3RpdmUoc2VsZi5jYXRlZ29yaWVzLCBjYXRlZ29yeU5hbWUpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjYXRlZ29yeS1tZW51Jywge1xyXG5cdHZpZXdNb2RlbDogQ2F0ZWdvcnlNZW51LFxyXG5cdHRlbXBsYXRlOmBcclxuXHRcdDxhc2lkZSBjbGFzcz1cImFwaS1leHAtc2lkZS1tZW51XCI+XHJcblx0XHRcdDx1bCBkYXRhLWJpbmQ9XCJmb3JlYWNoOiBjYXRlZ29yaWVzXCIgY2xhc3M9XCJhcGktZXhwLXNpZGUtbWVudV9fY29udGFpbmVyIG5hdiBuYXYtcGlsbHMgbmF2LXN0YWNrZWQgdmlzaWJsZS1sZy1ibG9ja1wiPlxyXG5cdFx0XHRcdDxsaSBkYXRhLWJpbmQ9XCJjc3M6IHthY3RpdmU6IGNoZWNrZWR9XCIgcm9sZT1cInByZXNlbnRhdGlvblwiIGNsYXNzPVwiYXBpLWV4cC1zaWRlLW1lbnVfX2l0ZW1cIj5cclxuXHRcdFx0XHRcdDxhIGRhdGEtYmluZD1cImNsaWNrOiAkcGFyZW50LnNlbGVjdENhdGVnb3J5LCB0ZXh0OiBuYW1lXCIgaHJlZj1cIiNcIiBjbGFzcz1cImFwaS1leHAtc2lkZS1tZW51X19saW5rXCI+PC9hPlxyXG5cdFx0XHRcdDwvbGk+XHJcblx0XHRcdDwvdWw+XHJcblx0XHRcdDwhLS1zZWxlY3QtLT5cclxuXHRcdFx0PGRpdiBjbGFzcz1cImFwaS1leHAtc2lkZS1tZW51X19zZWxlY3QgaGlkZGVuLWxnXCI+XHJcblx0XHRcdFx0PCEtLSBrbyB0ZW1wbGF0ZTogeyBub2RlczogJGNvbXBvbmVudFRlbXBsYXRlTm9kZXMsIGRhdGE6ICRjb21wb25lbnQgfSAtLT48IS0tIC9rbyAtLT5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L2FzaWRlPlxyXG5gfSk7XHJcblxyXG5mdW5jdGlvbiBjaGVja0FjdGl2ZShrb0FyciwgYWN0aXZlRWxlbSkge1xyXG5cdGlmICgha29BcnIgJiYgIWFjdGl2ZUVsZW0pIHtyZXR1cm4gZmFsc2U7fVxyXG5cclxuXHRrb0Fycihrb0FycigpLm1hcChmdW5jdGlvbiAob2JqKSB7XHJcblx0XHRpZiAob2JqLm5hbWUgPT09IGFjdGl2ZUVsZW0pIHtcclxuXHRcdFx0b2JqLmNoZWNrZWQodHJ1ZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRvYmouY2hlY2tlZChmYWxzZSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gb2JqO1xyXG5cdH0pKTtcclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvZmlsdGVyL2NhdGVnb3J5TWVudS5jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAyMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHNlbGY7XHJcblxyXG5mdW5jdGlvbiBNZXRob2RzRmlsdGVyKHBhcmFtcykge1xyXG5cdHNlbGYgPSB0aGlzO1xyXG5cdHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSA9IHBhcmFtcy5zZWxlY3RlZENhdGVnb3J5O1xyXG5cdHRoaXMuZGF0YSA9IHBhcmFtcy5kYXRhO1xyXG5cdHRoaXMuc2VsZWN0ZWRNZXRob2RUeXBlID0gcGFyYW1zLnNlbGVjdGVkTWV0aG9kVHlwZTtcclxuXHR0aGlzLnNlbGVjdGVkTWV0aG9kID0gcGFyYW1zLnNlbGVjdGVkTWV0aG9kO1xyXG5cdHRoaXMuc2VsZWN0ZWRNZXRob2ROYW1lID0ga28ub2JzZXJ2YWJsZSgnJyk7XHJcblx0dGhpcy5tZXRob2RzVmlld01vZGVsID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcclxuXHQvLyBzZXRTdWJzY3JpYnRpb25zXHJcblx0dGhpcy5pbml0KClcclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemF0aW9uIHBoYXNlXHJcbiAqL1xyXG5NZXRob2RzRmlsdGVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdHRoaXMudXBkYXRlTWV0aG9kc01vZGVsKGtvLnVud3JhcCh0aGlzLnNlbGVjdGVkTWV0aG9kVHlwZSkpO1xyXG5cclxuXHQvL29uIGNoYW5nZVxyXG5cdHRoaXMuc2VsZWN0ZWRNZXRob2RUeXBlLnN1YnNjcmliZShmdW5jdGlvbiAodmFsKSB7XHJcblx0XHR0aGlzLnVwZGF0ZU1ldGhvZHNNb2RlbCh2YWwpO1xyXG5cdH0sIHRoaXMpXHJcbn07XHJcblxyXG4vKipcclxuICogRmlsdGVycyB0cmFuc2NsdXNpb24gZG9tIG5vZGVzXHJcbiAqIEBwYXJhbSBwYXJhbSB7YXJyYXl9ICRjb21wb25lbnRUZW1wbGF0ZU5vZGVzXHJcbiAqIEBwYXJhbSBpbmRleCB7bnVtYmVyfSBpbmRleCBvZiBlbGVtZW50XHJcbiAqIEByZXR1cm5zIHthcnJheX0gZG9tIG5vZGVzIGFycmF5IGZvciBpbnNlcnRpb25cclxuICovXHJcbk1ldGhvZHNGaWx0ZXIucHJvdG90eXBlLmZpbHRlclRyYW5zY2x1c2lvbiA9IGZ1bmN0aW9uIChwYXJhbSwgaW5kZXgpIHtcclxuXHR2YXIgdGV4dCA9IHBhcmFtLmZpbmQoZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdHJldHVybiBpdGVtLm5vZGVOYW1lID09PSAnI3RleHQnO1xyXG5cdH0pO1xyXG5cdHZhciBlbCA9IHBhcmFtLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG5cdFx0cmV0dXJuIGl0ZW0ubm9kZU5hbWUgIT09ICcjdGV4dCcgJiYgaXRlbS5ub2RlTmFtZSAhPT0gJyNjb21tZW50JztcclxuXHR9KVtpbmRleF07XHJcblx0cmV0dXJuIFt0ZXh0LCBlbCwgdGV4dF07XHJcbn07XHJcblxyXG4vKipcclxuICogVXBkYXRlcyBWTSBmb3IgbWV0aG9kcyBzZWxlY3RcclxuICogQHBhcmFtIG1ldGhvZFR5cGVcclxuICovXHJcbk1ldGhvZHNGaWx0ZXIucHJvdG90eXBlLnVwZGF0ZU1ldGhvZHNNb2RlbCA9IGZ1bmN0aW9uIChtZXRob2RUeXBlKSB7XHJcblx0dmFyIG9iaiA9IHRoaXMuZGF0YVtrby51bndyYXAoc2VsZi5zZWxlY3RlZENhdGVnb3J5KV1bbWV0aG9kVHlwZV18fCB7fSxcclxuXHRcdGFyciA9IFtdLFxyXG5cdFx0c2VsZWN0ZWRNZXRob2QgPSBrby51bndyYXAoc2VsZi5zZWxlY3RlZE1ldGhvZCksXHJcblx0XHRjb3VudCA9IDA7XHJcblxyXG5cdGZvciAodmFyIGkgaW4gb2JqKSB7XHJcblx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShpKSkgeyBjb250aW51ZTsgfVxyXG5cdFx0dmFyIHByb3BlcnR5ID0gb2JqW2ldO1xyXG5cclxuXHRcdHZhciB2bU1ldGhvZCA9ICQuZXh0ZW5kKHt9LCB7XHJcblx0XHRcdGlkOiBwcm9wZXJ0eS5pZCxcclxuXHRcdFx0bmFtZTogcHJvcGVydHkubmFtZSxcclxuXHRcdFx0bGluazogcHJvcGVydHkubGluayxcclxuXHRcdFx0Y2hlY2tlZDoga28ub2JzZXJ2YWJsZSggc2VsZWN0ZWRNZXRob2QgPyBzZWxlY3RlZE1ldGhvZCA9PT0gcHJvcGVydHkuaWQgOiAhY291bnQgKVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKHNlbGVjdGVkTWV0aG9kID09PSBwcm9wZXJ0eS5pZCkge1xyXG5cdFx0XHRzZWxmLnNlbGVjdGVkTWV0aG9kTmFtZShwcm9wZXJ0eS5uYW1lKTtcclxuXHRcdH1cclxuXHJcblx0XHRhcnIucHVzaCh2bU1ldGhvZCk7XHJcblxyXG5cdFx0Ly8gc2V0IGdsb2JhbCBvYnNlcnZhYmxlXHJcblx0XHQhc2VsZWN0ZWRNZXRob2QgJiYgIWNvdW50ICYmIHRoaXMuc2VsZWN0ZWRNZXRob2QocHJvcGVydHkuaWQpO1xyXG5cclxuXHRcdGNvdW50Kys7XHJcblx0fVxyXG5cclxuXHR0aGlzLm1ldGhvZHNWaWV3TW9kZWwoYXJyKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBPbiBzZWxlY3QgaGFuZGxlciBmb3IgbWV0aG9kcyBzZWxlY3RcclxuICogQHBhcmFtIGl0ZW1cclxuICovXHJcbk1ldGhvZHNGaWx0ZXIucHJvdG90eXBlLm9uU2VsZWN0TWV0aG9kID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRzZWxmLnNlbGVjdGVkTWV0aG9kKGl0ZW0uaWQpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdtZXRob2RzLWZpbHRlcicsIHtcclxuXHR2aWV3TW9kZWw6IE1ldGhvZHNGaWx0ZXIsXHJcblx0dGVtcGxhdGU6YFxyXG5cdFx0PHNlY3Rpb24gIGNsYXNzPVwiYXBpLWV4cC1tYWluLWZpbHRlclwiPlxyXG5cdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImFwaS1leHAtZmlsdGVyXCI+XHJcblx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJhcGktZXhwLW1ldGhvZHMgY2xlYXJmaXhcIj5cclxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzcz1cImFwaS1leHAtbWV0aG9kc19fbGFiZWxcIj5NZXRob2RzPC9sYWJlbD5cclxuXHRcclxuXHRcdFx0XHRcdDwhLS1yYWRpb3MtLT5cclxuXHRcdFx0XHRcdDwhLS0ga28gdGVtcGxhdGU6IHsgbm9kZXM6IGZpbHRlclRyYW5zY2x1c2lvbigkY29tcG9uZW50VGVtcGxhdGVOb2RlcywgMCksIGRhdGE6ICRjb21wb25lbnQgfSAtLT48IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0PCEtLXNlbGVjdC0tPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImFwaS1leHAtbWV0aG9kc19fc2VsZWN0XCI+XHJcblx0XHRcdFx0XHRcdDwhLS0ga28gdGVtcGxhdGU6IHsgbm9kZXM6IGZpbHRlclRyYW5zY2x1c2lvbigkY29tcG9uZW50VGVtcGxhdGVOb2RlcywgMSksIGRhdGE6ICRjb21wb25lbnQgfS0tPjwhLS0va28tLT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0PC9zZWN0aW9uPlxyXG5gfSk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9maWx0ZXIvbWV0aG9kc0ZpbHRlci5jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHNlbGY7XHJcblxyXG5mdW5jdGlvbiBSYWRpb0ZpbHRlcihwYXJhbXMpIHtcclxuXHRzZWxmID0gdGhpcztcclxuXHR2YXIgc2VsZWN0ZWRDYXRlZ29yeSA9IGtvLnVud3JhcChwYXJhbXMuc2VsZWN0ZWRDYXRlZ29yeSk7XHJcblx0dmFyIGRhdGEgPSBwYXJhbXMuZGF0YTtcclxuXHR0aGlzLnNlbGVjdGVkTWV0aG9kVHlwZSA9IHBhcmFtcy5zZWxlY3RlZE1ldGhvZFR5cGU7XHJcblx0dGhpcy5SQURJT19JRCA9ICdhcGktZXhwLSc7XHJcblxyXG5cdHRoaXMucmFkaW9zTW9kZWwgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xyXG5cdHRoaXMudXBkYXRlUmFkaW9zTW9kZWwoZGF0YVtzZWxlY3RlZENhdGVnb3J5XSk7XHJcblxyXG5cdHBhcmFtcy5zZWxlY3RlZENhdGVnb3J5LnN1YnNjcmliZShmdW5jdGlvbiAodmFsKSB7XHJcblx0XHR0aGlzLnVwZGF0ZVJhZGlvc01vZGVsKGRhdGFbdmFsXSk7XHJcblx0fSwgdGhpcyk7XHJcbn1cclxuXHJcblJhZGlvRmlsdGVyLnByb3RvdHlwZS51cGRhdGVSYWRpb3NNb2RlbCA9IGZ1bmN0aW9uIChwYXJhbSkge1xyXG5cdHZhciBvYmogPSBwYXJhbSB8fCB7fSxcclxuXHRcdGFyciA9IFtdO1xyXG5cclxuXHRmb3IgKHZhciBpIGluIG9iaikge1xyXG5cdFx0aWYgKCFvYmouaGFzT3duUHJvcGVydHkoaSkpIHsgY29udGludWU7IH1cclxuXHRcdHZhciBpdGVtID0ge1xyXG5cdFx0XHRjaGVja2VkOiBrby5vYnNlcnZhYmxlKGkgPT09ICdBTEwnKSxcclxuXHRcdFx0bmFtZTogaVxyXG5cdFx0fTtcclxuXHRcdGFyci5wdXNoKGl0ZW0pO1xyXG5cdFx0Ly8gaW5pdGlhbCBub3RpZnkgZm9yIGFsbCBzdWJzY3JpYmVyc1xyXG5cdFx0aSA9PT0gJ0FMTCcgJiYgdGhpcy5zZWxlY3RlZE1ldGhvZFR5cGUubm90aWZ5U3Vic2NyaWJlcnMoaSk7XHJcblx0fVxyXG5cclxuXHRhcnIgPSBhcnIuc29ydChjb21wYXJlTWV0aG9kcyk7XHJcblx0dGhpcy5yYWRpb3NNb2RlbChhcnIpO1xyXG5cdHJldHVybiBhcnI7XHJcbn07XHJcblxyXG4vKipcclxuICogT25jaGFuZ2UgaGFuZGxlciBmb3IgUmFkaW8gYnV0dG9uc1xyXG4gKiBAcGFyYW0gaXRlbVxyXG4gKi9cclxuUmFkaW9GaWx0ZXIucHJvdG90eXBlLm9uY2hhbmdlUmFkaW9zID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHR2YXIgcmFkaW9zTW9kZWwgPSBrby51bndyYXAoc2VsZi5yYWRpb3NNb2RlbCkubWFwKGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdGlmIChvYmoubmFtZSA9PT0gaXRlbS5uYW1lKSB7XHJcblx0XHRcdG9iai5jaGVja2VkKHRydWUpO1xyXG5cdFx0XHRzZWxmLnNlbGVjdGVkTWV0aG9kVHlwZShvYmoubmFtZSk7XHJcblx0XHRcdGNvbnNvbGUubG9nKGtvLnVud3JhcChzZWxmLnNlbGVjdGVkTWV0aG9kVHlwZSkpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0b2JqLmNoZWNrZWQoZmFsc2UpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG9iajtcclxuXHR9KTtcclxuXHRzZWxmLnJhZGlvc01vZGVsKHJhZGlvc01vZGVsKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBVbmlxIGlkIGZvciByYWRpbyBidG5cclxuICogQHBhcmFtIG5hbWVcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcblJhZGlvRmlsdGVyLnByb3RvdHlwZS5nZXRJbnB1dElkID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuXHRyZXR1cm4gc2VsZi5SQURJT19JRCArIG5hbWU7XHJcbn07XHJcblxyXG4vKipcclxuICogU29ydCBmdW5jdGlvbiBmb3IgbWV0aG9kcyBhcmF5XHJcbiAqIEBwYXJhbSBmXHJcbiAqIEBwYXJhbSBzXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiBjb21wYXJlTWV0aG9kcyhmLHMpIHtcclxuXHR2YXIgYSA9IGYubmFtZS50b1VwcGVyQ2FzZSgpO1xyXG5cdHZhciBiID0gcy5uYW1lLnRvVXBwZXJDYXNlKCk7XHJcblxyXG5cdGlmIChhID09PSBiKSB7cmV0dXJuIDA7fVxyXG5cdGlmIChhID09PSAnQUxMJyB8fFxyXG5cdFx0KGEgPT09ICdHRVQnICYmIChiID09PSAnUE9TVCcgfHwgYiA9PT0gJ1BVVCcgfHwgYiA9PT0gJ0RFTEVURScpKSB8fFxyXG5cdFx0KGEgPT09ICdQT1NUJyAmJiAoYiA9PT0gJ1BVVCcgfHwgYiA9PT0gJ0RFTEVURScpKSB8fFxyXG5cdFx0KGEgPT09ICdQVVQnICYmIGIgPT09ICdERUxFVEUnKSkge1xyXG5cdFx0cmV0dXJuIC0xO1xyXG5cdH1cclxuXHRyZXR1cm4gMTtcclxufVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ga28uY29tcG9uZW50cy5yZWdpc3RlcigncmFkaW8tZmlsdGVyJywge1xyXG5cdHZpZXdNb2RlbDogUmFkaW9GaWx0ZXIsXHJcblx0dGVtcGxhdGU6YFxyXG5cdFx0PCEtLXJhZGlvcy0tPlxyXG5cdFx0PHNlY3Rpb24gZGF0YS1iaW5kPVwiZm9yZWFjaDogcmFkaW9zTW9kZWxcIiBjbGFzcz1cImFwaS1leHAtbWV0aG9kc19fcmFkaW8tYnV0dG9ucyByYWRpby1idXR0b25zIGNsZWFyZml4XCI+XHJcblx0XHRcdDxkaXYgZGF0YS1iaW5kPVwiY3NzOiB7YWN0aXZlOiBjaGVja2VkfVwiIGNsYXNzPVwiYXBpLWV4cC1tZXRob2RcIj5cclxuXHRcdFx0XHQ8aW5wdXQgZGF0YS1iaW5kPVwiYXR0cjogeyBpZDogJGNvbXBvbmVudC5nZXRJbnB1dElkKG5hbWUpLCBjaGVja2VkOiBjaGVja2VkIH0sIGV2ZW50OiB7Y2hhbmdlOiAkY29tcG9uZW50Lm9uY2hhbmdlUmFkaW9zfVwiXHJcblx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImFwaS1leHAtY29udGVudC1tZXRob2RfX3JhZGlvXCJcclxuXHRcdFx0XHRcdFx0XHRcdHR5cGU9XCJyYWRpb1wiXHJcblx0XHRcdFx0XHRcdFx0XHRuYW1lPVwiYXBpLWV4cC1tZXRob2RzXCI+XHJcblx0XHRcdFx0PGxhYmVsIGRhdGEtYmluZD1cInRleHQ6IG5hbWUsIGF0dHI6IHtmb3I6ICRjb21wb25lbnQuZ2V0SW5wdXRJZChuYW1lKX1cIiBjbGFzcz1cInJhZGlvLWlubGluZSBhcGktZXhwLW1ldGhvZF9fbGFiZWxcIj48L2xhYmVsPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdDwvc2VjdGlvbj5cclxuYH0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvZmlsdGVyL3JhZGlvRmlsdGVyLmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcclxuXHJcbmZ1bmN0aW9uIFBhcmFtc0ZpbHRlcihwYXJhbXMpIHtcclxuXHRzZWxmID0gdGhpcztcclxuXHJcblx0dGhpcy5hbmltYXRpb25TcGVlZCA9IDIwMDtcclxuXHJcblx0Ly8gb2JzZXJ2YWJsZXNcclxuXHR0aGlzLnNlbGVjdGVkTWV0aG9kID0gcGFyYW1zLnNlbGVjdGVkTWV0aG9kO1xyXG5cdHRoaXMuc2VsZWN0ZWRQYXJhbXMgPSBwYXJhbXMuc2VsZWN0ZWRQYXJhbXM7XHJcblx0dGhpcy5zZWxlY3RlZE1ldGhvZERhdGEgPSBwYXJhbXMuc2VsZWN0ZWRNZXRob2REYXRhO1xyXG5cclxuXHR0aGlzLmlzSGlkZGVuID0ga28ub2JzZXJ2YWJsZSh0cnVlKTtcclxuXHR0aGlzLnBhcmFtSW5Gb2N1cyA9IGtvLm9ic2VydmFibGUoe30pO1xyXG5cdHRoaXMucGFyYW1zTW9kZWwgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xyXG5cclxuXHQvLyBjb21wdXRlZFxyXG5cdHRoaXMuaXNEaXJ0eSA9IGtvLmNvbXB1dGVkKHRoaXMuY2hlY2tEaXJ0eSwgdGhpcyk7XHJcblxyXG5cdC8vIHNldFN1YnNjcmlidGlvbnNcclxuXHR0aGlzLmluaXQoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemF0aW9uIHBoYXNlXHJcbiAqL1xyXG5QYXJhbXNGaWx0ZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0dGhpcy51cGRhdGVWaWV3TW9kZWwoKTtcclxuXHR0aGlzLnNlbGVjdGVkTWV0aG9kLnN1YnNjcmliZSh0aGlzLnVwZGF0ZVZpZXdNb2RlbCwgdGhpcyk7XHJcbn07XHJcblxyXG4vKipcclxuICogSW5pdGlhbCBidWlsZCBvZiBTZWxlY3QgTW9kZWxcclxuICovXHJcblBhcmFtc0ZpbHRlci5wcm90b3R5cGUudXBkYXRlVmlld01vZGVsID0gZnVuY3Rpb24gKCkge1xyXG5cdC8vIGNvbnNvbGUuaW5mbygndXBkYXRlVmlld01vZGVsJyk7XHJcblx0dmFyIG9iaiA9IGtvLnVud3JhcChzZWxmLnNlbGVjdGVkTWV0aG9kRGF0YSkucGFyYW1ldGVycyB8fCB7fSxcclxuXHRcdGFyciA9IFtdO1xyXG5cclxuXHRmb3IgKHZhciBpIGluIG9iaikge1xyXG5cdFx0aWYgKCFvYmouaGFzT3duUHJvcGVydHkoaSkpIHtjb250aW51ZTt9XHJcblxyXG5cdFx0Ly8gY29waWVzIGFsbCB2YWx1ZXMgZnJvbSBtb2RlbCB0byB2aWV3LW1vZGVsXHJcblx0XHR2YXIgdm1QYXJhbSA9ICQuZXh0ZW5kKHt9LCBvYmpbaV0pO1xyXG5cclxuXHRcdHZtUGFyYW0udmFsdWUgPSBrby5vYnNlcnZhYmxlKHZtUGFyYW0udmFsdWUgfHwgKHZtUGFyYW0uc2VsZWN0ICYmIHZtUGFyYW0uZGVmYXVsdCkgfHwgJycpO1xyXG5cdFx0Ly9hZGQgb2JzZXJ2YWJsZSBmb3Igc2VsZWN0ZWQgb3B0aW9uc1xyXG5cdFx0aWYgKHZtUGFyYW0uc2VsZWN0KSB7XHJcblx0XHRcdHZtUGFyYW0ub3B0aW9ucyA9IGtvLm9ic2VydmFibGVBcnJheShvYmpbaV0ub3B0aW9ucy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdFx0XHR2YXIgb2JqID0gJC5leHRlbmQoe30sIGl0ZW0pO1xyXG5cdFx0XHRcdG9iai5jaGVja2VkID0ga28ub2JzZXJ2YWJsZShpdGVtLmNoZWNrZWQpO1xyXG5cdFx0XHRcdHJldHVybiBvYmo7XHJcblx0XHRcdH0pKVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vICdkaXJ0eScgZmxhZyB3YXRjaGVyIGZvciBjdXJyZW50IGZpZWxkXHJcblx0XHR2bVBhcmFtLmlzRGlydHkgPSBrby5wdXJlQ29tcHV0ZWQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodGhpcy5zZWxlY3QpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy52YWx1ZSgpICE9PSB0aGlzLmRlZmF1bHQgJiYgdGhpcy52YWx1ZSgpICE9PSAnbm9uZSc7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuICEhKHRoaXMudmFsdWUoKS50b1N0cmluZygpKS50cmltKCkubGVuZ3RoO1xyXG5cdFx0fSwgdm1QYXJhbSk7XHJcblxyXG5cdFx0Ly8gYWRkIGNhbGVuZGFyIGJ0biBmb3IgY3VycmVudCBmaWVsZFxyXG5cdFx0dm1QYXJhbS5oYXNDYWxlbmRhciA9IGkuc2VhcmNoKC8oZGF0ZXx0aW1lKS9nbWkpICE9IC0xO1xyXG5cclxuXHRcdC8vIGFkZCBwb3AtdXAgYnRuIGZvciBjdXJyZW50IGZpZWxkXHJcblx0XHR2bVBhcmFtLmhhc1BvcFVwID0gaS5zZWFyY2goLyhhdHRyYWN0aW9uSWR8dmVudWVJZCkvZ21pKSAhPSAtMTtcclxuXHJcblx0XHRhcnIucHVzaCh2bVBhcmFtKTtcclxuXHR9XHJcblxyXG5cdC8vIHByZXBhcmUgb3V0cHV0IGZvciByZXF1ZXN0XHJcblx0dGhpcy5wYXJhbXNNb2RlbChhcnIpO1xyXG5cdHRoaXMucGFyYW1JbkZvY3VzKHRoaXMucGFyYW1zTW9kZWwoKVswXSk7XHJcblx0dGhpcy5wcmVwYXJlVXJsUGFpcnMoYXJyLCB0aGlzLnNlbGVjdGVkUGFyYW1zKTtcclxuXHRyZXR1cm4gYXJyO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERpcnR5IHBhcmFtcyBmb3JtIG9ic2VydmFibGUgbWV0aG9kXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuUGFyYW1zRmlsdGVyLnByb3RvdHlwZS5jaGVja0RpcnR5ID0gZnVuY3Rpb24gKCkge1xyXG5cdC8vIGNvbnNvbGUuaW5mbygnY2hlY2tEaXJ0eScpO1xyXG5cdHRoaXMucHJlcGFyZVVybFBhaXJzKHRoaXMucGFyYW1zTW9kZWwoKSwgdGhpcy5zZWxlY3RlZFBhcmFtcyk7XHJcblx0dmFyIGRpcnR5ID0gdGhpcy5wYXJhbXNNb2RlbCgpLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG5cdFx0cmV0dXJuIGl0ZW0uaXNEaXJ0eSgpID09PSB0cnVlO1xyXG5cdH0pO1xyXG5cdHJldHVybiBkaXJ0eS5sZW5ndGggPiAwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVudGVyIGtleSBoYW5kbGVyXHJcbiAqIEBwYXJhbSBtb2RlbFxyXG4gKiBAcGFyYW0gZXZlbnRcclxuICovXHJcblBhcmFtc0ZpbHRlci5wcm90b3R5cGUub25FbnRlcktleURvd24gPSBmdW5jdGlvbiAobW9kZWwsIGV2ZW50KSB7XHJcblx0aWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XHJcblx0XHQkKCcjYXBpLWV4cC1nZXQtYnRuJykudHJpZ2dlcignY2xpY2snKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNsaWRlIHRvZ2dsZSBmb3IgcGFyYW1zIGNvbnRhaW5lciBtZXRob2RcclxuICogQHBhcmFtIHZpZXdNb2RlbFxyXG4gKiBAcGFyYW0gZXZlbnRcclxuICovXHJcblBhcmFtc0ZpbHRlci5wcm90b3R5cGUuc2xpZGVUb2dnbGUgPSBmdW5jdGlvbiAodmlld01vZGVsLCBldmVudCkge1xyXG5cdCQoZXZlbnQuY3VycmVudFRhcmdldClcclxuXHRcdC5wYXJlbnRzKCcuanMtc2xpZGUtY29udHJvbCcpXHJcblx0XHQuZmluZCgnLmpzLXNsaWRlLXdyYXBwZXInKVxyXG5cdFx0LnNsaWRlVG9nZ2xlKHZpZXdNb2RlbC5hbmltYXRpb25TcGVlZCwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2aWV3TW9kZWwuaXNIaWRkZW4oIXZpZXdNb2RlbC5pc0hpZGRlbigpKTtcclxuXHRcdH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1hY2hlcyBmb2N1c2VkIHBhcmFtXHJcbiAqIEBwYXJhbSBpdGVtXHJcbiAqL1xyXG5QYXJhbXNGaWx0ZXIucHJvdG90eXBlLm9uRm9jdXMgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG5cdHNlbGYucGFyYW1JbkZvY3VzKGl0ZW0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpbHRlcnMgcGFyYW1zIGJ5IGRlZmluZWQgdmFsdWVcclxuICogQHBhcmFtIGFyclxyXG4gKiBAcGFyYW0ga29PYnNcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5QYXJhbXNGaWx0ZXIucHJvdG90eXBlLnByZXBhcmVVcmxQYWlycyA9IGZ1bmN0aW9uIChhcnIsIGtvT2JzKSB7XHJcblx0Ly8gY29uc29sZS5pbmZvKCdwcmVwYXJlVXJsUGFpcnMnKTtcclxuXHRpZiAoIWFyciB8fCAha29PYnMpIHtyZXR1cm4gZmFsc2U7fVxyXG5cclxuXHRyZXR1cm4ga29PYnMoYXJyLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG5cdFx0cmV0dXJuIChpdGVtLnZhbHVlKCkgJiYgaXRlbS52YWx1ZSgpICE9PSAnbm9uZScgfHwgaXRlbS5kZWZhdWx0KTtcclxuXHR9KSk7XHJcbn07XHJcblxyXG4vKipcclxuICogT24gc2VsZWN0IHZhbHVlIGhhbmRsZXIgZm9yIHBhcmFtcyBzZWxlY3RcclxuICogQHBhcmFtIHBhcmFtIHtvYmplY3R9IHBhcmFtZXRlciB2aWV3LW1vZGVsXHJcbiAqIEBwYXJhbSBvcHRpb24ge29iamVjdH0gb3B0aW9uIHZpZXctbW9kZWxcclxuICovXHJcblBhcmFtc0ZpbHRlci5wcm90b3R5cGUub25TZWxlY3RQYXJhbVZhbHVlID0gZnVuY3Rpb24gKHBhcmFtLCBvcHRpb24pIHtcclxuXHQvLyBjb25zb2xlLmluZm8oJ29uU2VsZWN0UGFyYW1WYWx1ZScpO1xyXG5cdC8vIHBhcmFtLm9wdGlvbnMob3B0aW9ucyk7XHJcblx0cGFyYW0udmFsdWUob3B0aW9uLm5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFBhcmFtcyBjbGVhciBidXR0b24gaGFuZGxlclxyXG4gKiBAcGFyYW0gdm0ge29iamVjdH0gdmlldyBtb2RlbFxyXG4gKiBAcGFyYW0gZSB7b2JqZWN0fSBldmVudFxyXG4gKi9cclxuUGFyYW1zRmlsdGVyLnByb3RvdHlwZS5vblBhcmFtc0NsZWFyID0gZnVuY3Rpb24gKHZtLCBlKSB7XHJcblx0Ly8gY29uc29sZS5pbmZvKCd1cGRhdGVWaWV3TW9kZWwnKTtcclxuXHR2YXIgYXJyID0ga28udW53cmFwKHNlbGYucGFyYW1zTW9kZWwpO1xyXG5cclxuXHRzZWxmLnBhcmFtc01vZGVsKGFyci5tYXAoZnVuY3Rpb24gKHBhcmFtKSB7XHJcblx0XHRwYXJhbS52YWx1ZShwYXJhbS5zZWxlY3QgJiYgcGFyYW0uZGVmYXVsdCB8fCAnJyk7XHJcblxyXG5cdFx0aWYgKHBhcmFtLnNlbGVjdCkge1xyXG5cdFx0XHRwYXJhbS5vcHRpb25zKGtvLnVud3JhcChwYXJhbS5vcHRpb25zKS5tYXAoZnVuY3Rpb24gKG9wdGlvbiwgaW5kZXgpIHtcclxuXHRcdFx0XHRvcHRpb24uY2hlY2tlZCghaW5kZXgpO1xyXG5cdFx0XHRcdHJldHVybiBvcHRpb247XHJcblx0XHRcdH0pKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBwYXJhbTtcclxuXHR9KSk7XHJcblxyXG5cdC8vIHByZXBhcmUgb3V0cHV0IGZvciByZXF1ZXN0XHJcblx0dGhpcy5wYXJhbUluRm9jdXModGhpcy5wYXJhbXNNb2RlbCgpWzBdKTtcclxuXHRjb25zb2xlLmxvZyh0aGlzLnNlbGVjdGVkUGFyYW1zKCkpO1xyXG5cdHRoaXMucHJlcGFyZVVybFBhaXJzKGFyciwgdGhpcy5zZWxlY3RlZFBhcmFtcyk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ3BhcmFtcy1maWx0ZXInLCB7XHJcblx0dmlld01vZGVsOiBQYXJhbXNGaWx0ZXIsXHJcblx0dGVtcGxhdGU6YFxyXG5cdFx0PHNlY3Rpb24gZGF0YS1iaW5kPVwiY3NzOiB7Y2xvc2VkOiBpc0hpZGRlbiwgZGlydHk6IGlzRGlydHl9XCIgY2xhc3M9XCJhcGktZXhwLXBhcmFtcyBqcy1zbGlkZS1jb250cm9sXCI+XHJcblx0XHRcclxuXHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJhcGktZXhwLXBhcmFtcy1oZWFkbGluZVwiPlxyXG5cdFx0XHRcdDxidXR0b24gZGF0YS1iaW5kPVwiY2xpY2s6IHNsaWRlVG9nZ2xlXCIgY2xhc3M9XCJidG4gc2hldnJvbi11cCB0b2dnbGUtYnRuIGJ0bi1pY29uXCIgdHlwZT1cImJ1dHRvblwiPlBhcmFtZXRlcnM8L2J1dHRvbj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYXBpLWV4cC1wYXJhbXMtaGVhZGxpbmUtZWRpdFwiPlxyXG5cdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cImJ0biBhcGktZXhwLXBhcmFtcy1oZWFkbGluZV9fYnRuIGFwaS1leHAtcGFyYW1zLWhlYWRsaW5lX19idG4tY29weVwiPiZuYnNwOzwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0PGJ1dHRvbiBkYXRhLWJpbmQ9XCJjbGljazogb25QYXJhbXNDbGVhclwiIGNsYXNzPVwiYnRuIGFwaS1leHAtcGFyYW1zLWhlYWRsaW5lX19idG4gYXBpLWV4cC1wYXJhbXMtaGVhZGxpbmVfX2J0bi1jbGVhclwiPiZuYnNwOzwvYnV0dG9uPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFxyXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiYXBpLWV4cC1wYXJhbXMtd3JhcHBlciBjbGVhcmZpeCBqcy1zbGlkZS13cmFwcGVyXCI+XHJcblx0XHRcdFx0PCEtLWFib3V0LS0+XHJcblx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJhcGktZXhwLWFib3V0IHZpc2libGUtbGctYmxvY2tcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJhcGktZXhwLWFib3V0LXdyYXBwZXJcIj5cclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJhcGktZXhwLWFib3V0X19idXR0b25cIj48L3NwYW4+XHJcblx0XHRcdFx0XHRcdDxhcnRpY2xlIGNsYXNzPVwiYXBpLWV4cC1hYm91dF9fY29udGVudFwiPlxyXG5cdFx0XHRcdFx0XHRcdDxoNSBkYXRhLWJpbmQ9XCJ0ZXh0OiBwYXJhbUluRm9jdXMoKS5uYW1lXCIgY2xhc3M9XCJhcGktZXhwLWFib3V0X190aXRsZVwiPkFib3V0IEFQSSBhbmQgTWV0aG9kOjwvaDU+XHJcblx0XHRcdFx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJhcGktZXhwLWFib3V0X19kZXNjcmlwdGlvblwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PHAgZGF0YS1iaW5kPVwiaHRtbDogcGFyYW1JbkZvY3VzKCkuZG9jXCI+PC9wPlxyXG5cdFx0XHRcdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0XHRcdFx0PC9hcnRpY2xlPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdDwhLS1wYXJhbXMgZmlsdGVyLS0+XHJcblx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJhcGktZXhwLXBhcmFtcy1maWx0ZXJcIj5cclxuXHRcdFx0XHRcdDxzZWN0aW9uIGRhdGEtYmluZD1cImZvcmVhY2g6IHBhcmFtc01vZGVsXCIgY2xhc3M9XCJhcGktZXhwLXBhcmFtcy1maWx0ZXItZmllbGRzXCI+XHJcblx0XHRcdFx0XHRcdDwhLS1zZWxlY3QtLT5cclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdDwhLS0ga28gaWY6IHNlbGVjdCAtLT5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYXBpLWV4cC1wYXJhbXMtZmlsdGVyX19maWVsZFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGN1c3RvbS1zZWxlY3QgcGFyYW1zPVwiXHJcblx0XHRcdFx0XHRcdFx0XHRcdGRhdGE6ICRkYXRhLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zOiBvcHRpb25zLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRvbnNlbGVjdDogJGNvbXBvbmVudC5vblNlbGVjdFBhcmFtVmFsdWUuYmluZCgkZGF0YSwgJGRhdGEpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRmb2N1czogJGNvbXBvbmVudC5vbkZvY3VzLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZDogdmFsdWVcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDwvY3VzdG9tLXNlbGVjdD5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHQ8IS0tIGtvIGlmbm90OiBzZWxlY3QgLS0+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBkYXRhLWJpbmQ9XCJjc3M6IHsnZGlydHknOiBpc0RpcnR5LCBjYWxlbmRhcjogaGFzQ2FsZW5kYXIsIHBvcHVwOiBoYXNQb3BVcH1cIiBjbGFzcz1cImFwaS1leHAtcGFyYW1zLWZpbHRlcl9fZmllbGRcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxpbnB1dCBkYXRhLWJpbmQ9XCJ0ZXh0SW5wdXQ6IHZhbHVlLCBldmVudDoge2ZvY3VzOiAkY29tcG9uZW50Lm9uRm9jdXMsIGtleWRvd246ICRjb21wb25lbnQub25FbnRlcktleURvd259LCBhdHRyOiB7aWQ6ICdhcGktZXhwLXBhcmFtXycgKyBuYW1lfVwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuIGRhdGEtYmluZD1cInRleHQ6IG5hbWVcIiBjbGFzcz1cImFwaS1leHAtcGFyYW1zLWZpbHRlcl9fcGxhY2Vob2xkZXJcIj48L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uIGNsYXNzPVwiYXBpLWV4cC1wYXJhbXMtZmlsdGVyX19idXR0b25cIj4mbmJzcDs8L2J1dHRvbj5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdDwvc2VjdGlvbj48IS0tcGFyYW1zIGZpbHRlci0tPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdDwvc2VjdGlvbj48IS0tcGFyYW1ldGVycy0tPlxyXG5gfSk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9maWx0ZXIvcGFyYW1zRmlsdGVyLmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcclxuXHJcbmZ1bmN0aW9uIEN1c3RvbVNlbGVjdChwYXJhbXMpIHtcclxuXHR2YXIgREVGQVVMVF9TRUxFQ1RFRCA9IGtvLnVud3JhcChwYXJhbXMub3B0aW9ucylbMF0ubmFtZTtcclxuICBzZWxmID0gdGhpcztcclxuXHJcblx0dGhpcy5jdXJlbnRTZWxlY3REYXRhID0gcGFyYW1zLmRhdGEgfHwgbnVsbDtcclxuXHR0aGlzLm9uRm9jdXMgPSBwYXJhbXMuZm9jdXMgfHwgbnVsbDtcclxuXHJcblx0dGhpcy5vbnNlbGVjdE1ldGhvZCA9IHBhcmFtcy5vbnNlbGVjdDtcclxuXHJcblx0dGhpcy5hbmltYXRpb25TcGVlZCA9IHBhcmFtcy5hbmltYXRpb25TcGVlZCB8fCAyMDA7XHJcblx0dGhpcy5vcHRpb25zID0gcGFyYW1zLm9wdGlvbnM7XHJcblx0dGhpcy52YWx1ZSA9IGtvLnVud3JhcChwYXJhbXMuc2VsZWN0ZWQpIHx8IERFRkFVTFRfU0VMRUNURUQ7XHJcblx0dGhpcy5zZWxlY3RlZE9wdGlvbiA9IGtvLm9ic2VydmFibGUobWFwRm9yQ2hlY2tlZC5jYWxsKHRoaXMsIGtvLnVud3JhcCh0aGlzLm9wdGlvbnMpLCB0aGlzLnZhbHVlKSk7XHJcblxyXG5cdHNldFN1YnNjcmlidGlvbnMuY2FsbCh0aGlzLCBwYXJhbXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRTdWJzY3JpYnRpb25zKHBhcmFtcykge1xyXG5cdC8vIG9uIHNlbGVjdCBtYXAgZm9yIGNoZWNrZWRcclxuXHR0aGlzLnNlbGVjdGVkT3B0aW9uLnN1YnNjcmliZShmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdG1hcEZvckNoZWNrZWQoa28udW53cmFwKHRoaXMub3B0aW9ucyksIHZhbHVlLm5hbWUpO1xyXG5cdFx0dGhpcy5vbnNlbGVjdE1ldGhvZCh2YWx1ZSk7XHJcblx0fSx0aGlzKTtcclxuXHJcblx0Ly8gcXVhbnRpdHkgb2Ygb3B0aW9ucyBjaGVja1xyXG5cdHRoaXMuaXNPbmVPcHRpb24gPSBrby5wdXJlQ29tcHV0ZWQoZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGtvLnVud3JhcCh0aGlzLm9wdGlvbnMpLmxlbmd0aCA8IDI7IC8vIG1vcmUgdGhhbiBvbmUgb3B0aW9uXHJcblx0fSwgdGhpcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1hcEZvckNoZWNrZWQob3B0aW9ucywgbmFtZSkge1xyXG5cdHZhciBzZWxlY3RlZE9wdGlvbjtcclxuXHRvcHRpb25zLm1hcChmdW5jdGlvbiAob3B0aW9uKSB7XHJcblx0XHRvcHRpb24uY2hlY2tlZChvcHRpb24ubmFtZSA9PT0gbmFtZSk7XHJcblx0XHRpZiAob3B0aW9uLm5hbWUgPT09IG5hbWUpIHtzZWxlY3RlZE9wdGlvbiA9IG9wdGlvbn1cclxuXHR9KTtcclxuXHRyZXR1cm4gc2VsZWN0ZWRPcHRpb247XHJcbn1cclxuXHJcbkN1c3RvbVNlbGVjdC5wcm90b3R5cGUuc2xpZGVUb2dnbGUgPSBmdW5jdGlvbihpdGVtLCBldmVudCkge1xyXG5cdHRoaXMub25Gb2N1cyAmJiB0aGlzLm9uRm9jdXModGhpcy5jdXJlbnRTZWxlY3REYXRhKTtcclxuXHRpZiAoa28udW53cmFwKHRoaXMuaXNPbmVPcHRpb24pKSB7cmV0dXJuIGZhbHNlfVxyXG5cdHZhciBlbCA9IGZpbmRFbGVtZW50KGV2ZW50KTtcclxuXHRlbC53cmFwcGVyLnNsaWRlVG9nZ2xlKHRoaXMuYW5pbWF0aW9uU3BlZWQpO1xyXG5cdGVsLmxheWVyLnRvZ2dsZUNsYXNzKCdoaWRkZW4nKTtcclxufTtcclxuXHJcblxyXG5DdXN0b21TZWxlY3QucHJvdG90eXBlLm9uU2VsZWN0ID0gZnVuY3Rpb24gKGl0ZW0sIGV2ZW50KSB7XHJcblx0bWFwRm9yQ2hlY2tlZChrby51bndyYXAodGhpcy5vcHRpb25zKSwgaXRlbS5uYW1lKTtcclxuXHR0aGlzLnNlbGVjdGVkT3B0aW9uKGl0ZW0pO1xyXG5cdHRoaXMub25zZWxlY3RNZXRob2QoaXRlbSk7XHJcblx0dGhpcy5zbGlkZVRvZ2dsZShpdGVtLCBldmVudCk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBmaW5kRWxlbWVudChldmVudCkge1xyXG5cdHZhciBwYXJlbnQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnBhcmVudHMoJy5qcy1jdXN0b20tc2VsZWN0Jyk7XHJcblx0cmV0dXJuIHtcclxuXHRcdHdyYXBwZXI6IHBhcmVudC5maW5kKCcuanMtY3VzdG9tLXNlbGVjdC13cmFwcGVyJyksXHJcblx0XHRsYXllcjogcGFyZW50LmZpbmQoJy5qcy1jdXN0b20tc2VsZWN0LWxheWVyJylcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ga28uY29tcG9uZW50cy5yZWdpc3RlcignY3VzdG9tLXNlbGVjdCcsIHtcclxuICB2aWV3TW9kZWw6IEN1c3RvbVNlbGVjdCxcclxuICB0ZW1wbGF0ZTogYFxyXG5cdDxkaXYgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3QganMtY3VzdG9tLXNlbGVjdFwiPlxyXG5cdFx0PGRpdiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdC13cmFwcGVyXCI+XHJcblx0XHRcdDxzZWxlY3QgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2ZpZWxkXCIgbmFtZT1cImFwaS1leHAtbWV0aG9kXCIgZGF0YS1iaW5kPVwib3B0aW9uczogb3B0aW9ucywgb3B0aW9uc1RleHQ6ICduYW1lJywgdmFsdWU6IHNlbGVjdGVkT3B0aW9uXCI+PC9zZWxlY3Q+XHJcblx0XHRcdFx0PHNwYW4gY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX3BsYWNlaG9sZGVyXCI+XHJcblx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgcmVhZG9ubHk9XCJcIiBkYXRhLWJpbmQ9XCJjbGljazogc2xpZGVUb2dnbGUsIHZhbHVlOiBzZWxlY3RlZE9wdGlvbigpLm5hbWUsIGF0dHI6IHtkaXNhYmxlZDogaXNPbmVPcHRpb259XCI+XHJcblx0XHRcdFx0PGIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2NoZXZyb25cIiBkYXRhLWJpbmQ9XCJjc3M6IHtoaWRkZW46IGlzT25lT3B0aW9ufVwiPiZuYnNwOzwvYj5cclxuXHRcdFx0PC9zcGFuPlxyXG5cdFx0XHQ8dWwgZGF0YS1iaW5kPVwiZm9yZWFjaDogb3B0aW9uc1wiIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19saXN0IGpzLWN1c3RvbS1zZWxlY3Qtd3JhcHBlclwiPlxyXG5cdFx0XHRcdDxsaSBkYXRhLWJpbmQ9XCJjc3M6IHsnYWN0aXZlJzogY2hlY2tlZH1cIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9faXRlbVwiPlxyXG5cdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9faXRlbS1sYWJlbFwiXHJcblx0XHRcdFx0XHRcdFx0XHRcdGRhdGEtYmluZD1cImNsaWNrOiAkY29tcG9uZW50Lm9uU2VsZWN0LmJpbmQoJGNvbXBvbmVudCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRleHQ6IG5hbWUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNzczogeydhY3RpdmUnOiBjaGVja2VkfSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YXR0cjogeydkYXRhLXZhbHVlJzogbmFtZX1cIj48L2J1dHRvbj5cclxuXHRcdFx0XHRcdDxhIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19pdGVtLWxpbmtcIiB0YXJnZXQ9XCJfYmxhbmtcIiBkYXRhLWJpbmQ9XCJhdHRyOiB7aHJlZjogbGlua30sIGNzczogeydoaWRkZW4nOiAhbGlua31cIj4mbmJzcDs8L2E+XHJcblx0XHRcdFx0PC9saT5cclxuXHRcdFx0PC91bD5cclxuXHRcdDwvZGl2PlxyXG5cdFx0PGRpdiBkYXRhLWJpbmQ9XCJjbGljazogc2xpZGVUb2dnbGVcIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdC1sYXllciBqcy1jdXN0b20tc2VsZWN0LWxheWVyIGhpZGRlblwiPjwvZGl2PlxyXG5cdDwvZGl2PlxyXG5gfSk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9jb21tb24vY3VzdG9tU2VsZWN0LmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcclxuXHJcbmZ1bmN0aW9uIEVycm9yUG9wVXAocGFyYW1zKSB7XHJcblx0c2VsZiA9IHRoaXM7XHJcblx0dGhpcy5zdGF0dXMgPSBrby5vYnNlcnZhYmxlKCcnKTtcclxuXHR0aGlzLnN0YXR1c1RleHQgPSBrby5vYnNlcnZhYmxlKCcnKTtcclxuXHR0aGlzLmRldGFpbHMgPSBrby5vYnNlcnZhYmxlKGBgKTtcclxuXHRwYXJhbXMub25FcnJvci5zdWJzY3JpYmUoZnVuY3Rpb24oZXJyb3JPYmopIHtcclxuXHRcdHRoaXMuc3RhdHVzKE9iamVjdC5nZXRQcm9wKGVycm9yT2JqLCAnLnJlc3BvbnNlSlNPTi5lcnJvcnNbMF0uc3RhdHVzJykgfHwgZXJyb3JPYmouc3RhdHVzIHx8ICd1bm5vd24nKTtcclxuXHRcdHRoaXMuc3RhdHVzVGV4dChPYmplY3QuZ2V0UHJvcChlcnJvck9iaiwgJy5yZXNwb25zZUpTT04uZXJyb3JzWzBdLnN0YXR1c1RleHQnKSB8fCBlcnJvck9iai5zdGF0dXNUZXh0IHx8ICcnKTtcclxuXHRcdHRoaXMuZGV0YWlscyhPYmplY3QuZ2V0UHJvcChlcnJvck9iaiwgJy5yZXNwb25zZUpTT04uZXJyb3JzWzBdLmRldGFpbCcpIHx8ICd1bm5vd24nKTtcclxuXHRcdHRoaXMudG9nZ2xlUG9wVXAoKTtcclxuXHR9LCB0aGlzLCAnZXJyb3InKTtcclxufVxyXG5cclxuRXJyb3JQb3BVcC5wcm90b3R5cGUudG9nZ2xlUG9wVXAgPSBmdW5jdGlvbiAoKSB7XHJcblx0JCgnI2Vycm9yLW1vZGFsJykubW9kYWwoJ3Nob3cnKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ga28uY29tcG9uZW50cy5yZWdpc3RlcignZXJyb3ItcG9wLXVwJywge1xyXG5cdHZpZXdNb2RlbDogRXJyb3JQb3BVcCxcclxuXHR0ZW1wbGF0ZTpgXHJcblx0XHQ8c2VjdGlvbiBpZD1cImVycm9yLW1vZGFsXCIgY2xhc3M9XCJtb2RhbCBmYWRlXCIgdGFiaW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIj5cclxuXHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZ1wiIHJvbGU9XCJkb2N1bWVudFwiPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50IGVycm9yLXBvcC11cFwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxyXG5cdFx0XHRcdFx0XHQ8aDIgY2xhc3M9XCJlcnJvci10aXRsZVwiPkVycm9yIDxzcGFuIGRhdGEtYmluZD1cInRleHQ6IHN0YXR1c1wiPjwvc3Bhbj46IDxzcGFuIGRhdGEtYmluZD1cInRleHQ6IHN0YXR1c1RleHRcIj48L3NwYW4+PC9oMj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cclxuXHRcdFx0XHRcdFx0PHAgZGF0YS1iaW5kPVwidGV4dDogZGV0YWlsc1wiIGNsYXNzPVwiZXJyb3ItZGV0YWlsc1wiPjwvcD5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxyXG5cdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tYWNjZXB0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5PazwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+PCEtLSAvLm1vZGFsLWNvbnRlbnQgLS0+XHJcblx0XHRcdDwvZGl2PjwhLS0gLy5tb2RhbC1kaWFsb2cgLS0+XHJcblx0XHQ8L3NlY3Rpb24+PCEtLSAvLm1vZGFsIC0tPlxyXG5gfSk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9wb3B1cHMvZXJyb3IuY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcbnRvZG86IHNpbmdsZSAtIGZpcnN0IGxvYWQ7XHJcbnRvZG86IHBhZ2luZyAocGFyYW1zKVxyXG50b2RvOiB1bHIgcGFyc2VcclxudG9kbzogZmllbGRzIHZhbGlkYXRpb25cclxuICovXHJcblxyXG52YXIgc2VsZjtcclxuXHJcbmZ1bmN0aW9uIENhcmRHcm91cChwYXJhbXMpIHtcclxuXHRzZWxmID0gdGhpcztcclxuXHR0aGlzLnVybCA9IHRoaXMudXJsIHx8IHBhcmFtcy51cmw7XHJcblx0dGhpcy5jb25maWcgPSBnZXRDb25maWcocGFyYW1zKTtcclxuXHR0aGlzLmRhdGEgPSBwcmVwYXJlRGF0YShwYXJhbXMsIHRoaXMuY29uZmlnLl9DT05GSUcpO1xyXG5cdHRoaXMuZ3JvdXBJbmRleCA9IHBhcmFtcy5ncm91cEluZGV4IHx8IDA7XHJcblx0dGhpcy5zZWN0aW9uSW5kZXggPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHBhcmFtcy5zZWN0aW9uSW5kZXgpO1xyXG5cdHRoaXMuY29sb3JDbGFzcyA9IHBhcmFtcy5jb2xvckNsYXNzO1xyXG5cdHRoaXMuZ2V0TW9yZSA9IHBhcmFtcy5nZXRNb3JlO1xyXG5cdHRoaXMucGFnZSA9IGdldFBhZ2luZ0luZm8ocGFyYW1zLCB0aGlzLmRhdGEucGFnZSwgdGhpcy51cmwpO1xyXG5cdHRoaXMuY29sbGFwc2VJZCA9IGdldENvbGxhcHNlSWQoKTtcclxuXHR0aGlzLl9oYXNFdmVudHNQYW5lbCA9IGZhbHNlO1xyXG59XHJcblxyXG5DYXJkR3JvdXAucHJvdG90eXBlLnNvcnRCeUNvbmZpZyA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcblx0aWYgKHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnW2Eua2V5XSAmJiB0aGlzLmNvbmZpZ1tiLmtleV0gJiYgdGhpcy5jb25maWdbYS5rZXldLl9DT05GSUcgJiYgdGhpcy5jb25maWdbYi5rZXldLl9DT05GSUcpIHtcclxuXHRcdHZhciBpMSA9IHRoaXMuY29uZmlnW2Eua2V5XS5fQ09ORklHLmluZGV4O1xyXG5cdFx0dmFyIGkyID0gdGhpcy5jb25maWdbYi5rZXldLl9DT05GSUcuaW5kZXg7XHJcblx0XHRyZXR1cm4gaTEgLSBpMjtcclxuXHR9XHJcblx0cmV0dXJuIDA7XHJcbn07XHJcblxyXG5DYXJkR3JvdXAucHJvdG90eXBlLmNoZWNrSWZIYXNFdmVudHNMaXN0ID0gZnVuY3Rpb24gKGtleSkge1xyXG5cdHJldHVybiBzZWxmLl9oYXNFdmVudHNQYW5lbCA9IGtleSA9PT0gJ2V2ZW50cycgfHwgc2VsZi5faGFzRXZlbnRzUGFuZWw7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ3BhbmVsLWdyb3VwJywge1xyXG5cdHZpZXdNb2RlbDogQ2FyZEdyb3VwLFxyXG5cdHRlbXBsYXRlOmBcclxuXHRcdDxzZWN0aW9uIGRhdGEtYmluZD1cImZvcmVhY2hwcm9wOiB7ZGF0YTogZGF0YSwgc29ydEZuOiBzb3J0QnlDb25maWcuYmluZCgkY29tcG9uZW50KX1cIiBjbGFzcz1cInBhbmVsLWdyb3VwXCI+XHJcblx0XHRcdDwhLS1wYW5lbC0tPlxyXG5cdFx0XHQ8cGFuZWwgZGF0YS1iaW5kPVwiY3NzOiB7J2hhcy1ldmVudHMtbGlzdCc6ICRjb21wb25lbnQuY2hlY2tJZkhhc0V2ZW50c0xpc3Qoa2V5KX1cIiBwYXJhbXM9XCIkZGF0YTogJGRhdGEsICRpbmRleDogJGluZGV4LCBwYW5lbEdyb3VwOiAkY29tcG9uZW50LCBzb3J0QnlDb25maWc6ICRjb21wb25lbnQuc29ydEJ5Q29uZmlnXCI+PC9wYW5lbD5cclxuXHRcdDwvc2VjdGlvbj5cclxuYH0pO1xyXG5cclxuLyoqXHJcbiAqIENvbmZpZ3VyZXMgYW5kIHBhcmFtcyBmb3IgZWFjaCBwYW5lbCBncm91cFxyXG4gKiBAcGFyYW0gcGFyYW1zXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Q29uZmlnKHBhcmFtcykge1xyXG5cdHNlbGYuZGVlcFByb3AgPSBwYXJhbXMuZGVlcFByb3AgfHwgJyc7XHJcblx0Ly8gbWFpbiBjb25maWdcclxuXHRpZiAoIXNlbGYuZGVlcFByb3AgJiYgIXBhcmFtcy5jb25maWcpIHtcclxuXHRcdC8vIHBhbmVsR3JvdXAgaW5kZXggLSAwXHJcblxyXG5cdFx0Ly8gZ2V0IGZ1bGwgY29uZmlnO1xyXG5cdFx0dmFyIGZpbHRlciA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUocGFyYW1zLmZpbHRlcik7XHJcblxyXG5cdFx0Ly8gZ2V0IGN1cnJlbnQgbWV0aG9kIGNvbmZpZ1xyXG5cdFx0dmFyIG1ldGhvZENvbmZpZyA9IGZpbHRlcltwYXJhbXMucmVxSWRdIHx8IHt9O1xyXG5cclxuXHRcdC8vIG1ldGhvZCBjb25maWcgaW5oZXJpdHMgZ2xvYmFsIGNvbmZpZ1xyXG5cdFx0bWV0aG9kQ29uZmlnLl9DT05GSUcgID0gJC5leHRlbmQodHJ1ZSwge30sIGZpbHRlci5fR0xPQkFMX0NPTkZJRywgbWV0aG9kQ29uZmlnLl9DT05GSUcpO1xyXG5cclxuXHRcdHJldHVybiBtZXRob2RDb25maWc7XHJcblx0fSBlbHNlIHtcclxuXHRcdC8vIHBhbmVsR3JvdXAgaW5kZXggPiAwXHJcblx0XHRyZXR1cm4gcGFyYW1zLmNvbmZpZyB8fCB7fVxyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERhdGEgbWFuaXB1bGF0aW9uc1xyXG4gKiBAcGFyYW0gcGFyYW1zXHJcbiAqIEByZXR1cm5zIHsqfHt9fVxyXG4gKi9cclxuZnVuY3Rpb24gcHJlcGFyZURhdGEocGFyYW1zLCBjb25maWcpIHtcclxuXHR2YXIgZGF0YSA9IHBhcmFtcyAmJiAkLmV4dGVuZCh0cnVlLCB7fSwgcGFyYW1zLmRhdGEpIHx8IHt9O1xyXG5cdHVud3JhcHBPYmplY3RzKGRhdGEsIGNvbmZpZyk7XHJcblx0cmVtb3ZlRGVwcmVjYXRlZChkYXRhLCBjb25maWcpO1xyXG5cdHJldHVybiB3cmFwcFByaW1pdGl2ZXMoZGF0YSwgcGFyYW1zLl9wcm9wVGl0bGUpO1xyXG59XHJcblxyXG4vKipcclxuICogR2F0aGVycyBhbGwgc3RhbmQgYWxvbmUgcHJvcHMgaW4gdG8gb25lIG9iamVjdFxyXG4gKiBAcGFyYW0gZGF0YSB7b2JqZWN0fVxyXG4gKiBAcGFyYW0gX3Byb3BUaXRsZSB7c3RyaW5nfVxyXG4gKiBAcmV0dXJucyB7b2JqZWN0fSByZXZpc2VkIGRhdGFcclxuICovXHJcbmZ1bmN0aW9uIHdyYXBwUHJpbWl0aXZlcyhkYXRhLCBfcHJvcFRpdGxlKSB7XHJcblx0dmFyIG5ld0RhdGEgPSB7fSwgcHJvcCA9IF9wcm9wVGl0bGUgfHwgJ29iamVjdCcsIHZhbCwga2V5O1xyXG5cclxuXHQvLyBnYXRoZXJpbmcgYWxsIHByaW1pdGl2ZSBwcm9wcyBpbiBhZGRpdGlvbmFsIHBhbmVsXHJcblx0Zm9yIChrZXkgaW4gZGF0YSkge1xyXG5cdFx0aWYgKCFkYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtjb250aW51ZTt9XHJcblx0XHR2YWwgPSBkYXRhW2tleV07XHJcblxyXG5cdFx0aWYgKHR5cGVvZiB2YWwgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdG5ld0RhdGFbcHJvcF0gPSBuZXdEYXRhW3Byb3BdIHx8IHt9O1xyXG5cdFx0XHRuZXdEYXRhW3Byb3BdW2tleV0gPSB2YWw7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRuZXdEYXRhW2tleV0gPSB2YWw7XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBuZXdEYXRhXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVbndyYXBzIG9iamVjdHNcclxuICogQHBhcmFtIG9iaiB7b2JqZWN0fVxyXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBjaGFuZ2VkXHJcbiAqL1xyXG5mdW5jdGlvbiByZW1vdmVEZXByZWNhdGVkKG9iaiwgY29uZmlnKSB7XHJcblx0dmFyIGRlcHJlY2F0ZWQgPSBjb25maWcgJiYgY29uZmlnLmRlcHJlY2F0ZWQgfHwgW107XHJcblxyXG5cdGRlcHJlY2F0ZWQubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcblx0XHRpZiAob2JqW2l0ZW1dKSB7XHJcblx0XHRcdGRlbGV0ZSBvYmpbaXRlbV1cclxuXHRcdH1cclxuXHRcdHJldHVybiBpdGVtO1xyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gb2JqO1xyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBkZXByZWNhdGVkIG9iamVjdHNcclxuICogQHBhcmFtIG9iaiB7b2JqZWN0fVxyXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBjaGFuZ2VkXHJcbiAqL1xyXG5mdW5jdGlvbiB1bndyYXBwT2JqZWN0cyhvYmosIGNvbmZpZykge1xyXG5cdHZhciB1bndyYXBwID0gY29uZmlnICYmIGNvbmZpZy51bndyYXBwIHx8IFtdO1xyXG5cclxuXHR1bndyYXBwLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG5cdFx0dmFyIHZhbCA9IG9ialtpdGVtXTtcclxuXHRcdGlmICh2YWwpIHtcclxuXHRcdFx0dmFyIGFyciA9IE9iamVjdC5rZXlzKHZhbCk7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIHByb3AgPSBhcnJbaV07XHJcblx0XHRcdFx0b2JqW3Byb3BdID0gdmFsW3Byb3BdO1xyXG5cdFx0XHR9XHJcblx0XHRcdGRlbGV0ZSBvYmpbaXRlbV07XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gaXRlbTtcclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIG9iajtcclxufVxyXG5cclxuLyoqXHJcbiAqIFByZXBhcmVzIGRhdGEgZm9yIHBhZ2luZ1xyXG4gKiBAcGFyYW0gcGFnZU9ialxyXG4gKiBAcGFyYW0gcGFyYW1zXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UGFnaW5nSW5mbyhwYXJhbXMsIHBhZ2VPYmosIHVybCkge1xyXG5cdHZhciBwYWdlUGFyYW0sIHNpemU7XHJcblxyXG5cdGlmIChwYWdlT2JqKXtcclxuXHRcdHNpemUgPSBwYXJhbXMuY2FyZFNpemUgfHwgcGFnZU9iai5zaXplO1xyXG5cdFx0cGFnZVBhcmFtID0gcGFyYW1zLnBhZ2VQYXJhbSB8fCBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHVybCkuZmluZChmdW5jdGlvbiAoaXRlbSkge1xyXG5cdFx0XHRyZXR1cm4gaXRlbS5uYW1lID09PSAncGFnZSc7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5wYWdlID0ge1xyXG5cdFx0XHRwYXJhbWV0ZXI6IHBhZ2VQYXJhbSAmJiBwYWdlUGFyYW0udmFsdWUsXHJcblx0XHRcdHNpemU6IHNpemVcclxuXHRcdH07XHJcblx0fVxyXG5cdHJldHVybiBudWxsO1xyXG59XHJcblxyXG4vKipcclxuICogUHJvdmlkZXMgaWQgc3RyIGZvciBwYW5lbCAnY29sbGFwc2UgdG9nZ2xlJyBsb2dpY1xyXG4gKiBAcGFyYW0gc3RyXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRDb2xsYXBzZUlkKHN0cikge1xyXG5cdHZhciBjbGFzc05hbWUgPSBzdHIgfHwgJ2NhcmQtcGFuZWwtYm9keS0nO1xyXG5cdHJldHVybiBbXHJcblx0XHRjbGFzc05hbWUsXHJcblx0XHRzZWxmLnNlY3Rpb25JbmRleCxcclxuXHRcdHNlbGYuZ3JvdXBJbmRleFxyXG5cdF0uam9pbignJyk7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYW5lbEdyb3VwLmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcclxuXHJcbmZ1bmN0aW9uIGNhcmRDb21wb25lbnQocGFyYW1zKSB7XHJcblx0c2VsZiA9IHRoaXM7XHJcblx0dGhpcy5rZXkgPSBwYXJhbXMuJGRhdGEua2V5O1xyXG5cdHRoaXMuJGRhdGEgPSBwYXJhbXMuJGRhdGE7XHJcblx0dGhpcy4kaW5kZXggPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHBhcmFtcy4kaW5kZXgpO1xyXG5cdHRoaXMucGFuZWxHcm91cCA9IHBhcmFtcy5wYW5lbEdyb3VwO1xyXG5cdHRoaXMucGFnZSA9IHRoaXMucGFuZWxHcm91cC5wYWdlO1xyXG5cdHRoaXMuY29sb3JDbGFzcyA9IHRoaXMucGFuZWxHcm91cC5jb2xvckNsYXNzIHx8ICcnO1xyXG5cdHRoaXMuY29uZmlnID0gZ2V0UGFuZWxDb25maWcodGhpcy5wYW5lbEdyb3VwLmNvbmZpZywgdGhpcy5rZXkpO1xyXG5cdHRoaXMuaXNFeHBhbmRlZCA9IGlzRXhwYW5kZWQodGhpcy5jb25maWcpO1xyXG5cdHRoaXMuY29sbGFwc2VJZCA9IHRoaXMucGFuZWxHcm91cC5jb2xsYXBzZUlkICsgdGhpcy4kaW5kZXg7XHJcblx0dGhpcy5pc0FjdGl2ZSA9IGtvLm9ic2VydmFibGUodGhpcy5pc0V4cGFuZGVkKTtcclxufVxyXG5cclxuY2FyZENvbXBvbmVudC5wcm90b3R5cGUuc2V0QWN0aXZlID0gZnVuY3Rpb24gKG1vZGVsLCBldmVudCkge1xyXG5cdHRoaXMuaXNBY3RpdmUoIXRoaXMuaXNBY3RpdmUoKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyBjb25maWcgZm9yIGVhY2ggcGFuZWxcclxuICogQHBhcmFtIGtleSB7c3RyaW5nfSBrZXkgb2YgcGFuZWwgb2JqZWN0XHJcbiAqIEByZXR1cm5zIHtvYmplY3R9IGNvbmZpZ1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UGFuZWxDb25maWcoY29uZmlnLCBrZXkpIHtcclxuXHR2YXIgc3ViQ29uZmlnID0gY29uZmlnW2tleV0gfHwge307XHJcblxyXG5cdHN1YkNvbmZpZy5fQ09ORklHID0gJC5leHRlbmQodHJ1ZSwge30sIGNvbmZpZy5fQ09ORklHLCBzdWJDb25maWcuX0NPTkZJRyk7XHJcblx0cmV0dXJuIHN1YkNvbmZpZztcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBmb3IgJ2NvbGxhcHNlZCcgY29uZmlnIGZvciBlYWNoIHBhbmVsXHJcbiAqIEBwYXJhbSBrZXkge3N0cmluZ30ga2V5IG9mIHBhbmVsIG9iamVjdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gZm9yIGNzcyBjbGFzcyBhZGQvcmVtb3ZlXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0V4cGFuZGVkKGNvbmZpZykge1xyXG5cdHJldHVybiAhKE9iamVjdC5nZXRQcm9wKGNvbmZpZywgJy5fQ09ORklHLmNvbGxhcHNlZCcpIHx8IGZhbHNlKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdwYW5lbCcsIHtcclxuXHR2aWV3TW9kZWw6IGNhcmRDb21wb25lbnQsXHJcblx0dGVtcGxhdGU6YFxyXG5cdFx0PHNlY3Rpb24gZGF0YS1iaW5kPVwiY3NzOiB7W2NvbG9yQ2xhc3NdOiB0cnVlLCBhY3RpdmU6IGlzQWN0aXZlfVwiIGNsYXNzPVwicGFuZWwgcGFuZWwtcHJpbWFyeVwiPlxyXG5cdFx0XHQ8IS0tcGFuZWwtaGVhZGluZy0tPlxyXG5cdFx0XHQ8cGFuZWwtaGVhZGluZyBwYXJhbXM9XCJjb25maWc6IGNvbmZpZywgZGF0YTogJGRhdGEsIGluZGV4OiAkaW5kZXgsIHBhZ2U6IHBhZ2UsIHNldEFjdGl2ZTogc2V0QWN0aXZlLmJpbmQoJGNvbXBvbmVudCksIGNvbGxhcHNlSWQ6IGNvbGxhcHNlSWQsIGNvbG9yQ2xhc3M6IGNvbG9yQ2xhc3MsIGlzRXhwYW5kZWQ6IGlzRXhwYW5kZWRcIj48L3BhbmVsLWhlYWRpbmc+XHJcblx0XHRcdFxyXG5cdFx0XHQ8IS0tcGFuZWwtYm9keS0tPlxyXG5cdFx0XHQ8c2VjdGlvbiBkYXRhLWJpbmQ9XCJhdHRyOiB7J2lkJzogY29sbGFwc2VJZH0sIGNzczogeydpbic6IGlzRXhwYW5kZWR9XCIgY2xhc3M9XCJwYW5lbC1jb2xsYXBzZSBjb2xsYXBzZVwiPlx0XHRcdFx0XHJcblx0XHRcdFx0PCEtLSBrbyBpZjogKHR5cGVvZiAkZGF0YS52YWx1ZSA9PT0gJ29iamVjdCcgJiYgISQuaXNBcnJheSgkZGF0YS52YWx1ZSkpIC0tPlxyXG5cdFx0XHRcdFx0PG9iamVjdC1wYW5lbC1ib2R5IHBhcmFtcz1cImNvbmZpZzogY29uZmlnLCBkYXRhOiAkZGF0YSwgaW5kZXg6ICRpbmRleCwgcGFuZWxHcm91cDogcGFuZWxHcm91cCwgcGFnZTogcGFnZSwgY29sbGFwc2VJZDogY29sbGFwc2VJZFwiPjwvb2JqZWN0LXBhbmVsLWJvZHk+XHJcblx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFx0PCEtLSBrbyBpZjogKHR5cGVvZiAkZGF0YS52YWx1ZSA9PT0gJ29iamVjdCcgJiYgJC5pc0FycmF5KCRkYXRhLnZhbHVlKSkgLS0+XHJcblx0XHRcdFx0XHQ8YXJyYXktcGFuZWwtYm9keSBwYXJhbXM9XCJjb25maWc6IGNvbmZpZywgZGF0YTogJGRhdGEsIGluZGV4OiAkaW5kZXgsIHBhbmVsR3JvdXA6IHBhbmVsR3JvdXBcIj48L2FycmF5LXBhbmVsLWJvZHk+XHJcblx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdDwvc2VjdGlvbj5cclxuYH0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL3BhbmVsLmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDI3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcclxuXHJcbi8qKlxyXG4gKiBQYWdpbmF0aW9uIGVsZW1lbnRcclxuICogQHBhcmFtIHBhcmFtc1xyXG4gKi9cclxuZnVuY3Rpb24gcGFnaW5hdGlvbihwYXJhbXMpIHtcclxuXHR0aGlzLnBhZ2VQYXJhbSA9IHBhcmFtcy5wYWdlUGFyYW07XHJcblx0dGhpcy50b3RhbFBhZ2VzID0gK3BhcmFtcy50b3RhbFBhZ2VzO1xyXG5cdHRoaXMubnVtYmVyID0gK3BhcmFtcy5udW1iZXI7XHJcblx0dGhpcy5maXJzdCA9ICEhdGhpcy5udW1iZXI7XHJcblx0dGhpcy5sYXN0ID0gdGhpcy5udW1iZXIgPCB0aGlzLnRvdGFsUGFnZXMgLSAxO1xyXG5cdHRoaXMucmVxdWVzdEJ0biA9ICQoJyNhcGktZXhwLWdldC1idG4nKTtcclxuXHRzZWxmID0gdGhpcztcclxufVxyXG5cclxuLyoqXHJcbiAqIGdldCBuZXh0IHBhZ2VcclxuICovXHJcbnBhZ2luYXRpb24ucHJvdG90eXBlLmdldFByZXZQYWdlID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciB2YWwgPSB0aGlzLnBhZ2VQYXJhbSgpO1xyXG5cdHRoaXMucGFnZVBhcmFtKHZhbCA+IDAgPyB2YWwgLSAxIDogMCk7XHJcblx0dGhpcy5yZXF1ZXN0QnRuLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogZ2V0IHByZXYgcGFnZVxyXG4gKi9cclxucGFnaW5hdGlvbi5wcm90b3R5cGUuZ2V0TmV4dFBhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHZhbCA9IHRoaXMubnVtYmVyO1xyXG5cdHRoaXMucGFnZVBhcmFtKHZhbCA8IHRoaXMudG90YWxQYWdlcyAtIDEgPyB2YWwgICsgMTogdmFsKTtcclxuXHR0aGlzLnJlcXVlc3RCdG4udHJpZ2dlcignY2xpY2snKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ga28uY29tcG9uZW50cy5yZWdpc3RlcigncGFnaW5hdGlvbicsIHtcclxuXHR2aWV3TW9kZWw6IHBhZ2luYXRpb24sXHJcblx0dGVtcGxhdGU6XHJcblx0YDxzcGFuIGNsYXNzPVwibmF2aWdhdGlvbi13cmFwcGVyXCI+XHJcblx0XHQ8YnV0dG9uIGRhdGEtYmluZD1cImNsaWNrOiBnZXRQcmV2UGFnZSwgZW5hYmxlOiBmaXJzdFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm5hdmlnYXRpb24gcHJldlwiPjwvYnV0dG9uPlxyXG5cdFx0PGJ1dHRvbiAgZGF0YS1iaW5kPVwiY2xpY2s6IGdldE5leHRQYWdlLCBlbmFibGU6IGxhc3RcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJuYXZpZ2F0aW9uIG5leHRcIj48L2J1dHRvbj5cclxuXHQ8L3NwYW4+YFxyXG59KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYWdpbmF0aW9uLmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcclxudmFyIGdldFJhbmRvbUNvbG9yID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9jb2xvckNsYXNzZXMnKS5nZXRSYW5kb21Db2xvcjtcclxuXHJcbmZ1bmN0aW9uIFBhbmVsSGVhZGluZyhwYXJhbXMpIHtcclxuXHRzZWxmID0gdGhpcztcclxuXHR0aGlzLmNvbmZpZyA9IHBhcmFtcy5jb25maWcgJiYgcGFyYW1zLmNvbmZpZy5fQ09ORklHO1xyXG5cdHZhciBwYWdlID0gcGFyYW1zLnBhZ2U7XHJcblx0dGhpcy5zZXRBY3RpdmUgPSBwYXJhbXMuc2V0QWN0aXZlO1xyXG5cdHRoaXMuaXNFeHBhbmRlZCA9IHBhcmFtcy5pc0V4cGFuZGVkO1xyXG5cdHRoaXMuX3BhbmVsTmFtZSA9IHBhcmFtcy5kYXRhLmtleTtcclxuXHR0aGlzLnRpdGxlID0gdGhpcy5jb25maWcgJiYgdGhpcy5jb25maWcudGl0bGUgfHwgdGhpcy5fcGFuZWxOYW1lO1xyXG5cdHRoaXMuZGF0YSA9IHBhcmFtcy5kYXRhLnZhbHVlO1xyXG5cdGlmIChwYWdlKSB7XHJcblx0XHR0aGlzLmNhcmRTaXplID0gcGFnZS5zaXplO1xyXG5cdFx0dGhpcy5wYWdlUGFyYW0gPSBwYWdlLnBhcmFtZXRlcjtcclxuXHR9XHJcblx0dGhpcy5jb2xsYXBzZUlkID0gcGFyYW1zLmNvbGxhcHNlSWQ7XHJcblx0aWYgKHRoaXMuY29uZmlnLnJlcXVlc3QpIHtcclxuXHRcdHRoaXMuZ2V0UmFuZG9tQ29sb3IgPSBnZXRSYW5kb21Db2xvcihwYXJhbXMuY29sb3JDbGFzcyk7XHJcblx0fVxyXG59XHJcblxyXG5QYW5lbEhlYWRpbmcucHJvdG90eXBlLmZvbGxvd1JlcXVlc3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHR2YXIgdXJsID0gT2JqZWN0LmdldFByb3AodmFsdWUsICcuY29uZmlnLnJlcXVlc3QnKTtcclxuXHR1cmwgJiYgbG9jYXRpb24uYXNzaWduKHVybCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ3BhbmVsLWhlYWRpbmcnLCB7XHJcblx0dmlld01vZGVsOiAgUGFuZWxIZWFkaW5nLFxyXG5cdHRlbXBsYXRlOmBcclxuXHRcdDxzZWN0aW9uIGNsYXNzPVwicGFuZWwtaGVhZGluZ1wiPlxyXG5cdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZWwtdGl0bGVcIj5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQ8YSBkYXRhLWJpbmQ9XCJjbGljazogc2V0QWN0aXZlLCBhdHRyOiB7aHJlZjogJyMnICsgY29sbGFwc2VJZCwgJ2FyaWEtY29udHJvbHMnOiBjb2xsYXBzZUlkLCAnYXJpYS1leHBhbmRlZCc6IGlzRXhwYW5kZWR9XCIgY2xhc3M9XCJidG4gYnRuLWljb24gYnRuLXRpdGxlXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiYnRuIGJ0bi1pY29uIHNoZXZyb24gd2hpdGUtc2hldnJvbi11cFwiPjwvc3Bhbj5cclxuXHRcdFx0XHRcdDxwIGRhdGEtYmluZD1cInRleHQ6IHRpdGxlXCIgY2xhc3M9XCJ0aXRsZVwiPlBhbmVsIHRpdGxlPC9wPlxyXG5cdFx0XHRcdDwvYT5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQ8IS0tIGtvIGlmOiBfcGFuZWxOYW1lID09PSAnZXZlbnRzJy0tPlxyXG5cdFx0XHRcdFx0PHNwYW4gZGF0YS1iaW5kPVwidGV4dDogY2FyZFNpemVcIiBjbGFzcz1cImNvdW50ZXJcIj48L3NwYW4+XHJcblx0XHRcdFx0PCEtLSAva28tLT5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQ8IS0tIGtvIGlmOiBfcGFuZWxOYW1lID09PSAncGFnZSctLT5cclxuXHRcdFx0XHRcdDxwYWdpbmF0aW9uIHBhcmFtcz1cIm51bWJlcjogZGF0YS5udW1iZXIsIHRvdGFsUGFnZXM6IGRhdGEudG90YWxQYWdlcywgcGFnZVBhcmFtOiBwYWdlUGFyYW1cIj48L3BhZ2luYXRpb24+XHJcblx0XHRcdFx0PCEtLSAva28tLT5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQ8IS0tIGtvIGlmOiBjb25maWcucmVxdWVzdCAhPT0gdW5kZWZpbmVkIC0tPlxyXG5cdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiZm9sbG93LXJlcXVlc3RcIj5cclxuXHRcdFx0XHRcdDxzcGFuIGRhdGEtYmluZD1cImNzczogZ2V0UmFuZG9tQ29sb3JcIiBjbGFzcz1cImNvbG9yLWluZGljYXRvclwiPjwvc3Bhbj5cclxuXHRcdFx0XHRcdDxidXR0b24gZGF0YS1iaW5kPVwiY2xpY2s6IGZvbGxvd1JlcXVlc3RcIiBjbGFzcz1cImJ0biBidG4tcmVxdWVzdFwiIHR5cGU9XCJidXR0b25cIj5hbm90aGVyIHJlcXVlc3Q8L2J1dHRvbj5cclxuXHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0PCEtLSAva28tLT5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L3NlY3Rpb24+XHJcbmB9KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYW5lbEhlYWRpbmcuY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xyXG5cclxuZnVuY3Rpb24gT2JqZWN0UGFuZWxCb2R5KHBhcmFtcykge1xyXG5cdHNlbGYgPSB0aGlzO1xyXG5cdHRoaXMuZGF0YSA9IHRoaXMuZGF0YSB8fCBrby5vYnNlcnZhYmxlKHBhcmFtcy5kYXRhLnZhbHVlKTtcclxuXHR0aGlzLmNvbmZpZyA9IHBhcmFtcy5jb25maWc7XHJcblx0dGhpcy5fcGFuZWxOYW1lID0gcGFyYW1zLmRhdGEua2V5O1xyXG5cdHRoaXMuY2FyZEluZGV4ID0gdGhpcy5jYXJkSW5kZXggfHwga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShwYXJhbXMuaW5kZXgpO1xyXG5cdHRoaXMucGFuZWxHcm91cCA9IHBhcmFtcy5wYW5lbEdyb3VwIHx8IHt9O1xyXG5cdHRoaXMuZ2V0TW9yZSA9IHRoaXMucGFuZWxHcm91cC5nZXRNb3JlO1xyXG5cdHRoaXMucGFnZVBhcmFtID0gcGFyYW1zLnBhZ2UgJiYgcGFyYW1zLnBhZ2UucGFyYW1ldGVyO1xyXG5cdHRoaXMuY29sbGFwc2VJZCA9IHBhcmFtcy5jb2xsYXBzZUlkO1xyXG5cdHRoaXMuX2FsbEluc2lkZSA9ICEhT2JqZWN0LmdldFByb3Aoa28udW53cmFwKHRoaXMuY29uZmlnKSwgJy5fQ09ORklHLmFsbEluc2lkZScpO1xyXG5cdHRoaXMuc29ydEJ5Q29uZmlnID0gdGhpcy5wYW5lbEdyb3VwLnNvcnRCeUNvbmZpZztcclxufVxyXG5cclxuT2JqZWN0UGFuZWxCb2R5LnByb3RvdHlwZS5vbkVudGVyS2V5RG93biA9IGZ1bmN0aW9uIChtb2RlbCwgZXZlbnQpIHtcclxuXHRpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuXHRcdHZhciB2YWx1ZSA9ICtldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlO1xyXG5cdFx0dmFsdWUgPSBOdW1iZXIuaXNOYU4odmFsdWUpID8gMCA6IHZhbHVlO1xyXG5cdFx0dmFyIHBhZ2VOdW1iZXIgPSB+fnZhbHVlIDwgMCA/IDAgOiB+fnZhbHVlO1xyXG5cdFx0dGhpcy5wYWdlUGFyYW0ocGFnZU51bWJlciA8IGtvLnVud3JhcCh0aGlzLmRhdGEpLnRvdGFsUGFnZXMgPyBwYWdlTnVtYmVyIDoga28udW53cmFwKHRoaXMuZGF0YSkudG90YWxQYWdlcyAtIDEpO1xyXG5cdFx0JCgnI2FwaS1leHAtZ2V0LWJ0bicpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxufTtcclxuXHJcbk9iamVjdFBhbmVsQm9keS5wcm90b3R5cGUuY2FuQmVDb3BpZWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0aWYgKHR5cGVvZiB0aGlzLnZhbHVlID09PSAnb2JqZWN0JykgcmV0dXJuIGZhbHNlO1xyXG5cdHRoaXMuY29waWVkID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcblx0aWYgKE9iamVjdC5nZXRQcm9wKHNlbGYuY29uZmlnLCAnLl9DT05GSUcuY29weUJ0bi4nICsgdGhpcy5rZXkpKSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcbk9iamVjdFBhbmVsQm9keS5wcm90b3R5cGUuY29weVZhbHVlID0gZnVuY3Rpb24gKG1vZGVsLCBldmVudCkge1xyXG5cdHZhciBjdXJyZW50RmllbGQgPSB0aGlzO1xyXG5cdHNlbGYuY2xpcGJvYXJkID0gbmV3IENsaXBib2FyZChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuXHRzZWxmLmNsaXBib2FyZC5vbignc3VjY2VzcycsIGZ1bmN0aW9uIG9uU3VjY2Vzc0NvcHkoZSkge1xyXG5cdFx0XHRjb25zb2xlLmluZm8oJ0FjdGlvbjonLCBlLmFjdGlvbik7XHJcblx0XHRcdGNvbnNvbGUuaW5mbygnVGV4dDonLCBlLnRleHQpO1xyXG5cdFx0XHRjb25zb2xlLmluZm8oJ1RyaWdnZXI6JywgZS50cmlnZ2VyKTtcclxuXHRcdFx0Y3VycmVudEZpZWxkLmNvcGllZCh0cnVlKTtcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0Y3VycmVudEZpZWxkLmNvcGllZChmYWxzZSk7XHJcblx0XHRcdH0sIDUwMCk7XHJcblx0XHRcdGUuY2xlYXJTZWxlY3Rpb24oKTtcclxuXHRcdH0pXHJcblx0XHQub24oJ2Vycm9yJywgZnVuY3Rpb24gb25FcnJvckNvcHkoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdBY3Rpb246JywgZS5hY3Rpb24pO1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdUcmlnZ2VyOicsIGUudHJpZ2dlcik7XHJcblx0XHR9KTtcclxufTtcclxuXHJcbk9iamVjdFBhbmVsQm9keS5wcm90b3R5cGUucmVtb3ZlSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuXHRzZWxmLmNsaXBib2FyZCAmJiBzZWxmLmNsaXBib2FyZC5kZXN0cm95KCk7XHJcblx0ZGVsZXRlIHNlbGYuY2xpcGJvYXJkO1xyXG59O1xyXG5PYmplY3RQYW5lbEJvZHkucHJvdG90eXBlLnNldEFjdGl2ZSA9IGZ1bmN0aW9uIChrZXksIHZhbHVlLCBtb2RlbCwgZSkge1xyXG5cdCQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnRzKCcuc2xpY2stc2xpZGUnKS5maW5kKCcuaXRlbS5vYmplY3QnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0JChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudCgnLml0ZW0nKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0dGhpcy5nZXRNb3JlLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ29iamVjdC1wYW5lbC1ib2R5Jywge1xyXG5cdHZpZXdNb2RlbDogIE9iamVjdFBhbmVsQm9keSxcclxuXHR0ZW1wbGF0ZTpgXHJcblx0XHQ8c2VjdGlvbiBkYXRhLWJpbmQ9XCJjc3M6IHsnYWxsLWluc2lkZSc6ICRjb21wb25lbnQuX2FsbEluc2lkZX1cIiBjbGFzcz1cInBhbmVsLWJvZHkgb2JqZWN0LXBhbmVsLWJvZHlcIj5cclxuXHRcdFx0PCEtLSBrbyBpZjogJGNvbXBvbmVudC5fcGFuZWxOYW1lID09PSAnb2JqZWN0JyAmJiAhIU9iamVjdC5nZXRQcm9wKGtvLnVud3JhcChkYXRhKSwgJy5yYXRpbycpLS0+XHJcblx0XHRcdFx0PGltZyBkYXRhLWJpbmQ9XCJhdHRyOiB7c3JjOiBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKGRhdGEpLnVybCwgYWx0OiAnaW1hZ2UtJyArIGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUoZGF0YSkucmF0aW99XCIgYWx0PVwiaW1nXCIgY2xhc3M9XCJpbWcgaW1nLXRodW1ibmFpbFwiPlxyXG5cdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHJcblx0XHRcdDx1bCBkYXRhLWJpbmQ9XCJmb3JlYWNocHJvcDoge2RhdGE6IGRhdGEsIHNvcnRGbjogJGNvbXBvbmVudC5zb3J0QnlDb25maWcuYmluZCgkY29tcG9uZW50KX1cIiBjbGFzcz1cImxpc3Qgb2JqZWN0LWxpc3RcIj5cclxuXHRcdFx0XHQ8bGkgZGF0YS1iaW5kPVwiY3NzOiB7J29iamVjdCc6IHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcsICdwcmltaXRpdmUnOiB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnfVwiIGNsYXNzPVwiY2xlYXJmaXggcGFkaW5nIGl0ZW1cIj5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRcdDwhLS0ga28gaWZub3Q6IHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgJGNvbXBvbmVudC5fYWxsSW5zaWRlIC0tPlxyXG5cdFx0XHRcdFx0PHNwYW4gZGF0YS1iaW5kPVwidGV4dDogdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyA/IGtleToga2V5ICsgJzonXCIgY2xhc3M9XCJrZXlcIj48L3NwYW4+XHJcblx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0PCEtLSBrbyBpZm5vdDogdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyB8fCAkY29tcG9uZW50Ll9wYW5lbE5hbWUgPT09ICdwYWdlJyAmJiBrZXkgPT09ICdudW1iZXInIC0tPlxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBkYXRhLWJpbmQ9XCJ0ZXh0OiB2YWx1ZVwiIGNsYXNzPVwidmFsdWVcIj48L3NwYW4+XHJcblx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0PCEtLSBrbyBpZjogJGNvbXBvbmVudC5fcGFuZWxOYW1lID09PSAncGFnZScgJiYga2V5ID09PSAnbnVtYmVyJy0tPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZm9ybS1pbmxpbmVcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aW5wdXQgaWQ9XCJwYWdpbmF0aW9uLWlucHV0XCIgZGF0YS1iaW5kPVwiZXZlbnQ6IHtrZXlkb3duOiAkY29tcG9uZW50Lm9uRW50ZXJLZXlEb3duLmJpbmQoJGNvbXBvbmVudCl9LCBhdHRyOiB7cGxhY2Vob2xkZXI6IHZhbHVlfVwiIHR5cGU9XCJ0ZXh0XCIgcGF0dGVybj1cIlswLTldK1wiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdDwhLS0ga28gaWY6ICRjb21wb25lbnQuY2FuQmVDb3BpZWQuY2FsbCgkZGF0YSwgJyNwcm9wLXZhbHVlLScgKyBrZXkgKyAkaW5kZXgoKSkgLS0+XHJcblx0XHRcdFx0XHRcdDxidXR0b24gZGF0YS1iaW5kPVwiZXZlbnQ6IHttb3VzZW92ZXI6ICRjb21wb25lbnQuY29weVZhbHVlLCBtb3VzZW91dDogJGNvbXBvbmVudC5yZW1vdmVIYW5kbGVyfSwgY3NzOiB7J2NvcGllZCc6IGNvcGllZH0sIGF0dHI6IHsnZGF0YS1jbGlwYm9hcmQtdGV4dCc6IHZhbHVlLnRvU3RyaW5nKCksIGlkOiAncHJvcC12YWx1ZS0nICsga2V5ICsgJGluZGV4KCl9LCBwb3BvdmVyOiB7dHlwZTogJ3Rvb2x0aXAnLCB0aXRsZTogJ0NvcHkgdmFsdWUnfVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4taWNvbiBidG4tY29weVwiPjwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0PCEtLSBrbyBpZjogdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAkY29tcG9uZW50Ll9hbGxJbnNpZGUgLS0+XHJcblx0XHRcdFx0XHRcdFx0PHBhbmVsIHBhcmFtcz1cIiRkYXRhOiAkZGF0YSwgJGluZGV4OiAkaW5kZXgsIHBhbmVsR3JvdXA6ICRjb21wb25lbnRcIj48L3BhbmVsPlxyXG5cdFx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcdFx0PCEtLSBrbyBpZjogdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAhJGNvbXBvbmVudC5fYWxsSW5zaWRlIC0tPlxyXG5cdFx0XHRcdFx0XHRcdDxidXR0b24gZGF0YS1iaW5kPVwiY2xpY2s6ICRjb21wb25lbnQuc2V0QWN0aXZlLmJpbmQoJGNvbXBvbmVudCwga2V5LCB2YWx1ZSlcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWljb24gYmx1ZS1zaGV2cm9uLXJpZ2h0IHB1bGwtcmlnaHRcIj48L2J1dHRvbj5cclxuXHRcdFx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFx0PC9saT5cclxuXHRcdFx0PC91bD5cclxuXHRcdDwvc2VjdGlvbj5cclxuYH0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL29iamVjdFBhbmVsQm9keS5jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHNlbGY7XHJcblxyXG5mdW5jdGlvbiBBcnJheVBhbmVsQm9keShwYXJhbXMpIHtcclxuXHRzZWxmID0gdGhpcztcclxuXHR0aGlzLmRhdGEgPSBwYXJhbXMuZGF0YS52YWx1ZTtcclxuXHR0aGlzLmNvbmZpZyA9IHBhcmFtcy5jb25maWc7XHJcblx0dGhpcy5fcGFuZWxOYW1lID0gcGFyYW1zLmRhdGEua2V5O1xyXG5cdHRoaXMuY2FyZEluZGV4ID0gdGhpcy5jYXJkSW5kZXggfHwga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShwYXJhbXMuaW5kZXgpO1xyXG5cdHRoaXMucGFuZWxHcm91cCA9IHBhcmFtcy5wYW5lbEdyb3VwO1xyXG5cdHRoaXMuZ2V0TW9yZSA9IHRoaXMucGFuZWxHcm91cC5nZXRNb3JlO1xyXG5cclxufVxyXG5cclxuQXJyYXlQYW5lbEJvZHkucHJvdG90eXBlLmdldFN0YXJ0RGF0YSA9IGZ1bmN0aW9uICgkZGF0YSkge1xyXG5cdHJldHVybiBPYmplY3QuZ2V0UHJvcCgkZGF0YSwgJ2RhdGVzLnN0YXJ0LmxvY2FsRGF0ZScpIHx8ICcnXHJcbn07XHJcblxyXG5BcnJheVBhbmVsQm9keS5wcm90b3R5cGUuZ2V0VmVudWVOYW1lID0gZnVuY3Rpb24gKCRkYXRhKSB7XHJcblx0cmV0dXJuIE9iamVjdC5nZXRQcm9wKCRkYXRhLCAnX2VtYmVkZGVkLnZlbnVlc1swXS5uYW1lJykgfHwgJydcclxufTtcclxuXHJcbkFycmF5UGFuZWxCb2R5LnByb3RvdHlwZS5zZXRBY3RpdmUgPSBmdW5jdGlvbiAoJGluZGV4LCBtb2RlbCwgZSkge1xyXG5cdCQoZS5jdXJyZW50VGFyZ2V0KS5wYXJlbnRzKCcuc2xpY2stc2xpZGUnKS5maW5kKCcuaXRlbS5vYmplY3QnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0JChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudCgnLml0ZW0nKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0dGhpcy5nZXRNb3JlLmNhbGwodGhpcywgJGluZGV4LCBtb2RlbCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2FycmF5LXBhbmVsLWJvZHknLCB7XHJcblx0dmlld01vZGVsOiBBcnJheVBhbmVsQm9keSxcclxuXHR0ZW1wbGF0ZTpgXHJcblx0XHQ8c2VjdGlvbiBjbGFzcz1cInBhbmVsLWJvZHkgbm8tcGFkZGluZyBhcnJheS1wYW5lbC1ib2R5XCI+XHJcblx0XHRcdDx1bCBkYXRhLWJpbmQ9XCJmb3JlYWNoOiBkYXRhLCBjc3M6IHsnZXZlbnRzJzogJGNvbXBvbmVudC5fcGFuZWxOYW1lID09PSAnZXZlbnRzJ31cIiBjbGFzcz1cImxpc3QgbGlzdC1ncm91cFwiPlxyXG5cdFx0XHRcdDxsaSBkYXRhLWJpbmQ9XCJjc3M6IHsnb2JqZWN0JzogdHlwZW9mICRkYXRhID09PSAnb2JqZWN0J31cIiBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbSBpdGVtXCI+XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8IS0tIGtvIGlmOiAkY29tcG9uZW50Ll9wYW5lbE5hbWUgPT09ICdpbWFnZXMnIC0tPlxyXG5cdFx0XHRcdFx0XHQ8aW1nIGRhdGEtYmluZD1cImF0dHI6IHtzcmM6IHVybCwgYWx0OiAnaW1hZ2UtJyArIHJhdGlvfVwiIGFsdD1cImltZ1wiIGNsYXNzPVwiaW1nXCI+XHJcblx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0PCEtLSBrbyBpZm5vdDogJGNvbXBvbmVudC5fcGFuZWxOYW1lID09PSAnaW1hZ2VzJyAtLT5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm5hbWUtd3JhcHBlclwiPlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuIGRhdGEtYmluZD1cInRleHQ6IG5hbWUgfHwgJyMnICsgJGluZGV4KCksIGJsb2NrRWxsaXBzaXM6IHtjbGFtcDogMn1cIiBjbGFzcz1cIm5hbWVcIj5sYWJlbDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHRcdFx0XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHQ8IS0tIGtvIGlmOiAkY29tcG9uZW50Ll9wYW5lbE5hbWUgPT09ICdldmVudHMnIC0tPlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJhZGRpdGlvbmFsLWluZm9cIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxwIGRhdGEtYmluZD1cInRleHQ6ICRjb21wb25lbnQuZ2V0U3RhcnREYXRhKCRkYXRhKVwiIGNsYXNzPVwiZGF0ZVwiPmV2ZW50IGRhdGU8L3A+XHJcblx0XHRcdFx0XHRcdFx0XHQ8IS0tIGtvIGlmOiAkY29tcG9uZW50LmdldFZlbnVlTmFtZSgkZGF0YSktLT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PHAgZGF0YS1iaW5kPVwidGV4dDogJGNvbXBvbmVudC5nZXRWZW51ZU5hbWUoJGRhdGEpXCIgY2xhc3M9XCJ2ZW51ZSB0cnVuY2F0ZVwiPmV2ZW50IHZlbnVlPC9wPlxyXG5cdFx0XHRcdFx0XHRcdFx0PCEtLS9rby0tPlxyXG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0PCEtLSBrbyBpZjogdHlwZW9mICRkYXRhID09PSAnb2JqZWN0JyAtLT5cclxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBkYXRhLWJpbmQ9XCJjbGljazogJGNvbXBvbmVudC5zZXRBY3RpdmUuYmluZCgkY29tcG9uZW50LCAkaW5kZXgoKSlcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWljb24gYmx1ZS1zaGV2cm9uLXJpZ2h0IHB1bGwtcmlnaHRcIj48L2J1dHRvbj5cclxuXHRcdFx0XHRcdDwhLS0gL2tvIC0tPlxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0PC9saT5cclxuXHRcdFx0PC91bD5cclxuXHRcdDwvc2VjdGlvbj5cclxuYH0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL2FycmF5UGFuZWxCb2R5LmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDMxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9