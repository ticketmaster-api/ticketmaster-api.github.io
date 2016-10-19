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

	var apiKey = apiKeyService.checkApiKeyCookie('tk-api-key') || apiKeyService.getApiExploreKey(); //API Key
	
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
		this.title = params.data.key;
		this.data = this.data || ko.observable(params.data.value);
		this.cardGroup = params.cardGroup;
		this.getMore = this.cardGroup.getMore;
		this.pageParam = params.pageParam;
		self = this;
	}
	
	objectPanelBodyComponent.prototype.onEnterKeyDown = function (model, event) {
		var pageNumber = ~~model.value < 0 ? 0 : ~~model.value;
		self.pageParam(pageNumber < ko.utils.unwrapObservable(self.data).totalPages ? pageNumber : ko.utils.unwrapObservable(self.data).totalPages - 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDllM2I0NGI2ZTliYzQ3ZDllOTMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9tYWluLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2N1c3RvbUJpbmRpbmdzL2ZvcmVhY2hQcm9wLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL21vZHVsZXMvYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9tb2R1bGVzL2FwaWtleS5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9tb2R1bGVzL2FqYXhTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL1ZpZXdNb2RlbHMvbWVudVZpZXdNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9tb2R1bGVzL2hlbHBlckZ1bmMuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9wYXJhbXNWaWV3TW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9tZXRob2RzVmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL1ZpZXdNb2RlbHMvcmVxdWVzdHNMaXN0Vmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL21vZHVsZXMvanNvbi1oaWdobGlnaHQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvbW9kdWxlcy9oaWdobGlnaHRKc29uLndvcmtlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3dvcmtlci1sb2FkZXIvY3JlYXRlSW5saW5lV29ya2VyLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL21vZHVsZXMvc2xpZGVyLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9jdXN0b21TZWxlY3QuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvcGFuZWxzL3BhbmVsR3JvdXAuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbmZpZy5qc29uIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvcGFuZWxzL3BhZ2luYXRpb24uY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvcGFuZWxzL3BhbmVsSGVhZGluZy5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9wYW5lbHMvb2JqZWN0UGFuZWxCb2R5LmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL3BhbmVscy9hcnJheVBhbmVsQm9keS5jb21wb25lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7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O0FBQ0EsRzs7Ozs7O0FDM0NBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7Ozs7Ozs7QUN6Q0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQkFBeUIsc0VBQXNFO0FBQy9GO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7Ozs7Ozs7QUMvQkY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNEIsZ0NBQWdDO0FBQzVEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlFQUF3RSxtQ0FBbUM7QUFDM0c7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7Ozs7Ozs7QUNsREY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNEIsZ0NBQWdDO0FBQzVEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUUiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAwOWUzYjQ0YjZlOWJjNDdkOWU5M1xuICoqLyIsIi8qKlxyXG4gKiBNYWluIGZpbGUgZm9yIEFwaSBFeHBscmVyIHYyLjBcclxuICogRm9yIGRldmVsb3BtZW50IHBsZWFzZSB1c2UgV2VicGFjayB0byBidW5kbGUgYWxsIG1vZHVsZXNcclxuICogSXQgY2FuIGJlIG1hZGUgdXNpbmcgbnBtIHNjcmlwdHMgY21kIC0gJ3dlYnBhY2snXHJcbiAqL1xyXG4vLyBjdXN0b20gYmluZGluZ3NcclxucmVxdWlyZSgnLi4vY3VzdG9tQmluZGluZ3MvZm9yZWFjaFByb3AnKTtcclxuXHJcbi8vIE1vZHVsZXNcclxudmFyIGJhc2UgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2Jhc2UnKTtcclxudmFyIGFwaUtleSA9IHJlcXVpcmUoJy4uL21vZHVsZXMvYXBpa2V5Jyk7XHJcbnZhciBhamF4U2VydmljZSA9IHJlcXVpcmUoJy4uL21vZHVsZXMvYWpheFNlcnZpY2UnKTtcclxuXHJcbi8vIFZpZXcgTW9kZWxzXHJcbnZhciBNZW51Vmlld01vZGVsID0gcmVxdWlyZSgnLi4vVmlld01vZGVscy9tZW51Vmlld01vZGVsJyk7XHJcbnZhciBQYXJhbXNWaWV3TW9kZWwgPSByZXF1aXJlKCcuL3BhcmFtc1ZpZXdNb2RlbCcpO1xyXG52YXIgTWV0aG9kc1ZpZXdNb2RlbCA9IHJlcXVpcmUoJy4vbWV0aG9kc1ZpZXdNb2RlbCcpO1xyXG52YXIgUmVxdWVzdHNMaXN0Vmlld01vZGVsID0gcmVxdWlyZSgnLi9yZXF1ZXN0c0xpc3RWaWV3TW9kZWwnKTtcclxuXHJcbi8vIENvbXBvbmVudHNcclxucmVxdWlyZSgnLi4vY29tcG9uZW50cy9pbmRleCcpO1xyXG5cclxuLyoqXHJcbiAqIE1haW4gYXBwbGljYXRpb24gdmlldy1tb2RlbFxyXG4gKiBAcGFyYW0gb2JqIHtvYmplY3R9IGdsb2JhbCBkYXRhIG9iamVjdFxyXG4gKi9cclxuZnVuY3Rpb24gQXBwVmlld01vZGVsKG9iaikge1xyXG4gIHZhciBiYXNlID0gb2JqIHx8IHt9O1xyXG4gIHNlbGYgPSB0aGlzO1xyXG4gIHRoaXMuYXBpS2V5ID0gYXBpS2V5O1xyXG5cclxuICAvLyBvYnNlcnZhYmxlc1xyXG4gIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSA9IGtvLm9ic2VydmFibGUoJycpO1xyXG4gIHRoaXMuc2VsZWN0ZWRNZXRob2QgPSBrby5vYnNlcnZhYmxlKCcnKTtcclxuICB0aGlzLnNlbGVjdGVkUGFyYW1zID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcclxuXHR0aGlzLnJlcXVlc3RzID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcclxuXHJcblx0Ly8gY29tcHV0ZWRcclxuICB0aGlzLlVSTCA9IGtvLmNvbXB1dGVkKHRoaXMuZ2V0VXJsLCB0aGlzKTtcclxuICB0aGlzLnNlbmRCdXR0b25UZXh0ID0ga28ucHVyZUNvbXB1dGVkKHRoaXMuZ2V0TWV0aG9kTmFtZSwgdGhpcyk7XHJcblxyXG4gIC8vIHN1Yi1tb2RlbHNcclxuICB0aGlzLm1lbnUgPSBuZXcgTWVudVZpZXdNb2RlbChiYXNlLCB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkpO1xyXG4gIHRoaXMubWV0aG9kcyA9IG5ldyBNZXRob2RzVmlld01vZGVsKGJhc2UsIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSwgdGhpcy5zZWxlY3RlZE1ldGhvZCk7XHJcbiAgdGhpcy5wYXJhbXMgPSBuZXcgUGFyYW1zVmlld01vZGVsKGJhc2UsIHRoaXMuc2VsZWN0ZWRNZXRob2QsIHRoaXMuc2VsZWN0ZWRQYXJhbXMpO1xyXG4gIHRoaXMucmVxdWVzdHNMaXN0ID0gbmV3IFJlcXVlc3RzTGlzdFZpZXdNb2RlbCh0aGlzLnJlcXVlc3RzLCB0aGlzLnNlbGVjdGVkUGFyYW1zKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNlbmQgcmVxdWVzdCBtZXRob2RcclxuICovXHJcbkFwcFZpZXdNb2RlbC5wcm90b3R5cGUub25DbGlja1NlbmRCdG4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgYWpheFNlcnZpY2UodGhpcy5VUkwoKSwgdGhpcy5yZXF1ZXN0cywgYmFzZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyBjdXJyZW50IG1ldGhvZCBuYW1lXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5BcHBWaWV3TW9kZWwucHJvdG90eXBlLmdldE1ldGhvZE5hbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRNZXRob2QoKS5tZXRob2QudG9Mb3dlckNhc2UoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHJhdyB1cmwgZGF0YSBhcnJheVxyXG4gKiBAcmV0dXJucyB7KltdfVxyXG4gKi9cclxuQXBwVmlld01vZGVsLnByb3RvdHlwZS5nZXRVcmwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIFtcclxuICAgIHRoaXMuc2VsZWN0ZWRNZXRob2QoKSxcclxuICAgIHRoaXMuYXBpS2V5LFxyXG4gICAgdGhpcy5zZWxlY3RlZFBhcmFtcygpXHJcbiAgXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIGRlZXAgcHJvcFxyXG4gKiBAcmV0dXJucyB7KltdfVxyXG4gKi9cclxuT2JqZWN0LmdldFByb3AgPSBmdW5jdGlvbihvLCBzKSB7XHJcblx0aWYgKHR5cGVvZiBvICE9PSAnb2JqZWN0JyB8fCAhcykge1xyXG5cdFx0Y29uc29sZS5sb2cobyxzKTtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0cyA9IHMucmVwbGFjZSgvXFxbKFxcdyspXFxdL2csICcuJDEnKTsgLy8gY29udmVydCBpbmRleGVzIHRvIHByb3BlcnRpZXNcclxuXHRzID0gcy5yZXBsYWNlKC9eXFwuLywgJycpOyAgICAgICAgICAgLy8gc3RyaXAgYSBsZWFkaW5nIGRvdFxyXG5cdHZhciBhID0gcy5zcGxpdCgnLicpO1xyXG5cdGZvciAodmFyIGkgPSAwLCBuID0gYS5sZW5ndGg7IGkgPCBuOyArK2kpIHtcclxuXHRcdHZhciBrID0gYVtpXTtcclxuXHRcdGlmIChrIGluIG8pIHtcclxuXHRcdFx0byA9IG9ba107XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBvO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFjdGl2YXRlcyBrbm9ja291dC5qc1xyXG4gKi9cclxua28uYXBwbHlCaW5kaW5ncyhuZXcgQXBwVmlld01vZGVsKGJhc2UpKTtcclxuXHJcbi8qKlxyXG4gKiBleHBvcnRzIGdsb2JhbCB2YXJpYWJsZVxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBiYXNlO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9tYWluLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiIG1vZHVsZS5leHBvcnRzID0ga28uYmluZGluZ0hhbmRsZXJzLmZvcmVhY2hwcm9wID0ge1xyXG5cclxuXHR0cmFuc2Zvcm1PYmplY3Q6IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuXHRcdHZhciBwcm9wZXJ0aWVzID0gW107XHJcblx0XHR2YXIgb2JqLCBzb3J0Rm4gPSBwYXJhbXMuc29ydEZuO1xyXG5cclxuXHRcdGlmIChzb3J0Rm4pIHtcclxuXHRcdFx0b2JqID0gcGFyYW1zLmRhdGE7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRvYmogPSBwYXJhbXM7XHJcblx0XHR9XHJcblxyXG5cdFx0a28udXRpbHMub2JqZWN0Rm9yRWFjaChvYmosIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcblx0XHRcdHByb3BlcnRpZXMucHVzaCh7XHJcblx0XHRcdFx0a2V5OiBrZXksXHJcblx0XHRcdFx0dmFsdWU6IHZhbHVlXHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKHNvcnRGbikge1xyXG5cdFx0XHRwcm9wZXJ0aWVzLnNvcnQoc29ydEZuKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcHJvcGVydGllcztcclxuXHR9LFxyXG5cdGluaXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IsIGFsbEJpbmRpbmdzQWNjZXNzb3IsIHZpZXdNb2RlbCwgYmluZGluZ0NvbnRleHQpIHtcclxuXHRcdHZhciBwcm9wZXJ0aWVzID0ga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIG9iaiA9IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUodmFsdWVBY2Nlc3NvcigpKTtcclxuXHRcdFx0cmV0dXJuIGtvLmJpbmRpbmdIYW5kbGVycy5mb3JlYWNocHJvcC50cmFuc2Zvcm1PYmplY3Qob2JqKTtcclxuXHRcdH0pO1xyXG5cdFx0a28uYXBwbHlCaW5kaW5nc1RvTm9kZShlbGVtZW50LCB7XHJcblx0XHRcdGZvcmVhY2g6IHByb3BlcnRpZXNcclxuXHRcdH0sIGJpbmRpbmdDb250ZXh0KTtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGNvbnRyb2xzRGVzY2VuZGFudEJpbmRpbmdzOiB0cnVlXHJcblx0XHR9O1xyXG5cdH1cclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2N1c3RvbUJpbmRpbmdzL2ZvcmVhY2hQcm9wLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGJhc2UgPSB7fTtcclxudmFyIENPTkZJR19VUkwgPSAnLi4vLi4vYXBpZGVzY3JpcHRpb24ueG1sJztcclxuXHJcbnZhciBwYXJzZURhdGEgPSBmdW5jdGlvbiAoeG1sKSB7XHJcblx0dmFyIGdsb2JhbCA9IHt9O1xyXG5cdC8vZ2V0IGFsbCBBUElzXHJcblx0dmFyIHJlc291cmNlc0VsID0gJCh4bWwpLmZpbmQoXCJyZXNvdXJjZXNcIikuZXEoMCk7XHJcblxyXG5cdC8vIHJlc291cmNlXHJcblx0JCh4bWwpXHJcblx0XHQuZmluZChcInJlc291cmNlXCIpXHJcblx0XHQuZ2V0KClcclxuXHRcdC5tYXAoZnVuY3Rpb24gKHJlcykge1xyXG5cdFx0XHR2YXIgcmVzb3VyY2UgPSAkKHJlcyk7XHJcblx0XHRcdC8vIG1ldGhvZCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHR2YXIgbWV0aG9kRWxlbSA9IHJlc291cmNlLmZpbmQoXCJtZXRob2RcIikuZXEoMCk7XHJcblxyXG5cdFx0XHR2YXIgbWV0aG9kID0ge1xyXG5cdFx0XHRcdGlkIDogbWV0aG9kRWxlbS5hdHRyKFwiaWRcIiksIC8vIG1ldGhvZCBpZFxyXG5cdFx0XHRcdG5hbWUgOiBtZXRob2RFbGVtLmF0dHIoXCJhcGlnZWU6ZGlzcGxheU5hbWVcIikgfHwgbWV0aG9kRWxlbS5hdHRyKFwiaWRcIiksIC8vIG1ldGhvZCBuYW1lXHJcblx0XHRcdFx0bWV0aG9kIDogbWV0aG9kRWxlbS5hdHRyKCduYW1lJyksIC8vIEdFVCBvciBQT1NUXHJcblx0XHRcdFx0Y2F0ZWdvcnkgOiBtZXRob2RFbGVtLmZpbmQoJ1twcmltYXJ5PVwidHJ1ZVwiXScpLnRleHQoKS50cmltKCksIC8vIEFQSSBuYW1lXHJcblx0XHRcdFx0cGF0aDogcmVzb3VyY2UuYXR0cigncGF0aCcpLCAvLyBtZXRob2QgVVJMXHJcblx0XHRcdFx0YmFzZSA6IHJlc291cmNlc0VsLmF0dHIoJ2Jhc2UnKSwgLy8gbWV0aG9kIGJhc2UgbGlua1xyXG5cdFx0XHRcdGxpbmsgOiBtZXRob2RFbGVtLmZpbmQoJ2RvYycpLmVxKDApLmF0dHIoJ2FwaWdlZTp1cmwnKSwgLy8gbGluayB0byBkb2N1bWVudGF0aW9uXHJcblx0XHRcdFx0ZGVzY3JpcHRpb24gOiBtZXRob2RFbGVtLmZpbmQoJ2RvYycpLmVxKDApLnRleHQoKS50cmltKCksIC8vbWV0aG9kIGRlc2NyaXB0aW9uXHJcblx0XHRcdFx0cGFyYW1ldGVyczoge31cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8vIHBhcmFtcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHRyZXNvdXJjZVxyXG5cdFx0XHRcdC5maW5kKCdwYXJhbScpXHJcblx0XHRcdFx0LmdldCgpXHJcblx0XHRcdFx0Lm1hcChmdW5jdGlvbiAocGFyKSB7XHJcblx0XHRcdFx0XHR2YXIgcGFyYW0gPSAkKHBhcik7XHJcblx0XHRcdFx0XHR2YXIgb3B0aW9ucyA9IHBhcmFtLmZpbmQoJ29wdGlvbicpO1xyXG5cdFx0XHRcdFx0dmFyIGlzU2VsZWN0ID0gISFvcHRpb25zLmxlbmd0aDtcclxuXHJcblx0XHRcdFx0XHR2YXIgcGFyYW1ldGVyID0ge1xyXG5cdFx0XHRcdFx0XHRuYW1lOiBwYXJhbS5hdHRyKCduYW1lJyksXHJcblx0XHRcdFx0XHRcdGRvYzogcGFyYW0uZmlyc3QoJ2RvYycpLnRleHQoKS50cmltKCksXHJcblx0XHRcdFx0XHRcdHN0eWxlOiBwYXJhbS5hdHRyKCdzdHlsZScpLFxyXG5cdFx0XHRcdFx0XHRyZXF1aXJlZDogcGFyYW0uYXR0cigncmVxdWlyZWQnKSxcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogcGFyYW0uYXR0cignZGVmYXVsdCcpID09PSAnbm9uZScgJiYgaXNTZWxlY3QgPyAnJyA6IHBhcmFtLmF0dHIoJ2RlZmF1bHQnKSxcclxuXHRcdFx0XHRcdFx0c2VsZWN0OiBpc1NlbGVjdFxyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRpZiAoaXNTZWxlY3QpIHtcclxuXHRcdFx0XHRcdFx0cGFyYW1ldGVyLm9wdGlvbnMgPSBvcHRpb25zLmdldCgpLm1hcChmdW5jdGlvbiAob3B0aW9uKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0XHRcdG5hbWU6ICQob3B0aW9uKS5hdHRyKCd2YWx1ZScpLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y2hlY2tlZDogJChvcHRpb24pLmF0dHIoJ3ZhbHVlJykgPT09IHBhcmFtZXRlci5kZWZhdWx0IHx8ICQob3B0aW9uKS5hdHRyKCd2YWx1ZScpID09PSAnbm9uZScsXHJcblx0XHRcdFx0XHRcdFx0XHRsaW5rOiBmYWxzZVxyXG5cdFx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdG1ldGhvZC5wYXJhbWV0ZXJzW3BhcmFtZXRlci5uYW1lXSA9IHBhcmFtZXRlcjtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdC8qKlxyXG5cdFx0XHQgKiBHbG9iYWwgb2JqIGNvbXBvc2l0aW9uXHJcbiAgICAgICAqL1xyXG5cdFx0XHQvLyBzZXQgY2F0ZWdvcnkgb2JqXHJcblx0XHRcdGdsb2JhbFttZXRob2QuY2F0ZWdvcnldID0gZ2xvYmFsW21ldGhvZC5jYXRlZ29yeV0gfHwge307XHJcblxyXG5cdFx0XHQvLyBzZXQgbWV0aG9kcyB0eXBlIG9ialxyXG5cdFx0XHRnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XS5BTEwgPSBnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XS5BTEwgfHwge307XHJcblx0XHRcdGdsb2JhbFttZXRob2QuY2F0ZWdvcnldW21ldGhvZC5tZXRob2RdID0gZ2xvYmFsW21ldGhvZC5jYXRlZ29yeV1bbWV0aG9kLm1ldGhvZF0gfHwge307XHJcblxyXG5cdFx0XHQvLyBzZXQgbWV0aG9kIG9ialxyXG5cdFx0XHRnbG9iYWxbbWV0aG9kLmNhdGVnb3J5XS5BTExbbWV0aG9kLmlkXSA9IG1ldGhvZDtcclxuXHRcdFx0Z2xvYmFsW21ldGhvZC5jYXRlZ29yeV1bbWV0aG9kLm1ldGhvZF1bbWV0aG9kLmlkXSA9IG1ldGhvZDtcclxuXHRcdH0pO1xyXG5cclxuXHRyZXR1cm4gZ2xvYmFsO1xyXG59O1xyXG5cclxuLy9nZXRzIGRvY3VtZW50IGZyb20gV0FETCBjb25maWd1cmF0aW9uIGZpbGVcclxudmFyIHJlYWRGcm9tV0FETCA9IGZ1bmN0aW9uICgpIHtcclxuICAkLmFqYXgoe1xyXG4gICAgdXJsOiBDT05GSUdfVVJMLFxyXG4gICAgYXN5bmMgOiBmYWxzZSxcclxuICAgIGRhdGFUeXBlOiAoJC5icm93c2VyLm1zaWUpID8gXCJ0ZXh0XCIgOiBcInhtbFwiLFxyXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgdmFyIHhtbDtcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UgPT0gXCJzdHJpbmdcIil7XHJcbiAgICAgICAgeG1sID0gbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MRE9NXCIpO1xyXG4gICAgICAgIHhtbC5hc3luYyA9IGZhbHNlO1xyXG4gICAgICAgIHhtbC5sb2FkWE1MKHJlc3BvbnNlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB4bWwgPSByZXNwb25zZTtcclxuICAgICAgfVxyXG5cclxuXHRcdFx0YmFzZSA9IHBhcnNlRGF0YSh4bWwpO1xyXG4gICAgfSxcclxuXHJcbiAgICBlcnJvcjogZnVuY3Rpb24oWE1MSHR0cFJlcXVlc3QsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKXtcclxuICAgICAgYWxlcnQoJ0RhdGEgQ291bGQgTm90IEJlIExvYWRlZCAtICcrIHRleHRTdGF0dXMpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59O1xyXG5yZWFkRnJvbVdBREwoKTtcclxubW9kdWxlLmV4cG9ydHMgPSBiYXNlO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvbW9kdWxlcy9iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGFwaUtleSA9IGFwaUtleVNlcnZpY2UuY2hlY2tBcGlLZXlDb29raWUoJ3RrLWFwaS1rZXknKSB8fCBhcGlLZXlTZXJ2aWNlLmdldEFwaUV4cGxvcmVLZXkoKTsgLy9BUEkgS2V5XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBuYW1lOiAnYXBpa2V5JyxcclxuICBzdHlsZTogJ3F1ZXJ5JyxcclxuICB2YWx1ZToga28ub2JzZXJ2YWJsZShhcGlLZXkpXHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9tb2R1bGVzL2FwaWtleS5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxyXG4gKiBBamF4IFNlcnZpY2VcclxuICogQHBhcmFtIHVybFxyXG4gKiBAcGFyYW0gbWV0aG9kXHJcbiAqIEBwYXJhbSBjYWxsYmFja1xyXG4gKi9cclxudmFyIGFqYXhTZXJ2aWNlID0gZnVuY3Rpb24gKHVybCwgbWV0aG9kLCBjYWxsYmFjaykge1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBtZXRob2QsXHJcbiAgICB1cmw6IHVybCxcclxuICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgY29tcGxldGU6IGNhbGxiYWNrXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogRmlsdGVycyBhbmQgcHJlcGFyZXMgcGFyYW1zIHBhaXJzXHJcbiAqIEBwYXJhbSBhcnJcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG52YXIgcHJlcGFyZVVybCA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICB2YXIgcmVwbGFjZW1lbnQsIHVybCwgZG9tYWluLCBwYXRoLCBtZXRob2QsIGFwaUtleSwgcGFyYW1zO1xyXG5cclxuICBpZiAoIWFyciAmJiAhYXJyLmxlbmd0aCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBcclxuICBkb21haW4gPSBhcnJbMF0uYmFzZTtcclxuICBwYXRoID0gYXJyWzBdLnBhdGg7XHJcbiAgYXBpS2V5ID0gYXJyWzFdO1xyXG4gIHBhcmFtcyA9IGFyclsyXS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgIHJldHVybiBpdGVtLnN0eWxlID09PSAncXVlcnknO1xyXG4gIH0pO1xyXG5cclxuICAvLyBhcnIgb2YgdGVtcGxhdGUgbWFya3NcclxuICByZXBsYWNlbWVudCA9IHBhdGgubWF0Y2goLyhbXntdKj8pXFx3KD89XFx9KS9nbWkpO1xyXG5cclxuICAvLyBhcnIgb2YgdGVtcGxhdGUgcGFyYW1zXHJcbiAgdmFyIHRlbXBsYXRlc0FyciA9IGFyclsyXS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgIHJldHVybiBpdGVtLnN0eWxlID09PSAndGVtcGxhdGUnO1xyXG4gIH0pO1xyXG5cclxuICAvLyByZXBsYWNlbWVudFxyXG4gIHJlcGxhY2VtZW50LmZvckVhY2goZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgdmFyIHBhcmFtID0gdGVtcGxhdGVzQXJyLmZpbmQoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgcmV0dXJuIGl0ZW0ubmFtZSA9PT0gdmFsO1xyXG4gICAgfSk7XHJcbiAgICBwYXRoID0gcGF0aC5yZXBsYWNlKCd7JysgcGFyYW0ubmFtZSArICd9JywgcGFyYW0udmFsdWUoKSB8fCBwYXJhbS5kZWZhdWx0KTtcclxuICB9KTtcclxuXHJcbiAgLy8gYWRkcyBhcGlLZXkgcGFyYW1cclxuICBpZiAoIXBhcmFtc1swXSB8fCBwYXJhbXNbMF0ubmFtZSAhPT0gJ2FwaWtleScpIHtcclxuICAgIHBhcmFtcy51bnNoaWZ0KGFwaUtleSk7XHJcbiAgfVxyXG5cclxuICAvLyBwcmVwYXJlcyBwYXJhbXMgcGFydCBvZiB1cmxcclxuICBwYXJhbXMgPSBwYXJhbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgIHJldHVybiBbaXRlbS5uYW1lLCBpdGVtLnZhbHVlKCkgfHwgaXRlbS5kZWZhdWx0XS5qb2luKCc9Jyk7XHJcbiAgICB9KS5qb2luKCcmJyk7XHJcblxyXG4gIHVybCA9IFtkb21haW4sICcvJywgcGF0aCwgJz8nLCBwYXJhbXNdLmpvaW4oJycpO1xyXG5cclxuICByZXR1cm4gZW5jb2RlVVJJKHVybCk7XHJcbn07XHJcblxyXG4vLyBzZW5kcyByZXF1ZXN0IHRvIGdldCB0aGUgc2Vjb25kIGNvbHVtblxyXG52YXIgc2VuZFByaW1hcnlSZXF1ZXN0ID0gZnVuY3Rpb24gKGFyciwgcmVxdWVzdHMsIGdsb2JhbCkge1xyXG4gIHZhciB1cmwgPSBwcmVwYXJlVXJsKGFycik7XHJcblxyXG4gIGFqYXhTZXJ2aWNlKHVybCwgYXJyWzBdLm1ldGhvZCwgZnVuY3Rpb24ocmVzLCBtc2cpIHtcclxuXHRcdHZhciByZXNPYmogPSB7XHJcblx0XHRcdHJlcTogdXJsLFxyXG5cdFx0XHRpbmRleDogcmVxdWVzdHMoKS5sZW5ndGhcclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKG1zZyA9PSAnZXJyb3InKSB7XHJcblx0XHRcdHZhciBlcnIgPSByZXMgJiZcclxuXHRcdFx0XHRyZXMucmVzcG9uc2VKU09OICYmXHJcblx0XHRcdFx0cmVzLnJlc3BvbnNlSlNPTi5lcnJvcnMgJiZcclxuXHRcdFx0XHRyZXMucmVzcG9uc2VKU09OLmVycm9yc1swXTtcclxuXHJcblx0XHRcdHJlc09iai5lcnJvciA9IHtcclxuXHRcdFx0XHRjb2RlOiBlcnIgPyBlcnIuY29kZTogNTAwLFxyXG5cdFx0XHRcdG1lc3NhZ2U6IGVyciA/IGVyci5kZXRhaWw6ICdObyByZXNwb25jZSBkYXRhISdcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Z2xvYmFsLmxhc3RSZXNwb25zZSA9IHJlc09iai5yZXMgPSB7XHJcblx0XHRcdFx0aWQ6IGFyclswXS5pZCwgLy8gbWV0aG9kIGlkIHdhcyB1c2VkXHJcblx0XHRcdFx0cmVzOiByZXMucmVzcG9uc2VKU09OIC8vIHJlc3BvbnNlXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gZXhwb3J0aW5nIGRhdGEgdXNpbmcgb2JzZXJ2YWJsZVxyXG5cdFx0cmVxdWVzdHMudW5zaGlmdChyZXNPYmopO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc2VuZFByaW1hcnlSZXF1ZXN0O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvbW9kdWxlcy9hamF4U2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBoZiA9IHJlcXVpcmUoJy4uL21vZHVsZXMvaGVscGVyRnVuYycpO1xyXG52YXIgc2VsZjtcclxuXHJcblxyXG4vKipcclxuICogTWVudSBWaWV3LU1vZGVsXHJcbiAqIEBwYXJhbSBiYXNlXHJcbiAqIEBwYXJhbSBjYXRlZ29yeVxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIE1lbnVWaWV3TW9kZWwoYmFzZSwgY2F0ZWdvcnkpIHtcclxuICBzZWxmID0gdGhpcztcclxuICB0aGlzLmNhdGVnb3J5ID0gY2F0ZWdvcnk7XHJcbiAgdGhpcy5jYXRlZ29yaWVzID0ga28ub2JzZXJ2YWJsZUFycmF5KE9iamVjdC5rZXlzKGJhc2UpLm1hcChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNoZWNrZWQ6IGtvLm9ic2VydmFibGUoIWluZGV4KSxcclxuICAgICAgbmFtZTogaXRlbSxcclxuICAgICAgbGluazogZmFsc2VcclxuICAgIH1cclxuICB9KSk7XHJcblxyXG4gIC8vIGluaXRpYWwgbG9hZFxyXG4gIHRoaXMuc2VsZWN0Q2F0ZWdvcnkodGhpcy5jYXRlZ29yaWVzKClbMF0pO1xyXG59XHJcblxyXG4vKipcclxuICogTWVudSBWaWV3LU1vZGVsIG1ldGhvZFxyXG4gKiBAcGFyYW0gY2F0ZWdvcnlcclxuICovXHJcbk1lbnVWaWV3TW9kZWwucHJvdG90eXBlLnNlbGVjdENhdGVnb3J5ID0gZnVuY3Rpb24gKGNhdGVnb3J5KSB7XHJcbiAgdmFyIGNhdGVnb3J5TmFtZSA9IGNhdGVnb3J5Lm5hbWU7XHJcbiAgc2VsZi5jYXRlZ29yeShjYXRlZ29yeU5hbWUpO1xyXG4gIGhmLmNoZWNrQWN0aXZlKHNlbGYuY2F0ZWdvcmllcywgY2F0ZWdvcnlOYW1lKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTWVudVZpZXdNb2RlbDtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL1ZpZXdNb2RlbHMvbWVudVZpZXdNb2RlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMuZ2V0TW9kZWxBcnJheSA9IGZ1bmN0aW9uIGdldE1vZGVsQXJyYXkocGFyYW1zKSB7XHJcbiAgICB2YXIgb2JqID0gcGFyYW1zLm9iaiB8fCB7fSxcclxuICAgICAgICBhcnIgPSBwYXJhbXMuYXJyIHx8IFtdLFxyXG4gICAgICAgIHByb3AgPSBwYXJhbXMucHJvcCB8fCAnbmFtZSc7XHJcblxyXG4gICAgZm9yICh2YXIgaSBpbiBvYmopIHtcclxuICAgICAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShpKSkgeyBjb250aW51ZTsgfVxyXG5cclxuICAgICAgICB2YXIgaXRlbSA9IGFyci5maW5kKGZ1bmN0aW9uIChtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbTEubmFtZSA9PT0gb2JqW2ldW3Byb3BdO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoaXRlbSkgeyBjb250aW51ZTsgfVxyXG5cclxuICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgIGNoZWNrZWQ6IGtvLm9ic2VydmFibGUoZmFsc2UpLFxyXG4gICAgICAgICAgICBuYW1lOiBvYmpbaV1bcHJvcF1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBhcnI7XHJcbn07XHJcblxyXG5leHBvcnRzLmNoZWNrQWN0aXZlID0gZnVuY3Rpb24gY2hlY2tBY3RpdmUoa29BcnIsIGFjdGl2ZUVsZW0pIHtcclxuICAgIGlmICgha29BcnIgJiYgIWFjdGl2ZUVsZW0pIHtyZXR1cm4gZmFsc2U7fVxyXG5cclxuICAgIGtvQXJyKGtvQXJyKCkubWFwKGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICBpZiAob2JqLm5hbWUgPT09IGFjdGl2ZUVsZW0pIHtcclxuICAgICAgICAgICAgb2JqLmNoZWNrZWQodHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb2JqLmNoZWNrZWQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfSkpO1xyXG59O1xyXG5cclxuZXhwb3J0cy5pdGVyYXRlID0gZnVuY3Rpb24gKG9iaikge1xyXG5cdGZvciAodmFyIHByb3BlcnR5IGluIG9iaikge1xyXG5cdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBvYmpbcHJvcGVydHldID09IFwib2JqZWN0XCIpIHtcclxuXHRcdFx0XHRpdGVyYXRlKG9ialtwcm9wZXJ0eV0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCd8JyArIHByb3BlcnR5ICsgXCIgfCAgXCIgKyBvYmpbcHJvcGVydHldICsgJ3wnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9tb2R1bGVzL2hlbHBlckZ1bmMuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcclxudmFyIGJhc2U7XHJcbnZhciBoZiA9IHJlcXVpcmUoJy4uL21vZHVsZXMvaGVscGVyRnVuYycpO1xyXG4vKipcclxuICogUGFyYW1zIFZpZXctTW9kZWxcclxuICogQHBhcmFtIHJhd1xyXG4gKiBAcGFyYW0gbWV0aG9kXHJcbiAqIEBwYXJhbSBwYXJhbXNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBQYXJhbXNWaWV3TW9kZWwocmF3LCBtZXRob2QsIHBhcmFtcykge1xyXG4gIGJhc2UgPSByYXc7XHJcbiAgc2VsZiA9IHRoaXM7XHJcbiAgdGhpcy5hbmltYXRpb25TcGVlZCA9IDIwMDtcclxuXHJcbiAgLy8gb2JzZXJ2YWJsZXNcclxuICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcclxuICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcclxuICB0aGlzLmlzSGlkZGVuID0ga28ub2JzZXJ2YWJsZSh0cnVlKTtcclxuICB0aGlzLnBhcmFtSW5Gb2N1cyA9IGtvLm9ic2VydmFibGUoJycpO1xyXG5cdHRoaXMucGFyYW1zTW9kZWwgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xyXG5cclxuXHQvLyBjb21wdXRlZFxyXG5cdC8vIHRoaXMucGFyYW1zTW9kZWwgPSBrby5jb21wdXRlZCh0aGlzLnVwZGF0ZVBhcmFtc01vZGVsLCB0aGlzKTtcclxuXHR0aGlzLnVwZGF0ZVZpZXdNb2RlbCgpO1xyXG5cdHRoaXMubWV0aG9kLnN1YnNjcmliZSh0aGlzLnVwZGF0ZVZpZXdNb2RlbCwgdGhpcyk7XHJcblxyXG5cdHRoaXMuaXNEaXJ0eSA9IGtvLmNvbXB1dGVkKHRoaXMuY2hlY2tEaXJ0eSwgdGhpcyk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogSW5pdGlhbCBidWlsZCBvZiBTZWxlY3QgTW9kZWxcclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUudXBkYXRlVmlld01vZGVsID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciBvYmogPSB0aGlzLm1ldGhvZCgpLnBhcmFtZXRlcnMgfHwge30sXHJcblx0XHRhcnIgPSBbXTtcclxuXHJcblx0Zm9yICh2YXIgaSBpbiBvYmopIHtcclxuXHRcdGlmICghb2JqLmhhc093blByb3BlcnR5KGkpKSB7Y29udGludWU7fVxyXG5cclxuXHRcdC8vIGNvcGllcyBhbGwgdmFsdWVzIGZyb20gbW9kZWwgdG8gdmlldy1tb2RlbFxyXG5cdFx0dmFyIHZtUGFyYW0gPSAkLmV4dGVuZCh7fSwgb2JqW2ldKTtcclxuXHJcblx0XHR2bVBhcmFtLnZhbHVlID0ga28ub2JzZXJ2YWJsZSh2bVBhcmFtLnZhbHVlIHx8ICh2bVBhcmFtLnNlbGVjdCAmJiB2bVBhcmFtLmRlZmF1bHQpIHx8ICcnKTtcclxuXHJcblx0XHQvL2FkZCBvYnNlcnZhYmxlIGZvciBzZWxlY3RlZCBvcHRpb25zXHJcblx0XHRpZiAodm1QYXJhbS5zZWxlY3QpIHtcclxuXHRcdFx0dm1QYXJhbS5vcHRpb25zID0ga28ub2JzZXJ2YWJsZUFycmF5KG9ialtpXS5vcHRpb25zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG5cdFx0XHRcdHZhciBvYmogPSAkLmV4dGVuZCh7fSwgaXRlbSk7XHJcblx0XHRcdFx0b2JqLmNoZWNrZWQgPSBrby5vYnNlcnZhYmxlKGl0ZW0uY2hlY2tlZCk7XHJcblx0XHRcdFx0cmV0dXJuIG9iajtcclxuXHRcdFx0fSkpXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gJ2RpcnR5JyBmbGFnIHdhdGNoZXIgZm9yIGN1cnJlbnQgZmllbGRcclxuXHRcdHZtUGFyYW0uaXNEaXJ0eSA9IGtvLnB1cmVDb21wdXRlZChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh0aGlzLnNlbGVjdCkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnZhbHVlKCkgIT09IHRoaXMuZGVmYXVsdCAmJiB0aGlzLnZhbHVlKCkgIT09ICdub25lJztcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gISEodGhpcy52YWx1ZSgpLnRvU3RyaW5nKCkpLnRyaW0oKS5sZW5ndGg7XHJcblx0XHR9LCB2bVBhcmFtKTtcclxuXHJcblx0XHQvLyBhZGQgY2FsZW5kYXIgYnRuIGZvciBjdXJyZW50IGZpZWxkXHJcblx0XHR2bVBhcmFtLmhhc0NhbGVuZGFyID0gaS5zZWFyY2goLyhkYXRlfHRpbWUpL2dtaSkgIT0gLTE7XHJcblxyXG5cdFx0Ly8gYWRkIHBvcC11cCBidG4gZm9yIGN1cnJlbnQgZmllbGRcclxuXHRcdHZtUGFyYW0uaGFzUG9wVXAgPSBpLnNlYXJjaCgvKGF0dHJhY3Rpb25JZHx2ZW51ZUlkKS9nbWkpICE9IC0xO1xyXG5cclxuXHRcdGFyci5wdXNoKHZtUGFyYW0pO1xyXG5cdH1cclxuXHJcblx0Ly8gcHJlcGFyZSBvdXRwdXQgZm9yIHJlcXVlc3RcclxuXHR0aGlzLnBhcmFtc01vZGVsKGFycik7XHJcblx0dGhpcy5wYXJhbUluRm9jdXModGhpcy5wYXJhbXNNb2RlbCgpWzBdKTtcclxuXHR0aGlzLnByZXBhcmVVcmxQYWlycyhhcnIsIHRoaXMucGFyYW1zKTtcclxuXHRyZXR1cm4gYXJyO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERpcnR5IHBhcmFtcyBmb3JtIG9ic2VydmFibGUgbWV0aG9kXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5jaGVja0RpcnR5ID0gZnVuY3Rpb24gKCkge1xyXG5cdHRoaXMucHJlcGFyZVVybFBhaXJzKHRoaXMucGFyYW1zTW9kZWwoKSwgdGhpcy5wYXJhbXMpO1xyXG5cdHZhciBkaXJ0eSA9IHRoaXMucGFyYW1zTW9kZWwoKS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdHJldHVybiBpdGVtLmlzRGlydHkoKSA9PT0gdHJ1ZTtcclxuXHR9KTtcclxuXHRyZXR1cm4gZGlydHkubGVuZ3RoID4gMDtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogRW50ZXIga2V5IGhhbmRsZXJcclxuICogQHBhcmFtIG1vZGVsXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5vbkVudGVyS2V5RG93biA9IGZ1bmN0aW9uIChtb2RlbCwgZXZlbnQpIHtcclxuICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICQoJyNhcGktZXhwLWdldC1idG4nKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogU2xpZGUgdG9nZ2xlIGZvciBwYXJhbXMgY29udGFpbmVyIG1ldGhvZFxyXG4gKiBAcGFyYW0gdmlld01vZGVsXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5zbGlkZVRvZ2dsZSA9IGZ1bmN0aW9uICh2aWV3TW9kZWwsIGV2ZW50KSB7XHJcbiAgJChldmVudC5jdXJyZW50VGFyZ2V0KVxyXG4gICAgLnBhcmVudHMoJy5qcy1zbGlkZS1jb250cm9sJylcclxuICAgIC5maW5kKCcuanMtc2xpZGUtd3JhcHBlcicpXHJcbiAgICAuc2xpZGVUb2dnbGUodmlld01vZGVsLmFuaW1hdGlvblNwZWVkLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZpZXdNb2RlbC5pc0hpZGRlbighdmlld01vZGVsLmlzSGlkZGVuKCkpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogTWFjaGVzIGZvY3VzZWQgcGFyYW1cclxuICogQHBhcmFtIGl0ZW1cclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUub25Gb2N1cyA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgc2VsZi5wYXJhbUluRm9jdXMoaXRlbSk7XHJcbn07XHJcblxyXG4vKipcclxuICogRmlsdGVycyBwYXJhbXMgYnkgZGVmaW5lZCB2YWx1ZVxyXG4gKiBAcGFyYW0gYXJyXHJcbiAqIEBwYXJhbSBrb09ic1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUucHJlcGFyZVVybFBhaXJzID0gZnVuY3Rpb24gKGFyciwga29PYnMpIHtcclxuICBpZiAoIWFyciAmJiAha29PYnMpIHtyZXR1cm4gZmFsc2U7fVxyXG5cclxuICByZXR1cm4ga29PYnMoYXJyLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgcmV0dXJuIChpdGVtLnZhbHVlKCkgfHwgaXRlbS5kZWZhdWx0KTtcclxuICB9KSk7XHJcbn07XHJcblxyXG4vKipcclxuICogT24gc2VsZWN0IHZhbHVlIGhhbmRsZXIgZm9yIHBhcmFtcyBzZWxlY3RcclxuICogQHBhcmFtIHBhcmFtIHtvYmplY3R9IHBhcmFtZXRlciB2aWV3LW1vZGVsXHJcbiAqIEBwYXJhbSBvcHRpb24ge29iamVjdH0gb3B0aW9uIHZpZXctbW9kZWxcclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUub25TZWxlY3RQYXJhbVZhbHVlID0gZnVuY3Rpb24gKHBhcmFtLCBvcHRpb24pIHtcclxuXHRoZi5jaGVja0FjdGl2ZShwYXJhbS5vcHRpb25zLCBvcHRpb24ubmFtZSk7XHJcblx0cGFyYW0udmFsdWUob3B0aW9uLm5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFBhcmFtcyBjbGVhciBidXR0b24gaGFuZGxlclxyXG4gKiBAcGFyYW0gdm0ge29iamVjdH0gdmlldyBtb2RlbFxyXG4gKiBAcGFyYW0gZSB7b2JqZWN0fSBldmVudFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5vblBhcmFtc0NsZWFyID0gZnVuY3Rpb24gKHZtLCBlKSB7XHJcblx0dGhpcy51cGRhdGVWaWV3TW9kZWwoKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGFyYW1zVmlld01vZGVsO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9wYXJhbXNWaWV3TW9kZWwuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgaGYgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2hlbHBlckZ1bmMnKTtcclxudmFyIHNlbGY7XHJcbnZhciBiYXNlO1xyXG52YXIgY2F0ZWdvcnk7XHJcblxyXG4vKipcclxuICogTWV0aG9kcyBWaWV3LU1vZGVsXHJcbiAqIEBwYXJhbSByYXdcclxuICogQHBhcmFtIGNhdGVnb3J5XHJcbiAqIEBwYXJhbSBtZXRob2RcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBNZXRob2RzVmlld01vZGVsKHJhdywgY2F0ZWdvcnksIG1ldGhvZCkge1xyXG4gIHNlbGYgPSB0aGlzO1xyXG4gIGJhc2UgPSByYXc7XHJcblxyXG4gIC8vIG9ic2VydmFibGVzXHJcbiAgdGhpcy5jYXRlZ29yeSA9IGNhdGVnb3J5O1xyXG4gIHRoaXMubWV0aG9kID0gbWV0aG9kO1xyXG4gIHRoaXMudG9nZ2xlUG9wVXAgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcclxuICB0aGlzLnJhZGlvc01vZGVsID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcclxuICB0aGlzLm1ldGhvZHNWaWV3TW9kZWwgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xyXG4gIHRoaXMudXBkYXRlTW9kZWwodGhpcy5jYXRlZ29yeSgpKTtcclxuICB0aGlzLmNhdGVnb3J5LnN1YnNjcmliZSh0aGlzLnVwZGF0ZU1vZGVsLCB0aGlzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE9uIGNhdGVnb3J5IGNoYW5nZSBoYW5kbGVyXHJcbiAqIE1ldGhvZHMgVmlldy1Nb2RlbCBtZXRob2RcclxuICogQHBhcmFtIGNhdGVnb3J5XHJcbiAqL1xyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS51cGRhdGVNb2RlbCA9IGZ1bmN0aW9uIChjYXRlZ29yeSkge1xyXG4gIC8vIGluaXRpYWwgcmFkaW9zIG1vZGVsXHJcbiAgc2VsZi51cGRhdGVSYWRpb3NNb2RlbChiYXNlW2NhdGVnb3J5XSk7XHJcbiAgLy8gaW5pdGlhbCBzZWxlY3QgbW9kZWwgKGZpcnN0IG1ldGhvZCBpbiBmaXJzdCBzZWN0aW9uIGZvciBzdGFydClcclxuICBzZWxmLnVwZGF0ZVNlbGVjdChzZWxmLnJhZGlvc01vZGVsKClbMF0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE9uY2hhbmdlIGhhbmRsZXIgZm9yIFJhZGlvIGJ1dHRvbnNcclxuICogQHBhcmFtIGl0ZW1cclxuICovXHJcbk1ldGhvZHNWaWV3TW9kZWwucHJvdG90eXBlLm9uY2hhbmdlUmFkaW9zID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAvL3VwZGF0ZSBSYWRpb3MgTW9kZWxcclxuICBoZi5jaGVja0FjdGl2ZShzZWxmLnJhZGlvc01vZGVsLCBpdGVtLm5hbWUpO1xyXG4gIC8vdXBkYXRlIFNlbGVjdCBNb2RlbFxyXG4gIHNlbGYudXBkYXRlU2VsZWN0KGl0ZW0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWwgYnVpbGQgb2YgUmFkaW9zIE1vZGVsXHJcbiAqIEBwYXJhbSBwYXJhbVxyXG4gKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAqL1xyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS51cGRhdGVSYWRpb3NNb2RlbCA9IGZ1bmN0aW9uIChwYXJhbSkge1xyXG4gIHZhciBvYmogPSBwYXJhbSB8fCB7fSxcclxuICAgIGFyciA9IFtdO1xyXG5cclxuICBmb3IgKHZhciBpIGluIG9iaikge1xyXG4gICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoaSkpIHsgY29udGludWU7IH1cclxuICAgIHZhciBpdGVtID0ge1xyXG4gICAgICBjaGVja2VkOiBrby5vYnNlcnZhYmxlKGkgPT09ICdBTEwnKSxcclxuICAgICAgbmFtZTogaVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoaSA9PT0gJ0FMTCcpIHtcclxuICAgICAgYXJyLnVuc2hpZnQoaXRlbSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFyci5wdXNoKGl0ZW0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHRhcnIgPSBhcnIuc29ydChjb21wYXJlTWV0aG9kcyk7XHJcbiAgdGhpcy5yYWRpb3NNb2RlbChhcnIpO1xyXG4gIHJldHVybiBhcnI7XHJcbn07XHJcblxyXG4vKipcclxuICogSW5pdGlhbCBidWlsZCBvZiBTZWxlY3QgTW9kZWxcclxuICogQHBhcmFtIGl0ZW1cclxuICovXHJcbk1ldGhvZHNWaWV3TW9kZWwucHJvdG90eXBlLnVwZGF0ZVNlbGVjdCA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgdmFyIG9iaiA9IGJhc2Vbc2VsZi5jYXRlZ29yeSgpXVtpdGVtLm5hbWVdfHwge30sXHJcbiAgICBhcnIgPSBbXSxcclxuICAgIGNvdW50ID0gMDtcclxuXHJcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcclxuICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGkpKSB7IGNvbnRpbnVlOyB9XHJcbiAgICB2YXIgcHJvcGVydHkgPSBvYmpbaV07XHJcblx0XHQvLyBjb3BpZXMgYWxsIHZhbHVlcyBmcm9tIG1vZGVsIHRvIHZpZXctbW9kZWxcclxuXHRcdHZhciB2bU1ldGhvZCA9ICQuZXh0ZW5kKHt9LCBwcm9wZXJ0eSk7XHJcblxyXG5cdFx0ZGVsZXRlIHZtTWV0aG9kLnBhcmFtZXRlcnM7XHJcblx0XHR2bU1ldGhvZC5jaGVja2VkID0ga28ub2JzZXJ2YWJsZSghY291bnQpO1xyXG5cclxuXHRcdGFyci5wdXNoKHZtTWV0aG9kKTtcclxuXHJcbiAgICAvLyBzZXQgZ2xvYmFsIG9ic2VydmFibGVcclxuICAgICFjb3VudCAmJiB0aGlzLm1ldGhvZChiYXNlW3Byb3BlcnR5LmNhdGVnb3J5XVtwcm9wZXJ0eS5tZXRob2RdW3Byb3BlcnR5LmlkXSk7XHJcblxyXG4gICAgY291bnQrKztcclxuXHJcbiAgfVxyXG5cclxuXHR0aGlzLm1ldGhvZHNWaWV3TW9kZWwoYXJyKTtcclxuXHRyZXR1cm4gYXJyO1xyXG59O1xyXG5cclxuTWV0aG9kc1ZpZXdNb2RlbC5wcm90b3R5cGUub25TZWxlY3RNZXRob2QgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gIGhmLmNoZWNrQWN0aXZlKHNlbGYubWV0aG9kc1ZpZXdNb2RlbCwgaXRlbS5uYW1lKTtcclxuICBzZWxmLm1ldGhvZChiYXNlW2l0ZW0uY2F0ZWdvcnldW2l0ZW0ubWV0aG9kXVtpdGVtLmlkXSk7XHJcbn07XHJcblxyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS5vbkFib3V0Q2xpY2sgPSBmdW5jdGlvbiAobW9kZWwsIGV2ZW50KSB7XHJcbiAgbW9kZWwudG9nZ2xlUG9wVXAoIW1vZGVsLnRvZ2dsZVBvcFVwKCkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNvcnQgZnVuY3Rpb24gZm9yIG1ldGhvZHMgYXJheVxyXG4gKiBAcGFyYW0gZlxyXG4gKiBAcGFyYW0gc1xyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gY29tcGFyZU1ldGhvZHMoZixzKSB7XHJcblx0dmFyIGEgPSBmLm5hbWUudG9VcHBlckNhc2UoKTtcclxuXHR2YXIgYiA9IHMubmFtZS50b1VwcGVyQ2FzZSgpO1xyXG5cclxuXHRpZiAoYSA9PT0gYikge3JldHVybiAwO31cclxuXHRpZiAoYSA9PT0gJ0FMTCcgfHxcclxuXHRcdChhID09PSAnR0VUJyAmJiAoYiA9PT0gJ1BPU1QnIHx8IGIgPT09ICdQVVQnIHx8IGIgPT09ICdERUxFVEUnKSkgfHxcclxuXHRcdChhID09PSAnUE9TVCcgJiYgKGIgPT09ICdQVVQnIHx8IGIgPT09ICdERUxFVEUnKSkgfHxcclxuXHRcdChhID09PSAnUFVUJyAmJiBiID09PSAnREVMRVRFJykpIHtcclxuXHRcdHJldHVybiAtMTtcclxuXHR9XHJcblx0cmV0dXJuIDE7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTWV0aG9kc1ZpZXdNb2RlbDtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL1ZpZXdNb2RlbHMvbWV0aG9kc1ZpZXdNb2RlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBqc29uSGlnaGxpZ2h0ID0gcmVxdWlyZSgnLi8uLi9tb2R1bGVzL2pzb24taGlnaGxpZ2h0Jyk7XHJcbnZhciBzZWxmO1xyXG52YXIgc2xpZGVyID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9zbGlkZXInKTtcclxuXHJcbmZ1bmN0aW9uIFJlcXVlc3RzTGlzdFZpZXdNb2RlbChyZXF1ZXN0cywgdXJsKSB7XHJcblx0dGhpcy51cmwgPSB1cmw7XHJcblx0c2VsZiA9IHRoaXM7XHJcblx0dGhpcy5jb2xvcnMgPSBbXHJcblx0XHQnY29sdW1uLWNvbG9yLTEnLFxyXG5cdFx0J2NvbHVtbi1jb2xvci0yJyxcclxuXHRcdCdjb2x1bW4tY29sb3ItMycsXHJcblx0XHQnY29sdW1uLWNvbG9yLTQnLFxyXG5cdFx0J2NvbHVtbi1jb2xvci01JyxcclxuXHRcdCdjb2x1bW4tY29sb3ItNicsXHJcblx0XHQnY29sdW1uLWNvbG9yLTcnLFxyXG5cdFx0J2NvbHVtbi1jb2xvci04JyxcclxuXHRcdCdjb2x1bW4tY29sb3ItOScsXHJcblx0XHQnY29sdW1uLWNvbG9yLTEwJyxcclxuXHRcdCdjb2x1bW4tY29sb3ItMTEnLFxyXG5cdFx0J2NvbHVtbi1jb2xvci0xMidcclxuXHRdO1xyXG5cdHRoaXMucmVxdWVzdHMgPSByZXF1ZXN0cztcclxuXHR0aGlzLmlzQWN0aXZlVGFiID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcblx0dGhpcy52aWV3TW9kZWwgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xyXG5cdHRoaXMuY2xlYXJCdG5Jc1Zpc2libGUgPSBrby5jb21wdXRlZCh0aGlzLl9pc1Zpc2libGUsIHRoaXMpO1xyXG5cdHRoaXMucmVxdWVzdHMuc3Vic2NyaWJlKHRoaXMudXBkYXRlTW9kZWwsIHRoaXMpO1xyXG59XHJcblxyXG4vKipcclxuICogVXBkYXRlIFZpZXdtb2RlbCBvZiByZXF1ZXN0IGxpc3RcclxuICogQHBhcmFtIGFyclxyXG4gKi9cclxuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS51cGRhdGVNb2RlbCA9IGZ1bmN0aW9uIChhcnIpIHtcclxuXHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHJcblx0dmFyIG5ld01vZGVsID0gdGhpcy5yZXF1ZXN0cygpXHJcblx0XHQubWFwKGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSAgJC5leHRlbmQoe30sIG9iaiwge1xyXG5cdFx0XHRcdGNvbG9yOiBzZWxmLmNvbG9yc1tvYmouaW5kZXggJSBzZWxmLmNvbG9ycy5sZW5ndGhdLFxyXG5cdFx0XHRcdGFjdGl2ZToga28ub2JzZXJ2YWJsZShmYWxzZSksXHJcblx0XHRcdFx0cmVzSFRNTDoga28ub2JzZXJ2YWJsZSgnJylcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiBpdGVtO1xyXG5cdFx0fSk7XHJcblx0c2xpZGVyLnJlbW92ZShzZWxmLnZpZXdNb2RlbCgpLmxlbmd0aCk7XHJcblx0c2VsZi52aWV3TW9kZWwobmV3TW9kZWwpO1xyXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0c2xpZGVyLnNldChzZWxmLnZpZXdNb2RlbCgpLmxlbmd0aCk7XHJcblx0XHQkKCcjc2hvdy1kZXRhaWxzLTAnKS50cmlnZ2VyKCdjbGljaycpO1xyXG5cdH0sIDEwKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBnZXQgZGV0YWlsc1xyXG4gKiBAcGFyYW0gZGF0YVxyXG4gKi9cclxuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5nZXRNb3JlID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuXHR2YXIgY2FyZCA9IHRoaXM7XHJcblx0dmFyIGN1cnJlbnRTbGlkZXIgPSAkKCcjc2xpZGVyLScgKyBjYXJkLnNlY3Rpb25JbmRleCk7XHJcblx0dmFyIGNvbXBvbmVudCA9ICQoJzxzZWN0aW9uIGRhdGEtYmluZD1cImNvbXBvbmVudDoge25hbWU6IFxcJ3BhbmVsLWdyb3VwXFwnLCBwYXJhbXM6IHBhcmFtc31cIj48L3NlY3Rpb24+Jyk7XHJcblx0dmFyIGN1cnNsaWNrID0gY3VycmVudFNsaWRlci5zbGljaygnZ2V0U2xpY2snKTtcclxuXHR2YXIgbmV3RGF0YSA9IHt9O1xyXG5cdFxyXG5cdC8vIGdhdGhlcmluZyBhbGwgcHJpbWl0aXZlIHByb3BzIGluIGFkZGl0aW9uYWwgcGFuZWxcclxuXHRmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xyXG5cdFx0aWYgKCFkYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuXHRcdFx0Y29udGludWU7XHJcblx0XHR9XHJcblx0XHR2YXIgdmFsID0gZGF0YVtrZXldO1xyXG5cdFx0aWYgKHR5cGVvZiB2YWwgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdG5ld0RhdGFbZGF0YS50eXBlIHx8IE9iamVjdC5rZXlzKGRhdGEpWzBdXSA9IG5ld0RhdGFbZGF0YS50eXBlIHx8IE9iamVjdC5rZXlzKGRhdGEpWzBdXSB8fCB7fTtcclxuXHRcdFx0bmV3RGF0YVtkYXRhLnR5cGUgfHwgT2JqZWN0LmtleXMoZGF0YSlbMF1dW2tleV0gPSB2YWw7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRuZXdEYXRhW2tleV0gPSB2YWw7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdC8vIGV4dGVuZGluZyBhZGRpdGlvbmFsIGRhdGEgKGNvcHkpXHJcblx0dmFyIHBhcmFtcyA9ICQuZXh0ZW5kKHt9LCBjYXJkLCB7Y2FyZHM6IG5ld0RhdGEsIGdyb3VwSW5kZXg6IGNhcmQuZ3JvdXBJbmRleCArIDF9KTtcclxuXHQvLyBhcHBseSBjb21wb25lbnQgZGF0YSBiaW5kaW5nc1xyXG5cdGtvLmFwcGx5QmluZGluZ3Moe1xyXG5cdFx0cGFyYW1zOiBwYXJhbXNcclxuXHR9LCBjb21wb25lbnRbMF0pO1xyXG5cdFxyXG5cdC8vIGFkZCBzbGlkZSB3aXRoIHNlbGVjdGVkIGRhdGFcclxuXHRjdXJyZW50U2xpZGVyLnNsaWNrKCdzbGlja0FkZCcsIGNvbXBvbmVudCk7XHJcblx0XHJcblx0Ly8gcmVtb3ZlIG91dHN0YW5kaW5nIHNsaWRlc1xyXG5cdGZvciAodmFyIGkgPSBjdXJzbGljay5zbGlkZUNvdW50IC0gMjsgaSA+IGNhcmQuZ3JvdXBJbmRleDsgaS0tKSB7XHJcblx0XHRjdXJyZW50U2xpZGVyLnNsaWNrKCdzbGlja1JlbW92ZScsIGksIGZhbHNlKTtcclxuXHR9XHJcblx0Ly8gbW92ZSB0byBuZXh0IHNsaWRlXHJcblx0Y3VycmVudFNsaWRlci5zbGljaygnc2xpY2tOZXh0Jyk7XHJcbn07XHJcblxyXG4vKipcclxuICogVmlzaWJpbGl0eSBmbGFnIGZvciBDbGVhciBidG5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5SZXF1ZXN0c0xpc3RWaWV3TW9kZWwucHJvdG90eXBlLl9pc1Zpc2libGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0cmV0dXJuIHRoaXMucmVxdWVzdHMoKS5sZW5ndGggPiAwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENsZWFyIHJlcXVlc3RzdHMgbGlzdCBoYW5kbGVyXHJcbiAqIEBwYXJhbSB2bVxyXG4gKiBAcGFyYW0gZXZlbnRcclxuICovXHJcblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUub25DbGVhclJlcXVlc3RzID0gZnVuY3Rpb24gKHZtLCBldmVudCkge1xyXG5cdHRoaXMucmVxdWVzdHMoW10pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERldGFpbHMgdG9nZ2xlIGhhbmRsZXJcclxuICogQHBhcmFtIHZtXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuUmVxdWVzdHNMaXN0Vmlld01vZGVsLnByb3RvdHlwZS5nZXREZXRhaWxzID0gZnVuY3Rpb24gKHZtLCBldmVudCkge1xyXG5cdGlmICghdGhpcy5yZXNIVE1MKCkubGVuZ3RoKSB7XHJcblx0XHRqc29uSGlnaGxpZ2h0KHRoaXMucmVzSFRNTCwgdGhpcy5yZXMpO1xyXG5cdH1cclxuXHR0aGlzLmFjdGl2ZSghdGhpcy5hY3RpdmUoKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogSm9pbiBzdHJpbmcgZm9yIGlkJ3NcclxuICogQHBhcmFtIHNcclxuICogQHBhcmFtIGlcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcblJlcXVlc3RzTGlzdFZpZXdNb2RlbC5wcm90b3R5cGUuZ2V0U3RyID0gZnVuY3Rpb24gKHMsIGkpIHtcclxuXHR2YXIgc3RyID0gcztcclxuXHR2YXIgaTEgPSBpID8gaSgpIDogJyc7XHJcblx0cmV0dXJuIFtcclxuXHRcdHN0cixcclxuXHRcdGkxXHJcblx0XS5qb2luKCctJyk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlcXVlc3RzTGlzdFZpZXdNb2RlbDtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL1ZpZXdNb2RlbHMvcmVxdWVzdHNMaXN0Vmlld01vZGVsLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBXb3JrZXIgPSByZXF1aXJlKCcuL2hpZ2hsaWdodEpzb24ud29ya2VyLmpzJyk7IC8vIEpzb24tZm9ybWF0dGVyIHdvcmtlclxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JzZXJ2YWJsZSwgY29kZSkge1xyXG5cdHZhciBhbmltVGltZSA9IDEwMDtcclxuXHR2YXIgd29ya2VyID0gbmV3IFdvcmtlcjtcclxuXHJcblx0d29ya2VyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0b2JzZXJ2YWJsZShldmVudC5kYXRhKTtcclxuXHJcblx0XHQkKGRvY3VtZW50KVxyXG5cdFx0XHQub24oJ2NsaWNrIHRvdWNoJywgJy50bS1jb2RlLWNvbnRhaW5lciAuZXhwYW5kZWQnLCBmdW5jdGlvbiBqc29uQ29kZUNvbnRhaW5lckV4cGFuZGVkKGUpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHR2YXIgJHNlbGYgPSAkKHRoaXMpO1xyXG5cdFx0XHRcdCRzZWxmXHJcblx0XHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHRcdC5maW5kKCc+dWwnKVxyXG5cdFx0XHRcdFx0LnNsaWRlVXAoYW5pbVRpbWUsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHQkc2VsZi5hZGRDbGFzcygnY29sbGFwc2VkJyk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHRcdFx0Lm9uKCdjbGljayB0b3VjaCcsICcudG0tY29kZS1jb250YWluZXIgLmV4cGFuZGVkLmNvbGxhcHNlZCcsIGZ1bmN0aW9uIGpzb25Db2RlQ29udGFpbmVyQ29sbGFwc2VkKGUpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHR2YXIgJHNlbGYgPSAkKHRoaXMpO1xyXG5cdFx0XHRcdCRzZWxmXHJcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpXHJcblx0XHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHRcdC5maW5kKCc+dWwnKVxyXG5cdFx0XHRcdFx0LnNsaWRlRG93bihhbmltVGltZSwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdCRzZWxmXHJcblx0XHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKVxyXG5cdFx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHR9O1xyXG5cdHdvcmtlci5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRjb25zb2xlLmxvZyhldmVudCk7XHJcblx0fTtcclxuXHJcblx0d29ya2VyLnBvc3RNZXNzYWdlKGNvZGUpO1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvbW9kdWxlcy9qc29uLWhpZ2hsaWdodC5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gcmVxdWlyZShcIiEhZDpcXFxccHJvamVjdHNcXFxcdGlja2V0bWFzdGVyXFxcXG5vZGVfbW9kdWxlc1xcXFx3b3JrZXItbG9hZGVyXFxcXGNyZWF0ZUlubGluZVdvcmtlci5qc1wiKShcIi8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcXG4vKioqKioqLyBcXHQvLyBUaGUgbW9kdWxlIGNhY2hlXFxuLyoqKioqKi8gXFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXFxuLyoqKioqKi8gXFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0XFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXFxuLyoqKioqKi8gXFx0XFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXFxuLyoqKioqKi8gXFx0XFx0XFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHRcXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxcbi8qKioqKiovIFxcdFxcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcXG4vKioqKioqLyBcXHRcXHRcXHRleHBvcnRzOiB7fSxcXG4vKioqKioqLyBcXHRcXHRcXHRpZDogbW9kdWxlSWQsXFxuLyoqKioqKi8gXFx0XFx0XFx0bG9hZGVkOiBmYWxzZVxcbi8qKioqKiovIFxcdFxcdH07XFxuLyoqKioqKi9cXG4vKioqKioqLyBcXHRcXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cXG4vKioqKioqLyBcXHRcXHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdFxcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcXG4vKioqKioqLyBcXHRcXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdFxcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXFxuLyoqKioqKi8gXFx0XFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xcbi8qKioqKiovIFxcdH1cXG4vKioqKioqL1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcXG4vKioqKioqLyBcXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcXG4vKioqKioqLyBcXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xcbi8qKioqKiovXFxuLyoqKioqKi8gXFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cXG4vKioqKioqLyBcXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcXFwiXFxcIjtcXG4vKioqKioqL1xcbi8qKioqKiovIFxcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xcbi8qKioqKiovIFxcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xcbi8qKioqKiovIH0pXFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cXG4vKioqKioqLyAoW1xcbi8qIDAgKi9cXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcXG5cXG5cXHQvKipcXHJcXG5cXHQgKiBDb2RlIGZvcm1hdCB3ZWItd29ya2VyXFxyXFxuXFx0ICogQHBhcmFtIGV2ZW50XFxyXFxuXFx0ICovXFxyXFxuXFx0Ly8gdmFyIGhpZ2hsaWdodEpzb24oKVxcclxcblxcdHZhciBoaWdobGlnaHRKc29uID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcXHJcXG5cXHRcXHJcXG5cXHRvbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xcclxcblxcdCAgdmFyIGNvZGUgPSBldmVudC5kYXRhO1xcclxcblxcdCAgLy8gaW1wb3J0U2NyaXB0cygnanNvbi1wYXJzZS5qcycpO1xcclxcblxcdCAgdmFyIHJlc3VsdCA9IGhpZ2hsaWdodEpzb24oY29kZSwge2V4cGFuZGVkOiB0cnVlfSk7XFxyXFxuXFx0ICAvLyB2YXIgcmVzdWx0ID1KU09OLnN0cmluZ2lmeShjb2RlKTtcXHJcXG5cXHQgIHBvc3RNZXNzYWdlKHJlc3VsdCk7XFxyXFxuXFx0fTtcXHJcXG5cXG5cXG4vKioqLyB9LFxcbi8qIDEgKi9cXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcXG5cXG5cXHR2YXIgcHJlZml4ID0gJ3RtLWNvZGUnO1xcclxcblxcdFxcclxcblxcdHZhciBnZXRFeHBhbmRlckNsYXNzZXMgPSBmdW5jdGlvbiAoZXhwYW5kZWQpIHtcXHJcXG5cXHRcXHRpZiAoIWV4cGFuZGVkKSB7XFxyXFxuXFx0XFx0XFx0cmV0dXJuICdleHBhbmRlZCBjb2xsYXBzZWQgaGlkZGVuJztcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFx0cmV0dXJuICdleHBhbmRlZCc7XFxyXFxuXFx0fTtcXHJcXG5cXHRcXHJcXG5cXHR2YXIgZW5jb2RlID0gZnVuY3Rpb24gKHZhbHVlKSB7XFxyXFxuXFx0XFx0cmV0dXJuIFsnPHNwYW4+JywgdmFsdWUsICc8L3NwYW4+J10uam9pbignJyk7XFxyXFxuXFx0fTtcXHJcXG5cXHRcXHJcXG5cXHR2YXIgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlLCB0eXBlLCBleHBhbmRlckNsYXNzZXMpIHtcXHJcXG5cXHRcXHR2YXIga2xhc3MgPSAnb2JqZWN0JyxcXHJcXG5cXHRcXHRcXHRvcGVuID0gJ3snLFxcclxcblxcdFxcdFxcdGNsb3NlID0gJ30nO1xcclxcblxcdFxcclxcblxcdFxcdGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xcclxcblxcdFxcdFxcdGtsYXNzID0gJ2FycmF5JztcXHJcXG5cXHRcXHRcXHRvcGVuID0gJ1snO1xcclxcblxcdFxcdFxcdGNsb3NlID0gJ10nO1xcclxcblxcdFxcdH1cXHJcXG5cXHRcXHJcXG5cXHRcXHRpZiAodmFsdWUgPT09IG51bGwpIHtcXHJcXG5cXHRcXHRcXHRyZXR1cm4gW1xcclxcblxcdFxcdFxcdFxcdCc8bGk+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcImtleVxcXCI+XFxcIicsIGVuY29kZShrZXkpLCAnXFxcIjogPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJudWxsXFxcIj5cXFwiJywgZW5jb2RlKHZhbHVlKSwgJ1xcXCI8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHRcXHQnPC9saT4nXFxyXFxuXFx0XFx0XFx0XS5qb2luKCcnKTtcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFxyXFxuXFx0XFx0aWYgKHR5cGUgPT0gJ29iamVjdCcpIHtcXHJcXG5cXHRcXHRcXHRyZXR1cm4gW1xcclxcblxcdFxcdFxcdFxcdCc8bGk+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcIicsIGV4cGFuZGVyQ2xhc3NlcywgJ1xcXCI+PC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJrZXlcXFwiPlxcXCInLCBlbmNvZGUoa2V5KSwgJ1xcXCI6IDwvc3Bhbj4gJyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcIm9wZW5cXFwiPicsIG9wZW4sICc8L3NwYW4+ICcsXFxyXFxuXFx0XFx0XFx0XFx0XFx0Jzx1bCBjbGFzcz1cXFwiJywga2xhc3MsICdcXFwiPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0XFx0anNvbjJodG1sKHZhbHVlLCBleHBhbmRlckNsYXNzZXMpLFxcclxcblxcdFxcdFxcdFxcdFxcdCc8L3VsPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCJjbG9zZVxcXCI+JywgY2xvc2UsICc8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHRcXHQnPC9saT4nXFxyXFxuXFx0XFx0XFx0XS5qb2luKCcnKTtcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFxyXFxuXFx0XFx0aWYgKHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnYm9vbGVhbicpIHtcXHJcXG5cXHRcXHRcXHRyZXR1cm4gW1xcclxcblxcdFxcdFxcdFxcdCc8bGk+JyxcXHJcXG5cXHRcXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcImtleVxcXCI+XFxcIicsIGVuY29kZShrZXkpLCAnXFxcIjogPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0JzxzcGFuIGNsYXNzPVxcXCInLCB0eXBlLCAnXFxcIj4nLCBlbmNvZGUodmFsdWUpLCAnPC9zcGFuPicsXFxyXFxuXFx0XFx0XFx0XFx0JzwvbGk+J1xcclxcblxcdFxcdFxcdF0uam9pbignJyk7XFxyXFxuXFx0XFx0fVxcclxcblxcdFxcdHJldHVybiBbXFxyXFxuXFx0XFx0XFx0JzxsaT4nLFxcclxcblxcdFxcdFxcdFxcdCc8c3BhbiBjbGFzcz1cXFwia2V5XFxcIj5cXFwiJywgZW5jb2RlKGtleSksICdcXFwiOiA8L3NwYW4+JyxcXHJcXG5cXHRcXHRcXHRcXHQnPHNwYW4gY2xhc3M9XFxcIicsIHR5cGUsICdcXFwiPlxcXCInLCBlbmNvZGUodmFsdWUpLCAnXFxcIjwvc3Bhbj4nLFxcclxcblxcdFxcdFxcdCc8L2xpPidcXHJcXG5cXHRcXHRdLmpvaW4oJycpO1xcclxcblxcdH07XFxyXFxuXFx0XFxyXFxuXFx0dmFyIGpzb24yaHRtbCA9IGZ1bmN0aW9uIChqc29uLCBleHBhbmRlckNsYXNzZXMpIHtcXHJcXG5cXHRcXHR2YXIgaHRtbCA9ICcnO1xcclxcblxcdFxcdGZvciAodmFyIGtleSBpbiBqc29uKSB7XFxyXFxuXFx0XFx0XFx0aWYgKCFqc29uLmhhc093blByb3BlcnR5KGtleSkpIHtcXHJcXG5cXHRcXHRcXHRcXHRjb250aW51ZTtcXHJcXG5cXHRcXHRcXHR9XFxyXFxuXFx0XFxyXFxuXFx0XFx0XFx0aHRtbCA9IFtodG1sLCBjcmVhdGVFbGVtZW50KGtleSwganNvbltrZXldLCB0eXBlb2YganNvbltrZXldLCBleHBhbmRlckNsYXNzZXMpXS5qb2luKCcnKTtcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFx0cmV0dXJuIGh0bWw7XFxyXFxuXFx0fTtcXHJcXG5cXHRcXHJcXG5cXHR2YXIgZ2V0SnNvblZpZXdlciA9IGZ1bmN0aW9uIChkYXRhLCBvcHRpb25zKSB7XFxyXFxuXFx0XFx0dHJ5IHtcXHJcXG5cXHRcXHRcXHRyZXR1cm4gW1xcclxcblxcdFxcdFxcdFxcdCc8dWwgY2xhc3M9XFxcIicsIHByZWZpeCwgJy1jb250YWluZXJcXFwiPicsXFxyXFxuXFx0XFx0XFx0XFx0XFx0anNvbjJodG1sKFtKU09OLnBhcnNlKGRhdGEpXSwgZ2V0RXhwYW5kZXJDbGFzc2VzKG9wdGlvbnMuZXhwYW5kZWQpKSxcXHJcXG5cXHRcXHRcXHRcXHQnPC91bD4nXFxyXFxuXFx0XFx0XFx0XS5qb2luKCcnKTtcXHJcXG5cXHRcXHR9IGNhdGNoIChlKSB7XFxyXFxuXFx0XFx0XFx0cmV0dXJuIFtcXHJcXG5cXHRcXHRcXHRcXHQnPGRpdiBjbGFzcz1cXFwiJywgcHJlZml4LCAnLWVycm9yXFxcIiA+JywgZS50b1N0cmluZygpLCAnIDwvZGl2PidcXHJcXG5cXHRcXHRcXHRdLmpvaW4oJycpO1xcclxcblxcdFxcdH1cXHJcXG5cXHR9O1xcclxcblxcdFxcclxcblxcdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSwgb3B0KSB7XFxyXFxuXFx0XFx0dmFyIGpzb24gPSAnJztcXHJcXG5cXHRcXHR2YXIgb3B0aW9ucyA9IG9wdCB8fCB7ZXhwYW5kZWQ6IHRydWV9O1xcclxcblxcdFxcdGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykge1xcclxcblxcdFxcdFxcdGpzb24gPSBkYXRhO1xcclxcblxcdFxcdH0gZWxzZSBpZiAodHlwZW9mIGRhdGEgPT0gJ29iamVjdCcpIHtcXHJcXG5cXHRcXHRcXHRqc29uID0gSlNPTi5zdHJpbmdpZnkoZGF0YSlcXHJcXG5cXHRcXHR9XFxyXFxuXFx0XFx0cmV0dXJuIGdldEpzb25WaWV3ZXIoanNvbiwgb3B0aW9ucyk7XFxyXFxuXFx0fTtcXHJcXG5cXG5cXG4vKioqLyB9XFxuLyoqKioqKi8gXSk7XFxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5kbFluQmhZMnM2THk4dmQyVmljR0ZqYXk5aWIyOTBjM1J5WVhBZ05EY3hZakV3WkRRMFkyRTNNamd3WlRFeE5HRWlMQ0ozWldKd1lXTnJPaTh2THk0dmMyTnlhWEIwY3k5aGNHa3RaWGh3Ykc5eVpYSXZkakl2Ylc5a2RXeGxjeTlvYVdkb2JHbG5hSFJLYzI5dUxuZHZjbXRsY2k1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5elkzSnBjSFJ6TDJGd2FTMWxlSEJzYjNKbGNpOTJNaTl0YjJSMWJHVnpMMnB6YjI0dGNHRnljMlV1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTEhWQ1FVRmxPMEZCUTJZN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPenRCUVVkQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPenM3T3pzN1FVTjBRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEhGRFFVRnZReXhsUVVGbE8wRkJRMjVFTzBGQlEwRTdRVUZEUVRzN096czdPenRCUTJKQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQkxGbEJRVmM3UVVGRFdDeGhRVUZaT3p0QlFVVmFPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNSMEZCUlR0QlFVTkdPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJMSGRDUVVGMVFqdEJRVU4yUWp0QlFVTkJPMEZCUTBFc1IwRkJSVHRCUVVOR08wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1ocFoyaHNhV2RvZEVwemIyNHVkMjl5YTJWeUxtcHpJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpSUZ4MEx5OGdWR2hsSUcxdlpIVnNaU0JqWVdOb1pWeHVJRngwZG1GeUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhNZ1BTQjdmVHRjYmx4dUlGeDBMeThnVkdobElISmxjWFZwY21VZ1puVnVZM1JwYjI1Y2JpQmNkR1oxYm1OMGFXOXVJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThvYlc5a2RXeGxTV1FwSUh0Y2JseHVJRngwWEhRdkx5QkRhR1ZqYXlCcFppQnRiMlIxYkdVZ2FYTWdhVzRnWTJGamFHVmNiaUJjZEZ4MGFXWW9hVzV6ZEdGc2JHVmtUVzlrZFd4bGMxdHRiMlIxYkdWSlpGMHBYRzRnWEhSY2RGeDBjbVYwZFhKdUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhOYmJXOWtkV3hsU1dSZExtVjRjRzl5ZEhNN1hHNWNiaUJjZEZ4MEx5OGdRM0psWVhSbElHRWdibVYzSUcxdlpIVnNaU0FvWVc1a0lIQjFkQ0JwZENCcGJuUnZJSFJvWlNCallXTm9aU2xjYmlCY2RGeDBkbUZ5SUcxdlpIVnNaU0E5SUdsdWMzUmhiR3hsWkUxdlpIVnNaWE5iYlc5a2RXeGxTV1JkSUQwZ2UxeHVJRngwWEhSY2RHVjRjRzl5ZEhNNklIdDlMRnh1SUZ4MFhIUmNkR2xrT2lCdGIyUjFiR1ZKWkN4Y2JpQmNkRngwWEhSc2IyRmtaV1E2SUdaaGJITmxYRzRnWEhSY2RIMDdYRzVjYmlCY2RGeDBMeThnUlhobFkzVjBaU0IwYUdVZ2JXOWtkV3hsSUdaMWJtTjBhVzl1WEc0Z1hIUmNkRzF2WkhWc1pYTmJiVzlrZFd4bFNXUmRMbU5oYkd3b2JXOWtkV3hsTG1WNGNHOXlkSE1zSUcxdlpIVnNaU3dnYlc5a2RXeGxMbVY0Y0c5eWRITXNJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThwTzF4dVhHNGdYSFJjZEM4dklFWnNZV2NnZEdobElHMXZaSFZzWlNCaGN5QnNiMkZrWldSY2JpQmNkRngwYlc5a2RXeGxMbXh2WVdSbFpDQTlJSFJ5ZFdVN1hHNWNiaUJjZEZ4MEx5OGdVbVYwZFhKdUlIUm9aU0JsZUhCdmNuUnpJRzltSUhSb1pTQnRiMlIxYkdWY2JpQmNkRngwY21WMGRYSnVJRzF2WkhWc1pTNWxlSEJ2Y25Sek8xeHVJRngwZlZ4dVhHNWNiaUJjZEM4dklHVjRjRzl6WlNCMGFHVWdiVzlrZFd4bGN5QnZZbXBsWTNRZ0tGOWZkMlZpY0dGamExOXRiMlIxYkdWelgxOHBYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtMGdQU0J0YjJSMWJHVnpPMXh1WEc0Z1hIUXZMeUJsZUhCdmMyVWdkR2hsSUcxdlpIVnNaU0JqWVdOb1pWeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1aklEMGdhVzV6ZEdGc2JHVmtUVzlrZFd4bGN6dGNibHh1SUZ4MEx5OGdYMTkzWldKd1lXTnJYM0IxWW14cFkxOXdZWFJvWDE5Y2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1Y0NBOUlGd2lYQ0k3WEc1Y2JpQmNkQzh2SUV4dllXUWdaVzUwY25rZ2JXOWtkV3hsSUdGdVpDQnlaWFIxY200Z1pYaHdiM0owYzF4dUlGeDBjbVYwZFhKdUlGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9NQ2s3WEc1Y2JseHVYRzR2S2lvZ1YwVkNVRUZEU3lCR1QwOVVSVklnS2lwY2JpQXFLaUIzWldKd1lXTnJMMkp2YjNSemRISmhjQ0EwTnpGaU1UQmtORFJqWVRjeU9EQmxNVEUwWVZ4dUlDb3FMeUlzSWk4cUtseHlYRzRnS2lCRGIyUmxJR1p2Y20xaGRDQjNaV0l0ZDI5eWEyVnlYSEpjYmlBcUlFQndZWEpoYlNCbGRtVnVkRnh5WEc0Z0tpOWNjbHh1THk4Z2RtRnlJR2hwWjJoc2FXZG9kRXB6YjI0b0tWeHlYRzUyWVhJZ2FHbG5hR3hwWjJoMFNuTnZiaUE5SUhKbGNYVnBjbVVvSnk0dmFuTnZiaTF3WVhKelpTY3BPMXh5WEc1Y2NseHViMjV0WlhOellXZGxJRDBnWm5WdVkzUnBiMjRvWlhabGJuUXBJSHRjY2x4dUlDQjJZWElnWTI5a1pTQTlJR1YyWlc1MExtUmhkR0U3WEhKY2JpQWdMeThnYVcxd2IzSjBVMk55YVhCMGN5Z25hbk52Ymkxd1lYSnpaUzVxY3ljcE8xeHlYRzRnSUhaaGNpQnlaWE4xYkhRZ1BTQm9hV2RvYkdsbmFIUktjMjl1S0dOdlpHVXNJSHRsZUhCaGJtUmxaRG9nZEhKMVpYMHBPMXh5WEc0Z0lDOHZJSFpoY2lCeVpYTjFiSFFnUFVwVFQwNHVjM1J5YVc1bmFXWjVLR052WkdVcE8xeHlYRzRnSUhCdmMzUk5aWE56WVdkbEtISmxjM1ZzZENrN1hISmNibjA3WEhKY2JseHVYRzVjYmk4cUtpb3FLaW9xS2lvcUtpb3FLaW9xS2x4dUlDb3FJRmRGUWxCQlEwc2dSazlQVkVWU1hHNGdLaW9nTGk5elkzSnBjSFJ6TDJGd2FTMWxlSEJzYjNKbGNpOTJNaTl0YjJSMWJHVnpMMmhwWjJoc2FXZG9kRXB6YjI0dWQyOXlhMlZ5TG1welhHNGdLaW9nYlc5a2RXeGxJR2xrSUQwZ01GeHVJQ29xSUcxdlpIVnNaU0JqYUhWdWEzTWdQU0F3WEc0Z0tpb3ZJaXdpZG1GeUlIQnlaV1pwZUNBOUlDZDBiUzFqYjJSbEp6dGNjbHh1WEhKY2JuWmhjaUJuWlhSRmVIQmhibVJsY2tOc1lYTnpaWE1nUFNCbWRXNWpkR2x2YmlBb1pYaHdZVzVrWldRcElIdGNjbHh1WEhScFppQW9JV1Y0Y0dGdVpHVmtLU0I3WEhKY2JseDBYSFJ5WlhSMWNtNGdKMlY0Y0dGdVpHVmtJR052Ykd4aGNITmxaQ0JvYVdSa1pXNG5PMXh5WEc1Y2RIMWNjbHh1WEhSeVpYUjFjbTRnSjJWNGNHRnVaR1ZrSnp0Y2NseHVmVHRjY2x4dVhISmNiblpoY2lCbGJtTnZaR1VnUFNCbWRXNWpkR2x2YmlBb2RtRnNkV1VwSUh0Y2NseHVYSFJ5WlhSMWNtNGdXeWM4YzNCaGJqNG5MQ0IyWVd4MVpTd2dKend2YzNCaGJqNG5YUzVxYjJsdUtDY25LVHRjY2x4dWZUdGNjbHh1WEhKY2JuWmhjaUJqY21WaGRHVkZiR1Z0Wlc1MElEMGdablZ1WTNScGIyNGdLR3RsZVN3Z2RtRnNkV1VzSUhSNWNHVXNJR1Y0Y0dGdVpHVnlRMnhoYzNObGN5a2dlMXh5WEc1Y2RIWmhjaUJyYkdGemN5QTlJQ2R2WW1wbFkzUW5MRnh5WEc1Y2RGeDBiM0JsYmlBOUlDZDdKeXhjY2x4dVhIUmNkR05zYjNObElEMGdKMzBuTzF4eVhHNWNjbHh1WEhScFppQW9RWEp5WVhrdWFYTkJjbkpoZVNoMllXeDFaU2twSUh0Y2NseHVYSFJjZEd0c1lYTnpJRDBnSjJGeWNtRjVKenRjY2x4dVhIUmNkRzl3Wlc0Z1BTQW5XeWM3WEhKY2JseDBYSFJqYkc5elpTQTlJQ2RkSnp0Y2NseHVYSFI5WEhKY2JseHlYRzVjZEdsbUlDaDJZV3gxWlNBOVBUMGdiblZzYkNrZ2UxeHlYRzVjZEZ4MGNtVjBkWEp1SUZ0Y2NseHVYSFJjZEZ4MEp6eHNhVDRuTEZ4eVhHNWNkRngwWEhSY2RDYzhjM0JoYmlCamJHRnpjejFjSW10bGVWd2lQbHdpSnl3Z1pXNWpiMlJsS0d0bGVTa3NJQ2RjSWpvZ1BDOXpjR0Z1UGljc1hISmNibHgwWEhSY2RGeDBKenh6Y0dGdUlHTnNZWE56UFZ3aWJuVnNiRndpUGx3aUp5d2daVzVqYjJSbEtIWmhiSFZsS1N3Z0oxd2lQQzl6Y0dGdVBpY3NYSEpjYmx4MFhIUmNkQ2M4TDJ4cFBpZGNjbHh1WEhSY2RGMHVhbTlwYmlnbkp5azdYSEpjYmx4MGZWeHlYRzVjY2x4dVhIUnBaaUFvZEhsd1pTQTlQU0FuYjJKcVpXTjBKeWtnZTF4eVhHNWNkRngwY21WMGRYSnVJRnRjY2x4dVhIUmNkRngwSnp4c2FUNG5MRnh5WEc1Y2RGeDBYSFJjZENjOGMzQmhiaUJqYkdGemN6MWNJaWNzSUdWNGNHRnVaR1Z5UTJ4aGMzTmxjeXdnSjF3aVBqd3ZjM0JoYmo0bkxGeHlYRzVjZEZ4MFhIUmNkQ2M4YzNCaGJpQmpiR0Z6Y3oxY0ltdGxlVndpUGx3aUp5d2daVzVqYjJSbEtHdGxlU2tzSUNkY0lqb2dQQzl6Y0dGdVBpQW5MRnh5WEc1Y2RGeDBYSFJjZENjOGMzQmhiaUJqYkdGemN6MWNJbTl3Wlc1Y0lqNG5MQ0J2Y0dWdUxDQW5QQzl6Y0dGdVBpQW5MRnh5WEc1Y2RGeDBYSFJjZENjOGRXd2dZMnhoYzNNOVhDSW5MQ0JyYkdGemN5d2dKMXdpUGljc1hISmNibHgwWEhSY2RGeDBYSFJxYzI5dU1taDBiV3dvZG1Gc2RXVXNJR1Y0Y0dGdVpHVnlRMnhoYzNObGN5a3NYSEpjYmx4MFhIUmNkRngwSnp3dmRXdytKeXhjY2x4dVhIUmNkRngwWEhRblBITndZVzRnWTJ4aGMzTTlYQ0pqYkc5elpWd2lQaWNzSUdOc2IzTmxMQ0FuUEM5emNHRnVQaWNzWEhKY2JseDBYSFJjZENjOEwyeHBQaWRjY2x4dVhIUmNkRjB1YW05cGJpZ25KeWs3WEhKY2JseDBmVnh5WEc1Y2NseHVYSFJwWmlBb2RIbHdaU0E5UFNBbmJuVnRZbVZ5SnlCOGZDQjBlWEJsSUQwOUlDZGliMjlzWldGdUp5a2dlMXh5WEc1Y2RGeDBjbVYwZFhKdUlGdGNjbHh1WEhSY2RGeDBKenhzYVQ0bkxGeHlYRzVjZEZ4MFhIUmNkQ2M4YzNCaGJpQmpiR0Z6Y3oxY0ltdGxlVndpUGx3aUp5d2daVzVqYjJSbEtHdGxlU2tzSUNkY0lqb2dQQzl6Y0dGdVBpY3NYSEpjYmx4MFhIUmNkRngwSnp4emNHRnVJR05zWVhOelBWd2lKeXdnZEhsd1pTd2dKMXdpUGljc0lHVnVZMjlrWlNoMllXeDFaU2tzSUNjOEwzTndZVzQrSnl4Y2NseHVYSFJjZEZ4MEp6d3ZiR2srSjF4eVhHNWNkRngwWFM1cWIybHVLQ2NuS1R0Y2NseHVYSFI5WEhKY2JseDBjbVYwZFhKdUlGdGNjbHh1WEhSY2RDYzhiR2srSnl4Y2NseHVYSFJjZEZ4MEp6eHpjR0Z1SUdOc1lYTnpQVndpYTJWNVhDSStYQ0luTENCbGJtTnZaR1VvYTJWNUtTd2dKMXdpT2lBOEwzTndZVzQrSnl4Y2NseHVYSFJjZEZ4MEp6eHpjR0Z1SUdOc1lYTnpQVndpSnl3Z2RIbHdaU3dnSjF3aVBsd2lKeXdnWlc1amIyUmxLSFpoYkhWbEtTd2dKMXdpUEM5emNHRnVQaWNzWEhKY2JseDBYSFFuUEM5c2FUNG5YSEpjYmx4MFhTNXFiMmx1S0NjbktUdGNjbHh1ZlR0Y2NseHVYSEpjYm5aaGNpQnFjMjl1TW1oMGJXd2dQU0JtZFc1amRHbHZiaUFvYW5OdmJpd2daWGh3WVc1a1pYSkRiR0Z6YzJWektTQjdYSEpjYmx4MGRtRnlJR2gwYld3Z1BTQW5KenRjY2x4dVhIUm1iM0lnS0haaGNpQnJaWGtnYVc0Z2FuTnZiaWtnZTF4eVhHNWNkRngwYVdZZ0tDRnFjMjl1TG1oaGMwOTNibEJ5YjNCbGNuUjVLR3RsZVNrcElIdGNjbHh1WEhSY2RGeDBZMjl1ZEdsdWRXVTdYSEpjYmx4MFhIUjlYSEpjYmx4eVhHNWNkRngwYUhSdGJDQTlJRnRvZEcxc0xDQmpjbVZoZEdWRmJHVnRaVzUwS0d0bGVTd2dhbk52Ymx0clpYbGRMQ0IwZVhCbGIyWWdhbk52Ymx0clpYbGRMQ0JsZUhCaGJtUmxja05zWVhOelpYTXBYUzVxYjJsdUtDY25LVHRjY2x4dVhIUjlYSEpjYmx4MGNtVjBkWEp1SUdoMGJXdzdYSEpjYm4wN1hISmNibHh5WEc1MllYSWdaMlYwU25OdmJsWnBaWGRsY2lBOUlHWjFibU4wYVc5dUlDaGtZWFJoTENCdmNIUnBiMjV6S1NCN1hISmNibHgwZEhKNUlIdGNjbHh1WEhSY2RISmxkSFZ5YmlCYlhISmNibHgwWEhSY2RDYzhkV3dnWTJ4aGMzTTlYQ0luTENCd2NtVm1hWGdzSUNjdFkyOXVkR0ZwYm1WeVhDSStKeXhjY2x4dVhIUmNkRngwWEhScWMyOXVNbWgwYld3b1cwcFRUMDR1Y0dGeWMyVW9aR0YwWVNsZExDQm5aWFJGZUhCaGJtUmxja05zWVhOelpYTW9iM0IwYVc5dWN5NWxlSEJoYm1SbFpDa3BMRnh5WEc1Y2RGeDBYSFFuUEM5MWJENG5YSEpjYmx4MFhIUmRMbXB2YVc0b0p5Y3BPMXh5WEc1Y2RIMGdZMkYwWTJnZ0tHVXBJSHRjY2x4dVhIUmNkSEpsZEhWeWJpQmJYSEpjYmx4MFhIUmNkQ2M4WkdsMklHTnNZWE56UFZ3aUp5d2djSEpsWm1sNExDQW5MV1Z5Y205eVhDSWdQaWNzSUdVdWRHOVRkSEpwYm1jb0tTd2dKeUE4TDJScGRqNG5YSEpjYmx4MFhIUmRMbXB2YVc0b0p5Y3BPMXh5WEc1Y2RIMWNjbHh1ZlR0Y2NseHVYSEpjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRvWkdGMFlTd2diM0IwS1NCN1hISmNibHgwZG1GeUlHcHpiMjRnUFNBbkp6dGNjbHh1WEhSMllYSWdiM0IwYVc5dWN5QTlJRzl3ZENCOGZDQjdaWGh3WVc1a1pXUTZJSFJ5ZFdWOU8xeHlYRzVjZEdsbUlDaDBlWEJsYjJZZ1pHRjBZU0E5UFNBbmMzUnlhVzVuSnlrZ2UxeHlYRzVjZEZ4MGFuTnZiaUE5SUdSaGRHRTdYSEpjYmx4MGZTQmxiSE5sSUdsbUlDaDBlWEJsYjJZZ1pHRjBZU0E5UFNBbmIySnFaV04wSnlrZ2UxeHlYRzVjZEZ4MGFuTnZiaUE5SUVwVFQwNHVjM1J5YVc1bmFXWjVLR1JoZEdFcFhISmNibHgwZlZ4eVhHNWNkSEpsZEhWeWJpQm5aWFJLYzI5dVZtbGxkMlZ5S0dwemIyNHNJRzl3ZEdsdmJuTXBPMXh5WEc1OU8xeHlYRzVjYmx4dVhHNHZLaW9xS2lvcUtpb3FLaW9xS2lvcUtpcGNiaUFxS2lCWFJVSlFRVU5MSUVaUFQxUkZVbHh1SUNvcUlDNHZjMk55YVhCMGN5OWhjR2t0Wlhod2JHOXlaWEl2ZGpJdmJXOWtkV3hsY3k5cWMyOXVMWEJoY25ObExtcHpYRzRnS2lvZ2JXOWtkV3hsSUdsa0lEMGdNVnh1SUNvcUlHMXZaSFZzWlNCamFIVnVhM01nUFNBd1hHNGdLaW92SWwwc0luTnZkWEpqWlZKdmIzUWlPaUlpZlE9PVwiLCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaGlnaGxpZ2h0SnNvbi53b3JrZXIuanNcIik7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9tb2R1bGVzL2hpZ2hsaWdodEpzb24ud29ya2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTAzNDM5MTMvaG93LXRvLWNyZWF0ZS1hLXdlYi13b3JrZXItZnJvbS1hLXN0cmluZ1xyXG5cclxudmFyIFVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTDtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihjb250ZW50LCB1cmwpIHtcclxuXHR0cnkge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0dmFyIGJsb2I7XHJcblx0XHRcdHRyeSB7IC8vIEJsb2JCdWlsZGVyID0gRGVwcmVjYXRlZCwgYnV0IHdpZGVseSBpbXBsZW1lbnRlZFxyXG5cdFx0XHRcdHZhciBCbG9iQnVpbGRlciA9IHdpbmRvdy5CbG9iQnVpbGRlciB8fCB3aW5kb3cuV2ViS2l0QmxvYkJ1aWxkZXIgfHwgd2luZG93Lk1vekJsb2JCdWlsZGVyIHx8IHdpbmRvdy5NU0Jsb2JCdWlsZGVyO1xyXG5cdFx0XHRcdGJsb2IgPSBuZXcgQmxvYkJ1aWxkZXIoKTtcclxuXHRcdFx0XHRibG9iLmFwcGVuZChjb250ZW50KTtcclxuXHRcdFx0XHRibG9iID0gYmxvYi5nZXRCbG9iKCk7XHJcblx0XHRcdH0gY2F0Y2goZSkgeyAvLyBUaGUgcHJvcG9zZWQgQVBJXHJcblx0XHRcdFx0YmxvYiA9IG5ldyBCbG9iKFtjb250ZW50XSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG5ldyBXb3JrZXIoVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKSk7XHJcblx0XHR9IGNhdGNoKGUpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBXb3JrZXIoJ2RhdGE6YXBwbGljYXRpb24vamF2YXNjcmlwdCwnICsgZW5jb2RlVVJJQ29tcG9uZW50KGNvbnRlbnQpKTtcclxuXHRcdH1cclxuXHR9IGNhdGNoKGUpIHtcclxuXHRcdHJldHVybiBuZXcgV29ya2VyKHVybCk7XHJcblx0fVxyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vd29ya2VyLWxvYWRlci9jcmVhdGVJbmxpbmVXb3JrZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZnVuY3Rpb24gc2xpY2sodGltZXMpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHR2YXIgc2VsZWN0b3IgPSAnI3NsaWRlci0nO1xyXG5cdFxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdGltZXM7IGkrKykge1xyXG5cdFx0JChzZWxlY3RvciArIGkpLnNsaWNrKHtcclxuXHRcdFx0ZG90czogZmFsc2UsXHJcblx0XHRcdGluZmluaXRlOiBmYWxzZSxcclxuXHRcdFx0c3BlZWQ6IDMwMCxcclxuXHRcdFx0c2xpZGVzVG9TaG93OiAzLFxyXG5cdFx0XHRzbGlkZXNUb1Njcm9sbDogMSxcclxuXHRcdFx0dmFyaWFibGVXaWR0aDogdHJ1ZSxcclxuXHRcdFx0YXV0b3BsYXk6IGZhbHNlLFxyXG5cdFx0XHRyZXNwb25zaXZlOiBbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0YnJlYWtwb2ludDogMTIwMCxcclxuXHRcdFx0XHRcdHNldHRpbmdzOiB7XHJcblx0XHRcdFx0XHRcdHZhcmlhYmxlV2lkdGg6IHRydWUsXHJcblx0XHRcdFx0XHRcdHNsaWRlc1RvU2hvdzogMixcclxuXHRcdFx0XHRcdFx0c2xpZGVzVG9TY3JvbGw6IDEsXHJcblx0XHRcdFx0XHRcdGluZmluaXRlOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0ZG90czogZmFsc2VcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGJyZWFrcG9pbnQ6IDgwMCxcclxuXHRcdFx0XHRcdHNldHRpbmdzOiB7XHJcblx0XHRcdFx0XHRcdHZhcmlhYmxlV2lkdGg6IHRydWUsXHJcblx0XHRcdFx0XHRcdHNsaWRlc1RvU2hvdzogMSxcclxuXHRcdFx0XHRcdFx0c2xpZGVzVG9TY3JvbGw6IDFcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gdW5zbGljayh0aW1lcykge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cdHZhciBzZWxlY3RvciA9ICcjc2xpZGVyLSc7XHJcblx0XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aW1lczsgaSsrKSB7XHJcblx0XHQkKHNlbGVjdG9yICsgaSkuc2xpY2soJ3Vuc2xpY2snKTtcclxuXHR9XHJcblx0Y29uc29sZS5sb2coJ2NsZWFyZWQnKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0c2V0OiBzbGljayxcclxuXHRyZW1vdmU6IHVuc2xpY2tcclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL21vZHVsZXMvc2xpZGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcclxuXHRyZXF1aXJlKCcuL2N1c3RvbVNlbGVjdC5jb21wb25lbnQnKTtcclxuXHRyZXF1aXJlKCcuL3BhbmVscy9wYW5lbEdyb3VwLmNvbXBvbmVudCcpO1xyXG5cdHJlcXVpcmUoJy4vcGFuZWxzL3BhZ2luYXRpb24uY29tcG9uZW50Jyk7XHJcblx0cmVxdWlyZSgnLi9wYW5lbHMvcGFuZWxIZWFkaW5nLmNvbXBvbmVudCcpO1xyXG5cdHJlcXVpcmUoJy4vcGFuZWxzL29iamVjdFBhbmVsQm9keS5jb21wb25lbnQnKTtcclxuXHRyZXF1aXJlKCcuL3BhbmVscy9hcnJheVBhbmVsQm9keS5jb21wb25lbnQnKTtcclxufSgpKTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXHJcbiAqIEN1c3RvbSBTZWxlY3QgY29tcG9uZW50XHJcbiAqL1xyXG52YXIgc2VsZjtcclxuXHJcbi8qKlxyXG4gKiBDdXN0b20gU2VsZWN0IFZpZXctTW9kZWxcclxuICogQHBhcmFtIHBhcmFtc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIEN1c3RvbVNlbGVjdChwYXJhbXMpIHtcclxuICBzZWxmID0gdGhpcztcclxuXHJcbiAgdGhpcy5hbmltYXRpb25TcGVlZCA9IHBhcmFtcy5hbmltYXRpb25TcGVlZCB8fCAyMDA7XHJcblx0dGhpcy5jdXJlbnRTZWxlY3REYXRhID0gcGFyYW1zLmRhdGEgfHwgbnVsbDtcclxuXHR0aGlzLm9uRm9jdXMgPSBwYXJhbXMuZm9jdXMgfHwgbnVsbDtcclxuXHRcclxuICAvL29ic2VydmFibGVzXHJcbiAgdGhpcy5zZWxlY3RNb2RlbCA9IHR5cGVvZiBwYXJhbXMub3B0aW9ucyAhPT0nZnVuY3Rpb24nID8ga28ub2JzZXJ2YWJsZUFycmF5KHBhcmFtcy5vcHRpb25zKTogIHBhcmFtcy5vcHRpb25zO1xyXG4gIHRoaXMucGxhY2Vob2xkZXIgPSBrby5vYnNlcnZhYmxlKHBhcmFtcy5wbGFjZWhvbGRlciB8fCAnJyk7XHJcbiAgdGhpcy5vbnNlbGVjdCA9IHBhcmFtcy5vbnNlbGVjdCB8fCBmdW5jdGlvbiAoaXRlbSkgeyBjb25zb2xlLmxvZyhpdGVtICsnc2VsZWN0ZWQhJyl9O1xyXG4gIHRoaXMuc2VsZWN0ZWQgPSBrby5vYnNlcnZhYmxlKHRoaXMuc2VsZWN0TW9kZWwoKVswXSk7XHJcbiAgdGhpcy5pc09uZU9wdGlvbiA9IGtvLnB1cmVDb21wdXRlZChmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RNb2RlbCgpLmxlbmd0aCA8IDI7IC8vIG1vcmUgdGhhbiBvbmUgb3B0aW9uXHJcbiAgfSwgdGhpcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRFbGVtZW50KGV2ZW50KSB7XHJcbiAgdmFyIHBhcmVudCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkucGFyZW50cygnLmpzLWN1c3RvbS1zZWxlY3QnKTtcclxuICByZXR1cm4ge1xyXG4gICAgd3JhcHBlcjogcGFyZW50LmZpbmQoJy5qcy1jdXN0b20tc2VsZWN0LXdyYXBwZXInKSxcclxuICAgIGxheWVyOiBwYXJlbnQuZmluZCgnLmpzLWN1c3RvbS1zZWxlY3QtbGF5ZXInKVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEN1c3RvbSBTZWxlY3QgVmlldy1Nb2RlbCBtZXRob2RcclxuICogQHBhcmFtIHZpZXdNb2RlbFxyXG4gKiBAcGFyYW0gZXZlbnRcclxuICovXHJcbkN1c3RvbVNlbGVjdC5wcm90b3R5cGUuc2xpZGVUb2dnbGUgPSBmdW5jdGlvbih2aWV3TW9kZWwsIGV2ZW50KSB7XHJcblx0Ly8gZWxlbSBpbiBmb2N1cyBlbXVsYXRpb25cclxuXHR0aGlzLm9uRm9jdXMgJiYgdGhpcy5vbkZvY3VzKHRoaXMuY3VyZW50U2VsZWN0RGF0YSk7XHJcblxyXG5cdGlmICh0aGlzLmlzT25lT3B0aW9uKCkpIHtyZXR1cm4gZmFsc2U7fVxyXG4gIHZhciBlbCA9IGZpbmRFbGVtZW50KGV2ZW50KTtcclxuICAgIGVsLndyYXBwZXIuc2xpZGVUb2dnbGUodmlld01vZGVsLmFuaW1hdGlvblNwZWVkKTtcclxuICAgIGVsLmxheWVyLnRvZ2dsZUNsYXNzKCdoaWRkZW4nKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDdXN0b20gU2VsZWN0IFZpZXctTW9kZWwgbWV0aG9kXHJcbiAqIEBwYXJhbSBpdGVtXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuQ3VzdG9tU2VsZWN0LnByb3RvdHlwZS5zZWxlY3RJdGVtID0gZnVuY3Rpb24gKGl0ZW0sIGV2ZW50KSB7XHJcbiAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gIHRoaXMuc2VsZWN0ZWQoaXRlbSk7XHJcbiAgLy8gcnVuIGhhbmRsZXJcclxuICB0aGlzLm9uc2VsZWN0KGl0ZW0pO1xyXG5cdC8vIHNsaWRlIHVwXHJcbiAgdGhpcy5zbGlkZVRvZ2dsZShzZWxmLCBldmVudCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2N1c3RvbS1zZWxlY3QnLCB7XHJcbiAgdmlld01vZGVsOiBDdXN0b21TZWxlY3QsXHJcbiAgdGVtcGxhdGU6IChbXHJcbiAgICAnPGRpdiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdCBqcy1jdXN0b20tc2VsZWN0XCI+JyxcclxuICAgICAgJzxkaXYgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3Qtd3JhcHBlclwiPicsXHJcbiAgICAgICAgJzxzZWxlY3QgZGF0YS1iaW5kPVwib3B0aW9uczogc2VsZWN0TW9kZWwsIG9wdGlvbnNUZXh0OiBcXCduYW1lXFwnLCB2YWx1ZTogc2VsZWN0ZWRcIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9fZmllbGRcIiBuYW1lPVwiYXBpLWV4cC1tZXRob2RcIj48L3NlbGVjdD4nLFxyXG4gICAgICAgICc8c3BhbiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9fcGxhY2Vob2xkZXJcIj4nLFxyXG4gICAgICAgICAgJzxpbnB1dCBkYXRhLWJpbmQ9XCJldmVudDoge2NsaWNrOiBzbGlkZVRvZ2dsZX0sIGF0dHI6IHt2YWx1ZTogc2VsZWN0ZWQoKS5uYW1lLCBkaXNhYmxlZDogaXNPbmVPcHRpb259XCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIlwiIHJlYWRvbmx5PVwiXCI+JyxcclxuICAgICAgICAgICc8YiBkYXRhLWJpbmQ9XCJjc3M6IHtoaWRkZW46IGlzT25lT3B0aW9ufVwiIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19jaGV2cm9uXCI+Jm5ic3A7PC9iPicsXHJcbiAgICAgICAgJzwvc3Bhbj4nLFxyXG4gICAgICAgICc8dWwgZGF0YS1iaW5kPVwiZm9yZWFjaDogc2VsZWN0TW9kZWxcIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9fbGlzdCBqcy1jdXN0b20tc2VsZWN0LXdyYXBwZXJcIj4nLFxyXG4gICAgICAgICAgJzxsaSBkYXRhLWJpbmQ9XCJjc3M6IHtcXCdhY3RpdmVcXCc6IGNoZWNrZWR9XCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2l0ZW1cIj4nLFxyXG4gICAgICAgICAgICAnPGJ1dHRvbiBkYXRhLWJpbmQ9XCJldmVudDoge2NsaWNrOiAkcGFyZW50LnNlbGVjdEl0ZW0uYmluZCgkcGFyZW50KX0sIHRleHQ6IG5hbWUsIGNzczoge1xcJ2FjdGl2ZVxcJzogY2hlY2tlZCgpfSwgYXR0cjoge1xcJ2RhdGEtdmFsdWVcXCc6IG5hbWV9XCIgIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19pdGVtLWxhYmVsXCIgaHJlZj1cIiNcIj48L2J1dHRvbj4nLFxyXG4gICAgICAgICAgICAvLyAnPHNwYW4gZGF0YS1iaW5kPVwiaWY6IGxpbmtcIj4nLFxyXG4gICAgICAgICAgICBcdCc8YSBkYXRhLWJpbmQ9XCJhdHRyOiB7aHJlZjogbGlua30sIGNzczoge1xcJ2hpZGRlblxcJzogIWxpbmt9XCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2l0ZW0tbGlua1wiIHRhcmdldD1cIl9ibGFua1wiPiZuYnNwOzwvYT4nLFxyXG4gICAgICAgICAgICAvLyAnPC9zcGFuPicsXHJcbiAgICAgICAgICAnPC9saT4nLFxyXG4gICAgICAgICc8L3VsPicsXHJcbiAgICAgICc8L2Rpdj4nLFxyXG4gICAgICAnPGRpdiBkYXRhLWJpbmQ9XCJjbGljazogc2xpZGVUb2dnbGVcIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdC1sYXllciBqcy1jdXN0b20tc2VsZWN0LWxheWVyIGhpZGRlblwiPjwvZGl2PicsXHJcbiAgICAnPC9kaXY+J1xyXG4gIF0pLmpvaW4oJycpXHJcbn0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9jdXN0b21TZWxlY3QuY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xyXG5cclxuZnVuY3Rpb24gY2FyZEdyb3VwQ29tcG9uZW50KHBhcmFtcykge1xyXG5cdHNlbGYgPSB0aGlzO1xyXG5cdHZhciB1cmwgPSBwYXJhbXMudXJsO1xyXG5cdHRoaXMuZmlsdGVyID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnLmpzb24nKTtcclxuXHR0aGlzLmNhcmRzID0gdGhpcy5yZW1vdmVDYXJkcyhwYXJhbXMuY2FyZHMpO1xyXG5cdHRoaXMuZ3JvdXBJbmRleCA9IHBhcmFtcy5ncm91cEluZGV4IHx8IDA7XHJcblx0dGhpcy5jYXJkSW5kZXggPSBwYXJhbXMuY2FyZEluZGV4O1xyXG5cdHRoaXMuc2VjdGlvbkluZGV4ID0ga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShwYXJhbXMuc2VjdGlvbkluZGV4KTtcclxuXHR0aGlzLmRhdGEgPSBwYXJhbXMuZGF0YTtcclxuXHR0aGlzLmNvbG9yQ2xhc3MgPSBwYXJhbXMuY29sb3JDbGFzcztcclxuXHR0aGlzLmdldE1vcmUgPSBwYXJhbXMuZ2V0TW9yZTtcclxuXHR0aGlzLnJlcUlkID0gdGhpcy5yZXFJZCB8fCBwYXJhbXMucmVxSWQ7XHJcblx0dGhpcy5jYXJkU2l6ZSA9IHBhcmFtcy5jYXJkU2l6ZSB8fCB0aGlzLmNhcmRzLnBhZ2Uuc2l6ZTtcclxuXHR0aGlzLnBhZ2VQYXJhbSA9IChwYXJhbXMucGFnZVBhcmFtIHx8IGtvLnV0aWxzLnVud3JhcE9ic2VydmFibGUodXJsKS5maW5kKGZ1bmN0aW9uIChpdGVtKSB7XHJcblx0XHRyZXR1cm4gaXRlbS5uYW1lID09PSAncGFnZSc7XHJcblx0fSkpLnZhbHVlO1xyXG5cdFxyXG5cdHRoaXMuY29sbGFwc2VJZCA9IFtcclxuXHRcdCdjYXJkLXBhbmVsLWJvZHktJyxcclxuXHRcdHRoaXMuc2VjdGlvbkluZGV4LFxyXG5cdFx0dGhpcy5ncm91cEluZGV4XHJcblx0XS5qb2luKCcnKTtcclxuXHRcclxuXHR0aGlzLmlzQWN0aXZlID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcbn1cclxuXHJcbmNhcmRHcm91cENvbXBvbmVudC5wcm90b3R5cGUucmVtb3ZlQ2FyZHMgPSBmdW5jdGlvbiAob2JqKSB7XHJcblx0dmFyIGRlcHJlY2F0ZWQgPSB0aGlzLmZpbHRlci5kZXByZWNhdGVkO1xyXG5cdHZhciB1bndyYXBwID0gdGhpcy5maWx0ZXIudW53cmFwcDtcclxuXHQvLyB2YXIgY3VycmVudEFwaSA9IHRoaXMuZmlsdGVyW11cclxuXHJcblx0ZGVwcmVjYXRlZC5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdGlmIChvYmpbaXRlbV0pIHtcclxuXHRcdFx0ZGVsZXRlIG9ialtpdGVtXVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGl0ZW07XHJcblx0fSk7XHJcblxyXG5cdHVud3JhcHAubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcblx0XHR2YXIgdmFsID0gb2JqW2l0ZW1dO1xyXG5cdFx0aWYgKHZhbCkge1xyXG5cdFx0XHR2YXIgYXJyID0gT2JqZWN0LmtleXModmFsKTtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgcHJvcCA9IGFycltpXTtcclxuXHRcdFx0XHRvYmpbcHJvcF0gPSB2YWxbcHJvcF07XHJcblx0XHRcdH1cclxuXHRcdFx0ZGVsZXRlIG9ialtpdGVtXTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBpdGVtO1xyXG5cdH0pO1xyXG5cclxuXHRcclxuXHRyZXR1cm4gb2JqO1xyXG59O1xyXG5cclxuY2FyZEdyb3VwQ29tcG9uZW50LnByb3RvdHlwZS5zZXRBY3RpdmUgPSBmdW5jdGlvbiAodm0sIGUpIHtcclxuXHRpZiAoIXRoaXMuaXNBY3RpdmUpIHtcclxuXHRcdCByZXR1cm4gdGhpcy5pc0FjdGl2ZSA9IGtvLm9ic2VydmFibGUodHJ1ZSk7XHJcblx0fVxyXG5cdHRoaXMuaXNBY3RpdmUoIXRoaXMuaXNBY3RpdmUoKSk7XHJcbn07XHJcblxyXG5jYXJkR3JvdXBDb21wb25lbnQucHJvdG90eXBlLnNvcnRCeUNvbmZpZyA9IGZ1bmN0aW9uIHNvcnRGdW5jKGEsIGIpIHtcclxuXHR2YXIgY29uZmlnID0gc2VsZi5maWx0ZXJbc2VsZi5yZXFJZF07XHJcblx0dmFyIG8xID0gY29uZmlnLmZpbmQoZnVuY3Rpb24gKG9iaikge1xyXG5cdFx0cmV0dXJuIG9iai50aXRsZSA9PT0gYS5rZXk7XHJcblx0fSk7XHJcblx0dmFyIG8yID0gY29uZmlnLmZpbmQoZnVuY3Rpb24gKG9iaikge1xyXG5cdFx0cmV0dXJuIG9iai50aXRsZSA9PT0gYi5rZXk7XHJcblx0fSk7XHJcblx0cmV0dXJuIGNvbmZpZy5pbmRleE9mKG8xKSAtIGNvbmZpZy5pbmRleE9mKG8yKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ga28uY29tcG9uZW50cy5yZWdpc3RlcigncGFuZWwtZ3JvdXAnLCB7XHJcblx0dmlld01vZGVsOiBjYXJkR3JvdXBDb21wb25lbnQsXHJcblx0dGVtcGxhdGU6YFxyXG5cdFx0PHNlY3Rpb24gZGF0YS1iaW5kPVwiZm9yZWFjaHByb3A6IHtkYXRhOiBjYXJkcywgc29ydEZuOiBzb3J0QnlDb25maWd9XCIgY2xhc3M9XCJwYW5lbC1ncm91cFwiPlxyXG5cdFx0XHQ8c2VjdGlvbiBkYXRhLWJpbmQ9XCJjc3M6IHtbJGNvbXBvbmVudC5jb2xvckNsYXNzXTogdHJ1ZX1cIiBjbGFzcz1cInBhbmVsIHBhbmVsLXByaW1hcnlcIj5cclxuXHRcdFx0XHQ8IS0tcGFuZWwtaGVhZGluZy0tPlxyXG5cdFx0XHRcdDxwYW5lbC1oZWFkaW5nIHBhcmFtcz1cImRhdGE6ICRkYXRhLCBpbmRleDogJGluZGV4LCBjYXJkU2l6ZTogJGNvbXBvbmVudC5jYXJkU2l6ZSwgcGFnZVBhcmFtOiAkY29tcG9uZW50LnBhZ2VQYXJhbSwgY29sbGFwc2VJZDogJGNvbXBvbmVudC5jb2xsYXBzZUlkXCI+PC9wYW5lbC1oZWFkaW5nPlx0XHRcdFxyXG5cdFx0XHRcdDwhLS1wYW5lbC1ib2R5LS0+XHJcblx0XHRcdFx0PHNlY3Rpb24gZGF0YS1iaW5kPVwiYXR0cjp7J2lkJzogJGNvbXBvbmVudC5jb2xsYXBzZUlkICsgJGluZGV4KCl9XCIgY2xhc3M9XCJwYW5lbC1jb2xsYXBzZSBjb2xsYXBzZVwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHQ8IS0tIGtvIGlmOiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAhJC5pc0FycmF5KHZhbHVlKSkgLS0+XHJcblx0XHRcdFx0XHRcdFx0PG9iamVjdC1wYW5lbC1ib2R5IHBhcmFtcz1cImRhdGE6ICRkYXRhLCBjYXJkR3JvdXA6ICRjb21wb25lbnQsIHBhZ2VQYXJhbTogJGNvbXBvbmVudC5wYWdlUGFyYW1cIj48L29iamVjdC1wYW5lbC1ib2R5PlxyXG5cdFx0XHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdDwhLS0ga28gaWY6ICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmICQuaXNBcnJheSh2YWx1ZSkpIC0tPlxyXG5cdFx0XHRcdFx0XHRcdDxhcnJheS1wYW5lbC1ib2R5IHBhcmFtcz1cImRhdGE6ICRkYXRhLCBjYXJkR3JvdXA6ICRjb21wb25lbnRcIj48L2FycmF5LXBhbmVsLWJvZHk+XHJcblx0XHRcdFx0XHRcdDwhLS0gL2tvIC0tPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHQ8L3NlY3Rpb24+XHJcblx0XHJcblx0XHQ8L3NlY3Rpb24+XHJcbmB9KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvcGFuZWxzL3BhbmVsR3JvdXAuY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge1xuXHRcImRpc2NvdmVyeS52Mi5ldmVudHMuZ2V0XCI6IFtcblx0XHR7XG5cdFx0XHRcInRpdGxlXCI6IFwiZXZlbnRzXCIsXG5cdFx0XHRcIml0ZW1zXCI6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwidGl0bGVcIjogXCJldmVudFwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInRpdGxlXCI6IFwiaW1hZ2VzXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwidGl0bGVcIjogXCJzYWxlc1wiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRcInRpdGxlXCI6IFwidmVudWVzXCJcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdFwidGl0bGVcIjogXCJkYXRlc1wiLFxuXHRcdFx0XHRcdFwiaXRlbXNcIjogW1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcInRpdGxlXCI6IFwic3RhcnRcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XCJ0aXRsZVwiOiBcInN0YXR1c1wiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcInRpdGxlXCI6IFwiZW5kXCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdFwidGl0bGVcIjogXCJwYWdlXCJcblx0XHR9XG5cdF0sXG5cdFwiZGVwcmVjYXRlZFwiOiBbXG5cdFx0XCJfbGlua3NcIlxuXHRdLFxuXHRcInVud3JhcHBcIjogW1xuXHRcdFwiX2VtYmVkZGVkXCJcblx0XVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29uZmlnLmpzb25cbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHNlbGY7XHJcblxyXG4vKipcclxuICogUGFnaW5hdGlvbiBlbGVtZW50XHJcbiAqIEBwYXJhbSBwYXJhbXNcclxuICovXHJcbmZ1bmN0aW9uIHBhZ2luYXRpb24ocGFyYW1zKSB7XHJcblx0dGhpcy5wYWdlUGFyYW0gPSBwYXJhbXMucGFnZVBhcmFtO1xyXG5cdHRoaXMudG90YWxQYWdlcyA9ICtwYXJhbXMudG90YWxQYWdlcztcclxuXHR0aGlzLm51bWJlciA9ICtwYXJhbXMubnVtYmVyO1xyXG5cdHRoaXMuZmlyc3QgPSAhIXRoaXMubnVtYmVyO1xyXG5cdHRoaXMubGFzdCA9IHRoaXMubnVtYmVyIDwgdGhpcy50b3RhbFBhZ2VzIC0gMTtcclxuXHR0aGlzLnJlcXVlc3RCdG4gPSAkKCcjYXBpLWV4cC1nZXQtYnRuJyk7XHJcblx0c2VsZiA9IHRoaXM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBnZXQgbmV4dCBwYWdlXHJcbiAqL1xyXG5wYWdpbmF0aW9uLnByb3RvdHlwZS5nZXRQcmV2UGFnZSA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdmFsID0gdGhpcy5wYWdlUGFyYW0oKTtcclxuXHR0aGlzLnBhZ2VQYXJhbSh2YWwgPiAwID8gdmFsIC0gMSA6IDApO1xyXG5cdHRoaXMucmVxdWVzdEJ0bi50cmlnZ2VyKCdjbGljaycpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIGdldCBwcmV2IHBhZ2VcclxuICovXHJcbnBhZ2luYXRpb24ucHJvdG90eXBlLmdldE5leHRQYWdlID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciB2YWwgPSB0aGlzLm51bWJlcjtcclxuXHR0aGlzLnBhZ2VQYXJhbSh2YWwgPCB0aGlzLnRvdGFsUGFnZXMgLSAxID8gdmFsICArIDE6IHZhbCk7XHJcblx0dGhpcy5yZXF1ZXN0QnRuLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ3BhZ2luYXRpb24nLCB7XHJcblx0dmlld01vZGVsOiBwYWdpbmF0aW9uLFxyXG5cdHRlbXBsYXRlOlxyXG5cdGA8c3BhbiBjbGFzcz1cIm5hdmlnYXRpb24td3JhcHBlclwiPlxyXG5cdFx0PGJ1dHRvbiBkYXRhLWJpbmQ9XCJjbGljazogZ2V0UHJldlBhZ2UsIGVuYWJsZTogZmlyc3RcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJuYXZpZ2F0aW9uIHByZXZcIj48L2J1dHRvbj5cclxuXHRcdDxidXR0b24gIGRhdGEtYmluZD1cImNsaWNrOiBnZXROZXh0UGFnZSwgZW5hYmxlOiBsYXN0XCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibmF2aWdhdGlvbiBuZXh0XCI+PC9idXR0b24+XHJcblx0PC9zcGFuPmBcclxufSk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL3BhbmVscy9wYWdpbmF0aW9uLmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcclxuXHJcbmZ1bmN0aW9uIG9iamVjdFBhbmVsQm9keUNvbXBvbmVudChwYXJhbXMpIHtcclxuXHRzZWxmID0gdGhpcztcclxuXHR0aGlzLnRpdGxlID0gcGFyYW1zLmRhdGEua2V5O1xyXG5cdHRoaXMuZGF0YSA9IHBhcmFtcy5kYXRhLnZhbHVlO1xyXG5cdHRoaXMuaW5kZXggPSBrby51dGlscy51bndyYXBPYnNlcnZhYmxlKHBhcmFtcy5pbmRleCk7XHJcblx0dGhpcy5jYXJkU2l6ZSA9IHBhcmFtcy5jYXJkU2l6ZTtcclxuXHR0aGlzLnBhZ2VQYXJhbSA9IHBhcmFtcy5wYWdlUGFyYW07XHJcblx0dGhpcy5jb2xsYXBzZUlkID0gcGFyYW1zLmNvbGxhcHNlSWQ7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdwYW5lbC1oZWFkaW5nJywge1xyXG5cdHZpZXdNb2RlbDogIG9iamVjdFBhbmVsQm9keUNvbXBvbmVudCxcclxuXHR0ZW1wbGF0ZTpgXHJcblx0XHQ8c2VjdGlvbiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj5cclxuXHRcdFx0PGRpdiBjbGFzcz1cInBhbmVsLXRpdGxlXCI+XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0PGEgZGF0YS1iaW5kPVwiYXR0cjogeydocmVmJzogJyMnICsgY29sbGFwc2VJZCArIGluZGV4LCAnYXJpYS1jb250cm9scyc6IGNvbGxhcHNlSWQgKyBpbmRleH1cIiBjbGFzcz1cImJ0biBidG4taWNvblwiIHR5cGU9XCJidXR0b25cIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+XHJcblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImJ0biBidG4taWNvbiBzaGV2cm9uIHdoaXRlLXNoZXZyb24tdXBcIj48L3NwYW4+XHJcblx0XHRcdFx0XHQ8cCBkYXRhLWJpbmQ9XCJ0ZXh0OiB0aXRsZVwiIGNsYXNzPVwidGl0bGVcIj5UaXRsZTwvcD5cclxuXHRcdFx0XHQ8L2E+XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0PCEtLSBrbyBpZjogdGl0bGUgPT09ICdldmVudHMnLS0+XHJcblx0XHRcdFx0XHQ8c3BhbiBkYXRhLWJpbmQ9XCJ0ZXh0OiBjYXJkU2l6ZVwiIGNsYXNzPVwiY291bnRlclwiPjwvc3Bhbj5cclxuXHRcdFx0XHQ8IS0tIC9rby0tPlxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdDwhLS0ga28gaWY6IHRpdGxlID09PSAncGFnZSctLT5cclxuXHRcdFx0XHRcdDxwYWdpbmF0aW9uIHBhcmFtcz1cIm51bWJlcjogZGF0YS5udW1iZXIsIHRvdGFsUGFnZXM6IGRhdGEudG90YWxQYWdlcywgcGFnZVBhcmFtOiBwYWdlUGFyYW1cIj48L3BhZ2luYXRpb24+XHJcblx0XHRcdFx0PCEtLSAva28tLT5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L3NlY3Rpb24+XHJcbmB9KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvcGFuZWxzL3BhbmVsSGVhZGluZy5jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAyMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHNlbGY7XHJcblxyXG5mdW5jdGlvbiBvYmplY3RQYW5lbEJvZHlDb21wb25lbnQocGFyYW1zKSB7XHJcblx0dGhpcy50aXRsZSA9IHBhcmFtcy5kYXRhLmtleTtcclxuXHR0aGlzLmRhdGEgPSB0aGlzLmRhdGEgfHwga28ub2JzZXJ2YWJsZShwYXJhbXMuZGF0YS52YWx1ZSk7XHJcblx0dGhpcy5jYXJkR3JvdXAgPSBwYXJhbXMuY2FyZEdyb3VwO1xyXG5cdHRoaXMuZ2V0TW9yZSA9IHRoaXMuY2FyZEdyb3VwLmdldE1vcmU7XHJcblx0dGhpcy5wYWdlUGFyYW0gPSBwYXJhbXMucGFnZVBhcmFtO1xyXG5cdHNlbGYgPSB0aGlzO1xyXG59XHJcblxyXG5vYmplY3RQYW5lbEJvZHlDb21wb25lbnQucHJvdG90eXBlLm9uRW50ZXJLZXlEb3duID0gZnVuY3Rpb24gKG1vZGVsLCBldmVudCkge1xyXG5cdHZhciBwYWdlTnVtYmVyID0gfn5tb2RlbC52YWx1ZSA8IDAgPyAwIDogfn5tb2RlbC52YWx1ZTtcclxuXHRzZWxmLnBhZ2VQYXJhbShwYWdlTnVtYmVyIDwga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShzZWxmLmRhdGEpLnRvdGFsUGFnZXMgPyBwYWdlTnVtYmVyIDoga28udXRpbHMudW53cmFwT2JzZXJ2YWJsZShzZWxmLmRhdGEpLnRvdGFsUGFnZXMgLSAxKTtcclxuXHRpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuXHRcdCQoJyNhcGktZXhwLWdldC1idG4nKS50cmlnZ2VyKCdjbGljaycpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ29iamVjdC1wYW5lbC1ib2R5Jywge1xyXG5cdHZpZXdNb2RlbDogIG9iamVjdFBhbmVsQm9keUNvbXBvbmVudCxcclxuXHR0ZW1wbGF0ZTpgXHJcblx0XHQ8dWwgZGF0YS1iaW5kPVwiZm9yZWFjaHByb3A6IGRhdGFcIj5cclxuXHRcdFx0PGxpIGNsYXNzPVwiY2xlYXJmaXhcIj5cclxuXHRcdFx0XHQ8IS0tIGtvIGlmOiAkY29tcG9uZW50LnRpdGxlID09PSAnaW1hZ2VzJyAtLT5cclxuXHRcdFx0XHRcdDxpbWcgZGF0YS1iaW5kPVwiYXR0cjoge3NyYzogdXJsLCBhbHQ6ICdpbWFnZS0nICsgcmF0aW99XCIgYWx0PVwiaW1nXCIgY2xhc3M9XCJpbWcgaW1nLXRodW1ibmFpbFwiPlxyXG5cdFx0XHRcdDwhLS0gL2tvIC0tPlxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdDxiIGNsYXNzPVwia2V5XCI+XHJcblx0XHRcdFx0XHQ8c3BhbiBkYXRhLWJpbmQ9XCJ0ZXh0OiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnID8ga2V5OiBrZXkgKyAnOidcIj48L3NwYW4+XHJcblx0XHRcdFx0PC9iPlxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdDwhLS0ga28gaWZub3Q6IHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgJGNvbXBvbmVudC50aXRsZSA9PT0gJ3BhZ2UnICYmIGtleSA9PT0gJ251bWJlcicgLS0+XHJcblx0XHRcdFx0XHQ8c3BhbiBkYXRhLWJpbmQ9XCJ0ZXh0OiB2YWx1ZVwiIGNsYXNzPVwidmFsdWVcIj48L3NwYW4+XHJcblx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0PCEtLSBrbyBpZjogJGNvbXBvbmVudC50aXRsZSA9PT0gJ3BhZ2UnICYmIGtleSA9PT0gJ251bWJlcictLT5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLWlubGluZVwiPlxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgaWQ9XCJwYWdpbmF0aW9uLWlucHV0XCIgZGF0YS1iaW5kPVwidGV4dElucHV0OiB2YWx1ZSwgZXZlbnQ6IHtrZXlkb3duOiAkY29tcG9uZW50Lm9uRW50ZXJLZXlEb3dufVwiIHR5cGU9XCJ0ZXh0XCIgcGF0dGVybj1cIlswLTldK1wiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8IS0tIC9rbyAtLT5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQ8IS0tIGtvIGlmOiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIC0tPlxyXG5cdFx0XHRcdFx0PGJ1dHRvbiBkYXRhLWJpbmQ9XCJjbGljazogJGNvbXBvbmVudC5nZXRNb3JlLmJpbmQoJGNvbXBvbmVudC5jYXJkR3JvdXAsIHZhbHVlKVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4taWNvbiBibHVlLXNoZXZyb24tcmlnaHQgcHVsbC1yaWdodFwiPjwvYnV0dG9uPlxyXG5cdFx0XHRcdDwhLS0gL2tvIC0tPlxyXG5cdFx0XHRcdFxyXG5cdFx0XHQ8L2xpPlxyXG5cdFx0PC91bD5cclxuYH0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9wYW5lbHMvb2JqZWN0UGFuZWxCb2R5LmNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc2VsZjtcclxuXHJcbmZ1bmN0aW9uIG9iamVjdFBhbmVsQm9keUNvbXBvbmVudChwYXJhbXMpIHtcclxuXHRzZWxmID0gdGhpcztcclxuXHR0aGlzLnRpdGxlID0gcGFyYW1zLmRhdGEua2V5O1xyXG5cdHRoaXMuZGF0YSA9IHBhcmFtcy5kYXRhLnZhbHVlO1xyXG5cdHRoaXMuY2FyZEdyb3VwID0gcGFyYW1zLmNhcmRHcm91cDtcclxuXHR0aGlzLmdldE1vcmUgPSB0aGlzLmNhcmRHcm91cC5nZXRNb3JlO1xyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdhcnJheS1wYW5lbC1ib2R5Jywge1xyXG5cdHZpZXdNb2RlbDogIG9iamVjdFBhbmVsQm9keUNvbXBvbmVudCxcclxuXHR0ZW1wbGF0ZTpgXHJcblx0XHQ8dWwgZGF0YS1iaW5kPVwiZm9yZWFjaDogZGF0YVwiIGNsYXNzPVwibGlzdC1ncm91cFwiPlxyXG5cdFx0XHQ8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj5cclxuXHRcdFx0XHJcblx0XHRcdFx0PCEtLSBrbyBpZjogJHBhcmVudC50aXRsZSA9PT0gJ2ltYWdlcycgLS0+XHJcblx0XHRcdFx0XHQ8aW1nIGRhdGEtYmluZD1cImF0dHI6IHtzcmM6IHVybCwgYWx0OiAnaW1hZ2UtJyArIHJhdGlvfVwiIGFsdD1cImltZ1wiIGNsYXNzPVwiaW1nXCI+XHJcblx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0PCEtLSBrbyBpZm5vdDogJHBhcmVudC50aXRsZSA9PT0gJ2ltYWdlcycgLS0+XHJcblx0XHRcdFx0PHNwYW4gZGF0YS1iaW5kPVwidGV4dDogbmFtZSB8fCAnIycgKyAkaW5kZXgoKVwiIGNsYXNzPVwibmFtZSB0cnVuY2F0ZVwiPmV2ZW50IG5hbWU8L3NwYW4+XHJcblx0XHRcdFx0PCEtLSAva28gLS0+XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0PCEtLSBrbyBpZjogdHlwZW9mICRkYXRhID09PSAnb2JqZWN0JyAtLT5cclxuXHRcdFx0XHRcdDxidXR0b24gZGF0YS1iaW5kPVwiY2xpY2s6ICRjb21wb25lbnQuZ2V0TW9yZS5iaW5kKCRjb21wb25lbnQuY2FyZEdyb3VwKVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4taWNvbiBibHVlLXNoZXZyb24tcmlnaHQgcHVsbC1yaWdodFwiPjwvYnV0dG9uPlxyXG5cdFx0XHRcdDwhLS0gL2tvIC0tPlxyXG5cdFx0XHRcdFxyXG5cdFx0XHQ8L2xpPlxyXG5cdFx0PC91bD5cclxuYH0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9wYW5lbHMvYXJyYXlQYW5lbEJvZHkuY29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=