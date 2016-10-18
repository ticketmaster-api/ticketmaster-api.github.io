function listCard(params) {
	self = this;
}

module.exports = ko.components.register('listCard', {
	viewModel: listCard,
	template:
		`<section class="panel panel-primary">
			
			<!--panel-heading-->
			<div class="panel-heading" role="tab">
				<div class="panel-title">
					<button class="btn btn-icon" type="button">
						<span class="btn btn-icon shevron white-shevron-up"></span>
						<span class="title" data-bind="text: name">Title</span>
					</button>	
					
					<!-- ko if: quantity in $data-->
						<span data-bind="text: quantity" class="counter"></span>
					<!-- /ko -->
				</div>
			</div><!--panel-heading-->
			
			<!--panel-body-->
			<div class="panel-collapse collapse" role="tabpanel">
				<div class="panel-body">
						<ul data-bind="foreach: items" class="list-group">
							<li class="list-group-item">
								<span data-bind="text: name" class="name truncate">event name</span>
								
								<!--additional-info-->
								<div class="additional-info">
									<p data-bind="text: Object.getProp($data, 'dates.start.localDate')" class="date">event date</p>
									<span data-bind="if: Object.getProp($data, '_embedded.venues[0].name')">
										<p data-bind="text: Object.getProp($data, '_embedded.venues[0].name')" class="venue">event venue</p>
									</span>
								</div><!--additional-info-->
								
								<button type="button" class="btn btn-icon blue-shevron-right"></button>
							</li>
						</ul>
				</div>
			</div><!--panel-body-->
		</section>`
});
