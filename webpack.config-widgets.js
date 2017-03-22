// Modules
var webpack = require('webpack');
var path = require('path');
var childProcess = require('child_process');
var __versionString__ = childProcess.execSync('git rev-list HEAD --count').toString();
__versionString__ = ~~__versionString__ - 5540;
/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var versionsMajor = {
	'countdown': '1.0',
	'event-discovery' :'1.0',
	'calendar' :'1.0',
	'map' :'1.0'
};
/**
 *
 * @param folderName - string, folder for input/output file
 * @returns {*[]} - config file
 */
var configWidget = (folderName)=> {
	return [
		{
			name: "main-widget",
			entry: `./products-and-docs/widgets/${folderName}/1.0.0/src/main-widget.es6`,
			output: {
				filename: `./products-and-docs/widgets/${folderName}/1.0.0/lib/main-widget.js`,
				library: "widgetsLib" // global library of widgets
			},
			devtool: 'cheap-module-source-map',
			module: {
				loaders: [{
					test: /\.es6$/,
					loader: 'babel-loader',
					query: {
						presets: [
							"es2015",
							"stage-0"
						],
						plugins: [],
						cacheDirectory: true
					}
				}]
			},
			plugins: [
				/*new webpack.optimize.UglifyJsPlugin({
					minimize: true,
					sourceMap: true,
					compress: {
						drop_console: true
					},
					mangle: {
						except: ['$', 'exports', 'require']
					}
				}),*/
				new webpack.DefinePlugin({
					ENV: JSON.stringify("main-widget"),
					__VERSION__: JSON.stringify(versionsMajor[folderName] + '.' +__versionString__)
				})
			]
		},
		{
			name: "main-widget-config",
			entry: `./products-and-docs/widgets/${folderName}/1.0.0/src/main-widget-config.es6`,
			output: {
				filename: `./products-and-docs/widgets/${folderName}/1.0.0/lib/main-widget-config.js`
			},
			devtool: 'cheap-module-source-map',
			module: {
				loaders: [{
					test: /\.es6$/,
					loader: 'babel-loader',
					query: {
						presets: [
							"es2015",
							"stage-0"
						],
						plugins: [],
						cacheDirectory: true
					}
				}]
			},
		}
	];
};

switch (ENV) {
	case 'countdown-widget-1.0.0-once' :
		module.exports = configWidget('countdown');
		break;
	case 'countdown-widget-1.0.0' :
		module.exports = configWidget('countdown');
		break;
	case 'event-discovery-widget-1.0.0-once' :
		module.exports = configWidget('event-discovery');
		break;
	case 'event-discovery-widget-1.0.0' :
		module.exports = configWidget('event-discovery');
		break;
	case 'calendar-widget-1.0.0-once' :
		module.exports = configWidget('calendar');
		break;
	case 'calendar-widget-1.0.0' :
		module.exports = configWidget('calendar');
		break;
	case 'map-widget-1.0.0-once' :
		module.exports = configWidget('map');
		break;
	case 'map-widget-1.0.0' :
		module.exports = configWidget('map');
		break;
	default:
		module.exports = ()=> {
			console.info(`Command not found. Available commands: [
				countdown-widget-1.0.0-once or countdown-widget-1.0.0,
				event-discovery-widget-1.0.0-once or event-discovery-widget-1.0.0, 
				calendar-widget-1.0.0-once or calendar-widget-1.0.0-once,
				map-widget-1.0.0-once or map-widget-1.0.0-once
			]`) ;
		};
}
