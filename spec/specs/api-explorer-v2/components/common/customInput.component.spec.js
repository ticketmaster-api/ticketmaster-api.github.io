const ko = require('knockout');
const $ = require('jquery');
window.ko = ko;
window.$ = $;

require('knockout.validation');


let CustomInput = require('../../../../../scripts/api-explorer/v2/src/components/common/customInput.component.js');


describe("CustomInput component spec", () => {
	let customInput;
	var mockForCustomInput;
	beforeEach(() => {
		mockForCustomInput = {
			cssClass: 'customCssClass',
			data: {
				value: ko.observable({}),
				isDirty: false,
				required: false
			},
			cssClass:'testCssClass',
			validationModel: ko.observable({}),
			onFocusMethod:jest.fn()
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

	describe('When "onFocusMethod" called', () => {
		it('should call "onFocusMethod" from params', () => {
			customInput.onFocusMethod('someData');
			expect(mockForCustomInput.onFocusMethod).toBeCalledWith('someData');
		});
	});

	describe('When method "onKeyDown" called', () => {
		var enabledBtnFixture = '<button id="api-exp-get-btn"></button>';
		var disabledBtnFixture = '<button id="api-exp-get-btn" disabled></button>';

		function setFixture (html) {
			document.body.innerHTML = html;
		}
		beforeEach(() => {
			spyOn($.fn, 'trigger');
		});

		it('should not trigger "click" event if keyCode is not 13', () => {
			setFixture(enabledBtnFixture);
			customInput.onKeyDown(null, { keyCode: 15 });
			expect($.fn.trigger).not.toBeCalled();
		});

		it('should trigger "click" event on button when button enabled', () => {
			setFixture(enabledBtnFixture);
			customInput.onKeyDown(null, { keyCode: 13 });
			expect($.fn.trigger).toBeCalledWith('click');
		});

		it('should not trigger "click" event button disabled', () => {
			setFixture(disabledBtnFixture);
			customInput.onKeyDown(null, { keyCode: 13 });
			expect($.fn.trigger).not.toBeCalled();
		});
	});

	describe('check model getters', () => {
		it('should check isTextarea field', ()=> {
			mockForCustomInput.data.style = 'someStyle';
			expect(customInput.isTextarea).toBeFalsy();

			mockForCustomInput.data.style = 'requestBody';
			expect(customInput.isTextarea).toBeTruthy();
		});

		it('should get right cssClasses', () => {
			expect(customInput.cssClasses).toEqual({
				"dirty": jasmine.any(Function),
				"testCssClass": true,
				"virgin": jasmine.any(Function)
			});
		});
	});

	describe('When component init with data type "integer"', () => {
		it('should init observable with "nullableInt" validation rule', () => {
			var params = {
				onFocusMethod: (param) => param,
				data: {
					value: ko.observable({}),
					isDirty: false,
					required: false,
					type: 'integer'
				},
				validationModel: ko.observable({})
			};

			spyOn(params.data.value, 'extend');
			const component = new CustomInput(params);

			expect(params.data.value.extend).toBeCalledWith({
				"nullableInt": params.data.value,
				"required": false
			});
		});
	});

});
