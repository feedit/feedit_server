'use strict';

var mongoose = require('mongoose');

var _ = require('../../lib/helper');

var Schema = mongoose.Schema;
var P = mongoose.Promise;

var UserSchema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  }
});

UserSchema.methods.add = function() {
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

UserSchema.methods.getUserByUsername = function(username) {
  var promise = new P();
  User.findOne({
    username: username
  }, function(error, data) {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(null, data);
    }
  });
  return promise;
};

mongoose.model('User', UserSchema);
var User = mongoose.model('User');
module.exports = User;
