const fs = require('fs');
const path = require('path');
const commandLineArgs = require('command-line-args');

const DIR_ROOT = path.resolve(__dirname, '../');

const optionDefinitions = [
	{ name: 'help', alias: 'h', type: Boolean },
	{ name: 'input-directory', alias: 'i', type: String },
	{ name: 'output-file', alias: 'o', type: String }
];

const options = commandLineArgs(optionDefinitions);


function printHelp () {
	const getUsage = require('command-line-usage');

	const sections = [
		{
			header: 'Swagger API Merge',
			content: 'Merge Swagger API [italic]{files} command line tool.'
		},
		{
			header: 'Options',
			optionList: [
				{
					name: 'input-directory',
					alias: 'i',
					typeLabel: '[underline]{directory}',
					description: 'The input directory to process.'
				},
				{
					name: 'output-file',
					alias: 'o',
					typeLabel: '[underline]{file}',
					description: 'Result api json file that will contain info from all files from directory.'
				}
			]
		}
	];
	const usage = getUsage(sections);
	console.log(usage)
}

/**
 * Find common base paths: if base paths will be "/commerce/v2/cart", "/commerce/v2/shopping", "/commerce/v2/checkout"
 * common will be "/commerce/v2"
 * @param {array} filesContentList - json files content
 * @returns {string}
 */
function findCommonBasePath (filesContentList) {
	var pathItems = filesContentList
		.map(data => data.basePath)
		.map(basePath => (basePath || "").split('/').filter(pathItem => !!pathItem));

	var similarSegmentsCount = pathItems
		.reduce((res, curr, idx, list) => {
			if (!idx) return curr.length;
			for(var i = 0; i < curr.length; i++){
				if(list[idx - 1][i] !== curr[i]) break;
			}
			if(typeof res !== 'number' || i < res) return i;
			return res;
		}, null);

	return '/' + pathItems[0].slice(0, similarSegmentsCount).join('/');
}

/**
 * prepare "paths"
 * @param {object} swaggerJsonCfg
 * @returns {{}}
 */
function preparePaths (swaggerJsonCfg) {
	var res = {};
	var basePath = swaggerJsonCfg.basePath;
	for (var key in swaggerJsonCfg.paths) {
		var newPath = key;
		if (key.indexOf(basePath) !== 0) {
			newPath = basePath + key;
		}
		res[newPath] = swaggerJsonCfg.paths[key];
	}
	return res;
}

function readSwaggerFilesAndMergeAndStore(directoryPath, resultFilePath) {
	if (!fs.existsSync(directoryPath)) {
		console.log(`Directory ${directoryPath} non exist`);
		return;
	}

	var resolvedDir = path.resolve(DIR_ROOT, directoryPath);

	// prepare .json files paths list
	var filesPaths = fs.readdirSync(directoryPath)
		.filter(file => /\.json$/.test(file))
		.map(file => path.join(resolvedDir, file))
		.filter(filePath => !fs.statSync(filePath).isDirectory());

	if (!filesPaths.length) {
		console.log(`Directory ${directoryPath} is empty`);
		return;
	}

	// require each file and store files content in array
	var filesContentList = filesPaths.map(filePath => require(filePath));
	var resultJSON = filesContentList
		.reduce((prev, current) => {
			var paths = preparePaths(current);
			if(!prev) return Object.assign({}, current, { paths: paths });
			Object.assign(prev.paths, paths);
			Object.assign(prev.definitions, current.definitions);
			return prev;
		}, null);

	resultJSON.basePath = findCommonBasePath(filesContentList);

	try {
		fs.writeFileSync(path.resolve(DIR_ROOT, resultFilePath), JSON.stringify(resultJSON, null, '  '), 'utf8');
		console.log(`File '${resultFilePath}' was updated successfully`);
	} catch (err) {
		console.error(`Error writing '${resultFilePath}':` + err.message)
	}
}


function main(options) {
	if (options.help || !options['input-directory'] || !options['output-file']) {
		printHelp ();
		return;
	}
	readSwaggerFilesAndMergeAndStore(options['input-directory'], options['output-file'], options['output-file']);
}

main(options);
