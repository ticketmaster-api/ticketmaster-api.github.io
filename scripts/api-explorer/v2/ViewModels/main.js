/**
 * Main file for Api Explrer v2.0
 * For development please use Webpack to bundle all modules
 * It can be made using npm scripts cmd - 'webpack'
 */

require('./../components/customSelect');

var base = require('./../components/config');
var apikey = require('./../components/apikey');
var MenuViewModel = require('./../ViewModels/menuViewModel');
var ParamsViewModel = require('./paramsViewModel');
var MethodsViewModel = require('./methodsViewModel');

/**
 * AppViewModel
 * @param obj {object} global data object
 */
function AppViewModel(obj) {
  var base = obj || {};
  self = this;
  this.apikey = ko.observable(apikey);

  // observables
  this.selectedMethod = ko.observable('');
  this.selectedParams = ko.observableArray([]);
  // sub-models
  this.methods = new MethodsViewModel(base, this.selectedMethod);
  this.menu = new MenuViewModel(base, this.methods);
  this.params = new ParamsViewModel(base, this.selectedMethod, this.selectedParams);
  this.sendButtonText = ko.pureComputed(function () {
    return this.selectedMethod().method.toLowerCase();
  }, this);
}

// Activates knockout.js
ko.applyBindings(new AppViewModel(base));
module.exports = base;