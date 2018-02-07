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
