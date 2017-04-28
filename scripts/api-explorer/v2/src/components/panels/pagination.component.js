/**
 * Pagination element
 * @param params
 */
class Pagination {
	constructor({page = {}, totalPages, number}) {
		this.page = page;
		this.totalPages = +totalPages;
		this.number = +number;
		this.first = !!this.number;
		this.last = +number < +totalPages - 1;
		this.requestBtn = $('#api-exp-get-btn');
	}

	/**
	 * get next page
	 */
	getPrevPage() {
		let page = this.page;
		const val = ko.unwrap(page.pageParam);
		page.pageParam(val > 0 ? val - 1 : 0);
		page.setParams({
			category: page.category,
			method: page.method,
			methodId:	page.methodId,
			params: page.params
		});
		this.requestBtn.trigger('click');
	}

	/**
	 * get prev page
	 */
	getNextPage() {
		let page = this.page;
		const val = ko.unwrap(this.number);
		page.pageParam(val < this.totalPages - 1 ? val  + 1: val);
		page.setParams({
			category: page.category,
			method: page.method,
			methodId:	page.methodId,
			params: page.params
		});
		this.requestBtn.trigger('click');
	}
}

ko.components.register('pagination', {
	viewModel: Pagination,
	template:
	`<span class="navigation-wrapper">
		<button data-bind="click: getPrevPage, enable: first" type="button" class="navigation prev"></button>
		<button data-bind="click: getNextPage, enable: last" type="button" class="navigation next"></button>
	</span>`
});

module.exports = Pagination;