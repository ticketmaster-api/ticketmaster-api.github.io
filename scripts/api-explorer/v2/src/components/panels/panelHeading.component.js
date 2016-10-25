var self;
var getRandomColor = require('../../modules/colorClasses').getRandomColor;

function PanelHeading(params) {
	self = this;
	this.config = params.config && params.config._CONFIG;
	var page = params.page;
	this.setActive = params.setActive;
	this.isExpanded = params.isExpanded;
	this._panelName = params.data.key;
	this.title = this.config && this.config.title || this._panelName;
	this.data = params.data.value;
	if (page) {
		this.cardSize = page.size;
		this.pageParam = page.pageParam;
	}
	this.collapseId = params.collapseId;
	if (this.config.request) {
		this.getRandomColor = getRandomColor(params.colorClass);
	}
}

PanelHeading.prototype.followRequest = function (value) {
	var url = Object.getProp(value, '.config.request');
	url && location.assign(url);
};

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
					<pagination params="number: data.number, totalPages: data.totalPages, pageParam: pageParam"></pagination>
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
