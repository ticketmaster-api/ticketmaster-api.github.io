var self;

function ParamsFilter(params) {
	self = this;

	this.animationSpeed = 200;

	// observables
	this.selectedMethod = params.selectedMethod;
	this.selectedParams = params.selectedParams;
	this.selectedMethodData = params.selectedMethodData;

	this.isHidden = ko.observable(true);
	this.paramInFocus = ko.observable({});
	this.paramsModel = ko.observableArray([]);

	// computed
	this.isDirty = ko.computed(this.checkDirty, this);

	// setSubscribtions
	this.init();
}

/**
 * Initialization phase
 */
ParamsFilter.prototype.init = function () {
	this.updateViewModel();
	this.selectedMethod.subscribe(this.updateViewModel, this);
};

/**
 * Initial build of Select Model
 */
ParamsFilter.prototype.updateViewModel = function () {
	// console.info('updateViewModel');
	var obj = ko.unwrap(self.selectedMethodData).parameters || {},
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
	this.prepareUrlPairs(arr, this.selectedParams);
	return arr;
};

/**
 * Dirty params form observable method
 * @returns {boolean}
 */
ParamsFilter.prototype.checkDirty = function () {
	// console.info('checkDirty');
	this.prepareUrlPairs(this.paramsModel(), this.selectedParams);
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
ParamsFilter.prototype.onEnterKeyDown = function (model, event) {
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
ParamsFilter.prototype.slideToggle = function (viewModel, event) {
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
ParamsFilter.prototype.onFocus = function (item) {
	self.paramInFocus(item);
};

/**
 * Filters params by defined value
 * @param arr
 * @param koObs
 * @returns {boolean}
 */
ParamsFilter.prototype.prepareUrlPairs = function (arr, koObs) {
	// console.info('prepareUrlPairs');
	if (!arr || !koObs) {return false;}

	return koObs(arr.filter(function (item) {
		return (item.value() && item.value() !== 'none' || item.default);
	}));
};

/**
 * On select value handler for params select
 * @param param {object} parameter view-model
 * @param option {object} option view-model
 */
ParamsFilter.prototype.onSelectParamValue = function (param, option) {
	// console.info('onSelectParamValue');
	// param.options(options);
	param.value(option.name);
};

/**
 * Params clear button handler
 * @param vm {object} view model
 * @param e {object} event
 */
ParamsFilter.prototype.onParamsClear = function (vm, e) {
	// console.info('updateViewModel');
	var arr = ko.unwrap(self.paramsModel);

	self.paramsModel(arr.map(function (param) {
		param.value(param.select && param.default || '');

		if (param.select) {
			param.options(ko.unwrap(param.options).map(function (option, index) {
				option.checked(!index);
				return option;
			}));
		}
		return param;
	}));

	// prepare output for request
	this.paramInFocus(this.paramsModel()[0]);
	console.log(this.selectedParams());
	this.prepareUrlPairs(arr, this.selectedParams);
};

module.exports = ko.components.register('params-filter', {
	viewModel: ParamsFilter,
	template:`
		<section data-bind="css: {closed: isHidden, dirty: isDirty}" class="api-exp-params js-slide-control">
		
			<section class="api-exp-params-headline">
				<button data-bind="click: slideToggle" class="btn shevron-up toggle-btn btn-icon" type="button">Parameters</button>
				<div class="api-exp-params-headline-edit">
					<button class="btn api-exp-params-headline__btn api-exp-params-headline__btn-copy">&nbsp;</button>
					<button data-bind="click: onParamsClear" class="btn api-exp-params-headline__btn api-exp-params-headline__btn-clear">&nbsp;</button>
				</div>
			</section>
			
			<div class="api-exp-params-wrapper clearfix js-slide-wrapper">
				<!--about-->
				<section class="api-exp-about visible-lg-block">
					<div class="api-exp-about-wrapper">
						<span class="api-exp-about__button"></span>
						<article class="api-exp-about__content">
							<h5 data-bind="text: paramInFocus().name" class="api-exp-about__title">About API and Method:</h5>
							<section class="api-exp-about__description">
								<p data-bind="html: paramInFocus().doc"></p>
							</section>
						</article>
					</div>
				</section>
				
				<!--params filter-->
				<section class="api-exp-params-filter">
					<section data-bind="foreach: paramsModel" class="api-exp-params-filter-fields">
						<!--select-->
						
						<!-- ko if: select -->
							<div class="api-exp-params-filter__field">
								<custom-select params="
									data: $data,
									options: options,
									onselect: $component.onSelectParamValue.bind($data, $data),
									focus: $component.onFocus,
									selected: value">
								</custom-select>
							</div>
						<!-- /ko -->
						
						<!-- ko ifnot: select -->
							<div data-bind="css: {'dirty': isDirty, calendar: hasCalendar, popup: hasPopUp}" class="api-exp-params-filter__field">
								<input data-bind="textInput: value, event: {focus: $component.onFocus, keydown: $component.onEnterKeyDown}, attr: {id: 'api-exp-param_' + name}" type="text" class="form-control">
								<span data-bind="text: name" class="api-exp-params-filter__placeholder"></span>
								<button class="api-exp-params-filter__button">&nbsp;</button>
							</div>
						<!-- /ko -->
						
					</section>
				</section><!--params filter-->
			</div>
		</section><!--parameters-->
`});
