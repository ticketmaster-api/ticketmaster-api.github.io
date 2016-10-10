function cardGroupComponent(params) {
	self = this;
	this.panelType = params.panelType || 'clear'; // list,
	this.getMore = params.getMore || false;
	this.panelColor = params.color;
	this.index = params.index;
	this.sections = ko.observable(params.data || []);
}

cardGroupComponent.prototype.getStr = function (s, i) {
	var str = s;
	var i0 = this.index;
	var i1 = i ? i() : '';
	return [
		str,
		i0,
		i1
	].join('');
};

cardGroupComponent.prototype.setActive = function (vm, event) {
	this.isActive(!this.isActive());
};

module.exports = ko.components.register('cardGroup', {
	viewModel: cardGroupComponent,
	template:
	`<section data-bind="foreach: sections" class="panel-group">
			<section data-bind="css: {active: isActive}" class="panel panel-primary">
				<div data-bind="css: $parent.panelColor, attr: {id: $parent.getStr('heading', $index)}"
						class="panel-heading"
						role="tab">
					<div class="panel-title">
						<button class="btn btn-icon"
										data-bind="click: $parent.setActive, attr: {'data-target': $parent.getStr('#collapse', $index), 'aria-controls': $parent.getStr('collapse', $index)}"
										type="button"
										data-toggle="collapse"
										aria-expanded="true">
							<span data-bind="css: {down: isActive}" class="btn btn-icon shevron white-shevron-up"></span>
							<span class="title" data-bind="text: name">Title</span>
						</button>				
						<span data-bind="if: panelType === 'list-group'">						
							<span data-bind="text: totalElements" class="counter"></span>
						</span>
					</div>
				</div>
				
				<div data-bind="attr: {id: $parent.getStr('collapse', $index), 'aria-labelledby': $parent.getStr('heading', $index)}"
					class="panel-collapse collapse"
					role="tabpanel">
					<div class="panel-body"> 
						<div data-bind="if: panelType && panelType === 'list-group'">
							<ul data-bind="foreach: items" class="list-group">
								<li class="list-group-item">
									<span data-bind="text: name" class="name">event name</span>
									<div class="additional-info">
										<p data-bind="text: Object.getProp($data, 'dates.start.localDate')" class="date">event date</p>
										<span data-bind="if: Object.getProp($data, '_embedded.venues[0].name')">
											<p data-bind="text: Object.getProp($data, '_embedded.venues[0].name')" class="venue">event venue</p>
										</span>
									</div>
									<button data-bind="click: $component.getMore" type="button" class="btn btn-icon blue-shevron-right"></button>
								</li>
							</ul>
						</div>
						<div data-bind="if: panelType === 'clear'">
							<div data-bind="foreachprop: items" class="clear">
								<p>
									<b class="key">
										<span data-bind="text: key"></span>:&nbsp;
									</b>
									<span data-bind="text: value" class="value"></span>
								</p>
							</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</section>`
});
