var self;

function CustomSelect(params) {
	var DEFAULT_SELECTED = ko.unwrap(params.options)[0].name;
  self = this;

	this.curentSelectData = params.data || null;
	this.onFocus = params.focus || null;

	this.onselectMethod = params.onselect;

	this.animationSpeed = params.animationSpeed || 200;
	this.options = params.options;
	this.value = ko.unwrap(params.selected) || DEFAULT_SELECTED;
	this.selectedOption = ko.observable(mapForChecked.call(this, ko.unwrap(this.options), this.value));

	setSubscribtions.call(this, params);
}

function setSubscribtions(params) {
	// on select map for checked
	this.selectedOption.subscribe(function (value) {
		mapForChecked(ko.unwrap(this.options), value.name);
		this.onselectMethod(value);
	},this);

	// quantity of options check
	this.isOneOption = ko.pureComputed(function () {
		return ko.unwrap(this.options).length < 2; // more than one option
	}, this);
}

function mapForChecked(options, name) {
	var selectedOption;
	options.map(function (option) {
		option.checked(option.name === name);
		if (option.name === name) {selectedOption = option}
	});
	return selectedOption;
}

CustomSelect.prototype.slideToggle = function(item, event) {
	this.onFocus && this.onFocus(this.curentSelectData);
	if (ko.unwrap(this.isOneOption)) {return false}
	var el = findElement(event);
	el.wrapper.slideToggle(this.animationSpeed);
	el.layer.toggleClass('hidden');
};


CustomSelect.prototype.onSelect = function (item, event) {
	mapForChecked(ko.unwrap(this.options), item.name);
	this.selectedOption(item);
	this.onselectMethod(item);
	this.slideToggle(item, event);
};

function findElement(event) {
	var parent = $(event.currentTarget).parents('.js-custom-select');
	return {
		wrapper: parent.find('.js-custom-select-wrapper'),
		layer: parent.find('.js-custom-select-layer')
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
