var path = require('path');
var webpack = require('webpack');

var config = {
  context: path.join(__dirname, 'client'),
  devtool: 'source-map',
  entry: [
    './main.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    pathPath: '/dist/'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  module: {
    loaders: [
      { test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/ },
      //{ test: /\.scss?$/,
        //loader: 'style!css!sass',
        //include: path.join(__dirname, 'src', 'styles') },
      { test: /\.png$/,
        loader: 'file' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'}
    ]
  }
};

module.exports = config;