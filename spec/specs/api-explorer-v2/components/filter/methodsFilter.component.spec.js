const ko = require('knockout');
const $ = require('jquery');

window.ko = ko;
window.$ = $;

var MethodsFilter = require('scripts/api-explorer/v2/src/components/filter/methodsFilter.component.js');

describe("MethodsFilter component spec", function(){
	beforeEach(() => {
		this.paramsMock = {
			selectedCategory: ko.observable('category 3'),
			data: {
				'category 1':null,
				'category 2':null,
				'category 3':{
					ALL: {
						method1: { id: 'method1', name: 'method 1', link: 'method 1 link' },
						method2: { id: 'method2', name: 'method 2', link: 'method 2 link' },
						method3: { id: 'method3', name: 'method 3', link: 'method 3 link' }
					},
					POST: {
						postMethod1: { id: 'postMethod1', name: 'postMethod 1', link: 'postMethod 1 link' }
					}
				}
			},
			selectedMethodType: ko.observable('ALL'),
			selectedMethod: ko.observable()
		};
		this.component = new MethodsFilter(this.paramsMock);
	});

	describe('When component created', () => {
		it('should init methodsViewModel list', () => {
			expect(this.component.methodsViewModel()).toEqual([
				{ id: 'method1', name: 'method 1', link: 'method 1 link', checked: jasmine.any(Function)},
				{ id: 'method2', name: 'method 2', link: 'method 2 link', checked: jasmine.any(Function)},
				{ id: 'method3', name: 'method 3', link: 'method 3 link', checked: jasmine.any(Function)}
			])
		});

		it('first element should be checked', () => {
			expect(this.component.methodsViewModel()[0].checked()).toBe(true);
			expect(this.component.methodsViewModel()[1].checked()).toBe(false);
			expect(this.component.methodsViewModel()[2].checked()).toBe(false);
		});
	});

	describe('When onSelectMethod called', () => {
		it('should updated selectedMethodName', () => {
			this.component.onSelectMethod({id: 'method2'});
			expect(this.component.selectedMethodName()).toEqual(
				{ id: 'method2', name: 'method 2', link: 'method 2 link', checked: jasmine.any(Function)});
			this.component.onSelectMethod({id: 'method3'});
			expect(this.component.selectedMethodName()).toEqual(
				{ id: 'method3', name: 'method 3', link: 'method 3 link', checked: jasmine.any(Function)});
		});
	});

	describe('Check filterTransclusion method', () => {
		it('should filter dom nodes array for insertion', () => {
			var mockElementsList = [
				{ nodeName: '#text' },
				{ nodeName: '#text', prop: 1 },
				{ nodeName: '#comment' },
				{ nodeName: '#someEl' },
				{ nodeName: '#someEl2' }
			];

			expect(this.component.filterTransclusion(mockElementsList, 1)).toEqual([
				{ nodeName: '#text' }, { nodeName: '#someEl2' }, { nodeName: '#text' }
			]);

		});
	});


});
