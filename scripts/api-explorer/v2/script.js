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
	
	// Modules
	var customSelect = __webpack_require__(9);
	
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
	
	  // sub-models
	  this.menu = new MenuViewModel(base, this.selectedCategory);
	  this.methods = new MethodsViewModel(base, this.selectedCategory, this.selectedMethod);
	  this.params = new ParamsViewModel(base, this.selectedMethod, this.selectedParams);
	
	  // computed
	  this.sendButtonText = ko.pureComputed(this.getMethodName, this);
	  
	  this.URL = ko.computed(this.getUrl, this);
	}
	
	/**
	 * Send request method
	 */
	AppViewModel.prototype.onClickSendBtn = function () {
	  ajaxService(this.URL());
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
					documentation : methodElem.find('doc').eq(0).attr('apigee:url'), // link to documentation
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
							default: param.attr('default'),
							select: isSelect
						};
	
						if (isSelect) {
							parameter.options = options.get().map(function (option) {
								return $(option).attr('value');
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
	  var escapedURL = encodeURI(url);
	  console.log(escapedURL);
	
	  $.ajax({
	    type: method,
	    url: escapedURL,
	    async: true,
	    dataType: "json",
	    complete: callback
	  });
	};
	
	/**
	 * Filters and prepares params pairs
	 * @param arr
	 * @param obj
	 * @param koObs
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
	
	  return url;
	};
	
	// sends request to get the second column
	var sendPrimaryRequest = function (arr) {
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
	      console.log(message, response.status);
	      console.log(response.responseJSON);
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
/***/ function(module, exports) {

	var self;
	var base;
	
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
	
	  // computed
	  this.paramsModel = ko.computed(this.updateParamsModel, this);
	  this.paramInFocus(this.paramsModel()[0]);
	  this.isDirty = ko.computed(this.checkDirty, this);
	}
	
	ParamsViewModel.prototype.checkDirty = function () {
	  var dirty = this.paramsModel().filter(function (item) {
	    return item.isDirty() === true;
	  });
	  return dirty.length > 0;
	};
	
	/**
	 * Initial build of Select Model
	 */
	ParamsViewModel.prototype.updateParamsModel = function (a,b) {
	  var obj = this.method().parameters || {},
	    arr = [];
	
	  for (var i in obj) {
	    var value = obj[i];
	
	    if (!obj.hasOwnProperty(i)) {
	      continue;
	    }
	
	    value.value = value.value || ko.observable('');
	
	    // 'dirty' flag watcher for current field
	    value.isDirty = ko.pureComputed(function () {
	      return !!this.value().trim().length;
	    }, value);
	
	    // add calendar btn for current field
	    value.hasCalendar = i.search(/(date|time)/gmi) != -1;
	
	    // add pop-up btn for current field
	    value.hasPopUp = i.search(/(attractionId|venueId)/gmi) != -1;
	
	    arr.push(value);
	  }
	
	  // prepare output for request
	  this.prepareUrlPairs(arr, this.params);
	
	  // catch params focus for about section
	  this.paramInFocus(arr[0]);
	  // this.onEnterKeyDown()
	  return arr;
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
	  if (!arr && !koObs) {
	    return false;
	  }
	
	  return koObs(arr.filter(function (item) {
	    return (item.value() || item.default);
	  }));
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
	  this.selectModel = ko.observableArray([]);
	  this.updateModel(this.category());
	  this.category.subscribe(this.updateModel);
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
	    arr.push({
	      checked: ko.observable(!count),
	      name: property.name,
	      id: property.id,
	      link: property.documentation,
	      about: property.description,
	      category: property.category,
	      method: property.method
	    });
	
	    // // set global observable
	    !count && this.method(base[property.category][property.method][property.id]);
	
	    count++;
	  }
	  self.selectModel(arr);
	};
	
	MethodsViewModel.prototype.onSelectMethod = function (item) {
	  hf.checkActive(self.selectModel, item.name);
	  self.method(base[item.category][item.method][item.id]);
	};
	
	MethodsViewModel.prototype.onAboutClick = function (model, event) {
	  model.togglePopUp(!model.togglePopUp());
	};
	
	module.exports = MethodsViewModel;

/***/ },
/* 9 */
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
	
	  //observables
	  this.selectModel = params.options || ko.observableArray([]);
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
	  if (viewModel.isOneOption()) {return false;}
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
	            '<a data-bind="attr: {href: link}, css: {\'hidden\': !link}" class="api-exp-custom-select__item-link" target="_blank">&nbsp;</a>',
	          '</li>',
	        '</ul>',
	      '</div>',
	      '<div data-bind="click: slideToggle" class="api-exp-custom-select-layer js-custom-select-layer hidden"></div>',
	    '</div>'
	  ]).join('')
	});


/***/ }
/******/ ]);
//# sourceMappingURL=script.js.map