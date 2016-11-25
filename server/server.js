var express = require('express');
var app = express();

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

// port setup
app.set('port', process.env.PORT || 3000);

if (process.env.NODE_ENV !== 'production') {
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var config = require('../webpack.dev.config.js');
  var compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
}

app.listen(app.get('port'));
module.exports = app;