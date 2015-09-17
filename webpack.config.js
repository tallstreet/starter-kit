var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var argv = require('minimist')(process.argv.slice(2));
var WebpackMd5Hash = require('webpack-md5-hash');
var fs = require('fs');

var DEBUG = JSON.parse(argv.DEBUG || 'false');
var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(DEBUG),
  __CLIENT__: true
});


function extractForProduction(loaders) {
  return ExtractTextPlugin.extract('style', loaders.substr(loaders.indexOf('!')));
}

var cssLoaders = 'style!css!cssnext!autoprefixer?browsers=last 2 versions';
var scssLoaders = cssLoaders + '!sass';

if (!DEBUG) {
  cssLoaders = extractForProduction(cssLoaders);
  scssLoaders = extractForProduction(scssLoaders);
}
scssLoaders += '?outputStyle=expanded&includePaths[]=' + path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets') +
  '&includePaths[]=' + path.resolve(__dirname, 'node_modules') +
  '&includePaths[]=' + path.resolve(__dirname, 'app/styles')
  ;

module.exports = {
  entry: {
    app: DEBUG ? [
        'webpack-hot-middleware/client',
        path.resolve(__dirname, 'app', 'client.js')
      ] : path.resolve(__dirname, 'app', 'client.js'),
    vendor: [
      'rx',
      'react',
      'react/addons',
      'lodash',
      'classnames',
      'keymirror',
      'whatwg-fetch',
      'es6-promise'
    ]
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    publicPath: DEBUG ? 'http://localhost:8080/static/' : '/dist/',
    filename: DEBUG ? '[name].js' : '[name].[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js'
  },
  externals: {
    'babel-core/browser': 'babel'
  },
  cache: DEBUG,
  debug: DEBUG,
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,

  plugins: DEBUG ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    devFlagPlugin
  ] : [
    new WebpackMd5Hash(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('app.[contenthash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor"
    }),
    function stats() {
      this.plugin('done', function writeStats(stats) {
        fs.writeFileSync('./manifest.json', JSON.stringify(stats.toJson().assetsByChunkName));
      });
    }
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /tests.*_test\.js$/,
        loader: 'mocha-loader!babel-loader'
      },
      {
        test: /node_modules\/(jsdom|node-fetch)/,
        loader: 'null-loader'
      },

      // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
      // loads bootstrap's css.
      {
        test: /\.css$/,
        loader: cssLoaders
      },
      {
        test: /\.scss$/,
        loader: scssLoaders
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.png$/,
        loader: 'url?limit=100000&mimetype=image/png'
      },
      {
        test: /\.svg$/,
        loader: 'url?limit=100000&mimetype=image/svg+xml'
      },
      {
        test: /\.gif$/,
        loader: 'url?limit=100000&mimetype=image/gif'
      },
      {
        test: /\.jpg$/,
        loader: 'file'
      },
      { test: /\.woff\2\?.*$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2\?.*$/, loader: 'url?limit=10000&mimetype=application/font-woff2' },
      { test: /\.ttf\?.*$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot/, loader: 'file' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  }
};
