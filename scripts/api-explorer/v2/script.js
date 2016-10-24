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
	var MenuViewModel = __webpack_require__(11);
	var ParamsViewModel = __webpack_require__(13);
	var MethodsViewModel = __webpack_require__(14);
	var RequestsListViewModel = __webpack_require__(15);
	// Components
	__webpack_require__(22);
	
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
		this.onError = ko.observable({});
	
		// computed
	  this.URL = ko.computed(this.getUrl, this);
	  this.sendButtonText = ko.pureComputed(this.getMethodName, this);
		this.sharePath = ko.pureComputed(formDeepLinkingUrl, this);
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
	  ajaxService(this.URL(), this.requests, this.onError, base);
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

	var hf = __webpack_require__(12);
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
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var self;
	var base;
	var hf = __webpack_require__(12);
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var hf = __webpack_require__(12);
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var jsonHighlight = __webpack_require__(16);
	var slider = __webpack_require__(19);
	var filter = __webpack_require__(20);
	var self;
	var colors = __webpack_require__(21).colors;
	
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Worker = __webpack_require__(17); // Json-formatter worker
	
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		return __webpack_require__(18)("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId])\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\texports: {},\n/******/ \t\t\tid: moduleId,\n/******/ \t\t\tloaded: false\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.loaded = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(0);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ function(module, exports, __webpack_require__) {\n\n\t/**\r\n\t * Code format web-worker\r\n\t * @param event\r\n\t */\r\n\t// var highlightJson()\r\n\tvar highlightJson = __webpack_require__(1);\r\n\t\r\n\tonmessage = function(event) {\r\n\t  var code = event.data;\r\n\t  // importScripts('json-parse.js');\r\n\t  var result = highlightJson(code, {expanded: true});\r\n\t  // var result =JSON.stringify(code);\r\n\t  postMessage(result);\r\n\t};\r\n\n\n/***/ },\n/* 1 */\n/***/ function(module, exports) {\n\n\tvar prefix = 'tm-code';\r\n\t\r\n\tvar getExpanderClasses = function (expanded) {\r\n\t\tif (!expanded) {\r\n\t\t\treturn 'expanded collapsed hidden';\r\n\t\t}\r\n\t\treturn 'expanded';\r\n\t};\r\n\t\r\n\tvar encode = function (value) {\r\n\t\treturn ['<span>', value, '</span>'].join('');\r\n\t};\r\n\t\r\n\tvar createElement = function (key, value, type, expanderClasses) {\r\n\t\tvar klass = 'object',\r\n\t\t\topen = '{',\r\n\t\t\tclose = '}';\r\n\t\r\n\t\tif (Array.isArray(value)) {\r\n\t\t\tklass = 'array';\r\n\t\t\topen = '[';\r\n\t\t\tclose = ']';\r\n\t\t}\r\n\t\r\n\t\tif (value === null) {\r\n\t\t\treturn [\r\n\t\t\t\t'<li>',\r\n\t\t\t\t\t'<span class=\"key\">\"', encode(key), '\": </span>',\r\n\t\t\t\t\t'<span class=\"null\">\"', encode(value), '\"</span>',\r\n\t\t\t\t'</li>'\r\n\t\t\t].join('');\r\n\t\t}\r\n\t\r\n\t\tif (type == 'object') {\r\n\t\t\treturn [\r\n\t\t\t\t'<li>',\r\n\t\t\t\t\t'<span class=\"', expanderClasses, '\"></span>',\r\n\t\t\t\t\t'<span class=\"key\">\"', encode(key), '\": </span> ',\r\n\t\t\t\t\t'<span class=\"open\">', open, '</span> ',\r\n\t\t\t\t\t'<ul class=\"', klass, '\">',\r\n\t\t\t\t\t\tjson2html(value, expanderClasses),\r\n\t\t\t\t\t'</ul>',\r\n\t\t\t\t\t'<span class=\"close\">', close, '</span>',\r\n\t\t\t\t'</li>'\r\n\t\t\t].join('');\r\n\t\t}\r\n\t\r\n\t\tif (type == 'number' || type == 'boolean') {\r\n\t\t\treturn [\r\n\t\t\t\t'<li>',\r\n\t\t\t\t\t'<span class=\"key\">\"', encode(key), '\": </span>',\r\n\t\t\t\t\t'<span class=\"', type, '\">', encode(value), '</span>',\r\n\t\t\t\t'</li>'\r\n\t\t\t].join('');\r\n\t\t}\r\n\t\treturn [\r\n\t\t\t'<li>',\r\n\t\t\t\t'<span class=\"key\">\"', encode(key), '\": </span>',\r\n\t\t\t\t'<span class=\"', type, '\">\"', encode(value), '\"</span>',\r\n\t\t\t'</li>'\r\n\t\t].join('');\r\n\t};\r\n\t\r\n\tvar json2html = function (json, expanderClasses) {\r\n\t\tvar html = '';\r\n\t\tfor (var key in json) {\r\n\t\t\tif (!json.hasOwnProperty(key)) {\r\n\t\t\t\tcontinue;\r\n\t\t\t}\r\n\t\r\n\t\t\thtml = [html, createElement(key, json[key], typeof json[key], expanderClasses)].join('');\r\n\t\t}\r\n\t\treturn html;\r\n\t};\r\n\t\r\n\tvar getJsonViewer = function (data, options) {\r\n\t\ttry {\r\n\t\t\treturn [\r\n\t\t\t\t'<ul class=\"', prefix, '-container\">',\r\n\t\t\t\t\tjson2html([JSON.parse(data)], getExpanderClasses(options.expanded)),\r\n\t\t\t\t'</ul>'\r\n\t\t\t].join('');\r\n\t\t} catch (e) {\r\n\t\t\treturn [\r\n\t\t\t\t'<div class=\"', prefix, '-error\" >', e.toString(), ' </div>'\r\n\t\t\t].join('');\r\n\t\t}\r\n\t};\r\n\t\r\n\tmodule.exports = function(data, opt) {\r\n\t\tvar json = '';\r\n\t\tvar options = opt || {expanded: true};\r\n\t\tif (typeof data == 'string') {\r\n\t\t\tjson = data;\r\n\t\t} else if (typeof data == 'object') {\r\n\t\t\tjson = JSON.stringify(data)\r\n\t\t}\r\n\t\treturn getJsonViewer(json, options);\r\n\t};\r\n\n\n/***/ }\n/******/ ]);\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDcxYjEwZDQ0Y2E3MjgwZTExNGEiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvaGlnaGxpZ2h0SnNvbi53b3JrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvanNvbi1wYXJzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUNBQW9DLGVBQWU7QUFDbkQ7QUFDQTtBQUNBOzs7Ozs7O0FDYkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBVztBQUNYLGFBQVk7O0FBRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaGlnaGxpZ2h0SnNvbi53b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDQ3MWIxMGQ0NGNhNzI4MGUxMTRhXG4gKiovIiwiLyoqXHJcbiAqIENvZGUgZm9ybWF0IHdlYi13b3JrZXJcclxuICogQHBhcmFtIGV2ZW50XHJcbiAqL1xyXG4vLyB2YXIgaGlnaGxpZ2h0SnNvbigpXHJcbnZhciBoaWdobGlnaHRKc29uID0gcmVxdWlyZSgnLi9qc29uLXBhcnNlJyk7XHJcblxyXG5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xyXG4gIHZhciBjb2RlID0gZXZlbnQuZGF0YTtcclxuICAvLyBpbXBvcnRTY3JpcHRzKCdqc29uLXBhcnNlLmpzJyk7XHJcbiAgdmFyIHJlc3VsdCA9IGhpZ2hsaWdodEpzb24oY29kZSwge2V4cGFuZGVkOiB0cnVlfSk7XHJcbiAgLy8gdmFyIHJlc3VsdCA9SlNPTi5zdHJpbmdpZnkoY29kZSk7XHJcbiAgcG9zdE1lc3NhZ2UocmVzdWx0KTtcclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2hpZ2hsaWdodEpzb24ud29ya2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHByZWZpeCA9ICd0bS1jb2RlJztcclxuXHJcbnZhciBnZXRFeHBhbmRlckNsYXNzZXMgPSBmdW5jdGlvbiAoZXhwYW5kZWQpIHtcclxuXHRpZiAoIWV4cGFuZGVkKSB7XHJcblx0XHRyZXR1cm4gJ2V4cGFuZGVkIGNvbGxhcHNlZCBoaWRkZW4nO1xyXG5cdH1cclxuXHRyZXR1cm4gJ2V4cGFuZGVkJztcclxufTtcclxuXHJcbnZhciBlbmNvZGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRyZXR1cm4gWyc8c3Bhbj4nLCB2YWx1ZSwgJzwvc3Bhbj4nXS5qb2luKCcnKTtcclxufTtcclxuXHJcbnZhciBjcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUsIHR5cGUsIGV4cGFuZGVyQ2xhc3Nlcykge1xyXG5cdHZhciBrbGFzcyA9ICdvYmplY3QnLFxyXG5cdFx0b3BlbiA9ICd7JyxcclxuXHRcdGNsb3NlID0gJ30nO1xyXG5cclxuXHRpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuXHRcdGtsYXNzID0gJ2FycmF5JztcclxuXHRcdG9wZW4gPSAnWyc7XHJcblx0XHRjbG9zZSA9ICddJztcclxuXHR9XHJcblxyXG5cdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG5cdFx0cmV0dXJuIFtcclxuXHRcdFx0JzxsaT4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cImtleVwiPlwiJywgZW5jb2RlKGtleSksICdcIjogPC9zcGFuPicsXHJcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwibnVsbFwiPlwiJywgZW5jb2RlKHZhbHVlKSwgJ1wiPC9zcGFuPicsXHJcblx0XHRcdCc8L2xpPidcclxuXHRcdF0uam9pbignJyk7XHJcblx0fVxyXG5cclxuXHRpZiAodHlwZSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0cmV0dXJuIFtcclxuXHRcdFx0JzxsaT4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cIicsIGV4cGFuZGVyQ2xhc3NlcywgJ1wiPjwvc3Bhbj4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cImtleVwiPlwiJywgZW5jb2RlKGtleSksICdcIjogPC9zcGFuPiAnLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cIm9wZW5cIj4nLCBvcGVuLCAnPC9zcGFuPiAnLFxyXG5cdFx0XHRcdCc8dWwgY2xhc3M9XCInLCBrbGFzcywgJ1wiPicsXHJcblx0XHRcdFx0XHRqc29uMmh0bWwodmFsdWUsIGV4cGFuZGVyQ2xhc3NlcyksXHJcblx0XHRcdFx0JzwvdWw+JyxcclxuXHRcdFx0XHQnPHNwYW4gY2xhc3M9XCJjbG9zZVwiPicsIGNsb3NlLCAnPC9zcGFuPicsXHJcblx0XHRcdCc8L2xpPidcclxuXHRcdF0uam9pbignJyk7XHJcblx0fVxyXG5cclxuXHRpZiAodHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdib29sZWFuJykge1xyXG5cdFx0cmV0dXJuIFtcclxuXHRcdFx0JzxsaT4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cImtleVwiPlwiJywgZW5jb2RlKGtleSksICdcIjogPC9zcGFuPicsXHJcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwiJywgdHlwZSwgJ1wiPicsIGVuY29kZSh2YWx1ZSksICc8L3NwYW4+JyxcclxuXHRcdFx0JzwvbGk+J1xyXG5cdFx0XS5qb2luKCcnKTtcclxuXHR9XHJcblx0cmV0dXJuIFtcclxuXHRcdCc8bGk+JyxcclxuXHRcdFx0JzxzcGFuIGNsYXNzPVwia2V5XCI+XCInLCBlbmNvZGUoa2V5KSwgJ1wiOiA8L3NwYW4+JyxcclxuXHRcdFx0JzxzcGFuIGNsYXNzPVwiJywgdHlwZSwgJ1wiPlwiJywgZW5jb2RlKHZhbHVlKSwgJ1wiPC9zcGFuPicsXHJcblx0XHQnPC9saT4nXHJcblx0XS5qb2luKCcnKTtcclxufTtcclxuXHJcbnZhciBqc29uMmh0bWwgPSBmdW5jdGlvbiAoanNvbiwgZXhwYW5kZXJDbGFzc2VzKSB7XHJcblx0dmFyIGh0bWwgPSAnJztcclxuXHRmb3IgKHZhciBrZXkgaW4ganNvbikge1xyXG5cdFx0aWYgKCFqc29uLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuXHRcdFx0Y29udGludWU7XHJcblx0XHR9XHJcblxyXG5cdFx0aHRtbCA9IFtodG1sLCBjcmVhdGVFbGVtZW50KGtleSwganNvbltrZXldLCB0eXBlb2YganNvbltrZXldLCBleHBhbmRlckNsYXNzZXMpXS5qb2luKCcnKTtcclxuXHR9XHJcblx0cmV0dXJuIGh0bWw7XHJcbn07XHJcblxyXG52YXIgZ2V0SnNvblZpZXdlciA9IGZ1bmN0aW9uIChkYXRhLCBvcHRpb25zKSB7XHJcblx0dHJ5IHtcclxuXHRcdHJldHVybiBbXHJcblx0XHRcdCc8dWwgY2xhc3M9XCInLCBwcmVmaXgsICctY29udGFpbmVyXCI+JyxcclxuXHRcdFx0XHRqc29uMmh0bWwoW0pTT04ucGFyc2UoZGF0YSldLCBnZXRFeHBhbmRlckNsYXNzZXMob3B0aW9ucy5leHBhbmRlZCkpLFxyXG5cdFx0XHQnPC91bD4nXHJcblx0XHRdLmpvaW4oJycpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJldHVybiBbXHJcblx0XHRcdCc8ZGl2IGNsYXNzPVwiJywgcHJlZml4LCAnLWVycm9yXCIgPicsIGUudG9TdHJpbmcoKSwgJyA8L2Rpdj4nXHJcblx0XHRdLmpvaW4oJycpO1xyXG5cdH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSwgb3B0KSB7XHJcblx0dmFyIGpzb24gPSAnJztcclxuXHR2YXIgb3B0aW9ucyA9IG9wdCB8fCB7ZXhwYW5kZWQ6IHRydWV9O1xyXG5cdGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykge1xyXG5cdFx0anNvbiA9IGRhdGE7XHJcblx0fSBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0anNvbiA9IEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcblx0fVxyXG5cdHJldHVybiBnZXRKc29uVmlld2VyKGpzb24sIG9wdGlvbnMpO1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvanNvbi1wYXJzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=", __webpack_require__.p + "highlightJson.worker.js");
	};

/***/ },
/* 18 */
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
/* 19 */
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
/* 20 */
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
					"collapsed": true,
					"index": 0
				}
			},
			"page": {
				"_CONFIG": {
					"index": 1,
					"collapsed": false
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
/* 21 */
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (function () {
		__webpack_require__(23);
		__webpack_require__(24);
		__webpack_require__(25);
		__webpack_require__(26);
		__webpack_require__(27);
		__webpack_require__(28);
		__webpack_require__(29);
		__webpack_require__(30);
	}());


/***/ },
/* 23 */
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
/* 24 */
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
/* 25 */
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
/* 26 */
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
/* 27 */
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var self;
	var getRandomColor = __webpack_require__(21).getRandomColor;
	
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
/* 29 */
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
	
	module.exports = ko.components.register('object-panel-body', {
		viewModel:  ObjectPanelBody,
		template:`
			<section data-bind="css: {'all-inside': $component._allInside}" class="panel-body object-panel-body">
				<!-- ko if: $component._panelName === 'object' && !!Object.getProp(ko.unwrap(data), '.ratio')-->
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
								<button data-bind="click: $component.getMore.bind($component, key, value)" type="button" class="btn btn-icon blue-shevron-right pull-right"></button>
							<!-- /ko -->
					</li>
				</ul>
			</section>
	`});


/***/ },
/* 30 */
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
			<section class="panel-body no-padding array-panel-body">
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzBkMTdlMTcwMGE3NTZmY2YzNDciLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL3ZlbmRvcnMvY2xhbXAubWluLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jdXN0b21CaW5kaW5ncy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY3VzdG9tQmluZGluZ3MvYmxvY2tFbGxpcHNpcy5iaW5kaW5nLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jdXN0b21CaW5kaW5ncy9mb3JlYWNoUHJvcC5iaW5kaW5nLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jdXN0b21CaW5kaW5ncy9wb3BvdmVyLmJpbmRpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9hcGlrZXkuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvYWpheFNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvY29uZmlnU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvVmlld01vZGVscy9tZW51Vmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2hlbHBlckZ1bmMuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvcGFyYW1zVmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9WaWV3TW9kZWxzL21ldGhvZHNWaWV3TW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvcmVxdWVzdHNMaXN0Vmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2pzb24taGlnaGxpZ2h0LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2hpZ2hsaWdodEpzb24ud29ya2VyLmpzIiwid2VicGFjazovLy8uL34vd29ya2VyLWxvYWRlci9jcmVhdGVJbmxpbmVXb3JrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvc2xpZGVyLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbmZpZy5qc29uIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2NvbG9yQ2xhc3Nlcy5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9jdXN0b21TZWxlY3QuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BvcHVwcy9lcnJvci5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL3BhbmVsR3JvdXAuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYW5lbC5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL3BhZ2luYXRpb24uY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYW5lbEhlYWRpbmcuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9vYmplY3RQYW5lbEJvZHkuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9hcnJheVBhbmVsQm9keS5jb21wb25lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3RDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBZ0M7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQzFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBcUI7QUFDckIsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFvRCxzQ0FBc0M7QUFDMUY7O0FBRUE7QUFDQSwwQkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBLHVDQUFzQywyQkFBMkI7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pC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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNEIsb0NBQW9DO0FBQ2hFO0FBQ0EsNEJBQTJCLGdHQUFnRztBQUMzSDs7QUFFQSxpQ0FBZ0MsNkRBQTZEO0FBQzdGLDBCQUF5Qiw0RUFBNEU7O0FBRXJHO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdEQUF1RCxvREFBb0QsU0FBUyxtQkFBbUI7QUFDdkk7QUFDQTs7QUFFQTtBQUNBLGtDQUFpQyxvRUFBb0UsUUFBUSxpQkFBaUIsU0FBUyw0RUFBNEUsWUFBWSxxQ0FBcUM7QUFDcFE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7Ozs7OztBQ3BHRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE2QixnQ0FBZ0M7QUFDN0Q7O0FBRUE7QUFDQTtBQUNBLHVFQUFzRSxTQUFTO0FBQy9FOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUUiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA3MGQxN2UxNzAwYTc1NmZjZjM0N1xuICoqLyIsInZhciBjbGFtcCA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL3ZlbmRvcnMvY2xhbXAubWluJyk7XG5cbi8qKlxuICogTWFpbiBmaWxlIGZvciBBcGkgRXhwbHJlciB2Mi4wXG4gKiBGb3IgZGV2ZWxvcG1lbnQgcGxlYXNlIHVzZSBXZWJwYWNrIHRvIGJ1bmRsZSBhbGwgbW9kdWxlc1xuICogSXQgY2FuIGJlIG1hZGUgdXNpbmcgbnBtIHNjcmlwdHMgY21kIC0gJ3dlYnBhY2snXG4gKi9cbi8vIGN1c3RvbSBiaW5kaW5nc1xucmVxdWlyZSgnLi4vY3VzdG9tQmluZGluZ3MvaW5kZXgnKTtcblxuLy8gTW9kdWxlc1xudmFyIGJhc2UgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2Jhc2UnKTtcbnZhciBhcGlLZXkgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2FwaWtleScpO1xudmFyIGFqYXhTZXJ2aWNlID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9hamF4U2VydmljZScpO1xuXG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb25maWdTZXJ2aWNlJyk7XG4vLyBWaWV3IE1vZGVsc1xudmFyIE1lbnVWaWV3TW9kZWwgPSByZXF1aXJlKCcuL21lbnVWaWV3TW9kZWwnKTtcbnZhciBQYXJhbXNWaWV3TW9kZWwgPSByZXF1aXJlKCcuL3BhcmFtc1ZpZXdNb2RlbCcpO1xudmFyIE1ldGhvZHNWaWV3TW9kZWwgPSByZXF1aXJlKCcuL21ldGhvZHNWaWV3TW9kZWwnKTtcbnZhciBSZXF1ZXN0c0xpc3RWaWV3TW9kZWwgPSByZXF1aXJlKCcuL3JlcXVlc3RzTGlzdFZpZXdNb2RlbCcpO1xuLy8gQ29tcG9uZW50c1xucmVxdWlyZSgnLi4vY29tcG9uZW50cy9pbmRleCcpO1xuXG4vKipcbiAqIE1haW4gYXBwbGljYXRpb24gdmlldy1tb2RlbFxuICogQHBhcmFtIG9iaiB7b2JqZWN0fSBnbG9iYWwgZGF0YSBvYmplY3RcbiAqL1xuZnVuY3Rpb24gQXBwVmlld01vZGVsKG9iaikge1xuICBzZWxmID0gdGhpcztcbiAgdmFyIGJhc2UgPSBvYmogfHwge307XG5cdHZhciBwYXJzZWRVcmwgPSBwYXJzZVVybCgpO1xuICB0aGlzLmFwaUtleSA9IGFwaUtleTtcblx0dGhpcy5jb25maWcgPSBjb25maWc7XG5cbiAgLy8gb2JzZXJ2YWJsZXNcbiAgdGhpcy5zZWxlY3RlZENhdGVnb3J5ID0ga28ub2JzZXJ2YWJsZShwYXJzZWRVcmwuYXBpQ2F0ZWdvcnkgfHwgJycpO1xuICB0aGlzLnNlbGVjdGVkTWV0aG9kID0ga28ub2JzZXJ2YWJsZShwYXJzZWRVcmwubWV0aG9kSWQgfHwgJycpO1xuICB0aGlzLnNlbGVjdGVkUGFyYW1zID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcblx0dGhpcy5yZXF1ZXN0cyA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XG5cdHRoaXMub25FcnJvciA9IGtvLm9ic2VydmFibGUoe30pO1xuXG5cdC8vIGNvbXB1dGVkXG4gIHRoaXMuVVJMID0ga28uY29tcHV0ZWQodGhpcy5nZXRVcmwsIHRoaXMpO1xuICB0aGlzLnNlbmRCdXR0b25UZXh0ID0ga28ucHVyZUNvbXB1dGVkKHRoaXMuZ2V0TWV0aG9kTmFtZSwgdGhpcyk7XG5cdHRoaXMuc2hhcmVQYXRoID0ga28ucHVyZUNvbXB1dGVkKGZvcm1EZWVwTGlua2luZ1VybCwgdGhpcyk7XG4gIC8vIHN1Yi1tb2RlbHNcbiAgdGhpcy5tZW51ID0gbmV3IE1lbnVWaWV3TW9kZWwoYmFzZSwgdGhpcy5zZWxlY3RlZENhdGVnb3J5KTtcbiAgdGhpcy5tZXRob2RzID0gbmV3IE1ldGhvZHNWaWV3TW9kZWwoYmFzZSwgdGhpcy5zZWxlY3RlZENhdGVnb3J5LCB0aGlzLnNlbGVjdGVkTWV0aG9kKTtcbiAgdGhpcy5wYXJhbXMgPSBuZXcgUGFyYW1zVmlld01vZGVsKGJhc2UsIHRoaXMuc2VsZWN0ZWRNZXRob2QsIHRoaXMuc2VsZWN0ZWRQYXJhbXMpO1xuICB0aGlzLnJlcXVlc3RzTGlzdCA9IG5ldyBSZXF1ZXN0c0xpc3RWaWV3TW9kZWwodGhpcy5yZXF1ZXN0cywgdGhpcy5zZWxlY3RlZFBhcmFtcywgdGhpcy5zaGFyZVBhdGgpO1xufVxuXG4vKipcbiAqIFNlbmQgcmVxdWVzdCBtZXRob2RcbiAqL1xuQXBwVmlld01vZGVsLnByb3RvdHlwZS5vbkNsaWNrU2VuZEJ0biA9IGZ1bmN0aW9uICgpIHtcbiAgYWpheFNlcnZpY2UodGhpcy5VUkwoKSwgdGhpcy5yZXF1ZXN0cywgdGhpcy5vbkVycm9yLCBiYXNlKTtcbn07XG5cbi8qKlxuICogR2V0cyBjdXJyZW50IG1ldGhvZCBuYW1lXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5BcHBWaWV3TW9kZWwucHJvdG90eXBlLmdldE1ldGhvZE5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnNlbGVjdGVkTWV0aG9kKCkubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG59O1xuXG4vKipcbiAqIEdldHMgcmF3IHVybCBkYXRhIGFycmF5XG4gKiBAcmV0dXJucyB7KltdfVxuICovXG5BcHBWaWV3TW9kZWwucHJvdG90eXBlLmdldFVybCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIFtcbiAgICB0aGlzLnNlbGVjdGVkTWV0aG9kKCksXG4gICAgdGhpcy5hcGlLZXksXG4gICAgdGhpcy5zZWxlY3RlZFBhcmFtcygpXG4gIF07XG59O1xuXG4vKipcbiAqIEdldHMgZGVlcCBwcm9wXG4gKiBAcmV0dXJucyB7KltdfVxuICovXG5PYmplY3QuZ2V0UHJvcCA9IGZ1bmN0aW9uKG8sIHMpIHtcblx0aWYgKCh0eXBlb2YgbyAhPT0gJ29iamVjdCcgfHwgbyA9PSBudWxsKSAmJiAhcykge3JldHVybjt9XG5cdHMgPSBzLnJlcGxhY2UoL1xcWyhcXHcrKVxcXS9nLCAnLiQxJyk7IC8vIGNvbnZlcnQgaW5kZXhlcyB0byBwcm9wZXJ0aWVzXG5cdHMgPSBzLnJlcGxhY2UoL15cXC4vLCAnJyk7ICAgICAgICAgICAvLyBzdHJpcCBhIGxlYWRpbmcgZG90XG5cdHZhciBhID0gcy5zcGxpdCgnLicpO1xuXHRmb3IgKHZhciBpID0gMCwgbiA9IGEubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG5cdFx0dmFyIGsgPSBhW2ldO1xuXHRcdGlmIChvICYmIGsgaW4gbykge1xuXHRcdFx0byA9IG9ba107XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIG87XG59O1xuXG4vKipcbiAqIEFjdGl2YXRlcyBrbm9ja291dC5qc1xuICovXG5rby5hcHBseUJpbmRpbmdzKG5ldyBBcHBWaWV3TW9kZWwoYmFzZSkpO1xuLyoqXG4gKiBleHBvcnRzIGdsb2JhbCB2YXJpYWJsZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2U7XG5cbmZ1bmN0aW9uIGZvcm1EZWVwTGlua2luZ1VybCgpIHtcblx0dmFyIGxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uO1xuXHR2YXIgY2F0ZWdvcnkgPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHNlbGYuc2VsZWN0ZWRDYXRlZ29yeSk7XG5cdHZhciBtZXRob2QgPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHNlbGYuc2VsZWN0ZWRNZXRob2QpO1xuXHR2YXIgcGFyYW1zID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShzZWxmLnNlbGVjdGVkUGFyYW1zKTtcblxuXHR2YXIgcXVlcnlzID0gW1xuXHRcdCdhcGlDYXRlZ29yeT0nICsgZW5jb2RlVVJJKGNhdGVnb3J5KSxcblx0XHQnbWV0aG9kSWQ9JysgZW5jb2RlVVJJKG1ldGhvZC5pZClcblx0XTtcblxuXHRwYXJhbXMubWFwKGZ1bmN0aW9uIChwYXJhbSkge1xuXHRcdHZhciB2YWx1ZSA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUocGFyYW0udmFsdWUpO1xuXHRcdHZhciBkZWZhdWx0VmFsdWUgPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHBhcmFtLmRlZmF1bHQpO1xuXHRcdHF1ZXJ5cy5wdXNoKFtcblx0XHRcdHBhcmFtLm5hbWUsXG5cdFx0XHQnPScsXG5cdFx0XHR2YWx1ZSAhPT0gJycgPyB2YWx1ZSA6IGRlZmF1bHRWYWx1ZSAvL3RvZG86IHJlbW92ZSBkZWZhdWx0IGZyb20gaGVyZSB3aGVuIHNldCB1cCBpdCBpbiBzb3VyY2UgbGlrZSB2YWx1ZSBieSBkZWZhdWx0XG5cdFx0XS5qb2luKCcnKSk7XG5cdFx0cmV0dXJuIHBhcmFtO1xuXHR9KTtcblxuXHRyZXR1cm4gW1xuXHRcdGxvY2F0aW9uLm9yaWdpbixcblx0XHRsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC8kL2dtaSwgJycpLFxuXHRcdCc/Jyxcblx0XHRxdWVyeXMuam9pbignJicpXG5cdF0uam9pbignJyk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVXJsKCkge1xuXHR2YXIgbG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuXHRpZiAobG9jYXRpb24pIHtcblx0XHR2YXIgcXVlcnlzID0gbG9jYXRpb24ucmVwbGFjZSgvXlxcPy9nLCAnJykuc3BsaXQoJyYnKTtcblx0XHR2YXIgb2JqID0ge1xuXHRcdFx0YXBpQ2F0ZWdvcnk6ICcnLFxuXHRcdFx0bWV0aG9kSWQ6ICcnLFxuXHRcdFx0c2VsZWN0ZWRQYXJhbXM6IFtdXG5cdFx0fTtcblxuXHRcdHF1ZXJ5cy5tYXAoZnVuY3Rpb24gKGUpIHtcblx0XHRcdHZhciBhID0gZGVjb2RlVVJJKGUpLnNwbGl0KCc9Jyk7XG5cdFx0XHR2YXIga2V5ID0gYVswXTtcblx0XHRcdHZhciB2YWwgPSBhWzFdO1xuXG5cdFx0XHRpZiAoa2V5ID09PSAnYXBpQ2F0ZWdvcnknIHx8IGtleSA9PT0gJ21ldGhvZElkJykge1xuXHRcdFx0XHRvYmpba2V5XSA9IHZhbDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG9iai5zZWxlY3RlZFBhcmFtcy5wdXNoKHtcblx0XHRcdFx0XHRuYW1lOiBrZXksXG5cdFx0XHRcdFx0dmFsdWU6IHZhbFxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBvYmo7XG5cdH1cblx0cmV0dXJuIHt9O1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9WaWV3TW9kZWxzL21haW4uanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiFcclxuKiBDbGFtcC5qcyAwLjUuMVxyXG4qXHJcbiogQ29weXJpZ2h0IDIwMTEtMjAxMywgSm9zZXBoIFNjaG1pdHQgaHR0cDovL2pvZS5zaFxyXG4qIFJlbGVhc2VkIHVuZGVyIHRoZSBXVEZQTCBsaWNlbnNlXHJcbiogaHR0cDovL3NhbS56b3kub3JnL3d0ZnBsL1xyXG4qL1xyXG4oZnVuY3Rpb24oKXt3aW5kb3cuJGNsYW1wPWZ1bmN0aW9uKGMsZCl7ZnVuY3Rpb24gcyhhLGIpe24uZ2V0Q29tcHV0ZWRTdHlsZXx8KG4uZ2V0Q29tcHV0ZWRTdHlsZT1mdW5jdGlvbihhLGIpe3RoaXMuZWw9YTt0aGlzLmdldFByb3BlcnR5VmFsdWU9ZnVuY3Rpb24oYil7dmFyIGM9LyhcXC0oW2Etel0pezF9KS9nO1wiZmxvYXRcIj09YiYmKGI9XCJzdHlsZUZsb2F0XCIpO2MudGVzdChiKSYmKGI9Yi5yZXBsYWNlKGMsZnVuY3Rpb24oYSxiLGMpe3JldHVybiBjLnRvVXBwZXJDYXNlKCl9KSk7cmV0dXJuIGEuY3VycmVudFN0eWxlJiZhLmN1cnJlbnRTdHlsZVtiXT9hLmN1cnJlbnRTdHlsZVtiXTpudWxsfTtyZXR1cm4gdGhpc30pO3JldHVybiBuLmdldENvbXB1dGVkU3R5bGUoYSxudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKGIpfWZ1bmN0aW9uIHQoYSl7YT1hfHxjLmNsaWVudEhlaWdodDt2YXIgYj11KGMpO3JldHVybiBNYXRoLm1heChNYXRoLmZsb29yKGEvYiksMCl9ZnVuY3Rpb24geChhKXtyZXR1cm4gdShjKSpcclxuYX1mdW5jdGlvbiB1KGEpe3ZhciBiPXMoYSxcImxpbmUtaGVpZ2h0XCIpO1wibm9ybWFsXCI9PWImJihiPTEuMipwYXJzZUludChzKGEsXCJmb250LXNpemVcIikpKTtyZXR1cm4gcGFyc2VJbnQoYil9ZnVuY3Rpb24gbChhKXtpZihhLmxhc3RDaGlsZC5jaGlsZHJlbiYmMDxhLmxhc3RDaGlsZC5jaGlsZHJlbi5sZW5ndGgpcmV0dXJuIGwoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYS5jaGlsZHJlbikucG9wKCkpO2lmKGEubGFzdENoaWxkJiZhLmxhc3RDaGlsZC5ub2RlVmFsdWUmJlwiXCIhPWEubGFzdENoaWxkLm5vZGVWYWx1ZSYmYS5sYXN0Q2hpbGQubm9kZVZhbHVlIT1iLnRydW5jYXRpb25DaGFyKXJldHVybiBhLmxhc3RDaGlsZDthLmxhc3RDaGlsZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGEubGFzdENoaWxkKTtyZXR1cm4gbChjKX1mdW5jdGlvbiBwKGEsZCl7aWYoZCl7dmFyIGU9YS5ub2RlVmFsdWUucmVwbGFjZShiLnRydW5jYXRpb25DaGFyLFwiXCIpO2Z8fChoPTA8ay5sZW5ndGg/XHJcbmsuc2hpZnQoKTpcIlwiLGY9ZS5zcGxpdChoKSk7MTxmLmxlbmd0aD8ocT1mLnBvcCgpLHIoYSxmLmpvaW4oaCkpKTpmPW51bGw7bSYmKGEubm9kZVZhbHVlPWEubm9kZVZhbHVlLnJlcGxhY2UoYi50cnVuY2F0aW9uQ2hhcixcIlwiKSxjLmlubmVySFRNTD1hLm5vZGVWYWx1ZStcIiBcIittLmlubmVySFRNTCtiLnRydW5jYXRpb25DaGFyKTtpZihmKXtpZihjLmNsaWVudEhlaWdodDw9ZClpZigwPD1rLmxlbmd0aCYmXCJcIiE9aClyKGEsZi5qb2luKGgpK2grcSksZj1udWxsO2Vsc2UgcmV0dXJuIGMuaW5uZXJIVE1MfWVsc2VcIlwiPT1oJiYocihhLFwiXCIpLGE9bChjKSxrPWIuc3BsaXRPbkNoYXJzLnNsaWNlKDApLGg9a1swXSxxPWY9bnVsbCk7aWYoYi5hbmltYXRlKXNldFRpbWVvdXQoZnVuY3Rpb24oKXtwKGEsZCl9LCEwPT09Yi5hbmltYXRlPzEwOmIuYW5pbWF0ZSk7ZWxzZSByZXR1cm4gcChhLGQpfX1mdW5jdGlvbiByKGEsYyl7YS5ub2RlVmFsdWU9YytiLnRydW5jYXRpb25DaGFyfWQ9ZHx8e307XHJcbnZhciBuPXdpbmRvdyxiPXtjbGFtcDpkLmNsYW1wfHwyLHVzZU5hdGl2ZUNsYW1wOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBkLnVzZU5hdGl2ZUNsYW1wP2QudXNlTmF0aXZlQ2xhbXA6ITAsc3BsaXRPbkNoYXJzOmQuc3BsaXRPbkNoYXJzfHxbXCIuXCIsXCItXCIsXCJcXHUyMDEzXCIsXCJcXHUyMDE0XCIsXCIgXCJdLGFuaW1hdGU6ZC5hbmltYXRlfHwhMSx0cnVuY2F0aW9uQ2hhcjpkLnRydW5jYXRpb25DaGFyfHxcIlxcdTIwMjZcIix0cnVuY2F0aW9uSFRNTDpkLnRydW5jYXRpb25IVE1MfSxlPWMuc3R5bGUseT1jLmlubmVySFRNTCx6PVwidW5kZWZpbmVkXCIhPXR5cGVvZiBjLnN0eWxlLndlYmtpdExpbmVDbGFtcCxnPWIuY2xhbXAsdj1nLmluZGV4T2YmJigtMTxnLmluZGV4T2YoXCJweFwiKXx8LTE8Zy5pbmRleE9mKFwiZW1cIikpLG07Yi50cnVuY2F0aW9uSFRNTCYmKG09ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIiksbS5pbm5lckhUTUw9Yi50cnVuY2F0aW9uSFRNTCk7dmFyIGs9Yi5zcGxpdE9uQ2hhcnMuc2xpY2UoMCksXHJcbmg9a1swXSxmLHE7XCJhdXRvXCI9PWc/Zz10KCk6diYmKGc9dChwYXJzZUludChnKSkpO3ZhciB3O3omJmIudXNlTmF0aXZlQ2xhbXA/KGUub3ZlcmZsb3c9XCJoaWRkZW5cIixlLnRleHRPdmVyZmxvdz1cImVsbGlwc2lzXCIsZS53ZWJraXRCb3hPcmllbnQ9XCJ2ZXJ0aWNhbFwiLGUuZGlzcGxheT1cIi13ZWJraXQtYm94XCIsZS53ZWJraXRMaW5lQ2xhbXA9Zyx2JiYoZS5oZWlnaHQ9Yi5jbGFtcCtcInB4XCIpKTooZT14KGcpLGU8PWMuY2xpZW50SGVpZ2h0JiYodz1wKGwoYyksZSkpKTtyZXR1cm57b3JpZ2luYWw6eSxjbGFtcGVkOnd9fX0pKCk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvdmVuZG9ycy9jbGFtcC5taW4uanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XHJcblx0cmVxdWlyZSgnLi9ibG9ja0VsbGlwc2lzLmJpbmRpbmcnKTtcclxuXHRyZXF1aXJlKCcuL2ZvcmVhY2hQcm9wLmJpbmRpbmcnKTtcclxuXHRyZXF1aXJlKCcuL3BvcG92ZXIuYmluZGluZycpO1xyXG59KCkpO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2N1c3RvbUJpbmRpbmdzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwia28uYmluZGluZ0hhbmRsZXJzLmJsb2NrRWxsaXBzaXMgPSB7XHJcblx0aW5pdDogZnVuY3Rpb24oZWxlbWVudCwgdmFsdWVBY2Nlc3NvciwgYWxsQmluZGluZ3MsIHZpZXdNb2RlbCwgYmluZGluZ0NvbnRleHQpIHtcclxuXHRcdCRjbGFtcChlbGVtZW50LCB2YWx1ZUFjY2Vzc29yKCkpO1xyXG5cdH1cclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jdXN0b21CaW5kaW5ncy9ibG9ja0VsbGlwc2lzLmJpbmRpbmcuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIgbW9kdWxlLmV4cG9ydHMgPSBrby5iaW5kaW5nSGFuZGxlcnMuZm9yZWFjaHByb3AgPSB7XHJcblxyXG5cdHRyYW5zZm9ybU9iamVjdDogZnVuY3Rpb24gKHBhcmFtcykge1xyXG5cdFx0dmFyIHByb3BlcnRpZXMgPSBbXTtcclxuXHRcdHZhciBvYmosIHNvcnRGbiA9IHBhcmFtcy5zb3J0Rm47XHJcblxyXG5cdFx0b2JqID0gc29ydEZuID8gcGFyYW1zLmRhdGE6IHBhcmFtcztcclxuXHRcdG9iaiA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUob2JqKTtcclxuXHJcblx0XHRrby51dGlscy5vYmplY3RGb3JFYWNoKG9iaiwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuXHRcdFx0cHJvcGVydGllcy5wdXNoKHtcclxuXHRcdFx0XHRrZXk6IGtleSxcclxuXHRcdFx0XHR2YWx1ZTogdmFsdWVcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoc29ydEZuKSB7XHJcblx0XHRcdHByb3BlcnRpZXMuc29ydChzb3J0Rm4pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwcm9wZXJ0aWVzO1xyXG5cdH0sXHJcblx0aW5pdDogZnVuY3Rpb24oZWxlbWVudCwgdmFsdWVBY2Nlc3NvciwgYWxsQmluZGluZ3NBY2Nlc3Nvciwgdmlld01vZGVsLCBiaW5kaW5nQ29udGV4dCkge1xyXG5cdFx0dmFyIHByb3BlcnRpZXMgPSBrby5wdXJlQ29tcHV0ZWQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgb2JqID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZSh2YWx1ZUFjY2Vzc29yKCkpO1xyXG5cdFx0XHRyZXR1cm4ga28uYmluZGluZ0hhbmRsZXJzLmZvcmVhY2hwcm9wLnRyYW5zZm9ybU9iamVjdChvYmopO1xyXG5cdFx0fSk7XHJcblx0XHRrby5hcHBseUJpbmRpbmdzVG9Ob2RlKGVsZW1lbnQsIHtcclxuXHRcdFx0Zm9yZWFjaDogcHJvcGVydGllc1xyXG5cdFx0fSwgYmluZGluZ0NvbnRleHQpO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Y29udHJvbHNEZXNjZW5kYW50QmluZGluZ3M6IHRydWVcclxuXHRcdH07XHJcblx0fVxyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2N1c3RvbUJpbmRpbmdzL2ZvcmVhY2hQcm9wLmJpbmRpbmcuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgY29tbW9uID0ge1xuXHRjb250YWluZXI6ICdib2R5Jyxcblx0dHJpZ2dlcjogJ2hvdmVyJyxcblx0cGxhY2VtZW50OiAnYm90dG9tJ1xufTtcblxua28uYmluZGluZ0hhbmRsZXJzLnBvcG92ZXIgPSB7XG5cdHVwZGF0ZTogZnVuY3Rpb24oZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xuXHRcdHZhciAkZWxlbWVudCA9ICQoZWxlbWVudCk7XG5cdFx0dmFyIHBhcmFtcyA9IHZhbHVlQWNjZXNzb3IoKTtcblx0XHR2YXIgY29uZmlnID0gJC5leHRlbmQoe30sIGNvbW1vbiwgcGFyYW1zLCB7ZGF0YTogbnVsbH0pO1xuXG5cdFx0aWYgKHBhcmFtcy50eXBlID09PSAncG9wb3ZlcicgJiYgcGFyYW1zLmRhdGEpIHtcblx0XHRcdHZhciBkYXRhID0ga28udW53cmFwKHBhcmFtcy5kYXRhKTtcblx0XHRcdGNvbmZpZy50aXRsZSA9IGBFcnJvciAke2RhdGFbMF19OiAke2RhdGFbMV19YDtcblx0XHRcdGNvbmZpZy5jb250ZW50ID0gZGF0YVsyXTtcblx0XHRcdCRlbGVtZW50LnBvcG92ZXIoY29uZmlnKTtcblx0XHRcdGlmIChjb25maWcudHJpZ2dlciA9PT0gJ2NsaWNrJykge1xuXHRcdFx0XHR2YXIgdGltZXI7XG5cdFx0XHRcdCRlbGVtZW50Lm9uKCdzaG93bi5icy5wb3BvdmVyJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHQkZWxlbWVudC50cmlnZ2VyKCdjbGljaycpO1xuXHRcdFx0XHRcdH0sIDIwMDApO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0JGVsZW1lbnQub24oJ2hpZGUuYnMucG9wb3ZlcicsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRjbGVhckludGVydmFsKHRpbWVyKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbmZpZy5kZWxheSA9IHtcblx0XHRcdFx0XCJzaG93XCI6IDE1MDAsXG5cdFx0XHRcdFwiaGlkZVwiOiAxMDBcblx0XHRcdH07XG5cdFx0XHRjb25maWcudGl0bGUgPSBwYXJhbXMudGl0bGUgfHwgY29uZmlnLnRpdGxlO1xuXHRcdFx0JGVsZW1lbnQudG9vbHRpcChjb25maWcpO1xuXHRcdH1cblx0fVxufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY3VzdG9tQmluZGluZ3MvcG9wb3Zlci5iaW5kaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGJhc2UgPSB7fTtcbnZhciBDT05GSUdfVVJMID0gJy4uLy4uL2FwaWRlc2NyaXB0aW9uLnhtbCc7XG5cbnZhciBwYXJzZURhdGEgPSBmdW5jdGlvbiAoeG1sKSB7XG5cdHZhciBnbG9iYWwgPSB7fTtcblx0Ly9nZXQgYWxsIEFQSXNcblx0dmFyIHJlc291cmNlc0VsID0gJCh4bWwpLmZpbmQoXCJyZXNvdXJjZXNcIikuZXEoMCk7XG5cblx0Ly8gcmVzb3VyY2Vcblx0JCh4bWwpXG5cdFx0LmZpbmQoXCJyZXNvdXJjZVwiKVxuXHRcdC5nZXQoKVxuXHRcdC5tYXAoZnVuY3Rpb24gKHJlcykge1xuXHRcdFx0dmFyIHJlc291cmNlID0gJChyZXMpO1xuXHRcdFx0Ly8gbWV0aG9kIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHR2YXIgbWV0aG9kRWxlbSA9IHJlc291cmNlLmZpbmQoXCJtZXRob2RcIikuZXEoMCk7XG5cblx0XHRcdHZhciBtZXRob2QgPSB7XG5cdFx0XHRcdGlkIDogbWV0aG9kRWxlbS5hdHRyKFwiaWRcIiksIC8vIG1ldGhvZCBpZFxuXHRcdFx0XHRuYW1lIDogbWV0aG9kRWxlbS5hdHRyKFwiYXBpZ2VlOmRpc3BsYXlOYW1lXCIpIHx8IG1ldGhvZEVsZW0uYXR0cihcImlkXCIpLCAvLyBtZXRob2QgbmFtZVxuXHRcdFx0XHRtZXRob2QgOiBtZXRob2RFbGVtLmF0dHIoJ25hbWUnKSwgLy8gR0VUIG9yIFBPU1Rcblx0XHRcdFx0Y2F0ZWdvcnkgOiBtZXRob2RFbGVtLmZpbmQoJ1twcmltYXJ5PVwidHJ1ZVwiXScpLnRleHQoKS50cmltKCksIC8vIEFQSSBuYW1lXG5cdFx0XHRcdHBhdGg6IHJlc291cmNlLmF0dHIoJ3BhdGgnKSwgLy8gbWV0aG9kIFVSTFxuXHRcdFx0XHRiYXNlIDogcmVzb3VyY2VzRWwuYXR0cignYmFzZScpLCAvLyBtZXRob2QgYmFzZSBsaW5rXG5cdFx0XHRcdGxpbmsgOiBtZXRob2RFbGVtLmZpbmQoJ2RvYycpLmVxKDApLmF0dHIoJ2FwaWdlZTp1cmwnKSwgLy8gbGluayB0byBkb2N1bWVudGF0aW9uXG5cdFx0XHRcdGRlc2NyaXB0aW9uIDogbWV0aG9kRWxlbS5maW5kKCdkb2MnKS5lcSgwKS50ZXh0KCkudHJpbSgpLCAvL21ldGhvZCBkZXNjcmlwdGlvblxuXHRcdFx0XHRwYXJhbWV0ZXJzOiB7fVxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gcGFyYW1zIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHRyZXNvdXJjZVxuXHRcdFx0XHQuZmluZCgncGFyYW0nKVxuXHRcdFx0XHQuZ2V0KClcblx0XHRcdFx0Lm1hcChmdW5jdGlvbiAocGFyKSB7XG5cdFx0XHRcdFx0dmFyIHBhcmFtID0gJChwYXIpO1xuXHRcdFx0XHRcdHZhciBvcHRpb25zID0gcGFyYW0uZmluZCgnb3B0aW9uJyk7XG5cdFx0XHRcdFx0dmFyIGlzU2VsZWN0ID0gISFvcHRpb25zLmxlbmd0aDtcblxuXHRcdFx0XHRcdHZhciBwYXJhbWV0ZXIgPSB7XG5cdFx0XHRcdFx0XHRuYW1lOiBwYXJhbS5hdHRyKCduYW1lJyksXG5cdFx0XHRcdFx0XHRkb2M6IHBhcmFtLmZpcnN0KCdkb2MnKS50ZXh0KCkudHJpbSgpLFxuXHRcdFx0XHRcdFx0c3R5bGU6IHBhcmFtLmF0dHIoJ3N0eWxlJyksXG5cdFx0XHRcdFx0XHRyZXF1aXJlZDogcGFyYW0uYXR0cigncmVxdWlyZWQnKSxcblx0XHRcdFx0XHRcdGRlZmF1bHQ6IHBhcmFtLmF0dHIoJ2RlZmF1bHQnKSA9PT0gJ25vbmUnICYmIGlzU2VsZWN0ID8gJycgOiBwYXJhbS5hdHRyKCdkZWZhdWx0JyksXG5cdFx0XHRcdFx0XHRzZWxlY3Q6IGlzU2VsZWN0XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGlmIChpc1NlbGVjdCkge1xuXHRcdFx0XHRcdFx0cGFyYW1ldGVyLm9wdGlvbnMgPSBvcHRpb25zLmdldCgpLm1hcChmdW5jdGlvbiAob3B0aW9uKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRcdFx0bmFtZTogJChvcHRpb24pLmF0dHIoJ3ZhbHVlJyksXG5cdFx0XHRcdFx0XHRcdFx0Y2hlY2tlZDogJChvcHRpb24pLmF0dHIoJ3ZhbHVlJykgPT09IHBhcmFtZXRlci5kZWZhdWx0IHx8ICQob3B0aW9uKS5hdHRyKCd2YWx1ZScpID09PSAnbm9uZScsXG5cdFx0XHRcdFx0XHRcdFx0bGluazogZmFsc2Vcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdG1ldGhvZC5wYXJhbWV0ZXJzW3BhcmFtZXRlci5uYW1lXSA9IHBhcmFtZXRlcjtcblx0XHRcdFx0fSk7XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogR2xvYmFsIG9iaiBjb21wb3NpdGlvblxuICAgICAgICovXG5cdFx0XHQvLyBzZXQgY2F0ZWdvcnkgb2JqXG5cdFx0XHRnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XSA9IGdsb2JhbFttZXRob2QuY2F0ZWdvcnldIHx8IHt9O1xuXG5cdFx0XHQvLyBzZXQgbWV0aG9kcyB0eXBlIG9ialxuXHRcdFx0Z2xvYmFsW21ldGhvZC5jYXRlZ29yeV0uQUxMID0gZ2xvYmFsW21ldGhvZC5jYXRlZ29yeV0uQUxMIHx8IHt9O1xuXHRcdFx0Z2xvYmFsW21ldGhvZC5jYXRlZ29yeV1bbWV0aG9kLm1ldGhvZF0gPSBnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XVttZXRob2QubWV0aG9kXSB8fCB7fTtcblxuXHRcdFx0Ly8gc2V0IG1ldGhvZCBvYmpcblx0XHRcdGdsb2JhbFttZXRob2QuY2F0ZWdvcnldLkFMTFttZXRob2QuaWRdID0gbWV0aG9kO1xuXHRcdFx0Z2xvYmFsW21ldGhvZC5jYXRlZ29yeV1bbWV0aG9kLm1ldGhvZF1bbWV0aG9kLmlkXSA9IG1ldGhvZDtcblx0XHR9KTtcblxuXHRyZXR1cm4gZ2xvYmFsO1xufTtcblxuLy9nZXRzIGRvY3VtZW50IGZyb20gV0FETCBjb25maWd1cmF0aW9uIGZpbGVcbnZhciByZWFkRnJvbVdBREwgPSBmdW5jdGlvbiAoKSB7XG4gICQuYWpheCh7XG4gICAgdXJsOiBDT05GSUdfVVJMLFxuICAgIGFzeW5jIDogZmFsc2UsXG4gICAgZGF0YVR5cGU6ICgkLmJyb3dzZXIubXNpZSkgPyBcInRleHRcIiA6IFwieG1sXCIsXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgIHZhciB4bWw7XG5cbiAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UgPT0gXCJzdHJpbmdcIil7XG4gICAgICAgIHhtbCA9IG5ldyBBY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTERPTVwiKTtcbiAgICAgICAgeG1sLmFzeW5jID0gZmFsc2U7XG4gICAgICAgIHhtbC5sb2FkWE1MKHJlc3BvbnNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHhtbCA9IHJlc3BvbnNlO1xuICAgICAgfVxuXG5cdFx0XHRiYXNlID0gcGFyc2VEYXRhKHhtbCk7XG4gICAgfSxcblxuICAgIGVycm9yOiBmdW5jdGlvbihYTUxIdHRwUmVxdWVzdCwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pe1xuICAgICAgYWxlcnQoJ0RhdGEgQ291bGQgTm90IEJlIExvYWRlZCAtICcrIHRleHRTdGF0dXMpO1xuICAgIH1cbiAgfSk7XG59O1xucmVhZEZyb21XQURMKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGJhc2U7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvYmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhcGlLZXkgPSAnWGlPck4yVUM5eWp1UjRYRjg3c2RNYlJwYVZOc1A2VzInIHx8IGFwaUtleVNlcnZpY2UuY2hlY2tBcGlLZXlDb29raWUoJ3RrLWFwaS1rZXknKSB8fCBhcGlLZXlTZXJ2aWNlLmdldEFwaUV4cGxvcmVLZXkoKTsgLy9BUEkgS2V5XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBuYW1lOiAnYXBpa2V5JyxcclxuICBzdHlsZTogJ3F1ZXJ5JyxcclxuICB2YWx1ZToga28ub2JzZXJ2YWJsZShhcGlLZXkpXHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9hcGlrZXkuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIEFqYXggU2VydmljZVxuICogQHBhcmFtIHVybFxuICogQHBhcmFtIG1ldGhvZFxuICogQHBhcmFtIGNhbGxiYWNrXG4gKi9cbnZhciBhamF4U2VydmljZSA9IGZ1bmN0aW9uICh1cmwsIG1ldGhvZCwgY2FsbGJhY2spIHtcbiAgJC5hamF4KHtcbiAgICB0eXBlOiBtZXRob2QsXG4gICAgdXJsOiB1cmwsXG4gICAgYXN5bmM6IHRydWUsXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgIGNvbXBsZXRlOiBjYWxsYmFja1xuICB9KTtcbn07XG5cbi8qKlxuICogRmlsdGVycyBhbmQgcHJlcGFyZXMgcGFyYW1zIHBhaXJzXG4gKiBAcGFyYW0gYXJyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xudmFyIHByZXBhcmVVcmwgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIHZhciByZXBsYWNlbWVudCwgdXJsLCBkb21haW4sIHBhdGgsIG1ldGhvZCwgYXBpS2V5LCBwYXJhbXM7XG5cbiAgaWYgKCFhcnIgJiYgIWFyci5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgXG4gIGRvbWFpbiA9IGFyclswXS5iYXNlO1xuICBwYXRoID0gYXJyWzBdLnBhdGg7XG4gIGFwaUtleSA9IGFyclsxXTtcbiAgcGFyYW1zID0gYXJyWzJdLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgIHJldHVybiBpdGVtLnN0eWxlID09PSAncXVlcnknO1xuICB9KTtcblxuICAvLyBhcnIgb2YgdGVtcGxhdGUgbWFya3NcbiAgcmVwbGFjZW1lbnQgPSBwYXRoLm1hdGNoKC8oW157XSo/KVxcdyg/PVxcfSkvZ21pKTtcblxuICAvLyBhcnIgb2YgdGVtcGxhdGUgcGFyYW1zXG4gIHZhciB0ZW1wbGF0ZXNBcnIgPSBhcnJbMl0uZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgcmV0dXJuIGl0ZW0uc3R5bGUgPT09ICd0ZW1wbGF0ZSc7XG4gIH0pO1xuXG4gIC8vIHJlcGxhY2VtZW50XG4gIHJlcGxhY2VtZW50LmZvckVhY2goZnVuY3Rpb24gKHZhbCkge1xuICAgIHZhciBwYXJhbSA9IHRlbXBsYXRlc0Fyci5maW5kKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gaXRlbS5uYW1lID09PSB2YWw7XG4gICAgfSk7XG4gICAgcGF0aCA9IHBhdGgucmVwbGFjZSgneycrIHBhcmFtLm5hbWUgKyAnfScsIHBhcmFtLnZhbHVlKCkgfHwgcGFyYW0uZGVmYXVsdCk7XG4gIH0pO1xuXG4gIC8vIGFkZHMgYXBpS2V5IHBhcmFtXG4gIGlmICghcGFyYW1zWzBdIHx8IHBhcmFtc1swXS5uYW1lICE9PSAnYXBpa2V5Jykge1xuICAgIHBhcmFtcy51bnNoaWZ0KGFwaUtleSk7XG4gIH1cblxuICAvLyBwcmVwYXJlcyBwYXJhbXMgcGFydCBvZiB1cmxcbiAgcGFyYW1zID0gcGFyYW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIFtpdGVtLm5hbWUsIGl0ZW0udmFsdWUoKSB8fCBpdGVtLmRlZmF1bHRdLmpvaW4oJz0nKTtcbiAgICB9KS5qb2luKCcmJyk7XG5cbiAgdXJsID0gW2RvbWFpbiwgJy8nLCBwYXRoLCAnPycsIHBhcmFtc10uam9pbignJyk7XG5cbiAgcmV0dXJuIGVuY29kZVVSSSh1cmwpO1xufTtcblxuLy8gc2VuZHMgcmVxdWVzdCB0byBnZXQgdGhlIHNlY29uZCBjb2x1bW5cbnZhciBzZW5kUHJpbWFyeVJlcXVlc3QgPSBmdW5jdGlvbiAoYXJyLCByZXF1ZXN0cywgb25FcnJvciwgZ2xvYmFsKSB7XG4gIHZhciB1cmwgPSBwcmVwYXJlVXJsKGFycik7XG5cbiAgYWpheFNlcnZpY2UodXJsLCBhcnJbMF0ubWV0aG9kLCBmdW5jdGlvbihyZXMsIG1zZykge1xuXHRcdHZhciByZXNPYmogPSB7XG5cdFx0XHRyZXE6IHVybCxcblx0XHRcdGluZGV4OiByZXF1ZXN0cygpLmxlbmd0aFxuXHRcdH07XG5cblx0XHRpZiAobXNnID09ICdlcnJvcicpIHtcblx0XHRcdC8vIG5vdGlmeWluZyBlcnJvciBtb2RhbFxuXHRcdFx0b25FcnJvci5ub3RpZnlTdWJzY3JpYmVycyhyZXMsICdlcnJvcicpO1xuXHRcdFx0Ly8gZXJyb3IgcG9wb3ZlciBvZiByZXF1ZXN0XG5cdFx0XHRyZXNPYmouZXJyb3IgPSByZXM7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGdsb2JhbC5sYXN0UmVzcG9uc2UgPSByZXNPYmoucmVzID0ge1xuXHRcdFx0XHRpZDogYXJyWzBdLmlkLCAvLyBtZXRob2QgaWQgd2FzIHVzZWRcblx0XHRcdFx0cmVzOiByZXMucmVzcG9uc2VKU09OIC8vIHJlc3BvbnNlXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vIGV4cG9ydGluZyBkYXRhIHVzaW5nIG9ic2VydmFibGVcblx0XHRyZXF1ZXN0cy51bnNoaWZ0KHJlc09iaik7XG4gIH0pO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHNlbmRQcmltYXJ5UmVxdWVzdDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9hamF4U2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjb25maWcgPSBrby5vYnNlcnZhYmxlKCk7XHJcblxyXG4kLmFqYXgoe1xyXG5cdHR5cGU6ICdHRVQnLFxyXG5cdHVybDogW1xyXG5cdFx0J2h0dHA6Ly8nLFxyXG5cdFx0ZG9jdW1lbnQubG9jYXRpb24uaG9zdG5hbWUsXHJcblx0XHRkb2N1bWVudC5sb2NhdGlvbi5wb3J0ICYmICc6JyArIGRvY3VtZW50LmxvY2F0aW9uLnBvcnQsXHJcblx0XHQnL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbmZpZy5qc29uJ1xyXG5cdF0uam9pbignJyksXHJcblx0YXN5bmM6IHRydWUsXHJcblx0ZGF0YVR5cGU6IFwianNvblwiLFxyXG5cdGNvbXBsZXRlOiBmdW5jdGlvbihyZXMsIG1zZykge1xyXG5cdFx0aWYgKG1zZyA9PSAnZXJyb3InKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ2NhblxcJ3QgbG9hZCBjb25maWcuanNvbiEnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbmZpZyhyZXMucmVzcG9uc2VKU09OKTtcclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjb25maWc7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9jb25maWdTZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBoZiA9IHJlcXVpcmUoJy4uL21vZHVsZXMvaGVscGVyRnVuYycpO1xyXG52YXIgc2VsZjtcclxuXHJcbi8qKlxyXG4gKiBNZW51IFZpZXctTW9kZWxcclxuICogQHBhcmFtIGJhc2VcclxuICogQHBhcmFtIGNhdGVnb3J5XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gTWVudVZpZXdNb2RlbChiYXNlLCBzZWxlY3RlZENhdGVnb3J5KSB7XHJcbiAgc2VsZiA9IHRoaXM7XHJcblxyXG5cdHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSA9IHNlbGVjdGVkQ2F0ZWdvcnk7XHJcblx0dmFyIGluaXRDYXRlZ29yeSA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUoc2VsZWN0ZWRDYXRlZ29yeSk7XHJcblx0dGhpcy5jYXRlZ29yaWVzID0ga28ub2JzZXJ2YWJsZUFycmF5KE9iamVjdC5rZXlzKGJhc2UpLm1hcChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuXHRcdHZhciBjaGVja2VkID0gaW5pdENhdGVnb3J5ID8gaXRlbSA9PT0gaW5pdENhdGVnb3J5OiAhaW5kZXg7XHJcblx0XHQvLyBpbml0aWFsIGxvYWRcclxuXHRcdGNoZWNrZWQgJiYgc2VsZi5zZWxlY3RlZENhdGVnb3J5KGl0ZW0pO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Y2hlY2tlZDoga28ub2JzZXJ2YWJsZShjaGVja2VkKSxcclxuXHRcdFx0bmFtZTogaXRlbSxcclxuXHRcdFx0bGluazogZmFsc2VcclxuXHRcdH1cclxuXHR9KSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNZW51IFZpZXctTW9kZWwgbWV0aG9kXHJcbiAqIEBwYXJhbSBjYXRlZ29yeVxyXG4gKi9cclxuTWVudVZpZXdNb2RlbC5wcm90b3R5cGUuc2VsZWN0Q2F0ZWdvcnkgPSBmdW5jdGlvbiAoY2F0ZWdvcnkpIHtcclxuICB2YXIgY2F0ZWdvcnlOYW1lID0gY2F0ZWdvcnkubmFtZTtcclxuICBzZWxmLnNlbGVjdGVkQ2F0ZWdvcnkoY2F0ZWdvcnlOYW1lKTtcclxuICBoZi5jaGVja0FjdGl2ZShzZWxmLmNhdGVnb3JpZXMsIGNhdGVnb3J5TmFtZSk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1lbnVWaWV3TW9kZWw7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvVmlld01vZGVscy9tZW51Vmlld01vZGVsLmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMuZ2V0TW9kZWxBcnJheSA9IGZ1bmN0aW9uIGdldE1vZGVsQXJyYXkocGFyYW1zKSB7XHJcbiAgICB2YXIgb2JqID0gcGFyYW1zLm9iaiB8fCB7fSxcclxuICAgICAgICBhcnIgPSBwYXJhbXMuYXJyIHx8IFtdLFxyXG4gICAgICAgIHByb3AgPSBwYXJhbXMucHJvcCB8fCAnbmFtZSc7XHJcblxyXG4gICAgZm9yICh2YXIgaSBpbiBvYmopIHtcclxuICAgICAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShpKSkgeyBjb250aW51ZTsgfVxyXG5cclxuICAgICAgICB2YXIgaXRlbSA9IGFyci5maW5kKGZ1bmN0aW9uIChtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbTEubmFtZSA9PT0gb2JqW2ldW3Byb3BdO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoaXRlbSkgeyBjb250aW51ZTsgfVxyXG5cclxuICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgIGNoZWNrZWQ6IGtvLm9ic2VydmFibGUoZmFsc2UpLFxyXG4gICAgICAgICAgICBuYW1lOiBvYmpbaV1bcHJvcF1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBhcnI7XHJcbn07XHJcblxyXG5leHBvcnRzLmNoZWNrQWN0aXZlID0gZnVuY3Rpb24gY2hlY2tBY3RpdmUoa29BcnIsIGFjdGl2ZUVsZW0pIHtcclxuICAgIGlmICgha29BcnIgJiYgIWFjdGl2ZUVsZW0pIHtyZXR1cm4gZmFsc2U7fVxyXG5cclxuICAgIGtvQXJyKGtvQXJyKCkubWFwKGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICBpZiAob2JqLm5hbWUgPT09IGFjdGl2ZUVsZW0pIHtcclxuICAgICAgICAgICAgb2JqLmNoZWNrZWQodHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb2JqLmNoZWNrZWQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfSkpO1xyXG59O1xyXG5cclxuZXhwb3J0cy5pdGVyYXRlID0gZnVuY3Rpb24gKG9iaikge1xyXG5cdGZvciAodmFyIHByb3BlcnR5IGluIG9iaikge1xyXG5cdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBvYmpbcHJvcGVydHldID09IFwib2JqZWN0XCIpIHtcclxuXHRcdFx0XHRpdGVyYXRlKG9ialtwcm9wZXJ0eV0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCd8JyArIHByb3BlcnR5ICsgXCIgfCAgXCIgKyBvYmpbcHJvcGVydHldICsgJ3wnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9oZWxwZXJGdW5jLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xyXG52YXIgYmFzZTtcclxudmFyIGhmID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9oZWxwZXJGdW5jJyk7XHJcbi8qKlxyXG4gKiBQYXJhbXMgVmlldy1Nb2RlbFxyXG4gKiBAcGFyYW0gcmF3XHJcbiAqIEBwYXJhbSBtZXRob2RcclxuICogQHBhcmFtIHBhcmFtc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFBhcmFtc1ZpZXdNb2RlbChyYXcsIG1ldGhvZCwgcGFyYW1zKSB7XHJcbiAgYmFzZSA9IHJhdztcclxuICBzZWxmID0gdGhpcztcclxuICB0aGlzLmFuaW1hdGlvblNwZWVkID0gMjAwO1xyXG5cclxuICAvLyBvYnNlcnZhYmxlc1xyXG4gIHRoaXMubWV0aG9kID0gbWV0aG9kO1xyXG4gIHRoaXMucGFyYW1zID0gcGFyYW1zO1xyXG4gIHRoaXMuaXNIaWRkZW4gPSBrby5vYnNlcnZhYmxlKHRydWUpO1xyXG4gIHRoaXMucGFyYW1JbkZvY3VzID0ga28ub2JzZXJ2YWJsZSgnJyk7XHJcblx0dGhpcy5wYXJhbXNNb2RlbCA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XHJcblxyXG5cdC8vIGNvbXB1dGVkXHJcblx0Ly8gdGhpcy5wYXJhbXNNb2RlbCA9IGtvLmNvbXB1dGVkKHRoaXMudXBkYXRlUGFyYW1zTW9kZWwsIHRoaXMpO1xyXG5cdHRoaXMudXBkYXRlVmlld01vZGVsKCk7XHJcblx0dGhpcy5tZXRob2Quc3Vic2NyaWJlKHRoaXMudXBkYXRlVmlld01vZGVsLCB0aGlzKTtcclxuXHJcblx0dGhpcy5pc0RpcnR5ID0ga28uY29tcHV0ZWQodGhpcy5jaGVja0RpcnR5LCB0aGlzKTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsIGJ1aWxkIG9mIFNlbGVjdCBNb2RlbFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS51cGRhdGVWaWV3TW9kZWwgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIG9iaiA9IHRoaXMubWV0aG9kKCkucGFyYW1ldGVycyB8fCB7fSxcclxuXHRcdGFyciA9IFtdO1xyXG5cclxuXHRmb3IgKHZhciBpIGluIG9iaikge1xyXG5cdFx0aWYgKCFvYmouaGFzT3duUHJvcGVydHkoaSkpIHtjb250aW51ZTt9XHJcblxyXG5cdFx0Ly8gY29waWVzIGFsbCB2YWx1ZXMgZnJvbSBtb2RlbCB0byB2aWV3LW1vZGVsXHJcblx0XHR2YXIgdm1QYXJhbSA9ICQuZXh0ZW5kKHt9LCBvYmpbaV0pO1xyXG5cclxuXHRcdHZtUGFyYW0udmFsdWUgPSBrby5vYnNlcnZhYmxlKHZtUGFyYW0udmFsdWUgfHwgKHZtUGFyYW0uc2VsZWN0ICYmIHZtUGFyYW0uZGVmYXVsdCkgfHwgJycpO1xyXG5cclxuXHRcdC8vYWRkIG9ic2VydmFibGUgZm9yIHNlbGVjdGVkIG9wdGlvbnNcclxuXHRcdGlmICh2bVBhcmFtLnNlbGVjdCkge1xyXG5cdFx0XHR2bVBhcmFtLm9wdGlvbnMgPSBrby5vYnNlcnZhYmxlQXJyYXkob2JqW2ldLm9wdGlvbnMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcblx0XHRcdFx0dmFyIG9iaiA9ICQuZXh0ZW5kKHt9LCBpdGVtKTtcclxuXHRcdFx0XHRvYmouY2hlY2tlZCA9IGtvLm9ic2VydmFibGUoaXRlbS5jaGVja2VkKTtcclxuXHRcdFx0XHRyZXR1cm4gb2JqO1xyXG5cdFx0XHR9KSlcclxuXHRcdH1cclxuXHJcblx0XHQvLyAnZGlydHknIGZsYWcgd2F0Y2hlciBmb3IgY3VycmVudCBmaWVsZFxyXG5cdFx0dm1QYXJhbS5pc0RpcnR5ID0ga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHRoaXMuc2VsZWN0KSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMudmFsdWUoKSAhPT0gdGhpcy5kZWZhdWx0ICYmIHRoaXMudmFsdWUoKSAhPT0gJ25vbmUnO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiAhISh0aGlzLnZhbHVlKCkudG9TdHJpbmcoKSkudHJpbSgpLmxlbmd0aDtcclxuXHRcdH0sIHZtUGFyYW0pO1xyXG5cclxuXHRcdC8vIGFkZCBjYWxlbmRhciBidG4gZm9yIGN1cnJlbnQgZmllbGRcclxuXHRcdHZtUGFyYW0uaGFzQ2FsZW5kYXIgPSBpLnNlYXJjaCgvKGRhdGV8dGltZSkvZ21pKSAhPSAtMTtcclxuXHJcblx0XHQvLyBhZGQgcG9wLXVwIGJ0biBmb3IgY3VycmVudCBmaWVsZFxyXG5cdFx0dm1QYXJhbS5oYXNQb3BVcCA9IGkuc2VhcmNoKC8oYXR0cmFjdGlvbklkfHZlbnVlSWQpL2dtaSkgIT0gLTE7XHJcblxyXG5cdFx0YXJyLnB1c2godm1QYXJhbSk7XHJcblx0fVxyXG5cclxuXHQvLyBwcmVwYXJlIG91dHB1dCBmb3IgcmVxdWVzdFxyXG5cdHRoaXMucGFyYW1zTW9kZWwoYXJyKTtcclxuXHR0aGlzLnBhcmFtSW5Gb2N1cyh0aGlzLnBhcmFtc01vZGVsKClbMF0pO1xyXG5cdHRoaXMucHJlcGFyZVVybFBhaXJzKGFyciwgdGhpcy5wYXJhbXMpO1xyXG5cdHJldHVybiBhcnI7XHJcbn07XHJcblxyXG4vKipcclxuICogRGlydHkgcGFyYW1zIGZvcm0gb2JzZXJ2YWJsZSBtZXRob2RcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5QYXJhbXNWaWV3TW9kZWwucHJvdG90eXBlLmNoZWNrRGlydHkgPSBmdW5jdGlvbiAoKSB7XHJcblx0dGhpcy5wcmVwYXJlVXJsUGFpcnModGhpcy5wYXJhbXNNb2RlbCgpLCB0aGlzLnBhcmFtcyk7XHJcblx0dmFyIGRpcnR5ID0gdGhpcy5wYXJhbXNNb2RlbCgpLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG5cdFx0cmV0dXJuIGl0ZW0uaXNEaXJ0eSgpID09PSB0cnVlO1xyXG5cdH0pO1xyXG5cdHJldHVybiBkaXJ0eS5sZW5ndGggPiAwO1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBFbnRlciBrZXkgaGFuZGxlclxyXG4gKiBAcGFyYW0gbW9kZWxcclxuICogQHBhcmFtIGV2ZW50XHJcbiAqL1xyXG5QYXJhbXNWaWV3TW9kZWwucHJvdG90eXBlLm9uRW50ZXJLZXlEb3duID0gZnVuY3Rpb24gKG1vZGVsLCBldmVudCkge1xyXG4gIGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xyXG4gICAgJCgnI2FwaS1leHAtZ2V0LWJ0bicpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBTbGlkZSB0b2dnbGUgZm9yIHBhcmFtcyBjb250YWluZXIgbWV0aG9kXHJcbiAqIEBwYXJhbSB2aWV3TW9kZWxcclxuICogQHBhcmFtIGV2ZW50XHJcbiAqL1xyXG5QYXJhbXNWaWV3TW9kZWwucHJvdG90eXBlLnNsaWRlVG9nZ2xlID0gZnVuY3Rpb24gKHZpZXdNb2RlbCwgZXZlbnQpIHtcclxuICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpXHJcbiAgICAucGFyZW50cygnLmpzLXNsaWRlLWNvbnRyb2wnKVxyXG4gICAgLmZpbmQoJy5qcy1zbGlkZS13cmFwcGVyJylcclxuICAgIC5zbGlkZVRvZ2dsZSh2aWV3TW9kZWwuYW5pbWF0aW9uU3BlZWQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmlld01vZGVsLmlzSGlkZGVuKCF2aWV3TW9kZWwuaXNIaWRkZW4oKSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBNYWNoZXMgZm9jdXNlZCBwYXJhbVxyXG4gKiBAcGFyYW0gaXRlbVxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5vbkZvY3VzID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICBzZWxmLnBhcmFtSW5Gb2N1cyhpdGVtKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGaWx0ZXJzIHBhcmFtcyBieSBkZWZpbmVkIHZhbHVlXHJcbiAqIEBwYXJhbSBhcnJcclxuICogQHBhcmFtIGtvT2JzXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5wcmVwYXJlVXJsUGFpcnMgPSBmdW5jdGlvbiAoYXJyLCBrb09icykge1xyXG4gIGlmICghYXJyICYmICFrb09icykge3JldHVybiBmYWxzZTt9XHJcblxyXG4gIHJldHVybiBrb09icyhhcnIuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICByZXR1cm4gKGl0ZW0udmFsdWUoKSB8fCBpdGVtLmRlZmF1bHQpO1xyXG4gIH0pKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBPbiBzZWxlY3QgdmFsdWUgaGFuZGxlciBmb3IgcGFyYW1zIHNlbGVjdFxyXG4gKiBAcGFyYW0gcGFyYW0ge29iamVjdH0gcGFyYW1ldGVyIHZpZXctbW9kZWxcclxuICogQHBhcmFtIG9wdGlvbiB7b2JqZWN0fSBvcHRpb24gdmlldy1tb2RlbFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5vblNlbGVjdFBhcmFtVmFsdWUgPSBmdW5jdGlvbiAocGFyYW0sIG9wdGlvbikge1xyXG5cdGhmLmNoZWNrQWN0aXZlKHBhcmFtLm9wdGlvbnMsIG9wdGlvbi5uYW1lKTtcclxuXHRwYXJhbS52YWx1ZShvcHRpb24ubmFtZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUGFyYW1zIGNsZWFyIGJ1dHRvbiBoYW5kbGVyXHJcbiAqIEBwYXJhbSB2bSB7b2JqZWN0fSB2aWV3IG1vZGVsXHJcbiAqIEBwYXJhbSBlIHtvYmplY3R9IGV2ZW50XHJcbiAqL1xyXG5QYXJhbXNWaWV3TW9kZWwucHJvdG90eXBlLm9uUGFyYW1zQ2xlYXIgPSBmdW5jdGlvbiAodm0sIGUpIHtcclxuXHR0aGlzLnVwZGF0ZVZpZXdNb2RlbCgpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQYXJhbXNWaWV3TW9kZWw7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvVmlld01vZGVscy9wYXJhbXNWaWV3TW9kZWwuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGhmID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9oZWxwZXJGdW5jJyk7XHJcbnZhciBzZWxmO1xyXG52YXIgYmFzZTtcclxudmFyIGNhdGVnb3J5O1xyXG5cclxuLyoqXHJcbiAqIE1ldGhvZHMgVmlldy1Nb2RlbFxyXG4gKiBAcGFyYW0gcmF3XHJcbiAqIEBwYXJhbSBjYXRlZ29yeVxyXG4gKiBAcGFyYW0gbWV0aG9kXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gTWV0aG9kc1ZpZXdNb2RlbChyYXcsIGNhdGVnb3J5LCBtZXRob2QpIHtcclxuICBzZWxmID0gdGhpcztcclxuICBiYXNlID0gcmF3O1xyXG5cclxuICAvLyBvYnNlcnZhYmxlc1xyXG4gIHRoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcclxuICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcclxuICB0aGlzLnRvZ2dsZVBvcFVwID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcbiAgdGhpcy5yYWRpb3NNb2RlbCA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XHJcbiAgdGhpcy5tZXRob2RzVmlld01vZGVsID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcclxuICB0aGlzLnVwZGF0ZU1vZGVsKHRoaXMuY2F0ZWdvcnkoKSk7XHJcbiAgdGhpcy5jYXRlZ29yeS5zdWJzY3JpYmUodGhpcy51cGRhdGVNb2RlbCwgdGhpcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBPbiBjYXRlZ29yeSBjaGFuZ2UgaGFuZGxlclxyXG4gKiBNZXRob2RzIFZpZXctTW9kZWwgbWV0aG9kXHJcbiAqIEBwYXJhbSBjYXRlZ29yeVxyXG4gKi9cclxuTWV0aG9kc1ZpZXdNb2RlbC5wcm90b3R5cGUudXBkYXRlTW9kZWwgPSBmdW5jdGlvbiAoY2F0ZWdvcnkpIHtcclxuICAvLyBpbml0aWFsIHJhZGlvcyBtb2RlbFxyXG4gIHNlbGYudXBkYXRlUmFkaW9zTW9kZWwoYmFzZVtjYXRlZ29yeV0pO1xyXG4gIC8vIGluaXRpYWwgc2VsZWN0IG1vZGVsIChmaXJzdCBtZXRob2QgaW4gZmlyc3Qgc2VjdGlvbiBmb3Igc3RhcnQpXHJcbiAgc2VsZi51cGRhdGVTZWxlY3Qoc2VsZi5yYWRpb3NNb2RlbCgpWzBdKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBPbmNoYW5nZSBoYW5kbGVyIGZvciBSYWRpbyBidXR0b25zXHJcbiAqIEBwYXJhbSBpdGVtXHJcbiAqL1xyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS5vbmNoYW5nZVJhZGlvcyA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgLy91cGRhdGUgUmFkaW9zIE1vZGVsXHJcbiAgaGYuY2hlY2tBY3RpdmUoc2VsZi5yYWRpb3NNb2RlbCwgaXRlbS5uYW1lKTtcclxuICAvL3VwZGF0ZSBTZWxlY3QgTW9kZWxcclxuICBzZWxmLnVwZGF0ZVNlbGVjdChpdGVtKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsIGJ1aWxkIG9mIFJhZGlvcyBNb2RlbFxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKi9cclxuTWV0aG9kc1ZpZXdNb2RlbC5wcm90b3R5cGUudXBkYXRlUmFkaW9zTW9kZWwgPSBmdW5jdGlvbiAocGFyYW0pIHtcclxuICB2YXIgb2JqID0gcGFyYW0gfHwge30sXHJcbiAgICBhcnIgPSBbXTtcclxuXHJcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcclxuICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGkpKSB7IGNvbnRpbnVlOyB9XHJcbiAgICB2YXIgaXRlbSA9IHtcclxuICAgICAgY2hlY2tlZDoga28ub2JzZXJ2YWJsZShpID09PSAnQUxMJyksXHJcbiAgICAgIG5hbWU6IGlcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGkgPT09ICdBTEwnKSB7XHJcbiAgICAgIGFyci51bnNoaWZ0KGl0ZW0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhcnIucHVzaChpdGVtKTtcclxuICAgIH1cclxuICB9XHJcblx0YXJyID0gYXJyLnNvcnQoY29tcGFyZU1ldGhvZHMpO1xyXG4gIHRoaXMucmFkaW9zTW9kZWwoYXJyKTtcclxuICByZXR1cm4gYXJyO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWwgYnVpbGQgb2YgU2VsZWN0IE1vZGVsXHJcbiAqIEBwYXJhbSBpdGVtXHJcbiAqL1xyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS51cGRhdGVTZWxlY3QgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gIHZhciBvYmogPSBiYXNlW3NlbGYuY2F0ZWdvcnkoKV1baXRlbS5uYW1lXXx8IHt9LFxyXG4gICAgYXJyID0gW10sXHJcbiAgICBjb3VudCA9IDA7XHJcblxyXG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XHJcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShpKSkgeyBjb250aW51ZTsgfVxyXG4gICAgdmFyIHByb3BlcnR5ID0gb2JqW2ldO1xyXG5cdFx0Ly8gY29waWVzIGFsbCB2YWx1ZXMgZnJvbSBtb2RlbCB0byB2aWV3LW1vZGVsXHJcblx0XHR2YXIgdm1NZXRob2QgPSAkLmV4dGVuZCh7fSwgcHJvcGVydHkpO1xyXG5cclxuXHRcdGRlbGV0ZSB2bU1ldGhvZC5wYXJhbWV0ZXJzO1xyXG5cdFx0dm1NZXRob2QuY2hlY2tlZCA9IGtvLm9ic2VydmFibGUoIWNvdW50KTtcclxuXHJcblx0XHRhcnIucHVzaCh2bU1ldGhvZCk7XHJcblxyXG4gICAgLy8gc2V0IGdsb2JhbCBvYnNlcnZhYmxlXHJcbiAgICAhY291bnQgJiYgdGhpcy5tZXRob2QoYmFzZVtwcm9wZXJ0eS5jYXRlZ29yeV1bcHJvcGVydHkubWV0aG9kXVtwcm9wZXJ0eS5pZF0pO1xyXG5cclxuICAgIGNvdW50Kys7XHJcblxyXG4gIH1cclxuXHJcblx0dGhpcy5tZXRob2RzVmlld01vZGVsKGFycik7XHJcblx0cmV0dXJuIGFycjtcclxufTtcclxuXHJcbk1ldGhvZHNWaWV3TW9kZWwucHJvdG90eXBlLm9uU2VsZWN0TWV0aG9kID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICBoZi5jaGVja0FjdGl2ZShzZWxmLm1ldGhvZHNWaWV3TW9kZWwsIGl0ZW0ubmFtZSk7XHJcbiAgc2VsZi5tZXRob2QoYmFzZVtpdGVtLmNhdGVnb3J5XVtpdGVtLm1ldGhvZF1baXRlbS5pZF0pO1xyXG59O1xyXG5cclxuTWV0aG9kc1ZpZXdNb2RlbC5wcm90b3R5cGUub25BYm91dENsaWNrID0gZnVuY3Rpb24gKG1vZGVsLCBldmVudCkge1xyXG4gIG1vZGVsLnRvZ2dsZVBvcFVwKCFtb2RlbC50b2dnbGVQb3BVcCgpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTb3J0IGZ1bmN0aW9uIGZvciBtZXRob2RzIGFyYXlcclxuICogQHBhcmFtIGZcclxuICogQHBhcmFtIHNcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbmZ1bmN0aW9uIGNvbXBhcmVNZXRob2RzKGYscykge1xyXG5cdHZhciBhID0gZi5uYW1lLnRvVXBwZXJDYXNlKCk7XHJcblx0dmFyIGIgPSBzLm5hbWUudG9VcHBlckNhc2UoKTtcclxuXHJcblx0aWYgKGEgPT09IGIpIHtyZXR1cm4gMDt9XHJcblx0aWYgKGEgPT09ICdBTEwnIHx8XHJcblx0XHQoYSA9PT0gJ0dFVCcgJiYgKGIgPT09ICdQT1NUJyB8fCBiID09PSAnUFVUJyB8fCBiID09PSAnREVMRVRFJykpIHx8XHJcblx0XHQoYSA9PT0gJ1BPU1QnICYmIChiID09PSAnUFVUJyB8fCBiID09PSAnREVMRVRFJykpIHx8XHJcblx0XHQoYSA9PT0gJ1BVVCcgJiYgYiA9PT0gJ0RFTEVURScpKSB7XHJcblx0XHRyZXR1cm4gLTE7XHJcblx0fVxyXG5cdHJldHVybiAxO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1ldGhvZHNWaWV3TW9kZWw7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvVmlld01vZGVscy9tZXRob2RzVmlld01vZGVsLmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBqc29uSGlnaGxpZ2h0ID0gcmVxdWlyZSgnLi8uLi9tb2R1bGVzL2pzb24taGlnaGxpZ2h0Jyk7XG52YXIgc2xpZGVyID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9zbGlkZXInKTtcbnZhciBmaWx0ZXIgPSByZXF1aXJlKCcuLi8uLi9jb25maWcuanNvbicpO1xudmFyIHNlbGY7XG52YXIgY29sb3JzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb2xvckNsYXNzZXMnKS5jb2xvcnM7XG5cbmZ1bmN0aW9uIFJlcXVlc3RzTGlzdFZpZXdNb2RlbChyZXF1ZXN0cywgc2VsZWN0ZWRQYXJhbXMsIHNoYXJlUGF0aCkge1xuXHR0aGlzLnVybCA9IHNlbGVjdGVkUGFyYW1zO1xuXHRzZWxmID0gdGhpcztcblx0dGhpcy5jb2xvcnMgPSBjb2xvcnM7XG5cdHRoaXMuc2hhcmVQYXRoID0gc2hhcmVQYXRoO1xuXHR0aGlzLnJlcXVlc3RzID0gcmVxdWVzdHM7XG5cdHRoaXMuaXNBY3RpdmVUYWIgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcblx0dGhpcy52aWV3TW9kZWwgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xuXHR0aGlzLmNsZWFyQnRuSXNWaXNpYmxlID0ga28uY29tcHV0ZWQodGhpcy5faXNWaXNpYmxlLCB0aGlzKTtcblx0dGhpcy5yZXF1ZXN0cy5zdWJzY3JpYmUodGhpcy51cGRhdGVNb2RlbCwgdGhpcyk7XG59XG5cbi8qKlxuICogVXBkYXRlIFZpZXdtb2RlbCBvZiByZXF1ZXN0IGxpc3RcbiAqIEBwYXJhbSBhcnJcbiAqL1xuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS51cGRhdGVNb2RlbCA9IGZ1bmN0aW9uIChhcnIpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcblx0dmFyIG5ld01vZGVsID0ga28udW53cmFwKHRoaXMucmVxdWVzdHMpXG5cdFx0Lm1hcChmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHR2YXIgbmV3T2JqID0ge1xuXHRcdFx0XHRjb2xvcjogc2VsZi5jb2xvcnNbb2JqLmluZGV4ICUgc2VsZi5jb2xvcnMubGVuZ3RoXSxcblx0XHRcdFx0YWN0aXZlOiBrby5vYnNlcnZhYmxlKGZhbHNlKSxcblx0XHRcdFx0Y29waWVkRm9yU2hhcmU6IGtvLm9ic2VydmFibGUoZmFsc2UpLFxuXHRcdFx0XHRjb3BpZWRVcmw6IGtvLm9ic2VydmFibGUoZmFsc2UpLFxuXHRcdFx0XHRyZXNIVE1MOiBrby5vYnNlcnZhYmxlKCcnKVxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gZXJyb3IgcG9wb3ZlclxuXHRcdFx0aWYgKG9iai5lcnJvcikge1xuXHRcdFx0XHR2YXIgZXJyb3JPYmogPSBvYmouZXJyb3I7XG5cdFx0XHRcdG5ld09iai5lcnJvciA9IGtvLm9ic2VydmFibGUoW1xuXHRcdFx0XHRcdE9iamVjdC5nZXRQcm9wKGVycm9yT2JqLCAnLnJlc3BvbnNlSlNPTi5lcnJvcnNbMF0uc3RhdHVzJykgfHwgZXJyb3JPYmouc3RhdHVzICsgJycsXG5cdFx0XHRcdFx0T2JqZWN0LmdldFByb3AoZXJyb3JPYmosICcucmVzcG9uc2VKU09OLmVycm9yc1swXS5zdGF0dXNUZXh0JykgfHwgJycsXG5cdFx0XHRcdFx0T2JqZWN0LmdldFByb3AoZXJyb3JPYmosICcucmVzcG9uc2VKU09OLmVycm9yc1swXS5kZXRhaWwnKSB8fCAndW5ub3duJyxcblx0XHRcdFx0XHRPYmplY3QuZ2V0UHJvcChlcnJvck9iaiwgJy5yZXNwb25zZUpTT04nKSB8fCB7fVxuXHRcdFx0XHRdKVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gJC5leHRlbmQoe30sIG9iaiwgbmV3T2JqKTtcblx0XHR9KTtcblx0c2xpZGVyLnJlbW92ZShzZWxmLnZpZXdNb2RlbCgpLmxlbmd0aCk7XG5cdHNlbGYudmlld01vZGVsKG5ld01vZGVsKTtcblx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0c2xpZGVyLnNldChzZWxmLnZpZXdNb2RlbCgpLmxlbmd0aCk7XG5cdFx0JCgnI3Nob3ctZGV0YWlscy0wJykudHJpZ2dlcignY2xpY2snKTtcblx0fSwgMTApO1xufTtcblxuLyoqXG4gKiBnZXQgZGV0YWlsc1xuICogQHBhcmFtIGRhdGFcbiAqL1xuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5nZXRNb3JlID0gZnVuY3Rpb24gKGlkLCBkYXRhKSB7XG5cdHZhciBwYW5lbEdyb3VwID0gdGhpcy5wYW5lbEdyb3VwO1xuXHR2YXIgcGFuZWwgPSB0aGlzO1xuXHR2YXIgY3VycmVudFNsaWRlciA9ICQoJyNzbGlkZXItJyArIHBhbmVsR3JvdXAuc2VjdGlvbkluZGV4KTtcblx0dmFyIGNvbXBvbmVudCA9ICQoJzxzZWN0aW9uIGRhdGEtYmluZD1cImNvbXBvbmVudDoge25hbWU6IFxcJ3BhbmVsLWdyb3VwXFwnLCBwYXJhbXM6IHBhcmFtc31cIj48L3NlY3Rpb24+Jyk7XG5cdHZhciBjdXJzbGljayA9IGN1cnJlbnRTbGlkZXIuc2xpY2soJ2dldFNsaWNrJyk7XG5cdFxuXHQvLyBleHRlbmRpbmcgYWRkaXRpb25hbCBkYXRhIChjb3B5KVxuXHR2YXIgcGFyYW1zID0gJC5leHRlbmQoe30sIHBhbmVsR3JvdXAsIHtcblx0XHRkYXRhOiBkYXRhLFxuXHRcdGdyb3VwSW5kZXg6IHBhbmVsR3JvdXAuZ3JvdXBJbmRleCArIDEsXG5cdFx0X3Byb3BUaXRsZTogdHlwZW9mIGlkID09PSAnc3RyaW5nJyAmJiBpZCxcblx0XHRjb25maWc6IHBhbmVsLmNvbmZpZ1xuXHR9KTtcblxuXHQvLyBhcHBseSBjb21wb25lbnQgZGF0YSBiaW5kaW5nc1xuXHRrby5hcHBseUJpbmRpbmdzKHtcblx0XHRwYXJhbXM6IHBhcmFtc1xuXHR9LCBjb21wb25lbnRbMF0pO1xuXHRcblx0Ly8gYWRkIHNsaWRlIHdpdGggc2VsZWN0ZWQgZGF0YVxuXHRjdXJyZW50U2xpZGVyLnNsaWNrKCdzbGlja0FkZCcsIGNvbXBvbmVudCk7XG5cdFxuXHQvLyByZW1vdmUgb3V0c3RhbmRpbmcgc2xpZGVzXG5cdGZvciAodmFyIGkgPSBjdXJzbGljay5zbGlkZUNvdW50IC0gMjsgaSA+IHBhbmVsR3JvdXAuZ3JvdXBJbmRleDsgaS0tKSB7XG5cdFx0Y3VycmVudFNsaWRlci5zbGljaygnc2xpY2tSZW1vdmUnLCBpLCBmYWxzZSk7XG5cdH1cblx0Ly8gbW92ZSB0byBuZXh0IHNsaWRlXG5cdGN1cnJlbnRTbGlkZXIuc2xpY2soJ3NsaWNrTmV4dCcpO1xufTtcblxuLyoqXG4gKiBWaXNpYmlsaXR5IGZsYWcgZm9yIENsZWFyIGJ0blxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLl9pc1Zpc2libGUgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHRoaXMucmVxdWVzdHMpLmxlbmd0aCA+IDA7XG59O1xuXG4vKipcbiAqIENsZWFyIHJlcXVlc3RzdHMgbGlzdCBoYW5kbGVyXG4gKiBAcGFyYW0gdm1cbiAqIEBwYXJhbSBldmVudFxuICovXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLm9uQ2xlYXJSZXF1ZXN0cyA9IGZ1bmN0aW9uICh2bSwgZXZlbnQpIHtcblx0dGhpcy5yZXF1ZXN0cyhbXSk7XG59O1xuXG4vKipcbiAqIERldGFpbHMgdG9nZ2xlIGhhbmRsZXJcbiAqIEBwYXJhbSB2bVxuICogQHBhcmFtIGV2ZW50XG4gKi9cblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUuZ2V0RGV0YWlscyA9IGZ1bmN0aW9uICh2bSwgZXZlbnQpIHtcblx0aWYgKCF0aGlzLnJlc0hUTUwoKS5sZW5ndGgpIHtcblx0XHRqc29uSGlnaGxpZ2h0KHRoaXMucmVzSFRNTCwgdGhpcy5yZXMpO1xuXHR9XG5cdHRoaXMuYWN0aXZlKCF0aGlzLmFjdGl2ZSgpKTtcbn07XG5cbi8qKlxuICogSm9pbiBzdHJpbmcgZm9yIGlkJ3NcbiAqIEBwYXJhbSBzXG4gKiBAcGFyYW0gaVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5nZXRTdHIgPSBmdW5jdGlvbiAocywgaSkge1xuXHR2YXIgc3RyID0gcztcblx0dmFyIGkxID0gaSA/IGkoKSA6ICcnO1xuXHRyZXR1cm4gW1xuXHRcdHN0cixcblx0XHRpMVxuXHRdLmpvaW4oJy0nKTtcbn07XG5cbi8qKlxuICogR2V0IHJhdyByZXNwb25zZSBkYXRhXG4gKiBAcGFyYW0gbW9kZWwge29iamVjdH1cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUuZ2V0UmF3RGF0YSA9IGZ1bmN0aW9uIChtb2RlbCkge1xuXHR2YXIgY29udGVudCA9IE9iamVjdC5nZXRQcm9wKG1vZGVsLCAnLnJlcy5yZXMnKSB8fCBrby51bndyYXAobW9kZWwuZXJyb3IpWzNdIHx8IHt9O1xuXHR2YXIgcmF3V2luZG93ID0gd2luZG93Lm9wZW4oXCJkYXRhOnRleHQvanNvbixcIiArIGVuY29kZVVSSShKU09OLnN0cmluZ2lmeShjb250ZW50LCBudWxsLCAyKSksICdfYmxhbmsnKTtcblx0cmF3V2luZG93LmZvY3VzKCk7XG59O1xuXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLmNvcHlVcmwgPSBmdW5jdGlvbiAobW9kZWwsIGV2ZW50KSB7XG5cdHZhciBjdXJyZW50RmllbGQgPSB0aGlzO1xuXHR2YXIgZWxlbWVudCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG5cdHNlbGYuY2xpcGJvYXJkID0gbmV3IENsaXBib2FyZChlbGVtZW50KTtcblx0c2VsZi5jbGlwYm9hcmQub24oJ3N1Y2Nlc3MnLCBmdW5jdGlvbiBvblN1Y2Nlc3NDb3B5KGUpIHtcblx0XHRjb25zb2xlLmluZm8oJ0FjdGlvbjonLCBlLmFjdGlvbik7XG5cdFx0Y29uc29sZS5pbmZvKCdUZXh0OicsIGUudGV4dCk7XG5cdFx0Y29uc29sZS5pbmZvKCdUcmlnZ2VyOicsIGUudHJpZ2dlcik7XG5cdFx0JChlbGVtZW50KS5oYXNDbGFzcygnYnRuLXNoYXJlJykgPyBjdXJyZW50RmllbGQuY29waWVkRm9yU2hhcmUodHJ1ZSkgOiBjdXJyZW50RmllbGQuY29waWVkVXJsKHRydWUpO1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0JChlbGVtZW50KS5oYXNDbGFzcygnYnRuLXNoYXJlJykgPyBjdXJyZW50RmllbGQuY29waWVkRm9yU2hhcmUoZmFsc2UpIDogY3VycmVudEZpZWxkLmNvcGllZFVybChmYWxzZSk7XG5cdFx0fSwgNTAwKTtcblx0XHRlLmNsZWFyU2VsZWN0aW9uKCk7XG5cdH0pXG5cdFx0Lm9uKCdlcnJvcicsIGZ1bmN0aW9uIG9uRXJyb3JDb3B5KGUpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ0FjdGlvbjonLCBlLmFjdGlvbik7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdUcmlnZ2VyOicsIGUudHJpZ2dlcik7XG5cdFx0fSk7XG59O1xuXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLnJlbW92ZUhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG5cdHNlbGYuY2xpcGJvYXJkICYmIHNlbGYuY2xpcGJvYXJkLmRlc3Ryb3koKTtcblx0ZGVsZXRlIHNlbGYuY2xpcGJvYXJkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZXF1ZXN0c0xpc3RWaWV3TW9kZWw7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvcmVxdWVzdHNMaXN0Vmlld01vZGVsLmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBXb3JrZXIgPSByZXF1aXJlKCcuL2hpZ2hsaWdodEpzb24ud29ya2VyLmpzJyk7IC8vIEpzb24tZm9ybWF0dGVyIHdvcmtlclxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JzZXJ2YWJsZSwgY29kZSkge1xyXG5cdHZhciBhbmltVGltZSA9IDEwMDtcclxuXHR2YXIgd29ya2VyID0gbmV3IFdvcmtlcjtcclxuXHJcblx0d29ya2VyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0b2JzZXJ2YWJsZShldmVudC5kYXRhKTtcclxuXHJcblx0XHQkKGRvY3VtZW50KVxyXG5cdFx0XHQub24oJ2NsaWNrIHRvdWNoJywgJy50bS1jb2RlLWNvbnRhaW5lciAuZXhwYW5kZWQnLCBmdW5jdGlvbiBqc29uQ29kZUNvbnRhaW5lckV4cGFuZGVkKGUpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHR2YXIgJHNlbGYgPSAkKHRoaXMpO1xyXG5cdFx0XHRcdCRzZWxmXHJcblx0XHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHRcdC5maW5kKCc+dWwnKVxyXG5cdFx0XHRcdFx0LnNsaWRlVXAoYW5pbVRpbWUsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHQkc2VsZi5hZGRDbGFzcygnY29sbGFwc2VkJyk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHRcdFx0Lm9uKCdjbGljayB0b3VjaCcsICcudG0tY29kZS1jb250YWluZXIgLmV4cGFuZGVkLmNvbGxhcHNlZCcsIGZ1bmN0aW9uIGpzb25Db2RlQ29udGFpbmVyQ29sbGFwc2VkKGUpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHR2YXIgJHNlbGYgPSAkKHRoaXMpO1xyXG5cdFx0XHRcdCRzZWxmXHJcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpXHJcblx0XHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHRcdC5maW5kKCc+dWwnKVxyXG5cdFx0XHRcdFx0LnNsaWRlRG93bihhbmltVGltZSwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdCRzZWxmXHJcblx0XHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKVxyXG5cdFx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHR9O1xyXG5cdHdvcmtlci5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRjb25zb2xlLmVycm9yKGV2ZW50KTtcclxuXHR9O1xyXG5cclxuXHR3b3JrZXIucG9zdE1lc3NhZ2UoY29kZSk7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9qc29uLWhpZ2hsaWdodC5qc1xuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gcmVxdWlyZShcIiEhRDpcXFxcc2FuZGJveFxcXFx0aWNrZXRtYXN0ZXItYXBpLXN0YWdpbmcuZ2l0aHViLmlvXFxcXG5vZGVfbW9kdWxlc1xcXFx3b3JrZXItbG9hZGVyXFxcXGNyZWF0ZUlubGluZVdvcmtlci5qc1wiKShcIi8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcXG4vKioqKioqLyBcXHQvLyBUaGUgbW9kdWxlIGNhY2hlXFxuLyoqKioqKi8gXFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXFxuLyoqKioqKi8gXFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0XFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXFxuLyoqKioqKi8gXFx0XFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXFxuLyoqKioqKi8gXFx0XFx0XFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHRcXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxcbi8qKioqKiovIFxcdFxcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcXG4vKioqKioqLyBcXHRcXHRcXHRleHBvcnRzOiB7fSxcXG4vKioqKioqLyBcXHRcXHRcXHRpZDogbW9kdWxlSWQsXFxuLyoqKioqKi8gXFx0XFx0XFx0bG9hZGVkOiBmYWxzZVxcbi8qKioqKiovIFxcdFxcdH07XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHRcXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cXG4vKioqKioqLyBcXHRcXHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdFxcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcXG4vKioqKioqLyBcXHRcXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdFxcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXFxuLyoqKioqKi8gXFx0XFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xcbi8qKioqKiovIFxcdH1cXG4vKioqKioqL1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcXG4vKioqKioqLyBcXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcXG4vKioqKioqLyBcXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cXG4vKioqKioqLyBcXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcXFwiXFxcIjtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xcbi8qKioqKiovIFxcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xcbi8qKioqKiovIH0pXFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cXG4vKioqKioqLyAoW1xcbi8qIDAgKi9cXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcXG5cXG5cXHQvKipcXHJcXG5cXHQgKiBDb2RlIGZvcm1hdCB3ZWItd29ya2VyXFxyXFxuXFx0ICogQHBhcmFtIGV2ZW50XFxyXFxuXFx0ICovXFxyXFxuXFx0Ly8gdmFyIGhpZ2hsaWdodEpzb24oKVxcclxcblxcdHZhciBoaWdobGlnaHRKc29uID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcXHJcXG5cXHRcXHJcXG5cXHRvbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xcclxcblxcdCAgdmFyIGNvZGUgPSBldmVudC5kYXRhO1xcclxcblxcdCAgLy8gaW1wb3J0U2NyaXB0cygnanNvbi1wYXJzZS5qcycpO1xcclxcblxcdCAgdmFyIHJlc3VsdCA9IGhpZ2hsaWdodEpzb24oY29kZSwge2V4cGFuZGVkOiB0cnVlfSk7XFxyXFxuXFx0ICAvLyB2YXIgcmVzdWx0ID1KU09OLnN0cmluZ2lmeShjb2RlKTtcXHJcXG5cXHQgIHBvc3RNZXNzYWdlKHJlc3VsdCk7XFxyXFxuXFx0fTtcXHJcXG5cXG5cXG4vKioqLyB9LFxcbi8qIDEgKi9cXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcXG5cXG5cXHR2YXIgcHJlZml4ID0gJ3RtLWNvZGUnO1xcclxcblxcdFxcclxcblxcdHZhciBnZXRFeHBhbmRlckNsYXNzZXMgPSBmdW5jdGlvbiAoZXhwYW5kZWQpIHtcXHJcXG5cXHRcXHRpZiAoIWV4cGFuZGVkKSB7XFxyXFxuXFx0XFx0XFx0cmV0dXJuICdleHBhbmRlZCBjb2xsYXBzZWQgaGlkZGVuJztcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFx0cmV0dXJuICdleHBhbmRlZCc7XFxyXFxuXFx0fTtcXHJcXG5cXHRcXHJcXG5cXHR2YXIgZW5jb2RlID0gZnVuY3Rpb24gKHZhbHVlKSB7XFxyXFxuXFx0XFx0cmV0dXJuIFsnPHNwYW4+JywgdmFsdWUsICc8L3NwYW4+J10uam9pbignJyk7XFxyXFxuXFx0fTtcXHJcXG5cXHRcXHJcXG5cXHR2YXIgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlLCB0eXBlLCBleHBhbmRlckNsYXNzZXMpIHtcXHJcXG5cXHRcXHR2YXIga2xhc3MgPSAnb2JqZWN0JyxcXHJcXG5cXHRcXHRcXHRvcGVuID0gJ3snLFxcclxcblxcdFxcdFxcdGNsb3NlID0gJ30nO1xcclxcblxcdFxcclxcblxcdFxcdGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xcclxcblxcdFxcdFxcdGtsYXNzID0gJ2FycmF5JztcXHJcXG5cXHRcXHRcXHRvcGVuID0gJ1snO1xcclxcblxcdFxcdFxcdGNsb3NlID0gJ10nO1xcclxcblxcdFxcdH1cXHJcXG5cXHRcXHJcXG5cXHRcXHRpZiAodmFsdWUgPT09IG51bGwpIHtcXHJcXG5cXHRcXHRcXHRyZXR1cm4gW1xcclxcblxcdFxcdFxcdFxcdCc8bGk+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcImtleVxcXCI+XFxcIicsIGVuY29kZShrZXkpLCAnXFxcIjogPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJudWxsXFxcIj5cXFwiJywgZW5jb2RlKHZhbHVlKSwgJ1xcXCI8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHRcXHQnPC9saT4nXFxyXFxuXFx0XFx0XFx0XS5qb2luKCcnKTtcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFxyXFxuXFx0XFx0aWYgKHR5cGUgPT0gJ29iamVjdCcpIHtcXHJcXG5cXHRcXHRcXHRyZXR1cm4gW1xcclxcblxcdFxcdFxcdFxcdCc8bGk+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcIicsIGV4cGFuZGVyQ2xhc3NlcywgJ1xcXCI+PC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJrZXlcXFwiPlxcXCInLCBlbmNvZGUoa2V5KSwgJ1xcXCI6IDwvc3Bhbj4gJyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcIm9wZW5cXFwiPicsIG9wZW4sICc8L3NwYW4+ICcsXFxyXFxuXFx0XFx0XFx0XFx0XFx0Jzx1bCBjbGFzcz1cXFwiJywga2xhc3MsICdcXFwiPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0anNvbjJodG1sKHZhbHVlLCBleHBhbmRlckNsYXNzZXMpLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8L3VsPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJjbG9zZVxcXCI+JywgY2xvc2UsICc8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHRcXHQnPC9saT4nXFxyXFxuXFx0XFx0XFx0XS5qb2luKCcnKTtcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFxyXFxuXFx0XFx0aWYgKHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnYm9vbGVhbicpIHtcXHJcXG5cXHRcXHRcXHRyZXR1cm4gW1xcclxcblxcdFxcdFxcdFxcdCc8bGk+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcImtleVxcXCI+XFxcIicsIGVuY29kZShrZXkpLCAnXFxcIjogPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCInLCB0eXBlLCAnXFxcIj4nLCBlbmNvZGUodmFsdWUpLCAnPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0JzwvbGk+J1xcclxcblxcdFxcdFxcdF0uam9pbignJyk7XFxyXFxuXFx0XFx0fVxcclxcblxcdFxcdHJldHVybiBbXFxyXFxuXFx0XFx0XFx0JzxsaT4nLFxcclxcblxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwia2V5XFxcIj5cXFwiJywgZW5jb2RlKGtleSksICdcXFwiOiA8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcIicsIHR5cGUsICdcXFwiPlxcXCInLCBlbmNvZGUodmFsdWUpLCAnXFxcIjwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdCc8L2xpPidcXHJcXG5cXHRcXHRdLmpvaW4oJycpO1xcclxcblxcdH07XFxyXFxuXFx0XFxyXFxuXFx0dmFyIGpzb24yaHRtbCA9IGZ1bmN0aW9uIChqc29uLCBleHBhbmRlckNsYXNzZXMpIHtcXHJcXG5cXHRcXHR2YXIgaHRtbCA9ICcnO1xcclxcblxcdFxcdGZvciAodmFyIGtleSBpbiBqc29uKSB7XFxyXFxuXFx0XFx0XFx0aWYgKCFqc29uLmhhc093blByb3BlcnR5KGtleSkpIHtcXHJcXG5cXHRcXHRcXHRcXHRjb250aW51ZTtcXHJcXG5cXHRcXHRcXHR9XFxyXFxuXFx0XFxyXFxuXFx0XFx0XFx0aHRtbCA9IFtodG1sLCBjcmVhdGVFbGVtZW50KGtleSwganNvbltrZXldLCB0eXBlb2YganNvbltrZXldLCBleHBhbmRlckNsYXNzZXMpXS5qb2luKCcnKTtcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFx0cmV0dXJuIGh0bWw7XFxyXFxuXFx0fTtcXHJcXG5cXHRcXHJcXG5cXHR2YXIgZ2V0SnNvblZpZXdlciA9IGZ1bmN0aW9uIChkYXRhLCBvcHRpb25zKSB7XFxyXFxuXFx0XFx0dHJ5IHtcXHJcXG5cXHRcXHRcXHRyZXR1cm4gW1xcclxcblxcdFxcdFxcdFxcdCc8dWwgY2xhc3M9XFxcIicsIHByZWZpeCwgJy1jb250YWluZXJcXFwiPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0anNvbjJodG1sKFtKU09OLnBhcnNlKGRhdGEpXSwgZ2V0RXhwYW5kZXJDbGFzc2VzKG9wdGlvbnMuZXhwYW5kZWQpKSxcXHJcXG5cXHRcXHRcXHRcXHQnPC91bD4nXFxyXFxuXFx0XFx0XFx0XS5qb2luKCcnKTtcXHJcXG5cXHRcXHR9IGNhdGNoIChlKSB7XFxyXFxuXFx0XFx0XFx0cmV0dXJuIFtcXHJcXG5cXHRcXHRcXHRcXHQnPGRpdiBjbGFzcz1cXFwiJywgcHJlZml4LCAnLWVycm9yXFxcIiA+JywgZS50b1N0cmluZygpLCAnIDwvZGl2PidcXHJcXG5cXHRcXHRcXHRdLmpvaW4oJycpO1xcclxcblxcdFxcdH1cXHJcXG5cXHR9O1xcclxcblxcdFxcclxcblxcdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSwgb3B0KSB7XFxyXFxuXFx0XFx0dmFyIGpzb24gPSAnJztcXHJcXG5cXHRcXHR2YXIgb3B0aW9ucyA9IG9wdCB8fCB7ZXhwYW5kZWQ6IHRydWV9O1xcclxcblxcdFxcdGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykge1xcclxcblxcdFxcdFxcdGpzb24gPSBkYXRhO1xcclxcblxcdFxcdH0gZWxzZSBpZiAodHlwZW9mIGRhdGEgPT0gJ29iamVjdCcpIHtcXHJcXG5cXHRcXHRcXHRqc29uID0gSlNPTi5zdHJpbmdpZnkoZGF0YSlcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFx0cmV0dXJuIGdldEpzb25WaWV3ZXIoanNvbiwgb3B0aW9ucyk7XFxyXFxuXFx0fTtcXHJcXG5cXG5cXG4vKioqLyB9XFxuLyoqKioqKi8gXSk7XFxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5kbFluQmhZMnM2THk4dmQyVmljR0ZqYXk5aWIyOTBjM1J5WVhBZ05EY3hZakV3WkRRMFkyRTNNamd3WlRFeE5HRWlMQ0ozWldKd1lXTnJPaTh2THk0dmMyTnlhWEIwY3k5aGNHa3RaWGh3Ykc5eVpYSXZkakl2YzNKakwyMXZaSFZzWlhNdmFHbG5hR3hwWjJoMFNuTnZiaTUzYjNKclpYSXVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZjMk55YVhCMGN5OWhjR2t0Wlhod2JHOXlaWEl2ZGpJdmMzSmpMMjF2WkhWc1pYTXZhbk52Ymkxd1lYSnpaUzVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEVzZFVKQlFXVTdRVUZEWmp0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdPMEZCUjBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdPenM3T3p0QlEzUkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzY1VOQlFXOURMR1ZCUVdVN1FVRkRia1E3UVVGRFFUdEJRVU5CT3pzN096czdPMEZEWWtFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFc1dVRkJWenRCUVVOWUxHRkJRVms3TzBGQlJWbzdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZGTzBGQlEwWTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNkMEpCUVhWQ08wRkJRM1pDTzBGQlEwRTdRVUZEUVN4SFFVRkZPMEZCUTBZN1FVRkRRVHRCUVVOQk8wRkJRMEVpTENKbWFXeGxJam9pYUdsbmFHeHBaMmgwU25OdmJpNTNiM0pyWlhJdWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUlnWEhRdkx5QlVhR1VnYlc5a2RXeGxJR05oWTJobFhHNGdYSFIyWVhJZ2FXNXpkR0ZzYkdWa1RXOWtkV3hsY3lBOUlIdDlPMXh1WEc0Z1hIUXZMeUJVYUdVZ2NtVnhkV2x5WlNCbWRXNWpkR2x2Ymx4dUlGeDBablZ1WTNScGIyNGdYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWh0YjJSMWJHVkpaQ2tnZTF4dVhHNGdYSFJjZEM4dklFTm9aV05ySUdsbUlHMXZaSFZzWlNCcGN5QnBiaUJqWVdOb1pWeHVJRngwWEhScFppaHBibk4wWVd4c1pXUk5iMlIxYkdWelcyMXZaSFZzWlVsa1hTbGNiaUJjZEZ4MFhIUnlaWFIxY200Z2FXNXpkR0ZzYkdWa1RXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwdVpYaHdiM0owY3p0Y2JseHVJRngwWEhRdkx5QkRjbVZoZEdVZ1lTQnVaWGNnYlc5a2RXeGxJQ2hoYm1RZ2NIVjBJR2wwSUdsdWRHOGdkR2hsSUdOaFkyaGxLVnh1SUZ4MFhIUjJZWElnYlc5a2RXeGxJRDBnYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjBnUFNCN1hHNGdYSFJjZEZ4MFpYaHdiM0owY3pvZ2UzMHNYRzRnWEhSY2RGeDBhV1E2SUcxdlpIVnNaVWxrTEZ4dUlGeDBYSFJjZEd4dllXUmxaRG9nWm1Gc2MyVmNiaUJjZEZ4MGZUdGNibHh1SUZ4MFhIUXZMeUJGZUdWamRYUmxJSFJvWlNCdGIyUjFiR1VnWm5WdVkzUnBiMjVjYmlCY2RGeDBiVzlrZFd4bGMxdHRiMlIxYkdWSlpGMHVZMkZzYkNodGIyUjFiR1V1Wlhod2IzSjBjeXdnYlc5a2RXeGxMQ0J0YjJSMWJHVXVaWGh3YjNKMGN5d2dYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWs3WEc1Y2JpQmNkRngwTHk4Z1JteGhaeUIwYUdVZ2JXOWtkV3hsSUdGeklHeHZZV1JsWkZ4dUlGeDBYSFJ0YjJSMWJHVXViRzloWkdWa0lEMGdkSEoxWlR0Y2JseHVJRngwWEhRdkx5QlNaWFIxY200Z2RHaGxJR1Y0Y0c5eWRITWdiMllnZEdobElHMXZaSFZzWlZ4dUlGeDBYSFJ5WlhSMWNtNGdiVzlrZFd4bExtVjRjRzl5ZEhNN1hHNGdYSFI5WEc1Y2JseHVJRngwTHk4Z1pYaHdiM05sSUhSb1pTQnRiMlIxYkdWeklHOWlhbVZqZENBb1gxOTNaV0p3WVdOclgyMXZaSFZzWlhOZlh5bGNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWJTQTlJRzF2WkhWc1pYTTdYRzVjYmlCY2RDOHZJR1Y0Y0c5elpTQjBhR1VnYlc5a2RXeGxJR05oWTJobFhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG1NZ1BTQnBibk4wWVd4c1pXUk5iMlIxYkdWek8xeHVYRzRnWEhRdkx5QmZYM2RsWW5CaFkydGZjSFZpYkdsalgzQmhkR2hmWDF4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV3SUQwZ1hDSmNJanRjYmx4dUlGeDBMeThnVEc5aFpDQmxiblJ5ZVNCdGIyUjFiR1VnWVc1a0lISmxkSFZ5YmlCbGVIQnZjblJ6WEc0Z1hIUnlaWFIxY200Z1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5Z3dLVHRjYmx4dVhHNWNiaThxS2lCWFJVSlFRVU5MSUVaUFQxUkZVaUFxS2x4dUlDb3FJSGRsWW5CaFkyc3ZZbTl2ZEhOMGNtRndJRFEzTVdJeE1HUTBOR05oTnpJNE1HVXhNVFJoWEc0Z0tpb3ZJaXdpTHlvcVhISmNiaUFxSUVOdlpHVWdabTl5YldGMElIZGxZaTEzYjNKclpYSmNjbHh1SUNvZ1FIQmhjbUZ0SUdWMlpXNTBYSEpjYmlBcUwxeHlYRzR2THlCMllYSWdhR2xuYUd4cFoyaDBTbk52YmlncFhISmNiblpoY2lCb2FXZG9iR2xuYUhSS2MyOXVJRDBnY21WeGRXbHlaU2duTGk5cWMyOXVMWEJoY25ObEp5azdYSEpjYmx4eVhHNXZibTFsYzNOaFoyVWdQU0JtZFc1amRHbHZiaWhsZG1WdWRDa2dlMXh5WEc0Z0lIWmhjaUJqYjJSbElEMGdaWFpsYm5RdVpHRjBZVHRjY2x4dUlDQXZMeUJwYlhCdmNuUlRZM0pwY0hSektDZHFjMjl1TFhCaGNuTmxMbXB6SnlrN1hISmNiaUFnZG1GeUlISmxjM1ZzZENBOUlHaHBaMmhzYVdkb2RFcHpiMjRvWTI5a1pTd2dlMlY0Y0dGdVpHVmtPaUIwY25WbGZTazdYSEpjYmlBZ0x5OGdkbUZ5SUhKbGMzVnNkQ0E5U2xOUFRpNXpkSEpwYm1kcFpua29ZMjlrWlNrN1hISmNiaUFnY0c5emRFMWxjM05oWjJVb2NtVnpkV3gwS1R0Y2NseHVmVHRjY2x4dVhHNWNibHh1THlvcUtpb3FLaW9xS2lvcUtpb3FLaW9xWEc0Z0tpb2dWMFZDVUVGRFN5QkdUMDlVUlZKY2JpQXFLaUF1TDNOamNtbHdkSE12WVhCcExXVjRjR3h2Y21WeUwzWXlMM055WXk5dGIyUjFiR1Z6TDJocFoyaHNhV2RvZEVwemIyNHVkMjl5YTJWeUxtcHpYRzRnS2lvZ2JXOWtkV3hsSUdsa0lEMGdNRnh1SUNvcUlHMXZaSFZzWlNCamFIVnVhM01nUFNBd1hHNGdLaW92SWl3aWRtRnlJSEJ5WldacGVDQTlJQ2QwYlMxamIyUmxKenRjY2x4dVhISmNiblpoY2lCblpYUkZlSEJoYm1SbGNrTnNZWE56WlhNZ1BTQm1kVzVqZEdsdmJpQW9aWGh3WVc1a1pXUXBJSHRjY2x4dVhIUnBaaUFvSVdWNGNHRnVaR1ZrS1NCN1hISmNibHgwWEhSeVpYUjFjbTRnSjJWNGNHRnVaR1ZrSUdOdmJHeGhjSE5sWkNCb2FXUmtaVzRuTzF4eVhHNWNkSDFjY2x4dVhIUnlaWFIxY200Z0oyVjRjR0Z1WkdWa0p6dGNjbHh1ZlR0Y2NseHVYSEpjYm5aaGNpQmxibU52WkdVZ1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVcElIdGNjbHh1WEhSeVpYUjFjbTRnV3ljOGMzQmhiajRuTENCMllXeDFaU3dnSnp3dmMzQmhiajRuWFM1cWIybHVLQ2NuS1R0Y2NseHVmVHRjY2x4dVhISmNiblpoY2lCamNtVmhkR1ZGYkdWdFpXNTBJRDBnWm5WdVkzUnBiMjRnS0d0bGVTd2dkbUZzZFdVc0lIUjVjR1VzSUdWNGNHRnVaR1Z5UTJ4aGMzTmxjeWtnZTF4eVhHNWNkSFpoY2lCcmJHRnpjeUE5SUNkdlltcGxZM1FuTEZ4eVhHNWNkRngwYjNCbGJpQTlJQ2Q3Snl4Y2NseHVYSFJjZEdOc2IzTmxJRDBnSjMwbk8xeHlYRzVjY2x4dVhIUnBaaUFvUVhKeVlYa3VhWE5CY25KaGVTaDJZV3gxWlNrcElIdGNjbHh1WEhSY2RHdHNZWE56SUQwZ0oyRnljbUY1Snp0Y2NseHVYSFJjZEc5d1pXNGdQU0FuV3ljN1hISmNibHgwWEhSamJHOXpaU0E5SUNkZEp6dGNjbHh1WEhSOVhISmNibHh5WEc1Y2RHbG1JQ2gyWVd4MVpTQTlQVDBnYm5Wc2JDa2dlMXh5WEc1Y2RGeDBjbVYwZFhKdUlGdGNjbHh1WEhSY2RGeDBKenhzYVQ0bkxGeHlYRzVjZEZ4MFhIUmNkQ2M4YzNCaGJpQmpiR0Z6Y3oxY0ltdGxlVndpUGx3aUp5d2daVzVqYjJSbEtHdGxlU2tzSUNkY0lqb2dQQzl6Y0dGdVBpY3NYSEpjYmx4MFhIUmNkRngwSnp4emNHRnVJR05zWVhOelBWd2liblZzYkZ3aVBsd2lKeXdnWlc1amIyUmxLSFpoYkhWbEtTd2dKMXdpUEM5emNHRnVQaWNzWEhKY2JseDBYSFJjZENjOEwyeHBQaWRjY2x4dVhIUmNkRjB1YW05cGJpZ25KeWs3WEhKY2JseDBmVnh5WEc1Y2NseHVYSFJwWmlBb2RIbHdaU0E5UFNBbmIySnFaV04wSnlrZ2UxeHlYRzVjZEZ4MGNtVjBkWEp1SUZ0Y2NseHVYSFJjZEZ4MEp6eHNhVDRuTEZ4eVhHNWNkRngwWEhSY2RDYzhjM0JoYmlCamJHRnpjejFjSWljc0lHVjRjR0Z1WkdWeVEyeGhjM05sY3l3Z0oxd2lQand2YzNCaGJqNG5MRnh5WEc1Y2RGeDBYSFJjZENjOGMzQmhiaUJqYkdGemN6MWNJbXRsZVZ3aVBsd2lKeXdnWlc1amIyUmxLR3RsZVNrc0lDZGNJam9nUEM5emNHRnVQaUFuTEZ4eVhHNWNkRngwWEhSY2RDYzhjM0JoYmlCamJHRnpjejFjSW05d1pXNWNJajRuTENCdmNHVnVMQ0FuUEM5emNHRnVQaUFuTEZ4eVhHNWNkRngwWEhSY2RDYzhkV3dnWTJ4aGMzTTlYQ0luTENCcmJHRnpjeXdnSjF3aVBpY3NYSEpjYmx4MFhIUmNkRngwWEhScWMyOXVNbWgwYld3b2RtRnNkV1VzSUdWNGNHRnVaR1Z5UTJ4aGMzTmxjeWtzWEhKY2JseDBYSFJjZEZ4MEp6d3ZkV3crSnl4Y2NseHVYSFJjZEZ4MFhIUW5QSE53WVc0Z1kyeGhjM005WENKamJHOXpaVndpUGljc0lHTnNiM05sTENBblBDOXpjR0Z1UGljc1hISmNibHgwWEhSY2RDYzhMMnhwUGlkY2NseHVYSFJjZEYwdWFtOXBiaWduSnlrN1hISmNibHgwZlZ4eVhHNWNjbHh1WEhScFppQW9kSGx3WlNBOVBTQW5iblZ0WW1WeUp5QjhmQ0IwZVhCbElEMDlJQ2RpYjI5c1pXRnVKeWtnZTF4eVhHNWNkRngwY21WMGRYSnVJRnRjY2x4dVhIUmNkRngwSnp4c2FUNG5MRnh5WEc1Y2RGeDBYSFJjZENjOGMzQmhiaUJqYkdGemN6MWNJbXRsZVZ3aVBsd2lKeXdnWlc1amIyUmxLR3RsZVNrc0lDZGNJam9nUEM5emNHRnVQaWNzWEhKY2JseDBYSFJjZEZ4MEp6eHpjR0Z1SUdOc1lYTnpQVndpSnl3Z2RIbHdaU3dnSjF3aVBpY3NJR1Z1WTI5a1pTaDJZV3gxWlNrc0lDYzhMM053WVc0K0p5eGNjbHh1WEhSY2RGeDBKend2YkdrK0oxeHlYRzVjZEZ4MFhTNXFiMmx1S0NjbktUdGNjbHh1WEhSOVhISmNibHgwY21WMGRYSnVJRnRjY2x4dVhIUmNkQ2M4YkdrK0p5eGNjbHh1WEhSY2RGeDBKenh6Y0dGdUlHTnNZWE56UFZ3aWEyVjVYQ0krWENJbkxDQmxibU52WkdVb2EyVjVLU3dnSjF3aU9pQThMM053WVc0K0p5eGNjbHh1WEhSY2RGeDBKenh6Y0dGdUlHTnNZWE56UFZ3aUp5d2dkSGx3WlN3Z0oxd2lQbHdpSnl3Z1pXNWpiMlJsS0haaGJIVmxLU3dnSjF3aVBDOXpjR0Z1UGljc1hISmNibHgwWEhRblBDOXNhVDRuWEhKY2JseDBYUzVxYjJsdUtDY25LVHRjY2x4dWZUdGNjbHh1WEhKY2JuWmhjaUJxYzI5dU1taDBiV3dnUFNCbWRXNWpkR2x2YmlBb2FuTnZiaXdnWlhod1lXNWtaWEpEYkdGemMyVnpLU0I3WEhKY2JseDBkbUZ5SUdoMGJXd2dQU0FuSnp0Y2NseHVYSFJtYjNJZ0tIWmhjaUJyWlhrZ2FXNGdhbk52YmlrZ2UxeHlYRzVjZEZ4MGFXWWdLQ0ZxYzI5dUxtaGhjMDkzYmxCeWIzQmxjblI1S0d0bGVTa3BJSHRjY2x4dVhIUmNkRngwWTI5dWRHbHVkV1U3WEhKY2JseDBYSFI5WEhKY2JseHlYRzVjZEZ4MGFIUnRiQ0E5SUZ0b2RHMXNMQ0JqY21WaGRHVkZiR1Z0Wlc1MEtHdGxlU3dnYW5OdmJsdHJaWGxkTENCMGVYQmxiMllnYW5OdmJsdHJaWGxkTENCbGVIQmhibVJsY2tOc1lYTnpaWE1wWFM1cWIybHVLQ2NuS1R0Y2NseHVYSFI5WEhKY2JseDBjbVYwZFhKdUlHaDBiV3c3WEhKY2JuMDdYSEpjYmx4eVhHNTJZWElnWjJWMFNuTnZibFpwWlhkbGNpQTlJR1oxYm1OMGFXOXVJQ2hrWVhSaExDQnZjSFJwYjI1ektTQjdYSEpjYmx4MGRISjVJSHRjY2x4dVhIUmNkSEpsZEhWeWJpQmJYSEpjYmx4MFhIUmNkQ2M4ZFd3Z1kyeGhjM005WENJbkxDQndjbVZtYVhnc0lDY3RZMjl1ZEdGcGJtVnlYQ0krSnl4Y2NseHVYSFJjZEZ4MFhIUnFjMjl1TW1oMGJXd29XMHBUVDA0dWNHRnljMlVvWkdGMFlTbGRMQ0JuWlhSRmVIQmhibVJsY2tOc1lYTnpaWE1vYjNCMGFXOXVjeTVsZUhCaGJtUmxaQ2twTEZ4eVhHNWNkRngwWEhRblBDOTFiRDRuWEhKY2JseDBYSFJkTG1wdmFXNG9KeWNwTzF4eVhHNWNkSDBnWTJGMFkyZ2dLR1VwSUh0Y2NseHVYSFJjZEhKbGRIVnliaUJiWEhKY2JseDBYSFJjZENjOFpHbDJJR05zWVhOelBWd2lKeXdnY0hKbFptbDRMQ0FuTFdWeWNtOXlYQ0lnUGljc0lHVXVkRzlUZEhKcGJtY29LU3dnSnlBOEwyUnBkajRuWEhKY2JseDBYSFJkTG1wdmFXNG9KeWNwTzF4eVhHNWNkSDFjY2x4dWZUdGNjbHh1WEhKY2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0b1pHRjBZU3dnYjNCMEtTQjdYSEpjYmx4MGRtRnlJR3B6YjI0Z1BTQW5KenRjY2x4dVhIUjJZWElnYjNCMGFXOXVjeUE5SUc5d2RDQjhmQ0I3Wlhod1lXNWtaV1E2SUhSeWRXVjlPMXh5WEc1Y2RHbG1JQ2gwZVhCbGIyWWdaR0YwWVNBOVBTQW5jM1J5YVc1bkp5a2dlMXh5WEc1Y2RGeDBhbk52YmlBOUlHUmhkR0U3WEhKY2JseDBmU0JsYkhObElHbG1JQ2gwZVhCbGIyWWdaR0YwWVNBOVBTQW5iMkpxWldOMEp5a2dlMXh5WEc1Y2RGeDBhbk52YmlBOUlFcFRUMDR1YzNSeWFXNW5hV1o1S0dSaGRHRXBYSEpjYmx4MGZWeHlYRzVjZEhKbGRIVnliaUJuWlhSS2MyOXVWbWxsZDJWeUtHcHpiMjRzSUc5d2RHbHZibk1wTzF4eVhHNTlPMXh5WEc1Y2JseHVYRzR2S2lvcUtpb3FLaW9xS2lvcUtpb3FLaXBjYmlBcUtpQlhSVUpRUVVOTElFWlBUMVJGVWx4dUlDb3FJQzR2YzJOeWFYQjBjeTloY0drdFpYaHdiRzl5WlhJdmRqSXZjM0pqTDIxdlpIVnNaWE12YW5OdmJpMXdZWEp6WlM1cWMxeHVJQ29xSUcxdlpIVnNaU0JwWkNBOUlERmNiaUFxS2lCdGIyUjFiR1VnWTJoMWJtdHpJRDBnTUZ4dUlDb3FMeUpkTENKemIzVnlZMlZTYjI5MElqb2lJbjA9XCIsIF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJoaWdobGlnaHRKc29uLndvcmtlci5qc1wiKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2hpZ2hsaWdodEpzb24ud29ya2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTAzNDM5MTMvaG93LXRvLWNyZWF0ZS1hLXdlYi13b3JrZXItZnJvbS1hLXN0cmluZ1xyXG5cclxudmFyIFVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTDtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihjb250ZW50LCB1cmwpIHtcclxuXHR0cnkge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0dmFyIGJsb2I7XHJcblx0XHRcdHRyeSB7IC8vIEJsb2JCdWlsZGVyID0gRGVwcmVjYXRlZCwgYnV0IHdpZGVseSBpbXBsZW1lbnRlZFxyXG5cdFx0XHRcdHZhciBCbG9iQnVpbGRlciA9IHdpbmRvdy5CbG9iQnVpbGRlciB8fCB3aW5kb3cuV2ViS2l0QmxvYkJ1aWxkZXIgfHwgd2luZG93Lk1vekJsb2JCdWlsZGVyIHx8IHdpbmRvdy5NU0Jsb2JCdWlsZGVyO1xyXG5cdFx0XHRcdGJsb2IgPSBuZXcgQmxvYkJ1aWxkZXIoKTtcclxuXHRcdFx0XHRibG9iLmFwcGVuZChjb250ZW50KTtcclxuXHRcdFx0XHRibG9iID0gYmxvYi5nZXRCbG9iKCk7XHJcblx0XHRcdH0gY2F0Y2goZSkgeyAvLyBUaGUgcHJvcG9zZWQgQVBJXHJcblx0XHRcdFx0YmxvYiA9IG5ldyBCbG9iKFtjb250ZW50XSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG5ldyBXb3JrZXIoVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKSk7XHJcblx0XHR9IGNhdGNoKGUpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBXb3JrZXIoJ2RhdGE6YXBwbGljYXRpb24vamF2YXNjcmlwdCwnICsgZW5jb2RlVVJJQ29tcG9uZW50KGNvbnRlbnQpKTtcclxuXHRcdH1cclxuXHR9IGNhdGNoKGUpIHtcclxuXHRcdHJldHVybiBuZXcgV29ya2VyKHVybCk7XHJcblx0fVxyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vd29ya2VyLWxvYWRlci9jcmVhdGVJbmxpbmVXb3JrZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZnVuY3Rpb24gc2xpY2sodGltZXMpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHR2YXIgc2VsZWN0b3IgPSAnI3NsaWRlci0nO1xyXG5cdFxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdGltZXM7IGkrKykge1xyXG5cdFx0JChzZWxlY3RvciArIGkpLmxlbmd0aCAmJiAkKHNlbGVjdG9yICsgaSkuc2xpY2soe1xyXG5cdFx0XHRkb3RzOiBmYWxzZSxcclxuXHRcdFx0aW5maW5pdGU6IGZhbHNlLFxyXG5cdFx0XHRzcGVlZDogMzAwLFxyXG5cdFx0XHRzbGlkZXNUb1Nob3c6IDMsXHJcblx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cdFx0XHR2YXJpYWJsZVdpZHRoOiB0cnVlLFxyXG5cdFx0XHRhdXRvcGxheTogZmFsc2UsXHJcblx0XHRcdHJlc3BvbnNpdmU6IFtcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRicmVha3BvaW50OiAxMjAwLFxyXG5cdFx0XHRcdFx0c2V0dGluZ3M6IHtcclxuXHRcdFx0XHRcdFx0dmFyaWFibGVXaWR0aDogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0c2xpZGVzVG9TaG93OiAyLFxyXG5cdFx0XHRcdFx0XHRzbGlkZXNUb1Njcm9sbDogMSxcclxuXHRcdFx0XHRcdFx0aW5maW5pdGU6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRkb3RzOiBmYWxzZVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0YnJlYWtwb2ludDogODAwLFxyXG5cdFx0XHRcdFx0c2V0dGluZ3M6IHtcclxuXHRcdFx0XHRcdFx0dmFyaWFibGVXaWR0aDogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0c2xpZGVzVG9TaG93OiAxLFxyXG5cdFx0XHRcdFx0XHRzbGlkZXNUb1Njcm9sbDogMVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiB1bnNsaWNrKHRpbWVzKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdGltZXM7IGkrKykge1xyXG5cdFx0dmFyIHNlbGVjdG9yID0gJyNzbGlkZXItJyArIGk7XHJcblx0XHQkKHNlbGVjdG9yKSAmJiAkKHNlbGVjdG9yKS5sZW5ndGggJiYgJChzZWxlY3Rvcikuc2xpY2soJ3Vuc2xpY2snKTtcclxuXHR9XHJcblx0Y29uc29sZS5pbmZvKCdjbGVhcmVkJyk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdHNldDogc2xpY2ssXHJcblx0cmVtb3ZlOiB1bnNsaWNrXHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9zbGlkZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwiZGlzY292ZXJ5LnYyLmV2ZW50cy5nZXRcIjoge1xuXHRcdFwiZXZlbnRzXCI6IHtcblx0XHRcdFwib2JqZWN0XCI6IHtcblx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcInRpdGxlXCI6IFwiRXZlbnRcIixcblx0XHRcdFx0XHRcImNvcHlCdG5cIjoge1xuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IHRydWVcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFwicmVxdWVzdFwiOiBcImh0dHA6Ly93d3cuZ29vZ2xlLmNvbVwiLFxuXHRcdFx0XHRcdFwiaW5kZXhcIjogMFxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJpbWFnZXNcIjoge1xuXHRcdFx0XHRcIm9iamVjdFwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwidGl0bGVcIjogXCJpbWFnZVwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFwiaW5kZXhcIjogMSxcblx0XHRcdFx0XHRcImNvbGxhcHNlZFwiOiB0cnVlXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcInNhbGVzXCI6IHtcblx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcImluZGV4XCI6IDJcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdFwidmVudWVzXCI6IHtcblx0XHRcdFx0XCJvYmplY3RcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcInRpdGxlXCI6IFwidmVudWVcIixcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogMFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJjaXR5XCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiAyXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcInN0YXRlXCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiAxXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImNvdW50cnlcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDFcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiYWRkcmVzc1wiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogM1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJsb2NhdGlvblwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogNFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcImluZGV4XCI6IDNcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdFwiZGF0ZXNcIjoge1xuXHRcdFx0XHRcInRpbWV6b25lXCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiAwXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcInN0YXJ0XCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiAxLFxuXHRcdFx0XHRcdFx0XCJjb3B5QnRuXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJkYXRlVGltZVwiOiB0cnVlXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XCJjb2xsYXBzZWRcIjogdHJ1ZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJzdGF0dXNcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDMsXG5cdFx0XHRcdFx0XHRcImNvbGxhcHNlZFwiOiB0cnVlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImVuZFwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogMixcblx0XHRcdFx0XHRcdFwiY29weUJ0blwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiZGF0ZVRpbWVcIjogdHJ1ZVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwiY29sbGFwc2VkXCI6IHRydWVcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XCJpbmRleFwiOiA0LFxuXHRcdFx0XHRcdFwiYWxsSW5zaWRlXCI6IHRydWVcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFwiY29sbGFwc2VkXCI6IHRydWUsXG5cdFx0XHRcdFwiaW5kZXhcIjogMFxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0XCJwYWdlXCI6IHtcblx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFwiaW5kZXhcIjogMSxcblx0XHRcdFx0XCJjb2xsYXBzZWRcIjogZmFsc2Vcblx0XHRcdH1cblx0XHR9LFxuXHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcIm1ldGhvZFwiOiBcImRpc2NvdmVyeS52Mi5ldmVudHMuZ2V0XCJcblx0XHR9XG5cdH0sXG5cdFwiZGlzY292ZXJ5LnYyLmF0dHJhY3Rpb25zLmdldFwiOiB7XG5cdFx0XCJhdHRyYWN0aW9uc1wiOiB7XG5cdFx0XHRcIm9iamVjdFwiOiB7XG5cdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XCJpbmRleFwiOiAwXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcImltYWdlc1wiOiB7XG5cdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XCJpbmRleFwiOiAyXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcImNsYXNzaWZpY2F0aW9uc1wiOiB7XG5cdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XCJpbmRleFwiOiAxXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcImluZGV4XCI6IDBcblx0XHRcdH1cblx0XHR9LFxuXHRcdFwicGFnZVwiOiB7XG5cdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcImluZGV4XCI6IDFcblx0XHRcdH1cblx0XHR9LFxuXHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcIm1ldGhvZENvbmZpZ1wiOiB0cnVlXG5cdFx0fVxuXHR9LFxuXHRcIl9HTE9CQUxfQ09ORklHXCI6IHtcblx0XHRcImNvcHlCdG5cIjoge1xuXHRcdFx0XCJpZFwiOiB0cnVlXG5cdFx0fSxcblx0XHRcImRlcHJlY2F0ZWRcIjogW1xuXHRcdFx0XCJfbGlua3NcIlxuXHRcdF0sXG5cdFx0XCJ1bndyYXBwXCI6IFtcblx0XHRcdFwiX2VtYmVkZGVkXCJcblx0XHRdXG5cdH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbmZpZy5qc29uXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBOVU0gPSAxMjtcclxudmFyIFBSRUZJWCA9ICdjb2xvci0nO1xyXG5cclxudmFyIGNvbG9ycyA9IGdldENvbG9ycyhOVU0sIFBSRUZJWCk7XHJcblxyXG5mdW5jdGlvbiBnZXRDb2xvcnMobnVtLCBjbGFzc1ByZWZpeCkge1xyXG5cdHZhciBjb2xvcnMgPSBuZXcgQXJyYXkobnVtKTtcclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb2xvcnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdGNvbG9yc1tpXSA9IGNsYXNzUHJlZml4ICsgKGkgKyAxKTtcclxuXHR9XHJcblx0cmV0dXJuIGNvbG9ycztcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UmFuZG9tQ29sb3IoY29sb3IpIHtcclxuXHR2YXIgcmFuZG9tTnVtYmVyO1xyXG5cdGRvIHtcclxuXHRcdHJhbmRvbU51bWJlciA9IGdldFJhbmRvbUludCgxLCBjb2xvcnMubGVuZ3RoKTtcclxuXHR9IHdoaWxlIChQUkVGSVggKyByYW5kb21OdW1iZXIgPT09IGNvbG9yKTtcclxuXHJcblx0cmV0dXJuIFBSRUZJWCArIHJhbmRvbU51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIG1pbiAoaW5jbHVzaXZlKSBhbmQgbWF4IChpbmNsdXNpdmUpXHJcbiAqIFVzaW5nIE1hdGgucm91bmQoKSB3aWxsIGdpdmUgeW91IGEgbm9uLXVuaWZvcm0gZGlzdHJpYnV0aW9uIVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UmFuZG9tSW50KG1pbiwgbWF4KSB7XHJcblx0cmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Y29sb3JzOiBjb2xvcnMsXHJcblx0Z2V0UmFuZG9tQ29sb3I6IGdldFJhbmRvbUNvbG9yXHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9jb2xvckNsYXNzZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xyXG5cdHJlcXVpcmUoJy4vY3VzdG9tU2VsZWN0LmNvbXBvbmVudCcpO1xyXG5cdHJlcXVpcmUoJy4vcG9wdXBzL2Vycm9yLmNvbXBvbmVudCcpO1xyXG5cdHJlcXVpcmUoJy4vcGFuZWxzL3BhbmVsR3JvdXAuY29tcG9uZW50Jyk7XHJcblx0cmVxdWlyZSgnLi9wYW5lbHMvcGFuZWwuY29tcG9uZW50Jyk7XHJcblx0cmVxdWlyZSgnLi9wYW5lbHMvcGFnaW5hdGlvbi5jb21wb25lbnQnKTtcclxuXHRyZXF1aXJlKCcuL3BhbmVscy9wYW5lbEhlYWRpbmcuY29tcG9uZW50Jyk7XHJcblx0cmVxdWlyZSgnLi9wYW5lbHMvb2JqZWN0UGFuZWxCb2R5LmNvbXBvbmVudCcpO1xyXG5cdHJlcXVpcmUoJy4vcGFuZWxzL2FycmF5UGFuZWxCb2R5LmNvbXBvbmVudCcpO1xyXG59KCkpO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXHJcbiAqIEN1c3RvbSBTZWxlY3QgY29tcG9uZW50XHJcbiAqL1xyXG52YXIgc2VsZjtcclxuXHJcbi8qKlxyXG4gKiBDdXN0b20gU2VsZWN0IFZpZXctTW9kZWxcclxuICogQHBhcmFtIHBhcmFtc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIEN1c3RvbVNlbGVjdChwYXJhbXMpIHtcclxuICBzZWxmID0gdGhpcztcclxuXHJcbiAgdGhpcy5hbmltYXRpb25TcGVlZCA9IHBhcmFtcy5hbmltYXRpb25TcGVlZCB8fCAyMDA7XHJcblx0dGhpcy5jdXJlbnRTZWxlY3REYXRhID0gcGFyYW1zLmRhdGEgfHwgbnVsbDtcclxuXHR0aGlzLm9uRm9jdXMgPSBwYXJhbXMuZm9jdXMgfHwgbnVsbDtcclxuXHRcclxuICAvL29ic2VydmFibGVzXHJcbiAgdGhpcy5zZWxlY3RNb2RlbCA9IHR5cGVvZiBwYXJhbXMub3B0aW9ucyAhPT0nZnVuY3Rpb24nID8ga28ub2JzZXJ2YWJsZUFycmF5KHBhcmFtcy5vcHRpb25zKTogIHBhcmFtcy5vcHRpb25zO1xyXG4gIHRoaXMucGxhY2Vob2xkZXIgPSBrby5vYnNlcnZhYmxlKHBhcmFtcy5wbGFjZWhvbGRlciB8fCAnJyk7XHJcbiAgdGhpcy5vbnNlbGVjdCA9IHBhcmFtcy5vbnNlbGVjdCB8fCBmdW5jdGlvbiAoaXRlbSkgeyBjb25zb2xlLmxvZyhpdGVtICsnc2VsZWN0ZWQhJyl9O1xyXG4gIHRoaXMuc2VsZWN0ZWQgPSBrby5vYnNlcnZhYmxlKHRoaXMuc2VsZWN0TW9kZWwoKVswXSk7XHJcbiAgdGhpcy5pc09uZU9wdGlvbiA9IGtvLnB1cmVDb21wdXRlZChmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RNb2RlbCgpLmxlbmd0aCA8IDI7IC8vIG1vcmUgdGhhbiBvbmUgb3B0aW9uXHJcbiAgfSwgdGhpcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRFbGVtZW50KGV2ZW50KSB7XHJcbiAgdmFyIHBhcmVudCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkucGFyZW50cygnLmpzLWN1c3RvbS1zZWxlY3QnKTtcclxuICByZXR1cm4ge1xyXG4gICAgd3JhcHBlcjogcGFyZW50LmZpbmQoJy5qcy1jdXN0b20tc2VsZWN0LXdyYXBwZXInKSxcclxuICAgIGxheWVyOiBwYXJlbnQuZmluZCgnLmpzLWN1c3RvbS1zZWxlY3QtbGF5ZXInKVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEN1c3RvbSBTZWxlY3QgVmlldy1Nb2RlbCBtZXRob2RcclxuICogQHBhcmFtIHZpZXdNb2RlbFxyXG4gKiBAcGFyYW0gZXZlbnRcclxuICovXHJcbkN1c3RvbVNlbGVjdC5wcm90b3R5cGUuc2xpZGVUb2dnbGUgPSBmdW5jdGlvbih2aWV3TW9kZWwsIGV2ZW50KSB7XHJcblx0Ly8gZWxlbSBpbiBmb2N1cyBlbXVsYXRpb25cclxuXHR0aGlzLm9uRm9jdXMgJiYgdGhpcy5vbkZvY3VzKHRoaXMuY3VyZW50U2VsZWN0RGF0YSk7XHJcblxyXG5cdGlmICh0aGlzLmlzT25lT3B0aW9uKCkpIHtyZXR1cm4gZmFsc2U7fVxyXG4gIHZhciBlbCA9IGZpbmRFbGVtZW50KGV2ZW50KTtcclxuICAgIGVsLndyYXBwZXIuc2xpZGVUb2dnbGUodmlld01vZGVsLmFuaW1hdGlvblNwZWVkKTtcclxuICAgIGVsLmxheWVyLnRvZ2dsZUNsYXNzKCdoaWRkZW4nKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDdXN0b20gU2VsZWN0IFZpZXctTW9kZWwgbWV0aG9kXHJcbiAqIEBwYXJhbSBpdGVtXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuQ3VzdG9tU2VsZWN0LnByb3RvdHlwZS5zZWxlY3RJdGVtID0gZnVuY3Rpb24gKGl0ZW0sIGV2ZW50KSB7XHJcbiAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gIHRoaXMuc2VsZWN0ZWQoaXRlbSk7XHJcbiAgLy8gcnVuIGhhbmRsZXJcclxuICB0aGlzLm9uc2VsZWN0KGl0ZW0pO1xyXG5cdC8vIHNsaWRlIHVwXHJcbiAgdGhpcy5zbGlkZVRvZ2dsZShzZWxmLCBldmVudCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2N1c3RvbS1zZWxlY3QnLCB7XHJcbiAgdmlld01vZGVsOiBDdXN0b21TZWxlY3QsXHJcbiAgdGVtcGxhdGU6IChbXHJcbiAgICAnPGRpdiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdCBqcy1jdXN0b20tc2VsZWN0XCI+JyxcclxuICAgICAgJzxkaXYgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3Qtd3JhcHBlclwiPicsXHJcbiAgICAgICAgJzxzZWxlY3QgZGF0YS1iaW5kPVwib3B0aW9uczogc2VsZWN0TW9kZWwsIG9wdGlvbnNUZXh0OiBcXCduYW1lXFwnLCB2YWx1ZTogc2VsZWN0ZWRcIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9fZmllbGRcIiBuYW1lPVwiYXBpLWV4cC1tZXRob2RcIj48L3NlbGVjdD4nLFxyXG4gICAgICAgICc8c3BhbiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9fcGxhY2Vob2xkZXJcIj4nLFxyXG4gICAgICAgICAgJzxpbnB1dCBkYXRhLWJpbmQ9XCJldmVudDoge2NsaWNrOiBzbGlkZVRvZ2dsZX0sIGF0dHI6IHt2YWx1ZTogc2VsZWN0ZWQoKS5uYW1lLCBkaXNhYmxlZDogaXNPbmVPcHRpb259XCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIlwiIHJlYWRvbmx5PVwiXCI+JyxcclxuICAgICAgICAgICc8YiBkYXRhLWJpbmQ9XCJjc3M6IHtoaWRkZW46IGlzT25lT3B0aW9ufVwiIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19jaGV2cm9uXCI+Jm5ic3A7PC9iPicsXHJcbiAgICAgICAgJzwvc3Bhbj4nLFxyXG4gICAgICAgICc8dWwgZGF0YS1iaW5kPVwiZm9yZWFjaDogc2VsZWN0TW9kZWxcIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9fbGlzdCBqcy1jdXN0b20tc2VsZWN0LXdyYXBwZXJcIj4nLFxyXG4gICAgICAgICAgJzxsaSBkYXRhLWJpbmQ9XCJjc3M6IHtcXCdhY3RpdmVcXCc6IGNoZWNrZWR9XCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2l0ZW1cIj4nLFxyXG4gICAgICAgICAgICAnPGJ1dHRvbiBkYXRhLWJpbmQ9XCJldmVudDoge2NsaWNrOiAkcGFyZW50LnNlbGVjdEl0ZW0uYmluZCgkcGFyZW50KX0sIHRleHQ6IG5hbWUsIGNzczoge1xcJ2FjdGl2ZVxcJzogY2hlY2tlZCgpfSwgYXR0cjoge1xcJ2RhdGEtdmFsdWVcXCc6IG5hbWV9XCIgIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19pdGVtLWxhYmVsXCIgaHJlZj1cIiNcIj48L2J1dHRvbj4nLFxyXG4gICAgICAgICAgICAvLyAnPHNwYW4gZGF0YS1iaW5kPVwiaWY6IGxpbmtcIj4nLFxyXG4gICAgICAgICAgICBcdCc8YSBkYXRhLWJpbmQ9XCJhdHRyOiB7aHJlZjogbGlua30sIGNzczoge1xcJ2hpZGRlblxcJzogIWxpbmt9XCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2l0ZW0tbGlua1wiIHRhcmdldD1cIl9ibGFua1wiPiZuYnNwOzwvYT4nLFxyXG4gICAgICAgICAgICAvLyAnPC9zcGFuPicsXHJcbiAgICAgICAgICAnPC9saT4nLFxyXG4gICAgICAgICc8L3VsPicsXHJcbiAgICAgICc8L2Rpdj4nLFxyXG4gICAgICAnPGRpdiBkYXRhLWJpbmQ9XCJjbGljazogc2xpZGVUb2dnbGVcIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdC1sYXllciBqcy1jdXN0b20tc2VsZWN0LWxheWVyIGhpZGRlblwiPjwvZGl2PicsXHJcbiAgICAnPC9kaXY+J1xyXG4gIF0pLmpvaW4oJycpXHJcbn0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvY3VzdG9tU2VsZWN0LmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcblxuZnVuY3Rpb24gRXJyb3JQb3BVcChwYXJhbXMpIHtcblx0c2VsZiA9IHRoaXM7XG5cdHRoaXMuc3RhdHVzID0ga28ub2JzZXJ2YWJsZSgnJyk7XG5cdHRoaXMuc3RhdHVzVGV4dCA9IGtvLm9ic2VydmFibGUoJycpO1xuXHR0aGlzLmRldGFpbHMgPSBrby5vYnNlcnZhYmxlKGBgKTtcblx0cGFyYW1zLm9uRXJyb3Iuc3Vic2NyaWJlKGZ1bmN0aW9uKGVycm9yT2JqKSB7XG5cdFx0dGhpcy5zdGF0dXMoT2JqZWN0LmdldFByb3AoZXJyb3JPYmosICcucmVzcG9uc2VKU09OLmVycm9yc1swXS5zdGF0dXMnKSB8fCBlcnJvck9iai5zdGF0dXMgfHwgJ3Vubm93bicpO1xuXHRcdHRoaXMuc3RhdHVzVGV4dChPYmplY3QuZ2V0UHJvcChlcnJvck9iaiwgJy5yZXNwb25zZUpTT04uZXJyb3JzWzBdLnN0YXR1c1RleHQnKSB8fCBlcnJvck9iai5zdGF0dXNUZXh0IHx8ICcnKTtcblx0XHR0aGlzLmRldGFpbHMoT2JqZWN0LmdldFByb3AoZXJyb3JPYmosICcucmVzcG9uc2VKU09OLmVycm9yc1swXS5kZXRhaWwnKSB8fCAndW5ub3duJyk7XG5cdFx0dGhpcy50b2dnbGVQb3BVcCgpO1xuXHR9LCB0aGlzLCAnZXJyb3InKTtcbn1cblxuRXJyb3JQb3BVcC5wcm90b3R5cGUudG9nZ2xlUG9wVXAgPSBmdW5jdGlvbiAoKSB7XG5cdCQoJyNlcnJvci1tb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2Vycm9yLXBvcC11cCcsIHtcblx0dmlld01vZGVsOiBFcnJvclBvcFVwLFxuXHR0ZW1wbGF0ZTpgXG5cdFx0PHNlY3Rpb24gaWQ9XCJlcnJvci1tb2RhbFwiIGNsYXNzPVwibW9kYWwgZmFkZVwiIHRhYmluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCI+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nXCIgcm9sZT1cImRvY3VtZW50XCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50IGVycm9yLXBvcC11cFwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cblx0XHRcdFx0XHRcdDxoMiBjbGFzcz1cImVycm9yLXRpdGxlXCI+RXJyb3IgPHNwYW4gZGF0YS1iaW5kPVwidGV4dDogc3RhdHVzXCI+PC9zcGFuPjogPHNwYW4gZGF0YS1iaW5kPVwidGV4dDogc3RhdHVzVGV4dFwiPjwvc3Bhbj48L2gyPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XG5cdFx0XHRcdFx0XHQ8cCBkYXRhLWJpbmQ9XCJ0ZXh0OiBkZXRhaWxzXCIgY2xhc3M9XCJlcnJvci1kZXRhaWxzXCI+PC9wPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cblx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1hY2NlcHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPk9rPC9idXR0b24+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PjwhLS0gLy5tb2RhbC1jb250ZW50IC0tPlxuXHRcdFx0PC9kaXY+PCEtLSAvLm1vZGFsLWRpYWxvZyAtLT5cblx0XHQ8L3NlY3Rpb24+PCEtLSAvLm1vZGFsIC0tPlxuYH0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BvcHVwcy9lcnJvci5jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxudG9kbzogc2luZ2xlIC0gZmlyc3QgbG9hZDtcclxudG9kbzogcGFnaW5nIChwYXJhbXMpXHJcbnRvZG86IHVsciBwYXJzZVxyXG50b2RvOiBmaWVsZHMgdmFsaWRhdGlvblxyXG4gKi9cclxuXHJcbnZhciBzZWxmO1xyXG5cclxuZnVuY3Rpb24gQ2FyZEdyb3VwKHBhcmFtcykge1xyXG5cdHNlbGYgPSB0aGlzO1xyXG5cdHRoaXMudXJsID0gdGhpcy51cmwgfHwgcGFyYW1zLnVybDtcclxuXHR0aGlzLmNvbmZpZyA9IGdldENvbmZpZyhwYXJhbXMpO1xyXG5cdHRoaXMuZGF0YSA9IHByZXBhcmVEYXRhKHBhcmFtcywgdGhpcy5jb25maWcuX0NPTkZJRyk7XHJcblx0dGhpcy5ncm91cEluZGV4ID0gcGFyYW1zLmdyb3VwSW5kZXggfHwgMDtcclxuXHR0aGlzLnNlY3Rpb25JbmRleCA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUocGFyYW1zLnNlY3Rpb25JbmRleCk7XHJcblx0dGhpcy5jb2xvckNsYXNzID0gcGFyYW1zLmNvbG9yQ2xhc3M7XHJcblx0dGhpcy5nZXRNb3JlID0gcGFyYW1zLmdldE1vcmU7XHJcblx0dGhpcy5wYWdlID0gZ2V0UGFnaW5nSW5mbyhwYXJhbXMsIHRoaXMuZGF0YS5wYWdlLCB0aGlzLnVybCk7XHJcblx0dGhpcy5jb2xsYXBzZUlkID0gZ2V0Q29sbGFwc2VJZCgpO1xyXG5cdHRoaXMuX2hhc0V2ZW50c1BhbmVsID0gZmFsc2U7XHJcbn1cclxuXHJcbkNhcmRHcm91cC5wcm90b3R5cGUuc29ydEJ5Q29uZmlnID0gZnVuY3Rpb24gKGEsIGIpIHtcclxuXHRpZiAodGhpcy5jb25maWcgJiYgdGhpcy5jb25maWdbYS5rZXldICYmIHRoaXMuY29uZmlnW2Iua2V5XSAmJiB0aGlzLmNvbmZpZ1thLmtleV0uX0NPTkZJRyAmJiB0aGlzLmNvbmZpZ1tiLmtleV0uX0NPTkZJRykge1xyXG5cdFx0dmFyIGkxID0gdGhpcy5jb25maWdbYS5rZXldLl9DT05GSUcuaW5kZXg7XHJcblx0XHR2YXIgaTIgPSB0aGlzLmNvbmZpZ1tiLmtleV0uX0NPTkZJRy5pbmRleDtcclxuXHRcdHJldHVybiBpMSAtIGkyO1xyXG5cdH1cclxuXHRyZXR1cm4gMDtcclxufTtcclxuXHJcbkNhcmRHcm91cC5wcm90b3R5cGUuY2hlY2tJZkhhc0V2ZW50c0xpc3QgPSBmdW5jdGlvbiAoa2V5KSB7XHJcblx0cmV0dXJuIHNlbGYuX2hhc0V2ZW50c1BhbmVsID0ga2V5ID09PSAnZXZlbnRzJyB8fCBzZWxmLl9oYXNFdmVudHNQYW5lbDtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ga28uY29tcG9uZW50cy5yZWdpc3RlcigncGFuZWwtZ3JvdXAnLCB7XHJcblx0dmlld01vZGVsOiBDYXJkR3JvdXAsXHJcblx0dGVtcGxhdGU6YFxyXG5cdFx0PHNlY3Rpb24gZGF0YS1iaW5kPVwiZm9yZWFjaHByb3A6IHtkYXRhOiBkYXRhLCBzb3J0Rm46IHNvcnRCeUNvbmZpZy5iaW5kKCRjb21wb25lbnQpfVwiIGNsYXNzPVwicGFuZWwtZ3JvdXBcIj5cclxuXHRcdFx0PCEtLXBhbmVsLS0+XHJcblx0XHRcdDxwYW5lbCBkYXRhLWJpbmQ9XCJjc3M6IHsnaGFzLWV2ZW50cy1saXN0JzogJGNvbXBvbmVudC5jaGVja0lmSGFzRXZlbnRzTGlzdChrZXkpfVwiIHBhcmFtcz1cIiRkYXRhOiAkZGF0YSwgJGluZGV4OiAkaW5kZXgsIHBhbmVsR3JvdXA6ICRjb21wb25lbnQsIHNvcnRCeUNvbmZpZzogJGNvbXBvbmVudC5zb3J0QnlDb25maWdcIj48L3BhbmVsPlxyXG5cdFx0PC9zZWN0aW9uPlxyXG5gfSk7XHJcblxyXG4vKipcclxuICogQ29uZmlndXJlcyBhbmQgcGFyYW1zIGZvciBlYWNoIHBhbmVsIGdyb3VwXHJcbiAqIEBwYXJhbSBwYXJhbXNcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRDb25maWcocGFyYW1zKSB7XHJcblx0c2VsZi5kZWVwUHJvcCA9IHBhcmFtcy5kZWVwUHJvcCB8fCAnJztcclxuXHQvLyBtYWluIGNvbmZpZ1xyXG5cdGlmICghc2VsZi5kZWVwUHJvcCAmJiAhcGFyYW1zLmNvbmZpZykge1xyXG5cdFx0Ly8gcGFuZWxHcm91cCBpbmRleCAtIDBcclxuXHJcblx0XHQvLyBnZXQgZnVsbCBjb25maWc7XHJcblx0XHR2YXIgZmlsdGVyID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShwYXJhbXMuZmlsdGVyKTtcclxuXHJcblx0XHQvLyBnZXQgY3VycmVudCBtZXRob2QgY29uZmlnXHJcblx0XHR2YXIgbWV0aG9kQ29uZmlnID0gZmlsdGVyW3BhcmFtcy5yZXFJZF0gfHwge307XHJcblxyXG5cdFx0Ly8gbWV0aG9kIGNvbmZpZyBpbmhlcml0cyBnbG9iYWwgY29uZmlnXHJcblx0XHRtZXRob2RDb25maWcuX0NPTkZJRyAgPSAkLmV4dGVuZCh0cnVlLCB7fSwgZmlsdGVyLl9HTE9CQUxfQ09ORklHLCBtZXRob2RDb25maWcuX0NPTkZJRyk7XHJcblxyXG5cdFx0cmV0dXJuIG1ldGhvZENvbmZpZztcclxuXHR9IGVsc2Uge1xyXG5cdFx0Ly8gcGFuZWxHcm91cCBpbmRleCA+IDBcclxuXHRcdHJldHVybiBwYXJhbXMuY29uZmlnIHx8IHt9XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogRGF0YSBtYW5pcHVsYXRpb25zXHJcbiAqIEBwYXJhbSBwYXJhbXNcclxuICogQHJldHVybnMgeyp8e319XHJcbiAqL1xyXG5mdW5jdGlvbiBwcmVwYXJlRGF0YShwYXJhbXMsIGNvbmZpZykge1xyXG5cdHZhciBkYXRhID0gcGFyYW1zICYmIHBhcmFtcy5kYXRhIHx8IHt9O1xyXG5cdHVud3JhcHBPYmplY3RzKGRhdGEsIGNvbmZpZyk7XHJcblx0cmVtb3ZlRGVwcmVjYXRlZChkYXRhLCBjb25maWcpO1xyXG5cdHJldHVybiB3cmFwcFByaW1pdGl2ZXMoZGF0YSwgcGFyYW1zLl9wcm9wVGl0bGUpO1xyXG59XHJcblxyXG4vKipcclxuICogR2F0aGVycyBhbGwgc3RhbmQgYWxvbmUgcHJvcHMgaW4gdG8gb25lIG9iamVjdFxyXG4gKiBAcGFyYW0gZGF0YSB7b2JqZWN0fVxyXG4gKiBAcGFyYW0gX3Byb3BUaXRsZSB7c3RyaW5nfVxyXG4gKiBAcmV0dXJucyB7b2JqZWN0fSByZXZpc2VkIGRhdGFcclxuICovXHJcbmZ1bmN0aW9uIHdyYXBwUHJpbWl0aXZlcyhkYXRhLCBfcHJvcFRpdGxlKSB7XHJcblx0dmFyIG5ld0RhdGEgPSB7fSwgcHJvcCA9IF9wcm9wVGl0bGUgfHwgJ29iamVjdCcsIHZhbCwga2V5O1xyXG5cclxuXHQvLyBnYXRoZXJpbmcgYWxsIHByaW1pdGl2ZSBwcm9wcyBpbiBhZGRpdGlvbmFsIHBhbmVsXHJcblx0Zm9yIChrZXkgaW4gZGF0YSkge1xyXG5cdFx0aWYgKCFkYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtjb250aW51ZTt9XHJcblx0XHR2YWwgPSBkYXRhW2tleV07XHJcblxyXG5cdFx0aWYgKHR5cGVvZiB2YWwgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdG5ld0RhdGFbcHJvcF0gPSBuZXdEYXRhW3Byb3BdIHx8IHt9O1xyXG5cdFx0XHRuZXdEYXRhW3Byb3BdW2tleV0gPSB2YWw7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRuZXdEYXRhW2tleV0gPSB2YWw7XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBuZXdEYXRhXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVbndyYXBzIG9iamVjdHNcclxuICogQHBhcmFtIG9iaiB7b2JqZWN0fVxyXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBjaGFuZ2VkXHJcbiAqL1xyXG5mdW5jdGlvbiByZW1vdmVEZXByZWNhdGVkKG9iaiwgY29uZmlnKSB7XHJcblx0dmFyIGRlcHJlY2F0ZWQgPSBjb25maWcgJiYgY29uZmlnLmRlcHJlY2F0ZWQgfHwgW107XHJcblxyXG5cdGRlcHJlY2F0ZWQubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcblx0XHRpZiAob2JqW2l0ZW1dKSB7XHJcblx0XHRcdGRlbGV0ZSBvYmpbaXRlbV1cclxuXHRcdH1cclxuXHRcdHJldHVybiBpdGVtO1xyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gb2JqO1xyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBkZXByZWNhdGVkIG9iamVjdHNcclxuICogQHBhcmFtIG9iaiB7b2JqZWN0fVxyXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBjaGFuZ2VkXHJcbiAqL1xyXG5mdW5jdGlvbiB1bndyYXBwT2JqZWN0cyhvYmosIGNvbmZpZykge1xyXG5cdHZhciB1bndyYXBwID0gY29uZmlnICYmIGNvbmZpZy51bndyYXBwIHx8IFtdO1xyXG5cclxuXHR1bndyYXBwLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG5cdFx0dmFyIHZhbCA9IG9ialtpdGVtXTtcclxuXHRcdGlmICh2YWwpIHtcclxuXHRcdFx0dmFyIGFyciA9IE9iamVjdC5rZXlzKHZhbCk7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIHByb3AgPSBhcnJbaV07XHJcblx0XHRcdFx0b2JqW3Byb3BdID0gdmFsW3Byb3BdO1xyXG5cdFx0XHR9XHJcblx0XHRcdGRlbGV0ZSBvYmpbaXRlbV07XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gaXRlbTtcclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIG9iajtcclxufVxyXG5cclxuLyoqXHJcbiAqIFByZXBhcmVzIGRhdGEgZm9yIHBhZ2luZ1xyXG4gKiBAcGFyYW0gcGFnZU9ialxyXG4gKiBAcGFyYW0gcGFyYW1zXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UGFnaW5nSW5mbyhwYXJhbXMsIHBhZ2VPYmosIHVybCkge1xyXG5cdHZhciBwYWdlUGFyYW0sIHNpemU7XHJcblxyXG5cdGlmIChwYWdlT2JqKXtcclxuXHRcdHNpemUgPSBwYXJhbXMuY2FyZFNpemUgfHwgcGFnZU9iai5zaXplO1xyXG5cdFx0cGFnZVBhcmFtID0gcGFyYW1zLnBhZ2VQYXJhbSB8fCBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHVybCkuZmluZChmdW5jdGlvbiAoaXRlbSkge1xyXG5cdFx0XHRyZXR1cm4gaXRlbS5uYW1lID09PSAncGFnZSc7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5wYWdlID0ge1xyXG5cdFx0XHRwYXJhbWV0ZXI6IHBhZ2VQYXJhbSAmJiBwYWdlUGFyYW0udmFsdWUsXHJcblx0XHRcdHNpemU6IHNpemVcclxuXHRcdH07XHJcblx0fVxyXG5cdHJldHVybiBudWxsO1xyXG59XHJcblxyXG4vKipcclxuICogUHJvdmlkZXMgaWQgc3RyIGZvciBwYW5lbCAnY29sbGFwc2UgdG9nZ2xlJyBsb2dpY1xyXG4gKiBAcGFyYW0gc3RyXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRDb2xsYXBzZUlkKHN0cikge1xyXG5cdHZhciBjbGFzc05hbWUgPSBzdHIgfHwgJ2NhcmQtcGFuZWwtYm9keS0nO1xyXG5cdHJldHVybiBbXHJcblx0XHRjbGFzc05hbWUsXHJcblx0XHRzZWxmLnNlY3Rpb25JbmRleCxcclxuXHRcdHNlbGYuZ3JvdXBJbmRleFxyXG5cdF0uam9pbignJyk7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYW5lbEdyb3VwLmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcclxuXHJcbmZ1bmN0aW9uIGNhcmRDb21wb25lbnQocGFyYW1zKSB7XHJcblx0c2VsZiA9IHRoaXM7XHJcblx0dGhpcy5rZXkgPSBwYXJhbXMuJGRhdGEua2V5O1xyXG5cdHRoaXMuJGRhdGEgPSBwYXJhbXMuJGRhdGE7XHJcblx0dGhpcy4kaW5kZXggPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHBhcmFtcy4kaW5kZXgpO1xyXG5cdHRoaXMucGFuZWxHcm91cCA9IHBhcmFtcy5wYW5lbEdyb3VwO1xyXG5cdHRoaXMucGFnZSA9IHRoaXMucGFuZWxHcm91cC5wYWdlO1xyXG5cdHRoaXMuY29sb3JDbGFzcyA9IHRoaXMucGFuZWxHcm91cC5jb2xvckNsYXNzIHx8ICcnO1xyXG5cdHRoaXMuY29uZmlnID0gZ2V0UGFuZWxDb25maWcodGhpcy5wYW5lbEdyb3VwLmNvbmZpZywgdGhpcy5rZXkpO1xyXG5cdHRoaXMuaXNFeHBhbmRlZCA9IGlzRXhwYW5kZWQodGhpcy5jb25maWcpO1xyXG5cdHRoaXMuY29sbGFwc2VJZCA9IHRoaXMucGFuZWxHcm91cC5jb2xsYXBzZUlkICsgdGhpcy4kaW5kZXg7XHJcblx0dGhpcy5pc0FjdGl2ZSA9IGtvLm9ic2VydmFibGUodGhpcy5pc0V4cGFuZGVkKTtcclxufVxyXG5cclxuY2FyZENvbXBvbmVudC5wcm90b3R5cGUuc2V0QWN0aXZlID0gZnVuY3Rpb24gKG1vZGVsLCBldmVudCkge1xyXG5cdHRoaXMuaXNBY3RpdmUoIXRoaXMuaXNBY3RpdmUoKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyBjb25maWcgZm9yIGVhY2ggcGFuZWxcclxuICogQHBhcmFtIGtleSB7c3RyaW5nfSBrZXkgb2YgcGFuZWwgb2JqZWN0XHJcbiAqIEByZXR1cm5zIHtvYmplY3R9IGNvbmZpZ1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UGFuZWxDb25maWcoY29uZmlnLCBrZXkpIHtcclxuXHR2YXIgc3ViQ29uZmlnID0gY29uZmlnW2tleV0gfHwge307XHJcblxyXG5cdHN1YkNvbmZpZy5fQ09ORklHID0gJC5leHRlbmQodHJ1ZSwge30sIGNvbmZpZy5fQ09ORklHLCBzdWJDb25maWcuX0NPTkZJRyk7XHJcblx0cmV0dXJuIHN1YkNvbmZpZztcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBmb3IgJ2NvbGxhcHNlZCcgY29uZmlnIGZvciBlYWNoIHBhbmVsXHJcbiAqIEBwYXJhbSBrZXkge3N0cmluZ30ga2V5IG9mIHBhbmVsIG9iamVjdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gZm9yIGNzcyBjbGFzcyBhZGQvcmVtb3ZlXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0V4cGFuZGVkKGNvbmZpZykge1xyXG5cdHJldHVybiAhKE9iamVjdC5nZXRQcm9wKGNvbmZpZywgJy5fQ09ORklHLmNvbGxhcHNlZCcpIHx8IGZhbHNlKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdwYW5lbCcsIHtcclxuXHR2aWV3TW9kZWw6IGNhcmRDb21wb25lbnQsXHJcblx0dGVtcGxhdGU6YFxyXG5cdFx0PHNlY3Rpb24gZGF0YS1iaW5kPVwiY3NzOiB7W2NvbG9yQ2xhc3NdOiB0cnVlLCBhY3RpdmU6IGlzQWN0aXZlfVwiIGNsYXNzPVwicGFuZWwgcGFuZWwtcHJpbWFyeVwiPlxyXG5cdFx0XHQ8IS0tcGFuZWwtaGVhZGluZy0tPlxyXG5cdFx0XHQ8cGFuZWwtaGVhZGluZyBwYXJhbXM9XCJjb25maWc6IGNvbmZpZywgZGF0YTogJGRhdGEsIGluZGV4OiAkaW5kZXgsIHBhZ2U6IHBhZ2UsIHNldEFjdGl2ZTogc2V0QWN0aXZlLmJpbmQoJGNvbXBvbmVudCksIGNvbGxhcHNlSWQ6IGNvbGxhcHNlSWQsIGNvbG9yQ2xhc3M6IGNvbG9yQ2xhc3MsIGlzRXhwYW5kZWQ6IGlzRXhwYW5kZWRcIj48L3BhbmVsLWhlYWRpbmc+XHJcblx0XHRcdFxyXG5cdFx0XHQ8IS0tcGFuZWwtYm9keS0tPlxyXG5cdFx0XHQ8c2VjdGlvbiBkYXRhLWJpbmQ9XCJhdHRyOiB7J2lkJzogY29sbGFwc2VJZH0sIGNzczogeydpbic6IGlzRXhwYW5kZWR9XCIgY2xhc3M9XCJwYW5lbC1jb2xsYXBzZSBjb2xsYXBzZVwiPlx0XHRcdFx0XHJcblx0XHRcdFx0PCEtLSBrbyBpZjogKHR5cGVvZiAkZGF0YS52YWx1ZSA9PT0gJ29iamVjdCcgJiYgISQuaXNBcnJheSgkZGF0YS52YWx1ZSkpIC0tPlxyXG5cdFx0XHRcdFx0PG9iamVjdC1wYW5lbC1ib2R5IHBhcmFtcz1cImNvbmZpZzogY29uZmlnLCBkYXRhOiAkZGF0YSwgaW5kZXg6ICRpbmRleCwgcGFuZWxHcm91cDogcGFuZWxHcm91cCwgcGFnZTogcGFnZSwgY29sbGFwc2VJZDogY29sbGFwc2VJZFwiPjwvb2JqZWN0LXBhbmVsLWJvZHk+XHJcblx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFx0PCEtLSBrbyBpZjogKHR5cGVvZiAkZGF0YS52YWx1ZSA9PT0gJ29iamVjdCcgJiYgJC5pc0FycmF5KCRkYXRhLnZhbHVlKSkgLS0+XHJcblx0XHRcdFx0XHQ8YXJyYXktcGFuZWwtYm9keSBwYXJhbXM9XCJjb25maWc6IGNvbmZpZywgZGF0YTogJGRhdGEsIGluZGV4OiAkaW5kZXgsIHBhbmVsR3JvdXA6IHBhbmVsR3JvdXBcIj48L2FycmF5LXBhbmVsLWJvZHk+XHJcblx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdDwvc2VjdGlvbj5cclxuYH0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL3BhbmVsLmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcclxuXHJcbi8qKlxyXG4gKiBQYWdpbmF0aW9uIGVsZW1lbnRcclxuICogQHBhcmFtIHBhcmFtc1xyXG4gKi9cclxuZnVuY3Rpb24gcGFnaW5hdGlvbihwYXJhbXMpIHtcclxuXHR0aGlzLnBhZ2VQYXJhbSA9IHBhcmFtcy5wYWdlUGFyYW07XHJcblx0dGhpcy50b3RhbFBhZ2VzID0gK3BhcmFtcy50b3RhbFBhZ2VzO1xyXG5cdHRoaXMubnVtYmVyID0gK3BhcmFtcy5udW1iZXI7XHJcblx0dGhpcy5maXJzdCA9ICEhdGhpcy5udW1iZXI7XHJcblx0dGhpcy5sYXN0ID0gdGhpcy5udW1iZXIgPCB0aGlzLnRvdGFsUGFnZXMgLSAxO1xyXG5cdHRoaXMucmVxdWVzdEJ0biA9ICQoJyNhcGktZXhwLWdldC1idG4nKTtcclxuXHRzZWxmID0gdGhpcztcclxufVxyXG5cclxuLyoqXHJcbiAqIGdldCBuZXh0IHBhZ2VcclxuICovXHJcbnBhZ2luYXRpb24ucHJvdG90eXBlLmdldFByZXZQYWdlID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciB2YWwgPSB0aGlzLnBhZ2VQYXJhbSgpO1xyXG5cdHRoaXMucGFnZVBhcmFtKHZhbCA+IDAgPyB2YWwgLSAxIDogMCk7XHJcblx0dGhpcy5yZXF1ZXN0QnRuLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogZ2V0IHByZXYgcGFnZVxyXG4gKi9cclxucGFnaW5hdGlvbi5wcm90b3R5cGUuZ2V0TmV4dFBhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHZhbCA9IHRoaXMubnVtYmVyO1xyXG5cdHRoaXMucGFnZVBhcmFtKHZhbCA8IHRoaXMudG90YWxQYWdlcyAtIDEgPyB2YWwgICsgMTogdmFsKTtcclxuXHR0aGlzLnJlcXVlc3RCdG4udHJpZ2dlcignY2xpY2snKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ga28uY29tcG9uZW50cy5yZWdpc3RlcigncGFnaW5hdGlvbicsIHtcclxuXHR2aWV3TW9kZWw6IHBhZ2luYXRpb24sXHJcblx0dGVtcGxhdGU6XHJcblx0YDxzcGFuIGNsYXNzPVwibmF2aWdhdGlvbi13cmFwcGVyXCI+XHJcblx0XHQ8YnV0dG9uIGRhdGEtYmluZD1cImNsaWNrOiBnZXRQcmV2UGFnZSwgZW5hYmxlOiBmaXJzdFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm5hdmlnYXRpb24gcHJldlwiPjwvYnV0dG9uPlxyXG5cdFx0PGJ1dHRvbiAgZGF0YS1iaW5kPVwiY2xpY2s6IGdldE5leHRQYWdlLCBlbmFibGU6IGxhc3RcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJuYXZpZ2F0aW9uIG5leHRcIj48L2J1dHRvbj5cclxuXHQ8L3NwYW4+YFxyXG59KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYWdpbmF0aW9uLmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDI3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcclxudmFyIGdldFJhbmRvbUNvbG9yID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9jb2xvckNsYXNzZXMnKS5nZXRSYW5kb21Db2xvcjtcclxuXHJcbmZ1bmN0aW9uIFBhbmVsSGVhZGluZyhwYXJhbXMpIHtcclxuXHRzZWxmID0gdGhpcztcclxuXHR0aGlzLmNvbmZpZyA9IHBhcmFtcy5jb25maWcgJiYgcGFyYW1zLmNvbmZpZy5fQ09ORklHO1xyXG5cdHZhciBwYWdlID0gcGFyYW1zLnBhZ2U7XHJcblx0dGhpcy5zZXRBY3RpdmUgPSBwYXJhbXMuc2V0QWN0aXZlO1xyXG5cdHRoaXMuaXNFeHBhbmRlZCA9IHBhcmFtcy5pc0V4cGFuZGVkO1xyXG5cdHRoaXMuX3BhbmVsTmFtZSA9IHBhcmFtcy5kYXRhLmtleTtcclxuXHR0aGlzLnRpdGxlID0gdGhpcy5jb25maWcgJiYgdGhpcy5jb25maWcudGl0bGUgfHwgdGhpcy5fcGFuZWxOYW1lO1xyXG5cdHRoaXMuZGF0YSA9IHBhcmFtcy5kYXRhLnZhbHVlO1xyXG5cdGlmIChwYWdlKSB7XHJcblx0XHR0aGlzLmNhcmRTaXplID0gcGFnZS5zaXplO1xyXG5cdFx0dGhpcy5wYWdlUGFyYW0gPSBwYWdlLnBhZ2VQYXJhbTtcclxuXHR9XHJcblx0dGhpcy5jb2xsYXBzZUlkID0gcGFyYW1zLmNvbGxhcHNlSWQ7XHJcblx0aWYgKHRoaXMuY29uZmlnLnJlcXVlc3QpIHtcclxuXHRcdHRoaXMuZ2V0UmFuZG9tQ29sb3IgPSBnZXRSYW5kb21Db2xvcihwYXJhbXMuY29sb3JDbGFzcyk7XHJcblx0fVxyXG59XHJcblxyXG5QYW5lbEhlYWRpbmcucHJvdG90eXBlLmZvbGxvd1JlcXVlc3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHR2YXIgdXJsID0gT2JqZWN0LmdldFByb3AodmFsdWUsICcuY29uZmlnLnJlcXVlc3QnKTtcclxuXHR1cmwgJiYgbG9jYXRpb24uYXNzaWduKHVybCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ3BhbmVsLWhlYWRpbmcnLCB7XHJcblx0dmlld01vZGVsOiAgUGFuZWxIZWFkaW5nLFxyXG5cdHRlbXBsYXRlOmBcclxuXHRcdDxzZWN0aW9uIGNsYXNzPVwicGFuZWwtaGVhZGluZ1wiPlxyXG5cdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZWwtdGl0bGVcIj5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQ8YSBkYXRhLWJpbmQ9XCJjbGljazogc2V0QWN0aXZlLCBhdHRyOiB7aHJlZjogJyMnICsgY29sbGFwc2VJZCwgJ2FyaWEtY29udHJvbHMnOiBjb2xsYXBzZUlkLCAnYXJpYS1leHBhbmRlZCc6IGlzRXhwYW5kZWR9XCIgY2xhc3M9XCJidG4gYnRuLWljb24gYnRuLXRpdGxlXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiYnRuIGJ0bi1pY29uIHNoZXZyb24gd2hpdGUtc2hldnJvbi11cFwiPjwvc3Bhbj5cclxuXHRcdFx0XHRcdDxwIGRhdGEtYmluZD1cInRleHQ6IHRpdGxlXCIgY2xhc3M9XCJ0aXRsZVwiPlBhbmVsIHRpdGxlPC9wPlxyXG5cdFx0XHRcdDwvYT5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQ8IS0tIGtvIGlmOiBfcGFuZWxOYW1lID09PSAnZXZlbnRzJy0tPlxyXG5cdFx0XHRcdFx0PHNwYW4gZGF0YS1iaW5kPVwidGV4dDogY2FyZFNpemVcIiBjbGFzcz1cImNvdW50ZXJcIj48L3NwYW4+XHJcblx0XHRcdFx0PCEtLSAva28tLT5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQ8IS0tIGtvIGlmOiBfcGFuZWxOYW1lID09PSAncGFnZSctLT5cclxuXHRcdFx0XHRcdDxwYWdpbmF0aW9uIHBhcmFtcz1cIm51bWJlcjogZGF0YS5udW1iZXIsIHRvdGFsUGFnZXM6IGRhdGEudG90YWxQYWdlcywgcGFnZVBhcmFtOiBwYWdlUGFyYW1cIj48L3BhZ2luYXRpb24+XHJcblx0XHRcdFx0PCEtLSAva28tLT5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQ8IS0tIGtvIGlmOiBjb25maWcucmVxdWVzdCAhPT0gdW5kZWZpbmVkIC0tPlxyXG5cdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiZm9sbG93LXJlcXVlc3RcIj5cclxuXHRcdFx0XHRcdDxzcGFuIGRhdGEtYmluZD1cImNzczogZ2V0UmFuZG9tQ29sb3JcIiBjbGFzcz1cImNvbG9yLWluZGljYXRvclwiPjwvc3Bhbj5cclxuXHRcdFx0XHRcdDxidXR0b24gZGF0YS1iaW5kPVwiY2xpY2s6IGZvbGxvd1JlcXVlc3RcIiBjbGFzcz1cImJ0biBidG4tcmVxdWVzdFwiIHR5cGU9XCJidXR0b25cIj5hbm90aGVyIHJlcXVlc3Q8L2J1dHRvbj5cclxuXHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0PCEtLSAva28tLT5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L3NlY3Rpb24+XHJcbmB9KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYW5lbEhlYWRpbmcuY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xyXG5cclxuZnVuY3Rpb24gT2JqZWN0UGFuZWxCb2R5KHBhcmFtcykge1xyXG5cdHNlbGYgPSB0aGlzO1xyXG5cdHRoaXMuZGF0YSA9IHRoaXMuZGF0YSB8fCBrby5vYnNlcnZhYmxlKHBhcmFtcy5kYXRhLnZhbHVlKTtcclxuXHR0aGlzLmNvbmZpZyA9IHBhcmFtcy5jb25maWc7XHJcblx0dGhpcy5fcGFuZWxOYW1lID0gcGFyYW1zLmRhdGEua2V5O1xyXG5cdHRoaXMuY2FyZEluZGV4ID0gdGhpcy5jYXJkSW5kZXggfHwga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShwYXJhbXMuaW5kZXgpO1xyXG5cdHRoaXMucGFuZWxHcm91cCA9IHBhcmFtcy5wYW5lbEdyb3VwIHx8IHt9O1xyXG5cdHRoaXMuZ2V0TW9yZSA9IHRoaXMucGFuZWxHcm91cC5nZXRNb3JlO1xyXG5cdHRoaXMucGFnZVBhcmFtID0gcGFyYW1zLnBhZ2UgJiYgcGFyYW1zLnBhZ2UucGFyYW1ldGVyO1xyXG5cdHRoaXMuY29sbGFwc2VJZCA9IHBhcmFtcy5jb2xsYXBzZUlkO1xyXG5cdHRoaXMuX2FsbEluc2lkZSA9ICEhT2JqZWN0LmdldFByb3Aoa28udW53cmFwKHRoaXMuY29uZmlnKSwgJy5fQ09ORklHLmFsbEluc2lkZScpO1xyXG5cdHRoaXMuc29ydEJ5Q29uZmlnID0gdGhpcy5wYW5lbEdyb3VwLnNvcnRCeUNvbmZpZztcclxufVxyXG5cclxuT2JqZWN0UGFuZWxCb2R5LnByb3RvdHlwZS5vbkVudGVyS2V5RG93biA9IGZ1bmN0aW9uIChtb2RlbCwgZXZlbnQpIHtcclxuXHRpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuXHRcdHZhciB2YWx1ZSA9ICtldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlO1xyXG5cdFx0dmFsdWUgPSBOdW1iZXIuaXNOYU4odmFsdWUpID8gMCA6IHZhbHVlO1xyXG5cdFx0dmFyIHBhZ2VOdW1iZXIgPSB+fnZhbHVlIDwgMCA/IDAgOiB+fnZhbHVlO1xyXG5cdFx0dGhpcy5wYWdlUGFyYW0ocGFnZU51bWJlciA8IGtvLnVud3JhcCh0aGlzLmRhdGEpLnRvdGFsUGFnZXMgPyBwYWdlTnVtYmVyIDoga28udW53cmFwKHRoaXMuZGF0YSkudG90YWxQYWdlcyAtIDEpO1xyXG5cdFx0JCgnI2FwaS1leHAtZ2V0LWJ0bicpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxufTtcclxuXHJcbk9iamVjdFBhbmVsQm9keS5wcm90b3R5cGUuY2FuQmVDb3BpZWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0aWYgKHR5cGVvZiB0aGlzLnZhbHVlID09PSAnb2JqZWN0JykgcmV0dXJuIGZhbHNlO1xyXG5cdHRoaXMuY29waWVkID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcblx0aWYgKE9iamVjdC5nZXRQcm9wKHNlbGYuY29uZmlnLCAnLl9DT05GSUcuY29weUJ0bi4nICsgdGhpcy5rZXkpKSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcbk9iamVjdFBhbmVsQm9keS5wcm90b3R5cGUuY29weVZhbHVlID0gZnVuY3Rpb24gKG1vZGVsLCBldmVudCkge1xyXG5cdHZhciBjdXJyZW50RmllbGQgPSB0aGlzO1xyXG5cdHNlbGYuY2xpcGJvYXJkID0gbmV3IENsaXBib2FyZChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuXHRzZWxmLmNsaXBib2FyZC5vbignc3VjY2VzcycsIGZ1bmN0aW9uIG9uU3VjY2Vzc0NvcHkoZSkge1xyXG5cdFx0XHRjb25zb2xlLmluZm8oJ0FjdGlvbjonLCBlLmFjdGlvbik7XHJcblx0XHRcdGNvbnNvbGUuaW5mbygnVGV4dDonLCBlLnRleHQpO1xyXG5cdFx0XHRjb25zb2xlLmluZm8oJ1RyaWdnZXI6JywgZS50cmlnZ2VyKTtcclxuXHRcdFx0Y3VycmVudEZpZWxkLmNvcGllZCh0cnVlKTtcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0Y3VycmVudEZpZWxkLmNvcGllZChmYWxzZSk7XHJcblx0XHRcdH0sIDUwMCk7XHJcblx0XHRcdGUuY2xlYXJTZWxlY3Rpb24oKTtcclxuXHRcdH0pXHJcblx0XHQub24oJ2Vycm9yJywgZnVuY3Rpb24gb25FcnJvckNvcHkoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdBY3Rpb246JywgZS5hY3Rpb24pO1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdUcmlnZ2VyOicsIGUudHJpZ2dlcik7XHJcblx0XHR9KTtcclxufTtcclxuXHJcbk9iamVjdFBhbmVsQm9keS5wcm90b3R5cGUucmVtb3ZlSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuXHRzZWxmLmNsaXBib2FyZCAmJiBzZWxmLmNsaXBib2FyZC5kZXN0cm95KCk7XHJcblx0ZGVsZXRlIHNlbGYuY2xpcGJvYXJkO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdvYmplY3QtcGFuZWwtYm9keScsIHtcclxuXHR2aWV3TW9kZWw6ICBPYmplY3RQYW5lbEJvZHksXHJcblx0dGVtcGxhdGU6YFxyXG5cdFx0PHNlY3Rpb24gZGF0YS1iaW5kPVwiY3NzOiB7J2FsbC1pbnNpZGUnOiAkY29tcG9uZW50Ll9hbGxJbnNpZGV9XCIgY2xhc3M9XCJwYW5lbC1ib2R5IG9iamVjdC1wYW5lbC1ib2R5XCI+XHJcblx0XHRcdDwhLS0ga28gaWY6ICRjb21wb25lbnQuX3BhbmVsTmFtZSA9PT0gJ29iamVjdCcgJiYgISFPYmplY3QuZ2V0UHJvcChrby51bndyYXAoZGF0YSksICcucmF0aW8nKS0tPlxyXG5cdFx0XHRcdDxpbWcgZGF0YS1iaW5kPVwiYXR0cjoge3NyYzoga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShkYXRhKS51cmwsIGFsdDogJ2ltYWdlLScgKyBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKGRhdGEpLnJhdGlvfVwiIGFsdD1cImltZ1wiIGNsYXNzPVwiaW1nIGltZy10aHVtYm5haWxcIj5cclxuXHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFxyXG5cdFx0XHQ8dWwgZGF0YS1iaW5kPVwiZm9yZWFjaHByb3A6IHtkYXRhOiBkYXRhLCBzb3J0Rm46ICRjb21wb25lbnQuc29ydEJ5Q29uZmlnLmJpbmQoJGNvbXBvbmVudCl9XCI+XHJcblx0XHRcdFx0PGxpIGRhdGEtYmluZD1cImNzczogeydvYmplY3QnOiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnLCAncHJpbWl0aXZlJzogdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0J31cIiBjbGFzcz1cImNsZWFyZml4IHBhZGluZ1wiPlxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFx0PCEtLSBrbyBpZm5vdDogdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAkY29tcG9uZW50Ll9hbGxJbnNpZGUgLS0+XHJcblx0XHRcdFx0XHQ8c3BhbiBkYXRhLWJpbmQ9XCJ0ZXh0OiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnID8ga2V5OiBrZXkgKyAnOidcIiBjbGFzcz1cImtleVwiPjwvc3Bhbj5cclxuXHRcdFx0XHRcdDwhLS0gL2tvIC0tPlxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8IS0tIGtvIGlmbm90OiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIHx8ICRjb21wb25lbnQuX3BhbmVsTmFtZSA9PT0gJ3BhZ2UnICYmIGtleSA9PT0gJ251bWJlcicgLS0+XHJcblx0XHRcdFx0XHRcdDxzcGFuIGRhdGEtYmluZD1cInRleHQ6IHZhbHVlXCIgY2xhc3M9XCJ2YWx1ZVwiPjwvc3Bhbj5cclxuXHRcdFx0XHRcdDwhLS0gL2tvIC0tPlxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8IS0tIGtvIGlmOiAkY29tcG9uZW50Ll9wYW5lbE5hbWUgPT09ICdwYWdlJyAmJiBrZXkgPT09ICdudW1iZXInLS0+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLWlubGluZVwiPlxyXG5cdFx0XHRcdFx0XHRcdDxpbnB1dCBpZD1cInBhZ2luYXRpb24taW5wdXRcIiBkYXRhLWJpbmQ9XCJldmVudDoge2tleWRvd246ICRjb21wb25lbnQub25FbnRlcktleURvd24uYmluZCgkY29tcG9uZW50KX0sIGF0dHI6IHtwbGFjZWhvbGRlcjogdmFsdWV9XCIgdHlwZT1cInRleHRcIiBwYXR0ZXJuPVwiWzAtOV0rXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0PCEtLSBrbyBpZjogJGNvbXBvbmVudC5jYW5CZUNvcGllZC5jYWxsKCRkYXRhLCAnI3Byb3AtdmFsdWUtJyArIGtleSArICRpbmRleCgpKSAtLT5cclxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBkYXRhLWJpbmQ9XCJldmVudDoge21vdXNlb3ZlcjogJGNvbXBvbmVudC5jb3B5VmFsdWUsIG1vdXNlb3V0OiAkY29tcG9uZW50LnJlbW92ZUhhbmRsZXJ9LCBjc3M6IHsnY29waWVkJzogY29waWVkfSwgYXR0cjogeydkYXRhLWNsaXBib2FyZC10ZXh0JzogdmFsdWUudG9TdHJpbmcoKSwgaWQ6ICdwcm9wLXZhbHVlLScgKyBrZXkgKyAkaW5kZXgoKX0sIHBvcG92ZXI6IHt0eXBlOiAndG9vbHRpcCcsIHRpdGxlOiAnQ29weSB2YWx1ZSd9XCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1pY29uIGJ0bi1jb3B5XCI+PC9idXR0b24+XHJcblx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHQ8IS0tIGtvIGlmOiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmICRjb21wb25lbnQuX2FsbEluc2lkZSAtLT5cclxuXHRcdFx0XHRcdFx0XHQ8cGFuZWwgcGFyYW1zPVwiJGRhdGE6ICRkYXRhLCAkaW5kZXg6ICRpbmRleCwgcGFuZWxHcm91cDogJGNvbXBvbmVudFwiPjwvcGFuZWw+XHJcblx0XHRcdFx0XHRcdDwhLS0gL2tvIC0tPlxyXG5cdFx0XHRcdFx0XHQ8IS0tIGtvIGlmOiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmICEkY29tcG9uZW50Ll9hbGxJbnNpZGUgLS0+XHJcblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBkYXRhLWJpbmQ9XCJjbGljazogJGNvbXBvbmVudC5nZXRNb3JlLmJpbmQoJGNvbXBvbmVudCwga2V5LCB2YWx1ZSlcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWljb24gYmx1ZS1zaGV2cm9uLXJpZ2h0IHB1bGwtcmlnaHRcIj48L2J1dHRvbj5cclxuXHRcdFx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFx0PC9saT5cclxuXHRcdFx0PC91bD5cclxuXHRcdDwvc2VjdGlvbj5cclxuYH0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL29iamVjdFBhbmVsQm9keS5jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHNlbGY7XHJcblxyXG5mdW5jdGlvbiBBcnJheVBhbmVsQm9keShwYXJhbXMpIHtcclxuXHRzZWxmID0gdGhpcztcclxuXHR0aGlzLmRhdGEgPSBwYXJhbXMuZGF0YS52YWx1ZTtcclxuXHR0aGlzLmNvbmZpZyA9IHBhcmFtcy5jb25maWc7XHJcblx0dGhpcy5fcGFuZWxOYW1lID0gcGFyYW1zLmRhdGEua2V5O1xyXG5cdHRoaXMuY2FyZEluZGV4ID0gdGhpcy5jYXJkSW5kZXggfHwga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShwYXJhbXMuaW5kZXgpO1xyXG5cdHRoaXMucGFuZWxHcm91cCA9IHBhcmFtcy5wYW5lbEdyb3VwO1xyXG5cdHRoaXMuZ2V0TW9yZSA9IHRoaXMucGFuZWxHcm91cC5nZXRNb3JlO1xyXG5cclxufVxyXG5cclxuQXJyYXlQYW5lbEJvZHkucHJvdG90eXBlLmdldFN0YXJ0RGF0YSA9IGZ1bmN0aW9uICgkZGF0YSkge1xyXG5cdHJldHVybiBPYmplY3QuZ2V0UHJvcCgkZGF0YSwgJ2RhdGVzLnN0YXJ0LmxvY2FsRGF0ZScpIHx8ICcnXHJcbn07XHJcblxyXG5BcnJheVBhbmVsQm9keS5wcm90b3R5cGUuZ2V0VmVudWVOYW1lID0gZnVuY3Rpb24gKCRkYXRhKSB7XHJcblx0cmV0dXJuIE9iamVjdC5nZXRQcm9wKCRkYXRhLCAnX2VtYmVkZGVkLnZlbnVlc1swXS5uYW1lJykgfHwgJydcclxufTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2FycmF5LXBhbmVsLWJvZHknLCB7XHJcblx0dmlld01vZGVsOiBBcnJheVBhbmVsQm9keSxcclxuXHR0ZW1wbGF0ZTpgXHJcblx0XHQ8c2VjdGlvbiBjbGFzcz1cInBhbmVsLWJvZHkgbm8tcGFkZGluZyBhcnJheS1wYW5lbC1ib2R5XCI+XHJcblx0XHRcdDx1bCBkYXRhLWJpbmQ9XCJmb3JlYWNoOiBkYXRhXCIgY2xhc3M9XCJsaXN0LWdyb3VwXCI+XHJcblx0XHRcdFx0PGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8IS0tIGtvIGlmOiAkY29tcG9uZW50Ll9wYW5lbE5hbWUgPT09ICdpbWFnZXMnIC0tPlxyXG5cdFx0XHRcdFx0XHQ8aW1nIGRhdGEtYmluZD1cImF0dHI6IHtzcmM6IHVybCwgYWx0OiAnaW1hZ2UtJyArIHJhdGlvfVwiIGFsdD1cImltZ1wiIGNsYXNzPVwiaW1nXCI+XHJcblx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0PCEtLSBrbyBpZm5vdDogJGNvbXBvbmVudC5fcGFuZWxOYW1lID09PSAnaW1hZ2VzJyAtLT5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm5hbWUtd3JhcHBlclwiPlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuIGRhdGEtYmluZD1cInRleHQ6IG5hbWUgfHwgJyMnICsgJGluZGV4KCksIGJsb2NrRWxsaXBzaXM6IHtjbGFtcDogMn1cIiBjbGFzcz1cIm5hbWVcIj5sYWJlbDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHRcdFx0XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHQ8IS0tIGtvIGlmOiAkY29tcG9uZW50Ll9wYW5lbE5hbWUgPT09ICdldmVudHMnIC0tPlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJhZGRpdGlvbmFsLWluZm9cIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxwIGRhdGEtYmluZD1cInRleHQ6ICRjb21wb25lbnQuZ2V0U3RhcnREYXRhKCRkYXRhKVwiIGNsYXNzPVwiZGF0ZVwiPmV2ZW50IGRhdGU8L3A+XHJcblx0XHRcdFx0XHRcdFx0XHQ8IS0tIGtvIGlmOiAkY29tcG9uZW50LmdldFZlbnVlTmFtZSgkZGF0YSktLT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PHAgZGF0YS1iaW5kPVwidGV4dDogJGNvbXBvbmVudC5nZXRWZW51ZU5hbWUoJGRhdGEpXCIgY2xhc3M9XCJ2ZW51ZSB0cnVuY2F0ZVwiPmV2ZW50IHZlbnVlPC9wPlxyXG5cdFx0XHRcdFx0XHRcdFx0PCEtLS9rby0tPlxyXG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0PCEtLSBrbyBpZjogdHlwZW9mICRkYXRhID09PSAnb2JqZWN0JyAtLT5cclxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBkYXRhLWJpbmQ9XCJjbGljazogJGNvbXBvbmVudC5nZXRNb3JlLmJpbmQoJGNvbXBvbmVudCwgJGluZGV4KCkpXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1pY29uIGJsdWUtc2hldnJvbi1yaWdodCBwdWxsLXJpZ2h0XCI+PC9idXR0b24+XHJcblx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdDwvbGk+XHJcblx0XHRcdDwvdWw+XHJcblx0XHQ8L3NlY3Rpb24+XHJcbmB9KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9hcnJheVBhbmVsQm9keS5jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==