var hf = require('../components/helperFunc');
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
