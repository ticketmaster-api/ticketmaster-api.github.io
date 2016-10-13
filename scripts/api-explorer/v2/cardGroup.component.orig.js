function cardGroupComponent(params) {
	self = this;
	this.url = params.url;
	this.panelType = params.panelType || 'clear'; // list,
	this.getMore = params.getMore || false;
	this.color = params.color;
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

cardGroupComponent.prototype.setActive = function () {
	this.isActive(!this.isActive());
};

cardGroupComponent.prototype.getPrevPage = function () {
	var pageParam = self.url().find(function (item) {
		return item.name === 'page';
	});
	var val = +pageParam.value();
	pageParam.value(val > 0? val - 1: 0);
	$('#api-exp-get-btn').trigger('click');
};

cardGroupComponent.prototype.getNextPage = function (vm, event) {
	var pageParam = self.url().find(function (item) {
		return item.name === 'page';
	});
	var val = +pageParam.value();
	pageParam.value(val < this.items.totalPages - 1 ? val  + 1: val);
	$('#api-exp-get-btn').trigger('click');
};

module.exports = ko.components.register('cardGroup', {
	viewModel: cardGroupComponent,
	template:
	`<section data-bind="foreach: sections" class="panel-group">
			<section data-bind="css: {active: isActive}" class="panel panel-primary">
			
				<!--panel-heading-->
				<div data-bind="css: $component.color, attr: {id: $component.getStr('heading', $index)}"
						class="panel-heading"
						role="tab">
					<div class="panel-title">
						<button class="btn btn-icon"
										data-bind="click: $component.setActive, attr: {'data-target': $component.getStr('#collapse', $index), 'aria-controls': $component.getStr('collapse', $index)}"
										type="button"
										data-toggle="collapse"
										aria-expanded="true">
							<span data-bind="css: {down: isActive}" class="btn btn-icon shevron white-shevron-up"></span>
							<span class="title" data-bind="text: name">Title</span>
						</button>	
									
						<span data-bind="if: panelType === 'list-group'">						
							<span data-bind="text: totalElements" class="counter"></span>
						</span>
						
						<!--pager-->
						<span data-bind="if: name === 'Page'" >
							<span class="navigation-wrapper">
								<button data-bind="click: $component.getPrevPage, enable: !!+items.number" type="button" class="navigation prev"></button>
								<button  data-bind="click: $component.getNextPage, enable: +items.number < +items.totalPages - 1" type="button" class="navigation next"></button>
							</span>
						</span>
					</div>
				</div><!--panel-heading-->
				
				<!--panel-body-->
				<div data-bind="attr: {id: $component.getStr('collapse', $index), 'aria-labelledby': $component.getStr('heading', $index)}"
					class="panel-collapse collapse"
					role="tabpanel">
					<div class="panel-body">
					  
						<!--list-group-->
						<div data-bind="if: panelType && panelType === 'list-group'">
							<ul data-bind="foreach: items" class="list-group">
								<li class="list-group-item">
									<span data-bind="text: name" class="name truncate">event name</span>
									<div class="additional-info">
										<p data-bind="text: Object.getProp($data, 'dates.start.localDate')" class="date">event date</p>
										<span data-bind="if: Object.getProp($data, '_embedded.venues[0].name')">
											<p data-bind="text: Object.getProp($data, '_embedded.venues[0].name')" class="venue">event venue</p>
										</span>
									</div>
									<button data-bind="click: $component.getMore.bind($component, $data)" type="button" class="btn btn-icon blue-shevron-right"></button>
								</li>
							</ul>
						</div>
						
						<!--clear-->
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
					</div><!--panel-body-->
					
				</div>
			</section>
	</section>`
});
