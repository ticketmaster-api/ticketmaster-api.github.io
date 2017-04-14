/**
 * Custom select component
 */

class CustomSelect {
	constructor({data, selected, options, focus, onselect, animationSpeed = 200, isReadOnly = true}) {
		const rawOptions = ko.unwrap(options);
		const DEFAULT_SELECTED = rawOptions[0].name;
		this.curentSelectData = data;
		this.onFocus = focus;
		this.onselectMethod = onselect;
		this.animationSpeed = animationSpeed;
		this.options = options;
		this.value = ko.unwrap(selected) || DEFAULT_SELECTED;

		if(typeof this.value === 'object'){
			this.selectedOption = ko.observable(this.value);
			this.uncheckAllItems(ko.unwrap(this.options));
			this.value.checked(true);
		}
		else{
			this.selectedOption = ko.observable(this.mapForChecked({rawOptions, name: this.value}));
		}

		this.isExpandeded = ko.observable(false);
		this.isReadOnly = isReadOnly;
		this.setSubscribtions({selected, DEFAULT_SELECTED});
		// Dirty watcher
		this.fieldWatcher(data);
	}

	fieldWatcher(data) {
		if (data) {
			this.isDirty = data.isDirty = ko.pureComputed(() => {
				return data.value() !== data.default && data.value() !== 'none';
			});
		}
	}

	setSubscribtions({selected, DEFAULT_SELECTED}) {
		// has preselected option
		if (selected) {
			selected.subscribe(value => {
				if(!value) return;
				if(typeof value === 'object') {
					this.selectedOption(value);
				}
				else{
					this.selectedOption(
						this.mapForChecked({rawOptions: ko.unwrap(this.options), name: value || DEFAULT_SELECTED}));
				}
			});
		}

		// on select map for checked
		this.selectedOption.subscribe(value => {
			this.uncheckAllItems(ko.unwrap(this.options));
			value.checked(true);
			this.onselectMethod(value);
		});

		// quantity of options check
		this.isOneOption = ko.pureComputed(() => ko.unwrap(this.options).length < 2);
	}

	uncheckAllItems (rawOptionsList) {
		rawOptionsList.forEach((item)=> item.checked(false));
	}

	/**
	 * Updates checked option
	 * @param rawOptions {array} options
	 * @param name {string} name of selected option
	 * @returns {object} selected option
	 */
	mapForChecked({rawOptions, name}) {
		this.uncheckAllItems(rawOptions);
		let selectedOption;
		for (const option of rawOptions) {
			let optionValue = option.value || option.name;
			if (optionValue === name) {
				selectedOption = option;
				break;
			}
		}
		selectedOption.checked(true);
		return selectedOption;
	}

	slideToggle(item, event) {
		this.onFocus && this.onFocus(this.curentSelectData);
		this.isExpandeded(!ko.unwrap(this.isExpandeded));
		if (ko.unwrap(this.isOneOption)) {
			return false
		}
		let el = this.constructor.findElement(event);
		el.wrapper.slideToggle(this.animationSpeed);
		el.layer.toggleClass('hidden');
	}

	onSelect(item, event) {
		this.selectedOption(item);
		this.slideToggle(item, event);
	}

	static findElement(event) {
		let parent = $(event.currentTarget).parents('.js-custom-select');
		return {
			wrapper: parent.find('.js-custom-select-wrapper'),
			layer: parent.find('.js-custom-select-layer')
		}
	}
}

ko.components.register('custom-select', {
  viewModel: CustomSelect,
  template: `
	<div class="api-exp-custom-select js-custom-select">
		<div class="api-exp-custom-select-wrapper">
			<select class="api-exp-custom-select__field" name="api-exp-method" data-bind="options: options, optionsText: 'name', value: selectedOption"></select>
				<span class="api-exp-custom-select__placeholder">
				<input type="text" data-bind="click: slideToggle, value: selectedOption().name, attr: {disabled: isOneOption, readonly: isReadOnly}">
				<button class="btn btn-icon shevron up blue api-exp-custom-select__chevron" data-bind="css: {hidden: isOneOption, down: isExpandeded}" type="button"></button>
			</span>
			<ul data-bind="foreach: options, scroll: {x: false, y: true}" class="api-exp-custom-select__list js-custom-select-wrapper">
				<li data-bind="css: {'active': checked}" class="api-exp-custom-select__item">
					<button class="api-exp-custom-select__item-label"
									data-bind="click: $component.onSelect.bind($component),
															text: name,
															css: {'active': checked},
															attr: {'data-value': name}"></button>
					<a class="api-exp-custom-select__item-link" target="_blank" data-bind="attr: {href: link}, css: {'hidden': !link}">&nbsp;</a>
				</li>
			</ul>
		</div>
		<div data-bind="click: slideToggle" class="api-exp-custom-select-layer js-custom-select-layer hidden"></div>
	</div>
`});

module.exports = CustomSelect;
