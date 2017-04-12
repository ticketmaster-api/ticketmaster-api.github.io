import {colorsService} from '../../services';
var slider = require('../../modules/slider');

class RequestListComponent{
	constructor({selectedParams, sharePath, setParams}) {
		this.url = selectedParams;
		this.sharePath = sharePath;
		this.requests = ko.observableArray([]).syncWith('REQUESTS_ARR');
		this.setParams = setParams;
		this.colors = colorsService.colors;
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
						Object.getProp(errorObj, '.responseJSON.errors[0].detail') || 'unknown',
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
	 * Visibility flag for Clear btn
	 * @returns {boolean}
	 * @private
	 */
	_isVisible() {
		return ko.utils.unwrapObservable(this.requests).length > 0;
	}

	/**
	 * Clear requeststs list handler
	 * @param vm
	 * @param event
	 */
	onClearRequests(vm, event) {
		this.requests([]);
	}
}

ko.components.register('request-list', {
	viewModel: RequestListComponent,
	template:`
	<section class="clearfix">
		<!--ko if: clearBtnIsVisible-->
			<!--headline-->
			<section class="row-container api-exp-request-list-headline">
				<h4 class="title">Request list</h4>
				<div class="headline-edit">
					<button data-bind="click: onClearRequests, popover: {type: 'tooltip', title: 'Clear requests history'}" class="btn btn-icon btn-clear" type="button"></button>
				</div>
			</section>

			<!--requests-->
			<section>
				<ul data-bind="foreach: viewModel" class="panel-group api-exp-request-list" id="response" role="tablist" aria-multiselectable="true">
					<li data-bind="css: {active: active}" class="panel panel-default api-exp-request-list-item clearfix">
						<request-component params="data: $data, index: $index, sharePath: $root.sharePath, setParams: $root.setParams"></request-component>
						<response-component params="data: $data, index: $index, config: $root.config, setParams: $component.setParams"></response-component>
					</li>
				</ul>
			</section>
		<!-- /ko -->
	</section>
`});


module.exports = RequestListComponent;