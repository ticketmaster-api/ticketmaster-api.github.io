var self;

function objectPanelBodyComponent(params) {
	self = this;
	var config = params.config && params.config._CONFIG;
	var page = params.page;
	this.setActive = params.setActive;
	this._panelName = params.data.key;
	this.title = config && config.title || this._panelName;
	this.data = params.data.value;
	if (page) {
		this.cardSize = page.size;
		this.pageParam = page.pageParam;
	}
	this.collapseId = params.collapseId;
}
module.exports = ko.components.register('panel-heading', {
	viewModel:  objectPanelBodyComponent,
	template:`
		<section class="panel-heading">
			<div class="panel-title">
				
				<a data-bind="click: setActive, attr: {href: '#' + collapseId, 'aria-controls': collapseId}" class="btn btn-icon" type="button" data-toggle="collapse" aria-expanded="false">
					<span class="btn btn-icon shevron white-shevron-up"></span>
					<p data-bind="text: title" class="title">Panel title</p>
				</a>
				
				<!-- ko if: _panelName === 'events'-->
					<span data-bind="text: cardSize" class="counter"></span>
				<!-- /ko-->
				
				<!-- ko if: _panelName === 'page'-->
					<pagination params="number: data.number, totalPages: data.totalPages, pageParam: pageParam"></pagination>
				<!-- /ko-->
			</div>
		</section>
`});
