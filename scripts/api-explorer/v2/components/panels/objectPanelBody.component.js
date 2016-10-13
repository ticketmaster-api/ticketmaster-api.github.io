var self;

function objectPanelBodyComponent(params) {
	self = this;
	this.title = params.data.key;
	this.data = params.data.value;
	this.cardGroup = params.cardGroup;
	this.getMore = this.cardGroup.getMore;
	this.pageParam = params.pageParam;
}

objectPanelBodyComponent.prototype.onEnterKeyDown = function (model, event) {
	var pageNumber = Math.abs(~~model.value);
	self.pageParam(pageNumber < +self.data.totalPages ? pageNumber : +self.data.totalPages - 2);
	if (event.keyCode === 13) {
		$('#api-exp-get-btn').trigger('click');
	} else {
		return true;
	}
};

module.exports = ko.components.register('object-panel-body', {
	viewModel:  objectPanelBodyComponent,
	template:`
		<ul data-bind="foreachprop: data">
			<li class="clearfix">
				<!-- ko if: $component.title === 'images' -->
					<img data-bind="attr: {src: url, alt: 'image-' + ratio}" alt="img" class="img img-thumbnail">
				<!-- /ko -->
				
				<b class="key">
					<span data-bind="text: typeof value === 'object' ? key: key + ':'"></span>
				</b>
				
				<!-- ko ifnot: typeof value === 'object' || $component.title === 'page' && key === 'number' -->
					<span data-bind="text: value" class="value"></span>
				<!-- /ko -->
				
				<!-- ko if: $component.title === 'page' && key === 'number'-->
					<div class="form-inline">
						<input id="pagination-input" data-bind="textInput: value, event: {keydown: $component.onEnterKeyDown}" type="text" pattern="[0-9]+" class="form-control">
					</div>
				<!-- /ko -->
				
				<!-- ko if: typeof value === 'object' -->
					<button data-bind="click: $component.getMore.bind($component.cardGroup, value)" type="button" class="btn btn-icon blue-shevron-right pull-right"></button>
				<!-- /ko -->
				
			</li>
		</ul>
`});
