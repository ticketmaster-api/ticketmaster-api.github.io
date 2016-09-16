// var methodsVM = require('./methodsViewModel');
var hf = require('../components/helperFunc');
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
