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
			document.location.hostname || document.location.host,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTQxYTY0YTdmNjg5Y2UxY2YzMjQiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY3VzdG9tQmluZGluZ3MvZm9yZWFjaFByb3AuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9hcGlrZXkuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvYWpheFNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvY29uZmlnU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvVmlld01vZGVscy9tZW51Vmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2hlbHBlckZ1bmMuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvcGFyYW1zVmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9WaWV3TW9kZWxzL21ldGhvZHNWaWV3TW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvcmVxdWVzdHNMaXN0Vmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2pzb24taGlnaGxpZ2h0LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2hpZ2hsaWdodEpzb24ud29ya2VyLmpzIiwid2VicGFjazovLy8uL34vd29ya2VyLWxvYWRlci9jcmVhdGVJbmxpbmVXb3JrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvc2xpZGVyLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbmZpZy5qc29uIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL2N1c3RvbVNlbGVjdC5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL3BhbmVsR3JvdXAuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYW5lbC5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL3BhZ2luYXRpb24uY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYW5lbEhlYWRpbmcuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9vYmplY3RQYW5lbEJvZHkuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9hcnJheVBhbmVsQm9keS5jb21wb25lbnQuanMiXSwibmFt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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDs7O0FBR0E7Ozs7Ozs7QUNuR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDs7Ozs7OztBQ3JCQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNuQ0E7QUFDQSwrQkFBOEI7QUFDOUI7QUFDQTs7QUFFQTtBQUNBLHNDQUFxQyxVQUFVOztBQUUvQztBQUNBO0FBQ0EsVUFBUzs7QUFFVCxvQkFBbUIsVUFBVTs7QUFFN0I7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlDQUFnQzs7QUFFaEM7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQ3RKQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRCQUEyQixnR0FBZ0c7QUFDM0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdEQUF1RCxtQ0FBbUMsU0FBUyxtQkFBbUI7QUFDdEg7QUFDQTs7QUFFQTtBQUNBLGtDQUFpQyxvRUFBb0UsUUFBUSxpQkFBaUIsU0FBUyw0RUFBNEU7QUFDbk47O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7Ozs7OztBQzlGRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZCQUE0QixnQ0FBZ0M7QUFDNUQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRSIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGE0MWE2NGE3ZjY4OWNlMWNmMzI0XG4gKiovIiwiLyoqXHJcbiAqIE1haW4gZmlsZSBmb3IgQXBpIEV4cGxyZXIgdjIuMFxyXG4gKiBGb3IgZGV2ZWxvcG1lbnQgcGxlYXNlIHVzZSBXZWJwYWNrIHRvIGJ1bmRsZSBhbGwgbW9kdWxlc1xyXG4gKiBJdCBjYW4gYmUgbWFkZSB1c2luZyBucG0gc2NyaXB0cyBjbWQgLSAnd2VicGFjaydcclxuICovXHJcbi8vIGN1c3RvbSBiaW5kaW5nc1xyXG5yZXF1aXJlKCcuLi9jdXN0b21CaW5kaW5ncy9mb3JlYWNoUHJvcCcpO1xyXG5cclxuLy8gTW9kdWxlc1xyXG52YXIgYmFzZSA9IHJlcXVpcmUoJy4uL21vZHVsZXMvYmFzZScpO1xyXG52YXIgYXBpS2V5ID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9hcGlrZXknKTtcclxudmFyIGFqYXhTZXJ2aWNlID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9hamF4U2VydmljZScpO1xyXG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb25maWdTZXJ2aWNlJyk7XHJcblxyXG4vLyBWaWV3IE1vZGVsc1xyXG52YXIgTWVudVZpZXdNb2RlbCA9IHJlcXVpcmUoJy4vbWVudVZpZXdNb2RlbCcpO1xyXG52YXIgUGFyYW1zVmlld01vZGVsID0gcmVxdWlyZSgnLi9wYXJhbXNWaWV3TW9kZWwnKTtcclxudmFyIE1ldGhvZHNWaWV3TW9kZWwgPSByZXF1aXJlKCcuL21ldGhvZHNWaWV3TW9kZWwnKTtcclxudmFyIFJlcXVlc3RzTGlzdFZpZXdNb2RlbCA9IHJlcXVpcmUoJy4vcmVxdWVzdHNMaXN0Vmlld01vZGVsJyk7XHJcblxyXG4vLyBDb21wb25lbnRzXHJcbnJlcXVpcmUoJy4uL2NvbXBvbmVudHMvaW5kZXgnKTtcclxuXHJcbi8qKlxyXG4gKiBNYWluIGFwcGxpY2F0aW9uIHZpZXctbW9kZWxcclxuICogQHBhcmFtIG9iaiB7b2JqZWN0fSBnbG9iYWwgZGF0YSBvYmplY3RcclxuICovXHJcbmZ1bmN0aW9uIEFwcFZpZXdNb2RlbChvYmopIHtcclxuICB2YXIgYmFzZSA9IG9iaiB8fCB7fTtcclxuICBzZWxmID0gdGhpcztcclxuICB0aGlzLmFwaUtleSA9IGFwaUtleTtcclxuXHR0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAvLyBvYnNlcnZhYmxlc1xyXG4gIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSA9IGtvLm9ic2VydmFibGUoJycpO1xyXG4gIHRoaXMuc2VsZWN0ZWRNZXRob2QgPSBrby5vYnNlcnZhYmxlKCcnKTtcclxuICB0aGlzLnNlbGVjdGVkUGFyYW1zID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcclxuXHR0aGlzLnJlcXVlc3RzID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcclxuXHJcblx0Ly8gY29tcHV0ZWRcclxuICB0aGlzLlVSTCA9IGtvLmNvbXB1dGVkKHRoaXMuZ2V0VXJsLCB0aGlzKTtcclxuICB0aGlzLnNlbmRCdXR0b25UZXh0ID0ga28ucHVyZUNvbXB1dGVkKHRoaXMuZ2V0TWV0aG9kTmFtZSwgdGhpcyk7XHJcblxyXG4gIC8vIHN1Yi1tb2RlbHNcclxuICB0aGlzLm1lbnUgPSBuZXcgTWVudVZpZXdNb2RlbChiYXNlLCB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkpO1xyXG4gIHRoaXMubWV0aG9kcyA9IG5ldyBNZXRob2RzVmlld01vZGVsKGJhc2UsIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSwgdGhpcy5zZWxlY3RlZE1ldGhvZCk7XHJcbiAgdGhpcy5wYXJhbXMgPSBuZXcgUGFyYW1zVmlld01vZGVsKGJhc2UsIHRoaXMuc2VsZWN0ZWRNZXRob2QsIHRoaXMuc2VsZWN0ZWRQYXJhbXMpO1xyXG4gIHRoaXMucmVxdWVzdHNMaXN0ID0gbmV3IFJlcXVlc3RzTGlzdFZpZXdNb2RlbCh0aGlzLnJlcXVlc3RzLCB0aGlzLnNlbGVjdGVkUGFyYW1zKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNlbmQgcmVxdWVzdCBtZXRob2RcclxuICovXHJcbkFwcFZpZXdNb2RlbC5wcm90b3R5cGUub25DbGlja1NlbmRCdG4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgYWpheFNlcnZpY2UodGhpcy5VUkwoKSwgdGhpcy5yZXF1ZXN0cywgYmFzZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyBjdXJyZW50IG1ldGhvZCBuYW1lXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5BcHBWaWV3TW9kZWwucHJvdG90eXBlLmdldE1ldGhvZE5hbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRNZXRob2QoKS5tZXRob2QudG9Mb3dlckNhc2UoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHJhdyB1cmwgZGF0YSBhcnJheVxyXG4gKiBAcmV0dXJucyB7KltdfVxyXG4gKi9cclxuQXBwVmlld01vZGVsLnByb3RvdHlwZS5nZXRVcmwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIFtcclxuICAgIHRoaXMuc2VsZWN0ZWRNZXRob2QoKSxcclxuICAgIHRoaXMuYXBpS2V5LFxyXG4gICAgdGhpcy5zZWxlY3RlZFBhcmFtcygpXHJcbiAgXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIGRlZXAgcHJvcFxyXG4gKiBAcmV0dXJucyB7KltdfVxyXG4gKi9cclxuT2JqZWN0LmdldFByb3AgPSBmdW5jdGlvbihvLCBzKSB7XHJcblx0aWYgKHR5cGVvZiBvICE9PSAnb2JqZWN0JyB8fCAhcykge1xyXG5cdFx0Y29uc29sZS5sb2cobyxzKTtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0cyA9IHMucmVwbGFjZSgvXFxbKFxcdyspXFxdL2csICcuJDEnKTsgLy8gY29udmVydCBpbmRleGVzIHRvIHByb3BlcnRpZXNcclxuXHRzID0gcy5yZXBsYWNlKC9eXFwuLywgJycpOyAgICAgICAgICAgLy8gc3RyaXAgYSBsZWFkaW5nIGRvdFxyXG5cdHZhciBhID0gcy5zcGxpdCgnLicpO1xyXG5cdGZvciAodmFyIGkgPSAwLCBuID0gYS5sZW5ndGg7IGkgPCBuOyArK2kpIHtcclxuXHRcdHZhciBrID0gYVtpXTtcclxuXHRcdGlmIChrIGluIG8pIHtcclxuXHRcdFx0byA9IG9ba107XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBvO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFjdGl2YXRlcyBrbm9ja291dC5qc1xyXG4gKi9cclxua28uYXBwbHlCaW5kaW5ncyhuZXcgQXBwVmlld01vZGVsKGJhc2UpKTtcclxuLyoqXHJcbiAqIGV4cG9ydHMgZ2xvYmFsIHZhcmlhYmxlXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2U7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvVmlld01vZGVscy9tYWluLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiIG1vZHVsZS5leHBvcnRzID0ga28uYmluZGluZ0hhbmRsZXJzLmZvcmVhY2hwcm9wID0ge1xyXG5cclxuXHR0cmFuc2Zvcm1PYmplY3Q6IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuXHRcdHZhciBwcm9wZXJ0aWVzID0gW107XHJcblx0XHR2YXIgb2JqLCBzb3J0Rm4gPSBwYXJhbXMuc29ydEZuO1xyXG5cclxuXHRcdGlmIChzb3J0Rm4pIHtcclxuXHRcdFx0b2JqID0gcGFyYW1zLmRhdGE7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRvYmogPSBwYXJhbXM7XHJcblx0XHR9XHJcblxyXG5cdFx0a28udXRpbHMub2JqZWN0Rm9yRWFjaChvYmosIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcblx0XHRcdHByb3BlcnRpZXMucHVzaCh7XHJcblx0XHRcdFx0a2V5OiBrZXksXHJcblx0XHRcdFx0dmFsdWU6IHZhbHVlXHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKHNvcnRGbikge1xyXG5cdFx0XHRwcm9wZXJ0aWVzLnNvcnQoc29ydEZuKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcHJvcGVydGllcztcclxuXHR9LFxyXG5cdGluaXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IsIGFsbEJpbmRpbmdzQWNjZXNzb3IsIHZpZXdNb2RlbCwgYmluZGluZ0NvbnRleHQpIHtcclxuXHRcdHZhciBwcm9wZXJ0aWVzID0ga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIG9iaiA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUodmFsdWVBY2Nlc3NvcigpKTtcclxuXHRcdFx0cmV0dXJuIGtvLmJpbmRpbmdIYW5kbGVycy5mb3JlYWNocHJvcC50cmFuc2Zvcm1PYmplY3Qob2JqKTtcclxuXHRcdH0pO1xyXG5cdFx0a28uYXBwbHlCaW5kaW5nc1RvTm9kZShlbGVtZW50LCB7XHJcblx0XHRcdGZvcmVhY2g6IHByb3BlcnRpZXNcclxuXHRcdH0sIGJpbmRpbmdDb250ZXh0KTtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGNvbnRyb2xzRGVzY2VuZGFudEJpbmRpbmdzOiB0cnVlXHJcblx0XHR9O1xyXG5cdH1cclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jdXN0b21CaW5kaW5ncy9mb3JlYWNoUHJvcC5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBiYXNlID0ge307XG52YXIgQ09ORklHX1VSTCA9ICcuLi8uLi9hcGlkZXNjcmlwdGlvbi54bWwnO1xuXG52YXIgcGFyc2VEYXRhID0gZnVuY3Rpb24gKHhtbCkge1xuXHR2YXIgZ2xvYmFsID0ge307XG5cdC8vZ2V0IGFsbCBBUElzXG5cdHZhciByZXNvdXJjZXNFbCA9ICQoeG1sKS5maW5kKFwicmVzb3VyY2VzXCIpLmVxKDApO1xuXG5cdC8vIHJlc291cmNlXG5cdCQoeG1sKVxuXHRcdC5maW5kKFwicmVzb3VyY2VcIilcblx0XHQuZ2V0KClcblx0XHQubWFwKGZ1bmN0aW9uIChyZXMpIHtcblx0XHRcdHZhciByZXNvdXJjZSA9ICQocmVzKTtcblx0XHRcdC8vIG1ldGhvZCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0dmFyIG1ldGhvZEVsZW0gPSByZXNvdXJjZS5maW5kKFwibWV0aG9kXCIpLmVxKDApO1xuXG5cdFx0XHR2YXIgbWV0aG9kID0ge1xuXHRcdFx0XHRpZCA6IG1ldGhvZEVsZW0uYXR0cihcImlkXCIpLCAvLyBtZXRob2QgaWRcblx0XHRcdFx0bmFtZSA6IG1ldGhvZEVsZW0uYXR0cihcImFwaWdlZTpkaXNwbGF5TmFtZVwiKSB8fCBtZXRob2RFbGVtLmF0dHIoXCJpZFwiKSwgLy8gbWV0aG9kIG5hbWVcblx0XHRcdFx0bWV0aG9kIDogbWV0aG9kRWxlbS5hdHRyKCduYW1lJyksIC8vIEdFVCBvciBQT1NUXG5cdFx0XHRcdGNhdGVnb3J5IDogbWV0aG9kRWxlbS5maW5kKCdbcHJpbWFyeT1cInRydWVcIl0nKS50ZXh0KCkudHJpbSgpLCAvLyBBUEkgbmFtZVxuXHRcdFx0XHRwYXRoOiByZXNvdXJjZS5hdHRyKCdwYXRoJyksIC8vIG1ldGhvZCBVUkxcblx0XHRcdFx0YmFzZSA6IHJlc291cmNlc0VsLmF0dHIoJ2Jhc2UnKSwgLy8gbWV0aG9kIGJhc2UgbGlua1xuXHRcdFx0XHRsaW5rIDogbWV0aG9kRWxlbS5maW5kKCdkb2MnKS5lcSgwKS5hdHRyKCdhcGlnZWU6dXJsJyksIC8vIGxpbmsgdG8gZG9jdW1lbnRhdGlvblxuXHRcdFx0XHRkZXNjcmlwdGlvbiA6IG1ldGhvZEVsZW0uZmluZCgnZG9jJykuZXEoMCkudGV4dCgpLnRyaW0oKSwgLy9tZXRob2QgZGVzY3JpcHRpb25cblx0XHRcdFx0cGFyYW1ldGVyczoge31cblx0XHRcdH07XG5cblx0XHRcdC8vIHBhcmFtcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0cmVzb3VyY2Vcblx0XHRcdFx0LmZpbmQoJ3BhcmFtJylcblx0XHRcdFx0LmdldCgpXG5cdFx0XHRcdC5tYXAoZnVuY3Rpb24gKHBhcikge1xuXHRcdFx0XHRcdHZhciBwYXJhbSA9ICQocGFyKTtcblx0XHRcdFx0XHR2YXIgb3B0aW9ucyA9IHBhcmFtLmZpbmQoJ29wdGlvbicpO1xuXHRcdFx0XHRcdHZhciBpc1NlbGVjdCA9ICEhb3B0aW9ucy5sZW5ndGg7XG5cblx0XHRcdFx0XHR2YXIgcGFyYW1ldGVyID0ge1xuXHRcdFx0XHRcdFx0bmFtZTogcGFyYW0uYXR0cignbmFtZScpLFxuXHRcdFx0XHRcdFx0ZG9jOiBwYXJhbS5maXJzdCgnZG9jJykudGV4dCgpLnRyaW0oKSxcblx0XHRcdFx0XHRcdHN0eWxlOiBwYXJhbS5hdHRyKCdzdHlsZScpLFxuXHRcdFx0XHRcdFx0cmVxdWlyZWQ6IHBhcmFtLmF0dHIoJ3JlcXVpcmVkJyksXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiBwYXJhbS5hdHRyKCdkZWZhdWx0JykgPT09ICdub25lJyAmJiBpc1NlbGVjdCA/ICcnIDogcGFyYW0uYXR0cignZGVmYXVsdCcpLFxuXHRcdFx0XHRcdFx0c2VsZWN0OiBpc1NlbGVjdFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRpZiAoaXNTZWxlY3QpIHtcblx0XHRcdFx0XHRcdHBhcmFtZXRlci5vcHRpb25zID0gb3B0aW9ucy5nZXQoKS5tYXAoZnVuY3Rpb24gKG9wdGlvbikge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHRcdG5hbWU6ICQob3B0aW9uKS5hdHRyKCd2YWx1ZScpLFxuXHRcdFx0XHRcdFx0XHRcdGNoZWNrZWQ6ICQob3B0aW9uKS5hdHRyKCd2YWx1ZScpID09PSBwYXJhbWV0ZXIuZGVmYXVsdCB8fCAkKG9wdGlvbikuYXR0cigndmFsdWUnKSA9PT0gJ25vbmUnLFxuXHRcdFx0XHRcdFx0XHRcdGxpbms6IGZhbHNlXG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRtZXRob2QucGFyYW1ldGVyc1twYXJhbWV0ZXIubmFtZV0gPSBwYXJhbWV0ZXI7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIEdsb2JhbCBvYmogY29tcG9zaXRpb25cbiAgICAgICAqL1xuXHRcdFx0Ly8gc2V0IGNhdGVnb3J5IG9ialxuXHRcdFx0Z2xvYmFsW21ldGhvZC5jYXRlZ29yeV0gPSBnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XSB8fCB7fTtcblxuXHRcdFx0Ly8gc2V0IG1ldGhvZHMgdHlwZSBvYmpcblx0XHRcdGdsb2JhbFttZXRob2QuY2F0ZWdvcnldLkFMTCA9IGdsb2JhbFttZXRob2QuY2F0ZWdvcnldLkFMTCB8fCB7fTtcblx0XHRcdGdsb2JhbFttZXRob2QuY2F0ZWdvcnldW21ldGhvZC5tZXRob2RdID0gZ2xvYmFsW21ldGhvZC5jYXRlZ29yeV1bbWV0aG9kLm1ldGhvZF0gfHwge307XG5cblx0XHRcdC8vIHNldCBtZXRob2Qgb2JqXG5cdFx0XHRnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XS5BTExbbWV0aG9kLmlkXSA9IG1ldGhvZDtcblx0XHRcdGdsb2JhbFttZXRob2QuY2F0ZWdvcnldW21ldGhvZC5tZXRob2RdW21ldGhvZC5pZF0gPSBtZXRob2Q7XG5cdFx0fSk7XG5cblx0cmV0dXJuIGdsb2JhbDtcbn07XG5cbi8vZ2V0cyBkb2N1bWVudCBmcm9tIFdBREwgY29uZmlndXJhdGlvbiBmaWxlXG52YXIgcmVhZEZyb21XQURMID0gZnVuY3Rpb24gKCkge1xuICAkLmFqYXgoe1xuICAgIHVybDogQ09ORklHX1VSTCxcbiAgICBhc3luYyA6IGZhbHNlLFxuICAgIGRhdGFUeXBlOiAoJC5icm93c2VyLm1zaWUpID8gXCJ0ZXh0XCIgOiBcInhtbFwiLFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICB2YXIgeG1sO1xuXG4gICAgICBpZiAodHlwZW9mIHJlc3BvbnNlID09IFwic3RyaW5nXCIpe1xuICAgICAgICB4bWwgPSBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxET01cIik7XG4gICAgICAgIHhtbC5hc3luYyA9IGZhbHNlO1xuICAgICAgICB4bWwubG9hZFhNTChyZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB4bWwgPSByZXNwb25zZTtcbiAgICAgIH1cblxuXHRcdFx0YmFzZSA9IHBhcnNlRGF0YSh4bWwpO1xuICAgIH0sXG5cbiAgICBlcnJvcjogZnVuY3Rpb24oWE1MSHR0cFJlcXVlc3QsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKXtcbiAgICAgIGFsZXJ0KCdEYXRhIENvdWxkIE5vdCBCZSBMb2FkZWQgLSAnKyB0ZXh0U3RhdHVzKTtcbiAgICB9XG4gIH0pO1xufTtcbnJlYWRGcm9tV0FETCgpO1xubW9kdWxlLmV4cG9ydHMgPSBiYXNlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9tb2R1bGVzL2Jhc2UuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYXBpS2V5ID0gJ1hpT3JOMlVDOXlqdVI0WEY4N3NkTWJScGFWTnNQNlcyJyB8fCBhcGlLZXlTZXJ2aWNlLmNoZWNrQXBpS2V5Q29va2llKCd0ay1hcGkta2V5JykgfHwgYXBpS2V5U2VydmljZS5nZXRBcGlFeHBsb3JlS2V5KCk7IC8vQVBJIEtleVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgbmFtZTogJ2FwaWtleScsXHJcbiAgc3R5bGU6ICdxdWVyeScsXHJcbiAgdmFsdWU6IGtvLm9ic2VydmFibGUoYXBpS2V5KVxyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvYXBpa2V5LmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXHJcbiAqIEFqYXggU2VydmljZVxyXG4gKiBAcGFyYW0gdXJsXHJcbiAqIEBwYXJhbSBtZXRob2RcclxuICogQHBhcmFtIGNhbGxiYWNrXHJcbiAqL1xyXG52YXIgYWpheFNlcnZpY2UgPSBmdW5jdGlvbiAodXJsLCBtZXRob2QsIGNhbGxiYWNrKSB7XHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IG1ldGhvZCxcclxuICAgIHVybDogdXJsLFxyXG4gICAgYXN5bmM6IHRydWUsXHJcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICBjb21wbGV0ZTogY2FsbGJhY2tcclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGaWx0ZXJzIGFuZCBwcmVwYXJlcyBwYXJhbXMgcGFpcnNcclxuICogQHBhcmFtIGFyclxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbnZhciBwcmVwYXJlVXJsID0gZnVuY3Rpb24gKGFycikge1xyXG4gIHZhciByZXBsYWNlbWVudCwgdXJsLCBkb21haW4sIHBhdGgsIG1ldGhvZCwgYXBpS2V5LCBwYXJhbXM7XHJcblxyXG4gIGlmICghYXJyICYmICFhcnIubGVuZ3RoKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIFxyXG4gIGRvbWFpbiA9IGFyclswXS5iYXNlO1xyXG4gIHBhdGggPSBhcnJbMF0ucGF0aDtcclxuICBhcGlLZXkgPSBhcnJbMV07XHJcbiAgcGFyYW1zID0gYXJyWzJdLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgcmV0dXJuIGl0ZW0uc3R5bGUgPT09ICdxdWVyeSc7XHJcbiAgfSk7XHJcblxyXG4gIC8vIGFyciBvZiB0ZW1wbGF0ZSBtYXJrc1xyXG4gIHJlcGxhY2VtZW50ID0gcGF0aC5tYXRjaCgvKFtee10qPylcXHcoPz1cXH0pL2dtaSk7XHJcblxyXG4gIC8vIGFyciBvZiB0ZW1wbGF0ZSBwYXJhbXNcclxuICB2YXIgdGVtcGxhdGVzQXJyID0gYXJyWzJdLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgcmV0dXJuIGl0ZW0uc3R5bGUgPT09ICd0ZW1wbGF0ZSc7XHJcbiAgfSk7XHJcblxyXG4gIC8vIHJlcGxhY2VtZW50XHJcbiAgcmVwbGFjZW1lbnQuZm9yRWFjaChmdW5jdGlvbiAodmFsKSB7XHJcbiAgICB2YXIgcGFyYW0gPSB0ZW1wbGF0ZXNBcnIuZmluZChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICByZXR1cm4gaXRlbS5uYW1lID09PSB2YWw7XHJcbiAgICB9KTtcclxuICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoJ3snKyBwYXJhbS5uYW1lICsgJ30nLCBwYXJhbS52YWx1ZSgpIHx8IHBhcmFtLmRlZmF1bHQpO1xyXG4gIH0pO1xyXG5cclxuICAvLyBhZGRzIGFwaUtleSBwYXJhbVxyXG4gIGlmICghcGFyYW1zWzBdIHx8IHBhcmFtc1swXS5uYW1lICE9PSAnYXBpa2V5Jykge1xyXG4gICAgcGFyYW1zLnVuc2hpZnQoYXBpS2V5KTtcclxuICB9XHJcblxyXG4gIC8vIHByZXBhcmVzIHBhcmFtcyBwYXJ0IG9mIHVybFxyXG4gIHBhcmFtcyA9IHBhcmFtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgcmV0dXJuIFtpdGVtLm5hbWUsIGl0ZW0udmFsdWUoKSB8fCBpdGVtLmRlZmF1bHRdLmpvaW4oJz0nKTtcclxuICAgIH0pLmpvaW4oJyYnKTtcclxuXHJcbiAgdXJsID0gW2RvbWFpbiwgJy8nLCBwYXRoLCAnPycsIHBhcmFtc10uam9pbignJyk7XHJcblxyXG4gIHJldHVybiBlbmNvZGVVUkkodXJsKTtcclxufTtcclxuXHJcbi8vIHNlbmRzIHJlcXVlc3QgdG8gZ2V0IHRoZSBzZWNvbmQgY29sdW1uXHJcbnZhciBzZW5kUHJpbWFyeVJlcXVlc3QgPSBmdW5jdGlvbiAoYXJyLCByZXF1ZXN0cywgZ2xvYmFsKSB7XHJcbiAgdmFyIHVybCA9IHByZXBhcmVVcmwoYXJyKTtcclxuXHJcbiAgYWpheFNlcnZpY2UodXJsLCBhcnJbMF0ubWV0aG9kLCBmdW5jdGlvbihyZXMsIG1zZykge1xyXG5cdFx0dmFyIHJlc09iaiA9IHtcclxuXHRcdFx0cmVxOiB1cmwsXHJcblx0XHRcdGluZGV4OiByZXF1ZXN0cygpLmxlbmd0aFxyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAobXNnID09ICdlcnJvcicpIHtcclxuXHRcdFx0dmFyIGVyciA9IHJlcyAmJlxyXG5cdFx0XHRcdHJlcy5yZXNwb25zZUpTT04gJiZcclxuXHRcdFx0XHRyZXMucmVzcG9uc2VKU09OLmVycm9ycyAmJlxyXG5cdFx0XHRcdHJlcy5yZXNwb25zZUpTT04uZXJyb3JzWzBdO1xyXG5cclxuXHRcdFx0cmVzT2JqLmVycm9yID0ge1xyXG5cdFx0XHRcdGNvZGU6IGVyciA/IGVyci5jb2RlOiA1MDAsXHJcblx0XHRcdFx0bWVzc2FnZTogZXJyID8gZXJyLmRldGFpbDogJ05vIHJlc3BvbmNlIGRhdGEhJ1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRnbG9iYWwubGFzdFJlc3BvbnNlID0gcmVzT2JqLnJlcyA9IHtcclxuXHRcdFx0XHRpZDogYXJyWzBdLmlkLCAvLyBtZXRob2QgaWQgd2FzIHVzZWRcclxuXHRcdFx0XHRyZXM6IHJlcy5yZXNwb25zZUpTT04gLy8gcmVzcG9uc2VcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBleHBvcnRpbmcgZGF0YSB1c2luZyBvYnNlcnZhYmxlXHJcblx0XHRyZXF1ZXN0cy51bnNoaWZ0KHJlc09iaik7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBzZW5kUHJpbWFyeVJlcXVlc3Q7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9hamF4U2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjb25maWcgPSBrby5vYnNlcnZhYmxlKCk7XG5cbiQuYWpheCh7XG5cdHR5cGU6ICdHRVQnLFxuXHR1cmw6IFtcblx0XHQnaHR0cDovLycsXG5cdFx0ZG9jdW1lbnQubG9jYXRpb24uaG9zdG5hbWUgfHwgZG9jdW1lbnQubG9jYXRpb24uaG9zdCxcblx0XHRkb2N1bWVudC5sb2NhdGlvbi5wb3J0ICYmICc6JyArIGRvY3VtZW50LmxvY2F0aW9uLnBvcnQsXG5cdFx0Jy9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb25maWcuanNvbidcblx0XS5qb2luKCcnKSxcblx0YXN5bmM6IHRydWUsXG5cdGRhdGFUeXBlOiBcImpzb25cIixcblx0Y29tcGxldGU6IGZ1bmN0aW9uKHJlcywgbXNnKSB7XG5cdFx0aWYgKG1zZyA9PSAnZXJyb3InKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdjYW5cXCd0IGxvYWQgY29uZmlnLmpzb24hJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbmZpZyhyZXMucmVzcG9uc2VKU09OKTtcblx0XHR9XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbmZpZztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9jb25maWdTZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGhmID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9oZWxwZXJGdW5jJyk7XHJcbnZhciBzZWxmO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBNZW51IFZpZXctTW9kZWxcclxuICogQHBhcmFtIGJhc2VcclxuICogQHBhcmFtIGNhdGVnb3J5XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gTWVudVZpZXdNb2RlbChiYXNlLCBjYXRlZ29yeSkge1xyXG4gIHNlbGYgPSB0aGlzO1xyXG4gIHRoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcclxuICB0aGlzLmNhdGVnb3JpZXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoT2JqZWN0LmtleXMoYmFzZSkubWFwKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2hlY2tlZDoga28ub2JzZXJ2YWJsZSghaW5kZXgpLFxyXG4gICAgICBuYW1lOiBpdGVtLFxyXG4gICAgICBsaW5rOiBmYWxzZVxyXG4gICAgfVxyXG4gIH0pKTtcclxuXHJcbiAgLy8gaW5pdGlhbCBsb2FkXHJcbiAgdGhpcy5zZWxlY3RDYXRlZ29yeSh0aGlzLmNhdGVnb3JpZXMoKVswXSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNZW51IFZpZXctTW9kZWwgbWV0aG9kXHJcbiAqIEBwYXJhbSBjYXRlZ29yeVxyXG4gKi9cclxuTWVudVZpZXdNb2RlbC5wcm90b3R5cGUuc2VsZWN0Q2F0ZWdvcnkgPSBmdW5jdGlvbiAoY2F0ZWdvcnkpIHtcclxuICB2YXIgY2F0ZWdvcnlOYW1lID0gY2F0ZWdvcnkubmFtZTtcclxuICBzZWxmLmNhdGVnb3J5KGNhdGVnb3J5TmFtZSk7XHJcbiAgaGYuY2hlY2tBY3RpdmUoc2VsZi5jYXRlZ29yaWVzLCBjYXRlZ29yeU5hbWUpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNZW51Vmlld01vZGVsO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvbWVudVZpZXdNb2RlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMuZ2V0TW9kZWxBcnJheSA9IGZ1bmN0aW9uIGdldE1vZGVsQXJyYXkocGFyYW1zKSB7XHJcbiAgICB2YXIgb2JqID0gcGFyYW1zLm9iaiB8fCB7fSxcclxuICAgICAgICBhcnIgPSBwYXJhbXMuYXJyIHx8IFtdLFxyXG4gICAgICAgIHByb3AgPSBwYXJhbXMucHJvcCB8fCAnbmFtZSc7XHJcblxyXG4gICAgZm9yICh2YXIgaSBpbiBvYmopIHtcclxuICAgICAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShpKSkgeyBjb250aW51ZTsgfVxyXG5cclxuICAgICAgICB2YXIgaXRlbSA9IGFyci5maW5kKGZ1bmN0aW9uIChtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbTEubmFtZSA9PT0gb2JqW2ldW3Byb3BdO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoaXRlbSkgeyBjb250aW51ZTsgfVxyXG5cclxuICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgIGNoZWNrZWQ6IGtvLm9ic2VydmFibGUoZmFsc2UpLFxyXG4gICAgICAgICAgICBuYW1lOiBvYmpbaV1bcHJvcF1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBhcnI7XHJcbn07XHJcblxyXG5leHBvcnRzLmNoZWNrQWN0aXZlID0gZnVuY3Rpb24gY2hlY2tBY3RpdmUoa29BcnIsIGFjdGl2ZUVsZW0pIHtcclxuICAgIGlmICgha29BcnIgJiYgIWFjdGl2ZUVsZW0pIHtyZXR1cm4gZmFsc2U7fVxyXG5cclxuICAgIGtvQXJyKGtvQXJyKCkubWFwKGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICBpZiAob2JqLm5hbWUgPT09IGFjdGl2ZUVsZW0pIHtcclxuICAgICAgICAgICAgb2JqLmNoZWNrZWQodHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb2JqLmNoZWNrZWQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfSkpO1xyXG59O1xyXG5cclxuZXhwb3J0cy5pdGVyYXRlID0gZnVuY3Rpb24gKG9iaikge1xyXG5cdGZvciAodmFyIHByb3BlcnR5IGluIG9iaikge1xyXG5cdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBvYmpbcHJvcGVydHldID09IFwib2JqZWN0XCIpIHtcclxuXHRcdFx0XHRpdGVyYXRlKG9ialtwcm9wZXJ0eV0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCd8JyArIHByb3BlcnR5ICsgXCIgfCAgXCIgKyBvYmpbcHJvcGVydHldICsgJ3wnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9oZWxwZXJGdW5jLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHNlbGY7XHJcbnZhciBiYXNlO1xyXG52YXIgaGYgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2hlbHBlckZ1bmMnKTtcclxuLyoqXHJcbiAqIFBhcmFtcyBWaWV3LU1vZGVsXHJcbiAqIEBwYXJhbSByYXdcclxuICogQHBhcmFtIG1ldGhvZFxyXG4gKiBAcGFyYW0gcGFyYW1zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gUGFyYW1zVmlld01vZGVsKHJhdywgbWV0aG9kLCBwYXJhbXMpIHtcclxuICBiYXNlID0gcmF3O1xyXG4gIHNlbGYgPSB0aGlzO1xyXG4gIHRoaXMuYW5pbWF0aW9uU3BlZWQgPSAyMDA7XHJcblxyXG4gIC8vIG9ic2VydmFibGVzXHJcbiAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XHJcbiAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XHJcbiAgdGhpcy5pc0hpZGRlbiA9IGtvLm9ic2VydmFibGUodHJ1ZSk7XHJcbiAgdGhpcy5wYXJhbUluRm9jdXMgPSBrby5vYnNlcnZhYmxlKCcnKTtcclxuXHR0aGlzLnBhcmFtc01vZGVsID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcclxuXHJcblx0Ly8gY29tcHV0ZWRcclxuXHQvLyB0aGlzLnBhcmFtc01vZGVsID0ga28uY29tcHV0ZWQodGhpcy51cGRhdGVQYXJhbXNNb2RlbCwgdGhpcyk7XHJcblx0dGhpcy51cGRhdGVWaWV3TW9kZWwoKTtcclxuXHR0aGlzLm1ldGhvZC5zdWJzY3JpYmUodGhpcy51cGRhdGVWaWV3TW9kZWwsIHRoaXMpO1xyXG5cclxuXHR0aGlzLmlzRGlydHkgPSBrby5jb21wdXRlZCh0aGlzLmNoZWNrRGlydHksIHRoaXMpO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWwgYnVpbGQgb2YgU2VsZWN0IE1vZGVsXHJcbiAqL1xyXG5QYXJhbXNWaWV3TW9kZWwucHJvdG90eXBlLnVwZGF0ZVZpZXdNb2RlbCA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgb2JqID0gdGhpcy5tZXRob2QoKS5wYXJhbWV0ZXJzIHx8IHt9LFxyXG5cdFx0YXJyID0gW107XHJcblxyXG5cdGZvciAodmFyIGkgaW4gb2JqKSB7XHJcblx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShpKSkge2NvbnRpbnVlO31cclxuXHJcblx0XHQvLyBjb3BpZXMgYWxsIHZhbHVlcyBmcm9tIG1vZGVsIHRvIHZpZXctbW9kZWxcclxuXHRcdHZhciB2bVBhcmFtID0gJC5leHRlbmQoe30sIG9ialtpXSk7XHJcblxyXG5cdFx0dm1QYXJhbS52YWx1ZSA9IGtvLm9ic2VydmFibGUodm1QYXJhbS52YWx1ZSB8fCAodm1QYXJhbS5zZWxlY3QgJiYgdm1QYXJhbS5kZWZhdWx0KSB8fCAnJyk7XHJcblxyXG5cdFx0Ly9hZGQgb2JzZXJ2YWJsZSBmb3Igc2VsZWN0ZWQgb3B0aW9uc1xyXG5cdFx0aWYgKHZtUGFyYW0uc2VsZWN0KSB7XHJcblx0XHRcdHZtUGFyYW0ub3B0aW9ucyA9IGtvLm9ic2VydmFibGVBcnJheShvYmpbaV0ub3B0aW9ucy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdFx0XHR2YXIgb2JqID0gJC5leHRlbmQoe30sIGl0ZW0pO1xyXG5cdFx0XHRcdG9iai5jaGVja2VkID0ga28ub2JzZXJ2YWJsZShpdGVtLmNoZWNrZWQpO1xyXG5cdFx0XHRcdHJldHVybiBvYmo7XHJcblx0XHRcdH0pKVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vICdkaXJ0eScgZmxhZyB3YXRjaGVyIGZvciBjdXJyZW50IGZpZWxkXHJcblx0XHR2bVBhcmFtLmlzRGlydHkgPSBrby5wdXJlQ29tcHV0ZWQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodGhpcy5zZWxlY3QpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy52YWx1ZSgpICE9PSB0aGlzLmRlZmF1bHQgJiYgdGhpcy52YWx1ZSgpICE9PSAnbm9uZSc7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuICEhKHRoaXMudmFsdWUoKS50b1N0cmluZygpKS50cmltKCkubGVuZ3RoO1xyXG5cdFx0fSwgdm1QYXJhbSk7XHJcblxyXG5cdFx0Ly8gYWRkIGNhbGVuZGFyIGJ0biBmb3IgY3VycmVudCBmaWVsZFxyXG5cdFx0dm1QYXJhbS5oYXNDYWxlbmRhciA9IGkuc2VhcmNoKC8oZGF0ZXx0aW1lKS9nbWkpICE9IC0xO1xyXG5cclxuXHRcdC8vIGFkZCBwb3AtdXAgYnRuIGZvciBjdXJyZW50IGZpZWxkXHJcblx0XHR2bVBhcmFtLmhhc1BvcFVwID0gaS5zZWFyY2goLyhhdHRyYWN0aW9uSWR8dmVudWVJZCkvZ21pKSAhPSAtMTtcclxuXHJcblx0XHRhcnIucHVzaCh2bVBhcmFtKTtcclxuXHR9XHJcblxyXG5cdC8vIHByZXBhcmUgb3V0cHV0IGZvciByZXF1ZXN0XHJcblx0dGhpcy5wYXJhbXNNb2RlbChhcnIpO1xyXG5cdHRoaXMucGFyYW1JbkZvY3VzKHRoaXMucGFyYW1zTW9kZWwoKVswXSk7XHJcblx0dGhpcy5wcmVwYXJlVXJsUGFpcnMoYXJyLCB0aGlzLnBhcmFtcyk7XHJcblx0cmV0dXJuIGFycjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEaXJ0eSBwYXJhbXMgZm9ybSBvYnNlcnZhYmxlIG1ldGhvZFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUuY2hlY2tEaXJ0eSA9IGZ1bmN0aW9uICgpIHtcclxuXHR0aGlzLnByZXBhcmVVcmxQYWlycyh0aGlzLnBhcmFtc01vZGVsKCksIHRoaXMucGFyYW1zKTtcclxuXHR2YXIgZGlydHkgPSB0aGlzLnBhcmFtc01vZGVsKCkuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcblx0XHRyZXR1cm4gaXRlbS5pc0RpcnR5KCkgPT09IHRydWU7XHJcblx0fSk7XHJcblx0cmV0dXJuIGRpcnR5Lmxlbmd0aCA+IDA7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIEVudGVyIGtleSBoYW5kbGVyXHJcbiAqIEBwYXJhbSBtb2RlbFxyXG4gKiBAcGFyYW0gZXZlbnRcclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUub25FbnRlcktleURvd24gPSBmdW5jdGlvbiAobW9kZWwsIGV2ZW50KSB7XHJcbiAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAkKCcjYXBpLWV4cC1nZXQtYnRuJykudHJpZ2dlcignY2xpY2snKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNsaWRlIHRvZ2dsZSBmb3IgcGFyYW1zIGNvbnRhaW5lciBtZXRob2RcclxuICogQHBhcmFtIHZpZXdNb2RlbFxyXG4gKiBAcGFyYW0gZXZlbnRcclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUuc2xpZGVUb2dnbGUgPSBmdW5jdGlvbiAodmlld01vZGVsLCBldmVudCkge1xyXG4gICQoZXZlbnQuY3VycmVudFRhcmdldClcclxuICAgIC5wYXJlbnRzKCcuanMtc2xpZGUtY29udHJvbCcpXHJcbiAgICAuZmluZCgnLmpzLXNsaWRlLXdyYXBwZXInKVxyXG4gICAgLnNsaWRlVG9nZ2xlKHZpZXdNb2RlbC5hbmltYXRpb25TcGVlZCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICB2aWV3TW9kZWwuaXNIaWRkZW4oIXZpZXdNb2RlbC5pc0hpZGRlbigpKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1hY2hlcyBmb2N1c2VkIHBhcmFtXHJcbiAqIEBwYXJhbSBpdGVtXHJcbiAqL1xyXG5QYXJhbXNWaWV3TW9kZWwucHJvdG90eXBlLm9uRm9jdXMgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gIHNlbGYucGFyYW1JbkZvY3VzKGl0ZW0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpbHRlcnMgcGFyYW1zIGJ5IGRlZmluZWQgdmFsdWVcclxuICogQHBhcmFtIGFyclxyXG4gKiBAcGFyYW0ga29PYnNcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5QYXJhbXNWaWV3TW9kZWwucHJvdG90eXBlLnByZXBhcmVVcmxQYWlycyA9IGZ1bmN0aW9uIChhcnIsIGtvT2JzKSB7XHJcbiAgaWYgKCFhcnIgJiYgIWtvT2JzKSB7cmV0dXJuIGZhbHNlO31cclxuXHJcbiAgcmV0dXJuIGtvT2JzKGFyci5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgIHJldHVybiAoaXRlbS52YWx1ZSgpIHx8IGl0ZW0uZGVmYXVsdCk7XHJcbiAgfSkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE9uIHNlbGVjdCB2YWx1ZSBoYW5kbGVyIGZvciBwYXJhbXMgc2VsZWN0XHJcbiAqIEBwYXJhbSBwYXJhbSB7b2JqZWN0fSBwYXJhbWV0ZXIgdmlldy1tb2RlbFxyXG4gKiBAcGFyYW0gb3B0aW9uIHtvYmplY3R9IG9wdGlvbiB2aWV3LW1vZGVsXHJcbiAqL1xyXG5QYXJhbXNWaWV3TW9kZWwucHJvdG90eXBlLm9uU2VsZWN0UGFyYW1WYWx1ZSA9IGZ1bmN0aW9uIChwYXJhbSwgb3B0aW9uKSB7XHJcblx0aGYuY2hlY2tBY3RpdmUocGFyYW0ub3B0aW9ucywgb3B0aW9uLm5hbWUpO1xyXG5cdHBhcmFtLnZhbHVlKG9wdGlvbi5uYW1lKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQYXJhbXMgY2xlYXIgYnV0dG9uIGhhbmRsZXJcclxuICogQHBhcmFtIHZtIHtvYmplY3R9IHZpZXcgbW9kZWxcclxuICogQHBhcmFtIGUge29iamVjdH0gZXZlbnRcclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUub25QYXJhbXNDbGVhciA9IGZ1bmN0aW9uICh2bSwgZSkge1xyXG5cdHRoaXMudXBkYXRlVmlld01vZGVsKCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBhcmFtc1ZpZXdNb2RlbDtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9WaWV3TW9kZWxzL3BhcmFtc1ZpZXdNb2RlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBoZiA9IHJlcXVpcmUoJy4uL21vZHVsZXMvaGVscGVyRnVuYycpO1xyXG52YXIgc2VsZjtcclxudmFyIGJhc2U7XHJcbnZhciBjYXRlZ29yeTtcclxuXHJcbi8qKlxyXG4gKiBNZXRob2RzIFZpZXctTW9kZWxcclxuICogQHBhcmFtIHJhd1xyXG4gKiBAcGFyYW0gY2F0ZWdvcnlcclxuICogQHBhcmFtIG1ldGhvZFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIE1ldGhvZHNWaWV3TW9kZWwocmF3LCBjYXRlZ29yeSwgbWV0aG9kKSB7XHJcbiAgc2VsZiA9IHRoaXM7XHJcbiAgYmFzZSA9IHJhdztcclxuXHJcbiAgLy8gb2JzZXJ2YWJsZXNcclxuICB0aGlzLmNhdGVnb3J5ID0gY2F0ZWdvcnk7XHJcbiAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XHJcbiAgdGhpcy50b2dnbGVQb3BVcCA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xyXG4gIHRoaXMucmFkaW9zTW9kZWwgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xyXG4gIHRoaXMubWV0aG9kc1ZpZXdNb2RlbCA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XHJcbiAgdGhpcy51cGRhdGVNb2RlbCh0aGlzLmNhdGVnb3J5KCkpO1xyXG4gIHRoaXMuY2F0ZWdvcnkuc3Vic2NyaWJlKHRoaXMudXBkYXRlTW9kZWwsIHRoaXMpO1xyXG59XHJcblxyXG4vKipcclxuICogT24gY2F0ZWdvcnkgY2hhbmdlIGhhbmRsZXJcclxuICogTWV0aG9kcyBWaWV3LU1vZGVsIG1ldGhvZFxyXG4gKiBAcGFyYW0gY2F0ZWdvcnlcclxuICovXHJcbk1ldGhvZHNWaWV3TW9kZWwucHJvdG90eXBlLnVwZGF0ZU1vZGVsID0gZnVuY3Rpb24gKGNhdGVnb3J5KSB7XHJcbiAgLy8gaW5pdGlhbCByYWRpb3MgbW9kZWxcclxuICBzZWxmLnVwZGF0ZVJhZGlvc01vZGVsKGJhc2VbY2F0ZWdvcnldKTtcclxuICAvLyBpbml0aWFsIHNlbGVjdCBtb2RlbCAoZmlyc3QgbWV0aG9kIGluIGZpcnN0IHNlY3Rpb24gZm9yIHN0YXJ0KVxyXG4gIHNlbGYudXBkYXRlU2VsZWN0KHNlbGYucmFkaW9zTW9kZWwoKVswXSk7XHJcbn07XHJcblxyXG4vKipcclxuICogT25jaGFuZ2UgaGFuZGxlciBmb3IgUmFkaW8gYnV0dG9uc1xyXG4gKiBAcGFyYW0gaXRlbVxyXG4gKi9cclxuTWV0aG9kc1ZpZXdNb2RlbC5wcm90b3R5cGUub25jaGFuZ2VSYWRpb3MgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gIC8vdXBkYXRlIFJhZGlvcyBNb2RlbFxyXG4gIGhmLmNoZWNrQWN0aXZlKHNlbGYucmFkaW9zTW9kZWwsIGl0ZW0ubmFtZSk7XHJcbiAgLy91cGRhdGUgU2VsZWN0IE1vZGVsXHJcbiAgc2VsZi51cGRhdGVTZWxlY3QoaXRlbSk7XHJcbn07XHJcblxyXG4vKipcclxuICogSW5pdGlhbCBidWlsZCBvZiBSYWRpb3MgTW9kZWxcclxuICogQHBhcmFtIHBhcmFtXHJcbiAqIEByZXR1cm5zIHtBcnJheX1cclxuICovXHJcbk1ldGhvZHNWaWV3TW9kZWwucHJvdG90eXBlLnVwZGF0ZVJhZGlvc01vZGVsID0gZnVuY3Rpb24gKHBhcmFtKSB7XHJcbiAgdmFyIG9iaiA9IHBhcmFtIHx8IHt9LFxyXG4gICAgYXJyID0gW107XHJcblxyXG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XHJcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShpKSkgeyBjb250aW51ZTsgfVxyXG4gICAgdmFyIGl0ZW0gPSB7XHJcbiAgICAgIGNoZWNrZWQ6IGtvLm9ic2VydmFibGUoaSA9PT0gJ0FMTCcpLFxyXG4gICAgICBuYW1lOiBpXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChpID09PSAnQUxMJykge1xyXG4gICAgICBhcnIudW5zaGlmdChpdGVtKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYXJyLnB1c2goaXRlbSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cdGFyciA9IGFyci5zb3J0KGNvbXBhcmVNZXRob2RzKTtcclxuICB0aGlzLnJhZGlvc01vZGVsKGFycik7XHJcbiAgcmV0dXJuIGFycjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsIGJ1aWxkIG9mIFNlbGVjdCBNb2RlbFxyXG4gKiBAcGFyYW0gaXRlbVxyXG4gKi9cclxuTWV0aG9kc1ZpZXdNb2RlbC5wcm90b3R5cGUudXBkYXRlU2VsZWN0ID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICB2YXIgb2JqID0gYmFzZVtzZWxmLmNhdGVnb3J5KCldW2l0ZW0ubmFtZV18fCB7fSxcclxuICAgIGFyciA9IFtdLFxyXG4gICAgY291bnQgPSAwO1xyXG5cclxuICBmb3IgKHZhciBpIGluIG9iaikge1xyXG4gICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoaSkpIHsgY29udGludWU7IH1cclxuICAgIHZhciBwcm9wZXJ0eSA9IG9ialtpXTtcclxuXHRcdC8vIGNvcGllcyBhbGwgdmFsdWVzIGZyb20gbW9kZWwgdG8gdmlldy1tb2RlbFxyXG5cdFx0dmFyIHZtTWV0aG9kID0gJC5leHRlbmQoe30sIHByb3BlcnR5KTtcclxuXHJcblx0XHRkZWxldGUgdm1NZXRob2QucGFyYW1ldGVycztcclxuXHRcdHZtTWV0aG9kLmNoZWNrZWQgPSBrby5vYnNlcnZhYmxlKCFjb3VudCk7XHJcblxyXG5cdFx0YXJyLnB1c2godm1NZXRob2QpO1xyXG5cclxuICAgIC8vIHNldCBnbG9iYWwgb2JzZXJ2YWJsZVxyXG4gICAgIWNvdW50ICYmIHRoaXMubWV0aG9kKGJhc2VbcHJvcGVydHkuY2F0ZWdvcnldW3Byb3BlcnR5Lm1ldGhvZF1bcHJvcGVydHkuaWRdKTtcclxuXHJcbiAgICBjb3VudCsrO1xyXG5cclxuICB9XHJcblxyXG5cdHRoaXMubWV0aG9kc1ZpZXdNb2RlbChhcnIpO1xyXG5cdHJldHVybiBhcnI7XHJcbn07XHJcblxyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS5vblNlbGVjdE1ldGhvZCA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgaGYuY2hlY2tBY3RpdmUoc2VsZi5tZXRob2RzVmlld01vZGVsLCBpdGVtLm5hbWUpO1xyXG4gIHNlbGYubWV0aG9kKGJhc2VbaXRlbS5jYXRlZ29yeV1baXRlbS5tZXRob2RdW2l0ZW0uaWRdKTtcclxufTtcclxuXHJcbk1ldGhvZHNWaWV3TW9kZWwucHJvdG90eXBlLm9uQWJvdXRDbGljayA9IGZ1bmN0aW9uIChtb2RlbCwgZXZlbnQpIHtcclxuICBtb2RlbC50b2dnbGVQb3BVcCghbW9kZWwudG9nZ2xlUG9wVXAoKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogU29ydCBmdW5jdGlvbiBmb3IgbWV0aG9kcyBhcmF5XHJcbiAqIEBwYXJhbSBmXHJcbiAqIEBwYXJhbSBzXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiBjb21wYXJlTWV0aG9kcyhmLHMpIHtcclxuXHR2YXIgYSA9IGYubmFtZS50b1VwcGVyQ2FzZSgpO1xyXG5cdHZhciBiID0gcy5uYW1lLnRvVXBwZXJDYXNlKCk7XHJcblxyXG5cdGlmIChhID09PSBiKSB7cmV0dXJuIDA7fVxyXG5cdGlmIChhID09PSAnQUxMJyB8fFxyXG5cdFx0KGEgPT09ICdHRVQnICYmIChiID09PSAnUE9TVCcgfHwgYiA9PT0gJ1BVVCcgfHwgYiA9PT0gJ0RFTEVURScpKSB8fFxyXG5cdFx0KGEgPT09ICdQT1NUJyAmJiAoYiA9PT0gJ1BVVCcgfHwgYiA9PT0gJ0RFTEVURScpKSB8fFxyXG5cdFx0KGEgPT09ICdQVVQnICYmIGIgPT09ICdERUxFVEUnKSkge1xyXG5cdFx0cmV0dXJuIC0xO1xyXG5cdH1cclxuXHRyZXR1cm4gMTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNZXRob2RzVmlld01vZGVsO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL1ZpZXdNb2RlbHMvbWV0aG9kc1ZpZXdNb2RlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIganNvbkhpZ2hsaWdodCA9IHJlcXVpcmUoJy4vLi4vbW9kdWxlcy9qc29uLWhpZ2hsaWdodCcpO1xudmFyIHNsaWRlciA9IHJlcXVpcmUoJy4uL21vZHVsZXMvc2xpZGVyJyk7XG52YXIgZmlsdGVyID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnLmpzb24nKTtcbnZhciBzZWxmO1xuXG5mdW5jdGlvbiBSZXF1ZXN0c0xpc3RWaWV3TW9kZWwocmVxdWVzdHMsIHVybCkge1xuXHR0aGlzLnVybCA9IHVybDtcblx0c2VsZiA9IHRoaXM7XG5cdHRoaXMuY29sb3JzID0gW1xuXHRcdCdjb2x1bW4tY29sb3ItMScsXG5cdFx0J2NvbHVtbi1jb2xvci0yJyxcblx0XHQnY29sdW1uLWNvbG9yLTMnLFxuXHRcdCdjb2x1bW4tY29sb3ItNCcsXG5cdFx0J2NvbHVtbi1jb2xvci01Jyxcblx0XHQnY29sdW1uLWNvbG9yLTYnLFxuXHRcdCdjb2x1bW4tY29sb3ItNycsXG5cdFx0J2NvbHVtbi1jb2xvci04Jyxcblx0XHQnY29sdW1uLWNvbG9yLTknLFxuXHRcdCdjb2x1bW4tY29sb3ItMTAnLFxuXHRcdCdjb2x1bW4tY29sb3ItMTEnLFxuXHRcdCdjb2x1bW4tY29sb3ItMTInXG5cdF07XG5cdHRoaXMucmVxdWVzdHMgPSByZXF1ZXN0cztcblx0dGhpcy5pc0FjdGl2ZVRhYiA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuXHR0aGlzLnZpZXdNb2RlbCA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XG5cdHRoaXMuY2xlYXJCdG5Jc1Zpc2libGUgPSBrby5jb21wdXRlZCh0aGlzLl9pc1Zpc2libGUsIHRoaXMpO1xuXHR0aGlzLnJlcXVlc3RzLnN1YnNjcmliZSh0aGlzLnVwZGF0ZU1vZGVsLCB0aGlzKTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgVmlld21vZGVsIG9mIHJlcXVlc3QgbGlzdFxuICogQHBhcmFtIGFyclxuICovXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLnVwZGF0ZU1vZGVsID0gZnVuY3Rpb24gKGFycikge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdFxuXHR2YXIgbmV3TW9kZWwgPSB0aGlzLnJlcXVlc3RzKClcblx0XHQubWFwKGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdHZhciBpdGVtID0gICQuZXh0ZW5kKHt9LCBvYmosIHtcblx0XHRcdFx0Y29sb3I6IHNlbGYuY29sb3JzW29iai5pbmRleCAlIHNlbGYuY29sb3JzLmxlbmd0aF0sXG5cdFx0XHRcdGFjdGl2ZToga28ub2JzZXJ2YWJsZShmYWxzZSksXG5cdFx0XHRcdGNvcGllZDoga28ub2JzZXJ2YWJsZShmYWxzZSksXG5cdFx0XHRcdHJlc0hUTUw6IGtvLm9ic2VydmFibGUoJycpXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH0pO1xuXHRzbGlkZXIucmVtb3ZlKHNlbGYudmlld01vZGVsKCkubGVuZ3RoKTtcblx0c2VsZi52aWV3TW9kZWwobmV3TW9kZWwpO1xuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRzbGlkZXIuc2V0KHNlbGYudmlld01vZGVsKCkubGVuZ3RoKTtcblx0XHQkKCcjc2hvdy1kZXRhaWxzLTAnKS50cmlnZ2VyKCdjbGljaycpO1xuXHR9LCAxMCk7XG59O1xuXG4vKipcbiAqIGdldCBkZXRhaWxzXG4gKiBAcGFyYW0gZGF0YVxuICovXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLmdldE1vcmUgPSBmdW5jdGlvbiAoaWQsIGRhdGEpIHtcblx0dmFyIHBhbmVsR3JvdXAgPSB0aGlzLnBhbmVsR3JvdXA7XG5cdHZhciBwYW5lbCA9IHRoaXM7XG5cdHZhciBjdXJyZW50U2xpZGVyID0gJCgnI3NsaWRlci0nICsgcGFuZWxHcm91cC5zZWN0aW9uSW5kZXgpO1xuXHR2YXIgY29tcG9uZW50ID0gJCgnPHNlY3Rpb24gZGF0YS1iaW5kPVwiY29tcG9uZW50OiB7bmFtZTogXFwncGFuZWwtZ3JvdXBcXCcsIHBhcmFtczogcGFyYW1zfVwiPjwvc2VjdGlvbj4nKTtcblx0dmFyIGN1cnNsaWNrID0gY3VycmVudFNsaWRlci5zbGljaygnZ2V0U2xpY2snKTtcblx0XG5cdC8vIGV4dGVuZGluZyBhZGRpdGlvbmFsIGRhdGEgKGNvcHkpXG5cdHZhciBwYXJhbXMgPSAkLmV4dGVuZCh7fSwgcGFuZWxHcm91cCwge1xuXHRcdGRhdGE6IGRhdGEsXG5cdFx0Z3JvdXBJbmRleDogcGFuZWxHcm91cC5ncm91cEluZGV4ICsgMSxcblx0XHRfcHJvcFRpdGxlOiB0eXBlb2YgaWQgPT09ICdzdHJpbmcnICYmIGlkLFxuXHRcdGNvbmZpZzogcGFuZWwuY29uZmlnXG5cdH0pO1xuXG5cdC8vIGFwcGx5IGNvbXBvbmVudCBkYXRhIGJpbmRpbmdzXG5cdGtvLmFwcGx5QmluZGluZ3Moe1xuXHRcdHBhcmFtczogcGFyYW1zXG5cdH0sIGNvbXBvbmVudFswXSk7XG5cdFxuXHQvLyBhZGQgc2xpZGUgd2l0aCBzZWxlY3RlZCBkYXRhXG5cdGN1cnJlbnRTbGlkZXIuc2xpY2soJ3NsaWNrQWRkJywgY29tcG9uZW50KTtcblx0XG5cdC8vIHJlbW92ZSBvdXRzdGFuZGluZyBzbGlkZXNcblx0Zm9yICh2YXIgaSA9IGN1cnNsaWNrLnNsaWRlQ291bnQgLSAyOyBpID4gcGFuZWxHcm91cC5ncm91cEluZGV4OyBpLS0pIHtcblx0XHRjdXJyZW50U2xpZGVyLnNsaWNrKCdzbGlja1JlbW92ZScsIGksIGZhbHNlKTtcblx0fVxuXHQvLyBtb3ZlIHRvIG5leHQgc2xpZGVcblx0Y3VycmVudFNsaWRlci5zbGljaygnc2xpY2tOZXh0Jyk7XG59O1xuXG4vKipcbiAqIFZpc2liaWxpdHkgZmxhZyBmb3IgQ2xlYXIgYnRuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUuX2lzVmlzaWJsZSA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUodGhpcy5yZXF1ZXN0cykubGVuZ3RoID4gMDtcbn07XG5cbi8qKlxuICogQ2xlYXIgcmVxdWVzdHN0cyBsaXN0IGhhbmRsZXJcbiAqIEBwYXJhbSB2bVxuICogQHBhcmFtIGV2ZW50XG4gKi9cblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUub25DbGVhclJlcXVlc3RzID0gZnVuY3Rpb24gKHZtLCBldmVudCkge1xuXHR0aGlzLnJlcXVlc3RzKFtdKTtcbn07XG5cbi8qKlxuICogRGV0YWlscyB0b2dnbGUgaGFuZGxlclxuICogQHBhcmFtIHZtXG4gKiBAcGFyYW0gZXZlbnRcbiAqL1xuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5nZXREZXRhaWxzID0gZnVuY3Rpb24gKHZtLCBldmVudCkge1xuXHRpZiAoIXRoaXMucmVzSFRNTCgpLmxlbmd0aCkge1xuXHRcdGpzb25IaWdobGlnaHQodGhpcy5yZXNIVE1MLCB0aGlzLnJlcyk7XG5cdH1cblx0dGhpcy5hY3RpdmUoIXRoaXMuYWN0aXZlKCkpO1xufTtcblxuLyoqXG4gKiBKb2luIHN0cmluZyBmb3IgaWQnc1xuICogQHBhcmFtIHNcbiAqIEBwYXJhbSBpXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLmdldFN0ciA9IGZ1bmN0aW9uIChzLCBpKSB7XG5cdHZhciBzdHIgPSBzO1xuXHR2YXIgaTEgPSBpID8gaSgpIDogJyc7XG5cdHJldHVybiBbXG5cdFx0c3RyLFxuXHRcdGkxXG5cdF0uam9pbignLScpO1xufTtcblxuLyoqXG4gKiBHZXQgcmF3IHJlc3BvbnNlIGRhdGFcbiAqIEBwYXJhbSBtb2RlbCB7b2JqZWN0fVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5nZXRSYXdEYXRhID0gZnVuY3Rpb24gKG1vZGVsKSB7XG5cdHZhciBjb250ZW50ID0gbW9kZWwucmVzLnJlcztcblx0dmFyIHJhd1dpbmRvdyA9IHdpbmRvdy5vcGVuKFwiZGF0YTp0ZXh0L2pzb24sXCIgKyBlbmNvZGVVUkkoSlNPTi5zdHJpbmdpZnkoY29udGVudCwgbnVsbCwgMikpLCAnX2JsYW5rJyk7XG5cdHJhd1dpbmRvdy5mb2N1cygpO1xufTtcblxuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5jb3B5VXJsID0gZnVuY3Rpb24gKG1vZGVsLCBldmVudCkge1xuXHR2YXIgY3VycmVudEZpZWxkID0gdGhpcztcblx0c2VsZi5jbGlwYm9hcmQgPSBuZXcgQ2xpcGJvYXJkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuXHRzZWxmLmNsaXBib2FyZC5vbignc3VjY2VzcycsIGZ1bmN0aW9uIG9uU3VjY2Vzc0NvcHkoZSkge1xuXHRcdGNvbnNvbGUuaW5mbygnQWN0aW9uOicsIGUuYWN0aW9uKTtcblx0XHRjb25zb2xlLmluZm8oJ1RleHQ6JywgZS50ZXh0KTtcblx0XHRjb25zb2xlLmluZm8oJ1RyaWdnZXI6JywgZS50cmlnZ2VyKTtcblx0XHRjdXJyZW50RmllbGQuY29waWVkKHRydWUpO1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0Y3VycmVudEZpZWxkLmNvcGllZChmYWxzZSk7XG5cdFx0fSwgMTAwMCk7XG5cdFx0ZS5jbGVhclNlbGVjdGlvbigpO1xuXHR9KVxuXHRcdC5vbignZXJyb3InLCBmdW5jdGlvbiBvbkVycm9yQ29weShlKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdBY3Rpb246JywgZS5hY3Rpb24pO1xuXHRcdFx0Y29uc29sZS5lcnJvcignVHJpZ2dlcjonLCBlLnRyaWdnZXIpO1xuXHRcdH0pO1xufTtcblxuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5yZW1vdmVIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuXHRzZWxmLmNsaXBib2FyZCAmJiBzZWxmLmNsaXBib2FyZC5kZXN0cm95KCk7XG5cdGRlbGV0ZSBzZWxmLmNsaXBib2FyZDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVxdWVzdHNMaXN0Vmlld01vZGVsO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9WaWV3TW9kZWxzL3JlcXVlc3RzTGlzdFZpZXdNb2RlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgV29ya2VyID0gcmVxdWlyZSgnLi9oaWdobGlnaHRKc29uLndvcmtlci5qcycpOyAvLyBKc29uLWZvcm1hdHRlciB3b3JrZXJcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JzZXJ2YWJsZSwgY29kZSkge1xuXHR2YXIgYW5pbVRpbWUgPSAxMDA7XG5cdHZhciB3b3JrZXIgPSBuZXcgV29ya2VyO1xuXG5cdHdvcmtlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRvYnNlcnZhYmxlKGV2ZW50LmRhdGEpO1xuXG5cdFx0JChkb2N1bWVudClcblx0XHRcdC5vbignY2xpY2sgdG91Y2gnLCAnLnRtLWNvZGUtY29udGFpbmVyIC5leHBhbmRlZCcsIGZ1bmN0aW9uIGpzb25Db2RlQ29udGFpbmVyRXhwYW5kZWQoZSkge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdHZhciAkc2VsZiA9ICQodGhpcyk7XG5cdFx0XHRcdCRzZWxmXG5cdFx0XHRcdFx0LnBhcmVudCgpXG5cdFx0XHRcdFx0LmZpbmQoJz51bCcpXG5cdFx0XHRcdFx0LnNsaWRlVXAoYW5pbVRpbWUsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0JHNlbGYuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fSlcblx0XHRcdC5vbignY2xpY2sgdG91Y2gnLCAnLnRtLWNvZGUtY29udGFpbmVyIC5leHBhbmRlZC5jb2xsYXBzZWQnLCBmdW5jdGlvbiBqc29uQ29kZUNvbnRhaW5lckNvbGxhcHNlZChlKSB7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0dmFyICRzZWxmID0gJCh0aGlzKTtcblx0XHRcdFx0JHNlbGZcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpXG5cdFx0XHRcdFx0LnBhcmVudCgpXG5cdFx0XHRcdFx0LmZpbmQoJz51bCcpXG5cdFx0XHRcdFx0LnNsaWRlRG93bihhbmltVGltZSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHQkc2VsZlxuXHRcdFx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpXG5cdFx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9KVxuXHR9O1xuXHR3b3JrZXIub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRcdGNvbnNvbGUuZXJyb3IoZXZlbnQpO1xuXHR9O1xuXG5cdHdvcmtlci5wb3N0TWVzc2FnZShjb2RlKTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvanNvbi1oaWdobGlnaHQuanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHJlcXVpcmUoXCIhIUQ6XFxcXHNhbmRib3hcXFxcdGlja2V0bWFzdGVyLWFwaS1zdGFnaW5nLmdpdGh1Yi5pb1xcXFxub2RlX21vZHVsZXNcXFxcd29ya2VyLWxvYWRlclxcXFxjcmVhdGVJbmxpbmVXb3JrZXIuanNcIikoXCIvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXFxuLyoqKioqKi8gXFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxcbi8qKioqKiovIFxcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxcbi8qKioqKiovIFxcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdFxcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxcbi8qKioqKiovIFxcdFxcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxcbi8qKioqKiovIFxcdFxcdFxcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0XFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcXG4vKioqKioqLyBcXHRcXHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XFxuLyoqKioqKi8gXFx0XFx0XFx0ZXhwb3J0czoge30sXFxuLyoqKioqKi8gXFx0XFx0XFx0aWQ6IG1vZHVsZUlkLFxcbi8qKioqKiovIFxcdFxcdFxcdGxvYWRlZDogZmFsc2VcXG4vKioqKioqLyBcXHRcXHR9O1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0XFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXFxuLyoqKioqKi8gXFx0XFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHRcXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXFxuLyoqKioqKi8gXFx0XFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHRcXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxcbi8qKioqKiovIFxcdFxcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcXG4vKioqKioqLyBcXHR9XFxuLyoqKioqKi9cXG4vKioqKioqL1xcbi8qKioqKiovIFxcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXFxuLyoqKioqKi8gXFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXFxuLyoqKioqKi8gXFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXFxuLyoqKioqKi8gXFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXFxcIlxcXCI7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcXG4vKioqKioqLyBcXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcXG4vKioqKioqLyB9KVxcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXFxuLyoqKioqKi8gKFtcXG4vKiAwICovXFxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XFxuXFxuXFx0LyoqXFxyXFxuXFx0ICogQ29kZSBmb3JtYXQgd2ViLXdvcmtlclxcclxcblxcdCAqIEBwYXJhbSBldmVudFxcclxcblxcdCAqL1xcclxcblxcdC8vIHZhciBoaWdobGlnaHRKc29uKClcXHJcXG5cXHR2YXIgaGlnaGxpZ2h0SnNvbiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XFxyXFxuXFx0XFxyXFxuXFx0b25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcXHJcXG5cXHQgIHZhciBjb2RlID0gZXZlbnQuZGF0YTtcXHJcXG5cXHQgIC8vIGltcG9ydFNjcmlwdHMoJ2pzb24tcGFyc2UuanMnKTtcXHJcXG5cXHQgIHZhciByZXN1bHQgPSBoaWdobGlnaHRKc29uKGNvZGUsIHtleHBhbmRlZDogdHJ1ZX0pO1xcclxcblxcdCAgLy8gdmFyIHJlc3VsdCA9SlNPTi5zdHJpbmdpZnkoY29kZSk7XFxyXFxuXFx0ICBwb3N0TWVzc2FnZShyZXN1bHQpO1xcclxcblxcdH07XFxyXFxuXFxuXFxuLyoqKi8gfSxcXG4vKiAxICovXFxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XFxuXFxuXFx0dmFyIHByZWZpeCA9ICd0bS1jb2RlJztcXHJcXG5cXHRcXHJcXG5cXHR2YXIgZ2V0RXhwYW5kZXJDbGFzc2VzID0gZnVuY3Rpb24gKGV4cGFuZGVkKSB7XFxyXFxuXFx0XFx0aWYgKCFleHBhbmRlZCkge1xcclxcblxcdFxcdFxcdHJldHVybiAnZXhwYW5kZWQgY29sbGFwc2VkIGhpZGRlbic7XFxyXFxuXFx0XFx0fVxcclxcblxcdFxcdHJldHVybiAnZXhwYW5kZWQnO1xcclxcblxcdH07XFxyXFxuXFx0XFxyXFxuXFx0dmFyIGVuY29kZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xcclxcblxcdFxcdHJldHVybiBbJzxzcGFuPicsIHZhbHVlLCAnPC9zcGFuPiddLmpvaW4oJycpO1xcclxcblxcdH07XFxyXFxuXFx0XFxyXFxuXFx0dmFyIGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgdHlwZSwgZXhwYW5kZXJDbGFzc2VzKSB7XFxyXFxuXFx0XFx0dmFyIGtsYXNzID0gJ29iamVjdCcsXFxyXFxuXFx0XFx0XFx0b3BlbiA9ICd7JyxcXHJcXG5cXHRcXHRcXHRjbG9zZSA9ICd9JztcXHJcXG5cXHRcXHJcXG5cXHRcXHRpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcXHJcXG5cXHRcXHRcXHRrbGFzcyA9ICdhcnJheSc7XFxyXFxuXFx0XFx0XFx0b3BlbiA9ICdbJztcXHJcXG5cXHRcXHRcXHRjbG9zZSA9ICddJztcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFxyXFxuXFx0XFx0aWYgKHZhbHVlID09PSBudWxsKSB7XFxyXFxuXFx0XFx0XFx0cmV0dXJuIFtcXHJcXG5cXHRcXHRcXHRcXHQnPGxpPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJrZXlcXFwiPlxcXCInLCBlbmNvZGUoa2V5KSwgJ1xcXCI6IDwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwibnVsbFxcXCI+XFxcIicsIGVuY29kZSh2YWx1ZSksICdcXFwiPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0JzwvbGk+J1xcclxcblxcdFxcdFxcdF0uam9pbignJyk7XFxyXFxuXFx0XFx0fVxcclxcblxcdFxcclxcblxcdFxcdGlmICh0eXBlID09ICdvYmplY3QnKSB7XFxyXFxuXFx0XFx0XFx0cmV0dXJuIFtcXHJcXG5cXHRcXHRcXHRcXHQnPGxpPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCInLCBleHBhbmRlckNsYXNzZXMsICdcXFwiPjwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwia2V5XFxcIj5cXFwiJywgZW5jb2RlKGtleSksICdcXFwiOiA8L3NwYW4+ICcsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJvcGVuXFxcIj4nLCBvcGVuLCAnPC9zcGFuPiAnLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8dWwgY2xhc3M9XFxcIicsIGtsYXNzLCAnXFxcIj4nLFxcclxcblxcdFxcdFxcdFxcdFxcdFxcdGpzb24yaHRtbCh2YWx1ZSwgZXhwYW5kZXJDbGFzc2VzKSxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPC91bD4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwiY2xvc2VcXFwiPicsIGNsb3NlLCAnPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0JzwvbGk+J1xcclxcblxcdFxcdFxcdF0uam9pbignJyk7XFxyXFxuXFx0XFx0fVxcclxcblxcdFxcclxcblxcdFxcdGlmICh0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKSB7XFxyXFxuXFx0XFx0XFx0cmV0dXJuIFtcXHJcXG5cXHRcXHRcXHRcXHQnPGxpPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJrZXlcXFwiPlxcXCInLCBlbmNvZGUoa2V5KSwgJ1xcXCI6IDwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwiJywgdHlwZSwgJ1xcXCI+JywgZW5jb2RlKHZhbHVlKSwgJzwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdCc8L2xpPidcXHJcXG5cXHRcXHRcXHRdLmpvaW4oJycpO1xcclxcblxcdFxcdH1cXHJcXG5cXHRcXHRyZXR1cm4gW1xcclxcblxcdFxcdFxcdCc8bGk+JyxcXHJcXG5cXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcImtleVxcXCI+XFxcIicsIGVuY29kZShrZXkpLCAnXFxcIjogPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCInLCB0eXBlLCAnXFxcIj5cXFwiJywgZW5jb2RlKHZhbHVlKSwgJ1xcXCI8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHQnPC9saT4nXFxyXFxuXFx0XFx0XS5qb2luKCcnKTtcXHJcXG5cXHR9O1xcclxcblxcdFxcclxcblxcdHZhciBqc29uMmh0bWwgPSBmdW5jdGlvbiAoanNvbiwgZXhwYW5kZXJDbGFzc2VzKSB7XFxyXFxuXFx0XFx0dmFyIGh0bWwgPSAnJztcXHJcXG5cXHRcXHRmb3IgKHZhciBrZXkgaW4ganNvbikge1xcclxcblxcdFxcdFxcdGlmICghanNvbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XFxyXFxuXFx0XFx0XFx0XFx0Y29udGludWU7XFxyXFxuXFx0XFx0XFx0fVxcclxcblxcdFxcclxcblxcdFxcdFxcdGh0bWwgPSBbaHRtbCwgY3JlYXRlRWxlbWVudChrZXksIGpzb25ba2V5XSwgdHlwZW9mIGpzb25ba2V5XSwgZXhwYW5kZXJDbGFzc2VzKV0uam9pbignJyk7XFxyXFxuXFx0XFx0fVxcclxcblxcdFxcdHJldHVybiBodG1sO1xcclxcblxcdH07XFxyXFxuXFx0XFxyXFxuXFx0dmFyIGdldEpzb25WaWV3ZXIgPSBmdW5jdGlvbiAoZGF0YSwgb3B0aW9ucykge1xcclxcblxcdFxcdHRyeSB7XFxyXFxuXFx0XFx0XFx0cmV0dXJuIFtcXHJcXG5cXHRcXHRcXHRcXHQnPHVsIGNsYXNzPVxcXCInLCBwcmVmaXgsICctY29udGFpbmVyXFxcIj4nLFxcclxcblxcdFxcdFxcdFxcdFxcdGpzb24yaHRtbChbSlNPTi5wYXJzZShkYXRhKV0sIGdldEV4cGFuZGVyQ2xhc3NlcyhvcHRpb25zLmV4cGFuZGVkKSksXFxyXFxuXFx0XFx0XFx0XFx0JzwvdWw+J1xcclxcblxcdFxcdFxcdF0uam9pbignJyk7XFxyXFxuXFx0XFx0fSBjYXRjaCAoZSkge1xcclxcblxcdFxcdFxcdHJldHVybiBbXFxyXFxuXFx0XFx0XFx0XFx0JzxkaXYgY2xhc3M9XFxcIicsIHByZWZpeCwgJy1lcnJvclxcXCIgPicsIGUudG9TdHJpbmcoKSwgJyA8L2Rpdj4nXFxyXFxuXFx0XFx0XFx0XS5qb2luKCcnKTtcXHJcXG5cXHRcXHR9XFxyXFxuXFx0fTtcXHJcXG5cXHRcXHJcXG5cXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRhdGEsIG9wdCkge1xcclxcblxcdFxcdHZhciBqc29uID0gJyc7XFxyXFxuXFx0XFx0dmFyIG9wdGlvbnMgPSBvcHQgfHwge2V4cGFuZGVkOiB0cnVlfTtcXHJcXG5cXHRcXHRpZiAodHlwZW9mIGRhdGEgPT0gJ3N0cmluZycpIHtcXHJcXG5cXHRcXHRcXHRqc29uID0gZGF0YTtcXHJcXG5cXHRcXHR9IGVsc2UgaWYgKHR5cGVvZiBkYXRhID09ICdvYmplY3QnKSB7XFxyXFxuXFx0XFx0XFx0anNvbiA9IEpTT04uc3RyaW5naWZ5KGRhdGEpXFxyXFxuXFx0XFx0fVxcclxcblxcdFxcdHJldHVybiBnZXRKc29uVmlld2VyKGpzb24sIG9wdGlvbnMpO1xcclxcblxcdH07XFxyXFxuXFxuXFxuLyoqKi8gfVxcbi8qKioqKiovIF0pO1xcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluZGxZbkJoWTJzNkx5OHZkMlZpY0dGamF5OWliMjkwYzNSeVlYQWdORGN4WWpFd1pEUTBZMkUzTWpnd1pURXhOR0VpTENKM1pXSndZV05yT2k4dkx5NHZjMk55YVhCMGN5OWhjR2t0Wlhod2JHOXlaWEl2ZGpJdmMzSmpMMjF2WkhWc1pYTXZhR2xuYUd4cFoyaDBTbk52Ymk1M2IzSnJaWEl1YW5NaUxDSjNaV0p3WVdOck9pOHZMeTR2YzJOeWFYQjBjeTloY0drdFpYaHdiRzl5WlhJdmRqSXZjM0pqTDIxdlpIVnNaWE12YW5OdmJpMXdZWEp6WlM1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFc2RVSkJRV1U3UVVGRFpqdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3TzBGQlIwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3T3pzN096dEJRM1JEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc2NVTkJRVzlETEdWQlFXVTdRVUZEYmtRN1FVRkRRVHRCUVVOQk96czdPenM3TzBGRFlrRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNXVUZCVnp0QlFVTllMR0ZCUVZrN08wRkJSVm83UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGRk8wRkJRMFk3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEVzZDBKQlFYVkNPMEZCUTNaQ08wRkJRMEU3UVVGRFFTeEhRVUZGTzBGQlEwWTdRVUZEUVR0QlFVTkJPMEZCUTBFaUxDSm1hV3hsSWpvaWFHbG5hR3hwWjJoMFNuTnZiaTUzYjNKclpYSXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJZ1hIUXZMeUJVYUdVZ2JXOWtkV3hsSUdOaFkyaGxYRzRnWEhSMllYSWdhVzV6ZEdGc2JHVmtUVzlrZFd4bGN5QTlJSHQ5TzF4dVhHNGdYSFF2THlCVWFHVWdjbVZ4ZFdseVpTQm1kVzVqZEdsdmJseHVJRngwWm5WdVkzUnBiMjRnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlodGIyUjFiR1ZKWkNrZ2UxeHVYRzRnWEhSY2RDOHZJRU5vWldOcklHbG1JRzF2WkhWc1pTQnBjeUJwYmlCallXTm9aVnh1SUZ4MFhIUnBaaWhwYm5OMFlXeHNaV1JOYjJSMWJHVnpXMjF2WkhWc1pVbGtYU2xjYmlCY2RGeDBYSFJ5WlhSMWNtNGdhVzV6ZEdGc2JHVmtUVzlrZFd4bGMxdHRiMlIxYkdWSlpGMHVaWGh3YjNKMGN6dGNibHh1SUZ4MFhIUXZMeUJEY21WaGRHVWdZU0J1WlhjZ2JXOWtkV3hsSUNoaGJtUWdjSFYwSUdsMElHbHVkRzhnZEdobElHTmhZMmhsS1Z4dUlGeDBYSFIyWVhJZ2JXOWtkV3hsSUQwZ2FXNXpkR0ZzYkdWa1RXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwZ1BTQjdYRzRnWEhSY2RGeDBaWGh3YjNKMGN6b2dlMzBzWEc0Z1hIUmNkRngwYVdRNklHMXZaSFZzWlVsa0xGeHVJRngwWEhSY2RHeHZZV1JsWkRvZ1ptRnNjMlZjYmlCY2RGeDBmVHRjYmx4dUlGeDBYSFF2THlCRmVHVmpkWFJsSUhSb1pTQnRiMlIxYkdVZ1puVnVZM1JwYjI1Y2JpQmNkRngwYlc5a2RXeGxjMXR0YjJSMWJHVkpaRjB1WTJGc2JDaHRiMlIxYkdVdVpYaHdiM0owY3l3Z2JXOWtkV3hsTENCdGIyUjFiR1V1Wlhod2IzSjBjeXdnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlrN1hHNWNiaUJjZEZ4MEx5OGdSbXhoWnlCMGFHVWdiVzlrZFd4bElHRnpJR3h2WVdSbFpGeHVJRngwWEhSdGIyUjFiR1V1Ykc5aFpHVmtJRDBnZEhKMVpUdGNibHh1SUZ4MFhIUXZMeUJTWlhSMWNtNGdkR2hsSUdWNGNHOXlkSE1nYjJZZ2RHaGxJRzF2WkhWc1pWeHVJRngwWEhSeVpYUjFjbTRnYlc5a2RXeGxMbVY0Y0c5eWRITTdYRzRnWEhSOVhHNWNibHh1SUZ4MEx5OGdaWGh3YjNObElIUm9aU0J0YjJSMWJHVnpJRzlpYW1WamRDQW9YMTkzWldKd1lXTnJYMjF2WkhWc1pYTmZYeWxjYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHViU0E5SUcxdlpIVnNaWE03WEc1Y2JpQmNkQzh2SUdWNGNHOXpaU0IwYUdVZ2JXOWtkV3hsSUdOaFkyaGxYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtTWdQU0JwYm5OMFlXeHNaV1JOYjJSMWJHVnpPMXh1WEc0Z1hIUXZMeUJmWDNkbFluQmhZMnRmY0hWaWJHbGpYM0JoZEdoZlgxeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1d0lEMGdYQ0pjSWp0Y2JseHVJRngwTHk4Z1RHOWhaQ0JsYm5SeWVTQnRiMlIxYkdVZ1lXNWtJSEpsZEhWeWJpQmxlSEJ2Y25SelhHNGdYSFJ5WlhSMWNtNGdYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeWd3S1R0Y2JseHVYRzVjYmk4cUtpQlhSVUpRUVVOTElFWlBUMVJGVWlBcUtseHVJQ29xSUhkbFluQmhZMnN2WW05dmRITjBjbUZ3SURRM01XSXhNR1EwTkdOaE56STRNR1V4TVRSaFhHNGdLaW92SWl3aUx5b3FYSEpjYmlBcUlFTnZaR1VnWm05eWJXRjBJSGRsWWkxM2IzSnJaWEpjY2x4dUlDb2dRSEJoY21GdElHVjJaVzUwWEhKY2JpQXFMMXh5WEc0dkx5QjJZWElnYUdsbmFHeHBaMmgwU25OdmJpZ3BYSEpjYm5aaGNpQm9hV2RvYkdsbmFIUktjMjl1SUQwZ2NtVnhkV2x5WlNnbkxpOXFjMjl1TFhCaGNuTmxKeWs3WEhKY2JseHlYRzV2Ym0xbGMzTmhaMlVnUFNCbWRXNWpkR2x2YmlobGRtVnVkQ2tnZTF4eVhHNGdJSFpoY2lCamIyUmxJRDBnWlhabGJuUXVaR0YwWVR0Y2NseHVJQ0F2THlCcGJYQnZjblJUWTNKcGNIUnpLQ2RxYzI5dUxYQmhjbk5sTG1wekp5azdYSEpjYmlBZ2RtRnlJSEpsYzNWc2RDQTlJR2hwWjJoc2FXZG9kRXB6YjI0b1kyOWtaU3dnZTJWNGNHRnVaR1ZrT2lCMGNuVmxmU2s3WEhKY2JpQWdMeThnZG1GeUlISmxjM1ZzZENBOVNsTlBUaTV6ZEhKcGJtZHBabmtvWTI5a1pTazdYSEpjYmlBZ2NHOXpkRTFsYzNOaFoyVW9jbVZ6ZFd4MEtUdGNjbHh1ZlR0Y2NseHVYRzVjYmx4dUx5b3FLaW9xS2lvcUtpb3FLaW9xS2lvcVhHNGdLaW9nVjBWQ1VFRkRTeUJHVDA5VVJWSmNiaUFxS2lBdUwzTmpjbWx3ZEhNdllYQnBMV1Y0Y0d4dmNtVnlMM1l5TDNOeVl5OXRiMlIxYkdWekwyaHBaMmhzYVdkb2RFcHpiMjR1ZDI5eWEyVnlMbXB6WEc0Z0tpb2diVzlrZFd4bElHbGtJRDBnTUZ4dUlDb3FJRzF2WkhWc1pTQmphSFZ1YTNNZ1BTQXdYRzRnS2lvdklpd2lkbUZ5SUhCeVpXWnBlQ0E5SUNkMGJTMWpiMlJsSnp0Y2NseHVYSEpjYm5aaGNpQm5aWFJGZUhCaGJtUmxja05zWVhOelpYTWdQU0JtZFc1amRHbHZiaUFvWlhod1lXNWtaV1FwSUh0Y2NseHVYSFJwWmlBb0lXVjRjR0Z1WkdWa0tTQjdYSEpjYmx4MFhIUnlaWFIxY200Z0oyVjRjR0Z1WkdWa0lHTnZiR3hoY0hObFpDQm9hV1JrWlc0bk8xeHlYRzVjZEgxY2NseHVYSFJ5WlhSMWNtNGdKMlY0Y0dGdVpHVmtKenRjY2x4dWZUdGNjbHh1WEhKY2JuWmhjaUJsYm1OdlpHVWdQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXBJSHRjY2x4dVhIUnlaWFIxY200Z1d5YzhjM0JoYmo0bkxDQjJZV3gxWlN3Z0p6d3ZjM0JoYmo0blhTNXFiMmx1S0NjbktUdGNjbHh1ZlR0Y2NseHVYSEpjYm5aaGNpQmpjbVZoZEdWRmJHVnRaVzUwSUQwZ1puVnVZM1JwYjI0Z0tHdGxlU3dnZG1Gc2RXVXNJSFI1Y0dVc0lHVjRjR0Z1WkdWeVEyeGhjM05sY3lrZ2UxeHlYRzVjZEhaaGNpQnJiR0Z6Y3lBOUlDZHZZbXBsWTNRbkxGeHlYRzVjZEZ4MGIzQmxiaUE5SUNkN0p5eGNjbHh1WEhSY2RHTnNiM05sSUQwZ0ozMG5PMXh5WEc1Y2NseHVYSFJwWmlBb1FYSnlZWGt1YVhOQmNuSmhlU2gyWVd4MVpTa3BJSHRjY2x4dVhIUmNkR3RzWVhOeklEMGdKMkZ5Y21GNUp6dGNjbHh1WEhSY2RHOXdaVzRnUFNBbld5YzdYSEpjYmx4MFhIUmpiRzl6WlNBOUlDZGRKenRjY2x4dVhIUjlYSEpjYmx4eVhHNWNkR2xtSUNoMllXeDFaU0E5UFQwZ2JuVnNiQ2tnZTF4eVhHNWNkRngwY21WMGRYSnVJRnRjY2x4dVhIUmNkRngwSnp4c2FUNG5MRnh5WEc1Y2RGeDBYSFJjZENjOGMzQmhiaUJqYkdGemN6MWNJbXRsZVZ3aVBsd2lKeXdnWlc1amIyUmxLR3RsZVNrc0lDZGNJam9nUEM5emNHRnVQaWNzWEhKY2JseDBYSFJjZEZ4MEp6eHpjR0Z1SUdOc1lYTnpQVndpYm5Wc2JGd2lQbHdpSnl3Z1pXNWpiMlJsS0haaGJIVmxLU3dnSjF3aVBDOXpjR0Z1UGljc1hISmNibHgwWEhSY2RDYzhMMnhwUGlkY2NseHVYSFJjZEYwdWFtOXBiaWduSnlrN1hISmNibHgwZlZ4eVhHNWNjbHh1WEhScFppQW9kSGx3WlNBOVBTQW5iMkpxWldOMEp5a2dlMXh5WEc1Y2RGeDBjbVYwZFhKdUlGdGNjbHh1WEhSY2RGeDBKenhzYVQ0bkxGeHlYRzVjZEZ4MFhIUmNkQ2M4YzNCaGJpQmpiR0Z6Y3oxY0lpY3NJR1Y0Y0dGdVpHVnlRMnhoYzNObGN5d2dKMXdpUGp3dmMzQmhiajRuTEZ4eVhHNWNkRngwWEhSY2RDYzhjM0JoYmlCamJHRnpjejFjSW10bGVWd2lQbHdpSnl3Z1pXNWpiMlJsS0d0bGVTa3NJQ2RjSWpvZ1BDOXpjR0Z1UGlBbkxGeHlYRzVjZEZ4MFhIUmNkQ2M4YzNCaGJpQmpiR0Z6Y3oxY0ltOXdaVzVjSWo0bkxDQnZjR1Z1TENBblBDOXpjR0Z1UGlBbkxGeHlYRzVjZEZ4MFhIUmNkQ2M4ZFd3Z1kyeGhjM005WENJbkxDQnJiR0Z6Y3l3Z0oxd2lQaWNzWEhKY2JseDBYSFJjZEZ4MFhIUnFjMjl1TW1oMGJXd29kbUZzZFdVc0lHVjRjR0Z1WkdWeVEyeGhjM05sY3lrc1hISmNibHgwWEhSY2RGeDBKend2ZFd3K0p5eGNjbHh1WEhSY2RGeDBYSFFuUEhOd1lXNGdZMnhoYzNNOVhDSmpiRzl6WlZ3aVBpY3NJR05zYjNObExDQW5QQzl6Y0dGdVBpY3NYSEpjYmx4MFhIUmNkQ2M4TDJ4cFBpZGNjbHh1WEhSY2RGMHVhbTlwYmlnbkp5azdYSEpjYmx4MGZWeHlYRzVjY2x4dVhIUnBaaUFvZEhsd1pTQTlQU0FuYm5WdFltVnlKeUI4ZkNCMGVYQmxJRDA5SUNkaWIyOXNaV0Z1SnlrZ2UxeHlYRzVjZEZ4MGNtVjBkWEp1SUZ0Y2NseHVYSFJjZEZ4MEp6eHNhVDRuTEZ4eVhHNWNkRngwWEhSY2RDYzhjM0JoYmlCamJHRnpjejFjSW10bGVWd2lQbHdpSnl3Z1pXNWpiMlJsS0d0bGVTa3NJQ2RjSWpvZ1BDOXpjR0Z1UGljc1hISmNibHgwWEhSY2RGeDBKenh6Y0dGdUlHTnNZWE56UFZ3aUp5d2dkSGx3WlN3Z0oxd2lQaWNzSUdWdVkyOWtaU2gyWVd4MVpTa3NJQ2M4TDNOd1lXNCtKeXhjY2x4dVhIUmNkRngwSnp3dmJHaytKMXh5WEc1Y2RGeDBYUzVxYjJsdUtDY25LVHRjY2x4dVhIUjlYSEpjYmx4MGNtVjBkWEp1SUZ0Y2NseHVYSFJjZENjOGJHaytKeXhjY2x4dVhIUmNkRngwSnp4emNHRnVJR05zWVhOelBWd2lhMlY1WENJK1hDSW5MQ0JsYm1OdlpHVW9hMlY1S1N3Z0oxd2lPaUE4TDNOd1lXNCtKeXhjY2x4dVhIUmNkRngwSnp4emNHRnVJR05zWVhOelBWd2lKeXdnZEhsd1pTd2dKMXdpUGx3aUp5d2daVzVqYjJSbEtIWmhiSFZsS1N3Z0oxd2lQQzl6Y0dGdVBpY3NYSEpjYmx4MFhIUW5QQzlzYVQ0blhISmNibHgwWFM1cWIybHVLQ2NuS1R0Y2NseHVmVHRjY2x4dVhISmNiblpoY2lCcWMyOXVNbWgwYld3Z1BTQm1kVzVqZEdsdmJpQW9hbk52Yml3Z1pYaHdZVzVrWlhKRGJHRnpjMlZ6S1NCN1hISmNibHgwZG1GeUlHaDBiV3dnUFNBbkp6dGNjbHh1WEhSbWIzSWdLSFpoY2lCclpYa2dhVzRnYW5OdmJpa2dlMXh5WEc1Y2RGeDBhV1lnS0NGcWMyOXVMbWhoYzA5M2JsQnliM0JsY25SNUtHdGxlU2twSUh0Y2NseHVYSFJjZEZ4MFkyOXVkR2x1ZFdVN1hISmNibHgwWEhSOVhISmNibHh5WEc1Y2RGeDBhSFJ0YkNBOUlGdG9kRzFzTENCamNtVmhkR1ZGYkdWdFpXNTBLR3RsZVN3Z2FuTnZibHRyWlhsZExDQjBlWEJsYjJZZ2FuTnZibHRyWlhsZExDQmxlSEJoYm1SbGNrTnNZWE56WlhNcFhTNXFiMmx1S0NjbktUdGNjbHh1WEhSOVhISmNibHgwY21WMGRYSnVJR2gwYld3N1hISmNibjA3WEhKY2JseHlYRzUyWVhJZ1oyVjBTbk52YmxacFpYZGxjaUE5SUdaMWJtTjBhVzl1SUNoa1lYUmhMQ0J2Y0hScGIyNXpLU0I3WEhKY2JseDBkSEo1SUh0Y2NseHVYSFJjZEhKbGRIVnliaUJiWEhKY2JseDBYSFJjZENjOGRXd2dZMnhoYzNNOVhDSW5MQ0J3Y21WbWFYZ3NJQ2N0WTI5dWRHRnBibVZ5WENJK0p5eGNjbHh1WEhSY2RGeDBYSFJxYzI5dU1taDBiV3dvVzBwVFQwNHVjR0Z5YzJVb1pHRjBZU2xkTENCblpYUkZlSEJoYm1SbGNrTnNZWE56WlhNb2IzQjBhVzl1Y3k1bGVIQmhibVJsWkNrcExGeHlYRzVjZEZ4MFhIUW5QQzkxYkQ0blhISmNibHgwWEhSZExtcHZhVzRvSnljcE8xeHlYRzVjZEgwZ1kyRjBZMmdnS0dVcElIdGNjbHh1WEhSY2RISmxkSFZ5YmlCYlhISmNibHgwWEhSY2RDYzhaR2wySUdOc1lYTnpQVndpSnl3Z2NISmxabWw0TENBbkxXVnljbTl5WENJZ1BpY3NJR1V1ZEc5VGRISnBibWNvS1N3Z0p5QThMMlJwZGo0blhISmNibHgwWEhSZExtcHZhVzRvSnljcE8xeHlYRzVjZEgxY2NseHVmVHRjY2x4dVhISmNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNG9aR0YwWVN3Z2IzQjBLU0I3WEhKY2JseDBkbUZ5SUdwemIyNGdQU0FuSnp0Y2NseHVYSFIyWVhJZ2IzQjBhVzl1Y3lBOUlHOXdkQ0I4ZkNCN1pYaHdZVzVrWldRNklIUnlkV1Y5TzF4eVhHNWNkR2xtSUNoMGVYQmxiMllnWkdGMFlTQTlQU0FuYzNSeWFXNW5KeWtnZTF4eVhHNWNkRngwYW5OdmJpQTlJR1JoZEdFN1hISmNibHgwZlNCbGJITmxJR2xtSUNoMGVYQmxiMllnWkdGMFlTQTlQU0FuYjJKcVpXTjBKeWtnZTF4eVhHNWNkRngwYW5OdmJpQTlJRXBUVDA0dWMzUnlhVzVuYVdaNUtHUmhkR0VwWEhKY2JseDBmVnh5WEc1Y2RISmxkSFZ5YmlCblpYUktjMjl1Vm1sbGQyVnlLR3B6YjI0c0lHOXdkR2x2Ym5NcE8xeHlYRzU5TzF4eVhHNWNibHh1WEc0dktpb3FLaW9xS2lvcUtpb3FLaW9xS2lwY2JpQXFLaUJYUlVKUVFVTkxJRVpQVDFSRlVseHVJQ29xSUM0dmMyTnlhWEIwY3k5aGNHa3RaWGh3Ykc5eVpYSXZkakl2YzNKakwyMXZaSFZzWlhNdmFuTnZiaTF3WVhKelpTNXFjMXh1SUNvcUlHMXZaSFZzWlNCcFpDQTlJREZjYmlBcUtpQnRiMlIxYkdVZ1kyaDFibXR6SUQwZ01GeHVJQ29xTHlKZExDSnpiM1Z5WTJWU2IyOTBJam9pSW4wPVwiLCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaGlnaGxpZ2h0SnNvbi53b3JrZXIuanNcIik7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvbW9kdWxlcy9oaWdobGlnaHRKc29uLndvcmtlci5qc1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwMzQzOTEzL2hvdy10by1jcmVhdGUtYS13ZWItd29ya2VyLWZyb20tYS1zdHJpbmdcclxuXHJcbnZhciBVUkwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkw7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29udGVudCwgdXJsKSB7XHJcblx0dHJ5IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdHZhciBibG9iO1xyXG5cdFx0XHR0cnkgeyAvLyBCbG9iQnVpbGRlciA9IERlcHJlY2F0ZWQsIGJ1dCB3aWRlbHkgaW1wbGVtZW50ZWRcclxuXHRcdFx0XHR2YXIgQmxvYkJ1aWxkZXIgPSB3aW5kb3cuQmxvYkJ1aWxkZXIgfHwgd2luZG93LldlYktpdEJsb2JCdWlsZGVyIHx8IHdpbmRvdy5Nb3pCbG9iQnVpbGRlciB8fCB3aW5kb3cuTVNCbG9iQnVpbGRlcjtcclxuXHRcdFx0XHRibG9iID0gbmV3IEJsb2JCdWlsZGVyKCk7XHJcblx0XHRcdFx0YmxvYi5hcHBlbmQoY29udGVudCk7XHJcblx0XHRcdFx0YmxvYiA9IGJsb2IuZ2V0QmxvYigpO1xyXG5cdFx0XHR9IGNhdGNoKGUpIHsgLy8gVGhlIHByb3Bvc2VkIEFQSVxyXG5cdFx0XHRcdGJsb2IgPSBuZXcgQmxvYihbY29udGVudF0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBuZXcgV29ya2VyKFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYikpO1xyXG5cdFx0fSBjYXRjaChlKSB7XHJcblx0XHRcdHJldHVybiBuZXcgV29ya2VyKCdkYXRhOmFwcGxpY2F0aW9uL2phdmFzY3JpcHQsJyArIGVuY29kZVVSSUNvbXBvbmVudChjb250ZW50KSk7XHJcblx0XHR9XHJcblx0fSBjYXRjaChlKSB7XHJcblx0XHRyZXR1cm4gbmV3IFdvcmtlcih1cmwpO1xyXG5cdH1cclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3dvcmtlci1sb2FkZXIvY3JlYXRlSW5saW5lV29ya2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImZ1bmN0aW9uIHNsaWNrKHRpbWVzKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXHR2YXIgc2VsZWN0b3IgPSAnI3NsaWRlci0nO1xuXHRcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aW1lczsgaSsrKSB7XG5cdFx0JChzZWxlY3RvciArIGkpLmxlbmd0aCAmJiAkKHNlbGVjdG9yICsgaSkuc2xpY2soe1xuXHRcdFx0ZG90czogZmFsc2UsXG5cdFx0XHRpbmZpbml0ZTogZmFsc2UsXG5cdFx0XHRzcGVlZDogMzAwLFxuXHRcdFx0c2xpZGVzVG9TaG93OiAzLFxuXHRcdFx0c2xpZGVzVG9TY3JvbGw6IDEsXG5cdFx0XHR2YXJpYWJsZVdpZHRoOiB0cnVlLFxuXHRcdFx0YXV0b3BsYXk6IGZhbHNlLFxuXHRcdFx0cmVzcG9uc2l2ZTogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YnJlYWtwb2ludDogMTIwMCxcblx0XHRcdFx0XHRzZXR0aW5nczoge1xuXHRcdFx0XHRcdFx0dmFyaWFibGVXaWR0aDogdHJ1ZSxcblx0XHRcdFx0XHRcdHNsaWRlc1RvU2hvdzogMixcblx0XHRcdFx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxuXHRcdFx0XHRcdFx0aW5maW5pdGU6IGZhbHNlLFxuXHRcdFx0XHRcdFx0ZG90czogZmFsc2Vcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRicmVha3BvaW50OiA4MDAsXG5cdFx0XHRcdFx0c2V0dGluZ3M6IHtcblx0XHRcdFx0XHRcdHZhcmlhYmxlV2lkdGg6IHRydWUsXG5cdFx0XHRcdFx0XHRzbGlkZXNUb1Nob3c6IDEsXG5cdFx0XHRcdFx0XHRzbGlkZXNUb1Njcm9sbDogMVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0pO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVuc2xpY2sodGltZXMpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aW1lczsgaSsrKSB7XG5cdFx0dmFyIHNlbGVjdG9yID0gJyNzbGlkZXItJyArIGk7XG5cdFx0JChzZWxlY3RvcikgJiYgJChzZWxlY3RvcikubGVuZ3RoICYmICQoc2VsZWN0b3IpLnNsaWNrKCd1bnNsaWNrJyk7XG5cdH1cblx0Y29uc29sZS5pbmZvKCdjbGVhcmVkJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRzZXQ6IHNsaWNrLFxuXHRyZW1vdmU6IHVuc2xpY2tcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL21vZHVsZXMvc2xpZGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge1xuXHRcImRpc2NvdmVyeS52Mi5ldmVudHMuZ2V0XCI6IHtcblx0XHRcImV2ZW50c1wiOiB7XG5cdFx0XHRcIm9iamVjdFwiOiB7XG5cdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XCJ0aXRsZVwiOiBcIkV2ZW50XCIsXG5cdFx0XHRcdFx0XCJjb3B5QnRuXCI6IHtcblx0XHRcdFx0XHRcdFwibmFtZVwiOiB0cnVlXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcImluZGV4XCI6IDBcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdFwiaW1hZ2VzXCI6IHtcblx0XHRcdFx0XCJvYmplY3RcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcInRpdGxlXCI6IFwiaW1hZ2VcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcImluZGV4XCI6IDEsXG5cdFx0XHRcdFx0XCJjb2xsYXBzZWRcIjogdHJ1ZVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJzYWxlc1wiOiB7XG5cdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XCJpbmRleFwiOiAyXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcInZlbnVlc1wiOiB7XG5cdFx0XHRcdFwib2JqZWN0XCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJ0aXRsZVwiOiBcInZlbnVlXCIsXG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDBcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiY2l0eVwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogMlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJzdGF0ZVwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogMVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJjb3VudHJ5XCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiAxXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImFkZHJlc3NcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDNcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwibG9jYXRpb25cIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XCJpbmRleFwiOiAzXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcImRhdGVzXCI6IHtcblx0XHRcdFx0XCJzdGFydFwiOiB7XG5cdFx0XHRcdFx0XCJfQ09ORklHXCI6IHtcblx0XHRcdFx0XHRcdFwiaW5kZXhcIjogMCxcblx0XHRcdFx0XHRcdFwiY29weUJ0blwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiZGF0ZVRpbWVcIjogdHJ1ZVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJzdGF0dXNcIjoge1xuXHRcdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XHRcImluZGV4XCI6IDFcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiZW5kXCI6IHtcblx0XHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFx0XCJpbmRleFwiOiAyLFxuXHRcdFx0XHRcdFx0XCJjb3B5QnRuXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJkYXRlVGltZVwiOiB0cnVlXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcdFwiaW5kZXhcIjogNCxcblx0XHRcdFx0XHRcImNvcHlCdG5cIjoge1xuXHRcdFx0XHRcdFx0XCJ0aW1lem9uZVwiOiB0cnVlXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcImFsbEluc2lkZVwiOiB0cnVlXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcImV2ZW50c1wiOiB0cnVlLFxuXHRcdFx0XHRcImluZGV4XCI6IDBcblx0XHRcdH1cblx0XHR9LFxuXHRcdFwicGFnZVwiOiB7XG5cdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcImluZGV4XCI6IDEsXG5cdFx0XHRcdFwiY29sbGFwc2VkXCI6IHRydWVcblx0XHRcdH1cblx0XHR9LFxuXHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcIm1ldGhvZFwiOiBcImRpc2NvdmVyeS52Mi5ldmVudHMuZ2V0XCJcblx0XHR9XG5cdH0sXG5cdFwiZGlzY292ZXJ5LnYyLmF0dHJhY3Rpb25zLmdldFwiOiB7XG5cdFx0XCJhdHRyYWN0aW9uc1wiOiB7XG5cdFx0XHRcIm9iamVjdFwiOiB7XG5cdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XCJpbmRleFwiOiAwXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcImltYWdlc1wiOiB7XG5cdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XCJpbmRleFwiOiAyXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcImNsYXNzaWZpY2F0aW9uc1wiOiB7XG5cdFx0XHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcdFx0XCJpbmRleFwiOiAxXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcImluZGV4XCI6IDBcblx0XHRcdH1cblx0XHR9LFxuXHRcdFwicGFnZVwiOiB7XG5cdFx0XHRcIl9DT05GSUdcIjoge1xuXHRcdFx0XHRcImluZGV4XCI6IDFcblx0XHRcdH1cblx0XHR9LFxuXHRcdFwiX0NPTkZJR1wiOiB7XG5cdFx0XHRcIm1ldGhvZENvbmZpZ1wiOiB0cnVlXG5cdFx0fVxuXHR9LFxuXHRcIl9HTE9CQUxfQ09ORklHXCI6IHtcblx0XHRcImNvcHlCdG5cIjoge1xuXHRcdFx0XCJpZFwiOiB0cnVlXG5cdFx0fSxcblx0XHRcImRlcHJlY2F0ZWRcIjogW1xuXHRcdFx0XCJfbGlua3NcIlxuXHRcdF0sXG5cdFx0XCJ1bndyYXBwXCI6IFtcblx0XHRcdFwiX2VtYmVkZGVkXCJcblx0XHRdXG5cdH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbmZpZy5qc29uXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcclxuXHRyZXF1aXJlKCcuL2N1c3RvbVNlbGVjdC5jb21wb25lbnQuanMnKTtcclxuXHRyZXF1aXJlKCcuL3BhbmVscy9wYW5lbEdyb3VwLmNvbXBvbmVudC5qcycpO1xyXG5cdHJlcXVpcmUoJy4vcGFuZWxzL3BhbmVsLmNvbXBvbmVudC5qcycpO1xyXG5cdHJlcXVpcmUoJy4vcGFuZWxzL3BhZ2luYXRpb24uY29tcG9uZW50LmpzJyk7XHJcblx0cmVxdWlyZSgnLi9wYW5lbHMvcGFuZWxIZWFkaW5nLmNvbXBvbmVudC5qcycpO1xyXG5cdHJlcXVpcmUoJy4vcGFuZWxzL29iamVjdFBhbmVsQm9keS5jb21wb25lbnQuanMnKTtcclxuXHRyZXF1aXJlKCcuL3BhbmVscy9hcnJheVBhbmVsQm9keS5jb21wb25lbnQuanMnKTtcclxufSgpKTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxyXG4gKiBDdXN0b20gU2VsZWN0IGNvbXBvbmVudFxyXG4gKi9cclxudmFyIHNlbGY7XHJcblxyXG4vKipcclxuICogQ3VzdG9tIFNlbGVjdCBWaWV3LU1vZGVsXHJcbiAqIEBwYXJhbSBwYXJhbXNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBDdXN0b21TZWxlY3QocGFyYW1zKSB7XHJcbiAgc2VsZiA9IHRoaXM7XHJcblxyXG4gIHRoaXMuYW5pbWF0aW9uU3BlZWQgPSBwYXJhbXMuYW5pbWF0aW9uU3BlZWQgfHwgMjAwO1xyXG5cdHRoaXMuY3VyZW50U2VsZWN0RGF0YSA9IHBhcmFtcy5kYXRhIHx8IG51bGw7XHJcblx0dGhpcy5vbkZvY3VzID0gcGFyYW1zLmZvY3VzIHx8IG51bGw7XHJcblx0XHJcbiAgLy9vYnNlcnZhYmxlc1xyXG4gIHRoaXMuc2VsZWN0TW9kZWwgPSB0eXBlb2YgcGFyYW1zLm9wdGlvbnMgIT09J2Z1bmN0aW9uJyA/IGtvLm9ic2VydmFibGVBcnJheShwYXJhbXMub3B0aW9ucyk6ICBwYXJhbXMub3B0aW9ucztcclxuICB0aGlzLnBsYWNlaG9sZGVyID0ga28ub2JzZXJ2YWJsZShwYXJhbXMucGxhY2Vob2xkZXIgfHwgJycpO1xyXG4gIHRoaXMub25zZWxlY3QgPSBwYXJhbXMub25zZWxlY3QgfHwgZnVuY3Rpb24gKGl0ZW0pIHsgY29uc29sZS5sb2coaXRlbSArJ3NlbGVjdGVkIScpfTtcclxuICB0aGlzLnNlbGVjdGVkID0ga28ub2JzZXJ2YWJsZSh0aGlzLnNlbGVjdE1vZGVsKClbMF0pO1xyXG4gIHRoaXMuaXNPbmVPcHRpb24gPSBrby5wdXJlQ29tcHV0ZWQoZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0TW9kZWwoKS5sZW5ndGggPCAyOyAvLyBtb3JlIHRoYW4gb25lIG9wdGlvblxyXG4gIH0sIHRoaXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kRWxlbWVudChldmVudCkge1xyXG4gIHZhciBwYXJlbnQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnBhcmVudHMoJy5qcy1jdXN0b20tc2VsZWN0Jyk7XHJcbiAgcmV0dXJuIHtcclxuICAgIHdyYXBwZXI6IHBhcmVudC5maW5kKCcuanMtY3VzdG9tLXNlbGVjdC13cmFwcGVyJyksXHJcbiAgICBsYXllcjogcGFyZW50LmZpbmQoJy5qcy1jdXN0b20tc2VsZWN0LWxheWVyJylcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDdXN0b20gU2VsZWN0IFZpZXctTW9kZWwgbWV0aG9kXHJcbiAqIEBwYXJhbSB2aWV3TW9kZWxcclxuICogQHBhcmFtIGV2ZW50XHJcbiAqL1xyXG5DdXN0b21TZWxlY3QucHJvdG90eXBlLnNsaWRlVG9nZ2xlID0gZnVuY3Rpb24odmlld01vZGVsLCBldmVudCkge1xyXG5cdC8vIGVsZW0gaW4gZm9jdXMgZW11bGF0aW9uXHJcblx0dGhpcy5vbkZvY3VzICYmIHRoaXMub25Gb2N1cyh0aGlzLmN1cmVudFNlbGVjdERhdGEpO1xyXG5cclxuXHRpZiAodGhpcy5pc09uZU9wdGlvbigpKSB7cmV0dXJuIGZhbHNlO31cclxuICB2YXIgZWwgPSBmaW5kRWxlbWVudChldmVudCk7XHJcbiAgICBlbC53cmFwcGVyLnNsaWRlVG9nZ2xlKHZpZXdNb2RlbC5hbmltYXRpb25TcGVlZCk7XHJcbiAgICBlbC5sYXllci50b2dnbGVDbGFzcygnaGlkZGVuJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3VzdG9tIFNlbGVjdCBWaWV3LU1vZGVsIG1ldGhvZFxyXG4gKiBAcGFyYW0gaXRlbVxyXG4gKiBAcGFyYW0gZXZlbnRcclxuICovXHJcbkN1c3RvbVNlbGVjdC5wcm90b3R5cGUuc2VsZWN0SXRlbSA9IGZ1bmN0aW9uIChpdGVtLCBldmVudCkge1xyXG4gIHZhciBzZWxmID0gdGhpcztcclxuICB0aGlzLnNlbGVjdGVkKGl0ZW0pO1xyXG4gIC8vIHJ1biBoYW5kbGVyXHJcbiAgdGhpcy5vbnNlbGVjdChpdGVtKTtcclxuXHQvLyBzbGlkZSB1cFxyXG4gIHRoaXMuc2xpZGVUb2dnbGUoc2VsZiwgZXZlbnQpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjdXN0b20tc2VsZWN0Jywge1xyXG4gIHZpZXdNb2RlbDogQ3VzdG9tU2VsZWN0LFxyXG4gIHRlbXBsYXRlOiAoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3QganMtY3VzdG9tLXNlbGVjdFwiPicsXHJcbiAgICAgICc8ZGl2IGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0LXdyYXBwZXJcIj4nLFxyXG4gICAgICAgICc8c2VsZWN0IGRhdGEtYmluZD1cIm9wdGlvbnM6IHNlbGVjdE1vZGVsLCBvcHRpb25zVGV4dDogXFwnbmFtZVxcJywgdmFsdWU6IHNlbGVjdGVkXCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2ZpZWxkXCIgbmFtZT1cImFwaS1leHAtbWV0aG9kXCI+PC9zZWxlY3Q+JyxcclxuICAgICAgICAnPHNwYW4gY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX3BsYWNlaG9sZGVyXCI+JyxcclxuICAgICAgICAgICc8aW5wdXQgZGF0YS1iaW5kPVwiZXZlbnQ6IHtjbGljazogc2xpZGVUb2dnbGV9LCBhdHRyOiB7dmFsdWU6IHNlbGVjdGVkKCkubmFtZSwgZGlzYWJsZWQ6IGlzT25lT3B0aW9ufVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCJcIiByZWFkb25seT1cIlwiPicsXHJcbiAgICAgICAgICAnPGIgZGF0YS1iaW5kPVwiY3NzOiB7aGlkZGVuOiBpc09uZU9wdGlvbn1cIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9fY2hldnJvblwiPiZuYnNwOzwvYj4nLFxyXG4gICAgICAgICc8L3NwYW4+JyxcclxuICAgICAgICAnPHVsIGRhdGEtYmluZD1cImZvcmVhY2g6IHNlbGVjdE1vZGVsXCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2xpc3QganMtY3VzdG9tLXNlbGVjdC13cmFwcGVyXCI+JyxcclxuICAgICAgICAgICc8bGkgZGF0YS1iaW5kPVwiY3NzOiB7XFwnYWN0aXZlXFwnOiBjaGVja2VkfVwiIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19pdGVtXCI+JyxcclxuICAgICAgICAgICAgJzxidXR0b24gZGF0YS1iaW5kPVwiZXZlbnQ6IHtjbGljazogJHBhcmVudC5zZWxlY3RJdGVtLmJpbmQoJHBhcmVudCl9LCB0ZXh0OiBuYW1lLCBjc3M6IHtcXCdhY3RpdmVcXCc6IGNoZWNrZWQoKX0sIGF0dHI6IHtcXCdkYXRhLXZhbHVlXFwnOiBuYW1lfVwiICBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9faXRlbS1sYWJlbFwiIGhyZWY9XCIjXCI+PC9idXR0b24+JyxcclxuICAgICAgICAgICAgLy8gJzxzcGFuIGRhdGEtYmluZD1cImlmOiBsaW5rXCI+JyxcclxuICAgICAgICAgICAgXHQnPGEgZGF0YS1iaW5kPVwiYXR0cjoge2hyZWY6IGxpbmt9LCBjc3M6IHtcXCdoaWRkZW5cXCc6ICFsaW5rfVwiIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19pdGVtLWxpbmtcIiB0YXJnZXQ9XCJfYmxhbmtcIj4mbmJzcDs8L2E+JyxcclxuICAgICAgICAgICAgLy8gJzwvc3Bhbj4nLFxyXG4gICAgICAgICAgJzwvbGk+JyxcclxuICAgICAgICAnPC91bD4nLFxyXG4gICAgICAnPC9kaXY+JyxcclxuICAgICAgJzxkaXYgZGF0YS1iaW5kPVwiY2xpY2s6IHNsaWRlVG9nZ2xlXCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3QtbGF5ZXIganMtY3VzdG9tLXNlbGVjdC1sYXllciBoaWRkZW5cIj48L2Rpdj4nLFxyXG4gICAgJzwvZGl2PidcclxuICBdKS5qb2luKCcnKVxyXG59KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL2N1c3RvbVNlbGVjdC5jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxudG9kbzogc2luZ2xlIC0gZmlyc3QgbG9hZDtcclxudG9kbzogaW5oZXJpdGFuY2Ugb2YgY29uZmlnXHJcbnRvZG86IHBhZ2luZyAocGFyYW1zKVxyXG50b2RvOiBjb3B5IGJ0blxyXG50b2RvOiB1bHIgcGFyc2VcclxudG9kbzogZmllbGRzIHZhbGlkYXRpb25cclxuICovXHJcblxyXG52YXIgc2VsZjtcclxuXHJcbmZ1bmN0aW9uIGNhcmRHcm91cENvbXBvbmVudChwYXJhbXMpIHtcclxuXHRzZWxmID0gdGhpcztcclxuXHR0aGlzLnVybCA9IHRoaXMudXJsIHx8IHBhcmFtcy51cmw7XHJcblx0dGhpcy5jb25maWcgPSBnZXRDb25maWcocGFyYW1zKTtcclxuXHR0aGlzLmRhdGEgPSBwcmVwYXJlRGF0YShwYXJhbXMsIHRoaXMuY29uZmlnLl9DT05GSUcpO1xyXG5cdHRoaXMuZ3JvdXBJbmRleCA9IHBhcmFtcy5ncm91cEluZGV4IHx8IDA7XHJcblx0dGhpcy5zZWN0aW9uSW5kZXggPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHBhcmFtcy5zZWN0aW9uSW5kZXgpO1xyXG5cdHRoaXMuY29sb3JDbGFzcyA9IHBhcmFtcy5jb2xvckNsYXNzO1xyXG5cdHRoaXMuZ2V0TW9yZSA9IHBhcmFtcy5nZXRNb3JlO1xyXG5cdHRoaXMucGFnZSA9IGdldFBhZ2luZ0luZm8ocGFyYW1zLCB0aGlzLmRhdGEucGFnZSwgdGhpcy51cmwpO1xyXG5cdHRoaXMuY29sbGFwc2VJZCA9IGdldENvbGxhcHNlSWQoKTtcclxufVxyXG5cclxuY2FyZEdyb3VwQ29tcG9uZW50LnByb3RvdHlwZS5zb3J0QnlDb25maWcgPSBmdW5jdGlvbiAoYSwgYikge1xyXG5cdGlmIChzZWxmLmNvbmZpZyAmJiBzZWxmLmNvbmZpZ1thLmtleV0gJiYgc2VsZi5jb25maWdbYi5rZXldICYmIHNlbGYuY29uZmlnW2Eua2V5XS5fQ09ORklHICYmIHNlbGYuY29uZmlnW2Iua2V5XS5fQ09ORklHKSB7XHJcblx0XHR2YXIgaTEgPSBzZWxmLmNvbmZpZ1thLmtleV0uX0NPTkZJRy5pbmRleDtcclxuXHRcdHZhciBpMiA9IHNlbGYuY29uZmlnW2Iua2V5XS5fQ09ORklHLmluZGV4O1xyXG5cdFx0cmV0dXJuIGkxIC0gaTI7XHJcblx0fVxyXG5cdHJldHVybiAwO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdwYW5lbC1ncm91cCcsIHtcclxuXHR2aWV3TW9kZWw6IGNhcmRHcm91cENvbXBvbmVudCxcclxuXHR0ZW1wbGF0ZTpgXHJcblx0XHQ8c2VjdGlvbiBkYXRhLWJpbmQ9XCJmb3JlYWNocHJvcDoge2RhdGE6IGRhdGEsIHNvcnRGbjogc29ydEJ5Q29uZmlnfVwiIGNsYXNzPVwicGFuZWwtZ3JvdXBcIj5cclxuXHRcdFx0PHBhbmVsIHBhcmFtcz1cIiRkYXRhOiAkZGF0YSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQkaW5kZXg6ICRpbmRleCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRwYWdlOiAkY29tcG9uZW50LnBhZ2UsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29sb3JDbGFzczogJGNvbXBvbmVudC5jb2xvckNsYXNzLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHBhbmVsR3JvdXA6ICRjb21wb25lbnQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29sbGFwc2VJZDogJGNvbXBvbmVudC5jb2xsYXBzZUlkLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbmZpZzogJGNvbXBvbmVudC5jb25maWdcIj5cclxuXHRcdFx0PC9wYW5lbD5cclxuXHRcdDwvc2VjdGlvbj5cclxuYH0pO1xyXG5cclxuLyoqXHJcbiAqIENvbmZpZ3VyZXMgYW5kIHBhcmFtcyBmb3IgZWFjaCBwYW5lbCBncm91cFxyXG4gKiBAcGFyYW0gcGFyYW1zXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Q29uZmlnKHBhcmFtcykge1xyXG5cdHNlbGYuZGVlcFByb3AgPSBwYXJhbXMuZGVlcFByb3AgfHwgJyc7XHJcblx0Ly8gbWFpbiBjb25maWdcclxuXHRpZiAoIXNlbGYuZGVlcFByb3AgJiYgIXBhcmFtcy5jb25maWcpIHtcclxuXHRcdC8vIHBhbmVsR3JvdXAgaW5kZXggLSAwXHJcblxyXG5cdFx0Ly8gZ2V0IGZ1bGwgY29uZmlnO1xyXG5cdFx0dmFyIGZpbHRlciA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUocGFyYW1zLmZpbHRlcik7XHJcblxyXG5cdFx0Ly8gZ2V0IGN1cnJlbnQgbWV0aG9kIGNvbmZpZ1xyXG5cdFx0dmFyIG1ldGhvZENvbmZpZyA9IGZpbHRlcltwYXJhbXMucmVxSWRdIHx8IHt9O1xyXG5cclxuXHRcdC8vIG1ldGhvZCBjb25maWcgaW5oZXJpdHMgZ2xvYmFsIGNvbmZpZ1xyXG5cdFx0bWV0aG9kQ29uZmlnLl9DT05GSUcgID0gJC5leHRlbmQodHJ1ZSwge30sIGZpbHRlci5fR0xPQkFMX0NPTkZJRywgbWV0aG9kQ29uZmlnLl9DT05GSUcpO1xyXG5cclxuXHRcdHJldHVybiBtZXRob2RDb25maWc7XHJcblx0fSBlbHNlIHtcclxuXHRcdC8vIHBhbmVsR3JvdXAgaW5kZXggPiAwXHJcblx0XHRyZXR1cm4gcGFyYW1zLmNvbmZpZyB8fCB7fVxyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERhdGEgbWFuaXB1bGF0aW9uc1xyXG4gKiBAcGFyYW0gcGFyYW1zXHJcbiAqIEByZXR1cm5zIHsqfHt9fVxyXG4gKi9cclxuZnVuY3Rpb24gcHJlcGFyZURhdGEocGFyYW1zLCBjb25maWcpIHtcclxuXHR2YXIgZGF0YSA9IHBhcmFtcyAmJiBwYXJhbXMuZGF0YSB8fCB7fTtcclxuXHR1bndyYXBwT2JqZWN0cyhkYXRhLCBjb25maWcpO1xyXG5cdHJlbW92ZURlcHJlY2F0ZWQoZGF0YSwgY29uZmlnKTtcclxuXHRyZXR1cm4gd3JhcHBQcmltaXRpdmVzKGRhdGEsIHBhcmFtcy5fcHJvcFRpdGxlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdhdGhlcnMgYWxsIHN0YW5kIGFsb25lIHByb3BzIGluIHRvIG9uZSBvYmplY3RcclxuICogQHBhcmFtIGRhdGEge29iamVjdH1cclxuICogQHBhcmFtIF9wcm9wVGl0bGUge3N0cmluZ31cclxuICogQHJldHVybnMge29iamVjdH0gcmV2aXNlZCBkYXRhXHJcbiAqL1xyXG5mdW5jdGlvbiB3cmFwcFByaW1pdGl2ZXMoZGF0YSwgX3Byb3BUaXRsZSkge1xyXG5cdHZhciBuZXdEYXRhID0ge30sIHByb3AgPSBfcHJvcFRpdGxlIHx8ICdvYmplY3QnLCB2YWwsIGtleTtcclxuXHJcblx0Ly8gZ2F0aGVyaW5nIGFsbCBwcmltaXRpdmUgcHJvcHMgaW4gYWRkaXRpb25hbCBwYW5lbFxyXG5cdGZvciAoa2V5IGluIGRhdGEpIHtcclxuXHRcdGlmICghZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7Y29udGludWU7fVxyXG5cdFx0dmFsID0gZGF0YVtrZXldO1xyXG5cclxuXHRcdGlmICh0eXBlb2YgdmFsICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRuZXdEYXRhW3Byb3BdID0gbmV3RGF0YVtwcm9wXSB8fCB7fTtcclxuXHRcdFx0bmV3RGF0YVtwcm9wXVtrZXldID0gdmFsO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bmV3RGF0YVtrZXldID0gdmFsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gbmV3RGF0YVxyXG59XHJcblxyXG4vKipcclxuICogVW53cmFwcyBvYmplY3RzXHJcbiAqIEBwYXJhbSBvYmoge29iamVjdH1cclxuICogQHJldHVybnMge29iamVjdH0gY2hhbmdlZFxyXG4gKi9cclxuZnVuY3Rpb24gcmVtb3ZlRGVwcmVjYXRlZChvYmosIGNvbmZpZykge1xyXG5cdHZhciBkZXByZWNhdGVkID0gY29uZmlnICYmIGNvbmZpZy5kZXByZWNhdGVkIHx8IFtdO1xyXG5cclxuXHRkZXByZWNhdGVkLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG5cdFx0aWYgKG9ialtpdGVtXSkge1xyXG5cdFx0XHRkZWxldGUgb2JqW2l0ZW1dXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gaXRlbTtcclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIG9iajtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgZGVwcmVjYXRlZCBvYmplY3RzXHJcbiAqIEBwYXJhbSBvYmoge29iamVjdH1cclxuICogQHJldHVybnMge29iamVjdH0gY2hhbmdlZFxyXG4gKi9cclxuZnVuY3Rpb24gdW53cmFwcE9iamVjdHMob2JqLCBjb25maWcpIHtcclxuXHR2YXIgdW53cmFwcCA9IGNvbmZpZyAmJiBjb25maWcudW53cmFwcCB8fCBbXTtcclxuXHJcblx0dW53cmFwcC5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdHZhciB2YWwgPSBvYmpbaXRlbV07XHJcblx0XHRpZiAodmFsKSB7XHJcblx0XHRcdHZhciBhcnIgPSBPYmplY3Qua2V5cyh2YWwpO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHZhciBwcm9wID0gYXJyW2ldO1xyXG5cdFx0XHRcdG9ialtwcm9wXSA9IHZhbFtwcm9wXTtcclxuXHRcdFx0fVxyXG5cdFx0XHRkZWxldGUgb2JqW2l0ZW1dO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGl0ZW07XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiBvYmo7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQcmVwYXJlcyBkYXRhIGZvciBwYWdpbmdcclxuICogQHBhcmFtIHBhZ2VPYmpcclxuICogQHBhcmFtIHBhcmFtc1xyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmZ1bmN0aW9uIGdldFBhZ2luZ0luZm8ocGFyYW1zLCBwYWdlT2JqLCB1cmwpIHtcclxuXHR2YXIgcGFnZVBhcmFtLCBzaXplO1xyXG5cclxuXHRpZiAocGFyYW1zLnBhZ2UpIHtcclxuXHRcdHJldHVybiBwYXJhbXMucGFnZTtcclxuXHR9XHJcblx0aWYgKHBhZ2VPYmope1xyXG5cdFx0c2l6ZSA9IHBhcmFtcy5jYXJkU2l6ZSB8fCBwYWdlT2JqLnNpemU7XHJcblx0XHRwYWdlUGFyYW0gPSBwYXJhbXMucGFnZVBhcmFtIHx8IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUodXJsKS5maW5kKGZ1bmN0aW9uIChpdGVtKSB7XHJcblx0XHRcdHJldHVybiBpdGVtLm5hbWUgPT09ICdwYWdlJztcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLnBhZ2UgPSB7XHJcblx0XHRcdHBhcmFtZXRlcjogcGFnZVBhcmFtICYmIHBhZ2VQYXJhbS52YWx1ZSxcclxuXHRcdFx0c2l6ZTogc2l6ZVxyXG5cdFx0fTtcclxuXHR9XHJcblx0cmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlcyBpZCBzdHIgZm9yIHBhbmVsICdjb2xsYXBzZSB0b2dnbGUnIGxvZ2ljXHJcbiAqIEBwYXJhbSBzdHJcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmZ1bmN0aW9uIGdldENvbGxhcHNlSWQoc3RyKSB7XHJcblx0dmFyIGNsYXNzTmFtZSA9IHN0ciB8fCAnY2FyZC1wYW5lbC1ib2R5LSc7XHJcblx0cmV0dXJuIFtcclxuXHRcdGNsYXNzTmFtZSxcclxuXHRcdHNlbGYuc2VjdGlvbkluZGV4LFxyXG5cdFx0c2VsZi5ncm91cEluZGV4XHJcblx0XS5qb2luKCcnKTtcclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL3BhbmVsR3JvdXAuY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xuXG5mdW5jdGlvbiBjYXJkQ29tcG9uZW50KHBhcmFtcykge1xuXHRzZWxmID0gdGhpcztcblx0dGhpcy5rZXkgPSBwYXJhbXMuJGRhdGEua2V5O1xuXHR0aGlzLiRkYXRhID0gcGFyYW1zLiRkYXRhO1xuXHR0aGlzLiRkYXRhID0gcGFyYW1zLiRkYXRhO1xuXHR0aGlzLiRpbmRleCA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUocGFyYW1zLiRpbmRleCk7XG5cdHRoaXMucGFnZSA9IHBhcmFtcy5wYWdlO1xuXHR0aGlzLmNvbG9yQ2xhc3MgPSBwYXJhbXMuY29sb3JDbGFzcztcblx0dGhpcy5wYW5lbEdyb3VwID0gcGFyYW1zLnBhbmVsR3JvdXA7XG5cdHRoaXMuY29uZmlnID0gZ2V0UGFuZWxDb25maWcocGFyYW1zLmNvbmZpZywgdGhpcy5rZXkpO1xuXHR0aGlzLmlzRXhwYW5kZWQgPSBpc0V4cGFuZGVkKHRoaXMuY29uZmlnKTtcblx0dGhpcy5jb2xsYXBzZUlkID0gcGFyYW1zLmNvbGxhcHNlSWQgKyB0aGlzLiRpbmRleDtcblx0dGhpcy5pc0FjdGl2ZSA9IGtvLm9ic2VydmFibGUodGhpcy5pc0V4cGFuZGVkKTtcbn1cblxuY2FyZENvbXBvbmVudC5wcm90b3R5cGUuc2V0QWN0aXZlID0gZnVuY3Rpb24gKG1vZGVsLCBldmVudCkge1xuXHR0aGlzLmlzQWN0aXZlKCF0aGlzLmlzQWN0aXZlKCkpO1xufTtcblxuLyoqXG4gKiBHZXRzIGNvbmZpZyBmb3IgZWFjaCBwYW5lbFxuICogQHBhcmFtIGtleSB7c3RyaW5nfSBrZXkgb2YgcGFuZWwgb2JqZWN0XG4gKiBAcmV0dXJucyB7b2JqZWN0fSBjb25maWdcbiAqL1xuZnVuY3Rpb24gZ2V0UGFuZWxDb25maWcoY29uZmlnLCBrZXkpIHtcblx0dmFyIHN1YkNvbmZpZyA9IGNvbmZpZ1trZXldIHx8IHt9O1xuXG5cdHN1YkNvbmZpZy5fQ09ORklHID0gJC5leHRlbmQodHJ1ZSwge30sIGNvbmZpZy5fQ09ORklHLCBzdWJDb25maWcuX0NPTkZJRyk7XG5cdHJldHVybiBzdWJDb25maWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGZvciAnY29sbGFwc2VkJyBjb25maWcgZm9yIGVhY2ggcGFuZWxcbiAqIEBwYXJhbSBrZXkge3N0cmluZ30ga2V5IG9mIHBhbmVsIG9iamVjdFxuICogQHJldHVybnMge2Jvb2xlYW59IGZvciBjc3MgY2xhc3MgYWRkL3JlbW92ZVxuICovXG5mdW5jdGlvbiBpc0V4cGFuZGVkKGNvbmZpZykge1xuXHRyZXR1cm4gIShPYmplY3QuZ2V0UHJvcChjb25maWcsICcuX0NPTkZJRy5jb2xsYXBzZWQnKSB8fCBmYWxzZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ga28uY29tcG9uZW50cy5yZWdpc3RlcigncGFuZWwnLCB7XG5cdHZpZXdNb2RlbDogY2FyZENvbXBvbmVudCxcblx0dGVtcGxhdGU6YFxuXHRcdDxzZWN0aW9uIGRhdGEtYmluZD1cImNzczoge1tjb2xvckNsYXNzXTogdHJ1ZSwgYWN0aXZlOiBpc0FjdGl2ZX1cIiBjbGFzcz1cInBhbmVsIHBhbmVsLXByaW1hcnlcIj5cblx0XHRcdDwhLS1wYW5lbC1oZWFkaW5nLS0+XG5cdFx0XHQ8cGFuZWwtaGVhZGluZyBwYXJhbXM9XCJjb25maWc6IGNvbmZpZywgZGF0YTogJGRhdGEsIGluZGV4OiAkaW5kZXgsIHBhZ2U6IHBhZ2UsIHNldEFjdGl2ZTogc2V0QWN0aXZlLmJpbmQoJGNvbXBvbmVudCksIGNvbGxhcHNlSWQ6IGNvbGxhcHNlSWRcIj48L3BhbmVsLWhlYWRpbmc+XG5cdFx0XHRcblx0XHRcdDwhLS1wYW5lbC1ib2R5LS0+XG5cdFx0XHQ8c2VjdGlvbiBkYXRhLWJpbmQ9XCJhdHRyOiB7J2lkJzogY29sbGFwc2VJZH0sIGNzczogeydpbic6IGlzRXhwYW5kZWR9XCIgY2xhc3M9XCJwYW5lbC1jb2xsYXBzZSBjb2xsYXBzZVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPlxuXHRcdFx0XHRcblx0XHRcdFx0XHQ8IS0tIGtvIGlmOiAodHlwZW9mICRkYXRhLnZhbHVlID09PSAnb2JqZWN0JyAmJiAhJC5pc0FycmF5KCRkYXRhLnZhbHVlKSkgLS0+XG5cdFx0XHRcdFx0XHQ8b2JqZWN0LXBhbmVsLWJvZHkgcGFyYW1zPVwiY29uZmlnOiBjb25maWcsIGRhdGE6ICRkYXRhLCBpbmRleDogJGluZGV4LCBwYW5lbEdyb3VwOiBwYW5lbEdyb3VwLCBwYWdlOiBwYWdlXCI+PC9vYmplY3QtcGFuZWwtYm9keT5cblx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cblx0XHRcdFx0XHQ8IS0tIGtvIGlmOiAodHlwZW9mICRkYXRhLnZhbHVlID09PSAnb2JqZWN0JyAmJiAkLmlzQXJyYXkoJGRhdGEudmFsdWUpKSAtLT5cblx0XHRcdFx0XHRcdDxhcnJheS1wYW5lbC1ib2R5IHBhcmFtcz1cImNvbmZpZzogY29uZmlnLCBkYXRhOiAkZGF0YSwgaW5kZXg6ICRpbmRleCwgcGFuZWxHcm91cDogcGFuZWxHcm91cFwiPjwvYXJyYXktcGFuZWwtYm9keT5cblx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L3NlY3Rpb24+XG5cdFx0PC9zZWN0aW9uPlxuYH0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYW5lbC5jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAyMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHNlbGY7XHJcblxyXG4vKipcclxuICogUGFnaW5hdGlvbiBlbGVtZW50XHJcbiAqIEBwYXJhbSBwYXJhbXNcclxuICovXHJcbmZ1bmN0aW9uIHBhZ2luYXRpb24ocGFyYW1zKSB7XHJcblx0dGhpcy5wYWdlUGFyYW0gPSBwYXJhbXMucGFnZVBhcmFtO1xyXG5cdHRoaXMudG90YWxQYWdlcyA9ICtwYXJhbXMudG90YWxQYWdlcztcclxuXHR0aGlzLm51bWJlciA9ICtwYXJhbXMubnVtYmVyO1xyXG5cdHRoaXMuZmlyc3QgPSAhIXRoaXMubnVtYmVyO1xyXG5cdHRoaXMubGFzdCA9IHRoaXMubnVtYmVyIDwgdGhpcy50b3RhbFBhZ2VzIC0gMTtcclxuXHR0aGlzLnJlcXVlc3RCdG4gPSAkKCcjYXBpLWV4cC1nZXQtYnRuJyk7XHJcblx0c2VsZiA9IHRoaXM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBnZXQgbmV4dCBwYWdlXHJcbiAqL1xyXG5wYWdpbmF0aW9uLnByb3RvdHlwZS5nZXRQcmV2UGFnZSA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdmFsID0gdGhpcy5wYWdlUGFyYW0oKTtcclxuXHR0aGlzLnBhZ2VQYXJhbSh2YWwgPiAwID8gdmFsIC0gMSA6IDApO1xyXG5cdHRoaXMucmVxdWVzdEJ0bi50cmlnZ2VyKCdjbGljaycpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIGdldCBwcmV2IHBhZ2VcclxuICovXHJcbnBhZ2luYXRpb24ucHJvdG90eXBlLmdldE5leHRQYWdlID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciB2YWwgPSB0aGlzLm51bWJlcjtcclxuXHR0aGlzLnBhZ2VQYXJhbSh2YWwgPCB0aGlzLnRvdGFsUGFnZXMgLSAxID8gdmFsICArIDE6IHZhbCk7XHJcblx0dGhpcy5yZXF1ZXN0QnRuLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ3BhZ2luYXRpb24nLCB7XHJcblx0dmlld01vZGVsOiBwYWdpbmF0aW9uLFxyXG5cdHRlbXBsYXRlOlxyXG5cdGA8c3BhbiBjbGFzcz1cIm5hdmlnYXRpb24td3JhcHBlclwiPlxyXG5cdFx0PGJ1dHRvbiBkYXRhLWJpbmQ9XCJjbGljazogZ2V0UHJldlBhZ2UsIGVuYWJsZTogZmlyc3RcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJuYXZpZ2F0aW9uIHByZXZcIj48L2J1dHRvbj5cclxuXHRcdDxidXR0b24gIGRhdGEtYmluZD1cImNsaWNrOiBnZXROZXh0UGFnZSwgZW5hYmxlOiBsYXN0XCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibmF2aWdhdGlvbiBuZXh0XCI+PC9idXR0b24+XHJcblx0PC9zcGFuPmBcclxufSk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9zcmMvY29tcG9uZW50cy9wYW5lbHMvcGFnaW5hdGlvbi5jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHNlbGY7XHJcblxyXG5mdW5jdGlvbiBvYmplY3RQYW5lbEJvZHlDb21wb25lbnQocGFyYW1zKSB7XHJcblx0c2VsZiA9IHRoaXM7XHJcblx0dmFyIGNvbmZpZyA9IHBhcmFtcy5jb25maWcgJiYgcGFyYW1zLmNvbmZpZy5fQ09ORklHO1xyXG5cdHZhciBwYWdlID0gcGFyYW1zLnBhZ2U7XHJcblx0dGhpcy5zZXRBY3RpdmUgPSBwYXJhbXMuc2V0QWN0aXZlO1xyXG5cdHRoaXMuX3BhbmVsTmFtZSA9IHBhcmFtcy5kYXRhLmtleTtcclxuXHR0aGlzLnRpdGxlID0gY29uZmlnICYmIGNvbmZpZy50aXRsZSB8fCB0aGlzLl9wYW5lbE5hbWU7XHJcblx0dGhpcy5kYXRhID0gcGFyYW1zLmRhdGEudmFsdWU7XHJcblx0aWYgKHBhZ2UpIHtcclxuXHRcdHRoaXMuY2FyZFNpemUgPSBwYWdlLnNpemU7XHJcblx0XHR0aGlzLnBhZ2VQYXJhbSA9IHBhZ2UucGFnZVBhcmFtO1xyXG5cdH1cclxuXHR0aGlzLmNvbGxhcHNlSWQgPSBwYXJhbXMuY29sbGFwc2VJZDtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ3BhbmVsLWhlYWRpbmcnLCB7XHJcblx0dmlld01vZGVsOiAgb2JqZWN0UGFuZWxCb2R5Q29tcG9uZW50LFxyXG5cdHRlbXBsYXRlOmBcclxuXHRcdDxzZWN0aW9uIGNsYXNzPVwicGFuZWwtaGVhZGluZ1wiPlxyXG5cdFx0XHQ8ZGl2IGNsYXNzPVwicGFuZWwtdGl0bGVcIj5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQ8YSBkYXRhLWJpbmQ9XCJjbGljazogc2V0QWN0aXZlLCBhdHRyOiB7aHJlZjogJyMnICsgY29sbGFwc2VJZCwgJ2FyaWEtY29udHJvbHMnOiBjb2xsYXBzZUlkfVwiIGNsYXNzPVwiYnRuIGJ0bi1pY29uXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiYnRuIGJ0bi1pY29uIHNoZXZyb24gd2hpdGUtc2hldnJvbi11cFwiPjwvc3Bhbj5cclxuXHRcdFx0XHRcdDxwIGRhdGEtYmluZD1cInRleHQ6IHRpdGxlXCIgY2xhc3M9XCJ0aXRsZVwiPlBhbmVsIHRpdGxlPC9wPlxyXG5cdFx0XHRcdDwvYT5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQ8IS0tIGtvIGlmOiBfcGFuZWxOYW1lID09PSAnZXZlbnRzJy0tPlxyXG5cdFx0XHRcdFx0PHNwYW4gZGF0YS1iaW5kPVwidGV4dDogY2FyZFNpemVcIiBjbGFzcz1cImNvdW50ZXJcIj48L3NwYW4+XHJcblx0XHRcdFx0PCEtLSAva28tLT5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQ8IS0tIGtvIGlmOiBfcGFuZWxOYW1lID09PSAncGFnZSctLT5cclxuXHRcdFx0XHRcdDxwYWdpbmF0aW9uIHBhcmFtcz1cIm51bWJlcjogZGF0YS5udW1iZXIsIHRvdGFsUGFnZXM6IGRhdGEudG90YWxQYWdlcywgcGFnZVBhcmFtOiBwYWdlUGFyYW1cIj48L3BhZ2luYXRpb24+XHJcblx0XHRcdFx0PCEtLSAva28tLT5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L3NlY3Rpb24+XHJcbmB9KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9wYW5lbEhlYWRpbmcuY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xyXG5cclxuZnVuY3Rpb24gb2JqZWN0UGFuZWxCb2R5Q29tcG9uZW50KHBhcmFtcykge1xyXG5cdHNlbGYgPSB0aGlzO1xyXG5cdHRoaXMuZGF0YSA9IHRoaXMuZGF0YSB8fCBrby5vYnNlcnZhYmxlKHBhcmFtcy5kYXRhLnZhbHVlKTtcclxuXHR0aGlzLmNvbmZpZyA9IHBhcmFtcy5jb25maWc7XHJcblx0dGhpcy5fcGFuZWxOYW1lID0gcGFyYW1zLmRhdGEua2V5O1xyXG5cdHRoaXMuY2FyZEluZGV4ID0gdGhpcy5jYXJkSW5kZXggfHwga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShwYXJhbXMuaW5kZXgpO1xyXG5cdHRoaXMucGFuZWxHcm91cCA9IHBhcmFtcy5wYW5lbEdyb3VwO1xyXG5cdHRoaXMuZ2V0TW9yZSA9IHRoaXMucGFuZWxHcm91cC5nZXRNb3JlO1xyXG5cdHRoaXMucGFnZVBhcmFtID0gcGFyYW1zLnBhZ2UgJiYgcGFyYW1zLnBhZ2UucGFyYW1ldGVyO1xyXG59XHJcblxyXG5vYmplY3RQYW5lbEJvZHlDb21wb25lbnQucHJvdG90eXBlLm9uRW50ZXJLZXlEb3duID0gZnVuY3Rpb24gKG1vZGVsLCBldmVudCkge1xyXG5cdGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xyXG5cdFx0dmFyIHZhbHVlID0gK2V2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWU7XHJcblx0XHR2YWx1ZSA9IE51bWJlci5pc05hTih2YWx1ZSkgPyAwIDogdmFsdWU7XHJcblx0XHR2YXIgcGFnZU51bWJlciA9IH5+dmFsdWUgPCAwID8gMCA6IH5+dmFsdWU7XHJcblx0XHRzZWxmLnBhZ2VQYXJhbShwYWdlTnVtYmVyIDwga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShzZWxmLmRhdGEpLnRvdGFsUGFnZXMgPyBwYWdlTnVtYmVyIDoga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShzZWxmLmRhdGEpLnRvdGFsUGFnZXMgLSAxKTtcclxuXHRcdCQoJyNhcGktZXhwLWdldC1idG4nKS50cmlnZ2VyKCdjbGljaycpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcbn07XHJcblxyXG5vYmplY3RQYW5lbEJvZHlDb21wb25lbnQucHJvdG90eXBlLmNhbkJlQ29waWVkID0gZnVuY3Rpb24gKCkge1xyXG5cdGlmICh0eXBlb2YgdGhpcy52YWx1ZSA9PT0gJ29iamVjdCcpIHJldHVybiBmYWxzZTtcclxuXHR0aGlzLmNvcGllZCA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xyXG5cdGlmIChPYmplY3QuZ2V0UHJvcChzZWxmLmNvbmZpZywgJy5fQ09ORklHLmNvcHlCdG4uJyArIHRoaXMua2V5KSkge1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5vYmplY3RQYW5lbEJvZHlDb21wb25lbnQucHJvdG90eXBlLmNvcHlWYWx1ZSA9IGZ1bmN0aW9uIChtb2RlbCwgZXZlbnQpIHtcclxuXHR2YXIgY3VycmVudEZpZWxkID0gdGhpcztcclxuXHRzZWxmLmNsaXBib2FyZCA9IG5ldyBDbGlwYm9hcmQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcblx0c2VsZi5jbGlwYm9hcmQub24oJ3N1Y2Nlc3MnLCBmdW5jdGlvbiBvblN1Y2Nlc3NDb3B5KGUpIHtcclxuXHRcdFx0Y29uc29sZS5pbmZvKCdBY3Rpb246JywgZS5hY3Rpb24pO1xyXG5cdFx0XHRjb25zb2xlLmluZm8oJ1RleHQ6JywgZS50ZXh0KTtcclxuXHRcdFx0Y29uc29sZS5pbmZvKCdUcmlnZ2VyOicsIGUudHJpZ2dlcik7XHJcblx0XHRcdGN1cnJlbnRGaWVsZC5jb3BpZWQodHJ1ZSk7XHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGN1cnJlbnRGaWVsZC5jb3BpZWQoZmFsc2UpO1xyXG5cdFx0XHR9LCAyMDAwKTtcclxuXHRcdFx0ZS5jbGVhclNlbGVjdGlvbigpO1xyXG5cdFx0fSlcclxuXHRcdC5vbignZXJyb3InLCBmdW5jdGlvbiBvbkVycm9yQ29weShlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ0FjdGlvbjonLCBlLmFjdGlvbik7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ1RyaWdnZXI6JywgZS50cmlnZ2VyKTtcclxuXHRcdH0pO1xyXG59O1xyXG5cclxub2JqZWN0UGFuZWxCb2R5Q29tcG9uZW50LnByb3RvdHlwZS5yZW1vdmVIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xyXG5cdHNlbGYuY2xpcGJvYXJkICYmIHNlbGYuY2xpcGJvYXJkLmRlc3Ryb3koKTtcclxuXHRkZWxldGUgc2VsZi5jbGlwYm9hcmQ7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ29iamVjdC1wYW5lbC1ib2R5Jywge1xyXG5cdHZpZXdNb2RlbDogIG9iamVjdFBhbmVsQm9keUNvbXBvbmVudCxcclxuXHR0ZW1wbGF0ZTpgXHJcblx0XHQ8c2VjdGlvbj5cclxuXHRcdFxyXG5cdFx0XHQ8IS0tIGtvIGlmOiAkY29tcG9uZW50Ll9wYW5lbE5hbWUgPT09ICdpbWFnZScgLS0+XHJcblx0XHRcdFx0PGltZyBkYXRhLWJpbmQ9XCJhdHRyOiB7c3JjOiBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKGRhdGEpLnVybCwgYWx0OiAnaW1hZ2UtJyArIGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUoZGF0YSkucmF0aW99XCIgYWx0PVwiaW1nXCIgY2xhc3M9XCJpbWcgaW1nLXRodW1ibmFpbFwiPlxyXG5cdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHJcblx0XHRcdDx1bCBkYXRhLWJpbmQ9XCJmb3JlYWNocHJvcDogZGF0YVwiPlxyXG5cdFx0XHRcdDxsaSBjbGFzcz1cImNsZWFyZml4XCI+XHJcblx0XHRcdFx0XHQ8YiBjbGFzcz1cImtleVwiPlxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBkYXRhLWJpbmQ9XCJ0ZXh0OiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnID8ga2V5OiBrZXkgKyAnOidcIj48L3NwYW4+XHJcblx0XHRcdFx0XHQ8L2I+XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdDwhLS0ga28gaWZub3Q6IHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgJGNvbXBvbmVudC5fcGFuZWxOYW1lID09PSAncGFnZScgJiYga2V5ID09PSAnbnVtYmVyJyAtLT5cclxuXHRcdFx0XHRcdFx0PHNwYW4gZGF0YS1iaW5kPVwidGV4dDogdmFsdWVcIiBjbGFzcz1cInZhbHVlXCI+PC9zcGFuPlxyXG5cdFx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdDwhLS0ga28gaWY6ICRjb21wb25lbnQuX3BhbmVsTmFtZSA9PT0gJ3BhZ2UnICYmIGtleSA9PT0gJ251bWJlcictLT5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZvcm0taW5saW5lXCI+XHJcblx0XHRcdFx0XHRcdFx0PGlucHV0IGlkPVwicGFnaW5hdGlvbi1pbnB1dFwiIGRhdGEtYmluZD1cImV2ZW50OiB7a2V5ZG93bjogJGNvbXBvbmVudC5vbkVudGVyS2V5RG93bn0sIGF0dHI6IHtwbGFjZWhvbGRlcjogdmFsdWV9XCIgdHlwZT1cInRleHRcIiBwYXR0ZXJuPVwiWzAtOV0rXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0PCEtLSBrbyBpZjogJGNvbXBvbmVudC5jYW5CZUNvcGllZC5jYWxsKCRkYXRhLCAnI3Byb3AtdmFsdWUtJyArIGtleSArICRpbmRleCgpKSAtLT5cclxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBkYXRhLWJpbmQ9XCJldmVudDoge21vdXNlb3ZlcjogJGNvbXBvbmVudC5jb3B5VmFsdWUsIG1vdXNlb3V0OiAkY29tcG9uZW50LnJlbW92ZUhhbmRsZXJ9LCBjc3M6IHsnY29waWVkJzogY29waWVkfSwgYXR0cjogeydkYXRhLWNsaXBib2FyZC10ZXh0JzogdmFsdWUudG9TdHJpbmcoKSwgaWQ6ICdwcm9wLXZhbHVlLScgKyBrZXkgKyAkaW5kZXgoKX1cIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWljb24gYnRuLWNvcHlcIj48L2J1dHRvbj5cclxuXHRcdFx0XHRcdDwhLS0gL2tvIC0tPlxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8IS0tIGtvIGlmOiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIC0tPlxyXG5cdFx0XHRcdFx0XHQ8YnV0dG9uIGRhdGEtYmluZD1cImNsaWNrOiAkY29tcG9uZW50LmdldE1vcmUuYmluZCgkY29tcG9uZW50LCBrZXksIHZhbHVlKVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4taWNvbiBibHVlLXNoZXZyb24tcmlnaHQgcHVsbC1yaWdodFwiPjwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFx0PC9saT5cclxuXHRcdFx0PC91bD5cclxuXHRcdDwvc2VjdGlvbj5cclxuYH0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvc3JjL2NvbXBvbmVudHMvcGFuZWxzL29iamVjdFBhbmVsQm9keS5jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHNlbGY7XHJcblxyXG5mdW5jdGlvbiBvYmplY3RQYW5lbEJvZHlDb21wb25lbnQocGFyYW1zKSB7XHJcblx0c2VsZiA9IHRoaXM7XHJcblx0dGhpcy50aXRsZSA9IHBhcmFtcy5kYXRhLmtleTtcclxuXHR0aGlzLmRhdGEgPSBwYXJhbXMuZGF0YS52YWx1ZTtcclxuXHR0aGlzLmNvbmZpZyA9IHBhcmFtcy5jb25maWc7XHJcblx0dGhpcy5fcGFuZWxOYW1lID0gcGFyYW1zLmRhdGEua2V5O1xyXG5cdHRoaXMuY2FyZEluZGV4ID0gdGhpcy5jYXJkSW5kZXggfHwga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShwYXJhbXMuaW5kZXgpO1xyXG5cdHRoaXMucGFuZWxHcm91cCA9IHBhcmFtcy5wYW5lbEdyb3VwO1xyXG5cdHRoaXMuZ2V0TW9yZSA9IHRoaXMucGFuZWxHcm91cC5nZXRNb3JlO1xyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdhcnJheS1wYW5lbC1ib2R5Jywge1xyXG5cdHZpZXdNb2RlbDogIG9iamVjdFBhbmVsQm9keUNvbXBvbmVudCxcclxuXHR0ZW1wbGF0ZTpgXHJcblx0XHQ8dWwgZGF0YS1iaW5kPVwiZm9yZWFjaDogZGF0YVwiIGNsYXNzPVwibGlzdC1ncm91cFwiPlxyXG5cdFx0XHQ8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj5cclxuXHRcdFx0XHJcblx0XHRcdFx0PCEtLSBrbyBpZjogJHBhcmVudC5fcGFuZWxOYW1lID09PSAnaW1hZ2VzJyAtLT5cclxuXHRcdFx0XHRcdDxpbWcgZGF0YS1iaW5kPVwiYXR0cjoge3NyYzogdXJsLCBhbHQ6ICdpbWFnZS0nICsgcmF0aW99XCIgYWx0PVwiaW1nXCIgY2xhc3M9XCJpbWdcIj5cclxuXHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQ8IS0tIGtvIGlmbm90OiAkcGFyZW50Ll9wYW5lbE5hbWUgPT09ICdpbWFnZXMnIC0tPlxyXG5cdFx0XHRcdDxzcGFuIGRhdGEtYmluZD1cInRleHQ6IG5hbWUgfHwgJyMnICsgJGluZGV4KClcIiBjbGFzcz1cIm5hbWUgdHJ1bmNhdGVcIj5ldmVudCBuYW1lPC9zcGFuPlxyXG5cdFx0XHRcdDwhLS0gL2tvIC0tPlxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdDwhLS0ga28gaWY6IHR5cGVvZiAkZGF0YSA9PT0gJ29iamVjdCcgLS0+XHJcblx0XHRcdFx0XHQ8YnV0dG9uIGRhdGEtYmluZD1cImNsaWNrOiAkY29tcG9uZW50LmdldE1vcmUuYmluZCgkY29tcG9uZW50LCAkaW5kZXgoKSlcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWljb24gYmx1ZS1zaGV2cm9uLXJpZ2h0IHB1bGwtcmlnaHRcIj48L2J1dHRvbj5cclxuXHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcclxuXHRcdFx0PC9saT5cclxuXHRcdDwvdWw+XHJcbmB9KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL3NyYy9jb21wb25lbnRzL3BhbmVscy9hcnJheVBhbmVsQm9keS5jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==