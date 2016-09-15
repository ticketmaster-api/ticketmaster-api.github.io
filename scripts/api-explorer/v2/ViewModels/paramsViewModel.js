var self;

/**
 * Params View-Model
 * @param base
 * @constructor
 */
function ParamsViewModel(base) {
    self = this;

    // observables
    this.fieldsArr = ko.observableArray([]); // {name: 'str', value: 'str', isDirty: false, valid: true, about: 'str'}
}

module.exports = ParamsViewModel;