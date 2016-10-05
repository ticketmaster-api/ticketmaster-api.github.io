var jsonHighlight = require('./../components/json-highlight');
var self;
function RequestsListViewModel(requests) {
	self = this;
	this.colors = [
		'column-color-1',
		'column-color-2',
		'column-color-3',
		'column-color-4',
		'column-color-5',
		'column-color-6',
		'column-color-7',
		'column-color-8',
		'column-color-9',
		'column-color-10',
		'column-color-11',
		'column-color-12'
	];
	this.requests = requests;
	
	this.viewModel = ko.observableArray([]);
	this.clearBtnIsVisible = ko.computed(this._isVisible, this);
	this.requests.subscribe(this.updateModel, this);
}


RequestsListViewModel.prototype.method = function () {
};

RequestsListViewModel.prototype.onTabClick = function (tab) {
	this.tabs(this.tabs().map(function (item) {
		return item.isActive(false)
	}));
	tab.isActive(true);
};

/**
 * Visibility flag for Clear btn
 * @returns {boolean}
 * @private
 */
RequestsListViewModel.prototype._isVisible = function () {
	return this.requests().length > 0;
};

/**
 * Update Viewmodel of request list
 * @param arr
 */
RequestsListViewModel.prototype.updateModel = function (arr) {
	var self = this;
	var newModel = this.requests()
		.map(function (obj) {

			var item =  $.extend({
				color: self.colors[obj.index % self.colors.length],
				active: ko.observable(false),
				tabs: ko.observableArray([
					{
						name: 'Json',
						resHTML: ko.observable(''),
						isActive: ko.observable(false)
					},
					{
						name: 'Blocks',
						isActive: ko.observable(true)
					}
				])
			}, obj);

			return item;
		});

	self.viewModel(newModel);
};

/**
 * Clear requeststs list handler
 * @param vm
 * @param event
 */
RequestsListViewModel.prototype.onClearRequests = function (vm, event) {
	this.requests([]);
};

/**
 * Details toggle handler
 * @param vm
 * @param event
 */
RequestsListViewModel.prototype.getDetails = function (vm, event) {
	jsonHighlight(this.tabs()[0].resHTML, this.res);
	this.active(!this.active());
};

module.exports = RequestsListViewModel;
