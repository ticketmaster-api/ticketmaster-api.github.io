var ko = require('knockout');
window.ko = ko;


var CategoryMenu = require('scripts/api-explorer/v2/src/components/filter/categoryMenu.component.js');

describe("CategoryMenu component spec", function() {
	beforeEach(() => {
		this.paramsMock = {
			selectedCategory: ko.observable('category 2'),
			data: {
				'category 1':null,
				'category 2':null,
				'category 3':null
			}
		};
		this.component = new CategoryMenu(this.paramsMock);
	});

	describe('When component created', () => {
		it('should init categories list', () => {
			expect(this.component.categories()).toEqual([{
				checked: jasmine.any(Function),
				name: 'category 1',
				link: false
			},{
				checked: jasmine.any(Function),
				name: 'category 2',
				link: false
			},{
				checked: jasmine.any(Function),
				name: 'category 3',
				link: false
			}]);
			expect(this.component.categories()[0].checked()).toBe(false);
			expect(this.component.categories()[1].checked()).toBe(true);
			expect(this.component.categories()[2].checked()).toBe(false);
		});
	});

	describe('When clicked on category', () => {
		it('should be updated categories checked status', () => {
			this.component.selectCategory({name: 'category 1'});
			expect(this.component.categories()[0].checked()).toBe(true);
			expect(this.component.categories()[1].checked()).toBe(false);
			expect(this.component.categories()[2].checked()).toBe(false);
		});
	});

	describe('When updated selected category observable', () => {
		it('should be updated categories checked status', () => {
			this.paramsMock.selectedCategory('category 3');
			expect(this.component.categories()[0].checked()).toBe(false);
			expect(this.component.categories()[1].checked()).toBe(false);
			expect(this.component.categories()[2].checked()).toBe(true);
		});
	});
});
