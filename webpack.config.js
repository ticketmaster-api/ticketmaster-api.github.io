// Modules
var webpack = require('webpack');
var path = require('path');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

var config = {
		entry: {
			script: [
				'babel-polyfill',
				'./scripts/api-explorer/v2/src/main.es6.js'
			]
		},
		output: {
			path: path.join(__dirname, './scripts/api-explorer/v2/'),
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
			noParse: /jquery[\-.0-9a-z]*/
		},
		plugins: [
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				ko: 'expose-loader?ko!knockout',
				Clipboard: 'expose-loader?Clipboard!clipboard'
			}),
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


if (isProd) {
	config.plugins.push(
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			sourceMap: true,
			compress: {
				drop_console: true
			},
			mangle: {
				except: ['$', 'exports', 'require']
			}
		})
	);
}

module.exports = config;

