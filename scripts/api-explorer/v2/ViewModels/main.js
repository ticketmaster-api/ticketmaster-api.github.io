/**
 * Main file for Api Explrer v2.0
 * For development please use Webpack to bundle all modules
 * It can be made using npm scripts cmd - 'webpack'
 */

require('./../components/customSelect');

var base = require('./../components/config');
var FilterViewModel = require('./../ViewModels/filterViewModel');
var MenuViewModel = require('./../ViewModels/menuViewModel');

/**
 * AppViewModel
 * @param obj {object} global data object
 */
function AppViewModel(obj) {
  var base = obj || {};
  appVM = this;

  // sub-models
  this.filter = new FilterViewModel(base);
  this.menu = new MenuViewModel(base, this.filter);
}

// Activates knockout.js
ko.applyBindings(new AppViewModel(base));
module.exports = base;