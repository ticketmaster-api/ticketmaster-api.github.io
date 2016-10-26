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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmU2NjQ2NGRiNjExN2ZkYTNkYzgiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL3ZlbmRvcnMvY2xhbXAubWluLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jdXN0b21CaW5kaW5ncy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY3VzdG9tQmluZGluZ3MvYmxvY2tFbGxpcHNpcy5iaW5kaW5nLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jdXN0b21CaW5kaW5ncy9mb3JlYWNoUHJvcC5iaW5kaW5nLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jdXN0b21CaW5kaW5ncy9wb3BvdmVyLmJpbmRpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9hcGlrZXkuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvYWpheFNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvY29uZmlnU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvVmlld01vZGVscy9tZW51Vmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2hlbHBlckZ1bmMuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvcGFyYW1zVmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9WaWV3TW9kZWxzL21ldGhvZHNWaWV3TW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvcmVxdWVzdHNMaXN0Vmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2pzb24taGlnaGxpZ2h0LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2hpZ2hsaWdodEpzb24ud29ya2VyLmpzIiwid2VicGFjazovLy8uL34vd29ya2VyLWxvYWRlci9jcmVhdGVJbmxpbmVXb3JrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvc2xpZGVyLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbmZpZy5qc29uIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2NvbG9yQ2xhc3Nlcy5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9jdXN0b21TZWxlY3QuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BvcHVwcy9lcnJvci5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL3BhbmVsR3JvdXAuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYW5lbC5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL3BhZ2luYXRpb24uY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYW5lbEhlYWRpbmcuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9vYmplY3RQYW5lbEJvZHkuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9hcnJheVBhbmVsQm9keS5jb21wb25lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3RDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBZ0M7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQzFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBcUI7QUFDckIsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFvRCxzQ0FBc0M7QUFDMUY7O0FBRUE7QUFDQSwwQkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBLHVDQUFzQywyQkFBMkI7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pC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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNEIsb0NBQW9DO0FBQ2hFO0FBQ0EsNEJBQTJCLGdHQUFnRztBQUMzSDs7QUFFQSxpQ0FBZ0MsNkRBQTZEO0FBQzdGLDBCQUF5Qiw0RUFBNEU7O0FBRXJHO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdEQUF1RCxvREFBb0QsU0FBUyxtQkFBbUI7QUFDdkk7QUFDQTs7QUFFQTtBQUNBLGtDQUFpQyxvRUFBb0UsUUFBUSxpQkFBaUIsU0FBUyw0RUFBNEUsWUFBWSxxQ0FBcUM7QUFDcFE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7Ozs7OztBQ3BHRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE2QixnQ0FBZ0M7QUFDN0Q7O0FBRUE7QUFDQTtBQUNBLHVFQUFzRSxTQUFTO0FBQy9FOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUUiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAyZTY2NDY0ZGI2MTE3ZmRhM2RjOFxuICoqLyIsInZhciBjbGFtcCA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL3ZlbmRvcnMvY2xhbXAubWluJyk7XHJcblxyXG4vKipcclxuICogTWFpbiBmaWxlIGZvciBBcGkgRXhwbHJlciB2Mi4wXHJcbiAqIEZvciBkZXZlbG9wbWVudCBwbGVhc2UgdXNlIFdlYnBhY2sgdG8gYnVuZGxlIGFsbCBtb2R1bGVzXHJcbiAqIEl0IGNhbiBiZSBtYWRlIHVzaW5nIG5wbSBzY3JpcHRzIGNtZCAtICd3ZWJwYWNrJ1xyXG4gKi9cclxuLy8gY3VzdG9tIGJpbmRpbmdzXHJcbnJlcXVpcmUoJy4uL2N1c3RvbUJpbmRpbmdzL2luZGV4Jyk7XHJcblxyXG4vLyBNb2R1bGVzXHJcbnZhciBiYXNlID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9iYXNlJyk7XHJcbnZhciBhcGlLZXkgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2FwaWtleScpO1xyXG52YXIgYWpheFNlcnZpY2UgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2FqYXhTZXJ2aWNlJyk7XHJcblxyXG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb25maWdTZXJ2aWNlJyk7XHJcbi8vIFZpZXcgTW9kZWxzXHJcbnZhciBNZW51Vmlld01vZGVsID0gcmVxdWlyZSgnLi9tZW51Vmlld01vZGVsJyk7XHJcbnZhciBQYXJhbXNWaWV3TW9kZWwgPSByZXF1aXJlKCcuL3BhcmFtc1ZpZXdNb2RlbCcpO1xyXG52YXIgTWV0aG9kc1ZpZXdNb2RlbCA9IHJlcXVpcmUoJy4vbWV0aG9kc1ZpZXdNb2RlbCcpO1xyXG52YXIgUmVxdWVzdHNMaXN0Vmlld01vZGVsID0gcmVxdWlyZSgnLi9yZXF1ZXN0c0xpc3RWaWV3TW9kZWwnKTtcclxuLy8gQ29tcG9uZW50c1xyXG5yZXF1aXJlKCcuLi9jb21wb25lbnRzL2luZGV4Jyk7XHJcblxyXG4vKipcclxuICogTWFpbiBhcHBsaWNhdGlvbiB2aWV3LW1vZGVsXHJcbiAqIEBwYXJhbSBvYmoge29iamVjdH0gZ2xvYmFsIGRhdGEgb2JqZWN0XHJcbiAqL1xyXG5mdW5jdGlvbiBBcHBWaWV3TW9kZWwob2JqKSB7XHJcbiAgc2VsZiA9IHRoaXM7XHJcbiAgdmFyIGJhc2UgPSBvYmogfHwge307XHJcblx0dmFyIHBhcnNlZFVybCA9IHBhcnNlVXJsKCk7XHJcbiAgdGhpcy5hcGlLZXkgPSBhcGlLZXk7XHJcblx0dGhpcy5jb25maWcgPSBjb25maWc7XHJcblxyXG4gIC8vIG9ic2VydmFibGVzXHJcbiAgdGhpcy5zZWxlY3RlZENhdGVnb3J5ID0ga28ub2JzZXJ2YWJsZShwYXJzZWRVcmwuYXBpQ2F0ZWdvcnkgfHwgJycpO1xyXG4gIHRoaXMuc2VsZWN0ZWRNZXRob2QgPSBrby5vYnNlcnZhYmxlKHBhcnNlZFVybC5tZXRob2RJZCB8fCAnJyk7XHJcbiAgdGhpcy5zZWxlY3RlZFBhcmFtcyA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XHJcblx0dGhpcy5yZXF1ZXN0cyA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XHJcblx0dGhpcy5vbkVycm9yID0ga28ub2JzZXJ2YWJsZSh7fSk7XHJcblxyXG5cdC8vIGNvbXB1dGVkXHJcbiAgdGhpcy5VUkwgPSBrby5jb21wdXRlZCh0aGlzLmdldFVybCwgdGhpcyk7XHJcbiAgdGhpcy5zZW5kQnV0dG9uVGV4dCA9IGtvLnB1cmVDb21wdXRlZCh0aGlzLmdldE1ldGhvZE5hbWUsIHRoaXMpO1xyXG5cdHRoaXMuc2hhcmVQYXRoID0ga28ucHVyZUNvbXB1dGVkKGZvcm1EZWVwTGlua2luZ1VybCwgdGhpcyk7XHJcbiAgLy8gc3ViLW1vZGVsc1xyXG4gIHRoaXMubWVudSA9IG5ldyBNZW51Vmlld01vZGVsKGJhc2UsIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSk7XHJcbiAgdGhpcy5tZXRob2RzID0gbmV3IE1ldGhvZHNWaWV3TW9kZWwoYmFzZSwgdGhpcy5zZWxlY3RlZENhdGVnb3J5LCB0aGlzLnNlbGVjdGVkTWV0aG9kKTtcclxuICB0aGlzLnBhcmFtcyA9IG5ldyBQYXJhbXNWaWV3TW9kZWwoYmFzZSwgdGhpcy5zZWxlY3RlZE1ldGhvZCwgdGhpcy5zZWxlY3RlZFBhcmFtcyk7XHJcbiAgdGhpcy5yZXF1ZXN0c0xpc3QgPSBuZXcgUmVxdWVzdHNMaXN0Vmlld01vZGVsKHRoaXMucmVxdWVzdHMsIHRoaXMuc2VsZWN0ZWRQYXJhbXMsIHRoaXMuc2hhcmVQYXRoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNlbmQgcmVxdWVzdCBtZXRob2RcclxuICovXHJcbkFwcFZpZXdNb2RlbC5wcm90b3R5cGUub25DbGlja1NlbmRCdG4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgYWpheFNlcnZpY2UodGhpcy5VUkwoKSwgdGhpcy5yZXF1ZXN0cywgdGhpcy5vbkVycm9yLCBiYXNlKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIGN1cnJlbnQgbWV0aG9kIG5hbWVcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbkFwcFZpZXdNb2RlbC5wcm90b3R5cGUuZ2V0TWV0aG9kTmFtZSA9IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gdGhpcy5zZWxlY3RlZE1ldGhvZCgpLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgcmF3IHVybCBkYXRhIGFycmF5XHJcbiAqIEByZXR1cm5zIHsqW119XHJcbiAqL1xyXG5BcHBWaWV3TW9kZWwucHJvdG90eXBlLmdldFVybCA9IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gW1xyXG4gICAgdGhpcy5zZWxlY3RlZE1ldGhvZCgpLFxyXG4gICAgdGhpcy5hcGlLZXksXHJcbiAgICB0aGlzLnNlbGVjdGVkUGFyYW1zKClcclxuICBdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgZGVlcCBwcm9wXHJcbiAqIEByZXR1cm5zIHsqW119XHJcbiAqL1xyXG5PYmplY3QuZ2V0UHJvcCA9IGZ1bmN0aW9uKG8sIHMpIHtcclxuXHRpZiAoKHR5cGVvZiBvICE9PSAnb2JqZWN0JyB8fCBvID09IG51bGwpICYmICFzKSB7cmV0dXJuO31cclxuXHRzID0gcy5yZXBsYWNlKC9cXFsoXFx3KylcXF0vZywgJy4kMScpOyAvLyBjb252ZXJ0IGluZGV4ZXMgdG8gcHJvcGVydGllc1xyXG5cdHMgPSBzLnJlcGxhY2UoL15cXC4vLCAnJyk7ICAgICAgICAgICAvLyBzdHJpcCBhIGxlYWRpbmcgZG90XHJcblx0dmFyIGEgPSBzLnNwbGl0KCcuJyk7XHJcblx0Zm9yICh2YXIgaSA9IDAsIG4gPSBhLmxlbmd0aDsgaSA8IG47ICsraSkge1xyXG5cdFx0dmFyIGsgPSBhW2ldO1xyXG5cdFx0aWYgKG8gJiYgayBpbiBvKSB7XHJcblx0XHRcdG8gPSBvW2tdO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gbztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBY3RpdmF0ZXMga25vY2tvdXQuanNcclxuICovXHJcbmtvLmFwcGx5QmluZGluZ3MobmV3IEFwcFZpZXdNb2RlbChiYXNlKSk7XHJcbi8qKlxyXG4gKiBleHBvcnRzIGdsb2JhbCB2YXJpYWJsZVxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBiYXNlO1xyXG5cclxuZnVuY3Rpb24gZm9ybURlZXBMaW5raW5nVXJsKCkge1xyXG5cdHZhciBsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbjtcclxuXHR2YXIgY2F0ZWdvcnkgPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHNlbGYuc2VsZWN0ZWRDYXRlZ29yeSk7XHJcblx0dmFyIG1ldGhvZCA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUoc2VsZi5zZWxlY3RlZE1ldGhvZCk7XHJcblx0dmFyIHBhcmFtcyA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUoc2VsZi5zZWxlY3RlZFBhcmFtcyk7XHJcblxyXG5cdHZhciBxdWVyeXMgPSBbXHJcblx0XHQnYXBpQ2F0ZWdvcnk9JyArIGVuY29kZVVSSShjYXRlZ29yeSksXHJcblx0XHQnbWV0aG9kSWQ9JysgZW5jb2RlVVJJKG1ldGhvZC5pZClcclxuXHRdO1xyXG5cclxuXHRwYXJhbXMubWFwKGZ1bmN0aW9uIChwYXJhbSkge1xyXG5cdFx0dmFyIHZhbHVlID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShwYXJhbS52YWx1ZSk7XHJcblx0XHR2YXIgZGVmYXVsdFZhbHVlID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShwYXJhbS5kZWZhdWx0KTtcclxuXHRcdHF1ZXJ5cy5wdXNoKFtcclxuXHRcdFx0cGFyYW0ubmFtZSxcclxuXHRcdFx0Jz0nLFxyXG5cdFx0XHR2YWx1ZSAhPT0gJycgPyB2YWx1ZSA6IGRlZmF1bHRWYWx1ZSAvL3RvZG86IHJlbW92ZSBkZWZhdWx0IGZyb20gaGVyZSB3aGVuIHNldCB1cCBpdCBpbiBzb3VyY2UgbGlrZSB2YWx1ZSBieSBkZWZhdWx0XHJcblx0XHRdLmpvaW4oJycpKTtcclxuXHRcdHJldHVybiBwYXJhbTtcclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIFtcclxuXHRcdGxvY2F0aW9uLm9yaWdpbixcclxuXHRcdGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcLyQvZ21pLCAnJyksXHJcblx0XHQnPycsXHJcblx0XHRxdWVyeXMuam9pbignJicpXHJcblx0XS5qb2luKCcnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VVcmwoKSB7XHJcblx0dmFyIGxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcclxuXHRpZiAobG9jYXRpb24pIHtcclxuXHRcdHZhciBxdWVyeXMgPSBsb2NhdGlvbi5yZXBsYWNlKC9eXFw/L2csICcnKS5zcGxpdCgnJicpO1xyXG5cdFx0dmFyIG9iaiA9IHtcclxuXHRcdFx0YXBpQ2F0ZWdvcnk6ICcnLFxyXG5cdFx0XHRtZXRob2RJZDogJycsXHJcblx0XHRcdHNlbGVjdGVkUGFyYW1zOiBbXVxyXG5cdFx0fTtcclxuXHJcblx0XHRxdWVyeXMubWFwKGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdHZhciBhID0gZGVjb2RlVVJJKGUpLnNwbGl0KCc9Jyk7XHJcblx0XHRcdHZhciBrZXkgPSBhWzBdO1xyXG5cdFx0XHR2YXIgdmFsID0gYVsxXTtcclxuXHJcblx0XHRcdGlmIChrZXkgPT09ICdhcGlDYXRlZ29yeScgfHwga2V5ID09PSAnbWV0aG9kSWQnKSB7XHJcblx0XHRcdFx0b2JqW2tleV0gPSB2YWw7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0b2JqLnNlbGVjdGVkUGFyYW1zLnB1c2goe1xyXG5cdFx0XHRcdFx0bmFtZToga2V5LFxyXG5cdFx0XHRcdFx0dmFsdWU6IHZhbFxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIG9iajtcclxuXHR9XHJcblx0cmV0dXJuIHt9O1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvVmlld01vZGVscy9tYWluLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyohXHJcbiogQ2xhbXAuanMgMC41LjFcclxuKlxyXG4qIENvcHlyaWdodCAyMDExLTIwMTMsIEpvc2VwaCBTY2htaXR0IGh0dHA6Ly9qb2Uuc2hcclxuKiBSZWxlYXNlZCB1bmRlciB0aGUgV1RGUEwgbGljZW5zZVxyXG4qIGh0dHA6Ly9zYW0uem95Lm9yZy93dGZwbC9cclxuKi9cclxuKGZ1bmN0aW9uKCl7d2luZG93LiRjbGFtcD1mdW5jdGlvbihjLGQpe2Z1bmN0aW9uIHMoYSxiKXtuLmdldENvbXB1dGVkU3R5bGV8fChuLmdldENvbXB1dGVkU3R5bGU9ZnVuY3Rpb24oYSxiKXt0aGlzLmVsPWE7dGhpcy5nZXRQcm9wZXJ0eVZhbHVlPWZ1bmN0aW9uKGIpe3ZhciBjPS8oXFwtKFthLXpdKXsxfSkvZztcImZsb2F0XCI9PWImJihiPVwic3R5bGVGbG9hdFwiKTtjLnRlc3QoYikmJihiPWIucmVwbGFjZShjLGZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gYy50b1VwcGVyQ2FzZSgpfSkpO3JldHVybiBhLmN1cnJlbnRTdHlsZSYmYS5jdXJyZW50U3R5bGVbYl0/YS5jdXJyZW50U3R5bGVbYl06bnVsbH07cmV0dXJuIHRoaXN9KTtyZXR1cm4gbi5nZXRDb21wdXRlZFN0eWxlKGEsbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShiKX1mdW5jdGlvbiB0KGEpe2E9YXx8Yy5jbGllbnRIZWlnaHQ7dmFyIGI9dShjKTtyZXR1cm4gTWF0aC5tYXgoTWF0aC5mbG9vcihhL2IpLDApfWZ1bmN0aW9uIHgoYSl7cmV0dXJuIHUoYykqXHJcbmF9ZnVuY3Rpb24gdShhKXt2YXIgYj1zKGEsXCJsaW5lLWhlaWdodFwiKTtcIm5vcm1hbFwiPT1iJiYoYj0xLjIqcGFyc2VJbnQocyhhLFwiZm9udC1zaXplXCIpKSk7cmV0dXJuIHBhcnNlSW50KGIpfWZ1bmN0aW9uIGwoYSl7aWYoYS5sYXN0Q2hpbGQuY2hpbGRyZW4mJjA8YS5sYXN0Q2hpbGQuY2hpbGRyZW4ubGVuZ3RoKXJldHVybiBsKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGEuY2hpbGRyZW4pLnBvcCgpKTtpZihhLmxhc3RDaGlsZCYmYS5sYXN0Q2hpbGQubm9kZVZhbHVlJiZcIlwiIT1hLmxhc3RDaGlsZC5ub2RlVmFsdWUmJmEubGFzdENoaWxkLm5vZGVWYWx1ZSE9Yi50cnVuY2F0aW9uQ2hhcilyZXR1cm4gYS5sYXN0Q2hpbGQ7YS5sYXN0Q2hpbGQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChhLmxhc3RDaGlsZCk7cmV0dXJuIGwoYyl9ZnVuY3Rpb24gcChhLGQpe2lmKGQpe3ZhciBlPWEubm9kZVZhbHVlLnJlcGxhY2UoYi50cnVuY2F0aW9uQ2hhcixcIlwiKTtmfHwoaD0wPGsubGVuZ3RoP1xyXG5rLnNoaWZ0KCk6XCJcIixmPWUuc3BsaXQoaCkpOzE8Zi5sZW5ndGg/KHE9Zi5wb3AoKSxyKGEsZi5qb2luKGgpKSk6Zj1udWxsO20mJihhLm5vZGVWYWx1ZT1hLm5vZGVWYWx1ZS5yZXBsYWNlKGIudHJ1bmNhdGlvbkNoYXIsXCJcIiksYy5pbm5lckhUTUw9YS5ub2RlVmFsdWUrXCIgXCIrbS5pbm5lckhUTUwrYi50cnVuY2F0aW9uQ2hhcik7aWYoZil7aWYoYy5jbGllbnRIZWlnaHQ8PWQpaWYoMDw9ay5sZW5ndGgmJlwiXCIhPWgpcihhLGYuam9pbihoKStoK3EpLGY9bnVsbDtlbHNlIHJldHVybiBjLmlubmVySFRNTH1lbHNlXCJcIj09aCYmKHIoYSxcIlwiKSxhPWwoYyksaz1iLnNwbGl0T25DaGFycy5zbGljZSgwKSxoPWtbMF0scT1mPW51bGwpO2lmKGIuYW5pbWF0ZSlzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cChhLGQpfSwhMD09PWIuYW5pbWF0ZT8xMDpiLmFuaW1hdGUpO2Vsc2UgcmV0dXJuIHAoYSxkKX19ZnVuY3Rpb24gcihhLGMpe2Eubm9kZVZhbHVlPWMrYi50cnVuY2F0aW9uQ2hhcn1kPWR8fHt9O1xyXG52YXIgbj13aW5kb3csYj17Y2xhbXA6ZC5jbGFtcHx8Mix1c2VOYXRpdmVDbGFtcDpcInVuZGVmaW5lZFwiIT10eXBlb2YgZC51c2VOYXRpdmVDbGFtcD9kLnVzZU5hdGl2ZUNsYW1wOiEwLHNwbGl0T25DaGFyczpkLnNwbGl0T25DaGFyc3x8W1wiLlwiLFwiLVwiLFwiXFx1MjAxM1wiLFwiXFx1MjAxNFwiLFwiIFwiXSxhbmltYXRlOmQuYW5pbWF0ZXx8ITEsdHJ1bmNhdGlvbkNoYXI6ZC50cnVuY2F0aW9uQ2hhcnx8XCJcXHUyMDI2XCIsdHJ1bmNhdGlvbkhUTUw6ZC50cnVuY2F0aW9uSFRNTH0sZT1jLnN0eWxlLHk9Yy5pbm5lckhUTUwsej1cInVuZGVmaW5lZFwiIT10eXBlb2YgYy5zdHlsZS53ZWJraXRMaW5lQ2xhbXAsZz1iLmNsYW1wLHY9Zy5pbmRleE9mJiYoLTE8Zy5pbmRleE9mKFwicHhcIil8fC0xPGcuaW5kZXhPZihcImVtXCIpKSxtO2IudHJ1bmNhdGlvbkhUTUwmJihtPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpLG0uaW5uZXJIVE1MPWIudHJ1bmNhdGlvbkhUTUwpO3ZhciBrPWIuc3BsaXRPbkNoYXJzLnNsaWNlKDApLFxyXG5oPWtbMF0sZixxO1wiYXV0b1wiPT1nP2c9dCgpOnYmJihnPXQocGFyc2VJbnQoZykpKTt2YXIgdzt6JiZiLnVzZU5hdGl2ZUNsYW1wPyhlLm92ZXJmbG93PVwiaGlkZGVuXCIsZS50ZXh0T3ZlcmZsb3c9XCJlbGxpcHNpc1wiLGUud2Via2l0Qm94T3JpZW50PVwidmVydGljYWxcIixlLmRpc3BsYXk9XCItd2Via2l0LWJveFwiLGUud2Via2l0TGluZUNsYW1wPWcsdiYmKGUuaGVpZ2h0PWIuY2xhbXArXCJweFwiKSk6KGU9eChnKSxlPD1jLmNsaWVudEhlaWdodCYmKHc9cChsKGMpLGUpKSk7cmV0dXJue29yaWdpbmFsOnksY2xhbXBlZDp3fX19KSgpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL3ZlbmRvcnMvY2xhbXAubWluLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xyXG5cdHJlcXVpcmUoJy4vYmxvY2tFbGxpcHNpcy5iaW5kaW5nJyk7XHJcblx0cmVxdWlyZSgnLi9mb3JlYWNoUHJvcC5iaW5kaW5nJyk7XHJcblx0cmVxdWlyZSgnLi9wb3BvdmVyLmJpbmRpbmcnKTtcclxufSgpKTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jdXN0b21CaW5kaW5ncy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImtvLmJpbmRpbmdIYW5kbGVycy5ibG9ja0VsbGlwc2lzID0ge1xyXG5cdGluaXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IsIGFsbEJpbmRpbmdzLCB2aWV3TW9kZWwsIGJpbmRpbmdDb250ZXh0KSB7XHJcblx0XHQkY2xhbXAoZWxlbWVudCwgdmFsdWVBY2Nlc3NvcigpKTtcclxuXHR9XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY3VzdG9tQmluZGluZ3MvYmxvY2tFbGxpcHNpcy5iaW5kaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiIG1vZHVsZS5leHBvcnRzID0ga28uYmluZGluZ0hhbmRsZXJzLmZvcmVhY2hwcm9wID0ge1xyXG5cclxuXHR0cmFuc2Zvcm1PYmplY3Q6IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuXHRcdHZhciBwcm9wZXJ0aWVzID0gW107XHJcblx0XHR2YXIgb2JqLCBzb3J0Rm4gPSBwYXJhbXMuc29ydEZuO1xyXG5cclxuXHRcdG9iaiA9IHNvcnRGbiA/IHBhcmFtcy5kYXRhOiBwYXJhbXM7XHJcblx0XHRvYmogPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKG9iaik7XHJcblxyXG5cdFx0a28udXRpbHMub2JqZWN0Rm9yRWFjaChvYmosIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcblx0XHRcdHByb3BlcnRpZXMucHVzaCh7XHJcblx0XHRcdFx0a2V5OiBrZXksXHJcblx0XHRcdFx0dmFsdWU6IHZhbHVlXHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKHNvcnRGbikge1xyXG5cdFx0XHRwcm9wZXJ0aWVzLnNvcnQoc29ydEZuKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcHJvcGVydGllcztcclxuXHR9LFxyXG5cdGluaXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IsIGFsbEJpbmRpbmdzQWNjZXNzb3IsIHZpZXdNb2RlbCwgYmluZGluZ0NvbnRleHQpIHtcclxuXHRcdHZhciBwcm9wZXJ0aWVzID0ga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIG9iaiA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUodmFsdWVBY2Nlc3NvcigpKTtcclxuXHRcdFx0cmV0dXJuIGtvLmJpbmRpbmdIYW5kbGVycy5mb3JlYWNocHJvcC50cmFuc2Zvcm1PYmplY3Qob2JqKTtcclxuXHRcdH0pO1xyXG5cdFx0a28uYXBwbHlCaW5kaW5nc1RvTm9kZShlbGVtZW50LCB7XHJcblx0XHRcdGZvcmVhY2g6IHByb3BlcnRpZXNcclxuXHRcdH0sIGJpbmRpbmdDb250ZXh0KTtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGNvbnRyb2xzRGVzY2VuZGFudEJpbmRpbmdzOiB0cnVlXHJcblx0XHR9O1xyXG5cdH1cclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jdXN0b21CaW5kaW5ncy9mb3JlYWNoUHJvcC5iaW5kaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGNvbW1vbiA9IHtcclxuXHRjb250YWluZXI6ICdib2R5JyxcclxuXHR0cmlnZ2VyOiAnaG92ZXInLFxyXG5cdHBsYWNlbWVudDogJ2JvdHRvbSdcclxufTtcclxuXHJcbmtvLmJpbmRpbmdIYW5kbGVycy5wb3BvdmVyID0ge1xyXG5cdHVwZGF0ZTogZnVuY3Rpb24oZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xyXG5cdFx0dmFyICRlbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHZhciBwYXJhbXMgPSB2YWx1ZUFjY2Vzc29yKCk7XHJcblx0XHR2YXIgY29uZmlnID0gJC5leHRlbmQoe30sIGNvbW1vbiwgcGFyYW1zLCB7ZGF0YTogbnVsbH0pO1xyXG5cclxuXHRcdGlmIChwYXJhbXMudHlwZSA9PT0gJ3BvcG92ZXInICYmIHBhcmFtcy5kYXRhKSB7XHJcblx0XHRcdHZhciBkYXRhID0ga28udW53cmFwKHBhcmFtcy5kYXRhKTtcclxuXHRcdFx0Y29uZmlnLnRpdGxlID0gYEVycm9yICR7ZGF0YVswXX06ICR7ZGF0YVsxXX1gO1xyXG5cdFx0XHRjb25maWcuY29udGVudCA9IGRhdGFbMl07XHJcblx0XHRcdCRlbGVtZW50LnBvcG92ZXIoY29uZmlnKTtcclxuXHRcdFx0aWYgKGNvbmZpZy50cmlnZ2VyID09PSAnY2xpY2snKSB7XHJcblx0XHRcdFx0dmFyIHRpbWVyO1xyXG5cdFx0XHRcdCRlbGVtZW50Lm9uKCdzaG93bi5icy5wb3BvdmVyJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0dGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0JGVsZW1lbnQudHJpZ2dlcignY2xpY2snKTtcclxuXHRcdFx0XHRcdH0sIDIwMDApO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdCRlbGVtZW50Lm9uKCdoaWRlLmJzLnBvcG92ZXInLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRjbGVhckludGVydmFsKHRpbWVyKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uZmlnLmRlbGF5ID0ge1xyXG5cdFx0XHRcdFwic2hvd1wiOiAxNTAwLFxyXG5cdFx0XHRcdFwiaGlkZVwiOiAxMDBcclxuXHRcdFx0fTtcclxuXHRcdFx0Y29uZmlnLnRpdGxlID0gcGFyYW1zLnRpdGxlIHx8IGNvbmZpZy50aXRsZTtcclxuXHRcdFx0JGVsZW1lbnQudG9vbHRpcChjb25maWcpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jdXN0b21CaW5kaW5ncy9wb3BvdmVyLmJpbmRpbmcuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYmFzZSA9IHt9O1xudmFyIENPTkZJR19VUkwgPSAnLi4vLi4vYXBpZGVzY3JpcHRpb24ueG1sJztcblxudmFyIHBhcnNlRGF0YSA9IGZ1bmN0aW9uICh4bWwpIHtcblx0dmFyIGdsb2JhbCA9IHt9O1xuXHQvL2dldCBhbGwgQVBJc1xuXHR2YXIgcmVzb3VyY2VzRWwgPSAkKHhtbCkuZmluZChcInJlc291cmNlc1wiKS5lcSgwKTtcblxuXHQvLyByZXNvdXJjZVxuXHQkKHhtbClcblx0XHQuZmluZChcInJlc291cmNlXCIpXG5cdFx0LmdldCgpXG5cdFx0Lm1hcChmdW5jdGlvbiAocmVzKSB7XG5cdFx0XHR2YXIgcmVzb3VyY2UgPSAkKHJlcyk7XG5cdFx0XHQvLyBtZXRob2QgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRcdHZhciBtZXRob2RFbGVtID0gcmVzb3VyY2UuZmluZChcIm1ldGhvZFwiKS5lcSgwKTtcblxuXHRcdFx0dmFyIG1ldGhvZCA9IHtcblx0XHRcdFx0aWQgOiBtZXRob2RFbGVtLmF0dHIoXCJpZFwiKSwgLy8gbWV0aG9kIGlkXG5cdFx0XHRcdG5hbWUgOiBtZXRob2RFbGVtLmF0dHIoXCJhcGlnZWU6ZGlzcGxheU5hbWVcIikgfHwgbWV0aG9kRWxlbS5hdHRyKFwiaWRcIiksIC8vIG1ldGhvZCBuYW1lXG5cdFx0XHRcdG1ldGhvZCA6IG1ldGhvZEVsZW0uYXR0cignbmFtZScpLCAvLyBHRVQgb3IgUE9TVFxuXHRcdFx0XHRjYXRlZ29yeSA6IG1ldGhvZEVsZW0uZmluZCgnW3ByaW1hcnk9XCJ0cnVlXCJdJykudGV4dCgpLnRyaW0oKSwgLy8gQVBJIG5hbWVcblx0XHRcdFx0cGF0aDogcmVzb3VyY2UuYXR0cigncGF0aCcpLCAvLyBtZXRob2QgVVJMXG5cdFx0XHRcdGJhc2UgOiByZXNvdXJjZXNFbC5hdHRyKCdiYXNlJyksIC8vIG1ldGhvZCBiYXNlIGxpbmtcblx0XHRcdFx0bGluayA6IG1ldGhvZEVsZW0uZmluZCgnZG9jJykuZXEoMCkuYXR0cignYXBpZ2VlOnVybCcpLCAvLyBsaW5rIHRvIGRvY3VtZW50YXRpb25cblx0XHRcdFx0ZGVzY3JpcHRpb24gOiBtZXRob2RFbGVtLmZpbmQoJ2RvYycpLmVxKDApLnRleHQoKS50cmltKCksIC8vbWV0aG9kIGRlc2NyaXB0aW9uXG5cdFx0XHRcdHBhcmFtZXRlcnM6IHt9XG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBwYXJhbXMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRcdHJlc291cmNlXG5cdFx0XHRcdC5maW5kKCdwYXJhbScpXG5cdFx0XHRcdC5nZXQoKVxuXHRcdFx0XHQubWFwKGZ1bmN0aW9uIChwYXIpIHtcblx0XHRcdFx0XHR2YXIgcGFyYW0gPSAkKHBhcik7XG5cdFx0XHRcdFx0dmFyIG9wdGlvbnMgPSBwYXJhbS5maW5kKCdvcHRpb24nKTtcblx0XHRcdFx0XHR2YXIgaXNTZWxlY3QgPSAhIW9wdGlvbnMubGVuZ3RoO1xuXG5cdFx0XHRcdFx0dmFyIHBhcmFtZXRlciA9IHtcblx0XHRcdFx0XHRcdG5hbWU6IHBhcmFtLmF0dHIoJ25hbWUnKSxcblx0XHRcdFx0XHRcdGRvYzogcGFyYW0uZmlyc3QoJ2RvYycpLnRleHQoKS50cmltKCksXG5cdFx0XHRcdFx0XHRzdHlsZTogcGFyYW0uYXR0cignc3R5bGUnKSxcblx0XHRcdFx0XHRcdHJlcXVpcmVkOiBwYXJhbS5hdHRyKCdyZXF1aXJlZCcpLFxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogcGFyYW0uYXR0cignZGVmYXVsdCcpID09PSAnbm9uZScgJiYgaXNTZWxlY3QgPyAnJyA6IHBhcmFtLmF0dHIoJ2RlZmF1bHQnKSxcblx0XHRcdFx0XHRcdHNlbGVjdDogaXNTZWxlY3Rcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0aWYgKGlzU2VsZWN0KSB7XG5cdFx0XHRcdFx0XHRwYXJhbWV0ZXIub3B0aW9ucyA9IG9wdGlvbnMuZ2V0KCkubWFwKGZ1bmN0aW9uIChvcHRpb24pIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0XHRuYW1lOiAkKG9wdGlvbikuYXR0cigndmFsdWUnKSxcblx0XHRcdFx0XHRcdFx0XHRjaGVja2VkOiAkKG9wdGlvbikuYXR0cigndmFsdWUnKSA9PT0gcGFyYW1ldGVyLmRlZmF1bHQgfHwgJChvcHRpb24pLmF0dHIoJ3ZhbHVlJykgPT09ICdub25lJyxcblx0XHRcdFx0XHRcdFx0XHRsaW5rOiBmYWxzZVxuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0bWV0aG9kLnBhcmFtZXRlcnNbcGFyYW1ldGVyLm5hbWVdID0gcGFyYW1ldGVyO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBHbG9iYWwgb2JqIGNvbXBvc2l0aW9uXG4gICAgICAgKi9cblx0XHRcdC8vIHNldCBjYXRlZ29yeSBvYmpcblx0XHRcdGdsb2JhbFttZXRob2QuY2F0ZWdvcnldID0gZ2xvYmFsW21ldGhvZC5jYXRlZ29yeV0gfHwge307XG5cblx0XHRcdC8vIHNldCBtZXRob2RzIHR5cGUgb2JqXG5cdFx0XHRnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XS5BTEwgPSBnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XS5BTEwgfHwge307XG5cdFx0XHRnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XVttZXRob2QubWV0aG9kXSA9IGdsb2JhbFttZXRob2QuY2F0ZWdvcnldW21ldGhvZC5tZXRob2RdIHx8IHt9O1xuXG5cdFx0XHQvLyBzZXQgbWV0aG9kIG9ialxuXHRcdFx0Z2xvYmFsW21ldGhvZC5jYXRlZ29yeV0uQUxMW21ldGhvZC5pZF0gPSBtZXRob2Q7XG5cdFx0XHRnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XVttZXRob2QubWV0aG9kXVttZXRob2QuaWRdID0gbWV0aG9kO1xuXHRcdH0pO1xuXG5cdHJldHVybiBnbG9iYWw7XG59O1xuXG4vL2dldHMgZG9jdW1lbnQgZnJvbSBXQURMIGNvbmZpZ3VyYXRpb24gZmlsZVxudmFyIHJlYWRGcm9tV0FETCA9IGZ1bmN0aW9uICgpIHtcbiAgJC5hamF4KHtcbiAgICB1cmw6IENPTkZJR19VUkwsXG4gICAgYXN5bmMgOiBmYWxzZSxcbiAgICBkYXRhVHlwZTogKCQuYnJvd3Nlci5tc2llKSA/IFwidGV4dFwiIDogXCJ4bWxcIixcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgdmFyIHhtbDtcblxuICAgICAgaWYgKHR5cGVvZiByZXNwb25zZSA9PSBcInN0cmluZ1wiKXtcbiAgICAgICAgeG1sID0gbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MRE9NXCIpO1xuICAgICAgICB4bWwuYXN5bmMgPSBmYWxzZTtcbiAgICAgICAgeG1sLmxvYWRYTUwocmVzcG9uc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeG1sID0gcmVzcG9uc2U7XG4gICAgICB9XG5cblx0XHRcdGJhc2UgPSBwYXJzZURhdGEoeG1sKTtcbiAgICB9LFxuXG4gICAgZXJyb3I6IGZ1bmN0aW9uKFhNTEh0dHBSZXF1ZXN0LCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bil7XG4gICAgICBhbGVydCgnRGF0YSBDb3VsZCBOb3QgQmUgTG9hZGVkIC0gJysgdGV4dFN0YXR1cyk7XG4gICAgfVxuICB9KTtcbn07XG5yZWFkRnJvbVdBREwoKTtcbm1vZHVsZS5leHBvcnRzID0gYmFzZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGFwaUtleSA9ICdYaU9yTjJVQzl5anVSNFhGODdzZE1iUnBhVk5zUDZXMicgfHwgYXBpS2V5U2VydmljZS5jaGVja0FwaUtleUNvb2tpZSgndGstYXBpLWtleScpIHx8IGFwaUtleVNlcnZpY2UuZ2V0QXBpRXhwbG9yZUtleSgpOyAvL0FQSSBLZXlcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIG5hbWU6ICdhcGlrZXknLFxyXG4gIHN0eWxlOiAncXVlcnknLFxyXG4gIHZhbHVlOiBrby5vYnNlcnZhYmxlKGFwaUtleSlcclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2FwaWtleS5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxyXG4gKiBBamF4IFNlcnZpY2VcclxuICogQHBhcmFtIHVybFxyXG4gKiBAcGFyYW0gbWV0aG9kXHJcbiAqIEBwYXJhbSBjYWxsYmFja1xyXG4gKi9cclxudmFyIGFqYXhTZXJ2aWNlID0gZnVuY3Rpb24gKHVybCwgbWV0aG9kLCBjYWxsYmFjaykge1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBtZXRob2QsXHJcbiAgICB1cmw6IHVybCxcclxuICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgY29tcGxldGU6IGNhbGxiYWNrXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogRmlsdGVycyBhbmQgcHJlcGFyZXMgcGFyYW1zIHBhaXJzXHJcbiAqIEBwYXJhbSBhcnJcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG52YXIgcHJlcGFyZVVybCA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICB2YXIgcmVwbGFjZW1lbnQsIHVybCwgZG9tYWluLCBwYXRoLCBtZXRob2QsIGFwaUtleSwgcGFyYW1zO1xyXG5cclxuICBpZiAoIWFyciAmJiAhYXJyLmxlbmd0aCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBcclxuICBkb21haW4gPSBhcnJbMF0uYmFzZTtcclxuICBwYXRoID0gYXJyWzBdLnBhdGg7XHJcbiAgYXBpS2V5ID0gYXJyWzFdO1xyXG4gIHBhcmFtcyA9IGFyclsyXS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgIHJldHVybiBpdGVtLnN0eWxlID09PSAncXVlcnknO1xyXG4gIH0pO1xyXG5cclxuICAvLyBhcnIgb2YgdGVtcGxhdGUgbWFya3NcclxuICByZXBsYWNlbWVudCA9IHBhdGgubWF0Y2goLyhbXntdKj8pXFx3KD89XFx9KS9nbWkpO1xyXG5cclxuICAvLyBhcnIgb2YgdGVtcGxhdGUgcGFyYW1zXHJcbiAgdmFyIHRlbXBsYXRlc0FyciA9IGFyclsyXS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgIHJldHVybiBpdGVtLnN0eWxlID09PSAndGVtcGxhdGUnO1xyXG4gIH0pO1xyXG5cclxuICAvLyByZXBsYWNlbWVudFxyXG4gIHJlcGxhY2VtZW50LmZvckVhY2goZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgdmFyIHBhcmFtID0gdGVtcGxhdGVzQXJyLmZpbmQoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgcmV0dXJuIGl0ZW0ubmFtZSA9PT0gdmFsO1xyXG4gICAgfSk7XHJcbiAgICBwYXRoID0gcGF0aC5yZXBsYWNlKCd7JysgcGFyYW0ubmFtZSArICd9JywgcGFyYW0udmFsdWUoKSB8fCBwYXJhbS5kZWZhdWx0KTtcclxuICB9KTtcclxuXHJcbiAgLy8gYWRkcyBhcGlLZXkgcGFyYW1cclxuICBpZiAoIXBhcmFtc1swXSB8fCBwYXJhbXNbMF0ubmFtZSAhPT0gJ2FwaWtleScpIHtcclxuICAgIHBhcmFtcy51bnNoaWZ0KGFwaUtleSk7XHJcbiAgfVxyXG5cclxuICAvLyBwcmVwYXJlcyBwYXJhbXMgcGFydCBvZiB1cmxcclxuICBwYXJhbXMgPSBwYXJhbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgIHJldHVybiBbaXRlbS5uYW1lLCBpdGVtLnZhbHVlKCkgfHwgaXRlbS5kZWZhdWx0XS5qb2luKCc9Jyk7XHJcbiAgICB9KS5qb2luKCcmJyk7XHJcblxyXG4gIHVybCA9IFtkb21haW4sICcvJywgcGF0aCwgJz8nLCBwYXJhbXNdLmpvaW4oJycpO1xyXG5cclxuICByZXR1cm4gZW5jb2RlVVJJKHVybCk7XHJcbn07XHJcblxyXG4vLyBzZW5kcyByZXF1ZXN0IHRvIGdldCB0aGUgc2Vjb25kIGNvbHVtblxyXG52YXIgc2VuZFByaW1hcnlSZXF1ZXN0ID0gZnVuY3Rpb24gKGFyciwgcmVxdWVzdHMsIG9uRXJyb3IsIGdsb2JhbCkge1xyXG4gIHZhciB1cmwgPSBwcmVwYXJlVXJsKGFycik7XHJcblxyXG4gIGFqYXhTZXJ2aWNlKHVybCwgYXJyWzBdLm1ldGhvZCwgZnVuY3Rpb24ocmVzLCBtc2cpIHtcclxuXHRcdHZhciByZXNPYmogPSB7XHJcblx0XHRcdHJlcTogdXJsLFxyXG5cdFx0XHRpbmRleDogcmVxdWVzdHMoKS5sZW5ndGhcclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKG1zZyA9PSAnZXJyb3InKSB7XHJcblx0XHRcdC8vIG5vdGlmeWluZyBlcnJvciBtb2RhbFxyXG5cdFx0XHRvbkVycm9yLm5vdGlmeVN1YnNjcmliZXJzKHJlcywgJ2Vycm9yJyk7XHJcblx0XHRcdC8vIGVycm9yIHBvcG92ZXIgb2YgcmVxdWVzdFxyXG5cdFx0XHRyZXNPYmouZXJyb3IgPSByZXM7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRnbG9iYWwubGFzdFJlc3BvbnNlID0gcmVzT2JqLnJlcyA9IHtcclxuXHRcdFx0XHRpZDogYXJyWzBdLmlkLCAvLyBtZXRob2QgaWQgd2FzIHVzZWRcclxuXHRcdFx0XHRyZXM6IHJlcy5yZXNwb25zZUpTT04gLy8gcmVzcG9uc2VcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBleHBvcnRpbmcgZGF0YSB1c2luZyBvYnNlcnZhYmxlXHJcblx0XHRyZXF1ZXN0cy51bnNoaWZ0KHJlc09iaik7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBzZW5kUHJpbWFyeVJlcXVlc3Q7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9hamF4U2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjb25maWcgPSBrby5vYnNlcnZhYmxlKCk7XHJcblxyXG4kLmFqYXgoe1xyXG5cdHR5cGU6ICdHRVQnLFxyXG5cdHVybDogW1xyXG5cdFx0J2h0dHA6Ly8nLFxyXG5cdFx0ZG9jdW1lbnQubG9jYXRpb24uaG9zdG5hbWUsXHJcblx0XHRkb2N1bWVudC5sb2NhdGlvbi5wb3J0ICYmICc6JyArIGRvY3VtZW50LmxvY2F0aW9uLnBvcnQsXHJcblx0XHQnL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbmZpZy5qc29uJ1xyXG5cdF0uam9pbignJyksXHJcblx0YXN5bmM6IHRydWUsXHJcblx0ZGF0YVR5cGU6IFwianNvblwiLFxyXG5cdGNvbXBsZXRlOiBmdW5jdGlvbihyZXMsIG1zZykge1xyXG5cdFx0aWYgKG1zZyA9PSAnZXJyb3InKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ2NhblxcJ3QgbG9hZCBjb25maWcuanNvbiEnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbmZpZyhyZXMucmVzcG9uc2VKU09OKTtcclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjb25maWc7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9jb25maWdTZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBoZiA9IHJlcXVpcmUoJy4uL21vZHVsZXMvaGVscGVyRnVuYycpO1xyXG52YXIgc2VsZjtcclxuXHJcbi8qKlxyXG4gKiBNZW51IFZpZXctTW9kZWxcclxuICogQHBhcmFtIGJhc2VcclxuICogQHBhcmFtIGNhdGVnb3J5XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gTWVudVZpZXdNb2RlbChiYXNlLCBzZWxlY3RlZENhdGVnb3J5KSB7XHJcbiAgc2VsZiA9IHRoaXM7XHJcblxyXG5cdHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSA9IHNlbGVjdGVkQ2F0ZWdvcnk7XHJcblx0dmFyIGluaXRDYXRlZ29yeSA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUoc2VsZWN0ZWRDYXRlZ29yeSk7XHJcblx0dGhpcy5jYXRlZ29yaWVzID0ga28ub2JzZXJ2YWJsZUFycmF5KE9iamVjdC5rZXlzKGJhc2UpLm1hcChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuXHRcdHZhciBjaGVja2VkID0gaW5pdENhdGVnb3J5ID8gaXRlbSA9PT0gaW5pdENhdGVnb3J5OiAhaW5kZXg7XHJcblx0XHQvLyBpbml0aWFsIGxvYWRcclxuXHRcdGNoZWNrZWQgJiYgc2VsZi5zZWxlY3RlZENhdGVnb3J5KGl0ZW0pO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Y2hlY2tlZDoga28ub2JzZXJ2YWJsZShjaGVja2VkKSxcclxuXHRcdFx0bmFtZTogaXRlbSxcclxuXHRcdFx0bGluazogZmFsc2VcclxuXHRcdH1cclxuXHR9KSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNZW51IFZpZXctTW9kZWwgbWV0aG9kXHJcbiAqIEBwYXJhbSBjYXRlZ29yeVxyXG4gKi9cclxuTWVudVZpZXdNb2RlbC5wcm90b3R5cGUuc2VsZWN0Q2F0ZWdvcnkgPSBmdW5jdGlvbiAoY2F0ZWdvcnkpIHtcclxuICB2YXIgY2F0ZWdvcnlOYW1lID0gY2F0ZWdvcnkubmFtZTtcclxuICBzZWxmLnNlbGVjdGVkQ2F0ZWdvcnkoY2F0ZWdvcnlOYW1lKTtcclxuICBoZi5jaGVja0FjdGl2ZShzZWxmLmNhdGVnb3JpZXMsIGNhdGVnb3J5TmFtZSk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1lbnVWaWV3TW9kZWw7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvVmlld01vZGVscy9tZW51Vmlld01vZGVsLmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMuZ2V0TW9kZWxBcnJheSA9IGZ1bmN0aW9uIGdldE1vZGVsQXJyYXkocGFyYW1zKSB7XHJcbiAgICB2YXIgb2JqID0gcGFyYW1zLm9iaiB8fCB7fSxcclxuICAgICAgICBhcnIgPSBwYXJhbXMuYXJyIHx8IFtdLFxyXG4gICAgICAgIHByb3AgPSBwYXJhbXMucHJvcCB8fCAnbmFtZSc7XHJcblxyXG4gICAgZm9yICh2YXIgaSBpbiBvYmopIHtcclxuICAgICAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShpKSkgeyBjb250aW51ZTsgfVxyXG5cclxuICAgICAgICB2YXIgaXRlbSA9IGFyci5maW5kKGZ1bmN0aW9uIChtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbTEubmFtZSA9PT0gb2JqW2ldW3Byb3BdO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoaXRlbSkgeyBjb250aW51ZTsgfVxyXG5cclxuICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgIGNoZWNrZWQ6IGtvLm9ic2VydmFibGUoZmFsc2UpLFxyXG4gICAgICAgICAgICBuYW1lOiBvYmpbaV1bcHJvcF1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBhcnI7XHJcbn07XHJcblxyXG5leHBvcnRzLmNoZWNrQWN0aXZlID0gZnVuY3Rpb24gY2hlY2tBY3RpdmUoa29BcnIsIGFjdGl2ZUVsZW0pIHtcclxuICAgIGlmICgha29BcnIgJiYgIWFjdGl2ZUVsZW0pIHtyZXR1cm4gZmFsc2U7fVxyXG5cclxuICAgIGtvQXJyKGtvQXJyKCkubWFwKGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICBpZiAob2JqLm5hbWUgPT09IGFjdGl2ZUVsZW0pIHtcclxuICAgICAgICAgICAgb2JqLmNoZWNrZWQodHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb2JqLmNoZWNrZWQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfSkpO1xyXG59O1xyXG5cclxuZXhwb3J0cy5pdGVyYXRlID0gZnVuY3Rpb24gKG9iaikge1xyXG5cdGZvciAodmFyIHByb3BlcnR5IGluIG9iaikge1xyXG5cdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBvYmpbcHJvcGVydHldID09IFwib2JqZWN0XCIpIHtcclxuXHRcdFx0XHRpdGVyYXRlKG9ialtwcm9wZXJ0eV0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCd8JyArIHByb3BlcnR5ICsgXCIgfCAgXCIgKyBvYmpbcHJvcGVydHldICsgJ3wnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9oZWxwZXJGdW5jLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xyXG52YXIgYmFzZTtcclxudmFyIGhmID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9oZWxwZXJGdW5jJyk7XHJcbi8qKlxyXG4gKiBQYXJhbXMgVmlldy1Nb2RlbFxyXG4gKiBAcGFyYW0gcmF3XHJcbiAqIEBwYXJhbSBtZXRob2RcclxuICogQHBhcmFtIHBhcmFtc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFBhcmFtc1ZpZXdNb2RlbChyYXcsIG1ldGhvZCwgcGFyYW1zKSB7XHJcbiAgYmFzZSA9IHJhdztcclxuICBzZWxmID0gdGhpcztcclxuICB0aGlzLmFuaW1hdGlvblNwZWVkID0gMjAwO1xyXG5cclxuICAvLyBvYnNlcnZhYmxlc1xyXG4gIHRoaXMubWV0aG9kID0gbWV0aG9kO1xyXG4gIHRoaXMucGFyYW1zID0gcGFyYW1zO1xyXG4gIHRoaXMuaXNIaWRkZW4gPSBrby5vYnNlcnZhYmxlKHRydWUpO1xyXG4gIHRoaXMucGFyYW1JbkZvY3VzID0ga28ub2JzZXJ2YWJsZSgnJyk7XHJcblx0dGhpcy5wYXJhbXNNb2RlbCA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XHJcblxyXG5cdC8vIGNvbXB1dGVkXHJcblx0Ly8gdGhpcy5wYXJhbXNNb2RlbCA9IGtvLmNvbXB1dGVkKHRoaXMudXBkYXRlUGFyYW1zTW9kZWwsIHRoaXMpO1xyXG5cdHRoaXMudXBkYXRlVmlld01vZGVsKCk7XHJcblx0dGhpcy5tZXRob2Quc3Vic2NyaWJlKHRoaXMudXBkYXRlVmlld01vZGVsLCB0aGlzKTtcclxuXHJcblx0dGhpcy5pc0RpcnR5ID0ga28uY29tcHV0ZWQodGhpcy5jaGVja0RpcnR5LCB0aGlzKTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsIGJ1aWxkIG9mIFNlbGVjdCBNb2RlbFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS51cGRhdGVWaWV3TW9kZWwgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIG9iaiA9IHRoaXMubWV0aG9kKCkucGFyYW1ldGVycyB8fCB7fSxcclxuXHRcdGFyciA9IFtdO1xyXG5cclxuXHRmb3IgKHZhciBpIGluIG9iaikge1xyXG5cdFx0aWYgKCFvYmouaGFzT3duUHJvcGVydHkoaSkpIHtjb250aW51ZTt9XHJcblxyXG5cdFx0Ly8gY29waWVzIGFsbCB2YWx1ZXMgZnJvbSBtb2RlbCB0byB2aWV3LW1vZGVsXHJcblx0XHR2YXIgdm1QYXJhbSA9ICQuZXh0ZW5kKHt9LCBvYmpbaV0pO1xyXG5cclxuXHRcdHZtUGFyYW0udmFsdWUgPSBrby5vYnNlcnZhYmxlKHZtUGFyYW0udmFsdWUgfHwgKHZtUGFyYW0uc2VsZWN0ICYmIHZtUGFyYW0uZGVmYXVsdCkgfHwgJycpO1xyXG5cclxuXHRcdC8vYWRkIG9ic2VydmFibGUgZm9yIHNlbGVjdGVkIG9wdGlvbnNcclxuXHRcdGlmICh2bVBhcmFtLnNlbGVjdCkge1xyXG5cdFx0XHR2bVBhcmFtLm9wdGlvbnMgPSBrby5vYnNlcnZhYmxlQXJyYXkob2JqW2ldLm9wdGlvbnMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcblx0XHRcdFx0dmFyIG9iaiA9ICQuZXh0ZW5kKHt9LCBpdGVtKTtcclxuXHRcdFx0XHRvYmouY2hlY2tlZCA9IGtvLm9ic2VydmFibGUoaXRlbS5jaGVja2VkKTtcclxuXHRcdFx0XHRyZXR1cm4gb2JqO1xyXG5cdFx0XHR9KSlcclxuXHRcdH1cclxuXHJcblx0XHQvLyAnZGlydHknIGZsYWcgd2F0Y2hlciBmb3IgY3VycmVudCBmaWVsZFxyXG5cdFx0dm1QYXJhbS5pc0RpcnR5ID0ga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHRoaXMuc2VsZWN0KSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMudmFsdWUoKSAhPT0gdGhpcy5kZWZhdWx0ICYmIHRoaXMudmFsdWUoKSAhPT0gJ25vbmUnO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiAhISh0aGlzLnZhbHVlKCkudG9TdHJpbmcoKSkudHJpbSgpLmxlbmd0aDtcclxuXHRcdH0sIHZtUGFyYW0pO1xyXG5cclxuXHRcdC8vIGFkZCBjYWxlbmRhciBidG4gZm9yIGN1cnJlbnQgZmllbGRcclxuXHRcdHZtUGFyYW0uaGFzQ2FsZW5kYXIgPSBpLnNlYXJjaCgvKGRhdGV8dGltZSkvZ21pKSAhPSAtMTtcclxuXHJcblx0XHQvLyBhZGQgcG9wLXVwIGJ0biBmb3IgY3VycmVudCBmaWVsZFxyXG5cdFx0dm1QYXJhbS5oYXNQb3BVcCA9IGkuc2VhcmNoKC8oYXR0cmFjdGlvbklkfHZlbnVlSWQpL2dtaSkgIT0gLTE7XHJcblxyXG5cdFx0YXJyLnB1c2godm1QYXJhbSk7XHJcblx0fVxyXG5cclxuXHQvLyBwcmVwYXJlIG91dHB1dCBmb3IgcmVxdWVzdFxyXG5cdHRoaXMucGFyYW1zTW9kZWwoYXJyKTtcclxuXHR0aGlzLnBhcmFtSW5Gb2N1cyh0aGlzLnBhcmFtc01vZGVsKClbMF0pO1xyXG5cdHRoaXMucHJlcGFyZVVybFBhaXJzKGFyciwgdGhpcy5wYXJhbXMpO1xyXG5cdHJldHVybiBhcnI7XHJcbn07XHJcblxyXG4vKipcclxuICogRGlydHkgcGFyYW1zIGZvcm0gb2JzZXJ2YWJsZSBtZXRob2RcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5QYXJhbXNWaWV3TW9kZWwucHJvdG90eXBlLmNoZWNrRGlydHkgPSBmdW5jdGlvbiAoKSB7XHJcblx0dGhpcy5wcmVwYXJlVXJsUGFpcnModGhpcy5wYXJhbXNNb2RlbCgpLCB0aGlzLnBhcmFtcyk7XHJcblx0dmFyIGRpcnR5ID0gdGhpcy5wYXJhbXNNb2RlbCgpLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG5cdFx0cmV0dXJuIGl0ZW0uaXNEaXJ0eSgpID09PSB0cnVlO1xyXG5cdH0pO1xyXG5cdHJldHVybiBkaXJ0eS5sZW5ndGggPiAwO1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBFbnRlciBrZXkgaGFuZGxlclxyXG4gKiBAcGFyYW0gbW9kZWxcclxuICogQHBhcmFtIGV2ZW50XHJcbiAqL1xyXG5QYXJhbXNWaWV3TW9kZWwucHJvdG90eXBlLm9uRW50ZXJLZXlEb3duID0gZnVuY3Rpb24gKG1vZGVsLCBldmVudCkge1xyXG4gIGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xyXG4gICAgJCgnI2FwaS1leHAtZ2V0LWJ0bicpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBTbGlkZSB0b2dnbGUgZm9yIHBhcmFtcyBjb250YWluZXIgbWV0aG9kXHJcbiAqIEBwYXJhbSB2aWV3TW9kZWxcclxuICogQHBhcmFtIGV2ZW50XHJcbiAqL1xyXG5QYXJhbXNWaWV3TW9kZWwucHJvdG90eXBlLnNsaWRlVG9nZ2xlID0gZnVuY3Rpb24gKHZpZXdNb2RlbCwgZXZlbnQpIHtcclxuICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpXHJcbiAgICAucGFyZW50cygnLmpzLXNsaWRlLWNvbnRyb2wnKVxyXG4gICAgLmZpbmQoJy5qcy1zbGlkZS13cmFwcGVyJylcclxuICAgIC5zbGlkZVRvZ2dsZSh2aWV3TW9kZWwuYW5pbWF0aW9uU3BlZWQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmlld01vZGVsLmlzSGlkZGVuKCF2aWV3TW9kZWwuaXNIaWRkZW4oKSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBNYWNoZXMgZm9jdXNlZCBwYXJhbVxyXG4gKiBAcGFyYW0gaXRlbVxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5vbkZvY3VzID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICBzZWxmLnBhcmFtSW5Gb2N1cyhpdGVtKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGaWx0ZXJzIHBhcmFtcyBieSBkZWZpbmVkIHZhbHVlXHJcbiAqIEBwYXJhbSBhcnJcclxuICogQHBhcmFtIGtvT2JzXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5wcmVwYXJlVXJsUGFpcnMgPSBmdW5jdGlvbiAoYXJyLCBrb09icykge1xyXG4gIGlmICghYXJyICYmICFrb09icykge3JldHVybiBmYWxzZTt9XHJcblxyXG4gIHJldHVybiBrb09icyhhcnIuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICByZXR1cm4gKGl0ZW0udmFsdWUoKSB8fCBpdGVtLmRlZmF1bHQpO1xyXG4gIH0pKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBPbiBzZWxlY3QgdmFsdWUgaGFuZGxlciBmb3IgcGFyYW1zIHNlbGVjdFxyXG4gKiBAcGFyYW0gcGFyYW0ge29iamVjdH0gcGFyYW1ldGVyIHZpZXctbW9kZWxcclxuICogQHBhcmFtIG9wdGlvbiB7b2JqZWN0fSBvcHRpb24gdmlldy1tb2RlbFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5vblNlbGVjdFBhcmFtVmFsdWUgPSBmdW5jdGlvbiAocGFyYW0sIG9wdGlvbikge1xyXG5cdGhmLmNoZWNrQWN0aXZlKHBhcmFtLm9wdGlvbnMsIG9wdGlvbi5uYW1lKTtcclxuXHRwYXJhbS52YWx1ZShvcHRpb24ubmFtZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUGFyYW1zIGNsZWFyIGJ1dHRvbiBoYW5kbGVyXHJcbiAqIEBwYXJhbSB2bSB7b2JqZWN0fSB2aWV3IG1vZGVsXHJcbiAqIEBwYXJhbSBlIHtvYmplY3R9IGV2ZW50XHJcbiAqL1xyXG5QYXJhbXNWaWV3TW9kZWwucHJvdG90eXBlLm9uUGFyYW1zQ2xlYXIgPSBmdW5jdGlvbiAodm0sIGUpIHtcclxuXHR0aGlzLnVwZGF0ZVZpZXdNb2RlbCgpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQYXJhbXNWaWV3TW9kZWw7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvVmlld01vZGVscy9wYXJhbXNWaWV3TW9kZWwuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGhmID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9oZWxwZXJGdW5jJyk7XHJcbnZhciBzZWxmO1xyXG52YXIgYmFzZTtcclxudmFyIGNhdGVnb3J5O1xyXG5cclxuLyoqXHJcbiAqIE1ldGhvZHMgVmlldy1Nb2RlbFxyXG4gKiBAcGFyYW0gcmF3XHJcbiAqIEBwYXJhbSBjYXRlZ29yeVxyXG4gKiBAcGFyYW0gbWV0aG9kXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gTWV0aG9kc1ZpZXdNb2RlbChyYXcsIGNhdGVnb3J5LCBtZXRob2QpIHtcclxuICBzZWxmID0gdGhpcztcclxuICBiYXNlID0gcmF3O1xyXG5cclxuICAvLyBvYnNlcnZhYmxlc1xyXG4gIHRoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcclxuICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcclxuICB0aGlzLnRvZ2dsZVBvcFVwID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcbiAgdGhpcy5yYWRpb3NNb2RlbCA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XHJcbiAgdGhpcy5tZXRob2RzVmlld01vZGVsID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcclxuICB0aGlzLnVwZGF0ZU1vZGVsKHRoaXMuY2F0ZWdvcnkoKSk7XHJcbiAgdGhpcy5jYXRlZ29yeS5zdWJzY3JpYmUodGhpcy51cGRhdGVNb2RlbCwgdGhpcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBPbiBjYXRlZ29yeSBjaGFuZ2UgaGFuZGxlclxyXG4gKiBNZXRob2RzIFZpZXctTW9kZWwgbWV0aG9kXHJcbiAqIEBwYXJhbSBjYXRlZ29yeVxyXG4gKi9cclxuTWV0aG9kc1ZpZXdNb2RlbC5wcm90b3R5cGUudXBkYXRlTW9kZWwgPSBmdW5jdGlvbiAoY2F0ZWdvcnkpIHtcclxuICAvLyBpbml0aWFsIHJhZGlvcyBtb2RlbFxyXG4gIHNlbGYudXBkYXRlUmFkaW9zTW9kZWwoYmFzZVtjYXRlZ29yeV0pO1xyXG4gIC8vIGluaXRpYWwgc2VsZWN0IG1vZGVsIChmaXJzdCBtZXRob2QgaW4gZmlyc3Qgc2VjdGlvbiBmb3Igc3RhcnQpXHJcbiAgc2VsZi51cGRhdGVTZWxlY3Qoc2VsZi5yYWRpb3NNb2RlbCgpWzBdKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBPbmNoYW5nZSBoYW5kbGVyIGZvciBSYWRpbyBidXR0b25zXHJcbiAqIEBwYXJhbSBpdGVtXHJcbiAqL1xyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS5vbmNoYW5nZVJhZGlvcyA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgLy91cGRhdGUgUmFkaW9zIE1vZGVsXHJcbiAgaGYuY2hlY2tBY3RpdmUoc2VsZi5yYWRpb3NNb2RlbCwgaXRlbS5uYW1lKTtcclxuICAvL3VwZGF0ZSBTZWxlY3QgTW9kZWxcclxuICBzZWxmLnVwZGF0ZVNlbGVjdChpdGVtKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsIGJ1aWxkIG9mIFJhZGlvcyBNb2RlbFxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKi9cclxuTWV0aG9kc1ZpZXdNb2RlbC5wcm90b3R5cGUudXBkYXRlUmFkaW9zTW9kZWwgPSBmdW5jdGlvbiAocGFyYW0pIHtcclxuICB2YXIgb2JqID0gcGFyYW0gfHwge30sXHJcbiAgICBhcnIgPSBbXTtcclxuXHJcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcclxuICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGkpKSB7IGNvbnRpbnVlOyB9XHJcbiAgICB2YXIgaXRlbSA9IHtcclxuICAgICAgY2hlY2tlZDoga28ub2JzZXJ2YWJsZShpID09PSAnQUxMJyksXHJcbiAgICAgIG5hbWU6IGlcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGkgPT09ICdBTEwnKSB7XHJcbiAgICAgIGFyci51bnNoaWZ0KGl0ZW0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhcnIucHVzaChpdGVtKTtcclxuICAgIH1cclxuICB9XHJcblx0YXJyID0gYXJyLnNvcnQoY29tcGFyZU1ldGhvZHMpO1xyXG4gIHRoaXMucmFkaW9zTW9kZWwoYXJyKTtcclxuICByZXR1cm4gYXJyO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWwgYnVpbGQgb2YgU2VsZWN0IE1vZGVsXHJcbiAqIEBwYXJhbSBpdGVtXHJcbiAqL1xyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS51cGRhdGVTZWxlY3QgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gIHZhciBvYmogPSBiYXNlW3NlbGYuY2F0ZWdvcnkoKV1baXRlbS5uYW1lXXx8IHt9LFxyXG4gICAgYXJyID0gW10sXHJcbiAgICBjb3VudCA9IDA7XHJcblxyXG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XHJcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShpKSkgeyBjb250aW51ZTsgfVxyXG4gICAgdmFyIHByb3BlcnR5ID0gb2JqW2ldO1xyXG5cdFx0Ly8gY29waWVzIGFsbCB2YWx1ZXMgZnJvbSBtb2RlbCB0byB2aWV3LW1vZGVsXHJcblx0XHR2YXIgdm1NZXRob2QgPSAkLmV4dGVuZCh7fSwgcHJvcGVydHkpO1xyXG5cclxuXHRcdGRlbGV0ZSB2bU1ldGhvZC5wYXJhbWV0ZXJzO1xyXG5cdFx0dm1NZXRob2QuY2hlY2tlZCA9IGtvLm9ic2VydmFibGUoIWNvdW50KTtcclxuXHJcblx0XHRhcnIucHVzaCh2bU1ldGhvZCk7XHJcblxyXG4gICAgLy8gc2V0IGdsb2JhbCBvYnNlcnZhYmxlXHJcbiAgICAhY291bnQgJiYgdGhpcy5tZXRob2QoYmFzZVtwcm9wZXJ0eS5jYXRlZ29yeV1bcHJvcGVydHkubWV0aG9kXVtwcm9wZXJ0eS5pZF0pO1xyXG5cclxuICAgIGNvdW50Kys7XHJcblxyXG4gIH1cclxuXHJcblx0dGhpcy5tZXRob2RzVmlld01vZGVsKGFycik7XHJcblx0cmV0dXJuIGFycjtcclxufTtcclxuXHJcbk1ldGhvZHNWaWV3TW9kZWwucHJvdG90eXBlLm9uU2VsZWN0TWV0aG9kID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICBoZi5jaGVja0FjdGl2ZShzZWxmLm1ldGhvZHNWaWV3TW9kZWwsIGl0ZW0ubmFtZSk7XHJcbiAgc2VsZi5tZXRob2QoYmFzZVtpdGVtLmNhdGVnb3J5XVtpdGVtLm1ldGhvZF1baXRlbS5pZF0pO1xyXG59O1xyXG5cclxuTWV0aG9kc1ZpZXdNb2RlbC5wcm90b3R5cGUub25BYm91dENsaWNrID0gZnVuY3Rpb24gKG1vZGVsLCBldmVudCkge1xyXG4gIG1vZGVsLnRvZ2dsZVBvcFVwKCFtb2RlbC50b2dnbGVQb3BVcCgpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTb3J0IGZ1bmN0aW9uIGZvciBtZXRob2RzIGFyYXlcclxuICogQHBhcmFtIGZcclxuICogQHBhcmFtIHNcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbmZ1bmN0aW9uIGNvbXBhcmVNZXRob2RzKGYscykge1xyXG5cdHZhciBhID0gZi5uYW1lLnRvVXBwZXJDYXNlKCk7XHJcblx0dmFyIGIgPSBzLm5hbWUudG9VcHBlckNhc2UoKTtcclxuXHJcblx0aWYgKGEgPT09IGIpIHtyZXR1cm4gMDt9XHJcblx0aWYgKGEgPT09ICdBTEwnIHx8XHJcblx0XHQoYSA9PT0gJ0dFVCcgJiYgKGIgPT09ICdQT1NUJyB8fCBiID09PSAnUFVUJyB8fCBiID09PSAnREVMRVRFJykpIHx8XHJcblx0XHQoYSA9PT0gJ1BPU1QnICYmIChiID09PSAnUFVUJyB8fCBiID09PSAnREVMRVRFJykpIHx8XHJcblx0XHQoYSA9PT0gJ1BVVCcgJiYgYiA9PT0gJ0RFTEVURScpKSB7XHJcblx0XHRyZXR1cm4gLTE7XHJcblx0fVxyXG5cdHJldHVybiAxO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1ldGhvZHNWaWV3TW9kZWw7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvVmlld01vZGVscy9tZXRob2RzVmlld01vZGVsLmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBqc29uSGlnaGxpZ2h0ID0gcmVxdWlyZSgnLi8uLi9tb2R1bGVzL2pzb24taGlnaGxpZ2h0Jyk7XHJcbnZhciBzbGlkZXIgPSByZXF1aXJlKCcuLi9tb2R1bGVzL3NsaWRlcicpO1xyXG52YXIgZmlsdGVyID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnLmpzb24nKTtcclxudmFyIHNlbGY7XHJcbnZhciBjb2xvcnMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvbG9yQ2xhc3NlcycpLmNvbG9ycztcclxuXHJcbmZ1bmN0aW9uIFJlcXVlc3RzTGlzdFZpZXdNb2RlbChyZXF1ZXN0cywgc2VsZWN0ZWRQYXJhbXMsIHNoYXJlUGF0aCkge1xyXG5cdHRoaXMudXJsID0gc2VsZWN0ZWRQYXJhbXM7XHJcblx0c2VsZiA9IHRoaXM7XHJcblx0dGhpcy5jb2xvcnMgPSBjb2xvcnM7XHJcblx0dGhpcy5zaGFyZVBhdGggPSBzaGFyZVBhdGg7XHJcblx0dGhpcy5yZXF1ZXN0cyA9IHJlcXVlc3RzO1xyXG5cdHRoaXMuaXNBY3RpdmVUYWIgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcclxuXHR0aGlzLnZpZXdNb2RlbCA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XHJcblx0dGhpcy5jbGVhckJ0bklzVmlzaWJsZSA9IGtvLmNvbXB1dGVkKHRoaXMuX2lzVmlzaWJsZSwgdGhpcyk7XHJcblx0dGhpcy5yZXF1ZXN0cy5zdWJzY3JpYmUodGhpcy51cGRhdGVNb2RlbCwgdGhpcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVcGRhdGUgVmlld21vZGVsIG9mIHJlcXVlc3QgbGlzdFxyXG4gKiBAcGFyYW0gYXJyXHJcbiAqL1xyXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLnVwZGF0ZU1vZGVsID0gZnVuY3Rpb24gKGFycikge1xyXG5cdHZhciBzZWxmID0gdGhpcztcclxuXHRcclxuXHR2YXIgbmV3TW9kZWwgPSBrby51bndyYXAodGhpcy5yZXF1ZXN0cylcclxuXHRcdC5tYXAoZnVuY3Rpb24gKG9iaikge1xyXG5cdFx0XHR2YXIgbmV3T2JqID0ge1xyXG5cdFx0XHRcdGNvbG9yOiBzZWxmLmNvbG9yc1tvYmouaW5kZXggJSBzZWxmLmNvbG9ycy5sZW5ndGhdLFxyXG5cdFx0XHRcdGFjdGl2ZToga28ub2JzZXJ2YWJsZShmYWxzZSksXHJcblx0XHRcdFx0Y29waWVkRm9yU2hhcmU6IGtvLm9ic2VydmFibGUoZmFsc2UpLFxyXG5cdFx0XHRcdGNvcGllZFVybDoga28ub2JzZXJ2YWJsZShmYWxzZSksXHJcblx0XHRcdFx0cmVzSFRNTDoga28ub2JzZXJ2YWJsZSgnJylcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8vIGVycm9yIHBvcG92ZXJcclxuXHRcdFx0aWYgKG9iai5lcnJvcikge1xyXG5cdFx0XHRcdHZhciBlcnJvck9iaiA9IG9iai5lcnJvcjtcclxuXHRcdFx0XHRuZXdPYmouZXJyb3IgPSBrby5vYnNlcnZhYmxlKFtcclxuXHRcdFx0XHRcdE9iamVjdC5nZXRQcm9wKGVycm9yT2JqLCAnLnJlc3BvbnNlSlNPTi5lcnJvcnNbMF0uc3RhdHVzJykgfHwgZXJyb3JPYmouc3RhdHVzICsgJycsXHJcblx0XHRcdFx0XHRPYmplY3QuZ2V0UHJvcChlcnJvck9iaiwgJy5yZXNwb25zZUpTT04uZXJyb3JzWzBdLnN0YXR1c1RleHQnKSB8fCAnJyxcclxuXHRcdFx0XHRcdE9iamVjdC5nZXRQcm9wKGVycm9yT2JqLCAnLnJlc3BvbnNlSlNPTi5lcnJvcnNbMF0uZGV0YWlsJykgfHwgJ3Vubm93bicsXHJcblx0XHRcdFx0XHRPYmplY3QuZ2V0UHJvcChlcnJvck9iaiwgJy5yZXNwb25zZUpTT04nKSB8fCB7fVxyXG5cdFx0XHRcdF0pXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiAkLmV4dGVuZCh7fSwgb2JqLCBuZXdPYmopO1xyXG5cdFx0fSk7XHJcblx0c2xpZGVyLnJlbW92ZShzZWxmLnZpZXdNb2RlbCgpLmxlbmd0aCk7XHJcblx0c2VsZi52aWV3TW9kZWwobmV3TW9kZWwpO1xyXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0c2xpZGVyLnNldChzZWxmLnZpZXdNb2RlbCgpLmxlbmd0aCk7XHJcblx0XHQkKCcjc2hvdy1kZXRhaWxzLTAnKS50cmlnZ2VyKCdjbGljaycpO1xyXG5cdH0sIDEwKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBnZXQgZGV0YWlsc1xyXG4gKiBAcGFyYW0gZGF0YVxyXG4gKi9cclxuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5nZXRNb3JlID0gZnVuY3Rpb24gKGlkLCBkYXRhKSB7XHJcblx0dmFyIHBhbmVsR3JvdXAgPSB0aGlzLnBhbmVsR3JvdXA7XHJcblx0dmFyIHBhbmVsID0gdGhpcztcclxuXHR2YXIgY3VycmVudFNsaWRlciA9ICQoJyNzbGlkZXItJyArIHBhbmVsR3JvdXAuc2VjdGlvbkluZGV4KTtcclxuXHR2YXIgY29tcG9uZW50ID0gJCgnPHNlY3Rpb24gZGF0YS1iaW5kPVwiY29tcG9uZW50OiB7bmFtZTogXFwncGFuZWwtZ3JvdXBcXCcsIHBhcmFtczogcGFyYW1zfVwiPjwvc2VjdGlvbj4nKTtcclxuXHR2YXIgY3Vyc2xpY2sgPSBjdXJyZW50U2xpZGVyLnNsaWNrKCdnZXRTbGljaycpO1xyXG5cdFxyXG5cdC8vIGV4dGVuZGluZyBhZGRpdGlvbmFsIGRhdGEgKGNvcHkpXHJcblx0dmFyIHBhcmFtcyA9ICQuZXh0ZW5kKHt9LCBwYW5lbEdyb3VwLCB7XHJcblx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0Z3JvdXBJbmRleDogcGFuZWxHcm91cC5ncm91cEluZGV4ICsgMSxcclxuXHRcdF9wcm9wVGl0bGU6IHR5cGVvZiBpZCA9PT0gJ3N0cmluZycgJiYgaWQsXHJcblx0XHRjb25maWc6IHBhbmVsLmNvbmZpZ1xyXG5cdH0pO1xyXG5cclxuXHQvLyBhcHBseSBjb21wb25lbnQgZGF0YSBiaW5kaW5nc1xyXG5cdGtvLmFwcGx5QmluZGluZ3Moe1xyXG5cdFx0cGFyYW1zOiBwYXJhbXNcclxuXHR9LCBjb21wb25lbnRbMF0pO1xyXG5cdFxyXG5cdC8vIGFkZCBzbGlkZSB3aXRoIHNlbGVjdGVkIGRhdGFcclxuXHRjdXJyZW50U2xpZGVyLnNsaWNrKCdzbGlja0FkZCcsIGNvbXBvbmVudCk7XHJcblx0XHJcblx0Ly8gcmVtb3ZlIG91dHN0YW5kaW5nIHNsaWRlc1xyXG5cdGZvciAodmFyIGkgPSBjdXJzbGljay5zbGlkZUNvdW50IC0gMjsgaSA+IHBhbmVsR3JvdXAuZ3JvdXBJbmRleDsgaS0tKSB7XHJcblx0XHRjdXJyZW50U2xpZGVyLnNsaWNrKCdzbGlja1JlbW92ZScsIGksIGZhbHNlKTtcclxuXHR9XHJcblx0Ly8gbW92ZSB0byBuZXh0IHNsaWRlXHJcblx0Y3VycmVudFNsaWRlci5zbGljaygnc2xpY2tOZXh0Jyk7XHJcbn07XHJcblxyXG4vKipcclxuICogVmlzaWJpbGl0eSBmbGFnIGZvciBDbGVhciBidG5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLl9pc1Zpc2libGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0cmV0dXJuIGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUodGhpcy5yZXF1ZXN0cykubGVuZ3RoID4gMDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDbGVhciByZXF1ZXN0c3RzIGxpc3QgaGFuZGxlclxyXG4gKiBAcGFyYW0gdm1cclxuICogQHBhcmFtIGV2ZW50XHJcbiAqL1xyXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLm9uQ2xlYXJSZXF1ZXN0cyA9IGZ1bmN0aW9uICh2bSwgZXZlbnQpIHtcclxuXHR0aGlzLnJlcXVlc3RzKFtdKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEZXRhaWxzIHRvZ2dsZSBoYW5kbGVyXHJcbiAqIEBwYXJhbSB2bVxyXG4gKiBAcGFyYW0gZXZlbnRcclxuICovXHJcblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUuZ2V0RGV0YWlscyA9IGZ1bmN0aW9uICh2bSwgZXZlbnQpIHtcclxuXHRpZiAoIXRoaXMucmVzSFRNTCgpLmxlbmd0aCkge1xyXG5cdFx0anNvbkhpZ2hsaWdodCh0aGlzLnJlc0hUTUwsIHRoaXMucmVzKTtcclxuXHR9XHJcblx0dGhpcy5hY3RpdmUoIXRoaXMuYWN0aXZlKCkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEpvaW4gc3RyaW5nIGZvciBpZCdzXHJcbiAqIEBwYXJhbSBzXHJcbiAqIEBwYXJhbSBpXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLmdldFN0ciA9IGZ1bmN0aW9uIChzLCBpKSB7XHJcblx0dmFyIHN0ciA9IHM7XHJcblx0dmFyIGkxID0gaSA/IGkoKSA6ICcnO1xyXG5cdHJldHVybiBbXHJcblx0XHRzdHIsXHJcblx0XHRpMVxyXG5cdF0uam9pbignLScpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCByYXcgcmVzcG9uc2UgZGF0YVxyXG4gKiBAcGFyYW0gbW9kZWwge29iamVjdH1cclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUuZ2V0UmF3RGF0YSA9IGZ1bmN0aW9uIChtb2RlbCkge1xyXG5cdHZhciBjb250ZW50ID0gT2JqZWN0LmdldFByb3AobW9kZWwsICcucmVzLnJlcycpIHx8IGtvLnVud3JhcChtb2RlbC5lcnJvcilbM10gfHwge307XHJcblx0dmFyIHJhd1dpbmRvdyA9IHdpbmRvdy5vcGVuKFwiZGF0YTp0ZXh0L2pzb24sXCIgKyBlbmNvZGVVUkkoSlNPTi5zdHJpbmdpZnkoY29udGVudCwgbnVsbCwgMikpLCAnX2JsYW5rJyk7XHJcblx0cmF3V2luZG93LmZvY3VzKCk7XHJcbn07XHJcblxyXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLmNvcHlVcmwgPSBmdW5jdGlvbiAobW9kZWwsIGV2ZW50KSB7XHJcblx0dmFyIGN1cnJlbnRGaWVsZCA9IHRoaXM7XHJcblx0dmFyIGVsZW1lbnQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG5cdHNlbGYuY2xpcGJvYXJkID0gbmV3IENsaXBib2FyZChlbGVtZW50KTtcclxuXHRzZWxmLmNsaXBib2FyZC5vbignc3VjY2VzcycsIGZ1bmN0aW9uIG9uU3VjY2Vzc0NvcHkoZSkge1xyXG5cdFx0Y29uc29sZS5pbmZvKCdBY3Rpb246JywgZS5hY3Rpb24pO1xyXG5cdFx0Y29uc29sZS5pbmZvKCdUZXh0OicsIGUudGV4dCk7XHJcblx0XHRjb25zb2xlLmluZm8oJ1RyaWdnZXI6JywgZS50cmlnZ2VyKTtcclxuXHRcdCQoZWxlbWVudCkuaGFzQ2xhc3MoJ2J0bi1zaGFyZScpID8gY3VycmVudEZpZWxkLmNvcGllZEZvclNoYXJlKHRydWUpIDogY3VycmVudEZpZWxkLmNvcGllZFVybCh0cnVlKTtcclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQkKGVsZW1lbnQpLmhhc0NsYXNzKCdidG4tc2hhcmUnKSA/IGN1cnJlbnRGaWVsZC5jb3BpZWRGb3JTaGFyZShmYWxzZSkgOiBjdXJyZW50RmllbGQuY29waWVkVXJsKGZhbHNlKTtcclxuXHRcdH0sIDUwMCk7XHJcblx0XHRlLmNsZWFyU2VsZWN0aW9uKCk7XHJcblx0fSlcclxuXHRcdC5vbignZXJyb3InLCBmdW5jdGlvbiBvbkVycm9yQ29weShlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ0FjdGlvbjonLCBlLmFjdGlvbik7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ1RyaWdnZXI6JywgZS50cmlnZ2VyKTtcclxuXHRcdH0pO1xyXG59O1xyXG5cclxuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5yZW1vdmVIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xyXG5cdHNlbGYuY2xpcGJvYXJkICYmIHNlbGYuY2xpcGJvYXJkLmRlc3Ryb3koKTtcclxuXHRkZWxldGUgc2VsZi5jbGlwYm9hcmQ7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlcXVlc3RzTGlzdFZpZXdNb2RlbDtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9WaWV3TW9kZWxzL3JlcXVlc3RzTGlzdFZpZXdNb2RlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgV29ya2VyID0gcmVxdWlyZSgnLi9oaWdobGlnaHRKc29uLndvcmtlci5qcycpOyAvLyBKc29uLWZvcm1hdHRlciB3b3JrZXJcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9ic2VydmFibGUsIGNvZGUpIHtcclxuXHR2YXIgYW5pbVRpbWUgPSAxMDA7XHJcblx0dmFyIHdvcmtlciA9IG5ldyBXb3JrZXI7XHJcblxyXG5cdHdvcmtlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdG9ic2VydmFibGUoZXZlbnQuZGF0YSk7XHJcblxyXG5cdFx0JChkb2N1bWVudClcclxuXHRcdFx0Lm9uKCdjbGljayB0b3VjaCcsICcudG0tY29kZS1jb250YWluZXIgLmV4cGFuZGVkJywgZnVuY3Rpb24ganNvbkNvZGVDb250YWluZXJFeHBhbmRlZChlKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0dmFyICRzZWxmID0gJCh0aGlzKTtcclxuXHRcdFx0XHQkc2VsZlxyXG5cdFx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0XHQuZmluZCgnPnVsJylcclxuXHRcdFx0XHRcdC5zbGlkZVVwKGFuaW1UaW1lLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0JHNlbGYuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdH0pXHJcblx0XHRcdC5vbignY2xpY2sgdG91Y2gnLCAnLnRtLWNvZGUtY29udGFpbmVyIC5leHBhbmRlZC5jb2xsYXBzZWQnLCBmdW5jdGlvbiBqc29uQ29kZUNvbnRhaW5lckNvbGxhcHNlZChlKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0dmFyICRzZWxmID0gJCh0aGlzKTtcclxuXHRcdFx0XHQkc2VsZlxyXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKVxyXG5cdFx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0XHQuZmluZCgnPnVsJylcclxuXHRcdFx0XHRcdC5zbGlkZURvd24oYW5pbVRpbWUsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHQkc2VsZlxyXG5cdFx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnY29sbGFwc2VkJylcclxuXHRcdFx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdH0pXHJcblx0fTtcclxuXHR3b3JrZXIub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0Y29uc29sZS5lcnJvcihldmVudCk7XHJcblx0fTtcclxuXHJcblx0d29ya2VyLnBvc3RNZXNzYWdlKGNvZGUpO1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvanNvbi1oaWdobGlnaHQuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHJlcXVpcmUoXCIhIUQ6XFxcXHNhbmRib3hcXFxcdGlja2V0bWFzdGVyLWFwaS1zdGFnaW5nLmdpdGh1Yi5pb1xcXFxub2RlX21vZHVsZXNcXFxcd29ya2VyLWxvYWRlclxcXFxjcmVhdGVJbmxpbmVXb3JrZXIuanNcIikoXCIvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXFxuLyoqKioqKi8gXFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxcbi8qKioqKiovIFxcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxcbi8qKioqKiovIFxcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdFxcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxcbi8qKioqKiovIFxcdFxcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxcbi8qKioqKiovIFxcdFxcdFxcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0XFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcXG4vKioqKioqLyBcXHRcXHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XFxuLyoqKioqKi8gXFx0XFx0XFx0ZXhwb3J0czoge30sXFxuLyoqKioqKi8gXFx0XFx0XFx0aWQ6IG1vZHVsZUlkLFxcbi8qKioqKiovIFxcdFxcdFxcdGxvYWRlZDogZmFsc2VcXG4vKioqKioqLyBcXHRcXHR9O1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0XFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXFxuLyoqKioqKi8gXFx0XFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHRcXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXFxuLyoqKioqKi8gXFx0XFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHRcXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxcbi8qKioqKiovIFxcdFxcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcXG4vKioqKioqLyBcXHR9XFxuLyoqKioqKi9cXG4vKioqKioqL1xcbi8qKioqKiovIFxcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXFxuLyoqKioqKi8gXFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXFxuLyoqKioqKi8gXFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXFxuLyoqKioqKi8gXFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXFxcIlxcXCI7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcXG4vKioqKioqLyBcXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcXG4vKioqKioqLyB9KVxcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXFxuLyoqKioqKi8gKFtcXG4vKiAwICovXFxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XFxuXFxuXFx0LyoqXFxyXFxuXFx0ICogQ29kZSBmb3JtYXQgd2ViLXdvcmtlclxcclxcblxcdCAqIEBwYXJhbSBldmVudFxcclxcblxcdCAqL1xcclxcblxcdC8vIHZhciBoaWdobGlnaHRKc29uKClcXHJcXG5cXHR2YXIgaGlnaGxpZ2h0SnNvbiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XFxyXFxuXFx0XFxyXFxuXFx0b25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcXHJcXG5cXHQgIHZhciBjb2RlID0gZXZlbnQuZGF0YTtcXHJcXG5cXHQgIC8vIGltcG9ydFNjcmlwdHMoJ2pzb24tcGFyc2UuanMnKTtcXHJcXG5cXHQgIHZhciByZXN1bHQgPSBoaWdobGlnaHRKc29uKGNvZGUsIHtleHBhbmRlZDogdHJ1ZX0pO1xcclxcblxcdCAgLy8gdmFyIHJlc3VsdCA9SlNPTi5zdHJpbmdpZnkoY29kZSk7XFxyXFxuXFx0ICBwb3N0TWVzc2FnZShyZXN1bHQpO1xcclxcblxcdH07XFxyXFxuXFxuXFxuLyoqKi8gfSxcXG4vKiAxICovXFxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XFxuXFxuXFx0dmFyIHByZWZpeCA9ICd0bS1jb2RlJztcXHJcXG5cXHRcXHJcXG5cXHR2YXIgZ2V0RXhwYW5kZXJDbGFzc2VzID0gZnVuY3Rpb24gKGV4cGFuZGVkKSB7XFxyXFxuXFx0XFx0aWYgKCFleHBhbmRlZCkge1xcclxcblxcdFxcdFxcdHJldHVybiAnZXhwYW5kZWQgY29sbGFwc2VkIGhpZGRlbic7XFxyXFxuXFx0XFx0fVxcclxcblxcdFxcdHJldHVybiAnZXhwYW5kZWQnO1xcclxcblxcdH07XFxyXFxuXFx0XFxyXFxuXFx0dmFyIGVuY29kZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xcclxcblxcdFxcdHJldHVybiBbJzxzcGFuPicsIHZhbHVlLCAnPC9zcGFuPiddLmpvaW4oJycpO1xcclxcblxcdH07XFxyXFxuXFx0XFxyXFxuXFx0dmFyIGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgdHlwZSwgZXhwYW5kZXJDbGFzc2VzKSB7XFxyXFxuXFx0XFx0dmFyIGtsYXNzID0gJ29iamVjdCcsXFxyXFxuXFx0XFx0XFx0b3BlbiA9ICd7JyxcXHJcXG5cXHRcXHRcXHRjbG9zZSA9ICd9JztcXHJcXG5cXHRcXHJcXG5cXHRcXHRpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcXHJcXG5cXHRcXHRcXHRrbGFzcyA9ICdhcnJheSc7XFxyXFxuXFx0XFx0XFx0b3BlbiA9ICdbJztcXHJcXG5cXHRcXHRcXHRjbG9zZSA9ICddJztcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFxyXFxuXFx0XFx0aWYgKHZhbHVlID09PSBudWxsKSB7XFxyXFxuXFx0XFx0XFx0cmV0dXJuIFtcXHJcXG5cXHRcXHRcXHRcXHQnPGxpPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJrZXlcXFwiPlxcXCInLCBlbmNvZGUoa2V5KSwgJ1xcXCI6IDwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwibnVsbFxcXCI+XFxcIicsIGVuY29kZSh2YWx1ZSksICdcXFwiPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0JzwvbGk+J1xcclxcblxcdFxcdFxcdF0uam9pbignJyk7XFxyXFxuXFx0XFx0fVxcclxcblxcdFxcclxcblxcdFxcdGlmICh0eXBlID09ICdvYmplY3QnKSB7XFxyXFxuXFx0XFx0XFx0cmV0dXJuIFtcXHJcXG5cXHRcXHRcXHRcXHQnPGxpPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCInLCBleHBhbmRlckNsYXNzZXMsICdcXFwiPjwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwia2V5XFxcIj5cXFwiJywgZW5jb2RlKGtleSksICdcXFwiOiA8L3NwYW4+ICcsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJvcGVuXFxcIj4nLCBvcGVuLCAnPC9zcGFuPiAnLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8dWwgY2xhc3M9XFxcIicsIGtsYXNzLCAnXFxcIj4nLFxcclxcblxcdFxcdFxcdFxcdFxcdFxcdGpzb24yaHRtbCh2YWx1ZSwgZXhwYW5kZXJDbGFzc2VzKSxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPC91bD4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwiY2xvc2VcXFwiPicsIGNsb3NlLCAnPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0JzwvbGk+J1xcclxcblxcdFxcdFxcdF0uam9pbignJyk7XFxyXFxuXFx0XFx0fVxcclxcblxcdFxcclxcblxcdFxcdGlmICh0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKSB7XFxyXFxuXFx0XFx0XFx0cmV0dXJuIFtcXHJcXG5cXHRcXHRcXHRcXHQnPGxpPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJrZXlcXFwiPlxcXCInLCBlbmNvZGUoa2V5KSwgJ1xcXCI6IDwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwiJywgdHlwZSwgJ1xcXCI+JywgZW5jb2RlKHZhbHVlKSwgJzwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdCc8L2xpPidcXHJcXG5cXHRcXHRcXHRdLmpvaW4oJycpO1xcclxcblxcdFxcdH1cXHJcXG5cXHRcXHRyZXR1cm4gW1xcclxcblxcdFxcdFxcdCc8bGk+JyxcXHJcXG5cXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcImtleVxcXCI+XFxcIicsIGVuY29kZShrZXkpLCAnXFxcIjogPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCInLCB0eXBlLCAnXFxcIj5cXFwiJywgZW5jb2RlKHZhbHVlKSwgJ1xcXCI8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHQnPC9saT4nXFxyXFxuXFx0XFx0XS5qb2luKCcnKTtcXHJcXG5cXHR9O1xcclxcblxcdFxcclxcblxcdHZhciBqc29uMmh0bWwgPSBmdW5jdGlvbiAoanNvbiwgZXhwYW5kZXJDbGFzc2VzKSB7XFxyXFxuXFx0XFx0dmFyIGh0bWwgPSAnJztcXHJcXG5cXHRcXHRmb3IgKHZhciBrZXkgaW4ganNvbikge1xcclxcblxcdFxcdFxcdGlmICghanNvbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XFxyXFxuXFx0XFx0XFx0XFx0Y29udGludWU7XFxyXFxuXFx0XFx0XFx0fVxcclxcblxcdFxcclxcblxcdFxcdFxcdGh0bWwgPSBbaHRtbCwgY3JlYXRlRWxlbWVudChrZXksIGpzb25ba2V5XSwgdHlwZW9mIGpzb25ba2V5XSwgZXhwYW5kZXJDbGFzc2VzKV0uam9pbignJyk7XFxyXFxuXFx0XFx0fVxcclxcblxcdFxcdHJldHVybiBodG1sO1xcclxcblxcdH07XFxyXFxuXFx0XFxyXFxuXFx0dmFyIGdldEpzb25WaWV3ZXIgPSBmdW5jdGlvbiAoZGF0YSwgb3B0aW9ucykge1xcclxcblxcdFxcdHRyeSB7XFxyXFxuXFx0XFx0XFx0cmV0dXJuIFtcXHJcXG5cXHRcXHRcXHRcXHQnPHVsIGNsYXNzPVxcXCInLCBwcmVmaXgsICctY29udGFpbmVyXFxcIj4nLFxcclxcblxcdFxcdFxcdFxcdFxcdGpzb24yaHRtbChbSlNPTi5wYXJzZShkYXRhKV0sIGdldEV4cGFuZGVyQ2xhc3NlcyhvcHRpb25zLmV4cGFuZGVkKSksXFxyXFxuXFx0XFx0XFx0XFx0JzwvdWw+J1xcclxcblxcdFxcdFxcdF0uam9pbignJyk7XFxyXFxuXFx0XFx0fSBjYXRjaCAoZSkge1xcclxcblxcdFxcdFxcdHJldHVybiBbXFxyXFxuXFx0XFx0XFx0XFx0JzxkaXYgY2xhc3M9XFxcIicsIHByZWZpeCwgJy1lcnJvclxcXCIgPicsIGUudG9TdHJpbmcoKSwgJyA8L2Rpdj4nXFxyXFxuXFx0XFx0XFx0XS5qb2luKCcnKTtcXHJcXG5cXHRcXHR9XFxyXFxuXFx0fTtcXHJcXG5cXHRcXHJcXG5cXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRhdGEsIG9wdCkge1xcclxcblxcdFxcdHZhciBqc29uID0gJyc7XFxyXFxuXFx0XFx0dmFyIG9wdGlvbnMgPSBvcHQgfHwge2V4cGFuZGVkOiB0cnVlfTtcXHJcXG5cXHRcXHRpZiAodHlwZW9mIGRhdGEgPT0gJ3N0cmluZycpIHtcXHJcXG5cXHRcXHRcXHRqc29uID0gZGF0YTtcXHJcXG5cXHRcXHR9IGVsc2UgaWYgKHR5cGVvZiBkYXRhID09ICdvYmplY3QnKSB7XFxyXFxuXFx0XFx0XFx0anNvbiA9IEpTT04uc3RyaW5naWZ5KGRhdGEpXFxyXFxuXFx0XFx0fVxcclxcblxcdFxcdHJldHVybiBnZXRKc29uVmlld2VyKGpzb24sIG9wdGlvbnMpO1xcclxcblxcdH07XFxyXFxuXFxuXFxuLyoqKi8gfVxcbi8qKioqKiovIF0pO1xcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluZGxZbkJoWTJzNkx5OHZkMlZpY0dGamF5OWliMjkwYzNSeVlYQWdORGN4WWpFd1pEUTBZMkUzTWpnd1pURXhOR0VpTENKM1pXSndZV05yT2k4dkx5NHZjMk55YVhCMGN5OWhjR2t0Wlhod2JHOXlaWEl2ZGpJdmMzSmpMMjF2WkhWc1pYTXZhR2xuYUd4cFoyaDBTbk52Ymk1M2IzSnJaWEl1YW5NaUxDSjNaV0p3WVdOck9pOHZMeTR2YzJOeWFYQjBjeTloY0drdFpYaHdiRzl5WlhJdmRqSXZjM0pqTDIxdlpIVnNaWE12YW5OdmJpMXdZWEp6WlM1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFc2RVSkJRV1U3UVVGRFpqdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3TzBGQlIwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3T3pzN096dEJRM1JEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc2NVTkJRVzlETEdWQlFXVTdRVUZEYmtRN1FVRkRRVHRCUVVOQk96czdPenM3TzBGRFlrRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNXVUZCVnp0QlFVTllMR0ZCUVZrN08wRkJSVm83UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGRk8wRkJRMFk3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEVzZDBKQlFYVkNPMEZCUTNaQ08wRkJRMEU3UVVGRFFTeEhRVUZGTzBGQlEwWTdRVUZEUVR0QlFVTkJPMEZCUTBFaUxDSm1hV3hsSWpvaWFHbG5hR3hwWjJoMFNuTnZiaTUzYjNKclpYSXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJZ1hIUXZMeUJVYUdVZ2JXOWtkV3hsSUdOaFkyaGxYRzRnWEhSMllYSWdhVzV6ZEdGc2JHVmtUVzlrZFd4bGN5QTlJSHQ5TzF4dVhHNGdYSFF2THlCVWFHVWdjbVZ4ZFdseVpTQm1kVzVqZEdsdmJseHVJRngwWm5WdVkzUnBiMjRnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlodGIyUjFiR1ZKWkNrZ2UxeHVYRzRnWEhSY2RDOHZJRU5vWldOcklHbG1JRzF2WkhWc1pTQnBjeUJwYmlCallXTm9aVnh1SUZ4MFhIUnBaaWhwYm5OMFlXeHNaV1JOYjJSMWJHVnpXMjF2WkhWc1pVbGtYU2xjYmlCY2RGeDBYSFJ5WlhSMWNtNGdhVzV6ZEdGc2JHVmtUVzlrZFd4bGMxdHRiMlIxYkdWSlpGMHVaWGh3YjNKMGN6dGNibHh1SUZ4MFhIUXZMeUJEY21WaGRHVWdZU0J1WlhjZ2JXOWtkV3hsSUNoaGJtUWdjSFYwSUdsMElHbHVkRzhnZEdobElHTmhZMmhsS1Z4dUlGeDBYSFIyWVhJZ2JXOWtkV3hsSUQwZ2FXNXpkR0ZzYkdWa1RXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwZ1BTQjdYRzRnWEhSY2RGeDBaWGh3YjNKMGN6b2dlMzBzWEc0Z1hIUmNkRngwYVdRNklHMXZaSFZzWlVsa0xGeHVJRngwWEhSY2RHeHZZV1JsWkRvZ1ptRnNjMlZjYmlCY2RGeDBmVHRjYmx4dUlGeDBYSFF2THlCRmVHVmpkWFJsSUhSb1pTQnRiMlIxYkdVZ1puVnVZM1JwYjI1Y2JpQmNkRngwYlc5a2RXeGxjMXR0YjJSMWJHVkpaRjB1WTJGc2JDaHRiMlIxYkdVdVpYaHdiM0owY3l3Z2JXOWtkV3hsTENCdGIyUjFiR1V1Wlhod2IzSjBjeXdnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlrN1hHNWNiaUJjZEZ4MEx5OGdSbXhoWnlCMGFHVWdiVzlrZFd4bElHRnpJR3h2WVdSbFpGeHVJRngwWEhSdGIyUjFiR1V1Ykc5aFpHVmtJRDBnZEhKMVpUdGNibHh1SUZ4MFhIUXZMeUJTWlhSMWNtNGdkR2hsSUdWNGNHOXlkSE1nYjJZZ2RHaGxJRzF2WkhWc1pWeHVJRngwWEhSeVpYUjFjbTRnYlc5a2RXeGxMbVY0Y0c5eWRITTdYRzRnWEhSOVhHNWNibHh1SUZ4MEx5OGdaWGh3YjNObElIUm9aU0J0YjJSMWJHVnpJRzlpYW1WamRDQW9YMTkzWldKd1lXTnJYMjF2WkhWc1pYTmZYeWxjYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHViU0E5SUcxdlpIVnNaWE03WEc1Y2JpQmNkQzh2SUdWNGNHOXpaU0IwYUdVZ2JXOWtkV3hsSUdOaFkyaGxYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtTWdQU0JwYm5OMFlXeHNaV1JOYjJSMWJHVnpPMXh1WEc0Z1hIUXZMeUJmWDNkbFluQmhZMnRmY0hWaWJHbGpYM0JoZEdoZlgxeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1d0lEMGdYQ0pjSWp0Y2JseHVJRngwTHk4Z1RHOWhaQ0JsYm5SeWVTQnRiMlIxYkdVZ1lXNWtJSEpsZEhWeWJpQmxlSEJ2Y25SelhHNGdYSFJ5WlhSMWNtNGdYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWd3S1R0Y2JseHVYRzVjYmk4cUtpQlhSVUpRUVVOTElFWlBUMVJGVWlBcUtseHVJQ29xSUhkbFluQmhZMnN2WW05dmRITjBjbUZ3SURRM01XSXhNR1EwTkdOaE56STRNR1V4TVRSaFhHNGdLaW92SWl3aUx5b3FYSEpjYmlBcUlFTnZaR1VnWm05eWJXRjBJSGRsWWkxM2IzSnJaWEpjY2x4dUlDb2dRSEJoY21GdElHVjJaVzUwWEhKY2JpQXFMMXh5WEc0dkx5QjJZWElnYUdsbmFHeHBaMmgwU25OdmJpZ3BYSEpjYm5aaGNpQm9hV2RvYkdsbmFIUktjMjl1SUQwZ2NtVnhkV2x5WlNnbkxpOXFjMjl1TFhCaGNuTmxKeWs3WEhKY2JseHlYRzV2Ym0xbGMzTmhaMlVnUFNCbWRXNWpkR2x2YmlobGRtVnVkQ2tnZTF4eVhHNGdJSFpoY2lCamIyUmxJRDBnWlhabGJuUXVaR0YwWVR0Y2NseHVJQ0F2THlCcGJYQnZjblJUWTNKcGNIUnpLQ2RxYzI5dUxYQmhjbk5sTG1wekp5azdYSEpjYmlBZ2RtRnlJSEpsYzNWc2RDQTlJR2hwWjJoc2FXZG9kRXB6YjI0b1kyOWtaU3dnZTJWNGNHRnVaR1ZrT2lCMGNuVmxmU2s3WEhKY2JpQWdMeThnZG1GeUlISmxjM1ZzZENBOVNsTlBUaTV6ZEhKcGJtZHBabmtvWTI5a1pTazdYSEpjYmlBZ2NHOXpkRTFsYzNOaFoyVW9jbVZ6ZFd4MEtUdGNjbHh1ZlR0Y2NseHVYRzVjYmx4dUx5b3FLaW9xS2lvcUtpb3FLaW9xS2lvcVhHNGdLaW9nVjBWQ1VFRkRTeUJHVDA5VVJWSmNiaUFxS2lBdUwzTmpjbWx3ZEhNdllYQnBMV1Y0Y0d4dmNtVnlMM1l5TDNOeVl5OXRiMlIxYkdWekwyaHBaMmhzYVdkb2RFcHpiMjR1ZDI5eWEyVnlMbXB6WEc0Z0tpb2diVzlrZFd4bElHbGtJRDBnTUZ4dUlDb3FJRzF2WkhWc1pTQmphSFZ1YTNNZ1BTQXdYRzRnS2lvdklpd2lkbUZ5SUhCeVpXWnBlQ0E5SUNkMGJTMWpiMlJsSnp0Y2NseHVYSEpjYm5aaGNpQm5aWFJGZUhCaGJtUmxja05zWVhOelpYTWdQU0JtZFc1amRHbHZiaUFvWlhod1lXNWtaV1FwSUh0Y2NseHVYSFJwWmlBb0lXVjRjR0Z1WkdWa0tTQjdYSEpjYmx4MFhIUnlaWFIxY200Z0oyVjRjR0Z1WkdWa0lHTnZiR3hoY0hObFpDQm9hV1JrWlc0bk8xeHlYRzVjZEgxY2NseHVYSFJ5WlhSMWNtNGdKMlY0Y0dGdVpHVmtKenRjY2x4dWZUdGNjbHh1WEhKY2JuWmhjaUJsYm1OdlpHVWdQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXBJSHRjY2x4dVhIUnlaWFIxY200Z1d5YzhjM0JoYmo0bkxDQjJZV3gxWlN3Z0p6d3ZjM0JoYmo0blhTNXFiMmx1S0NjbktUdGNjbHh1ZlR0Y2NseHVYSEpjYm5aaGNpQmpjbVZoZEdWRmJHVnRaVzUwSUQwZ1puVnVZM1JwYjI0Z0tHdGxlU3dnZG1Gc2RXVXNJSFI1Y0dVc0lHVjRjR0Z1WkdWeVEyeGhjM05sY3lrZ2UxeHlYRzVjZEhaaGNpQnJiR0Z6Y3lBOUlDZHZZbXBsWTNRbkxGeHlYRzVjZEZ4MGIzQmxiaUE5SUNkN0p5eGNjbHh1WEhSY2RHTnNiM05sSUQwZ0ozMG5PMXh5WEc1Y2NseHVYSFJwWmlBb1FYSnlZWGt1YVhOQmNuSmhlU2gyWVd4MVpTa3BJSHRjY2x4dVhIUmNkR3RzWVhOeklEMGdKMkZ5Y21GNUp6dGNjbHh1WEhSY2RHOXdaVzRnUFNBbld5YzdYSEpjYmx4MFhIUmpiRzl6WlNBOUlDZGRKenRjY2x4dVhIUjlYSEpjYmx4eVhHNWNkR2xtSUNoMllXeDFaU0E5UFQwZ2JuVnNiQ2tnZTF4eVhHNWNkRngwY21WMGRYSnVJRnRjY2x4dVhIUmNkRngwSnp4c2FUNG5MRnh5WEc1Y2RGeDBYSFJjZENjOGMzQmhiaUJqYkdGemN6MWNJbXRsZVZ3aVBsd2lKeXdnWlc1amIyUmxLR3RsZVNrc0lDZGNJam9nUEM5emNHRnVQaWNzWEhKY2JseDBYSFJjZEZ4MEp6eHpjR0Z1SUdOc1lYTnpQVndpYm5Wc2JGd2lQbHdpSnl3Z1pXNWpiMlJsS0haaGJIVmxLU3dnSjF3aVBDOXpjR0Z1UGljc1hISmNibHgwWEhSY2RDYzhMMnhwUGlkY2NseHVYSFJjZEYwdWFtOXBiaWduSnlrN1hISmNibHgwZlZ4eVhHNWNjbHh1WEhScFppQW9kSGx3WlNBOVBTQW5iMkpxWldOMEp5a2dlMXh5WEc1Y2RGeDBjbVYwZFhKdUlGdGNjbHh1WEhSY2RGeDBKenhzYVQ0bkxGeHlYRzVjZEZ4MFhIUmNkQ2M4YzNCaGJpQmpiR0Z6Y3oxY0lpY3NJR1Y0Y0dGdVpHVnlRMnhoYzNObGN5d2dKMXdpUGp3dmMzQmhiajRuTEZ4eVhHNWNkRngwWEhSY2RDYzhjM0JoYmlCamJHRnpjejFjSW10bGVWd2lQbHdpSnl3Z1pXNWpiMlJsS0d0bGVTa3NJQ2RjSWpvZ1BDOXpjR0Z1UGlBbkxGeHlYRzVjZEZ4MFhIUmNkQ2M4YzNCaGJpQmpiR0Z6Y3oxY0ltOXdaVzVjSWo0bkxDQnZjR1Z1TENBblBDOXpjR0Z1UGlBbkxGeHlYRzVjZEZ4MFhIUmNkQ2M4ZFd3Z1kyeGhjM005WENJbkxDQnJiR0Z6Y3l3Z0oxd2lQaWNzWEhKY2JseDBYSFJjZEZ4MFhIUnFjMjl1TW1oMGJXd29kbUZzZFdVc0lHVjRjR0Z1WkdWeVEyeGhjM05sY3lrc1hISmNibHgwWEhSY2RGeDBKend2ZFd3K0p5eGNjbHh1WEhSY2RGeDBYSFFuUEhOd1lXNGdZMnhoYzNNOVhDSmpiRzl6WlZ3aVBpY3NJR05zYjNObExDQW5QQzl6Y0dGdVBpY3NYSEpjYmx4MFhIUmNkQ2M4TDJ4cFBpZGNjbHh1WEhSY2RGMHVhbTlwYmlnbkp5azdYSEpjYmx4MGZWeHlYRzVjY2x4dVhIUnBaaUFvZEhsd1pTQTlQU0FuYm5WdFltVnlKeUI4ZkNCMGVYQmxJRDA5SUNkaWIyOXNaV0Z1SnlrZ2UxeHlYRzVjZEZ4MGNtVjBkWEp1SUZ0Y2NseHVYSFJjZEZ4MEp6eHNhVDRuTEZ4eVhHNWNkRngwWEhSY2RDYzhjM0JoYmlCamJHRnpjejFjSW10bGVWd2lQbHdpSnl3Z1pXNWpiMlJsS0d0bGVTa3NJQ2RjSWpvZ1BDOXpjR0Z1UGljc1hISmNibHgwWEhSY2RGeDBKenh6Y0dGdUlHTnNZWE56UFZ3aUp5d2dkSGx3WlN3Z0oxd2lQaWNzSUdWdVkyOWtaU2gyWVd4MVpTa3NJQ2M4TDNOd1lXNCtKeXhjY2x4dVhIUmNkRngwSnp3dmJHaytKMXh5WEc1Y2RGeDBYUzVxYjJsdUtDY25LVHRjY2x4dVhIUjlYSEpjYmx4MGNtVjBkWEp1SUZ0Y2NseHVYSFJjZENjOGJHaytKeXhjY2x4dVhIUmNkRngwSnp4emNHRnVJR05zWVhOelBWd2lhMlY1WENJK1hDSW5MQ0JsYm1OdlpHVW9hMlY1S1N3Z0oxd2lPaUE4TDNOd1lXNCtKeXhjY2x4dVhIUmNkRngwSnp4emNHRnVJR05zWVhOelBWd2lKeXdnZEhsd1pTd2dKMXdpUGx3aUp5d2daVzVqYjJSbEtIWmhiSFZsS1N3Z0oxd2lQQzl6Y0dGdVBpY3NYSEpjYmx4MFhIUW5QQzlzYVQ0blhISmNibHgwWFM1cWIybHVLQ2NuS1R0Y2NseHVmVHRjY2x4dVhISmNiblpoY2lCcWMyOXVNbWgwYld3Z1BTQm1kVzVqZEdsdmJpQW9hbk52Yml3Z1pYaHdZVzVrWlhKRGJHRnpjMlZ6S1NCN1hISmNibHgwZG1GeUlHaDBiV3dnUFNBbkp6dGNjbHh1WEhSbWIzSWdLSFpoY2lCclpYa2dhVzRnYW5OdmJpa2dlMXh5WEc1Y2RGeDBhV1lnS0NGcWMyOXVMbWhoYzA5M2JsQnliM0JsY25SNUtHdGxlU2twSUh0Y2NseHVYSFJjZEZ4MFkyOXVkR2x1ZFdVN1hISmNibHgwWEhSOVhISmNibHh5WEc1Y2RGeDBhSFJ0YkNBOUlGdG9kRzFzTENCamNtVmhkR1ZGYkdWdFpXNTBLR3RsZVN3Z2FuTnZibHRyWlhsZExDQjBlWEJsYjJZZ2FuTnZibHRyWlhsZExDQmxlSEJoYm1SbGNrTnNZWE56WlhNcFhTNXFiMmx1S0NjbktUdGNjbHh1WEhSOVhISmNibHgwY21WMGRYSnVJR2gwYld3N1hISmNibjA3WEhKY2JseHlYRzUyWVhJZ1oyVjBTbk52YmxacFpYZGxjaUE5SUdaMWJtTjBhVzl1SUNoa1lYUmhMQ0J2Y0hScGIyNXpLU0I3WEhKY2JseDBkSEo1SUh0Y2NseHVYSFJjZEhKbGRIVnliaUJiWEhKY2JseDBYSFJjZENjOGRXd2dZMnhoYzNNOVhDSW5MQ0J3Y21WbWFYZ3NJQ2N0WTI5dWRHRnBibVZ5WENJK0p5eGNjbHh1WEhSY2RGeDBYSFJxYzI5dU1taDBiV3dvVzBwVFQwNHVjR0Z5YzJVb1pHRjBZU2xkTENCblpYUkZlSEJoYm1SbGNrTnNZWE56WlhNb2IzQjBhVzl1Y3k1bGVIQmhibVJsWkNrcExGeHlYRzVjZEZ4MFhIUW5QQzkxYkQ0blhISmNibHgwWEhSZExtcHZhVzRvSnljcE8xeHlYRzVjZEgwZ1kyRjBZMmdnS0dVcElIdGNjbHh1WEhSY2RISmxkSFZ5YmlCYlhISmNibHgwWEhSY2RDYzhaR2wySUdOc1lYTnpQVndpSnl3Z2NISmxabWw0TENBbkxXVnljbTl5WENJZ1BpY3NJR1V1ZEc5VGRISnBibWNvS1N3Z0p5QThMMlJwZGo0blhISmNibHgwWEhSZExtcHZhVzRvSnljcE8xeHlYRzVjZEgxY2NseHVmVHRjY2x4dVhISmNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNG9aR0YwWVN3Z2IzQjBLU0I3WEhKY2JseDBkbUZ5SUdwemIyNGdQU0FuSnp0Y2NseHVYSFIyWVhJZ2IzQjBhVzl1Y3lBOUlHOXdkQ0I4ZkNCN1pYaHdZVzVrWldRNklIUnlkV1Y5TzF4eVhHNWNkR2xtSUNoMGVYQmxiMllnWkdGMFlTQTlQU0FuYzNSeWFXNW5KeWtnZTF4eVhHNWNkRngwYW5OdmJpQTlJR1JoZEdFN1hISmNibHgwZlNCbGJITmxJR2xtSUNoMGVYQmxiMllnWkdGMFlTQTlQU0FuYjJKcVpXTjBKeWtnZTF4eVhHNWNkRngwYW5OdmJpQTlJRXBUVDA0dWMzUnlhVzVuYVdaNUtHUmhkR0VwWEhKY2JseDBmVnh5WEc1Y2RISmxkSFZ5YmlCblpYUktjMjl1Vm1sbGQyVnlLR3B6YjI0c0lHOXdkR2x2Ym5NcE8xeHlYRzU5TzF4eVhHNWNibHh1WEc0dktpb3FLaW9xS2lvcUtpb3FLaW9xS2lwY2JpQXFLaUJYUlVKUVFVTkxJRVpQVDFSRlVseHVJQ29xSUM0dmMyTnlhWEIwY3k5aGNHa3RaWGh3Ykc5eVpYSXZkakl2YzNKakwyMXZaSFZzWlhNdmFuTnZiaTF3WVhKelpTNXFjMXh1SUNvcUlHMXZaSFZzWlNCcFpDQTlJREZjYmlBcUtpQnRiMlIxYkdVZ1kyaDFibXR6SUQwZ01GeHVJQ29xTHlKZExDSnpiM1Z5WTJWU2IyOTBJam9pSW4wPVwiLCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaGlnaGxpZ2h0SnNvbi53b3JrZXIuanNcIik7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9oaWdobGlnaHRKc29uLndvcmtlci5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwMzQzOTEzL2hvdy10by1jcmVhdGUtYS13ZWItd29ya2VyLWZyb20tYS1zdHJpbmdcclxuXHJcbnZhciBVUkwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkw7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29udGVudCwgdXJsKSB7XHJcblx0dHJ5IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdHZhciBibG9iO1xyXG5cdFx0XHR0cnkgeyAvLyBCbG9iQnVpbGRlciA9IERlcHJlY2F0ZWQsIGJ1dCB3aWRlbHkgaW1wbGVtZW50ZWRcclxuXHRcdFx0XHR2YXIgQmxvYkJ1aWxkZXIgPSB3aW5kb3cuQmxvYkJ1aWxkZXIgfHwgd2luZG93LldlYktpdEJsb2JCdWlsZGVyIHx8IHdpbmRvdy5Nb3pCbG9iQnVpbGRlciB8fCB3aW5kb3cuTVNCbG9iQnVpbGRlcjtcclxuXHRcdFx0XHRibG9iID0gbmV3IEJsb2JCdWlsZGVyKCk7XHJcblx0XHRcdFx0YmxvYi5hcHBlbmQoY29udGVudCk7XHJcblx0XHRcdFx0YmxvYiA9IGJsb2IuZ2V0QmxvYigpO1xyXG5cdFx0XHR9IGNhdGNoKGUpIHsgLy8gVGhlIHByb3Bvc2VkIEFQSVxyXG5cdFx0XHRcdGJsb2IgPSBuZXcgQmxvYihbY29udGVudF0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBuZXcgV29ya2VyKFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYikpO1xyXG5cdFx0fSBjYXRjaChlKSB7XHJcblx0XHRcdHJldHVybiBuZXcgV29ya2VyKCdkYXRhOmFwcGxpY2F0aW9uL2phdmFzY3JpcHQsJyArIGVuY29kZVVSSUNvbXBvbmVudChjb250ZW50KSk7XHJcblx0XHR9XHJcblx0fSBjYXRjaChlKSB7XHJcblx0XHRyZXR1cm4gbmV3IFdvcmtlcih1cmwpO1xyXG5cdH1cclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3dvcmtlci1sb2FkZXIvY3JlYXRlSW5saW5lV29ya2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImZ1bmN0aW9uIHNsaWNrKHRpbWVzKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblx0dmFyIHNlbGVjdG9yID0gJyNzbGlkZXItJztcclxuXHRcclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHRpbWVzOyBpKyspIHtcclxuXHRcdCQoc2VsZWN0b3IgKyBpKS5sZW5ndGggJiYgJChzZWxlY3RvciArIGkpLnNsaWNrKHtcclxuXHRcdFx0ZG90czogZmFsc2UsXHJcblx0XHRcdGluZmluaXRlOiBmYWxzZSxcclxuXHRcdFx0c3BlZWQ6IDMwMCxcclxuXHRcdFx0c2xpZGVzVG9TaG93OiAzLFxyXG5cdFx0XHRzbGlkZXNUb1Njcm9sbDogMSxcclxuXHRcdFx0dmFyaWFibGVXaWR0aDogdHJ1ZSxcclxuXHRcdFx0YXV0b3BsYXk6IGZhbHNlLFxyXG5cdFx0XHRyZXNwb25zaXZlOiBbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0YnJlYWtwb2ludDogMTIwMCxcclxuXHRcdFx0XHRcdHNldHRpbmdzOiB7XHJcblx0XHRcdFx0XHRcdHZhcmlhYmxlV2lkdGg6IHRydWUsXHJcblx0XHRcdFx0XHRcdHNsaWRlc1RvU2hvdzogMixcclxuXHRcdFx0XHRcdFx0c2xpZGVzVG9TY3JvbGw6IDEsXHJcblx0XHRcdFx0XHRcdGluZmluaXRlOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0ZG90czogZmFsc2VcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGJyZWFrcG9pbnQ6IDgwMCxcclxuXHRcdFx0XHRcdHNldHRpbmdzOiB7XHJcblx0XHRcdFx0XHRcdHZhcmlhYmxlV2lkdGg6IHRydWUsXHJcblx0XHRcdFx0XHRcdHNsaWRlc1RvU2hvdzogMSxcclxuXHRcdFx0XHRcdFx0c2xpZGVzVG9TY3JvbGw6IDFcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gdW5zbGljayh0aW1lcykge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHRpbWVzOyBpKyspIHtcclxuXHRcdHZhciBzZWxlY3RvciA9ICcjc2xpZGVyLScgKyBpO1xyXG5cdFx0JChzZWxlY3RvcikgJiYgJChzZWxlY3RvcikubGVuZ3RoICYmICQoc2VsZWN0b3IpLnNsaWNrKCd1bnNsaWNrJyk7XHJcblx0fVxyXG5cdGNvbnNvbGUuaW5mbygnY2xlYXJlZCcpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRzZXQ6IHNsaWNrLFxyXG5cdHJlbW92ZTogdW5zbGlja1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvc2xpZGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge1xuXHRcImRpc2NvdmVyeS52Mi5ldmVudHMuZ2V0XCI6IHtcblx0XHRcImV2ZW50c1wiOiB7XG5cdFx0XHRcIm9iamVjdFwiOiB7XG5cdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XCJ0aXRsZVwiOiBcIkV2ZW50XCIsXG5cdFx0XHRcdFx0XCJjb3B5QnRuXCI6IHtcblx0XHRcdFx0XHRcdFwibmFtZVwiOiB0cnVlXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcInJlcXVlc3RcIjogXCJodHRwOi8vd3d3Lmdvb2dsZS5jb21cIixcblx0XHRcdFx0XHRcImluZGV4XCI6IDBcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdFwiaW1hZ2VzXCI6IHtcblx0XHRcdFx0XCJvYmplY3RcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcInRpdGxlXCI6IFwiaW1hZ2VcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcImluZGV4XCI6IDEsXG5cdFx0XHRcdFx0XCJjb2xsYXBzZWRcIjogdHJ1ZVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJzYWxlc1wiOiB7XG5cdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XCJpbmRleFwiOiAyXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcInZlbnVlc1wiOiB7XG5cdFx0XHRcdFwib2JqZWN0XCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJ0aXRsZVwiOiBcInZlbnVlXCIsXG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDBcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiY2l0eVwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogMlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJzdGF0ZVwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogMVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJjb3VudHJ5XCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiAxXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImFkZHJlc3NcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDNcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwibG9jYXRpb25cIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XCJpbmRleFwiOiAzXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcImRhdGVzXCI6IHtcblx0XHRcdFx0XCJ0aW1lem9uZVwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogMFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJzdGFydFwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogMSxcblx0XHRcdFx0XHRcdFwiY29weUJ0blwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiZGF0ZVRpbWVcIjogdHJ1ZVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwiY29sbGFwc2VkXCI6IHRydWVcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwic3RhdHVzXCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiAzLFxuXHRcdFx0XHRcdFx0XCJjb2xsYXBzZWRcIjogdHJ1ZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJlbmRcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDIsXG5cdFx0XHRcdFx0XHRcImNvcHlCdG5cIjoge1xuXHRcdFx0XHRcdFx0XHRcImRhdGVUaW1lXCI6IHRydWVcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcImNvbGxhcHNlZFwiOiB0cnVlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFwiaW5kZXhcIjogNCxcblx0XHRcdFx0XHRcImFsbEluc2lkZVwiOiB0cnVlXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcImNvbGxhcHNlZFwiOiB0cnVlLFxuXHRcdFx0XHRcImluZGV4XCI6IDBcblx0XHRcdH1cblx0XHR9LFxuXHRcdFwicGFnZVwiOiB7XG5cdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcImluZGV4XCI6IDEsXG5cdFx0XHRcdFwiY29sbGFwc2VkXCI6IGZhbHNlXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XCJtZXRob2RcIjogXCJkaXNjb3ZlcnkudjIuZXZlbnRzLmdldFwiXG5cdFx0fVxuXHR9LFxuXHRcImRpc2NvdmVyeS52Mi5hdHRyYWN0aW9ucy5nZXRcIjoge1xuXHRcdFwiYXR0cmFjdGlvbnNcIjoge1xuXHRcdFx0XCJvYmplY3RcIjoge1xuXHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFwiaW5kZXhcIjogMFxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJpbWFnZXNcIjoge1xuXHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFwiaW5kZXhcIjogMlxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJjbGFzc2lmaWNhdGlvbnNcIjoge1xuXHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFwiaW5kZXhcIjogMVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XCJpbmRleFwiOiAwXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcInBhZ2VcIjoge1xuXHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XCJpbmRleFwiOiAxXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XCJtZXRob2RDb25maWdcIjogdHJ1ZVxuXHRcdH1cblx0fSxcblx0XCJfR0xPQkFMX0NPTkZJR1wiOiB7XG5cdFx0XCJjb3B5QnRuXCI6IHtcblx0XHRcdFwiaWRcIjogdHJ1ZVxuXHRcdH0sXG5cdFx0XCJkZXByZWNhdGVkXCI6IFtcblx0XHRcdFwiX2xpbmtzXCJcblx0XHRdLFxuXHRcdFwidW53cmFwcFwiOiBbXG5cdFx0XHRcIl9lbWJlZGRlZFwiXG5cdFx0XVxuXHR9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb25maWcuanNvblxuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgTlVNID0gMTI7XHJcbnZhciBQUkVGSVggPSAnY29sb3ItJztcclxuXHJcbnZhciBjb2xvcnMgPSBnZXRDb2xvcnMoTlVNLCBQUkVGSVgpO1xyXG5cclxuZnVuY3Rpb24gZ2V0Q29sb3JzKG51bSwgY2xhc3NQcmVmaXgpIHtcclxuXHR2YXIgY29sb3JzID0gbmV3IEFycmF5KG51bSk7XHJcblxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgY29sb3JzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRjb2xvcnNbaV0gPSBjbGFzc1ByZWZpeCArIChpICsgMSk7XHJcblx0fVxyXG5cdHJldHVybiBjb2xvcnM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFJhbmRvbUNvbG9yKGNvbG9yKSB7XHJcblx0dmFyIHJhbmRvbU51bWJlcjtcclxuXHRkbyB7XHJcblx0XHRyYW5kb21OdW1iZXIgPSBnZXRSYW5kb21JbnQoMSwgY29sb3JzLmxlbmd0aCk7XHJcblx0fSB3aGlsZSAoUFJFRklYICsgcmFuZG9tTnVtYmVyID09PSBjb2xvcik7XHJcblxyXG5cdHJldHVybiBQUkVGSVggKyByYW5kb21OdW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiBtaW4gKGluY2x1c2l2ZSkgYW5kIG1heCAoaW5jbHVzaXZlKVxyXG4gKiBVc2luZyBNYXRoLnJvdW5kKCkgd2lsbCBnaXZlIHlvdSBhIG5vbi11bmlmb3JtIGRpc3RyaWJ1dGlvbiFcclxuICovXHJcbmZ1bmN0aW9uIGdldFJhbmRvbUludChtaW4sIG1heCkge1xyXG5cdHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGNvbG9yczogY29sb3JzLFxyXG5cdGdldFJhbmRvbUNvbG9yOiBnZXRSYW5kb21Db2xvclxyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvY29sb3JDbGFzc2VzLmpzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcclxuXHRyZXF1aXJlKCcuL2N1c3RvbVNlbGVjdC5jb21wb25lbnQnKTtcclxuXHRyZXF1aXJlKCcuL3BvcHVwcy9lcnJvci5jb21wb25lbnQnKTtcclxuXHRyZXF1aXJlKCcuL3BhbmVscy9wYW5lbEdyb3VwLmNvbXBvbmVudCcpO1xyXG5cdHJlcXVpcmUoJy4vcGFuZWxzL3BhbmVsLmNvbXBvbmVudCcpO1xyXG5cdHJlcXVpcmUoJy4vcGFuZWxzL3BhZ2luYXRpb24uY29tcG9uZW50Jyk7XHJcblx0cmVxdWlyZSgnLi9wYW5lbHMvcGFuZWxIZWFkaW5nLmNvbXBvbmVudCcpO1xyXG5cdHJlcXVpcmUoJy4vcGFuZWxzL29iamVjdFBhbmVsQm9keS5jb21wb25lbnQnKTtcclxuXHRyZXF1aXJlKCcuL3BhbmVscy9hcnJheVBhbmVsQm9keS5jb21wb25lbnQnKTtcclxufSgpKTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxyXG4gKiBDdXN0b20gU2VsZWN0IGNvbXBvbmVudFxyXG4gKi9cclxudmFyIHNlbGY7XHJcblxyXG4vKipcclxuICogQ3VzdG9tIFNlbGVjdCBWaWV3LU1vZGVsXHJcbiAqIEBwYXJhbSBwYXJhbXNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBDdXN0b21TZWxlY3QocGFyYW1zKSB7XHJcbiAgc2VsZiA9IHRoaXM7XHJcblxyXG4gIHRoaXMuYW5pbWF0aW9uU3BlZWQgPSBwYXJhbXMuYW5pbWF0aW9uU3BlZWQgfHwgMjAwO1xyXG5cdHRoaXMuY3VyZW50U2VsZWN0RGF0YSA9IHBhcmFtcy5kYXRhIHx8IG51bGw7XHJcblx0dGhpcy5vbkZvY3VzID0gcGFyYW1zLmZvY3VzIHx8IG51bGw7XHJcblx0XHJcbiAgLy9vYnNlcnZhYmxlc1xyXG4gIHRoaXMuc2VsZWN0TW9kZWwgPSB0eXBlb2YgcGFyYW1zLm9wdGlvbnMgIT09J2Z1bmN0aW9uJyA/IGtvLm9ic2VydmFibGVBcnJheShwYXJhbXMub3B0aW9ucyk6ICBwYXJhbXMub3B0aW9ucztcclxuICB0aGlzLnBsYWNlaG9sZGVyID0ga28ub2JzZXJ2YWJsZShwYXJhbXMucGxhY2Vob2xkZXIgfHwgJycpO1xyXG4gIHRoaXMub25zZWxlY3QgPSBwYXJhbXMub25zZWxlY3QgfHwgZnVuY3Rpb24gKGl0ZW0pIHsgY29uc29sZS5sb2coaXRlbSArJ3NlbGVjdGVkIScpfTtcclxuICB0aGlzLnNlbGVjdGVkID0ga28ub2JzZXJ2YWJsZSh0aGlzLnNlbGVjdE1vZGVsKClbMF0pO1xyXG4gIHRoaXMuaXNPbmVPcHRpb24gPSBrby5wdXJlQ29tcHV0ZWQoZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0TW9kZWwoKS5sZW5ndGggPCAyOyAvLyBtb3JlIHRoYW4gb25lIG9wdGlvblxyXG4gIH0sIHRoaXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kRWxlbWVudChldmVudCkge1xyXG4gIHZhciBwYXJlbnQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnBhcmVudHMoJy5qcy1jdXN0b20tc2VsZWN0Jyk7XHJcbiAgcmV0dXJuIHtcclxuICAgIHdyYXBwZXI6IHBhcmVudC5maW5kKCcuanMtY3VzdG9tLXNlbGVjdC13cmFwcGVyJyksXHJcbiAgICBsYXllcjogcGFyZW50LmZpbmQoJy5qcy1jdXN0b20tc2VsZWN0LWxheWVyJylcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDdXN0b20gU2VsZWN0IFZpZXctTW9kZWwgbWV0aG9kXHJcbiAqIEBwYXJhbSB2aWV3TW9kZWxcclxuICogQHBhcmFtIGV2ZW50XHJcbiAqL1xyXG5DdXN0b21TZWxlY3QucHJvdG90eXBlLnNsaWRlVG9nZ2xlID0gZnVuY3Rpb24odmlld01vZGVsLCBldmVudCkge1xyXG5cdC8vIGVsZW0gaW4gZm9jdXMgZW11bGF0aW9uXHJcblx0dGhpcy5vbkZvY3VzICYmIHRoaXMub25Gb2N1cyh0aGlzLmN1cmVudFNlbGVjdERhdGEpO1xyXG5cclxuXHRpZiAodGhpcy5pc09uZU9wdGlvbigpKSB7cmV0dXJuIGZhbHNlO31cclxuICB2YXIgZWwgPSBmaW5kRWxlbWVudChldmVudCk7XHJcbiAgICBlbC53cmFwcGVyLnNsaWRlVG9nZ2xlKHZpZXdNb2RlbC5hbmltYXRpb25TcGVlZCk7XHJcbiAgICBlbC5sYXllci50b2dnbGVDbGFzcygnaGlkZGVuJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3VzdG9tIFNlbGVjdCBWaWV3LU1vZGVsIG1ldGhvZFxyXG4gKiBAcGFyYW0gaXRlbVxyXG4gKiBAcGFyYW0gZXZlbnRcclxuICovXHJcbkN1c3RvbVNlbGVjdC5wcm90b3R5cGUuc2VsZWN0SXRlbSA9IGZ1bmN0aW9uIChpdGVtLCBldmVudCkge1xyXG4gIHZhciBzZWxmID0gdGhpcztcclxuICB0aGlzLnNlbGVjdGVkKGl0ZW0pO1xyXG4gIC8vIHJ1biBoYW5kbGVyXHJcbiAgdGhpcy5vbnNlbGVjdChpdGVtKTtcclxuXHQvLyBzbGlkZSB1cFxyXG4gIHRoaXMuc2xpZGVUb2dnbGUoc2VsZiwgZXZlbnQpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjdXN0b20tc2VsZWN0Jywge1xyXG4gIHZpZXdNb2RlbDogQ3VzdG9tU2VsZWN0LFxyXG4gIHRlbXBsYXRlOiAoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3QganMtY3VzdG9tLXNlbGVjdFwiPicsXHJcbiAgICAgICc8ZGl2IGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0LXdyYXBwZXJcIj4nLFxyXG4gICAgICAgICc8c2VsZWN0IGRhdGEtYmluZD1cIm9wdGlvbnM6IHNlbGVjdE1vZGVsLCBvcHRpb25zVGV4dDogXFwnbmFtZVxcJywgdmFsdWU6IHNlbGVjdGVkXCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2ZpZWxkXCIgbmFtZT1cImFwaS1leHAtbWV0aG9kXCI+PC9zZWxlY3Q+JyxcclxuICAgICAgICAnPHNwYW4gY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX3BsYWNlaG9sZGVyXCI+JyxcclxuICAgICAgICAgICc8aW5wdXQgZGF0YS1iaW5kPVwiZXZlbnQ6IHtjbGljazogc2xpZGVUb2dnbGV9LCBhdHRyOiB7dmFsdWU6IHNlbGVjdGVkKCkubmFtZSwgZGlzYWJsZWQ6IGlzT25lT3B0aW9ufVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCJcIiByZWFkb25seT1cIlwiPicsXHJcbiAgICAgICAgICAnPGIgZGF0YS1iaW5kPVwiY3NzOiB7aGlkZGVuOiBpc09uZU9wdGlvbn1cIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9fY2hldnJvblwiPiZuYnNwOzwvYj4nLFxyXG4gICAgICAgICc8L3NwYW4+JyxcclxuICAgICAgICAnPHVsIGRhdGEtYmluZD1cImZvcmVhY2g6IHNlbGVjdE1vZGVsXCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2xpc3QganMtY3VzdG9tLXNlbGVjdC13cmFwcGVyXCI+JyxcclxuICAgICAgICAgICc8bGkgZGF0YS1iaW5kPVwiY3NzOiB7XFwnYWN0aXZlXFwnOiBjaGVja2VkfVwiIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19pdGVtXCI+JyxcclxuICAgICAgICAgICAgJzxidXR0b24gZGF0YS1iaW5kPVwiZXZlbnQ6IHtjbGljazogJHBhcmVudC5zZWxlY3RJdGVtLmJpbmQoJHBhcmVudCl9LCB0ZXh0OiBuYW1lLCBjc3M6IHtcXCdhY3RpdmVcXCc6IGNoZWNrZWQoKX0sIGF0dHI6IHtcXCdkYXRhLXZhbHVlXFwnOiBuYW1lfVwiICBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9faXRlbS1sYWJlbFwiIGhyZWY9XCIjXCI+PC9idXR0b24+JyxcclxuICAgICAgICAgICAgLy8gJzxzcGFuIGRhdGEtYmluZD1cImlmOiBsaW5rXCI+JyxcclxuICAgICAgICAgICAgXHQnPGEgZGF0YS1iaW5kPVwiYXR0cjoge2hyZWY6IGxpbmt9LCBjc3M6IHtcXCdoaWRkZW5cXCc6ICFsaW5rfVwiIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19pdGVtLWxpbmtcIiB0YXJnZXQ9XCJfYmxhbmtcIj4mbmJzcDs8L2E+JyxcclxuICAgICAgICAgICAgLy8gJzwvc3Bhbj4nLFxyXG4gICAgICAgICAgJzwvbGk+JyxcclxuICAgICAgICAnPC91bD4nLFxyXG4gICAgICAnPC9kaXY+JyxcclxuICAgICAgJzxkaXYgZGF0YS1iaW5kPVwiY2xpY2s6IHNsaWRlVG9nZ2xlXCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3QtbGF5ZXIganMtY3VzdG9tLXNlbGVjdC1sYXllciBoaWRkZW5cIj48L2Rpdj4nLFxyXG4gICAgJzwvZGl2PidcclxuICBdKS5qb2luKCcnKVxyXG59KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL2N1c3RvbVNlbGVjdC5jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHNlbGY7XHJcblxyXG5mdW5jdGlvbiBFcnJvclBvcFVwKHBhcmFtcykge1xyXG5cdHNlbGYgPSB0aGlzO1xyXG5cdHRoaXMuc3RhdHVzID0ga28ub2JzZXJ2YWJsZSgnJyk7XHJcblx0dGhpcy5zdGF0dXNUZXh0ID0ga28ub2JzZXJ2YWJsZSgnJyk7XHJcblx0dGhpcy5kZXRhaWxzID0ga28ub2JzZXJ2YWJsZShgYCk7XHJcblx0cGFyYW1zLm9uRXJyb3Iuc3Vic2NyaWJlKGZ1bmN0aW9uKGVycm9yT2JqKSB7XHJcblx0XHR0aGlzLnN0YXR1cyhPYmplY3QuZ2V0UHJvcChlcnJvck9iaiwgJy5yZXNwb25zZUpTT04uZXJyb3JzWzBdLnN0YXR1cycpIHx8IGVycm9yT2JqLnN0YXR1cyB8fCAndW5ub3duJyk7XHJcblx0XHR0aGlzLnN0YXR1c1RleHQoT2JqZWN0LmdldFByb3AoZXJyb3JPYmosICcucmVzcG9uc2VKU09OLmVycm9yc1swXS5zdGF0dXNUZXh0JykgfHwgZXJyb3JPYmouc3RhdHVzVGV4dCB8fCAnJyk7XHJcblx0XHR0aGlzLmRldGFpbHMoT2JqZWN0LmdldFByb3AoZXJyb3JPYmosICcucmVzcG9uc2VKU09OLmVycm9yc1swXS5kZXRhaWwnKSB8fCAndW5ub3duJyk7XHJcblx0XHR0aGlzLnRvZ2dsZVBvcFVwKCk7XHJcblx0fSwgdGhpcywgJ2Vycm9yJyk7XHJcbn1cclxuXHJcbkVycm9yUG9wVXAucHJvdG90eXBlLnRvZ2dsZVBvcFVwID0gZnVuY3Rpb24gKCkge1xyXG5cdCQoJyNlcnJvci1tb2RhbCcpLm1vZGFsKCdzaG93Jyk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2Vycm9yLXBvcC11cCcsIHtcclxuXHR2aWV3TW9kZWw6IEVycm9yUG9wVXAsXHJcblx0dGVtcGxhdGU6YFxyXG5cdFx0PHNlY3Rpb24gaWQ9XCJlcnJvci1tb2RhbFwiIGNsYXNzPVwibW9kYWwgZmFkZVwiIHRhYmluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCI+XHJcblx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1kaWFsb2dcIiByb2xlPVwiZG9jdW1lbnRcIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudCBlcnJvci1wb3AtdXBcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cclxuXHRcdFx0XHRcdFx0PGgyIGNsYXNzPVwiZXJyb3ItdGl0bGVcIj5FcnJvciA8c3BhbiBkYXRhLWJpbmQ9XCJ0ZXh0OiBzdGF0dXNcIj48L3NwYW4+OiA8c3BhbiBkYXRhLWJpbmQ9XCJ0ZXh0OiBzdGF0dXNUZXh0XCI+PC9zcGFuPjwvaDI+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XHJcblx0XHRcdFx0XHRcdDxwIGRhdGEtYmluZD1cInRleHQ6IGRldGFpbHNcIiBjbGFzcz1cImVycm9yLWRldGFpbHNcIj48L3A+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cclxuXHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLWFjY2VwdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+T2s8L2J1dHRvbj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PjwhLS0gLy5tb2RhbC1jb250ZW50IC0tPlxyXG5cdFx0XHQ8L2Rpdj48IS0tIC8ubW9kYWwtZGlhbG9nIC0tPlxyXG5cdFx0PC9zZWN0aW9uPjwhLS0gLy5tb2RhbCAtLT5cclxuYH0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcG9wdXBzL2Vycm9yLmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG50b2RvOiBzaW5nbGUgLSBmaXJzdCBsb2FkO1xyXG50b2RvOiBwYWdpbmcgKHBhcmFtcylcclxudG9kbzogdWxyIHBhcnNlXHJcbnRvZG86IGZpZWxkcyB2YWxpZGF0aW9uXHJcbiAqL1xyXG5cclxudmFyIHNlbGY7XHJcblxyXG5mdW5jdGlvbiBDYXJkR3JvdXAocGFyYW1zKSB7XHJcblx0c2VsZiA9IHRoaXM7XHJcblx0dGhpcy51cmwgPSB0aGlzLnVybCB8fCBwYXJhbXMudXJsO1xyXG5cdHRoaXMuY29uZmlnID0gZ2V0Q29uZmlnKHBhcmFtcyk7XHJcblx0dGhpcy5kYXRhID0gcHJlcGFyZURhdGEocGFyYW1zLCB0aGlzLmNvbmZpZy5fQ09ORklHKTtcclxuXHR0aGlzLmdyb3VwSW5kZXggPSBwYXJhbXMuZ3JvdXBJbmRleCB8fCAwO1xyXG5cdHRoaXMuc2VjdGlvbkluZGV4ID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShwYXJhbXMuc2VjdGlvbkluZGV4KTtcclxuXHR0aGlzLmNvbG9yQ2xhc3MgPSBwYXJhbXMuY29sb3JDbGFzcztcclxuXHR0aGlzLmdldE1vcmUgPSBwYXJhbXMuZ2V0TW9yZTtcclxuXHR0aGlzLnBhZ2UgPSBnZXRQYWdpbmdJbmZvKHBhcmFtcywgdGhpcy5kYXRhLnBhZ2UsIHRoaXMudXJsKTtcclxuXHR0aGlzLmNvbGxhcHNlSWQgPSBnZXRDb2xsYXBzZUlkKCk7XHJcblx0dGhpcy5faGFzRXZlbnRzUGFuZWwgPSBmYWxzZTtcclxufVxyXG5cclxuQ2FyZEdyb3VwLnByb3RvdHlwZS5zb3J0QnlDb25maWcgPSBmdW5jdGlvbiAoYSwgYikge1xyXG5cdGlmICh0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZ1thLmtleV0gJiYgdGhpcy5jb25maWdbYi5rZXldICYmIHRoaXMuY29uZmlnW2Eua2V5XS5fQ09ORklHICYmIHRoaXMuY29uZmlnW2Iua2V5XS5fQ09ORklHKSB7XHJcblx0XHR2YXIgaTEgPSB0aGlzLmNvbmZpZ1thLmtleV0uX0NPTkZJRy5pbmRleDtcclxuXHRcdHZhciBpMiA9IHRoaXMuY29uZmlnW2Iua2V5XS5fQ09ORklHLmluZGV4O1xyXG5cdFx0cmV0dXJuIGkxIC0gaTI7XHJcblx0fVxyXG5cdHJldHVybiAwO1xyXG59O1xyXG5cclxuQ2FyZEdyb3VwLnByb3RvdHlwZS5jaGVja0lmSGFzRXZlbnRzTGlzdCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuXHRyZXR1cm4gc2VsZi5faGFzRXZlbnRzUGFuZWwgPSBrZXkgPT09ICdldmVudHMnIHx8IHNlbGYuX2hhc0V2ZW50c1BhbmVsO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdwYW5lbC1ncm91cCcsIHtcclxuXHR2aWV3TW9kZWw6IENhcmRHcm91cCxcclxuXHR0ZW1wbGF0ZTpgXHJcblx0XHQ8c2VjdGlvbiBkYXRhLWJpbmQ9XCJmb3JlYWNocHJvcDoge2RhdGE6IGRhdGEsIHNvcnRGbjogc29ydEJ5Q29uZmlnLmJpbmQoJGNvbXBvbmVudCl9XCIgY2xhc3M9XCJwYW5lbC1ncm91cFwiPlxyXG5cdFx0XHQ8IS0tcGFuZWwtLT5cclxuXHRcdFx0PHBhbmVsIGRhdGEtYmluZD1cImNzczogeydoYXMtZXZlbnRzLWxpc3QnOiAkY29tcG9uZW50LmNoZWNrSWZIYXNFdmVudHNMaXN0KGtleSl9XCIgcGFyYW1zPVwiJGRhdGE6ICRkYXRhLCAkaW5kZXg6ICRpbmRleCwgcGFuZWxHcm91cDogJGNvbXBvbmVudCwgc29ydEJ5Q29uZmlnOiAkY29tcG9uZW50LnNvcnRCeUNvbmZpZ1wiPjwvcGFuZWw+XHJcblx0XHQ8L3NlY3Rpb24+XHJcbmB9KTtcclxuXHJcbi8qKlxyXG4gKiBDb25maWd1cmVzIGFuZCBwYXJhbXMgZm9yIGVhY2ggcGFuZWwgZ3JvdXBcclxuICogQHBhcmFtIHBhcmFtc1xyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmZ1bmN0aW9uIGdldENvbmZpZyhwYXJhbXMpIHtcclxuXHRzZWxmLmRlZXBQcm9wID0gcGFyYW1zLmRlZXBQcm9wIHx8ICcnO1xyXG5cdC8vIG1haW4gY29uZmlnXHJcblx0aWYgKCFzZWxmLmRlZXBQcm9wICYmICFwYXJhbXMuY29uZmlnKSB7XHJcblx0XHQvLyBwYW5lbEdyb3VwIGluZGV4IC0gMFxyXG5cclxuXHRcdC8vIGdldCBmdWxsIGNvbmZpZztcclxuXHRcdHZhciBmaWx0ZXIgPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHBhcmFtcy5maWx0ZXIpO1xyXG5cclxuXHRcdC8vIGdldCBjdXJyZW50IG1ldGhvZCBjb25maWdcclxuXHRcdHZhciBtZXRob2RDb25maWcgPSBmaWx0ZXJbcGFyYW1zLnJlcUlkXSB8fCB7fTtcclxuXHJcblx0XHQvLyBtZXRob2QgY29uZmlnIGluaGVyaXRzIGdsb2JhbCBjb25maWdcclxuXHRcdG1ldGhvZENvbmZpZy5fQ09ORklHICA9ICQuZXh0ZW5kKHRydWUsIHt9LCBmaWx0ZXIuX0dMT0JBTF9DT05GSUcsIG1ldGhvZENvbmZpZy5fQ09ORklHKTtcclxuXHJcblx0XHRyZXR1cm4gbWV0aG9kQ29uZmlnO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQvLyBwYW5lbEdyb3VwIGluZGV4ID4gMFxyXG5cdFx0cmV0dXJuIHBhcmFtcy5jb25maWcgfHwge31cclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEYXRhIG1hbmlwdWxhdGlvbnNcclxuICogQHBhcmFtIHBhcmFtc1xyXG4gKiBAcmV0dXJucyB7Knx7fX1cclxuICovXHJcbmZ1bmN0aW9uIHByZXBhcmVEYXRhKHBhcmFtcywgY29uZmlnKSB7XHJcblx0dmFyIGRhdGEgPSBwYXJhbXMgJiYgcGFyYW1zLmRhdGEgfHwge307XHJcblx0dW53cmFwcE9iamVjdHMoZGF0YSwgY29uZmlnKTtcclxuXHRyZW1vdmVEZXByZWNhdGVkKGRhdGEsIGNvbmZpZyk7XHJcblx0cmV0dXJuIHdyYXBwUHJpbWl0aXZlcyhkYXRhLCBwYXJhbXMuX3Byb3BUaXRsZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHYXRoZXJzIGFsbCBzdGFuZCBhbG9uZSBwcm9wcyBpbiB0byBvbmUgb2JqZWN0XHJcbiAqIEBwYXJhbSBkYXRhIHtvYmplY3R9XHJcbiAqIEBwYXJhbSBfcHJvcFRpdGxlIHtzdHJpbmd9XHJcbiAqIEByZXR1cm5zIHtvYmplY3R9IHJldmlzZWQgZGF0YVxyXG4gKi9cclxuZnVuY3Rpb24gd3JhcHBQcmltaXRpdmVzKGRhdGEsIF9wcm9wVGl0bGUpIHtcclxuXHR2YXIgbmV3RGF0YSA9IHt9LCBwcm9wID0gX3Byb3BUaXRsZSB8fCAnb2JqZWN0JywgdmFsLCBrZXk7XHJcblxyXG5cdC8vIGdhdGhlcmluZyBhbGwgcHJpbWl0aXZlIHByb3BzIGluIGFkZGl0aW9uYWwgcGFuZWxcclxuXHRmb3IgKGtleSBpbiBkYXRhKSB7XHJcblx0XHRpZiAoIWRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge2NvbnRpbnVlO31cclxuXHRcdHZhbCA9IGRhdGFba2V5XTtcclxuXHJcblx0XHRpZiAodHlwZW9mIHZhbCAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0bmV3RGF0YVtwcm9wXSA9IG5ld0RhdGFbcHJvcF0gfHwge307XHJcblx0XHRcdG5ld0RhdGFbcHJvcF1ba2V5XSA9IHZhbDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG5ld0RhdGFba2V5XSA9IHZhbDtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIG5ld0RhdGFcclxufVxyXG5cclxuLyoqXHJcbiAqIFVud3JhcHMgb2JqZWN0c1xyXG4gKiBAcGFyYW0gb2JqIHtvYmplY3R9XHJcbiAqIEByZXR1cm5zIHtvYmplY3R9IGNoYW5nZWRcclxuICovXHJcbmZ1bmN0aW9uIHJlbW92ZURlcHJlY2F0ZWQob2JqLCBjb25maWcpIHtcclxuXHR2YXIgZGVwcmVjYXRlZCA9IGNvbmZpZyAmJiBjb25maWcuZGVwcmVjYXRlZCB8fCBbXTtcclxuXHJcblx0ZGVwcmVjYXRlZC5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdGlmIChvYmpbaXRlbV0pIHtcclxuXHRcdFx0ZGVsZXRlIG9ialtpdGVtXVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGl0ZW07XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiBvYmo7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGRlcHJlY2F0ZWQgb2JqZWN0c1xyXG4gKiBAcGFyYW0gb2JqIHtvYmplY3R9XHJcbiAqIEByZXR1cm5zIHtvYmplY3R9IGNoYW5nZWRcclxuICovXHJcbmZ1bmN0aW9uIHVud3JhcHBPYmplY3RzKG9iaiwgY29uZmlnKSB7XHJcblx0dmFyIHVud3JhcHAgPSBjb25maWcgJiYgY29uZmlnLnVud3JhcHAgfHwgW107XHJcblxyXG5cdHVud3JhcHAubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcblx0XHR2YXIgdmFsID0gb2JqW2l0ZW1dO1xyXG5cdFx0aWYgKHZhbCkge1xyXG5cdFx0XHR2YXIgYXJyID0gT2JqZWN0LmtleXModmFsKTtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgcHJvcCA9IGFycltpXTtcclxuXHRcdFx0XHRvYmpbcHJvcF0gPSB2YWxbcHJvcF07XHJcblx0XHRcdH1cclxuXHRcdFx0ZGVsZXRlIG9ialtpdGVtXTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBpdGVtO1xyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gb2JqO1xyXG59XHJcblxyXG4vKipcclxuICogUHJlcGFyZXMgZGF0YSBmb3IgcGFnaW5nXHJcbiAqIEBwYXJhbSBwYWdlT2JqXHJcbiAqIEBwYXJhbSBwYXJhbXNcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRQYWdpbmdJbmZvKHBhcmFtcywgcGFnZU9iaiwgdXJsKSB7XHJcblx0dmFyIHBhZ2VQYXJhbSwgc2l6ZTtcclxuXHJcblx0aWYgKHBhZ2VPYmope1xyXG5cdFx0c2l6ZSA9IHBhcmFtcy5jYXJkU2l6ZSB8fCBwYWdlT2JqLnNpemU7XHJcblx0XHRwYWdlUGFyYW0gPSBwYXJhbXMucGFnZVBhcmFtIHx8IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUodXJsKS5maW5kKGZ1bmN0aW9uIChpdGVtKSB7XHJcblx0XHRcdHJldHVybiBpdGVtLm5hbWUgPT09ICdwYWdlJztcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLnBhZ2UgPSB7XHJcblx0XHRcdHBhcmFtZXRlcjogcGFnZVBhcmFtICYmIHBhZ2VQYXJhbS52YWx1ZSxcclxuXHRcdFx0c2l6ZTogc2l6ZVxyXG5cdFx0fTtcclxuXHR9XHJcblx0cmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlcyBpZCBzdHIgZm9yIHBhbmVsICdjb2xsYXBzZSB0b2dnbGUnIGxvZ2ljXHJcbiAqIEBwYXJhbSBzdHJcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmZ1bmN0aW9uIGdldENvbGxhcHNlSWQoc3RyKSB7XHJcblx0dmFyIGNsYXNzTmFtZSA9IHN0ciB8fCAnY2FyZC1wYW5lbC1ib2R5LSc7XHJcblx0cmV0dXJuIFtcclxuXHRcdGNsYXNzTmFtZSxcclxuXHRcdHNlbGYuc2VjdGlvbkluZGV4LFxyXG5cdFx0c2VsZi5ncm91cEluZGV4XHJcblx0XS5qb2luKCcnKTtcclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL3BhbmVsR3JvdXAuY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xyXG5cclxuZnVuY3Rpb24gY2FyZENvbXBvbmVudChwYXJhbXMpIHtcclxuXHRzZWxmID0gdGhpcztcclxuXHR0aGlzLmtleSA9IHBhcmFtcy4kZGF0YS5rZXk7XHJcblx0dGhpcy4kZGF0YSA9IHBhcmFtcy4kZGF0YTtcclxuXHR0aGlzLiRpbmRleCA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUocGFyYW1zLiRpbmRleCk7XHJcblx0dGhpcy5wYW5lbEdyb3VwID0gcGFyYW1zLnBhbmVsR3JvdXA7XHJcblx0dGhpcy5wYWdlID0gdGhpcy5wYW5lbEdyb3VwLnBhZ2U7XHJcblx0dGhpcy5jb2xvckNsYXNzID0gdGhpcy5wYW5lbEdyb3VwLmNvbG9yQ2xhc3MgfHwgJyc7XHJcblx0dGhpcy5jb25maWcgPSBnZXRQYW5lbENvbmZpZyh0aGlzLnBhbmVsR3JvdXAuY29uZmlnLCB0aGlzLmtleSk7XHJcblx0dGhpcy5pc0V4cGFuZGVkID0gaXNFeHBhbmRlZCh0aGlzLmNvbmZpZyk7XHJcblx0dGhpcy5jb2xsYXBzZUlkID0gdGhpcy5wYW5lbEdyb3VwLmNvbGxhcHNlSWQgKyB0aGlzLiRpbmRleDtcclxuXHR0aGlzLmlzQWN0aXZlID0ga28ub2JzZXJ2YWJsZSh0aGlzLmlzRXhwYW5kZWQpO1xyXG59XHJcblxyXG5jYXJkQ29tcG9uZW50LnByb3RvdHlwZS5zZXRBY3RpdmUgPSBmdW5jdGlvbiAobW9kZWwsIGV2ZW50KSB7XHJcblx0dGhpcy5pc0FjdGl2ZSghdGhpcy5pc0FjdGl2ZSgpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIGNvbmZpZyBmb3IgZWFjaCBwYW5lbFxyXG4gKiBAcGFyYW0ga2V5IHtzdHJpbmd9IGtleSBvZiBwYW5lbCBvYmplY3RcclxuICogQHJldHVybnMge29iamVjdH0gY29uZmlnXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRQYW5lbENvbmZpZyhjb25maWcsIGtleSkge1xyXG5cdHZhciBzdWJDb25maWcgPSBjb25maWdba2V5XSB8fCB7fTtcclxuXHJcblx0c3ViQ29uZmlnLl9DT05GSUcgPSAkLmV4dGVuZCh0cnVlLCB7fSwgY29uZmlnLl9DT05GSUcsIHN1YkNvbmZpZy5fQ09ORklHKTtcclxuXHRyZXR1cm4gc3ViQ29uZmlnO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGZvciAnY29sbGFwc2VkJyBjb25maWcgZm9yIGVhY2ggcGFuZWxcclxuICogQHBhcmFtIGtleSB7c3RyaW5nfSBrZXkgb2YgcGFuZWwgb2JqZWN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBmb3IgY3NzIGNsYXNzIGFkZC9yZW1vdmVcclxuICovXHJcbmZ1bmN0aW9uIGlzRXhwYW5kZWQoY29uZmlnKSB7XHJcblx0cmV0dXJuICEoT2JqZWN0LmdldFByb3AoY29uZmlnLCAnLl9DT05GSUcuY29sbGFwc2VkJykgfHwgZmFsc2UpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ3BhbmVsJywge1xyXG5cdHZpZXdNb2RlbDogY2FyZENvbXBvbmVudCxcclxuXHR0ZW1wbGF0ZTpgXHJcblx0XHQ8c2VjdGlvbiBkYXRhLWJpbmQ9XCJjc3M6IHtbY29sb3JDbGFzc106IHRydWUsIGFjdGl2ZTogaXNBY3RpdmV9XCIgY2xhc3M9XCJwYW5lbCBwYW5lbC1wcmltYXJ5XCI+XHJcblx0XHRcdDwhLS1wYW5lbC1oZWFkaW5nLS0+XHJcblx0XHRcdDxwYW5lbC1oZWFkaW5nIHBhcmFtcz1cImNvbmZpZzogY29uZmlnLCBkYXRhOiAkZGF0YSwgaW5kZXg6ICRpbmRleCwgcGFnZTogcGFnZSwgc2V0QWN0aXZlOiBzZXRBY3RpdmUuYmluZCgkY29tcG9uZW50KSwgY29sbGFwc2VJZDogY29sbGFwc2VJZCwgY29sb3JDbGFzczogY29sb3JDbGFzcywgaXNFeHBhbmRlZDogaXNFeHBhbmRlZFwiPjwvcGFuZWwtaGVhZGluZz5cclxuXHRcdFx0XHJcblx0XHRcdDwhLS1wYW5lbC1ib2R5LS0+XHJcblx0XHRcdDxzZWN0aW9uIGRhdGEtYmluZD1cImF0dHI6IHsnaWQnOiBjb2xsYXBzZUlkfSwgY3NzOiB7J2luJzogaXNFeHBhbmRlZH1cIiBjbGFzcz1cInBhbmVsLWNvbGxhcHNlIGNvbGxhcHNlXCI+XHRcdFx0XHRcclxuXHRcdFx0XHQ8IS0tIGtvIGlmOiAodHlwZW9mICRkYXRhLnZhbHVlID09PSAnb2JqZWN0JyAmJiAhJC5pc0FycmF5KCRkYXRhLnZhbHVlKSkgLS0+XHJcblx0XHRcdFx0XHQ8b2JqZWN0LXBhbmVsLWJvZHkgcGFyYW1zPVwiY29uZmlnOiBjb25maWcsIGRhdGE6ICRkYXRhLCBpbmRleDogJGluZGV4LCBwYW5lbEdyb3VwOiBwYW5lbEdyb3VwLCBwYWdlOiBwYWdlLCBjb2xsYXBzZUlkOiBjb2xsYXBzZUlkXCI+PC9vYmplY3QtcGFuZWwtYm9keT5cclxuXHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHQ8IS0tIGtvIGlmOiAodHlwZW9mICRkYXRhLnZhbHVlID09PSAnb2JqZWN0JyAmJiAkLmlzQXJyYXkoJGRhdGEudmFsdWUpKSAtLT5cclxuXHRcdFx0XHRcdDxhcnJheS1wYW5lbC1ib2R5IHBhcmFtcz1cImNvbmZpZzogY29uZmlnLCBkYXRhOiAkZGF0YSwgaW5kZXg6ICRpbmRleCwgcGFuZWxHcm91cDogcGFuZWxHcm91cFwiPjwvYXJyYXktcGFuZWwtYm9keT5cclxuXHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0PC9zZWN0aW9uPlxyXG5gfSk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9wYW5lbHMvcGFuZWwuY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xyXG5cclxuLyoqXHJcbiAqIFBhZ2luYXRpb24gZWxlbWVudFxyXG4gKiBAcGFyYW0gcGFyYW1zXHJcbiAqL1xyXG5mdW5jdGlvbiBwYWdpbmF0aW9uKHBhcmFtcykge1xyXG5cdHRoaXMucGFnZVBhcmFtID0gcGFyYW1zLnBhZ2VQYXJhbTtcclxuXHR0aGlzLnRvdGFsUGFnZXMgPSArcGFyYW1zLnRvdGFsUGFnZXM7XHJcblx0dGhpcy5udW1iZXIgPSArcGFyYW1zLm51bWJlcjtcclxuXHR0aGlzLmZpcnN0ID0gISF0aGlzLm51bWJlcjtcclxuXHR0aGlzLmxhc3QgPSB0aGlzLm51bWJlciA8IHRoaXMudG90YWxQYWdlcyAtIDE7XHJcblx0dGhpcy5yZXF1ZXN0QnRuID0gJCgnI2FwaS1leHAtZ2V0LWJ0bicpO1xyXG5cdHNlbGYgPSB0aGlzO1xyXG59XHJcblxyXG4vKipcclxuICogZ2V0IG5leHQgcGFnZVxyXG4gKi9cclxucGFnaW5hdGlvbi5wcm90b3R5cGUuZ2V0UHJldlBhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHZhbCA9IHRoaXMucGFnZVBhcmFtKCk7XHJcblx0dGhpcy5wYWdlUGFyYW0odmFsID4gMCA/IHZhbCAtIDEgOiAwKTtcclxuXHR0aGlzLnJlcXVlc3RCdG4udHJpZ2dlcignY2xpY2snKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBnZXQgcHJldiBwYWdlXHJcbiAqL1xyXG5wYWdpbmF0aW9uLnByb3RvdHlwZS5nZXROZXh0UGFnZSA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdmFsID0gdGhpcy5udW1iZXI7XHJcblx0dGhpcy5wYWdlUGFyYW0odmFsIDwgdGhpcy50b3RhbFBhZ2VzIC0gMSA/IHZhbCAgKyAxOiB2YWwpO1xyXG5cdHRoaXMucmVxdWVzdEJ0bi50cmlnZ2VyKCdjbGljaycpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdwYWdpbmF0aW9uJywge1xyXG5cdHZpZXdNb2RlbDogcGFnaW5hdGlvbixcclxuXHR0ZW1wbGF0ZTpcclxuXHRgPHNwYW4gY2xhc3M9XCJuYXZpZ2F0aW9uLXdyYXBwZXJcIj5cclxuXHRcdDxidXR0b24gZGF0YS1iaW5kPVwiY2xpY2s6IGdldFByZXZQYWdlLCBlbmFibGU6IGZpcnN0XCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibmF2aWdhdGlvbiBwcmV2XCI+PC9idXR0b24+XHJcblx0XHQ8YnV0dG9uICBkYXRhLWJpbmQ9XCJjbGljazogZ2V0TmV4dFBhZ2UsIGVuYWJsZTogbGFzdFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm5hdmlnYXRpb24gbmV4dFwiPjwvYnV0dG9uPlxyXG5cdDwvc3Bhbj5gXHJcbn0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL3BhZ2luYXRpb24uY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xudmFyIGdldFJhbmRvbUNvbG9yID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9jb2xvckNsYXNzZXMnKS5nZXRSYW5kb21Db2xvcjtcblxuZnVuY3Rpb24gUGFuZWxIZWFkaW5nKHBhcmFtcykge1xuXHRzZWxmID0gdGhpcztcblx0dGhpcy5jb25maWcgPSBwYXJhbXMuY29uZmlnICYmIHBhcmFtcy5jb25maWcuX0NPTkZJRztcblx0dmFyIHBhZ2UgPSBwYXJhbXMucGFnZTtcblx0dGhpcy5zZXRBY3RpdmUgPSBwYXJhbXMuc2V0QWN0aXZlO1xuXHR0aGlzLmlzRXhwYW5kZWQgPSBwYXJhbXMuaXNFeHBhbmRlZDtcblx0dGhpcy5fcGFuZWxOYW1lID0gcGFyYW1zLmRhdGEua2V5O1xuXHR0aGlzLnRpdGxlID0gdGhpcy5jb25maWcgJiYgdGhpcy5jb25maWcudGl0bGUgfHwgdGhpcy5fcGFuZWxOYW1lO1xuXHR0aGlzLmRhdGEgPSBwYXJhbXMuZGF0YS52YWx1ZTtcblx0aWYgKHBhZ2UpIHtcblx0XHR0aGlzLmNhcmRTaXplID0gcGFnZS5zaXplO1xuXHRcdHRoaXMucGFnZVBhcmFtID0gcGFnZS5wYXJhbWV0ZXI7XG5cdH1cblx0dGhpcy5jb2xsYXBzZUlkID0gcGFyYW1zLmNvbGxhcHNlSWQ7XG5cdGlmICh0aGlzLmNvbmZpZy5yZXF1ZXN0KSB7XG5cdFx0dGhpcy5nZXRSYW5kb21Db2xvciA9IGdldFJhbmRvbUNvbG9yKHBhcmFtcy5jb2xvckNsYXNzKTtcblx0fVxufVxuXG5QYW5lbEhlYWRpbmcucHJvdG90eXBlLmZvbGxvd1JlcXVlc3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0dmFyIHVybCA9IE9iamVjdC5nZXRQcm9wKHZhbHVlLCAnLmNvbmZpZy5yZXF1ZXN0Jyk7XG5cdHVybCAmJiBsb2NhdGlvbi5hc3NpZ24odXJsKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga28uY29tcG9uZW50cy5yZWdpc3RlcigncGFuZWwtaGVhZGluZycsIHtcblx0dmlld01vZGVsOiAgUGFuZWxIZWFkaW5nLFxuXHR0ZW1wbGF0ZTpgXG5cdFx0PHNlY3Rpb24gY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZWwtdGl0bGVcIj5cblx0XHRcdFx0XG5cdFx0XHRcdDxhIGRhdGEtYmluZD1cImNsaWNrOiBzZXRBY3RpdmUsIGF0dHI6IHtocmVmOiAnIycgKyBjb2xsYXBzZUlkLCAnYXJpYS1jb250cm9scyc6IGNvbGxhcHNlSWQsICdhcmlhLWV4cGFuZGVkJzogaXNFeHBhbmRlZH1cIiBjbGFzcz1cImJ0biBidG4taWNvbiBidG4tdGl0bGVcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiYnRuIGJ0bi1pY29uIHNoZXZyb24gd2hpdGUtc2hldnJvbi11cFwiPjwvc3Bhbj5cblx0XHRcdFx0XHQ8cCBkYXRhLWJpbmQ9XCJ0ZXh0OiB0aXRsZVwiIGNsYXNzPVwidGl0bGVcIj5QYW5lbCB0aXRsZTwvcD5cblx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcblx0XHRcdFx0PCEtLSBrbyBpZjogX3BhbmVsTmFtZSA9PT0gJ2V2ZW50cyctLT5cblx0XHRcdFx0XHQ8c3BhbiBkYXRhLWJpbmQ9XCJ0ZXh0OiBjYXJkU2l6ZVwiIGNsYXNzPVwiY291bnRlclwiPjwvc3Bhbj5cblx0XHRcdFx0PCEtLSAva28tLT5cblx0XHRcdFx0XG5cdFx0XHRcdDwhLS0ga28gaWY6IF9wYW5lbE5hbWUgPT09ICdwYWdlJy0tPlxuXHRcdFx0XHRcdDxwYWdpbmF0aW9uIHBhcmFtcz1cIm51bWJlcjogZGF0YS5udW1iZXIsIHRvdGFsUGFnZXM6IGRhdGEudG90YWxQYWdlcywgcGFnZVBhcmFtOiBwYWdlUGFyYW1cIj48L3BhZ2luYXRpb24+XG5cdFx0XHRcdDwhLS0gL2tvLS0+XG5cdFx0XHRcdFxuXHRcdFx0XHQ8IS0tIGtvIGlmOiBjb25maWcucmVxdWVzdCAhPT0gdW5kZWZpbmVkIC0tPlxuXHRcdFx0XHQ8c2VjdGlvbiBjbGFzcz1cImZvbGxvdy1yZXF1ZXN0XCI+XG5cdFx0XHRcdFx0PHNwYW4gZGF0YS1iaW5kPVwiY3NzOiBnZXRSYW5kb21Db2xvclwiIGNsYXNzPVwiY29sb3ItaW5kaWNhdG9yXCI+PC9zcGFuPlxuXHRcdFx0XHRcdDxidXR0b24gZGF0YS1iaW5kPVwiY2xpY2s6IGZvbGxvd1JlcXVlc3RcIiBjbGFzcz1cImJ0biBidG4tcmVxdWVzdFwiIHR5cGU9XCJidXR0b25cIj5hbm90aGVyIHJlcXVlc3Q8L2J1dHRvbj5cblx0XHRcdFx0PC9zZWN0aW9uPlxuXHRcdFx0XHQ8IS0tIC9rby0tPlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9zZWN0aW9uPlxuYH0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYW5lbEhlYWRpbmcuY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xyXG5cclxuZnVuY3Rpb24gT2JqZWN0UGFuZWxCb2R5KHBhcmFtcykge1xyXG5cdHNlbGYgPSB0aGlzO1xyXG5cdHRoaXMuZGF0YSA9IHRoaXMuZGF0YSB8fCBrby5vYnNlcnZhYmxlKHBhcmFtcy5kYXRhLnZhbHVlKTtcclxuXHR0aGlzLmNvbmZpZyA9IHBhcmFtcy5jb25maWc7XHJcblx0dGhpcy5fcGFuZWxOYW1lID0gcGFyYW1zLmRhdGEua2V5O1xyXG5cdHRoaXMuY2FyZEluZGV4ID0gdGhpcy5jYXJkSW5kZXggfHwga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShwYXJhbXMuaW5kZXgpO1xyXG5cdHRoaXMucGFuZWxHcm91cCA9IHBhcmFtcy5wYW5lbEdyb3VwIHx8IHt9O1xyXG5cdHRoaXMuZ2V0TW9yZSA9IHRoaXMucGFuZWxHcm91cC5nZXRNb3JlO1xyXG5cdHRoaXMucGFnZVBhcmFtID0gcGFyYW1zLnBhZ2UgJiYgcGFyYW1zLnBhZ2UucGFyYW1ldGVyO1xyXG5cdHRoaXMuY29sbGFwc2VJZCA9IHBhcmFtcy5jb2xsYXBzZUlkO1xyXG5cdHRoaXMuX2FsbEluc2lkZSA9ICEhT2JqZWN0LmdldFByb3Aoa28udW53cmFwKHRoaXMuY29uZmlnKSwgJy5fQ09ORklHLmFsbEluc2lkZScpO1xyXG5cdHRoaXMuc29ydEJ5Q29uZmlnID0gdGhpcy5wYW5lbEdyb3VwLnNvcnRCeUNvbmZpZztcclxufVxyXG5cclxuT2JqZWN0UGFuZWxCb2R5LnByb3RvdHlwZS5vbkVudGVyS2V5RG93biA9IGZ1bmN0aW9uIChtb2RlbCwgZXZlbnQpIHtcclxuXHRpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuXHRcdHZhciB2YWx1ZSA9ICtldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlO1xyXG5cdFx0dmFsdWUgPSBOdW1iZXIuaXNOYU4odmFsdWUpID8gMCA6IHZhbHVlO1xyXG5cdFx0dmFyIHBhZ2VOdW1iZXIgPSB+fnZhbHVlIDwgMCA/IDAgOiB+fnZhbHVlO1xyXG5cdFx0dGhpcy5wYWdlUGFyYW0ocGFnZU51bWJlciA8IGtvLnVud3JhcCh0aGlzLmRhdGEpLnRvdGFsUGFnZXMgPyBwYWdlTnVtYmVyIDoga28udW53cmFwKHRoaXMuZGF0YSkudG90YWxQYWdlcyAtIDEpO1xyXG5cdFx0JCgnI2FwaS1leHAtZ2V0LWJ0bicpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxufTtcclxuXHJcbk9iamVjdFBhbmVsQm9keS5wcm90b3R5cGUuY2FuQmVDb3BpZWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0aWYgKHR5cGVvZiB0aGlzLnZhbHVlID09PSAnb2JqZWN0JykgcmV0dXJuIGZhbHNlO1xyXG5cdHRoaXMuY29waWVkID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcblx0aWYgKE9iamVjdC5nZXRQcm9wKHNlbGYuY29uZmlnLCAnLl9DT05GSUcuY29weUJ0bi4nICsgdGhpcy5rZXkpKSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcbk9iamVjdFBhbmVsQm9keS5wcm90b3R5cGUuY29weVZhbHVlID0gZnVuY3Rpb24gKG1vZGVsLCBldmVudCkge1xyXG5cdHZhciBjdXJyZW50RmllbGQgPSB0aGlzO1xyXG5cdHNlbGYuY2xpcGJvYXJkID0gbmV3IENsaXBib2FyZChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuXHRzZWxmLmNsaXBib2FyZC5vbignc3VjY2VzcycsIGZ1bmN0aW9uIG9uU3VjY2Vzc0NvcHkoZSkge1xyXG5cdFx0XHRjb25zb2xlLmluZm8oJ0FjdGlvbjonLCBlLmFjdGlvbik7XHJcblx0XHRcdGNvbnNvbGUuaW5mbygnVGV4dDonLCBlLnRleHQpO1xyXG5cdFx0XHRjb25zb2xlLmluZm8oJ1RyaWdnZXI6JywgZS50cmlnZ2VyKTtcclxuXHRcdFx0Y3VycmVudEZpZWxkLmNvcGllZCh0cnVlKTtcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0Y3VycmVudEZpZWxkLmNvcGllZChmYWxzZSk7XHJcblx0XHRcdH0sIDUwMCk7XHJcblx0XHRcdGUuY2xlYXJTZWxlY3Rpb24oKTtcclxuXHRcdH0pXHJcblx0XHQub24oJ2Vycm9yJywgZnVuY3Rpb24gb25FcnJvckNvcHkoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdBY3Rpb246JywgZS5hY3Rpb24pO1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdUcmlnZ2VyOicsIGUudHJpZ2dlcik7XHJcblx0XHR9KTtcclxufTtcclxuXHJcbk9iamVjdFBhbmVsQm9keS5wcm90b3R5cGUucmVtb3ZlSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuXHRzZWxmLmNsaXBib2FyZCAmJiBzZWxmLmNsaXBib2FyZC5kZXN0cm95KCk7XHJcblx0ZGVsZXRlIHNlbGYuY2xpcGJvYXJkO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdvYmplY3QtcGFuZWwtYm9keScsIHtcclxuXHR2aWV3TW9kZWw6ICBPYmplY3RQYW5lbEJvZHksXHJcblx0dGVtcGxhdGU6YFxyXG5cdFx0PHNlY3Rpb24gZGF0YS1iaW5kPVwiY3NzOiB7J2FsbC1pbnNpZGUnOiAkY29tcG9uZW50Ll9hbGxJbnNpZGV9XCIgY2xhc3M9XCJwYW5lbC1ib2R5IG9iamVjdC1wYW5lbC1ib2R5XCI+XHJcblx0XHRcdDwhLS0ga28gaWY6ICRjb21wb25lbnQuX3BhbmVsTmFtZSA9PT0gJ29iamVjdCcgJiYgISFPYmplY3QuZ2V0UHJvcChrby51bndyYXAoZGF0YSksICcucmF0aW8nKS0tPlxyXG5cdFx0XHRcdDxpbWcgZGF0YS1iaW5kPVwiYXR0cjoge3NyYzoga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShkYXRhKS51cmwsIGFsdDogJ2ltYWdlLScgKyBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKGRhdGEpLnJhdGlvfVwiIGFsdD1cImltZ1wiIGNsYXNzPVwiaW1nIGltZy10aHVtYm5haWxcIj5cclxuXHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFxyXG5cdFx0XHQ8dWwgZGF0YS1iaW5kPVwiZm9yZWFjaHByb3A6IHtkYXRhOiBkYXRhLCBzb3J0Rm46ICRjb21wb25lbnQuc29ydEJ5Q29uZmlnLmJpbmQoJGNvbXBvbmVudCl9XCI+XHJcblx0XHRcdFx0PGxpIGRhdGEtYmluZD1cImNzczogeydvYmplY3QnOiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnLCAncHJpbWl0aXZlJzogdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0J31cIiBjbGFzcz1cImNsZWFyZml4IHBhZGluZ1wiPlxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFx0PCEtLSBrbyBpZm5vdDogdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAkY29tcG9uZW50Ll9hbGxJbnNpZGUgLS0+XHJcblx0XHRcdFx0XHQ8c3BhbiBkYXRhLWJpbmQ9XCJ0ZXh0OiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnID8ga2V5OiBrZXkgKyAnOidcIiBjbGFzcz1cImtleVwiPjwvc3Bhbj5cclxuXHRcdFx0XHRcdDwhLS0gL2tvIC0tPlxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8IS0tIGtvIGlmbm90OiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIHx8ICRjb21wb25lbnQuX3BhbmVsTmFtZSA9PT0gJ3BhZ2UnICYmIGtleSA9PT0gJ251bWJlcicgLS0+XHJcblx0XHRcdFx0XHRcdDxzcGFuIGRhdGEtYmluZD1cInRleHQ6IHZhbHVlXCIgY2xhc3M9XCJ2YWx1ZVwiPjwvc3Bhbj5cclxuXHRcdFx0XHRcdDwhLS0gL2tvIC0tPlxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8IS0tIGtvIGlmOiAkY29tcG9uZW50Ll9wYW5lbE5hbWUgPT09ICdwYWdlJyAmJiBrZXkgPT09ICdudW1iZXInLS0+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLWlubGluZVwiPlxyXG5cdFx0XHRcdFx0XHRcdDxpbnB1dCBpZD1cInBhZ2luYXRpb24taW5wdXRcIiBkYXRhLWJpbmQ9XCJldmVudDoge2tleWRvd246ICRjb21wb25lbnQub25FbnRlcktleURvd24uYmluZCgkY29tcG9uZW50KX0sIGF0dHI6IHtwbGFjZWhvbGRlcjogdmFsdWV9XCIgdHlwZT1cInRleHRcIiBwYXR0ZXJuPVwiWzAtOV0rXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0PCEtLSBrbyBpZjogJGNvbXBvbmVudC5jYW5CZUNvcGllZC5jYWxsKCRkYXRhLCAnI3Byb3AtdmFsdWUtJyArIGtleSArICRpbmRleCgpKSAtLT5cclxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBkYXRhLWJpbmQ9XCJldmVudDoge21vdXNlb3ZlcjogJGNvbXBvbmVudC5jb3B5VmFsdWUsIG1vdXNlb3V0OiAkY29tcG9uZW50LnJlbW92ZUhhbmRsZXJ9LCBjc3M6IHsnY29waWVkJzogY29waWVkfSwgYXR0cjogeydkYXRhLWNsaXBib2FyZC10ZXh0JzogdmFsdWUudG9TdHJpbmcoKSwgaWQ6ICdwcm9wLXZhbHVlLScgKyBrZXkgKyAkaW5kZXgoKX0sIHBvcG92ZXI6IHt0eXBlOiAndG9vbHRpcCcsIHRpdGxlOiAnQ29weSB2YWx1ZSd9XCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1pY29uIGJ0bi1jb3B5XCI+PC9idXR0b24+XHJcblx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHQ8IS0tIGtvIGlmOiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmICRjb21wb25lbnQuX2FsbEluc2lkZSAtLT5cclxuXHRcdFx0XHRcdFx0XHQ8cGFuZWwgcGFyYW1zPVwiJGRhdGE6ICRkYXRhLCAkaW5kZXg6ICRpbmRleCwgcGFuZWxHcm91cDogJGNvbXBvbmVudFwiPjwvcGFuZWw+XHJcblx0XHRcdFx0XHRcdDwhLS0gL2tvIC0tPlxyXG5cdFx0XHRcdFx0XHQ8IS0tIGtvIGlmOiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmICEkY29tcG9uZW50Ll9hbGxJbnNpZGUgLS0+XHJcblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBkYXRhLWJpbmQ9XCJjbGljazogJGNvbXBvbmVudC5nZXRNb3JlLmJpbmQoJGNvbXBvbmVudCwga2V5LCB2YWx1ZSlcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWljb24gYmx1ZS1zaGV2cm9uLXJpZ2h0IHB1bGwtcmlnaHRcIj48L2J1dHRvbj5cclxuXHRcdFx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFx0PC9saT5cclxuXHRcdFx0PC91bD5cclxuXHRcdDwvc2VjdGlvbj5cclxuYH0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL29iamVjdFBhbmVsQm9keS5jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHNlbGY7XHJcblxyXG5mdW5jdGlvbiBBcnJheVBhbmVsQm9keShwYXJhbXMpIHtcclxuXHRzZWxmID0gdGhpcztcclxuXHR0aGlzLmRhdGEgPSBwYXJhbXMuZGF0YS52YWx1ZTtcclxuXHR0aGlzLmNvbmZpZyA9IHBhcmFtcy5jb25maWc7XHJcblx0dGhpcy5fcGFuZWxOYW1lID0gcGFyYW1zLmRhdGEua2V5O1xyXG5cdHRoaXMuY2FyZEluZGV4ID0gdGhpcy5jYXJkSW5kZXggfHwga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShwYXJhbXMuaW5kZXgpO1xyXG5cdHRoaXMucGFuZWxHcm91cCA9IHBhcmFtcy5wYW5lbEdyb3VwO1xyXG5cdHRoaXMuZ2V0TW9yZSA9IHRoaXMucGFuZWxHcm91cC5nZXRNb3JlO1xyXG5cclxufVxyXG5cclxuQXJyYXlQYW5lbEJvZHkucHJvdG90eXBlLmdldFN0YXJ0RGF0YSA9IGZ1bmN0aW9uICgkZGF0YSkge1xyXG5cdHJldHVybiBPYmplY3QuZ2V0UHJvcCgkZGF0YSwgJ2RhdGVzLnN0YXJ0LmxvY2FsRGF0ZScpIHx8ICcnXHJcbn07XHJcblxyXG5BcnJheVBhbmVsQm9keS5wcm90b3R5cGUuZ2V0VmVudWVOYW1lID0gZnVuY3Rpb24gKCRkYXRhKSB7XHJcblx0cmV0dXJuIE9iamVjdC5nZXRQcm9wKCRkYXRhLCAnX2VtYmVkZGVkLnZlbnVlc1swXS5uYW1lJykgfHwgJydcclxufTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2FycmF5LXBhbmVsLWJvZHknLCB7XHJcblx0dmlld01vZGVsOiBBcnJheVBhbmVsQm9keSxcclxuXHR0ZW1wbGF0ZTpgXHJcblx0XHQ8c2VjdGlvbiBjbGFzcz1cInBhbmVsLWJvZHkgbm8tcGFkZGluZyBhcnJheS1wYW5lbC1ib2R5XCI+XHJcblx0XHRcdDx1bCBkYXRhLWJpbmQ9XCJmb3JlYWNoOiBkYXRhXCIgY2xhc3M9XCJsaXN0LWdyb3VwXCI+XHJcblx0XHRcdFx0PGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8IS0tIGtvIGlmOiAkY29tcG9uZW50Ll9wYW5lbE5hbWUgPT09ICdpbWFnZXMnIC0tPlxyXG5cdFx0XHRcdFx0XHQ8aW1nIGRhdGEtYmluZD1cImF0dHI6IHtzcmM6IHVybCwgYWx0OiAnaW1hZ2UtJyArIHJhdGlvfVwiIGFsdD1cImltZ1wiIGNsYXNzPVwiaW1nXCI+XHJcblx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0PCEtLSBrbyBpZm5vdDogJGNvbXBvbmVudC5fcGFuZWxOYW1lID09PSAnaW1hZ2VzJyAtLT5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm5hbWUtd3JhcHBlclwiPlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuIGRhdGEtYmluZD1cInRleHQ6IG5hbWUgfHwgJyMnICsgJGluZGV4KCksIGJsb2NrRWxsaXBzaXM6IHtjbGFtcDogMn1cIiBjbGFzcz1cIm5hbWVcIj5sYWJlbDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHRcdFx0XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHQ8IS0tIGtvIGlmOiAkY29tcG9uZW50Ll9wYW5lbE5hbWUgPT09ICdldmVudHMnIC0tPlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJhZGRpdGlvbmFsLWluZm9cIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxwIGRhdGEtYmluZD1cInRleHQ6ICRjb21wb25lbnQuZ2V0U3RhcnREYXRhKCRkYXRhKVwiIGNsYXNzPVwiZGF0ZVwiPmV2ZW50IGRhdGU8L3A+XHJcblx0XHRcdFx0XHRcdFx0XHQ8IS0tIGtvIGlmOiAkY29tcG9uZW50LmdldFZlbnVlTmFtZSgkZGF0YSktLT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PHAgZGF0YS1iaW5kPVwidGV4dDogJGNvbXBvbmVudC5nZXRWZW51ZU5hbWUoJGRhdGEpXCIgY2xhc3M9XCJ2ZW51ZSB0cnVuY2F0ZVwiPmV2ZW50IHZlbnVlPC9wPlxyXG5cdFx0XHRcdFx0XHRcdFx0PCEtLS9rby0tPlxyXG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0PCEtLSBrbyBpZjogdHlwZW9mICRkYXRhID09PSAnb2JqZWN0JyAtLT5cclxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBkYXRhLWJpbmQ9XCJjbGljazogJGNvbXBvbmVudC5nZXRNb3JlLmJpbmQoJGNvbXBvbmVudCwgJGluZGV4KCkpXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1pY29uIGJsdWUtc2hldnJvbi1yaWdodCBwdWxsLXJpZ2h0XCI+PC9idXR0b24+XHJcblx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdDwvbGk+XHJcblx0XHRcdDwvdWw+XHJcblx0XHQ8L3NlY3Rpb24+XHJcbmB9KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9hcnJheVBhbmVsQm9keS5jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==