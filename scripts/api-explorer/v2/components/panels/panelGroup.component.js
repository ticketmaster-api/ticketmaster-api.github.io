var self;

function cardGroupComponent(params) {
	self = this;
	var url = params.url;
	this.filter = require('../../config.json');
	this.cards = this.removeCards(params.cards);
	this.groupIndex = params.groupIndex || 0;
	this.cardIndex = params.cardIndex;
	this.sectionIndex = ko.utils.unwrapObservable(params.sectionIndex);
	this.data = params.data;
	this.colorClass = params.colorClass;
	this.getMore = params.getMore;
	this.reqId = this.reqId || params.reqId;
	this.cardSize = params.cardSize || this.cards.page.size;
	this.pageParam = (params.pageParam || ko.utils.unwrapObservable(url).find(function (item) {
		return item.name === 'page';
	})).value;
	
	this.collapseId = [
		'card-panel-body-',
		this.sectionIndex,
		this.groupIndex
	].join('');
	
	this.isActive = ko.observable(false);
}

cardGroupComponent.prototype.removeCards = function (obj) {
	var deprecated = this.filter.deprecated;
	var unwrapp = this.filter.unwrapp;
	// var currentApi = this.filter[]

	deprecated.map(function (item) {
		if (obj[item]) {
			delete obj[item]
		}
		return item;
	});

	unwrapp.map(function (item) {
		var val = obj[item];
		if (val) {
			var arr = Object.keys(val);
			for (var i = 0; i < arr.length; i++) {
				var prop = arr[i];
				obj[prop] = val[prop];
			}
			delete obj[item];
		}
		return item;
	});

	
	return obj;
};

cardGroupComponent.prototype.setActive = function (vm, e) {
	if (!this.isActive) {
		 return this.isActive = ko.observable(true);
	}
	this.isActive(!this.isActive());
};

cardGroupComponent.prototype.sortByConfig = function sortFunc(a, b) {
	var config = self.filter[self.reqId];
	var o1 = config.find(function (obj) {
		return obj.title === a.key;
	});
	var o2 = config.find(function (obj) {
		return obj.title === b.key;
	});
	return config.indexOf(o1) - config.indexOf(o2);
};

module.exports = ko.components.register('panel-group', {
	viewModel: cardGroupComponent,
	template:`
		<section data-bind="foreachprop: {data: cards, sortFn: sortByConfig}" class="panel-group">
			<section data-bind="css: {[$component.colorClass]: true}" class="panel panel-primary">
				<!--panel-heading-->
				<panel-heading params="data: $data, index: $index, cardSize: $component.cardSize, pageParam: $component.pageParam, collapseId: $component.collapseId"></panel-heading>			
				<!--panel-body-->
				<section data-bind="attr:{'id': $component.collapseId + $index()}" class="panel-collapse collapse">
					<div class="panel-body">
					
						<!-- ko if: (typeof value === 'object' && !$.isArray(value)) -->
							<object-panel-body params="data: $data, cardGroup: $component, pageParam: $component.pageParam"></object-panel-body>
						<!-- /ko -->
						
						<!-- ko if: (typeof value === 'object' && $.isArray(value)) -->
							<array-panel-body params="data: $data, cardGroup: $component"></array-panel-body>
						<!-- /ko -->
					</div>
				</section>
			</section>
	
		</section>
`});
