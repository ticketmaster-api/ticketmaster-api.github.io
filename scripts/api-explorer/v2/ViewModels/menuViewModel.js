// var methodsVM = require('./methodsViewModel');
var hf = require('../components/helperFunc');
var self;
var methodsVM;


/**
 * Menu View-Model
 * @param base
 * @param methods
 * @constructor
 */
function MenuViewModel(base, methods, category) {
  // this.category = category;
  self = this;
  methodsVM = methods;
  this.categories = ko.observableArray(Object.keys(base).map(function (item) {
    return {
      checked: ko.observable(false),
      name: item,
      link: '#'
    }
  }));

  // initial load
  this.selectCategory({
    checked: ko.observable(true),
    name: Object.keys(base)[0],
    link: '#'
  });
}

/**
 * Menu View-Model method
 * @param category
 */
MenuViewModel.prototype.selectCategory = function (category) {
  var categoryName = category.name;
  // self.category(categoryName);
  methodsVM.updateModel(categoryName);
  hf.checkActive(self.categories, categoryName);
};

module.exports = MenuViewModel;
