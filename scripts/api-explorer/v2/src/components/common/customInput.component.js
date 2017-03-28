/**
 * Custom input component
 */

class CustomInput {
	constructor({onFocusMethod, data = {value: '', isDirty: false, required: false},  cssClass = '', validationModel}) {
		this.data = data;
		this.focusMethod = onFocusMethod;
		this.placeholder = data.placeholder || data.name;
		this.id = data.name;
		this.isVirgin = ko.observable(true);
		// css classes
		this.cssClass = cssClass;

		// Dirty watcher
		this.fieldWatcher(data);
		// Validation
		this.initValidation(data, validationModel);
	}
	
	/**
	 * Dirty watcher method
	 * @param data {object}
	 */
	fieldWatcher(data) {
		this.isDirty = data.isDirty = ko.pureComputed(() => {
			return !!(data.value().toString()).trim().length;
		});
	}
	
	/**
	 * Validation init method
	 * @param data {object}
	 * @param validationModel {object}
	 */
	initValidation(data, validationModel) {
		let obj = {required: data.required};

		// validation by type
		switch (data.type) {
			case 'integer':
				obj.nullableInt = data.value;
				break;
			default:
				break;
		}
		
		this.value = data.value.extend(obj);
		let model = ko.unwrap(validationModel);
		model[data.name] = this.value;
		validationModel(model);
	}
	
	/**
	 * On field in focus method
	 * @param data {object}
	 */
	onFocusMethod(data) {
		this.focusMethod && this.focusMethod(data)
	}

	/**
	 * Enter key handler
	 * @param model {object}
	 * @param event {object}
	 */
	onKeyDown(model, event) {
		this.isVirgin(false);
		let btn = $('#api-exp-get-btn');
		
		if (event.keyCode === 13 && btn.is(':enabled')) {
			btn.trigger('click');
		} else {
			return true;
		}
	}
	
	/**
	 * Is teatarea checker
	 * @returns {boolean}
	 */
	get isTextarea() {
		return this.data.style === 'requestBody';
	}

	get cssClasses() {
		return {[this.cssClass]: true, dirty: this.isDirty, virgin: this.isVirgin};
	}
}

ko.components.register('custom-input', {
	viewModel: CustomInput,
	template: `
		<div data-bind="css: cssClasses" class="api-exp-custom-input">
			<div data-bind="validationElement: value" class="custom-input__inner-wrapper">
				<!-- ko ifnot: isTextarea -->
				<input data-bind="textInput: value, lazyLoader: {name: placeholder, val: value}, dateTimePicker, event: {focus: onFocusMethod(data), keydown: onKeyDown.bind($component)}, attr: {id: id}"
								type="text"
								class="custom-input__field form-control">
				<!-- /ko -->
				<!-- ko if: isTextarea -->
				<textarea data-bind="textInput: value, lazyLoader: {name: placeholder, val: value}, dateTimePicker, event: {focus: onFocusMethod(data)}, attr: {id: id}" 
									cols="30" rows="10"
									class="custom-textarea custom-input__field form-control"></textarea>
				<!-- /ko -->
				<span data-bind="text: placeholder, css: {required: data.required}" class="custom-input__placeholder"></span>
			</div>
			<p data-bind="validationMessage: value, css: {textarea: isTextarea}" class="custom-input__validation-message"></p>
		</div>
`});

module.exports = CustomInput;
