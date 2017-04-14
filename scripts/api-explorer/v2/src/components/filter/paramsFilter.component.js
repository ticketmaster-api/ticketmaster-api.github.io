class ParamsFilter {
	constructor({selectedMethod, selectedParams, selectedMethodData, animationSpeed = 200, paramsIsHiden}) {
		this.animationSpeed = animationSpeed;
		this.selectedMethod = selectedMethod;
		this.selectedParams = selectedParams;
		this.selectedMethodData = selectedMethodData;
		this.isHidden = ko.observable(true);
		this.paramInFocus = ko.observable({});
		this.paramsModel = ko.observableArray([]);
		this.isDirty = ko.computed(this.checkDirty, this);
		this.init({selectedMethod, selectedParams});
		
		// slide toggle when params are not valid
		paramsIsHiden.subscribe( newVal => {
			this.slideToggle.call(null, this)
		})
	}

	/**
	 * Initialization phase
	 */
	init({selectedMethod, selectedParams}) {
		this.updateViewModel();
		selectedMethod.subscribe(val => {
			this.updateViewModel(val)
		});

		selectedParams.subscribe(selected => {
			let paramsModel = ko.unwrap(this.paramsModel);
			selected.map(param => {
				let matchedParam = paramsModel.find(val => param.name === val.name);
				matchedParam.value(ko.unwrap(param.value));
			});
			this.paramsModel(paramsModel);
		}, this, 'paramsSet');
	}

	/**
	 * Initial build of Select Model
	 */
	updateViewModel = () => {
		let obj = ko.unwrap(this.selectedMethodData);
		let parameters = obj.parameters || {},
			paramsOrder = obj.paramsOrder,
			arr = [];

		for (var i in parameters) {
			if (!parameters.hasOwnProperty(i)) {continue;}
			let param = parameters[i];
			var selectedParam;

			// copies all values from model to view-model
			let vmParam = $.extend(true, {}, param);

			vmParam.value = ko.observable(vmParam.value || vmParam.select && param.options[0].name || '');

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

		if (paramsOrder) {
			let allParamsOrder = paramsOrder.concat(Object.keys(parameters));
			arr = arr.sort((paramA, paramB) => {
				return allParamsOrder.indexOf(paramA.name) - allParamsOrder.indexOf(paramB.name);
			});
		}

		// prepare output for request
		this.paramsModel(arr);

		//set focus for first elem
		this.paramInFocus(this.paramsModel()[0]);
		this.prepareUrlPairs(arr, this.selectedParams);
		return arr;
	};

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
		$('#api-exp2-params-toggle')
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
	onFocus = (item) => {
		this.paramInFocus(item);
	};

	/**
	 * Filters params by defined value
	 * @param arr
	 * @param koObs
	 * @returns {boolean}
	 */
	prepareUrlPairs(arr, koObs) {
		if (!arr || !koObs) {return false;}
		koObs(arr);
	}

	/**
	 * On select value handler for params select
	 * @param param {object} parameter view-model
	 * @param option {object} option view-model
	 */
	onSelectParamValue(param, option) {
		param.value(option.value || option.name);
	}

	/**
	 * Params clear button handler
	 * @param vm {object} view model
	 * @param e {object} event
	 */
	onParamsClear = (vm, e) => {
		var arr = ko.unwrap(this.paramsModel);

		this.paramsModel(arr.map(param => {
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
	};
}

ko.components.register('params-filter', {
	viewModel: ParamsFilter,
	template:`
		<section data-bind="css: {closed: isHidden, dirty: isDirty}" class="api-exp-params js-slide-control">
		
			<section class="api-exp-params-headline">
				<button id="api-exp2-params-toggle" data-bind="click: slideToggle" class="btn btn-icon toggle-btn" type="button">Parameters</button>
				<span class="btn btn-icon shevron up grey" data-bind="css: {down: isHidden}"></span>
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
						<!-- ko ifnot: style === 'requestBody' -->
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
						<!-- /ko -->
						<!-- ko if: style === 'requestBody'-->
							<section class="cusotm-textarea-wrapper">
								<custom-input params="
									onFocusMethod: $component.onFocus,
									data: $data,
									cssClass: hasCalendar ? 'calendar': hasPopUp ? 'popup': '',
									validationModel: $root.validationModel">
								</custom-input>
							</section>
						<!-- /ko -->
					</section>
				</section><!--params filter-->
			</div>
		</section><!--parameters-->
`});

module.exports = ParamsFilter;
