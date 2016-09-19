
/**
 * Filter View-Model
 * @param base
 * @constructor
 */
function FilterViewModel(base) {
    filterVM = this;

    // sub-models

    // observables
    this.isEnabled = ko.observable(true);
}

module.exports = FilterViewModel;