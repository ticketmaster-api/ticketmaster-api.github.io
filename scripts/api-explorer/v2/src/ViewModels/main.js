var clamp = require('../../../../vendors/clamp.min');


/**
 * Main file for Api Explrer v2.0
 * For development please use Webpack to bundle all modules
 * It can be made using npm scripts cmd - 'webpack'
 */
// custom bindings
require('../customBindings/index');

// Modules
var base = require('../modules/base');
var apiKey = require('../modules/apikey');
var ajaxService = require('../modules/ajaxService');

var config = require('../modules/configService');

// View Models
var RequestsListViewModel = require('./requestsListViewModel');

// Components
require('../components/index');

/**
 * Main application view-model
 * @param obj {object} global data object
 */
function AppViewModel(obj) {
  self = this;
	this.base = obj || {};
	this.apiKey = apiKey;
	this.config = config;

	var parsedUrl = parseUrl();

  // observables
  this.selectedCategory = ko.observable(parsedUrl.apiCategory || '');
	this.selectedMethodType = ko.observable('ALL');
  this.selectedMethod = ko.observable(parsedUrl.methodId || '');
  this.selectedParams = ko.observableArray([]);
	this.requests = ko.observableArray([]);
	this.onError = ko.observable({});
	this.selectedMethodData = ko.observable(getMethodData());

	// computed
  this.URL = ko.computed(this.getUrl, this);

  this.sendButtonText = ko.pureComputed(function () {
		return ko.unwrap(self.selectedMethodData).method;
	});

	this.sharePath = ko.pureComputed(formDeepLinkingUrl, this);
  this.requestsList = new RequestsListViewModel(this.requests, this.selectedParams, this.sharePath);
	init();
}

function init() {
	self.selectedMethod.subscribe(function (val) {
		this.selectedMethodData(getMethodData({methodId: val}));

	}, self);
}

function getMethodData(params) {
	var category = ko.unwrap(params && params.apiCategory || self.selectedCategory);
	var type = ko.unwrap(params && params.type || self.selectedMethodType || 'ALL');
	var method = ko.unwrap(params && params.methodId || self.selectedMethod);
	return self.base[category] && self.base[category][type] && self.base[category][type][method] || {};
}

/**
 * Send request method
 */
AppViewModel.prototype.onClickSendBtn = function () {
  ajaxService(this.URL(), this.requests, this.onError, self.base);
};

/**
 * Gets raw url data array
 * @returns {*[]}
 */
AppViewModel.prototype.getUrl = function () {
  return [
    ko.unwrap(this.selectedMethodData),
    this.apiKey,
		ko.unwrap(this.selectedParams)
  ];
};

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


function formDeepLinkingUrl() {
	var location = window.location;
	var category = ko.unwrap(self.selectedCategory);
	var method = ko.unwrap(self.selectedMethod);
	var params = ko.unwrap(self.selectedParams);

	var querys = [
		'apiCategory=' + encodeURI(category),
		'methodId='+ encodeURI(method)
	];

	params.map(function (param) {
		var value = ko.unwrap(param.value);
		var defaultValue = ko.unwrap(param.default);
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
			parameters: []
		};

		querys.map(function (e) {
			var a = decodeURI(e).split('=');
			var key = a[0];
			var val = a[1];

			if (key === 'apiCategory' || key === 'methodId') {
				obj[key] = val;
			} else {
				obj.parameters.push({
					name: key,
					value: val
				})
			}
		});

		var methodData = getMethodData(obj);
		var parameters = methodData.parameters;

		obj.parameters.map(function (obj) {
			parameters[obj.name].value = obj.value;
			return obj;
		});
		obj.parameters = parameters;
		return obj;
	}
	return {};
}




/**
 * Activates knockout.js
 */
ko.applyBindings(new AppViewModel(base));

/**
 * exports global variable
 */
module.exports = base;
