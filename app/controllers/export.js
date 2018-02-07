'use strict';

var mongodExport = require('mongo-export');

module.exports = function *() {
  yield mongodExport(this);
};
