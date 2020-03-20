const path = require('path');
const package = require('./package.json');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  entry: "./src/assets/js/_tracker/tracker.js",
  devtool: "source-map",
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: `_tracker/v${package.version}/tracker.js`
  // },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: './src/assets/js/_tracker/tracker.js', to: `_tracker/v${package.version}/tracker.js` },
      { from: './src/assets/js/_tracker/tracker.shadow.js', to: `_tracker/v${package.version}/tracker.shadow.js` },
      { from: './src/assets/js/_tracker/tracker.snippet.js', to: `_tracker/v${package.version}/tracker.snippet.js` },
    ]),
  ],
  module: {
    rules: [{
        use: [{
            loader: 'babel-loader'
        }]
    }]
  },
  optimization: {
    // minimize: false
    minimizer: [
      new UglifyJsPlugin({
        cache: false,
        parallel: false,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: false
        },
        sourceMap: true
      })
    ]
  }
};