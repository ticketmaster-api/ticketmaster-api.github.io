/**
 * Custom Select component
 */
var self;

/**
 * Custom Select View-Model
 * @param params
 * @constructor
 */
function CustomSelect(params) {
  self = this;

  this.animationSpeed = params.animationSpeed || 200;
	this.curentSelectData = params.data || null;
	this.onFocus = params.focus || null;
	
  //observables
  this.selectModel = typeof params.options !=='function' ? ko.observableArray(params.options):  params.options;
  this.placeholder = ko.observable(params.placeholder || '');
  this.onselect = params.onselect || function (item) { console.log(item +'selected!')};
  this.selected = ko.observable(this.selectModel()[0]);
  this.isOneOption = ko.pureComputed(function () {
    return this.selectModel().length < 2; // more than one option
  }, this);
}

function findElement(event) {
  var parent = $(event.currentTarget).parents('.js-custom-select');
  return {
    wrapper: parent.find('.js-custom-select-wrapper'),
    layer: parent.find('.js-custom-select-layer')
  }
}

/**
 * Custom Select View-Model method
 * @param viewModel
 * @param event
 */
CustomSelect.prototype.slideToggle = function(viewModel, event) {
	// elem in focus emulation
	this.onFocus && this.onFocus(this.curentSelectData);

	if (this.isOneOption()) {return false;}
  var el = findElement(event);
    el.wrapper.slideToggle(viewModel.animationSpeed);
    el.layer.toggleClass('hidden');
};

/**
 * Custom Select View-Model method
 * @param item
 * @param event
 */
CustomSelect.prototype.selectItem = function (item, event) {
  var self = this;
  this.selected(item);
  // run handler
  this.onselect(item);
	// slide up
  this.slideToggle(self, event);
};

module.exports = ko.components.register('custom-select', {
  viewModel: CustomSelect,
  template: ([
    '<div class="api-exp-custom-select js-custom-select">',
      '<div class="api-exp-custom-select-wrapper">',
        '<select data-bind="options: selectModel, optionsText: \'name\', value: selected" class="api-exp-custom-select__field" name="api-exp-method"></select>',
        '<span class="api-exp-custom-select__placeholder">',
          '<input data-bind="event: {click: slideToggle}, attr: {value: selected().name, disabled: isOneOption}" type="text" value="" readonly="">',
          '<b data-bind="css: {hidden: isOneOption}" class="api-exp-custom-select__chevron">&nbsp;</b>',
        '</span>',
        '<ul data-bind="foreach: selectModel" class="api-exp-custom-select__list js-custom-select-wrapper">',
          '<li data-bind="css: {\'active\': checked}" class="api-exp-custom-select__item">',
            '<button data-bind="event: {click: $parent.selectItem.bind($parent)}, text: name, css: {\'active\': checked()}, attr: {\'data-value\': name}"  class="api-exp-custom-select__item-label" href="#"></button>',
            // '<span data-bind="if: link">',
            	'<a data-bind="attr: {href: link}, css: {\'hidden\': !link}" class="api-exp-custom-select__item-link" target="_blank">&nbsp;</a>',
            // '</span>',
          '</li>',
        '</ul>',
      '</div>',
      '<div data-bind="click: slideToggle" class="api-exp-custom-select-layer js-custom-select-layer hidden"></div>',
    '</div>'
  ]).join('')
});
