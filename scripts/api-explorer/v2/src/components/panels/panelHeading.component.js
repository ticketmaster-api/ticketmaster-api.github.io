var self;

function objectPanelBodyComponent(params) {
	self = this;
	this.title = params.data.key;
	this.data = params.data.value;
	this.index = ko.utils.unwrapObservable(params.index);
	this.cardSize = params.cardSize;
	this.pageParam = params.pageParam;
	this.collapseId = params.collapseId;
}
module.exports = ko.components.register('panel-heading', {
	viewModel:  objectPanelBodyComponent,
	template:`
		<section class="panel-heading">
			<div class="panel-title">
				
				<a data-bind="attr: {'href': '#' + collapseId + index, 'aria-controls': collapseId + index}" class="btn btn-icon" type="button" data-toggle="collapse" aria-expanded="false">
					<span class="btn btn-icon shevron white-shevron-up"></span>
					<p data-bind="text: title" class="title">Title</p>
				</a>
				
				<!-- ko if: title === 'events'-->
					<span data-bind="text: cardSize" class="counter"></span>
				<!-- /ko-->
				
				<!-- ko if: title === 'page'-->
					<pagination params="number: data.number, totalPages: data.totalPages, pageParam: pageParam"></pagination>
				<!-- /ko-->
			</div>
		</section>
`});
