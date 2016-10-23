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

	/**
	 * Main file for Api Explrer v2.0
	 * For development please use Webpack to bundle all modules
	 * It can be made using npm scripts cmd - 'webpack'
	 */
	// custom bindings
	__webpack_require__(2);
	
	// Modules
	var base = __webpack_require__(3);
	var apiKey = __webpack_require__(4);
	var ajaxService = __webpack_require__(5);
	var config = __webpack_require__(6);
	
	// View Models
	var MenuViewModel = __webpack_require__(7);
	var ParamsViewModel = __webpack_require__(9);
	var MethodsViewModel = __webpack_require__(10);
	var RequestsListViewModel = __webpack_require__(11);
	
	// Components
	__webpack_require__(18);
	
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

	 module.exports = ko.bindingHandlers.foreachprop = {
	
		transformObject: function (params) {
			var properties = [];
			var obj, sortFn = params.sortFn;
	
			if (sortFn) {
				obj = params.data;
			} else {
				obj = params;
			}
	
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
/* 3 */
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
/* 4 */
/***/ function(module, exports) {

	var apiKey = 'XiOrN2UC9yjuR4XF87sdMbRpaVNsP6W2' || apiKeyService.checkApiKeyCookie('tk-api-key') || apiKeyService.getApiExploreKey(); //API Key
	
	module.exports = {
	  name: 'apikey',
	  style: 'query',
	  value: ko.observable(apiKey)
	};


/***/ },
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var hf = __webpack_require__(8);
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
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var self;
	var base;
	var hf = __webpack_require__(8);
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var hf = __webpack_require__(8);
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
							}
						}
					},
					"status": {
						"_CONFIG": {
							"index": 2
						}
					},
					"end": {
						"_CONFIG": {
							"index": 3,
							"copyBtn": {
								"dateTime": true
							}
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
/* 17 */
/***/ function(module, exports) {

	var colors = [
		'column-color-1',
		'column-color-2',
		'column-color-3',
		'column-color-4',
		'column-color-5',
		'column-color-6',
		'column-color-7',
		'column-color-8',
		'column-color-9',
		'column-color-10',
		'column-color-11',
		'column-color-12'
	];
	
	function getRandomColor(color) {
		var randomNumber;
		do {
			randomNumber = getRandomInt(1, colors.length);
		} while ('column-color-' + randomNumber === color);
	
		return 'column-color-' + randomNumber;
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
	}());


/***/ },
/* 19 */
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
/* 20 */
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
		if (self.config && self.config[a.key] && self.config[b.key] && self.config[a.key]._CONFIG && self.config[b.key]._CONFIG) {
			var i1 = self.config[a.key]._CONFIG.index;
			var i2 = self.config[b.key]._CONFIG.index;
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
			<section data-bind="foreachprop: {data: data, sortFn: sortByConfig}" class="panel-group">
				<div data-bind="css: {'has-events-list': $component.checkIfHasEventsList(key)}">			
					<!--panel-->
					<panel params="$data: $data, $index: $index, panelGroup: $component"></panel>
				</div>
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
/* 21 */
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
				<panel-heading params="config: config, data: $data, index: $index, page: page, setActive: setActive.bind($component), collapseId: collapseId, colorClass: colorClass"></panel-heading>
				
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
/* 22 */
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var self;
	var getRandomColor = __webpack_require__(17).getRandomColor;
	
	function PanelHeading(params) {
		self = this;
		this.config = params.config && params.config._CONFIG;
		var page = params.page;
		this.setActive = params.setActive;
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
					
					<a data-bind="click: setActive, attr: {href: '#' + collapseId, 'aria-controls': collapseId}" class="btn btn-icon btn-title" type="button" data-toggle="collapse" aria-expanded="false">
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
/* 24 */
/***/ function(module, exports) {

	var self;
	
	function ObjectPanelBody(params) {
		self = this;
		this.data = this.data || ko.observable(params.data.value);
		this.config = params.config;
		this._panelName = params.data.key;
		this.cardIndex = this.cardIndex || ko.utils.unwrapObservable(params.index);
		this.panelGroup = params.panelGroup;
		this.getMore = this.panelGroup.getMore;
		this.pageParam = params.page && params.page.parameter;
		this.collapseId = params.collapseId;
		this._allInside = !!Object.getProp(ko.utils.unwrapObservable(this.config), '._CONFIG.allInside');
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
	
	ObjectPanelBody.prototype.sortProps = function (a, b) {
		console.log(a,b);
	};
	
	module.exports = ko.components.register('object-panel-body', {
		viewModel:  ObjectPanelBody,
		template:`
			<section class="panel-body">
				<!-- ko if: $component._panelName === 'image' -->
					<img data-bind="attr: {src: ko.utils.unwrapObservable(data).url, alt: 'image-' + ko.utils.unwrapObservable(data).ratio}" alt="img" class="img img-thumbnail">
				<!-- /ko -->
				
				<ul data-bind="foreachprop: data">
					<li data-bind="css: {'allInside': $component._allInside}" class="clearfix pading">
						<span data-bind="text: typeof value === 'object' ? key: key + ':'" class="key"></span>
						
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
						
						
						<!-- ko if: typeof value === 'object' -->
							<!-- ko if: $component._allInside -->
								<panel params="$data: $data, $index: $index, panelGroup: $component"></panel>
							<!-- /ko -->
							<!-- ko ifnot: $component._allInside -->
								<button data-bind="click: $component.getMore.bind($component, key, value)" type="button" class="btn btn-icon blue-shevron-right pull-right"></button>
							<!-- /ko -->
						<!-- /ko -->
					</li>
				</ul>
			</section>
	`});


/***/ },
/* 25 */
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
							<span data-bind="text: name || '#' + $index()" class="name">event name</span>
							
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTdhYmM4NWFiMzVmZjk0NzdlY2MiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY3VzdG9tQmluZGluZ3MvZm9yZWFjaFByb3AuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9hcGlrZXkuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvYWpheFNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvY29uZmlnU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvVmlld01vZGVscy9tZW51Vmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2hlbHBlckZ1bmMuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvcGFyYW1zVmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9WaWV3TW9kZWxzL21ldGhvZHNWaWV3TW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvcmVxdWVzdHNMaXN0Vmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2pzb24taGlnaGxpZ2h0LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2hpZ2hsaWdodEpzb24ud29ya2VyLmpzIiwid2VicGFjazovLy8uL34vd29ya2VyLWxvYWRlci9jcmVhdGVJbmxpbmVXb3JrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvc2xpZGVyLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbmZpZy5qc29uIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2NvbG9yQ2xhc3Nlcy5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9jdXN0b21TZWxlY3QuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYW5lbEdyb3VwLmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9wYW5lbHMvcGFuZWwuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYWdpbmF0aW9uLmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9wYW5lbHMvcGFuZWxIZWFkaW5nLmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9wYW5lbHMvb2JqZWN0UGFuZWxCb2R5LmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9wYW5lbHMvYXJyYXlQYW5lbEJvZHkuY29tcG9uZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFvQztBQUNwQywyQkFBMEI7QUFDMUI7QUFDQSwrQkFBOEIsT0FBTztBQUNyQztBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMxS0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSixJQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNyQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0EsTUFBSzs7QUFF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QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0EsRTs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBZ0IsV0FBVztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBZ0IsV0FBVztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQ3pKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7Ozs7Ozs7QUNSRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdURBQXNEO0FBQ3REO0FBQ0E7QUFDQSwwQ0FBeUM7QUFDekMsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7Ozs7OztBQ3ZHRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBNkIsZ0NBQWdDO0FBQzdEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRSIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDk3YWJjODVhYjM1ZmY5NDc3ZWNjXG4gKiovIiwiLyoqXHJcbiAqIE1haW4gZmlsZSBmb3IgQXBpIEV4cGxyZXIgdjIuMFxyXG4gKiBGb3IgZGV2ZWxvcG1lbnQgcGxlYXNlIHVzZSBXZWJwYWNrIHRvIGJ1bmRsZSBhbGwgbW9kdWxlc1xyXG4gKiBJdCBjYW4gYmUgbWFkZSB1c2luZyBucG0gc2NyaXB0cyBjbWQgLSAnd2VicGFjaydcclxuICovXHJcbi8vIGN1c3RvbSBiaW5kaW5nc1xyXG5yZXF1aXJlKCcuLi9jdXN0b21CaW5kaW5ncy9mb3JlYWNoUHJvcCcpO1xyXG5cclxuLy8gTW9kdWxlc1xyXG52YXIgYmFzZSA9IHJlcXVpcmUoJy4uL21vZHVsZXMvYmFzZScpO1xyXG52YXIgYXBpS2V5ID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9hcGlrZXknKTtcclxudmFyIGFqYXhTZXJ2aWNlID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9hamF4U2VydmljZScpO1xyXG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb25maWdTZXJ2aWNlJyk7XHJcblxyXG4vLyBWaWV3IE1vZGVsc1xyXG52YXIgTWVudVZpZXdNb2RlbCA9IHJlcXVpcmUoJy4vbWVudVZpZXdNb2RlbCcpO1xyXG52YXIgUGFyYW1zVmlld01vZGVsID0gcmVxdWlyZSgnLi9wYXJhbXNWaWV3TW9kZWwnKTtcclxudmFyIE1ldGhvZHNWaWV3TW9kZWwgPSByZXF1aXJlKCcuL21ldGhvZHNWaWV3TW9kZWwnKTtcclxudmFyIFJlcXVlc3RzTGlzdFZpZXdNb2RlbCA9IHJlcXVpcmUoJy4vcmVxdWVzdHNMaXN0Vmlld01vZGVsJyk7XHJcblxyXG4vLyBDb21wb25lbnRzXHJcbnJlcXVpcmUoJy4uL2NvbXBvbmVudHMvaW5kZXgnKTtcclxuXHJcbi8qKlxyXG4gKiBNYWluIGFwcGxpY2F0aW9uIHZpZXctbW9kZWxcclxuICogQHBhcmFtIG9iaiB7b2JqZWN0fSBnbG9iYWwgZGF0YSBvYmplY3RcclxuICovXHJcbmZ1bmN0aW9uIEFwcFZpZXdNb2RlbChvYmopIHtcclxuICBzZWxmID0gdGhpcztcclxuICB2YXIgYmFzZSA9IG9iaiB8fCB7fTtcclxuXHR2YXIgcGFyc2VkVXJsID0gcGFyc2VVcmwoKTtcclxuICB0aGlzLmFwaUtleSA9IGFwaUtleTtcclxuXHR0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuXHJcbiAgLy8gb2JzZXJ2YWJsZXNcclxuICB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkgPSBrby5vYnNlcnZhYmxlKHBhcnNlZFVybC5hcGlDYXRlZ29yeSB8fCAnJyk7XHJcbiAgdGhpcy5zZWxlY3RlZE1ldGhvZCA9IGtvLm9ic2VydmFibGUocGFyc2VkVXJsLm1ldGhvZElkIHx8ICcnKTtcclxuICB0aGlzLnNlbGVjdGVkUGFyYW1zID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcclxuXHR0aGlzLnJlcXVlc3RzID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcclxuXHJcblx0Ly8gY29tcHV0ZWRcclxuICB0aGlzLlVSTCA9IGtvLmNvbXB1dGVkKHRoaXMuZ2V0VXJsLCB0aGlzKTtcclxuICB0aGlzLnNlbmRCdXR0b25UZXh0ID0ga28ucHVyZUNvbXB1dGVkKHRoaXMuZ2V0TWV0aG9kTmFtZSwgdGhpcyk7XHJcblx0dGhpcy5zaGFyZVBhdGggPSBrby5wdXJlQ29tcHV0ZWQoZm9ybURlZXBMaW5raW5nVXJsLCB0aGlzKTtcclxuXHR0aGlzLnNoYXJlUGF0aC5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbCkge1xyXG5cdFx0Y29uc29sZS5sb2codmFsKTtcclxuXHR9LCB0aGlzKTtcclxuICAvLyBzdWItbW9kZWxzXHJcbiAgdGhpcy5tZW51ID0gbmV3IE1lbnVWaWV3TW9kZWwoYmFzZSwgdGhpcy5zZWxlY3RlZENhdGVnb3J5KTtcclxuICB0aGlzLm1ldGhvZHMgPSBuZXcgTWV0aG9kc1ZpZXdNb2RlbChiYXNlLCB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnksIHRoaXMuc2VsZWN0ZWRNZXRob2QpO1xyXG4gIHRoaXMucGFyYW1zID0gbmV3IFBhcmFtc1ZpZXdNb2RlbChiYXNlLCB0aGlzLnNlbGVjdGVkTWV0aG9kLCB0aGlzLnNlbGVjdGVkUGFyYW1zKTtcclxuICB0aGlzLnJlcXVlc3RzTGlzdCA9IG5ldyBSZXF1ZXN0c0xpc3RWaWV3TW9kZWwodGhpcy5yZXF1ZXN0cywgdGhpcy5zZWxlY3RlZFBhcmFtcywgdGhpcy5zaGFyZVBhdGgpO1xyXG59XHJcblxyXG4vKipcclxuICogU2VuZCByZXF1ZXN0IG1ldGhvZFxyXG4gKi9cclxuQXBwVmlld01vZGVsLnByb3RvdHlwZS5vbkNsaWNrU2VuZEJ0biA9IGZ1bmN0aW9uICgpIHtcclxuICBhamF4U2VydmljZSh0aGlzLlVSTCgpLCB0aGlzLnJlcXVlc3RzLCBiYXNlKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIGN1cnJlbnQgbWV0aG9kIG5hbWVcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbkFwcFZpZXdNb2RlbC5wcm90b3R5cGUuZ2V0TWV0aG9kTmFtZSA9IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gdGhpcy5zZWxlY3RlZE1ldGhvZCgpLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgcmF3IHVybCBkYXRhIGFycmF5XHJcbiAqIEByZXR1cm5zIHsqW119XHJcbiAqL1xyXG5BcHBWaWV3TW9kZWwucHJvdG90eXBlLmdldFVybCA9IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gW1xyXG4gICAgdGhpcy5zZWxlY3RlZE1ldGhvZCgpLFxyXG4gICAgdGhpcy5hcGlLZXksXHJcbiAgICB0aGlzLnNlbGVjdGVkUGFyYW1zKClcclxuICBdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgZGVlcCBwcm9wXHJcbiAqIEByZXR1cm5zIHsqW119XHJcbiAqL1xyXG5PYmplY3QuZ2V0UHJvcCA9IGZ1bmN0aW9uKG8sIHMpIHtcclxuXHRpZiAodHlwZW9mIG8gIT09ICdvYmplY3QnIHx8ICFzKSB7XHJcblx0XHRjb25zb2xlLmxvZyhvLHMpO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHRzID0gcy5yZXBsYWNlKC9cXFsoXFx3KylcXF0vZywgJy4kMScpOyAvLyBjb252ZXJ0IGluZGV4ZXMgdG8gcHJvcGVydGllc1xyXG5cdHMgPSBzLnJlcGxhY2UoL15cXC4vLCAnJyk7ICAgICAgICAgICAvLyBzdHJpcCBhIGxlYWRpbmcgZG90XHJcblx0dmFyIGEgPSBzLnNwbGl0KCcuJyk7XHJcblx0Zm9yICh2YXIgaSA9IDAsIG4gPSBhLmxlbmd0aDsgaSA8IG47ICsraSkge1xyXG5cdFx0dmFyIGsgPSBhW2ldO1xyXG5cdFx0aWYgKGsgaW4gbykge1xyXG5cdFx0XHRvID0gb1trXTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIG87XHJcbn07XHJcblxyXG4vKipcclxuICogQWN0aXZhdGVzIGtub2Nrb3V0LmpzXHJcbiAqL1xyXG5rby5hcHBseUJpbmRpbmdzKG5ldyBBcHBWaWV3TW9kZWwoYmFzZSkpO1xyXG4vKipcclxuICogZXhwb3J0cyBnbG9iYWwgdmFyaWFibGVcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gYmFzZTtcclxuXHJcbmZ1bmN0aW9uIGZvcm1EZWVwTGlua2luZ1VybCgpIHtcclxuXHR2YXIgbG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb247XHJcblx0dmFyIGNhdGVnb3J5ID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShzZWxmLnNlbGVjdGVkQ2F0ZWdvcnkpO1xyXG5cdHZhciBtZXRob2QgPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHNlbGYuc2VsZWN0ZWRNZXRob2QpO1xyXG5cdHZhciBwYXJhbXMgPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHNlbGYuc2VsZWN0ZWRQYXJhbXMpO1xyXG5cclxuXHR2YXIgcXVlcnlzID0gW1xyXG5cdFx0J2FwaUNhdGVnb3J5PScgKyBlbmNvZGVVUkkoY2F0ZWdvcnkpLFxyXG5cdFx0J21ldGhvZElkPScrIGVuY29kZVVSSShtZXRob2QuaWQpXHJcblx0XTtcclxuXHJcblx0cGFyYW1zLm1hcChmdW5jdGlvbiAocGFyYW0pIHtcclxuXHRcdHZhciB2YWx1ZSA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUocGFyYW0udmFsdWUpO1xyXG5cdFx0dmFyIGRlZmF1bHRWYWx1ZSA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUocGFyYW0uZGVmYXVsdCk7XHJcblx0XHRxdWVyeXMucHVzaChbXHJcblx0XHRcdHBhcmFtLm5hbWUsXHJcblx0XHRcdCc9JyxcclxuXHRcdFx0dmFsdWUgIT09ICcnID8gdmFsdWUgOiBkZWZhdWx0VmFsdWUgLy90b2RvOiByZW1vdmUgZGVmYXVsdCBmcm9tIGhlcmUgd2hlbiBzZXQgdXAgaXQgaW4gc291cmNlIGxpa2UgdmFsdWUgYnkgZGVmYXVsdFxyXG5cdFx0XS5qb2luKCcnKSk7XHJcblx0XHRyZXR1cm4gcGFyYW07XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiBbXHJcblx0XHRsb2NhdGlvbi5vcmlnaW4sXHJcblx0XHRsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC8kL2dtaSwgJycpLFxyXG5cdFx0Jz8nLFxyXG5cdFx0cXVlcnlzLmpvaW4oJyYnKVxyXG5cdF0uam9pbignJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlVXJsKCkge1xyXG5cdHZhciBsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XHJcblx0aWYgKGxvY2F0aW9uKSB7XHJcblx0XHR2YXIgcXVlcnlzID0gbG9jYXRpb24ucmVwbGFjZSgvXlxcPy9nLCAnJykuc3BsaXQoJyYnKTtcclxuXHRcdHZhciBvYmogPSB7XHJcblx0XHRcdGFwaUNhdGVnb3J5OiAnJyxcclxuXHRcdFx0bWV0aG9kSWQ6ICcnLFxyXG5cdFx0XHRzZWxlY3RlZFBhcmFtczogW11cclxuXHRcdH07XHJcblxyXG5cdFx0cXVlcnlzLm1hcChmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHR2YXIgYSA9IGRlY29kZVVSSShlKS5zcGxpdCgnPScpO1xyXG5cdFx0XHR2YXIga2V5ID0gYVswXTtcclxuXHRcdFx0dmFyIHZhbCA9IGFbMV07XHJcblxyXG5cdFx0XHRpZiAoa2V5ID09PSAnYXBpQ2F0ZWdvcnknIHx8IGtleSA9PT0gJ21ldGhvZElkJykge1xyXG5cdFx0XHRcdG9ialtrZXldID0gdmFsO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG9iai5zZWxlY3RlZFBhcmFtcy5wdXNoKHtcclxuXHRcdFx0XHRcdG5hbWU6IGtleSxcclxuXHRcdFx0XHRcdHZhbHVlOiB2YWxcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBvYmo7XHJcblx0fVxyXG5cdHJldHVybiB7fTtcclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvbWFpbi5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIiBtb2R1bGUuZXhwb3J0cyA9IGtvLmJpbmRpbmdIYW5kbGVycy5mb3JlYWNocHJvcCA9IHtcclxuXHJcblx0dHJhbnNmb3JtT2JqZWN0OiBmdW5jdGlvbiAocGFyYW1zKSB7XHJcblx0XHR2YXIgcHJvcGVydGllcyA9IFtdO1xyXG5cdFx0dmFyIG9iaiwgc29ydEZuID0gcGFyYW1zLnNvcnRGbjtcclxuXHJcblx0XHRpZiAoc29ydEZuKSB7XHJcblx0XHRcdG9iaiA9IHBhcmFtcy5kYXRhO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0b2JqID0gcGFyYW1zO1xyXG5cdFx0fVxyXG5cclxuXHRcdGtvLnV0aWxzLm9iamVjdEZvckVhY2gob2JqLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG5cdFx0XHRwcm9wZXJ0aWVzLnB1c2goe1xyXG5cdFx0XHRcdGtleToga2V5LFxyXG5cdFx0XHRcdHZhbHVlOiB2YWx1ZVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmIChzb3J0Rm4pIHtcclxuXHRcdFx0cHJvcGVydGllcy5zb3J0KHNvcnRGbik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHByb3BlcnRpZXM7XHJcblx0fSxcclxuXHRpbml0OiBmdW5jdGlvbihlbGVtZW50LCB2YWx1ZUFjY2Vzc29yLCBhbGxCaW5kaW5nc0FjY2Vzc29yLCB2aWV3TW9kZWwsIGJpbmRpbmdDb250ZXh0KSB7XHJcblx0XHR2YXIgcHJvcGVydGllcyA9IGtvLnB1cmVDb21wdXRlZChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBvYmogPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHZhbHVlQWNjZXNzb3IoKSk7XHJcblx0XHRcdHJldHVybiBrby5iaW5kaW5nSGFuZGxlcnMuZm9yZWFjaHByb3AudHJhbnNmb3JtT2JqZWN0KG9iaik7XHJcblx0XHR9KTtcclxuXHRcdGtvLmFwcGx5QmluZGluZ3NUb05vZGUoZWxlbWVudCwge1xyXG5cdFx0XHRmb3JlYWNoOiBwcm9wZXJ0aWVzXHJcblx0XHR9LCBiaW5kaW5nQ29udGV4dCk7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRjb250cm9sc0Rlc2NlbmRhbnRCaW5kaW5nczogdHJ1ZVxyXG5cdFx0fTtcclxuXHR9XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY3VzdG9tQmluZGluZ3MvZm9yZWFjaFByb3AuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYmFzZSA9IHt9O1xyXG52YXIgQ09ORklHX1VSTCA9ICcuLi8uLi9hcGlkZXNjcmlwdGlvbi54bWwnO1xyXG5cclxudmFyIHBhcnNlRGF0YSA9IGZ1bmN0aW9uICh4bWwpIHtcclxuXHR2YXIgZ2xvYmFsID0ge307XHJcblx0Ly9nZXQgYWxsIEFQSXNcclxuXHR2YXIgcmVzb3VyY2VzRWwgPSAkKHhtbCkuZmluZChcInJlc291cmNlc1wiKS5lcSgwKTtcclxuXHJcblx0Ly8gcmVzb3VyY2VcclxuXHQkKHhtbClcclxuXHRcdC5maW5kKFwicmVzb3VyY2VcIilcclxuXHRcdC5nZXQoKVxyXG5cdFx0Lm1hcChmdW5jdGlvbiAocmVzKSB7XHJcblx0XHRcdHZhciByZXNvdXJjZSA9ICQocmVzKTtcclxuXHRcdFx0Ly8gbWV0aG9kIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdHZhciBtZXRob2RFbGVtID0gcmVzb3VyY2UuZmluZChcIm1ldGhvZFwiKS5lcSgwKTtcclxuXHJcblx0XHRcdHZhciBtZXRob2QgPSB7XHJcblx0XHRcdFx0aWQgOiBtZXRob2RFbGVtLmF0dHIoXCJpZFwiKSwgLy8gbWV0aG9kIGlkXHJcblx0XHRcdFx0bmFtZSA6IG1ldGhvZEVsZW0uYXR0cihcImFwaWdlZTpkaXNwbGF5TmFtZVwiKSB8fCBtZXRob2RFbGVtLmF0dHIoXCJpZFwiKSwgLy8gbWV0aG9kIG5hbWVcclxuXHRcdFx0XHRtZXRob2QgOiBtZXRob2RFbGVtLmF0dHIoJ25hbWUnKSwgLy8gR0VUIG9yIFBPU1RcclxuXHRcdFx0XHRjYXRlZ29yeSA6IG1ldGhvZEVsZW0uZmluZCgnW3ByaW1hcnk9XCJ0cnVlXCJdJykudGV4dCgpLnRyaW0oKSwgLy8gQVBJIG5hbWVcclxuXHRcdFx0XHRwYXRoOiByZXNvdXJjZS5hdHRyKCdwYXRoJyksIC8vIG1ldGhvZCBVUkxcclxuXHRcdFx0XHRiYXNlIDogcmVzb3VyY2VzRWwuYXR0cignYmFzZScpLCAvLyBtZXRob2QgYmFzZSBsaW5rXHJcblx0XHRcdFx0bGluayA6IG1ldGhvZEVsZW0uZmluZCgnZG9jJykuZXEoMCkuYXR0cignYXBpZ2VlOnVybCcpLCAvLyBsaW5rIHRvIGRvY3VtZW50YXRpb25cclxuXHRcdFx0XHRkZXNjcmlwdGlvbiA6IG1ldGhvZEVsZW0uZmluZCgnZG9jJykuZXEoMCkudGV4dCgpLnRyaW0oKSwgLy9tZXRob2QgZGVzY3JpcHRpb25cclxuXHRcdFx0XHRwYXJhbWV0ZXJzOiB7fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Ly8gcGFyYW1zIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdHJlc291cmNlXHJcblx0XHRcdFx0LmZpbmQoJ3BhcmFtJylcclxuXHRcdFx0XHQuZ2V0KClcclxuXHRcdFx0XHQubWFwKGZ1bmN0aW9uIChwYXIpIHtcclxuXHRcdFx0XHRcdHZhciBwYXJhbSA9ICQocGFyKTtcclxuXHRcdFx0XHRcdHZhciBvcHRpb25zID0gcGFyYW0uZmluZCgnb3B0aW9uJyk7XHJcblx0XHRcdFx0XHR2YXIgaXNTZWxlY3QgPSAhIW9wdGlvbnMubGVuZ3RoO1xyXG5cclxuXHRcdFx0XHRcdHZhciBwYXJhbWV0ZXIgPSB7XHJcblx0XHRcdFx0XHRcdG5hbWU6IHBhcmFtLmF0dHIoJ25hbWUnKSxcclxuXHRcdFx0XHRcdFx0ZG9jOiBwYXJhbS5maXJzdCgnZG9jJykudGV4dCgpLnRyaW0oKSxcclxuXHRcdFx0XHRcdFx0c3R5bGU6IHBhcmFtLmF0dHIoJ3N0eWxlJyksXHJcblx0XHRcdFx0XHRcdHJlcXVpcmVkOiBwYXJhbS5hdHRyKCdyZXF1aXJlZCcpLFxyXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiBwYXJhbS5hdHRyKCdkZWZhdWx0JykgPT09ICdub25lJyAmJiBpc1NlbGVjdCA/ICcnIDogcGFyYW0uYXR0cignZGVmYXVsdCcpLFxyXG5cdFx0XHRcdFx0XHRzZWxlY3Q6IGlzU2VsZWN0XHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdGlmIChpc1NlbGVjdCkge1xyXG5cdFx0XHRcdFx0XHRwYXJhbWV0ZXIub3B0aW9ucyA9IG9wdGlvbnMuZ2V0KCkubWFwKGZ1bmN0aW9uIChvcHRpb24pIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0bmFtZTogJChvcHRpb24pLmF0dHIoJ3ZhbHVlJyksXHJcblx0XHRcdFx0XHRcdFx0XHRjaGVja2VkOiAkKG9wdGlvbikuYXR0cigndmFsdWUnKSA9PT0gcGFyYW1ldGVyLmRlZmF1bHQgfHwgJChvcHRpb24pLmF0dHIoJ3ZhbHVlJykgPT09ICdub25lJyxcclxuXHRcdFx0XHRcdFx0XHRcdGxpbms6IGZhbHNlXHJcblx0XHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0bWV0aG9kLnBhcmFtZXRlcnNbcGFyYW1ldGVyLm5hbWVdID0gcGFyYW1ldGVyO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0LyoqXHJcblx0XHRcdCAqIEdsb2JhbCBvYmogY29tcG9zaXRpb25cclxuICAgICAgICovXHJcblx0XHRcdC8vIHNldCBjYXRlZ29yeSBvYmpcclxuXHRcdFx0Z2xvYmFsW21ldGhvZC5jYXRlZ29yeV0gPSBnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XSB8fCB7fTtcclxuXHJcblx0XHRcdC8vIHNldCBtZXRob2RzIHR5cGUgb2JqXHJcblx0XHRcdGdsb2JhbFttZXRob2QuY2F0ZWdvcnldLkFMTCA9IGdsb2JhbFttZXRob2QuY2F0ZWdvcnldLkFMTCB8fCB7fTtcclxuXHRcdFx0Z2xvYmFsW21ldGhvZC5jYXRlZ29yeV1bbWV0aG9kLm1ldGhvZF0gPSBnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XVttZXRob2QubWV0aG9kXSB8fCB7fTtcclxuXHJcblx0XHRcdC8vIHNldCBtZXRob2Qgb2JqXHJcblx0XHRcdGdsb2JhbFttZXRob2QuY2F0ZWdvcnldLkFMTFttZXRob2QuaWRdID0gbWV0aG9kO1xyXG5cdFx0XHRnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XVttZXRob2QubWV0aG9kXVttZXRob2QuaWRdID0gbWV0aG9kO1xyXG5cdFx0fSk7XHJcblxyXG5cdHJldHVybiBnbG9iYWw7XHJcbn07XHJcblxyXG4vL2dldHMgZG9jdW1lbnQgZnJvbSBXQURMIGNvbmZpZ3VyYXRpb24gZmlsZVxyXG52YXIgcmVhZEZyb21XQURMID0gZnVuY3Rpb24gKCkge1xyXG4gICQuYWpheCh7XHJcbiAgICB1cmw6IENPTkZJR19VUkwsXHJcbiAgICBhc3luYyA6IGZhbHNlLFxyXG4gICAgZGF0YVR5cGU6ICgkLmJyb3dzZXIubXNpZSkgPyBcInRleHRcIiA6IFwieG1sXCIsXHJcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICB2YXIgeG1sO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiByZXNwb25zZSA9PSBcInN0cmluZ1wiKXtcclxuICAgICAgICB4bWwgPSBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxET01cIik7XHJcbiAgICAgICAgeG1sLmFzeW5jID0gZmFsc2U7XHJcbiAgICAgICAgeG1sLmxvYWRYTUwocmVzcG9uc2UpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHhtbCA9IHJlc3BvbnNlO1xyXG4gICAgICB9XHJcblxyXG5cdFx0XHRiYXNlID0gcGFyc2VEYXRhKHhtbCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGVycm9yOiBmdW5jdGlvbihYTUxIdHRwUmVxdWVzdCwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pe1xyXG4gICAgICBhbGVydCgnRGF0YSBDb3VsZCBOb3QgQmUgTG9hZGVkIC0gJysgdGV4dFN0YXR1cyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcbnJlYWRGcm9tV0FETCgpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2U7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGFwaUtleSA9ICdYaU9yTjJVQzl5anVSNFhGODdzZE1iUnBhVk5zUDZXMicgfHwgYXBpS2V5U2VydmljZS5jaGVja0FwaUtleUNvb2tpZSgndGstYXBpLWtleScpIHx8IGFwaUtleVNlcnZpY2UuZ2V0QXBpRXhwbG9yZUtleSgpOyAvL0FQSSBLZXlcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIG5hbWU6ICdhcGlrZXknLFxyXG4gIHN0eWxlOiAncXVlcnknLFxyXG4gIHZhbHVlOiBrby5vYnNlcnZhYmxlKGFwaUtleSlcclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2FwaWtleS5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxyXG4gKiBBamF4IFNlcnZpY2VcclxuICogQHBhcmFtIHVybFxyXG4gKiBAcGFyYW0gbWV0aG9kXHJcbiAqIEBwYXJhbSBjYWxsYmFja1xyXG4gKi9cclxudmFyIGFqYXhTZXJ2aWNlID0gZnVuY3Rpb24gKHVybCwgbWV0aG9kLCBjYWxsYmFjaykge1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBtZXRob2QsXHJcbiAgICB1cmw6IHVybCxcclxuICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgY29tcGxldGU6IGNhbGxiYWNrXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogRmlsdGVycyBhbmQgcHJlcGFyZXMgcGFyYW1zIHBhaXJzXHJcbiAqIEBwYXJhbSBhcnJcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG52YXIgcHJlcGFyZVVybCA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICB2YXIgcmVwbGFjZW1lbnQsIHVybCwgZG9tYWluLCBwYXRoLCBtZXRob2QsIGFwaUtleSwgcGFyYW1zO1xyXG5cclxuICBpZiAoIWFyciAmJiAhYXJyLmxlbmd0aCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBcclxuICBkb21haW4gPSBhcnJbMF0uYmFzZTtcclxuICBwYXRoID0gYXJyWzBdLnBhdGg7XHJcbiAgYXBpS2V5ID0gYXJyWzFdO1xyXG4gIHBhcmFtcyA9IGFyclsyXS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgIHJldHVybiBpdGVtLnN0eWxlID09PSAncXVlcnknO1xyXG4gIH0pO1xyXG5cclxuICAvLyBhcnIgb2YgdGVtcGxhdGUgbWFya3NcclxuICByZXBsYWNlbWVudCA9IHBhdGgubWF0Y2goLyhbXntdKj8pXFx3KD89XFx9KS9nbWkpO1xyXG5cclxuICAvLyBhcnIgb2YgdGVtcGxhdGUgcGFyYW1zXHJcbiAgdmFyIHRlbXBsYXRlc0FyciA9IGFyclsyXS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgIHJldHVybiBpdGVtLnN0eWxlID09PSAndGVtcGxhdGUnO1xyXG4gIH0pO1xyXG5cclxuICAvLyByZXBsYWNlbWVudFxyXG4gIHJlcGxhY2VtZW50LmZvckVhY2goZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgdmFyIHBhcmFtID0gdGVtcGxhdGVzQXJyLmZpbmQoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgcmV0dXJuIGl0ZW0ubmFtZSA9PT0gdmFsO1xyXG4gICAgfSk7XHJcbiAgICBwYXRoID0gcGF0aC5yZXBsYWNlKCd7JysgcGFyYW0ubmFtZSArICd9JywgcGFyYW0udmFsdWUoKSB8fCBwYXJhbS5kZWZhdWx0KTtcclxuICB9KTtcclxuXHJcbiAgLy8gYWRkcyBhcGlLZXkgcGFyYW1cclxuICBpZiAoIXBhcmFtc1swXSB8fCBwYXJhbXNbMF0ubmFtZSAhPT0gJ2FwaWtleScpIHtcclxuICAgIHBhcmFtcy51bnNoaWZ0KGFwaUtleSk7XHJcbiAgfVxyXG5cclxuICAvLyBwcmVwYXJlcyBwYXJhbXMgcGFydCBvZiB1cmxcclxuICBwYXJhbXMgPSBwYXJhbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgIHJldHVybiBbaXRlbS5uYW1lLCBpdGVtLnZhbHVlKCkgfHwgaXRlbS5kZWZhdWx0XS5qb2luKCc9Jyk7XHJcbiAgICB9KS5qb2luKCcmJyk7XHJcblxyXG4gIHVybCA9IFtkb21haW4sICcvJywgcGF0aCwgJz8nLCBwYXJhbXNdLmpvaW4oJycpO1xyXG5cclxuICByZXR1cm4gZW5jb2RlVVJJKHVybCk7XHJcbn07XHJcblxyXG4vLyBzZW5kcyByZXF1ZXN0IHRvIGdldCB0aGUgc2Vjb25kIGNvbHVtblxyXG52YXIgc2VuZFByaW1hcnlSZXF1ZXN0ID0gZnVuY3Rpb24gKGFyciwgcmVxdWVzdHMsIGdsb2JhbCkge1xyXG4gIHZhciB1cmwgPSBwcmVwYXJlVXJsKGFycik7XHJcblxyXG4gIGFqYXhTZXJ2aWNlKHVybCwgYXJyWzBdLm1ldGhvZCwgZnVuY3Rpb24ocmVzLCBtc2cpIHtcclxuXHRcdHZhciByZXNPYmogPSB7XHJcblx0XHRcdHJlcTogdXJsLFxyXG5cdFx0XHRpbmRleDogcmVxdWVzdHMoKS5sZW5ndGhcclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKG1zZyA9PSAnZXJyb3InKSB7XHJcblx0XHRcdHZhciBlcnIgPSByZXMgJiZcclxuXHRcdFx0XHRyZXMucmVzcG9uc2VKU09OICYmXHJcblx0XHRcdFx0cmVzLnJlc3BvbnNlSlNPTi5lcnJvcnMgJiZcclxuXHRcdFx0XHRyZXMucmVzcG9uc2VKU09OLmVycm9yc1swXTtcclxuXHJcblx0XHRcdHJlc09iai5lcnJvciA9IHtcclxuXHRcdFx0XHRjb2RlOiBlcnIgPyBlcnIuY29kZTogNTAwLFxyXG5cdFx0XHRcdG1lc3NhZ2U6IGVyciA/IGVyci5kZXRhaWw6ICdObyByZXNwb25jZSBkYXRhISdcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Z2xvYmFsLmxhc3RSZXNwb25zZSA9IHJlc09iai5yZXMgPSB7XHJcblx0XHRcdFx0aWQ6IGFyclswXS5pZCwgLy8gbWV0aG9kIGlkIHdhcyB1c2VkXHJcblx0XHRcdFx0cmVzOiByZXMucmVzcG9uc2VKU09OIC8vIHJlc3BvbnNlXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gZXhwb3J0aW5nIGRhdGEgdXNpbmcgb2JzZXJ2YWJsZVxyXG5cdFx0cmVxdWVzdHMudW5zaGlmdChyZXNPYmopO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc2VuZFByaW1hcnlSZXF1ZXN0O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvYWpheFNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgY29uZmlnID0ga28ub2JzZXJ2YWJsZSgpO1xyXG5cclxuJC5hamF4KHtcclxuXHR0eXBlOiAnR0VUJyxcclxuXHR1cmw6IFtcclxuXHRcdCdodHRwOi8vJyxcclxuXHRcdGRvY3VtZW50LmxvY2F0aW9uLmhvc3RuYW1lLFxyXG5cdFx0ZG9jdW1lbnQubG9jYXRpb24ucG9ydCAmJiAnOicgKyBkb2N1bWVudC5sb2NhdGlvbi5wb3J0LFxyXG5cdFx0Jy9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb25maWcuanNvbidcclxuXHRdLmpvaW4oJycpLFxyXG5cdGFzeW5jOiB0cnVlLFxyXG5cdGRhdGFUeXBlOiBcImpzb25cIixcclxuXHRjb21wbGV0ZTogZnVuY3Rpb24ocmVzLCBtc2cpIHtcclxuXHRcdGlmIChtc2cgPT0gJ2Vycm9yJykge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdjYW5cXCd0IGxvYWQgY29uZmlnLmpzb24hJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25maWcocmVzLnJlc3BvbnNlSlNPTik7XHJcblx0XHR9XHJcblx0fVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY29uZmlnO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvY29uZmlnU2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBoZiA9IHJlcXVpcmUoJy4uL21vZHVsZXMvaGVscGVyRnVuYycpO1xyXG52YXIgc2VsZjtcclxuXHJcbi8qKlxyXG4gKiBNZW51IFZpZXctTW9kZWxcclxuICogQHBhcmFtIGJhc2VcclxuICogQHBhcmFtIGNhdGVnb3J5XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gTWVudVZpZXdNb2RlbChiYXNlLCBzZWxlY3RlZENhdGVnb3J5KSB7XHJcbiAgc2VsZiA9IHRoaXM7XHJcblxyXG5cdHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSA9IHNlbGVjdGVkQ2F0ZWdvcnk7XHJcblx0dmFyIGluaXRDYXRlZ29yeSA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUoc2VsZWN0ZWRDYXRlZ29yeSk7XHJcblx0dGhpcy5jYXRlZ29yaWVzID0ga28ub2JzZXJ2YWJsZUFycmF5KE9iamVjdC5rZXlzKGJhc2UpLm1hcChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuXHRcdHZhciBjaGVja2VkID0gaW5pdENhdGVnb3J5ID8gaXRlbSA9PT0gaW5pdENhdGVnb3J5OiAhaW5kZXg7XHJcblx0XHQvLyBpbml0aWFsIGxvYWRcclxuXHRcdGNoZWNrZWQgJiYgc2VsZi5zZWxlY3RlZENhdGVnb3J5KGl0ZW0pO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Y2hlY2tlZDoga28ub2JzZXJ2YWJsZShjaGVja2VkKSxcclxuXHRcdFx0bmFtZTogaXRlbSxcclxuXHRcdFx0bGluazogZmFsc2VcclxuXHRcdH1cclxuXHR9KSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNZW51IFZpZXctTW9kZWwgbWV0aG9kXHJcbiAqIEBwYXJhbSBjYXRlZ29yeVxyXG4gKi9cclxuTWVudVZpZXdNb2RlbC5wcm90b3R5cGUuc2VsZWN0Q2F0ZWdvcnkgPSBmdW5jdGlvbiAoY2F0ZWdvcnkpIHtcclxuICB2YXIgY2F0ZWdvcnlOYW1lID0gY2F0ZWdvcnkubmFtZTtcclxuICBzZWxmLnNlbGVjdGVkQ2F0ZWdvcnkoY2F0ZWdvcnlOYW1lKTtcclxuICBoZi5jaGVja0FjdGl2ZShzZWxmLmNhdGVnb3JpZXMsIGNhdGVnb3J5TmFtZSk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1lbnVWaWV3TW9kZWw7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvVmlld01vZGVscy9tZW51Vmlld01vZGVsLmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cy5nZXRNb2RlbEFycmF5ID0gZnVuY3Rpb24gZ2V0TW9kZWxBcnJheShwYXJhbXMpIHtcclxuICAgIHZhciBvYmogPSBwYXJhbXMub2JqIHx8IHt9LFxyXG4gICAgICAgIGFyciA9IHBhcmFtcy5hcnIgfHwgW10sXHJcbiAgICAgICAgcHJvcCA9IHBhcmFtcy5wcm9wIHx8ICduYW1lJztcclxuXHJcbiAgICBmb3IgKHZhciBpIGluIG9iaikge1xyXG4gICAgICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGkpKSB7IGNvbnRpbnVlOyB9XHJcblxyXG4gICAgICAgIHZhciBpdGVtID0gYXJyLmZpbmQoZnVuY3Rpb24gKG0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtMS5uYW1lID09PSBvYmpbaV1bcHJvcF07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChpdGVtKSB7IGNvbnRpbnVlOyB9XHJcblxyXG4gICAgICAgIGFyci5wdXNoKHtcclxuICAgICAgICAgICAgY2hlY2tlZDoga28ub2JzZXJ2YWJsZShmYWxzZSksXHJcbiAgICAgICAgICAgIG5hbWU6IG9ialtpXVtwcm9wXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFycjtcclxufTtcclxuXHJcbmV4cG9ydHMuY2hlY2tBY3RpdmUgPSBmdW5jdGlvbiBjaGVja0FjdGl2ZShrb0FyciwgYWN0aXZlRWxlbSkge1xyXG4gICAgaWYgKCFrb0FyciAmJiAhYWN0aXZlRWxlbSkge3JldHVybiBmYWxzZTt9XHJcblxyXG4gICAga29BcnIoa29BcnIoKS5tYXAoZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIGlmIChvYmoubmFtZSA9PT0gYWN0aXZlRWxlbSkge1xyXG4gICAgICAgICAgICBvYmouY2hlY2tlZCh0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvYmouY2hlY2tlZChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9KSk7XHJcbn07XHJcblxyXG5leHBvcnRzLml0ZXJhdGUgPSBmdW5jdGlvbiAob2JqKSB7XHJcblx0Zm9yICh2YXIgcHJvcGVydHkgaW4gb2JqKSB7XHJcblx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xyXG5cdFx0XHRpZiAodHlwZW9mIG9ialtwcm9wZXJ0eV0gPT0gXCJvYmplY3RcIikge1xyXG5cdFx0XHRcdGl0ZXJhdGUob2JqW3Byb3BlcnR5XSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ3wnICsgcHJvcGVydHkgKyBcIiB8ICBcIiArIG9ialtwcm9wZXJ0eV0gKyAnfCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2hlbHBlckZ1bmMuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcclxudmFyIGJhc2U7XHJcbnZhciBoZiA9IHJlcXVpcmUoJy4uL21vZHVsZXMvaGVscGVyRnVuYycpO1xyXG4vKipcclxuICogUGFyYW1zIFZpZXctTW9kZWxcclxuICogQHBhcmFtIHJhd1xyXG4gKiBAcGFyYW0gbWV0aG9kXHJcbiAqIEBwYXJhbSBwYXJhbXNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBQYXJhbXNWaWV3TW9kZWwocmF3LCBtZXRob2QsIHBhcmFtcykge1xyXG4gIGJhc2UgPSByYXc7XHJcbiAgc2VsZiA9IHRoaXM7XHJcbiAgdGhpcy5hbmltYXRpb25TcGVlZCA9IDIwMDtcclxuXHJcbiAgLy8gb2JzZXJ2YWJsZXNcclxuICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcclxuICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcclxuICB0aGlzLmlzSGlkZGVuID0ga28ub2JzZXJ2YWJsZSh0cnVlKTtcclxuICB0aGlzLnBhcmFtSW5Gb2N1cyA9IGtvLm9ic2VydmFibGUoJycpO1xyXG5cdHRoaXMucGFyYW1zTW9kZWwgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xyXG5cclxuXHQvLyBjb21wdXRlZFxyXG5cdC8vIHRoaXMucGFyYW1zTW9kZWwgPSBrby5jb21wdXRlZCh0aGlzLnVwZGF0ZVBhcmFtc01vZGVsLCB0aGlzKTtcclxuXHR0aGlzLnVwZGF0ZVZpZXdNb2RlbCgpO1xyXG5cdHRoaXMubWV0aG9kLnN1YnNjcmliZSh0aGlzLnVwZGF0ZVZpZXdNb2RlbCwgdGhpcyk7XHJcblxyXG5cdHRoaXMuaXNEaXJ0eSA9IGtvLmNvbXB1dGVkKHRoaXMuY2hlY2tEaXJ0eSwgdGhpcyk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogSW5pdGlhbCBidWlsZCBvZiBTZWxlY3QgTW9kZWxcclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUudXBkYXRlVmlld01vZGVsID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciBvYmogPSB0aGlzLm1ldGhvZCgpLnBhcmFtZXRlcnMgfHwge30sXHJcblx0XHRhcnIgPSBbXTtcclxuXHJcblx0Zm9yICh2YXIgaSBpbiBvYmopIHtcclxuXHRcdGlmICghb2JqLmhhc093blByb3BlcnR5KGkpKSB7Y29udGludWU7fVxyXG5cclxuXHRcdC8vIGNvcGllcyBhbGwgdmFsdWVzIGZyb20gbW9kZWwgdG8gdmlldy1tb2RlbFxyXG5cdFx0dmFyIHZtUGFyYW0gPSAkLmV4dGVuZCh7fSwgb2JqW2ldKTtcclxuXHJcblx0XHR2bVBhcmFtLnZhbHVlID0ga28ub2JzZXJ2YWJsZSh2bVBhcmFtLnZhbHVlIHx8ICh2bVBhcmFtLnNlbGVjdCAmJiB2bVBhcmFtLmRlZmF1bHQpIHx8ICcnKTtcclxuXHJcblx0XHQvL2FkZCBvYnNlcnZhYmxlIGZvciBzZWxlY3RlZCBvcHRpb25zXHJcblx0XHRpZiAodm1QYXJhbS5zZWxlY3QpIHtcclxuXHRcdFx0dm1QYXJhbS5vcHRpb25zID0ga28ub2JzZXJ2YWJsZUFycmF5KG9ialtpXS5vcHRpb25zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG5cdFx0XHRcdHZhciBvYmogPSAkLmV4dGVuZCh7fSwgaXRlbSk7XHJcblx0XHRcdFx0b2JqLmNoZWNrZWQgPSBrby5vYnNlcnZhYmxlKGl0ZW0uY2hlY2tlZCk7XHJcblx0XHRcdFx0cmV0dXJuIG9iajtcclxuXHRcdFx0fSkpXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gJ2RpcnR5JyBmbGFnIHdhdGNoZXIgZm9yIGN1cnJlbnQgZmllbGRcclxuXHRcdHZtUGFyYW0uaXNEaXJ0eSA9IGtvLnB1cmVDb21wdXRlZChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh0aGlzLnNlbGVjdCkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnZhbHVlKCkgIT09IHRoaXMuZGVmYXVsdCAmJiB0aGlzLnZhbHVlKCkgIT09ICdub25lJztcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gISEodGhpcy52YWx1ZSgpLnRvU3RyaW5nKCkpLnRyaW0oKS5sZW5ndGg7XHJcblx0XHR9LCB2bVBhcmFtKTtcclxuXHJcblx0XHQvLyBhZGQgY2FsZW5kYXIgYnRuIGZvciBjdXJyZW50IGZpZWxkXHJcblx0XHR2bVBhcmFtLmhhc0NhbGVuZGFyID0gaS5zZWFyY2goLyhkYXRlfHRpbWUpL2dtaSkgIT0gLTE7XHJcblxyXG5cdFx0Ly8gYWRkIHBvcC11cCBidG4gZm9yIGN1cnJlbnQgZmllbGRcclxuXHRcdHZtUGFyYW0uaGFzUG9wVXAgPSBpLnNlYXJjaCgvKGF0dHJhY3Rpb25JZHx2ZW51ZUlkKS9nbWkpICE9IC0xO1xyXG5cclxuXHRcdGFyci5wdXNoKHZtUGFyYW0pO1xyXG5cdH1cclxuXHJcblx0Ly8gcHJlcGFyZSBvdXRwdXQgZm9yIHJlcXVlc3RcclxuXHR0aGlzLnBhcmFtc01vZGVsKGFycik7XHJcblx0dGhpcy5wYXJhbUluRm9jdXModGhpcy5wYXJhbXNNb2RlbCgpWzBdKTtcclxuXHR0aGlzLnByZXBhcmVVcmxQYWlycyhhcnIsIHRoaXMucGFyYW1zKTtcclxuXHRyZXR1cm4gYXJyO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERpcnR5IHBhcmFtcyBmb3JtIG9ic2VydmFibGUgbWV0aG9kXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5jaGVja0RpcnR5ID0gZnVuY3Rpb24gKCkge1xyXG5cdHRoaXMucHJlcGFyZVVybFBhaXJzKHRoaXMucGFyYW1zTW9kZWwoKSwgdGhpcy5wYXJhbXMpO1xyXG5cdHZhciBkaXJ0eSA9IHRoaXMucGFyYW1zTW9kZWwoKS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdHJldHVybiBpdGVtLmlzRGlydHkoKSA9PT0gdHJ1ZTtcclxuXHR9KTtcclxuXHRyZXR1cm4gZGlydHkubGVuZ3RoID4gMDtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogRW50ZXIga2V5IGhhbmRsZXJcclxuICogQHBhcmFtIG1vZGVsXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5vbkVudGVyS2V5RG93biA9IGZ1bmN0aW9uIChtb2RlbCwgZXZlbnQpIHtcclxuICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICQoJyNhcGktZXhwLWdldC1idG4nKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogU2xpZGUgdG9nZ2xlIGZvciBwYXJhbXMgY29udGFpbmVyIG1ldGhvZFxyXG4gKiBAcGFyYW0gdmlld01vZGVsXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5zbGlkZVRvZ2dsZSA9IGZ1bmN0aW9uICh2aWV3TW9kZWwsIGV2ZW50KSB7XHJcbiAgJChldmVudC5jdXJyZW50VGFyZ2V0KVxyXG4gICAgLnBhcmVudHMoJy5qcy1zbGlkZS1jb250cm9sJylcclxuICAgIC5maW5kKCcuanMtc2xpZGUtd3JhcHBlcicpXHJcbiAgICAuc2xpZGVUb2dnbGUodmlld01vZGVsLmFuaW1hdGlvblNwZWVkLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZpZXdNb2RlbC5pc0hpZGRlbighdmlld01vZGVsLmlzSGlkZGVuKCkpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogTWFjaGVzIGZvY3VzZWQgcGFyYW1cclxuICogQHBhcmFtIGl0ZW1cclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUub25Gb2N1cyA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgc2VsZi5wYXJhbUluRm9jdXMoaXRlbSk7XHJcbn07XHJcblxyXG4vKipcclxuICogRmlsdGVycyBwYXJhbXMgYnkgZGVmaW5lZCB2YWx1ZVxyXG4gKiBAcGFyYW0gYXJyXHJcbiAqIEBwYXJhbSBrb09ic1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUucHJlcGFyZVVybFBhaXJzID0gZnVuY3Rpb24gKGFyciwga29PYnMpIHtcclxuICBpZiAoIWFyciAmJiAha29PYnMpIHtyZXR1cm4gZmFsc2U7fVxyXG5cclxuICByZXR1cm4ga29PYnMoYXJyLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgcmV0dXJuIChpdGVtLnZhbHVlKCkgfHwgaXRlbS5kZWZhdWx0KTtcclxuICB9KSk7XHJcbn07XHJcblxyXG4vKipcclxuICogT24gc2VsZWN0IHZhbHVlIGhhbmRsZXIgZm9yIHBhcmFtcyBzZWxlY3RcclxuICogQHBhcmFtIHBhcmFtIHtvYmplY3R9IHBhcmFtZXRlciB2aWV3LW1vZGVsXHJcbiAqIEBwYXJhbSBvcHRpb24ge29iamVjdH0gb3B0aW9uIHZpZXctbW9kZWxcclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUub25TZWxlY3RQYXJhbVZhbHVlID0gZnVuY3Rpb24gKHBhcmFtLCBvcHRpb24pIHtcclxuXHRoZi5jaGVja0FjdGl2ZShwYXJhbS5vcHRpb25zLCBvcHRpb24ubmFtZSk7XHJcblx0cGFyYW0udmFsdWUob3B0aW9uLm5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFBhcmFtcyBjbGVhciBidXR0b24gaGFuZGxlclxyXG4gKiBAcGFyYW0gdm0ge29iamVjdH0gdmlldyBtb2RlbFxyXG4gKiBAcGFyYW0gZSB7b2JqZWN0fSBldmVudFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5vblBhcmFtc0NsZWFyID0gZnVuY3Rpb24gKHZtLCBlKSB7XHJcblx0dGhpcy51cGRhdGVWaWV3TW9kZWwoKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGFyYW1zVmlld01vZGVsO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvcGFyYW1zVmlld01vZGVsLmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGhmID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9oZWxwZXJGdW5jJyk7XHJcbnZhciBzZWxmO1xyXG52YXIgYmFzZTtcclxudmFyIGNhdGVnb3J5O1xyXG5cclxuLyoqXHJcbiAqIE1ldGhvZHMgVmlldy1Nb2RlbFxyXG4gKiBAcGFyYW0gcmF3XHJcbiAqIEBwYXJhbSBjYXRlZ29yeVxyXG4gKiBAcGFyYW0gbWV0aG9kXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gTWV0aG9kc1ZpZXdNb2RlbChyYXcsIGNhdGVnb3J5LCBtZXRob2QpIHtcclxuICBzZWxmID0gdGhpcztcclxuICBiYXNlID0gcmF3O1xyXG5cclxuICAvLyBvYnNlcnZhYmxlc1xyXG4gIHRoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcclxuICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcclxuICB0aGlzLnRvZ2dsZVBvcFVwID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcbiAgdGhpcy5yYWRpb3NNb2RlbCA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XHJcbiAgdGhpcy5tZXRob2RzVmlld01vZGVsID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcclxuICB0aGlzLnVwZGF0ZU1vZGVsKHRoaXMuY2F0ZWdvcnkoKSk7XHJcbiAgdGhpcy5jYXRlZ29yeS5zdWJzY3JpYmUodGhpcy51cGRhdGVNb2RlbCwgdGhpcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBPbiBjYXRlZ29yeSBjaGFuZ2UgaGFuZGxlclxyXG4gKiBNZXRob2RzIFZpZXctTW9kZWwgbWV0aG9kXHJcbiAqIEBwYXJhbSBjYXRlZ29yeVxyXG4gKi9cclxuTWV0aG9kc1ZpZXdNb2RlbC5wcm90b3R5cGUudXBkYXRlTW9kZWwgPSBmdW5jdGlvbiAoY2F0ZWdvcnkpIHtcclxuICAvLyBpbml0aWFsIHJhZGlvcyBtb2RlbFxyXG4gIHNlbGYudXBkYXRlUmFkaW9zTW9kZWwoYmFzZVtjYXRlZ29yeV0pO1xyXG4gIC8vIGluaXRpYWwgc2VsZWN0IG1vZGVsIChmaXJzdCBtZXRob2QgaW4gZmlyc3Qgc2VjdGlvbiBmb3Igc3RhcnQpXHJcbiAgc2VsZi51cGRhdGVTZWxlY3Qoc2VsZi5yYWRpb3NNb2RlbCgpWzBdKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBPbmNoYW5nZSBoYW5kbGVyIGZvciBSYWRpbyBidXR0b25zXHJcbiAqIEBwYXJhbSBpdGVtXHJcbiAqL1xyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS5vbmNoYW5nZVJhZGlvcyA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgLy91cGRhdGUgUmFkaW9zIE1vZGVsXHJcbiAgaGYuY2hlY2tBY3RpdmUoc2VsZi5yYWRpb3NNb2RlbCwgaXRlbS5uYW1lKTtcclxuICAvL3VwZGF0ZSBTZWxlY3QgTW9kZWxcclxuICBzZWxmLnVwZGF0ZVNlbGVjdChpdGVtKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsIGJ1aWxkIG9mIFJhZGlvcyBNb2RlbFxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKi9cclxuTWV0aG9kc1ZpZXdNb2RlbC5wcm90b3R5cGUudXBkYXRlUmFkaW9zTW9kZWwgPSBmdW5jdGlvbiAocGFyYW0pIHtcclxuICB2YXIgb2JqID0gcGFyYW0gfHwge30sXHJcbiAgICBhcnIgPSBbXTtcclxuXHJcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcclxuICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGkpKSB7IGNvbnRpbnVlOyB9XHJcbiAgICB2YXIgaXRlbSA9IHtcclxuICAgICAgY2hlY2tlZDoga28ub2JzZXJ2YWJsZShpID09PSAnQUxMJyksXHJcbiAgICAgIG5hbWU6IGlcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGkgPT09ICdBTEwnKSB7XHJcbiAgICAgIGFyci51bnNoaWZ0KGl0ZW0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhcnIucHVzaChpdGVtKTtcclxuICAgIH1cclxuICB9XHJcblx0YXJyID0gYXJyLnNvcnQoY29tcGFyZU1ldGhvZHMpO1xyXG4gIHRoaXMucmFkaW9zTW9kZWwoYXJyKTtcclxuICByZXR1cm4gYXJyO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWwgYnVpbGQgb2YgU2VsZWN0IE1vZGVsXHJcbiAqIEBwYXJhbSBpdGVtXHJcbiAqL1xyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS51cGRhdGVTZWxlY3QgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gIHZhciBvYmogPSBiYXNlW3NlbGYuY2F0ZWdvcnkoKV1baXRlbS5uYW1lXXx8IHt9LFxyXG4gICAgYXJyID0gW10sXHJcbiAgICBjb3VudCA9IDA7XHJcblxyXG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XHJcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShpKSkgeyBjb250aW51ZTsgfVxyXG4gICAgdmFyIHByb3BlcnR5ID0gb2JqW2ldO1xyXG5cdFx0Ly8gY29waWVzIGFsbCB2YWx1ZXMgZnJvbSBtb2RlbCB0byB2aWV3LW1vZGVsXHJcblx0XHR2YXIgdm1NZXRob2QgPSAkLmV4dGVuZCh7fSwgcHJvcGVydHkpO1xyXG5cclxuXHRcdGRlbGV0ZSB2bU1ldGhvZC5wYXJhbWV0ZXJzO1xyXG5cdFx0dm1NZXRob2QuY2hlY2tlZCA9IGtvLm9ic2VydmFibGUoIWNvdW50KTtcclxuXHJcblx0XHRhcnIucHVzaCh2bU1ldGhvZCk7XHJcblxyXG4gICAgLy8gc2V0IGdsb2JhbCBvYnNlcnZhYmxlXHJcbiAgICAhY291bnQgJiYgdGhpcy5tZXRob2QoYmFzZVtwcm9wZXJ0eS5jYXRlZ29yeV1bcHJvcGVydHkubWV0aG9kXVtwcm9wZXJ0eS5pZF0pO1xyXG5cclxuICAgIGNvdW50Kys7XHJcblxyXG4gIH1cclxuXHJcblx0dGhpcy5tZXRob2RzVmlld01vZGVsKGFycik7XHJcblx0cmV0dXJuIGFycjtcclxufTtcclxuXHJcbk1ldGhvZHNWaWV3TW9kZWwucHJvdG90eXBlLm9uU2VsZWN0TWV0aG9kID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICBoZi5jaGVja0FjdGl2ZShzZWxmLm1ldGhvZHNWaWV3TW9kZWwsIGl0ZW0ubmFtZSk7XHJcbiAgc2VsZi5tZXRob2QoYmFzZVtpdGVtLmNhdGVnb3J5XVtpdGVtLm1ldGhvZF1baXRlbS5pZF0pO1xyXG59O1xyXG5cclxuTWV0aG9kc1ZpZXdNb2RlbC5wcm90b3R5cGUub25BYm91dENsaWNrID0gZnVuY3Rpb24gKG1vZGVsLCBldmVudCkge1xyXG4gIG1vZGVsLnRvZ2dsZVBvcFVwKCFtb2RlbC50b2dnbGVQb3BVcCgpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTb3J0IGZ1bmN0aW9uIGZvciBtZXRob2RzIGFyYXlcclxuICogQHBhcmFtIGZcclxuICogQHBhcmFtIHNcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbmZ1bmN0aW9uIGNvbXBhcmVNZXRob2RzKGYscykge1xyXG5cdHZhciBhID0gZi5uYW1lLnRvVXBwZXJDYXNlKCk7XHJcblx0dmFyIGIgPSBzLm5hbWUudG9VcHBlckNhc2UoKTtcclxuXHJcblx0aWYgKGEgPT09IGIpIHtyZXR1cm4gMDt9XHJcblx0aWYgKGEgPT09ICdBTEwnIHx8XHJcblx0XHQoYSA9PT0gJ0dFVCcgJiYgKGIgPT09ICdQT1NUJyB8fCBiID09PSAnUFVUJyB8fCBiID09PSAnREVMRVRFJykpIHx8XHJcblx0XHQoYSA9PT0gJ1BPU1QnICYmIChiID09PSAnUFVUJyB8fCBiID09PSAnREVMRVRFJykpIHx8XHJcblx0XHQoYSA9PT0gJ1BVVCcgJiYgYiA9PT0gJ0RFTEVURScpKSB7XHJcblx0XHRyZXR1cm4gLTE7XHJcblx0fVxyXG5cdHJldHVybiAxO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1ldGhvZHNWaWV3TW9kZWw7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvVmlld01vZGVscy9tZXRob2RzVmlld01vZGVsLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBqc29uSGlnaGxpZ2h0ID0gcmVxdWlyZSgnLi8uLi9tb2R1bGVzL2pzb24taGlnaGxpZ2h0Jyk7XG52YXIgc2xpZGVyID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9zbGlkZXInKTtcbnZhciBmaWx0ZXIgPSByZXF1aXJlKCcuLi8uLi9jb25maWcuanNvbicpO1xudmFyIHNlbGY7XG52YXIgY29sb3JzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb2xvckNsYXNzZXMnKS5jb2xvcnM7XG5cbmZ1bmN0aW9uIFJlcXVlc3RzTGlzdFZpZXdNb2RlbChyZXF1ZXN0cywgc2VsZWN0ZWRQYXJhbXMsIHNoYXJlUGF0aCkge1xuXHR0aGlzLnVybCA9IHNlbGVjdGVkUGFyYW1zO1xuXHRzZWxmID0gdGhpcztcblx0dGhpcy5jb2xvcnMgPSBjb2xvcnM7XG5cdHRoaXMuc2hhcmVQYXRoID0gc2hhcmVQYXRoO1xuXHR0aGlzLnJlcXVlc3RzID0gcmVxdWVzdHM7XG5cdHRoaXMuaXNBY3RpdmVUYWIgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcblx0dGhpcy52aWV3TW9kZWwgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xuXHR0aGlzLmNsZWFyQnRuSXNWaXNpYmxlID0ga28uY29tcHV0ZWQodGhpcy5faXNWaXNpYmxlLCB0aGlzKTtcblx0dGhpcy5yZXF1ZXN0cy5zdWJzY3JpYmUodGhpcy51cGRhdGVNb2RlbCwgdGhpcyk7XG59XG5cbi8qKlxuICogVXBkYXRlIFZpZXdtb2RlbCBvZiByZXF1ZXN0IGxpc3RcbiAqIEBwYXJhbSBhcnJcbiAqL1xuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS51cGRhdGVNb2RlbCA9IGZ1bmN0aW9uIChhcnIpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcblx0dmFyIG5ld01vZGVsID0gdGhpcy5yZXF1ZXN0cygpXG5cdFx0Lm1hcChmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHR2YXIgaXRlbSA9ICAkLmV4dGVuZCh7fSwgb2JqLCB7XG5cdFx0XHRcdGNvbG9yOiBzZWxmLmNvbG9yc1tvYmouaW5kZXggJSBzZWxmLmNvbG9ycy5sZW5ndGhdLFxuXHRcdFx0XHRhY3RpdmU6IGtvLm9ic2VydmFibGUoZmFsc2UpLFxuXHRcdFx0XHRjb3BpZWRGb3JTaGFyZToga28ub2JzZXJ2YWJsZShmYWxzZSksXG5cdFx0XHRcdGNvcGllZFVybDoga28ub2JzZXJ2YWJsZShmYWxzZSksXG5cdFx0XHRcdHJlc0hUTUw6IGtvLm9ic2VydmFibGUoJycpXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH0pO1xuXHRzbGlkZXIucmVtb3ZlKHNlbGYudmlld01vZGVsKCkubGVuZ3RoKTtcblx0c2VsZi52aWV3TW9kZWwobmV3TW9kZWwpO1xuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRzbGlkZXIuc2V0KHNlbGYudmlld01vZGVsKCkubGVuZ3RoKTtcblx0XHQkKCcjc2hvdy1kZXRhaWxzLTAnKS50cmlnZ2VyKCdjbGljaycpO1xuXHR9LCAxMCk7XG59O1xuXG4vKipcbiAqIGdldCBkZXRhaWxzXG4gKiBAcGFyYW0gZGF0YVxuICovXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLmdldE1vcmUgPSBmdW5jdGlvbiAoaWQsIGRhdGEpIHtcblx0dmFyIHBhbmVsR3JvdXAgPSB0aGlzLnBhbmVsR3JvdXA7XG5cdHZhciBwYW5lbCA9IHRoaXM7XG5cdHZhciBjdXJyZW50U2xpZGVyID0gJCgnI3NsaWRlci0nICsgcGFuZWxHcm91cC5zZWN0aW9uSW5kZXgpO1xuXHR2YXIgY29tcG9uZW50ID0gJCgnPHNlY3Rpb24gZGF0YS1iaW5kPVwiY29tcG9uZW50OiB7bmFtZTogXFwncGFuZWwtZ3JvdXBcXCcsIHBhcmFtczogcGFyYW1zfVwiPjwvc2VjdGlvbj4nKTtcblx0dmFyIGN1cnNsaWNrID0gY3VycmVudFNsaWRlci5zbGljaygnZ2V0U2xpY2snKTtcblx0XG5cdC8vIGV4dGVuZGluZyBhZGRpdGlvbmFsIGRhdGEgKGNvcHkpXG5cdHZhciBwYXJhbXMgPSAkLmV4dGVuZCh7fSwgcGFuZWxHcm91cCwge1xuXHRcdGRhdGE6IGRhdGEsXG5cdFx0Z3JvdXBJbmRleDogcGFuZWxHcm91cC5ncm91cEluZGV4ICsgMSxcblx0XHRfcHJvcFRpdGxlOiB0eXBlb2YgaWQgPT09ICdzdHJpbmcnICYmIGlkLFxuXHRcdGNvbmZpZzogcGFuZWwuY29uZmlnXG5cdH0pO1xuXG5cdC8vIGFwcGx5IGNvbXBvbmVudCBkYXRhIGJpbmRpbmdzXG5cdGtvLmFwcGx5QmluZGluZ3Moe1xuXHRcdHBhcmFtczogcGFyYW1zXG5cdH0sIGNvbXBvbmVudFswXSk7XG5cdFxuXHQvLyBhZGQgc2xpZGUgd2l0aCBzZWxlY3RlZCBkYXRhXG5cdGN1cnJlbnRTbGlkZXIuc2xpY2soJ3NsaWNrQWRkJywgY29tcG9uZW50KTtcblx0XG5cdC8vIHJlbW92ZSBvdXRzdGFuZGluZyBzbGlkZXNcblx0Zm9yICh2YXIgaSA9IGN1cnNsaWNrLnNsaWRlQ291bnQgLSAyOyBpID4gcGFuZWxHcm91cC5ncm91cEluZGV4OyBpLS0pIHtcblx0XHRjdXJyZW50U2xpZGVyLnNsaWNrKCdzbGlja1JlbW92ZScsIGksIGZhbHNlKTtcblx0fVxuXHQvLyBtb3ZlIHRvIG5leHQgc2xpZGVcblx0Y3VycmVudFNsaWRlci5zbGljaygnc2xpY2tOZXh0Jyk7XG59O1xuXG4vKipcbiAqIFZpc2liaWxpdHkgZmxhZyBmb3IgQ2xlYXIgYnRuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUuX2lzVmlzaWJsZSA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUodGhpcy5yZXF1ZXN0cykubGVuZ3RoID4gMDtcbn07XG5cbi8qKlxuICogQ2xlYXIgcmVxdWVzdHN0cyBsaXN0IGhhbmRsZXJcbiAqIEBwYXJhbSB2bVxuICogQHBhcmFtIGV2ZW50XG4gKi9cblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUub25DbGVhclJlcXVlc3RzID0gZnVuY3Rpb24gKHZtLCBldmVudCkge1xuXHR0aGlzLnJlcXVlc3RzKFtdKTtcbn07XG5cbi8qKlxuICogRGV0YWlscyB0b2dnbGUgaGFuZGxlclxuICogQHBhcmFtIHZtXG4gKiBAcGFyYW0gZXZlbnRcbiAqL1xuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5nZXREZXRhaWxzID0gZnVuY3Rpb24gKHZtLCBldmVudCkge1xuXHRpZiAoIXRoaXMucmVzSFRNTCgpLmxlbmd0aCkge1xuXHRcdGpzb25IaWdobGlnaHQodGhpcy5yZXNIVE1MLCB0aGlzLnJlcyk7XG5cdH1cblx0dGhpcy5hY3RpdmUoIXRoaXMuYWN0aXZlKCkpO1xufTtcblxuLyoqXG4gKiBKb2luIHN0cmluZyBmb3IgaWQnc1xuICogQHBhcmFtIHNcbiAqIEBwYXJhbSBpXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLmdldFN0ciA9IGZ1bmN0aW9uIChzLCBpKSB7XG5cdHZhciBzdHIgPSBzO1xuXHR2YXIgaTEgPSBpID8gaSgpIDogJyc7XG5cdHJldHVybiBbXG5cdFx0c3RyLFxuXHRcdGkxXG5cdF0uam9pbignLScpO1xufTtcblxuLyoqXG4gKiBHZXQgcmF3IHJlc3BvbnNlIGRhdGFcbiAqIEBwYXJhbSBtb2RlbCB7b2JqZWN0fVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5nZXRSYXdEYXRhID0gZnVuY3Rpb24gKG1vZGVsKSB7XG5cdHZhciBjb250ZW50ID0gbW9kZWwucmVzLnJlcztcblx0dmFyIHJhd1dpbmRvdyA9IHdpbmRvdy5vcGVuKFwiZGF0YTp0ZXh0L2pzb24sXCIgKyBlbmNvZGVVUkkoSlNPTi5zdHJpbmdpZnkoY29udGVudCwgbnVsbCwgMikpLCAnX2JsYW5rJyk7XG5cdHJhd1dpbmRvdy5mb2N1cygpO1xufTtcblxuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5jb3B5VXJsID0gZnVuY3Rpb24gKG1vZGVsLCBldmVudCkge1xuXHR2YXIgY3VycmVudEZpZWxkID0gdGhpcztcblx0dmFyIGVsZW1lbnQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuXHRzZWxmLmNsaXBib2FyZCA9IG5ldyBDbGlwYm9hcmQoZWxlbWVudCk7XG5cdHNlbGYuY2xpcGJvYXJkLm9uKCdzdWNjZXNzJywgZnVuY3Rpb24gb25TdWNjZXNzQ29weShlKSB7XG5cdFx0Y29uc29sZS5pbmZvKCdBY3Rpb246JywgZS5hY3Rpb24pO1xuXHRcdGNvbnNvbGUuaW5mbygnVGV4dDonLCBlLnRleHQpO1xuXHRcdGNvbnNvbGUuaW5mbygnVHJpZ2dlcjonLCBlLnRyaWdnZXIpO1xuXHRcdCQoZWxlbWVudCkuaGFzQ2xhc3MoJ2J0bi1zaGFyZScpID8gY3VycmVudEZpZWxkLmNvcGllZEZvclNoYXJlKHRydWUpIDogY3VycmVudEZpZWxkLmNvcGllZFVybCh0cnVlKTtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdCQoZWxlbWVudCkuaGFzQ2xhc3MoJ2J0bi1zaGFyZScpID8gY3VycmVudEZpZWxkLmNvcGllZEZvclNoYXJlKGZhbHNlKSA6IGN1cnJlbnRGaWVsZC5jb3BpZWRVcmwoZmFsc2UpO1xuXHRcdH0sIDUwMCk7XG5cdFx0ZS5jbGVhclNlbGVjdGlvbigpO1xuXHR9KVxuXHRcdC5vbignZXJyb3InLCBmdW5jdGlvbiBvbkVycm9yQ29weShlKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdBY3Rpb246JywgZS5hY3Rpb24pO1xuXHRcdFx0Y29uc29sZS5lcnJvcignVHJpZ2dlcjonLCBlLnRyaWdnZXIpO1xuXHRcdH0pO1xufTtcblxuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5yZW1vdmVIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuXHRzZWxmLmNsaXBib2FyZCAmJiBzZWxmLmNsaXBib2FyZC5kZXN0cm95KCk7XG5cdGRlbGV0ZSBzZWxmLmNsaXBib2FyZDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVxdWVzdHNMaXN0Vmlld01vZGVsO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9WaWV3TW9kZWxzL3JlcXVlc3RzTGlzdFZpZXdNb2RlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgV29ya2VyID0gcmVxdWlyZSgnLi9oaWdobGlnaHRKc29uLndvcmtlci5qcycpOyAvLyBKc29uLWZvcm1hdHRlciB3b3JrZXJcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9ic2VydmFibGUsIGNvZGUpIHtcclxuXHR2YXIgYW5pbVRpbWUgPSAxMDA7XHJcblx0dmFyIHdvcmtlciA9IG5ldyBXb3JrZXI7XHJcblxyXG5cdHdvcmtlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdG9ic2VydmFibGUoZXZlbnQuZGF0YSk7XHJcblxyXG5cdFx0JChkb2N1bWVudClcclxuXHRcdFx0Lm9uKCdjbGljayB0b3VjaCcsICcudG0tY29kZS1jb250YWluZXIgLmV4cGFuZGVkJywgZnVuY3Rpb24ganNvbkNvZGVDb250YWluZXJFeHBhbmRlZChlKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0dmFyICRzZWxmID0gJCh0aGlzKTtcclxuXHRcdFx0XHQkc2VsZlxyXG5cdFx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0XHQuZmluZCgnPnVsJylcclxuXHRcdFx0XHRcdC5zbGlkZVVwKGFuaW1UaW1lLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0JHNlbGYuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdH0pXHJcblx0XHRcdC5vbignY2xpY2sgdG91Y2gnLCAnLnRtLWNvZGUtY29udGFpbmVyIC5leHBhbmRlZC5jb2xsYXBzZWQnLCBmdW5jdGlvbiBqc29uQ29kZUNvbnRhaW5lckNvbGxhcHNlZChlKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0dmFyICRzZWxmID0gJCh0aGlzKTtcclxuXHRcdFx0XHQkc2VsZlxyXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKVxyXG5cdFx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0XHQuZmluZCgnPnVsJylcclxuXHRcdFx0XHRcdC5zbGlkZURvd24oYW5pbVRpbWUsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHQkc2VsZlxyXG5cdFx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnY29sbGFwc2VkJylcclxuXHRcdFx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdH0pXHJcblx0fTtcclxuXHR3b3JrZXIub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0Y29uc29sZS5lcnJvcihldmVudCk7XHJcblx0fTtcclxuXHJcblx0d29ya2VyLnBvc3RNZXNzYWdlKGNvZGUpO1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvanNvbi1oaWdobGlnaHQuanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHJlcXVpcmUoXCIhIUQ6XFxcXHRpY2tldG1hc3Rlci1hcGktc3RhZ2luZy5naXRodWIuaW9cXFxcbm9kZV9tb2R1bGVzXFxcXHdvcmtlci1sb2FkZXJcXFxcY3JlYXRlSW5saW5lV29ya2VyLmpzXCIpKFwiLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxcbi8qKioqKiovIFxcdC8vIFRoZSBtb2R1bGUgY2FjaGVcXG4vKioqKioqLyBcXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cXG4vKioqKioqLyBcXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHRcXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcXG4vKioqKioqLyBcXHRcXHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcXG4vKioqKioqLyBcXHRcXHRcXHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdFxcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXFxuLyoqKioqKi8gXFx0XFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xcbi8qKioqKiovIFxcdFxcdFxcdGV4cG9ydHM6IHt9LFxcbi8qKioqKiovIFxcdFxcdFxcdGlkOiBtb2R1bGVJZCxcXG4vKioqKioqLyBcXHRcXHRcXHRsb2FkZWQ6IGZhbHNlXFxuLyoqKioqKi8gXFx0XFx0fTtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdFxcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxcbi8qKioqKiovIFxcdFxcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0XFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxcbi8qKioqKiovIFxcdFxcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0XFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcXG4vKioqKioqLyBcXHRcXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XFxuLyoqKioqKi8gXFx0fVxcbi8qKioqKiovXFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxcbi8qKioqKiovIFxcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxcbi8qKioqKiovIFxcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xcbi8qKioqKiovIFxcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFxcXCJcXFwiO1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXFxuLyoqKioqKi8gXFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XFxuLyoqKioqKi8gfSlcXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xcbi8qKioqKiovIChbXFxuLyogMCAqL1xcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xcblxcblxcdC8qKlxcclxcblxcdCAqIENvZGUgZm9ybWF0IHdlYi13b3JrZXJcXHJcXG5cXHQgKiBAcGFyYW0gZXZlbnRcXHJcXG5cXHQgKi9cXHJcXG5cXHQvLyB2YXIgaGlnaGxpZ2h0SnNvbigpXFxyXFxuXFx0dmFyIGhpZ2hsaWdodEpzb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xcclxcblxcdFxcclxcblxcdG9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XFxyXFxuXFx0ICB2YXIgY29kZSA9IGV2ZW50LmRhdGE7XFxyXFxuXFx0ICAvLyBpbXBvcnRTY3JpcHRzKCdqc29uLXBhcnNlLmpzJyk7XFxyXFxuXFx0ICB2YXIgcmVzdWx0ID0gaGlnaGxpZ2h0SnNvbihjb2RlLCB7ZXhwYW5kZWQ6IHRydWV9KTtcXHJcXG5cXHQgIC8vIHZhciByZXN1bHQgPUpTT04uc3RyaW5naWZ5KGNvZGUpO1xcclxcblxcdCAgcG9zdE1lc3NhZ2UocmVzdWx0KTtcXHJcXG5cXHR9O1xcclxcblxcblxcbi8qKiovIH0sXFxuLyogMSAqL1xcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xcblxcblxcdHZhciBwcmVmaXggPSAndG0tY29kZSc7XFxyXFxuXFx0XFxyXFxuXFx0dmFyIGdldEV4cGFuZGVyQ2xhc3NlcyA9IGZ1bmN0aW9uIChleHBhbmRlZCkge1xcclxcblxcdFxcdGlmICghZXhwYW5kZWQpIHtcXHJcXG5cXHRcXHRcXHRyZXR1cm4gJ2V4cGFuZGVkIGNvbGxhcHNlZCBoaWRkZW4nO1xcclxcblxcdFxcdH1cXHJcXG5cXHRcXHRyZXR1cm4gJ2V4cGFuZGVkJztcXHJcXG5cXHR9O1xcclxcblxcdFxcclxcblxcdHZhciBlbmNvZGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcXHJcXG5cXHRcXHRyZXR1cm4gWyc8c3Bhbj4nLCB2YWx1ZSwgJzwvc3Bhbj4nXS5qb2luKCcnKTtcXHJcXG5cXHR9O1xcclxcblxcdFxcclxcblxcdHZhciBjcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUsIHR5cGUsIGV4cGFuZGVyQ2xhc3Nlcykge1xcclxcblxcdFxcdHZhciBrbGFzcyA9ICdvYmplY3QnLFxcclxcblxcdFxcdFxcdG9wZW4gPSAneycsXFxyXFxuXFx0XFx0XFx0Y2xvc2UgPSAnfSc7XFxyXFxuXFx0XFxyXFxuXFx0XFx0aWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XFxyXFxuXFx0XFx0XFx0a2xhc3MgPSAnYXJyYXknO1xcclxcblxcdFxcdFxcdG9wZW4gPSAnWyc7XFxyXFxuXFx0XFx0XFx0Y2xvc2UgPSAnXSc7XFxyXFxuXFx0XFx0fVxcclxcblxcdFxcclxcblxcdFxcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xcclxcblxcdFxcdFxcdHJldHVybiBbXFxyXFxuXFx0XFx0XFx0XFx0JzxsaT4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwia2V5XFxcIj5cXFwiJywgZW5jb2RlKGtleSksICdcXFwiOiA8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcIm51bGxcXFwiPlxcXCInLCBlbmNvZGUodmFsdWUpLCAnXFxcIjwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdCc8L2xpPidcXHJcXG5cXHRcXHRcXHRdLmpvaW4oJycpO1xcclxcblxcdFxcdH1cXHJcXG5cXHRcXHJcXG5cXHRcXHRpZiAodHlwZSA9PSAnb2JqZWN0Jykge1xcclxcblxcdFxcdFxcdHJldHVybiBbXFxyXFxuXFx0XFx0XFx0XFx0JzxsaT4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwiJywgZXhwYW5kZXJDbGFzc2VzLCAnXFxcIj48L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcImtleVxcXCI+XFxcIicsIGVuY29kZShrZXkpLCAnXFxcIjogPC9zcGFuPiAnLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwib3BlblxcXCI+Jywgb3BlbiwgJzwvc3Bhbj4gJyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHVsIGNsYXNzPVxcXCInLCBrbGFzcywgJ1xcXCI+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRqc29uMmh0bWwodmFsdWUsIGV4cGFuZGVyQ2xhc3NlcyksXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzwvdWw+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcImNsb3NlXFxcIj4nLCBjbG9zZSwgJzwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdCc8L2xpPidcXHJcXG5cXHRcXHRcXHRdLmpvaW4oJycpO1xcclxcblxcdFxcdH1cXHJcXG5cXHRcXHJcXG5cXHRcXHRpZiAodHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdib29sZWFuJykge1xcclxcblxcdFxcdFxcdHJldHVybiBbXFxyXFxuXFx0XFx0XFx0XFx0JzxsaT4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwia2V5XFxcIj5cXFwiJywgZW5jb2RlKGtleSksICdcXFwiOiA8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcIicsIHR5cGUsICdcXFwiPicsIGVuY29kZSh2YWx1ZSksICc8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHRcXHQnPC9saT4nXFxyXFxuXFx0XFx0XFx0XS5qb2luKCcnKTtcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFx0cmV0dXJuIFtcXHJcXG5cXHRcXHRcXHQnPGxpPicsXFxyXFxuXFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJrZXlcXFwiPlxcXCInLCBlbmNvZGUoa2V5KSwgJ1xcXCI6IDwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwiJywgdHlwZSwgJ1xcXCI+XFxcIicsIGVuY29kZSh2YWx1ZSksICdcXFwiPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0JzwvbGk+J1xcclxcblxcdFxcdF0uam9pbignJyk7XFxyXFxuXFx0fTtcXHJcXG5cXHRcXHJcXG5cXHR2YXIganNvbjJodG1sID0gZnVuY3Rpb24gKGpzb24sIGV4cGFuZGVyQ2xhc3Nlcykge1xcclxcblxcdFxcdHZhciBodG1sID0gJyc7XFxyXFxuXFx0XFx0Zm9yICh2YXIga2V5IGluIGpzb24pIHtcXHJcXG5cXHRcXHRcXHRpZiAoIWpzb24uaGFzT3duUHJvcGVydHkoa2V5KSkge1xcclxcblxcdFxcdFxcdFxcdGNvbnRpbnVlO1xcclxcblxcdFxcdFxcdH1cXHJcXG5cXHRcXHJcXG5cXHRcXHRcXHRodG1sID0gW2h0bWwsIGNyZWF0ZUVsZW1lbnQoa2V5LCBqc29uW2tleV0sIHR5cGVvZiBqc29uW2tleV0sIGV4cGFuZGVyQ2xhc3NlcyldLmpvaW4oJycpO1xcclxcblxcdFxcdH1cXHJcXG5cXHRcXHRyZXR1cm4gaHRtbDtcXHJcXG5cXHR9O1xcclxcblxcdFxcclxcblxcdHZhciBnZXRKc29uVmlld2VyID0gZnVuY3Rpb24gKGRhdGEsIG9wdGlvbnMpIHtcXHJcXG5cXHRcXHR0cnkge1xcclxcblxcdFxcdFxcdHJldHVybiBbXFxyXFxuXFx0XFx0XFx0XFx0Jzx1bCBjbGFzcz1cXFwiJywgcHJlZml4LCAnLWNvbnRhaW5lclxcXCI+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHRqc29uMmh0bWwoW0pTT04ucGFyc2UoZGF0YSldLCBnZXRFeHBhbmRlckNsYXNzZXMob3B0aW9ucy5leHBhbmRlZCkpLFxcclxcblxcdFxcdFxcdFxcdCc8L3VsPidcXHJcXG5cXHRcXHRcXHRdLmpvaW4oJycpO1xcclxcblxcdFxcdH0gY2F0Y2ggKGUpIHtcXHJcXG5cXHRcXHRcXHRyZXR1cm4gW1xcclxcblxcdFxcdFxcdFxcdCc8ZGl2IGNsYXNzPVxcXCInLCBwcmVmaXgsICctZXJyb3JcXFwiID4nLCBlLnRvU3RyaW5nKCksICcgPC9kaXY+J1xcclxcblxcdFxcdFxcdF0uam9pbignJyk7XFxyXFxuXFx0XFx0fVxcclxcblxcdH07XFxyXFxuXFx0XFxyXFxuXFx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkYXRhLCBvcHQpIHtcXHJcXG5cXHRcXHR2YXIganNvbiA9ICcnO1xcclxcblxcdFxcdHZhciBvcHRpb25zID0gb3B0IHx8IHtleHBhbmRlZDogdHJ1ZX07XFxyXFxuXFx0XFx0aWYgKHR5cGVvZiBkYXRhID09ICdzdHJpbmcnKSB7XFxyXFxuXFx0XFx0XFx0anNvbiA9IGRhdGE7XFxyXFxuXFx0XFx0fSBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PSAnb2JqZWN0Jykge1xcclxcblxcdFxcdFxcdGpzb24gPSBKU09OLnN0cmluZ2lmeShkYXRhKVxcclxcblxcdFxcdH1cXHJcXG5cXHRcXHRyZXR1cm4gZ2V0SnNvblZpZXdlcihqc29uLCBvcHRpb25zKTtcXHJcXG5cXHR9O1xcclxcblxcblxcbi8qKiovIH1cXG4vKioqKioqLyBdKTtcXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbmRsWW5CaFkyczZMeTh2ZDJWaWNHRmpheTlpYjI5MGMzUnlZWEFnTkRjeFlqRXdaRFEwWTJFM01qZ3daVEV4TkdFaUxDSjNaV0p3WVdOck9pOHZMeTR2YzJOeWFYQjBjeTloY0drdFpYaHdiRzl5WlhJdmRqSXZjM0pqTDIxdlpIVnNaWE12YUdsbmFHeHBaMmgwU25OdmJpNTNiM0pyWlhJdWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmMyTnlhWEIwY3k5aGNHa3RaWGh3Ykc5eVpYSXZkakl2YzNKakwyMXZaSFZzWlhNdmFuTnZiaTF3WVhKelpTNXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNkVUpCUVdVN1FVRkRaanRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN08wRkJSMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN096czdPenRCUTNSRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNjVU5CUVc5RExHVkJRV1U3UVVGRGJrUTdRVUZEUVR0QlFVTkJPenM3T3pzN08wRkRZa0U3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEVzV1VGQlZ6dEJRVU5ZTEdGQlFWazdPMEZCUlZvN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4SFFVRkZPMEZCUTBZN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFc2QwSkJRWFZDTzBGQlEzWkNPMEZCUTBFN1FVRkRRU3hIUVVGRk8wRkJRMFk3UVVGRFFUdEJRVU5CTzBGQlEwRWlMQ0ptYVd4bElqb2lhR2xuYUd4cFoyaDBTbk52Ymk1M2IzSnJaWEl1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SWdYSFF2THlCVWFHVWdiVzlrZFd4bElHTmhZMmhsWEc0Z1hIUjJZWElnYVc1emRHRnNiR1ZrVFc5a2RXeGxjeUE5SUh0OU8xeHVYRzRnWEhRdkx5QlVhR1VnY21WeGRXbHlaU0JtZFc1amRHbHZibHh1SUZ4MFpuVnVZM1JwYjI0Z1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5aHRiMlIxYkdWSlpDa2dlMXh1WEc0Z1hIUmNkQzh2SUVOb1pXTnJJR2xtSUcxdlpIVnNaU0JwY3lCcGJpQmpZV05vWlZ4dUlGeDBYSFJwWmlocGJuTjBZV3hzWldSTmIyUjFiR1Z6VzIxdlpIVnNaVWxrWFNsY2JpQmNkRngwWEhSeVpYUjFjbTRnYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjB1Wlhod2IzSjBjenRjYmx4dUlGeDBYSFF2THlCRGNtVmhkR1VnWVNCdVpYY2diVzlrZFd4bElDaGhibVFnY0hWMElHbDBJR2x1ZEc4Z2RHaGxJR05oWTJobEtWeHVJRngwWEhSMllYSWdiVzlrZFd4bElEMGdhVzV6ZEdGc2JHVmtUVzlrZFd4bGMxdHRiMlIxYkdWSlpGMGdQU0I3WEc0Z1hIUmNkRngwWlhod2IzSjBjem9nZTMwc1hHNGdYSFJjZEZ4MGFXUTZJRzF2WkhWc1pVbGtMRnh1SUZ4MFhIUmNkR3h2WVdSbFpEb2dabUZzYzJWY2JpQmNkRngwZlR0Y2JseHVJRngwWEhRdkx5QkZlR1ZqZFhSbElIUm9aU0J0YjJSMWJHVWdablZ1WTNScGIyNWNiaUJjZEZ4MGJXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwdVkyRnNiQ2h0YjJSMWJHVXVaWGh3YjNKMGN5d2diVzlrZFd4bExDQnRiMlIxYkdVdVpYaHdiM0owY3l3Z1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5azdYRzVjYmlCY2RGeDBMeThnUm14aFp5QjBhR1VnYlc5a2RXeGxJR0Z6SUd4dllXUmxaRnh1SUZ4MFhIUnRiMlIxYkdVdWJHOWhaR1ZrSUQwZ2RISjFaVHRjYmx4dUlGeDBYSFF2THlCU1pYUjFjbTRnZEdobElHVjRjRzl5ZEhNZ2IyWWdkR2hsSUcxdlpIVnNaVnh1SUZ4MFhIUnlaWFIxY200Z2JXOWtkV3hsTG1WNGNHOXlkSE03WEc0Z1hIUjlYRzVjYmx4dUlGeDBMeThnWlhod2IzTmxJSFJvWlNCdGIyUjFiR1Z6SUc5aWFtVmpkQ0FvWDE5M1pXSndZV05yWDIxdlpIVnNaWE5mWHlsY2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1YlNBOUlHMXZaSFZzWlhNN1hHNWNiaUJjZEM4dklHVjRjRzl6WlNCMGFHVWdiVzlrZFd4bElHTmhZMmhsWEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbU1nUFNCcGJuTjBZV3hzWldSTmIyUjFiR1Z6TzF4dVhHNGdYSFF2THlCZlgzZGxZbkJoWTJ0ZmNIVmliR2xqWDNCaGRHaGZYMXh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXdJRDBnWENKY0lqdGNibHh1SUZ4MEx5OGdURzloWkNCbGJuUnllU0J0YjJSMWJHVWdZVzVrSUhKbGRIVnliaUJsZUhCdmNuUnpYRzRnWEhSeVpYUjFjbTRnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlnd0tUdGNibHh1WEc1Y2JpOHFLaUJYUlVKUVFVTkxJRVpQVDFSRlVpQXFLbHh1SUNvcUlIZGxZbkJoWTJzdlltOXZkSE4wY21Gd0lEUTNNV0l4TUdRME5HTmhOekk0TUdVeE1UUmhYRzRnS2lvdklpd2lMeW9xWEhKY2JpQXFJRU52WkdVZ1ptOXliV0YwSUhkbFlpMTNiM0pyWlhKY2NseHVJQ29nUUhCaGNtRnRJR1YyWlc1MFhISmNiaUFxTDF4eVhHNHZMeUIyWVhJZ2FHbG5hR3hwWjJoMFNuTnZiaWdwWEhKY2JuWmhjaUJvYVdkb2JHbG5hSFJLYzI5dUlEMGdjbVZ4ZFdseVpTZ25MaTlxYzI5dUxYQmhjbk5sSnlrN1hISmNibHh5WEc1dmJtMWxjM05oWjJVZ1BTQm1kVzVqZEdsdmJpaGxkbVZ1ZENrZ2UxeHlYRzRnSUhaaGNpQmpiMlJsSUQwZ1pYWmxiblF1WkdGMFlUdGNjbHh1SUNBdkx5QnBiWEJ2Y25SVFkzSnBjSFJ6S0NkcWMyOXVMWEJoY25ObExtcHpKeWs3WEhKY2JpQWdkbUZ5SUhKbGMzVnNkQ0E5SUdocFoyaHNhV2RvZEVwemIyNG9ZMjlrWlN3Z2UyVjRjR0Z1WkdWa09pQjBjblZsZlNrN1hISmNiaUFnTHk4Z2RtRnlJSEpsYzNWc2RDQTlTbE5QVGk1emRISnBibWRwWm5rb1kyOWtaU2s3WEhKY2JpQWdjRzl6ZEUxbGMzTmhaMlVvY21WemRXeDBLVHRjY2x4dWZUdGNjbHh1WEc1Y2JseHVMeW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FYRzRnS2lvZ1YwVkNVRUZEU3lCR1QwOVVSVkpjYmlBcUtpQXVMM05qY21sd2RITXZZWEJwTFdWNGNHeHZjbVZ5TDNZeUwzTnlZeTl0YjJSMWJHVnpMMmhwWjJoc2FXZG9kRXB6YjI0dWQyOXlhMlZ5TG1welhHNGdLaW9nYlc5a2RXeGxJR2xrSUQwZ01GeHVJQ29xSUcxdlpIVnNaU0JqYUhWdWEzTWdQU0F3WEc0Z0tpb3ZJaXdpZG1GeUlIQnlaV1pwZUNBOUlDZDBiUzFqYjJSbEp6dGNjbHh1WEhKY2JuWmhjaUJuWlhSRmVIQmhibVJsY2tOc1lYTnpaWE1nUFNCbWRXNWpkR2x2YmlBb1pYaHdZVzVrWldRcElIdGNjbHh1WEhScFppQW9JV1Y0Y0dGdVpHVmtLU0I3WEhKY2JseDBYSFJ5WlhSMWNtNGdKMlY0Y0dGdVpHVmtJR052Ykd4aGNITmxaQ0JvYVdSa1pXNG5PMXh5WEc1Y2RIMWNjbHh1WEhSeVpYUjFjbTRnSjJWNGNHRnVaR1ZrSnp0Y2NseHVmVHRjY2x4dVhISmNiblpoY2lCbGJtTnZaR1VnUFNCbWRXNWpkR2x2YmlBb2RtRnNkV1VwSUh0Y2NseHVYSFJ5WlhSMWNtNGdXeWM4YzNCaGJqNG5MQ0IyWVd4MVpTd2dKend2YzNCaGJqNG5YUzVxYjJsdUtDY25LVHRjY2x4dWZUdGNjbHh1WEhKY2JuWmhjaUJqY21WaGRHVkZiR1Z0Wlc1MElEMGdablZ1WTNScGIyNGdLR3RsZVN3Z2RtRnNkV1VzSUhSNWNHVXNJR1Y0Y0dGdVpHVnlRMnhoYzNObGN5a2dlMXh5WEc1Y2RIWmhjaUJyYkdGemN5QTlJQ2R2WW1wbFkzUW5MRnh5WEc1Y2RGeDBiM0JsYmlBOUlDZDdKeXhjY2x4dVhIUmNkR05zYjNObElEMGdKMzBuTzF4eVhHNWNjbHh1WEhScFppQW9RWEp5WVhrdWFYTkJjbkpoZVNoMllXeDFaU2twSUh0Y2NseHVYSFJjZEd0c1lYTnpJRDBnSjJGeWNtRjVKenRjY2x4dVhIUmNkRzl3Wlc0Z1BTQW5XeWM3WEhKY2JseDBYSFJqYkc5elpTQTlJQ2RkSnp0Y2NseHVYSFI5WEhKY2JseHlYRzVjZEdsbUlDaDJZV3gxWlNBOVBUMGdiblZzYkNrZ2UxeHlYRzVjZEZ4MGNtVjBkWEp1SUZ0Y2NseHVYSFJjZEZ4MEp6eHNhVDRuTEZ4eVhHNWNkRngwWEhSY2RDYzhjM0JoYmlCamJHRnpjejFjSW10bGVWd2lQbHdpSnl3Z1pXNWpiMlJsS0d0bGVTa3NJQ2RjSWpvZ1BDOXpjR0Z1UGljc1hISmNibHgwWEhSY2RGeDBKenh6Y0dGdUlHTnNZWE56UFZ3aWJuVnNiRndpUGx3aUp5d2daVzVqYjJSbEtIWmhiSFZsS1N3Z0oxd2lQQzl6Y0dGdVBpY3NYSEpjYmx4MFhIUmNkQ2M4TDJ4cFBpZGNjbHh1WEhSY2RGMHVhbTlwYmlnbkp5azdYSEpjYmx4MGZWeHlYRzVjY2x4dVhIUnBaaUFvZEhsd1pTQTlQU0FuYjJKcVpXTjBKeWtnZTF4eVhHNWNkRngwY21WMGRYSnVJRnRjY2x4dVhIUmNkRngwSnp4c2FUNG5MRnh5WEc1Y2RGeDBYSFJjZENjOGMzQmhiaUJqYkdGemN6MWNJaWNzSUdWNGNHRnVaR1Z5UTJ4aGMzTmxjeXdnSjF3aVBqd3ZjM0JoYmo0bkxGeHlYRzVjZEZ4MFhIUmNkQ2M4YzNCaGJpQmpiR0Z6Y3oxY0ltdGxlVndpUGx3aUp5d2daVzVqYjJSbEtHdGxlU2tzSUNkY0lqb2dQQzl6Y0dGdVBpQW5MRnh5WEc1Y2RGeDBYSFJjZENjOGMzQmhiaUJqYkdGemN6MWNJbTl3Wlc1Y0lqNG5MQ0J2Y0dWdUxDQW5QQzl6Y0dGdVBpQW5MRnh5WEc1Y2RGeDBYSFJjZENjOGRXd2dZMnhoYzNNOVhDSW5MQ0JyYkdGemN5d2dKMXdpUGljc1hISmNibHgwWEhSY2RGeDBYSFJxYzI5dU1taDBiV3dvZG1Gc2RXVXNJR1Y0Y0dGdVpHVnlRMnhoYzNObGN5a3NYSEpjYmx4MFhIUmNkRngwSnp3dmRXdytKeXhjY2x4dVhIUmNkRngwWEhRblBITndZVzRnWTJ4aGMzTTlYQ0pqYkc5elpWd2lQaWNzSUdOc2IzTmxMQ0FuUEM5emNHRnVQaWNzWEhKY2JseDBYSFJjZENjOEwyeHBQaWRjY2x4dVhIUmNkRjB1YW05cGJpZ25KeWs3WEhKY2JseDBmVnh5WEc1Y2NseHVYSFJwWmlBb2RIbHdaU0E5UFNBbmJuVnRZbVZ5SnlCOGZDQjBlWEJsSUQwOUlDZGliMjlzWldGdUp5a2dlMXh5WEc1Y2RGeDBjbVYwZFhKdUlGdGNjbHh1WEhSY2RGeDBKenhzYVQ0bkxGeHlYRzVjZEZ4MFhIUmNkQ2M4YzNCaGJpQmpiR0Z6Y3oxY0ltdGxlVndpUGx3aUp5d2daVzVqYjJSbEtHdGxlU2tzSUNkY0lqb2dQQzl6Y0dGdVBpY3NYSEpjYmx4MFhIUmNkRngwSnp4emNHRnVJR05zWVhOelBWd2lKeXdnZEhsd1pTd2dKMXdpUGljc0lHVnVZMjlrWlNoMllXeDFaU2tzSUNjOEwzTndZVzQrSnl4Y2NseHVYSFJjZEZ4MEp6d3ZiR2srSjF4eVhHNWNkRngwWFM1cWIybHVLQ2NuS1R0Y2NseHVYSFI5WEhKY2JseDBjbVYwZFhKdUlGdGNjbHh1WEhSY2RDYzhiR2srSnl4Y2NseHVYSFJjZEZ4MEp6eHpjR0Z1SUdOc1lYTnpQVndpYTJWNVhDSStYQ0luTENCbGJtTnZaR1VvYTJWNUtTd2dKMXdpT2lBOEwzTndZVzQrSnl4Y2NseHVYSFJjZEZ4MEp6eHpjR0Z1SUdOc1lYTnpQVndpSnl3Z2RIbHdaU3dnSjF3aVBsd2lKeXdnWlc1amIyUmxLSFpoYkhWbEtTd2dKMXdpUEM5emNHRnVQaWNzWEhKY2JseDBYSFFuUEM5c2FUNG5YSEpjYmx4MFhTNXFiMmx1S0NjbktUdGNjbHh1ZlR0Y2NseHVYSEpjYm5aaGNpQnFjMjl1TW1oMGJXd2dQU0JtZFc1amRHbHZiaUFvYW5OdmJpd2daWGh3WVc1a1pYSkRiR0Z6YzJWektTQjdYSEpjYmx4MGRtRnlJR2gwYld3Z1BTQW5KenRjY2x4dVhIUm1iM0lnS0haaGNpQnJaWGtnYVc0Z2FuTnZiaWtnZTF4eVhHNWNkRngwYVdZZ0tDRnFjMjl1TG1oaGMwOTNibEJ5YjNCbGNuUjVLR3RsZVNrcElIdGNjbHh1WEhSY2RGeDBZMjl1ZEdsdWRXVTdYSEpjYmx4MFhIUjlYSEpjYmx4eVhHNWNkRngwYUhSdGJDQTlJRnRvZEcxc0xDQmpjbVZoZEdWRmJHVnRaVzUwS0d0bGVTd2dhbk52Ymx0clpYbGRMQ0IwZVhCbGIyWWdhbk52Ymx0clpYbGRMQ0JsZUhCaGJtUmxja05zWVhOelpYTXBYUzVxYjJsdUtDY25LVHRjY2x4dVhIUjlYSEpjYmx4MGNtVjBkWEp1SUdoMGJXdzdYSEpjYm4wN1hISmNibHh5WEc1MllYSWdaMlYwU25OdmJsWnBaWGRsY2lBOUlHWjFibU4wYVc5dUlDaGtZWFJoTENCdmNIUnBiMjV6S1NCN1hISmNibHgwZEhKNUlIdGNjbHh1WEhSY2RISmxkSFZ5YmlCYlhISmNibHgwWEhSY2RDYzhkV3dnWTJ4aGMzTTlYQ0luTENCd2NtVm1hWGdzSUNjdFkyOXVkR0ZwYm1WeVhDSStKeXhjY2x4dVhIUmNkRngwWEhScWMyOXVNbWgwYld3b1cwcFRUMDR1Y0dGeWMyVW9aR0YwWVNsZExDQm5aWFJGZUhCaGJtUmxja05zWVhOelpYTW9iM0IwYVc5dWN5NWxlSEJoYm1SbFpDa3BMRnh5WEc1Y2RGeDBYSFFuUEM5MWJENG5YSEpjYmx4MFhIUmRMbXB2YVc0b0p5Y3BPMXh5WEc1Y2RIMGdZMkYwWTJnZ0tHVXBJSHRjY2x4dVhIUmNkSEpsZEhWeWJpQmJYSEpjYmx4MFhIUmNkQ2M4WkdsMklHTnNZWE56UFZ3aUp5d2djSEpsWm1sNExDQW5MV1Z5Y205eVhDSWdQaWNzSUdVdWRHOVRkSEpwYm1jb0tTd2dKeUE4TDJScGRqNG5YSEpjYmx4MFhIUmRMbXB2YVc0b0p5Y3BPMXh5WEc1Y2RIMWNjbHh1ZlR0Y2NseHVYSEpjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRvWkdGMFlTd2diM0IwS1NCN1hISmNibHgwZG1GeUlHcHpiMjRnUFNBbkp6dGNjbHh1WEhSMllYSWdiM0IwYVc5dWN5QTlJRzl3ZENCOGZDQjdaWGh3WVc1a1pXUTZJSFJ5ZFdWOU8xeHlYRzVjZEdsbUlDaDBlWEJsYjJZZ1pHRjBZU0E5UFNBbmMzUnlhVzVuSnlrZ2UxeHlYRzVjZEZ4MGFuTnZiaUE5SUdSaGRHRTdYSEpjYmx4MGZTQmxiSE5sSUdsbUlDaDBlWEJsYjJZZ1pHRjBZU0E5UFNBbmIySnFaV04wSnlrZ2UxeHlYRzVjZEZ4MGFuTnZiaUE5SUVwVFQwNHVjM1J5YVc1bmFXWjVLR1JoZEdFcFhISmNibHgwZlZ4eVhHNWNkSEpsZEhWeWJpQm5aWFJLYzI5dVZtbGxkMlZ5S0dwemIyNHNJRzl3ZEdsdmJuTXBPMXh5WEc1OU8xeHlYRzVjYmx4dVhHNHZLaW9xS2lvcUtpb3FLaW9xS2lvcUtpcGNiaUFxS2lCWFJVSlFRVU5MSUVaUFQxUkZVbHh1SUNvcUlDNHZjMk55YVhCMGN5OWhjR2t0Wlhod2JHOXlaWEl2ZGpJdmMzSmpMMjF2WkhWc1pYTXZhbk52Ymkxd1lYSnpaUzVxYzF4dUlDb3FJRzF2WkhWc1pTQnBaQ0E5SURGY2JpQXFLaUJ0YjJSMWJHVWdZMmgxYm10eklEMGdNRnh1SUNvcUx5SmRMQ0p6YjNWeVkyVlNiMjkwSWpvaUluMD1cIiwgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImhpZ2hsaWdodEpzb24ud29ya2VyLmpzXCIpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvaGlnaGxpZ2h0SnNvbi53b3JrZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDM0MzkxMy9ob3ctdG8tY3JlYXRlLWEtd2ViLXdvcmtlci1mcm9tLWEtc3RyaW5nXHJcblxyXG52YXIgVVJMID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGNvbnRlbnQsIHVybCkge1xyXG5cdHRyeSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHR2YXIgYmxvYjtcclxuXHRcdFx0dHJ5IHsgLy8gQmxvYkJ1aWxkZXIgPSBEZXByZWNhdGVkLCBidXQgd2lkZWx5IGltcGxlbWVudGVkXHJcblx0XHRcdFx0dmFyIEJsb2JCdWlsZGVyID0gd2luZG93LkJsb2JCdWlsZGVyIHx8IHdpbmRvdy5XZWJLaXRCbG9iQnVpbGRlciB8fCB3aW5kb3cuTW96QmxvYkJ1aWxkZXIgfHwgd2luZG93Lk1TQmxvYkJ1aWxkZXI7XHJcblx0XHRcdFx0YmxvYiA9IG5ldyBCbG9iQnVpbGRlcigpO1xyXG5cdFx0XHRcdGJsb2IuYXBwZW5kKGNvbnRlbnQpO1xyXG5cdFx0XHRcdGJsb2IgPSBibG9iLmdldEJsb2IoKTtcclxuXHRcdFx0fSBjYXRjaChlKSB7IC8vIFRoZSBwcm9wb3NlZCBBUElcclxuXHRcdFx0XHRibG9iID0gbmV3IEJsb2IoW2NvbnRlbnRdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gbmV3IFdvcmtlcihVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpKTtcclxuXHRcdH0gY2F0Y2goZSkge1xyXG5cdFx0XHRyZXR1cm4gbmV3IFdvcmtlcignZGF0YTphcHBsaWNhdGlvbi9qYXZhc2NyaXB0LCcgKyBlbmNvZGVVUklDb21wb25lbnQoY29udGVudCkpO1xyXG5cdFx0fVxyXG5cdH0gY2F0Y2goZSkge1xyXG5cdFx0cmV0dXJuIG5ldyBXb3JrZXIodXJsKTtcclxuXHR9XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi93b3JrZXItbG9hZGVyL2NyZWF0ZUlubGluZVdvcmtlci5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJmdW5jdGlvbiBzbGljayh0aW1lcykge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cdHZhciBzZWxlY3RvciA9ICcjc2xpZGVyLSc7XHJcblx0XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aW1lczsgaSsrKSB7XHJcblx0XHQkKHNlbGVjdG9yICsgaSkubGVuZ3RoICYmICQoc2VsZWN0b3IgKyBpKS5zbGljayh7XHJcblx0XHRcdGRvdHM6IGZhbHNlLFxyXG5cdFx0XHRpbmZpbml0ZTogZmFsc2UsXHJcblx0XHRcdHNwZWVkOiAzMDAsXHJcblx0XHRcdHNsaWRlc1RvU2hvdzogMyxcclxuXHRcdFx0c2xpZGVzVG9TY3JvbGw6IDEsXHJcblx0XHRcdHZhcmlhYmxlV2lkdGg6IHRydWUsXHJcblx0XHRcdGF1dG9wbGF5OiBmYWxzZSxcclxuXHRcdFx0cmVzcG9uc2l2ZTogW1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGJyZWFrcG9pbnQ6IDEyMDAsXHJcblx0XHRcdFx0XHRzZXR0aW5nczoge1xyXG5cdFx0XHRcdFx0XHR2YXJpYWJsZVdpZHRoOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRzbGlkZXNUb1Nob3c6IDIsXHJcblx0XHRcdFx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cdFx0XHRcdFx0XHRpbmZpbml0ZTogZmFsc2UsXHJcblx0XHRcdFx0XHRcdGRvdHM6IGZhbHNlXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRicmVha3BvaW50OiA4MDAsXHJcblx0XHRcdFx0XHRzZXR0aW5nczoge1xyXG5cdFx0XHRcdFx0XHR2YXJpYWJsZVdpZHRoOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRzbGlkZXNUb1Nob3c6IDEsXHJcblx0XHRcdFx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAxXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdXHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVuc2xpY2sodGltZXMpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aW1lczsgaSsrKSB7XHJcblx0XHR2YXIgc2VsZWN0b3IgPSAnI3NsaWRlci0nICsgaTtcclxuXHRcdCQoc2VsZWN0b3IpICYmICQoc2VsZWN0b3IpLmxlbmd0aCAmJiAkKHNlbGVjdG9yKS5zbGljaygndW5zbGljaycpO1xyXG5cdH1cclxuXHRjb25zb2xlLmluZm8oJ2NsZWFyZWQnKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0c2V0OiBzbGljayxcclxuXHRyZW1vdmU6IHVuc2xpY2tcclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL3NsaWRlci5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJkaXNjb3ZlcnkudjIuZXZlbnRzLmdldFwiOiB7XG5cdFx0XCJldmVudHNcIjoge1xuXHRcdFx0XCJvYmplY3RcIjoge1xuXHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFwidGl0bGVcIjogXCJFdmVudFwiLFxuXHRcdFx0XHRcdFwiY29weUJ0blwiOiB7XG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogdHJ1ZVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XCJyZXF1ZXN0XCI6IFwiaHR0cDovL3d3dy5nb29nbGUuY29tXCIsXG5cdFx0XHRcdFx0XCJpbmRleFwiOiAwXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcImltYWdlc1wiOiB7XG5cdFx0XHRcdFwib2JqZWN0XCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJ0aXRsZVwiOiBcImltYWdlXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XCJpbmRleFwiOiAxLFxuXHRcdFx0XHRcdFwiY29sbGFwc2VkXCI6IHRydWVcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdFwic2FsZXNcIjoge1xuXHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFwiaW5kZXhcIjogMlxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJ2ZW51ZXNcIjoge1xuXHRcdFx0XHRcIm9iamVjdFwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwidGl0bGVcIjogXCJ2ZW51ZVwiLFxuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiAwXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImNpdHlcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwic3RhdGVcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDFcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiY291bnRyeVwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogMVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJhZGRyZXNzXCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiAzXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImxvY2F0aW9uXCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiA0XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFwiaW5kZXhcIjogM1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJkYXRlc1wiOiB7XG5cdFx0XHRcdFwidGltZXpvbmVcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDBcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwic3RhcnRcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDEsXG5cdFx0XHRcdFx0XHRcImNvcHlCdG5cIjoge1xuXHRcdFx0XHRcdFx0XHRcImRhdGVUaW1lXCI6IHRydWVcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwic3RhdHVzXCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiAyXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImVuZFwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogMyxcblx0XHRcdFx0XHRcdFwiY29weUJ0blwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiZGF0ZVRpbWVcIjogdHJ1ZVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcImluZGV4XCI6IDQsXG5cdFx0XHRcdFx0XCJhbGxJbnNpZGVcIjogdHJ1ZVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XCJldmVudHNcIjogdHJ1ZSxcblx0XHRcdFx0XCJpbmRleFwiOiAwXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcInBhZ2VcIjoge1xuXHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XCJpbmRleFwiOiAxLFxuXHRcdFx0XHRcImNvbGxhcHNlZFwiOiB0cnVlXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XCJtZXRob2RcIjogXCJkaXNjb3ZlcnkudjIuZXZlbnRzLmdldFwiXG5cdFx0fVxuXHR9LFxuXHRcImRpc2NvdmVyeS52Mi5hdHRyYWN0aW9ucy5nZXRcIjoge1xuXHRcdFwiYXR0cmFjdGlvbnNcIjoge1xuXHRcdFx0XCJvYmplY3RcIjoge1xuXHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFwiaW5kZXhcIjogMFxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJpbWFnZXNcIjoge1xuXHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFwiaW5kZXhcIjogMlxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJjbGFzc2lmaWNhdGlvbnNcIjoge1xuXHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFwiaW5kZXhcIjogMVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XCJpbmRleFwiOiAwXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcInBhZ2VcIjoge1xuXHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XCJpbmRleFwiOiAxXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XCJtZXRob2RDb25maWdcIjogdHJ1ZVxuXHRcdH1cblx0fSxcblx0XCJfR0xPQkFMX0NPTkZJR1wiOiB7XG5cdFx0XCJjb3B5QnRuXCI6IHtcblx0XHRcdFwiaWRcIjogdHJ1ZVxuXHRcdH0sXG5cdFx0XCJkZXByZWNhdGVkXCI6IFtcblx0XHRcdFwiX2xpbmtzXCJcblx0XHRdLFxuXHRcdFwidW53cmFwcFwiOiBbXG5cdFx0XHRcIl9lbWJlZGRlZFwiXG5cdFx0XVxuXHR9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb25maWcuanNvblxuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgY29sb3JzID0gW1xyXG5cdCdjb2x1bW4tY29sb3ItMScsXHJcblx0J2NvbHVtbi1jb2xvci0yJyxcclxuXHQnY29sdW1uLWNvbG9yLTMnLFxyXG5cdCdjb2x1bW4tY29sb3ItNCcsXHJcblx0J2NvbHVtbi1jb2xvci01JyxcclxuXHQnY29sdW1uLWNvbG9yLTYnLFxyXG5cdCdjb2x1bW4tY29sb3ItNycsXHJcblx0J2NvbHVtbi1jb2xvci04JyxcclxuXHQnY29sdW1uLWNvbG9yLTknLFxyXG5cdCdjb2x1bW4tY29sb3ItMTAnLFxyXG5cdCdjb2x1bW4tY29sb3ItMTEnLFxyXG5cdCdjb2x1bW4tY29sb3ItMTInXHJcbl07XHJcblxyXG5mdW5jdGlvbiBnZXRSYW5kb21Db2xvcihjb2xvcikge1xyXG5cdHZhciByYW5kb21OdW1iZXI7XHJcblx0ZG8ge1xyXG5cdFx0cmFuZG9tTnVtYmVyID0gZ2V0UmFuZG9tSW50KDEsIGNvbG9ycy5sZW5ndGgpO1xyXG5cdH0gd2hpbGUgKCdjb2x1bW4tY29sb3ItJyArIHJhbmRvbU51bWJlciA9PT0gY29sb3IpO1xyXG5cclxuXHRyZXR1cm4gJ2NvbHVtbi1jb2xvci0nICsgcmFuZG9tTnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIChpbmNsdXNpdmUpIGFuZCBtYXggKGluY2x1c2l2ZSlcclxuICogVXNpbmcgTWF0aC5yb3VuZCgpIHdpbGwgZ2l2ZSB5b3UgYSBub24tdW5pZm9ybSBkaXN0cmlidXRpb24hXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRSYW5kb21JbnQobWluLCBtYXgpIHtcclxuXHRyZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRjb2xvcnM6IGNvbG9ycyxcclxuXHRnZXRSYW5kb21Db2xvcjogZ2V0UmFuZG9tQ29sb3JcclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2NvbG9yQ2xhc3Nlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XHJcblx0cmVxdWlyZSgnLi9jdXN0b21TZWxlY3QuY29tcG9uZW50LmpzJyk7XHJcblx0cmVxdWlyZSgnLi9wYW5lbHMvcGFuZWxHcm91cC5jb21wb25lbnQuanMnKTtcclxuXHRyZXF1aXJlKCcuL3BhbmVscy9wYW5lbC5jb21wb25lbnQuanMnKTtcclxuXHRyZXF1aXJlKCcuL3BhbmVscy9wYWdpbmF0aW9uLmNvbXBvbmVudC5qcycpO1xyXG5cdHJlcXVpcmUoJy4vcGFuZWxzL3BhbmVsSGVhZGluZy5jb21wb25lbnQuanMnKTtcclxuXHRyZXF1aXJlKCcuL3BhbmVscy9vYmplY3RQYW5lbEJvZHkuY29tcG9uZW50LmpzJyk7XHJcblx0cmVxdWlyZSgnLi9wYW5lbHMvYXJyYXlQYW5lbEJvZHkuY29tcG9uZW50LmpzJyk7XHJcbn0oKSk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDE4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcclxuICogQ3VzdG9tIFNlbGVjdCBjb21wb25lbnRcclxuICovXHJcbnZhciBzZWxmO1xyXG5cclxuLyoqXHJcbiAqIEN1c3RvbSBTZWxlY3QgVmlldy1Nb2RlbFxyXG4gKiBAcGFyYW0gcGFyYW1zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gQ3VzdG9tU2VsZWN0KHBhcmFtcykge1xyXG4gIHNlbGYgPSB0aGlzO1xyXG5cclxuICB0aGlzLmFuaW1hdGlvblNwZWVkID0gcGFyYW1zLmFuaW1hdGlvblNwZWVkIHx8IDIwMDtcclxuXHR0aGlzLmN1cmVudFNlbGVjdERhdGEgPSBwYXJhbXMuZGF0YSB8fCBudWxsO1xyXG5cdHRoaXMub25Gb2N1cyA9IHBhcmFtcy5mb2N1cyB8fCBudWxsO1xyXG5cdFxyXG4gIC8vb2JzZXJ2YWJsZXNcclxuICB0aGlzLnNlbGVjdE1vZGVsID0gdHlwZW9mIHBhcmFtcy5vcHRpb25zICE9PSdmdW5jdGlvbicgPyBrby5vYnNlcnZhYmxlQXJyYXkocGFyYW1zLm9wdGlvbnMpOiAgcGFyYW1zLm9wdGlvbnM7XHJcbiAgdGhpcy5wbGFjZWhvbGRlciA9IGtvLm9ic2VydmFibGUocGFyYW1zLnBsYWNlaG9sZGVyIHx8ICcnKTtcclxuICB0aGlzLm9uc2VsZWN0ID0gcGFyYW1zLm9uc2VsZWN0IHx8IGZ1bmN0aW9uIChpdGVtKSB7IGNvbnNvbGUubG9nKGl0ZW0gKydzZWxlY3RlZCEnKX07XHJcbiAgdGhpcy5zZWxlY3RlZCA9IGtvLm9ic2VydmFibGUodGhpcy5zZWxlY3RNb2RlbCgpWzBdKTtcclxuICB0aGlzLmlzT25lT3B0aW9uID0ga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdE1vZGVsKCkubGVuZ3RoIDwgMjsgLy8gbW9yZSB0aGFuIG9uZSBvcHRpb25cclxuICB9LCB0aGlzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZEVsZW1lbnQoZXZlbnQpIHtcclxuICB2YXIgcGFyZW50ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5wYXJlbnRzKCcuanMtY3VzdG9tLXNlbGVjdCcpO1xyXG4gIHJldHVybiB7XHJcbiAgICB3cmFwcGVyOiBwYXJlbnQuZmluZCgnLmpzLWN1c3RvbS1zZWxlY3Qtd3JhcHBlcicpLFxyXG4gICAgbGF5ZXI6IHBhcmVudC5maW5kKCcuanMtY3VzdG9tLXNlbGVjdC1sYXllcicpXHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ3VzdG9tIFNlbGVjdCBWaWV3LU1vZGVsIG1ldGhvZFxyXG4gKiBAcGFyYW0gdmlld01vZGVsXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuQ3VzdG9tU2VsZWN0LnByb3RvdHlwZS5zbGlkZVRvZ2dsZSA9IGZ1bmN0aW9uKHZpZXdNb2RlbCwgZXZlbnQpIHtcclxuXHQvLyBlbGVtIGluIGZvY3VzIGVtdWxhdGlvblxyXG5cdHRoaXMub25Gb2N1cyAmJiB0aGlzLm9uRm9jdXModGhpcy5jdXJlbnRTZWxlY3REYXRhKTtcclxuXHJcblx0aWYgKHRoaXMuaXNPbmVPcHRpb24oKSkge3JldHVybiBmYWxzZTt9XHJcbiAgdmFyIGVsID0gZmluZEVsZW1lbnQoZXZlbnQpO1xyXG4gICAgZWwud3JhcHBlci5zbGlkZVRvZ2dsZSh2aWV3TW9kZWwuYW5pbWF0aW9uU3BlZWQpO1xyXG4gICAgZWwubGF5ZXIudG9nZ2xlQ2xhc3MoJ2hpZGRlbicpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEN1c3RvbSBTZWxlY3QgVmlldy1Nb2RlbCBtZXRob2RcclxuICogQHBhcmFtIGl0ZW1cclxuICogQHBhcmFtIGV2ZW50XHJcbiAqL1xyXG5DdXN0b21TZWxlY3QucHJvdG90eXBlLnNlbGVjdEl0ZW0gPSBmdW5jdGlvbiAoaXRlbSwgZXZlbnQpIHtcclxuICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgdGhpcy5zZWxlY3RlZChpdGVtKTtcclxuICAvLyBydW4gaGFuZGxlclxyXG4gIHRoaXMub25zZWxlY3QoaXRlbSk7XHJcblx0Ly8gc2xpZGUgdXBcclxuICB0aGlzLnNsaWRlVG9nZ2xlKHNlbGYsIGV2ZW50KTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ga28uY29tcG9uZW50cy5yZWdpc3RlcignY3VzdG9tLXNlbGVjdCcsIHtcclxuICB2aWV3TW9kZWw6IEN1c3RvbVNlbGVjdCxcclxuICB0ZW1wbGF0ZTogKFtcclxuICAgICc8ZGl2IGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0IGpzLWN1c3RvbS1zZWxlY3RcIj4nLFxyXG4gICAgICAnPGRpdiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdC13cmFwcGVyXCI+JyxcclxuICAgICAgICAnPHNlbGVjdCBkYXRhLWJpbmQ9XCJvcHRpb25zOiBzZWxlY3RNb2RlbCwgb3B0aW9uc1RleHQ6IFxcJ25hbWVcXCcsIHZhbHVlOiBzZWxlY3RlZFwiIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19maWVsZFwiIG5hbWU9XCJhcGktZXhwLW1ldGhvZFwiPjwvc2VsZWN0PicsXHJcbiAgICAgICAgJzxzcGFuIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19wbGFjZWhvbGRlclwiPicsXHJcbiAgICAgICAgICAnPGlucHV0IGRhdGEtYmluZD1cImV2ZW50OiB7Y2xpY2s6IHNsaWRlVG9nZ2xlfSwgYXR0cjoge3ZhbHVlOiBzZWxlY3RlZCgpLm5hbWUsIGRpc2FibGVkOiBpc09uZU9wdGlvbn1cIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiXCIgcmVhZG9ubHk9XCJcIj4nLFxyXG4gICAgICAgICAgJzxiIGRhdGEtYmluZD1cImNzczoge2hpZGRlbjogaXNPbmVPcHRpb259XCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2NoZXZyb25cIj4mbmJzcDs8L2I+JyxcclxuICAgICAgICAnPC9zcGFuPicsXHJcbiAgICAgICAgJzx1bCBkYXRhLWJpbmQ9XCJmb3JlYWNoOiBzZWxlY3RNb2RlbFwiIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19saXN0IGpzLWN1c3RvbS1zZWxlY3Qtd3JhcHBlclwiPicsXHJcbiAgICAgICAgICAnPGxpIGRhdGEtYmluZD1cImNzczoge1xcJ2FjdGl2ZVxcJzogY2hlY2tlZH1cIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9faXRlbVwiPicsXHJcbiAgICAgICAgICAgICc8YnV0dG9uIGRhdGEtYmluZD1cImV2ZW50OiB7Y2xpY2s6ICRwYXJlbnQuc2VsZWN0SXRlbS5iaW5kKCRwYXJlbnQpfSwgdGV4dDogbmFtZSwgY3NzOiB7XFwnYWN0aXZlXFwnOiBjaGVja2VkKCl9LCBhdHRyOiB7XFwnZGF0YS12YWx1ZVxcJzogbmFtZX1cIiAgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2l0ZW0tbGFiZWxcIiBocmVmPVwiI1wiPjwvYnV0dG9uPicsXHJcbiAgICAgICAgICAgIC8vICc8c3BhbiBkYXRhLWJpbmQ9XCJpZjogbGlua1wiPicsXHJcbiAgICAgICAgICAgIFx0JzxhIGRhdGEtYmluZD1cImF0dHI6IHtocmVmOiBsaW5rfSwgY3NzOiB7XFwnaGlkZGVuXFwnOiAhbGlua31cIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9faXRlbS1saW5rXCIgdGFyZ2V0PVwiX2JsYW5rXCI+Jm5ic3A7PC9hPicsXHJcbiAgICAgICAgICAgIC8vICc8L3NwYW4+JyxcclxuICAgICAgICAgICc8L2xpPicsXHJcbiAgICAgICAgJzwvdWw+JyxcclxuICAgICAgJzwvZGl2PicsXHJcbiAgICAgICc8ZGl2IGRhdGEtYmluZD1cImNsaWNrOiBzbGlkZVRvZ2dsZVwiIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0LWxheWVyIGpzLWN1c3RvbS1zZWxlY3QtbGF5ZXIgaGlkZGVuXCI+PC9kaXY+JyxcclxuICAgICc8L2Rpdj4nXHJcbiAgXSkuam9pbignJylcclxufSk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9jdXN0b21TZWxlY3QuY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcbnRvZG86IHNpbmdsZSAtIGZpcnN0IGxvYWQ7XHJcbnRvZG86IHBhZ2luZyAocGFyYW1zKVxyXG50b2RvOiB1bHIgcGFyc2VcclxudG9kbzogZmllbGRzIHZhbGlkYXRpb25cclxuICovXHJcblxyXG52YXIgc2VsZjtcclxuXHJcbmZ1bmN0aW9uIENhcmRHcm91cChwYXJhbXMpIHtcclxuXHRzZWxmID0gdGhpcztcclxuXHR0aGlzLnVybCA9IHRoaXMudXJsIHx8IHBhcmFtcy51cmw7XHJcblx0dGhpcy5jb25maWcgPSBnZXRDb25maWcocGFyYW1zKTtcclxuXHR0aGlzLmRhdGEgPSBwcmVwYXJlRGF0YShwYXJhbXMsIHRoaXMuY29uZmlnLl9DT05GSUcpO1xyXG5cdHRoaXMuZ3JvdXBJbmRleCA9IHBhcmFtcy5ncm91cEluZGV4IHx8IDA7XHJcblx0dGhpcy5zZWN0aW9uSW5kZXggPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHBhcmFtcy5zZWN0aW9uSW5kZXgpO1xyXG5cdHRoaXMuY29sb3JDbGFzcyA9IHBhcmFtcy5jb2xvckNsYXNzO1xyXG5cdHRoaXMuZ2V0TW9yZSA9IHBhcmFtcy5nZXRNb3JlO1xyXG5cdHRoaXMucGFnZSA9IGdldFBhZ2luZ0luZm8ocGFyYW1zLCB0aGlzLmRhdGEucGFnZSwgdGhpcy51cmwpO1xyXG5cdHRoaXMuY29sbGFwc2VJZCA9IGdldENvbGxhcHNlSWQoKTtcclxuXHR0aGlzLl9oYXNFdmVudHNQYW5lbCA9IGZhbHNlO1xyXG59XHJcblxyXG5DYXJkR3JvdXAucHJvdG90eXBlLnNvcnRCeUNvbmZpZyA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcblx0aWYgKHNlbGYuY29uZmlnICYmIHNlbGYuY29uZmlnW2Eua2V5XSAmJiBzZWxmLmNvbmZpZ1tiLmtleV0gJiYgc2VsZi5jb25maWdbYS5rZXldLl9DT05GSUcgJiYgc2VsZi5jb25maWdbYi5rZXldLl9DT05GSUcpIHtcclxuXHRcdHZhciBpMSA9IHNlbGYuY29uZmlnW2Eua2V5XS5fQ09ORklHLmluZGV4O1xyXG5cdFx0dmFyIGkyID0gc2VsZi5jb25maWdbYi5rZXldLl9DT05GSUcuaW5kZXg7XHJcblx0XHRyZXR1cm4gaTEgLSBpMjtcclxuXHR9XHJcblx0cmV0dXJuIDA7XHJcbn07XHJcblxyXG5DYXJkR3JvdXAucHJvdG90eXBlLmNoZWNrSWZIYXNFdmVudHNMaXN0ID0gZnVuY3Rpb24gKGtleSkge1xyXG5cdHJldHVybiBzZWxmLl9oYXNFdmVudHNQYW5lbCA9IGtleSA9PT0gJ2V2ZW50cycgfHwgc2VsZi5faGFzRXZlbnRzUGFuZWw7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ3BhbmVsLWdyb3VwJywge1xyXG5cdHZpZXdNb2RlbDogQ2FyZEdyb3VwLFxyXG5cdHRlbXBsYXRlOmBcclxuXHRcdDxzZWN0aW9uIGRhdGEtYmluZD1cImZvcmVhY2hwcm9wOiB7ZGF0YTogZGF0YSwgc29ydEZuOiBzb3J0QnlDb25maWd9XCIgY2xhc3M9XCJwYW5lbC1ncm91cFwiPlxyXG5cdFx0XHQ8ZGl2IGRhdGEtYmluZD1cImNzczogeydoYXMtZXZlbnRzLWxpc3QnOiAkY29tcG9uZW50LmNoZWNrSWZIYXNFdmVudHNMaXN0KGtleSl9XCI+XHRcdFx0XHJcblx0XHRcdFx0PCEtLXBhbmVsLS0+XHJcblx0XHRcdFx0PHBhbmVsIHBhcmFtcz1cIiRkYXRhOiAkZGF0YSwgJGluZGV4OiAkaW5kZXgsIHBhbmVsR3JvdXA6ICRjb21wb25lbnRcIj48L3BhbmVsPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdDwvc2VjdGlvbj5cclxuYH0pO1xyXG5cclxuLyoqXHJcbiAqIENvbmZpZ3VyZXMgYW5kIHBhcmFtcyBmb3IgZWFjaCBwYW5lbCBncm91cFxyXG4gKiBAcGFyYW0gcGFyYW1zXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Q29uZmlnKHBhcmFtcykge1xyXG5cdHNlbGYuZGVlcFByb3AgPSBwYXJhbXMuZGVlcFByb3AgfHwgJyc7XHJcblx0Ly8gbWFpbiBjb25maWdcclxuXHRpZiAoIXNlbGYuZGVlcFByb3AgJiYgIXBhcmFtcy5jb25maWcpIHtcclxuXHRcdC8vIHBhbmVsR3JvdXAgaW5kZXggLSAwXHJcblxyXG5cdFx0Ly8gZ2V0IGZ1bGwgY29uZmlnO1xyXG5cdFx0dmFyIGZpbHRlciA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUocGFyYW1zLmZpbHRlcik7XHJcblxyXG5cdFx0Ly8gZ2V0IGN1cnJlbnQgbWV0aG9kIGNvbmZpZ1xyXG5cdFx0dmFyIG1ldGhvZENvbmZpZyA9IGZpbHRlcltwYXJhbXMucmVxSWRdIHx8IHt9O1xyXG5cclxuXHRcdC8vIG1ldGhvZCBjb25maWcgaW5oZXJpdHMgZ2xvYmFsIGNvbmZpZ1xyXG5cdFx0bWV0aG9kQ29uZmlnLl9DT05GSUcgID0gJC5leHRlbmQodHJ1ZSwge30sIGZpbHRlci5fR0xPQkFMX0NPTkZJRywgbWV0aG9kQ29uZmlnLl9DT05GSUcpO1xyXG5cclxuXHRcdHJldHVybiBtZXRob2RDb25maWc7XHJcblx0fSBlbHNlIHtcclxuXHRcdC8vIHBhbmVsR3JvdXAgaW5kZXggPiAwXHJcblx0XHRyZXR1cm4gcGFyYW1zLmNvbmZpZyB8fCB7fVxyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERhdGEgbWFuaXB1bGF0aW9uc1xyXG4gKiBAcGFyYW0gcGFyYW1zXHJcbiAqIEByZXR1cm5zIHsqfHt9fVxyXG4gKi9cclxuZnVuY3Rpb24gcHJlcGFyZURhdGEocGFyYW1zLCBjb25maWcpIHtcclxuXHR2YXIgZGF0YSA9IHBhcmFtcyAmJiBwYXJhbXMuZGF0YSB8fCB7fTtcclxuXHR1bndyYXBwT2JqZWN0cyhkYXRhLCBjb25maWcpO1xyXG5cdHJlbW92ZURlcHJlY2F0ZWQoZGF0YSwgY29uZmlnKTtcclxuXHRyZXR1cm4gd3JhcHBQcmltaXRpdmVzKGRhdGEsIHBhcmFtcy5fcHJvcFRpdGxlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdhdGhlcnMgYWxsIHN0YW5kIGFsb25lIHByb3BzIGluIHRvIG9uZSBvYmplY3RcclxuICogQHBhcmFtIGRhdGEge29iamVjdH1cclxuICogQHBhcmFtIF9wcm9wVGl0bGUge3N0cmluZ31cclxuICogQHJldHVybnMge29iamVjdH0gcmV2aXNlZCBkYXRhXHJcbiAqL1xyXG5mdW5jdGlvbiB3cmFwcFByaW1pdGl2ZXMoZGF0YSwgX3Byb3BUaXRsZSkge1xyXG5cdHZhciBuZXdEYXRhID0ge30sIHByb3AgPSBfcHJvcFRpdGxlIHx8ICdvYmplY3QnLCB2YWwsIGtleTtcclxuXHJcblx0Ly8gZ2F0aGVyaW5nIGFsbCBwcmltaXRpdmUgcHJvcHMgaW4gYWRkaXRpb25hbCBwYW5lbFxyXG5cdGZvciAoa2V5IGluIGRhdGEpIHtcclxuXHRcdGlmICghZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7Y29udGludWU7fVxyXG5cdFx0dmFsID0gZGF0YVtrZXldO1xyXG5cclxuXHRcdGlmICh0eXBlb2YgdmFsICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRuZXdEYXRhW3Byb3BdID0gbmV3RGF0YVtwcm9wXSB8fCB7fTtcclxuXHRcdFx0bmV3RGF0YVtwcm9wXVtrZXldID0gdmFsO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bmV3RGF0YVtrZXldID0gdmFsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gbmV3RGF0YVxyXG59XHJcblxyXG4vKipcclxuICogVW53cmFwcyBvYmplY3RzXHJcbiAqIEBwYXJhbSBvYmoge29iamVjdH1cclxuICogQHJldHVybnMge29iamVjdH0gY2hhbmdlZFxyXG4gKi9cclxuZnVuY3Rpb24gcmVtb3ZlRGVwcmVjYXRlZChvYmosIGNvbmZpZykge1xyXG5cdHZhciBkZXByZWNhdGVkID0gY29uZmlnICYmIGNvbmZpZy5kZXByZWNhdGVkIHx8IFtdO1xyXG5cclxuXHRkZXByZWNhdGVkLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG5cdFx0aWYgKG9ialtpdGVtXSkge1xyXG5cdFx0XHRkZWxldGUgb2JqW2l0ZW1dXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gaXRlbTtcclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIG9iajtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgZGVwcmVjYXRlZCBvYmplY3RzXHJcbiAqIEBwYXJhbSBvYmoge29iamVjdH1cclxuICogQHJldHVybnMge29iamVjdH0gY2hhbmdlZFxyXG4gKi9cclxuZnVuY3Rpb24gdW53cmFwcE9iamVjdHMob2JqLCBjb25maWcpIHtcclxuXHR2YXIgdW53cmFwcCA9IGNvbmZpZyAmJiBjb25maWcudW53cmFwcCB8fCBbXTtcclxuXHJcblx0dW53cmFwcC5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdHZhciB2YWwgPSBvYmpbaXRlbV07XHJcblx0XHRpZiAodmFsKSB7XHJcblx0XHRcdHZhciBhcnIgPSBPYmplY3Qua2V5cyh2YWwpO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHZhciBwcm9wID0gYXJyW2ldO1xyXG5cdFx0XHRcdG9ialtwcm9wXSA9IHZhbFtwcm9wXTtcclxuXHRcdFx0fVxyXG5cdFx0XHRkZWxldGUgb2JqW2l0ZW1dO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGl0ZW07XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiBvYmo7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQcmVwYXJlcyBkYXRhIGZvciBwYWdpbmdcclxuICogQHBhcmFtIHBhZ2VPYmpcclxuICogQHBhcmFtIHBhcmFtc1xyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmZ1bmN0aW9uIGdldFBhZ2luZ0luZm8ocGFyYW1zLCBwYWdlT2JqLCB1cmwpIHtcclxuXHR2YXIgcGFnZVBhcmFtLCBzaXplO1xyXG5cclxuXHRpZiAocGFyYW1zLnBhZ2UpIHtcclxuXHRcdHJldHVybiBwYXJhbXMucGFnZTtcclxuXHR9XHJcblx0aWYgKHBhZ2VPYmope1xyXG5cdFx0c2l6ZSA9IHBhcmFtcy5jYXJkU2l6ZSB8fCBwYWdlT2JqLnNpemU7XHJcblx0XHRwYWdlUGFyYW0gPSBwYXJhbXMucGFnZVBhcmFtIHx8IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUodXJsKS5maW5kKGZ1bmN0aW9uIChpdGVtKSB7XHJcblx0XHRcdHJldHVybiBpdGVtLm5hbWUgPT09ICdwYWdlJztcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLnBhZ2UgPSB7XHJcblx0XHRcdHBhcmFtZXRlcjogcGFnZVBhcmFtICYmIHBhZ2VQYXJhbS52YWx1ZSxcclxuXHRcdFx0c2l6ZTogc2l6ZVxyXG5cdFx0fTtcclxuXHR9XHJcblx0cmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlcyBpZCBzdHIgZm9yIHBhbmVsICdjb2xsYXBzZSB0b2dnbGUnIGxvZ2ljXHJcbiAqIEBwYXJhbSBzdHJcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmZ1bmN0aW9uIGdldENvbGxhcHNlSWQoc3RyKSB7XHJcblx0dmFyIGNsYXNzTmFtZSA9IHN0ciB8fCAnY2FyZC1wYW5lbC1ib2R5LSc7XHJcblx0cmV0dXJuIFtcclxuXHRcdGNsYXNzTmFtZSxcclxuXHRcdHNlbGYuc2VjdGlvbkluZGV4LFxyXG5cdFx0c2VsZi5ncm91cEluZGV4XHJcblx0XS5qb2luKCcnKTtcclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL3BhbmVsR3JvdXAuY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xyXG5cclxuZnVuY3Rpb24gY2FyZENvbXBvbmVudChwYXJhbXMpIHtcclxuXHRzZWxmID0gdGhpcztcclxuXHR0aGlzLmtleSA9IHBhcmFtcy4kZGF0YS5rZXk7XHJcblx0dGhpcy4kZGF0YSA9IHBhcmFtcy4kZGF0YTtcclxuXHR0aGlzLiRpbmRleCA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUocGFyYW1zLiRpbmRleCk7XHJcblx0dGhpcy5wYW5lbEdyb3VwID0gcGFyYW1zLnBhbmVsR3JvdXA7XHJcblx0dGhpcy5wYWdlID0gdGhpcy5wYW5lbEdyb3VwLnBhZ2U7XHJcblx0dGhpcy5jb2xvckNsYXNzID0gdGhpcy5wYW5lbEdyb3VwLmNvbG9yQ2xhc3MgfHwgJyc7XHJcblx0dGhpcy5jb25maWcgPSBnZXRQYW5lbENvbmZpZyh0aGlzLnBhbmVsR3JvdXAuY29uZmlnLCB0aGlzLmtleSk7XHJcblx0dGhpcy5pc0V4cGFuZGVkID0gaXNFeHBhbmRlZCh0aGlzLmNvbmZpZyk7XHJcblx0dGhpcy5jb2xsYXBzZUlkID0gdGhpcy5wYW5lbEdyb3VwLmNvbGxhcHNlSWQgKyB0aGlzLiRpbmRleDtcclxuXHR0aGlzLmlzQWN0aXZlID0ga28ub2JzZXJ2YWJsZSh0aGlzLmlzRXhwYW5kZWQpO1xyXG59XHJcblxyXG5jYXJkQ29tcG9uZW50LnByb3RvdHlwZS5zZXRBY3RpdmUgPSBmdW5jdGlvbiAobW9kZWwsIGV2ZW50KSB7XHJcblx0dGhpcy5pc0FjdGl2ZSghdGhpcy5pc0FjdGl2ZSgpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIGNvbmZpZyBmb3IgZWFjaCBwYW5lbFxyXG4gKiBAcGFyYW0ga2V5IHtzdHJpbmd9IGtleSBvZiBwYW5lbCBvYmplY3RcclxuICogQHJldHVybnMge29iamVjdH0gY29uZmlnXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRQYW5lbENvbmZpZyhjb25maWcsIGtleSkge1xyXG5cdHZhciBzdWJDb25maWcgPSBjb25maWdba2V5XSB8fCB7fTtcclxuXHJcblx0c3ViQ29uZmlnLl9DT05GSUcgPSAkLmV4dGVuZCh0cnVlLCB7fSwgY29uZmlnLl9DT05GSUcsIHN1YkNvbmZpZy5fQ09ORklHKTtcclxuXHRyZXR1cm4gc3ViQ29uZmlnO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGZvciAnY29sbGFwc2VkJyBjb25maWcgZm9yIGVhY2ggcGFuZWxcclxuICogQHBhcmFtIGtleSB7c3RyaW5nfSBrZXkgb2YgcGFuZWwgb2JqZWN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBmb3IgY3NzIGNsYXNzIGFkZC9yZW1vdmVcclxuICovXHJcbmZ1bmN0aW9uIGlzRXhwYW5kZWQoY29uZmlnKSB7XHJcblx0cmV0dXJuICEoT2JqZWN0LmdldFByb3AoY29uZmlnLCAnLl9DT05GSUcuY29sbGFwc2VkJykgfHwgZmFsc2UpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ3BhbmVsJywge1xyXG5cdHZpZXdNb2RlbDogY2FyZENvbXBvbmVudCxcclxuXHR0ZW1wbGF0ZTpgXHJcblx0XHQ8c2VjdGlvbiBkYXRhLWJpbmQ9XCJjc3M6IHtbY29sb3JDbGFzc106IHRydWUsIGFjdGl2ZTogaXNBY3RpdmV9XCIgY2xhc3M9XCJwYW5lbCBwYW5lbC1wcmltYXJ5XCI+XHJcblx0XHRcdDwhLS1wYW5lbC1oZWFkaW5nLS0+XHJcblx0XHRcdDxwYW5lbC1oZWFkaW5nIHBhcmFtcz1cImNvbmZpZzogY29uZmlnLCBkYXRhOiAkZGF0YSwgaW5kZXg6ICRpbmRleCwgcGFnZTogcGFnZSwgc2V0QWN0aXZlOiBzZXRBY3RpdmUuYmluZCgkY29tcG9uZW50KSwgY29sbGFwc2VJZDogY29sbGFwc2VJZCwgY29sb3JDbGFzczogY29sb3JDbGFzc1wiPjwvcGFuZWwtaGVhZGluZz5cclxuXHRcdFx0XHJcblx0XHRcdDwhLS1wYW5lbC1ib2R5LS0+XHJcblx0XHRcdDxzZWN0aW9uIGRhdGEtYmluZD1cImF0dHI6IHsnaWQnOiBjb2xsYXBzZUlkfSwgY3NzOiB7J2luJzogaXNFeHBhbmRlZH1cIiBjbGFzcz1cInBhbmVsLWNvbGxhcHNlIGNvbGxhcHNlXCI+XHRcdFx0XHRcclxuXHRcdFx0XHQ8IS0tIGtvIGlmOiAodHlwZW9mICRkYXRhLnZhbHVlID09PSAnb2JqZWN0JyAmJiAhJC5pc0FycmF5KCRkYXRhLnZhbHVlKSkgLS0+XHJcblx0XHRcdFx0XHQ8b2JqZWN0LXBhbmVsLWJvZHkgcGFyYW1zPVwiY29uZmlnOiBjb25maWcsIGRhdGE6ICRkYXRhLCBpbmRleDogJGluZGV4LCBwYW5lbEdyb3VwOiBwYW5lbEdyb3VwLCBwYWdlOiBwYWdlLCBjb2xsYXBzZUlkOiBjb2xsYXBzZUlkXCI+PC9vYmplY3QtcGFuZWwtYm9keT5cclxuXHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHQ8IS0tIGtvIGlmOiAodHlwZW9mICRkYXRhLnZhbHVlID09PSAnb2JqZWN0JyAmJiAkLmlzQXJyYXkoJGRhdGEudmFsdWUpKSAtLT5cclxuXHRcdFx0XHRcdDxhcnJheS1wYW5lbC1ib2R5IHBhcmFtcz1cImNvbmZpZzogY29uZmlnLCBkYXRhOiAkZGF0YSwgaW5kZXg6ICRpbmRleCwgcGFuZWxHcm91cDogcGFuZWxHcm91cFwiPjwvYXJyYXktcGFuZWwtYm9keT5cclxuXHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0PC9zZWN0aW9uPlxyXG5gfSk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9wYW5lbHMvcGFuZWwuY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xyXG5cclxuLyoqXHJcbiAqIFBhZ2luYXRpb24gZWxlbWVudFxyXG4gKiBAcGFyYW0gcGFyYW1zXHJcbiAqL1xyXG5mdW5jdGlvbiBwYWdpbmF0aW9uKHBhcmFtcykge1xyXG5cdHRoaXMucGFnZVBhcmFtID0gcGFyYW1zLnBhZ2VQYXJhbTtcclxuXHR0aGlzLnRvdGFsUGFnZXMgPSArcGFyYW1zLnRvdGFsUGFnZXM7XHJcblx0dGhpcy5udW1iZXIgPSArcGFyYW1zLm51bWJlcjtcclxuXHR0aGlzLmZpcnN0ID0gISF0aGlzLm51bWJlcjtcclxuXHR0aGlzLmxhc3QgPSB0aGlzLm51bWJlciA8IHRoaXMudG90YWxQYWdlcyAtIDE7XHJcblx0dGhpcy5yZXF1ZXN0QnRuID0gJCgnI2FwaS1leHAtZ2V0LWJ0bicpO1xyXG5cdHNlbGYgPSB0aGlzO1xyXG59XHJcblxyXG4vKipcclxuICogZ2V0IG5leHQgcGFnZVxyXG4gKi9cclxucGFnaW5hdGlvbi5wcm90b3R5cGUuZ2V0UHJldlBhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHZhbCA9IHRoaXMucGFnZVBhcmFtKCk7XHJcblx0dGhpcy5wYWdlUGFyYW0odmFsID4gMCA/IHZhbCAtIDEgOiAwKTtcclxuXHR0aGlzLnJlcXVlc3RCdG4udHJpZ2dlcignY2xpY2snKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBnZXQgcHJldiBwYWdlXHJcbiAqL1xyXG5wYWdpbmF0aW9uLnByb3RvdHlwZS5nZXROZXh0UGFnZSA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdmFsID0gdGhpcy5udW1iZXI7XHJcblx0dGhpcy5wYWdlUGFyYW0odmFsIDwgdGhpcy50b3RhbFBhZ2VzIC0gMSA/IHZhbCAgKyAxOiB2YWwpO1xyXG5cdHRoaXMucmVxdWVzdEJ0bi50cmlnZ2VyKCdjbGljaycpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdwYWdpbmF0aW9uJywge1xyXG5cdHZpZXdNb2RlbDogcGFnaW5hdGlvbixcclxuXHR0ZW1wbGF0ZTpcclxuXHRgPHNwYW4gY2xhc3M9XCJuYXZpZ2F0aW9uLXdyYXBwZXJcIj5cclxuXHRcdDxidXR0b24gZGF0YS1iaW5kPVwiY2xpY2s6IGdldFByZXZQYWdlLCBlbmFibGU6IGZpcnN0XCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibmF2aWdhdGlvbiBwcmV2XCI+PC9idXR0b24+XHJcblx0XHQ8YnV0dG9uICBkYXRhLWJpbmQ9XCJjbGljazogZ2V0TmV4dFBhZ2UsIGVuYWJsZTogbGFzdFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm5hdmlnYXRpb24gbmV4dFwiPjwvYnV0dG9uPlxyXG5cdDwvc3Bhbj5gXHJcbn0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL3BhZ2luYXRpb24uY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xyXG52YXIgZ2V0UmFuZG9tQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2NvbG9yQ2xhc3NlcycpLmdldFJhbmRvbUNvbG9yO1xyXG5cclxuZnVuY3Rpb24gUGFuZWxIZWFkaW5nKHBhcmFtcykge1xyXG5cdHNlbGYgPSB0aGlzO1xyXG5cdHRoaXMuY29uZmlnID0gcGFyYW1zLmNvbmZpZyAmJiBwYXJhbXMuY29uZmlnLl9DT05GSUc7XHJcblx0dmFyIHBhZ2UgPSBwYXJhbXMucGFnZTtcclxuXHR0aGlzLnNldEFjdGl2ZSA9IHBhcmFtcy5zZXRBY3RpdmU7XHJcblx0dGhpcy5fcGFuZWxOYW1lID0gcGFyYW1zLmRhdGEua2V5O1xyXG5cdHRoaXMudGl0bGUgPSB0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZy50aXRsZSB8fCB0aGlzLl9wYW5lbE5hbWU7XHJcblx0dGhpcy5kYXRhID0gcGFyYW1zLmRhdGEudmFsdWU7XHJcblx0aWYgKHBhZ2UpIHtcclxuXHRcdHRoaXMuY2FyZFNpemUgPSBwYWdlLnNpemU7XHJcblx0XHR0aGlzLnBhZ2VQYXJhbSA9IHBhZ2UucGFnZVBhcmFtO1xyXG5cdH1cclxuXHR0aGlzLmNvbGxhcHNlSWQgPSBwYXJhbXMuY29sbGFwc2VJZDtcclxuXHRpZiAodGhpcy5jb25maWcucmVxdWVzdCkge1xyXG5cdFx0dGhpcy5nZXRSYW5kb21Db2xvciA9IGdldFJhbmRvbUNvbG9yKHBhcmFtcy5jb2xvckNsYXNzKTtcclxuXHR9XHJcbn1cclxuXHJcblBhbmVsSGVhZGluZy5wcm90b3R5cGUuZm9sbG93UmVxdWVzdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdHZhciB1cmwgPSBPYmplY3QuZ2V0UHJvcCh2YWx1ZSwgJy5jb25maWcucmVxdWVzdCcpO1xyXG5cdHVybCAmJiBsb2NhdGlvbi5hc3NpZ24odXJsKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ga28uY29tcG9uZW50cy5yZWdpc3RlcigncGFuZWwtaGVhZGluZycsIHtcclxuXHR2aWV3TW9kZWw6ICBQYW5lbEhlYWRpbmcsXHJcblx0dGVtcGxhdGU6YFxyXG5cdFx0PHNlY3Rpb24gY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+XHJcblx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lbC10aXRsZVwiPlxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdDxhIGRhdGEtYmluZD1cImNsaWNrOiBzZXRBY3RpdmUsIGF0dHI6IHtocmVmOiAnIycgKyBjb2xsYXBzZUlkLCAnYXJpYS1jb250cm9scyc6IGNvbGxhcHNlSWR9XCIgY2xhc3M9XCJidG4gYnRuLWljb24gYnRuLXRpdGxlXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiYnRuIGJ0bi1pY29uIHNoZXZyb24gd2hpdGUtc2hldnJvbi11cFwiPjwvc3Bhbj5cclxuXHRcdFx0XHRcdDxwIGRhdGEtYmluZD1cInRleHQ6IHRpdGxlXCIgY2xhc3M9XCJ0aXRsZVwiPlBhbmVsIHRpdGxlPC9wPlxyXG5cdFx0XHRcdDwvYT5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQ8IS0tIGtvIGlmOiBfcGFuZWxOYW1lID09PSAnZXZlbnRzJy0tPlxyXG5cdFx0XHRcdFx0PHNwYW4gZGF0YS1iaW5kPVwidGV4dDogY2FyZFNpemVcIiBjbGFzcz1cImNvdW50ZXJcIj48L3NwYW4+XHJcblx0XHRcdFx0PCEtLSAva28tLT5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQ8IS0tIGtvIGlmOiBfcGFuZWxOYW1lID09PSAncGFnZSctLT5cclxuXHRcdFx0XHRcdDxwYWdpbmF0aW9uIHBhcmFtcz1cIm51bWJlcjogZGF0YS5udW1iZXIsIHRvdGFsUGFnZXM6IGRhdGEudG90YWxQYWdlcywgcGFnZVBhcmFtOiBwYWdlUGFyYW1cIj48L3BhZ2luYXRpb24+XHJcblx0XHRcdFx0PCEtLSAva28tLT5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQ8IS0tIGtvIGlmOiBjb25maWcucmVxdWVzdCAhPT0gdW5kZWZpbmVkIC0tPlxyXG5cdFx0XHRcdDxzZWN0aW9uIGNsYXNzPVwiZm9sbG93LXJlcXVlc3RcIj5cclxuXHRcdFx0XHRcdDxzcGFuIGRhdGEtYmluZD1cImNzczogZ2V0UmFuZG9tQ29sb3JcIiBjbGFzcz1cImNvbG9yLWluZGljYXRvclwiPjwvc3Bhbj5cclxuXHRcdFx0XHRcdDxidXR0b24gZGF0YS1iaW5kPVwiY2xpY2s6IGZvbGxvd1JlcXVlc3RcIiBjbGFzcz1cImJ0biBidG4tcmVxdWVzdFwiIHR5cGU9XCJidXR0b25cIj5hbm90aGVyIHJlcXVlc3Q8L2J1dHRvbj5cclxuXHRcdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHRcdFx0PCEtLSAva28tLT5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L3NlY3Rpb24+XHJcbmB9KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYW5lbEhlYWRpbmcuY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xuXG5mdW5jdGlvbiBPYmplY3RQYW5lbEJvZHkocGFyYW1zKSB7XG5cdHNlbGYgPSB0aGlzO1xuXHR0aGlzLmRhdGEgPSB0aGlzLmRhdGEgfHwga28ub2JzZXJ2YWJsZShwYXJhbXMuZGF0YS52YWx1ZSk7XG5cdHRoaXMuY29uZmlnID0gcGFyYW1zLmNvbmZpZztcblx0dGhpcy5fcGFuZWxOYW1lID0gcGFyYW1zLmRhdGEua2V5O1xuXHR0aGlzLmNhcmRJbmRleCA9IHRoaXMuY2FyZEluZGV4IHx8IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUocGFyYW1zLmluZGV4KTtcblx0dGhpcy5wYW5lbEdyb3VwID0gcGFyYW1zLnBhbmVsR3JvdXA7XG5cdHRoaXMuZ2V0TW9yZSA9IHRoaXMucGFuZWxHcm91cC5nZXRNb3JlO1xuXHR0aGlzLnBhZ2VQYXJhbSA9IHBhcmFtcy5wYWdlICYmIHBhcmFtcy5wYWdlLnBhcmFtZXRlcjtcblx0dGhpcy5jb2xsYXBzZUlkID0gcGFyYW1zLmNvbGxhcHNlSWQ7XG5cdHRoaXMuX2FsbEluc2lkZSA9ICEhT2JqZWN0LmdldFByb3Aoa28udXRpbHMudW53cmFwT2JzZXJ2YWJsZSh0aGlzLmNvbmZpZyksICcuX0NPTkZJRy5hbGxJbnNpZGUnKTtcbn1cblxuT2JqZWN0UGFuZWxCb2R5LnByb3RvdHlwZS5vbkVudGVyS2V5RG93biA9IGZ1bmN0aW9uIChtb2RlbCwgZXZlbnQpIHtcblx0aWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG5cdFx0dmFyIHZhbHVlID0gK2V2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWU7XG5cdFx0dmFsdWUgPSBOdW1iZXIuaXNOYU4odmFsdWUpID8gMCA6IHZhbHVlO1xuXHRcdHZhciBwYWdlTnVtYmVyID0gfn52YWx1ZSA8IDAgPyAwIDogfn52YWx1ZTtcblx0XHRzZWxmLnBhZ2VQYXJhbShwYWdlTnVtYmVyIDwga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShzZWxmLmRhdGEpLnRvdGFsUGFnZXMgPyBwYWdlTnVtYmVyIDoga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShzZWxmLmRhdGEpLnRvdGFsUGFnZXMgLSAxKTtcblx0XHQkKCcjYXBpLWV4cC1nZXQtYnRuJykudHJpZ2dlcignY2xpY2snKTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufTtcblxuT2JqZWN0UGFuZWxCb2R5LnByb3RvdHlwZS5jYW5CZUNvcGllZCA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKHR5cGVvZiB0aGlzLnZhbHVlID09PSAnb2JqZWN0JykgcmV0dXJuIGZhbHNlO1xuXHR0aGlzLmNvcGllZCA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuXHRpZiAoT2JqZWN0LmdldFByb3Aoc2VsZi5jb25maWcsICcuX0NPTkZJRy5jb3B5QnRuLicgKyB0aGlzLmtleSkpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdHJldHVybiBmYWxzZTtcbn07XG5cbk9iamVjdFBhbmVsQm9keS5wcm90b3R5cGUuY29weVZhbHVlID0gZnVuY3Rpb24gKG1vZGVsLCBldmVudCkge1xuXHR2YXIgY3VycmVudEZpZWxkID0gdGhpcztcblx0c2VsZi5jbGlwYm9hcmQgPSBuZXcgQ2xpcGJvYXJkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuXHRzZWxmLmNsaXBib2FyZC5vbignc3VjY2VzcycsIGZ1bmN0aW9uIG9uU3VjY2Vzc0NvcHkoZSkge1xuXHRcdFx0Y29uc29sZS5pbmZvKCdBY3Rpb246JywgZS5hY3Rpb24pO1xuXHRcdFx0Y29uc29sZS5pbmZvKCdUZXh0OicsIGUudGV4dCk7XG5cdFx0XHRjb25zb2xlLmluZm8oJ1RyaWdnZXI6JywgZS50cmlnZ2VyKTtcblx0XHRcdGN1cnJlbnRGaWVsZC5jb3BpZWQodHJ1ZSk7XG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Y3VycmVudEZpZWxkLmNvcGllZChmYWxzZSk7XG5cdFx0XHR9LCA1MDApO1xuXHRcdFx0ZS5jbGVhclNlbGVjdGlvbigpO1xuXHRcdH0pXG5cdFx0Lm9uKCdlcnJvcicsIGZ1bmN0aW9uIG9uRXJyb3JDb3B5KGUpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ0FjdGlvbjonLCBlLmFjdGlvbik7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdUcmlnZ2VyOicsIGUudHJpZ2dlcik7XG5cdFx0fSk7XG59O1xuXG5PYmplY3RQYW5lbEJvZHkucHJvdG90eXBlLnJlbW92ZUhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG5cdHNlbGYuY2xpcGJvYXJkICYmIHNlbGYuY2xpcGJvYXJkLmRlc3Ryb3koKTtcblx0ZGVsZXRlIHNlbGYuY2xpcGJvYXJkO1xufTtcblxuT2JqZWN0UGFuZWxCb2R5LnByb3RvdHlwZS5zb3J0UHJvcHMgPSBmdW5jdGlvbiAoYSwgYikge1xuXHRjb25zb2xlLmxvZyhhLGIpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdvYmplY3QtcGFuZWwtYm9keScsIHtcblx0dmlld01vZGVsOiAgT2JqZWN0UGFuZWxCb2R5LFxuXHR0ZW1wbGF0ZTpgXG5cdFx0PHNlY3Rpb24gY2xhc3M9XCJwYW5lbC1ib2R5XCI+XG5cdFx0XHQ8IS0tIGtvIGlmOiAkY29tcG9uZW50Ll9wYW5lbE5hbWUgPT09ICdpbWFnZScgLS0+XG5cdFx0XHRcdDxpbWcgZGF0YS1iaW5kPVwiYXR0cjoge3NyYzoga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShkYXRhKS51cmwsIGFsdDogJ2ltYWdlLScgKyBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKGRhdGEpLnJhdGlvfVwiIGFsdD1cImltZ1wiIGNsYXNzPVwiaW1nIGltZy10aHVtYm5haWxcIj5cblx0XHRcdDwhLS0gL2tvIC0tPlxuXHRcdFx0XG5cdFx0XHQ8dWwgZGF0YS1iaW5kPVwiZm9yZWFjaHByb3A6IGRhdGFcIj5cblx0XHRcdFx0PGxpIGRhdGEtYmluZD1cImNzczogeydhbGxJbnNpZGUnOiAkY29tcG9uZW50Ll9hbGxJbnNpZGV9XCIgY2xhc3M9XCJjbGVhcmZpeCBwYWRpbmdcIj5cblx0XHRcdFx0XHQ8c3BhbiBkYXRhLWJpbmQ9XCJ0ZXh0OiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnID8ga2V5OiBrZXkgKyAnOidcIiBjbGFzcz1cImtleVwiPjwvc3Bhbj5cblx0XHRcdFx0XHRcblx0XHRcdFx0XHQ8IS0tIGtvIGlmbm90OiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIHx8ICRjb21wb25lbnQuX3BhbmVsTmFtZSA9PT0gJ3BhZ2UnICYmIGtleSA9PT0gJ251bWJlcicgLS0+XG5cdFx0XHRcdFx0XHQ8c3BhbiBkYXRhLWJpbmQ9XCJ0ZXh0OiB2YWx1ZVwiIGNsYXNzPVwidmFsdWVcIj48L3NwYW4+XG5cdFx0XHRcdFx0PCEtLSAva28gLS0+XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0PCEtLSBrbyBpZjogJGNvbXBvbmVudC5fcGFuZWxOYW1lID09PSAncGFnZScgJiYga2V5ID09PSAnbnVtYmVyJy0tPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZvcm0taW5saW5lXCI+XG5cdFx0XHRcdFx0XHRcdDxpbnB1dCBpZD1cInBhZ2luYXRpb24taW5wdXRcIiBkYXRhLWJpbmQ9XCJldmVudDoge2tleWRvd246ICRjb21wb25lbnQub25FbnRlcktleURvd259LCBhdHRyOiB7cGxhY2Vob2xkZXI6IHZhbHVlfVwiIHR5cGU9XCJ0ZXh0XCIgcGF0dGVybj1cIlswLTldK1wiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cblx0XHRcdFx0XHRcblx0XHRcdFx0XHQ8IS0tIGtvIGlmOiAkY29tcG9uZW50LmNhbkJlQ29waWVkLmNhbGwoJGRhdGEsICcjcHJvcC12YWx1ZS0nICsga2V5ICsgJGluZGV4KCkpIC0tPlxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBkYXRhLWJpbmQ9XCJldmVudDoge21vdXNlb3ZlcjogJGNvbXBvbmVudC5jb3B5VmFsdWUsIG1vdXNlb3V0OiAkY29tcG9uZW50LnJlbW92ZUhhbmRsZXJ9LCBjc3M6IHsnY29waWVkJzogY29waWVkfSwgYXR0cjogeydkYXRhLWNsaXBib2FyZC10ZXh0JzogdmFsdWUudG9TdHJpbmcoKSwgaWQ6ICdwcm9wLXZhbHVlLScgKyBrZXkgKyAkaW5kZXgoKX1cIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWljb24gYnRuLWNvcHlcIj48L2J1dHRvbj5cblx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cblx0XHRcdFx0XHRcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQ8IS0tIGtvIGlmOiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIC0tPlxuXHRcdFx0XHRcdFx0PCEtLSBrbyBpZjogJGNvbXBvbmVudC5fYWxsSW5zaWRlIC0tPlxuXHRcdFx0XHRcdFx0XHQ8cGFuZWwgcGFyYW1zPVwiJGRhdGE6ICRkYXRhLCAkaW5kZXg6ICRpbmRleCwgcGFuZWxHcm91cDogJGNvbXBvbmVudFwiPjwvcGFuZWw+XG5cdFx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cblx0XHRcdFx0XHRcdDwhLS0ga28gaWZub3Q6ICRjb21wb25lbnQuX2FsbEluc2lkZSAtLT5cblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBkYXRhLWJpbmQ9XCJjbGljazogJGNvbXBvbmVudC5nZXRNb3JlLmJpbmQoJGNvbXBvbmVudCwga2V5LCB2YWx1ZSlcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWljb24gYmx1ZS1zaGV2cm9uLXJpZ2h0IHB1bGwtcmlnaHRcIj48L2J1dHRvbj5cblx0XHRcdFx0XHRcdDwhLS0gL2tvIC0tPlxuXHRcdFx0XHRcdDwhLS0gL2tvIC0tPlxuXHRcdFx0XHQ8L2xpPlxuXHRcdFx0PC91bD5cblx0XHQ8L3NlY3Rpb24+XG5gfSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL29iamVjdFBhbmVsQm9keS5jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHNlbGY7XHJcblxyXG5mdW5jdGlvbiBBcnJheVBhbmVsQm9keShwYXJhbXMpIHtcclxuXHRzZWxmID0gdGhpcztcclxuXHR0aGlzLmRhdGEgPSBwYXJhbXMuZGF0YS52YWx1ZTtcclxuXHR0aGlzLmNvbmZpZyA9IHBhcmFtcy5jb25maWc7XHJcblx0dGhpcy5fcGFuZWxOYW1lID0gcGFyYW1zLmRhdGEua2V5O1xyXG5cdHRoaXMuY2FyZEluZGV4ID0gdGhpcy5jYXJkSW5kZXggfHwga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShwYXJhbXMuaW5kZXgpO1xyXG5cdHRoaXMucGFuZWxHcm91cCA9IHBhcmFtcy5wYW5lbEdyb3VwO1xyXG5cdHRoaXMuZ2V0TW9yZSA9IHRoaXMucGFuZWxHcm91cC5nZXRNb3JlO1xyXG59XHJcblxyXG5BcnJheVBhbmVsQm9keS5wcm90b3R5cGUuZ2V0U3RhcnREYXRhID0gZnVuY3Rpb24gKCRkYXRhKSB7XHJcblx0cmV0dXJuIE9iamVjdC5nZXRQcm9wKCRkYXRhLCAnZGF0ZXMuc3RhcnQubG9jYWxEYXRlJykgfHwgJydcclxufTtcclxuQXJyYXlQYW5lbEJvZHkucHJvdG90eXBlLmdldFZlbnVlTmFtZSA9IGZ1bmN0aW9uICgkZGF0YSkge1xyXG5cdHJldHVybiBPYmplY3QuZ2V0UHJvcCgkZGF0YSwgJ19lbWJlZGRlZC52ZW51ZXNbMF0ubmFtZScpIHx8ICcnXHJcbn07XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdhcnJheS1wYW5lbC1ib2R5Jywge1xyXG5cdHZpZXdNb2RlbDogQXJyYXlQYW5lbEJvZHksXHJcblx0dGVtcGxhdGU6YFxyXG5cdFx0PHNlY3Rpb24gY2xhc3M9XCJwYW5lbC1ib2R5IG5vLXBhZGRpbmdcIj5cclxuXHRcdFx0PHVsIGRhdGEtYmluZD1cImZvcmVhY2g6IGRhdGFcIiBjbGFzcz1cImxpc3QtZ3JvdXBcIj5cclxuXHRcdFx0XHQ8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRcdDwhLS0ga28gaWY6ICRjb21wb25lbnQuX3BhbmVsTmFtZSA9PT0gJ2ltYWdlcycgLS0+XHJcblx0XHRcdFx0XHRcdDxpbWcgZGF0YS1iaW5kPVwiYXR0cjoge3NyYzogdXJsLCBhbHQ6ICdpbWFnZS0nICsgcmF0aW99XCIgYWx0PVwiaW1nXCIgY2xhc3M9XCJpbWdcIj5cclxuXHRcdFx0XHRcdDwhLS0gL2tvIC0tPlxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8IS0tIGtvIGlmbm90OiAkY29tcG9uZW50Ll9wYW5lbE5hbWUgPT09ICdpbWFnZXMnIC0tPlxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBkYXRhLWJpbmQ9XCJ0ZXh0OiBuYW1lIHx8ICcjJyArICRpbmRleCgpXCIgY2xhc3M9XCJuYW1lXCI+ZXZlbnQgbmFtZTwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdDwhLS0ga28gaWY6ICRjb21wb25lbnQuX3BhbmVsTmFtZSA9PT0gJ2V2ZW50cycgLS0+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImFkZGl0aW9uYWwtaW5mb1wiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PHAgZGF0YS1iaW5kPVwidGV4dDogJGNvbXBvbmVudC5nZXRTdGFydERhdGEoJGRhdGEpXCIgY2xhc3M9XCJkYXRlXCI+ZXZlbnQgZGF0ZTwvcD5cclxuXHRcdFx0XHRcdFx0XHRcdDwhLS0ga28gaWY6ICRjb21wb25lbnQuZ2V0VmVudWVOYW1lKCRkYXRhKS0tPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8cCBkYXRhLWJpbmQ9XCJ0ZXh0OiAkY29tcG9uZW50LmdldFZlbnVlTmFtZSgkZGF0YSlcIiBjbGFzcz1cInZlbnVlIHRydW5jYXRlXCI+ZXZlbnQgdmVudWU8L3A+XHJcblx0XHRcdFx0XHRcdFx0XHQ8IS0tL2tvLS0+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDwhLS0gL2tvIC0tPlxyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdDwhLS0gL2tvIC0tPlxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8IS0tIGtvIGlmOiB0eXBlb2YgJGRhdGEgPT09ICdvYmplY3QnIC0tPlxyXG5cdFx0XHRcdFx0XHQ8YnV0dG9uIGRhdGEtYmluZD1cImNsaWNrOiAkY29tcG9uZW50LmdldE1vcmUuYmluZCgkY29tcG9uZW50LCAkaW5kZXgoKSlcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWljb24gYmx1ZS1zaGV2cm9uLXJpZ2h0IHB1bGwtcmlnaHRcIj48L2J1dHRvbj5cclxuXHRcdFx0XHRcdDwhLS0gL2tvIC0tPlxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0PC9saT5cclxuXHRcdFx0PC91bD5cclxuXHRcdDwvc2VjdGlvbj5cclxuYH0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL2FycmF5UGFuZWxCb2R5LmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9