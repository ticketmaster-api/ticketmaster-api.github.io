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
	
	var base = __webpack_require__(4);
	// var FilterViewModel = require('./../ViewModels/filterViewModel');
	var MenuViewModel = __webpack_require__(5);
	var ParamsViewModel = __webpack_require__(6);
	var MethodsViewModel = __webpack_require__(7);
	
	/**
	 * AppViewModel
	 * @param obj {object} global data object
	 */
	function AppViewModel(obj) {
	  var base = obj || {};
	  appVM = this;
	
	  // sub-models
	  // this.filter = new FilterViewModel(base);
	  this.methods = new MethodsViewModel(base);
	  this.menu = new MenuViewModel(base, this.methods);
	  this.params = new ParamsViewModel(base);
	}
	
	// Activates knockout.js
	ko.applyBindings(new AppViewModel(base));
	module.exports = base;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Custom Select component
	 */
	
	var hf = __webpack_require__(3);
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
	  this.selectArr = params.options || ko.observableArray([]);
	  this.placeholder = ko.observable(params.placeholder || '');
	  this.selected = ko.observable();
	}
	
	/**
	 * Custom Select View-Model method
	 * @param viewModel
	 * @param event
	 */
	CustomSelect.prototype.slideToggle = function(viewModel, event) {
	  $(event.currentTarget)
	    .parent()
	    .next('ul')
	    .slideToggle(viewModel.animationSpeed);
	};
	
	/**
	 * Custom Select View-Model method
	 * @param item
	 */
	CustomSelect.prototype.selectItem = function (item, event) {
	  this.selected(item);
	  hf.checkActive(self.selectArr, item.name);
	  $(event.currentTarget)
	    .parents('.api-exp-custom-select')
	    .find('input')
	    .trigger('click');
	};
	
	module.exports = ko.components.register('custom-select', {
	  viewModel: CustomSelect,
	  template: ([
	    '<div class="api-exp-custom-select">',
	    '<select data-bind="options: selectArr, optionsText: \'name\', value: selected" class="api-exp-custom-select__field" name="api-exp-method"></select>',
	    '<span class="api-exp-custom-select__placeholder">',
	    '<input data-bind="click: slideToggle, attr: {value: selected().name}" type="text" value="" readonly="">',
	    '</span>',
	    '<ul data-bind="foreach: selectArr" class="api-exp-custom-select__list">',
	    '<li class="api-exp-custom-select__item">',
	    '<a data-bind="click: $parent.selectItem.bind($parent), text: name, attr: {\'data-value\': name}, css: {active: checked}"  class="api-exp-custom-select__item-label" href="#"></a>',
	    '<a class="api-exp-custom-select__item-link" href="#">&nbsp;</a>',
	    '</li>',
	    '</ul>',
	    '</div>'
	  ]).join('')
	});


/***/ },
/* 3 */
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
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// var methodsVM = require('./methodsViewModel');
	var hf = __webpack_require__(3);
	var self;
	var methodsVM;
	
	/**
	 * Menu View-Model
	 * @param base
	 * @constructor
	 */
	function MenuViewModel(base, methods) {
	    self = this;
	    methodsVM = methods;
	    this.categories = ko.observableArray(Object.keys(base).map(function (item) {
	        return {
	            checked: ko.observable(false),
	            name: item
	        }
	    }));
	
	    // initial load
	    this.selectCategory(Object.keys(base)[0]);
	}
	
	
	/**
	 * Menu View-Model method
	 * @param categoryName
	 */
	MenuViewModel.prototype.selectCategory = function (categoryName) {
	    methodsVM.updateModel(categoryName);
	    hf.checkActive(self.categories, categoryName);
	};
	
	module.exports = MenuViewModel;


/***/ },
/* 6 */
/***/ function(module, exports) {

	var self;
	
	/**
	 * Params View-Model
	 * @param base
	 * @constructor
	 */
	function ParamsViewModel(base) {
	  self = this;
	
	  this.animationSpeed = 200;
	
	  // observables
	  this.fieldsArr = ko.observableArray([]); // {name: 'str', value: 'str', isDirty: false, valid: true, about: 'str'}
	}
	
	ParamsViewModel.prototype.slideToggle = function(viewModel, event) {
	  console.log($(event.currentTarget));
	
	  $(event.currentTarget)
	    .parent('.js-slide-wrapper')
	    .slideToggle(viewModel.animationSpeed);
	};
	
	module.exports = ParamsViewModel;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var hf = __webpack_require__(3);
	var self;
	var base;
	
	/**
	 * Methods View-Model
	 * @param raw
	 * @constructor
	 */
	function MethodsViewModel(raw) {
	  self = this;
	  base = raw;
	  
	  // observables
	  this.apikey = ko.observable('');
	  this.radiosArr = ko.observableArray([]); // {method: 'str', checked: false}
	  this.selectArr = ko.observableArray([]); // {name: 'str', checked: false, link: 'str', about: 'str'}
	}
	
	/**
	 * Methods View-Model method
	 * @param name
	 */
	MethodsViewModel.prototype.updateModel = function (name) {
	  self.updateOnMethodsType(base[name]);
	  self.updateOnMethodsList();
	};
	
	MethodsViewModel.prototype.updateOnMethodsType = function (param) {
	  var obj = param || {},
	    arr = [],
	    count = 0;
	
	  for (var i in obj) {
	    if (!obj.hasOwnProperty(i)) { continue; }
	
	    var item = {
	      checked: ko.observable(!count),
	      name: i
	    };
	
	    if (i === 'ALL') {
	      arr.unshift(item)
	    } else {
	      arr.push(item);
	    }
	  }
	
	  self.radiosArr(arr);
	
	  return arr;
	};
	
	MethodsViewModel.prototype.updateOnMethodsList = function () {
	  console.log(self.radiosArr());
	  // var obj = self.radiosArr() || {},
	  //   arr = [],
	  //   count = 0;
	  //
	  // for (var i in obj) {
	  //   if (!obj.hasOwnProperty(i)) { continue; }
	  //
	  //   arr.push({
	  //     checked: ko.observable(!count),
	  //     name: i
	  //   });
	  // }
	  // self.selectArr(arr);
	};
	
	module.exports = MethodsViewModel;

/***/ }
/******/ ]);
//# sourceMappingURL=script.js.map