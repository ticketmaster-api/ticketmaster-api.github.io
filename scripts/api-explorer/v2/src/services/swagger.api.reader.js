import countryOptions from './options/country.options';

export function pathToId (path) {
	return path.replace(/(}\/{|\/{|}\/|\/)/g,'.').replace(/}/,'').substring(1);
}

function readParam (data) {
	var param = {
		name: data.name,
		doc: data.description,
		style: data.in,
		required: data.required,
		default: data.required && data.default || '',
		select: false,
		type: data.type
	};

	if(param.name === 'countryCode'){
		param.select = true;
		param.options = countryOptions;
		param.value = 'US';
		param.default = 'US';
	} else if (data.enum && data.enum.length) {
		param.select = true;
		param.options = data.enum.map(value => ({
			name: value,
			checked: param.required && value === param.default || value === 'none',
			link: false
		}));

		if(!param.required) {
			param.options = [
				{
					name: 'none',
					checked: true,
					link: false
				},
				...param.options
			];
		}
	}

	return param;
}

function getMethodsCorrectOrder (meta) {
	if(!meta || !meta.method || !meta.method.length) return;
	return meta.method.map(({ pathsParent }) => pathToId(pathsParent));
}


export default function (apiJSONObject, meta) {
	var result = { ALL: {} };

	for (let path in apiJSONObject.paths) {
		for (let method in apiJSONObject.paths[path]) {
			let data = apiJSONObject.paths[path][method];
			let extraInfo = meta.extraMethodsInfo || {};
			var baseMethodData = extraInfo.paths && extraInfo.paths[path] || {
					link: '/'
				};

			let method = {
				id : pathToId(path), // method id
				name : data.summary,
				method : method.toUpperCase(), // GET or POST
				category : extraInfo.category, // API name
				path: path, // method URL
				base: extraInfo.base,
				description : data.description, // method description
				parameters: data.parameters.map(readParam).reduce((res, param) => ({
					...res,
					[param.name] : param
				}), {}),
				paramsOrder: baseMethodData.paramsOrder || extraInfo.commonParamsOrder
			};

			method = { ...baseMethodData, ...method };
			result.ALL[method.id] = method;

			result[method.method] = result[method.method] || {};
			result[method.method][method.id] = method;
			result.__correctOrder = getMethodsCorrectOrder(meta);
		}
	}
	return result;
}
