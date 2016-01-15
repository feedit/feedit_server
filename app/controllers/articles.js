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

var models = require('../models');
var _ = require('../../lib/helper');

var Item = models.Item;

function *getArticles() {
  var unread = this.query.unread;
  var options = {
    search: this.query.search
  };
  var page = this.query.page || 1;

  var item = new Item();

  if (unread) {
    var _data = yield item.getUnRead(options);
  } else {
    if (!this.session.user) {
      this.jsonp = {
        success: false,
        errorMsg: 'no login'
      };
      return;
    }
    var _data = yield item.getByPageNum(page, options);
  }

  if (!_data) {
    this.jsonp = {
      success: false
    };
    return;
  }

  var count = yield item.getTotalCount();
  var data = [];
  _data.forEach(function(d, k) {
    var obj = {};
    obj.id = d._id;
    obj.index = count - (page - 1) * 20 - k;
    obj.title = d.title.replace(/\\/g, '').substring(0, 50);
    obj.url = d.url.replace(/\\/g, '');
    obj.read = d.read;
    obj.create_time = _.moment(d.create_at).format('YYYY-MM-DD HH:mm:ss');
    data.push(obj);
  });

  this.jsonp = {
    success: true,
    data: JSON.stringify(data)
  };
};

function *addArticle() {
  var title = decodeURI(this.query.title);
  var url = decodeURI(this.query.url);
  var item = new Item();
  item.title = title;
  item.url = url;
  var success = yield item.add();

  if (success) {
    this.body = {
      success: true
    };
  } else {
    this.body = {
      success: false
    };
  }
};

function *updateArticle() {
  var mobile = this.query.ua === 'mobile';

  if (!this.session.user && !mobile) {
    this.jsonp = {
      success: false,
      errorMsg: 'no login'
    };
    return;
  }

  var id = this.query.id;
  var item = new Item();
  var success = yield item.updateById(id, {
    read: true
  });

  if (success) {
    this.jsonp = {
      success: true
    };
  } else {
    this.jsonp = {
      success: false
    };
  }
};

function *removeArticle() {
  var id = this.query.id;
  var item = new Item();
  var success = yield item.removeById(id);

  if (success) {
    this.body = {
      success: true
    };
  } else {
    this.body = {
      success: false
    };
  }
};

function *dispatch() {
  switch (this.query.type) {
    case 'get':
      yield getArticles.call(this);
      break;
    case 'add':
      yield addArticle.call(this);
      break;
    case 'update':
      yield updateArticle.call(this);
      break;
    case 'remove':
      yield removeArticle.call(this);
      break;
    default:
      this.body = 'aha?';
      break;
  }
};

module.exports = dispatch;
