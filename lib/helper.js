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

var utils = require('xutil');
var parse = require('co-body');

var _ = Object.assign({}, utils);

_.parse = parse;

module.exports = _;
