/**
 * Main file for Api Explrer v2.0
 * For development please use Webpack to bundle all modules
 * It can be made using npm scripts cmd - 'webpack'
 */

// custom bindings
import * as modules from './modules';
import * as customBindings from './customBindings';
import * as components from './components';
import * as services from './services';

var RequestsListViewModel = require('./ViewModels/requestsListViewModel');

/**
 * Gets deep prop
 * @returns {*[]}
 */
Object.getProp = function(o, s) {
	if ((typeof o !== 'object' || o == null) && !s) {return;}
	s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
	s = s.replace(/^\./, '');           // strip a leading dot
	var a = s.split('.');
	for (var i = 0, n = a.length; i < n; ++i) {
		var k = a[i];
		if (o && k in o) {
			o = o[k];
		} else {
			return;
		}
	}
	return o;
};

function Component(params) {
	return function(viewModel) {
		ko.components.register(params.name, {
			viewModel: viewModel,
			template: params.template
		})
	}
}


class AppViewModel {
	constructor({base = {}, apiKey, config, rest}) {
		this.base = base;
		this.apiKey = apiKey;
		this.config = config;
		this.rest = rest;

		let parsedUrl = this.parseUrl();

		// observables
		this.selectedCategory = ko.observable(parsedUrl.apiCategory || '');
		this.selectedMethodType = ko.observable('ALL');
		this.selectedMethod = ko.observable(parsedUrl.methodId || '');
		this.selectedParams = ko.observableArray([]);
		this.requests = ko.observableArray([]);
		this.onError = ko.observable({});
		this.selectedMethodData = ko.observable(this.getMethodData({}));

		// computed
		this.URL = ko.computed(() => [
			ko.unwrap(this.selectedMethodData),
			this.apiKey,
			ko.unwrap(this.selectedParams)
		]);

		this.sendButtonText = ko.pureComputed(() => ko.unwrap(this.selectedMethodData).method);

		this.sharePath = ko.pureComputed(() => this.formDeepLinkingUrl());
		this.requestsList = new RequestsListViewModel({
			requests: this.requests,
			selectedParams: this.selectedParams,
			sharePath: this.sharePath,
			setParams: this.setParams.bind(this)
		});
		this.selectedMethod.subscribe(val => this.selectedMethodData(this.getMethodData({methodId: val})));
	}

	/**
	 * Send request method
	 */
	onClickSendBtn() {
		this.rest(this.URL(), this.requests, this.onError, this.base);
	}

	formDeepLinkingUrl() {
		let location = window.location;
		let category = ko.unwrap(this.selectedCategory);
		let method = ko.unwrap(this.selectedMethod);
		let params = ko.unwrap(this.selectedParams);

		let querys = [
			`apiCategory=${encodeURI(category)}`,
			`methodId=${encodeURI(method)}`
		];

		params.map(param => {
			let value = ko.unwrap(param.value);
			let defaultValue = ko.unwrap(param.default);
			querys.push(`${param.name}=${value !== '' ? value : defaultValue}`); //todo: remove default from here when set up it in source like value by default
			return param;
		});

		return `${location.origin}${location.pathname.replace(/\/$/gmi, '')}?${querys.join('&')}`
	}

	getMethodData({apiCategory, type, methodId}) {
		let category = ko.unwrap(apiCategory || this.selectedCategory);
		let methodType = ko.unwrap(type || this.selectedMethodType || 'ALL');
		let method = ko.unwrap(methodId || this.selectedMethod);
		return this.base[category] && this.base[category][methodType] && this.base[category][methodType][method] || {};
	}

	parseUrl() {
		let location = window.location.search;
		if (location) {
			var querys = location.replace(/^\?/g, '').split('&');
			var obj = {
				apiCategory: '',
				methodId: '',
				parameters: []
			};

			querys.map(query => {
				let [key, val] = decodeURI(query).split('=');

				if (key === 'apiCategory' || key === 'methodId') {
					obj[key] = val;
				} else {
					obj.parameters.push({
						name: key,
						value: val
					})
				}
			});

			let methodData = this.getMethodData(obj);
			let parameters = methodData.parameters;

			obj.parameters.map(obj => {
				parameters[obj.name].value = obj.value;
				return obj;
			});
			obj.parameters = parameters;
			return obj;
		}
		return {};
	}

	setParams({category, method = 'ALL', methodId, params}) {
		this.selectedCategory(category);
		this.selectedMethodType(method);
		this.selectedMethod(methodId);
		this.selectedParams.notifySubscribers(params, 'paramsSet');
	}
}

/**
 * Activates knockout.js
 */
ko.applyBindings(new AppViewModel(services));

/**
 * exports global variable
 */
module.exports = services.base;
