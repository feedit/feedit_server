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

var mongoose = require('mongoose');
var config = require('../../lib/config');

mongoose.connect(config.database, function(error) {
  if (error) {
    console.error('connect to %s error: %s', config.database, error.message);
  }
});

exports.Item = require('./item');
exports.User = require('./user');
