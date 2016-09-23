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
	 * AppViewModel
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
	  this.sendButtonText = ko.pureComputed(function () {
	    return this.selectedMethod().method.toLowerCase();
	  }, this);
	  this.URL = ko.computed(function () {
	    return [
	      this.selectedMethod(),
	      this.apiKey,
	      this.selectedParams()
	    ];
	  }, this);
	}
	
	AppViewModel.prototype.onClickSendBtn = function () {
	  ajaxService(this.URL());
	};
	
	// Activates knockout.js
	ko.applyBindings(new AppViewModel(base));
	module.exports = base;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var base = {};
	var CONFIG_URL = '../../apidescription.xml';
	
	//gets important elements from WADL document and writes them into global variables
	var parseXMLDoc = function (xml) {
	  //get all APIs
	  var APIs = $(xml).find("resources"),
	    isFirstMethod = true; //variable to store the very first method found
	
	  APIs.each(function(){
	    //get all methods in the API
	    var methods = $(this).find('resource');
	
	    methods.each(function(index, element){
	      var me = $(element), //method
	        method = $(me.find('method')[0]), //get method details object
	        category = method.find('[primary="true"]').text(), //get API name
	        params = me.find('param'), //method params
	        parameters = {}; //temporary object to store param data
	
	      params.each(function(index, element){ //fill param object with required data
	        var that = $(this);
	        parameters[that.attr('name')] = {
	          'name': that.attr('name'),
	          'required': that.attr('required'),
	          'type': that.attr('type'),
	          'style': that.attr('style'),
	          'default': that.attr('default'),
	          'doc': that.first('doc').text().trim()
	        }
	      });
	
	      if (!base[category]){
	        base[category] = {}; // create new API in base object if there is none
	      }
	      base[category][method.attr("name")] = base[category][method.attr("name")] || {};
	      base[category].ALL = base[category].ALL || {};
	      base[category].ALL[method.attr("id")]= {
	        'id' : method.attr("id"), // method id
	        'name' : method.attr("apigee:displayName") ? method.attr("apigee:displayName") : method.attr("id"), // method name
	        'method' : method.attr('name'), // GET or POST
	        'category' : category, // API name
	        'path': me.attr('path'), // method URL
	        'parameters': parameters, // method parameters
	        'base' : me.parent().attr('base'), // method base link
	        'documentation' : $(method.find('doc')[0]).attr('apigee:url'), // link to documentation
	        'description' : $(method.find('doc')[0]).text().trim() //method description
	      };
	
	      base[category][method.attr("name")][method.attr("id")] = {
	        'id' : method.attr("id"), // method id
	        'name' : method.attr("apigee:displayName") ? method.attr("apigee:displayName") : method.attr("id"), // method name
	        'method' : method.attr('name'), // GET or POST
	        'category' : category, // API name
	        'path': me.attr('path'), // method URL
	        'parameters': parameters, // method parameters
	        'base' : me.parent().attr('base'), // method base link
	        'documentation' : $(method.find('doc')[0]).attr('apigee:url'), // link to documentation
	        'description' : $(method.find('doc')[0]).text().trim() //method description
	      };
	    });
	  });
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
	      parseXMLDoc(xml);
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
	    // success: callback,
	    // error: function(xhr, status, err) {
	    //   // console.error(status, err);
	    // },
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
	  replacement = path
	    .replace(/[\w/]+[^{a-z}]/gmi, ' ')
	    .split(/[\s{}]/)
	    .filter(function (i){
	      return i.length;
	    });
	
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
	  console.log(url);
	
	  ajaxService(url, arr[0].method, function(response, message) {
	    if (message == 'error') {
	      var err = response.responseJSON.errors[0];
	      console.log(message, response.status);
	      console.log(err.code);
	      console.log(err.detail);
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
	  this.method = method;
	  this.params = params;
	  
	  this.animationSpeed = 200;
	  this.isHidden = ko.observable(true);
	  this.paramInFocus = ko.observable('');
	  this.paramsModel = ko.computed(self.updateParamsModel);
	  this.paramInFocus(this.paramsModel()[0]);
	  this.isDirty = ko.computed(function () {
	    var dirty = this.paramsModel().filter(function (item) {
	        return item.isDirty() === true;
	      });
	    return dirty.length > 0;
	  }, this);
	}
	
	/**
	 * Initial build of Select Model
	 */
	ParamsViewModel.prototype.updateParamsModel = function () {
	  var obj = self.method().parameters || {},
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
	  self.prepareUrlPairs(arr, self.params);
	
	  // catch params focus for about section
	  self.paramInFocus(arr[0]);
	
	  return arr;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTk3MTUzOTMwNzlkMDNjNzQ0MmMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9tYWluLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvYXBpa2V5LmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvYWpheFNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9tZW51Vmlld01vZGVsLmpzIiwid2VicGFjazovLy8uL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvaGVscGVyRnVuYy5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9WaWV3TW9kZWxzL3BhcmFtc1ZpZXdNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9WaWV3TW9kZWxzL21ldGhvZHNWaWV3TW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9jdXN0b21TZWxlY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FB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Q0EsUUFBTztBQUNQO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTBDO0FBQzFDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7O0FBRUE7Ozs7Ozs7QUMxR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSx3QkFBdUI7QUFDdkI7O0FBRUE7QUFDQSxrQ0FBaUMsVUFBVTtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWlEO0FBQ2pEO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBaUMsVUFBVTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1DOzs7Ozs7QUNwSEE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdURBQXNEO0FBQ3REO0FBQ0E7QUFDQSwwQ0FBeUM7QUFDekMsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxtQkFBbUIsU0FBUyw4Q0FBOEM7QUFDL0csZ0NBQStCLG9CQUFvQiwrQ0FBK0M7QUFDbEc7QUFDQTtBQUNBLGlDQUFnQyxvQkFBb0I7QUFDcEQseUNBQXdDLHdDQUF3QyxvQkFBb0Isc0JBQXNCLFNBQVMscUJBQXFCO0FBQ3hKLG1DQUFrQyxXQUFXLFFBQVEsa0JBQWtCLGlFQUFpRTtBQUN4STtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDIiwiZmlsZSI6InNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMTk3MTUzOTMwNzlkMDNjNzQ0MmNcbiAqKi8iLCIvKipcclxuICogTWFpbiBmaWxlIGZvciBBcGkgRXhwbHJlciB2Mi4wXHJcbiAqIEZvciBkZXZlbG9wbWVudCBwbGVhc2UgdXNlIFdlYnBhY2sgdG8gYnVuZGxlIGFsbCBtb2R1bGVzXHJcbiAqIEl0IGNhbiBiZSBtYWRlIHVzaW5nIG5wbSBzY3JpcHRzIGNtZCAtICd3ZWJwYWNrJ1xyXG4gKi9cclxuLy8gQ29tcG9uZW50c1xyXG52YXIgYmFzZSA9IHJlcXVpcmUoJy4vLi4vY29tcG9uZW50cy9jb25maWcnKTtcclxudmFyIGFwaUtleSA9IHJlcXVpcmUoJy4vLi4vY29tcG9uZW50cy9hcGlrZXknKTtcclxudmFyIGFqYXhTZXJ2aWNlID0gcmVxdWlyZSgnLi8uLi9jb21wb25lbnRzL2FqYXhTZXJ2aWNlJyk7XHJcblxyXG4vLyBWaWV3IE1vZGVsc1xyXG52YXIgTWVudVZpZXdNb2RlbCA9IHJlcXVpcmUoJy4vLi4vVmlld01vZGVscy9tZW51Vmlld01vZGVsJyk7XHJcbnZhciBQYXJhbXNWaWV3TW9kZWwgPSByZXF1aXJlKCcuL3BhcmFtc1ZpZXdNb2RlbCcpO1xyXG52YXIgTWV0aG9kc1ZpZXdNb2RlbCA9IHJlcXVpcmUoJy4vbWV0aG9kc1ZpZXdNb2RlbCcpO1xyXG5cclxuLy8gTW9kdWxlc1xyXG52YXIgY3VzdG9tU2VsZWN0ID0gcmVxdWlyZSgnLi8uLi9jb21wb25lbnRzL2N1c3RvbVNlbGVjdCcpO1xyXG5cclxuLyoqXHJcbiAqIEFwcFZpZXdNb2RlbFxyXG4gKiBAcGFyYW0gb2JqIHtvYmplY3R9IGdsb2JhbCBkYXRhIG9iamVjdFxyXG4gKi9cclxuZnVuY3Rpb24gQXBwVmlld01vZGVsKG9iaikge1xyXG4gIHZhciBiYXNlID0gb2JqIHx8IHt9O1xyXG4gIHNlbGYgPSB0aGlzO1xyXG4gIHRoaXMuYXBpS2V5ID0gYXBpS2V5O1xyXG5cclxuICAvLyBvYnNlcnZhYmxlc1xyXG4gIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSA9IGtvLm9ic2VydmFibGUoJycpO1xyXG4gIHRoaXMuc2VsZWN0ZWRNZXRob2QgPSBrby5vYnNlcnZhYmxlKCcnKTtcclxuICB0aGlzLnNlbGVjdGVkUGFyYW1zID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcclxuICAvLyBzdWItbW9kZWxzXHJcbiAgdGhpcy5tZW51ID0gbmV3IE1lbnVWaWV3TW9kZWwoYmFzZSwgdGhpcy5zZWxlY3RlZENhdGVnb3J5KTtcclxuICB0aGlzLm1ldGhvZHMgPSBuZXcgTWV0aG9kc1ZpZXdNb2RlbChiYXNlLCB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnksIHRoaXMuc2VsZWN0ZWRNZXRob2QpO1xyXG4gIHRoaXMucGFyYW1zID0gbmV3IFBhcmFtc1ZpZXdNb2RlbChiYXNlLCB0aGlzLnNlbGVjdGVkTWV0aG9kLCB0aGlzLnNlbGVjdGVkUGFyYW1zKTtcclxuXHJcbiAgLy8gY29tcHV0ZWRcclxuICB0aGlzLnNlbmRCdXR0b25UZXh0ID0ga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkTWV0aG9kKCkubWV0aG9kLnRvTG93ZXJDYXNlKCk7XHJcbiAgfSwgdGhpcyk7XHJcbiAgdGhpcy5VUkwgPSBrby5jb21wdXRlZChmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICB0aGlzLnNlbGVjdGVkTWV0aG9kKCksXHJcbiAgICAgIHRoaXMuYXBpS2V5LFxyXG4gICAgICB0aGlzLnNlbGVjdGVkUGFyYW1zKClcclxuICAgIF07XHJcbiAgfSwgdGhpcyk7XHJcbn1cclxuXHJcbkFwcFZpZXdNb2RlbC5wcm90b3R5cGUub25DbGlja1NlbmRCdG4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgYWpheFNlcnZpY2UodGhpcy5VUkwoKSk7XHJcbn07XHJcblxyXG4vLyBBY3RpdmF0ZXMga25vY2tvdXQuanNcclxua28uYXBwbHlCaW5kaW5ncyhuZXcgQXBwVmlld01vZGVsKGJhc2UpKTtcclxubW9kdWxlLmV4cG9ydHMgPSBiYXNlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9WaWV3TW9kZWxzL21haW4uanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYmFzZSA9IHt9O1xyXG52YXIgQ09ORklHX1VSTCA9ICcuLi8uLi9hcGlkZXNjcmlwdGlvbi54bWwnO1xyXG5cclxuLy9nZXRzIGltcG9ydGFudCBlbGVtZW50cyBmcm9tIFdBREwgZG9jdW1lbnQgYW5kIHdyaXRlcyB0aGVtIGludG8gZ2xvYmFsIHZhcmlhYmxlc1xyXG52YXIgcGFyc2VYTUxEb2MgPSBmdW5jdGlvbiAoeG1sKSB7XHJcbiAgLy9nZXQgYWxsIEFQSXNcclxuICB2YXIgQVBJcyA9ICQoeG1sKS5maW5kKFwicmVzb3VyY2VzXCIpLFxyXG4gICAgaXNGaXJzdE1ldGhvZCA9IHRydWU7IC8vdmFyaWFibGUgdG8gc3RvcmUgdGhlIHZlcnkgZmlyc3QgbWV0aG9kIGZvdW5kXHJcblxyXG4gIEFQSXMuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgLy9nZXQgYWxsIG1ldGhvZHMgaW4gdGhlIEFQSVxyXG4gICAgdmFyIG1ldGhvZHMgPSAkKHRoaXMpLmZpbmQoJ3Jlc291cmNlJyk7XHJcblxyXG4gICAgbWV0aG9kcy5lYWNoKGZ1bmN0aW9uKGluZGV4LCBlbGVtZW50KXtcclxuICAgICAgdmFyIG1lID0gJChlbGVtZW50KSwgLy9tZXRob2RcclxuICAgICAgICBtZXRob2QgPSAkKG1lLmZpbmQoJ21ldGhvZCcpWzBdKSwgLy9nZXQgbWV0aG9kIGRldGFpbHMgb2JqZWN0XHJcbiAgICAgICAgY2F0ZWdvcnkgPSBtZXRob2QuZmluZCgnW3ByaW1hcnk9XCJ0cnVlXCJdJykudGV4dCgpLCAvL2dldCBBUEkgbmFtZVxyXG4gICAgICAgIHBhcmFtcyA9IG1lLmZpbmQoJ3BhcmFtJyksIC8vbWV0aG9kIHBhcmFtc1xyXG4gICAgICAgIHBhcmFtZXRlcnMgPSB7fTsgLy90ZW1wb3Jhcnkgb2JqZWN0IHRvIHN0b3JlIHBhcmFtIGRhdGFcclxuXHJcbiAgICAgIHBhcmFtcy5lYWNoKGZ1bmN0aW9uKGluZGV4LCBlbGVtZW50KXsgLy9maWxsIHBhcmFtIG9iamVjdCB3aXRoIHJlcXVpcmVkIGRhdGFcclxuICAgICAgICB2YXIgdGhhdCA9ICQodGhpcyk7XHJcbiAgICAgICAgcGFyYW1ldGVyc1t0aGF0LmF0dHIoJ25hbWUnKV0gPSB7XHJcbiAgICAgICAgICAnbmFtZSc6IHRoYXQuYXR0cignbmFtZScpLFxyXG4gICAgICAgICAgJ3JlcXVpcmVkJzogdGhhdC5hdHRyKCdyZXF1aXJlZCcpLFxyXG4gICAgICAgICAgJ3R5cGUnOiB0aGF0LmF0dHIoJ3R5cGUnKSxcclxuICAgICAgICAgICdzdHlsZSc6IHRoYXQuYXR0cignc3R5bGUnKSxcclxuICAgICAgICAgICdkZWZhdWx0JzogdGhhdC5hdHRyKCdkZWZhdWx0JyksXHJcbiAgICAgICAgICAnZG9jJzogdGhhdC5maXJzdCgnZG9jJykudGV4dCgpLnRyaW0oKVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoIWJhc2VbY2F0ZWdvcnldKXtcclxuICAgICAgICBiYXNlW2NhdGVnb3J5XSA9IHt9OyAvLyBjcmVhdGUgbmV3IEFQSSBpbiBiYXNlIG9iamVjdCBpZiB0aGVyZSBpcyBub25lXHJcbiAgICAgIH1cclxuICAgICAgYmFzZVtjYXRlZ29yeV1bbWV0aG9kLmF0dHIoXCJuYW1lXCIpXSA9IGJhc2VbY2F0ZWdvcnldW21ldGhvZC5hdHRyKFwibmFtZVwiKV0gfHwge307XHJcbiAgICAgIGJhc2VbY2F0ZWdvcnldLkFMTCA9IGJhc2VbY2F0ZWdvcnldLkFMTCB8fCB7fTtcclxuICAgICAgYmFzZVtjYXRlZ29yeV0uQUxMW21ldGhvZC5hdHRyKFwiaWRcIildPSB7XHJcbiAgICAgICAgJ2lkJyA6IG1ldGhvZC5hdHRyKFwiaWRcIiksIC8vIG1ldGhvZCBpZFxyXG4gICAgICAgICduYW1lJyA6IG1ldGhvZC5hdHRyKFwiYXBpZ2VlOmRpc3BsYXlOYW1lXCIpID8gbWV0aG9kLmF0dHIoXCJhcGlnZWU6ZGlzcGxheU5hbWVcIikgOiBtZXRob2QuYXR0cihcImlkXCIpLCAvLyBtZXRob2QgbmFtZVxyXG4gICAgICAgICdtZXRob2QnIDogbWV0aG9kLmF0dHIoJ25hbWUnKSwgLy8gR0VUIG9yIFBPU1RcclxuICAgICAgICAnY2F0ZWdvcnknIDogY2F0ZWdvcnksIC8vIEFQSSBuYW1lXHJcbiAgICAgICAgJ3BhdGgnOiBtZS5hdHRyKCdwYXRoJyksIC8vIG1ldGhvZCBVUkxcclxuICAgICAgICAncGFyYW1ldGVycyc6IHBhcmFtZXRlcnMsIC8vIG1ldGhvZCBwYXJhbWV0ZXJzXHJcbiAgICAgICAgJ2Jhc2UnIDogbWUucGFyZW50KCkuYXR0cignYmFzZScpLCAvLyBtZXRob2QgYmFzZSBsaW5rXHJcbiAgICAgICAgJ2RvY3VtZW50YXRpb24nIDogJChtZXRob2QuZmluZCgnZG9jJylbMF0pLmF0dHIoJ2FwaWdlZTp1cmwnKSwgLy8gbGluayB0byBkb2N1bWVudGF0aW9uXHJcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJyA6ICQobWV0aG9kLmZpbmQoJ2RvYycpWzBdKS50ZXh0KCkudHJpbSgpIC8vbWV0aG9kIGRlc2NyaXB0aW9uXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBiYXNlW2NhdGVnb3J5XVttZXRob2QuYXR0cihcIm5hbWVcIildW21ldGhvZC5hdHRyKFwiaWRcIildID0ge1xyXG4gICAgICAgICdpZCcgOiBtZXRob2QuYXR0cihcImlkXCIpLCAvLyBtZXRob2QgaWRcclxuICAgICAgICAnbmFtZScgOiBtZXRob2QuYXR0cihcImFwaWdlZTpkaXNwbGF5TmFtZVwiKSA/IG1ldGhvZC5hdHRyKFwiYXBpZ2VlOmRpc3BsYXlOYW1lXCIpIDogbWV0aG9kLmF0dHIoXCJpZFwiKSwgLy8gbWV0aG9kIG5hbWVcclxuICAgICAgICAnbWV0aG9kJyA6IG1ldGhvZC5hdHRyKCduYW1lJyksIC8vIEdFVCBvciBQT1NUXHJcbiAgICAgICAgJ2NhdGVnb3J5JyA6IGNhdGVnb3J5LCAvLyBBUEkgbmFtZVxyXG4gICAgICAgICdwYXRoJzogbWUuYXR0cigncGF0aCcpLCAvLyBtZXRob2QgVVJMXHJcbiAgICAgICAgJ3BhcmFtZXRlcnMnOiBwYXJhbWV0ZXJzLCAvLyBtZXRob2QgcGFyYW1ldGVyc1xyXG4gICAgICAgICdiYXNlJyA6IG1lLnBhcmVudCgpLmF0dHIoJ2Jhc2UnKSwgLy8gbWV0aG9kIGJhc2UgbGlua1xyXG4gICAgICAgICdkb2N1bWVudGF0aW9uJyA6ICQobWV0aG9kLmZpbmQoJ2RvYycpWzBdKS5hdHRyKCdhcGlnZWU6dXJsJyksIC8vIGxpbmsgdG8gZG9jdW1lbnRhdGlvblxyXG4gICAgICAgICdkZXNjcmlwdGlvbicgOiAkKG1ldGhvZC5maW5kKCdkb2MnKVswXSkudGV4dCgpLnRyaW0oKSAvL21ldGhvZCBkZXNjcmlwdGlvblxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG4vL2dldHMgZG9jdW1lbnQgZnJvbSBXQURMIGNvbmZpZ3VyYXRpb24gZmlsZVxyXG52YXIgcmVhZEZyb21XQURMID0gZnVuY3Rpb24gKCkge1xyXG4gICQuYWpheCh7XHJcbiAgICB1cmw6IENPTkZJR19VUkwsXHJcbiAgICBhc3luYyA6IGZhbHNlLFxyXG4gICAgZGF0YVR5cGU6ICgkLmJyb3dzZXIubXNpZSkgPyBcInRleHRcIiA6IFwieG1sXCIsXHJcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICB2YXIgeG1sO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiByZXNwb25zZSA9PSBcInN0cmluZ1wiKXtcclxuICAgICAgICB4bWwgPSBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxET01cIik7XHJcbiAgICAgICAgeG1sLmFzeW5jID0gZmFsc2U7XHJcbiAgICAgICAgeG1sLmxvYWRYTUwocmVzcG9uc2UpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHhtbCA9IHJlc3BvbnNlO1xyXG4gICAgICB9XHJcbiAgICAgIHBhcnNlWE1MRG9jKHhtbCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGVycm9yOiBmdW5jdGlvbihYTUxIdHRwUmVxdWVzdCwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pe1xyXG4gICAgICBhbGVydCgnRGF0YSBDb3VsZCBOb3QgQmUgTG9hZGVkIC0gJysgdGV4dFN0YXR1cyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcbnJlYWRGcm9tV0FETCgpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2U7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9jb21wb25lbnRzL2NvbmZpZy5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhcGlLZXkgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd0ay1hcGkta2V5JykgfHwgXCI3ZWx4ZGt1OUdHRzVrOGowWG04S1dkQU5EZ2VjSE1WMFwiOyAvL0FQSSBLZXlcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIG5hbWU6ICdhcGlrZXknLFxyXG4gIHN0eWxlOiAncXVlcnknLFxyXG4gIHZhbHVlOiBrby5vYnNlcnZhYmxlKGFwaUtleSlcclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9hcGlrZXkuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcclxuICogQWpheCBTZXJ2aWNlXHJcbiAqIEBwYXJhbSB1cmxcclxuICogQHBhcmFtIG1ldGhvZFxyXG4gKiBAcGFyYW0gY2FsbGJhY2tcclxuICovXHJcbnZhciBhamF4U2VydmljZSA9IGZ1bmN0aW9uICh1cmwsIG1ldGhvZCwgY2FsbGJhY2spIHtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogbWV0aG9kLFxyXG4gICAgdXJsOiB1cmwsXHJcbiAgICBhc3luYzogdHJ1ZSxcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIC8vIHN1Y2Nlc3M6IGNhbGxiYWNrLFxyXG4gICAgLy8gZXJyb3I6IGZ1bmN0aW9uKHhociwgc3RhdHVzLCBlcnIpIHtcclxuICAgIC8vICAgLy8gY29uc29sZS5lcnJvcihzdGF0dXMsIGVycik7XHJcbiAgICAvLyB9LFxyXG4gICAgY29tcGxldGU6IGNhbGxiYWNrXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogRmlsdGVycyBhbmQgcHJlcGFyZXMgcGFyYW1zIHBhaXJzXHJcbiAqIEBwYXJhbSBhcnJcclxuICogQHBhcmFtIG9ialxyXG4gKiBAcGFyYW0ga29PYnNcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG52YXIgcHJlcGFyZVVybCA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICB2YXIgcmVwbGFjZW1lbnQsIHVybCwgZG9tYWluLCBwYXRoLCBtZXRob2QsIGFwaUtleSwgcGFyYW1zO1xyXG5cclxuICBpZiAoIWFyciAmJiAhYXJyLmxlbmd0aCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBcclxuICBkb21haW4gPSBhcnJbMF0uYmFzZTtcclxuICBwYXRoID0gYXJyWzBdLnBhdGg7XHJcbiAgYXBpS2V5ID0gYXJyWzFdO1xyXG4gIHBhcmFtcyA9IGFyclsyXS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgIHJldHVybiBpdGVtLnN0eWxlID09PSAncXVlcnknO1xyXG4gIH0pO1xyXG5cclxuICAvLyBhcnIgb2YgdGVtcGxhdGUgbWFya3NcclxuICByZXBsYWNlbWVudCA9IHBhdGhcclxuICAgIC5yZXBsYWNlKC9bXFx3L10rW157YS16fV0vZ21pLCAnICcpXHJcbiAgICAuc3BsaXQoL1tcXHN7fV0vKVxyXG4gICAgLmZpbHRlcihmdW5jdGlvbiAoaSl7XHJcbiAgICAgIHJldHVybiBpLmxlbmd0aDtcclxuICAgIH0pO1xyXG5cclxuICAvLyBhcnIgb2YgdGVtcGxhdGUgcGFyYW1zXHJcbiAgdmFyIHRlbXBsYXRlc0FyciA9IGFyclsyXS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgIHJldHVybiBpdGVtLnN0eWxlID09PSAndGVtcGxhdGUnO1xyXG4gIH0pO1xyXG5cclxuICAvLyByZXBsYWNlbWVudFxyXG4gIHJlcGxhY2VtZW50LmZvckVhY2goZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgdmFyIHBhcmFtID0gdGVtcGxhdGVzQXJyLmZpbmQoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgcmV0dXJuIGl0ZW0ubmFtZSA9PT0gdmFsO1xyXG4gICAgfSk7XHJcbiAgICBwYXRoID0gcGF0aC5yZXBsYWNlKCd7JysgcGFyYW0ubmFtZSArICd9JywgcGFyYW0udmFsdWUoKSB8fCBwYXJhbS5kZWZhdWx0KTtcclxuICB9KTtcclxuXHJcbiAgLy8gYWRkcyBhcGlLZXkgcGFyYW1cclxuICBpZiAoIXBhcmFtc1swXSB8fCBwYXJhbXNbMF0ubmFtZSAhPT0gJ2FwaWtleScpIHtcclxuICAgIHBhcmFtcy51bnNoaWZ0KGFwaUtleSk7XHJcbiAgfVxyXG5cclxuICAvLyBwcmVwYXJlcyBwYXJhbXMgcGFydCBvZiB1cmxcclxuICBwYXJhbXMgPSBwYXJhbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgIHJldHVybiBbaXRlbS5uYW1lLCBpdGVtLnZhbHVlKCkgfHwgaXRlbS5kZWZhdWx0XS5qb2luKCc9Jyk7XHJcbiAgICB9KS5qb2luKCcmJyk7XHJcblxyXG4gIHVybCA9IFtkb21haW4sICcvJywgcGF0aCwgJz8nLCBwYXJhbXNdLmpvaW4oJycpO1xyXG5cclxuICByZXR1cm4gdXJsO1xyXG59O1xyXG5cclxuLy8gc2VuZHMgcmVxdWVzdCB0byBnZXQgdGhlIHNlY29uZCBjb2x1bW5cclxudmFyIHNlbmRQcmltYXJ5UmVxdWVzdCA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICBjb25zb2xlLmNsZWFyKCk7XHJcbiAgdmFyIHVybCA9IHByZXBhcmVVcmwoYXJyKTtcclxuICBjb25zb2xlLmxvZyh1cmwpO1xyXG5cclxuICBhamF4U2VydmljZSh1cmwsIGFyclswXS5tZXRob2QsIGZ1bmN0aW9uKHJlc3BvbnNlLCBtZXNzYWdlKSB7XHJcbiAgICBpZiAobWVzc2FnZSA9PSAnZXJyb3InKSB7XHJcbiAgICAgIHZhciBlcnIgPSByZXNwb25zZS5yZXNwb25zZUpTT04uZXJyb3JzWzBdO1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzYWdlLCByZXNwb25zZS5zdGF0dXMpO1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIuY29kZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVyci5kZXRhaWwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzc2FnZSwgcmVzcG9uc2Uuc3RhdHVzKTtcclxuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UucmVzcG9uc2VKU09OKTtcclxuICAgIH1cclxuICB9KTtcclxufTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHNlbmRQcmltYXJ5UmVxdWVzdDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9hamF4U2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBoZiA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvaGVscGVyRnVuYycpO1xyXG52YXIgc2VsZjtcclxuXHJcblxyXG4vKipcclxuICogTWVudSBWaWV3LU1vZGVsXHJcbiAqIEBwYXJhbSBiYXNlXHJcbiAqIEBwYXJhbSBjYXRlZ29yeVxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIE1lbnVWaWV3TW9kZWwoYmFzZSwgY2F0ZWdvcnkpIHtcclxuICBzZWxmID0gdGhpcztcclxuICB0aGlzLmNhdGVnb3J5ID0gY2F0ZWdvcnk7XHJcbiAgdGhpcy5jYXRlZ29yaWVzID0ga28ub2JzZXJ2YWJsZUFycmF5KE9iamVjdC5rZXlzKGJhc2UpLm1hcChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNoZWNrZWQ6IGtvLm9ic2VydmFibGUoIWluZGV4KSxcclxuICAgICAgbmFtZTogaXRlbSxcclxuICAgICAgbGluazogZmFsc2VcclxuICAgIH1cclxuICB9KSk7XHJcblxyXG4gIC8vIGluaXRpYWwgbG9hZFxyXG4gIHRoaXMuc2VsZWN0Q2F0ZWdvcnkodGhpcy5jYXRlZ29yaWVzKClbMF0pO1xyXG59XHJcblxyXG4vKipcclxuICogTWVudSBWaWV3LU1vZGVsIG1ldGhvZFxyXG4gKiBAcGFyYW0gY2F0ZWdvcnlcclxuICovXHJcbk1lbnVWaWV3TW9kZWwucHJvdG90eXBlLnNlbGVjdENhdGVnb3J5ID0gZnVuY3Rpb24gKGNhdGVnb3J5KSB7XHJcbiAgdmFyIGNhdGVnb3J5TmFtZSA9IGNhdGVnb3J5Lm5hbWU7XHJcbiAgc2VsZi5jYXRlZ29yeShjYXRlZ29yeU5hbWUpO1xyXG4gIGhmLmNoZWNrQWN0aXZlKHNlbGYuY2F0ZWdvcmllcywgY2F0ZWdvcnlOYW1lKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTWVudVZpZXdNb2RlbDtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL1ZpZXdNb2RlbHMvbWVudVZpZXdNb2RlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMuZ2V0TW9kZWxBcnJheSA9IGZ1bmN0aW9uIGdldE1vZGVsQXJyYXkocGFyYW1zKSB7XHJcbiAgICB2YXIgb2JqID0gcGFyYW1zLm9iaiB8fCB7fSxcclxuICAgICAgICBhcnIgPSBwYXJhbXMuYXJyIHx8IFtdLFxyXG4gICAgICAgIHByb3AgPSBwYXJhbXMucHJvcCB8fCAnbmFtZSc7XHJcblxyXG4gICAgZm9yICh2YXIgaSBpbiBvYmopIHtcclxuICAgICAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShpKSkgeyBjb250aW51ZTsgfVxyXG5cclxuICAgICAgICB2YXIgaXRlbSA9IGFyci5maW5kKGZ1bmN0aW9uIChtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbTEubmFtZSA9PT0gb2JqW2ldW3Byb3BdO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoaXRlbSkgeyBjb250aW51ZTsgfVxyXG5cclxuICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgIGNoZWNrZWQ6IGtvLm9ic2VydmFibGUoZmFsc2UpLFxyXG4gICAgICAgICAgICBuYW1lOiBvYmpbaV1bcHJvcF1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBhcnI7XHJcbn07XHJcblxyXG5leHBvcnRzLmNoZWNrQWN0aXZlID0gZnVuY3Rpb24gY2hlY2tBY3RpdmUoa29BcnIsIGFjdGl2ZUVsZW0pIHtcclxuICAgIGlmICgha29BcnIgJiYgIWFjdGl2ZUVsZW0pIHtyZXR1cm4gZmFsc2U7fVxyXG5cclxuICAgIGtvQXJyKGtvQXJyKCkubWFwKGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICBpZiAob2JqLm5hbWUgPT09IGFjdGl2ZUVsZW0pIHtcclxuICAgICAgICAgICAgb2JqLmNoZWNrZWQodHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb2JqLmNoZWNrZWQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfSkpO1xyXG59O1xyXG5cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NjcmlwdHMvYXBpLWV4cGxvcmVyL3YyL2NvbXBvbmVudHMvaGVscGVyRnVuYy5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzZWxmO1xyXG52YXIgYmFzZTtcclxuXHJcbi8qKlxyXG4gKiBQYXJhbXMgVmlldy1Nb2RlbFxyXG4gKiBAcGFyYW0gcmF3XHJcbiAqIEBwYXJhbSBtZXRob2RcclxuICogQHBhcmFtIHBhcmFtc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFBhcmFtc1ZpZXdNb2RlbChyYXcsIG1ldGhvZCwgcGFyYW1zKSB7XHJcbiAgYmFzZSA9IHJhdztcclxuICBzZWxmID0gdGhpcztcclxuICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcclxuICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcclxuICBcclxuICB0aGlzLmFuaW1hdGlvblNwZWVkID0gMjAwO1xyXG4gIHRoaXMuaXNIaWRkZW4gPSBrby5vYnNlcnZhYmxlKHRydWUpO1xyXG4gIHRoaXMucGFyYW1JbkZvY3VzID0ga28ub2JzZXJ2YWJsZSgnJyk7XHJcbiAgdGhpcy5wYXJhbXNNb2RlbCA9IGtvLmNvbXB1dGVkKHNlbGYudXBkYXRlUGFyYW1zTW9kZWwpO1xyXG4gIHRoaXMucGFyYW1JbkZvY3VzKHRoaXMucGFyYW1zTW9kZWwoKVswXSk7XHJcbiAgdGhpcy5pc0RpcnR5ID0ga28uY29tcHV0ZWQoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGRpcnR5ID0gdGhpcy5wYXJhbXNNb2RlbCgpLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHJldHVybiBpdGVtLmlzRGlydHkoKSA9PT0gdHJ1ZTtcclxuICAgICAgfSk7XHJcbiAgICByZXR1cm4gZGlydHkubGVuZ3RoID4gMDtcclxuICB9LCB0aGlzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWwgYnVpbGQgb2YgU2VsZWN0IE1vZGVsXHJcbiAqL1xyXG5QYXJhbXNWaWV3TW9kZWwucHJvdG90eXBlLnVwZGF0ZVBhcmFtc01vZGVsID0gZnVuY3Rpb24gKCkge1xyXG4gIHZhciBvYmogPSBzZWxmLm1ldGhvZCgpLnBhcmFtZXRlcnMgfHwge30sXHJcbiAgICBhcnIgPSBbXTtcclxuXHJcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcclxuICAgIHZhciB2YWx1ZSA9IG9ialtpXTtcclxuXHJcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuXHJcbiAgICB2YWx1ZS52YWx1ZSA9IHZhbHVlLnZhbHVlIHx8IGtvLm9ic2VydmFibGUoJycpO1xyXG5cclxuICAgIC8vICdkaXJ0eScgZmxhZyB3YXRjaGVyIGZvciBjdXJyZW50IGZpZWxkXHJcbiAgICB2YWx1ZS5pc0RpcnR5ID0ga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuICEhdGhpcy52YWx1ZSgpLnRyaW0oKS5sZW5ndGg7XHJcbiAgICB9LCB2YWx1ZSk7XHJcblxyXG4gICAgLy8gYWRkIGNhbGVuZGFyIGJ0biBmb3IgY3VycmVudCBmaWVsZFxyXG4gICAgdmFsdWUuaGFzQ2FsZW5kYXIgPSBpLnNlYXJjaCgvKGRhdGV8dGltZSkvZ21pKSAhPSAtMTtcclxuXHJcbiAgICAvLyBhZGQgcG9wLXVwIGJ0biBmb3IgY3VycmVudCBmaWVsZFxyXG4gICAgdmFsdWUuaGFzUG9wVXAgPSBpLnNlYXJjaCgvKGF0dHJhY3Rpb25JZHx2ZW51ZUlkKS9nbWkpICE9IC0xO1xyXG5cclxuICAgIGFyci5wdXNoKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIC8vIHByZXBhcmUgb3V0cHV0IGZvciByZXF1ZXN0XHJcbiAgc2VsZi5wcmVwYXJlVXJsUGFpcnMoYXJyLCBzZWxmLnBhcmFtcyk7XHJcblxyXG4gIC8vIGNhdGNoIHBhcmFtcyBmb2N1cyBmb3IgYWJvdXQgc2VjdGlvblxyXG4gIHNlbGYucGFyYW1JbkZvY3VzKGFyclswXSk7XHJcblxyXG4gIHJldHVybiBhcnI7XHJcbn07XHJcblxyXG4vKipcclxuICogU2xpZGUgdG9nZ2xlIGZvciBwYXJhbXMgY29udGFpbmVyIG1ldGhvZFxyXG4gKiBAcGFyYW0gdmlld01vZGVsXHJcbiAqIEBwYXJhbSBldmVudFxyXG4gKi9cclxuUGFyYW1zVmlld01vZGVsLnByb3RvdHlwZS5zbGlkZVRvZ2dsZSA9IGZ1bmN0aW9uICh2aWV3TW9kZWwsIGV2ZW50KSB7XHJcbiAgJChldmVudC5jdXJyZW50VGFyZ2V0KVxyXG4gICAgLnBhcmVudHMoJy5qcy1zbGlkZS1jb250cm9sJylcclxuICAgIC5maW5kKCcuanMtc2xpZGUtd3JhcHBlcicpXHJcbiAgICAuc2xpZGVUb2dnbGUodmlld01vZGVsLmFuaW1hdGlvblNwZWVkLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZpZXdNb2RlbC5pc0hpZGRlbighdmlld01vZGVsLmlzSGlkZGVuKCkpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogTWFjaGVzIGZvY3VzZWQgcGFyYW1cclxuICogQHBhcmFtIGl0ZW1cclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUub25Gb2N1cyA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgc2VsZi5wYXJhbUluRm9jdXMoaXRlbSk7XHJcbn07XHJcblxyXG4vKipcclxuICogRmlsdGVycyBwYXJhbXMgYnkgZGVmaW5lZCB2YWx1ZVxyXG4gKiBAcGFyYW0gYXJyXHJcbiAqIEBwYXJhbSBrb09ic1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcblBhcmFtc1ZpZXdNb2RlbC5wcm90b3R5cGUucHJlcGFyZVVybFBhaXJzID0gZnVuY3Rpb24gKGFyciwga29PYnMpIHtcclxuICBpZiAoIWFyciAmJiAha29PYnMpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBrb09icyhhcnIuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICByZXR1cm4gKGl0ZW0udmFsdWUoKSB8fCBpdGVtLmRlZmF1bHQpO1xyXG4gIH0pKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGFyYW1zVmlld01vZGVsO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvVmlld01vZGVscy9wYXJhbXNWaWV3TW9kZWwuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgaGYgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2hlbHBlckZ1bmMnKTtcclxudmFyIHNlbGY7XHJcbnZhciBiYXNlO1xyXG52YXIgY2F0ZWdvcnk7XHJcblxyXG4vKipcclxuICogTWV0aG9kcyBWaWV3LU1vZGVsXHJcbiAqIEBwYXJhbSByYXdcclxuICogQHBhcmFtIGNhdGVnb3J5XHJcbiAqIEBwYXJhbSBtZXRob2RcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBNZXRob2RzVmlld01vZGVsKHJhdywgY2F0ZWdvcnksIG1ldGhvZCkge1xyXG4gIHNlbGYgPSB0aGlzO1xyXG4gIGJhc2UgPSByYXc7XHJcblxyXG4gIC8vIG9ic2VydmFibGVzXHJcbiAgdGhpcy5jYXRlZ29yeSA9IGNhdGVnb3J5O1xyXG4gIHRoaXMubWV0aG9kID0gbWV0aG9kO1xyXG4gIHRoaXMudG9nZ2xlUG9wVXAgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcclxuICB0aGlzLnJhZGlvc01vZGVsID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcclxuICB0aGlzLnNlbGVjdE1vZGVsID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcclxuICB0aGlzLnVwZGF0ZU1vZGVsKHRoaXMuY2F0ZWdvcnkoKSk7XHJcbiAgdGhpcy5jYXRlZ29yeS5zdWJzY3JpYmUodGhpcy51cGRhdGVNb2RlbCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBPbiBjYXRlZ29yeSBjaGFuZ2UgaGFuZGxlclxyXG4gKiBNZXRob2RzIFZpZXctTW9kZWwgbWV0aG9kXHJcbiAqIEBwYXJhbSBjYXRlZ29yeVxyXG4gKi9cclxuTWV0aG9kc1ZpZXdNb2RlbC5wcm90b3R5cGUudXBkYXRlTW9kZWwgPSBmdW5jdGlvbiAoY2F0ZWdvcnkpIHtcclxuICAvLyBpbml0aWFsIHJhZGlvcyBtb2RlbFxyXG4gIHNlbGYudXBkYXRlUmFkaW9zTW9kZWwoYmFzZVtjYXRlZ29yeV0pO1xyXG4gIC8vIGluaXRpYWwgc2VsZWN0IG1vZGVsIChmaXJzdCBtZXRob2QgaW4gZmlyc3Qgc2VjdGlvbiBmb3Igc3RhcnQpXHJcbiAgc2VsZi51cGRhdGVTZWxlY3Qoc2VsZi5yYWRpb3NNb2RlbCgpWzBdKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBPbmNoYW5nZSBoYW5kbGVyIGZvciBSYWRpbyBidXR0b25zXHJcbiAqIEBwYXJhbSBpdGVtXHJcbiAqL1xyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS5vbmNoYW5nZVJhZGlvcyA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgLy91cGRhdGUgUmFkaW9zIE1vZGVsXHJcbiAgaGYuY2hlY2tBY3RpdmUoc2VsZi5yYWRpb3NNb2RlbCwgaXRlbS5uYW1lKTtcclxuICAvL3VwZGF0ZSBTZWxlY3QgTW9kZWxcclxuICBzZWxmLnVwZGF0ZVNlbGVjdChpdGVtKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsIGJ1aWxkIG9mIFJhZGlvcyBNb2RlbFxyXG4gKiBAcGFyYW0gcGFyYW1cclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKi9cclxuTWV0aG9kc1ZpZXdNb2RlbC5wcm90b3R5cGUudXBkYXRlUmFkaW9zTW9kZWwgPSBmdW5jdGlvbiAocGFyYW0pIHtcclxuICB2YXIgb2JqID0gcGFyYW0gfHwge30sXHJcbiAgICBhcnIgPSBbXTtcclxuXHJcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcclxuICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGkpKSB7IGNvbnRpbnVlOyB9XHJcbiAgICB2YXIgaXRlbSA9IHtcclxuICAgICAgY2hlY2tlZDoga28ub2JzZXJ2YWJsZShpID09PSAnQUxMJyksXHJcbiAgICAgIG5hbWU6IGlcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGkgPT09ICdBTEwnKSB7XHJcbiAgICAgIGFyci51bnNoaWZ0KGl0ZW0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhcnIucHVzaChpdGVtKTtcclxuICAgIH1cclxuICB9XHJcbiAgdGhpcy5yYWRpb3NNb2RlbChhcnIpO1xyXG4gIHJldHVybiBhcnI7XHJcbn07XHJcblxyXG4vKipcclxuICogSW5pdGlhbCBidWlsZCBvZiBTZWxlY3QgTW9kZWxcclxuICogQHBhcmFtIGl0ZW1cclxuICovXHJcbk1ldGhvZHNWaWV3TW9kZWwucHJvdG90eXBlLnVwZGF0ZVNlbGVjdCA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgdmFyIG9iaiA9IGJhc2Vbc2VsZi5jYXRlZ29yeSgpXVtpdGVtLm5hbWVdfHwge30sXHJcbiAgICBhcnIgPSBbXSxcclxuICAgIGNvdW50ID0gMDtcclxuXHJcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcclxuICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGkpKSB7IGNvbnRpbnVlOyB9XHJcbiAgICB2YXIgcHJvcGVydHkgPSBvYmpbaV07XHJcbiAgICBhcnIucHVzaCh7XHJcbiAgICAgIGNoZWNrZWQ6IGtvLm9ic2VydmFibGUoIWNvdW50KSxcclxuICAgICAgbmFtZTogcHJvcGVydHkubmFtZSxcclxuICAgICAgaWQ6IHByb3BlcnR5LmlkLFxyXG4gICAgICBsaW5rOiBwcm9wZXJ0eS5kb2N1bWVudGF0aW9uLFxyXG4gICAgICBhYm91dDogcHJvcGVydHkuZGVzY3JpcHRpb24sXHJcbiAgICAgIGNhdGVnb3J5OiBwcm9wZXJ0eS5jYXRlZ29yeSxcclxuICAgICAgbWV0aG9kOiBwcm9wZXJ0eS5tZXRob2RcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIC8vIHNldCBnbG9iYWwgb2JzZXJ2YWJsZVxyXG4gICAgIWNvdW50ICYmIHRoaXMubWV0aG9kKGJhc2VbcHJvcGVydHkuY2F0ZWdvcnldW3Byb3BlcnR5Lm1ldGhvZF1bcHJvcGVydHkuaWRdKTtcclxuXHJcbiAgICBjb3VudCsrO1xyXG4gIH1cclxuICBzZWxmLnNlbGVjdE1vZGVsKGFycik7XHJcbn07XHJcblxyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS5vblNlbGVjdE1ldGhvZCA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgaGYuY2hlY2tBY3RpdmUoc2VsZi5zZWxlY3RNb2RlbCwgaXRlbS5uYW1lKTtcclxuICBzZWxmLm1ldGhvZChiYXNlW2l0ZW0uY2F0ZWdvcnldW2l0ZW0ubWV0aG9kXVtpdGVtLmlkXSk7XHJcbn07XHJcblxyXG5NZXRob2RzVmlld01vZGVsLnByb3RvdHlwZS5vbkFib3V0Q2xpY2sgPSBmdW5jdGlvbiAobW9kZWwsIGV2ZW50KSB7XHJcbiAgbW9kZWwudG9nZ2xlUG9wVXAoIW1vZGVsLnRvZ2dsZVBvcFVwKCkpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNZXRob2RzVmlld01vZGVsO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zY3JpcHRzL2FwaS1leHBsb3Jlci92Mi9WaWV3TW9kZWxzL21ldGhvZHNWaWV3TW9kZWwuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcclxuICogQ3VzdG9tIFNlbGVjdCBjb21wb25lbnRcclxuICovXHJcbnZhciBzZWxmO1xyXG5cclxuLyoqXHJcbiAqIEN1c3RvbSBTZWxlY3QgVmlldy1Nb2RlbFxyXG4gKiBAcGFyYW0gcGFyYW1zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gQ3VzdG9tU2VsZWN0KHBhcmFtcykge1xyXG4gIHNlbGYgPSB0aGlzO1xyXG5cclxuICB0aGlzLmFuaW1hdGlvblNwZWVkID0gcGFyYW1zLmFuaW1hdGlvblNwZWVkIHx8IDIwMDtcclxuXHJcbiAgLy9vYnNlcnZhYmxlc1xyXG4gIHRoaXMuc2VsZWN0TW9kZWwgPSBwYXJhbXMub3B0aW9ucyB8fCBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xyXG4gIHRoaXMucGxhY2Vob2xkZXIgPSBrby5vYnNlcnZhYmxlKHBhcmFtcy5wbGFjZWhvbGRlciB8fCAnJyk7XHJcbiAgdGhpcy5vbnNlbGVjdCA9IHBhcmFtcy5vbnNlbGVjdCB8fCBmdW5jdGlvbiAoaXRlbSkgeyBjb25zb2xlLmxvZyhpdGVtICsnc2VsZWN0ZWQhJyl9O1xyXG4gIHRoaXMuc2VsZWN0ZWQgPSBrby5vYnNlcnZhYmxlKHRoaXMuc2VsZWN0TW9kZWwoKVswXSk7XHJcbiAgdGhpcy5pc09uZU9wdGlvbiA9IGtvLnB1cmVDb21wdXRlZChmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RNb2RlbCgpLmxlbmd0aCA8IDI7IC8vIG1vcmUgdGhhbiBvbmUgb3B0aW9uXHJcbiAgfSwgdGhpcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRFbGVtZW50KGV2ZW50KSB7XHJcbiAgdmFyIHBhcmVudCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkucGFyZW50cygnLmpzLWN1c3RvbS1zZWxlY3QnKTtcclxuICByZXR1cm4ge1xyXG4gICAgd3JhcHBlcjogcGFyZW50LmZpbmQoJy5qcy1jdXN0b20tc2VsZWN0LXdyYXBwZXInKSxcclxuICAgIGxheWVyOiBwYXJlbnQuZmluZCgnLmpzLWN1c3RvbS1zZWxlY3QtbGF5ZXInKVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEN1c3RvbSBTZWxlY3QgVmlldy1Nb2RlbCBtZXRob2RcclxuICogQHBhcmFtIHZpZXdNb2RlbFxyXG4gKiBAcGFyYW0gZXZlbnRcclxuICovXHJcbkN1c3RvbVNlbGVjdC5wcm90b3R5cGUuc2xpZGVUb2dnbGUgPSBmdW5jdGlvbih2aWV3TW9kZWwsIGV2ZW50KSB7XHJcbiAgaWYgKHZpZXdNb2RlbC5pc09uZU9wdGlvbigpKSB7cmV0dXJuIGZhbHNlO31cclxuICB2YXIgZWwgPSBmaW5kRWxlbWVudChldmVudCk7XHJcbiAgICBlbC53cmFwcGVyLnNsaWRlVG9nZ2xlKHZpZXdNb2RlbC5hbmltYXRpb25TcGVlZCk7XHJcbiAgICBlbC5sYXllci50b2dnbGVDbGFzcygnaGlkZGVuJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3VzdG9tIFNlbGVjdCBWaWV3LU1vZGVsIG1ldGhvZFxyXG4gKiBAcGFyYW0gaXRlbVxyXG4gKiBAcGFyYW0gZXZlbnRcclxuICovXHJcbkN1c3RvbVNlbGVjdC5wcm90b3R5cGUuc2VsZWN0SXRlbSA9IGZ1bmN0aW9uIChpdGVtLCBldmVudCkge1xyXG4gIHZhciBzZWxmID0gdGhpcztcclxuICB0aGlzLnNlbGVjdGVkKGl0ZW0pO1xyXG4gIC8vIHJ1biBoYW5kbGVyXHJcbiAgdGhpcy5vbnNlbGVjdChpdGVtKTtcclxuICAvLyBzbGlkZSB1cFxyXG4gIHRoaXMuc2xpZGVUb2dnbGUoc2VsZiwgZXZlbnQpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdjdXN0b20tc2VsZWN0Jywge1xyXG4gIHZpZXdNb2RlbDogQ3VzdG9tU2VsZWN0LFxyXG4gIHRlbXBsYXRlOiAoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3QganMtY3VzdG9tLXNlbGVjdFwiPicsXHJcbiAgICAgICc8ZGl2IGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0LXdyYXBwZXJcIj4nLFxyXG4gICAgICAgICc8c2VsZWN0IGRhdGEtYmluZD1cIm9wdGlvbnM6IHNlbGVjdE1vZGVsLCBvcHRpb25zVGV4dDogXFwnbmFtZVxcJywgdmFsdWU6IHNlbGVjdGVkXCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2ZpZWxkXCIgbmFtZT1cImFwaS1leHAtbWV0aG9kXCI+PC9zZWxlY3Q+JyxcclxuICAgICAgICAnPHNwYW4gY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX3BsYWNlaG9sZGVyXCI+JyxcclxuICAgICAgICAgICc8aW5wdXQgZGF0YS1iaW5kPVwiZXZlbnQ6IHtjbGljazogc2xpZGVUb2dnbGV9LCBhdHRyOiB7dmFsdWU6IHNlbGVjdGVkKCkubmFtZSwgZGlzYWJsZWQ6IGlzT25lT3B0aW9ufVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCJcIiByZWFkb25seT1cIlwiPicsXHJcbiAgICAgICAgICAnPGIgZGF0YS1iaW5kPVwiY3NzOiB7aGlkZGVuOiBpc09uZU9wdGlvbn1cIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9fY2hldnJvblwiPiZuYnNwOzwvYj4nLFxyXG4gICAgICAgICc8L3NwYW4+JyxcclxuICAgICAgICAnPHVsIGRhdGEtYmluZD1cImZvcmVhY2g6IHNlbGVjdE1vZGVsXCIgY2xhc3M9XCJhcGktZXhwLWN1c3RvbS1zZWxlY3RfX2xpc3QganMtY3VzdG9tLXNlbGVjdC13cmFwcGVyXCI+JyxcclxuICAgICAgICAgICc8bGkgZGF0YS1iaW5kPVwiY3NzOiB7XFwnYWN0aXZlXFwnOiBjaGVja2VkfVwiIGNsYXNzPVwiYXBpLWV4cC1jdXN0b20tc2VsZWN0X19pdGVtXCI+JyxcclxuICAgICAgICAgICAgJzxidXR0b24gZGF0YS1iaW5kPVwiZXZlbnQ6IHtjbGljazogJHBhcmVudC5zZWxlY3RJdGVtLmJpbmQoJHBhcmVudCl9LCB0ZXh0OiBuYW1lLCBjc3M6IHtcXCdhY3RpdmVcXCc6IGNoZWNrZWQoKX0sIGF0dHI6IHtcXCdkYXRhLXZhbHVlXFwnOiBuYW1lfVwiICBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9faXRlbS1sYWJlbFwiIGhyZWY9XCIjXCI+PC9idXR0b24+JyxcclxuICAgICAgICAgICAgJzxhIGRhdGEtYmluZD1cImF0dHI6IHtocmVmOiBsaW5rfSwgY3NzOiB7XFwnaGlkZGVuXFwnOiAhbGlua31cIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdF9faXRlbS1saW5rXCIgdGFyZ2V0PVwiX2JsYW5rXCI+Jm5ic3A7PC9hPicsXHJcbiAgICAgICAgICAnPC9saT4nLFxyXG4gICAgICAgICc8L3VsPicsXHJcbiAgICAgICc8L2Rpdj4nLFxyXG4gICAgICAnPGRpdiBkYXRhLWJpbmQ9XCJjbGljazogc2xpZGVUb2dnbGVcIiBjbGFzcz1cImFwaS1leHAtY3VzdG9tLXNlbGVjdC1sYXllciBqcy1jdXN0b20tc2VsZWN0LWxheWVyIGhpZGRlblwiPjwvZGl2PicsXHJcbiAgICAnPC9kaXY+J1xyXG4gIF0pLmpvaW4oJycpXHJcbn0pO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2NyaXB0cy9hcGktZXhwbG9yZXIvdjIvY29tcG9uZW50cy9jdXN0b21TZWxlY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9