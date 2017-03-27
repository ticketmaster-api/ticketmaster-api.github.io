var ko = require('knockout');
window.ko = ko;


var RadioFilter = require('scripts/api-explorer/v2/src/components/filter/radioFilter.component.js');

describe("CategoryMenu component spec", function() {
	beforeEach(() => {
		this.paramsMock = {
			selectedCategory: ko.observable('category 3'),
			data: {
				'category 1':null,
				'category 2':{
					ALL:{},
					GET:{}
				},
				'category 3':{
					ALL: {},
					GET: {},
					POST: {},
					PATCH:{}
				}
			},
			selectedMethodType: ko.observable('ALL'),
			selectedMethod: ko.observable()
		};
		this.component = new RadioFilter(this.paramsMock);
	});

	describe('When component created', () => {
		it('should be fill radiosModel lilst', () => {
			expect(this.component.radiosModel()).toEqual([
				{ name: 'ALL', checked: jasmine.any(Function) },
				{ name: 'PATCH', checked: jasmine.any(Function) },
				{ name: 'GET', checked: jasmine.any(Function) },
				{ name: 'POST', checked: jasmine.any(Function) }
			]);
		});

		it('should be selected \'ALL\' method name in radiosModel list', () => {
			expect(this.component.radiosModel()[0].checked()).toBe(true);
			expect(this.component.radiosModel()[1].checked()).toBe(false);
			expect(this.component.radiosModel()[2].checked()).toBe(false);
			expect(this.component.radiosModel()[3].checked()).toBe(false);
		});
	});

	describe('When selected method changed', () => {
		it('should be updated checked status according selected item', () => {
			this.component.onchangeRadios({ name: 'GET' });
			expect(this.component.radiosModel()[0].checked()).toBe(false);
			expect(this.component.radiosModel()[1].checked()).toBe(false);
			expect(this.component.radiosModel()[2].checked()).toBe(true);
			expect(this.component.radiosModel()[3].checked()).toBe(false);
		});

		it('should update selectedMethodType', () => {
			this.component.onchangeRadios({ name: 'GET' });
			expect(this.component.selectedMethodType()).toBe('GET');
		});
	});

	describe('When component render', () => {
		it('should create inputId by method name', () => {
			expect(this.component.getInputId('POST')).toBe('api-exp-POST');
			expect(this.component.getInputId('GET')).toBe('api-exp-GET');
			expect(this.component.getInputId('PATCH')).toBe('api-exp-PATCH');
			expect(this.component.getInputId('ALL')).toBe('api-exp-ALL');
		});
	});

	describe('When category udpated', () => {
		it('should update radiosModel list', () => {
			this.paramsMock.selectedCategory('category 2');
			expect(this.component.radiosModel()).toEqual([
				{ name: 'ALL', checked: jasmine.any(Function) },
				{ name: 'GET', checked: jasmine.any(Function) }
			]);
		});

		it('should be selected \'ALL\' method name in radiosModel list', () => {
			expect(this.component.radiosModel()[0].checked()).toBe(true);
			expect(this.component.radiosModel()[1].checked()).toBe(false);
		});
	});

});
