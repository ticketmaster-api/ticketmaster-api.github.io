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
}

/**
 * Methods View-Model method
 * @param name
 */
MethodsViewModel.prototype.updateModel = function (name) {
  self.updateOnMethodsType(base[name]);
  self.updateOnMethodsList();
};

MethodsViewModel.prototype.updateOnMethodsType = function (param) {
  var obj = param || {},
    arr = [],
    count = 0;

  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) { continue; }

    var item = {
      checked: ko.observable(!count),
      name: i
    };

    if (i === 'ALL') {
      arr.unshift(item)
    } else {
      arr.push(item);
    }
  }

  self.radiosArr(arr);

  return arr;
};

MethodsViewModel.prototype.updateOnMethodsList = function () {
  console.log(self.radiosArr());
  // var obj = self.radiosArr() || {},
  //   arr = [],
  //   count = 0;
  //
  // for (var i in obj) {
  //   if (!obj.hasOwnProperty(i)) { continue; }
  //
  //   arr.push({
  //     checked: ko.observable(!count),
  //     name: i
  //   });
  // }
  // self.selectArr(arr);
};

module.exports = MethodsViewModel;