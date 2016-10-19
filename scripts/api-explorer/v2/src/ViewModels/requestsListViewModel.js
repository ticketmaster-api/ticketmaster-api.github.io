var jsonHighlight = require('./../modules/json-highlight');
var slider = require('../modules/slider');
var filter = require('../../config.json');
var self;

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
RequestsListViewModel.prototype.getMore = function (id, data) {
	var panelGroup = this.panelGroup;
	var panel = this;
	var currentSlider = $('#slider-' + panelGroup.sectionIndex);
	var component = $('<section data-bind="component: {name: \'panel-group\', params: params}"></section>');
	var curslick = currentSlider.slick('getSlick');
	
	// extending additional data (copy)
	var params = $.extend({}, panelGroup, {
		data: data,
		groupIndex: panelGroup.groupIndex + 1,
		_propTitle: typeof id === 'string' && id,
		config: panel.config
	});

	// apply component data bindings
	ko.applyBindings({
		params: params
	}, component[0]);
	
	// add slide with selected data
	currentSlider.slick('slickAdd', component);
	
	// remove outstanding slides
	for (var i = curslick.slideCount - 2; i > panelGroup.groupIndex; i--) {
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
	return ko.utils.unwrapObservable(this.requests).length > 0;
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

/**
 * Get raw response data
 * @param model {object}
 * @returns {string}
 */
RequestsListViewModel.prototype.getRawData = function (model) {
	var content = model.res.res;
	var rawWindow = window.open("data:text/json," + encodeURI(JSON.stringify(content, null, 2)), '_blank');
	rawWindow.focus();
};

module.exports = RequestsListViewModel;
