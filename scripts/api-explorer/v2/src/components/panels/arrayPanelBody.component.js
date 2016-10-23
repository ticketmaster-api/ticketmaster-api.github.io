var self;

function objectPanelBodyComponent(params) {
	self = this;
	this.title = params.data.key;
	this.data = params.data.value;
	this.config = params.config;
	this._panelName = params.data.key;
	this.cardIndex = this.cardIndex || ko.utils.unwrapObservable(params.index);
	this.panelGroup = params.panelGroup;
	this.getMore = this.panelGroup.getMore;
}


module.exports = ko.components.register('array-panel-body', {
	viewModel:  objectPanelBodyComponent,
	template:`
		<ul data-bind="foreach: data" class="list-group">
			<li class="list-group-item">
			
				<!-- ko if: $parent._panelName === 'images' -->
					<img data-bind="attr: {src: url, alt: 'image-' + ratio}" alt="img" class="img">
				<!-- /ko -->
				
				<!-- ko ifnot: $parent._panelName === 'images' -->
				<span data-bind="text: name || '#' + $index()" class="name truncate">event name</span>
				<!-- /ko -->
				
				<!-- ko if: typeof $data === 'object' -->
					<button data-bind="click: $component.getMore.bind($component, $index())" type="button" class="btn btn-icon blue-shevron-right pull-right"></button>
				<!-- /ko -->
				
			</li>
		</ul>
`});
