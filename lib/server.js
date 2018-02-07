'use strict';

var koa = require('koa');
var path = require('path');
var serve = require('koa-static');
var router = require('koa-router');
var session = require('koa-session');
var jsonp = require('koa-safe-jsonp');
var koa_logger = require('koa-logger');

var _ = require('./helper');
var pkg = require('../package');
var logger = require('./logger');
var config = require('./config');
var render = require('./render');
var controllers = require('../app/controllers');

exports.init = function() {
  var app = koa();
  var publicPath = path.join(__dirname, '..', 'app', 'public');
  app.use(koa_logger());
  app.keys = ['feedit'];
  app.use(session(app));
  app.use(serve(publicPath));
  jsonp(app, {
    callback: 'callback',
    limit: 50,
  });

  app.use(function *(next) {
    this.set('X-Powered-By', 'feedit_server/' + pkg.version);
    this.logger = logger;
    this.render = render;
    yield next;
  });
  app.use(router(app));

  app.get('/feedit/', controllers.home);
  app.all('/feedit/login', controllers.login);
  app.all('/feedit/logout', controllers.logout);
  app.get('/feedit/api/', controllers.articles);
  app.all('/feedit/export/', controllers.export);

  app.listen(config.port, function() {
    logger.info('server start on ' + _.ipv4 + ':' + config.port);
  });
};
