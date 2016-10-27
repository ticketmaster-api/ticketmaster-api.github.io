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
						"allInside": false
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
		var data = params && $.extend({},params.data) || {};
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
	
	ArrayPanelBody.prototype.setActive = function ($index, model, e) {
		$(e.currentTarget).parents('.slick-slide').find('.item.object').removeClass('active');
		$(e.currentTarget).parent('.item').addClass('active');
		this.getMore.call(this, $index, model);
	};
	
	module.exports = ko.components.register('array-panel-body', {
		viewModel: ArrayPanelBody,
		template:`
			<section class="panel-body no-padding array-panel-body">
				<ul data-bind="foreach: data" class="list list-group">
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2I2ODY5ZDYxNDBlNGU5OTIxY2MiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL3ZlbmRvcnMvY2xhbXAubWluLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jdXN0b21CaW5kaW5ncy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY3VzdG9tQmluZGluZ3MvYmxvY2tFbGxpcHNpcy5iaW5kaW5nLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jdXN0b21CaW5kaW5ncy9mb3JlYWNoUHJvcC5iaW5kaW5nLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jdXN0b21CaW5kaW5ncy9wb3BvdmVyLmJpbmRpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9hcGlrZXkuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvYWpheFNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvY29uZmlnU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvVmlld01vZGVscy9tZW51Vmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2hlbHBlckZ1bmMuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvcGFyYW1zVmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9WaWV3TW9kZWxzL21ldGhvZHNWaWV3TW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvcmVxdWVzdHNMaXN0Vmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2pzb24taGlnaGxpZ2h0LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2hpZ2hsaWdodEpzb24ud29ya2VyLmpzIiwid2VicGFjazovLy8uL34vd29ya2VyLWxvYWRlci9jcmVhdGVJbmxpbmVXb3JrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvc2xpZGVyLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbmZpZy5qc29uIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2NvbG9yQ2xhc3Nlcy5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9jdXN0b21TZWxlY3QuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BvcHVwcy9lcnJvci5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL3BhbmVsR3JvdXAuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYW5lbC5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL3BhZ2luYXRpb24uY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYW5lbEhlYWRpbmcuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9vYmplY3RQYW5lbEJvZHkuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9hcnJheVBhbmVsQm9keS5jb21wb25lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3RDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBZ0M7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQzFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBcUI7QUFDckIsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFvRCxzQ0FBc0M7QUFDMUY7O0FBRUE7QUFDQSwwQkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBLHVDQUFzQywyQkFBMkI7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pC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biBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgM2I2ODY5ZDYxNDBlNGU5OTIxY2NcbiAqKi8iLCJ2YXIgY2xhbXAgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi92ZW5kb3JzL2NsYW1wLm1pbicpO1xyXG5cclxuLyoqXHJcbiAqIE1haW4gZmlsZSBmb3IgQXBpIEV4cGxyZXIgdjIuMFxyXG4gKiBGb3IgZGV2ZWxvcG1lbnQgcGxlYXNlIHVzZSBXZWJwYWNrIHRvIGJ1bmRsZSBhbGwgbW9kdWxlc1xyXG4gKiBJdCBjYW4gYmUgbWFkZSB1c2luZyBucG0gc2NyaXB0cyBjbWQgLSAnd2VicGFjaydcclxuICovXHJcbi8vIGN1c3RvbSBiaW5kaW5nc1xyXG5yZXF1aXJlKCcuLi9jdXN0b21CaW5kaW5ncy9pbmRleCcpO1xyXG5cclxuLy8gTW9kdWxlc1xyXG52YXIgYmFzZSA9IHJlcXVpcmUoJy4uL21vZHVsZXMvYmFzZScpO1xyXG52YXIgYXBpS2V5ID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9hcGlrZXknKTtcclxudmFyIGFqYXhTZXJ2aWNlID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9hamF4U2VydmljZScpO1xyXG5cclxudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29uZmlnU2VydmljZScpO1xyXG4vLyBWaWV3IE1vZGVsc1xyXG52YXIgTWVudVZpZXdNb2RlbCA9IHJlcXVpcmUoJy4vbWVudVZpZXdNb2RlbCcpO1xyXG52YXIgUGFyYW1zVmlld01vZGVsID0gcmVxdWlyZSgnLi9wYXJhbXNWaWV3TW9kZWwnKTtcclxudmFyIE1ldGhvZHNWaWV3TW9kZWwgPSByZXF1aXJlKCcuL21ldGhvZHNWaWV3TW9kZWwnKTtcclxudmFyIFJlcXVlc3RzTGlzdFZpZXdNb2RlbCA9IHJlcXVpcmUoJy4vcmVxdWVzdHNMaXN0Vmlld01vZGVsJyk7XHJcbi8vIENvbXBvbmVudHNcclxucmVxdWlyZSgnLi4vY29tcG9uZW50cy9pbmRleCcpO1xyXG5cclxuLyoqXHJcbiAqIE1haW4gYXBwbGljYXRpb24gdmlldy1tb2RlbFxyXG4gKiBAcGFyYW0gb2JqIHtvYmplY3R9IGdsb2JhbCBkYXRhIG9iamVjdFxyXG4gKi9cclxuZnVuY3Rpb24gQXBwVmlld01vZGVsKG9iaikge1xyXG4gIHNlbGYgPSB0aGlzO1xyXG4gIHZhciBiYXNlID0gb2JqIHx8IHt9O1xyXG5cdHZhciBwYXJzZWRVcmwgPSBwYXJzZVVybCgpO1xyXG4gIHRoaXMuYXBpS2V5ID0gYXBpS2V5O1xyXG5cdHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG5cclxuICAvLyBvYnNlcnZhYmxlc1xyXG4gIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSA9IGtvLm9ic2VydmFibGUocGFyc2VkVXJsLmFwaUNhdGVnb3J5IHx8ICcnKTtcclxuICB0aGlzLnNlbGVjdGVkTWV0aG9kID0ga28ub2JzZXJ2YWJsZShwYXJzZWRVcmwubWV0aG9kSWQgfHwgJycpO1xyXG4gIHRoaXMuc2VsZWN0ZWRQYXJhbXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xyXG5cdHRoaXMucmVxdWVzdHMgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xyXG5cdHRoaXMub25FcnJvciA9IGtvLm9ic2VydmFibGUoe30pO1xyXG5cclxuXHQvLyBjb21wdXRlZFxyXG4gIHRoaXMuVVJMID0ga28uY29tcHV0ZWQodGhpcy5nZXRVcmwsIHRoaXMpO1xyXG4gIHRoaXMuc2VuZEJ1dHRvblRleHQgPSBrby5wdXJlQ29tcHV0ZWQodGhpcy5nZXRNZXRob2ROYW1lLCB0aGlzKTtcclxuXHR0aGlzLnNoYXJlUGF0aCA9IGtvLnB1cmVDb21wdXRlZChmb3JtRGVlcExpbmtpbmdVcmwsIHRoaXMpO1xyXG4gIC8vIHN1Yi1tb2RlbHNcclxuICB0aGlzLm1lbnUgPSBuZXcgTWVudVZpZXdNb2RlbChiYXNlLCB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkpO1xyXG4gIHRoaXMubWV0aG9kcyA9IG5ldyBNZXRob2RzVmlld01vZGVsKGJhc2UsIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSwgdGhpcy5zZWxlY3RlZE1ldGhvZCk7XHJcbiAgdGhpcy5wYXJhbXMgPSBuZXcgUGFyYW1zVmlld01vZGVsKGJhc2UsIHRoaXMuc2VsZWN0ZWRNZXRob2QsIHRoaXMuc2VsZWN0ZWRQYXJhbXMpO1xyXG4gIHRoaXMucmVxdWVzdHNMaXN0ID0gbmV3IFJlcXVlc3RzTGlzdFZpZXdNb2RlbCh0aGlzLnJlcXVlc3RzLCB0aGlzLnNlbGVjdGVkUGFyYW1zLCB0aGlzLnNoYXJlUGF0aCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZW5kIHJlcXVlc3QgbWV0aG9kXHJcbiAqL1xyXG5BcHBWaWV3TW9kZWwucHJvdG90eXBlLm9uQ2xpY2tTZW5kQnRuID0gZnVuY3Rpb24gKCkge1xyXG4gIGFqYXhTZXJ2aWNlKHRoaXMuVVJMKCksIHRoaXMucmVxdWVzdHMsIHRoaXMub25FcnJvciwgYmFzZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyBjdXJyZW50IG1ldGhvZCBuYW1lXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5BcHBWaWV3TW9kZWwucHJvdG90eXBlLmdldE1ldGhvZE5hbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRNZXRob2QoKS5tZXRob2QudG9Mb3dlckNhc2UoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHJhdyB1cmwgZGF0YSBhcnJheVxyXG4gKiBAcmV0dXJucyB7KltdfVxyXG4gKi9cclxuQXBwVmlld01vZGVsLnByb3RvdHlwZS5nZXRVcmwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIFtcclxuICAgIHRoaXMuc2VsZWN0ZWRNZXRob2QoKSxcclxuICAgIHRoaXMuYXBpS2V5LFxyXG4gICAgdGhpcy5zZWxlY3RlZFBhcmFtcygpXHJcbiAgXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIGRlZXAgcHJvcFxyXG4gKiBAcmV0dXJucyB7KltdfVxyXG4gKi9cclxuT2JqZWN0LmdldFByb3AgPSBmdW5jdGlvbihvLCBzKSB7XHJcblx0aWYgKCh0eXBlb2YgbyAhPT0gJ29iamVjdCcgfHwgbyA9PSBudWxsKSAmJiAhcykge3JldHVybjt9XHJcblx0cyA9IHMucmVwbGFjZSgvXFxbKFxcdyspXFxdL2csICcuJDEnKTsgLy8gY29udmVydCBpbmRleGVzIHRvIHByb3BlcnRpZXNcclxuXHRzID0gcy5yZXBsYWNlKC9eXFwuLywgJycpOyAgICAgICAgICAgLy8gc3RyaXAgYSBsZWFkaW5nIGRvdFxyXG5cdHZhciBhID0gcy5zcGxpdCgnLicpO1xyXG5cdGZvciAodmFyIGkgPSAwLCBuID0gYS5sZW5ndGg7IGkgPCBuOyArK2kpIHtcclxuXHRcdHZhciBrID0gYVtpXTtcclxuXHRcdGlmIChvICYmIGsgaW4gbykge1xyXG5cdFx0XHRvID0gb1trXTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIG87XHJcbn07XHJcblxyXG4vKipcclxuICogQWN0aXZhdGVzIGtub2Nrb3V0LmpzXHJcbiAqL1xyXG5rby5hcHBseUJpbmRpbmdzKG5ldyBBcHBWaWV3TW9kZWwoYmFzZSkpO1xyXG4vKipcclxuICogZXhwb3J0cyBnbG9iYWwgdmFyaWFibGVcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gYmFzZTtcclxuXHJcbmZ1bmN0aW9uIGZvcm1EZWVwTGlua2luZ1VybCgpIHtcclxuXHR2YXIgbG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb247XHJcblx0dmFyIGNhdGVnb3J5ID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShzZWxmLnNlbGVjdGVkQ2F0ZWdvcnkpO1xyXG5cdHZhciBtZXRob2QgPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHNlbGYuc2VsZWN0ZWRNZXRob2QpO1xyXG5cdHZhciBwYXJhbXMgPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHNlbGYuc2VsZWN0ZWRQYXJhbXMpO1xyXG5cclxuXHR2YXIgcXVlcnlzID0gW1xyXG5cdFx0J2FwaUNhdGVnb3J5PScgKyBlbmNvZGVVUkkoY2F0ZWdvcnkpLFxyXG5cdFx0J21ldGhvZElkPScrIGVuY29kZVVSSShtZXRob2QuaWQpXHJcblx0XTtcclxuXHJcblx0cGFyYW1zLm1hcChmdW5jdGlvbiAocGFyYW0pIHtcclxuXHRcdHZhciB2YWx1ZSA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUocGFyYW0udmFsdWUpO1xyXG5cdFx0dmFyIGRlZmF1bHRWYWx1ZSA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUocGFyYW0uZGVmYXVsdCk7XHJcblx0XHRxdWVyeXMucHVzaChbXHJcblx0XHRcdHBhcmFtLm5hbWUsXHJcblx0XHRcdCc9JyxcclxuXHRcdFx0dmFsdWUgIT09ICcnID8gdmFsdWUgOiBkZWZhdWx0VmFsdWUgLy90b2RvOiByZW1vdmUgZGVmYXVsdCBmcm9tIGhlcmUgd2hlbiBzZXQgdXAgaXQgaW4gc291cmNlIGxpa2UgdmFsdWUgYnkgZGVmYXVsdFxyXG5cdFx0XS5qb2luKCcnKSk7XHJcblx0XHRyZXR1cm4gcGFyYW07XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiBbXHJcblx0XHRsb2NhdGlvbi5vcmlnaW4sXHJcblx0XHRsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC8kL2dtaSwgJycpLFxyXG5cdFx0Jz8nLFxyXG5cdFx0cXVlcnlzLmpvaW4oJyYnKVxyXG5cdF0uam9pbignJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlVXJsKCkge1xyXG5cdHZhciBsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XHJcblx0aWYgKGxvY2F0aW9uKSB7XHJcblx0XHR2YXIgcXVlcnlzID0gbG9jYXRpb24ucmVwbGFjZSgvXlxcPy9nLCAnJykuc3BsaXQoJyYnKTtcclxuXHRcdHZhciBvYmogPSB7XHJcblx0XHRcdGFwaUNhdGVnb3J5OiAnJyxcclxuXHRcdFx0bWV0aG9kSWQ6ICcnLFxyXG5cdFx0XHRzZWxlY3RlZFBhcmFtczogW11cclxuXHRcdH07XHJcblxyXG5cdFx0cXVlcnlzLm1hcChmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHR2YXIgYSA9IGRlY29kZVVSSShlKS5zcGxpdCgnPScpO1xyXG5cdFx0XHR2YXIga2V5ID0gYVswXTtcclxuXHRcdFx0dmFyIHZhbCA9IGFbMV07XHJcblxyXG5cdFx0XHRpZiAoa2V5ID09PSAnYXBpQ2F0ZWdvcnknIHx8IGtleSA9PT0gJ21ldGhvZElkJykge1xyXG5cdFx0XHRcdG9ialtrZXldID0gdmFsO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG9iai5zZWxlY3RlZFBhcmFtcy5wdXNoKHtcclxuXHRcdFx0XHRcdG5hbWU6IGtleSxcclxuXHRcdFx0XHRcdHZhbHVlOiB2YWxcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBvYmo7XHJcblx0fVxyXG5cdHJldHVybiB7fTtcclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvbWFpbi5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIVxyXG4qIENsYW1wLmpzIDAuNS4xXHJcbipcclxuKiBDb3B5cmlnaHQgMjAxMS0yMDEzLCBKb3NlcGggU2NobWl0dCBodHRwOi8vam9lLnNoXHJcbiogUmVsZWFzZWQgdW5kZXIgdGhlIFdURlBMIGxpY2Vuc2VcclxuKiBodHRwOi8vc2FtLnpveS5vcmcvd3RmcGwvXHJcbiovXHJcbihmdW5jdGlvbigpe3dpbmRvdy4kY2xhbXA9ZnVuY3Rpb24oYyxkKXtmdW5jdGlvbiBzKGEsYil7bi5nZXRDb21wdXRlZFN0eWxlfHwobi5nZXRDb21wdXRlZFN0eWxlPWZ1bmN0aW9uKGEsYil7dGhpcy5lbD1hO3RoaXMuZ2V0UHJvcGVydHlWYWx1ZT1mdW5jdGlvbihiKXt2YXIgYz0vKFxcLShbYS16XSl7MX0pL2c7XCJmbG9hdFwiPT1iJiYoYj1cInN0eWxlRmxvYXRcIik7Yy50ZXN0KGIpJiYoYj1iLnJlcGxhY2UoYyxmdW5jdGlvbihhLGIsYyl7cmV0dXJuIGMudG9VcHBlckNhc2UoKX0pKTtyZXR1cm4gYS5jdXJyZW50U3R5bGUmJmEuY3VycmVudFN0eWxlW2JdP2EuY3VycmVudFN0eWxlW2JdOm51bGx9O3JldHVybiB0aGlzfSk7cmV0dXJuIG4uZ2V0Q29tcHV0ZWRTdHlsZShhLG51bGwpLmdldFByb3BlcnR5VmFsdWUoYil9ZnVuY3Rpb24gdChhKXthPWF8fGMuY2xpZW50SGVpZ2h0O3ZhciBiPXUoYyk7cmV0dXJuIE1hdGgubWF4KE1hdGguZmxvb3IoYS9iKSwwKX1mdW5jdGlvbiB4KGEpe3JldHVybiB1KGMpKlxyXG5hfWZ1bmN0aW9uIHUoYSl7dmFyIGI9cyhhLFwibGluZS1oZWlnaHRcIik7XCJub3JtYWxcIj09YiYmKGI9MS4yKnBhcnNlSW50KHMoYSxcImZvbnQtc2l6ZVwiKSkpO3JldHVybiBwYXJzZUludChiKX1mdW5jdGlvbiBsKGEpe2lmKGEubGFzdENoaWxkLmNoaWxkcmVuJiYwPGEubGFzdENoaWxkLmNoaWxkcmVuLmxlbmd0aClyZXR1cm4gbChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhLmNoaWxkcmVuKS5wb3AoKSk7aWYoYS5sYXN0Q2hpbGQmJmEubGFzdENoaWxkLm5vZGVWYWx1ZSYmXCJcIiE9YS5sYXN0Q2hpbGQubm9kZVZhbHVlJiZhLmxhc3RDaGlsZC5ub2RlVmFsdWUhPWIudHJ1bmNhdGlvbkNoYXIpcmV0dXJuIGEubGFzdENoaWxkO2EubGFzdENoaWxkLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYS5sYXN0Q2hpbGQpO3JldHVybiBsKGMpfWZ1bmN0aW9uIHAoYSxkKXtpZihkKXt2YXIgZT1hLm5vZGVWYWx1ZS5yZXBsYWNlKGIudHJ1bmNhdGlvbkNoYXIsXCJcIik7Znx8KGg9MDxrLmxlbmd0aD9cclxuay5zaGlmdCgpOlwiXCIsZj1lLnNwbGl0KGgpKTsxPGYubGVuZ3RoPyhxPWYucG9wKCkscihhLGYuam9pbihoKSkpOmY9bnVsbDttJiYoYS5ub2RlVmFsdWU9YS5ub2RlVmFsdWUucmVwbGFjZShiLnRydW5jYXRpb25DaGFyLFwiXCIpLGMuaW5uZXJIVE1MPWEubm9kZVZhbHVlK1wiIFwiK20uaW5uZXJIVE1MK2IudHJ1bmNhdGlvbkNoYXIpO2lmKGYpe2lmKGMuY2xpZW50SGVpZ2h0PD1kKWlmKDA8PWsubGVuZ3RoJiZcIlwiIT1oKXIoYSxmLmpvaW4oaCkraCtxKSxmPW51bGw7ZWxzZSByZXR1cm4gYy5pbm5lckhUTUx9ZWxzZVwiXCI9PWgmJihyKGEsXCJcIiksYT1sKGMpLGs9Yi5zcGxpdE9uQ2hhcnMuc2xpY2UoMCksaD1rWzBdLHE9Zj1udWxsKTtpZihiLmFuaW1hdGUpc2V0VGltZW91dChmdW5jdGlvbigpe3AoYSxkKX0sITA9PT1iLmFuaW1hdGU/MTA6Yi5hbmltYXRlKTtlbHNlIHJldHVybiBwKGEsZCl9fWZ1bmN0aW9uIHIoYSxjKXthLm5vZGVWYWx1ZT1jK2IudHJ1bmNhdGlvbkNoYXJ9ZD1kfHx7fTtcclxudmFyIG49d2luZG93LGI9e2NsYW1wOmQuY2xhbXB8fDIsdXNlTmF0aXZlQ2xhbXA6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGQudXNlTmF0aXZlQ2xhbXA/ZC51c2VOYXRpdmVDbGFtcDohMCxzcGxpdE9uQ2hhcnM6ZC5zcGxpdE9uQ2hhcnN8fFtcIi5cIixcIi1cIixcIlxcdTIwMTNcIixcIlxcdTIwMTRcIixcIiBcIl0sYW5pbWF0ZTpkLmFuaW1hdGV8fCExLHRydW5jYXRpb25DaGFyOmQudHJ1bmNhdGlvbkNoYXJ8fFwiXFx1MjAyNlwiLHRydW5jYXRpb25IVE1MOmQudHJ1bmNhdGlvbkhUTUx9LGU9Yy5zdHlsZSx5PWMuaW5uZXJIVE1MLHo9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGMuc3R5bGUud2Via2l0TGluZUNsYW1wLGc9Yi5jbGFtcCx2PWcuaW5kZXhPZiYmKC0xPGcuaW5kZXhPZihcInB4XCIpfHwtMTxnLmluZGV4T2YoXCJlbVwiKSksbTtiLnRydW5jYXRpb25IVE1MJiYobT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSxtLmlubmVySFRNTD1iLnRydW5jYXRpb25IVE1MKTt2YXIgaz1iLnNwbGl0T25DaGFycy5zbGljZSgwKSxcclxuaD1rWzBdLGYscTtcImF1dG9cIj09Zz9nPXQoKTp2JiYoZz10KHBhcnNlSW50KGcpKSk7dmFyIHc7eiYmYi51c2VOYXRpdmVDbGFtcD8oZS5vdmVyZmxvdz1cImhpZGRlblwiLGUudGV4dE92ZXJmbG93PVwiZWxsaXBzaXNcIixlLndlYmtpdEJveE9yaWVudD1cInZlcnRpY2FsXCIsZS5kaXNwbGF5PVwiLXdlYmtpdC1ib3hcIixlLndlYmtpdExpbmVDbGFtcD1nLHYmJihlLmhlaWdodD1iLmNsYW1wK1wicHhcIikpOihlPXgoZyksZTw9Yy5jbGllbnRIZWlnaHQmJih3PXAobChjKSxlKSkpO3JldHVybntvcmlnaW5hbDp5LGNsYW1wZWQ6d319fSkoKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy92ZW5kb3JzL2NsYW1wLm1pbi5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcclxuXHRyZXF1aXJlKCcuL2Jsb2NrRWxsaXBzaXMuYmluZGluZycpO1xyXG5cdHJlcXVpcmUoJy4vZm9yZWFjaFByb3AuYmluZGluZycpO1xyXG5cdHJlcXVpcmUoJy4vcG9wb3Zlci5iaW5kaW5nJyk7XHJcbn0oKSk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY3VzdG9tQmluZGluZ3MvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJrby5iaW5kaW5nSGFuZGxlcnMuYmxvY2tFbGxpcHNpcyA9IHtcclxuXHRpbml0OiBmdW5jdGlvbihlbGVtZW50LCB2YWx1ZUFjY2Vzc29yLCBhbGxCaW5kaW5ncywgdmlld01vZGVsLCBiaW5kaW5nQ29udGV4dCkge1xyXG5cdFx0JGNsYW1wKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IoKSk7XHJcblx0fVxyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2N1c3RvbUJpbmRpbmdzL2Jsb2NrRWxsaXBzaXMuYmluZGluZy5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIiBtb2R1bGUuZXhwb3J0cyA9IGtvLmJpbmRpbmdIYW5kbGVycy5mb3JlYWNocHJvcCA9IHtcclxuXHJcblx0dHJhbnNmb3JtT2JqZWN0OiBmdW5jdGlvbiAocGFyYW1zKSB7XHJcblx0XHR2YXIgcHJvcGVydGllcyA9IFtdO1xyXG5cdFx0dmFyIG9iaiwgc29ydEZuID0gcGFyYW1zLnNvcnRGbjtcclxuXHJcblx0XHRvYmogPSBzb3J0Rm4gPyBwYXJhbXMuZGF0YTogcGFyYW1zO1xyXG5cdFx0b2JqID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShvYmopO1xyXG5cclxuXHRcdGtvLnV0aWxzLm9iamVjdEZvckVhY2gob2JqLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG5cdFx0XHRwcm9wZXJ0aWVzLnB1c2goe1xyXG5cdFx0XHRcdGtleToga2V5LFxyXG5cdFx0XHRcdHZhbHVlOiB2YWx1ZVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmIChzb3J0Rm4pIHtcclxuXHRcdFx0cHJvcGVydGllcy5zb3J0KHNvcnRGbik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHByb3BlcnRpZXM7XHJcblx0fSxcclxuXHRpbml0OiBmdW5jdGlvbihlbGVtZW50LCB2YWx1ZUFjY2Vzc29yLCBhbGxCaW5kaW5nc0FjY2Vzc29yLCB2aWV3TW9kZWwsIGJpbmRpbmdDb250ZXh0KSB7XHJcblx0XHR2YXIgcHJvcGVydGllcyA9IGtvLnB1cmVDb21wdXRlZChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBvYmogPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHZhbHVlQWNjZXNzb3IoKSk7XHJcblx0XHRcdHJldHVybiBrby5iaW5kaW5nSGFuZGxlcnMuZm9yZWFjaHByb3AudHJhbnNmb3JtT2JqZWN0KG9iaik7XHJcblx0XHR9KTtcclxuXHRcdGtvLmFwcGx5QmluZGluZ3NUb05vZGUoZWxlbWVudCwge1xyXG5cdFx0XHRmb3JlYWNoOiBwcm9wZXJ0aWVzXHJcblx0XHR9LCBiaW5kaW5nQ29udGV4dCk7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRjb250cm9sc0Rlc2NlbmRhbnRCaW5kaW5nczogdHJ1ZVxyXG5cdFx0fTtcclxuXHR9XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY3VzdG9tQmluZGluZ3MvZm9yZWFjaFByb3AuYmluZGluZy5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjb21tb24gPSB7XHJcblx0Y29udGFpbmVyOiAnYm9keScsXHJcblx0dHJpZ2dlcjogJ2hvdmVyJyxcclxuXHRwbGFjZW1lbnQ6ICdib3R0b20nXHJcbn07XHJcblxyXG5rby5iaW5kaW5nSGFuZGxlcnMucG9wb3ZlciA9IHtcclxuXHR1cGRhdGU6IGZ1bmN0aW9uKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IpIHtcclxuXHRcdHZhciAkZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblx0XHR2YXIgcGFyYW1zID0gdmFsdWVBY2Nlc3NvcigpO1xyXG5cdFx0dmFyIGNvbmZpZyA9ICQuZXh0ZW5kKHt9LCBjb21tb24sIHBhcmFtcywge2RhdGE6IG51bGx9KTtcclxuXHJcblx0XHRpZiAocGFyYW1zLnR5cGUgPT09ICdwb3BvdmVyJyAmJiBwYXJhbXMuZGF0YSkge1xyXG5cdFx0XHR2YXIgZGF0YSA9IGtvLnVud3JhcChwYXJhbXMuZGF0YSk7XHJcblx0XHRcdGNvbmZpZy50aXRsZSA9IGBFcnJvciAke2RhdGFbMF19OiAke2RhdGFbMV19YDtcclxuXHRcdFx0Y29uZmlnLmNvbnRlbnQgPSBkYXRhWzJdO1xyXG5cdFx0XHQkZWxlbWVudC5wb3BvdmVyKGNvbmZpZyk7XHJcblx0XHRcdGlmIChjb25maWcudHJpZ2dlciA9PT0gJ2NsaWNrJykge1xyXG5cdFx0XHRcdHZhciB0aW1lcjtcclxuXHRcdFx0XHQkZWxlbWVudC5vbignc2hvd24uYnMucG9wb3ZlcicsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdCRlbGVtZW50LnRyaWdnZXIoJ2NsaWNrJyk7XHJcblx0XHRcdFx0XHR9LCAyMDAwKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHQkZWxlbWVudC5vbignaGlkZS5icy5wb3BvdmVyJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbmZpZy5kZWxheSA9IHtcclxuXHRcdFx0XHRcInNob3dcIjogMTUwMCxcclxuXHRcdFx0XHRcImhpZGVcIjogMTAwXHJcblx0XHRcdH07XHJcblx0XHRcdGNvbmZpZy50aXRsZSA9IHBhcmFtcy50aXRsZSB8fCBjb25maWcudGl0bGU7XHJcblx0XHRcdCRlbGVtZW50LnRvb2x0aXAoY29uZmlnKTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY3VzdG9tQmluZGluZ3MvcG9wb3Zlci5iaW5kaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGJhc2UgPSB7fTtcclxudmFyIENPTkZJR19VUkwgPSAnLi4vLi4vYXBpZGVzY3JpcHRpb24ueG1sJztcclxuXHJcbnZhciBwYXJzZURhdGEgPSBmdW5jdGlvbiAoeG1sKSB7XHJcblx0dmFyIGdsb2JhbCA9IHt9O1xyXG5cdC8vZ2V0IGFsbCBBUElzXHJcblx0dmFyIHJlc291cmNlc0VsID0gJCh4bWwpLmZpbmQoXCJyZXNvdXJjZXNcIikuZXEoMCk7XHJcblxyXG5cdC8vIHJlc291cmNlXHJcblx0JCh4bWwpXHJcblx0XHQuZmluZChcInJlc291cmNlXCIpXHJcblx0XHQuZ2V0KClcclxuXHRcdC5tYXAoZnVuY3Rpb24gKHJlcykge1xyXG5cdFx0XHR2YXIgcmVzb3VyY2UgPSAkKHJlcyk7XHJcblx0XHRcdC8vIG1ldGhvZCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHR2YXIgbWV0aG9kRWxlbSA9IHJlc291cmNlLmZpbmQoXCJtZXRob2RcIikuZXEoMCk7XHJcblxyXG5cdFx0XHR2YXIgbWV0aG9kID0ge1xyXG5cdFx0XHRcdGlkIDogbWV0aG9kRWxlbS5hdHRyKFwiaWRcIiksIC8vIG1ldGhvZCBpZFxyXG5cdFx0XHRcdG5hbWUgOiBtZXRob2RFbGVtLmF0dHIoXCJhcGlnZWU6ZGlzcGxheU5hbWVcIikgfHwgbWV0aG9kRWxlbS5hdHRyKFwiaWRcIiksIC8vIG1ldGhvZCBuYW1lXHJcblx0XHRcdFx0bWV0aG9kIDogbWV0aG9kRWxlbS5hdHRyKCduYW1lJyksIC8vIEdFVCBvciBQT1NUXHJcblx0XHRcdFx0Y2F0ZWdvcnkgOiBtZXRob2RFbGVtLmZpbmQoJ1twcmltYXJ5PVwidHJ1ZVwiXScpLnRleHQoKS50cmltKCksIC8vIEFQSSBuYW1lXHJcblx0XHRcdFx0cGF0aDogcmVzb3VyY2UuYXR0cigncGF0aCcpLCAvLyBtZXRob2QgVVJMXHJcblx0XHRcdFx0YmFzZSA6IHJlc291cmNlc0VsLmF0dHIoJ2Jhc2UnKSwgLy8gbWV0aG9kIGJhc2UgbGlua1xyXG5cdFx0XHRcdGxpbmsgOiBtZXRob2RFbGVtLmZpbmQoJ2RvYycpLmVxKDApLmF0dHIoJ2FwaWdlZTp1cmwnKSwgLy8gbGluayB0byBkb2N1bWVudGF0aW9uXHJcblx0XHRcdFx0ZGVzY3JpcHRpb24gOiBtZXRob2RFbGVtLmZpbmQoJ2RvYycpLmVxKDApLnRleHQoKS50cmltKCksIC8vbWV0aG9kIGRlc2NyaXB0aW9uXHJcblx0XHRcdFx0cGFyYW1ldGVyczoge31cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8vIHBhcmFtcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHRyZXNvdXJjZVxyXG5cdFx0XHRcdC5maW5kKCdwYXJhbScpXHJcblx0XHRcdFx0LmdldCgpXHJcblx0XHRcdFx0Lm1hcChmdW5jdGlvbiAocGFyKSB7XHJcblx0XHRcdFx0XHR2YXIgcGFyYW0gPSAkKHBhcik7XHJcblx0XHRcdFx0XHR2YXIgb3B0aW9ucyA9IHBhcmFtLmZpbmQoJ29wdGlvbicpO1xyXG5cdFx0XHRcdFx0dmFyIGlzU2VsZWN0ID0gISFvcHRpb25zLmxlbmd0aDtcclxuXHJcblx0XHRcdFx0XHR2YXIgcGFyYW1ldGVyID0ge1xyXG5cdFx0XHRcdFx0XHRuYW1lOiBwYXJhbS5hdHRyKCduYW1lJyksXHJcblx0XHRcdFx0XHRcdGRvYzogcGFyYW0uZmlyc3QoJ2RvYycpLnRleHQoKS50cmltKCksXHJcblx0XHRcdFx0XHRcdHN0eWxlOiBwYXJhbS5hdHRyKCdzdHlsZScpLFxyXG5cdFx0XHRcdFx0XHRyZXF1aXJlZDogcGFyYW0uYXR0cigncmVxdWlyZWQnKSxcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogcGFyYW0uYXR0cignZGVmYXVsdCcpID09PSAnbm9uZScgJiYgaXNTZWxlY3QgPyAnJyA6IHBhcmFtLmF0dHIoJ2RlZmF1bHQnKSxcclxuXHRcdFx0XHRcdFx0c2VsZWN0OiBpc1NlbGVjdFxyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRpZiAoaXNTZWxlY3QpIHtcclxuXHRcdFx0XHRcdFx0cGFyYW1ldGVyLm9wdGlvbnMgPSBvcHRpb25zLmdldCgpLm1hcChmdW5jdGlvbiAob3B0aW9uKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0XHRcdG5hbWU6ICQob3B0aW9uKS5hdHRyKCd2YWx1ZScpLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y2hlY2tlZDogJChvcHRpb24pLmF0dHIoJ3ZhbHVlJykgPT09IHBhcmFtZXRlci5kZWZhdWx0IHx8ICQob3B0aW9uKS5hdHRyKCd2YWx1ZScpID09PSAnbm9uZScsXHJcblx0XHRcdFx0XHRcdFx0XHRsaW5rOiBmYWxzZVxyXG5cdFx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdG1ldGhvZC5wYXJhbWV0ZXJzW3BhcmFtZXRlci5uYW1lXSA9IHBhcmFtZXRlcjtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdC8qKlxyXG5cdFx0XHQgKiBHbG9iYWwgb2JqIGNvbXBvc2l0aW9uXHJcbiAgICAgICAqL1xyXG5cdFx0XHQvLyBzZXQgY2F0ZWdvcnkgb2JqXHJcblx0XHRcdGdsb2JhbFttZXRob2QuY2F0ZWdvcnldID0gZ2xvYmFsW21ldGhvZC5jYXRlZ29yeV0gfHwge307XHJcblxyXG5cdFx0XHQvLyBzZXQgbWV0aG9kcyB0eXBlIG9ialxyXG5cdFx0XHRnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XS5BTEwgPSBnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XS5BTEwgfHwge307XHJcblx0XHRcdGdsb2JhbFttZXRob2QuY2F0ZWdvcnldW21ldGhvZC5tZXRob2RdID0gZ2xvYmFsW21ldGhvZC5jYXRlZ29yeV1bbWV0aG9kLm1ldGhvZF0gfHwge307XHJcblxyXG5cdFx0XHQvLyBzZXQgbWV0aG9kIG9ialxyXG5cdFx0XHRnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XS5BTExbbWV0aG9kLmlkXSA9IG1ldGhvZDtcclxuXHRcdFx0Z2xvYmFsW21ldGhvZC5jYXRlZ29yeV1bbWV0aG9kLm1ldGhvZF1bbWV0aG9kLmlkXSA9IG1ldGhvZDtcclxuXHRcdH0pO1xyXG5cclxuXHRyZXR1cm4gZ2xvYmFsO1xyXG59O1xyXG5cclxuLy9nZXRzIGRvY3VtZW50IGZyb20gV0FETCBjb25maWd1cmF0aW9uIGZpbGVcclxudmFyIHJlYWRGcm9tV0FETCA9IGZ1bmN0aW9uICgpIHtcclxuICAkLmFqYXgoe1xyXG4gICAgdXJsOiBDT05GSUdfVVJMLFxyXG4gICAgYXN5bmMgOiBmYWxzZSxcclxuICAgIGRhdGFUeXBlOiAoJC5icm93c2VyLm1zaWUpID8gXCJ0ZXh0XCIgOiBcInhtbFwiLFxyXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgdmFyIHhtbDtcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UgPT0gXCJzdHJpbmdcIil7XHJcbiAgICAgICAgeG1sID0gbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MRE9NXCIpO1xyXG4gICAgICAgIHhtbC5hc3luYyA9IGZhbHNlO1xyXG4gICAgICAgIHhtbC5sb2FkWE1MKHJlc3BvbnNlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB4bWwgPSByZXNwb25zZTtcclxuICAgICAgfVxyXG5cclxuXHRcdFx0YmFzZSA9IHBhcnNlRGF0YSh4bWwpO1xyXG4gICAgfSxcclxuXHJcbiAgICBlcnJvcjogZnVuY3Rpb24oWE1MSHR0cFJlcXVlc3QsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKXtcclxuICAgICAgYWxlcnQoJ0RhdGEgQ291bGQgTm90IEJlIExvYWRlZCAtICcrIHRleHRTdGF0dXMpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59O1xyXG5yZWFkRnJvbVdBREwoKTtcclxubW9kdWxlLmV4cG9ydHMgPSBiYXNlO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvYmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhcGlLZXkgPSAnWGlPck4yVUM5eWp1UjRYRjg3c2RNYlJwYVZOc1A2VzInIHx8IGFwaUtleVNlcnZpY2UuY2hlY2tBcGlLZXlDb29raWUoJ3RrLWFwaS1rZXknKSB8fCBhcGlLZXlTZXJ2aWNlLmdldEFwaUV4cGxvcmVLZXkoKTsgLy9BUEkgS2V5XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBuYW1lOiAnYXBpa2V5JyxcclxuICBzdHlsZTogJ3F1ZXJ5JyxcclxuICB2YWx1ZToga28ub2JzZXJ2YWJsZShhcGlLZXkpXHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9hcGlrZXkuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcclxuICogQWpheCBTZXJ2aWNlXHJcbiAqIEBwYXJhbSB1cmxcclxuICogQHBhcmFtIG1ldGhvZFxyXG4gKiBAcGFyYW0gY2FsbGJhY2tcclxuICovXHJcbnZhciBhamF4U2VydmljZSA9IGZ1bmN0aW9uICh1cmwsIG1ldGhvZCwgY2FsbGJhY2spIHtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogbWV0aG9kLFxyXG4gICAgdXJsOiB1cmwsXHJcbiAgICBhc3luYzogdHJ1ZSxcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIGNvbXBsZXRlOiBjYWxsYmFja1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpbHRlcnMgYW5kIHByZXBhcmVzIHBhcmFtcyBwYWlyc1xyXG4gKiBAcGFyYW0gYXJyXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxudmFyIHByZXBhcmVVcmwgPSBmdW5jdGlvbiAoYXJyKSB7XHJcbiAgdmFyIHJlcGxhY2VtZW50LCB1cmwsIGRvbWFpbiwgcGF0aCwgbWV0aG9kLCBhcGlLZXksIHBhcmFtcztcclxuXHJcbiAgaWYgKCFhcnIgJiYgIWFyci5sZW5ndGgpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgXHJcbiAgZG9tYWluID0gYXJyWzBdLmJhc2U7XHJcbiAgcGF0aCA9IGFyclswXS5wYXRoO1xyXG4gIGFwaUtleSA9IGFyclsxXTtcclxuICBwYXJhbXMgPSBhcnJbMl0uZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICByZXR1cm4gaXRlbS5zdHlsZSA9PT0gJ3F1ZXJ5JztcclxuICB9KTtcclxuXHJcbiAgLy8gYXJyIG9mIHRlbXBsYXRlIG1hcmtzXHJcbiAgcmVwbGFjZW1lbnQgPSBwYXRoLm1hdGNoKC8oW157XSo/KVxcdyg/PVxcfSkvZ21pKTtcclxuXHJcbiAgLy8gYXJyIG9mIHRlbXBsYXRlIHBhcmFtc1xyXG4gIHZhciB0ZW1wbGF0ZXNBcnIgPSBhcnJbMl0uZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICByZXR1cm4gaXRlbS5zdHlsZSA9PT0gJ3RlbXBsYXRlJztcclxuICB9KTtcclxuXHJcbiAgLy8gcmVwbGFjZW1lbnRcclxuICByZXBsYWNlbWVudC5mb3JFYWNoKGZ1bmN0aW9uICh2YWwpIHtcclxuICAgIHZhciBwYXJhbSA9IHRlbXBsYXRlc0Fyci5maW5kKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgIHJldHVybiBpdGVtLm5hbWUgPT09IHZhbDtcclxuICAgIH0pO1xyXG4gICAgcGF0aCA9IHBhdGgucmVwbGFjZSgneycrIHBhcmFtLm5hbWUgKyAnfScsIHBhcmFtLnZhbHVlKCkgfHwgcGFyYW0uZGVmYXVsdCk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIGFkZHMgYXBpS2V5IHBhcmFtXHJcbiAgaWYgKCFwYXJhbXNbMF0gfHwgcGFyYW1zWzBdLm5hbWUgIT09ICdhcGlrZXknKSB7XHJcbiAgICBwYXJhbXMudW5zaGlmdChhcGlLZXkpO1xyXG4gIH1cclxuXHJcbiAgLy8gcHJlcGFyZXMgcGFyYW1zIHBhcnQgb2YgdXJsXHJcbiAgcGFyYW1zID0gcGFyYW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICByZXR1cm4gW2l0ZW0ubmFtZSwgaXRlbS52YWx1ZSgpIHx8IGl0ZW0uZGVmYXVsdF0uam9pbignPScpO1xyXG4gICAgfSkuam9pbignJicpO1xyXG5cclxuICB1cmwgPSBbZG9tYWluLCAnLycsIHBhdGgsICc/JywgcGFyYW1zXS5qb2luKCcnKTtcclxuXHJcbiAgcmV0dXJuIGVuY29kZVVSSSh1cmwpO1xyXG59O1xyXG5cclxuLy8gc2VuZHMgcmVxdWVzdCB0byBnZXQgdGhlIHNlY29uZCBjb2x1bW5cclxudmFyIHNlbmRQcmltYXJ5UmVxdWVzdCA9IGZ1bmN0aW9uIChhcnIsIHJlcXVlc3RzLCBvbkVycm9yLCBnbG9iYWwpIHtcclxuICB2YXIgdXJsID0gcHJlcGFyZVVybChhcnIpO1xyXG5cclxuICBhamF4U2VydmljZSh1cmwsIGFyclswXS5tZXRob2QsIGZ1bmN0aW9uKHJlcywgbXNnKSB7XHJcblx0XHR2YXIgcmVzT2JqID0ge1xyXG5cdFx0XHRyZXE6IHVybCxcclxuXHRcdFx0aW5kZXg6IHJlcXVlc3RzKCkubGVuZ3RoXHJcblx0XHR9O1xyXG5cclxuXHRcdGlmIChtc2cgPT0gJ2Vycm9yJykge1xyXG5cdFx0XHQvLyBub3RpZnlpbmcgZXJyb3IgbW9kYWxcclxuXHRcdFx0b25FcnJvci5ub3RpZnlTdWJzY3JpYmVycyhyZXMsICdlcnJvcicpO1xyXG5cdFx0XHQvLyBlcnJvciBwb3BvdmVyIG9mIHJlcXVlc3RcclxuXHRcdFx0cmVzT2JqLmVycm9yID0gcmVzO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Z2xvYmFsLmxhc3RSZXNwb25zZSA9IHJlc09iai5yZXMgPSB7XHJcblx0XHRcdFx0aWQ6IGFyclswXS5pZCwgLy8gbWV0aG9kIGlkIHdhcyB1c2VkXHJcblx0XHRcdFx0cmVzOiByZXMucmVzcG9uc2VKU09OIC8vIHJlc3BvbnNlXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gZXhwb3J0aW5nIGRhdGEgdXNpbmcgb2JzZXJ2YWJsZVxyXG5cdFx0cmVxdWVzdHMudW5zaGlmdChyZXNPYmopO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc2VuZFByaW1hcnlSZXF1ZXN0O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvYWpheFNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgY29uZmlnID0ga28ub2JzZXJ2YWJsZSgpO1xyXG5cclxuJC5hamF4KHtcclxuXHR0eXBlOiAnR0VUJyxcclxuXHR1cmw6IFtcclxuXHRcdCdodHRwOi8vJyxcclxuXHRcdGRvY3VtZW50LmxvY2F0aW9uLmhvc3RuYW1lLFxyXG5cdFx0ZG9jdW1lbnQubG9jYXRpb24ucG9ydCAmJiAnOicgKyBkb2N1bWVudC5sb2NhdGlvbi5wb3J0LFxyXG5cdFx0Jy9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb25maWcuanNvbidcclxuXHRdLmpvaW4oJycpLFxyXG5cdGFzeW5jOiB0cnVlLFxyXG5cdGRhdGFUeXBlOiBcImpzb25cIixcclxuXHRjb21wbGV0ZTogZnVuY3Rpb24ocmVzLCBtc2cpIHtcclxuXHRcdGlmIChtc2cgPT0gJ2Vycm9yJykge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdjYW5cXCd0IGxvYWQgY29uZmlnLmpzb24hJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25maWcocmVzLnJlc3BvbnNlSlNPTik7XHJcblx0XHR9XHJcblx0fVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY29uZmlnO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvY29uZmlnU2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaGYgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2hlbHBlckZ1bmMnKTtcclxudmFyIHNlbGY7XHJcblxyXG4vKipcclxuICogTWVudSBWaWV3LU1vZGVsXHJcbiAqIEBwYXJhbSBiYXNlXHJcbiAqIEBwYXJhbSBjYXRlZ29yeVxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIE1lbnVWaWV3TW9kZWwoYmFzZSwgc2VsZWN0ZWRDYXRlZ29yeSkge1xyXG4gIHNlbGYgPSB0aGlzO1xyXG5cclxuXHR0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkgPSBzZWxlY3RlZENhdGVnb3J5O1xyXG5cdHZhciBpbml0Q2F0ZWdvcnkgPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHNlbGVjdGVkQ2F0ZWdvcnkpO1xyXG5cdHRoaXMuY2F0ZWdvcmllcyA9IGtvLm9ic2VydmFibGVBcnJheShPYmplY3Qua2V5cyhiYXNlKS5tYXAoZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XHJcblx0XHR2YXIgY2hlY2tlZCA9IGluaXRDYXRlZ29yeSA/IGl0ZW0gPT09IGluaXRDYXRlZ29yeTogIWluZGV4O1xyXG5cdFx0Ly8gaW5pdGlhbCBsb2FkXHJcblx0XHRjaGVja2VkICYmIHNlbGYuc2VsZWN0ZWRDYXRlZ29yeShpdGVtKTtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGNoZWNrZWQ6IGtvLm9ic2VydmFibGUoY2hlY2tlZCksXHJcblx0XHRcdG5hbWU6IGl0ZW0sXHJcblx0XHRcdGxpbms6IGZhbHNlXHJcblx0XHR9XHJcblx0fSkpO1xyXG59XHJcblxyXG4vKipcclxuICogTWVudSBWaWV3LU1vZGVsIG1ldGhvZFxyXG4gKiBAcGFyYW0gY2F0ZWdvcnlcclxuICovXHJcbk1lbnVWaWV3TW9kZWwucHJvdG90eXBlLnNlbGVjdENhdGVnb3J5ID0gZnVuY3Rpb24gKGNhdGVnb3J5KSB7XHJcbiAgdmFyIGNhdGVnb3J5TmFtZSA9IGNhdGVnb3J5Lm5hbWU7XHJcbiAgc2VsZi5zZWxlY3RlZENhdGVnb3J5KGNhdGVnb3J5TmFtZSk7XHJcbiAgaGYuY2hlY2tBY3RpdmUoc2VsZi5jYXRlZ29yaWVzLCBjYXRlZ29yeU5hbWUpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNZW51Vmlld01vZGVsO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvbWVudVZpZXdNb2RlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzLmdldE1vZGVsQXJyYXkgPSBmdW5jdGlvbiBnZXRNb2RlbEFycmF5KHBhcmFtcykge1xyXG4gICAgdmFyIG9iaiA9IHBhcmFtcy5vYmogfHwge30sXHJcbiAgICAgICAgYXJyID0gcGFyYW1zLmFyciB8fCBbXSxcclxuICAgICAgICBwcm9wID0gcGFyYW1zLnByb3AgfHwgJ25hbWUnO1xyXG5cclxuICAgIGZvciAodmFyIGkgaW4gb2JqKSB7XHJcbiAgICAgICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoaSkpIHsgY29udGludWU7IH1cclxuXHJcbiAgICAgICAgdmFyIGl0ZW0gPSBhcnIuZmluZChmdW5jdGlvbiAobTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG0xLm5hbWUgPT09IG9ialtpXVtwcm9wXTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGl0ZW0pIHsgY29udGludWU7IH1cclxuXHJcbiAgICAgICAgYXJyLnB1c2goe1xyXG4gICAgICAgICAgICBjaGVja2VkOiBrby5vYnNlcnZhYmxlKGZhbHNlKSxcclxuICAgICAgICAgICAgbmFtZTogb2JqW2ldW3Byb3BdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyO1xyXG59O1xyXG5cclxuZXhwb3J0cy5jaGVja0FjdGl2ZSA9IGZ1bmN0aW9uIGNoZWNrQWN0aXZlKGtvQXJyLCBhY3RpdmVFbGVtKSB7XHJcbiAgICBpZiAoIWtvQXJyICYmICFhY3RpdmVFbGVtKSB7cmV0dXJuIGZhbHNlO31cclxuXHJcbiAgICBrb0Fycihrb0FycigpLm1hcChmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgaWYgKG9iai5uYW1lID09PSBhY3RpdmVFbGVtKSB7XHJcbiAgICAgICAgICAgIG9iai5jaGVja2VkKHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9iai5jaGVja2VkKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH0pKTtcclxufTtcclxuXHJcbmV4cG9ydHMuaXRlcmF0ZSA9IGZ1bmN0aW9uIChvYmopIHtcclxuXHRmb3IgKHZhciBwcm9wZXJ0eSBpbiBvYmopIHtcclxuXHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XHJcblx0XHRcdGlmICh0eXBlb2Ygb2JqW3Byb3BlcnR5XSA9PSBcIm9iamVjdFwiKSB7XHJcblx0XHRcdFx0aXRlcmF0ZShvYmpbcHJvcGVydHldKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnfCcgKyBwcm9wZXJ0eSArIFwiIHwgIFwiICsgb2JqW3Byb3BlcnR5XSArICd8Jyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvaGVscGVyRnVuYy5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcclxudmFyIGJhc2U7XHJcbnZhciBoZiA9IHJlcXVpcmUoJy4uL21vZHVsZXMvaGVscGVyRnVuYycpO1xyXG4vKipcclxuICogUGFyYW1zIFZpZXctTW9kZWxcclxuICogQHBhcmFtIHJhd1xyXG4gKiBAcGFyYW0gbWV0aG9kXHJcbiAqIEBwYXJhbSBwYXJhbXNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBQYXJhbXNWaWV3TW9kZWwocmF3LCBtZXRob2QsIHBhcmFtcykge1xyXG4gIGJhc2UgPSByYXc7XHJcbiAgc2VsZiA9IHRoaXM7XHJcbiAgdGhpcy5hbmltYXRpb25TcGVlZCA9IDIwMDtcclxuXHJcbiAgLy8gb2JzZXJ2YWJsZXNcclxuICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcclxuICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcclxuICB0aGlzLmlzSGlkZGVuID0ga28ub2JzZXJ2YWJsZSh0cnVlKTtcclxuICB0aGlzLnBhcmFtSW5Gb2N1cyA9IGtvLm9ic2VydmFibGUoJycpO1xyXG5cdHRoaXMucGFyYW1zTW9kZWwgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xyXG5cclxuXHQvLyBjb21wdXRlZFxyXG5cdC8vIHRoaXMucGFyYW1zTW9kZWwgPSBrby5jb21wdXRlZCh0aGlzLnVwZGF0ZVBhcmFtc01vZGVsLCB0aGlzKTtcclxuXHR0aGlzLnVwZGF0ZVZpZXdNb2RlbCgpO1xyXG5cdHRoaXMubWV0aG9kLnN1YnNjcmliZSh0aGlzLnVwZGF0ZVZpZXdNb2RlbCwgdGhpcyk7XHJcblxyXG5cdHRoaXMuaXNEaXJ0eSA9IGtvLmNvbXB1dGVkKHRoaXMuY2hlY2tEaXJ0eSwgdGhpcyk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogSW5pdGlhbCBidWlsZCBvZiBTZWxlY3QgTW9kZWxcclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUudXBkYXRlVmlld01vZGVsID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciBvYmogPSB0aGlzLm1ldGhvZCgpLnBhcmFtZXRlcnMgfHwge30sXHJcblx0XHRhcnIgPSBbXTtcclxuXHJcblx0Zm9yICh2YXIgaSBpbiBvYmopIHtcclxuXHRcdGlmICghb2JqLmhhc093blByb3BlcnR5KGkpKSB7Y29udGludWU7fVxyXG5cclxuXHRcdC8vIGNvcGllcyBhbGwgdmFsdWVzIGZyb20gbW9kZWwgdG8gdmlldy1tb2RlbFxyXG5cdFx0dmFyIHZtUGFyYW0gPSAkLmV4dGVuZCh7fSwgb2JqW2ldKTtcclxuXHJcblx0XHR2bVBhcmFtLnZhbHVlID0ga28ub2JzZXJ2YWJsZSh2bVBhcmFtLnZhbHVlIHx8ICh2bVBhcmFtLnNlbGVjdCAmJiB2bVBhcmFtLmRlZmF1bHQpIHx8ICcnKTtcclxuXHJcblx0XHQvL2FkZCBvYnNlcnZhYmxlIGZvciBzZWxlY3RlZCBvcHRpb25zXHJcblx0XHRpZiAodm1QYXJhbS5zZWxlY3QpIHtcclxuXHRcdFx0dm1QYXJhbS5vcHRpb25zID0ga28ub2JzZXJ2YWJsZUFycmF5KG9ialtpXS5vcHRpb25zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG5cdFx0XHRcdHZhciBvYmogPSAkLmV4dGVuZCh7fSwgaXRlbSk7XHJcblx0XHRcdFx0b2JqLmNoZWNrZWQgPSBrby5vYnNlcnZhYmxlKGl0ZW0uY2hlY2tlZCk7XHJcblx0XHRcdFx0cmV0dXJuIG9iajtcclxuXHRcdFx0fSkpXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gJ2RpcnR5JyBmbGFnIHdhdGNoZXIgZm9yIGN1cnJlbnQgZmllbGRcclxuXHRcdHZtUGFyYW0uaXNEaXJ0eSA9IGtvLnB1cmVDb21wdXRlZChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh0aGlzLnNlbGVjdCkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnZhbHVlKCkgIT09IHRoaXMuZGVmYXVsdCAmJiB0aGlzLnZhbHVlKCkgIT09ICdub25lJztcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gISEodGhpcy52YWx1ZSgpLnRvU3RyaW5nKCkpLnRyaW0oKS5sZW5ndGg7XHJcblx0XHR9LCB2bVBhcmFtKTtcclxuXHJcblx0XHQvLyBhZGQgY2FsZW5kYXIgYnRuIGZvciBjdXJyZW50IGZpZWxkXHJcblx0XHR2bVBhcmFtLmhhc0NhbGVuZGFyID0gaS5zZWFyY2goLyhkYXRlfHRpbWUpL2dtaSkgIT0gLTE7XHJcblxyXG5cdFx0Ly8gYWRkIHBvcC11cCBidG4gZm9yIGN1cnJlbnQgZmllbGRcclxuXHRcdHZtUGFyYW0uaGFzUG9wVXAgPSBpLnNlYXJjaCgvKGF0dHJhY3Rpb25JZHx2ZW51ZUlkKS9nbWkpICE9IC0xO1xyXG5cclxuXHRcdGFyci5wdXNoKHZtUGFyYW0pO1xyXG5cdH1cclxuXHJcblx0Ly8gcHJlcGFyZSBvdXRwdXQgZm9yIHJlcXVlc3RcclxuXHR0aGlzLnBhcmFtc01vZGVsKGFycik7XHJcblx0dGhpcy5wYXJhbUluRm9jdXModGhpcy5wYXJhbXNNb2RlbCgpWzBdKTtcclxuXHR0aGlzLnByZXBhcmVVcmxQYWlycyhhcnIsIHRoaXMucGFyYW1zKTtcclxuXHRyZXR1cm4gYXJyO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERpcnR5IHBhcmFtcyBmb3JtIG9ic2VydmFibGUgbWV0aG9kXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5jaGVja0RpcnR5ID0gZnVuY3Rpb24gKCkge1xyXG5cdHRoaXMucHJlcGFyZVVybFBhaXJzKHRoaXMucGFyYW1zTW9kZWwoKSwgdGhpcy5wYXJhbXMpO1xyXG5cdHZhciBkaXJ0eSA9IHRoaXMucGFyYW1zTW9kZWwoKS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdHJldHVybiBpdGVtLmlzRGlydHkoKSA9PT0gdHJ1ZTtcclxuXHR9KTtcclxuXHRyZXR1cm4gZGlydHkubGVuZ3RoID4gMDtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogRW50ZXIga2V5IGhhbmRsZXJcclxuICogQHBhcmFtIG1vZGVsXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5vbkVudGVyS2V5RG93biA9IGZ1bmN0aW9uIChtb2RlbCwgZXZlbnQpIHtcclxuICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICQoJyNhcGktZXhwLWdldC1idG4nKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogU2xpZGUgdG9nZ2xlIGZvciBwYXJhbXMgY29udGFpbmVyIG1ldGhvZFxyXG4gKiBAcGFyYW0gdmlld01vZGVsXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5zbGlkZVRvZ2dsZSA9IGZ1bmN0aW9uICh2aWV3TW9kZWwsIGV2ZW50KSB7XHJcbiAgJChldmVudC5jdXJyZW50VGFyZ2V0KVxyXG4gICAgLnBhcmVudHMoJy5qcy1zbGlkZS1jb250cm9sJylcclxuICAgIC5maW5kKCcuanMtc2xpZGUtd3JhcHBlcicpXHJcbiAgICAuc2xpZGVUb2dnbGUodmlld01vZGVsLmFuaW1hdGlvblNwZWVkLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZpZXdNb2RlbC5pc0hpZGRlbighdmlld01vZGVsLmlzSGlkZGVuKCkpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogTWFjaGVzIGZvY3VzZWQgcGFyYW1cclxuICogQHBhcmFtIGl0ZW1cclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUub25Gb2N1cyA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgc2VsZi5wYXJhbUluRm9jdXMoaXRlbSk7XHJcbn07XHJcblxyXG4vKipcclxuICogRmlsdGVycyBwYXJhbXMgYnkgZGVmaW5lZCB2YWx1ZVxyXG4gKiBAcGFyYW0gYXJyXHJcbiAqIEBwYXJhbSBrb09ic1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUucHJlcGFyZVVybFBhaXJzID0gZnVuY3Rpb24gKGFyciwga29PYnMpIHtcclxuICBpZiAoIWFyciAmJiAha29PYnMpIHtyZXR1cm4gZmFsc2U7fVxyXG5cclxuICByZXR1cm4ga29PYnMoYXJyLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgcmV0dXJuIChpdGVtLnZhbHVlKCkgfHwgaXRlbS5kZWZhdWx0KTtcclxuICB9KSk7XHJcbn07XHJcblxyXG4vKipcclxuICogT24gc2VsZWN0IHZhbHVlIGhhbmRsZXIgZm9yIHBhcmFtcyBzZWxlY3RcclxuICogQHBhcmFtIHBhcmFtIHtvYmplY3R9IHBhcmFtZXRlciB2aWV3LW1vZGVsXHJcbiAqIEBwYXJhbSBvcHRpb24ge29iamVjdH0gb3B0aW9uIHZpZXctbW9kZWxcclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUub25TZWxlY3RQYXJhbVZhbHVlID0gZnVuY3Rpb24gKHBhcmFtLCBvcHRpb24pIHtcclxuXHRoZi5jaGVja0FjdGl2ZShwYXJhbS5vcHRpb25zLCBvcHRpb24ubmFtZSk7XHJcblx0cGFyYW0udmFsdWUob3B0aW9uLm5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFBhcmFtcyBjbGVhciBidXR0b24gaGFuZGxlclxyXG4gKiBAcGFyYW0gdm0ge29iamVjdH0gdmlldyBtb2RlbFxyXG4gKiBAcGFyYW0gZSB7b2JqZWN0fSBldmVudFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5vblBhcmFtc0NsZWFyID0gZnVuY3Rpb24gKHZtLCBlKSB7XHJcblx0dGhpcy51cGRhdGVWaWV3TW9kZWwoKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGFyYW1zVmlld01vZGVsO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvcGFyYW1zVmlld01vZGVsLmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBoZiA9IHJlcXVpcmUoJy4uL21vZHVsZXMvaGVscGVyRnVuYycpO1xyXG52YXIgc2VsZjtcclxudmFyIGJhc2U7XHJcbnZhciBjYXRlZ29yeTtcclxuXHJcbi8qKlxyXG4gKiBNZXRob2RzIFZpZXctTW9kZWxcclxuICogQHBhcmFtIHJhd1xyXG4gKiBAcGFyYW0gY2F0ZWdvcnlcclxuICogQHBhcmFtIG1ldGhvZFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIE1ldGhvZHNWaWV3TW9kZWwocmF3LCBjYXRlZ29yeSwgbWV0aG9kKSB7XHJcbiAgc2VsZiA9IHRoaXM7XHJcbiAgYmFzZSA9IHJhdztcclxuXHJcbiAgLy8gb2JzZXJ2YWJsZXNcclxuICB0aGlzLmNhdGVnb3J5ID0gY2F0ZWdvcnk7XHJcbiAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XHJcbiAgdGhpcy50b2dnbGVQb3BVcCA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xyXG4gIHRoaXMucmFkaW9zTW9kZWwgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xyXG4gIHRoaXMubWV0aG9kc1ZpZXdNb2RlbCA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XHJcbiAgdGhpcy51cGRhdGVNb2RlbCh0aGlzLmNhdGVnb3J5KCkpO1xyXG4gIHRoaXMuY2F0ZWdvcnkuc3Vic2NyaWJlKHRoaXMudXBkYXRlTW9kZWwsIHRoaXMpO1xyXG59XHJcblxyXG4vKipcclxuICogT24gY2F0ZWdvcnkgY2hhbmdlIGhhbmRsZXJcclxuICogTWV0aG9kcyBWaWV3LU1vZGVsIG1ldGhvZFxyXG4gKiBAcGFyYW0gY2F0ZWdvcnlcclxuICovXHJcbk1ldGhvZHNWaWV3TW9kZWwucHJvdG90eXBlLnVwZGF0ZU1vZGVsID0gZnVuY3Rpb24gKGNhdGVnb3J5KSB7XHJcbiAgLy8gaW5pdGlhbCByYWRpb3MgbW9kZWxcclxuICBzZWxmLnVwZGF0ZVJhZGlvc01vZGVsKGJhc2VbY2F0ZWdvcnldKTtcclxuICAvLyBpbml0aWFsIHNlbGVjdCBtb2RlbCAoZmlyc3QgbWV0aG9kIGluIGZpcnN0IHNlY3Rpb24gZm9yIHN0YXJ0KVxyXG4gIHNlbGYudXBkYXRlU2VsZWN0KHNlbGYucmFkaW9zTW9kZWwoKVswXSk7XHJcbn07XHJcblxyXG4vKipcclxuICogT25jaGFuZ2UgaGFuZGxlciBmb3IgUmFkaW8gYnV0dG9uc1xyXG4gKiBAcGFyYW0gaXRlbVxyXG4gKi9cclxuTWV0aG9kc1ZpZXdNb2RlbC5wcm90b3R5cGUub25jaGFuZ2VSYWRpb3MgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gIC8vdXBkYXRlIFJhZGlvcyBNb2RlbFxyXG4gIGhmLmNoZWNrQWN0aXZlKHNlbGYucmFkaW9zTW9kZWwsIGl0ZW0ubmFtZSk7XHJcbiAgLy91cGRhdGUgU2VsZWN0IE1vZGVsXHJcbiAgc2VsZi51cGRhdGVTZWxlY3QoaXRlbSk7XHJcbn07XHJcblxyXG4vKipcclxuICogSW5pdGlhbCBidWlsZCBvZiBSYWRpb3MgTW9kZWxcclxuICogQHBhcmFtIHBhcmFtXHJcbiAqIEByZXR1cm5zIHtBcnJheX1cclxuICovXHJcbk1ldGhvZHNWaWV3TW9kZWwucHJvdG90eXBlLnVwZGF0ZVJhZGlvc01vZGVsID0gZnVuY3Rpb24gKHBhcmFtKSB7XHJcbiAgdmFyIG9iaiA9IHBhcmFtIHx8IHt9LFxyXG4gICAgYXJyID0gW107XHJcblxyXG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XHJcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShpKSkgeyBjb250aW51ZTsgfVxyXG4gICAgdmFyIGl0ZW0gPSB7XHJcbiAgICAgIGNoZWNrZWQ6IGtvLm9ic2VydmFibGUoaSA9PT0gJ0FMTCcpLFxyXG4gICAgICBuYW1lOiBpXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChpID09PSAnQUxMJykge1xyXG4gICAgICBhcnIudW5zaGlmdChpdGVtKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYXJyLnB1c2goaXRlbSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cdGFyciA9IGFyci5zb3J0KGNvbXBhcmVNZXRob2RzKTtcclxuICB0aGlzLnJhZGlvc01vZGVsKGFycik7XHJcbiAgcmV0dXJuIGFycjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsIGJ1aWxkIG9mIFNlbGVjdCBNb2RlbFxyXG4gKiBAcGFyYW0gaXRlbVxyXG4gKi9cclxuTWV0aG9kc1ZpZXdNb2RlbC5wcm90b3R5cGUudXBkYXRlU2VsZWN0ID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICB2YXIgb2JqID0gYmFzZVtzZWxmLmNhdGVnb3J5KCldW2l0ZW0ubmFtZV18fCB7fSxcclxuICAgIGFyciA9IFtdLFxyXG4gICAgY291bnQgPSAwO1xyXG5cclxuICBmb3IgKHZhciBpIGluIG9iaikge1xyXG4gICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoaSkpIHsgY29udGludWU7IH1cclxuICAgIHZhciBwcm9wZXJ0eSA9IG9ialtpXTtcclxuXHRcdC8vIGNvcGllcyBhbGwgdmFsdWVzIGZyb20gbW9kZWwgdG8gdmlldy1tb2RlbFxyXG5cdFx0dmFyIHZtTWV0aG9kID0gJC5leHRlbmQoe30sIHByb3BlcnR5KTtcclxuXHJcblx0XHRkZWxldGUgdm1NZXRob2QucGFyYW1ldGVycztcclxuXHRcdHZtTWV0aG9kLmNoZWNrZWQgPSBrby5vYnNlcnZhYmxlKCFjb3VudCk7XHJcblxyXG5cdFx0YXJyLnB1c2godm1NZXRob2QpO1xyXG5cclxuICAgIC8vIHNldCBnbG9iYWwgb2JzZXJ2YWJsZVxyXG4gICAgIWNvdW50ICYmIHRoaXMubWV0aG9kKGJhc2VbcHJvcGVydHkuY2F0ZWdvcnldW3Byb3BlcnR5Lm1ldGhvZF1bcHJvcGVydHkuaWRdKTtcclxuXHJcbiAgICBjb3VudCsrO1xyXG5cclxuICB9XHJcblxyXG5cdHRoaXMubWV0aG9kc1ZpZXdNb2RlbChhcnIpO1xyXG5cdHJldHVybiBhcnI7XHJcbn07XHJcblxyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS5vblNlbGVjdE1ldGhvZCA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgaGYuY2hlY2tBY3RpdmUoc2VsZi5tZXRob2RzVmlld01vZGVsLCBpdGVtLm5hbWUpO1xyXG4gIHNlbGYubWV0aG9kKGJhc2VbaXRlbS5jYXRlZ29yeV1baXRlbS5tZXRob2RdW2l0ZW0uaWRdKTtcclxufTtcclxuXHJcbk1ldGhvZHNWaWV3TW9kZWwucHJvdG90eXBlLm9uQWJvdXRDbGljayA9IGZ1bmN0aW9uIChtb2RlbCwgZXZlbnQpIHtcclxuICBtb2RlbC50b2dnbGVQb3BVcCghbW9kZWwudG9nZ2xlUG9wVXAoKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogU29ydCBmdW5jdGlvbiBmb3IgbWV0aG9kcyBhcmF5XHJcbiAqIEBwYXJhbSBmXHJcbiAqIEBwYXJhbSBzXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiBjb21wYXJlTWV0aG9kcyhmLHMpIHtcclxuXHR2YXIgYSA9IGYubmFtZS50b1VwcGVyQ2FzZSgpO1xyXG5cdHZhciBiID0gcy5uYW1lLnRvVXBwZXJDYXNlKCk7XHJcblxyXG5cdGlmIChhID09PSBiKSB7cmV0dXJuIDA7fVxyXG5cdGlmIChhID09PSAnQUxMJyB8fFxyXG5cdFx0KGEgPT09ICdHRVQnICYmIChiID09PSAnUE9TVCcgfHwgYiA9PT0gJ1BVVCcgfHwgYiA9PT0gJ0RFTEVURScpKSB8fFxyXG5cdFx0KGEgPT09ICdQT1NUJyAmJiAoYiA9PT0gJ1BVVCcgfHwgYiA9PT0gJ0RFTEVURScpKSB8fFxyXG5cdFx0KGEgPT09ICdQVVQnICYmIGIgPT09ICdERUxFVEUnKSkge1xyXG5cdFx0cmV0dXJuIC0xO1xyXG5cdH1cclxuXHRyZXR1cm4gMTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNZXRob2RzVmlld01vZGVsO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvbWV0aG9kc1ZpZXdNb2RlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIganNvbkhpZ2hsaWdodCA9IHJlcXVpcmUoJy4vLi4vbW9kdWxlcy9qc29uLWhpZ2hsaWdodCcpO1xudmFyIHNsaWRlciA9IHJlcXVpcmUoJy4uL21vZHVsZXMvc2xpZGVyJyk7XG52YXIgZmlsdGVyID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnLmpzb24nKTtcbnZhciBzZWxmO1xudmFyIGNvbG9ycyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29sb3JDbGFzc2VzJykuY29sb3JzO1xuXG5mdW5jdGlvbiBSZXF1ZXN0c0xpc3RWaWV3TW9kZWwocmVxdWVzdHMsIHNlbGVjdGVkUGFyYW1zLCBzaGFyZVBhdGgpIHtcblx0dGhpcy51cmwgPSBzZWxlY3RlZFBhcmFtcztcblx0c2VsZiA9IHRoaXM7XG5cdHRoaXMuY29sb3JzID0gY29sb3JzO1xuXHR0aGlzLnNoYXJlUGF0aCA9IHNoYXJlUGF0aDtcblx0dGhpcy5yZXF1ZXN0cyA9IHJlcXVlc3RzO1xuXHR0aGlzLmlzQWN0aXZlVGFiID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG5cdHRoaXMudmlld01vZGVsID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcblx0dGhpcy5jbGVhckJ0bklzVmlzaWJsZSA9IGtvLmNvbXB1dGVkKHRoaXMuX2lzVmlzaWJsZSwgdGhpcyk7XG5cdHRoaXMucmVxdWVzdHMuc3Vic2NyaWJlKHRoaXMudXBkYXRlTW9kZWwsIHRoaXMpO1xufVxuXG4vKipcbiAqIFVwZGF0ZSBWaWV3bW9kZWwgb2YgcmVxdWVzdCBsaXN0XG4gKiBAcGFyYW0gYXJyXG4gKi9cblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUudXBkYXRlTW9kZWwgPSBmdW5jdGlvbiAoYXJyKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0XG5cdHZhciBuZXdNb2RlbCA9IGtvLnVud3JhcCh0aGlzLnJlcXVlc3RzKVxuXHRcdC5tYXAoZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0dmFyIG5ld09iaiA9IHtcblx0XHRcdFx0Y29sb3I6IHNlbGYuY29sb3JzW29iai5pbmRleCAlIHNlbGYuY29sb3JzLmxlbmd0aF0sXG5cdFx0XHRcdGFjdGl2ZToga28ub2JzZXJ2YWJsZShmYWxzZSksXG5cdFx0XHRcdGNvcGllZEZvclNoYXJlOiBrby5vYnNlcnZhYmxlKGZhbHNlKSxcblx0XHRcdFx0Y29waWVkVXJsOiBrby5vYnNlcnZhYmxlKGZhbHNlKSxcblx0XHRcdFx0cmVzSFRNTDoga28ub2JzZXJ2YWJsZSgnJylcblx0XHRcdH07XG5cblx0XHRcdC8vIGVycm9yIHBvcG92ZXJcblx0XHRcdGlmIChvYmouZXJyb3IpIHtcblx0XHRcdFx0dmFyIGVycm9yT2JqID0gb2JqLmVycm9yO1xuXHRcdFx0XHRuZXdPYmouZXJyb3IgPSBrby5vYnNlcnZhYmxlKFtcblx0XHRcdFx0XHRPYmplY3QuZ2V0UHJvcChlcnJvck9iaiwgJy5yZXNwb25zZUpTT04uZXJyb3JzWzBdLnN0YXR1cycpIHx8IGVycm9yT2JqLnN0YXR1cyArICcnLFxuXHRcdFx0XHRcdE9iamVjdC5nZXRQcm9wKGVycm9yT2JqLCAnLnJlc3BvbnNlSlNPTi5lcnJvcnNbMF0uc3RhdHVzVGV4dCcpIHx8ICcnLFxuXHRcdFx0XHRcdE9iamVjdC5nZXRQcm9wKGVycm9yT2JqLCAnLnJlc3BvbnNlSlNPTi5lcnJvcnNbMF0uZGV0YWlsJykgfHwgJ3Vubm93bicsXG5cdFx0XHRcdFx0T2JqZWN0LmdldFByb3AoZXJyb3JPYmosICcucmVzcG9uc2VKU09OJykgfHwge31cblx0XHRcdFx0XSlcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuICQuZXh0ZW5kKHt9LCBvYmosIG5ld09iaik7XG5cdFx0fSk7XG5cdHNsaWRlci5yZW1vdmUoc2VsZi52aWV3TW9kZWwoKS5sZW5ndGgpO1xuXHRzZWxmLnZpZXdNb2RlbChuZXdNb2RlbCk7XG5cdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdHNsaWRlci5zZXQoc2VsZi52aWV3TW9kZWwoKS5sZW5ndGgpO1xuXHRcdCQoJyNzaG93LWRldGFpbHMtMCcpLnRyaWdnZXIoJ2NsaWNrJyk7XG5cdH0sIDEwKTtcbn07XG5cbi8qKlxuICogZ2V0IGRldGFpbHNcbiAqIEBwYXJhbSBkYXRhXG4gKi9cblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUuZ2V0TW9yZSA9IGZ1bmN0aW9uIChpZCwgZGF0YSkge1xuXHR2YXIgcGFuZWxHcm91cCA9IHRoaXMucGFuZWxHcm91cDtcblx0dmFyIHBhbmVsID0gdGhpcztcblx0dmFyIGN1cnJlbnRTbGlkZXIgPSAkKCcjc2xpZGVyLScgKyBwYW5lbEdyb3VwLnNlY3Rpb25JbmRleCk7XG5cdHZhciBjb21wb25lbnQgPSAkKCc8c2VjdGlvbiBkYXRhLWJpbmQ9XCJjb21wb25lbnQ6IHtuYW1lOiBcXCdwYW5lbC1ncm91cFxcJywgcGFyYW1zOiBwYXJhbXN9XCI+PC9zZWN0aW9uPicpO1xuXHR2YXIgY3Vyc2xpY2sgPSBjdXJyZW50U2xpZGVyLnNsaWNrKCdnZXRTbGljaycpO1xuXHRcblx0Ly8gZXh0ZW5kaW5nIGFkZGl0aW9uYWwgZGF0YSAoY29weSlcblx0dmFyIHBhcmFtcyA9ICQuZXh0ZW5kKHt9LCBwYW5lbEdyb3VwLCB7XG5cdFx0ZGF0YTogZGF0YSxcblx0XHRncm91cEluZGV4OiBwYW5lbEdyb3VwLmdyb3VwSW5kZXggKyAxLFxuXHRcdF9wcm9wVGl0bGU6IHR5cGVvZiBpZCA9PT0gJ3N0cmluZycgJiYgaWQsXG5cdFx0Y29uZmlnOiBwYW5lbC5jb25maWdcblx0fSk7XG5cblx0Ly8gYXBwbHkgY29tcG9uZW50IGRhdGEgYmluZGluZ3Ncblx0a28uYXBwbHlCaW5kaW5ncyh7XG5cdFx0cGFyYW1zOiBwYXJhbXNcblx0fSwgY29tcG9uZW50WzBdKTtcblx0XG5cdC8vIGFkZCBzbGlkZSB3aXRoIHNlbGVjdGVkIGRhdGFcblx0Y3VycmVudFNsaWRlci5zbGljaygnc2xpY2tBZGQnLCBjb21wb25lbnQpO1xuXHRcblx0Ly8gcmVtb3ZlIG91dHN0YW5kaW5nIHNsaWRlc1xuXHRmb3IgKHZhciBpID0gY3Vyc2xpY2suc2xpZGVDb3VudCAtIDI7IGkgPiBwYW5lbEdyb3VwLmdyb3VwSW5kZXg7IGktLSkge1xuXHRcdGN1cnJlbnRTbGlkZXIuc2xpY2soJ3NsaWNrUmVtb3ZlJywgaSwgZmFsc2UpO1xuXHR9XG5cdC8vIG1vdmUgdG8gbmV4dCBzbGlkZVxuXHRjdXJyZW50U2xpZGVyLnNsaWNrKCdzbGlja05leHQnKTtcbn07XG5cbi8qKlxuICogVmlzaWJpbGl0eSBmbGFnIGZvciBDbGVhciBidG5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5faXNWaXNpYmxlID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZSh0aGlzLnJlcXVlc3RzKS5sZW5ndGggPiAwO1xufTtcblxuLyoqXG4gKiBDbGVhciByZXF1ZXN0c3RzIGxpc3QgaGFuZGxlclxuICogQHBhcmFtIHZtXG4gKiBAcGFyYW0gZXZlbnRcbiAqL1xuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5vbkNsZWFyUmVxdWVzdHMgPSBmdW5jdGlvbiAodm0sIGV2ZW50KSB7XG5cdHRoaXMucmVxdWVzdHMoW10pO1xufTtcblxuLyoqXG4gKiBEZXRhaWxzIHRvZ2dsZSBoYW5kbGVyXG4gKiBAcGFyYW0gdm1cbiAqIEBwYXJhbSBldmVudFxuICovXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLmdldERldGFpbHMgPSBmdW5jdGlvbiAodm0sIGV2ZW50KSB7XG5cdGlmICghdGhpcy5yZXNIVE1MKCkubGVuZ3RoKSB7XG5cdFx0anNvbkhpZ2hsaWdodCh0aGlzLnJlc0hUTUwsIHRoaXMucmVzLnJlcyk7XG5cdH1cblx0dGhpcy5hY3RpdmUoIXRoaXMuYWN0aXZlKCkpO1xufTtcblxuLyoqXG4gKiBKb2luIHN0cmluZyBmb3IgaWQnc1xuICogQHBhcmFtIHNcbiAqIEBwYXJhbSBpXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLmdldFN0ciA9IGZ1bmN0aW9uIChzLCBpKSB7XG5cdHZhciBzdHIgPSBzO1xuXHR2YXIgaTEgPSBpID8gaSgpIDogJyc7XG5cdHJldHVybiBbXG5cdFx0c3RyLFxuXHRcdGkxXG5cdF0uam9pbignLScpO1xufTtcblxuLyoqXG4gKiBHZXQgcmF3IHJlc3BvbnNlIGRhdGFcbiAqIEBwYXJhbSBtb2RlbCB7b2JqZWN0fVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5nZXRSYXdEYXRhID0gZnVuY3Rpb24gKG1vZGVsKSB7XG5cdHZhciBjb250ZW50ID0gT2JqZWN0LmdldFByb3AobW9kZWwsICcucmVzLnJlcycpIHx8IGtvLnVud3JhcChtb2RlbC5lcnJvcilbM10gfHwge307XG5cdHZhciByYXdXaW5kb3cgPSB3aW5kb3cub3BlbihcImRhdGE6dGV4dC9qc29uLFwiICsgZW5jb2RlVVJJKEpTT04uc3RyaW5naWZ5KGNvbnRlbnQsIG51bGwsIDIpKSwgJ19ibGFuaycpO1xuXHRyYXdXaW5kb3cuZm9jdXMoKTtcbn07XG5cblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUuY29weVVybCA9IGZ1bmN0aW9uIChtb2RlbCwgZXZlbnQpIHtcblx0dmFyIGN1cnJlbnRGaWVsZCA9IHRoaXM7XG5cdHZhciBlbGVtZW50ID0gZXZlbnQuY3VycmVudFRhcmdldDtcblx0c2VsZi5jbGlwYm9hcmQgPSBuZXcgQ2xpcGJvYXJkKGVsZW1lbnQpO1xuXHRzZWxmLmNsaXBib2FyZC5vbignc3VjY2VzcycsIGZ1bmN0aW9uIG9uU3VjY2Vzc0NvcHkoZSkge1xuXHRcdGNvbnNvbGUuaW5mbygnQWN0aW9uOicsIGUuYWN0aW9uKTtcblx0XHRjb25zb2xlLmluZm8oJ1RleHQ6JywgZS50ZXh0KTtcblx0XHRjb25zb2xlLmluZm8oJ1RyaWdnZXI6JywgZS50cmlnZ2VyKTtcblx0XHQkKGVsZW1lbnQpLmhhc0NsYXNzKCdidG4tc2hhcmUnKSA/IGN1cnJlbnRGaWVsZC5jb3BpZWRGb3JTaGFyZSh0cnVlKSA6IGN1cnJlbnRGaWVsZC5jb3BpZWRVcmwodHJ1ZSk7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHQkKGVsZW1lbnQpLmhhc0NsYXNzKCdidG4tc2hhcmUnKSA/IGN1cnJlbnRGaWVsZC5jb3BpZWRGb3JTaGFyZShmYWxzZSkgOiBjdXJyZW50RmllbGQuY29waWVkVXJsKGZhbHNlKTtcblx0XHR9LCA1MDApO1xuXHRcdGUuY2xlYXJTZWxlY3Rpb24oKTtcblx0fSlcblx0XHQub24oJ2Vycm9yJywgZnVuY3Rpb24gb25FcnJvckNvcHkoZSkge1xuXHRcdFx0Y29uc29sZS5lcnJvcignQWN0aW9uOicsIGUuYWN0aW9uKTtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ1RyaWdnZXI6JywgZS50cmlnZ2VyKTtcblx0XHR9KTtcbn07XG5cblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUucmVtb3ZlSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcblx0c2VsZi5jbGlwYm9hcmQgJiYgc2VsZi5jbGlwYm9hcmQuZGVzdHJveSgpO1xuXHRkZWxldGUgc2VsZi5jbGlwYm9hcmQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlcXVlc3RzTGlzdFZpZXdNb2RlbDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvVmlld01vZGVscy9yZXF1ZXN0c0xpc3RWaWV3TW9kZWwuanNcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIFdvcmtlciA9IHJlcXVpcmUoJy4vaGlnaGxpZ2h0SnNvbi53b3JrZXIuanMnKTsgLy8gSnNvbi1mb3JtYXR0ZXIgd29ya2VyXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYnNlcnZhYmxlLCBjb2RlKSB7XHJcblx0dmFyIGFuaW1UaW1lID0gMTAwO1xyXG5cdHZhciB3b3JrZXIgPSBuZXcgV29ya2VyO1xyXG5cclxuXHR3b3JrZXIub25tZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRvYnNlcnZhYmxlKGV2ZW50LmRhdGEpO1xyXG5cclxuXHRcdCQoZG9jdW1lbnQpXHJcblx0XHRcdC5vbignY2xpY2sgdG91Y2gnLCAnLnRtLWNvZGUtY29udGFpbmVyIC5leHBhbmRlZCcsIGZ1bmN0aW9uIGpzb25Db2RlQ29udGFpbmVyRXhwYW5kZWQoZSkge1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdHZhciAkc2VsZiA9ICQodGhpcyk7XHJcblx0XHRcdFx0JHNlbGZcclxuXHRcdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdFx0LmZpbmQoJz51bCcpXHJcblx0XHRcdFx0XHQuc2xpZGVVcChhbmltVGltZSwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdCRzZWxmLmFkZENsYXNzKCdjb2xsYXBzZWQnKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQub24oJ2NsaWNrIHRvdWNoJywgJy50bS1jb2RlLWNvbnRhaW5lciAuZXhwYW5kZWQuY29sbGFwc2VkJywgZnVuY3Rpb24ganNvbkNvZGVDb250YWluZXJDb2xsYXBzZWQoZSkge1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdHZhciAkc2VsZiA9ICQodGhpcyk7XHJcblx0XHRcdFx0JHNlbGZcclxuXHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnY29sbGFwc2VkJylcclxuXHRcdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdFx0LmZpbmQoJz51bCcpXHJcblx0XHRcdFx0XHQuc2xpZGVEb3duKGFuaW1UaW1lLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0JHNlbGZcclxuXHRcdFx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpXHJcblx0XHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHR9KVxyXG5cdH07XHJcblx0d29ya2VyLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoZXZlbnQpO1xyXG5cdH07XHJcblxyXG5cdHdvcmtlci5wb3N0TWVzc2FnZShjb2RlKTtcclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2pzb24taGlnaGxpZ2h0LmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiByZXF1aXJlKFwiISFEOlxcXFx0aWNrZXRtYXN0ZXItYXBpLXN0YWdpbmcuZ2l0aHViLmlvXFxcXG5vZGVfbW9kdWxlc1xcXFx3b3JrZXItbG9hZGVyXFxcXGNyZWF0ZUlubGluZVdvcmtlci5qc1wiKShcIi8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcXG4vKioqKioqLyBcXHQvLyBUaGUgbW9kdWxlIGNhY2hlXFxuLyoqKioqKi8gXFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXFxuLyoqKioqKi8gXFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0XFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXFxuLyoqKioqKi8gXFx0XFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXFxuLyoqKioqKi8gXFx0XFx0XFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHRcXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxcbi8qKioqKiovIFxcdFxcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcXG4vKioqKioqLyBcXHRcXHRcXHRleHBvcnRzOiB7fSxcXG4vKioqKioqLyBcXHRcXHRcXHRpZDogbW9kdWxlSWQsXFxuLyoqKioqKi8gXFx0XFx0XFx0bG9hZGVkOiBmYWxzZVxcbi8qKioqKiovIFxcdFxcdH07XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHRcXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cXG4vKioqKioqLyBcXHRcXHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdFxcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcXG4vKioqKioqLyBcXHRcXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdFxcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXFxuLyoqKioqKi8gXFx0XFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xcbi8qKioqKiovIFxcdH1cXG4vKioqKioqL1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcXG4vKioqKioqLyBcXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcXG4vKioqKioqLyBcXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cXG4vKioqKioqLyBcXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcXFwiXFxcIjtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xcbi8qKioqKiovIFxcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xcbi8qKioqKiovIH0pXFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cXG4vKioqKioqLyAoW1xcbi8qIDAgKi9cXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcXG5cXG5cXHQvKipcXHJcXG5cXHQgKiBDb2RlIGZvcm1hdCB3ZWItd29ya2VyXFxyXFxuXFx0ICogQHBhcmFtIGV2ZW50XFxyXFxuXFx0ICovXFxyXFxuXFx0Ly8gdmFyIGhpZ2hsaWdodEpzb24oKVxcclxcblxcdHZhciBoaWdobGlnaHRKc29uID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcXHJcXG5cXHRcXHJcXG5cXHRvbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xcclxcblxcdCAgdmFyIGNvZGUgPSBldmVudC5kYXRhO1xcclxcblxcdCAgLy8gaW1wb3J0U2NyaXB0cygnanNvbi1wYXJzZS5qcycpO1xcclxcblxcdCAgdmFyIHJlc3VsdCA9IGhpZ2hsaWdodEpzb24oY29kZSwge2V4cGFuZGVkOiB0cnVlfSk7XFxyXFxuXFx0ICAvLyB2YXIgcmVzdWx0ID1KU09OLnN0cmluZ2lmeShjb2RlKTtcXHJcXG5cXHQgIHBvc3RNZXNzYWdlKHJlc3VsdCk7XFxyXFxuXFx0fTtcXHJcXG5cXG5cXG4vKioqLyB9LFxcbi8qIDEgKi9cXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcXG5cXG5cXHR2YXIgcHJlZml4ID0gJ3RtLWNvZGUnO1xcclxcblxcdFxcclxcblxcdHZhciBnZXRFeHBhbmRlckNsYXNzZXMgPSBmdW5jdGlvbiAoZXhwYW5kZWQpIHtcXHJcXG5cXHRcXHRpZiAoIWV4cGFuZGVkKSB7XFxyXFxuXFx0XFx0XFx0cmV0dXJuICdleHBhbmRlZCBjb2xsYXBzZWQgaGlkZGVuJztcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFx0cmV0dXJuICdleHBhbmRlZCc7XFxyXFxuXFx0fTtcXHJcXG5cXHRcXHJcXG5cXHR2YXIgZW5jb2RlID0gZnVuY3Rpb24gKHZhbHVlKSB7XFxyXFxuXFx0XFx0cmV0dXJuIFsnPHNwYW4+JywgdmFsdWUsICc8L3NwYW4+J10uam9pbignJyk7XFxyXFxuXFx0fTtcXHJcXG5cXHRcXHJcXG5cXHR2YXIgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlLCB0eXBlLCBleHBhbmRlckNsYXNzZXMpIHtcXHJcXG5cXHRcXHR2YXIga2xhc3MgPSAnb2JqZWN0JyxcXHJcXG5cXHRcXHRcXHRvcGVuID0gJ3snLFxcclxcblxcdFxcdFxcdGNsb3NlID0gJ30nO1xcclxcblxcdFxcclxcblxcdFxcdGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xcclxcblxcdFxcdFxcdGtsYXNzID0gJ2FycmF5JztcXHJcXG5cXHRcXHRcXHRvcGVuID0gJ1snO1xcclxcblxcdFxcdFxcdGNsb3NlID0gJ10nO1xcclxcblxcdFxcdH1cXHJcXG5cXHRcXHJcXG5cXHRcXHRpZiAodmFsdWUgPT09IG51bGwpIHtcXHJcXG5cXHRcXHRcXHRyZXR1cm4gW1xcclxcblxcdFxcdFxcdFxcdCc8bGk+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcImtleVxcXCI+XFxcIicsIGVuY29kZShrZXkpLCAnXFxcIjogPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJudWxsXFxcIj5cXFwiJywgZW5jb2RlKHZhbHVlKSwgJ1xcXCI8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHRcXHQnPC9saT4nXFxyXFxuXFx0XFx0XFx0XS5qb2luKCcnKTtcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFxyXFxuXFx0XFx0aWYgKHR5cGUgPT0gJ29iamVjdCcpIHtcXHJcXG5cXHRcXHRcXHRyZXR1cm4gW1xcclxcblxcdFxcdFxcdFxcdCc8bGk+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcIicsIGV4cGFuZGVyQ2xhc3NlcywgJ1xcXCI+PC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJrZXlcXFwiPlxcXCInLCBlbmNvZGUoa2V5KSwgJ1xcXCI6IDwvc3Bhbj4gJyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcIm9wZW5cXFwiPicsIG9wZW4sICc8L3NwYW4+ICcsXFxyXFxuXFx0XFx0XFx0XFx0XFx0Jzx1bCBjbGFzcz1cXFwiJywga2xhc3MsICdcXFwiPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0anNvbjJodG1sKHZhbHVlLCBleHBhbmRlckNsYXNzZXMpLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8L3VsPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJjbG9zZVxcXCI+JywgY2xvc2UsICc8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHRcXHQnPC9saT4nXFxyXFxuXFx0XFx0XFx0XS5qb2luKCcnKTtcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFxyXFxuXFx0XFx0aWYgKHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnYm9vbGVhbicpIHtcXHJcXG5cXHRcXHRcXHRyZXR1cm4gW1xcclxcblxcdFxcdFxcdFxcdCc8bGk+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcImtleVxcXCI+XFxcIicsIGVuY29kZShrZXkpLCAnXFxcIjogPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCInLCB0eXBlLCAnXFxcIj4nLCBlbmNvZGUodmFsdWUpLCAnPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0JzwvbGk+J1xcclxcblxcdFxcdFxcdF0uam9pbignJyk7XFxyXFxuXFx0XFx0fVxcclxcblxcdFxcdHJldHVybiBbXFxyXFxuXFx0XFx0XFx0JzxsaT4nLFxcclxcblxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwia2V5XFxcIj5cXFwiJywgZW5jb2RlKGtleSksICdcXFwiOiA8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcIicsIHR5cGUsICdcXFwiPlxcXCInLCBlbmNvZGUodmFsdWUpLCAnXFxcIjwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdCc8L2xpPidcXHJcXG5cXHRcXHRdLmpvaW4oJycpO1xcclxcblxcdH07XFxyXFxuXFx0XFxyXFxuXFx0dmFyIGpzb24yaHRtbCA9IGZ1bmN0aW9uIChqc29uLCBleHBhbmRlckNsYXNzZXMpIHtcXHJcXG5cXHRcXHR2YXIgaHRtbCA9ICcnO1xcclxcblxcdFxcdGZvciAodmFyIGtleSBpbiBqc29uKSB7XFxyXFxuXFx0XFx0XFx0aWYgKCFqc29uLmhhc093blByb3BlcnR5KGtleSkpIHtcXHJcXG5cXHRcXHRcXHRcXHRjb250aW51ZTtcXHJcXG5cXHRcXHRcXHR9XFxyXFxuXFx0XFxyXFxuXFx0XFx0XFx0aHRtbCA9IFtodG1sLCBjcmVhdGVFbGVtZW50KGtleSwganNvbltrZXldLCB0eXBlb2YganNvbltrZXldLCBleHBhbmRlckNsYXNzZXMpXS5qb2luKCcnKTtcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFx0cmV0dXJuIGh0bWw7XFxyXFxuXFx0fTtcXHJcXG5cXHRcXHJcXG5cXHR2YXIgZ2V0SnNvblZpZXdlciA9IGZ1bmN0aW9uIChkYXRhLCBvcHRpb25zKSB7XFxyXFxuXFx0XFx0dHJ5IHtcXHJcXG5cXHRcXHRcXHRyZXR1cm4gW1xcclxcblxcdFxcdFxcdFxcdCc8dWwgY2xhc3M9XFxcIicsIHByZWZpeCwgJy1jb250YWluZXJcXFwiPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0anNvbjJodG1sKFtKU09OLnBhcnNlKGRhdGEpXSwgZ2V0RXhwYW5kZXJDbGFzc2VzKG9wdGlvbnMuZXhwYW5kZWQpKSxcXHJcXG5cXHRcXHRcXHRcXHQnPC91bD4nXFxyXFxuXFx0XFx0XFx0XS5qb2luKCcnKTtcXHJcXG5cXHRcXHR9IGNhdGNoIChlKSB7XFxyXFxuXFx0XFx0XFx0cmV0dXJuIFtcXHJcXG5cXHRcXHRcXHRcXHQnPGRpdiBjbGFzcz1cXFwiJywgcHJlZml4LCAnLWVycm9yXFxcIiA+JywgZS50b1N0cmluZygpLCAnIDwvZGl2PidcXHJcXG5cXHRcXHRcXHRdLmpvaW4oJycpO1xcclxcblxcdFxcdH1cXHJcXG5cXHR9O1xcclxcblxcdFxcclxcblxcdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSwgb3B0KSB7XFxyXFxuXFx0XFx0dmFyIGpzb24gPSAnJztcXHJcXG5cXHRcXHR2YXIgb3B0aW9ucyA9IG9wdCB8fCB7ZXhwYW5kZWQ6IHRydWV9O1xcclxcblxcdFxcdGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykge1xcclxcblxcdFxcdFxcdGpzb24gPSBkYXRhO1xcclxcblxcdFxcdH0gZWxzZSBpZiAodHlwZW9mIGRhdGEgPT0gJ29iamVjdCcpIHtcXHJcXG5cXHRcXHRcXHRqc29uID0gSlNPTi5zdHJpbmdpZnkoZGF0YSlcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFx0cmV0dXJuIGdldEpzb25WaWV3ZXIoanNvbiwgb3B0aW9ucyk7XFxyXFxuXFx0fTtcXHJcXG5cXG5cXG4vKioqLyB9XFxuLyoqKioqKi8gXSk7XFxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5kbFluQmhZMnM2THk4dmQyVmljR0ZqYXk5aWIyOTBjM1J5WVhBZ05EY3hZakV3WkRRMFkyRTNNamd3WlRFeE5HRWlMQ0ozWldKd1lXTnJPaTh2THk0dmMyTnlhWEIwY3k5aGNHa3RaWGh3Ykc5eVpYSXZkakl2YzNKakwyMXZaSFZzWlhNdmFHbG5hR3hwWjJoMFNuTnZiaTUzYjNKclpYSXVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZjMk55YVhCMGN5OWhjR2t0Wlhod2JHOXlaWEl2ZGpJdmMzSmpMMjF2WkhWc1pYTXZhbk52Ymkxd1lYSnpaUzVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEVzZFVKQlFXVTdRVUZEWmp0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdPMEZCUjBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdPenM3T3p0QlEzUkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzY1VOQlFXOURMR1ZCUVdVN1FVRkRia1E3UVVGRFFUdEJRVU5CT3pzN096czdPMEZEWWtFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFc1dVRkJWenRCUVVOWUxHRkJRVms3TzBGQlJWbzdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZGTzBGQlEwWTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNkMEpCUVhWQ08wRkJRM1pDTzBGQlEwRTdRVUZEUVN4SFFVRkZPMEZCUTBZN1FVRkRRVHRCUVVOQk8wRkJRMEVpTENKbWFXeGxJam9pYUdsbmFHeHBaMmgwU25OdmJpNTNiM0pyWlhJdWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUlnWEhRdkx5QlVhR1VnYlc5a2RXeGxJR05oWTJobFhHNGdYSFIyWVhJZ2FXNXpkR0ZzYkdWa1RXOWtkV3hsY3lBOUlIdDlPMXh1WEc0Z1hIUXZMeUJVYUdVZ2NtVnhkV2x5WlNCbWRXNWpkR2x2Ymx4dUlGeDBablZ1WTNScGIyNGdYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWh0YjJSMWJHVkpaQ2tnZTF4dVhHNGdYSFJjZEM4dklFTm9aV05ySUdsbUlHMXZaSFZzWlNCcGN5QnBiaUJqWVdOb1pWeHVJRngwWEhScFppaHBibk4wWVd4c1pXUk5iMlIxYkdWelcyMXZaSFZzWlVsa1hTbGNiaUJjZEZ4MFhIUnlaWFIxY200Z2FXNXpkR0ZzYkdWa1RXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwdVpYaHdiM0owY3p0Y2JseHVJRngwWEhRdkx5QkRjbVZoZEdVZ1lTQnVaWGNnYlc5a2RXeGxJQ2hoYm1RZ2NIVjBJR2wwSUdsdWRHOGdkR2hsSUdOaFkyaGxLVnh1SUZ4MFhIUjJZWElnYlc5a2RXeGxJRDBnYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjBnUFNCN1hHNGdYSFJjZEZ4MFpYaHdiM0owY3pvZ2UzMHNYRzRnWEhSY2RGeDBhV1E2SUcxdlpIVnNaVWxrTEZ4dUlGeDBYSFJjZEd4dllXUmxaRG9nWm1Gc2MyVmNiaUJjZEZ4MGZUdGNibHh1SUZ4MFhIUXZMeUJGZUdWamRYUmxJSFJvWlNCdGIyUjFiR1VnWm5WdVkzUnBiMjVjYmlCY2RGeDBiVzlrZFd4bGMxdHRiMlIxYkdWSlpGMHVZMkZzYkNodGIyUjFiR1V1Wlhod2IzSjBjeXdnYlc5a2RXeGxMQ0J0YjJSMWJHVXVaWGh3YjNKMGN5d2dYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWs3WEc1Y2JpQmNkRngwTHk4Z1JteGhaeUIwYUdVZ2JXOWtkV3hsSUdGeklHeHZZV1JsWkZ4dUlGeDBYSFJ0YjJSMWJHVXViRzloWkdWa0lEMGdkSEoxWlR0Y2JseHVJRngwWEhRdkx5QlNaWFIxY200Z2RHaGxJR1Y0Y0c5eWRITWdiMllnZEdobElHMXZaSFZzWlZ4dUlGeDBYSFJ5WlhSMWNtNGdiVzlrZFd4bExtVjRjRzl5ZEhNN1hHNGdYSFI5WEc1Y2JseHVJRngwTHk4Z1pYaHdiM05sSUhSb1pTQnRiMlIxYkdWeklHOWlhbVZqZENBb1gxOTNaV0p3WVdOclgyMXZaSFZzWlhOZlh5bGNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWJTQTlJRzF2WkhWc1pYTTdYRzVjYmlCY2RDOHZJR1Y0Y0c5elpTQjBhR1VnYlc5a2RXeGxJR05oWTJobFhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG1NZ1BTQnBibk4wWVd4c1pXUk5iMlIxYkdWek8xeHVYRzRnWEhRdkx5QmZYM2RsWW5CaFkydGZjSFZpYkdsalgzQmhkR2hmWDF4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV3SUQwZ1hDSmNJanRjYmx4dUlGeDBMeThnVEc5aFpDQmxiblJ5ZVNCdGIyUjFiR1VnWVc1a0lISmxkSFZ5YmlCbGVIQnZjblJ6WEc0Z1hIUnlaWFIxY200Z1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5Z3dLVHRjYmx4dVhHNWNiaThxS2lCWFJVSlFRVU5MSUVaUFQxUkZVaUFxS2x4dUlDb3FJSGRsWW5CaFkyc3ZZbTl2ZEhOMGNtRndJRFEzTVdJeE1HUTBOR05oTnpJNE1HVXhNVFJoWEc0Z0tpb3ZJaXdpTHlvcVhISmNiaUFxSUVOdlpHVWdabTl5YldGMElIZGxZaTEzYjNKclpYSmNjbHh1SUNvZ1FIQmhjbUZ0SUdWMlpXNTBYSEpjYmlBcUwxeHlYRzR2THlCMllYSWdhR2xuYUd4cFoyaDBTbk52YmlncFhISmNiblpoY2lCb2FXZG9iR2xuYUhSS2MyOXVJRDBnY21WeGRXbHlaU2duTGk5cWMyOXVMWEJoY25ObEp5azdYSEpjYmx4eVhHNXZibTFsYzNOaFoyVWdQU0JtZFc1amRHbHZiaWhsZG1WdWRDa2dlMXh5WEc0Z0lIWmhjaUJqYjJSbElEMGdaWFpsYm5RdVpHRjBZVHRjY2x4dUlDQXZMeUJwYlhCdmNuUlRZM0pwY0hSektDZHFjMjl1TFhCaGNuTmxMbXB6SnlrN1hISmNiaUFnZG1GeUlISmxjM1ZzZENBOUlHaHBaMmhzYVdkb2RFcHpiMjRvWTI5a1pTd2dlMlY0Y0dGdVpHVmtPaUIwY25WbGZTazdYSEpjYmlBZ0x5OGdkbUZ5SUhKbGMzVnNkQ0E5U2xOUFRpNXpkSEpwYm1kcFpua29ZMjlrWlNrN1hISmNiaUFnY0c5emRFMWxjM05oWjJVb2NtVnpkV3gwS1R0Y2NseHVmVHRjY2x4dVhHNWNibHh1THlvcUtpb3FLaW9xS2lvcUtpb3FLaW9xWEc0Z0tpb2dWMFZDVUVGRFN5QkdUMDlVUlZKY2JpQXFLaUF1TDNOamNtbHdkSE12WVhCcExXVjRjR3h2Y21WeUwzWXlMM055WXk5dGIyUjFiR1Z6TDJocFoyaHNhV2RvZEVwemIyNHVkMjl5YTJWeUxtcHpYRzRnS2lvZ2JXOWtkV3hsSUdsa0lEMGdNRnh1SUNvcUlHMXZaSFZzWlNCamFIVnVhM01nUFNBd1hHNGdLaW92SWl3aWRtRnlJSEJ5WldacGVDQTlJQ2QwYlMxamIyUmxKenRjY2x4dVhISmNiblpoY2lCblpYUkZlSEJoYm1SbGNrTnNZWE56WlhNZ1BTQm1kVzVqZEdsdmJpQW9aWGh3WVc1a1pXUXBJSHRjY2x4dVhIUnBaaUFvSVdWNGNHRnVaR1ZrS1NCN1hISmNibHgwWEhSeVpYUjFjbTRnSjJWNGNHRnVaR1ZrSUdOdmJHeGhjSE5sWkNCb2FXUmtaVzRuTzF4eVhHNWNkSDFjY2x4dVhIUnlaWFIxY200Z0oyVjRjR0Z1WkdWa0p6dGNjbHh1ZlR0Y2NseHVYSEpjYm5aaGNpQmxibU52WkdVZ1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVcElIdGNjbHh1WEhSeVpYUjFjbTRnV3ljOGMzQmhiajRuTENCMllXeDFaU3dnSnp3dmMzQmhiajRuWFM1cWIybHVLQ2NuS1R0Y2NseHVmVHRjY2x4dVhISmNiblpoY2lCamNtVmhkR1ZGYkdWdFpXNTBJRDBnWm5WdVkzUnBiMjRnS0d0bGVTd2dkbUZzZFdVc0lIUjVjR1VzSUdWNGNHRnVaR1Z5UTJ4aGMzTmxjeWtnZTF4eVhHNWNkSFpoY2lCcmJHRnpjeUE5SUNkdlltcGxZM1FuTEZ4eVhHNWNkRngwYjNCbGJpQTlJQ2Q3Snl4Y2NseHVYSFJjZEdOc2IzTmxJRDBnSjMwbk8xeHlYRzVjY2x4dVhIUnBaaUFvUVhKeVlYa3VhWE5CY25KaGVTaDJZV3gxWlNrcElIdGNjbHh1WEhSY2RHdHNZWE56SUQwZ0oyRnljbUY1Snp0Y2NseHVYSFJjZEc5d1pXNGdQU0FuV3ljN1hISmNibHgwWEhSamJHOXpaU0E5SUNkZEp6dGNjbHh1WEhSOVhISmNibHh5WEc1Y2RHbG1JQ2gyWVd4MVpTQTlQVDBnYm5Wc2JDa2dlMXh5WEc1Y2RGeDBjbVYwZFhKdUlGdGNjbHh1WEhSY2RGeDBKenhzYVQ0bkxGeHlYRzVjZEZ4MFhIUmNkQ2M4YzNCaGJpQmpiR0Z6Y3oxY0ltdGxlVndpUGx3aUp5d2daVzVqYjJSbEtHdGxlU2tzSUNkY0lqb2dQQzl6Y0dGdVBpY3NYSEpjYmx4MFhIUmNkRngwSnp4emNHRnVJR05zWVhOelBWd2liblZzYkZ3aVBsd2lKeXdnWlc1amIyUmxLSFpoYkhWbEtTd2dKMXdpUEM5emNHRnVQaWNzWEhKY2JseDBYSFJjZENjOEwyeHBQaWRjY2x4dVhIUmNkRjB1YW05cGJpZ25KeWs3WEhKY2JseDBmVnh5WEc1Y2NseHVYSFJwWmlBb2RIbHdaU0E5UFNBbmIySnFaV04wSnlrZ2UxeHlYRzVjZEZ4MGNtVjBkWEp1SUZ0Y2NseHVYSFJjZEZ4MEp6eHNhVDRuTEZ4eVhHNWNkRngwWEhSY2RDYzhjM0JoYmlCamJHRnpjejFjSWljc0lHVjRjR0Z1WkdWeVEyeGhjM05sY3l3Z0oxd2lQand2YzNCaGJqNG5MRnh5WEc1Y2RGeDBYSFJjZENjOGMzQmhiaUJqYkdGemN6MWNJbXRsZVZ3aVBsd2lKeXdnWlc1amIyUmxLR3RsZVNrc0lDZGNJam9nUEM5emNHRnVQaUFuTEZ4eVhHNWNkRngwWEhSY2RDYzhjM0JoYmlCamJHRnpjejFjSW05d1pXNWNJajRuTENCdmNHVnVMQ0FuUEM5emNHRnVQaUFuTEZ4eVhHNWNkRngwWEhSY2RDYzhkV3dnWTJ4aGMzTTlYQ0luTENCcmJHRnpjeXdnSjF3aVBpY3NYSEpjYmx4MFhIUmNkRngwWEhScWMyOXVNbWgwYld3b2RtRnNkV1VzSUdWNGNHRnVaR1Z5UTJ4aGMzTmxjeWtzWEhKY2JseDBYSFJjZEZ4MEp6d3ZkV3crSnl4Y2NseHVYSFJjZEZ4MFhIUW5QSE53WVc0Z1kyeGhjM005WENKamJHOXpaVndpUGljc0lHTnNiM05sTENBblBDOXpjR0Z1UGljc1hISmNibHgwWEhSY2RDYzhMMnhwUGlkY2NseHVYSFJjZEYwdWFtOXBiaWduSnlrN1hISmNibHgwZlZ4eVhHNWNjbHh1WEhScFppQW9kSGx3WlNBOVBTQW5iblZ0WW1WeUp5QjhmQ0IwZVhCbElEMDlJQ2RpYjI5c1pXRnVKeWtnZTF4eVhHNWNkRngwY21WMGRYSnVJRnRjY2x4dVhIUmNkRngwSnp4c2FUNG5MRnh5WEc1Y2RGeDBYSFJjZENjOGMzQmhiaUJqYkdGemN6MWNJbXRsZVZ3aVBsd2lKeXdnWlc1amIyUmxLR3RsZVNrc0lDZGNJam9nUEM5emNHRnVQaWNzWEhKY2JseDBYSFJjZEZ4MEp6eHpjR0Z1SUdOc1lYTnpQVndpSnl3Z2RIbHdaU3dnSjF3aVBpY3NJR1Z1WTI5a1pTaDJZV3gxWlNrc0lDYzhMM053WVc0K0p5eGNjbHh1WEhSY2RGeDBKend2YkdrK0oxeHlYRzVjZEZ4MFhTNXFiMmx1S0NjbktUdGNjbHh1WEhSOVhISmNibHgwY21WMGRYSnVJRnRjY2x4dVhIUmNkQ2M4YkdrK0p5eGNjbHh1WEhSY2RGeDBKenh6Y0dGdUlHTnNZWE56UFZ3aWEyVjVYQ0krWENJbkxDQmxibU52WkdVb2EyVjVLU3dnSjF3aU9pQThMM053WVc0K0p5eGNjbHh1WEhSY2RGeDBKenh6Y0dGdUlHTnNZWE56UFZ3aUp5d2dkSGx3WlN3Z0oxd2lQbHdpSnl3Z1pXNWpiMlJsS0haaGJIVmxLU3dnSjF3aVBDOXpjR0Z1UGljc1hISmNibHgwWEhRblBDOXNhVDRuWEhKY2JseDBYUzVxYjJsdUtDY25LVHRjY2x4dWZUdGNjbHh1WEhKY2JuWmhjaUJxYzI5dU1taDBiV3dnUFNCbWRXNWpkR2x2YmlBb2FuTnZiaXdnWlhod1lXNWtaWEpEYkdGemMyVnpLU0I3WEhKY2JseDBkbUZ5SUdoMGJXd2dQU0FuSnp0Y2NseHVYSFJtYjNJZ0tIWmhjaUJyWlhrZ2FXNGdhbk52YmlrZ2UxeHlYRzVjZEZ4MGFXWWdLQ0ZxYzI5dUxtaGhjMDkzYmxCeWIzQmxjblI1S0d0bGVTa3BJSHRjY2x4dVhIUmNkRngwWTI5dWRHbHVkV1U3WEhKY2JseDBYSFI5WEhKY2JseHlYRzVjZEZ4MGFIUnRiQ0E5SUZ0b2RHMXNMQ0JqY21WaGRHVkZiR1Z0Wlc1MEtHdGxlU3dnYW5OdmJsdHJaWGxkTENCMGVYQmxiMllnYW5OdmJsdHJaWGxkTENCbGVIQmhibVJsY2tOc1lYTnpaWE1wWFM1cWIybHVLQ2NuS1R0Y2NseHVYSFI5WEhKY2JseDBjbVYwZFhKdUlHaDBiV3c3WEhKY2JuMDdYSEpjYmx4eVhHNTJZWElnWjJWMFNuTnZibFpwWlhkbGNpQTlJR1oxYm1OMGFXOXVJQ2hrWVhSaExDQnZjSFJwYjI1ektTQjdYSEpjYmx4MGRISjVJSHRjY2x4dVhIUmNkSEpsZEhWeWJpQmJYSEpjYmx4MFhIUmNkQ2M4ZFd3Z1kyeGhjM005WENJbkxDQndjbVZtYVhnc0lDY3RZMjl1ZEdGcGJtVnlYQ0krSnl4Y2NseHVYSFJjZEZ4MFhIUnFjMjl1TW1oMGJXd29XMHBUVDA0dWNHRnljMlVvWkdGMFlTbGRMQ0JuWlhSRmVIQmhibVJsY2tOc1lYTnpaWE1vYjNCMGFXOXVjeTVsZUhCaGJtUmxaQ2twTEZ4eVhHNWNkRngwWEhRblBDOTFiRDRuWEhKY2JseDBYSFJkTG1wdmFXNG9KeWNwTzF4eVhHNWNkSDBnWTJGMFkyZ2dLR1VwSUh0Y2NseHVYSFJjZEhKbGRIVnliaUJiWEhKY2JseDBYSFJjZENjOFpHbDJJR05zWVhOelBWd2lKeXdnY0hKbFptbDRMQ0FuTFdWeWNtOXlYQ0lnUGljc0lHVXVkRzlUZEhKcGJtY29LU3dnSnlBOEwyUnBkajRuWEhKY2JseDBYSFJkTG1wdmFXNG9KeWNwTzF4eVhHNWNkSDFjY2x4dWZUdGNjbHh1WEhKY2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0b1pHRjBZU3dnYjNCMEtTQjdYSEpjYmx4MGRtRnlJR3B6YjI0Z1BTQW5KenRjY2x4dVhIUjJZWElnYjNCMGFXOXVjeUE5SUc5d2RDQjhmQ0I3Wlhod1lXNWtaV1E2SUhSeWRXVjlPMXh5WEc1Y2RHbG1JQ2gwZVhCbGIyWWdaR0YwWVNBOVBTQW5jM1J5YVc1bkp5a2dlMXh5WEc1Y2RGeDBhbk52YmlBOUlHUmhkR0U3WEhKY2JseDBmU0JsYkhObElHbG1JQ2gwZVhCbGIyWWdaR0YwWVNBOVBTQW5iMkpxWldOMEp5a2dlMXh5WEc1Y2RGeDBhbk52YmlBOUlFcFRUMDR1YzNSeWFXNW5hV1o1S0dSaGRHRXBYSEpjYmx4MGZWeHlYRzVjZEhKbGRIVnliaUJuWlhSS2MyOXVWbWxsZDJWeUtHcHpiMjRzSUc5d2RHbHZibk1wTzF4eVhHNTlPMXh5WEc1Y2JseHVYRzR2S2lvcUtpb3FLaW9xS2lvcUtpb3FLaXBjYmlBcUtpQlhSVUpRUVVOTElFWlBUMVJGVWx4dUlDb3FJQzR2YzJOeWFYQjBjeTloY0drdFpYaHdiRzl5WlhJdmRqSXZjM0pqTDIxdlpIVnNaWE12YW5OdmJpMXdZWEp6WlM1cWMxeHVJQ29xSUcxdlpIVnNaU0JwWkNBOUlERmNiaUFxS2lCdGIyUjFiR1VnWTJoMWJtdHpJRDBnTUZ4dUlDb3FMeUpkTENKemIzVnlZMlZTYjI5MElqb2lJbjA9XCIsIF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJoaWdobGlnaHRKc29uLndvcmtlci5qc1wiKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2hpZ2hsaWdodEpzb24ud29ya2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTAzNDM5MTMvaG93LXRvLWNyZWF0ZS1hLXdlYi13b3JrZXItZnJvbS1hLXN0cmluZ1xyXG5cclxudmFyIFVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTDtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihjb250ZW50LCB1cmwpIHtcclxuXHR0cnkge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0dmFyIGJsb2I7XHJcblx0XHRcdHRyeSB7IC8vIEJsb2JCdWlsZGVyID0gRGVwcmVjYXRlZCwgYnV0IHdpZGVseSBpbXBsZW1lbnRlZFxyXG5cdFx0XHRcdHZhciBCbG9iQnVpbGRlciA9IHdpbmRvdy5CbG9iQnVpbGRlciB8fCB3aW5kb3cuV2ViS2l0QmxvYkJ1aWxkZXIgfHwgd2luZG93Lk1vekJsb2JCdWlsZGVyIHx8IHdpbmRvdy5NU0Jsb2JCdWlsZGVyO1xyXG5cdFx0XHRcdGJsb2IgPSBuZXcgQmxvYkJ1aWxkZXIoKTtcclxuXHRcdFx0XHRibG9iLmFwcGVuZChjb250ZW50KTtcclxuXHRcdFx0XHRibG9iID0gYmxvYi5nZXRCbG9iKCk7XHJcblx0XHRcdH0gY2F0Y2goZSkgeyAvLyBUaGUgcHJvcG9zZWQgQVBJXHJcblx0XHRcdFx0YmxvYiA9IG5ldyBCbG9iKFtjb250ZW50XSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG5ldyBXb3JrZXIoVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKSk7XHJcblx0XHR9IGNhdGNoKGUpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBXb3JrZXIoJ2RhdGE6YXBwbGljYXRpb24vamF2YXNjcmlwdCwnICsgZW5jb2RlVVJJQ29tcG9uZW50KGNvbnRlbnQpKTtcclxuXHRcdH1cclxuXHR9IGNhdGNoKGUpIHtcclxuXHRcdHJldHVybiBuZXcgV29ya2VyKHVybCk7XHJcblx0fVxyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vd29ya2VyLWxvYWRlci9jcmVhdGVJbmxpbmVXb3JrZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZnVuY3Rpb24gc2xpY2sodGltZXMpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHR2YXIgc2VsZWN0b3IgPSAnI3NsaWRlci0nO1xyXG5cdFxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdGltZXM7IGkrKykge1xyXG5cdFx0JChzZWxlY3RvciArIGkpLmxlbmd0aCAmJiAkKHNlbGVjdG9yICsgaSkuc2xpY2soe1xyXG5cdFx0XHRkb3RzOiBmYWxzZSxcclxuXHRcdFx0aW5maW5pdGU6IGZhbHNlLFxyXG5cdFx0XHRzcGVlZDogMzAwLFxyXG5cdFx0XHRzbGlkZXNUb1Nob3c6IDMsXHJcblx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cdFx0XHR2YXJpYWJsZVdpZHRoOiB0cnVlLFxyXG5cdFx0XHRhdXRvcGxheTogZmFsc2UsXHJcblx0XHRcdHJlc3BvbnNpdmU6IFtcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRicmVha3BvaW50OiAxMjAwLFxyXG5cdFx0XHRcdFx0c2V0dGluZ3M6IHtcclxuXHRcdFx0XHRcdFx0dmFyaWFibGVXaWR0aDogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0c2xpZGVzVG9TaG93OiAyLFxyXG5cdFx0XHRcdFx0XHRzbGlkZXNUb1Njcm9sbDogMSxcclxuXHRcdFx0XHRcdFx0aW5maW5pdGU6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRkb3RzOiBmYWxzZVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0YnJlYWtwb2ludDogODAwLFxyXG5cdFx0XHRcdFx0c2V0dGluZ3M6IHtcclxuXHRcdFx0XHRcdFx0dmFyaWFibGVXaWR0aDogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0c2xpZGVzVG9TaG93OiAxLFxyXG5cdFx0XHRcdFx0XHRzbGlkZXNUb1Njcm9sbDogMVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiB1bnNsaWNrKHRpbWVzKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdGltZXM7IGkrKykge1xyXG5cdFx0dmFyIHNlbGVjdG9yID0gJyNzbGlkZXItJyArIGk7XHJcblx0XHQkKHNlbGVjdG9yKSAmJiAkKHNlbGVjdG9yKS5sZW5ndGggJiYgJChzZWxlY3Rvcikuc2xpY2soJ3Vuc2xpY2snKTtcclxuXHR9XHJcblx0Y29uc29sZS5pbmZvKCdjbGVhcmVkJyk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdHNldDogc2xpY2ssXHJcblx0cmVtb3ZlOiB1bnNsaWNrXHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9zbGlkZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwiZGlzY292ZXJ5LnYyLmV2ZW50cy5nZXRcIjoge1xuXHRcdFwiZXZlbnRzXCI6IHtcblx0XHRcdFwib2JqZWN0XCI6IHtcblx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcInRpdGxlXCI6IFwiRXZlbnRcIixcblx0XHRcdFx0XHRcImNvcHlCdG5cIjoge1xuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IHRydWVcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFwicmVxdWVzdFwiOiBcImh0dHA6Ly93d3cuZ29vZ2xlLmNvbVwiLFxuXHRcdFx0XHRcdFwiaW5kZXhcIjogMFxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJpbWFnZXNcIjoge1xuXHRcdFx0XHRcIm9iamVjdFwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwidGl0bGVcIjogXCJpbWFnZVwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFwiaW5kZXhcIjogMSxcblx0XHRcdFx0XHRcImNvbGxhcHNlZFwiOiB0cnVlXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcInNhbGVzXCI6IHtcblx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcImluZGV4XCI6IDJcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdFwidmVudWVzXCI6IHtcblx0XHRcdFx0XCJvYmplY3RcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcInRpdGxlXCI6IFwidmVudWVcIixcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogMFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJjaXR5XCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiAyXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcInN0YXRlXCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiAxXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImNvdW50cnlcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDFcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiYWRkcmVzc1wiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogM1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJsb2NhdGlvblwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogNFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcImluZGV4XCI6IDNcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdFwiZGF0ZXNcIjoge1xuXHRcdFx0XHRcInRpbWV6b25lXCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiAwXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcInN0YXJ0XCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiAxLFxuXHRcdFx0XHRcdFx0XCJjb3B5QnRuXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJkYXRlVGltZVwiOiB0cnVlXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XCJjb2xsYXBzZWRcIjogdHJ1ZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJzdGF0dXNcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDMsXG5cdFx0XHRcdFx0XHRcImNvbGxhcHNlZFwiOiB0cnVlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImVuZFwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogMixcblx0XHRcdFx0XHRcdFwiY29weUJ0blwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiZGF0ZVRpbWVcIjogdHJ1ZVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwiY29sbGFwc2VkXCI6IHRydWVcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XCJpbmRleFwiOiA0LFxuXHRcdFx0XHRcdFwiYWxsSW5zaWRlXCI6IGZhbHNlXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcImNvbGxhcHNlZFwiOiB0cnVlLFxuXHRcdFx0XHRcImluZGV4XCI6IDBcblx0XHRcdH1cblx0XHR9LFxuXHRcdFwicGFnZVwiOiB7XG5cdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcImluZGV4XCI6IDEsXG5cdFx0XHRcdFwiY29sbGFwc2VkXCI6IGZhbHNlXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XCJtZXRob2RcIjogXCJkaXNjb3ZlcnkudjIuZXZlbnRzLmdldFwiXG5cdFx0fVxuXHR9LFxuXHRcImRpc2NvdmVyeS52Mi5hdHRyYWN0aW9ucy5nZXRcIjoge1xuXHRcdFwiYXR0cmFjdGlvbnNcIjoge1xuXHRcdFx0XCJvYmplY3RcIjoge1xuXHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFwiaW5kZXhcIjogMFxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJpbWFnZXNcIjoge1xuXHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFwiaW5kZXhcIjogMlxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJjbGFzc2lmaWNhdGlvbnNcIjoge1xuXHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFwiaW5kZXhcIjogMVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XCJpbmRleFwiOiAwXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcInBhZ2VcIjoge1xuXHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XCJpbmRleFwiOiAxXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XCJtZXRob2RDb25maWdcIjogdHJ1ZVxuXHRcdH1cblx0fSxcblx0XCJfR0xPQkFMX0NPTkZJR1wiOiB7XG5cdFx0XCJjb3B5QnRuXCI6IHtcblx0XHRcdFwiaWRcIjogdHJ1ZVxuXHRcdH0sXG5cdFx0XCJkZXByZWNhdGVkXCI6IFtcblx0XHRcdFwiX2xpbmtzXCJcblx0XHRdLFxuXHRcdFwidW53cmFwcFwiOiBbXG5cdFx0XHRcIl9lbWJlZGRlZFwiXG5cdFx0XVxuXHR9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb25maWcuanNvblxuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgTlVNID0gMTI7XHJcbnZhciBQUkVGSVggPSAnY29sb3ItJztcclxuXHJcbnZhciBjb2xvcnMgPSBnZXRDb2xvcnMoTlVNLCBQUkVGSVgpO1xyXG5cclxuZnVuY3Rpb24gZ2V0Q29sb3JzKG51bSwgY2xhc3NQcmVmaXgpIHtcclxuXHR2YXIgY29sb3JzID0gbmV3IEFycmF5KG51bSk7XHJcblxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgY29sb3JzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRjb2xvcnNbaV0gPSBjbGFzc1ByZWZpeCArIChpICsgMSk7XHJcblx0fVxyXG5cdHJldHVybiBjb2xvcnM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFJhbmRvbUNvbG9yKGNvbG9yKSB7XHJcblx0dmFyIHJhbmRvbU51bWJlcjtcclxuXHRkbyB7XHJcblx0XHRyYW5kb21OdW1iZXIgPSBnZXRSYW5kb21JbnQoMSwgY29sb3JzLmxlbmd0aCk7XHJcblx0fSB3aGlsZSAoUFJFRklYICsgcmFuZG9tTnVtYmVyID09PSBjb2xvcik7XHJcblxyXG5cdHJldHVybiBQUkVGSVggKyByYW5kb21OdW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiBtaW4gKGluY2x1c2l2ZSkgYW5kIG1heCAoaW5jbHVzaXZlKVxyXG4gKiBVc2luZyBNYXRoLnJvdW5kKCkgd2lsbCBnaXZlIHlvdSBhIG5vbi11bmlmb3JtIGRpc3RyaWJ1dGlvbiFcclxuICovXHJcbmZ1bmN0aW9uIGdldFJhbmRvbUludChtaW4sIG1heCkge1xyXG5cdHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGNvbG9yczogY29sb3JzLFxyXG5cdGdldFJhbmRvbUNvbG9yOiBnZXRSYW5kb21Db2xvclxyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvY29sb3JDbGFzc2VzLmpzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcclxuXHRyZXF1aXJlKCcuL2N1c3RvbVNlbGVjdC5jb21wb25lbnQnKTtcclxuXHRyZXF1aXJlKCcuL3BvcHVwcy9lcnJvci5jb21wb25lbnQnKTtcclxuXHRyZXF1aXJlKCcuL3BhbmVscy9wYW5lbEdyb3VwLmNvbXBvbmVudCcpO1xyXG5cdHJlcXVpcmUoJy4vcGFuZWxzL3BhbmVsLmNvbXBvbmVudCcpO1xyXG5cdHJlcXVpcmUoJy4vcGFuZWxzL3BhZ2luYXRpb24uY29tcG9uZW50Jyk7XHJcblx0cmVxdWlyZSgnLi9wYW5lbHMvcGFuZWxIZWFkaW5nLmNvbXBvbmVudCcpO1xyXG5cdHJlcXVpcmUoJy4vcGFuZWxzL29iamVjdFBhbmVsQm9keS5jb21wb25lbnQnKTtcclxuXHRyZXF1aXJlKCcuL3BhbmVscy9hcnJheVBhbmVsQm9keS5jb21wb25lbnQnKTtcclxufSgpKTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxyXG4gKiBDdXN0b20gU2VsZWN0IGNvbXBvbmVudFxyXG4gKi9cclxudmFyIHNlbGY7XHJcblxyXG4vKipcclxuICogQ3VzdG9tIFNlbGVjdCBWaWV3LU1vZGVsXHJcbiAqIEBwYXJhbSBwYXJhbXNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBDdXN0b21TZWxlY3QocGFyYW1zKSB7XHJcbiAgc2VsZiA9IHRoaXM7XHJcblxyXG4gIHRoaXMuYW5pbWF0aW9uU3BlZWQgPSBwYXJhbXMuYW5pbWF0aW9uU3BlZWQgfHwgMjAwO1xyXG5cdHRoaXMuY3VyZW50U2VsZWN0RGF0YSA9IHBhcmFtcy5kYXRhIHx8IG51bGw7XHJcblx0dGhpcy5vbkZvY3VzID0gcGFyYW1zLmZvY3VzIHx8IG51bGw7XHJcblx0XHJcbiAgLy9vYnNlcnZhYmxlc1xyXG4gIHRoaXMuc2VsZWN0TW9kZWwgPSB0eXBlb2YgcGFyYW1zLm9wdGlvbnMgIT09J2Z1bmN0aW9uJyA/IGtvLm9ic2VydmFibGVBcnJheShwYXJhbXMub3B0aW9ucyk6ICBwYXJhbXMub3B0aW9ucztcclxuICB0aGlzLnBsYWNlaG9sZGVyID0ga28ub2JzZXJ2YWJsZShwYXJhbXMucGxhY2Vob2xkZXIgfHwgJycpO1xyXG4gIHRoaXMub25zZWxlY3QgPSBwYXJhbXMub25zZWxlY3QgfHwgZnVuY3Rpb24gKGl0ZW0pIHsgY29uc29sZS5sb2coaXRlbSArJ3NlbGVjdGVkIScpfTtcclxuICB0aGlzLnNlbGVjdGVkID0ga28ub2JzZXJ2YWJsZSh0aGlzLnNlbGVjdE1vZGVsKClbMF0pO1xyXG4gIHRoaXMuaXNPbmVPcHRpb24gPSBrby5wdXJlQ29tcHV0ZWQoZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0TW9kZWwoKS5sZW5ndGggPCAyOyAvLyBtb3JlIHRoYW4gb25lIG9wdGlvblxyXG4gIH0sIHRoaXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kRWxlbWVudChldmVudCkge1xyXG4gIHZhciBwYXJlbnQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnBhcmVudHMoJy5qcy1jdXN0b20tc2VsZWN0Jyk7XHJcbiAgcmV0dXJuIHtcclxuICAgIHdyYXBwZXI6IHBhcmVudC5maW5kKCcuanMtY3VzdG9tLXNlbGVjdC13cmFwcGVyJyksXHJcbiAgICBsYXllcjogcGFyZW50LmZpbmQoJy5qcy1jdXN0b20tc2VsZWN0LWxheWVyJylcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDdXN0b20gU2VsZWN0IFZpZXctTW9kZWwgbWV0aG9kXHJcbiAqIEBwYXJhbSB2aWV3TW9kZWxcclxuICogQHBhcmFtIGV2ZW50XHJcbiAqL1xyXG5DdXN0b21TZWxlY3QucHJvdG90eXBlLnNsaWRlVG9nZ2xlID0gZnVuY3Rpb24odmlld01vZGVsLCBldmVudCkge1xyXG5cdC8vIGVsZW0gaW4gZm9jdXMgZW11bGF0aW9uXHJcblx0dGhpcy5vbkZvY3VzICYmIHRoaXMub25Gb2N1cyh0aGlzLmN1cmVudFNlbGVjdERhdGEpO1xyXG5cclxuXHRpZiAodGhpcy5pc09uZU9wdGlvbigpKSB7cmV0dXJuIGZhbHNlO31cclxuICB2YXIgZWwgPSBmaW5kRWxlbWVudChldmVudCk7XHJcbiAgICBlbC53cmFwcGVyLnNsaWRlVG9nZ2xlKHZpZXdNb2RlbC5hbmltYXRpb25TcGVlZCk7XHJcbiAgICBlbC5sYXllci50b2dnbGVDbGFzcygnaGlkZGVuJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3VzdG9tIFNlbGVjdCBWaWV3LU1vZGVsIG1ldGhvZFxyXG4gKiBAcGFyYW0gaXRlbVxyXG4gKiBAcGFyYW0gZXZlbnRcclxuICovXHJcbkN1c3RvbVNlbGVjdC5wcm90b3R5cGUuc2VsZWN0SXRlbSA9IGZ1bmN0aW9uIChpdGVtLCBldmVudCkge1xyXG4gIHZhciBzZWxmID0gdGhpcztcclxuICB0aGlzLnNlbGVjdGVkKGl0ZW0pO1xyXG4gIC8vIHJ1biBoYW5kbGVyXHJcbiAgdGhpcy5vbnNlbGVjdChpdGVtKTtcclxuXHQvLyBzbGlkZSB1cFxyXG4gIHRoaXMuc2xpZGVUb2dnbGUoc2VsZiwgZXZlbnQpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjdXN0b20tc2VsZWN0Jywge1xyXG4gIHZpZXdNb2RlbDogQ3VzdG9tU2VsZWN0LFxyXG4gIHRlbXBsYXRlOiAoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3QganMtY3VzdG9tLXNlbGVjdFwiPicsXHJcbiAgICAgICc8ZGl2IGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0LXdyYXBwZXJcIj4nLFxyXG4gICAgICAgICc8c2VsZWN0IGRhdGEtYmluZD1cIm9wdGlvbnM6IHNlbGVjdE1vZGVsLCBvcHRpb25zVGV4dDogXFwnbmFtZVxcJywgdmFsdWU6IHNlbGVjdGVkXCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2ZpZWxkXCIgbmFtZT1cImFwaS1leHAtbWV0aG9kXCI+PC9zZWxlY3Q+JyxcclxuICAgICAgICAnPHNwYW4gY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX3BsYWNlaG9sZGVyXCI+JyxcclxuICAgICAgICAgICc8aW5wdXQgZGF0YS1iaW5kPVwiZXZlbnQ6IHtjbGljazogc2xpZGVUb2dnbGV9LCBhdHRyOiB7dmFsdWU6IHNlbGVjdGVkKCkubmFtZSwgZGlzYWJsZWQ6IGlzT25lT3B0aW9ufVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCJcIiByZWFkb25seT1cIlwiPicsXHJcbiAgICAgICAgICAnPGIgZGF0YS1iaW5kPVwiY3NzOiB7aGlkZGVuOiBpc09uZU9wdGlvbn1cIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9fY2hldnJvblwiPiZuYnNwOzwvYj4nLFxyXG4gICAgICAgICc8L3NwYW4+JyxcclxuICAgICAgICAnPHVsIGRhdGEtYmluZD1cImZvcmVhY2g6IHNlbGVjdE1vZGVsXCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2xpc3QganMtY3VzdG9tLXNlbGVjdC13cmFwcGVyXCI+JyxcclxuICAgICAgICAgICc8bGkgZGF0YS1iaW5kPVwiY3NzOiB7XFwnYWN0aXZlXFwnOiBjaGVja2VkfVwiIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19pdGVtXCI+JyxcclxuICAgICAgICAgICAgJzxidXR0b24gZGF0YS1iaW5kPVwiZXZlbnQ6IHtjbGljazogJHBhcmVudC5zZWxlY3RJdGVtLmJpbmQoJHBhcmVudCl9LCB0ZXh0OiBuYW1lLCBjc3M6IHtcXCdhY3RpdmVcXCc6IGNoZWNrZWQoKX0sIGF0dHI6IHtcXCdkYXRhLXZhbHVlXFwnOiBuYW1lfVwiICBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9faXRlbS1sYWJlbFwiIGhyZWY9XCIjXCI+PC9idXR0b24+JyxcclxuICAgICAgICAgICAgLy8gJzxzcGFuIGRhdGEtYmluZD1cImlmOiBsaW5rXCI+JyxcclxuICAgICAgICAgICAgXHQnPGEgZGF0YS1iaW5kPVwiYXR0cjoge2hyZWY6IGxpbmt9LCBjc3M6IHtcXCdoaWRkZW5cXCc6ICFsaW5rfVwiIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19pdGVtLWxpbmtcIiB0YXJnZXQ9XCJfYmxhbmtcIj4mbmJzcDs8L2E+JyxcclxuICAgICAgICAgICAgLy8gJzwvc3Bhbj4nLFxyXG4gICAgICAgICAgJzwvbGk+JyxcclxuICAgICAgICAnPC91bD4nLFxyXG4gICAgICAnPC9kaXY+JyxcclxuICAgICAgJzxkaXYgZGF0YS1iaW5kPVwiY2xpY2s6IHNsaWRlVG9nZ2xlXCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3QtbGF5ZXIganMtY3VzdG9tLXNlbGVjdC1sYXllciBoaWRkZW5cIj48L2Rpdj4nLFxyXG4gICAgJzwvZGl2PidcclxuICBdKS5qb2luKCcnKVxyXG59KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL2N1c3RvbVNlbGVjdC5jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHNlbGY7XHJcblxyXG5mdW5jdGlvbiBFcnJvclBvcFVwKHBhcmFtcykge1xyXG5cdHNlbGYgPSB0aGlzO1xyXG5cdHRoaXMuc3RhdHVzID0ga28ub2JzZXJ2YWJsZSgnJyk7XHJcblx0dGhpcy5zdGF0dXNUZXh0ID0ga28ub2JzZXJ2YWJsZSgnJyk7XHJcblx0dGhpcy5kZXRhaWxzID0ga28ub2JzZXJ2YWJsZShgYCk7XHJcblx0cGFyYW1zLm9uRXJyb3Iuc3Vic2NyaWJlKGZ1bmN0aW9uKGVycm9yT2JqKSB7XHJcblx0XHR0aGlzLnN0YXR1cyhPYmplY3QuZ2V0UHJvcChlcnJvck9iaiwgJy5yZXNwb25zZUpTT04uZXJyb3JzWzBdLnN0YXR1cycpIHx8IGVycm9yT2JqLnN0YXR1cyB8fCAndW5ub3duJyk7XHJcblx0XHR0aGlzLnN0YXR1c1RleHQoT2JqZWN0LmdldFByb3AoZXJyb3JPYmosICcucmVzcG9uc2VKU09OLmVycm9yc1swXS5zdGF0dXNUZXh0JykgfHwgZXJyb3JPYmouc3RhdHVzVGV4dCB8fCAnJyk7XHJcblx0XHR0aGlzLmRldGFpbHMoT2JqZWN0LmdldFByb3AoZXJyb3JPYmosICcucmVzcG9uc2VKU09OLmVycm9yc1swXS5kZXRhaWwnKSB8fCAndW5ub3duJyk7XHJcblx0XHR0aGlzLnRvZ2dsZVBvcFVwKCk7XHJcblx0fSwgdGhpcywgJ2Vycm9yJyk7XHJcbn1cclxuXHJcbkVycm9yUG9wVXAucHJvdG90eXBlLnRvZ2dsZVBvcFVwID0gZnVuY3Rpb24gKCkge1xyXG5cdCQoJyNlcnJvci1tb2RhbCcpLm1vZGFsKCdzaG93Jyk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2Vycm9yLXBvcC11cCcsIHtcclxuXHR2aWV3TW9kZWw6IEVycm9yUG9wVXAsXHJcblx0dGVtcGxhdGU6YFxyXG5cdFx0PHNlY3Rpb24gaWQ9XCJlcnJvci1tb2RhbFwiIGNsYXNzPVwibW9kYWwgZmFkZVwiIHRhYmluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCI+XHJcblx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1kaWFsb2dcIiByb2xlPVwiZG9jdW1lbnRcIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudCBlcnJvci1wb3AtdXBcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cclxuXHRcdFx0XHRcdFx0PGgyIGNsYXNzPVwiZXJyb3ItdGl0bGVcIj5FcnJvciA8c3BhbiBkYXRhLWJpbmQ9XCJ0ZXh0OiBzdGF0dXNcIj48L3NwYW4+OiA8c3BhbiBkYXRhLWJpbmQ9XCJ0ZXh0OiBzdGF0dXNUZXh0XCI+PC9zcGFuPjwvaDI+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XHJcblx0XHRcdFx0XHRcdDxwIGRhdGEtYmluZD1cInRleHQ6IGRldGFpbHNcIiBjbGFzcz1cImVycm9yLWRldGFpbHNcIj48L3A+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cclxuXHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLWFjY2VwdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+T2s8L2J1dHRvbj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PjwhLS0gLy5tb2RhbC1jb250ZW50IC0tPlxyXG5cdFx0XHQ8L2Rpdj48IS0tIC8ubW9kYWwtZGlhbG9nIC0tPlxyXG5cdFx0PC9zZWN0aW9uPjwhLS0gLy5tb2RhbCAtLT5cclxuYH0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcG9wdXBzL2Vycm9yLmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxudG9kbzogc2luZ2xlIC0gZmlyc3QgbG9hZDtcbnRvZG86IHBhZ2luZyAocGFyYW1zKVxudG9kbzogdWxyIHBhcnNlXG50b2RvOiBmaWVsZHMgdmFsaWRhdGlvblxuICovXG5cbnZhciBzZWxmO1xuXG5mdW5jdGlvbiBDYXJkR3JvdXAocGFyYW1zKSB7XG5cdHNlbGYgPSB0aGlzO1xuXHR0aGlzLnVybCA9IHRoaXMudXJsIHx8IHBhcmFtcy51cmw7XG5cdHRoaXMuY29uZmlnID0gZ2V0Q29uZmlnKHBhcmFtcyk7XG5cdHRoaXMuZGF0YSA9IHByZXBhcmVEYXRhKHBhcmFtcywgdGhpcy5jb25maWcuX0NPTkZJRyk7XG5cdHRoaXMuZ3JvdXBJbmRleCA9IHBhcmFtcy5ncm91cEluZGV4IHx8IDA7XG5cdHRoaXMuc2VjdGlvbkluZGV4ID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShwYXJhbXMuc2VjdGlvbkluZGV4KTtcblx0dGhpcy5jb2xvckNsYXNzID0gcGFyYW1zLmNvbG9yQ2xhc3M7XG5cdHRoaXMuZ2V0TW9yZSA9IHBhcmFtcy5nZXRNb3JlO1xuXHR0aGlzLnBhZ2UgPSBnZXRQYWdpbmdJbmZvKHBhcmFtcywgdGhpcy5kYXRhLnBhZ2UsIHRoaXMudXJsKTtcblx0dGhpcy5jb2xsYXBzZUlkID0gZ2V0Q29sbGFwc2VJZCgpO1xuXHR0aGlzLl9oYXNFdmVudHNQYW5lbCA9IGZhbHNlO1xufVxuXG5DYXJkR3JvdXAucHJvdG90eXBlLnNvcnRCeUNvbmZpZyA9IGZ1bmN0aW9uIChhLCBiKSB7XG5cdGlmICh0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZ1thLmtleV0gJiYgdGhpcy5jb25maWdbYi5rZXldICYmIHRoaXMuY29uZmlnW2Eua2V5XS5fQ09ORklHICYmIHRoaXMuY29uZmlnW2Iua2V5XS5fQ09ORklHKSB7XG5cdFx0dmFyIGkxID0gdGhpcy5jb25maWdbYS5rZXldLl9DT05GSUcuaW5kZXg7XG5cdFx0dmFyIGkyID0gdGhpcy5jb25maWdbYi5rZXldLl9DT05GSUcuaW5kZXg7XG5cdFx0cmV0dXJuIGkxIC0gaTI7XG5cdH1cblx0cmV0dXJuIDA7XG59O1xuXG5DYXJkR3JvdXAucHJvdG90eXBlLmNoZWNrSWZIYXNFdmVudHNMaXN0ID0gZnVuY3Rpb24gKGtleSkge1xuXHRyZXR1cm4gc2VsZi5faGFzRXZlbnRzUGFuZWwgPSBrZXkgPT09ICdldmVudHMnIHx8IHNlbGYuX2hhc0V2ZW50c1BhbmVsO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdwYW5lbC1ncm91cCcsIHtcblx0dmlld01vZGVsOiBDYXJkR3JvdXAsXG5cdHRlbXBsYXRlOmBcblx0XHQ8c2VjdGlvbiBkYXRhLWJpbmQ9XCJmb3JlYWNocHJvcDoge2RhdGE6IGRhdGEsIHNvcnRGbjogc29ydEJ5Q29uZmlnLmJpbmQoJGNvbXBvbmVudCl9XCIgY2xhc3M9XCJwYW5lbC1ncm91cFwiPlxuXHRcdFx0PCEtLXBhbmVsLS0+XG5cdFx0XHQ8cGFuZWwgZGF0YS1iaW5kPVwiY3NzOiB7J2hhcy1ldmVudHMtbGlzdCc6ICRjb21wb25lbnQuY2hlY2tJZkhhc0V2ZW50c0xpc3Qoa2V5KX1cIiBwYXJhbXM9XCIkZGF0YTogJGRhdGEsICRpbmRleDogJGluZGV4LCBwYW5lbEdyb3VwOiAkY29tcG9uZW50LCBzb3J0QnlDb25maWc6ICRjb21wb25lbnQuc29ydEJ5Q29uZmlnXCI+PC9wYW5lbD5cblx0XHQ8L3NlY3Rpb24+XG5gfSk7XG5cbi8qKlxuICogQ29uZmlndXJlcyBhbmQgcGFyYW1zIGZvciBlYWNoIHBhbmVsIGdyb3VwXG4gKiBAcGFyYW0gcGFyYW1zXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gZ2V0Q29uZmlnKHBhcmFtcykge1xuXHRzZWxmLmRlZXBQcm9wID0gcGFyYW1zLmRlZXBQcm9wIHx8ICcnO1xuXHQvLyBtYWluIGNvbmZpZ1xuXHRpZiAoIXNlbGYuZGVlcFByb3AgJiYgIXBhcmFtcy5jb25maWcpIHtcblx0XHQvLyBwYW5lbEdyb3VwIGluZGV4IC0gMFxuXG5cdFx0Ly8gZ2V0IGZ1bGwgY29uZmlnO1xuXHRcdHZhciBmaWx0ZXIgPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHBhcmFtcy5maWx0ZXIpO1xuXG5cdFx0Ly8gZ2V0IGN1cnJlbnQgbWV0aG9kIGNvbmZpZ1xuXHRcdHZhciBtZXRob2RDb25maWcgPSBmaWx0ZXJbcGFyYW1zLnJlcUlkXSB8fCB7fTtcblxuXHRcdC8vIG1ldGhvZCBjb25maWcgaW5oZXJpdHMgZ2xvYmFsIGNvbmZpZ1xuXHRcdG1ldGhvZENvbmZpZy5fQ09ORklHICA9ICQuZXh0ZW5kKHRydWUsIHt9LCBmaWx0ZXIuX0dMT0JBTF9DT05GSUcsIG1ldGhvZENvbmZpZy5fQ09ORklHKTtcblxuXHRcdHJldHVybiBtZXRob2RDb25maWc7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gcGFuZWxHcm91cCBpbmRleCA+IDBcblx0XHRyZXR1cm4gcGFyYW1zLmNvbmZpZyB8fCB7fVxuXHR9XG59XG5cbi8qKlxuICogRGF0YSBtYW5pcHVsYXRpb25zXG4gKiBAcGFyYW0gcGFyYW1zXG4gKiBAcmV0dXJucyB7Knx7fX1cbiAqL1xuZnVuY3Rpb24gcHJlcGFyZURhdGEocGFyYW1zLCBjb25maWcpIHtcblx0dmFyIGRhdGEgPSBwYXJhbXMgJiYgJC5leHRlbmQoe30scGFyYW1zLmRhdGEpIHx8IHt9O1xuXHR1bndyYXBwT2JqZWN0cyhkYXRhLCBjb25maWcpO1xuXHRyZW1vdmVEZXByZWNhdGVkKGRhdGEsIGNvbmZpZyk7XG5cdHJldHVybiB3cmFwcFByaW1pdGl2ZXMoZGF0YSwgcGFyYW1zLl9wcm9wVGl0bGUpO1xufVxuXG4vKipcbiAqIEdhdGhlcnMgYWxsIHN0YW5kIGFsb25lIHByb3BzIGluIHRvIG9uZSBvYmplY3RcbiAqIEBwYXJhbSBkYXRhIHtvYmplY3R9XG4gKiBAcGFyYW0gX3Byb3BUaXRsZSB7c3RyaW5nfVxuICogQHJldHVybnMge29iamVjdH0gcmV2aXNlZCBkYXRhXG4gKi9cbmZ1bmN0aW9uIHdyYXBwUHJpbWl0aXZlcyhkYXRhLCBfcHJvcFRpdGxlKSB7XG5cdHZhciBuZXdEYXRhID0ge30sIHByb3AgPSBfcHJvcFRpdGxlIHx8ICdvYmplY3QnLCB2YWwsIGtleTtcblxuXHQvLyBnYXRoZXJpbmcgYWxsIHByaW1pdGl2ZSBwcm9wcyBpbiBhZGRpdGlvbmFsIHBhbmVsXG5cdGZvciAoa2V5IGluIGRhdGEpIHtcblx0XHRpZiAoIWRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge2NvbnRpbnVlO31cblx0XHR2YWwgPSBkYXRhW2tleV07XG5cblx0XHRpZiAodHlwZW9mIHZhbCAhPT0gJ29iamVjdCcpIHtcblx0XHRcdG5ld0RhdGFbcHJvcF0gPSBuZXdEYXRhW3Byb3BdIHx8IHt9O1xuXHRcdFx0bmV3RGF0YVtwcm9wXVtrZXldID0gdmFsO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRuZXdEYXRhW2tleV0gPSB2YWw7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBuZXdEYXRhXG59XG5cbi8qKlxuICogVW53cmFwcyBvYmplY3RzXG4gKiBAcGFyYW0gb2JqIHtvYmplY3R9XG4gKiBAcmV0dXJucyB7b2JqZWN0fSBjaGFuZ2VkXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZURlcHJlY2F0ZWQob2JqLCBjb25maWcpIHtcblx0dmFyIGRlcHJlY2F0ZWQgPSBjb25maWcgJiYgY29uZmlnLmRlcHJlY2F0ZWQgfHwgW107XG5cblx0ZGVwcmVjYXRlZC5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRpZiAob2JqW2l0ZW1dKSB7XG5cdFx0XHRkZWxldGUgb2JqW2l0ZW1dXG5cdFx0fVxuXHRcdHJldHVybiBpdGVtO1xuXHR9KTtcblxuXHRyZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgZGVwcmVjYXRlZCBvYmplY3RzXG4gKiBAcGFyYW0gb2JqIHtvYmplY3R9XG4gKiBAcmV0dXJucyB7b2JqZWN0fSBjaGFuZ2VkXG4gKi9cbmZ1bmN0aW9uIHVud3JhcHBPYmplY3RzKG9iaiwgY29uZmlnKSB7XG5cdHZhciB1bndyYXBwID0gY29uZmlnICYmIGNvbmZpZy51bndyYXBwIHx8IFtdO1xuXG5cdHVud3JhcHAubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0dmFyIHZhbCA9IG9ialtpdGVtXTtcblx0XHRpZiAodmFsKSB7XG5cdFx0XHR2YXIgYXJyID0gT2JqZWN0LmtleXModmFsKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciBwcm9wID0gYXJyW2ldO1xuXHRcdFx0XHRvYmpbcHJvcF0gPSB2YWxbcHJvcF07XG5cdFx0XHR9XG5cdFx0XHRkZWxldGUgb2JqW2l0ZW1dO1xuXHRcdH1cblx0XHRyZXR1cm4gaXRlbTtcblx0fSk7XG5cblx0cmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBQcmVwYXJlcyBkYXRhIGZvciBwYWdpbmdcbiAqIEBwYXJhbSBwYWdlT2JqXG4gKiBAcGFyYW0gcGFyYW1zXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gZ2V0UGFnaW5nSW5mbyhwYXJhbXMsIHBhZ2VPYmosIHVybCkge1xuXHR2YXIgcGFnZVBhcmFtLCBzaXplO1xuXG5cdGlmIChwYWdlT2JqKXtcblx0XHRzaXplID0gcGFyYW1zLmNhcmRTaXplIHx8IHBhZ2VPYmouc2l6ZTtcblx0XHRwYWdlUGFyYW0gPSBwYXJhbXMucGFnZVBhcmFtIHx8IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUodXJsKS5maW5kKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHRyZXR1cm4gaXRlbS5uYW1lID09PSAncGFnZSc7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdGhpcy5wYWdlID0ge1xuXHRcdFx0cGFyYW1ldGVyOiBwYWdlUGFyYW0gJiYgcGFnZVBhcmFtLnZhbHVlLFxuXHRcdFx0c2l6ZTogc2l6ZVxuXHRcdH07XG5cdH1cblx0cmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogUHJvdmlkZXMgaWQgc3RyIGZvciBwYW5lbCAnY29sbGFwc2UgdG9nZ2xlJyBsb2dpY1xuICogQHBhcmFtIHN0clxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0Q29sbGFwc2VJZChzdHIpIHtcblx0dmFyIGNsYXNzTmFtZSA9IHN0ciB8fCAnY2FyZC1wYW5lbC1ib2R5LSc7XG5cdHJldHVybiBbXG5cdFx0Y2xhc3NOYW1lLFxuXHRcdHNlbGYuc2VjdGlvbkluZGV4LFxuXHRcdHNlbGYuZ3JvdXBJbmRleFxuXHRdLmpvaW4oJycpO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYW5lbEdyb3VwLmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcclxuXHJcbmZ1bmN0aW9uIGNhcmRDb21wb25lbnQocGFyYW1zKSB7XHJcblx0c2VsZiA9IHRoaXM7XHJcblx0dGhpcy5rZXkgPSBwYXJhbXMuJGRhdGEua2V5O1xyXG5cdHRoaXMuJGRhdGEgPSBwYXJhbXMuJGRhdGE7XHJcblx0dGhpcy4kaW5kZXggPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHBhcmFtcy4kaW5kZXgpO1xyXG5cdHRoaXMucGFuZWxHcm91cCA9IHBhcmFtcy5wYW5lbEdyb3VwO1xyXG5cdHRoaXMucGFnZSA9IHRoaXMucGFuZWxHcm91cC5wYWdlO1xyXG5cdHRoaXMuY29sb3JDbGFzcyA9IHRoaXMucGFuZWxHcm91cC5jb2xvckNsYXNzIHx8ICcnO1xyXG5cdHRoaXMuY29uZmlnID0gZ2V0UGFuZWxDb25maWcodGhpcy5wYW5lbEdyb3VwLmNvbmZpZywgdGhpcy5rZXkpO1xyXG5cdHRoaXMuaXNFeHBhbmRlZCA9IGlzRXhwYW5kZWQodGhpcy5jb25maWcpO1xyXG5cdHRoaXMuY29sbGFwc2VJZCA9IHRoaXMucGFuZWxHcm91cC5jb2xsYXBzZUlkICsgdGhpcy4kaW5kZXg7XHJcblx0dGhpcy5pc0FjdGl2ZSA9IGtvLm9ic2VydmFibGUodGhpcy5pc0V4cGFuZGVkKTtcclxufVxyXG5cclxuY2FyZENvbXBvbmVudC5wcm90b3R5cGUuc2V0QWN0aXZlID0gZnVuY3Rpb24gKG1vZGVsLCBldmVudCkge1xyXG5cdHRoaXMuaXNBY3RpdmUoIXRoaXMuaXNBY3RpdmUoKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyBjb25maWcgZm9yIGVhY2ggcGFuZWxcclxuICogQHBhcmFtIGtleSB7c3RyaW5nfSBrZXkgb2YgcGFuZWwgb2JqZWN0XHJcbiAqIEByZXR1cm5zIHtvYmplY3R9IGNvbmZpZ1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UGFuZWxDb25maWcoY29uZmlnLCBrZXkpIHtcclxuXHR2YXIgc3ViQ29uZmlnID0gY29uZmlnW2tleV0gfHwge307XHJcblxyXG5cdHN1YkNvbmZpZy5fQ09ORklHID0gJC5leHRlbmQodHJ1ZSwge30sIGNvbmZpZy5fQ09ORklHLCBzdWJDb25maWcuX0NPTkZJRyk7XHJcblx0cmV0dXJuIHN1YkNvbmZpZztcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBmb3IgJ2NvbGxhcHNlZCcgY29uZmlnIGZvciBlYWNoIHBhbmVsXHJcbiAqIEBwYXJhbSBrZXkge3N0cmluZ30ga2V5IG9mIHBhbmVsIG9iamVjdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gZm9yIGNzcyBjbGFzcyBhZGQvcmVtb3ZlXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0V4cGFuZGVkKGNvbmZpZykge1xyXG5cdHJldHVybiAhKE9iamVjdC5nZXRQcm9wKGNvbmZpZywgJy5fQ09ORklHLmNvbGxhcHNlZCcpIHx8IGZhbHNlKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdwYW5lbCcsIHtcclxuXHR2aWV3TW9kZWw6IGNhcmRDb21wb25lbnQsXHJcblx0dGVtcGxhdGU6YFxyXG5cdFx0PHNlY3Rpb24gZGF0YS1iaW5kPVwiY3NzOiB7W2NvbG9yQ2xhc3NdOiB0cnVlLCBhY3RpdmU6IGlzQWN0aXZlfVwiIGNsYXNzPVwicGFuZWwgcGFuZWwtcHJpbWFyeVwiPlxyXG5cdFx0XHQ8IS0tcGFuZWwtaGVhZGluZy0tPlxyXG5cdFx0XHQ8cGFuZWwtaGVhZGluZyBwYXJhbXM9XCJjb25maWc6IGNvbmZpZywgZGF0YTogJGRhdGEsIGluZGV4OiAkaW5kZXgsIHBhZ2U6IHBhZ2UsIHNldEFjdGl2ZTogc2V0QWN0aXZlLmJpbmQoJGNvbXBvbmVudCksIGNvbGxhcHNlSWQ6IGNvbGxhcHNlSWQsIGNvbG9yQ2xhc3M6IGNvbG9yQ2xhc3MsIGlzRXhwYW5kZWQ6IGlzRXhwYW5kZWRcIj48L3BhbmVsLWhlYWRpbmc+XHJcblx0XHRcdFxyXG5cdFx0XHQ8IS0tcGFuZWwtYm9keS0tPlxyXG5cdFx0XHQ8c2VjdGlvbiBkYXRhLWJpbmQ9XCJhdHRyOiB7J2lkJzogY29sbGFwc2VJZH0sIGNzczogeydpbic6IGlzRXhwYW5kZWR9XCIgY2xhc3M9XCJwYW5lbC1jb2xsYXBzZSBjb2xsYXBzZVwiPlx0XHRcdFx0XHJcblx0XHRcdFx0PCEtLSBrbyBpZjogKHR5cGVvZiAkZGF0YS52YWx1ZSA9PT0gJ29iamVjdCcgJiYgISQuaXNBcnJheSgkZGF0YS52YWx1ZSkpIC0tPlxyXG5cdFx0XHRcdFx0PG9iamVjdC1wYW5lbC1ib2R5IHBhcmFtcz1cImNvbmZpZzogY29uZmlnLCBkYXRhOiAkZGF0YSwgaW5kZXg6ICRpbmRleCwgcGFuZWxHcm91cDogcGFuZWxHcm91cCwgcGFnZTogcGFnZSwgY29sbGFwc2VJZDogY29sbGFwc2VJZFwiPjwvb2JqZWN0LXBhbmVsLWJvZHk+XHJcblx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFx0PCEtLSBrbyBpZjogKHR5cGVvZiAkZGF0YS52YWx1ZSA9PT0gJ29iamVjdCcgJiYgJC5pc0FycmF5KCRkYXRhLnZhbHVlKSkgLS0+XHJcblx0XHRcdFx0XHQ8YXJyYXktcGFuZWwtYm9keSBwYXJhbXM9XCJjb25maWc6IGNvbmZpZywgZGF0YTogJGRhdGEsIGluZGV4OiAkaW5kZXgsIHBhbmVsR3JvdXA6IHBhbmVsR3JvdXBcIj48L2FycmF5LXBhbmVsLWJvZHk+XHJcblx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdDwvc2VjdGlvbj5cclxuYH0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL3BhbmVsLmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcclxuXHJcbi8qKlxyXG4gKiBQYWdpbmF0aW9uIGVsZW1lbnRcclxuICogQHBhcmFtIHBhcmFtc1xyXG4gKi9cclxuZnVuY3Rpb24gcGFnaW5hdGlvbihwYXJhbXMpIHtcclxuXHR0aGlzLnBhZ2VQYXJhbSA9IHBhcmFtcy5wYWdlUGFyYW07XHJcblx0dGhpcy50b3RhbFBhZ2VzID0gK3BhcmFtcy50b3RhbFBhZ2VzO1xyXG5cdHRoaXMubnVtYmVyID0gK3BhcmFtcy5udW1iZXI7XHJcblx0dGhpcy5maXJzdCA9ICEhdGhpcy5udW1iZXI7XHJcblx0dGhpcy5sYXN0ID0gdGhpcy5udW1iZXIgPCB0aGlzLnRvdGFsUGFnZXMgLSAxO1xyXG5cdHRoaXMucmVxdWVzdEJ0biA9ICQoJyNhcGktZXhwLWdldC1idG4nKTtcclxuXHRzZWxmID0gdGhpcztcclxufVxyXG5cclxuLyoqXHJcbiAqIGdldCBuZXh0IHBhZ2VcclxuICovXHJcbnBhZ2luYXRpb24ucHJvdG90eXBlLmdldFByZXZQYWdlID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciB2YWwgPSB0aGlzLnBhZ2VQYXJhbSgpO1xyXG5cdHRoaXMucGFnZVBhcmFtKHZhbCA+IDAgPyB2YWwgLSAxIDogMCk7XHJcblx0dGhpcy5yZXF1ZXN0QnRuLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogZ2V0IHByZXYgcGFnZVxyXG4gKi9cclxucGFnaW5hdGlvbi5wcm90b3R5cGUuZ2V0TmV4dFBhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHZhbCA9IHRoaXMubnVtYmVyO1xyXG5cdHRoaXMucGFnZVBhcmFtKHZhbCA8IHRoaXMudG90YWxQYWdlcyAtIDEgPyB2YWwgICsgMTogdmFsKTtcclxuXHR0aGlzLnJlcXVlc3RCdG4udHJpZ2dlcignY2xpY2snKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ga28uY29tcG9uZW50cy5yZWdpc3RlcigncGFnaW5hdGlvbicsIHtcclxuXHR2aWV3TW9kZWw6IHBhZ2luYXRpb24sXHJcblx0dGVtcGxhdGU6XHJcblx0YDxzcGFuIGNsYXNzPVwibmF2aWdhdGlvbi13cmFwcGVyXCI+XHJcblx0XHQ8YnV0dG9uIGRhdGEtYmluZD1cImNsaWNrOiBnZXRQcmV2UGFnZSwgZW5hYmxlOiBmaXJzdFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm5hdmlnYXRpb24gcHJldlwiPjwvYnV0dG9uPlxyXG5cdFx0PGJ1dHRvbiAgZGF0YS1iaW5kPVwiY2xpY2s6IGdldE5leHRQYWdlLCBlbmFibGU6IGxhc3RcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJuYXZpZ2F0aW9uIG5leHRcIj48L2J1dHRvbj5cclxuXHQ8L3NwYW4+YFxyXG59KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYWdpbmF0aW9uLmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDI3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcclxudmFyIGdldFJhbmRvbUNvbG9yID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9jb2xvckNsYXNzZXMnKS5nZXRSYW5kb21Db2xvcjtcclxuXHJcbmZ1bmN0aW9uIFBhbmVsSGVhZGluZyhwYXJhbXMpIHtcclxuXHRzZWxmID0gdGhpcztcclxuXHR0aGlzLmNvbmZpZyA9IHBhcmFtcy5jb25maWcgJiYgcGFyYW1zLmNvbmZpZy5fQ09ORklHO1xyXG5cdHZhciBwYWdlID0gcGFyYW1zLnBhZ2U7XHJcblx0dGhpcy5zZXRBY3RpdmUgPSBwYXJhbXMuc2V0QWN0aXZlO1xyXG5cdHRoaXMuaXNFeHBhbmRlZCA9IHBhcmFtcy5pc0V4cGFuZGVkO1xyXG5cdHRoaXMuX3BhbmVsTmFtZSA9IHBhcmFtcy5kYXRhLmtleTtcclxuXHR0aGlzLnRpdGxlID0gdGhpcy5jb25maWcgJiYgdGhpcy5jb25maWcudGl0bGUgfHwgdGhpcy5fcGFuZWxOYW1lO1xyXG5cdHRoaXMuZGF0YSA9IHBhcmFtcy5kYXRhLnZhbHVlO1xyXG5cdGlmIChwYWdlKSB7XHJcblx0XHR0aGlzLmNhcmRTaXplID0gcGFnZS5zaXplO1xyXG5cdFx0dGhpcy5wYWdlUGFyYW0gPSBwYWdlLnBhcmFtZXRlcjtcclxuXHR9XHJcblx0dGhpcy5jb2xsYXBzZUlkID0gcGFyYW1zLmNvbGxhcHNlSWQ7XHJcblx0aWYgKHRoaXMuY29uZmlnLnJlcXVlc3QpIHtcclxuXHRcdHRoaXMuZ2V0UmFuZG9tQ29sb3IgPSBnZXRSYW5kb21Db2xvcihwYXJhbXMuY29sb3JDbGFzcyk7XHJcblx0fVxyXG59XHJcblxyXG5QYW5lbEhlYWRpbmcucHJvdG90eXBlLmZvbGxvd1JlcXVlc3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHR2YXIgdXJsID0gT2JqZWN0LmdldFByb3AodmFsdWUsICcuY29uZmlnLnJlcXVlc3QnKTtcclxuXHR1cmwgJiYgbG9jYXRpb24uYXNzaWduKHVybCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ3BhbmVsLWhlYWRpbmcnLCB7XHJcblx0dmlld01vZGVsOiAgUGFuZWxIZWFkaW5nLFxyXG5cdHRlbXBsYXRlOmBcclxuXHRcdDxzZWN0aW9uIGNsYXNzPVwicGFuZWwtaGVhZGluZ1wiPlxyXG5cdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZWwtdGl0bGVcIj5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQ8YSBkYXRhLWJpbmQ9XCJjbGljazogc2V0QWN0aXZlLCBhdHRyOiB7aHJlZjogJyMnICsgY29sbGFwc2VJZCwgJ2FyaWEtY29udHJvbHMnOiBjb2xsYXBzZUlkLCAnYXJpYS1leHBhbmRlZCc6IGlzRXhwYW5kZWR9XCIgY2xhc3M9XCJidG4gYnRuLWljb24gYnRuLXRpdGxlXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiYnRuIGJ0bi1pY29uIHNoZXZyb24gd2hpdGUtc2hldnJvbi11cFwiPjwvc3Bhbj5cclxuXHRcdFx0XHRcdDxwIGRhdGEtYmluZD1cInRleHQ6IHRpdGxlXCIgY2xhc3M9XCJ0aXRsZVwiPlBhbmVsIHRpdGxlPC9wPlxyXG5cdFx0XHRcdDwvYT5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQ8IS0tIGtvIGlmOiBfcGFuZWxOYW1lID09PSAnZXZlbnRzJy0tPlxyXG5cdFx0XHRcdFx0PHNwYW4gZGF0YS1iaW5kPVwidGV4dDogY2FyZFNpemVcIiBjbGFzcz1cImNvdW50ZXJcIj48L3NwYW4+XHJcblx0XHRcdFx0PCEtLSAva28tLT5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQ8IS0tIGtvIGlmOiBfcGFuZWxOYW1lID09PSAncGFnZSctLT5cclxuXHRcdFx0XHRcdDxwYWdpbmF0aW9uIHBhcmFtcz1cIm51bWJlcjogZGF0YS5udW1iZXIsIHRvdGFsUGFnZXM6IGRhdGEudG90YWxQYWdlcywgcGFnZVBhcmFtOiBwYWdlUGFyYW1cIj48L3BhZ2luYXRpb24+XHJcblx0XHRcdFx0PCEtLSAva28tLT5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQ8IS0tIGtvIGlmOiBjb25maWcucmVxdWVzdCAhPT0gdW5kZWZpbmVkIC0tPlxyXG5cdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiZm9sbG93LXJlcXVlc3RcIj5cclxuXHRcdFx0XHRcdDxzcGFuIGRhdGEtYmluZD1cImNzczogZ2V0UmFuZG9tQ29sb3JcIiBjbGFzcz1cImNvbG9yLWluZGljYXRvclwiPjwvc3Bhbj5cclxuXHRcdFx0XHRcdDxidXR0b24gZGF0YS1iaW5kPVwiY2xpY2s6IGZvbGxvd1JlcXVlc3RcIiBjbGFzcz1cImJ0biBidG4tcmVxdWVzdFwiIHR5cGU9XCJidXR0b25cIj5hbm90aGVyIHJlcXVlc3Q8L2J1dHRvbj5cclxuXHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0PCEtLSAva28tLT5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L3NlY3Rpb24+XHJcbmB9KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYW5lbEhlYWRpbmcuY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xuXG5mdW5jdGlvbiBPYmplY3RQYW5lbEJvZHkocGFyYW1zKSB7XG5cdHNlbGYgPSB0aGlzO1xuXHR0aGlzLmRhdGEgPSB0aGlzLmRhdGEgfHwga28ub2JzZXJ2YWJsZShwYXJhbXMuZGF0YS52YWx1ZSk7XG5cdHRoaXMuY29uZmlnID0gcGFyYW1zLmNvbmZpZztcblx0dGhpcy5fcGFuZWxOYW1lID0gcGFyYW1zLmRhdGEua2V5O1xuXHR0aGlzLmNhcmRJbmRleCA9IHRoaXMuY2FyZEluZGV4IHx8IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUocGFyYW1zLmluZGV4KTtcblx0dGhpcy5wYW5lbEdyb3VwID0gcGFyYW1zLnBhbmVsR3JvdXAgfHwge307XG5cdHRoaXMuZ2V0TW9yZSA9IHRoaXMucGFuZWxHcm91cC5nZXRNb3JlO1xuXHR0aGlzLnBhZ2VQYXJhbSA9IHBhcmFtcy5wYWdlICYmIHBhcmFtcy5wYWdlLnBhcmFtZXRlcjtcblx0dGhpcy5jb2xsYXBzZUlkID0gcGFyYW1zLmNvbGxhcHNlSWQ7XG5cdHRoaXMuX2FsbEluc2lkZSA9ICEhT2JqZWN0LmdldFByb3Aoa28udW53cmFwKHRoaXMuY29uZmlnKSwgJy5fQ09ORklHLmFsbEluc2lkZScpO1xuXHR0aGlzLnNvcnRCeUNvbmZpZyA9IHRoaXMucGFuZWxHcm91cC5zb3J0QnlDb25maWc7XG59XG5cbk9iamVjdFBhbmVsQm9keS5wcm90b3R5cGUub25FbnRlcktleURvd24gPSBmdW5jdGlvbiAobW9kZWwsIGV2ZW50KSB7XG5cdGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xuXHRcdHZhciB2YWx1ZSA9ICtldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlO1xuXHRcdHZhbHVlID0gTnVtYmVyLmlzTmFOKHZhbHVlKSA/IDAgOiB2YWx1ZTtcblx0XHR2YXIgcGFnZU51bWJlciA9IH5+dmFsdWUgPCAwID8gMCA6IH5+dmFsdWU7XG5cdFx0dGhpcy5wYWdlUGFyYW0ocGFnZU51bWJlciA8IGtvLnVud3JhcCh0aGlzLmRhdGEpLnRvdGFsUGFnZXMgPyBwYWdlTnVtYmVyIDoga28udW53cmFwKHRoaXMuZGF0YSkudG90YWxQYWdlcyAtIDEpO1xuXHRcdCQoJyNhcGktZXhwLWdldC1idG4nKS50cmlnZ2VyKCdjbGljaycpO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG59O1xuXG5PYmplY3RQYW5lbEJvZHkucHJvdG90eXBlLmNhbkJlQ29waWVkID0gZnVuY3Rpb24gKCkge1xuXHRpZiAodHlwZW9mIHRoaXMudmFsdWUgPT09ICdvYmplY3QnKSByZXR1cm4gZmFsc2U7XG5cdHRoaXMuY29waWVkID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG5cdGlmIChPYmplY3QuZ2V0UHJvcChzZWxmLmNvbmZpZywgJy5fQ09ORklHLmNvcHlCdG4uJyArIHRoaXMua2V5KSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0cmV0dXJuIGZhbHNlO1xufTtcblxuT2JqZWN0UGFuZWxCb2R5LnByb3RvdHlwZS5jb3B5VmFsdWUgPSBmdW5jdGlvbiAobW9kZWwsIGV2ZW50KSB7XG5cdHZhciBjdXJyZW50RmllbGQgPSB0aGlzO1xuXHRzZWxmLmNsaXBib2FyZCA9IG5ldyBDbGlwYm9hcmQoZXZlbnQuY3VycmVudFRhcmdldCk7XG5cdHNlbGYuY2xpcGJvYXJkLm9uKCdzdWNjZXNzJywgZnVuY3Rpb24gb25TdWNjZXNzQ29weShlKSB7XG5cdFx0XHRjb25zb2xlLmluZm8oJ0FjdGlvbjonLCBlLmFjdGlvbik7XG5cdFx0XHRjb25zb2xlLmluZm8oJ1RleHQ6JywgZS50ZXh0KTtcblx0XHRcdGNvbnNvbGUuaW5mbygnVHJpZ2dlcjonLCBlLnRyaWdnZXIpO1xuXHRcdFx0Y3VycmVudEZpZWxkLmNvcGllZCh0cnVlKTtcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRjdXJyZW50RmllbGQuY29waWVkKGZhbHNlKTtcblx0XHRcdH0sIDUwMCk7XG5cdFx0XHRlLmNsZWFyU2VsZWN0aW9uKCk7XG5cdFx0fSlcblx0XHQub24oJ2Vycm9yJywgZnVuY3Rpb24gb25FcnJvckNvcHkoZSkge1xuXHRcdFx0Y29uc29sZS5lcnJvcignQWN0aW9uOicsIGUuYWN0aW9uKTtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ1RyaWdnZXI6JywgZS50cmlnZ2VyKTtcblx0XHR9KTtcbn07XG5cbk9iamVjdFBhbmVsQm9keS5wcm90b3R5cGUucmVtb3ZlSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcblx0c2VsZi5jbGlwYm9hcmQgJiYgc2VsZi5jbGlwYm9hcmQuZGVzdHJveSgpO1xuXHRkZWxldGUgc2VsZi5jbGlwYm9hcmQ7XG59O1xuT2JqZWN0UGFuZWxCb2R5LnByb3RvdHlwZS5zZXRBY3RpdmUgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgbW9kZWwsIGUpIHtcblx0JChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudHMoJy5zbGljay1zbGlkZScpLmZpbmQoJy5pdGVtLm9iamVjdCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0JChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudCgnLml0ZW0nKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdHRoaXMuZ2V0TW9yZS5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdvYmplY3QtcGFuZWwtYm9keScsIHtcblx0dmlld01vZGVsOiAgT2JqZWN0UGFuZWxCb2R5LFxuXHR0ZW1wbGF0ZTpgXG5cdFx0PHNlY3Rpb24gZGF0YS1iaW5kPVwiY3NzOiB7J2FsbC1pbnNpZGUnOiAkY29tcG9uZW50Ll9hbGxJbnNpZGV9XCIgY2xhc3M9XCJwYW5lbC1ib2R5IG9iamVjdC1wYW5lbC1ib2R5XCI+XG5cdFx0XHQ8IS0tIGtvIGlmOiAkY29tcG9uZW50Ll9wYW5lbE5hbWUgPT09ICdvYmplY3QnICYmICEhT2JqZWN0LmdldFByb3Aoa28udW53cmFwKGRhdGEpLCAnLnJhdGlvJyktLT5cblx0XHRcdFx0PGltZyBkYXRhLWJpbmQ9XCJhdHRyOiB7c3JjOiBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKGRhdGEpLnVybCwgYWx0OiAnaW1hZ2UtJyArIGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUoZGF0YSkucmF0aW99XCIgYWx0PVwiaW1nXCIgY2xhc3M9XCJpbWcgaW1nLXRodW1ibmFpbFwiPlxuXHRcdFx0PCEtLSAva28gLS0+XG5cdFx0XHRcblx0XHRcdDx1bCBkYXRhLWJpbmQ9XCJmb3JlYWNocHJvcDoge2RhdGE6IGRhdGEsIHNvcnRGbjogJGNvbXBvbmVudC5zb3J0QnlDb25maWcuYmluZCgkY29tcG9uZW50KX1cIiBjbGFzcz1cImxpc3Qgb2JqZWN0LWxpc3RcIj5cblx0XHRcdFx0PGxpIGRhdGEtYmluZD1cImNzczogeydvYmplY3QnOiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnLCAncHJpbWl0aXZlJzogdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0J31cIiBjbGFzcz1cImNsZWFyZml4IHBhZGluZyBpdGVtXCI+XG5cdFx0XHRcdFxuXHRcdFx0XHRcdDwhLS0ga28gaWZub3Q6IHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgJGNvbXBvbmVudC5fYWxsSW5zaWRlIC0tPlxuXHRcdFx0XHRcdDxzcGFuIGRhdGEtYmluZD1cInRleHQ6IHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgPyBrZXk6IGtleSArICc6J1wiIGNsYXNzPVwia2V5XCI+PC9zcGFuPlxuXHRcdFx0XHRcdDwhLS0gL2tvIC0tPlxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdDwhLS0ga28gaWZub3Q6IHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgJGNvbXBvbmVudC5fcGFuZWxOYW1lID09PSAncGFnZScgJiYga2V5ID09PSAnbnVtYmVyJyAtLT5cblx0XHRcdFx0XHRcdDxzcGFuIGRhdGEtYmluZD1cInRleHQ6IHZhbHVlXCIgY2xhc3M9XCJ2YWx1ZVwiPjwvc3Bhbj5cblx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cblx0XHRcdFx0XHRcblx0XHRcdFx0XHQ8IS0tIGtvIGlmOiAkY29tcG9uZW50Ll9wYW5lbE5hbWUgPT09ICdwYWdlJyAmJiBrZXkgPT09ICdudW1iZXInLS0+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZm9ybS1pbmxpbmVcIj5cblx0XHRcdFx0XHRcdFx0PGlucHV0IGlkPVwicGFnaW5hdGlvbi1pbnB1dFwiIGRhdGEtYmluZD1cImV2ZW50OiB7a2V5ZG93bjogJGNvbXBvbmVudC5vbkVudGVyS2V5RG93bi5iaW5kKCRjb21wb25lbnQpfSwgYXR0cjoge3BsYWNlaG9sZGVyOiB2YWx1ZX1cIiB0eXBlPVwidGV4dFwiIHBhdHRlcm49XCJbMC05XStcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PCEtLSAva28gLS0+XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0PCEtLSBrbyBpZjogJGNvbXBvbmVudC5jYW5CZUNvcGllZC5jYWxsKCRkYXRhLCAnI3Byb3AtdmFsdWUtJyArIGtleSArICRpbmRleCgpKSAtLT5cblx0XHRcdFx0XHRcdDxidXR0b24gZGF0YS1iaW5kPVwiZXZlbnQ6IHttb3VzZW92ZXI6ICRjb21wb25lbnQuY29weVZhbHVlLCBtb3VzZW91dDogJGNvbXBvbmVudC5yZW1vdmVIYW5kbGVyfSwgY3NzOiB7J2NvcGllZCc6IGNvcGllZH0sIGF0dHI6IHsnZGF0YS1jbGlwYm9hcmQtdGV4dCc6IHZhbHVlLnRvU3RyaW5nKCksIGlkOiAncHJvcC12YWx1ZS0nICsga2V5ICsgJGluZGV4KCl9LCBwb3BvdmVyOiB7dHlwZTogJ3Rvb2x0aXAnLCB0aXRsZTogJ0NvcHkgdmFsdWUnfVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4taWNvbiBidG4tY29weVwiPjwvYnV0dG9uPlxuXHRcdFx0XHRcdDwhLS0gL2tvIC0tPlxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0PCEtLSBrbyBpZjogdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAkY29tcG9uZW50Ll9hbGxJbnNpZGUgLS0+XG5cdFx0XHRcdFx0XHRcdDxwYW5lbCBwYXJhbXM9XCIkZGF0YTogJGRhdGEsICRpbmRleDogJGluZGV4LCBwYW5lbEdyb3VwOiAkY29tcG9uZW50XCI+PC9wYW5lbD5cblx0XHRcdFx0XHRcdDwhLS0gL2tvIC0tPlxuXHRcdFx0XHRcdFx0PCEtLSBrbyBpZjogdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAhJGNvbXBvbmVudC5fYWxsSW5zaWRlIC0tPlxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIGRhdGEtYmluZD1cImNsaWNrOiAkY29tcG9uZW50LnNldEFjdGl2ZS5iaW5kKCRjb21wb25lbnQsIGtleSwgdmFsdWUpXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1pY29uIGJsdWUtc2hldnJvbi1yaWdodCBwdWxsLXJpZ2h0XCI+PC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cblx0XHRcdFx0PC9saT5cblx0XHRcdDwvdWw+XG5cdFx0PC9zZWN0aW9uPlxuYH0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9vYmplY3RQYW5lbEJvZHkuY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xuXG5mdW5jdGlvbiBBcnJheVBhbmVsQm9keShwYXJhbXMpIHtcblx0c2VsZiA9IHRoaXM7XG5cdHRoaXMuZGF0YSA9IHBhcmFtcy5kYXRhLnZhbHVlO1xuXHR0aGlzLmNvbmZpZyA9IHBhcmFtcy5jb25maWc7XG5cdHRoaXMuX3BhbmVsTmFtZSA9IHBhcmFtcy5kYXRhLmtleTtcblx0dGhpcy5jYXJkSW5kZXggPSB0aGlzLmNhcmRJbmRleCB8fCBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHBhcmFtcy5pbmRleCk7XG5cdHRoaXMucGFuZWxHcm91cCA9IHBhcmFtcy5wYW5lbEdyb3VwO1xuXHR0aGlzLmdldE1vcmUgPSB0aGlzLnBhbmVsR3JvdXAuZ2V0TW9yZTtcblxufVxuXG5BcnJheVBhbmVsQm9keS5wcm90b3R5cGUuZ2V0U3RhcnREYXRhID0gZnVuY3Rpb24gKCRkYXRhKSB7XG5cdHJldHVybiBPYmplY3QuZ2V0UHJvcCgkZGF0YSwgJ2RhdGVzLnN0YXJ0LmxvY2FsRGF0ZScpIHx8ICcnXG59O1xuXG5BcnJheVBhbmVsQm9keS5wcm90b3R5cGUuZ2V0VmVudWVOYW1lID0gZnVuY3Rpb24gKCRkYXRhKSB7XG5cdHJldHVybiBPYmplY3QuZ2V0UHJvcCgkZGF0YSwgJ19lbWJlZGRlZC52ZW51ZXNbMF0ubmFtZScpIHx8ICcnXG59O1xuXG5BcnJheVBhbmVsQm9keS5wcm90b3R5cGUuc2V0QWN0aXZlID0gZnVuY3Rpb24gKCRpbmRleCwgbW9kZWwsIGUpIHtcblx0JChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudHMoJy5zbGljay1zbGlkZScpLmZpbmQoJy5pdGVtLm9iamVjdCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0JChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudCgnLml0ZW0nKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdHRoaXMuZ2V0TW9yZS5jYWxsKHRoaXMsICRpbmRleCwgbW9kZWwpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdhcnJheS1wYW5lbC1ib2R5Jywge1xuXHR2aWV3TW9kZWw6IEFycmF5UGFuZWxCb2R5LFxuXHR0ZW1wbGF0ZTpgXG5cdFx0PHNlY3Rpb24gY2xhc3M9XCJwYW5lbC1ib2R5IG5vLXBhZGRpbmcgYXJyYXktcGFuZWwtYm9keVwiPlxuXHRcdFx0PHVsIGRhdGEtYmluZD1cImZvcmVhY2g6IGRhdGFcIiBjbGFzcz1cImxpc3QgbGlzdC1ncm91cFwiPlxuXHRcdFx0XHQ8bGkgZGF0YS1iaW5kPVwiY3NzOiB7J29iamVjdCc6IHR5cGVvZiAkZGF0YSA9PT0gJ29iamVjdCd9XCIgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0gaXRlbVwiPlxuXHRcdFx0XHRcblx0XHRcdFx0XHQ8IS0tIGtvIGlmOiAkY29tcG9uZW50Ll9wYW5lbE5hbWUgPT09ICdpbWFnZXMnIC0tPlxuXHRcdFx0XHRcdFx0PGltZyBkYXRhLWJpbmQ9XCJhdHRyOiB7c3JjOiB1cmwsIGFsdDogJ2ltYWdlLScgKyByYXRpb31cIiBhbHQ9XCJpbWdcIiBjbGFzcz1cImltZ1wiPlxuXHRcdFx0XHRcdDwhLS0gL2tvIC0tPlxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdDwhLS0ga28gaWZub3Q6ICRjb21wb25lbnQuX3BhbmVsTmFtZSA9PT0gJ2ltYWdlcycgLS0+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibmFtZS13cmFwcGVyXCI+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGRhdGEtYmluZD1cInRleHQ6IG5hbWUgfHwgJyMnICsgJGluZGV4KCksIGJsb2NrRWxsaXBzaXM6IHtjbGFtcDogMn1cIiBjbGFzcz1cIm5hbWVcIj5sYWJlbDwvc3Bhbj5cblx0XHRcdFx0XHRcdDwvZGl2Plx0XHRcdFxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQ8IS0tIGtvIGlmOiAkY29tcG9uZW50Ll9wYW5lbE5hbWUgPT09ICdldmVudHMnIC0tPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYWRkaXRpb25hbC1pbmZvXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgZGF0YS1iaW5kPVwidGV4dDogJGNvbXBvbmVudC5nZXRTdGFydERhdGEoJGRhdGEpXCIgY2xhc3M9XCJkYXRlXCI+ZXZlbnQgZGF0ZTwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8IS0tIGtvIGlmOiAkY29tcG9uZW50LmdldFZlbnVlTmFtZSgkZGF0YSktLT5cblx0XHRcdFx0XHRcdFx0XHRcdDxwIGRhdGEtYmluZD1cInRleHQ6ICRjb21wb25lbnQuZ2V0VmVudWVOYW1lKCRkYXRhKVwiIGNsYXNzPVwidmVudWUgdHJ1bmNhdGVcIj5ldmVudCB2ZW51ZTwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8IS0tL2tvLS0+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PCEtLSAva28gLS0+XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cblx0XHRcdFx0XHRcblx0XHRcdFx0XHQ8IS0tIGtvIGlmOiB0eXBlb2YgJGRhdGEgPT09ICdvYmplY3QnIC0tPlxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBkYXRhLWJpbmQ9XCJjbGljazogJGNvbXBvbmVudC5zZXRBY3RpdmUuYmluZCgkY29tcG9uZW50LCAkaW5kZXgoKSlcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWljb24gYmx1ZS1zaGV2cm9uLXJpZ2h0IHB1bGwtcmlnaHRcIj48L2J1dHRvbj5cblx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cblx0XHRcdFx0XHRcblx0XHRcdFx0PC9saT5cblx0XHRcdDwvdWw+XG5cdFx0PC9zZWN0aW9uPlxuYH0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9hcnJheVBhbmVsQm9keS5jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==