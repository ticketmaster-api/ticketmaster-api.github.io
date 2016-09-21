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
	
	__webpack_require__(2);
	
	var base = __webpack_require__(3);
	var apikey = __webpack_require__(4);
	var MenuViewModel = __webpack_require__(5);
	var ParamsViewModel = __webpack_require__(7);
	var MethodsViewModel = __webpack_require__(8);
	
	/**
	 * AppViewModel
	 * @param obj {object} global data object
	 */
	function AppViewModel(obj) {
	  var base = obj || {};
	  self = this;
	  this.apikey = ko.observable(apikey);
	
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
	}
	
	// Activates knockout.js
	ko.applyBindings(new AppViewModel(base));
	module.exports = base;

/***/ },
/* 2 */
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
	  return $(event.currentTarget)
	    .parents('.js-custom-select')
	    .find('.js-custom-select-wrapper')
	}
	
	/**
	 * Custom Select View-Model method
	 * @param viewModel
	 * @param event
	 */
	CustomSelect.prototype.slideToggle = function(viewModel, event) {
	  if (viewModel.isOneOption()) {return false;}
	  findElement(event).slideToggle(viewModel.animationSpeed);
	};
	
	CustomSelect.prototype.slideUp = function(viewModel, event) {
	  if (viewModel.isOneOption()) {return false;}
	  findElement(event).slideUp(viewModel.animationSpeed);
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
	  this.slideUp(self, event);
	};
	
	module.exports = ko.components.register('custom-select', {
	  viewModel: CustomSelect,
	  template: ([
	    '<div data-bind="event: {blur: slideUp}" class="api-exp-custom-select js-custom-select">',
	      '<select data-bind="options: selectModel, optionsText: \'name\', value: selected" class="api-exp-custom-select__field" name="api-exp-method"></select>',
	      '<span class="api-exp-custom-select__placeholder">',
	        '<input data-bind="event: {click: slideToggle}, attr: {value: selected().name, disabled: isOneOption}" type="text" value="" readonly="">',
	        '<b data-bind="css: {hidden: isOneOption}" class="api-exp-custom-select__chevron">&nbsp;</b>',
	      '</span>',
	      '<ul data-bind="foreach: selectModel" class="api-exp-custom-select__list js-custom-select-wrapper">',
	        '<li data-bind="css: {\'active\': checked}" class="api-exp-custom-select__item">',
	          '<button data-bind="event: {click: $parent.selectItem.bind($parent)}, text: name, css: {\'active\': checked()}, attr: {\'data-value\': name}"  class="api-exp-custom-select__item-label" href="#"></button>',
	          '<a data-bind="attr: {href: link}" class="api-exp-custom-select__item-link" target="_blank">&nbsp;</a>',
	        '</li>',
	      '</ul>',
	    '</div>'
	  ]).join('')
	});


/***/ },
/* 3 */
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
/* 4 */
/***/ function(module, exports) {

	var apiKey = sessionStorage.getItem('tk-api-key') || "7elxdku9GGG5k8j0Xm8KWdANDgecHMV0"; //API Key
	
	module.exports = apiKey;

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
	      link: '#'
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
	  this.animationSpeed = 200;
	  this.aboutParam = ko.observable('');
	  this.paramInFocus = ko.observable('');
	  this.paramsModel = ko.computed(self.updateParamsModel);
	  this.paramInFocus(this.paramsModel()[0]);
	}
	
	/**
	 * Initial build of Select Model
	 * @param item
	 */
	ParamsViewModel.prototype.updateParamsModel = function () {
	  var obj = self.method().parameters || {},
	    arr = [];
	
	  for (var i in obj) {
	    if (!obj.hasOwnProperty(i)) { continue; }
	    obj[i].value = ko.observable('');
	    // var val = obj[i].value;
	    obj[i].isDirty = ko.pureComputed(function () {
	      return !!this.value().trim().length;
	    }, obj[i]);
	    arr.push(obj[i]);
	  }
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
	    .slideToggle(viewModel.animationSpeed);
	};
	
	ParamsViewModel.prototype.onFocus = function (item) {
	  self.paramInFocus(item);
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
	 * @param method
	 * @constructor
	 */
	function MethodsViewModel(raw, category, method) {
	  self = this;
	  base = raw;
	
	  // observables
	  this.category = category;
	  this.method = method;
	  this.apikey = ko.observable('');
	  this.radiosModel = ko.observableArray([]); // {name: 'str', checked: false}
	  this.selectModel = ko.observableArray([]); // {id: 'str', name: 'str', checked: false, link: 'str', about: 'str'}
	  this.updateModel(this.category());
	  this.category.subscribe(this.updateModel);
	}
	
	/**
	 * On category change handler
	 * Methods View-Model method
	 * @param name
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
	
	module.exports = MethodsViewModel;

/***/ }
/******/ ]);
//# sourceMappingURL=script.js.map