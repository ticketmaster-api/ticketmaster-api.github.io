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
  this.animationSpeed = 200;

  // observables
  this.method = method;
  this.params = params;
  this.isHidden = ko.observable(true);
  this.paramInFocus = ko.observable('');

  // computed
  this.paramsModel = ko.computed(this.updateParamsModel, this);
  this.paramInFocus(this.paramsModel()[0]);
  this.isDirty = ko.computed(this.checkDirty, this);
}

ParamsViewModel.prototype.checkDirty = function () {
  var dirty = this.paramsModel().filter(function (item) {
    return item.isDirty() === true;
  });
  return dirty.length > 0;
};

/**
 * Initial build of Select Model
 */
ParamsViewModel.prototype.updateParamsModel = function (a,b) {
  var obj = this.method().parameters || {},
    arr = [];

  for (var i in obj) {
    var value = obj[i];

    if (!obj.hasOwnProperty(i)) {
      continue;
    }

    value.value = value.value || ko.observable('');

    // 'dirty' flag watcher for current field
    value.isDirty = ko.pureComputed(function () {
      return !!this.value().trim().length;
    }, value);

    // add calendar btn for current field
    value.hasCalendar = i.search(/(date|time)/gmi) != -1;

    // add pop-up btn for current field
    value.hasPopUp = i.search(/(attractionId|venueId)/gmi) != -1;

    arr.push(value);
  }

  // prepare output for request
  this.prepareUrlPairs(arr, this.params);

  // catch params focus for about section
  this.paramInFocus(arr[0]);
  // this.onEnterKeyDown()
  return arr;
};

/**
 * Enter key handler
 * @param model
 * @param event
 */
ParamsViewModel.prototype.onEnterKeyDown = function (model, event) {
  if (event.keyCode === 13) {
    $('#api-exp-get-btn').trigger('click');
  } else {
    return true;
  }
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

/**
 * Filters params by defined value
 * @param arr
 * @param koObs
 * @returns {boolean}
 */
ParamsViewModel.prototype.prepareUrlPairs = function (arr, koObs) {
  if (!arr && !koObs) {
    return false;
  }

  return koObs(arr.filter(function (item) {
    return (item.value() || item.default);
  }));
};

module.exports = ParamsViewModel;
