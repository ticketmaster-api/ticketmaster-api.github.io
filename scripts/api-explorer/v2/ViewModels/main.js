/**
 * Main file for Api Explrer v2.0
 * For development please use Webpack to bundle all modules
 * It can be made using npm scripts cmd - 'webpack'
 */

require('./../components/customSelect');

var base = require('./../components/config');
// var FilterViewModel = require('./../ViewModels/filterViewModel');
var MenuViewModel = require('./../ViewModels/menuViewModel');
var ParamsViewModel = require('./paramsViewModel');
var MethodsViewModel = require('./methodsViewModel');

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