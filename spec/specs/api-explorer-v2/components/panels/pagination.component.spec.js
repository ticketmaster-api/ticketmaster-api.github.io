const ko = require('knockout');
const $ = require('jquery');
window.ko = ko;
window.$ = $;

var Pagination = require('scripts/api-explorer/v2/src/components/panels/pagination.component.js');

describe("Pagination component spec", function() {

	var setFixture = () => {
		document.body.innerHTML =
			'<div><button id="api-exp-get-btn"/></div>';
	};


	beforeEach(() => {
		setFixture();
		this.paramsMock = {
			totalPages: 10,
			number:5,
			page: {
				category: 'categoryMock',
				method: 'methodMock',
				methodId: 'methodIdMock',
				params: 'paramsMock',
				pageParam: ko.observable(5),
				setParams: jest.fn()
			}
		};

		this.component = new Pagination(this.paramsMock);


	});

	describe('When component created', () => {
		it('should init data in view model', () => {
			expect(this.component.page).toBe(this.paramsMock.page);
			expect(this.component.totalPages).toBe(this.paramsMock.totalPages);
			expect(this.component.number).toBe(this.paramsMock.number);
			expect(this.component.first).toBeTruthy();
			expect(this.component.last).toBeTruthy();
			expect(this.component.requestBtn.size()).toBe(1);
		});
	});

	describe('When getPrevPage called', () => {
		it('should decrement page', () => {
			this.component.getPrevPage();
			expect(this.component.page.pageParam()).toBe(4);
		});

		it('should call setParams method', () => {
			this.component.getPrevPage();
			expect(this.paramsMock.page.setParams).toBeCalledWith({
				category: this.paramsMock.page.category,
				method: this.paramsMock.page.method,
				methodId: this.paramsMock.page.methodId,
				params: this.paramsMock.page.params
			});
		});

		it('should triggered event "click" on button', () => {
			spyOn(this.component.requestBtn, 'trigger');
			this.component.getPrevPage();
			expect(this.component.requestBtn.trigger).toBeCalledWith('click');
		});

		it('should set zero page if current page less than 1', () => {
			this.component.page.pageParam(0);
			this.component.getPrevPage();
			expect(this.component.page.pageParam()).toBe(0);
		});
	});

	describe('When getNextPage called', () => {
		it('should increment page', () => {
			this.component.getNextPage();
			expect(this.component.page.pageParam()).toBe(6);
		});

		it('should call setParams method', () => {
			this.component.getNextPage();
			expect(this.paramsMock.page.setParams).toBeCalledWith({
				category: this.paramsMock.page.category,
				method: this.paramsMock.page.method,
				methodId: this.paramsMock.page.methodId,
				params: this.paramsMock.page.params
			});
		});

		it('should triggered event "click" on button', () => {
			spyOn(this.component.requestBtn, 'trigger');
			this.component.getNextPage();
			expect(this.component.requestBtn.trigger).toBeCalledWith('click');
		});

		it('should not update page if current page is last', () => {
			this.component.number = 9;
			this.component.getNextPage();
			expect(this.component.page.pageParam()).toBe(9);
		});
	});
});
