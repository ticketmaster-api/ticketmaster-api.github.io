/**
 * Custom select component
 */

class CustomInput {
	constructor({onFocusMethod, value, id, css, placeholder}) {
		this.onFocusMethod = onFocusMethod;
		this.value = value;
		this.id = id;
		this.placeholder = placeholder;
		// css classes
		this.css = css;
	}

	/**
	 * Enter key handler
	 * @param model
	 * @param event
	 */
	onEnterKeyDown(model, event) {
		if (event.keyCode === 13) {
			$('#api-exp-get-btn').trigger('click');
		} else {
			return true;
		}
	}
}

module.exports = ko.components.register('custom-input', {
  viewModel: CustomInput,
  template: `
		<div data-bind="css: css">
			<input data-bind="textInput: value, event: {focus: onFocusMethod, keydown: onEnterKeyDown}, attr: {id, id}" type="text" class="form-control">
			<span data-bind="text: placeholder" class="api-exp-params-filter__placeholder"></span>
			<button class="api-exp-params-filter__button">&nbsp;</button>
		</div>
`});
