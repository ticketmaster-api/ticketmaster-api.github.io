var path = require('path');
var webpack = require('webpack');


module.exports = {
  entry: {
    script: [
      './scripts/api-explorer/v2/ViewModels/main.js'
    ]
  },

  output: {
    path: './scripts/api-explorer/v2',
    filename: '[name].js',
    library: "base" // global variable
  },
	module: {
		loaders: [
			{ test: /\.worker\.js$/,loader: "worker-loader?inline&output.filename=[name].js" }
		]
	},
  devtool: 'inline-source-map',
  plugins: [
    new webpack.NoErrorsPlugin()
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
  ]
};
