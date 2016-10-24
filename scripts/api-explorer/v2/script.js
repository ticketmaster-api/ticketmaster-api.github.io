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
	__webpack_require__(4);
	// Modules
	var base = __webpack_require__(5);
	var apiKey = __webpack_require__(6);
	var ajaxService = __webpack_require__(7);
	
	var config = __webpack_require__(8);
	// View Models
	var MenuViewModel = __webpack_require__(9);
	var ParamsViewModel = __webpack_require__(11);
	var MethodsViewModel = __webpack_require__(12);
	var RequestsListViewModel = __webpack_require__(13);
	// Components
	__webpack_require__(20);
	
	/**
	 * Main application view-model
	 * @param obj {object} global data object
	 */
	function AppViewModel(obj) {
	  self = this;
	  var base = obj || {};
		var parsedUrl = parseUrl();
	  this.apiKey = apiKey;
		this.config = config;
	
	  // observables
	  this.selectedCategory = ko.observable(parsedUrl.apiCategory || '');
	  this.selectedMethod = ko.observable(parsedUrl.methodId || '');
	  this.selectedParams = ko.observableArray([]);
		this.requests = ko.observableArray([]);
	
		// computed
	  this.URL = ko.computed(this.getUrl, this);
	  this.sendButtonText = ko.pureComputed(this.getMethodName, this);
		this.sharePath = ko.pureComputed(formDeepLinkingUrl, this);
		this.sharePath.subscribe(function (val) {
			console.log(val);
		}, this);
	  // sub-models
	  this.menu = new MenuViewModel(base, this.selectedCategory);
	  this.methods = new MethodsViewModel(base, this.selectedCategory, this.selectedMethod);
	  this.params = new ParamsViewModel(base, this.selectedMethod, this.selectedParams);
	  this.requestsList = new RequestsListViewModel(this.requests, this.selectedParams, this.sharePath);
	}
	
	/**
	 * Send request method
	 */
	AppViewModel.prototype.onClickSendBtn = function () {
	  ajaxService(this.URL(), this.requests, base);
	};
	
	/**
	 * Gets current method name
	 * @returns {string}
	 */
	AppViewModel.prototype.getMethodName = function () {
	  return this.selectedMethod().method.toLowerCase();
	};
	
	/**
	 * Gets raw url data array
	 * @returns {*[]}
	 */
	AppViewModel.prototype.getUrl = function () {
	  return [
	    this.selectedMethod(),
	    this.apiKey,
	    this.selectedParams()
	  ];
	};
	
	/**
	 * Gets deep prop
	 * @returns {*[]}
	 */
	Object.getProp = function(o, s) {
		if (typeof o !== 'object' || !s) {
			console.log(o,s);
			return;
		}
		s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
		s = s.replace(/^\./, '');           // strip a leading dot
		var a = s.split('.');
		for (var i = 0, n = a.length; i < n; ++i) {
			var k = a[i];
			if (k in o) {
				o = o[k];
			} else {
				return;
			}
		}
		return o;
	};
	
	/**
	 * Activates knockout.js
	 */
	ko.applyBindings(new AppViewModel(base));
	/**
	 * exports global variable
	 */
	module.exports = base;
	
	function formDeepLinkingUrl() {
		var location = window.location;
		var category = ko.utils.unwrapObservable(self.selectedCategory);
		var method = ko.utils.unwrapObservable(self.selectedMethod);
		var params = ko.utils.unwrapObservable(self.selectedParams);
	
		var querys = [
			'apiCategory=' + encodeURI(category),
			'methodId='+ encodeURI(method.id)
		];
	
		params.map(function (param) {
			var value = ko.utils.unwrapObservable(param.value);
			var defaultValue = ko.utils.unwrapObservable(param.default);
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
				selectedParams: []
			};
	
			querys.map(function (e) {
				var a = decodeURI(e).split('=');
				var key = a[0];
				var val = a[1];
	
				if (key === 'apiCategory' || key === 'methodId') {
					obj[key] = val;
				} else {
					obj.selectedParams.push({
						name: key,
						value: val
					})
				}
			});
			return obj;
		}
		return {};
	}


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
/* 6 */
/***/ function(module, exports) {

	var apiKey = 'XiOrN2UC9yjuR4XF87sdMbRpaVNsP6W2' || apiKeyService.checkApiKeyCookie('tk-api-key') || apiKeyService.getApiExploreKey(); //API Key
	
	module.exports = {
	  name: 'apikey',
	  style: 'query',
	  value: ko.observable(apiKey)
	};


/***/ },
/* 7 */
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
	var sendPrimaryRequest = function (arr, requests, global) {
	  var url = prepareUrl(arr);
	
	  ajaxService(url, arr[0].method, function(res, msg) {
			var resObj = {
				req: url,
				index: requests().length
			};
	
			if (msg == 'error') {
				var err = res &&
					res.responseJSON &&
					res.responseJSON.errors &&
					res.responseJSON.errors[0];
	
				resObj.error = {
					code: err ? err.code: 500,
					message: err ? err.detail: 'No responce data!'
				}
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
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var hf = __webpack_require__(10);
	var self;
	
	/**
	 * Menu View-Model
	 * @param base
	 * @param category
	 * @constructor
	 */
	function MenuViewModel(base, selectedCategory) {
	  self = this;
	
		this.selectedCategory = selectedCategory;
		var initCategory = ko.utils.unwrapObservable(selectedCategory);
		this.categories = ko.observableArray(Object.keys(base).map(function (item, index) {
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
	
	/**
	 * Menu View-Model method
	 * @param category
	 */
	MenuViewModel.prototype.selectCategory = function (category) {
	  var categoryName = category.name;
	  self.selectedCategory(categoryName);
	  hf.checkActive(self.categories, categoryName);
	};
	
	module.exports = MenuViewModel;


/***/ },
/* 10 */
/***/ function(module, exports) {

	exports.getModelArray = function getModelArray(params) {
	    var obj = params.obj || {},
	        arr = params.arr || [],
	        prop = params.prop || 'name';
	
	    for (var i in obj) {
	        if (!obj.hasOwnProperty(i)) { continue; }
	
	        var item = arr.find(function (m1) {
	            return m1.name === obj[i][prop];
	        });
	
	        if (item) { continue; }
	
	        arr.push({
	            checked: ko.observable(false),
	            name: obj[i][prop]
	        });
	    }
	    return arr;
	};
	
	exports.checkActive = function checkActive(koArr, activeElem) {
	    if (!koArr && !activeElem) {return false;}
	
	    koArr(koArr().map(function (obj) {
	        if (obj.name === activeElem) {
	            obj.checked(true);
	        } else {
	            obj.checked(false);
	        }
	        return obj;
	    }));
	};
	
	exports.iterate = function (obj) {
		for (var property in obj) {
			if (obj.hasOwnProperty(property)) {
				if (typeof obj[property] == "object") {
					iterate(obj[property]);
				}
				else {
					console.log('|' + property + " |  " + obj[property] + '|');
				}
			}
		}
	};
	


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var self;
	var base;
	var hf = __webpack_require__(10);
	/**
	 * Params View-Model
	 * @param raw
	 * @param method
	 * @param params
	 * @constructor
	 */
	function ParamsViewModel(raw, method, params) {
	  base = raw;
	  self = this;
	  this.animationSpeed = 200;
	
	  // observables
	  this.method = method;
	  this.params = params;
	  this.isHidden = ko.observable(true);
	  this.paramInFocus = ko.observable('');
		this.paramsModel = ko.observableArray([]);
	
		// computed
		// this.paramsModel = ko.computed(this.updateParamsModel, this);
		this.updateViewModel();
		this.method.subscribe(this.updateViewModel, this);
	
		this.isDirty = ko.computed(this.checkDirty, this);
	}
	
	
	/**
	 * Initial build of Select Model
	 */
	ParamsViewModel.prototype.updateViewModel = function () {
		var obj = this.method().parameters || {},
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
		this.prepareUrlPairs(arr, this.params);
		return arr;
	};
	
	/**
	 * Dirty params form observable method
	 * @returns {boolean}
	 */
	ParamsViewModel.prototype.checkDirty = function () {
		this.prepareUrlPairs(this.paramsModel(), this.params);
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
	ParamsViewModel.prototype.onEnterKeyDown = function (model, event) {
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
	ParamsViewModel.prototype.slideToggle = function (viewModel, event) {
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
	ParamsViewModel.prototype.onFocus = function (item) {
	  self.paramInFocus(item);
	};
	
	/**
	 * Filters params by defined value
	 * @param arr
	 * @param koObs
	 * @returns {boolean}
	 */
	ParamsViewModel.prototype.prepareUrlPairs = function (arr, koObs) {
	  if (!arr && !koObs) {return false;}
	
	  return koObs(arr.filter(function (item) {
	    return (item.value() || item.default);
	  }));
	};
	
	/**
	 * On select value handler for params select
	 * @param param {object} parameter view-model
	 * @param option {object} option view-model
	 */
	ParamsViewModel.prototype.onSelectParamValue = function (param, option) {
		hf.checkActive(param.options, option.name);
		param.value(option.name);
	};
	
	/**
	 * Params clear button handler
	 * @param vm {object} view model
	 * @param e {object} event
	 */
	ParamsViewModel.prototype.onParamsClear = function (vm, e) {
		this.updateViewModel();
	};
	
	module.exports = ParamsViewModel;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var hf = __webpack_require__(10);
	var self;
	var base;
	var category;
	
	/**
	 * Methods View-Model
	 * @param raw
	 * @param category
	 * @param method
	 * @constructor
	 */
	function MethodsViewModel(raw, category, method) {
	  self = this;
	  base = raw;
	
	  // observables
	  this.category = category;
	  this.method = method;
	  this.togglePopUp = ko.observable(false);
	  this.radiosModel = ko.observableArray([]);
	  this.methodsViewModel = ko.observableArray([]);
	  this.updateModel(this.category());
	  this.category.subscribe(this.updateModel, this);
	}
	
	/**
	 * On category change handler
	 * Methods View-Model method
	 * @param category
	 */
	MethodsViewModel.prototype.updateModel = function (category) {
	  // initial radios model
	  self.updateRadiosModel(base[category]);
	  // initial select model (first method in first section for start)
	  self.updateSelect(self.radiosModel()[0]);
	};
	
	/**
	 * Onchange handler for Radio buttons
	 * @param item
	 */
	MethodsViewModel.prototype.onchangeRadios = function (item) {
	  //update Radios Model
	  hf.checkActive(self.radiosModel, item.name);
	  //update Select Model
	  self.updateSelect(item);
	};
	
	/**
	 * Initial build of Radios Model
	 * @param param
	 * @returns {Array}
	 */
	MethodsViewModel.prototype.updateRadiosModel = function (param) {
	  var obj = param || {},
	    arr = [];
	
	  for (var i in obj) {
	    if (!obj.hasOwnProperty(i)) { continue; }
	    var item = {
	      checked: ko.observable(i === 'ALL'),
	      name: i
	    };
	
	    if (i === 'ALL') {
	      arr.unshift(item)
	    } else {
	      arr.push(item);
	    }
	  }
		arr = arr.sort(compareMethods);
	  this.radiosModel(arr);
	  return arr;
	};
	
	/**
	 * Initial build of Select Model
	 * @param item
	 */
	MethodsViewModel.prototype.updateSelect = function (item) {
	  var obj = base[self.category()][item.name]|| {},
	    arr = [],
	    count = 0;
	
	  for (var i in obj) {
	    if (!obj.hasOwnProperty(i)) { continue; }
	    var property = obj[i];
			// copies all values from model to view-model
			var vmMethod = $.extend({}, property);
	
			delete vmMethod.parameters;
			vmMethod.checked = ko.observable(!count);
	
			arr.push(vmMethod);
	
	    // set global observable
	    !count && this.method(base[property.category][property.method][property.id]);
	
	    count++;
	
	  }
	
		this.methodsViewModel(arr);
		return arr;
	};
	
	MethodsViewModel.prototype.onSelectMethod = function (item) {
	  hf.checkActive(self.methodsViewModel, item.name);
	  self.method(base[item.category][item.method][item.id]);
	};
	
	MethodsViewModel.prototype.onAboutClick = function (model, event) {
	  model.togglePopUp(!model.togglePopUp());
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
	
	module.exports = MethodsViewModel;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var jsonHighlight = __webpack_require__(14);
	var slider = __webpack_require__(17);
	var filter = __webpack_require__(18);
	var self;
	var colors = __webpack_require__(19).colors;
	
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
		
		var newModel = this.requests()
			.map(function (obj) {
				var item =  $.extend({}, obj, {
					color: self.colors[obj.index % self.colors.length],
					active: ko.observable(false),
					copiedForShare: ko.observable(false),
					copiedUrl: ko.observable(false),
					resHTML: ko.observable('')
				});
				return item;
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
			jsonHighlight(this.resHTML, this.res);
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
		var content = model.res.res;
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Worker = __webpack_require__(15); // Json-formatter worker
	
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		return __webpack_require__(16)("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId])\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\texports: {},\n/******/ \t\t\tid: moduleId,\n/******/ \t\t\tloaded: false\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.loaded = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(0);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ function(module, exports, __webpack_require__) {\n\n\t/**\r\n\t * Code format web-worker\r\n\t * @param event\r\n\t */\r\n\t// var highlightJson()\r\n\tvar highlightJson = __webpack_require__(1);\r\n\t\r\n\tonmessage = function(event) {\r\n\t  var code = event.data;\r\n\t  // importScripts('json-parse.js');\r\n\t  var result = highlightJson(code, {expanded: true});\r\n\t  // var result =JSON.stringify(code);\r\n\t  postMessage(result);\r\n\t};\r\n\n\n/***/ },\n/* 1 */\n/***/ function(module, exports) {\n\n\tvar prefix = 'tm-code';\r\n\t\r\n\tvar getExpanderClasses = function (expanded) {\r\n\t\tif (!expanded) {\r\n\t\t\treturn 'expanded collapsed hidden';\r\n\t\t}\r\n\t\treturn 'expanded';\r\n\t};\r\n\t\r\n\tvar encode = function (value) {\r\n\t\treturn ['<span>', value, '</span>'].join('');\r\n\t};\r\n\t\r\n\tvar createElement = function (key, value, type, expanderClasses) {\r\n\t\tvar klass = 'object',\r\n\t\t\topen = '{',\r\n\t\t\tclose = '}';\r\n\t\r\n\t\tif (Array.isArray(value)) {\r\n\t\t\tklass = 'array';\r\n\t\t\topen = '[';\r\n\t\t\tclose = ']';\r\n\t\t}\r\n\t\r\n\t\tif (value === null) {\r\n\t\t\treturn [\r\n\t\t\t\t'<li>',\r\n\t\t\t\t\t'<span class=\"key\">\"', encode(key), '\": </span>',\r\n\t\t\t\t\t'<span class=\"null\">\"', encode(value), '\"</span>',\r\n\t\t\t\t'</li>'\r\n\t\t\t].join('');\r\n\t\t}\r\n\t\r\n\t\tif (type == 'object') {\r\n\t\t\treturn [\r\n\t\t\t\t'<li>',\r\n\t\t\t\t\t'<span class=\"', expanderClasses, '\"></span>',\r\n\t\t\t\t\t'<span class=\"key\">\"', encode(key), '\": </span> ',\r\n\t\t\t\t\t'<span class=\"open\">', open, '</span> ',\r\n\t\t\t\t\t'<ul class=\"', klass, '\">',\r\n\t\t\t\t\t\tjson2html(value, expanderClasses),\r\n\t\t\t\t\t'</ul>',\r\n\t\t\t\t\t'<span class=\"close\">', close, '</span>',\r\n\t\t\t\t'</li>'\r\n\t\t\t].join('');\r\n\t\t}\r\n\t\r\n\t\tif (type == 'number' || type == 'boolean') {\r\n\t\t\treturn [\r\n\t\t\t\t'<li>',\r\n\t\t\t\t\t'<span class=\"key\">\"', encode(key), '\": </span>',\r\n\t\t\t\t\t'<span class=\"', type, '\">', encode(value), '</span>',\r\n\t\t\t\t'</li>'\r\n\t\t\t].join('');\r\n\t\t}\r\n\t\treturn [\r\n\t\t\t'<li>',\r\n\t\t\t\t'<span class=\"key\">\"', encode(key), '\": </span>',\r\n\t\t\t\t'<span class=\"', type, '\">\"', encode(value), '\"</span>',\r\n\t\t\t'</li>'\r\n\t\t].join('');\r\n\t};\r\n\t\r\n\tvar json2html = function (json, expanderClasses) {\r\n\t\tvar html = '';\r\n\t\tfor (var key in json) {\r\n\t\t\tif (!json.hasOwnProperty(key)) {\r\n\t\t\t\tcontinue;\r\n\t\t\t}\r\n\t\r\n\t\t\thtml = [html, createElement(key, json[key], typeof json[key], expanderClasses)].join('');\r\n\t\t}\r\n\t\treturn html;\r\n\t};\r\n\t\r\n\tvar getJsonViewer = function (data, options) {\r\n\t\ttry {\r\n\t\t\treturn [\r\n\t\t\t\t'<ul class=\"', prefix, '-container\">',\r\n\t\t\t\t\tjson2html([JSON.parse(data)], getExpanderClasses(options.expanded)),\r\n\t\t\t\t'</ul>'\r\n\t\t\t].join('');\r\n\t\t} catch (e) {\r\n\t\t\treturn [\r\n\t\t\t\t'<div class=\"', prefix, '-error\" >', e.toString(), ' </div>'\r\n\t\t\t].join('');\r\n\t\t}\r\n\t};\r\n\t\r\n\tmodule.exports = function(data, opt) {\r\n\t\tvar json = '';\r\n\t\tvar options = opt || {expanded: true};\r\n\t\tif (typeof data == 'string') {\r\n\t\t\tjson = data;\r\n\t\t} else if (typeof data == 'object') {\r\n\t\t\tjson = JSON.stringify(data)\r\n\t\t}\r\n\t\treturn getJsonViewer(json, options);\r\n\t};\r\n\n\n/***/ }\n/******/ ]);\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDcxYjEwZDQ0Y2E3MjgwZTExNGEiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvaGlnaGxpZ2h0SnNvbi53b3JrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvanNvbi1wYXJzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUNBQW9DLGVBQWU7QUFDbkQ7QUFDQTtBQUNBOzs7Ozs7O0FDYkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBVztBQUNYLGFBQVk7O0FBRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaGlnaGxpZ2h0SnNvbi53b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDQ3MWIxMGQ0NGNhNzI4MGUxMTRhXG4gKiovIiwiLyoqXHJcbiAqIENvZGUgZm9ybWF0IHdlYi13b3JrZXJcclxuICogQHBhcmFtIGV2ZW50XHJcbiAqL1xyXG4vLyB2YXIgaGlnaGxpZ2h0SnNvbigpXHJcbnZhciBoaWdobGlnaHRKc29uID0gcmVxdWlyZSgnLi9qc29uLXBhcnNlJyk7XHJcblxyXG5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xyXG4gIHZhciBjb2RlID0gZXZlbnQuZGF0YTtcclxuICAvLyBpbXBvcnRTY3JpcHRzKCdqc29uLXBhcnNlLmpzJyk7XHJcbiAgdmFyIHJlc3VsdCA9IGhpZ2hsaWdodEpzb24oY29kZSwge2V4cGFuZGVkOiB0cnVlfSk7XHJcbiAgLy8gdmFyIHJlc3VsdCA9SlNPTi5zdHJpbmdpZnkoY29kZSk7XHJcbiAgcG9zdE1lc3NhZ2UocmVzdWx0KTtcclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2hpZ2hsaWdodEpzb24ud29ya2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHByZWZpeCA9ICd0bS1jb2RlJztcclxuXHJcbnZhciBnZXRFeHBhbmRlckNsYXNzZXMgPSBmdW5jdGlvbiAoZXhwYW5kZWQpIHtcclxuXHRpZiAoIWV4cGFuZGVkKSB7XHJcblx0XHRyZXR1cm4gJ2V4cGFuZGVkIGNvbGxhcHNlZCBoaWRkZW4nO1xyXG5cdH1cclxuXHRyZXR1cm4gJ2V4cGFuZGVkJztcclxufTtcclxuXHJcbnZhciBlbmNvZGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRyZXR1cm4gWyc8c3Bhbj4nLCB2YWx1ZSwgJzwvc3Bhbj4nXS5qb2luKCcnKTtcclxufTtcclxuXHJcbnZhciBjcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUsIHR5cGUsIGV4cGFuZGVyQ2xhc3Nlcykge1xyXG5cdHZhciBrbGFzcyA9ICdvYmplY3QnLFxyXG5cdFx0b3BlbiA9ICd7JyxcclxuXHRcdGNsb3NlID0gJ30nO1xyXG5cclxuXHRpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuXHRcdGtsYXNzID0gJ2FycmF5JztcclxuXHRcdG9wZW4gPSAnWyc7XHJcblx0XHRjbG9zZSA9ICddJztcclxuXHR9XHJcblxyXG5cdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG5cdFx0cmV0dXJuIFtcclxuXHRcdFx0JzxsaT4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cImtleVwiPlwiJywgZW5jb2RlKGtleSksICdcIjogPC9zcGFuPicsXHJcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwibnVsbFwiPlwiJywgZW5jb2RlKHZhbHVlKSwgJ1wiPC9zcGFuPicsXHJcblx0XHRcdCc8L2xpPidcclxuXHRcdF0uam9pbignJyk7XHJcblx0fVxyXG5cclxuXHRpZiAodHlwZSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0cmV0dXJuIFtcclxuXHRcdFx0JzxsaT4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cIicsIGV4cGFuZGVyQ2xhc3NlcywgJ1wiPjwvc3Bhbj4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cImtleVwiPlwiJywgZW5jb2RlKGtleSksICdcIjogPC9zcGFuPiAnLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cIm9wZW5cIj4nLCBvcGVuLCAnPC9zcGFuPiAnLFxyXG5cdFx0XHRcdCc8dWwgY2xhc3M9XCInLCBrbGFzcywgJ1wiPicsXHJcblx0XHRcdFx0XHRqc29uMmh0bWwodmFsdWUsIGV4cGFuZGVyQ2xhc3NlcyksXHJcblx0XHRcdFx0JzwvdWw+JyxcclxuXHRcdFx0XHQnPHNwYW4gY2xhc3M9XCJjbG9zZVwiPicsIGNsb3NlLCAnPC9zcGFuPicsXHJcblx0XHRcdCc8L2xpPidcclxuXHRcdF0uam9pbignJyk7XHJcblx0fVxyXG5cclxuXHRpZiAodHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdib29sZWFuJykge1xyXG5cdFx0cmV0dXJuIFtcclxuXHRcdFx0JzxsaT4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cImtleVwiPlwiJywgZW5jb2RlKGtleSksICdcIjogPC9zcGFuPicsXHJcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwiJywgdHlwZSwgJ1wiPicsIGVuY29kZSh2YWx1ZSksICc8L3NwYW4+JyxcclxuXHRcdFx0JzwvbGk+J1xyXG5cdFx0XS5qb2luKCcnKTtcclxuXHR9XHJcblx0cmV0dXJuIFtcclxuXHRcdCc8bGk+JyxcclxuXHRcdFx0JzxzcGFuIGNsYXNzPVwia2V5XCI+XCInLCBlbmNvZGUoa2V5KSwgJ1wiOiA8L3NwYW4+JyxcclxuXHRcdFx0JzxzcGFuIGNsYXNzPVwiJywgdHlwZSwgJ1wiPlwiJywgZW5jb2RlKHZhbHVlKSwgJ1wiPC9zcGFuPicsXHJcblx0XHQnPC9saT4nXHJcblx0XS5qb2luKCcnKTtcclxufTtcclxuXHJcbnZhciBqc29uMmh0bWwgPSBmdW5jdGlvbiAoanNvbiwgZXhwYW5kZXJDbGFzc2VzKSB7XHJcblx0dmFyIGh0bWwgPSAnJztcclxuXHRmb3IgKHZhciBrZXkgaW4ganNvbikge1xyXG5cdFx0aWYgKCFqc29uLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuXHRcdFx0Y29udGludWU7XHJcblx0XHR9XHJcblxyXG5cdFx0aHRtbCA9IFtodG1sLCBjcmVhdGVFbGVtZW50KGtleSwganNvbltrZXldLCB0eXBlb2YganNvbltrZXldLCBleHBhbmRlckNsYXNzZXMpXS5qb2luKCcnKTtcclxuXHR9XHJcblx0cmV0dXJuIGh0bWw7XHJcbn07XHJcblxyXG52YXIgZ2V0SnNvblZpZXdlciA9IGZ1bmN0aW9uIChkYXRhLCBvcHRpb25zKSB7XHJcblx0dHJ5IHtcclxuXHRcdHJldHVybiBbXHJcblx0XHRcdCc8dWwgY2xhc3M9XCInLCBwcmVmaXgsICctY29udGFpbmVyXCI+JyxcclxuXHRcdFx0XHRqc29uMmh0bWwoW0pTT04ucGFyc2UoZGF0YSldLCBnZXRFeHBhbmRlckNsYXNzZXMob3B0aW9ucy5leHBhbmRlZCkpLFxyXG5cdFx0XHQnPC91bD4nXHJcblx0XHRdLmpvaW4oJycpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJldHVybiBbXHJcblx0XHRcdCc8ZGl2IGNsYXNzPVwiJywgcHJlZml4LCAnLWVycm9yXCIgPicsIGUudG9TdHJpbmcoKSwgJyA8L2Rpdj4nXHJcblx0XHRdLmpvaW4oJycpO1xyXG5cdH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSwgb3B0KSB7XHJcblx0dmFyIGpzb24gPSAnJztcclxuXHR2YXIgb3B0aW9ucyA9IG9wdCB8fCB7ZXhwYW5kZWQ6IHRydWV9O1xyXG5cdGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykge1xyXG5cdFx0anNvbiA9IGRhdGE7XHJcblx0fSBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0anNvbiA9IEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcblx0fVxyXG5cdHJldHVybiBnZXRKc29uVmlld2VyKGpzb24sIG9wdGlvbnMpO1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvanNvbi1wYXJzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=", __webpack_require__.p + "highlightJson.worker.js");
	};

/***/ },
/* 16 */
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
/* 17 */
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
/* 18 */
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
					"events": true,
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
/* 19 */
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (function () {
		__webpack_require__(21);
		__webpack_require__(22);
		__webpack_require__(23);
		__webpack_require__(24);
		__webpack_require__(25);
		__webpack_require__(26);
		__webpack_require__(27);
	}());


/***/ },
/* 21 */
/***/ function(module, exports) {

	/**
	 * Custom Select component
	 */
	var self;
	
	/**
	 * Custom Select View-Model
	 * @param params
	 * @constructor
	 */
	function CustomSelect(params) {
	  self = this;
	
	  this.animationSpeed = params.animationSpeed || 200;
		this.curentSelectData = params.data || null;
		this.onFocus = params.focus || null;
		
	  //observables
	  this.selectModel = typeof params.options !=='function' ? ko.observableArray(params.options):  params.options;
	  this.placeholder = ko.observable(params.placeholder || '');
	  this.onselect = params.onselect || function (item) { console.log(item +'selected!')};
	  this.selected = ko.observable(this.selectModel()[0]);
	  this.isOneOption = ko.pureComputed(function () {
	    return this.selectModel().length < 2; // more than one option
	  }, this);
	}
	
	function findElement(event) {
	  var parent = $(event.currentTarget).parents('.js-custom-select');
	  return {
	    wrapper: parent.find('.js-custom-select-wrapper'),
	    layer: parent.find('.js-custom-select-layer')
	  }
	}
	
	/**
	 * Custom Select View-Model method
	 * @param viewModel
	 * @param event
	 */
	CustomSelect.prototype.slideToggle = function(viewModel, event) {
		// elem in focus emulation
		this.onFocus && this.onFocus(this.curentSelectData);
	
		if (this.isOneOption()) {return false;}
	  var el = findElement(event);
	    el.wrapper.slideToggle(viewModel.animationSpeed);
	    el.layer.toggleClass('hidden');
	};
	
	/**
	 * Custom Select View-Model method
	 * @param item
	 * @param event
	 */
	CustomSelect.prototype.selectItem = function (item, event) {
	  var self = this;
	  this.selected(item);
	  // run handler
	  this.onselect(item);
		// slide up
	  this.slideToggle(self, event);
	};
	
	module.exports = ko.components.register('custom-select', {
	  viewModel: CustomSelect,
	  template: ([
	    '<div class="api-exp-custom-select js-custom-select">',
	      '<div class="api-exp-custom-select-wrapper">',
	        '<select data-bind="options: selectModel, optionsText: \'name\', value: selected" class="api-exp-custom-select__field" name="api-exp-method"></select>',
	        '<span class="api-exp-custom-select__placeholder">',
	          '<input data-bind="event: {click: slideToggle}, attr: {value: selected().name, disabled: isOneOption}" type="text" value="" readonly="">',
	          '<b data-bind="css: {hidden: isOneOption}" class="api-exp-custom-select__chevron">&nbsp;</b>',
	        '</span>',
	        '<ul data-bind="foreach: selectModel" class="api-exp-custom-select__list js-custom-select-wrapper">',
	          '<li data-bind="css: {\'active\': checked}" class="api-exp-custom-select__item">',
	            '<button data-bind="event: {click: $parent.selectItem.bind($parent)}, text: name, css: {\'active\': checked()}, attr: {\'data-value\': name}"  class="api-exp-custom-select__item-label" href="#"></button>',
	            // '<span data-bind="if: link">',
	            	'<a data-bind="attr: {href: link}, css: {\'hidden\': !link}" class="api-exp-custom-select__item-link" target="_blank">&nbsp;</a>',
	            // '</span>',
	          '</li>',
	        '</ul>',
	      '</div>',
	      '<div data-bind="click: slideToggle" class="api-exp-custom-select-layer js-custom-select-layer hidden"></div>',
	    '</div>'
	  ]).join('')
	});


/***/ },
/* 22 */
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
		var data = params && params.data || {};
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
	
		if (params.page) {
			return params.page;
		}
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
/* 23 */
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
/* 24 */
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var self;
	var getRandomColor = __webpack_require__(19).getRandomColor;
	
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
			this.pageParam = page.pageParam;
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
/* 26 */
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
		this._allInside = !!Object.getProp(ko.utils.unwrapObservable(this.config), '._CONFIG.allInside');
		this.sortByConfig = this.panelGroup.sortByConfig;
	}
	
	ObjectPanelBody.prototype.onEnterKeyDown = function (model, event) {
		if (event.keyCode === 13) {
			var value = +event.currentTarget.value;
			value = Number.isNaN(value) ? 0 : value;
			var pageNumber = ~~value < 0 ? 0 : ~~value;
			self.pageParam(pageNumber < ko.utils.unwrapObservable(self.data).totalPages ? pageNumber : ko.utils.unwrapObservable(self.data).totalPages - 1);
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
	
	module.exports = ko.components.register('object-panel-body', {
		viewModel:  ObjectPanelBody,
		template:`
			<section data-bind="css: {'all-inside': $component._allInside}" class="panel-body">
				<!-- ko if: $component._panelName === 'image' -->
					<img data-bind="attr: {src: ko.utils.unwrapObservable(data).url, alt: 'image-' + ko.utils.unwrapObservable(data).ratio}" alt="img" class="img img-thumbnail">
				<!-- /ko -->
				
				<ul data-bind="foreachprop: {data: data, sortFn: $component.sortByConfig.bind($component)}">
					<li data-bind="css: {'object': typeof value === 'object', 'primitive': typeof value !== 'object'}" class="clearfix pading">
					
						<!-- ko ifnot: typeof value === 'object' && $component._allInside -->
						<span data-bind="text: typeof value === 'object' ? key: key + ':'" class="key"></span>
						<!-- /ko -->
						
						<!-- ko ifnot: typeof value === 'object' || $component._panelName === 'page' && key === 'number' -->
							<span data-bind="text: value" class="value"></span>
						<!-- /ko -->
						
						<!-- ko if: $component._panelName === 'page' && key === 'number'-->
							<div class="form-inline">
								<input id="pagination-input" data-bind="event: {keydown: $component.onEnterKeyDown}, attr: {placeholder: value}" type="text" pattern="[0-9]+" class="form-control">
							</div>
						<!-- /ko -->
						
						<!-- ko if: $component.canBeCopied.call($data, '#prop-value-' + key + $index()) -->
							<button data-bind="event: {mouseover: $component.copyValue, mouseout: $component.removeHandler}, css: {'copied': copied}, attr: {'data-clipboard-text': value.toString(), id: 'prop-value-' + key + $index()}" type="button" class="btn btn-icon btn-copy"></button>
						<!-- /ko -->
						
							<!-- ko if: typeof value === 'object' && $component._allInside -->
								<panel params="$data: $data, $index: $index, panelGroup: $component"></panel>
							<!-- /ko -->
							<!-- ko if: typeof value === 'object' && !$component._allInside -->
								<button data-bind="click: $component.getMore.bind($component, key, value)" type="button" class="btn btn-icon blue-shevron-right pull-right"></button>
							<!-- /ko -->
					</li>
				</ul>
			</section>
	`});


/***/ },
/* 27 */
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
	
	
	module.exports = ko.components.register('array-panel-body', {
		viewModel: ArrayPanelBody,
		template:`
			<section class="panel-body no-padding">
				<ul data-bind="foreach: data" class="list-group">
					<li class="list-group-item">
					
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
							<button data-bind="click: $component.getMore.bind($component, $index())" type="button" class="btn btn-icon blue-shevron-right pull-right"></button>
						<!-- /ko -->
						
					</li>
				</ul>
			</section>
	`});


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2NmYTQ5YWY4NTM4OGZlM2Y2NDciLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL3ZlbmRvcnMvY2xhbXAubWluLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jdXN0b21CaW5kaW5ncy9mb3JlYWNoUHJvcC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY3VzdG9tQmluZGluZ3MvYmxvY2tFbGxpcHNpcy5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9iYXNlLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2FwaWtleS5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9hamF4U2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9jb25maWdTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9WaWV3TW9kZWxzL21lbnVWaWV3TW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvaGVscGVyRnVuYy5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvVmlld01vZGVscy9wYXJhbXNWaWV3TW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvbWV0aG9kc1ZpZXdNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvVmlld01vZGVscy9yZXF1ZXN0c0xpc3RWaWV3TW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvanNvbi1oaWdobGlnaHQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvaGlnaGxpZ2h0SnNvbi53b3JrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi93b3JrZXItbG9hZGVyL2NyZWF0ZUlubGluZVdvcmtlci5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9zbGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29uZmlnLmpzb24iLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvY29sb3JDbGFzc2VzLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL2N1c3RvbVNlbGVjdC5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL3BhbmVsR3JvdXAuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYW5lbC5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL3BhZ2luYXRpb24uY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYW5lbEhlYWRpbmcuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9vYmplY3RQYW5lbEJvZHkuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9hcnJheVBhbmVsQm9keS5jb21wb25lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3RDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQW9DO0FBQ3BDLDJCQUEwQjtBQUMxQjtBQUNBLCtCQUE4QixPQUFPO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLElB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QUFDQTs7Ozs7OztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsSUFB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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRSIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGNjZmE0OWFmODUzODhmZTNmNjQ3XG4gKiovIiwidmFyIGNsYW1wID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vdmVuZG9ycy9jbGFtcC5taW4nKTtcblxuLyoqXG4gKiBNYWluIGZpbGUgZm9yIEFwaSBFeHBscmVyIHYyLjBcbiAqIEZvciBkZXZlbG9wbWVudCBwbGVhc2UgdXNlIFdlYnBhY2sgdG8gYnVuZGxlIGFsbCBtb2R1bGVzXG4gKiBJdCBjYW4gYmUgbWFkZSB1c2luZyBucG0gc2NyaXB0cyBjbWQgLSAnd2VicGFjaydcbiAqL1xuLy8gY3VzdG9tIGJpbmRpbmdzXG5yZXF1aXJlKCcuLi9jdXN0b21CaW5kaW5ncy9mb3JlYWNoUHJvcCcpO1xucmVxdWlyZSgnLi4vY3VzdG9tQmluZGluZ3MvYmxvY2tFbGxpcHNpcycpO1xuLy8gTW9kdWxlc1xudmFyIGJhc2UgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2Jhc2UnKTtcbnZhciBhcGlLZXkgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2FwaWtleScpO1xudmFyIGFqYXhTZXJ2aWNlID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9hamF4U2VydmljZScpO1xuXG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb25maWdTZXJ2aWNlJyk7XG4vLyBWaWV3IE1vZGVsc1xudmFyIE1lbnVWaWV3TW9kZWwgPSByZXF1aXJlKCcuL21lbnVWaWV3TW9kZWwnKTtcbnZhciBQYXJhbXNWaWV3TW9kZWwgPSByZXF1aXJlKCcuL3BhcmFtc1ZpZXdNb2RlbCcpO1xudmFyIE1ldGhvZHNWaWV3TW9kZWwgPSByZXF1aXJlKCcuL21ldGhvZHNWaWV3TW9kZWwnKTtcbnZhciBSZXF1ZXN0c0xpc3RWaWV3TW9kZWwgPSByZXF1aXJlKCcuL3JlcXVlc3RzTGlzdFZpZXdNb2RlbCcpO1xuLy8gQ29tcG9uZW50c1xucmVxdWlyZSgnLi4vY29tcG9uZW50cy9pbmRleCcpO1xuXG4vKipcbiAqIE1haW4gYXBwbGljYXRpb24gdmlldy1tb2RlbFxuICogQHBhcmFtIG9iaiB7b2JqZWN0fSBnbG9iYWwgZGF0YSBvYmplY3RcbiAqL1xuZnVuY3Rpb24gQXBwVmlld01vZGVsKG9iaikge1xuICBzZWxmID0gdGhpcztcbiAgdmFyIGJhc2UgPSBvYmogfHwge307XG5cdHZhciBwYXJzZWRVcmwgPSBwYXJzZVVybCgpO1xuICB0aGlzLmFwaUtleSA9IGFwaUtleTtcblx0dGhpcy5jb25maWcgPSBjb25maWc7XG5cbiAgLy8gb2JzZXJ2YWJsZXNcbiAgdGhpcy5zZWxlY3RlZENhdGVnb3J5ID0ga28ub2JzZXJ2YWJsZShwYXJzZWRVcmwuYXBpQ2F0ZWdvcnkgfHwgJycpO1xuICB0aGlzLnNlbGVjdGVkTWV0aG9kID0ga28ub2JzZXJ2YWJsZShwYXJzZWRVcmwubWV0aG9kSWQgfHwgJycpO1xuICB0aGlzLnNlbGVjdGVkUGFyYW1zID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcblx0dGhpcy5yZXF1ZXN0cyA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XG5cblx0Ly8gY29tcHV0ZWRcbiAgdGhpcy5VUkwgPSBrby5jb21wdXRlZCh0aGlzLmdldFVybCwgdGhpcyk7XG4gIHRoaXMuc2VuZEJ1dHRvblRleHQgPSBrby5wdXJlQ29tcHV0ZWQodGhpcy5nZXRNZXRob2ROYW1lLCB0aGlzKTtcblx0dGhpcy5zaGFyZVBhdGggPSBrby5wdXJlQ29tcHV0ZWQoZm9ybURlZXBMaW5raW5nVXJsLCB0aGlzKTtcblx0dGhpcy5zaGFyZVBhdGguc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWwpIHtcblx0XHRjb25zb2xlLmxvZyh2YWwpO1xuXHR9LCB0aGlzKTtcbiAgLy8gc3ViLW1vZGVsc1xuICB0aGlzLm1lbnUgPSBuZXcgTWVudVZpZXdNb2RlbChiYXNlLCB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkpO1xuICB0aGlzLm1ldGhvZHMgPSBuZXcgTWV0aG9kc1ZpZXdNb2RlbChiYXNlLCB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnksIHRoaXMuc2VsZWN0ZWRNZXRob2QpO1xuICB0aGlzLnBhcmFtcyA9IG5ldyBQYXJhbXNWaWV3TW9kZWwoYmFzZSwgdGhpcy5zZWxlY3RlZE1ldGhvZCwgdGhpcy5zZWxlY3RlZFBhcmFtcyk7XG4gIHRoaXMucmVxdWVzdHNMaXN0ID0gbmV3IFJlcXVlc3RzTGlzdFZpZXdNb2RlbCh0aGlzLnJlcXVlc3RzLCB0aGlzLnNlbGVjdGVkUGFyYW1zLCB0aGlzLnNoYXJlUGF0aCk7XG59XG5cbi8qKlxuICogU2VuZCByZXF1ZXN0IG1ldGhvZFxuICovXG5BcHBWaWV3TW9kZWwucHJvdG90eXBlLm9uQ2xpY2tTZW5kQnRuID0gZnVuY3Rpb24gKCkge1xuICBhamF4U2VydmljZSh0aGlzLlVSTCgpLCB0aGlzLnJlcXVlc3RzLCBiYXNlKTtcbn07XG5cbi8qKlxuICogR2V0cyBjdXJyZW50IG1ldGhvZCBuYW1lXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5BcHBWaWV3TW9kZWwucHJvdG90eXBlLmdldE1ldGhvZE5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnNlbGVjdGVkTWV0aG9kKCkubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG59O1xuXG4vKipcbiAqIEdldHMgcmF3IHVybCBkYXRhIGFycmF5XG4gKiBAcmV0dXJucyB7KltdfVxuICovXG5BcHBWaWV3TW9kZWwucHJvdG90eXBlLmdldFVybCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIFtcbiAgICB0aGlzLnNlbGVjdGVkTWV0aG9kKCksXG4gICAgdGhpcy5hcGlLZXksXG4gICAgdGhpcy5zZWxlY3RlZFBhcmFtcygpXG4gIF07XG59O1xuXG4vKipcbiAqIEdldHMgZGVlcCBwcm9wXG4gKiBAcmV0dXJucyB7KltdfVxuICovXG5PYmplY3QuZ2V0UHJvcCA9IGZ1bmN0aW9uKG8sIHMpIHtcblx0aWYgKHR5cGVvZiBvICE9PSAnb2JqZWN0JyB8fCAhcykge1xuXHRcdGNvbnNvbGUubG9nKG8scyk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHMgPSBzLnJlcGxhY2UoL1xcWyhcXHcrKVxcXS9nLCAnLiQxJyk7IC8vIGNvbnZlcnQgaW5kZXhlcyB0byBwcm9wZXJ0aWVzXG5cdHMgPSBzLnJlcGxhY2UoL15cXC4vLCAnJyk7ICAgICAgICAgICAvLyBzdHJpcCBhIGxlYWRpbmcgZG90XG5cdHZhciBhID0gcy5zcGxpdCgnLicpO1xuXHRmb3IgKHZhciBpID0gMCwgbiA9IGEubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG5cdFx0dmFyIGsgPSBhW2ldO1xuXHRcdGlmIChrIGluIG8pIHtcblx0XHRcdG8gPSBvW2tdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG5cdHJldHVybiBvO1xufTtcblxuLyoqXG4gKiBBY3RpdmF0ZXMga25vY2tvdXQuanNcbiAqL1xua28uYXBwbHlCaW5kaW5ncyhuZXcgQXBwVmlld01vZGVsKGJhc2UpKTtcbi8qKlxuICogZXhwb3J0cyBnbG9iYWwgdmFyaWFibGVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBiYXNlO1xuXG5mdW5jdGlvbiBmb3JtRGVlcExpbmtpbmdVcmwoKSB7XG5cdHZhciBsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbjtcblx0dmFyIGNhdGVnb3J5ID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShzZWxmLnNlbGVjdGVkQ2F0ZWdvcnkpO1xuXHR2YXIgbWV0aG9kID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShzZWxmLnNlbGVjdGVkTWV0aG9kKTtcblx0dmFyIHBhcmFtcyA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUoc2VsZi5zZWxlY3RlZFBhcmFtcyk7XG5cblx0dmFyIHF1ZXJ5cyA9IFtcblx0XHQnYXBpQ2F0ZWdvcnk9JyArIGVuY29kZVVSSShjYXRlZ29yeSksXG5cdFx0J21ldGhvZElkPScrIGVuY29kZVVSSShtZXRob2QuaWQpXG5cdF07XG5cblx0cGFyYW1zLm1hcChmdW5jdGlvbiAocGFyYW0pIHtcblx0XHR2YXIgdmFsdWUgPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHBhcmFtLnZhbHVlKTtcblx0XHR2YXIgZGVmYXVsdFZhbHVlID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShwYXJhbS5kZWZhdWx0KTtcblx0XHRxdWVyeXMucHVzaChbXG5cdFx0XHRwYXJhbS5uYW1lLFxuXHRcdFx0Jz0nLFxuXHRcdFx0dmFsdWUgIT09ICcnID8gdmFsdWUgOiBkZWZhdWx0VmFsdWUgLy90b2RvOiByZW1vdmUgZGVmYXVsdCBmcm9tIGhlcmUgd2hlbiBzZXQgdXAgaXQgaW4gc291cmNlIGxpa2UgdmFsdWUgYnkgZGVmYXVsdFxuXHRcdF0uam9pbignJykpO1xuXHRcdHJldHVybiBwYXJhbTtcblx0fSk7XG5cblx0cmV0dXJuIFtcblx0XHRsb2NhdGlvbi5vcmlnaW4sXG5cdFx0bG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvJC9nbWksICcnKSxcblx0XHQnPycsXG5cdFx0cXVlcnlzLmpvaW4oJyYnKVxuXHRdLmpvaW4oJycpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVVybCgpIHtcblx0dmFyIGxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcblx0aWYgKGxvY2F0aW9uKSB7XG5cdFx0dmFyIHF1ZXJ5cyA9IGxvY2F0aW9uLnJlcGxhY2UoL15cXD8vZywgJycpLnNwbGl0KCcmJyk7XG5cdFx0dmFyIG9iaiA9IHtcblx0XHRcdGFwaUNhdGVnb3J5OiAnJyxcblx0XHRcdG1ldGhvZElkOiAnJyxcblx0XHRcdHNlbGVjdGVkUGFyYW1zOiBbXVxuXHRcdH07XG5cblx0XHRxdWVyeXMubWFwKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHR2YXIgYSA9IGRlY29kZVVSSShlKS5zcGxpdCgnPScpO1xuXHRcdFx0dmFyIGtleSA9IGFbMF07XG5cdFx0XHR2YXIgdmFsID0gYVsxXTtcblxuXHRcdFx0aWYgKGtleSA9PT0gJ2FwaUNhdGVnb3J5JyB8fCBrZXkgPT09ICdtZXRob2RJZCcpIHtcblx0XHRcdFx0b2JqW2tleV0gPSB2YWw7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvYmouc2VsZWN0ZWRQYXJhbXMucHVzaCh7XG5cdFx0XHRcdFx0bmFtZToga2V5LFxuXHRcdFx0XHRcdHZhbHVlOiB2YWxcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gb2JqO1xuXHR9XG5cdHJldHVybiB7fTtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvVmlld01vZGVscy9tYWluLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyohXG4qIENsYW1wLmpzIDAuNS4xXG4qXG4qIENvcHlyaWdodCAyMDExLTIwMTMsIEpvc2VwaCBTY2htaXR0IGh0dHA6Ly9qb2Uuc2hcbiogUmVsZWFzZWQgdW5kZXIgdGhlIFdURlBMIGxpY2Vuc2VcbiogaHR0cDovL3NhbS56b3kub3JnL3d0ZnBsL1xuKi9cbihmdW5jdGlvbigpe3dpbmRvdy4kY2xhbXA9ZnVuY3Rpb24oYyxkKXtmdW5jdGlvbiBzKGEsYil7bi5nZXRDb21wdXRlZFN0eWxlfHwobi5nZXRDb21wdXRlZFN0eWxlPWZ1bmN0aW9uKGEsYil7dGhpcy5lbD1hO3RoaXMuZ2V0UHJvcGVydHlWYWx1ZT1mdW5jdGlvbihiKXt2YXIgYz0vKFxcLShbYS16XSl7MX0pL2c7XCJmbG9hdFwiPT1iJiYoYj1cInN0eWxlRmxvYXRcIik7Yy50ZXN0KGIpJiYoYj1iLnJlcGxhY2UoYyxmdW5jdGlvbihhLGIsYyl7cmV0dXJuIGMudG9VcHBlckNhc2UoKX0pKTtyZXR1cm4gYS5jdXJyZW50U3R5bGUmJmEuY3VycmVudFN0eWxlW2JdP2EuY3VycmVudFN0eWxlW2JdOm51bGx9O3JldHVybiB0aGlzfSk7cmV0dXJuIG4uZ2V0Q29tcHV0ZWRTdHlsZShhLG51bGwpLmdldFByb3BlcnR5VmFsdWUoYil9ZnVuY3Rpb24gdChhKXthPWF8fGMuY2xpZW50SGVpZ2h0O3ZhciBiPXUoYyk7cmV0dXJuIE1hdGgubWF4KE1hdGguZmxvb3IoYS9iKSwwKX1mdW5jdGlvbiB4KGEpe3JldHVybiB1KGMpKlxuYX1mdW5jdGlvbiB1KGEpe3ZhciBiPXMoYSxcImxpbmUtaGVpZ2h0XCIpO1wibm9ybWFsXCI9PWImJihiPTEuMipwYXJzZUludChzKGEsXCJmb250LXNpemVcIikpKTtyZXR1cm4gcGFyc2VJbnQoYil9ZnVuY3Rpb24gbChhKXtpZihhLmxhc3RDaGlsZC5jaGlsZHJlbiYmMDxhLmxhc3RDaGlsZC5jaGlsZHJlbi5sZW5ndGgpcmV0dXJuIGwoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYS5jaGlsZHJlbikucG9wKCkpO2lmKGEubGFzdENoaWxkJiZhLmxhc3RDaGlsZC5ub2RlVmFsdWUmJlwiXCIhPWEubGFzdENoaWxkLm5vZGVWYWx1ZSYmYS5sYXN0Q2hpbGQubm9kZVZhbHVlIT1iLnRydW5jYXRpb25DaGFyKXJldHVybiBhLmxhc3RDaGlsZDthLmxhc3RDaGlsZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGEubGFzdENoaWxkKTtyZXR1cm4gbChjKX1mdW5jdGlvbiBwKGEsZCl7aWYoZCl7dmFyIGU9YS5ub2RlVmFsdWUucmVwbGFjZShiLnRydW5jYXRpb25DaGFyLFwiXCIpO2Z8fChoPTA8ay5sZW5ndGg/XG5rLnNoaWZ0KCk6XCJcIixmPWUuc3BsaXQoaCkpOzE8Zi5sZW5ndGg/KHE9Zi5wb3AoKSxyKGEsZi5qb2luKGgpKSk6Zj1udWxsO20mJihhLm5vZGVWYWx1ZT1hLm5vZGVWYWx1ZS5yZXBsYWNlKGIudHJ1bmNhdGlvbkNoYXIsXCJcIiksYy5pbm5lckhUTUw9YS5ub2RlVmFsdWUrXCIgXCIrbS5pbm5lckhUTUwrYi50cnVuY2F0aW9uQ2hhcik7aWYoZil7aWYoYy5jbGllbnRIZWlnaHQ8PWQpaWYoMDw9ay5sZW5ndGgmJlwiXCIhPWgpcihhLGYuam9pbihoKStoK3EpLGY9bnVsbDtlbHNlIHJldHVybiBjLmlubmVySFRNTH1lbHNlXCJcIj09aCYmKHIoYSxcIlwiKSxhPWwoYyksaz1iLnNwbGl0T25DaGFycy5zbGljZSgwKSxoPWtbMF0scT1mPW51bGwpO2lmKGIuYW5pbWF0ZSlzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cChhLGQpfSwhMD09PWIuYW5pbWF0ZT8xMDpiLmFuaW1hdGUpO2Vsc2UgcmV0dXJuIHAoYSxkKX19ZnVuY3Rpb24gcihhLGMpe2Eubm9kZVZhbHVlPWMrYi50cnVuY2F0aW9uQ2hhcn1kPWR8fHt9O1xudmFyIG49d2luZG93LGI9e2NsYW1wOmQuY2xhbXB8fDIsdXNlTmF0aXZlQ2xhbXA6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGQudXNlTmF0aXZlQ2xhbXA/ZC51c2VOYXRpdmVDbGFtcDohMCxzcGxpdE9uQ2hhcnM6ZC5zcGxpdE9uQ2hhcnN8fFtcIi5cIixcIi1cIixcIlxcdTIwMTNcIixcIlxcdTIwMTRcIixcIiBcIl0sYW5pbWF0ZTpkLmFuaW1hdGV8fCExLHRydW5jYXRpb25DaGFyOmQudHJ1bmNhdGlvbkNoYXJ8fFwiXFx1MjAyNlwiLHRydW5jYXRpb25IVE1MOmQudHJ1bmNhdGlvbkhUTUx9LGU9Yy5zdHlsZSx5PWMuaW5uZXJIVE1MLHo9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGMuc3R5bGUud2Via2l0TGluZUNsYW1wLGc9Yi5jbGFtcCx2PWcuaW5kZXhPZiYmKC0xPGcuaW5kZXhPZihcInB4XCIpfHwtMTxnLmluZGV4T2YoXCJlbVwiKSksbTtiLnRydW5jYXRpb25IVE1MJiYobT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSxtLmlubmVySFRNTD1iLnRydW5jYXRpb25IVE1MKTt2YXIgaz1iLnNwbGl0T25DaGFycy5zbGljZSgwKSxcbmg9a1swXSxmLHE7XCJhdXRvXCI9PWc/Zz10KCk6diYmKGc9dChwYXJzZUludChnKSkpO3ZhciB3O3omJmIudXNlTmF0aXZlQ2xhbXA/KGUub3ZlcmZsb3c9XCJoaWRkZW5cIixlLnRleHRPdmVyZmxvdz1cImVsbGlwc2lzXCIsZS53ZWJraXRCb3hPcmllbnQ9XCJ2ZXJ0aWNhbFwiLGUuZGlzcGxheT1cIi13ZWJraXQtYm94XCIsZS53ZWJraXRMaW5lQ2xhbXA9Zyx2JiYoZS5oZWlnaHQ9Yi5jbGFtcCtcInB4XCIpKTooZT14KGcpLGU8PWMuY2xpZW50SGVpZ2h0JiYodz1wKGwoYyksZSkpKTtyZXR1cm57b3JpZ2luYWw6eSxjbGFtcGVkOnd9fX0pKCk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvdmVuZG9ycy9jbGFtcC5taW4uanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIgbW9kdWxlLmV4cG9ydHMgPSBrby5iaW5kaW5nSGFuZGxlcnMuZm9yZWFjaHByb3AgPSB7XG5cblx0dHJhbnNmb3JtT2JqZWN0OiBmdW5jdGlvbiAocGFyYW1zKSB7XG5cdFx0dmFyIHByb3BlcnRpZXMgPSBbXTtcblx0XHR2YXIgb2JqLCBzb3J0Rm4gPSBwYXJhbXMuc29ydEZuO1xuXG5cdFx0b2JqID0gc29ydEZuID8gcGFyYW1zLmRhdGE6IHBhcmFtcztcblx0XHRvYmogPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKG9iaik7XG5cblx0XHRrby51dGlscy5vYmplY3RGb3JFYWNoKG9iaiwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdHByb3BlcnRpZXMucHVzaCh7XG5cdFx0XHRcdGtleToga2V5LFxuXHRcdFx0XHR2YWx1ZTogdmFsdWVcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0aWYgKHNvcnRGbikge1xuXHRcdFx0cHJvcGVydGllcy5zb3J0KHNvcnRGbik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHByb3BlcnRpZXM7XG5cdH0sXG5cdGluaXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IsIGFsbEJpbmRpbmdzQWNjZXNzb3IsIHZpZXdNb2RlbCwgYmluZGluZ0NvbnRleHQpIHtcblx0XHR2YXIgcHJvcGVydGllcyA9IGtvLnB1cmVDb21wdXRlZChmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgb2JqID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZSh2YWx1ZUFjY2Vzc29yKCkpO1xuXHRcdFx0cmV0dXJuIGtvLmJpbmRpbmdIYW5kbGVycy5mb3JlYWNocHJvcC50cmFuc2Zvcm1PYmplY3Qob2JqKTtcblx0XHR9KTtcblx0XHRrby5hcHBseUJpbmRpbmdzVG9Ob2RlKGVsZW1lbnQsIHtcblx0XHRcdGZvcmVhY2g6IHByb3BlcnRpZXNcblx0XHR9LCBiaW5kaW5nQ29udGV4dCk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNvbnRyb2xzRGVzY2VuZGFudEJpbmRpbmdzOiB0cnVlXG5cdFx0fTtcblx0fVxufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY3VzdG9tQmluZGluZ3MvZm9yZWFjaFByb3AuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJrby5iaW5kaW5nSGFuZGxlcnMuYmxvY2tFbGxpcHNpcyA9IHtcblx0aW5pdDogZnVuY3Rpb24oZWxlbWVudCwgdmFsdWVBY2Nlc3NvciwgYWxsQmluZGluZ3MsIHZpZXdNb2RlbCwgYmluZGluZ0NvbnRleHQpIHtcblx0XHQkY2xhbXAoZWxlbWVudCwgdmFsdWVBY2Nlc3NvcigpKTtcblx0fVxufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY3VzdG9tQmluZGluZ3MvYmxvY2tFbGxpcHNpcy5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiYXNlID0ge307XHJcbnZhciBDT05GSUdfVVJMID0gJy4uLy4uL2FwaWRlc2NyaXB0aW9uLnhtbCc7XHJcblxyXG52YXIgcGFyc2VEYXRhID0gZnVuY3Rpb24gKHhtbCkge1xyXG5cdHZhciBnbG9iYWwgPSB7fTtcclxuXHQvL2dldCBhbGwgQVBJc1xyXG5cdHZhciByZXNvdXJjZXNFbCA9ICQoeG1sKS5maW5kKFwicmVzb3VyY2VzXCIpLmVxKDApO1xyXG5cclxuXHQvLyByZXNvdXJjZVxyXG5cdCQoeG1sKVxyXG5cdFx0LmZpbmQoXCJyZXNvdXJjZVwiKVxyXG5cdFx0LmdldCgpXHJcblx0XHQubWFwKGZ1bmN0aW9uIChyZXMpIHtcclxuXHRcdFx0dmFyIHJlc291cmNlID0gJChyZXMpO1xyXG5cdFx0XHQvLyBtZXRob2QgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0dmFyIG1ldGhvZEVsZW0gPSByZXNvdXJjZS5maW5kKFwibWV0aG9kXCIpLmVxKDApO1xyXG5cclxuXHRcdFx0dmFyIG1ldGhvZCA9IHtcclxuXHRcdFx0XHRpZCA6IG1ldGhvZEVsZW0uYXR0cihcImlkXCIpLCAvLyBtZXRob2QgaWRcclxuXHRcdFx0XHRuYW1lIDogbWV0aG9kRWxlbS5hdHRyKFwiYXBpZ2VlOmRpc3BsYXlOYW1lXCIpIHx8IG1ldGhvZEVsZW0uYXR0cihcImlkXCIpLCAvLyBtZXRob2QgbmFtZVxyXG5cdFx0XHRcdG1ldGhvZCA6IG1ldGhvZEVsZW0uYXR0cignbmFtZScpLCAvLyBHRVQgb3IgUE9TVFxyXG5cdFx0XHRcdGNhdGVnb3J5IDogbWV0aG9kRWxlbS5maW5kKCdbcHJpbWFyeT1cInRydWVcIl0nKS50ZXh0KCkudHJpbSgpLCAvLyBBUEkgbmFtZVxyXG5cdFx0XHRcdHBhdGg6IHJlc291cmNlLmF0dHIoJ3BhdGgnKSwgLy8gbWV0aG9kIFVSTFxyXG5cdFx0XHRcdGJhc2UgOiByZXNvdXJjZXNFbC5hdHRyKCdiYXNlJyksIC8vIG1ldGhvZCBiYXNlIGxpbmtcclxuXHRcdFx0XHRsaW5rIDogbWV0aG9kRWxlbS5maW5kKCdkb2MnKS5lcSgwKS5hdHRyKCdhcGlnZWU6dXJsJyksIC8vIGxpbmsgdG8gZG9jdW1lbnRhdGlvblxyXG5cdFx0XHRcdGRlc2NyaXB0aW9uIDogbWV0aG9kRWxlbS5maW5kKCdkb2MnKS5lcSgwKS50ZXh0KCkudHJpbSgpLCAvL21ldGhvZCBkZXNjcmlwdGlvblxyXG5cdFx0XHRcdHBhcmFtZXRlcnM6IHt9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQvLyBwYXJhbXMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0cmVzb3VyY2VcclxuXHRcdFx0XHQuZmluZCgncGFyYW0nKVxyXG5cdFx0XHRcdC5nZXQoKVxyXG5cdFx0XHRcdC5tYXAoZnVuY3Rpb24gKHBhcikge1xyXG5cdFx0XHRcdFx0dmFyIHBhcmFtID0gJChwYXIpO1xyXG5cdFx0XHRcdFx0dmFyIG9wdGlvbnMgPSBwYXJhbS5maW5kKCdvcHRpb24nKTtcclxuXHRcdFx0XHRcdHZhciBpc1NlbGVjdCA9ICEhb3B0aW9ucy5sZW5ndGg7XHJcblxyXG5cdFx0XHRcdFx0dmFyIHBhcmFtZXRlciA9IHtcclxuXHRcdFx0XHRcdFx0bmFtZTogcGFyYW0uYXR0cignbmFtZScpLFxyXG5cdFx0XHRcdFx0XHRkb2M6IHBhcmFtLmZpcnN0KCdkb2MnKS50ZXh0KCkudHJpbSgpLFxyXG5cdFx0XHRcdFx0XHRzdHlsZTogcGFyYW0uYXR0cignc3R5bGUnKSxcclxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ6IHBhcmFtLmF0dHIoJ3JlcXVpcmVkJyksXHJcblx0XHRcdFx0XHRcdGRlZmF1bHQ6IHBhcmFtLmF0dHIoJ2RlZmF1bHQnKSA9PT0gJ25vbmUnICYmIGlzU2VsZWN0ID8gJycgOiBwYXJhbS5hdHRyKCdkZWZhdWx0JyksXHJcblx0XHRcdFx0XHRcdHNlbGVjdDogaXNTZWxlY3RcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0aWYgKGlzU2VsZWN0KSB7XHJcblx0XHRcdFx0XHRcdHBhcmFtZXRlci5vcHRpb25zID0gb3B0aW9ucy5nZXQoKS5tYXAoZnVuY3Rpb24gKG9wdGlvbikge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRcdFx0XHRuYW1lOiAkKG9wdGlvbikuYXR0cigndmFsdWUnKSxcclxuXHRcdFx0XHRcdFx0XHRcdGNoZWNrZWQ6ICQob3B0aW9uKS5hdHRyKCd2YWx1ZScpID09PSBwYXJhbWV0ZXIuZGVmYXVsdCB8fCAkKG9wdGlvbikuYXR0cigndmFsdWUnKSA9PT0gJ25vbmUnLFxyXG5cdFx0XHRcdFx0XHRcdFx0bGluazogZmFsc2VcclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRtZXRob2QucGFyYW1ldGVyc1twYXJhbWV0ZXIubmFtZV0gPSBwYXJhbWV0ZXI7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvKipcclxuXHRcdFx0ICogR2xvYmFsIG9iaiBjb21wb3NpdGlvblxyXG4gICAgICAgKi9cclxuXHRcdFx0Ly8gc2V0IGNhdGVnb3J5IG9ialxyXG5cdFx0XHRnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XSA9IGdsb2JhbFttZXRob2QuY2F0ZWdvcnldIHx8IHt9O1xyXG5cclxuXHRcdFx0Ly8gc2V0IG1ldGhvZHMgdHlwZSBvYmpcclxuXHRcdFx0Z2xvYmFsW21ldGhvZC5jYXRlZ29yeV0uQUxMID0gZ2xvYmFsW21ldGhvZC5jYXRlZ29yeV0uQUxMIHx8IHt9O1xyXG5cdFx0XHRnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XVttZXRob2QubWV0aG9kXSA9IGdsb2JhbFttZXRob2QuY2F0ZWdvcnldW21ldGhvZC5tZXRob2RdIHx8IHt9O1xyXG5cclxuXHRcdFx0Ly8gc2V0IG1ldGhvZCBvYmpcclxuXHRcdFx0Z2xvYmFsW21ldGhvZC5jYXRlZ29yeV0uQUxMW21ldGhvZC5pZF0gPSBtZXRob2Q7XHJcblx0XHRcdGdsb2JhbFttZXRob2QuY2F0ZWdvcnldW21ldGhvZC5tZXRob2RdW21ldGhvZC5pZF0gPSBtZXRob2Q7XHJcblx0XHR9KTtcclxuXHJcblx0cmV0dXJuIGdsb2JhbDtcclxufTtcclxuXHJcbi8vZ2V0cyBkb2N1bWVudCBmcm9tIFdBREwgY29uZmlndXJhdGlvbiBmaWxlXHJcbnZhciByZWFkRnJvbVdBREwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgJC5hamF4KHtcclxuICAgIHVybDogQ09ORklHX1VSTCxcclxuICAgIGFzeW5jIDogZmFsc2UsXHJcbiAgICBkYXRhVHlwZTogKCQuYnJvd3Nlci5tc2llKSA/IFwidGV4dFwiIDogXCJ4bWxcIixcclxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgIHZhciB4bWw7XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHJlc3BvbnNlID09IFwic3RyaW5nXCIpe1xyXG4gICAgICAgIHhtbCA9IG5ldyBBY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTERPTVwiKTtcclxuICAgICAgICB4bWwuYXN5bmMgPSBmYWxzZTtcclxuICAgICAgICB4bWwubG9hZFhNTChyZXNwb25zZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgeG1sID0gcmVzcG9uc2U7XHJcbiAgICAgIH1cclxuXHJcblx0XHRcdGJhc2UgPSBwYXJzZURhdGEoeG1sKTtcclxuICAgIH0sXHJcblxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uKFhNTEh0dHBSZXF1ZXN0LCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bil7XHJcbiAgICAgIGFsZXJ0KCdEYXRhIENvdWxkIE5vdCBCZSBMb2FkZWQgLSAnKyB0ZXh0U3RhdHVzKTtcclxuICAgIH1cclxuICB9KTtcclxufTtcclxucmVhZEZyb21XQURMKCk7XHJcbm1vZHVsZS5leHBvcnRzID0gYmFzZTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2Jhc2UuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYXBpS2V5ID0gJ1hpT3JOMlVDOXlqdVI0WEY4N3NkTWJScGFWTnNQNlcyJyB8fCBhcGlLZXlTZXJ2aWNlLmNoZWNrQXBpS2V5Q29va2llKCd0ay1hcGkta2V5JykgfHwgYXBpS2V5U2VydmljZS5nZXRBcGlFeHBsb3JlS2V5KCk7IC8vQVBJIEtleVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgbmFtZTogJ2FwaWtleScsXHJcbiAgc3R5bGU6ICdxdWVyeScsXHJcbiAgdmFsdWU6IGtvLm9ic2VydmFibGUoYXBpS2V5KVxyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvYXBpa2V5LmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXHJcbiAqIEFqYXggU2VydmljZVxyXG4gKiBAcGFyYW0gdXJsXHJcbiAqIEBwYXJhbSBtZXRob2RcclxuICogQHBhcmFtIGNhbGxiYWNrXHJcbiAqL1xyXG52YXIgYWpheFNlcnZpY2UgPSBmdW5jdGlvbiAodXJsLCBtZXRob2QsIGNhbGxiYWNrKSB7XHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IG1ldGhvZCxcclxuICAgIHVybDogdXJsLFxyXG4gICAgYXN5bmM6IHRydWUsXHJcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICBjb21wbGV0ZTogY2FsbGJhY2tcclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGaWx0ZXJzIGFuZCBwcmVwYXJlcyBwYXJhbXMgcGFpcnNcclxuICogQHBhcmFtIGFyclxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbnZhciBwcmVwYXJlVXJsID0gZnVuY3Rpb24gKGFycikge1xyXG4gIHZhciByZXBsYWNlbWVudCwgdXJsLCBkb21haW4sIHBhdGgsIG1ldGhvZCwgYXBpS2V5LCBwYXJhbXM7XHJcblxyXG4gIGlmICghYXJyICYmICFhcnIubGVuZ3RoKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIFxyXG4gIGRvbWFpbiA9IGFyclswXS5iYXNlO1xyXG4gIHBhdGggPSBhcnJbMF0ucGF0aDtcclxuICBhcGlLZXkgPSBhcnJbMV07XHJcbiAgcGFyYW1zID0gYXJyWzJdLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgcmV0dXJuIGl0ZW0uc3R5bGUgPT09ICdxdWVyeSc7XHJcbiAgfSk7XHJcblxyXG4gIC8vIGFyciBvZiB0ZW1wbGF0ZSBtYXJrc1xyXG4gIHJlcGxhY2VtZW50ID0gcGF0aC5tYXRjaCgvKFtee10qPylcXHcoPz1cXH0pL2dtaSk7XHJcblxyXG4gIC8vIGFyciBvZiB0ZW1wbGF0ZSBwYXJhbXNcclxuICB2YXIgdGVtcGxhdGVzQXJyID0gYXJyWzJdLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgcmV0dXJuIGl0ZW0uc3R5bGUgPT09ICd0ZW1wbGF0ZSc7XHJcbiAgfSk7XHJcblxyXG4gIC8vIHJlcGxhY2VtZW50XHJcbiAgcmVwbGFjZW1lbnQuZm9yRWFjaChmdW5jdGlvbiAodmFsKSB7XHJcbiAgICB2YXIgcGFyYW0gPSB0ZW1wbGF0ZXNBcnIuZmluZChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICByZXR1cm4gaXRlbS5uYW1lID09PSB2YWw7XHJcbiAgICB9KTtcclxuICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoJ3snKyBwYXJhbS5uYW1lICsgJ30nLCBwYXJhbS52YWx1ZSgpIHx8IHBhcmFtLmRlZmF1bHQpO1xyXG4gIH0pO1xyXG5cclxuICAvLyBhZGRzIGFwaUtleSBwYXJhbVxyXG4gIGlmICghcGFyYW1zWzBdIHx8IHBhcmFtc1swXS5uYW1lICE9PSAnYXBpa2V5Jykge1xyXG4gICAgcGFyYW1zLnVuc2hpZnQoYXBpS2V5KTtcclxuICB9XHJcblxyXG4gIC8vIHByZXBhcmVzIHBhcmFtcyBwYXJ0IG9mIHVybFxyXG4gIHBhcmFtcyA9IHBhcmFtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgcmV0dXJuIFtpdGVtLm5hbWUsIGl0ZW0udmFsdWUoKSB8fCBpdGVtLmRlZmF1bHRdLmpvaW4oJz0nKTtcclxuICAgIH0pLmpvaW4oJyYnKTtcclxuXHJcbiAgdXJsID0gW2RvbWFpbiwgJy8nLCBwYXRoLCAnPycsIHBhcmFtc10uam9pbignJyk7XHJcblxyXG4gIHJldHVybiBlbmNvZGVVUkkodXJsKTtcclxufTtcclxuXHJcbi8vIHNlbmRzIHJlcXVlc3QgdG8gZ2V0IHRoZSBzZWNvbmQgY29sdW1uXHJcbnZhciBzZW5kUHJpbWFyeVJlcXVlc3QgPSBmdW5jdGlvbiAoYXJyLCByZXF1ZXN0cywgZ2xvYmFsKSB7XHJcbiAgdmFyIHVybCA9IHByZXBhcmVVcmwoYXJyKTtcclxuXHJcbiAgYWpheFNlcnZpY2UodXJsLCBhcnJbMF0ubWV0aG9kLCBmdW5jdGlvbihyZXMsIG1zZykge1xyXG5cdFx0dmFyIHJlc09iaiA9IHtcclxuXHRcdFx0cmVxOiB1cmwsXHJcblx0XHRcdGluZGV4OiByZXF1ZXN0cygpLmxlbmd0aFxyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAobXNnID09ICdlcnJvcicpIHtcclxuXHRcdFx0dmFyIGVyciA9IHJlcyAmJlxyXG5cdFx0XHRcdHJlcy5yZXNwb25zZUpTT04gJiZcclxuXHRcdFx0XHRyZXMucmVzcG9uc2VKU09OLmVycm9ycyAmJlxyXG5cdFx0XHRcdHJlcy5yZXNwb25zZUpTT04uZXJyb3JzWzBdO1xyXG5cclxuXHRcdFx0cmVzT2JqLmVycm9yID0ge1xyXG5cdFx0XHRcdGNvZGU6IGVyciA/IGVyci5jb2RlOiA1MDAsXHJcblx0XHRcdFx0bWVzc2FnZTogZXJyID8gZXJyLmRldGFpbDogJ05vIHJlc3BvbmNlIGRhdGEhJ1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRnbG9iYWwubGFzdFJlc3BvbnNlID0gcmVzT2JqLnJlcyA9IHtcclxuXHRcdFx0XHRpZDogYXJyWzBdLmlkLCAvLyBtZXRob2QgaWQgd2FzIHVzZWRcclxuXHRcdFx0XHRyZXM6IHJlcy5yZXNwb25zZUpTT04gLy8gcmVzcG9uc2VcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBleHBvcnRpbmcgZGF0YSB1c2luZyBvYnNlcnZhYmxlXHJcblx0XHRyZXF1ZXN0cy51bnNoaWZ0KHJlc09iaik7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBzZW5kUHJpbWFyeVJlcXVlc3Q7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9hamF4U2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjb25maWcgPSBrby5vYnNlcnZhYmxlKCk7XHJcblxyXG4kLmFqYXgoe1xyXG5cdHR5cGU6ICdHRVQnLFxyXG5cdHVybDogW1xyXG5cdFx0J2h0dHA6Ly8nLFxyXG5cdFx0ZG9jdW1lbnQubG9jYXRpb24uaG9zdG5hbWUsXHJcblx0XHRkb2N1bWVudC5sb2NhdGlvbi5wb3J0ICYmICc6JyArIGRvY3VtZW50LmxvY2F0aW9uLnBvcnQsXHJcblx0XHQnL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbmZpZy5qc29uJ1xyXG5cdF0uam9pbignJyksXHJcblx0YXN5bmM6IHRydWUsXHJcblx0ZGF0YVR5cGU6IFwianNvblwiLFxyXG5cdGNvbXBsZXRlOiBmdW5jdGlvbihyZXMsIG1zZykge1xyXG5cdFx0aWYgKG1zZyA9PSAnZXJyb3InKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ2NhblxcJ3QgbG9hZCBjb25maWcuanNvbiEnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbmZpZyhyZXMucmVzcG9uc2VKU09OKTtcclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjb25maWc7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9jb25maWdTZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGhmID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9oZWxwZXJGdW5jJyk7XHJcbnZhciBzZWxmO1xyXG5cclxuLyoqXHJcbiAqIE1lbnUgVmlldy1Nb2RlbFxyXG4gKiBAcGFyYW0gYmFzZVxyXG4gKiBAcGFyYW0gY2F0ZWdvcnlcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBNZW51Vmlld01vZGVsKGJhc2UsIHNlbGVjdGVkQ2F0ZWdvcnkpIHtcclxuICBzZWxmID0gdGhpcztcclxuXHJcblx0dGhpcy5zZWxlY3RlZENhdGVnb3J5ID0gc2VsZWN0ZWRDYXRlZ29yeTtcclxuXHR2YXIgaW5pdENhdGVnb3J5ID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShzZWxlY3RlZENhdGVnb3J5KTtcclxuXHR0aGlzLmNhdGVnb3JpZXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoT2JqZWN0LmtleXMoYmFzZSkubWFwKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xyXG5cdFx0dmFyIGNoZWNrZWQgPSBpbml0Q2F0ZWdvcnkgPyBpdGVtID09PSBpbml0Q2F0ZWdvcnk6ICFpbmRleDtcclxuXHRcdC8vIGluaXRpYWwgbG9hZFxyXG5cdFx0Y2hlY2tlZCAmJiBzZWxmLnNlbGVjdGVkQ2F0ZWdvcnkoaXRlbSk7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRjaGVja2VkOiBrby5vYnNlcnZhYmxlKGNoZWNrZWQpLFxyXG5cdFx0XHRuYW1lOiBpdGVtLFxyXG5cdFx0XHRsaW5rOiBmYWxzZVxyXG5cdFx0fVxyXG5cdH0pKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1lbnUgVmlldy1Nb2RlbCBtZXRob2RcclxuICogQHBhcmFtIGNhdGVnb3J5XHJcbiAqL1xyXG5NZW51Vmlld01vZGVsLnByb3RvdHlwZS5zZWxlY3RDYXRlZ29yeSA9IGZ1bmN0aW9uIChjYXRlZ29yeSkge1xyXG4gIHZhciBjYXRlZ29yeU5hbWUgPSBjYXRlZ29yeS5uYW1lO1xyXG4gIHNlbGYuc2VsZWN0ZWRDYXRlZ29yeShjYXRlZ29yeU5hbWUpO1xyXG4gIGhmLmNoZWNrQWN0aXZlKHNlbGYuY2F0ZWdvcmllcywgY2F0ZWdvcnlOYW1lKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTWVudVZpZXdNb2RlbDtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9WaWV3TW9kZWxzL21lbnVWaWV3TW9kZWwuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzLmdldE1vZGVsQXJyYXkgPSBmdW5jdGlvbiBnZXRNb2RlbEFycmF5KHBhcmFtcykge1xyXG4gICAgdmFyIG9iaiA9IHBhcmFtcy5vYmogfHwge30sXHJcbiAgICAgICAgYXJyID0gcGFyYW1zLmFyciB8fCBbXSxcclxuICAgICAgICBwcm9wID0gcGFyYW1zLnByb3AgfHwgJ25hbWUnO1xyXG5cclxuICAgIGZvciAodmFyIGkgaW4gb2JqKSB7XHJcbiAgICAgICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoaSkpIHsgY29udGludWU7IH1cclxuXHJcbiAgICAgICAgdmFyIGl0ZW0gPSBhcnIuZmluZChmdW5jdGlvbiAobTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG0xLm5hbWUgPT09IG9ialtpXVtwcm9wXTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGl0ZW0pIHsgY29udGludWU7IH1cclxuXHJcbiAgICAgICAgYXJyLnB1c2goe1xyXG4gICAgICAgICAgICBjaGVja2VkOiBrby5vYnNlcnZhYmxlKGZhbHNlKSxcclxuICAgICAgICAgICAgbmFtZTogb2JqW2ldW3Byb3BdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyO1xyXG59O1xyXG5cclxuZXhwb3J0cy5jaGVja0FjdGl2ZSA9IGZ1bmN0aW9uIGNoZWNrQWN0aXZlKGtvQXJyLCBhY3RpdmVFbGVtKSB7XHJcbiAgICBpZiAoIWtvQXJyICYmICFhY3RpdmVFbGVtKSB7cmV0dXJuIGZhbHNlO31cclxuXHJcbiAgICBrb0Fycihrb0FycigpLm1hcChmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgaWYgKG9iai5uYW1lID09PSBhY3RpdmVFbGVtKSB7XHJcbiAgICAgICAgICAgIG9iai5jaGVja2VkKHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9iai5jaGVja2VkKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH0pKTtcclxufTtcclxuXHJcbmV4cG9ydHMuaXRlcmF0ZSA9IGZ1bmN0aW9uIChvYmopIHtcclxuXHRmb3IgKHZhciBwcm9wZXJ0eSBpbiBvYmopIHtcclxuXHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XHJcblx0XHRcdGlmICh0eXBlb2Ygb2JqW3Byb3BlcnR5XSA9PSBcIm9iamVjdFwiKSB7XHJcblx0XHRcdFx0aXRlcmF0ZShvYmpbcHJvcGVydHldKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnfCcgKyBwcm9wZXJ0eSArIFwiIHwgIFwiICsgb2JqW3Byb3BlcnR5XSArICd8Jyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvaGVscGVyRnVuYy5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcclxudmFyIGJhc2U7XHJcbnZhciBoZiA9IHJlcXVpcmUoJy4uL21vZHVsZXMvaGVscGVyRnVuYycpO1xyXG4vKipcclxuICogUGFyYW1zIFZpZXctTW9kZWxcclxuICogQHBhcmFtIHJhd1xyXG4gKiBAcGFyYW0gbWV0aG9kXHJcbiAqIEBwYXJhbSBwYXJhbXNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBQYXJhbXNWaWV3TW9kZWwocmF3LCBtZXRob2QsIHBhcmFtcykge1xyXG4gIGJhc2UgPSByYXc7XHJcbiAgc2VsZiA9IHRoaXM7XHJcbiAgdGhpcy5hbmltYXRpb25TcGVlZCA9IDIwMDtcclxuXHJcbiAgLy8gb2JzZXJ2YWJsZXNcclxuICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcclxuICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcclxuICB0aGlzLmlzSGlkZGVuID0ga28ub2JzZXJ2YWJsZSh0cnVlKTtcclxuICB0aGlzLnBhcmFtSW5Gb2N1cyA9IGtvLm9ic2VydmFibGUoJycpO1xyXG5cdHRoaXMucGFyYW1zTW9kZWwgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xyXG5cclxuXHQvLyBjb21wdXRlZFxyXG5cdC8vIHRoaXMucGFyYW1zTW9kZWwgPSBrby5jb21wdXRlZCh0aGlzLnVwZGF0ZVBhcmFtc01vZGVsLCB0aGlzKTtcclxuXHR0aGlzLnVwZGF0ZVZpZXdNb2RlbCgpO1xyXG5cdHRoaXMubWV0aG9kLnN1YnNjcmliZSh0aGlzLnVwZGF0ZVZpZXdNb2RlbCwgdGhpcyk7XHJcblxyXG5cdHRoaXMuaXNEaXJ0eSA9IGtvLmNvbXB1dGVkKHRoaXMuY2hlY2tEaXJ0eSwgdGhpcyk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogSW5pdGlhbCBidWlsZCBvZiBTZWxlY3QgTW9kZWxcclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUudXBkYXRlVmlld01vZGVsID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciBvYmogPSB0aGlzLm1ldGhvZCgpLnBhcmFtZXRlcnMgfHwge30sXHJcblx0XHRhcnIgPSBbXTtcclxuXHJcblx0Zm9yICh2YXIgaSBpbiBvYmopIHtcclxuXHRcdGlmICghb2JqLmhhc093blByb3BlcnR5KGkpKSB7Y29udGludWU7fVxyXG5cclxuXHRcdC8vIGNvcGllcyBhbGwgdmFsdWVzIGZyb20gbW9kZWwgdG8gdmlldy1tb2RlbFxyXG5cdFx0dmFyIHZtUGFyYW0gPSAkLmV4dGVuZCh7fSwgb2JqW2ldKTtcclxuXHJcblx0XHR2bVBhcmFtLnZhbHVlID0ga28ub2JzZXJ2YWJsZSh2bVBhcmFtLnZhbHVlIHx8ICh2bVBhcmFtLnNlbGVjdCAmJiB2bVBhcmFtLmRlZmF1bHQpIHx8ICcnKTtcclxuXHJcblx0XHQvL2FkZCBvYnNlcnZhYmxlIGZvciBzZWxlY3RlZCBvcHRpb25zXHJcblx0XHRpZiAodm1QYXJhbS5zZWxlY3QpIHtcclxuXHRcdFx0dm1QYXJhbS5vcHRpb25zID0ga28ub2JzZXJ2YWJsZUFycmF5KG9ialtpXS5vcHRpb25zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG5cdFx0XHRcdHZhciBvYmogPSAkLmV4dGVuZCh7fSwgaXRlbSk7XHJcblx0XHRcdFx0b2JqLmNoZWNrZWQgPSBrby5vYnNlcnZhYmxlKGl0ZW0uY2hlY2tlZCk7XHJcblx0XHRcdFx0cmV0dXJuIG9iajtcclxuXHRcdFx0fSkpXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gJ2RpcnR5JyBmbGFnIHdhdGNoZXIgZm9yIGN1cnJlbnQgZmllbGRcclxuXHRcdHZtUGFyYW0uaXNEaXJ0eSA9IGtvLnB1cmVDb21wdXRlZChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh0aGlzLnNlbGVjdCkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnZhbHVlKCkgIT09IHRoaXMuZGVmYXVsdCAmJiB0aGlzLnZhbHVlKCkgIT09ICdub25lJztcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gISEodGhpcy52YWx1ZSgpLnRvU3RyaW5nKCkpLnRyaW0oKS5sZW5ndGg7XHJcblx0XHR9LCB2bVBhcmFtKTtcclxuXHJcblx0XHQvLyBhZGQgY2FsZW5kYXIgYnRuIGZvciBjdXJyZW50IGZpZWxkXHJcblx0XHR2bVBhcmFtLmhhc0NhbGVuZGFyID0gaS5zZWFyY2goLyhkYXRlfHRpbWUpL2dtaSkgIT0gLTE7XHJcblxyXG5cdFx0Ly8gYWRkIHBvcC11cCBidG4gZm9yIGN1cnJlbnQgZmllbGRcclxuXHRcdHZtUGFyYW0uaGFzUG9wVXAgPSBpLnNlYXJjaCgvKGF0dHJhY3Rpb25JZHx2ZW51ZUlkKS9nbWkpICE9IC0xO1xyXG5cclxuXHRcdGFyci5wdXNoKHZtUGFyYW0pO1xyXG5cdH1cclxuXHJcblx0Ly8gcHJlcGFyZSBvdXRwdXQgZm9yIHJlcXVlc3RcclxuXHR0aGlzLnBhcmFtc01vZGVsKGFycik7XHJcblx0dGhpcy5wYXJhbUluRm9jdXModGhpcy5wYXJhbXNNb2RlbCgpWzBdKTtcclxuXHR0aGlzLnByZXBhcmVVcmxQYWlycyhhcnIsIHRoaXMucGFyYW1zKTtcclxuXHRyZXR1cm4gYXJyO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERpcnR5IHBhcmFtcyBmb3JtIG9ic2VydmFibGUgbWV0aG9kXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5jaGVja0RpcnR5ID0gZnVuY3Rpb24gKCkge1xyXG5cdHRoaXMucHJlcGFyZVVybFBhaXJzKHRoaXMucGFyYW1zTW9kZWwoKSwgdGhpcy5wYXJhbXMpO1xyXG5cdHZhciBkaXJ0eSA9IHRoaXMucGFyYW1zTW9kZWwoKS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdHJldHVybiBpdGVtLmlzRGlydHkoKSA9PT0gdHJ1ZTtcclxuXHR9KTtcclxuXHRyZXR1cm4gZGlydHkubGVuZ3RoID4gMDtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogRW50ZXIga2V5IGhhbmRsZXJcclxuICogQHBhcmFtIG1vZGVsXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5vbkVudGVyS2V5RG93biA9IGZ1bmN0aW9uIChtb2RlbCwgZXZlbnQpIHtcclxuICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICQoJyNhcGktZXhwLWdldC1idG4nKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogU2xpZGUgdG9nZ2xlIGZvciBwYXJhbXMgY29udGFpbmVyIG1ldGhvZFxyXG4gKiBAcGFyYW0gdmlld01vZGVsXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5zbGlkZVRvZ2dsZSA9IGZ1bmN0aW9uICh2aWV3TW9kZWwsIGV2ZW50KSB7XHJcbiAgJChldmVudC5jdXJyZW50VGFyZ2V0KVxyXG4gICAgLnBhcmVudHMoJy5qcy1zbGlkZS1jb250cm9sJylcclxuICAgIC5maW5kKCcuanMtc2xpZGUtd3JhcHBlcicpXHJcbiAgICAuc2xpZGVUb2dnbGUodmlld01vZGVsLmFuaW1hdGlvblNwZWVkLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZpZXdNb2RlbC5pc0hpZGRlbighdmlld01vZGVsLmlzSGlkZGVuKCkpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogTWFjaGVzIGZvY3VzZWQgcGFyYW1cclxuICogQHBhcmFtIGl0ZW1cclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUub25Gb2N1cyA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgc2VsZi5wYXJhbUluRm9jdXMoaXRlbSk7XHJcbn07XHJcblxyXG4vKipcclxuICogRmlsdGVycyBwYXJhbXMgYnkgZGVmaW5lZCB2YWx1ZVxyXG4gKiBAcGFyYW0gYXJyXHJcbiAqIEBwYXJhbSBrb09ic1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUucHJlcGFyZVVybFBhaXJzID0gZnVuY3Rpb24gKGFyciwga29PYnMpIHtcclxuICBpZiAoIWFyciAmJiAha29PYnMpIHtyZXR1cm4gZmFsc2U7fVxyXG5cclxuICByZXR1cm4ga29PYnMoYXJyLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgcmV0dXJuIChpdGVtLnZhbHVlKCkgfHwgaXRlbS5kZWZhdWx0KTtcclxuICB9KSk7XHJcbn07XHJcblxyXG4vKipcclxuICogT24gc2VsZWN0IHZhbHVlIGhhbmRsZXIgZm9yIHBhcmFtcyBzZWxlY3RcclxuICogQHBhcmFtIHBhcmFtIHtvYmplY3R9IHBhcmFtZXRlciB2aWV3LW1vZGVsXHJcbiAqIEBwYXJhbSBvcHRpb24ge29iamVjdH0gb3B0aW9uIHZpZXctbW9kZWxcclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUub25TZWxlY3RQYXJhbVZhbHVlID0gZnVuY3Rpb24gKHBhcmFtLCBvcHRpb24pIHtcclxuXHRoZi5jaGVja0FjdGl2ZShwYXJhbS5vcHRpb25zLCBvcHRpb24ubmFtZSk7XHJcblx0cGFyYW0udmFsdWUob3B0aW9uLm5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFBhcmFtcyBjbGVhciBidXR0b24gaGFuZGxlclxyXG4gKiBAcGFyYW0gdm0ge29iamVjdH0gdmlldyBtb2RlbFxyXG4gKiBAcGFyYW0gZSB7b2JqZWN0fSBldmVudFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5vblBhcmFtc0NsZWFyID0gZnVuY3Rpb24gKHZtLCBlKSB7XHJcblx0dGhpcy51cGRhdGVWaWV3TW9kZWwoKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGFyYW1zVmlld01vZGVsO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvcGFyYW1zVmlld01vZGVsLmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBoZiA9IHJlcXVpcmUoJy4uL21vZHVsZXMvaGVscGVyRnVuYycpO1xyXG52YXIgc2VsZjtcclxudmFyIGJhc2U7XHJcbnZhciBjYXRlZ29yeTtcclxuXHJcbi8qKlxyXG4gKiBNZXRob2RzIFZpZXctTW9kZWxcclxuICogQHBhcmFtIHJhd1xyXG4gKiBAcGFyYW0gY2F0ZWdvcnlcclxuICogQHBhcmFtIG1ldGhvZFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIE1ldGhvZHNWaWV3TW9kZWwocmF3LCBjYXRlZ29yeSwgbWV0aG9kKSB7XHJcbiAgc2VsZiA9IHRoaXM7XHJcbiAgYmFzZSA9IHJhdztcclxuXHJcbiAgLy8gb2JzZXJ2YWJsZXNcclxuICB0aGlzLmNhdGVnb3J5ID0gY2F0ZWdvcnk7XHJcbiAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XHJcbiAgdGhpcy50b2dnbGVQb3BVcCA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xyXG4gIHRoaXMucmFkaW9zTW9kZWwgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xyXG4gIHRoaXMubWV0aG9kc1ZpZXdNb2RlbCA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XHJcbiAgdGhpcy51cGRhdGVNb2RlbCh0aGlzLmNhdGVnb3J5KCkpO1xyXG4gIHRoaXMuY2F0ZWdvcnkuc3Vic2NyaWJlKHRoaXMudXBkYXRlTW9kZWwsIHRoaXMpO1xyXG59XHJcblxyXG4vKipcclxuICogT24gY2F0ZWdvcnkgY2hhbmdlIGhhbmRsZXJcclxuICogTWV0aG9kcyBWaWV3LU1vZGVsIG1ldGhvZFxyXG4gKiBAcGFyYW0gY2F0ZWdvcnlcclxuICovXHJcbk1ldGhvZHNWaWV3TW9kZWwucHJvdG90eXBlLnVwZGF0ZU1vZGVsID0gZnVuY3Rpb24gKGNhdGVnb3J5KSB7XHJcbiAgLy8gaW5pdGlhbCByYWRpb3MgbW9kZWxcclxuICBzZWxmLnVwZGF0ZVJhZGlvc01vZGVsKGJhc2VbY2F0ZWdvcnldKTtcclxuICAvLyBpbml0aWFsIHNlbGVjdCBtb2RlbCAoZmlyc3QgbWV0aG9kIGluIGZpcnN0IHNlY3Rpb24gZm9yIHN0YXJ0KVxyXG4gIHNlbGYudXBkYXRlU2VsZWN0KHNlbGYucmFkaW9zTW9kZWwoKVswXSk7XHJcbn07XHJcblxyXG4vKipcclxuICogT25jaGFuZ2UgaGFuZGxlciBmb3IgUmFkaW8gYnV0dG9uc1xyXG4gKiBAcGFyYW0gaXRlbVxyXG4gKi9cclxuTWV0aG9kc1ZpZXdNb2RlbC5wcm90b3R5cGUub25jaGFuZ2VSYWRpb3MgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gIC8vdXBkYXRlIFJhZGlvcyBNb2RlbFxyXG4gIGhmLmNoZWNrQWN0aXZlKHNlbGYucmFkaW9zTW9kZWwsIGl0ZW0ubmFtZSk7XHJcbiAgLy91cGRhdGUgU2VsZWN0IE1vZGVsXHJcbiAgc2VsZi51cGRhdGVTZWxlY3QoaXRlbSk7XHJcbn07XHJcblxyXG4vKipcclxuICogSW5pdGlhbCBidWlsZCBvZiBSYWRpb3MgTW9kZWxcclxuICogQHBhcmFtIHBhcmFtXHJcbiAqIEByZXR1cm5zIHtBcnJheX1cclxuICovXHJcbk1ldGhvZHNWaWV3TW9kZWwucHJvdG90eXBlLnVwZGF0ZVJhZGlvc01vZGVsID0gZnVuY3Rpb24gKHBhcmFtKSB7XHJcbiAgdmFyIG9iaiA9IHBhcmFtIHx8IHt9LFxyXG4gICAgYXJyID0gW107XHJcblxyXG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XHJcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShpKSkgeyBjb250aW51ZTsgfVxyXG4gICAgdmFyIGl0ZW0gPSB7XHJcbiAgICAgIGNoZWNrZWQ6IGtvLm9ic2VydmFibGUoaSA9PT0gJ0FMTCcpLFxyXG4gICAgICBuYW1lOiBpXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChpID09PSAnQUxMJykge1xyXG4gICAgICBhcnIudW5zaGlmdChpdGVtKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYXJyLnB1c2goaXRlbSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cdGFyciA9IGFyci5zb3J0KGNvbXBhcmVNZXRob2RzKTtcclxuICB0aGlzLnJhZGlvc01vZGVsKGFycik7XHJcbiAgcmV0dXJuIGFycjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsIGJ1aWxkIG9mIFNlbGVjdCBNb2RlbFxyXG4gKiBAcGFyYW0gaXRlbVxyXG4gKi9cclxuTWV0aG9kc1ZpZXdNb2RlbC5wcm90b3R5cGUudXBkYXRlU2VsZWN0ID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICB2YXIgb2JqID0gYmFzZVtzZWxmLmNhdGVnb3J5KCldW2l0ZW0ubmFtZV18fCB7fSxcclxuICAgIGFyciA9IFtdLFxyXG4gICAgY291bnQgPSAwO1xyXG5cclxuICBmb3IgKHZhciBpIGluIG9iaikge1xyXG4gICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoaSkpIHsgY29udGludWU7IH1cclxuICAgIHZhciBwcm9wZXJ0eSA9IG9ialtpXTtcclxuXHRcdC8vIGNvcGllcyBhbGwgdmFsdWVzIGZyb20gbW9kZWwgdG8gdmlldy1tb2RlbFxyXG5cdFx0dmFyIHZtTWV0aG9kID0gJC5leHRlbmQoe30sIHByb3BlcnR5KTtcclxuXHJcblx0XHRkZWxldGUgdm1NZXRob2QucGFyYW1ldGVycztcclxuXHRcdHZtTWV0aG9kLmNoZWNrZWQgPSBrby5vYnNlcnZhYmxlKCFjb3VudCk7XHJcblxyXG5cdFx0YXJyLnB1c2godm1NZXRob2QpO1xyXG5cclxuICAgIC8vIHNldCBnbG9iYWwgb2JzZXJ2YWJsZVxyXG4gICAgIWNvdW50ICYmIHRoaXMubWV0aG9kKGJhc2VbcHJvcGVydHkuY2F0ZWdvcnldW3Byb3BlcnR5Lm1ldGhvZF1bcHJvcGVydHkuaWRdKTtcclxuXHJcbiAgICBjb3VudCsrO1xyXG5cclxuICB9XHJcblxyXG5cdHRoaXMubWV0aG9kc1ZpZXdNb2RlbChhcnIpO1xyXG5cdHJldHVybiBhcnI7XHJcbn07XHJcblxyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS5vblNlbGVjdE1ldGhvZCA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgaGYuY2hlY2tBY3RpdmUoc2VsZi5tZXRob2RzVmlld01vZGVsLCBpdGVtLm5hbWUpO1xyXG4gIHNlbGYubWV0aG9kKGJhc2VbaXRlbS5jYXRlZ29yeV1baXRlbS5tZXRob2RdW2l0ZW0uaWRdKTtcclxufTtcclxuXHJcbk1ldGhvZHNWaWV3TW9kZWwucHJvdG90eXBlLm9uQWJvdXRDbGljayA9IGZ1bmN0aW9uIChtb2RlbCwgZXZlbnQpIHtcclxuICBtb2RlbC50b2dnbGVQb3BVcCghbW9kZWwudG9nZ2xlUG9wVXAoKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogU29ydCBmdW5jdGlvbiBmb3IgbWV0aG9kcyBhcmF5XHJcbiAqIEBwYXJhbSBmXHJcbiAqIEBwYXJhbSBzXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiBjb21wYXJlTWV0aG9kcyhmLHMpIHtcclxuXHR2YXIgYSA9IGYubmFtZS50b1VwcGVyQ2FzZSgpO1xyXG5cdHZhciBiID0gcy5uYW1lLnRvVXBwZXJDYXNlKCk7XHJcblxyXG5cdGlmIChhID09PSBiKSB7cmV0dXJuIDA7fVxyXG5cdGlmIChhID09PSAnQUxMJyB8fFxyXG5cdFx0KGEgPT09ICdHRVQnICYmIChiID09PSAnUE9TVCcgfHwgYiA9PT0gJ1BVVCcgfHwgYiA9PT0gJ0RFTEVURScpKSB8fFxyXG5cdFx0KGEgPT09ICdQT1NUJyAmJiAoYiA9PT0gJ1BVVCcgfHwgYiA9PT0gJ0RFTEVURScpKSB8fFxyXG5cdFx0KGEgPT09ICdQVVQnICYmIGIgPT09ICdERUxFVEUnKSkge1xyXG5cdFx0cmV0dXJuIC0xO1xyXG5cdH1cclxuXHRyZXR1cm4gMTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNZXRob2RzVmlld01vZGVsO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvbWV0aG9kc1ZpZXdNb2RlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIganNvbkhpZ2hsaWdodCA9IHJlcXVpcmUoJy4vLi4vbW9kdWxlcy9qc29uLWhpZ2hsaWdodCcpO1xyXG52YXIgc2xpZGVyID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9zbGlkZXInKTtcclxudmFyIGZpbHRlciA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy5qc29uJyk7XHJcbnZhciBzZWxmO1xyXG52YXIgY29sb3JzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb2xvckNsYXNzZXMnKS5jb2xvcnM7XHJcblxyXG5mdW5jdGlvbiBSZXF1ZXN0c0xpc3RWaWV3TW9kZWwocmVxdWVzdHMsIHNlbGVjdGVkUGFyYW1zLCBzaGFyZVBhdGgpIHtcclxuXHR0aGlzLnVybCA9IHNlbGVjdGVkUGFyYW1zO1xyXG5cdHNlbGYgPSB0aGlzO1xyXG5cdHRoaXMuY29sb3JzID0gY29sb3JzO1xyXG5cdHRoaXMuc2hhcmVQYXRoID0gc2hhcmVQYXRoO1xyXG5cdHRoaXMucmVxdWVzdHMgPSByZXF1ZXN0cztcclxuXHR0aGlzLmlzQWN0aXZlVGFiID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcblx0dGhpcy52aWV3TW9kZWwgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xyXG5cdHRoaXMuY2xlYXJCdG5Jc1Zpc2libGUgPSBrby5jb21wdXRlZCh0aGlzLl9pc1Zpc2libGUsIHRoaXMpO1xyXG5cdHRoaXMucmVxdWVzdHMuc3Vic2NyaWJlKHRoaXMudXBkYXRlTW9kZWwsIHRoaXMpO1xyXG59XHJcblxyXG4vKipcclxuICogVXBkYXRlIFZpZXdtb2RlbCBvZiByZXF1ZXN0IGxpc3RcclxuICogQHBhcmFtIGFyclxyXG4gKi9cclxuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS51cGRhdGVNb2RlbCA9IGZ1bmN0aW9uIChhcnIpIHtcclxuXHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHJcblx0dmFyIG5ld01vZGVsID0gdGhpcy5yZXF1ZXN0cygpXHJcblx0XHQubWFwKGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSAgJC5leHRlbmQoe30sIG9iaiwge1xyXG5cdFx0XHRcdGNvbG9yOiBzZWxmLmNvbG9yc1tvYmouaW5kZXggJSBzZWxmLmNvbG9ycy5sZW5ndGhdLFxyXG5cdFx0XHRcdGFjdGl2ZToga28ub2JzZXJ2YWJsZShmYWxzZSksXHJcblx0XHRcdFx0Y29waWVkRm9yU2hhcmU6IGtvLm9ic2VydmFibGUoZmFsc2UpLFxyXG5cdFx0XHRcdGNvcGllZFVybDoga28ub2JzZXJ2YWJsZShmYWxzZSksXHJcblx0XHRcdFx0cmVzSFRNTDoga28ub2JzZXJ2YWJsZSgnJylcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiBpdGVtO1xyXG5cdFx0fSk7XHJcblx0c2xpZGVyLnJlbW92ZShzZWxmLnZpZXdNb2RlbCgpLmxlbmd0aCk7XHJcblx0c2VsZi52aWV3TW9kZWwobmV3TW9kZWwpO1xyXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0c2xpZGVyLnNldChzZWxmLnZpZXdNb2RlbCgpLmxlbmd0aCk7XHJcblx0XHQkKCcjc2hvdy1kZXRhaWxzLTAnKS50cmlnZ2VyKCdjbGljaycpO1xyXG5cdH0sIDEwKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBnZXQgZGV0YWlsc1xyXG4gKiBAcGFyYW0gZGF0YVxyXG4gKi9cclxuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5nZXRNb3JlID0gZnVuY3Rpb24gKGlkLCBkYXRhKSB7XHJcblx0dmFyIHBhbmVsR3JvdXAgPSB0aGlzLnBhbmVsR3JvdXA7XHJcblx0dmFyIHBhbmVsID0gdGhpcztcclxuXHR2YXIgY3VycmVudFNsaWRlciA9ICQoJyNzbGlkZXItJyArIHBhbmVsR3JvdXAuc2VjdGlvbkluZGV4KTtcclxuXHR2YXIgY29tcG9uZW50ID0gJCgnPHNlY3Rpb24gZGF0YS1iaW5kPVwiY29tcG9uZW50OiB7bmFtZTogXFwncGFuZWwtZ3JvdXBcXCcsIHBhcmFtczogcGFyYW1zfVwiPjwvc2VjdGlvbj4nKTtcclxuXHR2YXIgY3Vyc2xpY2sgPSBjdXJyZW50U2xpZGVyLnNsaWNrKCdnZXRTbGljaycpO1xyXG5cdFxyXG5cdC8vIGV4dGVuZGluZyBhZGRpdGlvbmFsIGRhdGEgKGNvcHkpXHJcblx0dmFyIHBhcmFtcyA9ICQuZXh0ZW5kKHt9LCBwYW5lbEdyb3VwLCB7XHJcblx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0Z3JvdXBJbmRleDogcGFuZWxHcm91cC5ncm91cEluZGV4ICsgMSxcclxuXHRcdF9wcm9wVGl0bGU6IHR5cGVvZiBpZCA9PT0gJ3N0cmluZycgJiYgaWQsXHJcblx0XHRjb25maWc6IHBhbmVsLmNvbmZpZ1xyXG5cdH0pO1xyXG5cclxuXHQvLyBhcHBseSBjb21wb25lbnQgZGF0YSBiaW5kaW5nc1xyXG5cdGtvLmFwcGx5QmluZGluZ3Moe1xyXG5cdFx0cGFyYW1zOiBwYXJhbXNcclxuXHR9LCBjb21wb25lbnRbMF0pO1xyXG5cdFxyXG5cdC8vIGFkZCBzbGlkZSB3aXRoIHNlbGVjdGVkIGRhdGFcclxuXHRjdXJyZW50U2xpZGVyLnNsaWNrKCdzbGlja0FkZCcsIGNvbXBvbmVudCk7XHJcblx0XHJcblx0Ly8gcmVtb3ZlIG91dHN0YW5kaW5nIHNsaWRlc1xyXG5cdGZvciAodmFyIGkgPSBjdXJzbGljay5zbGlkZUNvdW50IC0gMjsgaSA+IHBhbmVsR3JvdXAuZ3JvdXBJbmRleDsgaS0tKSB7XHJcblx0XHRjdXJyZW50U2xpZGVyLnNsaWNrKCdzbGlja1JlbW92ZScsIGksIGZhbHNlKTtcclxuXHR9XHJcblx0Ly8gbW92ZSB0byBuZXh0IHNsaWRlXHJcblx0Y3VycmVudFNsaWRlci5zbGljaygnc2xpY2tOZXh0Jyk7XHJcbn07XHJcblxyXG4vKipcclxuICogVmlzaWJpbGl0eSBmbGFnIGZvciBDbGVhciBidG5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLl9pc1Zpc2libGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0cmV0dXJuIGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUodGhpcy5yZXF1ZXN0cykubGVuZ3RoID4gMDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDbGVhciByZXF1ZXN0c3RzIGxpc3QgaGFuZGxlclxyXG4gKiBAcGFyYW0gdm1cclxuICogQHBhcmFtIGV2ZW50XHJcbiAqL1xyXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLm9uQ2xlYXJSZXF1ZXN0cyA9IGZ1bmN0aW9uICh2bSwgZXZlbnQpIHtcclxuXHR0aGlzLnJlcXVlc3RzKFtdKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEZXRhaWxzIHRvZ2dsZSBoYW5kbGVyXHJcbiAqIEBwYXJhbSB2bVxyXG4gKiBAcGFyYW0gZXZlbnRcclxuICovXHJcblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUuZ2V0RGV0YWlscyA9IGZ1bmN0aW9uICh2bSwgZXZlbnQpIHtcclxuXHRpZiAoIXRoaXMucmVzSFRNTCgpLmxlbmd0aCkge1xyXG5cdFx0anNvbkhpZ2hsaWdodCh0aGlzLnJlc0hUTUwsIHRoaXMucmVzKTtcclxuXHR9XHJcblx0dGhpcy5hY3RpdmUoIXRoaXMuYWN0aXZlKCkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEpvaW4gc3RyaW5nIGZvciBpZCdzXHJcbiAqIEBwYXJhbSBzXHJcbiAqIEBwYXJhbSBpXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLmdldFN0ciA9IGZ1bmN0aW9uIChzLCBpKSB7XHJcblx0dmFyIHN0ciA9IHM7XHJcblx0dmFyIGkxID0gaSA/IGkoKSA6ICcnO1xyXG5cdHJldHVybiBbXHJcblx0XHRzdHIsXHJcblx0XHRpMVxyXG5cdF0uam9pbignLScpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCByYXcgcmVzcG9uc2UgZGF0YVxyXG4gKiBAcGFyYW0gbW9kZWwge29iamVjdH1cclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUuZ2V0UmF3RGF0YSA9IGZ1bmN0aW9uIChtb2RlbCkge1xyXG5cdHZhciBjb250ZW50ID0gbW9kZWwucmVzLnJlcztcclxuXHR2YXIgcmF3V2luZG93ID0gd2luZG93Lm9wZW4oXCJkYXRhOnRleHQvanNvbixcIiArIGVuY29kZVVSSShKU09OLnN0cmluZ2lmeShjb250ZW50LCBudWxsLCAyKSksICdfYmxhbmsnKTtcclxuXHRyYXdXaW5kb3cuZm9jdXMoKTtcclxufTtcclxuXHJcblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUuY29weVVybCA9IGZ1bmN0aW9uIChtb2RlbCwgZXZlbnQpIHtcclxuXHR2YXIgY3VycmVudEZpZWxkID0gdGhpcztcclxuXHR2YXIgZWxlbWVudCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcblx0c2VsZi5jbGlwYm9hcmQgPSBuZXcgQ2xpcGJvYXJkKGVsZW1lbnQpO1xyXG5cdHNlbGYuY2xpcGJvYXJkLm9uKCdzdWNjZXNzJywgZnVuY3Rpb24gb25TdWNjZXNzQ29weShlKSB7XHJcblx0XHRjb25zb2xlLmluZm8oJ0FjdGlvbjonLCBlLmFjdGlvbik7XHJcblx0XHRjb25zb2xlLmluZm8oJ1RleHQ6JywgZS50ZXh0KTtcclxuXHRcdGNvbnNvbGUuaW5mbygnVHJpZ2dlcjonLCBlLnRyaWdnZXIpO1xyXG5cdFx0JChlbGVtZW50KS5oYXNDbGFzcygnYnRuLXNoYXJlJykgPyBjdXJyZW50RmllbGQuY29waWVkRm9yU2hhcmUodHJ1ZSkgOiBjdXJyZW50RmllbGQuY29waWVkVXJsKHRydWUpO1xyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdCQoZWxlbWVudCkuaGFzQ2xhc3MoJ2J0bi1zaGFyZScpID8gY3VycmVudEZpZWxkLmNvcGllZEZvclNoYXJlKGZhbHNlKSA6IGN1cnJlbnRGaWVsZC5jb3BpZWRVcmwoZmFsc2UpO1xyXG5cdFx0fSwgNTAwKTtcclxuXHRcdGUuY2xlYXJTZWxlY3Rpb24oKTtcclxuXHR9KVxyXG5cdFx0Lm9uKCdlcnJvcicsIGZ1bmN0aW9uIG9uRXJyb3JDb3B5KGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignQWN0aW9uOicsIGUuYWN0aW9uKTtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignVHJpZ2dlcjonLCBlLnRyaWdnZXIpO1xyXG5cdFx0fSk7XHJcbn07XHJcblxyXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLnJlbW92ZUhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0c2VsZi5jbGlwYm9hcmQgJiYgc2VsZi5jbGlwYm9hcmQuZGVzdHJveSgpO1xyXG5cdGRlbGV0ZSBzZWxmLmNsaXBib2FyZDtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVxdWVzdHNMaXN0Vmlld01vZGVsO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvcmVxdWVzdHNMaXN0Vmlld01vZGVsLmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBXb3JrZXIgPSByZXF1aXJlKCcuL2hpZ2hsaWdodEpzb24ud29ya2VyLmpzJyk7IC8vIEpzb24tZm9ybWF0dGVyIHdvcmtlclxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JzZXJ2YWJsZSwgY29kZSkge1xyXG5cdHZhciBhbmltVGltZSA9IDEwMDtcclxuXHR2YXIgd29ya2VyID0gbmV3IFdvcmtlcjtcclxuXHJcblx0d29ya2VyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0b2JzZXJ2YWJsZShldmVudC5kYXRhKTtcclxuXHJcblx0XHQkKGRvY3VtZW50KVxyXG5cdFx0XHQub24oJ2NsaWNrIHRvdWNoJywgJy50bS1jb2RlLWNvbnRhaW5lciAuZXhwYW5kZWQnLCBmdW5jdGlvbiBqc29uQ29kZUNvbnRhaW5lckV4cGFuZGVkKGUpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHR2YXIgJHNlbGYgPSAkKHRoaXMpO1xyXG5cdFx0XHRcdCRzZWxmXHJcblx0XHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHRcdC5maW5kKCc+dWwnKVxyXG5cdFx0XHRcdFx0LnNsaWRlVXAoYW5pbVRpbWUsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHQkc2VsZi5hZGRDbGFzcygnY29sbGFwc2VkJyk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHRcdFx0Lm9uKCdjbGljayB0b3VjaCcsICcudG0tY29kZS1jb250YWluZXIgLmV4cGFuZGVkLmNvbGxhcHNlZCcsIGZ1bmN0aW9uIGpzb25Db2RlQ29udGFpbmVyQ29sbGFwc2VkKGUpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHR2YXIgJHNlbGYgPSAkKHRoaXMpO1xyXG5cdFx0XHRcdCRzZWxmXHJcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpXHJcblx0XHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHRcdC5maW5kKCc+dWwnKVxyXG5cdFx0XHRcdFx0LnNsaWRlRG93bihhbmltVGltZSwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdCRzZWxmXHJcblx0XHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKVxyXG5cdFx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHR9O1xyXG5cdHdvcmtlci5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRjb25zb2xlLmVycm9yKGV2ZW50KTtcclxuXHR9O1xyXG5cclxuXHR3b3JrZXIucG9zdE1lc3NhZ2UoY29kZSk7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9qc29uLWhpZ2hsaWdodC5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gcmVxdWlyZShcIiEhRDpcXFxcdGlja2V0bWFzdGVyLWFwaS1zdGFnaW5nLmdpdGh1Yi5pb1xcXFxub2RlX21vZHVsZXNcXFxcd29ya2VyLWxvYWRlclxcXFxjcmVhdGVJbmxpbmVXb3JrZXIuanNcIikoXCIvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXFxuLyoqKioqKi8gXFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxcbi8qKioqKiovIFxcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxcbi8qKioqKiovIFxcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdFxcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxcbi8qKioqKiovIFxcdFxcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxcbi8qKioqKiovIFxcdFxcdFxcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0XFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcXG4vKioqKioqLyBcXHRcXHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XFxuLyoqKioqKi8gXFx0XFx0XFx0ZXhwb3J0czoge30sXFxuLyoqKioqKi8gXFx0XFx0XFx0aWQ6IG1vZHVsZUlkLFxcbi8qKioqKiovIFxcdFxcdFxcdGxvYWRlZDogZmFsc2VcXG4vKioqKioqLyBcXHRcXHR9O1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0XFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXFxuLyoqKioqKi8gXFx0XFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHRcXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXFxuLyoqKioqKi8gXFx0XFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHRcXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxcbi8qKioqKiovIFxcdFxcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcXG4vKioqKioqLyBcXHR9XFxuLyoqKioqKi9cXG4vKioqKioqL1xcbi8qKioqKiovIFxcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXFxuLyoqKioqKi8gXFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXFxuLyoqKioqKi8gXFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXFxuLyoqKioqKi8gXFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXFxcIlxcXCI7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcXG4vKioqKioqLyBcXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcXG4vKioqKioqLyB9KVxcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXFxuLyoqKioqKi8gKFtcXG4vKiAwICovXFxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XFxuXFxuXFx0LyoqXFxyXFxuXFx0ICogQ29kZSBmb3JtYXQgd2ViLXdvcmtlclxcclxcblxcdCAqIEBwYXJhbSBldmVudFxcclxcblxcdCAqL1xcclxcblxcdC8vIHZhciBoaWdobGlnaHRKc29uKClcXHJcXG5cXHR2YXIgaGlnaGxpZ2h0SnNvbiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XFxyXFxuXFx0XFxyXFxuXFx0b25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcXHJcXG5cXHQgIHZhciBjb2RlID0gZXZlbnQuZGF0YTtcXHJcXG5cXHQgIC8vIGltcG9ydFNjcmlwdHMoJ2pzb24tcGFyc2UuanMnKTtcXHJcXG5cXHQgIHZhciByZXN1bHQgPSBoaWdobGlnaHRKc29uKGNvZGUsIHtleHBhbmRlZDogdHJ1ZX0pO1xcclxcblxcdCAgLy8gdmFyIHJlc3VsdCA9SlNPTi5zdHJpbmdpZnkoY29kZSk7XFxyXFxuXFx0ICBwb3N0TWVzc2FnZShyZXN1bHQpO1xcclxcblxcdH07XFxyXFxuXFxuXFxuLyoqKi8gfSxcXG4vKiAxICovXFxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XFxuXFxuXFx0dmFyIHByZWZpeCA9ICd0bS1jb2RlJztcXHJcXG5cXHRcXHJcXG5cXHR2YXIgZ2V0RXhwYW5kZXJDbGFzc2VzID0gZnVuY3Rpb24gKGV4cGFuZGVkKSB7XFxyXFxuXFx0XFx0aWYgKCFleHBhbmRlZCkge1xcclxcblxcdFxcdFxcdHJldHVybiAnZXhwYW5kZWQgY29sbGFwc2VkIGhpZGRlbic7XFxyXFxuXFx0XFx0fVxcclxcblxcdFxcdHJldHVybiAnZXhwYW5kZWQnO1xcclxcblxcdH07XFxyXFxuXFx0XFxyXFxuXFx0dmFyIGVuY29kZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xcclxcblxcdFxcdHJldHVybiBbJzxzcGFuPicsIHZhbHVlLCAnPC9zcGFuPiddLmpvaW4oJycpO1xcclxcblxcdH07XFxyXFxuXFx0XFxyXFxuXFx0dmFyIGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgdHlwZSwgZXhwYW5kZXJDbGFzc2VzKSB7XFxyXFxuXFx0XFx0dmFyIGtsYXNzID0gJ29iamVjdCcsXFxyXFxuXFx0XFx0XFx0b3BlbiA9ICd7JyxcXHJcXG5cXHRcXHRcXHRjbG9zZSA9ICd9JztcXHJcXG5cXHRcXHJcXG5cXHRcXHRpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcXHJcXG5cXHRcXHRcXHRrbGFzcyA9ICdhcnJheSc7XFxyXFxuXFx0XFx0XFx0b3BlbiA9ICdbJztcXHJcXG5cXHRcXHRcXHRjbG9zZSA9ICddJztcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFxyXFxuXFx0XFx0aWYgKHZhbHVlID09PSBudWxsKSB7XFxyXFxuXFx0XFx0XFx0cmV0dXJuIFtcXHJcXG5cXHRcXHRcXHRcXHQnPGxpPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJrZXlcXFwiPlxcXCInLCBlbmNvZGUoa2V5KSwgJ1xcXCI6IDwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwibnVsbFxcXCI+XFxcIicsIGVuY29kZSh2YWx1ZSksICdcXFwiPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0JzwvbGk+J1xcclxcblxcdFxcdFxcdF0uam9pbignJyk7XFxyXFxuXFx0XFx0fVxcclxcblxcdFxcclxcblxcdFxcdGlmICh0eXBlID09ICdvYmplY3QnKSB7XFxyXFxuXFx0XFx0XFx0cmV0dXJuIFtcXHJcXG5cXHRcXHRcXHRcXHQnPGxpPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCInLCBleHBhbmRlckNsYXNzZXMsICdcXFwiPjwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwia2V5XFxcIj5cXFwiJywgZW5jb2RlKGtleSksICdcXFwiOiA8L3NwYW4+ICcsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJvcGVuXFxcIj4nLCBvcGVuLCAnPC9zcGFuPiAnLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8dWwgY2xhc3M9XFxcIicsIGtsYXNzLCAnXFxcIj4nLFxcclxcblxcdFxcdFxcdFxcdFxcdFxcdGpzb24yaHRtbCh2YWx1ZSwgZXhwYW5kZXJDbGFzc2VzKSxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPC91bD4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwiY2xvc2VcXFwiPicsIGNsb3NlLCAnPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0JzwvbGk+J1xcclxcblxcdFxcdFxcdF0uam9pbignJyk7XFxyXFxuXFx0XFx0fVxcclxcblxcdFxcclxcblxcdFxcdGlmICh0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKSB7XFxyXFxuXFx0XFx0XFx0cmV0dXJuIFtcXHJcXG5cXHRcXHRcXHRcXHQnPGxpPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJrZXlcXFwiPlxcXCInLCBlbmNvZGUoa2V5KSwgJ1xcXCI6IDwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwiJywgdHlwZSwgJ1xcXCI+JywgZW5jb2RlKHZhbHVlKSwgJzwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdCc8L2xpPidcXHJcXG5cXHRcXHRcXHRdLmpvaW4oJycpO1xcclxcblxcdFxcdH1cXHJcXG5cXHRcXHRyZXR1cm4gW1xcclxcblxcdFxcdFxcdCc8bGk+JyxcXHJcXG5cXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcImtleVxcXCI+XFxcIicsIGVuY29kZShrZXkpLCAnXFxcIjogPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCInLCB0eXBlLCAnXFxcIj5cXFwiJywgZW5jb2RlKHZhbHVlKSwgJ1xcXCI8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHQnPC9saT4nXFxyXFxuXFx0XFx0XS5qb2luKCcnKTtcXHJcXG5cXHR9O1xcclxcblxcdFxcclxcblxcdHZhciBqc29uMmh0bWwgPSBmdW5jdGlvbiAoanNvbiwgZXhwYW5kZXJDbGFzc2VzKSB7XFxyXFxuXFx0XFx0dmFyIGh0bWwgPSAnJztcXHJcXG5cXHRcXHRmb3IgKHZhciBrZXkgaW4ganNvbikge1xcclxcblxcdFxcdFxcdGlmICghanNvbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XFxyXFxuXFx0XFx0XFx0XFx0Y29udGludWU7XFxyXFxuXFx0XFx0XFx0fVxcclxcblxcdFxcclxcblxcdFxcdFxcdGh0bWwgPSBbaHRtbCwgY3JlYXRlRWxlbWVudChrZXksIGpzb25ba2V5XSwgdHlwZW9mIGpzb25ba2V5XSwgZXhwYW5kZXJDbGFzc2VzKV0uam9pbignJyk7XFxyXFxuXFx0XFx0fVxcclxcblxcdFxcdHJldHVybiBodG1sO1xcclxcblxcdH07XFxyXFxuXFx0XFxyXFxuXFx0dmFyIGdldEpzb25WaWV3ZXIgPSBmdW5jdGlvbiAoZGF0YSwgb3B0aW9ucykge1xcclxcblxcdFxcdHRyeSB7XFxyXFxuXFx0XFx0XFx0cmV0dXJuIFtcXHJcXG5cXHRcXHRcXHRcXHQnPHVsIGNsYXNzPVxcXCInLCBwcmVmaXgsICctY29udGFpbmVyXFxcIj4nLFxcclxcblxcdFxcdFxcdFxcdFxcdGpzb24yaHRtbChbSlNPTi5wYXJzZShkYXRhKV0sIGdldEV4cGFuZGVyQ2xhc3NlcyhvcHRpb25zLmV4cGFuZGVkKSksXFxyXFxuXFx0XFx0XFx0XFx0JzwvdWw+J1xcclxcblxcdFxcdFxcdF0uam9pbignJyk7XFxyXFxuXFx0XFx0fSBjYXRjaCAoZSkge1xcclxcblxcdFxcdFxcdHJldHVybiBbXFxyXFxuXFx0XFx0XFx0XFx0JzxkaXYgY2xhc3M9XFxcIicsIHByZWZpeCwgJy1lcnJvclxcXCIgPicsIGUudG9TdHJpbmcoKSwgJyA8L2Rpdj4nXFxyXFxuXFx0XFx0XFx0XS5qb2luKCcnKTtcXHJcXG5cXHRcXHR9XFxyXFxuXFx0fTtcXHJcXG5cXHRcXHJcXG5cXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRhdGEsIG9wdCkge1xcclxcblxcdFxcdHZhciBqc29uID0gJyc7XFxyXFxuXFx0XFx0dmFyIG9wdGlvbnMgPSBvcHQgfHwge2V4cGFuZGVkOiB0cnVlfTtcXHJcXG5cXHRcXHRpZiAodHlwZW9mIGRhdGEgPT0gJ3N0cmluZycpIHtcXHJcXG5cXHRcXHRcXHRqc29uID0gZGF0YTtcXHJcXG5cXHRcXHR9IGVsc2UgaWYgKHR5cGVvZiBkYXRhID09ICdvYmplY3QnKSB7XFxyXFxuXFx0XFx0XFx0anNvbiA9IEpTT04uc3RyaW5naWZ5KGRhdGEpXFxyXFxuXFx0XFx0fVxcclxcblxcdFxcdHJldHVybiBnZXRKc29uVmlld2VyKGpzb24sIG9wdGlvbnMpO1xcclxcblxcdH07XFxyXFxuXFxuXFxuLyoqKi8gfVxcbi8qKioqKiovIF0pO1xcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluZGxZbkJoWTJzNkx5OHZkMlZpY0dGamF5OWliMjkwYzNSeVlYQWdORGN4WWpFd1pEUTBZMkUzTWpnd1pURXhOR0VpTENKM1pXSndZV05yT2k4dkx5NHZjMk55YVhCMGN5OWhjR2t0Wlhod2JHOXlaWEl2ZGpJdmMzSmpMMjF2WkhWc1pYTXZhR2xuYUd4cFoyaDBTbk52Ymk1M2IzSnJaWEl1YW5NaUxDSjNaV0p3WVdOck9pOHZMeTR2YzJOeWFYQjBjeTloY0drdFpYaHdiRzl5WlhJdmRqSXZjM0pqTDIxdlpIVnNaWE12YW5OdmJpMXdZWEp6WlM1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFc2RVSkJRV1U3UVVGRFpqdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3TzBGQlIwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3T3pzN096dEJRM1JEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc2NVTkJRVzlETEdWQlFXVTdRVUZEYmtRN1FVRkRRVHRCUVVOQk96czdPenM3TzBGRFlrRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNXVUZCVnp0QlFVTllMR0ZCUVZrN08wRkJSVm83UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGRk8wRkJRMFk3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEVzZDBKQlFYVkNPMEZCUTNaQ08wRkJRMEU3UVVGRFFTeEhRVUZGTzBGQlEwWTdRVUZEUVR0QlFVTkJPMEZCUTBFaUxDSm1hV3hsSWpvaWFHbG5hR3hwWjJoMFNuTnZiaTUzYjNKclpYSXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJZ1hIUXZMeUJVYUdVZ2JXOWtkV3hsSUdOaFkyaGxYRzRnWEhSMllYSWdhVzV6ZEdGc2JHVmtUVzlrZFd4bGN5QTlJSHQ5TzF4dVhHNGdYSFF2THlCVWFHVWdjbVZ4ZFdseVpTQm1kVzVqZEdsdmJseHVJRngwWm5WdVkzUnBiMjRnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlodGIyUjFiR1ZKWkNrZ2UxeHVYRzRnWEhSY2RDOHZJRU5vWldOcklHbG1JRzF2WkhWc1pTQnBjeUJwYmlCallXTm9aVnh1SUZ4MFhIUnBaaWhwYm5OMFlXeHNaV1JOYjJSMWJHVnpXMjF2WkhWc1pVbGtYU2xjYmlCY2RGeDBYSFJ5WlhSMWNtNGdhVzV6ZEdGc2JHVmtUVzlrZFd4bGMxdHRiMlIxYkdWSlpGMHVaWGh3YjNKMGN6dGNibHh1SUZ4MFhIUXZMeUJEY21WaGRHVWdZU0J1WlhjZ2JXOWtkV3hsSUNoaGJtUWdjSFYwSUdsMElHbHVkRzhnZEdobElHTmhZMmhsS1Z4dUlGeDBYSFIyWVhJZ2JXOWtkV3hsSUQwZ2FXNXpkR0ZzYkdWa1RXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwZ1BTQjdYRzRnWEhSY2RGeDBaWGh3YjNKMGN6b2dlMzBzWEc0Z1hIUmNkRngwYVdRNklHMXZaSFZzWlVsa0xGeHVJRngwWEhSY2RHeHZZV1JsWkRvZ1ptRnNjMlZjYmlCY2RGeDBmVHRjYmx4dUlGeDBYSFF2THlCRmVHVmpkWFJsSUhSb1pTQnRiMlIxYkdVZ1puVnVZM1JwYjI1Y2JpQmNkRngwYlc5a2RXeGxjMXR0YjJSMWJHVkpaRjB1WTJGc2JDaHRiMlIxYkdVdVpYaHdiM0owY3l3Z2JXOWtkV3hsTENCdGIyUjFiR1V1Wlhod2IzSjBjeXdnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlrN1hHNWNiaUJjZEZ4MEx5OGdSbXhoWnlCMGFHVWdiVzlrZFd4bElHRnpJR3h2WVdSbFpGeHVJRngwWEhSdGIyUjFiR1V1Ykc5aFpHVmtJRDBnZEhKMVpUdGNibHh1SUZ4MFhIUXZMeUJTWlhSMWNtNGdkR2hsSUdWNGNHOXlkSE1nYjJZZ2RHaGxJRzF2WkhWc1pWeHVJRngwWEhSeVpYUjFjbTRnYlc5a2RXeGxMbVY0Y0c5eWRITTdYRzRnWEhSOVhHNWNibHh1SUZ4MEx5OGdaWGh3YjNObElIUm9aU0J0YjJSMWJHVnpJRzlpYW1WamRDQW9YMTkzWldKd1lXTnJYMjF2WkhWc1pYTmZYeWxjYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHViU0E5SUcxdlpIVnNaWE03WEc1Y2JpQmNkQzh2SUdWNGNHOXpaU0IwYUdVZ2JXOWtkV3hsSUdOaFkyaGxYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtTWdQU0JwYm5OMFlXeHNaV1JOYjJSMWJHVnpPMXh1WEc0Z1hIUXZMeUJmWDNkbFluQmhZMnRmY0hWaWJHbGpYM0JoZEdoZlgxeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1d0lEMGdYQ0pjSWp0Y2JseHVJRngwTHk4Z1RHOWhaQ0JsYm5SeWVTQnRiMlIxYkdVZ1lXNWtJSEpsZEhWeWJpQmxlSEJ2Y25SelhHNGdYSFJ5WlhSMWNtNGdYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWd3S1R0Y2JseHVYRzVjYmk4cUtpQlhSVUpRUVVOTElFWlBUMVJGVWlBcUtseHVJQ29xSUhkbFluQmhZMnN2WW05dmRITjBjbUZ3SURRM01XSXhNR1EwTkdOaE56STRNR1V4TVRSaFhHNGdLaW92SWl3aUx5b3FYSEpjYmlBcUlFTnZaR1VnWm05eWJXRjBJSGRsWWkxM2IzSnJaWEpjY2x4dUlDb2dRSEJoY21GdElHVjJaVzUwWEhKY2JpQXFMMXh5WEc0dkx5QjJZWElnYUdsbmFHeHBaMmgwU25OdmJpZ3BYSEpjYm5aaGNpQm9hV2RvYkdsbmFIUktjMjl1SUQwZ2NtVnhkV2x5WlNnbkxpOXFjMjl1TFhCaGNuTmxKeWs3WEhKY2JseHlYRzV2Ym0xbGMzTmhaMlVnUFNCbWRXNWpkR2x2YmlobGRtVnVkQ2tnZTF4eVhHNGdJSFpoY2lCamIyUmxJRDBnWlhabGJuUXVaR0YwWVR0Y2NseHVJQ0F2THlCcGJYQnZjblJUWTNKcGNIUnpLQ2RxYzI5dUxYQmhjbk5sTG1wekp5azdYSEpjYmlBZ2RtRnlJSEpsYzNWc2RDQTlJR2hwWjJoc2FXZG9kRXB6YjI0b1kyOWtaU3dnZTJWNGNHRnVaR1ZrT2lCMGNuVmxmU2s3WEhKY2JpQWdMeThnZG1GeUlISmxjM1ZzZENBOVNsTlBUaTV6ZEhKcGJtZHBabmtvWTI5a1pTazdYSEpjYmlBZ2NHOXpkRTFsYzNOaFoyVW9jbVZ6ZFd4MEtUdGNjbHh1ZlR0Y2NseHVYRzVjYmx4dUx5b3FLaW9xS2lvcUtpb3FLaW9xS2lvcVhHNGdLaW9nVjBWQ1VFRkRTeUJHVDA5VVJWSmNiaUFxS2lBdUwzTmpjbWx3ZEhNdllYQnBMV1Y0Y0d4dmNtVnlMM1l5TDNOeVl5OXRiMlIxYkdWekwyaHBaMmhzYVdkb2RFcHpiMjR1ZDI5eWEyVnlMbXB6WEc0Z0tpb2diVzlrZFd4bElHbGtJRDBnTUZ4dUlDb3FJRzF2WkhWc1pTQmphSFZ1YTNNZ1BTQXdYRzRnS2lvdklpd2lkbUZ5SUhCeVpXWnBlQ0E5SUNkMGJTMWpiMlJsSnp0Y2NseHVYSEpjYm5aaGNpQm5aWFJGZUhCaGJtUmxja05zWVhOelpYTWdQU0JtZFc1amRHbHZiaUFvWlhod1lXNWtaV1FwSUh0Y2NseHVYSFJwWmlBb0lXVjRjR0Z1WkdWa0tTQjdYSEpjYmx4MFhIUnlaWFIxY200Z0oyVjRjR0Z1WkdWa0lHTnZiR3hoY0hObFpDQm9hV1JrWlc0bk8xeHlYRzVjZEgxY2NseHVYSFJ5WlhSMWNtNGdKMlY0Y0dGdVpHVmtKenRjY2x4dWZUdGNjbHh1WEhKY2JuWmhjaUJsYm1OdlpHVWdQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXBJSHRjY2x4dVhIUnlaWFIxY200Z1d5YzhjM0JoYmo0bkxDQjJZV3gxWlN3Z0p6d3ZjM0JoYmo0blhTNXFiMmx1S0NjbktUdGNjbHh1ZlR0Y2NseHVYSEpjYm5aaGNpQmpjbVZoZEdWRmJHVnRaVzUwSUQwZ1puVnVZM1JwYjI0Z0tHdGxlU3dnZG1Gc2RXVXNJSFI1Y0dVc0lHVjRjR0Z1WkdWeVEyeGhjM05sY3lrZ2UxeHlYRzVjZEhaaGNpQnJiR0Z6Y3lBOUlDZHZZbXBsWTNRbkxGeHlYRzVjZEZ4MGIzQmxiaUE5SUNkN0p5eGNjbHh1WEhSY2RHTnNiM05sSUQwZ0ozMG5PMXh5WEc1Y2NseHVYSFJwWmlBb1FYSnlZWGt1YVhOQmNuSmhlU2gyWVd4MVpTa3BJSHRjY2x4dVhIUmNkR3RzWVhOeklEMGdKMkZ5Y21GNUp6dGNjbHh1WEhSY2RHOXdaVzRnUFNBbld5YzdYSEpjYmx4MFhIUmpiRzl6WlNBOUlDZGRKenRjY2x4dVhIUjlYSEpjYmx4eVhHNWNkR2xtSUNoMllXeDFaU0E5UFQwZ2JuVnNiQ2tnZTF4eVhHNWNkRngwY21WMGRYSnVJRnRjY2x4dVhIUmNkRngwSnp4c2FUNG5MRnh5WEc1Y2RGeDBYSFJjZENjOGMzQmhiaUJqYkdGemN6MWNJbXRsZVZ3aVBsd2lKeXdnWlc1amIyUmxLR3RsZVNrc0lDZGNJam9nUEM5emNHRnVQaWNzWEhKY2JseDBYSFJjZEZ4MEp6eHpjR0Z1SUdOc1lYTnpQVndpYm5Wc2JGd2lQbHdpSnl3Z1pXNWpiMlJsS0haaGJIVmxLU3dnSjF3aVBDOXpjR0Z1UGljc1hISmNibHgwWEhSY2RDYzhMMnhwUGlkY2NseHVYSFJjZEYwdWFtOXBiaWduSnlrN1hISmNibHgwZlZ4eVhHNWNjbHh1WEhScFppQW9kSGx3WlNBOVBTQW5iMkpxWldOMEp5a2dlMXh5WEc1Y2RGeDBjbVYwZFhKdUlGdGNjbHh1WEhSY2RGeDBKenhzYVQ0bkxGeHlYRzVjZEZ4MFhIUmNkQ2M4YzNCaGJpQmpiR0Z6Y3oxY0lpY3NJR1Y0Y0dGdVpHVnlRMnhoYzNObGN5d2dKMXdpUGp3dmMzQmhiajRuTEZ4eVhHNWNkRngwWEhSY2RDYzhjM0JoYmlCamJHRnpjejFjSW10bGVWd2lQbHdpSnl3Z1pXNWpiMlJsS0d0bGVTa3NJQ2RjSWpvZ1BDOXpjR0Z1UGlBbkxGeHlYRzVjZEZ4MFhIUmNkQ2M4YzNCaGJpQmpiR0Z6Y3oxY0ltOXdaVzVjSWo0bkxDQnZjR1Z1TENBblBDOXpjR0Z1UGlBbkxGeHlYRzVjZEZ4MFhIUmNkQ2M4ZFd3Z1kyeGhjM005WENJbkxDQnJiR0Z6Y3l3Z0oxd2lQaWNzWEhKY2JseDBYSFJjZEZ4MFhIUnFjMjl1TW1oMGJXd29kbUZzZFdVc0lHVjRjR0Z1WkdWeVEyeGhjM05sY3lrc1hISmNibHgwWEhSY2RGeDBKend2ZFd3K0p5eGNjbHh1WEhSY2RGeDBYSFFuUEhOd1lXNGdZMnhoYzNNOVhDSmpiRzl6WlZ3aVBpY3NJR05zYjNObExDQW5QQzl6Y0dGdVBpY3NYSEpjYmx4MFhIUmNkQ2M4TDJ4cFBpZGNjbHh1WEhSY2RGMHVhbTlwYmlnbkp5azdYSEpjYmx4MGZWeHlYRzVjY2x4dVhIUnBaaUFvZEhsd1pTQTlQU0FuYm5WdFltVnlKeUI4ZkNCMGVYQmxJRDA5SUNkaWIyOXNaV0Z1SnlrZ2UxeHlYRzVjZEZ4MGNtVjBkWEp1SUZ0Y2NseHVYSFJjZEZ4MEp6eHNhVDRuTEZ4eVhHNWNkRngwWEhSY2RDYzhjM0JoYmlCamJHRnpjejFjSW10bGVWd2lQbHdpSnl3Z1pXNWpiMlJsS0d0bGVTa3NJQ2RjSWpvZ1BDOXpjR0Z1UGljc1hISmNibHgwWEhSY2RGeDBKenh6Y0dGdUlHTnNZWE56UFZ3aUp5d2dkSGx3WlN3Z0oxd2lQaWNzSUdWdVkyOWtaU2gyWVd4MVpTa3NJQ2M4TDNOd1lXNCtKeXhjY2x4dVhIUmNkRngwSnp3dmJHaytKMXh5WEc1Y2RGeDBYUzVxYjJsdUtDY25LVHRjY2x4dVhIUjlYSEpjYmx4MGNtVjBkWEp1SUZ0Y2NseHVYSFJjZENjOGJHaytKeXhjY2x4dVhIUmNkRngwSnp4emNHRnVJR05zWVhOelBWd2lhMlY1WENJK1hDSW5MQ0JsYm1OdlpHVW9hMlY1S1N3Z0oxd2lPaUE4TDNOd1lXNCtKeXhjY2x4dVhIUmNkRngwSnp4emNHRnVJR05zWVhOelBWd2lKeXdnZEhsd1pTd2dKMXdpUGx3aUp5d2daVzVqYjJSbEtIWmhiSFZsS1N3Z0oxd2lQQzl6Y0dGdVBpY3NYSEpjYmx4MFhIUW5QQzlzYVQ0blhISmNibHgwWFM1cWIybHVLQ2NuS1R0Y2NseHVmVHRjY2x4dVhISmNiblpoY2lCcWMyOXVNbWgwYld3Z1BTQm1kVzVqZEdsdmJpQW9hbk52Yml3Z1pYaHdZVzVrWlhKRGJHRnpjMlZ6S1NCN1hISmNibHgwZG1GeUlHaDBiV3dnUFNBbkp6dGNjbHh1WEhSbWIzSWdLSFpoY2lCclpYa2dhVzRnYW5OdmJpa2dlMXh5WEc1Y2RGeDBhV1lnS0NGcWMyOXVMbWhoYzA5M2JsQnliM0JsY25SNUtHdGxlU2twSUh0Y2NseHVYSFJjZEZ4MFkyOXVkR2x1ZFdVN1hISmNibHgwWEhSOVhISmNibHh5WEc1Y2RGeDBhSFJ0YkNBOUlGdG9kRzFzTENCamNtVmhkR1ZGYkdWdFpXNTBLR3RsZVN3Z2FuTnZibHRyWlhsZExDQjBlWEJsYjJZZ2FuTnZibHRyWlhsZExDQmxlSEJoYm1SbGNrTnNZWE56WlhNcFhTNXFiMmx1S0NjbktUdGNjbHh1WEhSOVhISmNibHgwY21WMGRYSnVJR2gwYld3N1hISmNibjA3WEhKY2JseHlYRzUyWVhJZ1oyVjBTbk52YmxacFpYZGxjaUE5SUdaMWJtTjBhVzl1SUNoa1lYUmhMQ0J2Y0hScGIyNXpLU0I3WEhKY2JseDBkSEo1SUh0Y2NseHVYSFJjZEhKbGRIVnliaUJiWEhKY2JseDBYSFJjZENjOGRXd2dZMnhoYzNNOVhDSW5MQ0J3Y21WbWFYZ3NJQ2N0WTI5dWRHRnBibVZ5WENJK0p5eGNjbHh1WEhSY2RGeDBYSFJxYzI5dU1taDBiV3dvVzBwVFQwNHVjR0Z5YzJVb1pHRjBZU2xkTENCblpYUkZlSEJoYm1SbGNrTnNZWE56WlhNb2IzQjBhVzl1Y3k1bGVIQmhibVJsWkNrcExGeHlYRzVjZEZ4MFhIUW5QQzkxYkQ0blhISmNibHgwWEhSZExtcHZhVzRvSnljcE8xeHlYRzVjZEgwZ1kyRjBZMmdnS0dVcElIdGNjbHh1WEhSY2RISmxkSFZ5YmlCYlhISmNibHgwWEhSY2RDYzhaR2wySUdOc1lYTnpQVndpSnl3Z2NISmxabWw0TENBbkxXVnljbTl5WENJZ1BpY3NJR1V1ZEc5VGRISnBibWNvS1N3Z0p5QThMMlJwZGo0blhISmNibHgwWEhSZExtcHZhVzRvSnljcE8xeHlYRzVjZEgxY2NseHVmVHRjY2x4dVhISmNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNG9aR0YwWVN3Z2IzQjBLU0I3WEhKY2JseDBkbUZ5SUdwemIyNGdQU0FuSnp0Y2NseHVYSFIyWVhJZ2IzQjBhVzl1Y3lBOUlHOXdkQ0I4ZkNCN1pYaHdZVzVrWldRNklIUnlkV1Y5TzF4eVhHNWNkR2xtSUNoMGVYQmxiMllnWkdGMFlTQTlQU0FuYzNSeWFXNW5KeWtnZTF4eVhHNWNkRngwYW5OdmJpQTlJR1JoZEdFN1hISmNibHgwZlNCbGJITmxJR2xtSUNoMGVYQmxiMllnWkdGMFlTQTlQU0FuYjJKcVpXTjBKeWtnZTF4eVhHNWNkRngwYW5OdmJpQTlJRXBUVDA0dWMzUnlhVzVuYVdaNUtHUmhkR0VwWEhKY2JseDBmVnh5WEc1Y2RISmxkSFZ5YmlCblpYUktjMjl1Vm1sbGQyVnlLR3B6YjI0c0lHOXdkR2x2Ym5NcE8xeHlYRzU5TzF4eVhHNWNibHh1WEc0dktpb3FLaW9xS2lvcUtpb3FLaW9xS2lwY2JpQXFLaUJYUlVKUVFVTkxJRVpQVDFSRlVseHVJQ29xSUM0dmMyTnlhWEIwY3k5aGNHa3RaWGh3Ykc5eVpYSXZkakl2YzNKakwyMXZaSFZzWlhNdmFuTnZiaTF3WVhKelpTNXFjMXh1SUNvcUlHMXZaSFZzWlNCcFpDQTlJREZjYmlBcUtpQnRiMlIxYkdVZ1kyaDFibXR6SUQwZ01GeHVJQ29xTHlKZExDSnpiM1Z5WTJWU2IyOTBJam9pSW4wPVwiLCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaGlnaGxpZ2h0SnNvbi53b3JrZXIuanNcIik7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9oaWdobGlnaHRKc29uLndvcmtlci5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwMzQzOTEzL2hvdy10by1jcmVhdGUtYS13ZWItd29ya2VyLWZyb20tYS1zdHJpbmdcclxuXHJcbnZhciBVUkwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkw7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29udGVudCwgdXJsKSB7XHJcblx0dHJ5IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdHZhciBibG9iO1xyXG5cdFx0XHR0cnkgeyAvLyBCbG9iQnVpbGRlciA9IERlcHJlY2F0ZWQsIGJ1dCB3aWRlbHkgaW1wbGVtZW50ZWRcclxuXHRcdFx0XHR2YXIgQmxvYkJ1aWxkZXIgPSB3aW5kb3cuQmxvYkJ1aWxkZXIgfHwgd2luZG93LldlYktpdEJsb2JCdWlsZGVyIHx8IHdpbmRvdy5Nb3pCbG9iQnVpbGRlciB8fCB3aW5kb3cuTVNCbG9iQnVpbGRlcjtcclxuXHRcdFx0XHRibG9iID0gbmV3IEJsb2JCdWlsZGVyKCk7XHJcblx0XHRcdFx0YmxvYi5hcHBlbmQoY29udGVudCk7XHJcblx0XHRcdFx0YmxvYiA9IGJsb2IuZ2V0QmxvYigpO1xyXG5cdFx0XHR9IGNhdGNoKGUpIHsgLy8gVGhlIHByb3Bvc2VkIEFQSVxyXG5cdFx0XHRcdGJsb2IgPSBuZXcgQmxvYihbY29udGVudF0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBuZXcgV29ya2VyKFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYikpO1xyXG5cdFx0fSBjYXRjaChlKSB7XHJcblx0XHRcdHJldHVybiBuZXcgV29ya2VyKCdkYXRhOmFwcGxpY2F0aW9uL2phdmFzY3JpcHQsJyArIGVuY29kZVVSSUNvbXBvbmVudChjb250ZW50KSk7XHJcblx0XHR9XHJcblx0fSBjYXRjaChlKSB7XHJcblx0XHRyZXR1cm4gbmV3IFdvcmtlcih1cmwpO1xyXG5cdH1cclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3dvcmtlci1sb2FkZXIvY3JlYXRlSW5saW5lV29ya2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImZ1bmN0aW9uIHNsaWNrKHRpbWVzKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblx0dmFyIHNlbGVjdG9yID0gJyNzbGlkZXItJztcclxuXHRcclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHRpbWVzOyBpKyspIHtcclxuXHRcdCQoc2VsZWN0b3IgKyBpKS5sZW5ndGggJiYgJChzZWxlY3RvciArIGkpLnNsaWNrKHtcclxuXHRcdFx0ZG90czogZmFsc2UsXHJcblx0XHRcdGluZmluaXRlOiBmYWxzZSxcclxuXHRcdFx0c3BlZWQ6IDMwMCxcclxuXHRcdFx0c2xpZGVzVG9TaG93OiAzLFxyXG5cdFx0XHRzbGlkZXNUb1Njcm9sbDogMSxcclxuXHRcdFx0dmFyaWFibGVXaWR0aDogdHJ1ZSxcclxuXHRcdFx0YXV0b3BsYXk6IGZhbHNlLFxyXG5cdFx0XHRyZXNwb25zaXZlOiBbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0YnJlYWtwb2ludDogMTIwMCxcclxuXHRcdFx0XHRcdHNldHRpbmdzOiB7XHJcblx0XHRcdFx0XHRcdHZhcmlhYmxlV2lkdGg6IHRydWUsXHJcblx0XHRcdFx0XHRcdHNsaWRlc1RvU2hvdzogMixcclxuXHRcdFx0XHRcdFx0c2xpZGVzVG9TY3JvbGw6IDEsXHJcblx0XHRcdFx0XHRcdGluZmluaXRlOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0ZG90czogZmFsc2VcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGJyZWFrcG9pbnQ6IDgwMCxcclxuXHRcdFx0XHRcdHNldHRpbmdzOiB7XHJcblx0XHRcdFx0XHRcdHZhcmlhYmxlV2lkdGg6IHRydWUsXHJcblx0XHRcdFx0XHRcdHNsaWRlc1RvU2hvdzogMSxcclxuXHRcdFx0XHRcdFx0c2xpZGVzVG9TY3JvbGw6IDFcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gdW5zbGljayh0aW1lcykge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHRpbWVzOyBpKyspIHtcclxuXHRcdHZhciBzZWxlY3RvciA9ICcjc2xpZGVyLScgKyBpO1xyXG5cdFx0JChzZWxlY3RvcikgJiYgJChzZWxlY3RvcikubGVuZ3RoICYmICQoc2VsZWN0b3IpLnNsaWNrKCd1bnNsaWNrJyk7XHJcblx0fVxyXG5cdGNvbnNvbGUuaW5mbygnY2xlYXJlZCcpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRzZXQ6IHNsaWNrLFxyXG5cdHJlbW92ZTogdW5zbGlja1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvc2xpZGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge1xuXHRcImRpc2NvdmVyeS52Mi5ldmVudHMuZ2V0XCI6IHtcblx0XHRcImV2ZW50c1wiOiB7XG5cdFx0XHRcIm9iamVjdFwiOiB7XG5cdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XCJ0aXRsZVwiOiBcIkV2ZW50XCIsXG5cdFx0XHRcdFx0XCJjb3B5QnRuXCI6IHtcblx0XHRcdFx0XHRcdFwibmFtZVwiOiB0cnVlXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcInJlcXVlc3RcIjogXCJodHRwOi8vd3d3Lmdvb2dsZS5jb21cIixcblx0XHRcdFx0XHRcImluZGV4XCI6IDBcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdFwiaW1hZ2VzXCI6IHtcblx0XHRcdFx0XCJvYmplY3RcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcInRpdGxlXCI6IFwiaW1hZ2VcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcImluZGV4XCI6IDEsXG5cdFx0XHRcdFx0XCJjb2xsYXBzZWRcIjogdHJ1ZVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJzYWxlc1wiOiB7XG5cdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XCJpbmRleFwiOiAyXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcInZlbnVlc1wiOiB7XG5cdFx0XHRcdFwib2JqZWN0XCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJ0aXRsZVwiOiBcInZlbnVlXCIsXG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDBcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiY2l0eVwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogMlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJzdGF0ZVwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogMVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJjb3VudHJ5XCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiAxXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImFkZHJlc3NcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDNcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwibG9jYXRpb25cIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XCJpbmRleFwiOiAzXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcImRhdGVzXCI6IHtcblx0XHRcdFx0XCJ0aW1lem9uZVwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogMFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJzdGFydFwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogMSxcblx0XHRcdFx0XHRcdFwiY29weUJ0blwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiZGF0ZVRpbWVcIjogdHJ1ZVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwiY29sbGFwc2VkXCI6IHRydWVcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwic3RhdHVzXCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiAzLFxuXHRcdFx0XHRcdFx0XCJjb2xsYXBzZWRcIjogdHJ1ZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJlbmRcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDIsXG5cdFx0XHRcdFx0XHRcImNvcHlCdG5cIjoge1xuXHRcdFx0XHRcdFx0XHRcImRhdGVUaW1lXCI6IHRydWVcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcImNvbGxhcHNlZFwiOiB0cnVlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFwiaW5kZXhcIjogNCxcblx0XHRcdFx0XHRcImFsbEluc2lkZVwiOiB0cnVlXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcImV2ZW50c1wiOiB0cnVlLFxuXHRcdFx0XHRcImluZGV4XCI6IDBcblx0XHRcdH1cblx0XHR9LFxuXHRcdFwicGFnZVwiOiB7XG5cdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcImluZGV4XCI6IDEsXG5cdFx0XHRcdFwiY29sbGFwc2VkXCI6IHRydWVcblx0XHRcdH1cblx0XHR9LFxuXHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcIm1ldGhvZFwiOiBcImRpc2NvdmVyeS52Mi5ldmVudHMuZ2V0XCJcblx0XHR9XG5cdH0sXG5cdFwiZGlzY292ZXJ5LnYyLmF0dHJhY3Rpb25zLmdldFwiOiB7XG5cdFx0XCJhdHRyYWN0aW9uc1wiOiB7XG5cdFx0XHRcIm9iamVjdFwiOiB7XG5cdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XCJpbmRleFwiOiAwXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcImltYWdlc1wiOiB7XG5cdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XCJpbmRleFwiOiAyXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcImNsYXNzaWZpY2F0aW9uc1wiOiB7XG5cdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XCJpbmRleFwiOiAxXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcImluZGV4XCI6IDBcblx0XHRcdH1cblx0XHR9LFxuXHRcdFwicGFnZVwiOiB7XG5cdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcImluZGV4XCI6IDFcblx0XHRcdH1cblx0XHR9LFxuXHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcIm1ldGhvZENvbmZpZ1wiOiB0cnVlXG5cdFx0fVxuXHR9LFxuXHRcIl9HTE9CQUxfQ09ORklHXCI6IHtcblx0XHRcImNvcHlCdG5cIjoge1xuXHRcdFx0XCJpZFwiOiB0cnVlXG5cdFx0fSxcblx0XHRcImRlcHJlY2F0ZWRcIjogW1xuXHRcdFx0XCJfbGlua3NcIlxuXHRcdF0sXG5cdFx0XCJ1bndyYXBwXCI6IFtcblx0XHRcdFwiX2VtYmVkZGVkXCJcblx0XHRdXG5cdH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbmZpZy5qc29uXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBOVU0gPSAxMjtcbnZhciBQUkVGSVggPSAnY29sb3ItJztcblxudmFyIGNvbG9ycyA9IGdldENvbG9ycyhOVU0sIFBSRUZJWCk7XG5cbmZ1bmN0aW9uIGdldENvbG9ycyhudW0sIGNsYXNzUHJlZml4KSB7XG5cdHZhciBjb2xvcnMgPSBuZXcgQXJyYXkobnVtKTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGNvbG9ycy5sZW5ndGg7IGkrKykge1xuXHRcdGNvbG9yc1tpXSA9IGNsYXNzUHJlZml4ICsgKGkgKyAxKTtcblx0fVxuXHRyZXR1cm4gY29sb3JzO1xufVxuXG5mdW5jdGlvbiBnZXRSYW5kb21Db2xvcihjb2xvcikge1xuXHR2YXIgcmFuZG9tTnVtYmVyO1xuXHRkbyB7XG5cdFx0cmFuZG9tTnVtYmVyID0gZ2V0UmFuZG9tSW50KDEsIGNvbG9ycy5sZW5ndGgpO1xuXHR9IHdoaWxlIChQUkVGSVggKyByYW5kb21OdW1iZXIgPT09IGNvbG9yKTtcblxuXHRyZXR1cm4gUFJFRklYICsgcmFuZG9tTnVtYmVyO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIG1pbiAoaW5jbHVzaXZlKSBhbmQgbWF4IChpbmNsdXNpdmUpXG4gKiBVc2luZyBNYXRoLnJvdW5kKCkgd2lsbCBnaXZlIHlvdSBhIG5vbi11bmlmb3JtIGRpc3RyaWJ1dGlvbiFcbiAqL1xuZnVuY3Rpb24gZ2V0UmFuZG9tSW50KG1pbiwgbWF4KSB7XG5cdHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xufVxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGNvbG9yczogY29sb3JzLFxuXHRnZXRSYW5kb21Db2xvcjogZ2V0UmFuZG9tQ29sb3Jcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvY29sb3JDbGFzc2VzLmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcclxuXHRyZXF1aXJlKCcuL2N1c3RvbVNlbGVjdC5jb21wb25lbnQuanMnKTtcclxuXHRyZXF1aXJlKCcuL3BhbmVscy9wYW5lbEdyb3VwLmNvbXBvbmVudC5qcycpO1xyXG5cdHJlcXVpcmUoJy4vcGFuZWxzL3BhbmVsLmNvbXBvbmVudC5qcycpO1xyXG5cdHJlcXVpcmUoJy4vcGFuZWxzL3BhZ2luYXRpb24uY29tcG9uZW50LmpzJyk7XHJcblx0cmVxdWlyZSgnLi9wYW5lbHMvcGFuZWxIZWFkaW5nLmNvbXBvbmVudC5qcycpO1xyXG5cdHJlcXVpcmUoJy4vcGFuZWxzL29iamVjdFBhbmVsQm9keS5jb21wb25lbnQuanMnKTtcclxuXHRyZXF1aXJlKCcuL3BhbmVscy9hcnJheVBhbmVsQm9keS5jb21wb25lbnQuanMnKTtcclxufSgpKTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxyXG4gKiBDdXN0b20gU2VsZWN0IGNvbXBvbmVudFxyXG4gKi9cclxudmFyIHNlbGY7XHJcblxyXG4vKipcclxuICogQ3VzdG9tIFNlbGVjdCBWaWV3LU1vZGVsXHJcbiAqIEBwYXJhbSBwYXJhbXNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBDdXN0b21TZWxlY3QocGFyYW1zKSB7XHJcbiAgc2VsZiA9IHRoaXM7XHJcblxyXG4gIHRoaXMuYW5pbWF0aW9uU3BlZWQgPSBwYXJhbXMuYW5pbWF0aW9uU3BlZWQgfHwgMjAwO1xyXG5cdHRoaXMuY3VyZW50U2VsZWN0RGF0YSA9IHBhcmFtcy5kYXRhIHx8IG51bGw7XHJcblx0dGhpcy5vbkZvY3VzID0gcGFyYW1zLmZvY3VzIHx8IG51bGw7XHJcblx0XHJcbiAgLy9vYnNlcnZhYmxlc1xyXG4gIHRoaXMuc2VsZWN0TW9kZWwgPSB0eXBlb2YgcGFyYW1zLm9wdGlvbnMgIT09J2Z1bmN0aW9uJyA/IGtvLm9ic2VydmFibGVBcnJheShwYXJhbXMub3B0aW9ucyk6ICBwYXJhbXMub3B0aW9ucztcclxuICB0aGlzLnBsYWNlaG9sZGVyID0ga28ub2JzZXJ2YWJsZShwYXJhbXMucGxhY2Vob2xkZXIgfHwgJycpO1xyXG4gIHRoaXMub25zZWxlY3QgPSBwYXJhbXMub25zZWxlY3QgfHwgZnVuY3Rpb24gKGl0ZW0pIHsgY29uc29sZS5sb2coaXRlbSArJ3NlbGVjdGVkIScpfTtcclxuICB0aGlzLnNlbGVjdGVkID0ga28ub2JzZXJ2YWJsZSh0aGlzLnNlbGVjdE1vZGVsKClbMF0pO1xyXG4gIHRoaXMuaXNPbmVPcHRpb24gPSBrby5wdXJlQ29tcHV0ZWQoZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0TW9kZWwoKS5sZW5ndGggPCAyOyAvLyBtb3JlIHRoYW4gb25lIG9wdGlvblxyXG4gIH0sIHRoaXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kRWxlbWVudChldmVudCkge1xyXG4gIHZhciBwYXJlbnQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnBhcmVudHMoJy5qcy1jdXN0b20tc2VsZWN0Jyk7XHJcbiAgcmV0dXJuIHtcclxuICAgIHdyYXBwZXI6IHBhcmVudC5maW5kKCcuanMtY3VzdG9tLXNlbGVjdC13cmFwcGVyJyksXHJcbiAgICBsYXllcjogcGFyZW50LmZpbmQoJy5qcy1jdXN0b20tc2VsZWN0LWxheWVyJylcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDdXN0b20gU2VsZWN0IFZpZXctTW9kZWwgbWV0aG9kXHJcbiAqIEBwYXJhbSB2aWV3TW9kZWxcclxuICogQHBhcmFtIGV2ZW50XHJcbiAqL1xyXG5DdXN0b21TZWxlY3QucHJvdG90eXBlLnNsaWRlVG9nZ2xlID0gZnVuY3Rpb24odmlld01vZGVsLCBldmVudCkge1xyXG5cdC8vIGVsZW0gaW4gZm9jdXMgZW11bGF0aW9uXHJcblx0dGhpcy5vbkZvY3VzICYmIHRoaXMub25Gb2N1cyh0aGlzLmN1cmVudFNlbGVjdERhdGEpO1xyXG5cclxuXHRpZiAodGhpcy5pc09uZU9wdGlvbigpKSB7cmV0dXJuIGZhbHNlO31cclxuICB2YXIgZWwgPSBmaW5kRWxlbWVudChldmVudCk7XHJcbiAgICBlbC53cmFwcGVyLnNsaWRlVG9nZ2xlKHZpZXdNb2RlbC5hbmltYXRpb25TcGVlZCk7XHJcbiAgICBlbC5sYXllci50b2dnbGVDbGFzcygnaGlkZGVuJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3VzdG9tIFNlbGVjdCBWaWV3LU1vZGVsIG1ldGhvZFxyXG4gKiBAcGFyYW0gaXRlbVxyXG4gKiBAcGFyYW0gZXZlbnRcclxuICovXHJcbkN1c3RvbVNlbGVjdC5wcm90b3R5cGUuc2VsZWN0SXRlbSA9IGZ1bmN0aW9uIChpdGVtLCBldmVudCkge1xyXG4gIHZhciBzZWxmID0gdGhpcztcclxuICB0aGlzLnNlbGVjdGVkKGl0ZW0pO1xyXG4gIC8vIHJ1biBoYW5kbGVyXHJcbiAgdGhpcy5vbnNlbGVjdChpdGVtKTtcclxuXHQvLyBzbGlkZSB1cFxyXG4gIHRoaXMuc2xpZGVUb2dnbGUoc2VsZiwgZXZlbnQpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjdXN0b20tc2VsZWN0Jywge1xyXG4gIHZpZXdNb2RlbDogQ3VzdG9tU2VsZWN0LFxyXG4gIHRlbXBsYXRlOiAoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3QganMtY3VzdG9tLXNlbGVjdFwiPicsXHJcbiAgICAgICc8ZGl2IGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0LXdyYXBwZXJcIj4nLFxyXG4gICAgICAgICc8c2VsZWN0IGRhdGEtYmluZD1cIm9wdGlvbnM6IHNlbGVjdE1vZGVsLCBvcHRpb25zVGV4dDogXFwnbmFtZVxcJywgdmFsdWU6IHNlbGVjdGVkXCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2ZpZWxkXCIgbmFtZT1cImFwaS1leHAtbWV0aG9kXCI+PC9zZWxlY3Q+JyxcclxuICAgICAgICAnPHNwYW4gY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX3BsYWNlaG9sZGVyXCI+JyxcclxuICAgICAgICAgICc8aW5wdXQgZGF0YS1iaW5kPVwiZXZlbnQ6IHtjbGljazogc2xpZGVUb2dnbGV9LCBhdHRyOiB7dmFsdWU6IHNlbGVjdGVkKCkubmFtZSwgZGlzYWJsZWQ6IGlzT25lT3B0aW9ufVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCJcIiByZWFkb25seT1cIlwiPicsXHJcbiAgICAgICAgICAnPGIgZGF0YS1iaW5kPVwiY3NzOiB7aGlkZGVuOiBpc09uZU9wdGlvbn1cIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9fY2hldnJvblwiPiZuYnNwOzwvYj4nLFxyXG4gICAgICAgICc8L3NwYW4+JyxcclxuICAgICAgICAnPHVsIGRhdGEtYmluZD1cImZvcmVhY2g6IHNlbGVjdE1vZGVsXCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2xpc3QganMtY3VzdG9tLXNlbGVjdC13cmFwcGVyXCI+JyxcclxuICAgICAgICAgICc8bGkgZGF0YS1iaW5kPVwiY3NzOiB7XFwnYWN0aXZlXFwnOiBjaGVja2VkfVwiIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19pdGVtXCI+JyxcclxuICAgICAgICAgICAgJzxidXR0b24gZGF0YS1iaW5kPVwiZXZlbnQ6IHtjbGljazogJHBhcmVudC5zZWxlY3RJdGVtLmJpbmQoJHBhcmVudCl9LCB0ZXh0OiBuYW1lLCBjc3M6IHtcXCdhY3RpdmVcXCc6IGNoZWNrZWQoKX0sIGF0dHI6IHtcXCdkYXRhLXZhbHVlXFwnOiBuYW1lfVwiICBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9faXRlbS1sYWJlbFwiIGhyZWY9XCIjXCI+PC9idXR0b24+JyxcclxuICAgICAgICAgICAgLy8gJzxzcGFuIGRhdGEtYmluZD1cImlmOiBsaW5rXCI+JyxcclxuICAgICAgICAgICAgXHQnPGEgZGF0YS1iaW5kPVwiYXR0cjoge2hyZWY6IGxpbmt9LCBjc3M6IHtcXCdoaWRkZW5cXCc6ICFsaW5rfVwiIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19pdGVtLWxpbmtcIiB0YXJnZXQ9XCJfYmxhbmtcIj4mbmJzcDs8L2E+JyxcclxuICAgICAgICAgICAgLy8gJzwvc3Bhbj4nLFxyXG4gICAgICAgICAgJzwvbGk+JyxcclxuICAgICAgICAnPC91bD4nLFxyXG4gICAgICAnPC9kaXY+JyxcclxuICAgICAgJzxkaXYgZGF0YS1iaW5kPVwiY2xpY2s6IHNsaWRlVG9nZ2xlXCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3QtbGF5ZXIganMtY3VzdG9tLXNlbGVjdC1sYXllciBoaWRkZW5cIj48L2Rpdj4nLFxyXG4gICAgJzwvZGl2PidcclxuICBdKS5qb2luKCcnKVxyXG59KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL2N1c3RvbVNlbGVjdC5jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcbnRvZG86IHNpbmdsZSAtIGZpcnN0IGxvYWQ7XG50b2RvOiBwYWdpbmcgKHBhcmFtcylcbnRvZG86IHVsciBwYXJzZVxudG9kbzogZmllbGRzIHZhbGlkYXRpb25cbiAqL1xuXG52YXIgc2VsZjtcblxuZnVuY3Rpb24gQ2FyZEdyb3VwKHBhcmFtcykge1xuXHRzZWxmID0gdGhpcztcblx0dGhpcy51cmwgPSB0aGlzLnVybCB8fCBwYXJhbXMudXJsO1xuXHR0aGlzLmNvbmZpZyA9IGdldENvbmZpZyhwYXJhbXMpO1xuXHR0aGlzLmRhdGEgPSBwcmVwYXJlRGF0YShwYXJhbXMsIHRoaXMuY29uZmlnLl9DT05GSUcpO1xuXHR0aGlzLmdyb3VwSW5kZXggPSBwYXJhbXMuZ3JvdXBJbmRleCB8fCAwO1xuXHR0aGlzLnNlY3Rpb25JbmRleCA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUocGFyYW1zLnNlY3Rpb25JbmRleCk7XG5cdHRoaXMuY29sb3JDbGFzcyA9IHBhcmFtcy5jb2xvckNsYXNzO1xuXHR0aGlzLmdldE1vcmUgPSBwYXJhbXMuZ2V0TW9yZTtcblx0dGhpcy5wYWdlID0gZ2V0UGFnaW5nSW5mbyhwYXJhbXMsIHRoaXMuZGF0YS5wYWdlLCB0aGlzLnVybCk7XG5cdHRoaXMuY29sbGFwc2VJZCA9IGdldENvbGxhcHNlSWQoKTtcblx0dGhpcy5faGFzRXZlbnRzUGFuZWwgPSBmYWxzZTtcbn1cblxuQ2FyZEdyb3VwLnByb3RvdHlwZS5zb3J0QnlDb25maWcgPSBmdW5jdGlvbiAoYSwgYikge1xuXHRpZiAodGhpcy5jb25maWcgJiYgdGhpcy5jb25maWdbYS5rZXldICYmIHRoaXMuY29uZmlnW2Iua2V5XSAmJiB0aGlzLmNvbmZpZ1thLmtleV0uX0NPTkZJRyAmJiB0aGlzLmNvbmZpZ1tiLmtleV0uX0NPTkZJRykge1xuXHRcdHZhciBpMSA9IHRoaXMuY29uZmlnW2Eua2V5XS5fQ09ORklHLmluZGV4O1xuXHRcdHZhciBpMiA9IHRoaXMuY29uZmlnW2Iua2V5XS5fQ09ORklHLmluZGV4O1xuXHRcdHJldHVybiBpMSAtIGkyO1xuXHR9XG5cdHJldHVybiAwO1xufTtcblxuQ2FyZEdyb3VwLnByb3RvdHlwZS5jaGVja0lmSGFzRXZlbnRzTGlzdCA9IGZ1bmN0aW9uIChrZXkpIHtcblx0cmV0dXJuIHNlbGYuX2hhc0V2ZW50c1BhbmVsID0ga2V5ID09PSAnZXZlbnRzJyB8fCBzZWxmLl9oYXNFdmVudHNQYW5lbDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga28uY29tcG9uZW50cy5yZWdpc3RlcigncGFuZWwtZ3JvdXAnLCB7XG5cdHZpZXdNb2RlbDogQ2FyZEdyb3VwLFxuXHR0ZW1wbGF0ZTpgXG5cdFx0PHNlY3Rpb24gZGF0YS1iaW5kPVwiZm9yZWFjaHByb3A6IHtkYXRhOiBkYXRhLCBzb3J0Rm46IHNvcnRCeUNvbmZpZy5iaW5kKCRjb21wb25lbnQpfVwiIGNsYXNzPVwicGFuZWwtZ3JvdXBcIj5cblx0XHRcdDwhLS1wYW5lbC0tPlxuXHRcdFx0PHBhbmVsIGRhdGEtYmluZD1cImNzczogeydoYXMtZXZlbnRzLWxpc3QnOiAkY29tcG9uZW50LmNoZWNrSWZIYXNFdmVudHNMaXN0KGtleSl9XCIgcGFyYW1zPVwiJGRhdGE6ICRkYXRhLCAkaW5kZXg6ICRpbmRleCwgcGFuZWxHcm91cDogJGNvbXBvbmVudCwgc29ydEJ5Q29uZmlnOiAkY29tcG9uZW50LnNvcnRCeUNvbmZpZ1wiPjwvcGFuZWw+XG5cdFx0PC9zZWN0aW9uPlxuYH0pO1xuXG4vKipcbiAqIENvbmZpZ3VyZXMgYW5kIHBhcmFtcyBmb3IgZWFjaCBwYW5lbCBncm91cFxuICogQHBhcmFtIHBhcmFtc1xuICogQHJldHVybnMgeyp9XG4gKi9cbmZ1bmN0aW9uIGdldENvbmZpZyhwYXJhbXMpIHtcblx0c2VsZi5kZWVwUHJvcCA9IHBhcmFtcy5kZWVwUHJvcCB8fCAnJztcblx0Ly8gbWFpbiBjb25maWdcblx0aWYgKCFzZWxmLmRlZXBQcm9wICYmICFwYXJhbXMuY29uZmlnKSB7XG5cdFx0Ly8gcGFuZWxHcm91cCBpbmRleCAtIDBcblxuXHRcdC8vIGdldCBmdWxsIGNvbmZpZztcblx0XHR2YXIgZmlsdGVyID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShwYXJhbXMuZmlsdGVyKTtcblxuXHRcdC8vIGdldCBjdXJyZW50IG1ldGhvZCBjb25maWdcblx0XHR2YXIgbWV0aG9kQ29uZmlnID0gZmlsdGVyW3BhcmFtcy5yZXFJZF0gfHwge307XG5cblx0XHQvLyBtZXRob2QgY29uZmlnIGluaGVyaXRzIGdsb2JhbCBjb25maWdcblx0XHRtZXRob2RDb25maWcuX0NPTkZJRyAgPSAkLmV4dGVuZCh0cnVlLCB7fSwgZmlsdGVyLl9HTE9CQUxfQ09ORklHLCBtZXRob2RDb25maWcuX0NPTkZJRyk7XG5cblx0XHRyZXR1cm4gbWV0aG9kQ29uZmlnO1xuXHR9IGVsc2Uge1xuXHRcdC8vIHBhbmVsR3JvdXAgaW5kZXggPiAwXG5cdFx0cmV0dXJuIHBhcmFtcy5jb25maWcgfHwge31cblx0fVxufVxuXG4vKipcbiAqIERhdGEgbWFuaXB1bGF0aW9uc1xuICogQHBhcmFtIHBhcmFtc1xuICogQHJldHVybnMgeyp8e319XG4gKi9cbmZ1bmN0aW9uIHByZXBhcmVEYXRhKHBhcmFtcywgY29uZmlnKSB7XG5cdHZhciBkYXRhID0gcGFyYW1zICYmIHBhcmFtcy5kYXRhIHx8IHt9O1xuXHR1bndyYXBwT2JqZWN0cyhkYXRhLCBjb25maWcpO1xuXHRyZW1vdmVEZXByZWNhdGVkKGRhdGEsIGNvbmZpZyk7XG5cdHJldHVybiB3cmFwcFByaW1pdGl2ZXMoZGF0YSwgcGFyYW1zLl9wcm9wVGl0bGUpO1xufVxuXG4vKipcbiAqIEdhdGhlcnMgYWxsIHN0YW5kIGFsb25lIHByb3BzIGluIHRvIG9uZSBvYmplY3RcbiAqIEBwYXJhbSBkYXRhIHtvYmplY3R9XG4gKiBAcGFyYW0gX3Byb3BUaXRsZSB7c3RyaW5nfVxuICogQHJldHVybnMge29iamVjdH0gcmV2aXNlZCBkYXRhXG4gKi9cbmZ1bmN0aW9uIHdyYXBwUHJpbWl0aXZlcyhkYXRhLCBfcHJvcFRpdGxlKSB7XG5cdHZhciBuZXdEYXRhID0ge30sIHByb3AgPSBfcHJvcFRpdGxlIHx8ICdvYmplY3QnLCB2YWwsIGtleTtcblxuXHQvLyBnYXRoZXJpbmcgYWxsIHByaW1pdGl2ZSBwcm9wcyBpbiBhZGRpdGlvbmFsIHBhbmVsXG5cdGZvciAoa2V5IGluIGRhdGEpIHtcblx0XHRpZiAoIWRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge2NvbnRpbnVlO31cblx0XHR2YWwgPSBkYXRhW2tleV07XG5cblx0XHRpZiAodHlwZW9mIHZhbCAhPT0gJ29iamVjdCcpIHtcblx0XHRcdG5ld0RhdGFbcHJvcF0gPSBuZXdEYXRhW3Byb3BdIHx8IHt9O1xuXHRcdFx0bmV3RGF0YVtwcm9wXVtrZXldID0gdmFsO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRuZXdEYXRhW2tleV0gPSB2YWw7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBuZXdEYXRhXG59XG5cbi8qKlxuICogVW53cmFwcyBvYmplY3RzXG4gKiBAcGFyYW0gb2JqIHtvYmplY3R9XG4gKiBAcmV0dXJucyB7b2JqZWN0fSBjaGFuZ2VkXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZURlcHJlY2F0ZWQob2JqLCBjb25maWcpIHtcblx0dmFyIGRlcHJlY2F0ZWQgPSBjb25maWcgJiYgY29uZmlnLmRlcHJlY2F0ZWQgfHwgW107XG5cblx0ZGVwcmVjYXRlZC5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRpZiAob2JqW2l0ZW1dKSB7XG5cdFx0XHRkZWxldGUgb2JqW2l0ZW1dXG5cdFx0fVxuXHRcdHJldHVybiBpdGVtO1xuXHR9KTtcblxuXHRyZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgZGVwcmVjYXRlZCBvYmplY3RzXG4gKiBAcGFyYW0gb2JqIHtvYmplY3R9XG4gKiBAcmV0dXJucyB7b2JqZWN0fSBjaGFuZ2VkXG4gKi9cbmZ1bmN0aW9uIHVud3JhcHBPYmplY3RzKG9iaiwgY29uZmlnKSB7XG5cdHZhciB1bndyYXBwID0gY29uZmlnICYmIGNvbmZpZy51bndyYXBwIHx8IFtdO1xuXG5cdHVud3JhcHAubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0dmFyIHZhbCA9IG9ialtpdGVtXTtcblx0XHRpZiAodmFsKSB7XG5cdFx0XHR2YXIgYXJyID0gT2JqZWN0LmtleXModmFsKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciBwcm9wID0gYXJyW2ldO1xuXHRcdFx0XHRvYmpbcHJvcF0gPSB2YWxbcHJvcF07XG5cdFx0XHR9XG5cdFx0XHRkZWxldGUgb2JqW2l0ZW1dO1xuXHRcdH1cblx0XHRyZXR1cm4gaXRlbTtcblx0fSk7XG5cblx0cmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBQcmVwYXJlcyBkYXRhIGZvciBwYWdpbmdcbiAqIEBwYXJhbSBwYWdlT2JqXG4gKiBAcGFyYW0gcGFyYW1zXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gZ2V0UGFnaW5nSW5mbyhwYXJhbXMsIHBhZ2VPYmosIHVybCkge1xuXHR2YXIgcGFnZVBhcmFtLCBzaXplO1xuXG5cdGlmIChwYXJhbXMucGFnZSkge1xuXHRcdHJldHVybiBwYXJhbXMucGFnZTtcblx0fVxuXHRpZiAocGFnZU9iail7XG5cdFx0c2l6ZSA9IHBhcmFtcy5jYXJkU2l6ZSB8fCBwYWdlT2JqLnNpemU7XG5cdFx0cGFnZVBhcmFtID0gcGFyYW1zLnBhZ2VQYXJhbSB8fCBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHVybCkuZmluZChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0cmV0dXJuIGl0ZW0ubmFtZSA9PT0gJ3BhZ2UnO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHRoaXMucGFnZSA9IHtcblx0XHRcdHBhcmFtZXRlcjogcGFnZVBhcmFtICYmIHBhZ2VQYXJhbS52YWx1ZSxcblx0XHRcdHNpemU6IHNpemVcblx0XHR9O1xuXHR9XG5cdHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIFByb3ZpZGVzIGlkIHN0ciBmb3IgcGFuZWwgJ2NvbGxhcHNlIHRvZ2dsZScgbG9naWNcbiAqIEBwYXJhbSBzdHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldENvbGxhcHNlSWQoc3RyKSB7XG5cdHZhciBjbGFzc05hbWUgPSBzdHIgfHwgJ2NhcmQtcGFuZWwtYm9keS0nO1xuXHRyZXR1cm4gW1xuXHRcdGNsYXNzTmFtZSxcblx0XHRzZWxmLnNlY3Rpb25JbmRleCxcblx0XHRzZWxmLmdyb3VwSW5kZXhcblx0XS5qb2luKCcnKTtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9wYW5lbHMvcGFuZWxHcm91cC5jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHNlbGY7XG5cbmZ1bmN0aW9uIGNhcmRDb21wb25lbnQocGFyYW1zKSB7XG5cdHNlbGYgPSB0aGlzO1xuXHR0aGlzLmtleSA9IHBhcmFtcy4kZGF0YS5rZXk7XG5cdHRoaXMuJGRhdGEgPSBwYXJhbXMuJGRhdGE7XG5cdHRoaXMuJGluZGV4ID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShwYXJhbXMuJGluZGV4KTtcblx0dGhpcy5wYW5lbEdyb3VwID0gcGFyYW1zLnBhbmVsR3JvdXA7XG5cdHRoaXMucGFnZSA9IHRoaXMucGFuZWxHcm91cC5wYWdlO1xuXHR0aGlzLmNvbG9yQ2xhc3MgPSB0aGlzLnBhbmVsR3JvdXAuY29sb3JDbGFzcyB8fCAnJztcblx0dGhpcy5jb25maWcgPSBnZXRQYW5lbENvbmZpZyh0aGlzLnBhbmVsR3JvdXAuY29uZmlnLCB0aGlzLmtleSk7XG5cdHRoaXMuaXNFeHBhbmRlZCA9IGlzRXhwYW5kZWQodGhpcy5jb25maWcpO1xuXHR0aGlzLmNvbGxhcHNlSWQgPSB0aGlzLnBhbmVsR3JvdXAuY29sbGFwc2VJZCArIHRoaXMuJGluZGV4O1xuXHR0aGlzLmlzQWN0aXZlID0ga28ub2JzZXJ2YWJsZSh0aGlzLmlzRXhwYW5kZWQpO1xufVxuXG5jYXJkQ29tcG9uZW50LnByb3RvdHlwZS5zZXRBY3RpdmUgPSBmdW5jdGlvbiAobW9kZWwsIGV2ZW50KSB7XG5cdHRoaXMuaXNBY3RpdmUoIXRoaXMuaXNBY3RpdmUoKSk7XG59O1xuXG4vKipcbiAqIEdldHMgY29uZmlnIGZvciBlYWNoIHBhbmVsXG4gKiBAcGFyYW0ga2V5IHtzdHJpbmd9IGtleSBvZiBwYW5lbCBvYmplY3RcbiAqIEByZXR1cm5zIHtvYmplY3R9IGNvbmZpZ1xuICovXG5mdW5jdGlvbiBnZXRQYW5lbENvbmZpZyhjb25maWcsIGtleSkge1xuXHR2YXIgc3ViQ29uZmlnID0gY29uZmlnW2tleV0gfHwge307XG5cblx0c3ViQ29uZmlnLl9DT05GSUcgPSAkLmV4dGVuZCh0cnVlLCB7fSwgY29uZmlnLl9DT05GSUcsIHN1YkNvbmZpZy5fQ09ORklHKTtcblx0cmV0dXJuIHN1YkNvbmZpZztcbn1cblxuLyoqXG4gKiBDaGVja3MgZm9yICdjb2xsYXBzZWQnIGNvbmZpZyBmb3IgZWFjaCBwYW5lbFxuICogQHBhcmFtIGtleSB7c3RyaW5nfSBrZXkgb2YgcGFuZWwgb2JqZWN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gZm9yIGNzcyBjbGFzcyBhZGQvcmVtb3ZlXG4gKi9cbmZ1bmN0aW9uIGlzRXhwYW5kZWQoY29uZmlnKSB7XG5cdHJldHVybiAhKE9iamVjdC5nZXRQcm9wKGNvbmZpZywgJy5fQ09ORklHLmNvbGxhcHNlZCcpIHx8IGZhbHNlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdwYW5lbCcsIHtcblx0dmlld01vZGVsOiBjYXJkQ29tcG9uZW50LFxuXHR0ZW1wbGF0ZTpgXG5cdFx0PHNlY3Rpb24gZGF0YS1iaW5kPVwiY3NzOiB7W2NvbG9yQ2xhc3NdOiB0cnVlLCBhY3RpdmU6IGlzQWN0aXZlfVwiIGNsYXNzPVwicGFuZWwgcGFuZWwtcHJpbWFyeVwiPlxuXHRcdFx0PCEtLXBhbmVsLWhlYWRpbmctLT5cblx0XHRcdDxwYW5lbC1oZWFkaW5nIHBhcmFtcz1cImNvbmZpZzogY29uZmlnLCBkYXRhOiAkZGF0YSwgaW5kZXg6ICRpbmRleCwgcGFnZTogcGFnZSwgc2V0QWN0aXZlOiBzZXRBY3RpdmUuYmluZCgkY29tcG9uZW50KSwgY29sbGFwc2VJZDogY29sbGFwc2VJZCwgY29sb3JDbGFzczogY29sb3JDbGFzcywgaXNFeHBhbmRlZDogaXNFeHBhbmRlZFwiPjwvcGFuZWwtaGVhZGluZz5cblx0XHRcdFxuXHRcdFx0PCEtLXBhbmVsLWJvZHktLT5cblx0XHRcdDxzZWN0aW9uIGRhdGEtYmluZD1cImF0dHI6IHsnaWQnOiBjb2xsYXBzZUlkfSwgY3NzOiB7J2luJzogaXNFeHBhbmRlZH1cIiBjbGFzcz1cInBhbmVsLWNvbGxhcHNlIGNvbGxhcHNlXCI+XHRcdFx0XHRcblx0XHRcdFx0PCEtLSBrbyBpZjogKHR5cGVvZiAkZGF0YS52YWx1ZSA9PT0gJ29iamVjdCcgJiYgISQuaXNBcnJheSgkZGF0YS52YWx1ZSkpIC0tPlxuXHRcdFx0XHRcdDxvYmplY3QtcGFuZWwtYm9keSBwYXJhbXM9XCJjb25maWc6IGNvbmZpZywgZGF0YTogJGRhdGEsIGluZGV4OiAkaW5kZXgsIHBhbmVsR3JvdXA6IHBhbmVsR3JvdXAsIHBhZ2U6IHBhZ2UsIGNvbGxhcHNlSWQ6IGNvbGxhcHNlSWRcIj48L29iamVjdC1wYW5lbC1ib2R5PlxuXHRcdFx0XHQ8IS0tIC9rbyAtLT5cblx0XHRcdFx0PCEtLSBrbyBpZjogKHR5cGVvZiAkZGF0YS52YWx1ZSA9PT0gJ29iamVjdCcgJiYgJC5pc0FycmF5KCRkYXRhLnZhbHVlKSkgLS0+XG5cdFx0XHRcdFx0PGFycmF5LXBhbmVsLWJvZHkgcGFyYW1zPVwiY29uZmlnOiBjb25maWcsIGRhdGE6ICRkYXRhLCBpbmRleDogJGluZGV4LCBwYW5lbEdyb3VwOiBwYW5lbEdyb3VwXCI+PC9hcnJheS1wYW5lbC1ib2R5PlxuXHRcdFx0XHQ8IS0tIC9rbyAtLT5cblx0XHRcdDwvc2VjdGlvbj5cblx0XHQ8L3NlY3Rpb24+XG5gfSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL3BhbmVsLmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcclxuXHJcbi8qKlxyXG4gKiBQYWdpbmF0aW9uIGVsZW1lbnRcclxuICogQHBhcmFtIHBhcmFtc1xyXG4gKi9cclxuZnVuY3Rpb24gcGFnaW5hdGlvbihwYXJhbXMpIHtcclxuXHR0aGlzLnBhZ2VQYXJhbSA9IHBhcmFtcy5wYWdlUGFyYW07XHJcblx0dGhpcy50b3RhbFBhZ2VzID0gK3BhcmFtcy50b3RhbFBhZ2VzO1xyXG5cdHRoaXMubnVtYmVyID0gK3BhcmFtcy5udW1iZXI7XHJcblx0dGhpcy5maXJzdCA9ICEhdGhpcy5udW1iZXI7XHJcblx0dGhpcy5sYXN0ID0gdGhpcy5udW1iZXIgPCB0aGlzLnRvdGFsUGFnZXMgLSAxO1xyXG5cdHRoaXMucmVxdWVzdEJ0biA9ICQoJyNhcGktZXhwLWdldC1idG4nKTtcclxuXHRzZWxmID0gdGhpcztcclxufVxyXG5cclxuLyoqXHJcbiAqIGdldCBuZXh0IHBhZ2VcclxuICovXHJcbnBhZ2luYXRpb24ucHJvdG90eXBlLmdldFByZXZQYWdlID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciB2YWwgPSB0aGlzLnBhZ2VQYXJhbSgpO1xyXG5cdHRoaXMucGFnZVBhcmFtKHZhbCA+IDAgPyB2YWwgLSAxIDogMCk7XHJcblx0dGhpcy5yZXF1ZXN0QnRuLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogZ2V0IHByZXYgcGFnZVxyXG4gKi9cclxucGFnaW5hdGlvbi5wcm90b3R5cGUuZ2V0TmV4dFBhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHZhbCA9IHRoaXMubnVtYmVyO1xyXG5cdHRoaXMucGFnZVBhcmFtKHZhbCA8IHRoaXMudG90YWxQYWdlcyAtIDEgPyB2YWwgICsgMTogdmFsKTtcclxuXHR0aGlzLnJlcXVlc3RCdG4udHJpZ2dlcignY2xpY2snKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ga28uY29tcG9uZW50cy5yZWdpc3RlcigncGFnaW5hdGlvbicsIHtcclxuXHR2aWV3TW9kZWw6IHBhZ2luYXRpb24sXHJcblx0dGVtcGxhdGU6XHJcblx0YDxzcGFuIGNsYXNzPVwibmF2aWdhdGlvbi13cmFwcGVyXCI+XHJcblx0XHQ8YnV0dG9uIGRhdGEtYmluZD1cImNsaWNrOiBnZXRQcmV2UGFnZSwgZW5hYmxlOiBmaXJzdFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm5hdmlnYXRpb24gcHJldlwiPjwvYnV0dG9uPlxyXG5cdFx0PGJ1dHRvbiAgZGF0YS1iaW5kPVwiY2xpY2s6IGdldE5leHRQYWdlLCBlbmFibGU6IGxhc3RcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJuYXZpZ2F0aW9uIG5leHRcIj48L2J1dHRvbj5cclxuXHQ8L3NwYW4+YFxyXG59KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYWdpbmF0aW9uLmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcbnZhciBnZXRSYW5kb21Db2xvciA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvY29sb3JDbGFzc2VzJykuZ2V0UmFuZG9tQ29sb3I7XG5cbmZ1bmN0aW9uIFBhbmVsSGVhZGluZyhwYXJhbXMpIHtcblx0c2VsZiA9IHRoaXM7XG5cdHRoaXMuY29uZmlnID0gcGFyYW1zLmNvbmZpZyAmJiBwYXJhbXMuY29uZmlnLl9DT05GSUc7XG5cdHZhciBwYWdlID0gcGFyYW1zLnBhZ2U7XG5cdHRoaXMuc2V0QWN0aXZlID0gcGFyYW1zLnNldEFjdGl2ZTtcblx0dGhpcy5pc0V4cGFuZGVkID0gcGFyYW1zLmlzRXhwYW5kZWQ7XG5cdHRoaXMuX3BhbmVsTmFtZSA9IHBhcmFtcy5kYXRhLmtleTtcblx0dGhpcy50aXRsZSA9IHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLnRpdGxlIHx8IHRoaXMuX3BhbmVsTmFtZTtcblx0dGhpcy5kYXRhID0gcGFyYW1zLmRhdGEudmFsdWU7XG5cdGlmIChwYWdlKSB7XG5cdFx0dGhpcy5jYXJkU2l6ZSA9IHBhZ2Uuc2l6ZTtcblx0XHR0aGlzLnBhZ2VQYXJhbSA9IHBhZ2UucGFnZVBhcmFtO1xuXHR9XG5cdHRoaXMuY29sbGFwc2VJZCA9IHBhcmFtcy5jb2xsYXBzZUlkO1xuXHRpZiAodGhpcy5jb25maWcucmVxdWVzdCkge1xuXHRcdHRoaXMuZ2V0UmFuZG9tQ29sb3IgPSBnZXRSYW5kb21Db2xvcihwYXJhbXMuY29sb3JDbGFzcyk7XG5cdH1cbn1cblxuUGFuZWxIZWFkaW5nLnByb3RvdHlwZS5mb2xsb3dSZXF1ZXN0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdHZhciB1cmwgPSBPYmplY3QuZ2V0UHJvcCh2YWx1ZSwgJy5jb25maWcucmVxdWVzdCcpO1xuXHR1cmwgJiYgbG9jYXRpb24uYXNzaWduKHVybCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ3BhbmVsLWhlYWRpbmcnLCB7XG5cdHZpZXdNb2RlbDogIFBhbmVsSGVhZGluZyxcblx0dGVtcGxhdGU6YFxuXHRcdDxzZWN0aW9uIGNsYXNzPVwicGFuZWwtaGVhZGluZ1wiPlxuXHRcdFx0PGRpdiBjbGFzcz1cInBhbmVsLXRpdGxlXCI+XG5cdFx0XHRcdFxuXHRcdFx0XHQ8YSBkYXRhLWJpbmQ9XCJjbGljazogc2V0QWN0aXZlLCBhdHRyOiB7aHJlZjogJyMnICsgY29sbGFwc2VJZCwgJ2FyaWEtY29udHJvbHMnOiBjb2xsYXBzZUlkLCAnYXJpYS1leHBhbmRlZCc6IGlzRXhwYW5kZWR9XCIgY2xhc3M9XCJidG4gYnRuLWljb24gYnRuLXRpdGxlXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImJ0biBidG4taWNvbiBzaGV2cm9uIHdoaXRlLXNoZXZyb24tdXBcIj48L3NwYW4+XG5cdFx0XHRcdFx0PHAgZGF0YS1iaW5kPVwidGV4dDogdGl0bGVcIiBjbGFzcz1cInRpdGxlXCI+UGFuZWwgdGl0bGU8L3A+XG5cdFx0XHRcdDwvYT5cblx0XHRcdFx0XG5cdFx0XHRcdDwhLS0ga28gaWY6IF9wYW5lbE5hbWUgPT09ICdldmVudHMnLS0+XG5cdFx0XHRcdFx0PHNwYW4gZGF0YS1iaW5kPVwidGV4dDogY2FyZFNpemVcIiBjbGFzcz1cImNvdW50ZXJcIj48L3NwYW4+XG5cdFx0XHRcdDwhLS0gL2tvLS0+XG5cdFx0XHRcdFxuXHRcdFx0XHQ8IS0tIGtvIGlmOiBfcGFuZWxOYW1lID09PSAncGFnZSctLT5cblx0XHRcdFx0XHQ8cGFnaW5hdGlvbiBwYXJhbXM9XCJudW1iZXI6IGRhdGEubnVtYmVyLCB0b3RhbFBhZ2VzOiBkYXRhLnRvdGFsUGFnZXMsIHBhZ2VQYXJhbTogcGFnZVBhcmFtXCI+PC9wYWdpbmF0aW9uPlxuXHRcdFx0XHQ8IS0tIC9rby0tPlxuXHRcdFx0XHRcblx0XHRcdFx0PCEtLSBrbyBpZjogY29uZmlnLnJlcXVlc3QgIT09IHVuZGVmaW5lZCAtLT5cblx0XHRcdFx0PHNlY3Rpb24gY2xhc3M9XCJmb2xsb3ctcmVxdWVzdFwiPlxuXHRcdFx0XHRcdDxzcGFuIGRhdGEtYmluZD1cImNzczogZ2V0UmFuZG9tQ29sb3JcIiBjbGFzcz1cImNvbG9yLWluZGljYXRvclwiPjwvc3Bhbj5cblx0XHRcdFx0XHQ8YnV0dG9uIGRhdGEtYmluZD1cImNsaWNrOiBmb2xsb3dSZXF1ZXN0XCIgY2xhc3M9XCJidG4gYnRuLXJlcXVlc3RcIiB0eXBlPVwiYnV0dG9uXCI+YW5vdGhlciByZXF1ZXN0PC9idXR0b24+XG5cdFx0XHRcdDwvc2VjdGlvbj5cblx0XHRcdFx0PCEtLSAva28tLT5cblx0XHRcdDwvZGl2PlxuXHRcdDwvc2VjdGlvbj5cbmB9KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9wYW5lbHMvcGFuZWxIZWFkaW5nLmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcblxuZnVuY3Rpb24gT2JqZWN0UGFuZWxCb2R5KHBhcmFtcykge1xuXHRzZWxmID0gdGhpcztcblx0dGhpcy5kYXRhID0gdGhpcy5kYXRhIHx8IGtvLm9ic2VydmFibGUocGFyYW1zLmRhdGEudmFsdWUpO1xuXHR0aGlzLmNvbmZpZyA9IHBhcmFtcy5jb25maWc7XG5cdHRoaXMuX3BhbmVsTmFtZSA9IHBhcmFtcy5kYXRhLmtleTtcblx0dGhpcy5jYXJkSW5kZXggPSB0aGlzLmNhcmRJbmRleCB8fCBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHBhcmFtcy5pbmRleCk7XG5cdHRoaXMucGFuZWxHcm91cCA9IHBhcmFtcy5wYW5lbEdyb3VwIHx8IHt9O1xuXHR0aGlzLmdldE1vcmUgPSB0aGlzLnBhbmVsR3JvdXAuZ2V0TW9yZTtcblx0dGhpcy5wYWdlUGFyYW0gPSBwYXJhbXMucGFnZSAmJiBwYXJhbXMucGFnZS5wYXJhbWV0ZXI7XG5cdHRoaXMuY29sbGFwc2VJZCA9IHBhcmFtcy5jb2xsYXBzZUlkO1xuXHR0aGlzLl9hbGxJbnNpZGUgPSAhIU9iamVjdC5nZXRQcm9wKGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUodGhpcy5jb25maWcpLCAnLl9DT05GSUcuYWxsSW5zaWRlJyk7XG5cdHRoaXMuc29ydEJ5Q29uZmlnID0gdGhpcy5wYW5lbEdyb3VwLnNvcnRCeUNvbmZpZztcbn1cblxuT2JqZWN0UGFuZWxCb2R5LnByb3RvdHlwZS5vbkVudGVyS2V5RG93biA9IGZ1bmN0aW9uIChtb2RlbCwgZXZlbnQpIHtcblx0aWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG5cdFx0dmFyIHZhbHVlID0gK2V2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWU7XG5cdFx0dmFsdWUgPSBOdW1iZXIuaXNOYU4odmFsdWUpID8gMCA6IHZhbHVlO1xuXHRcdHZhciBwYWdlTnVtYmVyID0gfn52YWx1ZSA8IDAgPyAwIDogfn52YWx1ZTtcblx0XHRzZWxmLnBhZ2VQYXJhbShwYWdlTnVtYmVyIDwga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShzZWxmLmRhdGEpLnRvdGFsUGFnZXMgPyBwYWdlTnVtYmVyIDoga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShzZWxmLmRhdGEpLnRvdGFsUGFnZXMgLSAxKTtcblx0XHQkKCcjYXBpLWV4cC1nZXQtYnRuJykudHJpZ2dlcignY2xpY2snKTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufTtcblxuT2JqZWN0UGFuZWxCb2R5LnByb3RvdHlwZS5jYW5CZUNvcGllZCA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKHR5cGVvZiB0aGlzLnZhbHVlID09PSAnb2JqZWN0JykgcmV0dXJuIGZhbHNlO1xuXHR0aGlzLmNvcGllZCA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuXHRpZiAoT2JqZWN0LmdldFByb3Aoc2VsZi5jb25maWcsICcuX0NPTkZJRy5jb3B5QnRuLicgKyB0aGlzLmtleSkpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdHJldHVybiBmYWxzZTtcbn07XG5cbk9iamVjdFBhbmVsQm9keS5wcm90b3R5cGUuY29weVZhbHVlID0gZnVuY3Rpb24gKG1vZGVsLCBldmVudCkge1xuXHR2YXIgY3VycmVudEZpZWxkID0gdGhpcztcblx0c2VsZi5jbGlwYm9hcmQgPSBuZXcgQ2xpcGJvYXJkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuXHRzZWxmLmNsaXBib2FyZC5vbignc3VjY2VzcycsIGZ1bmN0aW9uIG9uU3VjY2Vzc0NvcHkoZSkge1xuXHRcdFx0Y29uc29sZS5pbmZvKCdBY3Rpb246JywgZS5hY3Rpb24pO1xuXHRcdFx0Y29uc29sZS5pbmZvKCdUZXh0OicsIGUudGV4dCk7XG5cdFx0XHRjb25zb2xlLmluZm8oJ1RyaWdnZXI6JywgZS50cmlnZ2VyKTtcblx0XHRcdGN1cnJlbnRGaWVsZC5jb3BpZWQodHJ1ZSk7XG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Y3VycmVudEZpZWxkLmNvcGllZChmYWxzZSk7XG5cdFx0XHR9LCA1MDApO1xuXHRcdFx0ZS5jbGVhclNlbGVjdGlvbigpO1xuXHRcdH0pXG5cdFx0Lm9uKCdlcnJvcicsIGZ1bmN0aW9uIG9uRXJyb3JDb3B5KGUpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ0FjdGlvbjonLCBlLmFjdGlvbik7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdUcmlnZ2VyOicsIGUudHJpZ2dlcik7XG5cdFx0fSk7XG59O1xuXG5PYmplY3RQYW5lbEJvZHkucHJvdG90eXBlLnJlbW92ZUhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG5cdHNlbGYuY2xpcGJvYXJkICYmIHNlbGYuY2xpcGJvYXJkLmRlc3Ryb3koKTtcblx0ZGVsZXRlIHNlbGYuY2xpcGJvYXJkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdvYmplY3QtcGFuZWwtYm9keScsIHtcblx0dmlld01vZGVsOiAgT2JqZWN0UGFuZWxCb2R5LFxuXHR0ZW1wbGF0ZTpgXG5cdFx0PHNlY3Rpb24gZGF0YS1iaW5kPVwiY3NzOiB7J2FsbC1pbnNpZGUnOiAkY29tcG9uZW50Ll9hbGxJbnNpZGV9XCIgY2xhc3M9XCJwYW5lbC1ib2R5XCI+XG5cdFx0XHQ8IS0tIGtvIGlmOiAkY29tcG9uZW50Ll9wYW5lbE5hbWUgPT09ICdpbWFnZScgLS0+XG5cdFx0XHRcdDxpbWcgZGF0YS1iaW5kPVwiYXR0cjoge3NyYzoga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShkYXRhKS51cmwsIGFsdDogJ2ltYWdlLScgKyBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKGRhdGEpLnJhdGlvfVwiIGFsdD1cImltZ1wiIGNsYXNzPVwiaW1nIGltZy10aHVtYm5haWxcIj5cblx0XHRcdDwhLS0gL2tvIC0tPlxuXHRcdFx0XG5cdFx0XHQ8dWwgZGF0YS1iaW5kPVwiZm9yZWFjaHByb3A6IHtkYXRhOiBkYXRhLCBzb3J0Rm46ICRjb21wb25lbnQuc29ydEJ5Q29uZmlnLmJpbmQoJGNvbXBvbmVudCl9XCI+XG5cdFx0XHRcdDxsaSBkYXRhLWJpbmQ9XCJjc3M6IHsnb2JqZWN0JzogdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JywgJ3ByaW1pdGl2ZSc6IHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCd9XCIgY2xhc3M9XCJjbGVhcmZpeCBwYWRpbmdcIj5cblx0XHRcdFx0XG5cdFx0XHRcdFx0PCEtLSBrbyBpZm5vdDogdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAkY29tcG9uZW50Ll9hbGxJbnNpZGUgLS0+XG5cdFx0XHRcdFx0PHNwYW4gZGF0YS1iaW5kPVwidGV4dDogdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyA/IGtleToga2V5ICsgJzonXCIgY2xhc3M9XCJrZXlcIj48L3NwYW4+XG5cdFx0XHRcdFx0PCEtLSAva28gLS0+XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0PCEtLSBrbyBpZm5vdDogdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyB8fCAkY29tcG9uZW50Ll9wYW5lbE5hbWUgPT09ICdwYWdlJyAmJiBrZXkgPT09ICdudW1iZXInIC0tPlxuXHRcdFx0XHRcdFx0PHNwYW4gZGF0YS1iaW5kPVwidGV4dDogdmFsdWVcIiBjbGFzcz1cInZhbHVlXCI+PC9zcGFuPlxuXHRcdFx0XHRcdDwhLS0gL2tvIC0tPlxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdDwhLS0ga28gaWY6ICRjb21wb25lbnQuX3BhbmVsTmFtZSA9PT0gJ3BhZ2UnICYmIGtleSA9PT0gJ251bWJlcictLT5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLWlubGluZVwiPlxuXHRcdFx0XHRcdFx0XHQ8aW5wdXQgaWQ9XCJwYWdpbmF0aW9uLWlucHV0XCIgZGF0YS1iaW5kPVwiZXZlbnQ6IHtrZXlkb3duOiAkY29tcG9uZW50Lm9uRW50ZXJLZXlEb3dufSwgYXR0cjoge3BsYWNlaG9sZGVyOiB2YWx1ZX1cIiB0eXBlPVwidGV4dFwiIHBhdHRlcm49XCJbMC05XStcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PCEtLSAva28gLS0+XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0PCEtLSBrbyBpZjogJGNvbXBvbmVudC5jYW5CZUNvcGllZC5jYWxsKCRkYXRhLCAnI3Byb3AtdmFsdWUtJyArIGtleSArICRpbmRleCgpKSAtLT5cblx0XHRcdFx0XHRcdDxidXR0b24gZGF0YS1iaW5kPVwiZXZlbnQ6IHttb3VzZW92ZXI6ICRjb21wb25lbnQuY29weVZhbHVlLCBtb3VzZW91dDogJGNvbXBvbmVudC5yZW1vdmVIYW5kbGVyfSwgY3NzOiB7J2NvcGllZCc6IGNvcGllZH0sIGF0dHI6IHsnZGF0YS1jbGlwYm9hcmQtdGV4dCc6IHZhbHVlLnRvU3RyaW5nKCksIGlkOiAncHJvcC12YWx1ZS0nICsga2V5ICsgJGluZGV4KCl9XCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1pY29uIGJ0bi1jb3B5XCI+PC9idXR0b24+XG5cdFx0XHRcdFx0PCEtLSAva28gLS0+XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQ8IS0tIGtvIGlmOiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmICRjb21wb25lbnQuX2FsbEluc2lkZSAtLT5cblx0XHRcdFx0XHRcdFx0PHBhbmVsIHBhcmFtcz1cIiRkYXRhOiAkZGF0YSwgJGluZGV4OiAkaW5kZXgsIHBhbmVsR3JvdXA6ICRjb21wb25lbnRcIj48L3BhbmVsPlxuXHRcdFx0XHRcdFx0PCEtLSAva28gLS0+XG5cdFx0XHRcdFx0XHQ8IS0tIGtvIGlmOiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmICEkY29tcG9uZW50Ll9hbGxJbnNpZGUgLS0+XG5cdFx0XHRcdFx0XHRcdDxidXR0b24gZGF0YS1iaW5kPVwiY2xpY2s6ICRjb21wb25lbnQuZ2V0TW9yZS5iaW5kKCRjb21wb25lbnQsIGtleSwgdmFsdWUpXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1pY29uIGJsdWUtc2hldnJvbi1yaWdodCBwdWxsLXJpZ2h0XCI+PC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cblx0XHRcdFx0PC9saT5cblx0XHRcdDwvdWw+XG5cdFx0PC9zZWN0aW9uPlxuYH0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9vYmplY3RQYW5lbEJvZHkuY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xuXG5mdW5jdGlvbiBBcnJheVBhbmVsQm9keShwYXJhbXMpIHtcblx0c2VsZiA9IHRoaXM7XG5cdHRoaXMuZGF0YSA9IHBhcmFtcy5kYXRhLnZhbHVlO1xuXHR0aGlzLmNvbmZpZyA9IHBhcmFtcy5jb25maWc7XG5cdHRoaXMuX3BhbmVsTmFtZSA9IHBhcmFtcy5kYXRhLmtleTtcblx0dGhpcy5jYXJkSW5kZXggPSB0aGlzLmNhcmRJbmRleCB8fCBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHBhcmFtcy5pbmRleCk7XG5cdHRoaXMucGFuZWxHcm91cCA9IHBhcmFtcy5wYW5lbEdyb3VwO1xuXHR0aGlzLmdldE1vcmUgPSB0aGlzLnBhbmVsR3JvdXAuZ2V0TW9yZTtcblxufVxuXG5BcnJheVBhbmVsQm9keS5wcm90b3R5cGUuZ2V0U3RhcnREYXRhID0gZnVuY3Rpb24gKCRkYXRhKSB7XG5cdHJldHVybiBPYmplY3QuZ2V0UHJvcCgkZGF0YSwgJ2RhdGVzLnN0YXJ0LmxvY2FsRGF0ZScpIHx8ICcnXG59O1xuXG5BcnJheVBhbmVsQm9keS5wcm90b3R5cGUuZ2V0VmVudWVOYW1lID0gZnVuY3Rpb24gKCRkYXRhKSB7XG5cdHJldHVybiBPYmplY3QuZ2V0UHJvcCgkZGF0YSwgJ19lbWJlZGRlZC52ZW51ZXNbMF0ubmFtZScpIHx8ICcnXG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0ga28uY29tcG9uZW50cy5yZWdpc3RlcignYXJyYXktcGFuZWwtYm9keScsIHtcblx0dmlld01vZGVsOiBBcnJheVBhbmVsQm9keSxcblx0dGVtcGxhdGU6YFxuXHRcdDxzZWN0aW9uIGNsYXNzPVwicGFuZWwtYm9keSBuby1wYWRkaW5nXCI+XG5cdFx0XHQ8dWwgZGF0YS1iaW5kPVwiZm9yZWFjaDogZGF0YVwiIGNsYXNzPVwibGlzdC1ncm91cFwiPlxuXHRcdFx0XHQ8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj5cblx0XHRcdFx0XG5cdFx0XHRcdFx0PCEtLSBrbyBpZjogJGNvbXBvbmVudC5fcGFuZWxOYW1lID09PSAnaW1hZ2VzJyAtLT5cblx0XHRcdFx0XHRcdDxpbWcgZGF0YS1iaW5kPVwiYXR0cjoge3NyYzogdXJsLCBhbHQ6ICdpbWFnZS0nICsgcmF0aW99XCIgYWx0PVwiaW1nXCIgY2xhc3M9XCJpbWdcIj5cblx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cblx0XHRcdFx0XHRcblx0XHRcdFx0XHQ8IS0tIGtvIGlmbm90OiAkY29tcG9uZW50Ll9wYW5lbE5hbWUgPT09ICdpbWFnZXMnIC0tPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm5hbWUtd3JhcHBlclwiPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBkYXRhLWJpbmQ9XCJ0ZXh0OiBuYW1lIHx8ICcjJyArICRpbmRleCgpLCBibG9ja0VsbGlwc2lzOiB7Y2xhbXA6IDJ9XCIgY2xhc3M9XCJuYW1lXCI+bGFiZWw8L3NwYW4+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cdFx0XHRcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0PCEtLSBrbyBpZjogJGNvbXBvbmVudC5fcGFuZWxOYW1lID09PSAnZXZlbnRzJyAtLT5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImFkZGl0aW9uYWwtaW5mb1wiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGRhdGEtYmluZD1cInRleHQ6ICRjb21wb25lbnQuZ2V0U3RhcnREYXRhKCRkYXRhKVwiIGNsYXNzPVwiZGF0ZVwiPmV2ZW50IGRhdGU8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PCEtLSBrbyBpZjogJGNvbXBvbmVudC5nZXRWZW51ZU5hbWUoJGRhdGEpLS0+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cCBkYXRhLWJpbmQ9XCJ0ZXh0OiAkY29tcG9uZW50LmdldFZlbnVlTmFtZSgkZGF0YSlcIiBjbGFzcz1cInZlbnVlIHRydW5jYXRlXCI+ZXZlbnQgdmVudWU8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PCEtLS9rby0tPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwhLS0gL2tvIC0tPlxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0PCEtLSAva28gLS0+XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0PCEtLSBrbyBpZjogdHlwZW9mICRkYXRhID09PSAnb2JqZWN0JyAtLT5cblx0XHRcdFx0XHRcdDxidXR0b24gZGF0YS1iaW5kPVwiY2xpY2s6ICRjb21wb25lbnQuZ2V0TW9yZS5iaW5kKCRjb21wb25lbnQsICRpbmRleCgpKVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4taWNvbiBibHVlLXNoZXZyb24tcmlnaHQgcHVsbC1yaWdodFwiPjwvYnV0dG9uPlxuXHRcdFx0XHRcdDwhLS0gL2tvIC0tPlxuXHRcdFx0XHRcdFxuXHRcdFx0XHQ8L2xpPlxuXHRcdFx0PC91bD5cblx0XHQ8L3NlY3Rpb24+XG5gfSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL2FycmF5UGFuZWxCb2R5LmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDI3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9