var self;

function CustomSelect(params) {
  self = this;

  this.animationSpeed = params.animationSpeed || 200;
	this.curentSelectData = params.data || null;
	this.onFocus = params.focus || null;
	this.onselect = params.onselect;
	this.options = params.options;

	//observables
	this.placeholder = ko.observable(params.placeholder || '');
  this.selected = ko.observable('');
	this.value = params.selected || ko.observable('');
	this.init(params);
}

CustomSelect.prototype.init = function (params) {
	var customSelect = this;
	if (this.value()) {
		this.options(this.options().map(function (item) {
			item.name === customSelect.value() ? item.checked(true) && customSelect.selected(item) : item.checked(false);
			return item;
		}));
	}
	this.selected.subscribe(function (value) {
		selectItem.call(this, value);
		this.value(value.name);
	}, this);

	// quantity of options check
	this.isOneOption = ko.pureComputed(function () {
		return this.options().length < 2; // more than one option
	}, this);
};


function findElement(event) {
  var parent = $(event.currentTarget).parents('.js-custom-select');
  return {
    wrapper: parent.find('.js-custom-select-wrapper'),
    layer: parent.find('.js-custom-select-layer')
  }
}

function selectItem(value) {
	this.options(this.options().map(function (item) {
		item.name === value.name ? item.checked(true) : item.checked(false);
		return item;
	}));
}

CustomSelect.prototype.slideToggle = function(event) {
	// elem in focus emulation
	this.onFocus && this.onFocus(this.curentSelectData);

	if (this.isOneOption()) {return false;}
  var el = findElement(event);
    el.wrapper.slideToggle(this.animationSpeed);
    el.layer.toggleClass('hidden');
};

CustomSelect.prototype.selectItem = function (item) {
	var self = this;
	console.info(item.name,' CS :: selectItem');

	this.selected(item);

	this.options(ko.unwrap(this.options).map(function (option) {
		option.name === item.name ? option.checked(true) : option.checked(false);
		return item;
	}));

	// run handler
	this.onselect(item);
};

CustomSelect.prototype.onSelect = function (item, event) {
	this.selectItem(item);
	this.slideToggle(this, event);
};

module.exports = ko.components.register('custom-select', {
  viewModel: CustomSelect,
  template: `
	<div class="api-exp-custom-select js-custom-select">
	
		<div class="api-exp-custom-select-wrapper">
			<select class="api-exp-custom-select__field" name="api-exp-method" data-bind="options: options, optionsText: name, value: selected"></select>
			
			<span class="api-exp-custom-select__placeholder">
			
				<input type="text" readonly="" data-bind="click: slideToggle, value: value, attr: {disabled: isOneOption}">
				
				<b class="api-exp-custom-select__chevron"
						data-bind="css: {hidden: isOneOption}">&nbsp;</b>
			</span>
			
			<ul data-bind="foreach: options" class="api-exp-custom-select__list js-custom-select-wrapper">
				<li data-bind="css: {'active': checked}" class="api-exp-custom-select__item">
					<button class="api-exp-custom-select__item-label"
									data-bind="click: $component.onSelect.bind($component),
															text: name,
															css: {'active': checked},
															attr: {'data-value': name}"></button>
					<a class="api-exp-custom-select__item-link" target="_blank"
							data-bind="attr: {href: link}, css: {'hidden': !link}">&nbsp;</a>
				</li>
			</ul>
			
		</div>
		
		<div data-bind="click: slideToggle" class="api-exp-custom-select-layer js-custom-select-layer hidden"></div>
	</div>
`});
