var self;

function ObjectPanelBody(params) {
	self = this;
	this.data = this.data || ko.observable(params.data.value);
	this.config = params.config;
	this._panelName = params.data.key;
	this.cardIndex = this.cardIndex || ko.utils.unwrapObservable(params.index);
	this.panelGroup = params.panelGroup || {};
	this.getMore = this.panelGroup.getMore;
	this.pageParam = params.page && params.page.parameter;
	this.collapseId = params.collapseId;
	this._allInside = !!Object.getProp(ko.unwrap(this.config), '._CONFIG.allInside');
	this.sortByConfig = this.panelGroup.sortByConfig;
}

ObjectPanelBody.prototype.onEnterKeyDown = function (model, event) {
	if (event.keyCode === 13) {
		var value = +event.currentTarget.value;
		value = Number.isNaN(value) ? 0 : value;
		var pageNumber = ~~value < 0 ? 0 : ~~value;
		this.pageParam(pageNumber < ko.unwrap(this.data).totalPages ? pageNumber : ko.unwrap(this.data).totalPages - 1);
		$('#api-exp-get-btn').trigger('click');
	} else {
		return true;
	}
};

ObjectPanelBody.prototype.canBeCopied = function () {
	if (typeof this.value === 'object') return false;
	this.copied = ko.observable(false);
	if (Object.getProp(self.config, '._CONFIG.copyBtn.' + this.key)) {
		return true;
	}

	return false;
};

ObjectPanelBody.prototype.copyValue = function (model, event) {
	var currentField = this;
	self.clipboard = new Clipboard(event.currentTarget);
	self.clipboard.on('success', function onSuccessCopy(e) {
			console.info('Action:', e.action);
			console.info('Text:', e.text);
			console.info('Trigger:', e.trigger);
			currentField.copied(true);
			setTimeout(function () {
				currentField.copied(false);
			}, 500);
			e.clearSelection();
		})
		.on('error', function onErrorCopy(e) {
			console.error('Action:', e.action);
			console.error('Trigger:', e.trigger);
		});
};

ObjectPanelBody.prototype.removeHandler = function () {
	self.clipboard && self.clipboard.destroy();
	delete self.clipboard;
};
ObjectPanelBody.prototype.setActive = function (key, value, model, e) {
	$(e.currentTarget).parents('.slick-slide').find('.item.object').removeClass('active');
	$(e.currentTarget).parent('.item').addClass('active');
	this.getMore.call(this, key, value);
};

module.exports = ko.components.register('object-panel-body', {
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
							<input id="pagination-input" data-bind="event: {keydown: $component.onEnterKeyDown.bind($component)}, attr: {placeholder: value}" type="text" pattern="[0-9]+" class="form-control">
						</div>
					<!-- /ko -->
					
					<!-- ko if: $component.canBeCopied.call($data, '#prop-value-' + key + $index()) -->
						<button data-bind="event: {mouseover: $component.copyValue, mouseout: $component.removeHandler}, css: {'copied': copied}, attr: {'data-clipboard-text': value.toString(), id: 'prop-value-' + key + $index()}, popover: {type: 'tooltip', title: 'Copy value'}" type="button" class="btn btn-icon btn-copy"></button>
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
