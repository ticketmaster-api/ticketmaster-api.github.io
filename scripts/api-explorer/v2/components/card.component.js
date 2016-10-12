function cardComponent(params) {
	self = this;

	this.getMore = params.getMore || false;
	this.color = params.color;
	this.index = params.index;
	var data = params.data || [];

	this.viewModel = ko.observableArray([
		{
			sectionTitle: 'Event',
			isActive: ko.observable(false),
			items: {}
		},
		{
			sectionTitle: 'Price Ranges',
			isActive: ko. observable(false),
			items: {}
		},
		{
			sectionTitle: 'Promoter',
			isActive: ko. observable(false),
			items: {}
		},
		{
			sectionTitle: 'Dates',
			isActive: ko. observable(false),
			items: {}
		},
		{
			sectionTitle: 'Sales',
			isActive: ko. observable(false),
			items: {}
		},
		{
			sectionTitle: 'Images',
			isActive: ko. observable(false),
			items: {}
		},
		{
			sectionTitle: 'Venues',
			isActive: ko. observable(false),
			items: {}
		},
		{
			sectionTitle: 'Attractions',
			isActive: ko. observable(false),
			items: {}
		},
		{
			sectionTitle: 'Classifications',
			isActive: ko. observable(false),
			items: {}
		}
	]);

	for (var prop in data) {
		if (!data.hasOwnProperty(prop)) continue;
		if (typeof data[prop] !== 'object') {
			this.viewModel()[0].items[prop] = data[prop];
		}
	}
  //
	// console.log(this.viewModel());
  //
  //
	// this.viewModel(this.viewModel().map(function (item) {
	// 	return item.isArray = it
	// }));

}


/*
 */

cardComponent.prototype.getStr = function () {
	var args = Array.prototype.slice.call(arguments);
	return args.join('-');
};

cardComponent.prototype.setActive = function () {
	this.isActive(!this.isActive());
};

module.exports = ko.components.register('card', {
	viewModel: cardComponent,
	template:
	`<section data-bind="foreach: viewModel" class="panel-group">
			<section data-bind="css: {active: isActive}" class="panel panel-primary">
			
				<!--panel-heading-->
				<div data-bind="css: $component.color, attr: {id: $component.getStr('heading', $component.index, $index())}"
						class="panel-heading"
						role="tab">
					<div class="panel-title">
						<button class="btn btn-icon"
										data-bind="click: $component.setActive, attr: {'data-target': $component.getStr('#collapse',  $component.index, $index()), 'aria-controls': $component.getStr('collapse',  $component.index, $index())}"
										type="button"
										data-toggle="collapse"
										aria-expanded="true">
							<span data-bind="css: {down: isActive}" class="btn btn-icon shevron white-shevron-up"></span>
							<span class="title" data-bind="text: sectionTitle">Title</span>
						</button>
					</div>
				</div><!--panel-heading-->
				
				<!--panel-body-->
				<div data-bind="attr: {id: $component.getStr('collapse', $component.index, $index()), 'aria-labelledby': $component.getStr('heading',  $component.index, $index())}"
					class="panel-collapse collapse"
					role="tabpanel">
					<div class="panel-body">
					
						<!--primitives-->
						<span data-bind="if: sectionTitle === 'Event'">
							<div data-bind="foreachprop: items" class="clear">
								<p>
									<b class="key">
										<span data-bind="text: key"></span>:&nbsp;
									</b>
									<span data-bind="text: value" class="value"></span>
								</p>
							</div>
						</span>
						
						<!--&lt;!&ndash;object&ndash;&gt;-->
						<!--<span data-bind="if: name === 'Price Ranges"">-->
							<!--&lt;!&ndash;clear&ndash;&gt;-->
							<!--<div data-bind="foreach: items" class="clear">-->
								<!--<p>-->
									<!--<p>$data</p>-->
									<!--&lt;!&ndash;<span data-bind="text: value" class="value"></span>&ndash;&gt;-->
								<!--</p>-->
							<!--</div>-->
						<!--</span>-->
					</div><!--panel-body-->
					
				</div>
			</section>
	</section>`
});
