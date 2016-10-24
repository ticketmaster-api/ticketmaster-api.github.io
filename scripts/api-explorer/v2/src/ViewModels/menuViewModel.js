var hf = require('../modules/helperFunc');
var self;

/**
 * Menu View-Model
 * @param base
 * @param category
 * @constructor
 */
function MenuViewModel(base, selectedCategory) {
  self = this;

	this.selectedCategory = selectedCategory;
	var initCategory = ko.utils.unwrapObservable(selectedCategory);
	this.categories = ko.observableArray(Object.keys(base).map(function (item, index) {
		var checked = initCategory ? item === initCategory: !index;
		// initial load
		checked && self.selectedCategory(item);
		return {
			checked: ko.observable(checked),
			name: item,
			link: false
		}
	}));
}

/**
 * Menu View-Model method
 * @param category
 */
MenuViewModel.prototype.selectCategory = function (category) {
  var categoryName = category.name;
  self.selectedCategory(categoryName);
  hf.checkActive(self.categories, categoryName);
};

module.exports = MenuViewModel;
