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
	__webpack_require__(17);
	
	/**
	 * Main application view-model
	 * @param obj {object} global data object
	 */
	function AppViewModel(obj) {
	  var base = obj || {};
	  self = this;
	  this.apiKey = apiKey;
		this.config = config;
	  // observables
	  this.selectedCategory = ko.observable('');
	  this.selectedMethod = ko.observable('');
	  this.selectedParams = ko.observableArray([]);
		this.requests = ko.observableArray([]);
	
		// computed
	  this.URL = ko.computed(this.getUrl, this);
	  this.sendButtonText = ko.pureComputed(this.getMethodName, this);
	
	  // sub-models
	  this.menu = new MenuViewModel(base, this.selectedCategory);
	  this.methods = new MethodsViewModel(base, this.selectedCategory, this.selectedMethod);
	  this.params = new ParamsViewModel(base, this.selectedMethod, this.selectedParams);
		this.sharePath = ko.pureComputed(formDeepLinkingUrl, this);
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
			'api=' + encodeURI(category),
			'method='+ encodeURI(method.id)
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
	function MenuViewModel(base, category) {
	  self = this;
	  this.category = category;
	  this.categories = ko.observableArray(Object.keys(base).map(function (item, index) {
	    return {
	      checked: ko.observable(!index),
	      name: item,
	      link: false
	    }
	  }));
	
	  // initial load
	  this.selectCategory(this.categories()[0]);
	}
	
	/**
	 * Menu View-Model method
	 * @param category
	 */
	MenuViewModel.prototype.selectCategory = function (category) {
	  var categoryName = category.name;
	  self.category(categoryName);
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
	
	function RequestsListViewModel(requests, selectedParams, sharePath) {
		this.url = selectedParams;
		self = this;
		this.colors = colors;
		this.sharePath = ko.utils.unwrapObservable(sharePath);
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
					copied: ko.observable(false),
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
		self.clipboard = new Clipboard(event.currentTarget);
		self.clipboard.on('success', function onSuccessCopy(e) {
			console.info('Action:', e.action);
			console.info('Text:', e.text);
			console.info('Trigger:', e.trigger);
			currentField.copied(true);
			setTimeout(function () {
				currentField.copied(false);
			}, 1000);
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
					"start": {
						"_CONFIG": {
							"index": 0,
							"copyBtn": {
								"dateTime": true
							}
						}
					},
					"status": {
						"_CONFIG": {
							"index": 1
						}
					},
					"end": {
						"_CONFIG": {
							"index": 2,
							"copyBtn": {
								"dateTime": true
							}
						}
					},
					"_CONFIG": {
						"index": 4,
						"copyBtn": {
							"timezone": true
						},
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
/***/ function(module, exports, __webpack_require__) {

	module.exports = (function () {
		__webpack_require__(18);
		__webpack_require__(19);
		__webpack_require__(20);
		__webpack_require__(21);
		__webpack_require__(22);
		__webpack_require__(23);
		__webpack_require__(24);
	}());


/***/ },
/* 18 */
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
/* 19 */
/***/ function(module, exports) {

	/*
	todo: single - first load;
	todo: inheritance of config
	todo: paging (params)
	todo: copy btn
	todo: ulr parse
	todo: fields validation
	 */
	
	var self;
	
	function cardGroupComponent(params) {
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
	}
	
	cardGroupComponent.prototype.sortByConfig = function (a, b) {
		if (self.config && self.config[a.key] && self.config[b.key] && self.config[a.key]._CONFIG && self.config[b.key]._CONFIG) {
			var i1 = self.config[a.key]._CONFIG.index;
			var i2 = self.config[b.key]._CONFIG.index;
			return i1 - i2;
		}
		return 0;
	};
	
	module.exports = ko.components.register('panel-group', {
		viewModel: cardGroupComponent,
		template:`
			<section data-bind="foreachprop: {data: data, sortFn: sortByConfig}" class="panel-group">
				<panel params="$data: $data,
											$index: $index,
											page: $component.page,
											colorClass: $component.colorClass,
											panelGroup: $component,
											collapseId: $component.collapseId,
											config: $component.config">
				</panel>
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
/* 20 */
/***/ function(module, exports) {

	var self;
	
	function cardComponent(params) {
		self = this;
		this.key = params.$data.key;
		this.$data = params.$data;
		this.$data = params.$data;
		this.$index = ko.utils.unwrapObservable(params.$index);
		this.page = params.page;
		this.colorClass = params.colorClass;
		this.panelGroup = params.panelGroup;
		this.config = getPanelConfig(params.config, this.key);
		this.isExpanded = isExpanded(this.config);
		this.collapseId = params.collapseId + this.$index;
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
				<panel-heading params="config: config, data: $data, index: $index, page: page, setActive: setActive.bind($component), collapseId: collapseId"></panel-heading>
				
				<!--panel-body-->
				<section data-bind="attr: {'id': collapseId}, css: {'in': isExpanded}" class="panel-collapse collapse">
					<div class="panel-body">
					
						<!-- ko if: (typeof $data.value === 'object' && !$.isArray($data.value)) -->
							<object-panel-body params="config: config, data: $data, index: $index, panelGroup: panelGroup, page: page"></object-panel-body>
						<!-- /ko -->
						<!-- ko if: (typeof $data.value === 'object' && $.isArray($data.value)) -->
							<array-panel-body params="config: config, data: $data, index: $index, panelGroup: panelGroup"></array-panel-body>
						<!-- /ko -->
					</div>
				</section>
			</section>
	`});


/***/ },
/* 21 */
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
/* 22 */
/***/ function(module, exports) {

	var self;
	
	function objectPanelBodyComponent(params) {
		self = this;
		var config = params.config && params.config._CONFIG;
		var page = params.page;
		this.setActive = params.setActive;
		this._panelName = params.data.key;
		this.title = config && config.title || this._panelName;
		this.data = params.data.value;
		if (page) {
			this.cardSize = page.size;
			this.pageParam = page.pageParam;
		}
		this.collapseId = params.collapseId;
	}
	module.exports = ko.components.register('panel-heading', {
		viewModel:  objectPanelBodyComponent,
		template:`
			<section class="panel-heading">
				<div class="panel-title">
					
					<a data-bind="click: setActive, attr: {href: '#' + collapseId, 'aria-controls': collapseId}" class="btn btn-icon" type="button" data-toggle="collapse" aria-expanded="false">
						<span class="btn btn-icon shevron white-shevron-up"></span>
						<p data-bind="text: title" class="title">Panel title</p>
					</a>
					
					<!-- ko if: _panelName === 'events'-->
						<span data-bind="text: cardSize" class="counter"></span>
					<!-- /ko-->
					
					<!-- ko if: _panelName === 'page'-->
						<pagination params="number: data.number, totalPages: data.totalPages, pageParam: pageParam"></pagination>
					<!-- /ko-->
				</div>
			</section>
	`});


/***/ },
/* 23 */
/***/ function(module, exports) {

	var self;
	
	function objectPanelBodyComponent(params) {
		self = this;
		this.data = this.data || ko.observable(params.data.value);
		this.config = params.config;
		this._panelName = params.data.key;
		this.cardIndex = this.cardIndex || ko.utils.unwrapObservable(params.index);
		this.panelGroup = params.panelGroup;
		this.getMore = this.panelGroup.getMore;
		this.pageParam = params.page && params.page.parameter;
	}
	
	objectPanelBodyComponent.prototype.onEnterKeyDown = function (model, event) {
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
	
	objectPanelBodyComponent.prototype.canBeCopied = function () {
		if (typeof this.value === 'object') return false;
		this.copied = ko.observable(false);
		if (Object.getProp(self.config, '._CONFIG.copyBtn.' + this.key)) {
			return true;
		}
	
		return false;
	};
	
	objectPanelBodyComponent.prototype.copyValue = function (model, event) {
		var currentField = this;
		self.clipboard = new Clipboard(event.currentTarget);
		self.clipboard.on('success', function onSuccessCopy(e) {
				console.info('Action:', e.action);
				console.info('Text:', e.text);
				console.info('Trigger:', e.trigger);
				currentField.copied(true);
				setTimeout(function () {
					currentField.copied(false);
				}, 2000);
				e.clearSelection();
			})
			.on('error', function onErrorCopy(e) {
				console.error('Action:', e.action);
				console.error('Trigger:', e.trigger);
			});
	};
	
	objectPanelBodyComponent.prototype.removeHandler = function () {
		self.clipboard && self.clipboard.destroy();
		delete self.clipboard;
	};
	
	module.exports = ko.components.register('object-panel-body', {
		viewModel:  objectPanelBodyComponent,
		template:`
			<section>
			
				<!-- ko if: $component._panelName === 'image' -->
					<img data-bind="attr: {src: ko.utils.unwrapObservable(data).url, alt: 'image-' + ko.utils.unwrapObservable(data).ratio}" alt="img" class="img img-thumbnail">
				<!-- /ko -->
				
				<ul data-bind="foreachprop: data">
					<li class="clearfix">
						<b class="key">
							<span data-bind="text: typeof value === 'object' ? key: key + ':'"></span>
						</b>
						
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
							<button data-bind="click: $component.getMore.bind($component, key, value)" type="button" class="btn btn-icon blue-shevron-right pull-right"></button>
						<!-- /ko -->
					</li>
				</ul>
			</section>
	`});


/***/ },
/* 24 */
/***/ function(module, exports) {

	var self;
	
	function objectPanelBodyComponent(params) {
		self = this;
		this.title = params.data.key;
		this.data = params.data.value;
		this.config = params.config;
		this._panelName = params.data.key;
		this.cardIndex = this.cardIndex || ko.utils.unwrapObservable(params.index);
		this.panelGroup = params.panelGroup;
		this.getMore = this.panelGroup.getMore;
	}
	
	
	module.exports = ko.components.register('array-panel-body', {
		viewModel:  objectPanelBodyComponent,
		template:`
			<ul data-bind="foreach: data" class="list-group">
				<li class="list-group-item">
				
					<!-- ko if: $parent._panelName === 'images' -->
						<img data-bind="attr: {src: url, alt: 'image-' + ratio}" alt="img" class="img">
					<!-- /ko -->
					
					<!-- ko ifnot: $parent._panelName === 'images' -->
					<span data-bind="text: name || '#' + $index()" class="name truncate">event name</span>
					<!-- /ko -->
					
					<!-- ko if: typeof $data === 'object' -->
						<button data-bind="click: $component.getMore.bind($component, $index())" type="button" class="btn btn-icon blue-shevron-right pull-right"></button>
					<!-- /ko -->
					
				</li>
			</ul>
	`});


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWRmMjYyNjI1ZjNmMmNlOTc4YzMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY3VzdG9tQmluZGluZ3MvZm9yZWFjaFByb3AuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9hcGlrZXkuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvYWpheFNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvY29uZmlnU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvVmlld01vZGVscy9tZW51Vmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2hlbHBlckZ1bmMuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvcGFyYW1zVmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9WaWV3TW9kZWxzL21ldGhvZHNWaWV3TW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvcmVxdWVzdHNMaXN0Vmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2pzb24taGlnaGxpZ2h0LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2hpZ2hsaWdodEpzb24ud29ya2VyLmpzIiwid2VicGFjazovLy8uL34vd29ya2VyLWxvYWRlci9jcmVhdGVJbmxpbmVXb3JrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvc2xpZGVyLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbmZpZy5qc29uIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL2N1c3RvbVNlbGVjdC5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL3BhbmVsR3JvdXAuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYW5lbC5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL3BhZ2luYXRpb24uY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYW5lbEhlYWRpbmcuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9vYmplY3RQYW5lbEJvZHkuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9hcnJheVBhbmVsQm9keS5jb21wb25lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBb0M7QUFDcEMsMkJBQTBCO0FBQzFCO0FBQ0EsK0JBQThCLE9BQU87QUFDckM7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN6SUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSixJQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNyQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOzs7Ozs7O0FDeEdBLHNJQUFxSTs7QUFFckk7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWdCLFdBQVc7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNB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O0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBMkIsZ0dBQWdHO0FBQzNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3REFBdUQsbUNBQW1DLFNBQVMsbUJBQW1CO0FBQ3RIO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBaUMsb0VBQW9FLFFBQVEsaUJBQWlCLFNBQVMsNEVBQTRFO0FBQ25OOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7Ozs7Ozs7QUM5RkY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNEIsZ0NBQWdDO0FBQzVEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUUiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA1ZGYyNjI2MjVmM2YyY2U5NzhjM1xuICoqLyIsIi8qKlxuICogTWFpbiBmaWxlIGZvciBBcGkgRXhwbHJlciB2Mi4wXG4gKiBGb3IgZGV2ZWxvcG1lbnQgcGxlYXNlIHVzZSBXZWJwYWNrIHRvIGJ1bmRsZSBhbGwgbW9kdWxlc1xuICogSXQgY2FuIGJlIG1hZGUgdXNpbmcgbnBtIHNjcmlwdHMgY21kIC0gJ3dlYnBhY2snXG4gKi9cbi8vIGN1c3RvbSBiaW5kaW5nc1xucmVxdWlyZSgnLi4vY3VzdG9tQmluZGluZ3MvZm9yZWFjaFByb3AnKTtcblxuLy8gTW9kdWxlc1xudmFyIGJhc2UgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2Jhc2UnKTtcbnZhciBhcGlLZXkgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2FwaWtleScpO1xudmFyIGFqYXhTZXJ2aWNlID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9hamF4U2VydmljZScpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29uZmlnU2VydmljZScpO1xuXG4vLyBWaWV3IE1vZGVsc1xudmFyIE1lbnVWaWV3TW9kZWwgPSByZXF1aXJlKCcuL21lbnVWaWV3TW9kZWwnKTtcbnZhciBQYXJhbXNWaWV3TW9kZWwgPSByZXF1aXJlKCcuL3BhcmFtc1ZpZXdNb2RlbCcpO1xudmFyIE1ldGhvZHNWaWV3TW9kZWwgPSByZXF1aXJlKCcuL21ldGhvZHNWaWV3TW9kZWwnKTtcbnZhciBSZXF1ZXN0c0xpc3RWaWV3TW9kZWwgPSByZXF1aXJlKCcuL3JlcXVlc3RzTGlzdFZpZXdNb2RlbCcpO1xuXG4vLyBDb21wb25lbnRzXG5yZXF1aXJlKCcuLi9jb21wb25lbnRzL2luZGV4Jyk7XG5cbi8qKlxuICogTWFpbiBhcHBsaWNhdGlvbiB2aWV3LW1vZGVsXG4gKiBAcGFyYW0gb2JqIHtvYmplY3R9IGdsb2JhbCBkYXRhIG9iamVjdFxuICovXG5mdW5jdGlvbiBBcHBWaWV3TW9kZWwob2JqKSB7XG4gIHZhciBiYXNlID0gb2JqIHx8IHt9O1xuICBzZWxmID0gdGhpcztcbiAgdGhpcy5hcGlLZXkgPSBhcGlLZXk7XG5cdHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAvLyBvYnNlcnZhYmxlc1xuICB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkgPSBrby5vYnNlcnZhYmxlKCcnKTtcbiAgdGhpcy5zZWxlY3RlZE1ldGhvZCA9IGtvLm9ic2VydmFibGUoJycpO1xuICB0aGlzLnNlbGVjdGVkUGFyYW1zID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcblx0dGhpcy5yZXF1ZXN0cyA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XG5cblx0Ly8gY29tcHV0ZWRcbiAgdGhpcy5VUkwgPSBrby5jb21wdXRlZCh0aGlzLmdldFVybCwgdGhpcyk7XG4gIHRoaXMuc2VuZEJ1dHRvblRleHQgPSBrby5wdXJlQ29tcHV0ZWQodGhpcy5nZXRNZXRob2ROYW1lLCB0aGlzKTtcblxuICAvLyBzdWItbW9kZWxzXG4gIHRoaXMubWVudSA9IG5ldyBNZW51Vmlld01vZGVsKGJhc2UsIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSk7XG4gIHRoaXMubWV0aG9kcyA9IG5ldyBNZXRob2RzVmlld01vZGVsKGJhc2UsIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSwgdGhpcy5zZWxlY3RlZE1ldGhvZCk7XG4gIHRoaXMucGFyYW1zID0gbmV3IFBhcmFtc1ZpZXdNb2RlbChiYXNlLCB0aGlzLnNlbGVjdGVkTWV0aG9kLCB0aGlzLnNlbGVjdGVkUGFyYW1zKTtcblx0dGhpcy5zaGFyZVBhdGggPSBrby5wdXJlQ29tcHV0ZWQoZm9ybURlZXBMaW5raW5nVXJsLCB0aGlzKTtcbiAgdGhpcy5yZXF1ZXN0c0xpc3QgPSBuZXcgUmVxdWVzdHNMaXN0Vmlld01vZGVsKHRoaXMucmVxdWVzdHMsIHRoaXMuc2VsZWN0ZWRQYXJhbXMsIHRoaXMuc2hhcmVQYXRoKTtcbn1cblxuLyoqXG4gKiBTZW5kIHJlcXVlc3QgbWV0aG9kXG4gKi9cbkFwcFZpZXdNb2RlbC5wcm90b3R5cGUub25DbGlja1NlbmRCdG4gPSBmdW5jdGlvbiAoKSB7XG4gIGFqYXhTZXJ2aWNlKHRoaXMuVVJMKCksIHRoaXMucmVxdWVzdHMsIGJhc2UpO1xufTtcblxuLyoqXG4gKiBHZXRzIGN1cnJlbnQgbWV0aG9kIG5hbWVcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbkFwcFZpZXdNb2RlbC5wcm90b3R5cGUuZ2V0TWV0aG9kTmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRNZXRob2QoKS5tZXRob2QudG9Mb3dlckNhc2UoKTtcbn07XG5cbi8qKlxuICogR2V0cyByYXcgdXJsIGRhdGEgYXJyYXlcbiAqIEByZXR1cm5zIHsqW119XG4gKi9cbkFwcFZpZXdNb2RlbC5wcm90b3R5cGUuZ2V0VXJsID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gW1xuICAgIHRoaXMuc2VsZWN0ZWRNZXRob2QoKSxcbiAgICB0aGlzLmFwaUtleSxcbiAgICB0aGlzLnNlbGVjdGVkUGFyYW1zKClcbiAgXTtcbn07XG5cbi8qKlxuICogR2V0cyBkZWVwIHByb3BcbiAqIEByZXR1cm5zIHsqW119XG4gKi9cbk9iamVjdC5nZXRQcm9wID0gZnVuY3Rpb24obywgcykge1xuXHRpZiAodHlwZW9mIG8gIT09ICdvYmplY3QnIHx8ICFzKSB7XG5cdFx0Y29uc29sZS5sb2cobyxzKTtcblx0XHRyZXR1cm47XG5cdH1cblx0cyA9IHMucmVwbGFjZSgvXFxbKFxcdyspXFxdL2csICcuJDEnKTsgLy8gY29udmVydCBpbmRleGVzIHRvIHByb3BlcnRpZXNcblx0cyA9IHMucmVwbGFjZSgvXlxcLi8sICcnKTsgICAgICAgICAgIC8vIHN0cmlwIGEgbGVhZGluZyBkb3Rcblx0dmFyIGEgPSBzLnNwbGl0KCcuJyk7XG5cdGZvciAodmFyIGkgPSAwLCBuID0gYS5sZW5ndGg7IGkgPCBuOyArK2kpIHtcblx0XHR2YXIgayA9IGFbaV07XG5cdFx0aWYgKGsgaW4gbykge1xuXHRcdFx0byA9IG9ba107XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIG87XG59O1xuXG4vKipcbiAqIEFjdGl2YXRlcyBrbm9ja291dC5qc1xuICovXG5rby5hcHBseUJpbmRpbmdzKG5ldyBBcHBWaWV3TW9kZWwoYmFzZSkpO1xuLyoqXG4gKiBleHBvcnRzIGdsb2JhbCB2YXJpYWJsZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2U7XG5cbmZ1bmN0aW9uIGZvcm1EZWVwTGlua2luZ1VybCgpIHtcblx0dmFyIGxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uO1xuXHR2YXIgY2F0ZWdvcnkgPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHNlbGYuc2VsZWN0ZWRDYXRlZ29yeSk7XG5cdHZhciBtZXRob2QgPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHNlbGYuc2VsZWN0ZWRNZXRob2QpO1xuXHR2YXIgcGFyYW1zID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShzZWxmLnNlbGVjdGVkUGFyYW1zKTtcblxuXHR2YXIgcXVlcnlzID0gW1xuXHRcdCdhcGk9JyArIGVuY29kZVVSSShjYXRlZ29yeSksXG5cdFx0J21ldGhvZD0nKyBlbmNvZGVVUkkobWV0aG9kLmlkKVxuXHRdO1xuXG5cdHBhcmFtcy5tYXAoZnVuY3Rpb24gKHBhcmFtKSB7XG5cdFx0dmFyIHZhbHVlID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShwYXJhbS52YWx1ZSk7XG5cdFx0dmFyIGRlZmF1bHRWYWx1ZSA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUocGFyYW0uZGVmYXVsdCk7XG5cdFx0cXVlcnlzLnB1c2goW1xuXHRcdFx0cGFyYW0ubmFtZSxcblx0XHRcdCc9Jyxcblx0XHRcdHZhbHVlICE9PSAnJyA/IHZhbHVlIDogZGVmYXVsdFZhbHVlIC8vdG9kbzogcmVtb3ZlIGRlZmF1bHQgZnJvbSBoZXJlIHdoZW4gc2V0IHVwIGl0IGluIHNvdXJjZSBsaWtlIHZhbHVlIGJ5IGRlZmF1bHRcblx0XHRdLmpvaW4oJycpKTtcblx0XHRyZXR1cm4gcGFyYW07XG5cdH0pO1xuXG5cdHJldHVybiBbXG5cdFx0bG9jYXRpb24ub3JpZ2luLFxuXHRcdGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcLyQvZ21pLCAnJyksXG5cdFx0Jz8nLFxuXHRcdHF1ZXJ5cy5qb2luKCcmJylcblx0XS5qb2luKCcnKTtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvVmlld01vZGVscy9tYWluLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiIG1vZHVsZS5leHBvcnRzID0ga28uYmluZGluZ0hhbmRsZXJzLmZvcmVhY2hwcm9wID0ge1xyXG5cclxuXHR0cmFuc2Zvcm1PYmplY3Q6IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuXHRcdHZhciBwcm9wZXJ0aWVzID0gW107XHJcblx0XHR2YXIgb2JqLCBzb3J0Rm4gPSBwYXJhbXMuc29ydEZuO1xyXG5cclxuXHRcdGlmIChzb3J0Rm4pIHtcclxuXHRcdFx0b2JqID0gcGFyYW1zLmRhdGE7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRvYmogPSBwYXJhbXM7XHJcblx0XHR9XHJcblxyXG5cdFx0a28udXRpbHMub2JqZWN0Rm9yRWFjaChvYmosIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcblx0XHRcdHByb3BlcnRpZXMucHVzaCh7XHJcblx0XHRcdFx0a2V5OiBrZXksXHJcblx0XHRcdFx0dmFsdWU6IHZhbHVlXHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKHNvcnRGbikge1xyXG5cdFx0XHRwcm9wZXJ0aWVzLnNvcnQoc29ydEZuKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcHJvcGVydGllcztcclxuXHR9LFxyXG5cdGluaXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IsIGFsbEJpbmRpbmdzQWNjZXNzb3IsIHZpZXdNb2RlbCwgYmluZGluZ0NvbnRleHQpIHtcclxuXHRcdHZhciBwcm9wZXJ0aWVzID0ga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIG9iaiA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUodmFsdWVBY2Nlc3NvcigpKTtcclxuXHRcdFx0cmV0dXJuIGtvLmJpbmRpbmdIYW5kbGVycy5mb3JlYWNocHJvcC50cmFuc2Zvcm1PYmplY3Qob2JqKTtcclxuXHRcdH0pO1xyXG5cdFx0a28uYXBwbHlCaW5kaW5nc1RvTm9kZShlbGVtZW50LCB7XHJcblx0XHRcdGZvcmVhY2g6IHByb3BlcnRpZXNcclxuXHRcdH0sIGJpbmRpbmdDb250ZXh0KTtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGNvbnRyb2xzRGVzY2VuZGFudEJpbmRpbmdzOiB0cnVlXHJcblx0XHR9O1xyXG5cdH1cclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jdXN0b21CaW5kaW5ncy9mb3JlYWNoUHJvcC5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiYXNlID0ge307XG52YXIgQ09ORklHX1VSTCA9ICcuLi8uLi9hcGlkZXNjcmlwdGlvbi54bWwnO1xuXG52YXIgcGFyc2VEYXRhID0gZnVuY3Rpb24gKHhtbCkge1xuXHR2YXIgZ2xvYmFsID0ge307XG5cdC8vZ2V0IGFsbCBBUElzXG5cdHZhciByZXNvdXJjZXNFbCA9ICQoeG1sKS5maW5kKFwicmVzb3VyY2VzXCIpLmVxKDApO1xuXG5cdC8vIHJlc291cmNlXG5cdCQoeG1sKVxuXHRcdC5maW5kKFwicmVzb3VyY2VcIilcblx0XHQuZ2V0KClcblx0XHQubWFwKGZ1bmN0aW9uIChyZXMpIHtcblx0XHRcdHZhciByZXNvdXJjZSA9ICQocmVzKTtcblx0XHRcdC8vIG1ldGhvZCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0dmFyIG1ldGhvZEVsZW0gPSByZXNvdXJjZS5maW5kKFwibWV0aG9kXCIpLmVxKDApO1xuXG5cdFx0XHR2YXIgbWV0aG9kID0ge1xuXHRcdFx0XHRpZCA6IG1ldGhvZEVsZW0uYXR0cihcImlkXCIpLCAvLyBtZXRob2QgaWRcblx0XHRcdFx0bmFtZSA6IG1ldGhvZEVsZW0uYXR0cihcImFwaWdlZTpkaXNwbGF5TmFtZVwiKSB8fCBtZXRob2RFbGVtLmF0dHIoXCJpZFwiKSwgLy8gbWV0aG9kIG5hbWVcblx0XHRcdFx0bWV0aG9kIDogbWV0aG9kRWxlbS5hdHRyKCduYW1lJyksIC8vIEdFVCBvciBQT1NUXG5cdFx0XHRcdGNhdGVnb3J5IDogbWV0aG9kRWxlbS5maW5kKCdbcHJpbWFyeT1cInRydWVcIl0nKS50ZXh0KCkudHJpbSgpLCAvLyBBUEkgbmFtZVxuXHRcdFx0XHRwYXRoOiByZXNvdXJjZS5hdHRyKCdwYXRoJyksIC8vIG1ldGhvZCBVUkxcblx0XHRcdFx0YmFzZSA6IHJlc291cmNlc0VsLmF0dHIoJ2Jhc2UnKSwgLy8gbWV0aG9kIGJhc2UgbGlua1xuXHRcdFx0XHRsaW5rIDogbWV0aG9kRWxlbS5maW5kKCdkb2MnKS5lcSgwKS5hdHRyKCdhcGlnZWU6dXJsJyksIC8vIGxpbmsgdG8gZG9jdW1lbnRhdGlvblxuXHRcdFx0XHRkZXNjcmlwdGlvbiA6IG1ldGhvZEVsZW0uZmluZCgnZG9jJykuZXEoMCkudGV4dCgpLnRyaW0oKSwgLy9tZXRob2QgZGVzY3JpcHRpb25cblx0XHRcdFx0cGFyYW1ldGVyczoge31cblx0XHRcdH07XG5cblx0XHRcdC8vIHBhcmFtcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0cmVzb3VyY2Vcblx0XHRcdFx0LmZpbmQoJ3BhcmFtJylcblx0XHRcdFx0LmdldCgpXG5cdFx0XHRcdC5tYXAoZnVuY3Rpb24gKHBhcikge1xuXHRcdFx0XHRcdHZhciBwYXJhbSA9ICQocGFyKTtcblx0XHRcdFx0XHR2YXIgb3B0aW9ucyA9IHBhcmFtLmZpbmQoJ29wdGlvbicpO1xuXHRcdFx0XHRcdHZhciBpc1NlbGVjdCA9ICEhb3B0aW9ucy5sZW5ndGg7XG5cblx0XHRcdFx0XHR2YXIgcGFyYW1ldGVyID0ge1xuXHRcdFx0XHRcdFx0bmFtZTogcGFyYW0uYXR0cignbmFtZScpLFxuXHRcdFx0XHRcdFx0ZG9jOiBwYXJhbS5maXJzdCgnZG9jJykudGV4dCgpLnRyaW0oKSxcblx0XHRcdFx0XHRcdHN0eWxlOiBwYXJhbS5hdHRyKCdzdHlsZScpLFxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ6IHBhcmFtLmF0dHIoJ3JlcXVpcmVkJyksXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiBwYXJhbS5hdHRyKCdkZWZhdWx0JykgPT09ICdub25lJyAmJiBpc1NlbGVjdCA/ICcnIDogcGFyYW0uYXR0cignZGVmYXVsdCcpLFxuXHRcdFx0XHRcdFx0c2VsZWN0OiBpc1NlbGVjdFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRpZiAoaXNTZWxlY3QpIHtcblx0XHRcdFx0XHRcdHBhcmFtZXRlci5vcHRpb25zID0gb3B0aW9ucy5nZXQoKS5tYXAoZnVuY3Rpb24gKG9wdGlvbikge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHRcdG5hbWU6ICQob3B0aW9uKS5hdHRyKCd2YWx1ZScpLFxuXHRcdFx0XHRcdFx0XHRcdGNoZWNrZWQ6ICQob3B0aW9uKS5hdHRyKCd2YWx1ZScpID09PSBwYXJhbWV0ZXIuZGVmYXVsdCB8fCAkKG9wdGlvbikuYXR0cigndmFsdWUnKSA9PT0gJ25vbmUnLFxuXHRcdFx0XHRcdFx0XHRcdGxpbms6IGZhbHNlXG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRtZXRob2QucGFyYW1ldGVyc1twYXJhbWV0ZXIubmFtZV0gPSBwYXJhbWV0ZXI7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIEdsb2JhbCBvYmogY29tcG9zaXRpb25cbiAgICAgICAqL1xuXHRcdFx0Ly8gc2V0IGNhdGVnb3J5IG9ialxuXHRcdFx0Z2xvYmFsW21ldGhvZC5jYXRlZ29yeV0gPSBnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XSB8fCB7fTtcblxuXHRcdFx0Ly8gc2V0IG1ldGhvZHMgdHlwZSBvYmpcblx0XHRcdGdsb2JhbFttZXRob2QuY2F0ZWdvcnldLkFMTCA9IGdsb2JhbFttZXRob2QuY2F0ZWdvcnldLkFMTCB8fCB7fTtcblx0XHRcdGdsb2JhbFttZXRob2QuY2F0ZWdvcnldW21ldGhvZC5tZXRob2RdID0gZ2xvYmFsW21ldGhvZC5jYXRlZ29yeV1bbWV0aG9kLm1ldGhvZF0gfHwge307XG5cblx0XHRcdC8vIHNldCBtZXRob2Qgb2JqXG5cdFx0XHRnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XS5BTExbbWV0aG9kLmlkXSA9IG1ldGhvZDtcblx0XHRcdGdsb2JhbFttZXRob2QuY2F0ZWdvcnldW21ldGhvZC5tZXRob2RdW21ldGhvZC5pZF0gPSBtZXRob2Q7XG5cdFx0fSk7XG5cblx0cmV0dXJuIGdsb2JhbDtcbn07XG5cbi8vZ2V0cyBkb2N1bWVudCBmcm9tIFdBREwgY29uZmlndXJhdGlvbiBmaWxlXG52YXIgcmVhZEZyb21XQURMID0gZnVuY3Rpb24gKCkge1xuICAkLmFqYXgoe1xuICAgIHVybDogQ09ORklHX1VSTCxcbiAgICBhc3luYyA6IGZhbHNlLFxuICAgIGRhdGFUeXBlOiAoJC5icm93c2VyLm1zaWUpID8gXCJ0ZXh0XCIgOiBcInhtbFwiLFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICB2YXIgeG1sO1xuXG4gICAgICBpZiAodHlwZW9mIHJlc3BvbnNlID09IFwic3RyaW5nXCIpe1xuICAgICAgICB4bWwgPSBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxET01cIik7XG4gICAgICAgIHhtbC5hc3luYyA9IGZhbHNlO1xuICAgICAgICB4bWwubG9hZFhNTChyZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB4bWwgPSByZXNwb25zZTtcbiAgICAgIH1cblxuXHRcdFx0YmFzZSA9IHBhcnNlRGF0YSh4bWwpO1xuICAgIH0sXG5cbiAgICBlcnJvcjogZnVuY3Rpb24oWE1MSHR0cFJlcXVlc3QsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKXtcbiAgICAgIGFsZXJ0KCdEYXRhIENvdWxkIE5vdCBCZSBMb2FkZWQgLSAnKyB0ZXh0U3RhdHVzKTtcbiAgICB9XG4gIH0pO1xufTtcbnJlYWRGcm9tV0FETCgpO1xubW9kdWxlLmV4cG9ydHMgPSBiYXNlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2Jhc2UuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYXBpS2V5ID0gJ1hpT3JOMlVDOXlqdVI0WEY4N3NkTWJScGFWTnNQNlcyJyB8fCBhcGlLZXlTZXJ2aWNlLmNoZWNrQXBpS2V5Q29va2llKCd0ay1hcGkta2V5JykgfHwgYXBpS2V5U2VydmljZS5nZXRBcGlFeHBsb3JlS2V5KCk7IC8vQVBJIEtleVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgbmFtZTogJ2FwaWtleScsXHJcbiAgc3R5bGU6ICdxdWVyeScsXHJcbiAgdmFsdWU6IGtvLm9ic2VydmFibGUoYXBpS2V5KVxyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvYXBpa2V5LmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXHJcbiAqIEFqYXggU2VydmljZVxyXG4gKiBAcGFyYW0gdXJsXHJcbiAqIEBwYXJhbSBtZXRob2RcclxuICogQHBhcmFtIGNhbGxiYWNrXHJcbiAqL1xyXG52YXIgYWpheFNlcnZpY2UgPSBmdW5jdGlvbiAodXJsLCBtZXRob2QsIGNhbGxiYWNrKSB7XHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IG1ldGhvZCxcclxuICAgIHVybDogdXJsLFxyXG4gICAgYXN5bmM6IHRydWUsXHJcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICBjb21wbGV0ZTogY2FsbGJhY2tcclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGaWx0ZXJzIGFuZCBwcmVwYXJlcyBwYXJhbXMgcGFpcnNcclxuICogQHBhcmFtIGFyclxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbnZhciBwcmVwYXJlVXJsID0gZnVuY3Rpb24gKGFycikge1xyXG4gIHZhciByZXBsYWNlbWVudCwgdXJsLCBkb21haW4sIHBhdGgsIG1ldGhvZCwgYXBpS2V5LCBwYXJhbXM7XHJcblxyXG4gIGlmICghYXJyICYmICFhcnIubGVuZ3RoKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIFxyXG4gIGRvbWFpbiA9IGFyclswXS5iYXNlO1xyXG4gIHBhdGggPSBhcnJbMF0ucGF0aDtcclxuICBhcGlLZXkgPSBhcnJbMV07XHJcbiAgcGFyYW1zID0gYXJyWzJdLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgcmV0dXJuIGl0ZW0uc3R5bGUgPT09ICdxdWVyeSc7XHJcbiAgfSk7XHJcblxyXG4gIC8vIGFyciBvZiB0ZW1wbGF0ZSBtYXJrc1xyXG4gIHJlcGxhY2VtZW50ID0gcGF0aC5tYXRjaCgvKFtee10qPylcXHcoPz1cXH0pL2dtaSk7XHJcblxyXG4gIC8vIGFyciBvZiB0ZW1wbGF0ZSBwYXJhbXNcclxuICB2YXIgdGVtcGxhdGVzQXJyID0gYXJyWzJdLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgcmV0dXJuIGl0ZW0uc3R5bGUgPT09ICd0ZW1wbGF0ZSc7XHJcbiAgfSk7XHJcblxyXG4gIC8vIHJlcGxhY2VtZW50XHJcbiAgcmVwbGFjZW1lbnQuZm9yRWFjaChmdW5jdGlvbiAodmFsKSB7XHJcbiAgICB2YXIgcGFyYW0gPSB0ZW1wbGF0ZXNBcnIuZmluZChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICByZXR1cm4gaXRlbS5uYW1lID09PSB2YWw7XHJcbiAgICB9KTtcclxuICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoJ3snKyBwYXJhbS5uYW1lICsgJ30nLCBwYXJhbS52YWx1ZSgpIHx8IHBhcmFtLmRlZmF1bHQpO1xyXG4gIH0pO1xyXG5cclxuICAvLyBhZGRzIGFwaUtleSBwYXJhbVxyXG4gIGlmICghcGFyYW1zWzBdIHx8IHBhcmFtc1swXS5uYW1lICE9PSAnYXBpa2V5Jykge1xyXG4gICAgcGFyYW1zLnVuc2hpZnQoYXBpS2V5KTtcclxuICB9XHJcblxyXG4gIC8vIHByZXBhcmVzIHBhcmFtcyBwYXJ0IG9mIHVybFxyXG4gIHBhcmFtcyA9IHBhcmFtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgcmV0dXJuIFtpdGVtLm5hbWUsIGl0ZW0udmFsdWUoKSB8fCBpdGVtLmRlZmF1bHRdLmpvaW4oJz0nKTtcclxuICAgIH0pLmpvaW4oJyYnKTtcclxuXHJcbiAgdXJsID0gW2RvbWFpbiwgJy8nLCBwYXRoLCAnPycsIHBhcmFtc10uam9pbignJyk7XHJcblxyXG4gIHJldHVybiBlbmNvZGVVUkkodXJsKTtcclxufTtcclxuXHJcbi8vIHNlbmRzIHJlcXVlc3QgdG8gZ2V0IHRoZSBzZWNvbmQgY29sdW1uXHJcbnZhciBzZW5kUHJpbWFyeVJlcXVlc3QgPSBmdW5jdGlvbiAoYXJyLCByZXF1ZXN0cywgZ2xvYmFsKSB7XHJcbiAgdmFyIHVybCA9IHByZXBhcmVVcmwoYXJyKTtcclxuXHJcbiAgYWpheFNlcnZpY2UodXJsLCBhcnJbMF0ubWV0aG9kLCBmdW5jdGlvbihyZXMsIG1zZykge1xyXG5cdFx0dmFyIHJlc09iaiA9IHtcclxuXHRcdFx0cmVxOiB1cmwsXHJcblx0XHRcdGluZGV4OiByZXF1ZXN0cygpLmxlbmd0aFxyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAobXNnID09ICdlcnJvcicpIHtcclxuXHRcdFx0dmFyIGVyciA9IHJlcyAmJlxyXG5cdFx0XHRcdHJlcy5yZXNwb25zZUpTT04gJiZcclxuXHRcdFx0XHRyZXMucmVzcG9uc2VKU09OLmVycm9ycyAmJlxyXG5cdFx0XHRcdHJlcy5yZXNwb25zZUpTT04uZXJyb3JzWzBdO1xyXG5cclxuXHRcdFx0cmVzT2JqLmVycm9yID0ge1xyXG5cdFx0XHRcdGNvZGU6IGVyciA/IGVyci5jb2RlOiA1MDAsXHJcblx0XHRcdFx0bWVzc2FnZTogZXJyID8gZXJyLmRldGFpbDogJ05vIHJlc3BvbmNlIGRhdGEhJ1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRnbG9iYWwubGFzdFJlc3BvbnNlID0gcmVzT2JqLnJlcyA9IHtcclxuXHRcdFx0XHRpZDogYXJyWzBdLmlkLCAvLyBtZXRob2QgaWQgd2FzIHVzZWRcclxuXHRcdFx0XHRyZXM6IHJlcy5yZXNwb25zZUpTT04gLy8gcmVzcG9uc2VcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBleHBvcnRpbmcgZGF0YSB1c2luZyBvYnNlcnZhYmxlXHJcblx0XHRyZXF1ZXN0cy51bnNoaWZ0KHJlc09iaik7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBzZW5kUHJpbWFyeVJlcXVlc3Q7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9hamF4U2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjb25maWcgPSBrby5vYnNlcnZhYmxlKCk7XG5cbiQuYWpheCh7XG5cdHR5cGU6ICdHRVQnLFxuXHR1cmw6IFtcblx0XHQnaHR0cDovLycsXG5cdFx0ZG9jdW1lbnQubG9jYXRpb24uaG9zdG5hbWUsXG5cdFx0ZG9jdW1lbnQubG9jYXRpb24ucG9ydCAmJiAnOicgKyBkb2N1bWVudC5sb2NhdGlvbi5wb3J0LFxuXHRcdCcvc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29uZmlnLmpzb24nXG5cdF0uam9pbignJyksXG5cdGFzeW5jOiB0cnVlLFxuXHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdGNvbXBsZXRlOiBmdW5jdGlvbihyZXMsIG1zZykge1xuXHRcdGlmIChtc2cgPT0gJ2Vycm9yJykge1xuXHRcdFx0Y29uc29sZS5lcnJvcignY2FuXFwndCBsb2FkIGNvbmZpZy5qc29uIScpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25maWcocmVzLnJlc3BvbnNlSlNPTik7XG5cdFx0fVxuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb25maWc7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvY29uZmlnU2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBoZiA9IHJlcXVpcmUoJy4uL21vZHVsZXMvaGVscGVyRnVuYycpO1xyXG52YXIgc2VsZjtcclxuXHJcblxyXG4vKipcclxuICogTWVudSBWaWV3LU1vZGVsXHJcbiAqIEBwYXJhbSBiYXNlXHJcbiAqIEBwYXJhbSBjYXRlZ29yeVxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIE1lbnVWaWV3TW9kZWwoYmFzZSwgY2F0ZWdvcnkpIHtcclxuICBzZWxmID0gdGhpcztcclxuICB0aGlzLmNhdGVnb3J5ID0gY2F0ZWdvcnk7XHJcbiAgdGhpcy5jYXRlZ29yaWVzID0ga28ub2JzZXJ2YWJsZUFycmF5KE9iamVjdC5rZXlzKGJhc2UpLm1hcChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNoZWNrZWQ6IGtvLm9ic2VydmFibGUoIWluZGV4KSxcclxuICAgICAgbmFtZTogaXRlbSxcclxuICAgICAgbGluazogZmFsc2VcclxuICAgIH1cclxuICB9KSk7XHJcblxyXG4gIC8vIGluaXRpYWwgbG9hZFxyXG4gIHRoaXMuc2VsZWN0Q2F0ZWdvcnkodGhpcy5jYXRlZ29yaWVzKClbMF0pO1xyXG59XHJcblxyXG4vKipcclxuICogTWVudSBWaWV3LU1vZGVsIG1ldGhvZFxyXG4gKiBAcGFyYW0gY2F0ZWdvcnlcclxuICovXHJcbk1lbnVWaWV3TW9kZWwucHJvdG90eXBlLnNlbGVjdENhdGVnb3J5ID0gZnVuY3Rpb24gKGNhdGVnb3J5KSB7XHJcbiAgdmFyIGNhdGVnb3J5TmFtZSA9IGNhdGVnb3J5Lm5hbWU7XHJcbiAgc2VsZi5jYXRlZ29yeShjYXRlZ29yeU5hbWUpO1xyXG4gIGhmLmNoZWNrQWN0aXZlKHNlbGYuY2F0ZWdvcmllcywgY2F0ZWdvcnlOYW1lKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTWVudVZpZXdNb2RlbDtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9WaWV3TW9kZWxzL21lbnVWaWV3TW9kZWwuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzLmdldE1vZGVsQXJyYXkgPSBmdW5jdGlvbiBnZXRNb2RlbEFycmF5KHBhcmFtcykge1xyXG4gICAgdmFyIG9iaiA9IHBhcmFtcy5vYmogfHwge30sXHJcbiAgICAgICAgYXJyID0gcGFyYW1zLmFyciB8fCBbXSxcclxuICAgICAgICBwcm9wID0gcGFyYW1zLnByb3AgfHwgJ25hbWUnO1xyXG5cclxuICAgIGZvciAodmFyIGkgaW4gb2JqKSB7XHJcbiAgICAgICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoaSkpIHsgY29udGludWU7IH1cclxuXHJcbiAgICAgICAgdmFyIGl0ZW0gPSBhcnIuZmluZChmdW5jdGlvbiAobTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG0xLm5hbWUgPT09IG9ialtpXVtwcm9wXTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGl0ZW0pIHsgY29udGludWU7IH1cclxuXHJcbiAgICAgICAgYXJyLnB1c2goe1xyXG4gICAgICAgICAgICBjaGVja2VkOiBrby5vYnNlcnZhYmxlKGZhbHNlKSxcclxuICAgICAgICAgICAgbmFtZTogb2JqW2ldW3Byb3BdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyO1xyXG59O1xyXG5cclxuZXhwb3J0cy5jaGVja0FjdGl2ZSA9IGZ1bmN0aW9uIGNoZWNrQWN0aXZlKGtvQXJyLCBhY3RpdmVFbGVtKSB7XHJcbiAgICBpZiAoIWtvQXJyICYmICFhY3RpdmVFbGVtKSB7cmV0dXJuIGZhbHNlO31cclxuXHJcbiAgICBrb0Fycihrb0FycigpLm1hcChmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgaWYgKG9iai5uYW1lID09PSBhY3RpdmVFbGVtKSB7XHJcbiAgICAgICAgICAgIG9iai5jaGVja2VkKHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9iai5jaGVja2VkKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH0pKTtcclxufTtcclxuXHJcbmV4cG9ydHMuaXRlcmF0ZSA9IGZ1bmN0aW9uIChvYmopIHtcclxuXHRmb3IgKHZhciBwcm9wZXJ0eSBpbiBvYmopIHtcclxuXHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XHJcblx0XHRcdGlmICh0eXBlb2Ygb2JqW3Byb3BlcnR5XSA9PSBcIm9iamVjdFwiKSB7XHJcblx0XHRcdFx0aXRlcmF0ZShvYmpbcHJvcGVydHldKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnfCcgKyBwcm9wZXJ0eSArIFwiIHwgIFwiICsgb2JqW3Byb3BlcnR5XSArICd8Jyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvaGVscGVyRnVuYy5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xyXG52YXIgYmFzZTtcclxudmFyIGhmID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9oZWxwZXJGdW5jJyk7XHJcbi8qKlxyXG4gKiBQYXJhbXMgVmlldy1Nb2RlbFxyXG4gKiBAcGFyYW0gcmF3XHJcbiAqIEBwYXJhbSBtZXRob2RcclxuICogQHBhcmFtIHBhcmFtc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFBhcmFtc1ZpZXdNb2RlbChyYXcsIG1ldGhvZCwgcGFyYW1zKSB7XHJcbiAgYmFzZSA9IHJhdztcclxuICBzZWxmID0gdGhpcztcclxuICB0aGlzLmFuaW1hdGlvblNwZWVkID0gMjAwO1xyXG5cclxuICAvLyBvYnNlcnZhYmxlc1xyXG4gIHRoaXMubWV0aG9kID0gbWV0aG9kO1xyXG4gIHRoaXMucGFyYW1zID0gcGFyYW1zO1xyXG4gIHRoaXMuaXNIaWRkZW4gPSBrby5vYnNlcnZhYmxlKHRydWUpO1xyXG4gIHRoaXMucGFyYW1JbkZvY3VzID0ga28ub2JzZXJ2YWJsZSgnJyk7XHJcblx0dGhpcy5wYXJhbXNNb2RlbCA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XHJcblxyXG5cdC8vIGNvbXB1dGVkXHJcblx0Ly8gdGhpcy5wYXJhbXNNb2RlbCA9IGtvLmNvbXB1dGVkKHRoaXMudXBkYXRlUGFyYW1zTW9kZWwsIHRoaXMpO1xyXG5cdHRoaXMudXBkYXRlVmlld01vZGVsKCk7XHJcblx0dGhpcy5tZXRob2Quc3Vic2NyaWJlKHRoaXMudXBkYXRlVmlld01vZGVsLCB0aGlzKTtcclxuXHJcblx0dGhpcy5pc0RpcnR5ID0ga28uY29tcHV0ZWQodGhpcy5jaGVja0RpcnR5LCB0aGlzKTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsIGJ1aWxkIG9mIFNlbGVjdCBNb2RlbFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS51cGRhdGVWaWV3TW9kZWwgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIG9iaiA9IHRoaXMubWV0aG9kKCkucGFyYW1ldGVycyB8fCB7fSxcclxuXHRcdGFyciA9IFtdO1xyXG5cclxuXHRmb3IgKHZhciBpIGluIG9iaikge1xyXG5cdFx0aWYgKCFvYmouaGFzT3duUHJvcGVydHkoaSkpIHtjb250aW51ZTt9XHJcblxyXG5cdFx0Ly8gY29waWVzIGFsbCB2YWx1ZXMgZnJvbSBtb2RlbCB0byB2aWV3LW1vZGVsXHJcblx0XHR2YXIgdm1QYXJhbSA9ICQuZXh0ZW5kKHt9LCBvYmpbaV0pO1xyXG5cclxuXHRcdHZtUGFyYW0udmFsdWUgPSBrby5vYnNlcnZhYmxlKHZtUGFyYW0udmFsdWUgfHwgKHZtUGFyYW0uc2VsZWN0ICYmIHZtUGFyYW0uZGVmYXVsdCkgfHwgJycpO1xyXG5cclxuXHRcdC8vYWRkIG9ic2VydmFibGUgZm9yIHNlbGVjdGVkIG9wdGlvbnNcclxuXHRcdGlmICh2bVBhcmFtLnNlbGVjdCkge1xyXG5cdFx0XHR2bVBhcmFtLm9wdGlvbnMgPSBrby5vYnNlcnZhYmxlQXJyYXkob2JqW2ldLm9wdGlvbnMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcblx0XHRcdFx0dmFyIG9iaiA9ICQuZXh0ZW5kKHt9LCBpdGVtKTtcclxuXHRcdFx0XHRvYmouY2hlY2tlZCA9IGtvLm9ic2VydmFibGUoaXRlbS5jaGVja2VkKTtcclxuXHRcdFx0XHRyZXR1cm4gb2JqO1xyXG5cdFx0XHR9KSlcclxuXHRcdH1cclxuXHJcblx0XHQvLyAnZGlydHknIGZsYWcgd2F0Y2hlciBmb3IgY3VycmVudCBmaWVsZFxyXG5cdFx0dm1QYXJhbS5pc0RpcnR5ID0ga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHRoaXMuc2VsZWN0KSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMudmFsdWUoKSAhPT0gdGhpcy5kZWZhdWx0ICYmIHRoaXMudmFsdWUoKSAhPT0gJ25vbmUnO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiAhISh0aGlzLnZhbHVlKCkudG9TdHJpbmcoKSkudHJpbSgpLmxlbmd0aDtcclxuXHRcdH0sIHZtUGFyYW0pO1xyXG5cclxuXHRcdC8vIGFkZCBjYWxlbmRhciBidG4gZm9yIGN1cnJlbnQgZmllbGRcclxuXHRcdHZtUGFyYW0uaGFzQ2FsZW5kYXIgPSBpLnNlYXJjaCgvKGRhdGV8dGltZSkvZ21pKSAhPSAtMTtcclxuXHJcblx0XHQvLyBhZGQgcG9wLXVwIGJ0biBmb3IgY3VycmVudCBmaWVsZFxyXG5cdFx0dm1QYXJhbS5oYXNQb3BVcCA9IGkuc2VhcmNoKC8oYXR0cmFjdGlvbklkfHZlbnVlSWQpL2dtaSkgIT0gLTE7XHJcblxyXG5cdFx0YXJyLnB1c2godm1QYXJhbSk7XHJcblx0fVxyXG5cclxuXHQvLyBwcmVwYXJlIG91dHB1dCBmb3IgcmVxdWVzdFxyXG5cdHRoaXMucGFyYW1zTW9kZWwoYXJyKTtcclxuXHR0aGlzLnBhcmFtSW5Gb2N1cyh0aGlzLnBhcmFtc01vZGVsKClbMF0pO1xyXG5cdHRoaXMucHJlcGFyZVVybFBhaXJzKGFyciwgdGhpcy5wYXJhbXMpO1xyXG5cdHJldHVybiBhcnI7XHJcbn07XHJcblxyXG4vKipcclxuICogRGlydHkgcGFyYW1zIGZvcm0gb2JzZXJ2YWJsZSBtZXRob2RcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5QYXJhbXNWaWV3TW9kZWwucHJvdG90eXBlLmNoZWNrRGlydHkgPSBmdW5jdGlvbiAoKSB7XHJcblx0dGhpcy5wcmVwYXJlVXJsUGFpcnModGhpcy5wYXJhbXNNb2RlbCgpLCB0aGlzLnBhcmFtcyk7XHJcblx0dmFyIGRpcnR5ID0gdGhpcy5wYXJhbXNNb2RlbCgpLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG5cdFx0cmV0dXJuIGl0ZW0uaXNEaXJ0eSgpID09PSB0cnVlO1xyXG5cdH0pO1xyXG5cdHJldHVybiBkaXJ0eS5sZW5ndGggPiAwO1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBFbnRlciBrZXkgaGFuZGxlclxyXG4gKiBAcGFyYW0gbW9kZWxcclxuICogQHBhcmFtIGV2ZW50XHJcbiAqL1xyXG5QYXJhbXNWaWV3TW9kZWwucHJvdG90eXBlLm9uRW50ZXJLZXlEb3duID0gZnVuY3Rpb24gKG1vZGVsLCBldmVudCkge1xyXG4gIGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xyXG4gICAgJCgnI2FwaS1leHAtZ2V0LWJ0bicpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBTbGlkZSB0b2dnbGUgZm9yIHBhcmFtcyBjb250YWluZXIgbWV0aG9kXHJcbiAqIEBwYXJhbSB2aWV3TW9kZWxcclxuICogQHBhcmFtIGV2ZW50XHJcbiAqL1xyXG5QYXJhbXNWaWV3TW9kZWwucHJvdG90eXBlLnNsaWRlVG9nZ2xlID0gZnVuY3Rpb24gKHZpZXdNb2RlbCwgZXZlbnQpIHtcclxuICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpXHJcbiAgICAucGFyZW50cygnLmpzLXNsaWRlLWNvbnRyb2wnKVxyXG4gICAgLmZpbmQoJy5qcy1zbGlkZS13cmFwcGVyJylcclxuICAgIC5zbGlkZVRvZ2dsZSh2aWV3TW9kZWwuYW5pbWF0aW9uU3BlZWQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmlld01vZGVsLmlzSGlkZGVuKCF2aWV3TW9kZWwuaXNIaWRkZW4oKSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBNYWNoZXMgZm9jdXNlZCBwYXJhbVxyXG4gKiBAcGFyYW0gaXRlbVxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5vbkZvY3VzID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICBzZWxmLnBhcmFtSW5Gb2N1cyhpdGVtKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGaWx0ZXJzIHBhcmFtcyBieSBkZWZpbmVkIHZhbHVlXHJcbiAqIEBwYXJhbSBhcnJcclxuICogQHBhcmFtIGtvT2JzXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5wcmVwYXJlVXJsUGFpcnMgPSBmdW5jdGlvbiAoYXJyLCBrb09icykge1xyXG4gIGlmICghYXJyICYmICFrb09icykge3JldHVybiBmYWxzZTt9XHJcblxyXG4gIHJldHVybiBrb09icyhhcnIuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICByZXR1cm4gKGl0ZW0udmFsdWUoKSB8fCBpdGVtLmRlZmF1bHQpO1xyXG4gIH0pKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBPbiBzZWxlY3QgdmFsdWUgaGFuZGxlciBmb3IgcGFyYW1zIHNlbGVjdFxyXG4gKiBAcGFyYW0gcGFyYW0ge29iamVjdH0gcGFyYW1ldGVyIHZpZXctbW9kZWxcclxuICogQHBhcmFtIG9wdGlvbiB7b2JqZWN0fSBvcHRpb24gdmlldy1tb2RlbFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5vblNlbGVjdFBhcmFtVmFsdWUgPSBmdW5jdGlvbiAocGFyYW0sIG9wdGlvbikge1xyXG5cdGhmLmNoZWNrQWN0aXZlKHBhcmFtLm9wdGlvbnMsIG9wdGlvbi5uYW1lKTtcclxuXHRwYXJhbS52YWx1ZShvcHRpb24ubmFtZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUGFyYW1zIGNsZWFyIGJ1dHRvbiBoYW5kbGVyXHJcbiAqIEBwYXJhbSB2bSB7b2JqZWN0fSB2aWV3IG1vZGVsXHJcbiAqIEBwYXJhbSBlIHtvYmplY3R9IGV2ZW50XHJcbiAqL1xyXG5QYXJhbXNWaWV3TW9kZWwucHJvdG90eXBlLm9uUGFyYW1zQ2xlYXIgPSBmdW5jdGlvbiAodm0sIGUpIHtcclxuXHR0aGlzLnVwZGF0ZVZpZXdNb2RlbCgpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQYXJhbXNWaWV3TW9kZWw7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvVmlld01vZGVscy9wYXJhbXNWaWV3TW9kZWwuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgaGYgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2hlbHBlckZ1bmMnKTtcclxudmFyIHNlbGY7XHJcbnZhciBiYXNlO1xyXG52YXIgY2F0ZWdvcnk7XHJcblxyXG4vKipcclxuICogTWV0aG9kcyBWaWV3LU1vZGVsXHJcbiAqIEBwYXJhbSByYXdcclxuICogQHBhcmFtIGNhdGVnb3J5XHJcbiAqIEBwYXJhbSBtZXRob2RcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBNZXRob2RzVmlld01vZGVsKHJhdywgY2F0ZWdvcnksIG1ldGhvZCkge1xyXG4gIHNlbGYgPSB0aGlzO1xyXG4gIGJhc2UgPSByYXc7XHJcblxyXG4gIC8vIG9ic2VydmFibGVzXHJcbiAgdGhpcy5jYXRlZ29yeSA9IGNhdGVnb3J5O1xyXG4gIHRoaXMubWV0aG9kID0gbWV0aG9kO1xyXG4gIHRoaXMudG9nZ2xlUG9wVXAgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcclxuICB0aGlzLnJhZGlvc01vZGVsID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcclxuICB0aGlzLm1ldGhvZHNWaWV3TW9kZWwgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xyXG4gIHRoaXMudXBkYXRlTW9kZWwodGhpcy5jYXRlZ29yeSgpKTtcclxuICB0aGlzLmNhdGVnb3J5LnN1YnNjcmliZSh0aGlzLnVwZGF0ZU1vZGVsLCB0aGlzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE9uIGNhdGVnb3J5IGNoYW5nZSBoYW5kbGVyXHJcbiAqIE1ldGhvZHMgVmlldy1Nb2RlbCBtZXRob2RcclxuICogQHBhcmFtIGNhdGVnb3J5XHJcbiAqL1xyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS51cGRhdGVNb2RlbCA9IGZ1bmN0aW9uIChjYXRlZ29yeSkge1xyXG4gIC8vIGluaXRpYWwgcmFkaW9zIG1vZGVsXHJcbiAgc2VsZi51cGRhdGVSYWRpb3NNb2RlbChiYXNlW2NhdGVnb3J5XSk7XHJcbiAgLy8gaW5pdGlhbCBzZWxlY3QgbW9kZWwgKGZpcnN0IG1ldGhvZCBpbiBmaXJzdCBzZWN0aW9uIGZvciBzdGFydClcclxuICBzZWxmLnVwZGF0ZVNlbGVjdChzZWxmLnJhZGlvc01vZGVsKClbMF0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE9uY2hhbmdlIGhhbmRsZXIgZm9yIFJhZGlvIGJ1dHRvbnNcclxuICogQHBhcmFtIGl0ZW1cclxuICovXHJcbk1ldGhvZHNWaWV3TW9kZWwucHJvdG90eXBlLm9uY2hhbmdlUmFkaW9zID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAvL3VwZGF0ZSBSYWRpb3MgTW9kZWxcclxuICBoZi5jaGVja0FjdGl2ZShzZWxmLnJhZGlvc01vZGVsLCBpdGVtLm5hbWUpO1xyXG4gIC8vdXBkYXRlIFNlbGVjdCBNb2RlbFxyXG4gIHNlbGYudXBkYXRlU2VsZWN0KGl0ZW0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWwgYnVpbGQgb2YgUmFkaW9zIE1vZGVsXHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAqL1xyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS51cGRhdGVSYWRpb3NNb2RlbCA9IGZ1bmN0aW9uIChwYXJhbSkge1xyXG4gIHZhciBvYmogPSBwYXJhbSB8fCB7fSxcclxuICAgIGFyciA9IFtdO1xyXG5cclxuICBmb3IgKHZhciBpIGluIG9iaikge1xyXG4gICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoaSkpIHsgY29udGludWU7IH1cclxuICAgIHZhciBpdGVtID0ge1xyXG4gICAgICBjaGVja2VkOiBrby5vYnNlcnZhYmxlKGkgPT09ICdBTEwnKSxcclxuICAgICAgbmFtZTogaVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoaSA9PT0gJ0FMTCcpIHtcclxuICAgICAgYXJyLnVuc2hpZnQoaXRlbSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFyci5wdXNoKGl0ZW0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHRhcnIgPSBhcnIuc29ydChjb21wYXJlTWV0aG9kcyk7XHJcbiAgdGhpcy5yYWRpb3NNb2RlbChhcnIpO1xyXG4gIHJldHVybiBhcnI7XHJcbn07XHJcblxyXG4vKipcclxuICogSW5pdGlhbCBidWlsZCBvZiBTZWxlY3QgTW9kZWxcclxuICogQHBhcmFtIGl0ZW1cclxuICovXHJcbk1ldGhvZHNWaWV3TW9kZWwucHJvdG90eXBlLnVwZGF0ZVNlbGVjdCA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgdmFyIG9iaiA9IGJhc2Vbc2VsZi5jYXRlZ29yeSgpXVtpdGVtLm5hbWVdfHwge30sXHJcbiAgICBhcnIgPSBbXSxcclxuICAgIGNvdW50ID0gMDtcclxuXHJcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcclxuICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGkpKSB7IGNvbnRpbnVlOyB9XHJcbiAgICB2YXIgcHJvcGVydHkgPSBvYmpbaV07XHJcblx0XHQvLyBjb3BpZXMgYWxsIHZhbHVlcyBmcm9tIG1vZGVsIHRvIHZpZXctbW9kZWxcclxuXHRcdHZhciB2bU1ldGhvZCA9ICQuZXh0ZW5kKHt9LCBwcm9wZXJ0eSk7XHJcblxyXG5cdFx0ZGVsZXRlIHZtTWV0aG9kLnBhcmFtZXRlcnM7XHJcblx0XHR2bU1ldGhvZC5jaGVja2VkID0ga28ub2JzZXJ2YWJsZSghY291bnQpO1xyXG5cclxuXHRcdGFyci5wdXNoKHZtTWV0aG9kKTtcclxuXHJcbiAgICAvLyBzZXQgZ2xvYmFsIG9ic2VydmFibGVcclxuICAgICFjb3VudCAmJiB0aGlzLm1ldGhvZChiYXNlW3Byb3BlcnR5LmNhdGVnb3J5XVtwcm9wZXJ0eS5tZXRob2RdW3Byb3BlcnR5LmlkXSk7XHJcblxyXG4gICAgY291bnQrKztcclxuXHJcbiAgfVxyXG5cclxuXHR0aGlzLm1ldGhvZHNWaWV3TW9kZWwoYXJyKTtcclxuXHRyZXR1cm4gYXJyO1xyXG59O1xyXG5cclxuTWV0aG9kc1ZpZXdNb2RlbC5wcm90b3R5cGUub25TZWxlY3RNZXRob2QgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gIGhmLmNoZWNrQWN0aXZlKHNlbGYubWV0aG9kc1ZpZXdNb2RlbCwgaXRlbS5uYW1lKTtcclxuICBzZWxmLm1ldGhvZChiYXNlW2l0ZW0uY2F0ZWdvcnldW2l0ZW0ubWV0aG9kXVtpdGVtLmlkXSk7XHJcbn07XHJcblxyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS5vbkFib3V0Q2xpY2sgPSBmdW5jdGlvbiAobW9kZWwsIGV2ZW50KSB7XHJcbiAgbW9kZWwudG9nZ2xlUG9wVXAoIW1vZGVsLnRvZ2dsZVBvcFVwKCkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNvcnQgZnVuY3Rpb24gZm9yIG1ldGhvZHMgYXJheVxyXG4gKiBAcGFyYW0gZlxyXG4gKiBAcGFyYW0gc1xyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gY29tcGFyZU1ldGhvZHMoZixzKSB7XHJcblx0dmFyIGEgPSBmLm5hbWUudG9VcHBlckNhc2UoKTtcclxuXHR2YXIgYiA9IHMubmFtZS50b1VwcGVyQ2FzZSgpO1xyXG5cclxuXHRpZiAoYSA9PT0gYikge3JldHVybiAwO31cclxuXHRpZiAoYSA9PT0gJ0FMTCcgfHxcclxuXHRcdChhID09PSAnR0VUJyAmJiAoYiA9PT0gJ1BPU1QnIHx8IGIgPT09ICdQVVQnIHx8IGIgPT09ICdERUxFVEUnKSkgfHxcclxuXHRcdChhID09PSAnUE9TVCcgJiYgKGIgPT09ICdQVVQnIHx8IGIgPT09ICdERUxFVEUnKSkgfHxcclxuXHRcdChhID09PSAnUFVUJyAmJiBiID09PSAnREVMRVRFJykpIHtcclxuXHRcdHJldHVybiAtMTtcclxuXHR9XHJcblx0cmV0dXJuIDE7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTWV0aG9kc1ZpZXdNb2RlbDtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9WaWV3TW9kZWxzL21ldGhvZHNWaWV3TW9kZWwuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGpzb25IaWdobGlnaHQgPSByZXF1aXJlKCcuLy4uL21vZHVsZXMvanNvbi1oaWdobGlnaHQnKTtcbnZhciBzbGlkZXIgPSByZXF1aXJlKCcuLi9tb2R1bGVzL3NsaWRlcicpO1xudmFyIGZpbHRlciA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy5qc29uJyk7XG52YXIgc2VsZjtcbnZhciBjb2xvcnMgPSBbXG5cdCdjb2x1bW4tY29sb3ItMScsXG5cdCdjb2x1bW4tY29sb3ItMicsXG5cdCdjb2x1bW4tY29sb3ItMycsXG5cdCdjb2x1bW4tY29sb3ItNCcsXG5cdCdjb2x1bW4tY29sb3ItNScsXG5cdCdjb2x1bW4tY29sb3ItNicsXG5cdCdjb2x1bW4tY29sb3ItNycsXG5cdCdjb2x1bW4tY29sb3ItOCcsXG5cdCdjb2x1bW4tY29sb3ItOScsXG5cdCdjb2x1bW4tY29sb3ItMTAnLFxuXHQnY29sdW1uLWNvbG9yLTExJyxcblx0J2NvbHVtbi1jb2xvci0xMidcbl07XG5cbmZ1bmN0aW9uIFJlcXVlc3RzTGlzdFZpZXdNb2RlbChyZXF1ZXN0cywgc2VsZWN0ZWRQYXJhbXMsIHNoYXJlUGF0aCkge1xuXHR0aGlzLnVybCA9IHNlbGVjdGVkUGFyYW1zO1xuXHRzZWxmID0gdGhpcztcblx0dGhpcy5jb2xvcnMgPSBjb2xvcnM7XG5cdHRoaXMuc2hhcmVQYXRoID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShzaGFyZVBhdGgpO1xuXHR0aGlzLnJlcXVlc3RzID0gcmVxdWVzdHM7XG5cdHRoaXMuaXNBY3RpdmVUYWIgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcblx0dGhpcy52aWV3TW9kZWwgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xuXHR0aGlzLmNsZWFyQnRuSXNWaXNpYmxlID0ga28uY29tcHV0ZWQodGhpcy5faXNWaXNpYmxlLCB0aGlzKTtcblx0dGhpcy5yZXF1ZXN0cy5zdWJzY3JpYmUodGhpcy51cGRhdGVNb2RlbCwgdGhpcyk7XG59XG5cbi8qKlxuICogVXBkYXRlIFZpZXdtb2RlbCBvZiByZXF1ZXN0IGxpc3RcbiAqIEBwYXJhbSBhcnJcbiAqL1xuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS51cGRhdGVNb2RlbCA9IGZ1bmN0aW9uIChhcnIpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcblx0dmFyIG5ld01vZGVsID0gdGhpcy5yZXF1ZXN0cygpXG5cdFx0Lm1hcChmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHR2YXIgaXRlbSA9ICAkLmV4dGVuZCh7fSwgb2JqLCB7XG5cdFx0XHRcdGNvbG9yOiBzZWxmLmNvbG9yc1tvYmouaW5kZXggJSBzZWxmLmNvbG9ycy5sZW5ndGhdLFxuXHRcdFx0XHRhY3RpdmU6IGtvLm9ic2VydmFibGUoZmFsc2UpLFxuXHRcdFx0XHRjb3BpZWQ6IGtvLm9ic2VydmFibGUoZmFsc2UpLFxuXHRcdFx0XHRyZXNIVE1MOiBrby5vYnNlcnZhYmxlKCcnKVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9KTtcblx0c2xpZGVyLnJlbW92ZShzZWxmLnZpZXdNb2RlbCgpLmxlbmd0aCk7XG5cdHNlbGYudmlld01vZGVsKG5ld01vZGVsKTtcblx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0c2xpZGVyLnNldChzZWxmLnZpZXdNb2RlbCgpLmxlbmd0aCk7XG5cdFx0JCgnI3Nob3ctZGV0YWlscy0wJykudHJpZ2dlcignY2xpY2snKTtcblx0fSwgMTApO1xufTtcblxuLyoqXG4gKiBnZXQgZGV0YWlsc1xuICogQHBhcmFtIGRhdGFcbiAqL1xuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5nZXRNb3JlID0gZnVuY3Rpb24gKGlkLCBkYXRhKSB7XG5cdHZhciBwYW5lbEdyb3VwID0gdGhpcy5wYW5lbEdyb3VwO1xuXHR2YXIgcGFuZWwgPSB0aGlzO1xuXHR2YXIgY3VycmVudFNsaWRlciA9ICQoJyNzbGlkZXItJyArIHBhbmVsR3JvdXAuc2VjdGlvbkluZGV4KTtcblx0dmFyIGNvbXBvbmVudCA9ICQoJzxzZWN0aW9uIGRhdGEtYmluZD1cImNvbXBvbmVudDoge25hbWU6IFxcJ3BhbmVsLWdyb3VwXFwnLCBwYXJhbXM6IHBhcmFtc31cIj48L3NlY3Rpb24+Jyk7XG5cdHZhciBjdXJzbGljayA9IGN1cnJlbnRTbGlkZXIuc2xpY2soJ2dldFNsaWNrJyk7XG5cdFxuXHQvLyBleHRlbmRpbmcgYWRkaXRpb25hbCBkYXRhIChjb3B5KVxuXHR2YXIgcGFyYW1zID0gJC5leHRlbmQoe30sIHBhbmVsR3JvdXAsIHtcblx0XHRkYXRhOiBkYXRhLFxuXHRcdGdyb3VwSW5kZXg6IHBhbmVsR3JvdXAuZ3JvdXBJbmRleCArIDEsXG5cdFx0X3Byb3BUaXRsZTogdHlwZW9mIGlkID09PSAnc3RyaW5nJyAmJiBpZCxcblx0XHRjb25maWc6IHBhbmVsLmNvbmZpZ1xuXHR9KTtcblxuXHQvLyBhcHBseSBjb21wb25lbnQgZGF0YSBiaW5kaW5nc1xuXHRrby5hcHBseUJpbmRpbmdzKHtcblx0XHRwYXJhbXM6IHBhcmFtc1xuXHR9LCBjb21wb25lbnRbMF0pO1xuXHRcblx0Ly8gYWRkIHNsaWRlIHdpdGggc2VsZWN0ZWQgZGF0YVxuXHRjdXJyZW50U2xpZGVyLnNsaWNrKCdzbGlja0FkZCcsIGNvbXBvbmVudCk7XG5cdFxuXHQvLyByZW1vdmUgb3V0c3RhbmRpbmcgc2xpZGVzXG5cdGZvciAodmFyIGkgPSBjdXJzbGljay5zbGlkZUNvdW50IC0gMjsgaSA+IHBhbmVsR3JvdXAuZ3JvdXBJbmRleDsgaS0tKSB7XG5cdFx0Y3VycmVudFNsaWRlci5zbGljaygnc2xpY2tSZW1vdmUnLCBpLCBmYWxzZSk7XG5cdH1cblx0Ly8gbW92ZSB0byBuZXh0IHNsaWRlXG5cdGN1cnJlbnRTbGlkZXIuc2xpY2soJ3NsaWNrTmV4dCcpO1xufTtcblxuLyoqXG4gKiBWaXNpYmlsaXR5IGZsYWcgZm9yIENsZWFyIGJ0blxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLl9pc1Zpc2libGUgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHRoaXMucmVxdWVzdHMpLmxlbmd0aCA+IDA7XG59O1xuXG4vKipcbiAqIENsZWFyIHJlcXVlc3RzdHMgbGlzdCBoYW5kbGVyXG4gKiBAcGFyYW0gdm1cbiAqIEBwYXJhbSBldmVudFxuICovXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLm9uQ2xlYXJSZXF1ZXN0cyA9IGZ1bmN0aW9uICh2bSwgZXZlbnQpIHtcblx0dGhpcy5yZXF1ZXN0cyhbXSk7XG59O1xuXG4vKipcbiAqIERldGFpbHMgdG9nZ2xlIGhhbmRsZXJcbiAqIEBwYXJhbSB2bVxuICogQHBhcmFtIGV2ZW50XG4gKi9cblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUuZ2V0RGV0YWlscyA9IGZ1bmN0aW9uICh2bSwgZXZlbnQpIHtcblx0aWYgKCF0aGlzLnJlc0hUTUwoKS5sZW5ndGgpIHtcblx0XHRqc29uSGlnaGxpZ2h0KHRoaXMucmVzSFRNTCwgdGhpcy5yZXMpO1xuXHR9XG5cdHRoaXMuYWN0aXZlKCF0aGlzLmFjdGl2ZSgpKTtcbn07XG5cbi8qKlxuICogSm9pbiBzdHJpbmcgZm9yIGlkJ3NcbiAqIEBwYXJhbSBzXG4gKiBAcGFyYW0gaVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5nZXRTdHIgPSBmdW5jdGlvbiAocywgaSkge1xuXHR2YXIgc3RyID0gcztcblx0dmFyIGkxID0gaSA/IGkoKSA6ICcnO1xuXHRyZXR1cm4gW1xuXHRcdHN0cixcblx0XHRpMVxuXHRdLmpvaW4oJy0nKTtcbn07XG5cbi8qKlxuICogR2V0IHJhdyByZXNwb25zZSBkYXRhXG4gKiBAcGFyYW0gbW9kZWwge29iamVjdH1cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUuZ2V0UmF3RGF0YSA9IGZ1bmN0aW9uIChtb2RlbCkge1xuXHR2YXIgY29udGVudCA9IG1vZGVsLnJlcy5yZXM7XG5cdHZhciByYXdXaW5kb3cgPSB3aW5kb3cub3BlbihcImRhdGE6dGV4dC9qc29uLFwiICsgZW5jb2RlVVJJKEpTT04uc3RyaW5naWZ5KGNvbnRlbnQsIG51bGwsIDIpKSwgJ19ibGFuaycpO1xuXHRyYXdXaW5kb3cuZm9jdXMoKTtcbn07XG5cblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUuY29weVVybCA9IGZ1bmN0aW9uIChtb2RlbCwgZXZlbnQpIHtcblx0dmFyIGN1cnJlbnRGaWVsZCA9IHRoaXM7XG5cdHNlbGYuY2xpcGJvYXJkID0gbmV3IENsaXBib2FyZChldmVudC5jdXJyZW50VGFyZ2V0KTtcblx0c2VsZi5jbGlwYm9hcmQub24oJ3N1Y2Nlc3MnLCBmdW5jdGlvbiBvblN1Y2Nlc3NDb3B5KGUpIHtcblx0XHRjb25zb2xlLmluZm8oJ0FjdGlvbjonLCBlLmFjdGlvbik7XG5cdFx0Y29uc29sZS5pbmZvKCdUZXh0OicsIGUudGV4dCk7XG5cdFx0Y29uc29sZS5pbmZvKCdUcmlnZ2VyOicsIGUudHJpZ2dlcik7XG5cdFx0Y3VycmVudEZpZWxkLmNvcGllZCh0cnVlKTtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdGN1cnJlbnRGaWVsZC5jb3BpZWQoZmFsc2UpO1xuXHRcdH0sIDEwMDApO1xuXHRcdGUuY2xlYXJTZWxlY3Rpb24oKTtcblx0fSlcblx0XHQub24oJ2Vycm9yJywgZnVuY3Rpb24gb25FcnJvckNvcHkoZSkge1xuXHRcdFx0Y29uc29sZS5lcnJvcignQWN0aW9uOicsIGUuYWN0aW9uKTtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ1RyaWdnZXI6JywgZS50cmlnZ2VyKTtcblx0XHR9KTtcbn07XG5cblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUucmVtb3ZlSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcblx0c2VsZi5jbGlwYm9hcmQgJiYgc2VsZi5jbGlwYm9hcmQuZGVzdHJveSgpO1xuXHRkZWxldGUgc2VsZi5jbGlwYm9hcmQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlcXVlc3RzTGlzdFZpZXdNb2RlbDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvVmlld01vZGVscy9yZXF1ZXN0c0xpc3RWaWV3TW9kZWwuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIFdvcmtlciA9IHJlcXVpcmUoJy4vaGlnaGxpZ2h0SnNvbi53b3JrZXIuanMnKTsgLy8gSnNvbi1mb3JtYXR0ZXIgd29ya2VyXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9ic2VydmFibGUsIGNvZGUpIHtcblx0dmFyIGFuaW1UaW1lID0gMTAwO1xuXHR2YXIgd29ya2VyID0gbmV3IFdvcmtlcjtcblxuXHR3b3JrZXIub25tZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0b2JzZXJ2YWJsZShldmVudC5kYXRhKTtcblxuXHRcdCQoZG9jdW1lbnQpXG5cdFx0XHQub24oJ2NsaWNrIHRvdWNoJywgJy50bS1jb2RlLWNvbnRhaW5lciAuZXhwYW5kZWQnLCBmdW5jdGlvbiBqc29uQ29kZUNvbnRhaW5lckV4cGFuZGVkKGUpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR2YXIgJHNlbGYgPSAkKHRoaXMpO1xuXHRcdFx0XHQkc2VsZlxuXHRcdFx0XHRcdC5wYXJlbnQoKVxuXHRcdFx0XHRcdC5maW5kKCc+dWwnKVxuXHRcdFx0XHRcdC5zbGlkZVVwKGFuaW1UaW1lLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdCRzZWxmLmFkZENsYXNzKCdjb2xsYXBzZWQnKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH0pXG5cdFx0XHQub24oJ2NsaWNrIHRvdWNoJywgJy50bS1jb2RlLWNvbnRhaW5lciAuZXhwYW5kZWQuY29sbGFwc2VkJywgZnVuY3Rpb24ganNvbkNvZGVDb250YWluZXJDb2xsYXBzZWQoZSkge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdHZhciAkc2VsZiA9ICQodGhpcyk7XG5cdFx0XHRcdCRzZWxmXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKVxuXHRcdFx0XHRcdC5wYXJlbnQoKVxuXHRcdFx0XHRcdC5maW5kKCc+dWwnKVxuXHRcdFx0XHRcdC5zbGlkZURvd24oYW5pbVRpbWUsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0JHNlbGZcblx0XHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKVxuXHRcdFx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fSlcblx0fTtcblx0d29ya2VyLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRjb25zb2xlLmVycm9yKGV2ZW50KTtcblx0fTtcblxuXHR3b3JrZXIucG9zdE1lc3NhZ2UoY29kZSk7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2pzb24taGlnaGxpZ2h0LmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiByZXF1aXJlKFwiISFEOlxcXFxzYW5kYm94XFxcXHRpY2tldG1hc3Rlci1hcGktc3RhZ2luZy5naXRodWIuaW9cXFxcbm9kZV9tb2R1bGVzXFxcXHdvcmtlci1sb2FkZXJcXFxcY3JlYXRlSW5saW5lV29ya2VyLmpzXCIpKFwiLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxcbi8qKioqKiovIFxcdC8vIFRoZSBtb2R1bGUgY2FjaGVcXG4vKioqKioqLyBcXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cXG4vKioqKioqLyBcXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHRcXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcXG4vKioqKioqLyBcXHRcXHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcXG4vKioqKioqLyBcXHRcXHRcXHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdFxcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXFxuLyoqKioqKi8gXFx0XFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xcbi8qKioqKiovIFxcdFxcdFxcdGV4cG9ydHM6IHt9LFxcbi8qKioqKiovIFxcdFxcdFxcdGlkOiBtb2R1bGVJZCxcXG4vKioqKioqLyBcXHRcXHRcXHRsb2FkZWQ6IGZhbHNlXFxuLyoqKioqKi8gXFx0XFx0fTtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdFxcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxcbi8qKioqKiovIFxcdFxcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0XFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxcbi8qKioqKiovIFxcdFxcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0XFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcXG4vKioqKioqLyBcXHRcXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XFxuLyoqKioqKi8gXFx0fVxcbi8qKioqKiovXFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxcbi8qKioqKiovIFxcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxcbi8qKioqKiovIFxcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xcbi8qKioqKiovIFxcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFxcXCJcXFwiO1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXFxuLyoqKioqKi8gXFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XFxuLyoqKioqKi8gfSlcXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xcbi8qKioqKiovIChbXFxuLyogMCAqL1xcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xcblxcblxcdC8qKlxcclxcblxcdCAqIENvZGUgZm9ybWF0IHdlYi13b3JrZXJcXHJcXG5cXHQgKiBAcGFyYW0gZXZlbnRcXHJcXG5cXHQgKi9cXHJcXG5cXHQvLyB2YXIgaGlnaGxpZ2h0SnNvbigpXFxyXFxuXFx0dmFyIGhpZ2hsaWdodEpzb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xcclxcblxcdFxcclxcblxcdG9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XFxyXFxuXFx0ICB2YXIgY29kZSA9IGV2ZW50LmRhdGE7XFxyXFxuXFx0ICAvLyBpbXBvcnRTY3JpcHRzKCdqc29uLXBhcnNlLmpzJyk7XFxyXFxuXFx0ICB2YXIgcmVzdWx0ID0gaGlnaGxpZ2h0SnNvbihjb2RlLCB7ZXhwYW5kZWQ6IHRydWV9KTtcXHJcXG5cXHQgIC8vIHZhciByZXN1bHQgPUpTT04uc3RyaW5naWZ5KGNvZGUpO1xcclxcblxcdCAgcG9zdE1lc3NhZ2UocmVzdWx0KTtcXHJcXG5cXHR9O1xcclxcblxcblxcbi8qKiovIH0sXFxuLyogMSAqL1xcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xcblxcblxcdHZhciBwcmVmaXggPSAndG0tY29kZSc7XFxyXFxuXFx0XFxyXFxuXFx0dmFyIGdldEV4cGFuZGVyQ2xhc3NlcyA9IGZ1bmN0aW9uIChleHBhbmRlZCkge1xcclxcblxcdFxcdGlmICghZXhwYW5kZWQpIHtcXHJcXG5cXHRcXHRcXHRyZXR1cm4gJ2V4cGFuZGVkIGNvbGxhcHNlZCBoaWRkZW4nO1xcclxcblxcdFxcdH1cXHJcXG5cXHRcXHRyZXR1cm4gJ2V4cGFuZGVkJztcXHJcXG5cXHR9O1xcclxcblxcdFxcclxcblxcdHZhciBlbmNvZGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcXHJcXG5cXHRcXHRyZXR1cm4gWyc8c3Bhbj4nLCB2YWx1ZSwgJzwvc3Bhbj4nXS5qb2luKCcnKTtcXHJcXG5cXHR9O1xcclxcblxcdFxcclxcblxcdHZhciBjcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUsIHR5cGUsIGV4cGFuZGVyQ2xhc3Nlcykge1xcclxcblxcdFxcdHZhciBrbGFzcyA9ICdvYmplY3QnLFxcclxcblxcdFxcdFxcdG9wZW4gPSAneycsXFxyXFxuXFx0XFx0XFx0Y2xvc2UgPSAnfSc7XFxyXFxuXFx0XFxyXFxuXFx0XFx0aWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XFxyXFxuXFx0XFx0XFx0a2xhc3MgPSAnYXJyYXknO1xcclxcblxcdFxcdFxcdG9wZW4gPSAnWyc7XFxyXFxuXFx0XFx0XFx0Y2xvc2UgPSAnXSc7XFxyXFxuXFx0XFx0fVxcclxcblxcdFxcclxcblxcdFxcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xcclxcblxcdFxcdFxcdHJldHVybiBbXFxyXFxuXFx0XFx0XFx0XFx0JzxsaT4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwia2V5XFxcIj5cXFwiJywgZW5jb2RlKGtleSksICdcXFwiOiA8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcIm51bGxcXFwiPlxcXCInLCBlbmNvZGUodmFsdWUpLCAnXFxcIjwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdCc8L2xpPidcXHJcXG5cXHRcXHRcXHRdLmpvaW4oJycpO1xcclxcblxcdFxcdH1cXHJcXG5cXHRcXHJcXG5cXHRcXHRpZiAodHlwZSA9PSAnb2JqZWN0Jykge1xcclxcblxcdFxcdFxcdHJldHVybiBbXFxyXFxuXFx0XFx0XFx0XFx0JzxsaT4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwiJywgZXhwYW5kZXJDbGFzc2VzLCAnXFxcIj48L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcImtleVxcXCI+XFxcIicsIGVuY29kZShrZXkpLCAnXFxcIjogPC9zcGFuPiAnLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwib3BlblxcXCI+Jywgb3BlbiwgJzwvc3Bhbj4gJyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHVsIGNsYXNzPVxcXCInLCBrbGFzcywgJ1xcXCI+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRqc29uMmh0bWwodmFsdWUsIGV4cGFuZGVyQ2xhc3NlcyksXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzwvdWw+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcImNsb3NlXFxcIj4nLCBjbG9zZSwgJzwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdCc8L2xpPidcXHJcXG5cXHRcXHRcXHRdLmpvaW4oJycpO1xcclxcblxcdFxcdH1cXHJcXG5cXHRcXHJcXG5cXHRcXHRpZiAodHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdib29sZWFuJykge1xcclxcblxcdFxcdFxcdHJldHVybiBbXFxyXFxuXFx0XFx0XFx0XFx0JzxsaT4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwia2V5XFxcIj5cXFwiJywgZW5jb2RlKGtleSksICdcXFwiOiA8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcIicsIHR5cGUsICdcXFwiPicsIGVuY29kZSh2YWx1ZSksICc8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHRcXHQnPC9saT4nXFxyXFxuXFx0XFx0XFx0XS5qb2luKCcnKTtcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFx0cmV0dXJuIFtcXHJcXG5cXHRcXHRcXHQnPGxpPicsXFxyXFxuXFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJrZXlcXFwiPlxcXCInLCBlbmNvZGUoa2V5KSwgJ1xcXCI6IDwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwiJywgdHlwZSwgJ1xcXCI+XFxcIicsIGVuY29kZSh2YWx1ZSksICdcXFwiPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0JzwvbGk+J1xcclxcblxcdFxcdF0uam9pbignJyk7XFxyXFxuXFx0fTtcXHJcXG5cXHRcXHJcXG5cXHR2YXIganNvbjJodG1sID0gZnVuY3Rpb24gKGpzb24sIGV4cGFuZGVyQ2xhc3Nlcykge1xcclxcblxcdFxcdHZhciBodG1sID0gJyc7XFxyXFxuXFx0XFx0Zm9yICh2YXIga2V5IGluIGpzb24pIHtcXHJcXG5cXHRcXHRcXHRpZiAoIWpzb24uaGFzT3duUHJvcGVydHkoa2V5KSkge1xcclxcblxcdFxcdFxcdFxcdGNvbnRpbnVlO1xcclxcblxcdFxcdFxcdH1cXHJcXG5cXHRcXHJcXG5cXHRcXHRcXHRodG1sID0gW2h0bWwsIGNyZWF0ZUVsZW1lbnQoa2V5LCBqc29uW2tleV0sIHR5cGVvZiBqc29uW2tleV0sIGV4cGFuZGVyQ2xhc3NlcyldLmpvaW4oJycpO1xcclxcblxcdFxcdH1cXHJcXG5cXHRcXHRyZXR1cm4gaHRtbDtcXHJcXG5cXHR9O1xcclxcblxcdFxcclxcblxcdHZhciBnZXRKc29uVmlld2VyID0gZnVuY3Rpb24gKGRhdGEsIG9wdGlvbnMpIHtcXHJcXG5cXHRcXHR0cnkge1xcclxcblxcdFxcdFxcdHJldHVybiBbXFxyXFxuXFx0XFx0XFx0XFx0Jzx1bCBjbGFzcz1cXFwiJywgcHJlZml4LCAnLWNvbnRhaW5lclxcXCI+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHRqc29uMmh0bWwoW0pTT04ucGFyc2UoZGF0YSldLCBnZXRFeHBhbmRlckNsYXNzZXMob3B0aW9ucy5leHBhbmRlZCkpLFxcclxcblxcdFxcdFxcdFxcdCc8L3VsPidcXHJcXG5cXHRcXHRcXHRdLmpvaW4oJycpO1xcclxcblxcdFxcdH0gY2F0Y2ggKGUpIHtcXHJcXG5cXHRcXHRcXHRyZXR1cm4gW1xcclxcblxcdFxcdFxcdFxcdCc8ZGl2IGNsYXNzPVxcXCInLCBwcmVmaXgsICctZXJyb3JcXFwiID4nLCBlLnRvU3RyaW5nKCksICcgPC9kaXY+J1xcclxcblxcdFxcdFxcdF0uam9pbignJyk7XFxyXFxuXFx0XFx0fVxcclxcblxcdH07XFxyXFxuXFx0XFxyXFxuXFx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkYXRhLCBvcHQpIHtcXHJcXG5cXHRcXHR2YXIganNvbiA9ICcnO1xcclxcblxcdFxcdHZhciBvcHRpb25zID0gb3B0IHx8IHtleHBhbmRlZDogdHJ1ZX07XFxyXFxuXFx0XFx0aWYgKHR5cGVvZiBkYXRhID09ICdzdHJpbmcnKSB7XFxyXFxuXFx0XFx0XFx0anNvbiA9IGRhdGE7XFxyXFxuXFx0XFx0fSBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PSAnb2JqZWN0Jykge1xcclxcblxcdFxcdFxcdGpzb24gPSBKU09OLnN0cmluZ2lmeShkYXRhKVxcclxcblxcdFxcdH1cXHJcXG5cXHRcXHRyZXR1cm4gZ2V0SnNvblZpZXdlcihqc29uLCBvcHRpb25zKTtcXHJcXG5cXHR9O1xcclxcblxcblxcbi8qKiovIH1cXG4vKioqKioqLyBdKTtcXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbmRsWW5CaFkyczZMeTh2ZDJWaWNHRmpheTlpYjI5MGMzUnlZWEFnTkRjeFlqRXdaRFEwWTJFM01qZ3daVEV4TkdFaUxDSjNaV0p3WVdOck9pOHZMeTR2YzJOeWFYQjBjeTloY0drdFpYaHdiRzl5WlhJdmRqSXZjM0pqTDIxdlpIVnNaWE12YUdsbmFHeHBaMmgwU25OdmJpNTNiM0pyWlhJdWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmMyTnlhWEIwY3k5aGNHa3RaWGh3Ykc5eVpYSXZkakl2YzNKakwyMXZaSFZzWlhNdmFuTnZiaTF3WVhKelpTNXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNkVUpCUVdVN1FVRkRaanRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN08wRkJSMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN096czdPenRCUTNSRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNjVU5CUVc5RExHVkJRV1U3UVVGRGJrUTdRVUZEUVR0QlFVTkJPenM3T3pzN08wRkRZa0U3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEVzV1VGQlZ6dEJRVU5ZTEdGQlFWazdPMEZCUlZvN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4SFFVRkZPMEZCUTBZN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFc2QwSkJRWFZDTzBGQlEzWkNPMEZCUTBFN1FVRkRRU3hIUVVGRk8wRkJRMFk3UVVGRFFUdEJRVU5CTzBGQlEwRWlMQ0ptYVd4bElqb2lhR2xuYUd4cFoyaDBTbk52Ymk1M2IzSnJaWEl1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SWdYSFF2THlCVWFHVWdiVzlrZFd4bElHTmhZMmhsWEc0Z1hIUjJZWElnYVc1emRHRnNiR1ZrVFc5a2RXeGxjeUE5SUh0OU8xeHVYRzRnWEhRdkx5QlVhR1VnY21WeGRXbHlaU0JtZFc1amRHbHZibHh1SUZ4MFpuVnVZM1JwYjI0Z1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5aHRiMlIxYkdWSlpDa2dlMXh1WEc0Z1hIUmNkQzh2SUVOb1pXTnJJR2xtSUcxdlpIVnNaU0JwY3lCcGJpQmpZV05vWlZ4dUlGeDBYSFJwWmlocGJuTjBZV3hzWldSTmIyUjFiR1Z6VzIxdlpIVnNaVWxrWFNsY2JpQmNkRngwWEhSeVpYUjFjbTRnYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjB1Wlhod2IzSjBjenRjYmx4dUlGeDBYSFF2THlCRGNtVmhkR1VnWVNCdVpYY2diVzlrZFd4bElDaGhibVFnY0hWMElHbDBJR2x1ZEc4Z2RHaGxJR05oWTJobEtWeHVJRngwWEhSMllYSWdiVzlrZFd4bElEMGdhVzV6ZEdGc2JHVmtUVzlrZFd4bGMxdHRiMlIxYkdWSlpGMGdQU0I3WEc0Z1hIUmNkRngwWlhod2IzSjBjem9nZTMwc1hHNGdYSFJjZEZ4MGFXUTZJRzF2WkhWc1pVbGtMRnh1SUZ4MFhIUmNkR3h2WVdSbFpEb2dabUZzYzJWY2JpQmNkRngwZlR0Y2JseHVJRngwWEhRdkx5QkZlR1ZqZFhSbElIUm9aU0J0YjJSMWJHVWdablZ1WTNScGIyNWNiaUJjZEZ4MGJXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwdVkyRnNiQ2h0YjJSMWJHVXVaWGh3YjNKMGN5d2diVzlrZFd4bExDQnRiMlIxYkdVdVpYaHdiM0owY3l3Z1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5azdYRzVjYmlCY2RGeDBMeThnUm14aFp5QjBhR1VnYlc5a2RXeGxJR0Z6SUd4dllXUmxaRnh1SUZ4MFhIUnRiMlIxYkdVdWJHOWhaR1ZrSUQwZ2RISjFaVHRjYmx4dUlGeDBYSFF2THlCU1pYUjFjbTRnZEdobElHVjRjRzl5ZEhNZ2IyWWdkR2hsSUcxdlpIVnNaVnh1SUZ4MFhIUnlaWFIxY200Z2JXOWtkV3hsTG1WNGNHOXlkSE03WEc0Z1hIUjlYRzVjYmx4dUlGeDBMeThnWlhod2IzTmxJSFJvWlNCdGIyUjFiR1Z6SUc5aWFtVmpkQ0FvWDE5M1pXSndZV05yWDIxdlpIVnNaWE5mWHlsY2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1YlNBOUlHMXZaSFZzWlhNN1hHNWNiaUJjZEM4dklHVjRjRzl6WlNCMGFHVWdiVzlrZFd4bElHTmhZMmhsWEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbU1nUFNCcGJuTjBZV3hzWldSTmIyUjFiR1Z6TzF4dVhHNGdYSFF2THlCZlgzZGxZbkJoWTJ0ZmNIVmliR2xqWDNCaGRHaGZYMXh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXdJRDBnWENKY0lqdGNibHh1SUZ4MEx5OGdURzloWkNCbGJuUnllU0J0YjJSMWJHVWdZVzVrSUhKbGRIVnliaUJsZUhCdmNuUnpYRzRnWEhSeVpYUjFjbTRnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlnd0tUdGNibHh1WEc1Y2JpOHFLaUJYUlVKUVFVTkxJRVpQVDFSRlVpQXFLbHh1SUNvcUlIZGxZbkJoWTJzdlltOXZkSE4wY21Gd0lEUTNNV0l4TUdRME5HTmhOekk0TUdVeE1UUmhYRzRnS2lvdklpd2lMeW9xWEhKY2JpQXFJRU52WkdVZ1ptOXliV0YwSUhkbFlpMTNiM0pyWlhKY2NseHVJQ29nUUhCaGNtRnRJR1YyWlc1MFhISmNiaUFxTDF4eVhHNHZMeUIyWVhJZ2FHbG5hR3hwWjJoMFNuTnZiaWdwWEhKY2JuWmhjaUJvYVdkb2JHbG5hSFJLYzI5dUlEMGdjbVZ4ZFdseVpTZ25MaTlxYzI5dUxYQmhjbk5sSnlrN1hISmNibHh5WEc1dmJtMWxjM05oWjJVZ1BTQm1kVzVqZEdsdmJpaGxkbVZ1ZENrZ2UxeHlYRzRnSUhaaGNpQmpiMlJsSUQwZ1pYWmxiblF1WkdGMFlUdGNjbHh1SUNBdkx5QnBiWEJ2Y25SVFkzSnBjSFJ6S0NkcWMyOXVMWEJoY25ObExtcHpKeWs3WEhKY2JpQWdkbUZ5SUhKbGMzVnNkQ0E5SUdocFoyaHNhV2RvZEVwemIyNG9ZMjlrWlN3Z2UyVjRjR0Z1WkdWa09pQjBjblZsZlNrN1hISmNiaUFnTHk4Z2RtRnlJSEpsYzNWc2RDQTlTbE5QVGk1emRISnBibWRwWm5rb1kyOWtaU2s3WEhKY2JpQWdjRzl6ZEUxbGMzTmhaMlVvY21WemRXeDBLVHRjY2x4dWZUdGNjbHh1WEc1Y2JseHVMeW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FYRzRnS2lvZ1YwVkNVRUZEU3lCR1QwOVVSVkpjYmlBcUtpQXVMM05qY21sd2RITXZZWEJwTFdWNGNHeHZjbVZ5TDNZeUwzTnlZeTl0YjJSMWJHVnpMMmhwWjJoc2FXZG9kRXB6YjI0dWQyOXlhMlZ5TG1welhHNGdLaW9nYlc5a2RXeGxJR2xrSUQwZ01GeHVJQ29xSUcxdlpIVnNaU0JqYUhWdWEzTWdQU0F3WEc0Z0tpb3ZJaXdpZG1GeUlIQnlaV1pwZUNBOUlDZDBiUzFqYjJSbEp6dGNjbHh1WEhKY2JuWmhjaUJuWlhSRmVIQmhibVJsY2tOc1lYTnpaWE1nUFNCbWRXNWpkR2x2YmlBb1pYaHdZVzVrWldRcElIdGNjbHh1WEhScFppQW9JV1Y0Y0dGdVpHVmtLU0I3WEhKY2JseDBYSFJ5WlhSMWNtNGdKMlY0Y0dGdVpHVmtJR052Ykd4aGNITmxaQ0JvYVdSa1pXNG5PMXh5WEc1Y2RIMWNjbHh1WEhSeVpYUjFjbTRnSjJWNGNHRnVaR1ZrSnp0Y2NseHVmVHRjY2x4dVhISmNiblpoY2lCbGJtTnZaR1VnUFNCbWRXNWpkR2x2YmlBb2RtRnNkV1VwSUh0Y2NseHVYSFJ5WlhSMWNtNGdXeWM4YzNCaGJqNG5MQ0IyWVd4MVpTd2dKend2YzNCaGJqNG5YUzVxYjJsdUtDY25LVHRjY2x4dWZUdGNjbHh1WEhKY2JuWmhjaUJqY21WaGRHVkZiR1Z0Wlc1MElEMGdablZ1WTNScGIyNGdLR3RsZVN3Z2RtRnNkV1VzSUhSNWNHVXNJR1Y0Y0dGdVpHVnlRMnhoYzNObGN5a2dlMXh5WEc1Y2RIWmhjaUJyYkdGemN5QTlJQ2R2WW1wbFkzUW5MRnh5WEc1Y2RGeDBiM0JsYmlBOUlDZDdKeXhjY2x4dVhIUmNkR05zYjNObElEMGdKMzBuTzF4eVhHNWNjbHh1WEhScFppQW9RWEp5WVhrdWFYTkJjbkpoZVNoMllXeDFaU2twSUh0Y2NseHVYSFJjZEd0c1lYTnpJRDBnSjJGeWNtRjVKenRjY2x4dVhIUmNkRzl3Wlc0Z1BTQW5XeWM3WEhKY2JseDBYSFJqYkc5elpTQTlJQ2RkSnp0Y2NseHVYSFI5WEhKY2JseHlYRzVjZEdsbUlDaDJZV3gxWlNBOVBUMGdiblZzYkNrZ2UxeHlYRzVjZEZ4MGNtVjBkWEp1SUZ0Y2NseHVYSFJjZEZ4MEp6eHNhVDRuTEZ4eVhHNWNkRngwWEhSY2RDYzhjM0JoYmlCamJHRnpjejFjSW10bGVWd2lQbHdpSnl3Z1pXNWpiMlJsS0d0bGVTa3NJQ2RjSWpvZ1BDOXpjR0Z1UGljc1hISmNibHgwWEhSY2RGeDBKenh6Y0dGdUlHTnNZWE56UFZ3aWJuVnNiRndpUGx3aUp5d2daVzVqYjJSbEtIWmhiSFZsS1N3Z0oxd2lQQzl6Y0dGdVBpY3NYSEpjYmx4MFhIUmNkQ2M4TDJ4cFBpZGNjbHh1WEhSY2RGMHVhbTlwYmlnbkp5azdYSEpjYmx4MGZWeHlYRzVjY2x4dVhIUnBaaUFvZEhsd1pTQTlQU0FuYjJKcVpXTjBKeWtnZTF4eVhHNWNkRngwY21WMGRYSnVJRnRjY2x4dVhIUmNkRngwSnp4c2FUNG5MRnh5WEc1Y2RGeDBYSFJjZENjOGMzQmhiaUJqYkdGemN6MWNJaWNzSUdWNGNHRnVaR1Z5UTJ4aGMzTmxjeXdnSjF3aVBqd3ZjM0JoYmo0bkxGeHlYRzVjZEZ4MFhIUmNkQ2M4YzNCaGJpQmpiR0Z6Y3oxY0ltdGxlVndpUGx3aUp5d2daVzVqYjJSbEtHdGxlU2tzSUNkY0lqb2dQQzl6Y0dGdVBpQW5MRnh5WEc1Y2RGeDBYSFJjZENjOGMzQmhiaUJqYkdGemN6MWNJbTl3Wlc1Y0lqNG5MQ0J2Y0dWdUxDQW5QQzl6Y0dGdVBpQW5MRnh5WEc1Y2RGeDBYSFJjZENjOGRXd2dZMnhoYzNNOVhDSW5MQ0JyYkdGemN5d2dKMXdpUGljc1hISmNibHgwWEhSY2RGeDBYSFJxYzI5dU1taDBiV3dvZG1Gc2RXVXNJR1Y0Y0dGdVpHVnlRMnhoYzNObGN5a3NYSEpjYmx4MFhIUmNkRngwSnp3dmRXdytKeXhjY2x4dVhIUmNkRngwWEhRblBITndZVzRnWTJ4aGMzTTlYQ0pqYkc5elpWd2lQaWNzSUdOc2IzTmxMQ0FuUEM5emNHRnVQaWNzWEhKY2JseDBYSFJjZENjOEwyeHBQaWRjY2x4dVhIUmNkRjB1YW05cGJpZ25KeWs3WEhKY2JseDBmVnh5WEc1Y2NseHVYSFJwWmlBb2RIbHdaU0E5UFNBbmJuVnRZbVZ5SnlCOGZDQjBlWEJsSUQwOUlDZGliMjlzWldGdUp5a2dlMXh5WEc1Y2RGeDBjbVYwZFhKdUlGdGNjbHh1WEhSY2RGeDBKenhzYVQ0bkxGeHlYRzVjZEZ4MFhIUmNkQ2M4YzNCaGJpQmpiR0Z6Y3oxY0ltdGxlVndpUGx3aUp5d2daVzVqYjJSbEtHdGxlU2tzSUNkY0lqb2dQQzl6Y0dGdVBpY3NYSEpjYmx4MFhIUmNkRngwSnp4emNHRnVJR05zWVhOelBWd2lKeXdnZEhsd1pTd2dKMXdpUGljc0lHVnVZMjlrWlNoMllXeDFaU2tzSUNjOEwzTndZVzQrSnl4Y2NseHVYSFJjZEZ4MEp6d3ZiR2srSjF4eVhHNWNkRngwWFM1cWIybHVLQ2NuS1R0Y2NseHVYSFI5WEhKY2JseDBjbVYwZFhKdUlGdGNjbHh1WEhSY2RDYzhiR2srSnl4Y2NseHVYSFJjZEZ4MEp6eHpjR0Z1SUdOc1lYTnpQVndpYTJWNVhDSStYQ0luTENCbGJtTnZaR1VvYTJWNUtTd2dKMXdpT2lBOEwzTndZVzQrSnl4Y2NseHVYSFJjZEZ4MEp6eHpjR0Z1SUdOc1lYTnpQVndpSnl3Z2RIbHdaU3dnSjF3aVBsd2lKeXdnWlc1amIyUmxLSFpoYkhWbEtTd2dKMXdpUEM5emNHRnVQaWNzWEhKY2JseDBYSFFuUEM5c2FUNG5YSEpjYmx4MFhTNXFiMmx1S0NjbktUdGNjbHh1ZlR0Y2NseHVYSEpjYm5aaGNpQnFjMjl1TW1oMGJXd2dQU0JtZFc1amRHbHZiaUFvYW5OdmJpd2daWGh3WVc1a1pYSkRiR0Z6YzJWektTQjdYSEpjYmx4MGRtRnlJR2gwYld3Z1BTQW5KenRjY2x4dVhIUm1iM0lnS0haaGNpQnJaWGtnYVc0Z2FuTnZiaWtnZTF4eVhHNWNkRngwYVdZZ0tDRnFjMjl1TG1oaGMwOTNibEJ5YjNCbGNuUjVLR3RsZVNrcElIdGNjbHh1WEhSY2RGeDBZMjl1ZEdsdWRXVTdYSEpjYmx4MFhIUjlYSEpjYmx4eVhHNWNkRngwYUhSdGJDQTlJRnRvZEcxc0xDQmpjbVZoZEdWRmJHVnRaVzUwS0d0bGVTd2dhbk52Ymx0clpYbGRMQ0IwZVhCbGIyWWdhbk52Ymx0clpYbGRMQ0JsZUhCaGJtUmxja05zWVhOelpYTXBYUzVxYjJsdUtDY25LVHRjY2x4dVhIUjlYSEpjYmx4MGNtVjBkWEp1SUdoMGJXdzdYSEpjYm4wN1hISmNibHh5WEc1MllYSWdaMlYwU25OdmJsWnBaWGRsY2lBOUlHWjFibU4wYVc5dUlDaGtZWFJoTENCdmNIUnBiMjV6S1NCN1hISmNibHgwZEhKNUlIdGNjbHh1WEhSY2RISmxkSFZ5YmlCYlhISmNibHgwWEhSY2RDYzhkV3dnWTJ4aGMzTTlYQ0luTENCd2NtVm1hWGdzSUNjdFkyOXVkR0ZwYm1WeVhDSStKeXhjY2x4dVhIUmNkRngwWEhScWMyOXVNbWgwYld3b1cwcFRUMDR1Y0dGeWMyVW9aR0YwWVNsZExDQm5aWFJGZUhCaGJtUmxja05zWVhOelpYTW9iM0IwYVc5dWN5NWxlSEJoYm1SbFpDa3BMRnh5WEc1Y2RGeDBYSFFuUEM5MWJENG5YSEpjYmx4MFhIUmRMbXB2YVc0b0p5Y3BPMXh5WEc1Y2RIMGdZMkYwWTJnZ0tHVXBJSHRjY2x4dVhIUmNkSEpsZEhWeWJpQmJYSEpjYmx4MFhIUmNkQ2M4WkdsMklHTnNZWE56UFZ3aUp5d2djSEpsWm1sNExDQW5MV1Z5Y205eVhDSWdQaWNzSUdVdWRHOVRkSEpwYm1jb0tTd2dKeUE4TDJScGRqNG5YSEpjYmx4MFhIUmRMbXB2YVc0b0p5Y3BPMXh5WEc1Y2RIMWNjbHh1ZlR0Y2NseHVYSEpjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRvWkdGMFlTd2diM0IwS1NCN1hISmNibHgwZG1GeUlHcHpiMjRnUFNBbkp6dGNjbHh1WEhSMllYSWdiM0IwYVc5dWN5QTlJRzl3ZENCOGZDQjdaWGh3WVc1a1pXUTZJSFJ5ZFdWOU8xeHlYRzVjZEdsbUlDaDBlWEJsYjJZZ1pHRjBZU0E5UFNBbmMzUnlhVzVuSnlrZ2UxeHlYRzVjZEZ4MGFuTnZiaUE5SUdSaGRHRTdYSEpjYmx4MGZTQmxiSE5sSUdsbUlDaDBlWEJsYjJZZ1pHRjBZU0E5UFNBbmIySnFaV04wSnlrZ2UxeHlYRzVjZEZ4MGFuTnZiaUE5SUVwVFQwNHVjM1J5YVc1bmFXWjVLR1JoZEdFcFhISmNibHgwZlZ4eVhHNWNkSEpsZEhWeWJpQm5aWFJLYzI5dVZtbGxkMlZ5S0dwemIyNHNJRzl3ZEdsdmJuTXBPMXh5WEc1OU8xeHlYRzVjYmx4dVhHNHZLaW9xS2lvcUtpb3FLaW9xS2lvcUtpcGNiaUFxS2lCWFJVSlFRVU5MSUVaUFQxUkZVbHh1SUNvcUlDNHZjMk55YVhCMGN5OWhjR2t0Wlhod2JHOXlaWEl2ZGpJdmMzSmpMMjF2WkhWc1pYTXZhbk52Ymkxd1lYSnpaUzVxYzF4dUlDb3FJRzF2WkhWc1pTQnBaQ0E5SURGY2JpQXFLaUJ0YjJSMWJHVWdZMmgxYm10eklEMGdNRnh1SUNvcUx5SmRMQ0p6YjNWeVkyVlNiMjkwSWpvaUluMD1cIiwgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImhpZ2hsaWdodEpzb24ud29ya2VyLmpzXCIpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvaGlnaGxpZ2h0SnNvbi53b3JrZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDM0MzkxMy9ob3ctdG8tY3JlYXRlLWEtd2ViLXdvcmtlci1mcm9tLWEtc3RyaW5nXHJcblxyXG52YXIgVVJMID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGNvbnRlbnQsIHVybCkge1xyXG5cdHRyeSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHR2YXIgYmxvYjtcclxuXHRcdFx0dHJ5IHsgLy8gQmxvYkJ1aWxkZXIgPSBEZXByZWNhdGVkLCBidXQgd2lkZWx5IGltcGxlbWVudGVkXHJcblx0XHRcdFx0dmFyIEJsb2JCdWlsZGVyID0gd2luZG93LkJsb2JCdWlsZGVyIHx8IHdpbmRvdy5XZWJLaXRCbG9iQnVpbGRlciB8fCB3aW5kb3cuTW96QmxvYkJ1aWxkZXIgfHwgd2luZG93Lk1TQmxvYkJ1aWxkZXI7XHJcblx0XHRcdFx0YmxvYiA9IG5ldyBCbG9iQnVpbGRlcigpO1xyXG5cdFx0XHRcdGJsb2IuYXBwZW5kKGNvbnRlbnQpO1xyXG5cdFx0XHRcdGJsb2IgPSBibG9iLmdldEJsb2IoKTtcclxuXHRcdFx0fSBjYXRjaChlKSB7IC8vIFRoZSBwcm9wb3NlZCBBUElcclxuXHRcdFx0XHRibG9iID0gbmV3IEJsb2IoW2NvbnRlbnRdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gbmV3IFdvcmtlcihVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpKTtcclxuXHRcdH0gY2F0Y2goZSkge1xyXG5cdFx0XHRyZXR1cm4gbmV3IFdvcmtlcignZGF0YTphcHBsaWNhdGlvbi9qYXZhc2NyaXB0LCcgKyBlbmNvZGVVUklDb21wb25lbnQoY29udGVudCkpO1xyXG5cdFx0fVxyXG5cdH0gY2F0Y2goZSkge1xyXG5cdFx0cmV0dXJuIG5ldyBXb3JrZXIodXJsKTtcclxuXHR9XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi93b3JrZXItbG9hZGVyL2NyZWF0ZUlubGluZVdvcmtlci5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJmdW5jdGlvbiBzbGljayh0aW1lcykge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0dmFyIHNlbGVjdG9yID0gJyNzbGlkZXItJztcblx0XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdGltZXM7IGkrKykge1xuXHRcdCQoc2VsZWN0b3IgKyBpKS5sZW5ndGggJiYgJChzZWxlY3RvciArIGkpLnNsaWNrKHtcblx0XHRcdGRvdHM6IGZhbHNlLFxuXHRcdFx0aW5maW5pdGU6IGZhbHNlLFxuXHRcdFx0c3BlZWQ6IDMwMCxcblx0XHRcdHNsaWRlc1RvU2hvdzogMyxcblx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxuXHRcdFx0dmFyaWFibGVXaWR0aDogdHJ1ZSxcblx0XHRcdGF1dG9wbGF5OiBmYWxzZSxcblx0XHRcdHJlc3BvbnNpdmU6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGJyZWFrcG9pbnQ6IDEyMDAsXG5cdFx0XHRcdFx0c2V0dGluZ3M6IHtcblx0XHRcdFx0XHRcdHZhcmlhYmxlV2lkdGg6IHRydWUsXG5cdFx0XHRcdFx0XHRzbGlkZXNUb1Nob3c6IDIsXG5cdFx0XHRcdFx0XHRzbGlkZXNUb1Njcm9sbDogMSxcblx0XHRcdFx0XHRcdGluZmluaXRlOiBmYWxzZSxcblx0XHRcdFx0XHRcdGRvdHM6IGZhbHNlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YnJlYWtwb2ludDogODAwLFxuXHRcdFx0XHRcdHNldHRpbmdzOiB7XG5cdFx0XHRcdFx0XHR2YXJpYWJsZVdpZHRoOiB0cnVlLFxuXHRcdFx0XHRcdFx0c2xpZGVzVG9TaG93OiAxLFxuXHRcdFx0XHRcdFx0c2xpZGVzVG9TY3JvbGw6IDFcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9KTtcblx0fVxufVxuXG5mdW5jdGlvbiB1bnNsaWNrKHRpbWVzKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdGltZXM7IGkrKykge1xuXHRcdHZhciBzZWxlY3RvciA9ICcjc2xpZGVyLScgKyBpO1xuXHRcdCQoc2VsZWN0b3IpICYmICQoc2VsZWN0b3IpLmxlbmd0aCAmJiAkKHNlbGVjdG9yKS5zbGljaygndW5zbGljaycpO1xuXHR9XG5cdGNvbnNvbGUuaW5mbygnY2xlYXJlZCcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0c2V0OiBzbGljayxcblx0cmVtb3ZlOiB1bnNsaWNrXG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL3NsaWRlci5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJkaXNjb3ZlcnkudjIuZXZlbnRzLmdldFwiOiB7XG5cdFx0XCJldmVudHNcIjoge1xuXHRcdFx0XCJvYmplY3RcIjoge1xuXHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFwidGl0bGVcIjogXCJFdmVudFwiLFxuXHRcdFx0XHRcdFwiY29weUJ0blwiOiB7XG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogdHJ1ZVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XCJpbmRleFwiOiAwXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcImltYWdlc1wiOiB7XG5cdFx0XHRcdFwib2JqZWN0XCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJ0aXRsZVwiOiBcImltYWdlXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XCJpbmRleFwiOiAxLFxuXHRcdFx0XHRcdFwiY29sbGFwc2VkXCI6IHRydWVcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdFwic2FsZXNcIjoge1xuXHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFwiaW5kZXhcIjogMlxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJ2ZW51ZXNcIjoge1xuXHRcdFx0XHRcIm9iamVjdFwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwidGl0bGVcIjogXCJ2ZW51ZVwiLFxuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiAwXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImNpdHlcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwic3RhdGVcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDFcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiY291bnRyeVwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogMVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJhZGRyZXNzXCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiAzXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImxvY2F0aW9uXCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiA0XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFwiaW5kZXhcIjogM1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJkYXRlc1wiOiB7XG5cdFx0XHRcdFwic3RhcnRcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDAsXG5cdFx0XHRcdFx0XHRcImNvcHlCdG5cIjoge1xuXHRcdFx0XHRcdFx0XHRcImRhdGVUaW1lXCI6IHRydWVcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwic3RhdHVzXCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiAxXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImVuZFwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogMixcblx0XHRcdFx0XHRcdFwiY29weUJ0blwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiZGF0ZVRpbWVcIjogdHJ1ZVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcImluZGV4XCI6IDQsXG5cdFx0XHRcdFx0XCJjb3B5QnRuXCI6IHtcblx0XHRcdFx0XHRcdFwidGltZXpvbmVcIjogdHJ1ZVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XCJhbGxJbnNpZGVcIjogdHJ1ZVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XCJldmVudHNcIjogdHJ1ZSxcblx0XHRcdFx0XCJpbmRleFwiOiAwXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcInBhZ2VcIjoge1xuXHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XCJpbmRleFwiOiAxLFxuXHRcdFx0XHRcImNvbGxhcHNlZFwiOiB0cnVlXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XCJtZXRob2RcIjogXCJkaXNjb3ZlcnkudjIuZXZlbnRzLmdldFwiXG5cdFx0fVxuXHR9LFxuXHRcImRpc2NvdmVyeS52Mi5hdHRyYWN0aW9ucy5nZXRcIjoge1xuXHRcdFwiYXR0cmFjdGlvbnNcIjoge1xuXHRcdFx0XCJvYmplY3RcIjoge1xuXHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFwiaW5kZXhcIjogMFxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJpbWFnZXNcIjoge1xuXHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFwiaW5kZXhcIjogMlxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJjbGFzc2lmaWNhdGlvbnNcIjoge1xuXHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFwiaW5kZXhcIjogMVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XCJpbmRleFwiOiAwXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcInBhZ2VcIjoge1xuXHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XCJpbmRleFwiOiAxXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XCJtZXRob2RDb25maWdcIjogdHJ1ZVxuXHRcdH1cblx0fSxcblx0XCJfR0xPQkFMX0NPTkZJR1wiOiB7XG5cdFx0XCJjb3B5QnRuXCI6IHtcblx0XHRcdFwiaWRcIjogdHJ1ZVxuXHRcdH0sXG5cdFx0XCJkZXByZWNhdGVkXCI6IFtcblx0XHRcdFwiX2xpbmtzXCJcblx0XHRdLFxuXHRcdFwidW53cmFwcFwiOiBbXG5cdFx0XHRcIl9lbWJlZGRlZFwiXG5cdFx0XVxuXHR9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb25maWcuanNvblxuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XHJcblx0cmVxdWlyZSgnLi9jdXN0b21TZWxlY3QuY29tcG9uZW50LmpzJyk7XHJcblx0cmVxdWlyZSgnLi9wYW5lbHMvcGFuZWxHcm91cC5jb21wb25lbnQuanMnKTtcclxuXHRyZXF1aXJlKCcuL3BhbmVscy9wYW5lbC5jb21wb25lbnQuanMnKTtcclxuXHRyZXF1aXJlKCcuL3BhbmVscy9wYWdpbmF0aW9uLmNvbXBvbmVudC5qcycpO1xyXG5cdHJlcXVpcmUoJy4vcGFuZWxzL3BhbmVsSGVhZGluZy5jb21wb25lbnQuanMnKTtcclxuXHRyZXF1aXJlKCcuL3BhbmVscy9vYmplY3RQYW5lbEJvZHkuY29tcG9uZW50LmpzJyk7XHJcblx0cmVxdWlyZSgnLi9wYW5lbHMvYXJyYXlQYW5lbEJvZHkuY29tcG9uZW50LmpzJyk7XHJcbn0oKSk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcclxuICogQ3VzdG9tIFNlbGVjdCBjb21wb25lbnRcclxuICovXHJcbnZhciBzZWxmO1xyXG5cclxuLyoqXHJcbiAqIEN1c3RvbSBTZWxlY3QgVmlldy1Nb2RlbFxyXG4gKiBAcGFyYW0gcGFyYW1zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gQ3VzdG9tU2VsZWN0KHBhcmFtcykge1xyXG4gIHNlbGYgPSB0aGlzO1xyXG5cclxuICB0aGlzLmFuaW1hdGlvblNwZWVkID0gcGFyYW1zLmFuaW1hdGlvblNwZWVkIHx8IDIwMDtcclxuXHR0aGlzLmN1cmVudFNlbGVjdERhdGEgPSBwYXJhbXMuZGF0YSB8fCBudWxsO1xyXG5cdHRoaXMub25Gb2N1cyA9IHBhcmFtcy5mb2N1cyB8fCBudWxsO1xyXG5cdFxyXG4gIC8vb2JzZXJ2YWJsZXNcclxuICB0aGlzLnNlbGVjdE1vZGVsID0gdHlwZW9mIHBhcmFtcy5vcHRpb25zICE9PSdmdW5jdGlvbicgPyBrby5vYnNlcnZhYmxlQXJyYXkocGFyYW1zLm9wdGlvbnMpOiAgcGFyYW1zLm9wdGlvbnM7XHJcbiAgdGhpcy5wbGFjZWhvbGRlciA9IGtvLm9ic2VydmFibGUocGFyYW1zLnBsYWNlaG9sZGVyIHx8ICcnKTtcclxuICB0aGlzLm9uc2VsZWN0ID0gcGFyYW1zLm9uc2VsZWN0IHx8IGZ1bmN0aW9uIChpdGVtKSB7IGNvbnNvbGUubG9nKGl0ZW0gKydzZWxlY3RlZCEnKX07XHJcbiAgdGhpcy5zZWxlY3RlZCA9IGtvLm9ic2VydmFibGUodGhpcy5zZWxlY3RNb2RlbCgpWzBdKTtcclxuICB0aGlzLmlzT25lT3B0aW9uID0ga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdE1vZGVsKCkubGVuZ3RoIDwgMjsgLy8gbW9yZSB0aGFuIG9uZSBvcHRpb25cclxuICB9LCB0aGlzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZEVsZW1lbnQoZXZlbnQpIHtcclxuICB2YXIgcGFyZW50ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5wYXJlbnRzKCcuanMtY3VzdG9tLXNlbGVjdCcpO1xyXG4gIHJldHVybiB7XHJcbiAgICB3cmFwcGVyOiBwYXJlbnQuZmluZCgnLmpzLWN1c3RvbS1zZWxlY3Qtd3JhcHBlcicpLFxyXG4gICAgbGF5ZXI6IHBhcmVudC5maW5kKCcuanMtY3VzdG9tLXNlbGVjdC1sYXllcicpXHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ3VzdG9tIFNlbGVjdCBWaWV3LU1vZGVsIG1ldGhvZFxyXG4gKiBAcGFyYW0gdmlld01vZGVsXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuQ3VzdG9tU2VsZWN0LnByb3RvdHlwZS5zbGlkZVRvZ2dsZSA9IGZ1bmN0aW9uKHZpZXdNb2RlbCwgZXZlbnQpIHtcclxuXHQvLyBlbGVtIGluIGZvY3VzIGVtdWxhdGlvblxyXG5cdHRoaXMub25Gb2N1cyAmJiB0aGlzLm9uRm9jdXModGhpcy5jdXJlbnRTZWxlY3REYXRhKTtcclxuXHJcblx0aWYgKHRoaXMuaXNPbmVPcHRpb24oKSkge3JldHVybiBmYWxzZTt9XHJcbiAgdmFyIGVsID0gZmluZEVsZW1lbnQoZXZlbnQpO1xyXG4gICAgZWwud3JhcHBlci5zbGlkZVRvZ2dsZSh2aWV3TW9kZWwuYW5pbWF0aW9uU3BlZWQpO1xyXG4gICAgZWwubGF5ZXIudG9nZ2xlQ2xhc3MoJ2hpZGRlbicpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEN1c3RvbSBTZWxlY3QgVmlldy1Nb2RlbCBtZXRob2RcclxuICogQHBhcmFtIGl0ZW1cclxuICogQHBhcmFtIGV2ZW50XHJcbiAqL1xyXG5DdXN0b21TZWxlY3QucHJvdG90eXBlLnNlbGVjdEl0ZW0gPSBmdW5jdGlvbiAoaXRlbSwgZXZlbnQpIHtcclxuICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgdGhpcy5zZWxlY3RlZChpdGVtKTtcclxuICAvLyBydW4gaGFuZGxlclxyXG4gIHRoaXMub25zZWxlY3QoaXRlbSk7XHJcblx0Ly8gc2xpZGUgdXBcclxuICB0aGlzLnNsaWRlVG9nZ2xlKHNlbGYsIGV2ZW50KTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ga28uY29tcG9uZW50cy5yZWdpc3RlcignY3VzdG9tLXNlbGVjdCcsIHtcclxuICB2aWV3TW9kZWw6IEN1c3RvbVNlbGVjdCxcclxuICB0ZW1wbGF0ZTogKFtcclxuICAgICc8ZGl2IGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0IGpzLWN1c3RvbS1zZWxlY3RcIj4nLFxyXG4gICAgICAnPGRpdiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdC13cmFwcGVyXCI+JyxcclxuICAgICAgICAnPHNlbGVjdCBkYXRhLWJpbmQ9XCJvcHRpb25zOiBzZWxlY3RNb2RlbCwgb3B0aW9uc1RleHQ6IFxcJ25hbWVcXCcsIHZhbHVlOiBzZWxlY3RlZFwiIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19maWVsZFwiIG5hbWU9XCJhcGktZXhwLW1ldGhvZFwiPjwvc2VsZWN0PicsXHJcbiAgICAgICAgJzxzcGFuIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19wbGFjZWhvbGRlclwiPicsXHJcbiAgICAgICAgICAnPGlucHV0IGRhdGEtYmluZD1cImV2ZW50OiB7Y2xpY2s6IHNsaWRlVG9nZ2xlfSwgYXR0cjoge3ZhbHVlOiBzZWxlY3RlZCgpLm5hbWUsIGRpc2FibGVkOiBpc09uZU9wdGlvbn1cIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiXCIgcmVhZG9ubHk9XCJcIj4nLFxyXG4gICAgICAgICAgJzxiIGRhdGEtYmluZD1cImNzczoge2hpZGRlbjogaXNPbmVPcHRpb259XCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2NoZXZyb25cIj4mbmJzcDs8L2I+JyxcclxuICAgICAgICAnPC9zcGFuPicsXHJcbiAgICAgICAgJzx1bCBkYXRhLWJpbmQ9XCJmb3JlYWNoOiBzZWxlY3RNb2RlbFwiIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19saXN0IGpzLWN1c3RvbS1zZWxlY3Qtd3JhcHBlclwiPicsXHJcbiAgICAgICAgICAnPGxpIGRhdGEtYmluZD1cImNzczoge1xcJ2FjdGl2ZVxcJzogY2hlY2tlZH1cIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9faXRlbVwiPicsXHJcbiAgICAgICAgICAgICc8YnV0dG9uIGRhdGEtYmluZD1cImV2ZW50OiB7Y2xpY2s6ICRwYXJlbnQuc2VsZWN0SXRlbS5iaW5kKCRwYXJlbnQpfSwgdGV4dDogbmFtZSwgY3NzOiB7XFwnYWN0aXZlXFwnOiBjaGVja2VkKCl9LCBhdHRyOiB7XFwnZGF0YS12YWx1ZVxcJzogbmFtZX1cIiAgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2l0ZW0tbGFiZWxcIiBocmVmPVwiI1wiPjwvYnV0dG9uPicsXHJcbiAgICAgICAgICAgIC8vICc8c3BhbiBkYXRhLWJpbmQ9XCJpZjogbGlua1wiPicsXHJcbiAgICAgICAgICAgIFx0JzxhIGRhdGEtYmluZD1cImF0dHI6IHtocmVmOiBsaW5rfSwgY3NzOiB7XFwnaGlkZGVuXFwnOiAhbGlua31cIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9faXRlbS1saW5rXCIgdGFyZ2V0PVwiX2JsYW5rXCI+Jm5ic3A7PC9hPicsXHJcbiAgICAgICAgICAgIC8vICc8L3NwYW4+JyxcclxuICAgICAgICAgICc8L2xpPicsXHJcbiAgICAgICAgJzwvdWw+JyxcclxuICAgICAgJzwvZGl2PicsXHJcbiAgICAgICc8ZGl2IGRhdGEtYmluZD1cImNsaWNrOiBzbGlkZVRvZ2dsZVwiIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0LWxheWVyIGpzLWN1c3RvbS1zZWxlY3QtbGF5ZXIgaGlkZGVuXCI+PC9kaXY+JyxcclxuICAgICc8L2Rpdj4nXHJcbiAgXSkuam9pbignJylcclxufSk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9jdXN0b21TZWxlY3QuY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcbnRvZG86IHNpbmdsZSAtIGZpcnN0IGxvYWQ7XHJcbnRvZG86IGluaGVyaXRhbmNlIG9mIGNvbmZpZ1xyXG50b2RvOiBwYWdpbmcgKHBhcmFtcylcclxudG9kbzogY29weSBidG5cclxudG9kbzogdWxyIHBhcnNlXHJcbnRvZG86IGZpZWxkcyB2YWxpZGF0aW9uXHJcbiAqL1xyXG5cclxudmFyIHNlbGY7XHJcblxyXG5mdW5jdGlvbiBjYXJkR3JvdXBDb21wb25lbnQocGFyYW1zKSB7XHJcblx0c2VsZiA9IHRoaXM7XHJcblx0dGhpcy51cmwgPSB0aGlzLnVybCB8fCBwYXJhbXMudXJsO1xyXG5cdHRoaXMuY29uZmlnID0gZ2V0Q29uZmlnKHBhcmFtcyk7XHJcblx0dGhpcy5kYXRhID0gcHJlcGFyZURhdGEocGFyYW1zLCB0aGlzLmNvbmZpZy5fQ09ORklHKTtcclxuXHR0aGlzLmdyb3VwSW5kZXggPSBwYXJhbXMuZ3JvdXBJbmRleCB8fCAwO1xyXG5cdHRoaXMuc2VjdGlvbkluZGV4ID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShwYXJhbXMuc2VjdGlvbkluZGV4KTtcclxuXHR0aGlzLmNvbG9yQ2xhc3MgPSBwYXJhbXMuY29sb3JDbGFzcztcclxuXHR0aGlzLmdldE1vcmUgPSBwYXJhbXMuZ2V0TW9yZTtcclxuXHR0aGlzLnBhZ2UgPSBnZXRQYWdpbmdJbmZvKHBhcmFtcywgdGhpcy5kYXRhLnBhZ2UsIHRoaXMudXJsKTtcclxuXHR0aGlzLmNvbGxhcHNlSWQgPSBnZXRDb2xsYXBzZUlkKCk7XHJcbn1cclxuXHJcbmNhcmRHcm91cENvbXBvbmVudC5wcm90b3R5cGUuc29ydEJ5Q29uZmlnID0gZnVuY3Rpb24gKGEsIGIpIHtcclxuXHRpZiAoc2VsZi5jb25maWcgJiYgc2VsZi5jb25maWdbYS5rZXldICYmIHNlbGYuY29uZmlnW2Iua2V5XSAmJiBzZWxmLmNvbmZpZ1thLmtleV0uX0NPTkZJRyAmJiBzZWxmLmNvbmZpZ1tiLmtleV0uX0NPTkZJRykge1xyXG5cdFx0dmFyIGkxID0gc2VsZi5jb25maWdbYS5rZXldLl9DT05GSUcuaW5kZXg7XHJcblx0XHR2YXIgaTIgPSBzZWxmLmNvbmZpZ1tiLmtleV0uX0NPTkZJRy5pbmRleDtcclxuXHRcdHJldHVybiBpMSAtIGkyO1xyXG5cdH1cclxuXHRyZXR1cm4gMDtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ga28uY29tcG9uZW50cy5yZWdpc3RlcigncGFuZWwtZ3JvdXAnLCB7XHJcblx0dmlld01vZGVsOiBjYXJkR3JvdXBDb21wb25lbnQsXHJcblx0dGVtcGxhdGU6YFxyXG5cdFx0PHNlY3Rpb24gZGF0YS1iaW5kPVwiZm9yZWFjaHByb3A6IHtkYXRhOiBkYXRhLCBzb3J0Rm46IHNvcnRCeUNvbmZpZ31cIiBjbGFzcz1cInBhbmVsLWdyb3VwXCI+XHJcblx0XHRcdDxwYW5lbCBwYXJhbXM9XCIkZGF0YTogJGRhdGEsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0JGluZGV4OiAkaW5kZXgsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cGFnZTogJGNvbXBvbmVudC5wYWdlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbG9yQ2xhc3M6ICRjb21wb25lbnQuY29sb3JDbGFzcyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRwYW5lbEdyb3VwOiAkY29tcG9uZW50LFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbGxhcHNlSWQ6ICRjb21wb25lbnQuY29sbGFwc2VJZCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25maWc6ICRjb21wb25lbnQuY29uZmlnXCI+XHJcblx0XHRcdDwvcGFuZWw+XHJcblx0XHQ8L3NlY3Rpb24+XHJcbmB9KTtcclxuXHJcbi8qKlxyXG4gKiBDb25maWd1cmVzIGFuZCBwYXJhbXMgZm9yIGVhY2ggcGFuZWwgZ3JvdXBcclxuICogQHBhcmFtIHBhcmFtc1xyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmZ1bmN0aW9uIGdldENvbmZpZyhwYXJhbXMpIHtcclxuXHRzZWxmLmRlZXBQcm9wID0gcGFyYW1zLmRlZXBQcm9wIHx8ICcnO1xyXG5cdC8vIG1haW4gY29uZmlnXHJcblx0aWYgKCFzZWxmLmRlZXBQcm9wICYmICFwYXJhbXMuY29uZmlnKSB7XHJcblx0XHQvLyBwYW5lbEdyb3VwIGluZGV4IC0gMFxyXG5cclxuXHRcdC8vIGdldCBmdWxsIGNvbmZpZztcclxuXHRcdHZhciBmaWx0ZXIgPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHBhcmFtcy5maWx0ZXIpO1xyXG5cclxuXHRcdC8vIGdldCBjdXJyZW50IG1ldGhvZCBjb25maWdcclxuXHRcdHZhciBtZXRob2RDb25maWcgPSBmaWx0ZXJbcGFyYW1zLnJlcUlkXSB8fCB7fTtcclxuXHJcblx0XHQvLyBtZXRob2QgY29uZmlnIGluaGVyaXRzIGdsb2JhbCBjb25maWdcclxuXHRcdG1ldGhvZENvbmZpZy5fQ09ORklHICA9ICQuZXh0ZW5kKHRydWUsIHt9LCBmaWx0ZXIuX0dMT0JBTF9DT05GSUcsIG1ldGhvZENvbmZpZy5fQ09ORklHKTtcclxuXHJcblx0XHRyZXR1cm4gbWV0aG9kQ29uZmlnO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQvLyBwYW5lbEdyb3VwIGluZGV4ID4gMFxyXG5cdFx0cmV0dXJuIHBhcmFtcy5jb25maWcgfHwge31cclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEYXRhIG1hbmlwdWxhdGlvbnNcclxuICogQHBhcmFtIHBhcmFtc1xyXG4gKiBAcmV0dXJucyB7Knx7fX1cclxuICovXHJcbmZ1bmN0aW9uIHByZXBhcmVEYXRhKHBhcmFtcywgY29uZmlnKSB7XHJcblx0dmFyIGRhdGEgPSBwYXJhbXMgJiYgcGFyYW1zLmRhdGEgfHwge307XHJcblx0dW53cmFwcE9iamVjdHMoZGF0YSwgY29uZmlnKTtcclxuXHRyZW1vdmVEZXByZWNhdGVkKGRhdGEsIGNvbmZpZyk7XHJcblx0cmV0dXJuIHdyYXBwUHJpbWl0aXZlcyhkYXRhLCBwYXJhbXMuX3Byb3BUaXRsZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHYXRoZXJzIGFsbCBzdGFuZCBhbG9uZSBwcm9wcyBpbiB0byBvbmUgb2JqZWN0XHJcbiAqIEBwYXJhbSBkYXRhIHtvYmplY3R9XHJcbiAqIEBwYXJhbSBfcHJvcFRpdGxlIHtzdHJpbmd9XHJcbiAqIEByZXR1cm5zIHtvYmplY3R9IHJldmlzZWQgZGF0YVxyXG4gKi9cclxuZnVuY3Rpb24gd3JhcHBQcmltaXRpdmVzKGRhdGEsIF9wcm9wVGl0bGUpIHtcclxuXHR2YXIgbmV3RGF0YSA9IHt9LCBwcm9wID0gX3Byb3BUaXRsZSB8fCAnb2JqZWN0JywgdmFsLCBrZXk7XHJcblxyXG5cdC8vIGdhdGhlcmluZyBhbGwgcHJpbWl0aXZlIHByb3BzIGluIGFkZGl0aW9uYWwgcGFuZWxcclxuXHRmb3IgKGtleSBpbiBkYXRhKSB7XHJcblx0XHRpZiAoIWRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge2NvbnRpbnVlO31cclxuXHRcdHZhbCA9IGRhdGFba2V5XTtcclxuXHJcblx0XHRpZiAodHlwZW9mIHZhbCAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0bmV3RGF0YVtwcm9wXSA9IG5ld0RhdGFbcHJvcF0gfHwge307XHJcblx0XHRcdG5ld0RhdGFbcHJvcF1ba2V5XSA9IHZhbDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG5ld0RhdGFba2V5XSA9IHZhbDtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIG5ld0RhdGFcclxufVxyXG5cclxuLyoqXHJcbiAqIFVud3JhcHMgb2JqZWN0c1xyXG4gKiBAcGFyYW0gb2JqIHtvYmplY3R9XHJcbiAqIEByZXR1cm5zIHtvYmplY3R9IGNoYW5nZWRcclxuICovXHJcbmZ1bmN0aW9uIHJlbW92ZURlcHJlY2F0ZWQob2JqLCBjb25maWcpIHtcclxuXHR2YXIgZGVwcmVjYXRlZCA9IGNvbmZpZyAmJiBjb25maWcuZGVwcmVjYXRlZCB8fCBbXTtcclxuXHJcblx0ZGVwcmVjYXRlZC5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdGlmIChvYmpbaXRlbV0pIHtcclxuXHRcdFx0ZGVsZXRlIG9ialtpdGVtXVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGl0ZW07XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiBvYmo7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGRlcHJlY2F0ZWQgb2JqZWN0c1xyXG4gKiBAcGFyYW0gb2JqIHtvYmplY3R9XHJcbiAqIEByZXR1cm5zIHtvYmplY3R9IGNoYW5nZWRcclxuICovXHJcbmZ1bmN0aW9uIHVud3JhcHBPYmplY3RzKG9iaiwgY29uZmlnKSB7XHJcblx0dmFyIHVud3JhcHAgPSBjb25maWcgJiYgY29uZmlnLnVud3JhcHAgfHwgW107XHJcblxyXG5cdHVud3JhcHAubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcblx0XHR2YXIgdmFsID0gb2JqW2l0ZW1dO1xyXG5cdFx0aWYgKHZhbCkge1xyXG5cdFx0XHR2YXIgYXJyID0gT2JqZWN0LmtleXModmFsKTtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgcHJvcCA9IGFycltpXTtcclxuXHRcdFx0XHRvYmpbcHJvcF0gPSB2YWxbcHJvcF07XHJcblx0XHRcdH1cclxuXHRcdFx0ZGVsZXRlIG9ialtpdGVtXTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBpdGVtO1xyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gb2JqO1xyXG59XHJcblxyXG4vKipcclxuICogUHJlcGFyZXMgZGF0YSBmb3IgcGFnaW5nXHJcbiAqIEBwYXJhbSBwYWdlT2JqXHJcbiAqIEBwYXJhbSBwYXJhbXNcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRQYWdpbmdJbmZvKHBhcmFtcywgcGFnZU9iaiwgdXJsKSB7XHJcblx0dmFyIHBhZ2VQYXJhbSwgc2l6ZTtcclxuXHJcblx0aWYgKHBhcmFtcy5wYWdlKSB7XHJcblx0XHRyZXR1cm4gcGFyYW1zLnBhZ2U7XHJcblx0fVxyXG5cdGlmIChwYWdlT2JqKXtcclxuXHRcdHNpemUgPSBwYXJhbXMuY2FyZFNpemUgfHwgcGFnZU9iai5zaXplO1xyXG5cdFx0cGFnZVBhcmFtID0gcGFyYW1zLnBhZ2VQYXJhbSB8fCBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHVybCkuZmluZChmdW5jdGlvbiAoaXRlbSkge1xyXG5cdFx0XHRyZXR1cm4gaXRlbS5uYW1lID09PSAncGFnZSc7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5wYWdlID0ge1xyXG5cdFx0XHRwYXJhbWV0ZXI6IHBhZ2VQYXJhbSAmJiBwYWdlUGFyYW0udmFsdWUsXHJcblx0XHRcdHNpemU6IHNpemVcclxuXHRcdH07XHJcblx0fVxyXG5cdHJldHVybiBudWxsO1xyXG59XHJcblxyXG4vKipcclxuICogUHJvdmlkZXMgaWQgc3RyIGZvciBwYW5lbCAnY29sbGFwc2UgdG9nZ2xlJyBsb2dpY1xyXG4gKiBAcGFyYW0gc3RyXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRDb2xsYXBzZUlkKHN0cikge1xyXG5cdHZhciBjbGFzc05hbWUgPSBzdHIgfHwgJ2NhcmQtcGFuZWwtYm9keS0nO1xyXG5cdHJldHVybiBbXHJcblx0XHRjbGFzc05hbWUsXHJcblx0XHRzZWxmLnNlY3Rpb25JbmRleCxcclxuXHRcdHNlbGYuZ3JvdXBJbmRleFxyXG5cdF0uam9pbignJyk7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYW5lbEdyb3VwLmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcblxuZnVuY3Rpb24gY2FyZENvbXBvbmVudChwYXJhbXMpIHtcblx0c2VsZiA9IHRoaXM7XG5cdHRoaXMua2V5ID0gcGFyYW1zLiRkYXRhLmtleTtcblx0dGhpcy4kZGF0YSA9IHBhcmFtcy4kZGF0YTtcblx0dGhpcy4kZGF0YSA9IHBhcmFtcy4kZGF0YTtcblx0dGhpcy4kaW5kZXggPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHBhcmFtcy4kaW5kZXgpO1xuXHR0aGlzLnBhZ2UgPSBwYXJhbXMucGFnZTtcblx0dGhpcy5jb2xvckNsYXNzID0gcGFyYW1zLmNvbG9yQ2xhc3M7XG5cdHRoaXMucGFuZWxHcm91cCA9IHBhcmFtcy5wYW5lbEdyb3VwO1xuXHR0aGlzLmNvbmZpZyA9IGdldFBhbmVsQ29uZmlnKHBhcmFtcy5jb25maWcsIHRoaXMua2V5KTtcblx0dGhpcy5pc0V4cGFuZGVkID0gaXNFeHBhbmRlZCh0aGlzLmNvbmZpZyk7XG5cdHRoaXMuY29sbGFwc2VJZCA9IHBhcmFtcy5jb2xsYXBzZUlkICsgdGhpcy4kaW5kZXg7XG5cdHRoaXMuaXNBY3RpdmUgPSBrby5vYnNlcnZhYmxlKHRoaXMuaXNFeHBhbmRlZCk7XG59XG5cbmNhcmRDb21wb25lbnQucHJvdG90eXBlLnNldEFjdGl2ZSA9IGZ1bmN0aW9uIChtb2RlbCwgZXZlbnQpIHtcblx0dGhpcy5pc0FjdGl2ZSghdGhpcy5pc0FjdGl2ZSgpKTtcbn07XG5cbi8qKlxuICogR2V0cyBjb25maWcgZm9yIGVhY2ggcGFuZWxcbiAqIEBwYXJhbSBrZXkge3N0cmluZ30ga2V5IG9mIHBhbmVsIG9iamVjdFxuICogQHJldHVybnMge29iamVjdH0gY29uZmlnXG4gKi9cbmZ1bmN0aW9uIGdldFBhbmVsQ29uZmlnKGNvbmZpZywga2V5KSB7XG5cdHZhciBzdWJDb25maWcgPSBjb25maWdba2V5XSB8fCB7fTtcblxuXHRzdWJDb25maWcuX0NPTkZJRyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBjb25maWcuX0NPTkZJRywgc3ViQ29uZmlnLl9DT05GSUcpO1xuXHRyZXR1cm4gc3ViQ29uZmlnO1xufVxuXG4vKipcbiAqIENoZWNrcyBmb3IgJ2NvbGxhcHNlZCcgY29uZmlnIGZvciBlYWNoIHBhbmVsXG4gKiBAcGFyYW0ga2V5IHtzdHJpbmd9IGtleSBvZiBwYW5lbCBvYmplY3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBmb3IgY3NzIGNsYXNzIGFkZC9yZW1vdmVcbiAqL1xuZnVuY3Rpb24gaXNFeHBhbmRlZChjb25maWcpIHtcblx0cmV0dXJuICEoT2JqZWN0LmdldFByb3AoY29uZmlnLCAnLl9DT05GSUcuY29sbGFwc2VkJykgfHwgZmFsc2UpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ3BhbmVsJywge1xuXHR2aWV3TW9kZWw6IGNhcmRDb21wb25lbnQsXG5cdHRlbXBsYXRlOmBcblx0XHQ8c2VjdGlvbiBkYXRhLWJpbmQ9XCJjc3M6IHtbY29sb3JDbGFzc106IHRydWUsIGFjdGl2ZTogaXNBY3RpdmV9XCIgY2xhc3M9XCJwYW5lbCBwYW5lbC1wcmltYXJ5XCI+XG5cdFx0XHQ8IS0tcGFuZWwtaGVhZGluZy0tPlxuXHRcdFx0PHBhbmVsLWhlYWRpbmcgcGFyYW1zPVwiY29uZmlnOiBjb25maWcsIGRhdGE6ICRkYXRhLCBpbmRleDogJGluZGV4LCBwYWdlOiBwYWdlLCBzZXRBY3RpdmU6IHNldEFjdGl2ZS5iaW5kKCRjb21wb25lbnQpLCBjb2xsYXBzZUlkOiBjb2xsYXBzZUlkXCI+PC9wYW5lbC1oZWFkaW5nPlxuXHRcdFx0XG5cdFx0XHQ8IS0tcGFuZWwtYm9keS0tPlxuXHRcdFx0PHNlY3Rpb24gZGF0YS1iaW5kPVwiYXR0cjogeydpZCc6IGNvbGxhcHNlSWR9LCBjc3M6IHsnaW4nOiBpc0V4cGFuZGVkfVwiIGNsYXNzPVwicGFuZWwtY29sbGFwc2UgY29sbGFwc2VcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cblx0XHRcdFx0XG5cdFx0XHRcdFx0PCEtLSBrbyBpZjogKHR5cGVvZiAkZGF0YS52YWx1ZSA9PT0gJ29iamVjdCcgJiYgISQuaXNBcnJheSgkZGF0YS52YWx1ZSkpIC0tPlxuXHRcdFx0XHRcdFx0PG9iamVjdC1wYW5lbC1ib2R5IHBhcmFtcz1cImNvbmZpZzogY29uZmlnLCBkYXRhOiAkZGF0YSwgaW5kZXg6ICRpbmRleCwgcGFuZWxHcm91cDogcGFuZWxHcm91cCwgcGFnZTogcGFnZVwiPjwvb2JqZWN0LXBhbmVsLWJvZHk+XG5cdFx0XHRcdFx0PCEtLSAva28gLS0+XG5cdFx0XHRcdFx0PCEtLSBrbyBpZjogKHR5cGVvZiAkZGF0YS52YWx1ZSA9PT0gJ29iamVjdCcgJiYgJC5pc0FycmF5KCRkYXRhLnZhbHVlKSkgLS0+XG5cdFx0XHRcdFx0XHQ8YXJyYXktcGFuZWwtYm9keSBwYXJhbXM9XCJjb25maWc6IGNvbmZpZywgZGF0YTogJGRhdGEsIGluZGV4OiAkaW5kZXgsIHBhbmVsR3JvdXA6IHBhbmVsR3JvdXBcIj48L2FycmF5LXBhbmVsLWJvZHk+XG5cdFx0XHRcdFx0PCEtLSAva28gLS0+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9zZWN0aW9uPlxuXHRcdDwvc2VjdGlvbj5cbmB9KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9wYW5lbHMvcGFuZWwuY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xyXG5cclxuLyoqXHJcbiAqIFBhZ2luYXRpb24gZWxlbWVudFxyXG4gKiBAcGFyYW0gcGFyYW1zXHJcbiAqL1xyXG5mdW5jdGlvbiBwYWdpbmF0aW9uKHBhcmFtcykge1xyXG5cdHRoaXMucGFnZVBhcmFtID0gcGFyYW1zLnBhZ2VQYXJhbTtcclxuXHR0aGlzLnRvdGFsUGFnZXMgPSArcGFyYW1zLnRvdGFsUGFnZXM7XHJcblx0dGhpcy5udW1iZXIgPSArcGFyYW1zLm51bWJlcjtcclxuXHR0aGlzLmZpcnN0ID0gISF0aGlzLm51bWJlcjtcclxuXHR0aGlzLmxhc3QgPSB0aGlzLm51bWJlciA8IHRoaXMudG90YWxQYWdlcyAtIDE7XHJcblx0dGhpcy5yZXF1ZXN0QnRuID0gJCgnI2FwaS1leHAtZ2V0LWJ0bicpO1xyXG5cdHNlbGYgPSB0aGlzO1xyXG59XHJcblxyXG4vKipcclxuICogZ2V0IG5leHQgcGFnZVxyXG4gKi9cclxucGFnaW5hdGlvbi5wcm90b3R5cGUuZ2V0UHJldlBhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHZhbCA9IHRoaXMucGFnZVBhcmFtKCk7XHJcblx0dGhpcy5wYWdlUGFyYW0odmFsID4gMCA/IHZhbCAtIDEgOiAwKTtcclxuXHR0aGlzLnJlcXVlc3RCdG4udHJpZ2dlcignY2xpY2snKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBnZXQgcHJldiBwYWdlXHJcbiAqL1xyXG5wYWdpbmF0aW9uLnByb3RvdHlwZS5nZXROZXh0UGFnZSA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdmFsID0gdGhpcy5udW1iZXI7XHJcblx0dGhpcy5wYWdlUGFyYW0odmFsIDwgdGhpcy50b3RhbFBhZ2VzIC0gMSA/IHZhbCAgKyAxOiB2YWwpO1xyXG5cdHRoaXMucmVxdWVzdEJ0bi50cmlnZ2VyKCdjbGljaycpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdwYWdpbmF0aW9uJywge1xyXG5cdHZpZXdNb2RlbDogcGFnaW5hdGlvbixcclxuXHR0ZW1wbGF0ZTpcclxuXHRgPHNwYW4gY2xhc3M9XCJuYXZpZ2F0aW9uLXdyYXBwZXJcIj5cclxuXHRcdDxidXR0b24gZGF0YS1iaW5kPVwiY2xpY2s6IGdldFByZXZQYWdlLCBlbmFibGU6IGZpcnN0XCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibmF2aWdhdGlvbiBwcmV2XCI+PC9idXR0b24+XHJcblx0XHQ8YnV0dG9uICBkYXRhLWJpbmQ9XCJjbGljazogZ2V0TmV4dFBhZ2UsIGVuYWJsZTogbGFzdFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm5hdmlnYXRpb24gbmV4dFwiPjwvYnV0dG9uPlxyXG5cdDwvc3Bhbj5gXHJcbn0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL3BhZ2luYXRpb24uY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xyXG5cclxuZnVuY3Rpb24gb2JqZWN0UGFuZWxCb2R5Q29tcG9uZW50KHBhcmFtcykge1xyXG5cdHNlbGYgPSB0aGlzO1xyXG5cdHZhciBjb25maWcgPSBwYXJhbXMuY29uZmlnICYmIHBhcmFtcy5jb25maWcuX0NPTkZJRztcclxuXHR2YXIgcGFnZSA9IHBhcmFtcy5wYWdlO1xyXG5cdHRoaXMuc2V0QWN0aXZlID0gcGFyYW1zLnNldEFjdGl2ZTtcclxuXHR0aGlzLl9wYW5lbE5hbWUgPSBwYXJhbXMuZGF0YS5rZXk7XHJcblx0dGhpcy50aXRsZSA9IGNvbmZpZyAmJiBjb25maWcudGl0bGUgfHwgdGhpcy5fcGFuZWxOYW1lO1xyXG5cdHRoaXMuZGF0YSA9IHBhcmFtcy5kYXRhLnZhbHVlO1xyXG5cdGlmIChwYWdlKSB7XHJcblx0XHR0aGlzLmNhcmRTaXplID0gcGFnZS5zaXplO1xyXG5cdFx0dGhpcy5wYWdlUGFyYW0gPSBwYWdlLnBhZ2VQYXJhbTtcclxuXHR9XHJcblx0dGhpcy5jb2xsYXBzZUlkID0gcGFyYW1zLmNvbGxhcHNlSWQ7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdwYW5lbC1oZWFkaW5nJywge1xyXG5cdHZpZXdNb2RlbDogIG9iamVjdFBhbmVsQm9keUNvbXBvbmVudCxcclxuXHR0ZW1wbGF0ZTpgXHJcblx0XHQ8c2VjdGlvbiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj5cclxuXHRcdFx0PGRpdiBjbGFzcz1cInBhbmVsLXRpdGxlXCI+XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0PGEgZGF0YS1iaW5kPVwiY2xpY2s6IHNldEFjdGl2ZSwgYXR0cjoge2hyZWY6ICcjJyArIGNvbGxhcHNlSWQsICdhcmlhLWNvbnRyb2xzJzogY29sbGFwc2VJZH1cIiBjbGFzcz1cImJ0biBidG4taWNvblwiIHR5cGU9XCJidXR0b25cIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+XHJcblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImJ0biBidG4taWNvbiBzaGV2cm9uIHdoaXRlLXNoZXZyb24tdXBcIj48L3NwYW4+XHJcblx0XHRcdFx0XHQ8cCBkYXRhLWJpbmQ9XCJ0ZXh0OiB0aXRsZVwiIGNsYXNzPVwidGl0bGVcIj5QYW5lbCB0aXRsZTwvcD5cclxuXHRcdFx0XHQ8L2E+XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0PCEtLSBrbyBpZjogX3BhbmVsTmFtZSA9PT0gJ2V2ZW50cyctLT5cclxuXHRcdFx0XHRcdDxzcGFuIGRhdGEtYmluZD1cInRleHQ6IGNhcmRTaXplXCIgY2xhc3M9XCJjb3VudGVyXCI+PC9zcGFuPlxyXG5cdFx0XHRcdDwhLS0gL2tvLS0+XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0PCEtLSBrbyBpZjogX3BhbmVsTmFtZSA9PT0gJ3BhZ2UnLS0+XHJcblx0XHRcdFx0XHQ8cGFnaW5hdGlvbiBwYXJhbXM9XCJudW1iZXI6IGRhdGEubnVtYmVyLCB0b3RhbFBhZ2VzOiBkYXRhLnRvdGFsUGFnZXMsIHBhZ2VQYXJhbTogcGFnZVBhcmFtXCI+PC9wYWdpbmF0aW9uPlxyXG5cdFx0XHRcdDwhLS0gL2tvLS0+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0PC9zZWN0aW9uPlxyXG5gfSk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9wYW5lbHMvcGFuZWxIZWFkaW5nLmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcclxuXHJcbmZ1bmN0aW9uIG9iamVjdFBhbmVsQm9keUNvbXBvbmVudChwYXJhbXMpIHtcclxuXHRzZWxmID0gdGhpcztcclxuXHR0aGlzLmRhdGEgPSB0aGlzLmRhdGEgfHwga28ub2JzZXJ2YWJsZShwYXJhbXMuZGF0YS52YWx1ZSk7XHJcblx0dGhpcy5jb25maWcgPSBwYXJhbXMuY29uZmlnO1xyXG5cdHRoaXMuX3BhbmVsTmFtZSA9IHBhcmFtcy5kYXRhLmtleTtcclxuXHR0aGlzLmNhcmRJbmRleCA9IHRoaXMuY2FyZEluZGV4IHx8IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUocGFyYW1zLmluZGV4KTtcclxuXHR0aGlzLnBhbmVsR3JvdXAgPSBwYXJhbXMucGFuZWxHcm91cDtcclxuXHR0aGlzLmdldE1vcmUgPSB0aGlzLnBhbmVsR3JvdXAuZ2V0TW9yZTtcclxuXHR0aGlzLnBhZ2VQYXJhbSA9IHBhcmFtcy5wYWdlICYmIHBhcmFtcy5wYWdlLnBhcmFtZXRlcjtcclxufVxyXG5cclxub2JqZWN0UGFuZWxCb2R5Q29tcG9uZW50LnByb3RvdHlwZS5vbkVudGVyS2V5RG93biA9IGZ1bmN0aW9uIChtb2RlbCwgZXZlbnQpIHtcclxuXHRpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuXHRcdHZhciB2YWx1ZSA9ICtldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlO1xyXG5cdFx0dmFsdWUgPSBOdW1iZXIuaXNOYU4odmFsdWUpID8gMCA6IHZhbHVlO1xyXG5cdFx0dmFyIHBhZ2VOdW1iZXIgPSB+fnZhbHVlIDwgMCA/IDAgOiB+fnZhbHVlO1xyXG5cdFx0c2VsZi5wYWdlUGFyYW0ocGFnZU51bWJlciA8IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUoc2VsZi5kYXRhKS50b3RhbFBhZ2VzID8gcGFnZU51bWJlciA6IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUoc2VsZi5kYXRhKS50b3RhbFBhZ2VzIC0gMSk7XHJcblx0XHQkKCcjYXBpLWV4cC1nZXQtYnRuJykudHJpZ2dlcignY2xpY2snKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG59O1xyXG5cclxub2JqZWN0UGFuZWxCb2R5Q29tcG9uZW50LnByb3RvdHlwZS5jYW5CZUNvcGllZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRpZiAodHlwZW9mIHRoaXMudmFsdWUgPT09ICdvYmplY3QnKSByZXR1cm4gZmFsc2U7XHJcblx0dGhpcy5jb3BpZWQgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcclxuXHRpZiAoT2JqZWN0LmdldFByb3Aoc2VsZi5jb25maWcsICcuX0NPTkZJRy5jb3B5QnRuLicgKyB0aGlzLmtleSkpIHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxub2JqZWN0UGFuZWxCb2R5Q29tcG9uZW50LnByb3RvdHlwZS5jb3B5VmFsdWUgPSBmdW5jdGlvbiAobW9kZWwsIGV2ZW50KSB7XHJcblx0dmFyIGN1cnJlbnRGaWVsZCA9IHRoaXM7XHJcblx0c2VsZi5jbGlwYm9hcmQgPSBuZXcgQ2xpcGJvYXJkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG5cdHNlbGYuY2xpcGJvYXJkLm9uKCdzdWNjZXNzJywgZnVuY3Rpb24gb25TdWNjZXNzQ29weShlKSB7XHJcblx0XHRcdGNvbnNvbGUuaW5mbygnQWN0aW9uOicsIGUuYWN0aW9uKTtcclxuXHRcdFx0Y29uc29sZS5pbmZvKCdUZXh0OicsIGUudGV4dCk7XHJcblx0XHRcdGNvbnNvbGUuaW5mbygnVHJpZ2dlcjonLCBlLnRyaWdnZXIpO1xyXG5cdFx0XHRjdXJyZW50RmllbGQuY29waWVkKHRydWUpO1xyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRjdXJyZW50RmllbGQuY29waWVkKGZhbHNlKTtcclxuXHRcdFx0fSwgMjAwMCk7XHJcblx0XHRcdGUuY2xlYXJTZWxlY3Rpb24oKTtcclxuXHRcdH0pXHJcblx0XHQub24oJ2Vycm9yJywgZnVuY3Rpb24gb25FcnJvckNvcHkoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdBY3Rpb246JywgZS5hY3Rpb24pO1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdUcmlnZ2VyOicsIGUudHJpZ2dlcik7XHJcblx0XHR9KTtcclxufTtcclxuXHJcbm9iamVjdFBhbmVsQm9keUNvbXBvbmVudC5wcm90b3R5cGUucmVtb3ZlSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuXHRzZWxmLmNsaXBib2FyZCAmJiBzZWxmLmNsaXBib2FyZC5kZXN0cm95KCk7XHJcblx0ZGVsZXRlIHNlbGYuY2xpcGJvYXJkO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdvYmplY3QtcGFuZWwtYm9keScsIHtcclxuXHR2aWV3TW9kZWw6ICBvYmplY3RQYW5lbEJvZHlDb21wb25lbnQsXHJcblx0dGVtcGxhdGU6YFxyXG5cdFx0PHNlY3Rpb24+XHJcblx0XHRcclxuXHRcdFx0PCEtLSBrbyBpZjogJGNvbXBvbmVudC5fcGFuZWxOYW1lID09PSAnaW1hZ2UnIC0tPlxyXG5cdFx0XHRcdDxpbWcgZGF0YS1iaW5kPVwiYXR0cjoge3NyYzoga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShkYXRhKS51cmwsIGFsdDogJ2ltYWdlLScgKyBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKGRhdGEpLnJhdGlvfVwiIGFsdD1cImltZ1wiIGNsYXNzPVwiaW1nIGltZy10aHVtYm5haWxcIj5cclxuXHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFxyXG5cdFx0XHQ8dWwgZGF0YS1iaW5kPVwiZm9yZWFjaHByb3A6IGRhdGFcIj5cclxuXHRcdFx0XHQ8bGkgY2xhc3M9XCJjbGVhcmZpeFwiPlxyXG5cdFx0XHRcdFx0PGIgY2xhc3M9XCJrZXlcIj5cclxuXHRcdFx0XHRcdFx0PHNwYW4gZGF0YS1iaW5kPVwidGV4dDogdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyA/IGtleToga2V5ICsgJzonXCI+PC9zcGFuPlxyXG5cdFx0XHRcdFx0PC9iPlxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8IS0tIGtvIGlmbm90OiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIHx8ICRjb21wb25lbnQuX3BhbmVsTmFtZSA9PT0gJ3BhZ2UnICYmIGtleSA9PT0gJ251bWJlcicgLS0+XHJcblx0XHRcdFx0XHRcdDxzcGFuIGRhdGEtYmluZD1cInRleHQ6IHZhbHVlXCIgY2xhc3M9XCJ2YWx1ZVwiPjwvc3Bhbj5cclxuXHRcdFx0XHRcdDwhLS0gL2tvIC0tPlxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8IS0tIGtvIGlmOiAkY29tcG9uZW50Ll9wYW5lbE5hbWUgPT09ICdwYWdlJyAmJiBrZXkgPT09ICdudW1iZXInLS0+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLWlubGluZVwiPlxyXG5cdFx0XHRcdFx0XHRcdDxpbnB1dCBpZD1cInBhZ2luYXRpb24taW5wdXRcIiBkYXRhLWJpbmQ9XCJldmVudDoge2tleWRvd246ICRjb21wb25lbnQub25FbnRlcktleURvd259LCBhdHRyOiB7cGxhY2Vob2xkZXI6IHZhbHVlfVwiIHR5cGU9XCJ0ZXh0XCIgcGF0dGVybj1cIlswLTldK1wiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdDwhLS0ga28gaWY6ICRjb21wb25lbnQuY2FuQmVDb3BpZWQuY2FsbCgkZGF0YSwgJyNwcm9wLXZhbHVlLScgKyBrZXkgKyAkaW5kZXgoKSkgLS0+XHJcblx0XHRcdFx0XHRcdDxidXR0b24gZGF0YS1iaW5kPVwiZXZlbnQ6IHttb3VzZW92ZXI6ICRjb21wb25lbnQuY29weVZhbHVlLCBtb3VzZW91dDogJGNvbXBvbmVudC5yZW1vdmVIYW5kbGVyfSwgY3NzOiB7J2NvcGllZCc6IGNvcGllZH0sIGF0dHI6IHsnZGF0YS1jbGlwYm9hcmQtdGV4dCc6IHZhbHVlLnRvU3RyaW5nKCksIGlkOiAncHJvcC12YWx1ZS0nICsga2V5ICsgJGluZGV4KCl9XCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1pY29uIGJ0bi1jb3B5XCI+PC9idXR0b24+XHJcblx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0PCEtLSBrbyBpZjogdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAtLT5cclxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBkYXRhLWJpbmQ9XCJjbGljazogJGNvbXBvbmVudC5nZXRNb3JlLmJpbmQoJGNvbXBvbmVudCwga2V5LCB2YWx1ZSlcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWljb24gYmx1ZS1zaGV2cm9uLXJpZ2h0IHB1bGwtcmlnaHRcIj48L2J1dHRvbj5cclxuXHRcdFx0XHRcdDwhLS0gL2tvIC0tPlxyXG5cdFx0XHRcdDwvbGk+XHJcblx0XHRcdDwvdWw+XHJcblx0XHQ8L3NlY3Rpb24+XHJcbmB9KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9vYmplY3RQYW5lbEJvZHkuY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xyXG5cclxuZnVuY3Rpb24gb2JqZWN0UGFuZWxCb2R5Q29tcG9uZW50KHBhcmFtcykge1xyXG5cdHNlbGYgPSB0aGlzO1xyXG5cdHRoaXMudGl0bGUgPSBwYXJhbXMuZGF0YS5rZXk7XHJcblx0dGhpcy5kYXRhID0gcGFyYW1zLmRhdGEudmFsdWU7XHJcblx0dGhpcy5jb25maWcgPSBwYXJhbXMuY29uZmlnO1xyXG5cdHRoaXMuX3BhbmVsTmFtZSA9IHBhcmFtcy5kYXRhLmtleTtcclxuXHR0aGlzLmNhcmRJbmRleCA9IHRoaXMuY2FyZEluZGV4IHx8IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUocGFyYW1zLmluZGV4KTtcclxuXHR0aGlzLnBhbmVsR3JvdXAgPSBwYXJhbXMucGFuZWxHcm91cDtcclxuXHR0aGlzLmdldE1vcmUgPSB0aGlzLnBhbmVsR3JvdXAuZ2V0TW9yZTtcclxufVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ga28uY29tcG9uZW50cy5yZWdpc3RlcignYXJyYXktcGFuZWwtYm9keScsIHtcclxuXHR2aWV3TW9kZWw6ICBvYmplY3RQYW5lbEJvZHlDb21wb25lbnQsXHJcblx0dGVtcGxhdGU6YFxyXG5cdFx0PHVsIGRhdGEtYmluZD1cImZvcmVhY2g6IGRhdGFcIiBjbGFzcz1cImxpc3QtZ3JvdXBcIj5cclxuXHRcdFx0PGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+XHJcblx0XHRcdFxyXG5cdFx0XHRcdDwhLS0ga28gaWY6ICRwYXJlbnQuX3BhbmVsTmFtZSA9PT0gJ2ltYWdlcycgLS0+XHJcblx0XHRcdFx0XHQ8aW1nIGRhdGEtYmluZD1cImF0dHI6IHtzcmM6IHVybCwgYWx0OiAnaW1hZ2UtJyArIHJhdGlvfVwiIGFsdD1cImltZ1wiIGNsYXNzPVwiaW1nXCI+XHJcblx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0PCEtLSBrbyBpZm5vdDogJHBhcmVudC5fcGFuZWxOYW1lID09PSAnaW1hZ2VzJyAtLT5cclxuXHRcdFx0XHQ8c3BhbiBkYXRhLWJpbmQ9XCJ0ZXh0OiBuYW1lIHx8ICcjJyArICRpbmRleCgpXCIgY2xhc3M9XCJuYW1lIHRydW5jYXRlXCI+ZXZlbnQgbmFtZTwvc3Bhbj5cclxuXHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQ8IS0tIGtvIGlmOiB0eXBlb2YgJGRhdGEgPT09ICdvYmplY3QnIC0tPlxyXG5cdFx0XHRcdFx0PGJ1dHRvbiBkYXRhLWJpbmQ9XCJjbGljazogJGNvbXBvbmVudC5nZXRNb3JlLmJpbmQoJGNvbXBvbmVudCwgJGluZGV4KCkpXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1pY29uIGJsdWUtc2hldnJvbi1yaWdodCBwdWxsLXJpZ2h0XCI+PC9idXR0b24+XHJcblx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFx0XHJcblx0XHRcdDwvbGk+XHJcblx0XHQ8L3VsPlxyXG5gfSk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9wYW5lbHMvYXJyYXlQYW5lbEJvZHkuY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=