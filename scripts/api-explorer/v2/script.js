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
	
	// Components
	var base = __webpack_require__(3);
	var apiKey = __webpack_require__(4);
	var ajaxService = __webpack_require__(5);
	
	// View Models
	var MenuViewModel = __webpack_require__(6);
	var ParamsViewModel = __webpack_require__(8);
	var MethodsViewModel = __webpack_require__(9);
	var RequestsListViewModel = __webpack_require__(10);
	
	// Modules
	var accordion = __webpack_require__(15);
	var card = __webpack_require__(16);
	var customSelect = __webpack_require__(17);
	
	/**
	 * Main application view-model
	 * @param obj {object} global data object
	 */
	function AppViewModel(obj) {
	  var base = obj || {};
	  self = this;
	  this.apiKey = apiKey;
	
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
	  this.requestsList = new RequestsListViewModel(this.requests, this.selectedParams);
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	 module.exports = ko.bindingHandlers.foreachprop = {
		transformObject: function (obj) {
			var properties = [];
			ko.utils.objectForEach(obj, function (key, value) {
				properties.push({ key: key, value: value });
			});
			return properties;
		},
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			var properties = ko.pureComputed(function () {
				var obj = ko.utils.unwrapObservable(valueAccessor());
				return ko.bindingHandlers.foreachprop.transformObject(obj);
			});
			ko.applyBindingsToNode(element, { foreach: properties }, bindingContext);
			return { controlsDescendantBindings: true };
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

	var apiKey = sessionStorage.getItem('tk-api-key') || "7elxdku9GGG5k8j0Xm8KWdANDgecHMV0"; //API Key
	
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
	  // console.clear();
	  var url = prepareUrl(arr);
	  // console.log(url);
	
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
				global.lastResponse = res.responseJSON;
				resObj.res = res.responseJSON;
			}
	
			// exporting data using observable
			requests.unshift(resObj);
	  });
	};
	
	
	module.exports = sendPrimaryRequest;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var hf = __webpack_require__(7);
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
/* 7 */
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
	


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var self;
	var base;
	var hf = __webpack_require__(7);
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var hf = __webpack_require__(7);
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var jsonHighlight = __webpack_require__(11);
	var self;
	
	var setSlider = __webpack_require__(14);
	
	function RequestsListViewModel(requests, url) {
		this.url = url;
		self = this;
		this.colors = [
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
		this.requests = requests;
		this.isActiveTab = ko.observable(false);
		this.viewModel = ko.observableArray([]);
		this.blocksViewModel = ko.observableArray([]);
		this.clearBtnIsVisible = ko.computed(this._isVisible, this);
		this.requests.subscribe(this.updateModel, this);
	}
	
	
	RequestsListViewModel.prototype.getMore = function (parent, data, event) {
		var groupComponent = this;
		var slider = $(event.currentTarget).parents('.slider');
		var component = $('<section data-bind="component: {name: \'card\', params: params}"></section>');
		ko.applyBindings({
			params: {
				data: parent,
				color: groupComponent.color,
				index: groupComponent.index,
				getMore: groupComponent.getMore,
				url: groupComponent.url
			}
		}, component[0]);
	
		slider.slick('slickAdd', component);
	};
	
	/**
	 * Visibility flag for Clear btn
	 * @returns {boolean}
	 * @private
	 */
	RequestsListViewModel.prototype._isVisible = function () {
		return this.requests().length > 0;
	};
	
	/**
	 * Update Viewmodel of request list
	 * @param arr
	 */
	RequestsListViewModel.prototype.updateModel = function (arr) {
		var self = this;
		
		var newModel = this.requests()
			.map(function (obj) {
				var item =  $.extend({
					color: self.colors[obj.index % self.colors.length],
					active: ko.observable(false),
					resHTML: ko.observable(''),
					blocks: [
						{
							name: 'Events',
							panelType: 'list-group',
							items: ko.observableArray(Object.getProp(obj,'res._embedded.events') || []),
							totalElements: ko.observable(Object.getProp(obj,'res.page.totalElements')||''),
							isActive: ko.observable(false)
						},
						{
							name: 'Page',
							panelType: 'clear',
							items: obj.error || obj.res.page,
							isActive: ko.observable(false)
						}
					]
				}, obj);
				return item;
			});
		self.viewModel(newModel);
		setSlider('.slider');
		setTimeout(function () {
			$('#show-details-0').trigger('click');
		}, 10);
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
	
	RequestsListViewModel.prototype.getStr = function (s, i) {
		var str = s;
		var i1 = i ? i() : '';
		return [
			str,
			i1
		].join('-');
	};
	
	module.exports = RequestsListViewModel;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Worker = __webpack_require__(12); // Json-formatter worker
	
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
			console.log(event);
		};
	
		worker.postMessage(code);
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		return __webpack_require__(13)("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId])\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\texports: {},\n/******/ \t\t\tid: moduleId,\n/******/ \t\t\tloaded: false\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.loaded = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(0);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ function(module, exports, __webpack_require__) {\n\n\t/**\r\n\t * Code format web-worker\r\n\t * @param event\r\n\t */\r\n\t// var highlightJson()\r\n\tvar highlightJson = __webpack_require__(1);\r\n\t\r\n\tonmessage = function(event) {\r\n\t  var code = event.data;\r\n\t  // importScripts('json-parse.js');\r\n\t  var result = highlightJson(code, {expanded: true});\r\n\t  // var result =JSON.stringify(code);\r\n\t  postMessage(result);\r\n\t};\r\n\n\n/***/ },\n/* 1 */\n/***/ function(module, exports) {\n\n\tvar prefix = 'tm-code';\r\n\t\r\n\tvar getExpanderClasses = function (expanded) {\r\n\t\tif (!expanded) {\r\n\t\t\treturn 'expanded collapsed hidden';\r\n\t\t}\r\n\t\treturn 'expanded';\r\n\t};\r\n\t\r\n\tvar encode = function (value) {\r\n\t\treturn ['<span>', value, '</span>'].join('');\r\n\t};\r\n\t\r\n\tvar createElement = function (key, value, type, expanderClasses) {\r\n\t\tvar klass = 'object',\r\n\t\t\topen = '{',\r\n\t\t\tclose = '}';\r\n\t\r\n\t\tif (Array.isArray(value)) {\r\n\t\t\tklass = 'array';\r\n\t\t\topen = '[';\r\n\t\t\tclose = ']';\r\n\t\t}\r\n\t\r\n\t\tif (value === null) {\r\n\t\t\treturn [\r\n\t\t\t\t'<li>',\r\n\t\t\t\t\t'<span class=\"key\">\"', encode(key), '\": </span>',\r\n\t\t\t\t\t'<span class=\"null\">\"', encode(value), '\"</span>',\r\n\t\t\t\t'</li>'\r\n\t\t\t].join('');\r\n\t\t}\r\n\t\r\n\t\tif (type == 'object') {\r\n\t\t\treturn [\r\n\t\t\t\t'<li>',\r\n\t\t\t\t\t'<span class=\"', expanderClasses, '\"></span>',\r\n\t\t\t\t\t'<span class=\"key\">\"', encode(key), '\": </span> ',\r\n\t\t\t\t\t'<span class=\"open\">', open, '</span> ',\r\n\t\t\t\t\t'<ul class=\"', klass, '\">',\r\n\t\t\t\t\t\tjson2html(value, expanderClasses),\r\n\t\t\t\t\t'</ul>',\r\n\t\t\t\t\t'<span class=\"close\">', close, '</span>',\r\n\t\t\t\t'</li>'\r\n\t\t\t].join('');\r\n\t\t}\r\n\t\r\n\t\tif (type == 'number' || type == 'boolean') {\r\n\t\t\treturn [\r\n\t\t\t\t'<li>',\r\n\t\t\t\t\t'<span class=\"key\">\"', encode(key), '\": </span>',\r\n\t\t\t\t\t'<span class=\"', type, '\">', encode(value), '</span>',\r\n\t\t\t\t'</li>'\r\n\t\t\t].join('');\r\n\t\t}\r\n\t\treturn [\r\n\t\t\t'<li>',\r\n\t\t\t\t'<span class=\"key\">\"', encode(key), '\": </span>',\r\n\t\t\t\t'<span class=\"', type, '\">\"', encode(value), '\"</span>',\r\n\t\t\t'</li>'\r\n\t\t].join('');\r\n\t};\r\n\t\r\n\tvar json2html = function (json, expanderClasses) {\r\n\t\tvar html = '';\r\n\t\tfor (var key in json) {\r\n\t\t\tif (!json.hasOwnProperty(key)) {\r\n\t\t\t\tcontinue;\r\n\t\t\t}\r\n\t\r\n\t\t\thtml = [html, createElement(key, json[key], typeof json[key], expanderClasses)].join('');\r\n\t\t}\r\n\t\treturn html;\r\n\t};\r\n\t\r\n\tvar getJsonViewer = function (data, options) {\r\n\t\ttry {\r\n\t\t\treturn [\r\n\t\t\t\t'<ul class=\"', prefix, '-container\">',\r\n\t\t\t\t\tjson2html([JSON.parse(data)], getExpanderClasses(options.expanded)),\r\n\t\t\t\t'</ul>'\r\n\t\t\t].join('');\r\n\t\t} catch (e) {\r\n\t\t\treturn [\r\n\t\t\t\t'<div class=\"', prefix, '-error\" >', e.toString(), ' </div>'\r\n\t\t\t].join('');\r\n\t\t}\r\n\t};\r\n\t\r\n\tmodule.exports = function(data, opt) {\r\n\t\tvar json = '';\r\n\t\tvar options = opt || {expanded: true};\r\n\t\tif (typeof data == 'string') {\r\n\t\t\tjson = data;\r\n\t\t} else if (typeof data == 'object') {\r\n\t\t\tjson = JSON.stringify(data)\r\n\t\t}\r\n\t\treturn getJsonViewer(json, options);\r\n\t};\r\n\n\n/***/ }\n/******/ ]);\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDcxYjEwZDQ0Y2E3MjgwZTExNGEiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9oaWdobGlnaHRKc29uLndvcmtlci5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL2pzb24tcGFyc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFDQUFvQyxlQUFlO0FBQ25EO0FBQ0E7QUFDQTs7Ozs7OztBQ2JBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVc7QUFDWCxhQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF1QjtBQUN2QjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImhpZ2hsaWdodEpzb24ud29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA0NzFiMTBkNDRjYTcyODBlMTE0YVxuICoqLyIsIi8qKlxyXG4gKiBDb2RlIGZvcm1hdCB3ZWItd29ya2VyXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuLy8gdmFyIGhpZ2hsaWdodEpzb24oKVxyXG52YXIgaGlnaGxpZ2h0SnNvbiA9IHJlcXVpcmUoJy4vanNvbi1wYXJzZScpO1xyXG5cclxub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICB2YXIgY29kZSA9IGV2ZW50LmRhdGE7XHJcbiAgLy8gaW1wb3J0U2NyaXB0cygnanNvbi1wYXJzZS5qcycpO1xyXG4gIHZhciByZXN1bHQgPSBoaWdobGlnaHRKc29uKGNvZGUsIHtleHBhbmRlZDogdHJ1ZX0pO1xyXG4gIC8vIHZhciByZXN1bHQgPUpTT04uc3RyaW5naWZ5KGNvZGUpO1xyXG4gIHBvc3RNZXNzYWdlKHJlc3VsdCk7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL2hpZ2hsaWdodEpzb24ud29ya2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHByZWZpeCA9ICd0bS1jb2RlJztcclxuXHJcbnZhciBnZXRFeHBhbmRlckNsYXNzZXMgPSBmdW5jdGlvbiAoZXhwYW5kZWQpIHtcclxuXHRpZiAoIWV4cGFuZGVkKSB7XHJcblx0XHRyZXR1cm4gJ2V4cGFuZGVkIGNvbGxhcHNlZCBoaWRkZW4nO1xyXG5cdH1cclxuXHRyZXR1cm4gJ2V4cGFuZGVkJztcclxufTtcclxuXHJcbnZhciBlbmNvZGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRyZXR1cm4gWyc8c3Bhbj4nLCB2YWx1ZSwgJzwvc3Bhbj4nXS5qb2luKCcnKTtcclxufTtcclxuXHJcbnZhciBjcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUsIHR5cGUsIGV4cGFuZGVyQ2xhc3Nlcykge1xyXG5cdHZhciBrbGFzcyA9ICdvYmplY3QnLFxyXG5cdFx0b3BlbiA9ICd7JyxcclxuXHRcdGNsb3NlID0gJ30nO1xyXG5cclxuXHRpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuXHRcdGtsYXNzID0gJ2FycmF5JztcclxuXHRcdG9wZW4gPSAnWyc7XHJcblx0XHRjbG9zZSA9ICddJztcclxuXHR9XHJcblxyXG5cdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG5cdFx0cmV0dXJuIFtcclxuXHRcdFx0JzxsaT4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cImtleVwiPlwiJywgZW5jb2RlKGtleSksICdcIjogPC9zcGFuPicsXHJcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwibnVsbFwiPlwiJywgZW5jb2RlKHZhbHVlKSwgJ1wiPC9zcGFuPicsXHJcblx0XHRcdCc8L2xpPidcclxuXHRcdF0uam9pbignJyk7XHJcblx0fVxyXG5cclxuXHRpZiAodHlwZSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0cmV0dXJuIFtcclxuXHRcdFx0JzxsaT4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cIicsIGV4cGFuZGVyQ2xhc3NlcywgJ1wiPjwvc3Bhbj4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cImtleVwiPlwiJywgZW5jb2RlKGtleSksICdcIjogPC9zcGFuPiAnLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cIm9wZW5cIj4nLCBvcGVuLCAnPC9zcGFuPiAnLFxyXG5cdFx0XHRcdCc8dWwgY2xhc3M9XCInLCBrbGFzcywgJ1wiPicsXHJcblx0XHRcdFx0XHRqc29uMmh0bWwodmFsdWUsIGV4cGFuZGVyQ2xhc3NlcyksXHJcblx0XHRcdFx0JzwvdWw+JyxcclxuXHRcdFx0XHQnPHNwYW4gY2xhc3M9XCJjbG9zZVwiPicsIGNsb3NlLCAnPC9zcGFuPicsXHJcblx0XHRcdCc8L2xpPidcclxuXHRcdF0uam9pbignJyk7XHJcblx0fVxyXG5cclxuXHRpZiAodHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdib29sZWFuJykge1xyXG5cdFx0cmV0dXJuIFtcclxuXHRcdFx0JzxsaT4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cImtleVwiPlwiJywgZW5jb2RlKGtleSksICdcIjogPC9zcGFuPicsXHJcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwiJywgdHlwZSwgJ1wiPicsIGVuY29kZSh2YWx1ZSksICc8L3NwYW4+JyxcclxuXHRcdFx0JzwvbGk+J1xyXG5cdFx0XS5qb2luKCcnKTtcclxuXHR9XHJcblx0cmV0dXJuIFtcclxuXHRcdCc8bGk+JyxcclxuXHRcdFx0JzxzcGFuIGNsYXNzPVwia2V5XCI+XCInLCBlbmNvZGUoa2V5KSwgJ1wiOiA8L3NwYW4+JyxcclxuXHRcdFx0JzxzcGFuIGNsYXNzPVwiJywgdHlwZSwgJ1wiPlwiJywgZW5jb2RlKHZhbHVlKSwgJ1wiPC9zcGFuPicsXHJcblx0XHQnPC9saT4nXHJcblx0XS5qb2luKCcnKTtcclxufTtcclxuXHJcbnZhciBqc29uMmh0bWwgPSBmdW5jdGlvbiAoanNvbiwgZXhwYW5kZXJDbGFzc2VzKSB7XHJcblx0dmFyIGh0bWwgPSAnJztcclxuXHRmb3IgKHZhciBrZXkgaW4ganNvbikge1xyXG5cdFx0aWYgKCFqc29uLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuXHRcdFx0Y29udGludWU7XHJcblx0XHR9XHJcblxyXG5cdFx0aHRtbCA9IFtodG1sLCBjcmVhdGVFbGVtZW50KGtleSwganNvbltrZXldLCB0eXBlb2YganNvbltrZXldLCBleHBhbmRlckNsYXNzZXMpXS5qb2luKCcnKTtcclxuXHR9XHJcblx0cmV0dXJuIGh0bWw7XHJcbn07XHJcblxyXG52YXIgZ2V0SnNvblZpZXdlciA9IGZ1bmN0aW9uIChkYXRhLCBvcHRpb25zKSB7XHJcblx0dHJ5IHtcclxuXHRcdHJldHVybiBbXHJcblx0XHRcdCc8dWwgY2xhc3M9XCInLCBwcmVmaXgsICctY29udGFpbmVyXCI+JyxcclxuXHRcdFx0XHRqc29uMmh0bWwoW0pTT04ucGFyc2UoZGF0YSldLCBnZXRFeHBhbmRlckNsYXNzZXMob3B0aW9ucy5leHBhbmRlZCkpLFxyXG5cdFx0XHQnPC91bD4nXHJcblx0XHRdLmpvaW4oJycpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJldHVybiBbXHJcblx0XHRcdCc8ZGl2IGNsYXNzPVwiJywgcHJlZml4LCAnLWVycm9yXCIgPicsIGUudG9TdHJpbmcoKSwgJyA8L2Rpdj4nXHJcblx0XHRdLmpvaW4oJycpO1xyXG5cdH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSwgb3B0KSB7XHJcblx0dmFyIGpzb24gPSAnJztcclxuXHR2YXIgb3B0aW9ucyA9IG9wdCB8fCB7ZXhwYW5kZWQ6IHRydWV9O1xyXG5cdGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykge1xyXG5cdFx0anNvbiA9IGRhdGE7XHJcblx0fSBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0anNvbiA9IEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcblx0fVxyXG5cdHJldHVybiBnZXRKc29uVmlld2VyKGpzb24sIG9wdGlvbnMpO1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9qc29uLXBhcnNlLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==", __webpack_require__.p + "highlightJson.worker.js");
	};

/***/ },
/* 13 */
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
/* 14 */
/***/ function(module, exports) {

	module.exports = function (selector) {
		"use strict";
	``
		$(selector).slick({
			dots: false,
			infinite: false,
			speed: 300,
			slidesToShow: 3,
			slidesToScroll: 1,
			variableWidth: true,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						variableWidth: true,
						slidesToShow: 2,
						slidesToScroll: 1,
						infinite: false,
						dots: false
					}
				},
				{
					breakpoint: 678,
					settings: {
						variableWidth: true,
						slidesToShow: 2,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 480,
					settings: {
						centerMode: true,
						variableWidth: true,
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		});
		// $(selector).find('button.slick-prev').trigger('click');
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	function cardGroupComponent(params) {
		self = this;
		this.url = params.url;
		this.panelType = params.panelType || 'clear'; // list,
		this.getMore = params.getMore || false;
		this.color = params.color;
		this.index = params.index;
		this.sections = ko.observable(params.data || []);
	}
	
	cardGroupComponent.prototype.getStr = function (s, i) {
		var str = s;
		var i0 = this.index;
		var i1 = i ? i() : '';
		return [
			str,
			i0,
			i1
		].join('');
	};
	
	cardGroupComponent.prototype.setActive = function () {
		this.isActive(!this.isActive());
	};
	
	cardGroupComponent.prototype.getPrevPage = function () {
		var pageParam = self.url().find(function (item) {
			return item.name === 'page';
		});
		var val = +pageParam.value();
		pageParam.value(val > 0? val - 1: 0);
		$('#api-exp-get-btn').trigger('click');
	};
	
	cardGroupComponent.prototype.getNextPage = function (vm, event) {
		var pageParam = self.url().find(function (item) {
			return item.name === 'page';
		});
		var val = +pageParam.value();
		pageParam.value(val < this.items.totalPages - 1 ? val  + 1: val);
		$('#api-exp-get-btn').trigger('click');
	};
	
	module.exports = ko.components.register('cardGroup', {
		viewModel: cardGroupComponent,
		template:
		`<section data-bind="foreach: sections" class="panel-group">
				<section data-bind="css: {active: isActive}" class="panel panel-primary">
				
					<!--panel-heading-->
					<div data-bind="css: $component.color, attr: {id: $component.getStr('heading', $index)}"
							class="panel-heading"
							role="tab">
						<div class="panel-title">
							<button class="btn btn-icon"
											data-bind="click: $component.setActive, attr: {'data-target': $component.getStr('#collapse', $index), 'aria-controls': $component.getStr('collapse', $index)}"
											type="button"
											data-toggle="collapse"
											aria-expanded="true">
								<span data-bind="css: {down: isActive}" class="btn btn-icon shevron white-shevron-up"></span>
								<span class="title" data-bind="text: name">Title</span>
							</button>				
							<span data-bind="if: panelType === 'list-group'">						
								<span data-bind="text: totalElements" class="counter"></span>
							</span>
							<!--pager-->
							<span data-bind="if: name === 'Page'" >
								<span class="navigation-wrapper">
									<button data-bind="click: $component.getPrevPage, enable: !!+items.number" type="button" class="navigation prev"></button>
									<button  data-bind="click: $component.getNextPage, enable: +items.number < +items.totalPages - 1" type="button" class="navigation next"></button>
								</span>
							</span>
						</div>
					</div><!--panel-heading-->
					
					<!--panel-body-->
					<div data-bind="attr: {id: $component.getStr('collapse', $index), 'aria-labelledby': $component.getStr('heading', $index)}"
						class="panel-collapse collapse"
						role="tabpanel">
						<div class="panel-body">
						  
							<!--list-group-->
							<div data-bind="if: panelType && panelType === 'list-group'">
								<ul data-bind="foreach: items" class="list-group">
									<li class="list-group-item">
										<span data-bind="text: name" class="name truncate">event name</span>
										<div class="additional-info">
											<p data-bind="text: Object.getProp($data, 'dates.start.localDate')" class="date">event date</p>
											<span data-bind="if: Object.getProp($data, '_embedded.venues[0].name')">
												<p data-bind="text: Object.getProp($data, '_embedded.venues[0].name')" class="venue">event venue</p>
											</span>
										</div>
										<button data-bind="click: $component.getMore.bind($component, $data)" type="button" class="btn btn-icon blue-shevron-right"></button>
									</li>
								</ul>
							</div>
							
							<!--clear-->
							<div data-bind="if: panelType === 'clear'">
								<div data-bind="foreachprop: items" class="clear">
									<p>
										<b class="key">
											<span data-bind="text: key"></span>:&nbsp;
										</b>
										<span data-bind="text: value" class="value"></span>
									</p>
								</div>
							</div>
						</div><!--panel-body-->
						
					</div>
				</section>
		</section>`
	});


/***/ },
/* 16 */
/***/ function(module, exports) {

	function cardComponent(params) {
		self = this;
	
		this.getMore = params.getMore || false;
		this.color = params.color;
		this.index = params.index;
		var data = params.data || [];
	
		this.viewModel = ko.observableArray([
			{
				sectionTitle: 'Event',
				isActive: ko.observable(false),
				items: {}
			},
			{
				sectionTitle: 'Price Ranges',
				isActive: ko. observable(false),
				items: {}
			},
			{
				sectionTitle: 'Promoter',
				isActive: ko. observable(false),
				items: {}
			},
			{
				sectionTitle: 'Dates',
				isActive: ko. observable(false),
				items: {}
			},
			{
				sectionTitle: 'Sales',
				isActive: ko. observable(false),
				items: {}
			},
			{
				sectionTitle: 'Images',
				isActive: ko. observable(false),
				items: {}
			},
			{
				sectionTitle: 'Venues',
				isActive: ko. observable(false),
				items: {}
			},
			{
				sectionTitle: 'Attractions',
				isActive: ko. observable(false),
				items: {}
			},
			{
				sectionTitle: 'Classifications',
				isActive: ko. observable(false),
				items: {}
			}
		]);
	
		for (var prop in data) {
			if (!data.hasOwnProperty(prop)) continue;
			if (typeof data[prop] !== 'object') {
				this.viewModel()[0].items[prop] = data[prop];
			}
		}
	  //
		// console.log(this.viewModel());
	  //
	  //
		// this.viewModel(this.viewModel().map(function (item) {
		// 	return item.isArray = it
		// }));
	
	}
	
	
	/*
	 */
	
	cardComponent.prototype.getStr = function () {
		var args = Array.prototype.slice.call(arguments);
		return args.join('-');
	};
	
	cardComponent.prototype.setActive = function () {
		this.isActive(!this.isActive());
	};
	
	module.exports = ko.components.register('card', {
		viewModel: cardComponent,
		template:
		`<section data-bind="foreach: viewModel" class="panel-group">
				<section data-bind="css: {active: isActive}" class="panel panel-primary">
				
					<!--panel-heading-->
					<div data-bind="css: $component.color, attr: {id: $component.getStr('heading', $component.index, $index())}"
							class="panel-heading"
							role="tab">
						<div class="panel-title">
							<button class="btn btn-icon"
											data-bind="click: $component.setActive, attr: {'data-target': $component.getStr('#collapse',  $component.index, $index()), 'aria-controls': $component.getStr('collapse',  $component.index, $index())}"
											type="button"
											data-toggle="collapse"
											aria-expanded="true">
								<span data-bind="css: {down: isActive}" class="btn btn-icon shevron white-shevron-up"></span>
								<span class="title" data-bind="text: sectionTitle">Title</span>
							</button>
						</div>
					</div><!--panel-heading-->
					
					<!--panel-body-->
					<div data-bind="attr: {id: $component.getStr('collapse', $component.index, $index()), 'aria-labelledby': $component.getStr('heading',  $component.index, $index())}"
						class="panel-collapse collapse"
						role="tabpanel">
						<div class="panel-body">
						
							<!--primitives-->
							<span data-bind="if: sectionTitle === 'Event'">
								<div data-bind="foreachprop: items" class="clear">
									<p>
										<b class="key">
											<span data-bind="text: key"></span>:&nbsp;
										</b>
										<span data-bind="text: value" class="value"></span>
									</p>
								</div>
							</span>
							
							<!--&lt;!&ndash;object&ndash;&gt;-->
							<!--<span data-bind="if: name === 'Price Ranges"">-->
								<!--&lt;!&ndash;clear&ndash;&gt;-->
								<!--<div data-bind="foreach: items" class="clear">-->
									<!--<p>-->
										<!--<p>$data</p>-->
										<!--&lt;!&ndash;<span data-bind="text: value" class="value"></span>&ndash;&gt;-->
									<!--</p>-->
								<!--</div>-->
							<!--</span>-->
						</div><!--panel-body-->
						
					</div>
				</section>
		</section>`
	});


/***/ },
/* 17 */
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


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDQyZGI5YzI3MTgxOGE3M2ZmZGEiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9tYWluLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2N1c3RvbUJpbmRpbmdzL2ZvcmVhY2hQcm9wLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL2FwaWtleS5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL2FqYXhTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL1ZpZXdNb2RlbHMvbWVudVZpZXdNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL2hlbHBlckZ1bmMuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9wYXJhbXNWaWV3TW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9tZXRob2RzVmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL1ZpZXdNb2RlbHMvcmVxdWVzdHNMaXN0Vmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvanNvbi1oaWdobGlnaHQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9oaWdobGlnaHRKc29uLndvcmtlci5qcyIsIndlYnBhY2s6Ly8vRDovdGlja2V0bWFzdGVyLWFwaS1zdGFnaW5nLmdpdGh1Yi5pby9+L3dvcmtlci1sb2FkZXIvY3JlYXRlSW5saW5lV29ya2VyLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvc2xpZGVyLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvYWNjb3JkaW9uLmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL2NhcmQuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvY3VzdG9tU2VsZWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtB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QUFDQTtBQUNBLEVBQUMiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAwNDJkYjljMjcxODE4YTczZmZkYVxuICoqLyIsIi8qKlxuICogTWFpbiBmaWxlIGZvciBBcGkgRXhwbHJlciB2Mi4wXG4gKiBGb3IgZGV2ZWxvcG1lbnQgcGxlYXNlIHVzZSBXZWJwYWNrIHRvIGJ1bmRsZSBhbGwgbW9kdWxlc1xuICogSXQgY2FuIGJlIG1hZGUgdXNpbmcgbnBtIHNjcmlwdHMgY21kIC0gJ3dlYnBhY2snXG4gKi9cbi8vIGN1c3RvbSBiaW5kaW5nc1xucmVxdWlyZSgnLi4vY3VzdG9tQmluZGluZ3MvZm9yZWFjaFByb3AnKTtcblxuLy8gQ29tcG9uZW50c1xudmFyIGJhc2UgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2Jhc2UnKTtcbnZhciBhcGlLZXkgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2FwaWtleScpO1xudmFyIGFqYXhTZXJ2aWNlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9hamF4U2VydmljZScpO1xuXG4vLyBWaWV3IE1vZGVsc1xudmFyIE1lbnVWaWV3TW9kZWwgPSByZXF1aXJlKCcuLi9WaWV3TW9kZWxzL21lbnVWaWV3TW9kZWwnKTtcbnZhciBQYXJhbXNWaWV3TW9kZWwgPSByZXF1aXJlKCcuL3BhcmFtc1ZpZXdNb2RlbCcpO1xudmFyIE1ldGhvZHNWaWV3TW9kZWwgPSByZXF1aXJlKCcuL21ldGhvZHNWaWV3TW9kZWwnKTtcbnZhciBSZXF1ZXN0c0xpc3RWaWV3TW9kZWwgPSByZXF1aXJlKCcuL3JlcXVlc3RzTGlzdFZpZXdNb2RlbCcpO1xuXG4vLyBNb2R1bGVzXG52YXIgYWNjb3JkaW9uID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9hY2NvcmRpb24uY29tcG9uZW50Jyk7XG52YXIgY2FyZCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvY2FyZC5jb21wb25lbnQnKTtcbnZhciBjdXN0b21TZWxlY3QgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2N1c3RvbVNlbGVjdCcpO1xuXG4vKipcbiAqIE1haW4gYXBwbGljYXRpb24gdmlldy1tb2RlbFxuICogQHBhcmFtIG9iaiB7b2JqZWN0fSBnbG9iYWwgZGF0YSBvYmplY3RcbiAqL1xuZnVuY3Rpb24gQXBwVmlld01vZGVsKG9iaikge1xuICB2YXIgYmFzZSA9IG9iaiB8fCB7fTtcbiAgc2VsZiA9IHRoaXM7XG4gIHRoaXMuYXBpS2V5ID0gYXBpS2V5O1xuXG4gIC8vIG9ic2VydmFibGVzXG4gIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSA9IGtvLm9ic2VydmFibGUoJycpO1xuICB0aGlzLnNlbGVjdGVkTWV0aG9kID0ga28ub2JzZXJ2YWJsZSgnJyk7XG4gIHRoaXMuc2VsZWN0ZWRQYXJhbXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xuXHR0aGlzLnJlcXVlc3RzID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcblxuXHQvLyBjb21wdXRlZFxuICB0aGlzLlVSTCA9IGtvLmNvbXB1dGVkKHRoaXMuZ2V0VXJsLCB0aGlzKTtcbiAgdGhpcy5zZW5kQnV0dG9uVGV4dCA9IGtvLnB1cmVDb21wdXRlZCh0aGlzLmdldE1ldGhvZE5hbWUsIHRoaXMpO1xuXG4gIC8vIHN1Yi1tb2RlbHNcbiAgdGhpcy5tZW51ID0gbmV3IE1lbnVWaWV3TW9kZWwoYmFzZSwgdGhpcy5zZWxlY3RlZENhdGVnb3J5KTtcbiAgdGhpcy5tZXRob2RzID0gbmV3IE1ldGhvZHNWaWV3TW9kZWwoYmFzZSwgdGhpcy5zZWxlY3RlZENhdGVnb3J5LCB0aGlzLnNlbGVjdGVkTWV0aG9kKTtcbiAgdGhpcy5wYXJhbXMgPSBuZXcgUGFyYW1zVmlld01vZGVsKGJhc2UsIHRoaXMuc2VsZWN0ZWRNZXRob2QsIHRoaXMuc2VsZWN0ZWRQYXJhbXMpO1xuICB0aGlzLnJlcXVlc3RzTGlzdCA9IG5ldyBSZXF1ZXN0c0xpc3RWaWV3TW9kZWwodGhpcy5yZXF1ZXN0cywgdGhpcy5zZWxlY3RlZFBhcmFtcyk7XG59XG5cbi8qKlxuICogU2VuZCByZXF1ZXN0IG1ldGhvZFxuICovXG5BcHBWaWV3TW9kZWwucHJvdG90eXBlLm9uQ2xpY2tTZW5kQnRuID0gZnVuY3Rpb24gKCkge1xuICBhamF4U2VydmljZSh0aGlzLlVSTCgpLCB0aGlzLnJlcXVlc3RzLCBiYXNlKTtcbn07XG5cbi8qKlxuICogR2V0cyBjdXJyZW50IG1ldGhvZCBuYW1lXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5BcHBWaWV3TW9kZWwucHJvdG90eXBlLmdldE1ldGhvZE5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnNlbGVjdGVkTWV0aG9kKCkubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG59O1xuXG4vKipcbiAqIEdldHMgcmF3IHVybCBkYXRhIGFycmF5XG4gKiBAcmV0dXJucyB7KltdfVxuICovXG5BcHBWaWV3TW9kZWwucHJvdG90eXBlLmdldFVybCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIFtcbiAgICB0aGlzLnNlbGVjdGVkTWV0aG9kKCksXG4gICAgdGhpcy5hcGlLZXksXG4gICAgdGhpcy5zZWxlY3RlZFBhcmFtcygpXG4gIF07XG59O1xuXG4vKipcbiAqIEdldHMgZGVlcCBwcm9wXG4gKiBAcmV0dXJucyB7KltdfVxuICovXG5PYmplY3QuZ2V0UHJvcCA9IGZ1bmN0aW9uKG8sIHMpIHtcblx0aWYgKHR5cGVvZiBvICE9PSAnb2JqZWN0JyB8fCAhcykge1xuXHRcdGNvbnNvbGUubG9nKG8scyk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHMgPSBzLnJlcGxhY2UoL1xcWyhcXHcrKVxcXS9nLCAnLiQxJyk7IC8vIGNvbnZlcnQgaW5kZXhlcyB0byBwcm9wZXJ0aWVzXG5cdHMgPSBzLnJlcGxhY2UoL15cXC4vLCAnJyk7ICAgICAgICAgICAvLyBzdHJpcCBhIGxlYWRpbmcgZG90XG5cdHZhciBhID0gcy5zcGxpdCgnLicpO1xuXHRmb3IgKHZhciBpID0gMCwgbiA9IGEubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG5cdFx0dmFyIGsgPSBhW2ldO1xuXHRcdGlmIChrIGluIG8pIHtcblx0XHRcdG8gPSBvW2tdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG5cdHJldHVybiBvO1xufTtcblxuLyoqXG4gKiBBY3RpdmF0ZXMga25vY2tvdXQuanNcbiAqL1xua28uYXBwbHlCaW5kaW5ncyhuZXcgQXBwVmlld01vZGVsKGJhc2UpKTtcblxuLyoqXG4gKiBleHBvcnRzIGdsb2JhbCB2YXJpYWJsZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2U7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9tYWluLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiIG1vZHVsZS5leHBvcnRzID0ga28uYmluZGluZ0hhbmRsZXJzLmZvcmVhY2hwcm9wID0ge1xyXG5cdHRyYW5zZm9ybU9iamVjdDogZnVuY3Rpb24gKG9iaikge1xyXG5cdFx0dmFyIHByb3BlcnRpZXMgPSBbXTtcclxuXHRcdGtvLnV0aWxzLm9iamVjdEZvckVhY2gob2JqLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG5cdFx0XHRwcm9wZXJ0aWVzLnB1c2goeyBrZXk6IGtleSwgdmFsdWU6IHZhbHVlIH0pO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gcHJvcGVydGllcztcclxuXHR9LFxyXG5cdGluaXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IsIGFsbEJpbmRpbmdzQWNjZXNzb3IsIHZpZXdNb2RlbCwgYmluZGluZ0NvbnRleHQpIHtcclxuXHRcdHZhciBwcm9wZXJ0aWVzID0ga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIG9iaiA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUodmFsdWVBY2Nlc3NvcigpKTtcclxuXHRcdFx0cmV0dXJuIGtvLmJpbmRpbmdIYW5kbGVycy5mb3JlYWNocHJvcC50cmFuc2Zvcm1PYmplY3Qob2JqKTtcclxuXHRcdH0pO1xyXG5cdFx0a28uYXBwbHlCaW5kaW5nc1RvTm9kZShlbGVtZW50LCB7IGZvcmVhY2g6IHByb3BlcnRpZXMgfSwgYmluZGluZ0NvbnRleHQpO1xyXG5cdFx0cmV0dXJuIHsgY29udHJvbHNEZXNjZW5kYW50QmluZGluZ3M6IHRydWUgfTtcclxuXHR9XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jdXN0b21CaW5kaW5ncy9mb3JlYWNoUHJvcC5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiYXNlID0ge307XHJcbnZhciBDT05GSUdfVVJMID0gJy4uLy4uL2FwaWRlc2NyaXB0aW9uLnhtbCc7XHJcblxyXG52YXIgcGFyc2VEYXRhID0gZnVuY3Rpb24gKHhtbCkge1xyXG5cdHZhciBnbG9iYWwgPSB7fTtcclxuXHQvL2dldCBhbGwgQVBJc1xyXG5cdHZhciByZXNvdXJjZXNFbCA9ICQoeG1sKS5maW5kKFwicmVzb3VyY2VzXCIpLmVxKDApO1xyXG5cclxuXHQvLyByZXNvdXJjZVxyXG5cdCQoeG1sKVxyXG5cdFx0LmZpbmQoXCJyZXNvdXJjZVwiKVxyXG5cdFx0LmdldCgpXHJcblx0XHQubWFwKGZ1bmN0aW9uIChyZXMpIHtcclxuXHRcdFx0dmFyIHJlc291cmNlID0gJChyZXMpO1xyXG5cdFx0XHQvLyBtZXRob2QgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0dmFyIG1ldGhvZEVsZW0gPSByZXNvdXJjZS5maW5kKFwibWV0aG9kXCIpLmVxKDApO1xyXG5cclxuXHRcdFx0dmFyIG1ldGhvZCA9IHtcclxuXHRcdFx0XHRpZCA6IG1ldGhvZEVsZW0uYXR0cihcImlkXCIpLCAvLyBtZXRob2QgaWRcclxuXHRcdFx0XHRuYW1lIDogbWV0aG9kRWxlbS5hdHRyKFwiYXBpZ2VlOmRpc3BsYXlOYW1lXCIpIHx8IG1ldGhvZEVsZW0uYXR0cihcImlkXCIpLCAvLyBtZXRob2QgbmFtZVxyXG5cdFx0XHRcdG1ldGhvZCA6IG1ldGhvZEVsZW0uYXR0cignbmFtZScpLCAvLyBHRVQgb3IgUE9TVFxyXG5cdFx0XHRcdGNhdGVnb3J5IDogbWV0aG9kRWxlbS5maW5kKCdbcHJpbWFyeT1cInRydWVcIl0nKS50ZXh0KCkudHJpbSgpLCAvLyBBUEkgbmFtZVxyXG5cdFx0XHRcdHBhdGg6IHJlc291cmNlLmF0dHIoJ3BhdGgnKSwgLy8gbWV0aG9kIFVSTFxyXG5cdFx0XHRcdGJhc2UgOiByZXNvdXJjZXNFbC5hdHRyKCdiYXNlJyksIC8vIG1ldGhvZCBiYXNlIGxpbmtcclxuXHRcdFx0XHRsaW5rIDogbWV0aG9kRWxlbS5maW5kKCdkb2MnKS5lcSgwKS5hdHRyKCdhcGlnZWU6dXJsJyksIC8vIGxpbmsgdG8gZG9jdW1lbnRhdGlvblxyXG5cdFx0XHRcdGRlc2NyaXB0aW9uIDogbWV0aG9kRWxlbS5maW5kKCdkb2MnKS5lcSgwKS50ZXh0KCkudHJpbSgpLCAvL21ldGhvZCBkZXNjcmlwdGlvblxyXG5cdFx0XHRcdHBhcmFtZXRlcnM6IHt9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQvLyBwYXJhbXMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0cmVzb3VyY2VcclxuXHRcdFx0XHQuZmluZCgncGFyYW0nKVxyXG5cdFx0XHRcdC5nZXQoKVxyXG5cdFx0XHRcdC5tYXAoZnVuY3Rpb24gKHBhcikge1xyXG5cdFx0XHRcdFx0dmFyIHBhcmFtID0gJChwYXIpO1xyXG5cdFx0XHRcdFx0dmFyIG9wdGlvbnMgPSBwYXJhbS5maW5kKCdvcHRpb24nKTtcclxuXHRcdFx0XHRcdHZhciBpc1NlbGVjdCA9ICEhb3B0aW9ucy5sZW5ndGg7XHJcblxyXG5cdFx0XHRcdFx0dmFyIHBhcmFtZXRlciA9IHtcclxuXHRcdFx0XHRcdFx0bmFtZTogcGFyYW0uYXR0cignbmFtZScpLFxyXG5cdFx0XHRcdFx0XHRkb2M6IHBhcmFtLmZpcnN0KCdkb2MnKS50ZXh0KCkudHJpbSgpLFxyXG5cdFx0XHRcdFx0XHRzdHlsZTogcGFyYW0uYXR0cignc3R5bGUnKSxcclxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ6IHBhcmFtLmF0dHIoJ3JlcXVpcmVkJyksXHJcblx0XHRcdFx0XHRcdGRlZmF1bHQ6IHBhcmFtLmF0dHIoJ2RlZmF1bHQnKSA9PT0gJ25vbmUnICYmIGlzU2VsZWN0ID8gJycgOiBwYXJhbS5hdHRyKCdkZWZhdWx0JyksXHJcblx0XHRcdFx0XHRcdHNlbGVjdDogaXNTZWxlY3RcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0aWYgKGlzU2VsZWN0KSB7XHJcblx0XHRcdFx0XHRcdHBhcmFtZXRlci5vcHRpb25zID0gb3B0aW9ucy5nZXQoKS5tYXAoZnVuY3Rpb24gKG9wdGlvbikge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRcdFx0XHRuYW1lOiAkKG9wdGlvbikuYXR0cigndmFsdWUnKSxcclxuXHRcdFx0XHRcdFx0XHRcdGNoZWNrZWQ6ICQob3B0aW9uKS5hdHRyKCd2YWx1ZScpID09PSBwYXJhbWV0ZXIuZGVmYXVsdCB8fCAkKG9wdGlvbikuYXR0cigndmFsdWUnKSA9PT0gJ25vbmUnLFxyXG5cdFx0XHRcdFx0XHRcdFx0bGluazogZmFsc2VcclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRtZXRob2QucGFyYW1ldGVyc1twYXJhbWV0ZXIubmFtZV0gPSBwYXJhbWV0ZXI7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvKipcclxuXHRcdFx0ICogR2xvYmFsIG9iaiBjb21wb3NpdGlvblxyXG4gICAgICAgKi9cclxuXHRcdFx0Ly8gc2V0IGNhdGVnb3J5IG9ialxyXG5cdFx0XHRnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XSA9IGdsb2JhbFttZXRob2QuY2F0ZWdvcnldIHx8IHt9O1xyXG5cclxuXHRcdFx0Ly8gc2V0IG1ldGhvZHMgdHlwZSBvYmpcclxuXHRcdFx0Z2xvYmFsW21ldGhvZC5jYXRlZ29yeV0uQUxMID0gZ2xvYmFsW21ldGhvZC5jYXRlZ29yeV0uQUxMIHx8IHt9O1xyXG5cdFx0XHRnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XVttZXRob2QubWV0aG9kXSA9IGdsb2JhbFttZXRob2QuY2F0ZWdvcnldW21ldGhvZC5tZXRob2RdIHx8IHt9O1xyXG5cclxuXHRcdFx0Ly8gc2V0IG1ldGhvZCBvYmpcclxuXHRcdFx0Z2xvYmFsW21ldGhvZC5jYXRlZ29yeV0uQUxMW21ldGhvZC5pZF0gPSBtZXRob2Q7XHJcblx0XHRcdGdsb2JhbFttZXRob2QuY2F0ZWdvcnldW21ldGhvZC5tZXRob2RdW21ldGhvZC5pZF0gPSBtZXRob2Q7XHJcblx0XHR9KTtcclxuXHJcblx0cmV0dXJuIGdsb2JhbDtcclxufTtcclxuXHJcbi8vZ2V0cyBkb2N1bWVudCBmcm9tIFdBREwgY29uZmlndXJhdGlvbiBmaWxlXHJcbnZhciByZWFkRnJvbVdBREwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgJC5hamF4KHtcclxuICAgIHVybDogQ09ORklHX1VSTCxcclxuICAgIGFzeW5jIDogZmFsc2UsXHJcbiAgICBkYXRhVHlwZTogKCQuYnJvd3Nlci5tc2llKSA/IFwidGV4dFwiIDogXCJ4bWxcIixcclxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgIHZhciB4bWw7XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHJlc3BvbnNlID09IFwic3RyaW5nXCIpe1xyXG4gICAgICAgIHhtbCA9IG5ldyBBY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTERPTVwiKTtcclxuICAgICAgICB4bWwuYXN5bmMgPSBmYWxzZTtcclxuICAgICAgICB4bWwubG9hZFhNTChyZXNwb25zZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgeG1sID0gcmVzcG9uc2U7XHJcbiAgICAgIH1cclxuXHJcblx0XHRcdGJhc2UgPSBwYXJzZURhdGEoeG1sKTtcclxuICAgIH0sXHJcblxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uKFhNTEh0dHBSZXF1ZXN0LCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bil7XHJcbiAgICAgIGFsZXJ0KCdEYXRhIENvdWxkIE5vdCBCZSBMb2FkZWQgLSAnKyB0ZXh0U3RhdHVzKTtcclxuICAgIH1cclxuICB9KTtcclxufTtcclxucmVhZEZyb21XQURMKCk7XHJcbm1vZHVsZS5leHBvcnRzID0gYmFzZTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvYmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhcGlLZXkgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd0ay1hcGkta2V5JykgfHwgXCI3ZWx4ZGt1OUdHRzVrOGowWG04S1dkQU5EZ2VjSE1WMFwiOyAvL0FQSSBLZXlcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIG5hbWU6ICdhcGlrZXknLFxyXG4gIHN0eWxlOiAncXVlcnknLFxyXG4gIHZhbHVlOiBrby5vYnNlcnZhYmxlKGFwaUtleSlcclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9hcGlrZXkuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcclxuICogQWpheCBTZXJ2aWNlXHJcbiAqIEBwYXJhbSB1cmxcclxuICogQHBhcmFtIG1ldGhvZFxyXG4gKiBAcGFyYW0gY2FsbGJhY2tcclxuICovXHJcbnZhciBhamF4U2VydmljZSA9IGZ1bmN0aW9uICh1cmwsIG1ldGhvZCwgY2FsbGJhY2spIHtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogbWV0aG9kLFxyXG4gICAgdXJsOiB1cmwsXHJcbiAgICBhc3luYzogdHJ1ZSxcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIGNvbXBsZXRlOiBjYWxsYmFja1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpbHRlcnMgYW5kIHByZXBhcmVzIHBhcmFtcyBwYWlyc1xyXG4gKiBAcGFyYW0gYXJyXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxudmFyIHByZXBhcmVVcmwgPSBmdW5jdGlvbiAoYXJyKSB7XHJcbiAgdmFyIHJlcGxhY2VtZW50LCB1cmwsIGRvbWFpbiwgcGF0aCwgbWV0aG9kLCBhcGlLZXksIHBhcmFtcztcclxuXHJcbiAgaWYgKCFhcnIgJiYgIWFyci5sZW5ndGgpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgXHJcbiAgZG9tYWluID0gYXJyWzBdLmJhc2U7XHJcbiAgcGF0aCA9IGFyclswXS5wYXRoO1xyXG4gIGFwaUtleSA9IGFyclsxXTtcclxuICBwYXJhbXMgPSBhcnJbMl0uZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICByZXR1cm4gaXRlbS5zdHlsZSA9PT0gJ3F1ZXJ5JztcclxuICB9KTtcclxuXHJcbiAgLy8gYXJyIG9mIHRlbXBsYXRlIG1hcmtzXHJcbiAgcmVwbGFjZW1lbnQgPSBwYXRoLm1hdGNoKC8oW157XSo/KVxcdyg/PVxcfSkvZ21pKTtcclxuXHJcbiAgLy8gYXJyIG9mIHRlbXBsYXRlIHBhcmFtc1xyXG4gIHZhciB0ZW1wbGF0ZXNBcnIgPSBhcnJbMl0uZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICByZXR1cm4gaXRlbS5zdHlsZSA9PT0gJ3RlbXBsYXRlJztcclxuICB9KTtcclxuXHJcbiAgLy8gcmVwbGFjZW1lbnRcclxuICByZXBsYWNlbWVudC5mb3JFYWNoKGZ1bmN0aW9uICh2YWwpIHtcclxuICAgIHZhciBwYXJhbSA9IHRlbXBsYXRlc0Fyci5maW5kKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgIHJldHVybiBpdGVtLm5hbWUgPT09IHZhbDtcclxuICAgIH0pO1xyXG4gICAgcGF0aCA9IHBhdGgucmVwbGFjZSgneycrIHBhcmFtLm5hbWUgKyAnfScsIHBhcmFtLnZhbHVlKCkgfHwgcGFyYW0uZGVmYXVsdCk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIGFkZHMgYXBpS2V5IHBhcmFtXHJcbiAgaWYgKCFwYXJhbXNbMF0gfHwgcGFyYW1zWzBdLm5hbWUgIT09ICdhcGlrZXknKSB7XHJcbiAgICBwYXJhbXMudW5zaGlmdChhcGlLZXkpO1xyXG4gIH1cclxuXHJcbiAgLy8gcHJlcGFyZXMgcGFyYW1zIHBhcnQgb2YgdXJsXHJcbiAgcGFyYW1zID0gcGFyYW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICByZXR1cm4gW2l0ZW0ubmFtZSwgaXRlbS52YWx1ZSgpIHx8IGl0ZW0uZGVmYXVsdF0uam9pbignPScpO1xyXG4gICAgfSkuam9pbignJicpO1xyXG5cclxuICB1cmwgPSBbZG9tYWluLCAnLycsIHBhdGgsICc/JywgcGFyYW1zXS5qb2luKCcnKTtcclxuXHJcbiAgcmV0dXJuIGVuY29kZVVSSSh1cmwpO1xyXG59O1xyXG5cclxuLy8gc2VuZHMgcmVxdWVzdCB0byBnZXQgdGhlIHNlY29uZCBjb2x1bW5cclxudmFyIHNlbmRQcmltYXJ5UmVxdWVzdCA9IGZ1bmN0aW9uIChhcnIsIHJlcXVlc3RzLCBnbG9iYWwpIHtcclxuICAvLyBjb25zb2xlLmNsZWFyKCk7XHJcbiAgdmFyIHVybCA9IHByZXBhcmVVcmwoYXJyKTtcclxuICAvLyBjb25zb2xlLmxvZyh1cmwpO1xyXG5cclxuICBhamF4U2VydmljZSh1cmwsIGFyclswXS5tZXRob2QsIGZ1bmN0aW9uKHJlcywgbXNnKSB7XHJcblx0XHR2YXIgcmVzT2JqID0ge1xyXG5cdFx0XHRyZXE6IHVybCxcclxuXHRcdFx0aW5kZXg6IHJlcXVlc3RzKCkubGVuZ3RoXHJcblx0XHR9O1xyXG5cclxuXHRcdGlmIChtc2cgPT0gJ2Vycm9yJykge1xyXG5cdFx0XHR2YXIgZXJyID0gcmVzICYmXHJcblx0XHRcdFx0cmVzLnJlc3BvbnNlSlNPTiAmJlxyXG5cdFx0XHRcdHJlcy5yZXNwb25zZUpTT04uZXJyb3JzICYmXHJcblx0XHRcdFx0cmVzLnJlc3BvbnNlSlNPTi5lcnJvcnNbMF07XHJcblxyXG5cdFx0XHRyZXNPYmouZXJyb3IgPSB7XHJcblx0XHRcdFx0Y29kZTogZXJyID8gZXJyLmNvZGU6IDUwMCxcclxuXHRcdFx0XHRtZXNzYWdlOiBlcnIgPyBlcnIuZGV0YWlsOiAnTm8gcmVzcG9uY2UgZGF0YSEnXHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGdsb2JhbC5sYXN0UmVzcG9uc2UgPSByZXMucmVzcG9uc2VKU09OO1xyXG5cdFx0XHRyZXNPYmoucmVzID0gcmVzLnJlc3BvbnNlSlNPTjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBleHBvcnRpbmcgZGF0YSB1c2luZyBvYnNlcnZhYmxlXHJcblx0XHRyZXF1ZXN0cy51bnNoaWZ0KHJlc09iaik7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBzZW5kUHJpbWFyeVJlcXVlc3Q7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL2FqYXhTZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGhmID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9oZWxwZXJGdW5jJyk7XG52YXIgc2VsZjtcblxuXG4vKipcbiAqIE1lbnUgVmlldy1Nb2RlbFxuICogQHBhcmFtIGJhc2VcbiAqIEBwYXJhbSBjYXRlZ29yeVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIE1lbnVWaWV3TW9kZWwoYmFzZSwgY2F0ZWdvcnkpIHtcbiAgc2VsZiA9IHRoaXM7XG4gIHRoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcbiAgdGhpcy5jYXRlZ29yaWVzID0ga28ub2JzZXJ2YWJsZUFycmF5KE9iamVjdC5rZXlzKGJhc2UpLm1hcChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2hlY2tlZDoga28ub2JzZXJ2YWJsZSghaW5kZXgpLFxuICAgICAgbmFtZTogaXRlbSxcbiAgICAgIGxpbms6IGZhbHNlXG4gICAgfVxuICB9KSk7XG5cbiAgLy8gaW5pdGlhbCBsb2FkXG4gIHRoaXMuc2VsZWN0Q2F0ZWdvcnkodGhpcy5jYXRlZ29yaWVzKClbMF0pO1xufVxuXG4vKipcbiAqIE1lbnUgVmlldy1Nb2RlbCBtZXRob2RcbiAqIEBwYXJhbSBjYXRlZ29yeVxuICovXG5NZW51Vmlld01vZGVsLnByb3RvdHlwZS5zZWxlY3RDYXRlZ29yeSA9IGZ1bmN0aW9uIChjYXRlZ29yeSkge1xuICB2YXIgY2F0ZWdvcnlOYW1lID0gY2F0ZWdvcnkubmFtZTtcbiAgc2VsZi5jYXRlZ29yeShjYXRlZ29yeU5hbWUpO1xuICBoZi5jaGVja0FjdGl2ZShzZWxmLmNhdGVnb3JpZXMsIGNhdGVnb3J5TmFtZSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1lbnVWaWV3TW9kZWw7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9tZW51Vmlld01vZGVsLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cy5nZXRNb2RlbEFycmF5ID0gZnVuY3Rpb24gZ2V0TW9kZWxBcnJheShwYXJhbXMpIHtcclxuICAgIHZhciBvYmogPSBwYXJhbXMub2JqIHx8IHt9LFxyXG4gICAgICAgIGFyciA9IHBhcmFtcy5hcnIgfHwgW10sXHJcbiAgICAgICAgcHJvcCA9IHBhcmFtcy5wcm9wIHx8ICduYW1lJztcclxuXHJcbiAgICBmb3IgKHZhciBpIGluIG9iaikge1xyXG4gICAgICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGkpKSB7IGNvbnRpbnVlOyB9XHJcblxyXG4gICAgICAgIHZhciBpdGVtID0gYXJyLmZpbmQoZnVuY3Rpb24gKG0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtMS5uYW1lID09PSBvYmpbaV1bcHJvcF07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChpdGVtKSB7IGNvbnRpbnVlOyB9XHJcblxyXG4gICAgICAgIGFyci5wdXNoKHtcclxuICAgICAgICAgICAgY2hlY2tlZDoga28ub2JzZXJ2YWJsZShmYWxzZSksXHJcbiAgICAgICAgICAgIG5hbWU6IG9ialtpXVtwcm9wXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFycjtcclxufTtcclxuXHJcbmV4cG9ydHMuY2hlY2tBY3RpdmUgPSBmdW5jdGlvbiBjaGVja0FjdGl2ZShrb0FyciwgYWN0aXZlRWxlbSkge1xyXG4gICAgaWYgKCFrb0FyciAmJiAhYWN0aXZlRWxlbSkge3JldHVybiBmYWxzZTt9XHJcblxyXG4gICAga29BcnIoa29BcnIoKS5tYXAoZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIGlmIChvYmoubmFtZSA9PT0gYWN0aXZlRWxlbSkge1xyXG4gICAgICAgICAgICBvYmouY2hlY2tlZCh0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvYmouY2hlY2tlZChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9KSk7XHJcbn07XHJcblxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9oZWxwZXJGdW5jLmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHNlbGY7XHJcbnZhciBiYXNlO1xyXG52YXIgaGYgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2hlbHBlckZ1bmMnKTtcclxuLyoqXHJcbiAqIFBhcmFtcyBWaWV3LU1vZGVsXHJcbiAqIEBwYXJhbSByYXdcclxuICogQHBhcmFtIG1ldGhvZFxyXG4gKiBAcGFyYW0gcGFyYW1zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gUGFyYW1zVmlld01vZGVsKHJhdywgbWV0aG9kLCBwYXJhbXMpIHtcclxuICBiYXNlID0gcmF3O1xyXG4gIHNlbGYgPSB0aGlzO1xyXG4gIHRoaXMuYW5pbWF0aW9uU3BlZWQgPSAyMDA7XHJcblxyXG4gIC8vIG9ic2VydmFibGVzXHJcbiAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XHJcbiAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XHJcbiAgdGhpcy5pc0hpZGRlbiA9IGtvLm9ic2VydmFibGUodHJ1ZSk7XHJcbiAgdGhpcy5wYXJhbUluRm9jdXMgPSBrby5vYnNlcnZhYmxlKCcnKTtcclxuXHR0aGlzLnBhcmFtc01vZGVsID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcclxuXHJcblx0Ly8gY29tcHV0ZWRcclxuXHQvLyB0aGlzLnBhcmFtc01vZGVsID0ga28uY29tcHV0ZWQodGhpcy51cGRhdGVQYXJhbXNNb2RlbCwgdGhpcyk7XHJcblx0dGhpcy51cGRhdGVWaWV3TW9kZWwoKTtcclxuXHR0aGlzLm1ldGhvZC5zdWJzY3JpYmUodGhpcy51cGRhdGVWaWV3TW9kZWwsIHRoaXMpO1xyXG5cclxuXHR0aGlzLmlzRGlydHkgPSBrby5jb21wdXRlZCh0aGlzLmNoZWNrRGlydHksIHRoaXMpO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWwgYnVpbGQgb2YgU2VsZWN0IE1vZGVsXHJcbiAqL1xyXG5QYXJhbXNWaWV3TW9kZWwucHJvdG90eXBlLnVwZGF0ZVZpZXdNb2RlbCA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgb2JqID0gdGhpcy5tZXRob2QoKS5wYXJhbWV0ZXJzIHx8IHt9LFxyXG5cdFx0YXJyID0gW107XHJcblxyXG5cdGZvciAodmFyIGkgaW4gb2JqKSB7XHJcblx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShpKSkge2NvbnRpbnVlO31cclxuXHJcblx0XHQvLyBjb3BpZXMgYWxsIHZhbHVlcyBmcm9tIG1vZGVsIHRvIHZpZXctbW9kZWxcclxuXHRcdHZhciB2bVBhcmFtID0gJC5leHRlbmQoe30sIG9ialtpXSk7XHJcblxyXG5cdFx0dm1QYXJhbS52YWx1ZSA9IGtvLm9ic2VydmFibGUodm1QYXJhbS52YWx1ZSB8fCAodm1QYXJhbS5zZWxlY3QgJiYgdm1QYXJhbS5kZWZhdWx0KSB8fCAnJyk7XHJcblxyXG5cdFx0Ly9hZGQgb2JzZXJ2YWJsZSBmb3Igc2VsZWN0ZWQgb3B0aW9uc1xyXG5cdFx0aWYgKHZtUGFyYW0uc2VsZWN0KSB7XHJcblx0XHRcdHZtUGFyYW0ub3B0aW9ucyA9IGtvLm9ic2VydmFibGVBcnJheShvYmpbaV0ub3B0aW9ucy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdFx0XHR2YXIgb2JqID0gJC5leHRlbmQoe30sIGl0ZW0pO1xyXG5cdFx0XHRcdG9iai5jaGVja2VkID0ga28ub2JzZXJ2YWJsZShpdGVtLmNoZWNrZWQpO1xyXG5cdFx0XHRcdHJldHVybiBvYmo7XHJcblx0XHRcdH0pKVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vICdkaXJ0eScgZmxhZyB3YXRjaGVyIGZvciBjdXJyZW50IGZpZWxkXHJcblx0XHR2bVBhcmFtLmlzRGlydHkgPSBrby5wdXJlQ29tcHV0ZWQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodGhpcy5zZWxlY3QpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy52YWx1ZSgpICE9PSB0aGlzLmRlZmF1bHQgJiYgdGhpcy52YWx1ZSgpICE9PSAnbm9uZSc7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuICEhKHRoaXMudmFsdWUoKS50b1N0cmluZygpKS50cmltKCkubGVuZ3RoO1xyXG5cdFx0fSwgdm1QYXJhbSk7XHJcblxyXG5cdFx0Ly8gYWRkIGNhbGVuZGFyIGJ0biBmb3IgY3VycmVudCBmaWVsZFxyXG5cdFx0dm1QYXJhbS5oYXNDYWxlbmRhciA9IGkuc2VhcmNoKC8oZGF0ZXx0aW1lKS9nbWkpICE9IC0xO1xyXG5cclxuXHRcdC8vIGFkZCBwb3AtdXAgYnRuIGZvciBjdXJyZW50IGZpZWxkXHJcblx0XHR2bVBhcmFtLmhhc1BvcFVwID0gaS5zZWFyY2goLyhhdHRyYWN0aW9uSWR8dmVudWVJZCkvZ21pKSAhPSAtMTtcclxuXHJcblx0XHRhcnIucHVzaCh2bVBhcmFtKTtcclxuXHR9XHJcblxyXG5cdC8vIHByZXBhcmUgb3V0cHV0IGZvciByZXF1ZXN0XHJcblx0dGhpcy5wYXJhbXNNb2RlbChhcnIpO1xyXG5cdHRoaXMucGFyYW1JbkZvY3VzKHRoaXMucGFyYW1zTW9kZWwoKVswXSk7XHJcblx0dGhpcy5wcmVwYXJlVXJsUGFpcnMoYXJyLCB0aGlzLnBhcmFtcyk7XHJcblx0cmV0dXJuIGFycjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEaXJ0eSBwYXJhbXMgZm9ybSBvYnNlcnZhYmxlIG1ldGhvZFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUuY2hlY2tEaXJ0eSA9IGZ1bmN0aW9uICgpIHtcclxuXHR0aGlzLnByZXBhcmVVcmxQYWlycyh0aGlzLnBhcmFtc01vZGVsKCksIHRoaXMucGFyYW1zKTtcclxuXHR2YXIgZGlydHkgPSB0aGlzLnBhcmFtc01vZGVsKCkuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcblx0XHRyZXR1cm4gaXRlbS5pc0RpcnR5KCkgPT09IHRydWU7XHJcblx0fSk7XHJcblx0cmV0dXJuIGRpcnR5Lmxlbmd0aCA+IDA7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIEVudGVyIGtleSBoYW5kbGVyXHJcbiAqIEBwYXJhbSBtb2RlbFxyXG4gKiBAcGFyYW0gZXZlbnRcclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUub25FbnRlcktleURvd24gPSBmdW5jdGlvbiAobW9kZWwsIGV2ZW50KSB7XHJcbiAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAkKCcjYXBpLWV4cC1nZXQtYnRuJykudHJpZ2dlcignY2xpY2snKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNsaWRlIHRvZ2dsZSBmb3IgcGFyYW1zIGNvbnRhaW5lciBtZXRob2RcclxuICogQHBhcmFtIHZpZXdNb2RlbFxyXG4gKiBAcGFyYW0gZXZlbnRcclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUuc2xpZGVUb2dnbGUgPSBmdW5jdGlvbiAodmlld01vZGVsLCBldmVudCkge1xyXG4gICQoZXZlbnQuY3VycmVudFRhcmdldClcclxuICAgIC5wYXJlbnRzKCcuanMtc2xpZGUtY29udHJvbCcpXHJcbiAgICAuZmluZCgnLmpzLXNsaWRlLXdyYXBwZXInKVxyXG4gICAgLnNsaWRlVG9nZ2xlKHZpZXdNb2RlbC5hbmltYXRpb25TcGVlZCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICB2aWV3TW9kZWwuaXNIaWRkZW4oIXZpZXdNb2RlbC5pc0hpZGRlbigpKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1hY2hlcyBmb2N1c2VkIHBhcmFtXHJcbiAqIEBwYXJhbSBpdGVtXHJcbiAqL1xyXG5QYXJhbXNWaWV3TW9kZWwucHJvdG90eXBlLm9uRm9jdXMgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gIHNlbGYucGFyYW1JbkZvY3VzKGl0ZW0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpbHRlcnMgcGFyYW1zIGJ5IGRlZmluZWQgdmFsdWVcclxuICogQHBhcmFtIGFyclxyXG4gKiBAcGFyYW0ga29PYnNcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5QYXJhbXNWaWV3TW9kZWwucHJvdG90eXBlLnByZXBhcmVVcmxQYWlycyA9IGZ1bmN0aW9uIChhcnIsIGtvT2JzKSB7XHJcbiAgaWYgKCFhcnIgJiYgIWtvT2JzKSB7cmV0dXJuIGZhbHNlO31cclxuXHJcbiAgcmV0dXJuIGtvT2JzKGFyci5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgIHJldHVybiAoaXRlbS52YWx1ZSgpIHx8IGl0ZW0uZGVmYXVsdCk7XHJcbiAgfSkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE9uIHNlbGVjdCB2YWx1ZSBoYW5kbGVyIGZvciBwYXJhbXMgc2VsZWN0XHJcbiAqIEBwYXJhbSBwYXJhbSB7b2JqZWN0fSBwYXJhbWV0ZXIgdmlldy1tb2RlbFxyXG4gKiBAcGFyYW0gb3B0aW9uIHtvYmplY3R9IG9wdGlvbiB2aWV3LW1vZGVsXHJcbiAqL1xyXG5QYXJhbXNWaWV3TW9kZWwucHJvdG90eXBlLm9uU2VsZWN0UGFyYW1WYWx1ZSA9IGZ1bmN0aW9uIChwYXJhbSwgb3B0aW9uKSB7XHJcblx0aGYuY2hlY2tBY3RpdmUocGFyYW0ub3B0aW9ucywgb3B0aW9uLm5hbWUpO1xyXG5cdHBhcmFtLnZhbHVlKG9wdGlvbi5uYW1lKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQYXJhbXMgY2xlYXIgYnV0dG9uIGhhbmRsZXJcclxuICogQHBhcmFtIHZtIHtvYmplY3R9IHZpZXcgbW9kZWxcclxuICogQHBhcmFtIGUge29iamVjdH0gZXZlbnRcclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUub25QYXJhbXNDbGVhciA9IGZ1bmN0aW9uICh2bSwgZSkge1xyXG5cdHRoaXMudXBkYXRlVmlld01vZGVsKCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBhcmFtc1ZpZXdNb2RlbDtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL1ZpZXdNb2RlbHMvcGFyYW1zVmlld01vZGVsLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGhmID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9oZWxwZXJGdW5jJyk7XHJcbnZhciBzZWxmO1xyXG52YXIgYmFzZTtcclxudmFyIGNhdGVnb3J5O1xyXG5cclxuLyoqXHJcbiAqIE1ldGhvZHMgVmlldy1Nb2RlbFxyXG4gKiBAcGFyYW0gcmF3XHJcbiAqIEBwYXJhbSBjYXRlZ29yeVxyXG4gKiBAcGFyYW0gbWV0aG9kXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gTWV0aG9kc1ZpZXdNb2RlbChyYXcsIGNhdGVnb3J5LCBtZXRob2QpIHtcclxuICBzZWxmID0gdGhpcztcclxuICBiYXNlID0gcmF3O1xyXG5cclxuICAvLyBvYnNlcnZhYmxlc1xyXG4gIHRoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcclxuICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcclxuICB0aGlzLnRvZ2dsZVBvcFVwID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcbiAgdGhpcy5yYWRpb3NNb2RlbCA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XHJcbiAgdGhpcy5tZXRob2RzVmlld01vZGVsID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcclxuICB0aGlzLnVwZGF0ZU1vZGVsKHRoaXMuY2F0ZWdvcnkoKSk7XHJcbiAgdGhpcy5jYXRlZ29yeS5zdWJzY3JpYmUodGhpcy51cGRhdGVNb2RlbCwgdGhpcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBPbiBjYXRlZ29yeSBjaGFuZ2UgaGFuZGxlclxyXG4gKiBNZXRob2RzIFZpZXctTW9kZWwgbWV0aG9kXHJcbiAqIEBwYXJhbSBjYXRlZ29yeVxyXG4gKi9cclxuTWV0aG9kc1ZpZXdNb2RlbC5wcm90b3R5cGUudXBkYXRlTW9kZWwgPSBmdW5jdGlvbiAoY2F0ZWdvcnkpIHtcclxuICAvLyBpbml0aWFsIHJhZGlvcyBtb2RlbFxyXG4gIHNlbGYudXBkYXRlUmFkaW9zTW9kZWwoYmFzZVtjYXRlZ29yeV0pO1xyXG4gIC8vIGluaXRpYWwgc2VsZWN0IG1vZGVsIChmaXJzdCBtZXRob2QgaW4gZmlyc3Qgc2VjdGlvbiBmb3Igc3RhcnQpXHJcbiAgc2VsZi51cGRhdGVTZWxlY3Qoc2VsZi5yYWRpb3NNb2RlbCgpWzBdKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBPbmNoYW5nZSBoYW5kbGVyIGZvciBSYWRpbyBidXR0b25zXHJcbiAqIEBwYXJhbSBpdGVtXHJcbiAqL1xyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS5vbmNoYW5nZVJhZGlvcyA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgLy91cGRhdGUgUmFkaW9zIE1vZGVsXHJcbiAgaGYuY2hlY2tBY3RpdmUoc2VsZi5yYWRpb3NNb2RlbCwgaXRlbS5uYW1lKTtcclxuICAvL3VwZGF0ZSBTZWxlY3QgTW9kZWxcclxuICBzZWxmLnVwZGF0ZVNlbGVjdChpdGVtKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsIGJ1aWxkIG9mIFJhZGlvcyBNb2RlbFxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKi9cclxuTWV0aG9kc1ZpZXdNb2RlbC5wcm90b3R5cGUudXBkYXRlUmFkaW9zTW9kZWwgPSBmdW5jdGlvbiAocGFyYW0pIHtcclxuICB2YXIgb2JqID0gcGFyYW0gfHwge30sXHJcbiAgICBhcnIgPSBbXTtcclxuXHJcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcclxuICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGkpKSB7IGNvbnRpbnVlOyB9XHJcbiAgICB2YXIgaXRlbSA9IHtcclxuICAgICAgY2hlY2tlZDoga28ub2JzZXJ2YWJsZShpID09PSAnQUxMJyksXHJcbiAgICAgIG5hbWU6IGlcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGkgPT09ICdBTEwnKSB7XHJcbiAgICAgIGFyci51bnNoaWZ0KGl0ZW0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhcnIucHVzaChpdGVtKTtcclxuICAgIH1cclxuICB9XHJcblx0YXJyID0gYXJyLnNvcnQoY29tcGFyZU1ldGhvZHMpO1xyXG4gIHRoaXMucmFkaW9zTW9kZWwoYXJyKTtcclxuICByZXR1cm4gYXJyO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWwgYnVpbGQgb2YgU2VsZWN0IE1vZGVsXHJcbiAqIEBwYXJhbSBpdGVtXHJcbiAqL1xyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS51cGRhdGVTZWxlY3QgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gIHZhciBvYmogPSBiYXNlW3NlbGYuY2F0ZWdvcnkoKV1baXRlbS5uYW1lXXx8IHt9LFxyXG4gICAgYXJyID0gW10sXHJcbiAgICBjb3VudCA9IDA7XHJcblxyXG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XHJcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShpKSkgeyBjb250aW51ZTsgfVxyXG4gICAgdmFyIHByb3BlcnR5ID0gb2JqW2ldO1xyXG5cdFx0Ly8gY29waWVzIGFsbCB2YWx1ZXMgZnJvbSBtb2RlbCB0byB2aWV3LW1vZGVsXHJcblx0XHR2YXIgdm1NZXRob2QgPSAkLmV4dGVuZCh7fSwgcHJvcGVydHkpO1xyXG5cclxuXHRcdGRlbGV0ZSB2bU1ldGhvZC5wYXJhbWV0ZXJzO1xyXG5cdFx0dm1NZXRob2QuY2hlY2tlZCA9IGtvLm9ic2VydmFibGUoIWNvdW50KTtcclxuXHJcblx0XHRhcnIucHVzaCh2bU1ldGhvZCk7XHJcblxyXG4gICAgLy8gc2V0IGdsb2JhbCBvYnNlcnZhYmxlXHJcbiAgICAhY291bnQgJiYgdGhpcy5tZXRob2QoYmFzZVtwcm9wZXJ0eS5jYXRlZ29yeV1bcHJvcGVydHkubWV0aG9kXVtwcm9wZXJ0eS5pZF0pO1xyXG5cclxuICAgIGNvdW50Kys7XHJcblxyXG4gIH1cclxuXHJcblx0dGhpcy5tZXRob2RzVmlld01vZGVsKGFycik7XHJcblx0cmV0dXJuIGFycjtcclxufTtcclxuXHJcbk1ldGhvZHNWaWV3TW9kZWwucHJvdG90eXBlLm9uU2VsZWN0TWV0aG9kID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICBoZi5jaGVja0FjdGl2ZShzZWxmLm1ldGhvZHNWaWV3TW9kZWwsIGl0ZW0ubmFtZSk7XHJcbiAgc2VsZi5tZXRob2QoYmFzZVtpdGVtLmNhdGVnb3J5XVtpdGVtLm1ldGhvZF1baXRlbS5pZF0pO1xyXG59O1xyXG5cclxuTWV0aG9kc1ZpZXdNb2RlbC5wcm90b3R5cGUub25BYm91dENsaWNrID0gZnVuY3Rpb24gKG1vZGVsLCBldmVudCkge1xyXG4gIG1vZGVsLnRvZ2dsZVBvcFVwKCFtb2RlbC50b2dnbGVQb3BVcCgpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTb3J0IGZ1bmN0aW9uIGZvciBtZXRob2RzIGFyYXlcclxuICogQHBhcmFtIGZcclxuICogQHBhcmFtIHNcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbmZ1bmN0aW9uIGNvbXBhcmVNZXRob2RzKGYscykge1xyXG5cdHZhciBhID0gZi5uYW1lLnRvVXBwZXJDYXNlKCk7XHJcblx0dmFyIGIgPSBzLm5hbWUudG9VcHBlckNhc2UoKTtcclxuXHJcblx0aWYgKGEgPT09IGIpIHtyZXR1cm4gMDt9XHJcblx0aWYgKGEgPT09ICdBTEwnIHx8XHJcblx0XHQoYSA9PT0gJ0dFVCcgJiYgKGIgPT09ICdQT1NUJyB8fCBiID09PSAnUFVUJyB8fCBiID09PSAnREVMRVRFJykpIHx8XHJcblx0XHQoYSA9PT0gJ1BPU1QnICYmIChiID09PSAnUFVUJyB8fCBiID09PSAnREVMRVRFJykpIHx8XHJcblx0XHQoYSA9PT0gJ1BVVCcgJiYgYiA9PT0gJ0RFTEVURScpKSB7XHJcblx0XHRyZXR1cm4gLTE7XHJcblx0fVxyXG5cdHJldHVybiAxO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1ldGhvZHNWaWV3TW9kZWw7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9WaWV3TW9kZWxzL21ldGhvZHNWaWV3TW9kZWwuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIganNvbkhpZ2hsaWdodCA9IHJlcXVpcmUoJy4vLi4vY29tcG9uZW50cy9qc29uLWhpZ2hsaWdodCcpO1xudmFyIHNlbGY7XG5cbnZhciBzZXRTbGlkZXIgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3NsaWRlcicpO1xuXG5mdW5jdGlvbiBSZXF1ZXN0c0xpc3RWaWV3TW9kZWwocmVxdWVzdHMsIHVybCkge1xuXHR0aGlzLnVybCA9IHVybDtcblx0c2VsZiA9IHRoaXM7XG5cdHRoaXMuY29sb3JzID0gW1xuXHRcdCdjb2x1bW4tY29sb3ItMScsXG5cdFx0J2NvbHVtbi1jb2xvci0yJyxcblx0XHQnY29sdW1uLWNvbG9yLTMnLFxuXHRcdCdjb2x1bW4tY29sb3ItNCcsXG5cdFx0J2NvbHVtbi1jb2xvci01Jyxcblx0XHQnY29sdW1uLWNvbG9yLTYnLFxuXHRcdCdjb2x1bW4tY29sb3ItNycsXG5cdFx0J2NvbHVtbi1jb2xvci04Jyxcblx0XHQnY29sdW1uLWNvbG9yLTknLFxuXHRcdCdjb2x1bW4tY29sb3ItMTAnLFxuXHRcdCdjb2x1bW4tY29sb3ItMTEnLFxuXHRcdCdjb2x1bW4tY29sb3ItMTInXG5cdF07XG5cdHRoaXMucmVxdWVzdHMgPSByZXF1ZXN0cztcblx0dGhpcy5pc0FjdGl2ZVRhYiA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuXHR0aGlzLnZpZXdNb2RlbCA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XG5cdHRoaXMuYmxvY2tzVmlld01vZGVsID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcblx0dGhpcy5jbGVhckJ0bklzVmlzaWJsZSA9IGtvLmNvbXB1dGVkKHRoaXMuX2lzVmlzaWJsZSwgdGhpcyk7XG5cdHRoaXMucmVxdWVzdHMuc3Vic2NyaWJlKHRoaXMudXBkYXRlTW9kZWwsIHRoaXMpO1xufVxuXG5cblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUuZ2V0TW9yZSA9IGZ1bmN0aW9uIChwYXJlbnQsIGRhdGEsIGV2ZW50KSB7XG5cdHZhciBncm91cENvbXBvbmVudCA9IHRoaXM7XG5cdHZhciBzbGlkZXIgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnBhcmVudHMoJy5zbGlkZXInKTtcblx0dmFyIGNvbXBvbmVudCA9ICQoJzxzZWN0aW9uIGRhdGEtYmluZD1cImNvbXBvbmVudDoge25hbWU6IFxcJ2NhcmRcXCcsIHBhcmFtczogcGFyYW1zfVwiPjwvc2VjdGlvbj4nKTtcblx0a28uYXBwbHlCaW5kaW5ncyh7XG5cdFx0cGFyYW1zOiB7XG5cdFx0XHRkYXRhOiBwYXJlbnQsXG5cdFx0XHRjb2xvcjogZ3JvdXBDb21wb25lbnQuY29sb3IsXG5cdFx0XHRpbmRleDogZ3JvdXBDb21wb25lbnQuaW5kZXgsXG5cdFx0XHRnZXRNb3JlOiBncm91cENvbXBvbmVudC5nZXRNb3JlLFxuXHRcdFx0dXJsOiBncm91cENvbXBvbmVudC51cmxcblx0XHR9XG5cdH0sIGNvbXBvbmVudFswXSk7XG5cblx0c2xpZGVyLnNsaWNrKCdzbGlja0FkZCcsIGNvbXBvbmVudCk7XG59O1xuXG4vKipcbiAqIFZpc2liaWxpdHkgZmxhZyBmb3IgQ2xlYXIgYnRuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUuX2lzVmlzaWJsZSA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHRoaXMucmVxdWVzdHMoKS5sZW5ndGggPiAwO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgVmlld21vZGVsIG9mIHJlcXVlc3QgbGlzdFxuICogQHBhcmFtIGFyclxuICovXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLnVwZGF0ZU1vZGVsID0gZnVuY3Rpb24gKGFycikge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdFxuXHR2YXIgbmV3TW9kZWwgPSB0aGlzLnJlcXVlc3RzKClcblx0XHQubWFwKGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdHZhciBpdGVtID0gICQuZXh0ZW5kKHtcblx0XHRcdFx0Y29sb3I6IHNlbGYuY29sb3JzW29iai5pbmRleCAlIHNlbGYuY29sb3JzLmxlbmd0aF0sXG5cdFx0XHRcdGFjdGl2ZToga28ub2JzZXJ2YWJsZShmYWxzZSksXG5cdFx0XHRcdHJlc0hUTUw6IGtvLm9ic2VydmFibGUoJycpLFxuXHRcdFx0XHRibG9ja3M6IFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lOiAnRXZlbnRzJyxcblx0XHRcdFx0XHRcdHBhbmVsVHlwZTogJ2xpc3QtZ3JvdXAnLFxuXHRcdFx0XHRcdFx0aXRlbXM6IGtvLm9ic2VydmFibGVBcnJheShPYmplY3QuZ2V0UHJvcChvYmosJ3Jlcy5fZW1iZWRkZWQuZXZlbnRzJykgfHwgW10pLFxuXHRcdFx0XHRcdFx0dG90YWxFbGVtZW50czoga28ub2JzZXJ2YWJsZShPYmplY3QuZ2V0UHJvcChvYmosJ3Jlcy5wYWdlLnRvdGFsRWxlbWVudHMnKXx8JycpLFxuXHRcdFx0XHRcdFx0aXNBY3RpdmU6IGtvLm9ic2VydmFibGUoZmFsc2UpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lOiAnUGFnZScsXG5cdFx0XHRcdFx0XHRwYW5lbFR5cGU6ICdjbGVhcicsXG5cdFx0XHRcdFx0XHRpdGVtczogb2JqLmVycm9yIHx8IG9iai5yZXMucGFnZSxcblx0XHRcdFx0XHRcdGlzQWN0aXZlOiBrby5vYnNlcnZhYmxlKGZhbHNlKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XVxuXHRcdFx0fSwgb2JqKTtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH0pO1xuXHRzZWxmLnZpZXdNb2RlbChuZXdNb2RlbCk7XG5cdHNldFNsaWRlcignLnNsaWRlcicpO1xuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHQkKCcjc2hvdy1kZXRhaWxzLTAnKS50cmlnZ2VyKCdjbGljaycpO1xuXHR9LCAxMCk7XG59O1xuXG4vKipcbiAqIENsZWFyIHJlcXVlc3RzdHMgbGlzdCBoYW5kbGVyXG4gKiBAcGFyYW0gdm1cbiAqIEBwYXJhbSBldmVudFxuICovXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLm9uQ2xlYXJSZXF1ZXN0cyA9IGZ1bmN0aW9uICh2bSwgZXZlbnQpIHtcblx0dGhpcy5yZXF1ZXN0cyhbXSk7XG59O1xuXG4vKipcbiAqIERldGFpbHMgdG9nZ2xlIGhhbmRsZXJcbiAqIEBwYXJhbSB2bVxuICogQHBhcmFtIGV2ZW50XG4gKi9cblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUuZ2V0RGV0YWlscyA9IGZ1bmN0aW9uICh2bSwgZXZlbnQpIHtcblx0aWYgKCF0aGlzLnJlc0hUTUwoKS5sZW5ndGgpIHtcblx0XHRqc29uSGlnaGxpZ2h0KHRoaXMucmVzSFRNTCwgdGhpcy5yZXMpO1xuXHR9XG5cdHRoaXMuYWN0aXZlKCF0aGlzLmFjdGl2ZSgpKTtcbn07XG5cblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUuZ2V0U3RyID0gZnVuY3Rpb24gKHMsIGkpIHtcblx0dmFyIHN0ciA9IHM7XG5cdHZhciBpMSA9IGkgPyBpKCkgOiAnJztcblx0cmV0dXJuIFtcblx0XHRzdHIsXG5cdFx0aTFcblx0XS5qb2luKCctJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlcXVlc3RzTGlzdFZpZXdNb2RlbDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9WaWV3TW9kZWxzL3JlcXVlc3RzTGlzdFZpZXdNb2RlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgV29ya2VyID0gcmVxdWlyZSgnLi9oaWdobGlnaHRKc29uLndvcmtlcicpOyAvLyBKc29uLWZvcm1hdHRlciB3b3JrZXJcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9ic2VydmFibGUsIGNvZGUpIHtcclxuXHR2YXIgYW5pbVRpbWUgPSAxMDA7XHJcblx0dmFyIHdvcmtlciA9IG5ldyBXb3JrZXI7XHJcblxyXG5cdHdvcmtlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdG9ic2VydmFibGUoZXZlbnQuZGF0YSk7XHJcblxyXG5cdFx0JChkb2N1bWVudClcclxuXHRcdFx0Lm9uKCdjbGljayB0b3VjaCcsICcudG0tY29kZS1jb250YWluZXIgLmV4cGFuZGVkJywgZnVuY3Rpb24ganNvbkNvZGVDb250YWluZXJFeHBhbmRlZChlKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0dmFyICRzZWxmID0gJCh0aGlzKTtcclxuXHRcdFx0XHQkc2VsZlxyXG5cdFx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0XHQuZmluZCgnPnVsJylcclxuXHRcdFx0XHRcdC5zbGlkZVVwKGFuaW1UaW1lLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0JHNlbGYuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdH0pXHJcblx0XHRcdC5vbignY2xpY2sgdG91Y2gnLCAnLnRtLWNvZGUtY29udGFpbmVyIC5leHBhbmRlZC5jb2xsYXBzZWQnLCBmdW5jdGlvbiBqc29uQ29kZUNvbnRhaW5lckNvbGxhcHNlZChlKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0dmFyICRzZWxmID0gJCh0aGlzKTtcclxuXHRcdFx0XHQkc2VsZlxyXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKVxyXG5cdFx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0XHQuZmluZCgnPnVsJylcclxuXHRcdFx0XHRcdC5zbGlkZURvd24oYW5pbVRpbWUsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHQkc2VsZlxyXG5cdFx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnY29sbGFwc2VkJylcclxuXHRcdFx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdH0pXHJcblx0fTtcclxuXHR3b3JrZXIub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0Y29uc29sZS5sb2coZXZlbnQpO1xyXG5cdH07XHJcblxyXG5cdHdvcmtlci5wb3N0TWVzc2FnZShjb2RlKTtcclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvanNvbi1oaWdobGlnaHQuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHJlcXVpcmUoXCIhIUQ6XFxcXHRpY2tldG1hc3Rlci1hcGktc3RhZ2luZy5naXRodWIuaW9cXFxcbm9kZV9tb2R1bGVzXFxcXHdvcmtlci1sb2FkZXJcXFxcY3JlYXRlSW5saW5lV29ya2VyLmpzXCIpKFwiLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxcbi8qKioqKiovIFxcdC8vIFRoZSBtb2R1bGUgY2FjaGVcXG4vKioqKioqLyBcXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cXG4vKioqKioqLyBcXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHRcXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcXG4vKioqKioqLyBcXHRcXHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcXG4vKioqKioqLyBcXHRcXHRcXHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdFxcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXFxuLyoqKioqKi8gXFx0XFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xcbi8qKioqKiovIFxcdFxcdFxcdGV4cG9ydHM6IHt9LFxcbi8qKioqKiovIFxcdFxcdFxcdGlkOiBtb2R1bGVJZCxcXG4vKioqKioqLyBcXHRcXHRcXHRsb2FkZWQ6IGZhbHNlXFxuLyoqKioqKi8gXFx0XFx0fTtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdFxcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxcbi8qKioqKiovIFxcdFxcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0XFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxcbi8qKioqKiovIFxcdFxcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0XFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcXG4vKioqKioqLyBcXHRcXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XFxuLyoqKioqKi8gXFx0fVxcbi8qKioqKiovXFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxcbi8qKioqKiovIFxcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxcbi8qKioqKiovIFxcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xcbi8qKioqKiovIFxcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFxcXCJcXFwiO1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXFxuLyoqKioqKi8gXFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XFxuLyoqKioqKi8gfSlcXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xcbi8qKioqKiovIChbXFxuLyogMCAqL1xcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xcblxcblxcdC8qKlxcclxcblxcdCAqIENvZGUgZm9ybWF0IHdlYi13b3JrZXJcXHJcXG5cXHQgKiBAcGFyYW0gZXZlbnRcXHJcXG5cXHQgKi9cXHJcXG5cXHQvLyB2YXIgaGlnaGxpZ2h0SnNvbigpXFxyXFxuXFx0dmFyIGhpZ2hsaWdodEpzb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xcclxcblxcdFxcclxcblxcdG9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XFxyXFxuXFx0ICB2YXIgY29kZSA9IGV2ZW50LmRhdGE7XFxyXFxuXFx0ICAvLyBpbXBvcnRTY3JpcHRzKCdqc29uLXBhcnNlLmpzJyk7XFxyXFxuXFx0ICB2YXIgcmVzdWx0ID0gaGlnaGxpZ2h0SnNvbihjb2RlLCB7ZXhwYW5kZWQ6IHRydWV9KTtcXHJcXG5cXHQgIC8vIHZhciByZXN1bHQgPUpTT04uc3RyaW5naWZ5KGNvZGUpO1xcclxcblxcdCAgcG9zdE1lc3NhZ2UocmVzdWx0KTtcXHJcXG5cXHR9O1xcclxcblxcblxcbi8qKiovIH0sXFxuLyogMSAqL1xcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xcblxcblxcdHZhciBwcmVmaXggPSAndG0tY29kZSc7XFxyXFxuXFx0XFxyXFxuXFx0dmFyIGdldEV4cGFuZGVyQ2xhc3NlcyA9IGZ1bmN0aW9uIChleHBhbmRlZCkge1xcclxcblxcdFxcdGlmICghZXhwYW5kZWQpIHtcXHJcXG5cXHRcXHRcXHRyZXR1cm4gJ2V4cGFuZGVkIGNvbGxhcHNlZCBoaWRkZW4nO1xcclxcblxcdFxcdH1cXHJcXG5cXHRcXHRyZXR1cm4gJ2V4cGFuZGVkJztcXHJcXG5cXHR9O1xcclxcblxcdFxcclxcblxcdHZhciBlbmNvZGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcXHJcXG5cXHRcXHRyZXR1cm4gWyc8c3Bhbj4nLCB2YWx1ZSwgJzwvc3Bhbj4nXS5qb2luKCcnKTtcXHJcXG5cXHR9O1xcclxcblxcdFxcclxcblxcdHZhciBjcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUsIHR5cGUsIGV4cGFuZGVyQ2xhc3Nlcykge1xcclxcblxcdFxcdHZhciBrbGFzcyA9ICdvYmplY3QnLFxcclxcblxcdFxcdFxcdG9wZW4gPSAneycsXFxyXFxuXFx0XFx0XFx0Y2xvc2UgPSAnfSc7XFxyXFxuXFx0XFxyXFxuXFx0XFx0aWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XFxyXFxuXFx0XFx0XFx0a2xhc3MgPSAnYXJyYXknO1xcclxcblxcdFxcdFxcdG9wZW4gPSAnWyc7XFxyXFxuXFx0XFx0XFx0Y2xvc2UgPSAnXSc7XFxyXFxuXFx0XFx0fVxcclxcblxcdFxcclxcblxcdFxcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xcclxcblxcdFxcdFxcdHJldHVybiBbXFxyXFxuXFx0XFx0XFx0XFx0JzxsaT4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwia2V5XFxcIj5cXFwiJywgZW5jb2RlKGtleSksICdcXFwiOiA8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcIm51bGxcXFwiPlxcXCInLCBlbmNvZGUodmFsdWUpLCAnXFxcIjwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdCc8L2xpPidcXHJcXG5cXHRcXHRcXHRdLmpvaW4oJycpO1xcclxcblxcdFxcdH1cXHJcXG5cXHRcXHJcXG5cXHRcXHRpZiAodHlwZSA9PSAnb2JqZWN0Jykge1xcclxcblxcdFxcdFxcdHJldHVybiBbXFxyXFxuXFx0XFx0XFx0XFx0JzxsaT4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwiJywgZXhwYW5kZXJDbGFzc2VzLCAnXFxcIj48L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcImtleVxcXCI+XFxcIicsIGVuY29kZShrZXkpLCAnXFxcIjogPC9zcGFuPiAnLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwib3BlblxcXCI+Jywgb3BlbiwgJzwvc3Bhbj4gJyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHVsIGNsYXNzPVxcXCInLCBrbGFzcywgJ1xcXCI+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHRcXHRqc29uMmh0bWwodmFsdWUsIGV4cGFuZGVyQ2xhc3NlcyksXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzwvdWw+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcImNsb3NlXFxcIj4nLCBjbG9zZSwgJzwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdCc8L2xpPidcXHJcXG5cXHRcXHRcXHRdLmpvaW4oJycpO1xcclxcblxcdFxcdH1cXHJcXG5cXHRcXHJcXG5cXHRcXHRpZiAodHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdib29sZWFuJykge1xcclxcblxcdFxcdFxcdHJldHVybiBbXFxyXFxuXFx0XFx0XFx0XFx0JzxsaT4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwia2V5XFxcIj5cXFwiJywgZW5jb2RlKGtleSksICdcXFwiOiA8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcIicsIHR5cGUsICdcXFwiPicsIGVuY29kZSh2YWx1ZSksICc8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHRcXHQnPC9saT4nXFxyXFxuXFx0XFx0XFx0XS5qb2luKCcnKTtcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFx0cmV0dXJuIFtcXHJcXG5cXHRcXHRcXHQnPGxpPicsXFxyXFxuXFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJrZXlcXFwiPlxcXCInLCBlbmNvZGUoa2V5KSwgJ1xcXCI6IDwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwiJywgdHlwZSwgJ1xcXCI+XFxcIicsIGVuY29kZSh2YWx1ZSksICdcXFwiPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0JzwvbGk+J1xcclxcblxcdFxcdF0uam9pbignJyk7XFxyXFxuXFx0fTtcXHJcXG5cXHRcXHJcXG5cXHR2YXIganNvbjJodG1sID0gZnVuY3Rpb24gKGpzb24sIGV4cGFuZGVyQ2xhc3Nlcykge1xcclxcblxcdFxcdHZhciBodG1sID0gJyc7XFxyXFxuXFx0XFx0Zm9yICh2YXIga2V5IGluIGpzb24pIHtcXHJcXG5cXHRcXHRcXHRpZiAoIWpzb24uaGFzT3duUHJvcGVydHkoa2V5KSkge1xcclxcblxcdFxcdFxcdFxcdGNvbnRpbnVlO1xcclxcblxcdFxcdFxcdH1cXHJcXG5cXHRcXHJcXG5cXHRcXHRcXHRodG1sID0gW2h0bWwsIGNyZWF0ZUVsZW1lbnQoa2V5LCBqc29uW2tleV0sIHR5cGVvZiBqc29uW2tleV0sIGV4cGFuZGVyQ2xhc3NlcyldLmpvaW4oJycpO1xcclxcblxcdFxcdH1cXHJcXG5cXHRcXHRyZXR1cm4gaHRtbDtcXHJcXG5cXHR9O1xcclxcblxcdFxcclxcblxcdHZhciBnZXRKc29uVmlld2VyID0gZnVuY3Rpb24gKGRhdGEsIG9wdGlvbnMpIHtcXHJcXG5cXHRcXHR0cnkge1xcclxcblxcdFxcdFxcdHJldHVybiBbXFxyXFxuXFx0XFx0XFx0XFx0Jzx1bCBjbGFzcz1cXFwiJywgcHJlZml4LCAnLWNvbnRhaW5lclxcXCI+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHRqc29uMmh0bWwoW0pTT04ucGFyc2UoZGF0YSldLCBnZXRFeHBhbmRlckNsYXNzZXMob3B0aW9ucy5leHBhbmRlZCkpLFxcclxcblxcdFxcdFxcdFxcdCc8L3VsPidcXHJcXG5cXHRcXHRcXHRdLmpvaW4oJycpO1xcclxcblxcdFxcdH0gY2F0Y2ggKGUpIHtcXHJcXG5cXHRcXHRcXHRyZXR1cm4gW1xcclxcblxcdFxcdFxcdFxcdCc8ZGl2IGNsYXNzPVxcXCInLCBwcmVmaXgsICctZXJyb3JcXFwiID4nLCBlLnRvU3RyaW5nKCksICcgPC9kaXY+J1xcclxcblxcdFxcdFxcdF0uam9pbignJyk7XFxyXFxuXFx0XFx0fVxcclxcblxcdH07XFxyXFxuXFx0XFxyXFxuXFx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkYXRhLCBvcHQpIHtcXHJcXG5cXHRcXHR2YXIganNvbiA9ICcnO1xcclxcblxcdFxcdHZhciBvcHRpb25zID0gb3B0IHx8IHtleHBhbmRlZDogdHJ1ZX07XFxyXFxuXFx0XFx0aWYgKHR5cGVvZiBkYXRhID09ICdzdHJpbmcnKSB7XFxyXFxuXFx0XFx0XFx0anNvbiA9IGRhdGE7XFxyXFxuXFx0XFx0fSBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PSAnb2JqZWN0Jykge1xcclxcblxcdFxcdFxcdGpzb24gPSBKU09OLnN0cmluZ2lmeShkYXRhKVxcclxcblxcdFxcdH1cXHJcXG5cXHRcXHRyZXR1cm4gZ2V0SnNvblZpZXdlcihqc29uLCBvcHRpb25zKTtcXHJcXG5cXHR9O1xcclxcblxcblxcbi8qKiovIH1cXG4vKioqKioqLyBdKTtcXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbmRsWW5CaFkyczZMeTh2ZDJWaWNHRmpheTlpYjI5MGMzUnlZWEFnTkRjeFlqRXdaRFEwWTJFM01qZ3daVEV4TkdFaUxDSjNaV0p3WVdOck9pOHZMeTR2YzJOeWFYQjBjeTloY0drdFpYaHdiRzl5WlhJdmRqSXZZMjl0Y0c5dVpXNTBjeTlvYVdkb2JHbG5hSFJLYzI5dUxuZHZjbXRsY2k1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5elkzSnBjSFJ6TDJGd2FTMWxlSEJzYjNKbGNpOTJNaTlqYjIxd2IyNWxiblJ6TDJwemIyNHRjR0Z5YzJVdWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVUZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQkxIVkNRVUZsTzBGQlEyWTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3T3p0QlFVZEJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3T3pzN096czdRVU4wUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxIRkRRVUZ2UXl4bFFVRmxPMEZCUTI1RU8wRkJRMEU3UVVGRFFUczdPenM3T3p0QlEySkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJMRmxCUVZjN1FVRkRXQ3hoUVVGWk96dEJRVVZhTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUjBGQlJUdEJRVU5HTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTEhkQ1FVRjFRanRCUVVOMlFqdEJRVU5CTzBGQlEwRXNSMEZCUlR0QlFVTkdPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltaHBaMmhzYVdkb2RFcHpiMjR1ZDI5eWEyVnlMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUlGeDBMeThnVkdobElHMXZaSFZzWlNCallXTm9aVnh1SUZ4MGRtRnlJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTWdQU0I3ZlR0Y2JseHVJRngwTHk4Z1ZHaGxJSEpsY1hWcGNtVWdablZ1WTNScGIyNWNiaUJjZEdaMWJtTjBhVzl1SUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4b2JXOWtkV3hsU1dRcElIdGNibHh1SUZ4MFhIUXZMeUJEYUdWamF5QnBaaUJ0YjJSMWJHVWdhWE1nYVc0Z1kyRmphR1ZjYmlCY2RGeDBhV1lvYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjBwWEc0Z1hIUmNkRngwY21WMGRYSnVJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTmJiVzlrZFd4bFNXUmRMbVY0Y0c5eWRITTdYRzVjYmlCY2RGeDBMeThnUTNKbFlYUmxJR0VnYm1WM0lHMXZaSFZzWlNBb1lXNWtJSEIxZENCcGRDQnBiblJ2SUhSb1pTQmpZV05vWlNsY2JpQmNkRngwZG1GeUlHMXZaSFZzWlNBOUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhOYmJXOWtkV3hsU1dSZElEMGdlMXh1SUZ4MFhIUmNkR1Y0Y0c5eWRITTZJSHQ5TEZ4dUlGeDBYSFJjZEdsa09pQnRiMlIxYkdWSlpDeGNiaUJjZEZ4MFhIUnNiMkZrWldRNklHWmhiSE5sWEc0Z1hIUmNkSDA3WEc1Y2JpQmNkRngwTHk4Z1JYaGxZM1YwWlNCMGFHVWdiVzlrZFd4bElHWjFibU4wYVc5dVhHNGdYSFJjZEcxdlpIVnNaWE5iYlc5a2RXeGxTV1JkTG1OaGJHd29iVzlrZFd4bExtVjRjRzl5ZEhNc0lHMXZaSFZzWlN3Z2JXOWtkV3hsTG1WNGNHOXlkSE1zSUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4cE8xeHVYRzRnWEhSY2RDOHZJRVpzWVdjZ2RHaGxJRzF2WkhWc1pTQmhjeUJzYjJGa1pXUmNiaUJjZEZ4MGJXOWtkV3hsTG14dllXUmxaQ0E5SUhSeWRXVTdYRzVjYmlCY2RGeDBMeThnVW1WMGRYSnVJSFJvWlNCbGVIQnZjblJ6SUc5bUlIUm9aU0J0YjJSMWJHVmNiaUJjZEZ4MGNtVjBkWEp1SUcxdlpIVnNaUzVsZUhCdmNuUnpPMXh1SUZ4MGZWeHVYRzVjYmlCY2RDOHZJR1Y0Y0c5elpTQjBhR1VnYlc5a2RXeGxjeUJ2WW1wbFkzUWdLRjlmZDJWaWNHRmphMTl0YjJSMWJHVnpYMThwWEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbTBnUFNCdGIyUjFiR1Z6TzF4dVhHNGdYSFF2THlCbGVIQnZjMlVnZEdobElHMXZaSFZzWlNCallXTm9aVnh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NWpJRDBnYVc1emRHRnNiR1ZrVFc5a2RXeGxjenRjYmx4dUlGeDBMeThnWDE5M1pXSndZV05yWDNCMVlteHBZMTl3WVhSb1gxOWNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWNDQTlJRndpWENJN1hHNWNiaUJjZEM4dklFeHZZV1FnWlc1MGNua2diVzlrZFd4bElHRnVaQ0J5WlhSMWNtNGdaWGh3YjNKMGMxeHVJRngwY21WMGRYSnVJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThvTUNrN1hHNWNibHh1WEc0dktpb2dWMFZDVUVGRFN5QkdUMDlVUlZJZ0tpcGNiaUFxS2lCM1pXSndZV05yTDJKdmIzUnpkSEpoY0NBME56RmlNVEJrTkRSallUY3lPREJsTVRFMFlWeHVJQ29xTHlJc0lpOHFLbHh5WEc0Z0tpQkRiMlJsSUdadmNtMWhkQ0IzWldJdGQyOXlhMlZ5WEhKY2JpQXFJRUJ3WVhKaGJTQmxkbVZ1ZEZ4eVhHNGdLaTljY2x4dUx5OGdkbUZ5SUdocFoyaHNhV2RvZEVwemIyNG9LVnh5WEc1MllYSWdhR2xuYUd4cFoyaDBTbk52YmlBOUlISmxjWFZwY21Vb0p5NHZhbk52Ymkxd1lYSnpaU2NwTzF4eVhHNWNjbHh1YjI1dFpYTnpZV2RsSUQwZ1puVnVZM1JwYjI0b1pYWmxiblFwSUh0Y2NseHVJQ0IyWVhJZ1kyOWtaU0E5SUdWMlpXNTBMbVJoZEdFN1hISmNiaUFnTHk4Z2FXMXdiM0owVTJOeWFYQjBjeWduYW5OdmJpMXdZWEp6WlM1cWN5Y3BPMXh5WEc0Z0lIWmhjaUJ5WlhOMWJIUWdQU0JvYVdkb2JHbG5hSFJLYzI5dUtHTnZaR1VzSUh0bGVIQmhibVJsWkRvZ2RISjFaWDBwTzF4eVhHNGdJQzh2SUhaaGNpQnlaWE4xYkhRZ1BVcFRUMDR1YzNSeWFXNW5hV1o1S0dOdlpHVXBPMXh5WEc0Z0lIQnZjM1JOWlhOellXZGxLSEpsYzNWc2RDazdYSEpjYm4wN1hISmNibHh1WEc1Y2JpOHFLaW9xS2lvcUtpb3FLaW9xS2lvcUtseHVJQ29xSUZkRlFsQkJRMHNnUms5UFZFVlNYRzRnS2lvZ0xpOXpZM0pwY0hSekwyRndhUzFsZUhCc2IzSmxjaTkyTWk5amIyMXdiMjVsYm5SekwyaHBaMmhzYVdkb2RFcHpiMjR1ZDI5eWEyVnlMbXB6WEc0Z0tpb2diVzlrZFd4bElHbGtJRDBnTUZ4dUlDb3FJRzF2WkhWc1pTQmphSFZ1YTNNZ1BTQXdYRzRnS2lvdklpd2lkbUZ5SUhCeVpXWnBlQ0E5SUNkMGJTMWpiMlJsSnp0Y2NseHVYSEpjYm5aaGNpQm5aWFJGZUhCaGJtUmxja05zWVhOelpYTWdQU0JtZFc1amRHbHZiaUFvWlhod1lXNWtaV1FwSUh0Y2NseHVYSFJwWmlBb0lXVjRjR0Z1WkdWa0tTQjdYSEpjYmx4MFhIUnlaWFIxY200Z0oyVjRjR0Z1WkdWa0lHTnZiR3hoY0hObFpDQm9hV1JrWlc0bk8xeHlYRzVjZEgxY2NseHVYSFJ5WlhSMWNtNGdKMlY0Y0dGdVpHVmtKenRjY2x4dWZUdGNjbHh1WEhKY2JuWmhjaUJsYm1OdlpHVWdQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXBJSHRjY2x4dVhIUnlaWFIxY200Z1d5YzhjM0JoYmo0bkxDQjJZV3gxWlN3Z0p6d3ZjM0JoYmo0blhTNXFiMmx1S0NjbktUdGNjbHh1ZlR0Y2NseHVYSEpjYm5aaGNpQmpjbVZoZEdWRmJHVnRaVzUwSUQwZ1puVnVZM1JwYjI0Z0tHdGxlU3dnZG1Gc2RXVXNJSFI1Y0dVc0lHVjRjR0Z1WkdWeVEyeGhjM05sY3lrZ2UxeHlYRzVjZEhaaGNpQnJiR0Z6Y3lBOUlDZHZZbXBsWTNRbkxGeHlYRzVjZEZ4MGIzQmxiaUE5SUNkN0p5eGNjbHh1WEhSY2RHTnNiM05sSUQwZ0ozMG5PMXh5WEc1Y2NseHVYSFJwWmlBb1FYSnlZWGt1YVhOQmNuSmhlU2gyWVd4MVpTa3BJSHRjY2x4dVhIUmNkR3RzWVhOeklEMGdKMkZ5Y21GNUp6dGNjbHh1WEhSY2RHOXdaVzRnUFNBbld5YzdYSEpjYmx4MFhIUmpiRzl6WlNBOUlDZGRKenRjY2x4dVhIUjlYSEpjYmx4eVhHNWNkR2xtSUNoMllXeDFaU0E5UFQwZ2JuVnNiQ2tnZTF4eVhHNWNkRngwY21WMGRYSnVJRnRjY2x4dVhIUmNkRngwSnp4c2FUNG5MRnh5WEc1Y2RGeDBYSFJjZENjOGMzQmhiaUJqYkdGemN6MWNJbXRsZVZ3aVBsd2lKeXdnWlc1amIyUmxLR3RsZVNrc0lDZGNJam9nUEM5emNHRnVQaWNzWEhKY2JseDBYSFJjZEZ4MEp6eHpjR0Z1SUdOc1lYTnpQVndpYm5Wc2JGd2lQbHdpSnl3Z1pXNWpiMlJsS0haaGJIVmxLU3dnSjF3aVBDOXpjR0Z1UGljc1hISmNibHgwWEhSY2RDYzhMMnhwUGlkY2NseHVYSFJjZEYwdWFtOXBiaWduSnlrN1hISmNibHgwZlZ4eVhHNWNjbHh1WEhScFppQW9kSGx3WlNBOVBTQW5iMkpxWldOMEp5a2dlMXh5WEc1Y2RGeDBjbVYwZFhKdUlGdGNjbHh1WEhSY2RGeDBKenhzYVQ0bkxGeHlYRzVjZEZ4MFhIUmNkQ2M4YzNCaGJpQmpiR0Z6Y3oxY0lpY3NJR1Y0Y0dGdVpHVnlRMnhoYzNObGN5d2dKMXdpUGp3dmMzQmhiajRuTEZ4eVhHNWNkRngwWEhSY2RDYzhjM0JoYmlCamJHRnpjejFjSW10bGVWd2lQbHdpSnl3Z1pXNWpiMlJsS0d0bGVTa3NJQ2RjSWpvZ1BDOXpjR0Z1UGlBbkxGeHlYRzVjZEZ4MFhIUmNkQ2M4YzNCaGJpQmpiR0Z6Y3oxY0ltOXdaVzVjSWo0bkxDQnZjR1Z1TENBblBDOXpjR0Z1UGlBbkxGeHlYRzVjZEZ4MFhIUmNkQ2M4ZFd3Z1kyeGhjM005WENJbkxDQnJiR0Z6Y3l3Z0oxd2lQaWNzWEhKY2JseDBYSFJjZEZ4MFhIUnFjMjl1TW1oMGJXd29kbUZzZFdVc0lHVjRjR0Z1WkdWeVEyeGhjM05sY3lrc1hISmNibHgwWEhSY2RGeDBKend2ZFd3K0p5eGNjbHh1WEhSY2RGeDBYSFFuUEhOd1lXNGdZMnhoYzNNOVhDSmpiRzl6WlZ3aVBpY3NJR05zYjNObExDQW5QQzl6Y0dGdVBpY3NYSEpjYmx4MFhIUmNkQ2M4TDJ4cFBpZGNjbHh1WEhSY2RGMHVhbTlwYmlnbkp5azdYSEpjYmx4MGZWeHlYRzVjY2x4dVhIUnBaaUFvZEhsd1pTQTlQU0FuYm5WdFltVnlKeUI4ZkNCMGVYQmxJRDA5SUNkaWIyOXNaV0Z1SnlrZ2UxeHlYRzVjZEZ4MGNtVjBkWEp1SUZ0Y2NseHVYSFJjZEZ4MEp6eHNhVDRuTEZ4eVhHNWNkRngwWEhSY2RDYzhjM0JoYmlCamJHRnpjejFjSW10bGVWd2lQbHdpSnl3Z1pXNWpiMlJsS0d0bGVTa3NJQ2RjSWpvZ1BDOXpjR0Z1UGljc1hISmNibHgwWEhSY2RGeDBKenh6Y0dGdUlHTnNZWE56UFZ3aUp5d2dkSGx3WlN3Z0oxd2lQaWNzSUdWdVkyOWtaU2gyWVd4MVpTa3NJQ2M4TDNOd1lXNCtKeXhjY2x4dVhIUmNkRngwSnp3dmJHaytKMXh5WEc1Y2RGeDBYUzVxYjJsdUtDY25LVHRjY2x4dVhIUjlYSEpjYmx4MGNtVjBkWEp1SUZ0Y2NseHVYSFJjZENjOGJHaytKeXhjY2x4dVhIUmNkRngwSnp4emNHRnVJR05zWVhOelBWd2lhMlY1WENJK1hDSW5MQ0JsYm1OdlpHVW9hMlY1S1N3Z0oxd2lPaUE4TDNOd1lXNCtKeXhjY2x4dVhIUmNkRngwSnp4emNHRnVJR05zWVhOelBWd2lKeXdnZEhsd1pTd2dKMXdpUGx3aUp5d2daVzVqYjJSbEtIWmhiSFZsS1N3Z0oxd2lQQzl6Y0dGdVBpY3NYSEpjYmx4MFhIUW5QQzlzYVQ0blhISmNibHgwWFM1cWIybHVLQ2NuS1R0Y2NseHVmVHRjY2x4dVhISmNiblpoY2lCcWMyOXVNbWgwYld3Z1BTQm1kVzVqZEdsdmJpQW9hbk52Yml3Z1pYaHdZVzVrWlhKRGJHRnpjMlZ6S1NCN1hISmNibHgwZG1GeUlHaDBiV3dnUFNBbkp6dGNjbHh1WEhSbWIzSWdLSFpoY2lCclpYa2dhVzRnYW5OdmJpa2dlMXh5WEc1Y2RGeDBhV1lnS0NGcWMyOXVMbWhoYzA5M2JsQnliM0JsY25SNUtHdGxlU2twSUh0Y2NseHVYSFJjZEZ4MFkyOXVkR2x1ZFdVN1hISmNibHgwWEhSOVhISmNibHh5WEc1Y2RGeDBhSFJ0YkNBOUlGdG9kRzFzTENCamNtVmhkR1ZGYkdWdFpXNTBLR3RsZVN3Z2FuTnZibHRyWlhsZExDQjBlWEJsYjJZZ2FuTnZibHRyWlhsZExDQmxlSEJoYm1SbGNrTnNZWE56WlhNcFhTNXFiMmx1S0NjbktUdGNjbHh1WEhSOVhISmNibHgwY21WMGRYSnVJR2gwYld3N1hISmNibjA3WEhKY2JseHlYRzUyWVhJZ1oyVjBTbk52YmxacFpYZGxjaUE5SUdaMWJtTjBhVzl1SUNoa1lYUmhMQ0J2Y0hScGIyNXpLU0I3WEhKY2JseDBkSEo1SUh0Y2NseHVYSFJjZEhKbGRIVnliaUJiWEhKY2JseDBYSFJjZENjOGRXd2dZMnhoYzNNOVhDSW5MQ0J3Y21WbWFYZ3NJQ2N0WTI5dWRHRnBibVZ5WENJK0p5eGNjbHh1WEhSY2RGeDBYSFJxYzI5dU1taDBiV3dvVzBwVFQwNHVjR0Z5YzJVb1pHRjBZU2xkTENCblpYUkZlSEJoYm1SbGNrTnNZWE56WlhNb2IzQjBhVzl1Y3k1bGVIQmhibVJsWkNrcExGeHlYRzVjZEZ4MFhIUW5QQzkxYkQ0blhISmNibHgwWEhSZExtcHZhVzRvSnljcE8xeHlYRzVjZEgwZ1kyRjBZMmdnS0dVcElIdGNjbHh1WEhSY2RISmxkSFZ5YmlCYlhISmNibHgwWEhSY2RDYzhaR2wySUdOc1lYTnpQVndpSnl3Z2NISmxabWw0TENBbkxXVnljbTl5WENJZ1BpY3NJR1V1ZEc5VGRISnBibWNvS1N3Z0p5QThMMlJwZGo0blhISmNibHgwWEhSZExtcHZhVzRvSnljcE8xeHlYRzVjZEgxY2NseHVmVHRjY2x4dVhISmNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNG9aR0YwWVN3Z2IzQjBLU0I3WEhKY2JseDBkbUZ5SUdwemIyNGdQU0FuSnp0Y2NseHVYSFIyWVhJZ2IzQjBhVzl1Y3lBOUlHOXdkQ0I4ZkNCN1pYaHdZVzVrWldRNklIUnlkV1Y5TzF4eVhHNWNkR2xtSUNoMGVYQmxiMllnWkdGMFlTQTlQU0FuYzNSeWFXNW5KeWtnZTF4eVhHNWNkRngwYW5OdmJpQTlJR1JoZEdFN1hISmNibHgwZlNCbGJITmxJR2xtSUNoMGVYQmxiMllnWkdGMFlTQTlQU0FuYjJKcVpXTjBKeWtnZTF4eVhHNWNkRngwYW5OdmJpQTlJRXBUVDA0dWMzUnlhVzVuYVdaNUtHUmhkR0VwWEhKY2JseDBmVnh5WEc1Y2RISmxkSFZ5YmlCblpYUktjMjl1Vm1sbGQyVnlLR3B6YjI0c0lHOXdkR2x2Ym5NcE8xeHlYRzU5TzF4eVhHNWNibHh1WEc0dktpb3FLaW9xS2lvcUtpb3FLaW9xS2lwY2JpQXFLaUJYUlVKUVFVTkxJRVpQVDFSRlVseHVJQ29xSUM0dmMyTnlhWEIwY3k5aGNHa3RaWGh3Ykc5eVpYSXZkakl2WTI5dGNHOXVaVzUwY3k5cWMyOXVMWEJoY25ObExtcHpYRzRnS2lvZ2JXOWtkV3hsSUdsa0lEMGdNVnh1SUNvcUlHMXZaSFZzWlNCamFIVnVhM01nUFNBd1hHNGdLaW92SWwwc0luTnZkWEpqWlZKdmIzUWlPaUlpZlE9PVwiLCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaGlnaGxpZ2h0SnNvbi53b3JrZXIuanNcIik7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL2hpZ2hsaWdodEpzb24ud29ya2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTAzNDM5MTMvaG93LXRvLWNyZWF0ZS1hLXdlYi13b3JrZXItZnJvbS1hLXN0cmluZ1xyXG5cclxudmFyIFVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTDtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihjb250ZW50LCB1cmwpIHtcclxuXHR0cnkge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0dmFyIGJsb2I7XHJcblx0XHRcdHRyeSB7IC8vIEJsb2JCdWlsZGVyID0gRGVwcmVjYXRlZCwgYnV0IHdpZGVseSBpbXBsZW1lbnRlZFxyXG5cdFx0XHRcdHZhciBCbG9iQnVpbGRlciA9IHdpbmRvdy5CbG9iQnVpbGRlciB8fCB3aW5kb3cuV2ViS2l0QmxvYkJ1aWxkZXIgfHwgd2luZG93Lk1vekJsb2JCdWlsZGVyIHx8IHdpbmRvdy5NU0Jsb2JCdWlsZGVyO1xyXG5cdFx0XHRcdGJsb2IgPSBuZXcgQmxvYkJ1aWxkZXIoKTtcclxuXHRcdFx0XHRibG9iLmFwcGVuZChjb250ZW50KTtcclxuXHRcdFx0XHRibG9iID0gYmxvYi5nZXRCbG9iKCk7XHJcblx0XHRcdH0gY2F0Y2goZSkgeyAvLyBUaGUgcHJvcG9zZWQgQVBJXHJcblx0XHRcdFx0YmxvYiA9IG5ldyBCbG9iKFtjb250ZW50XSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG5ldyBXb3JrZXIoVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKSk7XHJcblx0XHR9IGNhdGNoKGUpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBXb3JrZXIoJ2RhdGE6YXBwbGljYXRpb24vamF2YXNjcmlwdCwnICsgZW5jb2RlVVJJQ29tcG9uZW50KGNvbnRlbnQpKTtcclxuXHRcdH1cclxuXHR9IGNhdGNoKGUpIHtcclxuXHRcdHJldHVybiBuZXcgV29ya2VyKHVybCk7XHJcblx0fVxyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBEOi90aWNrZXRtYXN0ZXItYXBpLXN0YWdpbmcuZ2l0aHViLmlvL34vd29ya2VyLWxvYWRlci9jcmVhdGVJbmxpbmVXb3JrZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5gYFxuXHQkKHNlbGVjdG9yKS5zbGljayh7XG5cdFx0ZG90czogZmFsc2UsXG5cdFx0aW5maW5pdGU6IGZhbHNlLFxuXHRcdHNwZWVkOiAzMDAsXG5cdFx0c2xpZGVzVG9TaG93OiAzLFxuXHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxuXHRcdHZhcmlhYmxlV2lkdGg6IHRydWUsXG5cdFx0cmVzcG9uc2l2ZTogW1xuXHRcdFx0e1xuXHRcdFx0XHRicmVha3BvaW50OiAxMDI0LFxuXHRcdFx0XHRzZXR0aW5nczoge1xuXHRcdFx0XHRcdHZhcmlhYmxlV2lkdGg6IHRydWUsXG5cdFx0XHRcdFx0c2xpZGVzVG9TaG93OiAyLFxuXHRcdFx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxuXHRcdFx0XHRcdGluZmluaXRlOiBmYWxzZSxcblx0XHRcdFx0XHRkb3RzOiBmYWxzZVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRicmVha3BvaW50OiA2NzgsXG5cdFx0XHRcdHNldHRpbmdzOiB7XG5cdFx0XHRcdFx0dmFyaWFibGVXaWR0aDogdHJ1ZSxcblx0XHRcdFx0XHRzbGlkZXNUb1Nob3c6IDIsXG5cdFx0XHRcdFx0c2xpZGVzVG9TY3JvbGw6IDFcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0YnJlYWtwb2ludDogNDgwLFxuXHRcdFx0XHRzZXR0aW5nczoge1xuXHRcdFx0XHRcdGNlbnRlck1vZGU6IHRydWUsXG5cdFx0XHRcdFx0dmFyaWFibGVXaWR0aDogdHJ1ZSxcblx0XHRcdFx0XHRzbGlkZXNUb1Nob3c6IDEsXG5cdFx0XHRcdFx0c2xpZGVzVG9TY3JvbGw6IDFcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdF1cblx0fSk7XG5cdC8vICQoc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbi5zbGljay1wcmV2JykudHJpZ2dlcignY2xpY2snKTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9zbGlkZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZnVuY3Rpb24gY2FyZEdyb3VwQ29tcG9uZW50KHBhcmFtcykge1xuXHRzZWxmID0gdGhpcztcblx0dGhpcy51cmwgPSBwYXJhbXMudXJsO1xuXHR0aGlzLnBhbmVsVHlwZSA9IHBhcmFtcy5wYW5lbFR5cGUgfHwgJ2NsZWFyJzsgLy8gbGlzdCxcblx0dGhpcy5nZXRNb3JlID0gcGFyYW1zLmdldE1vcmUgfHwgZmFsc2U7XG5cdHRoaXMuY29sb3IgPSBwYXJhbXMuY29sb3I7XG5cdHRoaXMuaW5kZXggPSBwYXJhbXMuaW5kZXg7XG5cdHRoaXMuc2VjdGlvbnMgPSBrby5vYnNlcnZhYmxlKHBhcmFtcy5kYXRhIHx8IFtdKTtcbn1cblxuY2FyZEdyb3VwQ29tcG9uZW50LnByb3RvdHlwZS5nZXRTdHIgPSBmdW5jdGlvbiAocywgaSkge1xuXHR2YXIgc3RyID0gcztcblx0dmFyIGkwID0gdGhpcy5pbmRleDtcblx0dmFyIGkxID0gaSA/IGkoKSA6ICcnO1xuXHRyZXR1cm4gW1xuXHRcdHN0cixcblx0XHRpMCxcblx0XHRpMVxuXHRdLmpvaW4oJycpO1xufTtcblxuY2FyZEdyb3VwQ29tcG9uZW50LnByb3RvdHlwZS5zZXRBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XG5cdHRoaXMuaXNBY3RpdmUoIXRoaXMuaXNBY3RpdmUoKSk7XG59O1xuXG5jYXJkR3JvdXBDb21wb25lbnQucHJvdG90eXBlLmdldFByZXZQYWdlID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgcGFnZVBhcmFtID0gc2VsZi51cmwoKS5maW5kKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0cmV0dXJuIGl0ZW0ubmFtZSA9PT0gJ3BhZ2UnO1xuXHR9KTtcblx0dmFyIHZhbCA9ICtwYWdlUGFyYW0udmFsdWUoKTtcblx0cGFnZVBhcmFtLnZhbHVlKHZhbCA+IDA/IHZhbCAtIDE6IDApO1xuXHQkKCcjYXBpLWV4cC1nZXQtYnRuJykudHJpZ2dlcignY2xpY2snKTtcbn07XG5cbmNhcmRHcm91cENvbXBvbmVudC5wcm90b3R5cGUuZ2V0TmV4dFBhZ2UgPSBmdW5jdGlvbiAodm0sIGV2ZW50KSB7XG5cdHZhciBwYWdlUGFyYW0gPSBzZWxmLnVybCgpLmZpbmQoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRyZXR1cm4gaXRlbS5uYW1lID09PSAncGFnZSc7XG5cdH0pO1xuXHR2YXIgdmFsID0gK3BhZ2VQYXJhbS52YWx1ZSgpO1xuXHRwYWdlUGFyYW0udmFsdWUodmFsIDwgdGhpcy5pdGVtcy50b3RhbFBhZ2VzIC0gMSA/IHZhbCAgKyAxOiB2YWwpO1xuXHQkKCcjYXBpLWV4cC1nZXQtYnRuJykudHJpZ2dlcignY2xpY2snKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga28uY29tcG9uZW50cy5yZWdpc3RlcignY2FyZEdyb3VwJywge1xuXHR2aWV3TW9kZWw6IGNhcmRHcm91cENvbXBvbmVudCxcblx0dGVtcGxhdGU6XG5cdGA8c2VjdGlvbiBkYXRhLWJpbmQ9XCJmb3JlYWNoOiBzZWN0aW9uc1wiIGNsYXNzPVwicGFuZWwtZ3JvdXBcIj5cblx0XHRcdDxzZWN0aW9uIGRhdGEtYmluZD1cImNzczoge2FjdGl2ZTogaXNBY3RpdmV9XCIgY2xhc3M9XCJwYW5lbCBwYW5lbC1wcmltYXJ5XCI+XG5cdFx0XHRcblx0XHRcdFx0PCEtLXBhbmVsLWhlYWRpbmctLT5cblx0XHRcdFx0PGRpdiBkYXRhLWJpbmQ9XCJjc3M6ICRjb21wb25lbnQuY29sb3IsIGF0dHI6IHtpZDogJGNvbXBvbmVudC5nZXRTdHIoJ2hlYWRpbmcnLCAkaW5kZXgpfVwiXG5cdFx0XHRcdFx0XHRjbGFzcz1cInBhbmVsLWhlYWRpbmdcIlxuXHRcdFx0XHRcdFx0cm9sZT1cInRhYlwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lbC10aXRsZVwiPlxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cImJ0biBidG4taWNvblwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGRhdGEtYmluZD1cImNsaWNrOiAkY29tcG9uZW50LnNldEFjdGl2ZSwgYXR0cjogeydkYXRhLXRhcmdldCc6ICRjb21wb25lbnQuZ2V0U3RyKCcjY29sbGFwc2UnLCAkaW5kZXgpLCAnYXJpYS1jb250cm9scyc6ICRjb21wb25lbnQuZ2V0U3RyKCdjb2xsYXBzZScsICRpbmRleCl9XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZT1cImJ1dHRvblwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRhcmlhLWV4cGFuZGVkPVwidHJ1ZVwiPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBkYXRhLWJpbmQ9XCJjc3M6IHtkb3duOiBpc0FjdGl2ZX1cIiBjbGFzcz1cImJ0biBidG4taWNvbiBzaGV2cm9uIHdoaXRlLXNoZXZyb24tdXBcIj48L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwidGl0bGVcIiBkYXRhLWJpbmQ9XCJ0ZXh0OiBuYW1lXCI+VGl0bGU8L3NwYW4+XG5cdFx0XHRcdFx0XHQ8L2J1dHRvbj5cdFx0XHRcdFxuXHRcdFx0XHRcdFx0PHNwYW4gZGF0YS1iaW5kPVwiaWY6IHBhbmVsVHlwZSA9PT0gJ2xpc3QtZ3JvdXAnXCI+XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGRhdGEtYmluZD1cInRleHQ6IHRvdGFsRWxlbWVudHNcIiBjbGFzcz1cImNvdW50ZXJcIj48L3NwYW4+XG5cdFx0XHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdFx0XHQ8IS0tcGFnZXItLT5cblx0XHRcdFx0XHRcdDxzcGFuIGRhdGEtYmluZD1cImlmOiBuYW1lID09PSAnUGFnZSdcIiA+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwibmF2aWdhdGlvbi13cmFwcGVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBkYXRhLWJpbmQ9XCJjbGljazogJGNvbXBvbmVudC5nZXRQcmV2UGFnZSwgZW5hYmxlOiAhIStpdGVtcy5udW1iZXJcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJuYXZpZ2F0aW9uIHByZXZcIj48L2J1dHRvbj5cblx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uICBkYXRhLWJpbmQ9XCJjbGljazogJGNvbXBvbmVudC5nZXROZXh0UGFnZSwgZW5hYmxlOiAraXRlbXMubnVtYmVyIDwgK2l0ZW1zLnRvdGFsUGFnZXMgLSAxXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibmF2aWdhdGlvbiBuZXh0XCI+PC9idXR0b24+XG5cdFx0XHRcdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+PCEtLXBhbmVsLWhlYWRpbmctLT5cblx0XHRcdFx0XG5cdFx0XHRcdDwhLS1wYW5lbC1ib2R5LS0+XG5cdFx0XHRcdDxkaXYgZGF0YS1iaW5kPVwiYXR0cjoge2lkOiAkY29tcG9uZW50LmdldFN0cignY29sbGFwc2UnLCAkaW5kZXgpLCAnYXJpYS1sYWJlbGxlZGJ5JzogJGNvbXBvbmVudC5nZXRTdHIoJ2hlYWRpbmcnLCAkaW5kZXgpfVwiXG5cdFx0XHRcdFx0Y2xhc3M9XCJwYW5lbC1jb2xsYXBzZSBjb2xsYXBzZVwiXG5cdFx0XHRcdFx0cm9sZT1cInRhYnBhbmVsXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cblx0XHRcdFx0XHQgIFxuXHRcdFx0XHRcdFx0PCEtLWxpc3QtZ3JvdXAtLT5cblx0XHRcdFx0XHRcdDxkaXYgZGF0YS1iaW5kPVwiaWY6IHBhbmVsVHlwZSAmJiBwYW5lbFR5cGUgPT09ICdsaXN0LWdyb3VwJ1wiPlxuXHRcdFx0XHRcdFx0XHQ8dWwgZGF0YS1iaW5kPVwiZm9yZWFjaDogaXRlbXNcIiBjbGFzcz1cImxpc3QtZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGRhdGEtYmluZD1cInRleHQ6IG5hbWVcIiBjbGFzcz1cIm5hbWUgdHJ1bmNhdGVcIj5ldmVudCBuYW1lPC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImFkZGl0aW9uYWwtaW5mb1wiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8cCBkYXRhLWJpbmQ9XCJ0ZXh0OiBPYmplY3QuZ2V0UHJvcCgkZGF0YSwgJ2RhdGVzLnN0YXJ0LmxvY2FsRGF0ZScpXCIgY2xhc3M9XCJkYXRlXCI+ZXZlbnQgZGF0ZTwvcD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gZGF0YS1iaW5kPVwiaWY6IE9iamVjdC5nZXRQcm9wKCRkYXRhLCAnX2VtYmVkZGVkLnZlbnVlc1swXS5uYW1lJylcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8cCBkYXRhLWJpbmQ9XCJ0ZXh0OiBPYmplY3QuZ2V0UHJvcCgkZGF0YSwgJ19lbWJlZGRlZC52ZW51ZXNbMF0ubmFtZScpXCIgY2xhc3M9XCJ2ZW51ZVwiPmV2ZW50IHZlbnVlPC9wPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdDxidXR0b24gZGF0YS1iaW5kPVwiY2xpY2s6ICRjb21wb25lbnQuZ2V0TW9yZS5iaW5kKCRjb21wb25lbnQsICRkYXRhKVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4taWNvbiBibHVlLXNoZXZyb24tcmlnaHRcIj48L2J1dHRvbj5cblx0XHRcdFx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdFx0XHQ8L3VsPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdDwhLS1jbGVhci0tPlxuXHRcdFx0XHRcdFx0PGRpdiBkYXRhLWJpbmQ9XCJpZjogcGFuZWxUeXBlID09PSAnY2xlYXInXCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgZGF0YS1iaW5kPVwiZm9yZWFjaHByb3A6IGl0ZW1zXCIgY2xhc3M9XCJjbGVhclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGIgY2xhc3M9XCJrZXlcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gZGF0YS1iaW5kPVwidGV4dDoga2V5XCI+PC9zcGFuPjombmJzcDtcblx0XHRcdFx0XHRcdFx0XHRcdDwvYj5cblx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGRhdGEtYmluZD1cInRleHQ6IHZhbHVlXCIgY2xhc3M9XCJ2YWx1ZVwiPjwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHQ8L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+PCEtLXBhbmVsLWJvZHktLT5cblx0XHRcdFx0XHRcblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L3NlY3Rpb24+XG5cdDwvc2VjdGlvbj5gXG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL2FjY29yZGlvbi5jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZnVuY3Rpb24gY2FyZENvbXBvbmVudChwYXJhbXMpIHtcblx0c2VsZiA9IHRoaXM7XG5cblx0dGhpcy5nZXRNb3JlID0gcGFyYW1zLmdldE1vcmUgfHwgZmFsc2U7XG5cdHRoaXMuY29sb3IgPSBwYXJhbXMuY29sb3I7XG5cdHRoaXMuaW5kZXggPSBwYXJhbXMuaW5kZXg7XG5cdHZhciBkYXRhID0gcGFyYW1zLmRhdGEgfHwgW107XG5cblx0dGhpcy52aWV3TW9kZWwgPSBrby5vYnNlcnZhYmxlQXJyYXkoW1xuXHRcdHtcblx0XHRcdHNlY3Rpb25UaXRsZTogJ0V2ZW50Jyxcblx0XHRcdGlzQWN0aXZlOiBrby5vYnNlcnZhYmxlKGZhbHNlKSxcblx0XHRcdGl0ZW1zOiB7fVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0c2VjdGlvblRpdGxlOiAnUHJpY2UgUmFuZ2VzJyxcblx0XHRcdGlzQWN0aXZlOiBrby4gb2JzZXJ2YWJsZShmYWxzZSksXG5cdFx0XHRpdGVtczoge31cblx0XHR9LFxuXHRcdHtcblx0XHRcdHNlY3Rpb25UaXRsZTogJ1Byb21vdGVyJyxcblx0XHRcdGlzQWN0aXZlOiBrby4gb2JzZXJ2YWJsZShmYWxzZSksXG5cdFx0XHRpdGVtczoge31cblx0XHR9LFxuXHRcdHtcblx0XHRcdHNlY3Rpb25UaXRsZTogJ0RhdGVzJyxcblx0XHRcdGlzQWN0aXZlOiBrby4gb2JzZXJ2YWJsZShmYWxzZSksXG5cdFx0XHRpdGVtczoge31cblx0XHR9LFxuXHRcdHtcblx0XHRcdHNlY3Rpb25UaXRsZTogJ1NhbGVzJyxcblx0XHRcdGlzQWN0aXZlOiBrby4gb2JzZXJ2YWJsZShmYWxzZSksXG5cdFx0XHRpdGVtczoge31cblx0XHR9LFxuXHRcdHtcblx0XHRcdHNlY3Rpb25UaXRsZTogJ0ltYWdlcycsXG5cdFx0XHRpc0FjdGl2ZToga28uIG9ic2VydmFibGUoZmFsc2UpLFxuXHRcdFx0aXRlbXM6IHt9XG5cdFx0fSxcblx0XHR7XG5cdFx0XHRzZWN0aW9uVGl0bGU6ICdWZW51ZXMnLFxuXHRcdFx0aXNBY3RpdmU6IGtvLiBvYnNlcnZhYmxlKGZhbHNlKSxcblx0XHRcdGl0ZW1zOiB7fVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0c2VjdGlvblRpdGxlOiAnQXR0cmFjdGlvbnMnLFxuXHRcdFx0aXNBY3RpdmU6IGtvLiBvYnNlcnZhYmxlKGZhbHNlKSxcblx0XHRcdGl0ZW1zOiB7fVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0c2VjdGlvblRpdGxlOiAnQ2xhc3NpZmljYXRpb25zJyxcblx0XHRcdGlzQWN0aXZlOiBrby4gb2JzZXJ2YWJsZShmYWxzZSksXG5cdFx0XHRpdGVtczoge31cblx0XHR9XG5cdF0pO1xuXG5cdGZvciAodmFyIHByb3AgaW4gZGF0YSkge1xuXHRcdGlmICghZGF0YS5oYXNPd25Qcm9wZXJ0eShwcm9wKSkgY29udGludWU7XG5cdFx0aWYgKHR5cGVvZiBkYXRhW3Byb3BdICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0dGhpcy52aWV3TW9kZWwoKVswXS5pdGVtc1twcm9wXSA9IGRhdGFbcHJvcF07XG5cdFx0fVxuXHR9XG4gIC8vXG5cdC8vIGNvbnNvbGUubG9nKHRoaXMudmlld01vZGVsKCkpO1xuICAvL1xuICAvL1xuXHQvLyB0aGlzLnZpZXdNb2RlbCh0aGlzLnZpZXdNb2RlbCgpLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHQvLyBcdHJldHVybiBpdGVtLmlzQXJyYXkgPSBpdFxuXHQvLyB9KSk7XG5cbn1cblxuXG4vKlxuICovXG5cbmNhcmRDb21wb25lbnQucHJvdG90eXBlLmdldFN0ciA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXHRyZXR1cm4gYXJncy5qb2luKCctJyk7XG59O1xuXG5jYXJkQ29tcG9uZW50LnByb3RvdHlwZS5zZXRBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XG5cdHRoaXMuaXNBY3RpdmUoIXRoaXMuaXNBY3RpdmUoKSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2NhcmQnLCB7XG5cdHZpZXdNb2RlbDogY2FyZENvbXBvbmVudCxcblx0dGVtcGxhdGU6XG5cdGA8c2VjdGlvbiBkYXRhLWJpbmQ9XCJmb3JlYWNoOiB2aWV3TW9kZWxcIiBjbGFzcz1cInBhbmVsLWdyb3VwXCI+XG5cdFx0XHQ8c2VjdGlvbiBkYXRhLWJpbmQ9XCJjc3M6IHthY3RpdmU6IGlzQWN0aXZlfVwiIGNsYXNzPVwicGFuZWwgcGFuZWwtcHJpbWFyeVwiPlxuXHRcdFx0XG5cdFx0XHRcdDwhLS1wYW5lbC1oZWFkaW5nLS0+XG5cdFx0XHRcdDxkaXYgZGF0YS1iaW5kPVwiY3NzOiAkY29tcG9uZW50LmNvbG9yLCBhdHRyOiB7aWQ6ICRjb21wb25lbnQuZ2V0U3RyKCdoZWFkaW5nJywgJGNvbXBvbmVudC5pbmRleCwgJGluZGV4KCkpfVwiXG5cdFx0XHRcdFx0XHRjbGFzcz1cInBhbmVsLWhlYWRpbmdcIlxuXHRcdFx0XHRcdFx0cm9sZT1cInRhYlwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lbC10aXRsZVwiPlxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cImJ0biBidG4taWNvblwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGRhdGEtYmluZD1cImNsaWNrOiAkY29tcG9uZW50LnNldEFjdGl2ZSwgYXR0cjogeydkYXRhLXRhcmdldCc6ICRjb21wb25lbnQuZ2V0U3RyKCcjY29sbGFwc2UnLCAgJGNvbXBvbmVudC5pbmRleCwgJGluZGV4KCkpLCAnYXJpYS1jb250cm9scyc6ICRjb21wb25lbnQuZ2V0U3RyKCdjb2xsYXBzZScsICAkY29tcG9uZW50LmluZGV4LCAkaW5kZXgoKSl9XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZT1cImJ1dHRvblwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRhcmlhLWV4cGFuZGVkPVwidHJ1ZVwiPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBkYXRhLWJpbmQ9XCJjc3M6IHtkb3duOiBpc0FjdGl2ZX1cIiBjbGFzcz1cImJ0biBidG4taWNvbiBzaGV2cm9uIHdoaXRlLXNoZXZyb24tdXBcIj48L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwidGl0bGVcIiBkYXRhLWJpbmQ9XCJ0ZXh0OiBzZWN0aW9uVGl0bGVcIj5UaXRsZTwvc3Bhbj5cblx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj48IS0tcGFuZWwtaGVhZGluZy0tPlxuXHRcdFx0XHRcblx0XHRcdFx0PCEtLXBhbmVsLWJvZHktLT5cblx0XHRcdFx0PGRpdiBkYXRhLWJpbmQ9XCJhdHRyOiB7aWQ6ICRjb21wb25lbnQuZ2V0U3RyKCdjb2xsYXBzZScsICRjb21wb25lbnQuaW5kZXgsICRpbmRleCgpKSwgJ2FyaWEtbGFiZWxsZWRieSc6ICRjb21wb25lbnQuZ2V0U3RyKCdoZWFkaW5nJywgICRjb21wb25lbnQuaW5kZXgsICRpbmRleCgpKX1cIlxuXHRcdFx0XHRcdGNsYXNzPVwicGFuZWwtY29sbGFwc2UgY29sbGFwc2VcIlxuXHRcdFx0XHRcdHJvbGU9XCJ0YWJwYW5lbFwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQ8IS0tcHJpbWl0aXZlcy0tPlxuXHRcdFx0XHRcdFx0PHNwYW4gZGF0YS1iaW5kPVwiaWY6IHNlY3Rpb25UaXRsZSA9PT0gJ0V2ZW50J1wiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGRhdGEtYmluZD1cImZvcmVhY2hwcm9wOiBpdGVtc1wiIGNsYXNzPVwiY2xlYXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cD5cblx0XHRcdFx0XHRcdFx0XHRcdDxiIGNsYXNzPVwia2V5XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGRhdGEtYmluZD1cInRleHQ6IGtleVwiPjwvc3Bhbj46Jm5ic3A7XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2I+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBkYXRhLWJpbmQ9XCJ0ZXh0OiB2YWx1ZVwiIGNsYXNzPVwidmFsdWVcIj48L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0PCEtLSZsdDshJm5kYXNoO29iamVjdCZuZGFzaDsmZ3Q7LS0+XG5cdFx0XHRcdFx0XHQ8IS0tPHNwYW4gZGF0YS1iaW5kPVwiaWY6IG5hbWUgPT09ICdQcmljZSBSYW5nZXNcIlwiPi0tPlxuXHRcdFx0XHRcdFx0XHQ8IS0tJmx0OyEmbmRhc2g7Y2xlYXImbmRhc2g7Jmd0Oy0tPlxuXHRcdFx0XHRcdFx0XHQ8IS0tPGRpdiBkYXRhLWJpbmQ9XCJmb3JlYWNoOiBpdGVtc1wiIGNsYXNzPVwiY2xlYXJcIj4tLT5cblx0XHRcdFx0XHRcdFx0XHQ8IS0tPHA+LS0+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8IS0tPHA+JGRhdGE8L3A+LS0+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8IS0tJmx0OyEmbmRhc2g7PHNwYW4gZGF0YS1iaW5kPVwidGV4dDogdmFsdWVcIiBjbGFzcz1cInZhbHVlXCI+PC9zcGFuPiZuZGFzaDsmZ3Q7LS0+XG5cdFx0XHRcdFx0XHRcdFx0PCEtLTwvcD4tLT5cblx0XHRcdFx0XHRcdFx0PCEtLTwvZGl2Pi0tPlxuXHRcdFx0XHRcdFx0PCEtLTwvc3Bhbj4tLT5cblx0XHRcdFx0XHQ8L2Rpdj48IS0tcGFuZWwtYm9keS0tPlxuXHRcdFx0XHRcdFxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvc2VjdGlvbj5cblx0PC9zZWN0aW9uPmBcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvY2FyZC5jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXHJcbiAqIEN1c3RvbSBTZWxlY3QgY29tcG9uZW50XHJcbiAqL1xyXG52YXIgc2VsZjtcclxuXHJcbi8qKlxyXG4gKiBDdXN0b20gU2VsZWN0IFZpZXctTW9kZWxcclxuICogQHBhcmFtIHBhcmFtc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIEN1c3RvbVNlbGVjdChwYXJhbXMpIHtcclxuICBzZWxmID0gdGhpcztcclxuXHJcbiAgdGhpcy5hbmltYXRpb25TcGVlZCA9IHBhcmFtcy5hbmltYXRpb25TcGVlZCB8fCAyMDA7XHJcblx0dGhpcy5jdXJlbnRTZWxlY3REYXRhID0gcGFyYW1zLmRhdGEgfHwgbnVsbDtcclxuXHR0aGlzLm9uRm9jdXMgPSBwYXJhbXMuZm9jdXMgfHwgbnVsbDtcclxuXHRcclxuICAvL29ic2VydmFibGVzXHJcbiAgdGhpcy5zZWxlY3RNb2RlbCA9IHR5cGVvZiBwYXJhbXMub3B0aW9ucyAhPT0nZnVuY3Rpb24nID8ga28ub2JzZXJ2YWJsZUFycmF5KHBhcmFtcy5vcHRpb25zKTogIHBhcmFtcy5vcHRpb25zO1xyXG4gIHRoaXMucGxhY2Vob2xkZXIgPSBrby5vYnNlcnZhYmxlKHBhcmFtcy5wbGFjZWhvbGRlciB8fCAnJyk7XHJcbiAgdGhpcy5vbnNlbGVjdCA9IHBhcmFtcy5vbnNlbGVjdCB8fCBmdW5jdGlvbiAoaXRlbSkgeyBjb25zb2xlLmxvZyhpdGVtICsnc2VsZWN0ZWQhJyl9O1xyXG4gIHRoaXMuc2VsZWN0ZWQgPSBrby5vYnNlcnZhYmxlKHRoaXMuc2VsZWN0TW9kZWwoKVswXSk7XHJcbiAgdGhpcy5pc09uZU9wdGlvbiA9IGtvLnB1cmVDb21wdXRlZChmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RNb2RlbCgpLmxlbmd0aCA8IDI7IC8vIG1vcmUgdGhhbiBvbmUgb3B0aW9uXHJcbiAgfSwgdGhpcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRFbGVtZW50KGV2ZW50KSB7XHJcbiAgdmFyIHBhcmVudCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkucGFyZW50cygnLmpzLWN1c3RvbS1zZWxlY3QnKTtcclxuICByZXR1cm4ge1xyXG4gICAgd3JhcHBlcjogcGFyZW50LmZpbmQoJy5qcy1jdXN0b20tc2VsZWN0LXdyYXBwZXInKSxcclxuICAgIGxheWVyOiBwYXJlbnQuZmluZCgnLmpzLWN1c3RvbS1zZWxlY3QtbGF5ZXInKVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEN1c3RvbSBTZWxlY3QgVmlldy1Nb2RlbCBtZXRob2RcclxuICogQHBhcmFtIHZpZXdNb2RlbFxyXG4gKiBAcGFyYW0gZXZlbnRcclxuICovXHJcbkN1c3RvbVNlbGVjdC5wcm90b3R5cGUuc2xpZGVUb2dnbGUgPSBmdW5jdGlvbih2aWV3TW9kZWwsIGV2ZW50KSB7XHJcblx0Ly8gZWxlbSBpbiBmb2N1cyBlbXVsYXRpb25cclxuXHR0aGlzLm9uRm9jdXMgJiYgdGhpcy5vbkZvY3VzKHRoaXMuY3VyZW50U2VsZWN0RGF0YSk7XHJcblxyXG5cdGlmICh0aGlzLmlzT25lT3B0aW9uKCkpIHtyZXR1cm4gZmFsc2U7fVxyXG4gIHZhciBlbCA9IGZpbmRFbGVtZW50KGV2ZW50KTtcclxuICAgIGVsLndyYXBwZXIuc2xpZGVUb2dnbGUodmlld01vZGVsLmFuaW1hdGlvblNwZWVkKTtcclxuICAgIGVsLmxheWVyLnRvZ2dsZUNsYXNzKCdoaWRkZW4nKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDdXN0b20gU2VsZWN0IFZpZXctTW9kZWwgbWV0aG9kXHJcbiAqIEBwYXJhbSBpdGVtXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuQ3VzdG9tU2VsZWN0LnByb3RvdHlwZS5zZWxlY3RJdGVtID0gZnVuY3Rpb24gKGl0ZW0sIGV2ZW50KSB7XHJcbiAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gIHRoaXMuc2VsZWN0ZWQoaXRlbSk7XHJcbiAgLy8gcnVuIGhhbmRsZXJcclxuICB0aGlzLm9uc2VsZWN0KGl0ZW0pO1xyXG5cdC8vIHNsaWRlIHVwXHJcbiAgdGhpcy5zbGlkZVRvZ2dsZShzZWxmLCBldmVudCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2N1c3RvbS1zZWxlY3QnLCB7XHJcbiAgdmlld01vZGVsOiBDdXN0b21TZWxlY3QsXHJcbiAgdGVtcGxhdGU6IChbXHJcbiAgICAnPGRpdiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdCBqcy1jdXN0b20tc2VsZWN0XCI+JyxcclxuICAgICAgJzxkaXYgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3Qtd3JhcHBlclwiPicsXHJcbiAgICAgICAgJzxzZWxlY3QgZGF0YS1iaW5kPVwib3B0aW9uczogc2VsZWN0TW9kZWwsIG9wdGlvbnNUZXh0OiBcXCduYW1lXFwnLCB2YWx1ZTogc2VsZWN0ZWRcIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9fZmllbGRcIiBuYW1lPVwiYXBpLWV4cC1tZXRob2RcIj48L3NlbGVjdD4nLFxyXG4gICAgICAgICc8c3BhbiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9fcGxhY2Vob2xkZXJcIj4nLFxyXG4gICAgICAgICAgJzxpbnB1dCBkYXRhLWJpbmQ9XCJldmVudDoge2NsaWNrOiBzbGlkZVRvZ2dsZX0sIGF0dHI6IHt2YWx1ZTogc2VsZWN0ZWQoKS5uYW1lLCBkaXNhYmxlZDogaXNPbmVPcHRpb259XCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIlwiIHJlYWRvbmx5PVwiXCI+JyxcclxuICAgICAgICAgICc8YiBkYXRhLWJpbmQ9XCJjc3M6IHtoaWRkZW46IGlzT25lT3B0aW9ufVwiIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19jaGV2cm9uXCI+Jm5ic3A7PC9iPicsXHJcbiAgICAgICAgJzwvc3Bhbj4nLFxyXG4gICAgICAgICc8dWwgZGF0YS1iaW5kPVwiZm9yZWFjaDogc2VsZWN0TW9kZWxcIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9fbGlzdCBqcy1jdXN0b20tc2VsZWN0LXdyYXBwZXJcIj4nLFxyXG4gICAgICAgICAgJzxsaSBkYXRhLWJpbmQ9XCJjc3M6IHtcXCdhY3RpdmVcXCc6IGNoZWNrZWR9XCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2l0ZW1cIj4nLFxyXG4gICAgICAgICAgICAnPGJ1dHRvbiBkYXRhLWJpbmQ9XCJldmVudDoge2NsaWNrOiAkcGFyZW50LnNlbGVjdEl0ZW0uYmluZCgkcGFyZW50KX0sIHRleHQ6IG5hbWUsIGNzczoge1xcJ2FjdGl2ZVxcJzogY2hlY2tlZCgpfSwgYXR0cjoge1xcJ2RhdGEtdmFsdWVcXCc6IG5hbWV9XCIgIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19pdGVtLWxhYmVsXCIgaHJlZj1cIiNcIj48L2J1dHRvbj4nLFxyXG4gICAgICAgICAgICAvLyAnPHNwYW4gZGF0YS1iaW5kPVwiaWY6IGxpbmtcIj4nLFxyXG4gICAgICAgICAgICBcdCc8YSBkYXRhLWJpbmQ9XCJhdHRyOiB7aHJlZjogbGlua30sIGNzczoge1xcJ2hpZGRlblxcJzogIWxpbmt9XCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2l0ZW0tbGlua1wiIHRhcmdldD1cIl9ibGFua1wiPiZuYnNwOzwvYT4nLFxyXG4gICAgICAgICAgICAvLyAnPC9zcGFuPicsXHJcbiAgICAgICAgICAnPC9saT4nLFxyXG4gICAgICAgICc8L3VsPicsXHJcbiAgICAgICc8L2Rpdj4nLFxyXG4gICAgICAnPGRpdiBkYXRhLWJpbmQ9XCJjbGljazogc2xpZGVUb2dnbGVcIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdC1sYXllciBqcy1jdXN0b20tc2VsZWN0LWxheWVyIGhpZGRlblwiPjwvZGl2PicsXHJcbiAgICAnPC9kaXY+J1xyXG4gIF0pLmpvaW4oJycpXHJcbn0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9jdXN0b21TZWxlY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==