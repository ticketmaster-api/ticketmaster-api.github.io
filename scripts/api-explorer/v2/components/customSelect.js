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
  this.selectArr = params.options || ko.observableArray([]);
  this.placeholder = ko.observable(params.placeholder || '');
  this.selected = ko.observable();
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
  hf.checkActive(self.selectArr, item.name);
  $(event.currentTarget)
    .parents('.api-exp-custom-select')
    .find('input')
    .trigger('click');
};

module.exports = ko.components.register('custom-select', {
  viewModel: CustomSelect,
  template: ([
    '<div class="api-exp-custom-select">',
    '<select data-bind="options: selectArr, optionsText: \'name\', value: selected" class="api-exp-custom-select__field" name="api-exp-method"></select>',
    '<span data-bind="text: console.log(selected())" class="hide"></span>',
    '<span class="api-exp-custom-select__placeholder">',
    '<input data-bind="click: slideToggle, attr: {value: selected().name}" type="text" value="" readonly="">',
    '</span>',
    '<ul data-bind="foreach: selectArr" class="api-exp-custom-select__list">',
    '<li class="api-exp-custom-select__item">',
    '<a data-bind="click: $parent.selectItem.bind($parent), text: name, attr: {\'data-value\': name}, css: {active: checked}"  class="api-exp-custom-select__item-label" href="#"></a>',
    '<a class="api-exp-custom-select__item-link" href="#">&nbsp;</a>',
    '</li>',
    '</ul>',
    '</div>'
  ]).join('')
});
