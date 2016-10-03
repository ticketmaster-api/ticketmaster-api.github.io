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
	// Components
	var base = __webpack_require__(2);
	var apiKey = __webpack_require__(3);
	var ajaxService = __webpack_require__(4);
	
	// View Models
	var MenuViewModel = __webpack_require__(5);
	var ParamsViewModel = __webpack_require__(7);
	var MethodsViewModel = __webpack_require__(8);
	var RequestsListViewModel = __webpack_require__(9);
	
	// Modules
	var customSelect = __webpack_require__(10);
	
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
	
	  // sub-models
	  this.menu = new MenuViewModel(base, this.selectedCategory);
	  this.methods = new MethodsViewModel(base, this.selectedCategory, this.selectedMethod);
	  this.params = new ParamsViewModel(base, this.selectedMethod, this.selectedParams);
	  this.requestsList = new RequestsListViewModel(this.requests);
	
	  // computed
	  this.sendButtonText = ko.pureComputed(this.getMethodName, this);
	  
	  this.URL = ko.computed(this.getUrl, this);
	}
	
	/**
	 * Send request method
	 */
	AppViewModel.prototype.onClickSendBtn = function () {
	  ajaxService(this.URL(), this.requests);
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
/* 3 */
/***/ function(module, exports) {

	var apiKey = sessionStorage.getItem('tk-api-key') || "7elxdku9GGG5k8j0Xm8KWdANDgecHMV0"; //API Key
	
	module.exports = {
	  name: 'apikey',
	  style: 'query',
	  value: ko.observable(apiKey)
	};

/***/ },
/* 4 */
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
	var sendPrimaryRequest = function (arr, requests) {
	  console.clear();
	  var url = prepareUrl(arr);
	  // console.log(url);
	
	  ajaxService(url, arr[0].method, function(response, message) {
	    if (message == 'error') {
	      var err = response && response.responseJSON && response.responseJSON.errors && response.responseJSON.errors[0];
	      console.warn(message, response.status);
	      if (err) {
	        console.warn(err.code);
	        console.warn(err.detail);
	      } else {
	        console.warn(response);
	      }
	    } else {
	
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
				var max = colors.length - 1;
				var index = requests.length;
	
				requests.push({
					request: url,
					color: colors[index % max],
					response: response.responseJSON
				})
	    }
	  });
	};
	
	
	module.exports = sendPrimaryRequest;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var hf = __webpack_require__(6);
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
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var self;
	var base;
	var hf = __webpack_require__(6);
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
				return !!this.value().trim().length;
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var hf = __webpack_require__(6);
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
		console.log(this.methodsViewModel());
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
/* 9 */
/***/ function(module, exports) {

	
	function RequestsListViewModel(requests) {
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
	
		this.requests = requests;
	
		this.clearBtnIsVisible = ko.computed(function () {
			return this.requests().length > 0;
		}, this);
		
		this.requests(this.requests().map(function (obj, index) {
			var max = colors.length - 1;
			obj.color = colors[index % max];
			return obj;
		}));
	}
	
	RequestsListViewModel.prototype.onClearRequests = function (vm, event) {
		this.requests([]);
	};
	
	
	RequestsListViewModel.prototype.method = function (category) {
	};
	
	module.exports = RequestsListViewModel;


/***/ },
/* 10 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmNhNjBiN2Q2NzBjNGFkMjdiNjMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9tYWluLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL2FwaWtleS5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL2FqYXhTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL1ZpZXdNb2RlbHMvbWVudVZpZXdNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL2hlbHBlckZ1bmMuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9wYXJhbXNWaWV3TW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9tZXRob2RzVmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL1ZpZXdNb2RlbHMvcmVxdWVzdHNMaXN0Vmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvY3VzdG9tU2VsZWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakZBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNI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QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBOzs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1REFBc0Q7QUFDdEQ7QUFDQTtBQUNBLDBDQUF5QztBQUN6QyxJQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsbUJBQW1CLFNBQVMsOENBQThDO0FBQy9HLGdDQUErQixvQkFBb0IsK0NBQStDO0FBQ2xHO0FBQ0E7QUFDQSxpQ0FBZ0Msb0JBQW9CO0FBQ3BELHlDQUF3Qyx3Q0FBd0Msb0JBQW9CLHNCQUFzQixTQUFTLHFCQUFxQjtBQUN4SjtBQUNBLG9DQUFtQyxXQUFXLFFBQVEsa0JBQWtCLGlFQUFpRTtBQUN6STtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBiY2E2MGI3ZDY3MGM0YWQyN2I2M1xuICoqLyIsIi8qKlxuICogTWFpbiBmaWxlIGZvciBBcGkgRXhwbHJlciB2Mi4wXG4gKiBGb3IgZGV2ZWxvcG1lbnQgcGxlYXNlIHVzZSBXZWJwYWNrIHRvIGJ1bmRsZSBhbGwgbW9kdWxlc1xuICogSXQgY2FuIGJlIG1hZGUgdXNpbmcgbnBtIHNjcmlwdHMgY21kIC0gJ3dlYnBhY2snXG4gKi9cbi8vIENvbXBvbmVudHNcbnZhciBiYXNlID0gcmVxdWlyZSgnLi8uLi9jb21wb25lbnRzL2Jhc2UnKTtcbnZhciBhcGlLZXkgPSByZXF1aXJlKCcuLy4uL2NvbXBvbmVudHMvYXBpa2V5Jyk7XG52YXIgYWpheFNlcnZpY2UgPSByZXF1aXJlKCcuLy4uL2NvbXBvbmVudHMvYWpheFNlcnZpY2UnKTtcblxuLy8gVmlldyBNb2RlbHNcbnZhciBNZW51Vmlld01vZGVsID0gcmVxdWlyZSgnLi8uLi9WaWV3TW9kZWxzL21lbnVWaWV3TW9kZWwnKTtcbnZhciBQYXJhbXNWaWV3TW9kZWwgPSByZXF1aXJlKCcuL3BhcmFtc1ZpZXdNb2RlbCcpO1xudmFyIE1ldGhvZHNWaWV3TW9kZWwgPSByZXF1aXJlKCcuL21ldGhvZHNWaWV3TW9kZWwnKTtcbnZhciBSZXF1ZXN0c0xpc3RWaWV3TW9kZWwgPSByZXF1aXJlKCcuL3JlcXVlc3RzTGlzdFZpZXdNb2RlbCcpO1xuXG4vLyBNb2R1bGVzXG52YXIgY3VzdG9tU2VsZWN0ID0gcmVxdWlyZSgnLi8uLi9jb21wb25lbnRzL2N1c3RvbVNlbGVjdCcpO1xuXG4vKipcbiAqIE1haW4gYXBwbGljYXRpb24gdmlldy1tb2RlbFxuICogQHBhcmFtIG9iaiB7b2JqZWN0fSBnbG9iYWwgZGF0YSBvYmplY3RcbiAqL1xuZnVuY3Rpb24gQXBwVmlld01vZGVsKG9iaikge1xuICB2YXIgYmFzZSA9IG9iaiB8fCB7fTtcbiAgc2VsZiA9IHRoaXM7XG4gIHRoaXMuYXBpS2V5ID0gYXBpS2V5O1xuXG4gIC8vIG9ic2VydmFibGVzXG4gIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSA9IGtvLm9ic2VydmFibGUoJycpO1xuICB0aGlzLnNlbGVjdGVkTWV0aG9kID0ga28ub2JzZXJ2YWJsZSgnJyk7XG4gIHRoaXMuc2VsZWN0ZWRQYXJhbXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xuXHR0aGlzLnJlcXVlc3RzID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcblxuICAvLyBzdWItbW9kZWxzXG4gIHRoaXMubWVudSA9IG5ldyBNZW51Vmlld01vZGVsKGJhc2UsIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSk7XG4gIHRoaXMubWV0aG9kcyA9IG5ldyBNZXRob2RzVmlld01vZGVsKGJhc2UsIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSwgdGhpcy5zZWxlY3RlZE1ldGhvZCk7XG4gIHRoaXMucGFyYW1zID0gbmV3IFBhcmFtc1ZpZXdNb2RlbChiYXNlLCB0aGlzLnNlbGVjdGVkTWV0aG9kLCB0aGlzLnNlbGVjdGVkUGFyYW1zKTtcbiAgdGhpcy5yZXF1ZXN0c0xpc3QgPSBuZXcgUmVxdWVzdHNMaXN0Vmlld01vZGVsKHRoaXMucmVxdWVzdHMpO1xuXG4gIC8vIGNvbXB1dGVkXG4gIHRoaXMuc2VuZEJ1dHRvblRleHQgPSBrby5wdXJlQ29tcHV0ZWQodGhpcy5nZXRNZXRob2ROYW1lLCB0aGlzKTtcbiAgXG4gIHRoaXMuVVJMID0ga28uY29tcHV0ZWQodGhpcy5nZXRVcmwsIHRoaXMpO1xufVxuXG4vKipcbiAqIFNlbmQgcmVxdWVzdCBtZXRob2RcbiAqL1xuQXBwVmlld01vZGVsLnByb3RvdHlwZS5vbkNsaWNrU2VuZEJ0biA9IGZ1bmN0aW9uICgpIHtcbiAgYWpheFNlcnZpY2UodGhpcy5VUkwoKSwgdGhpcy5yZXF1ZXN0cyk7XG59O1xuXG4vKipcbiAqIEdldHMgY3VycmVudCBtZXRob2QgbmFtZVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuQXBwVmlld01vZGVsLnByb3RvdHlwZS5nZXRNZXRob2ROYW1lID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5zZWxlY3RlZE1ldGhvZCgpLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xufTtcblxuLyoqXG4gKiBHZXRzIHJhdyB1cmwgZGF0YSBhcnJheVxuICogQHJldHVybnMgeypbXX1cbiAqL1xuQXBwVmlld01vZGVsLnByb3RvdHlwZS5nZXRVcmwgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBbXG4gICAgdGhpcy5zZWxlY3RlZE1ldGhvZCgpLFxuICAgIHRoaXMuYXBpS2V5LFxuICAgIHRoaXMuc2VsZWN0ZWRQYXJhbXMoKVxuICBdO1xufTtcblxuLyoqXG4gKiBBY3RpdmF0ZXMga25vY2tvdXQuanNcbiAqL1xua28uYXBwbHlCaW5kaW5ncyhuZXcgQXBwVmlld01vZGVsKGJhc2UpKTtcblxuLyoqXG4gKiBleHBvcnRzIGdsb2JhbCB2YXJpYWJsZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2U7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9tYWluLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGJhc2UgPSB7fTtcclxudmFyIENPTkZJR19VUkwgPSAnLi4vLi4vYXBpZGVzY3JpcHRpb24ueG1sJztcclxuXHJcbnZhciBwYXJzZURhdGEgPSBmdW5jdGlvbiAoeG1sKSB7XHJcblx0dmFyIGdsb2JhbCA9IHt9O1xyXG5cdC8vZ2V0IGFsbCBBUElzXHJcblx0dmFyIHJlc291cmNlc0VsID0gJCh4bWwpLmZpbmQoXCJyZXNvdXJjZXNcIikuZXEoMCk7XHJcblxyXG5cdC8vIHJlc291cmNlXHJcblx0JCh4bWwpXHJcblx0XHQuZmluZChcInJlc291cmNlXCIpXHJcblx0XHQuZ2V0KClcclxuXHRcdC5tYXAoZnVuY3Rpb24gKHJlcykge1xyXG5cdFx0XHR2YXIgcmVzb3VyY2UgPSAkKHJlcyk7XHJcblx0XHRcdC8vIG1ldGhvZCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHR2YXIgbWV0aG9kRWxlbSA9IHJlc291cmNlLmZpbmQoXCJtZXRob2RcIikuZXEoMCk7XHJcblxyXG5cdFx0XHR2YXIgbWV0aG9kID0ge1xyXG5cdFx0XHRcdGlkIDogbWV0aG9kRWxlbS5hdHRyKFwiaWRcIiksIC8vIG1ldGhvZCBpZFxyXG5cdFx0XHRcdG5hbWUgOiBtZXRob2RFbGVtLmF0dHIoXCJhcGlnZWU6ZGlzcGxheU5hbWVcIikgfHwgbWV0aG9kRWxlbS5hdHRyKFwiaWRcIiksIC8vIG1ldGhvZCBuYW1lXHJcblx0XHRcdFx0bWV0aG9kIDogbWV0aG9kRWxlbS5hdHRyKCduYW1lJyksIC8vIEdFVCBvciBQT1NUXHJcblx0XHRcdFx0Y2F0ZWdvcnkgOiBtZXRob2RFbGVtLmZpbmQoJ1twcmltYXJ5PVwidHJ1ZVwiXScpLnRleHQoKS50cmltKCksIC8vIEFQSSBuYW1lXHJcblx0XHRcdFx0cGF0aDogcmVzb3VyY2UuYXR0cigncGF0aCcpLCAvLyBtZXRob2QgVVJMXHJcblx0XHRcdFx0YmFzZSA6IHJlc291cmNlc0VsLmF0dHIoJ2Jhc2UnKSwgLy8gbWV0aG9kIGJhc2UgbGlua1xyXG5cdFx0XHRcdGxpbmsgOiBtZXRob2RFbGVtLmZpbmQoJ2RvYycpLmVxKDApLmF0dHIoJ2FwaWdlZTp1cmwnKSwgLy8gbGluayB0byBkb2N1bWVudGF0aW9uXHJcblx0XHRcdFx0ZGVzY3JpcHRpb24gOiBtZXRob2RFbGVtLmZpbmQoJ2RvYycpLmVxKDApLnRleHQoKS50cmltKCksIC8vbWV0aG9kIGRlc2NyaXB0aW9uXHJcblx0XHRcdFx0cGFyYW1ldGVyczoge31cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8vIHBhcmFtcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHRyZXNvdXJjZVxyXG5cdFx0XHRcdC5maW5kKCdwYXJhbScpXHJcblx0XHRcdFx0LmdldCgpXHJcblx0XHRcdFx0Lm1hcChmdW5jdGlvbiAocGFyKSB7XHJcblx0XHRcdFx0XHR2YXIgcGFyYW0gPSAkKHBhcik7XHJcblx0XHRcdFx0XHR2YXIgb3B0aW9ucyA9IHBhcmFtLmZpbmQoJ29wdGlvbicpO1xyXG5cdFx0XHRcdFx0dmFyIGlzU2VsZWN0ID0gISFvcHRpb25zLmxlbmd0aDtcclxuXHJcblx0XHRcdFx0XHR2YXIgcGFyYW1ldGVyID0ge1xyXG5cdFx0XHRcdFx0XHRuYW1lOiBwYXJhbS5hdHRyKCduYW1lJyksXHJcblx0XHRcdFx0XHRcdGRvYzogcGFyYW0uZmlyc3QoJ2RvYycpLnRleHQoKS50cmltKCksXHJcblx0XHRcdFx0XHRcdHN0eWxlOiBwYXJhbS5hdHRyKCdzdHlsZScpLFxyXG5cdFx0XHRcdFx0XHRyZXF1aXJlZDogcGFyYW0uYXR0cigncmVxdWlyZWQnKSxcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogcGFyYW0uYXR0cignZGVmYXVsdCcpID09PSAnbm9uZScgJiYgaXNTZWxlY3QgPyAnJyA6IHBhcmFtLmF0dHIoJ2RlZmF1bHQnKSxcclxuXHRcdFx0XHRcdFx0c2VsZWN0OiBpc1NlbGVjdFxyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRpZiAoaXNTZWxlY3QpIHtcclxuXHRcdFx0XHRcdFx0cGFyYW1ldGVyLm9wdGlvbnMgPSBvcHRpb25zLmdldCgpLm1hcChmdW5jdGlvbiAob3B0aW9uKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0XHRcdG5hbWU6ICQob3B0aW9uKS5hdHRyKCd2YWx1ZScpLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y2hlY2tlZDogJChvcHRpb24pLmF0dHIoJ3ZhbHVlJykgPT09IHBhcmFtZXRlci5kZWZhdWx0IHx8ICQob3B0aW9uKS5hdHRyKCd2YWx1ZScpID09PSAnbm9uZScsXHJcblx0XHRcdFx0XHRcdFx0XHRsaW5rOiBmYWxzZVxyXG5cdFx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdG1ldGhvZC5wYXJhbWV0ZXJzW3BhcmFtZXRlci5uYW1lXSA9IHBhcmFtZXRlcjtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdC8qKlxyXG5cdFx0XHQgKiBHbG9iYWwgb2JqIGNvbXBvc2l0aW9uXHJcbiAgICAgICAqL1xyXG5cdFx0XHQvLyBzZXQgY2F0ZWdvcnkgb2JqXHJcblx0XHRcdGdsb2JhbFttZXRob2QuY2F0ZWdvcnldID0gZ2xvYmFsW21ldGhvZC5jYXRlZ29yeV0gfHwge307XHJcblxyXG5cdFx0XHQvLyBzZXQgbWV0aG9kcyB0eXBlIG9ialxyXG5cdFx0XHRnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XS5BTEwgPSBnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XS5BTEwgfHwge307XHJcblx0XHRcdGdsb2JhbFttZXRob2QuY2F0ZWdvcnldW21ldGhvZC5tZXRob2RdID0gZ2xvYmFsW21ldGhvZC5jYXRlZ29yeV1bbWV0aG9kLm1ldGhvZF0gfHwge307XHJcblxyXG5cdFx0XHQvLyBzZXQgbWV0aG9kIG9ialxyXG5cdFx0XHRnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XS5BTExbbWV0aG9kLmlkXSA9IG1ldGhvZDtcclxuXHRcdFx0Z2xvYmFsW21ldGhvZC5jYXRlZ29yeV1bbWV0aG9kLm1ldGhvZF1bbWV0aG9kLmlkXSA9IG1ldGhvZDtcclxuXHRcdH0pO1xyXG5cclxuXHRyZXR1cm4gZ2xvYmFsO1xyXG59O1xyXG5cclxuLy9nZXRzIGRvY3VtZW50IGZyb20gV0FETCBjb25maWd1cmF0aW9uIGZpbGVcclxudmFyIHJlYWRGcm9tV0FETCA9IGZ1bmN0aW9uICgpIHtcclxuICAkLmFqYXgoe1xyXG4gICAgdXJsOiBDT05GSUdfVVJMLFxyXG4gICAgYXN5bmMgOiBmYWxzZSxcclxuICAgIGRhdGFUeXBlOiAoJC5icm93c2VyLm1zaWUpID8gXCJ0ZXh0XCIgOiBcInhtbFwiLFxyXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgdmFyIHhtbDtcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UgPT0gXCJzdHJpbmdcIil7XHJcbiAgICAgICAgeG1sID0gbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MRE9NXCIpO1xyXG4gICAgICAgIHhtbC5hc3luYyA9IGZhbHNlO1xyXG4gICAgICAgIHhtbC5sb2FkWE1MKHJlc3BvbnNlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB4bWwgPSByZXNwb25zZTtcclxuICAgICAgfVxyXG5cclxuXHRcdFx0YmFzZSA9IHBhcnNlRGF0YSh4bWwpO1xyXG4gICAgfSxcclxuXHJcbiAgICBlcnJvcjogZnVuY3Rpb24oWE1MSHR0cFJlcXVlc3QsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKXtcclxuICAgICAgYWxlcnQoJ0RhdGEgQ291bGQgTm90IEJlIExvYWRlZCAtICcrIHRleHRTdGF0dXMpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59O1xyXG5yZWFkRnJvbVdBREwoKTtcclxubW9kdWxlLmV4cG9ydHMgPSBiYXNlO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGFwaUtleSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3RrLWFwaS1rZXknKSB8fCBcIjdlbHhka3U5R0dHNWs4ajBYbThLV2RBTkRnZWNITVYwXCI7IC8vQVBJIEtleVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgbmFtZTogJ2FwaWtleScsXHJcbiAgc3R5bGU6ICdxdWVyeScsXHJcbiAgdmFsdWU6IGtvLm9ic2VydmFibGUoYXBpS2V5KVxyXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL2FwaWtleS5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQWpheCBTZXJ2aWNlXG4gKiBAcGFyYW0gdXJsXG4gKiBAcGFyYW0gbWV0aG9kXG4gKiBAcGFyYW0gY2FsbGJhY2tcbiAqL1xudmFyIGFqYXhTZXJ2aWNlID0gZnVuY3Rpb24gKHVybCwgbWV0aG9kLCBjYWxsYmFjaykge1xuICAkLmFqYXgoe1xuICAgIHR5cGU6IG1ldGhvZCxcbiAgICB1cmw6IHVybCxcbiAgICBhc3luYzogdHJ1ZSxcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgY29tcGxldGU6IGNhbGxiYWNrXG4gIH0pO1xufTtcblxuLyoqXG4gKiBGaWx0ZXJzIGFuZCBwcmVwYXJlcyBwYXJhbXMgcGFpcnNcbiAqIEBwYXJhbSBhcnJcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG52YXIgcHJlcGFyZVVybCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgdmFyIHJlcGxhY2VtZW50LCB1cmwsIGRvbWFpbiwgcGF0aCwgbWV0aG9kLCBhcGlLZXksIHBhcmFtcztcblxuICBpZiAoIWFyciAmJiAhYXJyLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBcbiAgZG9tYWluID0gYXJyWzBdLmJhc2U7XG4gIHBhdGggPSBhcnJbMF0ucGF0aDtcbiAgYXBpS2V5ID0gYXJyWzFdO1xuICBwYXJhbXMgPSBhcnJbMl0uZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgcmV0dXJuIGl0ZW0uc3R5bGUgPT09ICdxdWVyeSc7XG4gIH0pO1xuXG4gIC8vIGFyciBvZiB0ZW1wbGF0ZSBtYXJrc1xuICByZXBsYWNlbWVudCA9IHBhdGgubWF0Y2goLyhbXntdKj8pXFx3KD89XFx9KS9nbWkpO1xuXG4gIC8vIGFyciBvZiB0ZW1wbGF0ZSBwYXJhbXNcbiAgdmFyIHRlbXBsYXRlc0FyciA9IGFyclsyXS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICByZXR1cm4gaXRlbS5zdHlsZSA9PT0gJ3RlbXBsYXRlJztcbiAgfSk7XG5cbiAgLy8gcmVwbGFjZW1lbnRcbiAgcmVwbGFjZW1lbnQuZm9yRWFjaChmdW5jdGlvbiAodmFsKSB7XG4gICAgdmFyIHBhcmFtID0gdGVtcGxhdGVzQXJyLmZpbmQoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBpdGVtLm5hbWUgPT09IHZhbDtcbiAgICB9KTtcbiAgICBwYXRoID0gcGF0aC5yZXBsYWNlKCd7JysgcGFyYW0ubmFtZSArICd9JywgcGFyYW0udmFsdWUoKSB8fCBwYXJhbS5kZWZhdWx0KTtcbiAgfSk7XG5cbiAgLy8gYWRkcyBhcGlLZXkgcGFyYW1cbiAgaWYgKCFwYXJhbXNbMF0gfHwgcGFyYW1zWzBdLm5hbWUgIT09ICdhcGlrZXknKSB7XG4gICAgcGFyYW1zLnVuc2hpZnQoYXBpS2V5KTtcbiAgfVxuXG4gIC8vIHByZXBhcmVzIHBhcmFtcyBwYXJ0IG9mIHVybFxuICBwYXJhbXMgPSBwYXJhbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gW2l0ZW0ubmFtZSwgaXRlbS52YWx1ZSgpIHx8IGl0ZW0uZGVmYXVsdF0uam9pbignPScpO1xuICAgIH0pLmpvaW4oJyYnKTtcblxuICB1cmwgPSBbZG9tYWluLCAnLycsIHBhdGgsICc/JywgcGFyYW1zXS5qb2luKCcnKTtcblxuICByZXR1cm4gZW5jb2RlVVJJKHVybCk7XG59O1xuXG4vLyBzZW5kcyByZXF1ZXN0IHRvIGdldCB0aGUgc2Vjb25kIGNvbHVtblxudmFyIHNlbmRQcmltYXJ5UmVxdWVzdCA9IGZ1bmN0aW9uIChhcnIsIHJlcXVlc3RzKSB7XG4gIGNvbnNvbGUuY2xlYXIoKTtcbiAgdmFyIHVybCA9IHByZXBhcmVVcmwoYXJyKTtcbiAgLy8gY29uc29sZS5sb2codXJsKTtcblxuICBhamF4U2VydmljZSh1cmwsIGFyclswXS5tZXRob2QsIGZ1bmN0aW9uKHJlc3BvbnNlLCBtZXNzYWdlKSB7XG4gICAgaWYgKG1lc3NhZ2UgPT0gJ2Vycm9yJykge1xuICAgICAgdmFyIGVyciA9IHJlc3BvbnNlICYmIHJlc3BvbnNlLnJlc3BvbnNlSlNPTiAmJiByZXNwb25zZS5yZXNwb25zZUpTT04uZXJyb3JzICYmIHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5lcnJvcnNbMF07XG4gICAgICBjb25zb2xlLndhcm4obWVzc2FnZSwgcmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGVyci5jb2RlKTtcbiAgICAgICAgY29uc29sZS53YXJuKGVyci5kZXRhaWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuXG5cdFx0XHR2YXIgY29sb3JzID0gW1xuXHRcdFx0XHQnY29sdW1uLWNvbG9yLTEnLFxuXHRcdFx0XHQnY29sdW1uLWNvbG9yLTInLFxuXHRcdFx0XHQnY29sdW1uLWNvbG9yLTMnLFxuXHRcdFx0XHQnY29sdW1uLWNvbG9yLTQnLFxuXHRcdFx0XHQnY29sdW1uLWNvbG9yLTUnLFxuXHRcdFx0XHQnY29sdW1uLWNvbG9yLTYnLFxuXHRcdFx0XHQnY29sdW1uLWNvbG9yLTcnLFxuXHRcdFx0XHQnY29sdW1uLWNvbG9yLTgnLFxuXHRcdFx0XHQnY29sdW1uLWNvbG9yLTknLFxuXHRcdFx0XHQnY29sdW1uLWNvbG9yLTEwJyxcblx0XHRcdFx0J2NvbHVtbi1jb2xvci0xMScsXG5cdFx0XHRcdCdjb2x1bW4tY29sb3ItMTInXG5cdFx0XHRdO1xuXHRcdFx0dmFyIG1heCA9IGNvbG9ycy5sZW5ndGggLSAxO1xuXHRcdFx0dmFyIGluZGV4ID0gcmVxdWVzdHMubGVuZ3RoO1xuXG5cdFx0XHRyZXF1ZXN0cy5wdXNoKHtcblx0XHRcdFx0cmVxdWVzdDogdXJsLFxuXHRcdFx0XHRjb2xvcjogY29sb3JzW2luZGV4ICUgbWF4XSxcblx0XHRcdFx0cmVzcG9uc2U6IHJlc3BvbnNlLnJlc3BvbnNlSlNPTlxuXHRcdFx0fSlcbiAgICB9XG4gIH0pO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHNlbmRQcmltYXJ5UmVxdWVzdDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL2FqYXhTZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGhmID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9oZWxwZXJGdW5jJyk7XHJcbnZhciBzZWxmO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBNZW51IFZpZXctTW9kZWxcclxuICogQHBhcmFtIGJhc2VcclxuICogQHBhcmFtIGNhdGVnb3J5XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gTWVudVZpZXdNb2RlbChiYXNlLCBjYXRlZ29yeSkge1xyXG4gIHNlbGYgPSB0aGlzO1xyXG4gIHRoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcclxuICB0aGlzLmNhdGVnb3JpZXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoT2JqZWN0LmtleXMoYmFzZSkubWFwKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2hlY2tlZDoga28ub2JzZXJ2YWJsZSghaW5kZXgpLFxyXG4gICAgICBuYW1lOiBpdGVtLFxyXG4gICAgICBsaW5rOiBmYWxzZVxyXG4gICAgfVxyXG4gIH0pKTtcclxuXHJcbiAgLy8gaW5pdGlhbCBsb2FkXHJcbiAgdGhpcy5zZWxlY3RDYXRlZ29yeSh0aGlzLmNhdGVnb3JpZXMoKVswXSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNZW51IFZpZXctTW9kZWwgbWV0aG9kXHJcbiAqIEBwYXJhbSBjYXRlZ29yeVxyXG4gKi9cclxuTWVudVZpZXdNb2RlbC5wcm90b3R5cGUuc2VsZWN0Q2F0ZWdvcnkgPSBmdW5jdGlvbiAoY2F0ZWdvcnkpIHtcclxuICB2YXIgY2F0ZWdvcnlOYW1lID0gY2F0ZWdvcnkubmFtZTtcclxuICBzZWxmLmNhdGVnb3J5KGNhdGVnb3J5TmFtZSk7XHJcbiAgaGYuY2hlY2tBY3RpdmUoc2VsZi5jYXRlZ29yaWVzLCBjYXRlZ29yeU5hbWUpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNZW51Vmlld01vZGVsO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9tZW51Vmlld01vZGVsLmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cy5nZXRNb2RlbEFycmF5ID0gZnVuY3Rpb24gZ2V0TW9kZWxBcnJheShwYXJhbXMpIHtcclxuICAgIHZhciBvYmogPSBwYXJhbXMub2JqIHx8IHt9LFxyXG4gICAgICAgIGFyciA9IHBhcmFtcy5hcnIgfHwgW10sXHJcbiAgICAgICAgcHJvcCA9IHBhcmFtcy5wcm9wIHx8ICduYW1lJztcclxuXHJcbiAgICBmb3IgKHZhciBpIGluIG9iaikge1xyXG4gICAgICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGkpKSB7IGNvbnRpbnVlOyB9XHJcblxyXG4gICAgICAgIHZhciBpdGVtID0gYXJyLmZpbmQoZnVuY3Rpb24gKG0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtMS5uYW1lID09PSBvYmpbaV1bcHJvcF07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChpdGVtKSB7IGNvbnRpbnVlOyB9XHJcblxyXG4gICAgICAgIGFyci5wdXNoKHtcclxuICAgICAgICAgICAgY2hlY2tlZDoga28ub2JzZXJ2YWJsZShmYWxzZSksXHJcbiAgICAgICAgICAgIG5hbWU6IG9ialtpXVtwcm9wXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFycjtcclxufTtcclxuXHJcbmV4cG9ydHMuY2hlY2tBY3RpdmUgPSBmdW5jdGlvbiBjaGVja0FjdGl2ZShrb0FyciwgYWN0aXZlRWxlbSkge1xyXG4gICAgaWYgKCFrb0FyciAmJiAhYWN0aXZlRWxlbSkge3JldHVybiBmYWxzZTt9XHJcblxyXG4gICAga29BcnIoa29BcnIoKS5tYXAoZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIGlmIChvYmoubmFtZSA9PT0gYWN0aXZlRWxlbSkge1xyXG4gICAgICAgICAgICBvYmouY2hlY2tlZCh0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvYmouY2hlY2tlZChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9KSk7XHJcbn07XHJcblxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9oZWxwZXJGdW5jLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHNlbGY7XHJcbnZhciBiYXNlO1xyXG52YXIgaGYgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2hlbHBlckZ1bmMnKTtcclxuLyoqXHJcbiAqIFBhcmFtcyBWaWV3LU1vZGVsXHJcbiAqIEBwYXJhbSByYXdcclxuICogQHBhcmFtIG1ldGhvZFxyXG4gKiBAcGFyYW0gcGFyYW1zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gUGFyYW1zVmlld01vZGVsKHJhdywgbWV0aG9kLCBwYXJhbXMpIHtcclxuICBiYXNlID0gcmF3O1xyXG4gIHNlbGYgPSB0aGlzO1xyXG4gIHRoaXMuYW5pbWF0aW9uU3BlZWQgPSAyMDA7XHJcblxyXG4gIC8vIG9ic2VydmFibGVzXHJcbiAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XHJcbiAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XHJcbiAgdGhpcy5pc0hpZGRlbiA9IGtvLm9ic2VydmFibGUodHJ1ZSk7XHJcbiAgdGhpcy5wYXJhbUluRm9jdXMgPSBrby5vYnNlcnZhYmxlKCcnKTtcclxuXHR0aGlzLnBhcmFtc01vZGVsID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcclxuXHJcblx0Ly8gY29tcHV0ZWRcclxuXHQvLyB0aGlzLnBhcmFtc01vZGVsID0ga28uY29tcHV0ZWQodGhpcy51cGRhdGVQYXJhbXNNb2RlbCwgdGhpcyk7XHJcblx0dGhpcy51cGRhdGVWaWV3TW9kZWwoKTtcclxuXHR0aGlzLm1ldGhvZC5zdWJzY3JpYmUodGhpcy51cGRhdGVWaWV3TW9kZWwsIHRoaXMpO1xyXG5cclxuXHR0aGlzLmlzRGlydHkgPSBrby5jb21wdXRlZCh0aGlzLmNoZWNrRGlydHksIHRoaXMpO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWwgYnVpbGQgb2YgU2VsZWN0IE1vZGVsXHJcbiAqL1xyXG5QYXJhbXNWaWV3TW9kZWwucHJvdG90eXBlLnVwZGF0ZVZpZXdNb2RlbCA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgb2JqID0gdGhpcy5tZXRob2QoKS5wYXJhbWV0ZXJzIHx8IHt9LFxyXG5cdFx0YXJyID0gW107XHJcblxyXG5cdGZvciAodmFyIGkgaW4gb2JqKSB7XHJcblx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShpKSkge2NvbnRpbnVlO31cclxuXHJcblx0XHQvLyBjb3BpZXMgYWxsIHZhbHVlcyBmcm9tIG1vZGVsIHRvIHZpZXctbW9kZWxcclxuXHRcdHZhciB2bVBhcmFtID0gJC5leHRlbmQoe30sIG9ialtpXSk7XHJcblxyXG5cdFx0dm1QYXJhbS52YWx1ZSA9IGtvLm9ic2VydmFibGUodm1QYXJhbS52YWx1ZSB8fCAodm1QYXJhbS5zZWxlY3QgJiYgdm1QYXJhbS5kZWZhdWx0KSB8fCAnJyk7XHJcblxyXG5cdFx0Ly9hZGQgb2JzZXJ2YWJsZSBmb3Igc2VsZWN0ZWQgb3B0aW9uc1xyXG5cdFx0aWYgKHZtUGFyYW0uc2VsZWN0KSB7XHJcblx0XHRcdHZtUGFyYW0ub3B0aW9ucyA9IGtvLm9ic2VydmFibGVBcnJheShvYmpbaV0ub3B0aW9ucy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdFx0XHR2YXIgb2JqID0gJC5leHRlbmQoe30sIGl0ZW0pO1xyXG5cdFx0XHRcdG9iai5jaGVja2VkID0ga28ub2JzZXJ2YWJsZShpdGVtLmNoZWNrZWQpO1xyXG5cdFx0XHRcdHJldHVybiBvYmo7XHJcblx0XHRcdH0pKVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vICdkaXJ0eScgZmxhZyB3YXRjaGVyIGZvciBjdXJyZW50IGZpZWxkXHJcblx0XHR2bVBhcmFtLmlzRGlydHkgPSBrby5wdXJlQ29tcHV0ZWQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodGhpcy5zZWxlY3QpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy52YWx1ZSgpICE9PSB0aGlzLmRlZmF1bHQgJiYgdGhpcy52YWx1ZSgpICE9PSAnbm9uZSc7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuICEhdGhpcy52YWx1ZSgpLnRyaW0oKS5sZW5ndGg7XHJcblx0XHR9LCB2bVBhcmFtKTtcclxuXHJcblx0XHQvLyBhZGQgY2FsZW5kYXIgYnRuIGZvciBjdXJyZW50IGZpZWxkXHJcblx0XHR2bVBhcmFtLmhhc0NhbGVuZGFyID0gaS5zZWFyY2goLyhkYXRlfHRpbWUpL2dtaSkgIT0gLTE7XHJcblxyXG5cdFx0Ly8gYWRkIHBvcC11cCBidG4gZm9yIGN1cnJlbnQgZmllbGRcclxuXHRcdHZtUGFyYW0uaGFzUG9wVXAgPSBpLnNlYXJjaCgvKGF0dHJhY3Rpb25JZHx2ZW51ZUlkKS9nbWkpICE9IC0xO1xyXG5cclxuXHRcdGFyci5wdXNoKHZtUGFyYW0pO1xyXG5cdH1cclxuXHJcblx0Ly8gcHJlcGFyZSBvdXRwdXQgZm9yIHJlcXVlc3RcclxuXHR0aGlzLnBhcmFtc01vZGVsKGFycik7XHJcblx0dGhpcy5wYXJhbUluRm9jdXModGhpcy5wYXJhbXNNb2RlbCgpWzBdKTtcclxuXHR0aGlzLnByZXBhcmVVcmxQYWlycyhhcnIsIHRoaXMucGFyYW1zKTtcclxuXHRyZXR1cm4gYXJyO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERpcnR5IHBhcmFtcyBmb3JtIG9ic2VydmFibGUgbWV0aG9kXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5jaGVja0RpcnR5ID0gZnVuY3Rpb24gKCkge1xyXG5cdHRoaXMucHJlcGFyZVVybFBhaXJzKHRoaXMucGFyYW1zTW9kZWwoKSwgdGhpcy5wYXJhbXMpO1xyXG5cdHZhciBkaXJ0eSA9IHRoaXMucGFyYW1zTW9kZWwoKS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdHJldHVybiBpdGVtLmlzRGlydHkoKSA9PT0gdHJ1ZTtcclxuXHR9KTtcclxuXHRyZXR1cm4gZGlydHkubGVuZ3RoID4gMDtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogRW50ZXIga2V5IGhhbmRsZXJcclxuICogQHBhcmFtIG1vZGVsXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5vbkVudGVyS2V5RG93biA9IGZ1bmN0aW9uIChtb2RlbCwgZXZlbnQpIHtcclxuICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICQoJyNhcGktZXhwLWdldC1idG4nKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogU2xpZGUgdG9nZ2xlIGZvciBwYXJhbXMgY29udGFpbmVyIG1ldGhvZFxyXG4gKiBAcGFyYW0gdmlld01vZGVsXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5zbGlkZVRvZ2dsZSA9IGZ1bmN0aW9uICh2aWV3TW9kZWwsIGV2ZW50KSB7XHJcbiAgJChldmVudC5jdXJyZW50VGFyZ2V0KVxyXG4gICAgLnBhcmVudHMoJy5qcy1zbGlkZS1jb250cm9sJylcclxuICAgIC5maW5kKCcuanMtc2xpZGUtd3JhcHBlcicpXHJcbiAgICAuc2xpZGVUb2dnbGUodmlld01vZGVsLmFuaW1hdGlvblNwZWVkLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZpZXdNb2RlbC5pc0hpZGRlbighdmlld01vZGVsLmlzSGlkZGVuKCkpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogTWFjaGVzIGZvY3VzZWQgcGFyYW1cclxuICogQHBhcmFtIGl0ZW1cclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUub25Gb2N1cyA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgc2VsZi5wYXJhbUluRm9jdXMoaXRlbSk7XHJcbn07XHJcblxyXG4vKipcclxuICogRmlsdGVycyBwYXJhbXMgYnkgZGVmaW5lZCB2YWx1ZVxyXG4gKiBAcGFyYW0gYXJyXHJcbiAqIEBwYXJhbSBrb09ic1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUucHJlcGFyZVVybFBhaXJzID0gZnVuY3Rpb24gKGFyciwga29PYnMpIHtcclxuICBpZiAoIWFyciAmJiAha29PYnMpIHtyZXR1cm4gZmFsc2U7fVxyXG5cclxuICByZXR1cm4ga29PYnMoYXJyLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgcmV0dXJuIChpdGVtLnZhbHVlKCkgfHwgaXRlbS5kZWZhdWx0KTtcclxuICB9KSk7XHJcbn07XHJcblxyXG4vKipcclxuICogT24gc2VsZWN0IHZhbHVlIGhhbmRsZXIgZm9yIHBhcmFtcyBzZWxlY3RcclxuICogQHBhcmFtIHBhcmFtIHtvYmplY3R9IHBhcmFtZXRlciB2aWV3LW1vZGVsXHJcbiAqIEBwYXJhbSBvcHRpb24ge29iamVjdH0gb3B0aW9uIHZpZXctbW9kZWxcclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUub25TZWxlY3RQYXJhbVZhbHVlID0gZnVuY3Rpb24gKHBhcmFtLCBvcHRpb24pIHtcclxuXHRoZi5jaGVja0FjdGl2ZShwYXJhbS5vcHRpb25zLCBvcHRpb24ubmFtZSk7XHJcblx0cGFyYW0udmFsdWUob3B0aW9uLm5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFBhcmFtcyBjbGVhciBidXR0b24gaGFuZGxlclxyXG4gKiBAcGFyYW0gdm0ge29iamVjdH0gdmlldyBtb2RlbFxyXG4gKiBAcGFyYW0gZSB7b2JqZWN0fSBldmVudFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5vblBhcmFtc0NsZWFyID0gZnVuY3Rpb24gKHZtLCBlKSB7XHJcblx0dGhpcy51cGRhdGVWaWV3TW9kZWwoKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGFyYW1zVmlld01vZGVsO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9wYXJhbXNWaWV3TW9kZWwuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgaGYgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2hlbHBlckZ1bmMnKTtcclxudmFyIHNlbGY7XHJcbnZhciBiYXNlO1xyXG52YXIgY2F0ZWdvcnk7XHJcblxyXG4vKipcclxuICogTWV0aG9kcyBWaWV3LU1vZGVsXHJcbiAqIEBwYXJhbSByYXdcclxuICogQHBhcmFtIGNhdGVnb3J5XHJcbiAqIEBwYXJhbSBtZXRob2RcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBNZXRob2RzVmlld01vZGVsKHJhdywgY2F0ZWdvcnksIG1ldGhvZCkge1xyXG4gIHNlbGYgPSB0aGlzO1xyXG4gIGJhc2UgPSByYXc7XHJcblxyXG4gIC8vIG9ic2VydmFibGVzXHJcbiAgdGhpcy5jYXRlZ29yeSA9IGNhdGVnb3J5O1xyXG4gIHRoaXMubWV0aG9kID0gbWV0aG9kO1xyXG4gIHRoaXMudG9nZ2xlUG9wVXAgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcclxuICB0aGlzLnJhZGlvc01vZGVsID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcclxuICB0aGlzLm1ldGhvZHNWaWV3TW9kZWwgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xyXG4gIHRoaXMudXBkYXRlTW9kZWwodGhpcy5jYXRlZ29yeSgpKTtcclxuICB0aGlzLmNhdGVnb3J5LnN1YnNjcmliZSh0aGlzLnVwZGF0ZU1vZGVsLCB0aGlzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE9uIGNhdGVnb3J5IGNoYW5nZSBoYW5kbGVyXHJcbiAqIE1ldGhvZHMgVmlldy1Nb2RlbCBtZXRob2RcclxuICogQHBhcmFtIGNhdGVnb3J5XHJcbiAqL1xyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS51cGRhdGVNb2RlbCA9IGZ1bmN0aW9uIChjYXRlZ29yeSkge1xyXG4gIC8vIGluaXRpYWwgcmFkaW9zIG1vZGVsXHJcbiAgc2VsZi51cGRhdGVSYWRpb3NNb2RlbChiYXNlW2NhdGVnb3J5XSk7XHJcbiAgLy8gaW5pdGlhbCBzZWxlY3QgbW9kZWwgKGZpcnN0IG1ldGhvZCBpbiBmaXJzdCBzZWN0aW9uIGZvciBzdGFydClcclxuICBzZWxmLnVwZGF0ZVNlbGVjdChzZWxmLnJhZGlvc01vZGVsKClbMF0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE9uY2hhbmdlIGhhbmRsZXIgZm9yIFJhZGlvIGJ1dHRvbnNcclxuICogQHBhcmFtIGl0ZW1cclxuICovXHJcbk1ldGhvZHNWaWV3TW9kZWwucHJvdG90eXBlLm9uY2hhbmdlUmFkaW9zID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAvL3VwZGF0ZSBSYWRpb3MgTW9kZWxcclxuICBoZi5jaGVja0FjdGl2ZShzZWxmLnJhZGlvc01vZGVsLCBpdGVtLm5hbWUpO1xyXG4gIC8vdXBkYXRlIFNlbGVjdCBNb2RlbFxyXG4gIHNlbGYudXBkYXRlU2VsZWN0KGl0ZW0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWwgYnVpbGQgb2YgUmFkaW9zIE1vZGVsXHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAqL1xyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS51cGRhdGVSYWRpb3NNb2RlbCA9IGZ1bmN0aW9uIChwYXJhbSkge1xyXG4gIHZhciBvYmogPSBwYXJhbSB8fCB7fSxcclxuICAgIGFyciA9IFtdO1xyXG5cclxuICBmb3IgKHZhciBpIGluIG9iaikge1xyXG4gICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoaSkpIHsgY29udGludWU7IH1cclxuICAgIHZhciBpdGVtID0ge1xyXG4gICAgICBjaGVja2VkOiBrby5vYnNlcnZhYmxlKGkgPT09ICdBTEwnKSxcclxuICAgICAgbmFtZTogaVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoaSA9PT0gJ0FMTCcpIHtcclxuICAgICAgYXJyLnVuc2hpZnQoaXRlbSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFyci5wdXNoKGl0ZW0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHRhcnIgPSBhcnIuc29ydChjb21wYXJlTWV0aG9kcyk7XHJcbiAgdGhpcy5yYWRpb3NNb2RlbChhcnIpO1xyXG4gIHJldHVybiBhcnI7XHJcbn07XHJcblxyXG4vKipcclxuICogSW5pdGlhbCBidWlsZCBvZiBTZWxlY3QgTW9kZWxcclxuICogQHBhcmFtIGl0ZW1cclxuICovXHJcbk1ldGhvZHNWaWV3TW9kZWwucHJvdG90eXBlLnVwZGF0ZVNlbGVjdCA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgdmFyIG9iaiA9IGJhc2Vbc2VsZi5jYXRlZ29yeSgpXVtpdGVtLm5hbWVdfHwge30sXHJcbiAgICBhcnIgPSBbXSxcclxuICAgIGNvdW50ID0gMDtcclxuXHJcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcclxuICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGkpKSB7IGNvbnRpbnVlOyB9XHJcbiAgICB2YXIgcHJvcGVydHkgPSBvYmpbaV07XHJcblx0XHQvLyBjb3BpZXMgYWxsIHZhbHVlcyBmcm9tIG1vZGVsIHRvIHZpZXctbW9kZWxcclxuXHRcdHZhciB2bU1ldGhvZCA9ICQuZXh0ZW5kKHt9LCBwcm9wZXJ0eSk7XHJcblxyXG5cdFx0ZGVsZXRlIHZtTWV0aG9kLnBhcmFtZXRlcnM7XHJcblx0XHR2bU1ldGhvZC5jaGVja2VkID0ga28ub2JzZXJ2YWJsZSghY291bnQpO1xyXG5cclxuXHRcdGFyci5wdXNoKHZtTWV0aG9kKTtcclxuXHJcbiAgICAvLyBzZXQgZ2xvYmFsIG9ic2VydmFibGVcclxuICAgICFjb3VudCAmJiB0aGlzLm1ldGhvZChiYXNlW3Byb3BlcnR5LmNhdGVnb3J5XVtwcm9wZXJ0eS5tZXRob2RdW3Byb3BlcnR5LmlkXSk7XHJcblxyXG4gICAgY291bnQrKztcclxuXHJcbiAgfVxyXG5cclxuXHR0aGlzLm1ldGhvZHNWaWV3TW9kZWwoYXJyKTtcclxuXHRjb25zb2xlLmxvZyh0aGlzLm1ldGhvZHNWaWV3TW9kZWwoKSk7XHJcblx0cmV0dXJuIGFycjtcclxufTtcclxuXHJcbk1ldGhvZHNWaWV3TW9kZWwucHJvdG90eXBlLm9uU2VsZWN0TWV0aG9kID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICBoZi5jaGVja0FjdGl2ZShzZWxmLm1ldGhvZHNWaWV3TW9kZWwsIGl0ZW0ubmFtZSk7XHJcbiAgc2VsZi5tZXRob2QoYmFzZVtpdGVtLmNhdGVnb3J5XVtpdGVtLm1ldGhvZF1baXRlbS5pZF0pO1xyXG59O1xyXG5cclxuTWV0aG9kc1ZpZXdNb2RlbC5wcm90b3R5cGUub25BYm91dENsaWNrID0gZnVuY3Rpb24gKG1vZGVsLCBldmVudCkge1xyXG4gIG1vZGVsLnRvZ2dsZVBvcFVwKCFtb2RlbC50b2dnbGVQb3BVcCgpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTb3J0IGZ1bmN0aW9uIGZvciBtZXRob2RzIGFyYXlcclxuICogQHBhcmFtIGZcclxuICogQHBhcmFtIHNcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbmZ1bmN0aW9uIGNvbXBhcmVNZXRob2RzKGYscykge1xyXG5cdHZhciBhID0gZi5uYW1lLnRvVXBwZXJDYXNlKCk7XHJcblx0dmFyIGIgPSBzLm5hbWUudG9VcHBlckNhc2UoKTtcclxuXHJcblx0aWYgKGEgPT09IGIpIHtyZXR1cm4gMDt9XHJcblx0aWYgKGEgPT09ICdBTEwnIHx8XHJcblx0XHQoYSA9PT0gJ0dFVCcgJiYgKGIgPT09ICdQT1NUJyB8fCBiID09PSAnUFVUJyB8fCBiID09PSAnREVMRVRFJykpIHx8XHJcblx0XHQoYSA9PT0gJ1BPU1QnICYmIChiID09PSAnUFVUJyB8fCBiID09PSAnREVMRVRFJykpIHx8XHJcblx0XHQoYSA9PT0gJ1BVVCcgJiYgYiA9PT0gJ0RFTEVURScpKSB7XHJcblx0XHRyZXR1cm4gLTE7XHJcblx0fVxyXG5cdHJldHVybiAxO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1ldGhvZHNWaWV3TW9kZWw7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9WaWV3TW9kZWxzL21ldGhvZHNWaWV3TW9kZWwuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcbmZ1bmN0aW9uIFJlcXVlc3RzTGlzdFZpZXdNb2RlbChyZXF1ZXN0cykge1xuXHR2YXIgY29sb3JzID0gW1xuXHRcdCdjb2x1bW4tY29sb3ItMScsXG5cdFx0J2NvbHVtbi1jb2xvci0yJyxcblx0XHQnY29sdW1uLWNvbG9yLTMnLFxuXHRcdCdjb2x1bW4tY29sb3ItNCcsXG5cdFx0J2NvbHVtbi1jb2xvci01Jyxcblx0XHQnY29sdW1uLWNvbG9yLTYnLFxuXHRcdCdjb2x1bW4tY29sb3ItNycsXG5cdFx0J2NvbHVtbi1jb2xvci04Jyxcblx0XHQnY29sdW1uLWNvbG9yLTknLFxuXHRcdCdjb2x1bW4tY29sb3ItMTAnLFxuXHRcdCdjb2x1bW4tY29sb3ItMTEnLFxuXHRcdCdjb2x1bW4tY29sb3ItMTInXG5cdF07XG5cblx0dGhpcy5yZXF1ZXN0cyA9IHJlcXVlc3RzO1xuXG5cdHRoaXMuY2xlYXJCdG5Jc1Zpc2libGUgPSBrby5jb21wdXRlZChmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMucmVxdWVzdHMoKS5sZW5ndGggPiAwO1xuXHR9LCB0aGlzKTtcblx0XG5cdHRoaXMucmVxdWVzdHModGhpcy5yZXF1ZXN0cygpLm1hcChmdW5jdGlvbiAob2JqLCBpbmRleCkge1xuXHRcdHZhciBtYXggPSBjb2xvcnMubGVuZ3RoIC0gMTtcblx0XHRvYmouY29sb3IgPSBjb2xvcnNbaW5kZXggJSBtYXhdO1xuXHRcdHJldHVybiBvYmo7XG5cdH0pKTtcbn1cblxuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5vbkNsZWFyUmVxdWVzdHMgPSBmdW5jdGlvbiAodm0sIGV2ZW50KSB7XG5cdHRoaXMucmVxdWVzdHMoW10pO1xufTtcblxuXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLm1ldGhvZCA9IGZ1bmN0aW9uIChjYXRlZ29yeSkge1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZXF1ZXN0c0xpc3RWaWV3TW9kZWw7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9yZXF1ZXN0c0xpc3RWaWV3TW9kZWwuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcclxuICogQ3VzdG9tIFNlbGVjdCBjb21wb25lbnRcclxuICovXHJcbnZhciBzZWxmO1xyXG5cclxuLyoqXHJcbiAqIEN1c3RvbSBTZWxlY3QgVmlldy1Nb2RlbFxyXG4gKiBAcGFyYW0gcGFyYW1zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gQ3VzdG9tU2VsZWN0KHBhcmFtcykge1xyXG4gIHNlbGYgPSB0aGlzO1xyXG5cclxuICB0aGlzLmFuaW1hdGlvblNwZWVkID0gcGFyYW1zLmFuaW1hdGlvblNwZWVkIHx8IDIwMDtcclxuXHR0aGlzLmN1cmVudFNlbGVjdERhdGEgPSBwYXJhbXMuZGF0YSB8fCBudWxsO1xyXG5cdHRoaXMub25Gb2N1cyA9IHBhcmFtcy5mb2N1cyB8fCBudWxsO1xyXG5cdFxyXG4gIC8vb2JzZXJ2YWJsZXNcclxuICB0aGlzLnNlbGVjdE1vZGVsID0gdHlwZW9mIHBhcmFtcy5vcHRpb25zICE9PSdmdW5jdGlvbicgPyBrby5vYnNlcnZhYmxlQXJyYXkocGFyYW1zLm9wdGlvbnMpOiAgcGFyYW1zLm9wdGlvbnM7XHJcbiAgdGhpcy5wbGFjZWhvbGRlciA9IGtvLm9ic2VydmFibGUocGFyYW1zLnBsYWNlaG9sZGVyIHx8ICcnKTtcclxuICB0aGlzLm9uc2VsZWN0ID0gcGFyYW1zLm9uc2VsZWN0IHx8IGZ1bmN0aW9uIChpdGVtKSB7IGNvbnNvbGUubG9nKGl0ZW0gKydzZWxlY3RlZCEnKX07XHJcbiAgdGhpcy5zZWxlY3RlZCA9IGtvLm9ic2VydmFibGUodGhpcy5zZWxlY3RNb2RlbCgpWzBdKTtcclxuICB0aGlzLmlzT25lT3B0aW9uID0ga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdE1vZGVsKCkubGVuZ3RoIDwgMjsgLy8gbW9yZSB0aGFuIG9uZSBvcHRpb25cclxuICB9LCB0aGlzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZEVsZW1lbnQoZXZlbnQpIHtcclxuICB2YXIgcGFyZW50ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5wYXJlbnRzKCcuanMtY3VzdG9tLXNlbGVjdCcpO1xyXG4gIHJldHVybiB7XHJcbiAgICB3cmFwcGVyOiBwYXJlbnQuZmluZCgnLmpzLWN1c3RvbS1zZWxlY3Qtd3JhcHBlcicpLFxyXG4gICAgbGF5ZXI6IHBhcmVudC5maW5kKCcuanMtY3VzdG9tLXNlbGVjdC1sYXllcicpXHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ3VzdG9tIFNlbGVjdCBWaWV3LU1vZGVsIG1ldGhvZFxyXG4gKiBAcGFyYW0gdmlld01vZGVsXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuQ3VzdG9tU2VsZWN0LnByb3RvdHlwZS5zbGlkZVRvZ2dsZSA9IGZ1bmN0aW9uKHZpZXdNb2RlbCwgZXZlbnQpIHtcclxuXHQvLyBlbGVtIGluIGZvY3VzIGVtdWxhdGlvblxyXG5cdHRoaXMub25Gb2N1cyAmJiB0aGlzLm9uRm9jdXModGhpcy5jdXJlbnRTZWxlY3REYXRhKTtcclxuXHJcblx0aWYgKHRoaXMuaXNPbmVPcHRpb24oKSkge3JldHVybiBmYWxzZTt9XHJcbiAgdmFyIGVsID0gZmluZEVsZW1lbnQoZXZlbnQpO1xyXG4gICAgZWwud3JhcHBlci5zbGlkZVRvZ2dsZSh2aWV3TW9kZWwuYW5pbWF0aW9uU3BlZWQpO1xyXG4gICAgZWwubGF5ZXIudG9nZ2xlQ2xhc3MoJ2hpZGRlbicpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEN1c3RvbSBTZWxlY3QgVmlldy1Nb2RlbCBtZXRob2RcclxuICogQHBhcmFtIGl0ZW1cclxuICogQHBhcmFtIGV2ZW50XHJcbiAqL1xyXG5DdXN0b21TZWxlY3QucHJvdG90eXBlLnNlbGVjdEl0ZW0gPSBmdW5jdGlvbiAoaXRlbSwgZXZlbnQpIHtcclxuICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgdGhpcy5zZWxlY3RlZChpdGVtKTtcclxuICAvLyBydW4gaGFuZGxlclxyXG4gIHRoaXMub25zZWxlY3QoaXRlbSk7XHJcblx0Ly8gc2xpZGUgdXBcclxuICB0aGlzLnNsaWRlVG9nZ2xlKHNlbGYsIGV2ZW50KTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ga28uY29tcG9uZW50cy5yZWdpc3RlcignY3VzdG9tLXNlbGVjdCcsIHtcclxuICB2aWV3TW9kZWw6IEN1c3RvbVNlbGVjdCxcclxuICB0ZW1wbGF0ZTogKFtcclxuICAgICc8ZGl2IGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0IGpzLWN1c3RvbS1zZWxlY3RcIj4nLFxyXG4gICAgICAnPGRpdiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdC13cmFwcGVyXCI+JyxcclxuICAgICAgICAnPHNlbGVjdCBkYXRhLWJpbmQ9XCJvcHRpb25zOiBzZWxlY3RNb2RlbCwgb3B0aW9uc1RleHQ6IFxcJ25hbWVcXCcsIHZhbHVlOiBzZWxlY3RlZFwiIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19maWVsZFwiIG5hbWU9XCJhcGktZXhwLW1ldGhvZFwiPjwvc2VsZWN0PicsXHJcbiAgICAgICAgJzxzcGFuIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19wbGFjZWhvbGRlclwiPicsXHJcbiAgICAgICAgICAnPGlucHV0IGRhdGEtYmluZD1cImV2ZW50OiB7Y2xpY2s6IHNsaWRlVG9nZ2xlfSwgYXR0cjoge3ZhbHVlOiBzZWxlY3RlZCgpLm5hbWUsIGRpc2FibGVkOiBpc09uZU9wdGlvbn1cIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiXCIgcmVhZG9ubHk9XCJcIj4nLFxyXG4gICAgICAgICAgJzxiIGRhdGEtYmluZD1cImNzczoge2hpZGRlbjogaXNPbmVPcHRpb259XCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2NoZXZyb25cIj4mbmJzcDs8L2I+JyxcclxuICAgICAgICAnPC9zcGFuPicsXHJcbiAgICAgICAgJzx1bCBkYXRhLWJpbmQ9XCJmb3JlYWNoOiBzZWxlY3RNb2RlbFwiIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19saXN0IGpzLWN1c3RvbS1zZWxlY3Qtd3JhcHBlclwiPicsXHJcbiAgICAgICAgICAnPGxpIGRhdGEtYmluZD1cImNzczoge1xcJ2FjdGl2ZVxcJzogY2hlY2tlZH1cIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9faXRlbVwiPicsXHJcbiAgICAgICAgICAgICc8YnV0dG9uIGRhdGEtYmluZD1cImV2ZW50OiB7Y2xpY2s6ICRwYXJlbnQuc2VsZWN0SXRlbS5iaW5kKCRwYXJlbnQpfSwgdGV4dDogbmFtZSwgY3NzOiB7XFwnYWN0aXZlXFwnOiBjaGVja2VkKCl9LCBhdHRyOiB7XFwnZGF0YS12YWx1ZVxcJzogbmFtZX1cIiAgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2l0ZW0tbGFiZWxcIiBocmVmPVwiI1wiPjwvYnV0dG9uPicsXHJcbiAgICAgICAgICAgIC8vICc8c3BhbiBkYXRhLWJpbmQ9XCJpZjogbGlua1wiPicsXHJcbiAgICAgICAgICAgIFx0JzxhIGRhdGEtYmluZD1cImF0dHI6IHtocmVmOiBsaW5rfSwgY3NzOiB7XFwnaGlkZGVuXFwnOiAhbGlua31cIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9faXRlbS1saW5rXCIgdGFyZ2V0PVwiX2JsYW5rXCI+Jm5ic3A7PC9hPicsXHJcbiAgICAgICAgICAgIC8vICc8L3NwYW4+JyxcclxuICAgICAgICAgICc8L2xpPicsXHJcbiAgICAgICAgJzwvdWw+JyxcclxuICAgICAgJzwvZGl2PicsXHJcbiAgICAgICc8ZGl2IGRhdGEtYmluZD1cImNsaWNrOiBzbGlkZVRvZ2dsZVwiIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0LWxheWVyIGpzLWN1c3RvbS1zZWxlY3QtbGF5ZXIgaGlkZGVuXCI+PC9kaXY+JyxcclxuICAgICc8L2Rpdj4nXHJcbiAgXSkuam9pbignJylcclxufSk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL2N1c3RvbVNlbGVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9