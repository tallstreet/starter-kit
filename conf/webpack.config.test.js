module.exports = require('./make-webpack-config')({
  devtool: 'eval-source-map',
  lint: false,
  entry: {
    app: './app/client.js'
  }
});
