'use strict';

var models = require('../models');
var _ = require('../../lib/helper');
var pagination = require('../../lib/pagination');

var Item = models.Item;

function *getContext() {
  var page = this.query.page;
  var search = this.query.search;
  var context = {};
  context.session = this.session;
  context.view = 'home';
  var item = new Item();
  var count = yield item.getTotalCount({
    search: search
  });
  context.pagination = yield pagination(page, Math.ceil(count / PAGE_SIZE));
  if (search) {
    context.pagination.search = search;
  }
  return context;
}

function *render() {
  var context = yield getContext.call(this);
  this.body = yield this.render.call(this, context);
}

function *dispatch() {
  this.logger.info('controller home');
  yield render.call(this);
}

module.exports = dispatch;
