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
  var templateElem = $('#template').html();
  var tpl = grace.compile(templateElem);
  var isLogin = $('#isLogin').val();
  var getApi = '/feedit/api?type=get';
  var updateApi = '/feedit/api?type=update&read=true';


  function qs(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);

    if(r !== null) {
      return unescape(r[2]);
    }
    return null;
  }

  if (isLogin) {
    var page = $('#current_page').val();
  } else {
    getApi += '&unread=true';
  }

  var data = {
    page: page
  };

  var search = qs('search');

  if (search) {
    data.search = search;
  }

  $.ajax({
    dataType: 'jsonp',
    url: getApi,
    data: data,
    success: function(d) {
      if (d.success) {
        var data = JSON.parse(d.data);
        $('#content').html(data.length ? tpl({
          list: data
        }) : 'no aritcles');
      } else {
      }
    }
  });
  $('body').delegate('.item', 'click', function() {
    var target = $(this);
    var id = target.data('id');
    var url = target.data('url');
    var read = target.hasClass('true');

    if (isLogin && !read) {
      $.ajax({
        dataType: 'jsonp',
        url: updateApi,
        data: {
          id: id
        },
        success: function(d) {
          if (!d.success) {
            console.log(d.errorMsg);
          }
          target.removeClass('false');
          window.open(url, '_blank');
        }
      });
    } else {
      target.removeClass('false');
      window.open(url, '_blank');
    }
    return false;
  });
}();
