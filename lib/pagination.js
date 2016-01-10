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

var RANGE = 3;

function *pagination(page, total) {
  var current = parseInt(page) || 1;
  var data = {
    current: current,
    total: total || 1
  };
  var previous = current - 1;

  if (previous) {
    data.previous = previous;
  }
  var next = current + 1;

  if (next <= total) {
    data.next = next;
  }
  var start = current - RANGE;
  var end = current + RANGE + 1;
  data.start = start > 0 ? start : 1;
  data.end = total + 1 >= end ? end : total + 1;
  return data;
}

module.exports = pagination;
