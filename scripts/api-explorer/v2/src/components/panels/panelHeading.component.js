import {colorsService} from '../../services';

class PanelHeading {
	constructor({config = {}, data = {}, showMapPopup = null, setActive, isExpanded, page, collapseId, colorClass, panelGroup, subjectID}) {
		this.config = config._CONFIG;
		this.setActive = setActive;
		this.isExpanded = isExpanded;
		this._panelName = data.key;
		this.title = this.config && this.config.title || this._panelName;
		this.data = data.value;
		this.collapseId = collapseId;
		this.page = page;
		this.panelGroup = panelGroup;
		this.subjectId = subjectID;
		this.showMapPopup = showMapPopup;
		this.init({page, colorClass});
	}

	init({page, colorClass}) {
		if (page) {
			this.cardSize = page.size;
		}
		if (this.config.request) {
			this.anotherRequestColor = colorsService.getRandomColor(colorClass);
		}
	}

	followRequest(value) {
		let url = Object.getProp(value, '.config.request');
		if (url) {
			let method = {};
			url = url.split(new RegExp('https://app.ticketmaster.com/'))[1];
			PanelHeading.getDeepProp(url, base, method);
			method = method.object;

			method.parameters = Object.keys(method.parameters).map(key => {
				let param = method.parameters[key];
				if (param.name === 'id') {
					param.value = ko.unwrap(this.subjectId);
				} else if (param.name === 'format') {
					param.value = 'json'
				}
				return param;
			});


			this.anotherRequest = ko.observable({url, method, panelGroup: this.panelGroup, color: this.anotherRequestColor}).publishOn('ANOTHER_REQUEST');
		}
	}

	get hasAnotherRequest() {
		return !!this.config.request;
	}

	static getDeepProp(val, obj, result) {
		if (typeof obj !== 'object') return;

		for (let prop in obj) {
			if (obj.hasOwnProperty(prop) && typeof obj[prop] === 'object' && !result.length) {
				if (obj[prop].path === val) {
					result.object = obj[prop];
					break;
				} else {
					PanelHeading.getDeepProp(val, obj[prop], result);
				}
			}
		}
	}
}


ko.components.register('panel-heading', {
	viewModel:  PanelHeading,
	template:`
		<section class="panel-heading">
			<div class="panel-title">
				
				<a data-bind="click: setActive, attr: {href: '#' + collapseId, 'aria-controls': collapseId, 'aria-expanded': isExpanded}" class="btn btn-icon btn-title" type="button" data-toggle="collapse" aria-expanded="false">
					<span class="btn btn-icon shevron white-shevron-up"></span>
					<p data-bind="text: title" class="title">Panel title</p>
				</a>
				
				<!-- ko if: _panelName === 'events'-->
					<span data-bind="text: cardSize" class="counter"></span>
				<!-- /ko-->
				
				<!-- ko if: _panelName === 'page'-->
					<pagination params="number: data.number, totalPages: data.totalPages, page: page"></pagination>
				<!-- /ko-->
				
				<!-- ko if: hasAnotherRequest -->
				<section class="follow-request">
					<span data-bind="css: anotherRequestColor" class="color-indicator"></span>
					<button data-bind="click: followRequest" class="btn btn-request" type="button">another request</button>
				</section>
				<!-- /ko-->
				
				<!-- ko if: _panelName === 'location' -->
				<section class="follow-request">
					<button class="api-map-btn" data-bind="click: showMapPopup"></button>
				</section>
				<!-- /ko-->
			</div>
		</section>
`});

module.exports = PanelHeading;