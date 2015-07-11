'use strict';

var log4js = require('log4js'),
  logger = log4js.getLogger('cheese'),
  config = require('../../config/customConfig');

var init = function() {
  log4js.loadAppender('file');
  log4js.addAppender(log4js.appenders.file(config.logger.file), 'cheese');
  logger.setLevel(config.logger.level);
  return logger;
};

module.exports.init = init;
