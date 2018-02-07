'use strict';

var models = require('../models');
var _ = require('../../lib/helper');

var User = models.User;

function *getContext() {
  var context = {};
  context.view = 'login';
  return context;
}

function *userLogin() {
  var post = yield _.parse(this);
  var username = post.username;
  var password = post.password;

  if (!username || !password) {
    this.body = 'input username and password';
    return;
  }
  var user = new User();
  var data = yield user.getUserByUsername(username);

  if (!data) {
    this.body = 'not fount ' + username;
    return;
  }

  if (post.password !== data.password) {
    this.body = 'password net correct';
    return;
  }
  var session = {};
  session.username = post.username;
  this.session.user = session;
  this.redirect('/feedit/');
}

function *dispatch() {
  if (this.method === 'GET') {
    var context = yield getContext.call(this);
    this.body = yield this.render.call(this, context);
  } else {
    yield userLogin.call(this);
  }
}

module.exports = dispatch;
