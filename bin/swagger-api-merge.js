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

function readSwaggerFilesAndMergeAndStore(directoryPath, resultFilePath) {
	if (!fs.existsSync(directoryPath)) {
		console.log(`Directory ${directoryPath} non exist`);
		return;
	}

	var resolvedDir = path.resolve(DIR_ROOT, directoryPath);

	var filesPaths = fs.readdirSync(directoryPath)
		.filter(file => /\.json$/.test(file))
		.map(file => path.join(resolvedDir, file))
		.filter(filePath => !fs.statSync(filePath).isDirectory());

	if (!filesPaths.length) {
		console.log(`Directory ${directoryPath} is empty`);
		return;
	}


	var resultJSON = filesPaths.map(filePath => require(filePath)).reduce((prev, current) => {
		if(!prev) return current;
		Object.assign(prev.paths, current.paths);
		Object.assign(prev.definitions, current.definitions);
		return prev;
	});

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
