/**
 * Custom select component
 */

class CustomSelect {
	constructor({data, selected, options, focus, onselect, animationSpeed = 200}) {
		const rawOptions = ko.unwrap(options);
		const DEFAULT_SELECTED = rawOptions[0].name;
		this.curentSelectData = data;
		this.onFocus = focus;
		this.onselectMethod = onselect;
		this.animationSpeed = animationSpeed;
		this.options = options;
		this.value = ko.unwrap(selected) || DEFAULT_SELECTED;
		this.selectedOption = ko.observable(this.mapForChecked({rawOptions, name: this.value}));
		this.setSubscribtions({selected, DEFAULT_SELECTED});
	}

	setSubscribtions({selected, DEFAULT_SELECTED}) {
		// has preselected option
		if (selected) {
			selected.subscribe(value => {
				let selectedOption = this.mapForChecked({rawOptions: ko.unwrap(this.options), name: value || DEFAULT_SELECTED});

				return this.selectedOption(selectedOption);
			});
		}

		// on select map for checked
		this.selectedOption.subscribe(value => {
			this.mapForChecked({rawOptions: ko.unwrap(this.options), name: value.name});
			this.onselectMethod(value);
		});

		// quantity of options check
		this.isOneOption = ko.pureComputed(() => ko.unwrap(this.options).length < 2);
	}

	/**
	 * Updates checked option
	 * @param rawOptions {array} options
	 * @param name {string} name of selected option
	 * @returns {object} selected option
	 */
	mapForChecked({rawOptions, name}) {
		let selectedOption;
		for (const option of rawOptions) {
			option.checked(option.name === name);
			if (option.name === name) {
				selectedOption = option
			}
		}
		return selectedOption;
	}

	slideToggle(item, event) {
		this.onFocus && this.onFocus(this.curentSelectData);
		if (ko.unwrap(this.isOneOption)) {
			return false
		}
		let el = this.constructor.findElement(event);
		el.wrapper.slideToggle(this.animationSpeed);
		el.layer.toggleClass('hidden');
	}

	onSelect(item, event) {
		const rawOptions = ko.unwrap(this.options);
		this.mapForChecked({rawOptions, name: item.name});
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

module.exports = ko.components.register('custom-select', {
  viewModel: CustomSelect,
  template: `
	<div class="api-exp-custom-select js-custom-select">
		<div class="api-exp-custom-select-wrapper">
			<select class="api-exp-custom-select__field" name="api-exp-method" data-bind="options: options, optionsText: 'name', value: selectedOption"></select>
				<span class="api-exp-custom-select__placeholder">
				<input type="text" readonly="" data-bind="click: slideToggle, value: selectedOption().name, attr: {disabled: isOneOption}">
				<b class="api-exp-custom-select__chevron" data-bind="css: {hidden: isOneOption}">&nbsp;</b>
			</span>
			<ul data-bind="foreach: options" class="api-exp-custom-select__list js-custom-select-wrapper">
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
