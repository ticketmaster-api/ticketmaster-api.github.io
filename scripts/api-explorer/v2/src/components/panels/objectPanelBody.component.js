var self;

function objectPanelBodyComponent(params) {
	self = this;
	this.data = this.data || ko.observable(params.data.value);
	this.config = params.config;
	this._panelName = params.data.key;
	this.cardIndex = this.cardIndex || ko.utils.unwrapObservable(params.index);
	this.panelGroup = params.panelGroup;
	this.getMore = this.panelGroup.getMore;
	this.pageParam = params.page && params.page.parameter;
}

objectPanelBodyComponent.prototype.onEnterKeyDown = function (model, event) {
	if (event.keyCode === 13) {
		var value = +event.currentTarget.value;
		value = Number.isNaN(value) ? 0 : value;
		var pageNumber = ~~value < 0 ? 0 : ~~value;
		self.pageParam(pageNumber < ko.utils.unwrapObservable(self.data).totalPages ? pageNumber : ko.utils.unwrapObservable(self.data).totalPages - 1);
		$('#api-exp-get-btn').trigger('click');
	} else {
		return true;
	}
};

objectPanelBodyComponent.prototype.canBeCopied = function () {
	if (typeof this.value === 'object') return false;
	this.copied = ko.observable(false);
	if (Object.getProp(self.config, '._CONFIG.copyBtn.' + this.key)) {
		return true;
	}

	return false;
};

objectPanelBodyComponent.prototype.copyValue = function (model, event) {
	var currentField = this;
	self.clipboard = new Clipboard(event.currentTarget);
	self.clipboard.on('success', function onSuccessCopy(e) {
			console.info('Action:', e.action);
			console.info('Text:', e.text);
			console.info('Trigger:', e.trigger);
			currentField.copied(true);
			setTimeout(function () {
				currentField.copied(false);
			}, 2000);
			e.clearSelection();
		})
		.on('error', function onErrorCopy(e) {
			console.error('Action:', e.action);
			console.error('Trigger:', e.trigger);
		});
};

objectPanelBodyComponent.prototype.removeHandler = function () {
	self.clipboard && self.clipboard.destroy();
	delete self.clipboard;
};

module.exports = ko.components.register('object-panel-body', {
	viewModel:  objectPanelBodyComponent,
	template:`
		<section>
		
			<!-- ko if: $component._panelName === 'image' -->
				<img data-bind="attr: {src: ko.utils.unwrapObservable(data).url, alt: 'image-' + ko.utils.unwrapObservable(data).ratio}" alt="img" class="img img-thumbnail">
			<!-- /ko -->
			
			<ul data-bind="foreachprop: data">
				<li class="clearfix">
					<b class="key">
						<span data-bind="text: typeof value === 'object' ? key: key + ':'"></span>
					</b>
					
					<!-- ko ifnot: typeof value === 'object' || $component._panelName === 'page' && key === 'number' -->
						<span data-bind="text: value" class="value"></span>
					<!-- /ko -->
					
					<!-- ko if: $component._panelName === 'page' && key === 'number'-->
						<div class="form-inline">
							<input id="pagination-input" data-bind="event: {keydown: $component.onEnterKeyDown}, attr: {placeholder: value}" type="text" pattern="[0-9]+" class="form-control">
						</div>
					<!-- /ko -->
					
					<!-- ko if: $component.canBeCopied.call($data, '#prop-value-' + key + $index()) -->
						<button data-bind="event: {mouseover: $component.copyValue, mouseout: $component.removeHandler}, css: {'copied': copied}, attr: {'data-clipboard-text': value.toString(), id: 'prop-value-' + key + $index()}" type="button" class="btn btn-icon btn-copy"></button>
					<!-- /ko -->
					
					<!-- ko if: typeof value === 'object' -->
						<button data-bind="click: $component.getMore.bind($component, key, value)" type="button" class="btn btn-icon blue-shevron-right pull-right"></button>
					<!-- /ko -->
				</li>
			</ul>
		</section>
`});
