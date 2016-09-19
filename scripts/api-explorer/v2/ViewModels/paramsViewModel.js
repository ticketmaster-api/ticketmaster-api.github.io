var self;

/**
 * Params View-Model
 * @param base
 * @constructor
 */
function ParamsViewModel(base) {
  self = this;

  this.animationSpeed = 200;

  // observables
  this.fieldsArr = ko.observableArray([]); // {name: 'str', value: 'str', isDirty: false, valid: true, about: 'str'}
}

ParamsViewModel.prototype.slideToggle = function(viewModel, event) {
  console.log($(event.currentTarget));

  $(event.currentTarget)
    .parent('.js-slide-wrapper')
    .slideToggle(viewModel.animationSpeed);
};

module.exports = ParamsViewModel;