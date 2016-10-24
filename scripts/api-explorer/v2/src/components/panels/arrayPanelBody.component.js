var self;

function ArrayPanelBody(params) {
	self = this;
	this.data = params.data.value;
	this.config = params.config;
	this._panelName = params.data.key;
	this.cardIndex = this.cardIndex || ko.utils.unwrapObservable(params.index);
	this.panelGroup = params.panelGroup;
	this.getMore = this.panelGroup.getMore;
}

ArrayPanelBody.prototype.getStartData = function ($data) {
	return Object.getProp($data, 'dates.start.localDate') || ''
};
ArrayPanelBody.prototype.getVenueName = function ($data) {
	return Object.getProp($data, '_embedded.venues[0].name') || ''
};


module.exports = ko.components.register('array-panel-body', {
	viewModel: ArrayPanelBody,
	template:`
		<section class="panel-body no-padding">
			<ul data-bind="foreach: data" class="list-group">
				<li class="list-group-item">
				
					<!-- ko if: $component._panelName === 'images' -->
						<img data-bind="attr: {src: url, alt: 'image-' + ratio}" alt="img" class="img">
					<!-- /ko -->
					
					<!-- ko ifnot: $component._panelName === 'images' -->
						<span data-bind="text: name || '#' + $index()" class="name">event name</span>
						
						<!-- ko if: $component._panelName === 'events' -->
							<div class="additional-info">
								<p data-bind="text: $component.getStartData($data)" class="date">event date</p>
								<!-- ko if: $component.getVenueName($data)-->
									<p data-bind="text: $component.getVenueName($data)" class="venue truncate">event venue</p>
								<!--/ko-->
							</div>
						<!-- /ko -->
						
					<!-- /ko -->
					
					<!-- ko if: typeof $data === 'object' -->
						<button data-bind="click: $component.getMore.bind($component, $index())" type="button" class="btn btn-icon blue-shevron-right pull-right"></button>
					<!-- /ko -->
					
				</li>
			</ul>
		</section>
`});
