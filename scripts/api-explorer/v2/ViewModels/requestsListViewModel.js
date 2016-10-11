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
	this.isActiveTab = ko.observable(false);
	this.viewModel = ko.observableArray([]);
	this.blocksViewModel = ko.observableArray([]);
	this.clearBtnIsVisible = ko.computed(this._isVisible, this);
	this.requests.subscribe(this.updateModel, this);
}


RequestsListViewModel.prototype.getMore = function () {
	console.log(this)
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
				resHTML: ko.observable(''),
				blocks: [
					{
						name: 'Events',
						panelType: 'list-group',
						items: ko.observableArray(Object.getProp(obj,'res._embedded.events') || []),
						totalElements: ko.observable(Object.getProp(obj,'res.page.totalElements')||''),
						isActive: ko.observable(false)
					},
					{
						name: 'Page',
						panelType: 'clear',
						items: obj.error || obj.res.page,
						isActive: ko.observable(false)
					}
				]
			}, obj);
			return item;
		});
	self.viewModel(newModel);
	// $('#collapse-0').collapse();
	setTimeout(function () {
		$('#show-details-0').trigger('click');
	}, 10);
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
	if (!this.resHTML().length) {
		jsonHighlight(this.resHTML, this.res);
	}
	this.active(!this.active());
};

RequestsListViewModel.prototype.getStr = function (s, i) {
	var str = s;
	var i1 = i ? i() : '';
	return [
		str,
		i1
	].join('-');
};

module.exports = RequestsListViewModel;
