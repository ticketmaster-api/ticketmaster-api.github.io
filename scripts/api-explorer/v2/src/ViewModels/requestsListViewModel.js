var jsonHighlight = require('./../modules/json-highlight');
var slider = require('../modules/slider');
var filter = require('../../config.json');
var self;
var colors = require('../modules/colorClasses').colors;

class RequestsListViewModel {
	constructor(params) {
		this.url = params.selectedParams;
		this.sharePath = params.sharePath;
		this.requests = params.requests;
		this.setParams = params.setParams;
		self = this;
		this.colors = colors;
		this.isActiveMoreMenu = ko.observable(true);
		this.viewModel = ko.observableArray([]);
		this.clearBtnIsVisible = ko.computed(this._isVisible, this);
		this.requests.subscribe(this.updateModel, this);
	}

	/**
	 * Update Viewmodel of request list
	 * @param arr
	 */
	updateModel(arr) {
		var newModel = ko.unwrap(this.requests)
			.map(obj => {
				var newObj = {
					color: this.colors[obj.index % this.colors.length],
					active: ko.observable(false),
					isActiveMoreMenu: ko.observable(false),
					copiedForShare: ko.observable(false),
					paramsAreSeted: ko.observable(false),
					copiedUrl: ko.observable(false),
					resHTML: ko.observable('')
				};

				// error popover
				if (obj.error) {
					var errorObj = obj.error;
					newObj.error = ko.observable([
						Object.getProp(errorObj, '.responseJSON.errors[0].status') || errorObj.status + '',
						Object.getProp(errorObj, '.responseJSON.errors[0].statusText') || '',
						Object.getProp(errorObj, '.responseJSON.errors[0].detail') || 'unnown',
						Object.getProp(errorObj, '.responseJSON') || {}
					])
				}

				return $.extend({}, obj, newObj);
			});
		slider.remove(this.viewModel().length);
		this.viewModel(newModel);
		setTimeout(() => {
			slider.set(this.viewModel().length);
			$('#show-details-0').trigger('click');
		}, 10);
	}

	/**
	 * get details
	 * @param data
	 */
	getMore(id, data) {
		var panelGroup = this.panelGroup;
		var panel = this;
		var currentSlider = $('#slider-' + panelGroup.sectionIndex);
		var component = $('<section data-bind="component: {name: \'panel-group\', params: params}"></section>');
		var curslick = currentSlider.slick('getSlick');

		// extending additional data (copy)
		var params = $.extend({}, panelGroup, {
			data: data,
			groupIndex: panelGroup.groupIndex + 1,
			_propTitle: typeof id === 'string' && id || 'object',
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
	}

	/**
	 * Visibility flag for Clear btn
	 * @returns {boolean}
	 * @private
	 */
	_isVisible() {
		return ko.utils.unwrapObservable(this.requests).length > 0;
	};

	/**
	 * Clear requeststs list handler
	 * @param vm
	 * @param event
	 */
	onClearRequests(vm, event) {
		this.requests([]);
	};

	/**
	 * Details toggle handler
	 * @param vm
	 * @param event
	 */
	getDetails(vm, event) {
		if (!this.resHTML().length) {
			jsonHighlight(this.resHTML, this.response);
		}
		let slider = $(event.currentTarget).parents('.panel').find('.slick-slider');
		if (!slider.find('.slick-track').width()) {
			setTimeout(()=> {
				slider.slick('setPosition');
			}, 0);
		}
		this.active(!this.active());
	};

	/**
	 * Join string for id's
	 * @param s
	 * @param i
	 * @returns {string}
	 */
	getStr(s, i) {
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
	getRawData(model = {}) {
		var content = model.response || ko.unwrap(model.error)[3] || {};
		var rawWindow = window.open("data:text/json," + encodeURI(JSON.stringify(content, null, 2)), '_blank');
		rawWindow.focus();
	}

	getMoreMenu() {
		this.isActiveMoreMenu(!ko.unwrap(this.isActiveMoreMenu));
	}

	copyUrl(model, event) {
		var currentField = this;
		var element = event.currentTarget;
		self.clipboard = new Clipboard(element);
		self.clipboard.on('success', function onSuccessCopy(e) {
			$(element).hasClass('btn-share') ? currentField.copiedForShare(true) : currentField.copiedUrl(true);
			setTimeout(function () {
				$(element).hasClass('btn-share') ? currentField.copiedForShare(false) : currentField.copiedUrl(false);
			}, 500);
			e.clearSelection();
		})
		.on('error', function onErrorCopy(e) {
			console.error('Action:', e.action);
			console.error('Trigger:', e.trigger);
		});
	}

	setParamsFromHere(model, event) {
		this.paramsAreSeted(true);
		setTimeout(() => {
			this.paramsAreSeted(false);
		}, 200);
		self.setParams(model);
	}

	removeHandler() {
		this.clipboard && this.clipboard.destroy();
		delete this.clipboard;
	}
}

module.exports = RequestsListViewModel;
