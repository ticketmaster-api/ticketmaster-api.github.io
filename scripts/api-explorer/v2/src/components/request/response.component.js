class ResponseComponent{
	constructor({data, index, config, setParams, getRandomColor}) {
		this.index = ko.unwrap(index);
		this.data = data;
		this.hasResponse = !!data.response;
		this.resHTML = data.resHTML;
		this.color = data.color;
		this.config = config;
		this.setParams = setParams;
		this.response = data.response;
		this.req = data.req;

		this.breadcrubsArr = [];
		this.breadcrumbs = ko.observable('');

		this.attrs = {
			wrapper: {
				id: `collapse-${this.index}`,
				'aria-labelledby': `heading-${this.index}`,
			},
			tabs: {
				json: {
					href: `#json-${this.index}`,
					'aria-controls': `json-${this.index}`
				},
				blocks: {
					href: `#slider-${this.index}`,
					'aria-controls': `blocks-${this.index}`
				}
			},
			view: {
				json: {
					id: `json-${this.index}`
				},
				blocks: {
					id: `slider-${this.index}`
				}
			}
		};

		ko.postbox.subscribe('ANOTHER_RESPONSE', ({data, panelGroup, color}) => {
			let response = panelGroup.prepareData({params: {data: data.response}});
			this.getMore({
				id: panelGroup.groupIndex,
				data: response,
				pGroup: panelGroup,
				color
			});
		});
	}

	/**
	 * get details
	 */
	getMore = ({panel = {}, id, data, pGroup, color}) => {
		let panelGroup = pGroup || panel.panelGroup;
		let currentSlider = $('#slider-' + panelGroup.sectionIndex);
		let component = $('<section data-bind="component: {name: \'panel-group\', params: params}"></section>');
		let curslick = currentSlider.slick('getSlick');

		// extending additional data (copy)
		let params = $.extend({}, panelGroup, {
			data: data,
			groupIndex: panelGroup.groupIndex + 1,
			_propTitle: typeof id === 'string' && id || 'object',
			config: panel.config,
			colorClass: color
		});		

		// apply component data bindings
		ko.applyBindings({
			params: params
		}, component[0]);

		// build breadcrubs
		this.buildBreadcrumbs({index: panelGroup.groupIndex, parent: panel._panelName, current: id});

		// add slide with selected data
		currentSlider.slick('slickAdd', component);
		// remove outstanding slides
		for (var i = curslick.slideCount - 2; i > panelGroup.groupIndex; i--) {
			currentSlider.slick('slickRemove', i, false);
		}
		// move to next slide
		setTimeout(() => {
			currentSlider.slick('slickNext');
		}, 310);
	};

	buildBreadcrumbs({index, parent, current}) {
		let str = index ? '/' : '';

		if (typeof current === 'number') {
			str += `${parent}[${current}]`
		} else {
			str += `${parent}/${current}`
		}
		this.breadcrubsArr[index] = str;
		this.breadcrubsArr.length = index + 1;

		this.breadcrumbs(this.breadcrubsArr.join(''));
	}
}

ko.components.register('response-component', {
	viewModel: ResponseComponent,
	template:`
		<!-- ko if: hasResponse -->
		<section class="response collapse" data-bind="attr: attrs.wrapper" role="tabpanel">
				<div class="row-container">
				
					<!-- Nav tabs -->
					<ul class="nav nav-tabs tabs-controlls" role="tablist">
						<li role="presentation" class="tab">
							<a data-bind="attr: attrs.tabs.json" class="tab-btn" href="#json" aria-controls="json" role="tab" data-toggle="tab">Json</a>
						</li>
						<li role="presentation" class="tab active">
							<a data-bind="attr: attrs.tabs.blocks" class="tab-btn" href="#blocks" aria-controls="blocks" role="tab" data-toggle="tab">Blocks</a>
						</li>
					</ul>
					
					<ul class="nav nav-tabs info">
						<li class="tab">
							<div class="tab-label">
								<span data-bind="visible: breadcrumbs">Structure:</span>
							</div>
						</li>
						<li class="tab">
							<span data-bind="text: breadcrumbs" class="tab-label breadcrumbs truncate"></span>
						</li>
					</ul>

					<!-- Tab panes -->
					<div class="row">
						<div class="tab-content col-xs-12">
							<!-- json -->
							<div data-bind="scroll: {x: false, y: true}, attr: attrs.view.json" role="tabpanel" class="tab-pane prety-json" id="json">
								<p data-bind="html: resHTML"></p>
							</div>
							<!-- blocks -->
							<div data-bind="attr: attrs.view.blocks" role="tabpanel" class="tab-pane blocks active" id="blocks">
								<panel-group params="
									category: data.category,
									method: data.method,
									methodId: data.methodId,
									params: data.params,
									data: data.response,
									colorClass: data.color,
									sectionIndex: index,
									filter: config,
									setParams: setParams,
									getMore: getMore
									">
								</panel-group>
							</div>
						</div>
					</div>
				</div>
		</section>
		<!-- /ko -->	
`});

module.exports = ResponseComponent;