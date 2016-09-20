var self;
var base;

/**
 * Params View-Model
 * @param raw
 * @param method
 * @param params
 * @constructor
 */
function ParamsViewModel(raw, method, params) {
  base = raw;
  self = this;
  this.method = method;
  this.animationSpeed = 200;
  this.paramInFocus = ko.observable('');
  this.aboutParam = ko.observable('');
  this.paramsModel = ko.computed(self.updateParamsModel);
}

/**
 * Initial build of Select Model
 * @param item
 */
ParamsViewModel.prototype.updateParamsModel = function () {
  var obj = self.method().parameters || {},
    arr = [];

  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) { continue; }
    obj[i].value = ko.observable('');
    // var val = obj[i].value;
    obj[i].isDirty = ko.pureComputed(function () {
      return !!this.value().trim().length;
    }, obj[i]);
    arr.push(obj[i]);
  }

  return arr;
};

/**
 * Slide toggle for params container method
 * @param viewModel
 * @param event
 */
ParamsViewModel.prototype.slideToggle = function (viewModel, event) {
  $(event.currentTarget)
    .parents('.js-slide-control')
    .find('.js-slide-wrapper')
    .slideToggle(viewModel.animationSpeed);
};
ParamsViewModel.prototype.onFocus = function (item) {
  self.paramInFocus(item.name);
  self.aboutParam(item.doc);
};

module.exports = ParamsViewModel;
