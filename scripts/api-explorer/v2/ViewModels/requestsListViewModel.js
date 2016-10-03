
function RequestsListViewModel(requests) {
	var colors = [
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

	this.clearBtnIsVisible = ko.computed(function () {
		return this.requests().length > 0;
	}, this);
	
	this.requests(this.requests().map(function (obj, index) {
		var max = colors.length - 1;
		obj.color = colors[index % max];
		return obj;
	}));
}

RequestsListViewModel.prototype.onClearRequests = function (vm, event) {
	this.requests([]);
};


RequestsListViewModel.prototype.method = function (category) {
};

module.exports = RequestsListViewModel;
