'use strict';

var hf = require('../modules/helperFunc');
var self;
var base;
var category;

/**
 * Methods View-Model
 * @param raw
 * @param category
 * @param method
 * @constructor
 */
function MethodsViewModel(raw, category, method) {
  self = this;
  base = raw;

  // observables
  this.category = category;
  this.method = method;
  this.togglePopUp = ko.observable(false);
  this.radiosModel = ko.observableArray([]);
  this.methodsViewModel = ko.observableArray([]);
  this.updateModel(this.category());
  this.category.subscribe(this.updateModel, this);
}

/**
 * On category change handler
 * Methods View-Model method
 * @param category
 */
MethodsViewModel.prototype.updateModel = function (category) {
  // initial radios model
  self.updateRadiosModel(base[category]);
  // initial select model (first method in first section for start)
  self.updateSelect(self.radiosModel()[0]);
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
	arr = arr.sort(compareMethods);
  this.radiosModel(arr);
  return arr;
};

/**
 * Initial build of Select Model
 * @param item
 */
MethodsViewModel.prototype.updateSelect = function (item) {
  var obj = base[self.category()][item.name]|| {},
    arr = [],
    count = 0;

  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) { continue; }
    var property = obj[i];
		// copies all values from model to view-model
		var vmMethod = $.extend({}, property);

		delete vmMethod.parameters;
		vmMethod.checked = ko.observable(!count);

		arr.push(vmMethod);

    // set global observable
    !count && this.method(base[property.category][property.method][property.id]);

    count++;

  }

	this.methodsViewModel(arr);
	return arr;
};

MethodsViewModel.prototype.onSelectMethod = function (item) {
  hf.checkActive(self.methodsViewModel, item.name);
  self.method(base[item.category][item.method][item.id]);
};

MethodsViewModel.prototype.onAboutClick = function (model, event) {
  model.togglePopUp(!model.togglePopUp());
};

/**
 * Sort function for methods aray
 * @param f
 * @param s
 * @returns {number}
 */
function compareMethods(f,s) {
	var a = f.name.toUpperCase();
	var b = s.name.toUpperCase();

	if (a === b) {return 0;}
	if (a === 'ALL' ||
		(a === 'GET' && (b === 'POST' || b === 'PUT' || b === 'DELETE')) ||
		(a === 'POST' && (b === 'PUT' || b === 'DELETE')) ||
		(a === 'PUT' && b === 'DELETE')) {
		return -1;
	}
	return 1;
}

module.exports = MethodsViewModel;
