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
	
	// View Models
	var MenuViewModel = __webpack_require__(6);
	var ParamsViewModel = __webpack_require__(8);
	var MethodsViewModel = __webpack_require__(9);
	var RequestsListViewModel = __webpack_require__(10);
	
	// Components
	__webpack_require__(15);
	
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

	var apiKey = sessionStorage.getItem('tk-api-key') || apiKeyService.getApiExploreKey(); //API Key
	
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
	var slider = __webpack_require__(14);
	
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
	RequestsListViewModel.prototype.getMore = function (data) {
		var card = this;
		var currentSlider = $('#slider-' + card.sectionIndex);
		var component = $('<section data-bind="component: {name: \'panel-group\', params: params}"></section>');
		var curslick = currentSlider.slick('getSlick');
		var newData = {};
		
		// gathering all primitive props in additional panel
		for (var key in data) {
			if (!data.hasOwnProperty(key)) {
				continue;
			}
			var val = data[key];
			if (typeof val !== 'object') {
				newData[data.type || Object.keys(data)[0]] = newData[data.type || Object.keys(data)[0]] || {};
				newData[data.type || Object.keys(data)[0]][key] = val;
			} else {
				newData[key] = val;
			}
		}
		
		// extending additional data (copy)
		var params = $.extend({}, card, {cards: newData, groupIndex: card.groupIndex + 1});
		// apply component data bindings
		ko.applyBindings({
			params: params
		}, component[0]);
		
		// add slide with selected data
		currentSlider.slick('slickAdd', component);
		
		// remove outstanding slides
		for (var i = curslick.slideCount - 2; i > card.groupIndex; i--) {
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
		return this.requests().length > 0;
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
		return __webpack_require__(13)("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId])\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\texports: {},\n/******/ \t\t\tid: moduleId,\n/******/ \t\t\tloaded: false\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.loaded = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(0);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ function(module, exports, __webpack_require__) {\n\n\t/**\r\n\t * Code format web-worker\r\n\t * @param event\r\n\t */\r\n\t// var highlightJson()\r\n\tvar highlightJson = __webpack_require__(1);\r\n\t\r\n\tonmessage = function(event) {\r\n\t  var code = event.data;\r\n\t  // importScripts('json-parse.js');\r\n\t  var result = highlightJson(code, {expanded: true});\r\n\t  // var result =JSON.stringify(code);\r\n\t  postMessage(result);\r\n\t};\r\n\n\n/***/ },\n/* 1 */\n/***/ function(module, exports) {\n\n\tvar prefix = 'tm-code';\r\n\t\r\n\tvar getExpanderClasses = function (expanded) {\r\n\t\tif (!expanded) {\r\n\t\t\treturn 'expanded collapsed hidden';\r\n\t\t}\r\n\t\treturn 'expanded';\r\n\t};\r\n\t\r\n\tvar encode = function (value) {\r\n\t\treturn ['<span>', value, '</span>'].join('');\r\n\t};\r\n\t\r\n\tvar createElement = function (key, value, type, expanderClasses) {\r\n\t\tvar klass = 'object',\r\n\t\t\topen = '{',\r\n\t\t\tclose = '}';\r\n\t\r\n\t\tif (Array.isArray(value)) {\r\n\t\t\tklass = 'array';\r\n\t\t\topen = '[';\r\n\t\t\tclose = ']';\r\n\t\t}\r\n\t\r\n\t\tif (value === null) {\r\n\t\t\treturn [\r\n\t\t\t\t'<li>',\r\n\t\t\t\t\t'<span class=\"key\">\"', encode(key), '\": </span>',\r\n\t\t\t\t\t'<span class=\"null\">\"', encode(value), '\"</span>',\r\n\t\t\t\t'</li>'\r\n\t\t\t].join('');\r\n\t\t}\r\n\t\r\n\t\tif (type == 'object') {\r\n\t\t\treturn [\r\n\t\t\t\t'<li>',\r\n\t\t\t\t\t'<span class=\"', expanderClasses, '\"></span>',\r\n\t\t\t\t\t'<span class=\"key\">\"', encode(key), '\": </span> ',\r\n\t\t\t\t\t'<span class=\"open\">', open, '</span> ',\r\n\t\t\t\t\t'<ul class=\"', klass, '\">',\r\n\t\t\t\t\t\tjson2html(value, expanderClasses),\r\n\t\t\t\t\t'</ul>',\r\n\t\t\t\t\t'<span class=\"close\">', close, '</span>',\r\n\t\t\t\t'</li>'\r\n\t\t\t].join('');\r\n\t\t}\r\n\t\r\n\t\tif (type == 'number' || type == 'boolean') {\r\n\t\t\treturn [\r\n\t\t\t\t'<li>',\r\n\t\t\t\t\t'<span class=\"key\">\"', encode(key), '\": </span>',\r\n\t\t\t\t\t'<span class=\"', type, '\">', encode(value), '</span>',\r\n\t\t\t\t'</li>'\r\n\t\t\t].join('');\r\n\t\t}\r\n\t\treturn [\r\n\t\t\t'<li>',\r\n\t\t\t\t'<span class=\"key\">\"', encode(key), '\": </span>',\r\n\t\t\t\t'<span class=\"', type, '\">\"', encode(value), '\"</span>',\r\n\t\t\t'</li>'\r\n\t\t].join('');\r\n\t};\r\n\t\r\n\tvar json2html = function (json, expanderClasses) {\r\n\t\tvar html = '';\r\n\t\tfor (var key in json) {\r\n\t\t\tif (!json.hasOwnProperty(key)) {\r\n\t\t\t\tcontinue;\r\n\t\t\t}\r\n\t\r\n\t\t\thtml = [html, createElement(key, json[key], typeof json[key], expanderClasses)].join('');\r\n\t\t}\r\n\t\treturn html;\r\n\t};\r\n\t\r\n\tvar getJsonViewer = function (data, options) {\r\n\t\ttry {\r\n\t\t\treturn [\r\n\t\t\t\t'<ul class=\"', prefix, '-container\">',\r\n\t\t\t\t\tjson2html([JSON.parse(data)], getExpanderClasses(options.expanded)),\r\n\t\t\t\t'</ul>'\r\n\t\t\t].join('');\r\n\t\t} catch (e) {\r\n\t\t\treturn [\r\n\t\t\t\t'<div class=\"', prefix, '-error\" >', e.toString(), ' </div>'\r\n\t\t\t].join('');\r\n\t\t}\r\n\t};\r\n\t\r\n\tmodule.exports = function(data, opt) {\r\n\t\tvar json = '';\r\n\t\tvar options = opt || {expanded: true};\r\n\t\tif (typeof data == 'string') {\r\n\t\t\tjson = data;\r\n\t\t} else if (typeof data == 'object') {\r\n\t\t\tjson = JSON.stringify(data)\r\n\t\t}\r\n\t\treturn getJsonViewer(json, options);\r\n\t};\r\n\n\n/***/ }\n/******/ ]);\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDcxYjEwZDQ0Y2E3MjgwZTExNGEiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvbW9kdWxlcy9oaWdobGlnaHRKc29uLndvcmtlci5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9tb2R1bGVzL2pzb24tcGFyc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFDQUFvQyxlQUFlO0FBQ25EO0FBQ0E7QUFDQTs7Ozs7OztBQ2JBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVc7QUFDWCxhQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF1QjtBQUN2QjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImhpZ2hsaWdodEpzb24ud29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA0NzFiMTBkNDRjYTcyODBlMTE0YVxuICoqLyIsIi8qKlxyXG4gKiBDb2RlIGZvcm1hdCB3ZWItd29ya2VyXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuLy8gdmFyIGhpZ2hsaWdodEpzb24oKVxyXG52YXIgaGlnaGxpZ2h0SnNvbiA9IHJlcXVpcmUoJy4vanNvbi1wYXJzZScpO1xyXG5cclxub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICB2YXIgY29kZSA9IGV2ZW50LmRhdGE7XHJcbiAgLy8gaW1wb3J0U2NyaXB0cygnanNvbi1wYXJzZS5qcycpO1xyXG4gIHZhciByZXN1bHQgPSBoaWdobGlnaHRKc29uKGNvZGUsIHtleHBhbmRlZDogdHJ1ZX0pO1xyXG4gIC8vIHZhciByZXN1bHQgPUpTT04uc3RyaW5naWZ5KGNvZGUpO1xyXG4gIHBvc3RNZXNzYWdlKHJlc3VsdCk7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9tb2R1bGVzL2hpZ2hsaWdodEpzb24ud29ya2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHByZWZpeCA9ICd0bS1jb2RlJztcclxuXHJcbnZhciBnZXRFeHBhbmRlckNsYXNzZXMgPSBmdW5jdGlvbiAoZXhwYW5kZWQpIHtcclxuXHRpZiAoIWV4cGFuZGVkKSB7XHJcblx0XHRyZXR1cm4gJ2V4cGFuZGVkIGNvbGxhcHNlZCBoaWRkZW4nO1xyXG5cdH1cclxuXHRyZXR1cm4gJ2V4cGFuZGVkJztcclxufTtcclxuXHJcbnZhciBlbmNvZGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRyZXR1cm4gWyc8c3Bhbj4nLCB2YWx1ZSwgJzwvc3Bhbj4nXS5qb2luKCcnKTtcclxufTtcclxuXHJcbnZhciBjcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUsIHR5cGUsIGV4cGFuZGVyQ2xhc3Nlcykge1xyXG5cdHZhciBrbGFzcyA9ICdvYmplY3QnLFxyXG5cdFx0b3BlbiA9ICd7JyxcclxuXHRcdGNsb3NlID0gJ30nO1xyXG5cclxuXHRpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuXHRcdGtsYXNzID0gJ2FycmF5JztcclxuXHRcdG9wZW4gPSAnWyc7XHJcblx0XHRjbG9zZSA9ICddJztcclxuXHR9XHJcblxyXG5cdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG5cdFx0cmV0dXJuIFtcclxuXHRcdFx0JzxsaT4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cImtleVwiPlwiJywgZW5jb2RlKGtleSksICdcIjogPC9zcGFuPicsXHJcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwibnVsbFwiPlwiJywgZW5jb2RlKHZhbHVlKSwgJ1wiPC9zcGFuPicsXHJcblx0XHRcdCc8L2xpPidcclxuXHRcdF0uam9pbignJyk7XHJcblx0fVxyXG5cclxuXHRpZiAodHlwZSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0cmV0dXJuIFtcclxuXHRcdFx0JzxsaT4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cIicsIGV4cGFuZGVyQ2xhc3NlcywgJ1wiPjwvc3Bhbj4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cImtleVwiPlwiJywgZW5jb2RlKGtleSksICdcIjogPC9zcGFuPiAnLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cIm9wZW5cIj4nLCBvcGVuLCAnPC9zcGFuPiAnLFxyXG5cdFx0XHRcdCc8dWwgY2xhc3M9XCInLCBrbGFzcywgJ1wiPicsXHJcblx0XHRcdFx0XHRqc29uMmh0bWwodmFsdWUsIGV4cGFuZGVyQ2xhc3NlcyksXHJcblx0XHRcdFx0JzwvdWw+JyxcclxuXHRcdFx0XHQnPHNwYW4gY2xhc3M9XCJjbG9zZVwiPicsIGNsb3NlLCAnPC9zcGFuPicsXHJcblx0XHRcdCc8L2xpPidcclxuXHRcdF0uam9pbignJyk7XHJcblx0fVxyXG5cclxuXHRpZiAodHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdib29sZWFuJykge1xyXG5cdFx0cmV0dXJuIFtcclxuXHRcdFx0JzxsaT4nLFxyXG5cdFx0XHRcdCc8c3BhbiBjbGFzcz1cImtleVwiPlwiJywgZW5jb2RlKGtleSksICdcIjogPC9zcGFuPicsXHJcblx0XHRcdFx0JzxzcGFuIGNsYXNzPVwiJywgdHlwZSwgJ1wiPicsIGVuY29kZSh2YWx1ZSksICc8L3NwYW4+JyxcclxuXHRcdFx0JzwvbGk+J1xyXG5cdFx0XS5qb2luKCcnKTtcclxuXHR9XHJcblx0cmV0dXJuIFtcclxuXHRcdCc8bGk+JyxcclxuXHRcdFx0JzxzcGFuIGNsYXNzPVwia2V5XCI+XCInLCBlbmNvZGUoa2V5KSwgJ1wiOiA8L3NwYW4+JyxcclxuXHRcdFx0JzxzcGFuIGNsYXNzPVwiJywgdHlwZSwgJ1wiPlwiJywgZW5jb2RlKHZhbHVlKSwgJ1wiPC9zcGFuPicsXHJcblx0XHQnPC9saT4nXHJcblx0XS5qb2luKCcnKTtcclxufTtcclxuXHJcbnZhciBqc29uMmh0bWwgPSBmdW5jdGlvbiAoanNvbiwgZXhwYW5kZXJDbGFzc2VzKSB7XHJcblx0dmFyIGh0bWwgPSAnJztcclxuXHRmb3IgKHZhciBrZXkgaW4ganNvbikge1xyXG5cdFx0aWYgKCFqc29uLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuXHRcdFx0Y29udGludWU7XHJcblx0XHR9XHJcblxyXG5cdFx0aHRtbCA9IFtodG1sLCBjcmVhdGVFbGVtZW50KGtleSwganNvbltrZXldLCB0eXBlb2YganNvbltrZXldLCBleHBhbmRlckNsYXNzZXMpXS5qb2luKCcnKTtcclxuXHR9XHJcblx0cmV0dXJuIGh0bWw7XHJcbn07XHJcblxyXG52YXIgZ2V0SnNvblZpZXdlciA9IGZ1bmN0aW9uIChkYXRhLCBvcHRpb25zKSB7XHJcblx0dHJ5IHtcclxuXHRcdHJldHVybiBbXHJcblx0XHRcdCc8dWwgY2xhc3M9XCInLCBwcmVmaXgsICctY29udGFpbmVyXCI+JyxcclxuXHRcdFx0XHRqc29uMmh0bWwoW0pTT04ucGFyc2UoZGF0YSldLCBnZXRFeHBhbmRlckNsYXNzZXMob3B0aW9ucy5leHBhbmRlZCkpLFxyXG5cdFx0XHQnPC91bD4nXHJcblx0XHRdLmpvaW4oJycpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJldHVybiBbXHJcblx0XHRcdCc8ZGl2IGNsYXNzPVwiJywgcHJlZml4LCAnLWVycm9yXCIgPicsIGUudG9TdHJpbmcoKSwgJyA8L2Rpdj4nXHJcblx0XHRdLmpvaW4oJycpO1xyXG5cdH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSwgb3B0KSB7XHJcblx0dmFyIGpzb24gPSAnJztcclxuXHR2YXIgb3B0aW9ucyA9IG9wdCB8fCB7ZXhwYW5kZWQ6IHRydWV9O1xyXG5cdGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykge1xyXG5cdFx0anNvbiA9IGRhdGE7XHJcblx0fSBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0anNvbiA9IEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcblx0fVxyXG5cdHJldHVybiBnZXRKc29uVmlld2VyKGpzb24sIG9wdGlvbnMpO1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvbW9kdWxlcy9qc29uLXBhcnNlLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==", __webpack_require__.p + "highlightJson.worker.js");
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

	function slick(times) {
		"use strict";
		var selector = '#slider-';
		
		for (var i = 0; i < times; i++) {
			$(selector + i).slick({
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
		var selector = '#slider-';
		
		for (var i = 0; i < times; i++) {
			$(selector + i).slick('unslick');
		}
		console.log('cleared');
	}
	
	module.exports = {
		set: slick,
		remove: unslick
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (function () {
		__webpack_require__(16);
		__webpack_require__(17);
		__webpack_require__(19);
		__webpack_require__(20);
		__webpack_require__(21);
		__webpack_require__(22);
	}());


/***/ },
/* 16 */
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var self;
	
	function cardGroupComponent(params) {
		self = this;
		var url = params.url;
		this.filter = __webpack_require__(18);
		this.cards = this.removeCards(params.cards);
		this.groupIndex = params.groupIndex || 0;
		this.cardIndex = params.cardIndex;
		this.sectionIndex = ko.utils.unwrapObservable(params.sectionIndex);
		this.data = params.data;
		this.colorClass = params.colorClass;
		this.getMore = params.getMore;
		this.reqId = this.reqId || params.reqId;
		this.cardSize = params.cardSize || this.cards.page.size;
		this.pageParam = (params.pageParam || ko.utils.unwrapObservable(url).find(function (item) {
			return item.name === 'page';
		})).value;
		
		this.collapseId = [
			'card-panel-body-',
			this.sectionIndex,
			this.groupIndex
		].join('');
		
		this.isActive = ko.observable(false);
	}
	
	cardGroupComponent.prototype.removeCards = function (obj) {
		var deprecated = this.filter.deprecated;
		var unwrapp = this.filter.unwrapp;
		// var currentApi = this.filter[]
	
		deprecated.map(function (item) {
			if (obj[item]) {
				delete obj[item]
			}
			return item;
		});
	
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
	};
	
	cardGroupComponent.prototype.setActive = function (vm, e) {
		if (!this.isActive) {
			 return this.isActive = ko.observable(true);
		}
		this.isActive(!this.isActive());
	};
	
	cardGroupComponent.prototype.sortByConfig = function sortFunc(a, b) {
		var config = self.filter[self.reqId];
		var o1 = config.find(function (obj) {
			return obj.title === a.key;
		});
		var o2 = config.find(function (obj) {
			return obj.title === b.key;
		});
		return config.indexOf(o1) - config.indexOf(o2);
	};
	
	module.exports = ko.components.register('panel-group', {
		viewModel: cardGroupComponent,
		template:`
			<section data-bind="foreachprop: {data: cards, sortFn: sortByConfig}" class="panel-group">
				<section data-bind="css: {[$component.colorClass]: true}" class="panel panel-primary">
					<!--panel-heading-->
					<panel-heading params="data: $data, index: $index, cardSize: $component.cardSize, pageParam: $component.pageParam, collapseId: $component.collapseId"></panel-heading>			
					<!--panel-body-->
					<section data-bind="attr:{'id': $component.collapseId + $index()}" class="panel-collapse collapse">
						<div class="panel-body">
						
							<!-- ko if: (typeof value === 'object' && !$.isArray(value)) -->
								<object-panel-body params="data: $data, cardGroup: $component, pageParam: $component.pageParam"></object-panel-body>
							<!-- /ko -->
							
							<!-- ko if: (typeof value === 'object' && $.isArray(value)) -->
								<array-panel-body params="data: $data, cardGroup: $component"></array-panel-body>
							<!-- /ko -->
						</div>
					</section>
				</section>
		
			</section>
	`});


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = {
		"discovery.v2.events.get": [
			{
				"title": "events",
				"items": [
					{
						"title": "event"
					},
					{
						"title": "images"
					},
					{
						"title": "sales"
					},
					{
						"title": "venues"
					},
					{
						"title": "dates",
						"items": [
							{
								"title": "start"
							},
							{
								"title": "status"
							},
							{
								"title": "end"
							}
						]
					}
				]
			},
			{
				"title": "page"
			}
		],
		"deprecated": [
			"_links"
		],
		"unwrapp": [
			"_embedded"
		]
	};

/***/ },
/* 19 */
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
		self.pageParam(val > 0 ? val - 1 : 0);
		self.requestBtn.trigger('click');
	};
	
	/**
	 * get prev page
	 */
	pagination.prototype.getNextPage = function () {
		var val = this.number;
		self.pageParam(val < self.totalPages - 1 ? val  + 1: val);
		self.requestBtn.trigger('click');
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
/* 20 */
/***/ function(module, exports) {

	var self;
	
	function objectPanelBodyComponent(params) {
		self = this;
		this.title = params.data.key;
		this.data = params.data.value;
		this.index = ko.utils.unwrapObservable(params.index);
		this.cardSize = params.cardSize;
		this.pageParam = params.pageParam;
		this.collapseId = params.collapseId;
	}
	module.exports = ko.components.register('panel-heading', {
		viewModel:  objectPanelBodyComponent,
		template:`
			<section class="panel-heading">
				<div class="panel-title">
					
					<a data-bind="attr: {'href': '#' + collapseId + index, 'aria-controls': collapseId + index}" class="btn btn-icon" type="button" data-toggle="collapse" aria-expanded="false">
						<span class="btn btn-icon shevron white-shevron-up"></span>
						<p data-bind="text: title" class="title">Title</p>
					</a>
					
					<!-- ko if: title === 'events'-->
						<span data-bind="text: cardSize" class="counter"></span>
					<!-- /ko-->
					
					<!-- ko if: title === 'page'-->
						<pagination params="number: data.number, totalPages: data.totalPages, pageParam: pageParam"></pagination>
					<!-- /ko-->
				</div>
			</section>
	`});


/***/ },
/* 21 */
/***/ function(module, exports) {

	var self;
	
	function objectPanelBodyComponent(params) {
		self = this;
		this.title = params.data.key;
		this.data = params.data.value;
		this.cardGroup = params.cardGroup;
		this.getMore = this.cardGroup.getMore;
		this.pageParam = params.pageParam;
	}
	
	objectPanelBodyComponent.prototype.onEnterKeyDown = function (model, event) {
		var pageNumber = Math.abs(~~model.value);
		self.pageParam(pageNumber < +self.data.totalPages ? pageNumber : +self.data.totalPages - 2);
		if (event.keyCode === 13) {
			$('#api-exp-get-btn').trigger('click');
		} else {
			return true;
		}
	};
	
	module.exports = ko.components.register('object-panel-body', {
		viewModel:  objectPanelBodyComponent,
		template:`
			<ul data-bind="foreachprop: data">
				<li class="clearfix">
					<!-- ko if: $component.title === 'images' -->
						<img data-bind="attr: {src: url, alt: 'image-' + ratio}" alt="img" class="img img-thumbnail">
					<!-- /ko -->
					
					<b class="key">
						<span data-bind="text: typeof value === 'object' ? key: key + ':'"></span>
					</b>
					
					<!-- ko ifnot: typeof value === 'object' || $component.title === 'page' && key === 'number' -->
						<span data-bind="text: value" class="value"></span>
					<!-- /ko -->
					
					<!-- ko if: $component.title === 'page' && key === 'number'-->
						<div class="form-inline">
							<input id="pagination-input" data-bind="textInput: value, event: {keydown: $component.onEnterKeyDown}" type="text" pattern="[0-9]+" class="form-control">
						</div>
					<!-- /ko -->
					
					<!-- ko if: typeof value === 'object' -->
						<button data-bind="click: $component.getMore.bind($component.cardGroup, value)" type="button" class="btn btn-icon blue-shevron-right pull-right"></button>
					<!-- /ko -->
					
				</li>
			</ul>
	`});


/***/ },
/* 22 */
/***/ function(module, exports) {

	var self;
	
	function objectPanelBodyComponent(params) {
		self = this;
		this.title = params.data.key;
		this.data = params.data.value;
		this.cardGroup = params.cardGroup;
		this.getMore = this.cardGroup.getMore;
	}
	
	
	module.exports = ko.components.register('array-panel-body', {
		viewModel:  objectPanelBodyComponent,
		template:`
			<ul data-bind="foreach: data" class="list-group">
				<li class="list-group-item">
				
					<!-- ko if: $parent.title === 'images' -->
						<img data-bind="attr: {src: url, alt: 'image-' + ratio}" alt="img" class="img">
					<!-- /ko -->
					
					<!-- ko ifnot: $parent.title === 'images' -->
					<span data-bind="text: name || '#' + $index()" class="name truncate">event name</span>
					<!-- /ko -->
					
					<!-- ko if: typeof $data === 'object' -->
						<button data-bind="click: $component.getMore.bind($component.cardGroup)" type="button" class="btn btn-icon blue-shevron-right pull-right"></button>
					<!-- /ko -->
					
				</li>
			</ul>
	`});


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzEwNjBmZDBlYzgxOTVmNDEzNjgiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9tYWluLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2N1c3RvbUJpbmRpbmdzL2ZvcmVhY2hQcm9wLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL21vZHVsZXMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9tb2R1bGVzL2FwaWtleS5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9tb2R1bGVzL2FqYXhTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL1ZpZXdNb2RlbHMvbWVudVZpZXdNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9tb2R1bGVzL2hlbHBlckZ1bmMuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9wYXJhbXNWaWV3TW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9tZXRob2RzVmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL1ZpZXdNb2RlbHMvcmVxdWVzdHNMaXN0Vmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL21vZHVsZXMvanNvbi1oaWdobGlnaHQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvbW9kdWxlcy9oaWdobGlnaHRKc29uLndvcmtlci5qcyIsIndlYnBhY2s6Ly8vRDovdGlja2V0bWFzdGVyLWFwaS1zdGFnaW5nLmdpdGh1Yi5pby9+L3dvcmtlci1sb2FkZXIvY3JlYXRlSW5saW5lV29ya2VyLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL21vZHVsZXMvc2xpZGVyLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9jdXN0b21TZWxlY3QuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvcGFuZWxzL3BhbmVsR3JvdXAuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbmZpZy5qc29uIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvcGFuZWxzL3BhZ2luYXRpb24uY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvcGFuZWxzL3BhbmVsSGVhZGluZy5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9wYW5lbHMvb2JqZWN0UGFuZWxCb2R5LmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL3BhbmVscy9hcnJheVBhbmVsQm9keS5jb21wb25lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztB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ZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBjMTA2MGZkMGVjODE5NWY0MTM2OFxuICoqLyIsIi8qKlxyXG4gKiBNYWluIGZpbGUgZm9yIEFwaSBFeHBscmVyIHYyLjBcclxuICogRm9yIGRldmVsb3BtZW50IHBsZWFzZSB1c2UgV2VicGFjayB0byBidW5kbGUgYWxsIG1vZHVsZXNcclxuICogSXQgY2FuIGJlIG1hZGUgdXNpbmcgbnBtIHNjcmlwdHMgY21kIC0gJ3dlYnBhY2snXHJcbiAqL1xyXG4vLyBjdXN0b20gYmluZGluZ3NcclxucmVxdWlyZSgnLi4vY3VzdG9tQmluZGluZ3MvZm9yZWFjaFByb3AnKTtcclxuXHJcbi8vIE1vZHVsZXNcclxudmFyIGJhc2UgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2Jhc2UnKTtcclxudmFyIGFwaUtleSA9IHJlcXVpcmUoJy4uL21vZHVsZXMvYXBpa2V5Jyk7XHJcbnZhciBhamF4U2VydmljZSA9IHJlcXVpcmUoJy4uL21vZHVsZXMvYWpheFNlcnZpY2UnKTtcclxuXHJcbi8vIFZpZXcgTW9kZWxzXHJcbnZhciBNZW51Vmlld01vZGVsID0gcmVxdWlyZSgnLi4vVmlld01vZGVscy9tZW51Vmlld01vZGVsJyk7XHJcbnZhciBQYXJhbXNWaWV3TW9kZWwgPSByZXF1aXJlKCcuL3BhcmFtc1ZpZXdNb2RlbCcpO1xyXG52YXIgTWV0aG9kc1ZpZXdNb2RlbCA9IHJlcXVpcmUoJy4vbWV0aG9kc1ZpZXdNb2RlbCcpO1xyXG52YXIgUmVxdWVzdHNMaXN0Vmlld01vZGVsID0gcmVxdWlyZSgnLi9yZXF1ZXN0c0xpc3RWaWV3TW9kZWwnKTtcclxuXHJcbi8vIENvbXBvbmVudHNcclxucmVxdWlyZSgnLi4vY29tcG9uZW50cy9pbmRleCcpO1xyXG5cclxuLyoqXHJcbiAqIE1haW4gYXBwbGljYXRpb24gdmlldy1tb2RlbFxyXG4gKiBAcGFyYW0gb2JqIHtvYmplY3R9IGdsb2JhbCBkYXRhIG9iamVjdFxyXG4gKi9cclxuZnVuY3Rpb24gQXBwVmlld01vZGVsKG9iaikge1xyXG4gIHZhciBiYXNlID0gb2JqIHx8IHt9O1xyXG4gIHNlbGYgPSB0aGlzO1xyXG4gIHRoaXMuYXBpS2V5ID0gYXBpS2V5O1xyXG5cclxuICAvLyBvYnNlcnZhYmxlc1xyXG4gIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSA9IGtvLm9ic2VydmFibGUoJycpO1xyXG4gIHRoaXMuc2VsZWN0ZWRNZXRob2QgPSBrby5vYnNlcnZhYmxlKCcnKTtcclxuICB0aGlzLnNlbGVjdGVkUGFyYW1zID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcclxuXHR0aGlzLnJlcXVlc3RzID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcclxuXHJcblx0Ly8gY29tcHV0ZWRcclxuICB0aGlzLlVSTCA9IGtvLmNvbXB1dGVkKHRoaXMuZ2V0VXJsLCB0aGlzKTtcclxuICB0aGlzLnNlbmRCdXR0b25UZXh0ID0ga28ucHVyZUNvbXB1dGVkKHRoaXMuZ2V0TWV0aG9kTmFtZSwgdGhpcyk7XHJcblxyXG4gIC8vIHN1Yi1tb2RlbHNcclxuICB0aGlzLm1lbnUgPSBuZXcgTWVudVZpZXdNb2RlbChiYXNlLCB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkpO1xyXG4gIHRoaXMubWV0aG9kcyA9IG5ldyBNZXRob2RzVmlld01vZGVsKGJhc2UsIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSwgdGhpcy5zZWxlY3RlZE1ldGhvZCk7XHJcbiAgdGhpcy5wYXJhbXMgPSBuZXcgUGFyYW1zVmlld01vZGVsKGJhc2UsIHRoaXMuc2VsZWN0ZWRNZXRob2QsIHRoaXMuc2VsZWN0ZWRQYXJhbXMpO1xyXG4gIHRoaXMucmVxdWVzdHNMaXN0ID0gbmV3IFJlcXVlc3RzTGlzdFZpZXdNb2RlbCh0aGlzLnJlcXVlc3RzLCB0aGlzLnNlbGVjdGVkUGFyYW1zKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNlbmQgcmVxdWVzdCBtZXRob2RcclxuICovXHJcbkFwcFZpZXdNb2RlbC5wcm90b3R5cGUub25DbGlja1NlbmRCdG4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgYWpheFNlcnZpY2UodGhpcy5VUkwoKSwgdGhpcy5yZXF1ZXN0cywgYmFzZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyBjdXJyZW50IG1ldGhvZCBuYW1lXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5BcHBWaWV3TW9kZWwucHJvdG90eXBlLmdldE1ldGhvZE5hbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRNZXRob2QoKS5tZXRob2QudG9Mb3dlckNhc2UoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHJhdyB1cmwgZGF0YSBhcnJheVxyXG4gKiBAcmV0dXJucyB7KltdfVxyXG4gKi9cclxuQXBwVmlld01vZGVsLnByb3RvdHlwZS5nZXRVcmwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIFtcclxuICAgIHRoaXMuc2VsZWN0ZWRNZXRob2QoKSxcclxuICAgIHRoaXMuYXBpS2V5LFxyXG4gICAgdGhpcy5zZWxlY3RlZFBhcmFtcygpXHJcbiAgXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIGRlZXAgcHJvcFxyXG4gKiBAcmV0dXJucyB7KltdfVxyXG4gKi9cclxuT2JqZWN0LmdldFByb3AgPSBmdW5jdGlvbihvLCBzKSB7XHJcblx0aWYgKHR5cGVvZiBvICE9PSAnb2JqZWN0JyB8fCAhcykge1xyXG5cdFx0Y29uc29sZS5sb2cobyxzKTtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0cyA9IHMucmVwbGFjZSgvXFxbKFxcdyspXFxdL2csICcuJDEnKTsgLy8gY29udmVydCBpbmRleGVzIHRvIHByb3BlcnRpZXNcclxuXHRzID0gcy5yZXBsYWNlKC9eXFwuLywgJycpOyAgICAgICAgICAgLy8gc3RyaXAgYSBsZWFkaW5nIGRvdFxyXG5cdHZhciBhID0gcy5zcGxpdCgnLicpO1xyXG5cdGZvciAodmFyIGkgPSAwLCBuID0gYS5sZW5ndGg7IGkgPCBuOyArK2kpIHtcclxuXHRcdHZhciBrID0gYVtpXTtcclxuXHRcdGlmIChrIGluIG8pIHtcclxuXHRcdFx0byA9IG9ba107XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBvO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFjdGl2YXRlcyBrbm9ja291dC5qc1xyXG4gKi9cclxua28uYXBwbHlCaW5kaW5ncyhuZXcgQXBwVmlld01vZGVsKGJhc2UpKTtcclxuXHJcbi8qKlxyXG4gKiBleHBvcnRzIGdsb2JhbCB2YXJpYWJsZVxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBiYXNlO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9tYWluLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiIG1vZHVsZS5leHBvcnRzID0ga28uYmluZGluZ0hhbmRsZXJzLmZvcmVhY2hwcm9wID0ge1xyXG5cclxuXHR0cmFuc2Zvcm1PYmplY3Q6IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuXHRcdHZhciBwcm9wZXJ0aWVzID0gW107XHJcblx0XHR2YXIgb2JqLCBzb3J0Rm4gPSBwYXJhbXMuc29ydEZuO1xyXG5cclxuXHRcdGlmIChzb3J0Rm4pIHtcclxuXHRcdFx0b2JqID0gcGFyYW1zLmRhdGE7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRvYmogPSBwYXJhbXM7XHJcblx0XHR9XHJcblxyXG5cdFx0a28udXRpbHMub2JqZWN0Rm9yRWFjaChvYmosIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcblx0XHRcdHByb3BlcnRpZXMucHVzaCh7XHJcblx0XHRcdFx0a2V5OiBrZXksXHJcblx0XHRcdFx0dmFsdWU6IHZhbHVlXHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKHNvcnRGbikge1xyXG5cdFx0XHRwcm9wZXJ0aWVzLnNvcnQoc29ydEZuKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcHJvcGVydGllcztcclxuXHR9LFxyXG5cdGluaXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IsIGFsbEJpbmRpbmdzQWNjZXNzb3IsIHZpZXdNb2RlbCwgYmluZGluZ0NvbnRleHQpIHtcclxuXHRcdHZhciBwcm9wZXJ0aWVzID0ga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIG9iaiA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUodmFsdWVBY2Nlc3NvcigpKTtcclxuXHRcdFx0cmV0dXJuIGtvLmJpbmRpbmdIYW5kbGVycy5mb3JlYWNocHJvcC50cmFuc2Zvcm1PYmplY3Qob2JqKTtcclxuXHRcdH0pO1xyXG5cdFx0a28uYXBwbHlCaW5kaW5nc1RvTm9kZShlbGVtZW50LCB7XHJcblx0XHRcdGZvcmVhY2g6IHByb3BlcnRpZXNcclxuXHRcdH0sIGJpbmRpbmdDb250ZXh0KTtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGNvbnRyb2xzRGVzY2VuZGFudEJpbmRpbmdzOiB0cnVlXHJcblx0XHR9O1xyXG5cdH1cclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2N1c3RvbUJpbmRpbmdzL2ZvcmVhY2hQcm9wLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGJhc2UgPSB7fTtcclxudmFyIENPTkZJR19VUkwgPSAnLi4vLi4vYXBpZGVzY3JpcHRpb24ueG1sJztcclxuXHJcbnZhciBwYXJzZURhdGEgPSBmdW5jdGlvbiAoeG1sKSB7XHJcblx0dmFyIGdsb2JhbCA9IHt9O1xyXG5cdC8vZ2V0IGFsbCBBUElzXHJcblx0dmFyIHJlc291cmNlc0VsID0gJCh4bWwpLmZpbmQoXCJyZXNvdXJjZXNcIikuZXEoMCk7XHJcblxyXG5cdC8vIHJlc291cmNlXHJcblx0JCh4bWwpXHJcblx0XHQuZmluZChcInJlc291cmNlXCIpXHJcblx0XHQuZ2V0KClcclxuXHRcdC5tYXAoZnVuY3Rpb24gKHJlcykge1xyXG5cdFx0XHR2YXIgcmVzb3VyY2UgPSAkKHJlcyk7XHJcblx0XHRcdC8vIG1ldGhvZCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHR2YXIgbWV0aG9kRWxlbSA9IHJlc291cmNlLmZpbmQoXCJtZXRob2RcIikuZXEoMCk7XHJcblxyXG5cdFx0XHR2YXIgbWV0aG9kID0ge1xyXG5cdFx0XHRcdGlkIDogbWV0aG9kRWxlbS5hdHRyKFwiaWRcIiksIC8vIG1ldGhvZCBpZFxyXG5cdFx0XHRcdG5hbWUgOiBtZXRob2RFbGVtLmF0dHIoXCJhcGlnZWU6ZGlzcGxheU5hbWVcIikgfHwgbWV0aG9kRWxlbS5hdHRyKFwiaWRcIiksIC8vIG1ldGhvZCBuYW1lXHJcblx0XHRcdFx0bWV0aG9kIDogbWV0aG9kRWxlbS5hdHRyKCduYW1lJyksIC8vIEdFVCBvciBQT1NUXHJcblx0XHRcdFx0Y2F0ZWdvcnkgOiBtZXRob2RFbGVtLmZpbmQoJ1twcmltYXJ5PVwidHJ1ZVwiXScpLnRleHQoKS50cmltKCksIC8vIEFQSSBuYW1lXHJcblx0XHRcdFx0cGF0aDogcmVzb3VyY2UuYXR0cigncGF0aCcpLCAvLyBtZXRob2QgVVJMXHJcblx0XHRcdFx0YmFzZSA6IHJlc291cmNlc0VsLmF0dHIoJ2Jhc2UnKSwgLy8gbWV0aG9kIGJhc2UgbGlua1xyXG5cdFx0XHRcdGxpbmsgOiBtZXRob2RFbGVtLmZpbmQoJ2RvYycpLmVxKDApLmF0dHIoJ2FwaWdlZTp1cmwnKSwgLy8gbGluayB0byBkb2N1bWVudGF0aW9uXHJcblx0XHRcdFx0ZGVzY3JpcHRpb24gOiBtZXRob2RFbGVtLmZpbmQoJ2RvYycpLmVxKDApLnRleHQoKS50cmltKCksIC8vbWV0aG9kIGRlc2NyaXB0aW9uXHJcblx0XHRcdFx0cGFyYW1ldGVyczoge31cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8vIHBhcmFtcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHRyZXNvdXJjZVxyXG5cdFx0XHRcdC5maW5kKCdwYXJhbScpXHJcblx0XHRcdFx0LmdldCgpXHJcblx0XHRcdFx0Lm1hcChmdW5jdGlvbiAocGFyKSB7XHJcblx0XHRcdFx0XHR2YXIgcGFyYW0gPSAkKHBhcik7XHJcblx0XHRcdFx0XHR2YXIgb3B0aW9ucyA9IHBhcmFtLmZpbmQoJ29wdGlvbicpO1xyXG5cdFx0XHRcdFx0dmFyIGlzU2VsZWN0ID0gISFvcHRpb25zLmxlbmd0aDtcclxuXHJcblx0XHRcdFx0XHR2YXIgcGFyYW1ldGVyID0ge1xyXG5cdFx0XHRcdFx0XHRuYW1lOiBwYXJhbS5hdHRyKCduYW1lJyksXHJcblx0XHRcdFx0XHRcdGRvYzogcGFyYW0uZmlyc3QoJ2RvYycpLnRleHQoKS50cmltKCksXHJcblx0XHRcdFx0XHRcdHN0eWxlOiBwYXJhbS5hdHRyKCdzdHlsZScpLFxyXG5cdFx0XHRcdFx0XHRyZXF1aXJlZDogcGFyYW0uYXR0cigncmVxdWlyZWQnKSxcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogcGFyYW0uYXR0cignZGVmYXVsdCcpID09PSAnbm9uZScgJiYgaXNTZWxlY3QgPyAnJyA6IHBhcmFtLmF0dHIoJ2RlZmF1bHQnKSxcclxuXHRcdFx0XHRcdFx0c2VsZWN0OiBpc1NlbGVjdFxyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRpZiAoaXNTZWxlY3QpIHtcclxuXHRcdFx0XHRcdFx0cGFyYW1ldGVyLm9wdGlvbnMgPSBvcHRpb25zLmdldCgpLm1hcChmdW5jdGlvbiAob3B0aW9uKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0XHRcdG5hbWU6ICQob3B0aW9uKS5hdHRyKCd2YWx1ZScpLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y2hlY2tlZDogJChvcHRpb24pLmF0dHIoJ3ZhbHVlJykgPT09IHBhcmFtZXRlci5kZWZhdWx0IHx8ICQob3B0aW9uKS5hdHRyKCd2YWx1ZScpID09PSAnbm9uZScsXHJcblx0XHRcdFx0XHRcdFx0XHRsaW5rOiBmYWxzZVxyXG5cdFx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdG1ldGhvZC5wYXJhbWV0ZXJzW3BhcmFtZXRlci5uYW1lXSA9IHBhcmFtZXRlcjtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdC8qKlxyXG5cdFx0XHQgKiBHbG9iYWwgb2JqIGNvbXBvc2l0aW9uXHJcbiAgICAgICAqL1xyXG5cdFx0XHQvLyBzZXQgY2F0ZWdvcnkgb2JqXHJcblx0XHRcdGdsb2JhbFttZXRob2QuY2F0ZWdvcnldID0gZ2xvYmFsW21ldGhvZC5jYXRlZ29yeV0gfHwge307XHJcblxyXG5cdFx0XHQvLyBzZXQgbWV0aG9kcyB0eXBlIG9ialxyXG5cdFx0XHRnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XS5BTEwgPSBnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XS5BTEwgfHwge307XHJcblx0XHRcdGdsb2JhbFttZXRob2QuY2F0ZWdvcnldW21ldGhvZC5tZXRob2RdID0gZ2xvYmFsW21ldGhvZC5jYXRlZ29yeV1bbWV0aG9kLm1ldGhvZF0gfHwge307XHJcblxyXG5cdFx0XHQvLyBzZXQgbWV0aG9kIG9ialxyXG5cdFx0XHRnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XS5BTExbbWV0aG9kLmlkXSA9IG1ldGhvZDtcclxuXHRcdFx0Z2xvYmFsW21ldGhvZC5jYXRlZ29yeV1bbWV0aG9kLm1ldGhvZF1bbWV0aG9kLmlkXSA9IG1ldGhvZDtcclxuXHRcdH0pO1xyXG5cclxuXHRyZXR1cm4gZ2xvYmFsO1xyXG59O1xyXG5cclxuLy9nZXRzIGRvY3VtZW50IGZyb20gV0FETCBjb25maWd1cmF0aW9uIGZpbGVcclxudmFyIHJlYWRGcm9tV0FETCA9IGZ1bmN0aW9uICgpIHtcclxuICAkLmFqYXgoe1xyXG4gICAgdXJsOiBDT05GSUdfVVJMLFxyXG4gICAgYXN5bmMgOiBmYWxzZSxcclxuICAgIGRhdGFUeXBlOiAoJC5icm93c2VyLm1zaWUpID8gXCJ0ZXh0XCIgOiBcInhtbFwiLFxyXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgdmFyIHhtbDtcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UgPT0gXCJzdHJpbmdcIil7XHJcbiAgICAgICAgeG1sID0gbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MRE9NXCIpO1xyXG4gICAgICAgIHhtbC5hc3luYyA9IGZhbHNlO1xyXG4gICAgICAgIHhtbC5sb2FkWE1MKHJlc3BvbnNlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB4bWwgPSByZXNwb25zZTtcclxuICAgICAgfVxyXG5cclxuXHRcdFx0YmFzZSA9IHBhcnNlRGF0YSh4bWwpO1xyXG4gICAgfSxcclxuXHJcbiAgICBlcnJvcjogZnVuY3Rpb24oWE1MSHR0cFJlcXVlc3QsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKXtcclxuICAgICAgYWxlcnQoJ0RhdGEgQ291bGQgTm90IEJlIExvYWRlZCAtICcrIHRleHRTdGF0dXMpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59O1xyXG5yZWFkRnJvbVdBREwoKTtcclxubW9kdWxlLmV4cG9ydHMgPSBiYXNlO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvbW9kdWxlcy9iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGFwaUtleSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3RrLWFwaS1rZXknKSB8fCBhcGlLZXlTZXJ2aWNlLmdldEFwaUV4cGxvcmVLZXkoKTsgLy9BUEkgS2V5XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBuYW1lOiAnYXBpa2V5JyxcclxuICBzdHlsZTogJ3F1ZXJ5JyxcclxuICB2YWx1ZToga28ub2JzZXJ2YWJsZShhcGlLZXkpXHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9tb2R1bGVzL2FwaWtleS5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxyXG4gKiBBamF4IFNlcnZpY2VcclxuICogQHBhcmFtIHVybFxyXG4gKiBAcGFyYW0gbWV0aG9kXHJcbiAqIEBwYXJhbSBjYWxsYmFja1xyXG4gKi9cclxudmFyIGFqYXhTZXJ2aWNlID0gZnVuY3Rpb24gKHVybCwgbWV0aG9kLCBjYWxsYmFjaykge1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBtZXRob2QsXHJcbiAgICB1cmw6IHVybCxcclxuICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgY29tcGxldGU6IGNhbGxiYWNrXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogRmlsdGVycyBhbmQgcHJlcGFyZXMgcGFyYW1zIHBhaXJzXHJcbiAqIEBwYXJhbSBhcnJcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG52YXIgcHJlcGFyZVVybCA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICB2YXIgcmVwbGFjZW1lbnQsIHVybCwgZG9tYWluLCBwYXRoLCBtZXRob2QsIGFwaUtleSwgcGFyYW1zO1xyXG5cclxuICBpZiAoIWFyciAmJiAhYXJyLmxlbmd0aCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBcclxuICBkb21haW4gPSBhcnJbMF0uYmFzZTtcclxuICBwYXRoID0gYXJyWzBdLnBhdGg7XHJcbiAgYXBpS2V5ID0gYXJyWzFdO1xyXG4gIHBhcmFtcyA9IGFyclsyXS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgIHJldHVybiBpdGVtLnN0eWxlID09PSAncXVlcnknO1xyXG4gIH0pO1xyXG5cclxuICAvLyBhcnIgb2YgdGVtcGxhdGUgbWFya3NcclxuICByZXBsYWNlbWVudCA9IHBhdGgubWF0Y2goLyhbXntdKj8pXFx3KD89XFx9KS9nbWkpO1xyXG5cclxuICAvLyBhcnIgb2YgdGVtcGxhdGUgcGFyYW1zXHJcbiAgdmFyIHRlbXBsYXRlc0FyciA9IGFyclsyXS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgIHJldHVybiBpdGVtLnN0eWxlID09PSAndGVtcGxhdGUnO1xyXG4gIH0pO1xyXG5cclxuICAvLyByZXBsYWNlbWVudFxyXG4gIHJlcGxhY2VtZW50LmZvckVhY2goZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgdmFyIHBhcmFtID0gdGVtcGxhdGVzQXJyLmZpbmQoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgcmV0dXJuIGl0ZW0ubmFtZSA9PT0gdmFsO1xyXG4gICAgfSk7XHJcbiAgICBwYXRoID0gcGF0aC5yZXBsYWNlKCd7JysgcGFyYW0ubmFtZSArICd9JywgcGFyYW0udmFsdWUoKSB8fCBwYXJhbS5kZWZhdWx0KTtcclxuICB9KTtcclxuXHJcbiAgLy8gYWRkcyBhcGlLZXkgcGFyYW1cclxuICBpZiAoIXBhcmFtc1swXSB8fCBwYXJhbXNbMF0ubmFtZSAhPT0gJ2FwaWtleScpIHtcclxuICAgIHBhcmFtcy51bnNoaWZ0KGFwaUtleSk7XHJcbiAgfVxyXG5cclxuICAvLyBwcmVwYXJlcyBwYXJhbXMgcGFydCBvZiB1cmxcclxuICBwYXJhbXMgPSBwYXJhbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgIHJldHVybiBbaXRlbS5uYW1lLCBpdGVtLnZhbHVlKCkgfHwgaXRlbS5kZWZhdWx0XS5qb2luKCc9Jyk7XHJcbiAgICB9KS5qb2luKCcmJyk7XHJcblxyXG4gIHVybCA9IFtkb21haW4sICcvJywgcGF0aCwgJz8nLCBwYXJhbXNdLmpvaW4oJycpO1xyXG5cclxuICByZXR1cm4gZW5jb2RlVVJJKHVybCk7XHJcbn07XHJcblxyXG4vLyBzZW5kcyByZXF1ZXN0IHRvIGdldCB0aGUgc2Vjb25kIGNvbHVtblxyXG52YXIgc2VuZFByaW1hcnlSZXF1ZXN0ID0gZnVuY3Rpb24gKGFyciwgcmVxdWVzdHMsIGdsb2JhbCkge1xyXG4gIHZhciB1cmwgPSBwcmVwYXJlVXJsKGFycik7XHJcblxyXG4gIGFqYXhTZXJ2aWNlKHVybCwgYXJyWzBdLm1ldGhvZCwgZnVuY3Rpb24ocmVzLCBtc2cpIHtcclxuXHRcdHZhciByZXNPYmogPSB7XHJcblx0XHRcdHJlcTogdXJsLFxyXG5cdFx0XHRpbmRleDogcmVxdWVzdHMoKS5sZW5ndGhcclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKG1zZyA9PSAnZXJyb3InKSB7XHJcblx0XHRcdHZhciBlcnIgPSByZXMgJiZcclxuXHRcdFx0XHRyZXMucmVzcG9uc2VKU09OICYmXHJcblx0XHRcdFx0cmVzLnJlc3BvbnNlSlNPTi5lcnJvcnMgJiZcclxuXHRcdFx0XHRyZXMucmVzcG9uc2VKU09OLmVycm9yc1swXTtcclxuXHJcblx0XHRcdHJlc09iai5lcnJvciA9IHtcclxuXHRcdFx0XHRjb2RlOiBlcnIgPyBlcnIuY29kZTogNTAwLFxyXG5cdFx0XHRcdG1lc3NhZ2U6IGVyciA/IGVyci5kZXRhaWw6ICdObyByZXNwb25jZSBkYXRhISdcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Z2xvYmFsLmxhc3RSZXNwb25zZSA9IHJlc09iai5yZXMgPSB7XHJcblx0XHRcdFx0aWQ6IGFyclswXS5pZCwgLy8gbWV0aG9kIGlkIHdhcyB1c2VkXHJcblx0XHRcdFx0cmVzOiByZXMucmVzcG9uc2VKU09OIC8vIHJlc3BvbnNlXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gZXhwb3J0aW5nIGRhdGEgdXNpbmcgb2JzZXJ2YWJsZVxyXG5cdFx0cmVxdWVzdHMudW5zaGlmdChyZXNPYmopO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc2VuZFByaW1hcnlSZXF1ZXN0O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvbW9kdWxlcy9hamF4U2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBoZiA9IHJlcXVpcmUoJy4uL21vZHVsZXMvaGVscGVyRnVuYycpO1xyXG52YXIgc2VsZjtcclxuXHJcblxyXG4vKipcclxuICogTWVudSBWaWV3LU1vZGVsXHJcbiAqIEBwYXJhbSBiYXNlXHJcbiAqIEBwYXJhbSBjYXRlZ29yeVxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIE1lbnVWaWV3TW9kZWwoYmFzZSwgY2F0ZWdvcnkpIHtcclxuICBzZWxmID0gdGhpcztcclxuICB0aGlzLmNhdGVnb3J5ID0gY2F0ZWdvcnk7XHJcbiAgdGhpcy5jYXRlZ29yaWVzID0ga28ub2JzZXJ2YWJsZUFycmF5KE9iamVjdC5rZXlzKGJhc2UpLm1hcChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNoZWNrZWQ6IGtvLm9ic2VydmFibGUoIWluZGV4KSxcclxuICAgICAgbmFtZTogaXRlbSxcclxuICAgICAgbGluazogZmFsc2VcclxuICAgIH1cclxuICB9KSk7XHJcblxyXG4gIC8vIGluaXRpYWwgbG9hZFxyXG4gIHRoaXMuc2VsZWN0Q2F0ZWdvcnkodGhpcy5jYXRlZ29yaWVzKClbMF0pO1xyXG59XHJcblxyXG4vKipcclxuICogTWVudSBWaWV3LU1vZGVsIG1ldGhvZFxyXG4gKiBAcGFyYW0gY2F0ZWdvcnlcclxuICovXHJcbk1lbnVWaWV3TW9kZWwucHJvdG90eXBlLnNlbGVjdENhdGVnb3J5ID0gZnVuY3Rpb24gKGNhdGVnb3J5KSB7XHJcbiAgdmFyIGNhdGVnb3J5TmFtZSA9IGNhdGVnb3J5Lm5hbWU7XHJcbiAgc2VsZi5jYXRlZ29yeShjYXRlZ29yeU5hbWUpO1xyXG4gIGhmLmNoZWNrQWN0aXZlKHNlbGYuY2F0ZWdvcmllcywgY2F0ZWdvcnlOYW1lKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTWVudVZpZXdNb2RlbDtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL1ZpZXdNb2RlbHMvbWVudVZpZXdNb2RlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMuZ2V0TW9kZWxBcnJheSA9IGZ1bmN0aW9uIGdldE1vZGVsQXJyYXkocGFyYW1zKSB7XHJcbiAgICB2YXIgb2JqID0gcGFyYW1zLm9iaiB8fCB7fSxcclxuICAgICAgICBhcnIgPSBwYXJhbXMuYXJyIHx8IFtdLFxyXG4gICAgICAgIHByb3AgPSBwYXJhbXMucHJvcCB8fCAnbmFtZSc7XHJcblxyXG4gICAgZm9yICh2YXIgaSBpbiBvYmopIHtcclxuICAgICAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShpKSkgeyBjb250aW51ZTsgfVxyXG5cclxuICAgICAgICB2YXIgaXRlbSA9IGFyci5maW5kKGZ1bmN0aW9uIChtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbTEubmFtZSA9PT0gb2JqW2ldW3Byb3BdO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoaXRlbSkgeyBjb250aW51ZTsgfVxyXG5cclxuICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgIGNoZWNrZWQ6IGtvLm9ic2VydmFibGUoZmFsc2UpLFxyXG4gICAgICAgICAgICBuYW1lOiBvYmpbaV1bcHJvcF1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBhcnI7XHJcbn07XHJcblxyXG5leHBvcnRzLmNoZWNrQWN0aXZlID0gZnVuY3Rpb24gY2hlY2tBY3RpdmUoa29BcnIsIGFjdGl2ZUVsZW0pIHtcclxuICAgIGlmICgha29BcnIgJiYgIWFjdGl2ZUVsZW0pIHtyZXR1cm4gZmFsc2U7fVxyXG5cclxuICAgIGtvQXJyKGtvQXJyKCkubWFwKGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICBpZiAob2JqLm5hbWUgPT09IGFjdGl2ZUVsZW0pIHtcclxuICAgICAgICAgICAgb2JqLmNoZWNrZWQodHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb2JqLmNoZWNrZWQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfSkpO1xyXG59O1xyXG5cclxuZXhwb3J0cy5pdGVyYXRlID0gZnVuY3Rpb24gKG9iaikge1xyXG5cdGZvciAodmFyIHByb3BlcnR5IGluIG9iaikge1xyXG5cdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBvYmpbcHJvcGVydHldID09IFwib2JqZWN0XCIpIHtcclxuXHRcdFx0XHRpdGVyYXRlKG9ialtwcm9wZXJ0eV0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCd8JyArIHByb3BlcnR5ICsgXCIgfCAgXCIgKyBvYmpbcHJvcGVydHldICsgJ3wnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9tb2R1bGVzL2hlbHBlckZ1bmMuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcclxudmFyIGJhc2U7XHJcbnZhciBoZiA9IHJlcXVpcmUoJy4uL21vZHVsZXMvaGVscGVyRnVuYycpO1xyXG4vKipcclxuICogUGFyYW1zIFZpZXctTW9kZWxcclxuICogQHBhcmFtIHJhd1xyXG4gKiBAcGFyYW0gbWV0aG9kXHJcbiAqIEBwYXJhbSBwYXJhbXNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBQYXJhbXNWaWV3TW9kZWwocmF3LCBtZXRob2QsIHBhcmFtcykge1xyXG4gIGJhc2UgPSByYXc7XHJcbiAgc2VsZiA9IHRoaXM7XHJcbiAgdGhpcy5hbmltYXRpb25TcGVlZCA9IDIwMDtcclxuXHJcbiAgLy8gb2JzZXJ2YWJsZXNcclxuICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcclxuICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcclxuICB0aGlzLmlzSGlkZGVuID0ga28ub2JzZXJ2YWJsZSh0cnVlKTtcclxuICB0aGlzLnBhcmFtSW5Gb2N1cyA9IGtvLm9ic2VydmFibGUoJycpO1xyXG5cdHRoaXMucGFyYW1zTW9kZWwgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xyXG5cclxuXHQvLyBjb21wdXRlZFxyXG5cdC8vIHRoaXMucGFyYW1zTW9kZWwgPSBrby5jb21wdXRlZCh0aGlzLnVwZGF0ZVBhcmFtc01vZGVsLCB0aGlzKTtcclxuXHR0aGlzLnVwZGF0ZVZpZXdNb2RlbCgpO1xyXG5cdHRoaXMubWV0aG9kLnN1YnNjcmliZSh0aGlzLnVwZGF0ZVZpZXdNb2RlbCwgdGhpcyk7XHJcblxyXG5cdHRoaXMuaXNEaXJ0eSA9IGtvLmNvbXB1dGVkKHRoaXMuY2hlY2tEaXJ0eSwgdGhpcyk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogSW5pdGlhbCBidWlsZCBvZiBTZWxlY3QgTW9kZWxcclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUudXBkYXRlVmlld01vZGVsID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciBvYmogPSB0aGlzLm1ldGhvZCgpLnBhcmFtZXRlcnMgfHwge30sXHJcblx0XHRhcnIgPSBbXTtcclxuXHJcblx0Zm9yICh2YXIgaSBpbiBvYmopIHtcclxuXHRcdGlmICghb2JqLmhhc093blByb3BlcnR5KGkpKSB7Y29udGludWU7fVxyXG5cclxuXHRcdC8vIGNvcGllcyBhbGwgdmFsdWVzIGZyb20gbW9kZWwgdG8gdmlldy1tb2RlbFxyXG5cdFx0dmFyIHZtUGFyYW0gPSAkLmV4dGVuZCh7fSwgb2JqW2ldKTtcclxuXHJcblx0XHR2bVBhcmFtLnZhbHVlID0ga28ub2JzZXJ2YWJsZSh2bVBhcmFtLnZhbHVlIHx8ICh2bVBhcmFtLnNlbGVjdCAmJiB2bVBhcmFtLmRlZmF1bHQpIHx8ICcnKTtcclxuXHJcblx0XHQvL2FkZCBvYnNlcnZhYmxlIGZvciBzZWxlY3RlZCBvcHRpb25zXHJcblx0XHRpZiAodm1QYXJhbS5zZWxlY3QpIHtcclxuXHRcdFx0dm1QYXJhbS5vcHRpb25zID0ga28ub2JzZXJ2YWJsZUFycmF5KG9ialtpXS5vcHRpb25zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG5cdFx0XHRcdHZhciBvYmogPSAkLmV4dGVuZCh7fSwgaXRlbSk7XHJcblx0XHRcdFx0b2JqLmNoZWNrZWQgPSBrby5vYnNlcnZhYmxlKGl0ZW0uY2hlY2tlZCk7XHJcblx0XHRcdFx0cmV0dXJuIG9iajtcclxuXHRcdFx0fSkpXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gJ2RpcnR5JyBmbGFnIHdhdGNoZXIgZm9yIGN1cnJlbnQgZmllbGRcclxuXHRcdHZtUGFyYW0uaXNEaXJ0eSA9IGtvLnB1cmVDb21wdXRlZChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh0aGlzLnNlbGVjdCkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnZhbHVlKCkgIT09IHRoaXMuZGVmYXVsdCAmJiB0aGlzLnZhbHVlKCkgIT09ICdub25lJztcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gISEodGhpcy52YWx1ZSgpLnRvU3RyaW5nKCkpLnRyaW0oKS5sZW5ndGg7XHJcblx0XHR9LCB2bVBhcmFtKTtcclxuXHJcblx0XHQvLyBhZGQgY2FsZW5kYXIgYnRuIGZvciBjdXJyZW50IGZpZWxkXHJcblx0XHR2bVBhcmFtLmhhc0NhbGVuZGFyID0gaS5zZWFyY2goLyhkYXRlfHRpbWUpL2dtaSkgIT0gLTE7XHJcblxyXG5cdFx0Ly8gYWRkIHBvcC11cCBidG4gZm9yIGN1cnJlbnQgZmllbGRcclxuXHRcdHZtUGFyYW0uaGFzUG9wVXAgPSBpLnNlYXJjaCgvKGF0dHJhY3Rpb25JZHx2ZW51ZUlkKS9nbWkpICE9IC0xO1xyXG5cclxuXHRcdGFyci5wdXNoKHZtUGFyYW0pO1xyXG5cdH1cclxuXHJcblx0Ly8gcHJlcGFyZSBvdXRwdXQgZm9yIHJlcXVlc3RcclxuXHR0aGlzLnBhcmFtc01vZGVsKGFycik7XHJcblx0dGhpcy5wYXJhbUluRm9jdXModGhpcy5wYXJhbXNNb2RlbCgpWzBdKTtcclxuXHR0aGlzLnByZXBhcmVVcmxQYWlycyhhcnIsIHRoaXMucGFyYW1zKTtcclxuXHRyZXR1cm4gYXJyO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERpcnR5IHBhcmFtcyBmb3JtIG9ic2VydmFibGUgbWV0aG9kXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5jaGVja0RpcnR5ID0gZnVuY3Rpb24gKCkge1xyXG5cdHRoaXMucHJlcGFyZVVybFBhaXJzKHRoaXMucGFyYW1zTW9kZWwoKSwgdGhpcy5wYXJhbXMpO1xyXG5cdHZhciBkaXJ0eSA9IHRoaXMucGFyYW1zTW9kZWwoKS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdHJldHVybiBpdGVtLmlzRGlydHkoKSA9PT0gdHJ1ZTtcclxuXHR9KTtcclxuXHRyZXR1cm4gZGlydHkubGVuZ3RoID4gMDtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogRW50ZXIga2V5IGhhbmRsZXJcclxuICogQHBhcmFtIG1vZGVsXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5vbkVudGVyS2V5RG93biA9IGZ1bmN0aW9uIChtb2RlbCwgZXZlbnQpIHtcclxuICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICQoJyNhcGktZXhwLWdldC1idG4nKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogU2xpZGUgdG9nZ2xlIGZvciBwYXJhbXMgY29udGFpbmVyIG1ldGhvZFxyXG4gKiBAcGFyYW0gdmlld01vZGVsXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5zbGlkZVRvZ2dsZSA9IGZ1bmN0aW9uICh2aWV3TW9kZWwsIGV2ZW50KSB7XHJcbiAgJChldmVudC5jdXJyZW50VGFyZ2V0KVxyXG4gICAgLnBhcmVudHMoJy5qcy1zbGlkZS1jb250cm9sJylcclxuICAgIC5maW5kKCcuanMtc2xpZGUtd3JhcHBlcicpXHJcbiAgICAuc2xpZGVUb2dnbGUodmlld01vZGVsLmFuaW1hdGlvblNwZWVkLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZpZXdNb2RlbC5pc0hpZGRlbighdmlld01vZGVsLmlzSGlkZGVuKCkpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogTWFjaGVzIGZvY3VzZWQgcGFyYW1cclxuICogQHBhcmFtIGl0ZW1cclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUub25Gb2N1cyA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgc2VsZi5wYXJhbUluRm9jdXMoaXRlbSk7XHJcbn07XHJcblxyXG4vKipcclxuICogRmlsdGVycyBwYXJhbXMgYnkgZGVmaW5lZCB2YWx1ZVxyXG4gKiBAcGFyYW0gYXJyXHJcbiAqIEBwYXJhbSBrb09ic1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUucHJlcGFyZVVybFBhaXJzID0gZnVuY3Rpb24gKGFyciwga29PYnMpIHtcclxuICBpZiAoIWFyciAmJiAha29PYnMpIHtyZXR1cm4gZmFsc2U7fVxyXG5cclxuICByZXR1cm4ga29PYnMoYXJyLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgcmV0dXJuIChpdGVtLnZhbHVlKCkgfHwgaXRlbS5kZWZhdWx0KTtcclxuICB9KSk7XHJcbn07XHJcblxyXG4vKipcclxuICogT24gc2VsZWN0IHZhbHVlIGhhbmRsZXIgZm9yIHBhcmFtcyBzZWxlY3RcclxuICogQHBhcmFtIHBhcmFtIHtvYmplY3R9IHBhcmFtZXRlciB2aWV3LW1vZGVsXHJcbiAqIEBwYXJhbSBvcHRpb24ge29iamVjdH0gb3B0aW9uIHZpZXctbW9kZWxcclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUub25TZWxlY3RQYXJhbVZhbHVlID0gZnVuY3Rpb24gKHBhcmFtLCBvcHRpb24pIHtcclxuXHRoZi5jaGVja0FjdGl2ZShwYXJhbS5vcHRpb25zLCBvcHRpb24ubmFtZSk7XHJcblx0cGFyYW0udmFsdWUob3B0aW9uLm5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFBhcmFtcyBjbGVhciBidXR0b24gaGFuZGxlclxyXG4gKiBAcGFyYW0gdm0ge29iamVjdH0gdmlldyBtb2RlbFxyXG4gKiBAcGFyYW0gZSB7b2JqZWN0fSBldmVudFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5vblBhcmFtc0NsZWFyID0gZnVuY3Rpb24gKHZtLCBlKSB7XHJcblx0dGhpcy51cGRhdGVWaWV3TW9kZWwoKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGFyYW1zVmlld01vZGVsO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9wYXJhbXNWaWV3TW9kZWwuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgaGYgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2hlbHBlckZ1bmMnKTtcclxudmFyIHNlbGY7XHJcbnZhciBiYXNlO1xyXG52YXIgY2F0ZWdvcnk7XHJcblxyXG4vKipcclxuICogTWV0aG9kcyBWaWV3LU1vZGVsXHJcbiAqIEBwYXJhbSByYXdcclxuICogQHBhcmFtIGNhdGVnb3J5XHJcbiAqIEBwYXJhbSBtZXRob2RcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBNZXRob2RzVmlld01vZGVsKHJhdywgY2F0ZWdvcnksIG1ldGhvZCkge1xyXG4gIHNlbGYgPSB0aGlzO1xyXG4gIGJhc2UgPSByYXc7XHJcblxyXG4gIC8vIG9ic2VydmFibGVzXHJcbiAgdGhpcy5jYXRlZ29yeSA9IGNhdGVnb3J5O1xyXG4gIHRoaXMubWV0aG9kID0gbWV0aG9kO1xyXG4gIHRoaXMudG9nZ2xlUG9wVXAgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcclxuICB0aGlzLnJhZGlvc01vZGVsID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcclxuICB0aGlzLm1ldGhvZHNWaWV3TW9kZWwgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xyXG4gIHRoaXMudXBkYXRlTW9kZWwodGhpcy5jYXRlZ29yeSgpKTtcclxuICB0aGlzLmNhdGVnb3J5LnN1YnNjcmliZSh0aGlzLnVwZGF0ZU1vZGVsLCB0aGlzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE9uIGNhdGVnb3J5IGNoYW5nZSBoYW5kbGVyXHJcbiAqIE1ldGhvZHMgVmlldy1Nb2RlbCBtZXRob2RcclxuICogQHBhcmFtIGNhdGVnb3J5XHJcbiAqL1xyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS51cGRhdGVNb2RlbCA9IGZ1bmN0aW9uIChjYXRlZ29yeSkge1xyXG4gIC8vIGluaXRpYWwgcmFkaW9zIG1vZGVsXHJcbiAgc2VsZi51cGRhdGVSYWRpb3NNb2RlbChiYXNlW2NhdGVnb3J5XSk7XHJcbiAgLy8gaW5pdGlhbCBzZWxlY3QgbW9kZWwgKGZpcnN0IG1ldGhvZCBpbiBmaXJzdCBzZWN0aW9uIGZvciBzdGFydClcclxuICBzZWxmLnVwZGF0ZVNlbGVjdChzZWxmLnJhZGlvc01vZGVsKClbMF0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE9uY2hhbmdlIGhhbmRsZXIgZm9yIFJhZGlvIGJ1dHRvbnNcclxuICogQHBhcmFtIGl0ZW1cclxuICovXHJcbk1ldGhvZHNWaWV3TW9kZWwucHJvdG90eXBlLm9uY2hhbmdlUmFkaW9zID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAvL3VwZGF0ZSBSYWRpb3MgTW9kZWxcclxuICBoZi5jaGVja0FjdGl2ZShzZWxmLnJhZGlvc01vZGVsLCBpdGVtLm5hbWUpO1xyXG4gIC8vdXBkYXRlIFNlbGVjdCBNb2RlbFxyXG4gIHNlbGYudXBkYXRlU2VsZWN0KGl0ZW0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWwgYnVpbGQgb2YgUmFkaW9zIE1vZGVsXHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAqL1xyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS51cGRhdGVSYWRpb3NNb2RlbCA9IGZ1bmN0aW9uIChwYXJhbSkge1xyXG4gIHZhciBvYmogPSBwYXJhbSB8fCB7fSxcclxuICAgIGFyciA9IFtdO1xyXG5cclxuICBmb3IgKHZhciBpIGluIG9iaikge1xyXG4gICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoaSkpIHsgY29udGludWU7IH1cclxuICAgIHZhciBpdGVtID0ge1xyXG4gICAgICBjaGVja2VkOiBrby5vYnNlcnZhYmxlKGkgPT09ICdBTEwnKSxcclxuICAgICAgbmFtZTogaVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoaSA9PT0gJ0FMTCcpIHtcclxuICAgICAgYXJyLnVuc2hpZnQoaXRlbSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFyci5wdXNoKGl0ZW0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHRhcnIgPSBhcnIuc29ydChjb21wYXJlTWV0aG9kcyk7XHJcbiAgdGhpcy5yYWRpb3NNb2RlbChhcnIpO1xyXG4gIHJldHVybiBhcnI7XHJcbn07XHJcblxyXG4vKipcclxuICogSW5pdGlhbCBidWlsZCBvZiBTZWxlY3QgTW9kZWxcclxuICogQHBhcmFtIGl0ZW1cclxuICovXHJcbk1ldGhvZHNWaWV3TW9kZWwucHJvdG90eXBlLnVwZGF0ZVNlbGVjdCA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgdmFyIG9iaiA9IGJhc2Vbc2VsZi5jYXRlZ29yeSgpXVtpdGVtLm5hbWVdfHwge30sXHJcbiAgICBhcnIgPSBbXSxcclxuICAgIGNvdW50ID0gMDtcclxuXHJcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcclxuICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGkpKSB7IGNvbnRpbnVlOyB9XHJcbiAgICB2YXIgcHJvcGVydHkgPSBvYmpbaV07XHJcblx0XHQvLyBjb3BpZXMgYWxsIHZhbHVlcyBmcm9tIG1vZGVsIHRvIHZpZXctbW9kZWxcclxuXHRcdHZhciB2bU1ldGhvZCA9ICQuZXh0ZW5kKHt9LCBwcm9wZXJ0eSk7XHJcblxyXG5cdFx0ZGVsZXRlIHZtTWV0aG9kLnBhcmFtZXRlcnM7XHJcblx0XHR2bU1ldGhvZC5jaGVja2VkID0ga28ub2JzZXJ2YWJsZSghY291bnQpO1xyXG5cclxuXHRcdGFyci5wdXNoKHZtTWV0aG9kKTtcclxuXHJcbiAgICAvLyBzZXQgZ2xvYmFsIG9ic2VydmFibGVcclxuICAgICFjb3VudCAmJiB0aGlzLm1ldGhvZChiYXNlW3Byb3BlcnR5LmNhdGVnb3J5XVtwcm9wZXJ0eS5tZXRob2RdW3Byb3BlcnR5LmlkXSk7XHJcblxyXG4gICAgY291bnQrKztcclxuXHJcbiAgfVxyXG5cclxuXHR0aGlzLm1ldGhvZHNWaWV3TW9kZWwoYXJyKTtcclxuXHRyZXR1cm4gYXJyO1xyXG59O1xyXG5cclxuTWV0aG9kc1ZpZXdNb2RlbC5wcm90b3R5cGUub25TZWxlY3RNZXRob2QgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gIGhmLmNoZWNrQWN0aXZlKHNlbGYubWV0aG9kc1ZpZXdNb2RlbCwgaXRlbS5uYW1lKTtcclxuICBzZWxmLm1ldGhvZChiYXNlW2l0ZW0uY2F0ZWdvcnldW2l0ZW0ubWV0aG9kXVtpdGVtLmlkXSk7XHJcbn07XHJcblxyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS5vbkFib3V0Q2xpY2sgPSBmdW5jdGlvbiAobW9kZWwsIGV2ZW50KSB7XHJcbiAgbW9kZWwudG9nZ2xlUG9wVXAoIW1vZGVsLnRvZ2dsZVBvcFVwKCkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNvcnQgZnVuY3Rpb24gZm9yIG1ldGhvZHMgYXJheVxyXG4gKiBAcGFyYW0gZlxyXG4gKiBAcGFyYW0gc1xyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gY29tcGFyZU1ldGhvZHMoZixzKSB7XHJcblx0dmFyIGEgPSBmLm5hbWUudG9VcHBlckNhc2UoKTtcclxuXHR2YXIgYiA9IHMubmFtZS50b1VwcGVyQ2FzZSgpO1xyXG5cclxuXHRpZiAoYSA9PT0gYikge3JldHVybiAwO31cclxuXHRpZiAoYSA9PT0gJ0FMTCcgfHxcclxuXHRcdChhID09PSAnR0VUJyAmJiAoYiA9PT0gJ1BPU1QnIHx8IGIgPT09ICdQVVQnIHx8IGIgPT09ICdERUxFVEUnKSkgfHxcclxuXHRcdChhID09PSAnUE9TVCcgJiYgKGIgPT09ICdQVVQnIHx8IGIgPT09ICdERUxFVEUnKSkgfHxcclxuXHRcdChhID09PSAnUFVUJyAmJiBiID09PSAnREVMRVRFJykpIHtcclxuXHRcdHJldHVybiAtMTtcclxuXHR9XHJcblx0cmV0dXJuIDE7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTWV0aG9kc1ZpZXdNb2RlbDtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL1ZpZXdNb2RlbHMvbWV0aG9kc1ZpZXdNb2RlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBqc29uSGlnaGxpZ2h0ID0gcmVxdWlyZSgnLi8uLi9tb2R1bGVzL2pzb24taGlnaGxpZ2h0Jyk7XHJcbnZhciBzZWxmO1xyXG52YXIgc2xpZGVyID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9zbGlkZXInKTtcclxuXHJcbmZ1bmN0aW9uIFJlcXVlc3RzTGlzdFZpZXdNb2RlbChyZXF1ZXN0cywgdXJsKSB7XHJcblx0dGhpcy51cmwgPSB1cmw7XHJcblx0c2VsZiA9IHRoaXM7XHJcblx0dGhpcy5jb2xvcnMgPSBbXHJcblx0XHQnY29sdW1uLWNvbG9yLTEnLFxyXG5cdFx0J2NvbHVtbi1jb2xvci0yJyxcclxuXHRcdCdjb2x1bW4tY29sb3ItMycsXHJcblx0XHQnY29sdW1uLWNvbG9yLTQnLFxyXG5cdFx0J2NvbHVtbi1jb2xvci01JyxcclxuXHRcdCdjb2x1bW4tY29sb3ItNicsXHJcblx0XHQnY29sdW1uLWNvbG9yLTcnLFxyXG5cdFx0J2NvbHVtbi1jb2xvci04JyxcclxuXHRcdCdjb2x1bW4tY29sb3ItOScsXHJcblx0XHQnY29sdW1uLWNvbG9yLTEwJyxcclxuXHRcdCdjb2x1bW4tY29sb3ItMTEnLFxyXG5cdFx0J2NvbHVtbi1jb2xvci0xMidcclxuXHRdO1xyXG5cdHRoaXMucmVxdWVzdHMgPSByZXF1ZXN0cztcclxuXHR0aGlzLmlzQWN0aXZlVGFiID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcblx0dGhpcy52aWV3TW9kZWwgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xyXG5cdHRoaXMuY2xlYXJCdG5Jc1Zpc2libGUgPSBrby5jb21wdXRlZCh0aGlzLl9pc1Zpc2libGUsIHRoaXMpO1xyXG5cdHRoaXMucmVxdWVzdHMuc3Vic2NyaWJlKHRoaXMudXBkYXRlTW9kZWwsIHRoaXMpO1xyXG59XHJcblxyXG4vKipcclxuICogVXBkYXRlIFZpZXdtb2RlbCBvZiByZXF1ZXN0IGxpc3RcclxuICogQHBhcmFtIGFyclxyXG4gKi9cclxuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS51cGRhdGVNb2RlbCA9IGZ1bmN0aW9uIChhcnIpIHtcclxuXHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHJcblx0dmFyIG5ld01vZGVsID0gdGhpcy5yZXF1ZXN0cygpXHJcblx0XHQubWFwKGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSAgJC5leHRlbmQoe30sIG9iaiwge1xyXG5cdFx0XHRcdGNvbG9yOiBzZWxmLmNvbG9yc1tvYmouaW5kZXggJSBzZWxmLmNvbG9ycy5sZW5ndGhdLFxyXG5cdFx0XHRcdGFjdGl2ZToga28ub2JzZXJ2YWJsZShmYWxzZSksXHJcblx0XHRcdFx0cmVzSFRNTDoga28ub2JzZXJ2YWJsZSgnJylcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiBpdGVtO1xyXG5cdFx0fSk7XHJcblx0c2xpZGVyLnJlbW92ZShzZWxmLnZpZXdNb2RlbCgpLmxlbmd0aCk7XHJcblx0c2VsZi52aWV3TW9kZWwobmV3TW9kZWwpO1xyXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0c2xpZGVyLnNldChzZWxmLnZpZXdNb2RlbCgpLmxlbmd0aCk7XHJcblx0XHQkKCcjc2hvdy1kZXRhaWxzLTAnKS50cmlnZ2VyKCdjbGljaycpO1xyXG5cdH0sIDEwKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBnZXQgZGV0YWlsc1xyXG4gKiBAcGFyYW0gZGF0YVxyXG4gKi9cclxuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5nZXRNb3JlID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuXHR2YXIgY2FyZCA9IHRoaXM7XHJcblx0dmFyIGN1cnJlbnRTbGlkZXIgPSAkKCcjc2xpZGVyLScgKyBjYXJkLnNlY3Rpb25JbmRleCk7XHJcblx0dmFyIGNvbXBvbmVudCA9ICQoJzxzZWN0aW9uIGRhdGEtYmluZD1cImNvbXBvbmVudDoge25hbWU6IFxcJ3BhbmVsLWdyb3VwXFwnLCBwYXJhbXM6IHBhcmFtc31cIj48L3NlY3Rpb24+Jyk7XHJcblx0dmFyIGN1cnNsaWNrID0gY3VycmVudFNsaWRlci5zbGljaygnZ2V0U2xpY2snKTtcclxuXHR2YXIgbmV3RGF0YSA9IHt9O1xyXG5cdFxyXG5cdC8vIGdhdGhlcmluZyBhbGwgcHJpbWl0aXZlIHByb3BzIGluIGFkZGl0aW9uYWwgcGFuZWxcclxuXHRmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xyXG5cdFx0aWYgKCFkYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuXHRcdFx0Y29udGludWU7XHJcblx0XHR9XHJcblx0XHR2YXIgdmFsID0gZGF0YVtrZXldO1xyXG5cdFx0aWYgKHR5cGVvZiB2YWwgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdG5ld0RhdGFbZGF0YS50eXBlIHx8IE9iamVjdC5rZXlzKGRhdGEpWzBdXSA9IG5ld0RhdGFbZGF0YS50eXBlIHx8IE9iamVjdC5rZXlzKGRhdGEpWzBdXSB8fCB7fTtcclxuXHRcdFx0bmV3RGF0YVtkYXRhLnR5cGUgfHwgT2JqZWN0LmtleXMoZGF0YSlbMF1dW2tleV0gPSB2YWw7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRuZXdEYXRhW2tleV0gPSB2YWw7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdC8vIGV4dGVuZGluZyBhZGRpdGlvbmFsIGRhdGEgKGNvcHkpXHJcblx0dmFyIHBhcmFtcyA9ICQuZXh0ZW5kKHt9LCBjYXJkLCB7Y2FyZHM6IG5ld0RhdGEsIGdyb3VwSW5kZXg6IGNhcmQuZ3JvdXBJbmRleCArIDF9KTtcclxuXHQvLyBhcHBseSBjb21wb25lbnQgZGF0YSBiaW5kaW5nc1xyXG5cdGtvLmFwcGx5QmluZGluZ3Moe1xyXG5cdFx0cGFyYW1zOiBwYXJhbXNcclxuXHR9LCBjb21wb25lbnRbMF0pO1xyXG5cdFxyXG5cdC8vIGFkZCBzbGlkZSB3aXRoIHNlbGVjdGVkIGRhdGFcclxuXHRjdXJyZW50U2xpZGVyLnNsaWNrKCdzbGlja0FkZCcsIGNvbXBvbmVudCk7XHJcblx0XHJcblx0Ly8gcmVtb3ZlIG91dHN0YW5kaW5nIHNsaWRlc1xyXG5cdGZvciAodmFyIGkgPSBjdXJzbGljay5zbGlkZUNvdW50IC0gMjsgaSA+IGNhcmQuZ3JvdXBJbmRleDsgaS0tKSB7XHJcblx0XHRjdXJyZW50U2xpZGVyLnNsaWNrKCdzbGlja1JlbW92ZScsIGksIGZhbHNlKTtcclxuXHR9XHJcblx0Ly8gbW92ZSB0byBuZXh0IHNsaWRlXHJcblx0Y3VycmVudFNsaWRlci5zbGljaygnc2xpY2tOZXh0Jyk7XHJcbn07XHJcblxyXG4vKipcclxuICogVmlzaWJpbGl0eSBmbGFnIGZvciBDbGVhciBidG5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLl9pc1Zpc2libGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0cmV0dXJuIHRoaXMucmVxdWVzdHMoKS5sZW5ndGggPiAwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENsZWFyIHJlcXVlc3RzdHMgbGlzdCBoYW5kbGVyXHJcbiAqIEBwYXJhbSB2bVxyXG4gKiBAcGFyYW0gZXZlbnRcclxuICovXHJcblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUub25DbGVhclJlcXVlc3RzID0gZnVuY3Rpb24gKHZtLCBldmVudCkge1xyXG5cdHRoaXMucmVxdWVzdHMoW10pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERldGFpbHMgdG9nZ2xlIGhhbmRsZXJcclxuICogQHBhcmFtIHZtXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5nZXREZXRhaWxzID0gZnVuY3Rpb24gKHZtLCBldmVudCkge1xyXG5cdGlmICghdGhpcy5yZXNIVE1MKCkubGVuZ3RoKSB7XHJcblx0XHRqc29uSGlnaGxpZ2h0KHRoaXMucmVzSFRNTCwgdGhpcy5yZXMpO1xyXG5cdH1cclxuXHR0aGlzLmFjdGl2ZSghdGhpcy5hY3RpdmUoKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogSm9pbiBzdHJpbmcgZm9yIGlkJ3NcclxuICogQHBhcmFtIHNcclxuICogQHBhcmFtIGlcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUuZ2V0U3RyID0gZnVuY3Rpb24gKHMsIGkpIHtcclxuXHR2YXIgc3RyID0gcztcclxuXHR2YXIgaTEgPSBpID8gaSgpIDogJyc7XHJcblx0cmV0dXJuIFtcclxuXHRcdHN0cixcclxuXHRcdGkxXHJcblx0XS5qb2luKCctJyk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlcXVlc3RzTGlzdFZpZXdNb2RlbDtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL1ZpZXdNb2RlbHMvcmVxdWVzdHNMaXN0Vmlld01vZGVsLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBXb3JrZXIgPSByZXF1aXJlKCcuL2hpZ2hsaWdodEpzb24ud29ya2VyLmpzJyk7IC8vIEpzb24tZm9ybWF0dGVyIHdvcmtlclxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JzZXJ2YWJsZSwgY29kZSkge1xyXG5cdHZhciBhbmltVGltZSA9IDEwMDtcclxuXHR2YXIgd29ya2VyID0gbmV3IFdvcmtlcjtcclxuXHJcblx0d29ya2VyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0b2JzZXJ2YWJsZShldmVudC5kYXRhKTtcclxuXHJcblx0XHQkKGRvY3VtZW50KVxyXG5cdFx0XHQub24oJ2NsaWNrIHRvdWNoJywgJy50bS1jb2RlLWNvbnRhaW5lciAuZXhwYW5kZWQnLCBmdW5jdGlvbiBqc29uQ29kZUNvbnRhaW5lckV4cGFuZGVkKGUpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHR2YXIgJHNlbGYgPSAkKHRoaXMpO1xyXG5cdFx0XHRcdCRzZWxmXHJcblx0XHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHRcdC5maW5kKCc+dWwnKVxyXG5cdFx0XHRcdFx0LnNsaWRlVXAoYW5pbVRpbWUsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHQkc2VsZi5hZGRDbGFzcygnY29sbGFwc2VkJyk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHRcdFx0Lm9uKCdjbGljayB0b3VjaCcsICcudG0tY29kZS1jb250YWluZXIgLmV4cGFuZGVkLmNvbGxhcHNlZCcsIGZ1bmN0aW9uIGpzb25Db2RlQ29udGFpbmVyQ29sbGFwc2VkKGUpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHR2YXIgJHNlbGYgPSAkKHRoaXMpO1xyXG5cdFx0XHRcdCRzZWxmXHJcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpXHJcblx0XHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHRcdC5maW5kKCc+dWwnKVxyXG5cdFx0XHRcdFx0LnNsaWRlRG93bihhbmltVGltZSwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdCRzZWxmXHJcblx0XHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKVxyXG5cdFx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHR9O1xyXG5cdHdvcmtlci5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRjb25zb2xlLmxvZyhldmVudCk7XHJcblx0fTtcclxuXHJcblx0d29ya2VyLnBvc3RNZXNzYWdlKGNvZGUpO1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvbW9kdWxlcy9qc29uLWhpZ2hsaWdodC5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gcmVxdWlyZShcIiEhRDpcXFxcdGlja2V0bWFzdGVyLWFwaS1zdGFnaW5nLmdpdGh1Yi5pb1xcXFxub2RlX21vZHVsZXNcXFxcd29ya2VyLWxvYWRlclxcXFxjcmVhdGVJbmxpbmVXb3JrZXIuanNcIikoXCIvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXFxuLyoqKioqKi8gXFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxcbi8qKioqKiovIFxcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxcbi8qKioqKiovIFxcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdFxcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxcbi8qKioqKiovIFxcdFxcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxcbi8qKioqKiovIFxcdFxcdFxcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0XFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcXG4vKioqKioqLyBcXHRcXHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XFxuLyoqKioqKi8gXFx0XFx0XFx0ZXhwb3J0czoge30sXFxuLyoqKioqKi8gXFx0XFx0XFx0aWQ6IG1vZHVsZUlkLFxcbi8qKioqKiovIFxcdFxcdFxcdGxvYWRlZDogZmFsc2VcXG4vKioqKioqLyBcXHRcXHR9O1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0XFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXFxuLyoqKioqKi8gXFx0XFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHRcXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXFxuLyoqKioqKi8gXFx0XFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHRcXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxcbi8qKioqKiovIFxcdFxcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcXG4vKioqKioqLyBcXHR9XFxuLyoqKioqKi9cXG4vKioqKioqL1xcbi8qKioqKiovIFxcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXFxuLyoqKioqKi8gXFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXFxuLyoqKioqKi8gXFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXFxuLyoqKioqKi8gXFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXFxcIlxcXCI7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcXG4vKioqKioqLyBcXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcXG4vKioqKioqLyB9KVxcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXFxuLyoqKioqKi8gKFtcXG4vKiAwICovXFxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XFxuXFxuXFx0LyoqXFxyXFxuXFx0ICogQ29kZSBmb3JtYXQgd2ViLXdvcmtlclxcclxcblxcdCAqIEBwYXJhbSBldmVudFxcclxcblxcdCAqL1xcclxcblxcdC8vIHZhciBoaWdobGlnaHRKc29uKClcXHJcXG5cXHR2YXIgaGlnaGxpZ2h0SnNvbiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XFxyXFxuXFx0XFxyXFxuXFx0b25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcXHJcXG5cXHQgIHZhciBjb2RlID0gZXZlbnQuZGF0YTtcXHJcXG5cXHQgIC8vIGltcG9ydFNjcmlwdHMoJ2pzb24tcGFyc2UuanMnKTtcXHJcXG5cXHQgIHZhciByZXN1bHQgPSBoaWdobGlnaHRKc29uKGNvZGUsIHtleHBhbmRlZDogdHJ1ZX0pO1xcclxcblxcdCAgLy8gdmFyIHJlc3VsdCA9SlNPTi5zdHJpbmdpZnkoY29kZSk7XFxyXFxuXFx0ICBwb3N0TWVzc2FnZShyZXN1bHQpO1xcclxcblxcdH07XFxyXFxuXFxuXFxuLyoqKi8gfSxcXG4vKiAxICovXFxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XFxuXFxuXFx0dmFyIHByZWZpeCA9ICd0bS1jb2RlJztcXHJcXG5cXHRcXHJcXG5cXHR2YXIgZ2V0RXhwYW5kZXJDbGFzc2VzID0gZnVuY3Rpb24gKGV4cGFuZGVkKSB7XFxyXFxuXFx0XFx0aWYgKCFleHBhbmRlZCkge1xcclxcblxcdFxcdFxcdHJldHVybiAnZXhwYW5kZWQgY29sbGFwc2VkIGhpZGRlbic7XFxyXFxuXFx0XFx0fVxcclxcblxcdFxcdHJldHVybiAnZXhwYW5kZWQnO1xcclxcblxcdH07XFxyXFxuXFx0XFxyXFxuXFx0dmFyIGVuY29kZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xcclxcblxcdFxcdHJldHVybiBbJzxzcGFuPicsIHZhbHVlLCAnPC9zcGFuPiddLmpvaW4oJycpO1xcclxcblxcdH07XFxyXFxuXFx0XFxyXFxuXFx0dmFyIGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgdHlwZSwgZXhwYW5kZXJDbGFzc2VzKSB7XFxyXFxuXFx0XFx0dmFyIGtsYXNzID0gJ29iamVjdCcsXFxyXFxuXFx0XFx0XFx0b3BlbiA9ICd7JyxcXHJcXG5cXHRcXHRcXHRjbG9zZSA9ICd9JztcXHJcXG5cXHRcXHJcXG5cXHRcXHRpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcXHJcXG5cXHRcXHRcXHRrbGFzcyA9ICdhcnJheSc7XFxyXFxuXFx0XFx0XFx0b3BlbiA9ICdbJztcXHJcXG5cXHRcXHRcXHRjbG9zZSA9ICddJztcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFxyXFxuXFx0XFx0aWYgKHZhbHVlID09PSBudWxsKSB7XFxyXFxuXFx0XFx0XFx0cmV0dXJuIFtcXHJcXG5cXHRcXHRcXHRcXHQnPGxpPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJrZXlcXFwiPlxcXCInLCBlbmNvZGUoa2V5KSwgJ1xcXCI6IDwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwibnVsbFxcXCI+XFxcIicsIGVuY29kZSh2YWx1ZSksICdcXFwiPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0JzwvbGk+J1xcclxcblxcdFxcdFxcdF0uam9pbignJyk7XFxyXFxuXFx0XFx0fVxcclxcblxcdFxcclxcblxcdFxcdGlmICh0eXBlID09ICdvYmplY3QnKSB7XFxyXFxuXFx0XFx0XFx0cmV0dXJuIFtcXHJcXG5cXHRcXHRcXHRcXHQnPGxpPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCInLCBleHBhbmRlckNsYXNzZXMsICdcXFwiPjwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwia2V5XFxcIj5cXFwiJywgZW5jb2RlKGtleSksICdcXFwiOiA8L3NwYW4+ICcsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJvcGVuXFxcIj4nLCBvcGVuLCAnPC9zcGFuPiAnLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8dWwgY2xhc3M9XFxcIicsIGtsYXNzLCAnXFxcIj4nLFxcclxcblxcdFxcdFxcdFxcdFxcdFxcdGpzb24yaHRtbCh2YWx1ZSwgZXhwYW5kZXJDbGFzc2VzKSxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPC91bD4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwiY2xvc2VcXFwiPicsIGNsb3NlLCAnPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0JzwvbGk+J1xcclxcblxcdFxcdFxcdF0uam9pbignJyk7XFxyXFxuXFx0XFx0fVxcclxcblxcdFxcclxcblxcdFxcdGlmICh0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKSB7XFxyXFxuXFx0XFx0XFx0cmV0dXJuIFtcXHJcXG5cXHRcXHRcXHRcXHQnPGxpPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJrZXlcXFwiPlxcXCInLCBlbmNvZGUoa2V5KSwgJ1xcXCI6IDwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwiJywgdHlwZSwgJ1xcXCI+JywgZW5jb2RlKHZhbHVlKSwgJzwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdFxcdCc8L2xpPidcXHJcXG5cXHRcXHRcXHRdLmpvaW4oJycpO1xcclxcblxcdFxcdH1cXHJcXG5cXHRcXHRyZXR1cm4gW1xcclxcblxcdFxcdFxcdCc8bGk+JyxcXHJcXG5cXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcImtleVxcXCI+XFxcIicsIGVuY29kZShrZXkpLCAnXFxcIjogPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCInLCB0eXBlLCAnXFxcIj5cXFwiJywgZW5jb2RlKHZhbHVlKSwgJ1xcXCI8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHQnPC9saT4nXFxyXFxuXFx0XFx0XS5qb2luKCcnKTtcXHJcXG5cXHR9O1xcclxcblxcdFxcclxcblxcdHZhciBqc29uMmh0bWwgPSBmdW5jdGlvbiAoanNvbiwgZXhwYW5kZXJDbGFzc2VzKSB7XFxyXFxuXFx0XFx0dmFyIGh0bWwgPSAnJztcXHJcXG5cXHRcXHRmb3IgKHZhciBrZXkgaW4ganNvbikge1xcclxcblxcdFxcdFxcdGlmICghanNvbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XFxyXFxuXFx0XFx0XFx0XFx0Y29udGludWU7XFxyXFxuXFx0XFx0XFx0fVxcclxcblxcdFxcclxcblxcdFxcdFxcdGh0bWwgPSBbaHRtbCwgY3JlYXRlRWxlbWVudChrZXksIGpzb25ba2V5XSwgdHlwZW9mIGpzb25ba2V5XSwgZXhwYW5kZXJDbGFzc2VzKV0uam9pbignJyk7XFxyXFxuXFx0XFx0fVxcclxcblxcdFxcdHJldHVybiBodG1sO1xcclxcblxcdH07XFxyXFxuXFx0XFxyXFxuXFx0dmFyIGdldEpzb25WaWV3ZXIgPSBmdW5jdGlvbiAoZGF0YSwgb3B0aW9ucykge1xcclxcblxcdFxcdHRyeSB7XFxyXFxuXFx0XFx0XFx0cmV0dXJuIFtcXHJcXG5cXHRcXHRcXHRcXHQnPHVsIGNsYXNzPVxcXCInLCBwcmVmaXgsICctY29udGFpbmVyXFxcIj4nLFxcclxcblxcdFxcdFxcdFxcdFxcdGpzb24yaHRtbChbSlNPTi5wYXJzZShkYXRhKV0sIGdldEV4cGFuZGVyQ2xhc3NlcyhvcHRpb25zLmV4cGFuZGVkKSksXFxyXFxuXFx0XFx0XFx0XFx0JzwvdWw+J1xcclxcblxcdFxcdFxcdF0uam9pbignJyk7XFxyXFxuXFx0XFx0fSBjYXRjaCAoZSkge1xcclxcblxcdFxcdFxcdHJldHVybiBbXFxyXFxuXFx0XFx0XFx0XFx0JzxkaXYgY2xhc3M9XFxcIicsIHByZWZpeCwgJy1lcnJvclxcXCIgPicsIGUudG9TdHJpbmcoKSwgJyA8L2Rpdj4nXFxyXFxuXFx0XFx0XFx0XS5qb2luKCcnKTtcXHJcXG5cXHRcXHR9XFxyXFxuXFx0fTtcXHJcXG5cXHRcXHJcXG5cXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRhdGEsIG9wdCkge1xcclxcblxcdFxcdHZhciBqc29uID0gJyc7XFxyXFxuXFx0XFx0dmFyIG9wdGlvbnMgPSBvcHQgfHwge2V4cGFuZGVkOiB0cnVlfTtcXHJcXG5cXHRcXHRpZiAodHlwZW9mIGRhdGEgPT0gJ3N0cmluZycpIHtcXHJcXG5cXHRcXHRcXHRqc29uID0gZGF0YTtcXHJcXG5cXHRcXHR9IGVsc2UgaWYgKHR5cGVvZiBkYXRhID09ICdvYmplY3QnKSB7XFxyXFxuXFx0XFx0XFx0anNvbiA9IEpTT04uc3RyaW5naWZ5KGRhdGEpXFxyXFxuXFx0XFx0fVxcclxcblxcdFxcdHJldHVybiBnZXRKc29uVmlld2VyKGpzb24sIG9wdGlvbnMpO1xcclxcblxcdH07XFxyXFxuXFxuXFxuLyoqKi8gfVxcbi8qKioqKiovIF0pO1xcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluZGxZbkJoWTJzNkx5OHZkMlZpY0dGamF5OWliMjkwYzNSeVlYQWdORGN4WWpFd1pEUTBZMkUzTWpnd1pURXhOR0VpTENKM1pXSndZV05yT2k4dkx5NHZjMk55YVhCMGN5OWhjR2t0Wlhod2JHOXlaWEl2ZGpJdmJXOWtkV3hsY3k5b2FXZG9iR2xuYUhSS2MyOXVMbmR2Y210bGNpNXFjeUlzSW5kbFluQmhZMnM2THk4dkxpOXpZM0pwY0hSekwyRndhUzFsZUhCc2IzSmxjaTkyTWk5dGIyUjFiR1Z6TDJwemIyNHRjR0Z5YzJVdWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVUZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQkxIVkNRVUZsTzBGQlEyWTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3T3p0QlFVZEJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3T3pzN096czdRVU4wUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxIRkRRVUZ2UXl4bFFVRmxPMEZCUTI1RU8wRkJRMEU3UVVGRFFUczdPenM3T3p0QlEySkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJMRmxCUVZjN1FVRkRXQ3hoUVVGWk96dEJRVVZhTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUjBGQlJUdEJRVU5HTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTEhkQ1FVRjFRanRCUVVOMlFqdEJRVU5CTzBGQlEwRXNSMEZCUlR0QlFVTkdPMEZCUTBFN1FVRkRRVHRCUVVOQklpd2labWxzWlNJNkltaHBaMmhzYVdkb2RFcHpiMjR1ZDI5eWEyVnlMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUlGeDBMeThnVkdobElHMXZaSFZzWlNCallXTm9aVnh1SUZ4MGRtRnlJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTWdQU0I3ZlR0Y2JseHVJRngwTHk4Z1ZHaGxJSEpsY1hWcGNtVWdablZ1WTNScGIyNWNiaUJjZEdaMWJtTjBhVzl1SUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4b2JXOWtkV3hsU1dRcElIdGNibHh1SUZ4MFhIUXZMeUJEYUdWamF5QnBaaUJ0YjJSMWJHVWdhWE1nYVc0Z1kyRmphR1ZjYmlCY2RGeDBhV1lvYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjBwWEc0Z1hIUmNkRngwY21WMGRYSnVJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTmJiVzlrZFd4bFNXUmRMbVY0Y0c5eWRITTdYRzVjYmlCY2RGeDBMeThnUTNKbFlYUmxJR0VnYm1WM0lHMXZaSFZzWlNBb1lXNWtJSEIxZENCcGRDQnBiblJ2SUhSb1pTQmpZV05vWlNsY2JpQmNkRngwZG1GeUlHMXZaSFZzWlNBOUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhOYmJXOWtkV3hsU1dSZElEMGdlMXh1SUZ4MFhIUmNkR1Y0Y0c5eWRITTZJSHQ5TEZ4dUlGeDBYSFJjZEdsa09pQnRiMlIxYkdWSlpDeGNiaUJjZEZ4MFhIUnNiMkZrWldRNklHWmhiSE5sWEc0Z1hIUmNkSDA3WEc1Y2JpQmNkRngwTHk4Z1JYaGxZM1YwWlNCMGFHVWdiVzlrZFd4bElHWjFibU4wYVc5dVhHNGdYSFJjZEcxdlpIVnNaWE5iYlc5a2RXeGxTV1JkTG1OaGJHd29iVzlrZFd4bExtVjRjRzl5ZEhNc0lHMXZaSFZzWlN3Z2JXOWtkV3hsTG1WNGNHOXlkSE1zSUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4cE8xeHVYRzRnWEhSY2RDOHZJRVpzWVdjZ2RHaGxJRzF2WkhWc1pTQmhjeUJzYjJGa1pXUmNiaUJjZEZ4MGJXOWtkV3hsTG14dllXUmxaQ0E5SUhSeWRXVTdYRzVjYmlCY2RGeDBMeThnVW1WMGRYSnVJSFJvWlNCbGVIQnZjblJ6SUc5bUlIUm9aU0J0YjJSMWJHVmNiaUJjZEZ4MGNtVjBkWEp1SUcxdlpIVnNaUzVsZUhCdmNuUnpPMXh1SUZ4MGZWeHVYRzVjYmlCY2RDOHZJR1Y0Y0c5elpTQjBhR1VnYlc5a2RXeGxjeUJ2WW1wbFkzUWdLRjlmZDJWaWNHRmphMTl0YjJSMWJHVnpYMThwWEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbTBnUFNCdGIyUjFiR1Z6TzF4dVhHNGdYSFF2THlCbGVIQnZjMlVnZEdobElHMXZaSFZzWlNCallXTm9aVnh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NWpJRDBnYVc1emRHRnNiR1ZrVFc5a2RXeGxjenRjYmx4dUlGeDBMeThnWDE5M1pXSndZV05yWDNCMVlteHBZMTl3WVhSb1gxOWNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWNDQTlJRndpWENJN1hHNWNiaUJjZEM4dklFeHZZV1FnWlc1MGNua2diVzlrZFd4bElHRnVaQ0J5WlhSMWNtNGdaWGh3YjNKMGMxeHVJRngwY21WMGRYSnVJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThvTUNrN1hHNWNibHh1WEc0dktpb2dWMFZDVUVGRFN5QkdUMDlVUlZJZ0tpcGNiaUFxS2lCM1pXSndZV05yTDJKdmIzUnpkSEpoY0NBME56RmlNVEJrTkRSallUY3lPREJsTVRFMFlWeHVJQ29xTHlJc0lpOHFLbHh5WEc0Z0tpQkRiMlJsSUdadmNtMWhkQ0IzWldJdGQyOXlhMlZ5WEhKY2JpQXFJRUJ3WVhKaGJTQmxkbVZ1ZEZ4eVhHNGdLaTljY2x4dUx5OGdkbUZ5SUdocFoyaHNhV2RvZEVwemIyNG9LVnh5WEc1MllYSWdhR2xuYUd4cFoyaDBTbk52YmlBOUlISmxjWFZwY21Vb0p5NHZhbk52Ymkxd1lYSnpaU2NwTzF4eVhHNWNjbHh1YjI1dFpYTnpZV2RsSUQwZ1puVnVZM1JwYjI0b1pYWmxiblFwSUh0Y2NseHVJQ0IyWVhJZ1kyOWtaU0E5SUdWMlpXNTBMbVJoZEdFN1hISmNiaUFnTHk4Z2FXMXdiM0owVTJOeWFYQjBjeWduYW5OdmJpMXdZWEp6WlM1cWN5Y3BPMXh5WEc0Z0lIWmhjaUJ5WlhOMWJIUWdQU0JvYVdkb2JHbG5hSFJLYzI5dUtHTnZaR1VzSUh0bGVIQmhibVJsWkRvZ2RISjFaWDBwTzF4eVhHNGdJQzh2SUhaaGNpQnlaWE4xYkhRZ1BVcFRUMDR1YzNSeWFXNW5hV1o1S0dOdlpHVXBPMXh5WEc0Z0lIQnZjM1JOWlhOellXZGxLSEpsYzNWc2RDazdYSEpjYm4wN1hISmNibHh1WEc1Y2JpOHFLaW9xS2lvcUtpb3FLaW9xS2lvcUtseHVJQ29xSUZkRlFsQkJRMHNnUms5UFZFVlNYRzRnS2lvZ0xpOXpZM0pwY0hSekwyRndhUzFsZUhCc2IzSmxjaTkyTWk5dGIyUjFiR1Z6TDJocFoyaHNhV2RvZEVwemIyNHVkMjl5YTJWeUxtcHpYRzRnS2lvZ2JXOWtkV3hsSUdsa0lEMGdNRnh1SUNvcUlHMXZaSFZzWlNCamFIVnVhM01nUFNBd1hHNGdLaW92SWl3aWRtRnlJSEJ5WldacGVDQTlJQ2QwYlMxamIyUmxKenRjY2x4dVhISmNiblpoY2lCblpYUkZlSEJoYm1SbGNrTnNZWE56WlhNZ1BTQm1kVzVqZEdsdmJpQW9aWGh3WVc1a1pXUXBJSHRjY2x4dVhIUnBaaUFvSVdWNGNHRnVaR1ZrS1NCN1hISmNibHgwWEhSeVpYUjFjbTRnSjJWNGNHRnVaR1ZrSUdOdmJHeGhjSE5sWkNCb2FXUmtaVzRuTzF4eVhHNWNkSDFjY2x4dVhIUnlaWFIxY200Z0oyVjRjR0Z1WkdWa0p6dGNjbHh1ZlR0Y2NseHVYSEpjYm5aaGNpQmxibU52WkdVZ1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVcElIdGNjbHh1WEhSeVpYUjFjbTRnV3ljOGMzQmhiajRuTENCMllXeDFaU3dnSnp3dmMzQmhiajRuWFM1cWIybHVLQ2NuS1R0Y2NseHVmVHRjY2x4dVhISmNiblpoY2lCamNtVmhkR1ZGYkdWdFpXNTBJRDBnWm5WdVkzUnBiMjRnS0d0bGVTd2dkbUZzZFdVc0lIUjVjR1VzSUdWNGNHRnVaR1Z5UTJ4aGMzTmxjeWtnZTF4eVhHNWNkSFpoY2lCcmJHRnpjeUE5SUNkdlltcGxZM1FuTEZ4eVhHNWNkRngwYjNCbGJpQTlJQ2Q3Snl4Y2NseHVYSFJjZEdOc2IzTmxJRDBnSjMwbk8xeHlYRzVjY2x4dVhIUnBaaUFvUVhKeVlYa3VhWE5CY25KaGVTaDJZV3gxWlNrcElIdGNjbHh1WEhSY2RHdHNZWE56SUQwZ0oyRnljbUY1Snp0Y2NseHVYSFJjZEc5d1pXNGdQU0FuV3ljN1hISmNibHgwWEhSamJHOXpaU0E5SUNkZEp6dGNjbHh1WEhSOVhISmNibHh5WEc1Y2RHbG1JQ2gyWVd4MVpTQTlQVDBnYm5Wc2JDa2dlMXh5WEc1Y2RGeDBjbVYwZFhKdUlGdGNjbHh1WEhSY2RGeDBKenhzYVQ0bkxGeHlYRzVjZEZ4MFhIUmNkQ2M4YzNCaGJpQmpiR0Z6Y3oxY0ltdGxlVndpUGx3aUp5d2daVzVqYjJSbEtHdGxlU2tzSUNkY0lqb2dQQzl6Y0dGdVBpY3NYSEpjYmx4MFhIUmNkRngwSnp4emNHRnVJR05zWVhOelBWd2liblZzYkZ3aVBsd2lKeXdnWlc1amIyUmxLSFpoYkhWbEtTd2dKMXdpUEM5emNHRnVQaWNzWEhKY2JseDBYSFJjZENjOEwyeHBQaWRjY2x4dVhIUmNkRjB1YW05cGJpZ25KeWs3WEhKY2JseDBmVnh5WEc1Y2NseHVYSFJwWmlBb2RIbHdaU0E5UFNBbmIySnFaV04wSnlrZ2UxeHlYRzVjZEZ4MGNtVjBkWEp1SUZ0Y2NseHVYSFJjZEZ4MEp6eHNhVDRuTEZ4eVhHNWNkRngwWEhSY2RDYzhjM0JoYmlCamJHRnpjejFjSWljc0lHVjRjR0Z1WkdWeVEyeGhjM05sY3l3Z0oxd2lQand2YzNCaGJqNG5MRnh5WEc1Y2RGeDBYSFJjZENjOGMzQmhiaUJqYkdGemN6MWNJbXRsZVZ3aVBsd2lKeXdnWlc1amIyUmxLR3RsZVNrc0lDZGNJam9nUEM5emNHRnVQaUFuTEZ4eVhHNWNkRngwWEhSY2RDYzhjM0JoYmlCamJHRnpjejFjSW05d1pXNWNJajRuTENCdmNHVnVMQ0FuUEM5emNHRnVQaUFuTEZ4eVhHNWNkRngwWEhSY2RDYzhkV3dnWTJ4aGMzTTlYQ0luTENCcmJHRnpjeXdnSjF3aVBpY3NYSEpjYmx4MFhIUmNkRngwWEhScWMyOXVNbWgwYld3b2RtRnNkV1VzSUdWNGNHRnVaR1Z5UTJ4aGMzTmxjeWtzWEhKY2JseDBYSFJjZEZ4MEp6d3ZkV3crSnl4Y2NseHVYSFJjZEZ4MFhIUW5QSE53WVc0Z1kyeGhjM005WENKamJHOXpaVndpUGljc0lHTnNiM05sTENBblBDOXpjR0Z1UGljc1hISmNibHgwWEhSY2RDYzhMMnhwUGlkY2NseHVYSFJjZEYwdWFtOXBiaWduSnlrN1hISmNibHgwZlZ4eVhHNWNjbHh1WEhScFppQW9kSGx3WlNBOVBTQW5iblZ0WW1WeUp5QjhmQ0IwZVhCbElEMDlJQ2RpYjI5c1pXRnVKeWtnZTF4eVhHNWNkRngwY21WMGRYSnVJRnRjY2x4dVhIUmNkRngwSnp4c2FUNG5MRnh5WEc1Y2RGeDBYSFJjZENjOGMzQmhiaUJqYkdGemN6MWNJbXRsZVZ3aVBsd2lKeXdnWlc1amIyUmxLR3RsZVNrc0lDZGNJam9nUEM5emNHRnVQaWNzWEhKY2JseDBYSFJjZEZ4MEp6eHpjR0Z1SUdOc1lYTnpQVndpSnl3Z2RIbHdaU3dnSjF3aVBpY3NJR1Z1WTI5a1pTaDJZV3gxWlNrc0lDYzhMM053WVc0K0p5eGNjbHh1WEhSY2RGeDBKend2YkdrK0oxeHlYRzVjZEZ4MFhTNXFiMmx1S0NjbktUdGNjbHh1WEhSOVhISmNibHgwY21WMGRYSnVJRnRjY2x4dVhIUmNkQ2M4YkdrK0p5eGNjbHh1WEhSY2RGeDBKenh6Y0dGdUlHTnNZWE56UFZ3aWEyVjVYQ0krWENJbkxDQmxibU52WkdVb2EyVjVLU3dnSjF3aU9pQThMM053WVc0K0p5eGNjbHh1WEhSY2RGeDBKenh6Y0dGdUlHTnNZWE56UFZ3aUp5d2dkSGx3WlN3Z0oxd2lQbHdpSnl3Z1pXNWpiMlJsS0haaGJIVmxLU3dnSjF3aVBDOXpjR0Z1UGljc1hISmNibHgwWEhRblBDOXNhVDRuWEhKY2JseDBYUzVxYjJsdUtDY25LVHRjY2x4dWZUdGNjbHh1WEhKY2JuWmhjaUJxYzI5dU1taDBiV3dnUFNCbWRXNWpkR2x2YmlBb2FuTnZiaXdnWlhod1lXNWtaWEpEYkdGemMyVnpLU0I3WEhKY2JseDBkbUZ5SUdoMGJXd2dQU0FuSnp0Y2NseHVYSFJtYjNJZ0tIWmhjaUJyWlhrZ2FXNGdhbk52YmlrZ2UxeHlYRzVjZEZ4MGFXWWdLQ0ZxYzI5dUxtaGhjMDkzYmxCeWIzQmxjblI1S0d0bGVTa3BJSHRjY2x4dVhIUmNkRngwWTI5dWRHbHVkV1U3WEhKY2JseDBYSFI5WEhKY2JseHlYRzVjZEZ4MGFIUnRiQ0E5SUZ0b2RHMXNMQ0JqY21WaGRHVkZiR1Z0Wlc1MEtHdGxlU3dnYW5OdmJsdHJaWGxkTENCMGVYQmxiMllnYW5OdmJsdHJaWGxkTENCbGVIQmhibVJsY2tOc1lYTnpaWE1wWFM1cWIybHVLQ2NuS1R0Y2NseHVYSFI5WEhKY2JseDBjbVYwZFhKdUlHaDBiV3c3WEhKY2JuMDdYSEpjYmx4eVhHNTJZWElnWjJWMFNuTnZibFpwWlhkbGNpQTlJR1oxYm1OMGFXOXVJQ2hrWVhSaExDQnZjSFJwYjI1ektTQjdYSEpjYmx4MGRISjVJSHRjY2x4dVhIUmNkSEpsZEhWeWJpQmJYSEpjYmx4MFhIUmNkQ2M4ZFd3Z1kyeGhjM005WENJbkxDQndjbVZtYVhnc0lDY3RZMjl1ZEdGcGJtVnlYQ0krSnl4Y2NseHVYSFJjZEZ4MFhIUnFjMjl1TW1oMGJXd29XMHBUVDA0dWNHRnljMlVvWkdGMFlTbGRMQ0JuWlhSRmVIQmhibVJsY2tOc1lYTnpaWE1vYjNCMGFXOXVjeTVsZUhCaGJtUmxaQ2twTEZ4eVhHNWNkRngwWEhRblBDOTFiRDRuWEhKY2JseDBYSFJkTG1wdmFXNG9KeWNwTzF4eVhHNWNkSDBnWTJGMFkyZ2dLR1VwSUh0Y2NseHVYSFJjZEhKbGRIVnliaUJiWEhKY2JseDBYSFJjZENjOFpHbDJJR05zWVhOelBWd2lKeXdnY0hKbFptbDRMQ0FuTFdWeWNtOXlYQ0lnUGljc0lHVXVkRzlUZEhKcGJtY29LU3dnSnlBOEwyUnBkajRuWEhKY2JseDBYSFJkTG1wdmFXNG9KeWNwTzF4eVhHNWNkSDFjY2x4dWZUdGNjbHh1WEhKY2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0b1pHRjBZU3dnYjNCMEtTQjdYSEpjYmx4MGRtRnlJR3B6YjI0Z1BTQW5KenRjY2x4dVhIUjJZWElnYjNCMGFXOXVjeUE5SUc5d2RDQjhmQ0I3Wlhod1lXNWtaV1E2SUhSeWRXVjlPMXh5WEc1Y2RHbG1JQ2gwZVhCbGIyWWdaR0YwWVNBOVBTQW5jM1J5YVc1bkp5a2dlMXh5WEc1Y2RGeDBhbk52YmlBOUlHUmhkR0U3WEhKY2JseDBmU0JsYkhObElHbG1JQ2gwZVhCbGIyWWdaR0YwWVNBOVBTQW5iMkpxWldOMEp5a2dlMXh5WEc1Y2RGeDBhbk52YmlBOUlFcFRUMDR1YzNSeWFXNW5hV1o1S0dSaGRHRXBYSEpjYmx4MGZWeHlYRzVjZEhKbGRIVnliaUJuWlhSS2MyOXVWbWxsZDJWeUtHcHpiMjRzSUc5d2RHbHZibk1wTzF4eVhHNTlPMXh5WEc1Y2JseHVYRzR2S2lvcUtpb3FLaW9xS2lvcUtpb3FLaXBjYmlBcUtpQlhSVUpRUVVOTElFWlBUMVJGVWx4dUlDb3FJQzR2YzJOeWFYQjBjeTloY0drdFpYaHdiRzl5WlhJdmRqSXZiVzlrZFd4bGN5OXFjMjl1TFhCaGNuTmxMbXB6WEc0Z0tpb2diVzlrZFd4bElHbGtJRDBnTVZ4dUlDb3FJRzF2WkhWc1pTQmphSFZ1YTNNZ1BTQXdYRzRnS2lvdklsMHNJbk52ZFhKalpWSnZiM1FpT2lJaWZRPT1cIiwgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImhpZ2hsaWdodEpzb24ud29ya2VyLmpzXCIpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvbW9kdWxlcy9oaWdobGlnaHRKc29uLndvcmtlci5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwMzQzOTEzL2hvdy10by1jcmVhdGUtYS13ZWItd29ya2VyLWZyb20tYS1zdHJpbmdcclxuXHJcbnZhciBVUkwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkw7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29udGVudCwgdXJsKSB7XHJcblx0dHJ5IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdHZhciBibG9iO1xyXG5cdFx0XHR0cnkgeyAvLyBCbG9iQnVpbGRlciA9IERlcHJlY2F0ZWQsIGJ1dCB3aWRlbHkgaW1wbGVtZW50ZWRcclxuXHRcdFx0XHR2YXIgQmxvYkJ1aWxkZXIgPSB3aW5kb3cuQmxvYkJ1aWxkZXIgfHwgd2luZG93LldlYktpdEJsb2JCdWlsZGVyIHx8IHdpbmRvdy5Nb3pCbG9iQnVpbGRlciB8fCB3aW5kb3cuTVNCbG9iQnVpbGRlcjtcclxuXHRcdFx0XHRibG9iID0gbmV3IEJsb2JCdWlsZGVyKCk7XHJcblx0XHRcdFx0YmxvYi5hcHBlbmQoY29udGVudCk7XHJcblx0XHRcdFx0YmxvYiA9IGJsb2IuZ2V0QmxvYigpO1xyXG5cdFx0XHR9IGNhdGNoKGUpIHsgLy8gVGhlIHByb3Bvc2VkIEFQSVxyXG5cdFx0XHRcdGJsb2IgPSBuZXcgQmxvYihbY29udGVudF0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBuZXcgV29ya2VyKFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYikpO1xyXG5cdFx0fSBjYXRjaChlKSB7XHJcblx0XHRcdHJldHVybiBuZXcgV29ya2VyKCdkYXRhOmFwcGxpY2F0aW9uL2phdmFzY3JpcHQsJyArIGVuY29kZVVSSUNvbXBvbmVudChjb250ZW50KSk7XHJcblx0XHR9XHJcblx0fSBjYXRjaChlKSB7XHJcblx0XHRyZXR1cm4gbmV3IFdvcmtlcih1cmwpO1xyXG5cdH1cclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogRDovdGlja2V0bWFzdGVyLWFwaS1zdGFnaW5nLmdpdGh1Yi5pby9+L3dvcmtlci1sb2FkZXIvY3JlYXRlSW5saW5lV29ya2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImZ1bmN0aW9uIHNsaWNrKHRpbWVzKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblx0dmFyIHNlbGVjdG9yID0gJyNzbGlkZXItJztcclxuXHRcclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHRpbWVzOyBpKyspIHtcclxuXHRcdCQoc2VsZWN0b3IgKyBpKS5zbGljayh7XHJcblx0XHRcdGRvdHM6IGZhbHNlLFxyXG5cdFx0XHRpbmZpbml0ZTogZmFsc2UsXHJcblx0XHRcdHNwZWVkOiAzMDAsXHJcblx0XHRcdHNsaWRlc1RvU2hvdzogMyxcclxuXHRcdFx0c2xpZGVzVG9TY3JvbGw6IDEsXHJcblx0XHRcdHZhcmlhYmxlV2lkdGg6IHRydWUsXHJcblx0XHRcdGF1dG9wbGF5OiBmYWxzZSxcclxuXHRcdFx0cmVzcG9uc2l2ZTogW1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGJyZWFrcG9pbnQ6IDEyMDAsXHJcblx0XHRcdFx0XHRzZXR0aW5nczoge1xyXG5cdFx0XHRcdFx0XHR2YXJpYWJsZVdpZHRoOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRzbGlkZXNUb1Nob3c6IDIsXHJcblx0XHRcdFx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cdFx0XHRcdFx0XHRpbmZpbml0ZTogZmFsc2UsXHJcblx0XHRcdFx0XHRcdGRvdHM6IGZhbHNlXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRicmVha3BvaW50OiA4MDAsXHJcblx0XHRcdFx0XHRzZXR0aW5nczoge1xyXG5cdFx0XHRcdFx0XHR2YXJpYWJsZVdpZHRoOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRzbGlkZXNUb1Nob3c6IDEsXHJcblx0XHRcdFx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAxXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdXHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVuc2xpY2sodGltZXMpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHR2YXIgc2VsZWN0b3IgPSAnI3NsaWRlci0nO1xyXG5cdFxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdGltZXM7IGkrKykge1xyXG5cdFx0JChzZWxlY3RvciArIGkpLnNsaWNrKCd1bnNsaWNrJyk7XHJcblx0fVxyXG5cdGNvbnNvbGUubG9nKCdjbGVhcmVkJyk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdHNldDogc2xpY2ssXHJcblx0cmVtb3ZlOiB1bnNsaWNrXHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9tb2R1bGVzL3NsaWRlci5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XHJcblx0cmVxdWlyZSgnLi9jdXN0b21TZWxlY3QuY29tcG9uZW50Jyk7XHJcblx0cmVxdWlyZSgnLi9wYW5lbHMvcGFuZWxHcm91cC5jb21wb25lbnQnKTtcclxuXHRyZXF1aXJlKCcuL3BhbmVscy9wYWdpbmF0aW9uLmNvbXBvbmVudCcpO1xyXG5cdHJlcXVpcmUoJy4vcGFuZWxzL3BhbmVsSGVhZGluZy5jb21wb25lbnQnKTtcclxuXHRyZXF1aXJlKCcuL3BhbmVscy9vYmplY3RQYW5lbEJvZHkuY29tcG9uZW50Jyk7XHJcblx0cmVxdWlyZSgnLi9wYW5lbHMvYXJyYXlQYW5lbEJvZHkuY29tcG9uZW50Jyk7XHJcbn0oKSk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxyXG4gKiBDdXN0b20gU2VsZWN0IGNvbXBvbmVudFxyXG4gKi9cclxudmFyIHNlbGY7XHJcblxyXG4vKipcclxuICogQ3VzdG9tIFNlbGVjdCBWaWV3LU1vZGVsXHJcbiAqIEBwYXJhbSBwYXJhbXNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBDdXN0b21TZWxlY3QocGFyYW1zKSB7XHJcbiAgc2VsZiA9IHRoaXM7XHJcblxyXG4gIHRoaXMuYW5pbWF0aW9uU3BlZWQgPSBwYXJhbXMuYW5pbWF0aW9uU3BlZWQgfHwgMjAwO1xyXG5cdHRoaXMuY3VyZW50U2VsZWN0RGF0YSA9IHBhcmFtcy5kYXRhIHx8IG51bGw7XHJcblx0dGhpcy5vbkZvY3VzID0gcGFyYW1zLmZvY3VzIHx8IG51bGw7XHJcblx0XHJcbiAgLy9vYnNlcnZhYmxlc1xyXG4gIHRoaXMuc2VsZWN0TW9kZWwgPSB0eXBlb2YgcGFyYW1zLm9wdGlvbnMgIT09J2Z1bmN0aW9uJyA/IGtvLm9ic2VydmFibGVBcnJheShwYXJhbXMub3B0aW9ucyk6ICBwYXJhbXMub3B0aW9ucztcclxuICB0aGlzLnBsYWNlaG9sZGVyID0ga28ub2JzZXJ2YWJsZShwYXJhbXMucGxhY2Vob2xkZXIgfHwgJycpO1xyXG4gIHRoaXMub25zZWxlY3QgPSBwYXJhbXMub25zZWxlY3QgfHwgZnVuY3Rpb24gKGl0ZW0pIHsgY29uc29sZS5sb2coaXRlbSArJ3NlbGVjdGVkIScpfTtcclxuICB0aGlzLnNlbGVjdGVkID0ga28ub2JzZXJ2YWJsZSh0aGlzLnNlbGVjdE1vZGVsKClbMF0pO1xyXG4gIHRoaXMuaXNPbmVPcHRpb24gPSBrby5wdXJlQ29tcHV0ZWQoZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0TW9kZWwoKS5sZW5ndGggPCAyOyAvLyBtb3JlIHRoYW4gb25lIG9wdGlvblxyXG4gIH0sIHRoaXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kRWxlbWVudChldmVudCkge1xyXG4gIHZhciBwYXJlbnQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnBhcmVudHMoJy5qcy1jdXN0b20tc2VsZWN0Jyk7XHJcbiAgcmV0dXJuIHtcclxuICAgIHdyYXBwZXI6IHBhcmVudC5maW5kKCcuanMtY3VzdG9tLXNlbGVjdC13cmFwcGVyJyksXHJcbiAgICBsYXllcjogcGFyZW50LmZpbmQoJy5qcy1jdXN0b20tc2VsZWN0LWxheWVyJylcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDdXN0b20gU2VsZWN0IFZpZXctTW9kZWwgbWV0aG9kXHJcbiAqIEBwYXJhbSB2aWV3TW9kZWxcclxuICogQHBhcmFtIGV2ZW50XHJcbiAqL1xyXG5DdXN0b21TZWxlY3QucHJvdG90eXBlLnNsaWRlVG9nZ2xlID0gZnVuY3Rpb24odmlld01vZGVsLCBldmVudCkge1xyXG5cdC8vIGVsZW0gaW4gZm9jdXMgZW11bGF0aW9uXHJcblx0dGhpcy5vbkZvY3VzICYmIHRoaXMub25Gb2N1cyh0aGlzLmN1cmVudFNlbGVjdERhdGEpO1xyXG5cclxuXHRpZiAodGhpcy5pc09uZU9wdGlvbigpKSB7cmV0dXJuIGZhbHNlO31cclxuICB2YXIgZWwgPSBmaW5kRWxlbWVudChldmVudCk7XHJcbiAgICBlbC53cmFwcGVyLnNsaWRlVG9nZ2xlKHZpZXdNb2RlbC5hbmltYXRpb25TcGVlZCk7XHJcbiAgICBlbC5sYXllci50b2dnbGVDbGFzcygnaGlkZGVuJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3VzdG9tIFNlbGVjdCBWaWV3LU1vZGVsIG1ldGhvZFxyXG4gKiBAcGFyYW0gaXRlbVxyXG4gKiBAcGFyYW0gZXZlbnRcclxuICovXHJcbkN1c3RvbVNlbGVjdC5wcm90b3R5cGUuc2VsZWN0SXRlbSA9IGZ1bmN0aW9uIChpdGVtLCBldmVudCkge1xyXG4gIHZhciBzZWxmID0gdGhpcztcclxuICB0aGlzLnNlbGVjdGVkKGl0ZW0pO1xyXG4gIC8vIHJ1biBoYW5kbGVyXHJcbiAgdGhpcy5vbnNlbGVjdChpdGVtKTtcclxuXHQvLyBzbGlkZSB1cFxyXG4gIHRoaXMuc2xpZGVUb2dnbGUoc2VsZiwgZXZlbnQpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjdXN0b20tc2VsZWN0Jywge1xyXG4gIHZpZXdNb2RlbDogQ3VzdG9tU2VsZWN0LFxyXG4gIHRlbXBsYXRlOiAoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3QganMtY3VzdG9tLXNlbGVjdFwiPicsXHJcbiAgICAgICc8ZGl2IGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0LXdyYXBwZXJcIj4nLFxyXG4gICAgICAgICc8c2VsZWN0IGRhdGEtYmluZD1cIm9wdGlvbnM6IHNlbGVjdE1vZGVsLCBvcHRpb25zVGV4dDogXFwnbmFtZVxcJywgdmFsdWU6IHNlbGVjdGVkXCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2ZpZWxkXCIgbmFtZT1cImFwaS1leHAtbWV0aG9kXCI+PC9zZWxlY3Q+JyxcclxuICAgICAgICAnPHNwYW4gY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX3BsYWNlaG9sZGVyXCI+JyxcclxuICAgICAgICAgICc8aW5wdXQgZGF0YS1iaW5kPVwiZXZlbnQ6IHtjbGljazogc2xpZGVUb2dnbGV9LCBhdHRyOiB7dmFsdWU6IHNlbGVjdGVkKCkubmFtZSwgZGlzYWJsZWQ6IGlzT25lT3B0aW9ufVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCJcIiByZWFkb25seT1cIlwiPicsXHJcbiAgICAgICAgICAnPGIgZGF0YS1iaW5kPVwiY3NzOiB7aGlkZGVuOiBpc09uZU9wdGlvbn1cIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9fY2hldnJvblwiPiZuYnNwOzwvYj4nLFxyXG4gICAgICAgICc8L3NwYW4+JyxcclxuICAgICAgICAnPHVsIGRhdGEtYmluZD1cImZvcmVhY2g6IHNlbGVjdE1vZGVsXCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2xpc3QganMtY3VzdG9tLXNlbGVjdC13cmFwcGVyXCI+JyxcclxuICAgICAgICAgICc8bGkgZGF0YS1iaW5kPVwiY3NzOiB7XFwnYWN0aXZlXFwnOiBjaGVja2VkfVwiIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19pdGVtXCI+JyxcclxuICAgICAgICAgICAgJzxidXR0b24gZGF0YS1iaW5kPVwiZXZlbnQ6IHtjbGljazogJHBhcmVudC5zZWxlY3RJdGVtLmJpbmQoJHBhcmVudCl9LCB0ZXh0OiBuYW1lLCBjc3M6IHtcXCdhY3RpdmVcXCc6IGNoZWNrZWQoKX0sIGF0dHI6IHtcXCdkYXRhLXZhbHVlXFwnOiBuYW1lfVwiICBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9faXRlbS1sYWJlbFwiIGhyZWY9XCIjXCI+PC9idXR0b24+JyxcclxuICAgICAgICAgICAgLy8gJzxzcGFuIGRhdGEtYmluZD1cImlmOiBsaW5rXCI+JyxcclxuICAgICAgICAgICAgXHQnPGEgZGF0YS1iaW5kPVwiYXR0cjoge2hyZWY6IGxpbmt9LCBjc3M6IHtcXCdoaWRkZW5cXCc6ICFsaW5rfVwiIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19pdGVtLWxpbmtcIiB0YXJnZXQ9XCJfYmxhbmtcIj4mbmJzcDs8L2E+JyxcclxuICAgICAgICAgICAgLy8gJzwvc3Bhbj4nLFxyXG4gICAgICAgICAgJzwvbGk+JyxcclxuICAgICAgICAnPC91bD4nLFxyXG4gICAgICAnPC9kaXY+JyxcclxuICAgICAgJzxkaXYgZGF0YS1iaW5kPVwiY2xpY2s6IHNsaWRlVG9nZ2xlXCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3QtbGF5ZXIganMtY3VzdG9tLXNlbGVjdC1sYXllciBoaWRkZW5cIj48L2Rpdj4nLFxyXG4gICAgJzwvZGl2PidcclxuICBdKS5qb2luKCcnKVxyXG59KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvY3VzdG9tU2VsZWN0LmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcclxuXHJcbmZ1bmN0aW9uIGNhcmRHcm91cENvbXBvbmVudChwYXJhbXMpIHtcclxuXHRzZWxmID0gdGhpcztcclxuXHR2YXIgdXJsID0gcGFyYW1zLnVybDtcclxuXHR0aGlzLmZpbHRlciA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy5qc29uJyk7XHJcblx0dGhpcy5jYXJkcyA9IHRoaXMucmVtb3ZlQ2FyZHMocGFyYW1zLmNhcmRzKTtcclxuXHR0aGlzLmdyb3VwSW5kZXggPSBwYXJhbXMuZ3JvdXBJbmRleCB8fCAwO1xyXG5cdHRoaXMuY2FyZEluZGV4ID0gcGFyYW1zLmNhcmRJbmRleDtcclxuXHR0aGlzLnNlY3Rpb25JbmRleCA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUocGFyYW1zLnNlY3Rpb25JbmRleCk7XHJcblx0dGhpcy5kYXRhID0gcGFyYW1zLmRhdGE7XHJcblx0dGhpcy5jb2xvckNsYXNzID0gcGFyYW1zLmNvbG9yQ2xhc3M7XHJcblx0dGhpcy5nZXRNb3JlID0gcGFyYW1zLmdldE1vcmU7XHJcblx0dGhpcy5yZXFJZCA9IHRoaXMucmVxSWQgfHwgcGFyYW1zLnJlcUlkO1xyXG5cdHRoaXMuY2FyZFNpemUgPSBwYXJhbXMuY2FyZFNpemUgfHwgdGhpcy5jYXJkcy5wYWdlLnNpemU7XHJcblx0dGhpcy5wYWdlUGFyYW0gPSAocGFyYW1zLnBhZ2VQYXJhbSB8fCBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHVybCkuZmluZChmdW5jdGlvbiAoaXRlbSkge1xyXG5cdFx0cmV0dXJuIGl0ZW0ubmFtZSA9PT0gJ3BhZ2UnO1xyXG5cdH0pKS52YWx1ZTtcclxuXHRcclxuXHR0aGlzLmNvbGxhcHNlSWQgPSBbXHJcblx0XHQnY2FyZC1wYW5lbC1ib2R5LScsXHJcblx0XHR0aGlzLnNlY3Rpb25JbmRleCxcclxuXHRcdHRoaXMuZ3JvdXBJbmRleFxyXG5cdF0uam9pbignJyk7XHJcblx0XHJcblx0dGhpcy5pc0FjdGl2ZSA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xyXG59XHJcblxyXG5jYXJkR3JvdXBDb21wb25lbnQucHJvdG90eXBlLnJlbW92ZUNhcmRzID0gZnVuY3Rpb24gKG9iaikge1xyXG5cdHZhciBkZXByZWNhdGVkID0gdGhpcy5maWx0ZXIuZGVwcmVjYXRlZDtcclxuXHR2YXIgdW53cmFwcCA9IHRoaXMuZmlsdGVyLnVud3JhcHA7XHJcblx0Ly8gdmFyIGN1cnJlbnRBcGkgPSB0aGlzLmZpbHRlcltdXHJcblxyXG5cdGRlcHJlY2F0ZWQubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcblx0XHRpZiAob2JqW2l0ZW1dKSB7XHJcblx0XHRcdGRlbGV0ZSBvYmpbaXRlbV1cclxuXHRcdH1cclxuXHRcdHJldHVybiBpdGVtO1xyXG5cdH0pO1xyXG5cclxuXHR1bndyYXBwLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG5cdFx0dmFyIHZhbCA9IG9ialtpdGVtXTtcclxuXHRcdGlmICh2YWwpIHtcclxuXHRcdFx0dmFyIGFyciA9IE9iamVjdC5rZXlzKHZhbCk7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIHByb3AgPSBhcnJbaV07XHJcblx0XHRcdFx0b2JqW3Byb3BdID0gdmFsW3Byb3BdO1xyXG5cdFx0XHR9XHJcblx0XHRcdGRlbGV0ZSBvYmpbaXRlbV07XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gaXRlbTtcclxuXHR9KTtcclxuXHJcblx0XHJcblx0cmV0dXJuIG9iajtcclxufTtcclxuXHJcbmNhcmRHcm91cENvbXBvbmVudC5wcm90b3R5cGUuc2V0QWN0aXZlID0gZnVuY3Rpb24gKHZtLCBlKSB7XHJcblx0aWYgKCF0aGlzLmlzQWN0aXZlKSB7XHJcblx0XHQgcmV0dXJuIHRoaXMuaXNBY3RpdmUgPSBrby5vYnNlcnZhYmxlKHRydWUpO1xyXG5cdH1cclxuXHR0aGlzLmlzQWN0aXZlKCF0aGlzLmlzQWN0aXZlKCkpO1xyXG59O1xyXG5cclxuY2FyZEdyb3VwQ29tcG9uZW50LnByb3RvdHlwZS5zb3J0QnlDb25maWcgPSBmdW5jdGlvbiBzb3J0RnVuYyhhLCBiKSB7XHJcblx0dmFyIGNvbmZpZyA9IHNlbGYuZmlsdGVyW3NlbGYucmVxSWRdO1xyXG5cdHZhciBvMSA9IGNvbmZpZy5maW5kKGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdHJldHVybiBvYmoudGl0bGUgPT09IGEua2V5O1xyXG5cdH0pO1xyXG5cdHZhciBvMiA9IGNvbmZpZy5maW5kKGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdHJldHVybiBvYmoudGl0bGUgPT09IGIua2V5O1xyXG5cdH0pO1xyXG5cdHJldHVybiBjb25maWcuaW5kZXhPZihvMSkgLSBjb25maWcuaW5kZXhPZihvMik7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ3BhbmVsLWdyb3VwJywge1xyXG5cdHZpZXdNb2RlbDogY2FyZEdyb3VwQ29tcG9uZW50LFxyXG5cdHRlbXBsYXRlOmBcclxuXHRcdDxzZWN0aW9uIGRhdGEtYmluZD1cImZvcmVhY2hwcm9wOiB7ZGF0YTogY2FyZHMsIHNvcnRGbjogc29ydEJ5Q29uZmlnfVwiIGNsYXNzPVwicGFuZWwtZ3JvdXBcIj5cclxuXHRcdFx0PHNlY3Rpb24gZGF0YS1iaW5kPVwiY3NzOiB7WyRjb21wb25lbnQuY29sb3JDbGFzc106IHRydWV9XCIgY2xhc3M9XCJwYW5lbCBwYW5lbC1wcmltYXJ5XCI+XHJcblx0XHRcdFx0PCEtLXBhbmVsLWhlYWRpbmctLT5cclxuXHRcdFx0XHQ8cGFuZWwtaGVhZGluZyBwYXJhbXM9XCJkYXRhOiAkZGF0YSwgaW5kZXg6ICRpbmRleCwgY2FyZFNpemU6ICRjb21wb25lbnQuY2FyZFNpemUsIHBhZ2VQYXJhbTogJGNvbXBvbmVudC5wYWdlUGFyYW0sIGNvbGxhcHNlSWQ6ICRjb21wb25lbnQuY29sbGFwc2VJZFwiPjwvcGFuZWwtaGVhZGluZz5cdFx0XHRcclxuXHRcdFx0XHQ8IS0tcGFuZWwtYm9keS0tPlxyXG5cdFx0XHRcdDxzZWN0aW9uIGRhdGEtYmluZD1cImF0dHI6eydpZCc6ICRjb21wb25lbnQuY29sbGFwc2VJZCArICRpbmRleCgpfVwiIGNsYXNzPVwicGFuZWwtY29sbGFwc2UgY29sbGFwc2VcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0PCEtLSBrbyBpZjogKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgISQuaXNBcnJheSh2YWx1ZSkpIC0tPlxyXG5cdFx0XHRcdFx0XHRcdDxvYmplY3QtcGFuZWwtYm9keSBwYXJhbXM9XCJkYXRhOiAkZGF0YSwgY2FyZEdyb3VwOiAkY29tcG9uZW50LCBwYWdlUGFyYW06ICRjb21wb25lbnQucGFnZVBhcmFtXCI+PC9vYmplY3QtcGFuZWwtYm9keT5cclxuXHRcdFx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHQ8IS0tIGtvIGlmOiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAkLmlzQXJyYXkodmFsdWUpKSAtLT5cclxuXHRcdFx0XHRcdFx0XHQ8YXJyYXktcGFuZWwtYm9keSBwYXJhbXM9XCJkYXRhOiAkZGF0YSwgY2FyZEdyb3VwOiAkY29tcG9uZW50XCI+PC9hcnJheS1wYW5lbC1ib2R5PlxyXG5cdFx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvc2VjdGlvbj5cclxuXHRcdFx0PC9zZWN0aW9uPlxyXG5cdFxyXG5cdFx0PC9zZWN0aW9uPlxyXG5gfSk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL3BhbmVscy9wYW5lbEdyb3VwLmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJkaXNjb3ZlcnkudjIuZXZlbnRzLmdldFwiOiBbXG5cdFx0e1xuXHRcdFx0XCJ0aXRsZVwiOiBcImV2ZW50c1wiLFxuXHRcdFx0XCJpdGVtc1wiOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInRpdGxlXCI6IFwiZXZlbnRcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJ0aXRsZVwiOiBcImltYWdlc1wiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInRpdGxlXCI6IFwic2FsZXNcIlxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJ0aXRsZVwiOiBcInZlbnVlc1wiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInRpdGxlXCI6IFwiZGF0ZXNcIixcblx0XHRcdFx0XHRcIml0ZW1zXCI6IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XCJ0aXRsZVwiOiBcInN0YXJ0XCJcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFwidGl0bGVcIjogXCJzdGF0dXNcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XCJ0aXRsZVwiOiBcImVuZFwiXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcInRpdGxlXCI6IFwicGFnZVwiXG5cdFx0fVxuXHRdLFxuXHRcImRlcHJlY2F0ZWRcIjogW1xuXHRcdFwiX2xpbmtzXCJcblx0XSxcblx0XCJ1bndyYXBwXCI6IFtcblx0XHRcIl9lbWJlZGRlZFwiXG5cdF1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbmZpZy5qc29uXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xyXG5cclxuLyoqXHJcbiAqIFBhZ2luYXRpb24gZWxlbWVudFxyXG4gKiBAcGFyYW0gcGFyYW1zXHJcbiAqL1xyXG5mdW5jdGlvbiBwYWdpbmF0aW9uKHBhcmFtcykge1xyXG5cdHRoaXMucGFnZVBhcmFtID0gcGFyYW1zLnBhZ2VQYXJhbTtcclxuXHR0aGlzLnRvdGFsUGFnZXMgPSArcGFyYW1zLnRvdGFsUGFnZXM7XHJcblx0dGhpcy5udW1iZXIgPSArcGFyYW1zLm51bWJlcjtcclxuXHR0aGlzLmZpcnN0ID0gISF0aGlzLm51bWJlcjtcclxuXHR0aGlzLmxhc3QgPSB0aGlzLm51bWJlciA8IHRoaXMudG90YWxQYWdlcyAtIDE7XHJcblx0dGhpcy5yZXF1ZXN0QnRuID0gJCgnI2FwaS1leHAtZ2V0LWJ0bicpO1xyXG5cdHNlbGYgPSB0aGlzO1xyXG59XHJcblxyXG4vKipcclxuICogZ2V0IG5leHQgcGFnZVxyXG4gKi9cclxucGFnaW5hdGlvbi5wcm90b3R5cGUuZ2V0UHJldlBhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHZhbCA9IHRoaXMucGFnZVBhcmFtKCk7XHJcblx0c2VsZi5wYWdlUGFyYW0odmFsID4gMCA/IHZhbCAtIDEgOiAwKTtcclxuXHRzZWxmLnJlcXVlc3RCdG4udHJpZ2dlcignY2xpY2snKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBnZXQgcHJldiBwYWdlXHJcbiAqL1xyXG5wYWdpbmF0aW9uLnByb3RvdHlwZS5nZXROZXh0UGFnZSA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdmFsID0gdGhpcy5udW1iZXI7XHJcblx0c2VsZi5wYWdlUGFyYW0odmFsIDwgc2VsZi50b3RhbFBhZ2VzIC0gMSA/IHZhbCAgKyAxOiB2YWwpO1xyXG5cdHNlbGYucmVxdWVzdEJ0bi50cmlnZ2VyKCdjbGljaycpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdwYWdpbmF0aW9uJywge1xyXG5cdHZpZXdNb2RlbDogcGFnaW5hdGlvbixcclxuXHR0ZW1wbGF0ZTpcclxuXHRgPHNwYW4gY2xhc3M9XCJuYXZpZ2F0aW9uLXdyYXBwZXJcIj5cclxuXHRcdDxidXR0b24gZGF0YS1iaW5kPVwiY2xpY2s6IGdldFByZXZQYWdlLCBlbmFibGU6IGZpcnN0XCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibmF2aWdhdGlvbiBwcmV2XCI+PC9idXR0b24+XHJcblx0XHQ8YnV0dG9uICBkYXRhLWJpbmQ9XCJjbGljazogZ2V0TmV4dFBhZ2UsIGVuYWJsZTogbGFzdFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm5hdmlnYXRpb24gbmV4dFwiPjwvYnV0dG9uPlxyXG5cdDwvc3Bhbj5gXHJcbn0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9wYW5lbHMvcGFnaW5hdGlvbi5jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHNlbGY7XHJcblxyXG5mdW5jdGlvbiBvYmplY3RQYW5lbEJvZHlDb21wb25lbnQocGFyYW1zKSB7XHJcblx0c2VsZiA9IHRoaXM7XHJcblx0dGhpcy50aXRsZSA9IHBhcmFtcy5kYXRhLmtleTtcclxuXHR0aGlzLmRhdGEgPSBwYXJhbXMuZGF0YS52YWx1ZTtcclxuXHR0aGlzLmluZGV4ID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShwYXJhbXMuaW5kZXgpO1xyXG5cdHRoaXMuY2FyZFNpemUgPSBwYXJhbXMuY2FyZFNpemU7XHJcblx0dGhpcy5wYWdlUGFyYW0gPSBwYXJhbXMucGFnZVBhcmFtO1xyXG5cdHRoaXMuY29sbGFwc2VJZCA9IHBhcmFtcy5jb2xsYXBzZUlkO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0ga28uY29tcG9uZW50cy5yZWdpc3RlcigncGFuZWwtaGVhZGluZycsIHtcclxuXHR2aWV3TW9kZWw6ICBvYmplY3RQYW5lbEJvZHlDb21wb25lbnQsXHJcblx0dGVtcGxhdGU6YFxyXG5cdFx0PHNlY3Rpb24gY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+XHJcblx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lbC10aXRsZVwiPlxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdDxhIGRhdGEtYmluZD1cImF0dHI6IHsnaHJlZic6ICcjJyArIGNvbGxhcHNlSWQgKyBpbmRleCwgJ2FyaWEtY29udHJvbHMnOiBjb2xsYXBzZUlkICsgaW5kZXh9XCIgY2xhc3M9XCJidG4gYnRuLWljb25cIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxyXG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJidG4gYnRuLWljb24gc2hldnJvbiB3aGl0ZS1zaGV2cm9uLXVwXCI+PC9zcGFuPlxyXG5cdFx0XHRcdFx0PHAgZGF0YS1iaW5kPVwidGV4dDogdGl0bGVcIiBjbGFzcz1cInRpdGxlXCI+VGl0bGU8L3A+XHJcblx0XHRcdFx0PC9hPlxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdDwhLS0ga28gaWY6IHRpdGxlID09PSAnZXZlbnRzJy0tPlxyXG5cdFx0XHRcdFx0PHNwYW4gZGF0YS1iaW5kPVwidGV4dDogY2FyZFNpemVcIiBjbGFzcz1cImNvdW50ZXJcIj48L3NwYW4+XHJcblx0XHRcdFx0PCEtLSAva28tLT5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQ8IS0tIGtvIGlmOiB0aXRsZSA9PT0gJ3BhZ2UnLS0+XHJcblx0XHRcdFx0XHQ8cGFnaW5hdGlvbiBwYXJhbXM9XCJudW1iZXI6IGRhdGEubnVtYmVyLCB0b3RhbFBhZ2VzOiBkYXRhLnRvdGFsUGFnZXMsIHBhZ2VQYXJhbTogcGFnZVBhcmFtXCI+PC9wYWdpbmF0aW9uPlxyXG5cdFx0XHRcdDwhLS0gL2tvLS0+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0PC9zZWN0aW9uPlxyXG5gfSk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL3BhbmVscy9wYW5lbEhlYWRpbmcuY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xyXG5cclxuZnVuY3Rpb24gb2JqZWN0UGFuZWxCb2R5Q29tcG9uZW50KHBhcmFtcykge1xyXG5cdHNlbGYgPSB0aGlzO1xyXG5cdHRoaXMudGl0bGUgPSBwYXJhbXMuZGF0YS5rZXk7XHJcblx0dGhpcy5kYXRhID0gcGFyYW1zLmRhdGEudmFsdWU7XHJcblx0dGhpcy5jYXJkR3JvdXAgPSBwYXJhbXMuY2FyZEdyb3VwO1xyXG5cdHRoaXMuZ2V0TW9yZSA9IHRoaXMuY2FyZEdyb3VwLmdldE1vcmU7XHJcblx0dGhpcy5wYWdlUGFyYW0gPSBwYXJhbXMucGFnZVBhcmFtO1xyXG59XHJcblxyXG5vYmplY3RQYW5lbEJvZHlDb21wb25lbnQucHJvdG90eXBlLm9uRW50ZXJLZXlEb3duID0gZnVuY3Rpb24gKG1vZGVsLCBldmVudCkge1xyXG5cdHZhciBwYWdlTnVtYmVyID0gTWF0aC5hYnMofn5tb2RlbC52YWx1ZSk7XHJcblx0c2VsZi5wYWdlUGFyYW0ocGFnZU51bWJlciA8ICtzZWxmLmRhdGEudG90YWxQYWdlcyA/IHBhZ2VOdW1iZXIgOiArc2VsZi5kYXRhLnRvdGFsUGFnZXMgLSAyKTtcclxuXHRpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuXHRcdCQoJyNhcGktZXhwLWdldC1idG4nKS50cmlnZ2VyKCdjbGljaycpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ29iamVjdC1wYW5lbC1ib2R5Jywge1xyXG5cdHZpZXdNb2RlbDogIG9iamVjdFBhbmVsQm9keUNvbXBvbmVudCxcclxuXHR0ZW1wbGF0ZTpgXHJcblx0XHQ8dWwgZGF0YS1iaW5kPVwiZm9yZWFjaHByb3A6IGRhdGFcIj5cclxuXHRcdFx0PGxpIGNsYXNzPVwiY2xlYXJmaXhcIj5cclxuXHRcdFx0XHQ8IS0tIGtvIGlmOiAkY29tcG9uZW50LnRpdGxlID09PSAnaW1hZ2VzJyAtLT5cclxuXHRcdFx0XHRcdDxpbWcgZGF0YS1iaW5kPVwiYXR0cjoge3NyYzogdXJsLCBhbHQ6ICdpbWFnZS0nICsgcmF0aW99XCIgYWx0PVwiaW1nXCIgY2xhc3M9XCJpbWcgaW1nLXRodW1ibmFpbFwiPlxyXG5cdFx0XHRcdDwhLS0gL2tvIC0tPlxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdDxiIGNsYXNzPVwia2V5XCI+XHJcblx0XHRcdFx0XHQ8c3BhbiBkYXRhLWJpbmQ9XCJ0ZXh0OiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnID8ga2V5OiBrZXkgKyAnOidcIj48L3NwYW4+XHJcblx0XHRcdFx0PC9iPlxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdDwhLS0ga28gaWZub3Q6IHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgJGNvbXBvbmVudC50aXRsZSA9PT0gJ3BhZ2UnICYmIGtleSA9PT0gJ251bWJlcicgLS0+XHJcblx0XHRcdFx0XHQ8c3BhbiBkYXRhLWJpbmQ9XCJ0ZXh0OiB2YWx1ZVwiIGNsYXNzPVwidmFsdWVcIj48L3NwYW4+XHJcblx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0PCEtLSBrbyBpZjogJGNvbXBvbmVudC50aXRsZSA9PT0gJ3BhZ2UnICYmIGtleSA9PT0gJ251bWJlcictLT5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLWlubGluZVwiPlxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgaWQ9XCJwYWdpbmF0aW9uLWlucHV0XCIgZGF0YS1iaW5kPVwidGV4dElucHV0OiB2YWx1ZSwgZXZlbnQ6IHtrZXlkb3duOiAkY29tcG9uZW50Lm9uRW50ZXJLZXlEb3dufVwiIHR5cGU9XCJ0ZXh0XCIgcGF0dGVybj1cIlswLTldK1wiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQ8IS0tIGtvIGlmOiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIC0tPlxyXG5cdFx0XHRcdFx0PGJ1dHRvbiBkYXRhLWJpbmQ9XCJjbGljazogJGNvbXBvbmVudC5nZXRNb3JlLmJpbmQoJGNvbXBvbmVudC5jYXJkR3JvdXAsIHZhbHVlKVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4taWNvbiBibHVlLXNoZXZyb24tcmlnaHQgcHVsbC1yaWdodFwiPjwvYnV0dG9uPlxyXG5cdFx0XHRcdDwhLS0gL2tvIC0tPlxyXG5cdFx0XHRcdFxyXG5cdFx0XHQ8L2xpPlxyXG5cdFx0PC91bD5cclxuYH0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9wYW5lbHMvb2JqZWN0UGFuZWxCb2R5LmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcclxuXHJcbmZ1bmN0aW9uIG9iamVjdFBhbmVsQm9keUNvbXBvbmVudChwYXJhbXMpIHtcclxuXHRzZWxmID0gdGhpcztcclxuXHR0aGlzLnRpdGxlID0gcGFyYW1zLmRhdGEua2V5O1xyXG5cdHRoaXMuZGF0YSA9IHBhcmFtcy5kYXRhLnZhbHVlO1xyXG5cdHRoaXMuY2FyZEdyb3VwID0gcGFyYW1zLmNhcmRHcm91cDtcclxuXHR0aGlzLmdldE1vcmUgPSB0aGlzLmNhcmRHcm91cC5nZXRNb3JlO1xyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdhcnJheS1wYW5lbC1ib2R5Jywge1xyXG5cdHZpZXdNb2RlbDogIG9iamVjdFBhbmVsQm9keUNvbXBvbmVudCxcclxuXHR0ZW1wbGF0ZTpgXHJcblx0XHQ8dWwgZGF0YS1iaW5kPVwiZm9yZWFjaDogZGF0YVwiIGNsYXNzPVwibGlzdC1ncm91cFwiPlxyXG5cdFx0XHQ8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj5cclxuXHRcdFx0XHJcblx0XHRcdFx0PCEtLSBrbyBpZjogJHBhcmVudC50aXRsZSA9PT0gJ2ltYWdlcycgLS0+XHJcblx0XHRcdFx0XHQ8aW1nIGRhdGEtYmluZD1cImF0dHI6IHtzcmM6IHVybCwgYWx0OiAnaW1hZ2UtJyArIHJhdGlvfVwiIGFsdD1cImltZ1wiIGNsYXNzPVwiaW1nXCI+XHJcblx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0PCEtLSBrbyBpZm5vdDogJHBhcmVudC50aXRsZSA9PT0gJ2ltYWdlcycgLS0+XHJcblx0XHRcdFx0PHNwYW4gZGF0YS1iaW5kPVwidGV4dDogbmFtZSB8fCAnIycgKyAkaW5kZXgoKVwiIGNsYXNzPVwibmFtZSB0cnVuY2F0ZVwiPmV2ZW50IG5hbWU8L3NwYW4+XHJcblx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0PCEtLSBrbyBpZjogdHlwZW9mICRkYXRhID09PSAnb2JqZWN0JyAtLT5cclxuXHRcdFx0XHRcdDxidXR0b24gZGF0YS1iaW5kPVwiY2xpY2s6ICRjb21wb25lbnQuZ2V0TW9yZS5iaW5kKCRjb21wb25lbnQuY2FyZEdyb3VwKVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4taWNvbiBibHVlLXNoZXZyb24tcmlnaHQgcHVsbC1yaWdodFwiPjwvYnV0dG9uPlxyXG5cdFx0XHRcdDwhLS0gL2tvIC0tPlxyXG5cdFx0XHRcdFxyXG5cdFx0XHQ8L2xpPlxyXG5cdFx0PC91bD5cclxuYH0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9wYW5lbHMvYXJyYXlQYW5lbEJvZHkuY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=