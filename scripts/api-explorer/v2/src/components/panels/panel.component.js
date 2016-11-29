class Panel {
	constructor({$data = {}, panelGroup = {}, $index}) {
		this.$data = $data;
		this.key = $data.key;
		this.$index = ko.unwrap($index);
		this.panelGroup = panelGroup;
		this.page = panelGroup.page;
		this.colorClass = panelGroup.colorClass || '';
		this.config = this.constructor.panelConfig({config: panelGroup.config, key: this.key});
		this.isExpanded = this.constructor.isExpanded(this.config);
		this.collapseId = panelGroup.collapseId + this.$index;
		this.isActive = ko.observable(this.isExpanded);
		this.subjectID = ko.observable('');
	}

	setActive(model, event) {
		this.isActive(!this.isActive());
	}

	/**
	 * Gets config for each panel
	 * @param config
	 * @param key
	 * @returns {*|{}}
	 */
	static panelConfig({config, key}) {
		let subConfig = config[key] || {};

		subConfig._CONFIG = $.extend(true, {}, config._CONFIG, subConfig._CONFIG);
		return subConfig;
	}

	/**
	 * Checks for 'expanded' config for each panel
	 * @param config
	 * @returns {boolean}
	 */
	static isExpanded(config) {
		return !(Object.getProp(config, '._CONFIG.collapsed') || false);
	}
}

module.exports = ko.components.register('panel', {
	viewModel: Panel,
	template:`
		<section data-bind="css: {[colorClass]: true, active: isActive}" class="panel panel-primary">
			<!--panel-heading-->
			<panel-heading params="panelGroup: panelGroup, config: config, data: $data, index: $index, page: page, setActive: setActive.bind($component), collapseId: collapseId, colorClass: colorClass, isExpanded: isExpanded, subjectID:subjectID"></panel-heading>
			
			<!--panel-body-->
			<section data-bind="attr: {'id': collapseId}, css: {'in': isExpanded}" class="panel-collapse collapse">				
				<!-- ko if: (typeof $data.value === 'object' && !$.isArray($data.value)) -->
					<object-panel-body params="config: config, data: $data, index: $index, panelGroup: panelGroup, page: page, collapseId: collapseId, subjectID: subjectID"></object-panel-body>
				<!-- /ko -->
				<!-- ko if: (typeof $data.value === 'object' && $.isArray($data.value)) -->
					<array-panel-body params="config: config, data: $data, index: $index, panelGroup: panelGroup"></array-panel-body>
				<!-- /ko -->
			</section>
		</section>
`});
