var self;

function objectPanelBodyComponent(params) {
	self = this;
	this.title = params.data.key;
	this.data = params.data.value;
	this.cardGroup = params.cardGroup;
	this.getMore = this.cardGroup.getMore;
}


module.exports = ko.components.register('array-panel-body', {
	viewModel:  objectPanelBodyComponent,
	template:`
		<ul data-bind="foreach: data" class="list-group">
			<li class="list-group-item">
			
				<!-- ko if: $parent.title === 'images' -->
					<img data-bind="attr: {src: url, alt: 'image-' + ratio}" alt="img" class="img">
				<!-- /ko -->
				
				<!-- ko ifnot: $parent.title === 'images' -->
				<span data-bind="text: name || '#' + $index()" class="name truncate">event name</span>
				<!-- /ko -->
				
				<!-- ko if: typeof $data === 'object' -->
					<button data-bind="click: $component.getMore.bind($component.cardGroup)" type="button" class="btn btn-icon blue-shevron-right pull-right"></button>
				<!-- /ko -->
				
			</li>
		</ul>
`});
