import {getRandomColor} from '../../modules/colorClasses';

class PanelHeading {
	constructor({config = {}, data = {}, setActive, isExpanded, page, collapseId, colorClass}) {
		this.config = config._CONFIG;
		this.setActive = setActive;
		this.isExpanded = isExpanded;
		this._panelName = data.key;
		this.title = this.config && this.config.title || this._panelName;
		this.data = data.value;
		this.collapseId = collapseId;
		this.page = page;
		this.init({page, colorClass})
	}

	init({page, colorClass}) {
		if (page) {
			this.cardSize = page.size;
		}
		if (this.config.request) {
			this.getRandomColor = getRandomColor(colorClass);
		}
	}

	followRequest(value) {
		let url = Object.getProp(value, '.config.request');
		url && location.assign(url);
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
				
				<!-- ko if: config.request !== undefined -->
				<section class="follow-request">
					<span data-bind="css: getRandomColor" class="color-indicator"></span>
					<button data-bind="click: followRequest" class="btn btn-request" type="button">another request</button>
				</section>
				<!-- /ko-->
			</div>
		</section>
`});
