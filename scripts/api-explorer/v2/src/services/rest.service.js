import base from './base.service';
import apikey from './apiKey.service';


const HEADER_ACCEPT_LANGUAGE = 'en-US,en;q=0.8';
/**
 * Rest service
 * Gets data from server
 */
let instance;

class RestService {
	constructor() {
		if (!instance) {
			instance = this;
		}
		this.base = base;
		this.apiKey = apikey;
		this.selectedCategory = ko.observable('').subscribeTo('SELECTED_CATEGORY');
		this.selectedMethodType = ko.observable('').subscribeTo('SELECTED_METHOD_TYPE');
		this.selectedMethod = ko.observable('').subscribeTo('SELECTED_METHOD');
		this.selectedParams = ko.observableArray([]).subscribeTo('SELECTED_PARAMS');
		this.requests = ko.observableArray([]).syncWith('REQUESTS_ARR');
		this.anotherResponse = ko.observable().publishOn('ANOTHER_RESPONSE');
		this.requestInProgress = ko.observable(false);
		this.init();
		return instance;
	}

	init() {
		ko.postbox.subscribe('SELECTED_METHOD', newValue => {
			this.selectedMethodData = this.getMethodData()
		});

		ko.postbox.subscribe('ANOTHER_REQUEST', ({method, panelGroup, color}) => {
			this.anotherRequest = true;
			let url = this.prepareUrl(method.base, method.path, method.parameters);

			this.ajaxService({url, type: method.method, callback: (res, msg) => {
				let category = method.category;
				let type = method.method;
				let methodId = method.id;
				let params = method.parameters;

				let resObj = {
					category,
					method: type,
					methodId,
					params: params.map(obj => $.extend(true, {}, {
						name: obj.name,
						value: ko.observable(ko.unwrap(obj.value)),
						options: obj.options
					})),
					req: this.req,
					index: this.requests().length
				};

				if (msg == 'error') {
					// notifying error modal
					this.error = ko.observable(res).publishOn('REQUEST_ERROR');
				} else {
					this.error && delete this.error;
					resObj.response = res.responseJSON;
				}

				// exporting data using observable
				this.anotherResponse({data: resObj, panelGroup, color})
			}});
		});
	}

	sendRequest(apikeyActive) {
		this.apikeyActive = apikeyActive || ko.unwrap(this.apiKey.value);
		let type = ko.unwrap(this.selectedMethodType);
		this.req = this.prepareUrl();
		this.ajaxService({url: this.req, type, callback: this.callback});
		this.requestInProgress(true);
	}

	/**
	 * Filters and prepares params pairs
	 * @returns {boolean}
	 */
	prepareUrl(_domain, _path, _selectedParams) {
		this.apikeyActive = this.apikeyActive || ko.unwrap(this.apiKey.value);
		let replacement,
			url,
			params,
			selectedParams = ko.unwrap(_selectedParams || this.selectedParams)
				.filter(item =>  item.value() !== 'none' && (item.value() || item.default));

		let domain = _domain || this.selectedMethodData.base;
		let path = _path || this.selectedMethodData.path;

		params = selectedParams.filter(item => item.style === 'query');

		// arr of template marks
		replacement = path.match(/([^{]*?)\w(?=\})/gmi) || [];

		// arr of template params
		var templatesArr = selectedParams.filter(item => item.style === 'template' || item.style === 'path');

		// replacement
		replacement.forEach(val => {
			var param = templatesArr.find(item => item.name === val);
			path = path.replace('{'+ param.name + '}', ko.unwrap(param.value) || param.default);
		});

		// prepares params part of url
		params = params.map(item => [item.name, ko.unwrap(item.value) || item.default].join('=')).join('&');

		url = [domain, '/', path.replace(/^\//,''),  `?apikey=${this.apikeyActive}&`, params].join('');

		return encodeURI(url);
	}

	/**
	 * Ajax Service
	 */
	ajaxService({url, type = 'GET', async = true, dataType = 'json', callback}) {
		let method = this.base[ko.unwrap(this.selectedCategory)][ko.unwrap(this.selectedMethodType)][ko.unwrap(this.selectedMethod)].method;
		let obj = {
			type: method,
			url,
			async,
			dataType,
			complete: callback
		};
		if (method === 'POST') {
			obj.headers = $.extend(true, this.getGeneralHeaders(), this.getHeaders());
			let body = ko.unwrap(ko.unwrap(this.selectedParams).find(param => param.style === 'requestBody').value);
			try {
				obj.data = JSON.parse(body);
			} catch (err) {
				obj.data = {"body": body};
			}
		}
		else {
			obj.headers = this.getGeneralHeaders()
		}
		$.ajax(obj);
	}

	getGeneralHeaders () {
		return {
			'Accept-Language': HEADER_ACCEPT_LANGUAGE
		}
	}

	getHeaders() {
		let headersObj = {};
		ko.unwrap(this.selectedParams).map(param => {
			if (param.style === 'header') {
				headersObj[param.name] = ko.unwrap(param.value);
			}
		});
		return headersObj;
	}

	getMethodData(params = {}) {
		let category = ko.unwrap(params.apiCategory || this.selectedCategory);
		let methodType = ko.unwrap(params.type || this.selectedMethodType || 'ALL');
		let method = ko.unwrap(params.methodId || this.selectedMethod);
		return this.base[category] && this.base[category][methodType] && this.base[category][methodType][method] || {};
	}

	callback = (res, msg) => {
		let category = ko.unwrap(this.selectedCategory);
		let type = ko.unwrap(this.selectedMethodType);
		let methodId = ko.unwrap(this.selectedMethod);
		let params = ko.unwrap(this.selectedParams);

		var resObj = {
			category,
			method: type,
			methodId,
			params: params.map(obj => $.extend(true, {}, {
				name: obj.name,
				value: ko.observable(ko.unwrap(obj.value)),
				options: obj.options
			})),
			req: this.req,
			index: this.requests().length
		};

		if (msg == 'error') {
			// notifying error modal
			this.error = ko.observable(res).publishOn('REQUEST_ERROR');
			// error popover of request
			resObj.error = res;
		} else {
			this.error && delete this.error;
			global.lastResponse = resObj.response = res.responseJSON;
		}

		// exporting data using observable
		this.requests.unshift(resObj);
		this.requestInProgress(false);
	};

	parseUrl = (url) => {
		let location = url ? '?' + url.split('?')[1]: window.location.search;

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

			obj.parameters = obj.parameters.map(obj => {
				return $.extend(true, {}, parameters[obj.name], obj);
			});
			return obj;
		}
		return {};
	};
}

module.exports = new RestService();




