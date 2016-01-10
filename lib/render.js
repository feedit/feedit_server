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
var nunjucks = require('nunjucks');
var logger = require('./logger');

var viewsPath = path.join(__dirname, '..', 'app', 'views');

logger.debug('render view path: %s', viewsPath);

nunjucks.configure(viewsPath, {
  autoescape: true
});

module.exports = function *(context) {
  var template = context.view + '/index.html';
  logger.debug('render %s', template);
  return nunjucks.render(template, context);
};
