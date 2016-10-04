/**
 * Main file for Api Explrer v2.0
 * For development please use Webpack to bundle all modules
 * It can be made using npm scripts cmd - 'webpack'
 */
// Components
var base = require('./../components/base');
var apiKey = require('./../components/apikey');
var ajaxService = require('./../components/ajaxService');

// View Models
var MenuViewModel = require('./../ViewModels/menuViewModel');
var ParamsViewModel = require('./paramsViewModel');
var MethodsViewModel = require('./methodsViewModel');
var RequestsListViewModel = require('./requestsListViewModel');

// Modules
var customSelect = require('./../components/customSelect');

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
