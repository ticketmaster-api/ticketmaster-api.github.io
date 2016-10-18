var self;

/**
 * Pagination element
 * @param params
 */
function pagination(params) {
	this.pageParam = params.pageParam;
	this.totalPages = +params.totalPages;
	this.number = +params.number;
	this.first = !!this.number;
	this.last = this.number < this.totalPages - 1;
	this.requestBtn = $('#api-exp-get-btn');
	self = this;
}

/**
 * get next page
 */
pagination.prototype.getPrevPage = function () {
	var val = this.pageParam();
	self.pageParam(val > 0 ? val - 1 : 0);
	self.requestBtn.trigger('click');
};

/**
 * get prev page
 */
pagination.prototype.getNextPage = function () {
	var val = this.number;
	self.pageParam(val < self.totalPages - 1 ? val  + 1: val);
	self.requestBtn.trigger('click');
};

module.exports = ko.components.register('pagination', {
	viewModel: pagination,
	template:
	`<span class="navigation-wrapper">
		<button data-bind="click: getPrevPage, enable: first" type="button" class="navigation prev"></button>
		<button  data-bind="click: getNextPage, enable: last" type="button" class="navigation next"></button>
	</span>`
});
