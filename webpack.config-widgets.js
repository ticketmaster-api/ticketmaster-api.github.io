// Modules
var webpack = require('webpack');
var path = require('path');
var WebpackAutoInject = require('webpack-auto-inject-version');
var VersionFile  = require('webpack-version-file-plugin');
var childProcess = require('child_process');
var __versionString__ = childProcess.execSync('git rev-list HEAD --count').toString();
console.log('__VERSION__' , __versionString__);
console.log(process.env.npm_lifecycle_event);
/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';
var CDW = ENV === 'CDW-webpack-once';


var config = {
		entry: {
			script: [
				'./scripts/api-explorer/v2/src/main.es6.js'
			],
			inFile:['./products-and-docs/widgets/countdown/1.0.0/src']
		},
		output: {
			path: 'products-and-docs/widgets/countdown/1.0.0/lib/test',
			filename: '[name].js',
			library: "base" // global variable
		},
		devtool: isProd ? 'none' : 'inline-source-map',
		module: {
			loaders: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					include: [
						path.resolve(__dirname, "scripts"),
					],
					query: {
						presets: [
							"es2015",
							"stage-0"
						],
						plugins: [],
						cacheDirectory: true
					}
				},
				{
					test: /\.worker\.js$/,
					loader: "worker-loader",
					query: {
						inline: true,
						name: "[name].js"
					}
				},
				{
					test: /\.json/,
					loader: "json-loader"
				},
				{
					test: /\.html$/,
					loader: 'raw'
				}
			],
			noParse: /jquery[\-.0-9a-z]*!/
		},
		plugins: [
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				ko: 'expose-loader?ko!knockout',
				Clipboard: 'expose-loader?Clipboard!clipboard'
			}),
			new WebpackAutoInject()
		],
		resolve: {
			modules: [
				path.resolve(__dirname),
				path.join(__dirname, 'scripts/vendors/'),
				path.join(__dirname, 'node_modules/'),
				path.join(__dirname, 'scripts/components/')
			]
		}
	};




// module.exports = config;

var wwwPath = path.join(__dirname, './products-and-docs/widgets/countdown');

module.exports = [
	{
		name: "main-widget",
		entry: "./products-and-docs/widgets/countdown/1.0.0/src/main-widget.es6",
		output: {
			filename: "./products-and-docs/widgets/countdown/1.0.0/lib/main-widget.js",
			library: "widgetsLib" // global library of widgets
		},
		devtool: 'cheap-module-source-map',
		plugins: [
			new webpack.DefinePlugin({
				ENV: JSON.stringify("main-widget"),
				__VERSION__: JSON.stringify( __versionString__)
			})
		]
	},
	{
		name: "main-widget-config",
		entry: "./products-and-docs/widgets/countdown/1.0.0/src/main-widget-config.es6",
		output: {
			filename: "./products-and-docs/widgets/countdown/1.0.0/lib/main-widget-config.js"
		},
		devtool: 'cheap-module-source-map',
		// plugins: [
		// 	new webpack.DefinePlugin({
		// 		ENV: JSON.stringify("main-widget-config"),
		// 		__VERSION__: JSON.stringify(__versionString__)
		// 	})
		// ]
	}
];

