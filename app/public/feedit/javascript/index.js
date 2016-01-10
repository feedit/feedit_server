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

+function(undefined) {
  $('body').addClass('fadeIn');
  $('li').delegate('a', 'click', function(e) {
    var target = e.currentTarget;
    var parent = $(target).parent();
    if (parent.hasClass('disabled')) {
      return false;
    }
  });
}();
