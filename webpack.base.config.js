const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, 'src/index.tsx')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.join(__dirname, 'src/index.html') })
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'awesome-typescript-loader' },
      { test: /\.json$/, use: 'json-loader' },
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  }
};