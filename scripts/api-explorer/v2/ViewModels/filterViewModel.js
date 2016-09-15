var MethodsViewModel = require('./methodsViewModel');
var ParamsViewModel = require('./paramsViewModel');

/**
 * Filter View-Model
 * @param base
 * @constructor
 */
function FilterViewModel(base) {
    filterVM = this;

    // sub-models
    this.methods = new MethodsViewModel(base);
    this.params = new ParamsViewModel(base);

    // observables
    this.isEnabled = ko.observable(true);
}

module.exports = FilterViewModel;