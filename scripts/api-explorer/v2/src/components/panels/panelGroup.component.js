var self;

class CardGroup {
	constructor(params) {
		self = this;
		this.config = this.constructor.getConfig(params);
		this.data = this.prepareData({params, config: this.config._CONFIG});
		this.groupIndex = params.groupIndex || 0;
		this.sectionIndex = ko.unwrap(params.sectionIndex);
		this.colorClass = params.colorClass;
		this.getMore = params.getMore;
		this.page = this.constructor.getPagingInfo(params, this.data.page);
		this.collapseId = this.constructor.getCollapseId();
		this._hasEventsPanel = false;
	}

	sortByConfig(a, b) {
		if (this.config && this.config[a.key] && this.config[b.key] && this.config[a.key]._CONFIG && this.config[b.key]._CONFIG) {
			var i1 = this.config[a.key]._CONFIG.index;
			var i2 = this.config[b.key]._CONFIG.index;
			return i1 - i2;
		}
		return 0;
	}

	checkIfHasEventsList(key) {
		return self._hasEventsPanel = key === 'events' || self._hasEventsPanel;
	}

	/**
	 * Configures and params for each panel group
	 */
	static getConfig({deepProp = '', config, filter, methodId}) {
		self.deepProp = deepProp;
		// main config
		if (!self.deepProp && !config) {
			// panelGroup index - 0

			// get full config;
			let rawFilter = ko.unwrap(filter);

			// get current method config
			let methodConfig = rawFilter[methodId] || {};

			// method config inherits global config
			methodConfig._CONFIG  = $.extend(true, {}, rawFilter._GLOBAL_CONFIG, methodConfig._CONFIG);

			return methodConfig;
		} else {
			// panelGroup index > 0
			return config || {}
		}
	}

	/**
	 * Data manipulations
	 */
	prepareData({params = {}, config = this.config._CONFIG}) {
		let data = $.extend(true, {}, params.data) || {};
		this.unwrappObjects(data, config);
		this.removeDeprecated(data, config);
		return this.wrappPrimitives({data, _propTitle: params._propTitle});
	}

	/**
	 * Gathers all stand alone props in to one object
	 * @param data {object}
	 * @param _propTitle {string}
	 * @returns {object} revised data
	 */
	wrappPrimitives({data, _propTitle = 'object'}) {
		let newData = {}, val;

		// gathering all primitive props in additional panel
		for (let key in data) {
			if (!data.hasOwnProperty(key)) {continue;}
			val = data[key];

			if (typeof val !== 'object') {
				newData[_propTitle] = newData[_propTitle] || {};
				newData[_propTitle][key] = val;
			} else {
				newData[key] = val;
			}
		}

		return newData
	}

	/**
	 * Unwraps objects
	 */
	removeDeprecated(obj, config = {}) {
		var deprecated = config.deprecated || [];

		deprecated.map(item => {
			if (obj[item]) {
				delete obj[item]
			}
			return item;
		});

		return obj;
	}

	/**
	 * Removes deprecated objects
	 */
	unwrappObjects(obj, config = {}) {
		var unwrapp = config.unwrapp || [];

		unwrapp.map(item => {
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
	}

	/**
	 * Prepares data for paging
	 */
	static getPagingInfo(params, pageObj) {
		let pageParam, size;

		if (pageObj && (params.pageParam || params.params)) { //temporary solution todo: need to be revised and refactored
			size = params.cardSize || pageObj.size;
			pageParam = params.pageParam || params.params.find(item => item.name === 'page');

			return {
				category: params.category,
				method: params.method,
				methodId: params.methodId,
				params: params.params,
				pageParam: pageParam && pageParam.value,
				setParams: params.setParams,
				size: size
			};
		}
		return null;
	}

	/**
	 * Provides id str for panel 'collapse toggle' logic
	 * @param str
	 * @returns {string}
	 */
	static getCollapseId() {
		return `card-panel-body-${self.sectionIndex}${self.groupIndex}`
	}
}

ko.components.register('panel-group', {
	viewModel: CardGroup,
	template:`
		<section data-bind="foreachprop: {data: data, sortFn: sortByConfig.bind($component)}" class="panel-group">
			<!--panel-->
			<panel class="panel-item" data-bind="css: {'has-events-list': $component.checkIfHasEventsList(key)}"
							params="$data: $data,
											$index: $index,
											panelGroup: $component,
											sortByConfig: $component.sortByConfig">
			</panel>
		</section>
`});

module.exports = CardGroup;