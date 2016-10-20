var self;
var base;
var hf = require('../modules/helperFunc');
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
	this.paramsModel = ko.observableArray([]);

	// computed
	// this.paramsModel = ko.computed(this.updateParamsModel, this);
	this.updateViewModel();
	this.method.subscribe(this.updateViewModel, this);

	this.isDirty = ko.computed(this.checkDirty, this);
}


/**
 * Initial build of Select Model
 */
ParamsViewModel.prototype.updateViewModel = function () {
	var obj = this.method().parameters || {},
		arr = [];

	for (var i in obj) {
		if (!obj.hasOwnProperty(i)) {continue;}

		// copies all values from model to view-model
		var vmParam = $.extend({}, obj[i]);

		vmParam.value = ko.observable(vmParam.value || (vmParam.select && vmParam.default) || '');

		//add observable for selected options
		if (vmParam.select) {
			vmParam.options = ko.observableArray(obj[i].options.map(function (item) {
				var obj = $.extend({}, item);
				obj.checked = ko.observable(item.checked);
				return obj;
			}))
		}

		// 'dirty' flag watcher for current field
		vmParam.isDirty = ko.pureComputed(function () {
			if (this.select) {
				return this.value() !== this.default && this.value() !== 'none';
			}
			return !!(this.value().toString()).trim().length;
		}, vmParam);

		// add calendar btn for current field
		vmParam.hasCalendar = i.search(/(date|time)/gmi) != -1;

		// add pop-up btn for current field
		vmParam.hasPopUp = i.search(/(attractionId|venueId)/gmi) != -1;

		arr.push(vmParam);
	}

	// prepare output for request
	this.paramsModel(arr);
	this.paramInFocus(this.paramsModel()[0]);
	this.prepareUrlPairs(arr, this.params);
	return arr;
};

/**
 * Dirty params form observable method
 * @returns {boolean}
 */
ParamsViewModel.prototype.checkDirty = function () {
	this.prepareUrlPairs(this.paramsModel(), this.params);
	var dirty = this.paramsModel().filter(function (item) {
		return item.isDirty() === true;
	});
	return dirty.length > 0;
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
  if (!arr && !koObs) {return false;}

  return koObs(arr.filter(function (item) {
    return (item.value() || item.default);
  }));
};

/**
 * On select value handler for params select
 * @param param {object} parameter view-model
 * @param option {object} option view-model
 */
ParamsViewModel.prototype.onSelectParamValue = function (param, option) {
	hf.checkActive(param.options, option.name);
	param.value(option.name);
};

/**
 * Params clear button handler
 * @param vm {object} view model
 * @param e {object} event
 */
ParamsViewModel.prototype.onParamsClear = function (vm, e) {
	this.updateViewModel();
};

module.exports = ParamsViewModel;
