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
import * as restSrv from './services/rest.service';

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

class AppViewModel {
	constructor({base = {}, apiKey, config, rest}) {
		this.base = base;
		this.apiKey = apiKey;
		this.apiKeyInputId = '#api-key';
		this.config = config;
		this.restService = rest;
		this.paramsIsHiden = ko.observable(true);

		let parsedUrl = this.parseUrl();
		// observables
		this.selectedCategory = ko.observable(parsedUrl.apiCategory || '').syncWith('SELECTED_CATEGORY');
		this.selectedMethodType = ko.observable('ALL').syncWith('SELECTED_METHOD_TYPE');
		this.selectedMethod = ko.observable(parsedUrl.methodId || '').syncWith('SELECTED_METHOD');
		this.selectedParams = ko.observableArray([]).syncWith('SELECTED_PARAMS');
		this.selectedMethodData = ko.observable(this.getMethodData({}));

		this.initValidation();

		// computed
		this.sendButtonText = ko.pureComputed(() => ko.unwrap(this.selectedMethodData).method);
		this.requestInProgress = this.restService.requestInProgress;
		this.sharePath = ko.pureComputed(() => this.formDeepLinkingUrl());

		this.selectedMethod.subscribe(val => {
			this.paramsIsHiden(true);
			this.validationModel($.extend({}, ko.unwrap(this.apiKeyValidationModel)));
			this.selectedMethodData(this.getMethodData({methodId: val}));
		});
		$(this.apiKeyInputId).val( ko.unwrap(this.apiKey.value)).show();
	}

	/**
	 * Validation watchers and logic
	 */
	initValidation() {
		this.apiKeyValidationModel = ko.observable({});
		this.validationModel = ko.observable({});

		this.sendBtnValidationText = ko.observable('');
		this.formIsValid = ko.observable(true);
		ko.computed(() => {
			let validationModel = ko.validatedObservable($.extend({}, ko.unwrap(this.validationModel), ko.unwrap(this.apiKeyValidationModel)));
			let validationFlag = validationModel.isValid() || !$('.custom-input__field.not-valid').length;
			this.sendBtnValidationText(validationFlag ? '': this.validationText);
			this.formIsValid(validationFlag);
		});
	}

	/**
	 * Send request method
	 */
	onClickSendBtn() {
		let model = ko.validatedObservable($.extend({}, ko.unwrap(this.validationModel), ko.unwrap(this.apiKeyValidationModel)));
		if (model.isValid()) {
			let activeKey =  $(this.apiKeyInputId).val();
			this.restService.sendRequest(activeKey);
		} else {
			this.paramsIsHiden(false); // slide toggle when params are not valid
			this.formIsValid(false);
			this.sendBtnValidationText(this.validationText);
			model.errors.showAllMessages();
		}
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

	//rest service
	getMethodData({apiCategory, type, methodId}) {
		let category = ko.unwrap(apiCategory || this.selectedCategory);
		let methodType = ko.unwrap(type || this.selectedMethodType || 'ALL');
		let method = ko.unwrap(methodId || this.selectedMethod);
		return this.base[category] && this.base[category][methodType] && this.base[category][methodType][method] || {};
	}

	//**********
	parseUrl() {
		let location = window.location.search;

		if (location) {
			var querys = location.replace(/^\?/g, '').split('&');
			var obj = {
				apiCategory: '',
				methodId: '',
				parameters: []
			};

			let globalQueryObj = window.location.query = {};
			querys.map(query => {
				let [key, val] = decodeURI(query).split('=');

				if (Object.keys(obj).indexOf(key) !== -1) {
					try {
						obj[key] = globalQueryObj[key] = JSON.parse(val);
					} catch (exception_var) {
						obj[key] = globalQueryObj[key] = val;
					}
				} else {
					try {
						globalQueryObj[key] = JSON.parse(val);
					} catch (exception_var) {
						globalQueryObj[key] = val;
					}

					obj.parameters.push({
						name: key,
						value: globalQueryObj[key]
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
	};
	//**********
	setParams = ({category, method = 'ALL', methodId, params}) => {
		this.selectedCategory(category);
		this.selectedMethodType(method);
		this.selectedMethod(methodId);
		this.selectedParams.notifySubscribers(params, 'paramsSet');
	}

	get validationText() {
		return 'Please solve form validation issues';
	}
}

let app = new AppViewModel(services);
/**
 * Activates knockout.js
 */
ko.applyBindings(app);

/**
 * exports global variable
 */
module.exports = app;
