'use strict';

function *dispatch() {
  this.session = null;
  this.redirect('/feedit/');
}

module.exports = dispatch;
