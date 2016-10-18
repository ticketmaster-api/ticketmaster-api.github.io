var jsonHighlight = require('./../modules/json-highlight');
var self;
var slider = require('../modules/slider');

function RequestsListViewModel(requests, url) {
	this.url = url;
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
	this.clearBtnIsVisible = ko.computed(this._isVisible, this);
	this.requests.subscribe(this.updateModel, this);
}

/**
 * Update Viewmodel of request list
 * @param arr
 */
RequestsListViewModel.prototype.updateModel = function (arr) {
	var self = this;
	
	var newModel = this.requests()
		.map(function (obj) {
			var item =  $.extend({}, obj, {
				color: self.colors[obj.index % self.colors.length],
				active: ko.observable(false),
				resHTML: ko.observable('')
			});
			return item;
		});
	slider.remove(self.viewModel().length);
	self.viewModel(newModel);
	setTimeout(function () {
		slider.set(self.viewModel().length);
		$('#show-details-0').trigger('click');
	}, 10);
};

/**
 * get details
 * @param data
 */
RequestsListViewModel.prototype.getMore = function (data) {
	var card = this;
	var currentSlider = $('#slider-' + card.sectionIndex);
	var component = $('<section data-bind="component: {name: \'panel-group\', params: params}"></section>');
	var curslick = currentSlider.slick('getSlick');
	var newData = {};
	
	// gathering all primitive props in additional panel
	for (var key in data) {
		if (!data.hasOwnProperty(key)) {
			continue;
		}
		var val = data[key];
		if (typeof val !== 'object') {
			newData[data.type || Object.keys(data)[0]] = newData[data.type || Object.keys(data)[0]] || {};
			newData[data.type || Object.keys(data)[0]][key] = val;
		} else {
			newData[key] = val;
		}
	}
	
	// extending additional data (copy)
	var params = $.extend({}, card, {cards: newData, groupIndex: card.groupIndex + 1});
	// apply component data bindings
	ko.applyBindings({
		params: params
	}, component[0]);
	
	// add slide with selected data
	currentSlider.slick('slickAdd', component);
	
	// remove outstanding slides
	for (var i = curslick.slideCount - 2; i > card.groupIndex; i--) {
		currentSlider.slick('slickRemove', i, false);
	}
	// move to next slide
	currentSlider.slick('slickNext');
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

/**
 * Join string for id's
 * @param s
 * @param i
 * @returns {string}
 */
RequestsListViewModel.prototype.getStr = function (s, i) {
	var str = s;
	var i1 = i ? i() : '';
	return [
		str,
		i1
	].join('-');
};

module.exports = RequestsListViewModel;
