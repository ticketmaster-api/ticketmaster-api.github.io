var self;

class ArrayPanelBody {
	constructor(params) {
		self = this;
		this.data = params.data.value;
		this.config = params.config;
		this._panelName = params.data.key;
		this.cardIndex = this.cardIndex || ko.utils.unwrapObservable(params.index);
		this.panelGroup = params.panelGroup;
		this.getMore = this.panelGroup.getMore;
	}

	getStartData($data) {
		return Object.getProp($data, 'dates.start.localDate') || ''
	}
	getVenueName($data) {
		return Object.getProp($data, '_embedded.venues[0].name') || ''
	}
	setActive($index, model, e) {
		$(e.currentTarget)
			.parents('.slick-slide')
			.find('.item.object')
			.removeClass('active');
		$(e.currentTarget)
			.parent('.item')
			.addClass('active');
		this.getMore.call(null, {panel: this, id: $index, data: model});
	}
}

ko.components.register('array-panel-body', {
	viewModel: ArrayPanelBody,
	template:`
		<section class="panel-body array-panel-body">
			<ul data-bind="foreach: data, css: {'events': $component._panelName === 'events'}" class="list list-group">
				<li data-bind="css: {'object': typeof $data === 'object'}" class="list-group-item item">
				
					<!-- ko if: $component._panelName === 'images' -->
						<img data-bind="attr: {src: url, alt: 'image-' + ratio}" alt="img" class="img">
						<div class="img-info">
							<span class="img-ratio">Ratio: <i data-bind="text: ratio"></i></span>
							<span class="img-size">(<i data-bind="text: height"></i> x <i data-bind="text: width"></i>)</span>
						</div>
					<!-- /ko -->
					
					<!-- ko ifnot: $component._panelName === 'images' -->
						<div class="vertical-align-center">
							<div class="name-wrapper">
								<span data-bind="text: name || '#' + $index(), blockEllipsis: {clamp: 2}" class="name"></span>
							</div>
						</div>
						
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
						<button data-bind="click: $component.setActive.bind($component, $index())" type="button" class="btn btn-icon blue-shevron-right pull-right"></button>
					<!-- /ko -->
					
				</li>
			</ul>
		</section>
`});

module.exports = ArrayPanelBody;
