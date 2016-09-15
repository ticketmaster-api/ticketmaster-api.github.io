var path = require('path');
var webpack = require('webpack');

  console.log(path.resolve(__dirname, 'scripts/api-explorer/v2'));

module.exports = {
  // context: path.resolve(__dirname, 'scripts/api-explorer/v2'),

  entry: {
    script: [
      './scripts/api-explorer/v2/ViewModels/main.js'
    ]
  },

  output: {
    path: './scripts/api-explorer/v2',
    filename: '[name].js'
    // library: "[name]" // global variable
  },

  devtool: 'source-map',

  // module: {}
  //   loaders: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       loader: "babel"
  //     },
  //     {
  //       test: /\.html$/,
  //       exclude: /(node_modules|bower_components)/,
  //       loader: 'raw'
  //     },
  //     {
  //       test: /\.css$/,
  //       exclude: /(node_modules|bower_components)/,
  //       loader: 'style!css'
  //     },
  //     {
  //       test: /\.scss$/,
  //       exclude: /(node_modules|bower_components)/,
  //       loaders: [
  //         'style',
  //         'css',
  //         'sass'
  //       ]
  //     }
  //   ],
  //   noParse: /node_modules\/angular\/angular.js/
  // },

  plugins: [
    new webpack.NoErrorsPlugin() // prevents file creation on errors of compilation
  ]
};