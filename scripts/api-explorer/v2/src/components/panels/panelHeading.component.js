import {colorsService} from '../../services';

class PanelHeading {
	constructor({config = {}, data = {}, setActive, isExpanded, page, collapseId, colorClass, panelGroup}) {
		this.config = config._CONFIG;
		this.setActive = setActive;
		this.isExpanded = isExpanded;
		this._panelName = data.key;
		this.title = this.config && this.config.title || this._panelName;
		this.data = data.value;
		this.collapseId = collapseId;
		this.page = page;
		this.panelGroup = panelGroup;
		this.init({page, colorClass});
	}

	init({page, colorClass}) {
		if (page) {
			this.cardSize = page.size;
		}
		if (this.config.request) {
			this.anotherRequestColor = colorsService.getRandomColor(colorClass);
		}
	}

	followRequest(value) {
		let url = Object.getProp(value, '.config.request');
		let regularExp = window.location.origin + window.location.pathname.slice(0, -1);

		if (url && url.match(new RegExp(regularExp))) {
			this.anotherRequest = ko.observable({url, panelGroup: this.panelGroup, color: this.anotherRequestColor}).publishOn('ANOTHER_REQUEST');
		} else {
			location.assign(url);
		}
	}
	get hasAnotherRequest() {
		return !!this.config.request;
	}
}


module.exports = ko.components.register('panel-heading', {
	viewModel:  PanelHeading,
	template:`
		<section class="panel-heading">
			<div class="panel-title">
				
				<a data-bind="click: setActive, attr: {href: '#' + collapseId, 'aria-controls': collapseId, 'aria-expanded': isExpanded}" class="btn btn-icon btn-title" type="button" data-toggle="collapse" aria-expanded="false">
					<span class="btn btn-icon shevron white-shevron-up"></span>
					<p data-bind="text: title" class="title">Panel title</p>
				</a>
				
				<!-- ko if: _panelName === 'events'-->
					<span data-bind="text: cardSize" class="counter"></span>
				<!-- /ko-->
				
				<!-- ko if: _panelName === 'page'-->
					<pagination params="number: data.number, totalPages: data.totalPages, page: page"></pagination>
				<!-- /ko-->
				
				<!-- ko if: hasAnotherRequest -->
				<section class="follow-request">
					<span data-bind="css: anotherRequestColor" class="color-indicator"></span>
					<button data-bind="click: followRequest" class="btn btn-request" type="button">another request</button>
				</section>
				<!-- /ko-->
			</div>
		</section>
`});
