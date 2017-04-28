class ObjectPanelBody {
	constructor({data = {}, config, index = this.cardIndex, panelGroup = {}, page, collapseId, subjectID}) {
		this.data = this.data || ko.observable(data.value);
		this.config = config;
		this._panelName = data.key;
		this.cardIndex = ko.unwrap(index);
		this.panelGroup = panelGroup;
		this.getMore = panelGroup.getMore;
		this.page = page;
		this.collapseId = collapseId;
		this._allInside = !!Object.getProp(ko.unwrap(config), '._CONFIG.allInside');
		this.sortByConfig = panelGroup.sortByConfig;
		this.subjectID = subjectID;
		this.sendId(this.data);
	}
	
	sendId(data) {
		let id = ko.unwrap(data).id;
		if(id) {
			this.subjectID(id)
		}
	}
	
	changePage = (model, event) => {
		if (event.keyCode === 13) {
			let page = this.page,
				totalPages = ko.unwrap(this.data).totalPages,
				value = +event.currentTarget.value;
			
			value = Number.isNaN(value) ? 0 : value;
			let pageNumber = ~~value < 0 ? 0 : ~~value;
			page.pageParam(pageNumber < totalPages ? pageNumber : totalPages - 1);
			page.setParams({
				category: page.category,
				method: page.method,
				methodId: page.methodId,
				params: page.params
			});
			$('#api-exp-get-btn').trigger('click');
		} else {
			return true;
		}
	};

	canBeCopied(data) {
		return !!Object.getProp(this.config, '._CONFIG.copyBtn.' + data.key) && typeof data.value !== 'object';
	}

	setActive(key, value, model, e){
		$(e.currentTarget)
			.parents('.slick-slide')
			.find('.item.object')
			.removeClass('active');
		$(e.currentTarget)
			.parent('.item')
			.addClass('active');
		this.getMore.call(null, {panel: this, id: key, data: value});
	}
}



ko.components.register('object-panel-body', {
	viewModel:  ObjectPanelBody,
	template:`
		<section data-bind="css: {'all-inside': $component._allInside}" class="panel-body object-panel-body">
			<!-- ko if: $component._panelName === 'object' && !!Object.getProp(ko.unwrap(data), '.ratio')-->
				<img data-bind="attr: {src: ko.utils.unwrapObservable(data).url, alt: 'image-' + ko.utils.unwrapObservable(data).ratio}" alt="img" class="img img-thumbnail">
			<!-- /ko -->
			
			<ul data-bind="foreachprop: {data: data, sortFn: $component.sortByConfig.bind($component)}" class="list object-list">
				<li data-bind="css: {'object': typeof value === 'object', 'primitive': typeof value !== 'object'}" class="clearfix pading item">
				
					<!-- ko ifnot: typeof value === 'object' && $component._allInside -->
					<span data-bind="text: typeof value === 'object' ? key: key + ':'" class="key"></span>
					<!-- /ko -->
					
					<!-- ko ifnot: typeof value === 'object' || $component._panelName === 'page' && key === 'number' -->
						<span data-bind="text: value" class="value"></span>
					<!-- /ko -->
					
					<!-- ko if: $component._panelName === 'page' && key === 'number'-->
						<div class="form-inline">
							<input id="pagination-input" data-bind="event: {keydown: $component.changePage}, attr: {placeholder: value}" type="text" pattern="[0-9]+" class="form-control">
						</div>
					<!-- /ko -->
					
					<!-- ko if: $component.canBeCopied.call($component, $data) -->
						<!-- copy property btn -->
						<button data-bind="copyToClipboard: {text: value.toString()}, attr: {id: 'prop-value-' + key + $index()}, popover: {type: 'tooltip', title: 'Copy value'}" type="button" class="btn btn-icon btn-copy"></button>
					<!-- /ko -->
					
					<!-- ko if: typeof value === 'object' && $component._allInside -->
						<panel params="$data: $data, $index: $index, panelGroup: $component"></panel>
					<!-- /ko -->
					<!-- ko if: typeof value === 'object' && !$component._allInside -->
						<button data-bind="click: $component.setActive.bind($component, key, value)" type="button" class="btn btn-icon blue-shevron-right pull-right"></button>
					<!-- /ko -->
				</li>
			</ul>
		</section>
`});

module.exports = ObjectPanelBody;
