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
  this.isHidden = ko.observable(true);
  this.paramInFocus = ko.observable('');
  this.paramsModel = ko.computed(self.updateParamsModel);
  this.paramInFocus(this.paramsModel()[0]);
  this.isDirty = ko.computed(function () {
    var dirty = this.paramsModel().filter(function (item) {
        return item.isDirty() === true;
      });
    return dirty.length > 0;
  }, this);
}

/**
 * Initial build of Select Model
 */
ParamsViewModel.prototype.updateParamsModel = function () {
  var obj = self.method().parameters || {},
    arr = [];

  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) { continue; }
    obj[i].value = ko.observable('');
    obj[i].isDirty = ko.pureComputed(function () {
      return !!this.value().trim().length;
    }, obj[i]);
    obj[i].hasCalendar = i.search(/(date|time)/gmi) != -1;
    obj[i].hasPopUp = i.search(/(attractionId|venueId)/gmi) != -1;
    arr.push(obj[i]);
  }
  self.paramInFocus(arr[0]);
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
    .slideToggle(viewModel.animationSpeed, function () {
      viewModel.isHidden(!viewModel.isHidden());
    });
};

/**
 * Maches focused param
 * @param item
 */
ParamsViewModel.prototype.onFocus = function (item) {
  self.paramInFocus(item);
};

module.exports = ParamsViewModel;
