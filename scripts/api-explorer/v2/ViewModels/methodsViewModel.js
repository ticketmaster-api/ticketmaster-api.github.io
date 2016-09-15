var hf = require('../components/helperFunc');
var self;
var base;

/**
 * Methods View-Model
 * @param raw
 * @constructor
 */
function MethodsViewModel(raw) {
  self = this;
  base = raw;
  // observables
  this.apikey = ko.observable('');
  this.radiosArr = ko.observableArray([]); // {method: 'str', checked: false}
  this.selectArr = ko.observableArray([]); // {name: 'str', checked: false, link: 'str', about: 'str'}
  this.initialValue = ko.observable()
}

/**
 * Methods View-Model method
 * @param name
 */
MethodsViewModel.prototype.updateModel = function (name) {
  var radios = hf.getModelArray({
    obj: base[name],
    arr: [{
      checked: true,
      name: 'ALL'
    }],
    prop: 'method'
  });

  var options = hf.getModelArray({
    obj: base[name],
    prop: 'name'
  });

  self.radiosArr(radios);
  self.selectArr(options);
  self.initialValue()
};

module.exports = MethodsViewModel;