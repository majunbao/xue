const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  module: {
    loaders: [
      { test: /.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?importLoaders=1', 'postcss-loader') }
    ]
  },
  plugins: [
    new ExtractTextPlugin("./bundle.css")
  ]
}