// let ko = require('knockout');
let CustomInput = require('../../../../../scripts/api-explorer/v2/src/components/common/customInput.component.js');


describe("CustomInput component spec", () => {
	let customInput;

	beforeEach(() => {
		const mockForCustomInput = {
			data: {
				value: ko.observable({}),
				isDirty: false,
				required: false
			},
			cssClass:'testCssClass',
			validationModel: ko.observable({})
		};
		customInput = new CustomInput(mockForCustomInput);
	});

	it("Sets accepted CSS class", () => {
		expect(customInput.cssClass).toBe('testCssClass');
	});

	describe("'values' prop check", () => {
		it("'values' is defined", () => {
			expect(customInput.data.value).toBeDefined();
		});
		it("'values' is knockout observable", () => {
			expect(ko.isObservable(customInput.data.value)).toBe(true);
		});
	});

	describe("'isDirty' prop check", () => {
		it("'isDirty' is defined", () => {
			expect(customInput.data.isDirty).toBeDefined();
		});

		it("typeof 'isDirty' is knockout computed", () => {
			expect(ko.isComputed(customInput.data.isDirty)).toBe(true);
		});

		it("'isDirty' is truthy", () => {
			expect(ko.unwrap(customInput.data.isDirty)).toBeTruthy();
		});
	});

	describe("'required' prop check", () => {
		it("'required' is defined", () => {
			expect(customInput.data.required).toBeDefined();
		});

		it("typeof 'required' is boolean", () => {
			expect(typeof customInput.data.required).toBe('boolean');
		});

		it("'required' is falsy", () => {
			expect(customInput.data.required).toBeFalsy();
		});
	});

	describe("Model data has correct params and param types", () => {
		it("Model data is not null", () => {
			expect(customInput.data).not.toBe(null);
		});
	});

	describe("Component has correct onFocus handler", () => {
		const component = new CustomInput({
			onFocusMethod: (param) => param,
			data: {
				value: ko.observable({}),
				isDirty: false,
				required: false
			},
			cssClass:'testCssClass',
			validationModel: ko.observable({})
		});

		let element;

		beforeEach(function() {
			spyOn(component, 'onFocusMethod');
			component.onFocusMethod(element);
		});

		it("Handler is defined", () => {
			expect(component.onFocusMethod).toBeDefined();
		});

		it("tracks that Handler was called", function() {
			expect(component.onFocusMethod).toHaveBeenCalled();
		});

		it("all the arguments of its calls", function() {
			expect(component.onFocusMethod).toHaveBeenCalledWith(element);
		});
	});

	describe("Component has correct onEnter key down handler", () => {
		it("Handler is defined", () => {
			expect(customInput.onKeyDown).toBeDefined();
		});
	});
	console.log('say my name');


});
