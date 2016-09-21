'use strict';

var hf = require('../components/helperFunc');
var self;
var base;
var category;

/**
 * Methods View-Model
 * @param raw
 * @param method
 * @constructor
 */
function MethodsViewModel(raw, method) {
  self = this;
  base = raw;

  // observables
  this.method = method;
  this.apikey = ko.observable('');
  this.radiosModel = ko.observableArray([]); // {name: 'str', checked: false}
  this.selectModel = ko.observableArray([]); // {id: 'str', name: 'str', checked: false, link: 'str', about: 'str'}
  this.methodIsSelected = ko.observable('');
}

/**
 * On category change handler
 * Methods View-Model method
 * @param name
 */
MethodsViewModel.prototype.updateModel = function (name) {
  category = name;
  // initial radios model
  this.updateRadiosModel(base[name]);
  // initial select model (first method in first section for start)
  this.updateSelect(this.radiosModel()[0]);
  this.methodIsSelected(this.selectModel()[0]);
};

/**
 * Onchange handler for Radio buttons
 * @param item
 */
MethodsViewModel.prototype.onchangeRadios = function (item) {
  //update Radios Model
  hf.checkActive(self.radiosModel, item.name);
  //update Select Model
  self.updateSelect(item);
};

/**
 * Initial build of Radios Model
 * @param param
 * @returns {Array}
 */
MethodsViewModel.prototype.updateRadiosModel = function (param) {
  var obj = param || {},
    arr = [];

  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) { continue; }
    var item = {
      checked: ko.observable(i === 'ALL'),
      name: i
    };

    if (i === 'ALL') {
      arr.unshift(item)
    } else {
      arr.push(item);
    }
  }
  this.radiosModel(arr);
  return arr;
};

/**
 * Initial build of Select Model
 * @param item
 */
MethodsViewModel.prototype.updateSelect = function (item) {
  var obj = base[category][item.name]|| {},
    arr = [],
    count = 0;

  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) { continue; }
    var property = obj[i];
    arr.push({
      checked: ko.observable(!count),
      name: property.name,
      id: property.id,
      link: property.documentation,
      about: property.description,
      category: property.category,
      method: property.method
    });
    
    // set global observable
    this.method(base[property.category][property.method][property.id]);
    
    count++;
  }
  self.selectModel(arr);
};

MethodsViewModel.prototype.onSelectMethod = function (item) {
  self.method(base[item.category][item.method][item.id]);
};

module.exports = MethodsViewModel;