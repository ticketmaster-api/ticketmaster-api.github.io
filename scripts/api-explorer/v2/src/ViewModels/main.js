var clamp = require('../../../../vendors/clamp.min');

/**
 * Main file for Api Explrer v2.0
 * For development please use Webpack to bundle all modules
 * It can be made using npm scripts cmd - 'webpack'
 */
// custom bindings
require('../customBindings/foreachProp');
require('../customBindings/blockEllipsis');
// Modules
var base = require('../modules/base');
var apiKey = require('../modules/apikey');
var ajaxService = require('../modules/ajaxService');

var config = require('../modules/configService');
// View Models
var MenuViewModel = require('./menuViewModel');
var ParamsViewModel = require('./paramsViewModel');
var MethodsViewModel = require('./methodsViewModel');
var RequestsListViewModel = require('./requestsListViewModel');
// Components
require('../components/index');

/**
 * Main application view-model
 * @param obj {object} global data object
 */
function AppViewModel(obj) {
  self = this;
  var base = obj || {};
	var parsedUrl = parseUrl();
  this.apiKey = apiKey;
	this.config = config;

  // observables
  this.selectedCategory = ko.observable(parsedUrl.apiCategory || '');
  this.selectedMethod = ko.observable(parsedUrl.methodId || '');
  this.selectedParams = ko.observableArray([]);
	this.requests = ko.observableArray([]);

	// computed
  this.URL = ko.computed(this.getUrl, this);
  this.sendButtonText = ko.pureComputed(this.getMethodName, this);
	this.sharePath = ko.pureComputed(formDeepLinkingUrl, this);
	this.sharePath.subscribe(function (val) {
		console.log(val);
	}, this);
  // sub-models
  this.menu = new MenuViewModel(base, this.selectedCategory);
  this.methods = new MethodsViewModel(base, this.selectedCategory, this.selectedMethod);
  this.params = new ParamsViewModel(base, this.selectedMethod, this.selectedParams);
  this.requestsList = new RequestsListViewModel(this.requests, this.selectedParams, this.sharePath);
}

/**
 * Send request method
 */
AppViewModel.prototype.onClickSendBtn = function () {
  ajaxService(this.URL(), this.requests, base);
};

/**
 * Gets current method name
 * @returns {string}
 */
AppViewModel.prototype.getMethodName = function () {
  return this.selectedMethod().method.toLowerCase();
};

/**
 * Gets raw url data array
 * @returns {*[]}
 */
AppViewModel.prototype.getUrl = function () {
  return [
    this.selectedMethod(),
    this.apiKey,
    this.selectedParams()
  ];
};

/**
 * Gets deep prop
 * @returns {*[]}
 */
Object.getProp = function(o, s) {
	if (typeof o !== 'object' || !s) {
		console.log(o,s);
		return;
	}
	s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
	s = s.replace(/^\./, '');           // strip a leading dot
	var a = s.split('.');
	for (var i = 0, n = a.length; i < n; ++i) {
		var k = a[i];
		if (k in o) {
			o = o[k];
		} else {
			return;
		}
	}
	return o;
};

/**
 * Activates knockout.js
 */
ko.applyBindings(new AppViewModel(base));
/**
 * exports global variable
 */
module.exports = base;

function formDeepLinkingUrl() {
	var location = window.location;
	var category = ko.utils.unwrapObservable(self.selectedCategory);
	var method = ko.utils.unwrapObservable(self.selectedMethod);
	var params = ko.utils.unwrapObservable(self.selectedParams);

	var querys = [
		'apiCategory=' + encodeURI(category),
		'methodId='+ encodeURI(method.id)
	];

	params.map(function (param) {
		var value = ko.utils.unwrapObservable(param.value);
		var defaultValue = ko.utils.unwrapObservable(param.default);
		querys.push([
			param.name,
			'=',
			value !== '' ? value : defaultValue //todo: remove default from here when set up it in source like value by default
		].join(''));
		return param;
	});

	return [
		location.origin,
		location.pathname.replace(/\/$/gmi, ''),
		'?',
		querys.join('&')
	].join('');
}

function parseUrl() {
	var location = window.location.search;
	if (location) {
		var querys = location.replace(/^\?/g, '').split('&');
		var obj = {
			apiCategory: '',
			methodId: '',
			selectedParams: []
		};

		querys.map(function (e) {
			var a = decodeURI(e).split('=');
			var key = a[0];
			var val = a[1];

			if (key === 'apiCategory' || key === 'methodId') {
				obj[key] = val;
			} else {
				obj.selectedParams.push({
					name: key,
					value: val
				})
			}
		});
		return obj;
	}
	return {};
}
