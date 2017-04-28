import countryOptions from './options/country.options';

import readSwaggerJSON from './swagger.api.reader';

import apiSourcesConfig from '../../api.sources';
import apiSourcesConfigInternal from '../../api.sources-internal';

import { isInternalUser } from './user.service';

var CONFIG_URL = '../../scripts/api-explorer/apidescription.xml';


var parseData = function (xml) {
	var global = {};
	//get all APIs
	var resourcesEl = $(xml).find("resources").eq(0);

	// resource
	$(xml)
		.find("resource")
		.get()
		.map(function (res) {
			var resource = $(res);
			// method --------------------------------
			var methodElem = resource.find("method").eq(0);

			var method = {
				id : methodElem.attr("id"), // method id
				name : methodElem.attr("apigee:displayName") || methodElem.attr("id"), // method name
				method : methodElem.attr('name'), // GET or POST
				category : methodElem.find('[primary="true"]').text().trim(), // API name
				path: resource.attr('path'), // method URL
				base : resourcesEl.attr('base'), // method base link
				link : methodElem.find('doc').eq(0).attr('apigee:url'), // link to documentation
				description : methodElem.find('doc').eq(0).text().trim(), //method description
				parameters: {}
			};

			// params --------------------------------
			resource
				.find('param')
				.get()
				.map(function (par) {
					var param = $(par);
					var options = param.find('option');
					var isSelect = !!options.length;

					var parameter = {
						name: param.attr('name'),
						doc: param.find('doc').first().text().trim(),
						style: param.attr('style'),
						required: param.attr('required') === 'true',
						default: param.attr('default') === 'none' && isSelect ? '' : param.attr('default'),
						select: isSelect,
						type: param.attr('type').replace('xsd:', '')
					};

					if (isSelect) {
						parameter.options = options.get().map(function (option) {
							return {
								name: $(option).attr('value'),
								checked: $(option).attr('value') === parameter.default || $(option).attr('value') === 'none',
								link: false
							};
						});
					}

					if(parameter.name === 'countryCode'){
						parameter.select = true;
						parameter.options = countryOptions;
					}

					method.parameters[parameter.name] = parameter;
				});

			if (method.method === 'POST') {
				method.parameters.requestBody = {
					name: 'Post JSON',
					doc: 'Request JSON body',
					style: 'requestBody',
					required: false,
					default: '',
					select: false,
					type: 'string'
				}
			}

			/**
			 * Global obj composition
       */
			// set category obj
			global[method.category] = global[method.category] || {};

			// set methods type obj
			global[method.category].ALL = global[method.category].ALL || {};
			global[method.category][method.method] = global[method.category][method.method] || {};

			// set method obj
			global[method.category].ALL[method.id] = global[method.category][method.method][method.id] = method;

		});

	return global;
};

/**
 * Getting API Configuration depend on user role
 * @returns {object}
 */
function getSwaggerSourcesConfig() {
	return isInternalUser() ? apiSourcesConfigInternal : apiSourcesConfig;
}

//gets document from WADL configuration file
var readFromWADL = function (url) {
  return $.ajax({
    url: url,
    async : false,
    dataType: "text"
  }).then(resp => parseData($.parseXML(resp)));
};

function readApiDataFromAPISources (sources) {
  var result = {};
  for (var cat in sources) {
    let { api, meta } = sources[cat];
    result[cat] = readSwaggerJSON(api, meta || {});
  }
  return result;
}

function getBaseData(){
	var base = {};

	var apiSourcesBase = readApiDataFromAPISources(getSwaggerSourcesConfig());
	Object.assign(base, apiSourcesBase);

	readFromWADL(CONFIG_URL).then(data => Object.assign(base, data, apiSourcesBase))
	.fail(error => alert('Data Could Not Be Loaded - ' + error));

	return base;
}

module.exports = getBaseData();
