const ko = require('knockout');
const $ = require('jquery');
window.ko = ko;
window.$ = $;


var CustomSelect = require('scripts/api-explorer/v2/src/components/common/customSelect.component.js');

describe("CustomSelect component spec", function() {
	function setFixture () {
		document.body.innerHTML =
			`<div class="api-exp-custom-select js-custom-select">
				<div class="api-exp-custom-select-wrapper">
					<div id="currentTarget"></div>
				</div>
				<div data-bind="click: slideToggle" class="api-exp-custom-select-layer js-custom-select-layer hidden"></div>
			</div>`;
	};

	beforeEach(() => {
		setFixture();
		this.paramsMock = {
			data: {
				value: ko.observable(),
				isDirty: false
			},
			selected: ko.observable('secondOption'),
			options: ko.observable([{
				name: 'firstOption',
				checked: ko.observable(true)
			},{
				name: 'secondOption',
				checked: ko.observable(false)
			},{
				name: 'thirdOption',
				checked: ko.observable(false)
			}]),
			focus: jest.fn(),
			onselect: jest.fn(),
			animationSpeed: 200,
			isReadOnly: true
	};

		this.component = new CustomSelect(this.paramsMock);
	});

	describe('When component created', () => {
		it('should init data in view model', () => {
			expect(this.component.curentSelectData).toBe(this.paramsMock.data);
			expect(this.component.onFocus).toBe(this.paramsMock.focus);
			expect(this.component.onselectMethod).toBe(this.paramsMock.onselect);
			expect(this.component.animationSpeed).toBe(this.paramsMock.animationSpeed);
			expect(this.component.options).toBe(this.paramsMock.options);
			expect(this.component.value).toBe(this.paramsMock.selected());
			expect(this.component.selectedOption()).toBe(this.paramsMock.options()[1]);
			expect(this.component.isExpandeded()).toBeFalsy();
			expect(this.component.isReadOnly).toBe(this.paramsMock.isReadOnly);
			expect(this.component.isDirty()).toBeFalsy();
			expect(this.component.isOneOption()).toBeFalsy();
		});

		it('should update checked properties in options list', () => {
			var options = this.paramsMock.options();
			expect(options[0].checked()).toBeFalsy();
			expect(options[1].checked()).toBeTruthy(); // because selected "secondOption"
			expect(options[2].checked()).toBeFalsy();
		});
	});

	describe('When selected param changed', () => {
		it('should update selectedOption model property', () => {
			expect(this.component.selectedOption()).toBe(this.paramsMock.options()[1]);
			this.paramsMock.selected('thirdOption');
			expect(this.component.selectedOption()).toBe(this.paramsMock.options()[2]);
		});
	});

	describe('When method "slideToggle" called', () => {
		var event;
		beforeEach(()=>{
			spyOn($.fn, 'slideToggle');
			event = {
				currentTarget: $('#currentTarget')
			};
		});


		it('should call "focus" method from params', () => {
			this.component.slideToggle(null, event);
			expect(this.paramsMock.focus).toBeCalledWith(this.paramsMock.data);
		});

		it('should toggle isExpandeded value', () => {
			expect(this.component.isExpandeded()).toBeFalsy();
			this.component.slideToggle(null, event);
			expect(this.component.isExpandeded()).toBeTruthy();
		});

		it('should toggle hidden class', () => {
			expect($('.js-custom-select-layer').hasClass('hidden')).toBeTruthy();
			this.component.slideToggle(null, event);
			expect($('.js-custom-select-layer').hasClass('hidden')).toBeFalsy();
			expect($.fn.slideToggle).toBeCalledWith(this.paramsMock.animationSpeed);
		});
	});

	describe('When custom select have only one option', () => {
		var event;
		beforeEach(()=>{
			this.paramsMock.options([{
				name: 'firstOption',
				checked: ko.observable(true)
			}]);

			event = {
				currentTarget: $('#currentTarget')
			};
		});


		it('should update "isOneOption" value in model', () => {
			expect(this.component.isOneOption()).toBeTruthy();
		});

		it('should be not open drop down when "slideToggle" called', () => {
			expect($('.js-custom-select-layer').hasClass('hidden')).toBeTruthy();
			this.component.slideToggle(null, event);
			expect($('.js-custom-select-layer').hasClass('hidden')).toBeTruthy();
		});
	});

	describe('When method "onSelect" called', () => {
		var event;
		beforeEach(()=>{
			event = {
				currentTarget: $('#currentTarget')
			};
		});

		it('should update "selectedOption"', () => {
			expect(this.component.selectedOption()).toBe(this.paramsMock.options()[1]);
			this.component.onSelect(this.paramsMock.options()[2], event);
			expect(this.component.selectedOption()).toBe(this.paramsMock.options()[2]);
		});
		it('should update checked properties in options list', () => {
			var options = this.paramsMock.options();
			expect(options[0].checked()).toBeFalsy();
			expect(options[1].checked()).toBeTruthy(); // checked
			expect(options[2].checked()).toBeFalsy();

			this.component.onSelect(this.paramsMock.options()[2], event); // select last item

			expect(options[0].checked()).toBeFalsy();
			expect(options[1].checked()).toBeFalsy();
			expect(options[2].checked()).toBeTruthy(); // checked
		});

		it('should call "slideToggle" method', () => {
			spyOn(this.component, 'slideToggle');
			this.component.onSelect(this.paramsMock.options()[2], event);
			expect(this.component.slideToggle).toBeCalledWith(this.paramsMock.options()[2], event);
		});
	});

	describe('When selected param updated', () => {
		var selectedMock;
		beforeEach(() => {
			selectedMock = {
				checked:jest.fn()
			};
			this.paramsMock.selected(selectedMock);
		});
		it('should update selectedOption', () => {
			expect(this.component.selectedOption()).toBe(selectedMock);
		});
		it('should checked selectedOption', () => {
			expect(selectedMock.checked).toBeCalledWith(true);
		});
	});

	describe('When component created with selected object', () => {
		var selectedMock;
		beforeEach(() => {
			selectedMock = {
				checked:jest.fn()
			};
			this.paramsMock.selected = ko.observable(selectedMock);
			this.component = new CustomSelect(this.paramsMock);
		});
		it('should be checked selected item', () => {
			expect(selectedMock.checked).toBeCalledWith(true);
		});
	});
});
