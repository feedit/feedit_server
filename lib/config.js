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

var deploy = !!~process.argv.indexOf('--deploy');

var config = {

  // debug mode print verbose log
  debug: false,

  // http server port
  port: deploy ? 80 : 8080,

  // database config
  database: 'mongodb://feedit_mongo/feedit_dev',
};

global.PAGE_SIZE = 20;

module.exports = config;
