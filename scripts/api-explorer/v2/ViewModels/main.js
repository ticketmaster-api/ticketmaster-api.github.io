/**
 * Main file for Api Explrer v2.0
 * For development please use Webpack to bundle all modules
 * It can be made using npm scripts cmd - 'webpack'
 */
// custom bindings
require('../customBindings/foreachProp');

// Modules
var base = require('../modules/base');
var apiKey = require('../modules/apikey');
var ajaxService = require('../modules/ajaxService');

// View Models
var MenuViewModel = require('../ViewModels/menuViewModel');
var ParamsViewModel = require('./paramsViewModel');
var MethodsViewModel = require('./methodsViewModel');
var RequestsListViewModel = require('./requestsListViewModel');

// Components
require('../components/index');

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
