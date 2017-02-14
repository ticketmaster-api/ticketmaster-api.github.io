// Modules
var webpack = require('webpack');
var path = require('path');
var WebpackJasmineHtmlRunnerPlugin = require('webpack-jasmine-html-runner-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';
var config;

if (isTest) {
	config = {
		entry: path.resolve(__dirname, './spec/tests.js'),
		output: {
			path: path.resolve(__dirname, "spec"),
			filename: "bundle.spec.js"
		},
		externals: {
			"jquery": "jQuery",
			'knockout': "ko",
			'clipboard': 'Clipboard'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: [
						path.resolve(__dirname, "node_modules"),
					],
					options: {
						presets: [
							"es2015",
							"stage-0"
						],
						plugins: [
							'transform-runtime'
						],
						cacheDirectory: true
					}
				}
			],
			noParse: /jquery[\-.0-9a-z]*/
		},
		plugins: [
			new webpack.SourceMapDevToolPlugin({
				filename: 'bundle.spec.js.map'
			}),
			new WebpackJasmineHtmlRunnerPlugin({
				fixupScripts: []
			})
		],
		cache: false,
		watch: (ENV === 'test-watch'),
		watchOptions: {
			hotOnly: true,
			compress: true,
			aggregateTimeout: 200,
			poll: 100
		},
		devServer: {
			contentBase: path.resolve(__dirname, 'spec'),
			host: 'localhost',
			port: 8080
		}
	};
} else {
	config = {
		entry: {
			script: [
				'./scripts/api-explorer/v2/src/main.es6.js'
			]
		},
		output: {
			path: './scripts/api-explorer/v2/',
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
				"window.jQuery": 'jquery',
				'window.ko': 'knockout',
				ko: 'knockout',
			})
		],
		resolve: {
			modules: [
				path.join(__dirname, 'scripts/vendors/'),
				path.join(__dirname, 'node_modules/'),
				path.join(__dirname, 'scripts/components/')
			],
			alias: {
				jquery: 'jquery-1.11.3.min',
				ko: 'knockout'
			}
		}
	}
}

if (isProd) {
	config.plugins.push(
		new webpack.NoErrorsPlugin(),
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

