import {jsonHL} from '../../services';

class RequestComponent{
	constructor({data, index, sharePath, setParams}) {
		const $index = ko.unwrap(index);
		this.data = data;
		this.response = data.response;
		this.hasResponse = !!data.response;
		this.req = data.req;
		this.jsonHL = jsonHL;
		this.color = data.color;
		this.active = data.active;
		this.isActiveMoreMenu = data.isActiveMoreMenu;
		this.copiedForShare = data.copiedForShare;
		this.paramsAreSeted = data.paramsAreSeted;
		this.copiedUrl = data.copiedUrl;
		this.resHTML = data.resHTML;
		this.sharePath = sharePath;
		this.rootsetParams = setParams;
		this.ids = {
			wrapper: `heading-${$index}`,
			details: {
				id: `show-details-${$index}`,
				target: `#collapse-${$index}`,
				controls: `collapse-${$index}`
			}
		};
	}

	setParams() {
		this.paramsAreSeted(true);
		setTimeout(() => {
			this.paramsAreSeted(false);
		}, 500);
		this.rootsetParams(this.data);
	}

	getMoreMenu() {
		this.isActiveMoreMenu(!ko.unwrap(this.isActiveMoreMenu));
	}

	/**
	 * Details toggle handler
	 * @param model
	 * @param event
	 */
	getDetails(model, event) {
		if (!ko.unwrap(this.resHTML).length) {
			this.jsonHL(this.resHTML, this.response);
		}

		let slider = $(event.currentTarget)
			.parents('.panel')
			.find('.slick-slider');

		if (!slider.find('.slick-track').width()) {
			setTimeout(()=> {
				slider.slick('setPosition');
			}, 0);
		}
		this.active(!this.active());
	}

	/**
	 * Get raw response data
	 * @param model {object}
	 * @returns {string}
	 */
	getRawData(model = {}) {
		var content = model.response || ko.unwrap(model.data.error)[3] || {};
		var rawWindow = window.open("data:text/json," + encodeURI(JSON.stringify(content, null, 2)), '_blank');
		rawWindow.focus();
	}

	get setParamsPopover() {
		return {
			type: 'tooltip',
			title: 'Repeat settings of this request'
		}
	}

	get sharePathPopover() {
		return {
			type: 'tooltip',
			title: 'Copy request share link'
		}
	}

	get copyUrlPopover() {
		return {
			type: 'tooltip',
			title: 'Copy request URL'
		}
	}

	get getRawDataPopover() {
		return {
			type: 'tooltip',
			title: 'Show raw response data'
		}
	}
}

ko.components.register('request-component', {
	viewModel: RequestComponent,
	template:`
		<section class="row-container request" data-bind="attr: {id: ids.wrapper}" role="tab">
			<div class="edit-controls" data-bind="css: {'visible white': isActiveMoreMenu}">
				<button data-bind="click: setParams, css: {done: paramsAreSeted}, popover: setParamsPopover" class="btn btn-icon btn-preset" type="button"></button>
				<button data-bind="copyToClipboard: {text: sharePath}, popover: sharePathPopover" class="btn btn-icon btn-share" type="button"></button>
				<button data-bind="copyToClipboard: {text: req}, popover: copyUrlPopover" class="btn btn-icon btn-copy" type="button"></button>
				<button data-bind="click: getRawData, popover: getRawDataPopover" class="btn btn-icon btn-raw" type="button"></button>
			</div>
			<button data-bind="click: getMoreMenu, css: {active: isActiveMoreMenu}" class="btn btn-icon btn-more"></button>
			<div class="panel-title">
				<!-- ko if: hasResponse -->
					<button data-bind="click: getDetails, attr: {id: ids.details.id, 'data-target': ids.details.target, 'aria-controls': ids.details.controls}" type="button" class="btn btn-icon shevron up blue view-control" data-toggle="collapse" data-parent="#response" aria-expanded="false"></button>
				<!-- /ko -->
				<!-- ko ifnot: hasResponse -->
					<button data-bind="popover: {type: 'popover', trigger: 'click', data: data.error}" class="btn btn-icon btn-alert view-control"></button>
				<!-- /ko -->
			</div>
			<span data-bind="css: color" class="color-indicator view-control"></span>
			<p data-bind="text: req, blockEllipsis: {clamp: 2}" class="item_text"></p>
		</section>
`});

module.exports = RequestComponent;