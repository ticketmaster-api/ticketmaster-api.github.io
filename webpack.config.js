// Modules
var webpack = require('webpack');
var path = require('path');
/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig () {
	"use strict";
	var config = {};

	/**
	 * Entry
	 * Reference: http://webpack.github.io/docs/configuration.html#entry
	 * Should be an empty object if it's generating a test build
	 * Karma will set this when it's a test build
	 */
	config.entry = isTest ? {} : {
		script: [
			'./scripts/api-explorer/v2/src/main.es6.js'
		]
	};

	/**
	 * Output
	 * Reference: http://webpack.github.io/docs/configuration.html#output
	 * Should be an empty object if it's generating a test build
	 * Karma will handle setting it up for you when it's a test build
	 */
	config.output = isTest ? {} : {
		path: './scripts/api-explorer/v2/',
		filename: '[name].js',
		library: "base" // global variable
	};

	/**
	 * Devtool
	 * Reference: http://webpack.github.io/docs/configuration.html#devtool
	 * Type of sourcemap to use per build type
	 */
	if (isTest) {
		config.devtool = 'inline-source-map';
	} else if (!isProd) {
		config.devtool = 'inline-source-map';
	} else {
		config.devtool = 'none';
	}

	/**
	 * Loaders
	 * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
	 * List: http://webpack.github.io/docs/list-of-loaders.html
	 * This handles most of the magic responsible for converting modules
	 */
	config.module = {
		preLoaders: [],
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				include: /scripts/,
				query: {
					presets: ['es2015'],
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
		]
	};

	/**
	 * Plugins
	 * Reference: http://webpack.github.io/docs/configuration.html#plugins
	 * List: http://webpack.github.io/docs/list-of-plugins.html
	 */
	config.plugins = [];

	config.resolve = {
		root: [
			path.join(__dirname, 'scripts/vendors/'),
			path.join(__dirname, 'scripts/components/')
		],
		alias: {
			jquery: 'jquery-1.11.3.min'
		}
	};

	// Skip rendering index.html in test mode
	if (!isTest) {
		var js = 'jquery-1.11.3.min';
		config.plugins.push(
			new webpack.ProvidePlugin({
				$: js,
				jQuery: js,
				"window.jQuery": js
			})
		);
	}

	// Add build specific plugins
	if (isProd) {
		config.plugins.push(
			new webpack.NoErrorsPlugin(),
			new webpack.optimize.DedupePlugin(),
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

	return config;
}();

