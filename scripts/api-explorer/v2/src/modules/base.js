var base = {};
var CONFIG_URL = '../../apidescription.xml';

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
						doc: param.first('doc').text().trim(),
						style: param.attr('style'),
						required: param.attr('required'),
						default: param.attr('default') === 'none' && isSelect ? '' : param.attr('default'),
						select: isSelect
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

					method.parameters[parameter.name] = parameter;
				});

			/**
			 * Global obj composition
       */
			// set category obj
			global[method.category] = global[method.category] || {};

			// set methods type obj
			global[method.category].ALL = global[method.category].ALL || {};
			global[method.category][method.method] = global[method.category][method.method] || {};

			// set method obj
			global[method.category].ALL[method.id] = method;
			global[method.category][method.method][method.id] = method;
		});

	return global;
};

//gets document from WADL configuration file
var readFromWADL = function () {
  $.ajax({
    url: CONFIG_URL,
    async : false,
    dataType: ($.browser.msie) ? "text" : "xml",
    success : function(response){
      var xml;

      if (typeof response == "string"){
        xml = new ActiveXObject("Microsoft.XMLDOM");
        xml.async = false;
        xml.loadXML(response);
      } else {
        xml = response;
      }

			base = parseData(xml);
    },

    error: function(XMLHttpRequest, textStatus, errorThrown){
      alert('Data Could Not Be Loaded - '+ textStatus);
    }
  });
};
readFromWADL();
module.exports = base;
