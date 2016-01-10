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
var _ = require('../../lib/helper');

var Schema = mongoose.Schema;
var P = mongoose.Promise;

var ItemSchema = new Schema({
  title: {
    type: String
  },
  url: {
    type: String
  },
  read: {
    type: Boolean,
    default: false
  },
  create_at: {
    type: Date,
    default: Date.now
  }
});

ItemSchema.index({
  _id: 1,
  create_date: -1
});

ItemSchema.methods.add = function() {
  var promise = new P();
  this.save(function(error, data) {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(null, data);
    }
  });
  return promise;
};

ItemSchema.methods.removeById = function(id) {
  var promise = new P();
  Item.remove({
    _id: id
  }, function(error, data) {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(null, data);
    }
  });
  return promise;
};

ItemSchema.methods.getByPageNum = function(page, options) {
  var search = options ? options.search : null;
  var _page = parseInt(page) || 1;
  var promise = new P();
  Item.find(search ? {
    '$where': '!!~this.title.toLowerCase().indexOf("' + search + '")'
  } : {}, null, {
    skip: PAGE_SIZE * (_page - 1),
    sort: {
      _id: -1
    },
    limit: PAGE_SIZE || Infinity
  }, function(error, data) {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(null, data);
    }
  });
  return promise;
};

ItemSchema.methods.updateById = function(id, data) {
  var promise = new P();
  Item.update({
    _id: id
  }, data, {
    upsert: true
  }, function(error, data) {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(null, data);
    }
  });
  return promise;
};

ItemSchema.methods.getTotalCount = function(options) {
  var search = options ? options.search : null;
  var promise = new P();
  Item.count(search ? {
    '$where': '!!~this.title.toLowerCase().indexOf("' + search + '")'
  } : {}, function(error, data) {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(null, data);
    }
  });
  return promise;
};

ItemSchema.methods.getUnRead = function(options) {
  var search = options ? options.search : null;
  var promise = new P();
  Item.find(search ? {
    read: false,
    '$where': '!!~this.title.toLowerCase().indexOf("' + search + '")'
  } : {
    read: false
  }
  , null, {
    sort: {
      _id: -1
    },
    limit: 20
  }, function(error, data) {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(null, data);
    }
  });
  return promise;
};

ItemSchema.virtual('create_time').get(function() {
  return _.moment(this.create_at).format('YYYY-MM-DD HH:mm:ss');
});

mongoose.model('Item', ItemSchema);
var Item = mongoose.model('Item');
module.exports = Item;
