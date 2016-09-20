/**
 * Custom Select component
 */

var hf = require('./helperFunc');
var self;

/**
 * Custom Select View-Model
 * @param params
 * @constructor
 */
function CustomSelect(params) {
  self = this;

  this.animationSpeed = params.animationSpeed || 200;

  //observables
  this.selectModel = params.options || ko.observableArray([]);
  this.placeholder = ko.observable(params.placeholder || '');
  this.onselect = params.onselect || function (item) { console.log(item +'selected!')};
  this.selected = ko.observable(this.selectModel()[0]);
}

/**
 * Custom Select View-Model method
 * @param viewModel
 * @param event
 */
CustomSelect.prototype.slideToggle = function(viewModel, event) {
  $(event.currentTarget)
    .parent()
    .next('ul')
    .slideToggle(viewModel.animationSpeed);
};

/**
 * Custom Select View-Model method
 * @param item
 */
CustomSelect.prototype.selectItem = function (item, event) {
  this.selected(item);
  // run handler
  this.onselect(item);
  // slide up
  $(event.currentTarget)
    .parents('.api-exp-custom-select')
    .find('input')
    .trigger('click');
};

module.exports = ko.components.register('custom-select', {
  viewModel: CustomSelect,
  template: ([
    '<div class="api-exp-custom-select">',
    '<select data-bind="options: selectModel, optionsText: \'name\', value: selected" class="api-exp-custom-select__field" name="api-exp-method"></select>',
    '<span class="api-exp-custom-select__placeholder">',
    '<input data-bind="click: slideToggle, attr: {value: selected().name}" type="text" value="" readonly="">',
    '</span>',
    '<ul data-bind="foreach: selectModel" class="api-exp-custom-select__list">',
    '<li class="api-exp-custom-select__item">',
    // '<span data-bind="text: console.log(\'checked - \', name, checked())"></span>',
    '<a data-bind="event: {click: $parent.selectItem.bind($parent), }, text: name, attr: {\'data-value\': name}, css: {active: checked()}"  class="api-exp-custom-select__item-label" href="#"></a>',
    '<a data-bind="attr: {href: link}" class="api-exp-custom-select__item-link">&nbsp;</a>',
    '</li>',
    '</ul>',
    '</div>'
  ]).join('')
});
