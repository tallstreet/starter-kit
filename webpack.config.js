var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var argv = require('minimist')(process.argv.slice(2));

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
  entry: DEBUG ? [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, 'app', 'client.js')
  ] : path.resolve(__dirname, 'app', 'client.js'),
  output: {
    path: path.join(__dirname, '/dist/'),
    publicPath: DEBUG ? 'http://localhost:8080/static/' : '/dist/',
    filename: 'app.js',
    hot: true
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
    new ExtractTextPlugin('main.css')
  ],
  module: {
    loaders: [
      {test: /\.jsx?$/, loaders: ['babel'], exclude: /node_modules/},
      
      // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
      // loads bootstrap's css.
      {
        test: /\.css$/,
        loader: cssLoaders,
      },
      {
        test: /\.scss$/,
        loader: scssLoaders,
      },
      {
        test: /\.json$/,
        loader: "json",
      },
      {
        test: /\.png$/,
        loader: "url?limit=100000&mimetype=image/png",
      },
      {
        test: /\.svg$/,
        loader: "url?limit=100000&mimetype=image/svg+xml",
      },
      {
        test: /\.gif$/,
        loader: "url?limit=100000&mimetype=image/gif",
      },
      {
        test: /\.jpg$/,
        loader: "file",
      },
      { test: /\.woff\?.*$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2\?.*$/,   loader: "url?limit=10000&mimetype=application/font-woff2" },
      { test: /\.ttf\?.*$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot/,    loader: "file" },
      { test: /\.svg\??.*$/,    loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  }
};
