var self;

class ParamsFilter {
	constructor({selectedMethod, selectedParams, selectedMethodData, animationSpeed = 200}) {
		self = this;
		this.animationSpeed = animationSpeed;
		this.selectedMethod = selectedMethod;
		this.selectedParams = selectedParams;
		this.selectedMethodData = selectedMethodData;
		this.isHidden = ko.observable(true);
		this.paramInFocus = ko.observable({});
		this.paramsModel = ko.observableArray([]);
		this.isDirty = ko.computed(this.checkDirty, this);
		this.init({selectedMethod, selectedParams});
	}

	/**
	 * Initialization phase
	 */
	init({selectedMethod, selectedParams}) {
		this.updateViewModel();

		selectedMethod.subscribe(val => {
			this.updateViewModel(val)
		});

		selectedParams.subscribe(selectedParams => {
			let paramsModel = ko.unwrap(this.paramsModel);
			selectedParams.map(param => {
				let matchedParam = paramsModel.find(val => param.name === val.name);
				matchedParam.value(ko.unwrap(param.value));
			});
			this.paramsModel(paramsModel);
		}, this, 'paramsSet');
	}

	/**
	 * Initial build of Select Model
	 */
	updateViewModel() {
		var obj = ko.unwrap(self.selectedMethodData).parameters || {},
			arr = [];

		for (var i in obj) {
			if (!obj.hasOwnProperty(i)) {continue;}
			let param = obj[i];
			var selectedParam;

			// copies all values from model to view-model
			let vmParam = $.extend(true, {}, param);

			vmParam.value = ko.observable(vmParam.select && param.options[0].name || vmParam.value || '');

			//add observable for selected options
			if (vmParam.select) {
				vmParam.options = selectedParam ? selectedParam.options : ko.observableArray(
					param.options.map(item => $.extend(true, {}, item, {checked: ko.observable(item.checked)}))
				);
			}

			// add calendar btn for current field
			vmParam.hasCalendar = i.search(/(date|time)/gmi) != -1;

			// add pop-up btn for current field
			vmParam.hasPopUp = i.search(/(attractionId|venueId)/gmi) != -1;

			arr.push(vmParam);
		}

		// prepare output for request
		this.paramsModel(arr);

		//set focus for first elem
		this.paramInFocus(this.paramsModel()[0]);
		this.prepareUrlPairs(arr, this.selectedParams);
		return arr;
	}

	/**
	 * Dirty params form observable method
	 * @returns {boolean}
	 */
	checkDirty() {
		this.prepareUrlPairs(ko.unwrap(this.paramsModel), this.selectedParams);
		var dirty = ko.unwrap(this.paramsModel).filter(item => {
			return ko.unwrap(item.isDirty) === true;
		});
		return dirty.length > 0;
	}

	/**
	 * Slide toggle for params container method
	 * @param viewModel
	 * @param event
	 */
	slideToggle(viewModel, event) {
		$(event.currentTarget)
			.parents('.js-slide-control')
			.find('.js-slide-wrapper')
			.slideToggle(viewModel.animationSpeed, function () {
				viewModel.isHidden(!viewModel.isHidden());
			});
	}

	/**
	 * Maches focused param
	 * @param item
	 */
	onFocus(item) {
		self.paramInFocus(item);
	}

	/**
	 * Filters params by defined value
	 * @param arr
	 * @param koObs
	 * @returns {boolean}
	 */
	prepareUrlPairs(arr, koObs) {
		if (!arr || !koObs) {return false;}

		return koObs(arr.filter(function (item) {
			return (item.value() && item.value() !== 'none' || item.default);
		}));
	}

	/**
	 * On select value handler for params select
	 * @param param {object} parameter view-model
	 * @param option {object} option view-model
	 */
	onSelectParamValue(param, option) {
		param.value(option.name);
	}

	/**
	 * Params clear button handler
	 * @param vm {object} view model
	 * @param e {object} event
	 */
	onParamsClear(vm, e) {
		var arr = ko.unwrap(self.paramsModel);

		self.paramsModel(arr.map(param => {
			param.value(param.select && param.default || '');

			if (param.select) {
				param.options(ko.unwrap(param.options).map((option, index) => {
					option.checked(!index);
					return option;
				}));
			}
			return param;
		}));

		// prepare output for request
		this.paramInFocus(this.paramsModel()[0]);
		this.prepareUrlPairs(arr, this.selectedParams);
	}
}

module.exports = ko.components.register('params-filter', {
	viewModel: ParamsFilter,
	template:`
		<section data-bind="css: {closed: isHidden, dirty: isDirty}" class="api-exp-params js-slide-control">
		
			<section class="api-exp-params-headline">
				<span class=""></span>
				<button data-bind="click: slideToggle" class="btn shevron-up grey toggle-btn btn-icon" type="button">Parameters</button>
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
						
						
							<div class="api-exp-params-filter__field">
								<!-- ko if: select -->
									<custom-select params="
										data: $data,
										options: options,
										onselect: $component.onSelectParamValue.bind($data, $data),
										focus: $component.onFocus,
										selected: value">
									</custom-select>
								<!-- /ko -->
								<!-- ko ifnot: select -->
									<custom-input params="
										onFocusMethod: $component.onFocus,
										data: $data,
										cssClass: hasCalendar ? 'calendar': hasPopUp ? 'popup': '',
										validationModel: $root.validationModel">
									</custom-input>
								<!-- /ko -->
							</div>
						
						
						
					</section>
				</section><!--params filter-->
			</div>
		</section><!--parameters-->
`});
