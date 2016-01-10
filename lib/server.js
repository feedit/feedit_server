/* ================================================================
 * feedit_server by xdf(xudafeng[at]126.com)
 *
 * first created at : Tue Mar 17 2015 00:16:10 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

var path = require('path');
var koa = require('koa');
var koa_logger = require('koa-logger');
var session = require('koa-session');
var router = require('koa-router');
var serve = require('koa-static');
var jsonp = require('koa-safe-jsonp');
var ipv4 = require('ipv4');
var pkg = require('../package');
var logger = require('./logger');
var config = require('./config');
var controllers = require('../app/controllers');
var render = require('./render');

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

  app.listen(config.port, function() {
    logger.info('server start on ' + ipv4 + ':' + config.port);
  });
};
