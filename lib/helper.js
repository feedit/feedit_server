'use strict';

var utils = require('xutil');
var parse = require('co-body');

var _ = Object.assign({}, utils);

_.parse = parse;

module.exports = _;
