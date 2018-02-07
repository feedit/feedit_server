'use strict';

var mongoose = require('mongoose');
var config = require('../../lib/config');

mongoose.connect(config.database, function(error) {
  if (error) {
    console.error('connect to %s error: %s', config.database, error.message);
  }
});

exports.Item = require('./item');
exports.User = require('./user');
