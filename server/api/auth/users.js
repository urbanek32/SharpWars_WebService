'use strict';

var userEntities = require('../../entities/users-entities'),
  httpStatuses = require('../../components/httpStatuses').httpStatuses,
  passwordHash = require('password-hash'),
  config = require('../../config/customConfig'),
  logger = require('../../lib/logger/logger').init();


var changePassword = function(options, callback) {
  userEntities.findUserByEmail(options.email, function(err, user) {
    if(!err) {
      if(user) {
        if(passwordHash.verify(options.oldPassword, user.password)) {
          var newPasswordHash = passwordHash.generate(options.newPassword);
          userEntities.setNewPasswordForEmail(options.email, newPasswordHash, function(err, result) {
            if (!err && result) {
              logger.debug("Password changed.");
              callback(null, httpStatuses.Users.PasswordChanged, result);
            } else {
              logger.error("Internal Server Error: " + JSON.stringify(err));
              callback(httpStatuses.Generic.InternalServerError, null);
            }
          });
        } else {
          logger.debug("Cannot change password: Password incorrect.");
          callback(httpStatuses.Auth.Unauthorized, null);
        }
      } else {
        logger.debug("Cannot change password for user: User " + options.email + " not exists.");
        callback(httpStatuses.Users.NotExists, null);
      }
    } else {
      logger.error("Internal Server Error: " + JSON.stringify(err));
      callback(httpStatuses.Generic.InternalServerError, null)
    }
  });
};

module.exports = {
  changePassword: changePassword
};
