'use strict';

var deploy = !!~process.argv.indexOf('--deploy');

var config = {

  // debug mode print verbose log
  debug: false,

  // http server port
  port: deploy ? 80 : 8080,

  // database config
  database: 'mongodb://localhost/feedit_dev',
};

global.PAGE_SIZE = 20;

module.exports = config;
